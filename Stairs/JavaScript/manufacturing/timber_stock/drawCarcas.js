// Вывод каркаса всей лестницы

function drawCarcas(par){

	par.mesh1 = new THREE.Object3D();
	par.mesh2 = new THREE.Object3D();
	par.columns = new THREE.Object3D();

	var dxfX0 = par.dxfBasePoint.x;

	par.stringerParams = [];

	// Каркас нижнего марша

	var marshId = 1;
	if(getMarshParams(marshId).stairAmt > 0 || getMarshParams(marshId).topTurn == 'забег'){
		par.addY = 0;
		par.stringerParams[marshId] = drawMarshStringers(par, marshId);
		par.mesh1.add(par.stringerParams[marshId].mesh1);
		par.mesh2.add(par.stringerParams[marshId].mesh2);
	}

	// Каркас первого поворота
	
	if (params.stairModel != "Прямая"){
		var turnParams = {
			turnId: 1,
			marshId: 1,
			dxfBasePoint: par.dxfBasePoint,
			height: params.h1 * (params.stairAmt1 + 1) - params.treadThickness,
		}
		var turnObj = drawTurnUnit(turnParams);
		turnObj.columns.position.x = turnObj.stringers.position.x = par.treadsObj.unitsPos.turn1.x + params.nose
		par.columns.add(turnObj.columns)
		par.mesh1.add(turnObj.stringers)
	}
	
	
	// Каркас среднего марша

	if (params.stairModel == "П-образная трехмаршевая" || (params.stairModel == "П-образная с забегом")) {
		marshId = 2;
		unitPos = {x:0,y:0,z:0,rot:0};
		console.log(par.treadsObj.unitPos)
		if (params.stairModel == "П-образная с забегом") {
			unitPos = par.treadsObj.unitsPos.turn2;
		}
		if (params.stairModel == "П-образная трехмаршевая") {
			unitPos = par.treadsObj.unitsPos.marsh2;
		}
		par.addY = unitPos.y;
		par.stringerParams[marshId] = drawMarshStringers(par, marshId);
		var mesh1 = par.stringerParams[marshId].mesh1;
		var mesh2 = par.stringerParams[marshId].mesh2;
		mesh1.position.x = mesh2.position.x = unitPos.x;
		mesh1.position.y = mesh2.position.y = unitPos.y;
		mesh1.position.z = mesh2.position.z = unitPos.z;
		mesh1.rotation.y = mesh2.rotation.y = unitPos.rot;

		par.mesh1.add(mesh1);
		par.mesh2.add(mesh2);
	}
	
	//второй поворот
	if (params.stairModel == "П-образная трехмаршевая" || params.stairModel == "П-образная с забегом") {
		var turnParams = {
			turnId: 2,
			marshId: 2,
			dxfBasePoint: par.dxfBasePoint,
			height: par.treadsObj.unitsPos.turn2.y - params.treadThickness,
		}
		if (params.stairModel == "П-образная с забегом") turnParams.height += params.h3;
		var turnObj = drawTurnUnit(turnParams);
		turnObj.columns.position.x = turnObj.stringers.position.x = par.treadsObj.unitsPos.turn2.x;
		turnObj.columns.position.z = turnObj.stringers.position.z = par.treadsObj.unitsPos.turn2.z + params.nose * turnFactor;
		turnObj.columns.rotation.y = turnObj.stringers.rotation.y = par.treadsObj.unitsPos.turn2.rot;
		par.columns.add(turnObj.columns)
		par.mesh1.add(turnObj.stringers)
	}


	//каркас верхнего марша

	if (params.stairModel != 'Прямая') {
		marshId = 3;
		if(getMarshParams(marshId).stairAmt > 0  || getMarshParams(marshId).botTurn == 'забег'){
			par.addY = par.treadsObj.unitsPos.marsh3.y;
			par.stringerParams[marshId] = drawMarshStringers(par, marshId);
			var mesh1 = par.stringerParams[marshId].mesh1;
			var mesh2 = par.stringerParams[marshId].mesh2;
			mesh1.position.x = mesh2.position.x = par.treadsObj.unitsPos.marsh3.x;
			mesh1.position.y = mesh2.position.y = par.treadsObj.unitsPos.marsh3.y;
			mesh1.position.z = mesh2.position.z = par.treadsObj.unitsPos.marsh3.z;
			mesh1.rotation.y = mesh2.rotation.y = par.treadsObj.unitsPos.marsh3.rot;

			par.mesh1.add(mesh1);
			par.mesh2.add(mesh2);
		}
	}

		//верхний узел
/*
	var unitPar = calcTopUnitParams(par.stringerParams[marshId].params, marshId);
	var topUnit = drawTopUnit(unitPar).mesh;
	topUnit.position.x = par.treadsObj.lastMarshEnd.x;
	topUnit.position.y = par.treadsObj.lastMarshEnd.y;
	topUnit.position.z = par.treadsObj.lastMarshEnd.z;
	topUnit.rotation.y = par.treadsObj.lastMarshEnd.rot;

	par.mesh1.add(topUnit);
*/
	if (getMarshParams(marshId).stairAmt > 0) {
		var stringerHeight = 250;
		if (par.stringerParams[marshId] && par.stringerParams[marshId].params && par.stringerParams[marshId].params.in) {
			stringerHeight = par.stringerParams[marshId].params.in.endHeightTop || getMarshParams(marshId) * 1.5;
		}
		
		var unitPar = {
			stringerHeight: stringerHeight,
			dxfBasePoint: par.dxfBasePoint
		}
		var topUnit = drawTimberStockTopUnit(unitPar).mesh;
		topUnit.position.x = par.treadsObj.lastMarshEnd.x;
		topUnit.position.y = par.treadsObj.lastMarshEnd.y;
		topUnit.position.z = par.treadsObj.lastMarshEnd.z;
		topUnit.rotation.y = par.treadsObj.lastMarshEnd.rot;
	
		par.mesh1.add(topUnit);
	}

	return par;

} //end of drawCarcas

/**
 * Отрисовывает выходной узел на timer_stock
 */
function drawTimberStockTopUnit(par){
	var marshPar = getMarshParams(3);
	if(params.stairModel == 'Прямая') marshPar = getMarshParams(1);
	
	if(!par) par = {};
	if(!par.dxfBasePoint) par.dxfBasePoint = {x:0, y:0}

	var mesh = new THREE.Object3D();
	var unitHeight = marshPar.h + params.treadThickness + par.stringerHeight;

	var unitWidth = 40;
	
	var plateParams = {
		len: unitWidth,
		width: unitHeight - params.treadThickness,
		dxfBasePoint: par.dxfBasePoint,
		dxfArr: dxfPrimitivesArr,
		thk: params.M - 100 * 2,
		material: params.materials.riser,
		partName: "plate"
	};
	//средняя доска
	var plate = drawPlate(plateParams).mesh;
	plate.position.x = -plateParams.len + 0.03;
	plate.position.y = -plateParams.width - params.treadThickness;
	plate.position.z = -plateParams.thk / 2;
	mesh.add(plate);

	var plateParams = {
		len: unitWidth,
		width: unitHeight - params.treadThickness,
		dxfBasePoint: par.dxfBasePoint,
		dxfArr: dxfPrimitivesArr,
		thk: 100,
		material: params.materials.riser,
		partName: "plate"
	};

	//Левая доска 40х100
	var plate = drawPlate(plateParams).mesh;
	plate.position.x = -plateParams.len + 0.03;
	plate.position.y = -plateParams.width - params.treadThickness;
	plate.position.z = -params.M / 2;
	mesh.add(plate);

	//Праввая доска 40х100
	var plate = drawPlate(plateParams).mesh;
	plate.position.x = -plateParams.len + 0.03;
	plate.position.y = -plateParams.width - params.treadThickness;
	plate.position.z = params.M / 2 - plateParams.thk;
	mesh.add(plate);

	var plateParams = {
		len: unitWidth + params.nose,
		width: params.treadThickness,
		dxfBasePoint: par.dxfBasePoint,
		dxfArr: dxfPrimitivesArr,
		thk: params.M,
		material: params.materials.tread,
		partName: "plate"
	};

	//Маленькая ступень
	var plate = drawPlate(plateParams).mesh;
	plate.position.x = -plateParams.len;
	plate.position.y = -plateParams.width;
	plate.position.z = -plateParams.thk / 2;
	mesh.add(plate);

	par.mesh = mesh;
	return par;
}

// Вывод каркаса одного марша
function drawMarshStringers(par, marshId){

	var mesh1 = new THREE.Object3D();
	var mesh2 = new THREE.Object3D();

	var stringerParams = getMarshParams(marshId);
	calcStringerParams(stringerParams); //параметры добавляются в объект stringerParams

	//позиция косоуров по Z
	var posZIn = params.M / 2 * turnFactor;
	var posZOut = (-params.M / 2 - 0.01) * turnFactor;

	//внутренний косоур/тетива
	dxfBasePointIn = {x:3000, y: -3000 - 3000 * marshId};
	dxfBasePointOut = {x:3000 + stringerParams.a * stringerParams.stairAmt + 1000, y: -3000 - 3000 * marshId};

	var pos = {
		x: 0,
		y: 0,
		z: posZIn,
	}

	if (params.stairModel == 'П-образная с забегом' && marshId == 2) pos.z += params.stringerThickness * turnFactor;
	
	stringerParams2 = {
		marshId: marshId,
		side: "in",
		dxfBasePoint: dxfBasePointIn,
		drawFunction: drawStrightStringer,
		pos: pos, //позиционирование происходит внутри drawComplexStringer
	};

	drawComplexStringer(stringerParams2);
	if(!(par.isP || par.isWndP) && getMarshParams(marshId).stairAmt != 0){
		mesh1.add(stringerParams2.mesh1);
		mesh2.add(stringerParams2.mesh2);
	}

	//внешний косоур/тетива

	var pos = {
		x: 0,
		y: 0,
		z: posZOut,
	}

	stringerParams1 = {
		marshId: marshId,
		side: "out",
		dxfBasePoint: dxfBasePointOut,
		drawFunction: drawStrightStringer,
		pos: pos, //позиционирование происходит внутри drawComplexStringer
		addY: par.addY, //Необходимо для отрисовки столбов вместе с каркасом
	};
	if (params.model == 'косоуры') {
		stringerParams1.topMarshXOffset = 0;
	}
	var marshPar = getMarshParams(marshId);
	if ((marshPar.botTurn == 'забег' || marshPar.topTurn == 'забег')) {
		stringerParams1.drawFunction = drawTimberStockStringer;
	}

	if (par.treadsObj.wndPar) stringerParams1.turnStepsParams = par.treadsObj.wndPar.params;
	if (par.treadsObj.wndPar2) stringerParams1.turnStepsParams = par.treadsObj.wndPar2.params;
	if (par.stairModel == 'П-образная с забегом') {
		if (par.treadsObj.wndPar) stringerParams1.turnStepsParams = par.treadsObj.wndPar.params;
		if (par.treadsObj.wndPar2) stringerParams1.turnStepsParams2 = par.treadsObj.wndPar2.params;
	}
	if (params.calcType != "timber_stock") {
		if (stringerParams.topTurn !== 'пол') stringerParams1.drawFunction = drawStringer1;
		if (stringerParams.botTurn !== 'пол') stringerParams1.drawFunction = drawStringer3;
		if (stringerParams.topTurn !== 'пол' && stringerParams.botTurn !== 'пол') stringerParams1.drawFunction = drawStringer5;
	}
	drawComplexStringer(stringerParams1);
	mesh1.add(stringerParams1.mesh1);
	mesh2.add(stringerParams1.mesh2);

	if (stringerParams.stairAmt == 0) {
		mesh1.position.z -= 0.01;
		mesh2.position.z -= 0.01;
	}

	stringerParams.mesh1 = mesh1;
	stringerParams.mesh2 = mesh2;

	stringerParams.params = {};
	stringerParams.params[stringerParams2.side] = stringerParams2;
	stringerParams.params[stringerParams1.side] = stringerParams1;

	return stringerParams;

} //end of drawMarshStringers

