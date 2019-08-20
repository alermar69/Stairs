/** функция отрисовывает каркас для лестниц всех вариантов геометрии

*/

function drawCarcas(par) {

	par.carcas = new THREE.Object3D();
	par.carcas1 = new THREE.Object3D();
	par.flans = new THREE.Object3D();
	par.treadPlates = new THREE.Object3D();
	var dxfX0 = par.dxfBasePoint.x;
	
	//нижний марш
	var stringerParams1 = {
		marshId: 1,
		dxfBasePoint: par.dxfBasePoint,
		turnSteps: par.treadsObj.wndPar,
		unitsPosObject: par.treadsObj.unitsPos,
	};

	drawComplexStringer(stringerParams1);

	par.carcas.add(stringerParams1.mesh1);
	par.carcas1.add(stringerParams1.mesh2);
	par.flans.add(stringerParams1.flans);
	par.treadPlates.add(stringerParams1.treadPlates);


	//второй марш
	if (params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная трехмаршевая") {
		var stringerParams2 = {
			marshId: 2,
			dxfBasePoint: par.dxfBasePoint,
			turnSteps: par.treadsObj.wndPar,
			unitsPosObject: par.treadsObj.unitsPos,
			};
		if (!par.treadsObj.wndPar && par.treadsObj.wndPar2) stringerParams2.turnSteps = par.treadsObj.wndPar2;
		if (stringerParams1.offsetTopWndHoleY3)
			stringerParams2.offsetTopWndHoleY3 = stringerParams1.offsetTopWndHoleY3

		drawComplexStringer(stringerParams2);
		var pos = par.treadsObj.unitsPos.marsh2;
		if(params.stairModel == "П-образная с забегом") pos = par.treadsObj.unitsPos.turn2;		
				
		if (params.stairModel == 'П-образная трехмаршевая' && getMarshParams(2).stairAmt == 0) {
			//pos.z -= 40;//подогнано но вроде стабильно
		}
		stringerParams2.mesh1.position.x = stringerParams2.mesh2.position.x = stringerParams2.flans.position.x = stringerParams2.treadPlates.position.x = pos.x;
		stringerParams2.mesh1.position.z = stringerParams2.mesh2.position.z = stringerParams2.flans.position.z = stringerParams2.treadPlates.position.z = pos.z;
		stringerParams2.mesh1.position.y = stringerParams2.mesh2.position.y = stringerParams2.flans.position.y = stringerParams2.treadPlates.position.y = pos.y;
		stringerParams2.mesh1.rotation.y = stringerParams2.mesh2.rotation.y = stringerParams2.flans.rotation.y = stringerParams2.treadPlates.rotation.y = pos.rot;


		par.carcas.add(stringerParams2.mesh1);
		par.carcas1.add(stringerParams2.mesh2);
		par.flans.add(stringerParams2.flans);
		par.treadPlates.add(stringerParams2.treadPlates);
		
	}

	if (params.stairModel == "П-образная с площадкой") {
		var stringerParams2 = {
			length: params.M * 2 + params.marshDist,
			marshId: 2,
			dxfBasePoint: par.dxfBasePoint,
			turnSteps: par.treadsObj.wndPar,
			unitsPos: par.treadsObj.unitsPos.marsh3,
			unitsPosObject: par.treadsObj.unitsPos,
			};
		
		//расчет длины косоура под площадкой
		
		if (params.model == "труба") {
			if (params.carcasConfig == "001") {
				stringerParams2.length -= params.M / 2 + params.stringerThickness / 2 + params.flanThickness * 2;
				stringerParams2.length += params.stringerLedge2;
			}
			if (params.carcasConfig == "002") {
				stringerParams2.length -= params.M + params.stringerThickness + params.flanThickness * 2;
			}
			if (params.carcasConfig == "003") {
				stringerParams2.length -= params.flanThickness * 2;
				stringerParams2.length += params.stringerLedge1;
				stringerParams2.length += params.stringerLedge2;
			}
			if (params.carcasConfig == "004") {
				stringerParams2.length -= params.M / 2 + params.stringerThickness / 2 + params.flanThickness * 2;
				stringerParams2.length += params.stringerLedge1;
			}
			if (params.carcasConfig == "003" || params.carcasConfig == "004")
				stringerParams2.stringerLedge = params.stringerLedge1;
		}
		if (params.model == "сварной") {
			stringerParams2.length -= params.M / 2 + params.stringerThickness / 2 + params.flanThickness;
			if (params.carcasConfig == "002" || params.carcasConfig == "004") {
				stringerParams2.length -= 50;
				stringerParams2.isNotFlan = true;
			}
			if (params.carcasConfig == "001" || params.carcasConfig == "003") {
				stringerParams2.length += params.stringerLedge2;
				stringerParams2.stringerLedge = params.stringerLedge2;
				if (params.isColumn4) stringerParams2.isColonPlatformBackTop = true;
			}
			if (params.isColumn3) stringerParams2.isColonPlatformMiddleTop = true;
		}

		drawPltStringer(stringerParams2);

		var turnPar = calcTurnParams(1);//расчитуем параметры нижнего поворота
		var turnLength = (turnPar.turnLengthTop) / 2 + 0.01;// + params.metalThickness / 2;//5 постоянное различие(даже если подвигать параметры)#подогнано
		var x = par.treadsObj.unitsPos.turn1.x + turnLength;
		var y = par.treadsObj.unitsPos.turn1.y - params.treadThickness - params.treadPlateThickness;
		var z = par.treadsObj.unitsPos.turn1.z + (params.stringerThickness / 2 + params.flanThickness) * turnFactor;
		if (params.model == "труба" && (params.carcasConfig == "003" || params.carcasConfig == "004")) z = (params.flanThickness - params.stringerLedge1 - params.M/2) * turnFactor;
        if (params.model == "сварной") z -= (params.flanThickness) * turnFactor;

		stringerParams2.mesh1.position.x = stringerParams2.mesh2.position.x = stringerParams2.flans.position.x = stringerParams2.treadPlates.position.x = x;
		stringerParams2.mesh1.position.z = stringerParams2.mesh2.position.z = stringerParams2.flans.position.z = stringerParams2.treadPlates.position.z = z;
		stringerParams2.mesh1.position.y = stringerParams2.mesh2.position.y = stringerParams2.flans.position.y = stringerParams2.treadPlates.position.y = y;
		stringerParams2.mesh1.rotation.y = stringerParams2.mesh2.rotation.y = stringerParams2.flans.rotation.y = stringerParams2.treadPlates.rotation.y = -Math.PI / 2 * turnFactor;

		par.carcas.add(stringerParams2.mesh1);
		par.carcas1.add(stringerParams2.mesh2);
		par.flans.add(stringerParams2.flans);
		par.treadPlates.add(stringerParams2.treadPlates);

		//дополнительный кусок
		if (params.model == "сварной") {
			stringerParams2.isColonPlatformBackTop = false;
			stringerParams2.isColonPlatformMiddleTop = false;
			stringerParams2.length = turnLength - params.stringerThickness / 2 - params.flanThickness;
			stringerParams2.isNotFlan = false;
			if (params.carcasConfig == "001" || params.carcasConfig == "003") {
				stringerParams2.length -= 50;
				stringerParams2.isNotFlan = true;
			}
			if (params.carcasConfig == "002" || params.carcasConfig == "004") {
				stringerParams2.length += params.stringerLedge2;
				stringerParams2.backOffHoles = params.stringerLedge2;
				if (params.isColumn4) stringerParams2.isColonPlatformBackTop = true;
			}
			stringerParams2.isNotHoles = true;
			stringerParams2.isTreadPlate = true;
			stringerParams2.marshId1 = 21;


			drawPltStringer(stringerParams2);

			var turnPar = calcTurnParams(1); //расчитуем параметры нижнего поворота
			var x = par.treadsObj.unitsPos.turn1.x + turnLength + params.stringerThickness / 2;
			var z = par.treadsObj.unitsPos.turn1.z + (params.M + params.marshDist) * turnFactor;
			var y = par.treadsObj.unitsPos.turn1.y - params.treadThickness - params.treadPlateThickness;

			stringerParams2.mesh1.position.x = stringerParams2.mesh2.position.x = stringerParams2.flans.position.x = stringerParams2.treadPlates.position.x = x;
			stringerParams2.mesh1.position.z = stringerParams2.mesh2.position.z = stringerParams2.flans.position.z = stringerParams2.treadPlates.position.z = z;
			stringerParams2.mesh1.position.y = stringerParams2.mesh2.position.y = stringerParams2.flans.position.y = stringerParams2.treadPlates.position.y = y;
			
			par.carcas.add(stringerParams2.mesh1);
			par.carcas1.add(stringerParams2.mesh2);
			par.flans.add(stringerParams2.flans);
			par.treadPlates.add(stringerParams2.treadPlates);
			//---------------------------------------------------------------------
			if (params.carcasConfig == "003" || params.carcasConfig == "004") {
				stringerParams2.length = params.M / 2 - params.stringerThickness / 2 - params.flanThickness;
				stringerParams2.length += params.stringerLedge1;
				
				stringerParams2.isNotHoles = true;
				stringerParams2.isTreadPlate = false;
				stringerParams2.isNotFlan = false;
				stringerParams2.isReversBolt = true;
				stringerParams2.isReversFlans = true;
				stringerParams2.isColonPlatformBackTop = false;
				stringerParams2.isColonPlatformMiddleTop = false;
				if (params.isColumn1) stringerParams2.isColonPlatformBackTop1 = true;
				stringerParams2.marshId1 = 22;

				drawPltStringer(stringerParams2);

				var turnPar = calcTurnParams(1); //расчитуем параметры нижнего поворота
				var x = par.treadsObj.unitsPos.turn1.x + turnLength;
                var z = par.treadsObj.unitsPos.turn1.z + (params.flanThickness - params.M / 2 - params.stringerLedge1) * turnFactor;
				var y = par.treadsObj.unitsPos.turn1.y - params.treadThickness - params.treadPlateThickness;

				stringerParams2.mesh1.position.x = stringerParams2.mesh2.position.x = stringerParams2.flans.position.x = stringerParams2.treadPlates.position.x = x;
				stringerParams2.mesh1.position.z = stringerParams2.mesh2.position.z = stringerParams2.flans.position.z = stringerParams2.treadPlates.position.z = z;
				stringerParams2.mesh1.position.y = stringerParams2.mesh2.position.y = stringerParams2.flans.position.y = stringerParams2.treadPlates.position.y = y;
				stringerParams2.mesh1.rotation.y = stringerParams2.mesh2.rotation.y = stringerParams2.flans.rotation.y = stringerParams2.treadPlates.rotation.y -= Math.PI / 2 * turnFactor;


				par.carcas.add(stringerParams2.mesh1);
				par.carcas1.add(stringerParams2.mesh2);
				par.flans.add(stringerParams2.flans);
				par.treadPlates.add(stringerParams2.treadPlates);
			}
		}

		par.dxfBasePoint = newPoint_xy(stringerParams2.dxfBasePoint, 1000, 0);
	}

	//третий марш
	if (params.stairModel != "Прямая") {

		var stringerParams3 = {
			marshId: 3,
			dxfBasePoint: par.dxfBasePoint,
			turnSteps: par.treadsObj.wndPar,
			unitsPos: par.treadsObj.unitsPos.marsh3,
			unitsPosObject: par.treadsObj.unitsPos,
			};

		if (!par.treadsObj.wndPar && par.treadsObj.wndPar2) stringerParams3.turnSteps = par.treadsObj.wndPar2;
		if (stringerParams2) {
			if (stringerParams2.offsetTopWndHoleY3)
				stringerParams3.offsetTopWndHoleY3 = stringerParams2.offsetTopWndHoleY3
		}
		else {
			if (stringerParams1.offsetTopWndHoleY3)
				stringerParams3.offsetTopWndHoleY3 = stringerParams1.offsetTopWndHoleY3
		}

		drawComplexStringer(stringerParams3);

		stringerParams3.mesh1.position.x = stringerParams3.mesh2.position.x = stringerParams3.flans.position.x = stringerParams3.treadPlates.position.x = par.treadsObj.unitsPos.marsh3.x;
		stringerParams3.mesh1.position.z = stringerParams3.mesh2.position.z = stringerParams3.flans.position.z = stringerParams3.treadPlates.position.z = par.treadsObj.unitsPos.marsh3.z;
		stringerParams3.mesh1.position.y = stringerParams3.mesh2.position.y = stringerParams3.flans.position.y = stringerParams3.treadPlates.position.y = par.treadsObj.unitsPos.marsh3.y;
		stringerParams3.mesh1.rotation.y = stringerParams3.mesh2.rotation.y = stringerParams3.flans.rotation.y = stringerParams3.treadPlates.rotation.y = par.treadsObj.unitsPos.marsh3.rot;
		if (testingMode && (params.stairModel == 'П-образная с площадкой' || params.stairModel == 'П-образная с забегом') && turnFactor == -1) {
			stringerParams3.mesh1.position.x = stringerParams3.mesh2.position.x = stringerParams3.flans.position.x = stringerParams3.treadPlates.position.x -= 0.01;
		}
		if (params.stairModel == 'П-образная с площадкой') {
			stringerParams3.mesh1.position.x = stringerParams3.mesh2.position.x = stringerParams3.flans.position.x = stringerParams3.treadPlates.position.x -= 0.01;
		}

		par.carcas.add(stringerParams3.mesh1);
		par.carcas1.add(stringerParams3.mesh2);
		par.flans.add(stringerParams3.flans);
		par.treadPlates.add(stringerParams3.treadPlates);
	}

	return par;
}


function setRackPos(marshId) {

	// номера средних ступеней марша, где устанавливается стойка
	var rackPos = [];

	var marshParams = getMarshParams(marshId);
	var stairAmt = marshParams.stairAmt;

	//учитываем начало ограждений не с первой ступени
	if (marshId == 1) stairAmt -= params.railingStart;

	if (stairAmt == 5) rackPos = [3];
	if (stairAmt == 6) rackPos = [4];
	if (stairAmt == 7) rackPos = [4];
	if (stairAmt == 8) rackPos = [3, 6];
	if (stairAmt == 9) rackPos = [4, 6];
	if (stairAmt == 10) rackPos = [4, 7];
	if (stairAmt == 11) rackPos = [3, 6, 9];
	if (stairAmt == 12) rackPos = [3, 6, 9];
	if (stairAmt == 13) rackPos = [4, 7, 10];
	if (stairAmt == 14) rackPos = [3, 6, 9, 12];
	if (stairAmt == 15) rackPos = [3, 6, 9, 12];
	if (stairAmt == 16) rackPos = [4, 7, 10, 13];
	if (stairAmt == 17) rackPos = [3, 6, 9, 12, 15];
	if (stairAmt == 18) rackPos = [4, 7, 10, 13, 16];
	if (stairAmt == 19) rackPos = [4, 7, 10, 13, 16];
	if (stairAmt == 20) rackPos = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 21) rackPos = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 22) rackPos = [4, 7, 10, 13, 16, 19];
	if (stairAmt == 23) rackPos = [3, 6, 9, 12, 15, 18, 21];
	if (stairAmt == 24) rackPos = [3, 6, 9, 12, 15, 18, 21];
	if (stairAmt == 25) rackPos = [4, 7, 10, 13, 16, 19, 22];


	return rackPos;

} //end of setRackPos

