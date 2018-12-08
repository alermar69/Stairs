/** функция отрисовывает косоур вметсе со всеми пластинами и подложками
*/

function drawComplexStringer(par) {
	par.mesh1 = new THREE.Object3D();
	par.mesh2 = new THREE.Object3D();
	par.flans = new THREE.Object3D();
	par.treadPlates = new THREE.Object3D();

	if (params.model == "труба") params.stringerThickness = params.profileWidth + params.metalThickness * 2;
	
	//именованные ключевые точки
	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};
	par.keyPoints[par.key].zeroPoint = { x: 0, y: 0 };
	par.zeroPoint = { x: 0, y: 0 };

	//рассчитываем параметры косоура по номеру марша
	calcStringerPar(par);

	var dxfBasePoint0 = copyPoint(par.dxfBasePoint);
	
	
	//боковые накладки косоура

	var extrudeOptions = {
		amount: params.metalThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	//первая накладка
	
	par.key = "in";
	if (turnFactor == -1) par.key = "out";
	par = drawStringerMk(par);
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var sidePlate1 = new THREE.Mesh(geom, params.materials.metal);
	if (par.key == "out") var pointsShape = par.pointsShape;
	
	var dxfBasePoint1 = copyPoint(par.dxfBasePoint);

	var parStringer = par;
	
	//вторая накладка
	
	par.key = "out";
	if (turnFactor == -1) par.key = "in";
	par = drawStringerMk(par);
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var sidePlate2 = new THREE.Mesh(geom, params.materials.metal);
	if (par.key == "out") var pointsShape = par.pointsShape;

	sidePlate1.position.x = sidePlate2.position.x = par.a - par.b;
	sidePlate1.position.y = sidePlate2.position.y = 0;

	var dxfBasePoint2 = copyPoint(par.dxfBasePoint);
	
	par.dxfBasePoint = copyPoint(dxfBasePoint1);

	//если последняя ступень - забежная
	if (par.botEnd === "забег" && par.topEnd == "пол" && par.stairAmt == 1) {
		if (params.model == "труба") {
			sidePlate1.position.x = sidePlate2.position.x = 100 - params.lastWinderTreadWidth;
		}
	}

	if (params.botFloorType == "черновой" && par.marshId == 1) {
		sidePlate1.position.y -= params.botFloorsDist;
		sidePlate2.position.y -= params.botFloorsDist;
	}

	var columnHoles = {};// Переменная в которую запишутся положения отверстий столбов
	sidePlate1.position.z = params.stringerThickness / 2 - params.metalThickness;
	sidePlate2.position.z = -params.stringerThickness / 2;

	par.mesh1.add(sidePlate1);
	par.mesh1.add(sidePlate2);

    par.pointsShape = pointsShape;
	

	//отрисовка профильной трубы
	if (params.model == "труба") {
		var botEndAng = 0;
		var sidePlateOverlayPlatform = 7;
		var offset = params.flanThickness - 3;
		var stringerPoints = [];

		if (par.botEnd == "пол") {
			var pt1 = par.pointsShape[0];
			var pt2 = par.pointsShape[par.pointsShape.length - 1];
			var ang = calcAngleX1(pt1, pt2);

			var line = parallel(pt1, pt2, params.sidePlateOverlay);
			var pv1 = newPoint_xy(pt1, 0, - offset);
			var pv2 = itercection(pv1, polar(pv1, 0, 100), line.p1, line.p2);
			pt1 = newPoint_xy(pv2, params.profileHeight / Math.sin(ang), 0);

			//при большой разнице чистового и чернового пола
			if (par.isBotFloorsDist) {
				var line1 = parallel(line.p1, line.p2, - params.profileHeight);
				var pt0 = newPoint_xy(par.pointsShape[1], -params.sidePlateOverlay, - offset);
				pt = newPoint_xy(pt0, params.profileHeight, 0);
				pt1 = itercection(pt, polar(pt, Math.PI / 2, 100), line1.p1, line1.p2);
				pt.x -= 0.01;
				stringerPoints.push(pt);
			}
		}
		if (par.botEnd == "площадка") {
			var pt1 = par.pointsShape[0];
			var pt2 = par.pointsShape[par.pointsShape.length - 1];
			var pt0 = par.pointsShape[1];
			pt0 = newPoint_xy(pt0, - offset, - params.profileHeight + sidePlateOverlayPlatform);

			var line = parallel(pt1, pt2, params.sidePlateOverlay - params.profileHeight);
			pt1 = itercection(pt0, polar(pt0, 0, 100), line.p1, line.p2);

			botEndAng = Math.PI / 2;
			stringerPoints.push(pt0);
		}
		if (par.botEnd == "забег" && par.stairAmt > 1) {
			var pt1 = par.pointsShape[0];
			var pt2 = par.pointsShape[par.pointsShape.length - 1];

			var pt0 = par.pointsShape[2];
			var pt01 = par.pointsShape[1];
			pt0 = newPoint_xy(pt0, - offset, - params.profileHeight + params.sidePlateOverlay);

			var line = parallel(pt01, pt1, params.sidePlateOverlay - params.profileHeight);
			var line1 = parallel(pt1, pt2, params.sidePlateOverlay - params.profileHeight);
			pt1 = itercection(line.p1, line.p2, line1.p1, line1.p2);
			pt01 = itercection(pt0, polar(pt0, 0, 100), line.p1, line.p2);

			botEndAng = Math.PI / 2;
			stringerPoints.push(pt0);
			stringerPoints.push(pt01);
		}
		if (par.botEnd == "забег" && par.stairAmt <= 1) {
			var pt1 = par.pointsShape[0];
			var pt2 = par.pointsShape[par.pointsShape.length - 1];

			var pt0 = par.pointsShape[1];
			pt0 = newPoint_xy(pt0, - offset, - params.profileHeight + params.sidePlateOverlay);

			var line = parallel(pt1, pt2, params.sidePlateOverlay - params.profileHeight);
			pt1 = itercection(pt0, polar(pt0, 0, 100), line.p1, line.p2);

			botEndAng = Math.PI / 2;
			stringerPoints.push(pt0);
		}

		if (par.topEnd == "пол") {
			pt2 = newPoint_xy(pt2, offset, 0);
			pt2 = itercection(pt1, polar(pt1, par.marshAngle, 100), pt2, polar(pt2, Math.PI / 2, 100));
		}
		if (par.topEnd == "площадка") {
			var pt3 = par.pointsShape[par.pointsShape.length - 2];
			pt3 = newPoint_xy(pt3, offset, - params.profileHeight + sidePlateOverlayPlatform);
			pt2 = itercection(pt1, polar(pt1, par.marshAngle, 100), pt3, polar(pt3, 0, 100));
		}
		if (par.topEnd == "забег" && par.stairAmt != 1) {
			var pt3 = par.pointsShape[par.pointsShape.length - 2];
			var pt4 = par.pointsShape[par.pointsShape.length - 3];
			pt4 = newPoint_xy(pt4, offset, - params.profileHeight + params.sidePlateOverlay);

            var line_1_2 = parallel(par.pointsShape[0], pt2, - params.profileHeight + params.sidePlateOverlay);
			var line_2_3 = parallel(pt2, pt3, - params.profileHeight + params.sidePlateOverlay);
            pt2 = itercection(line_1_2.p1, line_1_2.p2, line_2_3.p1, line_2_3.p2);
			var pt3 = itercection(line_2_3.p1, line_2_3.p2, pt4, polar(pt4, 0, 100));
		}
		if (par.topEnd == "забег" && par.stairAmt == 1) {
			//var ang = Math.atan(par.h / (par.pointsShape[3].x - par.pointsShape[2].x));
			var ang = calcAngleX1(par.pointsShape[0], par.pointsShape[par.pointsShape.length - 1]);
			var pt3 = par.pointsShape[par.pointsShape.length - 2];
			pt3 = newPoint_xy(pt3, offset, - params.profileHeight + params.sidePlateOverlay);
			pt2 = itercection(pt1, polar(pt1, ang, 100), pt3, polar(pt3, 0, 100));
		}

		

		stringerPoints.push(pt1, pt2);
		if (pt3) stringerPoints.push(pt3);
		if (pt4) stringerPoints.push(pt4);

		var polePar = {
			points: stringerPoints,
			offset: 0, //-params.sidePlateOverlay,
			botEndAng: botEndAng,
			topEndAng: Math.PI / 2,
			profSizeY: params.profileHeight,
			profSizeZ: params.profileWidth,
			dxfBasePoint: par.dxfBasePoint,
			roundHoles: [],
		}
		
		//круглые отверстия в трубе насквозь для крепления нижнего марша
		if (par.botEnd == "площадка" && par.botConnection){
			var flanParams = getFlanParams('flan_pipe_bot');
			var holeDist = flanParams.holesDist; //Расстояние между отверстиями
			var pltLength = params.M;
			if (params.stairModel == 'П-образная с площадкой') {
				pltLength = params.platformLength_1 + 50;//Подогнано, пока разбираюсь что за отступ
			}
			var hole1 = {
				x: -pltLength / 2 - holeDist / 2,
				y: -params.treadThickness - (flanParams.height - flanParams.holeY), //140 - расстояние от вершины фланца до середины нижнего отверстия
			}

			var hole2 = newPoint_xy(hole1, holeDist, 0);

			hole1.diam = hole2.diam = 18;
			polePar.roundHoles.push(hole1, hole2)
		}
		//круглые отверстия в трубе насквозь для крепления верхнего марша
		if (par.topEnd == "площадка" && par.topConnection){
			var flanParams = getFlanParams('flan_pipe_bot');
			var holeDist = flanParams.holesDist; //Расстояние между отверстиями
			var pltLength = params.M;
			if (params.stairModel == 'П-образная с площадкой') {
				pltLength = params.platformLength_1 + 54;//Подогнано, пока разбираюсь что за отступ
			}
			var stairAmt = par.stairAmt;
			if (par.botEnd == 'забег') {
				stairAmt -= 1;
			}
			var hole1 = {
				x: (stairAmt - 1) * par.b - params.nose + 45 + params.M / 2 - holeDist / 2,//45 - расстояние начала площадки до края второго марша
				y: (stairAmt) * par.h - params.treadThickness - (flanParams.height - flanParams.holeY), //142 - расстояние от вершины фланца до середины нижнего отверстия
			}
			if (par.botEnd == "пол" && params.botFloorType == "черновой") hole1.y += params.botFloorsDist;
			if (params.stairModel == 'П-образная с площадкой') {
				hole1 = newPoint_xy(par.pointsShape[par.pointsShape.length - 3], -pltLength / 2 - holeDist / 2 + params.flanThickness + params.treadPlateThickness, -(flanParams.height - flanParams.holeY) + 2);//2 выступ фланца за каркас
				// hole1 = {
				// 	x: (par.stairAmt - 1) * par.b,// + 27 - params.nose + params.platformLength_1 / 2 - holeDist / 2,//27 - подогнано, тестировал на разных параметрах
				// 	y: (par.stairAmt) * par.h - params.treadThickness - (flanParams.height - flanParams.holeY),
				// }
			}
			var hole2 = newPoint_xy(hole1, holeDist, 0);

			hole1.diam = hole2.diam = 18;
			polePar.roundHoles.push(hole1, hole2)
			}
		if (par.topEnd == "забег" && !(params.stairModel == 'П-образная с забегом' && par.marshId !== 1)){
			var flanParams = getFlanParams('flan_pipe_bot');
			var stairAmt = par.stairAmt;
			if (par.botEnd == 'забег') {
				stairAmt -= 1;
			}
			var hole1 = {
				x: (stairAmt - 1) * par.b + params.M / 2 + flanParams.holesDist / 2 - 5, //5 - отступ, пока не пойму какой, но он статичен
				y: (stairAmt) * par.h + par.h_topWnd - params.treadThickness - (flanParams.height - flanParams.holeY) - 2,
			}
			hole1.y -= sidePlate2.position.y;
			//var hole2 = newPoint_xy(hole1, flanParams.holesDist, 0);

			hole1.diam = 18;
			polePar.roundHoles.push(hole1)
		}
		if (par.topEnd == "забег" && par.marshId !== 1 && params.stairModel == 'П-образная с забегом'){
			var hole1 = {
				x: (par.stairAmt) * par.b + params.M / 2 + 76, //76 - расстояние от середины фланца до середины верхнего левого отверстия
				y:  par.h * 2 - params.treadThickness - 142, //142 - расстояние от вершины фланца до середины нижнего отверстия
			}
			//var hole2 = newPoint_xy(hole1, 162, 0);

			hole1.diam = 18;
			polePar.roundHoles.push(hole1)
		}
		
		var stringerPole = drawPolylinePole(polePar).mesh;
		stringerPole.position.z = -params.profileWidth / 2;
		stringerPole.position.x = sidePlate2.position.x;
		stringerPole.position.y = sidePlate2.position.y;
		par.mesh2.add(stringerPole);
	}
	
	/*
		Задаем позиции столбов
	*/
	var columnPosition = calcColumnsPosition({pointsShape: par.pointsShape, marshId: par.marshId});

	/*
		Подложки ступеней
	*/
	{
		par.stepPoints = [];
		
		if (par.botEnd == "пол" && par.topEnd == "забег" && par.stairAmt <= 2 && params.model == "сварной")
			par.pointsShape.unshift(par.pointsShape[par.pointsShape.length - 1]);

		var arr = par.pointsShape.concat();
		arr.shift();

		if ((par.botEnd == "забег" && par.stairAmt > 1 && params.model == "труба"))
			arr.shift();
		if (params.model == "труба" && par.botEnd == "площадка") {
			arr.splice(2, 4); //убираем точки выемки для рамки площадки
			if (par.botConnection) arr.splice(2, 4); //убираем точки выемки для рамки площадки
		}
		//if (par.botEnd == "пол" && par.topEnd == "забег" && par.stairAmt == 1 && params.model == "сварной")
		//	arr.unshift(arr[0]);

		//при большой разнице чистового и чернового пола
		if (par.isBotFloorsDist) arr.splice(1, 1);
		

		var p0 = { x: 0, y: 0, z: -params.stringerThickness / 2 + params.metalThickness };

		var count = par.stairAmt * 2 + 1;
		if (par.botEnd !== "пол") count += 2;
		if (par.topEnd == "забег") count += 2;
		if (params.stairModel == "П-образная с забегом" && par.marshId == 2) count = 9;
		
		if(count > arr.length) count = arr.length; //костыль чтобы убрать фатальную ошибку
		for (var i = 0; i < count; i++) {
			var p1 = newPoint_xy(p0, arr[i].x, arr[i].y);
			par.stepPoints.push(p1);
		}


		//подложки ступеней
		var drawTreadPlate = drawHorPlate; //функция в drawCarcasParts.js
		if (params.model == "труба") drawTreadPlate = drawTreadPlateCabriole2; //функция в drawCarcasParts.js

		var platePar = {
			marshId: par.marshId,
			plateId: 0,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, -1000),
			type: "treadPlate",
			stairAngle: Math.atan(par.h / par.b),
			isSvg: true,
		}

		for (var i = 1; i < par.stepPoints.length - 1; i++) {
			if (i % 2) {
				platePar.plateId += 1;
				platePar.step = par.stepPoints[i + 1].x - par.stepPoints[i].x;
				platePar.h = par.stepPoints[i].y - par.stepPoints[i - 1].y; //параметр для сборных подложек
				platePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -(platePar.step + 150) * i - 1000);
				platePar.hasTrapHole = false;
				platePar.isFirst = false;

				var isPlate = true;
				var basePointShiftX = 0;

				if (par.botEnd == "пол" && i == 1) {
					platePar.isFirst = true;
					if (params.botFloorType === "черновой")
						platePar.h -= params.botFloorsDist - params.flanThickness;
				}
				////подложка промежуточной площадки(нижнего марша)
				if (par.topEnd == "площадка" && i >= par.stepPoints.length - 2) {
					if (params.model == "сварной") {
						platePar.frontOff = 30;
						if (params.stairModel == "П-образная с площадкой" || par.topConnection) {
							if (par.topConnection) {
								platePar.step -= par.stringerLedge;
							}

							var plate = drawHorPlates(platePar).mesh;
							isPlate = false;
						}
						else {
							platePar.step -= ((params.M / 2) / 2 - params.stringerThickness / 2 - params.flanThickness + 5);
						}
					}
					if (params.model == "труба") {
						platePar.isTopNot = true;
						platePar.step = 136;
					    platePar.isPlatform = true;
					}
				}

				//подложка первой и  второй забежной ступени
				if (par.topEnd == "забег" && i >= par.stepPoints.length - 4) {
					//подложка второй забежной ступени
					if (i == par.stepPoints.length - 2) {
						platePar.turnSteps = par.turnSteps.params[2];
						if (params.model == "труба") {
							if (par.stairAmt <= 1)
								platePar.angleIn1 = calcAngleX1(par.pointsShape[0], par.pointsShape[par.pointsShape.length - 1]);
							if (par.stairAmt == 0) platePar.stairAmt = 0;
							var plate = drawTurn2TreadPlateCabriole(platePar).mesh;
						}else {
							if (par.topConnection) platePar.step -= par.stringerLedge;
							if (!par.topConnection) platePar.step += params.M / 4 - params.flanThickness;
							var plate = drawTurnPlate2(platePar).mesh;
						}
					}
					//подложка первой забежной ступени
					if (i == par.stepPoints.length - 4) {
						platePar.turnSteps = par.turnSteps.params[1];
						platePar.hasTrapHole = true;
						if (params.model == "труба") {
							if (par.stairAmt <= 1)
								platePar.angleIn1 = calcAngleX1(par.pointsShape[0], par.pointsShape[par.pointsShape.length - 1]);
							if (par.stairAmt == 0) platePar.stairAmt = 0;
							var plate = drawTurn1TreadPlateCabriole(platePar).mesh;
						}
						else
							var plate = drawTurnPlate1(platePar).mesh;
					}
					isPlate = false;
				}
				//подложка третьей забежной ступени
				if (par.botEnd == "забег" && i <= 3) {
					if (i == 3) {
						platePar.turnSteps = par.turnSteps.params[1];
						if (params.stairModel == "П-образная с забегом" && par.topEnd == "забег")
							platePar.turnSteps = par.turnSteps.params[3];
						if (params.model == "труба") {
							if (par.topEnd == "пол" && par.stairAmt == 1) { //если ступень последняя
								platePar.dStep = params.lastWinderTreadWidth - 50;
								if (params.topAnglePosition == "под ступенью") {
									platePar.isTopNot = true;
									platePar.dStep -= params.treadPlateThickness;
								}
							}
							var plate = drawTurn3TreadPlateCabriole(platePar).mesh;
						}

						if (params.model == "сварной") {
							if (par.stairAmt == 1 && par.lastMarsh)
								platePar.stepWidthLow = params.lastWinderTreadWidth;

							var plate = drawTurnPlate3(platePar).mesh;
						}
					}
					isPlate = false;
				}
				//подложка промежуточной площадки(верхнего марша)
				if (par.botEnd == "площадка" && i == 1) {
					if (params.model == "сварной") {
						if (params.stairModel == "П-образная с площадкой" || par.botConnection) {
							platePar.frontOff = 0;
							basePointShiftX = -(platePar.frontOff + params.flanThickness + 2);
							if (params.stairModel !== "П-образная с площадкой" && par.botConnection)
								basePointShiftX += - par.stringerLedge;
							platePar.step += basePointShiftX ;
							var plate = drawHorPlates(platePar).mesh;
							isPlate = false;
						}
						else {
							basePointShiftX = params.stringerThickness / 2 + params.flanThickness - (params.M / 2) / 2 - 5 - 30;
							platePar.step += basePointShiftX;
						}
					}
					if (params.model == "труба") {
                        isPlate = false;
					}
				}

				//для последней подложки верхнего марша убираем верхний выступ
				if (params.model == "труба") {
					if (par.topEnd == "пол" && i == par.stepPoints.length - 2) {
						platePar.step += params.treadPlateThickness;
						if (params.topAnglePosition == "под ступенью") {
							platePar.isTopNot = true;
							platePar.isTopLast = true;
							platePar.step -= params.treadPlateThickness;
						}
					}
					
				}

				//подложка прямой ступени

				if (isPlate) {					
					var plate = drawTreadPlate(platePar).mesh;
					if (!platePar.isFirst) platePar.isSvg = false;
				}

				if (plate) {
					plate.position.x += sidePlate2.position.x + par.stepPoints[i].x - basePointShiftX;
					plate.position.y += sidePlate2.position.y + par.stepPoints[i].y + 0.005;
					par.treadPlates.add(plate);
				}
			}
		} //конец цикла
	}
	
	/*
		Фланцы и пластины
	*/
	{
        if (params.model == "сварной") {
			//вертикальные пластины
			var platePar = {
				isLong: false,
				marshId: par.marshId,
				plateId: 0,
				stairAngle1: par.marshAngle,
				stringerWidth: par.stringerWidth,
				dxfArr: dxfPrimitivesArr,
                dxfBasePoint: turnFactor == 1 ? dxfBasePoint0 : par.dxfBasePoint,
            }
	        var dxfBasePoint = platePar.dxfBasePoint;
			//Лицевая часть между ступенями
			{
				for (var i = 1; i < par.stepPoints.length - 1; i++) {
					platePar.pointCurrentSvg = copyPoint(par.stepPoints[i]);
					platePar.pointStartSvg = copyPoint(par.stepPoints[0]);

					if (i % 2) {
						var isPlate = true;
						var isDrawPlate = true;
                        platePar.dxfBasePoint = newPoint_xy(dxfBasePoint,
							par.stepPoints[i].x - par.stringerWidth,
							par.stepPoints[i].y + (par.stepPoints[i + 1].x - par.stepPoints[i].x) + 100 * 2);
						platePar.plateId += 1;
						platePar.height = par.stepPoints[i].y - par.stepPoints[i - 1].y;
						platePar.isLong = false;
						if (platePar.plateId % 3 == 0) platePar.isLong = true; //каждая третья пластина длинная
							
						//пластина на забеге не может быть длинной
						if (par.topEnd == "забег" && i == par.stepPoints.length - 2) {
							platePar.isLong = false;
							}
						if (par.topEnd == "забег" && par.botEnd == "забег" && i == par.stepPoints.length - 4) {
							platePar.isLong = false;
						}
						//if (par.botEnd == "забег" && platePar.plateId == 3) {
						//	platePar.stairAngle1 = calcAngleX1(par.pointsShape[1], par.pointsShape[0]);
						//}
						//else {
						//	platePar.stairAngle1 = par.marshAngle;
						//}
						platePar.stairAngle1 = par.marshAngle;
						
						platePar.isFlan = false;
						//вместо пластины делаем фланец соединения косоуров
						if (par.botEnd == "забег" && i == 1) isDrawPlate = false;
						if (par.botEnd !== "пол" && par.botConnection && i == 1) isDrawPlate = false;

						if (isDrawPlate) {
							var plate = drawFrontPlate(platePar).mesh; //функция в drawCarcasParts.js
							plate.rotation.y = -Math.PI / 2;
							plate.position.x += sidePlate2.position.x + par.stepPoints[i].x + params.metalThickness;
							plate.position.y += sidePlate2.position.y + par.stepPoints[i].y;
							plate.position.z += sidePlate2.position.z + params.metalThickness;

							par.mesh2.add(plate)
						}
					}
				}
			}
			// Пластины под ступени
			{
				//горизонтальные пластины каркаса
				var offsetY = 5; //зазор между подложкой ступени и пластиной
				
				for (var i = 1; i < par.stepPoints.length - 1; i++) {
					
					var platePar = {
						plateId: 0,
						marshId: par.marshId,
						dxfArr: dxfPrimitivesArr,
						dxfBasePoint: turnFactor == 1 ? dxfBasePoint0 : par.dxfBasePoint,
						type: "carcasPlate",
					}
					platePar.pointCurrentSvg = copyPoint(par.stepPoints[i]);
					platePar.pointStartSvg = copyPoint(par.stepPoints[0]);
					
					if (i % 2) {
						platePar.plateId += 1;
						platePar.step = par.stepPoints[i + 1].x - par.stepPoints[i].x;
                        platePar.dxfBasePoint = newPoint_xy(platePar.dxfBasePoint,
							par.stepPoints[i + 1].x - par.stringerWidth / 2 - 100,
							par.stepPoints[i - 1].y + par.stringerWidth + 100);
							//platePar.dxfBasePoint.y -= platePar.step + 150;
							platePar.hasTrapHole = false;
							platePar.isTurn2 = false;
							var isPlate = true;
							
							
							if (par.topEnd == "забег" && i >= par.stepPoints.length - 4) {
								//пластина второй забежной ступени(нижнего марша)
								if (i == par.stepPoints.length - 2) {
									platePar.turnSteps = par.turnSteps.params[2];
									platePar.dStep = - params.M / 2 + params.flanThickness + (params.M / 2)  / 2;
									platePar.backOffHoles = par.stringerLedge;
									if (par.topConnection) {
										platePar.backOffHoles = par.stringerLedge;
										platePar.isTurn2Top = true;//наличие второго прямогуольного выреза для закрепления фланца
									}
									if (!par.topConnection) platePar.backOffHoles = -params.M / 4 + params.flanThickness;
								}
								//пластина первой забежной ступени
								if (i == par.stepPoints.length - 4) {
									platePar.hasTrapHole = true;
									platePar.turnSteps = par.turnSteps.params[1];
								}
							}
							//пластина второй забежной ступени(верхнего марша)
							if (par.botEnd == "забег" && i == 1) {
								platePar.turnSteps = par.turnSteps.params[2];
								platePar.isTurn2 = true;
							}
							
							//пластина промежуточной площадки(верхнего марша)
							if (par.botEnd == "площадка" && i == 1) {
								
								if (params.stairModel == "П-образная с площадкой" || par.botConnection) {
									platePar.frontOff = 0;
									platePar.basePointShiftX = -(platePar.frontOff + params.flanThickness + 2);
									if (params.stairModel !== "П-образная с площадкой" && par.botConnection)
									platePar.basePointShiftX += - par.stringerLedge;
									var plate = drawHorPlates(platePar).mesh; //функция в drawCarcasParts.js
									isPlate = false;
								}
								else {
									platePar.basePointShiftX = params.stringerThickness / 2 + params.flanThickness - (params.M / 2) / 2  - 5 - 30;
								}
							}
							
							//пластина промежуточной площадки(нижнего марша)
							if (par.topEnd == "площадка" && i >= par.stepPoints.length - 2) {
								platePar.frontOff = 30;
								if (params.stairModel == "П-образная с площадкой" || par.topConnection) {
									if (par.topConnection) platePar.backOffHoles = par.stringerLedge;
									var plate = drawHorPlates(platePar).mesh; //функция в drawCarcasParts.js
									isPlate = false;
								}
								else {
									platePar.backOffHoles = ((params.M / 2) / 2 - params.stringerThickness / 2 - params.flanThickness + 5);
								}
							}
							
							if (isPlate)
							var plate = drawHorPlate(platePar).mesh; //функция в drawCarcasParts.js			
							plate.position.x = sidePlate2.position.x + par.stepPoints[i].x;
							plate.position.y = sidePlate2.position.y + par.stepPoints[i].y - params.metalThickness - offsetY;
							par.mesh2.add(plate);
						}
					} //конец цикла
			}
			//задняя пластина каркаса(Нижняя)
	        {
				var dxfPoint = copyPoint(dxfBasePoint0);
				if (turnFactor == -1) dxfPoint = copyPoint(par.dxfBasePoint);
				dxfPoint.y -= par.stringerWidth;
				if (par.botEnd == "забег") dxfPoint.y -= par.h * 4;
				if (par.botEnd == "площадка") dxfPoint.y -= par.h * 2;

				var platePar = {
					stringerWidth: par.stringerWidth - 2 * params.metalThickness,
					dxfArr: dxfPrimitivesArr,
					dxfBasePoint: copyPoint(dxfPoint),
					pStart: par.pointsShape[0],
					pEnd: par.pointsShape[par.pointsShape.length - 1],
					stringerLedge: par.stringerLedge,
					topConnection: par.topConnection,
					columnPosition: columnPosition,
					marshId: par.marshId,
				}
				if (par.marshMiddleFix !== "нет") platePar.isHolesColon = true;
				platePar.pointCurrentSvg = copyPoint(par.pointsShape[0]);
				platePar.pointStartSvg = copyPoint(par.pointsShape[1]);

				var isDrawBackPlate = true;
				if (platePar.pStart.x + 5 > platePar.pEnd.x) isDrawBackPlate = false;
		        if (par.botEnd == "пол" && par.topEnd == "забег" && par.stairAmt <= 2) isDrawBackPlate = false;
		        if (isDrawBackPlate) {
			        var plate = drawBackPlate(platePar).mesh;
			        plate.position.x = sidePlate2.position.x + par.pointsShape[0].x;
			        plate.position.y = sidePlate2.position.y + par.pointsShape[0].y;
			        par.mesh2.add(plate);
			        platePar.dxfBasePoint.x += distance(platePar.pEnd, platePar.pStart) + 100;

		        }
	        }
	      

			// Пластина на прямой части каркаса если поворот снизу(снизу каркаса)
			if (par.botEnd !== "пол") {
				platePar.isHolesColon = false;
				if (!(par.botEnd == "забег" || params.stairModel == "П-образная с площадкой"))
					platePar.isHolesColonPlatform = holesColumnPlatform(par, true, false);
				
				platePar.pStart = newPoint_xy(par.pointsShape[1], params.metalThickness, 0);
				if (par.botEnd == "забег" && par.stairAmt == 1)
					platePar.pStart = copyPoint(par.pointsShape[1]);
				var ang = calcAngleX1(par.pointsShape[0], par.pointsShape[par.pointsShape.length - 1]);
				platePar.pEnd = newPoint_xy(par.pointsShape[0], - params.metalThickness * Math.sin(ang), 0);

				dxfBasePointTemp = copyPoint(platePar.dxfBasePoint);
				platePar.dxfBasePoint = newPoint_xy(dxfPoint, - distance(platePar.pEnd, platePar.pStart) - 100, 0);				
				platePar.pointCurrentSvg = copyPoint(platePar.pEnd);
				platePar.pointStartSvg = copyPoint(platePar.pStart);

				var plate = drawBackPlate(platePar).mesh;
				plate.position.x = sidePlate2.position.x + platePar.pStart.x;
				plate.position.y = sidePlate2.position.y + platePar.pStart.y;
				par.mesh2.add(plate);

				platePar.dxfBasePoint = dxfBasePointTemp;
			}

	        // Пластина на прямой части каркаса если поворот сверху(снизу каркаса)
	        if (par.topEnd !== "пол") {
		        var ang1 = calcAngleX1(par.pointsShape[0], par.pointsShape[par.pointsShape.length - 1]);
		        var ang2 = calcAngleX1(par.pointsShape[par.pointsShape.length - 1], par.pointsShape[par.pointsShape.length - 2]);
		        platePar.isHolesColon = false;
		        platePar.isHolesColonPlatform = holesColumnPlatform(par, false, true);
		        //if (par.topEnd == "забег") platePar.isHolesColonPlatform = true;
		        platePar.pStart = newPoint_xy(par.pointsShape[par.pointsShape.length - 1], 0.01, 0);
		        if (par.topEnd == "забег" && ang1 < ang2) {
			        platePar.pStart.x += params.metalThickness * Math.sin(ang2);
		        }
				platePar.pEnd = par.pointsShape[par.pointsShape.length - 2];
				platePar.pointCurrentSvg = copyPoint(platePar.pStart);
				platePar.topPlate = true;

		        var plate = drawBackPlate(platePar).mesh;
		        plate.position.x = sidePlate2.position.x + platePar.pStart.x;
		        plate.position.y = sidePlate2.position.y + platePar.pStart.y;
		        par.mesh2.add(plate);
	        }
			

			par.dxfBasePoint = copyPoint(dxfBasePoint0);
			var dxfBasePoint = newPoint_xy(dxfBasePoint0, 0, -1000);
			var dxfStep = 200;
			
			//нижний фланец (Который крепится к полу)
			if (par.botEnd == "пол") {
				var flanPar = {
					marshId: par.marshId,
					type: "bot", 
					pointsShape: par.pointsShape, 
                    dxfBasePoint: dxfBasePoint,
                    name: "Фланец крепления к полу",
				};
				flanPar.pointCurrentSvg = copyPoint(par.pointsShape[1]);
				flanPar.pointStartSvg = copyPoint(par.pointsShape[1]);
				if (par.isBotFloorsDist) flanPar.isBotFloorsDist = par.isBotFloorsDist;
		
				var flan = drawMonoFlan(flanPar).mesh;
				flan.position.x = sidePlate2.position.x - 5;

				flan.position.y += sidePlate2.position.y;
				par.flans.add(flan);
				
				//нижний фланец-заглушка
				dxfBasePoint.y -= dxfStep;
				var flanPar = {
					marshId: par.marshId,
					type: "botStub",
					pointsShape: par.pointsShape, 
					dxfBasePoint: dxfBasePoint,
				};
				flanPar.pointCurrentSvg = copyPoint(par.pointsShape[1]);
				flanPar.pointStartSvg = copyPoint(par.pointsShape[1]);
				if (par.isBotFloorsDist) flanPar.isBotFloorsDist = par.isBotFloorsDist;
				
				var flan = drawMonoFlan(flanPar).mesh;
				flan.position.x = sidePlate2.position.x + params.metalThickness;
				flan.position.y += sidePlate2.position.y + params.flanThickness;
				par.flans.add(flan);
			}
			
			//Фланцы площадки
			if (par.botEnd === "площадка") {
				dxfBasePoint.y -= dxfStep;
				var flanPar = {
					marshId: par.marshId,
					type: "join",
					pointsShape: par.pointsShape,
                    dxfBasePoint: dxfBasePoint,
                    name: "Фланец площадки крепления к стене",
				};

				//если соединение к стене
				if (par.botConnection && params.stairModel !== "П-образная с площадкой") {
					flanPar.noBolts = true; //болты не добавляются
					flanPar.isCentralHoles = true; //отверстия в центре

					var flan = drawMonoFlan(flanPar).mesh;

					flan.position.x = sidePlate2.position.x - params.flanThickness + par.pointsShape[1].x;
					flan.position.y = sidePlate2.position.y + par.pointsShape[1].y;
					par.flans.add(flan);

					//фланец-заглушка
					var flanPar = {
						type: "joinStub",
						pointsShape: par.pointsShape,
						dxfBasePoint: par.dxfBasePoint,
					};
					flanPar.height = params.stringerThickness - params.metalThickness * 2 - 5;

					var flan = drawMonoFlan(flanPar).mesh;
					flan.position.x = sidePlate2.position.x + par.pointsShape[1].x;
					flan.position.y = sidePlate2.position.y + par.pointsShape[1].y + params.metalThickness;
					par.flans.add(flan);
				}
				//если соединение косоуров
				if (!par.botConnection || params.stairModel == "П-образная с площадкой") {
                    flanPar.name = "Фланец площадки соединения косоуров";
					var flan = drawMonoFlan(flanPar).mesh;
					flan.position.x = sidePlate2.position.x - params.flanThickness + par.pointsShape[1].x;
					flan.position.y = sidePlate2.position.y + par.pointsShape[1].y;
					par.flans.add(flan);

					//усиливающий фланец
					flanPar.type = "joinStrong";
					flanPar.noBolts = true; //болты не добавляются
					var flan2 = drawMonoFlan(flanPar).mesh;
					flan2.position.x = flan.position.x - params.flanThickness - params.metalThickness - 0.1;
					flan2.position.y = flan.position.y + params.metalThickness;
					par.flans.add(flan2);
				}
			}
			//TODO глянуть на забегах
			if(par.botEnd == "забег"){
				var flanPar = {
						marshId: par.marshId,
						type: "joinStub",
						height: 215 - params.metalThickness * 2 - 5,
						pointsShape: par.pointsShape, 
						dxfBasePoint: par.dxfBasePoint,
						};

					flanPar.pointCurrentSvg = newPoint_xy(par.stepPoints[1], -params.stringerThickness - 100, 0);
					flanPar.pointStartSvg = copyPoint(par.stepPoints[0]);
					flanPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, -(params.M / 2 + 45 + params.stringerThickness / 2 + params.stringerThickness), -par.h * 3 - flanPar.height);

					//фланец в косоуре	
					flanPar.noBolts = true; //болты в первом фланце не добавляются
					flanPar.isBolts = true; //болты в первом фланце добавляются с шестигрн.
					var plate = drawMonoFlan(flanPar).mesh;
					plate.position.x = sidePlate2.position.x + par.stepPoints[0].x + params.flanThickness;
					plate.position.y = sidePlate2.position.y + par.stepPoints[0].y + params.metalThickness;
					plate.position.z = -params.stringerThickness / 2 + params.metalThickness;
					plate.rotation.y = -Math.PI / 2;
					par.flans.add(plate);
					
					//усиливающий фланец
					flanPar.noBolts = true; //болты во втором фланце не добавляются
					flanPar.isBolts = false; //болты во втором фланце не добавляются
					flanPar.dxfBasePoint.y += flanPar.height + 50;
					flanPar.pointCurrentSvg = newPoint_xy(par.stepPoints[1], -params.stringerThickness*2 - 100*2, 0);
					flanPar.pointStartSvg = copyPoint(par.stepPoints[0]);

					var plate1 = drawMonoFlan(flanPar).mesh;
					plate1.position.x = plate.position.x - params.flanThickness - params.metalThickness;
					plate1.position.y = plate.position.y;
					plate1.position.z = plate.position.z;
					if (testingMode && turnFactor == -1 && params.stairModel == 'П-образная с забегом') {
						plate1.position.x -= 0.01;
					}
					plate1.rotation.y = -Math.PI / 2;
					par.flans.add(plate1);
				}
			
			//Верхние фланцы
            if (par.topEnd !== "пол") {
                dxfBasePoint = newPoint_xy(par.dxfBasePoint, par.keyPoints.topPoint.x + 100, par.keyPoints.topPoint.y)

                if (par.topConnection || params.stairModel == "П-образная с площадкой") {
					//dxfBasePoint.y -= dxfStep;
					var flanPar = {
						marshId: par.marshId,
						type: "join", 
						pointsShape: par.pointsShape, 
                        dxfBasePoint: dxfBasePoint,
                        name: "Фланец площадки крепления к стене",
                    };
					//если соединение к стене
					if (par.topConnection ) {
						if (par.topEnd === "забег") flanPar.height = 215.0;
						flanPar.noBolts = true; //болты не добавляются
						flanPar.isCentralHoles = true; //отверстия в центре
						flanPar.pointCurrentSvg = newPoint_xy(par.stepPoints[par.stepPoints.length - 1], 100, 0);
						flanPar.pointStartSvg = copyPoint(par.stepPoints[0]);

						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x;
						flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y;

						par.flans.add(flan);

						
						//фланец-заглушка
						var flanPar = {
							marshId: par.marshId,
							type: "joinStub",
							pointsShape: par.pointsShape,
							dxfBasePoint: dxfBasePoint,
						};
						if (par.topEnd === "забег") flanPar.height = 215 - params.metalThickness * 2 - 5;
						if (par.topEnd === "площадка") flanPar.height = params.stringerThickness - params.metalThickness * 2 - 5;
						flanPar.pointCurrentSvg = newPoint_xy(par.stepPoints[par.stepPoints.length - 1], 100, 0);
						flanPar.pointStartSvg = copyPoint(par.stepPoints[0]);

						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x - params.flanThickness;
						flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y + params.metalThickness;
						par.flans.add(flan);
					}
					
					//если соединение косоуров
                    if (!par.topConnection && params.stairModel !== 'П-образная с площадкой') {
                        flanPar.name = "Фланец площадки соединения косоуров";
						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x;
						flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y;
						par.flans.add(flan);

						//усиливающий фланец
						flanPar.type = "joinStrong";
						flanPar.noBolts = true; //болты не добавляются
						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x + params.metalThickness + params.flanThickness + 0.01;
						flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y + params.metalThickness;
						par.flans.add(flan);
					}
					if (!par.topConnection && params.stairModel == 'П-образная с площадкой' && par.marshId == 1) {
                        var pointId = par.pointsShape.length - 2;
						var platePar = {
								isLong: false,
								marshId: par.marshId,
								plateId: 0,
								stairAngle1: par.marshAngle,
								//stringerWidth: params.stringerWidth + params.metalThickness * 2,
								dxfArr: dxfPrimitivesArr,
								dxfBasePoint: par.dxfBasePoint,
								height: params.stringerThickness - 20 - 5 - params.metalThickness * 2, //пластина рисуется на 20мм длиннее
								}
						
							var plate = drawFrontPlate(platePar).mesh; //функция в drawCarcasParts.js
							plate.rotation.y = -Math.PI / 2;
							plate.position.x += sidePlate2.position.x + par.pointsShape[pointId - 1].x;
							plate.position.y += sidePlate2.position.y + par.pointsShape[pointId - 1].y - 5 - params.metalThickness;
							plate.position.z += sidePlate2.position.z + params.metalThickness;
						
							par.mesh2.add(plate)
					}
				}else {
					//Фланец соединения косоуров
					if (par.topEnd == 'площадка' && !par.lastMarsh) {
						var flanPar = {
							type: "join",
							pointsShape: par.pointsShape, 
                            dxfBasePoint: dxfBasePoint,
                            name: "Фланец площадки соединения косоуров",
                        };
						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x;
						flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y;
						par.flans.add(flan);
						
						//усиливающий фланец
						flanPar.type = "joinStrong";
						flanPar.noBolts = true; //болты не добавляются
						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x + params.metalThickness + params.flanThickness + 0.01;
						flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y + params.metalThickness;
						par.flans.add(flan);
					}
					//Фланец крепления к перекрытию
					if (par.topEnd == 'площадка' && par.lastMarsh) {
						var flanPar = {
							type: "top", 
							pointsShape: par.pointsShape, 
                            dxfBasePoint: dxfBasePoint,
                            name: "Фланец крепления к перекрытию",
						};
		
						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x;
						flan.position.y += sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y + params.stringerThickness;// -flanParams.height +holOffZapTop;
		
						par.flans.add(flan);
		
						//верхний фланец-заглушка
						dxfBasePoint.y -= dxfStep;
						var flanPar = {
							type: "topStub",
							pointsShape: par.pointsShape,
							dxfBasePoint: dxfBasePoint,
						};
		
						var flan = drawMonoFlan(flanPar).mesh;
						flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x - params.flanThickness;
						flan.position.y += sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y + params.stringerThickness;// + params.metalThickness;// -flan2Params.height -offsetY -params.metalThickness;
		
						par.flans.add(flan);
					}
					//Забег оканчивается не в другом каркасе, по этому заглушка
					if (par.topEnd == 'забег') {
						var pointId = par.pointsShape.length - 2;
						var platePar = {
								isLong: false,
								marshId: par.marshId,
								plateId: 0,
								stairAngle1: par.marshAngle,
								dxfArr: dxfPrimitivesArr,
								dxfBasePoint: dxfBasePoint,
								height: 215 - 20 - 5 - params.metalThickness * 2.5, //пластина рисуется на 20мм длиннее
								isBack: true,
						}
						platePar.pointCurrentSvg = copyPoint(par.pointsShape[pointId - 1]);
						platePar.pointStartSvg = copyPoint(par.pointsShape[0]);
						
							var plate = drawFrontPlate(platePar).mesh; //функция в drawCarcasParts.js
							plate.rotation.y = -Math.PI / 2;
							plate.position.x += sidePlate2.position.x + par.pointsShape[pointId - 1].x;
							plate.position.y += sidePlate2.position.y + par.pointsShape[pointId - 1].y - 5 - params.metalThickness;
							plate.position.z += sidePlate2.position.z + params.metalThickness;
						
							par.mesh2.add(plate)
					}	
				}
			}
			if (par.topEnd == "пол") {
				dxfBasePoint = newPoint_xy(par.dxfBasePoint, par.keyPoints.topPoint.x + 100, par.keyPoints.topPoint.y)

				var flanPar = {
					marshId: par.marshId,
					type: "top", 
					pointsShape: par.pointsShape,
                    dxfBasePoint: dxfBasePoint,
					name: "Фланец крепления к перекрытию",
				};
				flanPar.pointCurrentSvg = newPoint_xy(par.stepPoints[par.stepPoints.length - 1], 50, 0);
				flanPar.pointStartSvg = copyPoint(par.stepPoints[0]);0

				var flan = drawMonoFlan(flanPar).mesh;
				flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x;
				flan.position.y += sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y;// -flanParams.height +holOffZapTop;

				par.flans.add(flan);

				//верхний фланец-заглушка
				dxfBasePoint.y -= dxfStep;
				var flanPar = {
					marshId: par.marshId,
					type: "topStub", 
					pointsShape: par.pointsShape,
					dxfBasePoint: dxfBasePoint,
				};
				flanPar.pointCurrentSvg = newPoint_xy(par.stepPoints[par.stepPoints.length - 1], 50, 0);
				flanPar.pointStartSvg = copyPoint(par.stepPoints[0]);

				var flan = drawMonoFlan(flanPar).mesh;
				flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x - params.flanThickness;
				flan.position.y += sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y;// -flan2Params.height -offsetY -params.metalThickness;

				par.flans.add(flan);
			}
		}
	
		if (params.model == "труба") {
			par.dxfBasePoint = copyPoint(dxfBasePoint0);
			var dxfBasePoint = newPoint_xy(dxfBasePoint0, 0, -1000);
			var dxfStep = 200;
			//нижний фланец
			if (par.botEnd == "пол") {
				dxfBasePoint.y -= dxfStep;
                var flanPar = {
                    marshId: par.marshId,
                    name: "Фланец крепления к полу",
                    dxfBasePoint: dxfBasePoint, //базовая точка для вставки контуров в dxf файл                 
					};
				
				var ang = calcAngleX1(par.pointsShape[0], par.pointsShape[par.pointsShape.length - 1]);

				flanPar.heightPipe = params.profileHeight / Math.sin(ang);
				flanPar.height = flanPar.heightPipe + (par.pointsShape[0].x - par.pointsShape[1].x);
				flanPar.height += - params.sidePlateOverlay / Math.sin(ang) - (params.flanThickness - 3) / Math.tan(ang) + params.treadPlateThickness;
				flanPar.heightPipe += 1;

				//при большой разнице чистового и чернового пола
				if (par.isBotFloorsDist) {
					flanPar.heightPipe = params.profileHeight;
					flanPar.height = flanPar.heightPipe + (par.pointsShape[1].x - par.pointsShape[2].x);
					flanPar.height += - params.sidePlateOverlay;
					flanPar.heightPipe += 1;
					flanPar.height += 2;
				}

				var flan = drawFlanPipeBot(flanPar).mesh;
				flan.position.x = sidePlate2.position.x + params.treadPlateThickness;
				flan.position.y = sidePlate2.position.y;
				flan.rotation.x = Math.PI / 2;
				flan.rotation.y = Math.PI;
				flan.rotation.z = Math.PI / 2;

				par.flans.add(flan);
			}

			if (par.botEnd !== "пол") {
				if (!par.botConnection || par.botEnd === "забег") {
					//фланец площадки соединения косоуров
					dxfBasePoint.y -= dxfStep;
                    var flanPar = {
                        marshId: par.marshId,
                        name: "Фланец площадки соединения косоуров",
						dxfBasePoint: dxfBasePoint, //базовая точка для вставки контуров в dxf файл
				};
					flanPar.isWndTurn = false; //является ли поворот забежным
					if (par.botEnd == "забег") {
						flanPar.isWndTurn = true;
						//сдвигаем 3 отверстие чтобы болт не пересекался с трубой
						flanPar.offsetTopWndHoleY3 = 0;
						if (par.offsetTopWndHoleY3) flanPar.offsetTopWndHoleY3 = par.offsetTopWndHoleY3;
					}
					flanPar.isBolts = true; //добавляем болты

					flanPar = drawFlanPipeBot(flanPar);
				
					var flan = flanPar.mesh;
					//левый верхний угол накладки
					var topLeftPt = copyPoint(par.pointsShape[2]);
					if (par.botEnd === "забег") topLeftPt = copyPoint(par.pointsShape[3]);
					if (par.botEnd === "забег" && par.topEnd == "пол" && par.stairAmt == 1) topLeftPt = copyPoint(par.pointsShape[2]);
					if (par.botEnd === "забег" && par.topEnd == 'забег' && params.stairModel !== 'П-образная трехмаршевая') topLeftPt = copyPoint(par.pointsShape[2]);
					if (par.botEnd === "площадка") topLeftPt.y += params.treadPlateThickness;

					flan.position.x = sidePlate2.position.x - params.flanThickness + topLeftPt.x;
					flan.position.y = sidePlate2.position.y + topLeftPt.y;// + 60 + params.sidePlateOverlay + par.pointsShape[2].x;
					flan.position.z = sidePlate2.position.z - flanPar.width / 2 + params.profileWidth / 2 + params.metalThickness;
					flan.rotation.z = Math.PI;
					flan.rotation.y = Math.PI / 2;
					par.flans.add(flan);
				}else {
					//Фланец соединения промежуточной площадки к стене
					dxfBasePoint.y -= dxfStep;
					var flanPar = {
						type: "joinProf", //ширина фланца
						pointsShape: par.pointsShape,
						stringerHeight: par.pointsShape[1].y - par.pointsShape[2].y,
                        dxfBasePoint: dxfBasePoint,
						marshId: par.marshId,
                        name: "Фланец площадки крепления к стене",
					};

					flanPar.topEnd = "площадка";
					var flan = drawMonoFlan(flanPar).mesh;
					flan.position.x = sidePlate2.position.x + par.pointsShape[1].x - params.flanThickness;
					flan.position.y = sidePlate2.position.y + par.pointsShape[1].y - flanPar.height - (par.pointsShape[1].y - par.pointsShape[2].y);
					par.flans.add(flan);
				}
			}
			
			//верхний фланец
			if (par.topEnd !== "пол") {
				if (par.topConnection) {
					//Фланец соединения промежуточной площадки к стене
					var i = par.pointsShape.length - 2;
					if (par.topEnd === "забег") i = par.pointsShape.length - 3;
					if (par.topEnd === "забег" && par.stairAmt == 1) i = par.pointsShape.length - 2;
					dxfBasePoint.y -= dxfStep;
					var flanPar = {
						type: "joinProf", //ширина фланца
						pointsShape: par.pointsShape,
						stringerHeight: par.pointsShape[i].y - par.pointsShape[i - 1].y,
						dxfBasePoint: dxfBasePoint,
						marshId: par.marshId,
                        name: "Фланец площадки крепления к стене",
					};

					flanPar.topEnd = par.topEnd;

					var flan = drawMonoFlan(flanPar).mesh;
					flan.position.x = sidePlate2.position.x + par.pointsShape[i].x;
					flan.position.y += sidePlate2.position.y + par.pointsShape[i].y - flanPar.height - (par.pointsShape[i].y - par.pointsShape[i - 1].y);
					par.flans.add(flan);
				}
				else {
					dxfBasePoint.y -= dxfStep;
					if (par.topEnd == 'забег') {
						var pointId = par.pointsShape.length - 3;
						var platePar = {
								isLong: false,
								marshId: par.marshId,
								plateId: 0,
								stairAngle1: par.marshAngle,
								//stringerWidth: params.stringerWidth + params.metalThickness * 2,
								dxfArr: dxfPrimitivesArr,
								dxfBasePoint: par.dxfBasePoint,
								height: -par.pointsShape[pointId].y + par.pointsShape[pointId - 1].y - params.sidePlateOverlay - 20, //20 не пойму где прибавляется
						}
							platePar.pointCurrentSvg = copyPoint(par.stepPoints[i]);
							platePar.pointStartSvg = copyPoint(par.stepPoints[0]);
							
							var plate = drawFrontPlate(platePar).mesh; //функция в drawCarcasParts.js
							plate.rotation.y = -Math.PI / 2;
							plate.position.x += sidePlate2.position.x + par.pointsShape[pointId - 1].x;
							plate.position.y += sidePlate2.position.y + par.pointsShape[pointId - 1].y;
							plate.position.z += sidePlate2.position.z + params.metalThickness;
							
							par.mesh2.add(plate)
					}	
					if (par.topEnd !== 'забег') {
						//фланец площадки соединения косоуров
						var flanPar = {
							dxfBasePoint: dxfBasePoint, //базовая точка для вставки контуров в dxf файл
						};
						flanPar.isBolts = true; //добавляем болты
						
						flanPar = drawFlanPipeBot(flanPar);
						
						var flan = flanPar.mesh;
						var i = par.pointsShape.length - 2;
						flan.position.x = sidePlate2.position.x + par.pointsShape[i].x + params.flanThickness;
						flan.position.y = sidePlate2.position.y + par.pointsShape[i].y + params.sidePlateOverlay + flanPar.height - flanPar.heightPipe + 1;// + 60 +  + ;
						// flan.position.z = sidePlate2.position.z + 160 + params.flanThickness / 2 + 1;
						flan.position.z = sidePlate2.position.z + params.metalThickness + params.profileWidth + flanPar.holeX * 2 + 1;// 1 отступ от края отверстия
						flan.rotation.z = Math.PI;
						flan.rotation.y = -Math.PI / 2;
						par.flans.add(flan);
					}
				}
			}
			
			if (par.topEnd == "пол") {
				//Верхний фланец соединения верхнего марша к стене
				dxfBasePoint.y -= dxfStep;
				var flanPar = {
					pointsShape: par.pointsShape,
                    dxfBasePoint: dxfBasePoint, //базовая точка для вставки контуров в dxf файл
					marshId: par.marshId,
                    name: "Фланец крепления к перекрытию",
				};

				var dy = params.topHolePos + 20 * 2 + 20;
				if (params.topAnglePosition === "под ступенью")
					dy = 20 + 20 - params.treadThickness;

				flanPar.marshAngle = par.marshAngle;

				flanPar = drawFlanPipeTop(flanPar);

				var flan = flanPar.mesh;
				flan.position.x = sidePlate2.position.x + par.pointsShape[par.pointsShape.length - 2].x;
				flan.position.y = sidePlate2.position.y + par.pointsShape[par.pointsShape.length - 2].y - flanPar.height + dy;
				flan.position.z += sidePlate2.position.z + params.profileWidth / 2 + params.metalThickness;
				par.flans.add(flan);
			}
		}
	}
	
	/*Опоры*/

	par.dxfBasePoint.y = -10000;
	
	var unitsPos = par.unitsPosObject.turn1; //Точка поворота марша
	if (par.marshId == 2 && params.stairModel == 'П-образная с забегом') unitsPos = par.unitsPosObject.turn2;
	if (par.marshId == 3 && params.stairModel == 'П-образная с забегом') unitsPos = par.unitsPosObject.marsh3;
	if (par.marshId == 3 && params.stairModel == 'П-образная с площадкой') unitsPos = par.unitsPosObject.turn1;
	if (par.marshId == 2 && params.stairModel == 'П-образная трехмаршевая') unitsPos = par.unitsPosObject.marsh2;
	if (par.marshId == 3 && params.stairModel == 'П-образная трехмаршевая') unitsPos = par.unitsPosObject.marsh3;
	
	/*Опоры*/
	var columnParams_all = {
		pointsShape: par.pointsShape,
		marshId: par.marshId,
		columnHoles: columnHoles,
		unitsPos: unitsPos
	};
    calcColumnParams(columnParams_all);

    var countColon = 0;
    var isSvgBot = false;
    if (par.marshId == 1) {
        isSvgBot = true;
        for (var i = 0; i < columnParams_all.columns.length; i++) {
            if (columnParams_all.columns[i].type == "колонна") countColon += 1;
        }
    }

    //Параметры колонны
    var columnParams = {
        profSize: columnParams_all.profSize,
        dxfArr: dxfPrimitivesArr,
        dxfBasePoint: par.dxfBasePoint,
        marshId: par.marshId,
        countColon: countColon,
        isSvgBot: isSvgBot,
    }


    for (var i = 0; i < columnParams_all.columns.length; i++) {
		var currentColumn = columnParams_all.columns[i];//Текущая колонна
		if (currentColumn.isVisible) {
			columnParams.topAngle = currentColumn.topAngle;
			columnParams.length = currentColumn.length;
			columnParams.type = currentColumn.type;
			columnParams.topFlan = true;
			
			column = drawColumn(columnParams).mesh;
			column.position.x += sidePlate2.position.x + currentColumn.position.x;
			column.position.y += sidePlate2.position.y + currentColumn.position.y;
			if (currentColumn.position.z) column.position.z -= currentColumn.position.z;
			if (currentColumn.rotation) column.rotation.y += currentColumn.rotation;
            par.mesh2.add(column);
            columnParams.isSvgBot = false;
		}
	}
	
	//линия между верхней и нижней точками
	var stringerLen = 0;
	if(par.keyPoints.botPoint && par.keyPoints.topPoint){
		var trashShape = new THREE.Shape();
		var layer = "comments";
		addLine(trashShape, dxfPrimitivesArr, par.keyPoints.botPoint, par.keyPoints.topPoint, dxfBasePoint0, layer);
		stringerLen = distance(par.keyPoints.botPoint, par.keyPoints.topPoint);
		}
		
	//сохраняем данные для спецификации	
	var partName = "stringer";
	if (typeof specObj != 'undefined'){
		if (!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				area: 0,
				sumLength: 0,
				name: "Косоур ",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
			}
		}
		var name = par.marshId + " марш L=" + Math.round(stringerLen);
		var area = stringerLen * (300 * 2 + params.stringerThickness * 2.5) / 1000000;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["sumLength"] += stringerLen / 1000;		
	}

	par.dxfBasePoint = copyPoint(dxfBasePoint2);

	return par;
}

