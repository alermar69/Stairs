// Вывод каркаса всей лестницы

function drawCarcas(par){

	par.mesh = new THREE.Object3D();	
	par.angles = new THREE.Object3D();
	var dxfX0 = par.dxfBasePoint.x;

	par.stringerParams = [];

	// Каркас нижнего марша

	par.stringerParams[1] = drawMarshStringers(par, 1);	
	par.mesh.add(par.stringerParams[1].mesh);
	par.angles.add(par.stringerParams[1].angles);
	
	// Каркас второго марша

	if (params.stairModel == "П-образная трехмаршевая"){
		
		//костыль для лестницы площадка-забега
		if (params.turnType_1 == "площадка" && params.turnType_2 == "забег") {
			par.wndFramesHoles = par.wndFramesHoles1;
			}
			
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;
		
		par.stringerParams[2] = drawMarshStringers(par, 2);		
		var stringers2 = par.stringerParams[2].mesh;		
		stringers2.position.x = par.treadsObj.unitsPos.marsh2.x;
		stringers2.position.y = par.treadsObj.unitsPos.marsh2.y;
		stringers2.position.z = par.treadsObj.unitsPos.marsh2.z;	
		stringers2.rotation.y = par.treadsObj.unitsPos.marsh2.rot;	
		par.mesh.add(stringers2)
		
		var angles2 = par.stringerParams[2].angles
		angles2.position.x = par.treadsObj.unitsPos.marsh2.x;
		angles2.position.y = par.treadsObj.unitsPos.marsh2.y;
		angles2.position.z = par.treadsObj.unitsPos.marsh2.z;	
		angles2.rotation.y = par.treadsObj.unitsPos.marsh2.rot;	
		par.angles.add(angles2);
	}
	
	if (params.stairModel == "П-образная с забегом"){
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;
		
		par.stringerParams[2] = drawMarshStringers(par, 2);

		var stringers2 = par.stringerParams[2].mesh;
 		
		stringers2.position.x += par.treadsObj.unitsPos.turn2.x;
		stringers2.position.y += par.treadsObj.unitsPos.turn2.y;
		stringers2.position.z += par.treadsObj.unitsPos.turn2.z;
		stringers2.rotation.y = par.treadsObj.unitsPos.turn2.rot;
		//костыль
		if(params.model == "лт") stringers2.position.z -= (params.marshDist - 35) * turnFactor;
		if(params.model == "ко") stringers2.position.z -= (params.M + params.marshDist - 35 - params.stringerThickness) * turnFactor;
		par.mesh.add(stringers2)
		
		var angles2 = par.stringerParams[2].angles
		angles2.position.x = stringers2.position.x;
		angles2.position.y = stringers2.position.y;
		angles2.position.z = stringers2.position.z;	
		angles2.rotation.y = stringers2.rotation.y;	
		par.angles.add(angles2);
	}
	
	if (params.stairModel == "П-образная с площадкой"){
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;
		
		par.stringerParams[2] = drawPlatformStringers(par);			

		var stringers2 = par.stringerParams[2].mesh;		
		stringers2.position.x = par.treadsObj.unitsPos.turn1.x;
		stringers2.position.y = par.treadsObj.unitsPos.turn1.y;
		stringers2.position.z = par.treadsObj.unitsPos.turn1.z;	
		stringers2.rotation.y = - Math.PI / 2 * turnFactor; //костыль, надо поправить в drawTreads
		par.mesh.add(stringers2)
		
		var angles2 = par.stringerParams[2].angles
		angles2.position.x = stringers2.position.x;
		angles2.position.y = stringers2.position.y;
		angles2.position.z = stringers2.position.z;	
		angles2.rotation.y = stringers2.rotation.y;	
		par.angles.add(angles2);
	}	
	
	// Каркас верхнего марша
	if (params.stairModel != "Прямая"){
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;
		if (params.stairModel == "П-образная с забегом") {
			par.wndFramesHoles = par.wndFramesHoles1;
		}

		par.stringerParams[3] = drawMarshStringers(par, 3);
		
		var stringers3 = par.stringerParams[3].mesh;
		stringers3.position.x = par.treadsObj.unitsPos.marsh3.x																																																																																										;
		stringers3.position.y = par.treadsObj.unitsPos.marsh3.y;
		stringers3.position.z = par.treadsObj.unitsPos.marsh3.z;
		stringers3.rotation.y = par.treadsObj.unitsPos.marsh3.rot;		
		par.mesh.add(stringers3)
		
		var angles3 = par.stringerParams[3].angles
		angles3.position.x = par.treadsObj.unitsPos.marsh3.x;
		angles3.position.y = par.treadsObj.unitsPos.marsh3.y;
		angles3.position.z = par.treadsObj.unitsPos.marsh3.z;	
		angles3.rotation.y = par.treadsObj.unitsPos.marsh3.rot;
		par.angles.add(angles3);
	}	

    //Каркас верхней площадки
	if (params.platformTop !== 'нет') {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		par.stringerParams["topPlt"] = drawTopPlatformStringers(par);

		var stringersTop = par.stringerParams["topPlt"].mesh;
		stringersTop.position.x = par.treadsObj.lastMarshEnd.x;
		stringersTop.position.y = par.treadsObj.lastMarshEnd.y;
		stringersTop.position.z = par.treadsObj.lastMarshEnd.z;
		par.mesh.add(stringersTop);

		var anglesTop = par.stringerParams["topPlt"].angles;
		anglesTop.position.x = stringersTop.position.x;
		anglesTop.position.y = stringersTop.position.y;
		anglesTop.position.z = stringersTop.position.z;
		anglesTop.rotation.y = stringersTop.rotation.y;
		par.angles.add(anglesTop);
	}

	if (params.stairModel == "Прямая горка") {
		var carcasPar = {
			marshId: 0,
			dxfBasePoint: par.dxfBasePoint,
			treadsObj: par.treadsObj,
			marshPar: par.stringerParams[1]
		};
		if (params.M > 1100) carcasPar.isMiddleStringer = true;

		drawSlidePart(carcasPar);
		var mesh = carcasPar.mesh;
		var angles = carcasPar.angles;
		mesh.position.x = par.treadsObj.unitsPos.turn1.x + carcasPar.marshPar.a + params.M / 2 - 5;
		mesh.position.y = par.treadsObj.unitsPos.turn1.y;
		mesh.position.z = par.treadsObj.unitsPos.turn1.z;

		angles.position.x = mesh.position.x;
		angles.position.y = mesh.position.y;
		angles.position.z = mesh.position.z;
		par.mesh.add(mesh);
		par.angles.add(angles);
	}

	//добор верхней площадки
	if (params.pltExtenderSide && params.pltExtenderSide != "нет") {
		var marshId = 3;
		if (params.stairModel == "Прямая") marshId = 1;
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
		if (params.stairModel !== "Г-образная с площадкой") {
			if (params.pltExtenderSide == "слева" && marshParams.hasRailing.in) isOffsetLen = true;
			if (params.pltExtenderSide == "справа" && marshParams.hasRailing.out) isOffsetLen = true;
		}
		else {
			if (params.pltExtenderSide == "справа" && marshParams.hasRailing.in) isOffsetLen = true;
			if (params.pltExtenderSide == "слева" && marshParams.hasRailing.out) isOffsetLen = true;
		}
		if (isOffsetLen) extenderParams.length -= marshParams.b / 2 + 40 / 2 + 5; //40 - ширина стойки

		extenderParams = drawExtender(extenderParams);
		var extender = extenderParams.mesh;
		extender.position.x = par.treadsObj.lastMarshEnd.x - extenderParams.length;
		extender.position.y = par.treadsObj.lastMarshEnd.y;

		extender.position.z = 0;
		if (params.pltExtenderSide == "справа") extender.position.z = params.M / 2 + params.pltExtenderWidth;
		if (params.pltExtenderSide == "слева") extender.position.z = -params.M / 2;

		if (params.stairModel == "Г-образная с площадкой") {
			extender.rotation.y = Math.PI / 2;
			extender.position.z = par.treadsObj.lastMarshEnd.x - extenderParams.length;
			
			extender.position.z = par.treadsObj.lastMarshEnd.z + extenderParams.length * (1 - turnFactor) * 0.5;
			extender.position.x = par.treadsObj.lastMarshEnd.x;
			if (params.pltExtenderSide == "слева") extender.position.x += params.M / 2 + params.pltExtenderWidth;
			if (params.pltExtenderSide == "справа") extender.position.x += -params.M / 2;
		}

		par.mesh.add(extender);

	};

	//верхние фланцы
	if(params.topFlan == "есть"){
		var flansPar = {
			dxfBasePoint: par.dxfBasePoint,
			}	
		var flansGroup = drawTopFixFlans(flansPar).mesh;
		flansGroup.rotation.y = par.treadsObj.lastMarshEnd.rot + Math.PI / 2;
		flansGroup.position.x = par.treadsObj.lastMarshEnd.x;		
		flansGroup.position.y = par.treadsObj.lastMarshEnd.y;
		flansGroup.position.z = par.treadsObj.lastMarshEnd.z;
		par.angles.add(flansGroup);	
		
		}

	
	return par;

} //end of drawCarcas


function drawMiddleStringers(par, marshId){
	var mesh = new THREE.Object3D();
	var angles = new THREE.Object3D();

	var marshParams = getMarshParams(marshId);
	
	var stringerParams = {
		marshId: marshId,
		dxfBasePoint: par.dxfBasePoint,
		turnStepsParams: par.treadsObj.wndPar,
		treadsObj: par.treadsObj,
		wndFramesHoles: par.wndFramesHoles,
		isMiddleStringer: true,
	};
	calcStringerParams(stringerParams);
	
	var sideIn = "right";
	var sideOut = "left";
	if(turnFactor == -1) {
		sideIn = "left";
		sideOut = "right";
	}
	
	var midStringers = [];
	var stringerThickness = params.stringerThickness;
	var treadWidth = params.M - 2 * stringerThickness;
	var midStringerAmt = Math.floor(treadWidth / 1100);
	var midstringerBetweenLen = (treadWidth - stringerThickness * midStringerAmt) / (midStringerAmt + 1);
	if (midStringerAmt > 0) {
		for (i = 1; i <= midStringerAmt; i++) {
			if (i == 1) stringerParams.midStringerFirst = true;
			if (i !== 1) stringerParams.midStringerFirst = false;
			var midStringer = drawStringer(stringerParams).mesh;
			midStringer.position.x = -stringerParams.treadFrontOverHang;
			midStringer.position.z = midstringerBetweenLen * i - params.M / 2 + params.stringerThickness * i;
			midStringers.push(midStringer);
			mesh.add(midStringer);

			//уголки
			var midAngle = drawCarcasAngles(stringerParams.carcasHoles, sideIn);
			midAngle.position.x = midStringer.position.x;
			midAngle.position.z = midStringer.position.z;
			if (sideIn == "left") midAngle.position.z += params.stringerThickness;
			angles.add(midAngle);

			//рамки
			if (hasTreadFrames()) {
				par.dxfBasePoint.x += stringerParams.lenX;
				par.dxfBasePoint.x += 2000;
				var framePar = {
					holes: stringerParams.carcasHoles,
					dxfBasePoint: par.dxfBasePoint,
				}
				var frames = drawFrames(framePar);
				frames.position.x = -stringerParams.treadFrontOverHang;
				frames.position.z = midStringer.position.z - framePar.length / 2;
				angles.add(frames)
			}

			//длинные болты
			if (drawLongBolts) {
				var boltPar = {
					diam: 10,
					len: 40,
					headType: "шестигр.",
				}
				var longBoltPos = stringerParams.elmIns[stringerParams.key].longBolts;
				for (var j = 0; j < longBoltPos.length; j++) {
					var bolt = drawBolt(boltPar).mesh;
					bolt.rotation.x = Math.PI / 2 * turnFactor;
					bolt.position.x = longBoltPos[j].x;
					if (params.model == "лт") bolt.position.x -= 5;
					bolt.position.y = longBoltPos[j].y;
					bolt.position.z = midAngle.position.z//params.stringerThickness/2;
					mesh.add(bolt);
				}
			}
		}
	}

	// Соединительные фланцы на внешней тетиве

	var franPar = {
		carcasHoles: stringerParams.carcasHoles,
		dxfBasePoint: par.dxfBasePoint,
		skew1: stringerParams.skew1,
		skew2: stringerParams.skew2,
		marshAng: stringerParams.marshAng,
		side: sideOut,
		noBolts: true,
	}
	

	// Отрисовка фланцев 
	var flans = drawStringerFlans_all(franPar);
	if (params.model == "лт") flans.position.x -= 5;
	flans.position.z = params.stringerThickness / 2;
	mesh.add(flans);

	// Отрисовка фланцев 
	var flans = drawStringerFlans_all(franPar);
	if (params.model == "лт") flans.position.x -= 5;
	flans.position.z = -params.stringerThickness / 2 - 8;
	mesh.add(flans);

	
	stringerParams.mesh = mesh;
	stringerParams.angles = angles;
	return stringerParams;
}

// Вывод каркаса одного марша

