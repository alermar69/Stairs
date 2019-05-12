// Вывод каркаса всей лестницы
function drawCarcasStock(par) {

	par.mesh = new THREE.Object3D();
	par.angles = new THREE.Object3D();

	par.stringerParams = [];

	// Каркас марша

	par.stringerParams[1] = drawMarshStringerStock(par, 1);
	par.mesh.add(par.stringerParams[1].mesh);
	par.angles.add(par.stringerParams[1].angles);


	//Каркас верхней площадки
	if (params.platformTop !== 'нет') {
		par.stringerParams["topPlt"] = drawTopPlatformStringersStock(par);

		var stringersTop = par.stringerParams["topPlt"].mesh;
		stringersTop.position.x = par.treadsObj.lastMarshEnd.x;
		stringersTop.position.y = par.treadsObj.lastMarshEnd.y;
		stringersTop.position.z = par.treadsObj.lastMarshEnd.z;
		par.mesh.add(stringersTop);
	}

	//добор верхней площадки
	if (params.pltExtenderSide && params.pltExtenderSide != "нет") {
		var marshId = 1;
		var marshParams = getMarshParams(marshId);

		var extenderParams = {
			width: params.pltExtenderWidth,
			length: params.platformLength_3,
			material: params.materials.metal,
			coverMaterial: params.materials.metal2,
			coverThk: 6,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: { x: 0, y: 0 },
		};

		//если есть ограждение на последнем марше, уменьшаем длину добора
		var isOffsetLen = false;
		if (params.pltExtenderSide == "слева" && marshParams.hasRailing.in) isOffsetLen = true;
		if (params.pltExtenderSide == "справа" && marshParams.hasRailing.out) isOffsetLen = true;
		if (isOffsetLen) extenderParams.length -= marshParams.b / 2 + 40 / 2 + 5; //40 - ширина стойки

		extenderParams = drawExtender(extenderParams);
		var extender = extenderParams.mesh;
		extender.position.x = par.treadsObj.lastMarshEnd.x - extenderParams.length;
		extender.position.y = par.treadsObj.lastMarshEnd.y;

		extender.position.z = 0;
		if (params.pltExtenderSide == "справа") extender.position.z = params.M / 2 + params.pltExtenderWidth;
		if (params.pltExtenderSide == "слева") extender.position.z = -params.M / 2;
	
		par.mesh.add(extender);
	};

	//верхние фланцы
	if (params.topFlan == "есть") {
		var flansPar = {
			dxfBasePoint: par.dxfBasePoint,
		}
		var flansGroup = drawTopFixFlans(flansPar).mesh;
		flansGroup.rotation.y = par.treadsObj.lastMarshEnd.rot + Math.PI / 2;
		flansGroup.position.x = par.treadsObj.lastMarshEnd.x - 5;
		flansGroup.position.y = par.treadsObj.lastMarshEnd.y;
		flansGroup.position.z = par.treadsObj.lastMarshEnd.z;
		par.angles.add(flansGroup);

	}

	return par;
} //end of drawCarcasStock

// Вывод каркаса одного марша
function drawMarshStringerStock(par, marshId) {

	var mesh = new THREE.Object3D();
	var angles = new THREE.Object3D();

	stringerParams = {
		marshId: marshId,
		dxfBasePoint: par.dxfBasePoint,
		treadsObj: par.treadsObj,
	};
	calcStringerParams(stringerParams);

	//позиция косоуров по Z
	var posZOut = (params.M / 2 - stringerParams.stringerSideOffset) * turnFactor;
	if (turnFactor == 1) posZOut -= params.stringerThickness;

	var posZIn = - (params.M / 2 - stringerParams.stringerSideOffset) * turnFactor;
	if (turnFactor == -1) posZIn -= params.stringerThickness - 0.01

	var sideOut = "right";
	var sideIn = "left";
	if (turnFactor == -1) {
		sideIn = "left";
		sideOut = "right";
	}


	//внутренний косоур/тетива-----------------------------------------------------------------
	stringerParams.key = "in";
	var stringer1 = drawStringerStock(stringerParams).mesh;
	stringer1.position.x = -stringerParams.treadFrontOverHang;
	stringer1.position.z = posZIn;
	mesh.add(stringer1);

	//уголки на внутренней тетиве
	var anglesIn = drawCarcasAngles(stringerParams.carcasHoles, sideIn);
	anglesIn.position.x = stringer1.position.x;
	anglesIn.position.z = stringer1.position.z;
	if (sideIn == "left") anglesIn.position.z += params.stringerThickness;
	angles.add(anglesIn);


	// Соединительные фланцы на внутренней тетиве	
	var franPar = {
		carcasHoles: stringerParams.carcasHoles,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
		marshAng: stringerParams.marshAng,
		side: sideIn,
	}

	// Отрисовка фланцев 
	var flans = drawStringerFlans_all(franPar);
	flans.position.x = -5;
	flans.position.z = (params.M / 2 - stringerParams.stringerSideOffset - params.stringerThickness * 2)
	mesh.add(flans);



	//внешний косоур/тетива---------------------------------------------------------------------
	par.dxfBasePoint.x += stringerParams.lenX;
	stringerParams.dxfBasePoint = par.dxfBasePoint;
	stringerParams.key = "out";
	var stringer2 = drawStringerStock(stringerParams).mesh;
	stringer2.position.x = -stringerParams.treadFrontOverHang;
	stringer2.position.z = posZOut;
	mesh.add(stringer2);

	//уголки на внешней тетиве
	var anglesOut = drawCarcasAngles(stringerParams.carcasHoles, sideOut);
	anglesOut.position.x = -stringerParams.treadFrontOverHang
	anglesOut.position.z = stringer2.position.z;
	if (sideOut == "left") anglesOut.position.z += params.stringerThickness;
	angles.add(anglesOut);


	// Соединительные фланцы на внешней тетиве

	var franPar = {
		carcasHoles: stringerParams.carcasHoles,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
		marshAng: stringerParams.marshAng,
		side: sideOut,

	}

	// Отрисовка фланцев 
	var flans = drawStringerFlans_all(franPar);
	flans.position.x = -5;
	flans.position.z = -(params.M / 2 - stringerParams.stringerSideOffset - params.stringerThickness)
	mesh.add(flans);

	par.dxfBasePoint.x += stringerParams.lenX;
	
	var framesAmt = [];
	for (var i = 0; i < params.frameAmt_600; i++) {
		framesAmt.push(600);
	}
	for (var i = 0; i < params.frameAmt_800; i++) {
		framesAmt.push(800);
	}
	for (var i = 0; i < params.frameAmt_1000; i++) {
		framesAmt.push(1000);
	}

	//рамки ступеней
	var dxfBasePointFrame = {x: 0, y: -1000}
	var framePar = {
		length: framesAmt[0],
		holes: stringerParams.carcasHoles,
		dxfBasePoint: dxfBasePointFrame,
	}
	var frames = drawFramesStock(framePar);
	frames.position.x = -stringerParams.treadFrontOverHang;
	frames.position.z = stringer2.position.z;
	if (turnFactor == -1) frames.position.z = stringer1.position.z;
	angles.add(frames)


	// промежуточные косоуры широкого марша------------------------------------------------------
	var posZMiddle = posZIn;
	if (turnFactor == -1) posZMiddle = posZOut;
	for (var i = 1; i < framesAmt.length; i++) {
		posZMiddle += framesAmt[i] + params.stringerThickness;
		stringerParams.key = "in";
		stringerParams.isMiddleStringer = true;
		var stringerMiddle = drawStringerStock(stringerParams).mesh;
		stringerMiddle.position.x = -stringerParams.treadFrontOverHang;
		stringerMiddle.position.z = posZMiddle;
		mesh.add(stringerMiddle);

		//уголки на внутренней тетиве
		var anglesIn = drawCarcasAngles(stringerParams.carcasHoles, sideIn);
		anglesIn.position.x = stringerMiddle.position.x;
		anglesIn.position.z = stringerMiddle.position.z;
		if (sideIn == "left") anglesIn.position.z += params.stringerThickness;
		angles.add(anglesIn);

		//рамки ступеней
		dxfBasePointFrame.x += 1000;
		var framePar = {
			length: framesAmt[i],
			holes: stringerParams.carcasHoles,
			dxfBasePoint: dxfBasePointFrame,
		}
		var frames = drawFramesStock(framePar);
		frames.position.x = -stringerParams.treadFrontOverHang;
		frames.position.z = stringerMiddle.position.z;
		angles.add(frames)

		// Соединительные фланцы на внутренней тетиве	
		var franPar = {
			carcasHoles: stringerParams.carcasHoles,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
			marshAng: stringerParams.marshAng,
			side: sideIn,
		}

		// Отрисовка фланцев 
		var flans = drawStringerFlans_all(franPar);
		flans.position.x = -5;
		flans.position.z = stringerMiddle.position.z - params.stringerThickness;
		mesh.add(flans);

		par.dxfBasePoint.x += stringerParams.lenX;
	}

	//колонны
	var columns = drawColumnsStock(stringerParams);
	mesh.add(columns);

	stringerParams.mesh = mesh;
	stringerParams.angles = angles;

	return stringerParams;
}


