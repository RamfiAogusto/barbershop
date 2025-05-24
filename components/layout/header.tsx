'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Scissors, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleBookNow = () => {
    window.location.href = "/reservar"
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? "bg-black/90 backdrop-blur-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <motion.div initial={{ rotate: -90 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
            <Scissors className="h-8 w-8 text-amber-500" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold tracking-tighter"
          >
            D' RAFA<span className="text-amber-500">PELUQUERÍA</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Inicio", "Nosotros", "Servicios", "Galería", "Contacto"].map((item, index) => (
            <motion.a
              key={item}
              href={item === "Servicios" ? "/servicios" : `/#${item.toLowerCase()}`}
              className="text-white hover:text-amber-500 transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button onClick={handleBookNow} className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
              Reservar Ahora
            </Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black/95 backdrop-blur-sm absolute top-full left-0 w-full py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 flex flex-col gap-4">
            {["Inicio", "Nosotros", "Servicios", "Galería", "Contacto"].map((item) => (
              <Link
                key={item}
                href={item === "Servicios" ? "/servicios" : `/#${item.toLowerCase()}`}
                className="text-white hover:text-amber-500 py-2 border-b border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Button
              onClick={() => {
                handleBookNow()
                setIsMenuOpen(false)
              }}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold mt-2"
            >
              Reservar Ahora
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  )
} 