function drawMarshStringers(par, marshId){

	var mesh = new THREE.Object3D();
	var angles = new THREE.Object3D();

	var marshParams = getMarshParams(marshId);
	
	stringerParams = {
		marshId: marshId,
		dxfBasePoint: par.dxfBasePoint,
		turnStepsParams: par.treadsObj.wndPar,
		treadsObj: par.treadsObj,
		wndFramesHoles: par.wndFramesHoles,
		};
	var useTopWnPar = false;
	if(par.treadsObj.wndPar2){
		if(marshId == 3 && params.stairModel == "П-образная с забегом") useTopWnPar = true;
		if(marshId == 3 && params.stairModel == "П-образная трехмаршевая") useTopWnPar = true;
		if(!par.treadsObj.wndPar) useTopWnPar = true;
		} 
	if(useTopWnPar) stringerParams.turnStepsParams = par.treadsObj.wndPar2;
	calcStringerParams(stringerParams);
	
	//позиция косоуров по Z
	var posZIn = (params.M / 2 - stringerParams.stringerSideOffset) * turnFactor;
	if (turnFactor == 1) posZIn -= params.stringerThickness;
	
	var posZOut = - (params.M / 2 - stringerParams.stringerSideOffset) * turnFactor;
	if (turnFactor == -1) posZOut -= params.stringerThickness - 0.01
	
	var sideIn = "right";
	var sideOut = "left";
	if(turnFactor == -1) {
		sideIn = "left";
		sideOut = "right";
		}
	
	//для прямой лестницы все наоборот
	if (params.stairModel == "Прямая"){
		var temp = posZIn;
		posZIn = posZOut;
		posZOut = temp;
		
		temp = sideIn;
		sideIn = sideOut;
		sideOut = temp;		
		}
	
	

//внутренний косоур/тетива

	
	stringerParams.key = "in";
	if (marshId == 3 && params.stairModel == "Прямая горка") stringerParams.key = "out";
	var stringer1 = drawStringer(stringerParams).mesh;
	stringer1.position.x = -stringerParams.treadFrontOverHang;
	stringer1.position.z = posZIn;
	// if (turnFactor == 1) stringer1.position.z -= params.stringerThickness;

	var midStringers = [];
	
	//костыль
	if (params.stairModel == "П-образная с забегом" && stringerParams.isWndP){
		if(params.model == "лт") stringer1.position.x += 1;
		if(params.model == "ко") stringer1.position.x += 17;
	} 
	
	mesh.add(stringer1);
	
	//уголки на внутренней тетиве
	var anglesIn = drawCarcasAngles(stringerParams.carcasHoles, sideIn);
	anglesIn.position.x = stringer1.position.x;
	anglesIn.position.z = stringer1.position.z;
	if(sideIn == "left") anglesIn.position.z += params.stringerThickness;
	angles.add(anglesIn);
	
		
	// Соединительные фланцы на внутренней тетиве	
	var franPar = {
		carcasHoles: stringerParams.carcasHoles,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
		skew1: stringerParams.skew1,
		skew2: stringerParams.skew2,
		marshAng: stringerParams.marshAng,	
		side: sideIn,
	}
	
	// Отрисовка фланцев 
	var flans = drawStringerFlans_all(franPar);
	if(params.model == "лт") flans.position.x -= 5;
	flans.position.z = (params.M / 2 - stringerParams.stringerSideOffset - params.stringerThickness * 2)
	mesh.add(flans);


	//колонны на внутренней тетиве
	stringerParams.anglesPosZ = anglesIn.position.z;
	stringerParams.dxfBasePoint.x += 2200;
	var columnsIn = drawColumnSide(stringerParams, "in");
	mesh.add(columnsIn);	
		
	//длинные болты

		if(drawLongBolts){
			var boltPar = {
				diam: 10,
				len: 40,
				headType: "шестигр.",
				nutOffset: -40 + 20 + 12,
				headShim: true,
			}			
			var longBoltPos = stringerParams.elmIns[stringerParams.key].longBolts;
			for(var i=0; i<longBoltPos.length; i++){
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = -Math.PI / 2 * turnFactor;
				bolt.position.x = longBoltPos[i].x;
				if(params.model == "лт") bolt.position.x -= 5;
				bolt.position.y = longBoltPos[i].y;
				bolt.position.z = anglesIn.position.z//params.stringerThickness/2;
				mesh.add(bolt);
				}
				
			}


//внешний косоур/тетива
	
	
	par.dxfBasePoint.x += stringerParams.lenX;
	stringerParams.dxfBasePoint = par.dxfBasePoint;
	stringerParams.key = "out";
	if (marshId == 3 && params.stairModel == "Прямая горка") stringerParams.key = "in";
	var stringer2 = drawStringer(stringerParams).mesh;
	stringer2.position.x = -stringerParams.treadFrontOverHang;
	stringer2.position.z = posZOut;
	mesh.add(stringer2);
	
	//уголки на внешней тетиве
	var anglesOut = drawCarcasAngles(stringerParams.carcasHoles, sideOut);
	anglesOut.position.x = -stringerParams.treadFrontOverHang
	anglesOut.position.z = stringer2.position.z;
	if(sideOut == "left") anglesOut.position.z += params.stringerThickness;
	angles.add(anglesOut);
	

	// Соединительные фланцы на внешней тетиве
	
	var franPar = {
		carcasHoles: stringerParams.carcasHoles,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
		skew1: stringerParams.skew1,
		skew2: stringerParams.skew2,
		marshAng: stringerParams.marshAng,
		side: sideOut,
	}
	
	// Отрисовка фланцев 
	var flans = drawStringerFlans_all(franPar);
	if(params.model == "лт") flans.position.x -= 5;
	flans.position.z = -(params.M / 2 - stringerParams.stringerSideOffset - params.stringerThickness)
	mesh.add(flans);				


	par.dxfBasePoint.x += stringerParams.lenX;

	//перемычки
	if(params.model == "лт" && params.stairFrame == "нет"){
		par.dxfBasePoint.x += 2000;
		var bridgePar = {
			dxfBasePoint: par.dxfBasePoint,
			hasDoubleTreadAngles: false,
		}
		var key = 'out'
		if (params.stairModel == "Прямая") key = 'in';
		for (i = 0; i < stringerParams.elmIns[key].bridges.length; i++) {
			//перемычки с двойными уголками

			bridgePar.hasDoubleTreadAngles = false;
			bridgePar.rotated = false;
			if (i == stringerParams.elmIns[key].bridges.length - 1 && marshParams.topTurn == "площадка" && !stringerParams.isWndP && stringerParams.topEndLength > 600) {
				bridgePar.hasDoubleTreadAngles = true;
				bridgePar.rotated = true;
				}
				
			if (i == 0 && params.stairModel == "П-образная с площадкой" && marshId == 3) {
				bridgePar.hasDoubleTreadAngles = true;
				}
			
			//нет болтов на внутренней стороне
			bridgePar.noBoltsOnBridge = false;
			if (stringerParams.elmIns[key].bridges[i].noBoltsOnBridge) bridgePar.noBoltsOnBridge = true;
			if (params.M > 1100 && params.calcType == "vhod") bridgePar.noBoltsOnBridge1 = true;

			var bridge = drawBridge_2(bridgePar).mesh;
			bridge.rotation.y = -Math.PI / 2;
			bridge.position.x = stringerParams.elmIns[key].bridges[i].x + 60 + params.stringerThickness * 2 - stringerParams.treadFrontOverHang;
			bridge.position.y = stringerParams.elmIns[key].bridges[i].y;
			bridge.position.z = -params.M/2 + params.stringerThickness;
			//переворачиваем перемычку
			if(bridgePar.rotated){
				bridge.rotation.y = Math.PI / 2;
				bridge.position.x -= params.stringerThickness;
				bridge.position.z = params.M/2 - params.stringerThickness;
				}
			angles.add(bridge);
			bridgePar.dxfBasePoint.x += params.M + 200;

			//для входных если есть средняя тетива делаем дополнительную перемычку
			if (params.M > 1100 && params.calcType == "vhod") {
				//нет болтов на внутренней стороне
				bridgePar.noBoltsOnBridge1 = false;
				bridgePar.noBoltsOnBridge2 = true;

				var bridge = drawBridge_2(bridgePar).mesh;
				bridge.rotation.y = -Math.PI / 2;
				bridge.position.x = stringerParams.elmIns[key].bridges[i].x + 60 + params.stringerThickness * 2 - stringerParams.treadFrontOverHang;
				bridge.position.y = stringerParams.elmIns[key].bridges[i].y;
				bridge.position.z = params.stringerThickness / 2;
				//переворачиваем перемычку
				if (bridgePar.rotated) {
					bridge.rotation.y = Math.PI / 2;
					bridge.position.x -= params.stringerThickness;
					bridge.position.z = - params.stringerThickness;
				}
				angles.add(bridge);
				bridgePar.dxfBasePoint.x += params.M + 200;
			}
		}
	}
	
	//прямые рамки и ребра лотковых ступеней

	if(hasTreadFrames() && !stringerParams.isWndP){
		par.dxfBasePoint.x += 2000;
		var framePar = {
			holes: stringerParams.carcasHoles,
			dxfBasePoint: par.dxfBasePoint,
			marshId: stringerParams.marshId
			}

		var frames = drawFrames(framePar);

		frames.position.x = -stringerParams.treadFrontOverHang;
		if (params.calcType == 'vhod') {//Свдигаем к крайнему каркасу для того чтобы не пересечься с средним
			frames.position.z = params.M / 2 - params.stringerThickness - framePar.length / 2;
		}
		angles.add(frames)
	}
		
	//колонны на внешней тетиве
	stringerParams.anglesPosZ = anglesOut.position.z;
	var columnsOut = drawColumnSide(stringerParams, "out");
	mesh.add(columnsOut);
	
	//рамка верхней ступени

	for(var i=0; i<stringerParams.carcasHoles.length; i++){
		if(stringerParams.carcasHoles[i].pos == "topFrame"){
		
			var framePar = {
				holeDist: distance(stringerParams.carcasHoles[i], stringerParams.carcasHoles[i+1]),
				dxfBasePoint: par.dxfBasePoint,
				}
			var topFrame = drawTopFixFrame2(framePar).mesh;
			topFrame.position.x = stringerParams.carcasHoles[i].x - stringerParams.treadFrontOverHang;
			topFrame.position.y = stringerParams.carcasHoles[i].y;
			angles.add(topFrame)
			i++ //пропускаем следующее отверстие
			}
		}


	//длинные болты
	if (drawLongBolts) {
		var boltPar = {
			diam: 10,
			len: 40,
			headType: "шестигр.",
		}
		var longBoltPos = stringerParams.elmIns[stringerParams.key].longBolts;
		for (var i = 0; i < longBoltPos.length; i++) {
			var bolt = drawBolt(boltPar).mesh;
			bolt.rotation.x = Math.PI / 2 * turnFactor;
			bolt.position.x = longBoltPos[i].x;
			if (params.model == "лт") bolt.position.x -= 5;
			bolt.position.y = longBoltPos[i].y;
			bolt.position.z = anglesOut.position.z//params.stringerThickness/2;
			mesh.add(bolt);
		}

	}


// промежуточные косоуры широкого марша
	
	if (params.M > 1100 && params.calcType == "vhod") {
		var middleStringers = drawMiddleStringers(par, marshId);
		mesh.add(middleStringers.mesh);
		angles.add(middleStringers.angles);
		}

	stringerParams.mesh = mesh;
	stringerParams.angles = angles;
	
	return stringerParams;
}

// каркас верхней площадки
function drawTopPlatformStringers(par) {
	var mesh = new THREE.Object3D();
	var angles = new THREE.Object3D();

	var stringerParams = {
		marshId: 3,
		dxfBasePoint: par.dxfBasePoint,
		treadsObj: par.treadsObj,
		dxfBasePoint: par.dxfBasePoint,
	};
	if (params.stairModel == 'Прямая')
		stringerParams.marshId = 1;
	if (params.stairModel == 'Прямая с промежуточной площадкой')
		stringerParams.marshId = 3;
	

	//задняя тетива верхней площадки
	if ((params.platformTop == "площадка" || params.platformTop == "увеличенная") && params.platformRearStringer == "есть") {

		var rearStringer = drawTopPltStringer(stringerParams).mesh;
		rearStringer.rotation.y = par.treadsObj.lastMarshEnd.rot + Math.PI / 2;
		if (params.platformTop == 'увеличенная') {
			//var deltaZ = params.M - (params.platformWidth_3 - (params.M - calcTreadLen())) - params.stringerThickness;
			//rearStringer.position.z -= deltaZ - params.stringerThickness; //FIX	
			//if (turnFactor == -1) { //TURNFACTOR CHANGED
			//	rearStringer.position.z -= (params.platformWidth_3 - params.M);
			//}
			rearStringer.position.z = -params.stringerThickness;
			if (turnFactor == -1) rearStringer.position.z = 0;

			if (turnFactor == 1) {
				rearStringer.position.z = (params.platformWidth_3 - params.M);
			}
			if (~params.stairModel.indexOf("Г-образная")) {
				if (turnFactor == 1) {
					rearStringer.position.x = - (params.platformWidth_3 - params.M);
					rearStringer.position.z = 0;
				}				
			}
			if (~params.stairModel.indexOf("П-образная")) {
				if (turnFactor == 1) {
					rearStringer.position.z = -(params.platformWidth_3 - params.M);
				}
			}
		}		

		//корректируем позицию по длине площадки
		var offset = params.stringerThickness;
		if (params.model == "ко") offset += params.sideOverHang - 0.01;
		rearStringer.position.x -= offset * Math.cos(par.treadsObj.lastMarshEnd.rot);
		rearStringer.position.z -= offset * Math.sin(-par.treadsObj.lastMarshEnd.rot);

		mesh.add(rearStringer);

		//уголки на задней тетиве/косоуре
		var side = "right";
		var rearAngles = drawCarcasAngles(stringerParams.pointsHole, side);
		rearAngles.rotation.y = rearStringer.rotation.y;
		rearAngles.position.x = rearStringer.position.x;
		rearAngles.position.y = rearStringer.position.y;
		rearAngles.position.z = rearStringer.position.z;
		angles.add(rearAngles);

		//колонны на задней тетиве
		stringerParams.anglesPosZ = 0;
		stringerParams.dxfBasePoint.x += 2000;
		var columnsRear = drawColumnSide(stringerParams, "rear");
		columnsRear.rotation.y = rearStringer.rotation.y;
		columnsRear.position.x = rearStringer.position.x;
		columnsRear.position.y = rearStringer.position.y;
		columnsRear.position.z = rearStringer.position.z;
		mesh.add(columnsRear);
	}

	//каркас увеличенной верхней площадки
	if (params.platformTop == 'увеличенная' && params.platformWidth_3 > params.M) {

		var pltCarcas = drawBigPltCarcas(stringerParams);

		var deltaX = params.platformLength_3 / 2 - (params.M - params.platformLength_3) / 2 + 3;
		var deltaZ = ((params.platformWidth_3 - params.M) + params.M / 2 - params.stringerThickness) * turnFactor;
		if (turnFactor == -1) deltaZ -= params.stringerThickness;
		if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
			deltaX = (params.platformWidth_3 - params.M) + params.M / 2;
			deltaZ = (-params.M / 2 - 5) * turnFactor
		}
		if (~params.stairModel.indexOf("П-образная")) {
			var deltaX = -(params.platformLength_3 / 2 - (params.M - params.platformLength_3) / 2 + 5);
			var deltaZ = -((params.platformWidth_3 - params.M) + params.M / 2) * turnFactor;
		}
		pltCarcas.mesh.position.x = pltCarcas.angles.position.x = -deltaX;
		pltCarcas.mesh.position.z = pltCarcas.angles.position.z = deltaZ;
		mesh.add(pltCarcas.mesh);
		angles.add(pltCarcas.angles);
	}

	stringerParams.mesh = mesh;
	stringerParams.angles = angles;

	return stringerParams;
}