function drawStringerStock(par) {
	//рассчитываем параметры косоура по номеру марша
	calcStringerPar(par); //функция в этом файле ниже
	par.partsLen = []; //массив длин кусков косоура для спецификации

	par.marshParams = getMarshParams(1);

	//именованные ключевые точки
	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};
	par.keyPoints[par.key].zeroPoint = { x: 0, y: 0 };
	par.zeroPoint = { x: 0, y: 5 };

	par.pointsShape = [];
	par.pointsShapeTop = [];
	par.pointsHole = [];
	par.pointsHoleTop = [];
	par.railingHoles = [];
	par.railingHolesTop = [];


	//подпись под контуром
	var name = "Тетива";

	var text = name + " внутр.";
	if (par.key === 'out') text = name + " внешн.";
	var isMirrow = false;
	if (turnFactor == 1 && par.key == "in") isMirrow = true;
	if (turnFactor == -1 && par.key == "out") isMirrow = true;
	if (isMirrow) text += " (зеркально)";
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 20, -150.0);
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);


	par.stringerShape = new THREE.Shape();
	par.stringerShapeTop = new THREE.Shape();

	// точки вставки уголков, рамок, перемычек
	if (!par.elmIns) par.elmIns = {};
	par.elmIns[par.key] = {};
	par.elmIns[par.key].racks = [];


	par.h = params.h1;
	par.a = params.a1;
	par.b = params.b1;
	par.stairAmt = params.stairAmt1;
	if (params.platformTop !== 'нет') par.stairAmt += 1;
	par.marshAng = Math.atan(par.h / par.b);
	par.stringerWidth = 150;
	par.holeFrameDist = 150;

	/*низ--------------------------------------------------------------------------*/
	var p0 = copyPoint(par.zeroPoint);
	var pt0 = newPoint_xy(p0, 0, 20);
	var p1 = newPoint_xy(p0, 0, par.h);
	var p2 = newPoint_xy(p1, par.b, 0);
	var ph = copyPoint(p1);

	// нижний край тетивы
	var p20 = newPoint_xy(p2, par.stringerWidth / Math.sin(par.marshAng), 0.0)// первая точка на нижней линии марша
	var p21 = polar(p20, par.marshAng, 100.0); // вторая точка на нижней линии
	var botLineP1 = itercection(pt0, polar(pt0, 0, 100), p20, p21); 

	// срез передней кромки
	var botLineP3 = newPoint_xy(p0, 0.0, 100.0);
	var botLineP2 = itercection(botLineP3, polar(botLineP3, Math.PI * (5 / 3), 100), pt0, polar(pt0, 0, 100));//точка пересечения переднего среза и нижней линии

	if (par.isMiddleStringer) {
		p1 = newPoint_xy(p1, 17.5, -25);
		p2 = newPoint_xy(p1, par.b + 27, 0);		
		botLineP3 = itercection(botLineP2, polar(botLineP2, Math.PI * (5 / 3), 100), p1, polar(p1, Math.PI / 2, 100))
		p1.filletRad = 0; //угол не скругляется
	}

	//сохраняем точку для расчета длины
	par.keyPoints.botPoint = copyPoint(botLineP3);

	//сохраняем точки контура
	par.pointsShape.push(botLineP1);
	par.pointsShape.push(botLineP2);
	par.pointsShape.push(botLineP3);
	par.pointsShape.push(p1);
	par.pointsShape.push(p2);

	// отверстия под нижний крепежный уголок
	var center1 = newPoint_xy(botLineP1, -80, 35);
	var center2 = newPoint_xy(center1, 60, 0.0);
	center1.hasAngle = center2.hasAngle = true;
	center1.pos = center2.pos = "botFloor";
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// отверстия под рамку ступени
	center1 = newPoint_xy(ph, 77.5, -45);
	center2 = newPoint_xy(center1, par.holeFrameDist, 0);
	center1.isFrame = center2.isFrame = true;
	if (par.isMiddleStringer) center1.noZenk = center2.noZenk = true;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	//Отверстия под ограждения
	if (!par.isMiddleStringer) {
		center1 = newPoint_xy(center1, 150 / 2, 0);
		par.railingHoles.push(center1);
	}


	/*средние ступени---------------------------------------------------------------*/
	if (par.stairAmt > 2) {
		for (var i = 0; i < par.stairAmt - 2; i++) {
			pt1 = newPoint_xy(p2, 0, par.h);
			pt2 = newPoint_xy(pt1, par.b, 0);
			var ph = copyPoint(pt1);

			if (par.isMiddleStringer) {
				pt1.x -= 27
				pt1.filletRad = pt2.filletRad = 0; //угол не скругляется

				var pv1 = newPoint_xy(p2, 0, 25);
				var pv2 = newPoint_xy(p2, -27, 135);
				pv1.filletRad = 0; //угол не скругляется

				par.pointsShape.push(pv1);
				par.pointsShape.push(pv2);
			}

			par.pointsShape.push(pt1);
			par.pointsShape.push(pt2);
			p2 = copyPoint(pt2);

			// отверстия под рамку ступени
			center1 = newPoint_xy(ph, 77.5, -45);
			if (par.isMiddleStringer) center1 = newPoint_xy(center1, -17.5 - 27, 25);
			center2 = newPoint_xy(center1, par.holeFrameDist, 0);
			center1.isFrame = center2.isFrame = true;
			if (par.isMiddleStringer) center1.noZenk = center2.noZenk = true;
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);

			//Отверстия под ограждения
			if (!par.isMiddleStringer) {
				if ((i == 1 && par.stairAmt == 5) || (i == 2 && par.stairAmt == 6)) {
					center1 = newPoint_xy(center1, 150 / 2, 0);
					par.railingHoles.push(center1);
				}
			}
		}
	}


	/*вверх-------------------------------------------------------------------------*/
	var p3 = newPoint_xy(p2, 0, par.h);
	var topLineP1 = newPoint_xy(p3, par.a, 0.0);
	var topLineP2 = newPoint_xy(topLineP1, 0.0, -190);
	var topLineP3 = itercection(topLineP2, polar(topLineP2, 0, 100), p20, p21);
	topLineP1.filletRad = topLineP2.filletRad = 0; //угол не скругляется
	var ph = copyPoint(p3);

	if (par.isMiddleStringer) {
		p3.x -= 27;
		topLineP1.x -= 27 + 17.5;
		topLineP2.x -= 27 + 17.5;
		topLineP2.y += 25;
		topLineP3 = itercection(topLineP2, polar(topLineP2, 0, 100), p20, p21);
		var pt1 = newPoint_xy(p2, 0, 25);
		var pt2 = newPoint_xy(p2, -27, 135);
		p3.filletRad = pt1.filletRad = pt2.filletRad = 0; //угол не скругляется

		par.pointsShape.push(pt1);
		par.pointsShape.push(pt2);
	}

	//сохраняем точку для расчета длины
	par.keyPoints.topPoint = copyPoint(topLineP1);

	//сохраняем точки контура
	par.pointsShape.push(p3);
	par.pointsShape.push(topLineP1);
	par.pointsShape.push(topLineP2);
	par.pointsShape.push(topLineP3);

	if (params.platformTop == 'площадка') {
		var pt1 = copyPoint(topLineP1);
		var pt4 = copyPoint(topLineP2);
		var pt2 = newPoint_xy(pt1, params.topPltLength_stock - 300, 0);
		var pt3 = newPoint_xy(pt4, params.topPltLength_stock - 300, 0);

		pt1.filletRad = pt2.filletRad = pt3.filletRad = pt4.filletRad = 0; //угол не скругляется
		par.pointsShapeTop.push(pt4);
		par.pointsShapeTop.push(pt1);
		par.pointsShapeTop.push(pt2);
		par.pointsShapeTop.push(pt3);

		//сохраняем длину для спецификации
		par.partsLen.push(distance(pt1, pt2))
	}

	// отверстия под верхний крепежный уголок или под соединительный фланец
	center1 = newPoint_xy(topLineP2, -40, 23 + 60);
	center2 = newPoint_xy(center1, 0.0, -60);
	if (params.platformTop == 'нет') {
		center1.hasAngle = center2.hasAngle = true;
		center1.pos = center2.pos = "topFloor";
	}
	else {
		center1.isTopFlanHole = center2.isTopFlanHole = true;
		center1.pos = "topLeft";
		center2.pos = "botLeft";
	}
	par.pointsHole.push(center2);
	par.pointsHole.push(center1);

	
	if (params.platformTop !== 'нет') {	
		par.colPoint2 = copyPoint(center1);

		// отверстия под соединительный фланец
		center1 = newPoint_xy(topLineP2, 40, 23 + 60);
		center2 = newPoint_xy(center1, 0.0, -60);
		center1.isTopFlanHole = center2.isTopFlanHole = true;
		center1.pos = "topRight"; 
		center2.pos = "botRight";
		par.pointsHoleTop.push(center2);
		par.pointsHoleTop.push(center1);

		// отверстия по середине соединительного фланца для крепления колонны
		if (!par.isMiddleStringer) {
			if ((params.isColumnTop2 && par.key == 'out') || (params.isColumnTop4 && par.key == 'in')) {
				center3 = newPoint_xy(center1, -40, 0);
				center4 = newPoint_xy(center3, 0.0, -60);
				center3.isTopFlanHole = center4.isTopFlanHole = true;
				center3.noDraw = center4.noDraw = true;
				center3.dz = center4.dz = params.stringerThickness;
				center3.pos = "topMidle";
				center4.pos = "botMidle";
				par.pointsHoleTop.push(center3);
				par.pointsHoleTop.push(center4);
			}
		}

		// отверстия под рамку ступени		
		center1 = newPoint_xy(pt1, 72.5, -45);
		if (par.isMiddleStringer) center1.y += 25;
		center2 = newPoint_xy(center1, par.holeFrameDist, 0);
		center1.isFrame = center2.isFrame = true;
		if (par.isMiddleStringer) center1.noZenk = center2.noZenk = true;
		par.pointsHoleTop.push(center1);
		par.pointsHoleTop.push(center2);

		var countFrame = (params.topPltLength_stock - 300) / 300;
		for (var j = 1; j < countFrame; j++) {
			center1 = newPoint_xy(center2, par.holeFrameDist, 0);
			center2 = newPoint_xy(center1, par.holeFrameDist, 0);
			center1.isFrame = center2.isFrame = true;
			if (par.isMiddleStringer) center1.noZenk = center2.noZenk = true;
			par.pointsHoleTop.push(center1);
			par.pointsHoleTop.push(center2);
		}

		//Отверстия под ограждения
		if (par.hasPltRailing && !par.isMiddleStringer) {
			center1 = newPoint_xy(center1, 150 / 2, 0);
			par.railingHolesTop.push(center1);
		}

		// отверстия под верхний крепежный уголок
		center1 = newPoint_xy(pt3, -40, 23 + 60);
		center2 = newPoint_xy(center1, 0.0, -60);
		center1.hasAngle = center2.hasAngle = true;
		center1.pos = center2.pos = "topFloor";
		par.pointsHoleTop.push(center2);
		par.pointsHoleTop.push(center1);
		if (!par.isMiddleStringer) {
			if ((params.isColumnTop1 && par.key == 'in') || (params.isColumnTop3 && par.key == 'out')) {
				center1.noZenk = center2.noZenk = true;
				center1.noBoltsInSide2 = center2.noBoltsInSide2 = true;
			}
		}

		par.colPoint1 = copyPoint(center1);
	}

	// отверстия под рамку ступени
	center1 = newPoint_xy(ph, 77.5, -45);
	if (par.isMiddleStringer) center1 = newPoint_xy(center1, -17.5 - 27, 25);
	center2 = newPoint_xy(center1, par.holeFrameDist, 0);
	center1.isFrame = center2.isFrame = true;
	if (par.isMiddleStringer) center1.noZenk = center2.noZenk = true;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	//Отверстия под ограждения
	if (!par.isMiddleStringer) {
		center1 = newPoint_xy(center1, 150 / 2, 0);
		par.railingHoles.push(center1);
	}

	


	var radIn = 5;
	var radOut = 10;

	//создаем шейп
	var shapePar = {
		points: par.pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		radIn: radIn, //Радиус скругления внутренних углов
		radOut: radOut, //радиус скругления внешних углов
		//markPoints: true,
	}

	par.stringerShape = drawShapeByPoints2(shapePar).shape;

	//рисуем отверстия
	drawStringerHoles(par);

	//добавляем отверстия под ограждения
	var railingHolesPar = {
		shape: par.stringerShape,
		holeCenters: par.railingHoles,
		dxfBasePoint: par.dxfBasePoint,
	}
	drawRailingHoles(railingHolesPar);


	if (par.pointsShapeTop.length > 0) {
		//создаем шейп
		var shapePar = {
			points: par.pointsShapeTop,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			radIn: radIn, //Радиус скругления внутренних углов
			radOut: radOut, //радиус скругления внешних углов
			//markPoints: true,
		}

		//параметры для рабочего чертежа
		shapePar.drawing = {
			name: "Косоур верхний",
			group: "stringers",
		}

		par.stringerShapeTop = drawShapeByPoints2(shapePar).shape;

		//рисуем отверстия
		drawStringerHoles(par, "top");

		//добавляем отверстия под ограждения
		var railingHolesPar = {
			shape: par.stringerShapeTop,
			holeCenters: par.railingHolesTop,
			dxfBasePoint: par.dxfBasePoint,
		}
		drawRailingHoles(railingHolesPar);
	}


	par.mesh = new THREE.Object3D();

	var stringerExtrudeOptions = {
		amount: params.stringerThickness - 0.01,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, stringerExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom, params.materials.metal);
	par.mesh.add(mesh);

	//верхний доп. кусок
	if (par.pointsShapeTop.length > 0) {
		var geom = new THREE.ExtrudeGeometry(par.stringerShapeTop, stringerExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geom, params.materials.metal);
		par.mesh.add(mesh);
	}


	//формируем единый массив центров отверстий косоура для вставки уголков, рамок, колонн и т.п.
	par.carcasHoles = [];
	par.carcasHoles.push(...par.pointsHole, ...par.pointsHoleTop);

	//формируем единый массив центров отверстий для ограждений
	stringerParams.elmIns[stringerParams.key].racks.push(...par.railingHoles, ...par.railingHolesTop)

	//рассчитываем размер косоура по X для расчета dxfBasePoint для следующего косоура
	par.lenX = par.b * par.stairAmt + 500;
	if (params.platformTop !== 'нет') par.lenX += pt2.x - pt1.x;

	//линия между верхней и нижней точками
	if (par.keyPoints.botPoint && par.keyPoints.topPoint) {
		var trashShape = new THREE.Shape();
		var layer = "comments";
		addLine(trashShape, dxfPrimitivesArr, par.keyPoints.botPoint, par.keyPoints.topPoint, par.dxfBasePoint, layer);
		par.partsLen.push(distance(par.keyPoints.botPoint, par.keyPoints.topPoint));
	}
	//сохраняем данные для спецификации
	if (!par.partsLen[0]) par.partsLen[0] = 0;

	//болты в отверстиях под рамки
	if (typeof anglesHasBolts != "undefined" && anglesHasBolts) { //anglesHasBolts - глобальная переменная
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
		};
		for (var i = 0; i < par.carcasHoles.length; i++) {
			if (par.carcasHoles[i].isFrame || par.carcasHoles[i].noZenk) {
				if (par.carcasHoles[i].noZenk) {
					boltPar.len = 40;
					boltPar.headType = "шестигр.";
				}
				else {
					boltPar.len = 30;
					boltPar.headType = "потай";
				}
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = par.carcasHoles[i].x;
				bolt.position.y = par.carcasHoles[i].y;
				bolt.position.z = boltPar.len / 2;
				if (par.isMiddleStringer) bolt.position.z -= 8;
				if (par.key == 'out') {
					bolt.rotation.x = -Math.PI / 2;
					bolt.position.z = -boltPar.len / 2 + params.stringerThickness;
				}
				if (turnFactor == -1 && !par.isMiddleStringer) {
					bolt.rotation.x = -Math.PI / 2;
					bolt.position.z = -boltPar.len / 2 + params.stringerThickness;
					if (par.key == 'out') {
						bolt.rotation.x = Math.PI / 2;
						bolt.position.z = boltPar.len / 2;
					}
				}
				par.mesh.add(bolt);
			}
		}

	}


	var partName = "stringer";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: name,
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
			}
		}
		var stringerNname = (par.key === 'out' ? 'внешн. ' : 'внутр. ') + par.marshId + " марш";

		for (var i = 0; i < par.partsLen.length; i++) {
			var name = stringerNname + " L=" + Math.round(par.partsLen[i]);
			var area = 300 * par.partsLen[i] / 1000000;

			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
			specObj[partName]["area"] += area;
			specObj[partName]["paintedArea"] += area * 2;
		}

	}

	return par;
} //end of drawStringerStock


