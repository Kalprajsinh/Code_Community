"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import Editor from "@monaco-editor/react";
import axios from 'axios';
import { useSession,signOut } from "next-auth/react";
import Header from "../component/Header";

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
  const { data: session } = useSession();

  useEffect(() => {
    
    socket.on('text', (message: string) => {
      setCode(message);
    });

    
    socket.on('room_users', (users: Array<{ id: string, username: string }>) => {
      setUsers(users);
    });

    
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
      <div className="w-full h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="p-5 bg-[#0E2D41] rounded-lg">
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
              className="p-2 rounded-md text-[#0F172A]"
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded-md text-[#0F172A]"
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
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#0F172A] overflow-hidden">
      <div className="w-full h-20 border-b-2 border-b-[#7DD2FB] text-2xl flex items-center p-5 justify-between">
        <div className="font-bold">
          &lt;/&gt;&nbsp;Compiler
        </div>
        <Header />
        {/* <div className="flex justify-center items-center gap-2 mr-4 text-xl">
        {!session?.user ? (
          <>
            <button
              className="w-20 h-10 p-2 text-[#7DD2FB] text-sm"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="w-20 h-10 border p-2 bg-[#7DD2FB] rounded-full text-black text-sm"
              onClick={() => {
                router.push("/signup");
              }}
            >
              SignUp
            </button>
          </>
        ) : (
          // If user is authenticated, display user info and sign out button
          <div className="flex items-center gap-4">
            <img
              src={session?.user?.image ?? ""} // Fallback to default avatar
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-sky-100">{session.user.name}</span>
              <span className="text-sky-100 text-sm">{session.user.email}</span>
            </div>
            <button
              onClick={() => {signOut()
                router.push("/");
              }
                
              }
              className="w-20 h-10 p-2 text-[#7DD2FB] text-lg hover:text-white transition"
            >
              Logout
            </button>
          </div>
        )}
      </div> */}
      </div>

      <div className="w-full h-screen flex">
        <div
          className={`${
            isDrawerOpen ? "block" : "hidden"
          } fixed md:relative w-1/6 border-r border-[#7DD2FB] h-screen bg-[#0E2D41] md:bg-transparent`}
        >
          <div className="p-2 flex gap-3 items-center border-b border-b-[#7DD2FB] h-12">
            <a onClick={toggleDrawer} className="cursor-pointer text-vs">Users</a>
            <button
              className="bg-[#0E2D41] rounded-md text-[#7DD2FB] w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm"
              onClick={toggleDrawer}
              >
              &lt;-
            </button>
          </div>
          <p className="text-vs">&nbsp;</p>
          <ul className="grid grid-cols-1 md:grid-cols-2">
            {users.map((user) => (
              <li key={user.id} className="flex justify-center items-center font-bold mb-3">
                <div className="bg-[#0F172A] w-12 text-sm xl:w-28 xl:h-16 h-12 xl:text-base rounded-xl flex justify-center items-center">
                  {user.username}
                </div>
              </li>
            ))}
          </ul>
          
        <div>
            <video autoPlay muted className="w-48 h-48"></video>
            <video  autoPlay className="w-48 h-48"></video>
          </div>
        
        </div>

        {/* Main content area */}
        <div
          className={`${
            isDrawerOpen ? "w-5/6" : "w-full"
          } border-r border-[#7DD2FB] h-screen flex ml-auto`}
        >
          <div className="w-2/3 border-r border-[#7DD2FB] h-screen">
            <div className="border-b border-b-[#7DD2FB] h-12 flex">
              <div className={`${
                isDrawerOpen ? "hidden" : ""
              } p-2 flex gap-3 items-center h-12`}>
                {/* Add your drawer content here */}
                <a onClick={toggleDrawer} className="cursor-pointer text-vs">Users</a>
                <button
                  className="text-[#7DD2FB] rounded-md w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm flex pt-0.5"
                  onClick={toggleDrawer}
                >
                  -&gt;
                </button>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex">
                  {/* <button
                    className="bg-[#0F172A] text-white py-2 px-5 rounded-md w-16 h-8 text-base font-bold flex justify-center items-center m-2 md:block hidden"
                  >
                    📂
                  </button>
                  <button
                    className="bg-[#0E2D41] text-white py-2 px-5 rounded-md w-16 h-8 text-base font-bold hover:bg-[#7DD2FB] hover:text-[#0F172A] flex justify-center items-center m-2 md:block hidden"
                  >
                    
                  </button> */}
                  <div className="flex justify-center items-center m-4">

                  &lt;/&gt;&nbsp;
                  </div>
                </div>
          
                <div className="flex items-center gap-2">
                <button
                    className="bg-[#0E2D41] text-white py-2 px-5 rounded-md hover:bg-[#7DD2FB] hover:text-[#0F172A] h-8 text-base font-bold flex justify-center items-center m-2"
                    onClick={compileCode}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Compiling...' : 'RUN'}
                  </button>
                  <select
                    className="px-2 py-1 rounded-lg text-white bg-[#0E2D41]"
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
          <div className="w-1/3 border-r border-[#7DD2FB] h-screen">
            <div className="border-b border-b-[#7DD2FB] h-12 flex items-center px-2 text-white justify-center">
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

// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import io from "socket.io-client";
// import Editor from "@monaco-editor/react";
// import axios from "axios";

// // WebSocket connection
// const socket = io("https://code-community-ftp2.onrender.com");

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

// export default function Home() {
//   const [email, setEmail] = useState(null);
//   const [code, setCode] = useState(helloWorldExamples.python);
//   const [language, setLanguage] = useState("python");
//   const [output, setOutput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [room, setRoom] = useState("");
//   const [username, setUsername] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [users, setUsers] = useState([]);
//   const router = useRouter();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(true);

//   // WebRTC states
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const pc = useRef();

//   useEffect(() => {
//     socket.on("text", (message) => {
//       setCode(message);
//     });

//     socket.on("room_users", (users) => {
//       setUsers(users);
//     });

//     return () => {
//       socket.off("text");
//       socket.off("room_users");
//     };
//   }, [code]);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, [router]);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const handleChange = (value) => {
//     if (value !== undefined) {
//       setCode(value);
//       // Emit the text to the server
//       socket.emit("text", room, value);
//     }
//   };

//   const handleLanguageChange = (e) => {
//     const selectedLanguage = e.target.value;
//     setLanguage(selectedLanguage);
//     setCode(helloWorldExamples[selectedLanguage]);
//   };

//   const compileCode = async () => {
//     const options = {
//       method: "POST",
//       url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
//       headers: {
//         'x-rapidapi-key': '6129d442d1mshc5b312e0de8c457p183411jsn6a0870a6274a',
//         "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//         "Content-Type": "application/json"
//       },
//       data: {
//         language_id: getLanguageId(language),
//         source_code: code,
//         stdin: ""
//       }
//     };

//     setIsLoading(true);
//     try {
//       const response = await axios.request(options);
//       setOutput(response.data.stdout || response.data.stderr);
//     } catch (error) {
//       setOutput("Error: " + error.message);
//     }
//     setIsLoading(false);
//   };

//   const handleJoinRoom = () => {
//     socket.emit("join_room", { room, username });
//     setJoined(true);
//   };

//   // Video call functions
//   const startVideoCall = async (userId) => {
//     pc.current = new RTCPeerConnection();

//     // Add local stream tracks to peer connection
//     localStream.getTracks().forEach((track) => {
//       pc.current.addTrack(track, localStream);
//     });

//     pc.current.ontrack = (event) => {
//       setRemoteStream(event.streams[0]);
//     };

//     const offer = await pc.current.createOffer();
//     await pc.current.setLocalDescription(new RTCSessionDescription(offer));

//     socket.emit("user:call", { to: userId, offer });
//   };

//   const startLocalStream = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     });
//     setLocalStream(stream);
//     localVideoRef.current.srcObject = stream;
//   };

//   useEffect(() => {
//     socket.on("incomming:call", async ({ from, offer }) => {
//       pc.current.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await pc.current.createAnswer();
//       await pc.current.setLocalDescription(new RTCSessionDescription(answer));
//       socket.emit("call:accepted", { to: from, ans: answer });
//     });

//     socket.on("call:accepted", async ({ ans }) => {
//       await pc.current.setRemoteDescription(new RTCSessionDescription(ans));
//     });

//     return () => {
//       socket.off("incomming:call");
//       socket.off("call:accepted");
//     };
//   }, []);

//   if (!joined) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-[#0F172A]">
//         <div className="p-5 bg-[#0E2D41] rounded-lg">
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
//               className="p-2 rounded-md text-[#0F172A]"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="p-2 rounded-md text-[#0F172A]"
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
//     <div className="w-full h-screen bg-[#0F172A] overflow-hidden">
//       <div className="w-full h-20 border-b-2 border-b-[#7DD2FB] text-2xl flex items-center p-5 justify-between">
//         <div className="font-bold">&lt;/&gt;&nbsp;Compiler</div>
//         <div className="flex gap-3">
//           <button
//             className="bg-[#0E2D41] text-white py-2 px-5 rounded-md hover:bg-[#7DD2FB] hover:text-[#0F172A] w-20 h-10 text-base font-bold"
//             onClick={() => router.push("/signup", { scroll: false })}
//           >
//             Signup
//           </button>
//           <button
//             className="bg-[#0E2D41] text-white py-2 px-5 rounded-md hover:bg-[#7DD2FB] hover:text-[#0F172A] w-20 h-10 text-base font-bold"
//             onClick={() => router.push("/login", { scroll: false })}
//           >
//             Login
//           </button>
//         </div>
//       </div>

//       <div className="w-full h-screen flex">
//         {/* Sidebar */}
//         <div
//           className={`${
//             isDrawerOpen ? "block" : "hidden"
//           } fixed md:relative w-1/6 border-r border-[#7DD2FB] h-screen bg-[#0E2D41] md:bg-transparent`}
//         >
//           <div className="p-2 flex gap-3 items-center border-b border-b-[#7DD2FB] h-12">
//             <a onClick={toggleDrawer} className="cursor-pointer text-vs">
//               Users
//             </a>
//             <button
//               className="bg-[#0E2D41] text-white rounded-md text-[#7DD2FB] w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm"
//               onClick={toggleDrawer}
//             >
//               &lt;-
//             </button>
//           </div>
//           <p className="text-vs">&nbsp;</p>
//           <ul className="grid grid-cols-1 md:grid-cols-2">
//             {users.map((user) => (
//               <li
//                 key={user.id}
//                 className="flex justify-center items-center font-bold mb-3"
//               >
//                 <div className="bg-[#0F172A] w-12 text-sm xl:w-28 xl:h-16 h-12 xl:text-base rounded-xl flex justify-center items-center">
//                   {user.username}
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <button
//             className="bg-[#0E2D41] text-white py-2 px-5 rounded-md"
//             onClick={startLocalStream}
//           >
//             Start Video Call
//           </button>
//           <button
//         onClick={() => startVideoCall(users.id)}
//         className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
//       >
//         Call
//       </button>
//           <div>
//             <video ref={localVideoRef} autoPlay muted className="w-48 h-48" />
//             <video ref={remoteVideoRef} autoPlay className="w-48 h-48" />
//           </div>
//         </div>

//         {/* Main content */}
//         <div
//           className={`${
//             isDrawerOpen ? "w-5/6" : "w-full"
//           } border-r border-[#7DD2FB] h-screen flex ml-auto`}
//         >
//           <div className="w-2/3 border-r border-[#7DD2FB] h-screen">
//             <div className="border-b border-b-[#7DD2FB] h-12 flex">
//               <div
//                 className={`${isDrawerOpen ? "hidden" : ""} p-2 flex gap-3 items-center h-12`}
//               >
//                 <a onClick={toggleDrawer} className="cursor-pointer text-vs">
//                   Users
//                 </a>
//                 <button
//                   className="text-white text-[#7DD2FB] rounded-md w-1 h-4 text-vs font-bold md:w-6 md:h-6 md:text-sm flex pt-0.5"
//                   onClick={toggleDrawer}
//                 >
//                   -&gt;
//                 </button>
//               </div>
//               <div className="flex justify-between w-full">
//                 <div className="flex">
//                   <div className="flex justify-center items-center m-4">
//                     &lt;/&gt;&nbsp;
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     className="bg-[#0E2D41] text-white py-2 px-5 rounded-md hover:bg-[#7DD2FB] hover:text-[#0F172A] h-8 text-base font-bold flex justify-center items-center m-2"
//                     onClick={compileCode}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Compiling..." : "RUN"}
//                   </button>
//                   <select
//                     className="px-2 py-1 rounded-lg bg-gray-600 text-white bg-[#0E2D41]"
//                     value={language}
//                     onChange={handleLanguageChange}
//                   >
//                     <option value="python">Python</option>
//                     <option value="c">C</option>
//                     <option value="cpp">C++</option>
//                     <option value="java">Java</option>
//                     <option value="csharp">C#</option>
//                     <option value="php">PHP</option>
//                     <option value="javascript">Javascript</option>
//                   </select>
//                   <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;</span>
//                 </div>
//               </div>
//             </div>
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
//           </div>
//           <div className="w-1/3 border-r border-[#7DD2FB] h-screen">
//             <div className="border-b border-b-[#7DD2FB] h-12 flex items-center px-2 text-white justify-center">
//               &gt;_ output
//             </div>
//             <div className="p-4 text-white">
//               <pre className="w-full h-full p-2 bg-gray-900 rounded-b-lg overflow-auto">
//                 {output}
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
