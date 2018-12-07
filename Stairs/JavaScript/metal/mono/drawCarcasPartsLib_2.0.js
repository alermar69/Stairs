/*Версия библиотеки 1.8*/

/*** ОСНОВНЫЕ ФУНКЦИИ, ИСПОЛЬЗУЕМЫ НАПРЯМУЮ ***/

 /**
     * Отрисовка подступенка
     */
	function drawRiser(riserParams) {
	
		var textHeight = 30;
		var riserHeight = riserParams.h - riserParams.treadThickness;
		var riserLength = riserParams.treadWidth - 2 * riserParams.riserSideOffset;

		var textBasePoint = newPoint_xy(riserParams.dxfBasePoint, 20, -100);
    	addText('Подступенок', textHeight, riserParams.dxfArr, textBasePoint);
  		addText(riserParams.text, textHeight, riserParams.dxfArr, newPoint_xy(textBasePoint, 0, -40));

    	// контур
    	var treadShape = new THREE.Shape();
    	var p0 = { "x": 0.0, "y": 0.0 };
    	var p1 = newPoint_xy(p0, 0.0, riserHeight);
    	var p2 = newPoint_xy(p1, riserLength, 0.0);
    	var p3 = newPoint_xy(p2, 0.0, -riserHeight);
    	var p4 = newPoint_xy(p3, -riserLength, 0.0);
    	addLine(treadShape, riserParams.dxfArr, p1, p2, riserParams.dxfBasePoint);
    	addLine(treadShape, riserParams.dxfArr, p2, p3, riserParams.dxfBasePoint);
    	addLine(treadShape, riserParams.dxfArr, p3, p4, riserParams.dxfBasePoint);
    	addLine(treadShape, riserParams.dxfArr, p4, p1, riserParams.dxfBasePoint);

    	var extrudeOptions = {
    		amount: riserParams.riserThickness,
    		bevelEnabled: false,
    		curveSegments: 12,
    		steps: 1
        };

		//
		geometry = new THREE.ExtrudeGeometry(treadShape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var riser = new THREE.Mesh(geometry, riserParams.material);
		riserParams.mesh = riser;		
        return riserParams;
	}//end of drawRiser

//функция создания уголков забежных ступеней ЛТ. Возвращает группу мэшей
function drawLtWinderAngles(turnParams) {

	/*Исходные параметры
	turnParams - массив с параметрами лестницы (ширина марша, высота, и т.п.)

	Выходные данные 3D объект*/
 	var angle = new THREE.Object3D();
	var angleWidth = 40, angleLength, angleModel, angleModelWnd, angleLengthWnd;
	var turnFactor = turnParams.turnFactor;
	var marshDist = turnParams.marshDist;
	var angleParams = {};
	angleModelWnd = 'У2-40х40х90';
	stringerThickness = turnParams.stringerThickness;
	treadSideOffset = turnParams.treadSideOffset;
	angleLengthWnd = 90;
	var angleLnWdHf = angleLengthWnd / 2;

	if(turnParams.M <= 700) {
		angleModel = 'У2-40х40х160';
		angleLength = 160;
	}
	else {
		angleModel = 'У2-40х40х200';
		angleLength = 200;
	}
	angleParams.angleModel = angleModel;
	angleParams.angleLength = angleLength;
	if(turnParams.stairModel === "П-образная с забегом") {
		angleParams.type = 'p';
	}
	else {
		angleParams.type = 'g';
	}

	//отрисовываем уголки для 1-ой забежной ступени
	var angle1_1 = drawAngleSupport(angleModel);
		angle1_1.position.x = -(turnParams.params[1].treadWidth + treadSideOffset) * turnFactor;
		angle1_1.position.z = -turnParams.params[1].stepWidthHi + 60;
		if(turnFactor == 1) angle1_1.position.z += angleLength;
		angle1_1.rotation.x = Math.PI/2;
		angle1_1.rotation.z = -Math.PI/2 * turnFactor;

		angle.add(angle1_1);
		angleParams.a1_1 = {
			x: turnParams.params[1].stepWidthHi - 60,
			y: 0,
			z: angle1_1.position.x
		};
	//отрисовываем уголки для второй забежной ступени
	var angle2_1 = drawAngleSupport(angleModel);
		angle2_1.position.x = turnFactor * (-turnParams.params[2].treadWidthX + turnParams.params[2].innerOffsetX + 5 + stringerThickness);
		angle2_1.position.y = turnParams.h;
		angle2_1.position.z = -turnParams.params[2].stepOffsetY - (stringerThickness + treadSideOffset + 31) - 60;
		if(turnFactor == -1) angle2_1.position.z -= angleLength;
		angle2_1.rotation.x = Math.PI/2;
		angle2_1.rotation.z = -Math.PI/2 * turnFactor;
		angle.add(angle2_1);
		angleParams.a2_1 = {
			x: turnParams.params[2].stepOffsetY + (stringerThickness + treadSideOffset + 31) + 60 + angleLength,
			y: angle2_1.position.y,
			z: angle2_1.position.x,
		};
		//console.log(angleParams.a2_1)
		
		
	var angle2_2 = drawAngleSupport(angleModel);
		angle2_2.position.x = turnFactor * (-turnParams.params[2].treadWidthX + turnParams.params[2].innerOffsetX + 5 + turnParams.params[2].stepWidthX - 60);
		if(turnFactor == 1) angle2_2.position.x -= angleLength;
		angle2_2.position.y = turnParams.h;
		angle2_2.position.z = -turnParams.params[2].treadWidthY - (stringerThickness + treadSideOffset * 2 + 31);
		angle2_2.rotation.x = Math.PI/2;
		angle.add(angle2_2);
		angleParams.a2_2 = {
			x: angle2_2.position.x + angleLength / 2, //
			y: angle2_2.position.y,
			z: angle2_2.position.z
		};
	var angle2_Wnd = drawAngleSupport(angleModelWnd);
		angle2_Wnd.position.x = turnFactor * (angleLnWdHf + treadSideOffset + 5 + stringerThickness + (turnParams.params[2].innerOffsetX - angleLengthWnd) / 2) + angleLnWdHf;
		angle2_Wnd.position.y = turnParams.h;
		angle2_Wnd.position.z = - (stringerThickness + 31);
		angle2_Wnd.rotation.x = Math.PI / 2;
		angle2_Wnd.rotation.z = Math.PI;
		angle.add(angle2_Wnd);
		angleParams.a2_Wnd = {
			x: turnFactor * (angle2_Wnd.position.x - angleLengthWnd / 2), //
			y: angle2_Wnd.position.y,
			z: angle2_Wnd.position.z
		};
	//отрисовываем уголки для 3-ей забежной ступени
	var deltaX_3 = turnParams.params[3].stepWidthHi - 40 - 60 - angleLength * 2;
	var deltaIndent_3 = 0;
	if(deltaX_3 < 5) deltaIndent_3 = (5 - deltaX_3) / 2;
	var angle3_1 = drawAngleSupport(angleModel);
		angle3_1.position.x =  - (turnParams.params[3].stepWidthLow + 5 - 60 + deltaIndent_3) * turnParams.params[3].turnFactor;
		if(turnFactor == 1) angle3_1.position.x -= angleLength ;
		angle3_1.position.y = turnParams.h * 2;
		angle3_1.position.z = -turnParams.params[2].treadWidthY - (stringerThickness + treadSideOffset * 2  + 31);
		angle3_1.rotation.x = Math.PI/2;
		angle.add(angle3_1);
		angleParams.a3_1 = {
			x: angle3_1.position.x + angleLength / 2, //
			y: angle3_1.position.y,
			z: angle3_1.position.z
		};
	var angle3_2 = drawAngleSupport(angleModel);
		angle3_2.position.x =  - (turnParams.params[3].stepWidthLow + 5 - turnParams.params[3].stepWidthHi + 40 - deltaIndent_3) * turnParams.params[3].turnFactor;
		if(turnFactor == -1) angle3_2.position.x -= angleLength;
		angle3_2.position.y = turnParams.h * 2;
		angle3_2.position.z = -turnParams.params[2].treadWidthY - (stringerThickness + treadSideOffset * 2  + 31);
		angle3_2.rotation.x = Math.PI/2;
		angle.add(angle3_2);
		angleParams.a3_2 = {
			x: angle3_2.position.x + angleLength / 2, //
			y: angle3_2.position.y,
			z: angle3_2.position.z
		};
	var angle3_Wnd = drawAngleSupport(angleModelWnd);
		angle3_Wnd.position.x = turnFactor * (angleLnWdHf + treadSideOffset + 5 + stringerThickness + (turnParams.params[2].innerOffsetX - angleLengthWnd) / 2) + angleLnWdHf;
		angle3_Wnd.position.y = turnParams.h * 2;
		angle3_Wnd.position.z = - (stringerThickness + 31);
		angle3_Wnd.rotation.x = Math.PI / 2;
		angle3_Wnd.rotation.z = Math.PI;
		angle.add(angle3_Wnd);
		angleParams.a3_Wnd = {
			x: turnFactor * (angle3_Wnd.position.x - angleLengthWnd / 2),
			y: angle3_Wnd.position.y,
			z: angle3_Wnd.position.z
		};
	if (turnParams.stairModel === "П-образная с забегом") {
			//отрисовываем уголки для 4-ой забежной ступени
			var angle4_1 = drawAngleSupport(angleModel);
				angle4_1.position.x = turnFactor * (turnParams.params[4].stepWidthHi + marshDist + stringerThickness + treadSideOffset - 31 - 60);
				if(turnFactor == 1) angle4_1.position.x = angle4_1.position.x - angleLength;
				angle4_1.position.y = turnParams.h * 3;
				angle4_1.position.z = -turnParams.params[4].treadWidth- (stringerThickness + treadSideOffset * 2  + 31);
				angle4_1.rotation.x = Math.PI/2;
				angle.add(angle4_1);
				angleParams.a4_1 = {
					x: angle4_1.position.x, //
					y: angle4_1.position.y,
					z: angle4_1.position.z
				};
			//отрисовываем уголки для 5-ой забежной ступени
			var angle5_1 = drawAngleSupport(angleModel);
				angle5_1.position.x = (turnParams.params[5].stepOffsetY + marshDist + stringerThickness *2 + treadSideOffset * 2 + 60) * turnFactor;
				if(turnFactor == -1) angle5_1.position.x -= angleLength;
				angle5_1.position.y = turnParams.h * 4;
				angle5_1.position.z = angle4_1.position.z //-turnParams.params[5].treadWidthX - (stringerThickness + treadSideOffset  + 31) + (turnParams.params[5].innerOffsetX + 5);
				angle5_1.rotation.x = Math.PI/2;
				angle.add(angle5_1);
				angleParams.a5_1 = {
					x: angle5_1.position.x, //
					y: angle5_1.position.y,
					z: angle5_1.position.z
				};
			var angle5_2 = drawAngleSupport(angleModel);
				angle5_2.position.x = turnFactor * (turnParams.params[5].treadWidthY  + marshDist + stringerThickness * 2 + treadSideOffset * 3 ) ;
				angle5_2.position.y = turnParams.h * 4;
				angle5_2.position.z = -turnParams.params[5].stepOffsetX - (stringerThickness + treadSideOffset + 31) + (turnParams.params[5].innerOffsetX + 5) - 60;
				if(turnFactor == 1) angle5_2.position.z = angle5_2.position.z - angleLength;
				angle5_2.rotation.x = Math.PI/2;
				angle5_2.rotation.z = Math.PI/2 * turnFactor;
				angle.add(angle5_2);
				angleParams.a5_2 = {
					x: angle5_2.position.x, //
					y: angle5_2.position.y,
					z: angle5_2.position.z
				};
			var angle5_Wnd = drawAngleSupport(angleModelWnd);
				angle5_Wnd.position.x = (turnParams.marshDist + stringerThickness * 2 + treadSideOffset) * turnParams.params[5].turnFactor;
				angle5_Wnd.position.y = turnParams.h * 4;
				angle5_Wnd.position.z = - 31 + (turnParams.params[5].innerOffsetX + 5) //позиционируем относительно ступени
										- angleLnWdHf + angleLnWdHf * turnFactor //учитываем поворот (уходим от  лишнего кода)
										- (turnParams.params[5].innerOffsetX - angleLengthWnd) / 2;  //ставить посередине innerOffsetX
				angle5_Wnd.rotation.x = Math.PI / 2;
				angle5_Wnd.rotation.z = 1.5 * Math.PI * turnFactor;
				angle.add(angle5_Wnd);
				angleParams.a5_Wnd = {
					x: angle5_Wnd.position.x, //
					y: angle5_Wnd.position.y,
					z: angle5_Wnd.position.z
				};
			//отрисовываем уголки для 6-ой забежной ступени
			var deltaX_6 = turnParams.params[6].stepWidthHi - 40 - 60 - angleLength * 2;
			var deltaIndent_6 = 0;
			if(deltaX_6 < 5) deltaIndent_6 = (5 - deltaX_6) / 2;
			var angle6_1 = drawAngleSupport(angleModel);
				angle6_1.position.x = turnFactor * (turnParams.params[6].treadWidth  + marshDist + stringerThickness *2 + treadSideOffset * 3);
				angle6_1.position.y = turnParams.h * 5;
				angle6_1.position.z =  - (stringerThickness + treadSideOffset + 31) + (turnParams.params[6].stepWidthLow + 5) - 60 + deltaIndent_6;
				if(turnFactor == 1) angle6_1.position.z -= angleLength;
				angle6_1.rotation.x = Math.PI/2;
				angle6_1.rotation.z = Math.PI/2 * turnFactor;
				angle.add(angle6_1);
				angleParams.a6_1 = {
					x: angle6_1.position.x, //
					y: angle6_1.position.y,
					z: angle6_1.position.z
				};
			var angle6_2 = drawAngleSupport(angleModel);
				angle6_2.position.x = turnFactor * (turnParams.params[6].treadWidth  + marshDist + stringerThickness *2 + treadSideOffset * 3) ;
				angle6_2.position.y = turnParams.h * 5;
				angle6_2.position.z =  - (stringerThickness + treadSideOffset + 31) + (turnParams.params[6].stepWidthLow + 5) - turnParams.params[6].stepWidthHi + 40 - deltaIndent_6;
				if(turnFactor == -1) angle6_2.position.z = angle6_2.position.z + angleLength;
				angle6_2.rotation.x = Math.PI/2;
				angle6_2.rotation.z = Math.PI/2 * turnFactor;
				angle.add(angle6_2);
				angleParams.a6_2 = {
					x: angle6_2.position.x, //
					y: angle3_2.position.y,
					z: angle6_2.position.z
				};
			var angle6_Wnd = drawAngleSupport(angleModelWnd);
				angle6_Wnd.position.x = - (turnParams.marshDist + stringerThickness *2 + treadSideOffset) * turnParams.params[6].turnFactor;
				angle6_Wnd.position.y = turnParams.h * 5;
				angle6_Wnd.position.z = - 31 + (turnParams.params[6].stepWidthLow + 5)
										- angleLnWdHf + angleLnWdHf * turnFactor
										- (turnParams.params[6].stepWidthLow - angleLengthWnd) / 2;
				angle6_Wnd.rotation.x = Math.PI / 2;
				angle6_Wnd.rotation.z = 1.5 * Math.PI * turnFactor;
				angle.add(angle6_Wnd);
				angleParams.a6_Wnd = {
					x: angle6_Wnd.position.x, //
					y: angle6_Wnd.position.y,
					z: angle6_Wnd.position.z
				};
	}
	turnParams.angles = {
		meshes: angle,
		params: angleParams
	};
	return turnParams;
}//end of drawLtWinderAngles


/*Функция отрисовки гнутого уголка с отверстиями*/

function drawAngleSupport(angleModel){
/*исходные данные - модель уголка:
	У2-40х40х230
	У2-40х40х200
	У2-40х40х160
	У2-40х40х90
	У4-60х60х100
	У4-70х70х100
	У5-60х60х100
*/

//if(!dxfBasePoint.x || !dxfBasePoint.y) dxfBasePoint = {x:0,y:0};
var dxfBasePoint = {x:0,y:0};

/*задаем материалы*/
	var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5});
	var metalMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});

var partParams = {
    height:40,
	holeDiam1:7,
	holeDiam2:13,
	hole1Y:15,
    hole2Y:20,
	metalThickness:3
	}

	if (angleModel == "У2-40х40х230"){
	partParams.width = 230;
	partParams.holeDist1 = 200;
	partParams.holeDist2 = 180;
	}

	if (angleModel == "У2-40х40х200"){
	partParams.width = 200;
	partParams.holeDist1 = 170;
	partParams.holeDist2 = 150;
	}

	if (angleModel == "У2-40х40х160"){
	partParams.width = 160;
	partParams.holeDist1 = 130;
	partParams.holeDist2 = 110;
	}

	if (angleModel == "У2-40х40х90"){
	partParams.width = 90;
	partParams.holeDist1 = 60;
	partParams.holeDist2 = 50;
	}

	if (angleModel == "У4-60х60х100"){
	partParams.width = 100;
	partParams.holeDist1 = 60;
	partParams.holeDist2 = 60;
	partParams.height = 60,
	partParams.holeDiam1 = 13,
	partParams.holeDiam2 = 13,
	partParams.hole1Y = 30,
	partParams.hole2Y = 30,
	partParams.metalThickness = 8
	}

	if (angleModel == "У4-70х70х100"){ //добавить рисование овальных отверстий
	partParams.width = 100;
	partParams.holeDist1 = 60;
	partParams.holeDist2 = 60;
	partParams.height = 70,
	partParams.holeDiam1 = 0,
	partParams.holeDiam2 = 13,
	//partParams.hole1Y = 30,
	partParams.hole2Y = 20,
	partParams.metalThickness = 8
	}

	if (angleModel == "У5-60х60х100"){
	partParams.width = 100;
	partParams.holeDist1 = 60;
	partParams.holeDist2 = 0;
	partParams.height = 60,
	partParams.holeDiam1 = 13,
	partParams.holeDiam2 = 23,
	partParams.hole1Y = 30,
	partParams.hole2Y = 23,
	partParams.metalThickness = 8
   }

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

		angleSupport1.rotation.x = Math.PI/2;
		angleSupport1.rotation.y = Math.PI/2;
		angleSupport1.rotation.z = 0;

		//meshes.push(angleSupport1);

// Уголок деталь полка 1
		dxfBasePoint.x = 0;
		dxfBasePoint.y = -100;
		var shape = drawAngleSupportSide(partParams.width, partParams.height, partParams.holeDist1, partParams.hole1Y, partParams.holeDiam1, partParams.metalThickness);//передаваемые параметры (width, height, holeDist, hole1Y, holeDiam, metalThickness)

/*добавление овальных отверстий*/

