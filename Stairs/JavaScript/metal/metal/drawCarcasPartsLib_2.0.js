/*Версия библиотеки 1.9*/

/*** ОСНОВНЫЕ ФУНКЦИИ, ИСПОЛЬЗУЕМЫ НАПРЯМУЮ ***/

/*Функция отрисовки гнутого уголка с отверстиями*/

function drawAngleSupport(par) {
    /*исходные данные - модель уголка:
        У2-40х40х230
        У2-40х40х200
        У2-40х40х160
        У2-40х40х90
        У4-60х60х100
        У4-70х70х100
        У5-60х60х100
		
		noBoltsInSide1
		noBoltsInSide2
    */

	if(!par.model) {
		var angleModel = par; //костыль для совместимости, когда в параметрах передавалась только модель
		par = {};
		}
	else var angleModel = par.model;
	

	//if(!dxfBasePoint.x || !dxfBasePoint.y) dxfBasePoint = {x:0,y:0};
	var dxfBasePoint = { x: 0, y: 0 };

	var color = 0xC0C0C0;

	var partParams = {
		height: 40,
		holeDiam1: 7,
		holeDiam2: 13,
		hole1Y: 15,
		hole2Y: 20,
		metalThickness: 3
	}

	if (angleModel == "У2-40х40х230") {
		partParams.width = 230;
		partParams.holeDist1 = 200;
		partParams.holeDist2 = 180;
		color = 0xFF0000;
	}

	if (angleModel == "У2-40х40х200") {
		partParams.width = 200;
		partParams.holeDist1 = 170;
		partParams.holeDist2 = 150;
		color = 0xFFFF00;
	}

	if (angleModel == "У2-40х40х160") {
		partParams.width = 160;
		partParams.holeDist1 = 130;
		partParams.holeDist2 = 110;
		color = 0xFF00FF;
	}

	if (angleModel == "У2-40х40х90") {
		partParams.width = 90;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 50;
		color = 0x00FF00;
	}

	if (angleModel == "У4-60х60х100") {
		partParams.width = 100;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 60;
		partParams.height = 60,
			partParams.holeDiam1 = 13,
			partParams.holeDiam2 = 13,
			partParams.hole1Y = 30,
			partParams.hole2Y = 30,
			partParams.metalThickness = 8
		color = 0x004080;
	}

	if (angleModel == "У4-70х70х100") {
		partParams.width = 100;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 60;
		partParams.height = 70,
			partParams.holeDiam1 = 0,
			partParams.holeDiam2 = 13,
			//partParams.hole1Y = 30,
			partParams.hole2Y = 20,
			partParams.metalThickness = 8
		color = 0x800000;
	}

	if (angleModel == "У5-60х60х100") {
		partParams.width = 100;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 0;
		partParams.height = 60,
			partParams.holeDiam1 = 13,
			partParams.holeDiam2 = 23,
			partParams.hole1Y = 30,
			partParams.hole2Y = 23,
			partParams.metalThickness = 8
		color = 0x008040;
	}

	var metalMaterial = new THREE.MeshLambertMaterial({ color: color, wireframe: false });
	if(!$sceneStruct.vl_1.realColors) metalMaterial = params.materials.metal;

	// Уголок деталь изгиб
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 0;

	var shape = drawAngleSupportCentr(partParams.width, partParams.metalThickness);//передаваемые параметры (width, metalThickness)

	var extrudeOptions = {
		amount: partParams.width,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var angleSupportCentrGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	angleSupportCentrGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var angleSupport1 = new THREE.Mesh(angleSupportCentrGeometry, metalMaterial);
	angleSupport1.position.x = 0;
	angleSupport1.position.y = 0;
	angleSupport1.position.z = 0;

	angleSupport1.rotation.x = Math.PI / 2;
	angleSupport1.rotation.y = Math.PI / 2;
	angleSupport1.rotation.z = 0;

	//meshes.push(angleSupport1);

	// Уголок деталь полка 1
	dxfBasePoint.x = 0;
	dxfBasePoint.y = -100;
	var shape = drawAngleSupportSide(partParams.width, partParams.height, partParams.holeDist1, partParams.hole1Y, partParams.holeDiam1, partParams.metalThickness);//передаваемые параметры (width, height, holeDist, hole1Y, holeDiam, metalThickness)

	/*добавление овальных отверстий*/

	if (angleModel == "У4-70х70х100") {

		var holeWidth = 13;

		/*
		/*первое отверстие*
		var hole1 = new THREE.Path();
		var center1 = { x: 20, y: 19 };
		var center2 = newPoint_xy(center1, 0, 10);
		var p1 = newPoint_xy(center1, holeWidth / 2, 0);
		var p2 = newPoint_xy(center2, holeWidth / 2, 0);
		var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
		var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
		addLine(hole1, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
		addArc2(hole1, dxfPrimitivesArr0, center2, holeWidth / 2, Math.PI, 0, true, dxfBasePoint)
		addLine(hole1, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
		addArc2(hole1, dxfPrimitivesArr0, center1, holeWidth / 2, 0, -Math.PI, false, dxfBasePoint)
		shape.holes.push(hole1);

		/*второе отверстие*
		var hole2 = new THREE.Path();
		var center1 = { x: 80, y: 19 };
		var center2 = newPoint_xy(center1, 0, 10);
		var p1 = newPoint_xy(center1, holeWidth / 2, 0);
		var p2 = newPoint_xy(center2, holeWidth / 2, 0);
		var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
		var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
		addLine(hole2, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
		addArc2(hole2, dxfPrimitivesArr0, center2, holeWidth / 2, Math.PI, 0, true, dxfBasePoint)
		addLine(hole2, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
		addArc2(hole2, dxfPrimitivesArr0, center1, holeWidth / 2, 0, Math.PI, false, dxfBasePoint)
		shape.holes.push(hole2);
		*/
		var rad = 6.5;
		var clockwise = true;
		var distOval = 10;
		var center1 = { x: 20, y: 24 };
		var center2 = { x: 80, y: 24 };

		//нижнее отверстие
		addOvalHoleY(shape, [], center1, rad, distOval, dxfBasePoint, clockwise)
		//верхнее отверстие
		addOvalHoleY(shape, [], center2, rad, distOval, dxfBasePoint, clockwise)
	}
	var extrudeOptions = {
		amount: partParams.metalThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var angleSupportGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	angleSupportGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var angleSupport2 = new THREE.Mesh(angleSupportGeometry, metalMaterial);
	angleSupport2.position.x = 0;
	angleSupport2.position.y = partParams.metalThickness * 2;
	angleSupport2.position.z = 0;

	angleSupport2.rotation.x = 0;
	angleSupport2.rotation.y = 0;
	angleSupport2.rotation.z = 0;

	//meshes.push(angleSupport2);

	// Уголок деталь полка 2
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 100;
	var shape = drawAngleSupportSide(partParams.width, partParams.height, partParams.holeDist2, partParams.hole2Y, partParams.holeDiam2, partParams.metalThickness);

	var extrudeOptions = {
		amount: partParams.metalThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var angleSupportGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	angleSupportGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var angleSupport3 = new THREE.Mesh(angleSupportGeometry, metalMaterial);
	angleSupport3.position.x = 0;
	angleSupport3.position.y = partParams.metalThickness;
	angleSupport3.position.z = partParams.metalThickness * 2;

	angleSupport3.rotation.x = Math.PI / 2;
	angleSupport3.rotation.y = 0;
	angleSupport3.rotation.z = 0;

	//meshes.push(angleSupport3);

	var complexObject1 = new THREE.Object3D();
	complexObject1.add(angleSupport1);
	complexObject1.add(angleSupport2);
	complexObject1.add(angleSupport3);

	complexObject1.position.x = 0;
	complexObject1.position.y = 0;
	complexObject1.position.z = 0;

	complexObject1.rotation.x = 0;
	complexObject1.rotation.y = 0;
	complexObject1.rotation.z = 0;
	
	/* болты */	
	var partName = "treadAngle";
	if (angleModel == "У4-70х70х100" || angleModel == "У4-60х60х100" || angleModel == "У5-60х60х100") partName = "carcasAngle";
	
	//болты в грани 1
	if(!par.noBoltsInSide1) par.noBoltsInSide1 = false;	//болты есть
	if(angleModel == "У4-70х70х100" || angleModel == "У5-60х60х100") par.noBoltsInSide1 = true;
	
	//болты в грани 2
	if(!par.noBoltsInSide2) par.noBoltsInSide2 = false; //болты есть
	if(angleModel != "У4-70х70х100" && angleModel != "У4-60х60х100" && angleModel != "У5-60х60х100")
		par.noBoltsInSide2 = true;
	
	
	if(typeof anglesHasBolts != "undefined" && anglesHasBolts){ //глобальная переменная
		//болты в грани №1
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
			}
		if(!testingMode){
			if(partName == "treadAngle") boltPar.len = 20;
			if(partName == "carcasAngle") boltPar.len = 30;
			}
		
		
		if (!par.noBoltsInSide1) {
			var x = (partParams.width - partParams.holeDist2) / 2;
			var z = partParams.height - partParams.hole2Y;
			var y = boltPar.len / 2 - boltBulge;
			if (!par.noBoltsInSide1_1) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.position.x = x;
				bolt.position.z = z;
				bolt.position.y = y;
				complexObject1.add(bolt)
			}

			if (!par.noBoltsInSide1_2) {
				var bolt2 = drawBolt(boltPar).mesh;
				bolt2.position.x = x + partParams.holeDist2;
				bolt2.position.y = y;
				bolt2.position.z = z;
				complexObject1.add(bolt2)
			}
		}
			
		//болты в грани №2

		if (!par.noBoltsInSide2) {
			var x = (partParams.width - partParams.holeDist1) / 2;
			var y = partParams.height - partParams.hole1Y;
			if (angleModel == "У4-70х70х100") y = partParams.height - 35;
			var z = boltPar.len / 2 - boltBulge;
			if (!par.noBoltsInSide2_1) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2
				bolt.position.x = x;
				bolt.position.y = y;
				bolt.position.z = z;
				complexObject1.add(bolt)
			}

			if (!par.noBoltsInSide2_2) {
				var bolt2 = drawBolt(boltPar).mesh;
				bolt2.rotation.x = Math.PI / 2
				bolt2.position.x = x + partParams.holeDist1;
				bolt2.position.y = y;
				bolt2.position.z = z;
				complexObject1.add(bolt2)
			}
		}
		}


	//сохраняем данные для спецификации

	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Уголок ступени",
				metalPaint: true,
				timberPaint: false,
				division: "stock_2",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
		}
		if (partName == "carcasAngle") specObj[partName].name = "Уголок каркаса";

		var name = angleModel;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}
	
	//параметры для позиционирования
	var dimensions = {
		width: partParams.width,
		holeDist1: partParams.holeDist1,
		holeDist2: partParams.holeDist2,
		holePos: {
			x: (partParams.width - partParams.holeDist2) / 2,
			y: partParams.height -  partParams.hole1Y,
			}
		}
	if(angleModel == "У4-70х70х100") dimensions.holePos.y = partParams.height - 35;
	if(angleModel == "У5-60х60х100") {
		dimensions.holePos.y = partParams.height - partParams.hole1Y;
		dimensions.holePos.x = (partParams.width - partParams.holeDist1) / 2
		}
	
	if(angleModel == "У2-40х40х230" ||
	angleModel == "У2-40х40х200" ||
	angleModel == "У2-40х40х160" ||
	angleModel == "У2-40х40х90"){
		dimensions.holePos.y = partParams.height - partParams.hole2Y;
		}
	
	complexObject1.dimensions = dimensions;
	
	return complexObject1
}


