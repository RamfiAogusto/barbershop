/**
 * Contenido del sitio en un solo lugar.
 *
 * Las secciones eran literales repartidos por una pagina de 790 lineas, asi
 * que el mismo dato de contacto vivia en cinco sitios distintos. Centralizarlo
 * evita que el telefono del footer y el del hero se desincronicen.
 */

export const BUSINESS = {
  name: "D' Rafa Peluquería",
  tagline: "El don del corte",
  phone: "+1 (809) 767-2490",
  phoneRaw: "18097672490",
  whatsapp: "https://wa.me/18097672490",
  street: "Respaldo Calle 4",
  neighborhood: "Ensanche Carmelita",
  city: "Santo Domingo",
  region: "Distrito Nacional",
  maps: "https://www.google.com/maps/place/?q=place_id:ChIJqX-RDUiJr44RC2yG2fkCkTM",
  instagram: "https://www.instagram.com/rafa_eldon/",
  facebook: "https://www.facebook.com/RafaelDondelcorte",
  yearsOfCraft: 20,
} as const

export const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
] as const

export const HOURS = [
  { days: "Martes a sábado", time: "8:00 AM - 8:00 PM" },
  { days: "Domingo", time: "8:00 AM - 7:00 PM" },
  { days: "Lunes", time: "Cerrado", closed: true },
] as const

/** Los iconos se resuelven en el componente para no acoplar datos con la UI. */
export const SERVICES = [
  {
    id: "corte-tijera",
    icon: "scissors",
    name: "Corte a tijera",
    description:
      "Técnica tradicional, control total sobre el largo y la textura. El corte que mejor envejece entre visita y visita.",
  },
  {
    id: "corte-clasico",
    icon: "knife",
    name: "Corte clásico",
    description:
      "Máquina y navaja. Perfilado limpio de patillas y nuca, con el acabado que se nota a la semana.",
  },
  {
    id: "barba",
    icon: "feather",
    name: "Arreglo de barba",
    description:
      "Perfilado y mantenimiento pensados para el clima del Caribe, donde la barba se reseca más rápido.",
  },
  {
    id: "tintura",
    icon: "eyedropper",
    name: "Tintura temporal",
    description:
      "Color sin compromiso permanente. Para una ocasión puntual o para probar un tono antes de decidir.",
  },
  {
    id: "ninos",
    icon: "baby",
    name: "Corte para niños",
    description:
      "Primeros cortes incluidos. Paciencia con los que se ponen nerviosos y no hay apuro con la máquina.",
  },
  {
    id: "femenino",
    icon: "sparkle",
    name: "Corte femenino",
    description:
      "Cortes y diseños para mujeres, con la misma mano que sostiene el resto del oficio desde hace veinte años.",
  },
] as const

export const GALLERY = [
  { src: "/assets/bw/corte1.webp", alt: "Corte clásico terminado en D' Rafa Peluquería" },
  { src: "/assets/bw/corte2.webp", alt: "Degradado trabajado a máquina y navaja" },
  { src: "/assets/bw/corte3.webp", alt: "Corte a tijera con acabado de precisión" },
  { src: "/assets/bw/corte4.webp", alt: "Corte para adolescentes en Ensanche Carmelita" },
] as const
