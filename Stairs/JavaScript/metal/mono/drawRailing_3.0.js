/**Общая функция для расчета положения точек крепления стекла


*/
function calculateGlassPoints(par){
	var marshPar = getMarshParams(par.marshId);
	var marshTurnParams = calcTurnParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	var rackPos = setRackPos(par.marshId);
	var glassPoints = [];
	var handrailPoints = [];

	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.timberPaint_perila,
	}
	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

	var marshFirstDelta = 0;

	//первая точка марша
	var marshFirst = {
		x: 0,
		y: marshPar.h,
		type: 'first'
	}

	//смещаем начальные координаты стекла, если начало ограждений не с первой ступени
	if (par.marshId == 1 && params.railingStart !== "0") {
		marshFirst.x += marshPar.b * params.railingStart;
		marshFirst.y += marshPar.h * params.railingStart;
	}

	//смещаем начальные координаты стекла, чтобы вертикальный поручень нижнего марша был заподлицо со ступенью
	if (par.marshId == 1 && params.handrailFixType == "паз") {
		marshFirst.x += 45;
	}

	if(marshPar.botTurn == "площадка" && par.key == "in"){
		marshFirstDelta = marshTurnParams.topStepDelta;
		if(params.handrail != "нет"){
			marshFirstDelta += 60 - par.handrailSlotDepth;
		}
	}
	if(marshPar.botTurn == "забег" && par.key == "in"){
		marshFirstDelta += 5;
		if(params.handrail != "нет"){
			marshFirstDelta += 60 - par.handrailSlotDepth;
		}
	}

	marshFirst = newPoint_xy(marshFirst, marshFirstDelta, marshPar.ang * marshFirstDelta);

	if(par.key == 'out' && marshPar.botTurn !== 'пол'){
		marshFirst.x = -marshPar.b * 0.5;
		marshFirst.y = marshPar.h * 0.5;
	}
	var handrailPoint = copyPoint(marshFirst);
	if(par.key == 'out' && marshPar.botTurn !== 'пол'){
		handrailPoint = polar(handrailPoint, marshPar.ang, -10);
	}
	handrailPoints.push(handrailPoint);

	if (marshPar.botTurn == 'пол') {
		marshFirst.y += 20;
	}
	glassPoints.push(marshFirst)

	//центральные точки марша
	for (var i = 0; i < rackPos.length; i++){
		var prevPosition = parseInt(rackPos[i] - 1);
		let xDelta = marshPar.a / 2;
		glassPoints.push({
			x: prevPosition * marshPar.b + xDelta,
			y: marshPar.h * rackPos[i] + (xDelta) * Math.tan(marshPar.ang),
		});
	}
	//последняя точка марша

	var lastMarshPoint = {
		x: marshPar.stairAmt * marshPar.b,
		y: marshPar.h * (marshPar.stairAmt + 1),
	};
	//сдвигаем точку на внешней стороне
	if (par.key == 'in' && marshPar.topTurn !== 'нет' && !marshPar.lastMarsh) {
		var deltaX = marshTurnParams.pltExtraLen - par.treadOffset - par.glassThickness - 20;
		lastMarshPoint = newPoint_xy(lastMarshPoint, deltaX, marshPar.ang * deltaX);
	}

	if((par.key == "out" || (par.key == 'in' && marshPar.lastMarsh)) && marshPar.topTurn !== 'пол'){
		lastMarshPoint.x += marshPar.b * 0.5;
		lastMarshPoint.y += marshPar.h * 0.5;
	}
	var handrailPoint = copyPoint(lastMarshPoint);
	if (par.key == 'out' && marshPar.topTurn !== 'пол'){
		handrailPoint = polar(handrailPoint, marshPar.ang, -10);
	}
	if(params.handrailEndType == 'под углом' && !(par.key == 'out' && marshPar.topTurn !== 'пол')){
		handrailPoint = polar(handrailPoint, marshPar.ang, 40);
	}
	if (params.startVertHandrail == "есть" && params.handrailFixType == "паз") {
		var isShiftLastMarshPoint = false;
		if (params.stairModel == "П-образная с забегом" && marshPar.topTurn == 'забег' && par.key == 'in') isShiftLastMarshPoint = true;
		if (marshPar.topTurn == 'пол') isShiftLastMarshPoint = true;

		if (isShiftLastMarshPoint)
			handrailPoint = newPoint_xy(lastMarshPoint, -29, -29 * Math.tan(marshPar.ang));
	}
	handrailPoints.push(handrailPoint);
	glassPoints.push(lastMarshPoint);

	//Верхний забег
	if(marshPar.topTurn == "забег" && par.key == "out" && !marshPar.lastMarsh){
		var topLast = {
			x: lastMarshPoint.x + marshTurnParams.turnLengthTop + 10 - marshPar.b * 0.5,
			y: lastMarshPoint.y + marshPar.h_topWnd
		};		
		var ang = calcAngleX1(handrailPoints[handrailPoints.length - 1], topLast);
		if (params.handrailFixType == "паз") topLast = polar(topLast, ang, -meterHandrailPar.profY * Math.tan(ang));
		var handrailPoint = copyPoint(topLast);
		//Укорачиваем поручень на стыке
		if (params.handrailFixType !== "паз") handrailPoint = polar(topLast, ang, -100);
		if (params.handrailFixType == "паз") handrailPoint = polar(topLast, ang, -5);

		handrailPoints.push(handrailPoint);
		glassPoints.push(topLast);
	}
	//Нижний забег
	if (marshPar.botTurn == "забег" && par.key == "out") {
		var botFirst = {
			x: -params.M + 15,
			y: -marshPar.h * 0.5,
		};
		var ang = calcAngleX1(botFirst, handrailPoints[0]);

		if (params.handrailFixType == "паз") botFirst = polar(botFirst, ang, meterHandrailPar.profY * Math.tan(ang));
		glassPoints.push(botFirst);
		
		var handrailPoint = copyPoint(botFirst);
		//Укорачиваем поручень на стыке
		if (params.handrailFixType !== "паз") handrailPoint = polar(botFirst, ang, 80);
		if (params.handrailFixType == "паз") handrailPoint = polar(botFirst, ang, 10);
		
		handrailPoints.unshift(handrailPoint);
	}


	//нижняя площадка
	if (marshPar.botTurn == 'площадка') {
		var pltLength = par.platformLengthBottom - 60 - marshPar.b * 0.5;
		var pltGlassAmt = Math.ceil(pltLength / 1000);
		var glassLenX = pltLength / pltGlassAmt;
		var point = null;
		for (var i = 1; i <= pltGlassAmt; i++) {
			point = {
				x: -marshPar.b * 0.5 - glassLenX * i,
				y: marshPar.h * 0.5,
			}
			glassPoints.push(point);
		}
		if (point) {
			handrailPoints.unshift(point);//Укорачиваем поручень на стыке
		}
	}
	//верхняя площадка
	if(marshPar.topTurn == 'площадка'){
		var pltLength = par.platformLengthTop - marshPar.b / 2 + 45;
		var pltGlassAmt = Math.ceil(pltLength / 1000);
		var glassLenX = pltLength / pltGlassAmt;
		if(marshPar.lastMarsh){
			glassLenX -= 45 / pltGlassAmt
		}
		var point = null;
		for (var i = 1; i <= pltGlassAmt; i++){
			point = {
				x: lastMarshPoint.x + glassLenX * i,
				y: lastMarshPoint.y,
			}
			glassPoints.push(point);
		}
		if(point){
			handrailPoints.push(newPoint_xy(point, 30, 0));//Удлинняем поручень до края площадки
		}
	}
	
	
	//заднее ограждение верхней площадки
	if(par.marshId == "topPlt"){
		glassPoints = [];
		var p1 = {x: -params.M / 2, y:0,}
		var p2 = newPoint_xy(p1, params.M + 10, 0);
		
		glassPoints.push(p1, p2)
	
	}
	//marshId: "topPlt"

	glassPoints.sort(function (a, b){
		return a.x - b.x;
	});

	var finalGlassPoints = [];
	for (var i = 0; i < glassPoints.length - 1; i++){
		let point = glassPoints[i];
		let nextPoint = glassPoints[i + 1];
		finalGlassPoints.push({
			x: point.x,
			y: point.y,
			len: nextPoint.x - point.x - 10,
			ang: calcAngleX1(point, nextPoint),
		});
	}

	if(params.handrail != "нет"){
		par.handrailPoints = handrailPoints;
	}

	par.marshPar = marshPar;
	par.marshTurnParams = marshTurnParams;
	par.prevMarshPar = prevMarshPar;
	par.nextMarshPar = nextMarshPar;
	par.glassPoints = finalGlassPoints;
}

function calcWndHoles(par, placeMod){
	if(!placeMod) var placeMod = 'top';
	var placeFactor = placeMod == 'top' ? 1 : -1;
	var marshTurnParams = calcTurnParams(par.marshId);
	var nextpar = getMarshParams(par.nextMarshId);
	var stepH = placeMod == 'top' ? nextpar.h : par.h;
	var startPoint = { // todo: взять точку из calculateGlassPoints
		x: par.stairAmt * par.b + par.b * 0.5,
		y: par.h * (par.stairAmt + 1),
	};
	var pltHoleOffsetX = 50; // отступ отверстия от края стекла
	var pltLength = placeMod == 'top' ? marshTurnParams.turnLengthTop + 10 : params.M;
	if(placeMod == 'bot'){ //корректируем положение для рассчета нижнего поворота
		startPoint.x = -(10 + par.b * 0.5);
		startPoint.y = -stepH * 2;
		pltLength -= par.b * 0.5;
	}
	var center1 = newPoint_xy(startPoint, pltHoleOffsetX * placeFactor, -par.treadOffset);//TODO FIXME
	var center2 = newPoint_xy(startPoint, (pltLength - 135 - pltHoleOffsetX) * placeFactor, stepH - par.treadOffset);
	if(placeMod == 'bot'){ //корректируем положение для рассчета нижнего поворота
		center1.y += stepH * 2;
		center2 = newPoint_xy(startPoint, (pltLength - 65) * placeFactor, stepH - par.treadOffset);
	};
	var center3 = newPoint_xy(center1, 0, -par.holderHoleDist);
	var center4 = newPoint_xy(center2, 0, -par.holderHoleDist);

	center1.hasHolder = center2.hasHolder = true;
	center1.holderType = center2.holderType = 'oneSideCenter';
	//сдвоенный кронштейн на последнем стекле если есть стыковка со следующей секцией
	if(par.topConnection) center2.holderType = 'corner';
	if(par.botConnection && placeMod == 'bot') center2.hasHolder = false;

	par.holes.push(center1);
	par.holes.push(center2);
	par.holes.push(center3);
	par.holes.push(center4);
}

