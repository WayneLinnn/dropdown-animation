"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MoonIcon, MouseIcon, SunIcon, SunsetIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FRAME_COUNT,
  frames,
  nearestScene,
  SCENE_EVENT,
  sceneItems,
  sceneProgress,
  scenes,
  type SceneValue,
} from "@/lib/frames"
import { project } from "@/lib/project"
import { cn } from "@/lib/utils"

const sceneIcons = {
  day: SunIcon,
  dusk: SunsetIcon,
  night: MoonIcon,
} as const

export function CityTimeScene() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const triggerRef = React.useRef<ScrollTrigger | null>(null)
  const frameRef = React.useRef(0)
  const [scene, setScene] = React.useState<SceneValue>("day")
  const [frame, setFrame] = React.useState(0)

  React.useEffect(() => {
    frames.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [])

  const scrollToScene = React.useCallback((value: SceneValue) => {
    const trigger = triggerRef.current
    if (!trigger) {
      return
    }

    const y = trigger.start + (trigger.end - trigger.start) * sceneProgress(value)
    gsap.to(window, {
      scrollTo: { y, autoKill: true },
      duration: 1.15,
      ease: "power2.inOut",
      overwrite: true,
    })
  }, [])

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const section = sectionRef.current
    if (!section) {
      return
    }

    const trigger = ScrollTrigger.create({
      id: "city-time",
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * 3.2)}`,
      pin: true,
      scrub: 0.45,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextFrame = Math.round(self.progress * (FRAME_COUNT - 1))
        if (nextFrame === frameRef.current) {
          return
        }

        frameRef.current = nextFrame
        setFrame(nextFrame)
        setScene(nearestScene(nextFrame))
      },
    })

    triggerRef.current = trigger
    ScrollTrigger.refresh()

    return () => {
      trigger.kill()
      triggerRef.current = null
    }
  }, [])

  React.useEffect(() => {
    function onSceneRequest(event: Event) {
      const value = (event as CustomEvent<SceneValue>).detail
      setScene(value)
      scrollToScene(value)
    }

    window.addEventListener(SCENE_EVENT, onSceneRequest)
    return () => window.removeEventListener(SCENE_EVENT, onSceneRequest)
  }, [scrollToScene])

  function onSceneChange(value: SceneValue | null) {
    if (!value) {
      return
    }

    setScene(value)
    scrollToScene(value)
  }

  const activeScene = scenes.find((item) => item.value === scene) ?? scenes[0]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-svh overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        {frames.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={cn(
              "absolute inset-0 size-full object-cover",
              index === frame ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/60" />

      <div className="relative z-10 flex h-svh flex-col justify-between px-6 pt-28 pb-8 md:px-12 md:pb-12">
        <div className="flex flex-col gap-4 text-white">
          <p className="font-mono text-xs tracking-[0.28em] text-white/70 uppercase">
            {project.tagline}
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight font-medium md:text-6xl">
            {project.name}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-white/80 md:text-base">
            Homes of 118 — 143 m² above the bay. Scroll to watch the city move
            from day to night.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-2 text-sm text-white/75">
            <MouseIcon className="size-4" />
            Scroll to change the time of day
          </div>

          <div className="flex w-full max-w-xs flex-col gap-3 rounded-xl bg-background/90 p-4 ring-1 ring-foreground/10 backdrop-blur md:w-auto">
            <div className="flex items-baseline justify-between gap-6">
              <p className="text-xs text-muted-foreground">Time of day</p>
              <p className="font-mono text-xs text-muted-foreground">
                {activeScene.time}
              </p>
            </div>
            <Select
              items={sceneItems}
              value={scene}
              onValueChange={onSceneChange}
            >
              <SelectTrigger className="w-full bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} align="start">
                <SelectGroup>
                  {sceneItems.map((item) => {
                    const Icon = sceneIcons[item.value]
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        <Icon />
                        {item.label}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {activeScene.copy}
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              Frame {frame + 1} / {FRAME_COUNT}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
