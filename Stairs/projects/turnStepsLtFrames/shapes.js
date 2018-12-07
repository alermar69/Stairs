function drawLtTurnFrame1(frameParams) {
	frameParams.frame = new THREE.Object3D();
	
	var stringerThickness = 8;
	var flanThickness = 8;
	var M = frameParams.M;
	var turnFactor = frameParams.turnFactor;
	var metalMaterial = frameParams.metalMaterial;
	var metalMaterial2 = frameParams.metalMaterial2;
	
	/*** ДОБАВЛЕНИЕ ФЛАНЦЕВ ***/
		
	var rightFlanPosition = stringerThickness;
	var leftFlanPosition = M - 2*stringerThickness - flanThickness;
	//задаем параметры фланца
	var dxfBasePoint = {x: 0, y: 0};
	var dxfPrimitivesArr = {};
	var alfa = toRadians(20.0215);
	var widthShortFlan = 20+20+58+20+(20/Math.cos(alfa));
	var widthLongFlan = widthShortFlan + Math.tan(alfa) * (M - 2*stringerThickness - 2*flanThickness);

	/*короткий фланец*/
	var flanParams = {
		width: widthShortFlan,  //ширина фланца
		height: 40,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 40,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 98,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
		dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
	};
	var holesCoordinates1 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	//добавляем коротий фланец
	flanParams = drawRectFlan(flanParams);
	var flanShape = flanParams.shape;
	  
	var thickness = flanThickness;
	var extrudeOptions = {
		amount: thickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var flan = new THREE.Mesh(geometry, metalMaterial2);
		
	//задаем позицию короткого фланца
	if (turnFactor == "left") {
		flan.position.x = frameParams.basepoint.x;
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = frameParams.basepoint.z ;
		flan.rotation.x = 0;
		flan.rotation.y = Math.PI/2;
		flan.rotation.z = 0;
	}
	else {
		flan.position.x = frameParams.basepoint.x - flanThickness;
		flan.position.y = frameParams.basepoint.y + 0;
		flan.position.z = frameParams.basepoint.z;
		flan.rotation.x = 0;
		flan.rotation.y = Math.PI/2;
		flan.rotation.z = 0;
	}

	//добавляем фланец в сцену	
	frameParams.frame.add(flan);

	/*длинный фланец*/
	dxfBasePoint = {x: 0, y: 100};
	flanParams = {
		width: widthLongFlan,  //ширина фланца
		height: 40,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 50,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 98 + 20 + Math.tan(alfa) * (M - 2*stringerThickness - 2*flanThickness) - 30,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
		dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
	}
	var holesCoordinates2 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	//добавляем фланец
	flanParams = drawRectFlan(flanParams);
	var flanShape = flanParams.shape;
	  
	var thickness = flanThickness;
	var extrudeOptions = {
		amount: thickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	}; 

	var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var flan = new THREE.Mesh(geometry, metalMaterial2);
		
	//задаем позицию фланца
	if (turnFactor == "left") {
		flan.position.x = frameParams.basepoint.x + leftFlanPosition;
		flan.position.y = frameParams.basepoint.y;		
		flan.position.z = frameParams.basepoint.z;		
		flan.rotation.x = 0;
		flan.rotation.y = Math.PI/2;
		flan.rotation.z = 0;
	}
	else {
		flan.position.x = frameParams.basepoint.x - (leftFlanPosition + flanThickness);
		flan.position.y = frameParams.basepoint.y + 0;		
		flan.position.z = frameParams.basepoint.z;		
		flan.rotation.x = 0;
		flan.rotation.y = Math.PI/2;
		flan.rotation.z = 0;
	}

	//добавляем фланец в сцену	
	frameParams.frame.add(flan);
			
	/*** ДОБАВЛЕНИЕ ПРОФИЛЕЙ ***/

	/*задаем параметры объекта*/

	var profileHeight = 40;
	var profileWidth = 20;
	var angle;
	if (turnFactor == "left") {
		angle = -alfa;
	}
	else {
		angle = alfa;
	}
	var angle1 = Math.PI/2 - angle;
	var angle2 = Math.PI/2 - angle;
	var backLength1 = (M - 2*stringerThickness - 2*flanThickness)/Math.cos(alfa);
	var backLength2 = M - 2*stringerThickness - 2*flanThickness;

	/*задний профиль*/

	var dxfBasePoint = {x:0, y:200};
		
	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: angle1,
		angle2: angle2,
		backLength: backLength1,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);
		
	var profile = profileParams.mesh;
	if (turnFactor == "left") {
		profile.position.x = frameParams.basepoint.x + flanThickness;
		profile.position.y = frameParams.basepoint.y + profileHeight;		
		profile.position.z = frameParams.basepoint.z - (widthShortFlan);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = 0 - alfa;
	}
	else {
		profile.position.x = frameParams.basepoint.x - leftFlanPosition;
		profile.position.y = frameParams.basepoint.y + profileHeight;		
		profile.position.z = frameParams.basepoint.z - (widthLongFlan);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = 0 + alfa;
	}
	frameParams.frame.add(profile);

	/*передний профиль*/

	var dxfBasePoint = {x:0, y:300};
		
	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: Math.PI/2,
		angle2: Math.PI/2,
		backLength: backLength2,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);
		
	var profile1 = profileParams.mesh;
	if (turnFactor == "left") {
		profile1.position.x = frameParams.basepoint.x + flanThickness;
		profile1.position.y = frameParams.basepoint.y + profileHeight;		
		profile1.position.z = frameParams.basepoint.z - profileWidth;
		profile1.rotation.x = Math.PI/2;
		profile1.rotation.y = 0;
		profile1.rotation.z = 0;
	}
	else {
		profile1.position.x = frameParams.basepoint.x - leftFlanPosition;
		profile1.position.y = frameParams.basepoint.y + profileHeight;		
		profile1.position.z = frameParams.basepoint.z - profileWidth;
		profile1.rotation.x = Math.PI/2;
		profile1.rotation.y = 0;
		profile1.rotation.z = 0;
	}
	frameParams.frame.add(profile1);
		
	holesCoordinates = {holesCoordinates1: holesCoordinates1, holesCoordinates2: holesCoordinates2};
	//добавляем объекты в сцену
	frameParams.holesCoordinates = holesCoordinates;
	
	return frameParams;
}