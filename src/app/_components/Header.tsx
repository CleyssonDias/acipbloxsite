import { FaDiscord, FaRegUserCircle } from "react-icons/fa";
import logo from '../../../public/logo.png'
import Image from 'next/image';

export default async function Header() {
    return (
      <header className="fixed w-full flex justify-center py-8 ">
        <div className="flex items-center justify-between w-[90%] max-w-6xl border border-neutral-900 rounded-xl px-6 py-3 bg-transparent backdrop-blur-[3px]">

          <div className="flex items-center space-x-2 m-2">
            <Image
              src={logo}
              alt="logo"
              className="w-30"
            />
          </div>

          <div className='flex items-center justify-between space-x-6'>
            <nav className="flex items-center space-x-6 text-gray-300 font-medium">
              <a href="#" className="hover:text-sky-500 transition">
                Home
              </a>
              <a href="#" className="hover:text-sky-500 transition">
                Sobre nós
              </a>
              <a href="#" className="hover:text-sky-500 transition">
                Feedbacks
              </a>
              <a href="#" className="hover:text-sky-500 transition">
                Planos
              </a>
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

        </div>
      </header>
    )
}