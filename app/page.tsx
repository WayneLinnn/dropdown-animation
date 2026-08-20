import { CityTimeScene } from "@/components/city-time-scene"
import { InquiryForm } from "@/components/inquiry-form"
import { ProjectSections } from "@/components/project-sections"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <CityTimeScene />
        <ProjectSections />
        <InquiryForm />
      </main>
      <SiteFooter />
    </>
  )
}