function drawTimberStockStringer(par){

	var stringerShape = new THREE.Shape();

	var zeroPoint = {x:0,y: -params.treadThickness};
	var stringerHeight = 250;

	//рассчитываем параметры косоура по номеру марша и стороне
	calcStringerPar(par);

	var marshPar = getMarshParams(par.marshId); //функция в файле inputsReading.js
	var h = marshPar.h;
	var b = marshPar.b;
	var a = marshPar.a;
	var stairAmt = marshPar.stairAmt;
	var stringerHoles = [];
	var stringerColumnHoles = [];

	//выводим в dxf только конутур с пазами
	var dxfArr = dxfPrimitivesArr;
	if(!par.slots) dxfArr = [];

	var stairAngle = Math.atan(h/b)
	par.stairAngle = stairAngle

	par.slotsOffset = 20;

	var botLine = [];
	var topLine = [];

	if (par.botEnd == 'забег') {
		var wndPoint1 = newPoint_xy(zeroPoint, params.nose - params.M + params.stringerThickness + par.stringerSideOffset, -h);
		if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) wndPoint1.x -= params.marshDist;
		
		var wndBotPoint0 = newPoint_xy(wndPoint1, 0, -stringerHeight + 50);
		
		var wndTreadWidth = par.turnStepsParams[2].stepWidthX + 0.05 - params.stringerThickness - par.stringerSideOffset;
		wndTreadWidth += par.stringerSideOffset / Math.cos(par.turnStepsParams[2].angleY);
		
		//учитываем подступенки
		if(params.riserType == 'есть') wndTreadWidth += params.riserThickness / Math.cos(par.turnStepsParams[2].angleY);
		
		var wndPoint2 = newPoint_xy(wndPoint1, wndTreadWidth, 0);
		var wndPoint3 = newPoint_xy(wndPoint2, 0, h);
		
		topLine.push(wndPoint1, wndPoint2, wndPoint3);
		
		par.keyPoints.botPoint = copyPoint(wndBotPoint0);
		par.keyPoints.topPoint = copyPoint(wndPoint3);
	}

	var marshBasePoint = newPoint_xy(zeroPoint, params.nose, 0);
	if(params.riserType == 'есть') marshBasePoint.x += params.riserThickness;
	if (stairAmt == 0 && par.topEnd == 'забег' && par.marshId != 2) marshBasePoint.y -= params.treadThickness;

	topLine.push(marshBasePoint);
	if (par.marshId == 1) topLine[topLine.length - 1].y += params.treadThickness;

	par.keyPoints.stairBasePoints = []; // Базовые точки для ступеней, чтобы ничего не считать при делении марша на части
	var stairsBasePoint = newPoint_xy(marshBasePoint, 0, 0);

	if (!par.keyPoints.botPoint) par.keyPoints.botPoint = copyPoint(marshBasePoint);

	for (var i = 0; i < stairAmt; i++) {
		var stairPoint1 = newPoint_xy(stairsBasePoint, 0, h);
		if (i == 0 && par.marshId == 1) stairPoint1.y -= params.treadThickness;
		var stairPoint2 = newPoint_xy(stairPoint1, b, 0);
		if (marshPar.lastMarsh && i == stairAmt - 1 && params.riserType == 'есть') stairPoint2.x -= params.riserThickness;
		topLine.push(stairPoint1, stairPoint2);
		
		stairsBasePoint = stairPoint2;
		par.keyPoints.stairBasePoints[i + 1] = stairPoint2;
		par.keyPoints.topPoint = par.keyPoints.endMarshPoint = copyPoint(stairPoint2);
		par.keyPoints.endMarshBotPoint = newPoint_xy(stairsBasePoint, 0, -stringerHeight);
	}
	
	if (par.topEnd == 'забег') {
		var wndPoint1 = newPoint_xy(stairsBasePoint, 0, h);
		var wndTreadWidth = par.turnStepsParams[1].stepWidthHi - params.nose + 0.05;

		wndTreadWidth -= par.stringerSideOffset * Math.atan(par.turnStepsParams[1].edgeAngle);
		//учитываем подступенки
		if(params.riserType == 'есть'){
			wndTreadWidth += params.riserThickness / Math.cos(par.turnStepsParams[1].edgeAngle);
		}

		if (params.riserType == 'есть') wndTreadWidth -= params.riserThickness;
		var wndPoint2 = newPoint_xy(wndPoint1, wndTreadWidth, 0);
		var wndPoint3 = newPoint_xy(wndPoint2, 0, marshPar.h_topWnd);
		var wndPoint4 = newPoint_xy(wndPoint3, params.M - wndTreadWidth, 0);

		topLine.push(wndPoint1, wndPoint2, wndPoint3, wndPoint4);

		par.keyPoints.topPoint = copyPoint(wndPoint4);
	}
	
	//Формируем нижнюю линию с учетом делений

	if (par.botEnd == 'забег') {
		var wndBotPoint1 = newPoint_xy(par.keyPoints.botPoint, 300, 0);
		botLine.push(par.keyPoints.botPoint, wndBotPoint1);

		var marshBotPoint = newPoint_xy(marshBasePoint, 0, -stringerHeight);		
		par.keyPoints.startMarshPoint = marshBotPoint;
		botLine.push(marshBotPoint);

		var center1 = newPoint_xy(par.keyPoints.botPoint, 20, 50);
		var center2 = newPoint_xy(center1, 0, 110);
		stringerColumnHoles.push(center1);
		stringerColumnHoles.push(center2);
	}

	if (par.botEnd != 'забег' && stairAmt > 0){
		var botPoint = itercection(par.keyPoints.endMarshBotPoint, polar(par.keyPoints.endMarshBotPoint, stairAngle, -100), marshBasePoint, newPoint_xy(marshBasePoint, 100, 0))
		if (stairAmt == 1 && par.botEnd != 'забег') botPoint.x = stairsBasePoint.x + 80; 
		botLine.push(botPoint);

		par.keyPoints.startMarshPoint = copyPoint(botPoint);
		par.keyPoints.botPoint = copyPoint(marshBasePoint);
	}

	if (stairAmt == 0 && par.topEnd == 'забег' && par.marshId != 2) {
		var p1 = newPoint_xy(marshBasePoint, 0, params.treadThickness);
		var p2 = newPoint_xy(p1, b, 0);
		botLine.push(p1,p2);
		par.keyPoints.startMarshPoint = par.keyPoints.botPoint = copyPoint(p1);
	}

	if(stairAmt > 1) botLine.push(par.keyPoints.endMarshBotPoint);

	if (par.topEnd == 'забег') {
		var botWndPoint = newPoint_xy(par.keyPoints.topPoint, 0, -stringerHeight);
		botLine.push(botWndPoint);

		var center1 = newPoint_xy(par.keyPoints.topPoint, -20, -50);
		var center2 = newPoint_xy(center1, 0, -110);
		stringerColumnHoles.push(center1);
		stringerColumnHoles.push(center2);
	}

	var thk = params.stringerThickness - params.stringerSlotsDepth;
	if(par.slots == true) thk = params.stringerSlotsDepth;

	var stringerLength = distance(par.keyPoints.botPoint, par.keyPoints.topPoint);
	var splitTurns = false;

	if (stringerLength > 3000) {
		splitTurns = true;
	}

	var splitPoints = [];

	if (splitTurns) {
		var botSplitPoint = par.keyPoints.botSplitPoint = newPoint_xy(marshBasePoint, -params.rackSize / 2, 0);
		if(params.riserType == 'есть') botSplitPoint.x -= params.riserThickness;
		botSplitPoint.isBotTurn = true;
		var topSplitPoint = par.keyPoints.topSplitPoint = newPoint_xy(stairsBasePoint, -a / 2, 0);
		topSplitPoint.isTopTurn = true;

		if (par.botEnd == 'забег') splitPoints.push(botSplitPoint);
		if (par.topEnd == 'забег') splitPoints.push(topSplitPoint);
	}

	// var marshLength = distance(par.keyPoints.startMarshPoint, par.keyPoints.endMarshPoint)
	// if (marshLength > 1000) {
	// 	var marshSplitPoint = Math.ceil(stairAmt / 2);
	// 	console.log(marshSplitPoint)
	// 	splitPoints.push(newPoint_xy(par.keyPoints.stairBasePoints[marshSplitPoint], -a / 2, 0));
	// }

	par.meshes = [];
	par.columns = [];

	if (par.botEnd == 'забег') {
		var botColumn = newPoint_xy(topLine[0], params.rackSize / 2 + 0.02, 0);
		botColumn.deltaY = stringerHeight - 50 + params.treadThickness;
		par.columns.push(botColumn);
	}

	for(var i = 0; i < topLine.length; i++) {
		var xSlotOffset = 25.5;
		var ySlotOffset = 25.5;
		var hasHole = i%2;
		if (par.botEnd == 'забег') hasHole = (i - 1)%2;
		//выцепляем четные точки
		if(hasHole){
			var center1 = newPoint_xy(topLine[i], xSlotOffset, -ySlotOffset);
			if (par.botEnd == 'забег' && i == 0) center1.x += 200;
			stringerHoles.push(center1);
			if(params.riserType == "нет" && !(par.botEnd == 'забег' && i == 0)){
				var center2 = newPoint_xy(center1, marshPar.b - xSlotOffset * 3, 0);
				stringerHoles.push(center2);
			}
		}
	}
	
	var partsAmt = splitPoints.length + 1;
	for (var i = 0; i < partsAmt; i++) {
		
		var botSplitPoint, topSplitPoint;
		botSplitPoint = topSplitPoint = null;

		if (splitPoints[i - 1]) botSplitPoint = splitPoints[i - 1];
		if (splitPoints[i]) topSplitPoint = splitPoints[i];

		function filterPoints(point){
			var isCorrect = true;
			if (botSplitPoint && point.x < botSplitPoint.x) isCorrect = false;
			if (topSplitPoint && point.x > topSplitPoint.x) isCorrect = false;
			return isCorrect;
		}

		var topLinePoints = topLine.filter(filterPoints);
		var botLinePoints = botLine.filter(filterPoints);
		var stringerHolesFiltered = stringerHoles.filter(filterPoints);

		if (botSplitPoint) {
			topLinePoints.unshift(botSplitPoint);
			var botPoints = calcBotSplitPoint(botLine, botSplitPoint, 'bot');
			botLinePoints.unshift(...botPoints);

			var center1 = newPoint_xy(botSplitPoint, 20, - 40);
			var center2 = newPoint_xy(center1, 0, - 110);
			stringerColumnHoles.push(center1);
			stringerColumnHoles.push(center2);
		}
		if (topSplitPoint) {
			topLinePoints.push(topSplitPoint);

			var botPoints = calcBotSplitPoint(botLine, topSplitPoint, 'top');
			botLinePoints.push(...botPoints);

			var columnPoint = copyPoint(topSplitPoint);
			columnPoint.deltaY = topSplitPoint.y - botPoints[botPoints.length - 1].y + params.treadThickness;
			par.columns.push(columnPoint);

			var center1 = newPoint_xy(topSplitPoint, -20, - 40);
			var center2 = newPoint_xy(center1, 0, - 110);
			stringerColumnHoles.push(center1);
			stringerColumnHoles.push(center2);
		}

		var points = [...topLinePoints];
		points.push(...botLinePoints.reverse());

		var shapePar = {
			points: points,
			dxfArr: dxfArr,
			dxfBasePoint: par.dxfBasePoint,
			//markPoints: true, //пометить точки в dxf для отладки
		}
		if (par.slots) shapePar.drawing = {group: "stringer", dimPoints:[{p1: par.keyPoints.botPoint, p2: par.keyPoints.topPoint, type:'dist'}]};
		stringerShape = drawShapeByPoints2(shapePar).shape;

		//отверстия для крепления ступеней
		if(par.slots == true){
			var slotDiam = 25.5;
			for(var j = 0; j < stringerHolesFiltered.length; j++) {
				//addRoundHole(stringerShape, dxfPrimitivesArr, stringerHolesFiltered[j], slotDiam / 2, dxfBasePoint);
				addRoundHole(stringerShape, dxfArr, stringerHolesFiltered[j], slotDiam / 2, par.dxfBasePoint);
			}
		}
		//отверстия для крепления косоуров к столбу
		if (true) {
			var slotDiam = 12;
			for (var j = 0; j < stringerColumnHoles.length; j++) {
				addRoundHole(stringerShape, dxfArr, stringerColumnHoles[j], slotDiam / 2, par.dxfBasePoint);
			}
		}

		var extrudeOptions = {
			amount: thk,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
		
		var geom = new THREE.ExtrudeGeometry(stringerShape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geom, params.materials.timber2);
		mesh.userData = {angle: stairAngle};
		par.meshes.push(mesh);
	}

	if (!par.slots) {
		var columns = new THREE.Object3D();
		for (var i = 0; i < par.columns.length; i++) {
			var column = par.columns[i];

			var columnParams = {
				len: column.y + par.addY - column.deltaY + params.treadThickness,
				model: "косоур",
				holeHeight: column.deltaY - 0.01,
				hasHole: true,
				rackSize: params.rackSize,
				dxfBasePoint: par.dxfBasePoint
			};
			
			var columnMesh = drawOpColumn(columnParams).mesh;

			columnMesh.position.x = column.x + 0.01;
			columnMesh.position.y = column.y - columnParams.len - 0.01 - column.deltaY + params.treadThickness;
			columnMesh.position.z = (-params.rackSize / 2 - par.stringerSideOffset / 2 + params.stringerThickness / 2) * turnFactor;
			if (turnFactor == -1) columnMesh.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if (stairAmt == 0 && marshPar.lastMarsh && turnFactor == -1) columnMesh.position.z -= 25 * turnFactor; //Временный костыль
			columns.add(columnMesh);
		}
		par.meshes.push(columns);

		var metis = new THREE.Object3D();

		if (par.topEnd == 'забег') {
			var screwPar = {
				id: "screw_8x60",
				description: "Крепление косоуров к столбу",
				group: "Каркас",
				hasShim: true
			}
			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = Math.PI / 2 * turnFactor;
			screw.position.x = par.keyPoints.topPoint.x - 20;
			screw.position.y = par.keyPoints.topPoint.y - 50;
			screw.position.z = 30 * turnFactor;
			if (turnFactor == -1) screw.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(screw);

			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = Math.PI / 2 * turnFactor;
			screw.position.x = par.keyPoints.topPoint.x - 20;
			screw.position.y = par.keyPoints.topPoint.y - 160;
			screw.position.z = 30 * turnFactor;
			if (turnFactor == -1) screw.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(screw);
			
			var plug = drawTimberPlug(25);
			plug.rotation.x = Math.PI / 2 * turnFactor;
			plug.position.x = par.keyPoints.topPoint.x - 20;
			plug.position.y = par.keyPoints.topPoint.y - 50;
			plug.position.z = (-1 - 0.5) * turnFactor;
			if (turnFactor == -1) plug.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(plug);
			
			var plug = drawTimberPlug(25);
			plug.rotation.x = Math.PI / 2 * turnFactor;
			plug.position.x = par.keyPoints.topPoint.x - 20;
			plug.position.y = par.keyPoints.topPoint.y - 160;
			plug.position.z = (-1 - 0.5) * turnFactor;
			if (turnFactor == -1) plug.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(plug);
		}

		if (par.botEnd == 'забег') {
			var screwPar = {
				id: "screw_6x60",
				description: "Крепление косоуров к столбу",
				group: "Каркас",
				hasShim: true
			}
			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = -Math.PI / 2 * turnFactor;
			screw.position.x = par.keyPoints.botPoint.x + 20;
			screw.position.y = par.keyPoints.botPoint.y + 50;
			screw.position.z = (10 + 0.5) * turnFactor;//30 * turnFactor;
			if (turnFactor == -1) screw.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(screw);

			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = -Math.PI / 2 * turnFactor;
			screw.position.x = par.keyPoints.botPoint.x + 20;
			screw.position.y = par.keyPoints.botPoint.y + 160;
			screw.position.z = (10 + 0.5) * turnFactor;//30 * turnFactor;
			if (turnFactor == -1) screw.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(screw);
			
			var plug = drawTimberPlug(12);
			plug.rotation.x = -Math.PI / 2 * turnFactor;
			plug.position.x = par.keyPoints.botPoint.x + 20;
			plug.position.y = par.keyPoints.botPoint.y + 50;
			plug.position.z = (40 + 1 + 0.5) * turnFactor;
			if (turnFactor == -1) plug.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(plug);
			
			var plug = drawTimberPlug(12);
			plug.rotation.x = -Math.PI / 2 * turnFactor;
			plug.position.x = par.keyPoints.botPoint.x + 20;
			plug.position.y = par.keyPoints.botPoint.y + 160;
			plug.position.z = (40 + 1 + 0.5) * turnFactor;
			if (turnFactor == -1) plug.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(plug);
		}

		par.meshes.push(metis);
	}

	if (par.slots) {
		var treadMetis = new THREE.Object3D();
		var slotDiam = 25.5;
		for(var i = 0; i < stringerHoles.length; i++) {
			var screwPar = {
				id: "screw_4x35",
				description: "Крепление ступеней к косоуру",
				group: "Ступени"
			}
			var screw = drawScrew(screwPar).mesh;
			screw.position.x = stringerHoles[i].x;
			screw.position.y = stringerHoles[i].y;
			screw.position.z = 0;
			if (turnFactor == -1) screw.position.z = params.stringerSlotsDepth;
			if(!testingMode) treadMetis.add(screw);

			var plug = drawTimberPlug(25);
			plug.position.x = stringerHoles[i].x;
			plug.position.y = stringerHoles[i].y;
			if (turnFactor == 1) plug.position.z = params.stringerSlotsDepth;
			plug.rotation.z = Math.PI / 2;
			plug.rotation.y = Math.PI / 2;
			if(!testingMode) treadMetis.add(plug);
		}
		par.meshes.push(treadMetis);
	}

	if (splitTurns && par.slots) {
		var metis = new THREE.Object3D();
		var screwPar = {
			id: "screw_6x60",
			description: "Крепление косоуров к столбу",
			group: "Каркас",
			hasShim: true
		}

		var fixPoints = [];
		for (var i = 0; i < splitPoints.length; i++) {
			var splitP = splitPoints[i];
			fixPoints.push(newPoint_xy(splitP, -40, 0));
			fixPoints.push(copyPoint(splitP));
		}

		for (var i = 0; i < fixPoints.length; i++) {			
			var botSplit = newPoint_xy(fixPoints[i], 0, -200);
			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = -Math.PI / 2 * turnFactor;
			screw.position.x = botSplit.x + 20;
			screw.position.y = botSplit.y + 50;
			screw.position.z = 0;//(10 + 0.5) * turnFactor;//30 * turnFactor;
			// if (turnFactor == -1) screw.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(screw);
	
			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = -Math.PI / 2 * turnFactor;
			screw.position.x = botSplit.x + 20;
			screw.position.y = botSplit.y + 160;
			screw.position.z = 0;//(10 + 0.5) * turnFactor;//30 * turnFactor;
			// if (turnFactor == -1) screw.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(screw);
			
			var plug = drawTimberPlug(12);
			plug.rotation.x = -Math.PI / 2 * turnFactor;
			plug.position.x = botSplit.x + 20;
			plug.position.y = botSplit.y + 50;
			plug.position.z = params.stringerSlotsDepth + 1 + 0.5;
			// if (turnFactor == -1) plug.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(plug);
			
			var plug = drawTimberPlug(12);
			plug.rotation.x = -Math.PI / 2 * turnFactor;
			plug.position.x = botSplit.x + 20;
			plug.position.y = botSplit.y + 160;
			plug.position.z = params.stringerSlotsDepth + 1 + 0.5;
			if (turnFactor == -1) plug.position.z += params.stringerThickness - params.stringerSlotsDepth;
			if(!testingMode) metis.add(plug);
		}

		par.meshes.push(metis);
	}
} //end of drawStrightStringer

