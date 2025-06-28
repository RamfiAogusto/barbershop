'use client'

import Link from "next/link"
import Image from "next/image"
import { Scissors, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold">
                D' RAFA<span className="text-amber-500">PELUQUERÍA</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              El don del corte. Más de 20 años de experiencia en el arte de la barbería.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/rafa_eldon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/RafaelDondelcorte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/18097672490"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Image
                  src="/assets/whatsapp.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="h-5 w-5 filter invert brightness-0 contrast-100 opacity-60 hover:opacity-100 transition-all duration-200 hover:brightness-200 hover:sepia hover:saturate-200 hover:hue-rotate-15"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {["Inicio", "Nosotros", "Servicios", "FAQ", "Galería", "Contacto"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Servicios" ? "/servicios" : 
                      item === "FAQ" ? "/faq" : 
                      `/#${item.toLowerCase()}`
                    }
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {["Corte", "Corte a Tijera", "Corte a Adolescentes", "Corte a Niños", "Cerquillos", "Cejas"].map(
                (item) => (
                  <li key={item}>
                    <Link href="/servicios" className="text-gray-400 hover:text-amber-500 transition-colors">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Horario</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-400">Martes - Sábado</span>
                <span className="text-amber-500">8:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Domingo</span>
                <span className="text-amber-500">8:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Lunes</span>
                <span className="text-amber-500">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 mb-2">
            &copy; {new Date().getFullYear()} D' Rafa Peluquería. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-sm">
            Powered by{" "}
            <a
              href="https://www.instagram.com/vityde_web/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 transition-colors font-medium"
            >
              @vityde_web
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
} 