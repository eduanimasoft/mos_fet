var mainCanvas = document.querySelector("#canvas_princip_cinnosti");
var mainContext = mainCanvas.getContext("2d");
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas_objects = [];
mainCanvas.onmousemove = on_canvas_hover;
							
// ------------- Electrons parameters (all the values are percents towards transisot width)

var electrons_moving_speed = 0.1;
var electrons_radius       = 0.5; 
var electrons_rows_number  = 2;

var electrons_start_positions_x = 35;
var electrons_end_positions_x   = 65;

var electrons_start_going_up_position_x = 100;
var electrons_end_going_up_position_x   = 100;

var electrons_first_row_position_y = 15;
var distance_between_electrons     = 0.8 + electrons_radius * 2; // distance_between_electrons from last Electron

// ------------- / Electrons parametes

// ------------- Transistor parameters
	
var transistor_width  = 55;
var transistor_height = 30;
var transistor_x      = 35;
var transistor_y      = 15;

// ------------- / Transistor parameters

var electrons_array = [];
class Electron {
	constructor(row_number) {
		this.x_end           = getPercentTowardsCanvasFromPercentTowardsTransistor(electrons_end_positions_x);
		this.x_start         = getPercentTowardsCanvasFromPercentTowardsTransistor(electrons_start_positions_x);
		this.x               = this.x_start;
		
		this.row_number      = row_number;

		var uds_value = document.getElementById('uds_value').value;
		electrons_start_going_up_position_x = uds_value == 4 ? 40 : uds_value == 5 ? 35 : 100;
		electrons_end_going_up_position_x   = uds_value == 4 ? 57 : uds_value == 5 ? 40 : 100;
		
		this.x_up_start      = getPercentTowardsCanvasFromPercentTowardsTransistor((electrons_rows_number - (this.row_number + 1)) * (electrons_end_going_up_position_x - electrons_start_going_up_position_x) / (electrons_rows_number - 1) + electrons_start_going_up_position_x) + distance_between_electrons * (electrons_rows_number - this.row_number);
		this.x_up_end        = getPercentTowardsCanvasFromPercentTowardsTransistor(electrons_end_going_up_position_x) + distance_between_electrons * (electrons_rows_number - this.row_number);
		
		this.y       = getPercentTowardsCanvasFromPercentTowardsTransistor(electrons_first_row_position_y + 3 * row_number, false);
		this.y_start = this.y;
		
		this.index = electrons_array.length == 0 ? 1 : (electrons_array[electrons_array.length - 1].index + 1);
	}
}

function move_electrons(){	
	var ugs_value = parseInt(document.getElementById('ugs_value').value);
	var uds_value = parseInt(document.getElementById('uds_value').value);
	
	var ugs_max = parseInt(document.getElementById('ugs_value').max);
	
	electrons_rows_number = ugs_value;

	if (electrons_array.length == 0 && electrons_rows_number != 0 && uds_value != 1)
		electrons_array.push(new Electron(0));
	
	if (electrons_array.length == 0)
		return;
	
	if (electrons_array[electrons_array.length - 1].x > (distance_between_electrons * ugs_max / electrons_rows_number + electrons_array[electrons_array.length - 1].x_start) && electrons_rows_number != 0 && uds_value != 1){
		var row = electrons_array[electrons_array.length - 1].index % electrons_rows_number;
		electrons_array.push(new Electron(row));
	}
	
	var x_speedup_start = getPercentTowardsCanvasFromPercentTowardsTransistor(uds_value == 4 ? 60 : uds_value == 5 ? 45 : 100);
	distance_between_electrons = (uds_value > 2 ? 0.3 : 1) + electrons_radius * 2;
	
	for (var i = 0; i < electrons_array.length; i++){
		if (electrons_array[i].x > x_speedup_start)
			electrons_array[i].x = electrons_array[i].x + 4 * electrons_moving_speed * (uds_value > 2 ? 1.5 : 1);
		else
			electrons_array[i].x = electrons_array[i].x + electrons_moving_speed * (uds_value > 2 ? 1.5 : 1);
		
		// going up
		var x = electrons_array[i].x_up_start;
		var x1 = electrons_array[i].x_up_end;
		if (electrons_array[i].row != 0 && electrons_array[i].x > x && electrons_array[i].x <= x1){
			var distance_between_electronsX = x1 - x;
			var minidistance_between_electronsX = electrons_array[i].x - x;
			
			var miniPercentdistance_between_electronsX = (minidistance_between_electronsX * 100) / distance_between_electronsX;
			var miniPercentdistance_between_electronsY = miniPercentdistance_between_electronsX;
			
			var distance_between_electronsY = electrons_array[i].y_start - getPercentTowardsCanvasFromPercentTowardsTransistor(electrons_first_row_position_y, false);
			var minidistance_between_electronsY = (miniPercentdistance_between_electronsY * distance_between_electronsY) / 100;
			
			electrons_array[i].y = electrons_array[i].y_start - minidistance_between_electronsY;
		}
	}
	
	if (electrons_array[0].x > electrons_array[0].x_end)
		electrons_array.shift();
}