/** @description функция отрисовки рамок ступеней
 * @return mesh
 */
function drawFramesStock(par) {
	var frames = new THREE.Object3D;
	
	for (var i = 0; i < par.holes.length - 1; i++) {
		if (par.holes[i].isFrame) {
			var frame = drawTreadFrameStock(par);
			frame.position.x = par.holes[i].x;
			frame.position.y = par.holes[i].y;
			frames.add(frame);

			par.dxfBasePoint.x += 150;
			i++; //пропускаем следующее отверстие
		}
	}

	return frames;

}//end of drawFrames

function drawTreadFrameStock(par) {

	// создаем меш
	var mesh = new THREE.Object3D();

	par.width = 270;
	par.profWidth = 20;
	par.profHeight = 40;
	par.sideHolePosX = par.profWidth + 40;


	// создаем рамку
	var frame = new THREE.Object3D();

	// определяем параметры профиля
	var profPar = {
		partName: "frameProf",
		type: "rect",
		poleProfileY: par.profHeight,
		poleProfileZ: par.profWidth,
		length: par.length,
		poleAngle: 0,
		material: params.materials.metal,
		dxfBasePoint: { x: 0, y: 0 },
		dxfArr: [], //профиль не выводим в dxf
		sectText: "",
		handrailMatType: "metal"
	};

	// передний профиль рамки
	var pole = drawPole3D_4(profPar).mesh;
	pole.rotation.y = - Math.PI / 2;
	pole.position.x = par.profWidth;
	pole.position.y = - par.profHeight;
	pole.position.z = 0;
	frame.add(pole);

	// задний профиль рамки
	var pole = drawPole3D_4(profPar).mesh;
	pole.rotation.y = - Math.PI / 2;
	pole.position.x = par.width;
	pole.position.y = - par.profHeight;
	pole.position.z = 0;
	frame.add(pole);


	// определяем параметры бокового фланца
	var flanPar = {
		width: 40,
		height: par.width - 2 * par.profWidth,
		thk: 8,
		roundHoleCenters: [],
		holeRad: 6.5,
		noBolts: true,
		dxfBasePoint: par.dxfBasePoint,
	};

	var flanSideWidth = flanPar.width;

	// определяем параметры отверстия фланца
	var center1 = {x: flanPar.width / 2, y: 40};
	var center2 = newPoint_xy(center1, 0, 150);	
	var center3 = newPoint_xy(center1, 0, 150 / 2);	

	// добавляем параметры отверстий в свойства фланца
	flanPar.roundHoleCenters.push(center1, center2, center3);

	// создаем левый боковой фланец
	var sideFlan1 = drawRectFlan2(flanPar).mesh;
	sideFlan1.position.x = flanPar.height + par.profWidth;
	sideFlan1.position.y = - flanPar.width;
	sideFlan1.position.z = 0;
	sideFlan1.rotation.z = Math.PI / 2;
	frame.add(sideFlan1);

	// создаем правый боковой фланец
	flanPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -flanPar.height - 50);
	
	var sideFlan2 = drawRectFlan2(flanPar).mesh;
	sideFlan2.rotation.z = Math.PI / 2;
	sideFlan2.position.x = sideFlan1.position.x
	sideFlan2.position.y = - flanPar.width;
	sideFlan2.position.z = par.length - flanPar.thk;
	frame.add(sideFlan2);

	
	// определяем параметры верхней перемычки
	var flanPar = {
		width: 25,
		height: par.width - 2 * par.profWidth,
		thk: 4,
		roundHoleCenters: [],
		holeRad: 4,
		noBolts: true,
		dxfBasePoint: par.dxfBasePoint,
	};

	flanPar.dxfBasePoint = newPoint_xy(flanPar.dxfBasePoint, 0, flanPar.height + 150);

	// определяем параметры отверстия фланца
	var center1 = { x: flanPar.width / 2, y: 40 };
	var center2 = newPoint_xy(center1, 0, 150);

	// добавляем параметры отверстий в свойства фланца
	flanPar.roundHoleCenters.push(center1, center2);

	// левая верхняя перемычка
	var topFlan1 = drawRectFlan2(flanPar).mesh;
	topFlan1.position.x = flanPar.height + par.profWidth;
	topFlan1.position.y = 0;
	topFlan1.position.z = 40;
	topFlan1.rotation.x = Math.PI / 2;
	topFlan1.rotation.z = Math.PI / 2;
	frame.add(topFlan1);

	// левая верхняя перемычка
	var topFlan1 = drawRectFlan2(flanPar).mesh;
	topFlan1.position.x = flanPar.height + par.profWidth;
	topFlan1.position.y = 0;
	topFlan1.position.z = par.length - 40;
	topFlan1.rotation.x = Math.PI / 2;
	topFlan1.rotation.z = Math.PI / 2;
	frame.add(topFlan1);


	// средняя перемычка из профильной трубы
	var profPar = {
		partName: "frameProf",
		poleProfileY: 20,
		poleProfileZ: 20,
		length: par.width - par.profWidth * 2,
		poleAngle: 0,
		dxfBasePoint: { x: 0, y: 0 },
		dxfArr: [], //профиль не выводим в dxf
		sectText: "",
		handrailMatType: "metal"
	};

	var pole = drawPole3D_4(profPar).mesh;
	pole.position.x = par.profWidth;
	pole.position.y = -profPar.poleProfileY;
	pole.position.z = -profPar.poleProfileZ / 2 + par.length / 2;
	frame.add(pole);


	//сохраняем данные для спецификации
	var partName = "treadFrame";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Рамка прямая",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
			}
		}
		var name = Math.round(par.length) + "x" + Math.round(par.width) + "x" + par.profHeight;
		if (par.profBridgeAmt > 0) name += " перемычки " + profPar.poleProfileY + "х" + profPar.poleProfileZ + " " + par.profBridgeAmt + " шт.";
		else name += " без перемычек";
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	// позиционируем рамку
	frame.position.x = - par.sideHolePosX;
	frame.position.y = flanSideWidth / 2;
	frame.position.z = -par.length;
	mesh.add(frame);

	return mesh;

} //end of drawTreadFrameStock

