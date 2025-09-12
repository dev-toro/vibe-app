import * as React from "react"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`shrink-0 bg-gray-200 h-px w-full ${className}`}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
