function StartAnimation()
{
	const introAnimation = new AnimationEngine('main_canvas');

	/**
	 * first scene of intro
	 */

	//                                        position                   scale     image       opacity
	var obj1 = new AnimatableObject(new Vector2(15, 50),	 new Vector2(10, 80), 'images/intro/1-1.png', 1);
	var obj2 = new AnimatableObject(new Vector2(160, -82.5), new Vector2(70, 15), 'images/intro/1-2.png', 1);

	// images of electronic devices
	// bottom row
	var obj3 = new AnimatableObject(new Vector2(50, -20),	 new Vector2(20, 20), 'images/intro/1-4.png', 1);
	var obj4 = new AnimatableObject(new Vector2(50, -20),	 new Vector2(20, 20), 'images/intro/1-5.png', 1);
	var obj5 = new AnimatableObject(new Vector2(50, -20),	 new Vector2(20, 20), 'images/intro/1-6.png', 1);
													   
	// top row                                         
	var obj6 = new AnimatableObject(new Vector2(50, -20),	 new Vector2(20, 20), 'images/intro/1-7.png', 1);
	var obj7 = new AnimatableObject(new Vector2(50, -20),	 new Vector2(20, 20), 'images/intro/1-8.png', 1);
	var obj8 = new AnimatableObject(new Vector2(50, -20),	 new Vector2(20, 20), 'images/intro/1-9.png', 1);

	// opacity of images
	obj1.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj2.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj3.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj4.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj5.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj6.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj7.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));
	obj8.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(0,   0),   0,   0.1));

	// changing the opacity
	obj1.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   0.7,   0.5));
	obj2.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   0.7,   0.5));
	obj3.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   0.6,   0.5));
	obj4.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   0.8,   0.5));
	obj5.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   1,     0.5));
	obj6.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   1.2,   0.5));
	obj7.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   1.4,   0.5));
	obj8.addAnimation(new Animation('opacity',  new Vector2(0,     0),  new Vector2(1,   0),   1.6,   0.5));

	// changing the position
	obj1.addAnimation(new Animation('position', new Vector2(-15, -50),  new Vector2(15, 50),   0,     0.7));
	obj2.addAnimation(new Animation('position', new Vector2(160, 82.5), new Vector2(60, 82.5), 0.2,   0.7));
	obj3.addAnimation(new Animation('position', new Vector2(50, -20),   new Vector2(80, 55),   0.4,   0.7));
	obj4.addAnimation(new Animation('position', new Vector2(50, -20),   new Vector2(60, 55),   0.6,   0.7));
	obj5.addAnimation(new Animation('position', new Vector2(50, -20),   new Vector2(40, 55),   0.8,   0.7));
	obj6.addAnimation(new Animation('position', new Vector2(50, -20),   new Vector2(80, 35),   1,     0.7));
	obj7.addAnimation(new Animation('position', new Vector2(50, -20),   new Vector2(60, 35),   1.2,   0.7));
	obj8.addAnimation(new Animation('position', new Vector2(50, -20),   new Vector2(40, 35),   1.4,   0.7));

	obj1.addAnimation(new Animation('position', new Vector2(15, 50),    new Vector2(-15, -50),  3,     0.7));
	obj2.addAnimation(new Animation('position', new Vector2(60, 82.5),  new Vector2(160, 82.5), 3,     0.7));
	obj3.addAnimation(new Animation('position', new Vector2(80, 55),    new Vector2(80, 155),   3.4,   3));
	obj4.addAnimation(new Animation('position', new Vector2(60, 55),    new Vector2(60, 155),   3.4,   3));
	obj5.addAnimation(new Animation('position', new Vector2(40, 55),    new Vector2(40, 155),   3.4,   3));
	obj6.addAnimation(new Animation('position', new Vector2(80, 35),    new Vector2(170, 35),   3.4,   3));
	obj7.addAnimation(new Animation('position', new Vector2(60, 35),    new Vector2(150, 35),   3.4,   3));

	// scale object
	obj8.addAnimation(new Animation('scale',    new Vector2(20, 20),    new Vector2(150, 150),   3.4,   4));
	obj8.addAnimation(new Animation('position', new Vector2(40, 35),    new Vector2(50,   50),   3.4,   1));
	obj8.addAnimation(new Animation('opacity',  new Vector2(1,   0),    new Vector2(0,     0),     5,   2));

	introAnimation.animatable_objects.push(obj1);
	introAnimation.animatable_objects.push(obj2);

	introAnimation.animatable_objects.push(obj3);
	introAnimation.animatable_objects.push(obj4);
	introAnimation.animatable_objects.push(obj5);

	introAnimation.animatable_objects.push(obj6);
	introAnimation.animatable_objects.push(obj7);
	introAnimation.animatable_objects.push(obj8);

	for (var i = 0; i < 3; i++)
	{
		var obj = new AnimatableObject(new Vector2(50, 50), new Vector2(40, 40), 'images/intro/1-10.png', 0);

		obj.addAnimation(new Animation('opacity',  new Vector2(0,   0),    new Vector2(1,     0),     5 + i * 2,   2));
		obj.addAnimation(new Animation('scale',    new Vector2(40, 40),    new Vector2(100, 100),     5 + i * 2,   4));
		obj.addAnimation(new Animation('opacity',  new Vector2(1,   0),    new Vector2(0,     0),     7 + i * 2,   2));
		
		introAnimation.animatable_objects.push(obj);
	}

	introAnimation.StartAnimation();
}