// функция отрисовки колонн
function drawColumnsStock(par) {

	var mesh = new THREE.Object3D();

	if (params.platformTop !== 'нет' && params.topPltColumns != "нет") {
		var colParams = {
			key: 'in',
			length: par.colPoint1.y - 89, //переопределяется в цикле
			profWidth: 40,
			profHeight: 40,
			material: params.materials.metal,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			text: "",
		}

		if (params.isColumnTop1) {
			colParams = drawColumnF(colParams);
			var col1 = colParams.mesh;
			col1.position.x = par.colPoint1.x - 5;
			col1.position.z = - params.M / 2 + params.stringerThickness + 8;
			mesh.add(col1);
			colParams.dxfBasePoint.x += 200;
		}
		if (params.isColumnTop2) {
			colParams = drawColumnF(colParams);
			var col1 = colParams.mesh;
			col1.position.x = par.colPoint2.x - 5 + 40;
			col1.position.z = - params.M / 2 + params.stringerThickness + 8;
			mesh.add(col1);
			colParams.dxfBasePoint.x += 200;
		}
		if (params.isColumnTop3) {
			colParams = drawColumnF(colParams);
			var col1 = colParams.mesh;
			col1.position.x = par.colPoint1.x - 5;
			col1.position.z = +params.M / 2 - params.stringerThickness - 8;
			col1.rotation.y = Math.PI;
			mesh.add(col1);
			colParams.dxfBasePoint.x += 200;
		}
		if (params.isColumnTop4) {
			colParams = drawColumnF(colParams);
			var col1 = colParams.mesh;
			col1.position.x = par.colPoint2.x - 5 + 40;
			col1.position.z = +params.M / 2 - params.stringerThickness - 8;
			col1.rotation.y = Math.PI;
			mesh.add(col1);
			colParams.dxfBasePoint.x += 200;
		}		
	}

	return mesh;
}

