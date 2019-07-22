function rolloverDirective() {
  return {
    restrict: 'A',
    scope: {},
    link: (scope, element) => {
      const el = element[0]

      el.addEventListener('mousemove', handleMouseMove, { passive: true })
      el.addEventListener('mouseout', handleMouseOut, { passive: true })

      function handleMouseMove({ pageX, pageY }) {
        const tiltLimit = 5
        const halfW = this.clientWidth / 2
        const halfH = this.clientHeight / 2

        // Calculate coordinates
        const xCoor = halfW - (pageX - this.offsetLeft)
        const yCoor = halfH - (pageY - this.offsetTop)

        // Calculate max rotation degree
        const xDeg = (yCoor / halfH) * tiltLimit
        const yDeg = (xCoor / halfW) * -tiltLimit // Should be negative value

        const transformGen = (xDeg, yDeg) =>
          `perspective(160px) translate3d(0, -2px, 0) scale(1.1) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`

        this.style.transform = transformGen(xDeg, yDeg)
      }

      function handleMouseOut() {
        this.removeAttribute('style')
      }
    },
  }
}

export default rolloverDirective
