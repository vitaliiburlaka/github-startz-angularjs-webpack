function rolloverDirective() {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element) {
      var el = element[0];

      el.addEventListener('mousemove', handleMouseMove, { passive: true });
      el.addEventListener('mouseout', handleMouseOut, { passive: true });

      function handleMouseMove(event) {
        var tiltLimit = 5;
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;

        // Calculate coordinates
        var xCoor = halfW - (event.pageX - this.offsetLeft);
        var yCoor = halfH - (event.pageY - this.offsetTop);

        // Calculate max rotation degree
        var xDeg = (yCoor / halfH) * tiltLimit + 'deg';
        var yDeg = (xCoor / halfW) * -tiltLimit + 'deg'; // Should be negative value

        var transformGen = function() {
          return (
            'perspective(160px) translate3d(0, -2px, 0) scale(1.1) rotateX(' +
            xDeg +
            ') rotateY(' +
            yDeg +
            ')'
          );
        };

        this.style.transform = transformGen();
      }

      function handleMouseOut() {
        this.removeAttribute('style');
      }
    },
  };
}

module.exports = rolloverDirective;
