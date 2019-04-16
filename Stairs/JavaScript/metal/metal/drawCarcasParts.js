function drawCarcasAngles(holes, side){

	//функция отрисовыает массив уголков косоура/тетивы
	
	var mesh = new THREE.Object3D();

	for(var i=0; i<holes.length-1; i++){
		
		var anglePar = {
			p1: copyPoint(holes[i]),
			p2: copyPoint(holes[i+1]),
			}
		//дополнительные параметры, передаваемые в координате базового отверстия
		anglePar.p1.pos = holes[i].pos;
		anglePar.p1.hasAngle = holes[i].hasAngle;
		anglePar.p1.rotated = holes[i].rotated;
		anglePar.p1.isMiddleFlanHole = holes[i].isMiddleFlanHole;
		anglePar.p1.noBoltsInSide1 = holes[i].noBoltsInSide1;
		anglePar.p1.noBoltsInSide2 = holes[i].noBoltsInSide2;
		anglePar.p1.noBoltsInSide1_1 = holes[i].noBoltsInSide1_1;
		anglePar.p1.noBoltsInSide1_2 = holes[i].noBoltsInSide1_2;
		anglePar.p1.noBoltsInSide2_1 = holes[i].noBoltsInSide2_1;
		anglePar.p1.noBoltsInSide2_2 = holes[i].noBoltsInSide2_2;
		
		var drawAngle = false;
		if(anglePar.p1.hasAngle === true) drawAngle = true;
		if(params.model == "лт" && !hasTreadFrames()) {
			drawAngle = true;
			if(anglePar.p1.hasAngle === false) drawAngle = false;
			}
		
		if(drawAngle){
			getAngleModel(anglePar);
			var carcasAnglePar = {
				model: anglePar.model,
				side: side,
				pos: holes[i].pos,
			}
			
			//нет болтов в грани 1
			if(anglePar.p1.noBoltsInSide1) carcasAnglePar.noBoltsInSide1 = true;
			if(anglePar.p1.noBoltsInSide1_1) carcasAnglePar.noBoltsInSide1_1 = true;
			if (anglePar.p1.noBoltsInSide1_2) carcasAnglePar.noBoltsInSide1_2 = true;

			//нет болтов в грани 2
			if (anglePar.p1.noBoltsInSide2) carcasAnglePar.noBoltsInSide2 = true;
			if (anglePar.p1.noBoltsInSide2_1) carcasAnglePar.noBoltsInSide2_1 = true;
			if (anglePar.p1.noBoltsInSide2_2) carcasAnglePar.noBoltsInSide2_2 = true;
			
			var angle = drawCarcasAngle(carcasAnglePar);
			angle.rotation.z = anglePar.rot;
			
			angle.position.x = anglePar.p1.x;
			angle.position.y = anglePar.p1.y;
			//уголок крепления к нижнему маршу
			if(anglePar.p1.rotated && anglePar.model == "У4-60х60х100"){
				angle.rotation.z += Math.PI;
				angle.position.y += 60;
				}
			//смещаем уголок на толщину фланца
			if(anglePar.p1.isMiddleFlanHole){
				angle.position.z = params.stringerThickness + 0.01;
				if(side == "right") angle.position.z = -params.stringerThickness - 0.01;
				}
			mesh.add(angle)
			i++; //пропускаем следующее отверстие
			}
		}

    return mesh;    

} //end of drawCarcasAngles

function getAngleModel(par){
	/*функция подбирает уголок каркаса по координатам двух отверстий
	дополнительные параметры сохранены в доп. полях p1
	*/
	
	var holeDist = Math.round(distance(par.p1, par.p2) * 100) / 100;

	//Ориентация уголка
	var rot = angle(par.p1, par.p2);
	
	var model = "У4-60х60х100";
	if(holeDist == 180) model = "У2-40х40х230";
	if(holeDist == 150) model = "У2-40х40х200";
	if(holeDist == 110) model = "У2-40х40х160";
	if(holeDist == 50) model = "У2-40х40х90";
    
	//уголки крепления к перекрытиям
	if(holeDist == 60){
		if(par.p1.pos == "topFloor") model = "У4-70х70х100";
		if(par.p1.pos == "botFloor") {
			model = "У4-70х70х100";
			if(params.bottomAngleType == "регулируемая опора") model = "У5-60х60х100";
			}
		}
	
	//возвращаемый объект
	par.holeDist = holeDist;
	par.rot = rot;
	par.model = model;
	
} // end of getAngleModel

/**отрисовывает уголок и позиционирует его с привязкой к центру отверстия
*@param model
*@param side
*@param noBoltsInSide1
*@param noBoltsInSide2
*/
function drawCarcasAngle(par){
	var mesh = new THREE.Object3D();

	var angle = drawAngleSupport(par);
	if(par.model == "У2-40х40х230" ||
		par.model == "У2-40х40х200" ||
		par.model == "У2-40х40х160" ||
		par.model == "У2-40х40х90"){
			angle.rotation.x = Math.PI / 2;
			angle.position.x = -angle.dimensions.holePos.x;
			angle.position.y = angle.dimensions.holePos.y;
			if(par.side == "right"){
				angle.rotation.z = Math.PI;
				angle.position.x = angle.dimensions.holePos.x + angle.dimensions.holeDist2;
				
				}
			}

	if (par.model == "У4-70х70х100" || 
		par.model == "У4-60х60х100" || 
		par.model == "У5-60х60х100"){
			angle.position.x = -angle.dimensions.holePos.x;
			angle.position.y = -angle.dimensions.holePos.y;
			if(par.side == "right"){
				angle.rotation.y = Math.PI;
				angle.position.x = angle.dimensions.holePos.x + angle.dimensions.holeDist1;
				}
			}
	

	mesh.add(angle);
	
	if(par.model == "У5-60х60х100"){
		var leg = drawAdjustableLeg(false);
		leg.position.x = -20;
		leg.position.y = -30;
		if(par.side == "right") leg.position.z = -74;
		mesh.add(leg);
		}

	return mesh;
}



/**
 * Задний и промежуточный косоур промежуточной площадки для П-образной
 */
function drawPltStringer(par) {

	par.pointsShape = [];
	par.pointsHole = [];
	par.railingHoles = [];
	
	//отверстия под ограждения
	par.elmIns = {};
	par.elmIns[par.key] = {};
	par.elmIns[par.key].racks = [];
	par.elmIns[par.key].longBolts = [];
	
	//рассчитываем параметры косоура по номеру марша
	calcStringerPar(par); //функция в файле drawCarcasParts.js
	
	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};
	
	par.stringerWidthPlatform = calcPltStringerWidth();	
	
	var plateLen = params.M * 2 + params.marshDist;
	//var shiftHoleY = -65;
	//if(params.model == "ко") shiftHoleY = -95;
	var shiftHoleY = par.carcasAnglePosY;
	if (params.model == "ко") shiftHoleY -= par.stringerWidthPlatform - 150;

	if (params.model == "ко") {
		plateLen -= params.sideOverHang * 2;
		//отступ отверстия под средний уголок
		var offsetHole1 = params.M - params.stringerThickness - params.sideOverHang * 2 - 30;
		//оступ отверстия под крайний уголок
		var shiftHoleX = 30.0 + params.stringerThickness;
		var distanceHole = 50; //расстояние между отверстиями для уголков крепления покрытия площадки у2-90

		// передняя тетива площадки
		if (par.key == "front") {
			if (params.stringerDivision == "нет") plateLen -= params.stringerThickness;
			if (params.stringerDivision2 == "нет") plateLen -= params.stringerThickness;
		}
	}


	if (params.model == "лт") {
		if (!hasTreadFrames() && par.key == "front") par.stringerWidthPlatform = 105.0;
		
		var shiftHoleX = 30.0;
		var distanceHole = 150; //расстояние между отверстиями для уголков крепления покрытия площадки у2-200
		if(params.M < 620) distanceHole = 110;
		var offsetHole1 = params.M - params.stringerThickness - 30;
		
		// задняя тетива площадки
		if (par.key == "rear") {
			shiftHoleX += params.stringerThickness;			
			}
			
		// передняя тетива площадки	
		if (par.key == "front") {
			plateLen -= params.stringerThickness * 2;			
			offsetHole1 -= params.stringerThickness;
			shiftHoleY = -20;
			}
		}
		
			

	
	var plateWidth = par.stringerWidthPlatform; 
	
	var p0 = { "x": 0.0, "y": 0.0 };
	var p1 = newPoint_xy(p0, 0.0, -plateWidth);
	var p2 = newPoint_xy(p1, plateLen, 0.0);
	var p3 = newPoint_xy(p2, 0.0, plateWidth);
	//par.pointsShape.push(p0, p1, p2, p3);
	par.pointsShape.push(p1, p0, p3, p2);
	
	//сохраняем точки для отладки
	par.keyPoints[par.key].end1 = p3;
	par.keyPoints[par.key].end2 = p0;
	
	// отверстия под левый крепежный уголок
	var center1 = newPoint_xy(p0, shiftHoleX, shiftHoleY);
	if (par.key == "front" && params.model == "ко" && params.stringerDivision == "нет")
		center1.x -= params.stringerThickness;
	var center2 = newPoint_xy(center1, 0.0, -60.0);
    center1.hasAngle = center2.hasAngle = false;
    if (par.key == "front") {
        center1.noZenk = center2.noZenk = true;
    }
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// отверстия под правый крепежный уголок 
	var center1 = newPoint_xy(p3, -shiftHoleX, shiftHoleY);
	if (par.key == "front" && params.model == "ко" && params.stringerDivision2 == "нет")
		center1.x += params.stringerThickness;
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
    if (par.key == "front") {
        center1.noZenk = center2.noZenk = true;
    }
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// отверстия под средние крепежные уголки
	var center1 = newPoint_xy(p0, offsetHole1, shiftHoleY);
	if (par.key == "front" && params.model == "ко" && params.stringerDivision == "нет")
		center1.x -= params.stringerThickness;
	var center2 = newPoint_xy(center1, 0.0, -60.0);
    center1.hasAngle = center2.hasAngle = false;
    if (par.key == "front") {
        center1.noZenk = center2.noZenk = true;
    }
    par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	var center1 = newPoint_xy(p3, -offsetHole1, shiftHoleY);
	if (par.key == "front" && params.model == "ко" && params.stringerDivision2 == "нет")
		center1.x += params.stringerThickness;
	var center2 = newPoint_xy(center1, 0.0, -60.0);
    center1.hasAngle = center2.hasAngle = false;
    if (par.key == "front") {
        center1.noZenk = center2.noZenk = true;
    }
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);	

	//отверстия под опорные уголки площадки
	var columnProf = 0;
	if (params.columnModel != "нет" && par.key == "rear") {
		columnProf = 100;
		if (params.columnModel == "40х40") par.profWidth = 40;
		}
		
		
	var angleOffset = 120; //Отступ уголка от края тетивы / косоура
	var mm = params.M - params.stringerThickness - params.stringerThickness;
	if (params.model == "ко") mm -= params.sideOverHang * 2;	
	var shiftHolePlY = shiftHoleY;
	if (params.model == "ко") shiftHolePlY = -20;
	
	var hasAngles = false;
	if(params.model == "ко" && par.key == "rear") hasAngles = true;
	if(params.model == "лт" && !hasTreadFrames()) hasAngles = true;
	
	if (hasAngles && params.platformLength_1 > 650){
		//уголок нижнего марша ближе к внешней стороне
		var center1 = newPoint_xy(p0, angleOffset + columnProf, shiftHolePlY);
		var center2 = newPoint_xy(center1, distanceHole, 0.0);
		center1.hasAngle = center2.hasAngle = true;
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);
		
		//сохраняем точку
		var center_t = copyPoint(center2)

		//уголок нижнего марша ближе к внутренней стороне
		
		var center1 = newPoint_xy(p0, mm - angleOffset, shiftHolePlY);
		var center2 = newPoint_xy(center1, -distanceHole, 0.0);
		center1.hasAngle = center2.hasAngle = true;
		//не допускаем пересечения уголков на узком марше если есть колонны
		if(center2.x - center_t.x > 50){
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}
			
		
		//уголок верхнего марша ближе к внешней стороне
		var center1 = newPoint_xy(p3, -angleOffset - columnProf, shiftHolePlY);
		var center2 = newPoint_xy(center1, -distanceHole, 0.0);
		center1.hasAngle = center2.hasAngle = true;
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
		
		//сохраняем точку
		var center_t = copyPoint(center2)

		//уголок верхнего марша ближе к внутренней стороне
		var center1 = newPoint_xy(p3, - mm + angleOffset, shiftHolePlY);
		var center2 = newPoint_xy(center1, distanceHole, 0.0);
		center1.hasAngle = center2.hasAngle = true;
		//не допускаем пересечения уголков на узком марше если есть колонны
		if(center_t.x - center2.x > 50){
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
		}
	}
	
	//на передней тетиве на КО все отверстя не зенкуются (уголки с двух сторон)
	if (params.model == "ко" && par.key == "front") {
		for(var i=0; i<par.pointsHole.length; i++){
			par.pointsHole[i].noZenk = true;
			par.pointsHole[i].noBoltsInSide1 = true;
		}
	}
	
	//var hasRailing = false;
	if(params.backRailing_1 == "есть" && par.key == "rear") par.hasRailing = true;
	if (par.hasRailing){		
		//центры отверстий для ограждений надо добавлять в par.elmIns[par.key].racks

		var railingPosY = -60;
		if (params.model == "ко") railingPosY = -20;
		// левая крайняя стойка
		var center1 = newPoint_xy(p0, shiftHoleX + 40, railingPosY);
		par.elmIns[par.key].racks.push(center1);

		if (plateLen > 1300) {
			var middleRackAmt = Math.round(plateLen / 800) - 1;
			if (middleRackAmt < 0) middleRackAmt = 0;
			var rackDist = (plateLen - 200) / (middleRackAmt + 1);
			for (var i = 1; i <= middleRackAmt; i++) {
				var center11 = newPoint_xy(center1, rackDist * i, 0);
				par.elmIns[par.key].racks.push(center11);
			}
		}

		// правая крайняя стойка
		var center1 = newPoint_xy(p3, -shiftHoleX - 40, railingPosY);
		par.elmIns[par.key].racks.push(center1);
		};

		
	// отверстия под опорные колонны

	if (params.columnModel !== "нет" && par.key == "rear") {
		var holesParams = {
			keyPoints: par.keyPoints.rear,
			key: par.key,
			botEnd: par.botEnd,
			marshId: 1,
		};
		var colunsHoles = calcColumnPosHoles(holesParams);
		// добавляем отверстия для колонн в общий массив
		for (i=0; i<colunsHoles.length; i++) {
			par.pointsHole.push(colunsHoles[i]);
		}
	}

	//крепление к стенам
	if (par.marshParams.wallFix.out && par.key == "rear") {
		var fixPar = getFixPart(par.marshId);
		//отверстие ближе к маршу
		center1 = newPoint_xy(p0, 150, -100);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.wallFix = true;
		par.pointsHole.push(center1);
		//отверстие ближе к углу
		center1 = newPoint_xy(p3, -100, -100);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.wallFix = true;
		par.pointsHole.push(center1);
	}
	
	//создаем шейп
	var shapePar = {
		points: par.pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		}

	par.stringerShape = drawShapeByPoints2(shapePar).shape;

	//рисуем отверстия
	drawStringerHoles(par);

	//добавляем отверстия под ограждения

	var railingHolesPar = {
		shape: par.stringerShape,
		holeCenters: par.elmIns[par.key].racks,
		dxfBasePoint: par.dxfBasePoint,
		}
	drawRailingHoles(railingHolesPar);
	
	var extrudeOptions = {
		amount: params.stringerThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	//косоур на марше
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Mesh(geom, params.materials.metal);

	if (par.marshParams.wallFix.out && par.key == "rear") {
		var fixPar = getFixPart(par.marshId);
		for (var i = 0; i < par.pointsHole.length; i++) {
			var hole = par.pointsHole[i];
			if (hole.wallFix) {
				var fix = drawFixPart(fixPar).mesh;
				fix.position.x = hole.x;
				fix.position.y = hole.y;
				fix.rotation.x = Math.PI / 2;
				par.mesh.add(fix);
			}
		}
	}

	
	//сохраняем данные для спецификации
	var partName = "pltStringer";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Тетива площадки",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
				}
			}
		var name = plateLen + "x" + plateWidth;
		var area = plateLen * plateWidth / 1000000;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}

	//накладки на заднюю тетиву
	if (par.key == "rear") {
		var stringerCoverPar = {
			points: par.pointsShape,
			dxfBasePoint: par.dxfBasePoint,
			radIn: 10, //Радиус скругления внутренних углов
			radOut: 5, //радиус скругления внешних углов
			botPoint: copyPoint(p1),
			topPoint: copyPoint(p3),
			stringerCoverThickness: 2,
			railingHoles: par.elmIns[par.key].racks,
			//markPoints: true,
		}
		var stringerCover = drawStringerCover(stringerCoverPar).mesh;
		if (turnFactor == 1) stringerCover.position.z = -stringerCoverPar.stringerCoverThickness;
		if (turnFactor == -1) stringerCover.position.z = params.stringerThickness;

		par.mesh.add(stringerCover);
	}


	par.carcasHoles = par.pointsHole;
	par.dxfBasePoint.y += plateWidth + 150;
	
	return par;
} //end of drawPltStringer

/*
	Часть каркаса
*/