function calcPltHoles(par, placeMod){
	if(!placeMod) var placeMod = 'top';
	var placeFactor = placeMod == 'top' ? 1 : -1
	var startPoint = { // todo: взять точку из calculateGlassPoints
		x: par.stairAmt * par.b + par.b * 0.5,
		y: par.h * (par.stairAmt + 1),
	};
	var marshTurnParams = calcTurnParams(par.marshId);
	var pltLength = placeMod == 'top' ? par.platformLengthTop : par.platformLengthBottom - par.b * 0.5;
	if(placeMod == 'bot'){ //корректируем положение для рассчета нижнего поворота
		startPoint.x = -(10 + par.b * 0.5);//FIXME
		startPoint.y = 0;
		pltLength -= 60;//+par.b * 0.5;//FIXME
	}
	if(placeMod == 'top'){
		pltLength = par.platformLengthTop - par.b / 2 + 45;
	}
	if(placeMod == "rear"){
		pltLength = params.M;
		}
	var pltGlassAmt = Math.ceil(pltLength / 1000);
	var glassLenX = pltLength / pltGlassAmt;
	if(par.lastMarsh && placeMod == 'top'){
		glassLenX -= 45 / pltGlassAmt
	}
	
	//заднее ограждение верхней площадки или промежуточной П-образной лестницы
	if(placeMod == "rear"){
		startPoint = {
			x: -params.M / 2,
			y: 0,
		};
		placeFactor = 1
		}
		
	var pltHoleOffsetX = 50; // отступ отверстия от края стекла
	for (var i = 0; i < pltGlassAmt; i++){
		var glassBasePoint = newPoint_xy(startPoint, placeFactor * glassLenX * i, -par.treadOffset);
		var center1 = newPoint_xy(glassBasePoint, pltHoleOffsetX * placeFactor, 0);
		var center2 = newPoint_xy(glassBasePoint, (glassLenX - pltHoleOffsetX) * placeFactor, 0);
		if(pltGlassAmt > 1 && placeMod == 'top' && i < pltGlassAmt - 1) center2.x -= 10; //корректируем положение для рассчета нижнего поворота
		var center3 = newPoint_xy(center1, 0, -par.holderHoleDist);
		var center4 = newPoint_xy(center2, 0, -par.holderHoleDist);

		center1.hasHolder = center2.hasHolder = true;
		center1.holderType = center2.holderType = 'oneSideCenter';

		//сдвоенный кронштейн на последнем стекле если есть стыковка со следующей секцией
		if(par.topConnection && i == pltGlassAmt - 1) center2.holderType = 'corner';
		if(par.botConnection && placeMod == 'bot' && i == pltGlassAmt - 1) center2.hasHolder = false;
		
		//наличие кронштейнов на заднем ограждении если есть сдвоенный кронштейн на углу
		if(placeMod == "rear"){
			if(params.topPltRailing_4) center1.hasHolder = false;
			if(params.topPltRailing_3) center2.hasHolder = false;
			}
		

		par.holes.push(center1);
		par.holes.push(center2);
		par.holes.push(center3);
		par.holes.push(center4);
	}
}



function calcGlassHoles(marshId, key){
	var par = getMarshParams(marshId);
	par.marshId = marshId;
	par.key = key;

	var prevpar = getMarshParams(par.prevMarshId);
	var nextpar = getMarshParams(par.nextMarshId);
	var marshTurnParams = calcTurnParams(par.marshId);
	var holeOffset = 25;
	var treadOffset = par.treadOffset = params.treadThickness / 2;// - 10;
	var holderHoleDist = par.holderHoleDist = 150;
	setRailingParams(par);
	par.holes = [];


	//верхний поворот площадка

	if(par.topTurn == 'площадка'){
		calcPltHoles(par, 'top');
	}
	if(par.botTurn == 'площадка'){
		calcPltHoles(par, 'bot');
	}
	if(par.topTurn == 'забег'){
		calcWndHoles(par, 'top');
	}
	if(par.botTurn == 'забег'){
		calcWndHoles(par, 'bot');
	}
	// Рассчет отверстий марша
	var index = 1;
	if (marshId == 1 && params.railingStart !== "0") index += +params.railingStart;//если начало ограждений не с первой ступени
	for (var i = index; i < par.stairAmt + 1; i++){ //Все остальные отверстия марша
		// if(i !== par.stairAmt + 1){
		par.holes.push({
			x: par.b * (i - 1) + par.a - holeOffset,
			y: par.h * i - treadOffset
		});
		par.holes.push({
			x: par.b * (i - 1) + holeOffset,
			y: par.h * i - treadOffset
		});
		// }
	}

	if(marshId == "topPlt"){
		par.holes = [];
		calcPltHoles(par, 'rear');
	}
	
	return par;
} //end of calcGlassHoles

function drawGlassSection(par){

	var section = new THREE.Object3D();
	var handrails = new THREE.Object3D();
	/** Задаем параметры для рассчета стекол */
	par.handrailSlotDepth = 15;
	par.treadOffset = 14;
	par.glassThickness = 12;

	setRailingParams(par);
	calculateGlassPoints(par);
	var glassThickness = par.glassThickness;
	var glassOffsetY = par.glassOffsetY = par.marshPar.h * 2;
	var rackProfile = 40;
	var treadOffset = par.treadOffset;
	var glassOffsetZ = treadOffset;
	var holeRad = 9;
	var sectionHeight = 800;
	if(params.turnSide == 'левое'){
		glassOffsetZ *= -1;
	}
	if((par.key == 'in' && params.stairModel !== "Прямая") || (par.key == 'out' && params.stairModel == "Прямая")){
		if(params.turnSide == 'левое') glassOffsetZ -= glassThickness;
	}
	if((par.key == 'out' && params.stairModel !== "Прямая") || (par.key == 'in' && params.stairModel == "Прямая")){
		if(params.turnSide == 'левое'){
			glassOffsetZ = - glassOffsetZ;
		} else {
			glassOffsetZ = - glassThickness - glassOffsetZ;
		}
	}
	if(par.marshId == "topPlt"){
		glassOffsetY = par.glassOffsetY = 270;
		sectionHeight += 90;
		glassOffsetZ = par.treadOffset;
	}

	var holes = calcGlassHoles(par.marshId, par.key).holes;
	for (var i = 0; i < par.glassPoints.length; i++){
		var filteredHoles = [];
		for (var j = 0; j < holes.length; j++){
			var hole = Object.assign({}, holes[j]);
			if(hole.x < par.glassPoints[i].x + par.glassPoints[i].len && hole.x > par.glassPoints[i].x){
				hole.x -= par.glassPoints[i].x;
				hole.y -= par.glassPoints[i].y;
				hole.y += glassOffsetY;
				if(hole.x < 40 + holeRad && par.glassPoints[i].x >= 0){
					hole.x += 40 + holeRad - hole.x;
				}
				hole.rad = holeRad;
				//if(hole.x + 40 + holeRad > par.glassPoints[i].len && !hole.hasHolder){
				// 	hole.x -= (40 + holeRad) - par.glassPoints[i].len - hole.x;
				// }
				filteredHoles.push(hole);
			}
		}

		var glassPar = {
			angleTop: par.glassPoints[i].ang,
			// angleBot: 0, //par.glassPoints[i].ang,
			heightLeft: sectionHeight + glassOffsetY,
			width: par.glassPoints[i].len,
			thk: glassThickness,
			holeCenters: filteredHoles
		}
		if(i == 0 && par.marshPar.botTurn == 'пол'){
			glassPar.botCutHeight = glassOffsetY - par.marshPar.h;
		}
		glassPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, par.glassPoints[i].x, par.glassPoints[i].y);
		var glass = drawGlass2(glassPar).mesh;
		glass.position.x = par.glassPoints[i].x;
		glass.position.y = par.glassPoints[i].y - glassOffsetY;
		glass.position.z = glassOffsetZ;
		section.add(glass);

		//отрисовка сварных кронштейнов
		
		for (var j = 0; j < glassPar.holeCenters.length; j++){
			if(glassPar.holeCenters[j].hasHolder){
				var holderPosition = newPoint_xy(glass.position, glassPar.holeCenters[j].x, glassPar.holeCenters[j].y);
				var anglePar = {
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, holderPosition.x, holderPosition.y),
					dxfPrimitivesArr: dxfPrimitivesArr,
					type: glassPar.holeCenters[j].holderType
				}
				var holderMesh = drawGlassAngle2(anglePar).mesh;
				holderMesh.position.x = holderPosition.x;
				holderMesh.position.y = holderPosition.y;
				holderMesh.position.z = 0;//glassThickness;
				
				var marshPar = getMarshParams(par.marshId);
				var side = marshPar.side[par.key];
				
				if(side == 'left'){
					holderMesh.position.z -= 20 + 8 + 0.01; //подогнано
				}
				
				if(side == 'right' || par.marshId == "topPlt"){
					holderMesh.rotation.y = Math.PI;
					holderMesh.position.z += 20 + 8 + 0.01; //подогнано
				}
				
				
				section.add(holderMesh);
			}
		}
	}
	
	//сохраняем массив точек в отдельную переменную
	var handrailPoints0 = par.handrailPoints;

	//поручни
	if(params.handrail != "нет"){
		var handrailParams = {
			points: par.handrailPoints,
			side: par.railingSide,
			offset: 15,
			extraLengthStart: 10,
			extraLengthEnd: 10,
			connection: params.handrailConnectionType,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, sectionHeight + glassOffsetY),
			fixType: params.handrailFixType,
			sectText: '',
		}


		// вертикальные участки
		if(params.startVertHandrail == "есть" && params.handrailFixType == "паз"){
			//начало секции
			//первый марш
			if(par.marshId == 1){
				var startPoint = {
					x: handrailParams.points[0].x,
					y: -sectionHeight,
				}
				//newPoint_xy(handrailParams.points[0], 0, -glassHeight);
				handrailParams.points.unshift(startPoint);
			}

		}
		

		if(par.marshPar.botTurn == 'забег' && par.key == 'in' && params.handrailFixType == "паз"){
			// handrailParams.points[0] = newPoint_xy(handrailParams.points[0], par.handrailSlotDepth, par.glassPoints[0].ang * par.handrailSlotDepth);
			if(params.handrailFixType == "паз")
				var startPoint = newPoint_xy(handrailParams.points[0], 0, -(sectionHeight + par.marshPar.h * 3 + glassOffsetY));
			handrailParams.points.unshift(startPoint);
		}
		
		if(par.marshPar.botTurn == 'площадка' && par.key == 'in' && params.handrailFixType == "паз"){
			// handrailParams.points[0] = newPoint_xy(handrailParams.points[0], par.handrailSlotDepth, par.glassPoints[0].ang * par.handrailSlotDepth);
			var startPoint = newPoint_xy(handrailParams.points[0], 0, -(sectionHeight + glassOffsetY + par.marshPar.h));
			handrailParams.points.unshift(startPoint);
		}

		if (params.startVertHandrail == "есть" && params.handrailFixType == "паз") {
			var isDrawHandrail = false;
			if (params.stairModel == "П-образная с забегом" && par.marshPar.topTurn == 'забег' && par.key == 'in') isDrawHandrail = true;
			if (par.marshPar.topTurn == 'пол') isDrawHandrail = true;
			if (isDrawHandrail) {
				var endPoint = newPoint_xy(handrailParams.points[handrailParams.points.length - 1], 0, -(sectionHeight + glassOffsetY));
				handrailParams.points.push(endPoint);
			}
		}

		handrailParams = drawPolylineHandrail(handrailParams);
		var handrail = handrailParams.mesh;
		handrail.position.y = sectionHeight;

		if (params.handrailFixType == "паз") { //40 ширина поручня
			var key = par.key;
			if (params.stairModel == "Прямая") {
				if (par.key == 'in') key = 'out';
				if (par.key == 'out') key = 'in';
			}

			if(key == 'out') handrail.position.z = -((treadOffset - 10) + 40 + 20 + glassThickness / 2);
			if(key == 'in') handrail.position.z = (treadOffset - 10) + 40 + 20 + glassThickness / 2;
			if(params.turnSide == 'левое'){
				if(key == 'in') handrail.position.z = -((treadOffset - 10) + 40 + 20 + glassThickness / 2);
				if(key == 'out') handrail.position.z = ((treadOffset - 10) + 40 + 20 + glassThickness / 2);
			}
			
		}
		handrails.add(handrail);

	} //конец поручней
	
	//сохраняем данные для спецификации
	if (typeof railingParams != 'undefined') {
		if (!railingParams.sections) {
			railingParams.sections = {
				types: [],
				sumLen: 0,
			}
		}
		for(var i=1; i<handrailPoints0.length; i++){
			var sectLen = distance(handrailPoints0[i-1], handrailPoints0[i]);
			railingParams.sections.types.push(sectLen);
			railingParams.sections.sumLen += sectLen / 1000;
			}
		}



	var result = {
		mesh: section,
		handrails: handrails,
	}
	return result;
}