/*функция отрисовки регулируемой опоры*/
function drawAdjustableLeg(isAngle) {
	dxfBasePoint = { x: 0, y: 0 }
	var leg = new THREE.Object3D();

	if (isAngle == undefined) {
		var angle = drawAngleSupport("У5-60х60х100");
		angle.position.x = 0;
		angle.position.y = 0;
		angle.position.z = 0;
		angle.castShadow = true;
		//if(side == "left") angle.rotation.y = Math.PI;
		leg.add(angle);
	}
	//нижний фланец
	var dxfBasePoint = { "x": 1000.0, "y": 2000.0 };
	var flanParams = {};
	flanParams.width = 100.0;
	flanParams.height = 100.0;
	flanParams.holeDiam = 7;
	flanParams.holeDiam5 = 22.0;
	flanParams.angleRadUp = 10.0;
	flanParams.angleRadDn = 10.0;
	flanParams.hole1X = 15.0;
	flanParams.hole1Y = 15.0;
	flanParams.hole2X = 15.0;
	flanParams.hole2Y = 15.0;
	flanParams.hole3X = 15.0;
	flanParams.hole3Y = 15.0;
	flanParams.hole4X = 15.0;
	flanParams.hole4Y = 15.0;
	flanParams.hole5X = flanParams.width / 2;
	flanParams.hole5Y = flanParams.height / 2;
	flanParams.dxfBasePoint = dxfBasePoint;
	flanParams.dxfPrimitivesArr = [];

	//добавляем фланец
	drawRectFlan(flanParams);
	var flanShape = flanParams.shape;

	var thickness = 4;
	var extrudeOptions = {
		amount: thickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var flan = new THREE.Mesh(geometry, params.materials.metal);

	//задаем позицию фланца
	flan.position.x = 0//angle.position.x + (flanParams.width - 100) / 2;
	flan.position.y = -40
	flan.position.z = flanParams.width - 13//angle.position.z -40 + flanParams.height / 2;
	flan.rotation.x = Math.PI * 1.5;
	flan.castShadow = true;
	//добавлЯем фланец в сцену
	leg.add(flan);



	var boltLen = 100;
	if (testingMode) boltLen = 65;
	var geometry = new THREE.CylinderGeometry(10, 10, boltLen, 10, 1, false);
	var bolt = new THREE.Mesh(geometry, params.materials.metal);
	bolt.position.x = flan.position.x + flanParams.width / 2;
	bolt.position.y = boltLen / 2 - 40
	bolt.position.z = (flan.position.z - flanParams.height / 2);
	bolt.rotation.x = 0.0;
	bolt.rotation.y = 0.0;
	bolt.rotation.z = 0.0;
	bolt.castShadow = true;
	leg.add(bolt);

	//сохраняем данные для спецификации
	var partName = "adjustableLeg";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Регулируемая опора",
				metalPaint: true,
				timberPaint: false,
				division: "stock_2",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
		}
		var name = "120";
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	return leg;
}


