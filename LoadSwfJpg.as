package src.ldData
{
	import flash.display.Loader;
	import flash.events.Event;
	import flash.events.HTTPStatusEvent;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.net.URLRequest;
	import flash.events.MouseEvent;
	import flash.events.IEventDispatcher;
	import flash.net.URLRequest;
	
	public class LoadSwfJpg extends Loader
	{
		
		private var _urlObr:String = "Image.gif";
		private var _rqst:URLRequest;
		
		public function LoadSwfJpg(co:String)
		{
			this._urlObr = co;
			configureListeners(this.contentLoaderInfo);	// 
			this._rqst = new URLRequest(_urlObr);// 
			this.load(_rqst);
			
		//	this.addEventListener(MouseEvent.CLICK, clickHandler);
		
		// pri nacitani vsetcit proporcionalne obrazok .
		
		}
		
		private function configureListeners(dispatcher:IEventDispatcher):void
		{
			dispatcher.addEventListener(Event.COMPLETE, completeHandler);
			dispatcher.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
			dispatcher.addEventListener(Event.INIT, initHandler);
			dispatcher.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
			dispatcher.addEventListener(Event.OPEN, openHandler);
			dispatcher.addEventListener(ProgressEvent.PROGRESS, progressHandler);
			dispatcher.addEventListener(Event.UNLOAD, unLoadHandler); //
		}
		
		private function killListeners(dispatcher:IEventDispatcher):void
		{
			dispatcher.removeEventListener(Event.COMPLETE, completeHandler);
			dispatcher.removeEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
			dispatcher.removeEventListener(Event.INIT, initHandler);
			dispatcher.removeEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
			dispatcher.removeEventListener(Event.OPEN, openHandler);
			dispatcher.removeEventListener(ProgressEvent.PROGRESS, progressHandler);
			dispatcher.removeEventListener(Event.UNLOAD, unLoadHandler); //
			
		}
		
		private function completeHandler(e:Event):void
		{
			
			trace("completeHandler: " + e);
			killListeners(this.contentLoaderInfo);
						  
		}
		
		private function httpStatusHandler(e:HTTPStatusEvent):void
		{
			trace("httpStatusHandler: " + e);
		}
		
		private function initHandler(e:Event):void
		{
			trace("initHandler: " + e);
		}
		
		private function ioErrorHandler(e:IOErrorEvent):void
		{
			trace("ioErrorHandler: " + e);
		}
		
		private function openHandler(e:Event):void
		{
			trace("openHandler: " + e);
		}
		
		private function progressHandler(e:ProgressEvent):void
		{
			trace("progressHandler: bytesLoaded=" + e.bytesLoaded + " bytesTotal=" + e.bytesTotal);
		}
		
		private function unLoadHandler(e:Event):void
		{
			trace("unLoadHandler: " + e);
			this.contentLoaderInfo.addEventListener(Event.UNLOAD,unLoadHandler);
		}
		
		private function unld():void
		{
			this.unload(); // 
			this.contentLoaderInfo.removeEventListener(Event.UNLOAD,unLoadHandler); // 
		}
		
		
	/*	private function clickHandler(e:MouseEvent):void
		{
			trace("clickHandler: " + e);
			//var loader:Loader = Loader(e.target);
			this.unload();
		}
	*/
	
	}

} /*
   package {
   import flash.display.Loader;
   import flash.display.Sprite;
   import flash.events.*;
   import flash.net.URLRequest;

   public class LoaderExample extends Sprite {
   private var url:String = "Image.gif";

   public function LoaderExample() {
   var loader:Loader = new Loader();
   configureListeners(loader.contentLoaderInfo);
   loader.addEventListener(MouseEvent.CLICK, clickHandler);

   var request:URLRequest = new URLRequest(url);
   loader.load(request);

   addChild(loader);
   }

   private function configureListeners(dispatcher:IEventDispatcher):void {
   dispatcher.addEventListener(Event.COMPLETE, completeHandler);
   dispatcher.addEventListener(HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
   dispatcher.addEventListener(Event.INIT, initHandler);
   dispatcher.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
   dispatcher.addEventListener(Event.OPEN, openHandler);
   dispatcher.addEventListener(ProgressEvent.PROGRESS, progressHandler);
   dispatcher.addEventListener(Event.UNLOAD, unLoadHandler);
   }

   private function completeHandler(event:Event):void {
   trace("completeHandler: " + event);
   }

   private function httpStatusHandler(event:HTTPStatusEvent):void {
   trace("httpStatusHandler: " + event);
   }

   private function initHandler(event:Event):void {
   trace("initHandler: " + event);
   }

   private function ioErrorHandler(event:IOErrorEvent):void {
   trace("ioErrorHandler: " + event);
   }

   private function openHandler(event:Event):void {
   trace("openHandler: " + event);
   }

   private function progressHandler(event:ProgressEvent):void {
   trace("progressHandler: bytesLoaded=" + event.bytesLoaded + " bytesTotal=" + event.bytesTotal);
   }

   private function unLoadHandler(event:Event):void {
   trace("unLoadHandler: " + event);
   }

   private function clickHandler(event:MouseEvent):void {
   trace("clickHandler: " + event);
   var loader:Loader = Loader(event.target);
   loader.unload();
   }
   }
   }
 */