//---------------------------------------------------------------------

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

	var maxLen = 3000;
	if (!(meterHandrailPar.mat == 'timber' && meterHandrailPar.handrailType != 'ПВХ')) maxLen = 4000;

	var newPoints = [];
	for (var i = 0; i < points.length - 1; i++) {
		var point = points[i];
		var nextPoint = points[i + 1];
		var len = distance(point, nextPoint);
		newPoints.push(point);
		if (len > maxLen) {
			//var midPoint = midpoint(point, nextPoint);
			var midPoint = { x: Math.round((point.x + nextPoint.x) / 2 * 1000) / 1000, y: Math.round((point.y + nextPoint.y) / 2 * 1000) / 1000 };
			// var ang = angle(point, nextPoint);
			midPoint.isMidpoint = true;
			newPoints.push(midPoint);
		}
		if (i == points.length - 2) {
			newPoints.push(nextPoint);
		}
	}
	points = newPoints;
	//расчет длин и углов всех участков поручня
	var startOffset = 0; //смещение начала текущего куска поручня от базовой точки
	var startAngle = Math.PI / 2; //угол начала текущего куска поручня
	var previousLength = 0; //Длинна предыдущего куска, необходима для рассчета конечной точки предыдущего куска

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

			if ((par.connection == "без зазора" || par.connection == "без зазора премиум") && p3) {
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
			if (!(par.connection == "без зазора" || par.connection == "без зазора премиум")) {
				endAngle = Math.PI / 2;
				var length = distance(p1, p2) - meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle);
			}

			//последний кусок
			if (i == points.length - 2) {
				endAngle = Math.PI / 2;
				if ((params.handrailEndType == "под углом" || par.isHandrailEndAng) && p2.x != p1.x) {
					endAngle = Math.PI / 2 - handrailAngle;
				}
				var length = distance(p1, p2);
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

			if (par.connection == "без зазора" || par.connection == "без зазора премиум") endOffset = 0;

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


			var key = getSide().in == par.side ? 'in' : 'out';

			if (par.side == 'in' || par.side == 'out') key = par.side;
			if (turnFactor == -1 && (par.side == 'in' || par.side == 'out')) key = par.side == 'in' ? 'out' : 'in';
			//Блок отвечает за отрисовку стыка без зазора стандарт
			if (params.handrailConnectionType == "без зазора" && par.points.length > 2) {
				var handrailOffset = 100; //Отступ от места стыка(нижний)

				if (i > 0) {

					var angle1 = angle(basePoint, points[i - 1])
					var angle2 = handrailAngle;

					var unitBasePoint = basePoint;

					var connectionUnitPar = {
						offset: handrailOffset,
						center: unitBasePoint,
						angle1: angle1,
						angle2: angle2,
						dxfBasePoint: par.dxfBasePoint,
						drawing: { group: 'handrails', elemType: 'connectionUnit', marshId: par.marshId, pos: polar(basePoint, angle1, -handrailOffset), ang: angle1, key: key, profHeight: meterHandrailPar.profY }
					};
					connectionUnitPar.drawing.baseAngle = angle(points[0], points[points.length - 1]) / Math.PI * 180;

					var p1 = polar(basePoint, angle1, -100);
					var p2 = polar(basePoint, angle2, 100);
					var anglePos = { center: basePoint, p1: p1, p2: p2 };

					if (angle2 > angle1) {
						var p1 = polar(p1, angle1 + Math.PI / 2, meterHandrailPar.profY);
						var p2 = polar(p2, angle2 + Math.PI / 2, meterHandrailPar.profY);
						var center = itercection(p1, polar(p1, angle1, 100), p2, polar(p2, angle2, -100));
						var anglePos = { center: center, p1: p1, p2: p2 };
					}
					connectionUnitPar.drawing.anglePos = anglePos;

					var connectionUnit = drawConnectionUnit(connectionUnitPar);
					connectionUnit.position.z = 50 - meterHandrailPar.profZ / 2;
					if (key == 'in') connectionUnit.position.z = -50 - meterHandrailPar.profZ / 2;

					if (turnFactor == -1 && key == 'in') connectionUnit.position.z = 50 - meterHandrailPar.profZ / 2;
					if (turnFactor == -1 && key == 'out') connectionUnit.position.z = -50 - meterHandrailPar.profZ / 2;


					par.mesh.add(connectionUnit);

					var plugDiam = 10;

					var plug = drawTimberPlug(plugDiam);

					var plugPosition = polar(basePoint, handrailAngle, 100);
					plugPosition = polar(plugPosition, handrailAngle + Math.PI / 2, meterHandrailPar.profY / 2);
					plugPosition = polar(plugPosition, handrailAngle, -plugDiam - 10);

					plug.position.x = plugPosition.x;
					plug.position.y = plugPosition.y;

					plug.position.z = 50 - meterHandrailPar.profZ / 2 - 1;
					if (key == 'in') plug.position.z = meterHandrailPar.profZ / 2 - 50 + 1;

					if (turnFactor == -1 && key == 'in') plug.position.z = 50 - meterHandrailPar.profZ / 2 - 1;
					if (turnFactor == -1 && key == 'out') plug.position.z = meterHandrailPar.profZ / 2 - 50 + 1;

					plug.rotation.x = Math.PI / 2;

					if (!testingMode) par.mesh.add(plug);
				}
				if (i == 0) {
					length -= handrailOffset + meterHandrailPar.profY * Math.tan(Math.PI / 2 - endAngle);
				} else if (i == points.length - 2) {
					length -= handrailOffset;
					basePoint = polar(basePoint, handrailAngle, handrailOffset);
				} else {
					length -= handrailOffset;
					length -= handrailOffset + meterHandrailPar.profY * Math.tan(Math.PI / 2 - endAngle);
					basePoint = polar(basePoint, handrailAngle, handrailOffset);
				}

				startAngle = Math.PI / 2;
				endAngle = Math.PI / 2;
			}

			var angle1 = handrailAngle;
			if (i > 0) angle1 = angle(basePoint, points[i - 1])
			var angle2 = handrailAngle;

			if (params.handrailConnectionType == 'прямые' && i > 0 && angle1.toFixed(4) != angle2.toFixed(4)) {
				var handrailOffset = 20;

				var unitBasePoint = basePoint;
				if ((angle2 - angle1) > 0) {
					unitBasePoint = polar(unitBasePoint, handrailAngle, -startOffset);
				}
				unitBasePoint = polar(unitBasePoint, handrailAngle + Math.PI / 2, - 0.05); // Зазор для того чтобы избежать пересечений

				var handrailConnectionFlanPar = {
					offset: handrailOffset,
					center: unitBasePoint,
					angle1: angle1,
					angle2: angle2,
					dxfBasePoint: par.dxfBasePoint,
				};

				var connectionFlan = drawHandrailConnectionFlan(handrailConnectionFlanPar);

				connectionFlan.position.z = 50 - meterHandrailPar.profZ / 2;
				if (key == 'in') connectionFlan.position.z = -50 - meterHandrailPar.profZ / 2;

				if (turnFactor == -1 && key == 'in') connectionFlan.position.z = 50 - meterHandrailPar.profZ / 2;
				if (turnFactor == -1 && key == 'out') connectionFlan.position.z = -50 - meterHandrailPar.profZ / 2;

				if (params.stairModel == 'Прямая' && params.calcType == 'vhod') {
					connectionFlan.position.z = -connectionFlan.position.z - meterHandrailPar.profZ;
				}

				if (!testingMode) par.mesh.add(connectionFlan);
			}

			if ((params.handrailConnectionType == "без зазора премиум" || params.handrailConnectionType == "без зазора") && i < points.length - 2 && meterHandrailPar.mat == 'timber') {

				var plugDiam = 10;

				var plug = drawTimberPlug(plugDiam);

				var plugPosition = polar(basePoint, handrailAngle, length);
				plugPosition = polar(plugPosition, handrailAngle + Math.PI / 2, meterHandrailPar.profY / 2);
				plugPosition = polar(plugPosition, handrailAngle, -plugDiam - 10);

				plug.position.x = plugPosition.x;
				plug.position.y = plugPosition.y;

				plug.position.z = 50 - meterHandrailPar.profZ / 2 - 1;
				if (key == 'in') plug.position.z = meterHandrailPar.profZ / 2 - 50 + 1;

				if (turnFactor == -1 && key == 'in') plug.position.z = 50 - meterHandrailPar.profZ / 2 - 1;
				if (turnFactor == -1 && key == 'out') plug.position.z = meterHandrailPar.profZ / 2 - 50 + 1;

				plug.rotation.x = Math.PI / 2;

				if (!testingMode) par.mesh.add(plug);
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
				marshId: par.marshId,
				drawing: { group: 'handrails', marshId: par.marshId, pos: basePoint, ang: handrailAngle, key: key, profHeight: meterHandrailPar.profY }
			}
			handrailParams.drawing.baseAngle = angle(points[0], points[points.length - 1]) / Math.PI * 180;

			if (i == 0) handrailParams.startChamfer = "R6";
			if (i == points.length - 2) handrailParams.endChamfer = "R6";

			if (params.railingModel == "Самонесущее стекло") handrailParams.isGlassHandrail = true;
			if (params.railingModel == 'Самонесущее стекло' && params.handrailFixType == "паз") handrailParams.hasSilicone = true;
			if (params.railingModel == "Кованые балясины" && params.handrailFixType == "паз") handrailParams.hasSilicone = true;
			if (par.connection !== "без зазора" && par.points.length > 0 && i > 0) {
				var previousAngle = angle(points[i - 1], points[i]);
				var angP1 = polar(basePoint, previousAngle, -100);
				var angP2 = polar(basePoint, handrailAngle, 100);
				var anglePos = { center: copyPoint(basePoint), p1: angP1, p2: angP2 };


				if (handrailAngle > previousAngle && par.connection !== 'прямые') {
					var angP1 = polar(angP1, previousAngle + Math.PI / 2, meterHandrailPar.profY);
					var angP2 = polar(angP2, handrailAngle + Math.PI / 2, meterHandrailPar.profY);
					var center = itercection(angP1, polar(angP1, previousAngle, 100), angP2, polar(angP2, handrailAngle, -100));
					var anglePos = { center: center, p1: angP1, p2: angP2 };
				}
				if (handrailAngle > previousAngle && par.connection == 'прямые') {
					var center = polar(basePoint, handrailAngle + Math.PI / 2, meterHandrailPar.profY);
					var angP1 = polar(center, previousAngle, -100);
					var angP2 = polar(center, handrailAngle, 100);
					var anglePos = { center: center, p1: angP1, p2: angP2 };
				}

				handrailParams.drawing.anglePos = anglePos;
			}

			handrailParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

			if (i == (par.points.length - 2) && marshPar.lastMarsh && params.railingModel == "Самонесущее стекло" && params.handrailFixType == 'паз') {
				handrailParams.drawing.isGlassLast = true;
			}

			if (i == 0 || params.handrailConnectionType == 'прямые') handrailParams.startPlug = true;
			if (i == (points.length - 2) || params.handrailConnectionType == 'прямые') handrailParams.endPlug = true;

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
			if (par.topPoint && i == 0) {
				//если нет последней стойки
				if (par.topPoint.noDraw) {
					var holderPar = {
						topPoint: polar(basePoint, handrailAngle, handrailParams.length),//точка верхнего края поручня
						holderAng: par.topPoint.holderAng,
						dxfBasePoint: handrailParams.dxfBasePoint,
					}
					var pt = newPoint_xy(par.topPoint, par.topPoint.dxToMarshNext - 40 - 0.01, 0); //40 - ширина стойки
					holderPar.topPoint = itercection(basePoint, polar(basePoint, handrailAngle, 100), pt, polar(pt, Math.PI / 2, 100))
					if (meterHandrailPar.handrailModel == "round")
						holderPar.topPoint.y -= meterHandrailPar.profY / 2 / Math.cos(handrailAngle);

					holderPar.dxfBasePoint = newPoint_xy(handrailParams.dxfBasePoint, -basePoint.x, -basePoint.y);

					var holder = drawHandrailHolderTurnRack(holderPar).mesh;
					holder.position.z += -30 * turnFactor;
					if (params.calcType === 'mono' && turnFactor == 1) holder.position.z -= 100;
					par.mesh.add(holder);
				}
			}

			//сохраняем начальный параметры для следующего участка
			startAngle = -endAngle;
			startOffset = endOffset;
			previousLength = length;
		}

	}

	par.meterHandrailPar = meterHandrailPar;

	return par;
} //end of drawPolylineHandrail

