// Вывод каркаса всей лестницы

function drawCarcas(par){

	par.mesh1 = new THREE.Object3D();
	par.mesh2 = new THREE.Object3D();
	par.columns = new THREE.Object3D();

	var dxfX0 = par.dxfBasePoint.x;

	par.stringerParams = [];

	// Каркас нижнего марша

	var marshId = 1;
	if(getMarshParams(marshId).stairAmt > 0){
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

	if (params.stairModel == "П-образная трехмаршевая") {
		marshId = 2;
		par.stringerParams[marshId] = drawMarshStringers(par, marshId);
		var mesh1 = par.stringerParams[marshId].mesh1;
		var mesh2 = par.stringerParams[marshId].mesh2;
		mesh1.position.x = mesh2.position.x = par.treadsObj.unitsPos.marsh2.x;
		mesh1.position.y = mesh2.position.y = par.treadsObj.unitsPos.marsh2.y;
		mesh1.position.z = mesh2.position.z = par.treadsObj.unitsPos.marsh2.z;
		mesh1.rotation.y = mesh2.rotation.y = par.treadsObj.unitsPos.marsh2.rot;

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
		if(getMarshParams(marshId).stairAmt > 0){
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
		var unitPar = {
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
	var unitHeight = marshPar.h + 250;

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

	stringerParams2 = {
		marshId: marshId,
		side: "in",
		dxfBasePoint: dxfBasePointIn,
		drawFunction: drawStrightStringer,
		pos: pos, //позиционирование происходит внутри drawComplexStringer
	};

	// if (stringerParams.stairAmt > 0 || params.stairModel == 'Прямая') {
	// }
	drawComplexStringer(stringerParams2);
	if(!(par.isP || par.isWndP)){
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
	};
	if (params.model == 'косоуры') {
		stringerParams1.topMarshXOffset = 0;
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

			polePar.newellName = 'Передний левый столб' + ' марш ' + par.marshId;
			var newell = drawPole3D_4(polePar).mesh;
			polePar.fixPoints = null;//Очищаем тк св-ва общие для нескольких столбов
			polePar.timberTopFix = null;//Очищаем тк св-ва общие для нескольких столбов
			newell.position.x = pos1.x;
			newell.position.y = pos1.y;
			newell.position.z = pos1.z;
			par.columns.add(newell);
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
		
			polePar.newellName = 'Передний правый столб' + ' марш ' + par.marshId;
			var newell = drawPole3D_4(polePar).mesh;
			polePar.fixPoints = null;//Очищаем тк св-ва общие для нескольких столбов
			polePar.timberTopFix = null;//Очищаем тк св-ва общие для нескольких столбов
			newell.position.x = pos2.x;
			newell.position.y = pos2.y;
			newell.position.z = pos2.z;
			par.columns.add(newell);
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
			if(botMarshPar.topTurn == "забег" && turnFactor == 1) {
				polePar.marshId = par.marshId;
				polePar.type = "side";
				polePar.turnId = par.turnId;
				var stringer = drawTurnStringer(polePar).mesh;
				stringer.position.x = pos.x;
				stringer.position.y = pos.y;
				stringer.position.z = pos.z;
				par.stringers.add(stringer);
			}
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
			if(botMarshPar.topTurn == "забег" && turnFactor == -1) {
				polePar.type = "side";
				polePar.turnId = par.turnId;
				var stringer = drawTurnStringer(polePar).mesh;
				stringer.position.x = pos.x;
				stringer.position.y = pos.y;
				stringer.position.z = pos.z;
				par.stringers.add(stringer);
			}
			
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
			
			if(botMarshPar.topTurn == "забег") {
				polePar.type = "rear";
				polePar.turnId = par.turnId;
				if(par.turnId == 1 && params.stairModel == "П-образная с забегом"){
					polePar.length += params.rackSize + params.marshDist;
				}
				var stringer = drawTurnStringer(polePar).mesh;
				pos.y += nextMarshPar.h;
			}
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
			}
			
			stringer.rotation.y = -Math.PI / 2
			stringer.position.x = pos.x;
			stringer.position.y = pos.y;
			stringer.position.z = pos.z;
			if(par.turnId == 1 && params.stairModel == "П-образная с забегом" && turnFactor == -1){
				stringer.position.z -= params.rackSize + params.marshDist;
			}
			par.stringers.add(stringer);
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

	var geometry = new THREE.CylinderGeometry( minRadius, minRadius, height, segments );
	var cylinder = new THREE.Mesh( geometry, material );
	object.add( cylinder );

	var geometry = new THREE.CylinderGeometry( maxRadius, maxRadius, height, segments );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.x = -32;
	object.add( cylinder );
	
	var geometry = new THREE.CylinderGeometry( minRadius, minRadius, height, segments );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.x = -96;
	object.add( cylinder );
	
	var geometry = new THREE.CylinderGeometry( maxRadius, maxRadius, height, segments );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.x = -128;
	object.add( cylinder );

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
	
	//делаем нижнюю линию наклонной
	p0.y -= 100;
	p5.y = p4.y - 228;
	
	//Кладем на пол нижнюю грань
	if (botMarshPar.stairAmt == 0 && par.marshId == 1 && par.type == 'side') {
		p0.y = 0;
		p5.y = 0;
	}
	if (botMarshPar.stairAmt == 1 && par.marshId == 1 && par.type == 'side' && p0.y < 0) p0.y = 1;//Устанавливаем точку на уровень пола, если она ниже
	var points = [p0, p1, p2, p3, p4, p5];


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


		var name = Math.round(par.len);
		var area = 300 * par.len / 1000000;

		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}
	
	return par;

}//end of drawTurnStringer