//кронштейны для самонесущего стекла
function drawGlassAngle2(par){
	var glassAngleMaterial = new THREE.MeshLambertMaterial({
		color: 0xFF0000
	});
	var dxfBasePoint = par.dxfBasePoint;
	var dxfPrimitivesArr = par.dxfPrimitivesArr;
	var type = par.type;

	var thk = 8;
	var frontEdgeRad = 10;

	//ширина, высота части прилегающей к стеклу
	var bw1 = 100;
	var bh1 = 190;
	var smallDiam1 = 18;
	var smallCenterTopOffset1 = 20;
	var bigDiam1 = 60;

	//ширина, высота части прилегающей к площадке
	var bw2 = bw1 - 2 * thk;
	var bh2 = 150 - thk;
	var smallDiam2 = 13;
	var smallCenterOffset2 = 15;

	//ширина, высота треугольных частей
	var bw3 = bh2;
	var bh3 = bh1 - params.treadThickness;
	var bigDiam3 = 60;
	var bigCenterTopOffset3 = bh1 / 2 - params.treadThickness;
	var bigCenterLeftOffset3 = 40;

	var glassAngleObject = new THREE.Object3D();

	var extrudeOptions = {
		amount: thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	if(type == "oneSideCenter" || type == "oneSideEdge"){
		//отрисовка части прилегающей к стеклу

		var shape = new THREE.Shape();
		var p0 = {
			x: 0,
			y: 0
		};
		var p1 = newPoint_xy(p0, 0, bh1);
		addLine(shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
		var p2 = newPoint_xy(p1, bw1, 0);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, 0, -bh1);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, -bw1, 0);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

		var center = {
			x: bw1 / 2,
			y: smallCenterTopOffset1
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam1 / 2, dxfBasePoint);

		center = {
			x: bw1 / 2,
			y: bh1 - smallCenterTopOffset1
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam1 / 2, dxfBasePoint);

		center = {
			x: bw1 / 2,
			y: bh1 / 2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, bigDiam1 / 2, dxfBasePoint);

		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glassAnglePart1 = new THREE.Mesh(geometry, glassAngleMaterial);
		glassAngleObject.add(glassAnglePart1);
		addText("1шт.", 30, dxfPrimitivesArr, newPoint_xy(dxfBasePoint, 20, -60));

		//отрисовка части прилегающей к площадке
		dxfBasePoint = newPoint_xy(dxfBasePoint, bw1 + 50, 0);
		var shape = new THREE.Shape();
		var p0 = {
			x: 0,
			y: 0
		};
		var p1 = newPoint_xy(p0, 0, bh2);
		addLine(shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
		var p2 = newPoint_xy(p1, bw2, 0);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, 0, -bh2);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, -bw2, 0);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

		var center = {
			x: smallCenterOffset2,
			y: smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		center = {
			x: smallCenterOffset2,
			y: bh2 - smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		center = {
			x: bw2 - smallCenterOffset2,
			y: smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		center = {
			x: bw2 - smallCenterOffset2,
			y: bh2 - smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glassAnglePart2 = new THREE.Mesh(geometry, glassAngleMaterial);
		glassAnglePart2.rotation.x = Math.PI / 2;
		glassAnglePart2.position.x = thk;
		glassAnglePart2.position.z = thk;
		glassAnglePart2.position.y = bh1 - params.treadThickness;

		glassAngleObject.add(glassAnglePart2);
		addText("1шт.", 30, dxfPrimitivesArr, newPoint_xy(dxfBasePoint, 20, -60));

		//отрисовка треугольных частей

		dxfBasePoint = newPoint_xy(dxfBasePoint, bw2 + 50, 0);
		var shape = new THREE.Shape();
		var p0 = {
			x: 0,
			y: 0
		};
		var p1 = newPoint_xy(p0, 0, bh3);
		addLine(shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
		var p2 = newPoint_xy(p1, bw3, 0);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, 0, -thk);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		addLine(shape, dxfPrimitivesArr, p2, p0, dxfBasePoint);

		var center = {
			x: bigCenterLeftOffset3,
			y: bh3 - bigCenterTopOffset3
		};
		addRoundHole(shape, dxfPrimitivesArr, center, bigDiam3 / 2, dxfBasePoint);

		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glassAnglePart3 = new THREE.Mesh(geometry, glassAngleMaterial);
		glassAnglePart3.rotation.y = -Math.PI / 2;
		glassAnglePart3.position.x = thk;
		glassAnglePart3.position.z = thk;
		glassAnglePart3.position.y = 0;

		glassAngleObject.add(glassAnglePart3);

		var glassAnglePart4 = glassAnglePart3.clone();
		glassAnglePart4.position.x = bw1;

		glassAngleObject.add(glassAnglePart4);
		addText("2шт.", 30, dxfPrimitivesArr, newPoint_xy(dxfBasePoint, 20, -60));
	}
	else if (type == "corner") {
		//отрисовка частей прилегающих к стеклу

		var shape = new THREE.Shape();
		var p0 = {
			x: 0,
			y: bh1 / 2
		};
		var p1 = newPoint_xy(p0, 0, bh1 / 2);
		var p2 = newPoint_xy(p1, bw1, 0);
		var fil1 = calcFilletParams1(p0, p1, p2, frontEdgeRad, false);
		addLine(shape, dxfPrimitivesArr, p0, fil1.start, dxfBasePoint);
		addArc2(shape, dxfPrimitivesArr, fil1.center, frontEdgeRad, fil1.angstart, fil1.angend, true, dxfBasePoint)
		addLine(shape, dxfPrimitivesArr, fil1.end, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, 0, -bh1);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, -bw1, 0);
		var p3 = newPoint_xy(p2, 0, bh1 / 2);
		var fil1 = calcFilletParams1(p1, p2, p3, frontEdgeRad, false);
		addLine(shape, dxfPrimitivesArr, p1, fil1.start, dxfBasePoint);
		addArc2(shape, dxfPrimitivesArr, fil1.center, frontEdgeRad, fil1.angstart, -fil1.angend, true, dxfBasePoint)
		addLine(shape, dxfPrimitivesArr, fil1.end, p3, dxfBasePoint);

		var center = {
			x: bw1 / 2,
			y: smallCenterTopOffset1
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam1 / 2, dxfBasePoint);

		center = {
			x: bw1 / 2,
			y: bh1 - smallCenterTopOffset1
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam1 / 2, dxfBasePoint);

		center = {
			x: bw1 / 2,
			y: bh1 / 2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, bigDiam1 / 2, dxfBasePoint);

		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glassAnglePart1 = new THREE.Mesh(geometry, glassAngleMaterial);
		glassAngleObject.add(glassAnglePart1);

		var glassAnglePart2 = glassAnglePart1.clone();
		glassAnglePart2.rotation.y = Math.PI / 2;
		glassAnglePart2.position.x = bw1;
		glassAnglePart2.position.z = bw1 + thk;
		glassAngleObject.add(glassAnglePart2);
		addText("2шт.", 30, dxfPrimitivesArr, newPoint_xy(dxfBasePoint, 20, -60));

		//отрисовка части прилегающей к площадке

		dxfBasePoint = newPoint_xy(dxfBasePoint, bw1 + 50, 0);
		var shape = new THREE.Shape();
		var p0 = {
			x: 0,
			y: 0
		};
		var p1 = newPoint_xy(p0, 0, bw1);
		var p2 = newPoint_xy(p1, bw1, 0);
		var fil1 = calcFilletParams1(p0, p1, p2, frontEdgeRad, false);
		addLine(shape, dxfPrimitivesArr, p0, fil1.start, dxfBasePoint);
		addArc2(shape, dxfPrimitivesArr, fil1.center, frontEdgeRad, fil1.angstart, fil1.angend, true, dxfBasePoint)
		addLine(shape, dxfPrimitivesArr, fil1.end, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, 0, -bw1);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
		var p1 = copyPoint(p2);
		var p2 = newPoint_xy(p2, -bw1, 0);
		addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

		var center = {
			x: smallCenterOffset2,
			y: smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		center = {
			x: smallCenterOffset2,
			y: bw1 - smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		center = {
			x: bw1 - smallCenterOffset2,
			y: smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		center = {
			x: bw1 - smallCenterOffset2,
			y: bw1 - smallCenterOffset2
		};
		addRoundHole(shape, dxfPrimitivesArr, center, smallDiam2 / 2, dxfBasePoint);

		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glassAnglePart2 = new THREE.Mesh(geometry, glassAngleMaterial);
		glassAnglePart2.rotation.x = Math.PI / 2;
		glassAnglePart2.position.z = thk;
		glassAnglePart2.position.y = bh1 - params.treadThickness;

		glassAngleObject.add(glassAnglePart2);
		addText("1шт.", 30, dxfPrimitivesArr, newPoint_xy(dxfBasePoint, 20, -60));
	}

	addText("Кронштейн площадки", 30, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 20, -120));
	// par.mesh = glassAngleObject;
	var positionFixMesh = new THREE.Object3D();
	glassAngleObject.position.x = -bw1 / 2;
	glassAngleObject.position.y = -bh1 + smallCenterTopOffset1;
	glassAngleObject.position.z = 20;
	positionFixMesh.add(glassAngleObject);
	par.mesh = positionFixMesh;
	return par;
}

/** Функция отрисовывает массив стоек*/
function drawRacksMono(par){
	var section = new THREE.Object3D();

	par.sect = section;
	//задаем длину стоек от уровня ступени
	par.rackLength = 800;
	par.handrailTurnOffset = 50; //смещение точки перелома поручня от стойки
	//параметры марша
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);

	setRailingParams(par);
	//рассчитываем длины и расположение стоек
	calculateRacks(par);
	if(par.racks.length == 0) return section;

	var textHeight = 30;
	addText(par.text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -50));
	
	var racks = par.racks;

	
	var rackProfile = 40;
	var railingPositionZ = 0;
	if(turnFactor === -1) railingPositionZ = -rackProfile;
	
	
	//отрисовка стоек

	for (var i = 0; i < racks.length; i++){
		if(racks[i].noDraw) continue;
		var rackParams = {
			type: racks[i].type,
			isFirst: racks[i].isFirst,
			len: racks[i].len,
			railingSide: marshPar.side[par.key],
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, racks[i].x, racks[i].y),
			dxfArr: dxfPrimitivesArr,
			holderAng: racks[i].holderAng * turnFactor,
			turnSide: params.turnSide,
			marshId: par.marshId,
            key: par.key,
            isFirstFlan: racks[i].isFirstFlan,
			}
		
		if(!racks[i].isTurnRackStart && !racks[i].isTurnRackEnd){
			drawRackMono(rackParams);
			var rack_mesh = rackParams.mesh;
			rack_mesh.position.x = racks[i].x;
			rack_mesh.position.y = racks[i].y; // + racks[i].len;
			rack_mesh.position.z = railingPositionZ;
			//if(turnFactor == -1) rack_mesh.rotation.y = -Math.PI;
			section.add(rack_mesh);
			}
			
		
	}

	var result = {
		mesh: section,
		}
	return result;
}


/**
  drawRackMono - отрисовывает обычную стойку ограждения
	INPUT:
	  * type: first || middle || last || turnRackEnd || turnRackStart
	  * railingSide: Сторона поручня
	  * material: материал стойки
	  * dxfBasePoint: -
	  * dxfArr: dxfPrimitivesArr,
	  * holderAng: угол крепежа
	  * stepH: высота ступеньки первого марша
	  * nextStepH: высота ступеньки второго марша
	  * treadOffset: 36 Отступ от края нижней ступени

	OUTPUT:
	  * mesh готовой стойки
*/

// Функция рисует стойки в зависимости от типа
function drawRackMono(par){

	par.mesh = new THREE.Object3D();
	
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	
	var metalMaterial = params.materials.metal;
	if(params.banisterMaterial != "40х40 черн.") metalMaterial = params.materials.inox;

	var rackProfile = 40 - 0.02;
	var bottomHoleOffset = 20;
	var holeDiam = 6;
	var banisterAngleOffset = 16;
	var banisterFlanThk = 8; //толщина фланца L-образной стойки
	var sideLen = 120; //длина уступа L-образной стойки
	//к-т, учитывающий сторону ограждения
	var sideFactor = 1;
	if (par.railingSide === "left") sideFactor = -1;

	//сдвиг первой стойки первого марша, чтобы стойка не пересекала пригласительную ступень
	
	var isFirstMove = false;
	if (par.isFirst && params.railingStart != 0) {
		if (params.startTreadAmt == params.railingStart && (params.arcSide == par.railingSide || params.arcSide == "two"))
			isFirstMove = true;
	}

	//расчет длины нижней части стойки (ниже уровня ступени)
	var botLen = marshPar.h; //длина от верха ступени до низа стойки
	if(par.type == 'middle') botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
	if (par.type == 'last') botLen = params.treadThickness + rackProfile + banisterFlanThk;
	if(par.type == 'turnRackStart'){
		//Г-образный поворот
		if(params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
			botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset + prevMarshPar.h;
			if (marshPar.botTurn == "забег") botLen += marshPar.h * 2;
			if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 3 && params.stairAmt2 == 0 && params.turnType_1 !== "забег")
				botLen -= prevMarshPar.h;
			}
		//П-образный поворот
		if(params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом"){
			botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
			if (marshPar.botTurn == "забег") {
				if (marshPar.botTurn == "забег") {
					if (params.marshDist > 40)
						botLen += marshPar.h * 3;
					else
						botLen += marshPar.h * 5;
				}
			}
			}
		} 
	if(par.type == 'turnRackEnd'){
		//Г-образный поворот
		if(params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
			botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset + prevMarshPar.h;
			if(marshPar.botTurn == "забег") botLen += marshPar.h * 3;
			}
		//П-образный поворот
		if(params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом"){
			botLen = params.treadThickness + bottomHoleOffset + banisterAngleOffset + marshPar.h;
			}
    } 
    if (par.isFirstFlan) {
        botLen -= params.treadThickness + bottomHoleOffset + banisterAngleOffset;
        if (params.botFloorType == "черновой") botLen += params.botFloorsDist;
    } 

	
	var points = [];
	var p0 = {x: 0,	y: 0,}; //точка на оси стойки на уровне верха ступени
	
	//верхние точки
	var p1 = newPoint_xy(p0, -rackProfile / 2, par.len);
	var p2 = newPoint_xy(p0, rackProfile / 2, par.len);	
	points.push(p1, p2)
	var topPoint = copyPoint(p1); //сохраняем точку
	
	//нижние точки
	if(par.type != 'last'){
		var p3 = newPoint_xy(p0, rackProfile / 2, -botLen);
		var p4 = newPoint_xy(p0, -rackProfile / 2, -botLen);
		points.push(p3, p4)
		}
	if(par.type == 'last'){
		var p3 = newPoint_xy(p0, rackProfile / 2, -botLen);
		var p4 = newPoint_xy(p3, -(sideLen + rackProfile), 0);
		var p5 = newPoint_xy(p4, 0, rackProfile);
		var p6 = newPoint_xy(p5, sideLen, 0);
		points.push(p3, p4, p5, p6)
		}
	
	if(params.banisterMaterial == "40х40 нерж+дуб"){
		var topPartLen = 120;
		var timberPartLen = 600;
		points[0].y -= topPartLen + timberPartLen;
		points[1].y -= topPartLen + timberPartLen;
		}
		
	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		}

	var shape = drawShapeByPoints2(shapePar).shape;
	
	//отверстия под уголки
	var holeCenters = [];
	if(par.type == 'first' || par.type == 'middle'){
		//верхнее отверстие
		var center1 = newPoint_xy(p0, 0, -params.treadThickness - banisterAngleOffset);
		holeCenters.push(center1)
		if (params.stairModel == "П-образная трехмаршевая" && par.key == "in" && par.marshId == 1 && params.stairAmt2 == 0 && marshPar.topTurn == "площадка") {
			center1.anglePos = 'справа';
		}
		//нижнее отверстие
		if(par.type == 'middle'){
			var center2 = newPoint_xy(center1, 0, -marshPar.h);
			//уголок первой стойки к пригласительной ступени
			if (isFirstMove) center2.anglePos = 'слева';
			
			holeCenters.push(center2);
		}
		//размер для спецификации
		var sizeA = botLen + center1.y;
		if(par.type == 'middle') sizeA = distance(center1, center2)
		
		}
	if(par.type == 'turnRackStart' || par.type == 'turnRackEnd'){
		var rackPar = {
			marshId: par.marshId,
            type: par.type,
            isFirstFlan: par.isFirstFlan,
			}
		holeCenters = setTurnRackHoles(rackPar).holes;
		}
	
	

	var holesPar = {
		holeArr: [],
		dxfBasePoint: par.dxfBasePoint,
		shape: shape,
		holeRad: holeDiam / 2,
		}
	for(var i=0; i<holeCenters.length; i++){
		if(holeCenters[i].y <= points[0].y){
			holesPar.holeArr.push(holeCenters[i]);
		}
	}
	
	addHolesToShape(holesPar);
	
	var extrudeOptions = {
		amount: rackProfile,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
		
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var rack = new THREE.Mesh(geom, metalMaterial);
	if(par.type == 'last'){
		rack.position.z = rackProfile / 2;
		rack.rotation.y = -Math.PI / 2;
		rack.position.x = rackProfile / 2;
		if(par.railingSide == "left"){
			rack.rotation.y = Math.PI / 2;
			rack.position.x = -rackProfile / 2;
			}
		}
	rack.position.z += 0.01 * sideFactor;
	par.mesh.add(rack);
	
	//вставка и верхняя часть комбинированной стойки
	if(params.banisterMaterial == "40х40 нерж+дуб"){
		
		//вставка

		var pt1 = newPoint_xy(points[0], 0, 0);
		var pt2 = newPoint_xy(pt1, 0, timberPartLen)
		var pt3 = newPoint_xy(pt2, rackProfile, 0)
		var pt4 = newPoint_xy(pt1, rackProfile, 0)

		var points = [pt1, pt2, pt3, pt4];

		//создаем шейп
		var shapePar = {
			points: points,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			}

		var shape = drawShapeByPoints2(shapePar).shape;

		var holesPar = {
			holeArr: [],
			dxfBasePoint: par.dxfBasePoint,
			shape: shape,
			holeRad: holeDiam / 2,
			}
		for(var i=0; i<holeCenters.length; i++){
			if(holeCenters[i].y > points[0].y){
				holesPar.holeArr.push(holeCenters[i]);
			}
		}
		
		addHolesToShape(holesPar);
		
		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, params.materials.timber);
		par.mesh.add(rack);

		//верх

		var pt1 = newPoint_xy(pt2, 0, 0);
		var pt2 = newPoint_xy(pt1, 0, topPartLen)
		var pt3 = newPoint_xy(pt2, rackProfile, 0)
		var pt4 = newPoint_xy(pt1, rackProfile, 0)

		var points = [pt1, pt2, pt3, pt4];

		//создаем шейп
		var shapePar = {
			points: points,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			}

		var shape = drawShapeByPoints2(shapePar).shape;
		
		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, metalMaterial);
		par.mesh.add(rack);
		
	}
	//добавлем уголки
	
	var angPar = {
		holeCenters: holeCenters,
		railingSide: par.railingSide,
		dxfBasePoint: par.dxfBasePoint,
		}
	var angles = addRackAngles(angPar).mesh;
	par.mesh.add(angles);

	//фланцы
	if(par.type == 'first' || par.isFirstFlan){
		var flanPar = {
            dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
            marshId: par.marshId,
			}
		var botFlan =  drawPlatformRailingFlan(flanPar).mesh;
		botFlan.position.z = rackProfile / 2;
		botFlan.position.y = p3.y;
		par.mesh.add(botFlan);
		}
	
	if(par.type == 'last'){
		var flanPar = {
            dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
            marshId: par.marshId,
			}
		var botFlan =  drawLastRackFlan(flanPar).mesh;
		botFlan.rotation.y = Math.PI / 2;
		botFlan.position.z = -sideLen / 2 - 5
		if(par.railingSide === "left"){
			botFlan.position.z = sideLen / 2 + rackProfile + 5
			}
		botFlan.position.y = p3.y + rackProfile;
		par.mesh.add(botFlan);
		}
		
	//кронштейн поручня
	var holderParams = {
		angTop: par.holderAng * turnFactor,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, topPoint.y),
		isForge: false,
		}
	var holder = drawHandrailHolder(holderParams).mesh;
	holder.position.x = 0;
	holder.position.y = topPoint.y;
	holder.position.z = rackProfile / 2;

	par.mesh.add(holder)

	//кронштейн поручня к поворотному столбу (отрисовывается вместе с первой стойкой марша)

	if ((par.type == "first" || par.isFirst) && 
		par.key == "in" &&
		nextMarshPar.hasRailing.in && 
		params.stairModel != "П-образная с площадкой" &&
		params.stairModel != "П-образная с забегом"	&&
		params.stairModel != "Прямая"
		) {

		//определяем точку вставки кронштейна
		var handrailAng = Math.abs(par.holderAng)
		var dist = 53 + 17 / Math.cos(handrailAng);//расстояние по вертикали от верха стойки до поручня
		var pt = newPoint_xy(topPoint, rackProfile / 2, dist);
		var pt1 = newPoint_xy(pt, marshPar.b * marshPar.stairAmt - rackProfile / 2, 0);
		pt1.x -= 0.05;
		
		//учитываем что на среднем марше если поворот - площадка, длина марша отличается на nose
		if(par.marshId == 2 && params.turnType_1 == "площадка"){
			pt1.x -= params.nose;
			}

		if (params.railingStart != 0) {
			pt1.x -= marshPar.b * params.railingStart;
			if (isFirstMove) pt1.x -= rackProfile + 5 + 0.02;
		}
		var pt2 = itercection(pt, polar(pt, handrailAng, 100), pt1, polar(pt1, Math.PI / 2, 100));
		var dist1 = 53 + 17 / Math.sin(handrailAng); //расстояние по горизонтали от поворотного столба до поручня
		pt2.y -= dist1 * Math.tan(handrailAng);
		
		var holderParams = {
			angTop: (Math.PI / 2 - handrailAng) * turnFactor,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, pt2.x, pt2.y),
			isForge: false,
			isHor: true,
		}
		//if(turnFactor == -1) holderParams.angTop = handrailAng - Math.PI / 2;
		var holder = drawHandrailHolder(holderParams).mesh;

		holder.position.y = pt2.y;
		holder.position.x = pt2.x //* turnFactor;
		holder.position.z = rackProfile/2;
		holder.rotation.z = -Math.PI / 2 * turnFactor;
		if(turnFactor == 1) holder.rotation.y = Math.PI;

		par.mesh.add(holder)
	}
	
	//сохраняем данные для спецификации
	var rackLen = topPoint.y - p3.y;
	
	//стойка в сборе
	
	var partName = "racks";
	if(par.type == 'turnRackStart' || par.type == 'turnRackEnd') partName = "turnRack";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Стойка ограждения ",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Ограждения",
				}
			if(partName == "turnRack") specObj[partName].name = "Столб поворотный "
			if(params.banisterMaterial == "40х40 нерж+дуб"){
				specObj[partName].division = "timber";
				specObj[partName].metalPaint = false;
				specObj[partName].timberPaint = true;
				specObj[partName].name += "комб. ";
				specObj[partName].group = "timberBal"	
			}
			if(params.banisterMaterial == "40х40 нерж."){
				specObj[partName].metalPaint = false;
				specObj[partName].name += "нерж. ";
			}
			if(params.banisterMaterial == "40х40 черн."){
				specObj[partName].name += "черн. ";
			}
			
		}
		
		var name = "";
		if(par.type == 'first') name += " начальная с фланцем ";
		if(par.type == 'last') name += " L-образная ";
		name += "L=" + Math.round(rackLen);
		if(par.type == 'first' || par.type == 'middle') name += " A=" + Math.round(sizeA);
		
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}
		
	//окончания комбинированных стоек
	
	if(params.banisterMaterial == "40х40 нерж+дуб"){
		//верх стойки
		var partName = "combRackTop";
		if(typeof specObj !='undefined'){
			if(!specObj[partName]){
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
			
			var name = "L=" + topPartLen;
			if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}
		
		//низ стойки
		var partName = "combRackBot";
		if(typeof specObj !='undefined'){
			if(!specObj[partName]){
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
			console.log(rackLen)
			var name = ""
			if(par.type == 'first') name += " начальной с фланцем ";
			if(par.type == 'last') name += " L-образной ";
			name += "L=" + Math.round(rackLen - topPartLen - timberPartLen);
			if(par.type == 'first' || par.type == 'middle') name += " A=" + Math.round(sizeA);
			
		
			if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}
	
	}
	
	return par;
}	



//Общая функция для расчета положения стоек
function calculateRacks(par){
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	var rackPos = setRackPos(par.marshId);
	var parRacks = {};
	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.nextH = nextMarshPar.h;
	par.prevH = prevMarshPar.h;
	par.stairAmt = marshPar.stairAmt;
	par.lastMarsh = marshPar.lastMarsh;
	par.handrailTurnOffset = 50; //смещение точки перелома поручня от стойки
	par.racks = [];
	par.handrailPoints = [];
	par.topTurn = marshPar.topTurn;
	par.botTurn = marshPar.botTurn;
	par.nextMarshPar = nextMarshPar;
	var rackLen = 800;
	var rackProfile = 40;
	var offsetX = 5 + rackProfile / 2; //смещение оси стойки относительно передней кромки ступени

	parRacks.angMarsh = marshPar.ang;
	parRacks.marshLen = marshPar.b * marshPar.stairAmt;
	parRacks.angBot = 0;
	parRacks.angTop = 0;
	
	var isWndP = false;
	//первая стойка марша
	parRacks.marshFirst = {
		x: offsetX,
		y: marshPar.h,
		len: rackLen,
		holderAng: marshPar.ang,
		type: 'middle'
		};

	if (marshPar.botTurn == "пол") {
		parRacks.marshFirst.type = "first";
		//если ограждение начинается не с первой ступени
		if (params.railingStart != "0") {
			parRacks.marshFirst.type = "middle";
			parRacks.marshFirst.isFirst = true;
			parRacks.marshFirst.x = +params.railingStart * marshPar.b + offsetX;
			parRacks.marshFirst.y = (+params.railingStart + 1) * marshPar.h;
			if (params.startTreadAmt == +params.railingStart) {
				if (params.arcSide == par.railingSide || params.arcSide == "two") {
					parRacks.marshFirst.x += par.rackProfile + 5;
					parRacks.marshFirst.len += (par.rackProfile + 5) * Math.tan(marshPar.ang);
				}
			}

			//смещаем средние стойки
			for (var i = 0; i < rackPos.length; i++) {
				rackPos[i] += +params.railingStart;
			}
		}
	}

	
	//на ковке смещаем первую стойку на площадку
	if (params.railingModel == "Кованые балясины"){
		if(marshPar.botTurn == "площадка" && par.key == "out"){
			parRacks.marshFirst.x -=  marshPar.b - 40;
			parRacks.marshFirst.y -=  marshPar.h;
			parRacks.marshFirst.type = "last";
			}
		}
	
	//поворотный столб
	
	if(marshPar.botTurn != "пол" && par.key == "in"){

		var mooveX = 0;
		if(marshPar.botTurn == "площадка") mooveX = 45;
		parRacks.marshFirst.x += mooveX;
		parRacks.marshFirst.len += mooveX * Math.tan(marshPar.ang);
		parRacks.marshFirst.type = 'turnRackStart';
        if (par.marshId == 2) parRacks.marshFirst.isFirst = true;	

        //если внизу пол, тогда обрезаем снизу стойку и добавляем фланец крепления к полу
	    if (prevMarshPar.botTurn == "пол" && prevMarshPar.stairAmt == 0) {
	        if (params.stairModel != "П-образная с забегом") {
	            parRacks.marshFirst.isFirstFlan = true;
	        }
	    }
    }

	//последняя стойка марша

	parRacks.marshLast = {
		x: offsetX + marshPar.stairAmt * marshPar.b,
		y: marshPar.h * (marshPar.stairAmt + 1),
		len: rackLen,
		holderAng: marshPar.ang,
		type: 'middle'
	};

	
	var mooveX = 0;
	
	//обычная стойка
	if(marshPar.topTurn == "пол"){
		mooveX = marshPar.a - 100;
		parRacks.marshLast.type = "last"
		parRacks.marshLast.x -= marshPar.b;
		parRacks.marshLast.y -= marshPar.h;
		}

	//поворотный столб
	if (marshPar.topTurn != "пол" && par.key == "in" && !marshPar.lastMarsh) {
		//mooveX = marshPar.b;
		if (params.stairModel == "П-образная с площадкой") mooveX -= 45;

		//г-образный поворот
		if (params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
			//не отрисовываем последнюю стойку если есть стыковка с верхней секцией
			if (nextMarshPar.hasRailing.in) parRacks.marshLast.noDraw = true;
		}
		//п-образный поворот
		if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
			//не отрисовываем последнюю стойку если есть стыковка с верхней секцией
			if (nextMarshPar.hasRailing.in && params.marshDist == 40) parRacks.marshLast.noDraw = true;
			if (params.marshDist > 40) parRacks.marshLast.type = 'turnRackEnd';
		}
		if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 1 && params.stairAmt2 == 0 && marshPar.topTurn == "площадка") {
			mooveX -= rackProfile + 5;
		}
	}

	parRacks.marshLast.x += mooveX;
	parRacks.marshLast.len += mooveX * Math.tan(marshPar.ang);
	
	
	//первая стойка нижнего поворота
	if(par.botEnd != "нет") {
		parRacks.botFirst = {
			x: -params.M + 100,
			y: 0,//-par.h,
			len: rackLen,
			holderAng: marshPar.ang,
			type: 'last'
		};
		if(par.botEnd == "забег"){
			parRacks.botFirst.x = -params.M + 100;
			parRacks.botFirst.y -= par.h;
			//смещенная точка перелома поручня
			var handrailTurnPoint = polar(parRacks.marshFirst, marshPar.ang, -par.handrailTurnOffset)
			parRacks.botFirst.holderAng = angle(parRacks.botFirst, handrailTurnPoint);
			// parRacks.angBot = parRacks.botFirst.holderAng;//calcAngleX1(parRacks.botFirst, parRacks.botLast);
		}
		if(par.botEnd == "площадка"){
			parRacks.botFirst.x += 150;
			parRacks.botFirst.len += par.handrailTurnOffset; //удлинняем стойку чтобы стык поручня не попадал на кронштейн
			parRacks.botFirst.holderAng = 0;
		}
		parRacks.angBot = calcAngleX1(parRacks.botFirst, parRacks.marshFirst);
		parRacks.botLen = distance(parRacks.botFirst, parRacks.marshFirst);
	}

	//последняя стойка верхнего поворота
	if(par.topEnd != "нет"){
		parRacks.topLast = {
			x: parRacks.marshLast.x + par.platformLengthTop - 70,
			y: parRacks.marshLast.y,
			len: rackLen,
			holderAng: marshPar.ang,
			type: 'last'
		};
		if(par.topEnd == "забег"){
			// parRacks.angTop = marshPar.ang;
			parRacks.topLast.x = parRacks.marshLast.x + params.M - 100 - 70;
			parRacks.topLast.y += marshPar.h_topWnd;
			var handrailTurnPoint = polar(parRacks.marshLast, marshPar.ang, par.handrailTurnOffset)
			parRacks.topLast.holderAng = angle(handrailTurnPoint, parRacks.topLast);
			// parRacks.angTop = parRacks.topLast.holderAng;

		}
		if(par.topEnd == "площадка"){
			
			parRacks.topLast.len += 50; //удлинняем стойку чтобы стык поручня не попадал на кронштейн
			parRacks.topLast.holderAng = 0;
			//устраняем пересечение L-образных стоек
			if (params.railingModel == "Ригели" && par.key == "out" && par.topConnection){
				parRacks.topLast.x -= 100;
            }
            if (params.stairModel == 'П-образная с площадкой') {
                parRacks.topLast.x += 50;
            }
		}
		parRacks.angTop = calcAngleX1(parRacks.marshLast, parRacks.topLast);
		parRacks.topLen = distance(parRacks.marshLast, parRacks.topLast);
	}
	
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) {
		isWndP = true;
		parRacks.marshFirst = {
			x: -params.M + 100,
			y: -par.h,
			len: rackLen,
			holderAng: 0,
			type: 'last'
		};
		parRacks.marshFirst.holderAng = angle(parRacks.marshFirst, parRacks.marshLast);
		parRacks.marshLast.holderAng = angle(parRacks.marshLast, parRacks.marshFirst);
    }

    //стойки заднего ограждения П-образной с площадкой
    if (params.stairModel == 'П-образная с площадкой' && par.key == "rear") {
        var isRearPlatform = true;
        var parRacks = {};
        parRacks.angMarsh = 0;
        parRacks.marshLen = params.M * 2 + params.marshDist;
        parRacks.angBot = 0;
        parRacks.angTop = 0;
        var offsetX = 70;

        //начальная стойка площадки
        parRacks.marshFirst = {
            x: offsetX,
            y: 0,
            len: rackLen,
            holderAng: parRacks.angMarsh,
            type: 'last'
        };

        //конечная стойка площадки
        parRacks.marshLast = {
            x: parRacks.marshLen - offsetX,
            y: 0,
            len: rackLen,
            holderAng: parRacks.angMarsh,
            type: 'last'
        };

        //средние стойки площадки
        if (parRacks.marshLen > 1000) {
            var count = Math.floor((parRacks.marshLen - offsetX * 2) / 1000);
            var lenSection = (parRacks.marshLen - offsetX * 2) / (count + 1);
            var racksRearPlatform = [];
            for (var j = 1; j <= count; j++) {
                var rackRearPlatform = {
                    x: 70 + lenSection * j,
                    y: 0,
                    len: rackLen,
                    holderAng: parRacks.angMarsh,
                    type: 'last'
                };
                racksRearPlatform.push(rackRearPlatform);
            }
        }
    }
	
	//формируем массив racks
	par.racks = [];
	if(parRacks.botFirst) par.racks.push(parRacks.botFirst);
    if (par.stairAmt !== 0 || isWndP || isRearPlatform)par.racks.push(parRacks.marshFirst);
	//сюда вставить добавление средних стоек
	for (var i = 0; i < rackPos.length; i++){
		var prevPosition = parseInt(rackPos[i] - 1);
		par.racks.push({
			x: prevPosition * marshPar.b + offsetX, //Коррекция положения относительно ступени
			y: marshPar.h * rackPos[i],
			len: rackLen,
			holderAng: marshPar.ang,
			type: 'middle'
		});
    }
    if (racksRearPlatform) par.racks.push(...racksRearPlatform);
	par.racks.push(parRacks.marshLast);
	if(parRacks.topLast) par.racks.push(parRacks.topLast);
	par.parRacks = parRacks;
	
}