// каркас верхней площадки
function drawTopPlatformStringersStock(par) {
	var mesh = new THREE.Object3D();
	var angles = new THREE.Object3D();

	var stringerParams = {
		marshId: 1,
		dxfBasePoint: par.dxfBasePoint,
		treadsObj: par.treadsObj,
	};


	//задняя тетива верхней площадки
	if ((params.platformTop == "площадка" || params.platformTop == "увеличенная") && params.platformRearStringer == "есть") {

		var rearStringer = drawTopPltStringerStock(stringerParams).mesh;
		rearStringer.position.x = 0;
		rearStringer.rotation.y = Math.PI / 2;
		if (params.platformTop == 'увеличенная') {
			rearStringer.position.z = -params.stringerThickness;
			if (turnFactor == -1) rearStringer.position.z = 0;

			if (turnFactor == 1) {
				rearStringer.position.z = (params.platformWidth_3 - params.M);
			}
		}		

		mesh.add(rearStringer);
	}

	//каркас увеличенной верхней площадки
	if (params.platformTop == 'увеличенная' && params.platformWidth_3 > params.M) {

	}

	stringerParams.mesh = mesh;
	stringerParams.angles = angles;

	return stringerParams;
}

/**
 * Задний косоур верхней площадки
 */
function drawTopPltStringerStock(par) {

	par.pointsShape = [];
	par.pointsHole = [];
	par.railingHoles = [];

	par.carcasHoles = [];
	par.key = "rear";

	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};

	par.dxfBasePoint.x += params.M / 2;

	var p0 = { x: -params.M / 2, y: -185 };
	var p1 = newPoint_xy(p0, 0, 190);
	var p2 = newPoint_xy(p1, params.M, 0);
	var p3 = newPoint_xy(p0, params.M, 0);
	p0.filletRad = p1.filletRad = p2.filletRad = p3.filletRad = 0; //угол не скругляется
	par.pointsShape = [p0, p1, p2, p3];

	// отверстия под крепежный уголок
	//левый
	center1 = newPoint_xy(p0, 58, 23 + 60);
	center2 = newPoint_xy(center1, 0.0, -60);
	par.pointsHole.push(center2);
	par.pointsHole.push(center1);

	//правый
	center1 = newPoint_xy(p3, -58, 23 + 60);
	center2 = newPoint_xy(center1, 0.0, -60);
	par.pointsHole.push(center2);
	par.pointsHole.push(center1);

	//средние
	var framesAmt = [];
	for (var i = 0; i < params.frameAmt_600; i++) {
		framesAmt.push(600);
	}
	for (var i = 0; i < params.frameAmt_800; i++) {
		framesAmt.push(800);
	}
	for (var i = 0; i < params.frameAmt_1000; i++) {
		framesAmt.push(1000);
	}

	var dx = 0;
	for (var i = 1; i < framesAmt.length; i++) {
		dx += framesAmt[i] + params.stringerThickness;
		center1 = newPoint_xy(p3, -58 - dx, 23 + 60);
		center2 = newPoint_xy(center1, 0.0, -60);
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
	}

	//отверстия под ограждения
	par.elmIns = {};
	par.elmIns[par.key] = {};
	par.elmIns[par.key].racks = [];

	//левая крайняя стойка
	center1 = newPoint_xy(p1, 160, -45);
	par.elmIns[par.key].racks.push(center1);

	//правая крайняя стойка
	center1 = newPoint_xy(p2, -160, -45);
	par.elmIns[par.key].racks.push(center1);



	//создаем шейп
	var shapePar = {
		points: par.pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}

	par.stringerShape = drawShapeByPoints2(shapePar).shape;

	//рисуем отверстия
	drawStringerHoles(par);

	//добавляем отверстия под ограждения

	var railingHolesPar = {
		shape: par.stringerShape,
		holeCenters: par.elmIns[par.key].racks,
		dxfBasePoint: par.dxfBasePoint,
	}
	drawRailingHoles(railingHolesPar);

	var extrudeOptions = {
		amount: params.stringerThickness - 0.01,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	//косоур на марше
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Mesh(geom, params.materials.metal);
	par.mesh.position.x = 0.01;
	if (params.platformTop == "увеличенная" && turnFactor == 1) {
		par.mesh.position.z += params.platformWidth_3 - params.M;
	}
	

	//сохраняем данные для спецификации
	var partName = "pltStringer";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Тетива площадки",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
			}
		}
		var name = params.M + "x" + 190;
		var area = params.M * 190 / 1000000;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}

	return par;
} //end of drawTopPltStringerStock