/** функция отрисовывает косоур площадки*/

function drawPltStringer(par) {
	par.mesh1 = new THREE.Object3D();
	par.mesh2 = new THREE.Object3D();
	par.flans = new THREE.Object3D();
	par.treadPlates = new THREE.Object3D();

	//par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, 5000);

	var extrudeOptions = {
		amount: params.metalThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};


	if (params.model == "сварной") {
		//боковые накладки косоура
		var text = "Боковые пластины косоура " + params.metalThickness + "мм. (2 ед.)";
		var textHeight = 25;
		var textBasePoint = newPoint_xy(par.dxfBasePoint, -20, -120);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

		var p0 = { x: 0, y: 0 };
		var p1 = newPoint_xy(p0, 0, params.stringerThickness);
		var p2 = newPoint_xy(p1, par.length, 0);
		var p3 = newPoint_xy(p2, 0, -params.stringerThickness);

		par.pointsShape = [p0, p1, p2, p3];

		var shapePar = {
			points: par.pointsShape,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
		}

		//отверстия для соединения косоуров
		var p = newPoint_xy(p2, - params.M / 2 + params.flanThickness, -params.stringerThickness / 2);
		if (params.carcasConfig == "002" || params.carcasConfig == "004") p.x += 50;
		if (par.stringerLedge) p.x -= par.stringerLedge;
		var center1 = newPoint_xy(p, params.stringerThickness / 2 + 35.0, params.stringerThickness / 2 - 25);
		var center2 = newPoint_xy(p, params.stringerThickness / 2 + 35.0, -params.stringerThickness / 2 + 25);
		var center3 = newPoint_xy(p, -params.stringerThickness / 2 - 35.0, params.stringerThickness / 2 - 25);
		var center4 = newPoint_xy(p, -params.stringerThickness / 2 - 35.0, -params.stringerThickness / 2 + 25);

		par.pointsHole = [];
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);
		par.pointsHole.push(center3);
		par.pointsHole.push(center4);

		//внутренняя накладка
		var shape1 = drawShapeByPoints2(shapePar).shape;
		par.stringerShape = shape1;
		if (!par.isNotHoles) drawStringerHoles(par);
		var geom = new THREE.ExtrudeGeometry(shape1, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var sidePlate1 = new THREE.Mesh(geom, params.materials.metal);

		//наружная накладка
		shapePar.dxfBasePoint.y += params.stringerThickness + 50;
		var shape2 = drawShapeByPoints2(shapePar).shape;
		par.stringerShape = shape2;
		if (!par.isNotHoles) drawStringerHoles(par);
		var geom = new THREE.ExtrudeGeometry(shape2, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var sidePlate2 = new THREE.Mesh(geom, params.materials.metal);

		sidePlate1.position.y = sidePlate2.position.y = -params.stringerThickness;
		sidePlate1.position.z = params.stringerThickness / 2 - params.metalThickness;
		sidePlate2.position.z = -params.stringerThickness / 2;

		par.mesh1.add(sidePlate1);
		par.mesh1.add(sidePlate2);

		/*верхняя и нижняя пластина косоура*/
		var p0 = { x: 0, y: 0 };
		var p1 = newPoint_xy(p0, 0, params.stringerThickness - params.metalThickness * 2);
		var p2 = newPoint_xy(p1, par.length, 0);
		var p3 = newPoint_xy(p2, 0, -(params.stringerThickness - params.metalThickness * 2));

		var shapePar = {
			points: [p0, p1, p2, p3],
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(shapePar.dxfBasePoint, 0, params.stringerThickness + 50),
		}

		//верхняя пластина косоура
		if (!par.isTreadPlate) {
			var shapeTop = drawShapeByPoints2(shapePar).shape;

			//прямогуольные вырезы в верхней пластине для закрепления фланцев
			if (params.stairModel == "П-образная с площадкой") {
				if (!par.isReversBolt) {
					//первый прямогуольный вырез
					var pt = newPoint_xy(p0, -params.stringerThickness / 2 + params.M + params.marshDist, p1.y / 2);
					var pt1 = newPoint_xy(pt, - 100, -params.stringerThickness / 2 + 30);
					var pt2 = newPoint_xy(pt, - 100, params.stringerThickness / 2 - 30);
					var pt3 = newPoint_xy(pt, 100, params.stringerThickness / 2 - 30);
					var pt4 = newPoint_xy(pt, 100, -params.stringerThickness / 2 + 30);
					var holeParams = {
						vertexes: [pt1, pt2, pt3, pt4],
						cornerRad: 10.0,
						dxfPrimitivesArr: dxfPrimitivesArr,
						dxfBasePoint: shapePar.dxfBasePoint
					}
					shapeTop.holes.push(topCoverCentralHole(holeParams));

					//второй прямогуольный вырез
					var pt = newPoint_xy(p0, 30 + 50, p1.y / 2);
					var pt1 = newPoint_xy(pt, - 50, -params.stringerThickness / 2 + 30);
					var pt2 = newPoint_xy(pt, - 50, params.stringerThickness / 2 - 30);
					var pt3 = newPoint_xy(pt, 150, params.stringerThickness / 2 - 30);
					var pt4 = newPoint_xy(pt, 150, -params.stringerThickness / 2 + 30);
					var holeParams = {
						vertexes: [pt1, pt2, pt3, pt4],
						cornerRad: 10.0,
						dxfPrimitivesArr: dxfPrimitivesArr,
						dxfBasePoint: shapePar.dxfBasePoint
					}
					shapeTop.holes.push(topCoverCentralHole(holeParams));
				}

				//для дополнительного куска if (params.carcasConfig == "003" || params.carcasConfig == "004")
				if (par.isReversBolt) {
					//прямогуольный вырез
					var pt = newPoint_xy(p3, - 30 - 50, p1.y / 2);
					var pt1 = newPoint_xy(pt, 50, -params.stringerThickness / 2 + 30);
					var pt2 = newPoint_xy(pt, 50, params.stringerThickness / 2 - 30);
					var pt3 = newPoint_xy(pt, -150, params.stringerThickness / 2 - 30);
					var pt4 = newPoint_xy(pt, -150, -params.stringerThickness / 2 + 30);
					var holeParams = {
						vertexes: [pt4, pt3, pt2, pt1],
						cornerRad: 10.0,
						dxfPrimitivesArr: dxfPrimitivesArr,
						dxfBasePoint: shapePar.dxfBasePoint
					}
					shapeTop.holes.push(topCoverCentralHole(holeParams));
				}
			}

			var geom = new THREE.ExtrudeGeometry(shapeTop, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var sidePlateTop = new THREE.Mesh(geom, params.materials.metal);
		}
		if (par.isTreadPlate) {
			//подложки ступеней
			var platePar = {
				plateId: 0,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, -1000),
				type: "treadPlate",
			}
			if (par.backOffHoles) platePar.backOffHoles = par.backOffHoles;
			platePar.step = par.pointsShape[2].x - par.pointsShape[1].x;
			platePar.frontOff = 0;
			var basePointShiftX = -(platePar.frontOff + params.flanThickness + 2);
			platePar.step += basePointShiftX;
			var plate = drawHorPlates(platePar).mesh;
			plate.position.x = -basePointShiftX;
			par.treadPlates.add(plate);


			//верхняя пластина косоура
			var platePar = {
				plateId: 0,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, par.length + params.stringerThickness / 2 + 50, 0),
				type: "carcasPlate",
			}
			if (par.backOffHoles) platePar.backOffHoles = par.backOffHoles;
			platePar.step = par.pointsShape[2].x - par.pointsShape[1].x;
			platePar.frontOff = 0;
			platePar.basePointShiftX = -(platePar.frontOff + params.flanThickness + 2);
			var sidePlateTop = drawHorPlates(platePar).mesh;
			sidePlateTop.rotation.x = Math.PI / 2;
			sidePlateTop.position.z = params.stringerThickness / 2 - params.metalThickness;
		}

		sidePlateTop.position.y = -5;
		sidePlateTop.position.z += -params.stringerThickness / 2 + params.metalThickness;
		sidePlateTop.rotation.x += Math.PI / 2;
		par.mesh2.add(sidePlateTop);

		//нижняя пластина косоура
		shapePar.dxfBasePoint.y += params.stringerThickness + 50;
		var shapeBot = drawShapeByPoints2(shapePar).shape;
		par.stringerShape = shapeBot;

		//отверстия под фланец колонны
		if (par.isColonPlatformBackTop) {
			var pcenter = newPoint_xy(p3, -(220 / 2 - params.flanThickness),(params.stringerThickness - params.metalThickness * 2) / 2);
			drawHolesColumn(par, pcenter, 0);
		}
		if (par.isColonPlatformBackTop1) {
			var pcenter = newPoint_xy(p0, (220 / 2 - params.flanThickness), (params.stringerThickness - params.metalThickness * 2) / 2);
			drawHolesColumn(par, pcenter, 0);
		}
		if (par.isColonPlatformMiddleTop) {
			var pcenter = newPoint_xy(p1, (params.M  - params.flanThickness + params.marshDist - params.stringerThickness/2), -(params.stringerThickness - params.metalThickness * 2) / 2);
			drawHolesColumn(par, pcenter, 0);
		}

		var geom = new THREE.ExtrudeGeometry(shapeBot, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var sidePlateBot = new THREE.Mesh(geom, params.materials.metal);
		sidePlateBot.position.y = -params.stringerThickness + params.metalThickness;
		sidePlateBot.position.z = -params.stringerThickness / 2 + params.metalThickness;
		sidePlateBot.rotation.x = Math.PI / 2;
		par.mesh2.add(sidePlateBot);

		/*ФЛАНЦЫ*/
		//фланец соединения косоруров
		var flanPar = {
			type: "join",
			pointsShape: par.pointsShape,
			dxfBasePoint: par.dxfBasePoint,
		};
		if (par.isReversBolt) flanPar.noBolts = true; //болты не добавляются

		var flan = drawMonoFlan(flanPar).mesh;
		flan.position.x = sidePlate2.position.x - params.flanThickness;
		flan.position.y = sidePlate2.position.y;
		par.flans.add(flan);

		//фланец соединения косорура к стене
		if (!par.isNotFlan) {
			var flanPar = {
				type: "join",
				pointsShape: par.pointsShape,
				dxfBasePoint: par.dxfBasePoint,
			};
			if (!par.isReversBolt) flanPar.noBolts = true; //болты не добавляются

			var flan = drawMonoFlan(flanPar).mesh;
			flan.position.x = sidePlate2.position.x + par.pointsShape[2].x;
			flan.position.y = sidePlate2.position.y; // + par.pointsShape[2].y;
			par.flans.add(flan);
		}
		//если нет фланца соединения косорура к стене, делаем заднюю пластину
		if (par.isNotFlan) {
			var p0 = { x: 0, y: 0 };
			var p1 = newPoint_xy(p0, 0, params.stringerThickness - params.metalThickness * 2 - 5);
			var p2 = newPoint_xy(p1, params.stringerThickness - params.metalThickness * 2, 0);
			var p3 = newPoint_xy(p2, 0, -(params.stringerThickness - params.metalThickness * 2 - 5));

			var shapePar = {
				points: [p0, p1, p2, p3],
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: newPoint_xy(shapePar.dxfBasePoint, 0, params.stringerThickness + 150),
			}
			var shapeBack = drawShapeByPoints2(shapePar).shape;
			var geom = new THREE.ExtrudeGeometry(shapeBack, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var sidePlateBack = new THREE.Mesh(geom, params.materials.metal);
			sidePlateBack.position.x = sidePlate2.position.x + par.pointsShape[2].x - params.metalThickness;
			sidePlateBack.position.y = sidePlate2.position.y + params.metalThickness;
			sidePlateBack.position.z = sidePlate2.position.z + params.stringerThickness - params.metalThickness;
			sidePlateBack.rotation.y = Math.PI / 2;
			par.mesh2.add(sidePlateBack);
		}

	}

	if (params.model == "труба") {
		//боковые накладки косоура
		var text = "Боковые пластины косоура " + params.metalThickness + "мм. (2 ед.)";
		var textHeight = 25;
		var textBasePoint = newPoint_xy(par.dxfBasePoint, -20, -120);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

		var h_1 = 60 + params.sidePlateOverlay - params.treadPlateThickness; // высота задней кромки
		var framePlatformWidth = params.M - 300; //ширина рамки площадки
		var framePlatformThickness = 30; //толщина рамки площадки

		var p0 = { x: 0, y: 0 };
		var p1 = newPoint_xy(p0, 0, h_1);
		var p2 = newPoint_xy(p1, par.length, 0);
		var p3 = newPoint_xy(p2, 0, -h_1);

		var len = (framePlatformWidth - framePlatformThickness) / 2;//расстояние от оси марша до оси паза под рамку
		var len1 = params.profileWidth / 2 + params.metalThickness + params.flanThickness;//расстояние до оси нижнего марша
		var len2 = params.M + params.marshDist - len1;//расстояние до оси верхнего марша


		par.pointsShape = [p0, p1];
		//добавляем точки прорези для рамок площадки
		if (params.carcasConfig == "001" || params.carcasConfig == "002") {
			addPointsRecessFramePlatform(newPoint_xy(p1, len - len1, 0), "platform", par);
			addPointsRecessFramePlatform(newPoint_xy(p1, len2 - len, 0), "platform", par);
			if (params.carcasConfig == "001")
				addPointsRecessFramePlatform(newPoint_xy(p1, len2 + len, 0), "platform", par);
		}
		if (params.carcasConfig == "003" || params.carcasConfig == "004") {
			var pt = copyPoint(p1);
			if (par.stringerLedge) pt.x += par.stringerLedge;
			len1 = params.M / 2 - params.flanThickness;
			len2 = params.M + params.marshDist + len1;
			addPointsRecessFramePlatform(newPoint_xy(pt, len1 - len, 0), "platform", par);
			addPointsRecessFramePlatform(newPoint_xy(pt, len1 + len, 0), "platform", par);
			addPointsRecessFramePlatform(newPoint_xy(pt, len2 - len, 0), "platform", par);
			if (params.carcasConfig == "003")
				addPointsRecessFramePlatform(newPoint_xy(pt, len2 + len, 0), "platform", par);
		}

		par.pointsShape.push(p2);
		par.pointsShape.push(p3);

		var shapePar = {
			points: par.pointsShape,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
		}

		//наружная накладка
		par.stringerShap = drawShapeByPoints2(shapePar).shape;
		var geom = new THREE.ExtrudeGeometry(par.stringerShap, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var sidePlate2 = new THREE.Mesh(geom, params.materials.metal);

		//внутренняя накладка
		//добавление площадки под фланец соединения косоуров
		if (params.carcasConfig !== "002") {
			if (params.carcasConfig == "003") {
				var pt = newPoint_xy(p0, len2, 0);
				if (par.stringerLedge) pt.x += par.stringerLedge;
				var pt5 = newPoint_xy(pt, (params.profileWidth + 140 + 2) / 2, 0);
				var pt6 = newPoint_xy(pt5, 0, -(params.profileHeight - params.sidePlateOverlay));
				var pt8 = newPoint_xy(pt, -(params.profileWidth + 140 + 2) / 2, 0);
				var pt7 = newPoint_xy(pt8, 0, -(params.profileHeight - params.sidePlateOverlay));

				par.pointsShape.push(pt5);
				par.pointsShape.push(pt6);
				par.pointsShape.push(pt7);
				par.pointsShape.push(pt8);
			}


			if (params.carcasConfig == "001") {
				var pt = newPoint_xy(p0, len2, 0);
			}
			if (params.carcasConfig == "003" || params.carcasConfig == "004") {
				var pt = newPoint_xy(p0, len1, 0);
				if (par.stringerLedge) pt.x += par.stringerLedge;
			}

			var pt1 = newPoint_xy(pt, (params.profileWidth + 140 + 2) / 2, 0);
			var pt2 = newPoint_xy(pt1, 0, -(params.profileHeight - params.sidePlateOverlay));
			var pt4 = newPoint_xy(pt, -(params.profileWidth + 140 + 2) / 2, 0);
			var pt3 = newPoint_xy(pt4, 0, -(params.profileHeight - params.sidePlateOverlay));

			par.pointsShape.push(pt1);
			par.pointsShape.push(pt2);
			par.pointsShape.push(pt3);
			par.pointsShape.push(pt4);

			shapePar.points = par.pointsShape;
		}

		par.stringerShape = drawShapeByPoints2(shapePar).shape;

		//отверстия под фланец соединения косоуров
		if (params.carcasConfig !== "002") {
			var center1 = newPoint_xy(pt1, -40, -20 + h_1 + params.treadPlateThickness);
			var center2 = newPoint_xy(pt2, -40, 20);
			var center3 = newPoint_xy(pt3, 40, 20);
			var center4 = newPoint_xy(pt4, 40, -20 + h_1 + params.treadPlateThickness);

			center1.rad = center2.rad = center3.rad = center4.rad = 9;
			par.pointsHole = [];
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			par.pointsHole.push(center3);
			par.pointsHole.push(center4);

			if (params.carcasConfig == "003") {
				var center1 = newPoint_xy(pt5, -40, -20 + h_1 + params.treadPlateThickness);
				var center2 = newPoint_xy(pt6, -40, 20);
				var center3 = newPoint_xy(pt7, 40, 20);
				var center4 = newPoint_xy(pt8, 40, -20 + h_1 + params.treadPlateThickness);

				center1.rad = center2.rad = center3.rad = center4.rad = 9;
				par.pointsHole.push(center1);
				par.pointsHole.push(center2);
				par.pointsHole.push(center3);
				par.pointsHole.push(center4);
			}

			drawStringerHoles(par);


		}

		var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var sidePlate1 = new THREE.Mesh(geom, params.materials.metal);



		sidePlate1.position.y = sidePlate2.position.y = -h_1;
		sidePlate1.position.z = (params.stringerThickness / 2 - params.metalThickness)*turnFactor;
		sidePlate2.position.z = -params.stringerThickness / 2 * turnFactor;
		sidePlate1.position.z -= params.metalThickness * (1 - turnFactor) * 0.5;
		sidePlate2.position.z -= params.metalThickness * (1 - turnFactor) * 0.5;

		par.mesh1.add(sidePlate1);
		par.mesh1.add(sidePlate2);


		//отрисовка профильной трубы
		if (params.model == "труба") {
			var sidePlateOverlayPlatform = 7;
			var offset = params.flanThickness - 3;
			var stringerPoints = [];

			var pt0 = newPoint_xy(p0, - offset, - params.profileHeight + sidePlateOverlayPlatform);
			var pt1 = newPoint_xy(pt0, 0, params.profileHeight);
			var pt3 = newPoint_xy(p3, offset, - params.profileHeight + sidePlateOverlayPlatform);
			var pt2 = newPoint_xy(pt3, 0, params.profileHeight);

			stringerPoints.push(pt0, pt1, pt2, pt3);
			
			var shapePar = {
				points: stringerPoints,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: par.dxfBasePoint,
			}
			var shape = drawShapeByPoints2(shapePar).shape;
			par.stringerShape = shape;
			// отверстие под крепление каркаса
			{
				var pipeFlanParams = getFlanParams('flan_pipe_bot');//Получаем параметры фланца
				if (params.carcasConfig == '001' || params.carcasConfig == '003') {
					var holeDist = pipeFlanParams.holesDist; //Расстояние между отверстиями
					var hole1 = newPoint_xy(pt2, -params.M / 2 - holeDist / 2 + 3, -params.profileHeight + params.flanThickness + pipeFlanParams.holeY);//фланец ниже пластины на 2
					var hole2 = newPoint_xy(hole1, holeDist, 0);
					hole1.rad = hole2.rad = 9;
					par.pointsHole = [];
					par.pointsHole.push(hole1);
					par.pointsHole.push(hole2);
					drawStringerHoles(par);
				}

				if (params.carcasConfig == '003' || params.carcasConfig == '004') {
					var holeDist = pipeFlanParams.holesDist; //Расстояние между отверстиями
					var hole1 = newPoint_xy(pt1, params.M / 2 - holeDist / 2 - 3, -params.profileHeight + params.flanThickness + pipeFlanParams.holeY)//3 - на столько труба не до ходит до края площадки
					var hole2 = newPoint_xy(hole1, holeDist, 0);
					hole1.rad = hole2.rad = 9;
					par.pointsHole = [];
					par.pointsHole.push(hole1);
					par.pointsHole.push(hole2);
					drawStringerHoles(par);
				}
			}
			
			var extrudeOptions1 = {
				amount: params.profileWidth,
				bevelEnabled: false,
				curveSegments: 12,
				steps: 1
			};
			var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions1);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringerPole = new THREE.Mesh(geom, params.materials.tread);

			stringerPole.position.z = -params.profileWidth / 2;
			stringerPole.position.x = sidePlate2.position.x;
			stringerPole.position.y = sidePlate2.position.y;
			par.mesh2.add(stringerPole);
		}


		/*ФЛАНЦЫ*/
		//фланец соединения косоруров
		if (params.carcasConfig == "001" || params.carcasConfig == "002") {
			var flanPar = {
				dxfBasePoint: dxfBasePoint, //базовая точка для вставки контуров в dxf файл
			};
			flanPar.isBolts = true; //добавляем болты

			flanPar = drawFlanPipeBot(flanPar);

			var flan = flanPar.mesh;
			flan.position.x = sidePlate2.position.x - params.flanThickness;
			flan.position.y = sidePlate2.position.y + 60 + params.sidePlateOverlay;
			flan.position.z = sidePlate2.position.z - params.profileWidth / 2 - params.flanThickness + 1;
			if (turnFactor == -1)
				flan.position.z = sidePlate1.position.z - params.profileWidth / 2 - params.flanThickness + 1;
			flan.rotation.z = Math.PI;
			flan.rotation.y = Math.PI / 2;
			par.flans.add(flan);
		}
		if (params.carcasConfig == "003" || params.carcasConfig == "004") {
			var flanPar = {
				type: "joinProf",
				pointsShape: par.pointsShape,
				dxfBasePoint: par.dxfBasePoint,
				stringerHeight: p2.y,
			};
			flanPar.noBolts = true; //болты не добавляются
			flanPar.topEnd = "площадка";

			var flan = drawMonoFlan(flanPar).mesh;
			flan.position.x = sidePlate2.position.x - params.flanThickness;
			flan.position.y = sidePlate2.position.y + p2.y - flanPar.height;
			console.log(p2, '----------------------------------------------------------')
			par.flans.add(flan);
		}

		//фланец соединения косорура к стене
		if (params.carcasConfig == "001" || params.carcasConfig == "003") {
			var flanPar = {
				type: "joinProf",
				pointsShape: par.pointsShape,
				dxfBasePoint: par.dxfBasePoint,
				stringerHeight: p2.y,
			};
			flanPar.noBolts = true; //болты не добавляются
			flanPar.topEnd = "площадка";

			var flan = drawMonoFlan(flanPar).mesh;
			flan.position.x = sidePlate2.position.x + p2.x;
			flan.position.y = sidePlate2.position.y + p2.y - flanPar.height;
			par.flans.add(flan);
		}
		if (params.carcasConfig == "002" || params.carcasConfig == "004") {
			//фланец соединения косоруров
			var flanPar = {
				dxfBasePoint: dxfBasePoint, //базовая точка для вставки контуров в dxf файл
			};
			flanPar.isBolts = true; //добавляем болты

			flanPar = drawFlanPipeBot(flanPar);

			var flan = flanPar.mesh;
			flan.position.x = sidePlate2.position.x + p2.x;
			flan.position.y = sidePlate2.position.y + 60 + params.sidePlateOverlay;
			flan.position.z = sidePlate2.position.z - params.profileWidth / 2 - params.flanThickness + 1;
			if (turnFactor == -1) flan.position.z = sidePlate1.position.z - params.profileWidth / 2 - params.flanThickness + 1;
			flan.rotation.z = Math.PI;
			flan.rotation.y = Math.PI / 2;
			if (params.model == 'труба') {
				flan.rotation.y = -Math.PI / 2;
				flan.position.x += params.flanThickness;
				flan.position.z = sidePlate2.position.z + params.metalThickness + params.profileWidth + flanPar.holeX * 2 + 1;// 1 отступ от края отверстия
				if (turnFactor == -1) flan.position.z = sidePlate2.position.z + flanPar.holeX * 2 + 1;
			}
			par.flans.add(flan);
		}
	}

	par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, par.length + 1000, 0);
	
	//сохраняем данные для спецификации	
	var partName = "stringer";
	if (typeof specObj != 'undefined'){
		if (!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				area: 0,
				sumLength: 0,
				name: "Косоур ",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
			}
		}
		var name = " прям. L=" + Math.round(par.length);
		var area = par.length * (300 * 2 + params.stringerThickness * 2.5) / 1000000;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["sumLength"] += par.length / 1000;		
	}

	return par;
}

