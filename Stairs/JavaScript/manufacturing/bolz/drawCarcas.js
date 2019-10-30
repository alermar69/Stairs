function drawTopStepLt_wndOut(par) {

	//константы
	var angleHoleY = 20;						    // отступ от низа ступени до центра отверстия крепления уголка
	var angelLenght = 20 + par.holeDistU4 + 20;	// длина уголка
	var angleClearance = 5;							// зазор между уголками
	var wndBottomAngle = 10 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью


	var totalLengthWndOut = params.M + 31 + par.stringerLedge - params.stringerThickness;

	if (par.stairAmt == 0 || par.stairAmt == 1) {
		wndBottomAngle = 18 * Math.PI / 180;
		if (!hasTreadFrames()) totalLengthWndOut += 3;
	}

	var backLineLength = par.stringerLedge + params.treadThickness + par.profileHeight + angleClearance + angelLenght + angleClearance + angelLenght + angleClearance;		// длинна задней вертикальной линии тетивы


	/*ТОЧКИ КОНТУРА*/

	var p0 = par.pointsShape[par.pointsShape.length - 1];

	var p1 = newPoint_xy(p0, par.b, 0);
	var p20 = newPoint_xy(p1, (par.stringerWidth / Math.sin(par.marshAng)), 0.0); // первая точка на нижней линии марша
	if (params.stringerType == "прямая") p20.x -= par.b;
	var p21 = polar(p20, par.marshAng, 100.0); // вторая точка на нижней линии

	//проступь последней ступени перед поворотом
	var p1 = copyPoint(p0);
	if (par.stairAmt > 0) p1 = newPoint_xy(p0, par.b, 0);

	// первая забежная ступень

	var p2 = copyPoint(p1);
	if (par.stairAmt > 0 || par.isWndP) p2 = newPoint_xy(p1, 0.0, par.h);
	var p3 = newPoint_xy(p2, par.wndSteps[1].out.botMarsh, 0.0);

	// вторая забежная ступень
	var p4 = newPoint_xy(p3, 0.0, par.h_next);
	var p5 = newPoint_xy(p4, par.wndSteps[2].out.botMarsh, 0);

	//задняя линия
	var botLineP1 = newPoint_xy(p5, 0, -backLineLength);

	// нижняя линия

	var botLinePoints = [];

	if (params.stringerType == "ломаная") {
		var p7 = newPoint_xy(p3, par.stringerWidth, - par.stringerWidth);
		var p6 = { x: p7.x, y: botLineP1.y, };
		var p8 = newPoint_xy(p2, par.stringerWidth, - par.stringerWidth);
		var p9 = newPoint_xy(p1, par.stringerWidth, - par.stringerWidth);
		if (par.stairAmt == 0) p7.y = 0; //делаем нижнюю кромку прямой на уровне пола
		botLinePoints.push(p6, p7);
		if (par.stairAmt > 1) botLinePoints.push(p8, p9)

	}

	if (params.stringerType != "ломаная") {
		var ang = calcAngleX1(p2, p4);
		var botLineP2 = itercection(p20, p21, botLineP1, polar(botLineP1, ang, 100));
		if (par.stairAmt > 2) botLinePoints.push(botLineP2);; //если меньше 2 ступеней нижняя линия без перелома
	}

	//корректируем форму для прямой тетивы
	if (params.stringerType == "прямая") {
		var p2s = polar(p2, par.marshAng, 100);
		var p5s = newPoint_xy(p5, 0, 100);
		p5s.filletRad = 0;
		if (par.isWndP) p2s = newPoint_xy(p5s, -100, 0)
	}

	//сохраняем точки контура
	p5.filletRad = botLineP1.filletRad = 0;

	if (params.stringerType !== "прямая") {
		if (par.stairAmt > 0) par.pointsShape.push(p1);
		if (par.stairAmt > 0 || par.isWndP) par.pointsShape.push(p2);
		par.pointsShape.push(p3);
		par.pointsShape.push(p4);
		par.pointsShape.push(p5);
	}
	if (params.stringerType == "прямая") {
		//if(par.isWndP) par.pointsShape.pop();
		par.pointsShape.pop();
		par.pointsShape.push(p2s);
		par.pointsShape.push(p5s);
	}
	par.pointsShape.push(botLineP1);
	par.pointsShape.push(...botLinePoints);

	//сохраняем точки для отладки
	par.keyPoints[par.key].topEnd = p1;
	par.keyPoints[par.key].topEndCol = p5;

	//сохраняем точку для расчета длины
	par.keyPoints.topPoint = copyPoint(p5);

	/*ОТВЕРСТИЯ*/

	// отверстия под уголки крепления верхнего марша
	// первый уголок
	center1 = newPoint_xy(p5, -30, -(par.stringerLedge + params.treadThickness + par.profileHeight + 25));	// здесь 25 - это расстояние от фланца рамки до верхнего отверстия в уголке
	center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
	center1.hasAngle = center2.hasAngle = false;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// второй уголок
	center1 = newPoint_xy(center2, 0.0, -105)
	center2 = newPoint_xy(center1, 0.0, par.holeDistU4);
	center1.hasAngle = center2.hasAngle = false;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	if (hasTreadFrames()) {
		// отверстия под первую забежную рамку
		var holePar = {
			holes: par.wndFramesHoles.botMarsh.out[1],
			basePoint: newPoint_xy(p2, par.stringerLedge + par.wndSteps.frameFrontOffset, -(par.stringerLedge + params.treadThickness)),
		}
		par.pointsHole.push(...calcWndHoles(holePar));

		// отверстие под вторую забежную рамку
		var holePar = {
			holes: par.wndFramesHoles.botMarsh.out[2],
			basePoint: newPoint_xy(p5, 0, -(par.stringerLedge + params.treadThickness)),
		}
		par.pointsHole.push(...calcWndHoles(holePar));
		var centerHoleWnd1 = par.pointsHole[par.pointsHole.length - 1];//запоминаем второе отверстие рамки для расчета пересечения отверстия ограждения

	}

	if (!hasTreadFrames()) {

		// отверстия под перемычку
		if ((par.stairAmt > 0 || par.marshId != 1) && params.calcType != 'bolz') {
			var center1 = newPoint_xy(p2, 74.0, -(5 + params.treadThickness + 20));
			var center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false; //уголки перемычки отрисовываются внутри drawBridge_2

			//на внутренней стороне в перемычке не должно быть болтов на уголке, чтобы не было пересечения с длинными болтами
			var bridgeBasePoint = newPoint_xy(center1, -38.0, 20.0);
			bridgeBasePoint.noBoltsOnBridge = true;
			par.elmIns[par.key].bridges.push(bridgeBasePoint);

			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
		}


		//отверстия под уголки первой забежной ступени

		var angPar = calcWndParams(); //функция в файле drawCarcas.js


		angleHoleOffsetX = par.turnStepsParams.params[1].stepWidthHi - 60;

		center1 = newPoint_xy(p2, angleHoleOffsetX, par.stepHoleY)
		center2 = newPoint_xy(center1, -angPar.angleHoleDist, 0);
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);

		//дополнительный уголок первой забежной ступени
		if ((par.marshId == 1 && par.stairAmt == 0) || params.calcType == 'bolz') {
			if (params.calcType == 'bolz') center1 = newPoint_xy(p2, 50, par.stepHoleY)
			if (par.marshId == 1 && par.stairAmt == 0) center1 = newPoint_xy(p1, 50, par.stepHoleY)
			center2 = newPoint_xy(center1, angPar.angleHoleDist, 0);
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
		}

		//отверстия под уголки второй забежной ступени

		angleHoleOffsetX = 60;

		center1 = newPoint_xy(p4, angleHoleOffsetX, par.stepHoleY);
		center2 = newPoint_xy(center1, angPar.angleHoleDist, 0);
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);

		var centerHoleWnd1 = par.pointsHole[par.pointsHole.length - 1];//запоминаем второе отверстие рамки для расчета пересечения отверстия ограждения

	}

	//Отверстия под ограждения
	if (par.hasRailing) {

		if (params.railingModel != "Самонесущее стекло") {
			// отверстия под стойку 2 (ближнюю к углу)
			center1 = newPoint_xy(p5, -80 + params.stringerThickness, par.rackTopHoleY);

			//если отверстия стойки и второй забежной рамки или уголка крепления второй забежной ступени пересекаются, сдвигаем отверстие стойки
			if (Math.abs(center1.x - centerHoleWnd1.x) < 15)
				center1.x = centerHoleWnd1.x - 15;
			par.railingHoles.push(center1);

			//заднее ограждение забега П-образной
			if (par.stairAmt == 0 && par.botEnd == "winder") {
				center1 = newPoint_xy(p5, -80 + params.stringerThickness, par.rackTopHoleY);
				var deltaX = params.M * 2 + params.marshDist - 80 * 2;
				var deltaY = par.h * 3;
				var handrailAngle = Math.atan(deltaY / deltaX);
				center1 = newPoint_y(center1, -par.h, handrailAngle);
				par.railingHoles.push(center1);
			}
			else {
				center1 = newPoint_xy(p2, par.b * 0.5, par.rackTopHoleY);
				//смещаем стойку ближе к началу ступени
				var mooveX = center1.x - p2.x - 40; //40 - отступ отверстия от края ступени	
				center1 = newPoint_x1(center1, - mooveX, par.marshAng);

				if (par.stairAmt > 1) par.railingHoles.push(center1);
				if (par.stairAmt == 1 && params.stairModel == "П-образная трехмаршевая" && par.marshId == 2) par.railingHoles.push(center1);
				if (par.stairAmt == 0 && params.stairModel == "П-образная трехмаршевая" && par.marshId == 2) {
					center1 = newPoint_xy(p2, par.b * 0.5, par.rackTopHoleY);
					par.railingHoles.push(center1);
				}
			}


		}

		if (params.railingModel == "Самонесущее стекло") {

			//крепление ближе к маршу
			center1 = newPoint_xy(p2, par.rutelPosX, par.rutelPosY);
			center2 = newPoint_xy(center1, 0.0, -par.rutelDist);
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);

			//крепление ближе к углу
			center1 = newPoint_xy(p5, -60 - params.stringerThickness - 15, par.rutelPosY);
			center2 = newPoint_xy(center1, 0.0, -par.rutelDist);
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);
		}
	}

	//крепление к стенам
	if (par.marshParams.wallFix.out) {
		var fixPar = getFixPart(par.marshId);
		//отверстие ближе к углу
		center1 = newPoint_xy(p5, -200, -200);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.noZenk = true;
		center1.noBolts = true;
		center1.wallFix = true;
		//center1.noZenk = true;
		par.pointsHole.push(center1);
		//отверстие ближе к маршу
		center1 = newPoint_xy(p2, 150, -200);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.noZenk = true;
		center1.noBolts = true;
		center1.wallFix = true;
		//center1.noZenk = true;
		par.pointsHole.push(center1);
	}

	//сохраняем координаты угла тетивы для самонесущего стекла
	par.keyPoints[par.key].botLineP10 = newPoint_xy(p5, params.stringerThickness, -backLineLength);//FIX

	//точки на нижней линии марша для самонесущего стекла
	if (par.stairAmt <= 2) {
		var pt = copyPoint(par.midUnitEnd);
		//if (par.stairAmt == 0) pt.x += lengthB1;
		var p10 = polar(pt,
			(par.marshAng - Math.PI / 2),
			par.stringerWidth) // первая точка на нижней линии марша

		var p20 = polar(p10, par.marshAng, -100.0)

		p10 = polar(p10, par.marshAng + Math.PI / 2, 30);
		p20 = polar(p20, par.marshAng + Math.PI / 2, 30);

		par.keyPoints[par.key].marshBotLineP1 = copyPoint(p10)
		par.keyPoints[par.key].marshBotLineP2 = newPoint_xy(p20)
	}

}//end of drawTopStepLt_wndOut

