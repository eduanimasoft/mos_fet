var mainCanvas = document.querySelector("#canvas_princip_cinnosti");
var mainContext = mainCanvas.getContext("2d");
 
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
							
var speed = 0.3;
var radius = 0.5; // 5%
var rows = 2;

var startX = 55;
var endX = 70;

var firstRowY = 18;
var secondRowY = firstRowY + radius * 2 + 1;
var thirdRowY = secondRowY + radius * 2 + 1;
var fourthRowY = thirdRowY + radius * 2 + 1;

var distanceOriginal = 2 + radius * 2; // distance from last circle
var distance = distanceOriginal; // distance from last circle
var maxX = distance + startX; // 20%

var startSmoothMovementX = 60;
var endSmoothMovementX = 80;

var startFastMovementX = 100;

var circles = [];
class Circle
{
	constructor(row) 
	{
		// x, y - in percents
		this.x = startX;
				
		var newY = 0;
		switch (row)
		{
			case 0:
				newY = firstRowY;
				break;
			case 1:
				newY = secondRowY;
				break;
			case 2:
				newY = thirdRowY;
				break;
			case 3:
				newY = fourthRowY;
				break;
		}
		this.y = newY;
		
		this.startY = this.y;
		this.rowNumber = row;
		
		this.startSmoothMovementX = startSmoothMovementX + ((endSmoothMovementX - startSmoothMovementX) / rows * (rows - this.rowNumber));
		this.endSmoothMovementX = endSmoothMovementX - distance * row;
		
		if (circles.length == 0)
		{
			this.index = 1;
		}
		else
		{
			this.index = circles[circles.length - 1].index + 1;
		}
	}
}

function moveCircles()
{
	if (circles.length == 0)
	{
		circles.push(new Circle(0));
	}
	
	// если х координата последнего кружка больше 20% ширины экрана
	if (circles[circles.length - 1].x > maxX)
	{
		var row = circles[circles.length - 1].index % rows;
		circles.push(new Circle(row));
	}
	
	for (var i = 0; i < circles.length; i++)
	{
		if (circles[i].x > startFastMovementX) // change to 60
		{
			circles[i].x = circles[i].x + 3 * speed;
		}
		else
		{
			circles[i].x = circles[i].x + 1 * speed;
		}
		
		var x = circles[i].startSmoothMovementX;
		var x1 = circles[i].endSmoothMovementX;
		if (circles[i].row != 0 && circles[i].x > x && circles[i].x <= x1)
		{
			var distanceX = x1 - x;
			var miniDistanceX = circles[i].x - x;
			
			var miniPercentDistanceX = (miniDistanceX * 100) / distanceX;
			var miniPercentDistanceY = miniPercentDistanceX;
			
			var distanceY = circles[i].startY - firstRowY;
			var miniDistanceY = (miniPercentDistanceY * distanceY) / 100;
			
			circles[i].y = circles[i].startY - miniDistanceY;
		}
	}
	
	if (circles[0].x > endX)
	{
		circles.shift();
	}
}

