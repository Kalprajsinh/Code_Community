"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import Editor from "@monaco-editor/react";
import axios from 'axios';

const socket = io('https://code-community-ftp2.onrender.com');

const helloWorldExamples = {
  python: 'print("Hello, World!")',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  php: '<?php\n    echo "Hello, World!";\n?>',
  javascript: 'console.log("Hello, World!");'
};

const getLanguageId = (language: string): number | undefined => {
  const languageIds: { [key: string]: number } = {
    python: 71,
    c: 50,
    cpp: 54,
    java: 62,
    csharp: 51,
    php: 68,
    javascript: 63
  };
  return languageIds[language];
};


export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string>(helloWorldExamples.python);
  const [language, setLanguage] = useState<string>('python');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<{ id: string, username: string }>>([]);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('text', (message: string) => {
      setCode(message);
    });

    // Listen for room users updates
    socket.on('room_users', (users: Array<{ id: string, username: string }>) => {
      setUsers(users);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('text');
      socket.off('room_users');
    };
  }, [code]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      //router.push('/login');
    }
  }, [router]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      // Emit the text to the server
      socket.emit('text', room, value);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value as keyof typeof helloWorldExamples;
    setLanguage(selectedLanguage);
    setCode(helloWorldExamples[selectedLanguage]);
  };

  const compileCode = async () => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      headers: {
        'x-rapidapi-key': '6129d442d1mshc5b312e0de8c457p183411jsn6a0870a6274a',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        language_id: getLanguageId(language),
        source_code: code,
        stdin: ''
      }
    };

    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setOutput(response.data.stdout || response.data.stderr);
    } catch (error:any) {
      setOutput('Error: ' + error.message);
    }
    setIsLoading(false);
  };

  const handleJoinRoom = () => {
    socket.emit('join_room', { room, username });
    setJoined(true);
  };

  if (!joined) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-darkbg">
        <div className="p-5 bg-lightbg rounded-lg">
          <h2 className="text-white mb-4 text-2xl">Join a Room</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoinRoom();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Room ID"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="p-2 rounded-md text-darkbg"
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded-md text-darkbg"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Join Room
            </button>
          </form>
        </div>
        <button onClick={()=>{
                router.push("/Home");
            }}>Home</button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-darkbg overflow-hidden">
      <div className="w-full h-20 border-b-2 border-b-textcolor text-2xl flex items-center p-5 justify-between">
        <div className="font-bold">
          &lt;/&gt;&nbsp;Compiler
        </div>
        <div className="flex gap-3">
          <button
            className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg w-20 h-10 text-base font-bold md:flex justify-center items-center md:block hidden"
            onClick={() => { router.push('/signup', { scroll: false }) }}
          >
            Signup
          </button>
          <button
            className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg w-20 h-10 text-base font-bold flex justify-center items-center"
            onClick={() => { router.push('/login', { scroll: false }) }}
          >
            Login
          </button>
        </div>
      </div>

      <div className="w-full h-screen flex">
        <div
          className={`${
            isDrawerOpen ? "block" : "hidden"
          } fixed md:relative w-1/6 border-r border-textcolor h-screen bg-lightbg md:bg-transparent`}
        >
          <div className="p-2 flex gap-3 items-center border-b border-b-textcolor h-12">
            <a onClick={toggleDrawer} className="cursor-pointer text-vs">Users</a>
            <button
              className="bg-lightbg text-white rounded-md text-textcolor w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm"
              onClick={toggleDrawer}
              >
              &lt;-
            </button>
          </div>
          <p className="text-vs">&nbsp;</p>
          <ul className="grid grid-cols-1 md:grid-cols-2">
            {users.map((user) => (
              <li key={user.id} className="flex justify-center items-center font-bold mb-3">
                <div className="bg-darkbg w-12 text-sm xl:w-28 xl:h-16 h-12 xl:text-base rounded-xl flex justify-center items-center">
                  {user.username}
                </div>
              </li>
            ))}
          </ul>

        </div>

        {/* Main content area */}
        <div
          className={`${
            isDrawerOpen ? "w-5/6" : "w-full"
          } border-r border-textcolor h-screen flex ml-auto`}
        >
          <div className="w-2/3 border-r border-textcolor h-screen">
            <div className="border-b border-b-textcolor h-12 flex">
              <div className={`${
                isDrawerOpen ? "hidden" : ""
              } p-2 flex gap-3 items-center h-12`}>
                {/* Add your drawer content here */}
                <a onClick={toggleDrawer} className="cursor-pointer text-vs">Users</a>
                <button
                  className="text-white text-textcolor rounded-md w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm flex pt-0.5"
                  onClick={toggleDrawer}
                >
                  -&gt;
                </button>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex">
                  {/* <button
                    className="bg-darkbg text-white py-2 px-5 rounded-md w-16 h-8 text-base font-bold flex justify-center items-center m-2 md:block hidden"
                  >
                    📂
                  </button>
                  <button
                    className="bg-lightbg text-white py-2 px-5 rounded-md w-16 h-8 text-base font-bold hover:bg-textcolor hover:text-darkbg flex justify-center items-center m-2 md:block hidden"
                  >
                    
                  </button> */}
                  <div className="flex justify-center items-center m-4">

                  &lt;/&gt;&nbsp;
                  </div>
                </div>
          
                <div className="flex items-center gap-2">
                <button
                    className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg h-8 text-base font-bold flex justify-center items-center m-2"
                    onClick={compileCode}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Compiling...' : 'RUN'}
                  </button>
                  <select
                    className="px-2 py-1 rounded-lg bg-gray-600 text-white bg-lightbg"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <option value="python">Python</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="php">PHP</option>
                    <option value="javascript">Javascript</option>
                  </select>
                  <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <Editor
                defaultLanguage="python"
                language={language}
                value={code}
                onChange={(value) => handleChange(value)}
                theme="vs-dark"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="w-1/3 border-r border-textcolor h-screen">
            <div className="border-b border-b-textcolor h-12 flex items-center px-2 text-white justify-center">
              &gt;_ output 
            </div>
            <div className="p-4 text-white">
              <pre className="w-full h-full p-2 bg-gray-900 rounded-b-lg overflow-auto">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// C:\Users\91878\OneDrive\Desktop\Notes\0-100\.0000000_____get_post_put_delete\Realtime_online_compiler\compiler\server