/**
 * Рассчитывает нижние точки для установки столба
 */
function calcBotSplitPoint(array, point, side){
	var nearPoints = findNearPoints(array, point);
	point = newPoint_xy(point, params.rackSize / 2, 0);// Сдвигаем на половину столба, чтобы найти крайнюю левую точку
	var basePoint = itercection(nearPoints.bot, nearPoints.top, point, newPoint_xy(point, 0, -100));

	var points = [];

	var midPoint = newPoint_xy(basePoint, -params.rackSize / 2, 0);

	if (side == 'top') {
		var p1 = newPoint_xy(midPoint, -params.rackSize / 2, 0);
		var p2 = itercection(nearPoints.bot, nearPoints.top, p1, newPoint_xy(p1, 0, -100));
		points.push(p2, p1, midPoint);
	}

	if (side == 'bot') points.push(midPoint, basePoint);

	return points;
}

/**
 * Ищет ближайшие точки по оси X к заданной
 * @param {*} array 
 * @param {*} point 
 */
function findNearPoints(array, point){
	var nearPoint1, nearPoint2;
	for (var i = 0; i < array.length; i++) {
		if (array[i].x <= point.x) nearPoint1 = array[i];
		if (array[i].x > point.x) break;
	}
	for (var i = 0; i < array.length; i++) {
		if (array[i].x >= point.x) {
			nearPoint2 = array[i];
			break;
		};
	}
	return {bot: nearPoint1, top: nearPoint2};
}

// Вывод косоуров промежуточной площадки для "П-образная с площадкой"
function drawPlatformStringers(par){

	var mesh = new THREE.Object3D();
	var mesh1 = new THREE.Object3D();

	var stringerParams = {
		marshId: 1,
		dxfBasePoint: par.dxfBasePoint,
		turnStepsParams: par.turnStepsParams,
		treadsObj: par.treadsObj,
		turnFramesParams: par.turnFramesParams,
		dxfBasePoint: par.dxfBasePoint,
		};

	//задняя тетива/косоур

	stringerParams.key = "rear";

	var rearStringer = drawPltStringer(stringerParams).mesh;

	rearStringer.position.z = -calcTurnParams(1).turnLengthTop * turnFactor;
	if (params.model == "ко") rearStringer.position.z += (params.sideOverHang + 75) * turnFactor;
	if(turnFactor == -1) rearStringer.position.z -= params.stringerThickness;

	rearStringer.position.y = 5;
	if (params.model == "ко") rearStringer.position.y = -params.treadThickness;
	rearStringer.position.x = -params.M * 0.5;
	if (params.model == "ко") rearStringer.position.x += params.sideOverHang;
	mesh.add(rearStringer);

	//уголки на задней тетиве/косоуре
	var side = "left";
	if(turnFactor == -1) side = "right";
	var rearAngles = drawCarcasAngles(stringerParams.pointsHole, side);

	rearAngles.position.x = rearStringer.position.x;
	rearAngles.position.y = rearStringer.position.y;
	rearAngles.position.z = rearStringer.position.z;
	if(side == "left") rearAngles.position.z += params.stringerThickness;

	mesh1.add(rearAngles);
	//колонны на задней тетиве
	stringerParams.anglesPosZ = rearAngles.position.z;
	stringerParams.dxfBasePoint.x += 2000;
	var columnsRear = drawColumnSide(stringerParams, "rear");
	columnsRear.position.x = rearStringer.position.x;
	mesh.add(columnsRear);
	//передняя тетива/косоур

	if (params.model == "ко" || (params.model == "лт" && !hasTreadFrames())){

		stringerParams.key = "front";

		var frontStringer = drawPltStringer(stringerParams).mesh;
		frontStringer.position.z = -(calcTurnParams(1).frontPltStringerOffset + params.stringerThickness)  * turnFactor;
		if(turnFactor == -1) frontStringer.position.z -= params.stringerThickness;

		frontStringer.position.y = -params.treadThickness;
		frontStringer.position.x = -params.M * 0.5;
		if (params.model == "лт") frontStringer.position.x += params.stringerThickness;
		if (params.model == "ко") frontStringer.position.x += params.sideOverHang;
		mesh.add(frontStringer);

		//уголки на передней тетиве/косоуре
		var side = "left";
		if(turnFactor == -1) side = "right";
		var frontAngles = drawCarcasAngles(stringerParams.pointsHole, side);

		frontAngles.position.x = frontStringer.position.x;
		frontAngles.position.y = frontStringer.position.y;
		frontAngles.position.z = frontStringer.position.z;
		if(side == "left") frontAngles.position.z += params.stringerThickness;

		mesh1.add(frontAngles);
	}

	stringerParams.mesh = mesh;
	stringerParams.mesh1 = mesh1;

	return stringerParams;
}


/*функция рассчитывает параметры косоуров по номеру марша и стороне и добавляет в исходный объект
*/

function calcStringerParams(par){

	par.stringerSideOffset = {
		in: 0,
		out: 0,
		};
	if (params.model == "косоуры"){
		par.stringerSideOffset = {
			in: params.rackSize - params.stringerThickness,
			out: params.rackSize - params.stringerThickness,
			};
		};
	if (params.model == "тетива+косоур"){
		par.stringerSideOffset = {
			in: params.rackSize - params.stringerThickness,
			out: 0,
			};
		}

};

/** функция рассчитывает параметры верхнего узла лестницы
*/
function calcTopUnitParams(par, marshId){
	var topUnitParams = {
		heightIn: 500,
		heightOut: 300,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: {x: -500, y:0},
		newellType: params.timberNewellType,
		newellTopType: params.newellTopType,
	}
	var marshParams = getMarshParams(marshId);
	//расчет длины столбов

	//длина внутреннего столба
	//выступ столба снизу и сверху от тетивы/косоура
	var rackYTopOffset = 20;
	if(par.in.type === "косоур"){
		rackYTopOffset = marshParams.h + params.treadThickness;
	}
	var rackYBotOffset = 20;

	if (par.in.botLineP1 && par.in.botLineP2) {
		topUnitParams.heightIn = rackYTopOffset + rackYBotOffset + (par.in.botLineP1.y - par.in.botLineP2.y) - params.treadThickness;
	}else{
		topUnitParams.heightIn = 100;
	}

	//длина внешнего столба
	//выступ столба снизу и сверху от тетивы/косоура
	rackYTopOffset = 20;
	if(par.out.type === "косоур"){
		rackYTopOffset = marshParams.h + params.treadThickness;
	}

	if (par.in.botLineP1 && par.in.botLineP2) {
		topUnitParams.heightOut = rackYTopOffset + rackYBotOffset + (par.out.botLineP1.y - par.out.botLineP2.y) - params.treadThickness;
	}else{
		topUnitParams.heightOut = 100;
	}

	return topUnitParams;

} //end of calcTopUnitParams

