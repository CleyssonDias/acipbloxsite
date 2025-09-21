import { FaDiscord, FaTiktok } from 'react-icons/fa';
import logo from '../../../public/logo.png'
import Image from 'next/image';

export default async function Footer() {
    return (
         <footer className="bg-black text-gray-300 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border border-neutral-900 rounded-2xl p-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src={logo} alt="AcipLogo" className="w-20" />
            </div>
            <p className="text-sm text-gray-400">
              Somos uma loja especializada em produtos relacionados ao Roblox, com foco em oferecer qualidade, inovação e experiências únicas aos nossos clientes. Trabalhamos com grandes ideias e ambições, buscando constantemente novas oportunidades para crescer e superar expectativas.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Sobre</a></li>
              <li><a href="#" className="hover:text-white">Feedbacks</a></li>
              <li><a href="#" className="hover:text-white">Planos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Discord</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso e Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Compras e Pagamentos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-white">
                <FaDiscord className='hover:scale-125 transition duration-100'/>
              </a>
              <a href="#" className="text-2xl hover:text-white">
                <FaTiktok className='hover:scale-125 transition duration-100'/>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          © 2025 AcipBlox. Todos os direitos reservados.
        </div>

      </footer>
    )
}