function setRacksParams(par) {
	//параметры марша
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;

	//рассчитываем необходимые параметры и добавляем в объект par
	setRailingParams(par) //функция в файле calcRailingParams.js

	//костыль для верхней площадки лт лестницы сдвигаем стойки заднего ограждения, что бы совпали отверстия 
	if (params.model == "лт" && params.railingModel == "Кованые балясины" && par.isPlatform && par.marshId == "topPlt") {
		par.racks[0].x -= 5;
		par.racks[par.racks.length - 1].x -= 5;
	}


	var racks = par.racks;
	var parRacks = {};

	//костыль для второго марша сдвигаем стойки
	if (params.stairModel == "Прямая горка") {
		for (var i = 0; i < racks.length; i++) {
			if (racks[i + 1]) {
				if (racks[i].x > racks[i + 1].x) {
					racks[i].x += 10;
				}
			}
		}
	}

	//сортируем массив points в порядке возрастания координаты x
	racks.sort(function (a, b) {
		return a.x - b.x;
	});

	//если все стойки находятся на площадке
	if (racks[0].y == racks[racks.length - 1].y && params.stairModel !== 'Прямая горка') {
		par.isRearPRailing = true;
	}

	//определяем крайние стойки снизу
	if (par.botEnd != "нет") {
		parRacks.botFirst = racks[0];
		parRacks.botLast = racks[1];

		//ищем стойки на той же высоте но дальше по Х
		for (var i = 0; i < racks.length; i++) {
			if (!racks[i]) continue;
			if (racks[i].y == parRacks.botLast.y && racks[i].x > parRacks.botLast.x) {
				parRacks.botLast = racks[i];
			}
		}
	}
	if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt") {
		var botFirst = {};
		var botLast = {};
		for (var i = 0; i < racks.length - 1; i++) {
			if (!botFirst.x && racks[i].y == racks[i + 1].y) {
				botFirst = racks[i];
			}
			if (racks[i].y == botFirst.y) botLast = racks[i];
			if (racks[i + 1].y == botFirst.y) botLast = racks[i + 1];
		}
		parRacks.botFirst = botFirst;
		parRacks.botLast = botLast;
	}

	//определяем крайние точки сверху
	if (par.topEnd !== "нет") {
		parRacks.topLast = racks[racks.length - 1];
		parRacks.topFirst = racks[racks.length - 2];
		//ищем стойки на той же высоте но ближе по Х
		for (var i = racks.length - 1; i > 0; i--) {
			if (racks[i].y == parRacks.topFirst.y && racks[i].x < parRacks.topFirst.x) {
				parRacks.topFirst = racks[i];
			}
			if (racks[i].y == parRacks.topLast.y && racks[i].x > parRacks.topLast.x) {
				parRacks.topLast = racks[i];
			}
		}
	}

	//определяем крайние стойки марша
	parRacks.marshFirst = racks[0];
	if (par.botEnd != "нет") parRacks.marshFirst = parRacks.botLast;
	parRacks.marshLast = racks[racks.length - 1];
	if (par.topEnd != "нет" && racks.length > 2) parRacks.marshLast = parRacks.topFirst;

	if (params.stairModel == "Прямая горка") {
		var topFirst = {};
		for (var i = 0; i < racks.length; i++) {
			if (!topFirst.x && racks[i].y == racks[i + 1].y) {
				topFirst = racks[i];
			}
			if (racks[i].y == topFirst.y) parRacks.topLast = racks[i];
		}
		parRacks.marshLast = topFirst;
		parRacks.topFirst = topFirst;

		parRacks.marsh2First = parRacks.topLast;
		parRacks.marsh2First.x += 10;
		parRacks.marsh2Last = racks[racks.length - 1];
	}

	//определяем крайние стойки марша
	parRacks.marshFirst = racks[0];
	if (par.botEnd != "нет") parRacks.marshFirst = parRacks.botLast;
	parRacks.marshLast = racks[racks.length - 1];
	if (par.topEnd != "нет" && racks.length > 2) parRacks.marshLast = parRacks.topFirst;


	//рассчитываем длины и углы верхнего и нижнего участков
	if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 0 && par.key == "out") {
		parRacks.angBot = calcAngleX1(parRacks.botFirst, parRacks.botLast);
		parRacks.botLen = distance(parRacks.botFirst, parRacks.botLast);

		parRacks.angTop = calcAngleX1(parRacks.topFirst, parRacks.topLast);
		parRacks.topLen = distance(parRacks.topFirst, parRacks.topLast);
	}

	if ((par.botEnd !== "нет" && par.stairAmt > 0) || (par.botEnd == "площадка" && par.topEnd == "площадка")) {
		parRacks.angBot = calcAngleX1(parRacks.botFirst, parRacks.botLast);
		parRacks.botLen = distance(parRacks.botFirst, parRacks.botLast);
	}
	if ((par.topEnd !== "нет" && par.stairAmt > 0) || par.topEnd == "площадка") {
		parRacks.angTop = calcAngleX1(parRacks.topFirst, parRacks.topLast);
		parRacks.topLen = distance(parRacks.topFirst, parRacks.topLast);
	}

	//задаем длину стоек
	var rackPlatformLength = par.rackLength + 50;
	for (var i = 0; i < racks.length; i++) {
		if (!racks[i]) continue;
		racks[i].len = par.rackLength;
		if (params.railingModel != "Кованые балясины") {
			if (par.botEnd == "площадка" && racks[i].x <= 0) racks[i].len = rackPlatformLength;
			if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt") {
				if (parRacks.botFirst.x < racks[i].x && parRacks.botLast.x > racks[i].x)
					racks[i].len = rackPlatformLength;
			}

			if (par.topEnd == "площадка" && racks[i].y == parRacks.topLast.y) racks[i].len = rackPlatformLength;
			if (par.topEnd == "площадка" && racks[i].x == parRacks.marshLast.x && racks.length > 2) racks[i].len = par.rackLength;
		}
		if (par.isPlatform) racks[i].len = rackPlatformLength;
		//if (marshPar.botTurn != "пол" && i == 0 && par.key == "in" && prevMarshPar.hasRailing.in) {
		if (racks[i].isTurnRack) {
			racks[i].len += setTurnRacksParams(par.marshId, par.key).rackLenAdd;
		}
	}

	//перенос первой стойки при наличии пригласительных ступеней
	if (par.marshId == 1 && params.startTreadAmt > params.railingStart) {

		var frontOffset = 200; //отступ стойки от края ступени
		var stepWidth = staircasePartsParams.startTreadsParams[Number(params.railingStart) + 1].stepLeft;
		if (par.railingSide == "right") stepWidth = staircasePartsParams.startTreadsParams[Number(params.railingStart) + 1].stepRight;
		parRacks.marshFirst.x -= stepWidth - par.a;
	}

	//Удлинение и перенос последней стойки последнего марша

	var dyLastRack = 0;
	if (marshPar.lastMarsh && params.platformTop == "нет") dyLastRack = calcLastRackDeltaY();
	if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt") dyLastRack = calcLastRackDeltaY();

	if (params.railingModel != "Кованые балясины" && !par.isPlatform && dyLastRack) parRacks.marshLast.len = par.rackLength + dyLastRack;

	//удлиннение и перенос последней стойки перед забегом на ко
	if (params.model == "ко" && par.key == "in" && marshPar.topTurn == "забег") {
		parRacks.marshLast.len += calcLastRackDeltaY("wnd_ko", par.marshId);
	}

	if (params.calcType == 'bolz') {
		parRacks.marshLast.len = parRacks.marshFirst.len;
		if (marshPar.topTurn == 'забег' && params.stairModel == "П-образная с забегом" && params.marshDist !== 0) {
			parRacks.marshLast.len -= marshPar.h_topWnd * 2;
		}
	}


	//Рассчитываем угол и длину марша

	var topPoint1 = newPoint_xy(parRacks.marshFirst, 0, parRacks.marshFirst.len);
	var topPoint2 = newPoint_xy(parRacks.marshLast, 0, parRacks.marshLast.len);

	parRacks.angMarsh = Math.atan(par.h / par.b);
	//if (par.topEnd == "площадка" && par.key == "out")
	//	parRacks.angMarsh = calcAngleX1(parRacks.marshFirst, parRacks.marshLast);
	if (par.stairAmt < 2 && par.key == "out") {
		parRacks.angMarsh = calcAngleX1(parRacks.marshFirst, parRacks.marshLast);
		if (parRacks.marshFirst.x == parRacks.marshLast.x && parRacks.marshFirst.y == parRacks.marshLast.y)
			parRacks.angMarsh = 0;
	}


	if (racks.length == 2) {
		parRacks.angMarsh = angle(topPoint1, topPoint2);
	}

	//заднее ограждение забега
	if (par.isRearPRailing) {
		parRacks = {};
		parRacks.marshFirst = racks[0];
		parRacks.marshLast = racks[racks.length - 1];
		parRacks.angMarsh = angle(parRacks.marshFirst, parRacks.marshLast);
	}

	if (par.isPlatform) parRacks.angMarsh = 0;
	parRacks.marshLen = distance(topPoint1, topPoint2);


	//задаем верхний угол стоек
	for (var i = 0; i < racks.length; i++) {
		if (!racks[i]) continue;
		racks[i].holderAng = parRacks.angMarsh;
		if (params.stairModel == 'Прямая с промежуточной площадкой' && par.marshId != "topPlt") racks[i].holderAng = getMarshParams(3).ang;
		if (racks[i].x < parRacks.marshFirst.x) racks[i].holderAng = parRacks.angBot;
		if (racks[i].x > parRacks.marshLast.x) racks[i].holderAng = parRacks.angTop;
	}

	if (par.botEnd == "площадка") parRacks.marshFirst.holderAng = parRacks.angBot;

	if (par.botEnd == "забег" && !par.isRearPRailing) {
		var mFirst = polar(parRacks.marshFirst, parRacks.marshFirst.holderAng, -40);
		parRacks.botFirst.holderAng = calcAngleX1(parRacks.botFirst, mFirst);
	}

	if (par.topEnd == "забег" && !par.isRearPRailing) {
		var mLast = polar(parRacks.marshLast, parRacks.marshLast.holderAng, 40);
		parRacks.topLast.holderAng = calcAngleX1(mLast, parRacks.topLast);
	}

	if (params.stairModel == "Прямая горка") {
		parRacks.angMarsh2 = -parRacks.angMarsh;
		for (var i = 0; i < racks.length; i++) {
			//задаем верхний угол и длину стоек второго марша
			if (parRacks.marsh2First && racks[i].x >= parRacks.marsh2First.x) {
				racks[i].holderAng = -parRacks.angMarsh;
				racks[i].len = par.rackLength;
			}
		}
	}

	if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt") {

		parRacks.angMarsh1 = Math.atan(params.h1 / params.b1);
		for (var i = 0; i < racks.length; i++) {
			if (!racks[i]) continue;
			//задаем верхний угол и длину стоек первого марша
			if (racks[i].x <= parRacks.botFirst.x) {
				racks[i].holderAng = parRacks.angMarsh1;
				racks[i].len = par.rackLength;
			}
		}
		parRacks.marsh1First = copyPoint(racks[0]);
		parRacks.marsh1First.len = par.rackLength;
		parRacks.marsh1First.holderAng = parRacks.angMarsh1;

		parRacks.botFirst = copyPoint(parRacks.botFirst)
		parRacks.botFirst.len = rackPlatformLength;
		parRacks.botFirst.holderAng = 0;

		//удлинняем первую стойку верхнего марша
		parRacks.marshFirst.len = rackPlatformLength;

		parRacks.angBot = 0;
		parRacks.angMarsh = Math.atan(params.h3 / params.b3);

	}

	//если все стойки находятся на площадке, делаем их одинаковой длины
	if (racks[0].y == racks[racks.length - 1].y) {
		for (var i = 0; i < racks.length; i++) {
			if (!racks[i]) continue;
			racks[i].len = rackPlatformLength;
		}
	}

	par.parRacks = parRacks;

	return par;
}