/** старая  функция отрисовывает две боковые проставки для 2-го типа каркаса на забеге
dxfBasePoint - 
*/
function drawWndStringerExtension(par){
	
	par.mesh = new THREE.Object3D();
	par.flans = new THREE.Object3D();
	
	var flanThk = 8;
	
	
	//верхняя проставка
	var bracePar = {
		len: (params.M - params.stringerThickness) / 2 - flanThk + params.stringerLedge1,
		dxfBasePoint: par.dxfBasePoint,
		}
	var brace = drawSideStringerBrace(bracePar);
	brace.mesh.position.x = brace.flans.position.x = -100; // 100 - подогнано
	brace.mesh.position.y = brace.flans.position.y = -65; // 65 - подогнано
	if(turnFactor == -1) brace.mesh.position.y = brace.flans.position.y -= params.h3;
	brace.mesh.position.z = brace.flans.position.z = -params.M / 2 + 100; //100 - отступ от дальней стены
	par.mesh.add(brace.mesh);
	par.flans.add(brace.flans);
	
	//нижняя проставка
	var bracePar = {
		len: (params.M - params.stringerThickness) / 2 - flanThk + params.stringerLedge1,
		dxfBasePoint: par.dxfBasePoint,
		}
	var brace = drawSideStringerBrace(bracePar);
	brace.mesh.position.x = brace.flans.position.x = -100; // 100 - подогнано
	brace.mesh.position.y = brace.flans.position.y =  - params.h3 - 65; // 65 - подогнано
	if(turnFactor == -1) brace.mesh.position.y = brace.flans.position.y += params.h3;
	brace.mesh.position.z = brace.flans.position.z = params.M / 2 - 160; //160 - отступ от переднего края первой забежной ступени
	par.mesh.add(brace.mesh);
	par.flans.add(brace.flans);
	
	return par;

} //end of drawWndStringerExtension


