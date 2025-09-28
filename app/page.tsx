"use client"

import { Compass, Lock, Sparkles, ShieldCheck, Wallet, Leaf, Plus, Minus, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")



  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")


    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "Como saco turno?",
      answer:
        "Para sacar un turno en el Consultorio Dental Mendez Collado, puedes llamarnos por teléfono o utilizar nuestro sistema de reservas en línea. Te recomendamos reservar con anticipación para asegurar tu cita.",
    },
    {
      question: "¿Qué incluye el precio del tratamiento?",
      answer:
        "El precio de nuestros tratamientos incluye la consulta inicial, radiografías si son necesarias, y el tratamiento recomendado. No incluye tratamientos adicionales que puedan ser necesarios.",
    },
    {
      question: "Que obras sociales aceptan?",
      answer:
        "Aceptamos varias obras sociales, incluyendo OSDE, Swiss Medical, y Galeno. Te recomendamos consultar con tu obra social para verificar la cobertura de tu tratamiento.",
    },
    {
      question: "Se puede pagar con tarjeta?",
      answer:
        "Sí, aceptamos pagos con tarjeta de crédito y débito. También puedes optar por pagar en efectivo si lo prefieres.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/istockphoto-1064904934-612x612.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/60" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full shadow-sm">
            <Compass className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Consultorio Dental Mendez Collado</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#services"
              className="px-6 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full hover:bg-white transition-colors text-gray-900 shadow-sm"
            >
              Servicios
            </a>
            
            <a
              href="#faq"
              className="px-6 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full hover:bg-white transition-colors text-gray-900 shadow-sm"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="px-6 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full hover:bg-white transition-colors text-gray-900 shadow-sm"
            >
              Turnos
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full hover:bg-white transition-colors text-gray-900 shadow-sm"
            >
              Inicia sesión
            </a>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-md">
              Reservar Ahora
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          {/* Badge */}
          <div className="mb-6 px-4 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full shadow-sm">
            <span className="text-sm font-medium text-gray-900">Consultorio Dental</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance text-gray-900">
            Confia en Nosotros
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mb-12 leading-relaxed text-pretty">
            Dejate atender y asesorar por expertos para el cuidado de tus dientes
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-4 text-lg shadow-md">
              Sacar Turno
            </Button>
          </div>

          {/* Footer Note */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 ring-1 ring-gray-200 backdrop-blur rounded-full shadow-sm">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Tu seguridad es nuestra prioridad</span>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <section id="services" className="relative z-10 py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white ring-1 ring-gray-200 shadow-lg p-12">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-gray-900">Servicios</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
                Desde limpieza general hasta blanqueamientos
              </p>
            </div>

            {/* Journey Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Service 1 */}
              <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-8 h-80 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-blue-600 mb-4">01.</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Limpieza General</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    nos encargamos de dejar todo en orden para luchar contra las bacterias
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-8 h-80 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-blue-600 mb-4">02.</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Ortodoncia</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Alinea y mejora la apariencia de tus dientes con nuestros tratamientos de ortodoncia.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-8 h-80 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-blue-600 mb-4">03.</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Cuidado Dental</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Ofrecemos una variedad de servicios de cuidado dental para mantener tu sonrisa saludable y radiante.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 p-8 h-80 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-blue-600 mb-4">04.</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Cambio de Dentadura</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Ofrecemos servicios de cambio de dentadura para mejorar tu sonrisa y funcionalidad dental.
                  </p>
                </div>
              </div>
            </div>

            {/* Check Availability Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-12 py-4 text-lg font-semibold shadow-md"
              >
                Saca turno ahora --- para mañana
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white ring-1 ring-gray-200 shadow-lg p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Title and Description */}
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-gray-900">
                  Preguntas Frecuentes
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                  Todo lo que necesitas saber sobre los servicios, precios y más
                </p>
              </div>

              {/* Right Column - FAQ Accordion */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-gray-50 ring-1 ring-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4 text-gray-900">{faq.question}</h3>
                      {openFaq === index ? (
                        <Minus className="w-5 h-5 flex-shrink-0 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 flex-shrink-0 text-gray-600" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white ring-1 ring-gray-200 shadow-lg p-12">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance text-gray-900">Consultar Turnos</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Contact Form */}
              <div className="rounded-2xl bg-blue-50 ring-1 ring-blue-200 p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Reserva el turno</h3>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                    Gracias <span dangerouslySetInnerHTML={{ __html: formData.name }} />, 
                    tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                    Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente más tarde.
                  </div>
                )}


                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="tu.email@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                      placeholder="Cuéntanos qué tratamiento necesitas..."
                    />
                  </div>
                  <Button
                   type="button"
                   onClick={handleSubmit}
                   disabled={isSubmitting}
                   className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-3 font-normal text-base shadow-md">
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-8">
                <div>
                  <p className="text-xl text-gray-600 leading-relaxed text-pretty">
                    Para preguntas sobre medios de pagos, contáctanos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gray-100 ring-1 ring-gray-200 p-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Compass className="w-6 h-6 text-blue-600" />
                  <span className="text-xl font-semibold text-gray-900">Consultorio Dental Mendez Collado</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-pretty">
                  ¡¡Numero uno en el cuidado dental en tucuman!!
                </p>
              </div>

              {/* Expedition Links */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Servicios</h3>
                <ul className="space-y-3">
                  {["Itinerario", "Precios", "Clientes", "Galería de Fotos"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm leading-relaxed">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Links */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">ACERCA DE</h3>
                <ul className="space-y-3">
                  {["Nuestra Misión", "Estándares de Seguridad", "Nuestro Equipo", "Conservación"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm leading-relaxed">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Recursos</h3>
                <ul className="space-y-3">
                  {["Centro de Ayuda", "Contáctanos", "Preguntas Frecuentes", "Términos y Condiciones"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm leading-relaxed">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sub-footer */}
            <div className="border-t border-gray-300 pt-8">
              <p className="text-gray-500 text-sm text-center">© 2025 Mendez Collado</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