function drawMarshStringers(par, marshId) {

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
	if (par.wndFramesHoles1) stringerParams.wndFramesHoles1 = par.wndFramesHoles1;
	var useTopWnPar = false;
	if (par.treadsObj.wndPar2) {
		if (marshId == 3 && params.stairModel == "П-образная с забегом") useTopWnPar = true;
		if (marshId == 3 && params.stairModel == "П-образная трехмаршевая") useTopWnPar = true;
		if (!par.treadsObj.wndPar) useTopWnPar = true;
	}
	if (useTopWnPar) stringerParams.turnStepsParams = par.treadsObj.wndPar2;
	calcStringerParams(stringerParams);

	//позиция косоуров по Z
	var posZIn = (params.M / 2 - stringerParams.stringerSideOffset) * turnFactor;
	if (turnFactor == 1) posZIn -= params.stringerThickness;

	var posZOut = - (params.M / 2 - stringerParams.stringerSideOffset - calcStringerMoove(marshId).stringerOutMoove) * turnFactor;
	if (turnFactor == -1) posZOut -= params.stringerThickness - 0.01

	var sideIn = "right";
	var sideOut = "left";
	if (turnFactor == -1) {
		sideIn = "left";
		sideOut = "right";
	}

	//для прямой лестницы все наоборот
	if (params.stairModel == "Прямая") {
		var temp = posZIn;
		posZIn = posZOut;
		posZOut = temp;

		temp = sideIn;
		sideIn = sideOut;
		sideOut = temp;
	}



	//внутренний косоур/тетива

	if (params.calcType !== 'bolz') {
		stringerParams.key = "in";
		if (marshId == 3 && params.stairModel == "Прямая горка") stringerParams.key = "out";
		var stringer1 = drawStringer(stringerParams).mesh;
		stringer1.position.x = -stringerParams.treadFrontOverHang;
		stringer1.position.z = posZIn;
		// if (turnFactor == 1) stringer1.position.z -= params.stringerThickness;

		var midStringers = [];

		//костыль
		if (params.stairModel == "П-образная с забегом" && stringerParams.isWndP) {
			if (params.model == "лт") stringer1.position.x += 1;
			if (params.model == "ко") stringer1.position.x += 17;
		}

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
			skew1: stringerParams.skew1,
			skew2: stringerParams.skew2,
			marshAng: stringerParams.marshAng,
			side: sideIn,
		}

		// Отрисовка фланцев 
		var flans = drawStringerFlans_all(franPar);
		if (params.model == "лт") flans.position.x -= 5;
		flans.position.z = (params.M / 2 - stringerParams.stringerSideOffset - params.stringerThickness * 2)
		if (turnFactor == -1) flans.position.z -= calcStringerMoove(par.marshId).stringerOutMoove
		mesh.add(flans);


		//колонны на внутренней тетиве
		stringerParams.anglesPosZ = anglesIn.position.z;
		stringerParams.dxfBasePoint.x += 2200;
		var columnsIn = drawColumnSide(stringerParams, "in");
		mesh.add(columnsIn);

		//длинные болты

		if (drawLongBolts) {
			var boltPar = {
				diam: 10,
				len: 40,
				headType: "шестигр.",
				nutOffset: -40 + 20 + 12,
				headShim: true,
			}
			var longBoltPos = stringerParams.elmIns[stringerParams.key].longBolts;
			for (var i = 0; i < longBoltPos.length; i++) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = -Math.PI / 2 * turnFactor;
				bolt.position.x = longBoltPos[i].x;
				if (params.model == "лт") bolt.position.x -= 5;
				bolt.position.y = longBoltPos[i].y;
				bolt.position.z = anglesIn.position.z //params.stringerThickness/2;
				mesh.add(bolt);
			}
		}

	}

	//внешний косоур/тетива
	stringerParams.wndFramesHoles = par.wndFramesHoles;

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
	if (sideOut == "left") anglesOut.position.z += params.stringerThickness;
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
	if (params.model == "лт") flans.position.x -= 5;
	flans.position.z = -(params.M / 2 - stringerParams.stringerSideOffset - params.stringerThickness)
	if (turnFactor == 1) flans.position.z += calcStringerMoove(par.marshId).stringerOutMoove
	mesh.add(flans);


	par.dxfBasePoint.x += stringerParams.lenX;

	//колонны на внешней тетиве
	stringerParams.anglesPosZ = anglesOut.position.z;
	var columnsOut = drawColumnSide(stringerParams, "out");
	mesh.add(columnsOut);

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

	//перемычки
	if (params.model == "лт" && params.stairFrame == "нет" && params.calcType !== 'bolz') {
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
			bridge.position.z = -params.M / 2 + params.stringerThickness;
			//переворачиваем перемычку
			if (bridgePar.rotated) {
				bridge.rotation.y = Math.PI / 2;
				bridge.position.x -= params.stringerThickness;
				bridge.position.z = params.M / 2 - params.stringerThickness;
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

	//отрисовка больцев по внутренней стороне
	if (params.calcType == 'bolz') {
		var bolzs = drawBolzs(stringerParams).mesh;
		bolzs.position.z = calcTreadLen() / 2 * turnFactor;
		if (params.stairModel == "Прямая")
			bolzs.position.z = -calcTreadLen() / 2 * turnFactor;
		mesh.add(bolzs);

		//перемычки
		if (marshParams.botTurn == "площадка" && params.stairModel !== "П-образная с площадкой") {
			var bridgePar = {
				dxfBasePoint: par.dxfBasePoint,
				hasDoubleTreadAngles: false,
			}
			if (turnFactor == -1) bridgePar.isNotAngel1 = true;
			if (turnFactor == 1) bridgePar.isNotAngel2 = true;

			var bridge = drawBridge_2(bridgePar).mesh;
			bridge.rotation.y = -Math.PI / 2;
			bridge.position.x = 35;
			bridge.position.y = -params.treadThickness;
			bridge.position.z = -params.M / 2 + params.stringerThickness;
			if(turnFactor == -1) bridge.position.z += 55;
			angles.add(bridge);
		}
	}


	//прямые рамки и ребра лотковых ступеней

	if (hasTreadFrames() && !stringerParams.isWndP) {
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



	//рамка верхней ступени

	for (var i = 0; i < stringerParams.carcasHoles.length; i++) {
		if (stringerParams.carcasHoles[i].pos == "topFrame") {

			var framePar = {
				holeDist: distance(stringerParams.carcasHoles[i], stringerParams.carcasHoles[i + 1]),
				dxfBasePoint: par.dxfBasePoint,
			}
			var topFrame = drawTopFixFrame2(framePar).mesh;
			topFrame.position.x = stringerParams.carcasHoles[i].x - stringerParams.treadFrontOverHang;
			topFrame.position.y = stringerParams.carcasHoles[i].y;
			angles.add(topFrame)
			i++ //пропускаем следующее отверстие
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

function drawBridge_2(par) {

	/*
	dxfBasePoint
	hasDoubleTreadAngles
	noBoltsOnBridge
	*/

	par.mesh = new THREE.Object3D();


	var metalMaterial = new THREE.MeshLambertMaterial({ color: 0x068636, wireframe: false });
	if (!$sceneStruct.vl_1.realColors) metalMaterial = params.materials.metal;


	var text = 'Перемычка';
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 20, -250);
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

	var shape = new THREE.Shape();

	var thk = 8;
	var holeRad = 6.5;
	par.width = 105.0;
	par.len = params.M - 2 * thk;
	if (params.M > 1100 && params.calcType == "vhod") {
		par.len = par.len / 2 - thk / 2;
	}
	if (params.model == "ко") par.len -= params.sideOverHang * 2;
	if (params.calcType == 'bolz') par.len -= 55;
	var gap = 0.1; //зазор для тестирования

	var p0 = { x: 0, y: 0 };

	var p1 = newPoint_xy(p0, 0, 0);
	var p2 = newPoint_xy(p0, 0, -par.width);
	var p3 = newPoint_xy(p2, par.len, 0.0);
	var p4 = newPoint_xy(p1, par.len, 0.0);

	//точки с учетом зазора от тетивы
	var pt1 = newPoint_xy(p1, gap, 0);
	var pt2 = newPoint_xy(p2, gap, 0);
	var pt3 = newPoint_xy(p3, -gap, 0);
	var pt4 = newPoint_xy(p4, -gap, 0);

	addLine(shape, dxfPrimitivesArr, pt1, pt2, par.dxfBasePoint);
	addLine(shape, dxfPrimitivesArr, pt2, pt3, par.dxfBasePoint);
	addLine(shape, dxfPrimitivesArr, pt3, pt4, par.dxfBasePoint);
	addLine(shape, dxfPrimitivesArr, pt4, pt1, par.dxfBasePoint);

	var holes = [];

	// отверстия левый крепежный уголок

	var center1 = newPoint_xy(p0, 30.0, -20.0);
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	holes.push(center1, center2)

	//отверстия под правый крепежный уголок

	var center3 = newPoint_xy(center1, par.len - 60.0, 0.0);
	var center4 = newPoint_xy(center2, par.len - 60.0, 0.0);
	holes.push(center3, center4)


	// отверстия под уголки ступеней

	var anglePos = setBridgeAnglePos();
	center1 = newPoint_xy(p1, anglePos.sideHolePosX, -20);
	center2 = newPoint_xy(center1, anglePos.holeDist, 0.0);
	center3 = newPoint_xy(p4, -anglePos.sideHolePosX, -20);
	center4 = newPoint_xy(center3, -anglePos.holeDist, 0.0);

	holes.push(center1, center2, center3, center4)

	//если уголки с двух сторон, отверстия не зенкуются
	if (par.hasDoubleTreadAngles)
		center1.noZenk = center2.noZenk = center3.noZenk = center4.noZenk = true;

	//добавляем отверстия
	var holesPar = {
		holeArr: holes,
		dxfBasePoint: par.dxfBasePoint,
		shape: shape,
	}
	var noZenkHoles = addHolesToShape(holesPar).noZenkHoles;



	// перемычка

	var extrudeOptions = {
		amount: thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bridge = new THREE.Mesh(geom, metalMaterial);
	par.mesh.add(bridge);

	// уголки крепления к тетивам

	var carcasAnglePar = {
		model: "У4-60х60х100",
	}

	//левый
	if (!par.isNotAngel1) {
		//нет болтов в грани 1
		carcasAnglePar.noBoltsInSide1 = false;
		if (turnFactor == -1 && par.noBoltsOnBridge) carcasAnglePar.noBoltsInSide1 = true;
		if (par.noBoltsOnBridge2) carcasAnglePar.noBoltsInSide1 = true;
		var angle = drawAngleSupport(carcasAnglePar);
		angle.rotation.z = -Math.PI / 2;
		angle.position.z = thk;
		par.mesh.add(angle);
	}

	//правый
	if (!par.isNotAngel2) {
		//нет болтов в грани 1
		carcasAnglePar.noBoltsInSide1 = false;
		if (turnFactor == 1 && par.noBoltsOnBridge) carcasAnglePar.noBoltsInSide1 = true;
		if (par.noBoltsOnBridge1) carcasAnglePar.noBoltsInSide1 = true;
		angle = drawAngleSupport(carcasAnglePar);
		angle.rotation.z = Math.PI / 2;
		angle.position.x = par.len;
		angle.position.y = -100;
		angle.position.z = thk;
		par.mesh.add(angle);
	}

	// уголки крепления ступени
	var treadAnglePar = {
		model: anglePos.angId,
	}
	//нет болтов в грани 1
	if (par.hasDoubleTreadAngles) treadAnglePar.noBoltsInSide1 = true;


	var angle = drawAngleSupport(treadAnglePar);
	angle.rotation.x = Math.PI / 2;
	angle.position.x = anglePos.angleOffset;
	angle.position.z = thk;
	par.mesh.add(angle);

	var angle = drawAngleSupport(treadAnglePar);
	angle.rotation.x = Math.PI / 2;
	angle.position.x = par.len - anglePos.angleOffset - anglePos.angLen;
	angle.position.z = thk;
	par.mesh.add(angle);

	if (par.hasDoubleTreadAngles) {
		var angle = drawAngleSupport(treadAnglePar);
		angle.rotation.x = Math.PI / 2;
		angle.rotation.z = Math.PI;
		angle.position.x = anglePos.angleOffset + anglePos.angLen;
		par.mesh.add(angle);

		var angle = drawAngleSupport(treadAnglePar);
		angle.rotation.x = Math.PI / 2;
		angle.rotation.z = Math.PI;
		angle.position.x = par.len - anglePos.angleOffset;
		par.mesh.add(angle);

		//длинные болты

		if (drawLongBolts) {
			var boltPar = {
				diam: 10,
				len: 30,
				headType: "шестигр.",
			}
			for (var i = 0; i < noZenkHoles.length; i++) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = noZenkHoles[i].x;
				bolt.position.y = noZenkHoles[i].y;
				bolt.position.z = thk / 2;
				par.mesh.add(bolt);
			}
		}
	}

	//сохраняем данные для спецификации
	var partName = "bridge";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Перемычка",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
			}
		}
		var name = par.len + "x" + par.width;
		var area = par.len * par.width / 1000000;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}
	par.mesh.specId = partName + name;

	bridge.specId = partName + name;

	return par;

} //end of drawBridge_2


function drawRailingSectionNewel2(par) {

	var section = new THREE.Object3D();
	var handrails = new THREE.Object3D();

	var marshPar = getMarshParams(par.marshId);
	var rackLength = 950;
	par.rackLength = rackLength;
	var rackProfile = 40;
	par.rackProfile = rackProfile;
	var railingPositionZ = 0;
	if (turnFactor === -1) railingPositionZ = -40;
	var turnRacksParams = setTurnRacksParams(par.marshId, par.key);//параметры поворотной стойки
	if (params.calcType === 'bolz' && par.key === "in") {
		railingPositionZ = 0;
		if (turnFactor === -1) railingPositionZ = -40;
	}

	if (params.calcType === 'lt-ko' || params.calcType === 'vhod' || params.calcType === 'bolz') {
		//адаптация к единой функции drawMarshRailing

		par.racks = [];

		if (par.stringerParams && par.stringerParams[par.marshId].elmIns[par.key]) par.racks = par.stringerParams[par.marshId].elmIns[par.key].racks
		//объединяем массивы первого и третьего марша
		if ((params.stairModel == "Прямая с промежуточной площадкой" || params.stairModel == 'Прямая горка') && par.marshId !== 'topPlt') {
			par.racks = [];
			// par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
			par.racks.push.apply(par.racks, par.stringerParams[1].elmIns[par.key].racks);
			//пересчитываем координаты стоек второго марша с учетом позиции марша
			for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
				var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
				point.x += par.stringerParams[3].treadsObj.unitsPos.marsh3.x;
				point.y += par.stringerParams[3].treadsObj.unitsPos.marsh3.y;
				par.racks.push(point)
			}
		}
		if (params.stairModel == 'Прямая горка' && par.marshId !== 'topPlt') {
			par.racks = [];
			// par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
			par.racks.push.apply(par.racks, par.stringerParams[1].elmIns[par.key].racks);
			//пересчитываем координаты стоек второго марша с учетом позиции марша
			for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
				var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
				point.x = par.stringerParams[3].treadsObj.unitsPos.marsh3.x - point.x;
				point.y = par.stringerParams[3].treadsObj.unitsPos.marsh3.y + point.y;
				par.racks.push(point)
			}
		}
		if (params.calcType === 'bolz' && par.key === "in") {
			par.racks = [];
			calcRacksBolzs(par);
		}
		//рассчитываем необходимые параметры и добавляем в объект par
		setRailingParams(par) //функция в файле calcRailingParams.js
		if (par.racks.length == 0) return { mesh: section };

		//задаем параметры
		{
			if (par.key == "front") par.railingSide = "left";
			var railingSide = par.railingSide;
			if (!par.railingSide && params.model == "ко" && par.marshId == 'topPlt') railingSide = "right";
			var dxfBasePoint = par.dxfBasePoint;
			var racks = par.racks;
			var model = params.model;

			//параметры марша
			var marshPar = getMarshParams(par.marshId);
			var prevMarshPar = getMarshParams(marshPar.prevMarshId);

			par.a = marshPar.a;
			par.b = marshPar.b;
			par.h = marshPar.h;
			par.stairAmt = marshPar.stairAmt;
			par.lastMarsh = marshPar.lastMarsh;

			//задаем длину стоек
			var rackLength = 950;
			par.rackLength = rackLength;
			var rackProfile = 40;

			var dxfText = {
				side: railingSide === "left" ? " - наружный" : " - внутренний",
				marsh: " нижнего марша "
			}
		}


		/*Стойки*/

		//выделяем из массива racks первые и последние стойки поворотов и марша, рассчтываем длины и углы
		var parRacks = setRacksParams(par).parRacks; //функция в metal/drawRailing.js

		for (var i = 0; i < racks.length; i++) {
			if (!racks[i]) continue;
			var rackParams = {
				len: racks[i].len,
				railingSide: railingSide,
				stringerSideOffset: params.sideOverHang,
				showPins: true,
				showHoles: true,
				isBotFlan: false,
				material: params.materials.metal_railing,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, racks[i].x, racks[i].y),
				dxfArr: dxfPrimitivesArr,
				realHolder: true, //точно отрисовываем кронштейн поручня
				holderAng: racks[i].holderAng,
				sectText: par.text,
				marshId: par.marshId,
				key: par.key,
			}
			if (params.rackBottom == "сверху с крышкой") {
				rackParams.showPins = false;
				rackParams.showHoles = false;
				rackParams.isBotFlan = true;
			}
			if (params.calcType === 'bolz' && par.key === "in") {
				rackParams.showPins = false;
				rackParams.showHoles = false;
				rackParams.isBotFlan = false;
				rackParams.isBolz = true;
			}
			if (params.banisterMaterial != "40х40 черн.") rackParams.material = params.materials.inox;

			if (!racks[i].noDraw) {
				//если поворотная стойка
				if (racks[i].isTurnRack) {
					rackParams.isTurnRack = racks[i].isTurnRack;
					//rackParams.holeYTurnRack - расстояние по Y для дополнительного отверстия крепления на поворотной стойке
					rackParams.holeYTurnRack = turnRacksParams.shiftYtoP0 + 20 + params.treadThickness / 2 + 60; // 20 - отступ до первого отверстия, 60 - расстояние между отверстиями
					if (marshPar.botTurn == "забег") rackParams.holeYTurnRack -= 4;
					if (params.model == "ко") {
						if (marshPar.botTurn == "забег") rackParams.holeYTurnRack -= marshPar.h - 4;
					}
				}
				rackParams = drawRack3d_4(rackParams);
				var rack = rackParams.mesh;
				rack.position.x = racks[i].x;
				rack.position.y = racks[i].y;
				rack.position.z = railingPositionZ;
				section.add(rack);
			}
		} //конец стоек
	}

	if (params.calcType === 'mono') {
		var racks_mesh = drawRacksMono(par);
		section.add(racks_mesh.mesh);
		var parRacks = par.parRacks;
		var racks = par.racks;
	}

	/* ригели */

	if (params.railingModel === "Ригели") {

		//Задаем позицию ригелей по Z
		var rigelPosZ = 0
		var rigelProfZ = 20;
		if (params.rigelMaterial == "Ф12 нерж.") rigelProfZ = 12;
		if (par.railingSide == "left") rigelPosZ = (railingPositionZ + rackProfile) * turnFactor + 0.01;
		if (par.railingSide == "right") rigelPosZ = (railingPositionZ - rigelProfZ - 0.01);
		if (par.marshId == "topPlt") {
			rigelPosZ = -rigelProfZ - 0.01;
			if (turnFactor == -1) rigelPosZ -= rackProfile - 0.01;
		}
		if (par.marshId == "topPlt" && par.key == "front") {
			rigelPosZ = rackProfile * (1 + turnFactor) * 0.5;
		}
		if (par.rigelMoveZ) rigelPosZ += par.rigelMoveZ;
		if (params.stairModel == 'П-образная с площадкой' && par.marshId == 2) rigelPosZ -= rigelProfZ;
		if (params.stairModel == 'П-образная с площадкой' && par.marshId == 2 && params.turnSide == 'левое') rigelPosZ -= rackProfile;
		//шаг ригелей по вертикали
		var rigelAmt = Number(params.rigelAmt);
		//устраняем пересечение нижнего ригеля и нижней забежной ступени на монокосоарах
		var rigelMooveY = 0;
		if (params.calcType === 'mono') {
			if (rigelAmt == 2) rigelMooveY = -40;
			if (rigelAmt == 3) rigelMooveY = 50;
			if (rigelAmt == 4) rigelMooveY = -120;
		};
		if (params.calcType === 'lt-ko' || params.calcType === 'vhod') rigelMooveY = par.b / 2 * Math.tan(parRacks.angMarsh);
		if (isNaN(rigelMooveY)) rigelMooveY = 0;
		var rigelDist = (rackLength - 50 - rigelMooveY) / (rigelAmt + 1);


		//формируем массив базовых точек для ригелей
		if (params.calcType === 'lt-ko' || params.calcType === 'vhod' || params.calcType === 'bolz') {
			var rigelBasePoints = [];

			if (parRacks.marsh1First) rigelBasePoints.push(copyPoint(parRacks.marsh1First));
			if (parRacks.botFirst) rigelBasePoints.push(copyPoint(parRacks.botFirst));
			if (parRacks.marshFirst) {
				rigelBasePoints.push(copyPoint(parRacks.marshFirst));
				if (params.model == "лт" && params.rackBottom !== "сверху с крышкой" && params.calcType !== 'bolz') rigelBasePoints[rigelBasePoints.length - 1].y += turnRacksParams.rackLenAdd - turnRacksParams.shiftYforShiftX;
			}

			if (parRacks.marshLast) {
				rigelBasePoints.push(copyPoint(parRacks.marshLast));
				//if (params.model == "ко" && par.lastMarsh && params.platformTop == "нет") {
				//	rigelBasePoints[rigelBasePoints.length - 1].y += calcLastRackDeltaY();
				//	rigelBasePoints[rigelBasePoints.length - 1].ang = parRacks.angMarsh;
				//}
				if (par.lastMarsh && params.platformTop == "нет" && params.calcType !== 'bolz') {
					rigelBasePoints[rigelBasePoints.length - 1].y += calcLastRackDeltaY();
					rigelBasePoints[rigelBasePoints.length - 1].ang = parRacks.angMarsh;
				}
				if (params.calcType == 'bolz') {
					if (marshPar.topTurn == 'забег' && params.stairModel == "П-образная с забегом" && params.marshDist !== 0) {
						rigelBasePoints[rigelBasePoints.length - 1].y -= marshPar.h_topWnd * 2;
						rigelBasePoints[rigelBasePoints.length - 1].ang = parRacks.angMarsh;
					}
				}
				if (params.model == "ко" && parRacks.marshLast.len != parRacks.marshFirst.len) {
					rigelBasePoints[rigelBasePoints.length - 1].y += parRacks.marshLast.len - parRacks.marshFirst.len;
				}
				//если на следующем марше поворотная стойка сохраняем сдвиг отверстия до края следующего марша
				if (parRacks.marshLast.noDraw && parRacks.marshLast.dxToMarshNext) {
					rigelBasePoints[rigelBasePoints.length - 1].dxToMarshNext = parRacks.marshLast.dxToMarshNext;
					rigelBasePoints[rigelBasePoints.length - 1].ang = parRacks.angMarsh;
				}
			}
			if (parRacks.topLast) rigelBasePoints.push(copyPoint(parRacks.topLast));
			if (parRacks.marsh2Last) rigelBasePoints.push(copyPoint(parRacks.marsh2Last));

			if (params.calcType === 'vhod' && params.staircaseType == "Готовая" && par.key == 'rear') {
				rigelBasePoints[0].x -= 100;
				rigelBasePoints[rigelBasePoints.length - 1].x += 100;
			}
		}
		if (params.calcType === 'mono') {
			var rigelBasePoints = calcRigelPoints(par, parRacks);
		}

		var side = "out";
		if (railingSide === "right") side = "in";
		var rigelPar = {
			points: rigelBasePoints,
			botEnd: par.botEnd,
			dxfBasePoint: copyPoint(par.dxfBasePoint),
			sectText: par.text,
			topConnection: par.topConnection,
			racks: par.racks
		}

		if (params.model == "ко" && params.rackBottom !== "сверху с крышкой") rigelMooveY += turnRacksParams.rackLenAdd;

		for (var i = 0; i < rigelAmt; i++) {
			rigelPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, rigelDist * (i + 1) + rigelMooveY);
			var rigel = drawPolylineRigel(rigelPar).mesh;
			rigel.position.y = rigelDist * (i + 1) + rigelMooveY;
			rigel.position.z = rigelPosZ;
			section.add(rigel);
		}

	} //конец ригелей

	/* стекло на стойках */
	if (params.railingModel == "Стекло на стойках" || params.railingModel == "Экраны лазер") {

		var glassDist = rackProfile / 2 + 22;
		var glassHeight = 800;

		glassParams = {
			p1: 0,
			p2: 0,
			angle: parRacks.angMarsh,
			glassDist: glassDist,
			glassHeight: glassHeight,
			glassMaterial: params.materials.glass,
			glassHolderMaterial: params.materials.inox,
			dxfBasePoint: par.dxfBasePoint,
		}
		if (params.railingModel == "Экраны лазер") glassParams.glassMaterial = params.materials.metal;

		//номинальная длина стойки
		var nominalLen = rackLength;
		if (params.calcType === 'mono') nominalLen = 800;
		var pltDeltaY = 0;//Нужна для корректировки положения стоек на площадках

		for (var i = 0; i < racks.length - 1; i++) {
			//выравниваем стекло на площадке
			if (par.topTurn == "площадка" && par.key == "out" && Math.abs(racks[i].y - racks[i + 1].y) < 0.01 && i > 1) {
				// 20 зазор стекла от площадки
				if (racks[i].y - racks[i - 1].y > 0.01) pltDeltaY = -20 + par.rackProfile + params.flanThickness + params.treadThickness + glassDist;
			}
			//выравниваем стекло на площадке
			if (par.botTurn == "площадка" && par.key == "out" && racks[i].y - racks[i + 1].y < 0.01) {
				pltDeltaY = -20 + par.rackProfile + params.flanThickness + params.treadThickness + glassDist;
			}

			glassParams.p1 = copyPoint(racks[i]);
			glassParams.p2 = copyPoint(racks[i + 1]);
			//если на следующем марше поворотная стойка сдвигаем стойку до края следующего марша
			if (parRacks.marshLast.noDraw && racks[i + 1].dxToMarshNext) {
				glassParams.p2.x += racks[i + 1].dxToMarshNext - rackProfile / 2;
				glassParams.isHandrailAngle = parRacks.angMarsh;
			}
			glassParams.p1.y += racks[i].len - nominalLen + 80 - pltDeltaY;
			glassParams.p2.y += racks[i + 1].len - nominalLen + 80 - pltDeltaY;
			if (Math.abs(racks[i].y - racks[i + 1].y) < 0.01) glassParams.p1.y = glassParams.p2.y;
			if (par.botTurn == "площадка" && par.key == "out" && i == 0) glassParams.p2.y = glassParams.p1.y;

			glassParams.glassHeight = rackLength - 170;
			//уменьшаем высоту стекла чтобы оно не касалось ступеней
			if (params.rackBottom == "сверху с крышкой" && (glassParams.p1.y !== glassParams.p2.y)) {
				var dy = par.h - (par.b / 2 - (par.a - par.b) - glassDist) * Math.tan(parRacks.angMarsh);
				glassParams.glassHeight = rackLength - dy - 100;
				glassParams.p1.y += dy - 70;
				glassParams.p2.y += dy - 70;
			}

			if (params.calcType === 'mono') {
				glassParams.glassHeight = 700;
			}

			var glassParams = drawGlassNewell(glassParams);
			var glass = glassParams.mesh;

			glass.position.z = railingPositionZ + 16;
			glass.castShadow = true;
			section.add(glass);

			//сохраняем данные для спецификации
			staircasePartsParams.glassAmt += 1;
		}
	} //конец стекол на стойках

	/* Поручни */

	if (params.handrail != "нет") {
		if (params.stairModel == "Прямая с промежуточной площадкой") par.topConnection = false;

		var handrailPoints = calcHandrailPoints(par, parRacks);

		var side = "out";
		if (par.railingSide === "right") side = "in";

		handrailParams = {
			points: handrailPoints,
			side: side,
			offset: 0,
			extraLengthStart: 0,
			extraLengthEnd: 0,
			connection: params.handrailConnectionType,
			dxfBasePoint: par.dxfBasePoint,
			fixType: "нет",
			topConnection: par.topConnection,
			sectText: par.text,
			marshId: par.marshId,
			key: par.key,
			topPoint: parRacks.marshLast,
		}

		//удлиннение поручня последнего марша
		if (params.stairModel == "Прямая" || par.marshId == 3) {
			handrailParams.extraLengthEnd += params.topHandrailExtraLength;
		}
		if (params.calcType === 'vhod' && params.staircaseType == "Готовая" && par.key == 'rear') {
			handrailParams.extraLengthStart += 90;
			handrailParams.extraLengthEnd += 90;
		}
		handrailParams = drawPolylineHandrail(handrailParams);

		var handrail = handrailParams.mesh;
		var posZ = -handrailParams.wallOffset + rackProfile / 2 * turnFactor;
		if (side == "in") posZ = handrailParams.wallOffset + rackProfile / 2 * turnFactor;

		handrail.position.z = posZ;
		handrails.add(handrail);
	} //конец поручней


	//сохраняем данные для спецификации
	var handrailPoints = calcHandrailPoints(par, parRacks);
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

	if (params.model == 'лт' && params.calcType !== 'bolz') {
		section.position.x = -5;
	}

	par.isRearPRailing = null; // Очищаем, вызывает ошибки в других маршах

	var result = {
		mesh: section,
		handrails: handrails,
	}
	return result;

} //end of drawRailingSectionNewel

