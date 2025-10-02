import React, { useState } from 'react';
import { Mail, Phone, Clock, Star, Send, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setStatusMessage('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(result.message || '¡Mensaje enviado correctamente!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setSubmitStatus('error');
      setStatusMessage('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-900 via-green-900/10 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Contacto</span>
          </h1>
          <p className="text-xl text-gray-300">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte en tu viaje astronómico
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Envíanos un mensaje</h2>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-300">{statusMessage}</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-300">{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Información</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-cyan-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-cyan-400">Email</h3>
                  <p className="text-gray-300">Facu14carrizo@gmail.com</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Responderemos en menos de 24 horas
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-cyan-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-cyan-400">Teléfono</h3>
                  <p className="text-gray-300">+54 (11) 1234-5678</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Lunes a Viernes: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-cyan-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-cyan-400">Horarios de Atención</h3>
                  <p className="text-gray-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sábados: 10:00 AM - 2:00 PM</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Horario de Argentina (GMT-3)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Star className="h-5 w-5 text-cyan-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-cyan-400">Soporte Técnico</h3>
                  <p className="text-gray-300">Disponible 24/7 para consultas técnicas</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Especialistas en astronomía y telescopios
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
              <h4 className="text-cyan-400 font-semibold mb-2">💫 ¿Necesitas ayuda eligiendo un telescopio?</h4>
              <p className="text-gray-300 text-sm">
                Nuestros expertos en astronomía te ayudarán a encontrar el telescopio perfecto 
                según tu nivel de experiencia y presupuesto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}