//Считает позиции поручня исходя из заданных переменных
function calcHandrailPoints(par, parRacks){

	var handrailPoints = [];
	var pointOffset = 80; //отступ торца поручня от базовой точки стойки

	//рассчитываем координаты верхней точки кронштейна стойки
	if(parRacks.botFirst) var botFirst = calcHolderTopPointMono(parRacks.botFirst);
	if(parRacks.marshFirst) var marshFirst = calcHolderTopPointMono(parRacks.marshFirst);
	if(parRacks.marshLast) var marshLast = calcHolderTopPointMono(parRacks.marshLast);
	if(parRacks.topLast) var topLast = calcHolderTopPointMono(parRacks.topLast);

	//формируем массив точек поручня по координатам стоек с учетом того, чтобы стык не попадал на лодочку

	//нижние точки
	if(parRacks.botFirst){
		if(par.botEnd == "площадка"){
			pointOffset = 200; //180 отступ от края + 20 отступ от центра этой стойки
			var p1 = polar(botFirst, parRacks.botFirst.holderAng, -pointOffset); //todo: сделать стык с поручнем нижнего марша
		}
		if(par.botEnd == "забег"){
			var p1 = polar(botFirst, parRacks.botFirst.holderAng, -pointOffset);
		}
		var p2 = itercection(p1, botFirst, marshFirst, polar(marshFirst, parRacks.marshFirst.holderAng, 100))
		handrailPoints.push(p1);
		handrailPoints.push(p2);
	}
	if(!parRacks.botFirst){
		var p1 = polar(marshFirst, parRacks.marshFirst.holderAng, -pointOffset);
		handrailPoints.push(p1);
	}

	//верхние точки
	if(parRacks.topLast){
		if(par.topEnd == "площадка"){
			pointOffset = 160; //100 отступ от края + 40 профиль стойки следующего марша + 20 отступ от центра этой стойки
			var p1 = polar(topLast, parRacks.topLast.holderAng, pointOffset); //todo: сделать стык с поручнем верхнего марша
		}
		if(par.topEnd == "забег"){
			var p1 = polar(topLast, parRacks.topLast.holderAng, pointOffset);
		}
		var p2 = itercection(p1, topLast, marshLast, polar(marshLast, parRacks.marshLast.holderAng, 100))
		handrailPoints.push(p1);
		handrailPoints.push(p2);
	}
	if(!parRacks.topLast){
		var p1 = polar(marshLast, parRacks.marshLast.holderAng, pointOffset);
		if(parRacks.marshLast.noDraw){
			//var temp = {
			//	x: parRacks.marshLast.x - 25, //rackProfile / 2
			//	y: marshLast.y
			//}
			//p1 = itercection(marshFirst, p1, parRacks.marshLast, temp);

			var temp = newPoint_xy(parRacks.marshLast, -par.rackProfile / 2, 0);
			//if (params.handrailEndType == "под углом") {
			//	var meterHandrailPar = {
			//		prof: params.handrailProf,
			//		sideSlots: params.handrailSlots,
			//		handrailType: params.handrail,
			//		metalPaint: params.metalPaint_perila,
			//		timberPaint: params.timberPaint_perila,
			//	}
			//	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);
			//	//temp.x -= meterHandrailPar.profY * Math.tan(parRacks.angMarsh) * Math.sin(parRacks.angMarsh);
			//	temp = polar(temp, parRacks.angMarsh, -meterHandrailPar.profY);
			//}
			p1 = itercection(marshFirst, p1, temp, polar(temp, Math.PI / 2, 100));
		}
		handrailPoints.push(p1);
	}

	return handrailPoints;
} //end of calcHandrailPoints