function drawCarcasPart(par, len) {
	
	par.pointsShape = [];
	par.pointsHole = [];
	par.railingHoles = [];
	par.carcasHoles = [];
	par.elmIns = {};

	par.key = "front";

	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};

	par.stringerWidthPlatform = calcPltStringerWidth();
	par.stringerWidthPlatform = par.stringerWidthPlatform ? par.stringerWidthPlatform : 150.0;
	var offSetY = 0;
	if (par.isMiddleStringer) offSetY = 5 + params.treadThickness;
	par.stringerWidthPlatform -= offSetY;
	var plateLen = len;
	//var shiftHoleY = -110 + (20 - params.treadThickness) + offSetY;
	var shiftHoleX = 30.0 + params.stringerThickness;
	var distanceHole = 150; //расстояние между отверстиями для уголков крепления покрытия площадки у2-200
	if (params.model == "ко") {
		plateLen -= params.sideOverHang * 2;
		distanceHole = 50; //расстояние между отверстиями для уголков крепления покрытия площадки у2-90
		//shiftHoleY = -20;
	}
	//позиция верхнего отверстия уголка каркаса относительно верха тетивы
	var shiftHoleY = -params.treadThickness - 5 - 20 + offSetY; //позиция верхнего отверстия уголка каркаса относительно верха тетивы
	if (params.model == "ко") shiftHoleY = -65;
	if (params.stairType == "рифленая сталь" || params.stairType == "рифленый алюминий" || params.stairType == "лотки")
		shiftHoleY -= 65;
	if (params.stairType == "дпк" || params.stairType == "пресснастил") shiftHoleY -= 65;
	if (params.stairModel == "Прямая горка") shiftHoleY -= 5;

	
	var plateWidth = par.stringerWidthPlatform; 
	
	var p0 = { "x": -params.M / 2, "y": 0.0 };
	if(params.model == "лт") p0.y += 5;
	if(params.model == "ко") {
		p0.x += params.sideOverHang;
		p0.y -= params.treadThickness;
	}
	var p1 = newPoint_xy(p0, 0.0, -plateWidth);
	var p2 = newPoint_xy(p1, plateLen, 0.0);
	var p3 = newPoint_xy(p2, 0.0, plateWidth);
	par.pointsShape.push(p0, p1, p2, p3);

	//сохраняем точки для колонн
	par.keyPoints[par.key].end1 = p3;	// для второй колонны
	par.keyPoints[par.key].end2 = p0;	// для первой колонны

	
	// отверстия под левый крепежный уголок
	var center1 = newPoint_xy(p0, shiftHoleX, shiftHoleY);
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
	if (par.lAng) {
		center1 = newPoint_xy(p0, shiftHoleX - params.stringerThickness, shiftHoleY);
		center2 = newPoint_xy(center1, 0.0, -60.0);
		center1.hasAngle = center2.hasAngle = true;
		if (params.stairModel == "Прямая горка") center1.hasAngle = center2.hasAngle = false;
		center1.rotated = center2.rotated = true;
		par.carcasHoles.push(center2, center1);
	}
	if (par.isSlideCenter) center1.noBoltsInSide1 = center2.noBoltsInSide1 = true;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);
	
	var angHole = copyPoint(center1); //сохраняем точку для расчета позиции колонны

	// отверстия под правый крепежный уголок 
	var center1 = newPoint_xy(p3, -shiftHoleX, shiftHoleY);
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
	if (par.rAng) {
		center1 = newPoint_xy(p3, -shiftHoleX + params.stringerThickness, shiftHoleY);
		center2 = newPoint_xy(center1, 0.0, -60.0)
		center1.hasAngle = center2.hasAngle = true;
		if (params.stairModel == "Прямая горка") center1.hasAngle = center2.hasAngle = false;
		par.carcasHoles.push(center2, center1);
	}
	if (par.isSlideCenter) center1.noBoltsInSide1 = center2.noBoltsInSide1 = true;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);
	
	
	//if (params.stairType == "рифленая сталь" || params.stairType == "лотки" || params.stairType == "пресснастил") {

	//}
	//if (params.stairFrame == "есть" && par.hasFrames) {
	if (par.hasFrames) {
		// отверстия под рамки под площадкой
		par.platformFramesParams = {
			marshId: par.marshId,
			isPltFrame: true,
		};
		if (par.largePlt) par.platformFramesParams.isLargePlt = true;
		calcFrameParams(par.platformFramesParams); 
		calcStringerPar(par);
		
		par.stepHoleY = -20 - 5 - params.treadThickness + offSetY;
		var platformLength = len; 
		if (par.largePlt) platformLength += 2;

		// отверстия под рамки под площадкой
		var begX = par.platformFramesParams.overhang + 5 + par.platformFramesParams.sideHolePosX;
		if (par.largePlt) begX -= 2;
		if (params.stairModel == 'Прямая горка') {
			begX = par.platformFramesParams.sideHolePosX + 5.0;
			platformLength -= 5;
        }
        //if (params.stairModel !== 'Прямая' && params.stairModel !== 'Прямая горка') platformLength += 8;
		if (params.platformRearStringer == "нет") platformLength += params.stringerThickness;


		var frameAmt = calcPltFrameParams(platformLength, par.platformFramesParams.overhang).frameAmt;
        var frameWidth = calcPltFrameParams(platformLength, par.platformFramesParams.overhang).frameWidth;

		
		var i;
		for (i = 0; i < frameAmt; i++) {
			center1 = newPoint_xy(p0, begX, par.stepHoleY);
			center2 = newPoint_xy(center1, frameWidth - par.platformFramesParams.sideHolePosX * 2, 0.0);
			center1.isLargePlt = center2.isLargePlt = par.largePlt;
			//center1.isPltFrame = center2.isPltFrame = par.largePlt;
			center1.isPltFrame = center2.isPltFrame = true;
            if (par.isMiddleStringer) {
				par.elmIns[par.key] = {};
				center1.isPltPFrame = center2.isPltPFrame = true;
			    center1.noZenk = center2.noZenk = true;
            }
            if (params.platformTop == 'увеличенная') {
                if (params.calcType == "vhod" && params.M > 1100)
					center1.isPltPFrame = center2.isPltPFrame = true;
				if (params.stairModel == "Г-образная с площадкой" && turnFactor == 1) {
					center1.noBoltsIn = center2.noBoltsIn = true;
				}
				else
					center1.noBoltsOut = center2.noBoltsOut = true;
            }
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			begX += frameWidth + 5.0;
			par.carcasHoles.push(center1, center2)
		}
		
	}
	if (!par.hasFrames) {
		var stepHoleY = -(params.treadThickness + 20.0 + 5.0);

		// отверстия под 1 уголок площадки
		if (plateLen < 790) {
			var holeDist = 50;
			var angleType = "У2-40х40х90";
			var angleHolePosX = 20;
		}
		else {
			var angleType = "У2-40х40х200";
			var angleHolePosX = 25;
			var holeDist = 150;
		}

		var stepHoleXside1 = (plateLen / 2 - 110 - 64) / 2 + 140 - holeDist / 2;
		center1 = newPoint_xy(p0, stepHoleXside1, stepHoleY);
		center2 = newPoint_xy(center1, holeDist, 0.0);
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);
		par.carcasHoles.push(center1, center2);

		// отверстия под перемычку 2
		if (plateLen > 600 && par.stringerType == "side") {
			center1 = newPoint_xy(p0, ((plateLen * 0.5) + 29), shiftHoleY);
			center2 = newPoint_xy(center1, 0.0, -60);
			center1.hasAngle = center2.hasAngle = false; //уголки перемычки отрисовываются внутри drawBridge_2
			//par.elmIns[par.key].bridges.push(newPoint_xy(center1, -38.0 - 29 - 39, 20.0));
			var pCentralHoles = copyPoint(center1);
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}

		// отверстия под 2 уголок площадки
		var stepHoleXside2 = (plateLen / 2 - 64) / 2 + plateLen / 2 - holeDist / 2;
		if (stepHoleXside2 > 0.0) {
			center1 = newPoint_xy(p0, stepHoleXside2, stepHoleY);
			center2 = newPoint_xy(center1, holeDist, 0.0);
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			par.carcasHoles.push(center1, center2);
		}
	}
	//отверстия под колонну на боковой тетиве увеличенной верхней площадки
	
	if (params.columnModel !== "нет" && par.stringerType == "side" && params.isColumnTop4){
		var center1 = newPoint_xy(angHole, 100, 0);
		var center2 = newPoint_xy(center1, 0, -60);		
		center1.isColumnHole = center2.isColumnHole = true;
		center1.hasAngle = center2.hasAngle = false;
		par.carcasHoles.push(center1, center2);
		par.pointsHole.push(center1, center2);
		}


	//создаем шейп
	var shapePar = {
		points: par.pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}

	par.stringerShape = drawShapeByPoints2(shapePar).shape;
	//отверстия под ограждения
	if (par.stringerType == 'side' || par.stringerType == 'front') {
		par.elmIns = {};
		par.elmIns[par.stringerType] = {};
		par.elmIns[par.stringerType].racks = [];

		par.hasRailing = false;
		if(params.topPltRailing_4 && par.stringerType == 'side') par.hasRailing = true;
		if(params.topPltRailing_6 && par.stringerType == 'front') par.hasRailing = true;
		
		if(par.hasRailing){
			var railingPosY = -60;
			// левая крайняя стойка
			var center1 = newPoint_xy(p0, shiftHoleX + 60 + 4, railingPosY);
			par.elmIns[par.stringerType].racks.push(center1);
			
			if (plateLen > 1300) {
				var middleRackAmt = Math.round(plateLen / 800) - 1;
				if (middleRackAmt < 0) middleRackAmt = 0;
				var rackDist = (plateLen - 200) / (middleRackAmt + 1);
				for (var i = 1; i <= middleRackAmt; i++) {
					var center11 = newPoint_xy(center1, rackDist * i - 2, 0);
					par.elmIns[par.stringerType].racks.push(center11);
				}
			}
			
			// правая крайняя стойка
			var center1 = newPoint_xy(p3, -shiftHoleX - 60 - 4, railingPosY);
			par.elmIns[par.stringerType].racks.push(center1);
		};
	}

	// отверстия под опорные колонны

	if (params.columnModel !== "нет" && par.stringerType == 'front') {
		par.marshId = 3;
		if (params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') par.marshId = 1;

		var holesParams = {
			keyPoints: par.keyPoints.front,
			key: par.key, //'front'
			botEnd: par.botEnd,
			isTopPlt: true,
			marshId: par.marshId,
		};
		var colunsHoles = calcColumnPosHoles(holesParams);
		// добавляем отверстия для колонн в общий массив
		for (i = 0; i < colunsHoles.length; i++) {
			par.pointsHole.push(colunsHoles[i]);
			par.carcasHoles.push(colunsHoles[i]);
		}
	}

	//рисуем отверстия
	drawStringerHoles(par);
	if (par.stringerType) {
		var railingHolesPar = {
			shape: par.stringerShape,
			holeCenters: par.elmIns[par.stringerType].racks,
			dxfBasePoint: par.dxfBasePoint,
		}
		drawRailingHoles(railingHolesPar);
	}
	

	
	var extrudeOptions = {
		amount: params.stringerThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	//косоур на марше
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Mesh(geom, params.materials.metal);

	
	//сохраняем данные для спецификации
	var partName = "pltStringer";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Тетива площадки",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
				}
			}
		var name = plateLen + "x" + plateWidth;
		var area = plateLen * plateWidth / 1000000;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;		
		}
		

	
	return par;
} //end of drawCarcasPart

/**
 * Задний косоур верхней площадки
 */
 
function drawTopPltStringer(par) {

	par.pointsShape = [];
	par.pointsHole = [];
	par.railingHoles = [];
	
	par.carcasHoles = [];
	par.key = "rear";
	
	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};
	
	par.stringerWidthPlatform = calcPltStringerWidth();

	//рассчитываем параметры косоура по номеру марша
	calcStringerPar(par);
	
	var plateLen = params.M;
	//координата верхнего отверстия уголка каркаса
	var shiftHoleY = par.carcasAnglePosY;
	//var shiftHoleY = -params.treadThickness - 5 - 20; //30 - отступ нижнего отверстия от низа, 60 - расстояние между отверстиями
	//var shiftHoleY = -par.stringerWidthPlatform + 30 + 60 - 5 + (par.stringerWidthPlatform - 150); //30 - отступ нижнего отверстия от низа, 60 - расстояние между отверстиями
	//if (params.stairType == "рифленая сталь" || params.stairType == "рифленый алюминий" || params.stairType == "лотки") shiftHoleY -= 14;
	//if (params.stairType == "рифленая сталь" || params.stairType == "рифленый алюминий" || params.stairType == "лотки")
	//	shiftHoleY -= 50;
	if (params.model == "ко") shiftHoleY = -par.stringerWidthPlatform + 25 + 60;
	//if(params.model == "ко") shiftHoleY = -95;
	var shiftHoleX = 30.0 + params.stringerThickness;
	var distanceHole = 150; //расстояние между отверстиями для уголков крепления покрытия площадки у2-200
	//fix
	if (params.platformTop == 'увеличенная') {
		plateLen = params.platformWidth_3; //8 ширина тетивы + 3 отступ		
		//plateLen = params.platformWidth_3 - (params.M - calcTreadLen()) + params.stringerThickness * 2 + 6; //8 ширина тетивы + 3 отступ		
	}
	
	if (params.model == "ко") {
		plateLen -= params.sideOverHang * 2;
		distanceHole = 50; //расстояние между отверстиями для уголков крепления покрытия площадки у2-90
	}


	
	var plateWidth = par.stringerWidthPlatform; 
	
	var p0 = { "x": -params.M / 2, "y": 0.0 };
	if(params.model == "лт") p0.y += 5;
	if(params.model == "ко") {
		p0.x += params.sideOverHang;
		p0.y -= params.treadThickness;
		}
	var p1 = newPoint_xy(p0, 0.0, -plateWidth);
	var p2 = newPoint_xy(p1, plateLen, 0.0);
	var p3 = newPoint_xy(p2, 0.0, plateWidth);
	//par.pointsShape.push(p0, p1, p2, p3);
	par.pointsShape.push(p1, p0, p3, p2);
	
	//сохраняем точки для колонн
	par.keyPoints[par.key].end1 = p3;	// для второй колонны
	par.keyPoints[par.key].end2 = p0;	// для первой колонны	
	// отверстия под левый крепежный уголок
	var center1 = newPoint_xy(p0, shiftHoleX, shiftHoleY);
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// отверстия под правый крепежный уголок 
	var center1 = newPoint_xy(p3, -shiftHoleX, shiftHoleY);
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
	par.pointsHole.push(center1);
	par.pointsHole.push(center2);

	// отверстия под средний крепежный уголок 
	if (params.platformTop == 'увеличенная') {
		var center1 = newPoint_xy(p0, params.M - shiftHoleX, shiftHoleY);
		if(turnFactor == 1) center1 = newPoint_xy(p3, -params.M + shiftHoleX, shiftHoleY);
		var center2 = newPoint_xy(center1, 0.0, -60.0);
		center1.hasAngle = center2.hasAngle = false;
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);

		//сохраняем точки для колонн
		par.keyPoints[par.key].end3 = newPoint_xy(p0, plateLen / 2, 0);;	// для второй колонны
	}

	// отверстия под крепежный уголок промежуточного косоура широкого марша
	if (params.M > 1100 && params.calcType == "vhod") {
		var center1 = newPoint_xy(p0, params.M /2 + params.stringerThickness / 2 - shiftHoleX, shiftHoleY);
		if (turnFactor == 1) center1 = newPoint_xy(p3, -params.M /2 - params.stringerThickness / 2 + shiftHoleX, shiftHoleY);
		var center2 = newPoint_xy(center1, 0.0, -60.0);
		center1.hasAngle = center2.hasAngle = false;
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);
	}


	//отверстия под опорные уголки площадки
	var columnProf = 0;
	if (params.columnModel != "нет" && par.key == "rear" && (params.isColumnTop1 || params.isColumnTop3)) {
		columnProf = 100;
		if (params.columnModel == "40х40") par.profWidth = 40;
		}
		
	var angleOffset = 120; //Отступ уголка от края тетивы / косоура
	var mm = params.M - params.stringerThickness * 2;
	if (params.model == "ко") mm -= params.sideOverHang * 2;	
	var shiftHolePlY = shiftHoleY;	
	if (params.model == "ко") shiftHolePlY = -20;
	
	
	var hasAngles = false;
	if(params.model == "ко" && par.key == "rear") hasAngles = true;
	if(params.model == "лт" && !hasTreadFrames()) hasAngles = true;
	
	if (hasAngles){
		//если помещаются 2 уголка
		if(mm - angleOffset * 2 - columnProf * 2 >= distanceHole * 2 + 60){
			//уголок ближе к внешней стороне
			var center1 = newPoint_xy(p0, angleOffset + columnProf, shiftHolePlY);
			var center2 = newPoint_xy(center1, distanceHole, 0.0);
			center1.hasAngle = center2.hasAngle = true;
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);

			//уголок ближе к внутренней стороне
			var center1 = newPoint_xy(p0, mm - angleOffset - columnProf, shiftHolePlY);
			var center2 = newPoint_xy(center1, -distanceHole, 0.0);
			center1.hasAngle = center2.hasAngle = true;
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
			}
		//если помещаются 1 уголок
		if(mm - angleOffset * 2 - columnProf * 2 < distanceHole * 2 + 60){
			//уголок ближе к внешней стороне
			var center1 = newPoint_xy(p0, mm / 2 - distanceHole / 2, shiftHolePlY);
			var center2 = newPoint_xy(center1, distanceHole, 0.0);
			center1.hasAngle = center2.hasAngle = true;
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			}
	}
	
	//отверстия под ограждения
	par.elmIns = {};
	par.elmIns[par.key] = {};
	par.elmIns[par.key].racks = [];
	
	var hasRailing = false;
	if(params.topPltRailing_5) par.hasRailing = true;

	if(par.hasRailing){
		var railingPosY = -60;
		if(params.model == "ко") railingPosY = -20;
		// левая крайняя стойка
		var center1 = newPoint_xy(p0, shiftHoleX + 40, railingPosY);
		par.elmIns[par.key].racks.push(center1);
	
		if (plateLen > 1300) {
			var middleRackAmt = Math.round(plateLen / 800) - 1;
			if (middleRackAmt < 0) middleRackAmt = 0;
			var rackDist = (plateLen - 200) / (middleRackAmt + 1);
			for (var i = 1; i <= middleRackAmt; i++) {
				var center11 = newPoint_xy(center1, rackDist * i, 0);
				par.elmIns[par.key].racks.push(center11);
			}
		}

		// правая крайняя стойка
		var center1 = newPoint_xy(p3, -shiftHoleX - 40, railingPosY);
		par.elmIns[par.key].racks.push(center1);
	};


	// отверстия под опорные колонны

	if (params.columnModel !== "нет" && par.key == "rear") {
		var holesParams = {
			keyPoints: par.keyPoints.rear,
			key: par.key,
			botEnd: par.botEnd,
			isTopPlt: true,
			marshId: par.marshId,
		};
		var colunsHoles = calcColumnPosHoles(holesParams);
		// добавляем отверстия для колонн в общий массив
		for (i=0; i<colunsHoles.length; i++) {
			par.pointsHole.push(colunsHoles[i]);
			par.carcasHoles.push(colunsHoles[i]);
		}
	}

	//крепление к стенам
	if (par.marshParams.wallFix.out && par.key == "rear") {
		var fixPar = getFixPart(par.marshId);
		//отверстие ближе к маршу
		center1 = newPoint_xy(p0, 150, -100);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.wallFix = true;
		par.pointsHole.push(center1);
		//отверстие ближе к углу
		center1 = newPoint_xy(p3, -100, -100);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.wallFix = true;
		par.pointsHole.push(center1);
	}

	
	//создаем шейп
	var shapePar = {
		points: par.pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		}

	par.stringerShape = drawShapeByPoints2(shapePar).shape;

	//рисуем отверстия
	drawStringerHoles(par);

	//добавляем отверстия под ограждения

	var railingHolesPar = {
		shape: par.stringerShape,
		holeCenters: par.elmIns[par.key].racks,
		dxfBasePoint: par.dxfBasePoint,
		}
	drawRailingHoles(railingHolesPar);
	
	var extrudeOptions = {
		amount: params.stringerThickness - 0.01,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	//косоур на марше
	var geom = new THREE.ExtrudeGeometry(par.stringerShape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Mesh(geom, params.materials.metal);
	if (params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") {
		par.mesh.position.z = 0.01 * turnFactor;
	} else if (params.stairModel == "П-образная с забегом" ||params.stairModel == "П-образная с площадкой" ||params.stairModel == "П-образная трехмаршевая") {
		par.mesh.position.x = - 0.01;
	}
	else {
		par.mesh.position.x = 0.01;
	}
	if (params.platformTop == "увеличенная" && turnFactor == 1) {
		par.mesh.position.z += params.platformWidth_3 - params.M;
	}

	if (par.marshParams.wallFix.out && par.key == "rear") {
		var fixPar = getFixPart(par.marshId);
		for (var i = 0; i < par.pointsHole.length; i++) {
			var hole = par.pointsHole[i];
			if (hole.wallFix) {
				var fix = drawFixPart(fixPar).mesh;
				fix.position.x = hole.x;
				fix.position.y = hole.y;
				fix.rotation.x = Math.PI / 2;
				par.mesh.add(fix);
			}
		}
	}


	//сохраняем данные для спецификации
	var partName = "pltStringer";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Тетива площадки",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
				}
			}
		var name = plateLen + "x" + plateWidth;
		var area = plateLen * plateWidth / 1000000;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
		}
		

	//var stringerCoverPar = {
	//	points: par.pointsShape,
	//	dxfBasePoint: par.dxfBasePoint,
	//	radIn: 10, //Радиус скругления внутренних углов
	//	radOut: 5, //радиус скругления внешних углов
	//	botPoint: copyPoint(p1),
	//	topPoint: copyPoint(p3),
	//	stringerCoverThickness: 2,
	//	railingHoles: par.elmIns[par.key].racks,
	//	//markPoints: true,
	//}
	//var stringerCover = drawStringerCover(stringerCoverPar).mesh;
	//stringerCover.position.z = params.stringerThickness;

	//par.mesh.add(stringerCover);
	
	return par;
} //end of drawTopPltStringer

