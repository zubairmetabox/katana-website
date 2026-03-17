'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
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
      const res = await fetch('/api/contact', {
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
      <div>
        <p className="font-futura-book text-white text-[18px] mb-1">Your Name</p>
        <Input
          placeholder="Name *"
          {...register('name')}
          error={errors.name?.message}
        />
      </div>

      <div>
        <p className="font-futura-book text-white text-[18px] mb-1">Email Address</p>
        <Input
          type="email"
          placeholder="Email *"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div>
        <p className="font-futura-book text-white text-[18px] mb-1">Message</p>
        <Textarea
          placeholder="Message *"
          rows={6}
          {...register('message')}
          error={errors.message?.message}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-black font-futura-demi text-[18px] rounded-[9px] py-3
          hover:bg-[#e9f1f6] transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-[#00d9d0] font-futura-book text-sm text-center">
          Message sent! We&apos;ll get back to you soon.
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
