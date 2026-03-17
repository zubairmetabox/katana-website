'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'

const schema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  businessName: z.string().min(2, 'Business name required'),
  emailAddress: z.string().email('Enter a valid email address'),
  businessWebsite: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ResellerForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/reseller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Row 1: Full Name + Business Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-futura-book text-white text-[19px] mb-1">Full Name*</p>
          <Input placeholder="Name *" {...register('fullName')} error={errors.fullName?.message} />
        </div>
        <div>
          <p className="font-futura-book text-white text-[19px] mb-1">Business Name*</p>
          <Input placeholder="Email *" {...register('businessName')} error={errors.businessName?.message} />
        </div>
      </div>

      {/* Row 2: Email + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-futura-book text-white text-[19px] mb-1">Email Address*</p>
          <Input type="email" placeholder="Email *" {...register('emailAddress')} error={errors.emailAddress?.message} />
        </div>
        <div>
          <p className="font-futura-book text-white text-[19px] mb-1">Business Website*</p>
          <Input placeholder="Website *" {...register('businessWebsite')} />
        </div>
      </div>

      {/* Message */}
      <div>
        <p className="font-futura-book text-white text-[19px] mb-1">Message</p>
        <Textarea
          placeholder="Details About Your Business*"
          rows={6}
          {...register('message')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-black font-futura-book text-[19px] rounded-[5px] py-4
          hover:bg-[#e9f1f6] transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Inquiry'}
      </button>

      {status === 'success' && (
        <p className="text-[#00d9d0] font-futura-book text-sm text-center">
          Inquiry submitted! We&apos;ll be in touch soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 font-futura-book text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
