"use client"

import { FaCode, FaTerminal,FaLaptopCode,FaDocker, FaFile, FaCodepen,FaCogs} from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from "next/navigation";
import Header from "./component/Header";
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link"
import { gsap } from "gsap";

const technologies = [
  { src: "3.png", initialX: 8, initialY: 10 },
  { src: "2.png", initialX: 25, initialY: 15 },
  { src: "1.png", initialX: 17, initialY: 35 },
  { src: "4.png", initialX: 5, initialY: 40 },
  { src: "5.png", initialX: 26, initialY: 55 },
  { src: "6.png", initialX: 15, initialY: 62 },
  { src: "7.png", initialX: 28, initialY: 75 },
  { src: "15.png", initialX: 8, initialY: 77 },
  { src: "14.png", initialX: 66, initialY: 10 },
  { src: "9.png", initialX: 80, initialY: 17 },
  { src: "8.png", initialX: 87, initialY: 35 },
  { src: "16.png", initialX: 74, initialY: 40 },
  { src: "10.png", initialX: 83, initialY: 55 },
  { src: "17.png", initialX: 90, initialY: 68 },
  { src: "11.png", initialX: 65, initialY: 60 },
  { src: "12.png", initialX: 76, initialY: 70 },
  { src: "13.png", initialX: 68, initialY: 82 },
]
const technologies2 = [
  { src: "3.png", initialX: 8, initialY: 10 },
  { src: "4.png", initialX: 25, initialY: 15 },
  { src: "11.png", initialX: 12, initialY: 25 },
  { src: "12.png", initialX: 40, initialY: 30 },
  { src: "5.png", initialX: 8, initialY: 60 },
  { src: "6.png", initialX: 15, initialY: 70 },
  { src: "7.png", initialX: 28, initialY: 88 },
  { src: "15.png", initialX: 8, initialY: 82 },
  { src: "14.png", initialX: 66, initialY: 10 },
  { src: "13.png", initialX: 80, initialY: 17 },
  { src: "8.png", initialX: 87, initialY: 29 },
  { src: "16.png", initialX: 65, initialY: 25 },
  { src: "10.png", initialX: 83, initialY: 65 },
  { src: "17.png", initialX: 90, initialY: 75 },
  { src: "1.png", initialX: 65, initialY: 70 },
  { src: "2.png", initialX: 50, initialY: 78 },
  { src: "9.png", initialX: 68, initialY: 89 },
]

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const { data: session } = useSession();
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    const storedUser = localStorage.getItem("user");
    if ((session && session.user) || storedUser) {
      console.log(session);
      router.push('/Home');
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const username = session?.user?.name;

  const handleClick2 = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const storeduserinfo = JSON.parse(storedUser);
      try {
        const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
          params: {
            dirname: storeduserinfo.email
            }
        });
    } catch (err) {
        console.error('Error:', err);
    }
      console.log(session);
      router.push('/Devlopement');
    }
    else
    if ((session && session.user)) {
    try {
        const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
          params: {
            dirname: username
            }
        });
    } catch (err) {
        console.error('Error:', err);
    }
      console.log(session);
      router.push('/Devlopement');
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  useEffect(() => {
    technologies.forEach((tech, index) => {
      const delay = 0.2; 
  
      gsap.fromTo(
        `.icon-${index}`,
        { opacity: 0 }, 
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay
        }
      );
    });
  }, []);

  return (
    <div>

    <div className="relative min-h-screen overflow-hidden bg-gray-950 bg-opacity-80">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-gray-950 bg-opacity-80">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex gap-1 justify-center items-center">
                <FaCode className="h-8 w-8 text-blue-400" /><p className="font-bold text-blue-400">CoDev</p>
              </Link>
              {/* <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                  <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</Link>
                  <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                  <Link href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                </div>
              </div> */}
            </div>
            <Header />
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
  {technologies.map(({ src, initialX, initialY }, index) => (
    <div
      key={index}
      className="absolute transition-transform duration-1000 ease-out"
      style={{
        left: `${initialX}%`, 
        top: `${initialY}%`,
        transform: `translate(${(mousePosition.x - initialX) * 0.5}px, ${(mousePosition.y - initialY) * 0.5}px)`,
      }}
    >
      <img className={`icon icon-${index} h-8 w-8 md:h-12 md:w-12`} src={src} alt={`Icon ${index + 1}`}/>
    </div>
  ))}
</div>

<div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden block">
  {technologies2.map(({ src, initialX, initialY }, index) => (
    <div
      key={index}
      className="absolute opacity-80 transition-transform duration-1000 ease-out"
      style={{
        left: `${initialX}%`, 
        top: `${initialY}%`,
        transform: `translate(${(mousePosition.x - initialX) * 0.5}px, ${(mousePosition.y - initialY) * 0.5}px)`,
      }}
    >
      <img className={`icon icon-${index} h-8 w-8 md:h-12 md:w-12`} src={src} alt={`Icon ${index + 1}`}/>
    </div>
  ))}
</div>
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center p-5">
        <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none lg:text-6xl/none">
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          &nbsp;Welcome to CoDev&nbsp;
          </span>
        </h1>
        <p className="mb-8 max-w-[760px] text-gray-300 md:text-xl">
          <TypeAnimation
      sequence={[
       
        'The Smart Collaborative Coding Platform for developers, educators, and teams takes coding to the next level by enabling collaboration.',
        1300, 
        'The Smart Collaborative Coding Platform for developers, educators, and teams takes coding to the next level by enabling coding.',
        1300,
        'The Smart Collaborative Coding Platform for developers, educators, and teams takes coding to the next level by enabling creation.',
        1300,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1em', display: 'inline-block' }}
      repeat={Infinity}
      />
        </p>
        
        <button onClick={() => {
      router.push('/Templates');
    }} className="relative group bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-full">
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
        </button>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950 pointer-events-none"></div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gray-950 pointer-events-none hidden md:block"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950 pointer-events-none block md:hidden"></div> */}

      </div>
      <div id="start-journey" style={{ scrollMarginTop: "80px" }} className="w-full h-auto flex flex-col justify-center items-center bg-gray-950 text-center p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white">Explore Your Path</h1>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
        {/* Coding Card */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-blue-500/30 transition-shadow transform duration-300">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 mb-4">
            <FaCode className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Collaborative Coding</h2>
          <p className="text-gray-400 mb-6">
            Code together in real-time with our advanced collaborative editor. Share ideas, solve problems, and learn from each other seamlessly.
          </p>
          <button className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300" onClick={handleClick}>
            Start Coding
          </button>
        </div>
        {showAlert && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red rounded-lg bg-red-500 z-20 fixed top-20 border"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">You need to be logged in to continue.</span> 
          </div>
        </div>
      )}
        
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-purple-500/30 transition-shadow transform duration-300">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-500 mb-4">
            <FaCogs className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Integrated Development</h2>
          <p className="text-gray-400 mb-6">
          Experience a full development environment with file system and termimal support, platform to reduce the time spent on setup and environment configuration.
          </p>
          <button className="bg-purple-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-300" onClick={()=>{
            router.push('/Templates');
          }}>
            Start Development
          </button>
        </div>

      </div>
    </div>
    <section className="w-full py-16 bg-gray-950 text-white">
  <div className="max-w-7xl mx-auto px-4">
    
   
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Unleash Your Coding Potential
      </h2>
      <p className="text-lg md:text-xl text-gray-300">
        Our collaborative coding platform offers powerful features for an optimized workflow.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { title: 'Real-time Collaboration', icon: FaLaptopCode, text: 'Collaborate with developers in real-time, enhancing productivity and teamwork.' , url:"https://t4.ftcdn.net/jpg/05/57/30/45/360_F_557304508_4HiGABGRGUvzfS1XQkKYVmH45TGhUVOn.jpg"},
        { title: 'Integrated Terminal', icon: FaTerminal, text: 'Access a built-in terminal to execute commands without leaving the platform.',url:"https://thumbs.dreamstime.com/b/programming-code-running-down-old-computer-screen-terminal-binary-background-k-loop-142330923.jpg"},
        { title: 'Docker Integration', icon: FaDocker, text: 'Seamlessly integrate Docker for containerized development and deployment.',url:"https://buddy.works/_next/image?url=%2Fblog%2Fthumbnails%2Fbuild-docker-image-cover.png&w=1920&q=75"},
        { title: 'Extensible Platform', icon: FaCode, text: 'Extend the platform with plugins and integrations to suit your workflow.' ,url:"https://static.vecteezy.com/system/resources/thumbnails/048/039/160/small_2x/isometric-computer-technology-animation-desktop-computer-platforms-software-programming-coding-concept-code-with-computer-monitor-transparent-background-with-alpha-channel-free-video.jpg"},
        { title: 'Online Development', icon: FaCodepen, text: 'Develop your projects online with a robust and secure environment.' ,url:"https://img.lovepik.com/bg/20240414/3D-Illustrated-Web-Development-Coding-and-Programming-Background-Visualized_5827647_wh860.jpg!/fw/860"},
        { title: 'File System Support', icon: FaFile, text: 'Manage project files efficiently with comprehensive file system support.' ,url:"https://www.cgtechnologies.com/wp-content/uploads/2021/10/files-and-folders-network-picture-id954199216-2.jpg"}
      ].map(({ title, icon: Icon, text , url}, idx) => (
        <div 
          key={idx} 
          className="flex flex-col justify-center items-center h-60 mx-0 md:mx-20 text-center p-6 rounded-lg shadow-lg hover:bg-opacity-80 transition-all transform hover:scale-105"
          style={{
            background: `url(${url})`,
          }}
        >
          <Icon className="text-2xl md:text-3xl mb-4 text-cyan-200" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-300">{text}</p>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent pointer-events-none -z-10"></div>
        </div>
      ))}
    </div>
  </div>
</section>
</div>
  )
}