function drawCarcas(par) {

	par.mesh = new THREE.Object3D();
	par.angles = new THREE.Object3D();
	var dxfX0 = par.dxfBasePoint.x;

	par.stringerParams = [];

	// Каркас нижнего марша

	par.stringerParams[1] = drawMarshStringers(par, 1);
	par.mesh.add(par.stringerParams[1].mesh);
	par.angles.add(par.stringerParams[1].angles);

	// Каркас второго марша

	if (params.stairModel == "П-образная трехмаршевая") {

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

	if (params.stairModel == "П-образная с забегом") {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		par.stringerParams[2] = drawMarshStringers(par, 2);

		var stringers2 = par.stringerParams[2].mesh;

		stringers2.position.x += par.treadsObj.unitsPos.turn2.x;
		stringers2.position.y += par.treadsObj.unitsPos.turn2.y;
		stringers2.position.z += par.treadsObj.unitsPos.turn2.z;
		stringers2.rotation.y = par.treadsObj.unitsPos.turn2.rot;
		//костыль
		if (params.model == "лт") stringers2.position.z -= (params.marshDist - 35) * turnFactor;
		if (params.model == "ко") stringers2.position.z -= (params.M + params.marshDist - 35 - params.stringerThickness) * turnFactor;
		//if (params.calcType == "bolz") stringers2.position.z += (42) * turnFactor;
		par.mesh.add(stringers2)

		var angles2 = par.stringerParams[2].angles
		angles2.position.x = stringers2.position.x;
		angles2.position.y = stringers2.position.y;
		angles2.position.z = stringers2.position.z;
		angles2.rotation.y = stringers2.rotation.y;
		par.angles.add(angles2);
	}

	if (params.stairModel == "П-образная с площадкой") {
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
	if (params.stairModel != "Прямая") {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;
		//if (params.stairModel == "П-образная с забегом") {
		//	par.wndFramesHoles = par.wndFramesHoles1;
		//}
		//if (par.wndFramesHoles1) {
		//	par.wndFramesHoles = par.wndFramesHoles1;
		//}

		par.stringerParams[3] = drawMarshStringers(par, 3);

		var stringers3 = par.stringerParams[3].mesh;
		stringers3.position.x = par.treadsObj.unitsPos.marsh3.x;
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
	if (params.topFlan == "есть") {
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

function drawBotStepLt_wndOut(par) {

	var p0 = newPoint_xy(par.zeroPoint, 0, -(par.h_prev + par.h));

	var turnParams = calcTurnParams(par.marshId);

	//константы

	var angelLenght = 20 + par.holeDistU4 + 20;	// длина уголка
	var angleClearance = 5;							// зазор между уголками
	var wndBottomAngle = 15 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью


	var backLineLength = par.stringerLedge + params.treadThickness + par.profileHeight + angleClearance * 3 + angelLenght * 2;		// длинна задней вертикальной линии тетивы


	/*ТОЧКИ КОНТУРА*/

	//точка в углу второй забежной ступени
	var p4 = newPoint_xy(p0, 0, par.h + par.h_prev + par.stringerLedge);
	if (par.isWndP) {
		p4.x += params.marshDist + turnParams.topMarshOffsetZ - 40;
		if (params.calcType == 'bolz') p4.x += 42 + 36;
	} //-40 - непонятный костыль

	var p3 = newPoint_xy(p4, -par.wndSteps[3].out.topMarsh, 0)
	if (par.isWndP) {
		p3.x -= (params.marshDist - 44) + params.stringerThickness;
		if (params.calcType == 'bolz') p3.x -= 36;
	} //44 подогнано
	if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && params.stairAmt2 == 0) {
		if (par.topEnd !== "winder") p3.x -= params.marshDist + turnParams.topMarshOffsetZ;
		if (par.topEnd == "winder") p3.x -= params.marshDist - turnParams.topMarshOffsetZ - turnParams.topMarshOffsetX;
	}
	var p2 = newPoint_xy(p3, 0, -par.h);
	var p1 = newPoint_xy(p2, -par.wndSteps[2].out.topMarsh, -0); //верхний левый угол
	var p5 = newPoint_xy(p4, 0, par.h);

	//нижняя линия
	var botLineP1 = newPoint_xy(p1, 0, -backLineLength); //нижний левый угол



	var botLinePoints = [];

	if (params.stringerType == "ломаная") {
		var botLineP3 = newPoint_xy(p1, par.stringerWidth, - par.stringerWidth);
		var botLineP2 = { x: botLineP3.x, y: botLineP1.y }
		var botLineP4 = newPoint_xy(p2, par.stringerWidth, - par.stringerWidth);
		var botLineP5 = newPoint_xy(p3, par.stringerWidth, - par.stringerWidth);
		var botLineP6 = newPoint_xy(p4, par.stringerWidth, - par.stringerWidth);
		var botLineP7 = newPoint_xy(botLineP6, 0, par.h);
		var botLineP8 = newPoint_xy(botLineP7, par.b, 0);
		var botLineP9 = newPoint_xy(botLineP8, 0, par.h);

		if ((par.marshPar.prevMarshId == 1 && params.inStringerElongationTurn1 == 'да') ||
			(par.marshPar.prevMarshId == 2 && params.inStringerElongationTurn2 == 'да')) {
			botLineP5.y = botLineP6.y -= 10;
		}

		if (par.stairAmt > 0) {
			if (!(par.stairAmt == 1 && par.topEnd == "platformG"))
				botLinePoints.push(botLineP9, botLineP8);
		}
		if (!(par.stairAmt == 0 && par.topEnd == "platformG")) botLinePoints.push(botLineP7, botLineP6);
		botLinePoints.push(botLineP5, botLineP4, botLineP3, botLineP2);
	}

	if (params.stringerType != "ломаная") {
		var botLineP2 = newPoint_xy(botLineP1, 0.15 * params.M, 0.0);// 0.15*params.M - длина нижней горизотральной линии тетивы
		//вспомогательные точки на нижней линии марша
		var p20 = newPoint_xy(p4, (par.stringerWidth / Math.sin(par.marshAng)), 0) // первая точка на нижней линии марша
		if (params.stringerType == "прямая") p20.x = par.b;
		var p21 = polar(p20, par.marshAng, 100.0); // вторая точка на нижней линии
		//вспомогательная точка на нижней линии под забегом. Угол этой линии marshAng / 2
		var p22 = polar(botLineP2, par.marshAng / 2, 100.0)

		var botLineP3 = itercection(botLineP2, p22, p20, p21); //если меньше 2 ступеней нижняя линия без перелома

		if (par.stairAmt > 0) botLinePoints.push(botLineP3);
		botLinePoints.push(botLineP2);
	}

	//сохраняем точки для отладки
	par.keyPoints[par.key].botEnd = copyPoint(p1);

	//корректируем форму для прямой тетивы
	if (params.stringerType == "прямая") {
		p1.y += 100;
	}

	//сохраняем точки контура

	p1.filletRad = botLineP1.filletRad = 0;
	par.pointsShape.push(...botLinePoints);
	par.pointsShape.push(botLineP1);
	par.pointsShape.push(p1);
	if (params.stringerType !== "прямая") {
		par.pointsShape.push(p2);
		par.pointsShape.push(p3);
		par.pointsShape.push(p4);
		if (par.stairAmt > 0) par.pointsShape.push(p5);
	}
	if (params.stringerType == "прямая") {
		if (par.stairAmt == 0) {
			if (!par.isWndP) par.pointsShape.push(p3);
			par.pointsShape.push(p4);
		}
		if (par.stairAmt > 0) par.pointsShape.push(p5);
	}

	if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 0 && par.topEnd == "winder")
		par.pointsShape.push(p5);


	//параметры для самонесущего стекла
	par.wndParams[par.key].turnCutBot = distance(botLineP1, botLineP2);



	//сохраняем точку для расчета длины
	par.keyPoints.botPoint = copyPoint(botLineP1);

	/*ОТВЕРСТИЯ*/
	var pointsAngles = []; //точки контуров уголков на тетиве {p1: точка левого нижнего угла, p2: точка правого верхнего угла, orientationVert: true - вертикальное расположение уголка}

	// отверстия под нижние крепежные уголки
	// первый уголок
	center1 = newPoint_xy(botLineP1, 30 + params.stringerThickness, 25.0);
	center2 = newPoint_xy(center1, 0.0, par.holeDistU4);
	center1.hasAngle = center2.hasAngle = true;
	center1.rotated = center2.rotated = true;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// второй уголок
	center1 = newPoint_xy(center2, 0.0, 45.0);
	center2 = newPoint_xy(center1, 0.0, par.holeDistU4);
	center1.hasAngle = center2.hasAngle = true;
	center1.rotated = center2.rotated = true;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	//уголок на продлении внутреннего косоура предыдущего марша

	if (par.longStringerTop) {
		//позиция уголка относительно угла косоура
		var anglePos = {
			x: params.M - params.stringerThickness,
			y: par.h - params.treadThickness - 40 - 5,
		}
		if (params.stringerType == "прямая") anglePos.y -= 100;
		var center1 = newPoint_xy(p1, anglePos.x - 30, anglePos.y - 25);
		var center2 = newPoint_xy(center1, 0, -60);
		center1.hasAngle = center2.hasAngle = false;
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
		pointsAngles.push({ p1: newPoint_xy(center2, -50, -40), p2: newPoint_xy(center1, 50, 40), orientationVert: true })
	}

	if (hasTreadFrames()) {
		// отверстия под вторую забежную рамку
		var holePar = {
			holes: par.wndFramesHoles.topMarsh.out[2],
			basePoint: newPoint_xy(p1, params.stringerThickness, -(par.stringerLedge + params.treadThickness)),
		}
		if (params.stringerType == "прямая") holePar.basePoint.y -= 100;
		par.pointsHole.push(...calcWndHoles(holePar));

		// отверстия под третью забежную рамку
		//расстояние от края тетивы до переднего угла фланца на внутренней стороне (на внешней оно такое же) http://6692035.ru/drawings/wndFramesHoles/3-4.jpg
		var offsetX = calcWndFrame3Offset(par);
		var turnParams = calcTurnParams(par.marshParams.prevMarshId);

		var holePar = {
			holes: par.wndFramesHoles.topMarsh.out[3],
			basePoint: newPoint_xy(p4, offsetX, -(par.stringerLedge + params.treadThickness)),
		}
		if (par.wndFramesHoles1 && par.marshId == 3) holePar.holes = par.wndFramesHoles1.topMarsh.out[3];
		if (par.stringerLast && par.stairAmt == 0) {
			//holePar.holes[1].x += (params.lastWinderTreadWidth - 86);
			//if (params.stairType == "рифленая сталь" || params.stairType == "лотки")
			//	holePar.holes[1].x -= 14;
		}
		if (par.isWndP) holePar.basePoint.x += -params.marshDist + turnParams.topMarshOffsetX + par.stringerLedge;;
		par.pointsHole.push(...calcWndHoles(holePar));
	}

	if (!hasTreadFrames()) {

		// отверстия под уголки забежных ступеней
		var angPar = calcWndParams(); //функция в файле drawCarcas.js
		var angleHoleY = -params.treadThickness - 25;

		// вторая забежная ступень
		center1 = newPoint_xy(p2, 20, angleHoleY);
		center2 = newPoint_xy(center1, -angPar.angleHoleDist, 0);
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
		pointsAngles.push({ p1: newPoint_xy(center2, -55, -40), p2: newPoint_xy(center1, 55, 40), orientationVert: false })

		// третья забежная ступень
		// первый уголок

		center1 = newPoint_xy(p3, 60, angleHoleY);
		center2 = newPoint_xy(center1, angPar.angleHoleDist, 0);
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);
		pointsAngles.push({ p1: newPoint_xy(center1, -55, -40), p2: newPoint_xy(center2, 55, 40), orientationVert: false })

		// второй уголок
		center1 = newPoint_xy(p4, 20, angleHoleY);
		if (params.M < 600) center1 = newPoint_xy(p4, 60, angleHoleY);
		center2 = newPoint_xy(center1, -angPar.angleHoleDist, 0);
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
		pointsAngles.push({ p1: newPoint_xy(center2, -55, -40), p2: newPoint_xy(center1, 55, 40), orientationVert: false })
		/*
		// отверстия под перемычку
		if (par.stairAmt > 0 && !(par.stairAmt == 1 && params.stairModel == "П-образная трехмаршевая")) {
			center1 = newPoint_xy(p4, par.b - 5.0 - 6.0 - 60.0 + 38.0, par.stepHoleY);
			if (par.b < 190) center1.x += 190 - par.b;
			if (par.stairAmt == 1) center1.x -= 50;
			center2 = newPoint_xy(center1, 0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false; //уголки перемычки отрисовываются внутри drawBridge_2
			par.elmIns[par.key].bridges.push(newPoint_xy(center1, -38, 20));
			var center4 = newPoint_xy(p4, 45.0, par.stepHoleY);
			var center3 = newPoint_xy(center4, 50.0, 0.0);
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			par.pointsHole.push(center4);
			par.pointsHole.push(center3);
		}
		*/
	}


	//Отверстия под ограждения
	if (par.hasRailing) {

		if (params.railingModel != "Самонесущее стекло") {
			// отверстия под стойку ближе к углу лестницы
			center1 = newPoint_xy(par.keyPoints[par.key].botEnd, 80, par.rackTopHoleY);
			par.railingHoles.push(center1);

			// отверстия под стойку ближе к маршу

			//заднее ограждение забега П-образной
			if (par.stairAmt == 0 && par.topEnd == "winder") {
				var deltaX = params.M * 2 + params.marshDist - 80 * 2;
				var deltaY = par.h * 3;
				var handrailAngle = Math.atan(deltaY / deltaX);
				center1 = newPoint_y(center1, par.h, handrailAngle)
				par.railingHoles.push(center1);
			}
			else {
				center1 = newPoint_xy(p5, par.b * 0.5, par.rackTopHoleY);
				//смещаем точку ближе к низу марша
				center1 = newPoint_x(center1, -par.b * 0.5 + 50, -par.marshAng)
				if (par.stairAmt > 1) par.railingHoles.push(center1);
				if (par.stairAmt == 1 && params.stairModel == "П-образная трехмаршевая" && par.marshId == 2) par.railingHoles.push(center1);
			}
		}

		if (params.railingModel == "Самонесущее стекло") {
			// отверстия под стойку 1
			center1 = newPoint_xy(botLineP1, 80, par.h);
			center2 = newPoint_xy(center1, 0.0, -100.0);
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);

			// отверстия под стойку 2
			if (par.stairAmt < 10) {
				// var holeXDim = par.stringerWidth / Math.cos(par.marshAng);
				// center1 = newPoint_xy(p2, -holeXDim / Math.tan(par.marshAng), -holeXDim + 80);
				center1 = newPoint_xy(botLineP1, params.M - 215, par.h * 2);
			}
			else {
				var holeXDim = 80 / Math.cos(par.marshAng);
				center1 = newPoint_xy(p2, -holeXDim / Math.tan(par.marshAng), -holeXDim);
			}
			if (par.text == "забежный") {
				center1 = newPoint_xy(pCentralHoles, -120, -110);
			}
			// center1.x = -263.523138347365;
			// center1.y = -297.43909577894496;
			center2 = newPoint_xy(center1, 0.0, -100.0);
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);

			// отверстия под стойку 3 (на ступени)
			center1 = newPoint_xy(p4, par.b * 0.5, par.h / 2 - 40);//FIX
			center2 = newPoint_xy(center1, 0.0, -100.0);
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);
		}
	}

	//крепление к стенам
	if (par.marshParams.wallFix.out) {
		var fixPar = getFixPart(par.marshId);
		//отверстие ближе к маршу
		center1 = newPoint_xy(p4, -150, -150);
		if (params.stringerType == "ломаная") center1.y += 50;
		center1 = calculateOffsetHole(center1, pointsAngles);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.noZenk = true;
		center1.noBolts = true;
		center1.wallFix = true;
		par.pointsHole.push(center1);

		//отверстие ближе к углу
		center1 = newPoint_xy(p1, 200, -150);
		center1 = calculateOffsetHole(center1, pointsAngles);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.noZenk = true;
		center1.noBolts = true;
		center1.wallFix = true;
		par.pointsHole.push(center1);
	}


	//базовые точки для стыковки с другими частями косоура
	//http://6692035.ru/dev/mayorov/metal/imageLt/drawBotStepLt_wndOut_Lom.jpg - для ломанной
	//http://6692035.ru/dev/mayorov/metal/imageLt/drawBotStepLt_wndOut_Pil.jpg - для пилообразной
	//http://6692035.ru/dev/mayorov/metal/imageLt/drawBotStepLt_wndOut_Straight.jpg - для прямой

	par.botUnitEnd = par.pointsShape[par.pointsShape.length - 1];
	par.botUnitStart = par.pointsShape[0];
	par.midUnitEnd = par.botUnitEnd;

	//сохраняем координаты нижнего левого угла тетивы для самонесущего стекла
	par.keyPoints[par.key].botLineP0 = newPoint_xy(botLineP1, params.stringerThickness, 0);

}//end of drawBotStepLt_wndOut



