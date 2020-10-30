package  {
	
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	import flash.events.MouseEvent;
	
	
	public class Intro extends MovieClip {
		
		private var timer:Timer = new Timer(21800);
		
		
		public function Intro() {
			
			timer.addEventListener(TimerEvent.TIMER, onTimer);
			timer.start();
			
			zobrazMenu_mc.addEventListener(MouseEvent.CLICK, vytvorEventComplete);
			
		}
		
		private function vytvorEventComplete(e:MouseEvent):void 
		{
			//this.dispatchEvent(new Event(Event.COMPLETE));
			zastav_a_zrus();
		}
		
		private function onTimer(e:TimerEvent):void 
		{
			//this.dispatchEvent(new Event(Event.COMPLETE));
			zastav_a_zrus();
		}
		
		private function zastav_a_zrus():void {
			zobrazMenu_mc.removeEventListener(MouseEvent.CLICK, vytvorEventComplete);
			timer.stop();
			timer.removeEventListener(TimerEvent.TIMER, onTimer);

			this.dispatchEvent(new Event(Event.COMPLETE));
		}
		
		
		
	}
	
}
