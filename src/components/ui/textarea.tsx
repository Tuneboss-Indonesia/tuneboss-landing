import * as React from "react"

import { cn } from "../../lib/utils"

export type TextareaProps = React.ComponentProps<"textarea">;

const Textarea = ({ className, ref, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[#e87a1e]/50 bg-background px-3 py-2 text-sm ring-offset-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#e87a1e] focus-visible:ring-2 focus-visible:ring-[#e87a1e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}
Textarea.displayName = "Textarea"

export { Textarea }