// "use client";

// import { FaCode, FaTerminal,FaLaptopCode,FaDocker, FaFile, FaCodepen,FaReact,FaNodeJs, FaConnectdevelop } from "react-icons/fa";
// import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiPostgresql, SiAuth0, SiWebrtc, SiWebstorm, SiConfluence, SiSocketdotio, SiEditorconfig } from "react-icons/si";
// import { TypeAnimation } from 'react-type-animation';
// import { useRouter } from "next/navigation";
// import Header from "./component/Header";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import axios from "axios";

// const technologies = [
//   { name: "Next.js", icon: SiNextdotjs },
//   { name: "React", icon: FaReact },
//   { name: "TypeScript", icon: SiTypescript },
//   { name: "Tailwind CSS", icon: SiTailwindcss },
//   { name: "Node.js", icon: FaNodeJs },
//   { name: "Express.js", icon: SiExpress },
//   { name: "PostgreSQL", icon: SiPostgresql },
//   { name: "Zod", icon: FaCode }, // Placeholder icon
//   { name: "NextAuth", icon: SiAuth0 }, // Placeholder icon
//   { name: "WebSocket", icon:  SiSocketdotio}, // Placeholder icon
//   { name: "Judge API", icon: FaConnectdevelop }, // Placeholder icon
//   { name: "Docker", icon: FaDocker },
//   { name: "Monaco Editor", icon: FaLaptopCode}, // Placeholder icon
//   { name: "xterm", icon: FaTerminal }, // Placeholder icon
// ];

