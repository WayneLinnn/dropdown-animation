"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { navItems, project } from "@/lib/project"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [solid, setSolid] = React.useState(false)

  React.useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > window.innerHeight * 3.3)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function onNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    const target = document.querySelector(href)
    if (!target) {
      return
    }

    event.preventDefault()
    gsap.registerPlugin(ScrollToPlugin)
    gsap.to(window, {
      scrollTo: { y: target as HTMLElement, offsetY: 64, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
      overwrite: true,
    })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-6 px-6 md:px-12",
          solid ? "text-foreground" : "text-white"
        )}
      >
        <a href="#hero" className="text-base font-medium tracking-wide">
          {project.name}
        </a>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => onNavClick(event, item.href)}
              className={cn(
                "transition-opacity hover:opacity-100",
                solid ? "opacity-70" : "opacity-80"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={project.phoneHref}
            className="hidden items-center gap-2 font-mono text-sm sm:flex"
          >
            <PhoneIcon className="size-3.5" />
            {project.phone}
          </a>
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#inquiry" />}
            onClick={(event) =>
              onNavClick(
                event as unknown as React.MouseEvent<HTMLAnchorElement>,
                "#inquiry"
              )
            }
            className={cn(!solid && "bg-white text-black hover:bg-white/85")}
          >
            Book a viewing
          </Button>
        </div>
      </div>
    </header>
  )
}
