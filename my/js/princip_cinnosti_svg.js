gsap.registerPlugin(MotionPathPlugin);

var electrons_first_part_of_path = [];
var electrons_number = 0;

var electrons_second_part_of_path = [];
var electrons_number_second_part = 0;

var time_between_electrons = 600;

var first_line_interval = null;
var second_line_interval = null;
var third_line_interval = null;

var uds_value = 0;
var ugs_value = 0;

var active_channel = null;
var active_opn = null;

var nmos_transistor_color = "#FFBDBD";
var pmos_transistor_color = "#BDE6FF";

var nmos_channel_base_color = "#A1BAEC";
var pmos_channel_base_color = "#C38059";

var nmos_channel_color = "#CBDEFB";
var pmos_channel_color = "#F9B9A0";

var electron = document.getElementById("electron");

var u_parameters = {
	"uds_1" : {
		koeficient : 0,
		duration_first_part : 0,
		duration_second_part : 0,
	},
	"uds_2" : {
		koeficient : 1,
		duration_first_part : 3,
		duration_second_part : 0, // this value is never used
	},
	"uds_3" : {
		koeficient : 1.5,
		duration_first_part : 2.5,
		duration_second_part : 0, // this value is never used
	},
	"uds_4" : {
		koeficient : 2.2,
		duration_first_part : 1.7,
		duration_second_part : 0.2,
	},
	"uds_5" : {
		koeficient : 2.8,
		duration_first_part : 0.8,
		duration_second_part : 0.4,
	},
};

function start_electrons_flow(){
	ugs_value = parseInt(document.getElementById('ugs_value').value);
	uds_value = parseInt(document.getElementById('uds_value').value);
	
	run_electrons();
	draw_channel();
	draw_opn();
}

function remove_electron(index, arr){
	document.getElementById(arr[index]["id"]).remove();
	arr.shift(); // remove first and move left all the other elements
}

function run_electrons(){
	var time = time_between_electrons / u_parameters["uds_" + uds_value].koeficient;
	
	clearInterval(first_line_interval);
	clearInterval(second_line_interval);
	clearInterval(third_line_interval);
	
	var a = setTimeout(() => {
		first_line_interval = setInterval(add_electron, time, 1);
	}, 0);

	var b = setTimeout(() => {
		second_line_interval = setInterval(add_electron, time, 2);
	}, time / (ugs_value - 1));

	var c = setTimeout(() => {
		third_line_interval = setInterval(add_electron, time, 3);
	}, (time / (ugs_value - 1)) * 2);
}

function draw_channel(){
	if (active_channel != null){
		active_channel.style.display = "none";
	}
	
	var uds = uds_value;
	if (uds_value <= 3){
		uds = "1_2_3";
	}
	
	var channel = "channel_ugs_" + (ugs_value - 1) + "_uds_" + uds;
	var new_channel = document.getElementById(channel);
	if (new_channel == null){
		return;
	}
	
	active_channel = new_channel;
	active_channel.style.display = "block";
	
	change_channel_color();
}

function draw_opn(){
	if (active_opn != null){
		active_opn.style.display = "none";
	}
	
	if (ugs_value == 1 || uds_value == 1){
		return;
	}
	
	var uds = uds_value;
	if (uds_value <= 2){
		uds = "1_2";
	}
	// opn_ugs_1_uds_1_2
	var opn = "opn_ugs_" + (ugs_value - 1) + "_uds_" + uds;
	active_opn = document.getElementById(opn);
	active_opn.style.display = "block";
}

