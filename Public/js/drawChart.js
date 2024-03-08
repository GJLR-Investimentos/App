var canvas = document.getElementById('DrawChart')
const toolbar = document.getElementById('toolbar')
var ctx = canvas.getContext('2d')

var isPainting = false
var lineWidth = 5
var lastX = 0
var lastY = 0

toolbar.addEventListener('click', e =>{
    if(e.target.id === 'clear'){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
})
toolbar.addEventListener('change', e =>{
    if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value
    }
    if(e.target.id === 'lineWidth'){
        lineWidth = e.target.value
    }
})

canvas.addEventListener('mousedown', (e) =>{
    isPainting = true
    var rect = canvas.getBoundingClientRect()
    lastX = e.clientX - rect.left
    lastY = e.clientY - rect.top
})

canvas.addEventListener('mouseup', e =>{
    isPainting = false
})

canvas.addEventListener('mousemove', e => {
    if(!isPainting){
        return
      }
      var rect = canvas.getBoundingClientRect()
      var currentX = e.clientX - rect.left
      var currentY = e.clientY - rect.top
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      drawLine(lastX, lastY, currentX, currentY);
      lastX = currentX;
      lastY = currentY;
})

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
