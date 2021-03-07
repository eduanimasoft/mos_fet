var active_canvas_id = 'home';

var canvases = 
{
	0: 'main_canvas',
	1: 'canvas_screen1',
	2: 'canvas_screen2',
	3: 'canvas_screen3',
	4: 'canvas_screen4',
	5: 'canvas_screen5'
}

$('#btn_open_intro').click(function() {
	switch_canvas(canvases[0]);
});

$('#btn_open_screen1').click(function() {
	switch_canvas(canvases[1]);
});

$('#btn_open_screen2').click(function() {
	switch_canvas(canvases[2]);
});

$('#btn_open_screen3').click(function() {
	switch_canvas(canvases[3]);
});

$('#btn_open_screen4').click(function() {
	switch_canvas(canvases[4]);
});

$('#btn_open_screen5').click(function() {
	switch_canvas(canvases[5]);
});

function switch_canvas(new_canvas_id)
{
	// active canvas -> display : none
	// active canvas -> removeClass("animate__animated animate__fadeInUpBig")
	// active canvas -> addClass("animate__animated animate__fadeOutUpBig")
	// new canvas    -> display : block
	// new canvas    -> addClass("animate__animated animate__fadeInUpBig")
	
	if (new_canvas_id == active_canvas_id)
	{
		return;
	}
	
	var new_canvas_index, active_canvas_index;
	for (var canvas in canvases)
	{
		if (new_canvas_id == canvases[canvas])
		{
			new_canvas_index = canvas;
		}
		
		if (active_canvas_id == canvases[canvas])
		{
			active_canvas_index = canvas;
		}
	}
	
	$('#' + active_canvas_id).removeClass( [ "animate__animated", "animate__fadeInUpBig", "animate__fadeOutUpBig", "animate__fadeOutDownBig", "animate__fadeInDownBig" ] );
	$('#' + new_canvas_id)   .removeClass( [ "animate__animated", "animate__fadeInUpBig", "animate__fadeOutUpBig", "animate__fadeOutDownBig", "animate__fadeInDownBig" ] );
	
	if (active_canvas_index < new_canvas_index)
	{
		console.log("bottom");
		$('#' + active_canvas_id).addClass("animate__animated animate__fadeOutUpBig");
		$('#' + new_canvas_id)   .addClass("animate__animated animate__fadeInUpBig");
	}
	else
	{
		console.log("top");
		$('#' + active_canvas_id).addClass("animate__animated animate__fadeOutDownBig");
		$('#' + new_canvas_id)   .addClass("animate__animated animate__fadeInDownBig");
	}
	
	document.getElementById(new_canvas_id).style.display = "block";
	
	active_canvas_id = new_canvas_id;
}