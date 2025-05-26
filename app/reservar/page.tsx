"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, User, Mail, Phone, ArrowLeft, Check } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { createBooking } from "@/app/actions/booking"

// Servicios disponibles
const services = [
  { id: "corte", name: "Corte", duration: 30, price: "$350" },
  { id: "corte-tijera", name: "Corte a Tijera", duration: 45, price: "$500" },
  { id: "corte-adolescentes", name: "Corte a Adolescentes", duration: 30, price: "$250" },
  { id: "corte-ninos", name: "Corte a Niños", duration: 20, price: "$200" },
  { id: "cerquillos", name: "Cerquillos", duration: 15, price: "$200" },
  { id: "cejas", name: "Cejas", duration: 15, price: "$100" },
]

// Barberos disponibles
const barbers = [
  { id: "rafa", name: "Rafa", specialty: "Maestro Barbero" },
  // Puedes añadir más barberos si los hay
]

// Horarios disponibles (simulados)
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour < 20; hour++) {
    slots.push(`${hour}:00`)
    if (hour < 19) {
      slots.push(`${hour}:30`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

// Función para generar disponibilidad simulada
const getAvailableSlots = (date: Date, barberId: string, serviceId: string) => {
  // Simulamos que algunos horarios ya están ocupados
  const day = date.getDay()
  const randomUnavailable: string[] = []

  // Generamos entre 3 y 8 horarios aleatorios que estarán ocupados
  const unavailableCount = Math.floor(Math.random() * 6) + 3
  for (let i = 0; i < unavailableCount; i++) {
    const randomIndex = Math.floor(Math.random() * timeSlots.length)
    randomUnavailable.push(timeSlots[randomIndex])
  }

  // Los lunes (día 1) no hay disponibilidad
  if (day === 1) {
    return []
  }

  // Los domingos (día 0) solo hasta las 19:00
  if (day === 0) {
    return timeSlots
      .filter((slot) => Number.parseInt(slot.split(":")[0]) < 19)
      .filter((slot) => !randomUnavailable.includes(slot))
  }

  // Resto de días, todos los horarios menos los aleatorios ocupados
  return timeSlots.filter((slot) => !randomUnavailable.includes(slot))
}

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function BookingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service: "",
    barber: "",
    date: new Date(),
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  // Calcular el precio y duración del servicio seleccionado
  const selectedService = services.find((s) => s.id === formData.service)
  const selectedBarber = barbers.find((b) => b.id === formData.barber)

  // Actualizar los horarios disponibles cuando cambia la fecha o el barbero
  const updateAvailableSlots = (date: Date, barberId: string) => {
    if (date && barberId && formData.service) {
      const slots = getAvailableSlots(date, barberId, formData.service)
      setAvailableSlots(slots)
      // Resetear la hora seleccionada si ya no está disponible
      if (formData.time && !slots.includes(formData.time)) {
        setFormData((prev) => ({ ...prev, time: "" }))
      }
    }
  }

  // Manejar cambios en el formulario
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Actualizar slots disponibles cuando cambia la fecha o el barbero
    if (field === "date" || field === "barber") {
      updateAvailableSlots(field === "date" ? value : formData.date, field === "barber" ? value : formData.barber)
    }
  }

  // Avanzar al siguiente paso
  const nextStep = () => {
    if (step === 1 && (!formData.service || !formData.barber || !formData.date || !formData.time)) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos para continuar",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && (!formData.name || !formData.email || !formData.phone)) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa tu información de contacto",
        variant: "destructive",
      })
      return
    }

    setStep((prev) => prev + 1)
  }

  // Volver al paso anterior
  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  // Enviar la reserva
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Llamar a la acción del servidor para crear la reserva
      await createBooking({
        ...formData,
        dateFormatted: format(formData.date, "yyyy-MM-dd"),
        serviceName: selectedService?.name || "",
        barberName: selectedBarber?.name || "",
      })

      // Generar el mensaje para WhatsApp
      const whatsappMessage = `
Nueva Reserva:
Servicio: ${selectedService?.name}
Barbero: ${selectedBarber?.name}
Fecha: ${format(formData.date, "EEEE d MMMM, yyyy", { locale: es })}
Hora: ${formData.time}
Cliente: ${formData.name}
Teléfono: ${formData.phone}
Email: ${formData.email}
${formData.notes ? `Notas: ${formData.notes}` : ""}
      `.trim()

      // Generar el enlace de WhatsApp
      const whatsappLink = `https://wa.me/18097672490?text=${encodeURIComponent(whatsappMessage)}`

      // Mostrar confirmación
      setBookingComplete(true)

      // Notificar al usuario
      toast({
        title: "¡Reserva confirmada!",
        description: "Hemos recibido tu solicitud de reserva. Por favor, envía el mensaje por WhatsApp para confirmar tu cita.",
      })

      // Abrir WhatsApp en una nueva pestaña
      if (isMobile()) {
        window.location.href = whatsappLink;
      } else {
        window.open(whatsappLink, '_blank');
      }
    } catch (error) {
      toast({
        title: "Error al procesar la reserva",
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generar fechas para el calendario (próximos 30 días)
  const today = new Date()
  const maxDate = addDays(today, 30)

  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Renderizar el paso de confirmación
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="bg-amber-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-black" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">¡Reserva Confirmada!</h1>

            <Card className="bg-gray-900 border-gray-800 mt-8 mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-amber-500 mb-2">Detalles de la Cita</h3>
                      <p className="text-gray-300">
                        <strong>Servicio:</strong> {selectedService?.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Barbero:</strong> {selectedBarber?.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Fecha:</strong> {format(formData.date, "EEEE d MMMM, yyyy", { locale: es })}
                      </p>
                      <p className="text-gray-300">
                        <strong>Hora:</strong> {formData.time}
                      </p>
                      <p className="text-gray-300">
                        <strong>Duración:</strong> {selectedService?.duration} minutos
                      </p>
                      <p className="text-gray-300">
                        <strong>Precio:</strong> {selectedService?.price}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-amber-500 mb-2">Información de Contacto</h3>
                      <p className="text-gray-300">
                        <strong>Nombre:</strong> {formData.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className="text-gray-300">
                        <strong>Teléfono:</strong> {formData.phone}
                      </p>
                      {formData.notes && (
                        <p className="text-gray-300">
                          <strong>Notas:</strong> {formData.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-gray-300 mb-8">
              Hemos enviado un correo electrónico con los detalles de tu reserva. Si necesitas hacer algún cambio, por
              favor contáctanos por teléfono.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push("/")} className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Volver al Inicio
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  // Reiniciar el formulario
                  setFormData({
                    service: "",
                    barber: "",
                    date: new Date(),
                    time: "",
                    name: "",
                    email: "",
                    phone: "",
                    notes: "",
                  })
                  setStep(1)
                  setBookingComplete(false)
                }}
                className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
              >
                Hacer Otra Reserva
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reserva tu Cita en D' Rafa Peluquería</h1>
          <p className="text-gray-400 mb-8">Completa el formulario para reservar tu próxima visita</p>

          {/* Información de reserva */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-amber-500">Reserva tu hora</h2>
              <p className="text-gray-300 mb-6">
                Planifica tu visita con antelación y evita esperas innecesarias. Nos comprometemos a recibirte con
                puntualidad en el horario que elijas. Tu comodidad es nuestra prioridad, y reservar tu corte de pelo
                nunca ha sido tan sencillo. Estamos ansiosos por brindarte un servicio excepcional. ¡Haz tu reserva
                ahora y prepárate para lucir tu mejor versión!
              </p>

              <div className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-xl font-bold mb-3 text-white">Leer antes de reservar</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <p>
                      La reservación de turnos significa que el cliente va a venir y recibir el servicio en un horario
                      ya acordado mutuamente.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <p>
                      La reservación es un servicio monetizado, con el cual el cliente se compromete a pagar conforme a
                      una cifra ya acordada.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <p>
                      La reservación; El Cliente se compromete a pagarla conforme, aunque no haya podido venir por (x,
                      o, y) razones.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <p>
                      Se les agradece amablemente al que ya no pueda llegar, notificarme para seguir adelante con los
                      demás clientes.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <p>
                      Este sistema de reservaciones de turnos, siguiendo las normas, no afecta el sistema tradicional de
                      venir y hacer su turno aquí. Este servicio fue creado a petición de un público. Seguimos
                      complaciendo y Dios bendiciendo, Amén.
                    </p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pasos de la reserva */}
          <div className="flex mb-8">
            <div className={`flex-1 text-center relative ${step >= 1 ? "text-amber-500" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 border-2 ${step >= 1 ? "bg-amber-500 border-amber-500 text-black" : "border-gray-700 text-gray-700"}`}
              >
                1
              </div>
              <span className="text-sm">Servicio</span>
              {step > 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-amber-500" style={{ zIndex: -1 }}></div>
              )}
            </div>

            <div className={`flex-1 text-center relative ${step >= 2 ? "text-amber-500" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 border-2 ${step >= 2 ? "bg-amber-500 border-amber-500 text-black" : "border-gray-700 text-gray-700"}`}
              >
                2
              </div>
              <span className="text-sm">Contacto</span>
              {step > 2 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-amber-500" style={{ zIndex: -1 }}></div>
              )}
            </div>

            <div className={`flex-1 text-center ${step >= 3 ? "text-amber-500" : "text-gray-500"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 border-2 ${step >= 3 ? "bg-amber-500 border-amber-500 text-black" : "border-gray-700 text-gray-700"}`}
              >
                3
              </div>
              <span className="text-sm">Confirmación</span>
            </div>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 md:p-8">
              {/* Paso 1: Selección de servicio, barbero, fecha y hora */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">
                      Selecciona un Servicio
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id} className="text-white">
                            <div className="flex justify-between items-center w-full">
                              <span>{service.name}</span>
                              <span className="text-amber-500">{service.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="barber" className="text-white mb-2 block">
                      Selecciona un Barbero
                    </Label>
                    <Select value={formData.barber} onValueChange={(value) => handleChange("barber", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Selecciona un barbero" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {barbers.map((barber) => (
                          <SelectItem key={barber.id} value={barber.id} className="text-white">
                            <div className="flex flex-col">
                              <span>{barber.name}</span>
                              <span className="text-sm text-gray-400">{barber.specialty}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Selecciona una Fecha</Label>
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && handleChange("date", date)}
                      disabled={(date) => date < today || date > maxDate || date.getDay() === 1}
                      initialFocus
                      className="rounded-md border bg-gray-900 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-white mb-2 block">
                      Selecciona una Hora
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => handleChange("time", value)}
                      disabled={!formData.date || !formData.barber || !formData.service || availableSlots.length === 0}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue
                          placeholder={
                            !formData.date || !formData.barber || !formData.service
                              ? "Primero selecciona fecha, barbero y servicio"
                              : availableSlots.length === 0
                                ? "No hay horarios disponibles para esta fecha"
                                : "Selecciona una hora"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        {availableSlots.map((slot) => (
                          <SelectItem key={slot} value={slot} className="text-white">
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedService && (
                    <div className="bg-gray-800 p-4 rounded-md mt-4">
                      <h3 className="font-medium text-amber-500 mb-2">Detalles del Servicio</h3>
                      <p className="text-gray-300">
                        <strong>Servicio:</strong> {selectedService.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Duración:</strong> {selectedService.duration} minutos
                      </p>
                      <p className="text-gray-300">
                        <strong>Precio:</strong> {selectedService.price}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Paso 2: Información de contacto */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Nombre Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-gray-800 border-gray-700 pl-10"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-gray-800 border-gray-700 pl-10"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      Teléfono
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-gray-800 border-gray-700 pl-10"
                        placeholder="+1 (809) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white mb-2 block">
                      Notas Adicionales (Opcional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                      placeholder="Cualquier información adicional que debamos saber"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4">Confirma tu Reserva</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-amber-500 mb-2">Detalles de la Cita</h4>
                      <p className="text-gray-300">
                        <strong>Servicio:</strong> {selectedService?.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Barbero:</strong> {selectedBarber?.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Fecha:</strong> {format(formData.date, "EEEE d MMMM, yyyy", { locale: es })}
                      </p>
                      <p className="text-gray-300">
                        <strong>Hora:</strong> {formData.time}
                      </p>
                      <p className="text-gray-300">
                        <strong>Duración:</strong> {selectedService?.duration} minutos
                      </p>
                      <p className="text-gray-300">
                        <strong>Precio:</strong> {selectedService?.price}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-amber-500 mb-2">Información de Contacto</h4>
                      <p className="text-gray-300">
                        <strong>Nombre:</strong> {formData.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className="text-gray-300">
                        <strong>Teléfono:</strong> {formData.phone}
                      </p>
                      {formData.notes && (
                        <p className="text-gray-300">
                          <strong>Notas:</strong> {formData.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-md mt-4">
                    <p className="text-sm text-gray-400">
                      Al confirmar tu reserva, aceptas nuestras políticas de cancelación. Puedes cancelar o reprogramar
                      tu cita hasta 24 horas antes sin costo adicional.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  >
                    Anterior
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <Button onClick={nextStep} className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  >
                    {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