/*
	drawSlidePart - 
	
	Отрисовывает часть каркаса промежуточной площадки прямой горки
	входные данные:
	dxfBasePoint - базовая точка dxf
	treadsObj - объект ступеней
	marshPar - параметры марша

*/

function drawSlidePart(par){
	par.mesh = new THREE.Object3D();
	par.angles = new THREE.Object3D();
	var stringerParams = {
		marshId: 0,
		dxfBasePoint: par.dxfBasePoint,
		treadsObj: par.treadsObj,
		hasFrames: true,
		isSlideCenter: true,
	};
	
	stringerParams.stringerWidthPlatform = 200;
	stringerParams.lAng = true;
	stringerParams.rAng = true;
	var sideStringerLength = params.middlePltLength - par.marshPar.a * 2 + 10;
	var sideStringer = drawCarcasPart(stringerParams, sideStringerLength).mesh;
	var sideStringer2 = drawCarcasPart(stringerParams, sideStringerLength).mesh;

	

	par.sideStringerLength = sideStringerLength;
	
	if(hasTreadFrames()){
		par.dxfBasePoint.x += 2000;
		var framePar = {
			holes: stringerParams.carcasHoles,
			dxfBasePoint: par.dxfBasePoint,
		}

		var frames = drawFrames(framePar);
		if (params.stairModel == "Прямая горка" && par.isMiddleStringer)
			frames.position.z += framePar.length / 2 + params.stringerThickness / 2;
		par.angles.add(frames);
	}
	
	var side = "right";
	sideStringer.position.z = params.M / 2 - params.stringerThickness;
	sideStringer2.position.z = -params.M / 2;
	par.mesh.add(sideStringer, sideStringer2);
	var sideAngles = drawCarcasAngles(stringerParams.carcasHoles, side);
	var sideAngles2 = drawCarcasAngles(stringerParams.carcasHoles, side == 'right' ? 'left' : 'right');
	sideAngles.position.z = params.M / 2 - params.stringerThickness;
	sideAngles2.position.z = -params.M / 2 + params.stringerThickness;
	par.angles.add(sideAngles, sideAngles2);

	// промежуточные косоуры широкого марша
	if (par.isMiddleStringer) {		
		stringerParams.isMiddleStringer = true;
		var sideStringer3 = drawCarcasPart(stringerParams, sideStringerLength).mesh;
		sideStringer3.position.z = - params.stringerThickness / 2;
		sideStringer3.position.y = - 5 - params.treadThickness;
		par.mesh.add(sideStringer3);

		if (hasTreadFrames()) {
			par.dxfBasePoint.x += 2000;
			var framePar = {
				holes: stringerParams.carcasHoles,
				dxfBasePoint: par.dxfBasePoint,
			}

			var frames = drawFrames(framePar);
			frames.position.z = -framePar.length / 2 - params.stringerThickness / 2;
			//if (params.stairModel == "Прямая горка") frames.position.z += params.M / 2;
			frames.position.y = - 5 - params.treadThickness;
			par.angles.add(frames);
		}

		var holes1 = [];
		var holes2 = [];
		var j = 0;
		for (var i = 0; i < stringerParams.carcasHoles.length - 1; i++) {
			if (stringerParams.carcasHoles[i].hasAngle) {
				if(j < 2) holes1.push(stringerParams.carcasHoles[i]);
				else holes2.push(stringerParams.carcasHoles[i]);
				j++;
			}
		}
		var sideAngles3 = drawCarcasAngles(holes1, side);
		sideAngles3.position.z = - params.stringerThickness / 2;
		sideAngles3.position.y = - 5 - params.treadThickness;
		par.angles.add(sideAngles3);

		var sideAngles4 = drawCarcasAngles(holes2, side == 'right' ? 'left' : 'right');
		sideAngles4.position.z = params.stringerThickness / 2;
		sideAngles4.position.y = - 5 - params.treadThickness;
		par.angles.add(sideAngles4);

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
				bolt.position.y = longBoltPos[i].y - 5 - params.treadThickness;
				bolt.position.z = sideStringer3.position.z;
				par.mesh.add(bolt);
			}

		}
	}

	
	
	return par;
}

/*
	Отрисовывает часть каркаса увеличенной площадки
	входные данные:
	dxfBasePoint - базовая точка dxf
	treadsObj - объект ступеней

	TODO:
		Поменять название
		Поработать с отверстиями и уголками.
*/
function drawBigPltCarcas(par){
	var stringerParams = {
		marshId: 0,
		dxfBasePoint: par.dxfBasePoint,
		treadsObj: par.treadsObj,
		isPltFrame: true
	};
	
	if (!par.elmIns) par.elmIns = {};
	
	par.mesh = new THREE.Object3D();
	par.angles = new THREE.Object3D();
	
	stringerParams.stringerWidthPlatform = 200;//Устанавливаем высоту каркаса
	/*
		Эти переменные отвечают за наличие уголков у отверстий каркаса
		TODO: Сделать что-то лучшее)
	*/
	stringerParams.lAng = true;
	stringerParams.rAng = true;
	stringerParams.hasFrames = true;
	if (!hasTreadFrames()) stringerParams.hasFrames = false;
	stringerParams.largePlt = true;
	var sideStringerLength = params.platformLength_3 + 3 - params.stringerThickness;//Считаем длинну боковой части
	if (turnFactor == -1 && !(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
		sideStringerLength += 2;
	}
	stringerParams.stringerType = 'side';
	var sideStringer = drawCarcasPart(stringerParams, sideStringerLength).mesh;
	par.elmIns[stringerParams.stringerType] = stringerParams.elmIns[stringerParams.stringerType];
	var side = "left";//Устанавливаем сторону для уголков
	if (params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') {
		side = turnFactor == 1 ? 'right' : 'left';//Фикс для прямой лестницы //TURNFACTOR CHANGED
	}
	
	if(hasTreadFrames()){
		par.dxfBasePoint.x += 2000;
		var framePar = {
			holes: stringerParams.carcasHoles,
			dxfBasePoint: par.dxfBasePoint,
			isBigPlt: true,
		}

		var frames = drawFrames(framePar);
		frames.position.x = 0;
		frames.position.z = -framePar.length / 2 * turnFactor;
		if (turnFactor == -1) {
			frames.position.z += params.stringerThickness;
		}
		if (~params.stairModel.indexOf("Г-образная")) {//Считаем положения 
			frames.position.z = 2 + params.stringerThickness;
			if (turnFactor == -1) {
				frames.position.z = params.platformLength_3 - params.M;// - 2;
			}
			frames.position.x += (framePar.length / 2 + params.stringerThickness);
            frames.rotation.y = Math.PI / 2;
            if (params.stairModel == 'Г-образная с площадкой') {
                if (!(params.stairType == "дпк" || params.stairType == "рифленая сталь")) frames.position.z -= par.platformFramesParams.sideHolePosX;
                if (params.stairType == "дпк") frames.position.z -= 5;
                if (params.stairType == "рифленая сталь") frames.position.z -= 15;
            }
        }
		if (~params.stairModel.indexOf("П-образная")) {//Считаем положения 
			frames.position.x = -(params.platformLength_3 - params.M) + 5;
			frames.position.z = (framePar.length / 2 + params.stringerThickness) * turnFactor;
		}
        
		par.angles.add(frames);
	}
	
	var sideAngles = drawCarcasAngles(stringerParams.carcasHoles, side);
	if ((params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') && side == 'left') {
		sideAngles.position.z += params.stringerThickness;//Фикс положения
	}
			
	if (~params.stairModel.indexOf("Г-образная")) {//Считаем положения 
		sideStringer.rotation.y = - Math.PI / 2 * turnFactor;
		sideStringer.position.x = params.stringerThickness* (1 + turnFactor) * 0.5;
		sideStringer.position.z = 2 * (1 + turnFactor) * 0.5;
		sideStringer.position.z -= (params.platformLength_3 - params.M) * turnFactor;

		sideAngles.rotation.y = Math.PI / 2;
		sideAngles.position.z = (params.platformLength_3 - params.M) * (1 - turnFactor) * 0.5;
		sideAngles.position.z += (- params.stringerThickness + 5) * (1 + turnFactor) * 0.5;
		sideAngles.position.x = params.stringerThickness;
	}
	if (~params.stairModel.indexOf("П-образная")) {//Считаем положения 
		sideStringer.rotation.y = Math.PI;
		sideStringer.position.x = -2 * (1 + turnFactor) * 0.5;
		sideStringer.position.z = 0//-(params.platformWidth_3 - params.M*2) * (1 + turnFactor) * 0.5;
		sideStringer.position.z += (params.stringerThickness) * (1 + turnFactor) * 0.5;

		sideAngles.rotation.y = 0;
		sideAngles.rotation.y = Math.PI * (1 -turnFactor) * 0.5;
		sideAngles.position.z = 0//(params.platformLength_3 - params.M*2) * (1 + turnFactor) * 0.5;
		sideAngles.position.z += (params.stringerThickness)*turnFactor// * (1 - turnFactor) * 0.5;
		sideAngles.position.x = 0;
		sideAngles.position.x = (-(params.platformLength_3 - params.M) + 3) * (1 + turnFactor) * 0.5;
	}


	//колонна №4 на боковой стороне увеличенной площадки - перенесена на переднюю сторону
	stringerParams.anglesPosZ = 0;
	stringerParams.dxfBasePoint.x += 2000;
	var columnsSide = drawColumnSide(stringerParams, "side");
	columnsSide.rotation.y = sideStringer.rotation.y;
	columnsSide.position.x = sideStringer.position.x + 5; //5 - подогнано
	columnsSide.position.y = sideStringer.position.y;
	columnsSide.position.z = sideStringer.position.z + params.stringerThickness * (1 - turnFactor) * 0.5;
	var profSize = calcColumnSize();
	if (params.stairModel == 'Прямая с промежуточной площадкой') {
		columnsSide.position.z += -profSize.profHeight * turnFactor;
	}
	if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
		
		columnsSide.position.x += profSize.profHeight - 5 + params.stringerThickness * (1 - turnFactor) * 0.5; 
		columnsSide.position.z += 5; 
		if (turnFactor == -1) columnsSide.position.z -= 10 + params.stringerThickness;
	}
	if (~params.stairModel.indexOf("П-образная")) {//Считаем положения 
		columnsSide.rotation.y = sideStringer.rotation.y;
		columnsSide.position.x = sideStringer.position.x -5; //5 - подогнано
		columnsSide.position.y = sideStringer.position.y;
		columnsSide.position.z = sideStringer.position.z + profSize.profHeight * turnFactor;
		columnsSide.position.z -= params.stringerThickness * (1 - turnFactor) * 0.5;
	}
	par.mesh.add(columnsSide);


	if (turnFactor == -1) {//Выбираем какой уголок нужен в зависимости от поворота.
		stringerParams.lAng = true;
		stringerParams.rAng = false;
	}else{
		stringerParams.lAng = false;
		stringerParams.rAng = true;
	}
	stringerParams.hasFrames = false;
	if ((params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
		side = 'left';//Фикс для прямой лестницы
	}
	var frontStringerLength = params.platformWidth_3 - params.M;
	stringerParams.stringerType = 'front';
	var frontStringer = drawCarcasPart(stringerParams, frontStringerLength).mesh;
	var frontAngles = drawCarcasAngles(stringerParams.carcasHoles, side);
	par.elmIns[stringerParams.stringerType] = stringerParams.elmIns[stringerParams.stringerType];

	frontStringer.rotation.y = (par.treadsObj.lastMarshEnd.rot + Math.PI / 2);
	frontAngles.rotation.y = (par.treadsObj.lastMarshEnd.rot + Math.PI / 2);
	var deltaZ = params.platformLength_3;

	frontStringer.position.z = (-params.M / 2 + params.stringerThickness);
	frontStringer.position.x = -params.M / 2 - params.stringerThickness;

	frontAngles.position.z = (-params.M / 2 + params.stringerThickness);
	frontAngles.position.x = -params.M / 2;
	if (turnFactor == -1) {//TURNFACTOR CHANGED
		frontStringer.position.z += frontStringerLength - params.stringerThickness;
		frontAngles.position.z += frontStringerLength - params.stringerThickness;
	}
	if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
		frontStringer.position.x = params.M / 2;
		frontStringer.position.z = -params.platformLength_3 + params.M / 2 + 2 - params.stringerThickness;
		
		frontAngles.position.x = params.M / 2;
		frontAngles.position.z = -params.platformLength_3 + params.M / 2 + 2;
		if (turnFactor == -1) {//TURNFACTOR CHANGED
			frontStringer.position.x = -params.M / 2 + frontStringerLength;
			frontStringer.position.z *= -1;
			frontStringer.position.z += 2;
			
			frontAngles.position.x = -params.M / 2 + frontStringerLength;
			frontAngles.position.z *= -1;
			frontAngles.position.z += 2;
		}
	}
	if (~params.stairModel.indexOf("П-образная")) {//Считаем положения 
		//frontStringer.rotation.y = 0;
		frontStringer.position.x = params.M / 2 + params.stringerThickness;
		frontStringer.position.x -= 2 * (1 + turnFactor) * 0.5;
		frontStringer.position.z = -(-params.platformWidth_3 + params.M / 2 + params.M )*turnFactor
		frontStringer.position.z -= (params.platformWidth_3 - params.M * 2) * (1 + turnFactor) * 0.5;

		frontAngles.rotation.y = -Math.PI/2;
		frontAngles.position.z = (params.platformWidth_3 - params.M + (params.platformWidth_3 - params.M *2))/2 * turnFactor
		frontAngles.position.z -= (params.platformWidth_3 - params.M * 2) * (1 + turnFactor) * 0.5;
		frontAngles.position.x = params.M / 2 - 2 * (1 + turnFactor) * 0.5
	}

	par.carcasHoles = stringerParams.carcasHoles;
	
	par.mesh.add(sideStringer);	
	par.mesh.add(frontStringer);
	
	par.angles.add(sideAngles);
	par.angles.add(frontAngles);
	return par;
}


/*
 * Соединительные фланцы
 */
function drawStringerFlans_all(par) {
	
	var mesh = new THREE.Object3D();

	// Верхний фланец 

	par.holeCenters = [];
	par.topLeft = null;
	par.botLeft = null;
	par.botRight = null;
	par.topRight = null;
	
	for (var i = 0; i < par.carcasHoles.length; i++){
		if (par.carcasHoles[i].isTopFlanHole){
			par.holeCenters.push(par.carcasHoles[i]);
			// Выделение формообразующих отверстий
			if (par.carcasHoles[i].pos == "topLeft")
				par.topLeft = par.carcasHoles[i];
			if (par.carcasHoles[i].pos == "botLeft")
				par.botLeft = par.carcasHoles[i];
			if (par.carcasHoles[i].pos == "botRight")
				par.botRight = par.carcasHoles[i];
			if (par.carcasHoles[i].pos == "topRight")
				par.topRight = par.carcasHoles[i];
		}
	}		

	par.key = "top";
	var meshShape = drawStringerFlan(par);
	if (meshShape) mesh.add(meshShape);

	// Средний фланец
	
	// Выделение отверстий для фланцев	
	
	par.holeCenters = [];
	par.topLeft = null;
	par.botLeft = null;
	par.botRight = null;
	par.topRight = null;

	for (var i = 0; i < par.carcasHoles.length; i++){
		if (par.carcasHoles[i].isMiddleFlanHole){
			par.holeCenters.push(par.carcasHoles[i]);
			// Выделение формообразующих отверстий
			if (par.carcasHoles[i].pos == "topLeft")
				par.topLeft = par.carcasHoles[i];
			if (par.carcasHoles[i].pos == "botLeft")
				par.botLeft = par.carcasHoles[i];
			if (par.carcasHoles[i].pos == "botRight")
				par.botRight = par.carcasHoles[i];
			if (par.carcasHoles[i].pos == "topRight")
				par.topRight = par.carcasHoles[i];
			
		}
	}		

	par.key = "middle";
	var meshShape = drawStringerFlan(par);
	if (meshShape) mesh.add(meshShape);	

	return mesh;	
	
} //end of drawStringerFlans_all

/** функция отрисовывает соединительный фланец тетивы/косоура для лт и ко
*@params par = {
	holeCenters: [] - все отверстия фланца, включая угловые
	botLeft - центр левого нижнего отверстия
	botRight - центр правого нижнего отверстия
	topLeft - центр верхнего левого
	topRight - центр верхнего правого
	key - тип фланца middle или top
	side: right || left
	}
*@returns par.mesh
*/

function drawStringerFlan(par) {

	par.mesh = new THREE.Object3D();
	
	if (par.topLeft && par.botLeft && par.botRight && par.topRight){
	
	var holeOffset = 20; //отступ центра отверстия от края фланца
	var frontHoleOffset = 20;
	
	if(par.key == "middle"){
		var frontHoleOffset = 30; //отступ переднего края фланца
		if (hasTreadFrames()) frontHoleOffset = 55;
		if (params.stairType == "рифленая сталь" || params.stairType == "лотки" || params.stairType == "пресснастил") frontHoleOffset = 30;
		if(params.stringerType == "прямая") frontHoleOffset = 20;
		if(params.model == "ко") frontHoleOffset = 45;
		}
	
	var botRightHole = newPoint_xy(par.botRight, 0, 0);
	
	// корректировка нижнего правого угла фланца
	if ((par.key == "middle")&&(params.stringerType != "ломаная")){
		botRightHole.x += (par.topRight.x - par.botRight.x) - (par.topRight.y - par.botRight.y) / Math.tan(par.marshAng);
	}
	
	var topLine = parallel(par.topLeft, par.topRight, holeOffset);
	var botLine = parallel(par.botLeft, botRightHole, -holeOffset);
	var rightLine = parallel(botRightHole, par.topRight, -holeOffset);
	var leftLine = parallel(par.botLeft, par.topLeft, frontHoleOffset);
	
	var p1 = itercection(botLine.p1, botLine.p2, leftLine.p1, leftLine.p2);
	var p2 = itercection(topLine.p1, topLine.p2, leftLine.p1, leftLine.p2);
	var p3 = itercection(topLine.p1, topLine.p2, rightLine.p1, rightLine.p2);
	var p4 = itercection(botLine.p1, botLine.p2, rightLine.p1, rightLine.p2);
	
	var pointsShape = [p1, p2, p3, p4];

	//создаем шейп
	var shapePar = {
		points: pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, par.botRight.x - par.botLeft.x + 100, -(par.topLeft.y - par.botLeft.y) - 100),
	}
	par.flanShape = drawShapeByPoints2(shapePar).shape;

	var holesPar = {
		holeArr: par.holeCenters,
		dxfBasePoint: shapePar.dxfBasePoint,
		shape: par.flanShape,
		}
	addHolesToShape(holesPar);

	var thk = 8.0;
	var flanExtrudeOptions = {
		amount: thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(par.flanShape, flanExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom, params.materials.metal);	

	par.mesh.add(mesh);
	

	/* болты */	

	if (typeof anglesHasBolts != "undefined" && anglesHasBolts && !par.noBolts) { //глобальная переменная
		var side = par.side;
		if (params.stairModel == "Прямая") {
			if (par.side == "left") side = "right";
			if (par.side == "right") side = "left";
		}
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
			}
		for (var i = 0; i < par.holeCenters.length; i++) {
			if (!par.holeCenters[i].hasAngle) {
				if (par.holeCenters[i].headType) boltPar.headType = par.holeCenters[i].headType;
				else boltPar.headType = false;
				if (par.holeCenters[i].boltLen) boltPar.len = par.holeCenters[i].boltLen;
				else boltPar.len = boltLen;
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2 * turnFactor;
				bolt.position.x = par.holeCenters[i].x;
				bolt.position.y = par.holeCenters[i].y;
				bolt.position.z = (boltPar.len / 2 - params.stringerThickness) * turnFactor + params.stringerThickness*(1-turnFactor)*0.5;
				if (side == "right") {				
					bolt.position.z = (params.stringerThickness * 2 - boltPar.len / 2) * turnFactor + params.stringerThickness * (1 - turnFactor) * 0.5;
					bolt.rotation.x = -Math.PI / 2 * turnFactor;
				}
				par.mesh.add(bolt)
			}
		}
	}
				
	//сохраняем данные для спецификации
	var flanWidth = Math.round(distance(p1, p2))
	var flanLen = Math.round(p3.x - p1.x)
	var partName = "stringerFlan";
	if (typeof specObj !='undefined'){
		if (!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Фланец соединения косоуров",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
				}
		}
		var name = flanLen + "x" + flanWidth;
		var area = flanLen * flanWidth / 1000000;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}				
		
	return par.mesh;
	}
	return null;
	
} //end of drawStringerFlan

