"use client"
import { useCallback, useEffect, useState,useRef } from "react";
import "./App.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { io } from 'socket.io-client'
import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const socket = io('http://localhost:9000')

const FileTreeNode = ({ fileName, nodes, onSelect, path }:any) => {
  const isDir = !!nodes;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (isDir) return;
        onSelect(path);
      }}
      style={{ marginLeft: "10px" }}
    >
      <p className={isDir ? "folder-node" : "file-node"}>
        {isDir ? "📁" : "📄"} {fileName}
      </p>
      {nodes && fileName !== "node_modules" && (
        <ul>
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={path + "/" + child}
                fileName={child}
                nodes={nodes[child]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FileTree = ({ tree, onSelect }:any) => {
  return <FileTreeNode onSelect={onSelect} fileName="/" path="" nodes={tree} />;
};


const Terminal = () => {
  const terminalRef = useRef();
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 20,
    });

    term.open(terminalRef.current);

    term.onData((data) => {
      socket.emit("terminal:write", data);
    });

    function onTerminalData(data:any) {
      term.write(data);
    }

    socket.on("terminal:data", onTerminalData);
  }, []);

  return <div ref={terminalRef} id="terminal" />;
};

const getFileMode = ({ selectedFile }:any) => {
  const splitedArray = selectedFile.split(".");
  
  const extension = splitedArray[splitedArray.length - 1];

  switch (extension) {
    case "js":
      return "javascript";
    case "py":
      return "python";
    case "java":
      return "java";
    case "xml":
      return "xml";
    case "rb":
      return "ruby";
    case "sass":
      return "sass";
    case "md":
      return "markdown";
    case "sql":
      return "mysql";
    case "json":
      return "json";
    case "html":
      return "html";
    case "hbs":
      return "handlebars";
    case "handlebars":
      return "handlebars";
    case "go":
      return "golang";
    case "cs":
      return "csharp";
    case "litcoffee":
      return "coffee";
    case "css":
      return "css";
    default:
      return "";
  }
};



function App() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");

  const isSaved = selectedFileContent === code;

  useEffect(() => {
    if (!isSaved && code) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved]);

  useEffect(() => {
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    setCode(selectedFileContent);
  }, [selectedFileContent]);

  const getFileTree = async () => {
    const response = await fetch("http://localhost:9000/files");
    const result = await response.json();
    console.log(result.tree);
    setFileTree(result.tree);
  };
  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(
      `http://localhost:9000/files/content?path=${selectedFile}`
    );
    const result = await response.json();
    setSelectedFileContent(result.content);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

  useEffect(() => {
    getFileTree();
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);

  return (
    <div className="playground-container">
      <div className="editor-container">
        <div className="files">
          <FileTree
            onSelect={(path:any) => {
              setSelectedFileContent("");
              setSelectedFile(path);
            }}
            tree={fileTree}
          />
        </div>
        <div className="editor">
          {selectedFile && (
            <p>
              {selectedFile.replaceAll("/", " > ")}{" "}
              {isSaved ? "Saved" : "Unsaved"}
            </p>
          )}
          <AceEditor
            width="100%"
            mode={getFileMode({ selectedFile })}
            value={code}
            onChange={(e) => setCode(e)}
          />
        </div>
      </div>
      <div className="terminal-container">
        <Terminal />
      </div>
    </div>
  );
}

export default App;
