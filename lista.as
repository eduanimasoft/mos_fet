/*import mx.controls.RadioButton;
import mx.controls.RadioButtonGroup;
import mx.controls.ComboBox;*/
import mx.controls.*;
class lista {
	/*
	VARIABLES
	*/
	private var oAnimation:Object = {kanal:"N", typ:"Ochu"};
	var cbUds:ComboBox;
	var cbUgs:ComboBox;
	/*var chbP:RadioButton;
	var chbN:RadioButton;
	var chbObo:RadioButton;
	var chbOchu:RadioButton;
	var kanal:RadioButtonGroup;
	var typ:RadioButtonGroup;*/
	/*
	METHODS
	*/
	public function onLoad() {
		cbUds.addEventListener("change", this);
		cbUgs.addEventListener("change", this);
/*		chbP.addEventListener("click", this);
		chbN.addEventListener("click", this);
		chbObo.addEventListener("click", this);
		chbOchu.addEventListener("click", this);*/
	}
	/*public function click(event:Object):Void {
		switch (event.target) {
		case chbP :
			oAnimation.kanal = "P";
			break;
		case chbN :
			oAnimation.kanal = "N";
			break;
		case chbObo :
			oAnimation.typ = "Obo";
			break;
		case chbOchu :
			oAnimation.typ = "Ochu";
			break;
		}
		for (var sName in oAnimation) {
			trace("Meno: "+sName+" hodnota: "+oAnimation[sName]);
		}
	}*/
	public function change(event:Object):Void {
		trace("Zmena!!");
	}
}