/*
 * Определение расположения отверстий в косоуре для фланцев
 */

function calcFlanHoles(par){
	
	var marshPar = getMarshParams(par.marshId);
	var holeDist = 60; //расстояние между верхним и нижним рядами отверстий
	var sideOffset = 45; // Смещение центров крайних отверстий относительно края косоура
	par.holeCenters = [];
	
	//отверстия под уголок/рамку совпадают с отверстиями фланца кроме лотков и рифленки
	var center1 = par.angleHoles.center1;
	var center2 = par.angleHoles.center2;
	
	
	if (params.stairType == "лотки" || params.stairType == "рифленая сталь" || params.stairType == "пресснастил") {
		center1.y = center2.y = par.divideP1.y + holeDist / 2; // - params.treadThickness;
		center1.hasAngle = center2.hasAngle = false;
		//par.divideP2.y -= params.treadThickness;
	}
	else {
		center1.headType = center2.headType = "потай";
		center1.boltLen = center2.boltLen = boltLen + 10;
	}
	
	//крайние левые отверстия
	if (params.stringerType != "прямая" || par.isMiddleStringer) {
		var center7 = newPoint_xy(center1, 0, -holeDist);
		var center8 = newPoint_xy(center2, 0, -holeDist);
		center1.pos = "topLeft";
		center7.pos = "botLeft";
		center7.hasAngle = center8.hasAngle = false;
		center1.isMiddleFlanHole = center2.isMiddleFlanHole = center7.isMiddleFlanHole = center8.isMiddleFlanHole = true;
		par.holeCenters.push(center1, center2, center7, center8);
	}
	if (params.stringerType == "прямая" && !par.isMiddleStringer) {
		//точка пересечения линии среза и линии, параллельной передней линии тетивы с отступом sideOffset
		var p1 = newPoint_xy(par.divideP1, sideOffset, 0);
		//крайние отверстия
		var center7 = newPoint_y(p1, holeDist / 2, marshPar.ang);
		var center8 = newPoint_y(p1, -holeDist / 2, marshPar.ang);
		center7.pos = "topLeft";
		center8.pos = "botLeft";
		/*
		//убираем верхнее отверстие и сдвигаем нижнее
		if(params.stairType == "рифленая сталь"){
			var center8 = newPoint_y(center1, -holeDist, marshPar.ang);
			center1.pos = "topLeft";
			center8.pos = "botLeft";
			}
		*/
		//дополнительные отверстия под отверстиями уголка
		var center5 = newPoint_xy(center1, 0, -holeDist);
		var center6 = newPoint_xy(center2, 0, -holeDist);
		center5.hasAngle = center6.hasAngle = false;
		center5.isMiddleFlanHole = center6.isMiddleFlanHole = true;
		center1.isMiddleFlanHole = center2.isMiddleFlanHole = true;

		if ((center8.x + 10) < center5.x) {
			center7.hasAngle = center8.hasAngle = false;
			center7.isMiddleFlanHole = center8.isMiddleFlanHole = true;
			par.holeCenters.push(center1, center2, center5, center6, center7, center8);
		}
		else {
			center1.pos = "topLeft";
			center5.pos = "botLeft";
			par.holeCenters.push(center1, center5);
			if (!(params.stairType == "лотки" || params.stairType == "рифленая сталь" || params.stairType == "пресснастил"))
				par.holeCenters.push(center2, center6);
		}
		
	}

	//center7.hasAngle = center8.hasAngle = false;
	//center1.isMiddleFlanHole = center2.isMiddleFlanHole = center7.isMiddleFlanHole = center8.isMiddleFlanHole = true;
	//par.holeCenters.push(center1, center2, center8);
	////if(params.stairType != "рифленая сталь") par.holeCenters.push(center7);
	//par.holeCenters.push(center7);
	
	//крайние правые отверстия
	
	if(params.stringerType == "ломаная"){
		var center3 = newPoint_xy(par.divideP2, -sideOffset, holeDist / 2);
		var center4 = newPoint_xy(par.divideP2, -sideOffset, -holeDist / 2);		
		}
	if(params.stringerType != "ломаная"){
		//точка пересечения линии среза и линии, параллельной задней линии тетивы с отступом sideOffset
		var p1 = newPoint_xy(par.divideP2, -sideOffset, 0);
		var center3 = newPoint_y(p1, holeDist/2, marshPar.ang);
		var center4 = newPoint_y(p1, -holeDist/2, marshPar.ang);	
		}

	center3.pos = "topRight";
	center4.pos = "botRight";
	center3.hasAngle = center4.hasAngle = false;
	center3.isMiddleFlanHole = center4.isMiddleFlanHole = true;
	par.holeCenters.push(center3, center4);
	
	
		
	return par;	
} //end of calcFlanHoles



/**
 * положение уголков под площадкой при изменении ширины марша
 */

function setBridgeAnglePos(){
	
	var angleOffset = 110;
	if(params.M < 800) angleOffset = 80;

	var angId = "У2-40х40х200";
	var angLen = 200;
	var holeDist = 150; //расстояние между отверстиями уголка ступени
	if (params.M < 600){
		angId = "У2-40х40х90";
		holeDist = 50;
		var angLen = 90;
		}
	var angSideHoleDist = (angLen - holeDist) / 2; //расстояние от центра отверстия до края уголка
	
	var par = {
		sideHolePosX: angleOffset + angSideHoleDist,
		holeDist: holeDist,
		angId: angId,
		angLen: angLen,
		angSideHoleDist: angSideHoleDist,
		angleOffset: angleOffset,
		}

	return par;
}