/*общая функция отрисовки квадратного фланца с отверстиями*/

function drawRectFlan(par) {

    /*исходные данные:
	чертеж фланца здесь: 6692035.ru/drawings/carcasPartsLib/flans/scheme_RectFlan.pdf
	par.width - ширина фланца
	par.height - длина фланца (высота при вертикальном расположении)
	par.holeDiam - диаметр отверстий с 1 по 4
	par.holeDiam5 - диаметр пятого (условно центрального) отверстия
	par.angleRadUp - радиус скругления верхних углов фланца
	par.angleRadDn - радиус скругления нижних углов фланца
	par.hole1X - координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	par.hole1Y - координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	par.hole2X - координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	par.hole2Y - координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	par.hole3X - координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	par.hole3Y - координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	par.hole4X - координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	par.hole4Y - координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	par.hole5X - координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца - левый нижний угол)
	par.hole5Y - координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца - левый нижний угол)
	par.dxfBasePoint - базовая точка для вставки контуров в dxf файл
	par.dxfPrimitivesArr - массив для вставки контуров в dxf файл

	!!! Для отрисовки отверстия необходимо наличие всех трех параметров (позиции по х,у и диаметра).
	!!! Нумерация отверстий идет по часовой стрелке, начиная с левого нижнего.
	*/
	
	//необязательные параметры
	if(!par.angleRadUp) par.angleRadUp = 0;
	if(!par.angleRadDn) par.angleRadDn = 0;
	
	var dxfBasePoint = par.dxfBasePoint;
	var dxfPrimitivesArr = par.dxfPrimitivesArr;
	var shape = new THREE.Shape();
	var p1 = { x: 0, y: 0 }
	var centerPoint = { x: 0, y: 0 };
	var p2 = copyPoint(p1);

	//прорисовка левого нижнего угла скругления
	if (par.angleRadDn > 0) {
		var startAngle = Math.PI * 3 / 2;
		var endAngle = Math.PI;
		centerPoint.x = par.angleRadDn; //назначение центра скругления
		centerPoint.y = par.angleRadDn;
		addArc(shape, dxfPrimitivesArr, centerPoint, par.angleRadDn, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка левого участка
	p1.x = 0;
	p1.y = par.angleRadDn;
	p2 = newPoint_xy(p1, 0, par.height - par.angleRadDn - par.angleRadUp); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	//прорисовка левого верхнего угла скругления
	if (par.angleRadUp > 0) {
		startAngle = Math.PI;
		endAngle = Math.PI / 2;
		centerPoint.x = par.angleRadUp; //назначение центра скругления
		centerPoint.y = par.height - par.angleRadUp;
		addArc(shape, dxfPrimitivesArr, centerPoint, par.angleRadUp, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка верхнего участка
	p1.x = par.angleRadUp;
	p1.y = par.height;
	p2 = newPoint_xy(p1, par.width - par.angleRadUp * 2, 0); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

	//прорисовка правого верхнего угла скругления
	if (par.angleRadUp > 0) {
		startAngle = Math.PI / 2;
		endAngle = 0;
		centerPoint.x = par.width - par.angleRadUp; //назначение центра скругления
		centerPoint.y = par.height - par.angleRadUp;
		addArc(shape, dxfPrimitivesArr, centerPoint, par.angleRadUp, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка левого участка
	p1.x = par.width;
	p1.y = par.height - par.angleRadUp;
	p2 = newPoint_xy(p1, 0, -par.height + par.angleRadUp + par.angleRadDn); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

	//прорисовка правого нижнего угла скругления
	if (par.angleRadDn > 0) {
		startAngle = Math.PI * 2;
		endAngle = Math.PI * 3 / 2;
		centerPoint.x = par.width - par.angleRadDn;
		centerPoint.y = par.angleRadDn;
		addArc(shape, dxfPrimitivesArr, centerPoint, par.angleRadDn, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка нижнего участка
	p1.x = par.width - par.angleRadDn;
	p1.y = 0;
	p2 = newPoint_xy(p1, -par.width + par.angleRadDn * 2, 0);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);


	/*Прорисовка отверстий*/
	var hole0Pos = { x: 0, y: 0 }

	/*отверстие № 1*/
	if (par.hole1X && par.hole1Y && par.holeDiam) {
		var hole1 = new THREE.Path();
		var hole1Pos = copyPoint(hole0Pos);
		hole1Pos.x = hole1Pos.x + par.hole1X;
		hole1Pos.y = hole1Pos.y + par.hole1Y;
		addCircle(hole1, dxfPrimitivesArr, hole1Pos, par.holeDiam / 2, dxfBasePoint)
		shape.holes.push(hole1);
	}

	/*отверстие № 2*/
	if (par.hole2X && par.hole2Y && par.holeDiam) {
		var hole2 = new THREE.Path();
		var hole2Pos = copyPoint(hole0Pos);
		hole2Pos.x = hole2Pos.x + par.hole2X;
		hole2Pos.y = hole2Pos.y + par.height - par.hole2Y;
		addCircle(hole2, dxfPrimitivesArr, hole2Pos, par.holeDiam / 2, dxfBasePoint)
		shape.holes.push(hole2);
	}

	/*отверстие № 3*/
	if (par.hole3X && par.hole3Y && par.holeDiam) {
		var hole3 = new THREE.Path();
		var hole3Pos = copyPoint(hole0Pos);
		hole3Pos.x = hole0Pos.x + par.width - par.hole3X;
		hole3Pos.y = hole0Pos.y + par.height - par.hole3Y;
		addCircle(hole3, dxfPrimitivesArr, hole3Pos, par.holeDiam / 2, dxfBasePoint)
		shape.holes.push(hole3);
	}

	/*отверстие № 4*/
	if (par.hole4X && par.hole4Y && par.holeDiam) {
		var hole4 = new THREE.Path();
		var hole4Pos = copyPoint(hole0Pos);
		hole4Pos.x = hole0Pos.x + par.width - par.hole4X;
		hole4Pos.y = hole0Pos.y + par.hole4Y;
		addCircle(hole4, dxfPrimitivesArr, hole4Pos, par.holeDiam / 2, dxfBasePoint)
		shape.holes.push(hole4);
	}

	/*отверстие № 5*/
	if (par.hole5X && par.hole5Y && par.holeDiam5) {
		var hole5 = new THREE.Path();
		var hole5Pos = copyPoint(hole0Pos);
		hole5Pos.x = hole5Pos.x + par.hole5X;
		hole5Pos.y = hole5Pos.y + par.hole5Y;
		addCircle(hole5, dxfPrimitivesArr, hole5Pos, par.holeDiam5 / 2, dxfBasePoint)
		shape.holes.push(hole5);
	}
	par.shape = shape;

	return par;
}




function drawProfile(profileParams) {
    /*параметры:
            width: profileWidth,
            height: profileHeight,
            angle1: angle1,
            angle2: angle2,
            backLength: backLength,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
            */

	var shape = new THREE.Shape();


	/*внешний контур*/

	var p1 = { x: 0, y: 0 }
	var p2 = newPoint_xy(p1, profileParams.backLength, 0);
	var p3 = newPoint_y(p2, profileParams.width, profileParams.angle2);
	var p4 = newPoint_y(p1, profileParams.width, profileParams.angle1);

	addLine(shape, profileParams.dxfPrimitivesArr, p1, p2, profileParams.dxfBasePoint);
	addLine(shape, profileParams.dxfPrimitivesArr, p2, p3, profileParams.dxfBasePoint);
	addLine(shape, profileParams.dxfPrimitivesArr, p3, p4, profileParams.dxfBasePoint);
	addLine(shape, profileParams.dxfPrimitivesArr, p4, p1, profileParams.dxfBasePoint);

	var extrudeOptions = {
		amount: profileParams.height,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geometry, profileParams.material);
	profileParams.mesh = mesh;

	return profileParams;
}



/*** ВСПОМОГАТЕЛЬЫНЕ ВНУТРЕННИЕ ФУНКЦИИ ***/


/*отрисовка шейпа гнутого участка уголка*/

function drawAngleSupportCentr(width, metalThickness) {

	var shape = new THREE.Shape();
	var p1 = { x: 0, y: 0 }
	var centerPoint = { x: 0, y: 0 };
	var p2 = copyPoint(p1);
	var flanParams = { //объявление параметров уголка
		width: width,
		bendRad: metalThickness
	}

	//прорисовка внешнего угла скругления
	if (flanParams.bendRad > 0) {
		var startAngle = Math.PI * 3 / 2;
		var endAngle = Math.PI;

		var dxfBasePoint = { x: 0, y: 0 }


		centerPoint.x = flanParams.bendRad * 2; //назначение центра скругления
		centerPoint.y = flanParams.bendRad * 2;
		addArc2(shape, dxfPrimitivesArr0, centerPoint, flanParams.bendRad * 2, startAngle, endAngle, true, dxfBasePoint);
	}

	//прорисовка верхнего участка
	p1.x = 0;
	p1.y = flanParams.bendRad * 2;
	p2 = newPoint_xy(p1, metalThickness, 0); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr0, p1, p2, dxfBasePoint);

	//прорисовка внутреннего угла скругления
	if (flanParams.bendRad > 0) {
		/*
		var startAngle = Math.PI;
		var endAngle = Math.PI * 3 / 2;
		*/
		centerPoint.x = flanParams.bendRad * 2; //назначение центра скругления
		centerPoint.y = flanParams.bendRad * 2;
		addArc2(shape, dxfPrimitivesArr0, centerPoint, flanParams.bendRad, startAngle, endAngle, false, dxfBasePoint);
	}

	//прорисовка нижнего участка
	p1.x = flanParams.bendRad * 2;
	p1.y = flanParams.bendRad;
	p2 = newPoint_xy(p1, 0, -flanParams.bendRad); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr0, p1, p2, dxfBasePoint);

	return shape;
}

/*отрисовка шейпа боковины уголка*/

function drawAngleSupportSide(width, height, holeDist, hole2Y, holeDiam, metalThickness) {

	var dxfBasePoint = { x: 0, y: 0 }
	var flanParams = { //объявление параметров уголка
		width: width,
		height: height,
		holeDiam: holeDiam,
		holeDist: holeDist,
		angleRadUp: 10,
		angleRadDn: 0,
		metalThickness: metalThickness,
		hole2X: 0,
		hole2Y: hole2Y,
		hole3X: 0,
		hole3Y: hole2Y,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr0

	}

	flanParams.height = flanParams.height - flanParams.metalThickness * 2;
	if (holeDist == 0) {
		flanParams.hole2X = flanParams.width / 2;
	}
	else {
		flanParams.hole2X = (flanParams.width - flanParams.holeDist) / 2;
		flanParams.hole3X = flanParams.hole2X;

	}
	var shape = drawRectFlan(flanParams).shape;

	return shape;
}

/**
 * Фланец крепления колоны к площадке с двумя овальными отверстиями
 */
function drawColFlan(columnParams) {
    var dxfBasePoint = copyPoint(columnParams.dxfBasePoint);
	dxfBasePoint.x += 100;

    var text = 'Фланец крепления колоны';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var flanShape = new THREE.Shape();

    var p0 = { x: 0.0, y: 0.0 };
    var p1 = newPoint_xy(p0, 0.0, 154.0);
    var p2 = newPoint_xy(p0, 40.0, 0.0);
    var p3 = newPoint_xy(p0, 40.0, 154.0);
    var ptc1 = newPoint_xy(p1, 8.0, 0.0);
    var ptc2 = newPoint_xy(p3, -8.0, 0.0);
    addLine(flanShape, dxfPrimitivesArr, p1, p0, dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p0, p2, dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
    addArc(flanShape, dxfPrimitivesArr, ptc2, 8.0, 0, Math.PI * 0.5, dxfBasePoint)
    addLine(flanShape, dxfPrimitivesArr, newPoint_xy(ptc2, 0.0, 8.0), newPoint_xy(ptc1, 0.0, 8.0), dxfBasePoint);
    addArc(flanShape, dxfPrimitivesArr, ptc1, 8.0, Math.PI * 0.5, Math.PI, dxfBasePoint);

    var holes = flanShape.holes;

    // отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, 20.0, -8.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    addLine(hole1, dxfPrimitivesArr, newPoint_xy(center1, -6.0, 0.0), newPoint_xy(center1, -6.0, -20.0), dxfBasePoint);
    addArc(hole1, dxfPrimitivesArr, newPoint_xy(center1, 0.0, -20.0), 6.0, Math.PI, Math.PI * 2.0, dxfBasePoint)
    addLine(hole1, dxfPrimitivesArr, newPoint_xy(center1, 6.0, -20.0), newPoint_xy(center1, 6.0, 0.0), dxfBasePoint);
    addArc(hole1, dxfPrimitivesArr, center1, 6.0, 0, Math.PI, dxfBasePoint);

    addLine(hole2, dxfPrimitivesArr, newPoint_xy(center2, -6.0, 0.0), newPoint_xy(center2, -6.0, -20.0), dxfBasePoint);
    addArc(hole2, dxfPrimitivesArr, newPoint_xy(center2, 0.0, -20.0), 6.0, Math.PI, Math.PI * 2.0, dxfBasePoint)
    addLine(hole2, dxfPrimitivesArr, newPoint_xy(center2, 6.0, -20.0), newPoint_xy(center2, 6.0, 0.0), dxfBasePoint);
    addArc(hole2, dxfPrimitivesArr, center2, 6.0, 0, Math.PI, dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, params.materials.metal);
    flan.castShadow = true;

    columnParams.dxfBasePoint.x += 200;

    return flan;
}//end of drawColFlan
