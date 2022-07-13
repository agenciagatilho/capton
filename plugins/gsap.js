import { gsap } from '@/assets/js/gsap/gsap.min.js'
import { ScrollTrigger } from '@/assets/js/gsap/ScrollTrigger.min.js'

export default function (_, inject) {
  gsap.registerPlugin(ScrollTrigger, gsap)

  const main = {
    base: gsap,
    ScrollTrigger
  }
  inject('gsap', main)
}
