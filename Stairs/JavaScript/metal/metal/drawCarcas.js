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
        if (hasTreadFrames()) {
            par.dxfBasePoint.x += stringerParams.lenX;
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
	stringerParams.dxfBasePoint.x += 2200;
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

			if (center.noZenk && center.rad < 7) {
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

			//удлиннение внутренней тетивы/косоура под забегом
			var longStringerTop = false;
			//удлиннение тетивы
			if (par.key == "out") {
				if (marshParams.prevMarshId == 1 && params.inStringerElongationTurn1 == "да") longStringerTop = true;
				if (marshParams.prevMarshId == 2 && params.inStringerElongationTurn2 == "да") longStringerTop = true;

				if (longStringerTop) holePos[2].x -= 50;
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



function drawFixPart (par) {
	/*
	diam
	len
	headType
	*/

	par.mesh = new THREE.Object3D();
	var fixPart = new THREE.Object3D();
	if (turnFactor == -1) fixPart.rotation.x = Math.PI;

	par.layer = 'fixPats';

	par.material = new THREE.MeshLambertMaterial({ color: "#0000FF" });
	par.material = params.materials.bolt;
	par.dopParams = {};


	if (par.fixPart == 'химия') {
		var stud = drawStudF(par);
		fixPart.add(stud);

		//гайка
		var nut = drawNutF(par);
		nut.position.y = par.len / 2 - par.nutAmount - 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShimF(par);
		shim.position.y = nut.position.y - par.shimAmount;
		fixPart.add(shim);

		//анкер
		par.dopParams = {
			name: "Химический анкер, баллон",
			lenCylinder: 75,
			diamCylinder: par.diam + 4,
			material: new THREE.MeshLambertMaterial({ color: "#0000FF" })
		}
		var anchor = drawStudF(par);
		anchor.position.y = - par.len / 2 + par.dopParams.lenCylinder / 2 + 1;
		fixPart.add(anchor);


		fixPart.position.y = (-par.len / 2 + par.nutAmount + par.shimAmount + 5) * turnFactor + (params.stringerThickness) * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'глухари') {		
		//глухарь
		var screw = drawScrewF(par);
		fixPart.add(screw);

		//шайба
		var shim = drawShimF(par);
		shim.position.y = par.len / 2 - par.shimAmount;
		fixPart.add(shim);

		fixPart.position.y = (-par.len / 2 + par.shimAmount) * turnFactor + params.stringerThickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'шпилька насквозь') {
		//шпилька
		var stud = drawStudF(par);
		fixPart.add(stud);

		//гайка
		var nut = drawNutF(par);
		nut.position.y = par.len / 2 - par.nutAmount - 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShimF(par);
		shim.position.y = nut.position.y - par.shimAmount;
		fixPart.add(shim);

		//гайка
		nut = drawNutF(par);
		nut.position.y = - par.len / 2 + 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShimF(par);
		shim.position.y = nut.position.y + par.nutAmount;
		fixPart.add(shim);

		fixPart.position.y = (-par.len / 2 + par.nutAmount + par.shimAmount + 5) * turnFactor + (params.stringerThickness) * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'саморезы') {
		//глухарь
		par.dopParams.name = "Саморез";
		var screw = drawScrewF(par);
		fixPart.add(screw);

		if (par.fixType !== 'дерево') {
			//дюбель	
			par.dopParams = {
				name: "Дюбель",
				lenCylinder: 50,
				diamCylinder: 10,
				material: new THREE.MeshLambertMaterial({ color: "#0000FF" })
			}
			var dowel = drawStudF(par);
			dowel.position.y = - par.len / 2 + par.dopParams.lenCylinder / 2 + 1;
			fixPart.add(dowel);
		}

		fixPart.position.y = (-par.len / 2) * turnFactor + (params.stringerThickness) * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'шпилька-шуруп') {
		//шпилька
		par.dopParams.name = "Шпилька-шуруп"
		var stud = drawStudF(par);
		fixPart.add(stud);

		//гайка
		var nut = drawNutF(par);
		nut.position.y = par.len / 2 - par.nutAmount - 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShimF(par);
		shim.position.y = nut.position.y - par.shimAmount;
		fixPart.add(shim);		

		fixPart.position.y = (-par.len / 2 + par.nutAmount + par.shimAmount + 5) * turnFactor + (params.stringerThickness) * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	//проставка
	if (par.isSpacer) {
		for (var i = 1; i <= par.spacerAmt; i++) {
			par.material = params.materials.bolt;
			var spacer = drawSpacerF(par);
			spacer.position.y = -fixPart.position.y * turnFactor - par.spacerAmount * i;
			if (turnFactor == -1) spacer.position.y -= params.stringerThickness;
			fixPart.add(spacer);

			par.mesh.add(fixPart);
		}		
	}

	//проставка
	function drawSpacerF(par) {
		var extrudeOptions = {
			amount: par.fixSpacerLength,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var shape = new THREE.Shape();

		var center = { x: 0, y: 0 };
		var dxfBasePoint = { x: 0, y: 0 };
		var dxfArr = [];

		var p1 = newPoint_xy(center, -par.spacerWidt / 2, -par.spacerHeigth / 2);
		var p2 = newPoint_xy(center, -par.spacerWidt / 2, par.spacerHeigth / 2);
		var p3 = newPoint_xy(center, par.spacerWidt / 2, par.spacerHeigth / 2);
		var p4 = newPoint_xy(center, par.spacerWidt / 2, -par.spacerHeigth / 2);

		var pointsShape = [p1, p2, p3, p4];

		//создаем шейп
		var shapePar = {
			points: pointsShape,
			dxfArr: dxfArr,
			dxfBasePoint: dxfBasePoint,
		}
		var shape = drawShapeByPoints2(shapePar).shape;

		var hole = new THREE.Path();
		addCircle(hole, dxfArr, center, par.diam / 2 + 1, dxfBasePoint, par.layer);
		shape.holes.push(hole);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var shim = new THREE.Mesh(geom, par.material);
		shim.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		par.partName = "fixSpacer"
		par.partName += "_M" + par.diam + "-" + par.fixSpacer;
		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: "Проставка",
					metalPaint: (params.paintedBolts == "есть"),
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "М" + par.diam + "-" + par.spacerWidt + 'x' + par.spacerHeigth + 'x' + par.fixSpacerLength;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		par.spacerAmount = extrudeOptions.amount;

		return shim;
	}

	//шпилька или деталь в виде цилиндра
	function drawStudF(par) {
		var len = par.len;
		if (par.dopParams.lenCylinder) len = par.dopParams.lenCylinder;
		var diam = par.diam;
		if (par.dopParams.diamCylinder) diam = par.dopParams.diamCylinder;
		var material = par.material;
		if (par.dopParams.material) material = par.dopParams.material;


		var geometry = new THREE.CylinderGeometry(diam / 2, diam / 2, len, 10, 1, false);
		var stud = new THREE.Mesh(geometry, material);

		//сохраняем данные для спецификации
		var nameFix = "Шпилька";
		if (par.dopParams.name) nameFix = par.dopParams .name;

		par.partName = "stud"
		if (nameFix == 'Шпилька-шуруп') par.partName = "stud_screw"		
		par.partName += "_M" + diam;

		if (nameFix == 'Химический анкер, баллон') par.partName = "chemAnc"
		if (nameFix == 'Дюбель') par.partName = "dowel" + "_Ф" + diam;
					
		
		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: nameFix,
					metalPaint: (params.paintedBolts == "есть"),
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
					discription: "Крепление к стене 1"
				}
			}
			var name = "М" + diam + "x" + len;
			if (nameFix == 'Химический анкер, баллон') name = "Ф" + diam + "x" + len;
			if (nameFix == 'Дюбель') name = "Ф" + diam + "x" + len;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		return stud;
	}

	//глухарь
	function drawScrewF(par) {
		var screw = new THREE.Object3D();

		//шпилька
		var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, par.len, 10, 1, false);
		var stud = new THREE.Mesh(geometry, par.material);
		screw.add(stud);		

		//головка для болтов
		var extrudeOptions = {
			amount: par.diam * 0.6,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
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

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var head = new THREE.Mesh(geom, par.material);
		head.rotation.x = -Math.PI / 2;
		head.position.y = par.len / 2
		screw.add(head);

		//сохраняем данные для спецификации
		var nameFix = "Глухарь";
		if (par.dopParams.name) nameFix = par.dopParams.name;

		var d = 'М';
		if (nameFix == "Саморез") d = 'Ф';

		par.partName = "screw"
		par.partName += "_" + d + par.diam;
		
		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: nameFix,
					metalPaint: (params.paintedBolts == "есть"),
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = d + par.diam + "x" + par.len;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		par.headAmount = extrudeOptions.amount;

		return screw;
	}

	//гайка
	function drawNutF(par) {
		var extrudeOptions = {
			amount: par.diam * 0.8,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
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

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var nut = new THREE.Mesh(geom, par.material);
		nut.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		par.partName = "nut"
		par.partName += "_M" + par.diam;
		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: "Гайка",
					metalPaint: (params.paintedBolts == "есть"),
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "М" + par.diam;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		par.nutAmount = extrudeOptions.amount;

		return nut;
	}

	//шайба
	function drawShimF(par) {
		var extrudeOptions = {
			amount: par.diam * 0.2,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};	

		var shape = new THREE.Shape();

		var center = { x: 0, y: 0 };
		var dxfBasePoint = { x: 0, y: 0 };
		var dxfArr = [];
		addCircle(shape, dxfArr, center, par.diam, dxfBasePoint, par.layer);

		var hole = new THREE.Path();
		addCircle(hole, dxfArr, center, par.diam / 2 + 1, dxfBasePoint, par.layer);
		shape.holes.push(hole);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var shim = new THREE.Mesh(geom, par.material);
		shim.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		par.partName = "shim"
		par.partName += "_M" + par.diam;
		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: "Шайба",
					metalPaint: (params.paintedBolts == "есть"),
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "М" + par.diam;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		par.shimAmount = extrudeOptions.amount;

		return shim;
	}

	//анкер
	function drawAnchorF(par) {
		var extrudeOptions = {
			amount: 75,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var shape = new THREE.Shape();

		var center = { x: 0, y: 0 };
		var dxfBasePoint = { x: 0, y: 0 };
		var dxfArr = [];
		addCircle(shape, dxfArr, center, par.diam / 2 + 2, dxfBasePoint, par.layer);

		var hole = new THREE.Path();
		addCircle(hole, dxfArr, center, par.diam / 2 + 1, dxfBasePoint, par.layer);
		shape.holes.push(hole);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var anchor = new THREE.Mesh(geom, par.material);
		anchor.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		var name = "Химический анкер, баллон";
		if (par.name) name = par.name;

		par.partName = "chemAnc"
		if (name == 'Дюбель') par.partName = "dowel"
		par.partName += "_Ф" + par.diam;		
		
		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: name,
					metalPaint: (params.paintedBolts == "есть"),
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "Ф" + par.diam + "x" + extrudeOptions.amount;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		par.anchorAmount = extrudeOptions.amount;

		return anchor;
	}

	return par;
}

function getFixPart(marshId, wall='wall') {
	//наличие креплений к стене
	var fixPar = {
		fixType: 'нет',
		fixPart: 'нет',
		fixSpacer: 'нет',
		diam: 10,
		len: 100,
	}

	if (wall == 'wall') {
		//стена №1
		if (params.fixPart3 != "нет" && params.fixPart3 != "не указано") {
			var isWallFix = false;
			if (params.stairModel == "Прямая") isWallFix = true;
			if (params.stairModel != "Прямая" && marshId == 3) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType3;
				fixPar.fixPart = params.fixPart3;
				fixPar.fixSpacer = params.fixSpacer3;
				if (params.fixSpacerLength3) fixPar.fixSpacerLength = params.fixSpacerLength3;
			}
		}

		//стена №2
		if (params.fixPart4 != "нет" && params.fixPart4 != "не указано") {
			var isWallFix = false;
			if (params.stairModel == "Прямая") fixPar.out = true;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 3) isWallFix = true;
			if ((params.stairModel == "П-образная с забегом" ||
					params.stairModel == "П-образная с площадкой" ||
					params.stairModel == "П-образная трехмаршевая") &&
				marshId == 1) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType4;
				fixPar.fixPart = params.fixPart4;
				fixPar.fixSpacer = params.fixSpacer4;
				if (params.fixSpacerLength4) fixPar.fixSpacerLength = params.fixSpacerLength4;
			}
		}

		//стена №3
		if (params.fixPart5 != "нет" && params.fixPart5 != "не указано") {
			var isWallFix = false;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 1) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType5;
				fixPar.fixPart = params.fixPart5;
				fixPar.fixSpacer = params.fixSpacer5;
				if (params.fixSpacerLength5) fixPar.fixSpacerLength = params.fixSpacerLength5;
			}
		}

		//стена №4
		if (params.fixPart6 != "нет" && params.fixPart6 != "не указано") {
			var isWallFix = false;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 1) isWallFix = true;
			if ((params.stairModel == "П-образная с забегом" ||
					params.stairModel == "П-образная с площадкой" ||
					params.stairModel == "П-образная трехмаршевая") &&
				marshId == 2) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType6;
				fixPar.fixPart = params.fixPart6;
				fixPar.fixSpacer = params.fixSpacer6;
				if (params.fixSpacerLength6) fixPar.fixSpacerLength = params.fixSpacerLength6;
			}
		}
	}

	//нижнее перекрытие
	if (wall == 'botFloor') {
		if (params.fixPart1 != "нет" && params.fixPart1 != "не указано") {
			fixPar.fixType = params.fixType1;
			fixPar.fixPart = params.fixPart1;
			fixPar.fixSpacer = params.fixSpacer1;
			if (params.fixSpacerLength1) fixPar.fixSpacerLength = params.fixSpacerLength1;
		}
	}

	//верхнее перекрытие
	if (wall == 'topFloor') {
		if (params.fixPart2 != "нет" && params.fixPart2 != "не указано") {
			fixPar.fixType = params.fixType2;
			fixPar.fixPart = params.fixPart2;
			fixPar.fixSpacer = params.fixSpacer2;
			if (params.fixSpacerLength2) fixPar.fixSpacerLength = params.fixSpacerLength2;
		}
	}


	//определяем параметры крепления в зависимости от типа крепления и типа стены
	if (fixPar.fixPart == 'глухари') {
		if (params.model == "ко" && fixPar.fixType == 'дерево') {
			fixPar.diam = 12;
			fixPar.len = 200;
		}
	}

	if (fixPar.fixPart == 'шпилька насквозь') {
		if (fixPar.fixType == 'пеноблок' || ~fixPar.fixType.indexOf('кирпич')) {
			if (params.model == "лт") fixPar.diam = 12;
			if (params.model == "ко") fixPar.diam = 16;			
		}
		fixPar.len = 300;
	}

	if (fixPar.fixPart == 'шпилька-шуруп') {
		fixPar.diam = 12;
	}	

	if (fixPar.fixPart == 'саморезы') {
		fixPar.diam = 6;
		fixPar.len = 60;
	}


	//проставка
	if (fixPar.fixPart != "не указано" && fixPar.fixPart != "нет" &&
		fixPar.fixSpacer != "не указано" && fixPar.fixSpacer != "нет") {
		fixPar.isSpacer = true;
		fixPar.spacerWidt = 40;
		fixPar.spacerHeigth = 40;
		fixPar.spacerAmt = 1;

		if (fixPar.fixSpacer == "100х50") {
			fixPar.spacerWidt = 100;
			fixPar.spacerHeigth = 50;
		}
		if (fixPar.fixSpacer == "40х40 сдвоен.") {
			fixPar.spacerAmt = 2;
		}
	}

	return fixPar;
}

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

	if (!par.model) {
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
	if (!$sceneStruct.vl_1.realColors) metalMaterial = params.materials.metal;

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
	if (angleModel == "У4-70х70х100" && par.pos) {
		var fixPar = getFixPart(0, par.pos);
		partParams.holeDiam2 = fixPar.diam + 1;
	}
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

	/* болты крепления к нижнему или верхнему перекрытию */
	if (typeof isFixPats != "undefined" && isFixPats) { //глобальная переменная
		if (angleModel == "У4-70х70х100" && par.pos) {
			var fixPar = getFixPart(0, par.pos);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = (partParams.width - partParams.holeDist2) / 2;
			fix.position.y = 0;
			fix.position.z = partParams.height - partParams.hole2Y;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += partParams.metalThickness;
			}
			complexObject1.add(fix);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = (partParams.width + partParams.holeDist2) / 2;
			fix.position.y = 0;
			fix.position.z = partParams.height - partParams.hole2Y;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += partParams.metalThickness;
			}
			complexObject1.add(fix);
		}
	}

	/* болты */
	var partName = "treadAngle";
	if (angleModel == "У4-70х70х100" || angleModel == "У4-60х60х100" || angleModel == "У5-60х60х100") partName = "carcasAngle";

	//болты в грани 1
	if (!par.noBoltsInSide1) par.noBoltsInSide1 = false;	//болты есть
	if (angleModel == "У4-70х70х100" || angleModel == "У5-60х60х100") par.noBoltsInSide1 = true;

	//болты в грани 2
	if (!par.noBoltsInSide2) par.noBoltsInSide2 = false; //болты есть
	if (angleModel != "У4-70х70х100" && angleModel != "У4-60х60х100" && angleModel != "У5-60х60х100")
		par.noBoltsInSide2 = true;


	if (typeof anglesHasBolts != "undefined" && anglesHasBolts) { //глобальная переменная
		//болты в грани №1
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
		}
		if (!testingMode) {
			if (partName == "treadAngle") boltPar.len = 20;
			if (partName == "carcasAngle") boltPar.len = 30;
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
			y: partParams.height - partParams.hole1Y,
		}
	}
	if (angleModel == "У4-70х70х100") dimensions.holePos.y = partParams.height - 35;
	if (angleModel == "У5-60х60х100") {
		dimensions.holePos.y = partParams.height - partParams.hole1Y;
		dimensions.holePos.x = (partParams.width - partParams.holeDist1) / 2
	}

	if (angleModel == "У2-40х40х230" ||
		angleModel == "У2-40х40х200" ||
		angleModel == "У2-40х40х160" ||
		angleModel == "У2-40х40х90") {
		dimensions.holePos.y = partParams.height - partParams.hole2Y;
	}

	complexObject1.dimensions = dimensions;

	return complexObject1
}