/** старая функция отрисовывает боковую распорку для 2-го типа каракаса на забеге
базовая точка - центр фланца крепления к косоуру
*/

function drawSideStringerBrace(par){
	par.mesh = new THREE.Object3D();
	par.flans = new THREE.Object3D();
	
	var flanThk = 8;

	//тело проставки
	var polePar = {
		poleProfileY: 100,
		poleProfileZ: 100,
		dxfBasePoint: par.dxfBasePoint,
		length: par.len - flanThk,
		poleAngle: 0,
		angStart: 0,
		angEnd: 0,
		material: params.materials.metal,
		partName: "stringerPart",
		roundHoles: [],
		}

	var pole = drawPole3D_4(polePar).mesh;
		pole.position.x = -polePar.length - flanThk / 2;
		pole.position.z = 0;
		pole.position.y = -polePar.poleProfileY;
		
		par.mesh.add(pole);
		
	//фланец к стене
		var flanPar = {
			type: "botColon",
			profSize: polePar.poleProfileY,
			pointsShape: par.pointsShape,
			dxfBasePoint: par.dxfBasePoint,
		};
		flanPar.noBolts = true; //болты не добавляются
		var flan = drawMonoFlan(flanPar).mesh;
		flan.rotation.y = -Math.PI / 2
		flan.position.x = pole.position.x + flanThk / 2;
		flan.position.y = pole.position.y - 49; //49 - подогнано
		flan.position.z = pole.position.z + 149; // 149 - подогнано
		par.flans.add(flan);
	
	//фланец к косоуру
		flanPar.noBolts = false; //болты добавляются
		var flan = drawMonoFlan(flanPar).mesh;
		flan.rotation.y = -Math.PI / 2
		flan.position.x = pole.position.x + flanThk / 2 + polePar.length;
		flan.position.y = pole.position.y - 49; //49 - подогнано
		flan.position.z = pole.position.z + 149; // 149 - подогнано
		par.flans.add(flan);
		
	return par;
	
}//end of drawSideStringerBrace

