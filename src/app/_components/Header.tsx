'use client'
import { useState } from "react";
import { FaDiscord, FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from '../../../public/logo.png';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center py-4">
      <div className="flex items-center justify-between w-[90%] max-w-6xl border border-neutral-900 rounded-xl px-4 md:px-6 py-3 bg-transparent backdrop-blur-[10px]">

        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="logo"
            className="w-28 sm:w-30"
          />
        </div>

<div>
          {/* Menu Desktop */}
        <div className="hidden md:flex items-center justify-between space-x-6 w-full">
          <nav className="flex items-center space-x-6 text-gray-300 font-medium">
            <a href="#" className="hover:text-sky-500 transition">Home</a>
            <a href="#" className="hover:text-sky-500 transition">Sobre nós</a>
            <a href="#" className="hover:text-sky-500 transition">Feedbacks</a>
            <a href="#" className="hover:text-sky-500 transition">Planos</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="flex justify-center items-center gap-2 px-4 py-2 border font-bold border-neutral-700 rounded-lg text-white hover:bg-sky-500 transition duration-500 hover:scale-105"
            >
              <FaDiscord />
              Discord
            </a>
            <a
              href="#"
              className="flex justify-center items-center gap-2 px-4 py-2 bg-sky-500 rounded-lg text-white font-medium hover:bg-white hover:text-sky-500 transition duration-500 hover:scale-105"
            >
              <FaRegUserCircle />
              Login
            </a>
          </div>
        </div>

        {/* Botão Hamburger Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
</div>


        {/* Menu Mobile */}
      {menuOpen && (
  <div className="absolute top-full left-0 w-full md:hidden mt-2 rounded-b-xl animate-slide-down
                  bg-black/30 backdrop-blur-[50px] border border-neutral-900 flex flex-col items-center py-6 space-y-4 z-50">
    <a href="#" className="text-white font-medium hover:text-sky-500 transition">Home</a>
    <a href="#" className="text-white font-medium hover:text-sky-500 transition">Sobre nós</a>
    <a href="#" className="text-white font-medium hover:text-sky-500 transition">Feedbacks</a>
    <a href="#" className="text-white font-medium hover:text-sky-500 transition">Planos</a>
    <div className="flex flex-col sm:flex-row gap-3 mt-2">
      <a
        href="#"
        className="flex justify-center items-center gap-2 px-4 py-2 border font-bold border-neutral-700 rounded-lg text-white hover:bg-sky-500 transition duration-500 hover:scale-105"
      >
        <FaDiscord />
        Discord
      </a>
      <a
        href="#"
        className="flex justify-center items-center gap-2 px-4 py-2 bg-sky-500 rounded-lg text-white font-medium hover:bg-white hover:text-sky-500 transition duration-500 hover:scale-105"
      >
        <FaRegUserCircle />
        Login
      </a>
    </div>
  </div>
)}


      </div>
    </header>
  )
}
