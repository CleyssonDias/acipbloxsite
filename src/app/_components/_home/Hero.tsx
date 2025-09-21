"use client"
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default async function Hero() {
    const el = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Robux", "Pets", "Itens", "GamePass", "Server Privado", "Troca segura"],
            typeSpeed:80,
            backSpeed:50,
            backDelay:1200,
            loop:true
        })

        return () => {
            typed.destroy()
        }
    })

    return (
        <div className='text-8xl text-white'>
            <h1>
                A Melhor loja e mais barata do brasil na venda de{" "}
                <span ref={el} />
            </h1>
        </div>
    )
} 