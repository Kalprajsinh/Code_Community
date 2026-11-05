"use client";

import React, { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { Socket } from "socket.io-client";

interface TerminalProps {
  socket: Socket;
}

const TerminalComponent: React.FC<TerminalProps> = ({ socket }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    let isDisposed = false;

    const term = new XTerminal({
      cursorBlink: true,
      cursorStyle: "block",
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      theme: {
        background: "#000000",
        foreground: "#f0f0f0",
        cursor: "#ffffff",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(container);

    const safeFit = () => {
      if (isDisposed) return;
      if (
        container &&
        container.clientWidth > 0 &&
        container.clientHeight > 0
      ) {
        try {
          fitAddon.fit();
        } catch (err) {
          // Ignore transient resize errors
        }
      }
    };

    // Small delay so container geometry is settled before calling fit
    const fitTimer = setTimeout(safeFit, 50);

    const onDataDisposable = term.onData((data) => {
      if (!isDisposed) {
        socket.emit("terminal:write", data);
      }
    });

    const onTerminalData = (data: any) => {
      if (!isDisposed) {
        try {
          term.write(data);
        } catch (err) {
          // Ignore if unmounted
        }
      }
    };

    socket.on("terminal:data", onTerminalData);

    // Request initial prompt
    socket.emit("terminal:write", "\r");

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        safeFit();
      });
      resizeObserver.observe(container);
    }

    term.focus();

    return () => {
      isDisposed = true;
      clearTimeout(fitTimer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      socket.off("terminal:data", onTerminalData);
      onDataDisposable.dispose();
      try {
        term.dispose();
      } catch (e) {
        // Suppress any disposal race conditions
      }
    };
  }, [socket]);

  return (
    <div
      ref={terminalRef}
      id="terminal"
      className="w-full h-full min-h-[160px] overflow-hidden"
      onClick={() => {
        terminalRef.current?.querySelector("textarea")?.focus();
      }}
    />
  );
};

export default TerminalComponent;

