"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react"; // Install this: npm install @monaco-editor/react
import Link from "next/link";
import Header from "../component/Header";
import { FaCode, FaCss3, FaHtml5, FaJs } from "react-icons/fa";

export default function Page() {
  const [activeFile, setActiveFile] = useState<keyof typeof files>('html');
  const [files, setFiles] = useState<{
    html: string;
    css: string;
    javascript: string;
  }>({
    html: `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <center>
        <center>
        <h1>Hello, World!</h1>
        <button onclick="changeText()">Click Me</button>
    </center>
    </center>
        <img width="200px" src="https://www.pngplay.com/wp-content/uploads/9/WWW-Website-PNG-Photos.png">
</body>
</html>    

    `,
    css: `
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #282c34;
    color: white;
}
button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #61dafb;
    border: none;
    border-radius: 5px;
    color: #282c34;
}
    `,
    javascript: `
function changeText() {
        document.querySelector('h1').innerText += '!';
}
    `,
  });

  const handleChange = (value: string | undefined) => {
    setFiles({ ...files, [activeFile]: value || "" });
  };

  const getOutput = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>${files.css}</style>
      </head>
      <body>
        ${files.html}
        <script>${files.javascript}</script>
      </body>
      </html>
    `;
  };

  return (
    <div className="flex h-screen bg-[#000000] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-[#000000] bg-opacity-80">
        
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-3">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex gap-1 justify-center items-center">
                <FaCode className="h-8 w-8 text-blue-400" /><p className="font-bold text-blue-400">CoDev</p>
              </Link>
            </div>
            <Header />
          </div>
        </div>
      </nav>
      <div className="w-1/12 bg-[#000000] mt-20 px-2 rounded-xl">
        <h2 className="text-xl font-semibold m-3">Files</h2>
        <ul>
          {["html", "css", "javascript"].map((file) => (
            <li
              key={file}
              className={`cursor-pointer p-2 mb-2 rounded ${
                activeFile === file ? "bg-[#3a3d41]" : "hover:bg-[#2d2d2d]"
              } flex items-center gap-1`}
              onClick={() => setActiveFile(file as "html" | "css" | "javascript")}
            >
              {file === "html" && <><FaHtml5 className="text-orange-500" /><span className="text-white">index.html</span></>}
            {file === "css" && <><FaCss3 className="text-blue-500" /><span className="text-white">index.css</span></>}
            {file === "javascript" && <><FaJs className="text-yellow-400" /><span className="text-white">index.js</span></>}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
        
      <div className=" bg-[#1e1e1e] mt-20 border border-gray-500 rounded-lg p-3">
        <Editor
          value={files[activeFile]}
          onChange={(value) => handleChange(value)}
          theme="vs-dark"
          language={activeFile}
          className="w-full h-full"
          />
      </div>

      <div className=" bg-[#000000] p-4 mt-20 border border-gray-500 rounded-lg overflow-hidden">
        <h2 className="text-lg font-semibold mb-2">Output</h2>
        <iframe
          className="w-full h-full border-none bg-white"
          srcDoc={getOutput()}
          sandbox="allow-scripts"
          title="output"
          ></iframe>
         </div>
        </div>
    </div>
  );
}
