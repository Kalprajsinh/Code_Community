"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  FaCode,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaPython,
  FaNodeJs,
  FaArrowRight,
  FaLaptopCode,
  FaPhp,
  FaCogs,
} from 'react-icons/fa';
import Header from '../component/Header';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function Template() {

    useEffect( ()=>{
            localStorage.removeItem("userdir");
    },[])

    const { data: session } = useSession();
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  const username = session?.user?.name;

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

    const handleClick2 = async () => {
        setShowAlert2(true);
        setTimeout(() => {
            setShowAlert(false);
          }, 4000);
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

      const handleClick01 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'React'
                    }
                });
            localStorage.setItem("userdir", JSON.stringify({ dirname: 'React' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClick02 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'JavaScript'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'JavaScript' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClickhtml = async () => {
          router.push('/Webdevelopment');
    };
    
    const handleClick03 = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser || (session && session.user)) {
          setShowAlert2(true);
          setTimeout(() => {
              setShowAlert(false);
            }, 4000);
          try {
              const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                params: {
                  dirname: 'Cpp'
                  }
              });
              localStorage.setItem("userdir", JSON.stringify({ dirname: 'Cpp' }));  
          } catch (err) {
              console.error('Error:', err);
          }
            console.log(session);
            router.push('/Devlopement');
      }
      else{
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
      }
    };
      const handleClick04 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'Java'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'Java' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClick05 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'Python'
                    }
                });
            localStorage.setItem("userdir", JSON.stringify({ dirname: 'Python' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClick06 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'Node'
                    }
                });
            localStorage.setItem("userdir", JSON.stringify({ dirname: 'Node' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClick07 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'Go'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'Go' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClick08 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'C'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'C' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

      const handleClick09 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'Ruby'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'Ruby' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };
      const handleClick10 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'PHP'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'PHP' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };
      const handleClick11 = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser || (session && session.user)) {
            setShowAlert2(true);
            setTimeout(() => {
                setShowAlert(false);
              }, 4000);
            try {
                const response = await axios.get('https://docker-x4tj.onrender.com/dirname', {
                  params: {
                    dirname: 'Shell'
                    }
                });
                localStorage.setItem("userdir", JSON.stringify({ dirname: 'Shell' }));  
            } catch (err) {
                console.error('Error:', err);
            }
              console.log(session);
              router.push('/Devlopement');
        }
        else{
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);
        }
      };

  
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-gray-950 bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex-shrink-0 flex gap-1 justify-center items-center"
              >
                <FaCode className="h-8 w-8 text-blue-400" />
                <p className="font-bold text-blue-400">CoDev</p>
              </Link>
              {/* <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Features
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                </div>
              </div> */}
            </div>
            <Header />
          </div>
        </div>
      </nav>
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
      {showAlert2 && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red rounded-lg bg-blue-500 z-20 fixed top-20 border ml-10"
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
            <span className="font-medium">Docker takes time to set up please wait...</span> 
          </div>
        </div>
      )}
      <header className="text-center py-10 mt-10">
        <h1 className="text-4xl font-bold">Collaborative Coding IDE</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-7xl mx-auto">
          <button onClick={handleClick}
            className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700"
          >
          
              <div className="text-3xl"><FaLaptopCode className='text-blue-500' /></div> <br />
              <h2 className="text-xl font-semibold">Collaborative Coding</h2>
            <ul className="list-disc text-gray-400">
            <p className='w-11/12'>Code together in real-time with our advanced collaborative editor. Share ideas, solve problems, and learn from each other seamlessly.</p>
            <li className='flex gap-1 flex-col md:flex-row'>
            <div>suppordet language:</div><div className='flex items-center'><FaPython />,<p>C</p> , <p>Cpp</p> , <FaJava />,<FaJs />, <p>C#</p> ,<FaPhp /></div>
            </li>
            </ul>
            <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
              Start <FaArrowRight className='text-sm mt-1' />
            </div>
          </button>
          <button onClick={handleClick2}
            className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700"
          >
          
              <div className="text-3xl"><FaCogs className='text-purple-500' /></div> <br />
              <h2 className="text-xl font-semibold">Integrated Development</h2>
            <ul className="list-disc text-gray-400">
            <p className='w-11/12'>Experience a full development environment with file system and termimal support, easy-to-use platform to reduce the time spent on setup and environment configuration.</p>
            <li className='flex gap-1 flex-col md:flex-row'>

            </li>
            </ul>
            <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
              Start <FaArrowRight className='text-sm mt-1' />
            </div>
          </button>
      </div>

      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">CoDev Templates</h1>
        <p className="text-gray-400 mt-2 text-xl">
          Start your new project with one of these templates.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
  {/* <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick01}>
    <div className="text-3xl"><FaReact className="text-blue-400" /></div><br />
    <h2 className="text-xl font-semibold">React</h2>
    <ul className="list-disc text-gray-400">
      React starter template for creating dynamic user interfaces.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button> */}

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick06}>
    <div className="text-3xl flex gap-2 items-center"><FaNodeJs className="text-green-600" />+<img className='w-10 h-10' src="./6.png" alt="" />  <img className='w-auto h-10' src="https://miro.medium.com/v2/resize:fit:440/1*J3G3akaMpUOLegw0p0qthA.png" alt="" /></div><br />
    <h2 className="text-xl font-semibold">Node.js & Express</h2>
    <ul className="list-disc text-gray-400">
      Node.js, Express template for building backend APIs.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick02}>
    <div className="text-3xl"><FaJs className="text-yellow-400" /></div><br />
    <h2 className="text-xl font-semibold">JavaScript</h2>
    <ul className="list-disc text-gray-400">
      A pure JavaScript project template for building JS apps.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClickhtml}>
    <div className="text-3xl">
      <div className="flex space-x-1">
        <FaHtml5 className="text-orange-500" />
        <FaCss3Alt className="text-blue-500" />
        <FaJs className="text-yellow-400" />
      </div>
    </div><br />
    <h2 className="text-xl font-semibold">HTML + CSS + JavaScript</h2>
    <ul className="list-disc text-gray-400">
      Combines HTML, CSS, and JavaScript web pages.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClickhtml}>
    <div className="text-3xl">
      <div className="flex space-x-1">
        <FaHtml5 className="text-orange-500" />
        <FaCss3Alt className="text-blue-500" />
      </div>
    </div><br />
    <h2 className="text-xl font-semibold">HTML + CSS</h2>
    <ul className="list-disc text-gray-400">
      A classic HTML and CSS template for static websites.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick03}>
    <div className="w-8 h-8"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png" alt="" /></div><br />
    <h2 className="text-xl font-semibold">C++</h2>
    <ul className="list-disc text-gray-400">
      Template for writing C++ programs.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick05}>
    <div className="w-8 h-8"><img src="https://images.vexels.com/media/users/3/166477/isolated/preview/9bb722f0e85ddbc1ce0f064534fd2311-python-programming-language-icon.png" alt="" /></div><br />
    <h2 className="text-xl font-semibold">Python</h2>
    <ul className="list-disc text-gray-400">
      Template for Python projects.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick04}>
    <div className="text-3xl"><FaJava className="text-red-600" /></div><br />
    <h2 className="text-xl font-semibold">Java</h2>
    <ul className="list-disc text-gray-400">
      Starter project for Java applications.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick07}>
    <div className="w-8 h-8"><img src="https://img.icons8.com/?size=512&id=44442&format=png" alt="" /></div><br />
    <h2 className="text-xl font-semibold">Go</h2>
    <ul className="list-disc text-gray-400">
    Go starter template.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>

  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick08}>
    <div className="w-8 h-8"><img src="https://cdn.imweb.me/thumbnail/20220502/43fd84a81e4e5.png" alt="" /></div><br />
    <h2 className="text-xl font-semibold">C</h2>
    <ul className="list-disc text-gray-400">
    C starter template.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>
  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick09}>
    <div className="w-8 h-8"><img src="https://cdn.iconscout.com/icon/free/png-256/free-ruby-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-freebies-pack-logos-icons-1175101.png?f=webp&w=256" alt="" /></div><br />
    <h2 className="text-xl font-semibold">Ruby</h2>
    <ul className="list-disc text-gray-400">
        Ruby starter template.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>
  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick10}>
    <div className="text-3xl"><FaPhp className='text-violet-400' /></div><br />
    <h2 className="text-xl font-semibold">PHP</h2>
    <ul className="list-disc text-gray-400">
        Ruby starter template.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>
  <button className="w-full bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-2xl transition flex flex-col items-start text-left hover:bg-gray-700" onClick={handleClick11}>
    <div className="w-8 h-8"><img src="https://i0.wp.com/cachecrew.com/blog/wp-content/uploads/2023/03/kisspng-bash-shell-script-command-line-interface-z-shell-5b3df572212d73.0687702015307871861359.png?fit=528%2C528&ssl=1" alt="" /></div><br />
    <h2 className="text-xl font-semibold">Shell Script</h2>
    <ul className="list-disc text-gray-400">
    Shell Script starter template.
    </ul>
    <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex justify-center items-center gap-2">
      Start <FaArrowRight className="text-sm mt-1" />
    </div>
  </button>
  
</div>

      <div className='h-20'></div>
    </div>
  );
}
