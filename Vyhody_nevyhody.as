package  {
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.events.Event;	
	
	public class Vyhody_nevyhody extends MovieClip {
		
		private var pozicia_x:Array= [0,60,180,300,420,541,658,781];
		
		public function Vyhody_nevyhody() {
			
			spetDoMenu_mc.addEventListener(MouseEvent.CLICK, vytvorEventComplete);
			
			lista_hist.odkaz1_mc.addEventListener(MouseEvent.CLICK, skocNa(1));
			lista_hist.odkaz2_mc.addEventListener(MouseEvent.CLICK, skocNa(2));
			lista_hist.odkaz3_mc.addEventListener(MouseEvent.CLICK, skocNa(3));
			lista_hist.odkaz4_mc.addEventListener(MouseEvent.CLICK, skocNa(4));
			lista_hist.odkaz5_mc.addEventListener(MouseEvent.CLICK, skocNa(5));

			
		}
		private function vytvorEventComplete(e:MouseEvent):void {
			this.dispatchEvent(new Event(Event.COMPLETE));
		}
		
		function skocNa(snimok:Number):Function {
			return function(e:MouseEvent):void {
			  	gotoAndStop(snimok);
				lista_hist.sipka_mc.x=pozicia_x[snimok];
		  	};
		}
	}
	
}