function drawCircle() 
{
	mainCanvas.width = document.getElementById("princip_cinnosti_parent").offsetWidth;
	mainCanvas.height = document.getElementById("princip_cinnosti_parent").offsetHeight;
	
	var canvasWidth = mainCanvas.width;
	var canvasHeight = mainCanvas.height;
	
    mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
     
    // color in the background
    mainContext.fillStyle = "white";
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);
	
	// draw a background
	var background_scheme = new Image(); background_scheme.src = 'images/princip_cinnosti/background_scheme.png';
	mainContext.beginPath();
	mainContext.drawImage(background_scheme, 0, 0, getWidthPixelInPercent(80), getHeightPixelInPercent(50));
	mainContext.closePath();
	
	var transistor_width = 55;
	var transistor_height = 30;
	var transistor_x = 35;
	var transistor_y = 12;
	
	// draw a transistor
	var transistor = new Image(); transistor.src = 'images/princip_cinnosti/transistor.png';
	mainContext.beginPath();
	mainContext.drawImage(transistor, getWidthPixelInPercent(transistor_x), getHeightPixelInPercent(transistor_y), getWidthPixelInPercent(transistor_width), getHeightPixelInPercent(transistor_height));
	mainContext.closePath();
	
	// draw a channel
	var channel = new Image(); channel.src = 'images/princip_cinnosti/channels/0 - 2.png';
	mainContext.beginPath();
	mainContext.drawImage(channel, getWidthPixelInPercent(transistor_x), getHeightPixelInPercent(transistor_y), getWidthPixelInPercent(transistor_width), getHeightPixelInPercent(transistor_height));
	mainContext.closePath();
	
	// draw a nmos/pmos
	var mos = new Image(); mos.src = 'images/princip_cinnosti/channel_basics/nmos.png';
	mainContext.beginPath();
	mainContext.drawImage(mos, getWidthPixelInPercent(transistor_x), getHeightPixelInPercent(transistor_y), getWidthPixelInPercent(transistor_width), getHeightPixelInPercent(transistor_height));
	mainContext.closePath();
	
	// draw a left graph
	var left_graph = new Image(); left_graph.src = 'images/princip_cinnosti/lavy_graf.png';
	mainContext.beginPath();
	mainContext.drawImage(left_graph, getWidthPixelInPercent(0), getHeightPixelInPercent(50), getWidthPixelInPercent(50), getHeightPixelInPercent(50));
	mainContext.closePath();
	
	// draw a right graph
	var right_graf = new Image(); right_graf.src = 'images/princip_cinnosti/pravy_graf.png';
	mainContext.beginPath();
	mainContext.drawImage(right_graf, getWidthPixelInPercent(50), getHeightPixelInPercent(50), getWidthPixelInPercent(50), getHeightPixelInPercent(50));
	mainContext.closePath();
	
	moveCircles();
	for (var i = 0; i < circles.length; i++){
		mainContext.beginPath();
		
		mainContext.arc(
			getWidthPixelInPercent(circles[i].x), 
			getHeightPixelInPercent(circles[i].y), 
			getWidthPixelInPercent(radius), 
			0, 
			Math.PI * 2, 
			false);
		
		mainContext.fillStyle = "black";
		mainContext.fill();
		
		mainContext.closePath();
	}
	
	requestAnimationFrame(drawCircle);
}

function getWidthPixelInPercent(percent)
{
	return mainCanvas.width / 100 * percent;
}

function getHeightPixelInPercent(percent)
{
	return mainCanvas.height / 100 * percent;
}

function getWidthPercentInPixel(pixel)
{
	return mainCanvas.width * pixel / 100;
}

// ------------------------------------------------------------------

// function setValue(property)
// {
	// if (property == 'speed')
	// {
		// speed = Number(document.getElementById("speedRange").value);
	// }
	
	// if (property == 'rows')
	// {
		// newRows = document.getElementById("rowsRange").value;
		// rows = Number(newRows);
		// distance = distanceOriginal / newRows;
		// maxX = distance + startX;
	// }
	
	// if (property == 'distance')
	// {
		// newDistance = document.getElementById("distanceRange").value;
		// distanceOriginal = Number(newDistance);
		// distance = distanceOriginal / rows;
		// maxX = distance + startX;
	// }
	
	// if (property == 'startSmoothMovement')
	// {
		// newStartSmoothMovement = document.getElementById("startSmoothMovementRange").value;
		// startSmoothMovementX = Number(newStartSmoothMovement);
	// }
	
	// if (property == 'endSmoothMovement')
	// {
		// newEndSmoothMovement = document.getElementById("endSmoothMovementRange").value;
		// endSmoothMovementX = Number(newEndSmoothMovement);
	// }
	
	// if (property == 'startFastMovementX')
	// {
		// startFastMovementX = Number(document.getElementById("startFastMovementXRange").value);
	// }
// }

// setValue('speed');
// setValue('rows');
// setValue('distance');
// setValue('startSmoothMovement');
// setValue('endSmoothMovement');
// setValue('startFastMovementX');

drawCircle();