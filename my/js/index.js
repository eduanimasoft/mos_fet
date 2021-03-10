var active_canvas_id = 'main_canvas';

var screens = {
	0: 'main_canvas',
	1: 'canvas_screen1',
	2: 'princip_cinnosti',
	3: 'canvas_screen3',
	4: 'canvas_screen4',
	5: 'canvas_screen5'
}

$('#btn_open_intro').click(function() {
	switch_canvas(screens[0]);
});

$('#btn_open_screen1').click(function() {
	switch_canvas(screens[1]);
});

$('#btn_open_screen2').click(function() {
	switch_canvas(screens[2]);
});

$('#btn_open_screen3').click(function() {
	switch_canvas(screens[3]);
});

$('#btn_open_screen4').click(function() {
	switch_canvas(screens[4]);
});

$('#btn_open_screen5').click(function() {
	switch_canvas(screens[5]);
});


var page_number = findGetParameter('page');
switch_canvas(screens[page_number != null ? page_number : 0]);

function switch_canvas(new_canvas_id)
{
	if (new_canvas_id == active_canvas_id) 
		return;
	
	var new_canvas_index, active_canvas_index;
	for (var screen in screens) {
		if (new_canvas_id == screens[screen])
			new_canvas_index = screen;
		
		if (active_canvas_id == screens[screen])
			active_canvas_index = screen;
	}
	
	$('#' + active_canvas_id).removeClass( [ "animate__animated", "animate__fadeInUpBig", "animate__fadeOutUpBig", "animate__fadeOutDownBig", "animate__fadeInDownBig" ] );
	$('#' + new_canvas_id)   .removeClass( [ "animate__animated", "animate__fadeInUpBig", "animate__fadeOutUpBig", "animate__fadeOutDownBig", "animate__fadeInDownBig" ] );
	
	if (active_canvas_index < new_canvas_index) {
		$('#' + active_canvas_id).addClass("animate__animated animate__fadeOutUpBig");
		$('#' + new_canvas_id)   .addClass("animate__animated animate__fadeInUpBig");
	}
	else {
		$('#' + active_canvas_id).addClass("animate__animated animate__fadeOutDownBig");
		$('#' + new_canvas_id)   .addClass("animate__animated animate__fadeInDownBig");
	}
	
	document.getElementById(new_canvas_id).style.display = "block";
	active_canvas_id = new_canvas_id;
	
	if (active_canvas_id == 'main_canvas'){
		StartAnimation();
	}
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}