// Вывод косоуров промежуточной площадки для "П-образная с площадкой"
function drawPlatformStringers(par){
	
	var mesh = new THREE.Object3D();
	var angles = new THREE.Object3D();
	
	var stringerParams = {
		marshId: 1,
		dxfBasePoint: par.dxfBasePoint,
		turnStepsParams: par.turnStepsParams,
		treadsObj: par.treadsObj,
		turnFramesParams: par.turnFramesParams,
		dxfBasePoint: par.dxfBasePoint,
	};

	//передняя тетива/косоур
	if (params.model == "ко" || (params.model == "лт" && !hasTreadFrames())) {

		stringerParams.key = "front";

		var frontStringer = drawPltStringer(stringerParams).mesh;
		frontStringer.position.z = -(calcTurnParams(1).frontPltStringerOffset + params.stringerThickness) * turnFactor;		
		if (turnFactor == -1) frontStringer.position.z -= params.stringerThickness;

		frontStringer.position.y = -params.treadThickness;
		frontStringer.position.x = -params.M * 0.5;
		if (params.model == "лт") frontStringer.position.x += params.stringerThickness;
		if (params.model == "ко") {
			frontStringer.position.x += params.sideOverHang;
			if (params.stringerDivision == "нет") frontStringer.position.x += params.stringerThickness
		}
		mesh.add(frontStringer);

		//уголки на передней тетиве/косоуре
		var side = "left";
		if (turnFactor == -1) side = "right";
		var frontAngles = drawCarcasAngles(stringerParams.pointsHole, side);

		frontAngles.position.x = frontStringer.position.x;
		frontAngles.position.y = frontStringer.position.y;
		frontAngles.position.z = frontStringer.position.z;
		if (side == "left") frontAngles.position.z += params.stringerThickness;

		angles.add(frontAngles);

		//длинные болты

		if (drawLongBolts) {
			var boltPar = {
				diam: 10,
				len: 40,
				headType: "шестигр.",
			}
			var longBoltPos = stringerParams.elmIns.front.longBolts;
			for (var i = 0; i < longBoltPos.length; i++) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2 * turnFactor;
				bolt.position.x = longBoltPos[i].x + frontStringer.position.x;
				//if(params.model == "лт") bolt.position.x -= 5;
				bolt.position.y = longBoltPos[i].y + frontStringer.position.y;
				bolt.position.z = frontAngles.position.z - params.stringerThickness * turnFactor//params.stringerThickness/2;
				mesh.add(bolt);
			}

		}

	}


	//задняя тетива/косоур
	stringerParams.key = "rear";
	
	var rearStringer = drawPltStringer(stringerParams).mesh;

	rearStringer.position.z = -calcTurnParams(1).turnLengthTop * turnFactor;
	if (params.model == "лт" && params.stairModel == "П-образная с площадкой") {
		rearStringer.position.z -= (params.nose - 20) * turnFactor;
		
	}
	if (params.model == "ко") {
		var stringerOffset = 75;
		if(params.sideOverHang < 75) stringerOffset = params.sideOverHang;
		rearStringer.position.z += stringerOffset * turnFactor;
	}
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
	
	angles.add(rearAngles);	

	//колонны на задней тетиве
	stringerParams.anglesPosZ = rearAngles.position.z;
	stringerParams.dxfBasePoint.x += 2000;
	var columnsRear = drawColumnSide(stringerParams, "rear");
	columnsRear.position.x = rearStringer.position.x;
	mesh.add(columnsRear);

	
	stringerParams.mesh = mesh;
	stringerParams.angles = angles;
	
	return stringerParams;
}

// функция отрисовки колонн на одной стороне марша
function drawColumnSide(par, key){

	var mesh = new THREE.Object3D();
	
//колонны
	
	//рассчитываем параметры колонн

	var profSize = calcColumnSize();
	
	if (params.columnModel != "нет") {
		var colParams = {
			key: key,
			colLength: 1000, //переопределяется в цикле
			profWidth: profSize.profWidth,
			profHeight: profSize.profHeight,
			material: params.materials.metal,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			text: "",
			}
			
		var stringerLedge = 5; //выступ тетивы над ступенью для лт

		var columnOffsetZ = profSize.profHeight / 2 * turnFactor;
		if (params.model == "ко") var columnOffsetZ = -(profSize.profHeight / 2 + params.stringerThickness) * turnFactor;
		if (key == "in") columnOffsetZ *= -1;
		if (params.stairModel == "Прямая") columnOffsetZ *= -1;
		var columnOffsetX = 5;
		if (params.model == "ко") columnOffsetX = 0;
		if (params.stairModel == "П-образная с площадкой" && par.key == "rear") columnOffsetX = 0;
		var marshPos = 0;		
		if(par.marshId == 2 && !par.isWndP) marshPos = par.treadsObj.unitsPos.marsh2.y;
		if(par.marshId == 3) marshPos = par.treadsObj.unitsPos.marsh3.y;
		
		
		
		//задняя тетива забега П-образной с забегом
		if (par.isWndP) marshPos = par.treadsObj.unitsPos.turn2.y;
		
		//задняя тетива площадки
		if(par.key == "rear"){
			//задняя тетива площадки П-образной с площадкой
			if (par.marshId == 1 && params.stairModel == "П-образная с площадкой") {
				marshPos = par.treadsObj.unitsPos.turn1.y;
				}
			//задняя тетива верхней площадки
			if (par.marshId == 3 || params.stairModel == "Прямая") {
				marshPos = par.treadsObj.lastMarshEnd.y;
				columnOffsetX = 0;
				if(params.stairModel == "Прямая" && turnFactor == -1) columnOffsetZ *= -1;
				if(params.stairModel != "Прямая" && turnFactor == 1) columnOffsetZ *= -1;
				}
		}
		if (key == "front") {
			//задняя тетива верхней площадки
			if (par.marshId == 3 || params.stairModel == "Прямая") {
				marshPos = par.treadsObj.lastMarshEnd.y;
				columnOffsetX = 0;
				if (params.stairModel == "Прямая" && turnFactor == -1) columnOffsetZ *= -1;
				if (params.stairModel != "Прямая" && turnFactor == 1) columnOffsetZ *= -1;
			}
		}
		if (params.stairModel == "П-образная с площадкой") {
			if(par.marshId == 1 && par.key == "rear" && params.stairModel != "Прямая") {
				if (params.model == "лт") marshPos += stringerLedge;
				if (params.model == "ко") marshPos -= params.treadThickness;
			}
		}
		
		//боковая тетива увеличенной верхней площадки
		if(key == "side"){
			marshPos = par.treadsObj.lastMarshEnd.y;
			}
		
		for(var i=0; i<par.carcasHoles.length; i++){
			if(par.carcasHoles[i].isColumnHole){
				colParams.colLength = par.carcasHoles[i].y + marshPos;
				if (params.botFloorType == "черновой") colParams.colLength += params.botFloorsDist;
				colParams = drawColumn2(colParams);
				var col1 = colParams.mesh;
				col1.position.x = par.carcasHoles[i].x + profSize.profWidth / 2 - columnOffsetX;
				col1.position.y = par.carcasHoles[i].y;
				if (par.marshId == 1 && par.key == "rear" && params.stairModel != "Прямая") {
					if (params.model == "лт") col1.position.y += stringerLedge;
					if (params.model == "ко") col1.position.y -= params.treadThickness;
				}
				
				col1.position.z = par.anglesPosZ + columnOffsetZ;
				if (key == "front") {
					col1.rotation.y = Math.PI / 2;
					col1.position.z -= (90 - params.stringerThickness) * turnFactor;
					col1.position.x -= 90;
					if (turnFactor == -1) col1.position.z += (profSize.profWidth + params.stringerThickness);
				}
				mesh.add(col1);
				i++; //пропускаем следующее отверстие
			}
		}

	}
	
//подкосы

	for(var i=0; i<par.carcasHoles.length; i++){
		var bracePar = {
			width: params.M - params.stringerThickness,
			side: getSide()[key],
		}
		if (params.model == "ко") bracePar.width -= params.sideOverHang;
		
		if(par.carcasHoles[i].isBraceHole){
			console.log(par.carcasHoles[i].x, par.keyPoints[key].topPoint)
			if (params.topPltConsolePos == "сзади") {
				if (params.model == "ко")
					bracePar.width = par.keyPoints.topPoint.x - par.carcasHoles[i].x + 53 + params.sideOverHang + params.stringerThickness;
				else
					bracePar.width = par.keyPoints[key].topPoint.x - par.carcasHoles[i].x + 53;
			}
			bracePar = drawBrace(bracePar);
			var brace = bracePar.mesh;
			if (params.topPltConsolePos != "сзади"){
				if(getSide()[key] == "left") brace.rotation.y = Math.PI;
				brace.position.x = par.carcasHoles[i].x;
				if (params.model == "ко") brace.position.x += 5;
				brace.position.y = par.carcasHoles[i].y;
				brace.position.z = par.anglesPosZ;				
				if(getSide()[key] == "right") brace.position.z -= bracePar.width;
				if(getSide()[key] == "left") brace.position.z += bracePar.width;
				}
				
			if (params.topPltConsolePos == "сзади"){
				brace.rotation.y = -Math.PI / 2;
				brace.position.x = par.carcasHoles[i].x + bracePar.width - 53 - 5;
				if (params.model == "ко") brace.position.x += 5;
				brace.position.y = par.carcasHoles[i].y - 30;
				brace.position.z = par.anglesPosZ;
				if(getSide()[key] == "right") brace.position.z -= 57.5;
				if(getSide()[key] == "left") brace.position.z += 57.5;

				}
			mesh.add(brace);
			i += 4;
			}
		}
	
	//колонны наверху входной лестницы без площадки
	if(params.calcType == "vhod" && params.platformTop == "нет" && params.topStepColumns == "есть"){
		var i = par.carcasHoles.length - 1; //номер отверстия верхнего уголка
		colParams.length = par.carcasHoles[i].y + marshPos - 90;
		if(turnFactor == 1){
			if(key == "in") colParams.dir = "left";
			if(key == "out") colParams.dir = "right";
			}
		if(turnFactor == -1){
			if(key == "in") colParams.dir = "right";
			if(key == "out") colParams.dir = "left";
			}
		
		
		colParams = drawColumnF(colParams);
		var col1 = colParams.mesh;
		col1.position.x = par.carcasHoles[i].x - 5;// - profSize.profWidth / 2// - columnOffsetX;
		//col1.position.y = par.carcasHoles[i].y;
		col1.position.z = par.anglesPosZ;
		//учитываем что колонны ставятся сверху на уголок
		if(colParams.dir == "left") col1.position.z += 8 + 1; //1 добавляется чтобы не было пересечений
		if(colParams.dir == "right") col1.position.z -= 8 + 1;
		// - 8 * turnFactor;
		//if (key == "in") col1.position.z += 8 * 2 * turnFactor;
		mesh.add(col1);
		}

	return mesh;
}


