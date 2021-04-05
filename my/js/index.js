var active_canvas_id = -1;

var canvases = {
	0: 'main_canvas',
	1: 'pouzitie',
	2: 'princip_cinnosti',
	3: 'canvas_teoria',
	4: 'canvas_vyhody',
	5: 'canvas_vyvoj'
};

$('#btn_open_screen0').click(function() {	switch_canvas(0); });
$('#btn_open_screen1').click(function() {	switch_canvas(1); });
$('#btn_open_screen2').click(function() {	switch_canvas(2); });
$('#btn_open_screen3').click(function() {	switch_canvas(3); });
$('#btn_open_screen4').click(function() {	switch_canvas(4); });
$('#btn_open_screen5').click(function() {	switch_canvas(5); });

var page_number = findGetParameter('page');
switch_canvas(page_number != null ? page_number : -1);

function switch_canvas(new_canvas_id)
{
	if (new_canvas_id == active_canvas_id) 
		return;
		
	$('#' + canvases[active_canvas_id]).removeClass( [ "animate__animated", "animate__fadeInUpBig", "animate__fadeOutUpBig", "animate__fadeOutDownBig", "animate__fadeInDownBig" ] );
	$('#' + canvases[new_canvas_id])   .removeClass( [ "animate__animated", "animate__fadeInUpBig", "animate__fadeOutUpBig", "animate__fadeOutDownBig", "animate__fadeInDownBig" ] );
	
	$('#' + canvases[active_canvas_id]).addClass("animate__animated animate__fadeOutDownBig");
	$('#' + canvases[new_canvas_id])   .addClass("animate__animated animate__fadeInDownBig");
	
	document.getElementById(canvases[new_canvas_id]).style.display = "block";
	active_canvas_id = new_canvas_id;
	
	if (active_canvas_id == 0){
		StartAnimation();
	}
}

function start_page_on_canvas(canvas_number){
	$('#home_page').removeClass( [ "animate__animated", "animate__fadeOutLeft", "animate__fadeInDownBig" ] );
	$('#home_page').addClass("animate__animated animate__fadeOutLeft");
	
	$('#left_bar').removeClass( [ "animate__animated", "animate__fadeInLeft", "animate__fadeOutLeft" ] );
	$('#left_bar').addClass("animate__animated animate__fadeInLeft");
	document.getElementById('left_bar').style.display = 'block';
	
	$('#btn_open_screen'+canvas_number)  .addClass("start_anim_button_selected");
	
	switch_canvas(canvas_number);
}

function findGetParameter(parameterName) {
	var result = null, tmp = [];
	location.search.substr(1).split("&").forEach(function (item) {
		tmp = item.split("=");
		if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
	});
	return result;
}

$('.start_anim_button').on('click', function(){
    $('.start_anim_button').removeClass('start_anim_button_selected');
    $(this).addClass('start_anim_button_selected');
});

// start_page_on_canvas(4);