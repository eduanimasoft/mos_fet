package  {
	
	import flash.display.DisplayObjectContainer;
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	//import flashx.textLayout.operations.MoveChildrenOperation;
	import flash.events.MouseEvent;
	
	
	public class Mosfet extends MovieClip {
		
		private var loader:Loader = new Loader();
		
		public function Mosfet(){
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.load(new URLRequest("intro.swf"));

			principCinnosti_btn.addEventListener(MouseEvent.CLICK, nacitaj("princip_cinnosti.swf"));
			historia_btn.addEventListener(MouseEvent.CLICK, nacitaj("historia.swf"));
			vyuzitie_btn.addEventListener(MouseEvent.CLICK, nacitaj("vyuzitie.swf"));
			teoria_btn.addEventListener(MouseEvent.CLICK, nacitaj("teoria.swf"));
			vyhody_btn.addEventListener(MouseEvent.CLICK, nacitaj("vyhody_nevyhody.swf"));
			//nevyhody_btn.addEventListener(MouseEvent.CLICK, nacitaj("vyhody_nevyhody.swf"));
			
			skryVsetkyTlacidla();
		}
	
		function nacitaj(meno:String):Function {
			return function(e:MouseEvent):void {
			  	loader.load(new URLRequest(meno));
				skryVsetkyTlacidla();
		  	};
		}
		private function onComplete(e:Event):void{
			var swfko:MovieClip = (loader.content as MovieClip);
			if(swfko != null){
				this.addChild(swfko);
				swfko.addEventListener(Event.COMPLETE, onCompleteSwfko);
			}
		}
		private function onCompleteSwfko(e:Event):void{
			zobrazVsetkyTlacidla();
			var swfko:MovieClip = (loader.content as MovieClip);
			if (swfko != null){
				this.removeChild(swfko);
			}
		}

		private function skryVsetkyTlacidla():void{
			principCinnosti_btn.visible=false;
			vyuzitie_btn.visible=false;
			teoria_btn.visible=false;
			historia_btn.visible=false;
			nadpis.visible=false;
			vyhody_btn.visible=false;
			panak.visible=false;
		}
		private function zobrazVsetkyTlacidla():void{
			principCinnosti_btn.visible=true;
			vyuzitie_btn.visible=true;
			teoria_btn.visible=true;
			historia_btn.visible=true;
			nadpis.visible=true;
			vyhody_btn.visible=true;
			panak.visible=true;
		}


		
	}
	
}
