"use client"

import { useEffect, useRef } from 'react'
import { FaArrowRightLong } from "react-icons/fa6"
import { IoLogoDiscord } from "react-icons/io5"
import Typed from 'typed.js'
import Image from 'next/image'
import Banner from '../../../../public/banner.png'

export default function Hero() {
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Robux", "Pets", "Itens", "GamePass"],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1200,
      loop: true
    })

    return () => typed.destroy()
  }, [])

  return (
    <div className="min-h-screen w-full flex justify-center items-center overflow-clip relative px-6 md:px-12 pt-20 md:pt-0">

      {/* Bolas flutuantes animadas */}
      <div className="absolute -top-32 -left-32 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-sky-800/95 rounded-full filter blur-3xl opacity-30 float-x float-delay-1"></div>
      <div className="absolute right-10 md:right-32 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-sky-800/95 rounded-full filter blur-3xl opacity-40 float-y float-delay-2"></div>
      <div className="absolute right-10 md:right-[150px] top-28 md:top-[110px] z-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-sky-800/95 rounded-full filter blur-3xl opacity-40 float-x float-delay-2"></div>

      {/* Conteúdo principal */}
      <div className="flex flex-col lg:flex-row items-center w-full justify-center text-white font-bold z-20">

        {/* Texto e botões */}
        <div className="p-4 text-center lg:text-left lg:mr-16">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl">A maior loja</h1>
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
            de <span className="text-sky-500" ref={el} />
          </h1>
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl">do Brasil!</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light mt-2">
            Compre com confiaça, rapidez e seguraça!<br />
            Venha fazer parte da nossa comunidade do <br />
            discord clique abaixo:
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 mt-5 justify-center lg:justify-start">
            <button className="cursor-pointer bg-sky-500 text-base sm:text-lg md:text-xl text-white p-3 sm:p-4 rounded-md flex justify-center items-center gap-2 hover:bg-white hover:text-sky-500 transition duration-500 hover:scale-105">
              COMPRE AGORA <FaArrowRightLong />
            </button>
            <button className="cursor-pointer border font-bold border-neutral-700 text-base sm:text-lg md:text-xl text-white p-3 sm:p-4 rounded-md flex justify-center items-center gap-2 hover:bg-sky-500 hover:text-white transition duration-500 hover:scale-105">
              NOSSO DISCORD <IoLogoDiscord />
            </button>
          </div>
        </div>

        {/* Banner flutuante escondido em mobile */}
<div className="hidden lg:block">
  <Image 
    className="w-72 sm:w-96 md:w-[500px] lg:w-150 mt-8 lg:mt-0 animate-[float_3s_ease-in-out_infinite]" 
    src={Banner} 
    alt="Banner server" 
  />
</div>              
      </div>
    </div>
  )
}