//функция рассчитывает параметры косоуров по номеру марша и стороне и добавляет в исходный объект
function calcStringerParams(par){

	par.stringerSideOffset = 0;
	if (params.model == "ко") par.stringerSideOffset = params.sideOverHang;
	
	// Отступ тетивы вперед ступени
	var treadFrontOverHang = 5; // Отступ тетивы для ЛТ
	par.treadFrontOverHang = 0;
	if (params.model == "лт") par.treadFrontOverHang = treadFrontOverHang;

	
	if (par.marshId == 1){
		// Первый марш
		par.botEndLength = 0;
		par.topEndLength = 0;
		if ((params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') && (params.platformTop == "площадка" || params.platformTop == "увеличенная"))
			par.topEndLength = params.platformLength_3;
	}
	
	if (par.marshId == 3){
		par.is3MarshStringer = true;
		if (params.platformTop == 'увеличенная') {
			par.topEndLength = params.platformLength_3;
		}
	}	
	
	if (par.marshId == 2){
		// Второй марш
		par.is2MarshStringer = true; 

		// второй марш для "П-образной с забегом"
		
		if (params.stairModel == "П-образная с забегом"){
	//		par.marshId = 3;
			par.marshDist = params.marshDist;
			par.isWndP = true; //является задним косоуром П-образной лестницы	
		}
	}
	

	if (params.columnModel != "нет") {
		par.profWidth = 40;
		par.profHeight = 40;
		if (params.columnModel == "100x50") {
			par.profWidth = 100;
			par.profHeight = 50;
		}
		if (params.columnModel == "100x100") {
			par.profWidth = 100;
			par.profHeight = 100;
		}
	}

};

function calcWndParams(){
	
	var par = {};
	
	if (params.M <= 700) {
		par.angleModel = 'У2-40х40х160';
		par.angleLength = 160;		
		}
	else {
		par.angleModel = 'У2-40х40х200';
		par.angleLength = 200;
		}
	
	par.angleHoleDist = par.angleLength - 50; 
	
	return par;

}

function drawStringerHoles(par, typeDop){

	var pointsHole = par.pointsHole;
	var stringerShape = par.stringerShape;
	if (typeDop == "top") {
		pointsHole = par.pointsHoleTop;
		stringerShape = par.stringerShapeTop;
	}else
	if (typeDop == "bot") {		
		pointsHole = par.pointsHoleBot;
		stringerShape = par.stringerShapeBot;
	}
	
	for (var i = 0; i < pointsHole.length; i++) {
		var center = pointsHole[i];
		if (!center.noDraw) {
			var center = pointsHole[i];
			if (!center.rad) center.rad = 6.5
			

			var hole1 = new THREE.Path();
			addCircle(hole1, dxfPrimitivesArr, center, center.rad, par.dxfBasePoint);
			
			// Определяем тип зенковки, для свг чертежа
			var zenk = 'front';
			if (center.noZenk) zenk = 'no';
			if (center.backZenk) zenk = 'back';
			hole1.drawing = {};
			hole1.drawing.zenk = zenk;
			
			stringerShape.holes.push(hole1);

			var zencDiam = 20; // диаметр зенковки
			var layer = "comments";
			var trashShape = new THREE.Shape();
			
			//не зенковать
			if (center.noZenk && params.boltHead == "countersunk") {
				layer = "comments";
				var pz1 = newPoint_xy(center, -zencDiam, zencDiam);
				var pz2 = newPoint_xy(center, zencDiam, -zencDiam);
				addLine(trashShape, dxfPrimitivesArr, pz1, pz2, par.dxfBasePoint, layer);
				pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
				pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
				addLine(trashShape, dxfPrimitivesArr, pz1, pz2, par.dxfBasePoint, layer);
			}

			//зенковать с обратной стороны
			if (center.backZenk) {
				layer = "comments";
				addRoundHole(trashShape, dxfPrimitivesArr, center, zencDiam, par.dxfBasePoint, layer);
			}

			//сохраняем координаты для вставки длинных болтов (кроме отверстий рутелей)

			if (center.noZenk && center.rad < 7 && !center.noBolts) {
				if(!par.elmIns[par.key].longBolts) par.elmIns[par.key].longBolts = [];
				par.elmIns[par.key].longBolts.push(center);
			}
		}

	}
	
}


// функция возвращает координаты опорных колонн всей лестницы
function calcColumnsPos(isWndP) {
	
	// colPos[marshId][key][end][colId]
	
	//формируем внутреннюю структуру для всех маршей
	//внутри стороны колонны нумеруются следующим образом 6692035.ru/drawings/carcas/columnId.jpg
	var colPos = [];
	for(var i=1; i<=3; i++){
		colPos[i] = {
			in: [],
			out: [],
			rear: [],
			};
		};
	//колонны верхней площадки
	var marshId = 3;
	if (params.stairModel == "Прямая") marshId = 1;
	if (params.platformTop == "площадка" || params.platformTop == "увеличенная") {
		if (params.stairModel != "Прямая") {
			if (params.isColumnTop1) colPos[marshId].rear[1] = true;
			if (params.isColumnTop3) colPos[marshId].rear[2] = true;
			if (params.isColumnTop2) colPos[marshId].out[3] = true;
			if (params.isColumnTop4) colPos[marshId].in[3] = true;
			if (params.platformTop == "увеличенная") {
				if (params.isColumnTop5) colPos[marshId].rear[3] = true;
				//вместо 4-й отрисовывается 6-я. 4-я колонна отрисовывается прямо на боковой тетиве
				colPos[marshId].in[3] = false;
				if (params.isColumnTop6) colPos[marshId].in[3] = true;
			}
		}
		if (params.stairModel == "Прямая") {
			if (params.isColumnTop1) colPos[marshId].rear[2] = true;
			if (params.isColumnTop3) colPos[marshId].rear[1] = true;
			if (params.isColumnTop2) colPos[marshId].in[3] = true;
			if (params.isColumnTop4) colPos[marshId].out[3] = true;
			if (params.platformTop == "увеличенная") {
				if (params.isColumnTop5) colPos[marshId].rear[3] = true;
				//вместо 4-й отрисовывается 6-я. 4-я колонна отрисовывается прямо на боковой тетиве
				colPos[marshId].out[3] = false;
				if (params.isColumnTop6) colPos[marshId].out[3] = true;
			}
		}

	}


	// колонны маршей

	if(params.calcType == "vhod"){
		params.isColumn1 = params.isColumn2 = params.isColumn3 = params.isColumn4 = false;
		if(params.isColumnMiddle1) params.isColumn3 = true;
		if(params.isColumnMiddle2) params.isColumn1 = true;
		if(params.isColumnMiddle3) params.isColumn4 = true;
		if(params.isColumnMiddle4) params.isColumn2 = true;
		}
		
	if (params.stairModel != "Прямая") {
		//передние колонны нижнего поворота
		marshId = 1;
		if (params.isColumn1) colPos[marshId].out[3] = true;
		if (params.isColumn2) colPos[marshId].in[3] = true;

		//колонны средней площадки Прямая с промежуточной площадкой
		if (params.stairModel == "Прямая с промежуточной площадкой") {
			if (params.isColumn3) colPos[marshId]["out"][2] = true;
			if (params.isColumn4) colPos[marshId]["in"][2] = true;
		}
		
		//задние колонны нижнего поворота
		marshId = 3;
		var key = "out";
		if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
			key = "rear";
			marshId = 1; //заднюю тетиву площадки/забега относим к 1 маршу
			}
		if (params.stairModel == "П-образная трехмаршевая") marshId = 2;
		
		if (params.isColumn3) colPos[marshId][key][1] = true;
		if (params.isColumn4) colPos[marshId][key][2] = true;

		//передние колонны верхнего поворота
		if (params.isColumn5) colPos[2].in[3] = true;
		if (params.isColumn6) colPos[3].out[2] = true;
		
		//задние колонны верхнего поворота 
		var key = "out";
		if (params.stairModel == "П-образная с площадкой" && params.isColumn7){
			colPos[1]["rear"][3] = true; //заднюю тетиву площадки/забега относим к 1 маршу
		}
		
		if (params.stairModel == "П-образная трехмаршевая" || params.stairModel == "П-образная с забегом") {
			if (params.stairModel == "П-образная трехмаршевая" && params.isColumn7) colPos[3][key][1] = true;
			if (params.isColumn8) colPos[2]["out"][3] = true;
		}
		
		if (isWndP) {
			if (params.isColumn3) colPos[2]["out"][1] = true;
			if (params.isColumn4) colPos[2]["out"][2] = true;
			if (params.isColumn7) colPos[2]["out"][3] = true;
		}
		
		//колонны верхней площадки прямой горки
		if (params.stairModel == "Прямая горка"){
			colPos[1]["in"][2] = colPos[1]["out"][2] = colPos[3]["in"][2] = colPos[3]["out"][2] = false;
			if(params.isColumnMiddle1) colPos[1]["in"][3] = true;
			if(params.isColumnMiddle3) colPos[1]["out"][3] = true;
			if(params.isColumnMiddle2) colPos[3]["out"][3] = true;
			if(params.isColumnMiddle4) colPos[3]["in"][3] = true;
		}

		
	}

	return colPos;
}

/** функция возвращает координаты отверстий в тетиве для крепления опорных колонн
*@params: points[] - 4 базовых точки (http://joxi.ru/823bzOdsJPER5m)
*@result: points[] - точки отверстий под колонны //внутри стороны колонны нумеруются следующим образом 6692035.ru/drawings/carcas/columnId.jpg
**/

function calcColumnPosHoles(par) {
	
	var holeDist = 60;
	var frameProfHeight = 60;
	//var frameProfHeight = 40;
	var stringerLedge = 5;
	var colHoleOffset = 20

	//параметры колонн
	var profSize = calcColumnSize();
	
	var basePoints = [
		undefined,						// нулевой колонны нет
		par.keyPoints.botEnd,			// 1 колонна
		par.keyPoints.marshTopStart,	// 2 колонна
		par.keyPoints.marshTopEnd,		// 3 колонна
	];
	if (params.stairModel == "П-образная с площадкой" && par.key == "rear") {
		basePoints[1] = par.keyPoints.end2;
		basePoints[2] = newPoint_xy(par.keyPoints.end1, (par.keyPoints.end2.x - par.keyPoints.end1.x) / 2, 0);
		basePoints[3] =  newPoint_xy(par.keyPoints.end1, - 20, 0);
		//если ширина колонны больше чем зазор между маршами, тогда чтобы средняя колонна непересекалась с тетивами сдвигаем ее
		if (params.model == "лт" && profSize.profWidth > params.marshDist)
			basePoints[2].x += params.marshDist / 2 + params.stringerThickness + 60 + 5 + profSize.profWidth / 2;
	}
	if (params.stairModel == "П-образная с забегом" && par.key == "out" && par.isWndP) {
		basePoints[2] = newPoint_xy(par.keyPoints.botEnd, (par.keyPoints.topEndCol.x - par.keyPoints.botEnd.x) / 2, 10);
		if (params.model == "ко") basePoints[2].y += 30;
		basePoints[3] = par.keyPoints.topEndCol;
	}
	if (par.key == "rear" && par.isTopPlt) {
		basePoints[1] = par.keyPoints.end2;
		basePoints[2] = par.keyPoints.end1;
		if (par.keyPoints.end3) basePoints[3] = par.keyPoints.end3;
	}
	if (par.key == "front" && par.isTopPlt) {
		basePoints[1] = par.keyPoints.end2;
	}
	if (par.botEnd == "platformG" && !(par.key == "rear" && par.isTopPlt)) {
		basePoints[2] = par.keyPoints.botEnd2;
	}
	
	var columnPos = calcColumnsPos(par.isWndP);

	var columnsHoles = [];

	
		// параметры марша
		var marshParams = getMarshParams(par.marshId);
		
		// позиция отверстия относительно базовой точки
	var offsetY = stringerLedge + params.treadThickness + frameProfHeight + colHoleOffset + 5;
	if (params.model == "лт" && par.key == "rear") offsetY -= colHoleOffset;
		if (params.calcType == 'vhod') {
			if (params.stairFrame == 'есть' && par.key == "rear"){// || par.botEnd == 'platformG') {
				offsetY += 20;
			}
		}
		//учитываем что на рифленке высота ребра ступени 50мм
		if(params.stairType == "рифленая сталь") offsetY += 20;
		var holePos = [
			undefined,
			newPoint_xy(basePoints[1], profSize.profWidth / 2 + 60 + 10, -offsetY),
			newPoint_xy(basePoints[2], -(marshParams.b / 2 - 30), -offsetY),
			newPoint_xy(basePoints[3], marshParams.b / 2 + profSize.profWidth / 2, -offsetY),
		];
		//if (par.botEnd == "platformG" || par.botEnd == "platformP") basePoints[2] = newPoint_xy(basePoints[2], - 20, 0);
		if (par.botEnd == "platformG" || par.botEnd == "platformP")
			holePos[2] = newPoint_xy(basePoints[2], -profSize.profWidth / 2 - 60 - 10, -offsetY);
		if (params.model == "ко" && par.botEnd == "platformG" && par.key == "out") {
			holePos[1].y += 20;
			holePos[2].y += 20;
	}
		if (params.model == "ко" && marshParams.topTurn == "площадка") {
			holePos[3].x -= 20;
		}
		if (params.stringerType == "ломаная") {
			if (par.botEnd !== "winder") holePos[2] = newPoint_xy(basePoints[2], - marshParams.b / 2, -offsetY);
			holePos[3] = newPoint_xy(basePoints[3], marshParams.b / 2, -offsetY);
		}
	
		
		// задняя тетива п-образной с площадкой
		if (params.stairModel == "П-образная с площадкой" && par.key == "rear") {
			holePos[2] = newPoint_xy(basePoints[2], 0, -offsetY);
			holePos[3] = newPoint_xy(basePoints[3], -(profSize.profWidth / 2 + 60 + 10), -offsetY);
			if (params.model == "ко") {
				for (j=1; j<=3; j++) {
					holePos[j] = newPoint_xy(holePos[j], 0, 40);
				}
			}
		}
		// внешняя сторона п-образной с забегом
		if (params.stairModel == "П-образная с забегом" && par.isWndP) {
			holePos[2] = newPoint_xy(basePoints[2], 0, marshParams.h - offsetY);
			holePos[3] = newPoint_xy(basePoints[3], -(profSize.profWidth / 2 + 60 + 10 - params.stringerThickness), -offsetY);
			if (params.model == "ко") holePos[2] = newPoint_xy(holePos[2], 0, 40);
		}
		// задняя тетива верхней площадки 
		if (par.key == "rear" && par.isTopPlt) {
			var deltaY = 0;
			var deltaX = 0;
			if (params.calcType == 'vhod') {
				deltaY = 20;
				//deltaX = 10;
			}
			if ((params.stairModel !== 'Прямая' && turnFactor == 1) || (params.stairModel == 'Прямая' && turnFactor == -1) ) {
				holePos[2] = newPoint_xy(holePos[1], deltaX, deltaY);
				holePos[1] = newPoint_xy(basePoints[2], -(profSize.profWidth / 2 + 60 + 10) + deltaX, deltaY - offsetY);
			}
			else {
				holePos[1] = newPoint_xy(holePos[1], deltaX, deltaY);
				holePos[2] = newPoint_xy(basePoints[2], -(profSize.profWidth / 2 + 60 + 10) + deltaX, deltaY - offsetY);
			}
			if (par.keyPoints.end3) holePos[3] = newPoint_xy(basePoints[3], -(profSize.profWidth / 2) + deltaX, - offsetY);
		}

		if (par.botEnd == "winder" && params.model == "лт") {
			//сдвигаем колонну чтобы не было пересечения с забежной рамкой
			if (params.stairFrame == "есть") holePos[2] = newPoint_xy(holePos[2], (260 - marshParams.b) / 2, 0); //260 - подогнано
			//сдвигаем колонну чтобы не было пересечения с перемычкой
			if (params.stairFrame == "нет") holePos[2] = newPoint_xy(holePos[2], - marshParams.b, -marshParams.h);

			//удлиннение внутренней тетивы/косоура под забегом
			var longStringerTop = false;
			//удлиннение тетивы
			if (par.key == "out") {
				if (marshParams.prevMarshId == 1 && params.inStringerElongationTurn1 == "да") longStringerTop = true;
				if (marshParams.prevMarshId == 2 && params.inStringerElongationTurn2 == "да") longStringerTop = true;

				if (longStringerTop && holePos[2]) holePos[2].x -= 50;
			}			
		};
		
		//if (params.stairType == "дпк" && holePos[3]) {
		if (params.calcType == 'vhod' && holePos[3]) {
			holePos[3].x += marshParams.a - marshParams.b / 2 - marshParams.b + 5;
			if (params.stringerType == "ломаная") holePos[3].x += profSize.profWidth / 2;
			holePos[3].y += 20;
		}

		if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 1) {
			//holePos[2] = newPoint_xy(holePos[3], marshParams.b + params.middlePltLength - 100, marshParams.h);
			holePos[2] = newPoint_xy(par.keyPoints.platformEnd, - 100, - offsetY);

		}
		
		//сдвигаем колонны чтобы они не пересекались со стойками ограждений. 

	if (params.model == "ко" && par.railingHoles) {
			for(var j=1; j<4; j++){
				for(var k=0; k < par.railingHoles.length; k++){
					if (holePos[j] && !par.railingHoles[k].noDraw){
						var holesDist = Math.abs(holePos[j].x - par.railingHoles[k].x)
						if (holesDist < (profSize.profWidth / 2 + 20 + 5)) { //20 - половина ширины стойки ограждения, 5 - зазор между стойкой и колонной
							var mooveX = (profSize.profWidth / 2 + 25) - holesDist;
							if(holePos[j].x < par.railingHoles[k].x) mooveX *= -1;
							holePos[j] = newPoint_x1(holePos[j], mooveX, marshParams.ang)
						}
					}
				}
			}
		}

		var stringerPar = calcStringerPar({ marshId: par.marshId, key: par.key});
			
		// добавляем отверстия в конечный массив
		for (var k=1; k<=3; k++) {		// k - номер колонны в марше
			if (columnPos[par.marshId][par.key]) {
				if (columnPos[par.marshId][par.key][k] && holePos[k]) {
					var colHole1 = holePos[k];
					var colHole2 = newPoint_xy(colHole1, 0, -holeDist);
					colHole2.isColumnHole = colHole1.isColumnHole = true;
					if(params.model == "ко") colHole2.backZenk = colHole1.backZenk = true;
					colHole2.hasAngle = colHole1.hasAngle = false;
                    if ((k == 1 || k == 2) && par.botEnd == "platformG" && (stringerPar.stringerDivision || stringerPar.stringerDivisionBot))
						colHole2.place = colHole1.place = "bot";		// в массти для отверстий в нижней части тетивы (pointsHoleBot) должны попасть только отвертия для 1 и 2 колонн
					columnsHoles.push(colHole1);
					columnsHoles.push(colHole2);
				}
			}
		}

	

	
	//колонны под серединой марша на прямой лестнице
	if(params.stairModel == "Прямая"){
		var hasMidColumn = false;
		if(par.key == "in"){
			if(turnFactor == 1 && params.isColumn1) hasMidColumn = true;
			if(turnFactor == -1 && params.isColumn2) hasMidColumn = true;
			}
		if(par.key == "out"){
			if(turnFactor == 1 && params.isColumn2) hasMidColumn = true;
			if(turnFactor == -1 && params.isColumn1) hasMidColumn = true;
			}
		
		if(hasMidColumn){
			var stepId = Math.floor(params.stairAmt1 / 2);
			var divide = ltko_set_divide(par.marshId).divide;
			if (stepId == divide) stepId -= 1;
			var rackPos = setRackPos(1);
			if (rackPos.includes(stepId)) stepId -= 1;
			var colHole1 = {
				x: params.b1 * (stepId - 0.5),
				y: params.h1 * (stepId - 1),
			}
			
			if (params.stairType == "дпк") colHole1.x += params.a1 - params.b1 / 2 - params.b1 + profSize.profWidth / 2 + 5;
			var colHole2 = newPoint_xy(colHole1, 0, -holeDist);
			colHole2.isColumnHole = colHole1.isColumnHole = true;
			colHole2.backZenk = colHole1.backZenk = true;
			colHole2.hasAngle = colHole1.hasAngle = false;
			columnsHoles.push(colHole1);
			columnsHoles.push(colHole2);
			}
		}

	return columnsHoles; 
}

