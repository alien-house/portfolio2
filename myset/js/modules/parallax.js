import throttle from 'lodash.throttle'

export default class Parallax {
  constructor(el){
    this.parallax = el
    this.draw()
    this.events()

    this.windowHeight = window.innerHeight
    this.speed = this.parallax.getAttribute('data-speed')
    this.sym = this.parallax.getAttribute('data-direction') === 'up' ? '-' : ''
  }

  events(){
    const throttledDraw = throttle((e) => {
      this.viewportTop = window.pageYOffset
      this.draw()
    }, 16).bind(this)

    window.addEventListener('scroll', throttledDraw)
    // window.addEventListener('scroll', this.draw.bind(this))
  }

  draw(){
    requestAnimationFrame((thing) => {
      this.scrollEvent()
    })
  }

  scrollEvent(){
    let viewportBottom = this.windowHeight + this.viewportTop
    let distance = this.viewportTop * this.speed
    this.parallax.style.transform = `translateY(${this.sym}${distance}px)`
  }
}