// export default function Homepage(){

  // const { data: session } = useSession();
  // const router = useRouter();

  // const [showAlert, setShowAlert] = useState(false);

  // const handleClick = () => {
  //   if (session && session.user) {
  //     console.log(session);
  //     router.push('/Home');
  //   } else {
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 2000);
  //   }
  // };

  // const username = session?.user?.name;

  // const handleClick2 = async () => {
  //   if (session && session.user) {
  //     try {
  //       // Make GET request to /dirname endpoint with the dirname
  //       const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
  //         params: {
  //           dirname: username
  //           }
  //       });
  //   } catch (err) {
  //       console.error('Error:', err);
  //   }
  //     console.log(session);
  //     router.push('/Devlopement');
  //   } else {
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 2000);
  //   }
  // };
//     return(
//         <>
//          <video
//         autoPlay
//         muted
//         loop
//         className="fixed top-0 left-0 w-full h-full object-cover -z-20"
//       >
//         <source src="/bg.mp4" type="video/mp4" />
//       </video>
//         <div className="w-full h-screen text-white bg-black bg-opacity-40 relative overflow-hidden">
//           <Header />
      
//       <div className="flex items-center justify-center w-full h-screen absolute inset-0 -z-10">
//         <div className="w-1/4 h-3/4 rounded-full bg-violet-900 bg-opacity-35 blur-3xl animate-spin-slow"></div>

