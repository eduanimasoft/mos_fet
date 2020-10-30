package  {
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.events.Event;	
	
	public class Vyuzitie extends MovieClip {
		
		
		public function Vyuzitie() {
			// constructor code
			
			
			
		spetDoMenu_mc.addEventListener(MouseEvent.CLICK, vytvorEventComplete);
	
		}
		
		private function vytvorEventComplete(e:MouseEvent):void {
			this.dispatchEvent(new Event(Event.COMPLETE));
		}
	}
	
}