/** функция отрисовывает поворот с опорными столбами - площадку или забег
*/

function drawTurnUnit(par){
	par.columns = new THREE.Object3D();
	par.stringers = new THREE.Object3D();
	var botMarshPar = getMarshParams(par.marshId);
	var nextMarshPar = getMarshParams(botMarshPar.nextMarshId);

	//столбы
	var polePar = {
		poleProfileY: params.rackSize,
		poleProfileZ: params.rackSize,
		dxfBasePoint: par.dxfBasePoint,
		length: par.height,
		poleAngle: Math.PI / 2,
		partName: "timberPole",
		material: params.materials.timber,
	}

	/** Столбы */
	var leftPosZ = -params.M / 2;
	var rightPosZ = params.M / 2;
	var frontPosX = 0;
	if(params.riserType == "есть") frontPosX += params.riserThickness;
	var rearPosX = frontPosX + params.M;
	if (botMarshPar.topTurn == 'площадка') {
		rearPosX -= params.nose;
	}
	if(params.stairModel == "П-образная с площадкой"){
		if(turnFactor == 1) rightPosZ += params.marshDist + params.M
		if(turnFactor == -1) leftPosZ -= params.marshDist + params.M
		rearPosX = params.platformLength_1;
	}

	//Отрисовка столбов
	{
		//Передний левый
		{
			var pos1 = {
				x: frontPosX + params.rackSize,
				y: 0,
				z: leftPosZ,
			}
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos1.x, pos1.y)
			
			//крепежи для лестницы с поворотом налево
			if (turnFactor == 1) {
				if (botMarshPar.stairAmt > 0) {
					var basePointHole1 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50 - botMarshPar.h, side: 1};
					var basePointHole2 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 3};
					if (botMarshPar.stairAmt == 1) polePar.fixPoints = [basePointHole2];
					if (botMarshPar.stairAmt > 1) polePar.fixPoints = [basePointHole1, basePointHole2];
				}
				if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [1,2]};
				if(botMarshPar.topTurn == 'площадка') polePar.timberTopFix = {boltIds: [4,2]};
			}
			
			//крепежи для лестницы с поворотом направо
			if (turnFactor == -1) {
				var basePointHole1 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50 - botMarshPar.h, side: 1};
				polePar.fixPoints = [basePointHole1];
				
				if (params.stairModel == 'П-образная с площадкой') {
					basePointHole1 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 1};
					basePointHole2 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 3};
					polePar.fixPoints = [basePointHole1, basePointHole2];
				}
				
				if(botMarshPar.topTurn == 'площадка'){
					basePointHole2 = {type: 'stringerFixing', x:params.rackSize / 2, y: polePar.length - 50, side: 2};
					basePointHole3 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 3};
					polePar.fixPoints.push(basePointHole2, basePointHole3);
				}

				if(botMarshPar.topTurn == 'площадка') polePar.timberTopFix = {boltIds: [2,4]};
				if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [1,2,3,4,5]};
			}

			if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) {
				basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50 - botMarshPar.h, side: 1};
				basePointHole2 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 3};
				polePar.fixPoints = [basePointHole1, basePointHole2];
			}

			if(botMarshPar.topTurn == 'площадка') {
				polePar.newellName = 'Передний левый столб' + ' марш ' + par.marshId;
				var newell = drawPole3D_4(polePar).mesh;
				polePar.fixPoints = null;//Очищаем тк св-ва общие для нескольких столбов
				polePar.timberTopFix = null;//Очищаем тк св-ва общие для нескольких столбов
				newell.position.x = pos1.x;
				newell.position.y = pos1.y;
				newell.position.z = pos1.z;
				par.columns.add(newell);
			}
		}
		//передний правый
		{
			var pos2 = {
				x: frontPosX + params.rackSize,
				y: 0,
				z: rightPosZ - params.rackSize,
			}
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos2.x, pos2.y);
		
			if (turnFactor == 1 && params.stairModel !== 'П-образная с площадкой') {
				polePar.fixPoints = [];
				if (botMarshPar.stairAmt > 1 || par.marshId !== 1) {
					var basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50 - botMarshPar.h, side: 1};
					polePar.fixPoints = [basePointHole1];
				}
				
				if (botMarshPar.topTurn == 'площадка' || par.marshId !== 1) {
					var basePointHole2 = {type: 'stringerFixing', x:params.rackSize / 2, y: polePar.length - 50, side: 4};
					var basePointHole3 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 3};
					polePar.fixPoints.push(basePointHole2, basePointHole3);
				}
				if(botMarshPar.topTurn == 'забег') polePar.fixPoints.push({type: 'wndFixing', x:40, y: polePar.length - 50, side: 2})
				
				if(botMarshPar.topTurn == 'площадка') polePar.timberTopFix = {boltIds: [1,3]};
				if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [1,2,3,4,5]};
			}
			if (turnFactor == 1 && params.stairModel == 'П-образная с площадкой') {
				var basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 1};
				var basePointHole2 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 3};
				polePar.fixPoints = [basePointHole1, basePointHole2];
				polePar.timberTopFix = {boltIds: [2,4]};
			}
		
		
			if (turnFactor == -1) {
				var basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50 - botMarshPar.h, side: 1};
				var basePointHole2 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 3};
				polePar.fixPoints = [basePointHole1, basePointHole2];
				if(botMarshPar.topTurn == 'площадка') polePar.timberTopFix = {boltIds: [1,3]};
				if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [3,4]};
			}

			if (turnFactor == 1 && params.stairModel == 'П-образная с забегом' && par.marshId == 2) polePar.fixPoints = [];
		
			if(botMarshPar.topTurn == 'площадка'){
				polePar.newellName = 'Передний правый столб' + ' марш ' + par.marshId;
				var newell = drawPole3D_4(polePar).mesh;
				polePar.fixPoints = null;//Очищаем тк св-ва общие для нескольких столбов
				polePar.timberTopFix = null;//Очищаем тк св-ва общие для нескольких столбов
				newell.position.x = pos2.x;
				newell.position.y = pos2.y;
				newell.position.z = pos2.z;
				par.columns.add(newell);
			}
		}
		//задний левый
		{
			var pos3 = {
				x: rearPosX,
				y: 0,
				z: leftPosZ,
			}
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos3.x, pos3.y)
			if (botMarshPar.topTurn == "забег") {
				polePar.length = par.height + botMarshPar.h_topWnd;
				if(turnFactor == -1) {
					polePar.length += botMarshPar.h_topWnd;
					if(par.turnId == 1 && params.stairModel == "П-образная с забегом") polePar.length = 0;
				}
			}

			if(polePar.length > 0){
				if (turnFactor == 1 && polePar.length > 228) {
					var basePointHole1 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 1};
					var basePointHole2 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 4};
					polePar.fixPoints = [basePointHole1, basePointHole2];
					polePar.timberTopFix = {boltIds: [1,3]};
				}
		
				if (turnFactor == -1) {
					var basePointHole1 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 4};
					var basePointHole2 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 2};
					if (params.stairModel == 'П-образная с площадкой'){
						basePointHole1 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 1};
						basePointHole2 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 4};
					}
					polePar.fixPoints = [basePointHole1, basePointHole2];
					if(botMarshPar.topTurn == 'площадка') {
						basePointHole3 = {type: 'stringerFixing', x:params.rackSize - 20, y: polePar.length - 50, side: 1};
						polePar.fixPoints.push(basePointHole3);
						polePar.timberTopFix = {boltIds: [1,3]};
					}
					if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [2,3]};
				}

				if(botMarshPar.topTurn == 'площадка'){
					polePar.newellName = 'Задний левый столб' + ' марш ' + par.marshId;
					var newell = drawPole3D_4(polePar).mesh;
					polePar.fixPoints = null;//Очищаем тк св-ва общие для нескольких столбов\
					polePar.timberTopFix = null;//Очищаем тк св-ва общие для нескольких столбов
					newell.position.x = pos3.x;
					newell.position.y = pos3.y;
					newell.position.z = pos3.z;
					par.columns.add(newell);
				}
			}
		}
		//задний правый
		{
			var pos4 = {
				x: rearPosX,
				y: 0,
				z: rightPosZ - params.rackSize,
			}
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos4.x, pos4.y)
			if (botMarshPar.topTurn == "забег") {
				polePar.length = par.height + botMarshPar.h_topWnd;
				if(turnFactor == 1) {
					polePar.length += botMarshPar.h_topWnd;
					if(par.turnId == 1 && params.stairModel == "П-образная с забегом") polePar.length = 0;
				}
			}
		
			if(polePar.length > 0){
				if (turnFactor == 1 && params.stairModel !== 'П-образная с площадкой') {
					var basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 4};
					var basePointHole2 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 2};
					polePar.fixPoints = [basePointHole1, basePointHole2];
					if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [2,3]};
					if(botMarshPar.topTurn == 'площадка') {
						basePointHole3 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 1};
						polePar.fixPoints.push(basePointHole3);
						polePar.timberTopFix = {boltIds: [4,2]};
					}
				}

				if (turnFactor == 1 && params.stairModel == 'П-образная с площадкой') {
					var basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 1};
					var basePointHole2 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 2};
					polePar.fixPoints = [basePointHole1, basePointHole2];
				}
		
				if (turnFactor == -1) {
					var basePointHole1 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 1};
					var basePointHole2 = {type: 'stringerFixing', x:20, y: polePar.length - 50, side: 2};
					polePar.fixPoints = [basePointHole1, basePointHole2];
					if(botMarshPar.topTurn == 'площадка') polePar.timberTopFix = {boltIds: [2,4]};
					if(botMarshPar.topTurn == 'забег') polePar.timberTopFix = {boltIds: [2,4]};
				}
				if(botMarshPar.topTurn == 'площадка'){
					polePar.newellName = 'Задний правый столб' + ' марш ' + par.marshId;
					var newell = drawPole3D_4(polePar).mesh;
					polePar.fixPoints = null;//Очищаем тк св-ва общие для нескольких столбов
					polePar.timberTopFix = null;//Очищаем тк св-ва общие для нескольких столбов
					newell.position.x = pos4.x;
					newell.position.y = pos4.y;
					newell.position.z = pos4.z;
					par.columns.add(newell);
				}
			}

		}
	}
	
	//перемычки
	var polePar = {
		poleProfileY: 228,
		poleProfileZ: params.stringerThickness,
		dxfBasePoint: par.dxfBasePoint,
		length: 0, //переопределяется для каждой перемычки
		poleAngle: 0,
		partName: "timberPole",
		marshId: par.marshId,
		material: params.materials.timber,
	}

	if (botMarshPar.stairAmt == 0 && par.marshId == 1) {
		polePar.poleProfileY = 228;
		if ((botMarshPar.h - params.treadThickness) < 228) {
			polePar.poleProfileY = botMarshPar.h - params.treadThickness;
		}
	}
	//Отрисовка перемычек
	{
		//перемычка левая
		{
			var pos = {
				x: pos1.x,
				y: par.height - polePar.poleProfileY,
				z: pos1.z + (params.rackSize - params.stringerThickness),
			}
			polePar.length = pos3.x - pos1.x - params.rackSize;
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y)
			//косоур забега
			// if(botMarshPar.topTurn == "забег" && turnFactor == 1) {
			// 	polePar.marshId = par.marshId;
			// 	polePar.type = "side";
			// 	polePar.turnId = par.turnId;
			// 	var stringer = drawTurnStringer(polePar).mesh;
			// 	stringer.position.x = pos.x;
			// 	stringer.position.y = pos.y;
			// 	stringer.position.z = pos.z;
			// 	par.stringers.add(stringer);
			// }
			//Косоур площадки
			if(botMarshPar.topTurn == "площадка") {
				if ($sceneStruct["vl_1"]["newell_fixings"]) {
					polePar.roundHoles = [
						{x: 30 + 20, y: 50 + 32, diam: 40},
						{x: 30 + 20, y: 50 + 32 + 96, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32 + 96, diam: 40},
					]
				}
				if (botMarshPar.stairAmt == 0 && par.marshId == 1) polePar.roundHoles = [];
		
				var stringer = drawPole3D_4(polePar).mesh;
				stringer.position.x = pos.x;
				stringer.position.y = pos.y;
				stringer.position.z = pos.z;
				par.stringers.add(stringer);
			}
		}
		//перемычка правая
		{
			var pos = {
				x: pos2.x,
				y: par.height - polePar.poleProfileY,
				z: pos2.z,
			}
			polePar.length = pos3.x - pos1.x - params.rackSize;
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y)
			
			//косоур забега
			// if(botMarshPar.topTurn == "забег" && turnFactor == -1) {
			// 	polePar.type = "side";
			// 	polePar.turnId = par.turnId;
			// 	var stringer = drawTurnStringer(polePar).mesh;
			// 	stringer.position.x = pos.x;
			// 	stringer.position.y = pos.y;
			// 	stringer.position.z = pos.z;
			// 	par.stringers.add(stringer);
			// }
			
			//косоур площадки
			if(botMarshPar.topTurn == "площадка") {
				if ($sceneStruct["vl_1"]["newell_fixings"]) {
					polePar.roundHoles = [
						{x: 30 + 20, y: 50 + 32, diam: 40},
						{x: 30 + 20, y: 50 + 32 + 96, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32 + 96, diam: 40},
					]
				}
				if (botMarshPar.stairAmt == 0 && par.marshId == 1) polePar.roundHoles = [];
				var stringer = drawPole3D_4(polePar).mesh;
				stringer.position.x = pos.x;
				stringer.position.y = pos.y;
				stringer.position.z = pos.z;
				par.stringers.add(stringer);
			}
		}
		//перемычка передняя
		if(params.stairModel == "П-образная с площадкой"){
			var pos = {
				x: pos1.x - params.rackSize + params.stringerThickness,
				y: par.height - polePar.poleProfileY,
				z: pos1.z + params.rackSize,
			}
			polePar.roundHoles = [];
			polePar.length = pos2.z - pos1.z - params.rackSize;
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y)
			var stringer = drawPole3D_4(polePar).mesh;
			stringer.rotation.y = -Math.PI / 2
			stringer.position.x = pos.x;
			stringer.position.y = pos.y;
			stringer.position.z = pos.z;
			par.stringers.add(stringer);
		}
		//перемычка задняя
		{
			var pos = {
				x: pos3.x,
				y: par.height - polePar.poleProfileY,
				z: pos1.z + params.rackSize,
			}
			polePar.length = pos2.z - pos1.z - params.rackSize;
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y)
			
			// if(botMarshPar.topTurn == "забег") {
			// 	polePar.type = "rear";
			// 	polePar.turnId = par.turnId;
			// 	if(par.turnId == 1 && params.stairModel == "П-образная с забегом"){
			// 		polePar.length += params.rackSize + params.marshDist;
			// 	}
			// 	var stringer = drawTurnStringer(polePar).mesh;
			// 	pos.y += nextMarshPar.h;
			// }
			if (params.stairModel == 'П-образная с площадкой' && !(botMarshPar.stairAmt == 0 && par.marshId == 1)) {
				if ($sceneStruct["vl_1"]["newell_fixings"]) {
					polePar.roundHoles = [
						{x: 30 + 20, y: 50 + 32, diam: 40},
						{x: 30 + 20, y: 50 + 32 + 96, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32 + 96, diam: 40},
					]
				}
			}
		
			if (botMarshPar.topTurn == 'площадка') {
				if ($sceneStruct["vl_1"]["newell_fixings"]) {
					polePar.roundHoles = [
						{x: 30 + 20, y: 50 + 32, diam: 40},
						{x: 30 + 20, y: 50 + 32 + 96, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32, diam: 40},
						{x: polePar.length - 30 - 20, y: 50 + 32 + 96, diam: 40},
					]
				}
				if (botMarshPar.stairAmt == 0 && par.marshId == 1) polePar.roundHoles = [];
				var stringer = drawPole3D_4(polePar).mesh;
				stringer.rotation.y = -Math.PI / 2
				stringer.position.x = pos.x;
				stringer.position.y = pos.y;
				stringer.position.z = pos.z;
				if(par.turnId == 1 && params.stairModel == "П-образная с забегом" && turnFactor == -1){
					stringer.position.z -= params.rackSize + params.marshDist;
				}
				par.stringers.add(stringer);
			}
		}
		//перемычка средняя
		if(params.stairModel == "П-образная с площадкой"){
			var pos = {
				x: pos1.x - params.rackSize + params.stringerThickness,
				y: par.height - polePar.poleProfileY,
				z: (params.M /2  + params.marshDist / 2) * turnFactor - params.stringerThickness / 2,
			}
			polePar.roundHoles = [];
			polePar.length = pos3.x - pos1.x + params.rackSize - params.stringerThickness * 2;
			polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y)
			
			var stringer = drawPole3D_4(polePar).mesh;
			stringer.position.x = pos.x;
			stringer.position.y = pos.y;
			stringer.position.z = pos.z;
			par.stringers.add(stringer);
		}
	}
	
	//проставки между забежными ступенями
	if (botMarshPar.topTurn == "забег") {
		var polePar = {
			poleProfileY: params.rackSize,
			poleProfileZ: params.rackSize,
			dxfBasePoint: par.dxfBasePoint,
			length: botMarshPar.h_topWnd - params.treadThickness - 0.2,
			poleAngle: Math.PI / 2,
			partName: "timberPole",
			material: params.materials.timber,
		}
		if (!testingMode) {
			polePar.timberTopFix = {boltIds: [1,2,3,4,5]};
		}
		var pos = copyPoint(pos2);
		if(turnFactor == -1) pos = copyPoint(pos1);

		pos.y += par.height + params.treadThickness + 0.1;
		
		var botPoleParams = Object.assign({}, polePar);//Копируем параметры для отличающейся части
		if (par.marshId > 1) {
			botPoleParams.length = par.height;
		}else{
			botPoleParams.length = botMarshPar.height + botMarshPar.h - params.treadThickness;
		}
	
		var newell = drawPole3D_4(botPoleParams).mesh;
		newell.position.x = pos.x;
		newell.position.y = pos.y - botPoleParams.length - params.treadThickness - 0.1;//0.1 зазор// - botMarshPar.height;
		newell.position.z = pos.z;
		par.columns.add(newell);

		var deltaLen = 100 * 2;

		var boltPar = {
			diam: 10,
			len: botMarshPar.h_topWnd * 2 + deltaLen,
			dopParams: {},
		}
		var bolt = drawStudF(boltPar);
		bolt.position.x = pos.x - params.rackSize / 2;
		bolt.position.y = pos.y - deltaLen / 2 + botMarshPar.h * 1.5;
		bolt.position.z = pos.z + params.rackSize / 2;
		if(!testingMode) par.columns.add(bolt);

		var botNutPos = {
			x: pos.x - params.rackSize / 2,
			y: pos.y - boltPar.len / 2 - deltaLen / 2 + botMarshPar.h * 1.5,
			z: pos.z + params.rackSize / 2
		}

		var nutParams = { diam: 10}
		var nut = drawNut(nutParams).mesh;
		nut.position.x = botNutPos.x;
		nut.position.y = botNutPos.y;
		nut.position.z = botNutPos.z;
		if(!testingMode) par.columns.add(nut);

		var shimParams = { diam: 10 }
		var shim = drawShim(shimParams).mesh;
		shim.position.x = botNutPos.x;
		shim.position.y = botNutPos.y + 8;
		shim.position.z = botNutPos.z;
		if(!testingMode) par.columns.add(shim);

		var nutParams = { diam: 10}
		var nut = drawNut(nutParams).mesh;
		nut.position.x = botNutPos.x;
		nut.position.y = botNutPos.y + boltPar.len - 8;
		nut.position.z = botNutPos.z;
		if(!testingMode) par.columns.add(nut);

		var shimParams = { diam: 10 }
		var shim = drawShim(shimParams).mesh;
		shim.position.x = botNutPos.x;
		shim.position.y = botNutPos.y + boltPar.len - 8 - 8;
		shim.position.z = botNutPos.z;
		if(!testingMode) par.columns.add(shim);
		
		for(var i=0; i<2; i++){
			var newell = drawPole3D_4(polePar).mesh;
			newell.position.x = pos.x;
			newell.position.y = pos.y;
			newell.position.z = pos.z;
			par.columns.add(newell);
			pos.y += botMarshPar.h_topWnd;
		}
	}
	
	//столб ограждения

	if(botMarshPar.hasRailing.in || nextMarshPar.hasRailing.in){
		var newellLen = 450;
		if(nextMarshPar.hasRailing.in) newellLen = 1100;
		if(params.stairModel == "П-образная с площадкой") newellLen = 1100;
		var polePar = {
			poleProfileY: params.rackSize,
			poleProfileZ: params.rackSize,
			dxfBasePoint: par.dxfBasePoint,
			length: newellLen,
			poleAngle: Math.PI / 2,
			partName: "timberPole",
			material: params.materials.timber,
			}
		var pos = copyPoint(pos2);
		if(turnFactor == -1) pos = copyPoint(pos1);
		//если только один столб
		if(params.stairModel == "П-образная с площадкой"){
			pos.x -= params.nose;
			//столб ограждений нижнего марша
			if(botMarshPar.hasRailing.in){
				pos.z = params.M / 2 * turnFactor;
				if(turnFactor == 1) pos.z -= params.rackSize;
			}
			
			if(!botMarshPar.hasRailing.in) {
				pos.z = (params.M / 2 + params.marshDist) * turnFactor;
			}
		}
		pos.y += par.height + params.treadThickness + 0.1;
		if (botMarshPar.topTurn == "забег")
			pos.y += botMarshPar.h_topWnd * 2;
		
		var newell = drawPole3D_4(polePar).mesh;
		newell.position.x = pos.x;
		newell.position.y = pos.y;
		newell.position.z = pos.z;
		par.columns.add(newell);
		
		//второй столб
		if(params.stairModel == "П-образная с площадкой" && botMarshPar.hasRailing.in && nextMarshPar.hasRailing.in){
			pos.z = (params.M / 2 + params.marshDist) * turnFactor;
			if(turnFactor == -1) pos.z -= params.rackSize;
			
			var newell = drawPole3D_4(polePar).mesh;
			newell.position.x = pos.x;
			newell.position.y = pos.y;
			newell.position.z = pos.z;
			par.columns.add(newell);
		}
	}
	
	return par;
}

