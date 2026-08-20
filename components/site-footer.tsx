import { project } from "@/lib/project"

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium">{project.name}</p>
          <p className="text-sm text-muted-foreground">{project.address}</p>
          <p className="font-mono text-sm text-muted-foreground">
            {project.phone}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground md:text-right">
          <p>Practice build · fictional development, not a real listing</p>
          <p>Areas, prices, and completion dates are sample data</p>
        </div>
      </div>
    </footer>
  )
}
