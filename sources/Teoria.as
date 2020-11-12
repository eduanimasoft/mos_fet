package  {
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.events.Event;
	
	
	public class Teoria extends MovieClip {
		
		
		public function Teoria() {

			spetDoMenu_mc.addEventListener(MouseEvent.CLICK, vytvorEventComplete);
			
			odkaz_1.addEventListener(MouseEvent.CLICK, skocNa(1));
			odkaz_2.addEventListener(MouseEvent.CLICK, skocNa(2));
			odkaz_3.addEventListener(MouseEvent.CLICK, skocNa(3));
			odkaz_4.addEventListener(MouseEvent.CLICK, skocNa(4));
			odkaz_5.addEventListener(MouseEvent.CLICK, skocNa(5));
			odkaz_6.addEventListener(MouseEvent.CLICK, skocNa(6));
			odkaz_7.addEventListener(MouseEvent.CLICK, skocNa(7));
			
			
		}
		
		private function vytvorEventComplete(e:MouseEvent):void {
			this.dispatchEvent(new Event(Event.COMPLETE));
		}
		
		function skocNa(snimok:Number):Function {
			return function(e:MouseEvent):void {
			  	
				okno_teorie.gotoAndStop(snimok);
		  	};
		}
		
		
		
		
		
		
	}
	
}
