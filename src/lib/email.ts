import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@metabox.mu'
const FROM_EMAIL = 'noreply@katana.mu'

export async function sendContactEmail(data: {
  name: string
  email: string
  message: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Contact Message from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  })
}

export async function sendResellerEmail(data: {
  fullName: string
  businessName: string
  emailAddress: string
  businessWebsite?: string
  message?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Reseller Inquiry from ${data.businessName}`,
    html: `
      <h2>New Reseller Inquiry</h2>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Business Name:</strong> ${data.businessName}</p>
      <p><strong>Email:</strong> ${data.emailAddress}</p>
      <p><strong>Website:</strong> ${data.businessWebsite || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${(data.message || '').replace(/\n/g, '<br>')}</p>
    `,
  })
}
