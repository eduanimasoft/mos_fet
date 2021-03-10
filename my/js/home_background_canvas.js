var partNum = 200;
//particle number - change it!

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
    return Math.random() * (max - min) + min;
}

var istruehover = true;

var c = document.getElementById('background_canvas');
var ctx = c.getContext('2d');
//context and id of canvas

var w = window.innerWidth;
var h = window.innerHeight;
//width and height of canvas

c.width = w;
c.height = h;
//setting the width and height for canvas

var mouse = {
    x: w / 2,
    y: h / 2
};
//mouse position

document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY;

    istruehover = false;
}, false);

document.addEventListener('mouseover', function() {
    istruehover = false;
}, false);
//finding the mouse position

var particles = [];
var distance = 60;
for (var x = -2; x < c.width / distance; x++) {
    for (var y = -2; y < c.height / distance; y++) {
        particles.push(new particle(x * distance, y * distance));
    }
}

//the particle function
function particle(x, y) {
    this.x = x + 20;
    this.y = y + 20;

    this.xo = x + 20;
    this.yo = y + 20;

    this.vx = 0;
    this.vy = 0;

    this.r = 20;

	this.image = new Image(this.r * 2, this.r * 2);
	this.image.src = 'images/electrons/proton.png';
}

function draw() {
    requestAnimFrame(draw);
	
	c.width = window.innerWidth;
	c.height = window.innerHeight;

    ctx.fillStyle = '#F4FED1';
    ctx.fillRect(0, 0, c.width, c.height);

    for (t = 0; t < particles.length; t++) {
        var p = particles[t];

        ctx.beginPath();
        ctx.drawImage(p.image, p.x, p.y, p.r * 2, p.r * 2); // draw a circle
        ctx.fill();

        var dist,
            dx = mouse.x - p.x,
            dy = mouse.y - p.y;

        dist = Math.sqrt(dx * dx + dy * dy);

		var speed = 1.7;

        if (dist <= 300) {
            p.x += dx / dist * speed;
            p.y += dy / dist * speed;
        }

		// return circles
        var disto, dxo = p.x - p.xo, dyo = p.y - p.yo;
        disto = Math.sqrt(dxo*dxo + dyo*dyo);

        p.x -= dxo / 130; // change this to += and the magin will begin
        p.y -= dyo / 130;
    }

    ctx.beginPath();
	electron = new Image();
	electron.src = 'images/electrons/electron.png';
    ctx.drawImage(electron, mouse.x - 40, mouse.y - 40, 80, 80); // draw a circle
    ctx.fill();
}

draw();