function drawRailing(par) {
	/*функция отрисовывает ограждения на все марши всех лестниц
	парметры:
	dxfBasePoint
	treadsObj
	stringerParams - только для metal
	*/
	var dxfX0 = par.dxfBasePoint.x;
	par.mesh = new THREE.Object3D();
	par.forgedParts = new THREE.Object3D();
	par.handrails = new THREE.Object3D();

	//ограждения нижнего марша
	par.handrailParams = {};

	var marshId = 1;
	var railingObj = drawMarshRailing(par, marshId);
	var railing = railingObj.railing;
	par.mesh.add(railing);
	if (railingObj.forgedParts) {
		var forge = railingObj.forgedParts;
		par.forgedParts.add(railingObj.forgedParts);
	}
	if (railingObj.handrails) {
		var handrails = railingObj.handrails;
		par.handrails.add(railingObj.handrails);
	}
	par.handrailParams[marshId] = railingObj.handrailParams;

	// ограждения второго марша
	if (params.stairModel == "П-образная трехмаршевая" || (params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная с площадкой")) {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		marshId = 2;
		var railingObj = drawMarshRailing(par, marshId);
		par.handrailParams[marshId] = railingObj.handrailParams;
		var baseUnitPos = par.treadsObj.unitsPos.marsh2;
		if (params.stairModel == "П-образная с забегом") {
			baseUnitPos = par.treadsObj.unitsPos.turn2;
			//костыль по аналогии с каркасом
			if (params.model == "лт") baseUnitPos.z -= (params.marshDist - 35) * turnFactor;
			if (params.model == "ко") baseUnitPos.z -= (params.M + params.marshDist - 35 - params.stringerThickness) * turnFactor;
		}
		if (params.stairModel == "П-образная с площадкой") {
			baseUnitPos = par.treadsObj.unitsPos.turn1;
			//костыль по аналогии с каркасом
			//if (params.model == "лт") baseUnitPos.z -= (params.marshDist - 35) * turnFactor;
			//if (params.model == "ко") baseUnitPos.z -= (params.M + params.marshDist - 35 - params.stringerThickness) * turnFactor;
		}

		// if (params.calcType == 'timber') {
		// 	baseUnitPos = copyPoint(par.treadsObj.unitsPos.turn1);
		// 	baseUnitPos.x += -params.M / 2 + params.platformLength_1;
		// 	if (params.model == 'тетивы' || params.model == 'тетива+косоур') {
		// 		// basePltPoint.x += params.stringerThickness + 10;
		// 		baseUnitPos.y += 15;
		// 	}
		// 	baseUnitPos.rot = - Math.PI / 2 * turnFactor
		// }

		var railing = railingObj.railing;
		railing.position.x += baseUnitPos.x;
		railing.position.y += baseUnitPos.y;
		railing.position.z += baseUnitPos.z;
		railing.rotation.y = baseUnitPos.rot;
		par.mesh.add(railing)

		if (railingObj.forgedParts) {
			var forge = railingObj.forgedParts;
			forge.position.x += baseUnitPos.x;
			forge.position.y += baseUnitPos.y;
			forge.position.z += baseUnitPos.z;
			forge.rotation.y = baseUnitPos.rot;
			par.forgedParts.add(forge);
		}
		if (railingObj.handrails) {
			var handrails = railingObj.handrails;
			handrails.position.x += baseUnitPos.x;
			handrails.position.y += baseUnitPos.y;
			handrails.position.z += baseUnitPos.z;
			handrails.rotation.y = baseUnitPos.rot;
			par.handrails.add(handrails);
		}
	}

	if (params.stairModel == "П-образная с площадкой" && params.backRailing_1 == "есть" && params.calcType == 'timber') {

		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		marshId = 2;
		var railingObj = drawMarshRailing(par, marshId);
		par.handrailParams[marshId] = railingObj.handrailParams;
		var basePltPoint = copyPoint(par.treadsObj.unitsPos.turn1);
		basePltPoint.x += -params.M / 2 + params.platformLength_1;
		if (params.model == 'тетивы' || params.model == 'тетива+косоур') {
			// basePltPoint.x += params.stringerThickness + 10;
			basePltPoint.y += 15;
		}
		basePltPoint.rot = - Math.PI / 2 * turnFactor

		var railing = railingObj.railing;
		railing.position.x += basePltPoint.x;
		railing.position.y += basePltPoint.y;
		railing.position.z += basePltPoint.z;
		railing.rotation.y = basePltPoint.rot;
		par.mesh.add(railing)

		if (railingObj.forgedParts) {
			var forge = railingObj.forgedParts;
			forge.position.x += basePltPoint.x;
			forge.position.y += basePltPoint.y;
			forge.position.z += basePltPoint.z;
			forge.rotation.y = basePltPoint.rot;
			par.forgedParts.add(forge);
		}
		if (railingObj.handrails) {
			var handrails = railingObj.handrails;
			handrails.position.x += basePltPoint.x;
			handrails.position.y += basePltPoint.y;
			handrails.position.z += basePltPoint.z;
			handrails.rotation.y = basePltPoint.rot;
			par.handrails.add(handrails);
		}
	}

	//ограждение верхнего марша

	if (params.stairModel != "Прямая" && params.stairModel != "Прямая с промежуточной площадкой" && params.stairModel != "Прямая горка") {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		marshId = 3;
		var railingObj = drawMarshRailing(par, marshId);
		par.handrailParams[marshId] = railingObj.handrailParams;
		var railing = railingObj.railing;

		railing.position.x += par.treadsObj.unitsPos.marsh3.x;
		railing.position.y += par.treadsObj.unitsPos.marsh3.y;
		railing.position.z += par.treadsObj.unitsPos.marsh3.z;
		railing.rotation.y = par.treadsObj.unitsPos.marsh3.rot;
		par.mesh.add(railing);

		if (railingObj.forgedParts) {
			var forge = railingObj.forgedParts;
			forge.position.x += par.treadsObj.unitsPos.marsh3.x;
			forge.position.y += par.treadsObj.unitsPos.marsh3.y;
			forge.position.z += par.treadsObj.unitsPos.marsh3.z;
			forge.rotation.y = par.treadsObj.unitsPos.marsh3.rot;
			par.forgedParts.add(forge);
		}
		if (railingObj.handrails) {
			var handrails = railingObj.handrails;
			handrails.position.x += par.treadsObj.unitsPos.marsh3.x;
			handrails.position.y += par.treadsObj.unitsPos.marsh3.y;
			handrails.position.z += par.treadsObj.unitsPos.marsh3.z;
			handrails.rotation.y = par.treadsObj.unitsPos.marsh3.rot;
			par.handrails.add(handrails);
		}
	}

	//ограждения верхней площадки

	if (params.platformTop != "нет") {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		marshId = "topPlt";
		var railingObj = drawMarshRailing(par, marshId);
		var railing = railingObj.railing;

		railing.position.x += par.treadsObj.lastMarshEnd.x;
		railing.position.y += par.treadsObj.lastMarshEnd.y;
		railing.position.z += par.treadsObj.lastMarshEnd.z;
		railing.rotation.y = par.treadsObj.lastMarshEnd.rot + Math.PI / 2;
		par.mesh.add(railing);

		if (railingObj.forgedParts) {
			var forge = railingObj.forgedParts;
			forge.position.x += par.treadsObj.lastMarshEnd.x;
			forge.position.y += par.treadsObj.lastMarshEnd.y;
			forge.position.z += par.treadsObj.lastMarshEnd.z;
			forge.rotation.y = par.treadsObj.lastMarshEnd.rot + Math.PI / 2;
			par.forgedParts.add(forge);
		}
		if (railingObj.handrails) {
			var handrails = railingObj.handrails;
			handrails.position.x += par.treadsObj.lastMarshEnd.x;
			handrails.position.y += par.treadsObj.lastMarshEnd.y;
			handrails.position.z += par.treadsObj.lastMarshEnd.z;
			handrails.rotation.y = par.treadsObj.lastMarshEnd.rot + Math.PI / 2;
			par.handrails.add(handrails);
		}

	}

	if (params.calcType == 'timber' || params.calcType == 'timber_stock') {
		if (params.stairModel !== 'Прямая') par.mesh.position.x -= params.M / 2;
		if (params.stairModel == 'Прямая') {
			par.mesh.position.z -= params.M / 2 * turnFactor;
			if (params.model == 'тетивы' || (params.model == 'тетива+косоур' && par.side == 'внешнее')) {
				// par.mesh.position.z += params.rackSize * turnFactor;
			}
			// par.mesh.position.x += params.M / 2;
		}
		if (params.stairModel == 'П-образная трехмаршевая' || params.stairModel == 'П-образная с забегом' || params.stairModel == 'П-образная с площадкой') {
			par.mesh.position.z += params.M / 2 * turnFactor;
			par.mesh.position.x += params.M / 2;
		}
	}

	return par;

} //end of drawRailing

function drawRailingSection_4(par) {
	var section = new THREE.Object3D();
	par.mesh = section;

	// var turnFactor = params.turnSide == 'левое' ? -1 : 1;

	var stringerParams = par.stringerParams;
	var side = stringerParams.side;
	var model = stringerParams.type;

	var marshPar = getMarshParams(par.marshId);
	var rackSize = params.rackSize;
	var riserThickness = params.riserThickness || 0;
	if (!rackSize) rackSize = 95;

	if ((params.calcType == 'lt-ko' || params.calcType == 'mono' || params.calcType == 'timber_stock')) {
		side = (par.side == 'left' && turnFactor == 1) ? 'out' : 'in';
		if (turnFactor == -1) {
			side = (par.side == 'left' && turnFactor == -1) ? 'in' : 'out';
		}
		model = 'косоур';
	}
	var zeroPoint = { x: 0, y: 0 };
	if (par.botEnd !== 'нет') {
		par.hasFirstRack = !getMarshParams(marshPar.prevMarshId).hasRailing.out;
	}
	if (par.botEnd !== 'нет' && (params.stairModel == 'П-образная с площадкой' || params.stairModel == 'П-образная с забегом')) {
		par.hasFirstRack = true;
	}

	if (side == 'in') par.hasFirstRack = false;
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) par.hasFirstRack = false;

	//параметры марша
	par.a = marshPar.a;
	par.b = marshPar.b;
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) par.b = params.marshDist;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;
	par.lastMarsh = marshPar.lastMarsh;

	var railingRacks = calcRailingRacks({ marshId: par.marshId, side: side });
	if (model == 'косоур') {
		if (params.stairModel == 'П-образная с забегом' && par.marshId == 2)
			railingRacks.marshLast = railingRacks.marshFirst;

		if (railingRacks.botFirst) var botFirst = railingRacks.botFirst;
		if (railingRacks.marshFirst) var marshFirst = railingRacks.marshFirst;
		if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
		if (railingRacks.topLast) var topLast = railingRacks.topLast;

		if (railingRacks.botFirst) {
			var botFirstRailingPoint = newPoint_xy(botFirst, rackSize / 2, 0);
			var botLastRailingPoint = newPoint_xy(marshFirst, -rackSize / 2, 0);
		}
		if (railingRacks.marshFirst) {
			var marshFirstRailingPoint = newPoint_xy(marshFirst, rackSize / 2, 0);
			var marshLastRailingPoint = newPoint_xy(marshLast, -rackSize / 2, 0);
			// if(params.railingModel == "Стекло") marshFirstRailingPoint.y += par.h + 50 + 60 / Math.cos(marshPar.ang);
		}

		if (railingRacks.topLast) {
			var topFirstRailingPoint = newPoint_xy(marshLast, rackSize / 2, 0);
			var topLastRailingPoint = newPoint_xy(topLast, -rackSize / 2, 0);
		}
	}
	if (model == 'тетива') {
		if (stringerParams.keyPoints.botFirst) var botFirst = stringerParams.keyPoints.botFirst;
		if (stringerParams.keyPoints.marshFirst) var marshFirst = stringerParams.keyPoints.marshFirst;
		if (stringerParams.keyPoints.marshLast) var marshLast = stringerParams.keyPoints.marshLast;
		if (stringerParams.keyPoints.topLast) var topLast = stringerParams.keyPoints.topLast;

		if (stringerParams.keyPoints.botFirstRailingPoint) var botFirstRailingPoint = stringerParams.keyPoints.botFirstRailingPoint;
		if (stringerParams.keyPoints.botLastRailingPoint) var botLastRailingPoint = stringerParams.keyPoints.botLastRailingPoint;
		if (stringerParams.keyPoints.marshFirstRailingPoint) var marshFirstRailingPoint = stringerParams.keyPoints.marshFirstRailingPoint;
		if (stringerParams.keyPoints.marshLastRailingPoint) var marshLastRailingPoint = stringerParams.keyPoints.marshLastRailingPoint;
		if (stringerParams.keyPoints.topFirstRailingPoint) var topFirstRailingPoint = stringerParams.keyPoints.topFirstRailingPoint;
		if (stringerParams.keyPoints.topLastRailingPoint) var topLastRailingPoint = stringerParams.keyPoints.topLastRailingPoint;

		if (par.marshId == 1) {
			var stepMooveAmt = 0;
			if (params.firstNewellPos == "на первой ступени") stepMooveAmt = 1;
			if (params.firstNewellPos == "на второй ступени") stepMooveAmt = 2;
			if (stepMooveAmt) {
				//marshFirst = newPoint_xy(stringerParams.keyPoints.marshFirst, par.b * stepMooveAmt, par.h * stepMooveAmt);
				marshFirstRailingPoint = newPoint_xy(stringerParams.keyPoints.marshFirstRailingPoint, par.b * stepMooveAmt, par.h * stepMooveAmt);
			}
		}

	}
	if (model == 'тетива' && params.stairModel == 'П-образная с площадкой' && par.marshId == 2) {
		if (railingRacks.marshFirst) var marshFirst = railingRacks.marshFirst;
		if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
		if (railingRacks.marshFirst) {
			var marshFirstRailingPoint = newPoint_xy(marshFirst, rackSize / 2, 0);
			var marshLastRailingPoint = newPoint_xy(marshLast, -rackSize / 2, 0);
		}
	}
	if (par.stairAmt == 0) {
		if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
		if (railingRacks.topLast) var topLast = railingRacks.topLast;
		if (railingRacks.marshLast && model == 'тетива') {
			var topFirstRailingPoint = stringerParams.keyPoints.topFirstRailingPoint;//newPoint_xy(marshLast, rackSize / 2, 0);
			if (par.topEnd == 'площадка') {
				topFirstRailingPoint = newPoint_xy(marshLast, rackSize / 2, 0);
				topFirstRailingPoint.y = stringerParams.keyPoints.topFirstRailingPoint.y;
			}
			var topLastRailingPoint = stringerParams.keyPoints.topLastRailingPoint;//newPoint_xy(topLast, -rackSize / 2, 0);
		}
		if (railingRacks.marshLast && model == 'косоур') {
			var topFirstRailingPoint = newPoint_xy(marshLast, rackSize / 2, 0);
			var topLastRailingPoint = newPoint_xy(topLast, -rackSize / 2, 0);
		}
	}

	//позиция секции по Z: на косоурах торец столба вровень с торцом ступени, на тетивах ось совпадает с осью тетивы
	var posZ = 0;

	if (model == "тетива") {
		posZ = params.stringerThickness / 2;
		if (par.side == "right") posZ = -params.stringerThickness / 2;
	}

	if (model == "косоур") {
		posZ = rackSize / 2;
		if (par.side == "right") posZ = -rackSize / 2;
	}
	if (model == "косоур" && (params.calcType == 'lt-ko' || params.calcType == 'mono')) {
		posZ = (rackSize / 2 + 40) * turnFactor;
		if (turnFactor == -1) posZ -= 5;
		if (side == "in") posZ = -rackSize / 2 * turnFactor;
		// if (side == "in" && turnFactor == 1) posZ -= 5;
	}

	if ((params.stairModel == 'П-образная с площадкой' || (params.stairModel == 'П-образная с забегом' && model == 'тетива')) && par.marshId == 2) {
		par.posZ = posZ;

		par.railingRacks = railingRacks;
		par.stringerType = model;
		var pltRailingMesh = drawRailingSection_4_pltP(par);

		par.mesh = pltRailingMesh;
		return par;
	}

	var hasTopRack = true;
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) {
		var hasTopRack = !getMarshParams(3).hasRailing.out;
	}

	//Избавляем себя от ошибок и не отрисовываем части которые не просчитались
	var hasBot = false;
	var hasMarsh = false;
	var hasTop = false;
	if (botFirstRailingPoint && botLastRailingPoint) hasBot = true;
	if (marshFirstRailingPoint && marshLastRailingPoint) hasMarsh = true;
	if (topFirstRailingPoint && topLastRailingPoint) hasTop = true;
	if (par.marshId == 1) {
		if (marshPar.stairAmt < 2) hasMarsh = false;
		if (marshPar.stairAmt == 2 && params.firstNewellPos == 'на второй ступени') hasMarsh = false;
	}
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) {
		hasMarsh = false;
	}

	var newellXOffset = 0;
	if (params.startNewellType == "резной") {
		if (params.startNewellModel == "01") newellXOffset = -10;
		if (params.startNewellModel == "02") newellXOffset = -10 - 215;
		if (params.startNewellModel == "03") newellXOffset = -10 - 18;
		if (params.startNewellModel == "04") newellXOffset = -10 - 10;
		if (params.startNewellModel == "05") newellXOffset = -10 - 18;
		if (params.startNewellModel == "06") newellXOffset = -10 - 2.5;
		if (params.startNewellModel == "07") newellXOffset = -10 + 3.5;
		if (params.startNewellModel == "08") newellXOffset = -10 - 2.5;
	}


	//задаем позицию поручня по высоте
	var handrailPosY = 800; //расстояние по Y от тетивы до низа поручня
	if (model == "косоур") handrailPosY = 850; //длина наибольшей балясины по ее оси
	// if ((params.calcType == 'lt-ko' || params.calcType == 'mono')) handrailPosY -= par.h / 2;
	// if (model == 'косоур' && marshPar.lastMarsh) handrailPosY += marshPar.h * 0.5;
	var handrailPosY_plt = 900; //на площадке балясины полноразмерные
	// if ((params.calcType == 'lt-ko')) handrailPosY_plt -= par.h / 2;
	var newellTopOffset = 40; //отступ верха столба от верха поручня
	var botHandrailFix = 0;
	var treadBalOffset = 10;

	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.handrailsPainting,
	}
	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

	var splitStairs = [];

	//позиция балясин относительно ступеней на лестнице на косоура�х
	var balPar_kos = calcBalPos(par.marshId);

	/*  ПОРУЧНИ  */
	{
		//поручень нижнего поворота

		if (par.botEnd == "площадка" && hasBot) {

			var handrailLength_X1 = botLastRailingPoint.x - botFirstRailingPoint.x;
			var handrailLength = handrailLength_X1;
			var handrailAngle1 = 0;

			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2,
				endAngle: Math.PI / 2,
				fixType: "нет",
				side: "out",
				poleAngle: 0,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId,
				hasFixings: true
			}
			var basePoint = newPoint_xy(botFirstRailingPoint, 0, handrailPosY_plt);
			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)

			handrailParams.drawing = { group: "timber_railing", type: "handrail", rot: 0, pos: basePoint, marshId: par.marshId, key: side };

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);

			//подбалясинная доска
			if ((model == "тетива" && params.timberBalBotEnd == "круг") ||
				(model == "косоур" && params.railingModel == "Стекло")) {
				handrailParams.drawing = null;
				var basePointBot = newPoint_xy(botFirstRailingPoint, 0, 60);
				handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePointBot.x, basePointBot.y)

				handrailParams.partName = "botPole";
				var handrail = drawHandrail_4(handrailParams).mesh;
				handrailParams.partName = null;
				handrail.position.x = basePointBot.x;
				handrail.position.y = basePointBot.y;
				handrail.position.z = posZ - handrailParams.wallOffset;
				section.add(handrail);
			}
		}

		if (par.botEnd == "забег" && hasBot) {
			var handrailAngle1 = angle(botFirstRailingPoint, botLastRailingPoint)

			if (model == "косоур") {
				handrailAngle1 = angle(newPoint_xy(botFirst, 0, -par.h / 2), marshFirst)
				botHandrailFix = 80;//Подогнано
			}
			if (params.railingModel == 'Стекло' && model == 'косоур') botHandrailFix = -40;

			var handrailLength_X1 = botLastRailingPoint.x - botFirstRailingPoint.x;
			var handrailLength = handrailLength_X1 / Math.cos(handrailAngle1);


			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2 - handrailAngle1,
				endAngle: Math.PI / 2 - handrailAngle1,
				fixType: "нет",
				side: "out",
				poleAngle: handrailAngle1,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId,
				hasFixings: true
			}
			var basePoint = newPoint_xy(botFirstRailingPoint, 0, handrailPosY + botHandrailFix);
			if (model == "косоур") {
				//рассчитываем длину и позицию первой балясины на забеге
				var turnPar = {
					lenX: handrailLength_X1,
					balStep: par.b / params.timberBalStep,
					isBotTurn: true,
					ang: handrailAngle1,
					balLen: handrailPosY + botHandrailFix,
				}
				turnPar = calcWndBalPos(turnPar);

				var firstBalTopPoint = newPoint_xy(botFirstRailingPoint, turnPar.firstBalPosX, turnPar.firstBalLen);//12.5 отступ  к краю балясины ( 25 диаметр )
				// if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
				// 	firstBalTopPoint.y += 100;
				// }
				basePoint = itercection(firstBalTopPoint, polar(firstBalTopPoint, handrailAngle1, 100), basePoint, newPoint_xy(basePoint, 0, 100));
			}

			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)
			handrailParams.drawing = { group: "timber_railing", type: "handrail", rot: handrailParams.poleAngle, pos: basePoint, marshId: par.marshId, key: side };

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);

			//нижняя перемычка для стекла
			if (model == "косоур" && params.railingModel == "Стекло") {
				var poleParams = {
					model: params.handrail,
					length: handrailLength_X1,
					dxfArr: dxfPrimitivesArr,
					dxfBasePoint: stringerParams.dxfBasePoint,
					startAngle: Math.PI / 2 - handrailAngle1,
					endAngle: Math.PI / 2 - handrailAngle1,
					fixType: "нет",
					side: "out",
					poleAngle: handrailAngle1,
				}
				handrailParams.drawing = null;
				handrailParams.partName = "botPole";
				var botPole = drawHandrail_4(handrailParams).mesh;
				handrailParams.partName = null;
				botPole.position.x = basePoint.x;
				botPole.position.y = basePoint.y - 750;
				botPole.position.z = posZ - handrailParams.wallOffset; //костыль чтобы использовать функцию из пристенных поручней
				section.add(botPole);
			}
		}

		//координата верхнего угла поручня для построения столбов
		if (par.botEnd != "нет") {
			var handrailCutLen1 = meterHandrailPar.profY / Math.cos(handrailAngle1);
			var handrailPos1 = newPoint_xy(basePoint, 0, handrailCutLen1);
		}

		if (hasMarsh) {
			//поручень марша
			var startPoint = newPoint_xy(marshFirstRailingPoint, 0, par.h)
			if (par.marshId !== 1) {
				//Фикс для столба != 95
				// startPoint = newPoint_xy(marshFirstRailingPoint, (95 - params.rackSize) / 2, 0);
				startPoint = newPoint_xy(marshFirstRailingPoint, 0, 0);
			}

			var handrailLength_X = marshLastRailingPoint.x - marshFirstRailingPoint.x - 0.05;
			var handrailAngle = Math.atan(par.h / par.b);
			var handrailLength = handrailLength_X / Math.cos(handrailAngle);
			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2 - handrailAngle,
				endAngle: Math.PI / 2 - handrailAngle,
				fixType: "нет",
				side: "out",
				poleAngle: handrailAngle,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId,
				hasFixings: true
			}
			var basePoint = newPoint_xy(marshFirstRailingPoint, 0, handrailPosY);
			if (model == "косоур") {
				var hDelta = (200 - par.h) / 2; //Фикс поручня, подогнано
				var handrailPosMarshCos = 1000 - hDelta;
				var deltaBal = treadBalOffset + 25;

				basePoint = newPoint_xy(zeroPoint, deltaBal, handrailPosMarshCos);
				basePoint = itercection(basePoint, polar(basePoint, handrailAngle, 100), startPoint, newPoint_xy(startPoint, 0, 100));
			}

			if (handrailLength > 3000) {
				var partsAmt = Math.floor(handrailLength / 3000);
				var stairStep = Math.floor(marshPar.stairAmt / (partsAmt + 1));
				for (var i = 1; i <= partsAmt; i++) {
					splitStairs.push(i * stairStep);
				}
			}

			var marshPoints = [];

			for (var i = 0; i < (splitStairs.length + 1); i++) {
				var handrailBasePoint = basePoint;
				var shiftHandrailBasePointX = 0;
				if (side == 'in' && par.marshId > 1) shiftHandrailBasePointX = params.nose - marshFirstRailingPoint.x;
				if (i > 0) handrailBasePoint = newPoint_xy(basePoint, marshPar.b * (splitStairs[i - 1]) + shiftHandrailBasePointX, marshPar.h * (splitStairs[i - 1]) + shiftHandrailBasePointX * Math.tan(handrailAngle));
				//Модернизация, тк первый столб внутренней стороны 2 и 3 марша ставится не в центре ступени
				if (i > 0 && side == 'in' && par.marshId > 1) {
					var len = (-marshPar.a / 2 + rackSize / 2) / Math.cos(handrailAngle);
					handrailBasePoint = polar(handrailBasePoint, handrailAngle, len)
				}

				var handrailStartPoint = marshFirstRailingPoint;
				if (i > 0) handrailStartPoint = newPoint_xy(marshFirstRailingPoint, marshPar.b * splitStairs[i - 1] + shiftHandrailBasePointX, marshPar.h * splitStairs[i - 1]);

				//Копируем точку для установки столба, до модернизации чтобы сохранить ось Y
				var rackBasePoint = copyPoint(handrailStartPoint);
				if (i > 0 && side == 'in' && par.marshId > 1) rackBasePoint.x -= marshPar.a / 2 - rackSize / 2;

				//Модернизация, тк первый столб внутренней стороны 2 и 3 марша ставится не в центре ступени
				if (i > 0 && side == 'in' && par.marshId > 1) {
					var len = (-marshPar.a / 2 + rackSize / 2) / Math.cos(handrailAngle);
					handrailStartPoint = polar(handrailStartPoint, handrailAngle, len)
				}

				var handrailEndPoint = marshLastRailingPoint;
				if (i < splitStairs.length) handrailEndPoint = newPoint_xy(marshFirstRailingPoint, marshPar.b * splitStairs[i] - rackSize + shiftHandrailBasePointX, marshPar.h * splitStairs[i]);
				//Модернизация, тк первый столб внутренней стороны 2 и 3 марша ставится не в центре ступени
				if (i < splitStairs.length && side == 'in' && par.marshId > 1) {
					var len = (-marshPar.a / 2 + rackSize / 2) / Math.cos(handrailAngle);
					handrailEndPoint = polar(handrailEndPoint, handrailAngle, len)
				}

				var lenX = handrailEndPoint.x - handrailStartPoint.x;
				var len = lenX / Math.cos(handrailAngle);

				var splitObj = { lenX: lenX, len: len, rackBasePoint: rackBasePoint, basePoint: handrailBasePoint, startPos: handrailStartPoint, endPos: handrailEndPoint };
				if (i < splitStairs.length) splitObj.stairNumber = splitStairs[i];
				marshPoints.push(splitObj);

				var handrailParams = {
					model: params.handrail,
					length: len,
					dxfArr: dxfPrimitivesArr,
					dxfBasePoint: stringerParams.dxfBasePoint,
					startAngle: Math.PI / 2 - handrailAngle,
					endAngle: Math.PI / 2 - handrailAngle,
					fixType: "нет",
					side: "out",
					poleAngle: handrailAngle,
					startChamfer: "R3",
					endChamfer: "R3",
					marshId: par.marshId,
					hasFixings: true
				}

				handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, handrailBasePoint.x, handrailBasePoint.y)
				if (!(params.stairModel == 'П-образная с забегом' && par.marshId == 2)) {
					handrailParams.drawing = { group: "timber_railing", type: "handrail", rot: handrailParams.poleAngle, pos: handrailBasePoint, marshId: par.marshId, key: side };
					var handrail = drawHandrail_4(handrailParams).mesh;
					handrail.position.x = handrailBasePoint.x;
					handrail.position.y = handrailBasePoint.y;
					handrail.position.z = posZ - handrailParams.wallOffset; //костыль чтобы использовать функцию из пристенных поручней
					section.add(handrail);
					//нижняя перемычка для стекла
					if (model == "косоур" && params.railingModel == "Стекло") {
						handrailParams.partName = "botPole";
						var botPole = drawHandrail_4(handrailParams).mesh;
						handrailParams.partName = null;
						botPole.position.x = handrailBasePoint.x;
						botPole.position.y = handrailBasePoint.y - 750;
						botPole.position.z = posZ - handrailParams.wallOffset; //костыль чтобы использовать функцию из пристенных поручней
						section.add(botPole);
					}
				}
			}

			//координата верхнего угла поручня для построения столбов

			var handrailCutLen = meterHandrailPar.profY / Math.cos(handrailAngle);
			var handrailPos = newPoint_xy(basePoint, 0, handrailCutLen);
			var handrailEndPos = polar(handrailPos, handrailAngle, handrailLength)

			//сохраняем позицию верхнего поручня для построения рейки в поручень
			var marshHandrailPos = copyPoint(basePoint);
			par.handrailParams = {
				handrailCutLen: handrailCutLen,
				handrailAngle: handrailAngle,
				handrailPos: handrailPos,
				handrailEndPos: handrailEndPos,
				handrailHeight: handrailPos.y - startPoint.y,
			}
		}

		if (!hasMarsh) {
			var basePoint = newPoint_xy(marshFirstRailingPoint, 0, handrailPosY);
			if (model == "косоур") {
				var hDelta = (200 - par.h) / 2; //Фикс поручня, подогнано
				var handrailPosMarshCos = 1000 - hDelta;
				var deltaBal = treadBalOffset + 25;

				basePoint = newPoint_xy(zeroPoint, deltaBal, handrailPosMarshCos);
				basePoint = itercection(basePoint, polar(basePoint, handrailAngle1, 100), marshFirstRailingPoint, newPoint_xy(marshFirstRailingPoint, 0, 100));
			}
			var handrailCutLen = meterHandrailPar.profY / Math.cos(handrailAngle1);
			var handrailPos = newPoint_xy(basePoint, 0, handrailCutLen);
		}

		//поручень верхнего поворота
		if (par.topEnd == "площадка" && hasTop) {

			var handrailLength = topLastRailingPoint.x - topFirstRailingPoint.x;
			var handrailLength_X2 = handrailLength;
			var handrailAngle2 = 0;

			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2,
				endAngle: Math.PI / 2,
				fixType: "нет",
				side: "out",
				poleAngle: 0,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId,
				hasFixings: true
			}
			var basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY_plt);
			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)
			handrailParams.drawing = { group: "timber_railing", type: "handrail", rot: handrailParams.poleAngle, pos: basePoint, marshId: par.marshId, key: side };

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);

			//подбалясинная доска (только на тетиве если низ балясин круглый)
			if (model == "тетива" && params.timberBalBotEnd == "круг") {
				var basePoint = newPoint_xy(topFirstRailingPoint, 0, 60);
				handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)
				handrailParams.partName = "botPole";
				var handrail = drawHandrail_4(handrailParams).mesh;
				handrailParams.partName = null;
				handrail.position.x = basePoint.x;
				handrail.position.y = basePoint.y;
				handrail.position.z = posZ - handrailParams.wallOffset;
				section.add(handrail);
			}

			//сохраняем точку поручня для расчета длины столбов
			basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY_plt);
		}

		if (par.topEnd == "забег" && hasTop) {
			//поручень забега
			var handrailAngle2 = angle(topFirstRailingPoint, topLastRailingPoint)
			var handrailLength_X2 = topLastRailingPoint.x - topFirstRailingPoint.x;
			var handrailLength = handrailLength_X2 / Math.cos(handrailAngle2);

			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2 - handrailAngle2,
				endAngle: Math.PI / 2 - handrailAngle2,
				fixType: "нет",
				side: "out",
				poleAngle: handrailAngle2,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId,
				hasFixings: true
			}
			var basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY);
			if (model == "косоур") {
				//предварительно рассчитываем базовую точку
				basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY);
				//рассчитываем длину и позицию первой балясины на забеге
				var turnPar = {
					lenX: handrailLength_X2,
					balStep: par.b / params.timberBalStep,
					isBotTurn: false,
					ang: handrailAngle2,
					balLen: handrailPosY,
				}

				turnPar = calcWndBalPos(turnPar);

				var firstBalTopPoint = newPoint_xy(topFirstRailingPoint, turnPar.firstBalPosX, turnPar.firstBalLen);
				// if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
				// 	firstBalTopPoint.y += 100;
				// }
				basePoint = itercection(firstBalTopPoint, polar(firstBalTopPoint, handrailAngle2, 100), basePoint, newPoint_xy(basePoint, 0, 100));
				basePoint.y += par.h;
			}

			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)
			handrailParams.drawing = { group: "timber_railing", type: "handrail", rot: 0, pos: basePoint, marshId: par.marshId, key: side };

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);
		}

		if (params.stairModel == 'П-образная с площадкой' && par.marshId == 1 && getMarshParams(marshPar.nextMarshId).hasRailing.in && side == 'in') {
			var handrailLength = params.marshDist - 0.05;
			if (params.calcType == 'timber') {
				handrailLength = params.marshDist - 27.5 * 2 - 0.05; // 27.5 насколько столб ограждения выступает за марш, число статичное
				if (handrailLength < 0) handrailLength == 0;
			}
			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2,
				endAngle: Math.PI / 2,
				fixType: "нет",
				side: "in",
				poleAngle: 0,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId,
				hasFixings: true
			}
			var basePointP = newPoint_xy(marshLastRailingPoint, params.nose + 30 + rackSize / 2, handrailPosY_plt + par.h - 110);
			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePointP.x, basePointP.y)

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePointP.x;
			handrail.position.y = basePointP.y;
			handrail.position.z = handrailLength;
			if (turnFactor == -1) handrail.position.z = 0;
			handrail.rotation.y = Math.PI / 2;
			section.add(handrail);
		}

		//координата верхнего угла поручня для построения столбов
		if (par.topEnd != "нет") {
			var handrailCutLen2 = meterHandrailPar.profY / Math.cos(handrailAngle2);
			var handrailPos2 = newPoint_xy(basePoint, 0, handrailCutLen2);
			//верхний конец
			var handrailPos3 = newPoint_x1(handrailPos2, handrailLength_X2, handrailAngle2);
		}
	}

	/* 	СТОЛБЫ  */
	{
		var racks = [];
		var handrailCutLen = meterHandrailPar.profY / Math.cos(handrailAngle);

		if (par.botEnd != "нет" && hasBot) {
			//угловой столб
			if (par.hasFirstRack) {
				var rackPar = copyPoint(botFirst);
				rackPar.len = handrailPos1.y - rackPar.y + newellTopOffset;

				// if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && par.botEnd == 'забег') {
				// 	rackPar.len += par.h;
				// 	rackPar.y -= par.h;
				// }
				if (botFirst.deltaY) {
					rackPar.len += botFirst.deltaY;
					rackPar.y -= botFirst.deltaY;
				}
				racks.push(rackPar);
			}
			//второй столб
			var rackPar = copyPoint(marshFirst);
			rackPar.len = handrailPos.y - rackPar.y + newellTopOffset;
			// if (params.calcType == 'mono' && par.botEnd == 'забег') {
			// 	rackPar.len += par.h;
			// 	rackPar.y -= par.h;
			// }
			if (marshFirst.deltaY) {
				rackPar.len += marshFirst.deltaY;
				rackPar.y -= marshFirst.deltaY;
			}
			racks.push(rackPar);
		}

		//первый столб (только на первом марше)
		if (par.marshId == 1 && hasMarsh) {
			//обычный столб
			if (params.startNewellType != "резной") {
				var rackPar = copyPoint(marshFirst);
				rackPar.len = handrailPos.y - rackPar.y + newellTopOffset;
				if (marshFirst.deltaY) {
					rackPar.len += marshFirst.deltaY;
					rackPar.y -= marshFirst.deltaY;
				}
				racks.push(rackPar);
			}
			//первый резной столб
			if (params.startNewellType == "резной") {
				var zDelta = params.startNewellMooveZ * 1;
				if (side == "out") zDelta *= -1;
				var insetPar = {
					type: "startNewell",
					name: params.startNewellModel,
					obj: section,
					basePoint: {
						x: marshFirst.x,
						y: marshFirst.y,
						z: posZ + zDelta,
						rot: (params.startNewellRot * 1) * 180 / Math.PI,
					}
				}
				// if(params.firstNewellPos == "на первой ступени") {
				// 	insetPar.basePoint.x = params.b1 / 2;
				// 	insetPar.basePoint.y = params.h1;
				// }

				// if(params.firstNewellPos == "на второй ступени") {
				// 	insetPar.basePoint.x = params.b1 * 1.5;
				// 	insetPar.basePoint.y = params.h1 * 2;
				// }

				insetPar.basePoint.x += newellXOffset; // Корректировка для прилегания столба к поручню

				if (par.unit == "balustrade") insetPar.name = params.timberRackModel_bal;
				drawMeshInset(insetPar);
			}
		}

		if (splitStairs.length > 0) {
			for (var i = 0; i < splitStairs.length; i++) {
				var splitPoint = marshPoints[i + 1];
				var rackPar = newPoint_xy(splitPoint.rackBasePoint, -rackSize / 2, 0);
				rackPar.len = (splitPoint.basePoint.y - rackPar.y) + newellTopOffset + 50;

				if (par.marshId > 1 && side == 'in') {
					rackPar.len += marshPar.h;
					rackPar.y -= marshPar.h;
				}
				racks.push(rackPar);
			}
		}

		// if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && side == 'in' && par.marshId > 1){

		/**
		 * Этот столб устанавливается нижним для марша
		 * Подробно:
		 Сложная проверка определяет наличие поворотного столба на моно и лт
		 В случае если марш не первый и есть ограждения на внутренней стороне ИЛИ
		 Если п-образня лестница(Забег/Площадка) и есть внутреннее ограждение 3 марша
		 */
		if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && side == 'in' &&
			((marshPar.hasRailing.in && par.marshId > 1) ||
				((params.stairModel == 'П-образная с забегом' || params.stairModel == 'П-образная с площадкой') && marshPar.hasRailing.in && par.marshId == 3))) {
			var rackPar = copyPoint(marshFirst);
			rackPar.len = handrailPos.y + 20;
			if (marshPar.botTurn == 'забег') {
				rackPar.len = marshPar.h * 2 + handrailPos.y + 20;
			}
			if (params.stairModel == 'П-образная трехмаршевая') {
				if (marshPar.botTurn == 'забег') {
					rackPar.y -= marshPar.h * 2;
				}
			}
			if (params.stairModel !== 'П-образная трехмаршевая') {
				if (marshPar.botTurn == 'забег') {
					rackPar.y -= marshPar.h * 2;
				}
			}
			rackPar.marshId = par.marshId;
			rackPar.y -= par.h;
			rackPar.rackSize = rackSize;
			rackPar.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, rackPar.x - rackSize / 2, rackPar.y);
			rackPar.turnType = marshPar.botTurn;

			if (par.marshId == 2) rackPar.newellId = 1;
			if (par.marshId == 3) rackPar.newellId = 2;
			rackPar.type = 'bot';//Определяет положение столба, верхний для марша или нижний
			// rackPar.drawing = {group: "timber_railing", type: "rack", pos: rackPar, marshId: par.marshId, key: par.side};

			var turnNewell = drawTurnNewell(rackPar).mesh;
			turnNewell.position.x = rackPar.x - 0.03;
			turnNewell.position.y = rackPar.y + 0.05;
			turnNewell.position.z = posZ - 0.005;

			section.add(turnNewell);
		}

		/**
		 * Этот столб устанавливается верхним для марша
		 * Подробно:
		 Сложная проверка определяет наличие поворотного столба на моно и лт
		 В случае если на марше имеется ограждение и не имеется на следующем марше ИЛИ
		 Если п-образня лестница(Забег/Площадка) и есть внутреннее ограждение 3 марша
		 И всё это при условии что марш не последний.
		 */
		if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && side == 'in' &&
			((marshPar.hasRailing.in && !getMarshParams(marshPar.nextMarshId).hasRailing.in) ||
				(params.stairModel == 'П-образная с забегом' || params.stairModel == 'П-образная с площадкой') && marshPar.hasRailing.in)
			&& !marshPar.lastMarsh) {
			var rackPar = copyPoint(marshLast);
			rackPar.len = handrailEndPos.y - (marshPar.h * (marshPar.stairAmt + 1)) + 20;
			rackPar.marshId = par.marshId;
			rackPar.y += par.h;
			rackPar.rackSize = rackSize;
			// rackPar.dxfBasePoint = stringerParams.dxfBasePoint;
			rackPar.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, rackPar.x - rackSize / 2, rackPar.y);
			rackPar.turnType = marshPar.topTurn;

			if (par.marshId == 1) rackPar.newellId = 1;
			if (par.marshId == 2) rackPar.newellId = 2;
			rackPar.type = 'top';//Определяет положение столба, верхний для марша или нижний
			// rackPar.drawing = {group: "timber_railing", type: "rack", pos: rackPar, marshId: par.marshId, key: par.side};

			var turnNewell = drawTurnNewell(rackPar).mesh;
			turnNewell.position.x = rackPar.x;
			turnNewell.position.y = rackPar.y + 0.05;
			turnNewell.position.z = posZ - 0.05 * turnFactor;

			section.add(turnNewell);
		}

		//последний столб на перекрытии
		if (par.topEnd == "нет" && marshPar.lastMarsh && model == 'косоур') {
			if (params.lastNewellType !== "резной") {
				var rackPar = copyPoint(marshLast);
				rackPar.len = handrailEndPos.y - rackPar.y + newellTopOffset;
				if (marshLast.deltaY) {
					rackPar.len += marshLast.deltaY;
					rackPar.y -= marshLast.deltaY;
				}
				rackPar.y += 1;
				racks.push(rackPar);
			}
			//последний резной столб
			if (params.lastNewellType == "резной") {
				var zDelta = params.lastNewellMooveZ * 1;
				if (side == "out") zDelta *= -1;
				var insetPar = {
					type: "startNewell",
					name: params.startNewellModel,
					obj: section,
					basePoint: {
						x: marshLast.x - newellXOffset,
						y: marshLast.y,
						z: posZ + zDelta,
						rot: Math.PI + (params.startNewellRot * 1) * 180 / Math.PI,
					}
				}

				if (par.unit == "balustrade") insetPar.name = params.timberRackModel_bal;
				drawMeshInset(insetPar);
			}
		}

		if (par.topEnd != "нет" && hasTop) {
			var rackPar = copyPoint(marshLast);
			rackPar.len = handrailPos2.y - rackPar.y + newellTopOffset;
			// if (par.topEnd == 'забег' && model == 'косоур' && (params.calcType !== 'lt-ko' && params.calcType !== 'mono')) {//Смещаем столб вниз чтобы не перелопачивать функцию
			// 	rackPar.len += par.h;
			// 	rackPar.y -= par.h
			// }
			// if (!(params.stairModel == 'П-образная с забегом' && par.marshId == 2)){
			// }
			if (marshLast.deltaY) {
				rackPar.len += marshLast.deltaY;
				rackPar.y -= marshLast.deltaY;
			}
			if(hasMarsh) racks.push(rackPar);
			if (hasTopRack) {
				//последний столб
				var rackPar = copyPoint(topLast);
				rackPar.len = handrailPos3.y - rackPar.y + newellTopOffset;
				if (topLast.deltaY) {
					rackPar.len += topLast.deltaY;
					rackPar.y -= topLast.deltaY;
				}
				racks.push(rackPar);
			}
		}

		var newelParams = {
			dxfBasePoint: stringerParams.dxfBasePoint,
			dxfPrimitivesArr: dxfPrimitivesArr,
			racks: racks,
			rackSize: rackSize,
			marshId: par.marshId,
			side: side
		}

		var newels = drawNewells(newelParams).mesh;
		newels.position.z = posZ;
		section.add(newels);
	}

	/*  БАЛЯСИНЫ И СТЕКЛО  */
	{
		//задаем функцию отрисовки заполнения
		var drawFilling = drawBanistersArr;
		if (params.railingModel == "Стекло") drawFilling = drawGlassSect;

		if (model == "тетива" || params.railingModel == "Стекло") {
			//нижний поворот
			if (par.botEnd != "нет" && hasBot) {
				var balParams = {
					stringerType: model,
					basePoint: botFirstRailingPoint,
					lenX: handrailLength_X1,
					ang: handrailAngle1,
					balLen: handrailPosY_plt,
					balStep: par.b / params.timberBalStep,
					dxfBasePoint: stringerParams.dxfBasePoint,
					side: side
				}
				if (par.botEnd == "забег" || params.timberBalBotEnd == "круг") balParams.balLen = handrailPosY;

				if (model == "косоур" && params.railingModel == "Стекло") balParams.balLen = handrailPosY - 150;
				if (params.railingModel == "Стекло" && model == "косоур" && testingMode) balParams.balLen -= 35 * Math.tan(handrailAngle);//Убавляем размер стекла для тестирования, тк оно заходит в паз

				var balArr = drawFilling(balParams);
				if (params.timberBalBotEnd == "круг" && params.railingModel !== "Стекло") balArr.position.y = 100;
				if (params.railingModel == "Стекло") balArr.position.y = 120;
				if (params.railingModel == "Стекло" && model == "косоур") balArr.position.y = 156;

				balArr.position.z = posZ;
				section.add(balArr);
			}

			if (hasMarsh) {
				//марш
				var balParams = {
					stringerType: model,
					basePoint: marshFirstRailingPoint,
					lenX: handrailLength_X,
					ang: handrailAngle,
					balLen: handrailPosY,
					balStep: par.b / params.timberBalStep,
					dxfBasePoint: stringerParams.dxfBasePoint,
				}
				if (params.railingModel == 'Стекло') {
					balParams.balLen -= 0.01;
					// balParams.basePoint.y -= 0.01;
				}

				if (model == "косоур" && params.railingModel == "Стекло") {
					balParams.balLen = handrailPosY - 150;
					if (testingMode) balParams.balLen -= 35 * Math.tan(handrailAngle);//Убавляем размер стекла для тестирования, тк оно заходит в паз
					balParams.basePoint = newPoint_xy(handrailPos, 0, -750);
				}

				var balArr = drawFilling(balParams);
				balArr.position.z = posZ;
				section.add(balArr);
			}
			//верхний поворот

			if (par.topEnd != "нет" && hasTop) {
				var balParams = {
					stringerType: model,
					basePoint: newPoint_xy(topFirstRailingPoint, 0, 0.04),
					lenX: handrailLength_X2,
					ang: handrailAngle2,
					balLen: handrailPosY_plt,
					balStep: par.b / params.timberBalStep,
					dxfBasePoint: stringerParams.dxfBasePoint,
				}
				if (par.topEnd == "забег" || params.timberBalBotEnd == "круг") balParams.balLen = handrailPosY;
				var balArr = drawFilling(balParams);
				if (params.timberBalBotEnd == "круг") {
					balArr.position.y = 100;
				}
				balArr.position.z = posZ;
				section.add(balArr);
			}
		}
		if (model == "косоур" && params.railingModel != "Стекло") {
			//нижний поворот
			if (hasBot) {
				if (par.botEnd == "площадка") {
					var balParams = {
						basePoint: botFirstRailingPoint,
						lenX: handrailLength_X1,
						ang: handrailAngle1,
						balLen: handrailPosY_plt,
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
						side: side
					}
					if (par.botEnd == "забег") balParams.balLen = handrailPosY;

					var balArr = drawBanistersArr(balParams);
					// if(params.timberBalBotEnd == "круг") {
					// 	balArr.position.y = 100;
					// }
					balArr.position.z = posZ;
					section.add(balArr);
				}
				if (par.botEnd == "забег") {
					var balParams = {
						basePoint: botFirstRailingPoint,
						lenX: handrailLength_X1,
						ang: handrailAngle1,
						balLen: handrailPosY_plt,
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
						isBotTurn: true,
						side: side
					}
					balParams.basePoint.y += 0.03;
					if (par.botEnd == "забег") balParams.balLen = handrailPosY + botHandrailFix;
					// if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
					// 	balParams.balLen += 100;
					// }
					// if ((params.calcType == 'lt-ko' || params.calcType == 'mono')) {
					// 	balParams.balLen += par.h;
					// 	balParams.basePoint.y -= par.h;
					// }
					// 	balParams.basePoint.x -= 30;
					// 	balParams.balLen -= 10;
					// }

					var balArr = drawBanistersWndArr(balParams);
					// if(params.timberBalBotEnd == "круг") {
					// 	balArr.position.y = 100;
					// }
					balArr.position.z = posZ;
					section.add(balArr);
				}
			}

			//марш
			if (hasMarsh) {
				var startPos = Math.ceil(marshFirstRailingPoint.y / par.h) || 1;//Рассчитываем номер ступени для начала установки балясин
				if (side == 'in' && par.marshId > 1) startPos = 1;

				var balParams = {
					stringerType: model,
					lenX: handrailLength_X,
					a: par.a,
					b: par.b,
					h: par.h,
					stairAmt: par.stairAmt - startPos + 1,
					ang: handrailAngle,
					balLen: 900 - 0.01,
					dxfBasePoint: stringerParams.dxfBasePoint,
					marshId: par.marshId,
					side: side,
					marshHandrailPos: marshHandrailPos,
				}
				//Тк сдвинули столб на внешней стороне убавляем кол-во ступеней
				if (side == 'out' && par.topEnd == 'забег') balParams.stairAmt -= 1;

				var balDist = par.b / params.timberBalStep;
				//25 половина толщины основания балясины, treadOffset - отступ от начала ступени
				var treadOffset = 10;
				if (params.timberBalStep == 1) treadOffset = par.b / 2 - 5;
				if (params.timberBalStep == 1.5) treadOffset = 10;
				var balsBasePoint = newPoint_xy(zeroPoint, -balDist + 25 + treadOffset + par.b * startPos - balPar_kos.deltaX1, par.h * startPos - params.treadThickness);
				// var balsBasePoint = newPoint_xy(zeroPoint, par.b * startPos, par.h * startPos - params.treadThickness);

				var xFix = 0;

				if (params.timberBalStep == 1) {
					xFix = (par.b - balDist - 20) / 2;
				}
				if (params.timberBalStep != 1) {
					xFix = (par.b - balDist - 50) / 2;
				}
				balsBasePoint.x += xFix;
				balParams.balLen -= -xFix * Math.tan(balParams.ang);

				balParams.basePoint = balsBasePoint;
				if ((par.topEnd == 'площадка' || par.topEnd == 'нет') && (side == 'out' || marshPar.lastMarsh)) {
					// if (params.timberBalStep == 1) balParams.stairAmt -= 1;
					balParams.extraBanisterTop = true;
				}

				if (params.timberBalStep == 2 && marshPar.botTurn == 'пол') {
					balParams.extraBanisterBot = true;
				}

				if (side == 'out') {
					if (par.topEnd == 'забег' && params.calcType == 'timber' && params.timberBalStep !== 1) {
						if (params.timberBalStep == 1.5) {
							if (par.stairAmt % 2) balParams.stairAmt -= 1;
						} else {
							balParams.stairAmt -= 1;
						}
						balParams.extraBanisterTop = true;
					}
					if (params.stairModel == 'П-образная с забегом' && par.marshId == 1) {
						balParams.extraBanisterTop = true;
					}
				}

				if (side == 'in') {
					if (params.timberBalStep == 2 && par.stairAmt == 1) {
						balParams.extraBanisterBot = false;
					}
					if (params.timberBalStep == 2 && marshPar.botTurn == 'забег' && params.calcType == 'lt-ko') {
						balParams.extraBanisterBot = true;
					}
				}

				//В случае если стартовый столб не на первой ступени убавяем кол-во ступеней для марша
				if (params.firstNewellPos == 'на второй ступени' && par.marshId == 1) {
					balParams.extraBanisterBot = true;
				}

				// Учитываем зазор
				balParams.balLen -= 0.1;
				balParams.basePoint.y += 0.05;
				if (testingMode && marshPar.lastMarsh) { //поднимаем балясины, чтобы не было пересечения с балкой
					balParams.balLen -= 0.2;
					balParams.basePoint.y += 0.1;
				}

				//Рассчет размера балясины
				if (params.timberBalStep == 1.5) balParams.balLen += balPar_kos.deltaLen1 / 2;
				if (params.timberBalStep == 1) balParams.balLen -= 15 * Math.tan(handrailAngle);

				for (var i = 0; i < marshPoints.length; i++) {
					balParams.basePoint = copyPoint(balsBasePoint);

					if (i > 0 && marshPoints[i - 1].stairNumber && side == 'in' && par.marshId > 1) {
						balParams.basePoint.x += marshPar.a / 2 - rackSize / 2;
						balParams.basePoint.y += (marshPar.a / 2 - rackSize / 2) * Math.tan(balParams.ang);
						balParams.marshHandrailPos = newPoint_xy(balParams.marshHandrailPos, params.nose - marshFirstRailingPoint.x, (params.nose - marshFirstRailingPoint.x) * Math.tan(balParams.ang))
					}

					balParams.lenX = marshPoints[i].lenX;

					balParams.stairAmt = Math.floor(balParams.lenX / marshPar.b);

					var pos = { x: 0, y: 0.05 };
					if (i > 0 && marshPoints[i - 1].stairNumber) {
						pos.x = marshPar.b * marshPoints[i - 1].stairNumber;
						pos.y = marshPar.h * marshPoints[i - 1].stairNumber;
						if (side == 'in' && par.marshId > 1) {
							pos.x -= marshPar.a / 2 - rackSize / 2;
							pos.y -= (marshPar.a / 2 - rackSize / 2) * Math.tan(balParams.ang)
						}
					}
					balParams.svgBasePoint = pos;

					var balArr = drawBanistersArr(balParams);
					balArr.position.z = posZ;
					balArr.position.x = pos.x;
					balArr.position.y = pos.y;
					section.add(balArr);
				}

				// var balArr = drawBanistersArr(balParams);
				// balArr.position.z = posZ;
				// section.add(balArr);
			}

			if (hasTop) {
				//верхний поворот
				if (par.topEnd == "площадка") {
					var balParams = {
						basePoint: topFirstRailingPoint,
						lenX: handrailLength_X2,
						ang: handrailAngle2,
						balLen: handrailPosY_plt,// + params.treadThickness,
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
						side: side
					}
					// if(params.timberBalBotEnd == "круг") balParams.balLen = handrailPosY;
					var balArr = drawBanistersArr(balParams);
					balArr.position.z = posZ;
					section.add(balArr);
				}
				if (par.topEnd == "забег") {
					var balParams = {
						basePoint: newPoint_xy(topFirstRailingPoint, 0, par.h),
						lenX: handrailLength_X2,
						ang: handrailAngle2,
						balLen: handrailPosY,// + params.treadThickness / Math.cos(handrailAngle2),
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
						isBotTurn: false,
						side: side
					}

					var balArr = drawBanistersWndArr(balParams);
					balArr.position.z = posZ;
					section.add(balArr);
				}
			}

			if (params.stairModel == 'П-образная с площадкой' && par.marshId == 1 && getMarshParams(marshPar.nextMarshId).hasRailing.in && side == 'in') {
				var balParams = {
					basePoint: { x: 0, y: 0 },
					lenX: params.marshDist - 0.05,
					ang: 0,
					balLen: handrailPosY_plt - 110,
					balStep: 150,
					dxfBasePoint: stringerParams.dxfBasePoint,
					marshId: par.marshId,
					side: side
				}

				var balArr = drawBanistersArr(balParams);
				balArr.position.x = basePointP.x - 30 - 20;
				balArr.position.y = basePointP.y - (handrailPosY_plt - 110);
				balArr.position.z = balParams.lenX;
				if (turnFactor == -1) balArr.position.z = 0;
				balArr.rotation.y = Math.PI / 2;
				section.add(balArr);
			}
		}
	}
	//сохраняем параметры для расчета длины поворотного столба
	par.handrailTopY = handrailPosY + handrailCutLen + newellTopOffset;

	par.mesh = section;

	return par;
} //end of drawRailingSection_4_new_test

