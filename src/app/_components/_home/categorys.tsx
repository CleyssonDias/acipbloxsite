import Image from 'next/image'
import { FaPix } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa"
import { RiDiscountPercentFill } from "react-icons/ri"

const data = {
  lojas: [
    {
      title: "ROBUX",
      itens: Array(20).fill({
        title: "1000 ROBUX",
        img: "https://cdn.discordapp.com/attachments/1410637266367414392/1419463875710943322/Instagram_post_-_1_1.png?ex=68d1da40&is=68d088c0&hm=c80ee2f70e54c9800b88ec9c97c16effb47088d42caab41296bcd482e4cabbb2&",
        prince: 40,
        princedes: 100
      })
    },
    {
      title: "ROBUX",
      itens: [
        {
          title: "1000 ROBUX",
          img:"https://cdn.discordapp.com/attachments/1410637266367414392/1419463875710943322/Instagram_post_-_1_1.png?ex=68d1da40&is=68d088c0&hm=c80ee2f70e54c9800b88ec9c97c16effb47088d42caab41296bcd482e4cabbb2&",
          prince: 40,
          princedes: 100
        }
      ]
    }
  ]
}

export default function Categorys() {
  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-10">
      {data.lojas.map((loja, i) => (
        <div key={i} className="mb-16">
          <h2 className=" mt-10 border border-sky-500 text-sky-500 w-fit p-2 rounded-md px-4 text-sm">
            {loja.title}
          </h2>

        <div className="mt-4 px-4 sm:px-6 md:px-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {loja.itens.map((item, j) => (
              <div
                key={j}
                className="border border-neutral-700 hover:border-sky-500 rounded-2xl text-white flex flex-col transition-transform hover:scale-105 bg-gray-900/20"
              >
               
                <Image
                  width={300}
                  height={300}
                  className="w-full h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 object-cover mb-1 rounded-t-2xl"
                  src={item.img}
                  alt={item.title}
                />

                <div className='p-3 sm:p-4 flex flex-col justify-between h-full'>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>

                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-base sm:text-lg font-bold line-through text-gray-600">
                          R${item.princedes}
                        </p>
                        <div className="flex items-center gap-1 text-xs sm:text-sm bg-sky-950 border border-sky-500 text-sky-500 font-bold p-1 rounded-md">
                          <RiDiscountPercentFill /> 30%
                        </div>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-sky-500 mt-1">R${item.prince}</p>
                      <p className="text-xs sm:text-sm text-gray-400">À VISTA NO PIX</p>
                    </div>

                    <FaPix size={25} className="sm:mt-1"/>
                  </div>

                  <button className="cursor-pointer w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-sky-700 rounded-md font-bold text-white text-sm sm:text-base hover:bg-white hover:text-sky-700 transition">
                    <FaShoppingCart />
                    COMPRAR AGORA
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}