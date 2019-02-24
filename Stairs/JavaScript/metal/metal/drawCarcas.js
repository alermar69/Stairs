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
		if (params.platformTop == 'увеличенная') {
			//var deltaZ = params.M - (params.platformWidth_3 - (params.M - calcTreadLen())) - params.stringerThickness;
			//rearStringer.position.z -= deltaZ - params.stringerThickness; //FIX	
			//if (turnFactor == -1) { //TURNFACTOR CHANGED
			//	rearStringer.position.z -= (params.platformWidth_3 - params.M);
			//}
			rearStringer.position.z = -params.stringerThickness;
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



function calcPltPartsParams(par) {
	var minPartWidth = 30;
	if (params.stairType == 'дпк' || params.stairType == "лиственница тер.") {
		par.maxWidth = params.dpcWidth;
		par.partLen = par.maxWidth;
		par.partsGap = params.dpcDst;
		par.partsAmt = Math.floor(par.len / par.maxWidth);
		var lastPartLen = par.len - ((par.partsAmt - 1) * par.partsGap) - (par.maxWidth * par.partsAmt);
		if (lastPartLen >= minPartWidth + par.partsGap) par.lastPartLen = lastPartLen, par.partsAmt++;
		if (lastPartLen < -par.partsGap) par.lastPartLen = par.partLen + lastPartLen;
		//if (lastPartLen < -par.partsGap) par.lastPartLen = par.partLen + (lastPartLen + par.partsGap);
	}
	if (params.stairType != 'дпк' && params.stairType !== "лиственница тер.") {
		//поперек волокон площадка делается из кусков не шире 600мм
		par.maxWidth = 600;
		par.partsGap = 2; //зазор между частями площадки
		par.partsAmt = Math.ceil(par.len / par.maxWidth);
		par.partLen = par.len / par.partsAmt - par.partsGap * (par.partsAmt - 1) / par.partsAmt;
	}
} //end of calcPltPartsParams

function drawScirtingSection(par) {

	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	var mesh = new THREE.Object3D();
	var dxfBasePoint0 = copyPoint(par.dxfBasePoint);

	var skirtingParams = {
		rise: marshPar.h,
		step: marshPar.b,
		isLast: false,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		skirtingDescription: "Плинтус площадки " + par.marshId + " марша ",
	}

	//нижний участок

	var turnPar = calcTurnParams(marshPar.prevMarshId);


	if (par.side == "out" && marshPar.botTurn == "площадка") {
		skirtingParams.skirtingDescription = "Плинтус площадки ";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = 0;
		skirtingParams.step = turnPar.turnLengthBot + params.nose - 0.1// - params.riserThickness * 2;
		skirtingParams.isNotVerticalPlank = true; //нет вертикальной планки
		//подрезамем плинтус если на нижнем марше тоже есть плинтус
		if (prevMarshPar.hasSkirting.out) skirtingParams.step -= params.riserThickness;
		if (params.stairModel === "П-образная с площадкой")
			skirtingParams.step = params.platformLength_1 + params.nose;

		if (marshPar.stairAmt == 0 && par.marshId == 3) {
			skirtingParams.isLast = true;
		}
		var basePoint = {
			x: params.nose - skirtingParams.step,
			y: 0,
		}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose - skirtingParams.step;
		skirting.position.y = 0;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);

		skirtingParams.isNotVerticalPlank = false;
	}
	if (par.side == "out" && marshPar.botTurn == "забег") {
		//вторая забежная ступень
		//skirtingParams.skirtingDescription = "Плинтус площадки " + 1 + "шт.";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = 0;
		skirtingParams.step = par.wndPar.params[2].stepWidthX - 0.15// - params.riserThickness * 2;
		skirtingParams.isNotVerticalPlank = true; //нет вертикальной планки
		//подрезамем плинтус если на нижнем марше тоже есть плинтус
		if (prevMarshPar.hasSkirting.out) {
			if (!(params.stairModel == "П-образная с забегом" && par.marshId == 3))
				skirtingParams.step -= params.riserThickness;
		}

		var basePoint = {
			x: -turnPar.turnLengthBot,
			y: -marshPar.h,
		}
		//сдвигаем плинтус если на нижнем марше тоже есть плинтус
		if (prevMarshPar.hasSkirting.out) {
			if (!(params.stairModel == "П-образная с забегом" && par.marshId == 3))
				basePoint.x += params.riserThickness + 0.1;
		}
		if (marshPar.stairAmt == 0 && !marshPar.lastMarsh) basePoint.x -= ((params.marshDist - 57) + (params.nose - 40));

		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = -turnPar.turnLengthBot;
		//сдвигаем плинтус если на нижнем марше тоже есть плинтус
		if(prevMarshPar.hasSkirting.out) skirting.position.x += params.riserThickness + 0.1;
		skirting.position.y = -marshPar.h;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);

		skirtingParams.isNotVerticalPlank = false;

		//третья забежная ступень
		skirtingParams.skirtingDescription = "Плинтус площадки";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = marshPar.h;
		if (marshPar.stairAmt == 0 && par.marshId == 3) {
			skirtingParams.isLast = true;
		}
		//skirtingParams.step = par.wndPar.params[3].stepWidthHi - params.nose - 0.01// - params.riserThickness * 2;
		skirtingParams.nose = 21.824 / Math.cos(par.wndPar.params[3].edgeAngle) + 0.01;
		if (params.calcType == 'timber') skirtingParams.nose = params.nose / Math.cos(par.wndPar.params[3].edgeAngle) + 0.01;
		skirtingParams.step = par.wndPar.params[3].stepWidthHi - skirtingParams.nose // - params.riserThickness * 2;
		//if (marshPar.stairAmt == 0) skirting.step += 45;


		var basePoint = {
			x: params.nose - par.wndPar.params[3].stepWidthHi + skirtingParams.nose - 0.01,
			y: -marshPar.h,
		}
		if (marshPar.stairAmt == 0 && marshPar.lastMarsh)
			basePoint.x += 45 - (100 - params.lastWinderTreadWidth);
		if (marshPar.stairAmt == 0 && !marshPar.lastMarsh) basePoint.x -= (params.nose - 20);
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose - par.wndPar.params[3].stepWidthHi + skirtingParams.nose - 0.01;
		if (marshPar.stairAmt == 0) skirting.position.x += 45 - (100 - params.lastWinderTreadWidth);
		skirting.position.y = -marshPar.h;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);

		skirtingParams.nose = params.nose;
	}

	if (par.side == "in" && marshPar.botTurn == "площадка") {
		skirtingParams.rise = 0;
		skirtingParams.isNotVerticalPlank = true; //нет вертикальной планки

		if (params.stairModel === "П-образная с площадкой") {
			skirtingParams.rise = marshPar.h;
		}
		skirtingParams.step = marshPar.b + params.nose;
		skirtingParams.stepOffsetX = - params.nose; //сдвиг по оси Х

		var basePoint = {
			x: params.nose,
			y: 0,
		}
		if (params.stairModel !== "П-образная с площадкой") basePoint.y = marshPar.h;
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose;
		if (params.stairModel !== "П-образная с площадкой") skirting.position.y = marshPar.h;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);

		skirtingParams.isNotVerticalPlank = false;
		skirtingParams.stepOffsetX = 0;
	}

	//плинтус на пригласительных ступенях
	var hasStartTreadScirting = false;
	if (params.stairModel == "Прямая" && marshPar.side[par.side] == params.arcSide) hasStartTreadScirting = true;
	if (params.stairModel != "Прямая" && marshPar.side[par.side] != params.arcSide && params.arcSide != "two")
		hasStartTreadScirting = true;

	if (params.startTreadAmt > 0 && hasStartTreadScirting && par.marshId == 1) {
		skirtingParams.skirtingDescription = "Плинтус площадки ";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = params.h1;

		var stepName = 'stepLeft';
		if (params.arcSide == "left") stepName = 'stepRight';

		for (var i = 1; i <= params.startTreadAmt; i++) {
			skirtingParams.isNotBotPlank = false; // наличие нижней планки плинтуса
			if (i == 1) skirtingParams.isNotBotPlank = true;

			var treadPar = staircasePartsParams.startTreadsParams[i];
			var treadNextPar = {}; // параметры следующей пригласительной ступени
			if (i + 1 <= params.startTreadAmt) treadNextPar = staircasePartsParams.startTreadsParams[i + 1];
			if (!treadNextPar.stepOff) treadNextPar.stepOff = 0; // сдвиг подступенка, который сверху от края ступени(для радиусных и веера)
			var treadLen = treadPar[stepName];

			// костыль
			// если пригласительных ступеней больше двух, на нижних надо уменьшить длину
			var n = params.startTreadAmt - 1 - i;
			if (n > 0) treadNextPar.stepOff -= params.nose * n;
			treadLen += treadNextPar.stepOff;

			skirtingParams.step = treadLen - params.nose;
			//if (params.fullArcFront == "да") skirtingParams.step += 2; //костыль чтобы не было пересечений

			var basePoint = {
				x: params.b1 * i + params.nose - skirtingParams.step,
				y: params.h1 * (i - 1),
			}
			skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

			skirtingParams = drawSkirting2(skirtingParams);
			var skirting = skirtingParams.mesh;

			skirting.position.x = basePoint.x;
			if (treadNextPar.stepOff) skirting.position.x += treadNextPar.stepOff;
			skirting.position.y = basePoint.y;
			mesh.add(skirting);
		}
	}

	//марш
	skirtingParams.rise = marshPar.h;
	skirtingParams.step = marshPar.b;
	var startTread = 0;
	if (marshPar.botTurn == "площадка" && par.side == "in" && par.marshId > 1) startTread = 1;
	if (params.startTreadAmt > 0 && par.marshId == 1) startTread = params.startTreadAmt;

	for (var i = startTread; i < marshPar.stairAmt; i++) {
		skirtingParams.isNotBotPlank = false; // наличие нижней планки плинтуса
		if (i == startTread && marshPar.botTurn == "пол" && !hasStartTreadScirting) {
			skirtingParams.isNotBotPlank = true;
		}
		if (i == startTread && marshPar.botTurn == "забег" && par.side == "in") {
			skirtingParams.isNotBotPlank = true;
		}
		if (i == marshPar.stairAmt - 1 && marshPar.topTurn == "пол") {
			skirtingParams.skirtingDescription = "Плинтус последней ступени " + par.marshId + " марша ";
			skirtingParams.dxfArr = dxfPrimitivesArr;
			skirtingParams.dxfBasePoint.x -= 1000;
			if (params.topAnglePosition !== "вертикальная рамка" && params.calcType != 'timber') skirtingParams.isLast = true;
			if (params.calcType == 'timber') skirtingParams.step -= params.nose;
		}

		var basePoint = {
			x: params.nose + marshPar.b * i,
			y: marshPar.h * i,
		}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose + marshPar.b * i;
		skirting.position.y = marshPar.h * i;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		//skirtingParams.dxfArr = dxfPrimitivesArr0;
	}

	if ((params.topAnglePosition == "вертикальная рамка" || params.calcType == 'timber') && marshPar.topTurn == "пол") {
		skirtingParams.isLast = true;
		var basePoint = {
			x: params.nose + marshPar.b * marshPar.stairAmt,
			y: marshPar.h * marshPar.stairAmt,
		}
		skirtingParams.nose = params.nose;
		if (params.calcType == 'timber') {
			basePoint.x -= params.nose;
			skirtingParams.nose = 0;
		}
		skirtingParams.step = turnPar.topStepDelta - skirtingParams.nose;
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
	}

	//верхний участок

	if (marshPar.topTurn == "площадка") {
		skirtingParams.skirtingDescription = "Плинтус площадки ";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.dxfBasePoint.x -= params.M + 500;
		if (par.side == "out") {
			skirtingParams.step = turnPar.turnLengthTop - params.nose;
			if (params.stairModel === "П-образная с площадкой")
				skirtingParams.step = params.platformLength_1;
		}
		if (par.side == "in") {
			skirtingParams.step = turnPar.topMarshOffsetX;
			if (params.stairModel === "П-образная с площадкой")
				skirtingParams.step = 0;
		}

		skirtingParams.isLast = true;

		var basePoint = {
			x: params.nose + marshPar.b * marshPar.stairAmt,
			y: marshPar.h * marshPar.stairAmt,
		}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose + marshPar.b * marshPar.stairAmt;
		skirting.position.y = marshPar.h * marshPar.stairAmt;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
	}
	if (marshPar.topTurn == "забег") {
		//skirtingParams.skirtingDescription = "Плинтус площадки " + 1 + "шт.";riserThickness

		//первая забежная ступень
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.dxfBasePoint.x -= params.M + 500;

		skirtingParams.nose = params.nose;
		if (marshPar.stairAmt == 0 && !marshPar.lastMarsh) skirtingParams.nose = 20;

		if (par.side == "out") {
			skirtingParams.step = par.wndPar.params[1].stepWidthHi - skirtingParams.nose - params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle);
		}
		if (par.side == "in")
			skirtingParams.step = par.wndPar.params[1].stepWidthLow - skirtingParams.nose;
		//skirtingParams.step = par.wndPar.params[1].stepWidthLow + 60 - skirtingParams.nose;

		skirtingParams.isLast = false;

		var basePoint = {
			x: skirtingParams.nose + marshPar.b * marshPar.stairAmt,
			y: marshPar.h * marshPar.stairAmt,
		}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose + marshPar.b * marshPar.stairAmt;
		skirting.position.y = marshPar.h * marshPar.stairAmt;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);

		//вторая забежная ступень
		if (par.side == "out") {
			skirtingParams.step = par.wndPar.params[2].stepWidthY - 20.525 / Math.cos(par.wndPar.params[1].edgeAngle) + params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle);
			skirtingParams.nose = 20.525 / Math.cos(par.wndPar.params[1].edgeAngle);
			if (params.stairModel == "П-образная с забегом" && par.marshId == 2 && nextMarshPar.hasSkirting.out)
				skirtingParams.step -= params.riserThickness;
			//skirtingParams.step = par.wndPar.params[2].stepWidthY - params.nose;
			skirtingParams.rise = nextMarshPar.h;
			skirtingParams.isLast = true;
			var basePoint = {
				x: marshPar.b * marshPar.stairAmt + par.wndPar.params[1].stepWidthHi - params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle),
				y: marshPar.h * marshPar.stairAmt + marshPar.h,
				//y: marshPar.h * marshPar.stairAmt + nextMarshPar.h,
			}
			skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);

			skirtingParams = drawSkirting2(skirtingParams);
			var skirting = skirtingParams.mesh;
			/*
			skirting.position.x = marshPar.b * marshPar.stairAmt + par.wndPar.params[1].stepWidthHi - params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle);
			skirting.position.y = marshPar.h * marshPar.stairAmt + nextMarshPar.h;
			*/
			skirting.position.x = basePoint.x;
			skirting.position.y = basePoint.y;
			mesh.add(skirting);
		}
	}

	return mesh;

}