function calcRigelPoints(par, parRacks){
	//формируем массив базовых точек для ригелей
	var points = [];
	var basePoint = {};
	var nominalLen = 800;
	
	if(parRacks.botFirst){
		basePoint = newPoint_xy(parRacks.botFirst, 0, parRacks.botFirst.len - nominalLen);
		points.push(basePoint);
		};
		
	if(parRacks.marshFirst){
		basePoint = newPoint_xy(parRacks.marshFirst, 0, parRacks.marshFirst.len - nominalLen);
		//делаем ригели на площадке горизонтальными
		if(par.botEnd == 'площадка') basePoint.y = points[points.length - 1].y;
		points.push(basePoint);
		};
		
	if(parRacks.marshLast){
		basePoint = newPoint_xy(parRacks.marshLast, 0, parRacks.marshLast.len - nominalLen);
		basePoint = polar(basePoint, parRacks.marshLast.holderAng, -15);		
		points.push(basePoint);
		};
		
	if(parRacks.topLast){
		basePoint = newPoint_xy(parRacks.topLast, 0, parRacks.topLast.len - nominalLen);
		//делаем ригели на площадке горизонтальными
		if(par.topEnd == 'площадка') basePoint.y = points[points.length - 1].y;
		points.push(basePoint);
		};

	return points;
}