/*расчет параметров косоура*/

function calcStringerPar(par) {

	/*функция добавляет во входящий объект следующие параметры косоура/тетивы:
	h
	b
	a
	stairAmt
	botEnd
	topEnd
	rectHoleSize
	turnLength
	
	исходные данные:
	marshId
	*/

	var marshParams = getMarshParams(par.marshId);

	//тип верхнего и нижнего поворотов
	par.botEnd = marshParams.botTurn;
	par.topEnd = marshParams.topTurn;

	par.h = marshParams.h;
	par.b = marshParams.b;
	par.a = marshParams.a;
	par.marshAngle = Math.atan(par.h / par.b);
	if (par.topEnd !== "пол") marshParams.stairAmt += 1;
	if (par.botEnd == "забег") marshParams.stairAmt += 1;
	if (params.stairModel == "П-образная с забегом" && par.marshId == 2) marshParams.stairAmt = 0;
	par.stairAmt = marshParams.stairAmt;
	par.h_topWnd = marshParams.h_topWnd;
	par.lastMarsh = marshParams.lastMarsh;

	calcStringerConnection(par); //Рассчитываем тип соединения
	calcColumnLogicParams(par); //Рассчитываем параметры колонн

	if (params.stairModel == "П-образная с забегом" && par.marshId == 2) {
		par.botEnd = "забег";
		par.topEnd = "забег";
		par.h = params.h3;
	}

	par.rectHoleSize = 10.5; //размер квадратного отверстия накладок

	par.stringerWidth = params.stringerThickness;
	if (params.model == "труба") par.stringerWidth = params.profileWidth;


	if (params.stairModel == "Г-образная с площадкой" || params.stairModel == "Г-образная с забегом") {
		par.stringerLedge = params.stringerLedge1;
	}
	if (params.stairModel == "П-образная трехмаршевая" || params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
		if (par.marshId == 1) {
			par.stringerLedge = params.stringerLedge1;
		}
		if (par.marshId !== 1) {
			par.stringerLedge = params.stringerLedge2;
		}
	}

	//длина поворота
	if (params.model == "сварной") {
		if (par.topConnection) {
			if (par.topEnd == "площадка") {
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 1) par.stringerLedge1 = params.stringerLedge1;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2) par.stringerLedge1 = params.stringerLedge2;
				par.topEndLength = params.M - (par.a - par.b - 45) + par.stringerLedge - params.flanThickness;
			}
			if (par.topEnd == "забег") par.topEndLength = 0;
			if (par.topEnd == "забег" && par.marshId == 2 && params.stairModel == 'П-образная трехмаршевая') par.topEndLength = -36;
		}
		if (!par.topConnection) {
			if (par.topEnd == "площадка") {
				par.topEndLength = params.M / 2 - params.stringerThickness / 2 - params.flanThickness - 5 - 0.01;
				//if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 1)
				//	par.topEndLength -= 40;
			}

			if (par.topEnd == "забег")
				par.topEndLength = -(params.M - params.stringerThickness) / 2 + 150;
				if (par.topEndLength < 220) {
					par.topEndLength = -20;//Корректируем размер участка, чтобы вместился фланец
				}
		}

		if (par.botConnection) {
			if (par.botEnd == "площадка") {
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2)
					par.stringerLedge = params.stringerLedge1;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 3)
					par.stringerLedge = params.stringerLedge2;

				par.botEndLength = params.M + par.stringerLedge - params.flanThickness + 0.01;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 1)
					par.botEndLength += params.marshDist + 5;
			}
			// if (par.botEnd == "забег" && par.topEnd !== 'забег')// && params.stairModel !== 'П-образная с забегом')
			// 	// par.topEndLength = 0;
		}
		if (!par.botConnection) {
			if (par.botEnd == "площадка") {
				par.botEndLength = params.M / 2 - params.stringerThickness / 2 - params.flanThickness;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 1)
					par.botEndLength += params.marshDist + 5;
			}
			// if (par.botEnd == "забег" && par.topEnd !== 'забег')//&& params.stairModel !== 'П-образная с забегом')
			// 	par.topEndLength = -50;
		}

		if (params.stairModel == "П-образная с площадкой") {
			if (par.topConnection)
				par.topEndLength = params.platformLength_1 + 50 - (par.a - par.b) + par.stringerLedge - params.flanThickness;
			if (!par.topConnection)
				par.topEndLength = params.platformLength_1 - 50 - (par.a - par.b);

			par.botEndLength = (params.platformLength_1 + 50) / 2 - params.stringerThickness / 2 - params.flanThickness;
		}

		if (params.platformTop == "площадка" && (par.marshId == 3 || params.stairModel == "Прямая"))
			par.topEndLength = params.platformLength_3 - (par.a - par.b) - params.flanThickness;
	}

	if (params.model == "труба") {
		if (par.topConnection) {
			if (par.topEnd == "площадка") {
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 1)
					par.stringerLedge1 = params.stringerLedge1;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2)
					par.stringerLedge1 = params.stringerLedge2;
				par.topEndLength = params.M - (par.a - par.b - 45 + params.treadPlateThickness * 2) + par.stringerLedge - params.flanThickness;
			}
			if (par.topEnd == "забег") par.topEndLength = 0;
		}
		if (!par.topConnection) {
			if (par.topEnd == "площадка") {
				par.topEndLength = (params.M - params.profileWidth) / 2 - params.flanThickness - params.metalThickness - params.treadPlateThickness * 2  - 5;
				//if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 1)
				//	par.topEndLength -= 50;
			}
			if (par.topEnd == "забег")
				par.topEndLength = -(params.M - params.stringerThickness) / 2 + 150;
		}

		if (par.botConnection) {
			if (par.botEnd == "площадка") {
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2)
					par.stringerLedge = params.stringerLedge1;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 3)
					par.stringerLedge = params.stringerLedge2;

				par.botEndLength = params.M + par.stringerLedge - params.flanThickness + params.treadPlateThickness * 2;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 1)
					par.botEndLength += params.marshDist + 5;
			}
			// if (par.botEnd == "забег" && par.topEnd !== 'забег')
			// 	par.topEndLength = 0;
		}
		if (!par.botConnection) {
			if (par.botEnd == "площадка") {
				par.botEndLength = (params.M - params.profileWidth) / 2 - params.flanThickness - params.metalThickness + params.treadPlateThickness * 2;
				if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 2 && par.stairAmt == 1)
					par.botEndLength += params.marshDist + 5;
			}
			// if (par.botEnd == "забег" && par.topEnd !== 'забег')
			// 	par.topEndLength = -50;
		}

		if (params.stairModel == "П-образная с площадкой") {
			par.botEndLength = params.platformLength_1;
			if (par.topConnection) {
				par.topEndLength = params.platformLength_1 + par.stringerLedge - params.flanThickness - params.treadPlateThickness * 2;
			}
			if (!par.topConnection) {
				par.topEndLength = (params.platformLength_1 - 50 - params.profileWidth) / 2 - params.flanThickness - params.metalThickness - params.treadPlateThickness*2;
			}

			if (par.botConnection) {
				par.botEndLength = params.platformLength_1 + par.stringerLedge - params.flanThickness + params.treadPlateThickness * 2 + 50;
			}
			if (!par.botConnection)
				par.botEndLength = (params.platformLength_1 + 50 - params.profileWidth) / 2 - params.metalThickness - params.flanThickness + params.treadPlateThickness * 2;
		}

		if (params.platformTop == "площадка" && par.lastMarsh)
			par.topEndLength = params.platformLength_3 - (par.a - par.b) - params.treadPlateThickness * 2 - params.flanThickness;
	}
	
	// par.topEndLength = 1050 - 167;
	//костыль для совместимости со старыми функциями
	par.dxfBasePointGap = 100;
