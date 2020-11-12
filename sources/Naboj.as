package  src.naboj
{
	import flash.display.MovieClip;
	
	public class Naboj extends MovieClip{

		public function Naboj() {
			// constructor code
			this.stop();
		}
		
		public function get druh():String{
			
			return this.currentFrameLabel;
			
		}
		public function set druh(aky:String):void{
			
			this.gotoAndStop(aky);
			
		}

	}
	
}