function drawPolylineHandrail(par) {

	var marshPar = getMarshParams(par.marshId);

	var dxfBasePoint = par.dxfBasePoint;
	var side = par.side;

	//адаптация
	if (side == "left") side = "out";
	if (side == "right") side = "in";

	par.mesh = new THREE.Object3D();

	if (!par.points) return par;

	var points = par.points;
	var offset = par.offset;

	//сортируем массив points в порядке возрастания координаты x
	par.points.sort(function (a, b) {
		return a.x - b.x;
	});

	//удаляем ошибочные точки чтобы поручень отрисовывался в любом случае
	$.each(par.points, function (i) {
		if (!isFinite(this.x) || !isFinite(this.y)) {
			par.points.splice(i, 1);
		}
	})
	//костыль чтобы поручень отрисовывался если не осталось точек
	if (points.length < 2) {
		points = [];
		var p1 = { x: -params.M / 2, y: 0 }
		var p2 = { x: params.M / 2, y: 0 }
		points.push(p1, p2)
	}

	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_railing,
		timberPaint: params.timberPaint_perila,
	}
	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

	//для круглого поручня базовые точки находятся на оси поручня
	if (meterHandrailPar.handrailModel == "round") offset -= meterHandrailPar.profY / 2;

	//пересчет базовых точек чтобы сместить поручень на величину offset

	var points1 = []; //массив точек с отступом
	var points2 = []; //массив центров шарниров
	for (var i = 0; i < points.length; i++) {
		//первая точка
		if (i == 0) {
			//если первый участок вертикальный
			if (points[i].x == points[i + 1].x) {
				var point = newPoint_xy(points[i], offset, 0)
			}
			//если первый участок наклонный
			if (points[i].x != points[i + 1].x) {
				var handrailAngle = angle(points[i], points[i + 1])
				var point = newPoint_xy(points[i], 0, -offset / Math.cos(handrailAngle))
				//удлиннение поручня за начальную точку
				point = polar(point, handrailAngle, -par.extraLengthStart)
			}
			points1.push(point);
		}

		//промежуточные точки
		if (i > 0 && i < points.length - 1) {
			var line1 = parallel(points[i - 1], points[i], -offset);
			var line2 = parallel(points[i], points[i + 1], -offset);
			var point = itercection(line1.p1, line1.p2, line2.p1, line2.p2)
			points1.push(point);
		}

		//последняя точка
		if (i == points.length - 1) {

			//если последний участок вертикальный
			if (points[i - 1].x == points[i].x) {
				//var point = newPoint_xy(points[i], -offset, 0)
				var point = newPoint_xy(points[i], offset, 0);
			}
			//если последний участок наклонный
			if (points[i - 1].x != points[i].x) {
				var handrailAngle = angle(points[i - 1], points[i])
				//var point = newPoint_xy(points[i], 0, -offset / Math.cos(handrailAngle))
				//var point = newPoint_xy(points[i], 0, -offset * Math.tan(handrailAngle))
				var line1 = parallel(points[i - 1], points[i], -offset);
				var point = itercection(line1.p1, line1.p2, points[i], polar(points[i], Math.PI / 2, 100))
				//var point = itercection(points[i - 1], polar(points[i - 1], handrailAngle, 100), points[i], polar(points[i], Math.PI / 2, 100))

				if (params.handrailEndHor == "нет" || !marshPar.lastMarsh) {
					//удлиннение поручня за конечную точку
					point = polar(point, handrailAngle, par.extraLengthEnd)
					point = polar(point, handrailAngle, -10 / Math.cos(handrailAngle))
					//if (params.handrailEndType == "под углом") point = polar(point, handrailAngle, meterHandrailPar.profY)
					if (params.calcType == "mono") point = polar(point, handrailAngle, -0.1)
				}

				if (params.handrailEndHor == "да" && marshPar.lastMarsh) {
					point = newPoint_y(point, params.handrailEndHeight, handrailAngle);
					points1.push(point);
					var point = newPoint_xy(point, params.handrailEndLen, 0)
				}

			}
			points1.push(point);
		}
	}

	points = points1;

	//расчет длин и углов всех участков поручня

	var startOffset = 0; //смещение начала текущего куска поручня от базовой точки
	var startAngle = Math.PI / 2; //угол начала текущего куска поручня

	for (var i = 0; i < points.length - 1; i++) {
		if (points[i] && points[i + 1]) {
			//расчет угла поручня
			var p1 = copyPoint(points[i]); //первая точка текущего куска
			var p2 = copyPoint(points[i + 1]); //вторая точка текущего куска
			var p3 = copyPoint(points[i + 2]); //вторая точка следующего куска

			var handrailAngle = Math.atan((p2.y - p1.y) / (p2.x - p1.x));

			//расчет начального угла поручня для первого куска
			if (i == 0 && params.handrailEndType == "под углом" && p2.x != p1.x) {
				startAngle = Math.PI / 2 - handrailAngle;
			}
			//для остальных кусков стартовый угол рассчитан на предыдущей итерации цикла


			//расчет конечного угла и длины куска (кроме последнего)
			if (p3) var handrailAngle2 = Math.atan((p3.y - p2.y) / (p3.x - p2.x));

			if (par.connection == "без зазора" && p3) {
				var endAngle = Math.PI / 2 - (handrailAngle - handrailAngle2) / 2;
				//вертикальный участок
				if (p2.x - p1.x == 0) {
					var length = distance(p1, p2) + meterHandrailPar.profY * Math.tan(Math.PI / 2 - endAngle);
				}
				//горизонтальный или наклонный участок
				if (p2.x - p1.x != 0) {
					var length = distance(p1, p2) + meterHandrailPar.profY * Math.tan(Math.PI / 2 - endAngle) - meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle);
				}
			}

			//прямые торцы
			if (par.connection != "без зазора") {
				endAngle = Math.PI / 2;
				var length = distance(p1, p2) - meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle);
			}

			//последний кусок
			if (i == points.length - 2) {
				endAngle = Math.PI / 2;
				if (params.handrailEndType == "под углом" && p2.x != p1.x) {
					endAngle = Math.PI / 2 - handrailAngle;
				}
				var length = distance(p1, p2);
				//if (par.connection == "без зазора") length += meterHandrailPar.profY * Math.tan((Math.PI / 2 - handrailAngle)/2)
				if (params.startVertHandrail == "есть" && params.handrailFixType == "паз") {
					length -= meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle)
				}
			}


			if (meterHandrailPar.handrailModel == "round") {
				length = distance(p1, p2);
				//укорачиваем поручень чтобы он не врезался в стойку верхнего марша
				var key = par.key;
				if (params.stairModel == "Прямая" || params.stairModel == "Прямая с промежуточной площадкой") {
					if (par.key == "in") key = "out";
					if (par.key == "out") key = "in";
				}

				//if (!marshPar.lastMarsh && key == "in") length -= meterHandrailPar.profY * Math.tan(handrailAngle)
			}



			//расчет позиции шарниров
			if (i < points.length - 2 && par.connection == "шарнир") {
				var axis1 = parallel(p1, p2, meterHandrailPar.profY / 2);
				var axis2 = parallel(p2, p3, meterHandrailPar.profY / 2);
				var spherePos = itercection(axis1.p1, axis1.p2, axis2.p1, axis2.p2)
			}

			//корректировка длины и позиции в зависимости от типа стыковки кусков
			var basePoint = copyPoint(p1);

			if (par.connection == "без зазора") endOffset = 0;

			if (par.connection == "шарнир") {
				endOffset = 26;
				//если есть шарнир
				if (i <= points.length - 2) {
					length -= endOffset * 2;
					basePoint = polar(basePoint, handrailAngle, endOffset)
				}
			}
			if (par.connection == "прямые") {
				length -= startOffset; //вычитаем отступ, рассчитанный на предыдущей итерации
				basePoint = polar(basePoint, handrailAngle, startOffset)
				endOffset = 0;
				if (p3 && handrailAngle < handrailAngle2) endOffset = meterHandrailPar.profY * Math.tan((handrailAngle2 - handrailAngle) / 2);
				//круглый поручень базируется по оси, поэтому нужны зазоры и при загибе вниз
				if (meterHandrailPar.handrailModel == "round" && p3 && handrailAngle > handrailAngle2)
					endOffset = meterHandrailPar.profY * Math.tan((handrailAngle - handrailAngle2) / 2);
				length -= endOffset;
			}



			//построение поручня
			var handrailParams = {
				model: params.handrail,
				length: length - 0.01, // костыль чтобы не было пересечений
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: par.dxfBasePoint,
				startAngle: startAngle,
				endAngle: endAngle,
				fixType: par.fixType,
				side: side,
				poleAngle: handrailAngle,
				sectText: par.sectText,
			}
			if (params.railingModel == "Самонесущее стекло") handrailParams.isGlassHandrail = true;

			handrailParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

			handrailParams = drawHandrail_4(handrailParams);
			var handrail = handrailParams.mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;

			par.wallOffset = handrailParams.wallOffset;
			par.mesh.add(handrail);


			//шарнир
			if (i < points.length - 2 && par.connection == "шарнир") {

				var jointParams = {
					rad: 25,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, p2.x, p2.y)
				}
				var posZ = jointParams.rad * 2;
				if (side == "in") posZ = -jointParams.rad * 2;

				var sphere = drawHandrailJoint(jointParams);
				sphere.position.x = p2.x;
				sphere.position.y = p2.y;
				sphere.position.z = posZ;
				par.mesh.add(sphere);

				//Шарнир на конце если есть соединение со следующим участком
				if (par.topConnection && i == points.length - 3) {
					jointParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, p3.x, p3.y)
					var sphere = drawHandrailJoint(jointParams);
					sphere.position.x = p3.x;
					sphere.position.y = p3.y;
					sphere.position.z = posZ;
					par.mesh.add(sphere);

				}
			}


			//добавляем кронштейн поручня к поворотному столбу
			if (par.topPoint) {
				//если нет последней стойки
				if (par.topPoint.noDraw) {
					var holderPar = {
						topPoint: polar(basePoint, handrailAngle, handrailParams.length),//точка верхнего края поручня
						holderAng: par.topPoint.holderAng,
						dxfBasePoint: handrailParams.dxfBasePoint,
					}
					var pt = newPoint_xy(par.topPoint, par.topPoint.dxToMarshNext - 40, 0); //40 - ширина стойки
					holderPar.topPoint = itercection(basePoint, polar(basePoint, handrailAngle, 100), pt, polar(pt, Math.PI / 2, 100))
					if (meterHandrailPar.handrailModel == "round")
						holderPar.topPoint.y -= meterHandrailPar.profY / 2 / Math.cos(handrailAngle);

					holderPar.dxfBasePoint = newPoint_xy(handrailParams.dxfBasePoint, -basePoint.x, -basePoint.y);

					var holder = drawHandrailHolderTurnRack(holderPar).mesh;
					holder.position.z += -30 * turnFactor;
					par.mesh.add(holder);
				}
			}

			//сохраняем начальный параметры для следующего участка
			startAngle = -endAngle;
			startOffset = endOffset;
		}
	}

	par.meterHandrailPar = meterHandrailPar;

	return par;
} //end of drawPolylineHandrail


