package{
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.display.DisplayObject;
	import fl.controls.ComboBox;
	import flash.events.Event;	
	import src.naboj.Naboj;
	
	import flash.text.TextFormat;
	
	public class PrincipCinnosti extends MovieClip
	{
		private var aktivna_animacia:String;
		
		private var ugsArray_oboh_nmos:Array = ["0V", "1V", "3V", "5V"];
		private var udsArray_oboh_nmos:Array= ["0V", "2V", "5V","8V","15V"];
		
		private var ugsArray_oboh_pmos:Array = ["0V", "-1V", "-3V", "-5V"];
		private var udsArray_oboh_pmos:Array= ["0V", "-2V", "-5V","-8V","-15V"];
		
		private var ugsArray_ochud_nmos:Array = ["-2V", "1V", "4V" ];
		private var udsArray_ochud_nmos:Array= ["0V", "2V", "5V","8V","15V"];
		
		private var ugsArray_ochud_pmos:Array = ["2V", "-1V", "-4V"];
		private var udsArray_ochud_pmos:Array= ["0V", "-2V", "-5V","-8V","-15V"];
		
										//		[ugs0]					[ugs1]						[ugs2]						[ugs3]
		private var NMOS_oboh_bod_posX:Array= [[0,50,140,220,290],		[0,50,140,220,290],			[0,50,140,220,290],			[0,50,140,220,290]];
		private var NMOS_oboh_bod_posY:Array= [[0,0,0,0,0],				[0,-33,-33,-33,-33],		[0,-67,-81,-81,-81],		[0,-111,-162,-162,-162]];
		
		private var PMOS_oboh_bod_posX:Array= [[0,-50,-140,-220,-290],	[0,-50,-140,-220,-290],		[0,-50,-140,-220,-290],		[0,-50,-140,-220,-290]];
		private var PMOS_oboh_bod_posY:Array= [[0,0,0,0,0],				[0,33,33,33,33],			[0,67,81,81,81],			[0,111,162,162,162]];
		
		private var NMOS_ochud_bod_posX:Array= [[0,50,140,220,290],			[0,50,140,220,290],			[0,50,140,220,290], 		[0,0,0,0,0]]; //Poloha sa nastavuje ak ked je neaktivný tento graf.
		private var NMOS_ochud_bod_posY:Array= [[0,-33,-33,-33,-33],		[0,-67,-81,-81,-81],		[0,-111,-162,-162,-162],	[0,0,0,0,0]];
		
		private var PMOS_ochud_bod_posX:Array= [[0,-50,-140,-220,-290],		[0,-50,-140,-220,-290],		[0,-50,-140,-220,-290],		[0,0,0,0,0]];
		private var PMOS_ochud_bod_posY:Array= [[0,33,33,33,33],			[0,67,81,81,81],			[0,111,162,162,162], 		[0,0,0,0,0]];

		private var pismo_styl:TextFormat = new TextFormat();

		public function PrincipCinnosti(){

			nmos_btn.addEventListener(MouseEvent.CLICK, zmenaNaNmos);
			pmos_btn.addEventListener(MouseEvent.CLICK, zmenaNaPmos);
			ochud_btn.addEventListener(MouseEvent.CLICK, zmenaNaOchud);
			oboh_btn.addEventListener(MouseEvent.CLICK, zmenaNaOboh);
			ugs.addEventListener(Event.CHANGE, onEventChangeU);
			uds.addEventListener(Event.CHANGE, onEventChangeU);
			udsBottonUp_btn.addEventListener(MouseEvent.CLICK, changeUds_byBottonUp);
			udsBottonDown_btn.addEventListener(MouseEvent.CLICK, changeUds_byBottonDown);
			ugsBottonUp_btn.addEventListener(MouseEvent.CLICK, changeUgs_byBottonUp);
			ugsBottonDown_btn.addEventListener(MouseEvent.CLICK, changeUgs_byBottonDown);
			schematickaZnacka_btn.addEventListener(MouseEvent.MOUSE_DOWN, zobrazSchematickaZnacku);
			schematickaZnacka_btn.addEventListener(MouseEvent.MOUSE_UP, skrySchematickaZnacku);
			
			schematickaZnacka_mc.visible=false;

			zmenPolohuBodu(0,0);
			
			nastaveniaPoSpusteni();
			
			spetDoMenu_mc.addEventListener(MouseEvent.CLICK, vytvorEventComplete);

			//Nastavenie velkosti pisma v comboboxe
			pismo_styl.size = 18;

			
		}
		
		private function vytvorEventComplete(e:MouseEvent):void {
			this.dispatchEvent(new Event(Event.COMPLETE));
		}
		
		private function aktualizujGrafy():void{
			
			graf_PMOS_oboh.visible=false;
			graf_NMOS_oboh.visible=false;
			graf_NMOS_ochud.visible=false;
			graf_PMOS_ochud.visible=false;
			
			if(oboh_btn_aktivna_bodka.visible == true){
				
				if(nmos_btn_aktivna_bodka.visible==true)
					graf_NMOS_oboh.visible=true;
				
				if(pmos_btn_aktivna_bodka.visible==true)
					graf_PMOS_oboh.visible=true;
			}
			else if(ochud_btn_aktivna_bodka.visible==true){
				if(nmos_btn_aktivna_bodka.visible==true)
					graf_NMOS_ochud.visible=true;
				
				if(pmos_btn_aktivna_bodka.visible==true)
					graf_PMOS_ochud.visible=true;
			}
			
		}
		
		private function zmenPolohuBodu(ugs:Number,uds:Number):void{

			graf_NMOS_oboh.pohyblivyBod_mc.x=NMOS_oboh_bod_posX[ugs][uds];
			graf_NMOS_oboh.pohyblivyBod_mc.y=NMOS_oboh_bod_posY[ugs][uds];
			
			graf_PMOS_oboh.pohyblivyBod_mc.x=PMOS_oboh_bod_posX[ugs][uds];
			graf_PMOS_oboh.pohyblivyBod_mc.y=PMOS_oboh_bod_posY[ugs][uds];
			
			graf_NMOS_ochud.pohyblivyBod_mc.x=NMOS_ochud_bod_posX[ugs][uds];
			graf_NMOS_ochud.pohyblivyBod_mc.y=NMOS_ochud_bod_posY[ugs][uds];
			
			graf_PMOS_ochud.pohyblivyBod_mc.x=PMOS_ochud_bod_posX[ugs][uds];
			graf_PMOS_ochud.pohyblivyBod_mc.y=PMOS_ochud_bod_posY[ugs][uds];
			
			
		}
		
		private function aktualizujVoltmetre(ugs:Number,uds:Number):void
		{

			if(oboh_btn_aktivna_bodka.visible == true){
				if(nmos_btn_aktivna_bodka.visible==true){
					ugsHodnota.text = ugsArray_oboh_nmos[ugs];
					udsHodnota.text = udsArray_oboh_nmos[uds];

					
					if(graf_NMOS_oboh.pohyblivyBod_mc.y == 0)
						idsHodnota.text="0 mA";
					if(graf_NMOS_oboh.pohyblivyBod_mc.y == -33)
						idsHodnota.text="20 mA";
					if(graf_NMOS_oboh.pohyblivyBod_mc.y == -67)
						idsHodnota.text="50 mA";
					if(graf_NMOS_oboh.pohyblivyBod_mc.y == -81)
						idsHodnota.text="60 mA";
					if(graf_NMOS_oboh.pohyblivyBod_mc.y == -111)
						idsHodnota.text="70 mA";
					if(graf_NMOS_oboh.pohyblivyBod_mc.y == -162)
						idsHodnota.text="80 mA";
							
				}
				else if(pmos_btn_aktivna_bodka.visible==true){
					ugsHodnota.text = ugsArray_oboh_pmos[ugs];
					udsHodnota.text = udsArray_oboh_pmos[uds];
					
					if(graf_PMOS_oboh.pohyblivyBod_mc.y == 0)
						idsHodnota.text="0 mA";
					if(graf_PMOS_oboh.pohyblivyBod_mc.y == 33)
						idsHodnota.text="-20 mA";
					if(graf_PMOS_oboh.pohyblivyBod_mc.y == 67)
						idsHodnota.text="-50 mA";
					if(graf_PMOS_oboh.pohyblivyBod_mc.y == 81)
						idsHodnota.text="-60 mA";
					if(graf_PMOS_oboh.pohyblivyBod_mc.y == 111)
						idsHodnota.text="-70 mA";
					if(graf_PMOS_oboh.pohyblivyBod_mc.y == 162)
						idsHodnota.text="-80 mA";

				}
			}
			else if(ochud_btn_aktivna_bodka.visible==true){
				if(nmos_btn_aktivna_bodka.visible==true){
					ugsHodnota.text = ugsArray_ochud_nmos[ugs];
					udsHodnota.text = udsArray_ochud_nmos[uds];
					
					if(graf_NMOS_ochud.pohyblivyBod_mc.y == 0)
						idsHodnota.text="0 mA";
					if(graf_NMOS_ochud.pohyblivyBod_mc.y == -33)
						idsHodnota.text="20 mA";
					if(graf_NMOS_ochud.pohyblivyBod_mc.y == -67)
						idsHodnota.text="50 mA";
					if(graf_NMOS_ochud.pohyblivyBod_mc.y == -81)
						idsHodnota.text="60 mA";
					if(graf_NMOS_ochud.pohyblivyBod_mc.y == -111)
						idsHodnota.text="70 mA";
					if(graf_NMOS_ochud.pohyblivyBod_mc.y == -162)
						idsHodnota.text="80 mA";
					
					
				}
				else if(pmos_btn_aktivna_bodka.visible==true){
					ugsHodnota.text = ugsArray_ochud_pmos[ugs];
					udsHodnota.text = udsArray_ochud_pmos[uds];
					
					if(graf_PMOS_ochud.pohyblivyBod_mc.y == 0)
						idsHodnota.text="0 mA";
					if(graf_PMOS_ochud.pohyblivyBod_mc.y == 33)
						idsHodnota.text="-20 mA";
					if(graf_PMOS_ochud.pohyblivyBod_mc.y == 67)
						idsHodnota.text="-50 mA";
					if(graf_PMOS_ochud.pohyblivyBod_mc.y == 81)
						idsHodnota.text="-60 mA";
					if(graf_PMOS_ochud.pohyblivyBod_mc.y == 111)
						idsHodnota.text="-70 mA";
					if(graf_PMOS_ochud.pohyblivyBod_mc.y == 162)
						idsHodnota.text="-80 mA";
				}
				
			}
		}
		
		private function zobrazSchematickaZnacku(event:Event):void{	
			schematickaZnacka_mc.visible=true;
			if(nmos_btn_aktivna_bodka.visible==true)
				schematickaZnacka_mc.gotoAndStop(1);
			else
				schematickaZnacka_mc.gotoAndStop(2);
				
		}
		private function skrySchematickaZnacku(event:Event):void
		{	
			schematickaZnacka_mc.visible=false;
		}
		
		private function changeUds_byBottonUp(event:Event):void
		{	
			if(testRozsahuUp(uds,4)==false)
			{
				return ;
			}
			
			uds.selectedIndex = uds.selectedIndex +1;
			zmenaNapatia();
			
		}
		private function testRozsahuUp(instancia_comboboxu:Object,max:Number):Boolean
		{	
			if( instancia_comboboxu.selectedIndex== max )		// 4 preto lebo to zacina od 0
			{	
				return false;
			}
			return true;
		}
		
		private function testRozsahuDown(instancia_comboboxu:Object):Boolean
		{	
			if( instancia_comboboxu.selectedIndex== 0 )		// 4 preto lebo to zacina od 0
			{	
				return false;
			}
			return true;
		}
		
		
		private function changeUds_byBottonDown(event:Event):void
		{			
			if(testRozsahuDown(uds)==false)
			{
				return ;
			}
			
			uds.selectedIndex = uds.selectedIndex -1;
			zmenaNapatia();
		}
		
		private function changeUgs_byBottonUp(event:Event):void
		{			
			if(ochud_btn_aktivna_bodka.visible == true){
				if(testRozsahuUp(ugs,2)==false)
				{
					return ;
				}				
			}
			else{
				if(testRozsahuUp(ugs,3)==false)
				{
					return ;
				}
			}
			ugs.selectedIndex = ugs.selectedIndex +1;
			zmenaNapatia();
		}
		
		private function changeUgs_byBottonDown(event:Event):void
		{	
			if(testRozsahuDown(ugs)==false)
			{
				return ;
			}
			
			ugs.selectedIndex = ugs.selectedIndex -1;
			zmenaNapatia();
		}
		
		
		
		private function nastaveniaPoSpusteni():void
		{
			nmos_btn_aktivna_bodka.visible = true;
			pmos_btn_aktivna_bodka.visible = false;
			
			oboh_btn_aktivna_bodka.visible = true;
			ochud_btn_aktivna_bodka.visible = false;
			
			pridajPolozkuVComboBoxe(ugs, "Ugs0", "0");
			pridajPolozkuVComboBoxe(ugs, "Ugs1", "1");
			pridajPolozkuVComboBoxe(ugs, "Ugs2", "2");
			pridajPolozkuVComboBoxe(ugs, "Ugs3", "3"); // tu som pridal
			
			pridajPolozkuVComboBoxe(uds, "Uds1", "1");
			pridajPolozkuVComboBoxe(uds, "Uds2", "2");
			pridajPolozkuVComboBoxe(uds, "Uds3", "3");
			pridajPolozkuVComboBoxe(uds, "Uds4", "4");
			pridajPolozkuVComboBoxe(uds, "Uds5", "5");
			
			
			zastavVsetky();
			chod("ugs0uds1_mc", true);
			aktivna_animacia = "ugs0uds1_mc";
			
			aktualizujGrafy();
			
		
		}

		private function zmenaNaOboh(e:MouseEvent):void
		{
			oboh_btn_aktivna_bodka.visible = true;
			ochud_btn_aktivna_bodka.visible = false;
			
			nastavPolozkyUgsVComboBoxe();
			ugs.selectedIndex = 0;
			uds.selectedIndex = 0;
			
			zmenaNapatia();
			aktualizujGrafy();
			aktualizujVoltmetre(ugs.selectedIndex,uds.selectedIndex);
		}
		
		private function zmenaNaOchud(e:MouseEvent):void
		{
			oboh_btn_aktivna_bodka.visible = false;
			ochud_btn_aktivna_bodka.visible = true;
			
			ugs.selectedIndex = 0;
			uds.selectedIndex = 0;
			odoberPolozkuVComboBoxe(ugs, "Ugs0");
			
			zmenaNapatia();
			
			aktualizujGrafy();
			aktualizujVoltmetre(ugs.selectedIndex,uds.selectedIndex);
		}
		
		private function onEventChangeU(event:Event):void
		{
			zmenaNapatia();
			
		}
		
		private function zmenaNapatia():void
		{
			//+pretypovanie
			zmenaPohybuNa("ugs" + String(ugs.selectedItem.data) + "uds" + String(uds.selectedItem.data) + "_mc");

			zmenPolohuBodu(ugs.selectedIndex,uds.selectedIndex);
			aktualizujVoltmetre(ugs.selectedIndex,uds.selectedIndex);
		}
		
		/* na zaciatku ich vsetky zastavim*/
		private function zastavVsetky():void
		{
			var _b = 0;
			var pohyb:MovieClip;
			var _pocetAnimacii = vsetkyPohyby_mc.numChildren;
			
			while (_b < _pocetAnimacii)
			{
				pohyb = (vsetkyPohyby_mc.getChildAt(_b) as MovieClip);
				if (pohyb is MovieClip)
				{
					pohyb.stop();
					pohyb.visible = false;
				}
				else
				{
					;
				}
				_b++;
			}
		}
		
		private function zmenaPohybuNa(pohyb:String):void
		{	
			zastavAktivnu(aktivna_animacia);
			chod(pohyb, true);
			aktivna_animacia = pohyb;
		
		}
		
		private function zastavAktivnu(aktivna_animacia:String):void
		{
			chod(aktivna_animacia, false);
		}
		
		private function chod(pohyb:String, ist:Boolean):void
		{
			if (ist == true)
			{
				(vsetkyPohyby_mc.getChildByName(pohyb) as MovieClip).visible = true;
				(vsetkyPohyby_mc.getChildByName(pohyb) as MovieClip).play();
			}
			else if (ist == false)
			{
				(vsetkyPohyby_mc.getChildByName(pohyb) as MovieClip).stop();
				(vsetkyPohyby_mc.getChildByName(pohyb) as MovieClip).visible = false;
			}
		}
		
		private function zmenaNaNmos(e:MouseEvent):void
		{
			zmenaNabojov("naboj-");
			elektroda1_mc.gotoAndStop(1);
			elektroda2_mc.gotoAndStop(1);
			puzdro_mc.gotoAndStop(1);
			nmos_btn_aktivna_bodka.visible = true;
			pmos_btn_aktivna_bodka.visible = false;
			
			smer_prudu_mc.gotoAndStop(1);
			
			aktualizujGrafy();
			aktualizujVoltmetre(ugs.selectedIndex,uds.selectedIndex);
		}
		
		private function zmenaNaPmos(e:MouseEvent):void
		{
			zmenaNabojov("naboj+");
			elektroda1_mc.gotoAndStop(2);
			elektroda2_mc.gotoAndStop(2);
			puzdro_mc.gotoAndStop(2);
			nmos_btn_aktivna_bodka.visible = false;
			pmos_btn_aktivna_bodka.visible = true;
			
			smer_prudu_mc.gotoAndStop(2);
			
			aktualizujGrafy();
			aktualizujVoltmetre(ugs.selectedIndex,uds.selectedIndex);
		}
		
		private function zmenaNabojov(snimok:String):void{
			var _a = 0;
			var _b = 0;
			var naboj:MovieClip;
			var pohyb:MovieClip;
			var _pocetNabojov:int;
			var _pocetAnimacii = vsetkyPohyby_mc.numChildren;
			
			while (_b < _pocetAnimacii)
			{
				pohyb = (vsetkyPohyby_mc.getChildAt(_b) as MovieClip);
				if (pohyb is MovieClip)
				{
					_a = 0;
					_pocetNabojov = pohyb.numChildren;
					
					while (_a < _pocetNabojov)
					{
						naboj = (pohyb.getChildAt(_a) as MovieClip);
						
						if (naboj is Naboj)
							naboj.druh=snimok;		// tu som uplatnil set metodu
						else{							
							if(pohyb.getChildByName("kanal_mc") != null)
								if(nmos_btn_aktivna_bodka.visible==true)
									(pohyb.getChildByName("kanal_mc")as MovieClip).gotoAndStop(2);
								else
									(pohyb.getChildByName("kanal_mc")as MovieClip).gotoAndStop(1);
						}
						_a++;
					}
				}
				else
					;
				_b++;
				
			}
		}
		
		private function pridajPolozkuVComboBoxe(instancia_comboboxu:Object, polozka:String, hodnota:String):void
		{
			instancia_comboboxu.addItem({label: polozka, data: hodnota});
			nastavPismoVComboboxe();
		}
		
		private function nastavPolozkyUgsVComboBoxe():void
		{
			//ugs.removeAll();  // Toto tu vymazalo asi aj instanciu a potom davalo na ugs chybu NULL reference
			//odoberPolozkuVComboBoxe(ugs,"Ugs0");
			odoberPolozkuVComboBoxe(ugs, "Ugs1");
			odoberPolozkuVComboBoxe(ugs, "Ugs2");
			odoberPolozkuVComboBoxe(ugs, "Ugs3");
			
			pridajPolozkuVComboBoxe(ugs, "Ugs0", "0");
			pridajPolozkuVComboBoxe(ugs, "Ugs1", "1");
			pridajPolozkuVComboBoxe(ugs, "Ugs2", "2");
			pridajPolozkuVComboBoxe(ugs, "Ugs3", "3");

		}
		
		private function odoberPolozkuVComboBoxe(instancia_comboboxu:Object, meno_polozky:String):void
		{
			for (var i:int = 0; i < instancia_comboboxu.length; i++)
			{
				if (instancia_comboboxu.getItemAt(i).label == meno_polozky)
				{
					instancia_comboboxu.removeItemAt(i);
					nastavPismoVComboboxe();
				}
				
			}
		}
		
		private function nastavPismoVComboboxe():void
		{
			ugs.textField.setStyle("textFormat",pismo_styl);
			ugs.dropdown.setRendererStyle("textFormat", pismo_styl);
			
			uds.textField.setStyle("textFormat",pismo_styl);
			uds.dropdown.setRendererStyle("textFormat", pismo_styl);
		}
		
	
	}

}
