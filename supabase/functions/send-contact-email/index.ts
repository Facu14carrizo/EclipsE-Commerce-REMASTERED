const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son requeridos' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if Resend API key is available
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ 
          error: 'Configuración de email no disponible. Contacta al administrador.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare email content
    const emailContent = {
      from: 'AstroShop <Facu14carrizo@gmail.com>',
      to: ['Facu14carrizo@gmail.com'],
      subject: `Nuevo mensaje de contacto de ${name} - AstroShop`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #06b6d4; margin: 0; font-size: 28px;">🔭 AstroShop</h1>
            <p style="color: #94a3b8; margin: 5px 0 0 0;">Nuevo mensaje de contacto</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2);">
            <h2 style="color: #22d3ee; margin-top: 0; font-size: 20px;">📧 Detalles del Contacto</h2>
            
            <div style="margin: 15px 0;">
              <strong style="color: #06b6d4;">👤 Nombre:</strong>
              <span style="margin-left: 10px; color: #e2e8f0;">${name}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #06b6d4;">✉️ Email:</strong>
              <span style="margin-left: 10px; color: #e2e8f0;">${email}</span>
            </div>
            
            <div style="margin: 20px 0;">
              <strong style="color: #06b6d4;">💬 Mensaje:</strong>
              <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; margin-top: 10px; border-left: 4px solid #06b6d4;">
                <p style="margin: 0; line-height: 1.6; color: #f1f5f9;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">
              Este mensaje fue enviado desde el formulario de contacto de AstroShop
            </p>
            <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">
              ${new Date().toLocaleString('es-ES', { 
                timeZone: 'America/Argentina/Buenos_Aires',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje de contacto - AstroShop

Nombre: ${name}
Email: ${email}

Mensaje:
${message}

---
Enviado el: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' })}
      `
    }

    console.log('Sending email with Resend API...')

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    })

    const responseText = await resendResponse.text()
    console.log('Resend API response status:', resendResponse.status)
    console.log('Resend API response:', responseText)

    if (!resendResponse.ok) {
      console.error('Resend API error:', responseText)
      
      // Parse error response if possible
      let errorMessage = 'Error al enviar el email'
      try {
        const errorData = JSON.parse(responseText)
        if (errorData.message) {
          errorMessage = `Error de Resend: ${errorData.message}`
        }
      } catch (e) {
        // Use default error message
      }
      
      return new Response(
        JSON.stringify({ 
          error: `${errorMessage}. Verifica la configuración de la API key.` 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const emailResult = JSON.parse(responseText)
    console.log('Email sent successfully:', emailResult)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensaje enviado correctamente. Te responderemos pronto!' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in send-contact-email function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: `Error interno del servidor: ${error.message}` 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})