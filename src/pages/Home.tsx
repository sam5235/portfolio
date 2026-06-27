import { Seo } from '../components/ui/Seo'
import { Hero } from '../components/sections/Hero'
import { TechMarquee } from '../components/sections/TechMarquee'
import { Services } from '../components/sections/Services'
import { FeaturedProjects } from '../components/sections/FeaturedProjects'
import { Testimonials } from '../components/sections/Testimonials'

export function Home() {
  return (
    <>
      <Seo title="Software Engineer" path="/" />
      <Hero />
      <TechMarquee />
      <Services />
      <FeaturedProjects />
      <Testimonials />
    </>
  )
}