/** функция возврящает размеры опорных колонн
* @result: profWidth - ширина профиля колонны
* @result: profHeight - высота профиля колонны
**/

function calcColumnSize(){
	
	var profWidth = 40;
	var profHeight = 40;
		
	if (params.columnModel == "100x50") {
		profWidth = 100;
		profHeight = 50;
		}
	if (params.columnModel == "100x100") {
		profWidth = 100;
		profHeight = 100;
		}
		
	var profSize = {
		profWidth: profWidth,
		profHeight: profHeight,
	}
	
	return profSize;
}


//--------------------------------

function setTurnRacksParams(marshId, key) {
	var marshPar = getMarshParams(marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);

	var rackProfile = 40;

	var turnParams = calcTurnParams(marshPar.prevMarshId)

	if (params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная с площадкой")
		prevMarshPar.hasRailing.in = false;

	var par = {
		stringerShiftPoint: { x: 0, y: 0 }, // смещение поворотной стойки
		rackLenAdd: 0, // удлинение стойки
		shiftBotFrame: 0, //сдвиг кронштейна крепления к косоуру вниз чтобы не попадал на крепление рамки
		shiftYtoP0: 0, //сдвиг вниз от начальной точки
		shiftYforShiftX: 0,//сдвиг вниз по Y из-за сдвига по Х
	}
	if (marshPar.botTurn != "пол" && key == "in" && prevMarshPar.hasRailing.in) {

		par.shiftYforShiftX = (marshPar.b * 0.5 - rackProfile / 2) * Math.tan(marshPar.ang);

		if (params.model == "ко") {
			par.shiftBotFrame = 30;
			if (marshPar.botTurn == "забег") {
				par.shiftYtoP0 = marshPar.h * 2 + prevMarshPar.h + par.shiftBotFrame;
				par.stringerShiftPoint.x = -(turnParams.topMarshOffsetZ + params.nose) + rackProfile / 2;
				par.stringerShiftPoint.y = - par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 + marshPar.h - par.shiftYforShiftX - (turnParams.topMarshOffsetZ + params.nose) * Math.tan(marshPar.ang);
				if (params.riserType == "есть") {
					par.stringerShiftPoint.x -= params.riserThickness;
					par.rackLenAdd -= params.riserThickness * Math.tan(marshPar.ang);
				}
			}
			if (marshPar.botTurn == "площадка") {
				par.shiftYtoP0 = marshPar.h + prevMarshPar.h + par.shiftBotFrame;
				par.stringerShiftPoint.x = rackProfile / 2;
				par.stringerShiftPoint.y = - par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 - par.shiftYforShiftX;
				if (params.riserType == "есть") {
					par.stringerShiftPoint.x -= params.riserThickness;
					par.rackLenAdd -= params.riserThickness * Math.tan(marshPar.ang);
				}
			}
		}

		if (params.model == "лт") {
			if (marshPar.botTurn == "забег") {
				par.shiftYtoP0 = marshPar.h * 3 + prevMarshPar.h;
				par.stringerShiftPoint.x = rackProfile / 2;
				par.stringerShiftPoint.y = -par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 - par.shiftYforShiftX;
			}
			if (marshPar.botTurn == "площадка") {
				par.shiftYforShiftX -= (40) * Math.tan(marshPar.ang);
				//par.shiftYtoP0 = marshPar.h + prevMarshPar.h;
				par.shiftYtoP0 = prevMarshPar.h + 65;
				par.stringerShiftPoint.x = rackProfile / 2 + 40;
				par.stringerShiftPoint.y = - par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 - par.shiftYforShiftX + 5;
				if (params.stairType == "лотки" || params.stairType == "рифленая сталь")
					par.rackLenAdd -= 40 - 5;
				if (params.stairType == "дпк")
					par.rackLenAdd -= 20;
			}
		}
	}

	return par;
}

function drawMarshTreads2(par) {
	/*
	par = {
		marshId
		dxfBasePoint
		}
	*/

	par.treads = new THREE.Object3D();
	par.risers = new THREE.Object3D();

	var techDelta = 0;
	if (params.calcType == 'timber' && testingMode) techDelta = 0.01;

	var hasTurnRack = false;
	if (params.railingModel == "Деревянные балясины" || params.railingModel == "Дерево с ковкой" || params.railingModel == "Стекло") {
		if (params.stairModel == 'Г-образная с забегом' || params.stairModel == 'Г-образная с площадкой') {
			hasTurnRack = getMarshParams(1).hasRailing.in || getMarshParams(3).hasRailing.in;
		}
		if (params.stairModel == 'П-образная трехмаршевая' && par.marshId == 2) {
			hasTurnRack = getMarshParams(1).hasRailing.in || getMarshParams(2).hasRailing.in;
		}
		if (params.stairModel == 'П-образная трехмаршевая' && par.marshId == 3) {
			hasTurnRack = getMarshParams(2).hasRailing.in || getMarshParams(3).hasRailing.in;
		}
		if ((params.stairModel == 'П-образная с забегом' || params.stairModel == 'П-образная с площадкой') && par.marshId == 3) {
			hasTurnRack = getMarshParams(3).hasRailing.in;
		}
	}

	//параметры марша
	var marshPar = getMarshParams(par.marshId);

	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;
	//сохраняем позицию последней ступени
	par.endPos = {
		x: 0,
		y: par.h,
	};

	par.treadLen = calcTreadLen();

	if (par.stairAmt > 0) {
		//расчет длины ступеней

		var plateParams = {
			len: par.treadLen,
			width: par.a,
			dxfBasePoint: par.dxfBasePoint,
			dxfArr: dxfPrimitivesArr,
			thk: params.treadThickness - techDelta * 2,
			material: params.materials.tread,
			partName: "tread",
		};
		//коррекция толщины
		if (params.stairType == "лотки" || params.stairType == "рифленая сталь") plateParams.thk = 4;
		if (params.stairType == "лотки") plateParams.width -= plateParams.thk * 2 + 0.1;
		// if (params.calcType == "timber") plateParams.thk -= 0.02;
		if (params.stairType == 'лотки') {
			// рассчитываем параметры рамки
			var parFrame = {}
			calcFrameParams(parFrame);
			plateParams.thkFull = plateParams.thk + parFrame.profHeight;
		}


		//пригласительные ступени
		par.startTreadsParams = [];
		if (params.startTreadAmt > 0 && par.marshId == 1) {
			var startTreadsObj = drawStartUnit();
			startTreadsObj.treads.position.z = -params.M / 2 * turnFactor;
			startTreadsObj.risers.position.z = -params.M / 2 * turnFactor;
			par.treads.add(startTreadsObj.treads);
			par.risers.add(startTreadsObj.risers);
			//добавляем размеры в возвращаемый объект
			par.startTreadsParams = startTreadsObj.dim;
		}

		//цикл построения ступеней
		var startIndex = 0;
		if (params.startTreadAmt > 0 && par.marshId == 1) startIndex = params.startTreadAmt;

		var posZ = 0;
		for (var i = startIndex; i < par.stairAmt; i++) {
			var addToDxf = true;
			if (params.calcType == "timber" || params.calcType == "timber_stock") {
				par.notches = calcMarshNotches(par.marshId);
				plateParams.notches = {
					botIn: { x: 0, y: 0 },
					botOut: { x: 0, y: 0 },
					topIn: { x: 0, y: 0 },
					topOut: { x: 0, y: 0 },
				};
			}
			var drawRectTread = true; //отрисовываем обыкновенную прямогуольную ступень на этой итерации

			var railingStartIndex = startIndex;
			if (par.marshId == 1) {
				if (params.firstNewellPos == "на первой ступени") railingStartIndex += 1;
				if (params.firstNewellPos == "на второй ступени") railingStartIndex += 2;
				railingStartIndex -= params.startTreadAmt;
			}
			//нестандартная первая ступень
			if (par.stairAmt > 1 && railingStartIndex !== par.stairAmt - 1) {
				plateParams.dxfArr = dxfPrimitivesArr;
				if (i == startIndex && params.calcType == "mono" && hasTurnRack && par.marshId > 1 && getMarshParams(par.marshId).botTurn == 'забег') {
					plateParams.notches = {
						botIn: { x: 0, y: 0 },
						botOut: { x: 0, y: 0 },
						topIn: { x: 0, y: 0 },
						topOut: { x: 0, y: 0 },
					};
					plateParams.width -= 5;

					var tread = drawNotchedPlate(plateParams).mesh;
					tread.rotation.x = Math.PI / 2;
					tread.position.x = par.b * startIndex + 5;
					tread.position.y = par.h * (startIndex + 1) - techDelta;
					tread.position.z = - plateParams.len / 2;
					drawRectTread = false;
				}

				if (i == startIndex && (params.calcType == "lt-ko" || params.calcType == "mono") && hasTurnRack && par.marshId > 1 && getMarshParams(par.marshId).botTurn == 'площадка') {
					plateParams.notches = {
						botIn: { x: 0, y: 0 },
						botOut: { x: 0, y: 0 },
						topIn: { x: 0, y: 0 },
						topOut: { x: 0, y: 0 },
					};
					plateParams.notches.hasNothes = true;
					plateParams.notches.botIn = {
						x: params.nose, y: 95 + 0.01
					};
					//выводим в dxf только одну ступень
					plateParams.dxfArr = dxfPrimitivesArr;
					if (i > startIndex && plateParams.width == par.a) plateParams.dxfArr = [];

					var tread = drawNotchedPlate(plateParams).mesh;
					tread.rotation.x = Math.PI / 2;
					tread.position.x = par.b * startIndex;
					tread.position.y = par.h * (startIndex + 1) - techDelta;
					tread.position.z = - plateParams.len / 2;
					drawRectTread = false;
				}

				if (i == railingStartIndex && (params.calcType == "timber" || params.calcType == "timber_stock")) {
					if (par.notches.botIn.x != 0 && par.notches.botIn.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.botIn = copyPoint(par.notches.botIn);
					}

					if (par.notches.botOut.x != 0 && par.notches.botOut.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.botOut = copyPoint(par.notches.botOut);
					}
					var tread = drawNotchedPlate(plateParams).mesh;
					tread.rotation.x = Math.PI / 2;
					tread.position.x = par.b * railingStartIndex;
					tread.position.y = par.h * (railingStartIndex + 1) - techDelta;
					tread.position.z = - plateParams.len / 2;
					drawRectTread = false;
				}
			}

			//нестандартная последняя ступень
			if (i == par.stairAmt - 1 && par.stairAmt > 1) {
				plateParams.dxfArr = dxfPrimitivesArr;
				if (params.calcType == "timber") {
					plateParams.dxfBasePoint = newPoint_xy(plateParams.dxfBasePoint, plateParams.width + 100, 0);
					plateParams.dxfArr = dxfPrimitivesArr;
					plateParams.notches.botIn = { x: 0, y: 0 };
					plateParams.notches.botOut = { x: 0, y: 0 };

					//Корректировка если осталась одна ступень на марше, чтобы отрисовались отверстия и в начале и в конце ступени
					if (railingStartIndex == par.stairAmt - 1) {
						if (par.notches.botIn.x != 0 && par.notches.botIn.y != 0) {
							plateParams.notches.hasNothes = true;
							plateParams.notches.botIn = copyPoint(par.notches.botIn);
						}

						if (par.notches.botOut.x != 0 && par.notches.botOut.y != 0) {
							plateParams.notches.hasNothes = true;
							plateParams.notches.botOut = copyPoint(par.notches.botOut);
						}
					}

					if (par.notches.topIn.x != 0 && par.notches.topIn.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.topIn = copyPoint(par.notches.topIn);
					}
					if (par.notches.topOut.x != 0 && par.notches.topOut.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.topOut = copyPoint(par.notches.topOut);
					}
					var tread = drawNotchedPlate(plateParams).mesh;
					tread.rotation.x = Math.PI / 2;
					tread.position.x = par.b * (par.stairAmt - 1);
					tread.position.y = par.h * par.stairAmt - techDelta;
					tread.position.z = - plateParams.len / 2;
					drawRectTread = false;
				}

				if (params.model == "лт" && params.topAnglePosition == "вертикальная рамка" && marshPar.lastMarsh) {
					plateParams.width = par.b + 40 - params.riserThickness;
					//если расчетная ширина отличается незначительно, делаем все ступени одинаковыми
					if (plateParams.width - par.a < 3 && plateParams.width - par.a > 0) plateParams.width = par.a;
				}
			}

			if (par.stairAmt == 1) {
				par.notches = calcMarshNotches(par.marshId);
				plateParams.notches = {
					botIn: { x: 0, y: 0 },
					botOut: { x: 0, y: 0 },
					topIn: { x: 0, y: 0 },
					topOut: { x: 0, y: 0 },
				};
				if (params.calcType == "mono" && hasTurnRack && par.marshId > 1 && getMarshParams(par.marshId).botTurn == 'забег') {
					plateParams.width -= 5;
				}
				if ((params.calcType == "lt-ko" || params.calcType == "mono") && hasTurnRack && par.marshId > 1 && getMarshParams(par.marshId).botTurn == 'площадка') {
					plateParams.notches.hasNothes = true;
					plateParams.notches.botIn = {
						x: params.nose, y: 95 + 0.01
					};
				}
				if (params.calcType == "timber") {
					plateParams.dxfBasePoint = newPoint_xy(plateParams.dxfBasePoint, plateParams.width + 100, 0);
					plateParams.dxfArr = dxfPrimitivesArr;

					if (par.notches.botIn.x != 0 && par.notches.botIn.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.botIn = copyPoint(par.notches.botIn);
					}
					// plateParams.notches.hasNothes = true;
					// plateParams.notches.botIn = {x:100,y:100};
					if (par.notches.botOut.x != 0 && par.notches.botOut.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.botOut = copyPoint(par.notches.botOut);
					}
					if (par.notches.topIn.x != 0 && par.notches.topIn.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.topIn = copyPoint(par.notches.topIn);
					}
					if (par.notches.topOut.x != 0 && par.notches.topOut.y != 0) {
						plateParams.notches.hasNothes = true;
						plateParams.notches.topOut = copyPoint(par.notches.topOut);
					}
				}
				if (params.model == "лт" && params.topAnglePosition == "вертикальная рамка") {
					plateParams.width = par.b + 40 - params.riserThickness;
				}
				var tread = drawNotchedPlate(plateParams).mesh;
				tread.rotation.x = Math.PI / 2;
				tread.position.x = par.b * (par.stairAmt - 1);
				tread.position.y = par.h * par.stairAmt - techDelta;
				if (params.stairType == 'лотки') {
					// рассчитываем параметры рамки
					var parFrame = { marshId: par.marshId }
					calcFrameParams(parFrame);
					tread.position.y -= parFrame.profHeight + plateParams.thk;
				}
				tread.position.z = - plateParams.len / 2;
				drawRectTread = false;
			}
			//стандартная ступень

			if (drawRectTread) {
				if (params.stairType == 'дпк' || params.stairType == "лиственница тер.") {
					var tread = new THREE.Object3D();//Объеъкт ступеньки
					plateParams.material = params.materials.dpc;
					plateParams.dxfArr = [];

					//Считаем количество досок на ступень
					var deckAmt = Math.round((par.a - params.dpcDst) / (params.dpcWidth + params.dpcDst));

					//Задаем ширину доски для отрисовки
					plateParams.width = params.dpcWidth;

					for (var j = 0; j < deckAmt; j++) {//Рисуем доски
						var treadPlank = drawPlate(plateParams).mesh;//Меш
						treadPlank.position.y = (params.dpcWidth + params.dpcDst) * (j - deckAmt + 1)// - (params.dpcWidth + params.dpcDst);//Задаем положения досок
						tread.add(treadPlank);//Добавляем доски в объект
					}
					//plateParams.width = par.a;//Возвращаем всё на место
				}
				else {
					//выводим в dxf только одну ступень
					plateParams.dxfArr = dxfPrimitivesArr;
					if (i > startIndex && plateParams.width == par.a) {
						plateParams.dxfArr = [];
						addToDxf = false;
					}

					var tread = drawPlate(plateParams).mesh;//Стандартная отрисовка
				}
				tread.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5);
				tread.position.x = par.b * i + plateParams.width;
				tread.position.y = par.h * (i + 1) - techDelta;
				if (params.stairType == 'лотки') {
					// рассчитываем параметры рамки
					var parFrame = {}
					calcFrameParams(parFrame);
					tread.position.y -= parFrame.profHeight + plateParams.thk;
					tread.position.x += plateParams.thk + 0.05;
				}
				tread.position.z = - plateParams.len / 2;
			}

			if (params.model == "тетива+косоур") tread.position.z += (params.stringerThickness - params.stringerSlotsDepth) / 2 * turnFactor;
			/*if (params.model == "ко" && params.riserType == "есть" && par.marshId > 1){
						tread.position.x -= params.riserThickness;
						}
			*/
			//коррекция чтобы не было пересечений
			if (params.calcType != "timber") {
				tread.position.y += 0.01;
				tread.position.x -= 0.01;
			}
			if (params.calcType == "timber") {
				// tread.position.y -= 0.01;
				//tread.position.x -= 0.01;
			}

			par.treads.add(tread);

			/*подступенки марша*/

			// для всех ступеней кроме последней
			if (params.riserType == "есть") {
				var riserPar = {
					len: plateParams.len,
					width: par.h - techDelta * 2,
					thk: params.riserThickness,
					dxfArr: [],
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, params.M + 200, 0),
				};

				//коррекция размеров первого подступенка
				if (i == 0) {
					if (marshPar.botTurn == "пол") riserPar.width = par.h - params.treadThickness;	// первый подступенок на первом марше и первый после площадки ниже остальных на толщину ступени
					if (marshPar.botTurn != "пол" && params.calcType == "timber") {
						riserPar.len = calcNewellRiserLen();
					}
				}

				if (marshPar.botTurn == "пол") {
					if (i == 0) {
						riserPar.description = "Подступенок первой ступени"
						riserPar.count = 1
						riserPar.dxfArr = dxfPrimitivesArr
					}
					if (i == 1) {
						riserPar.description = "Подступенок марша"
						riserPar.count = par.stairAmt - 1
						riserPar.dxfBasePoint.x += par.h + 50
						riserPar.dxfArr = dxfPrimitivesArr
					}
				}
				else {
					if (i == 0) {
						riserPar.description = "Подступенок марша"
						riserPar.count = par.stairAmt
						riserPar.dxfArr = dxfPrimitivesArr
					}
				}



				//отрисовка
				riserPar = drawRectRiser(riserPar);
				riser = riserPar.mesh;

				riser.rotation.y = Math.PI / 2// * turnFactor;
				riser.rotation.x = Math.PI / 2;
				riser.position.x = tread.position.x - plateParams.width + params.nose + 0.01;
				if (!drawRectTread) riser.position.x += plateParams.width;
				riser.position.y = tread.position.y - (par.h + params.treadThickness) + techDelta * 1.5;
				if (i == 0 && marshPar.botTurn == "пол") riser.position.y = 0;
				riser.position.z = tread.position.z;
				if (i == 0 && marshPar.botTurn !== 'пол' && turnFactor == -1) riser.position.z += plateParams.len - calcNewellRiserLen();

				par.risers.add(riser);
			}

			if (addToDxf) {
				var text = "Ступени " + par.marshId + " марша";
				var textHeight = 25;
				var textBasePoint = newPoint_xy(par.dxfBasePoint, -20, -120);
				if (i == startIndex) addText(text, textHeight, plateParams.dxfArr, textBasePoint);
				plateParams.dxfBasePoint.y += par.a + 100;
			}

		}//end of for

		//сохраняем позицию последней ступени
		if (tread) {
			par.endPos = {
				x: tread.position.x + par.b,
				y: tread.position.y + par.h,
			}
		}
	}

	//последняя урезанная ступень

	//if (marshPar.lastMarsh && (params.topAnglePosition == "вертикальная рамка") && !params.calcType == "timber_stock") {
	if (marshPar.lastMarsh && params.topAnglePosition == "вертикальная рамка") {

		//рассчитываем размеры поворота, зависящие от модели лестницы
		var lastTreadWidth = setModelDimensions({ model: params.model, }).topStepDelta;

		//ступень
		var posX = par.endPos.x;
		if (params.calcType != "timber_stock") {
			var plateParams = {
				len: par.treadLen,
				width: lastTreadWidth,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, par.a + 50),
				dxfArr: dxfPrimitivesArr,
				thk: params.treadThickness,
				material: params.materials.tread,
				partName: "tread",
			};

			var lastTread = drawPlate(plateParams).mesh;
			lastTread.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5);
			lastTread.position.x = par.endPos.x - par.b + params.riserThickness + 40; //40 - размер вертикальной рамки
			if (par.stairAmt == 0) {
				lastTread.position.x = par.endPos.x + params.riserThickness + 40;
				var marshPar = getMarshParams(par.marshId);
				if (marshPar.botTurn == "забег") {
					lastTread.position.x += params.lastWinderTreadWidth;
					if (params.model == "ко") lastTread.position.x += -55 + params.nose;
				}
			}
			if (par.stairAmt == 1) {
				lastTread.position.x = par.endPos.x + 80;
				if (params.model == "ко")
					lastTread.position.x = par.endPos.x + params.riserThickness + 90 - (50 - params.nose);
			}
			lastTread.position.y = par.endPos.y;
			lastTread.position.z = - plateParams.len / 2;
			par.treads.add(lastTread);
			posX = lastTread.position.x - 40;
		}

		//подступенок вертикальной рамки

		var plateParams = {
			len: par.treadLen,
			width: par.h - 1,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, params.M + 200 + par.h + 50, par.a + lastTreadWidth + 150),
			dxfArr: dxfPrimitivesArr,
			thk: params.riserThickness,
			material: params.materials.riser,
			partName: "riser",
		};
		if (params.calcType == "timber_stock") {
			plateParams.width = par.h + 200;
			plateParams.thk = params.treadThickness;
			posX = par.endPos.x - par.b + params.treadThickness;
			if (par.stairAmt < 2) {
				posX = par.endPos.x + params.nose + plateParams.thk;
			}
		}

		var lastRiser = drawPlate(plateParams).mesh;
		lastRiser.rotation.y = -Math.PI / 2;
		lastRiser.position.x = posX;
		lastRiser.position.y = par.endPos.y - par.h - params.treadThickness;
		if (params.calcType == "timber_stock") lastRiser.position.y = par.endPos.y - plateParams.width;
		lastRiser.position.z = - plateParams.len / 2;

		par.risers.add(lastRiser);

		//подпись в dxf
		var textHeight = 30;
		var text = "Подступенок вертикальной рамки";
		addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(plateParams.dxfBasePoint, 0, -50));


	}

	par.len = marshPar.len;
	par.height = marshPar.height;

	return par;

} //end of 	drawMarshTreads2

