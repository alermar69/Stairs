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
			var midStringer = drawStringer(stringerParams).mesh;
			midStringer.position.x = -stringerParams.treadFrontOverHang;
			midStringer.position.z = midstringerBetweenLen * i - params.M / 2 + params.stringerThickness * i;
			midStringers.push(midStringer);
			mesh.add(midStringer);
		}
	}

	if (midStringers.length > 0) {
		for (var i = 0; i < midStringers.length; i++) {	
			var midAngle = drawCarcasAngles(stringerParams.carcasHoles, sideIn);
			midAngle.position.x = midStringers[i].position.x;
			midAngle.position.z = midStringers[i].position.z;
			if(sideIn == "left") midAngle.position.z += params.stringerThickness;
			angles.add(midAngle);
		}
	}
	
	for (var i = 0; i < midStringers.length; i++) {
		if(hasTreadFrames()){
			par.dxfBasePoint.x += 2000;
			var framePar = {
				holes: stringerParams.carcasHoles,
				dxfBasePoint: par.dxfBasePoint,
			}
			var frames = drawFrames(framePar);
			frames.position.x = -stringerParams.treadFrontOverHang;
			frames.position.z = midStringers[i].position.z - framePar.length / 2;
			angles.add(frames)
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
			bolt.position.z = midAngle.position.z//params.stringerThickness/2;
			mesh.add(bolt);
		}

	}

	
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
	stringerParams.dxfBasePoint.x += 2000;
	var columnsIn = drawColumnSide(stringerParams, "in");
	mesh.add(columnsIn);	
		
	//длинные болты

		if(drawLongBolts){
			var boltPar = {
				diam: 10,
				len: 40,
				headType: "шестигр.",
			}			
			var longBoltPos = stringerParams.elmIns[stringerParams.key].longBolts;
			for(var i=0; i<longBoltPos.length; i++){
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2 * turnFactor;
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
		for (i = 0; i < stringerParams.elmIns["out"].bridges.length; i++) {
			//перемычки с двойными уголками

			bridgePar.hasDoubleTreadAngles = false;
			bridgePar.rotated = false;
			if (i == stringerParams.elmIns["out"].bridges.length - 1 && marshParams.topTurn == "площадка" && !stringerParams.isWndP && stringerParams.topEndLength > 600) {
				bridgePar.hasDoubleTreadAngles = true;
				bridgePar.rotated = true;
				}
				
			if (i == 0 && params.stairModel == "П-образная с площадкой" && marshId == 3) {
				bridgePar.hasDoubleTreadAngles = true;
				}
			
			//нет болтов на внутренней стороне
			bridgePar.noBoltsOnBridge = false;
			if (stringerParams.elmIns["out"].bridges[i].noBoltsOnBridge) bridgePar.noBoltsOnBridge = true;
			if (params.M > 1100 && params.calcType == "vhod") bridgePar.noBoltsOnBridge1 = true;

			var bridge = drawBridge_2(bridgePar).mesh;
			bridge.rotation.y = -Math.PI / 2;
			bridge.position.x = stringerParams.elmIns["out"].bridges[i].x + 60 + params.stringerThickness * 2 - stringerParams.treadFrontOverHang;
			bridge.position.y = stringerParams.elmIns["out"].bridges[i].y;
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
				bridge.position.x = stringerParams.elmIns["out"].bridges[i].x + 60 + params.stringerThickness * 2 - stringerParams.treadFrontOverHang;
				bridge.position.y = stringerParams.elmIns["out"].bridges[i].y;
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
		if (params.calcType == 'vhod') {
			if (params.platformTop == 'увеличенная') {
				var deltaZ = params.M - (params.platformWidth_3 - (params.M - calcTreadLen())) - params.stringerThickness;
				rearStringer.position.z -= deltaZ - params.stringerThickness - 6; //FIX	
				if (turnFactor == -1) { //TURNFACTOR CHANGED
					rearStringer.position.z -= (params.platformWidth_3 - params.M);
				}
				if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
					if (turnFactor == 1) {
						rearStringer.position.x = - (params.platformWidth_3 - params.M);
						rearStringer.position.z = 0;
					}
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
		
		if(par.carcasHoles[i].isBraceHole){
			console.log(par.carcasHoles[i].x, par.keyPoints[key].topPoint)
			if(params.topPltConsolePos == "сзади"){
				bracePar.width = par.keyPoints[key].topPoint.x - par.carcasHoles[i].x + 53;
			}
			bracePar = drawBrace(bracePar);
			var brace = bracePar.mesh;
			if (params.topPltConsolePos != "сзади"){
				if(getSide()[key] == "left") brace.rotation.y = Math.PI;
				brace.position.x = par.carcasHoles[i].x;
				brace.position.y = par.carcasHoles[i].y;
				brace.position.z = par.anglesPosZ;
				if(getSide()[key] == "right") brace.position.z -= bracePar.width;
				if(getSide()[key] == "left") brace.position.z += bracePar.width;
				}
				
			if (params.topPltConsolePos == "сзади"){
				brace.rotation.y = -Math.PI / 2;
				brace.position.x = par.carcasHoles[i].x + bracePar.width - 53 - 5;
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

			if (center.noZenk && center.rad < 7) {
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

		if (params.model == "ко2" && par.railingHoles) {
			for(var j=1; j<4; j++){
				for(var k=0; k < par.railingHoles.length; k++){
					if(holePos[j]){
						var holesDist = Math.abs(holePos[j].x - par.railingHoles[k].x)
						if(holesDist < 85) {
							var mooveX = 85 - holesDist;
							if(holePos[j].x < par.railingHoles[k].x) mooveX *= -1;
							holePos[j] = newPoint_x1(holePos[j], mooveX, marshParams.ang)
						}
					}
				}
			}
		}

		var stringerPar = calcStringerPar({ marshId: par.marshId });
			
		// добавляем отверстия в конечный массив
		for (var k=1; k<=3; k++) {		// k - номер колонны в марше
			if (columnPos[par.marshId][par.key]) {
				if (columnPos[par.marshId][par.key][k] && holePos[k]) {
					var colHole1 = holePos[k];
					var colHole2 = newPoint_xy(colHole1, 0, -holeDist);
					colHole2.isColumnHole = colHole1.isColumnHole = true;
					if(params.model == "ко") colHole2.backZenk = colHole1.backZenk = true;
					colHole2.hasAngle = colHole1.hasAngle = false;
					if ((k == 1 || k == 2) && par.botEnd == "platformG" && stringerPar.stringerDivision)
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


//---------------------------------------------------------------------------------------------

function drawTreads() {
    var treadsGroup = new THREE.Object3D();
    var risersGroup = new THREE.Object3D();
    var dxfBasePoint = { x: 0, y: 0, };
    var turnEnd = [];
    var allUnitsPos = {}; //массив позиций всех участков для использования в построении каркаса

    //выбор функции отрисовки забежных ступеней
    var drawWndTreads = drawWndTreadsMetal;
    if (params.calcType == "mono") drawWndTreads = drawWndTreadsMono;
    if (params.calcType == "timber") drawWndTreads = drawWndTreadsTimber;
    if (params.calcType == "timber_stock") drawWndTreads = drawWndTreadsTimber_stock;
    if (params.calcType == "geometry") {
        if (params.staircaseType == "mono") drawWndTreads = drawWndTreadsMono;
        if (params.staircaseType == "timber") drawWndTreads = drawWndTreadsTimber;
    }


    //нижний марш
    var marshId = 1;

    var treadParams1 = {
        marshId: marshId,
        dxfBasePoint: dxfBasePoint,
    };

    var marshObj = drawMarshTreads2(treadParams1)
    var marshTreads = marshObj.treads;
    var marshRisers = marshObj.risers;
    marshTreads.marshId = 1;
    treadsGroup.add(marshTreads);
    risersGroup.add(marshRisers);


    var unitPos = calcMarshEndPoint(marshTreads.position, marshTreads.rotation.y, marshId);
    var lastMarshEnd = copyPoint(unitPos);
    lastMarshEnd.rot = 0;
    var startTreadsParams = marshObj.startTreadsParams;

    dxfBasePoint.x += 2000;

    if (params.stairModel != "Прямая") {

        //задаем функцию отрисовки площадки
        var pltDrawFunction = drawPlatform2;
        if (params.calcType == "timber") {
            pltDrawFunction = drawTimberPlt_G;
            if (params.stairModel == "П-образная с площадкой") pltDrawFunction = drawTimberPlt_P;
        }

        //первый поворот

        //сохраняем позицию и поворот
        allUnitsPos.turn1 = copyPoint(unitPos);
        allUnitsPos.turn1.rot = 0;
        var turnParams = calcTurnParams(1);

        var marshPar1 = getMarshParams(marshId);
        var turnType1 = marshPar1.topTurn;

        if (turnType1 == "площадка") {
            var pltPar = {
                len: params.M + calcTurnParams(marshId).topMarshOffsetX - (params.M - calcTreadLen()) / 2,
                width: calcTreadLen(),
                dxfBasePoint: dxfBasePoint,
                botMarshId: 1,
            }
            //если лотки или рифленая сталь ступень отрисовываем в функции отрисовки рамок drawFrames
            if (params.stairType == "лотки" || params.stairType == "рифленая сталь") {
                if (params.calcType != 'geometry') pltPar.isNotTread = true;
                //добавляем зазор в конце площадки
                if (params.calcType == 'geometry') pltPar.len -= 5;
            }
            if (params.calcType == 'vhod' && params.stairModel == "Г-образная с площадкой" && params.middlePltLength !== params.M) {
                pltPar.len = params.middlePltLength + calcTurnParams(marshId).topMarshOffsetX - (params.M - calcTreadLen()) / 2;
            }
            if (params.stairModel == "П-образная с площадкой") {
                pltPar.width = params.M * 2 + params.marshDist - (params.M - calcTreadLen());
                pltPar.len = params.platformLength_1 + params.nose;
                if (params.model == "лт") pltPar.len -= (params.M - calcTreadLen()) / 2;
                pltPar.isP = true; //является промежуточной площадкой П-образной				
            }
            //коррекция ширины нижней площадки П-образной трехмаршевой с 0 ступеней в среднем марше
            if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0) {
                pltPar.plusMarshDist = true;
                pltPar.width += params.marshDist;
                if (params.model == "ко") pltPar.width -= 5;
            }
            if (params.stairModel == 'Прямая с промежуточной площадкой' || params.stairModel == 'Прямая горка') {
                //FIX IT заменить 19 на рассчитанную величину.
                pltPar.len = params.middlePltLength + calcTurnParams(marshId).topStepDelta;
                if (params.stairModel == 'Прямая горка') pltPar.len = params.middlePltLength - 5;
                // pltPar.isP = true;
            }
            //для деревянных из pltPar используются только параметры botMarshId и dxfBasePoint, размеры площадки считаются внутри
            pltPar = pltDrawFunction(pltPar);

            var platform = pltPar.treads;
            var platformRiser = pltPar.risers;
            platform.marshId = 1;
            if (params.stairModel == "П-образная с площадкой") platform.marshId = 2;
            platform.isTurn = true;
            platform.position.x = platformRiser.position.x = unitPos.x;
            platform.position.y = platformRiser.position.y = unitPos.y;
            platform.position.z = platformRiser.position.z = unitPos.z;

            treadsGroup.add(platform);
            risersGroup.add(platformRiser);
            unitPos = calcTurnEndPoint(platform.position, platform.rotation.y, marshId, pltPar.plusMarshDist);          
            if (params.calcType == 'vhod' && params.middlePltWidth !== params.M && params.stairModel !== 'Прямая горка') {
                var pltPar = {
                    len: (params.middlePltWidth - params.M) - 3,// + calcTurnParams(marshId).topMarshOffsetX - (params.M - calcTreadLen()) / 2,
                    width: calcTreadLen(),
                    dxfBasePoint: dxfBasePoint,
                    botMarshId: 1,
                }
                if (params.stairModel == 'Прямая с промежуточной площадкой') {
                    pltPar.width = (params.middlePltWidth - params.M) - 3;
                    pltPar.len = params.middlePltLength + calcTurnParams(marshId).topStepDelta;
                }

                pltPar = pltDrawFunction(pltPar);

                var platform = pltPar.treads;
                platform.marshId = 1;
                platform.isTurn = true;
                var platformRiser = pltPar.risers;
                var turnZ = pltPar.width - calcTurnParams(marshId).topMarshOffsetX - params.stringerThickness + 3;
                var unitPosTmp = unitPos;
                if (params.stairModel == 'Г-образная с площадкой') {
                    turnZ = pltPar.len - calcTurnParams(marshId).topMarshOffsetX - params.stringerThickness + 3;
                }
                if (params.stairModel == 'Прямая с промежуточной площадкой') {
                    unitPosTmp = allUnitsPos.turn1;
                    turnZ = pltPar.width + params.stringerThickness + 3 + 3;
                }
                turnZ *= turnFactor;
                platform.position.x = platformRiser.position.x = unitPosTmp.x;
                platform.position.y = platformRiser.position.y = unitPosTmp.y;
                platform.rotation.y = platformRiser.rotation.y = unitPosTmp.rot;
                platform.position.z = platformRiser.position.z = unitPosTmp.z - turnZ;
                treadsGroup.add(platform);
                risersGroup.add(platformRiser);
            }
            dxfBasePoint.x += pltPar.width + 1000;
        }
        if (turnType1 == "забег") {

            var wndPar = {
                turnId: 1,
                botMarshId: 1,
                dxfBasePoint: dxfBasePoint,
            };
            if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0) {
                wndPar.plusMarshDist = true; //необходимо учесть зазор между маршами в ширине последней ступени
            }
            if (params.stairModel == "П-образная с забегом") {
                wndPar.plusMarshDist = true;
            }

            //отрисовываем блок забежных ступеней
            var wndObj = drawWndTreads(wndPar);
            var wndTreads = wndObj.treads; //функция в файле drawTreads.js;
            var wndRisers = wndObj.risers;
            if (wndObj.params) wndPar.params = wndObj.params;
            wndTreads.position.x = wndRisers.position.x = unitPos.x;
            wndTreads.position.y = wndRisers.position.y = unitPos.y;
            wndTreads.position.z = wndRisers.position.z = unitPos.z;
            wndTreads.marshId = 1;
            wndTreads.isTurn = true;
            treadsGroup.add(wndTreads);
            risersGroup.add(wndRisers);

            var unitPos = calcTurnEndPoint(wndTreads.position, wndTreads.rotation.y, marshId, wndPar.plusMarshDist, wndPar.turnId);
            dxfBasePoint.x += 6000;
        }

        turnEnd[1] = copyPoint(unitPos);

        //второй марш

        if (params.stairModel == "П-образная трехмаршевая") {
            var marsh2BasePoint = copyPoint(unitPos);
            marshId = 2;

            //сохраняем позицию и поворот
            allUnitsPos.marsh2 = copyPoint(unitPos);
            allUnitsPos.marsh2.rot = unitPos.rot;

            var treadParams2 = {
                marshId: marshId,
                dxfBasePoint: dxfBasePoint,
            };

            var marshObj = drawMarshTreads2(treadParams2)
            var marshTreads = marshObj.treads;
            var marshRisers = marshObj.risers;
            marshTreads.rotation.y = marshRisers.rotation.y = unitPos.rot;
            marshTreads.position.x = marshRisers.position.x = unitPos.x;
            marshTreads.position.y = marshRisers.position.y = unitPos.y;
            marshTreads.position.z = marshRisers.position.z = unitPos.z;
            marshTreads.marshId = 2;
            treadsGroup.add(marshTreads);
            risersGroup.add(marshRisers);

            var unitPos = calcMarshEndPoint(marshTreads.position, marshTreads.rotation.y, marshId);
            dxfBasePoint.x += 2000;
        }

        //второй поворот
        if (params.stairModel == "П-образная трехмаршевая" || params.stairModel == "П-образная с забегом") {
            var marshPar2 = getMarshParams(marshId);
            var turnType2 = marshPar2.topTurn;

            //сохраняем позицию и поворот
            allUnitsPos.turn2 = copyPoint(unitPos);
            allUnitsPos.turn2.rot = unitPos.rot;

            if (turnType2 == "площадка") {
                var pltPar = {
                    len: params.M + calcTurnParams(marshId).topMarshOffsetX - (params.M - calcTreadLen()) / 2,
                    width: calcTreadLen(),
                    dxfBasePoint: dxfBasePoint,
                    botMarshId: 2,
                };
                //если лотки или рифленая сталь ступень отрисовываем в функции отрисовки рамок drawFrames
                if (params.stairType == "лотки" || params.stairType == "рифленая сталь") {
                    if (params.calcType != 'geometry') pltPar.isNotTread = true;
                    //добавляем зазор в конце площадки
                    if (params.calcType == 'geometry') pltPar.len -= 5;
                }
                //для деревянных из pltPar используются только параметры botMarshId и dxfBasePoint, размеры площадки считаются внутри
                pltPar = pltDrawFunction(pltPar);

                var platform = pltPar.treads;
                platform.marshId = 2;
                platform.isTurn = true;
                var platformRiser = pltPar.risers;
                platform.rotation.y = platformRiser.rotation.y = unitPos.rot;
                platform.position.x = platformRiser.position.x = unitPos.x;
                platform.position.y = platformRiser.position.y = unitPos.y;
                platform.position.z = platformRiser.position.z = unitPos.z;
                treadsGroup.add(platform);
                risersGroup.add(platformRiser);

                var unitPos = calcTurnEndPoint(platform.position, platform.rotation.y, marshId);

                turnEnd[2] = copyPoint(unitPos);
                dxfBasePoint.x += pltPar.width + 1000;
            }
            if (turnType2 == "забег" || params.stairModel == "П-образная с забегом") {
                var wndPar2 = {
                    turnId: 2,
                    botMarshId: marshId,
                    dxfBasePoint: dxfBasePoint,
                };

                //отрисовываем блок забежных ступеней

                var wndObj = drawWndTreads(wndPar2);
                var wndTreads = wndObj.treads; //функция в файле drawTreads.js;
                var wndRisers = wndObj.risers;
                if (wndObj.params) wndPar2.params = wndObj.params;
                wndTreads.rotation.y = wndRisers.rotation.y = unitPos.rot;
                wndTreads.position.x = wndRisers.position.x = unitPos.x;
                wndTreads.position.y = wndRisers.position.y = unitPos.y;
                if (params.stairModel == "П-образная с забегом") {
                    wndTreads.position.y += params.h3;
                    wndRisers.position.y += params.h3;
                }
                wndTreads.position.z = wndRisers.position.z = unitPos.z;
                wndTreads.marshId = 2;
                wndTreads.isTurn = true;
                treadsGroup.add(wndTreads);
                risersGroup.add(wndRisers);
                var unitPos = calcTurnEndPoint(wndTreads.position, wndTreads.rotation.y, marshId, false, wndPar2.turnId);
                dxfBasePoint.x += 6000;
            }
        }
        turnEnd[2] = copyPoint(unitPos);
        if (params.stairModel == "П-образная с забегом") turnEnd[1] = copyPoint(unitPos);

        //верхний марш

        marshId = 3;

        //сохраняем позицию и поворот
        allUnitsPos.marsh3 = copyPoint(unitPos);
        allUnitsPos.marsh3.rot = unitPos.rot;

        var treadParams3 = {
            marshId: marshId,
            dxfBasePoint: dxfBasePoint,
        };

        var marshObj = drawMarshTreads2(treadParams3);
        var marshTreads = marshObj.treads;
        var marshRisers = marshObj.risers;
        marshTreads.rotation.y = marshRisers.rotation.y = unitPos.rot;
        marshTreads.position.x = marshRisers.position.x = unitPos.x;
        marshTreads.position.y = marshRisers.position.y = unitPos.y;
        marshTreads.position.z = marshRisers.position.z = unitPos.z;
        marshTreads.marshId = 3;
        treadsGroup.add(marshTreads);
        risersGroup.add(marshRisers);

        lastMarshEnd = calcMarshEndPoint(marshTreads.position, marshTreads.rotation.y, marshId);
        dxfBasePoint.x += 2000;
    }

    //верхняя площадка
    if (params.platformTop == "площадка" || params.platformTop == 'увеличенная') {
        dxfBasePoint = newPoint_xy(dxfBasePoint, 1000, 0);

        if (params.model == "ко" && params.stairAmt3 == 0 && (turnType1 == "забег" || turnType2 == "забег")) {
            if (params.stairModel == "Г-образная с забегом")
                lastMarshEnd.z += params.lastWinderTreadWidth - 55; //55 - номинальная ширина ступени
            else
                lastMarshEnd.x -= (params.lastWinderTreadWidth - 55); //55 - номинальная ширина ступени
        }

        //сохраняем позицию и поворот
        allUnitsPos.topPlt = copyPoint(lastMarshEnd);
        allUnitsPos.topPlt.rot = lastMarshEnd.rot;

        var pltPar = {
            len: params.platformLength_3,
            width: calcTreadLen(),
            dxfBasePoint: dxfBasePoint,
            botMarshId: 3,
        };

        //учитываем наличие задней тетивы верхней площадки + 5мм зазор
        if ((params.model == "лт" || params.calcType == "vhod") && params.platformRearStringer == "есть") {
            pltPar.len -= 8 + 5;
        }

        //если лотки или рифленая сталь ступень отрисовываем в функции отрисовки рамок drawFrames
        if (params.stairType == "лотки" || params.stairType == "рифленая сталь") {
            if (params.calcType != 'geometry') pltPar.isNotTread = true;
            //добавляем зазор в конце площадки
            //if (params.calcType == 'geometry') pltPar.len -= 5;
        }
        if (params.stairModel == "Прямая") pltPar.botMarshId = 1;

        if (params.platformTop == 'увеличенная') {
            pltPar.width = params.platformWidth_3 - (params.M - calcTreadLen());
        }

        pltPar = drawPlatform2(pltPar);
        var platform = pltPar.treads;
        var risers = pltPar.risers;
        platform.rotation.y = risers.rotation.y = lastMarshEnd.rot;
        platform.position.x = risers.position.x = lastMarshEnd.x;
        platform.position.y = risers.position.y = lastMarshEnd.y;
        platform.position.z = risers.position.z = lastMarshEnd.z;
        if (params.platformTop == 'увеличенная') {
            //if ((params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') && turnFactor == -1 && (params.stairType == 'дпк' || params.stairType == "лиственница тер.")) {
            if ((params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') && turnFactor == -1 && (params.stairType == 'дпк')) {
                platform.position.z -= (pltPar.width - params.M) / 2 + (params.M - calcTreadLen()) / 2;
                if (turnFactor == -1) {
                    platform.position.z = lastMarshEnd.z
                }
            }
            //if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') && (params.stairModel == 'дпк' || params.stairType == "лиственница тер.")) {//Считаем положения
            if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') && (params.stairModel == 'дпк')) {//Считаем положения
                platform.position.x += (pltPar.width - params.M) / 2 + (params.M - calcTreadLen()) / 2;//-pltPar.len / 2 * turnFactor - params.stringerThickness * 2;
                if (turnFactor == -1) {
                    platform.position.x -= (pltPar.width - params.M) / 2 + (params.M - calcTreadLen()) / 2;//-pltPar.len / 2 * turnFactor - params.stringerThickness * 2;
                    platform.position.z += 2;
                }
            }
        }
        platform.marshId = 3;
        treadsGroup.add(platform);
        risersGroup.add(risers);

    }

    //рассчитываем точку конца верхнего марша для привязки к перекрытию
    var topStepDelta = calcTurnParams(marshId).topStepDelta;
    if (params.platformTop == "площадка" || params.platformTop == 'увеличенная') topStepDelta = params.platformLength_3;

    lastMarshEnd.x += topStepDelta * Math.cos(lastMarshEnd.rot);
    lastMarshEnd.z += topStepDelta * Math.sin(-lastMarshEnd.rot);


    //формируем возвращаемый объект
    var par = {
        treads: treadsGroup,
        risers: risersGroup,
        turnEnd: turnEnd,
        lastMarshEnd: lastMarshEnd,
        wndPar: wndPar,
        wndPar2: wndPar2,
        unitsPos: allUnitsPos,
        startTreadsParams: startTreadsParams,
    }

    return par;


} //end of drawTreads


function calcPltPartsParams(par) {
    var minPartWidth = 30;
    if (params.stairType == 'дпк') {
        par.maxWidth = params.dpcWidth;
        par.partLen = par.maxWidth;
        par.partsGap = params.dpcDst;
        par.partsAmt = Math.floor(par.len / par.maxWidth);
        var lastPartLen = par.len - (par.partsAmt * par.partsGap) - (par.maxWidth * par.partsAmt);
        if (lastPartLen >= minPartWidth + par.partsGap) par.lastPartLen = lastPartLen, par.partsAmt++;
        if (lastPartLen < -par.partsGap) par.lastPartLen = par.partLen + (lastPartLen + par.partsGap);
    }
    if (params.stairType != 'дпк' || params.stairType == "лиственница тер.") {
        //поперек волокон площадка делается из кусков не шире 600мм
        par.maxWidth = 600;
        par.partsGap = 2; //зазор между частями площадки
        par.partsAmt = Math.ceil(par.len / par.maxWidth);
        par.partLen = par.len / par.partsAmt - par.partsGap * (par.partsAmt - 1) / par.partsAmt;
    }
} //end of calcPltPartsParams


/* функция отрисовки секции с коваными балясинами */
function drawRailingSectionForge2(par) {
    var section = new THREE.Object3D();
    var forgedParts = new THREE.Object3D();
    var handrails = new THREE.Object3D();
    var marshPar = getMarshParams(par.marshId);
    var sectionLen = 0; //параметр для спецификации

    //параметры для рабочего чертежа
    section.drawing = {
        name: "Секция марш " + par.marshId,
        group: "forgedSections",
    }
    if (par.key == "in") section.drawing.name += " внутр."
    if (par.key == "out") section.drawing.name += " нар."

    //задаем константы
    var rackLength = 1000;
    var balLen = 850;
    //укорачиваем балясины чтобы не было пересечения нижней перемычки с кронштейном крелпения стойки
    if (params.model == "ко") {
        if (params.rackBottom == "боковое" && marshPar.h / marshPar.b > 220 / 200) balLen = 800;
    }
    var botPoleOffset = rackLength - balLen;

    par.rackLength = rackLength;
    var rackProfile = 40;
    var maxHolderDist = 1200;
    if (params.handrail == "ПВХ") maxHolderDist = 800;
    var handrailSlotDepth = 15;

    //рассчитываем необходимые параметры и добавляем в объект par
    setRailingParams(par) //функция в файле calcRailingParams.js

    if (params.calcType == 'lt-ko' || params.calcType === 'vhod') {
        //выделяем из массива racks первые и последние стойки поворотов и марша
        //адаптация к единой функции drawMarshRailing
        if (par.stringerParams) par.racks = par.stringerParams[par.marshId].elmIns[par.key].racks;
        //объединяем массивы первого и третьего марша
        if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId !== 'topPlt') {
            par.racks = [];
            par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
            //пересчитываем координаты стоек второго марша с учетом позиции марша
            for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
                var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
                point.x += par.stringerParams[3].treadsObj.unitsPos.marsh3.x;
                point.y += par.stringerParams[3].treadsObj.unitsPos.marsh3.y;
                par.racks.push(point)
            }
        }
        if (params.stairModel == 'Прямая горка') {
            par.racks = [];
            par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
            //пересчитываем координаты стоек второго марша с учетом позиции марша
            for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
                var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
                point.x = par.stringerParams[3].treadsObj.unitsPos.marsh3.x - point.x;
                point.y = par.stringerParams[3].treadsObj.unitsPos.marsh3.y + point.y;
                par.racks.push(point)
            }
        }

        //рассчитываем необходимые параметры и добавляем в объект par
        var parRacks = setRacksParams(par).parRacks;
    }

    if (params.calcType == 'mono') {
        calculateRacks(par);
        var parRacks = par.parRacks;

        if (parRacks.botFirst) parRacks.botLast = parRacks.marshFirst;
        if (parRacks.topLast) parRacks.topFirst = parRacks.marshLast;
    }


    if (par.racks.length == 0) return section;

    //позиция секции
    var railingPositionZ = 0;
    if (turnFactor == -1) railingPositionZ = -40;

    var handrailPoints = [];

    var polePar = {
        type: "pole",
        poleProfileY: 20,
        poleProfileZ: 40,
        dxfBasePoint: par.dxfBasePoint,
        len: 1000,
        poleAngle: Math.PI / 6,
        vertEnds: true,
        material: params.materials.metal,
        dxfArr: dxfPrimitivesArr,
        marshId: par.marshId,
        side: par.railingSide,
        sectText: par.text,
    }

    var rackPar = {
        type: "rack",
        poleProfileY: rackProfile,
        poleProfileZ: rackProfile,
        dxfBasePoint: par.dxfBasePoint,
        len: rackLength,
        angTop: Math.PI / 6,
        railingSide: par.railingSide,
        material: params.materials.metal,
        dxfArr: dxfPrimitivesArr,
        marshId: par.marshId,
        side: par.railingSide,
        sectText: par.text,
    }

    var shortRackPar = {
        type: "rack",
        poleProfileY: 40,
        poleProfileZ: 40,
        dxfBasePoint: par.dxfBasePoint,
        len: 150,
        angTop: Math.PI / 6,
        railingSide: par.railingSide,
        material: params.materials.metal,
        dxfArr: dxfPrimitivesArr,
        marshId: par.marshId,
        side: par.railingSide,
        sectText: par.text,
    }
    if (params.calcType == 'mono') { //FIX AFTER TURN RACK
        rackPar.stepH = shortRackPar.stepH = par.h;
        rackPar.nextStepH = shortRackPar.nextStepH = par.nextH;
    }

    var pos = {
        x: 0,
        y: 0
    }
    var topPoint0, topPoint1, topPoint2, topPoint3, topPoint4, topPoint5;

    //нижний поворот
    if (parRacks.botFirst) {
        //первая стойка
        rackPar.angTop = parRacks.angBot;
        pos.x = parRacks.botFirst.x;
        pos.y = parRacks.botFirst.y - 90;
        rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        if (params.calcType == 'mono') {
            rackPar.monoType = parRacks.botFirst.type;
        }
        var rack = drawForgedFramePart2(rackPar).mesh;
        rack.position.x = pos.x;
        rack.position.y = pos.y;
        rack.position.z = railingPositionZ;
        section.add(rack)

        //базовая точка для поручня
        topPoint1 = newPoint_xy(pos, -20, rackPar.len2 + 20 / Math.cos(parRacks.angBot))

        //последняя стойка
        pos.x = parRacks.botLast.x;
        pos.y = parRacks.botLast.y - 90;
        rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        if (params.calcType == 'mono') {
            rackPar.monoType = parRacks.botLast.type;
        }
        var rack = drawForgedFramePart2(rackPar).mesh;
        rack.position.x = pos.x;
        rack.position.y = pos.y;
        rack.position.z = railingPositionZ;
        section.add(rack)

        //базовая точка для поручня
        topPoint2 = newPoint_xy(pos, 20, rackPar.len + 20 / Math.cos(parRacks.angBot))


        //верхняя перемычка
        polePar.len = parRacks.botLen + rackPar.topCutLen;
        polePar.poleAngle = parRacks.angBot;
        pos.x = parRacks.botFirst.x - rackPar.poleProfileY / 2;
        pos.y = parRacks.botFirst.y - 90 + rackPar.len2;
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)
        var endCutLen = polePar.endCutLen;

        //нижняя перемычка
        polePar.len = parRacks.botLen - rackPar.topCutLen;
        pos.x = parRacks.botFirst.x + rackPar.poleProfileY / 2;
        pos.y = parRacks.botFirst.y - 90 + botPoleOffset;
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //балясины
        var balParams = {
            p1: parRacks.botFirst,
            p2: parRacks.botLast,
            ang: parRacks.angBot,
            balLen: balLen,
            dxfBasePoint: par.dxfBasePoint,
            material: params.materials.metal,
        }
        var balArr = drawForgedBanistersArr(balParams);
        balArr.position.z = railingPositionZ;
        forgedParts.add(balArr);


        //кронштейны поручня
        if (params.handrail != "нет" && params.handrailFixType == "кронштейны") {
            var p1 = polar(topPoint1, parRacks.angBot, 100);
            var p2 = polar(topPoint2, parRacks.angBot, -100);
            var holderAmt = Math.ceil(distance(p1, p2) / maxHolderDist) + 1;
            var holdeDist = distance(p1, p2) / (holderAmt - 1);
            for (var i = 0; i < holderAmt; i++) {
                var pos = polar(p1, parRacks.angBot, holdeDist * i);
                var holderParams = {
                    angTop: parRacks.angBot,
                    dxfBasePoint: newPoint_xy(par.dxfBasePoint, pos.x, pos.y),
                    isForge: true,
                }
                var holder = drawHandrailHolder(holderParams).mesh;
                holder.position.x = pos.x;
                holder.position.y = pos.y;
                holder.position.z = 20 + railingPositionZ;
                section.add(holder)
            }
        }
    }

    //верхний участок
    if (parRacks.topLast) {

        rackPar.angTop = parRacks.angTop;
        //первая стойка
        pos.x = parRacks.topFirst.x;
        pos.y = parRacks.topFirst.y - 90;
        rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        if (params.calcType == 'mono') {
            rackPar.monoType = parRacks.topFirst.type;
        }
        var rack = drawForgedFramePart2(rackPar).mesh;
        rack.position.x = pos.x;
        rack.position.y = pos.y;
        rack.position.z = railingPositionZ;
        section.add(rack)

        //базовая точка для поручня
        topPoint3 = newPoint_xy(pos, -20, rackPar.len2 + 20 / Math.cos(parRacks.angTop))


        //последняя стойка
        pos.x = parRacks.topLast.x;
        pos.y = parRacks.topLast.y - 90;
        rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        if (params.calcType == 'mono') {
            rackPar.monoType = parRacks.topLast.type;
        }
        var rack = drawForgedFramePart2(rackPar).mesh;
        rack.position.x = pos.x;
        rack.position.y = pos.y;
        rack.position.z = railingPositionZ;
        section.add(rack)

        //базовая точка для поручня
        topPoint4 = newPoint_xy(pos, 20, rackPar.len + 20 / Math.cos(parRacks.angTop))

        //верхняя перемычка
        polePar.len = parRacks.topLen + rackPar.topCutLen;
        polePar.poleAngle = parRacks.angTop;
        pos.x = parRacks.topFirst.x - rackPar.poleProfileY / 2;
        pos.y = parRacks.topFirst.y - 90 + rackPar.len2;
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //нижняя перемычка
        polePar.len = parRacks.topLen - rackPar.topCutLen;
        pos.x = parRacks.topFirst.x + rackPar.poleProfileY / 2;
        pos.y = parRacks.topFirst.y - 90 + botPoleOffset
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //балясины
        var balParams = {
            p1: parRacks.topFirst,
            p2: parRacks.topLast,
            ang: parRacks.angTop,
            balLen: balLen,
            dxfBasePoint: par.dxfBasePoint,
            material: params.materials.metal,
        }
        var balArr = drawForgedBanistersArr(balParams);
        balArr.position.z = railingPositionZ;
        forgedParts.add(balArr);


        //кронштейны поручня
        if (params.handrail != "нет" && params.handrailFixType == "кронштейны") {
            var p1 = polar(topPoint3, parRacks.angTop, 100);
            var p2 = polar(topPoint4, parRacks.angTop, -100);
            var holderAmt = Math.ceil(distance(p1, p2) / maxHolderDist) + 1;
            var holdeDist = distance(p1, p2) / (holderAmt - 1);
            for (var i = 0; i < holderAmt; i++) {
                var pos = polar(p1, parRacks.angTop, holdeDist * i);
                var holderParams = {
                    angTop: parRacks.angTop,
                    dxfBasePoint: newPoint_xy(par.dxfBasePoint, pos.x, pos.y),
                    isForge: true,
                }
                var holder = drawHandrailHolder(holderParams).mesh;
                holder.position.x = pos.x;
                holder.position.y = pos.y;
                holder.position.z = 20 + railingPositionZ;
                section.add(holder)
            }
        }

    }


    //марш

    if (parRacks.marshFirst) {
        //расчет угла марша

        //если стойки сверху, тогда сдвигаем вверх нижнюю перемычку, чтобы не было пересечения перемычки со ступенями
        var dyRackTop = 60 * Math.tan(parRacks.angMarsh);
        if (params.rackBottom == "сверху с крышкой") dyRackTop = 40 * Math.tan(parRacks.angMarsh);

        //если нет нижнего участка
        if (!topPoint2) {
            topPoint2 = {
                x: parRacks.marshFirst.x + 20,
                y: parRacks.marshFirst.y - 90 + rackPar.len + 20 / Math.cos(parRacks.angMarsh),
            }
        }


        //если нет верхнего участка
        if (!topPoint3) {

            var angMarsh = parRacks.angMarsh; //IMPORTANT
            //учитываем что первая стойка имеет горизонтальный верхний срез
            if (par.key == 'out') {
                var newP = newPoint_xy(parRacks.marshFirst, 40, 0);
                //var angMarsh = calcAngleX1(newP, parRacks.marshLast);
            }

            topPoint3 = {
                //x: parRacks.marshLast.x + 20 + (parRacks.marshLast.noDraw ? 5 : 0), //TURN RACK
                //y: parRacks.marshLast.y - 90 + rackPar.len + 20 / Math.cos(angMarsh),
                x: parRacks.marshLast.x + 20 - 0.01, //TURN RACK
                y: parRacks.marshLast.y - 90 + rackPar.len + 20 / Math.cos(angMarsh),
            }
            if (marshPar.lastMarsh) topPoint3.y += calcLastRackDeltaY();
            if (par.key == 'out') {//костыль чтобы компенсировать отличие parRacks.angMarsh от реального угла
                if (params.model == "ко") {
                    topPoint3.y += 0.3;
                    if (params.topAnglePosition == "вертикальная рамка") topPoint3.y += 0.7;
                }
                if (params.model == "лт") {
                    topPoint3.y += 0.1;
                }
            }
        }

        if (params.model !== "ко") parRacks.angMarsh = angle(topPoint2, topPoint3)
        //parRacks.angMarsh = marshPar.ang;
        parRacks.marshLen = distance(topPoint2, topPoint3)

        rackPar.angTop = parRacks.angMarsh;

        //первая стойка
        if (!parRacks.botFirst) {
            pos.x = parRacks.marshFirst.x;
            pos.y = parRacks.marshFirst.y - 90;
            rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
            if (params.calcType == 'mono') {
                rackPar.monoType = parRacks.marshFirst.type;
                rackPar.isFirst = true;
            }
            if (!parRacks.marshFirst.turnRack) { //TURN RACK
                var rack = drawForgedFramePart2(rackPar).mesh;
                rack.position.x = pos.x;
                rack.position.y = pos.y;
                rack.position.z = railingPositionZ;
                section.add(rack)
            }
            if (parRacks.marshFirst.turnRack) { //TURN RACK
                rackPar.holes = [{
                    offset: 20,
                    angelText: 'сзади',
                    diam: 6,
                    holder: 'baniAngle'
                }];
                var holeHeightDifference = par.prevH - par.h + rackPar.holes[0].offset;
                rackPar.stepH = par.prevH;
                rackPar.nextStepH = par.h;
                var deltaY = 0;
                //Задаем отверстия
                if (par.botTurn == "забег") {
                    rackPar.place = 'забег';
                    rackPar.holes.push({
                        offset: par.h + holeHeightDifference,
                        angelText: 'сзади',
                        diam: 6,
                        holder: 'baniAngle'
                    });
                    rackPar.holes.push({
                        offset: par.h * 2 + holeHeightDifference,
                        angelText: 'сзади',
                        diam: 6,
                        holder: 'baniAngle'
                    });
                    rackPar.holes.push({
                        offset: par.h * 3 + holeHeightDifference,
                        angelText: 'слева',
                        diam: 6,
                        holder: 'baniAngle'
                    });
                    rackPar.holes.push({
                        offset: par.h * 4 + holeHeightDifference,
                        angelText: 'слева',
                        diam: 6,
                        holder: 'baniAngle'
                    });
                }
                if (par.botTurn == "площадка") {
                    rackPar.place = 'площадка';
                    rackPar.holes.push({
                        offset: par.h + holeHeightDifference,
                        angelText: 'сзади',
                        diam: 6,
                        holder: 'baniAngle'
                    });
                    rackPar.holes.push({
                        offset: par.prevH + par.h + holeHeightDifference,
                        angelText: 'слева',
                        diam: 6,
                        holder: 'baniAngle'
                    });
                }
                rackPar.monoType = 'turn';
                var rack = drawForgedFramePart2(rackPar).mesh;
                rack.position.x = pos.x;
                rack.position.z = railingPositionZ;
                rack.position.y = pos.y + deltaY;
                section.add(rack);

            }
        }
        var rackLength2 = rackPar.len2;

        rackPar.isFirst = false;

        //последняя стойка

        if (!parRacks.topFirst) {
			/*
			var rackPar = {
				type: "rack",
				poleProfileY: rackProfile,
				poleProfileZ: rackProfile,
				dxfBasePoint: par.dxfBasePoint,
				len: rackLength,
				angTop: Math.PI / 6,
				railingSide: par.railingSide,
				material: params.materials.metal,
				dxfArr: dxfPrimitivesArr,
				marshId: par.marshId,
				side: par.railingSide,
				sectText: par.text,
				};
				*/
            pos.x = parRacks.marshLast.x;
            pos.y = parRacks.marshLast.y - 90;
            if (marshPar.lastMarsh) rackPar.len += calcLastRackDeltaY();
            rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
            if (params.calcType == 'mono') {
                rackPar.monoType = parRacks.marshLast.type;
            }
            if (!parRacks.marshLast.noDraw) { //TURN RACK
                var rack = drawForgedFramePart2(rackPar).mesh;
                rack.position.x = pos.x;
                rack.position.y = pos.y;
                rack.position.z = railingPositionZ;
                section.add(rack);
            }
        }

        //средние короткие стойки
        shortRackPar.angTop = parRacks.angMarsh;
        for (var i = 0; i < par.racks.length; i++) {
            if (par.racks[i].x > parRacks.marshFirst.x && par.racks[i].x < parRacks.marshLast.x) {
                pos.x = par.racks[i].x;
                pos.y = par.racks[i].y - 90;
                shortRackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);

                //рассчитываем длину
                var deltaY = (pos.x - parRacks.marshFirst.x) * Math.tan(parRacks.angMarsh) - (pos.y + 90 - parRacks.marshFirst.y);
                shortRackPar.len = 150 + deltaY + dyRackTop;
                if (params.calcType == 'mono') {
                    shortRackPar.monoType = par.racks[i].type;
                }
                var rack = drawForgedFramePart2(shortRackPar).mesh;
                rack.position.x = pos.x;
                rack.position.y = pos.y;
                rack.position.z = railingPositionZ;
                section.add(rack)
            }

        }

        //верхняя перемычка
        polePar.len = parRacks.marshLen;
        if (parRacks.marshLast.noDraw) polePar.len -= rackPar.topCutLen; //TURN RACK
        if (!parRacks.botFirst) polePar.len += rackPar.topCutLen;

        polePar.poleAngle = parRacks.angMarsh;
        pos.x = parRacks.marshFirst.x - rackPar.poleProfileY / 2;
        pos.y = parRacks.marshFirst.y - 90 + rackLength2;
        if (parRacks.botFirst) {
            pos.x = parRacks.marshFirst.x + rackPar.poleProfileY / 2;
            pos.y = parRacks.marshFirst.y - 90 + rackLength + endCutLen - 20 / Math.cos(parRacks.angMarsh);
        }
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;

        section.add(pole)

        //нижняя перемычка
        polePar.len = parRacks.marshLen;
        polePar.poleAngle = parRacks.angMarsh;
        if (!parRacks.topFirst) polePar.len -= rackPar.topCutLen;
        pos.x = parRacks.marshFirst.x + rackPar.poleProfileY / 2;
        pos.y = parRacks.marshFirst.y - 90 + botPoleOffset + dyRackTop;
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //балясины
        var balParams = {
            p1: parRacks.marshFirst,
            p2: parRacks.marshLast,
            ang: parRacks.angMarsh,
            balLen: balLen - dyRackTop,
            dxfBasePoint: par.dxfBasePoint,
            material: params.materials.metal,
        }
        var balArr = drawForgedBanistersArr(balParams);
        balArr.position.z = railingPositionZ;
        forgedParts.add(balArr);


        //кронштейны поручня
        if (params.handrail != "нет" && params.handrailFixType == "кронштейны") {
            var p1 = polar(topPoint2, parRacks.angMarsh, 100);
            var p2 = polar(topPoint3, parRacks.angMarsh, -100);
            if (distance(topPoint2, topPoint3) < 250) {
                p1 = polar(topPoint2, parRacks.angMarsh, 10);
                p2 = polar(topPoint3, parRacks.angMarsh, -10);
            }
            var holderAmt = Math.ceil(distance(p1, p2) / maxHolderDist) + 1;
            var holdeDist = distance(p1, p2) / (holderAmt - 1);
            for (var i = 0; i < holderAmt; i++) {
                var pos = polar(p1, parRacks.angMarsh, holdeDist * i);
                var holderParams = {
                    angTop: parRacks.angMarsh,
                    dxfBasePoint: newPoint_xy(par.dxfBasePoint, pos.x, pos.y),
                    isForge: true,
                }
                var holder = drawHandrailHolder(holderParams).mesh;
                holder.position.x = pos.x;
                holder.position.y = pos.y;
                holder.position.z = 20 + railingPositionZ;
                section.add(holder)
            }
        }

    }

    //нижний марш прямой двухмаршевой
    if (parRacks.marsh1First) {
        rackPar.len = rackLength;
        //расчет угла марша
        if (!topPoint0) {
            topPoint0 = {
                x: parRacks.marsh1First.x + 20,
                y: parRacks.marsh1First.y - 90 + rackPar.len + 20 / Math.cos(parRacks.angMarsh1),
            }
        }

        parRacks.angMarsh1 = angle(topPoint0, topPoint1)
        parRacks.marshLen = distance(topPoint0, topPoint1)

        rackPar.angTop = parRacks.angMarsh1;

        //первая стойка
        pos.x = parRacks.marsh1First.x;
        pos.y = parRacks.marsh1First.y - 90;
        rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var rack = drawForgedFramePart2(rackPar).mesh;
        rack.position.x = pos.x;
        rack.position.y = pos.y;
        rack.position.z = railingPositionZ;
        section.add(rack)


        //средние короткие стойки
        shortRackPar.angTop = parRacks.angMarsh1;
        for (var i = 0; i < par.racks.length; i++) {
            if (par.racks[i].x > parRacks.marsh1First.x && par.racks[i].x < parRacks.botFirst.x) {
                pos.x = par.racks[i].x;
                pos.y = par.racks[i].y - 90;
                shortRackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);

                //рассчитываем длину
                var deltaY = (pos.x - parRacks.marsh1First.x) * Math.tan(parRacks.angMarsh1) - (pos.y + 90 - parRacks.marsh1First.y);
                shortRackPar.len = 150 + deltaY;
                var rack = drawForgedFramePart2(shortRackPar).mesh;
                rack.position.x = pos.x;
                rack.position.y = pos.y;
                rack.position.z = railingPositionZ;
                section.add(rack)
            }

        }

        //верхняя перемычка
        polePar.len = parRacks.marshLen;
        polePar.len += rackPar.topCutLen;

        polePar.poleAngle = parRacks.angMarsh1;
        pos.x = parRacks.marsh1First.x - rackPar.poleProfileY / 2;
        pos.y = parRacks.marsh1First.y - 90 + rackPar.len2;
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //нижняя перемычка
        polePar.len = parRacks.marshLen;
        //if(!parRacks.topFirst) polePar.len -= rackPar.topCutLen;
        pos.x = parRacks.marsh1First.x + rackPar.poleProfileY / 2;
        pos.y = parRacks.marsh1First.y - 90 + botPoleOffset
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //балясины
        var balParams = {
            p1: parRacks.marsh1First,
            p2: parRacks.botFirst,
            ang: parRacks.angMarsh1,
            balLen: balLen,
            dxfBasePoint: par.dxfBasePoint,
            material: params.materials.metal,
        }
        var balArr = drawForgedBanistersArr(balParams);
        balArr.position.z = railingPositionZ;
        forgedParts.add(balArr);


        //кронштейны поручня
        if (params.handrail != "нет" && params.handrailFixType == "кронштейны") {
            var p1 = polar(topPoint0, parRacks.angMarsh1, 100);
            var p2 = polar(topPoint1, parRacks.angMarsh1, -100);
            var holderAmt = Math.ceil(distance(p1, p2) / maxHolderDist) + 1;
            var holdeDist = distance(p1, p2) / (holderAmt - 1);
            for (var i = 0; i < holderAmt; i++) {
                var pos = polar(p1, parRacks.angMarsh1, holdeDist * i);
                var holderParams = {
                    angTop: parRacks.angMarsh1,
                    dxfBasePoint: newPoint_xy(par.dxfBasePoint, pos.x, pos.y),
                    isForge: true,
                }
                var holder = drawHandrailHolder(holderParams).mesh;
                holder.position.x = pos.x;
                holder.position.y = pos.y;
                holder.position.z = 20 + railingPositionZ;
                section.add(holder)
            }
        }

    }

    //второй марш лестницы горкой
    if (parRacks.marsh2First) {

        topPoint5 = {
            x: parRacks.marsh2Last.x + 20,
            y: parRacks.marsh2Last.y - 90 + rackPar.len2 + 20 / Math.cos(parRacks.angMarsh2) + 0.5,
        }

        parRacks.angMarsh2 = angle(topPoint4, topPoint5)
        parRacks.marshLen = distance(topPoint4, topPoint5)

        rackPar.angTop = parRacks.angMarsh2;
        //последняя стойка
        pos.x = parRacks.marsh2Last.x;
        pos.y = parRacks.marsh2Last.y - 90;
        rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var rack = drawForgedFramePart2(rackPar).mesh;
        rack.position.x = pos.x;
        rack.position.y = pos.y;
        rack.position.z = railingPositionZ;
        section.add(rack)


        //средние короткие стойки
        shortRackPar.angTop = parRacks.angMarsh2;
        for (var i = 0; i < par.racks.length; i++) {
            if (par.racks[i].x > parRacks.marsh2First.x && par.racks[i].x < parRacks.marsh2Last.x) {
                pos.x = par.racks[i].x;
                pos.y = par.racks[i].y - 90;
                shortRackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);

                //рассчитываем длину
                var deltaY = (pos.x - parRacks.marsh2First.x) * Math.tan(parRacks.angMarsh2) - (pos.y + 90 - parRacks.marsh2First.y);
                shortRackPar.len = 150 + deltaY - rackProfile * Math.tan(parRacks.angMarsh2);
                var rack = drawForgedFramePart2(shortRackPar).mesh;
                rack.position.x = pos.x;
                rack.position.y = pos.y;
                rack.position.z = railingPositionZ;
                section.add(rack)
            }

        }

        //верхняя перемычка
        polePar.len = parRacks.marshLen;
        //polePar.len += rackPar.topCutLen;

        polePar.poleAngle = parRacks.angMarsh2;
        pos.x = parRacks.marsh2First.x + rackPar.poleProfileY / 2;
        pos.y = parRacks.marsh2First.y - 90 + rackPar.len2;

        pos = newPoint_xy(topPoint4, 0, -20 / Math.cos(parRacks.angMarsh2))

        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //нижняя перемычка
        polePar.len = parRacks.marshLen;
        polePar.len -= rackPar.topCutLen;
        pos.x = parRacks.marsh2First.x + rackPar.poleProfileY / 2;
        pos.y = parRacks.marsh2First.y - 90 + botPoleOffset
        polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
        var pole = drawForgedFramePart2(polePar).mesh;
        pole.position.x = pos.x;
        pole.position.y = pos.y;
        pole.position.z = railingPositionZ;
        section.add(pole)

        //балясины
        var balParams = {
            p1: parRacks.marsh2First,
            p2: parRacks.marsh2Last,
            ang: parRacks.angMarsh2,
            balLen: balLen,
            dxfBasePoint: par.dxfBasePoint,
            material: params.materials.metal,
        }
        var balArr = drawForgedBanistersArr(balParams);
        balArr.position.z = railingPositionZ;
        forgedParts.add(balArr);


        //кронштейны поручня
        if (params.handrail != "нет" && params.handrailFixType == "кронштейны") {
            var p1 = polar(topPoint4, parRacks.angMarsh2, 100);
            var p2 = polar(topPoint5, parRacks.angMarsh2, -100);
            var holderAmt = Math.ceil(distance(p1, p2) / maxHolderDist) + 1;
            var holdeDist = distance(p1, p2) / (holderAmt - 1);
            for (var i = 0; i < holderAmt; i++) {
                var pos = polar(p1, parRacks.angMarsh2, holdeDist * i);
                var holderParams = {
                    angTop: parRacks.angMarsh2,
                    dxfBasePoint: newPoint_xy(par.dxfBasePoint, pos.x, pos.y),
                    isForge: true,
                }
                var holder = drawHandrailHolder(holderParams).mesh;
                holder.position.x = pos.x;
                holder.position.y = pos.y;
                holder.position.z = 20 + railingPositionZ;
                section.add(holder)
            }
        }

    }




    /* Поручни */

    if (params.handrail != "нет") {

        var meterHandrailPar = {
            prof: params.handrailProf,
            sideSlots: params.handrailSlots,
            handrailType: params.handrail,
            metalPaint: params.metalPaint_perila,
            timberPaint: params.timberPaint_perila,
        }
        meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

        //первая точка первого марша на прямой двухмаршевой
        if (topPoint0) {
            var extraLen = 80 + rackPar.topCutLen / 2;
            topPoint0 = polar(topPoint0, parRacks.angMarsh1, -extraLen);
            handrailPoints.push(topPoint0);
        }

        if (topPoint1) {
            //продлеваем поручень до конца площадки
            var extraLen = 80 - 20;
            if (params.model == "ко") extraLen += params.sideOverHang;
            if (par.botConnection) {
                if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
                if (meterHandrailPar.handrailModel == "round")
                    extraLen += rackProfile / 2;
                if (meterHandrailPar.handrailModel != "round")
                    extraLen += rackProfile / 2 - meterHandrailPar.profZ / 2;

            }
            //if (!topPoint0) topPoint1 = polar(topPoint1, parRacks.angBot, -extraLen);
            //if (!topPoint0 && !par.botConnection) topPoint1 = polar(topPoint1, parRacks.angBot, -extraLen);
            if (!topPoint0 && !par.botConnection) topPoint1 = polar(topPoint1, parRacks.angBot, -extraLen);
            //if(par.botConnection) topPoint1 = polar(topPoint1, parRacks.angBot, -extraLen);
            handrailPoints.push(topPoint1);
        }

        //корректируем вторую точку если нет нижнего поворота
        if (!topPoint1) {
            var extraLen = 80 + rackPar.topCutLen / 2;
            if (par.isPlatform && par.botConnection) {
                extraLen = 80 + rackPar.topCutLen / 2;
                if (params.model == "ко") extraLen += params.sideOverHang;
                if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
                if (meterHandrailPar.handrailModel == "round")
                    extraLen -= rackProfile / 2;
                if (meterHandrailPar.handrailModel != "round")
                    extraLen += rackProfile / 2 - meterHandrailPar.profZ / 2;
            }
            if (par.marshId == 'topPlt' && par.key == 'rear') {
                extraLen = 70 + params.stringerThickness + 40 / 2 - meterHandrailPar.profZ / 2;//40 - ширина стойки, 70 - расстояние от центра стойки до края тетивы
                if (params.model == "ко") extraLen += params.sideOverHang;
            }
            topPoint2 = polar(topPoint2, parRacks.angMarsh, -extraLen);
        }
        if (topPoint2) handrailPoints.push(topPoint2);

        //корректируем третью точку если нет верхнего поворота
        if (!topPoint4) {
            var extraLen = 80 - rackPar.topCutLen / 2;
            if (par.topConnection) {
                if (params.model == "ко") extraLen += params.sideOverHang;
                extraLen = 80 - rackPar.topCutLen / 2;
                if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
                if (meterHandrailPar.handrailModel == "round")
                    extraLen += rackProfile / 2;
                if (meterHandrailPar.handrailModel != "round")
                    extraLen += rackProfile / 2 - meterHandrailPar.profZ / 2;
                if (par.isRearPRailing) extraLen += meterHandrailPar.profZ;

            }
            if (parRacks.marshLast.noDraw) { //TURN RACK
                extraLen = -rackPar.topCutLen;
            }
            if (par.marshId == 'topPlt' && par.key == 'rear') {
                extraLen = 70 + params.stringerThickness + 40 / 2 - meterHandrailPar.profZ / 2;//40 - ширина стойки, 70 - расстояние от центра стойки до края тетивы
                if (params.model == "ко") extraLen += params.sideOverHang;
            }
            topPoint3 = polar(topPoint3, parRacks.angMarsh, extraLen);
        }
        if (topPoint3) handrailPoints.push(topPoint3);

        if (topPoint4) {
            //продлеваем поручень до конца площадки
            var extraLen = 80 - rackProfile / 2;
            if (params.model == "ко") extraLen += params.sideOverHang;
            if (par.topConnection) {
                if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
                if (meterHandrailPar.handrailModel == "round")
                    extraLen += rackProfile / 2;
                if (meterHandrailPar.handrailModel != "round")
                    extraLen += rackProfile / 2 + meterHandrailPar.profZ / 2;
            }

            if (!topPoint5) topPoint4 = polar(topPoint4, parRacks.angTop, extraLen);

            handrailPoints.push(topPoint4);
        }

        //последняя точка второго марша на прямой горке
        if (topPoint5) {
            var extraLen = 80 // + rackPar.topCutLen / 2;
            topPoint5 = polar(topPoint5, parRacks.angMarsh2, extraLen);
            handrailPoints.push(topPoint5);
        }

        handrailParams = {
            points: handrailPoints,
            side: par.railingSide,
            offset: handrailSlotDepth,
            extraLengthStart: 0,
            extraLengthEnd: 0,
            connection: params.handrailConnectionType,
            dxfBasePoint: par.dxfBasePoint,
            fixType: "нет",
            topConnection: par.topConnection,
            sectText: par.text,
            marshId: par.marshId,
            key: par.key,
        }

        if (params.handrailFixType == "кронштейны") handrailParams.offset = -42;

        //удлиннение поручня последнего марша
        if (params.stairModel == "прямая" || par.marshId == 3) {
            handrailParams.extraLengthEnd += params.topHandrailExtraLength;
        }

        handrailParams = drawPolylineHandrail(handrailParams);

        var handrail = handrailParams.mesh;
        //var posZ = -handrailParams.wallOffset + 20;
        //if (par.railingSide == "left") posZ = handrailParams.wallOffset + 20;
        //handrail.position.z = posZ + railingPositionZ;

        var posZ = -handrailParams.wallOffset + rackProfile / 2 * turnFactor;
        if (par.railingSide == "right") posZ = handrailParams.wallOffset + rackProfile / 2 * turnFactor;
        handrail.position.z = posZ;
        if (par.marshId == 'topPlt' && par.key == 'rear') handrail.position.x -= rackProfile / 2;


        handrails.add(handrail);
    }

    var result = {
        mesh: section,
        forgedParts: forgedParts,
        handrails: handrails,
    }

    //сохраняем данные для спецификации

    var sectLen = distance(handrailPoints[0], handrailPoints[handrailPoints.length - 1]);
    var partName = "forgedSection";
    if (typeof specObj != 'undefined') {
        if (!specObj[partName]) {
            specObj[partName] = {
                types: {},
                amt: 0,
                sumArea: 0,
                name: "Кованая секция ",
                metalPaint: true,
                timberPaint: false,
                division: "metal",
                workUnitName: "amt",
                group: "Ограждения",
            }
        }
        var name = "L=" + Math.round(sectLen) + " прав.";
        if (par.railingSide == "left") name = "L=" + Math.round(sectLen) + " лев.";
        if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
        if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
        specObj[partName]["amt"] += 1;
    }

    if (typeof railingParams != 'undefined') {
        if (!railingParams.sections) {
            railingParams.sections = {
                types: [],
                sumLen: 0,
            }
        }
        for (var i = 1; i < handrailPoints.length; i++) {
            var sectLen = distance(handrailPoints[i - 1], handrailPoints[i]);
            railingParams.sections.types.push(sectLen);
            railingParams.sections.sumLen += sectLen / 1000;
        }
    }

    return result;

} // end of drawRailingSectionForge2