//         <div className="logo-container flex justify-center items-center gap-8">
//         {/* <img className="w-20 h-20 animate-spin" src="React.png" alt="React" /> */}
//         </div>
//       </div>

    
//       <div className="h-full flex justify-center items-center">
//         <div>
//           <div className="font-bold text-4xl flex justify-center items-center text-center">
    //         <TypeAnimation
    //   sequence={[
       
    //     'Next Level Coding Platform Where Collaborate',
    //     1000, 
    //     'Next Level Coding Platform Where Code',
    //     1000,
    //     'Next Level Coding Platform Where Create',
    //     1000,
    //   ]}
    //   wrapper="span"
    //   speed={50}
    //   style={{ fontSize: '1em', display: 'inline-block' }}
    //   repeat={Infinity}
    // />
//           </div>
//           <div className="text-base flex justify-center items-center text-center">
//             CoDev brings developers together in a powerful, real-time collaborative environment. Code, debug, and deploy seamlessly with our cutting-edge platform.
//           </div>
//           <div className="text-base flex justify-center items-center text-center gap-4 mt-4">
//             <button className="w-32 border p-2" onClick={handleClick}
//             >Coding</button>
//             {showAlert && (
//         <div
//           className="flex items-center p-4 mb-4 text-sm text-red rounded-lg bg-red-50 z-20 fixed top-0 border"
//           role="alert"
//         >
//           <svg
//             className="flex-shrink-0 inline w-4 h-4 me-3"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//           </svg>
//           <span className="sr-only">Info</span>
//           <div>
//             <span className="font-medium">Danger alert!</span> You need to be logged in to continue.
//           </div>
//         </div>
//       )}
//             <button className="w-32 border p-2"
//             onClick={handleClick2}
//             >Devlopement</button>
//           </div>
//         <div className="h-36"></div>
//         </div>
//       </div>
//     </div>
//         {/*  */}
//         <hr />
//         <section className="w-full py-16 bg-gray-950 text-white bg-black bg-opacity-40">
//         <div className="max-w-7xl mx-auto px-4">
 
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Unleash Your Coding Potential
//             </h2>
//             <p className="text-base md:text-lg">
//               Our smart collaborative coding platform offers a suite of powerful
//               features to streamline your development workflow.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
//               <FaLaptopCode className="text-4xl mb-4" />
//               <h3 className="text-2xl font-semibold mb-2">Real-time Collaboration</h3>
//               <p className="text-base">
//                 Collaborate with developers in real-time, enhancing productivity and
//                 teamwork.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
//               <FaTerminal className="text-4xl mb-4" />
//               <h3 className="text-2xl font-semibold mb-2">Integrated Terminal</h3>
//               <p className="text-base">
//                 Access a built-in terminal to execute commands without leaving the platform.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
//               <FaDocker className="text-4xl mb-4" />
//               <h3 className="text-2xl font-semibold mb-2">Docker Integration</h3>
//               <p className="text-base">
//                 Seamlessly integrate Docker for containerized development and deployment.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
//               <FaCode className="text-4xl mb-4" />
//               <h3 className="text-2xl font-semibold mb-2">Extensible Platform</h3>
//               <p className="text-base">
//                 Extend the platform with plugins and integrations to suit your workflow.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
//               <FaCodepen className="text-4xl mb-4" />
//               <h3 className="text-2xl font-semibold mb-2">Online Development</h3>
//               <p className="text-base">
//                 Develop your projects online with our robust and secure development environment.
//               </p>
//             </div>

//             <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
//               <FaFile className="text-4xl mb-4" />
//               <h3 className="text-2xl font-semibold mb-2">File System Support</h3>
//               <p className="text-base">
//                 Manage your project files efficiently with comprehensive file system support.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//         <hr />
//         <section className="w-full py-16 bg-gray-800 text-white bg-black bg-opacity-40">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Powered by Best-in-Class Technologies
//             </h2>
//             <p className="text-base md:text-lg">
//               Our smart collaborative coding platform is built on a robust stack of
//               cutting-edge technologies.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//             {technologies.map((tech, index) => {
//               const IconComponent = tech.icon;
//               return (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center text-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
//                 >
//                   <IconComponent className="text-4xl mb-2" aria-label={tech.name} />
//                   <span className="text-lg font-medium">{tech.name}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full py-6 bg-gray-950 text-center text-white">
//         <p>&copy; {new Date().getFullYear()} CoDev. All rights reserved.</p>
//       </footer>
//         </>
//     )
// }