function setModelDimensions(par) {

	if (!par) par = {};
	var deltaBottom = 0;
	var deltaTop = 0;
	var topStepDelta = 0;
	if (par.turnType == "G_turn") {
		/*обозначение параметров здесь
		6692035.ru/drawings/turnSize/lt/turnSize_G.pdf
		6692035.ru/drawings/turnSize/ko/turnSize_G.pdf
		6692035.ru/drawings/turnSize/mk/turnSize_.pdf
		*/
		//поправка для первой ступени марша после поворота
		//учитывается при расчете проступи верхнего марша
		if (par.model == "лт" && par.turnTypeName == "площадка") deltaBottom = -35;
		if (par.model == "лт" && par.turnTypeName == "забег") deltaBottom = 5;
		if (par.model == "ко" && par.turnTypeName == "площадка") deltaBottom = -params.nose;
		if (par.model == "ко" && par.turnTypeName == "забег") deltaBottom = 72 - params.nose;
		if (par.model == "mono" && par.turnTypeName == "площадка") deltaBottom = -params.nose;
		if (par.model == "mono" && par.turnTypeName == "забег") deltaBottom = -5;
		if (par.model == "timber") {
			if (params.model == "тетивы" && par.turnTypeName == "площадка") deltaBottom = -50;
			if (params.model == "тетивы" && par.turnTypeName == "забег") deltaBottom = -25; //было -30
			if (params.model == "косоуры" && par.turnTypeName == "площадка") deltaBottom = -50;
			if (params.model == "косоуры" && par.turnTypeName == "забег") deltaBottom = -50;
			if (params.model == "тетива+косоур" && par.turnTypeName == "площадка") deltaBottom = -50;
			if (params.model == "тетива+косоур" && par.turnTypeName == "забег") deltaBottom = -50;
		}
		if (par.model == "timber_stock") {
			if (par.turnTypeName == "площадка") deltaBottom = -params.nose;
			if (par.turnTypeName == "забег") deltaBottom = -params.nose; //было -30
		}
		if (par.model == "bolz") {
			if (par.turnTypeName == "площадка") deltaBottom = -params.nose - 13; //13 - подогнано
			if (par.turnTypeName == "забег") deltaBottom = -params.nose - 13; //было -30
		}

		//поправка для первой ступени марша перед поворотом
		//Учитывается при расчете длины проекции нижнего марша
		if (par.model == "лт" && par.turnTypeName == "площадка") deltaTop = 30;
		if (par.model == "лт" && par.turnTypeName == "забег") deltaTop = 31;
		if (par.model == "ко" && par.turnTypeName == "площадка") deltaTop = 25;
		if (par.model == "ко" && par.turnTypeName == "забег") deltaTop = 25;
		if (par.model == "mono" && par.turnTypeName == "площадка") deltaTop = 45;
		if (par.model == "mono" && par.turnTypeName == "забег") deltaTop = 45;
		if (par.model == "timber") {
			if (params.model == "тетивы" && par.turnTypeName == "площадка") deltaTop = -10;
			if (params.model == "тетивы" && par.turnTypeName == "забег") deltaTop = 10; //было -10
			if (params.model == "косоуры" && par.turnTypeName == "площадка") deltaTop = -10;
			if (params.model == "косоуры" && par.turnTypeName == "забег") deltaTop = -10;
			if (params.model == "тетива+косоур" && par.turnTypeName == "площадка") deltaTop = -10;
			if (params.model == "тетива+косоур" && par.turnTypeName == "забег") deltaTop = -10;
		}
		if (par.model == "timber_stock") {
			if (par.turnTypeName == "площадка") deltaTop = params.nose;
			if (par.turnTypeName == "забег") {
				deltaTop = params.nose; //было -30
				if (params.riserType == "есть") deltaTop += params.riserThickness;
			}
		}
		if (par.model == "bolz") {
			if (par.turnTypeName == "площадка") deltaTop = -13; //подогнано
			if (par.turnTypeName == "забег") {
				deltaTop = -13; //было -30
				if (params.riserType == "есть") deltaTop += params.riserThickness;
			}
		}

	}

	if (par.turnType == "P_turn") {
		/*обозначение параметров здесь
		6692035.ru/drawings/turnSize/lt/turnSize_P.pdf
		6692035.ru/drawings/turnSize/ko/turnSize_P.pdf
		6692035.ru/drawings/turnSize/mk/turnSize_P.pdf
		*/
		//поправка при стыковке верхнего марша с площадкой (снизу)
		//учитывается при расчете проступи верхнего марша
		if (par.model == "лт" && par.turnTypeName == "площадка") deltaBottom = 0;
		if (par.model == "лт" && par.turnTypeName == "забег") deltaBottom = 5;
		if (par.model == "ко" && par.turnTypeName == "площадка") deltaBottom = 0;
		if (par.model == "ко" && par.turnTypeName == "забег") deltaBottom = 72 - params.nose;
		if (par.model == "mono" && par.turnTypeName == "площадка") deltaBottom = 0;
		if (par.model == "mono" && par.turnTypeName == "забег") deltaBottom = -5;
		if (par.model == "timber") {
			if (params.model == "тетивы" && par.turnTypeName == "площадка") deltaBottom = -20;
			if (params.model == "тетивы" && par.turnTypeName == "забег") deltaBottom = -25;
			if (params.model == "косоуры" && par.turnTypeName == "площадка") deltaBottom = -20;
			if (params.model == "косоуры" && par.turnTypeName == "забег") deltaBottom = -50;
			if (params.model == "тетива+косоур" && par.turnTypeName == "площадка") deltaBottom = -20;
			if (params.model == "тетива+косоур" && par.turnTypeName == "забег") deltaBottom = -50;
		}
		if (par.model == "timber_stock") {
			if (par.turnTypeName == "площадка") deltaBottom = -params.nose;
			if (par.turnTypeName == "забег") deltaBottom = -params.nose; //было -30
		}
		if (par.model == "bolz") {
			if (par.turnTypeName == "площадка") deltaBottom = -params.nose - 13; //13 - подогнано
			if (par.turnTypeName == "забег") deltaBottom = -params.nose - 13
		}

		//поправка при стыковке нижнего марша с площадкой(сверху)
		//Учитывается при расчете длины проекции нижнего марша
		if (par.model == "лт" && par.turnTypeName == "площадка") deltaTop = 20;
		if (par.model == "лт" && par.turnTypeName == "забег") deltaTop = 31;
		if (par.model == "ко" && par.turnTypeName == "площадка") deltaTop = params.nose; //15
		if (par.model == "ко" && par.turnTypeName == "забег") deltaTop = 25;
		if (par.model == "mono" && par.turnTypeName == "площадка") deltaTop = 50; //45
		if (par.model == "mono" && par.turnTypeName == "забег") deltaTop = 45;
		if (par.model == "timber") {
			if (params.model == "тетивы" && par.turnTypeName == "площадка") deltaTop = 0;
			if (params.model == "тетивы" && par.turnTypeName == "забег") deltaTop = 10;
			if (params.model == "косоуры" && par.turnTypeName == "площадка") deltaTop = 0;
			if (params.model == "косоуры" && par.turnTypeName == "забег") deltaTop = -10;
			if (params.model == "тетива+косоур" && par.turnTypeName == "площадка") deltaTop = 0;
			if (params.model == "тетива+косоур" && par.turnTypeName == "забег") deltaTop = -10;
		}
		if (par.model == "timber_stock") {
			if (par.turnTypeName == "площадка") deltaTop = params.nose;
			if (par.turnTypeName == "забег") deltaTop = params.nose; //было -30
		}
		if (par.model == "bolz") {
			if (par.turnTypeName == "площадка") deltaTop = -13; //подогнано
			if (par.turnTypeName == "забег") {
				deltaTop = -13; //было -30
				if (params.riserType == "есть") deltaTop += params.riserThickness;
			}
		}
	}
	// if(par.model == "ко" && params.riserType == "есть") deltaBottom -= params.riserThickness;

	//добавка к последней проступи
	topStepDelta = params.nose;
	if (params.topFlan == "есть") topStepDelta += 8;
	if (params.topAnglePosition == "вертикальная рамка") {
		if (par.model == "лт") topStepDelta = 80;
		if (par.model == "ко") topStepDelta = 40 + params.riserThickness + params.nose;
	};

	//для террасной доски добавка считается исходя из фактического размера ступени
	if (params.calcType == "vhod" ||
		params.stairType == "дпк" ||
		params.stairType == "лиственница тер." ||
		params.stairType == "рифленая сталь" ||
		params.stairType == "лотки" ||
		params.stairType == "пресснастил") {
		topStepDelta = params.a3 - params.b3;
		if (params.stairModel == "Прямая") topStepDelta = params.a1 - params.b1;
		if (params.topFlan == "есть") topStepDelta += 8;
	}

	if (par.model == "mono") {
		topStepDelta = params.nose;
		if (params.topAnglePosition == "над ступенью") topStepDelta += 8;
	}

	if (par.model == "timber") topStepDelta = 60;
	if (par.model == "timber_stock") topStepDelta = 60;

	if (params.platformTop == 'площадка') topStepDelta = 0;

	//размеры для последней забежной ступени при 0 ступеней после забега

	//смещение переднего внутреннего угла третьей забежной ступени относительно внутреннго края нижнего марша
	var lastWndTreadOffset = 0;
	if (params.model == "лт") lastWndTreadOffset = 5; //http://skrinshoter.ru/s/251018/E5kHSzNF
	if (params.model == "ко") lastWndTreadOffset = 17; //http://skrinshoter.ru/s/251018/Bo793jPm
	var calc_type = params.calcType;
	//Для работоспособности модуля геометрии
	if (window.location.href.includes("/geometry/")) calc_type = params.staircaseType
	if (calc_type == "mono") lastWndTreadOffset = -5; //http://skrinshoter.ru/s/251018/gjutyr1K

	//расстояние от торца забежной ступени до перекрытия (толщина узла крепления к перекрытию)
	var topUnitThk = 0;
	if (params.topFlan == "есть") topUnitThk = 8;
	if (params.topAnglePosition == "вертикальная рамка") topUnitThk = 40 + params.riserThickness;
	if (calc_type == "mono") {
		topUnitThk = 0;
		if (params.topAnglePosition == "над ступенью") topUnitThk = 8;
	}

	if (calc_type == "timber" || calc_type == "timber_stock") {
		topUnitThk = 40;
	}

	//формируем возвращаемый объект
	par.deltaBottom = deltaBottom;
	par.deltaTop = deltaTop;
	par.topStepDelta = topStepDelta;
	par.lastWndTreadOffset = lastWndTreadOffset;
	par.topUnitThk = topUnitThk;

	return par;
} //end of setModelDimensions

