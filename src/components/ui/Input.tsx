import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="font-futura-book text-sm text-[#d3d0c9] uppercase tracking-widest">
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            'w-full bg-[#141414] border border-[#333333] rounded-[9px] px-4 py-3',
            'font-futura-book text-white placeholder:text-[#555555]',
            'focus:outline-none focus:border-[#00d9d0] transition-colors duration-200',
            error && 'border-red-500',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-400 text-xs font-futura-book">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="font-futura-book text-sm text-[#d3d0c9] uppercase tracking-widest">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            'w-full bg-[#141414] border border-[#333333] rounded-[9px] px-4 py-3 resize-none',
            'font-futura-book text-white placeholder:text-[#555555]',
            'focus:outline-none focus:border-[#00d9d0] transition-colors duration-200',
            error && 'border-red-500',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-400 text-xs font-futura-book">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Input, Textarea }