function calcHolderTopPointMono(rackPar){
	//фунция возвращает координаты верхней точки кронштейна поручня, рассчитанные на основе параметров стойки
	//параметры кронштейна поручня
	var botPartLen = 53;
	var topPartLen = 17 + 2 + 0.2; //0.2 - зазор для устранения погрешности округления, чтобы не показывались пересечения
	var point = newPoint_xy(rackPar, 0, rackPar.len + botPartLen);
	point = polar(point, rackPar.holderAng + Math.PI / 2, topPartLen);
	return point;
} //end of calcTopPoint



/** функция задает расположение и ориентацию отверстий под уголки в поворотных столбах
	*массив хранит следующие данные о каждом отверстии:
	*offset: отступ от нижней части стойки
	*anglePos: на какой грани расположен уголок. Сторона спрва-слева определяется если смотреть на марш сбоку
	*@param marshId
	*@param type - является ли первой стойкой секции
*/
function setTurnRackHoles(par){
	var holes = [];
	var p0 = {x:0, y:0,}; //базовая точка на оси стойки на уровне верхней плоскости ступени
	//параметры марша
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	
	var angleHoleOffset = 16; //отступ отверстия уголка от нижней поверхности ступени
	
	//костыль для совместимости со старым кодом - удалить
	var  rackParams = {}
	rackParams.nextStepH = marshPar.h;
	rackParams.holderAng = prevMarshPar.ang;
	rackParams.nextMarshAng = marshPar.ang;
	rackParams.additionalHolder = prevMarshPar.hasRailing.in; 
	
	//верхний уголок
	var center1 = newPoint_xy(p0, 0, -params.treadThickness - angleHoleOffset);
	if(params.stairModel == "П-образная с площадкой" && par.type == 'turnRackEnd') center1.anglePos = 'справа';
		
	holes.push(center1);
		
	if(params.stairModel == "П-образная с забегом"){
		//поворотный столб в начале секции
		
		if(par.type == 'turnRackStart'){
			//6 забежная ступень
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'сзади';
			holes.push(center);
			//5 забежная ступень
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);
			//4 забежная ступень
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);
			//3 забежная ступень
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);

			if (params.marshDist == 40) {
				//2 забежная ступень
				var center = newPoint_xy(center, 0, -marshPar.h);
				center.anglePos = 'спереди';
				holes.push(center);
				//1 забежная ступень
				var center = newPoint_xy(center, 0, -marshPar.h);
				center.anglePos = 'спереди';
				holes.push(center);
			}
		}
			
		//поворотный столб в конце секции
		if(par.type == 'turnRackEnd'){
			//последняя прямая ступень марша
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'сзади';
			holes.push(center);
			//вторая забежная ступень
			var center = newPoint_xy(center1, 0, marshPar.h_topWnd);
			center.anglePos = 'сзади';
			holes.push(center);
			//третья забежная ступень
			var center = newPoint_xy(center, 0, marshPar.h_topWnd);
			center.anglePos = 'справа';
			holes.push(center);
			}
		}


	if(params.stairModel == "П-образная с площадкой"){
	
		//поворотный столб в начале секции
		if(par.type == 'turnRackStart'){
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);
			}
			
		//поворотный столб в конце секции
		if(par.type == 'turnRackEnd'){
			var center = newPoint_xy(center1, 0, -marshPar.h);
			holes.push(center);
			}
		}
		
	
	
	

		
		
		
	//Г-образный поворот
	
	if(params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом"){

		if(marshPar.botTurn == "забег"){
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'сзади';
			holes.push(center);
			
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);

		    if (!par.isFirstFlan) {
		        var center = newPoint_xy(center, 0, -marshPar.h);
		        center.anglePos = 'слева';
		        holes.push(center);
		    }
		}

	    if (marshPar.botTurn == "площадка") {
	        if (!par.isFirstFlan) {
	            var center = newPoint_xy(center1, 0, -marshPar.h);
	            center.anglePos = 'слева';
	            holes.push(center);
	        }
	    }

	    if (!(params.stairModel == "П-образная трехмаршевая" && par.marshId == 3 && params.stairAmt2 == 0 && params.turnType_1 !== "забег")) {
	        if (!par.isFirstFlan) var center = newPoint_xy(center, 0, -prevMarshPar.h);
            if (par.isFirstFlan) var center = newPoint_xy(center, 0, -marshPar.h);
	        center.anglePos = 'слева';
	        holes.push(center);
	    }
	}

/*	
	//для левой лестницы бокоые уголки ставятся на другой стороне
	if(turnFactor == -1){
		for(var i=0; i < holes.length; i++){
			if (holes[i].anglePos == 'справа') holes[i].anglePos = 'слева';
			else if(holes[i].anglePos == 'слева') holes[i].anglePos = 'справа';
			}
		}
*/		
	par.holes = holes;	
	return par;

}//end of setTurnRackHoles

function drawLastRackFlan(par){
	if(!par) par = {};
	if(!par.material) par.material = params.materials.metal2;
	if(!par.dxfArr) par.dxfArr = dxfPrimitivesArr;
	if(!par.dxfBasePoint){
		par.dxfBasePoint = {x:0, y:0};
		dxfArr = [];
		}
	var len = 100;
	var width = 120;
	var boltHoleDiam = 13;
	var screwHoleDiam = 8;
	var flanThk = 8;
	par.mesh = new THREE.Object3D(0);
	
	var points = [];
	var p0 = {x: 0,	y: 0,}; //точка на оси стойки на уровне верха ступени
	
	
	//верхние точки
	var p1 = newPoint_xy(p0, -width / 2, len / 2);
	var p2 = newPoint_xy(p0, width / 2, len / 2);
	var p3 = newPoint_xy(p0, width / 2, -len / 2);
	var p4 = newPoint_xy(p0, -width / 2, -len / 2);
	points.push(p1, p2, p3, p4)
	
	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		radOut: 10,
    }
    shapePar.drawing = {
        name: "Фланец стойки ограждения",
        group: "carcasFlans",
        marshId: 3,
        isCount: true,//указывает что надо будет потом подсчитать общее количество
    }

	var shape = drawShapeByPoints2(shapePar).shape;
	
	//отверстия под шурупы
	var holeOffset = 15;
	var center1 = newPoint_xy(p1, holeOffset, -holeOffset)
	var center2 = newPoint_xy(p2, -holeOffset, -holeOffset)
	var center3 = newPoint_xy(p3, -holeOffset, holeOffset)
	var center4 = newPoint_xy(p4, holeOffset, holeOffset)
	var holeCenters = [center1, center2, center3, center4];
	
	//центральные отверстия
	var center5 = newPoint_xy(p0, 30, 0)
	var center6 = newPoint_xy(p0, -30, 0)
	center5.holeRad = center6.holeRad = boltHoleDiam / 2;
	holeCenters.push(center5, center6)
	
	var holesPar = {
		holeArr: holeCenters,
		dxfBasePoint: par.dxfBasePoint,
		shape: shape,
		holeRad: screwHoleDiam / 2,
		}
	addHolesToShape(holesPar);
	
	
	
	
	var extrudeOptions = {
		amount: flanThk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
		
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom, params.materials.metal2);
	mesh.rotation.x = -Math.PI / 2;
	
	par.mesh.add(mesh)
	
	//сохраняем данные для спецификации
	var partName = "lastRackFlan";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Фланец L-образной стойки",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
			}
		var name = len + "x" + width;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		}
	
	return par;
	
} //end of drawLastRackFlan

/** функция добавляет уголки стоек по массиву координат отверстий
*@param holeCenters
*@param railingSide


*/

function addRackAngles(par){

	par.mesh = new THREE.Object3D();
	var rackProfile = 40;
	//к-т, учитывающий сторону ограждения
	var sideFactor = 1;
	if (par.railingSide === "left") sideFactor = -1;
	
	for(var i=0; i < par.holeCenters.length; i++){
		var angleParams = drawBanisterAngle();
		var angle = angleParams.mesh;		
		angle.position.y = par.holeCenters[i].y - angleParams.holeOffset;
		angle.position.z = rackProfile;

		if(par.railingSide === "right"){
			angle.position.z = 0;
			angle.rotation.y = Math.PI;
			}
			
		if(par.holeCenters[i].anglePos == 'справа') {
			angle.rotation.y = Math.PI / 2;
			angle.position.x += rackProfile / 2;
			angle.position.z += rackProfile / 2 * turnFactor;			
			
			addLeader("Справа", 30, 70, 60, dxfPrimitivesArr, par.holeCenters[i], par.dxfBasePoint);
			}
			
		if(par.holeCenters[i].anglePos == 'слева') {
			angle.rotation.y = -Math.PI / 2
			
			angle.position.x += -rackProfile / 2;
			angle.position.z += rackProfile / 2 * turnFactor;

			addLeader("Слева", 30, 70, 60, dxfPrimitivesArr, par.holeCenters[i], par.dxfBasePoint);
		}

		if (par.holeCenters[i].anglePos == 'спереди') {
			angle.rotation.y += -Math.PI;
			angle.position.z += rackProfile * turnFactor;
		}
		par.mesh.add(angle);
		}
	return par;

}//end of addRackAngles