function drawPlatform2(par) {

	/*
	параметры:
	par.len - общая длина (глубина) площадки
	par.width - общая ширина площадки
	dxfBasePoint
	isP
	botMarshId
	*/

	par.treads = new THREE.Object3D();
	par.risers = new THREE.Object3D();
	//поперек волокон площадка делается из кусков не шире 600мм. Рассчитываем параметры и добавляем в par
	calcPltPartsParams(par);

	var marshPar = getMarshParams(par.botMarshId);

	if (!par.isNotTread) {
		var plateParams = {
			len: par.width - 5,
			width: par.partLen,
			dxfBasePoint: par.dxfBasePoint,
			dxfArr: dxfPrimitivesArr,
			thk: params.treadThickness,
			material: params.materials.tread,
			partName: "tread",
		}
		if (params.stairType == 'дпк' || params.stairType == "лиственница тер.") {
			plateParams.material = params.materials.dpc;
			plateParams.dxfArr = [];
		}
		if (params.stairType == 'лотки') {
			// рассчитываем параметры рамки
			var parFrame = {}
			calcFrameParams(parFrame);
			plateParams.thkFull = plateParams.thk + parFrame.profHeight;
		}

		var partLen = par.partLen;
		for (var i = 0; i < par.partsAmt; i++) {
			par.partLen = partLen;
			if (par.lastPartLen && i == par.partsAmt - 1) par.partLen = par.lastPartLen;
			plateParams.width = par.partLen;
			if (params.calcType == 'timber_stock' && $sceneStruct["vl_1"]["newell_fixings"]) {
				if (i == 0) plateParams.holes = calcTimberStokPltHoles(plateParams.width, i == 0);
				if (i == par.partsAmt - 1) plateParams.holes = calcTimberStokPltHoles(plateParams.width, i == 0);
			}
			var tread = drawPlate(plateParams).mesh;
			tread.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5);
			tread.position.x = (partLen + par.partsGap) * i + plateParams.width;
			tread.position.y = 0.01;
			tread.position.z = - calcTreadLen() / 2;
			if (turnFactor == -1) tread.position.z = calcTreadLen() / 2 - plateParams.len;
			plateParams.dxfBasePoint.y += plateParams.width + 150;

			par.treads.add(tread);
		} //end of for

		/*подступенок под площадкой*/

		if (params.riserType == "есть") {
			var riserPar = {
				len: params.M,
				width: marshPar.h,
				thk: params.riserThickness,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: dxfBasePoint,
			};

			//отрисовка
			riserPar = drawRectRiser(riserPar);
			riser = riserPar.mesh;

			riser.rotation.y = Math.PI / 2;
			riser.rotation.x = Math.PI / 2;
			riser.position.x = params.nose;
			riser.position.y = tread.position.y - params.treadThickness - marshPar.h + 0.01;
			riser.position.z = tread.position.z;
			if (params.stairModel == "П-образная с площадкой" && turnFactor == -1 && par.botMarshId == 1) {
				riser.position.z = -plateParams.len / 2 + riserPar.len / 2 + params.marshDist / 2;
			}

			par.risers.add(riser);
		}
	}

	//сохраняем позицию последней ступени
	par.endPos = {
		x: 0,
		y: 0,
	}

	return par;
}

