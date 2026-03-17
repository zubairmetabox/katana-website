import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendResellerEmail } from '@/lib/email'

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  emailAddress: z.string().email('Invalid email address'),
  businessWebsite: z.string().url('Invalid URL').optional().or(z.literal('')),
  message: z.string().optional(),
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

    const { fullName, businessName, emailAddress, businessWebsite, message } = parsed.data

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'reseller-inquiries',
      data: {
        fullName,
        businessName,
        emailAddress,
        businessWebsite: businessWebsite || '',
        message: message || '',
        submittedAt: new Date().toISOString(),
      },
    })

    await sendResellerEmail({ fullName, businessName, emailAddress, businessWebsite, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/reseller]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