function drawMarshRailing(par, marshId) {

    var marshRailing = new THREE.Object3D();
    var forgedParts = new THREE.Object3D();
    var handrails = new THREE.Object3D();

    var marshParams = getMarshParams(marshId);
    var turnParams = calcTurnParams(marshId);

    var handrailParams = {};
    //Параметры ограждения для корректного рассчета поворотного столба

    var sectionPar = {
        marshId: marshId,
        dxfBasePoint: par.dxfBasePoint,
        stringerParams: par.stringerParams,
        rackProfile: 40
    }

    if (par.treadsObj.wndPar2 || par.treadsObj.wndPar) {
        sectionPar.wndPar = par.treadsObj.wndPar2 ? par.treadsObj.wndPar2.params : par.treadsObj.wndPar.params
    }
    if (params.calcType == 'timber') {
        sectionPar.rackProfile = 0;
    }

    //выбираем функцию отрисовки ограждения
    var drawRailingSection = drawRailingSectionNewel2;
    if (params.railingModel == "Кованые балясины") drawRailingSection = drawRailingSectionForge2;
    if (params.calcType == 'mono') {
        if (params.railingModel == "Самонесущее стекло") drawRailingSection = drawGlassSection;
    }
    if (params.calcType == 'lt-ko' || params.calcType == 'vhod') {
        if (params.railingModel == "Самонесущее стекло") drawRailingSection = drawRailingSectionGlass;
        if (params.railingModel == "Трап") drawRailingSection = drawLadderHandrail;
    }

    if (params.railingModel == "Деревянные балясины" ||
        params.railingModel == "Стекло" ||
        params.railingModel == "Дерево с ковкой") {
        drawRailingSection = drawMarshRailing_timber;
    }
	/*
	if (params.calcType == 'timber') {
		drawRailingSection = drawMarshRailing_timber;
	}
*/
    var sideOffset = 0;
    var mooveY = 0;
    if (params.rackBottom == "сверху с крышкой") {
        sideOffset = 70;
        if (params.model == "лт") sideOffset = 80;
        mooveY = 110 + params.treadThickness + 1 + 0.01;
        if (params.stairType == "лотки") mooveY += 30 + params.treadThickness;
        if (params.stairType == "рифленая сталь") mooveY += 30;
        if (params.stairType == "дпк") mooveY += 14;
    }
    if (params.railingModel == "Деревянные балясины" ||
        params.railingModel == "Стекло" ||
        params.railingModel == "Дерево с ковкой") {
        sideOffset = 0;//30;
        sideOffset = 0;
        mooveY = 0;
    }

    //внутренняя сторона
    var hasRailing = false;
    if (marshParams.hasRailing.in) hasRailing = true;
    if (marshParams.hasTopPltRailing.in) hasRailing = true;
    //костыль для ограждения верхней площадки Прямой с промежуточной площадкой: там объединяются массивы для 1 и 3 марша и отрисовывается ограждение как будто только для первого марша
    if (params.stairModel == "Прямая с промежуточной площадкой") {
        if (getMarshParams(3).hasTopPltRailing.in) hasRailing = true;
    }

    if (marshId != "topPlt" && hasRailing) {

        //смещаем dxfBasePoint на длину нижнего участка
        par.dxfBasePoint.x += turnParams.turnLengthBot;
        sectionPar.dxfBasePoint = par.dxfBasePoint;

        sectionPar.key = "in";
        var sectionObj = drawRailingSection(sectionPar);
        if (params.calcType == 'timber') handrailParams.in = sectionObj.handrailParams;
        var section = sectionObj.mesh;
        section.position.y = mooveY;
        section.position.z = (params.M / 2 + 0.01 - sideOffset) * turnFactor;

        if (params.stairModel == "Прямая" && params.calcType !== 'timber') section.position.z = -(params.M / 2 - sideOffset + sectionPar.rackProfile) * turnFactor;
        if (params.stairModel == "Прямая" && params.calcType == 'timber' && (params.model == 'косоуры' || params.model == 'тетива+косоур')) section.position.z -= params.rackSize * turnFactor;
        if (params.stairModel == "Прямая" && params.calcType == 'timber' && !(params.model == 'косоуры' || params.model == 'тетива+косоур')) section.position.z -= params.stringerThickness * turnFactor;
        if (params.railingModel == "Самонесущее стекло") {
            if (params.stairModel == "Прямая") section.position.z = -(params.M / 2) * turnFactor;
        }
        if (params.model == "лт") {
            if (params.railingModel == "Кованые балясины" || params.railingModel == "Самонесущее стекло") section.position.x -= 5;
        }
        marshRailing.add(section);

        if (sectionObj.forgedParts) {
            var forge = sectionObj.forgedParts;
            forge.position.x = section.position.x;
            forge.position.y = section.position.y;
            forge.position.z = section.position.z;
            forgedParts.add(forge);
        }
        if (sectionObj.handrails) {
            var sectHandrails = sectionObj.handrails;
            sectHandrails.position.x = section.position.x;
            sectHandrails.position.y = section.position.y;
            sectHandrails.position.z = section.position.z;
            handrails.add(sectHandrails);
        }

        //подпись в dxf
        var textHeight = 30;
        var text = marshId + " марш внутренняя сторона";
        addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));


        //смещаем dxfBasePoint на длину секции
        par.dxfBasePoint.x += marshParams.stairAmt * marshParams.b + turnParams.turnLengthTop + 1000;
        sectionPar.dxfBasePoint = par.dxfBasePoint;
    }

    //внешняя сторона
    var hasRailing = false;
    if (marshParams.hasRailing.out) hasRailing = true;
    if (marshParams.hasTopPltRailing.out) hasRailing = true;
    //костыль для ограждения верхней площадки Прямой с промежуточной площадкой: там объединяются массивы для 1 и 3 марша и отрисовывается ограждение как будто только для первого марша
    if (params.stairModel == "Прямая с промежуточной площадкой") {
        if (getMarshParams(3).hasTopPltRailing.out) hasRailing = true;
    }

    if (marshId != "topPlt" && hasRailing) {
        sectionPar.key = "out";
        if (params.stairModel == "П-образная с забегом" && marshId == 2) sectionPar.isRearPRailing = true;

        var sectionObj = drawRailingSection(sectionPar);
        if (params.calcType == 'timber') handrailParams.out = sectionObj.handrailParams;

        var section = sectionObj.mesh;
        section.position.y = mooveY;
        section.position.z = -(params.M / 2 + sectionPar.rackProfile - sideOffset) * turnFactor; //-(params.M / 2 + sectionPar.rackProfile) * turnFactor;
        if (params.stairModel == "Прямая" && params.calcType !== 'timber') section.position.z = (params.M / 2 - sideOffset) * turnFactor;
        // if (params.stairModel == "Прямая" && params.calcType == 'timber') section.position.z += params.rackSize * turnFactor;
        if (params.stairModel == "Прямая" && params.calcType == 'timber' && params.model == 'косоуры') section.position.z += params.rackSize * turnFactor;
        if (params.stairModel == "Прямая" && params.calcType == 'timber' && params.model !== 'косоуры') section.position.z += params.stringerThickness * turnFactor;
        if (params.railingModel == "Самонесущее стекло") {
            section.position.z = -(params.M / 2) * turnFactor;
            if (params.stairModel == "Прямая") section.position.z = (params.M / 2) * turnFactor;
        }
        if (params.model == "лт") {
            if (params.railingModel == "Кованые балясины" || params.railingModel == "Самонесущее стекло") section.position.x -= 5;
        }
        marshRailing.add(section);

        if (sectionObj.forgedParts) {
            var forge = sectionObj.forgedParts;
            forge.position.x = section.position.x;
            forge.position.y = section.position.y;
            forge.position.z = section.position.z;
            forgedParts.add(forge);
        }
        if (sectionObj.handrails) {
            var sectHandrails = sectionObj.handrails;
            sectHandrails.position.x = section.position.x;
            sectHandrails.position.y = section.position.y;
            sectHandrails.position.z = section.position.z;
            handrails.add(sectHandrails);
        }

        //подпись в dxf
        var textHeight = 30;
        var text = marshId + " марш внешняя сторона";
        addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));
    }

    //задняя сторона промежуточной площадки П-образная с площадкой
    if (params.stairModel == "П-образная с площадкой" && marshId == 2 && params.backRailing_1 == "есть" && params.calcType !== 'timber') {
        sectionPar.key = "rear";
        if (params.calcType !== 'mono') {
            sectionPar.marshId = "topPlt";
            if (sectionPar.stringerParams["topPlt"])
                var topPlt = sectionPar.stringerParams["topPlt"];
            sectionPar.stringerParams["topPlt"] = sectionPar.stringerParams[2];
            var racks = sectionPar.stringerParams["topPlt"].elmIns.rear.racks;

            //при правом повороте отзеркаливаем отверстия под средние стойки площадки
            if (turnFactor == 1 && racks.length > 2) {
                for (var i = 1; i < racks.length - 1; i++) {
                    racks[i].x = racks[0].x + (racks[racks.length - 1].x - racks[i].x);
                    if (params.model == "лт" && params.railingModel == "Кованые балясины") racks[i].x -= 5;
                }
            }
        }

        var sectionObj = drawRailingSection(sectionPar);
        var section = sectionObj.mesh;
        section.rotation.y = Math.PI / 2;
        section.position.y = mooveY;
        section.position.x = params.platformLength_1 + params.nose;
        if (turnFactor == -1 && params.railingModel !== "Самонесущее стекло") section.position.x += sectionPar.rackProfile;
        section.position.z = -(params.M / 2 - sideOffset) * turnFactor;
        section.position.z += (params.M * 2 + params.marshDist) * (1 + turnFactor) * 0.5;
        if (params.model == "ко") {
            section.position.z -= params.sideOverHang;
            section.position.y -= 40;
        }
        if (params.model == "лт") {
            section.position.y += 5;
            if (params.railingModel == "Кованые балясины")
                section.position.z -= 5;
        }


        marshRailing.add(section);

        if (sectionObj.forgedParts) {
            var forge = sectionObj.forgedParts;
            forge.position.x = section.position.x;
            forge.position.y = section.position.y;
            forge.position.z = section.position.z;
            forge.rotation.y = section.rotation.y;
            forgedParts.add(forge);
        }
        if (sectionObj.handrails) {
            var sectHandrails = sectionObj.handrails;
            sectHandrails.position.x = section.position.x;
            sectHandrails.position.y = section.position.y;
            sectHandrails.position.z = section.position.z;
            sectHandrails.rotation.y = section.rotation.y;
            handrails.add(sectHandrails);
        }

        //подпись в dxf
        var textHeight = 30;
        var text = "Задняя сторона верхней площадки";
        addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));

        if (topPlt)
            sectionPar.stringerParams["topPlt"] = topPlt;
    }

    //задняя сторона верхней площадки
    if (marshId == "topPlt" && params.topPltRailing_5 && (params.platformRearStringer == 'есть' || params.calcType == "mono")) {
        sectionPar.key = "rear";
        var sectionObj = drawRailingSection(sectionPar);
        var section = sectionObj.mesh;
        section.position.y = mooveY;
        section.position.z = (- sideOffset) * turnFactor;
        if (params.platformTop == 'увеличенная' && turnFactor == 1 && params.stairModel == 'Прямая') {
            section.position.x = -(params.platformWidth_3 - params.M) - 5;
        }

        //костыли
        if (params.model == "лт") section.position.x += 5;
        if (turnFactor == -1) {
            if (params.railingModel != "Самонесущее стекло") section.position.z += 40;
        }


        marshRailing.add(section);

        if (sectionObj.forgedParts) {
            var forge = sectionObj.forgedParts;
            forge.position.x = section.position.x;
            forge.position.y = section.position.y;
            forge.position.z = section.position.z;
            forgedParts.add(forge);
        }
        if (sectionObj.handrails) {
            var sectHandrails = sectionObj.handrails;
            sectHandrails.position.x = section.position.x;
            sectHandrails.position.y = section.position.y;
            sectHandrails.position.z = section.position.z;
            handrails.add(sectHandrails);
        }

        //подпись в dxf
        var textHeight = 30;
        var text = "Задняя сторона верхней площадки";
        addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));
    }

	/*	
		//боковые стороны верхней площадки, если нет ограждение марша
		if (marshParams.lastMarsh && params.platformTop == 'площадка' && params.calcType != "mono") {
			sectionPar.marshId = "topPlt";
			if (!sectionPar.stringerParams[sectionPar.marshId]) {
				sectionPar.stringerParams[sectionPar.marshId] = {};
				sectionPar.stringerParams[sectionPar.marshId].elmIns = {};
			}
			sectionPar.stringerParams[sectionPar.marshId].elmIns.in = sectionPar.stringerParams[marshId].elmIns.in;
			sectionPar.stringerParams[sectionPar.marshId].elmIns.out = sectionPar.stringerParams[marshId].elmIns.out;
	
			var hasRailing = marshParams.hasRailing.out;
			if (params.stairModel == "Прямая") hasRailing = marshParams.hasRailing.in;
			if (turnFactor == -1) {
				hasRailing = marshParams.hasRailing.in;
				if (params.stairModel == "Прямая") hasRailing = marshParams.hasRailing.out;
			}
	
			if (params.topPltRailing_3 && !hasRailing) {
				sectionPar.key = "out";
				if (turnFactor == -1) sectionPar.key = "in";
				if (params.stairModel == "Прямая") {
					sectionPar.key = "in";
					if (turnFactor == -1) sectionPar.key = "out";
				}
				sectionPar.rigelMoveZ = sectionPar.rackProfile + 20 * (1 - turnFactor) * 0.5;
				var sectionObj = drawRailingSection(sectionPar);
				var section = sectionObj.mesh;
				section.position.y = mooveY;
				section.position.z = -params.M / 2 - sectionPar.rackProfile * (1 + turnFactor) * 0.5;
	
				marshRailing.add(section);
	
				if (sectionObj.forgedParts) {
					var forge = sectionObj.forgedParts;
					forge.rotation.y = section.rotation.y;
					forge.position.x = section.position.x;
					forge.position.y = section.position.y;
					forge.position.z = section.position.z;
					forgedParts.add(forge);
				}
				if (sectionObj.handrails) {
					var sectHandrails = sectionObj.handrails;
					sectHandrails.rotation.y = section.rotation.y;
					sectHandrails.position.x = section.position.x;
					sectHandrails.position.y = section.position.y;
					sectHandrails.position.z = section.position.z;
					handrails.add(sectHandrails);
				}
	
				//подпись в dxf
				var textHeight = 30;
				var text = "Ограждение верхней площадки";
				addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));
			}
	
	
	
			var hasRailing = marshParams.hasRailing.in;
			if (params.stairModel == "Прямая") hasRailing = marshParams.hasRailing.out;
			if (turnFactor == -1) {
				hasRailing = marshParams.hasRailing.out;
				if (params.stairModel == "Прямая") hasRailing = marshParams.hasRailing.in;
			}
	
			if (params.topPltRailing_4 && !hasRailing) {
				sectionPar.key = "in";
				if (turnFactor == -1) sectionPar.key = "out";
				if (params.stairModel == "Прямая") {
					sectionPar.key = "out";
					if (turnFactor == -1) sectionPar.key = "in";
				}
				sectionPar.rigelMoveZ = sectionPar.rackProfile * (1 + turnFactor) * 0.5;
				var sectionObj = drawRailingSection(sectionPar);
				var section = sectionObj.mesh;
				section.position.y = mooveY;
				section.position.z = params.M / 2;
				if (params.railingModel != "Самонесущее стекло") section.position.z += sectionPar.rackProfile * (1 - turnFactor) * 0.5;
	
				marshRailing.add(section);
	
				if (sectionObj.forgedParts) {
					var forge = sectionObj.forgedParts;
					forge.rotation.y = section.rotation.y;
					forge.position.x = section.position.x;
					forge.position.y = section.position.y;
					forge.position.z = section.position.z;
					forgedParts.add(forge);
				}
				if (sectionObj.handrails) {
					var sectHandrails = sectionObj.handrails;
					sectHandrails.rotation.y = section.rotation.y;
					sectHandrails.position.x = section.position.x;
					sectHandrails.position.y = section.position.y;
					sectHandrails.position.z = section.position.z;
					handrails.add(sectHandrails);
				}
	
				//подпись в dxf
				var textHeight = 30;
				var text = "Ограждение верхней площадки";
				addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));
			}
	
	
	
		}
	*/
    if (marshId == "topPlt" && params.topPltRailing_4 && params.platformTop == 'увеличенная') {
        sectionPar.key = "side";
        var sectionObj = drawRailingSection(sectionPar);
        var section = sectionObj.mesh;
        section.position.y = mooveY;
        section.position.x = -(params.platformWidth_3 - params.M + params.M / 2 + 40) * turnFactor;
        if (params.platformTop == 'увеличенная' && turnFactor == 1) {
            section.rotation.y = Math.PI / 2;
            section.position.z = -params.M / 2 - 8;
        }
        if (params.platformTop == 'увеличенная' && turnFactor == -1) {
            section.rotation.y = Math.PI / 2;
            section.position.z = -params.M / 2 - 8;
        }

        //костыли
        // if(params.model == "лт") section.position.x += 5;
        // if(turnFactor == -1){
        // 	if (params.railingModel != "Самонесущее стекло") section.position.z += 40;
        // }


        marshRailing.add(section);

        if (sectionObj.forgedParts) {
            var forge = sectionObj.forgedParts;
            forge.rotation.y = section.rotation.y;
            forge.position.x = section.position.x;
            forge.position.y = section.position.y;
            forge.position.z = section.position.z;
            forgedParts.add(forge);
        }
        if (sectionObj.handrails) {
            var sectHandrails = sectionObj.handrails;
            sectHandrails.rotation.y = section.rotation.y;
            sectHandrails.position.x = section.position.x;
            sectHandrails.position.y = section.position.y;
            sectHandrails.position.z = section.position.z;
            handrails.add(sectHandrails);
        }

        //подпись в dxf
        var textHeight = 30;
        var text = "Ограждение верхней площадки";
        addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));
    }

    if (marshId == "topPlt" && params.topPltRailing_6 && params.platformTop == 'увеличенная') {
        sectionPar.key = "front";
        var sectionObj = drawRailingSection(sectionPar);
        var section = sectionObj.mesh;
        section.position.y = mooveY;
        if (params.platformTop == 'увеличенная' && turnFactor == 1) {
            section.position.x = -(params.platformWidth_3 - params.M / 2) + params.M / 2;// - params.M;
            section.position.z = -params.platformLength_3 - params.stringerThickness - 3 - 40;
        }
        if (params.platformTop == 'увеличенная' && turnFactor == -1) {
            section.position.x = params.M;//-(params.platformWidth_3 - params.M / 2);// - params.M / 2;// - params.M;
            section.position.z = -params.platformLength_3 - params.stringerThickness - 3;
        }

        //костыли
        // if(params.model == "лт") section.position.x += 5;
        // if(turnFactor == -1){
        // 	if (params.railingModel != "Самонесущее стекло") section.position.z += 40;
        // }


        marshRailing.add(section);

        if (sectionObj.forgedParts) {
            var forge = sectionObj.forgedParts;
            forge.rotation.y = section.rotation.y;
            forge.position.x = section.position.x;
            forge.position.y = section.position.y;
            forge.position.z = section.position.z;
            forgedParts.add(forge);
        }
        if (sectionObj.handrails) {
            var sectHandrails = sectionObj.handrails;
            sectHandrails.rotation.y = section.rotation.y;
            sectHandrails.position.x = section.position.x;
            sectHandrails.position.y = section.position.y;
            sectHandrails.position.z = section.position.z;
            handrails.add(sectHandrails);
        }

        //подпись в dxf
        var textHeight = 30;
        var text = "Ограждение верхней площадки";
        addText(text, textHeight, dxfPrimitivesArr, newPoint_xy(par.dxfBasePoint, 0, -100));
    }

    if (params.calcType == 'timber') {
        marshRailing.position.z += (params.M / 2 + sideOffset / 2) * turnFactor;
    }
    var result = {
        railing: marshRailing,
        forgedParts: forgedParts,
        handrails: handrails,
        handrailParams: handrailParams,
    }
    return result;

} //end of drawMarshRailing

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
        rackPar.userData = { marshId: par.marshId, poleId: 0, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
        rackPar.userData = { marshId: par.marshId, poleId: 1, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
        polePar.userData = { marshId: par.marshId, type: 'railing', elemType: 'pole', place: 'top', pos: copyPoint(pos), key: par.key, len: polePar.len, ang: polePar.poleAngle };
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
        polePar.userData = { marshId: par.marshId, poleId: 0, type: 'railing', elemType: 'pole', place: 'bot', pos: copyPoint(pos), key: par.key, len: polePar.len, ang: polePar.poleAngle };
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
            userData: { marshId: par.marshId, poleId: 0, key: par.key },
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
        rackPar.userData = { marshId: par.marshId, poleId: 2, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
        rackPar.userData = { marshId: par.marshId, poleId: 2, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
        polePar.userData = { marshId: par.marshId, type: 'railing', elemType: 'pole', place: 'top', pos: copyPoint(pos), key: par.key, ang: polePar.poleAngle };
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
        polePar.userData = { marshId: par.marshId, poleId: 2, type: 'railing', elemType: 'pole', place: 'bot', pos: copyPoint(pos), key: par.key, ang: polePar.poleAngle };
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
            userData: { marshId: par.marshId, poleId: 2, key: par.key },
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

        parRacks.angMarsh = angle(topPoint2, topPoint3)
        parRacks.marshLen = distance(topPoint2, topPoint3)

        //делаем чтобы угол секции соответствовал углу марша
        if (par.key == 'in') {
            parRacks.angMarsh = marshPar.ang;
            var pt = itercection(topPoint2, polar(topPoint2, parRacks.angMarsh, 100), topPoint3, polar(topPoint3, Math.PI / 2, 100));
            parRacks.marshLen = distance(topPoint2, pt);
            parRacks.lastRackDeltaLength = pt.y - topPoint3.y; //изменение длины последней стойки марша из-за изменения угла секции
            topPoint3 = copyPoint(pt);
        }

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
            rackPar.userData = { marshId: par.marshId, poleId: 1, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
                rackPar.userData = { marshId: par.marshId, poleId: 1, type: 'railing', elemType: 'firstRack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
            if (parRacks.lastRackDeltaLength) rackPar.len += parRacks.lastRackDeltaLength;
            rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
            if (params.calcType == 'mono') {
                rackPar.monoType = parRacks.marshLast.type;
            }
            rackPar.userData = { marshId: par.marshId, poleId: 1, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
                console.log(dyRackTop)
                shortRackPar.userData = { marshId: par.marshId, poleId: 1, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: shortRackPar.len, key: par.key };
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
        polePar.userData = { marshId: par.marshId, type: 'railing', elemType: 'pole', place: 'top', pos: copyPoint(pos), key: par.key, ang: polePar.poleAngle };
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
        polePar.userData = { marshId: par.marshId, type: 'railing', poleId: 1, elemType: 'pole', place: 'bot', pos: copyPoint(pos), key: par.key, ang: polePar.poleAngle };
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
            userData: { marshId: par.marshId, poleId: 1, key: par.key },
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
        rackPar.userData = { marshId: par.marshId, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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

                shortRackPar.userData = { marshId: par.marshId, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };

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
            userData: { marshId: par.marshId, key: par.key },
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
        rackPar.userData = { marshId: par.marshId, type: 'railing', elemType: 'rack', pos: copyPoint(pos), len: rackPar.len, key: par.key };
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
            userData: { marshId: par.marshId, sectionId: 5, key: par.key },
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
            if (params.calcType == 'mono') extraLen = 80;

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