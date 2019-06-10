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
//------------------------------------------------------------

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
				if (params.handrailEndType == "под углом" && p2.x != p1.x) {
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

					par.mesh.add(plug);
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

			if (params.handrailConnectionType == 'прямые' && i > 0) {
				var handrailOffset = 20;

				var angle1 = angle(basePoint, points[i - 1])
				var angle2 = handrailAngle;

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

				par.mesh.add(connectionFlan);
			}

			if ((params.handrailConnectionType == "без зазора премиум" || params.handrailConnectionType == "без зазора") && i < points.length - 2) {

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

				par.mesh.add(plug);
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
			if (par.topPoint) {
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