function changeFormCarcas() {

	//жестко привязываем ширину ступени к проступи
	if (params.calcType == "bolz") {
		params.nose = 60;
		$("#nose").val(60);
	}

	//наличие каркаса
	if (params.model == "нет") {
		$("#model").val('ко');
		$("#isCarcas").val('нет');
		getAllInputsValues(params);
	}

	//заполнение параметров ступеней если они некорректно перенеслись из расчета геометрии

	if (!params.b1) {
		params.b1 = 260;
		$("#b1").val(260);
	}
	if (!params.b2) {
		params.b2 = 260;
		$("#b2").val(260);
	}
	if (!params.b3) {
		params.b3 = 260;
		$("#b3").val(260);
	}

	if (!params.h1) {
		params.h1 = 180;
		$("#h1").val(180);
	}
	if (!params.h2) {
		params.h2 = 180;
		$("#h2").val(180);
	}
	if (!params.h3) {
		params.h3 = 180;
		$("#h3").val(180);
	}

	if (params.stairType != "пресснастил") {
		$("#a1").val(calcTreadWidth(params.b1));
		$("#a2").val(calcTreadWidth(params.b2));
		$("#a3").val(calcTreadWidth(params.b3));
		getAllInputsValues(params);
	}

	if (params.stringerThickness != 8 && params.stringerThickness != 20) $("#stringerThickness").val(8);

	// установка зазора между маршами если есть ограждение на П-образных
	if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
		if (getMarshParams(1).hasRailing.in &&
			getMarshParams(3).hasRailing.in &&
			params.rackBottom == "боковое" &&
			params.calcType !== "bolz" &&
			params.marshDist < 100) {
			var delta = 100 - params.marshDist;
			var message = "ВНИМАНИЕ! \n" +
				"Введен слишком маленький зазор между маршами в плане, который не позволит установить ограждения. \n" +
				"Зазор увеличен до 100мм \n" +
				"Ширина маршей уменьшена с " + params.M + " до " + (params.M - delta / 2) + " мм";
			if (!testingMode) alertTrouble(message);
			$("#marshDist").val(100);
			$("#M").val(params.M - delta / 2);
			getAllInputsValues(params);
		}

	}

	//невозможность выбора вертикальной рамки для
	if (params.stairType == "рифленая сталь" ||
		params.stairType == "рифленый алюминий" ||
		params.stairType == "лотки" ||
		params.stairType == "дпк" ||
		params.stairType == "лиственница тер." ||
		params.stairType == "пресснастил" ||
		params.stairType == "стекло"
	) {
		if (params.topAnglePosition == "вертикальная рамка") {
			var message = 'ВНИМАНИЕ! \n Тип крепления к верхнему перекрытию "Вертикальная рамка" несовместим с типом ступеней "' +
				params.stairType + '" \n Установлен тип крепления "Уголок над ступенью"';
			if (!testingMode) alertTrouble(message);
			$("#topAnglePosition").val("над ступенью");
			getAllInputsValues(params);
		}
	}


	//var showAlert = false;

	//параметры дпк
	$("#dpcWidth").closest("tr").hide();
	$("#dpcDst").closest("tr").hide();

	if (params.stairType == "дпк" || params.stairType == "лиственница тер.") {
		$("#dpcWidth").closest("tr").show();
		$("#dpcDst").closest("tr").show();

		if ($("#a1").val() != params.dpcWidth && $("#a1").val() != params.dpcWidth * 2 + params.dpcDst) {
			if (showAlert) alertTrouble("Ширина ступени нижнего марша должна быть кратна ширине доски ДПК. Установлена ширина ступени a1 = " + (params.dpcWidth * 2 + params.dpcDst))
			$("#a1").val(params.dpcWidth * 2 + params.dpcDst);
		}

		if ($("#a2").val() != params.dpcWidth && $("#a2").val() != params.dpcWidth * 2 + params.dpcDst) {
			if (showAlert) alertTrouble("Ширина ступени среднего марша должна быть кратна ширине доски ДПК. Установлена ширина ступени a2 = " + (params.dpcWidth * 2 + params.dpcDst))
			$("#a2").val(params.dpcWidth * 2 + params.dpcDst);
		}

		if ($("#a3").val() != params.dpcWidth && $("#a3").val() != params.dpcWidth * 2 + params.dpcDst) {
			if (showAlert) alertTrouble("Ширина ступени верхнего марша должна быть кратна ширине доски ДПК. Установлена ширина ступени a3 = " + (params.dpcWidth * 2 + params.dpcDst))
			$("#a3").val(params.dpcWidth * 2 + params.dpcDst);
		}
	}

	//расчет ширины площадки по зазору между маршами
	var platformWidth_1 = params.marshDist + params.M * 2;
	if (params.stairModel == "П-образная с площадкой") {
		$("#platformWidth_1").val(platformWidth_1);
	}

	//увеличенная верхняя площадка
	$("#platformWidth_3").closest("tr").hide();
	if (params.platformTop == "увеличенная") {
		$("#platformWidth_3").closest("tr").show();
		$(".topPlt").show();
	}

	//конструктив забежных рамок
	$("#wndFrames").closest("tr").hide();
	if (params.stairFrame == "нет") $("#wndFrames").val("нет");
	if (params.stairModel == "Г-образная с площадкой" || params.stairModel == "П-образная с площадкой")
		$("#wndFrames").val("нет");
	if (params.stairModel == "П-образная трехмаршевая" && (params.turnType_1 != "забег" && params.turnType_2 != "забег"))
		$("#wndFrames").val("нет");

	if (params.stairFrame == "есть") {
		if (params.stairModel == "Г-образная с забегом" || params.stairModel == "П-образная с забегом") {
			$("#wndFrames").closest("tr").show();
			if ($("#wndFrames").val() == "нет") $("#wndFrames").val("лист");
		}

		if (params.stairModel == "П-образная трехмаршевая" && (params.turnType_1 == "забег" || params.turnType_2 == "забег")) {
			$("#wndFrames").closest("tr").show();
			if ($("#wndFrames").val() == "нет") $("#wndFrames").val("лист");
		}

		if (params.model == "ко") $("#wndFrames").val("лист");
	}

	//колонны промежуточной площадки
	$("#columnPos_tr").hide();
	if (params.columnModel != "нет") $("#columnPos_tr").show();

	/*скрываем все чекбоксы*/
	for (var i = 1; i < 9; i++) {
		var trId = "isColumn" + i + "_label";
		document.getElementById(trId).style.display = "none";
	}


	var stairModel = params.stairModel;
	var posCompatible = [];
	if (stairModel == "Прямая") {
		maxColumnAmt = 2;
		document.getElementById("columnPos_img").src = "/images/calculator/columnPos/001.jpg";
	}
	if (stairModel == "Г-образная с площадкой") {
		maxColumnAmt = 4;
		document.getElementById("columnPos_img").src = "/images/calculator/columnPos/002.jpg";
	}
	if (stairModel == "Г-образная с забегом") {
		maxColumnAmt = 4;
		document.getElementById("columnPos_img").src = "/images/calculator/columnPos/003.jpg";
	}
	if (stairModel == "П-образная с площадкой") {
		maxColumnAmt = 7;
		document.getElementById("columnPos_img").src = "/images/calculator/columnPos/004.jpg";
	}
	if (stairModel == "П-образная с забегом") {
		maxColumnAmt = 7;
		document.getElementById("columnPos_img").src = "/images/calculator/columnPos/005.jpg";
	}
	if (stairModel == "П-образная трехмаршевая") {
		maxColumnAmt = 8;
		document.getElementById("columnPos_img").src = "/images/calculator/columnPos/006.jpg";
	}

	for (var i = 1; i < maxColumnAmt + 1; i++) {
		var trId = "isColumn" + i + "_label";

		document.getElementById(trId).style.display = "";
	}


	//колонна №5 на трехмаршевой лестнице
	if (params.stairModel == "П-образная с площадкой" ||
		params.stairModel == "П-образная с забегом" ||
		(params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 < 2)) {
		if (params.isColumn5) {
			if (!testingMode) alertTrouble("Колонна №5 может быть установлена только если в среднем марше 2 и более ступеней.");
			params.isColumn5 = false;
			$("#isColumn5").prop("checked", false)
		}
	}

	// показ селектора выбора разделения косоуров промежуточной площадки и низлежащего марша

	$("#stringerDivision").closest("tr").hide();
	$("#stringerDivision2").closest("tr").hide();
	if (params.model == "ко") {
		if (stairModel == "Г-образная с площадкой") $("#stringerDivision").closest("tr").show();
		if (stairModel == "П-образная с площадкой") {
			$("#stringerDivision").closest("tr").show();
			$("#stringerDivision2").closest("tr").show();
		}
		if (stairModel == "П-образная трехмаршевая") {
			if (params.turnType_1 == "площадка") $("#stringerDivision").closest("tr").show();
			if (params.turnType_2 == "площадка") $("#stringerDivision2").closest("tr").show();
		}

	}



	/*тип ступеней*/
	var stairType = document.getElementById('stairType').options;
	var stairCompatible = [];
	if (params.model == "лт") stairCompatible = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	if (params.model == "ко") stairCompatible = [1, 2, 3, 4, 5, 6, 7, 8];
	showOptions("stairType", stairCompatible);




	//параметры террасной доски
	$("#dpcWidth").closest("tr").hide();
	$("#dpcDst").closest("tr").hide();

	if (params.stairType == "дпк" || params.stairType == "лиственница тер.") {
		$("#dpcWidth").closest("tr").show();
		$("#dpcDst").closest("tr").show();

		if ($("#a1").val() != params.dpcWidth && $("#a1").val() != params.dpcWidth * 2 + params.dpcDst) {
			if (!testingMode) alertTrouble("Ширина ступени нижнего марша должна быть кратна ширине доски ДПК. Установлена ширина ступени a1 = " + (params.dpcWidth * 2 + params.dpcDst))
			$("#a1").val(params.dpcWidth * 2 + params.dpcDst);
		}

		if ($("#a2").val() != params.dpcWidth && $("#a2").val() != params.dpcWidth * 2 + params.dpcDst) {
			if (!testingMode) alertTrouble("Ширина ступени среднего марша должна быть кратна ширине доски ДПК. Установлена ширина ступени a2 = " + (params.dpcWidth * 2 + params.dpcDst))
			$("#a2").val(params.dpcWidth * 2 + params.dpcDst);
		}

		if ($("#a3").val() != params.dpcWidth && $("#a3").val() != params.dpcWidth * 2 + params.dpcDst) {
			if (!testingMode) alertTrouble("Ширина ступени верхнего марша должна быть кратна ширине доски ДПК. Установлена ширина ступени a3 = " + (params.dpcWidth * 2 + params.dpcDst))
			$("#a3").val(params.dpcWidth * 2 + params.dpcDst);
		}
	}


	/*тип тетив*/
	var stringerType = document.getElementById('stringerType').options;
	var stringerCompatible = [];
	if (params.model == "лт") stringerCompatible = [1, 2, 3];
	if (params.model == "ко") stringerCompatible = [1, 2];
	showOptions("stringerType", stringerCompatible);

	/*подступенки*/
	var riserType = document.getElementById('riserType').options;
	if (params.model == "лт") {
		riserType[0].selected = "true";
		riserType[1].style.display = "none";
	}
	else {
		riserType[1].style.display = "table-row";
	}



	//зазор от стены по умолчанию
	var minDist = 10;
	if (params.model == "ко") minDist = params.sideOverHang;
	if ($("#wallDist").val() < minDist) $("#wallDist").val(minDist);

	//зазор между маршами в плане
	if (stairModel == "П-образная с забегом") {
		if (params.marshDist < 70) {
			if (!testingMode) alertTrouble("ВНИМАНИЕ!!! Для забежных лестниц ЛТ и КО зазор между маршами в плане не может быть меньше 70мм!")
			//$("#marshDist").val(70);	
		}
	}

	// показ инпута бокового свеса ступеней у КО
	$("#sideOverHang").closest("tr").hide()
	if (params.model == "ко") $("#sideOverHang").closest("tr").show()


	/*опции крепления*/

	if (params.platformTop != "нет") {
		params.topAnglePosition = "под ступенью";
		$("#topAnglePosition").val(params.topAnglePosition);
	}

	$('#topFlan').closest("tr").show();
	$('#topFlanHolesPosition').closest("tr").hide();
	if (params.topFlan == "есть") $('#topFlanHolesPosition').closest("tr").show();

	if (params.topAnglePosition == "вертикальная рамка" || params.platformTop != "нет") {
		$("#topFlan").val("нет");
		$('#topFlan').closest("tr").hide();
		$('#topFlanHolesPosition').closest("tr").hide();
	}

	if (params.topAnglePosition == "рамка верхней ступени" && !testingMode) {
		alertTrouble("ВНИМАНИЕ!\nКрепление к верхнему перекрытию через рамку верхней ступени более не используется. Выберите другой вариант крепления.")
	}
	//ширина последней забежной ступени если в верхнем марше 0 ступеней
	$('#lastWinderTreadWidth').closest("tr").hide();
	var showLastTreadWidth = false;
	if (params.stairAmt3 == 0) {
		if (params.stairModel == "Г-образная с забегом") showLastTreadWidth = true;
		if (params.stairModel == "П-образная с забегом") showLastTreadWidth = true;
		if (params.stairModel == "П-образная трехмаршевая" && params.turnType_2 == "забег") showLastTreadWidth = true;
	}
	if (showLastTreadWidth) {
		$('#lastWinderTreadWidth').closest("tr").show();
		if (params.model == "лт") {
			if (params.lastWinderTreadWidth < 100) {
				$('#lastWinderTreadWidth').val(100);
				if (!testingMode) alertTrouble("Для лестницы ЛТ ширина последней забежной ступени не может быть меньше 100мм! Было установлено значение ширины ступени 100мм")
			}
			if (params.lastWinderTreadWidth + params.M + 5 > params.floorHoleLength)
				if (!testingMode) alertTrouble("Ширина проема А = " +
					params.floorHoleLength +
					"мм - меньше чем длина проекции верхнего марша (" + (params.lastWinderTreadWidth + params.M + 5) + ")\n" +
					"для ЛТ по конструктивным соображениям невозможно спроектировать лестницу!\n\n" +
					"Измените ширину верхней ступени, ширину марша или проем.");
		}
		if (params.model == "ко") {
			if (params.lastWinderTreadWidth < 55) {
				$('#lastWinderTreadWidth').val(55);
				if (!testingMode) alertTrouble("Для лестницы ЛТ ширина последней забежной ступени не может быть меньше 55мм! Было установлено значение ширины ступени 55мм")
			}
			if (params.lastWinderTreadWidth + params.M + 17 > params.floorHoleLength)
				if (!testingMode) alertTrouble("Ширина проема А = " +
					params.floorHoleLength +
					"мм - меньше чем длина проекции верхнего марша (" + (params.lastWinderTreadWidth + params.M + 17) + ")\n" +
					"для ЛТ по конструктивным соображениям невозможно спроектировать лестницу!\n\n" +
					"Измените ширину верхней ступени, ширину марша или проем.");
		}
	}


	/*Пристенный плинтус*/
	if (params.model == "лт" || params.riserType == "нет") {
		$(".skirting").hide();
		$("#skirting_1").val("нет");
		$("#skirting_2").val("нет");
		$("#skirting_3").val("нет");
	}


	var treadMaterial = "metal";

	if (params.stairType == "сосна кл.Б" ||
		params.stairType == "сосна экстра" ||
		params.stairType == "береза паркет." ||
		params.stairType == "дуб паркет." ||
		params.stairType == "лиственница паркет." ||
		params.stairType == "лиственница тер." ||
		params.stairType == "дуб ц/л") treadMaterial = "timber";


	setStairOption();


	/*тип верхнего крепления*/

	var topFixOptions = document.getElementById('topAnglePosition').options;
	var topFixCompatible = [];
	if (params.model == "лт") {
		topFixCompatible = [1, 2];
		topFixCompatible.push(1, 4);
		if (params.stairFrame == "есть" && treadMaterial == "timber") topFixCompatible.push(1, 3, 4);
		//уголок под ступенью невозможен при 0 ступеней после забега
		if (showLastTreadWidth) {
			while (topFixCompatible.indexOf(1) != -1) {
				topFixCompatible.splice(topFixCompatible.indexOf(1), 1)
			}
		}
	}

	if (params.model == "ко") topFixCompatible = [1, 3, 4];
	showOptions("topAnglePosition", topFixCompatible);

	$("#topPltConsolePos").closest("tr").hide();
	$("#isColumnTop").closest("tr").hide();
	if (params.platformTop != "нет") {
		$("#isColumnTop").closest("tr").show();
		if (params.platformTopColumn == "подкосы") {
			$("#topPltConsolePos").closest("tr").show();
			$("#isColumnTop").closest("tr").hide();
		}
	}


	//задняя тетива площадки
	var needRearStringer = false;
	if (params.topPltRailing_5) needRearStringer = true;
	if (params.platformTopColumn == "колонны" &&
		params.columnModel != "нет" &&
		(params.isColumnTop1 || params.isColumnTop3)) needRearStringer = true;

	if (needRearStringer) {
		params.platformRearStringer = "есть";
		$("#platformRearStringer").val("есть");
	}

	//удлиннение внутренней тетивы/косоура под забегом
	$("#inStringerElongationTurn1").closest("tr").hide();
	$("#inStringerElongationTurn2").closest("tr").hide();
	if (params.stairModel == "Г-образная с забегом") $("#inStringerElongationTurn1").closest("tr").show();
	if (params.stairModel == "П-образная с забегом") {
		$("#inStringerElongationTurn1").closest("tr").show();
		$("#inStringerElongationTurn2").closest("tr").show();
	};
	if (params.stairModel == "П-образная трехмаршевая") {
		if (params.turnType_1 == "забег") $("#inStringerElongationTurn1").closest("tr").show();
		if (params.turnType_2 == "забег") $("#inStringerElongationTurn2").closest("tr").show();
	};

	//смещение внешнего косоура
	$(".stringerMoove").hide();
	if (params.model == "ко") {
		$("#stringerMoove_1").closest("tr").show();
		if (params.stairModel != "Прямая") {
			$("#stringerMoove_3").closest("tr").show();
			if (params.stairModel != "Г-образная с площадкой" || params.stairModel != "Г-образная с забегом")
				$("#stringerMoove_2").closest("tr").show();
		}
	}

} //конец функции changeFormCarcas()


