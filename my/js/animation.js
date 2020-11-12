const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function Circle(x, y, r, c)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.c = c;
	
	this.dx;
	this.dy;
	
	this.draw = function()
	{
		ctx.beginPath()
		ctx.fillStyle = this.c;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
	}
}

let ball = new Circle(200, 200, 40, red);
ball.draw();