function draw_princip_cinnosti() {
	mainCanvas.width = document.getElementById("princip_cinnosti_parent").offsetWidth;
	mainCanvas.height = document.getElementById("princip_cinnosti_parent").offsetHeight;
	
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
     
    // color in the background
    mainContext.fillStyle = "white";
    mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
	
	draw_transistor_background();
	
	draw_transistor ();
	draw_channel    ();
	draw_nmos_pmos  ();
	draw_left_graph ();
	draw_right_graph();
	
	draw_electrons();
	
	requestAnimationFrame(draw_princip_cinnosti);
}

// ----------------------- Drawing functions

function draw_transistor_background(){
	
	// draw a background
	var background_scheme = new Image(); background_scheme.src = 'images/princip_cinnosti/background_scheme/background_scheme.png';
	mainContext.beginPath();
	mainContext.drawImage(background_scheme, 0, 0, getWidthPixelInPercent(80), getHeightPixelInPercent(50));
	
	var ugs_value = parseInt(document.getElementById('ugs_value').value);
	var uds_value = parseInt(document.getElementById('uds_value').value);
	
	// draw UDS
	var uds = new Image();
	uds.src = `images/princip_cinnosti/background_scheme/uds - ${uds_value}.png`;
	mainContext.drawImage(uds, 0, 0, getWidthPixelInPercent(80), getHeightPixelInPercent(50));
	
	// draw UGS
	var ugs = new Image();
	ugs.src = `images/princip_cinnosti/background_scheme/ugs - ${ugs_value}.png`;
	mainContext.drawImage(ugs, 0, 0, getWidthPixelInPercent(80), getHeightPixelInPercent(50));
	
	// draw IDS
	var ids = new Image();
	switch (ugs_value){
		case 1:	
			if (uds_value > 1)
				ids.src = `images/princip_cinnosti/background_scheme/ids - 1.png`;
			else
				ids.src = `images/princip_cinnosti/background_scheme/ids - 0.png`;
			break;
		case 2:	
			if (uds_value > 1)
				if (uds_value == 2)
					ids.src = `images/princip_cinnosti/background_scheme/ids - 2.png`;
				else
					ids.src = `images/princip_cinnosti/background_scheme/ids - 3.png`;
			else
				ids.src = `images/princip_cinnosti/background_scheme/ids - 0.png`;
			break;
		case 3:	
			if (uds_value > 1)
				if (uds_value == 2)
					ids.src = `images/princip_cinnosti/background_scheme/ids - 4.png`;
				else
					ids.src = `images/princip_cinnosti/background_scheme/ids - 5.png`;
			else
				ids.src = `images/princip_cinnosti/background_scheme/ids - 0.png`;
			break;
		default:
			ids.src = `images/princip_cinnosti/background_scheme/ids - 0.png`;
	}
	mainContext.drawImage(ids, 0, 0, getWidthPixelInPercent(80), getHeightPixelInPercent(50));
	
	// draw IG
	var ig = new Image();
	ig.src = `images/princip_cinnosti/background_scheme/ig - 0.png`;
	mainContext.drawImage(ig, 0, 0, getWidthPixelInPercent(80), getHeightPixelInPercent(50));
	
	mainContext.closePath();
}

