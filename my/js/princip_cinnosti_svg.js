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

var previous_ugs_value = 0;
var previous_uds_value = 1;

var active_channel = null;
var active_opn = null;

var nmos_transistor_color = "#FFBDBD";
var pmos_transistor_color = "#BDE6FF";

var nmos_channel_base_color = "#A1BAEC";
var pmos_channel_base_color = "#FF8F76";

var nmos_channel_color = "#CBDEFB";
var pmos_channel_color = "#F9B9A0";

var multimeter_standart_color = "#BBBBBB";
var multimeter_positive_color = "red";
var multimeter_negative_color = "blue";

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

var graph_points = {
	"ugs_0":{
		"uds_1" : 0,
		"uds_2" : 0.15,
		"uds_3" : 0.3,
		"uds_4" : 0.45,
		"uds_5" : 0.6,
	},
	"ugs_1":{
		"uds_1" : 0,
		"uds_2" : 0.07,
		"uds_3" : 0.15,
		"uds_4" : 0.19,
		"uds_5" : 0.5,
	},
	"ugs_2":{
		"uds_1" : 0,
		"uds_2" : 0.15,
		"uds_3" : 0.25,
		"uds_4" : 0.35,
		"uds_5" : 0.6,
	},
	"ugs_3":{
		"uds_1" : 0,
		"uds_2" : 0.25,
		"uds_3" : 0.35,
		"uds_4" : 0.50,
		"uds_5" : 0.75,
	},
};

function start_electrons_flow(){
	ugs_value = parseInt(document.getElementById('ugs_value').value);
	uds_value = parseInt(document.getElementById('uds_value').value);
	
	run_electrons();
	draw_channel();
	draw_opn();
	
	// ----- graphs
	draw_output_characteristics_graph();
	draw_multimeter();
}

function draw_multimeter(){
	var ugs_arr = document.getElementById('multimeter_ugs_group').children;
	var uds_arr = document.getElementById('multimeter_uds_group').children;
	var ids_arr = document.getElementById('multimeter_ids_group').children;

	for (var i = 0; i < ugs_arr.length; i++){
		ugs_arr[i].style.fill = multimeter_standart_color;
		uds_arr[i].style.fill = multimeter_standart_color;
		ids_arr[i].style.fill = multimeter_standart_color;
	}
	
	var start = 4;
	var end = 8;
	var ugs_x = start;
	var index = 0;
	for (var i = start; i < end; i++){
		setTimeout(function(){
			ugs_arr[ugs_x++].style.fill = multimeter_positive_color;
		}, index++ * 200);
	}
	
	start = 4;
	end = 8;
	var uds_x = 4;
	index = 0;
	for (var i = start; i < end; i++){
		setTimeout(function(){
			uds_arr[uds_x++].style.fill = multimeter_positive_color;
		}, index++ * 200);
	}
	
	start = 4;
	end = 8;
	var ids_x = 4;
	index = 0;
	for (var i = start; i < end; i++){
		setTimeout(function(){
			ids_arr[ids_x++].style.fill = multimeter_positive_color;
		}, index++ * 200);
	}
}

function draw_output_characteristics_graph(){
	if (previous_ugs_value == ugs_value) {
		go_from_current_to_destination();
	} else {
		go_from_current_to_start();
	}
	
	previous_ugs_value = ugs_value;
	previous_uds_value = uds_value;
	
	function go_from_current_to_start(){
		var path = "output_characteristics_path_nmos_ugs_" + previous_ugs_value;
		var parameters = {
			motionPath: {
					path: "#" + path,
					align: "#" + path,
					alignOrigin: [0.5, 0.5],
					start: graph_points["ugs_" + previous_ugs_value]["uds_" + previous_uds_value],
					end: 0,
				},
			ease: Linear.easeNone,
			duration: 0.2,
			onComplete: function(){
				if (uds_value != 1){
					go_from_start_to_destination();
				}
			},
		};
		gsap.to("#point_nmos", parameters);	
		
		var pmos_animation_parameters = {
			motionPath: {
					path: "#output_characteristics_path_pmos_ugs_" + previous_ugs_value,
					align: "#output_characteristics_path_pmos_ugs_" + previous_ugs_value,
					alignOrigin: [0.5, 0.5],
					start: graph_points["ugs_" + previous_ugs_value]["uds_" + previous_uds_value],
					end: 0,
				},
			ease: Linear.easeNone,
			duration: 0.2,
			onComplete: function(){
				if (uds_value != 1){
					go_from_start_to_destination();
				}
			},
		};
		gsap.to("#point_pmos", pmos_animation_parameters);	
	}
	
	function go_from_current_to_destination(){
		var path = "output_characteristics_path_nmos_ugs_" + ugs_value;
		var parameters = {
			motionPath: {
					path: "#" + path,
					align: "#" + path,
					alignOrigin: [0.5, 0.5],
					start: graph_points["ugs_" + previous_ugs_value]["uds_" + previous_uds_value],
					end: graph_points["ugs_" + ugs_value]["uds_" + uds_value],
				},
			ease: Linear.easeNone,
			duration: 0.2,
		};
		gsap.to("#point_nmos", parameters);	
		
		var pmos_animation_parameters = {
			motionPath: {
					path: "#output_characteristics_path_pmos_ugs_" + ugs_value,
					align: "#output_characteristics_path_pmos_ugs_" + ugs_value,
					alignOrigin: [0.5, 0.5],
					start: graph_points["ugs_" + previous_ugs_value]["uds_" + previous_uds_value],
					end: graph_points["ugs_" + ugs_value]["uds_" + uds_value],
				},
			ease: Linear.easeNone,
			duration: 0.2,
		};
		gsap.to("#point_pmos", pmos_animation_parameters);	
	}
	
	function go_from_start_to_destination(){
		var path = "output_characteristics_path_nmos_ugs_" + ugs_value;
		var parameters = {
			motionPath: {
					path: "#" + path,
					align: "#" + path,
					alignOrigin: [0.5, 0.5],
					start: 0,
					end: graph_points["ugs_" + ugs_value]["uds_" + uds_value],
				},
			ease: Linear.easeNone,
			duration: 0.2,
		};
		gsap.to("#point_nmos", parameters);	
		
		var pmos_animation_parameters = {
			motionPath: {
					path: "#output_characteristics_path_pmos_ugs_" + ugs_value,
					align: "#output_characteristics_path_pmos_ugs_" + ugs_value,
					alignOrigin: [0.5, 0.5],
					start: 0,
					end: graph_points["ugs_" + ugs_value]["uds_" + uds_value],
				},
			ease: Linear.easeNone,
			duration: 0.2,
		};
		gsap.to("#point_pmos", pmos_animation_parameters);	
	}
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
	}, time / (ugs_value));

	var c = setTimeout(() => {
		third_line_interval = setInterval(add_electron, time, 3);
	}, (time / (ugs_value)) * 2);
}