/** функция отрисовывает перемычку марша для лестниц ЛТ с уголками
*@param dxfBasePoint
*@param hasDoubleTreadAngles
*@param noBoltsOnBridge
*/
function drawBridge_2(par) {

	/*
	dxfBasePoint
	hasDoubleTreadAngles
	noBoltsOnBridge
	*/

	par.mesh = new THREE.Object3D();
	
	
	var metalMaterial = new THREE.MeshLambertMaterial({ color: 0x068636, wireframe: false });
	if(!$sceneStruct.vl_1.realColors) metalMaterial = params.materials.metal;


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
	if(params.model == "ко") par.len -= params.sideOverHang * 2;
	var gap = 0.1; //зазор для тестирования
	
	var p0 = {x: 0, y: 0};

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
	if(par.hasDoubleTreadAngles)
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
	//нет болтов в грани 1
	carcasAnglePar.noBoltsInSide1 = false;	
	if(turnFactor == -1 && par.noBoltsOnBridge) carcasAnglePar.noBoltsInSide1 = true;
	if(par.noBoltsOnBridge2) carcasAnglePar.noBoltsInSide1 = true;
	var angle = drawAngleSupport(carcasAnglePar);
	angle.rotation.z = -Math.PI / 2;
	angle.position.z = thk; 
	par.mesh.add(angle);
	
	//правый
	//нет болтов в грани 1
	carcasAnglePar.noBoltsInSide1 = false;
	if(turnFactor == 1 && par.noBoltsOnBridge) carcasAnglePar.noBoltsInSide1 = true;
	if(par.noBoltsOnBridge1) carcasAnglePar.noBoltsInSide1 = true;
	angle = drawAngleSupport(carcasAnglePar);
	angle.rotation.z = Math.PI / 2;
	angle.position.x = par.len;
	angle.position.y = -100;
	angle.position.z = thk; 
	par.mesh.add(angle);

	// уголки крепления ступени
	var treadAnglePar = {
		model: anglePos.angId,
		}
	//нет болтов в грани 1
	if(par.hasDoubleTreadAngles) treadAnglePar.noBoltsInSide1 = true;

			
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

	if(par.hasDoubleTreadAngles){
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

		if(drawLongBolts){
			var boltPar = {
				diam: 10,
				len: 30,
				headType: "шестигр.",
				}
			for(var i=0; i<noZenkHoles.length; i++){
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = noZenkHoles[i].x;
				bolt.position.y = noZenkHoles[i].y;
				bolt.position.z = thk/2;
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
	
	return par;

} //end of drawBridge_2


/**
 * Выбор уголка под ступенями
 */
function setStairAngles(par) {
	// остальные уголки
	if (par.a > 260) {
		par.angleBottomType = "У2-40х40х230";
		par.holeDist = 180;
		par.angleLen = 230.0;
	}
	else {
		par.angleBottomType = "У2-40х40х200";
		par.holeDist = 150;
		par.angleLen = 200.0;
	}
	if (par.a < 230) {
		par.angleBottomType = "У2-40х40х160";
		par.holeDist = 110;
		par.angleLen = 160.0;
	}
	if (par.a < 180) {
		par.angleBottomType = "У2-40х40х90";
		par.holeDist = 50;
		par.angleLen = 90.0;
	}

	//делаем верхний уголок точно таким же, как остальные
	par.angleTopType = par.angleBottomType;
	par.angle2Len = par.angleLen;


	// от края до отверстия
	par.angleHolePosX = 25.0;
	par.angleHolePosY = 20.0;
	
	par.holeDistU2_200 = 150;     // расстояние между отверстиями для уголка У2-200
	par.stepHoleX1 = par.angleHolePosX + params.nose;
	
} //end of setStairAngles

/**
 * ЗАДАНИЕ РАСПОЛОЖЕНИЯ СТОЕК, ПЕРЕМЫЧЕК, РАЗРЕЗА СРЕДНИХ СТУПЕНЕЙ ;;; 
 */
function ltko_set_railing(stairAmt, par) {
	
	// номера ступеней, где устанавливается перемычка
	par.bridge = [];
	
// номера ступеней, где устанавливается промежуточная стойка. Первая и последняяя добавляются по умолчанию
par.railing = [];
	if (params.railingModel != "Самонесущее стекло"){	
	par.railing = setRackPos(par.marshId); //функция в файле calcRailingParams.js
		}

	//учитываем начало ограждений не с первой ступени
	if (par.marshId == 1) stairAmt -= params.railingStart + params.startTreadAmt;

	if (params.railingModel == "Самонесущее стекло"){
		if (stairAmt == 3) par.railing = [3];
		if (stairAmt == 4) par.railing = [4];
		if (stairAmt == 5) par.railing = [3,4, 5];
		if (stairAmt == 6) par.railing = [3,4, 6];
		if (stairAmt == 7) par.railing = [3,4, 5,6, 7];
		if (stairAmt == 8) par.railing = [3,4, 6,7, 8];
		if (stairAmt == 9) par.railing = [3,4, 6,7, 9];
		if (stairAmt == 10) par.railing = [3,4, 5,6, 7,8, 10];
		if (stairAmt == 11) par.railing = [3,4, 6,7, 9,10, 11]; 
		if (stairAmt == 12) par.railing = [3,4, 6,7, 9,10, 12];
		if (stairAmt == 13) par.railing = [3,4, 6,7, 9,10, 11,12, 13];
		if (stairAmt == 14) par.railing = [3,4, 6,7, 9,10, 12,13, 14];
		if (stairAmt == 15) par.railing = [3,4, 6,7, 9,10, 12,13, 15];
		if (stairAmt == 16) par.railing = [3,4, 6,7, 9,10, 12,13, 14,15, 16];
		if (stairAmt == 17) par.railing = [3,4, 6,7, 9,10, 12,13, 15,16, 17];
		if (stairAmt == 18) par.railing = [3,4, 6,7, 9,10, 12,13, 15,16, 18];
		if (stairAmt == 19) par.railing = [3,4, 6,7, 9,10, 12,13, 15,16, 17,18, 19];
		if (stairAmt == 20) par.railing = [3,4, 6,7, 9,10, 12,13, 15,16, 18,19, 20];
		if (stairAmt == 20) par.railing = [3,4, 6,7, 9,10, 12,13, 15,16, 18,19, 21];
		}


} //end of ltko_set_railing

//ПРАВКА РАЗРЕЗА СРЕДНИХ СТУПЕНЕЙ

function ltko_set_divide(marshId) {

	var marshParams = getMarshParams(marshId);
	var stairAmt = marshParams.stairAmt;
	
	var divide = 0;
	var bridges = [];
	//перемычки
	var bridgesAmt = Math.floor((stairAmt - 1) / 4);
	for(var i=0; i<bridgesAmt; i++){
		var bridgePos = Math.round(stairAmt / (bridgesAmt + 1) * (i+1)) + 1
		//костыли чтобы не было пересечений с фланцем соедениения косоуров
		if(stairAmt == 13 && bridgePos == 8) bridgePos = 7
		bridges.push(bridgePos);
		}
	//разделение
	var divide = Math.ceil(stairAmt / 2);
	if(stairAmt < 11) divide = 0;
	
	//стойка ограждения не должна попадать на фланец
	var rackPos = setRackPos(marshId);

	if(rackPos.indexOf(divide) != -1) divide ++;
	
	//если разделение совпадает с перемычкой, сдвигаем перемычку
	if(bridges.indexOf(divide) != -1 && !hasTreadFrames()) bridges[bridges.indexOf(divide)] ++;

	var result = {
		divide: divide,
		bridges: bridges,
		}
	console.log(result)
	return result;
	
} //end of ltko_set_divide


/** функция отрисовывает блок из двух верхний фланцев
*/
function drawTopFixFlans(par){
	par.mesh = new THREE.Object3D();

	var marshParams = getMarshParams(3);
	
	var holeOffset = 20; //отступ центра верхнего отверстия от края фланца
	var botLedge = params.treadThickness + 40; //выступ фланца ниже верхней плоскости ступени, 40 - высота рамки
	if (params.platformTop == "площадка") botLedge += 20;
	if (params.stairType == "рифленая сталь" || params.stairType == "лотки")
		botLedge = params.treadThickness + 50; //выступ фланца ниже верхней плоскости ступени, 50 - высота рамки
	if (params.topAnglePosition == "под ступенью") botLedge += 100;
	if (params.topAnglePosition == "над ступенью") botLedge = -10;
	
	par.flanLen = holeOffset + botLedge;
	if (params.topFlanHolesPosition) par.flanLen += params.topFlanHolesPosition;
	var lastRise = 0;
	if (params.platformTop !== "площадка") {
		var lastRise = params.h3;
		if (params.stairModel == 'Прямая') lastRise = params.h1;
	}

	var sideOffset = params.stringerThickness;
	if (params.model == "ко") sideOffset += params.sideOverHang;

	var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 200, -500);
	
	//левый фланец
	var flan1 = drawTopFixFlan(par.flanLen, dxfBasePoint).mesh;
	flan1.position.x = -params.M / 2 + sideOffset;
	flan1.position.y = -lastRise - botLedge; 
	if (params.stairType == "дпк") flan1.position.z = 8;
	if (marshParams.stairAmt == 0 && marshParams.botTurn == "забег") {
		if (params.model == "лт") flan1.position.z += params.lastWinderTreadWidth - marshParams.nose;
		if (params.model == "ко") flan1.position.z += params.lastWinderTreadWidth - 55;
	}
	flan1.position.z += 0.01;
	par.mesh.add(flan1);

	dxfBasePoint.x += 300;
	
	//правый фланец
	var flan2 = drawTopFixFlan(par.flanLen, dxfBasePoint).mesh;
	flan2.position.x = params.M / 2 - 100 - sideOffset;
	flan2.position.y = flan1.position.y; 
	if (params.stairType == "дпк") flan2.position.z = 8;
	if (marshParams.stairAmt == 0 && marshParams.botTurn == "забег") {
		if (params.model == "лт") flan2.position.z += params.lastWinderTreadWidth - marshParams.nose;
		if (params.model == "ко") flan2.position.z += params.lastWinderTreadWidth - 55;
	}
	flan2.position.z += 0.01;
	par.mesh.add(flan2);
	
	return par;
}


/*
 * Тетива
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */


function drawTopFixFlan(length, dxfBasePoint) {
	
	var dxfArr = dxfPrimitivesArr;
	

	/*функция отрисовывает верхний фланец крепления к перекрытию ФК-15*/
	// var dxfBasePoint = { "x": 0.0, "y": 0.0 };
	var flanParams = {
		width: 100,
		holeDiam: 13,
		holeDiam5: 0,
		angleRadUp: 10,
		angleRadDn: 10,
		hole1X: 50,
		hole1Y: 20,
		hole2X: 20,
		hole2Y: 20,
		hole3X: 20,
		hole3Y: 20,
		hole4X: 50,
		hole4Y: 80,
		hole1Zenk: 'no',
		hole2Zenk: 'no',
		hole3Zenk: 'no',
		hole4Zenk: 'no',
		hole5X: 0,
		hole5Y: 0,
		height: length,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfArr,
	};
	if (params.topAnglePosition == "рамка верхней ступени") {
		flanParams.hole1X = 0;
		flanParams.hole1Y = 0;
		flanParams.hole4X = 0;
		flanParams.hole4Y = 0;
	}
	//добавляем фланец
	flanParams.mesh = new THREE.Object3D();
	flanParams = drawRectFlan(flanParams);

	flanParams.shape.drawing = {
		name: "Фланец верхний"
	}
	shapesList.push(flanParams.shape);

	var text = "Фланец верхний";
	var textHeight = 30;
	var textBasePoint = newPoint_xy(dxfBasePoint, -50, -50);
	addText(text, textHeight, dxfArr, textBasePoint);

	var thickness = 8;
	var extrudeOptions = {
		amount: thickness - 0.01,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var geometry = new THREE.ExtrudeGeometry(flanParams.shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geometry, params.materials.metal2);
	mesh.position.z = -thickness;
	//mesh.position.y = -length;

	flanParams.mesh.add(mesh);

	//болты
	//if (typeof anglesHasBolts != "undefined" && anglesHasBolts) { //глобальная переменная
	//	var boltPar = {
	//		diam: boltDiam,
	//		len: boltLen,
	//	}
		
	//	var x = flanParams.width / 2;
	//	var z = -boltPar.len / 2;
	//	var y = flanParams.hole1Y;

	//	var bolt = drawBolt(boltPar).mesh;
	//	bolt.rotation.x = -Math.PI / 2;
	//	bolt.position.x = x;
	//	bolt.position.z = z;
	//	bolt.position.y = y;
	//	flanParams.mesh.add(bolt);

	//	var bolt2 = drawBolt(boltPar).mesh;
	//	bolt2.rotation.x = -Math.PI / 2;
	//	bolt2.position.x = x;
	//	bolt2.position.y = flanParams.hole4Y;
	//	bolt2.position.z = z;
	//	flanParams.mesh.add(bolt2);
	//}
	
	//сохраняем данные для спецификации
	var partName = "topFlan";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Фланец ФК-15",
				area: 0,
				paintedArea: 0,
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "area", //единица измерения
				group: "Каркас",
				}
			}
		var name = length + "x" + flanParams.width + "x" + 8;
		var area = length * flanParams.width / 1000000;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
		}
		
	return flanParams;
	
}//end of drawTopFixFlan



/**
 * расчет точек сопряжения двух отрезков
 * @param {Object} <начальная точка>
 * @param {Double} <угол первого сопрягаемого отрезка>
 * @param {Object} <конечная точка>
 * @param {Double} <угол второго сопрягаемого отрезка>
 * @param {Double} <радиус сопряжения>
 * @return {Object} -
 *   точка пересечения отрезков, начальная точка дуги, конечная точка дуги, центр дуги,
 *   начальный угол дуги, конечный угол дуги
 */
function fillet(pt1, ang1, pt2, ang2, rad) {
	var pti = itercection(pt1, polar(pt1, ang1, 1.0), pt2, polar(pt2, ang2, 1.0));
	if (pti.x !== undefined && pti.y !== undefined) {
		var n = Math.abs(rad / Math.tan((ang2 - ang1) * 0.5));
		var pta = polar(pti, ang1, -n);
		var ptb = polar(pti, ang2, -n);
		var ang = Math.abs(ang2 - ang1);
		ang = ang1 + Math.PI * ((ang2 > ang1 && ang > Math.PI) || (ang2 < ang1 && ang < Math.PI) ? 0.5 : -0.5);
		var ptc = polar(pta, ang, rad);
		return { "int": pti, "start": pta, "end": ptb, "center": ptc, "angstart": anglea(ptc, pta), "angend": anglea(ptc, ptb) };
	}
	else {
		return null;
	}
}

/**
 * угол между осью X и отрезком, соединяющим точки
 * @param {Object} - точка 1
 * @param {Object} - точка 2
 * @return {Double}
 */
function anglea(pt1, pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var ang = Math.acos(x / Math.sqrt(x * x + y * y));
	return pt2.y > pt1.y ? ang : Math.PI + Math.PI - ang;
}


function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function addArc1(centerPoint, radius, startAngle, endAngle, par) {
	addArc(par.stringerShape, dxfPrimitivesArr, centerPoint, radius, startAngle, endAngle, par.dxfBasePoint);

	//Возвращает точку привязки следующего примитива
	return polar(centerPoint, endAngle, radius);
}

function addLine1(startPoint, endPoint, par) {
	addLine(par.stringerShape, dxfPrimitivesArr, startPoint, endPoint, par.dxfBasePoint);

	//Возвращает точку привязки следующего примитива
	return endPoint;
}

/**функция отрисовки колонны. базовая точка это центр верхнего отверстия
*/
function drawColumn2(par) {
	
	par.mesh = new THREE.Object3D();
	//var shape = new THREE.Shape();
	
	var holeOffset = 20;
	var colLength = par.colLength + holeOffset;
	var holeDst = 60;
	var holeRad = 6.5;

	//учитываем регулируемую опору
	var adjustableLegHeight = 65;
	if (par.profWidth != 40) colLength -= adjustableLegHeight;

	var p0 = { x: 0, y: 0 }
	var p1 = newPoint_xy(p0, -par.profWidth / 2, holeOffset)
	var p2 = newPoint_xy(p1, 0, -colLength);// + holeOffset) // params basePoint, deltaX, deltaY
	var p3 = newPoint_xy(p2, par.profWidth, 0)
	var p4 = newPoint_xy(p1, par.profWidth, 0)

	var pointsShape = [p1, p2, p3, p4];

	//создаем шейп
	var shapePar = {
		points: pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}
	//параметры для рабочего чертежа
	if (!par.drawing) {
		shapePar.drawing = {
			name: "Колонна",
			group: "Columns",
		}
	}
	shape = drawShapeByPoints2(shapePar).shape;

	//круглое отверстие 1

	var center1 = newPoint_xy(p0, 0, 0);
	var center2 = newPoint_xy(center1, 0, -holeDst);
	addRoundHole(shape, par.dxfArr, center1, holeRad, par.dxfBasePoint); //функция в файле drawPrimitives
	addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint); //функция в файле drawPrimitives


	//подпись под фигурой
	var text = par.text;
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, -70, -100)
	addText(text, textHeight, par.dxfArr, textBasePoint)

	//тело
	var extrudeOptions = {
		amount: par.profHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var col = new THREE.Mesh(geom, params.materials.metal);
	col.position.x = -par.profWidth / 2;
	col.position.z = -par.profHeight / 2;
	par.mesh.add(col);
	
	// болты
	
	if(typeof anglesHasBolts != "undefined" && anglesHasBolts){ //глобальная переменная
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
		}
		
		var bolt = drawBolt(boltPar).mesh;
        bolt.rotation.x = Math.PI / 2 * turnFactor;
	    if (params.model == "ко") bolt.rotation.x = -Math.PI / 2 * turnFactor;
		bolt.position.x = - par.profWidth / 2;
		bolt.position.z = (boltPar.len / 2 - boltBulge - par.profHeight / 2) * turnFactor;
	    if (params.model == "ко") bolt.position.z = -(boltPar.len / 2 - boltBulge - par.profHeight / 2) * turnFactor;
        if (par.key == "in") {
            bolt.rotation.x *= -1;
            bolt.position.z *= -1;
        }
		par.mesh.add(bolt);
				
		var bolt2 = drawBolt(boltPar).mesh;
		bolt2.rotation.x = bolt.rotation.x;
		bolt2.position.x = bolt.position.x;
		bolt2.position.y = bolt.position.y - holeDst; 
		bolt2.position.z = bolt.position.z;
		par.mesh.add(bolt2);
	}

	if (par.profWidth != 40) {
		var isAngle = false; //отрисовываем регулируемую опору без уголка
		var leg = drawAdjustableLeg(isAngle);
		leg.position.x = -par.profWidth ;
		leg.position.z = -par.profHeight / 2 - 12;
		leg.position.y = p2.y - 25;// + 40;
		par.mesh.add(leg);
	//	col.position.y += adjustableLegHeight;
	}

	//сохраняем данные для спецификации
	var partName = "column";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				sumLength: 0,
				name: "Колонна",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
			}
		var name = Math.round(colLength) + "x" + par.profWidth + "x" + par.profHeight;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumLength"] += colLength;
	}

	par.dxfBasePoint.x += par.profWidth + 100;

	return par;
}//end of drawColumn2


/**
 * Функия отрисовывает опорный подкос площадки
 * базовая точка - верхнее левое отверстие верхнего фланца
 *@param width
 *@param topJoin
 
 */