function draw_transistor(){
	
	// draw a transistor
	var transistor = new Image(); 
	transistor.src = 'images/princip_cinnosti/transistor.png';
	mainContext.beginPath();
	mainContext.drawImage(transistor, getWidthPixelInPercent(transistor_x), getHeightPixelInPercent(transistor_y), getWidthPixelInPercent(transistor_width), getHeightPixelInPercent(transistor_height));
	if (canvas_objects['transistor'] != null && canvas_objects['transistor'].ismouseover == true) {
		mainContext.drawImage(transistor, getWidthPixelInPercent(transistor_x) - 20, getHeightPixelInPercent(transistor_y) - 20, getWidthPixelInPercent(transistor_width) + 40, getHeightPixelInPercent(transistor_height) + 40);
	}
	mainContext.closePath();
	
	// adding to list of all objects
	var t = {
		x: getWidthPixelInPercent(transistor_x),
		y: getHeightPixelInPercent(transistor_y), 
		w: getWidthPixelInPercent(transistor_width), 
		h: getHeightPixelInPercent(transistor_height),
		ismouseover: canvas_objects['transistor'] != null ? canvas_objects['transistor'].ismouseover : false
	};
	
	canvas_objects['transistor'] = t;
}

function draw_channel(){
	
	var ugs_value = parseInt(document.getElementById('ugs_value').value);
	var uds_value = parseInt(document.getElementById('uds_value').value);

	// draw a channel
	var channel = new Image(); 
	channel.src = `images/princip_cinnosti/channels/${ugs_value} - ${uds_value}.png`;
	
	mainContext.beginPath();
	mainContext.drawImage(channel, getWidthPixelInPercent(transistor_x), getHeightPixelInPercent(transistor_y), getWidthPixelInPercent(transistor_width), getHeightPixelInPercent(transistor_height));
	mainContext.closePath();
}

function draw_nmos_pmos(){
	
	// draw a nmos/pmos
	var mos = new Image(); mos.src = 'images/princip_cinnosti/channel_basics/nmos.png';
	mainContext.beginPath();
	mainContext.drawImage(mos, getWidthPixelInPercent(transistor_x), getHeightPixelInPercent(transistor_y), getWidthPixelInPercent(transistor_width), getHeightPixelInPercent(transistor_height));
	mainContext.closePath();
}

function draw_left_graph(){
	
	// draw a left graph
	var left_graph = new Image(); left_graph.src = 'images/princip_cinnosti/lavy_graf.png';
	mainContext.beginPath();
	mainContext.drawImage(left_graph, getWidthPixelInPercent(0), getHeightPixelInPercent(50), getWidthPixelInPercent(50), getHeightPixelInPercent(50));
	mainContext.closePath();
}

function draw_right_graph(){
	
	// draw a right graph
	var right_graf = new Image(); right_graf.src = 'images/princip_cinnosti/pravy_graf.png';
	mainContext.beginPath();
	mainContext.drawImage(right_graf, getWidthPixelInPercent(50), getHeightPixelInPercent(50), getWidthPixelInPercent(50), getHeightPixelInPercent(50));
	mainContext.closePath();
}

function draw_electrons(){
	move_electrons();
	for (var i = 0; i < electrons_array.length; i++){
		mainContext.beginPath();
		
		mainContext.arc(
			getWidthPixelInPercent(electrons_array[i].x), 
			getHeightPixelInPercent(electrons_array[i].y), 
			getWidthPixelInPercent(electrons_radius), 
			0, 
			Math.PI * 2, 
			false);
		
		mainContext.fillStyle = "black";
		mainContext.fill();
		
		mainContext.closePath();
	}
}

function on_canvas_hover(e){
	var i = 0;
	var mouse_pos = getMousePos(mainCanvas, e);
	for (var key in canvas_objects) {
		// check if we hover it, fill red, if not fill it blue
		// console.log(mouse_pos.x, canvas_objects[key].x, ' - ', canvas_objects[key].x + canvas_objects[key].w);
		if (mouse_pos.x >= canvas_objects[key].x && mouse_pos.x <= canvas_objects[key].x + canvas_objects[key].w && mouse_pos.y >= canvas_objects[key].y && mouse_pos.y <= canvas_objects[key].y + canvas_objects[key].h){
			canvas_objects[key].ismouseover = true;
		} 
		else {
			canvas_objects[key].ismouseover = false;
		}
	}
}

function getMousePos(canvas, evt) {
	var rect = mainCanvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

// ----------------------- Utils

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

function getPercentTowardsCanvasFromPercentTowardsTransistor(percent, width = true){
	return percent / (100 / (width ? transistor_width : transistor_height)) + (width ? transistor_x : transistor_y);
}

draw_princip_cinnosti();