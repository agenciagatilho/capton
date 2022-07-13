import gsap from '@/assets/js/gsap/gsap.min.js'
import ScrollTrigger from '@/assets/js/gsap/ScrollTrigger.min.js'
gsap.registerPlugin(ScrollTrigger, gsap)

export default function (_, inject) {
  const main = {
    base: gsap,
    ScrollTrigger
  }
  inject('gsap', main)
}