function drawBrace(par) {

	var brace = new THREE.Object3D();
	
	//необязательные параметры
	if(!par.dxfArr) par.dxfArr = dxfPrimitivesArr;
	if(!par.dxfBasePoint) {
		par.dxfBasePoint = {x:0, y:0},
		par.dxfArr = [];
		}

	// константы
	var profHeight = 60;
	var profWidth = 30;
	var maxDst = 1200; //максимально допустимое расстояние между подкосами
	var angle = Math.PI / 6; //угол наклона подкоса
	var rad1 = 10;
	var rad2 = 30;
	var plateThickness = 8;
	var holeRad = 6.5;
	//размеры кронштейна
	var flanHeight = 90;
	var flanWidth = 135;
	var jointWidth = 80;
	var teethSize = 50;
	var holeDistX = 95;
	var holeDistY = 60;
	var rodLength = (par.width - (plateThickness + 45) * 2) / Math.cos(angle) + 30 * 2;
	par.height = (rodLength - 30 * 2) * Math.sin(angle);	// расстояние между отверстиями верхнего и нижнего фланцев по вертикали
	
	
	//смещение всех деталей так, чтобы базовой точкой подкоса был центр верхнего левого отверстия
	var mooveX = -(flanWidth - holeDistX) / 2 - 5;
	if(par.side == "left") mooveX -= 85;
	var mooveY = -par.height - (flanHeight - holeDistY) / 2;
	
	// стержень
	var rod = new THREE.Object3D();
	var rodShape = new THREE.Shape();

	// контур
	var p1 = { "x": -30, "y": -profHeight * 0.5 };
	var p2 = newPoint_xy(p1, 0, profHeight);
	var p3 = newPoint_xy(p2, rodLength, 0);
	var p4 = newPoint_xy(p3, 0, -profHeight);
	addLine(rodShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(rodShape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(rodShape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(rodShape, par.dxfArr, p4, p1, par.dxfBasePoint);
	
	// круглые отверстия
	center1 = { "x": 0, "y": 0 };
	center2 = newPoint_xy(p4, -30, profHeight * 0.5);
	addRoundHole(rodShape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
	addRoundHole(rodShape, par.dxfArr, center2, holeRad, par.dxfBasePoint);

	var text = "Стержень подкоса"
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -80);
	addText(text, textHeight, par.dxfArr, textBasePoint);

	var extrudeOptions = {
		amount: profWidth,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1,
	}

	var geometry = new THREE.ExtrudeGeometry(rodShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	rod = new THREE.Mesh(geometry, params.materials.metal2);
	rod.rotation.y = -Math.PI * 0.5;
	rod.position.x = (flanWidth + profWidth) * 0.5 + mooveX;
	rod.position.y = flanHeight * 0.5 + mooveY;
	rod.position.z = plateThickness + 45;
	rod.rotation.x = -angle;

	brace.add(rod);

	// кронштейн
	
	//наличие врехнего кронштейна
	par.topJoin = true;
	if (params.topPltConsolePos == "сзади") par.topJoin = false;

	// Фланец кронштейна
	par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -200);
	
	var points = [];
	var p0 = {x:0, y:0}; //нижний левый угол
	var p1 = copyPoint(p0)
	var p2 = newPoint_xy(p1, 0, flanHeight) //верхний левый угол
	var p3 = newPoint_xy(p1, flanWidth, flanHeight);
	var p4 = newPoint_xy(p1, flanWidth, 0);
	
	points.push(p1, p2, p3, p4)
	
	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		radOut: 10,
		radIn: 10,
		}

	var flanShape = drawShapeByPoints2(shapePar).shape;
	
	// круглые отверстия
	center1 = newPoint_xy(p0, 20, 15);
	center2 = newPoint_xy(p0, 20, flanHeight - 15);
	center3 = newPoint_xy(p0, flanWidth - 20, flanHeight - 15);
	center4 = newPoint_xy(p0, flanWidth - 20, 15);
	addRoundHole(flanShape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
	addRoundHole(flanShape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
	addRoundHole(flanShape, par.dxfArr, center3, holeRad, par.dxfBasePoint);
	addRoundHole(flanShape, par.dxfArr, center4, holeRad, par.dxfBasePoint);
	// прямоугольные отверстия
	/*первое прямоугольное отверстие*/
	var hole1 = new THREE.Path();
	var p1 = newPoint_xy(p0, (flanWidth - (profWidth - 1)) / 2 - (plateThickness + 2), (flanHeight - (teethSize + 2)) / 2);
	var p2 = newPoint_xy(p1, plateThickness + 2, 0);
	var p3 = newPoint_xy(p2, 0, teethSize + 2);
	var p4 = newPoint_xy(p3, -(plateThickness + 2), 0);
	addLine(hole1, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(hole1, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(hole1, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(hole1, par.dxfArr, p4, p1, par.dxfBasePoint);
	flanShape.holes.push(hole1);
	
	/*второе прямоугольное отверстие*/
	var hole2 = new THREE.Path();
	var p1 = newPoint_xy(p0, (flanWidth + (profWidth - 1)) / 2, (flanHeight - (teethSize + 2)) / 2);
	var p2 = newPoint_xy(p1, plateThickness + 2, 0);
	var p3 = newPoint_xy(p2, 0, teethSize + 2);
	var p4 = newPoint_xy(p3, -(plateThickness + 2), 0);
	addLine(hole2, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(hole2, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(hole2, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(hole2, par.dxfArr, p4, p1, par.dxfBasePoint);
	flanShape.holes.push(hole2);

	var text = "Фланец кронштейна"
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -80);
	addText(text, textHeight, par.dxfArr, textBasePoint);

	var extrudeOptions = {
		amount: plateThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1,
	}

	var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	wallPlate1 = new THREE.Mesh(geometry, params.materials.metal);

	wallPlate1.position.x = mooveX;
	wallPlate1.position.y = mooveY;
	wallPlate1.position.z = 0;

	brace.add(wallPlate1);

	if (par.topJoin == true) {
		wallPlate2 = new THREE.Mesh(geometry, params.materials.metal);

		wallPlate2.position.x = mooveX;
		wallPlate2.position.y = (rodLength - 30 * 2) * Math.sin(angle) + mooveY;
		wallPlate2.position.z = par.width - plateThickness;

		brace.add(wallPlate2);
	}

	// Косынка кронштейна

	par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 300, 0);

	//var rodPlate = new THREE.Object3D();
	var rodPlateShape = new THREE.Shape();
	// контур
	var p0 = { "x": 0, "y": 0 };
	var p1 = copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, (flanHeight - teethSize) / 2);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, -plateThickness, 0);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, teethSize);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, plateThickness, 0);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, (flanHeight - teethSize) / 2);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, jointWidth - rad2, 0);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	var pc = newPoint_xy(p1, 0, -rad2);
	p2 = newPoint_xy(p1, rad2, -rad2);
	addArc(rodPlateShape, par.dxfArr, pc, rad2, Math.PI * 0.5, 0, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, -(flanHeight - rad2 * 2));
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	var pc = newPoint_xy(p1, -rad2, 0);
	p2 = newPoint_xy(p1, -rad2, -rad2);
	addArc(rodPlateShape, par.dxfArr, pc, rad2, Math.PI * 2, Math.PI * 1.5, par.dxfBasePoint);
	addLine(rodPlateShape, par.dxfArr, p2, p0, par.dxfBasePoint);
	
	
	// отверстия
	center1 = newPoint_xy(p0, 45, flanHeight * 0.5);
	addRoundHole(rodPlateShape, par.dxfArr, center1, holeRad, par.dxfBasePoint);

	var text = "Косынка кронштейна"
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -80);
	addText(text, textHeight, par.dxfArr, textBasePoint);

    /*var extrudeOptions = {
        amount: plateThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1,
    }*/

	var geometry = new THREE.ExtrudeGeometry(rodPlateShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	rodPlate1 = new THREE.Mesh(geometry, params.materials.metal);

	rodPlate1.position.x = (flanWidth - (profWidth - 1)) / 2 - 1 + mooveX;
	rodPlate1.position.y = mooveY;
	rodPlate1.position.z = plateThickness;
	rodPlate1.rotation.y = -Math.PI * 0.5;

	brace.add(rodPlate1);

	rodPlate2 = new THREE.Mesh(geometry, params.materials.metal);
	rodPlate2.position.x = (flanWidth + (profWidth - 1)) / 2 + (plateThickness + 1) + mooveX;
	rodPlate2.position.y = mooveY;
	rodPlate2.position.z = plateThickness;
	rodPlate2.rotation.y = -Math.PI * 0.5;

	brace.add(rodPlate2);

	if (par.topJoin == true) {
		rodPlate3 = new THREE.Mesh(geometry, params.materials.metal);
		rodPlate3.position.x = (flanWidth - (profWidth - 1)) / 2 - (plateThickness + 1) + mooveX;
		rodPlate3.position.y = (rodLength - 30 * 2) * Math.sin(angle) + mooveY;
		rodPlate3.position.z = par.width - plateThickness;
		rodPlate3.rotation.y = Math.PI * 0.5;

		brace.add(rodPlate3);

		rodPlate4 = new THREE.Mesh(geometry, params.materials.metal);
		rodPlate4.position.x = (flanWidth + (profWidth - 1)) / 2 + 1 + mooveX;
		rodPlate4.position.y = (rodLength - 30 * 2) * Math.sin(angle) + mooveY;
		rodPlate4.position.z = par.width - plateThickness;
		rodPlate4.rotation.y = Math.PI * 0.5;

		brace.add(rodPlate4);
	}
	

		
	//сохраняем данные для спецификации
	var partName = "brace";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Подкос (компл.)",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
			}
		var name = profHeight + "x" + profWidth + "x" + Math.round(rodLength);
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		}
	par.mesh = brace;
	
	return par;
}//end of drawBrace

/**
 * Колона под площадкой
 * без/с фланцем
 */


 /**Функция добавляет отверстия для ограждений в шейп. Для ограждений со 
*стойками второе (нижнее) отверстие отрисовывается внутри функции. Также отмечается зенковка этих отверстий
*@params shape, holeCenters, dxfBasePoint
*/

function drawRailingHoles(par) {
	//функция добавляет отверстия для крепления ограждений и отмечается зенковка этих отверстий

	var trashShape = new THREE.Shape();
	var zencDiam = 20; //диаметр зенковки
	var layer = "parts";
	

	for (var i = 0; i < par.holeCenters.length; i++) {
		var center = par.holeCenters[i];

		if (params.railingModel != "Самонесущее стекло" && !center.noDraw && !center.noDrawHoles) {
			layer = "parts"
			var rad = 6.5;
			if (center.rad) rad = center.rad;
			var center2 = newPoint_xy(center, 0.0, -60.0);
			center.holeData = {zenk: 'back'};
			center2.holeData = {zenk: 'back'};
			if (!center.noHole1) addRoundHoleRail(par.shape, dxfPrimitivesArr, center, rad, par.dxfBasePoint, layer);
			if (!center.noHole2) addRoundHoleRail(par.shape, dxfPrimitivesArr, center2, rad, par.dxfBasePoint, layer);

			//зенковка с обратной стороны
			layer = "comments";
			if (!center.noHole1) addRoundHoleRail(trashShape, dxfPrimitivesArr, center, zencDiam, par.dxfBasePoint, layer);
			if (!center.noHole2) addRoundHoleRail(trashShape, dxfPrimitivesArr, center2, zencDiam, par.dxfBasePoint, layer);
		}

		if (params.railingModel == "Самонесущее стекло") {
			layer = "parts";
			var rad = 9;
			center.holeData = {zenk: 'no'};
			addRoundHoleRail(par.shape, dxfPrimitivesArr, center, rad, par.dxfBasePoint, layer);
			
			//отсутствие зенковки отверстий рутелей если другие отверстия зенкуются
			if (params.boltHead == "countersunk") {
				layer = "comments";
				var pz1 = newPoint_xy(center, -zencDiam, zencDiam);
				var pz2 = newPoint_xy(center, zencDiam, -zencDiam);
				addLine(trashShape, dxfPrimitivesArr, pz1, pz2, par.dxfBasePoint, layer);
				pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
				pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
				addLine(trashShape, dxfPrimitivesArr, pz1, pz2, par.dxfBasePoint, layer);
			}
		}
	}
} //end of drawRailingHoles




function calcTurnLength(turnType){
	var par = {};
	if (turnType == "площадка") {
		if (params.model == "ко") par.tyrnLength = params.M + 50.0;
		if (params.model == "лт") par.tyrnLength = params.M - params.stringerThickness + 30.0;
		}

	if (turnType == "забег") {
		if (params.model == "ко") par.tyrnLength = params.M + 25.0;
		if (params.model == "лт") par.tyrnLength = params.M - params.stringerThickness + 31.0;
		}
	
	//глубина верхней площадки
	if (params.model == "ко") par.platformLengthTop = params.platformLength_3;
	if (params.model == "лт") par.platformLengthTop = params.platformLength_3 - params.stringerThickness;
	
	return par;

}




/** Определение параметров рамок площадок для ЛТ
* используется при отверстий под рамки площадок в тетивах/косоурах
*/
	
function calcPltFrameParams(parLength, parOver) {

	var platformLen = parLength - parOver - 5;
	if (params.stairType !== "рифленая сталь" && params.stairType !== "лотки" &&
		params.stairType !== "рифленый алюминий" && params.stairType !== "дпк") {
		platformLen -= 60.0;  // место для уголка
	}
		
	var result = {};	
	result.frameAmt = Math.ceil(platformLen / 605.0);  
	result.frameWidth = platformLen / result.frameAmt - 5.0;	

	return result;	
}

/**функция возвращает, есть ли на лестнице рамки ступеней

*/

function hasTreadFrames(){
	var hasFrames = false;
	if(params.model == "ко") hasFrames = true;
	if(params.model == "лт" && params.stairFrame == "есть") hasFrames = true;
	if(params.stairType == "рифленая сталь" || params.stairType == "лотки" || params.stairType == "пресснастил") hasFrames = true;
	
	return hasFrames;
}

function addRoundHoleRail(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint, layer) {
	if (params.rackBottom !== "сверху с крышкой" || params.railingModel == "Самонесущее стекло") {
		addRoundHole(shape, dxfPrimitivesArr, center, holeRad, dxfBasePoint, layer);
	}
}//end of addRoundHoleRail


function calcFirstRise(){
	if(params.model == "ко"){
		var rise = params.h1 - params.treadThickness;	
		}
	if(params.model == "лт"){
		var rise = params.h1 + 5;
		}
	if (params.botFloorType === "черновой") rise += params.botFloorsDist;
	if (params.bottomAngleType === "регулируемая опора") rise -= 20;
		
	return rise;
} //end of calcFirstRise

/** функция рассчитывает проступи забежных ступеней
*@params par - параметры забежных ступеней treadsObj.wndPar
*@returns wndSteps = [empty, treadSteps, treadSteps, treadSteps]
	treadSteps = {
		in: {
			topMarsh
			botMarsh
			}
		out: {
			topMarsh
			botMarsh
			}
		}

*/

function calcWndSteps(par){

//формируем каркас выходного объекта
var wndSteps = [];
	for(var i=1; i<=3; i++){ //нумерация ступеней начанается с 1
		var treadSteps = {
			out: {},
			in: {},
			};
		wndSteps[i] = treadSteps;
		}

var turnPar = calcTurnParams(par.botMarshId);
var marshPar = getMarshParams(par.botMarshId);
var nextMarshPar = getMarshParams(marshPar.nextMarshId)
wndSteps.frameFrontOffset = 40; //отступ рамки от передней грани ступени для КО, кроме первой
if(params.model == "лт") wndSteps.frameFrontOffset = 20;
var stringerLedge = 5;		// выступ тетивы за край степени
var treadSideGap = 5; //зазор от тетивы до торца ступени на ЛТ
if(params.stairType == "рифленая сталь" || params.stairType == "лотки") {
	wndSteps.frameFrontOffset = 0;
	treadSideGap = 0;
	}

	
//нижний марш

	if(params.model == "ко"){
	//первая ступень, внешняя сторона		
		wndSteps[1].out.botMarsh = par.params[1].stepWidthHi - params.sideOverHang * Math.tan(par.params[1].edgeAngle);
		//учитываем отступ передней кромки рамки 
		//верхний забег П-образной с забегом
		if(par.turnId == 2 && params.stairModel == "П-образная с забегом") wndSteps[1].out.botMarsh -= 20;
		else wndSteps[1].out.botMarsh -= params.nose;
		//учитываем подступенки
		if(params.riserType == "есть") wndSteps[1].out.botMarsh += params.riserThickness / Math.cos(par.params[1].edgeAngle) - params.riserThickness;
		
		
	//вторая ступень, внешняя сторона
		//суммарная длина забежных проступей
		var sumLen = turnPar.turnLengthTop - params.sideOverHang;
		//учитываем отступ передней кромки рамки 
		//верхний забег П-образной с забегом
		if(par.turnId == 2 && params.stairModel == "П-образная с забегом") sumLen -= 20;
		else sumLen -= params.nose;
		
		if(params.riserType == "есть") sumLen -= params.riserThickness;
		wndSteps[2].out.botMarsh = sumLen - wndSteps[1].out.botMarsh;

		}
		
	if(params.model == "лт"){
	
	//вторая ступень внешняя сторона
		
		wndSteps[2].out.botMarsh = par.params[2].stepWidthY + stringerLedge + treadSideGap;
		
	//первая ступень внешняя сторона
		
		wndSteps[1].out.botMarsh = turnPar.turnLengthTop - params.stringerThickness + stringerLedge - wndSteps[2].out.botMarsh;
		}
	
	
//верхний марш

	if(params.model == "ко"){
	
	//вторая ступень внешняя сторона
		
		var sideOffset = params.sideOverHang + params.stringerThickness; //отступ внутренней плоскости косоура от края ступени
		wndSteps[2].out.topMarsh = par.params[2].stepWidthX;
		//учитываем угол задней линии ступени
		wndSteps[2].out.topMarsh += sideOffset * Math.tan(par.params[2].angleY);
		//учитывем свес над косоуром нижнего марша
		wndSteps[2].out.topMarsh -= params.sideOverHang + params.stringerThickness;
		//учитываем подступенки
		if(params.riserType == "есть") wndSteps[2].out.topMarsh += params.riserThickness / Math.cos(par.params[2].angleY);
		
	//третья ступень внешняя сторона
		//суммарная длина забежных проступей
		var sumLen = turnPar.turnLengthBot + params.nose - params.sideOverHang - params.stringerThickness;
		if(params.riserType == "есть") sumLen += params.riserThickness;
		wndSteps[3].out.topMarsh = sumLen - wndSteps[2].out.topMarsh;
		
	//первая ступень внутренняя сторона
		
		
		var topStringerOffset = params.sideOverHang + turnPar.topMarshOffsetX - par.params[1].stepWidthLow; //отступ наружной плоскости косоура верхнего марша от заднего внутреннего угла первой забежной ступени
		wndSteps[1].in.topMarsh = params.sideOverHang  - topStringerOffset / Math.tan(par.params[1].edgeAngle);
		//учитываем подступенки
		if(params.riserType == "есть") wndSteps[1].in.topMarsh += params.riserThickness / Math.sin(par.params[1].edgeAngle);
		
		//учитываем то, что ступень срезана на остром углу
		if(wndSteps[1].in.topMarsh >= params.sideOverHang) wndSteps[1].in.topMarsh = params.sideOverHang
		//не делаем выступ если он меньше 10мм, из технологических соображений
		if(wndSteps[1].in.topMarsh <= 0 && wndSteps[1].in.topMarsh >= -10) wndSteps[1].in.topMarsh = 0;
		if(wndSteps[1].in.topMarsh > 0 && wndSteps[1].in.topMarsh < 10) wndSteps[1].in.topMarsh = 10;
		
	//третья ступень внутренняя сторона
		var stepWidthLow = par.params[3].stepWidthLow
		if(nextMarshPar.lastMarsh == true && nextMarshPar.stairAmt == 0){
			stepWidthLow = 55;
			}
			
		wndSteps[3].in.topMarsh = stepWidthLow + params.sideOverHang * Math.tan(par.params[3].edgeAngle);
		//учитываем отступ передней кромки рамки 
		wndSteps[3].in.topMarsh -= wndSteps.frameFrontOffset / Math.cos(par.params[3].edgeAngle);
		//учитываем подступенки
		if(params.riserType == "есть") wndSteps[3].in.topMarsh += params.riserThickness;

		
	//вторая ступень внутренняя сторона
		//суммарная длина забежных проступей
		var sumLen = params.sideOverHang + turnPar.topMarshOffsetZ + params.nose;
		if(params.riserType == "есть") sumLen += params.riserThickness;
		

		wndSteps[2].in.topMarsh = sumLen - wndSteps[1].in.topMarsh - wndSteps[3].in.topMarsh
		
		}
	if(params.model == "лт"){
	
	//третья ступень внешняя сторона
		
		wndSteps[3].out.topMarsh = par.params[1].stepWidthHi - par.params[1].stepWidthLow;
		
	//вторая ступень внешняя сторона
		
		wndSteps[2].out.topMarsh = turnPar.turnLengthBot - wndSteps[3].out.topMarsh - stringerLedge;
		}
	
	
return wndSteps;

}//end of calcWndSteps