//-------------------------------------------------
function calcTurnEndPoint(pos, rotY, botMarshId, plusMarshDist, turnId) {

	var turnType = getMarshParams(botMarshId).topTurn;
	var turnParams = calcTurnParams(botMarshId);

	var endPoint = {
		x: pos.x,
		y: pos.y, // + getMarshParams(botMarshId).h_topWnd,
		z: pos.z,
		rot: rotY - Math.PI / 2 * turnFactor,
	}


	if (params.stairModel == "Г-образная с площадкой" && hasCustomMidPlt()) {
		endPoint.x += (params.middlePltLength - params.M);//params.middlePltLength + turnParams.topMarshOffsetX + (params.M - calcTreadLen());
		endPoint.z += (params.middlePltWidth - params.M) * turnFactor;//params.middlePltLength + turnParams.topMarshOffsetX + (params.M - calcTreadLen());
	}

	//ось нижнего марша вдоль оси X
	if (endPoint.rot == - Math.PI / 2 * turnFactor) {
		endPoint.x += params.M / 2 + turnParams.topMarshOffsetX;
		endPoint.z += (params.M / 2 + turnParams.topMarshOffsetZ) * turnFactor;
	}

	//ось нижнего марша вдоль оси Z
	if (endPoint.rot == - Math.PI * turnFactor) {
		endPoint.x -= params.M / 2 + turnParams.topMarshOffsetZ;
		endPoint.z += (params.M / 2 + turnParams.topMarshOffsetX) * turnFactor;
	}

	if (turnType == "забег") endPoint.y += getMarshParams(botMarshId).h_topWnd * 2;

	if (params.stairModel == "П-образная с площадкой" && botMarshId == 1) {
		var endPoint = {
			x: pos.x + params.nose,
			y: pos.y,
			z: pos.z + (params.M + params.marshDist) * turnFactor,
			rot: rotY - Math.PI * turnFactor,
		}
	}

	if (params.stairModel == 'Прямая с промежуточной площадкой') {
		endPoint = newPoint_xy(pos, params.middlePltLength + turnParams.topMarshOffsetX + (params.M - calcTreadLen()), 0);
		endPoint.rot = 0;
	}

	if (params.stairModel == 'Прямая горка') {
		endPoint = newPoint_xy(pos, pos.x + params.middlePltLength, -pos.y);
		endPoint.rot = Math.PI;
	}

	if (plusMarshDist) {
		if (params.stairModel == "П-образная с забегом") {
			if (params.model == "лт") endPoint.z += (params.marshDist - turnParams.topMarshOffsetX - 5) * turnFactor;
			if (params.model == "ко") endPoint.z = (params.M / 2 + params.marshDist - 25) * turnFactor;	//25 - подогнано
			if (params.model == "сварной" || params.model == "труба") endPoint.z += (params.marshDist - 40) * turnFactor;
			if (params.calcType == "bolz" && turnId == 1) endPoint.z -= 8 * turnFactor;
		}
		if (params.stairModel == "П-образная трехмаршевая") {
			var turnParams2 = calcTurnParams(2); //параметры второго поворота
			if (params.model == "лт") endPoint.z = (params.M / 2 + params.marshDist - turnParams2.topMarshOffsetX) * turnFactor;
			if (params.model == "ко") endPoint.z = (params.M / 2 + params.marshDist - 25) * turnFactor;	//25 - подогнано
			if (params.model == "сварной" || params.model == "труба") endPoint.z = (params.M / 2 + params.marshDist - 45) * turnFactor;	//45 - подогнано
		}

		if (params.calcType == "timber") {
			if (params.model == "косоуры" || params.model == "тетива+косоур") endPoint.z += (params.marshDist + 60) * turnFactor; //60 подогнано
			if (params.model == "тетивы") endPoint.z += (params.marshDist + 15) * turnFactor; //15 подогнано
		}

		if (params.calcType == "timber_stock") endPoint.z += params.marshDist * turnFactor;

		//if(turnType == "площадка") endPoint.z += -turnParams.topMarshOffsetZ * turnFactor;
	}
	if (params.stairModel == 'П-образная с забегом' && turnId == 1 && params.calcType == 'timber_stock') {
		endPoint.x += 20;
	}
	if (params.stairModel == 'П-образная с забегом' && turnId == 2 && params.calcType == 'timber_stock') {
		endPoint.z += 20 * turnFactor;
	}

	return endPoint;
}

