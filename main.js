let canvas = document.getElementById('canvas')
let ctx    = canvas.getContext('2d')
let w =  canvas.width = window.innerWidth
let h =  canvas.height = window.innerHeight

window.addEventListener('resize',function(){
	w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
  console.log(canvas.width)
}) 
let mause = {
	x: null,
	y: null,
	radius: (canvas.width/100)*(canvas.height/100)
}
window.addEventListener('mousemove',function(e){
	mause.x = e.x
	mause.y = e.y
})
let arrayParticlesClass = []
class Particles{
	constructor(){
		this.x = Math.random() * w
		this.y = Math.random() * h
		this.size = 3
		this.color = '#EEE382'
		this.speedX = Math.random() * 0.5
		this.speedY = Math.random() * 0.5
	}
	_draw(){
		ctx.beginPath()
		ctx.arc(this.x,this.y,this.size,0,Math.PI * 2,false)
		ctx.fillStyle = this.color
		ctx.fill()

		this.x += this.speedX
		this.y += this.speedY
	}
	update(){
		if(this.x > w || this.x < 0){
			this.speedX *= -1
			this.color = '#2DC14C'
		} 
		if(this.y > h || this.y < 0){
			this.speedY *= -1
			this.color = '#F96363'
		}
		let dx = mause.x - this.x
		let dy = mause.y - this.y
		let distance = Math.sqrt(dx*dx + dy*dy)
		if(distance < mause.radius + this.size){
			if(mause.x < this.x && this.x < canvas.width - this.size*10){
				this.x += 10
			}
			if(mause.x > this.x && this.x > canvas.width - this.size*10){
				this.x -= 10
			}
			if(mause.y < this.y && this.x < canvas.height - this.size*10){
				this.y += 10
			}
			if(mause.y > this.y && this.x > canvas.height - this.size*10){
				this.y -= 10
			}
		}
		this.x += this.speedX
		this.y += this.speedY
		this._draw()
	}
}
for(let i = 0;i < 100;i++){
	arrayParticlesClass.push(new Particles)
}
function collisionDetect(){
	for(let i = 0;i < arrayParticlesClass.length;i++){
	  for(let j = i;j < arrayParticlesClass.length;j++){
	  	let distance = ((arrayParticlesClass[i].x - arrayParticlesClass[j].x)*(arrayParticlesClass[i].x - arrayParticlesClass[j].x)) + ((arrayParticlesClass[i].y - arrayParticlesClass[j].y)*(arrayParticlesClass[i].y - arrayParticlesClass[j].y))
	  	// console.log(distance)
	  	if(distance < w/5 * h/5){
	  		let opacityValue = 1-(distance/60000)
	  		ctx.strokeStyle = 'rgba(128,156,43,'+opacityValue+')';
	  		ctx.lineWidth = 1
	  		ctx.beginPath()
	  		ctx.moveTo(arrayParticlesClass[i].x,arrayParticlesClass[i].y)
	  		ctx.lineTo(arrayParticlesClass[j].x,arrayParticlesClass[j].y)
	  		ctx.stroke()
	  	}
	  }
  }
}
console.log(w/11 * h/11)
// ////////////////////////////////////
function tick(){
	ctx.clearRect(0,0,w,h)
		for(let i = 0;i < arrayParticlesClass.length;i++){			
	    // arrayParticlesClass[i].draw()
	    arrayParticlesClass[i].update()	    
    }
  collisionDetect()
	requestAnimationFrame(tick)
}

tick()
let firstJson = '{"value":1}'
let person = JSON.parse(firstJson)
console.log(person)