function calcPltStringerWidth(){
	var width = 150;
	

	//увеличение чтобы помещались колонны
	if(params.columnModel != "нет") width = 200;
	//опускание соединительного уголка на углу площадки под рамку
	if (hasTreadFrames()) width = 200;

	//увеличиваем тетиву площадки чтобы помещались 2 рутеля
	if(params.model == "лт" && params.railingModel == "Самонесущее стекло")	width = 200;
	
	//увеличиваем тетивы для подкосов
	if(params.platformTopColumn != "колонны") width = 200;
	
	if (params.model == "ко") {
		width = 180;
		//увеличение чтобы помещались колонны
		if (params.columnModel != "нет") width = 200;
	}
	
	
	
	return width;
}



/*Добор верхней площадки*/


function drawExtender(par){
	var sideProfHeight = 100;
	var sideProfWidth = 50;
	var topProfHeight = 20;
	var topProfWidth = 40;

	var sideExtender = new THREE.Object3D();

	//верхняя рамка
	var shape = new THREE.Shape();

	//внешний контур
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.width);
	var p3 = newPoint_xy(p1, par.length, par.width);
	var p4 = newPoint_xy(p1, par.length, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	//внутренний контур
	if (par.width > 50) {
		var hole = new THREE.Path();
		p1 = newPoint_xy(p0, topProfWidth, topProfWidth);
		p2 = newPoint_xy(p1, 0, par.width - 2 * topProfWidth);
		p3 = newPoint_xy(p1, par.length - 2 * topProfWidth, par.width - 2 * topProfWidth);
		p4 = newPoint_xy(p1, par.length - 2 * topProfWidth, 0);
		addLine(hole, par.dxfArr, p1, p4, par.dxfBasePoint);
		addLine(hole, par.dxfArr, p4, p3, par.dxfBasePoint);
		addLine(hole, par.dxfArr, p3, p2, par.dxfBasePoint);
		addLine(hole, par.dxfArr, p2, p1, par.dxfBasePoint);
		shape.holes.push(hole);
	}

	var extrudeOptions = {
		amount: topProfHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var topFrame = new THREE.Mesh(geometry, par.material);
	topFrame.rotation.x = Math.PI/2;
	topFrame.position.y = -par.coverThk;
	topFrame.position.z = -par.width
	
	sideExtender.add(topFrame);


	//боковые профили

	var shape = new THREE.Shape();
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, sideProfHeight);
	var p3 = newPoint_xy(p1, par.width, sideProfHeight);
	var p4 = newPoint_xy(p1, par.width, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	var extrudeOptions = {
		amount: topProfWidth,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var sideProf1 = new THREE.Mesh(geometry, par.material);
	sideProf1.rotation.y = Math.PI/2;
	sideProf1.position.x = 100 - sideProfWidth;
	sideProf1.position.y = -sideProfHeight - topProfHeight - par.coverThk;
	sideExtender.add(sideProf1);

	var sideProf2 = new THREE.Mesh(geometry, par.material);
	sideProf2.rotation.y = Math.PI/2;
	sideProf2.position.x = par.length - 100;
	sideProf2.position.y = -sideProfHeight - topProfHeight - par.coverThk;
	sideExtender.add(sideProf2);
	
	//покрытие

	var shape = new THREE.Shape();
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.width);
	var p3 = newPoint_xy(p1, par.length, par.width);
	var p4 = newPoint_xy(p1, par.length, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);
	
	var extrudeOptions = {
		amount: par.coverThk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var cover = new THREE.Mesh(geometry, par.coverMaterial);
	cover.rotation.x = Math.PI/2;
	cover.position.z = -par.width
	sideExtender.add(cover);
	
	

	par.mesh = sideExtender;
	
	//сохраняем данные для спецификации
	var partName = "pltExtender";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Добор верхней площадки",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
			}
		var name = Math.round(par.width) + "x" + par.length;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		}
		

	return par;


	}

	
/**
 * Колона под площадкой для входной лестницы с фланцем с овальными отверстиями
 * с фланцем
 var columnParams = {
			length: stairAmtP * h1,
			profWidth: profWdth,
			profHeight: profHeight,
			material: metalMaterial,
			flanMaterial: flanMaterial,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: {x:-200, y:0},
			dxfBasePointStep: dxfBasePointStep,
			dir: "left",
			}
 */
function drawColumnF(par) {
	var flanThickness = 8.0;
	
	var shape = new THREE.Shape();

	// внешний контур
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.length);
	var p3 = newPoint_xy(p1, par.profWidth, par.length);
	var p4 = newPoint_xy(p1, par.profWidth, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	var extrudeOptions = {
		amount: par.profHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var col = new THREE.Mesh(geometry, params.materials.metal);

	//par.mesh = col;
    var grp = new THREE.Object3D();
	col.position.x = -par.profWidth / 2;
	col.position.z = flanThickness
	if(par.dir == "right") col.position.z = -par.profWidth - flanThickness;
	grp.add(col);

    // фланец
	var flan = drawColFlan(par);
	flan.position.x = -par.profHeight / 2;
	flan.position.y = par.length - 46.0;
	flan.position.z = 0//par.dir == "left" ? 0.0 : par.profHeight - flanThickness;
	if(par.dir == "right") flan.position.z = - flanThickness;
	flan.rotation.x = 0.0;
	flan.rotation.y = 0.0;
	flan.rotation.z = 0.0;
	grp.add(flan);
	

	par.mesh = grp;
	
//сохраняем данные для спецификации
	var partName = "columnF";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				sumLength: 0,
				name: "Колонна с фланцем",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
				}
			}
		var name = Math.round(par.length) + "x" + par.profWidth + "x" + par.profHeight;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumLength"] += par.length;
		}
	

	return par;
}//end of drawColumnF



//-------------------------------------------------------