function draw_channel(){
	if (active_channel != null){
		active_channel.style.display = "none";
	}
	
	var uds = uds_value;
	if (uds_value <= 3){
		uds = "1_2_3";
	}
	
	var channel = "channel_ugs_" + (ugs_value) + "_uds_" + uds;
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
	
	if (ugs_value == 0 || uds_value == 1){
		return;
	}
	
	var uds = uds_value;
	if (uds_value <= 2){
		uds = "1_2";
	}
	// opn_ugs_1_uds_1_2
	var opn = "opn_ugs_" + (ugs_value) + "_uds_" + uds;
	active_opn = document.getElementById(opn);
	active_opn.style.display = "block";
}

function add_electron(line_number){
	if (ugs_value == 0 || uds_value == 1)
		return;
	
	if ((ugs_value) < line_number)
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
		transistor.style.fill = nmos_transistor_color;
		left_channel_base.style.fill  = nmos_channel_base_color;
		right_channel_base.style.fill = nmos_channel_base_color;
		
		electron = document.getElementById("electron");
		
		document.getElementById("output_characteristics_pmos_group").style.display = "none";
		document.getElementById("output_characteristics_nmos_group").style.display = "block";
		
		document.getElementById("prevodova_charakteristika_path_pmos_group").style.display = "none";
		document.getElementById("prevodova_charakteristika_path_nmos_group").style.display = "block";
	} else {
		transistor.style.fill = pmos_transistor_color;
		left_channel_base.style.fill  = pmos_channel_base_color;
		right_channel_base.style.fill = pmos_channel_base_color;
		
		electron = document.getElementById("proton");
		
		document.getElementById("output_characteristics_pmos_group").style.display = "block";
		document.getElementById("output_characteristics_nmos_group").style.display = "none";
		
		document.getElementById("prevodova_charakteristika_path_pmos_group").style.display = "block";
		document.getElementById("prevodova_charakteristika_path_nmos_group").style.display = "none";
	}
	
	change_channel_color();
	draw_multimeter();
}

function change_mode(){
	var rich_mode = document.getElementById("rich_mode_radio");
	if (rich_mode.checked){
		document.getElementById("prevodova_charakteristika_path_pmos_rich_group").style.display = "block";
		document.getElementById("prevodova_charakteristika_path_nmos_rich_group").style.display = "block";
		
		document.getElementById("prevodova_charakteristika_path_pmos_poor_group").style.display = "none";
		document.getElementById("prevodova_charakteristika_path_nmos_poor_group").style.display = "none";
		
		document.getElementById("ugs_value").min = 0;
	} else {
		document.getElementById("prevodova_charakteristika_path_pmos_rich_group").style.display = "none";
		document.getElementById("prevodova_charakteristika_path_nmos_rich_group").style.display = "none";
		
		document.getElementById("prevodova_charakteristika_path_pmos_poor_group").style.display = "block";
		document.getElementById("prevodova_charakteristika_path_nmos_poor_group").style.display = "block";
		
		document.getElementById("ugs_value").min = 1;
		if (document.getElementById("ugs_value").value != 1)
			document.getElementById("ugs_value").value = 1;
	}
	
	start_electrons_flow();
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