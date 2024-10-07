"use client";

import { FaCode, FaTerminal,FaLaptopCode,FaDocker, FaFile, FaCodepen,FaReact,FaNodeJs, FaConnectdevelop } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiPostgresql, SiAuth0, SiWebrtc, SiWebstorm, SiConfluence, SiSocketdotio, SiEditorconfig } from "react-icons/si";
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from "next/navigation";
import Header from "./Component/Header";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const technologies = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: FaReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express.js", icon: SiExpress },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Zod", icon: FaCode }, // Placeholder icon
  { name: "NextAuth", icon: SiAuth0 }, // Placeholder icon
  { name: "WebSocket", icon:  SiSocketdotio}, // Placeholder icon
  { name: "Judge API", icon: FaConnectdevelop }, // Placeholder icon
  { name: "Docker", icon: FaDocker },
  { name: "Monaco Editor", icon: FaLaptopCode}, // Placeholder icon
  { name: "xterm", icon: FaTerminal }, // Placeholder icon
];

export default function Homepage(){

  const { data: session } = useSession();
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    if (session && session.user) {
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
    if (session && session.user) {
      try {
        // Make GET request to /dirname endpoint with the dirname
        const response = await axios.get('http://localhost:9000/dirname', {
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
    return(
        <>
         <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
        <div className="w-full h-screen text-white bg-black bg-opacity-40 relative overflow-hidden">
          <Header />
      
      <div className="flex items-center justify-center w-full h-screen absolute inset-0 -z-10">
        <div className="w-1/4 h-3/4 rounded-full bg-violet-900 bg-opacity-35 blur-3xl animate-spin-slow"></div>

        <div className="logo-container flex justify-center items-center gap-8">
        {/* <img className="w-20 h-20 animate-spin" src="React.png" alt="React" /> */}
        </div>
      </div>

    
      <div className="h-full flex justify-center items-center">
        <div>
          <div className="font-bold text-4xl flex justify-center items-center text-center">
            <TypeAnimation
      sequence={[
       
        'Next Level Platform Where Collaborate',
        1000, 
        'Next Level Platform Where Code',
        1000,
        'Next Level Platform Where Create',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1em', display: 'inline-block' }}
      repeat={Infinity}
    />
          </div>
          <div className="text-base flex justify-center items-center text-center">
            CoDev brings developers together in a powerful, real-time collaborative environment. Code, debug, and deploy seamlessly with our cutting-edge platform.
          </div>
          <div className="text-base flex justify-center items-center text-center gap-4 mt-4">
            <button className="w-32 border p-2" onClick={handleClick}
            >Coding</button>
            {showAlert && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red rounded-lg bg-red-50 z-20 fixed top-0 border"
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
            <span className="font-medium">Danger alert!</span> You need to be logged in to continue.
          </div>
        </div>
      )}
            <button className="w-32 border p-2"
            onClick={handleClick2}
            >Devlopement</button>
          </div>
        <div className="h-36"></div>
        </div>
      </div>
    </div>
        {/*  */}
        <hr />
        <section className="w-full py-16 bg-gray-900 text-white bg-black bg-opacity-40">
        <div className="max-w-7xl mx-auto px-4">
 
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unleash Your Coding Potential
            </h2>
            <p className="text-base md:text-lg">
              Our smart collaborative coding platform offers a suite of powerful
              features to streamline your development workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <FaLaptopCode className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-base">
                Collaborate with developers in real-time, enhancing productivity and
                teamwork.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <FaTerminal className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Integrated Terminal</h3>
              <p className="text-base">
                Access a built-in terminal to execute commands without leaving the platform.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <FaDocker className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Docker Integration</h3>
              <p className="text-base">
                Seamlessly integrate Docker for containerized development and deployment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <FaCode className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Extensible Platform</h3>
              <p className="text-base">
                Extend the platform with plugins and integrations to suit your workflow.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <FaCodepen className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Online Development</h3>
              <p className="text-base">
                Develop your projects online with our robust and secure development environment.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
              <FaFile className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">File System Support</h3>
              <p className="text-base">
                Manage your project files efficiently with comprehensive file system support.
              </p>
            </div>
          </div>
        </div>
      </section>
        <hr />
        <section className="w-full py-16 bg-gray-800 text-white bg-black bg-opacity-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by Best-in-Class Technologies
            </h2>
            <p className="text-base md:text-lg">
              Our smart collaborative coding platform is built on a robust stack of
              cutting-edge technologies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  <IconComponent className="text-4xl mb-2" aria-label={tech.name} />
                  <span className="text-lg font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900 text-center text-white">
        <p>&copy; {new Date().getFullYear()} CoDev. All rights reserved.</p>
      </footer>
        </>
    )
}