/*отрисовка болтов крепления к стенам, нижнему и верхнему перекрытию*/
function drawFixPart(par) {
	/*
	diam
	len
	headType
	*/

	par.mesh = new THREE.Object3D();
	var fixPart = new THREE.Object3D();
	if (turnFactor == -1) fixPart.rotation.x = Math.PI;

	if (!anglesHasBolts) return par;

	par.material = new THREE.MeshLambertMaterial({ color: "#0000FF" });
	par.material = params.materials.bolt;
	par.dopParams = {};

	var thickness = params.stringerThickness;
	if (params.calcType == "mono") thickness = params.flanThickness;
	if (params.calcType == "vint") thickness = 8;	
	if (par.thickness) thickness = par.thickness;	


	if (par.fixPart == 'химия') {
		var stud = drawStudF(par);
		fixPart.add(stud);

		if (!testingMode) {
			//гайка
			var nut = drawNutF(par);
			nut.position.y = par.len / 2 - par.nutAmount - 5;
			fixPart.add(nut);

			//шайба
			var shim = drawShimF(par);
			shim.position.y = nut.position.y - par.shimAmount;
			fixPart.add(shim);
		}
		//хим. анкер

		//сохраняем данные для спецификации
		var partName = "chemAnc"
		if (typeof specObj != 'undefined' && partName) {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Анкер химический",
					metalPaint: false,
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "(эконом)";
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1 / 20;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1 / 20;
			specObj[partName]["amt"] += 1 / 20;
		}
		/*
		item = {
			id: "chemAnc",
			amt: 1/20,
			discription: "",
			unit: par.unit,
			itemGroup: par.itemGroup,
			};
		if(item.amt > 0) specObj.addItem(item);
		specObj["chemAnc"].comment = "монтаж: " + params.isHeating;
		
		/*
		par.dopParams = {
			name: "Химический анкер, баллон",
			lenCylinder: 75,
			diamCylinder: par.diam + 4,
			material: new THREE.MeshLambertMaterial({ color: "#0000FF" })
		}
		var anchor = drawStudF(par);
		anchor.position.y = - par.len / 2 + par.dopParams.lenCylinder / 2 + 1;
		fixPart.add(anchor);
		*/

		fixPart.position.y = (-par.len / 2 + par.nutAmount + par.shimAmount + 5) * turnFactor + thickness * (1 + turnFactor) * 0.5;

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

		fixPart.position.y = (-par.len / 2 + par.shimAmount) * turnFactor + thickness * (1 + turnFactor) * 0.5;

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

		fixPart.position.y = (-par.len / 2 + par.nutAmount + par.shimAmount + 5) * turnFactor + thickness * (1 + turnFactor) * 0.5;

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

		fixPart.position.y = (-par.len / 2) * turnFactor + thickness * (1 + turnFactor) * 0.5;

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

		fixPart.position.y = (-par.len / 2 + par.nutAmount + par.shimAmount + 5) * turnFactor + thickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	//проставка
	if (par.isSpacer) {
		for (var i = 1; i <= par.spacerAmt; i++) {
			par.material = params.materials.bolt;
			var spacer = drawSpacerF(par);
			spacer.position.y = -fixPart.position.y * turnFactor - par.spacerAmount * i;
			if (turnFactor == -1) spacer.position.y -= thickness;
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
		addCircle(hole, dxfArr, center, par.diam / 2 + 1, dxfBasePoint);
		shape.holes.push(hole);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var shim = new THREE.Mesh(geom, par.material);
		shim.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		par.partName = "fixSpacer"
		par.partName += "_M" + par.diam + "-" + par.fixSpacer;
		if (typeof specObj != 'undefined' && par.partName && par.fixSpacerLength) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: "Проставка",
					metalPaint: true,
					timberPaint: false,
					division: "metal",
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
		if (par.dopParams.name) nameFix = par.dopParams.name;

		par.partName = "stud_M"
		if (nameFix == 'Шпилька-шуруп') par.partName = "stud_screw_M"
		if (nameFix != "Шпилька") par.partName += diam;

		//if (nameFix == 'Химический анкер, баллон') par.partName = "chemAnc"
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
			if (nameFix == "Шпилька") name = diam;
			//if (nameFix == 'Химический анкер, баллон') name = "Ф" + diam + "x" + len;
			if (nameFix == 'Дюбель') name = "Ф" + diam + "x" + len;
			if (nameFix == "Шпилька") {
				if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += Math.round(len / 1000 * 10) / 10;
				if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = Math.round(len / 1000 * 10) / 10;
				specObj[par.partName]["amt"] += Math.round(len / 1000 * 10) / 10;
			}
			else {
				if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
				if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
				specObj[par.partName]["amt"] += 1;
			}

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

		var d = '';
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
			var name = d + par.diam + "х" + par.len;
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
		par.partName = "nut_M"
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
			var name = par.diam;
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
		addCircle(shape, dxfArr, center, par.diam, dxfBasePoint);

		var hole = new THREE.Path();
		addCircle(hole, dxfArr, center, par.diam / 2 + 1, dxfBasePoint);
		shape.holes.push(hole);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var shim = new THREE.Mesh(geom, par.material);
		shim.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		par.partName = "shim_M"
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
			var name = par.diam;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

		par.shimAmount = extrudeOptions.amount;

		return shim;
	}

	return par;
}

function drawForgedFramePart2(par) {

	/*
	var pole3DParams = {
		type: "pole", rack
		poleProfileY: 40,
		poleProfileZ: 60,
		dxfBasePoint: railingSectionParams.dxfBasePointHandrail,
		len: 1000,
		poleAngle: 0,
		angStart
		angEnd
		angTop
		material: params.materials.metal,
		dxfArr: dxfPrimitivesArr,
	  monoType: для монокосуров
	  stepH
	  nextStepH
	  holes отверстия для поворотного столба(считаются от нижней части стойки, для более продобной инфы см mono)
		}
		*/


	par.mesh = new THREE.Object3D();
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);

	par.stringerSideOffset = 0;
	if (params.model == "ко") par.stringerSideOffset = params.sideOverHang;


	//стойка
	if (par.type == "rack") {
		var points = [];
		var holeCenters = [];
		//высота верхнего наклонного среза стойки
		var deltaHeight = par.poleProfileY * Math.tan(par.angTop);

		//верхние точки
		var p0 = { x: 0, y: 0 };
		var p1 = newPoint_xy(p0, -par.poleProfileY / 2, par.len - deltaHeight - 0.01);
		var p2 = newPoint_xy(p1, par.poleProfileY, deltaHeight);

		if (par.angTop < 0) {
			p1 = newPoint_xy(p0, -par.poleProfileY / 2, par.len);
			p2 = newPoint_xy(p1, par.poleProfileY, deltaHeight);
		}
		points.push(p1, p2);

		par.topCutLen = distance(p1, p2);
		par.len2 = par.len - deltaHeight;
		par.angStart = 0;
		par.angEnd = par.angTop;

		//стойки монокосоуров

		if (params.calcType == 'mono' && !par.isBanister) {
			p0.y += 90; //костыль для совместимости с лт
			var botLen = 0;
			var stepH = par.stepH;
			var nextStepH = par.nextStepH;
			var holeDiam = 6;
			var bottomHoleOffset = 20;
			var banisterAngleOffset = 16;
			var banisterFlanThk = 8; //толщина фланца L-образной стойки
			var sideLenLast = 120; //длина уступа L-образной стойки

			var angleParams = {
				material: par.material,
				dxfArr: []
			}

			if (par.isBotFlan) par.monoType = 'platformRear';

			//расчет длины нижней части стойки (ниже уровня ступени)
			var botLen = marshPar.h; //длина от верха ступени до низа стойки
			if (par.monoType == 'middle') botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
			//if (par.monoType == 'last') botLen = params.treadThickness + bottomHoleOffset + banisterAngleOffset;
			if (par.monoType == 'last') botLen = params.treadThickness + par.poleProfileY + banisterFlanThk;
			if (par.monoType == 'turnRackStart') {
				//Г-образный поворот
				if (params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
					botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset + prevMarshPar.h;
					if (marshPar.botTurn == "забег") botLen += marshPar.h * 2;
				}
				//П-образный поворот
				if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
					botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
					if (marshPar.botTurn == "забег") {
						if (params.marshDist > 40)
							botLen += marshPar.h * 3;
						else
							botLen += marshPar.h * 5;
					}
				}
			}
			if (par.monoType == 'turnRackEnd') {
				//Г-образный поворот
				if (params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
					botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset + prevMarshPar.h;
					if (marshPar.botTurn == "забег") botLen += marshPar.h * 3;
				}
				//П-образный поворот
				if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
					botLen = params.treadThickness + bottomHoleOffset + banisterAngleOffset + marshPar.h;
				}
			}

			//нижние точки
			var p3 = newPoint_xy(p0, par.poleProfileY / 2, -botLen);
			var p4 = newPoint_xy(p3, -par.poleProfileY, 0);
			points.push(p3, p4);

			if (par.monoType == 'last') {
				var pointsDop = [];
				var pt1 = newPoint_xy(p0, par.poleProfileY / 2, -botLen);
				var pt2 = newPoint_xy(pt1, sideLenLast, 0);
				var pt3 = newPoint_xy(pt2, 0, par.poleProfileY);
				var pt4 = newPoint_xy(pt3, -sideLenLast, 0);
				pointsDop.push(pt1, pt2, pt3, pt4)

				//создаем шейп
				var shapeParDop = {
					points: pointsDop,
					dxfArr: dxfPrimitivesArr,
					dxfBasePoint: par.dxfBasePoint,
				}

				var shapeDop = drawShapeByPoints2(shapeParDop).shape;
				var extrudeOptionsDop = {
					amount: par.poleProfileZ,
					bevelEnabled: false,
					curveSegments: 12,
					steps: 1
				};

				var poleGeometry = new THREE.ExtrudeGeometry(shapeDop, extrudeOptionsDop);
				poleGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var poleDop = new THREE.Mesh(poleGeometry, par.material);
				poleDop.rotation.y = -Math.PI / 2 * turnFactor;
				poleDop.position.z = par.poleProfileY / 2;
				poleDop.position.x = par.poleProfileY / 2 * turnFactor;
				if (par.railingSide == "right" && turnFactor == 1) poleDop.position.z -= sideLenLast + par.poleProfileY;
				if (par.railingSide == "left" && turnFactor == -1) poleDop.position.z += sideLenLast + par.poleProfileY;

				par.mesh.add(poleDop);
			}

			//отверстия под уголки

			//сдвиг первой стойки первого марша, чтобы стойка не пересекала пригласительную ступень

			var isFirstMove = false;
			if (par.isFirst && params.railingStart != 0) {
				if (params.startTreadAmt == params.railingStart && (params.arcSide == par.railingSide || params.arcSide == "two"))
					isFirstMove = true;
			}

			//верхнее отверстие
			if (par.monoType != 'last' && par.monoType != 'platformRear') {
				var center1 = newPoint_xy(p0, 0, -params.treadThickness - banisterAngleOffset);
				holeCenters.push(center1)

			}
			//нижнее отверстие
			if (par.monoType == 'middle') {
				var center2 = newPoint_xy(center1, 0, -marshPar.h);
				//уголок первой стойки к пригласительной ступени
				if (isFirstMove) center2.anglePos = 'слева';
				holeCenters.push(center2);
			}
			if (par.monoType == 'turnRackStart' || par.monoType == 'turnRackEnd') {
				var rackPar = {
					marshId: par.marshId,
					type: par.monoType,
				}
				holeCenters = setTurnRackHoles(rackPar).holes;
				for (var center in holeCenters) {
					holeCenters[center].y += 90;
				}
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
			if (par.monoType == 'first' || par.monoType == 'platformRear') {
				var flanPar = {
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
				}
				var botFlan = drawPlatformRailingFlan(flanPar).mesh;
				botFlan.position.z = par.poleProfileY / 2;
				botFlan.position.y = p3.y;
				par.mesh.add(botFlan);
			}
			if (par.monoType == 'last') {
				var flanPar = {
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
				}
				var botFlan = drawLastRackFlan(flanPar).mesh;
				botFlan.rotation.y = -Math.PI / 2;
				botFlan.position.z = -sideLenLast / 2 - 5
				if (par.railingSide === "left") {
					botFlan.position.z = sideLenLast / 2 + par.poleProfileY + 5
					botFlan.rotation.y = Math.PI / 2;
				}
				botFlan.position.y = p3.y + par.poleProfileY;
				par.mesh.add(botFlan);
			}
		}

		//стойки лт и ко

		if (params.calcType == 'lt-ko' || params.calcType == 'vhod' || par.isBanister) {
			var p3 = newPoint_xy(p0, par.poleProfileY / 2, 0);
			var p4 = newPoint_xy(p3, -par.poleProfileY, 0);
			points.push(p3, p4);

			var holeDiam = 13;
			var holeDist = 60;

			//отверстия для бокового крепления

			if (params.rackBottom == "боковое" && !par.isBanister) {
				//верхнее отверстие
				var center = { x: 0, y: 90 }
				//нижнее отверстие
				var center2 = newPoint_xy(center, 0, -holeDist)

				if (par.isTurnRack && params.model == 'лт') {
					center.anglePos = turnFactor == 1 ? 'слева' : 'справа';
					center2.anglePos = turnFactor == 1 ? 'слева' : 'справа';
				}
				if (par.isTurnRack && params.model == 'ко') {
					center.anglePos = turnFactor == 1 ? 'справа' : 'слева';
					center2.anglePos = turnFactor == 1 ? 'справа' : 'слева';
				}

				holeCenters.push(center, center2)


				//болты

				if (typeof anglesHasBolts != "undefined" && anglesHasBolts) { //anglesHasBolts - глобальная переменная
					if (!(params.model == "ко" && params.rackBottom == "боковое" && !par.isBotFlan && par.isTurnRack && testingMode)) {
		                /*
	                    var boltPar = {
	                         diam: boltDiam,
	                         len: boltLen,
	                     }
	                     */
						var boltPar = {
							diam: boltDiam,
							len: 20,
							headType: "потай",
						}
						if (params.model == "ко") boltPar.headType = "шестигр.";

						var bolt = drawBolt(boltPar).mesh;
		                /*
                        bolt.rotation.x = -Math.PI / 2;
                        bolt.position.x = 0;
                        bolt.position.y = 90;
                        bolt.position.z = 2 + 4;
                        if (par.railingSide == "left") {
			                bolt.rotation.x = Math.PI / 2;
			                bolt.position.z = 40 - boltLen / 2 + boltBulge;
		                }
			                */

						if (params.model == "лт") {
							bolt.rotation.x = Math.PI / 2;
							bolt.position.x = 0;
							bolt.position.y = 90;
							bolt.position.z = 2

							if (par.railingSide == "left") {
								bolt.rotation.x = -Math.PI / 2;
								bolt.position.z = par.poleProfileY - 2
							}
						}

						if (params.model == "ко") {
							bolt.rotation.x = -Math.PI / 2;
							bolt.position.x = 0;
							bolt.position.y = 90;
							bolt.position.z = 2 + 4 //boltLen / 2 + boltBulge - 4;

							if (par.railingSide == "left") {
								bolt.rotation.x = Math.PI / 2;
								bolt.position.z = par.poleProfileY - 2 - 4 // - boltLen / 2 - boltBulge + 4;
							}
						}

						par.mesh.add(bolt)

						var bolt2 = drawBolt(boltPar).mesh;
						bolt2.rotation.x = bolt.rotation.x;
						bolt2.position.x = 0;
						bolt2.position.y = 90 - holeDist;
						bolt2.position.z = bolt.position.z;
						par.mesh.add(bolt2)
					}
				}

				//кронштейн из пластин для КО
				if (params.model == "ко" && params.rackBottom == "боковое" && !par.isBotFlan) {
					var holderPar = {
						railingSide: par.railingSide,
						dxfBasePoint: par.dxfBasePoint,
						material: params.materials.metal2,
					}
					var holder = drawRackHolder(holderPar).mesh;
					holder.position.y = 20;
					if (par.railingSide == "right" || par.marshId == "topPlt") holder.position.z = 40;
					if (par.isTurnRack) {
						holder.rotation.y += Math.PI / 2 * turnFactor;
						holder.position.x += 20;
						holder.position.z -= 20 * turnFactor;
					}
					par.mesh.add(holder);
				}
			}

			//фланец балясины

			if (params.rackBottom == "сверху с крышкой" || par.isBanister) {
				var flanParams = {
					material: params.materials.metal,
					dxfArr: dxfPrimitivesArr0,
					dxfBasePoint: { x: 1000, y: -1000, },
					size: 76,
					holeDst: 55,
				}
				flanParams = drawPlatformRailingFlan(flanParams)
				var botFlan = flanParams.mesh;
				botFlan.position.z = 20;
				botFlan.position.y = 0;
				par.mesh.add(botFlan);
			}

		}
		//создаем шейп
		var shapePar = {
			points: points,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			drawing: par.drawing || {},
		}

		if (par.monoType == 'turnRackStart' || par.monoType == 'turnRackEnd') {
			shapePar.drawing = { group: 'turnRack', name: 'Поворотный столб марш: ' + par.marshId, yDelta: botLen || 0 };
		}
		if (params.calcType == 'mono' && botLen && !par.isBanister) shapePar.drawing.yDelta -= 90;

		var shape = drawShapeByPoints2(shapePar).shape;


		//добавляем отверстия
		var holesPar = {
			holeArr: holeCenters,
			dxfBasePoint: par.dxfBasePoint,
			shape: shape,
			holeRad: holeDiam / 2,
		}
		addHolesToShape(holesPar);

	}//конец стойки

	//наклонная палка
	if (par.type == "pole") {
		if (par.vertEnds) {
			par.angStart = par.poleAngle;
			par.angEnd = par.poleAngle;
		}
		//рассчитываем абсолютные углы
		var angStart = par.poleAngle + Math.PI / 2 - par.angStart;
		var angEnd = par.poleAngle + Math.PI / 2 - par.angEnd;
		var startCutLen = par.poleProfileY / Math.sin(angStart - par.poleAngle)
		var endCutLen = par.poleProfileY / Math.sin(angEnd - par.poleAngle)

		var p0 = {
			x: 0,
			y: 0
		};
		var p1 = polar(p0, angStart, startCutLen);
		var p2 = polar(p1, par.poleAngle, par.len);
		var p3 = polar(p0, par.poleAngle, par.len);

		var shape = new THREE.Shape();
		addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);

		shape.drawing = par.drawing;
		shapesList.push(shape);
		//сохраняем параметры
		par.startCutLen = startCutLen;
		par.endCutLen = endCutLen;
		par.len2 = par.len
	}

	var extrudeOptions = {
		amount: par.poleProfileZ,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var poleGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	poleGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var pole = new THREE.Mesh(poleGeometry, par.material);


	par.mesh.add(pole);

	//сохраняем данные для спецификации
	if (par.type == "rack") {
		var partName = "forgedRack";
		if (typeof specObj != 'undefined' && partName) {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					sumLength: 0,
					name: "Стойка кованой секции",
				}
			}

			var name = par.len + "х" + par.poleProfileY + "х" + par.poleProfileZ;
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}
	}

	//сохраняем данные для ведомости заготовок
	if (typeof poleList != 'undefined') {
		var poleType = par.poleProfileY + "х" + par.poleProfileZ + " черн.";
		//формируем массив, если такого еще не было
		if (!poleList[poleType]) poleList[poleType] = [];
		var polePar = {
			len1: Math.round(par.len2),
			len2: Math.round(par.len),
			angStart: Math.round(par.angStart * 180 / Math.PI * 10) / 10,
			angEnd: Math.round(par.angEnd * 180 / Math.PI * 10) / 10,
			cutOffsetStart: Math.round(par.poleProfileY * Math.tan(par.angStart)),
			cutOffsetEnd: Math.round(par.poleProfileY * Math.tan(par.angEnd)),
			poleProfileY: par.poleProfileY,
			poleProfileZ: par.poleProfileZ,
		}
		polePar.len3 = polePar.len1 + polePar.cutOffsetEnd; //максимальная длина палки
		polePar.text = par.sectText;
		polePar.description = [];
		polePar.description.push(polePar.text);
		polePar.amt = 1;

		poleList[poleType].push(polePar);

	}
	return par;
};

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
		};

		if (params.stairModel == "П-образная с забегом" && par.turnId == 2) riserPar.width = par.h;
		if (par.botMarshId == 1 && params.stairAmt1 == 0) riserPar.width -= params.treadThickness;

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
		};
		if (hasTurnRack && treadParams[1].riserFix) {//Меняем размер подступенка, riserFix рассчитывается в calcWndTread1Points
			riserPar.cutWndIn = treadParams[1].riserFix / Math.cos(treadParams[1].edgeAngle) + 0.03;
		}

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
	if (par.plusMarshDist) deltaLen = params.marshDist - 77;

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
		var riserPar = {
			len: treadParams[2].treadWidthY / Math.cos(treadParams[2].angleY),
			width: par.h,
			ang: treadParams[3].edgeAngle,
			thk: params.riserThickness,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, 0, -500),
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
		var offsetX = -(riserPar.len - riserPar.thk * Math.tan(riserPar.ang));

		//if (hasTurnRack) offsetX -= 0.01;

		//смещаем базовую точку на острый угол внешней стороны марша
		riser.children[0].geometry.translate(offsetX, 0, 0)
		riser.position.x = tread2.position.x + (treadParams[2].stepWidthY) + 0.01;
		tread2.position.x -= 0.01; //корректинуем позицию чтобы не было пересечений
		riser.position.y = (turnFactor > 0 ? riserPar.width : 0) + par.h - params.treadThickness + 0.1;
		riser.position.z = tread2.position.z + treadParams[2].stepWidthX * turnFactor;
		if (turnFactor < 0) riser.rotation.x = -Math.PI;


		risers.add(riser);
	}

	/*добавляем к параметрам*/

	par.treads = treads;
	par.risers = risers;
	par.params = treadParams;

	//сохряняем данные для спецификации


	return par;

} //end of drawWndTreadsMetal

function setRailingParams(par) {

	//получаем параметры марша по его номеру
	var marshParams = getMarshParams(par.marshId);
	var nextMarshParams = getMarshParams(marshParams.nextMarshId);
	var prevMarshParams = getMarshParams(marshParams.prevMarshId);

	//стыковка ограждений
	par.topConnection = false;
	par.botConnection = false;

	//стыковка сверху
	if (params.stairModel != "Прямая") {
		if (par.marshId != 3) {
			if (marshParams.hasRailing[par.key] && nextMarshParams.hasRailing[par.key])
				par.topConnection = true;
		}
		//стыковка снизу
		if (par.marshId != 1) {
			if (marshParams.hasRailing[par.key] && prevMarshParams.hasRailing[par.key])
				par.botConnection = true;
		}
	}

	//стыковка с задним ограждением верхней площадки
	if (marshParams.lastMarsh && params.platformTop != "нет") {
		if (marshParams.hasTopPltRailing[par.key] && params.topPltRailing_5) par.topConnection = true;
	}

	//стыковка с задним ограждением площадки/забега на П-образной
	if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
		if (par.prevMarshId == "1" && params.backRailing_1 == "нет") {
			par.topConnection = false;
		}
		if (par.prevMarshId == "3" && params.backRailing_1 == "нет") {
			par.botConnection = false;
		}
	}


	//соответствие стороны ограждения in-out и right-left
	par.railingSide = marshParams.side[par.key]

	//тип верхнего и нижнего поворота
	par.topEnd = marshParams.topTurn;
	par.botEnd = marshParams.botTurn;
	if (marshParams.topTurn == "пол") par.topEnd = "нет";
	if (marshParams.botTurn == "пол") par.botEnd = "нет";


	//на внутренней стороне марша тип поворота всегда "нет" кроме верхней площадки
	if (par.key == "in") par.topEnd = par.botEnd = "нет";
	//если сверху верхняя площадка
	//получаем данные о наличии ограждений на верхней площадке
	var topPltRailing = getTopPltRailing(); //функция в файле inputsReading.js
	if (marshParams.lastMarsh) {
		par.topEnd = "нет";
		var isTopPlt = false;
		if (marshParams.hasTopPltRailing[par.key]) {
			par.topEnd = "площадка";
			isTopPlt = true;
		}
	}
	/*
	if (marshParams.lastMarsh && (params.platformTop == "площадка" || params.platformTop == "увеличенная")) {
		par.topEnd = "нет";
		if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
			if (topPltRailing[par.key] && !(params.platformTop == 'увеличенная' && par.key == 'in')) {//FIX
				par.topEnd = "площадка";
				isTopPlt = true;
			}
		}
		if (params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') {
			//if (topPltRailing[par.key] && !(params.platformTop == 'увеличенная' && par.key == 'out')) {//FIX
			if (topPltRailing[par.key]) {//FIX
				par.topEnd = "площадка";
				isTopPlt = true;
			}
		}
	}
	*/
	if (par.key == 'in' && hasCustomMidPlt(par) && params.middlePltWidth >= params.M + 200 && par.marshId == 3) par.botEnd = "площадка";
	if (par.key == "in" && hasCustomMidPlt(par) && params.middlePltLength >= params.M + 200 && par.marshId == 1) par.topEnd = "площадка";

	if (params.stairModel == "Прямая с промежуточной площадкой") {
		par.botEnd = "площадка";
		par.topEnd = "нет";
		//костыль - берем параметры 3-го марша, т.к. массивы стоек 1 и 3 марша объединяются, но ограждение отрисовывается с marshId = 1
		if (getMarshParams(3).hasTopPltRailing[par.key]) {
			par.topEnd = "площадка";
		};

	}

	if (params.stairModel == "Прямая горка") {
		if (par.marshId == 1) {
			par.botEnd = "нет";
			par.topEnd = "площадка";
		}
	}
	//секцию ограждений на марше с кол-вом ступеней 0
	if (par.marshId != 2 && (par.stairAmt == 0 || (par.marshId == 1 && params.railingStart >= par.stairAmt))) {
		if (par.topEnd == "площадка" && par.botEnd == "площадка" && par.key == "out")
			par.botEnd = "площадка";
		else
			par.botEnd = "нет";

		if (par.marshId == 3 && params.platformTop == "площадка" && par.key == "out")
			par.topEnd = "площадка";
		else
			par.topEnd = "нет";
	}

	//секцию ограждений на марше с кол-вом ступеней 1
	if (par.marshId != 2 && par.stairAmt == 1) {
		if (par.botEnd == "забег") par.botEnd = "нет";
		if (par.topEnd == "забег") par.topEnd = "нет";
	}

	//если в марше 0 или 1 ступень, то нижнее ограждение забега является ограждением марша
	if (marshParams.stairAmt < 2 && par.botEnd == "забег" && params.railingModel != "Самонесущее стекло") {
		par.botEnd = "нет";
	}

	//секции ограждений верхней площадки

	if (par.marshId == "topPlt") {
		par.topEnd = "нет";
		par.botEnd = "нет";
		par.isPlatform = true;
	}

	//длина верхнего участка

	par.platformLengthTop = 0;
	if (par.topEnd != "нет") par.platformLengthTop = params.M;
	//для верхней площадки лестницы длина берется из параметров
	if (isTopPlt) par.platformLengthTop = params.platformLength_3;
	//для промежуточной площадки П-образной лестницы длина берется из параметров
	if (par.topEnd == "площадка" && !isTopPlt && params.stairModel == "П-образная с площадкой")
		par.platformLengthTop = params.platformLength_1 - 45;

	//длина нижнего участка

	par.platformLengthBottom = 0;
	if (par.botEnd != "нет") par.platformLengthBottom = params.M;
	//П-образная с площадкой
	if (par.botEnd == "площадка" && !isTopPlt && params.stairModel == "П-образная с площадкой")
		par.platformLengthBottom = params.platformLength_1 + 40;

}; //end of setRailingParams