function drawStringerFlan(par) {

	par.mesh = new THREE.Object3D();

	if (par.topLeft && par.botLeft && par.botRight && par.topRight) {

		var holeOffset = 20; //отступ центра отверстия от края фланца
		var frontHoleOffset = 20;

		if (par.key == "middle") {
			var frontHoleOffset = 30; //отступ переднего края фланца
			if (hasTreadFrames()) frontHoleOffset = 55;
			if (params.stairType == "рифленая сталь" || params.stairType == "лотки" || params.stairType == "пресснастил") frontHoleOffset = 30;
			if (params.stringerType == "прямая") frontHoleOffset = 20;
			if (params.model == "ко") frontHoleOffset = 45;
		}

		var botRightHole = newPoint_xy(par.botRight, 0, 0);

		// корректировка нижнего правого угла фланца
		if ((par.key == "middle") && (params.stringerType != "ломаная")) {
			botRightHole.x += (par.topRight.x - par.botRight.x) - (par.topRight.y - par.botRight.y) / Math.tan(par.marshAng);
		}

		var topLine = parallel(par.topLeft, par.topRight, holeOffset);
		var botLine = parallel(par.botLeft, botRightHole, -holeOffset);
		var rightLine = parallel(botRightHole, par.topRight, -holeOffset);
		var leftLine = parallel(par.botLeft, par.topLeft, frontHoleOffset);

		var p1 = itercection(botLine.p1, botLine.p2, leftLine.p1, leftLine.p2);
		var p2 = itercection(topLine.p1, topLine.p2, leftLine.p1, leftLine.p2);
		var p3 = itercection(topLine.p1, topLine.p2, rightLine.p1, rightLine.p2);
		var p4 = itercection(botLine.p1, botLine.p2, rightLine.p1, rightLine.p2);

		var pointsShape = [p1, p2, p3, p4];

		//создаем шейп
		var shapePar = {
			points: pointsShape,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, par.botRight.x - par.botLeft.x + 100, -(par.topLeft.y - par.botLeft.y) - 100),
		}
		par.flanShape = drawShapeByPoints2(shapePar).shape;

		var holesPar = {
			holeArr: par.holeCenters,
			dxfBasePoint: shapePar.dxfBasePoint,
			shape: par.flanShape,
		}
		addHolesToShape(holesPar);

		var thk = 8.0;
		var flanExtrudeOptions = {
			amount: thk,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var geom = new THREE.ExtrudeGeometry(par.flanShape, flanExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geom, params.materials.metal);

		par.mesh.add(mesh);


		/* болты */

		if (typeof anglesHasBolts != "undefined" && anglesHasBolts && !par.noBolts) { //глобальная переменная
			var side = par.side;
			if (params.stairModel == "Прямая") {
				if (par.side == "left") side = "right";
				if (par.side == "right") side = "left";
			}
			var boltPar = {
				diam: boltDiam,
				len: boltLen,
			}
			for (var i = 0; i < par.holeCenters.length; i++) {
				if (!par.holeCenters[i].hasAngle && !par.holeCenters[i].noBolt) {
					if (par.holeCenters[i].headType) boltPar.headType = par.holeCenters[i].headType;
					else boltPar.headType = false;
					if (par.holeCenters[i].boltLen) boltPar.len = par.holeCenters[i].boltLen;
					else boltPar.len = boltLen;
					var bolt = drawBolt(boltPar).mesh;
					bolt.rotation.x = Math.PI / 2 * turnFactor;
					bolt.position.x = par.holeCenters[i].x;
					bolt.position.y = par.holeCenters[i].y;
					bolt.position.z = (boltPar.len / 2 - params.stringerThickness) * turnFactor + params.stringerThickness * (1 - turnFactor) * 0.5;
					if (par.holeCenters[i].dz) bolt.position.z += par.holeCenters[i].dz;
					if (side == "right") {
						bolt.position.z = (params.stringerThickness * 2 - boltPar.len / 2) * turnFactor + params.stringerThickness * (1 - turnFactor) * 0.5;
						bolt.rotation.x = -Math.PI / 2 * turnFactor;
						if (par.holeCenters[i].dz) bolt.position.z -= par.holeCenters[i].dz;
					}
					par.mesh.add(bolt)
				}
			}
		}

		//сохраняем данные для спецификации
		var flanWidth = Math.round(distance(p1, p2))
		var flanLen = Math.round(p3.x - p1.x)
		var partName = "stringerFlan";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Фланец соединения косоуров",
					area: 0,
					paintedArea: 0,
					metalPaint: true,
					timberPaint: false,
					division: "metal",
					workUnitName: "area", //единица измерения
					group: "Каркас",
				}
			}
			var name = flanLen + "x" + flanWidth;
			var area = flanLen * flanWidth / 1000000;
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
			specObj[partName]["area"] += area;
			specObj[partName]["paintedArea"] += area * 2;
		}

		return par.mesh;
	}
	return null;

} //end of drawStringerFlan

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

	if (params.fixPart1 != "нет" && params.fixPart1 != "не указано") {
		var fixPar = getFixPart(1, 'botFloor');
		flanParams.holeDiam = fixPar.diam + 1;
	}

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
	if (params.calcType == "vhod" && params.staircaseType == "Готовая") flan.position.y += 10;
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
	if (params.calcType == "vhod" && params.staircaseType == "Готовая") bolt.position.y += 10;
	bolt.position.z = (flan.position.z - flanParams.height / 2);
	bolt.rotation.x = 0.0;
	bolt.rotation.y = 0.0;
	bolt.rotation.z = 0.0;
	bolt.castShadow = true;
	leg.add(bolt);

	/* болты крепления к нижнему перекрытию */
	if (typeof isFixPats != "undefined" && isFixPats) { //глобальная переменная
		if (params.fixPart1 != "нет" && params.fixPart1 != "не указано") {
			var fixPar = getFixPart(1, 'botFloor');
			fixPar.thickness = thickness;
			var holeXY = 15;

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = flan.position.x + holeXY;
			fix.position.y = flan.position.y;
			fix.position.z = flan.position.z - holeXY;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += thickness;
			}
			leg.add(fix);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = flan.position.x + flanParams.width - holeXY;
			fix.position.y = flan.position.y;
			fix.position.z = flan.position.z - holeXY;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += thickness
			}
			leg.add(fix);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = flan.position.x + holeXY;
			fix.position.y = flan.position.y;
			fix.position.z = flan.position.z - flanParams.height + holeXY;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += thickness;
			}
			leg.add(fix);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = flan.position.x + flanParams.width - holeXY;
			fix.position.y = flan.position.y;
			fix.position.z = flan.position.z - flanParams.height + holeXY;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += thickness
			}
			leg.add(fix);
		}
	}

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


