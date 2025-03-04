"use client"
import { useCallback, useEffect, useState,useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
import { io } from 'socket.io-client'
import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const socket = io('https://docker-x4tj.onrender.com')

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
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) return;
    isRendered.current = true;

    const term = new XTerminal({
      rows: 20,
    });

    if (terminalRef.current) {
      term.open(terminalRef.current);
    }

    // Comprehensive forbidden commands and patterns
    const isMaliciousCommand = (command: string): boolean => {
      const forbiddenPatterns = [
        
        /rm\s+-rf/,         
        /mv\s+\/.+/,        
        /cp\s+-rf/,         
        /dd\s+if=/,         
        /chmod\s+\d+/,     
        /chown\s+.+/,  
        /passwd/,          
        /sudo/,           
        /adduser/,         
        /deluser/,          
        /usermod/,         
        /groupadd/,        
        /groupdel/,         
        
        
        /ssh/,             
        /scp/,
        /ftp/,              
        /wget\s+http/,      
        /curl\s+http/,      
        /ping\s+-c\s+\d+/, 
        /traceroute/,       
        
        /kill\s+-9/,        
        /pkill\s+.+/,       
        /reboot/,           
        /shutdown/,         
        /killall/,          
        /ps\s+-ef/,         
        /top/,              
        /htop/,           
        /\|\|/,            
        /&&/,               
        /;/,                
        /\|/,              
        /\$\(.*\)/,         
        /`.*`/,             
        
        /mkfs/,            
        /mount/,            
        /umount/,           
        /crontab/,        
        /iptables/,         
        /ufw/,              
      ];

      return forbiddenPatterns.some((pattern) => pattern.test(command));
    };

    term.onData((data) => {
      if (isMaliciousCommand(data)) {
        term.write("\r\n⚠️ Command rejected: Unsafe input detected.\r\n");
      } else {
        socket.emit("terminal:write", data);
      }
    });

    function onTerminalData(data: any) {
      term.write(data);
    }

    socket.on("terminal:data", onTerminalData);

    // Cleanup on unmount
    return () => {
      socket.off("terminal:data", onTerminalData);
    };
  }, []);

  return <div ref={terminalRef} id="terminal" />;
};

const getFileMode = ({ selectedFile }:any) => {
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

  const isSaved = selectedFileContent === code;

  const { data: session } = useSession();
  let username:any;
  useEffect(()=>{
  const storedUser = localStorage.getItem("user");
  const storeddir = localStorage.getItem("userdir");
  if(storeddir && JSON.parse(storeddir).dirname !== undefined)
  {
    username = JSON.parse(storeddir).dirname;
    console.log(username)
  }else
    if (storedUser) {
      username = JSON.parse(storedUser).email;
      console.log(username)
    }
    else{
      username = session?.user?.name;
      console.log(username)
    }
    }, [])

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
    console.log("Username:", username);
    const response2 = await axios.get('https://docker-x4tj.onrender.com/dirname', {
      params: {
        dirname: username
        }
    });
    const response = await fetch("https://docker-x4tj.onrender.com/files");
    const result = await response.json();
    console.log(result.tree);
    setFileTree(result.tree);
  };
  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(
      `https://docker-x4tj.onrender.com/files/content?path=${selectedFile}`
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
    <div className="playground-container h-screen flex flex-col overflow-hidden">
      <div className="toolbar bg-[#111111] text-white p-2 flex justify-between items-center m-2 rounded-2xl border border-[#434343]">
        <div className="toolbar-left flex items-center gap-4">
          <span className="text-blue-400">●</span> CoDev Virtual Container
        </div>
        <div className="toolbar-right flex gap-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => {
              (path: any) => {
                setSelectedFileContent('');
                setSelectedFile(path);
                setCode(selectedFileContent);
              };
            }}
          >
            Save
          </button>
          <button className="text-gray-400 hover:text-white">Edit</button>
          <button className="text-gray-400 hover:text-white">View</button>
        </div>
      </div>
  
      {/* Main Editor Area */}
      <div className="editor-area flex flex-grow flex-col md:flex-row">
        {/* Sidebar File Explorer */}
        <div className="file-explorer w-full md:w-1/6 bg-[#0b0b0b] text-gray-300 p-4 m-2 rounded-2xl border border-[#434343]">
          EXPLORER
          <FileTree
            onSelect={(path: any) => {
              setSelectedFileContent('');
              setSelectedFile(path);
            }}
            tree={fileTree}
          />
        </div>
  
        <div className=" flex-grow bg-[#1e1e1e] text-white relative m-2 rounded-2xl border border-[#434343]">
          <div className="editor-header bg-gray-800 text-gray-300 p-2 flex justify-between items-center rounded-t-2xl">
            {selectedFile && (
              <p className="text-sm">
                {selectedFile.replaceAll('/', ' > ')} {isSaved ? '' : ''}
              </p>
            )}
          </div>
  
          <div className="editor-content p-2 h-3/5">
            {selectedFile ? (
              <Editor
                width="100%"
                height="calc(100% - 40px)"
                language={getFileMode({ selectedFile })}
                theme="vs-dark"
                value={code}
                onChange={(e) => setCode(e ?? '')}
              />
            ) : (
              <div className="text-gray-400 text-sm flex justify-center items-center h-full">
                Select a file to start coding
              </div>
            )}
            <div className="absolute w-full scrollbar-hide z-10 terminal bg-black text-white p-2 h-full rounded-b-2xl border border-[#434343] -ml-2">
              Terminal <hr />
              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;