function add_electron(line_number){
	if (ugs_value == 1 || uds_value == 1)
		return;
	
	if ((ugs_value - 1) < line_number)
		return;
	
	var path = "";
	switch (line_number){
		case 1:
			path += "first_";
			break;
		case 2:
			path += "second_";
			break;
		case 3:
			path += "third_";
			break;
	}
	
	path += "line_path";
	var has_second_part = false;
	
	switch (uds_value){
		case 4:
			path += "_short";
			has_second_part = true;
			break;
			
		case 5:
			path += "_shortest";
			has_second_part = true;
			break;
	}
	
	var parameters = {
		motionPath: {
				path: "#" + path,
				align: "#" + path,
				alignOrigin: [0.5, 0.5],
			},
		ease: Linear.easeNone,
		duration: u_parameters["uds_" + uds_value].duration_first_part,
		onComplete: (has_second_part ? electron_first_part_finished : electron_whole_path_finished)
	};
	
	var new_electron = electron.cloneNode(true);
	new_electron.style.display = "block";
	var new_id = "electron_" + electrons_number++;
	new_electron.id = new_id;
	
	document.getElementById("electrons_holder").appendChild(new_electron);	

	electron_parameters = {id: new_id, number: electrons_number, path: path};
	
	if (uds_value <= 3)
		electrons_second_part_of_path.push(electron_parameters);
	else 
		electrons_first_part_of_path.push(electron_parameters);
	
	gsap.to("#" + new_id, parameters);		
}

function add_electron_to_second_part_of_path(path){
	var parameters = {
		motionPath: {
				path: "#" + path + "_second",
				align: "#" + path + "_second",
				alignOrigin: [0.5, 0.5],
			},
			ease: Linear.easeNone,
			duration: u_parameters["uds_" + uds_value].duration_second_part,
			onComplete: electron_whole_path_finished
	};

	var new_electron = electron.cloneNode(true);
	new_electron.style.display = "block";
	var new_id = "electron_second_part_" + electrons_number_second_part++;
	new_electron.id = new_id;
	
	document.getElementById("electrons_holder").appendChild(new_electron);	
	electrons_second_part_of_path.push({id: new_id, number: electrons_number_second_part});
	
	gsap.to("#" + new_id, parameters);
}	

function electron_first_part_finished(){
	var path = electrons_first_part_of_path[0]["path"];
	
	remove_electron(0, electrons_first_part_of_path);
	
	add_electron_to_second_part_of_path(path);
}	

function electron_whole_path_finished(){
	remove_electron(0, electrons_second_part_of_path);
}

// ----------------------------

function switch_nmos(){
	var nmos = document.getElementById('nmos_radio');
	
	var transistor = document.getElementById("transistor_base_fill");
	var left_channel_base  = document.getElementById("nmos_base_channel_left_fill");
	var right_channel_base = document.getElementById("nmos_base_channel_right_fill");
	
	if (nmos.checked) {
		transistor.style.fill   = nmos_transistor_color;
		left_channel_base.style.fill  = nmos_channel_base_color;
		right_channel_base.style.fill = nmos_channel_base_color;
		
		electron = document.getElementById("electron");
	} else {
		transistor.style.fill   = pmos_transistor_color;
		left_channel_base.style.fill  = pmos_channel_base_color;
		right_channel_base.style.fill = pmos_channel_base_color;
		
		electron = document.getElementById("proton");
	}
	
	change_channel_color();
}

function change_channel_color(){
	var nmos = document.getElementById('nmos_radio');
	
	if (active_channel != null) {
		var path_tags_of_active_channel = document.querySelectorAll("#" + active_channel.id + " > path");
		for (var i = 0; i < path_tags_of_active_channel.length; i++){
			if (nmos.checked) {
				path_tags_of_active_channel[i].style.fill = nmos_channel_color;
			} else {
				path_tags_of_active_channel[i].style.fill = pmos_channel_color;
			}
		}
	}
}

function update_ugs_uds_text_value(){
	var _ugs = document.getElementById('ugs_value_text');
	if (_ugs != null){
		_ugs.innerText = document.getElementById('ugs_value').value;
	}
	
	var _uds = document.getElementById('uds_value_text');
	if (_uds != null){
		_uds.innerText = document.getElementById('uds_value').value;
	}
}