/**
 * Функция отрисовывает цилиндры для эмитации отверстий крепления косоуров
 * @par basePoint - {x,y,z,rot} - положение отверстий
 * @returns Object3D
 */
function drawStringerHoleElements(basePoint){
	var object = new THREE.Object3D();
	var material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
	var minRadius = 8 / 2;
	var maxRadius = 12 / 2;
	var height = 80;
	var segments = 32;
	if(typeof basePoint == 'undefined') basePoint = {};
	var boltPar = {
		headType: "шпилька",
		diam: 10,
		len: 100
	}
	var nagelPar = {
		id: "nagel",
		description: "Крепление косоуров к столбам",
		group: "Каркас"
	}

	//Крепление косоуров к столбам
	// var geometry = new THREE.CylinderGeometry( minRadius, minRadius, height, segments );
	// var cylinder = new THREE.Mesh( geometry, material );
	var bolt = drawBolt(boltPar).mesh;
	if(!testingMode) object.add( bolt );

	// var geometry = new THREE.CylinderGeometry( maxRadius, maxRadius, height, segments );
	// var cylinder = new THREE.Mesh( geometry, material );
	var nagel = drawNagel(nagelPar);
	nagel.position.x = -32;
	if(!testingMode) object.add( nagel );

	
	// var geometry = new THREE.CylinderGeometry( minRadius, minRadius, height, segments );
	// var cylinder = new THREE.Mesh( geometry, material );
	// object.add( cylinder );
	var bolt = drawBolt(boltPar).mesh;
	bolt.position.x = -96;
	if(!testingMode) object.add( bolt );
	
	// var geometry = new THREE.CylinderGeometry( maxRadius, maxRadius, height, segments );
	// var cylinder = new THREE.Mesh( geometry, material );
	// cylinder.position.x = -128;
	// object.add( cylinder );
	var nagel = drawNagel(nagelPar);
	nagel.position.x = -128;
	if(!testingMode) object.add( nagel );

	object.position.x = basePoint.x || 0;
	object.position.y = basePoint.y || 0;
	object.position.z = basePoint.z || 0;
	object.rotation.z += Math.PI / 2;
	object.rotation.y += basePoint.rot || 0;

	return object;
}

/** функция отрисовывает косоур площадки
*/