function drawBolt(par) {
	/*
	diam
	len
	headType
	*/

	par.mesh = new THREE.Object3D();
	if (!par.headType) {
		par.headType = "потай";
		if (par.len == 40 || params.boltHead == "hexagon") par.headType = "шестигр.";
	}

	var headHeight = 4;

	var boltColor = "#808080"; //серый для странных болтов	
	if (par.len == 20) boltColor = "#FF0000"; //красный
	if (par.len == 30) boltColor = "#0000FF"; //синий
	if (par.len == 40) boltColor = "#00FF00"; //зеленый

	var boltMaterial = new THREE.MeshLambertMaterial({ color: boltColor });
	if (!$sceneStruct.vl_1.realColors) {
		boltMaterial = params.materials.bolt;
	}
	var boltLen = par.len;
	if ($sceneStruct.vl_1.boltHead && !testingMode && par.headType != "шестигр.") boltLen -= headHeight;

	var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, boltLen, 10, 1, false);
	var bolt = new THREE.Mesh(geometry, boltMaterial);
	if ($sceneStruct.vl_1.boltHead && !testingMode && par.headType != "шестигр.") bolt.position.y += headHeight / 2;
	par.mesh.add(bolt);


	if (!$sceneStruct.vl_1.realColors) {
		if (params.paintedBolts == "есть") boltMaterial = params.materials.metal;
	}
	//головка для шестигранных болтов
	if (!testingMode && $sceneStruct.vl_1.boltHead && par.headType == "шестигр.") {
		var headHeight = par.diam * 0.6;


		var polygonParams = {
			cornerRad: 0,
			vertexAmt: 6,
			edgeLength: par.diam * 0.9815,
			basePoint: { x: 0, y: 0 },
			type: "shape",
			dxfPrimitivesArr: [],
			dxfBasePoint: { x: 0, y: 0 },
		}


		var shape = drawPolygon(polygonParams).shape;

		var extrudeOptions = {
			amount: headHeight,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

		var head = new THREE.Mesh(geom, boltMaterial);
		head.rotation.x = -Math.PI / 2;
		//	head.position.x = -polygonParams.edgeLength / 2;
		//	head.position.z = polygonParams.edgeLength * Math.cos(Math.PI / 6);
		//head.position.y = par.len / 2// + par.diam / 2;
		head.position.y = -par.len / 2 - headHeight;
		par.mesh.add(head);
	}

	//головка для болтов в потай
	if ($sceneStruct.vl_1.boltHead && par.headType != "шестигр.") {
		var shape = new THREE.Shape();
		addCircle(shape, [], { x: 0, y: 0 }, par.diam, { x: 0, y: 0 })

		//шестигранное отверстие
		var polygonParams = {
			cornerRad: 0,
			vertexAmt: 6,
			edgeLength: par.diam * 0.4,
			basePoint: { x: 0, y: 0 },
			type: "path",
			dxfPrimitivesArr: [],
			dxfBasePoint: { x: 0, y: 0 },
		}
		//polygonParams.basePoint = newPoint_xy(polygonParams.basePoint, -polygonParams.edgeLength / 2, -polygonParams.edgeLength * Math.cos(Math.PI / 6))

		var path = drawPolygon(polygonParams).path;

		shape.holes.push(path);

		var extrudeOptions = {
			amount: headHeight,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

		//var geometry = new THREE.CylinderGeometry(par.diam, par.diam, headThk, 30, 1, false);
		var head = new THREE.Mesh(geom, boltMaterial);
		head.rotation.x = -Math.PI / 2;
		head.position.y = -par.len / 2 - headHeight * 0.1;
		par.mesh.add(head);

		//заглушка дна чтобы не просвечивал белый материал
		var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, 0.1, 10, 1, false);
		var cyl = new THREE.Mesh(geometry, boltMaterial);
		cyl.position.y = -par.len / 2 + headHeight;
		par.mesh.add(cyl);

	}
	if (!par.noNut && !testingMode) {

		//шайба
		var shimParams = { diam: par.diam }
		var shim = drawShim(shimParams).mesh;
		shim.position.y = 1;
		par.mesh.add(shim);

		//гайка
		var nutParams = { diam: par.diam }
		var nut = drawNut(nutParams).mesh;
		nut.position.y = shim.position.y + shimParams.shimThk;
		par.mesh.add(nut);
	}


	//сохраняем данные для спецификации
	par.partName = "bolt"
	if (par.diam != 10) par.partName += "M" + par.diam;
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: "Болт",
				metalPaint: (params.paintedBolts == "есть"),
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Метизы",
			}
		}
		var headName = "шестигр. гол.";
		if (par.headType == "потай") headName = "потай внутр. шестигр."
		if (par.headType == "пол. гол. крест") headName = par.headType;
		var name = "М" + par.diam + "х" + par.len + " " + headName;
		if (par.headType == "меб.") name = "мебельный М" + par.diam + "х" + par.len;
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	return par;

}