if (angleModel == "У4-70х70х100"){

	var holeWidth = 13;

/*первое отверстие*/
	var hole1 = new THREE.Path();
	var center1 = {x:20, y:19};
	var center2 = newPoint_xy(center1, 0, 10);
	var p1 = newPoint_xy(center1, holeWidth/2, 0);
	var p2 = newPoint_xy(center2, holeWidth/2, 0);
	var p3 = newPoint_xy(center2, -holeWidth/2, 0);
	var p4 = newPoint_xy(center1, -holeWidth/2, 0);
	addLine(hole1, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
	addArc(hole1, dxfPrimitivesArr0, center2, holeWidth/2, 0, Math.PI, dxfBasePoint)
	addLine(hole1, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
	addArc(hole1, dxfPrimitivesArr0, center1, holeWidth/2, Math.PI, Math.PI*2, dxfBasePoint)
	shape.holes.push(hole1);

/*второе отверстие*/
	var hole2 = new THREE.Path();
	var center1 = {x:80, y:19};
	var center2 = newPoint_xy(center1, 0, 10);
	var p1 = newPoint_xy(center1, holeWidth/2, 0);
	var p2 = newPoint_xy(center2, holeWidth/2, 0);
	var p3 = newPoint_xy(center2, -holeWidth/2, 0);
	var p4 = newPoint_xy(center1, -holeWidth/2, 0);
	addLine(hole2, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
	addArc(hole2, dxfPrimitivesArr0, center2, holeWidth/2, 0, Math.PI, dxfBasePoint)
	addLine(hole2, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
	addArc(hole2, dxfPrimitivesArr0, center1, holeWidth/2, Math.PI, Math.PI*2, dxfBasePoint)
	shape.holes.push(hole2);

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
		angleSupport2.position.y = partParams.metalThickness*2;
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
		angleSupport3.position.z = partParams.metalThickness*2;

		angleSupport3.rotation.x = Math.PI/2;
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

		return complexObject1
}


/*функция отрисовки регулируемой опоры*/
function drawAdjustableLeg(){
dxfBasePoint = {x:0, y:0}
var leg = new THREE.Object3D();
var metalMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});

	var angle = drawAngleSupport("У5-60х60х100");
	angle.position.x = 0;
	angle.position.y = 0;
	angle.position.z = 0;
	angle.castShadow = true;
	//if(side == "left") angle.rotation.y = Math.PI;
	leg.add(angle);

	//нижний фланец
	var dxfBasePoint = { "x": 1000.0, "y": 2000.0 };
	var flanParams = {};
	flanParams.width = 100.0;
	flanParams.height = 100.0;
	flanParams.holeDiam = 7;
	flanParams.holeDiam5 = 20.0;
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
	flanParams.dxfPrimitivesArr = dxfPrimitivesArr;

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
	var flan = new THREE.Mesh(geometry, metalMaterial);

	//задаем позицию фланца
	flan.position.x = 0//angle.position.x + (flanParams.width - 100) / 2;
	flan.position.y = - 40
	flan.position.z = flanParams.width - 13//angle.position.z -40 + flanParams.height / 2;
	flan.rotation.x = Math.PI * 1.5;
	flan.castShadow = true;
	//добавлЯем фланец в сцену
	leg.add(flan);



	var geometry = new THREE.CylinderGeometry(10, 10, 100, 10, 1, false);
	var bolt = new THREE.Mesh(geometry, metalMaterial);
	bolt.position.x = flan.position.x + flanParams.width / 2;
	bolt.position.y = 100 / 2 - 40
	bolt.position.z =  (flan.position.z - flanParams.height / 2);
	bolt.rotation.x = 0.0;
	bolt.rotation.y = 0.0;
	bolt.rotation.z = 0.0;
	bolt.castShadow = true;
	leg.add(bolt);

	return leg;
}

/*функция отрисовки рамок ступеней*/

function drawTreadFrame(frameParams){

/*исходные данные
	frameParams.length - длина рамки
	frameParams.width - ширина рамки
	frameParams.profile - профиль перемычек: 40x40 или 60x30 (буква x английская)
	frameParams.brigeAmt - кол-во горизонтальных фланцев
	frameParams.material - материал
	frameParams.dxfArr - массив dxf куда добавлять контура
	frameParams.dxfBasePoint - базовая точка для вставки контуров фланцев
*/

	if(!frameParams.dxfArr) frameParams.dxfArr = dxfPrimitivesArr;

	var frame = new THREE.Object3D();

	var profileWidth = 20;
	var profileHeight = 40;
	if(frameParams.profile == "60x30"){
		profileWidth = 30;
		profileHeight = 60;
	}
	var geometry = new THREE.BoxGeometry(profileWidth, profileHeight, frameParams.length);

	/*передний профиль*/
	var frontProfile = new THREE.Mesh(geometry, frameParams.material);
	frontProfile.position.x = profileWidth/2;
	frontProfile.position.y = -profileHeight/2;
	frontProfile.position.z = frameParams.length/2;
	frame.add(frontProfile);

	/*задний профиль*/
	var frontProfile = new THREE.Mesh(geometry, frameParams.material);
	frontProfile.position.x = frameParams.width - profileWidth/2;
	frontProfile.position.y = -profileHeight/2;
	frontProfile.position.z = frameParams.length/2;
	frame.add(frontProfile);

	/*боковой фланец*/
	var flanLength = frameParams.width - 2 * profileWidth
	var flanWidth = 40;
	var holeOffset = 25;
	var sideFlanThickness = 8;
	var holeDiam = 13;


	var sideFlanShape = drawFrameFlan(flanLength, flanWidth, holeOffset, holeDiam, frameParams.dxfBasePoint, frameParams.dxfArr);

	var flanExtrudeOptions = {
		amount: sideFlanThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(sideFlanShape, flanExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var sideFlan1 = new THREE.Mesh(geom, frameParams.material);
	var sideFlan2 = new THREE.Mesh(geom, frameParams.material);

	sideFlan1.position.x = flanLength + profileWidth;
	sideFlan1.position.y = -flanWidth;
	sideFlan1.position.z = 0;//frameParams.length/2+100;

	sideFlan1.rotation.z = toRadians(90);

	sideFlan2.position.x = flanLength + profileWidth;
	sideFlan2.position.y = -flanWidth;
	sideFlan2.position.z = frameParams.length - sideFlanThickness;

	sideFlan2.rotation.z = toRadians(90);

	frame.add(sideFlan1,sideFlan2);

	/*верхние перемычки*/
	var flanLength = frameParams.width - 2 * profileWidth
	var flanWidth = 25;
	var holeOffset = 30;
	var topFlanThickness = 4;
	var holeDiam = 8;
	var holeCenter = {};
	frameParams.holeCenters = [];
	var topFlanIndex = 0;
	var hole1X = profileWidth + holeOffset;
	var hole2X = frameParams.width - profileWidth - holeOffset;

	var flanExtrudeOptions = {
		amount: topFlanThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};



		var topFlanDxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 100, 0)
		var topFlanShape = drawFrameFlan(flanLength, flanWidth, holeOffset, holeDiam, topFlanDxfBasePoint, frameParams.dxfArr);
		var geom = new THREE.ExtrudeGeometry(topFlanShape, flanExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

		if(frameParams.brigeAmt > 1){
		var bridgeSideOffset = 25;
		var topFlan1 = new THREE.Mesh(geom, frameParams.material);
			topFlan1.position.x = flanLength + profileWidth;
			topFlan1.position.y = 0;
			topFlan1.position.z = bridgeSideOffset + sideFlanThickness;
			topFlan1.rotation.x = toRadians(90);
			topFlan1.rotation.z = toRadians(90);
			frame.add(topFlan1);

			//координаты центра первого отверстия
			frameParams.holeCenters[topFlanIndex] = {};
			frameParams.holeCenters[topFlanIndex].x = hole1X;
			frameParams.holeCenters[topFlanIndex].y = topFlan1.position.z + flanWidth/2;
			topFlanIndex += 1;

			//координаты центра второго отверстия
			frameParams.holeCenters[topFlanIndex] = {};
			frameParams.holeCenters[topFlanIndex].x = hole2X;
			frameParams.holeCenters[topFlanIndex].y = topFlan1.position.z + flanWidth/2;
			topFlanIndex += 1;


		var topFlan3 = new THREE.Mesh(geom, frameParams.material);
			topFlan3.position.x = flanLength + profileWidth;
			topFlan3.position.y = 0;
			topFlan3.position.z = frameParams.length - bridgeSideOffset - sideFlanThickness - flanWidth;
			topFlan3.rotation.x = toRadians(90);
			topFlan3.rotation.z = toRadians(90)
			frame.add(topFlan3);

			//координаты центра первого отверстия
			frameParams.holeCenters[topFlanIndex] = {};
			frameParams.holeCenters[topFlanIndex].x = hole1X;
			frameParams.holeCenters[topFlanIndex].y = topFlan3.position.z + flanWidth/2;
			topFlanIndex += 1;

			//координаты центра второго отверстия
			frameParams.holeCenters[topFlanIndex] = {};
			frameParams.holeCenters[topFlanIndex].x = hole2X;
			frameParams.holeCenters[topFlanIndex].y = topFlan3.position.z + flanWidth/2;
			topFlanIndex += 1;

		if(frameParams.brigeAmt > 2){
			var delta = (topFlan3.position.z - topFlan1.position.z)/(frameParams.brigeAmt-1);
			for (var i = 1; i < frameParams.brigeAmt; i++) {
				var topFlan2 = new THREE.Mesh(geom, frameParams.material);
				topFlan2.position.x = flanLength + profileWidth;
				topFlan2.position.y = 0;
				topFlan2.position.z = topFlan1.position.z + delta*(i-1);
				topFlan2.rotation.x = toRadians(90);
				topFlan2.rotation.z = toRadians(90);
				if(i!=1) {
					frame.add(topFlan2);
					//координаты центра первого отверстия
					frameParams.holeCenters[topFlanIndex] = {};
					frameParams.holeCenters[topFlanIndex].x = hole1X;
					frameParams.holeCenters[topFlanIndex].y = topFlan2.position.z + flanWidth/2;
					topFlanIndex += 1;

					//координаты центра второго отверстия
					frameParams.holeCenters[topFlanIndex] = {};
					frameParams.holeCenters[topFlanIndex].x = hole2X;
					frameParams.holeCenters[topFlanIndex].y = topFlan2.position.z + flanWidth/2;
					topFlanIndex += 1;
					}
				}//end of for
			}
		}

	if(frameParams.brigeAmt == 1){
		var topFlan1 = new THREE.Mesh(geom, frameParams.material);
			topFlan1.position.x = flanLength + profileWidth;
			topFlan1.position.y = 0;
			topFlan1.position.z = frameParams.length/2 - flanWidth/2;
			topFlan1.rotation.x = toRadians(90);
			topFlan1.rotation.z = toRadians(90);
			frame.add(topFlan1);

			//координаты центра первого отверстия
			frameParams.holeCenters[topFlanIndex] = {};
			frameParams.holeCenters[topFlanIndex].x = hole1X;
			frameParams.holeCenters[topFlanIndex].y = topFlan1.position.z + flanWidth/2;
			topFlanIndex += 1;

			//координаты центра второго отверстия
			frameParams.holeCenters[topFlanIndex] = {};
			frameParams.holeCenters[topFlanIndex].x = hole2X;
			frameParams.holeCenters[topFlanIndex].y = topFlan1.position.z + flanWidth/2;
			topFlanIndex += 1;
		}


/*отрисовка фланца для рамки ступени*/

function drawFrameFlan(flanLength, flanWidth, holeOffset, holeDiam, dxfBasePoint, dxfArr) {

	var flanParams = { //объявление параметров фланца
		width:flanWidth,
		height:flanLength,
		holeDiam:holeDiam,
		angleRadUp:0,
		angleRadDn:0,
		hole1X:flanWidth/2,
		hole1Y:holeOffset,
		hole2X:flanWidth/2,
		hole2Y:holeOffset,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfArr,
	};

	var shape = drawRectFlan(flanParams).shape;

	return shape;
	}


	return frame;


}

/*общая функция отрисовки квадратного фланца с отверстиями*/

function drawRectFlan(flanParams){

	/*исходные данные:
	чертеж фланца здесь: 6692035.ru/drawings/carcasPartsLib/flans/scheme_RectFlan.pdf
	flanParams.width - ширина фланца
	flanParams.height - длина фланца (высота при вертикальном расположении)
	flanParams.holeDiam - диаметр отверстий с 1 по 4
	flanParams.holeDiam5 - диаметр пятого (условно центрального) отверстия
	flanParams.angleRadUp - радиус скругления верхних углов фланца
	flanParams.angleRadDn - радиус скругления нижних углов фланца
	flanParams.hole1X - координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole1Y - координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole2X - координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole2Y - координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole3X - координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole3Y - координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole4X - координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole4Y - координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
	flanParams.hole5X - координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца - левый нижний угол)
	flanParams.hole5Y - координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца - левый нижний угол)
	flanParams.dxfBasePoint - базовая точка для вставки контуров в dxf файл
	flanParams.dxfPrimitivesArr - массив для вставки контуров в dxf файл

	!!! Для отрисовки отверстия необходимо наличие всех трех параметров (позиции по х,у и диаметра).
	!!! Нумерация отверстий идет по часовой стрелке, начиная с левого нижнего.
	*/
	var dxfBasePoint = flanParams.dxfBasePoint;
	var dxfPrimitivesArr = flanParams.dxfPrimitivesArr;
	var shape = new THREE.Shape();
	var p1 = {x:0,y:0}
	var centerPoint = {x:0, y:0};
	var p2 = copyPoint(p1);

	//прорисовка левого нижнего угла скругления
	if(flanParams.angleRadDn > 0){
	var startAngle = Math.PI*3/2;
	var endAngle = Math.PI;
	centerPoint.x = flanParams.angleRadDn; //назначение центра скругления
	centerPoint.y = flanParams.angleRadDn;
	addArc(shape, dxfPrimitivesArr, centerPoint, flanParams.angleRadDn, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка левого участка
	p1.x = 0;
	p1.y = flanParams.angleRadDn;
	p2 = newPoint_xy(p1, 0, flanParams.height-flanParams.angleRadDn-flanParams.angleRadUp); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	//console.log(p1,p2);
	//прорисовка левого верхнего угла скругления
	if(flanParams.angleRadUp > 0){
	startAngle = Math.PI;
	endAngle = Math.PI/2;
	centerPoint.x = flanParams.angleRadUp; //назначение центра скругления
	centerPoint.y = flanParams.height - flanParams.angleRadUp;
	addArc(shape, dxfPrimitivesArr, centerPoint, flanParams.angleRadUp, startAngle, endAngle, dxfBasePoint);
	//console.log(startAngle,endAngle);
	}

	//прорисовка верхнего участка
	p1.x = flanParams.angleRadUp;
	p1.y = flanParams.height;
	p2 = newPoint_xy(p1, flanParams.width-flanParams.angleRadUp*2, 0); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

	//прорисовка правого верхнего угла скругления
	if(flanParams.angleRadUp > 0){
	startAngle = Math.PI/2;
	endAngle = 0;
	centerPoint.x = flanParams.width - flanParams.angleRadUp; //назначение центра скругления
	centerPoint.y = flanParams.height - flanParams.angleRadUp;
	addArc(shape, dxfPrimitivesArr, centerPoint, flanParams.angleRadUp, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка левого участка
	p1.x = flanParams.width;
	p1.y = flanParams.height - flanParams.angleRadUp;
	p2 = newPoint_xy(p1, 0, -flanParams.height + flanParams.angleRadUp + flanParams.angleRadDn); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

	//прорисовка правого нижнего угла скругления
	if(flanParams.angleRadDn > 0){
	startAngle = Math.PI*2;
	endAngle = Math.PI*3/2;
	centerPoint.x = flanParams.width - flanParams.angleRadDn;
	centerPoint.y = flanParams.angleRadDn;
	addArc(shape, dxfPrimitivesArr, centerPoint, flanParams.angleRadDn, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка нижнего участка
	p1.x = flanParams.width - flanParams.angleRadDn;
	p1.y = 0;
	p2 = newPoint_xy(p1, -flanParams.width + flanParams.angleRadDn*2, 0);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);


	/*Прорисовка отверстий*/
	var hole0Pos={x:0,y:0}

	/*отверстие № 1*/
	if(flanParams.hole1X && flanParams.hole1Y && flanParams.holeDiam){
    var hole1 = new THREE.Path();
	var hole1Pos = copyPoint(hole0Pos);
	hole1Pos.x = hole1Pos.x + flanParams.hole1X;
	hole1Pos.y = hole1Pos.y + flanParams.hole1Y;
	addCircle(hole1, dxfPrimitivesArr, hole1Pos, flanParams.holeDiam/2, dxfBasePoint)
	shape.holes.push(hole1);
	}

	/*отверстие № 2*/
	if(flanParams.hole2X && flanParams.hole2Y && flanParams.holeDiam){
	var hole2 = new THREE.Path();
	var hole2Pos = copyPoint(hole0Pos);
	hole2Pos.x = hole2Pos.x + flanParams.hole2X;
	hole2Pos.y = hole2Pos.y + flanParams.height - flanParams.hole2Y;
	addCircle(hole2, dxfPrimitivesArr, hole2Pos, flanParams.holeDiam/2, dxfBasePoint)
	shape.holes.push(hole2);
	}

	/*отверстие № 3*/
	if(flanParams.hole3X && flanParams.hole3Y && flanParams.holeDiam){
	var hole3 = new THREE.Path();
	var hole3Pos = copyPoint(hole0Pos);
	hole3Pos.x = hole0Pos.x + flanParams.width - flanParams.hole3X;
	hole3Pos.y = hole0Pos.y + flanParams.height - flanParams.hole3Y;
	addCircle(hole3, dxfPrimitivesArr, hole3Pos, flanParams.holeDiam/2, dxfBasePoint)
	shape.holes.push(hole3);
	}

	/*отверстие № 4*/
	if(flanParams.hole4X && flanParams.hole4Y && flanParams.holeDiam){
	var hole4 = new THREE.Path();
	var hole4Pos = copyPoint(hole0Pos);
	hole4Pos.x = hole0Pos.x + flanParams.width - flanParams.hole4X;
	hole4Pos.y = hole0Pos.y + flanParams.hole4Y;
	addCircle(hole4, dxfPrimitivesArr, hole4Pos, flanParams.holeDiam/2, dxfBasePoint)
	shape.holes.push(hole4);
	}

	/*отверстие № 5*/
	if(flanParams.hole5X && flanParams.hole5Y && flanParams.holeDiam5){
	var hole5 = new THREE.Path();
	var hole5Pos = copyPoint(hole0Pos);
	hole5Pos.x = hole5Pos.x + flanParams.hole5X ;
	hole5Pos.y = hole5Pos.y + flanParams.hole5Y ;
	addCircle(hole5, dxfPrimitivesArr, hole5Pos, flanParams.holeDiam5/2, dxfBasePoint)
	shape.holes.push(hole5);
	}
	flanParams.shape=shape;

	return flanParams;
}


function drawTurnTreadShape1(par) {

/*функция отрисовки контура первой и третьей забежной ступени
	Чертеж с обозначением параметров здесь: 6692035.ru/drawings/turnTreads/turnTreads.pdf
	Исходные данные:
		treadWidth
		innerOffset
		outerOffset
		edgeAngle
		stepWidthLow
		turnFactor
		dxfBasePoint
	На выходе те же данные плюс следующие:
		shape - контур ступени
		stepWidthHi
	*/
	var dxfBasePoint = par.dxfBasePoint;
	var shape = new THREE.Shape();


	par.stepWidthHi =  par.stepWidthLow + (par.treadWidth - par.innerOffset - par.outerOffset) * Math.tan(par.edgeAngle);
	var turn = par.turnFactor;

	var pp = [];
	pp[0] = {x: 0, y: 0};
	var extend = par.extendTopTurnTread === undefined ? 0.0 : par.extendTopTurnTread;
	newPointP_xy_last(pp, par.treadWidth * turn, 0); // params points, deltaX, deltaY
	newPointP_xy_last(pp, 0, par.stepWidthLow + extend);
	newPointP_xy_last(pp, -par.innerOffset * turn, 0);
	newPointP_xy(pp, pp[0], par.outerOffset * turn, par.stepWidthHi + extend);
	newPointP_xy_last(pp, -par.outerOffset * turn, 0);
	pp.push(pp[0]);

	addPath(shape, dxfPrimitivesArr, pp, dxfBasePoint);
	par.shape = shape;
	return par;
} //end of drawTurnTreadShape1


function drawTurnTreadShape2(par, dxfBasePoint) {

/*функция отрисовывает шейп второй (угловой) забежной ступени
Исходные данные:
Чертеж с обозначением параметров здесь: 6692035.ru/drawings/turnTreads/turnTreads.pdf
treadWidthX
treadWidthY
angleX
angleY
outerOffsetX
outerOffsetY
innerOffsetX
innerOffsetY
notchDepthX
notchDepthY
turnFactor
dxfBasePoint
На выходе те же параметры плюс следующие:
	shape - контур ступени
	stepWidthX
	stepWidthY
	stepOffsetX
	stepOffsetY
*/


	var dxfBasePoint = par.dxfBasePoint;

	var shape = new THREE.Shape();


	par.stepOffsetY = Math.tan(par.angleX) * (par.treadWidthX - par.innerOffsetX - par.outerOffsetX);
	par.stepOffsetX = Math.tan(par.angleY) * (par.treadWidthY - par.innerOffsetY - par.outerOffsetY);
	par.stepWidthX = par.treadWidthX - par.stepOffsetX;
	par.stepWidthY = par.treadWidthY - par.stepOffsetY;

	var turn = par.turnFactor;

	var pp = [];
	pp[0] = {x: 0, y: 0};
	newPointP_xy_last(pp, par.outerOffsetX * turn, 0); // params points, deltaX, deltaY
	newPointP_xy_last(pp, (par.treadWidthX - par.outerOffsetX - par.innerOffsetX) * turn, -par.stepOffsetY);
	newPointP_xy_last(pp, (par.innerOffsetX - par.notchDepthX) * turn, 0);
	newPointP_xy_last(pp, 0, par.notchDepthY);
	newPointP_xy_last(pp, par.notchDepthX * turn, 0);
	newPointP_xy_last(pp, 0, par.innerOffsetY - par.notchDepthY);
	newPointP_xy(pp, pp[0], par.stepWidthX * turn, par.stepWidthY - par.outerOffsetY);
	newPointP_xy_last(pp, 0, par.outerOffsetY);
	newPointP_xy_last(pp, -par.stepWidthX * turn, 0);
	pp.push(pp[0]);

	addPath(shape, dxfPrimitivesArr, pp, dxfBasePoint);
	par.shape = shape;
	
	//сохраняем размеры для спецификации
	par.sizeA = distance(pp[3], pp[9]);
	par.sizeB = distance(pp[0], pp[8]);
	
	return par;
}


function drawTurnSteps(turnParams){

/*функция отрисовывает блок забежных ступеней для лестниц ЛТ, КО, модульные, монокосоур

Исходные данные:
	model: params.model, - модель лестницы: лт или ко
	stairModel: params.stairModel, - поврот лестницы
	marshDist: params.marshDist, - зазор между маршами в плане. Для Г-образной не обязательный параметр
	M: params.M, - внешняя ширина маршей
	h: params.h, - подъем ступени
	turnFactor: turnFactor, - к-т направления поворота: 1 или -1
	dxfBasePoint: dxfBasePoint, - базовая точка вставки контуров ступеней
	extendTopTurnTread: extendTopTurnTread, - продление верхней забежной ступени для попадания в проём

Возвращаемое значение:
объект  turnSteps = {
	meshes: treads; - мэши ступеней в виде единого 3D объекта
	params: treadParams; - массив параметров каждой ступени

*/
var model = turnParams.model;
var turnFactor = turnParams.turnFactor;
var dxfBasePoint = turnParams.dxfBasePoint;
var treadThickness = turnParams.treadThickness;
var	stringerThickness = turnParams.stringerThickness;
var	treadSideOffset = turnParams.treadSideOffset;
var	material = turnParams.material;
var treadParams = [];
var treads = new THREE.Object3D();

var extrudeOptions = {
		amount: treadThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

/*забежная ступень 1*/


	//задаем параметры ступени
if(model=="лт"){
	treadParams[1] = {
		treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI/6,
		stepWidthLow: 100,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
		};
	}
if(model=="лт стекло"){
	treadParams[1] = {
		treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: 20.0215 * Math.PI / 180,
		stepWidthLow: 158.837,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
		};
	}
if(model=="ко"){
	treadParams[1] = {
		treadWidth: turnParams.M,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI/6,
		stepWidthLow: 55,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
		};
	}

if(model=="module"){
	treadParams[1] = {
		treadWidth: turnParams.M,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI/6,
		stepWidthLow: 75,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
		};
	}
	
if(model=="mono"){
	treadParams[1] = {
		treadWidth: turnParams.M,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI/6,
		stepWidthLow: 50,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
		};
	}

	treadParams[1] = drawTurnTreadShape1(treadParams[1]); //функция в файле drawCarcasPartsLib.js
	var shape = treadParams[1].shape;
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var tread1 = new THREE.Mesh(geometry, material);
		tread1.position.x = -treadParams[1].treadWidth * treadParams[1].turnFactor;
		tread1.rotation.x = -Math.PI/2;
		tread1.position.y = 0;
		tread1.position.z = 0;
	treads.add(tread1);

/*забежная ступень 2*/
	dxfBasePoint = newPoint_xy(dxfBasePoint, 2000,0)

	//задаем параметры ступени
if(model=="лт"){
	treadParams[2] = {
		treadWidthX: turnParams.M - stringerThickness + 100 - treadSideOffset + 5,
		treadWidthY: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		angleX: 30 * Math.PI / 180,
		angleY: 32.9237 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 100,
		innerOffsetY: 50,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}
if(model=="лт стекло"){
	treadParams[2] = {
		treadWidthX: turnParams.M - stringerThickness - treadSideOffset + 60.1705 - 18.7741,
		treadWidthY: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		angleX: 22.6552 * Math.PI / 180,
		angleY: 34.4866 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 60.1705,
		innerOffsetY: 0,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}
if(model=="ко"){
	treadParams[2] = {
		treadWidthX: turnParams.M - 25 + 90,
		treadWidthY: turnParams.M,
		angleX: 30 * Math.PI / 180,
		angleY: 30 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 90,
		innerOffsetY: 0,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}

if(model=="module"){
	treadParams[2] = {
		treadWidthX: turnParams.M,
		treadWidthY: turnParams.M,
		angleX: 30 * Math.PI / 180,
		angleY: 30 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 55,
		innerOffsetY: 55,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}

if(model=="mono"){
	treadParams[2] = {
		treadWidthX: turnParams.M,
		treadWidthY: turnParams.M + 45,
		angleX: 30 * Math.PI / 180,
		angleY: 30 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 10,
		innerOffsetY: 130,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}
	//отрисовываем ступень

	treadParams[2] = drawTurnTreadShape2(treadParams[2]); //функция в файле drawCarcasPartsLib.js
	var shape3 = treadParams[2].shape;
	var geometry3 = new THREE.ExtrudeGeometry(shape3, extrudeOptions);
	geometry3.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var tread2 = new THREE.Mesh(geometry3, material);
		tread2.position.x = -treadParams[2].treadWidthX * treadParams[2].turnFactor;
		tread2.rotation.x = -Math.PI/2;
		tread2.position.y = turnParams.h;
		tread2.position.z = -treadParams[2].stepOffsetY;

	//корректируем положение ступени с учетом модели
	if(model=="лт"){
		tread2.position.x = tread2.position.x + (treadParams[2].innerOffsetX + treadSideOffset + 5 + stringerThickness) * treadParams[2].turnFactor;
		tread2.position.z = tread2.position.z - (stringerThickness + treadSideOffset + 31);
		}
	if(model=="лт стекло"){
		tread2.position.x = tread2.position.x + (treadParams[2].treadWidthX - treadParams[1].treadWidth) * treadParams[2].turnFactor;
		tread2.position.z = tread2.position.z - (stringerThickness + treadSideOffset + 70);
		}
	if(model=="ко"){
		tread2.position.x = tread2.position.x + (treadParams[2].innerOffsetX - 25) * treadParams[2].turnFactor;
		tread2.position.z = tread2.position.z - 25;
		}
	if(model=="module"){
		tread2.position.x += 0;
		tread2.position.z += 0;
		}
	if(model=="mono"){
		tread2.position.x += 0;
		tread2.position.z += 0;
		}
	treads.add(tread2);

	//console.log(tread2.position.x, treadParams[2].treadWidthX)

/*забежная ступень 3*/
dxfBasePoint = newPoint_xy(dxfBasePoint, 3000, 0);

	//задаем параметры ступени
	if(model=="лт"){
		treadParams[3] = {
			treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: Math.PI/6,
			stepWidthLow: turnParams.stepWidthLow,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
			};
		if(turnParams.stairModel == "П-образная с забегом" && turnParams.marshDist > 100)
			treadParams[3].stepWidthLow = turnParams.marshDist;
		}
	if(model=="лт стекло"){
		treadParams[3] = {
			treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: 34.4866 * Math.PI / 180,
			stepWidthLow: turnParams.stepWidthLow,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
			};
		if (turnParams.stairModel == "П-образная с забегом") {
			if (turnParams.marshDist - 45 < treadParams[3].stepWidthLow) {
				treadParams[3].stepWidthLow = treadParams[3].stepWidthLow;
				}
			else {
				treadParams[3].stepWidthLow = turnParams.marshDist - 45;
				}
		}
	}

	if(model=="ко"){
		treadParams[3] = {
			treadWidth: turnParams.M,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: Math.PI/6,
			stepWidthLow: 55,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
			extendTopTurnTread: turnParams.extendTopTurnTread,
		};
	if(turnParams.stairModel == "П-образная с забегом")
		treadParams[3].stepWidthLow = turnParams.marshDist - 12;

	}
	
	if(model=="module"){
		treadParams[3] = {
			treadWidth: turnParams.M,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: Math.PI/6,
			stepWidthLow: 75,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
			};
		}//end of module
		
	if(model=="mono"){
		treadParams[3] = {
			treadWidth: turnParams.M,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: Math.PI/6,
			stepWidthLow: 50,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
			};
		if(turnParams.stairModel == "Г-образная с забегом")
			treadParams[3].stepWidthLow = turnParams.stepWidthLow;
		if(turnParams.stairModel == "П-образная с забегом")
			treadParams[3].stepWidthLow = turnParams.marshDist + 10;
		if (turnParams.stairModel == "П-образная трехмаршевая" && turnParams.marshDist !== 0)
			treadParams[3].stepWidthLow = turnParams.marshDist;
	}//end of module


	treadParams[3] = drawTurnTreadShape1(treadParams[3]); //функция в файле drawCarcasPartsLib.js
	var shape = treadParams[3].shape;
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var tread3 = new THREE.Mesh(geometry, material);
		tread3.position.x = 0
		tread3.rotation.x = -Math.PI/2;
		tread3.rotation.z = - Math.PI/2 * treadParams[3].turnFactor;
		tread3.position.y = turnParams.h * 2;
		tread3.position.z = - treadParams[3].treadWidth;
	//корректируем положение ступени с учетом модели
	if(model=="лт"){
		tread3.position.x = tread3.position.x - (treadParams[3].stepWidthLow + 5 + treadSideOffset + stringerThickness) * treadParams[3].turnFactor;
		tread3.position.z = tread3.position.z - (stringerThickness + treadSideOffset + 31);
		}
	if(model=="лт стекло"){
		//tread3.position.x = tread3.position.x - (treadParams[3].stepWidthLow + 18) * treadParams[3].turnFactor;
		tread3.position.x = tread3.position.x + tread2.position.x - (treadParams[2].treadWidthX + treadParams[3].stepWidthLow - 30/Math.cos(treadParams[3].edgeAngle)) * treadParams[3].turnFactor;			// 30 - выступание переднего края 3 ступени над задним краем 2 ступени
		tread3.position.z = tread3.position.z - (stringerThickness + treadSideOffset + 70);
		}
	if(model=="ко"){
	tread3.position.x = tread3.position.x - 
		(treadParams[3].stepWidthLow + 17 + turnParams.extendTopTurnTread) * treadParams[3].turnFactor;

		tread3.position.z = tread3.position.z - 25;
		}
		
	if(model=="module"){
		tread3.position.x += 0;
		tread3.position.z += 0;
		}
		
	if(model=="mono"){
		tread3.position.x += (treadParams[3].stepWidthLow - 5) * turnFactor;
		tread3.position.z += -45;
		}

	treads.add(tread3);


if(turnParams.stairModel == "П-образная с забегом"){

/*забежная ступень 4*/
    dxfBasePoint = newPoint_xy(turnParams.dxfBasePoint, 0, -2000)

	//задаем параметры ступени
if(model=="лт"){
	treadParams[4] = {
		treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI/6,
		stepWidthLow: 100,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}
if(model=="лт стекло"){
	treadParams[4] = {
		treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: toRadians(20.0215),
		stepWidthLow: 158.837,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}
if(model=="ко"){
	treadParams[4] = {
		treadWidth: turnParams.M,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI/6,
		stepWidthLow: 55,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}

if(model=="mono"){
    treadParams[4] = treadParams[1];
    treadParams[4].dxfBasePoint = dxfBasePoint;
	}

	treadParams[4] = drawTurnTreadShape1(treadParams[4]); //функция в файле drawCarcasPartsLib.js
	var shape = treadParams[4].shape;
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var tread4 = new THREE.Mesh(geometry, material);
		tread4.rotation.x = -Math.PI/2;
		tread4.rotation.z = -Math.PI/2 * treadParams[4].turnFactor;
		tread4.position.x = 0;
		tread4.position.y = turnParams.h * 3;
		tread4.position.z = -treadParams[4].treadWidth;
	//корректируем положение ступени с учетом модели
	if(model=="лт"){
		tread4.position.x = tread4.position.x + (turnParams.marshDist + stringerThickness + treadSideOffset - 31) * treadParams[4].turnFactor;
		tread4.position.z = tread4.position.z - (stringerThickness + treadSideOffset + 31);
		}
	if(model=="лт стекло"){
		//if (turnParams.marshDist < 70) {
		if (turnParams.marshDist - 45 < treadParams[3].stepWidthLow) {
			//tread4.position.x = tread4.position.x + tread3.position.x - (70 - turnParams.marshDist) * treadParams[4].turnFactor - 30 * treadParams[4].turnFactor;
			tread4.position.x = tread4.position.x + tread3.position.x - (treadParams[3].stepWidthLow - (turnParams.marshDist - 45)) * treadParams[4].turnFactor - 30 * treadParams[4].turnFactor;
		}
		else {
			tread4.position.x = tread4.position.x + tread3.position.x - 30 * treadParams[4].turnFactor;
		}
		tread4.position.z = tread4.position.z - (stringerThickness + treadSideOffset + 70);
	}
	if(model=="ко"){
		tread4.position.x = tread4.position.x + (turnParams.marshDist - 25) * treadParams[4].turnFactor;
		tread4.position.z = tread4.position.z - 25;
		}
	if(model=="mono"){
		tread4.position.x += (turnParams.marshDist - 45) * turnFactor;
		tread4.position.z += -45;
		}
	treads.add(tread4);


/*забежная ступень 5*/
dxfBasePoint = newPoint_xy(dxfBasePoint, 2000,0);
if(model=="лт"){
	treadParams[5] = {
		treadWidthX: turnParams.M - stringerThickness + 100 - treadSideOffset + 5,
		treadWidthY: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		angleX: 30 * Math.PI / 180,
		angleY: 32.9237 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 100,
		innerOffsetY: 50,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}

if(model=="лт стекло"){
	treadParams[5] = {
		treadWidthX: turnParams.M - stringerThickness - treadSideOffset + 60.1705 - 18.7741,
		treadWidthY: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
		angleX: 22.6552 * Math.PI / 180,
		angleY: 34.4866 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 60.1705,
		innerOffsetY: 0,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}
if(model=="ко"){
	treadParams[5] = {
		treadWidthX: turnParams.M - 25 + 90,
		treadWidthY: turnParams.M,
		angleX: 30 * Math.PI / 180,
		angleY: 30 * Math.PI / 180,
		outerOffsetX: 0,
		outerOffsetY: 0,
		innerOffsetX: 90,
		innerOffsetY: 0,
		notchDepthX: 0,
		notchDepthY: 0,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint,
	};
}

if(model=="mono"){
    treadParams[5] = treadParams[2];
    treadParams[5].dxfBasePoint = dxfBasePoint;
	}

	treadParams[5] = drawTurnTreadShape2(treadParams[5]); //функция в файле drawCarcasPartsLib.js
	var shape3 = treadParams[5].shape;
	var geometry3 = new THREE.ExtrudeGeometry(shape3, extrudeOptions);
	geometry3.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var tread5 = new THREE.Mesh(geometry3, material);
		tread5.rotation.x = -Math.PI/2;
		tread5.rotation.z = -Math.PI/2 * treadParams[5].turnFactor;
		tread5.position.x = treadParams[5].stepOffsetY * treadParams[5].turnFactor;
		tread5.position.y = turnParams.h*4;
		tread5.position.z = -treadParams[5].treadWidthX;

	//корректируем положение ступени с учетом модели
	if(model=="лт"){
		tread5.position.x = tread5.position.x + (turnParams.marshDist + stringerThickness *2 + treadSideOffset * 2) * treadParams[5].turnFactor;
		tread5.position.z = tread5.position.z + treadParams[5].innerOffsetX  + 5 - 31;
		}
	if(model=="лт стекло"){
		tread5.position.x = tread5.position.x + tread4.position.x + (stringerThickness + treadSideOffset + 70) * treadParams[5].turnFactor;
		tread5.position.z = tread5.position.z + treadParams[5].treadWidthX + tread4.position.z;
		}
	if(model=="ко"){
		tread5.position.x = tread5.position.x + turnParams.marshDist * treadParams[5].turnFactor;
		tread5.position.z = tread5.position.z + 40;
		}
	if(model=="mono"){
		tread5.position.x += (turnParams.marshDist - 45) * turnFactor;
		tread5.position.z += -45;
		}
	treads.add(tread5);

/*забежная ступень 6*/

dxfBasePoint = newPoint_xy(dxfBasePoint, 3000,0)

	//задаем параметры ступени
	if(model=="лт"){
		treadParams[6] = {
			treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: Math.PI/6,
			stepWidthLow: turnParams.stepWidthLow,//100,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
		};

	}
	if(model=="лт стекло"){
		treadParams[6] = {
			treadWidth: turnParams.M - stringerThickness * 2 - treadSideOffset * 2,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: 34.4866 * Math.PI / 180,
			stepWidthLow: turnParams.stepWidthLow,//40.0713,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
		};
		/*if(turnParams.stairModel == "П-образная с забегом" && turnParams.marshDist > 100)
			treadParams3.stepWidthLow = turnParams.marshDist;*/
	}
	if(model=="ко"){
		treadParams[6] = {
			treadWidth: turnParams.M,
			innerOffset: 0,
			outerOffset: 0,
			edgeAngle: Math.PI/6,
			stepWidthLow: 55,
			turnFactor: -turnFactor,
			dxfBasePoint: dxfBasePoint,
		};

	}
	
	if(model=="mono"){
	    treadParams[6] = treadParams[3];
	    treadParams[6].stepWidthLow = 55;
	    treadParams[6].dxfBasePoint = dxfBasePoint;
	}

	treadParams[6] = drawTurnTreadShape1(treadParams[6]); //функция в файле drawCarcasPartsLib.js
	var shape = treadParams[6].shape;
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var tread6 = new THREE.Mesh(geometry, material);
		tread6.rotation.x = -Math.PI/2;
		tread6.position.x = -treadParams[6].treadWidth * treadParams[6].turnFactor
		tread6.position.y = turnParams.h * 5;
		tread6.position.z = 0;

	//корректируем положение ступени с учетом модели
	if(model=="лт"){
		tread6.position.x = tread6.position.x - (turnParams.marshDist + stringerThickness *2 + treadSideOffset * 2) * treadParams[6].turnFactor;
		tread6.position.z = tread6.position.z + treadParams[6].stepWidthLow + 5 - 31; //- (stringerThickness + treadSideOffset + 31) + (treadParams[6].stepWidthLow + 5);
		}
	if(model=="лт стекло"){
		tread6.position.x = tread6.position.x + tread4.position.x - (stringerThickness + treadSideOffset + 70) * treadParams[6].turnFactor;
		tread6.position.z = tread6.position.z + tread5.position.z + treadParams[5].treadWidthX + treadParams[6].stepWidthLow - 30/Math.cos(treadParams[6].edgeAngle);
		}
	if(model=="ко"){
		tread6.position.x = tread6.position.x - turnParams.marshDist * treadParams[6].turnFactor;
		tread6.position.z = tread6.position.z + 47;
		}
	if(model=="mono"){
		tread6.position.x += turnParams.marshDist * turnFactor;
		tread6.position.z += 0;
		}


	treads.add(tread6);
	}//end of stairModel == "П-образная с забегом"

/*добавляем к параметрам*/

	turnParams.meshes = treads;
	turnParams.params = treadParams;

	return turnParams;

} //end of drawTurnSteps


function drawProfile(profileParams){
/*параметры:
		width: profileWidth,
		height: profileHeight,
		angle1: angle1,
		angle2: angle2,
		backLength: backLength,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
		*/

var shape = new THREE.Shape();


	/*внешний контур*/

	var p1 =  {x:0,y:0}
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

function drawAngleSupportCentr(width, metalThickness){

	var shape = new THREE.Shape();
	var p1 = {x:0,y:0}
	var centerPoint = {x:0, y:0};
	var p2 = copyPoint(p1);
	var flanParams = { //объявление параметров уголка
			width:width,
			bendRad:metalThickness
	}

	//прорисовка внешнего угла скругления
	if(flanParams.bendRad > 0){
	var startAngle = Math.PI*3/2;
	var endAngle = Math.PI;

	var dxfBasePoint = {x:0, y:0}


	centerPoint.x = flanParams.bendRad*2; //назначение центра скругления
	centerPoint.y = flanParams.bendRad*2;
	addArc(shape, dxfPrimitivesArr0, centerPoint, flanParams.bendRad*2, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка верхнего участка
	p1.x = 0;
	p1.y = flanParams.bendRad*2;
	p2 = newPoint_xy(p1, metalThickness, 0); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr0, p1, p2, dxfBasePoint);

	//прорисовка внутреннего угла скругления
	if(flanParams.bendRad > 0){
	var startAngle = Math.PI;
	var endAngle = Math.PI*3/2;
	centerPoint.x = flanParams.bendRad*2; //назначение центра скругления
	centerPoint.y = flanParams.bendRad*2;
	addArc(shape, dxfPrimitivesArr0, centerPoint, flanParams.bendRad, startAngle, endAngle, dxfBasePoint);
	}

	//прорисовка нижнего участка
	p1.x = flanParams.bendRad*2;
	p1.y = flanParams.bendRad;
	p2 = newPoint_xy(p1, 0, -flanParams.bendRad); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr0, p1, p2, dxfBasePoint);

	return shape;
}

/*отрисовка шейпа боковины уголка*/

function drawAngleSupportSide(width, height, holeDist, hole2Y, holeDiam, metalThickness){

var dxfBasePoint = {x:0, y:0}
	var flanParams = { //объявление параметров уголка
			width:width,
			height:height,
			holeDiam:holeDiam,
			holeDist:holeDist,
			angleRadUp:10,
			angleRadDn:0,
			metalThickness:metalThickness,
			hole2X:0,
			hole2Y:hole2Y,
			hole3X:0,
			hole3Y:hole2Y,
			dxfBasePoint: dxfBasePoint,
			dxfPrimitivesArr: dxfPrimitivesArr0

		}

		flanParams.height = flanParams.height - flanParams.metalThickness*2;
		if(holeDist==0){
			flanParams.hole2X = flanParams.width/2;
		}
		else {
			flanParams.hole2X = (flanParams.width - flanParams.holeDist)/2;
			flanParams.hole3X = flanParams.hole2X;

		}
	var shape = drawRectFlan(flanParams).shape;

	return shape;
}


//функция создания уголков забежных ступеней ЛТ. Возвращает группу мэшей
function drawTurnAnglesLt(turnParams, turnSteps) {

	/*Исходные параметры
	turnParams - массив с параметрами лестницы (ширина марша, высота, и т.п.)

	Выходные данные 3D объект*/
 	var angle = new THREE.Object3D();
	var angleWidth = 40, angleLength, angleModel, angleModelWnd, angleLengthWnd;
	var turnFactor = turnParams.turnFactor;
	var marshDist = turnParams.marshDist;
	var angleParams = {};
	angleModelWnd = 'У2-40х40х90';
	stringerThickness = turnParams.stringerThickness;
	treadSideOffset = turnParams.treadSideOffset;
	angleLengthWnd = 90;
	var angleLnWdHf = angleLengthWnd / 2;

	//console.log(treadSideOffset)
	if(turnParams.M <= 700) {
		angleModel = 'У2-40х40х160';
		angleLength = 160;
	}
	else {
		angleModel = 'У2-40х40х200';
		angleLength = 200;
	}
	angleParams.angleModel = angleModel;
	angleParams.angleLength = angleLength;
	if(turnParams.stairModel === "П-образная с забегом") {
		angleParams.type = 'p';
	}
	else {
		angleParams.type = 'g';
	}

	//отрисовываем уголки для 1-ой забежной ступени
	var angle1_1 = drawAngleSupport(angleModel);
		angle1_1.position.x = -(turnSteps.params[1].treadWidth + treadSideOffset) * turnFactor;
		angle1_1.position.z = -turnSteps.params[1].stepWidthHi + 60;
		if(turnFactor == 1) angle1_1.position.z += angleLength;
		angle1_1.rotation.x = Math.PI/2;
		angle1_1.rotation.z = -Math.PI/2 * turnFactor;
		angle.add(angle1_1);
		angleParams.a1_1 = {
			x: turnSteps.params[1].stepWidthHi - 60, 
			y: 0,
			z: angle1_1.position.x
		};

		//console.log(angleParams.a1_1);
		
	//отрисовываем уголки для второй забежной ступени
	//левый внешний уголок
	var angle2_1 = drawAngleSupport(angleModel);
		angle2_1.position.x = turnFactor * (-turnSteps.params[2].treadWidthX + turnSteps.params[2].innerOffsetX + 5 + stringerThickness);
		angle2_1.position.y = turnParams.h;
		angle2_1.position.z = -turnSteps.params[2].stepOffsetY - (stringerThickness + treadSideOffset + 31) - 60;
		if(turnFactor == -1) angle2_1.position.z -= angleLength;
		angle2_1.rotation.x = Math.PI/2;
		angle2_1.rotation.z = -Math.PI/2 * turnFactor;
		angle.add(angle2_1);
		angleParams.a2_1 = {
			x: angle2_1.position.z - angleLength / 2 * turnFactor,
			y: angle2_1.position.y,
			z: angle2_1.position.z
		};
	//задний внешний уголок
	var angle2_2 = drawAngleSupport(angleModel);
		angle2_2.position.x = turnFactor * (-turnSteps.params[2].treadWidthX + turnSteps.params[2].innerOffsetX + 5 + turnSteps.params[2].stepWidthX - 60);
		if(turnFactor == 1) angle2_2.position.x -= angleLength;
		angle2_2.position.y = turnParams.h;
		angle2_2.position.z = -turnSteps.params[2].treadWidthY - (stringerThickness + treadSideOffset * 2 + 31);
		angle2_2.rotation.x = Math.PI/2;
		angle.add(angle2_2);
		angleParams.a2_2 = {
			x: angle2_2.position.x + angleLength / 2, //
			y: angle2_2.position.y,
			z: angle2_2.position.z
		};
	//внутренний уголок
	var angle2_Wnd = drawAngleSupport(angleModelWnd);
		angle2_Wnd.position.x = turnFactor * (angleLnWdHf + treadSideOffset + 5 + stringerThickness + (turnSteps.params[2].innerOffsetX - angleLengthWnd) / 2) + angleLnWdHf;
		angle2_Wnd.position.y = turnParams.h;
		angle2_Wnd.position.z = - (stringerThickness + 31);
		angle2_Wnd.rotation.x = Math.PI / 2;
		angle2_Wnd.rotation.z = Math.PI;
		angle.add(angle2_Wnd);
		angleParams.a2_Wnd = {
			x: turnFactor * (angle2_Wnd.position.x - angleLengthWnd / 2), //
			y: angle2_Wnd.position.y,
			z: angle2_Wnd.position.z
		};
	//отрисовываем уголки для 3-ей забежной ступени
	var deltaX_3 = turnSteps.params[3].stepWidthHi - 40 - 60 - angleLength * 2;
	var deltaIndent_3 = 0;
	if(deltaX_3 < 5) deltaIndent_3 = (5 - deltaX_3) / 2;
	var angle3_1 = drawAngleSupport(angleModel);
		angle3_1.position.x =  - (turnSteps.params[3].stepWidthLow + 5 - 60 + deltaIndent_3) * turnSteps.params[3].turnFactor;
		if(turnFactor == 1) angle3_1.position.x -= angleLength ;
		angle3_1.position.y = turnParams.h * 2;
		angle3_1.position.z = -turnSteps.params[2].treadWidthY - (stringerThickness + treadSideOffset * 2  + 31);
		angle3_1.rotation.x = Math.PI/2;
		angle.add(angle3_1);
		angleParams.a3_1 = {
			x: angle3_1.position.x + angleLength / 2, //
			y: angle3_1.position.y,
			z: angle3_1.position.z
		};
	var angle3_2 = drawAngleSupport(angleModel);
		angle3_2.position.x =  - (turnSteps.params[3].stepWidthLow + 5 - turnSteps.params[3].stepWidthHi + 40 - deltaIndent_3) * turnSteps.params[3].turnFactor;
		if(turnFactor == -1) angle3_2.position.x -= angleLength;
		angle3_2.position.y = turnParams.h * 2;
		angle3_2.position.z = -turnSteps.params[2].treadWidthY - (stringerThickness + treadSideOffset * 2  + 31);
		angle3_2.rotation.x = Math.PI/2;
		angle.add(angle3_2);
		angleParams.a3_2 = {
			x: angle3_2.position.x + angleLength / 2, //
			y: angle3_2.position.y,
			z: angle3_2.position.z
		};
	var angle3_Wnd = drawAngleSupport(angleModelWnd);
		angle3_Wnd.position.x = turnFactor * (angleLnWdHf + treadSideOffset + 5 + stringerThickness + (turnSteps.params[2].innerOffsetX - angleLengthWnd) / 2) + angleLnWdHf;
		angle3_Wnd.position.y = turnParams.h * 2;
		angle3_Wnd.position.z = - (stringerThickness + 31);
		angle3_Wnd.rotation.x = Math.PI / 2;
		angle3_Wnd.rotation.z = Math.PI;
		angle.add(angle3_Wnd);
		angleParams.a3_Wnd = {
			x: turnFactor * (angle3_Wnd.position.x - angleLengthWnd / 2),
			y: angle3_Wnd.position.y,
			z: angle3_Wnd.position.z
		};
	if (turnParams.stairModel === "П-образная с забегом") {
			//отрисовываем уголки для 4-ой забежной ступени
			var angle4_1 = drawAngleSupport(angleModel);
				angle4_1.position.x = turnFactor * (turnSteps.params[4].stepWidthHi + marshDist + stringerThickness + treadSideOffset - 31 - 60);
				if(turnFactor == 1) angle4_1.position.x = angle4_1.position.x - angleLength;
				angle4_1.position.y = turnParams.h * 3;
				angle4_1.position.z = -turnSteps.params[4].treadWidth- (stringerThickness + treadSideOffset * 2  + 31);
				angle4_1.rotation.x = Math.PI/2;
				angle.add(angle4_1);
				angleParams.a4_1 = {
					x: angle4_1.position.x, //
					y: angle4_1.position.y,
					z: angle4_1.position.z
				};
			//отрисовываем уголки для 5-ой забежной ступени
			//левый уголок
			var angle5_1 = drawAngleSupport(angleModel);
				angle5_1.position.x = (turnSteps.params[5].stepOffsetY + marshDist + stringerThickness *2 + treadSideOffset * 2 + 60) * turnFactor;
				if(turnFactor == -1) angle5_1.position.x -= angleLength;
				angle5_1.position.y = turnParams.h * 4;
				angle5_1.position.z = -turnSteps.params[5].treadWidthX - (stringerThickness*0 + treadSideOffset  + 31) + (turnSteps.params[5].innerOffsetX + 5);
				angle5_1.rotation.x = Math.PI/2;
				angle.add(angle5_1);
				angleParams.a5_1 = {
					x: angle5_1.position.x, //
					y: angle5_1.position.y,
					z: angle5_1.position.z
				};
			var angle5_2 = drawAngleSupport(angleModel);
				angle5_2.position.x = turnFactor * (turnSteps.params[5].treadWidthY  + marshDist + stringerThickness * 2 + treadSideOffset * 3 ) ;
				angle5_2.position.y = turnParams.h * 4;
				angle5_2.position.z = -turnSteps.params[5].stepOffsetX - (stringerThickness + treadSideOffset + 31) + (turnSteps.params[5].innerOffsetX + 5) - 60;
				if(turnFactor == 1) angle5_2.position.z = angle5_2.position.z - angleLength;
				angle5_2.rotation.x = Math.PI/2;
				angle5_2.rotation.z = Math.PI/2 * turnFactor;
				angle.add(angle5_2);
				angleParams.a5_2 = {
					x: angle5_2.position.x, //
					y: angle5_2.position.y,
					z: angle5_2.position.z
				};
			var angle5_Wnd = drawAngleSupport(angleModelWnd);
				angle5_Wnd.position.x = (turnParams.marshDist + stringerThickness * 2 + treadSideOffset) * turnSteps.params[5].turnFactor;
				angle5_Wnd.position.y = turnParams.h * 4;
				angle5_Wnd.position.z = - 31 + (turnSteps.params[5].innerOffsetX + 5) //позиционируем относительно ступени
										- angleLnWdHf + angleLnWdHf * turnFactor //учитываем поворот (уходим от  лишнего кода)
										- (turnSteps.params[5].innerOffsetX - angleLengthWnd) / 2;  //ставить посередине innerOffsetX
				angle5_Wnd.rotation.x = Math.PI / 2;
				angle5_Wnd.rotation.z = 1.5 * Math.PI * turnFactor;
				angle.add(angle5_Wnd);
				angleParams.a5_Wnd = {
					x: angle5_Wnd.position.x, //
					y: angle5_Wnd.position.y,
					z: angle5_Wnd.position.z
				};
			//отрисовываем уголки для 6-ой забежной ступени
			var deltaX_6 = turnSteps.params[6].stepWidthHi - 40 - 60 - angleLength * 2;
			var deltaIndent_6 = 0;
			if(deltaX_6 < 5) deltaIndent_6 = (5 - deltaX_6) / 2;
			var angle6_1 = drawAngleSupport(angleModel);
				angle6_1.position.x = turnFactor * (turnSteps.params[6].treadWidth  + marshDist + stringerThickness *2 + treadSideOffset * 3);
				angle6_1.position.y = turnParams.h * 5;
				angle6_1.position.z =  - (stringerThickness + treadSideOffset + 31) + (turnSteps.params[6].stepWidthLow + 5) - 60 + deltaIndent_6;
				if(turnFactor == 1) angle6_1.position.z -= angleLength;
				angle6_1.rotation.x = Math.PI/2;
				angle6_1.rotation.z = Math.PI/2 * turnFactor;
				angle.add(angle6_1);
				angleParams.a6_1 = {
					x: angle6_1.position.x, //
					y: angle6_1.position.y,
					z: angle6_1.position.z
				};
			var angle6_2 = drawAngleSupport(angleModel);
				angle6_2.position.x = turnFactor * (turnSteps.params[6].treadWidth  + marshDist + stringerThickness *2 + treadSideOffset * 3) ;
				angle6_2.position.y = turnParams.h * 5;
				angle6_2.position.z =  - (stringerThickness + treadSideOffset + 31) + (turnSteps.params[6].stepWidthLow + 5) - turnSteps.params[6].stepWidthHi + 40 - deltaIndent_6;
				if(turnFactor == -1) angle6_2.position.z = angle6_2.position.z + angleLength;
				angle6_2.rotation.x = Math.PI/2;
				angle6_2.rotation.z = Math.PI/2 * turnFactor;
				angle.add(angle6_2);
				angleParams.a6_2 = {
					x: angle6_2.position.x, //
					y: angle3_2.position.y,
					z: angle6_2.position.z
				};
			var angle6_Wnd = drawAngleSupport(angleModelWnd);
				angle6_Wnd.position.x = - (turnParams.marshDist + stringerThickness *2 + treadSideOffset) * turnSteps.params[6].turnFactor;
				angle6_Wnd.position.y = turnParams.h * 5;
				angle6_Wnd.position.z = - 31 + (turnSteps.params[6].stepWidthLow + 5)
										- angleLnWdHf + angleLnWdHf * turnFactor
										- (turnSteps.params[6].stepWidthLow - angleLengthWnd) / 2;
				angle6_Wnd.rotation.x = Math.PI / 2;
				angle6_Wnd.rotation.z = 1.5 * Math.PI * turnFactor;
				angle.add(angle6_Wnd);
				angleParams.a6_Wnd = {
					x: angle6_Wnd.position.x, //
					y: angle6_Wnd.position.y,
					z: angle6_Wnd.position.z
				};
	}
	turnParams.angles = {
		meshes: angle,
		params: angleParams
	};
	return turnParams;
}//end of drawTurnAnglesLt


function drawTurnFramesLt(turnFramesParams, turnSteps) {

	turnFramesParams.meshes = new THREE.Object3D();

/* Первая рамка */

	turnFramesParams.dxfBasePoint = newPoint_xy(turnFramesParams.dxfBasePoint, -1000, 0);

	var basePoint = {
		x: turnFramesParams.treadSideOffset,
		y: -40,//- turnFramesParams.treadThickness,
		z: -10,
		rotationY: 0,
	}

	var frameParams1 = {
		basepoint: basePoint,
		M: turnFramesParams.M,
		turnFactor: turnFramesParams.turnFactor,
		metalMaterial: turnFramesParams.metalMaterial,
		metalMaterial2: turnFramesParams.metalMaterial2,
		dxfBasePoint: turnFramesParams.dxfBasePoint
	}

	frameParams1 = drawLtTurnFrame1(frameParams1);
	turnFramesParams.meshes.add(frameParams1.frame);

/* Вторая рамка */

	turnFramesParams.dxfBasePoint = newPoint_xy(turnFramesParams.dxfBasePoint, -1000, 0);

	var basePoint = {
		//x: 117.264 * turnFramesParams.turnFactor,
		x: (112.264 + turnFramesParams.treadSideOffset) * turnFramesParams.turnFactor,
		y: turnFramesParams.h - 40, //turnFramesParams.treadThickness,
		z: - (70 + turnFramesParams.stringerThickness),
		rotationY: 0,
	}

	var frameParams2 = {
		basepoint: basePoint,
		M: turnFramesParams.M,
		turnFactor: turnFramesParams.turnFactor,
		metalMaterial: turnFramesParams.metalMaterial,
		metalMaterial2: turnFramesParams.metalMaterial2,
		dxfBasePoint: turnFramesParams.dxfBasePoint,
	}

	frameParams2 = drawLtTurnFrame2(frameParams2);
	turnFramesParams.meshes.add(frameParams2.frame);

/* Третья рамка */

	var basePoint = {
		//x: 28.0713 * turnFramesParams.turnFactor,
		x: (23.0713 +  + turnFramesParams.treadSideOffset) * turnFramesParams.turnFactor,
		y: turnFramesParams.h * 2 - 40, //turnFramesParams.treadThickness,
		z: - (70 + turnFramesParams.stringerThickness),
		rotationY: 0,
	}

	var frameParams3 = {
		basepoint: basePoint,
		M: turnFramesParams.M,
		marshDist: turnFramesParams.marshDist,
		turnFactor: turnFramesParams.turnFactor,
		metalMaterial: turnFramesParams.metalMaterial,
		metalMaterial2: turnFramesParams.metalMaterial2,
		dxfBasePoint: turnFramesParams.dxfBasePoint,
	}
	if (turnFramesParams.stairModel == "П-образная с забегом") {
		frameParams3 = drawLtTurnFrame3(frameParams3);
	}
	else {
		frameParams3 = drawLtTurnFrame3Top(frameParams3);
	}
	turnFramesParams.meshes.add(frameParams3.frame);

	if(turnFramesParams.stairModel == "П-образная с забегом") {

/* Четвёртая рамка */

		turnFramesParams.dxfBasePoint = newPoint_xy(turnFramesParams.dxfBasePoint, 1000, 1000);

		var basePoint = {
			x: -78 * turnFramesParams.turnFactor,
			y: turnFramesParams.h * 3 - 40, //turnFramesParams.treadThickness,
			//вернуть
			z: -turnSteps.meshes.children[3].position.x * turnFramesParams.turnFactor -10/* + turnFramesParams.treadSideOffset - 5*/,
			//z: 0,
			rotationY: -Math.PI/2,
		}
		var frameParams4 = {
			basepoint: basePoint,
			M: turnFramesParams.M,
			turnFactor: turnFramesParams.turnFactor,
			metalMaterial: turnFramesParams.metalMaterial,
			metalMaterial2: turnFramesParams.metalMaterial2,
			dxfBasePoint: turnFramesParams.dxfBasePoint,
		}

		frameParams4 = drawLtTurnFrame1(frameParams4);
		turnFramesParams.meshes.add(frameParams4.frame);

/* Пятая рамка */

		var basePoint = {
			//x: turnFramesParams.treadsPosition.treadPosition5.x * turnFramesParams.turnFactor - turnFramesParams.turnSteps[5].stepOffsetY - 5 * turnFramesParams.turnFactor,
			//вернуть
			x: turnSteps.meshes.children[4].position.x * turnFramesParams.turnFactor - turnSteps.params[5].stepOffsetY - 5 * turnFramesParams.turnFactor + 5 - turnFramesParams.treadSideOffset,
			//x: 0,
			y: turnFramesParams.h * 4 - 40,//turnFramesParams.treadThickness,
			z: - 70,		// расстояние от переднего торца первой ступени до дальнего края первого фланца рамки 5-й ступени
			rotationY: -Math.PI/2,
		}

		var frameParams5 = {
			basepoint: basePoint,
			M: turnFramesParams.M,
			turnFactor: turnFramesParams.turnFactor,
			metalMaterial: turnFramesParams.metalMaterial,
			metalMaterial2: turnFramesParams.metalMaterial2,
			dxfBasePoint: turnFramesParams.dxfBasePoint,
		}

		frameParams5 = drawLtTurnFrame2(frameParams5);
		turnFramesParams.meshes.add(frameParams5.frame);

/* Шестая рамка */

		turnFramesParams.dxfBasePoint = newPoint_xy(turnFramesParams.dxfBasePoint, 0, 1000);

		var basePoint = {
			//x: turnFramesParams.treadsPosition.treadPosition5.x * turnFramesParams.turnFactor - turnFramesParams.turnSteps[5].stepOffsetY - turnFramesParams.treadSideOffset - turnFramesParams.treadSideOffset + 5/**/,
			//вернуть
			x: turnSteps.meshes.children[4].position.x * turnFramesParams.turnFactor - turnSteps.params[5].stepOffsetY - turnFramesParams.treadSideOffset/* - turnFramesParams.treadSideOffset + 5*/,
			//x: 0,
			y: turnFramesParams.h * 5 - 40, //turnFramesParams.treadThickness,
			z: - 54.9287,
			rotationY: -Math.PI/2,
		}

		var frameParams6 = {
			basepoint: basePoint,
			M: turnFramesParams.M,
			marshDist: turnFramesParams.marshDist,
			turnFactor: turnFramesParams.turnFactor,
			metalMaterial: turnFramesParams.metalMaterial,
			metalMaterial2: turnFramesParams.metalMaterial2,
			dxfBasePoint: turnFramesParams.dxfBasePoint,
		}

		frameParams6 = drawLtTurnFrame3Top(frameParams6);
		turnFramesParams.meshes.add(frameParams6.frame);
	}

	turnFramesParams.params = {
		frameParams1: frameParams1,
		frameParams2: frameParams2,
		frameParams3: frameParams3,
		frameParams4: frameParams4,
		frameParams5: frameParams5,
		frameParams6: frameParams6,
	};

	return turnFramesParams;
}

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
	//dxfBasePoint = {x: 0, y: 0};
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);
	//var dxfPrimitivesArr = {};
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
	// координаты отверстий рамки
	var holesCoordinates1_1 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	// размеры рамки
	var frameDimensions = {x: widthLongFlan, z: M - 2 * stringerThickness};

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
	if (turnFactor == -1) {
		flan.position.x = - frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = -frameParams.basepoint.rotationY + Math.PI/2;
		flan.rotation.z = 0;
	}
	else {
		//flan.position.x = frameParams.basepoint.x * Math.sin(frameParams.basepoint.rotationY) - flanThickness * Math.cos(frameParams.basepoint.rotationY);
		flan.position.x = (frameParams.basepoint.x - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + 0;
		flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);//-flanThickness * Math.cos(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY + Math.PI/2;
		flan.rotation.z = 0;
	}

	//добавляем фланец в сцену
	frameParams.frame.add(flan);

	/*длинный фланец*/
	//dxfBasePoint = {x: 0, y: 100};
	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 100)
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
	var holesCoordinates1_2 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
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
	if (turnFactor == -1) {
		flan.position.x = (-frameParams.basepoint.x + leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = - frameParams.basepoint.rotationY + Math.PI/2;
		flan.rotation.z = 0;
	}
	else {
		flan.position.x = (frameParams.basepoint.x - (leftFlanPosition + flanThickness)) * Math.cos(frameParams.basepoint.rotationY) + frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + 0;
		flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - (leftFlanPosition + flanThickness)) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY + Math.PI/2;
		flan.rotation.z = 0;
	}

	//добавляем фланец в сцену
	frameParams.frame.add(flan);

	/*** ДОБАВЛЕНИЕ ПРОФИЛЕЙ ***/

	/*задаем параметры объекта*/

	var profileHeight = 40;
	var profileWidth = 20;
	var angle;
	if (turnFactor == -1) {
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

	//var dxfBasePoint = {x:0, y:200};
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 200);

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
	if (turnFactor == -1) {
		profile.position.x = (-frameParams.basepoint.x + flanThickness)*Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - (widthShortFlan)) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y + profileHeight;
		profile.position.z = (frameParams.basepoint.z - (widthShortFlan))*Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY - alfa;
	}
	else {
		profile.position.x = (frameParams.basepoint.x - leftFlanPosition)*Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.z - (widthLongFlan))*Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y + profileHeight;
		profile.position.z = (frameParams.basepoint.z - (widthLongFlan))*Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - leftFlanPosition)*Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = -frameParams.basepoint.rotationY + alfa;
	}
	frameParams.frame.add(profile);

	/*передний профиль*/

	//var dxfBasePoint = {x:0, y:300};
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 300);

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
	if (turnFactor == -1) {
		profile1.position.x = (-frameParams.basepoint.x + flanThickness)*Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth)*Math.sin(frameParams.basepoint.rotationY);
		profile1.position.y = frameParams.basepoint.y + profileHeight;
		profile1.position.z = (frameParams.basepoint.z - profileWidth)*Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness)*Math.sin(frameParams.basepoint.rotationY);
		profile1.rotation.x = Math.PI/2;
		profile1.rotation.y = 0;
		profile1.rotation.z = frameParams.basepoint.rotationY + 0;
	}
	else {
		profile1.position.x = (frameParams.basepoint.x - leftFlanPosition)*Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.z - profileWidth)*Math.sin(frameParams.basepoint.rotationY);
		profile1.position.y = frameParams.basepoint.y + profileHeight;
		profile1.position.z = (frameParams.basepoint.z - profileWidth)*Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - leftFlanPosition)*Math.sin(frameParams.basepoint.rotationY);
		profile1.rotation.x = Math.PI/2;
		profile1.rotation.y = 0;
		profile1.rotation.z = -frameParams.basepoint.rotationY + 0;
	}
	frameParams.frame.add(profile1);

	var holesCoordinates = {holesCoordinates1_1: holesCoordinates1_1, holesCoordinates1_2: holesCoordinates1_2};
	//добавляем объекты в сцену
	frameParams.holesCoordinates = holesCoordinates;
	frameParams.frameDimensions = frameDimensions;
	return frameParams;
}

function drawLtTurnFrame2(frameParams) {
	frameParams.frame = new THREE.Object3D();

	var stringerThickness = 8;
	var flanThickness = 8;
	var M = frameParams.M;
	var turnFactor = frameParams.turnFactor;
	var metalMaterial = frameParams.metalMaterial;
	var metalMaterial2 = frameParams.metalMaterial2;

	var alfa = toRadians(55.5134);		// угол первого профиля из 3д модели
	var betta = toRadians(22.6552);		// угол второго профиля из 3д модели
	var profileHeight = 40;				// высота профиля
	var profileWidth = 20;				// ширина профиля

	/* Расчёты размеров */

	var a = profileWidth/Math.cos(betta);
	var c = profileWidth/Math.cos(Math.PI/2 - alfa);
	var flan1Lenght = 80 + c;
	var profile1Lenght = (M - 2*(stringerThickness + flanThickness))/Math.sin(alfa);
	var flan2Lenght = M - stringerThickness + c - profile1Lenght*Math.cos(alfa);
	var profile2Lenght = (M - stringerThickness - flanThickness)/Math.cos(betta);
	var flan3Lenght = M - 2*(stringerThickness + flanThickness) - profile2Lenght*Math.sin(betta);
	var x3_1 = Math.cos(betta)*(profile2Lenght - 50);
	var z3_1 = Math.sin(betta)*(profile2Lenght - 50) + a;
	var x3_2 = Math.cos(alfa)*(profile1Lenght - 50);
	var z3_2 = Math.sin(alfa)*(profile1Lenght - 50);
	var gamma = Math.atan((z3_2 - z3_1)/(x3_2 - x3_1));
	var profile3Lenght = (z3_2 - z3_1)/Math.sin(gamma);
	var gamma1 = Math.PI/2 + gamma - betta;
	var gamma2 = alfa - gamma - Math.PI/2;

	/*** ДОБАВЛЕНИЕ ФЛАНЦЕВ ***/

	//var dxfBasePoint = {x: 0, y: 400};
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 400);
	//var dxfPrimitivesArr = {};

	/** Добавляем первый фланец **/
	var flanParams = {
		width: 40,  //ширина фланца
		height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 5,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
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
	//координаты отверстий
	var holesCoordinates2_1 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	// рзмеры рамки
	var frameDimensions = {x: (M - 2 * stringerThickness)+flan1Lenght, z: M - 2 * stringerThickness};

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

	//задаем позицию первого фланца
	if (turnFactor == 1) {
		flan.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = -Math.PI/2;
	}
	else {
		flan.position.x = -(5 + stringerThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - 10) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) -	frameParams.basepoint.z *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = - frameParams.basepoint.rotationY - Math.PI;
		flan.rotation.z = -Math.PI/2;
	}
	frameParams.frame.add(flan);

	/*** Добавляем первый профиль ***/

	//var dxfBasePoint = {x:0, y:550};
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 550);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: alfa,
		angle2: alfa,
		backLength: profile1Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {
		profile.position.x = (frameParams.basepoint.x - (flan1Lenght - c)) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + c)* Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY + Math.PI - alfa;
	}
	else {
		profile.position.x = (frameParams.basepoint.x + (flan1Lenght - c)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - 10 + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y + profileHeight;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + c) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = -Math.PI;
		profile.rotation.z = frameParams.basepoint.rotationY + Math.PI - alfa;
	}
	frameParams.frame.add(profile);

	/** Добавляем второй фланец **/

	//dxfBasePoint = {x: 0, y: 600};
	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 600);

	var flanParams = {
		width: flan2Lenght,  //ширина фланца
		height: 40,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: flan2Lenght - c - 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 0,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole2Y: 0,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
		dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
	};
	var holesCoordinates2_2 = {x1: flanParams.hole1X, y1: flanParams.hole1Y};

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

	//задаем позицию второго фланца
	if (turnFactor == 1) {
		flan.position.x =
		(frameParams.basepoint.x - (M - stringerThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) -
		(frameParams.basepoint.x + M - stringerThickness - flanThickness) * Math.sin(frameParams.basepoint.rotationY);

		flan.position.y = frameParams.basepoint.y;

		flan.position.z =
		(frameParams.basepoint.z - (M - stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - stringerThickness - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = 0;
	}
	else {
		flan.position.x = (frameParams.basepoint.x + (M - stringerThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + M - stringerThickness - flanThickness - 10) * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.height;
		flan.position.z = (frameParams.basepoint.z - (M - stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - stringerThickness - frameParams.basepoint.z)/*(frameParams.basepoint.x + M - flan1Lenght -5)*/ * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = -frameParams.basepoint.rotationY;
		flan.rotation.z = -Math.PI;
	}
	frameParams.frame.add(flan);

	/*** Добавляем второй профиль ***/

	//var dxfBasePoint = {x:0, y:700};
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 700);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: Math.PI/2+betta,
		angle2: Math.PI-(alfa-betta),
		backLength: profile2Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {
		profile.position.x =
		(frameParams.basepoint.x - flan1Lenght - profile2Lenght*Math.cos(betta)) * Math.cos(frameParams.basepoint.rotationY) -
		(profile2Lenght*Math.sin(betta) + frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);

		profile.position.y = frameParams.basepoint.y;

		profile.position.z =
		(frameParams.basepoint.z - flanThickness - profile2Lenght*Math.sin(betta)) * Math.cos(frameParams.basepoint.rotationY) +
		(profile2Lenght*Math.cos(betta)-frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);

		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY - betta;
	}
	else {
		profile.position.x = (frameParams.basepoint.x + flan1Lenght + profile2Lenght*Math.cos(betta)) * Math.cos(frameParams.basepoint.rotationY) + (profile2Lenght*Math.sin(betta) + frameParams.basepoint.x - 10 + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y + profileHeight;
		profile.position.z = (frameParams.basepoint.z - flanThickness - profile2Lenght*Math.sin(betta)) * Math.cos(frameParams.basepoint.rotationY) + (profile2Lenght*Math.cos(betta)-frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = Math.PI;
		profile.rotation.z = frameParams.basepoint.rotationY - betta;
	}
	frameParams.frame.add(profile);

	/** Добавляем третий фланец**/

	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 800);

	flanParams = {
		width: flan3Lenght,  //ширина фланца
		height: 40,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: flan3Lenght - a - 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 0,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole2Y: 0,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
		dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
	}
	var holesCoordinates2_3 = {x1: flanParams.hole1X, y1: flanParams.hole1Y};
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
	if (turnFactor == 1) {
		flan.position.x =
		(frameParams.basepoint.x - (M - stringerThickness - flanThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) -
		(frameParams.basepoint.x + M - 2*stringerThickness - flanThickness) * Math.sin(frameParams.basepoint.rotationY);

		flan.position.y =
		frameParams.basepoint.y;

		flan.position.z =
		(frameParams.basepoint.z - (M - 2*stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - frameParams.basepoint.z - flanThickness - stringerThickness) * Math.sin(frameParams.basepoint.rotationY);

		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY-Math.PI/2;
		flan.rotation.z = 0;
	}
	else {
		flan.position.x = (frameParams.basepoint.x + (M - stringerThickness - flanThickness + flan1Lenght) + flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (M + frameParams.basepoint.x - 2*stringerThickness - flanThickness - 10) * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = (frameParams.basepoint.z - (M - 2*stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) + (M - frameParams.basepoint.z - stringerThickness) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = -frameParams.basepoint.rotationY-Math.PI/2;
		flan.rotation.z = 0;
	}

	//добавляем фланец в сцену
	frameParams.frame.add(flan);

	/*** Добавляем третий профиль ***/

	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 900);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: Math.PI/2 - gamma1,
		angle2: Math.PI/2 + gamma2,
		backLength: -profile3Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {
		profile.position.x =
		(frameParams.basepoint.x - flan1Lenght - x3_1) * Math.cos(frameParams.basepoint.rotationY) -
		(z3_1 + frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);

		profile.position.y = frameParams.basepoint.y + profileHeight;

		profile.position.z =
		(frameParams.basepoint.z - flanThickness - z3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(x3_1 - frameParams.basepoint.z - 5) * Math.sin(frameParams.basepoint.rotationY);

		profile.rotation.x = Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = -frameParams.basepoint.rotationY + gamma;
	}
	else {
		profile.position.x = (frameParams.basepoint.x + flan1Lenght + x3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(z3_1 + frameParams.basepoint.x - 5) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness - z3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(x3_1 - frameParams.basepoint.z - 5) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = -Math.PI;
		profile.rotation.z = -frameParams.basepoint.rotationY + gamma;
	}
	frameParams.frame.add(profile);

	var holesCoordinates = {holesCoordinates2_1: holesCoordinates2_1, holesCoordinates2_2: holesCoordinates2_2, holesCoordinates2_3: holesCoordinates2_3};
	//добавляем объекты в сцену
	frameParams.holesCoordinates = holesCoordinates;
	frameParams.frameDimensions = frameDimensions;
	return frameParams;
}

function drawLtTurnFrame3(frameParams) {
	frameParams.frame = new THREE.Object3D();

	var stringerThickness = 8;
	var flanThickness = 8;
	var limMarshDist = 205;
	var M = frameParams.M;
	var marshDist = frameParams.marshDist;
	var stairModel = frameParams.stairModel;
	var turnFactor = frameParams.turnFactor;
	var metalMaterial = frameParams.metalMaterial;
	var metalMaterial2 = frameParams.metalMaterial2;

if (marshDist < limMarshDist) {									// для маленького межмаршевого расстояния
	//задаем параметры фланца

	var alfa = toRadians(34.4866);
	var profileHeight = 40;				// высота профиля
	var profileWidth = 20;				// ширина профиля

	/* Расчёты размеров */

	var a = profileWidth / Math.cos(alfa);
	var flan1Lenght = 80 + profileWidth;
	var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
	var profile2Lenght = profile1Lenght / Math.cos(alfa);
	var flan2Lenght = profile2Lenght * Math.sin(alfa) + profileWidth;

	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, -200);

	/* Первый фланец */

	var flanParams = {
		width: 40,  //ширина фланца
		height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 5,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
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
	// координаты отверстий
	var holesCoordinates3_1 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	// размеры рамки
	var frameDimensions = {x: flan2Lenght + flan1Lenght - profileWidth, z: M - 2 * stringerThickness};

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

	//задаем позицию первого фланца

	if (turnFactor == 1) {						// для правого
		flan.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = -Math.PI/2;
	}
	else {										// для левого
		flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = Math.PI;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = Math.PI/2;
	}
	frameParams.frame.add(flan);

	/* Первый профиль */

	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -100, 100);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: Math.PI/2,
		angle2: Math.PI/2,
		backLength: profile1Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {									// для правого
		profile.position.x = (frameParams.basepoint.x + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY + Math.PI/2;
	}
	else {							// для левого
		profile.position.x = (frameParams.basepoint.x - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness - profile1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY - Math.PI/2;
	}
	frameParams.frame.add(profile);

	/* Второй профиль */

	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 200);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: alfa,
		angle2: Math.PI/2 + alfa,
		backLength: profile2Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {		// для правого
		profile.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y + profileHeight;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = Math.PI;
		profile.rotation.z = -frameParams.basepoint.rotationY + Math.PI/2 - alfa;
	}
	else {						// для левого
		profile.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = Math.PI;
		profile.rotation.z = -frameParams.basepoint.rotationY - Math.PI/2 - alfa;
	}
	frameParams.frame.add(profile);

	/* Второй фланец */

	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -100, 0);

	var flanParams = {
		width: 40,  //ширина фланца
		height: flan2Lenght,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: a + 30,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole2Y: profileWidth + 30,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
		dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
	};
	var holesCoordinates3_2 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};

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

	//задаем позицию второго фланца
	if (turnFactor == 1) {						// для правого
		flan.position.x = (frameParams.basepoint.x - flan2Lenght + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + profile1Lenght + 2 * flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - flan2Lenght + profileWidth) *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = -Math.PI/2;
	}
	else {										// для левого
		flan.position.x = (frameParams.basepoint.x + flan2Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + profile1Lenght + flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = Math.PI/2;
	}
	frameParams.frame.add(flan);

	var holesCoordinates = {holesCoordinates3_1: holesCoordinates3_1, holesCoordinates3_2: holesCoordinates3_2};
	//добавляем объекты в сцену
	frameParams.holesCoordinates = holesCoordinates;
	frameParams.frameDimensions = frameDimensions;

	return frameParams;
}

else {							// для большого межмаршего расстояния
	//задаем параметры фланца
	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);

	//константы
	var alfa = 34.4866 * Math.PI/180;
	var profileHeight = 40;
	var profileWidth = 20;

	//расчёты длин
	var a = profileWidth/Math.cos(alfa);
	var flan1Lenght = 20 + 20 + 58 + 20 + a + marshDist - limMarshDist;
	var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
	var profile2Lenght = profile1Lenght/Math.cos(alfa);
	var flan2Lenght = profile2Lenght * Math.sin(alfa) + flan1Lenght;

	/* первый фланец */

	var flanParams = {
		width: flan1Lenght,  //ширина фланца
		height: 40,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 40,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: flan1Lenght - profileWidth - 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
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
	// координаты отверстий
	var holesCoordinates3_1 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	// размеры рамки
	var frameDimensions = {x: M - 2 * stringerThickness, z: flan2Lenght};

	//добавляем первый фланец
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

	//задаем позицию первого фланца

	if (turnFactor == 1) {						// для правого
		flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = 0;
	}
	else {										// для левого
		flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.height;
		flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = Math.PI;
	}

	//добавляем фланец в сцену
	frameParams.frame.add(flan);

	/* первый профиль */

	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: Math.PI/2,
		angle2: Math.PI/2,
		backLength: profile1Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile1 = profileParams.mesh;
	if (turnFactor == 1) {								// для правого
		profile1.position.x = (frameParams.basepoint.x + flan1Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth)*Math.sin(frameParams.basepoint.rotationY);
		profile1.position.y = frameParams.basepoint.y + profileHeight;
		profile1.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness)*Math.sin(frameParams.basepoint.rotationY);
		profile1.rotation.x = Math.PI/2;
		profile1.rotation.y = 0;
		profile1.rotation.z = frameParams.basepoint.rotationY - Math.PI/2;
	}
	else {												// для левого
		profile1.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
		profile1.position.y = frameParams.basepoint.y + profileHeight;
		profile1.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
		profile1.rotation.x = Math.PI/2;
		profile1.rotation.y = 0;
		profile1.rotation.z = frameParams.basepoint.rotationY - Math.PI/2;
	}
	frameParams.frame.add(profile1);

		/* второй профиль */

	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: alfa - Math.PI/2,
		angle2: alfa - Math.PI/2,
		backLength: profile2Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile2 = profileParams.mesh;
	if (turnFactor == 1) {								// для правого
		profile2.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth)*Math.sin(frameParams.basepoint.rotationY);
		profile2.position.y = frameParams.basepoint.y + profileHeight;
		profile2.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness)*Math.sin(frameParams.basepoint.rotationY);
		profile2.rotation.x = Math.PI/2;
		profile2.rotation.y = 0;
		profile2.rotation.z = frameParams.basepoint.rotationY - alfa - Math.PI/2;
	}
	else {												// для левого
		profile2.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
		profile2.position.y = frameParams.basepoint.y;
		profile2.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
		profile2.rotation.x = -Math.PI/2;
		profile2.rotation.y = 0;
		profile2.rotation.z = frameParams.basepoint.rotationY + Math.PI/2 -alfa;
	}
	frameParams.frame.add(profile2);

	/* второй фланец */

	var flanParams = {
		width: flan2Lenght,  //ширина фланца
		height: 40,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: a + 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: flan2Lenght - profileWidth - 30,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
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
	var holesCoordinates3_2 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	//добавляем второй фланец
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

	//задаем позицию второго фланца

	if (turnFactor == 1) {						// для правого
		flan.position.x = (frameParams.basepoint.x - flan2Lenght + flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2*flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = 0;
	}
	else {										// для левого
		flan.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = 0;
	}

	//добавляем фланец в сцену
	frameParams.frame.add(flan);

	var holesCoordinates = {holesCoordinates3_1: holesCoordinates3_1, holesCoordinates3_2: holesCoordinates3_2};
	//добавляем объекты в сцену
	frameParams.holesCoordinates = holesCoordinates;
	frameParams.frameDimensions = frameDimensions;

	return frameParams;
}
}

function drawLtTurnFrame3Top(frameParams) {
	frameParams.frame = new THREE.Object3D();

	var stringerThickness = 8;
	var flanThickness = 8;
	var M = frameParams.M;
	var marshDist = frameParams.marshDist;
	var turnFactor = frameParams.turnFactor;
	var metalMaterial = frameParams.metalMaterial;
	var metalMaterial2 = frameParams.metalMaterial2;

	// константы

	var alfa = toRadians(34.4866);
	var profileHeight = 40;				// высота профиля
	var profileWidth = 20;				// ширина профиля

	/* Расчёты размеров */

	var a = profileWidth / Math.cos(alfa);
	var flan1Lenght = 80 + profileWidth;
	var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
	var profile2Lenght = profile1Lenght / Math.cos(alfa);
	var flan2Lenght = profile2Lenght * Math.sin(alfa) + profileWidth;

	var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -1100, 0);

	/* Первый фланец */

	var flanParams = {
		width: 40,  //ширина фланца
		height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 5,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
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
	// координаты отверстий
	var holesCoordinates3_1 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};
	// размеры рамки
	var frameDimensions = {x: M - 2 * stringerThickness, z: flan2Lenght + flan1Lenght - profileWidth};

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

	//задаем позицию первого фланца

	if (turnFactor == 1) {						// для правого
		flan.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = -Math.PI/2;
	}
	else {										// для левого
		flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = Math.PI;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = Math.PI/2;
	}
	frameParams.frame.add(flan);

	/* Первый профиль */

	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, -100);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: Math.PI/2,
		angle2: Math.PI/2,
		backLength: profile1Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {									// для правого
		profile.position.x = (frameParams.basepoint.x + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY + Math.PI/2;
	}
	else {							// для левого
		profile.position.x = (frameParams.basepoint.x - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness - profile1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = 0;
		profile.rotation.z = frameParams.basepoint.rotationY - Math.PI/2;
	}
	frameParams.frame.add(profile);

	/* Второй профиль */

	dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, -100);

	var profileParams = {
		width: profileWidth,
		height: profileHeight,
		angle1: alfa,
		angle2: Math.PI/2 + alfa,
		backLength: profile2Lenght,
		material: metalMaterial,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr,
	}

	profileParams = drawProfile(profileParams);

	var profile = profileParams.mesh;
	if (turnFactor == 1) {		// для правого
		profile.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y + profileHeight;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = -Math.PI/2;
		profile.rotation.y = Math.PI;
		profile.rotation.z = -frameParams.basepoint.rotationY + Math.PI/2 - alfa;
	}
	else {						// для левого
		profile.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
		profile.position.y = frameParams.basepoint.y;
		profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
		profile.rotation.x = Math.PI/2;
		profile.rotation.y = Math.PI;
		profile.rotation.z = -frameParams.basepoint.rotationY - Math.PI/2 - alfa;
	}
	frameParams.frame.add(profile);

	/* Второй фланец */

	var flanParams = {
		width: 40,  //ширина фланца
		height: flan2Lenght,  //длина фланца (высота при вертикальном расположении)
		holeDiam: 12,  //диаметр отверстий с 1 по 4
		holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
		angleRadUp: 0,  //радиус скругления верхних углов фланца
		angleRadDn: 0,  //радиус скругления нижних углов фланца
		hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole1Y: a + 30,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole2Y: profileWidth + 30,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
		hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
		hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
		dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
		dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
	};
	var holesCoordinates3_2 = {x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y};

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

	//задаем позицию второго фланца
	if (turnFactor == 1) {						// для правого
		flan.position.x = (frameParams.basepoint.x - flan2Lenght + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + profile1Lenght + 2 * flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y + flanParams.width;
		flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - flan2Lenght + profileWidth) *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = -Math.PI/2;
	}
	else {										// для левого
		flan.position.x = (frameParams.basepoint.x + flan2Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + profile1Lenght + flanThickness) *  Math.sin(frameParams.basepoint.rotationY);
		flan.position.y = frameParams.basepoint.y;
		flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) *  Math.sin(frameParams.basepoint.rotationY);
		flan.rotation.x = 0;
		flan.rotation.y = frameParams.basepoint.rotationY;
		flan.rotation.z = Math.PI/2;
	}
	frameParams.frame.add(flan);

	var holesCoordinates = {holesCoordinates3top_1: holesCoordinates3_1, holesCoordinates3top_2: holesCoordinates3_2};
	//добавляем объекты в сцену
	frameParams.holesCoordinates = holesCoordinates;
	frameParams.frameDimensions = frameDimensions;

	return frameParams;
}

/*возвращает блок из трех рамок забежных ступеней в виде сгруппированного объекта мэшей*/
function drawTurnFramesKo(turnFrameParams) {

    var frames = new THREE.Object3D();

    var M = turnFrameParams.M;
    var h = turnFrameParams.h;
    var turn = turnFrameParams.turnFactor;
    var deltaXFrame = turnFrameParams.deltaXFrame;
    var stepOffsetFront = turnFrameParams.stepOffsetFront;

    turnFrameParams.centerHoles = {};

    //создаем первую (нижнюю) рамку
    var frame1 = drawKoTurnFrame1(turnFrameParams).frame;
    frame1.position.x = -M * turn // + deltaXFrame * turn;
    frame1.position.y = 0;
    frame1.position.z = 0//-stepOffsetFront;
    if (turnFrameParams.topMarsh)
        frame1.position.z += 8;
    frame1.rotation.y = Math.PI * (turn / 2 - 1 / 2);
    frames.add(frame1);

    //создаем вторую (угловую) рамку
    frame2 = drawKoTurnFrame2(turnFrameParams).frame;
    frame2.position.x = -M * turn;// + deltaXFrame * turn;
    frame2.position.y = h;
    frame2.position.z = -turnFrameParams.shapePar.stepOffsetY - 25;
    frame2.rotation.y = Math.PI * (turn / 2 - 1 / 2);
    frames.add(frame2);

    //создаем третью рамку
    frame3 = drawKoTurnFrame3(turnFrameParams).frame;
    frame3.position.x = (stepOffsetFront - 17) * turn;
    frame3.position.y = h * 2;
    frame3.position.z = -25;
    frame3.rotation.y = Math.PI * (turn / 2 - 1 / 2);
    frames.add(frame3);

    turnFrameParams.meshes = frames;
	
	//параметры для косоуров
	var nose = 40;
	
	//первая забежная проступь нижнего внешнего косоура
	var deltaStepWidth = (turnFrameParams.turnSteps[1].stepWidthHi - turnFrameParams.turnSteps[1].stepWidthLow) * params.sideOverHang / turnFrameParams.turnSteps[1].treadWidth;
	turnFrameParams.lengthKo.lengthBotOutBend1 = turnFrameParams.turnSteps[1].stepWidthHi - deltaStepWidth - nose + 5;

	//вторая забежная проступь нижнего внешнего косоура
	turnFrameParams.lengthKo.lengthBotOutBend = params.M - 15 - params.sideOverHang - turnFrameParams.lengthKo.lengthBotOutBend1

	//первая забежная проступь верхнего внешнего косоура
	deltaStepWidth = turnFrameParams.turnSteps[2].stepOffsetX * (params.sideOverHang + turnFrameParams.stringerThickness) / turnFrameParams.turnSteps[2].treadWidthY;
	turnFrameParams.lengthKo.lengthTopOutB1 = turnFrameParams.turnSteps[2].stepWidthX + deltaStepWidth - params.sideOverHang;
	
	//вторая забежная проступь верхнего внешнего косоура
	turnFrameParams.lengthKo.lengthTopOutB2 = params.M + 72 - params.sideOverHang -turnFrameParams.lengthKo.lengthTopOutB1;
	
	//первая забежная проступь верхнего внутреннего косоура
	deltaStepWidth = turnFrameParams.turnSteps[1].treadWidth * (params.sideOverHang + 25 - turnFrameParams.turnSteps[1].stepWidthLow)/(turnFrameParams.turnSteps[1].stepWidthHi - turnFrameParams.turnSteps[1].stepWidthLow)
	turnFrameParams.lengthKo.lengthTopInB1 = params.sideOverHang - deltaStepWidth;
	
	//третья забежная проступь верхнего внутреннего косоура
	var edgeAngle = turnFrameParams.turnSteps[3].edgeAngle;
	var stepWidth = turnFrameParams.turnSteps[3].stepWidthLow;
	var stepWidth0 = stepWidth - nose/Math.cos(edgeAngle);
	var deltaStepWidth = params.sideOverHang * Math.tan(edgeAngle);
	turnFrameParams.lengthKo.lengthTopInB3 = stepWidth0 + deltaStepWidth;
	
	//вторая забежная проступь верхнего внутреннего косоура
	turnFrameParams.lengthKo.lengthTopInB2 = params.sideOverHang + 72 - turnFrameParams.lengthKo.lengthTopInB1 - turnFrameParams.lengthKo.lengthTopInB3;

	
    return turnFrameParams;
}

/*** ”“НЉ–€€ ‘Ћ‡„ЂН€џ ђЂЊЋЉ ‚ ‚€„… ‘ѓђ“ЏЏ€ђЋ‚ЂННЋѓЋ ЋЃљЉ’Ђ Њ……‰ ***/


//#region создание рамок в виде сгруппированного объекта мэшей
function drawKoTurnFrame1(turnFrameParams) {

    /*функциЯ группировки объектов мэшей первой рамки забежной ступени
    €сходные данные: 
        M
        material
        frameMetalThickness
        deltaXFrame
        turnFactor
        dxfBasePoint
        holeRadScrew
        holeRadBolt
        heightFlan
        centerHoles
    На выходе те же данные плюс следующие:
        frame - меш первой рамки
    */
    var frame = new THREE.Object3D();

    var turn = turnFrameParams.turnFactor;
    var dxfBasePoint = turnFrameParams.dxfBasePoint;
    var frameMetalThickness = turnFrameParams.frameMetalThickness;

    //задаем параметры длЯ отрисовки меша
    var meshPar = {
        frameMetalThickness: turnFrameParams.frameMetalThickness,
        material: turnFrameParams.material
    }

    //задаем параметры длЯ отрисовки шейпа
    var shapePar = {
        M: turnFrameParams.M,
        deltaXFrame: turnFrameParams.deltaXFrame,
        holeRadScrew: turnFrameParams.holeRadScrew,
        holeRadBolt: turnFrameParams.holeRadBolt,
        heightFlan: turnFrameParams.heightFlan,
        stepOffsetFront: turnFrameParams.stepOffsetFront,
        lengthKo: turnFrameParams.lengthKo,
        frameMetalThickness: frameMetalThickness,
        stringerThickness: turnFrameParams.stringerThickness,
        centerHoles: turnFrameParams.centerHoles,
        stepOff: turnFrameParams.stepOff,
		turnSteps: turnFrameParams.turnSteps,
    }
    shapePar.centerHoles.frame1 = {};

    /*верхнЯЯ пластина первой (нижней) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(dxfBasePoint, 0, 0);
    var number = 1;
    if (turnFrameParams.isTop) number = 4;
    addText("рамка " + number + " - верхняя пластина", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, shapePar.deltaXFrame, -20));

    meshPar.shape = drawKoTurnFrame1TopShape(shapePar).shape;//создаем шейп
    var mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = 0;
    mesh.position.y = -frameMetalThickness / 2 - frameMetalThickness / 2 * turn;
    mesh.position.z = 0;
    mesh.rotation.x = -Math.PI / 2 * turn;
    frame.add(mesh);

    meshPar.material = turnFrameParams.material1;
    /*переднЯЯ пластина первой (нижней) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, shapePar.deltaXFrame, -200);
    addText("рамка " + number + " - передняя пластина", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame1FrontShape(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanFront.x;
    mesh.position.y = 0;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanFront.y * turn + frameMetalThickness * ((1 + turn) * 0.5);
    mesh.rotation.x = Math.PI;

    frame.add(mesh);

    /*боковаЯ леваЯ  пластина первой (нижней) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - наружный фланец", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame1SideShape1(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideRight.x;
    mesh.position.y = -shapePar.heightFlan / 2 + shapePar.heightFlan / 2 * turn;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideRight.y * turn;
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = -Math.PI / 2;
    mesh.rotation.z = -Math.PI * (turn / 2 - 1 / 2);
    frame.add(mesh);

    /*боковаЯ праваЯ пластина первой (нижней) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - внутренний фланец", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame1SideShape2(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideLeft.x + frameMetalThickness;
    mesh.position.y = -shapePar.heightFlan / 2 + shapePar.heightFlan / 2 * turn;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideLeft.y * turn;
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = -Math.PI / 2;
    mesh.rotation.z = -Math.PI * (turn / 2 - 1 / 2);
    frame.add(mesh);

    turnFrameParams.frame = frame;

    return turnFrameParams;
}

function drawKoTurnFrame2(turnFrameParams) {

    /*функциЯ группировки объектов мэшей второй (угловой) рамки  забежной ступени
    €сходные данные: 
        M
        material
        frameMetalThickness
        deltaXFrame
        turnFactor
        dxfBasePoint
        holeRadScrew
        holeRadBolt
        heightFlan
    На выходе те же данные плюс следующие:
        frame - меш второй рамки
    */
    var frame = new THREE.Object3D();

    var turn = turnFrameParams.turnFactor;
    var dxfBasePoint = turnFrameParams.dxfBasePoint;
    var frameMetalThickness = turnFrameParams.frameMetalThickness;

    //задаем параметры длЯ отрисовки меша
    var meshPar = {
        frameMetalThickness: turnFrameParams.frameMetalThickness,
        material: turnFrameParams.material
    }

    //задаем параметры длЯ отрисовки шейпа
    var shapePar = {
        M: turnFrameParams.M,
        deltaXFrame: turnFrameParams.deltaXFrame,
        holeRadScrew: turnFrameParams.holeRadScrew,
        holeRadBolt: turnFrameParams.holeRadBolt,
        heightFlan: turnFrameParams.heightFlan,
        stepOffsetFront: turnFrameParams.stepOffsetFront,
        lengthKo: turnFrameParams.lengthKo,
        frameMetalThickness: frameMetalThickness,
        stringerThickness: turnFrameParams.stringerThickness,
        centerHoles: turnFrameParams.centerHoles
    }
    shapePar.centerHoles.frame2 = {};

    /*верхнЯЯ пластина второй (угловой) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(dxfBasePoint, 3000, 250);
    var number = 2;
    if (turnFrameParams.isTop) number = 5;
    addText("рамка " + number + " - верхняя пластина", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, shapePar.deltaXFrame, -440));

    meshPar.shape = drawKoTurnFrame2TopShape(shapePar).shape;//создаем шейп
    var mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = 0;
    mesh.position.y = -frameMetalThickness / 2 - frameMetalThickness / 2 * turn;
    mesh.position.z = 0;
    mesh.rotation.x = -Math.PI / 2 * turn;

    frame.add(mesh);

    meshPar.material = turnFrameParams.material1;
    /*переднЯЯ пластина второй (угловой) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, shapePar.deltaXFrame, -800);
    addText("рамка " + number + " - передняя пластина", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame2FrontShape(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanFront.x;
    mesh.position.x -= (frameMetalThickness * Math.cos(toRadians(60)) / 2 + frameMetalThickness * Math.cos(toRadians(60)) / 2 * turn);
    mesh.position.y = 0;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanFront.y * turn;
    mesh.position.z += (frameMetalThickness * Math.cos(toRadians(30)) / 2 + frameMetalThickness * Math.cos(toRadians(30)) / 2 * turn);
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = 30 * Math.PI / 180 * turn;


    frame.add(mesh);

    /*боковаЯ леваЯ пластина второй (угловой) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - наружный фланец", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));


    meshPar.shape = drawKoTurnFrame2SideShape1(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideLeft.x;
    mesh.position.y = -shapePar.heightFlan / 2 + shapePar.heightFlan / 2 * turn;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideLeft.y * turn;
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = -Math.PI / 2;
    mesh.rotation.z = -Math.PI * (turn / 2 - 1 / 2);

    frame.add(mesh);

    /*боковаЯ верхнЯЯ  пластина второй (угловой) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - наружный фланец 2", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame2SideShape1(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideTop.x;
    mesh.position.y = -shapePar.heightFlan / 2 + shapePar.heightFlan / 2 * turn;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideTop.y * turn;
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = -Math.PI * (turn / 2 - 1 / 2);;
    mesh.rotation.z = -Math.PI * (turn / 2 - 1 / 2);

    frame.add(mesh);

    /*боковаЯ праваЯ пластина второй (угловой) рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - внутренний фланец", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));


    meshPar.shape = drawKoTurnFrame2SideShape2(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideRight.x;
    mesh.position.y = -shapePar.heightFlan / 2 + shapePar.heightFlan / 2 * turn;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideRight.y * turn + frameMetalThickness * turn;
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = -Math.PI * (turn / 2 - 1 / 2);;
    mesh.rotation.z = -Math.PI * (turn / 2 - 1 / 2);

    frame.add(mesh);   

    turnFrameParams.frame = frame;
    turnFrameParams.shapePar = shapePar;

    return turnFrameParams;
}

function drawKoTurnFrame3(turnFrameParams) {

    /*функциЯ группировки объектов мэшей третьей рамки  забежной ступени
    €сходные данные: 
        M
        material
        frameMetalThickness
        deltaXFrame
        turnFactor
        dxfBasePoint
        holeRadScrew
        holeRadBolt
        heightFlan
    На выходе те же данные плюс следующие:
        frame - меш третьей рамки
    */
    var frame = new THREE.Object3D();

    var turn = turnFrameParams.turnFactor;
    var dxfBasePoint = turnFrameParams.dxfBasePoint;
    var frameMetalThickness = turnFrameParams.frameMetalThickness;

    //задаем параметры длЯ отрисовки меша
    var meshPar = {
        frameMetalThickness: turnFrameParams.frameMetalThickness,
        material: turnFrameParams.material
    }

    //задаем параметры длЯ отрисовки шейпа
    var shapePar = {
        M: turnFrameParams.M,
        deltaXFrame: turnFrameParams.deltaXFrame,
        holeRadScrew: turnFrameParams.holeRadScrew,
        holeRadBolt: turnFrameParams.holeRadBolt,
        heightFlan: turnFrameParams.heightFlan,
        stepOffsetFront: turnFrameParams.stepOffsetFront,
        lengthKo: turnFrameParams.lengthKo,
        frameMetalThickness: frameMetalThickness,
        stringerThickness: turnFrameParams.stringerThickness,
        centerHoles: turnFrameParams.centerHoles
    }
    shapePar.centerHoles.frame3 = {};

    /*верхнЯЯ пластина третьей рамки*/
    shapePar.dxfBasePoint = newPoint_xy(dxfBasePoint, 6000, -250);
    var number = 3;
    if (turnFrameParams.isTop) number = 6; 
    addText("рамка " + number + " - верхняя пластина", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, -shapePar.deltaXFrame, -20));

    meshPar.shape = drawKoTurnFrame3TopShape(shapePar).shape;//создаем шейп
    var mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = 0;
    mesh.position.y = -frameMetalThickness / 2 - frameMetalThickness / 2 * turn;
    mesh.position.z = 0;
    mesh.rotation.x = -Math.PI / 2 * turn;

    frame.add(mesh);

    meshPar.material = turnFrameParams.material1;
    /*переднЯЯ пластина третьей рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, -shapePar.deltaXFrame, -200);
    addText("рамка " + number + " - передняя пластина", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame3FrontShape(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanFront.x;
    mesh.position.x -= (frameMetalThickness / 2 - frameMetalThickness / 2 * turn) * Math.cos(toRadians(30));
    mesh.position.y = 0;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanFront.y * turn;
    mesh.position.z -= (frameMetalThickness / 2 - frameMetalThickness / 2 * turn) * Math.cos(toRadians(60));
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = -120 * Math.PI / 180 * turn;

    frame.add(mesh);


    /*боковаЯ леваЯ  пластина третьей рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - наружный фланец", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame3SideShape1(shapePar).shape;
    mesh = createMesh(meshPar).mesh;
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideLeft.x;
    mesh.position.y = 0;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideLeft.y * turn + frameMetalThickness * ((1 - turn) * 0.5);
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = 0;

	frame.add(mesh);

    /*боковаЯ  праваЯ пластина третьей рамки*/
    shapePar.dxfBasePoint = newPoint_xy(shapePar.dxfBasePoint, 0, -150);
    addText("рамка " + number + " - внутренний фланец", turnFrameParams.textHeight, dxfPrimitivesArr, newPoint_xy(shapePar.dxfBasePoint, 0, -30));

    meshPar.shape = drawKoTurnFrame3SideShape2(shapePar).shape;//создаем шейп
    mesh = createMesh(meshPar).mesh;//создаем меш
    mesh.position.x = shapePar.pointAnchoringFlan.pFlanSideRight.x;
    mesh.position.y = 0;
    mesh.position.z = -shapePar.pointAnchoringFlan.pFlanSideRight.y * turn + frameMetalThickness * ((1 + turn) * 0.5);
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = 0;

    frame.add(mesh);

    turnFrameParams.frame = frame;

    return turnFrameParams;
}
//#endregion

/*** ”“НЉ–€€ ‘Ћ‡„ЂН€џ …‰ЏЋ‚ Џ…ђ‚Ћ‰ (Н€†Н…‰) ђЂЊЉ€ ***/


//#region элементы первой (нижней) рамки
function drawKoTurnFrame1TopShape(par) {

    /*функциЯ созданиЯ шейпа верхней пластины первой рамки  забежной ступени
       €сходные данные: 
            M
            deltaXFrame
            holeRadScrew
            holeRadBolt
            heightFlan
       На выходе те же данные плюс следующие:
           shape - шейп верхней пластины первой рамки
           flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
           pointAnchoringFlan = {
                pFlanFront      - точка привЯзки переднего фланца к верхней пластине
                pFlanSideRight  - точка привЯзки левого бокового фланца к верхней пластине
                pFlanSideLeft   - точка привЯзки правого бокового фланца к верхней пластине
            };
       */
    var dxfBasePoint = par.dxfBasePoint;
    var holeRad = par.holeRadScrew;
    var widthSideFlan = 40;
    var widthTop = 40;

    var p0 = { x: 0, y: 0 };

    //контур забежной ступени
    var p1t = copyPoint(p0);
    var p2t = newPoint_xy(p1t, par.M, 0);
    var p3t = newPoint_xy(p2t, 0, 55);
    var p4t = itercection(p1t, newPoint_xy(p1t, 0, 100), p3t, polar(p3t, Math.PI * 5 / 6, 100));

    //#region Љонтур верхней пластины
    var angl = Math.PI * 11 / 12;

    var p1 = newPoint_xy(p1t, par.deltaXFrame, par.stepOffsetFront);
    var p2 = newPoint_xy(p1, par.M - par.deltaXFrame * 2, 0);
    var p3 = newPoint_xy(p2, 0, widthTop);
    var p41 = newPoint_xy(p1, 0, 100);
    var p42 = polar(p3, angl, 100);
    var p4 = itercection(p1, p41, p3, p42);

    //var p1 = copyPoint(p0);
    //var p2 = newPoint_xy(p1, par.M - par.deltaXFrame * 2, 0);
    //var p3 = newPoint_xy(p2, 0, stepWidthLow);
    //var pt41 = newPoint_xy(p1, 0, 100);
    //var p42 = polar(p3, angl, 100);
    //var p4 = itercection(p1, pt41, p3, p42);

    var shape = new THREE.Shape();
    addPath(shape, dxfPrimitivesArr, [p1, p2, p3, p4, p1], dxfBasePoint);
    //#endregion  

    //#region Џараметры фланцев
    //задаем ширину фланцев рамки
    par.flanParams = {
        widthFront: p2.x - p1.x,     // ширина переднего фланца
        widthSideLeft: p4.y - p1.y,  // ширина левого бокового фланца
        widthSideRight: widthSideFlan           // ширина правого бокового фланца
    }

    //точки привЯзки фланцев к пластине
    par.pointAnchoringFlan = {
        pFlanFront: copyPoint(p1),
        pFlanSideRight: copyPoint(p1),
        pFlanSideLeft: copyPoint(p2)
    };
    //#endregion

	/*
    //вычислЯем и запоминаем длины длЯ косоуров
    var p1i = newPoint_xy(p1, -par.frameMetalThickness - par.stringerThickness, -par.frameMetalThickness);
    var p4i = newPoint_xy(p4, -par.frameMetalThickness - par.stringerThickness, 0);
    par.lengthKo.lengthBotOutBend1 = distance(itercection(p1i, p4i, p3t, p4t), p1i) - par.stepOff; //длина предпоследней проступи нижнего внешнего косоура
	*/
	
    //#region отверстие в  форме неправильного многоугольника со скругленными краЯми
    //углы треугольника без учета скруглений
    var pf1 = newPoint_xy(p1, widthTop, widthTop);//базоваџ точка
    var pf41 = newPoint_xy(p4, 0, -widthTop);
    var pf2 = itercection(pf1, polar(pf1, Math.PI / 2, 100), pf41, polar(pf41, angl, 10));
    var pf3 = itercection(pf1, polar(pf1, 0, 100), pf41, polar(pf41, angl, 10));

    var hole = new THREE.Path();
    var vertexes = []; //массив вершин

    vertexes[0] = pf1;
    vertexes[1] = pf2;
    vertexes[2] = pf3;

    var filletParams = {
        vertexes: vertexes,
        cornerRad: 10,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
        type: "path"
    }

    hole = fiiletPathCorners(filletParams);
    shape.holes.push(hole);
    //#endregion

    //#region отверстиЯ по контуру
    var pc = newPoint_xy(p1, 30, widthTop / 2);
    var center = copyPoint(pc);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc1 = newPoint_xy(p1, (p2.x - p1.x) / 2, widthTop / 2);
    center = copyPoint(pc1);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc2 = newPoint_xy(p2, -30, widthTop / 2);
    center = copyPoint(pc2);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc41 = newPoint_xy(p4, 0, -widthTop / 2);
    center = itercection(pc, polar(pc, Math.PI / 2, 100), pc41, polar(pc41, angl, 100));
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    center = itercection(pc1, polar(pc1, Math.PI / 2, 100), pc41, polar(pc41, angl, 100));;
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);
    //#endregion

    par.shape = shape;

    return par;
}

function drawKoTurnFrame1FrontShape(par) {
    /*функциЯ созданиЯ шейпа передней пластины первой рамки  забежной ступени
       €сходные данные: 
            M
            deltaXFrame
            holeRadScrew
            holeRadBolt
            heightFlan
            flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
       На выходе те же данные плюс следующие:
           shape - шейп передней пластины первой рамки
       */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthFront,
        height: par.heightFlan,
        holeDiam: par.holeRadScrew * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: 30,
        hole1Y: par.heightFlan / 2,
        hole2X: par.flanParams.widthFront / 2,
        hole2Y: par.heightFlan / 2,
        hole3X: 30,
        hole3Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    par.shape = drawRectFlan(flanParams).shape;

    return par;
}

function drawKoTurnFrame1SideShape1(par) {

    /*функциЯ созданиЯ шейпа боковой левой пластины первой рамки  забежной ступени
        €сходные данные: 
             M
             deltaXFrame
             holeRadScrew
             holeRadBolt
             heightFlan
             flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
        На выходе те же данные плюс следующие:
            shape - шейп боковой левой пластины первой рамки
        */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthSideLeft,
        height: par.heightFlan,
        holeDiam: par.holeRadBolt * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: 25,
        hole1Y: par.heightFlan / 2,
        hole2X: par.flanParams.widthSideLeft / 2,
        hole2Y: par.heightFlan / 2,
        hole3X: 25,
        hole3Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    var centerHoles = [];
    centerHoles.push([flanParams.hole1X, flanParams.hole1Y]);
    centerHoles.push([flanParams.hole2X, flanParams.hole2Y]);
    centerHoles.push([flanParams.width - flanParams.hole3X, flanParams.hole3Y]);

    par.centerHoles.frame1.out = centerHoles;
    par.shape = drawRectFlan(flanParams).shape;

    return par;
}

function drawKoTurnFrame1SideShape2(par) {

    /*функциЯ созданиЯ шейпа боковой правой пластины первой рамки  забежной ступени
        €сходные данные: 
             M
             deltaXFrame
             holeRadScrew
             holeRadBolt
             heightFlan
             flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
        На выходе те же данные плюс следующие:
            shape - шейп боковой правой пластины первой рамки
        */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthSideRight,
        height: par.heightFlan,
        holeDiam: par.holeRadBolt * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: par.flanParams.widthSideRight / 2,
        hole1Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    var centerHoles = [];
    centerHoles.push([flanParams.hole1X, flanParams.hole1Y]);

    par.centerHoles.frame1.inn = centerHoles;
    par.shape = drawRectFlan(flanParams).shape;

    return par;
}
//#endregion

/*** ”“НЉ–€€ ‘Ћ‡„ЂН€џ …‰ЏЋ‚ ‚’ЋђЋ‰ (“ѓ‹Ћ‚Ћ‰) ђЂЊЉ€ ***/


//#region элементы второй (угловой) рамки
function drawKoTurnFrame2TopShape(par) {

    /*функциЯ созданиЯ шейпа верхней пластины второй рамки  забежной ступени
       €сходные данные: 
            M
            deltaXFrame
            holeRadScrew
            holeRadBolt
            heightFlan
            stepOffsetFront
       На выходе те же данные плюс следующие:
           shape - шейп верхней пластины второй рамки
           flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
                widthSideTop   - ширина верхнего бокового фланца
                deltaXCenterFrontFlan = { - смещение ординаты по оси • отверстий переднего фланца
                    left    
                    middle 
                    right  
                }
            }
           pointAnchoringFlan = {
                pFlanFront      - точка привЯзки переднего фланца к верхней пластине
                pFlanSideRight  - точка привЯзки левого бокового фланца к верхней пластине
                pFlanSideLeft   - точка привЯзки правого бокового фланца к верхней пластине
                pFlanSideTop    - точка привЯзки верхнего бокового фланца к верхней пластине
            };
            par.lengthKo = {
                lengthTopInB2 -длина второй проступи верхнего внутреннего косоура
                lengthTopOutB1 - длина первой проступи верхнего внешнего косоура
                lengthBotOutBend - длина последней проступи нижнего внешнего косоура
            }
            stepOffsetY -  смещение по оси z второй рамки
       */
    var dxfBasePoint = par.dxfBasePoint;
    var holeRad = par.holeRadScrew;
    var widthTop = 40; // 
    var widthSideFlan = 90;

    var p0 = { x: 0, y: 0 }

    //----------------------------------------

    var treadWidthX = par.M - 25 + 90;
    var treadWidthY = par.M;
    var angleX = 30 * Math.PI / 180;
    var angleY = 30 * Math.PI / 180;
    var innerOffsetX = 90;

    var stepOffsetY = Math.tan(angleX) * (treadWidthX - innerOffsetX);
    var stepOffsetX = Math.tan(angleY) * treadWidthY;
    var stepWidthX = treadWidthX - stepOffsetX;
    var stepWidthY = treadWidthY - stepOffsetY;

    //контур забежной ступени
    var p5 = copyPoint(p0, 0, 0);
    var p1 = newPoint_xy(p5, treadWidthX - innerOffsetX, -stepOffsetY);
    var p2 = newPoint_xy(p1, innerOffsetX, 0);
    var p3 = newPoint_xy(p0, stepWidthX, stepWidthY);
    var p4 = newPoint_xy(p3, -stepWidthX, stepWidthY);
    //------------------------------------------

    //#region Љонтур верхней пластины
    /* var pt1 = newPoint_xy(p0, 0, par.stepOffsetFront);
    var pt11 = polar(pt1, -angleX, 100); */
    var pt2 = newPoint_xy(p0, par.deltaXFrame, 0);
    var pt12 = polar(pt2, Math.PI / 2, 100);

    var l15 = parallel(p5, p1, par.stepOffsetFront);

    var p5f = itercection(l15.p1, l15.p2, pt2, pt12);
    var p51f = newPoint_xy(p5f, 0, widthSideFlan);
    //var dy1 = Math.tan(angleX) * (par.M - 25) - par.deltaXFrame;
    var dy1 = stepOffsetY - par.deltaXFrame;
    var p11f = newPoint_xy(p0, 0, -dy1);
    var p1f = itercection(p5f, polar(p5f, -angleX, 100), p11f, polar(p11f, 0, 100));
    var p2f = newPoint_xy(p1f, widthSideFlan, 0);
    var p3f = newPoint_xy(p3, -60, -par.deltaXFrame);
    var p31f = newPoint_xy(p3f, -widthSideFlan, 0);

    var shape = new THREE.Shape();
    var pArr = [p1f, p2f, p3f, p31f, p51f, p5f, p1f]; // массив точек контура пластины
    addPath(shape, dxfPrimitivesArr, pArr, dxfBasePoint);
    //#endregion

    //вычислЯем и запоминаем длины длЯ косоуров
    var p5i = newPoint_xy(p5f, -par.frameMetalThickness - par.stringerThickness, 0);
    var p51i = newPoint_xy(p51f, -par.frameMetalThickness - par.stringerThickness, 0);
    var p3i = newPoint_xy(p3f, 0, par.frameMetalThickness + par.stringerThickness);
    var p31i = newPoint_xy(p31f, 0, par.frameMetalThickness + par.stringerThickness);
    var p1i = newPoint_xy(p1f, 0, -par.frameMetalThickness - par.stringerThickness);
    var p2i = newPoint_xy(p2f, 0, -par.frameMetalThickness - par.stringerThickness);

    par.lengthKo.lengthTopInB2 = distance(itercection(p1i, p2i, p2, p3), p1i) - 10; //длина второй проступи верхнего внутреннего косоура
    var pp = itercection(newPoint_xy(p5i, +par.stringerThickness, 0), newPoint_xy(p51i, +par.stringerThickness, 0), p3i, p31i);
    par.lengthKo.lengthTopOutB1 = distance(itercection(p2, p3, p3i, p31i), pp) + par.frameMetalThickness; //длина первой проступи верхнего внешнего косоура
    par.lengthKo.lengthBotOutBend = distance(itercection(p5i, p51i, p3i, p31i), p5i)// + par.frameMetalThickness; //длина последней проступи нижнего внешнего косоура
    par.lengthKo.lengthTopInB1 = -(par.M - par.deltaXFrame * 2) + (p1f.x - p5f.x) - par.frameMetalThickness; //длина первой проступи верхнего внутреннего косоура

    //вычислЯем и запоминаем длину от краЯ косоура до фланца (длЯ отверстиЯ в косоуре)
    par.lengthKo.lengthTopOutFlan = distance(p31i, pp); //фланец к верхнему косоуру
	par.lengthKo.lengthBotOutFlan = distance(p5i, pp); //фланец к нижнему косоуру


    //#region Џараметры фланцев
    //задаем ширину фланцев рамки
    par.flanParams = {
        widthFront: distance(p1f, p5f), // ширина переднего фланца
        widthSideLeft: widthSideFlan,              // ширина левого бокового фланца
        widthSideRight: widthSideFlan              // ширина правого бокового фланца
    }
    par.flanParams.widthSideTop = widthSideFlan;

    //точки привЯзки фланцев к пластине
    par.pointAnchoringFlan = {
        pFlanFront: copyPoint(p5f),
        pFlanSideRight: copyPoint(p1f),
        pFlanSideLeft: copyPoint(p5f)
    };
    par.pointAnchoringFlan.pFlanSideTop = copyPoint(p31f);

    par.stepOffsetY = stepOffsetY; //запоминаем смещение по оси z второй рамки
    //#endregion

    //#region отверстие в форме неправильного многоугольника со скругленными краЯми
    var li1 = parallel(p2f, p3f, -widthTop);
    var li2 = parallel(p3f, p31f, -widthTop);
    var li3 = parallel(p31f, p51f, -widthTop);
    var li4 = parallel(p51f, p5f, -widthTop);
    var li5 = parallel(p5f, p1f, widthTop);

    var pi1 = itercectionL(li1, li2);
    var pi2 = itercectionL(li2, li3);
    var pi3 = itercectionL(li3, li4);
    var pi4 = itercectionL(li4, li5);
    var pi5 = itercectionL(li1, li5);


    var hole = new THREE.Path();
    var vertexes = []; //массив вершин

    vertexes[1] = pi5;
    vertexes[2] = pi4;
    vertexes[3] = pi3;
    vertexes[4] = pi2;
    vertexes[0] = pi1;

    var filletParams = {
        vertexes: vertexes,
        cornerRad: 10,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
        type: "path"
    }

    hole = fiiletPathCorners(filletParams);
    shape.holes.push(hole);
    //#endregion

    //#region отверстиЯ по контуру
    //переднЯЯ пластина
    var l1 = parallel(p5f, p1f, widthTop / 2);

    var pc = itercection(l1.p1, l1.p2, p5f, newPoint_xy(p5f, 100, 0));
    var center = copyPoint(pc);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc1 = itercection(l1.p1, l1.p2, p1f, newPoint_xy(p1f, 0, 100));
    center = copyPoint(pc1);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc2 = polar(pc1, calcAngleX1(pc1, pc), distance(pc1, pc) / 2);
    center = copyPoint(pc2);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc0 = itercection(l1.p1, l1.p2, p5f, newPoint_xy(p5f, 10, 10));

    //задаем точки отверстий переднего фланца
    par.flanParams.deltaXCenterFrontFlan = {
        left: distance(pc, pc0),
        middle: distance(pc2, pc0),
        right: distance(pc1, pc0)
    }

    //боковаЯ пластина
    var l1 = parallel(p51f, p31f, -20);

    var pc = itercection(l1.p1, l1.p2, p51f, newPoint_xy(p51f, 100, 0));
    var center = copyPoint(pc);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc1 = itercection(l1.p1, l1.p2, p31f, newPoint_xy(p31f, 0, -100));
    center = copyPoint(pc1);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc2 = polar(pc, calcAngleX1(pc, pc1), distance(pc1, pc) / 2);
    center = copyPoint(pc2);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    //заднЯЯ пластина
    var l1 = parallel(p3f, p2f, -20);

    var pc = itercection(l1.p1, l1.p2, p3f, newPoint_xy(p3f, 0, -100));
    var center = copyPoint(pc);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc1 = itercection(l1.p1, l1.p2, p1f, newPoint_xy(p1f, 0, 100));
    center = copyPoint(pc1);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);

    var pc2 = polar(pc1, calcAngleX1(pc1, pc), distance(pc1, pc) / 2);
    center = copyPoint(pc2);
    addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint);
    //#endregion

    par.shape = shape;

    return par;
}

function drawKoTurnFrame2FrontShape(par) {

    /*функциЯ созданиЯ шейпа передней пластины второй рамки  забежной ступени
       €сходные данные: 
            M
            deltaXFrame
            holeRadScrew
            holeRadBolt
            heightFlan
            flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
                widthSideTop   - ширина верхнего бокового фланца
                deltaXCenterFrontFlan = { - смещение ординаты по оси • отверстий переднего фланца
                    left    
                    middle 
                    right  
                }
            }
       На выходе те же данные плюс следующие:
           shape - шейп передней пластины второй рамки
       */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthFront,
        height: par.heightFlan,
        holeDiam: par.holeRadScrew * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: par.flanParams.deltaXCenterFrontFlan.left,
        hole1Y: par.heightFlan / 2,
        hole2X: par.flanParams.deltaXCenterFrontFlan.middle,
        hole2Y: par.heightFlan / 2,
        hole3X: par.flanParams.widthFront - par.flanParams.deltaXCenterFrontFlan.right,
        hole3Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    par.shape = drawRectFlan(flanParams).shape;

    return par;
}

function drawKoTurnFrame2SideShape1(par) {

    /*функциЯ созданиЯ шейпа боковой левой пластины второй рамки  забежной ступени
        €сходные данные: 
             M
             deltaXFrame
             holeRadScrew
             holeRadBolt
             heightFlan
             flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
                widthSideTop   - ширина верхнего бокового фланца
            }
        На выходе те же данные плюс следующие:
            shape - шейп боковой левой пластины второй рамки
        */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthSideLeft,
        height: par.heightFlan,
        holeDiam: par.holeRadBolt * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: par.flanParams.widthSideLeft / 2,
        hole1Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    var centerHoles = [];
    centerHoles.push([flanParams.hole1X, flanParams.hole1Y]);

    par.centerHoles.frame2.out = centerHoles;
    par.shape = drawRectFlan(flanParams).shape;

    return par;
}

function drawKoTurnFrame2SideShape2(par) {

    /*функциЯ созданиЯ шейпа боковой правой пластины второй рамки  забежной ступени
        €сходные данные: 
             M
             deltaXFrame
             holeRadScrew
             holeRadBolt
             heightFlan
             flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
                widthSideTop   - ширина верхнего бокового фланца
            }
        На выходе те же данные плюс следующие:
            shape - шейп боковой правой пластины второй рамки
        */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthSideRight,
        height: par.heightFlan,
        holeDiam: par.holeRadBolt * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: par.flanParams.widthSideRight / 2,
        hole1Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    var centerHoles = [];
    centerHoles.push([flanParams.hole1X, flanParams.hole1Y]);

    par.centerHoles.frame2.inn = centerHoles;
    par.shape = drawRectFlan(flanParams).shape;

    return par;
}
//#endregion

/*** ”“НЉ–€€ ‘Ћ‡„ЂН€џ …‰ЏЋ‚ ’ђ…’њ…‰ ђЂЊЉ€ ***/


//#region элементы третьей рамки
function drawKoTurnFrame3TopShape(par) {

    /*функциЯ созданиЯ шейпа верхней пластины третьей рамки  забежной ступени
       €сходные данные: 
            M
            deltaXFrame
            holeRadScrew
            holeRadBolt
            heightFlan
            stepOffsetFront
       На выходе те же данные плюс следующие:
           shape - шейп верхней пластины третьей рамки
           flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
           pointAnchoringFlan = {
                pFlanFront      - точка привЯзки переднего фланца к верхней пластине
                pFlanSideRight  - точка привЯзки левого бокового фланца к верхней пластине
                pFlanSideLeft   - точка привЯзки правого бокового фланца к верхней пластине
            };
            par.lengthKo = {
                lengthTopInB3 - длина третьей проступи верхнего внутреннего косоура
                lengthTopOutB2 - длина второй проступи верхнего внешнего косоура
            }
       */
    var dxfBasePoint = par.dxfBasePoint;
    var holeRad = par.holeRadScrew;
    var widthTop = 40;
    var widthSideFlan = 90;

    //#region Љонтур верхней пластины
    var p0 = { x: 0, y: 0 };
    var pt1 = newPoint_xy(p0, 0, par.deltaXFrame);
    var pt11 = newPoint_xy(pt1, 100, 0);
    var pt2 = newPoint_xy(p0, par.stepOffsetFront, 0);
    var pt12 = polar(pt2, Math.PI * 2 / 3, 100);

    var p1 = itercection(pt1, pt11, pt2, pt12);
    var p2 = newPoint_xy(p1, widthSideFlan, 0);
    var p31 = newPoint_xy(p2, 0, par.M - par.deltaXFrame * 2);
    var p3 = itercection(p2, polar(p2, 105 * Math.PI / 180, 100), p31, polar(p31, 0, 100));
    var p4 = itercection(p1, polar(p1, Math.PI * 2 / 3, 100), p31, polar(p31, 0, 100));

    //контур забежной ступени
    var p1t = copyPoint(p0);
    var p2t = newPoint_xy(p1t, 55, 0);
    var p3t = newPoint_xy(p2t, 0, par.M);
    var p4t = itercection(p3t, newPoint_xy(p3t, 100, 0), pt1, polar(pt1, Math.PI * 2 / 3, 100));


    var shape = new THREE.Shape();
    var pArr = [p1, p2, p3, p4, p1]; // массив точек контура пластины
    addPath(shape, dxfPrimitivesArr, pArr, dxfBasePoint);
    //#endregion


    //вычислЯем и запоминаем длины длЯ косоуров
    par.lengthKo.lengthTopInB3 = distance(itercection(p1, p2, p2t, p3t), p1) - par.stringerThickness; //длина третьей проступи верхнего внутреннего косоура
    par.lengthKo.lengthTopOutB2 = distance(p4, itercection(p4, p3, p2t, p3t)); //длина второй проступи верхнего внешнего косоура

    //#region Џараметры фланцев
    //задаем ширину фланцев рамки
    par.flanParams = {
        widthFront: distance(p1, p4),    // ширина переднего фланца
        widthSideLeft: distance(p3, p4), // ширина левого бокового фланца
        widthSideRight: widthSideFlan               // ширина правого бокового фланца
    }

    //точки привЯзки фланцев к пластине
    par.pointAnchoringFlan = {
        pFlanFront: copyPoint(p1),
        pFlanSideRight: copyPoint(p1),
        pFlanSideLeft: copyPoint(p4)
    };
    //#endregion

    //#region отверстие в форме неправильного многоугольника со скругленными краЯми
    var li1 = parallel(p1, p4, widthTop);
    var li2 = parallel(p2, p3, -widthTop);
    var li3 = parallel(p3, p4, -widthTop);

    var pi1 = itercectionL(li1, li2);
    var pi2 = itercectionL(li2, li3);
    var pi3 = itercectionL(li1, li3);

    var hole = new THREE.Path();
    var vertexes = []; //массив вершин

    vertexes[0] = pi1;
    vertexes[1] = pi3;
    vertexes[2] = pi2;


    var filletParams = {
        vertexes: vertexes,
        cornerRad: 10,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
        type: "path"
    }

    hole = fiiletPathCorners(filletParams);
    shape.holes.push(hole);
    //#endregion

    //#region отверстиЯ по контуру
    //переднЯЯ пластина
    var pc1 = newPoint_xy(p1, 0, widthTop);
    var pc2 = newPoint_xy(p4, 60, -64);
    var pc3 = polar(pc1, calcAngleX1(pc1, pc2), distance(pc1, pc2) / 2);
    addRoundHole(shape, dxfPrimitivesArr, pc1, holeRad, dxfBasePoint);
    addRoundHole(shape, dxfPrimitivesArr, pc2, holeRad, dxfBasePoint);
    addRoundHole(shape, dxfPrimitivesArr, pc3, holeRad, dxfBasePoint);

    //заднЯЯ пластина
    var pc4 = newPoint_xy(p1, 59, widthTop);
    var pc5 = newPoint_xy(p3, -10, -widthTop);
    var pc6 = polar(pc4, calcAngleX1(pc4, pc5), distance(pc4, pc5) / 2);
    addRoundHole(shape, dxfPrimitivesArr, pc4, holeRad, dxfBasePoint);
    addRoundHole(shape, dxfPrimitivesArr, pc5, holeRad, dxfBasePoint);
    addRoundHole(shape, dxfPrimitivesArr, pc6, holeRad, dxfBasePoint);
    //#endregion

    par.shape = shape;

    return par;
}

function drawKoTurnFrame3FrontShape(par) {

    /*функциЯ созданиЯ шейпа передней пластины третьей рамки  забежной ступени
       €сходные данные: 
            M
            deltaXFrame
            holeRadScrew
            holeRadBolt
            heightFlan
       На выходе те же данные плюс следующие:
           shape - шейп передней пластины третьей рамки
           flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
       */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthFront,
        height: par.heightFlan,
        holeDiam: par.holeRadScrew * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: 30,
        hole1Y: par.heightFlan / 2,
        hole2X: par.flanParams.widthFront / 2,
        hole2Y: par.heightFlan / 2,
        hole3X: 30,
        hole3Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    par.shape = drawRectFlan(flanParams).shape;

    return par;
}

function drawKoTurnFrame3SideShape1(par) {

    /*функциЯ созданиЯ шейпа боковой левой пластины третьей рамки  забежной ступени
        €сходные данные: 
             M
             deltaXFrame
             holeRadScrew
             holeRadBolt
             heightFlan
           flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
        На выходе те же данные плюс следующие:
            shape - шейп боковой левой пластины третьей рамки
        */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthSideLeft,
        height: par.heightFlan,
        holeDiam: par.holeRadBolt * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: 25,
        hole1Y: par.heightFlan / 2,
        hole3X: 25,
        hole3Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    var centerHoles = [];
    centerHoles.push([flanParams.hole1X, flanParams.hole1Y]);
    centerHoles.push([flanParams.width - flanParams.hole3X, flanParams.hole3Y]);

	
    par.centerHoles.frame3.out = centerHoles;
    par.shape = drawRectFlan(flanParams).shape;

    return par;
}

function drawKoTurnFrame3SideShape2(par) {

    /*функциЯ созданиЯ шейпа боковой правой пластины третьей рамки  забежной ступени
        €сходные данные: 
             M
             deltaXFrame
             holeRadScrew
             holeRadBolt
             heightFlan
             flanParams = {
                widthFront     - ширина переднего фланца
                widthSideLeft  - ширина левого бокового фланца
                widthSideRight - ширина правого бокового фланца
            }
        На выходе те же данные плюс следующие:
            shape - шейп боковой правой пластины третьей рамки
        */
    var flanParams = { //объЯвление параметров фланца
        width: par.flanParams.widthSideRight,
        height: par.heightFlan,
        holeDiam: par.holeRadBolt * 2,
        angleRadUp: 0,
        angleRadDn: 0,
        hole1X: par.flanParams.widthSideRight / 2,
        hole1Y: par.heightFlan / 2,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr
    };

    var centerHoles = [];
    centerHoles.push([flanParams.hole1X, flanParams.hole1Y]);

    par.centerHoles.frame3.inn = centerHoles;
    par.shape = drawRectFlan(flanParams).shape;

    return par;
}
//#endregion

/*** ‚‘ЏЋЊЋѓЂ’…‹њ›Н… ‚Н“’ђ…НН€… ”“НЉ–€€ ***/


function itercectionL(line1, line2) {
    /*функциЯ возвращает координаты точки пересечениЯ лучей*/
    return itercection(line1.p1, line1.p2, line2.p1, line2.p2);
}

function createMesh(par) {
    /*функциЯ создает и возвращает меш обекта из шейпа переданного в par*/
    var extrudeOptions = {
        amount: par.frameMetalThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    }

    var geom = new THREE.ExtrudeGeometry(par.shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var mesh = new THREE.Mesh(geom, par.material);
    par.mesh = mesh;

    return par;
}


function drawHoles(centerHolesArr, basePoint, dx, stringerParams) {
    /*функция отрисовывает массив отверстий
        Входные данные: 
            centerHolesArr - массив ординат центра отвестий
            basePoint - базовая точка от которой строятся отверстия
            dx - длина смещения базовой точки по ординате х
     */
    var centerHoles = centerHolesArr;
    for (var i = 0; i < centerHoles.length; i++) {
        var hole = new THREE.Path();
        var center = newPoint_xy(basePoint, dx + centerHoles[i][0], -centerHoles[i][1]);
        addCircle(hole, dxfPrimitivesArr, center, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.stringerShape.holes.push(hole);
    }
}