function drawSideHandrailSect(par) {

	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	var turnPar = calcTurnParams(marshPar.prevMarshId);
	var mesh = new THREE.Object3D();
	var handrailHeight = 900;
	var handrailYOffset = handrailHeight + marshPar.h;
	var partsLen = [];


	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.timberPaint_perila,
	}
	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

	var handrailParams = {
		model: params.handrail,
		length: (marshPar.b * marshPar.stairAmt) / Math.cos(marshPar.ang),
		dxfBasePoint: copyPoint(par.dxfBasePoint),
		metalMaterial: params.materials.metal,
		timberMaterial: params.materials.timber,
		side: par.side,
		partName: "sideHandrails",
		marshId: par.marshId
	}

	handrailParams.startPlug = true;
	handrailParams.endPlug = true;

	//костыль чтобы не переделывать drawHandrail_4
	if (turnFactor == -1) {
		if (handrailParams.side == "in") handrailParams.side = "out"
		else handrailParams.side = "in";
	}
	if (params.stairModel == "Прямая") {
		if (handrailParams.side == "in") handrailParams.side = "out"
		else handrailParams.side = "in";
	}


	if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 3) {
		marshPar.botTurn = "пол";
		marshPar.lastMarsh = true;
		if (!params.topPltRailing_4 && handrailParams.side == "in") marshPar.topTurn = "пол";
		if (!params.topPltRailing_5 && handrailParams.side == "out") marshPar.topTurn = "пол";
	}

	//нижний поворот
	if (marshPar.botTurn != "пол" && par.side == "out") {
		var handrailAng = 0;
		if (marshPar.botTurn == "забег") handrailAng = Math.atan(marshPar.h * 2 / params.M);
		handrailParams.length = params.M / Math.cos(handrailAng) - 50;

		var handrail = drawHandrail_4(handrailParams).mesh;
		handrail.rotation.z = handrailAng;
		handrail.position.x = - params.M + 80; // 80 - зазор чтобы не было пересечений
		handrail.position.y = handrailYOffset - 10;
		if (marshPar.botTurn == "забег") handrail.position.y -= marshPar.h * 2;
		handrail.position.z = 0;
		//устраняем пересечение с поручнем марша
		handrail.position.x -= meterHandrailPar.profY * Math.cos(Math.PI / 2 - marshPar.ang)
		handrail.position.y -= meterHandrailPar.profY * Math.sin(Math.PI / 2 - marshPar.ang)

		mesh.add(handrail);
		partsLen.push(handrailParams.length)

		handrailParams.dxfBasePoint.x += handrailParams.length + 50;
	}


	//поручень на марше
	if (marshPar.stairAmt > 0) {
		handrailParams.length = (marshPar.b * marshPar.stairAmt) / Math.cos(marshPar.ang);
		//handrailParams.dxfBasePoint = newPoint_xy(handrailParams.dxfBasePoint, -handrailParams.length, 0);

		var handrail = drawHandrail_4(handrailParams).mesh;
		handrail.rotation.z = marshPar.ang;
		handrail.position.y = handrailYOffset;
		handrail.position.z = 0;
		mesh.add(handrail);
		partsLen.push(handrailParams.length)

		handrailParams.dxfBasePoint.x += handrailParams.length + 50;
	}

	//верхний поворот
	if (marshPar.topTurn != "пол" && par.side == "out") {
		var handrailAng = 0;
		if (marshPar.topTurn == "забег") handrailAng = Math.atan(marshPar.h_topWnd * 2 / params.M);
		handrailParams.length = params.M / Math.cos(handrailAng);
		if (marshPar.lastMarsh) {
			handrailParams.length = params.platformLength_3 / Math.cos(handrailAng);
		}


		var handrail = drawHandrail_4(handrailParams).mesh;
		handrail.rotation.z = handrailAng;
		handrail.position.x = marshPar.b * marshPar.stairAmt + 20; // 20 - зазор чтобы не было пересечений
		handrail.position.y = handrailYOffset + marshPar.h * marshPar.stairAmt;
		handrail.position.z = 0;
		mesh.add(handrail);
		partsLen.push(handrailParams.length)

		handrailParams.dxfBasePoint.x += handrailParams.length + 50;
	}

	//сохраняем данные для расчета цены
	/*
		if (!partsAmt.sideHandrails) {
			partsAmt.sideHandrails = {
				types: [],
				sumLen: 0,
				}
		}
	
		for (var i = 0; i < partsLen.length; i++) {
			partsAmt.sideHandrails.types.push(partsLen[i]);
			partsAmt.sideHandrails.sumLen += partsLen[i] / 1000;
		}
	*/

	return mesh;

}

function drawPolylineRigel(par) {

	var dxfBasePoint = par.dxfBasePoint;
	var side = par.side;

	par.mesh = new THREE.Object3D();

	if (!par.points) return par;

	var points = par.points;
	var offset = par.offset;

	//зазор между торцами ригелей при соединении шарниром
	var endOffset = 0;
	if (!(par.connection == "без зазора" || par.connection == "без зазора премиум")) endOffset = 7;

	//задаем параметры ригелей
	rigelParams = {
		type: "rect",
		poleProfileY: 20,
		poleProfileZ: 20,
		length: 0, //пересчитывается в цикле
		poleAngle: 0, //пересчитывается в цикле
		material: params.materials.metal_railing,
		dxfArr: dxfPrimitivesArr,
		partName: "rigels",
		dxfBasePoint: par.dxfBasePoint,
		angDxf: true,
		sectText: par.sectText,
	};

	if (params.rigelMaterial === "Ф12 нерж.") {
		rigelParams.type = "round";
		rigelParams.poleProfileY = 12;
		rigelParams.poleProfileZ = 12;
		rigelParams.material = params.materials.inox;
	}
	if (params.rigelMaterial === "Ф16 нерж.") {
		rigelParams.type = "round";
		rigelParams.poleProfileY = 16;
		rigelParams.poleProfileZ = 16;
		rigelParams.material = params.materials.inox;
	}

	//выпуск ригеля за ось стойки по X
	var extraLenEnd = 50;
	var extraLenMid = 20;
	if (rigelParams.type == "round") extraLenMid = 70; //отступ чтобы шарнир не попал на стойку
	if (testingMode) extraLenEnd = 20;

	//сортируем массив points в порядке возрастания координаты x
	par.points.sort(function (a, b) {
		return a.x - b.x;
	});

	var lastPoint = copyPoint(par.points[0])
	for (var i = 0; i < par.points.length - 1; i++) {
		var p1 = copyPoint(lastPoint);
		var p2 = copyPoint(par.points[i + 1]);
		if (par.points[i + 1].ang) {
			var pt = itercection(p1, polar(p1, par.points[i + 1].ang, 100), p2, polar(p2, Math.PI / 2, 100));
			par.points[i + 1].x = pt.x;
			par.points[i + 1].y = pt.y;
			var p2 = copyPoint(par.points[i + 1]);
		}
		var ang = angle(p1, p2);

		if (typeof (ang) == "undefined") ang = 0;

		if (rigelParams.type != "round") {
			//продлеваем ригель в обе стороны
			if (i == 0) p1 = polar(p1, ang, -extraLenEnd);
			else p1 = polar(p1, ang, -extraLenMid);
			if (i < par.points.length - 2) p2 = polar(p2, ang, extraLenMid);
			else p2 = polar(p2, ang, extraLenEnd);

			//пересчитываем базовые точки для нечетных участков чтобы избежать пересечения
			if (i % 2 == 1) {
				var deltaY = par.points[i].y - p1.y + rigelParams.poleProfileY / Math.cos(ang);
				deltaY += rigelParams.poleProfileY / Math.cos(angle(par.points[i - 1], par.points[i]));
				p1.y += deltaY;
				p2.y += deltaY;
			}
			lastPoint = copyPoint(par.points[i + 1])
		}
		if (rigelParams.type == "round") {

			if (i == 0) p1 = polar(p1, ang, -extraLenEnd);
			//переносим конечную точку так, чтобы шарнир не попал на стойку
			if (i < par.points.length - 2) {
				p2 = polar(p2, ang, -extraLenMid);
				p2.y = par.points[i + 1].y; //если следующий участок горизонтальный, он должен таким и остаться
			}
			else p2 = polar(p2, ang, extraLenEnd);

			lastPoint = copyPoint(p2);

			var radJoint = 6 + 0.2;
			var angBot = angle(p1, p2);
			var pcJoint = polar(p2, angBot + Math.PI / 2, rigelParams.poleProfileY / 2);
			pcJoint = polar(pcJoint, angBot, -radJoint);

			if (par.points[i + 2]) {
				var p3 = copyPoint(par.points[i + 2]);
				var angTop = angle(p2, p3);
				var pt1 = polar(pcJoint, angTop, radJoint);
				var pt2 = itercection(p2, polar(p2, angTop + Math.PI / 2, 100), pcJoint, polar(pcJoint, angTop, 100));
				var lengthOff = distance(pt1, pt2);
				if (pt2.x > pt1.x) lengthOff *= -1;

				lastPoint = polar(p2, angTop, lengthOff);
			}
		}

		rigelParams.length = distance(p1, p2) - 10; //10 - размер шарнира
		if (rigelParams.type == "round") rigelParams.length = distance(p1, p2) - radJoint * 2;
		rigelParams.poleAngle = angle(p1, p2);
		rigelParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, p1.x, p1.y);

		//если на следующем марше поворотная стойка, удлиняем ригели до неё
		if (par.points[i + 1].dxToMarshNext) {
			p2 = newPoint_xy(par.points[i + 1], par.points[i + 1].dxToMarshNext, 0);
			rigelParams.length = (p2.x - p1.x) / Math.cos(rigelParams.poleAngle);
		}

		if (i == 0 || params.rigelMaterial == "20х20 черн.") rigelParams.rigelStartPlug = true;
		if (i == (points.length - 2) || params.rigelMaterial == "20х20 черн.") rigelParams.rigelEndPlug = true;

		var rigel = drawPole3D_4(rigelParams).mesh;
		rigel.position.x = p1.x;
		rigel.position.y = p1.y;
		par.mesh.add(rigel);

		//Саморезы(Для ригелей 20x20 рисуем внутри цикла тк ищем точки для каждого ригеля)
		if (params.rigelMaterial == "20х20 черн." && par.racks) {
			var rigelRacks = par.racks.filter(function (rack) {
				return rack.x >= p1.x && rack.x <= p2.x;
			});

			for (var j = 0; j < rigelRacks.length; j++) {
				var rack = rigelRacks[j];
				var screwPar = {
					id: "rigelScrew",
					description: "Крепление ригелей",
					group: "Ограждения"
				}
				var pos = itercection(p1, polar(p1, ang, 100), { x: rack.x, y: 0 }, newPoint_xy({ x: rack.x, y: 0 }, 0, 100));
				var screw = drawScrew(screwPar).mesh;
				screw.rotation.x = Math.PI / 2;
				screw.position.x = pos.x;
				screw.position.y = pos.y;
				screw.position.z = 10;
				par.mesh.add(screw);
			}

		}

		//шарниры ригелей
		if (rigelParams.type == "round") {
			//if (par.points[i + 2] || (par.topConnection && i == points.length - 2)) {
			if (par.points[i + 2]) {
				var jointParams = {
					rad: 6,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, pcJoint.x, pcJoint.y),
					type: "rigelJoint",
				}

				var sphere = drawHandrailJoint(jointParams);
				sphere.position.x = pcJoint.x;
				sphere.position.y = pcJoint.y;
				sphere.position.z = jointParams.rad;
				par.mesh.add(sphere);
			}
		}
	}

	if (par.racks && params.rigelMaterial != "20х20 черн.") {
		for (var i = 0; i < par.racks.length; i++) {
			var rack = par.racks[i];
			var rigelBasePoint = par.points[0];
			par.points.forEach(function (point, i) {
				if (point.x < rack.x) {
					rigelBasePoint = point;
				}
			});

			if (par.points.indexOf(rigelBasePoint) < par.points.length - 1) {
				var ang = angle(rigelBasePoint, par.points[par.points.indexOf(rigelBasePoint) + 1]);
			} else {
				var ang = angle(rigelBasePoint, par.points[par.points.indexOf(rigelBasePoint) - 1]);
			}

			var screwPar = {
				id: "rigelScrew",
				description: "Крепление ригелей",
				group: "Ограждения"
			}
			var pos = itercection(rigelBasePoint, polar(rigelBasePoint, ang, 100), { x: rack.x, y: 0 }, newPoint_xy({ x: rack.x, y: 0 }, 0, 100));

			//если на следующем марше поворотная стойка, сдвигаем позицию до неё
			if (rack.dxToMarshNext) pos = newPoint_x1(pos, rack.dxToMarshNext - 40 / 2, ang); // 40 - ширина стойки

			var screw = drawScrew(screwPar).mesh;
			screw.rotation.x = Math.PI / 2;
			screw.position.x = pos.x;
			screw.position.y = pos.y;// + rigelParams.poleProfileY / 2;
			screw.position.z = 10;
			par.mesh.add(screw);

			var rigelHolderId = "rigelHolder12";
			var holderSize = 12;
			if (params.rigelMaterial == "Ф16 нерж.") {
				rigelHolderId = "rigelHolder16";
				plugSize = 16;
			}

			var holderPar = {
				size: holderSize,
				id: rigelHolderId,
				description: "Кронштейн крепления ригелей",
				group: "Ограждения"
			}
			var holder = drawRigelHolder(holderPar);
			// holder.rotation.x = Math.PI / 2;
			holder.position.x = pos.x;
			holder.position.y = pos.y;// + rigelParams.poleProfileY / 2;
			holder.position.z = 5;
			if (!testingMode) par.mesh.add(holder);
		}
	}

	// par.meterHandrailPar = meterHandrailPar;

	return par;
} //end of drawPolylineRigel

