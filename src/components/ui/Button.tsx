'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-futura-bold uppercase tracking-widest transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        white:
          'bg-white text-black hover:bg-[#e9f1f6] rounded-full px-8 py-3 text-sm',
        teal:
          'bg-[#00d9d0] text-black hover:bg-[#01bcb8] rounded-full px-8 py-3 text-sm',
        ghost:
          'bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-full px-8 py-3 text-sm backdrop-blur-sm',
        outline:
          'bg-transparent text-white hover:bg-white/10 border border-white rounded-full px-8 py-3 text-sm',
      },
      size: {
        sm: 'px-5 py-2 text-xs',
        md: 'px-8 py-3 text-sm',
        lg: 'px-10 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'white',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
