import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function (_, inject) {
  gsap.registerPlugin(ScrollTrigger, gsap)

  const main = {
    base: gsap,
    ScrollTrigger
  }
  inject('gsap', main)
}
