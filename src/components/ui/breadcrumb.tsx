import * as React from "react"

export function Breadcrumb({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className="w-full" aria-label="Breadcrumb" {...props}>
      {children}
    </nav>
  )
}

export function BreadcrumbList({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="flex items-center gap-1 text-muted-foreground overflow-x-auto" {...props}>
      {children}
    </ol>
  )
}

export function BreadcrumbItem({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li className="flex items-center min-w-0" {...props}>
      {children}
    </li>
  )
}

export function BreadcrumbLink({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className="hover:underline text-blue-600 flex items-center gap-1" {...props}>
      {children}
    </a>
  )
}

export function BreadcrumbPage({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="text-gray-900 font-semibold truncate max-w-[160px]" aria-current="page" {...props}>
      {children}
    </span>
  )
}

export function BreadcrumbSeparator() {
  return <span className="mx-1 text-gray-300">/</span>
}