function drawWndTreadsMetal(par) {

    /*функция отрисовывает блок забежных ступеней для лестниц ЛТ и КО
    Исходные данные:

        h: params.h, - подъем ступени
        dxfBasePoint: dxfBasePoint, - базовая точка вставки контуров ступеней
        extendTopTurnTread: extendTopTurnTread, - продление верхней забежной ступени для попадания в проём

    Возвращаемое значение:
    объект  turnSteps = {
        meshes: treads; - мэши ступеней в виде единого 3D объекта
        params: treadParams; - массив параметров каждой ступени
    */

	//параметры марша
	var marshPar = getMarshParams(par.botMarshId);
	par.h = marshPar.h_topWnd;

	var hasTurnRack = false;
	if (params.railingModel == "Деревянные балясины" || params.railingModel == "Дерево с ковкой" || params.railingModel == 'Стекло') {
		if (params.stairModel == 'Г-образная с забегом' || params.stairModel == 'Г-образная с площадкой') {
			hasTurnRack = getMarshParams(1).hasRailing.in || getMarshParams(3).hasRailing.in;
		}
		if (params.stairModel == 'П-образная трехмаршевая' && par.botMarshId == 1) {
			hasTurnRack = getMarshParams(1).hasRailing.in || getMarshParams(2).hasRailing.in;
		}
		if (params.stairModel == 'П-образная трехмаршевая' && par.botMarshId == 2) {
			hasTurnRack = getMarshParams(2).hasRailing.in || getMarshParams(3).hasRailing.in;
		}
		if (params.stairModel == 'П-образная с забегом' && par.turnId == 1) {
			hasTurnRack = getMarshParams(1).hasRailing.in;
		}
		if (params.stairModel == 'П-образная с забегом' && par.turnId == 2) {
			hasTurnRack = getMarshParams(3).hasRailing.in;
		}
	}
	var rackSize = 95;

	//параметры поворота
	var turnPar = calcTurnParams(par.botMarshId);

	par.type = params.model;

	var stepWidthLow_lt = 100;
	var stepWidthLow_ko = 55;

	var dxfBasePoint = par.dxfBasePoint;
	var material = params.materials.tread;
	var treadParams = [];
	var treads = new THREE.Object3D();
	var risers = new THREE.Object3D();

	//константы
	var treadWidth = params.M;
	var stepWidthLow = 55;
	if (params.model == "лт") {
		stepWidthLow = 100;
		var treadSideOffset = 5;//зазор от торца ступени до тетивы
		if (params.stairType == "лотки" || params.stairType == "рифленая сталь" || params.stairType == "пресснастил") treadSideOffset = 0;

		treadWidth = params.M - params.stringerThickness * 2 - treadSideOffset * 2;
	}
	if (params.calcType == "bolz") {
		stepWidthLow = 60;
	}
	var treadZOffset = (params.M - treadWidth) / 2;

	/*забежная ступень 1*/

	//задаем параметры ступени

	treadParams[1] = {
		treadWidth: treadWidth,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI / 6,
		stepWidthLow: stepWidthLow,
		dxfBasePoint: dxfBasePoint,
		treadId: 1,
		turnId: par.turnId,
		hasTurnRack: hasTurnRack,
		isTread: true,
		marshId: par.botMarshId
	};

	if (params.riserType == "есть") treadParams[1].stepWidthLow -= params.riserThickness / Math.cos(treadParams[1].edgeAngle)

	var tread1 = drawWndTread1(treadParams[1]).mesh;

	tread1.rotation.x = -Math.PI / 2;
	tread1.rotation.z = -Math.PI / 2;

	tread1.position.x = 0;
	tread1.position.x -= 0.02; //корректинуем позицию чтобы не было пересечений
	tread1.position.y = -params.treadThickness + 0.01;
	//лотки
	if (params.stairType == "лотки") tread1.position.y += params.treadThickness - 4 - 0.01;

	tread1.position.z = -(treadParams[1].treadWidth) / 2 * turnFactor;

	treads.add(tread1);

	/*подступенок 1*/

	if (params.riserType == "есть") {
		var riserPar = {
			len: treadParams[1].treadWidth,
			width: marshPar.h,
			thk: params.riserThickness,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
			hasTopScrews: true,
			hasBotScrews: true
		};
		// console.log(par.turnId)
		if (params.stairModel == "П-образная с забегом" && par.turnId == 2) riserPar.width = par.h;
		if (par.botMarshId == 1 && params.stairAmt1 == 0 && params.stairModel != "П-образная с забегом") riserPar.width -= params.treadThickness;

		//отрисовка
		riserPar = drawRectRiser(riserPar);
		riser = riserPar.mesh;
		riser.rotation.z = Math.PI / 2;
		riser.rotation.y = Math.PI / 2 * turnFactor;
		riser.position.x = params.nose// - params.riserThickness;
		if (params.stairModel == "П-образная с забегом" && par.turnId == 2) riser.position.x = 20 - 0.01;
		riser.position.y = -riserPar.width - params.treadThickness;
		riser.position.z = tread1.position.z;

		if (turnFactor < 0) riser.position.x += params.riserThickness;

		risers.add(riser);
	}

	/*забежная ступень 2*/

	dxfBasePoint = newPoint_xy(dxfBasePoint, 1500, 0);

	//задаем параметры ступени
	if (par.type == "лт") {
		treadParams[2] = {
			treadWidthX: params.M - params.stringerThickness + 100 - treadSideOffset + 5,
			treadWidthY: params.M - params.stringerThickness * 2 - treadSideOffset * 2 - 0.01,
			angleX: 30 * Math.PI / 180,
			angleY: 32.9237 * Math.PI / 180,
			outerOffsetX: 0,
			outerOffsetY: 0,
			innerOffsetX: 100,
			innerOffsetY: 50,
			notchDepthX: 0,
			notchDepthY: 0,
			dxfBasePoint: dxfBasePoint,
		};
	}

	if (par.type == "ко") {
		treadParams[2] = {
			treadWidthX: params.M - 25 + 88,
			treadWidthY: params.M - 0.01,
			angleX: 30 * Math.PI / 180,
			angleY: 30 * Math.PI / 180,
			outerOffsetX: 0,
			outerOffsetY: 0,
			innerOffsetX: 88,
			innerOffsetY: 0,
			notchDepthX: 0,
			notchDepthY: 0,
			dxfBasePoint: dxfBasePoint,
			hasTurnRack: hasTurnRack,
			isTread: true,
		};
	}

	if (params.calcType === 'bolz') {
		treadParams[2] = {
			treadWidthX: params.M - params.stringerThickness * 2 - treadSideOffset * 2 - 0.01,
			treadWidthY: params.M - params.stringerThickness * 2 - treadSideOffset * 2 - 0.01,
			angleX: 30 * Math.PI / 180,
			angleY: 32.9237 * Math.PI / 180,
			outerOffsetX: 0,
			outerOffsetY: 0,
			innerOffsetX: 50,
			innerOffsetY: 50,
			notchDepthX: 0,
			notchDepthY: 0,
			dxfBasePoint: dxfBasePoint,
		};
	}
	//if(params.riserType == "есть") treadParams[2].innerOffsetX -= params.riserThickness / Math.cos(treadParams[2].angleY)
	if (params.riserType == "есть") {
		treadParams[2].innerOffsetX -= params.riserThickness / Math.cos(treadParams[2].angleY);
		treadParams[2].treadWidthX -= params.riserThickness / Math.cos(treadParams[2].angleY);
	}

	treadParams[2].treadId = 2;

	//отрисовываем ступень

	var tread2 = drawWndTread2(treadParams[2]).mesh;
	tread2.rotation.x = -Math.PI / 2;
	tread2.rotation.z = -Math.PI / 2;
	//позиция считается так, чтобы внешний угол оказался в проектном положении
	tread2.position.x = -treadParams[2].stepWidthY + params.M + turnPar.topMarshOffsetX - treadZOffset;
	tread2.position.x -= 0.02; //корректинуем позицию чтобы не было пересечений
	tread2.position.y = par.h - params.treadThickness + 0.01;
	//лотки
	if (params.stairType == "лотки") tread2.position.y += params.treadThickness - 4 - 0.01;
	tread2.position.z = -(treadParams[1].treadWidth) / 2 * turnFactor;
	treads.add(tread2);

	/*подступенок 2*/

	if (params.riserType == "есть") {
		var riserPar = {
			len: treadParams[1].treadWidth / Math.cos(treadParams[1].edgeAngle),
			width: par.h,
			ang: treadParams[1].edgeAngle * turnFactor,
			thk: params.riserThickness,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, 0, -500),
			hasTopScrews: true,
			hasBotScrews: true
		};
		if (hasTurnRack && treadParams[1].riserFix) {//Меняем размер подступенка, riserFix рассчитывается в calcWndTread1Points
			riserPar.cutWndIn = treadParams[1].riserFix / Math.cos(treadParams[1].edgeAngle) + 0.03;
		}
		//if (testingMode) riserPar.len += 1;//Фикс пересечения с ковкой

		//отрисовка
		riserPar = drawRectRiser(riserPar);
		riser = riserPar.mesh;

		riser.rotation.z = Math.PI / 2;
		riser.rotation.y = (Math.PI / 2 - treadParams[1].edgeAngle) * turnFactor;
		//базовая точка - внешний дальний угол ступени		
		riser.position.x = tread1.position.x + treadParams[1].stepWidthHi + 0.01;
		if (turnFactor == -1) riser.position.x += params.riserThickness / Math.cos(treadParams[1].edgeAngle);
		riser.position.y = -params.treadThickness + 0.01;
		riser.position.z = tread1.position.z;


		risers.add(riser);
	}

	/*забежная ступень 3*/

	dxfBasePoint = newPoint_xy(dxfBasePoint, 1000 + treadWidth, 0);

	//задаем параметры ступени
	treadParams[3] = {
		treadWidth: treadWidth,
		innerOffset: 0,
		outerOffset: 0,
		edgeAngle: Math.PI / 6,
		stepWidthLow: stepWidthLow,
		dxfBasePoint: dxfBasePoint,
		treadId: 3,
		hasTurnRack: hasTurnRack,
		isTread: true,
		marshId: par.botMarshId,
		turnId: par.turnId
	};

	//удлиннение 3 забежной ступени на П-образной с забегом
	var deltaLen = 0;
	if (par.plusMarshDist) {
		deltaLen = params.marshDist - 77;
		if (par.type == "ко") deltaLen += params.nose - 20;
		if (params.calcType === 'bolz') deltaLen = params.marshDist;
	}

	//удлиннение последней ступени при 0 ступеней в верхнем марше
	var isLastTread = false;
	if (params.stairAmt3 == 0) {
		if (params.stairModel == "Г-образная с забегом") isLastTread = true;
		if (params.stairModel != "Г-образная с забегом" && par.turnId == 2) isLastTread = true;
	}
	if (isLastTread) deltaLen = params.lastWinderTreadWidth - treadParams[3].stepWidthLow;

	treadParams[3].stepWidthLow += deltaLen;

	var tread3 = drawWndTread1(treadParams[3]).mesh;
	tread3.rotation.x = -Math.PI / 2;

	tread3.position.x = params.M + turnPar.topMarshOffsetX - treadZOffset;
	tread3.position.y = par.h * 2 - params.treadThickness + 0.01;
	if (params.stairType == "лотки") tread3.position.y += - 0.02;
	//для лт позиция считается от переднего угла на внутренней стороне
	tread3.position.z = (params.M / 2 + treadParams[3].stepWidthLow + turnPar.topMarshOffsetZ) * turnFactor;
	//для ко позиция считается по свесу
	if (par.type == "ко") {
		tread3.position.z = (params.M / 2 + 72 + deltaLen) * turnFactor
		//if(params.riserType == "есть") tread3.position.z -= params.riserThickness * turnFactor;
	}

	if (turnFactor == -1) {
		tread3.rotation.z = Math.PI;
	}

	tread3.position.z -= 0.01 * turnFactor
	treads.add(tread3);

	/*подступенок 3*/

	if (params.riserType == "есть") {
		var offsetX = -(riserPar.len - riserPar.thk * Math.tan(riserPar.ang));

		var riserPar = {
			len: treadParams[2].treadWidthY / Math.cos(treadParams[2].angleY),
			width: par.h,
			ang: treadParams[3].edgeAngle,
			thk: params.riserThickness,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, 0, -500),
			offsetX: offsetX,
			hasTopScrews: true,
			hasBotScrews: true
		};
		if (hasTurnRack) {//Меняем размер подступенка, riserFix рассчитывается в calcWndTread1Points
			//riserPar.cutWndIn = params.rackSize / Math.cos(treadParams[3].edgeAngle) + 10;
			riserPar.len -= params.rackSize / Math.cos(treadParams[3].edgeAngle) + 0.5; //0.5 - подогнано чтобы не было пересечения со столбом
		}

		//отрисовка
		riserPar = drawRectRiser(riserPar);
		riser = riserPar.mesh;

		riser.rotation.z = -Math.PI / 2;
		riser.rotation.y = treadParams[2].angleY;

		//Меняем размер подступенка, riserFix рассчитывается в calcWndTread1Points

		//if (hasTurnRack) offsetX -= 0.01;

		//смещаем базовую точку на острый угол внешней стороны марша
		riser.children[0].geometry.translate(offsetX, 0, 0)
		riser.position.x = tread2.position.x + (treadParams[2].stepWidthY) + 0.01;
		tread2.position.x -= 0.01; //корректинуем позицию чтобы не было пересечений
		riser.position.y = (turnFactor > 0 ? riserPar.width : 0) + par.h - params.treadThickness + 0.1;
		riser.position.z = tread2.position.z + treadParams[2].stepWidthX * turnFactor;
		if (turnFactor < 0) riser.rotation.x = -Math.PI;
		if (turnFactor < 0) {
			riser.position.z += params.riserThickness / 2 / Math.cos(treadParams[3].edgeAngle);
			riser.position.x += params.riserThickness / 2 / Math.sin(treadParams[3].edgeAngle);
		}


		risers.add(riser);
	}

	/*добавляем к параметрам*/

	par.treads = treads;
	par.risers = risers;
	par.params = treadParams;

	//сохряняем данные для спецификации


	return par;

} //end of drawWndTreadsMetal