function drawRack3d_4(par) {
	/*
	par.len
	par.material
	par.railingSide //в какую сторону штырьки
	par.showPins //показывать ли штырьки бокового крепления
	par.isBotFlan // есть ли нижний фланец
	par.stringerSideOffset
	dxfArr
	dxfBasePoint
	showHoles
	realHolder: false;
	базовая точка - ось верхнего отверстия
	*/

	if (!par.layer) par.layer = "railing";
	if (!par.material) par.material = params.materials.metal;

	var len = par.len;
	var profSize = 40;
	par.holderLength = 70;
	par.mesh = new THREE.Object3D();

	var topLen = 120;

	var timberPartLen = 600;
	var botLen = len - topLen - timberPartLen;
	if (params.banisterMaterial != "40х40 нерж+дуб") botLen = len;

	//тело стойки
	var p0 = { x: 0, y: 0 }
	var p1 = newPoint_xy(p0, -profSize / 2, -90);
	var p2 = newPoint_xy(p1, 0, botLen)
	var p3 = newPoint_xy(p2, profSize, 0)
	var p4 = newPoint_xy(p1, profSize, 0)

	var shape = new THREE.Shape();

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

	//отверстия
	if (par.showHoles) {
		var rad = 6.5;
		var holeDist = 60;
		//верхнее отверстие
		var center = { x: 0, y: 0 }
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);
		var center = { x: 0, y: -holeDist }
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);

		//на поворотной стойке для лт добавляем дополнительное отверстие крепления
		if (par.holeYTurnRack) {
			var center = { x: 0, y: par.holeYTurnRack}
			addRoundHole(shape, par.dxfArr, center, 3.5, par.dxfBasePoint);
		}
	}

	var extrudeOptions = {
		amount: profSize,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var rack = new THREE.Mesh(geom, par.material);

	//если поворотная стойка, тогда ее надо повернуть
	if (par.holeYTurnRack) {
		rack.rotation.y += Math.PI / 2 * turnFactor;
		rack.position.z += profSize / 2;
		rack.position.x -= profSize / 2 * turnFactor;
	}
	par.mesh.add(rack);

	//части комбинированной балясины
	if (params.banisterMaterial == "40х40 нерж+дуб") {

		//вставка

		var p1 = newPoint_xy(p0, -profSize / 2, -90 + botLen);
		var p2 = newPoint_xy(p1, 0, timberPartLen)
		var p3 = newPoint_xy(p2, profSize, 0)
		var p4 = newPoint_xy(p1, profSize, 0)

		var shape = new THREE.Shape();

		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, params.materials.timber);
		par.mesh.add(rack);

		//верх

		var p1 = newPoint_xy(p0, -profSize / 2, -90 + botLen + timberPartLen);
		var p2 = newPoint_xy(p1, 0, topLen)
		var p3 = newPoint_xy(p2, profSize, 0)
		var p4 = newPoint_xy(p1, profSize, 0)

		var shape = new THREE.Shape();

		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, par.material);
		par.mesh.add(rack);

	}


	//кронштейн поручня

	//приблизительная отрисовка кронштейна
	if (!par.realHolder) {
		var holderRad = 6;
		var segmentsX = 20;
		var segmentsY = 0;
		var openEnded = false;


		var geom = new THREE.CylinderGeometry(holderRad, holderRad, par.holderLength, segmentsX, segmentsY, openEnded);
		var handrailHolder = new THREE.Mesh(geom, params.materials.inox);
		handrailHolder.position.y = (len + par.holderLength / 2) - 90;
		handrailHolder.position.z = profSize / 2;

		par.mesh.add(handrailHolder);
	}
	//точная отрисовка кронштейна
	if (par.realHolder) {
		var holderParams = {
			angTop: par.holderAng,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, len - 90),
			isForge: false,
		}
		var holder = drawHandrailHolder(holderParams).mesh;
		holder.position.x = 0;
		holder.position.y = len - 90;
		holder.position.z = 20;

		par.mesh.add(holder)
	}

	//болты

	if (typeof anglesHasBolts != "undefined" && anglesHasBolts && par.showPins) { //anglesHasBolts - глобальная переменная
		var bolts = new THREE.Object3D();
		var boltPar = {
			diam: boltDiam,
			len: 20,
			headType: "потай",
		}
		if (params.model == "ко") boltPar.headType = "шестигр.";

		var bolt = drawBolt(boltPar).mesh;
		if (params.model == "лт") {
			bolt.rotation.x = Math.PI / 2;
			bolt.position.x = 0;
			bolt.position.y = 0;
			bolt.position.z = 2

			if (par.railingSide == "left") {
				bolt.rotation.x = -Math.PI / 2;
				bolt.position.z = profSize - 2
			}
		}

		if (params.model == "ко") {
			bolt.rotation.x = -Math.PI / 2;
			bolt.position.x = 0;
			bolt.position.y = 0;
			bolt.position.z = 2 + 4//boltLen / 2 + boltBulge - 4;

			if (par.railingSide == "left") {
				bolt.rotation.x = Math.PI / 2;
				bolt.position.z = profSize - 2 - 4// - boltLen / 2 - boltBulge + 4;
			}
		}
		bolts.add(bolt)


		var bolt2 = drawBolt(boltPar).mesh;
		bolt2.rotation.x = bolt.rotation.x;
		bolt2.position.x = 0;
		bolt2.position.y = -holeDist;
		bolt2.position.z = bolt.position.z;
		bolts.add(bolt2)

		//на поворотной стойке для лт добавляем дополнительный болт крепления и поворачиваем болты
		if (par.holeYTurnRack) {
			if (params.model == "лт") {
				boltPar.diam = 6;

				var bolt2 = drawBolt(boltPar).mesh;
				bolt2.rotation.x = bolt.rotation.x;
				bolt2.position.x = 0;
				bolt2.position.y = par.holeYTurnRack;
				bolt2.position.z = bolt.position.z;
				bolts.add(bolt2)
			}

			bolts.rotation.y += Math.PI / 2 * turnFactor;
			bolts.position.z += profSize / 2;
			bolts.position.x -= profSize / 2 * turnFactor;
		}


		par.mesh.add(bolts)
	}

	//кронштейн из пластин для КО
	if (params.model == "ко" && params.rackBottom == "боковое" && !par.isBotFlan) {
		var holderPar = {
			railingSide: par.railingSide,
			dxfBasePoint: par.dxfBasePoint,
			material: par.material
		}
		var holder = drawRackHolder(holderPar).mesh;
		holder.position.y = -70;
		if (par.railingSide == "right") holder.position.z = 40;
		//на поворотной стойке поворачиваем кронштейн
		if (par.isTurnRack) {
			var factor = params.turnSide == 'левое' ? 1 : -1;
			holder.rotation.y += Math.PI / 2 * turnFactor;
			holder.position.z += profSize / 2 * factor;
			holder.position.x += profSize / 2;
		}

		par.mesh.add(holder);




	}

	//нижний фланец
	if (par.isBotFlan) {
		var flanParams = {
			material: par.material,
			dxfArr: [], //мусорный массив
			dxfBasePoint: { x: 1000, y: -1000, },
			size: 76,
			holeDst: 55,
		}
		flanParams = drawPlatformRailingFlan(flanParams)
		var botFlan = flanParams.mesh;
		botFlan.position.z = 20;
		botFlan.position.y = -90;
		par.mesh.add(botFlan);
	}

	//сохраняем данные для спецификации
	var banisterMaterial = params.banisterMaterial;
	if (specObj.unit == "banister") banisterMaterial = params.banisterMaterial_bal;

	var partName = "racks";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Стойка бок. L =",
				metalPaint: false,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt",
				group: "Ограждения",
			}
			if (par.isBotFlan) specObj[partName].name = "Стойка фланц. L =";
			if (banisterMaterial == "40х40 черн.") specObj[partName].metalPaint = true;
			if (banisterMaterial == "40х40 нерж+дуб") {
				specObj[partName].timberPaint = true;
				specObj[partName].division = "timber";
				specObj[partName].group = "timberBal";
			}
		}
		var name = par.len;
		if (banisterMaterial == "40х40 черн.") name += " черн.";
		if (banisterMaterial == "40х40 нерж.") name += " нерж.";
		if (banisterMaterial == "40х40 нерж+дуб") name += " комб.";
		if (par.holderAng == 0) name += " штырь прямой"
		else name += " штырь с шарниром"
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;

	}

	//окончания комбинированных стоек

	if (params.banisterMaterial == "40х40 нерж+дуб") {
		//верх стойки
		var partName = "combRackTop";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Верх комб. стойки ",
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt", //единица измерения
					group: "Ограждения",
				};
			}

			var name = "L=" + topLen;
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}

		//низ стойки
		var partName = "combRackBot";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Низ комб. стойки",
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt", //единица измерения
					group: "Ограждения",
				};
			}

			var name = ""
			if (par.isBotFlan) name = "фланц. "
			name += "L=" + Math.round(par.len - topLen - timberPartLen);

			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}

	}

	//сохраняем данные для ведомости заготовок

	if (typeof poleList != 'undefined') {
		var poleType = profSize + "х" + profSize;
		if (params.banisterMaterial == "40х40 черн.") poleType += " черн.";
		if (params.banisterMaterial == "40х40 нерж.") poleType += " нерж.";
		if (params.banisterMaterial == "40х40 нерж+дуб") poleType += " нерж.";

		//формируем массив, если такого еще не было
		if (!poleList[poleType]) poleList[poleType] = [];
		var polePar = {
			len1: botLen,
			len2: botLen,
			len3: botLen,
			angStart: 0,
			angEnd: 0,
			cutOffsetStart: 0,
			cutOffsetEnd: 0,
			poleProfileY: profSize,
			poleProfileZ: profSize,
		}

		polePar.text = par.sectText + " стойки";
		if (params.banisterMaterial == "40х40 нерж+дуб") polePar.text += "(низ)"
		polePar.description = [];
		polePar.description.push(polePar.text);
		polePar.amt = 1;

		poleList[poleType].push(polePar);

		//верх комбинированной стойки
		if (params.banisterMaterial == "40х40 нерж+дуб") {
			var polePar = {
				len1: topLen,
				len2: topLen,
				len3: topLen,
				angStart: 0,
				angEnd: 0,
				cutOffsetStart: 0,
				cutOffsetEnd: 0,
				poleProfileY: profSize,
				poleProfileZ: profSize,
			}

			polePar.text = par.sectText + " стойки(верх)";
			polePar.description = [];
			polePar.description.push(polePar.text);
			polePar.amt = 1;

			poleList[poleType].push(polePar);
		}

	}

	return par;
}//end of drawRack3d_4