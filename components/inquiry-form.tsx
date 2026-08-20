"use client"

import * as React from "react"
import { PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { project, units } from "@/lib/project"

export function InquiryForm() {
  const [sent, setSent] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="inquiry" className="px-6 py-20 md:px-12 md:py-24">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-xs tracking-[0.24em] text-muted-foreground uppercase">
            Book a viewing
          </p>
          <h2 className="text-3xl leading-tight font-medium md:text-4xl">
            Leave a number and we will open the show home for you.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.hours}. You can also call directly and we will arrange a
            time that suits you.
          </p>
          <a
            href={project.phoneHref}
            className="flex items-center gap-2 font-mono text-lg"
          >
            <PhoneIcon className="size-4" />
            {project.phone}
          </a>
          <p className="text-sm text-muted-foreground">{project.address}</p>
        </div>

        {sent ? (
          <div className="flex flex-col items-start justify-center gap-3 rounded-xl border border-border bg-muted/40 p-8">
            <p className="text-xl font-medium">Request received</p>
            <p className="text-sm text-muted-foreground">
              This is a practice page. The form is not sent anywhere and nobody
              will call you.
            </p>
            <Button variant="outline" onClick={() => setSent(false)}>
              Send another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 rounded-xl border border-border p-6 md:p-8"
          >
            <label className="flex flex-col gap-2 text-sm">
              Name
              <input
                required
                name="name"
                placeholder="What should we call you"
                className="h-11 rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              Phone
              <input
                required
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="A number you can answer"
                className="h-11 rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              Plan of interest
              <select
                name="unit"
                defaultValue={units[0].code}
                className="h-11 rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {units.map((unit) => (
                  <option key={unit.code} value={unit.code}>
                    {unit.code} · {unit.area}
                  </option>
                ))}
                <option value="undecided">Not decided yet</option>
              </select>
            </label>

            <Button type="submit" size="lg" className="mt-1 h-11">
              Send request
            </Button>
            <p className="text-xs text-muted-foreground">
              Submitting means you agree to be contacted by phone. Practice
              page, nothing is actually sent.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