function drawTurnStringer(par){
	par.mesh = new THREE.Object3D();
	
	//Необязательные параметры
	if(!par.dxfArr) par.dxfArr = dxfPrimitivesArr;
	if(!par.dxfBasePoint) {
		par.dxfBasePoint = {x:0, y:0},
		par.dxfArr = [];
		}
	if(!par.material) par.material = params.materials.timber;
	if(!par.layer) par.layer = "parts";
	
	var botMarshPar = getMarshParams(par.marshId);
	var nextMarshPar = getMarshParams(botMarshPar.nextMarshId);
	var wndPar = treadsObj.wndPar
	if(par.turnId == 2) wndPar = treadsObj.wndPar2
	
	if(par.type == "side"){
		var wndTreadPar = wndPar.params[1];	
		var wndStep = wndTreadPar.stepWidthHi - params.nose - params.rackSize;
		//учитывем отступ косоура от края ступени
		wndStep -= Math.tan(wndTreadPar.edgeAngle) * (params.rackSize - params.stringerThickness);
		if(params.riserType == "есть"){
			wndStep += params.riserThickness / Math.cos(wndTreadPar.edgeAngle) + 0.1
		}
	}

	if(par.type == "rear"){
		var wndTreadPar = wndPar.params[2];	
		var wndStep = wndTreadPar.stepWidthX - params.rackSize;
		//учитывем отступ косоура от края ступени
		wndStep += Math.tan(wndTreadPar.angleY) * (params.stringerThickness);
		if(params.riserType == "есть"){
			wndStep += params.riserThickness / Math.cos(wndTreadPar.angleY) + 0.1
		}		
	}
	
	var p0 = {x:0, y:0};
	if (params.stairModel == 'П-образная с забегом' && par.turnId == 1 && params.riserType == 'есть') {
		par.length += params.riserThickness;
		if (turnFactor == -1) {
			p0.x += params.riserThickness;
		}
	}
	var p1 = newPoint_xy(p0, 0, par.poleProfileY)
	var p2 = newPoint_xy(p1, wndStep, 0)
	var p3 = newPoint_xy(p2, 0, nextMarshPar.h)
	var p4 = newPoint_xy(p0, par.length, par.poleProfileY + nextMarshPar.h)
	var p5 = newPoint_xy(p0, par.length, 0)
	
	//Фиксируем высоту косоура на 228, чтобы удобно было сверлить
	p5.y = p4.y - 228;
	
	//Делаем прямой скос в начале, чтобы узел был симпатичный
	var ang = angle(newPoint_xy(p0, 0, -100), p5);
	var p6 = itercection(p5, polar(p5, ang, -100), p0, newPoint_xy(p0, 100, 0));
	
	//Кладем на пол нижнюю грань
	if (botMarshPar.stairAmt == 0 && par.marshId == 1 && par.type == 'side') {
		p0.y = 0;
		p5.y = 0;
	}
	if (botMarshPar.stairAmt == 1 && par.marshId == 1 && par.type == 'side' && p0.y < 0) p0.y = 1;//Устанавливаем точку на уровень пола, если она ниже
	var points = [p0, p1, p2, p3, p4, p5, p6];


	//Зеркалим контур для левой лестницы
	if(turnFactor == -1 && par.type == "rear") {
		points = mirrowPoints(points, "y");
		points = moovePoints(points, {x: par.length, y: 0,})
	}
	
	var shapePar = {
		points: points,
		dxfArr: par.dxfArr,
		dxfBasePoint: par.dxfBasePoint,
		markPoints: false, //пометить точки в dxf для отладки
	}
	var shape = drawShapeByPoints2(shapePar).shape;

	//отверстия для крепления косоуров к столбам
	if ($sceneStruct["vl_1"]["newell_fixings"]) {
		var slotDiam = 40;
		var xSlotOffset = 30 + slotDiam / 2;
		var ySlotOffset = 50;
	
		if ((p1.y - p0.y) >= 228) {
			var center = newPoint_xy(p1, xSlotOffset, -ySlotOffset);
			if (turnFactor == -1 && par.type == 'rear') center.y += nextMarshPar.h;
			addRoundHole(shape, par.dxfArr, center, slotDiam/2, par.dxfBasePoint);
			var center2 = newPoint_xy(center, 0, -96);
			addRoundHole(shape, par.dxfArr, center2, slotDiam/2, par.dxfBasePoint);
		}
		if ((p4.y - p5.y) >= 228) {
			var center = newPoint_xy(p4, -xSlotOffset, -ySlotOffset);
			if (turnFactor == -1 && par.type == 'rear') center.y -= nextMarshPar.h;
			addRoundHole(shape, par.dxfArr, center, slotDiam/2, par.dxfBasePoint);
			var center2 = newPoint_xy(center, 0, -96);
			addRoundHole(shape, par.dxfArr, center2, slotDiam/2, par.dxfBasePoint);
		}
	}
	
	var extrudeOptions = {
        amount: par.poleProfileZ,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};

    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var mesh = new THREE.Mesh(geom, par.material);
	par.mesh.add(mesh);
	
	var partName = "pltStringer";
	if (typeof specObj != 'undefined'){
		if (!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Косоур площадки",
				area: 0,
				paintedArea: 0,
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "area", //единица измерения
				group: "stringers",
			}
		}


		var name = Math.round(par.length);
		var area = 300 * par.length / 1000000;

		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}
	par.mesh.specId = partName + name;
	
	return par;

}//end of drawTurnStringer

//----------------------------------------------------

