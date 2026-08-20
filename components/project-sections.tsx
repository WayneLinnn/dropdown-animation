"use client"

import { CheckIcon, MapPinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { requestScene, scenes } from "@/lib/frames"
import { amenities, stats, surroundings, units } from "@/lib/project"

function SectionHead({
  label,
  title,
  copy,
}: {
  label: string
  title: string
  copy?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="max-w-3xl text-3xl leading-tight font-medium md:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {copy}
        </p>
      ) : null}
    </div>
  )
}

export function ProjectSections() {
  return (
    <>
      <section id="overview" className="px-6 py-20 md:px-12 md:py-24">
        <SectionHead
          label="Overview"
          title="Six towers around a central lawn, with every main plan facing south."
          copy="The site sits directly on Riverside Drive with nothing blocking the east, so upper floors take in the full width of the bay and the skyline behind it."
        />
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="border-t border-border pt-4">
              <dd className="flex items-baseline gap-1">
                <span className="text-3xl font-medium md:text-4xl">
                  {item.value}
                </span>
                {item.unit ? (
                  <span className="text-sm text-muted-foreground">
                    {item.unit}
                  </span>
                ) : null}
              </dd>
              <dt className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section id="units" className="bg-muted/40 px-6 py-20 md:px-12 md:py-24">
        <SectionHead
          label="Residences"
          title="Three main plans, from 89 to 143 m²."
          copy="Areas and prices below are sample figures for this practice build."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {units.map((unit) => (
            <article
              key={unit.code}
              className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium">{unit.code}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {unit.rooms}
                  </p>
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  {unit.status}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-sm">
                <p>{unit.area}</p>
                <p className="text-muted-foreground">{unit.facing}</p>
              </div>

              <ul className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
                {unit.highlights.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckIcon className="size-3.5 shrink-0 text-muted-foreground" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-auto font-medium">{unit.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="daylight" className="px-6 py-20 md:px-12 md:py-24">
        <SectionHead
          label="Light study"
          title="The same balcony, three times in one day."
          copy="Pick a time and the page scrolls back to the sequence and holds on that frame."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {scenes.map((scene) => (
            <button
              key={scene.value}
              type="button"
              onClick={() => requestScene(scene.value)}
              className="flex flex-col gap-3 rounded-xl border border-border p-6 text-left transition-colors hover:bg-muted/60"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-medium">{scene.label}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {scene.time}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {scene.copy}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section
        id="surroundings"
        className="bg-muted/40 px-6 py-20 md:px-12 md:py-24"
      >
        <SectionHead
          label="Neighbourhood"
          title="Everyday life inside the gates, the city just outside them."
        />
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium">On site</h3>
            <ul className="mt-5 flex flex-col gap-5">
              {amenities.map((item) => (
                <li key={item.title} className="border-t border-border pt-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Getting around</h3>
            <ul className="mt-5 flex flex-col">
              {surroundings.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 border-b border-border py-4"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="size-3.5 shrink-0 text-muted-foreground" />
                    {item.name}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {item.distance}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              size="lg"
              className="mt-6"
              nativeButton={false}
              render={<a href="#inquiry" />}
            >
              Request the area map
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