// C:\Users\91878\OneDrive\Desktop\Notes\0-100\.0000000_____get_post_put_delete\coding_platform
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';
// import Editor from "@monaco-editor/react";
// import axios from 'axios';

// const socket = io('http://localhost:3001');

// const helloWorldExamples = {
//   python: 'print("Hello, World!")',
//   c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
//   cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
//   java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
//   csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
//   php: '<?php\n    echo "Hello, World!";\n?>',
//   javascript: 'console.log("Hello, World!");'
// };

// const getLanguageId = (language) => {
//   const languageIds = {
//     python: 71,
//     c: 50,
//     cpp: 54,
//     java: 62,
//     csharp: 51,
//     php: 68,
//     javascript: 63
//   };
//   return languageIds[language];
// };

//   export default function Home() {
//   const [email, setEmail] = useState<string | null>(null);
//   const [code, setCode] = useState<string>(helloWorldExamples.python);
//   const [language, setLanguage] = useState<string>('python');
//   const [output, setOutput] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [room, setRoom] = useState<string>('');
//   const [username, setUsername] = useState<string>('');
//   const [joined, setJoined] = useState<boolean>(false);
//   const [users, setUsers] = useState<Array<{ id: string, username: string }>>([]);
//   const router = useRouter();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(true);

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on('text', (message: string) => {
//       setCode(message);
//     });

//     // Listen for room users updates
//     socket.on('room_users', (users: Array<{ id: string, username: string }>) => {
//       setUsers(users);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('text');
//       socket.off('room_users');
//     };
//   }, [code]);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       router.push('/login');
//     }
//   }, [router]);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const handleChange = (value: string | undefined) => {
//     if (value !== undefined) {
//       setCode(value);
//       // Emit the text to the server
//       socket.emit('text', room, value);
//     }
//   };

//   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedLanguage = e.target.value;
//     setLanguage(selectedLanguage);
//     setCode(helloWorldExamples[selectedLanguage]);
//   };

//   const compileCode = async () => {
//     const options = {
//       method: 'POST',
//       url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
//       headers: {
//         'x-rapidapi-key': '6129d442d1mshc5b312e0de8c457p183411jsn6a0870a6274a',
//         'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
//         'Content-Type': 'application/json'
//       },
//       data: {
//         language_id: getLanguageId(language),
//         source_code: code,
//         stdin: ''
//       }
//     };

//     setIsLoading(true);
//     try {
//       const response = await axios.request(options);
//       setOutput(response.data.stdout || response.data.stderr);
//     } catch (error) {
//       setOutput('Error: ' + error.message);
//     }
//     setIsLoading(false);
//   };

//   const handleJoinRoom = () => {
//     socket.emit('join_room', { room, username });
//     setJoined(true);
//   };

//   if (!joined) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-darkbg">
//         <div className="p-5 bg-lightbg rounded-lg">
//           <h2 className="text-white mb-4 text-2xl">Join a Room</h2>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleJoinRoom();
//             }}
//             className="flex flex-col gap-4"
//           >
//             <input
//               type="text"
//               placeholder="Room ID"
//               value={room}
//               onChange={(e) => setRoom(e.target.value)}
//               className="p-2 rounded-md"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="p-2 rounded-md"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//             >
//               Join Room
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen bg-darkbg overflow-hidden">
//       <div className="w-full h-20 border-b-2 border-b-textcolor text-2xl flex items-center p-5 justify-between">
//         <div className="font-bold">
//           &lt;/&gt;&nbsp;Compiler
//         </div>
//         <div className="flex gap-3">
//           <button
//             className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg w-20 h-10 text-base font-bold md:flex justify-center items-center md:block hidden"
//             onClick={() => { router.push('/signup', { scroll: false }) }}
//           >
//             Signup
//           </button>
//           <button
//             className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg w-20 h-10 text-base font-bold flex justify-center items-center"
//             onClick={() => { router.push('/login', { scroll: false }) }}
//           >
//             Login
//           </button>
//         </div>
//       </div>

//       <div className="w-full h-screen flex">
//         {/* Drawer section */}
//         <div
//           className={`${
//             isDrawerOpen ? "block" : "hidden"
//           } fixed md:relative w-1/6 bg-darkbg text-white border-r border-textcolor h-screen p-4 transition-all duration-300 ease-in-out transform`}
//         >
//           <h2 className="text-xl font-bold mb-4">Users in Room</h2>
//           <ul>
//             {users.map((user) => (
//               <li key={user.id} className="py-1">
//                 {user.username}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main content section */}
//         <div className="flex-grow flex flex-col">
//           <div className="flex justify-between items-center p-2 border-b border-b-textcolor">
//             <div className="md:hidden p-2 flex gap-3 items-center h-12">
//               <a onClick={toggleDrawer} className="cursor-pointer text-vs">
//                 Users
//               </a>
//               <button
//                 className="text-white text-textcolor rounded-md w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm flex pt-0.5"
//                 onClick={toggleDrawer}
//               >
//                 -&gt;
//               </button>
//             </div>
//             <div className="flex justify-between w-full">
//               <div className="flex">
//                 <button
//                   className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg w-16 h-8 text-base font-bold flex justify-center items-center m-2"
//                   onClick={() => { router.push('/login', { scroll: false }) }}
//                 >
//                   📂
//                 </button>
//                 <button
//                   className="bg-lightbg text-white py-2 px-5 rounded-md hover:bg-textcolor hover:text-darkbg h-8 text-base font-bold flex justify-center items-center m-2"
//                   onClick={compileCode}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Compiling...' : 'RUN'}
//                 </button>
//               </div>
//               <div className="flex items-center gap-2">
//                 <select
//                   className="px-2 py-1 rounded-lg bg-gray-600 text-white bg-darkbg"
//                   value={language}
//                   onChange={handleLanguageChange}
//                 >
//                   <option value="python">Python</option>
//                   <option value="c">C</option>
//                   <option value="cpp">C++</option>
//                   <option value="java">Java</option>
//                   <option value="csharp">C#</option>
//                   <option value="php">PHP</option>
//                   <option value="javascript">Javascript</option>
//                 </select>
//                 <span className="text-white">⚙️</span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full h-full flex">
//             <div className="w-full h-full">
//               <Editor
//                 defaultLanguage="python"
//                 language={language}
//                 value={code}
//                 onChange={(value) => handleChange(value)}
//                 theme="vs-dark"
//                 className="w-full h-full"
//               />
//             </div>
//             <div className="w-1/3 border-r border-textcolor h-screen">
//               <div className="border-b border-b-textcolor h-12 flex items-center px-2 text-white">
//                 &gt;_ output ⚙️
//               </div>
//               <div className="p-4 text-white">
//                 <pre className="w-full h-full p-2 bg-gray-900 rounded-b-lg overflow-auto">
//                   {output}
//                 </pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
