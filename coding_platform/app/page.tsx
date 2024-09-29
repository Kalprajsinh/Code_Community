"use client";

import { FaCode } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from "next/navigation";

export default function Homepage(){

  const router = useRouter();

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
          <div className="h-24 z-10 absolute flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-1 ml-4 text-2xl">
            <FaCode /> CoDev
            </div>
            <div className="flex justify-center items-center gap-2 mr-4 text-xl">
            <a href="">Login</a>
            <a href="">SignUp</a>
            </div>
          </div>
      

      {/* Logo Container */}
      <div className="flex items-center justify-center w-full h-screen absolute inset-0 -z-10">
        <div className="w-1/4 h-3/4 rounded-full bg-violet-900 bg-opacity-35 blur-3xl animate-spin-slow"></div>

        <div className="logo-container flex justify-center items-center gap-8">
        {/* <img className="w-20 h-20 animate-spin" src="React.png" alt="React" /> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen flex justify-center items-center z-10">
        <div>
          <div className="font-bold text-4xl flex justify-center items-center text-center">
            <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Next Level Platform Where Collaborate',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
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
            <button className="w-32 border p-2" onClick={
              () => {
                router.push('/Home');

              }
            }>Coding</button>
            <button className="w-32 border p-2"
            onClick={ () => { router.push('/Devlopement');}}
            >Devlopement</button>
          </div>
        </div>
      </div>
    </div>
        {/*  */}
        <hr />
        <div className="w-full h-screen bg-gray-950 text-white">
            <div className="h-1/3 flex justify-center items-center">
            <div>
            <div className="font-bold text-4xl flex justify-center items-center">Unleash Your Coding Potential</div>
            <div className="text-base flex justify-center items-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ab expedita hic reprehenderit unde facilis iure illo a eligendi fuga.</div>
            </div>
            
            </div>
            
            
            <div className="flex justify-center items-center h-1/3">
            <div className="w-5/6 grid grid-cols-3">
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
            </div>
            </div>
            <div className="flex justify-center items-center h-1/3">
            <div className="w-5/6 grid grid-cols-3">
            <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
            </div>
            </div>
        </div>
        <hr />
        <div className="w-full h-screen">
            <div className="h-1/3 flex justify-center items-center">
            <div>
            <div className="font-bold text-4xl flex justify-center items-center">Unleash Your Coding Potential</div>
            <div className="text-base flex justify-center items-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia ab expedita hic reprehenderit unde facilis iure illo a eligendi fuga.</div>
            </div>
            
            </div>
            
            
            <div className="flex justify-center items-center h-1/3">
            <div className="w-5/6 grid grid-cols-3">
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
            </div>
            </div>
            <div className="flex justify-center items-center h-1/3">
            <div className="w-5/6 grid grid-cols-3">
            <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
                <div className="w-full">
                    <div className="font-bold text-2xl flex gap-5"><FaCode />Real-time</div>
                    <div className="text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente ipsum quo soluta cumque perferendis </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}