function calcLastRackDeltaY(unit, marshId) {
	if (!marshId) marshId = 3;
	if (params.stairModel == 'Прямая') marshId = 1;

	var marshParams = getMarshParams(marshId);

	var dyLastRack = 0;
	if (params.platformTop == "нет") {
		if (params.model == "лт") {
			if (params.topAnglePosition == "под ступенью" ||
				params.topAnglePosition == "рамка верхней ступени") {
				dyLastRack = 65;
				if (params.stairType == "дпк") {
					dyLastRack = (marshParams.a - 80 - marshParams.b / 2) * Math.tan(marshParams.ang);
				}
			}
			if (params.topAnglePosition == "над ступенью") {
				if ((marshParams.a - marshParams.b) > 50)
					dyLastRack = (marshParams.a - marshParams.b - 20) * Math.tan(marshParams.ang);
			}
		}
		if (params.model == "ко") {
			var dyLastRack = 50;
			if (params.topAnglePosition == "вертикальная рамка") dyLastRack = 100;
		}
	}
	if (params.calcType == 'mono') {
		dyLastRack = (marshParams.a - 50 - 95) * Math.tan(marshParams.ang);
	}

	if (params.stairModel == 'Прямая горка' && params.calcType == 'vhod') dyLastRack = 0;

	if (unit == "wnd_ko") {
		var offsetX = params.nose - 5 + 0.1;
		if (params.riserType == "есть") offsetX += params.riserThickness;

		dyLastRack = marshParams.h * (0.5 - offsetX / marshParams.b);
	}

	if (params.rackBottom == "сверху с крышкой") dyLastRack = 0;
	if (params.calcType == 'vhod' && params.staircaseType == "Готовая") dyLastRack = 0;

	return dyLastRack;
}

function drawTopFixFlans(par) {
	par.mesh = new THREE.Object3D();

	var marshParams = getMarshParams(3);
	var parFrames = { marshId: 3 };
	calcFrameParams(parFrames); // рассчитываем параметры рамки

	var holeOffset = 20; //отступ центра верхнего отверстия от края фланца
	var botLedge = params.treadThickness + parFrames.profHeight; //выступ фланца ниже верхней плоскости ступени, 40 - высота рамки
	if (params.platformTop == "площадка") botLedge += 20;
	if (params.stairType == "рифленая сталь" || params.stairType == "лотки")
		botLedge = params.treadThickness + 50; //выступ фланца ниже верхней плоскости ступени, 50 - высота рамки
	if (params.topAnglePosition == "под ступенью") botLedge += 100;
	if (params.topAnglePosition == "над ступенью") botLedge = -10;
	if (params.calcType == 'vhod' && params.staircaseType == "Готовая") botLedge = 181;

	par.flanLen = holeOffset + botLedge;
	if (params.topFlanHolesPosition) par.flanLen += params.topFlanHolesPosition;
	var lastRise = 0;
	if (params.platformTop !== "площадка") {
		var lastRise = params.h3;
		if (params.stairModel == 'Прямая') lastRise = params.h1;
	}

	var sideOffset = params.stringerThickness;
	if (params.model == "ко") sideOffset += params.sideOverHang;

	var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 200, -500);

	//левый фланец
	var flan1 = drawTopFixFlan(par.flanLen, dxfBasePoint).mesh;
	flan1.position.x = -params.M / 2 + sideOffset;
	flan1.position.y = -lastRise - botLedge;
	//if (params.stairType == "дпк") flan1.position.z = 8;
	if (marshParams.stairAmt == 0 && marshParams.botTurn == "забег") {
		if (params.model == "лт") flan1.position.z += params.lastWinderTreadWidth - marshParams.nose;
		if (params.model == "ко") flan1.position.z += params.lastWinderTreadWidth - 55;
	}
	flan1.position.z += 0.01;
	par.mesh.add(flan1);

	dxfBasePoint.x += 300;

	//правый фланец
	var flan2 = drawTopFixFlan(par.flanLen, dxfBasePoint).mesh;
	flan2.position.x = params.M / 2 - 100 - sideOffset;
	flan2.position.y = flan1.position.y;
	//if (params.stairType == "дпк") flan2.position.z = 8;
	if (marshParams.stairAmt == 0 && marshParams.botTurn == "забег") {
		if (params.model == "лт") flan2.position.z += params.lastWinderTreadWidth - marshParams.nose;
		if (params.model == "ко") flan2.position.z += params.lastWinderTreadWidth - 55;
	}
	flan2.position.z += 0.01;
	par.mesh.add(flan2);

	return par;
}