function drawStrightStringer(par) {

	var stringerHoles = [];// Массив выдавливаемых отверстий, для тестов.

	//рассчитываем параметры косоура по номеру марша и стороне
	calcStringerPar(par);

	//именованные ключевые точки
	// if(!par.keyPoints) par.keyPoints = {};
	par.keyPoints.zeroPoint = { x: 0, y: 0 };

	var thk = params.stringerThickness - params.stringerSlotsDepth;
	if (par.slots == true) thk = params.stringerSlotsDepth
	var extrudeOptions = {
		amount: thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var marshPar = getMarshParams(par.marshId); //функция в файле inputsReading.js
	var h = marshPar.h;
	var b = marshPar.b;
	var a = marshPar.a;
	var stairAmt = marshPar.stairAmt
	var risers = params.riserType == "есть";

	var dxfBasePoint = par.dxfBasePoint;
	//выводим в dxf только конутур с пазами
	var dxfArr = dxfPrimitivesArr;
	if (!par.slots) dxfArr = [];

	par.slotsOffset = 20;

	var topPointOffsetY = 20; //отступ среза верхнего угла тетивы от уровня верхнего перекрытия для регулировки

	par.meshes = [];

	var stringerWidth = 300;
	if (par.type == "косоур") {
		stringerWidth = 200;
		if (params.calcType == 'timber_stock') stringerWidth = 228;
	}
	par.width = stringerWidth;

	var stairAngle = Math.atan(h / b)
	par.stairAngle = stairAngle

	var stringerOffset_y = 0;

	var stringerShape = new THREE.Shape();

	var text = par.treadDescription;
	var textHeight = 30;
	var textBasePoint = newPoint_xy(dxfBasePoint, 0, -100)
	addText(text, textHeight, dxfArr, textBasePoint);

	//нижние точки
	var botLine = calcBotStepPoints(par);

	var topLineP0 = botLine.topLineP0;
	var topLineP01 = botLine.topLineP01;
	var topLineP02 = botLine.topLineP02;
	var topLineP1 = botLine.topLineP1;
	var topLineP10 = botLine.topLineP10;
	var topLineP11 = botLine.topLineP11;
	var botLineP10 = botLine.botLineP10;
	var bottomLine = botLine.bottomLine;

	//массив точек внешнего контура косоура
	var topLine = [];


	if (par.type == "косоур") {
		//сохраняем точку для ограждений
		// par.keyPoints.marshRailingP1 = copyPoint(topLineP10);

		topLine.push(topLineP0)
		//паз под подступенок
		if (params.riserType == "есть" && par.botEnd == "столб" && par.slots && params.calcType != "timber_stock") {
			topLine.push(topLineP01)
			topLine.push(topLineP02)
		}
		//уступ чтобы дотянуться косоуром до столба
		if ((params.riserType == "есть" || params.stairModel == "П-образная с площадкой") && par.botEnd != "пол" && params.calcType == "timber_stock") {
			topLine.push(topLineP01)
			topLine.push(topLineP02)
		}
		topLine.push(topLineP1)
		topLine.push(topLineP10)
		if (testingMode) {
			topLineP10.y -= 0.01
		}

		//цикл построения ступеней
		var p2 = newPoint_xy(topLineP10, 0.01, 0);

		for (var i = 1; i < stairAmt - 1; ++i) {
			p2 = newPoint_xy(p2, 0, h); //подъем ступени
			topLine.push(p2);
			p2 = newPoint_xy(p2, b, 0);
			topLine.push(p2); //проступь
		}

		//последний подъем ступени
		p2 = newPoint_xy(p2, -0.01, h);
		topLine.push(p2);

		//проступь
		var botLineP1 = newPoint_xy(p2, b - nose, 0);
		if (risers) botLineP1 = newPoint_xy(botLineP1, -params.riserThickness, 0);

		var newellSlotDepth = par.newellSlotDepth; //глубина паза в столбе под косоур
		if (par.topEnd == "столб") {
			var treadOffset = 10; //отступ края ступени от края столба
			if (params.stairModel == 'П-образная с площадкой') {
				treadOffset = 30
			}
			//fix
			botLineP1 = newPoint_xy(botLineP1, -treadOffset + newellSlotDepth - 0.05, 0);
		}

		if (params.calcType == "timber_stock") {
			botLineP1 = newPoint_xy(p2, b, 0);
			if (risers && marshPar.lastMarsh) botLineP1 = newPoint_xy(botLineP1, -params.riserThickness, 0);
		}

		topLine.push(botLineP1);

		//контур нижней части косоура

		//Точка пересечения нижней линии с задней линией
		var botLineP2 = itercection(botLineP1, newPoint_xy(botLineP1, 0, 100), bottomLine.p1, bottomLine.p2);
		//массив точек нижней линии
		var botLine = [botLineP2, botLineP10];

		//вырез внизу косоура для вставки в столб
		if (par.topEnd == "столб" && params.calcType != "timber_stock") {
			var notchHeight = 30; //высота выреза снизу косоура
			var botLineP4 = newPoint_x1(botLineP2, -newellSlotDepth, par.stairAngle)
			var botLineP3 = newPoint_xy(botLineP4, 0, notchHeight);
			botLineP2 = newPoint_xy(botLineP3, newellSlotDepth, 0);
			botLine = [botLineP2, botLineP3, botLineP4, botLineP10];
		}

		//вырез под колонну
		if (par.column) {
			var notchPar = {
				points: botLine,
				notchCenterX: (Math.floor(stairAmt / 2) + 1) * a + params.rackSize / 2 - 40 + (params.riserType == 'есть' ? params.riserThickness : 0), //40 подогнано
				isBotLine: true,
			}
			botLine = addNotch(notchPar).points;
			var columnPos = copyPoint(notchPar.notchCenterPoint);
			// columnPos.treadYOffset = h + params.treadThickness;
			columnPos.treadYOffset = ((Math.floor(stairAmt / 2) + 1) * h + h) - columnPos.y;//+ params.treadThickness;
			if (par.slots) par.columnsPoints.push(columnPos);

			par.excerptDepth = 100;
		}

		if (stairAmt == 1) {
			topLine = [];

			if (params.riserType == 'есть') {
				topLineP0.x += params.riserThickness;
			}
			if (!par.slots && params.riserType == 'есть') {
				topLineP1.x += params.riserThickness;
			}

			// topLine.push(newPoint_xy(topLineP0, -5, 0))
			// topLine.push(newPoint_xy(topLineP1, -5, 0))

			topLineP0.y = topLineP1.y - h;
			var botPoint2 = newPoint_xy(topLineP0, a - params.nose - 0.1, 0);

			topLine.push(topLineP0)
			topLine.push(topLineP1)
			topLine.push(newPoint_xy(topLineP1, a - params.nose - 0.1, 0));

			// if (params.riserType == 'есть') {
			// 	botPoint.x += params.riserThickness;
			// }

			botLine = [botPoint2];
		}

		//Переменные отвечают за наличие отверстий под крепеж к столбу на timber_stock
		var hasBotFixingHoles = true;
		var hasTopFixingHoles = true;

		if (params.calcType == 'timber_stock' && stairAmt == 0) {
			botLine = [];
			topLine = [];
			var length = params.marshDist + params.nose;
			if (params.riserType == 'нет') length -= params.riserThickness;
			if (par.marshId == 2 && params.stairModel == 'П-образная с забегом' && par.side == 'in') {
				length = params.marshDist;
			}

			var p1 = { x: -params.marshDist + params.nose, y: -params.treadThickness };
			var p2 = newPoint_xy(p1, 0, -228);
			var p3 = newPoint_xy(p1, length, -228);
			var p4 = newPoint_xy(p1, length, 0);
			botLine.push(p2, p3);
			topLine.push(p4, p1);

			hasBotFixingHoles = false;
			hasTopFixingHoles = false;
		}

		if (params.calcType == 'timber_stock' && par.marshId == 1 && stairAmt == 1) {
			botLine = [];
			topLine = [];
			var length = b;
			var p1 = { x: params.nose, y: h - params.treadThickness };
			if (params.riserType == 'есть') p1.x += params.riserThickness

			var p2 = newPoint_xy(p1, 0, -h + params.treadThickness);
			var p3 = newPoint_xy(p1, length, -h + params.treadThickness);
			var p4 = newPoint_xy(p1, length, 0);
			botLine.push(p2, p3);
			topLine.push(p4, p1);

			botLineP1 = copyPoint(p4);

			hasBotFixingHoles = false;
			hasTopFixingHoles = false;

			par.keyPoints.botPoint = p2;
		}

		if (params.calcType == 'timber_stock' && stairAmt == 1 && par.marshId !== 1) {
			botLine = [];
			topLine = [];

			var height = 228;
			// if (marshPar.botTurn == 'площадка') {
			// 	height = ((marshPar.h - params.treadThickness) > 228 ? 228 : (marshPar.h - params.treadThickness));
			// }

			//base(topline)
			var p1 = { x: params.nose, y: -params.treadThickness };
			//bot
			var p2 = newPoint_xy(p1, 0, -height);
			// if (marshPar.topTurn == 'забег' && getMarshParams(marshPar.prevMarshId).stairAmt > 0) {
			// 	height = 228;
			// 	p2 = newPoint_xy(p1, 0, -height);
			// 	hasFixingHoles = true;
			// }
			var p3 = newPoint_xy(p2, a, h);
			if (params.riserType == 'нет') p3.x -= params.nose;

			//top
			var p4 = newPoint_xy(p1, 0, 0);
			if (params.riserType == 'есть') {
				var p4 = newPoint_xy(p1, params.riserThickness, 0);
			}
			var p5 = newPoint_xy(p4, 0, h);
			var p6 = newPoint_xy(p5, b, 0);

			//Корректируем точки в случае если снизу площадка и 0 ступеней
			// if (marshPar.botTurn == 'площадка' && getMarshParams(marshPar.prevMarshId).stairAmt == 0) {
			// 	p2.y = p1.y - getMarshParams(marshPar.prevMarshId).h + params.treadThickness;
			// 	p3 = newPoint_xy(p2, a, h);

			// 	if (marshPar.topTurn == 'забег') {
			// 		p3.y = p6.y - 228;
			// 		if (p3.y < p2.y) p3.y = p2.y;
			// 	}
			// 	hasBotFixingHoles = false;
			// 	hasTopFixingHoles = false;
			// }

			botLine.push(p2, p3);
			topLine.push(p6, p5, p4, p1);

			topLineP0 = newPoint_xy(p1, 0, -228); // bot
			botLineP1 = p6; // top
			if (par.marshId == 3) {//3 марш всегда без отверстий
				hasBotFixingHoles = false;
				hasTopFixingHoles = false;
			}
		}

		var shapePar = {
			points: topLine.concat(botLine),
			dxfArr: dxfArr,
			dxfBasePoint: par.dxfBasePoint,
			markPoints: true //пометить точки в dxf для отладки
		}
		if (par.slots) shapePar.drawing = { group: "stringer", dimPoints: [{ p1: par.keyPoints.botPoint, p2: par.keyPoints.topPoint, type: 'dist' }] };
		stringerShape = drawShapeByPoints2(shapePar).shape;

		//отверстия для крепления ступеней
		if (par.slots == true) {
			var xSlotOffset = 25.5;
			var ySlotOffset = 25.5;
			var slotDiam = 25.5;

			var treadMetis = new THREE.Object3D();
			var screwPar = {
				id: "screw_4x35",
				description: "Крепление ступеней к косоуру",
				group: "Ступени"
			}

			for (var i = 0; i < stairAmt; ++i) {
				var center = { x: b * i + (a - b) + (risers == true ? params.riserThickness : 0) + xSlotOffset, y: h * (i + 1) - params.treadThickness - ySlotOffset }
				addRoundHole(stringerShape, dxfArr, center, slotDiam / 2, dxfBasePoint);

				var screw = drawScrew(screwPar).mesh;
				screw.position.x = center.x;
				screw.position.y = center.y;
				screw.position.z = 0;
				if (turnFactor == -1) screw.position.z = params.stringerSlotsDepth;
				if (!testingMode) treadMetis.add(screw);

				var plug = drawTimberPlug(25);
				plug.position.x = center.x;
				plug.position.y = center.y;
				// if (turnFactor == 1) plug.position.z = params.stringerSlotsDepth;
				plug.rotation.z = Math.PI / 2;
				plug.rotation.y = Math.PI / 2;
				if (!testingMode) treadMetis.add(plug);

				if (params.riserType == "нет") {
					var center2 = newPoint_xy(center, marshPar.b - xSlotOffset * 3, 0);
					addRoundHole(stringerShape, dxfArr, center2, slotDiam / 2, dxfBasePoint);

					var screw = drawScrew(screwPar).mesh;
					screw.position.x = center2.x;
					screw.position.y = center2.y;
					screw.position.z = 0;
					// if (turnFactor == -1) screw.position.z = params.stringerSlotsDepth;
					if (!testingMode) treadMetis.add(screw);

					var plug = drawTimberPlug(25);
					plug.position.x = center2.x;
					plug.position.y = center2.y;
					if (turnFactor == 1) plug.position.z = params.stringerSlotsDepth;
					plug.rotation.z = Math.PI / 2;
					plug.rotation.y = Math.PI / 2;
					if (!testingMode) treadMetis.add(plug);
				}
			}
			par.meshes.push(treadMetis);
		}

		//отверстия для крепления косоуров к столбам
		if ($sceneStruct["vl_1"]["newell_fixings"] && params.calcType == "timber_stock") {
			var slotDiam = 12;
			var xSlotOffset = 30 + slotDiam / 2;
			var ySlotOffset = 50;

			if (marshPar.lastMarsh) hasTopFixingHoles = false;
			if (par.marshId == 1) hasBotFixingHoles = false;
			if (par.side == 'in' && marshPar.botTurn == 'забег') {
				hasBotFixingHoles = false;
			}
			if (params.stairModel == 'П-образная с площадкой' && par.side == 'in') {
				hasBotFixingHoles = false;
				hasTopFixingHoles = false;
			}

			if (hasTopFixingHoles) {
				var center = newPoint_xy(botLineP1, -xSlotOffset, -ySlotOffset);
				addRoundHole(stringerShape, dxfArr, center, slotDiam / 2, dxfBasePoint);
				var center2 = newPoint_xy(center, 0, -96);
				addRoundHole(stringerShape, dxfArr, center2, slotDiam / 2, dxfBasePoint);
			}
			if (hasBotFixingHoles) {
				var center = newPoint_xy(topLineP0, xSlotOffset, 228 - ySlotOffset);
				addRoundHole(stringerShape, dxfArr, center, slotDiam / 2, dxfBasePoint);
				var center2 = newPoint_xy(center, 0, -96);
				addRoundHole(stringerShape, dxfArr, center2, slotDiam / 2, dxfBasePoint);
			}
		}

		//отверстия для крепления косоуров к столбам
		if ($sceneStruct["vl_1"]["newell_fixings"] && params.calcType == "timber_stock" && stairAmt == 1) {
			var slotDiam = 40;
			var xSlotOffset = 30 + slotDiam / 2;
			var ySlotOffset = 64;
			hasTopFixingHoles = true;

			if (marshPar.lastMarsh) hasTopFixingHoles = false;
			if (hasTopFixingHoles) {
				var center = newPoint_xy(p4, -xSlotOffset, -ySlotOffset);
				addRoundHole(stringerShape, dxfArr, center, slotDiam / 2, dxfBasePoint);
			}
		}

		//сохраняем точки для отрисовки верхнего столба
		par.botLineP1 = copyPoint(botLineP1);
		par.botLineP2 = copyPoint(botLineP2);

		par.keyPoints.botPoint = topLineP0;
		par.keyPoints.topPoint = botLineP1;
		//сохраняем точки для столбов ограждений
		// par.keyPoints.rack1Pos = newPoint_xy(topLineP0, - params.rackSize/2, 0);
		// if(par.botEnd == "пол" && params.riserType == "есть") par.keyPoints.rack1Pos.x -= params.riserThickness;
		// if(par.botEnd == "столб") par.keyPoints.rack1Pos.x += newellSlotDepth;
		// if(par.botEnd == "пол" && params.firstNewellPos == "на первой ступени") par.keyPoints.rack1Pos = newPoint_xy(par.keyPoints.rack1Pos, params.rackSize, h);
		// if(par.botEnd == "пол" && params.firstNewellPos == "на второй ступени") par.keyPoints.rack1Pos = newPoint_xy(par.keyPoints.rack1Pos, params.rackSize + a, h * 2);

		// par.keyPoints.rack2Pos = newPoint_xy(botLineP1, params.rackSize/2, 0);
		// if(par.topEnd == "столб") par.keyPoints.rack2Pos.x -= newellSlotDepth;
	} //конец косоура

	if (par.type == "тетива") {

		var newellSlotDepth = params.stringerSlotsDepth; //глубина паза в столбе под тетиву
		// if (params.stairModel == "П-образная трехмаршевая" && marshPar.topTurn == 'забег' && params.model == 'тетивы') {
		// 	newellSlotDepth += 20;//FIX
		// }
		// if (params.stairModel == "П-образная с забегом" && params.model == 'тетивы') {
		// 	newellSlotDepth += 20;//FIX
		// }
		// if (params.stairModel == "Г-образная с забегом") {
		// 	newellSlotDepth += 20;//FIX
		// }
		//сохраняем точки для ограждений
		par.keyPoints.marshRailingP1 = copyPoint(topLineP1);
		par.keyPoints.marshFirstRailingPoint = copyPoint(topLineP1);

		//вырез сверху тетивы
		if (par.botEnd == "столб") {
			topLine.push(topLineP01)
			topLine.push(topLineP02)
		}

		topLine.push(topLineP1)

		//верхний угол тетивы в конце
		var botLineP1 = {
			x: b * stairAmt,
			y: h * (stairAmt + 1) - topPointOffsetY,
		}

		//корректируем точку если вверху столб
		if (par.topEnd == "столб") {
			//рассчет отступа края ступени от края столба
			var treadOffset = 10; //отступ края ступени от внешней плоскости тетивы верхнего марша
			if (params.stairModel == "П-образная трехмаршевая" && marshPar.topTurn == 'забег' && params.model == 'тетивы') {
				treadOffset -= 20;
			}
			if (params.stairModel == "П-образная с забегом" && params.model == 'тетивы') {
				treadOffset -= 20;
			}
			if (params.stairModel == "Г-образная с забегом") {
				treadOffset -= 20;
			}
			treadOffset += -params.stringerThickness / 2 + params.rackSize / 2;
			botLineP1 = newPoint_xy(botLineP1, -treadOffset + newellSlotDepth, 0);
		}

		var topLineP21 = itercection(topLineP10, topLineP11, botLineP1, newPoint_xy(botLineP1, 100, 0))

		topLine.push(topLineP21);
		topLine.push(botLineP1);

		//сохраняем точку для столбов верхнего узла
		par.botLineP1 = botLineP1;

		//сохраняем точку для столбов ограждений
		// par.keyPoints.rack2Pos = newPoint_xy(botLineP1, params.rackSize/2, 0);
		par.keyPoints.marshRailingP2 = newPoint_xy(botLineP1, 0, 0);
		par.keyPoints.marshLastRailingPoint = newPoint_xy(botLineP1, 0, 0);
		// if(par.lastMarsh) par.keyPoints.marshRailingP2 = newPoint_xy(botLineP1, 0, 0);

		//добавляем первую точку в начало массива
		// if((!par.hasRailing || !risers || !par.slots) && !(risers == true && par.slots)) topLine.unshift(topLineP0);
		// if(!(risers == true && par.slots))
		if (!par.slots || params.stairModel == 'Прямая' || !risers) topLine.unshift(topLineP0);
		// if (params.stairModel == 'Прямая') {
		// 	topLine.unshift(topLineP0);
		// }

		//В случае наличия подступенков точка не нужна, появляются проблемы из за неё

		//внешний контур нижняя линия
		var botLine = [];

		//Точка пересечения нижней линии с задней линией
		var botLineP2 = itercection(botLineP1, newPoint_xy(botLineP1, 0, -100), bottomLine.p1, bottomLine.p2);

		//массив точек нижней линии
		var botLine = [botLineP2, botLineP10];

		//вырез внизу тетивы для вставки в столб
		if (par.topEnd == "столб") {
			var notchHeight = 30; //высота выреза снизу тетивы
			var botLineP4 = newPoint_x1(botLineP2, -newellSlotDepth, par.stairAngle)
			var botLineP3 = newPoint_xy(botLineP4, 0, notchHeight);
			botLineP2 = newPoint_xy(botLineP3, newellSlotDepth, 0);
			botLine = [botLineP2, botLineP3, botLineP4, botLineP10];
		}

		//вырез под колонну
		if (par.column && stairAmt > 0) {
			var notchPar = {
				points: botLine,
				notchCenterX: (Math.floor(stairAmt / 2) + 1) * a + params.rackSize / 2 - 40 + (params.riserType == 'есть' ? params.riserThickness : 0), //40 подогнано
				isBotLine: true,
			}
			botLine = addNotch(notchPar).points;
			var columnPos = copyPoint(notchPar.notchCenterPoint);
			columnPos.treadYOffset = ((Math.floor(stairAmt / 2) + 1) * h + h) - columnPos.y;//+ params.treadThickness;
			if (par.slots) par.columnsPoints.push(columnPos);
			par.excerptDepth = 100;
		}

		if (params.firstNewellPos !== 'на полу' && par.hasRailing && par.marshId == 1) {
			var notchPar = {
				points: topLine,
				notchCenterX: par.keyPoints.marshFirst.x,//par.keyPoints.rack2Pos.x,
				isBotLine: false,
				botY: par.keyPoints.marshFirst.y, //координата y дна выреза
			}

			notchPar = addNotch(notchPar);
			topLine = notchPar.points;
		}

		//сохраняем точку для столбов верхнего узла
		par.botLineP2 = botLineP2;

		//внешний контур вырез под последнюю ступень

		if (risers == false && par.slots) {
			var p1 = newPoint_xy(botLineP1, 0, topPointOffsetY - h);
			var p2 = {
				x: b * (stairAmt - 1) - 0.01,
				y: h * stairAmt,
			}
			var p3 = newPoint_xy(p2, 0, -params.treadThickness);

			p2.filletRad = frontEdgeRad;
			topLine.push(p1);
			topLine.push(p2);
			topLine.push(p3);

			var p4 = newPoint_xy(p1, 0, -params.treadThickness)
			topLine.push(p4);
		}

		//пазы для лестницы с подступенками

		if (risers == true && par.slots) {
			var slotsTopPoints = [];
			var slotsBotPoints = [];

			//верхняя линия пазов
			var p1 = newPoint_xy(botLineP1, 0, topPointOffsetY - h);
			slotsTopPoints.push(p1);

			var lastIndex = 0;
			//если вверху есть столб, то первый паз открытый и первый подъем отрисовывается отдельно
			if (par.hasRailing || par.botEnd == "столб") lastIndex = 1;

			for (var i = stairAmt; i > lastIndex; i--) {
				//переднее ребро ступени без учета скругления
				var p2 = {
					x: b * (i - 1) - 0.01,
					y: h * i + 0.01,
				}
				var p3 = newPoint_xy(p2, 0, -params.treadThickness - 0.02);

				p2.filletRad = frontEdgeRad;
				slotsTopPoints.push(p2);
				slotsTopPoints.push(p3);

				p1 = newPoint_xy(p3, nose, 0);
				slotsTopPoints.push(p1);

				p1 = newPoint_xy(p1, 0, -h + params.treadThickness + 0.02);
				slotsTopPoints.push(p1);
			}

			//если есть столб, то первый паз открытый
			if (par.hasRailing || par.botEnd == "столб") {
				var p2 = { x: topLineP0.x, y: h }
				slotsTopPoints.push(p2);
			}

			//нижняя линия пазов (формируем массив с конца)
			var p1 = newPoint_xy(botLineP1, 0, topPointOffsetY - h - params.treadThickness);
			slotsBotPoints.unshift(p1);

			for (var i = stairAmt; i > 0; i--) {
				//внутренний угол ступени и подступенка
				var p2 = {
					x: b * (i - 1) + nose + params.riserThickness,
					y: h * i - params.treadThickness - 0.03,
				}

				//корректируем точку если cнизу столб
				if (p2.x < topLineP0.x) p2.x = topLineP0.x;

				slotsBotPoints.unshift(p2);

				var p3 = newPoint_xy(p2, 0, -h - 0.03);
				//корректируем первую точку
				if (i == 1) p3.y = topLineP0.y;

				slotsBotPoints.unshift(p3);
			}
		}

		//Модифицируем каркас с учетом ограждений
		{
			if (par.hasRailing) {
				var lenX = (par.keyPoints.marshLastRailingPoint.x - topLineP21.x) / Math.cos(stairAngle);
				var tempPoint = polar(topLineP21, stairAngle, lenX);
				var deltaY = tempPoint.y - topLineP21.y;
				topLineP21.x = tempPoint.x;// / Math.cos(par.stairAngle);
				topLineP21.y = tempPoint.y;//lenX * Math.tan(par.stairAngle);
			}
			if (!marshPar.lastMarsh) {
				par.keyPoints.marshLastRailingPoint.x -= params.stringerSlotsDepth;
			}
		}

		//создание шейпов
		//внешняя часть тетивы и внутренняя часть без подступенков (единый шейп)
		if (risers == false || !par.slots) {
			var shapePar = {
				points: topLine.concat(botLine),
				dxfArr: dxfArr,
				dxfBasePoint: par.dxfBasePoint,
			}
			var stringerShape = drawShapeByPoints2(shapePar).shape;
		}

		//внутренняя часть тетивы с подступенками (два шейпа)
		if (risers == true && par.slots) {
			//верхняя часть

			var shapePar = {
				points: topLine.concat(slotsTopPoints),
				dxfArr: dxfArr,
				dxfBasePoint: par.dxfBasePoint
				//markPoints: true, //пометить точки в dxf для отладки
			}

			var stringerShape = drawShapeByPoints2(shapePar).shape;
			//нижняя часть
			var shapePar = {
				points: slotsBotPoints.concat(botLine),
				dxfArr: dxfArr,
				dxfBasePoint: par.dxfBasePoint
			}
			var stringerShape2 = drawShapeByPoints2(shapePar).shape;
		}
		//пазы для ступеней без подступенков (отверстия в шейпе)

		if (par.slots && risers == false) {
			//формирование пазов дяя ступеней с 1 или 2 по предпоследнюю
			var p1 = {};
			var p2 = {};

			p2 = newPoint_xy(topLineP0, 0, -stringerOffset_y);
			// var startIndex = par.hasRailing == true ? 1 : 0;
			var startIndex = 0;
			var endIndex = p2.x <= b * (stairAmt - 1) + a ? stairAmt - 1 : stairAmt;
			for (var i = startIndex; i < endIndex; i++) {
				var holeBasePoint = {
					x: b * i - techDelta,
					y: h * (i + 1) - params.treadThickness - techDelta
				};

				var holePar = {
					basePoint: holeBasePoint,
					height: params.treadThickness + techDelta * 2,
					len: a + techDelta * 2,
					dxfArr: dxfArr,
					dxfBasePoint: dxfBasePoint,
					rad: frontEdgeRad,
				}

				var slotHole = drawHolePath(holePar).path;
				if (i == 0 || (i == 1 && params.firstNewellPos == 'на первой ступени' && par.marshId == 1)) {
					stringerHoles.push(slotHole);
				} else {
					stringerShape.holes.push(slotHole);
				}
			}
		}

		//сохраняем точки для столбов ограждений
		// par.keyPoints.rack1Pos = newPoint_xy(topLineP0, - params.rackSize/2, 0);
		// if(par.botEnd == "столб") par.keyPoints.rack1Pos.x += newellSlotDepth;

		// par.keyPoints.rack2Pos = newPoint_xy(botLineP1, params.rackSize/2, 0);
		// if(par.topEnd == "столб") par.keyPoints.rack2Pos.x -= newellSlotDepth;
		par.keyPoints.botPoint = topLineP0;
		par.keyPoints.topPoint = botLineP2;
	} //конец тетивы

	var geom1 = new THREE.ExtrudeGeometry(stringerShape, extrudeOptions);
	//преобразуем геометрию столба в BSP объект
	var geomBSP = new ThreeBSP(geom1);
	for (var i = 0; i < stringerHoles.length; i++) {
		var hole = stringerHoles[i].getPoints();
		var holeShape = new THREE.Shape(hole);
		//преобразуем шейп отверстия в геометрию
		var holeGeom = new THREE.ExtrudeGeometry(holeShape, extrudeOptions);
		//преобразуем геометрию отверстия в BSP объект
		var holeBSP = new ThreeBSP(holeGeom);

		//Выдавливаем отверстие в столбе
		var geomBSP = geomBSP.subtract(holeBSP);
	}
	//Преобразуем обратно в геометрию
	geom1 = geomBSP.toGeometry();
	geom1.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom1, params.materials.timber2);
	mesh.userData = { angle: stairAngle };
	par.meshes.push(mesh);

	if (stringerShape2) {
		var geom2 = new THREE.ExtrudeGeometry(stringerShape2, extrudeOptions);
		geom2.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geom2, params.materials.timber);
		mesh.userData = { angle: stairAngle };
		par.meshes.push(mesh);
	}
	//сохраняем параметры для отрисовки столба

	if (par.botEnd == "столб") {
		if (par.type == "тетива") par.endHeightBot = distance(topLineP0, topLineP01);
		if (par.type == "косоур") par.endHeightBot = distance(topLineP0, topLineP1);
	}
	// if(par.topEnd == "столб") {
	// }
	par.endHeightTop = distance(topLineP21, botLineP2);
	if (par.type == 'косоур') par.endHeightTop = distance(botLineP1, botLineP2);
	if (par.type == "косоур" && stairAmt == 1) par.endHeightTop = distance(topLineP0, topLineP1);
	if (deltaY) par.endHeightYOffset = deltaY;
} //end of drawStrightStringer

