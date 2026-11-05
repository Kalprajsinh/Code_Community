"use client"
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "./App.css";
import Editor from "@monaco-editor/react";
import { io } from 'socket.io-client'

const Terminal = dynamic(() => import("./Terminal"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
      Loading terminal...
    </div>
  ),
});

const socket = io('https://code-community-wdgl.onrender.com')

const FileTreeNode = ({ fileName, nodes, onSelect, path }: any) => {
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

const FileTree = ({ tree, onSelect }: any) => {
  return <FileTreeNode onSelect={onSelect} fileName="/" path="" nodes={tree} />;
};

const getFileMode = ({ selectedFile }: any) => {
  const splitedArray = selectedFile.split(".");

  const extension = splitedArray[splitedArray.length - 1];

  switch (extension) {
    case "js":
      return "javascript";
    case "jsx":
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

import { useSession } from "next-auth/react";
import axios from "axios";


function App() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");
  const [currentDir, setCurrentDir] = useState<string>("user");

  const isSaved = selectedFileContent === code;

  const { data: session } = useSession();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storeddir = localStorage.getItem("userdir");
      if (storeddir) {
        const parsed = JSON.parse(storeddir);
        if (parsed.dirname) {
          setCurrentDir(parsed.dirname);
          return;
        }
      }
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.email) {
          setCurrentDir(parsed.email);
          return;
        }
      }
      if (session?.user?.name) {
        setCurrentDir(session.user.name);
      }
    } catch (e) {
      console.error("Error reading directory from storage:", e);
    }
  }, [session]);

  useEffect(() => {
    if (!isSaved && code && selectedFile) {
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

  const getFileTree = useCallback(async () => {
    try {
      const response = await fetch("https://code-community-wdgl.onrender.com/files");
      const result = await response.json();
      setFileTree(result.tree || {});
    } catch (err) {
      console.error("Failed to fetch file tree:", err);
    }
  }, []);

  useEffect(() => {
    if (!currentDir) return;
    axios
      .get("https://code-community-wdgl.onrender.com/dirname", {
        params: { dirname: currentDir },
      })
      .then(() => {
        getFileTree();
      })
      .catch((err) => {
        console.error("Failed to initialize dirname:", err);
      });
  }, [currentDir, getFileTree]);

  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    try {
      const response = await fetch(
        `https://code-community-wdgl.onrender.com/files/content?path=${selectedFile}`
      );
      const result = await response.json();
      setSelectedFileContent(result.content);
    } catch (err) {
      console.error("Failed to read file content:", err);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, [getFileTree]);

  return (
    <div className="playground-container h-screen flex flex-col overflow-hidden">
      <div className="toolbar bg-[#111111] text-white p-2 flex justify-between items-center m-2 rounded-2xl border border-[#434343]">
        <div className="toolbar-left flex items-center gap-4">
          <span className="text-blue-400">●</span> CoDev Virtual Container
        </div>
        <div className="toolbar-right flex gap-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => {
              if (selectedFile && code) {
                socket.emit("file:change", {
                  path: selectedFile,
                  content: code,
                });
                setSelectedFileContent(code);
              }
            }}
          >
            Save
          </button>
          <button className="text-gray-400 hover:text-white">Edit</button>
          <button className="text-gray-400 hover:text-white">View</button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="editor-area flex flex-grow flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Sidebar File Explorer */}
        <div className="file-explorer w-full md:w-1/6 bg-[#0b0b0b] text-gray-300 p-4 m-2 rounded-2xl border border-[#434343] overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-wider mb-2">EXPLORER</div>
          <FileTree
            onSelect={(path: any) => {
              setSelectedFileContent('');
              setSelectedFile(path);
            }}
            tree={fileTree}
          />
        </div>

        <div className="flex-grow bg-[#1e1e1e] text-white flex flex-col m-2 rounded-2xl border border-[#434343] min-h-0 overflow-hidden">
          <div className="editor-header bg-gray-800 text-gray-300 p-2 flex justify-between items-center rounded-t-2xl">
            {selectedFile ? (
              <p className="text-sm">
                {selectedFile.replaceAll('/', ' > ')} {isSaved ? '' : '●'}
              </p>
            ) : (
              <p className="text-sm text-gray-400">No file selected</p>
            )}
          </div>

          {/* Main Code Editor */}
          <div className="editor-content p-2 flex-1 min-h-0 relative">
            {selectedFile ? (
              <Editor
                width="100%"
                height="100%"
                language={getFileMode({ selectedFile })}
                theme="vs-dark"
                value={code}
                onChange={(e) => setCode(e ?? '')}
              />
            ) : (
              <div className="text-gray-400 text-sm flex justify-center items-center h-full">
                Select a file from the explorer to start coding
              </div>
            )}
          </div>

          {/* Terminal Panel */}
          <div className="h-64 bg-black text-white p-3 rounded-b-2xl border-t border-[#434343] flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#333333] text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Terminal</span>
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="flex-1 min-h-0 relative">
              <Terminal socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
