import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendContactEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { name, email, message } = parsed.data

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
      },
    })

    await sendContactEmail({ name, email, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