function drawForgedBanister_5(par) {
	par.mesh = new THREE.Object3D();

	var material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
	var minRadius = 30 / 2;
	var maxRadius = 39 / 2;
	var height = 38;
	var segments = 32;

	//балясина со вставкой мэша
	if (par.type == "bal_1" || par.type == "bal_2" || par.type == "bal_3" ||
		par.type == "bal_4" || par.type == "bal_10" || par.type == "bal_11") {

		var balPar = {
			insetAmt: 1,
			type: "forge",
			insetName: "bulb",
			banisterType: par.type,
			len: par.len,
			drawing: par.drawing
		}
		if (par.type == "bal_1" || par.type == "bal_2") balPar.insetName = "basket";
		if (par.type == "bal_10" || par.type == "bal_11") balPar.insetName = "screw_sm";
		if (par.type == "bal_2" || par.type == "bal_4" || par.type == "bal_11") balPar.insetAmt = 2;

		var bal = drawMeshBal(balPar);
		par.mesh.add(bal);

		//основание
		var geometry = new THREE.CylinderBufferGeometry(minRadius, maxRadius, height, segments );
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.y = height / 2;
		if (!testingMode) par.mesh.add(cylinder);
	}
	//балясина из svg
	else {
		var poleSize = 12;
		var botLen = par.len - 740;
		var svgPath = $("#forgeModal .modalItem[data-itemName=" + par.type + "]").find("path").eq(0).attr("d");
		if (par.type == "20х20") svgPath = $("#forgeModal .modalItem[data-itemName=20х20]").find("path").eq(0).attr("d");
		var shape = transformSVGPath(svgPath);

		// if (par.drawing && par.drawing.pos) {
		// 	par.drawing.pos.x -= poleSize / 2;
		// }

		var extrudeOptions = {
			amount: 12,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
		if (par.type == "20х20") extrudeOptions.amount = 20;

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geom, params.materials.metal_railing);
		mesh.position.y = 740 / 2 + botLen + 72.9; //72.9 - подогнано
		mesh.position.z = -poleSize / 2;
		par.mesh.add(mesh);

		//добавка снизу
		if (par.type == "20х20") poleSize = 20;
		var profPar = {
			type: "rect",
			poleProfileY: poleSize,
			poleProfileZ: poleSize,
			length: botLen,
			poleAngle: Math.PI / 2,
			material: params.materials.metal_railing,
			dxfBasePoint: { x: 0, y: 0 },
			dxfArr: [], //профиль не выводим в dxf
		};

		//палка
		var pole = drawPole3D_4(profPar).mesh;
		pole.position.x = profPar.poleProfileY / 2;
		pole.position.y = 0;
		pole.position.z = -profPar.poleProfileY / 2;
		par.mesh.add(pole);

		if (par.drawing && par.drawing.group == 'timber_railing') {
			var fakeShape = new THREE.Shape();
			fakeShape.drawing = Object.assign({}, par.drawing);
			fakeShape.drawing.pos = newPoint_xy(fakeShape.drawing.pos, poleSize / 2, par.len - 740);//740 / 2 + botLen + 72.9);
			fakeShape.drawing.botLen = botLen;
			fakeShape.drawing.svg = true;
			fakeShape.drawing.banisterType = par.type;
			shapesList.push(fakeShape);
		}

		//основание
		var geometry = new THREE.CylinderBufferGeometry(minRadius, maxRadius, height, segments);
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.y = height / 2;
		if (!testingMode) par.mesh.add(cylinder);		
	}


	var railingModel = params.railingModel;
	if (specObj.unit == "banister") railingModel = params.railingModel_bal;
	//сохраняем данные для спецификации
	var partName = "forgedBal";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt1: 0,
				amt2: 0,
				name: "Кованая балясина",
			}
			if (railingModel == "Дерево с ковкой") {
				specObj[partName].division = "metal";
				specObj[partName].group = "Ограждения";
				specObj[partName].metalPaint = true;
				specObj[partName].timberPaint = false;
				specObj[partName].group = "Ограждения";
			}
		}

		var name = par.type;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		if (par.type == params.banister1) specObj[partName]["amt1"] += 1;
		if (params.banister2 != params.banister1 && par.type == params.banister2) specObj[partName]["amt2"] += 1;
	}
	par.mesh.specId = partName + name;

	return par;
}	