function drawBalSection(par) {

	if (par.type != "секция" && par.type != "секция площадки") return;

	var platformLength = par.platformLength;
	var offsetRight = par.offsetStart;
	var offsetLeft = par.offsetEnd;
	var handrailOffsetStart = par.handrailOffsetStart;
	var handrailOffsetEnd = par.handrailOffsetEnd;
	var railingSide = par.railingSide;
	var railingModel = par.railingModel;

	var balRackBottom = $("#balRackBottom_bal").val();
	//var railingModel = $("#railingModel_bal").val();
	var handrail = $("#handrail_bal").val();
	var banisterMaterial = $("#banisterMaterial_bal").val();
	var rackBottom = $("#rackBottom_bal").val();
	var rigelMaterial = $("#rigelMaterial_bal").val();
	var rigelAmt = $("#rigelAmt_bal").val();
	var rackTypeKovka = $("#rackTypeKovka_bal").val();
	var banister1 = $("#banister1_bal").val();
	var banister2 = $("#banister2_bal").val();
	var balDist = []; //расстояние между балясинами
	balDist[0] = $("#balDist_bal").val(); //примерное расстояние между балясинами
	var timberBalStep = $("#timberBalStep_bal").val();
	var timberBal = $("#timberBal_bal").val();
	var timberRack = $("#timberRack_bal").val();

	//var handrail = par.handrail;
	//if(typeof balDist == 'undefined') balDist = [params.balDist_bal];


	//заглушка для решетки из профиля
	if (railingModel == "Решетка") {
		railingModel = "Кованые балясины";
		params.banister1_bal = "20х20";
		params.banister2_bal = "20х20";
	}


	//параметры поручня
	var handrailPar = {
		prof: params.handrailProf_bal,
		sideSlots: params.handrailSlots_bal,
		handrailType: params.handrail_bal,
	}
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js



	var scale = 1;

	var railingSection = new THREE.Object3D();
	var rackOffsetY = 150;
	var rackLength = params.handrailHeight_bal - handrailPar.profY; //длина стойки с учетом кронштейна

	var handrailHolderLength = 70; //длина кронштейна поручня
	var railingPositionZ = -20//-40;
	var basePoint = [];
	if (turnFactor == -1) {
		var railingSideTemp = railingSide
		if (railingSideTemp == "left") railingSide = "right"
		if (railingSideTemp == "right") railingSide = "left"
	}

	/*материалы*/
	var glassThickness = 8;
	if (railingModel == "Самонесущее стекло") glassThickness = 12;
	var handrailAngle = 0;
	var glassExtrudeOptions = {
		amount: glassThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var forgingExtrudeOptions = {
		amount: 40,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	/* стойки */


	if (railingModel == "Ригели" || railingModel == "Стекло на стойках" || railingModel == "Экраны лазер") {

		rackPosition = [];
		rackNuber = 0;
		var sectionLength = platformLength - offsetLeft - offsetRight - 40
		//rackLength = 830;
		if (params.rackBottom_bal == "боковое") rackLength += 150;

		//стойки
		var rackParams = {
			len: rackLength - 70 - 2, //70 - высота кронштейна 2 - толщина кронштейна
			isBotFlan: true,
			dxfBasePoint: par.dxfBasePoint,
			dxfArr: dxfPrimitivesArr,
			material: params.materials.metal_railing,
			sectText: "балюстрада",
			unit: 'balustrade',
			realHolder: true, //точно отрисовываем кронштейн поручня
			holderAng: 0,
		};
		if (params.banisterMaterial_bal != "40х40 черн.") {
			rackParams.material = params.materials.inox;
		}
		var rackAmt = Math.round(sectionLength / 800) + 1;
		if (rackAmt < 2) rackAmt = 2;
		var rackDist = sectionLength / (rackAmt - 1);
		for (i = 0; i < rackAmt; i++) {
			rackParams.len = rackLength - 70 - 2; //70 - высота кронштейна 2 - толщина кронштейна
			if (i == 0 && par.type == "секция площадки") rackParams.len -= 4; //стойки разной длины для винтовой лестницы
			var pos = {
				x: offsetLeft + 20 + rackDist * i,
				y: -60,
				z: -40,
			}
			if (i == 0 && par.type == "секция площадки") pos.y += 4;

			rackParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);

			var rack = drawRack3d_4(rackParams).mesh;
			rack.position.x = pos.x;
			rack.position.y = pos.y;
			rack.position.z = pos.z;
			railingSection.add(rack);
			rackPosition.push(rack.position);
		}
	}


	/* ригели */
	if (railingModel == "Ригели") {

		var rigelProfileY = 20;
		var rigelProfileZ = 20;

		if (rigelMaterial == "20х20 черн.") {
			rigelModel = "rect";
			rigelProfileY = 20;
			rigelProfileZ = 20;
		}
		if (rigelMaterial == "Ф12 нерж.") {
			rigelModel = "round";
			rigelProfileY = 12;
			rigelProfileZ = 12;
		}
		if (rigelMaterial == "Ф16 нерж.") {
			rigelModel = "round";
			rigelProfileY = 16;
			rigelProfileZ = 16;
		}

		var x0 = (offsetLeft - 30);
		var y0 = 0;
		var rigelLength = platformLength - offsetLeft - offsetRight + 60;
		var z0 = 0;
		// if (railingSide == "left") z0 = -40 + rigelProfileZ + 20 + 1;
		// if (railingSide == "right") z0 = 40 - rigelProfileZ - 1;
		rigelAmt = Number(rigelAmt);
		var rigelDist = (rackLength - rackOffsetY) / (rigelAmt + 1);

		var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, 200)

		var poleParams = {
			partName: "rigels",
			type: rigelModel,
			poleProfileY: rigelProfileY,
			poleProfileZ: rigelProfileZ,
			length: rigelLength,
			poleAngle: 0,
			material: params.materials.metal_railing,
			dxfBasePoint: dxfBasePoint,
			dxfArr: dxfPrimitivesArr,
			rigelStartPlug: true,
			rigelEndPlug: true,
			sectText: "балюстрада",
		}
		if (params.rigelMaterial_bal != "20х20 черн.") poleParams.material = params.materials.inox;

		for (var i = 1; i < rigelAmt + 1; i++) {
			var pole = drawPole3D_4(poleParams).mesh;
			pole.position.x = offsetLeft - 30;
			pole.position.y = rigelDist * i;
			pole.position.z = z0;
			railingSection.add(pole);
			poleParams.dxfBasePoint.y += -50;

			var screwPar = {
				id: "rigelScrew",
				description: "Крепление ригелей",
				group: "Ограждения"
			}

			var rigelHolderId = "rigelHolder12";
			var holderSize = 12;
			if (params.rigelMaterial_bal == "Ф16 нерж.") {
				rigelHolderId = "rigelHolder16";
				plugSize = 16;
			}

			var holderPar = {
				size: holderSize,
				id: rigelHolderId,
				description: "Кронштейн крепления ригелей",
				group: "Ограждения"
			}

			for (var k = 0; k < rackAmt; k++) {
				var screw = drawScrew(screwPar).mesh;
				screw.rotation.x = Math.PI / 2;
				screw.position.x = offsetLeft + 20 + rackDist * k;
				screw.position.y = rigelDist * i + 10;
				screw.position.z = 10;
				railingSection.add(screw);

				if (params.rigelMaterial_bal != "20х20 черн.") {
					var holder = drawRigelHolder(holderPar);
					holder.position.x = offsetLeft + 20 + rackDist * k;
					holder.position.y = rigelDist * i + 10;
					holder.position.z = 10;
					if (!testingMode) railingSection.add(holder);
				}
			}

			//var screw = drawScrew(screwPar).mesh;
			//screw.rotation.x = Math.PI / 2;
			//screw.position.x = rigelLength - 30 + 20;
			//screw.position.y = rigelDist * i + 10;
			//screw.position.z = 10;
			//railingSection.add(screw);

			//if (params.rigelMaterial_bal != "20х20 черн.") {
			//	var holder = drawRigelHolder(holderPar);
			//	holder.position.x = rigelLength - 30 + 20;
			//	holder.position.y = rigelDist * i + 10;
			//	holder.position.z = 10;
			//	if (!testingMode) railingSection.add(holder);
			//}
		}
		if (par.type == "секция") {
			balPartsParams.rigels.push(poleParams.length);
			balPartsParams.rigelAmt += rigelAmt;
		}

		//подпись
		var text = "Ригели секции " + (par.sectId + 1);
		var textHeight = 30;
		var textBasePoint = newPoint_xy(poleParams.dxfBasePoint, 100, -50)
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint)

	}

	/* стекла на стойках */

	if (railingModel == "Стекло на стойках" || railingModel == "Экраны лазер") {
		var glassDist = 40 / 2 + 22;
		var glassHeight = 725;
		glassParams = {
			p1: 0,
			p2: 0,
			angle: handrailAngle,
			glassDist: glassDist,
			glassHeight: glassHeight,
			glassExtrudeOptions: glassExtrudeOptions,
			dxfBasePoint: par.dxfBasePoint,
		}

		for (i = 0; i < rackPosition.length - 1; i++) {
			glassParams.p1 = newPoint_xy(rackPosition[i], 0, 10); //10 - подогнано
			glassParams.p2 = newPoint_xy(rackPosition[i + 1], 0, 10);
			var glass = drawGlassNewell(glassParams).mesh;
			glass.position.z = railingPositionZ * 2 + 16;
			railingSection.add(glass);
			if (par.type == "секция") balPartsParams.glassAmt += 1;
		}


	} //конец стекол на стойках


	/* самонесущее стекло */
	if (railingModel == "Самонесущее стекло") {
		var glassDist = 10; //зазор между стеклами

		var glassHeight = params.handrailHeight_bal; //высота без поручня

		if (params.handrailFixType_bal == "паз") glassHeight += -handrailPar.profY + 25; //25 - глубина паза
		if (params.handrailFixType_bal == "кронштейны") glassHeight += 50;
		if (params.glassFix_bal == "профиль") glassHeight -= 25;
		if (params.glassFix_bal == "рутели") glassHeight += 200;

		var glassAmt = Math.round((platformLength) / 800);
		if (glassAmt < 1) glassAmt = 1;
		var glassLengthX = (platformLength) / glassAmt;
		var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, 200)
		var sectionLength = platformLength * 1.0;

		var glassParams = {
			p1: { x: 0, y: 0 }, //базовая левая нижняя точка
			p2: { x: 0, y: 0 }, //базовая правая нижняя точка
			height: glassHeight, //высота стекла
			offsetLeft: glassDist / 2, //отступ края стекла от базовой точки
			offsetRight: glassDist / 2,
			offsetY: -150, //отступ снизу
			material: params.materials.glass,
			thickness: 12,
			dxfPrimitivesArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
		}

		if (par.angleStart != 0) glassParams.p2.x = - glassDist / 2 - glassParams.thickness / 2;
		if (par.angleStart == 0) glassLengthX = (platformLength - glassDist / 2 - glassParams.thickness / 2) / glassAmt;

		var pos = {
			x: 0,
			y: 0,
			z: 0,
		}
		if (params.glassFix_bal == "профиль") pos.y = 25;
		if (params.glassFix_bal == "рутели") pos.y = -200;


		for (i = 0; i < glassAmt; i++) {
			glassParams.p1.x = glassParams.p2.x;
			glassParams.p2.x += glassLengthX;
			//отверстия под рутели
			if (params.glassFix_bal == "рутели") {
				var offset = {
					x: 100,
					y: 50,
				};
				var rutelDist = 100;
				glassParams.offsetY = -150;
				var center1 = newPoint_xy(glassParams.p1, offset.x, offset.y + glassParams.offsetY);
				var center2 = newPoint_xy(center1, 0, rutelDist);
				var center3 = newPoint_xy(glassParams.p2, -offset.x, offset.y + glassParams.offsetY);
				var center4 = newPoint_xy(center3, 0, rutelDist);
				center1.diam = center2.diam = center3.diam = center4.diam = 18;
				glassParams.holes = [center1, center2, center3, center4];
			}

			glassParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x + glassParams.p1.x, pos.y + 150);

			var glass = draw4AngleGlass_4(glassParams).mesh;
			glass.position.y = pos.y;
			glass.position.z = -20 - glassParams.thickness / 2;
			railingSection.add(glass);
		}


		//профиль

		if (params.glassFix_bal == "профиль") {

			var profileParams = {
				width: 50,
				height: 100,
				length: platformLength * 1.0,
				angleStart: par.angleStart,
				angleEnd: par.angleEnd,
				material: params.materials.inox,
				dxfPrimitivesArr: dxfPrimitivesArr,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, -150),
				sectText: "балюстрада",
			}

			profileParams = drawGlassProfile_4(profileParams);
			railingSection.add(profileParams.mesh);

			//кол-во точек крепления к перекрытию
			var fixPointAmt = Math.ceil(platformLength / 300) + 1;
			if (fixPointAmt < 2) fixPointAmt = 2

		}

		if (par.type == "секция") {
			balPartsParams.sectionAmt += 1;
			if (!balPartsParams.fixPointAmt) balPartsParams.fixPointAmt = fixPointAmt;
			else balPartsParams.fixPointAmt += fixPointAmt;
		}
	}// конец самонесущего стекла


	/*  ковка */

	function forge_nav() { }; //пустая функция для навигации

	if (railingModel == "Кованые балясины") {
		if (typeof balDist == 'undefined') balDist = [100];


		var sectionLength = platformLength - offsetLeft - offsetRight;
		var sectionsCount = Math.ceil(sectionLength / 2000);
		if (sectionsCount > 0) sectionsCount = Math.ceil((sectionLength + 40 * (sectionsCount - 1)) / 2000);
		for (var j = 1; j <= sectionsCount; j++) {
			//var sectLen = 2000;
			//if (j == sectionsCount) sectLen = sectionLength - 2000 * (j - 1);

			var sectLen = sectionLength / sectionsCount;

			//var sectBaseX = 2000 * (j - 1); //Базовая точка секции по оси X
			var sectBaseX = sectLen * (j - 1); //Базовая точка секции по оси X
			if (j > 1) sectBaseX -= 40;
			if (j == sectionsCount) sectLen += 40 * (sectionsCount - 1);

			var svgMarshId = 4 + par.sectId;
			var svgPoleId = j;

			//рамка
			var frameParams = {
				length: sectLen,
				height: rackLength + 15, // 15 чтобы поручень оделся на сварную секцию
				shortLegLength: 100,
				legProf: 40,
				botProf: 20,
				topProf: 20,
				material: params.materials.metal_railing,
				dxfPrimitivesArr: dxfPrimitivesArr,
				dxfBasePoint: par.dxfBasePoint,
				firstRackDelta: 0,
				sectText: "балюстрада",
				sectId: par.sectId,
				hiddenLastRack: j < sectionsCount,
				basePoint: { x: offsetLeft + sectBaseX, y: 0 },
				svgMarshId: svgMarshId,
				svgPoleId: svgPoleId,
			}

			if (params.handrailFixType_bal == "кронштейны") frameParams.height -= 40;


			if (par.type == "секция площадки") frameParams.firstRackDelta = 4; //стойки разной длины для винтовой лестницы

			frameParams = drawForgeFrame2(frameParams);
			var frame = frameParams.mesh;
			// frame.position.x = offsetLeft +sectBaseX;
			railingSection.add(frame);

			//балясины	
			var frameLengthIn = sectLen - frameParams.legProf * 2;
			var balAmt = Math.round(frameLengthIn / balDist[0])
			balDist[1] = frameLengthIn / balAmt;
			var balLength = frameParams.height - frameParams.shortLegLength - frameParams.botProf - frameParams.topProf;

			var insertPoint = [offsetLeft + sectBaseX + frameParams.legProf, frameParams.botProf - 50, -26];
			insertPoint[0] += balDist[1];
			var balAmt1 = 0;
			var balAmt2 = 0;

			//точки для линии в dxf

			var p1 = newPoint_xy(par.dxfBasePoint, frameParams.legProf + balDist[1], frameParams.botProf + frameParams.shortLegLength);
			for (i = 0; i < balAmt - 1; i++) {

				var balPar = {
					type: getBalType(i, 'balustrade'),
					len: balLength,
					dxfBasePoint: newPoint_xy(p1, balDist[1] * i, 0),
				}
				//var bal = drawForgedBanister_4(balPar).mesh;
				if (!$sceneStruct['vl_1']["banisters"])
					var bal = drawForgedBanister_4(balPar).mesh;
				else
					var bal = drawForgedBanister_5(balPar).mesh;
				bal.position.x = insertPoint[0] + balDist[1] * i;
				bal.position.y = insertPoint[1];
				bal.position.z = insertPoint[2];
				railingSection.add(bal);

				var fakeShape = new THREE.Shape();
				var pos = { x: bal.position.x, y: bal.position.y };
				fakeShape.drawing = {
					marshId: svgMarshId,
					poleId: svgPoleId,
					key: 'balustrade',
					group: 'forged_railing',
					elemType: 'banister',
					index: i,
					count: balAmt - 1,
					pos: pos,
					balLen: balLength,
					//banisterType: balType,
				};
				shapesList.push(fakeShape);
			}
		}

		//подпись
		var text = "Кованая секция балюстрады " + (par.sectId + 1);
		if (par.type == "секция площадки") text = "Секция ограждения площадки";
		var textHeight = 30;
		var textBasePoint = newPoint_xy(par.dxfBasePoint, 100, -100)
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint)

		//кронштейны поручня
		if (params.handrail_bal != "нет" && params.handrailFixType_bal == "кронштейны") {
			var holderDist = 800;
			var sideOffset = 60;
			var holderLength = 40;
			var holderRad = 6;
			var frameLength = sectionLength - sideOffset * 2;
			var holderAmt = Math.ceil(frameLength / holderDist) + 1;
			holderDist = frameLength / (holderAmt - 1);

			//базовая точка
			var p1 = { x: sideOffset, y: frameParams.height - 150 }

			for (i = 0; i < holderAmt; i++) {
				var pos = newPoint_xy(p1, holderDist * i, 0);
				var holderParams = {
					angTop: 0,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, pos.x, pos.y + 150),
					isForge: true,
				}
				var holder = drawHandrailHolder(holderParams).mesh;
				holder.position.x = pos.x + offsetLeft;
				holder.position.y = pos.y;
				holder.position.z = -20;
				railingSection.add(holder)
			}
		}

		if (par.type == "секция") {
			balPartsParams.sectionAmt += 1;
			balPartsParams.forgedBalAmt1 += balAmt1;
			balPartsParams.forgedBalAmt2 += balAmt2;
			if (!balPartsParams.handrailHolder) balPartsParams.handrailHolder = holderAmt;
			else balPartsParams.handrailHolder += holderAmt;
			if (!balPartsParams.botFlans) balPartsParams.botFlans = frameParams.flanAmt;
			else balPartsParams.botFlans += frameParams.flanAmt;
		}


	}//конец кованых ограждений


	/*** частые стойки ***/


	if (railingModel == "Частые стойки") {
		var sectionLength = platformLength - offsetLeft - offsetRight - 40

		var rackPosition0 = {
			x: 0,
			y: 0,
			z: -20,
		}
		var rackPosition3 = {
			x: platformLength,
			y: 0,
			z: -20,
		}

		var banisterLength = 900;

		//балясины
		var balAmt = Math.round((rackPosition3.x - rackPosition0.x) / balDist)
		balDist = (rackPosition3.x - rackPosition0.x) / (balAmt + 1);

		var insertPoint = newPoint_xy(rackPosition0, balDist, banisterLength / 2 - 150);
		var rad = 12.5;
		var height = banisterLength;
		var segmentsX = 20
		var segmentsY = 0
		var openEnded = false;

		var geom = new THREE.CylinderGeometry(rad, rad, height, segmentsX, segmentsY, openEnded);

		for (i = 0; i < balAmt; i++) {
			var banister = new THREE.Mesh(geom, params.materials.metal);
			banister.position.x = insertPoint.x;
			banister.position.y = insertPoint.y;
			banister.position.z = insertPoint.z;
			railingSection.add(banister);
			insertPoint = newPoint_xy(insertPoint, balDist, 0);
			if (par.type == "секция") balPartsParams.rackAmt += 1;
		}
	}


	/* поручень */

	function handrail_nav() { }; //пустая функция для навигации

	if (handrail != "нет") {

		//параметры поручня
		var handrailPar = {
			prof: params.handrailProf_bal,
			sideSlots: params.handrailSlots_bal,
			handrailType: params.handrail_bal,
		}
		handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js
		var handrailProfileY = handrailPar.profY;
		var handrailProfileZ = handrailPar.profZ;
		var handrailModel = handrailPar.handrailModel;
		var handrailMaterial = params.materials.metal;
		if (handrailPar.mat == "timber") handrailMaterial = params.materials.handrail;
		if (handrailPar.mat == "inox") handrailMaterial = params.materials.inox;
		//поручень кроме деревянных ограждений
		if (railingModel != "Деревянные балясины" && railingModel != "Стекло" && railingModel != "Дерево с ковкой") {
			var handrailLength = sectionLength + handrailOffsetStart + handrailOffsetEnd + 40;
			if (railingModel == "Самонесущее стекло") {
				handrailLength = sectionLength + 15 * 2;
				if (par.angleStart == 0) handrailLength += -handrailProfileZ / 2
			}

			if (railingModel == "Решетка" || railingModel == "Кованые балясины") handrailLength -= 40;

			var handrailParams = {
				partName: "handrails",
				unit: "balustrade",
				type: handrailModel,
				poleProfileY: handrailProfileY,
				poleProfileZ: handrailProfileZ,
				length: handrailLength,
				poleAngle: 0,
				material: handrailMaterial,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y),
				dxfArr: dxfPrimitivesArr,
				fixType: "нет",
				side: "in",
				drawing: { group: 'handrails', unit: 'balustrade', pos: basePoint, ang: 0 }
			}

			//Поправка положения поручня по оси Z
			if (params.railingModel_bal !== 'Самонесущее стекло') railingPositionZ -= 20 - handrailProfileZ / 2;


			if (params.handrailConnectionType_bal == 'без зазора премиум') {
				handrailParams.cutBasePlane = 'top';
				handrailParams.startAngle = 0;
				handrailParams.endAngle = 0;


				if (params.railingModel_bal !== 'Самонесущее стекло') {

					if (par.connection == 'начало') {
						handrailParams.startAngle = par.angleStart;
						handrailOffsetStart -= handrailProfileZ / 2;
						handrailParams.length -= handrailProfileZ / 2;
					}
					if (par.connection == 'конец') {
						handrailParams.endAngle = par.angleEnd;
						handrailParams.length += handrailProfileZ / 2;
					}
					if (par.connection == 'две стороны') {
						handrailParams.startAngle = par.angleStart;
						handrailParams.endAngle = par.angleEnd;
						handrailOffsetStart -= handrailProfileZ / 2;
					}
				} else {
					if (par.connection == 'начало' || par.connection == 'две стороны') {
						handrailParams.startAngle = par.angleStart;
						handrailOffsetStart -= handrailProfileZ / 2;
					}
					if (par.connection == 'конец' || par.connection == 'две стороны') {
						handrailParams.endAngle = par.angleEnd;
						handrailParams.length -= (40 - handrailProfileZ) / 2;
						if (par.connection == 'две стороны') {
							if (par.sectId == 0 || par.sectId > 0 && $('#banisterSectionDirection' + par.sectId).val() !== $('#banisterSectionDirection' + (par.sectId - 1)).val()) {
								handrailParams.length -= handrailProfileZ / 2;
							}
						}
					}
				}

			}

			if (params.handrailConnectionType_bal == 'шарнир') {
				if (par.connection == 'начало') {
					handrailOffsetStart -= 50;
					handrailParams.length -= 50;
				}
				if (par.connection == 'конец') {
					// handrailParams.length -= 50;
				}
				if (par.connection == 'две стороны') {
					handrailOffsetStart -= 50;
					handrailParams.length -= 50;
				}
			}

			//позиция поручня
			var pos = {
				x: offsetLeft - handrailOffsetStart,
				y: params.handrailHeight_bal - rackOffsetY - handrailProfileY,
				z: railingPositionZ - handrailProfileZ / 2 + 70,
			}

			if (handrailParams.poleType === "round") {
				pos.x += handrailParams.length / 2;
				pos.y += handrailProfileY / 2;
				pos.z = - 20;
				if (par.type == "секция площадки") pos.z = 0;
			}

			if (railingModel == "Самонесущее стекло") {
				handrailParams.fixType = params.handrailFixType_bal;
				pos.z = 30;
				if (params.handrailFixType_bal == 'паз' && par.connection !== 'начало' && par.connection !== 'две стороны') pos.x -= 10;
				if (params.handrailFixType_bal == "кронштейны") pos.z = -30; //подогнано
			}

			if (params.calcType == 'vint') {
				pos.y = -rackOffsetY + params.handrailHeight_bal - handrailPar.profY - 25 + 42;//42 высота кронштейна
				if (params.handrail_bal == "Ф50 нерж." || params.handrail_bal == 'ПВХ') {
					pos.y += handrailPar.profY / 2;
				}
			}

			handrailParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y + 150);

			var partsAmt = Math.ceil(handrailParams.length / 3000);
			var length = handrailParams.length;
			for (var i = 0; i < partsAmt; i++) {
				if ((par.connection == 'конец' || par.connection == 'нет') && i == 0) handrailParams.startPlug = true;
				if ((par.connection == 'начало' || par.connection == 'нет') && i == (partsAmt - 1)) handrailParams.endPlug = true;
				handrailParams.length = length / partsAmt;

				if (params.railingModel_bal == "Кованые балясины" && params.handrailFixType_bal == "паз") handrailParams.hasSilicone = true;
				if (params.railingModel_bal == 'Самонесущее стекло' && params.handrailFixType_bal == "паз") handrailParams.hasSilicone = true;
				var pole = drawHandrail_4(handrailParams).mesh;

				var handrailPos = polar(pos, handrailAngle, handrailParams.length * i)

				pole.position.x = handrailPos.x;
				pole.position.y = handrailPos.y;
				if (testingMode) pole.position.y += 2; //2 подогнано чтобы не было пересечений
				pole.position.z = pos.z;
				railingSection.add(pole);
			}

			if (params.handrailConnectionType_bal == 'шарнир') {
				if (par.connection == 'конец' || par.connection == 'две стороны') {
					var jointParams = {
						rad: 25,
						dxfBasePoint: handrailParams.dxfBasePoint
					}

					var sphere = drawHandrailJoint(jointParams);
					sphere.position.x = pos.x + handrailLength + jointParams.rad;
					sphere.position.y = pos.y + handrailProfileY / 2 - jointParams.rad;
					sphere.position.z = pos.z - handrailProfileZ / 2 - jointParams.rad;

					if (par.connection == 'две стороны') {
						sphere.position.x -= jointParams.rad * 2;
					}

					railingSection.add(sphere);
				}
				if ((par.sectId == 0 && (par.connection == 'начало' || par.connection == 'две стороны')) || par.sectId > 0 && ($('#banisterSectionDirection' + (par.sectId - 1)).val() !== 'начало' && $('#banisterSectionDirection' + (par.sectId - 1)).val() == 'две стороны')) {
					var jointParams = {
						rad: 25,
						dxfBasePoint: handrailParams.dxfBasePoint
					}

					var sphere = drawHandrailJoint(jointParams);
					sphere.position.x = pos.x - jointParams.rad;
					sphere.position.y = pos.y + handrailProfileY / 2 - jointParams.rad;
					sphere.position.z = pos.z - handrailProfileZ / 2 - jointParams.rad;
					railingSection.add(sphere);
				}
			}

		} //конец поручня кроме деревянных ограждений

		if (pos) {
			var flanPar = {
				type: handrailPar.handrailModel,
			}

			if (par.flans == "начало" || par.flans == "две стороны") {
				var flan = drawHandrailFlan(flanPar).mesh;
				flan.position.x = pos.x
				flan.position.y = pos.y + handrailProfileY / 2;
				flan.position.z = pos.z - handrailProfileZ / 2;// - flanPar.width / 2;
				if (flanPar.type == 'round') {
					flan.position.y = pos.y;
					flan.position.z = pos.z - handrailProfileZ;
				}
				railingSection.add(flan);
			}

			if (par.flans == "конец" || par.flans == "две стороны") {
				var flan = drawHandrailFlan(flanPar).mesh;
				flan.position.x = pos.x + handrailLength;
				flan.position.y = pos.y + handrailProfileY / 2;
				flan.position.z = pos.z;
				if (flanPar.type == 'round') {
					flan.position.y = pos.y;
					flan.position.z = pos.z - handrailProfileZ;
				}
				railingSection.add(flan);
			}
		}

	}; //конец поручня

	function drawTimberPlatformRailing_nav() { } //пустая функция для навигации

	if (railingModel == "Деревянные балясины" || railingModel == "Стекло" || railingModel == "Дерево с ковкой") {

		var banisterLength = 900;
		if (params.timberBalBotEnd_bal == "круг") banisterLength = 770;
		var botEndLength = 150;
		var rackSize = 95 * 1.0;
		if (params.rackSize != undefined) rackSize = params.rackSize * 1.0;

		railingPositionZ = -rackSize / 2;
		railingPositionY = -150
		var balDist = params.balDist_bal;
		var banisterSize = params.banisterSize_bal;
		var botEndType = params.timberBalBotEnd_bal;
		var topEndType = params.timberBalTopEnd_bal;
		var handrailPositionY = 900;

		//столбы
		var maxNewellDist = 2000;
		var midRackAmt = Math.ceil(platformLength / maxNewellDist) - 1;
		var rackDist = (platformLength) / (midRackAmt + 1);

		var basePoint = { x: 0, y: railingPositionY, z: railingPositionZ };

		for (var i = 0; i <= midRackAmt + 1; i++) {

			var basePoint = {
				x: rackDist * i + rackSize / 2,
				y: railingPositionY,
				z: railingPositionZ,
			}

			//столб
			if (par.connection == "нет" || par.connection == "конец" || i > 0) {
				var newellParams = {
					type: params.timberNewellType_bal,
					len: 1000,
					rackSize: rackSize - 0.02,
					topType: params.newellTopType_bal,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y),
					marshId: par.marshId,
					unit: "balustrade",
				}

				var rack = drawTimberNewell_4(newellParams).mesh;
				rack.position.x = basePoint.x - rackSize;
				rack.position.y = basePoint.y;
				rack.position.z = basePoint.z - rackSize / 2;
				railingSection.add(rack);
			}

			//заполнение секции
			var sectLen = (platformLength - rackSize * (midRackAmt + 1)) / (midRackAmt + 1);

			if (i <= midRackAmt) {
				var balAmt = Math.floor(sectLen / balDist)
				var balsDist = sectLen / (balAmt + 1);
				//балясины
				if (railingModel != "Стекло") {
					var balParams = {
						basePoint: newPoint_xy(basePoint, 0, 0),
						lenX: sectLen,
						ang: 0,
						balLen: banisterLength - 40,
						balStep: balsDist,
						dxfBasePoint: newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y),
						marshId: par.marshId,
						unit: "balustrade",
					}

					if (railingModel == "Дерево с ковкой") {
						balParams.balLen = banisterLength - 10;
						//balParams.balLen -= 100;
						balParams.basePoint.y += 100;
					}

					var balArr = drawBanistersArr(balParams);

					if (params.timberBalBotEnd_bal != "круг") balArr.position.y += 40
					//if (params.timberBalBotEnd_bal == "круг") balArr.position.y += 170;
					if (params.timberBalBotEnd_bal == "круг") balArr.position.y += 40;

					balArr.position.z = basePoint.z;

					railingSection.add(balArr);
				}

				//стекла
				if (railingModel == "Стекло") {
					var glassDist = 10; //зазор между стеклами
					var glassHeight = 750;
					//sectLen -= glassDist;
					var sectGlassAmt = Math.ceil((sectLen - glassDist) / 1000);
					if (sectGlassAmt < 1) sectGlassAmt = 1;
					var glassLengthX = (sectLen - glassDist) / sectGlassAmt;
					var p1 = { x: 0, y: 0 }
					var p2 = { x: glassLengthX, y: 0 }
					var x0 = basePoint.x + glassDist;

					for (j = 0; j < sectGlassAmt; j++) {
						var glassShape = drawGlassShape_4(p1, p2, 0, glassDist, glassHeight);
						var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
						geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
						var glass = new THREE.Mesh(geom, params.materials.glass);
						glass.position.x = x0 + glassLengthX * j;
						glass.position.y = 0
						glass.position.z = -rackSize / 2;
						glass.castShadow = true;
						railingSection.add(glass);
						if (glassShape.articul) glass.specId = glassShape.articul;
					}
					//x0 = glass.position.x + glassLengthX + rackSize * 1.0 + glassDist;


				}


				//поручень
				//var handrailLength = distance(rackPosition3, rackPosition0) - rackSize;
				var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -300)

				var handrailParams = {
					partName: "handrails",
					unit: "balustrade",
					type: handrailModel,
					poleProfileY: handrailProfileY,
					poleProfileZ: handrailProfileZ,
					length: sectLen,
					poleAngle: 0,
					material: handrailMaterial,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y),
					dxfArr: dxfPrimitivesArr,
					fixType: "нет",
					side: "out",
					drawing: { group: 'handrails', unit: 'balustrade', pos: basePoint, ang: 0 }
				}
				if (par.sectId == 0 && params.banisterStart != "столб" && i == 0) {
					handrailParams.length -= handrailProfileZ / 2;
				}
				// console.log(handrailParams.length, sectLen)
				var pole = drawHandrail_4(handrailParams).mesh;
				pole.position.x = basePoint.x;
				pole.position.y = railingPositionY - handrailProfileY + params.handrailHeight_bal;
				pole.position.z = railingPositionZ - handrailParams.wallOffset;
				if (par.sectId == 0 && params.banisterStart != "столб" && i == 0) {
					pole.position.x += handrailProfileZ / 2;
				}
				railingSection.add(pole);


				//перемычка секции
				dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -500);
				if (botEndType == "квадрат") {
					profileY = 40;
					profileZ = 60;
				}

				if (botEndType == "круг" || railingModel == "Стекло" || railingModel == "Дерево с ковкой") {
					profileY = 70;
					profileZ = 40;
				}


				var poleParams = {
					partName: "botPole",
					unit: "balustrade",
					type: handrailModel,
					poleProfileY: profileY,
					poleProfileZ: profileZ,
					length: sectLen,
					poleAngle: 0,
					material: handrailMaterial,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y),
					dxfArr: dxfPrimitivesArr,
					fixType: "нет",
					side: "out",
				}
				// console.log(params.banisterStart, i, par.sectId)
				if (par.sectId == 0 && params.banisterStart != "столб" && i == 0) {
					poleParams.length -= handrailProfileZ / 2;
				}
				var pole = drawHandrail_4(poleParams).mesh;
				pole.position.x = basePoint.x;
				pole.position.y = -50;
				if (railingModel == "Деревянные балясины" && botEndType == "квадрат") pole.position.y = -150;
				pole.position.z = railingPositionZ - handrailParams.wallOffset;
				if (par.sectId == 0 && params.banisterStart != "столб" && i == 0) {
					pole.position.x += handrailProfileZ / 2;
				}
				railingSection.add(pole);


			}
		}



		//стартовый узел для первой секции балюстрады при стыковке с ограждением деревянной лестницы
		if (par.sectId == 0 && params.banisterStart != "столб" && params.banisterStart != "нет") {
			//дополнительная балясина
			if (railingModel == "Деревянные балясины_") {
				var insertPoint = newPoint_xy(basePoint, rackSize / 2, 0);
				var banister = drawLatheBanister(banisterLength, banisterSize, botEndType, botEndLength, topEndType, par.timberBalType);
				banister.position.x = insertPoint.x;
				banister.position.y = insertPoint.y;
				if (botEndType == "круг") banister.position.y = banister.position.y + (handrailPositionY - banisterLength);
				banister.position.z = insertPoint.z;
				railingSection.add(banister);
			}
			//продолждение подбалясинной доски
			poleParams.length = handrailProfileZ + 20;
			poleParams.poleProfileY = handrailProfileY;
			poleParams.poleProfileZ = handrailProfileZ;
			poleParams.partName = "handrails";
			var pole = drawPole3D_4(poleParams).mesh;
			pole.rotation.y = Math.PI / 2;
			pole.position.x = rackSize / 2 - handrailProfileZ / 2;
			pole.position.y = -50;
			if (railingModel == 'Деревянные балясины') pole.position.y = -150;

			pole.position.z = railingPositionZ + handrailProfileZ / 2;
			if (params.banisterStart == "правый угол") {
				pole.rotation.y = -Math.PI / 2;
				pole.position.x = rackSize / 2 + handrailProfileZ / 2;
				pole.position.z = railingPositionZ - handrailProfileZ / 2;
			}
			railingSection.add(pole);

			// poleParams.poleProfileY = handrailProfileY;
			// poleParams.poleProfileZ = handrailProfileZ;
			// var pole = drawPole3D_4(poleParams).mesh;
			// pole.rotation.y = Math.PI / 2;
			// pole.position.x = rackSize/2  - profileZ / 2;
			// pole.position.y = -50;
			// // if (botEndType == "квадрат") pole.position.y = 0;

			// // pole.position.z = railingPositionZ + profileZ/2;
			// pole.position.z = railingPositionZ + handrailProfileZ/2;
			// if(params.banisterStart == "правый угол"){
			// 	pole.rotation.y = -Math.PI / 2;
			// 	pole.position.x = rackSize/2 + profileZ / 2;
			// 	pole.position.z = railingPositionZ - profileZ/2;					
			// }
			// railingSection.add(pole);

			//продолжение поручня
			poleParams.length = handrailProfileZ + 20;
			poleParams.poleProfileY = handrailProfileY;
			poleParams.poleProfileZ = handrailProfileZ;
			poleParams.partName = "handrails";
			var pole = drawPole3D_4(poleParams).mesh;
			pole.rotation.y = Math.PI / 2;
			pole.position.x = rackSize / 2 - handrailProfileZ / 2;
			pole.position.y = handrailPositionY - 150;
			//if (botEndType == "квадрат") pole.position.y = -150;

			pole.position.z = railingPositionZ + handrailProfileZ / 2;
			if (params.banisterStart == "правый угол") {
				pole.rotation.y = -Math.PI / 2;
				pole.position.x = rackSize / 2 + handrailProfileZ / 2;
				pole.position.z = railingPositionZ - handrailProfileZ / 2;
			}
			railingSection.add(pole);

		}

	}	//конец деревянных балясины

	//подпись
	var text = "Секция " + (par.sectId + 1);
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 100, -250)
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint)


	//сохраняем данные для спецификации

	if (railingModel == "Кованые балясины") {

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
					group: "Балюстрада",
				}
			}
			var name = "L=" + Math.round(sectionLength) + " фланц.";
			//if(par.railingSide == "left") name = "L=" + Math.round(sectionLength) + " лев.";
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}
		railingSection.specId = partName + name;
	}

	return railingSection;

}// end of drawRailingSectionPlatform