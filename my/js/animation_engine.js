class Vector2
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

class AnimatableObject
{
	constructor(position, scale, img, opacity)
	{
		this.animations = [];	
		
		this.position = JSON.parse(JSON.stringify(position));
		this.scale = JSON.parse(JSON.stringify(scale));
		
		this.img = new Image();
		this.img.src = img;
		this.img.alt = "image not found";
		
		this.opacity = opacity;
	}
	
	addAnimation(animation)
	{
		this.animations.push(animation);
	}
}

class Animation
{
	// !!! all the values are in percents !!!
	// position - Vector 2 - current object position
	// scale - Vector2 - object size
	// a - Vector2 - starting position of animatable object
	// b - Vector2 - end position of animatable object
	// t1 - time to begin animation
	// t2 - length of the animation
	constructor(property, a, b, t1, t2)
	{
		this.property = property;
		
		this.a = a;
		this.b = b;
		
		this.t1 = t1;
		this.t2 = t2;
	}
}
	
class AnimationEngine
{
	constructor(canvas)
	{
		this.mainCanvas = document.getElementById(canvas);
		this.mainContext = this.mainCanvas.getContext('2d');

		this.requestAnimationFrame = window.requestAnimationFrame || 
									window.mozRequestAnimationFrame || 
									window.webkitRequestAnimationFrame || 
									window.msRequestAnimationFrame;

		this.animatable_objects = [];
		this.time = 0;
		this.stop = false;

		this.update();
	}

	prepareCanvas()
	{
		this.mainCanvas.width  = this.mainCanvas.offsetWidth;
		this.mainCanvas.height = this.mainCanvas.offsetHeight;
		
		var canvasWidth  = this.mainCanvas.width;
		var canvasHeight = this.mainCanvas.height;
		
		this.mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
		 
		// background-color
		this.mainContext.fillStyle = "lightblue";
		this.mainContext.fillRect(0, 0, canvasWidth, canvasHeight);
	}

	update() 
	{
		this.prepareCanvas();
		
		var animationTime = (new Date().getTime() / 1000) - this.time;
		 
		// update state of every animatable object
		this.animatable_objects.forEach((item, animatable_object_index, animatable_object_arr) => {
			item.animations.forEach((animation, index, arr) => {
				if (animationTime >= animation.t1 && animationTime <= animation.t1 + animation.t2)
				{
					// basic settings
					// how long the animation plays
					var timeForAnimation = animation.t2;
					// how much time animation already goes
					var timeOfAnimation = animationTime - animation.t1;
					// how much percent of time the animation is already playing
					var percentTimeOfAnimation = (timeOfAnimation * 100) / timeForAnimation;
					
					// special settings different for each property
					if (animation.property == 'position')
					{
						var distanceX = animation.b.x - animation.a.x;
						var distanceY = animation.b.y - animation.a.y;
							
						// percent of distance where whole animation path is 100%
						var miniDistanceX = (percentTimeOfAnimation * distanceX) / 100;
						var miniDistanceY = (percentTimeOfAnimation * distanceY) / 100;
						
						item.position.x = animation.a.x + miniDistanceX;
						item.position.y = animation.a.y + miniDistanceY;
					}
					
					if (animation.property == 'scale')
					{
						var scaleX = animation.b.x - animation.a.x;
						var scaleY = animation.b.y - animation.a.y;
							
						// percent of distance where whole animation path is 100%
						var miniScaleX = (percentTimeOfAnimation * scaleX) / 100;
						var miniScaleY = (percentTimeOfAnimation * scaleY) / 100;
						
						item.scale.x = animation.a.x + miniScaleX;
						item.scale.y = animation.a.y + miniScaleY;
					}
					
					if (animation.property == 'opacity')
					{
						var opacityWay = animation.b.x - animation.a.x;
							
						// percent of distance where whole animation path is 100%
						var miniOpacityWay = (percentTimeOfAnimation * opacityWay) / 100;
						
						item.opacity = animation.a.x + miniOpacityWay;
					}
				}
			});
		});
		
		this.animatable_objects.forEach((item, animatable_object_index, animatable_object_arr) => {
			this.mainContext.beginPath();
				
			this.mainContext.globalAlpha = item.opacity;
						
			this.mainContext.drawImage(
				item.img,
				Utils.getWidthPixelInPercent(item.position.x - item.scale.x / 2, this.mainCanvas), 
				Utils.getHeightPixelInPercent(item.position.y - item.scale.y / 2, this.mainCanvas),
				Utils.getWidthPixelInPercent(item.scale.x, this.mainCanvas), 
				Utils.getHeightPixelInPercent(item.scale.y, this.mainCanvas));
			
			this.mainContext.fillStyle = "black";
			this.mainContext.fill();
			
			this.mainContext.closePath();
		});
		
		var self = this;	 
		this.requestAnimationFrame.call(window, function(){ self.update();});
	}

	StartAnimation()
	{
		this.time = new Date().getTime() / 1000;
	}
}

class Utils
{
	static getWidthPixelInPercent(percent, mainCanvas)
	{
		return mainCanvas.width / 100 * percent;
	}

	static getHeightPixelInPercent(percent, mainCanvas)
	{
		return mainCanvas.height / 100 * percent;
	}

	static getWidthPercentInPixel(pixel, mainCanvas)
	{
		return mainCanvas.width * pixel / 100;
	}	
}