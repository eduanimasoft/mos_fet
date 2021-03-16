var active_section_number_vyhody_vyhody = 0;

var vyhody_sections = {
	0: 'vyhody_vystup'   ,
	1: 'vyhody_hustota'  ,
	2: 'vyhody_odolnost' ,
	3: 'vyhody_sum'      ,
	4: 'vyhody_rychlost' ,
}

function update_vyhody(section_number_vyhody){
	if (section_number_vyhody == active_section_number_vyhody_vyhody) 
		return;
		
	$('#' + vyhody_sections[active_section_number_vyhody_vyhody]).removeClass( [ "animate__animated", "animate__fadeInRight", "animate__fadeOutRight", "animate__fadeOutLeft", "animate__fadeInLeft" ] );
	$('#' + vyhody_sections[section_number_vyhody])   .removeClass( [ "animate__animated", "animate__fadeInRight", "animate__fadeOutRight", "animate__fadeOutLeft", "animate__fadeInLeft" ] );
	
	if (active_section_number_vyhody_vyhody < section_number_vyhody) {
		$('#' + vyhody_sections[active_section_number_vyhody_vyhody]).addClass("animate__animated animate__fadeOutLeft");
		$('#' + vyhody_sections[section_number_vyhody])   .addClass("animate__animated animate__fadeInRight");
	}
	else {
		$('#' + vyhody_sections[active_section_number_vyhody_vyhody]).addClass("animate__animated animate__fadeOutRight");
		$('#' + vyhody_sections[section_number_vyhody])   .addClass("animate__animated animate__fadeInLeft");
	}
	
	document.getElementById(vyhody_sections[section_number_vyhody]).style.display = "block";
	active_section_number_vyhody_vyhody = section_number_vyhody;
}

$('.vyhody_bottom_menu_item').on('click', function(){
    $('.vyhody_bottom_menu_item').removeClass('vyhody_bottom_menu_item_selected');
    $(this).addClass('vyhody_bottom_menu_item_selected');
});