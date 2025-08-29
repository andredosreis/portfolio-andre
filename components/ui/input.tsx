import * as React from 'react'
import { cn } from '@/lib/utils'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => { return (<input type={type} className={cn('flex h-10 w-full rounded-2xl border border-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className)} ref={ref} {...props} />)})
Input.displayName='Input'