//console.log(par.topConnection, par.marshId)
	return par;
}


/**
	Рассчитываем наличие соединения на марше
	@param - marshId
	
	@return - добавляет во входящий объект рассчитанные параметры
*/
function calcStringerConnection(par){
	var marshParams = getMarshParams(par.marshId);
	var botEnd = marshParams.botTurn;
	var topEnd = marshParams.topTurn;
	
	par.topConnection = false;
	par.botConnection = false;

	if (params.stairModel == "Г-образная с площадкой" || params.stairModel == "Г-образная с забегом") {
		if (params.carcasConfig == "001") {
			par.topConnection = true;
			par.botConnection = false;
			}
		if (params.carcasConfig == "002") {
			par.topConnection = false;
			par.botConnection = true;
		}
	}

	if (params.stairModel == "П-образная трехмаршевая") {
		if (par.marshId == 1) {
			par.topConnection = false;
			if (params.carcasConfig == "001" || params.carcasConfig == "002") par.topConnection = true;
		}
		if (par.marshId == 2) {
			par.topConnection = false;
			par.botConnection = false;
			if (params.carcasConfig == "001" || params.carcasConfig == "003") par.topConnection = true;
			if (params.carcasConfig == "003" || params.carcasConfig == "004") par.botConnection = true;
		}
		if (par.marshId == 3) {
			par.botConnection = false;
			if (params.carcasConfig == "002" || params.carcasConfig == "004") par.botConnection = true;
		}
	}
	if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
		if (par.marshId == 1) {
			if (params.carcasConfig == "001" || params.carcasConfig == "002") par.topConnection = true;
			if (params.carcasConfig == "003" || params.carcasConfig == "004") par.topConnection = false;

			if (params.carcasConfig == "001" || params.carcasConfig == "003") par.botConnection = false;
			if (params.carcasConfig == "002" || params.carcasConfig == "004") par.botConnection = true;
		}
		if (par.marshId !== 1) {
			if (params.carcasConfig == "001" || params.carcasConfig == "002") par.topConnection = true;
			if (params.carcasConfig == "003" || params.carcasConfig == "004") par.topConnection = false;

			if (params.carcasConfig == "001" || params.carcasConfig == "003") par.botConnection = false;
			if (params.carcasConfig == "002" || params.carcasConfig == "004") par.botConnection = true;
			if (par.marshId == 2 && (params.carcasConfig == '002' || params.carcasConfig == '004')) par.topConnection = false;
			if (par.marshId == 2 && (params.carcasConfig == '003' || params.carcasConfig == '001')) par.topConnection = true;
		}
	}
	if (params.platformTop == "площадка" && (par.marshId == 3 || params.stairModel == "Прямая"))
		par.topConnection = false;

	return par
}