function drawForgedBanister_5(par) {
	par.mesh = new THREE.Object3D();

	//балясина со вставкой мэша
	if (par.type == "bal_1" || par.type == "bal_2" || par.type == "bal_3" ||
		par.type == "bal_4" || par.type == "bal_10" || par.type == "bal_11") {

		var balPar = {
			insetAmt: 1,
			type: "forge",
			insetName: "bulb",
			len: par.len,
		}
		if (par.type == "bal_1" || par.type == "bal_2") balPar.insetName = "basket";
		if (par.type == "bal_10" || par.type == "bal_11") balPar.insetName = "screw_sm";
		if (par.type == "bal_2" || par.type == "bal_4" || par.type == "bal_11") balPar.insetAmt = 2;

		var bal = drawMeshBal(balPar);
		par.mesh.add(bal);
	}
	//балясина из svg
	else {
		var poleSize = 12;
		var botLen = par.len - 740;
		var svgPath = $("#forgeModal .modalItem[data-itemName=" + par.type + "]").find("path").eq(0).attr("d");
		if (par.type == "20х20") svgPath = $("#forgeModal .modalItem[data-itemName=20х20]").find("path").eq(0).attr("d");
		var shape = transformSVGPath(svgPath);

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

function drawGlass2(par) {

	par.dxfArr = dxfPrimitivesArr;
	if (!par.dxfBasePoint) {
		par.dxfBasePoint = { x: 0, y: 0, };
		par.dxfArr = [];
	}

	par.mesh = new THREE.Object3D();

	//необязательные параметры
	if (!par.angleBot) par.angleBot = par.angleTop;
	if (!par.botCutHeight) par.botCutHeight = 0;
	if (!par.topCutHeight) par.topCutHeight = 0;
	if (!par.holeCenters) par.holeCenters = [];


	var extrudeOptions = {
		amount: par.thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	//четырехугольник без срезов
	var p1 = { x: 0, y: 0 };
	var p2 = newPoint_xy(p1, 0, par.heightLeft);
	var p3 = newPoint_x1(p2, par.width, par.angleTop);
	var p4 = newPoint_x1(p1, par.width, par.angleBot);


	//срез снизу
	var botY = p1.y;
	if (par.botCutHeight != 0) {
		var p11 = newPoint_y(p1, par.botCutHeight, par.angleBot);
		var p12 = newPoint_xy(p1, 0, par.botCutHeight);
		botY = p12.y;
	}

	//срез сверху
	var topY = p3.y;
	if (par.topCutHeight != 0) {
		var p31 = newPoint_y(p1, -par.topCutHeight, par.angleTop);
		var p32 = newPoint_xy(p3, 0, -par.topCutHeight);
		topY = p32.y;
	}

	if (par.topConnectionBal) {
		var p31 = polar(p3, par.angleTop, par.extraLength);
		var pt = newPoint_xy(p1, 0, 267);
		var p32 = itercection(pt, polar(pt, par.angleTop, 100), p31, polar(p31, Math.PI / 2, 100));
		var p41 = itercection(pt, polar(pt, par.angleTop, 100), p4, polar(p4, Math.PI / 2, 100));
		topY = p32.y;
	}

	var shape = new THREE.Shape();

	//начинаем с 4 точки
	if (par.botCutHeight == 0) {
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	}
	if (par.botCutHeight != 0) {
		addLine(shape, par.dxfArr, p4, p11, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p11, p12, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p12, p2, par.dxfBasePoint);
	}

	//начинаем с 2 точки
	if (par.topConnectionBal) {
		addLine(shape, par.dxfArr, p2, p31, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p31, p32, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p32, p41, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p41, p4, par.dxfBasePoint);
	}
	else {
		if (par.topCutHeight == 0) {
			addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
		}
		if (par.topCutHeight != 0) {
			addLine(shape, par.dxfArr, p2, p31, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p31, p32, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p32, p4, par.dxfBasePoint);
		}
	}


	//длина стекла справа (для расчета длины слева следующего стекла)
	par.heightRight = p3.y - p4.y;

	//базовые точки для поручней
	par.p1 = copyPoint(p2);
	par.p2 = copyPoint(p3);

	//отверстия стекла
	for (var i = 0; i < par.holeCenters.length; ++i) {
		addRoundHole(shape, dxfPrimitivesArr, par.holeCenters[i], par.holeCenters[i].rad, par.dxfBasePoint);

		if (!par.holeCenters[i].hasHolder) {
			var rutelPar = {
				size: 10
			};
			var rutel = drawGlassRutel(rutelPar);
			rutel.rotation.x = Math.PI / 2;
			if (par.key == 'in') rutel.rotation.x *= -1;
			rutel.rotation.x *= turnFactor;

			rutel.position.x = par.holeCenters[i].x;
			rutel.position.y = par.holeCenters[i].y;
			rutel.position.z = 125 / 2 - 2;
			if (par.key == 'in') rutel.position.z = -125 / 2 + 2;
			if (par.key == 'in' && turnFactor == 1) rutel.position.z += par.thk;
			if (par.key == 'out' && turnFactor == -1) rutel.position.z -= par.thk;
			rutel.position.z *= turnFactor;

			if (!testingMode) par.mesh.add(rutel);
		}

	}

	if (!shape.drawing) shape.drawing = {};
	shape.drawing.group = 'glass';
	shape.drawing.keyPoints = { topP1: p2, topP2: p3, botP1: p4, botP2: p1 };
	if (p11) {
		shape.drawing.keyPoints.botP2 = p11;
		shape.drawing.keyPoints.botP3 = p12;
	}
	shapesList.push(shape);

	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var glass = new THREE.Mesh(geometry, params.materials.glass);

	par.mesh.add(glass);

	//сохраняем данные для спецификации
	var glassHeight2 = topY - botY;
	var partName = "glasses";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				sumArea: 0,
				name: "Стекло",
				metalPaint: false,
				timberPaint: false,
				division: "stock_2",
				workUnitName: "amt",
				group: "Ограждения",
			}
		}
		var name = Math.round(par.width) + "x" + Math.round(glassHeight2);
		var area = Math.round(par.width * glassHeight2 / 10000) / 100;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumArea"] += area;
	}
	par.mesh.specId = partName + name;

	return par;
} //end of drawGlass2

//----------------------

function drawPlate(par) {

	//Необязательные параметры
	if (!par.dxfArr) par.dxfArr = dxfPrimitivesArr;
	if (!par.dxfBasePoint) {
		par.dxfBasePoint = { x: 0, y: 0 },
			par.dxfArr = [];
	}
	if (!par.material) par.material = params.materials.timber;
	if (!par.layer) par.layer = "parts";


	var mesh = new THREE.Object3D();

	var shape = new THREE.Shape();
	var p1 = { x: 0, y: 0 }
	var p2 = newPoint_xy(p1, 0, par.width);
	var p3 = newPoint_xy(p1, par.len, par.width);
	var p4 = newPoint_xy(p1, par.len, 0);
	var dxfBasePoint = copyPoint(par.dxfBasePoint)

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	//отверстия
	if (par.holes != undefined) {
		for (var i = 0; i < par.holes.length; i++) {
			addRoundHole(shape, par.dxfArr, par.holes[i].center, par.holes[i].rad, par.dxfBasePoint)
		}
	}

	var extrudeOptions = {
		amount: par.thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Mesh(geom, par.material);
	par.shape = shape;

	//сохраняем данные для спецификации
	if (params.stairType == "нет" && (par.partName == "tread" || par.partName == "riser" || par.partName == "dpc"))
		return par;

	var thk = par.thk;
	if (par.thkFull) thk = par.thkFull;
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: "Панель",
				area: 0,
				paintedArea: 0,
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "amt",
				group: "Каркас",
			}
			if (par.partName == "tread") {
				var treadPar = getTreadParams(); //функция в файле calcSpecGeneral.js
				specObj[par.partName].name = "Ступень";
				specObj[par.partName].metalPaint = treadPar.metalPaint;
				specObj[par.partName].timberPaint = treadPar.timberPaint;
				specObj[par.partName].division = treadPar.division;
				specObj[par.partName].group = "treads";
				if (treadPar.material != "timber") specObj[par.partName].name = "Ступень " + params.stairType;
			}
			if (par.partName == "riser") {
				specObj[par.partName].name = "Подступенок ";
				specObj[par.partName].group = "risers";
			}

			if (par.partName == "dpc") {
				specObj[par.partName].name = "Доска дпк " + params.stairType;
				specObj[par.partName].timberPaint = false;
				specObj[par.partName].group = "Ступени";
			}
			if (par.partName == "mdfPlate") specObj[par.partName].name = "Панель МДФ ";
			if (par.partName == "drawerFrontPlate") specObj[par.partName].name = "Панель ящика перед/зад ";
			if (par.partName == "drawerSidePlate") specObj[par.partName].name = "Панель ящика бок. ";
			if (par.partName == "door") specObj[par.partName].name = "Фасад ";
			if (par.partName == "framedDoor") specObj[par.partName].name = "Фасад рамочный ";

			if (par.partName == "drawerBotPlate") specObj[par.partName].name = "Дно ящика МДФ ";
			if (par.partName == "shelf") specObj[par.partName].name = "Полка ";
			if (par.partName == "rail") specObj[par.partName].name = "Штанга ";


			if (par.partName == "drawerFrontPlate" ||
				par.partName == "drawerSidePlate" ||
				par.partName == "drawerBotPlate" ||
				par.partName == "door" ||
				par.partName == "shelf" ||
				par.partName == "rail"
			) {
				specObj[par.partName].group = "Наполнение";
			}

		}
		var area = par.len * par.width / 1000000;
		var paintedArea = area * 2 + (par.len + par.width) * 2 * thk / 1000000;

		var name = Math.round(par.len) + "x" + Math.round(par.width) + "x" + Math.round(thk);
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
		specObj[par.partName]["area"] += area;
		specObj[par.partName]["paintedArea"] += paintedArea;
	}

	par.mesh.specId = par.partName + name;

	//сохраняем данные для ведомости деталей
	var addToPoleList = false;
	if (par.partName == "timberPlate") addToPoleList = true;

	if (typeof poleList != 'undefined' && addToPoleList && par.partName) {
		var poleType = name;
		//формируем массив, если такого еще не было
		if (!poleList[poleType]) poleList[poleType] = [];
		var polePar = {
			len1: Math.round(par.length),
			len2: Math.round(par.length),
			len3: Math.round(par.length),
			angStart: par.angStart,
			angEnd: par.angEnd,
			cutOffsetStart: 0,
			cutOffsetEnd: 0,
			poleProfileY: par.poleProfileY,
			poleProfileZ: par.poleProfileY,
		}

		//комментарий назначение детали
		if (par.sectText) polePar.text = par.sectText;


		polePar.description = [];
		polePar.description.push(polePar.text);
		polePar.amt = 1;

		poleList[poleType].push(polePar);

	}

	return par;

}