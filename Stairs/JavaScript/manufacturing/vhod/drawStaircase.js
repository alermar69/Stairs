//глобальные переменные для тестирования
var testingMode = false;
var boltDiam = 10;
var boltBulge = 8;
var boltLen = 30;
var turnFactor = 1;

drawStaircase = function(viewportId, isVisible) {

	//удаляем старую лестницу

	for (var layer in layers) {
		removeObjects(viewportId, layer);
	}

	//очищаем глобальный массив параметров для спецификации
	staircasePartsParams = {
		handrails: [],
		rigels: [],
		columns: [],
		braces: [],
		angles: {},
		sideHandrailHolderAmt: 0,
		rackAmt: 0,
		glassAmt: 0,
		divideAmt: 0,
		frame1Flans: [],
		frame2Flans: [],
		frame3Flans: [],
		frame6Flans: [],
	};

	var model = {
		objects: [],
		add: function(obj, layer) {
			var objInfo = {
				obj: obj,
				layer: layer,
			}
			this.objects.push(objInfo);
		},
	};

	//обнуляем счетчики спецификации
	partsAmt = {};
	partsAmt_bal = {unit: "banister"}
	specObj = partsAmt; //задаем объект, куда будут сохраняться данные для спецификации
	poleList = {};
	railingParams = {};


	/*удаляем контуры*/
	dxfPrimitivesArr = [];
	var dxfBasePointStep = 200.0;

	if (params.model == "нет") {
		params.model = "лт";
		alert("ВНИМАНИЕ! Делаются только ограждения! Каркас и ступени отрисовываются просто для наглядности.")
	}

	/*направление поворота (глобальные переменные)*/

	if (params.turnSide == "правое") turnFactor = 1;
	if (params.turnSide == "левое") turnFactor = -1;


	/*** СТУПЕНИ НА ВСЕ ЛЕСТНИЦЫ ***/
	var treadsObj = drawTreads();

	// addObjects(viewportId, [treadsObj.treads], 'treads2');
	model.add(treadsObj.treads, "treads");
	model.add(treadsObj.risers, "risers");

	/*** ПЛИНТУС НА ВСЕ ЛЕСТНИЦЫ ***/
	//FIX
	// var skirtingPar = {
	// 	treadsObj: treadsObj,
	// 	dxfBasePoint: {
	// 		x: 0,
	// 		y: -1500
	// 	},
	// }
	// var skirting = drawSkirting_all(skirtingPar).mesh;
	// model.add(skirting, "treads");


	/*** РАМКИ ЗАБЕЖНЫХ СТУПЕНЕЙ ***/

	if (hasTreadFrames() && (treadsObj.wndPar || treadsObj.wndPar2)) {
		var framesObj = new THREE.Object3D();
		//первый поворот
		var turnId = "turn1";

		var wndFramesPar = {
			wndPar: treadsObj.wndPar,
			dxfBasePoint: {
				x: 0,
				y: -3000
			},
			turnId: turnId,
		}

		var marshPar1 = getMarshParams(1);
		var turnType1 = marshPar1.topTurn;

		if (turnType1 == "забег") {
			wndFramesPar = drawWndFrames2(wndFramesPar);
			var wndFrames = wndFramesPar.mesh;
			wndFrames.rotation.y = treadsObj.unitsPos[turnId].rot;
			wndFrames.position.x = treadsObj.unitsPos[turnId].x;
			wndFrames.position.y = treadsObj.unitsPos[turnId].y;
			wndFrames.position.z = treadsObj.unitsPos[turnId].z;
			framesObj.add(wndFrames)
		}

		//второй поворот

		var turnId = "turn2";
		var marshPar3 = getMarshParams(3);
		var turnType3 = marshPar3.botTurn;
		if (turnType3 == "забег" && treadsObj.unitsPos[turnId]) {
			var wndFramesPar = {
				wndPar: treadsObj.wndPar2,
				dxfBasePoint: {
					x: 0,
					y: -3000
				},
				turnId: turnId,
			}
			wndFramesPar = drawWndFrames2(wndFramesPar);
			var wndFrames = wndFramesPar.mesh;
			wndFrames.rotation.y = treadsObj.unitsPos[turnId].rot;
			wndFrames.position.x = treadsObj.unitsPos[turnId].x;
			wndFrames.position.y = treadsObj.unitsPos[turnId].y;
			wndFrames.position.z = treadsObj.unitsPos[turnId].z;
			if (params.stairModel == "П-образная с забегом") wndFrames.position.y += params.h3;
			framesObj.add(wndFrames)
		}

		model.add(framesObj, "angles");
	}

	/*** КАРКАС НА ВСЕ ЛЕСТНИЦЫ ***/

	var carcasPar = {
		dxfBasePoint: {
			x: 0,
			y: 2000
		},
		treadsObj: treadsObj,
	}

	//if(treadsObj.wndPar) carcasPar.turnStepsParams = treadsObj.wndPar;
	//if(treadsObj.wndPar2) carcasPar.turnStepsParams = treadsObj.wndPar2;
	if (wndFramesPar) carcasPar.wndFramesHoles = wndFramesPar.wndFramesHoles;

	if (params.staircaseType == "На заказ") var carcasObj = drawCarcas(carcasPar);
	if (params.staircaseType == "Готовая") var carcasObj = drawCarcasStock(carcasPar);

	model.add(carcasObj.mesh, "carcas");
	model.add(carcasObj.angles, "angles");

	/***  ОГРАЖДЕНИЯ НА ВСЕ ЛЕСТНИЦЫ  ***/

	var railingPar = {
		dxfBasePoint: {
			x: 0,
			y: 20000
		},
		treadsObj: treadsObj,
		stringerParams: carcasPar.stringerParams,
	};

	var railingObj = drawRailing(railingPar);
	model.add(railingObj.mesh, "railing");
	model.add(railingObj.forgedParts, "forge");
	model.add(railingObj.handrails, "handrails");


	/*** ПРИСТЕННЫЙ ПОРУЧЕНЬ НА ВСЕ ЛЕСТНИЦЫ ***/

	 var sideHandrailPar = {
	 	treadsObj: treadsObj,
	 	dxfBasePoint: {
	 		x: 25000,
	 		y: 2000
	 	},
	 }
	
	 var handrail = drawSideHandrail_all(sideHandrailPar);
	 model.add(handrail.mesh, "railing");


	//сдвигаем и поворачиваем лестницу чтобы верхний марш был вдоль оси Х
	var moove = calcStaircaseMoove(treadsObj.lastMarshEnd);

	//сохраняем позицию лестницы для позиционирования шкафа
	params.starcasePos = moove;
	params.starcasePos.rot = moove.rot + params.stairCaseRotation / 180 * Math.PI;
	for (var i = 0; i < model.objects.length; i++) {
		var obj = model.objects[i].obj;
		//позиционируем
		obj.position.x += moove.x + params.staircasePosX;
		obj.position.y += params.staircasePosY;
		obj.position.z += moove.z + params.staircasePosZ + params.M / 2 * turnFactor;
		obj.rotation.y = moove.rot;
		//добавляем белые ребра
		if($sceneStruct.vl_1.wireframes){
			addWareframe(obj, obj);
			}
			
		//добавляем в сцену
		addObjects(viewportId, [obj], model.objects[i].layer);
	}

	//измерение размеров на модели
	addMeasurement(viewportId);

} //end of drawStair

//-------------------------------------------------

function drawHolderFlan(par) {
	if (!par) par = {};
	var rackModel = params.banisterMaterial;
	if (specObj.unit == "banister") rackModel = params.banisterMaterial_bal;

	//рассчитываем параметры поручня
	var handrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
	}
	if (params.calcType == "vint") handrailPar.handrailType = params.handrailMaterial;

	if (specObj.unit == "banister") {
		var handrailPar = {
			prof: params.handrailProf_bal,
			sideSlots: params.handrailSlots_bal,
			handrailType: params.handrail_bal,
		}
	}
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js

	par.material = params.materials.inox;

	par.holderFlanId = "handrailHolderFlanPlane";
	if (params.railingModel == "Кованые балясины" ||
		params.railingModel == "Трап" ||
		rackModel == "40х40 черн.") {
		par.holderFlanId = "holderFlan";
		if (params.handrail == "40х20 черн." || params.handrail == "ПВХ") par.holderFlanId = "handrailHolderFlanPlane";
		par.material = params.materials.metal_railing;
	}
	if (handrailPar.handrailModel == "round") par.holderFlanId = "handrailHolderFlanArc";

	var len = 60;
	var wid = 20;
	var holeRad = 3;
	var holeDist = 45;
	var rad = wid / 2;
	var dxfArr = [];
	var dxfBasePoint = { x: 0, y: 0, }
	var flanThk = 2;

	var shape = new THREE.Shape();

	var p0 = { x: 0, y: 0 };
	var p1 = newPoint_xy(p0, -len / 2 + rad, -rad);
	var p2 = newPoint_xy(p0, -len / 2 + rad, rad);
	var p3 = newPoint_xy(p0, len / 2 - rad, rad);
	var p4 = newPoint_xy(p0, len / 2 - rad, -rad);
	var center1 = newPoint_xy(p0, -len / 2 + rad, 0);
	var center2 = newPoint_xy(p0, len / 2 - rad, 0);
	var holeCenter1 = newPoint_xy(p0, -holeDist / 2, 0);
	var holeCenter2 = newPoint_xy(p0, holeDist / 2, 0);

	addArc2(shape, dxfArr, center1, rad, 1.5 * Math.PI, 0.5 * Math.PI, true, dxfBasePoint);
	addLine(shape, dxfArr, p2, p3, dxfBasePoint);
	addArc2(shape, dxfArr, center2, rad, 0.5 * Math.PI, -0.5 * Math.PI, true, dxfBasePoint);
	addLine(shape, dxfArr, p4, p1, dxfBasePoint);

	addRoundHole(shape, dxfArr, holeCenter1, holeRad, dxfBasePoint);
	addRoundHole(shape, dxfArr, holeCenter2, holeRad, dxfBasePoint);

	var extrudeOptions = {
		amount: flanThk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Object3D();
	var mesh = new THREE.Mesh(geometry, par.material);
	par.mesh.add(mesh);

	var screwId = "timberHandrailScrew";
	if (handrailPar.mat == 'metal') screwId = 'metalHandrailScrew';
	if (handrailPar.mat == 'inox') screwId = 'metalHandrailScrew';

	var screwPar = {
		id: screwId,
		description: "Крепление поручней",
		group: "Ограждения"
	}

	var screw = drawScrew(screwPar).mesh;
	screw.position.x = holeCenter1.x;
	screw.position.z = holeCenter1.y;
	screw.rotation.x = Math.PI / 2;
	par.mesh.add(screw)

	var screw2 = drawScrew(screwPar).mesh;
	screw2.position.x = holeCenter2.x;
	screw2.position.z = holeCenter2.y;
	screw2.rotation.x = Math.PI / 2;
	par.mesh.add(screw2);

	var vintId = "vint_M6x10";
	if (params.railingModel == "Кованые балясины") vintId = "vint_M6x70";
	var vintPar = {
		id: vintId,
		description: "Крепление лодочки к штырю",
		group: "Ограждения"
	}

	var midpoint = { x: Math.floor((holeCenter1.x + holeCenter2.x) / 2), y: Math.floor((holeCenter1.y + holeCenter2.y) / 2) };
	var vint = drawVint(vintPar).mesh;
	vint.position.x = midpoint.x;
	// vint.position.z = midpoint.y;
	vint.position.z = -vintPar.len / 2 + 2;
	vint.rotation.x = Math.PI / 2;
	par.mesh.add(vint);

	// item = {
	// 	id:  par.holderFlanId,
	// 	amt: totalHolderAmt,
	// 	discription: "Крепление поручня к стойкам",
	// 	unit: "banisterItemsAdd",
	// 	itemGroup: par.group,
	// 	};
	// if(item.amt > 0) par.items.push(item);

	//сохраняем данные для спецификации
	var partName = par.holderFlanId + "_model";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "",
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Ограждения",
				purposes: ["Крепление поручня к стойкам"]
			}
			if (partName == "holderFlan_model") specObj[partName].name = "Лодочка плоская черн.";
			if (partName == "handrailHolderFlanPlane_model") specObj[partName].name = "Лодочка под плоский поручень нерж.";
			if (partName == "handrailHolderFlanArc_model") specObj[partName].name = "Лодочка под круглый поручень";
		}
		var name = 0;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	par.mesh.specId = partName;
	par.mesh.setLayer("metis");

	return par;
}

function drawCarcasPart(par, len) {

	par.pointsShape = [];
	par.pointsHole = [];
	par.railingHoles = [];
	par.carcasHoles = [];
	par.elmIns = {};

	par.key = "front";

	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};

	var framePar = { marshId: par.marshId, isPltFrame: true}
	calcFrameParams(framePar);

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
	shiftHoleY -= framePar.profHeight + 5;
	//if (params.stairType == "рифленая сталь" || params.stairType == "рифленый алюминий" || params.stairType == "лотки")
	//	shiftHoleY -= 65;
	//if (params.stairType == "дпк" || params.stairType == "пресснастил") shiftHoleY -= 65;
	if (params.stairModel == "Прямая горка") shiftHoleY -= 5;


	var plateWidth = par.stringerWidthPlatform;

	var p0 = { "x": -params.M / 2, "y": 0.0 };
	if (params.model == "лт") p0.y += 5;
	if (params.model == "ко") {
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
	//if (par.stringerType == "front" && turnFactor == 1) center1.y += shiftHoleY
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
	if (par.lAng) {
		center1 = newPoint_xy(p0, shiftHoleX - params.stringerThickness, shiftHoleY);
		//if (par.stringerType == "front") center1.y += shiftHoleY
		//if (par.stringerType == "side") center1.y += shiftHoleY
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
	//if (par.stringerType == "front" && turnFactor == -1) center1.y += shiftHoleY
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	center1.hasAngle = center2.hasAngle = false;
	if (par.rAng) {
		center1 = newPoint_xy(p3, -shiftHoleX + params.stringerThickness, shiftHoleY);
		//if (par.stringerType == "front") center1.y += shiftHoleY
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
	if (par.stringerType == "side") {
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
	}
	//отверстия под колонну на боковой тетиве увеличенной верхней площадки

	if (params.columnModel !== "нет" && par.stringerType == "side" && params.isColumnTop4) {
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
		if (params.topPltRailing_4 && par.stringerType == 'side') par.hasRailing = true;
		if (params.topPltRailing_6 && par.stringerType == 'front') par.hasRailing = true;

		if (par.hasRailing) {
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
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
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
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}
	par.mesh.specId = partName + name;


	return par;
} //end of drawCarcasPart

function drawTopStepLt_pltG(par) {
	console.log(par.marshId, par.pointsShape[par.pointsShape.length - 1])
	if (par.isMiddleStringer) {
		par.stringerWidthPlatform -= params.treadThickness + par.stringerLedge;
		par.stringerWidth -= params.treadThickness + par.stringerLedge;
		par.carcasAnglePosY += params.treadThickness + par.stringerLedge;
		par.stepHoleY += params.treadThickness + par.stringerLedge;
	}

	var p0 = par.pointsShape[par.pointsShape.length - 1];
	//вспомогательыне точки на нижней линии
	var p1 = newPoint_xy(p0, par.b, 0);
	var p20 = newPoint_xy(p1, (par.stringerWidth / Math.sin(par.marshAng)), 0.0) // первая точка на нижней линии марша
	if (params.stringerType == "прямая") p20.x -= par.b;
	var p21 = polar(p20, par.marshAng, 100.0); // вторая точка на нижней линии
	if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0 && par.botEnd == "winder" && par.key == "in") {
		//var p20 = newPoint_xy(p0, (par.stringerWidth / Math.sin(par.marshAng)), 0.0)
		var p20 = newPoint_xy(p0, par.stringerWidth, 0.0)
		var p21 = par.pointsShape[0];
	}



	/*ТОЧКИ КОНТУРА*/

	//проступь последней ступени марша
	var p1 = newPoint_xy(p0, par.b, 0);
	if (par.stairAmt === 0) p1 = copyPoint(p0);

	// подъем ступени
	var p2 = newPoint_xy(p1, 0.0, par.h);
	if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0 && par.marshId == 2 && params.turnType_1 == "площадка") {
		if (par.key == "in") {
			var pt = newPoint_xy(par.pointsShape[par.pointsShape.length - 2], 0, par.h + params.treadThickness);
			p2 = itercection(pt, polar(pt, 0, 100), p1, polar(p1, Math.PI / 2, 100));
			p2.y += par.stringerLedge;
		}
	}
	//if (par.stairAmt === 0) p2 = copyPoint(p1);;

	// проступь площадки
	var topLineP1 = newPoint_xy(p2, par.topEndLength, 0.0); //верхний правый угол
	if (par.isMiddleStringer) {
		topLineP1.x -= par.treadFrontOverhang;
	}
	if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 1)
		topLineP1.x -= 6;
	topLineP1.filletRad = 0; //верхний угол тетивы не скругляется

	if ((params.stringerType != "прямая" || par.isMiddleStringer) && par.stairAmt !== 0) {
		par.pointsShape.push(p1);
	}
	else {
		//if (par.stairAmt == 0 && !(params.stairModel == "П-образная трехмаршевая" && par.botEnd == "winder" && par.key == "out"))
		if (par.stairAmt == 0 && !(params.stairModel == "П-образная трехмаршевая" && par.key == "out"))
			par.pointsShape.pop();
	}

	//трехмаршевая 0 ступеней в среднем марше и нижний поворот площадка - тетива уходит под площадку
	if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0 && params.turnType_1 == "площадка" && par.key == "in") {
		var p2_m = newPoint_xy(p2, 0, -par.stringerLedge - params.treadThickness);
		var topLineP1_m = newPoint_xy(topLineP1, 0, -par.stringerLedge - params.treadThickness);
		topLineP1_m.filletRad = 0
		par.pointsShape.push(p2_m);
		par.pointsShape.push(topLineP1_m);
		if (par.marshId == 2) {
			p2 = newPoint_xy(p2_m, 0, 0);
			topLineP1 = newPoint_xy(topLineP1_m, 0, 0);
		}
	}
	else {
		if (par.isMiddleStringer) {
			//p1.x += par.a - par.b - 5;
			p1.x += par.a - par.b + 5 + 5;
			p2.filletRad = 0;

			var middleP1 = newPoint_xy(p1, 0, params.treadThickness + 5);
			par.pointsShape.push(middleP1);
			middleP1.filletRad = 0;

			var middleP2 = newPoint_xy(p2, 0, -60 - 5);
			middleP2.filletRad = 0;
			par.pointsShape.push(middleP2);
		}
		par.pointsShape.push(p2);
		par.pointsShape.push(topLineP1);
	}


	// нижняя линия
	var botLinePoints = [];

	if (params.stringerType == "ломаная") {
		var botLineP2 = newPoint_xy(p2, par.stringerWidth, -par.stringerWidthPlatform);
		var botLineP1 = itercection(botLineP2, polar(botLineP2, 0, 100), topLineP1, polar(topLineP1, Math.PI / 2, 100));
		botLineP1.filletRad = 0; //нижний угол тетивы не скругляется
		var botLineP3 = newPoint_xy(p1, par.stringerWidth, -par.stringerWidth);
		botLinePoints.push(botLineP1);
		botLinePoints.push(botLineP2);
		botLinePoints.push(botLineP3);
	}

	if (params.stringerType != "ломаная") {
		var botLineP1 = newPoint_xy(topLineP1, 0.0, -par.stringerWidthPlatform);
		botLineP1.filletRad = 0; //верхний угол тетивы не скругляется
		var botLineP2 = itercection(p20, p21, botLineP1, polar(botLineP1, 0, 100));
		if (par.botEnd == "winderTop0" && par.key == "in")
			var botLineP2 = itercection(par.botUnitStart, polar(par.botUnitStart, Math.PI / 2 - Math.PI / 18, 100), botLineP1, polar(botLineP1, 0, 100));

		botLinePoints.push(botLineP1);
		botLinePoints.push(botLineP2);
	}

	par.pointsShape.push(...botLinePoints);

	//сохраняем точку для расчета длины
	par.keyPoints[par.key].topPoint = copyPoint(topLineP1);
	par.keyPoints.topPoint = copyPoint(topLineP1);

	/*ОТВЕРСТИЯ*/

	//совпадают ли отверстия уголка крепления верхнего марша и перемычки
	var isHolesOverlap = true; //отверстия крепления уголка верхнего марша и перемычки совпадают
	if (par.stairAmt == 0) isHolesOverlap = false;

	//позиция отверстий под уголок крепления верхнего марша
	var turnParams = calcTurnParams(par.marshId);
	var topMarshAnlePosX = turnParams.topMarshOffsetX + params.stringerThickness + 30 + par.stringerLedge;

	if (!hasTreadFrames()) {

		// отверстия под перемычку 1
		center1 = newPoint_xy(p2, topMarshAnlePosX, par.carcasAnglePosY);
		center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
		center1.hasAngle = center2.hasAngle = false; //уголки перемычки отрисовываются внутри drawBridge_2

		//на внутренней стороне в перемычке не должно быть болтов на уголке, чтобы не было пересечения с длинными болтами
		var bridgeBasePoint = newPoint_xy(center1, -38.0, 20.0);
		if (isHolesOverlap) bridgeBasePoint.noBoltsOnBridge = true;
		if (par.stringerLast && params.platformTop == 'увеличенная') bridgeBasePoint.noBoltsOnBridge = false;
		par.elmIns[par.key].bridges.push(bridgeBasePoint);

		if (par.key == "in" && !par.stringerLast && isHolesOverlap) center1.noZenk = center2.noZenk = true;
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);

		if (par.key == "in" && !isHolesOverlap) {
			// отверстия под уголок крепления верхнего марша
			center1 = newPoint_xy(p2, params.marshDist + 38, par.carcasAnglePosY);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false;
			par.elmIns[par.key].bridges.push(newPoint_xy(center1, -38.0, 20.0));
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}

		// отверстия под 1 уголок площадки
		if (par.topEndLength < 790) {
			var holeDist = 50;
			var angleType = "У2-40х40х90";
			var angleHolePosX = 20;
		}
		else {
			var angleType = "У2-40х40х200";
			var angleHolePosX = par.angleHolePosX;
			var holeDist = par.holeDistU2_200;
		}

		if (par.topEndLength > 500) {
			var stepHoleXside1 = (par.topEndLength / 2 - 110 - 64) / 2 + 140 - holeDist / 2;
			center1 = newPoint_xy(p2, stepHoleXside1, par.stepHoleY);
			center2 = newPoint_xy(center1, holeDist, 0.0);
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
		}

		// отверстия под перемычку 2
		if (par.topEndLength > 600) {
			center1 = newPoint_xy(p2, ((par.topEndLength * 0.5) + 29), par.carcasAnglePosY);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false; //уголки перемычки отрисовываются внутри drawBridge_2
			par.elmIns[par.key].bridges.push(newPoint_xy(center1, -38.0 - 29 - 39, 20.0));
			var pCentralHoles = copyPoint(center1);
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}

		// отверстия под 2 уголок площадки
		var stepHoleXside2 = (par.topEndLength / 2 - 64) / 2 + par.topEndLength / 2 - holeDist / 2;
		if (stepHoleXside2 > 0.0) {
			center1 = newPoint_xy(p2, stepHoleXside2, par.stepHoleY);
			center2 = newPoint_xy(center1, holeDist, 0.0);
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
		}
	}

	if (hasTreadFrames()) {
		var frameAmt = calcPltFrameParams(par.topEndLength, par.platformFramesParams.overhang).frameAmt;
		var frameWidth = calcPltFrameParams(par.topEndLength, par.platformFramesParams.overhang).frameWidth;

		var pCentralHoles = newPoint_xy(p2, par.platformLength * 0.5, par.stepHoleY);
		// отверстия под рамки под площадкой
		var begX = par.platformFramesParams.overhang + 5 + par.platformFramesParams.sideHolePosX;
		var i;
		var deltaX = 0;
		if (par.isMiddleStringer) {
			deltaX -= par.treadFrontOverhang;
		}
		for (i = 0; i < frameAmt; i++) {
			center1 = newPoint_xy(p2, begX + deltaX, par.stepHoleY);
			if (params.stairType == "пресснастил") center1.y += 5; //костыль
			center2 = newPoint_xy(center1, frameWidth - par.platformFramesParams.sideHolePosX * 2, 0.0);
			center1.isPltFrame = center2.isPltFrame = true;
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			begX += frameWidth + 5.0;

			//длинные болты на среднем косоуре
			if (par.isMiddleStringer) {
				center1.isPltPFrame = center2.isPltPFrame = true;
				center1.noZenk = center2.noZenk = true;
			}
			if (params.calcType == 'vhod' && params.platformTop == 'увеличенная' && par.stringerLast) {
				//center1.isPltPFrame = center2.isPltPFrame = true;
				center1.noBoltsIn = center2.noBoltsIn = true;
				//if (turnFactor == 1) center1.noBoltsOut = center2.noBoltsOut = true;
			}
		}
	}

	if (params.stairModel == 'Прямая горка' && params.stairType == 'рифленая сталь') {
		par.carcasAnglePosY -= 15;
	}
	if (par.key == "in" && !par.stringerLast && hasTreadFrames() && params.stairModel !== "Прямая с промежуточной площадкой") {
		center1 = newPoint_xy(p2, topMarshAnlePosX, par.carcasAnglePosY);
		if (!isHolesOverlap)
			center1 = newPoint_xy(p2,
				-par.turnParams.topMarshOffsetZ + params.stringerThickness + 30,
				par.carcasAnglePosY);
		//if (!isHolesOverlap) center1 = newPoint_xy(p2, params.marshDist + 38, 85.0 - par.stringerWidthPlatform, par.carcasAnglePosY);
		center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
		center1.hasAngle = center2.hasAngle = false;
		if (hasTreadFrames()) center1.backZenk = center2.backZenk = true;
		if (!hasTreadFrames()) center1.noZenk = center2.noZenk = true;
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);

		if (params.M > 1100 && params.calcType == "vhod") {
			center1 = newPoint_xy(p2,
				-turnParams.topMarshOffsetZ + (params.M + params.stringerThickness) / 2 + 30,
				par.carcasAnglePosY);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false;
			if (hasTreadFrames()) center1.backZenk = center2.backZenk = true;
			if (!hasTreadFrames()) center1.noZenk = center2.noZenk = true;
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}
	}

	//if (params.M > 1100 && par.key == 'in') {
	//	center1 = newPoint_xy(p2, calcTreadLen() / 2 + 80, par.carcasAnglePosY);
	//	center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
	//	center1.hasAngle = center2.hasAngle = false;
	//	if (hasTreadFrames()) center1.backZenk = center2.backZenk = true;
	//	if (!hasTreadFrames()) center1.noZenk = center2.noZenk = true;
	//	par.pointsHole.push(center2);
	//	par.pointsHole.push(center1);
	//}

	//определяем что будет использоваться: уголок или фланец
	var isAngel = true;
	if ((params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 1) || params.stairModel == "Прямая горка")
		isAngel = false;

	// отверстия под задний крепежный уголок
	if (isAngel) {
		var shiftHoleY = par.carcasAnglePosY;
		if (par.marshPar.lastMarsh) shiftHoleY = -params.treadThickness - 5 - 20 - par.platformFramesParams.profHeight - 5;
		center1 = newPoint_xy(topLineP1, -30.0, shiftHoleY);
		center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
		center1.hasAngle = center2.hasAngle = true;
		if (params.topFlan == "есть" && par.stringerLast) {
			center1.pos = center2.pos = "topFloor";
			center1.x -= 5; // 5 - из-за того что ширина уголка становиться 70, тогда (70-60)/2 = 5
			center2.x -= 5;
			if (!(params.stairType == "рифленая сталь" || params.stairType == "лотки")) {
				center1.y -= 60; //60 - высота рамки
				center2.y -= 60; //60 - высота рамки
			}

		}
		if (params.platformRearStringer == "нет" && par.stringerLast) {
			center1.noBoltsInSide1 = center2.noBoltsInSide1 = true;
		}
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
		if (par.key == "in" &&
			!par.stringerLast &&
			!(params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0 && par.marshId == 1)) {
			center1.noZenk = center2.noZenk = true;
			center1.noBoltsInSide2 = center2.noBoltsInSide2 = true;
		}
	}

	// отверстия под соединительный фланец
	if (!isAngel) {
		center1 = newPoint_xy(topLineP1, -30.0, -par.stringerWidthPlatform + 85.0);
		center2 = newPoint_xy(center1, 0, -60.0);
		if (par.isMiddleStringer) {
			par.elmIns[par.key].longBolts.push(center1);
			par.elmIns[par.key].longBolts.push(center2);
		}
		//center3 = newPoint_xy(center1, -50.0, 0);
		//center4 = newPoint_xy(center3, 0, -60.0);
		center3 = newPoint_xy(topLineP1, 30.0, -par.stringerWidthPlatform + 85.0);
		center4 = newPoint_xy(center3, 0, -60.0);
		center1.hasAngle = center2.hasAngle = center3.hasAngle = center4.hasAngle = false;
		center3.noDraw = center4.noDraw = true;
		center1.isTopFlanHole = center2.isTopFlanHole = center3.isTopFlanHole = center4.isTopFlanHole = true;
		center1.pos = "topLeft";
		center2.pos = "botLeft";
		center3.pos = "topRight";
		center4.pos = "botRight";
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);
		par.pointsHole.push(center3);
		par.pointsHole.push(center4);
		par.flanSidePointInsert = newPoint_xy(center1, -20.0, 20.0);

		//длинные болты на среднем косоуре
		if (par.isMiddleStringer && params.stairModel == "Прямая горка") {
			par.elmIns[par.key].longBolts.push(center1);
			par.elmIns[par.key].longBolts.push(center2);
			par.elmIns[par.key].longBolts.push(center3);
			par.elmIns[par.key].longBolts.push(center4);
		}
	}

	//Отверстия под ограждения

	/*
	par.hasRailing - есть ограждения на марше
	par.hasPltRailing - есть ограждения на площадке
	hasFirstPltRack == true - первая стойка ограждения площадки ставится на площадке, а не на последней ступени марша
	*/


	if (par.hasRailing || par.hasPltRailing) {
		var hasFirstPltRack = false; //есть ли первая стойка на площадке
		if (par.stringerLast) hasFirstPltRack = true;
		if (par.key == "out") hasFirstPltRack = true;
		if (params.stairModel == "Прямая с промежуточной площадкой") hasFirstPltRack = true;
		if (params.stairModel == 'Прямая горка') hasFirstPltRack = true;
		if (params.stairModel == 'Прямая горка' && params.railingModel == 'Ригели') hasFirstPltRack = false
		if (hasCustomMidPlt(par)) hasFirstPltRack = true;
		if (hasCustomMidPlt(par) && par.key == 'in' && (params.stairModel !== 'Прямая' || params.stairModel !== 'Прямая с промежуточной площадкой')
			&& params.middlePltLength < params.M + 200) hasFirstPltRack = false;
		if (par.hasPltRailing) hasFirstPltRack = true;
		if (params.stairModel == 'Прямая горка') hasFirstPltRack = true;

		if (params.railingModel != "Самонесущее стекло" && params.railingModel != "Трап") {

			if (hasFirstPltRack) {
				// отверстия под стойку ближе к маршу
				center1 = newPoint_xy(p2, par.b / 2, par.rackTopHoleY);
				if (!par.hasPltRailing) {
					center1 = newPoint_xy(p2, par.b * 0.5, par.rackTopHoleY);
				}
				par.railingHoles.push(center1);


				if ((par.hasPltRailing || par.hasPltRailing) && params.stairModel !== 'Прямая горка') {
					// отверстия под средние стойки
					var platformLength = par.platformLength;
					if (par.key == 'in' && hasCustomMidPlt(par)) {
						platformLength = params.middlePltLength - params.M;
					}
					if (par.key == 'out' && hasCustomMidPlt(par)) {
						platformLength = params.middlePltLength;
					}
					if (par.marshParams.lastMarsh) {
						platformLength = par.platformLength1;
					}
					//if (params.calcType == 'vhod' && par.marshParams.lastMarsh) {
					//	platformLength = par.platformLength1;
					//}


					if (platformLength > 1300 && params.railingModel !== "Кованые балясины") {
						var middleRackAmt = Math.round(platformLength / 800) - 1;
						if (middleRackAmt < 0) middleRackAmt = 0;
						var rackDist = (platformLength - 200) / (middleRackAmt + 1);
						if (middleRackAmt > 20) middleRackAmt = 2
						for (var i = 1; i <= middleRackAmt; i++) {
							var center11 = newPoint_xy(center1, rackDist * i, 0);
							par.railingHoles.push(center11);
						}
					}
					// отверстия под стойку ближе к углу
					var lastRackX = -80 + 8;
					if (par.key == 'in' && hasCustomMidPlt(par)) {
						lastRackX = -params.M + lastRackX;// - params.stringerThickness - 3 - 5;
					}
					if (par.key == 'out' && hasCustomMidPlt(par)) {
						lastRackX = -80 + 8;
					}
					if (params.rackBottom == "сверху с крышкой") lastRackX -= 80;
					center1 = newPoint_xy(topLineP1, lastRackX, par.rackTopHoleY);
					if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 1)
						center1.x -= 100;
					par.railingHoles.push(center1);

				}
			}
			//стойка ограждения ставится на последней ступени марша. На площадке на этой стороне нет ограждения
			if (!hasFirstPltRack) {
				center1 = newPoint_xy(p0, par.b * 0.5, par.rackTopHoleY);
				//смещаем стойку ближе к верхнему маршу
				var mooveY = params.treadThickness;
				if (params.stairType !== "лотки" || params.stairType !== "рифленая сталь") mooveY = 40;
				center1 = newPoint_y(center1, mooveY, par.marshAng)

				//если на следующем марше повортная стойка, стойку не рисуем и сохраняем сдвиг отверстия до края следующего марша
				if (par.key == "in" && !par.stringerLast) {
					if (par.nextMarshPar.hasRailing.in) {
						if (params.rackBottom == "сверху с крышкой") center1 = newPoint_xy(p0, par.b * 0.5, par.rackTopHoleY);
						center1.noDraw = true;
						//сохраняем сдвиг отверстия до края следующего марша (для расчета поручня и ригелей)
						center1.dxToMarshNext = -(center1.x - p0.x) + par.b + par.turnBotParams.topMarshOffsetX + 5 - 0.1;

						//отверстия для крепления поворотной стойки следущего марша
						//var center2 = newPoint_xy(p0, par.b + par.turnBotParams.topMarshOffsetX - 40 / 2 + 5, par.stepHoleY);
						var center2 = newPoint_xy(p2, 15, par.carcasAnglePosY);
						center2.y -= setTurnRacksParams(par.marshId + 1, par.key).shiftBotFrame;//сдвиг кронштейна вниз чтобы не попадал на крепление рамки
						center2.noRack = true;// отверстие не учитывается при построении заграждения
						par.railingHoles.push(center2);

						if (par.botEnd == "winder") {
							center1.x -= 1;
							center2.x -= 1;
						}
					}
				}

				par.railingHoles.push(center1);
				//console.log(center1)
			}
		}

		if (params.railingModel == "Трап") {
			var balOnlay = 150;
			var pt = newPoint_xy(p0, -par.b, 0);
			center1 = polar(p0, par.marshAng - Math.PI / 2, balOnlay - 30);
			center1 = newPoint_xy(center1, 5, -5 - par.h / 2);
			center2 = polar(center1, par.marshAng + Math.PI / 2, 60);
			center1.noHole2 = center2.noHole2 = true;//второе отверстие делать не надо
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);
		}

		if (params.railingModel == "Самонесущее стекло" && hasFirstPltRack) {

			// отверстия под последнее стекло марша
			center1 = newPoint_xy(p2, par.rutelPosX, par.rutelPosY);
			center2 = newPoint_xy(center1, 0.0, -par.rutelDist);
			par.railingHoles.push(center1);
			par.railingHoles.push(center2);

			if (par.hasPltRailing) {
				var isPlatformTopRailing = true;
				// отверстия под стойку 1
				var glassSectionLength = par.platformLength - par.b;
				center1 = newPoint_xy(p2, 425, par.stepHoleY + (topLineP1.y - p2.y));
				if (hasTreadFrames()) {
					center1 = newPoint_xy(p2, par.b + 100, par.stepHoleY + (topLineP1.y - p2.y));
				}
				center2 = newPoint_xy(center1, 0, -par.rutelDist);
				par.railingHoles.push(center1);
				par.railingHoles.push(center2);

				if (glassSectionLength > 1000) {
					// первое среднее
					center1 = newPoint_xy(pCentralHoles, -60, 0);
					center2 = newPoint_xy(center1, 0, -par.rutelDist);
					par.railingHoles.push(center1);
					par.railingHoles.push(center2);

					// второе среднее
					center1 = newPoint_xy(center1, 120, 0);
					center2 = newPoint_xy(center1, 0, -par.rutelDist);
					par.railingHoles.push(center1);
					par.railingHoles.push(center2);

				}
				// отверстия под стойку 2
				center1 = newPoint_xy(topLineP1, -60 - 5 - 30, par.stepHoleY);
				center2 = newPoint_xy(center1, 0, -par.rutelDist);
				if (hasTreadFrames()) {
					center1 = newPoint_xy(topLineP1, -60 - 5 - 30 - 60, par.stepHoleY);
					center2 = newPoint_xy(center1, 0, -par.rutelDist);
				}
				par.railingHoles.push(center1);
				par.railingHoles.push(center2);
			}

		}

	}

	// отверстия для подкосов верхней площадки
	if (par.stringerLast) {
		var pt = newPoint_xy(botLineP1, -par.topEndLength, 0);
		if (params.platformTopColumn === "подкосы" || params.topPltColumns === "подкосы") {
			var hasBrace = false;
			if (params.topPltConsolePos == "слева" && getSide()[par.key] == "right") hasBrace = true;
			if (params.topPltConsolePos == "справа" && getSide()[par.key] == "left") hasBrace = true;

			if (hasBrace) {
				var holeDistX = 95; //расстояние между отверстиями по горизонтали

				var center1 = newPoint_xy(pt, 180, 80);
				var center2 = newPoint_xy(center1, 0, -par.holeDistU4);
				var center3 = newPoint_xy(center1, holeDistX, 0);
				var center4 = newPoint_xy(center2, holeDistX, 0);
				center1.isBraceHole = center2.isBraceHole = center3.isBraceHole = center4.isBraceHole = true;
				center1.hasAngle = center2.hasAngle = center3.hasAngle = center4.hasAngle = false;
				par.pointsHole.push(center2);
				par.pointsHole.push(center1);
				par.pointsHole.push(center3);
				par.pointsHole.push(center4);


				//отверстия под второй подкос
				var center1 = newPoint_xy(pt, 140 + (params.platformLength_3 - 400), 80);
				var center2 = newPoint_xy(center1, 0, -par.holeDistU4);
				var center3 = newPoint_xy(center1, holeDistX, 0);
				var center4 = newPoint_xy(center2, holeDistX, 0);
				center1.isBraceHole = center2.isBraceHole = center3.isBraceHole = center4.isBraceHole = true;
				center1.hasAngle = center2.hasAngle = center3.hasAngle = center4.hasAngle = false;
				par.pointsHole.push(center1);
				par.pointsHole.push(center2);
				par.pointsHole.push(center3);
				par.pointsHole.push(center4);

			}
			if (params.topPltConsolePos == "сзади") {
				var center1 = newPoint_xy(pt, 260, 50);
				center1.isBraceHole = true;
				par.pointsHole.push(center1);

			}
		}
	}

	// отверстия для подкосов средней площадки
	if (!par.stringerLast && params.stairModel == "Прямая с промежуточной площадкой") {
		var pt = newPoint_xy(botLineP1, -par.topEndLength, 0);
		if (params.middlePltColumns === "подкосы") {
			var hasBrace = false;
			if (params.middlePltConsolePos == "слева" && getSide()[par.key] == "right") hasBrace = true;
			if (params.middlePltConsolePos == "справа" && getSide()[par.key] == "left") hasBrace = true;

			if (hasBrace) {
				var holeDistX = 95; //расстояние между отверстиями по горизонтали

				var center1 = newPoint_xy(pt, 180, 80);
				var center2 = newPoint_xy(center1, 0, -par.holeDistU4);
				var center3 = newPoint_xy(center1, holeDistX, 0);
				var center4 = newPoint_xy(center2, holeDistX, 0);
				center1.isBraceHole = center2.isBraceHole = center3.isBraceHole = center4.isBraceHole = true;
				center1.hasAngle = center2.hasAngle = center3.hasAngle = center4.hasAngle = false;
				par.pointsHole.push(center2);
				par.pointsHole.push(center1);
				par.pointsHole.push(center3);
				par.pointsHole.push(center4);


				//отверстия под второй подкос
				var center1 = newPoint_xy(pt, 140 + (params.middlePltLength - 400), 80);
				var center2 = newPoint_xy(center1, 0, -par.holeDistU4);
				var center3 = newPoint_xy(center1, holeDistX, 0);
				var center4 = newPoint_xy(center2, holeDistX, 0);
				center1.isBraceHole = center2.isBraceHole = center3.isBraceHole = center4.isBraceHole = true;
				center1.hasAngle = center2.hasAngle = center3.hasAngle = center4.hasAngle = false;
				par.pointsHole.push(center1);
				par.pointsHole.push(center2);
				par.pointsHole.push(center3);
				par.pointsHole.push(center4);

			}
			if (params.middlePltConsolePos == "сзади") {
				var center1 = newPoint_xy(pt, 260, 50);
				par.pointsHole.push(center1);

			}
		}
	}

	//крепление к стенам
	if (par.key == "out" && par.marshParams.wallFix.out) {
		var fixPar = getFixPart(par.marshId);
		//отверстие ближе к маршу
		center1 = newPoint_xy(p2, 150, -100);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.noZenk = true;
		center1.noBolts = true;
		center1.wallFix = true;
		par.pointsHole.push(center1);
		//отверстие ближе к углу
		center1 = newPoint_xy(topLineP1, -100, -100);
		center1.rad = fixPar.diam / 2 + 1;
		center1.hasAngle = false;
		center1.noZenk = true;
		center1.noBolts = true;
		center1.wallFix = true;
		par.pointsHole.push(center1);
	}

	//сохраняем точку для колонны 
	if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 1) {
		par.keyPoints[par.key].platformEnd = topLineP1;
	}

	//сохраняем координаты угла тетивы для самонесущего стекла
	par.keyPoints[par.key].botLineP10 = newPoint_xy(p2, 35, 0);
	if (par.stringerLast) par.keyPoints[par.key].botLineP10 = newPoint_xy(p2, par.b, 0);
	if (isPlatformTopRailing && (par.key == 'out' || par.stringerLast)) par.keyPoints[par.key].botLineP10 = copyPoint(topLineP1);
	//точки на нижней линии марша для самонесущего стекла
	if (par.stairAmt <= 2) {
		var p10 = polar(par.midUnitEnd,
			(par.marshAng - Math.PI / 2),
			par.stringerWidth) // первая точка на нижней линии марша
		var p20 = polar(p10, par.marshAng, -100.0)
		par.keyPoints[par.key].marshBotLineP1 = copyPoint(p10)
		par.keyPoints[par.key].marshBotLineP2 = copyPoint(p20)
	}

}//end of drawTopStepLt_pltG

function drawTopPltStringer(par) {

	par.pointsShape = [];
	par.pointsHole = [];
	par.railingHoles = [];

	par.carcasHoles = [];
	par.key = "rear";

	if (!par.keyPoints) par.keyPoints = {};
	if (!par.keyPoints[par.key]) par.keyPoints[par.key] = {};

	var framePar = { marshId: par.marshId, isPltFrame: true }
	calcFrameParams(framePar);

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
	var shiftHoleY = -params.treadThickness - 5 - 20; //позиция верхнего отверстия уголка каркаса относительно верха тетивы
	shiftHoleY -= framePar.profHeight + 5;

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
	if (params.model == "лт") p0.y += 5;
	if (params.model == "ко") {
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
		if (turnFactor == 1) center1 = newPoint_xy(p3, -params.M + shiftHoleX, shiftHoleY);
		var center2 = newPoint_xy(center1, 0.0, -60.0);
		center1.hasAngle = center2.hasAngle = false;
		par.pointsHole.push(center1);
		par.pointsHole.push(center2);

		//сохраняем точки для колонн
		par.keyPoints[par.key].end3 = newPoint_xy(p0, plateLen / 2, 0);;	// для второй колонны
	}

	// отверстия под крепежный уголок промежуточного косоура широкого марша
	if (params.M > 1100 && params.calcType == "vhod") {
		var center1 = newPoint_xy(p0, params.M / 2 + params.stringerThickness / 2 - shiftHoleX, shiftHoleY);
		if (turnFactor == 1) center1 = newPoint_xy(p3, -params.M / 2 - params.stringerThickness / 2 + shiftHoleX, shiftHoleY);
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
	if (params.model == "ко" && par.key == "rear") hasAngles = true;
	if (params.model == "лт" && !hasTreadFrames()) hasAngles = true;

	if (hasAngles) {
		//если помещаются 2 уголка
		if (mm - angleOffset * 2 - columnProf * 2 >= distanceHole * 2 + 60) {
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
		if (mm - angleOffset * 2 - columnProf * 2 < distanceHole * 2 + 60) {
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
	if (params.topPltRailing_5) par.hasRailing = true;

	if (par.hasRailing) {
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
	} else if (params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная трехмаршевая") {
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
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
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
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += area * 2;
	}
	par.mesh.specId = partName + name;

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

function drawTopStepLt_pltPIn(par) {

	var p0 = par.pointsShape[par.pointsShape.length - 1];
	var dh = 0; //уменьшение высоты тетивы, чтобы тетива была под ступенью
	dh = params.treadThickness + par.stringerLedge;
	//if (params.stairType !== "лотки") dh = params.treadThickness + par.stringerLedge;

	//вспомогательыне точки на нижней линии
	var p1 = newPoint_xy(p0, par.b, 0);
	var p20 = newPoint_xy(p1, (par.stringerWidth / Math.sin(par.marshAng)), 0.0) // первая точка на нижней линии марша
	if (params.stringerType == "прямая") p20.x -= par.b;
	var p21 = polar(p20, par.marshAng, 100.0); // вторая точка на нижней линии

	/*ТОЧКИ КОНТУРА*/

	//проступь последней ступени марша
	var p1 = newPoint_xy(p0, par.b, 0);

	// подъем ступени
	var p2 = newPoint_xy(p1, 0.0, par.h - dh);
	if (par.stairAmt === 0) p2 = copyPoint(p1);
	var ph = copyPoint(p2);

	if (params.stringerType == "прямая") {
		//угол наклона верхней линии должен быть равен углу наклона марша
		p2 = newPoint_xy(p1, 0, par.h);
		p2 = itercection(p2, polar(p2, par.marshAng, 100), ph, newPoint_xy(ph, 100, 0))
	}

	// проступь площадки
	var topLineP1 = newPoint_xy(ph, par.topEndLength, 0.0);
	var pt = copyPoint(topLineP1); //правый верхний угол
	if (!hasTreadFrames() && !par.stringerLast)
		topLineP1 = newPoint_xy(ph, 73, 0.0);


	// Нижняя линия
	var botLinePoints = [];

	if (params.stringerType == "ломаная") {
		//тетива из двух частей
		if (!hasTreadFrames() && !par.stringerLast) {
			var topLineP2 = { x: topLineP1.x, y: p1.y - par.stringerWidth };
			botLinePoints.push(topLineP2);
		}
		//цельная тетива
		if (hasTreadFrames() || par.stringerLast) {
			var topLineP2 = newPoint_xy(topLineP1, 0, -par.stringerWidthPlatform + dh)
			var topLineP4 = newPoint_xy(p1, par.stringerWidth, -par.stringerWidth)
			var topLineP3 = { x: topLineP4.x, y: topLineP2.y };
			topLineP2.filletRad = 0; //нижний угол тетивы не скругляется
			botLinePoints.push(topLineP2);
			botLinePoints.push(topLineP3);
			botLinePoints.push(topLineP4);

		}
	}

	if (params.stringerType != 'ломаная') {
		if (hasTreadFrames() || par.stringerLast) {
			var topLineP2 = newPoint_xy(topLineP1, 0.0, -par.stringerWidthPlatform + dh);
			topLineP2.filletRad = 0; //нижний угол тетивы не скругляется
			var topLineP3 = itercection(p20, p21, topLineP2, polar(topLineP2, 0, 100));
			botLinePoints.push(topLineP2);
			botLinePoints.push(topLineP3);
		}
		else {
			var topLineP2 = itercection(p20, p21, topLineP1, polar(topLineP1, Math.PI / 2, 100));
			botLinePoints.push(topLineP2);
		}
	}

	if (params.stringerType == "прямая") par.pointsShape.pop();
	if (params.stringerType != "прямая") par.pointsShape.push(p1);
	par.pointsShape.push(p2);
	topLineP1.filletRad = 0; //верхний угол тетивы не скругляется
	par.pointsShape.push(topLineP1);
	par.pointsShape.push(...botLinePoints);

	//удлинение внутренней тетивы площадки
	if (!hasTreadFrames() && !par.stringerLast) {
		var pt1 = newPoint_xy(topLineP1, params.stringerThickness, 0);
		var pt2 = copyPoint(pt);
		var pt3 = newPoint_xy(pt2, 0.0, -105);
		var pt4 = newPoint_xy(pt1, 0.0, -105);

		pt1.filletRad = pt2.filletRad = pt3.filletRad = pt4.filletRad = 0; //углы тетивы не скругляются
		par.pointsShapeTop.push(pt1);
		par.pointsShapeTop.push(pt2);
		par.pointsShapeTop.push(pt3);
		par.pointsShapeTop.push(pt4);

		//сохраняем длину для спецификации
		par.partsLen.push(distance(pt1, pt2))
	}

	//сохраняем точку для расчета длины
	par.keyPoints.topPoint = copyPoint(topLineP1);


	/*ОТВЕРСТИЯ*/

	if (!hasTreadFrames()) {

		var aTyp = "У2-40х40х200";
		var holeDist3 = 150.0;
		var angleHolePosX = 25.0;

		if (par.topEndLength < 790) {
			holeDist3 = 50;
			aTyp = "У2-40х40х90";
			angleHolePosX = 20;
		}

		var lenMiddlePlatform = (params.platformLength_1 + 7) / 2;
		if (par.stringerLast) lenMiddlePlatform = (params.platformLength_3 - 3) / 2;
		var centerPlatform = newPoint_xy(pt, -lenMiddlePlatform - 5, 0);
		//var centerPlatform = newPoint_xy(pt2, -lenMiddlePlatform - 5, 0);

		// отверстия под 1 уголок площадки (ближе к маршу)
		center1 = newPoint_xy(centerPlatform, -(lenMiddlePlatform - 75 - 60) / 2 - holeDist3 / 2, par.stepHoleY + 5 + params.treadThickness);
		var center2 = newPoint_xy(center1, holeDist3, 0.0);
		if (par.stringerLast) {
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
		}
		else {
			par.pointsHoleTop.push(center1);
			par.pointsHoleTop.push(center2);
		}


		// отверстия под перемычку
		if (par.topEndLength > 600) {
			center1 = newPoint_xy(centerPlatform, (params.stringerThickness + 60) / 2, par.stepHoleY + 5 + params.treadThickness);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false;
			if (par.stringerLast) {
				par.pointsHole.push(center1);
				par.pointsHole.push(center2);
			}
			else {
				par.pointsHoleTop.push(center1);
				par.pointsHoleTop.push(center2);
			}
		}

		// отверстия под перемычку
		if (par.stringerLast) {
			var turnParams = calcTurnParams(par.marshId);
			var topMarshAnlePosX = turnParams.topMarshOffsetX + params.stringerThickness + 30 + par.stringerLedge;
			center1 = newPoint_xy(ph, topMarshAnlePosX, par.carcasAnglePosY + dh);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = false; //уголки перемычки отрисовываются внутри drawBridge_2
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}

		// отверстия под 2 уголок площадки (ближе к углу)
		var stepHoleXside2 = par.topEndLength / 4 * 3 - holeDist3 / 2;
		if (stepHoleXside2 > 0.0) {
			center1 = newPoint_xy(centerPlatform, lenMiddlePlatform / 2 - holeDist3 / 2, par.stepHoleY + 5 + params.treadThickness);
			center2 = newPoint_xy(center1, holeDist3, 0.0);
			if (par.stringerLast) {
				par.pointsHole.push(center1);
				par.pointsHole.push(center2);
			}
			else {
				par.pointsHoleTop.push(center1);
				par.pointsHoleTop.push(center2);
			}
		}

		// отверстия под уголки крепления к поперечному косоуру площадки
		//уголок спереди
		if (!par.stringerLast) {
			center1 = newPoint_xy(ph, 43, -20.0);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = true;
			center1.noBoltsInSide1 = center2.noBoltsInSide1 = true;
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);

			//уголок сзади
			center1 = newPoint_xy(center1, par.holeDistU4 + params.stringerThickness, 0.0);
			center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
			center1.hasAngle = center2.hasAngle = true;
			center1.rotated = center2.rotated = true;
			center1.noBoltsInSide1 = center2.noBoltsInSide1 = true;
			par.pointsHoleTop.push(center2);
			par.pointsHoleTop.push(center1);
		}
	}

	if (hasTreadFrames()) {
		// отверстия под рамки под площадкой

		var frameAmt = calcPltFrameParams(par.topEndLength, par.platformFramesParams.overhang).frameAmt;
		var frameWidth = calcPltFrameParams(par.topEndLength, par.platformFramesParams.overhang).frameWidth;

		var begX = par.platformFramesParams.overhang + 5.0 + par.platformFramesParams.sideHolePosX;
		var i;
		for (i = 0; i < frameAmt; i++) {
			center1 = newPoint_xy(ph, begX, par.stepHoleY + dh);
			if (params.stairType == "пресснастил") center1.y += 5; //костыль
			center2 = newPoint_xy(center1, frameWidth - par.platformFramesParams.sideHolePosX - par.platformFramesParams.sideHolePosX, 0.0);
			begX += frameWidth + 5.0;
			par.pointsHole.push(center1);
			par.pointsHole.push(center2);
			center1.noZenk = center2.noZenk = true;

			if (params.platformTop == 'увеличенная' && par.stringerLast) {
				center1.isPltFrame = center2.isPltFrame = true;
				center1.isPltPFrame = center2.isPltPFrame = true;
			}
		}
	}


	// уголок крепления к задней тетиве
	var holePos = par.carcasAnglePosY + params.treadThickness + 5.0;
	if (par.marshPar.lastMarsh) holePos = - 20 - par.platformFramesParams.profHeight - 5;
	if (params.calcType == 'vhod') {
		//holePos = -35 + par.carcasAnglePosY;
		//holePos = 25 + par.carcasAnglePosY;
	}
	center1 = newPoint_xy(pt, -30.0, holePos);
	center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
	center1.hasAngle = center2.hasAngle = true;
	if (!hasTreadFrames()) {
		if (par.stringerLast) {
			par.pointsHole.push(center2);
			par.pointsHole.push(center1);
		}
		else {
			par.pointsHoleTop.push(center2);
			par.pointsHoleTop.push(center1);
		}
	}
	if (hasTreadFrames()) {
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
	}

	if (par.stringerLast && params.platformTop == 'увеличенная') {
		center1 = newPoint_xy(ph, 32.0, holePos);
		//if (params.stairType == "нет") center1.y += par.carcasAnglePosY;
		center2 = newPoint_xy(center1, 0.0, -par.holeDistU4);
		center1.hasAngle = center2.hasAngle = false;
		par.pointsHole.push(center2);
		par.pointsHole.push(center1);
	}


	//Отверстия под ограждения
	if (par.hasRailing) {

		if (params.railingModel != "Самонесущее стекло") {
			center1 = newPoint_xy(p0, par.b * 0.5, par.rackTopHoleY);
			//смещаем стойку чтобы она была вровень со стойкой верхнего марша
			center1 = newPoint_x1(center1, 30, par.marshAng);
			par.railingHoles.push(center1);
		}
		if (params.railingModel == "Самонесущее стекло") {

			center1 = center2 = 0;
		}
	}

	//сохраняем координаты угла тетивы для самонесущего стекла
	par.keyPoints[par.key].botLineP10 = copyPoint(ph);

	//точки на нижней линии марша для самонесущего стекла
	if (par.stairAmt <= 2) {
		var p10 = polar(par.midUnitEnd,
			(par.marshAng - Math.PI / 2),
			par.stringerWidth) // первая точка на нижней линии марша
		var p20 = polar(p10, par.marshAng, -100.0)
		par.keyPoints[par.key].marshBotLineP1 = copyPoint(p10)
		par.keyPoints[par.key].marshBotLineP2 = copyPoint(p20)
	}

}//end of drawTopStepLt_pltPIn

function drawTreadFrame2(par) {


	// создаем меш
	var mesh = new THREE.Object3D();

	//задаем параметры в случае их отсутствия
	if (!par.dxfArr) par.dxfArr = dxfPrimitivesArr;
	if (!par.dxfBasePoint) {
		par.dxfBasePoint = { x: 0, y: 0 };
		dxfArr = [];
	}

	// рассчитываем параметры рамки
	calcFrameParams(par); //функция в файле drawFrames.js

	var marshParams = getMarshParams(par.marshId);

	/* данные из глобальных переменных
	params.materials.metal - материал
	*/

	/* данные, добавляемые в calcFrameParams()
	par.bridgeAmt - кол-во горизонтальных фланцев
	par.length - длина рамки
	par.framesAmt - количество рамок( для увеличенной площадки и широких маршей)
	par.overhang
	par.profHeight
	par.profWidth
	par.profile - профиль перемычек: 40x20, 40x40 или 60x30 (буква x английская)
	par.sideHolePosX
	par.width - ширина рамки
	*/

	//уменьшаем длину рамки, попадающую на соединительный фланец
	if (par.isFlanFrame) par.length -= params.stringerThickness * 2;

	//длина рамки между маршами для П-образной с площадкой
	if (par.isPltFrameMarshDist) par.length = params.marshDist;

	// создаем рамку
	var frame = new THREE.Object3D();

	if (params.stairType == "лотки") par.profHeight += params.treadThickness;

	// определяем параметры профиля
	var profPar = {
		partName: "frameProf",
		type: "rect",
		poleProfileY: par.profHeight,
		poleProfileZ: par.profWidth,
		length: par.length,
		poleAngle: 0,
		material: params.materials.metal,
		dxfBasePoint: { x: 0, y: 0 },
		dxfArr: [], //профиль не выводим в dxf
		sectText: "",
		handrailMatType: "metal"
	};

	if (params.stairType != "пресснастил" || par.isPltFrame) {
		// ближний профиль рамки
		//для рифленки выводим в dxf контура пластин
		if (params.stairType == "лотки" || params.stairType == "рифленая сталь") {
			var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, par.width - 2 * par.profWidth + 50);
			var p0 = { x: 0, y: 0 };
			var p1 = newPoint_xy(p0, 0, profPar.length);
			var p2 = newPoint_xy(p1, profPar.poleProfileY, 0);
			var p3 = newPoint_xy(p0, profPar.poleProfileY, 0);
			var shape = new THREE.Shape();
			addLine(shape, par.dxfArr, p0, p1, dxfBasePoint);
			addLine(shape, par.dxfArr, p1, p2, dxfBasePoint);
			addLine(shape, par.dxfArr, p2, p3, dxfBasePoint);
			addLine(shape, par.dxfArr, p3, p0, dxfBasePoint);
		}
		var pole = drawPole3D_4(profPar).mesh;
		pole.rotation.y = - toRadians(90);
		pole.position.x = par.profWidth;
		pole.position.y = - par.profHeight;
		pole.position.z = 0;
		frame.add(pole);

		// дальний профиль рамки
		//для рифленки выводим в dxf контура пластин
		if (params.stairType == "лотки" || params.stairType == "рифленая сталь") {
			dxfBasePoint = newPoint_xy(dxfBasePoint, 0, profPar.length + 50);
			var shape = new THREE.Shape();
			addLine(shape, par.dxfArr, p0, p1, dxfBasePoint);
			addLine(shape, par.dxfArr, p1, p2, dxfBasePoint);
			addLine(shape, par.dxfArr, p2, p3, dxfBasePoint);
			addLine(shape, par.dxfArr, p3, p0, dxfBasePoint);
		}
		var pole = drawPole3D_4(profPar).mesh;
		pole.rotation.y = - toRadians(90);
		pole.position.x = par.width;
		pole.position.y = - par.profHeight;
		pole.position.z = 0;
		frame.add(pole);
	}

	// определяем параметры бокового фланца
	var flanPar = {
		width: 40,
		height: par.width - 2 * par.profWidth,
		thk: 8,
		roundHoleCenters: [],
		holeOffset: 25,
		holeRad: 6.5,
		dxfBasePoint: par.dxfBasePoint,
	};

	if (params.stairType == "лотки") {
		par.profHeight -= params.treadThickness;
		flanPar.width = par.profHeight;
	}

	var flanSideWidth = flanPar.width;

	// определяем параметры первого отверстия фланца
	var hole1 = {
		x: flanPar.width / 2,
		y: flanPar.holeOffset
	};

	// определяем параметры второго отверстия фланца
	var hole2 = {
		x: flanPar.width / 2,
		y: flanPar.height - flanPar.holeOffset
	};

	if (params.stairType == "пресснастил" && !par.isPltFrame) {
		var marshPar = getMarshParams(par.marshId);
		flanPar.height = marshPar.a * 1.0;
		flanPar.thk = 3;
		par.holeDist = calcPresParams(marshPar.a).holeDist;
		hole1 = {
			x: 15,
			y: marshPar.a - 30,
		};

		hole2 = {
			x: 15,
			y: marshPar.a - (30 + par.holeDist),
		};
		flanPar.material = params.materials.inox;
		flanPar.cutAngle = true;
	}

	// добавляем параметры отверстий в свойства фланца
	flanPar.roundHoleCenters.push(hole1, hole2);


	// создаем левый боковой фланец
	if (par.isPltPFrame && turnFactor == -1) flanPar.noBolts = true;
	if (par.isFrameSideNoBolts1) flanPar.noBolts = true;
	if (par.isPltFrameMarshDist) flanPar.noBolts = true;
	var sideFlan1 = drawRectFlan2(flanPar).mesh;
	sideFlan1.position.x = flanPar.height + par.profWidth;
	sideFlan1.position.y = - flanPar.width;
	if (params.stairType == "пресснастил" && !par.isPltFrame) sideFlan1.position.y += 5;
	sideFlan1.position.z = 0;
	sideFlan1.rotation.z = Math.PI / 2;
	frame.add(sideFlan1);

	// создаем правый боковой фланец
	flanPar.noBolts = false;
	if (par.isPltPFrame && turnFactor == 1) flanPar.noBolts = true;
	if (par.isFrameSideNoBolts2) flanPar.noBolts = true;
	if (par.isPltPFrame && turnFactor == -1 && !par.isPltFrameMarshDist) flanPar.noBolts = false;
	if (par.isPltFrameMarshDist) flanPar.noBolts = true;
	flanPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -flanPar.height - 50);
	flanPar.mirrowBolts = true;

	var sideFlan2 = drawRectFlan2(flanPar).mesh;
	sideFlan2.rotation.z = Math.PI / 2;
	//переворачиваем фланец чтобы болты имели правильную ориентацию
	//sideFlan2.rotation.y = Math.PI;	
	//sideFlan2.position.x = par.profWidth;
	sideFlan2.position.x = sideFlan1.position.x
	sideFlan2.position.y = - flanPar.width;
	if (params.stairType == "пресснастил" && !par.isPltFrame) sideFlan2.position.y += 5;
	sideFlan2.position.z = par.length - flanPar.thk;

	frame.add(sideFlan2);

	// определяем параметры верхнего фланца
	var flanPar = {
		width: 25,
		height: par.width - 2 * par.profWidth,
		thk: 4,
		roundHoleCenters: [],
		holeOffset: 30,
		holeRad: 4,
		noBolts: true,
		dxfBasePoint: par.dxfBasePoint,
		hasScrews: true
	};
	if (params.stairType == 'дпк') {
		flanPar.hasScrews = false;
		flanPar.boltParams = {
			headType: "меб.",
			diam: 6,
			len: 35,
			offsetY: params.treadThickness,
			nutOffset: -10
		};
	}
	if (testingMode) {
		flanPar.hasScrews = false;
		flanPar.boltParams = null;
	}

	flanPar.dxfBasePoint = newPoint_xy(flanPar.dxfBasePoint, 0, flanPar.height + 150);

	if (!(params.stairType == "дпк" && par.isPltFrame)) {
		// определяем параметры первого отверстия фланца
		var hole1 = {
			x: flanPar.width / 2,
			y: flanPar.holeOffset,
		};

		// определяем параметры второго отверстия фланца
		var hole2 = {
			x: flanPar.width / 2,
			y: flanPar.height - flanPar.holeOffset,
		};

		// добавляем параметры отверстий в свойства фланца
		flanPar.roundHoleCenters.push(hole1, hole2);
	}

	//для дпк на площадке добавляем два отверстия в середине
	if (params.stairType == "дпк" && par.isPltFrame) {
		var holeOffset = flanPar.holeOffset;
		if (par.offsetHoleNextFrameDpk !== 0) holeOffset = par.offsetHoleNextFrameDpk;

		// определяем параметры первого отверстия фланца
		var hole = {
			x: flanPar.width / 2,
			y: flanPar.height - holeOffset,
		};
		// добавляем параметры отверстий в свойства фланца
		flanPar.roundHoleCenters.push(hole);


		//var threadStep = (marshParams.a - 5) / 2;
		var threadStep = 145 + 5;
		var count = Math.floor((par.width - par.profWidth * 2 - holeOffset) / threadStep);
		for (var j = 0; j < count; j++) {
			hole = newPoint_xy(hole, 0, -threadStep );
			flanPar.roundHoleCenters.push(hole);
		}
		par.offsetHoleNextFrameDpk = threadStep - (par.width - holeOffset - threadStep * count + 5);
	}

	if (params.stairType == "пресснастил") par.bridgeAmt = 0;

	// создаем верхние фланцы
	if (par.bridgeAmt > 1) {

		var bridgeSideOffset = 25;

		var topFlan1 = drawRectFlan2(flanPar).mesh;
		topFlan1.position.x = flanPar.height + par.profWidth;
		topFlan1.position.y = 0;
		topFlan1.position.z = bridgeSideOffset + flanPar.thk;
		topFlan1.rotation.x = toRadians(90);
		topFlan1.rotation.z = toRadians(90);
		frame.add(topFlan1);

		flanPar.dxfBasePoint = newPoint_xy(flanPar.dxfBasePoint, 0, flanPar.height + 50);
		var topFlan3 = drawRectFlan2(flanPar).mesh;
		topFlan3.position.x = flanPar.height + par.profWidth;
		topFlan3.position.y = 0;
		topFlan3.position.z = par.length - bridgeSideOffset - flanPar.thk - flanPar.width;
		topFlan3.rotation.x = toRadians(90);
		topFlan3.rotation.z = toRadians(90);
		frame.add(topFlan3);

		if (par.bridgeAmt > 2) {
			var delta = (topFlan3.position.z - topFlan1.position.z) / (par.bridgeAmt - 1);
			for (var i = 2; i < par.bridgeAmt; i++) {
				flanPar.dxfBasePoint = newPoint_xy(flanPar.dxfBasePoint, 0, flanPar.height + 50);
				var topFlan2 = drawRectFlan2(flanPar).mesh;
				topFlan2.position.x = flanPar.height + par.profWidth;
				topFlan2.position.y = 0;
				topFlan2.position.z = topFlan1.position.z + delta * (i - 1);
				topFlan2.rotation.x = Math.PI / 2;
				topFlan2.rotation.z = Math.PI / 2;
				frame.add(topFlan2);

			}//end of for
		}
	}
	if (par.bridgeAmt == 1) {
		var topFlan1 = drawRectFlan2(flanPar).mesh;
		topFlan1.position.x = flanPar.height + par.profWidth;
		topFlan1.position.y = 0;
		topFlan1.position.z = par.length / 2 - flanPar.width / 2;
		topFlan1.rotation.x = toRadians(90);
		topFlan1.rotation.z = toRadians(90);
		frame.add(topFlan1);
	}

	//перемычки из профильной трубы
	if (par.profBridgeAmt) {
		var profPar = {
			partName: "frameProf",
			poleProfileY: 20,
			poleProfileZ: 20,
			length: par.width - par.profWidth * 2,
			poleAngle: 0,
			dxfBasePoint: { x: 0, y: 0 },
			dxfArr: [], //профиль не выводим в dxf
			sectText: "",
			handrailMatType: "metal"
		};

		if (par.width > 350) profPar.poleProfileY = 40;

		var profBridgeDist = par.length / (par.profBridgeAmt + 1);
		for (var i = 0; i < par.profBridgeAmt; i++) {
			var pole = drawPole3D_4(profPar).mesh;
			pole.rotation.x = 0//toRadians(90);
			pole.rotation.z = 0//toRadians(90);

			pole.position.x = par.profWidth;
			pole.position.y = -profPar.poleProfileY
			pole.position.z = -profPar.poleProfileZ / 2 + profBridgeDist * (i + 1);
			frame.add(pole);
		}


	}


	//сохраняем данные для спецификации
	var partName = "treadFrame";
	if (typeof specObj != 'undefined' && params.stairType != "пресснастил" && params.stairType != "рифленая сталь" && params.stairType != "лотки") {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Рамка прямая",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
			}
		}
		var name = Math.round(par.length) + "x" + Math.round(par.width) + "x" + par.profHeight;
		if (par.profBridgeAmt > 0) name += " перемычки " + profPar.poleProfileY + "х" + profPar.poleProfileZ + " " + par.profBridgeAmt + " шт.";
		else name += " без перемычек";
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	// позиционируем рамку
	frame.position.x = - par.sideHolePosX;
	frame.position.y = flanSideWidth / 2;
	frame.position.z = -par.length / 2 + calcStringerMoove(par.marshId).stringerOutMoove / 2 * turnFactor;
	if (par.largePlt && par.isPltFrame) {
		if (params.turnSide == 'левое') {
			frame.position.z -= par.deltaZ / 2;
		} else {
			frame.position.z += par.deltaZ / 2;
		}
	}

	mesh.add(frame);

	mesh.specId = partName + name;

	return mesh;

} //end of drawTreadFrame2

function drawFrames(par) {
	var frames = new THREE.Object3D;

	var isFrameHole = function (hole) {
		return (hole.hasAngle == undefined && hole.wndFrame == undefined);
	}

	var offsetHoleNextFrameDpk = 0;
	for (var i = 0; i < par.holes.length - 1; i++) {
		if (isFrameHole(par.holes[i])) {
			var holeDist = par.holes[i + 1].x - par.holes[i].x;
			
			var framePar = {
				holeDist: holeDist,
				dxfBasePoint: par.dxfBasePoint,
				isPltFrame: par.holes[i].isPltFrame, //является ли рамкой площадки
				isPltPFrame: par.holes[i].isPltPFrame, //является ли рамкой промежуточной площадки П-образной с площадкой
				isLargePlt: par.holes[i].isLargePlt, //является ли каркасом увеличенной площадки
				isFlanFrame: par.holes[i].isMiddleFlanHole, //попадает ли на соеденительный фланец
				marshId: par.marshId,
				offsetHoleNextFrameDpk: offsetHoleNextFrameDpk,
			}
			//для лотков и рифленки рамка не накладывается на фланец
			if (params.stairType == "лотки" || params.stairType == "рифленая сталь") {
				isFlanFrame = false;
			}


			//для средней тетивы входной лестницы убираем болты
			if (params.calcType == "vhod" && params.M > 1100) {
				if (framePar.isPltPFrame) {
					framePar.isFrameSideNoBolts2 = true;
					framePar.isPltPFrame = false;
				}
				else {
					framePar.isFrameSideNoBolts1 = true;
				}
			}
			if (par.holes[i].noBoltsIn) {
				if (turnFactor == 1) framePar.isFrameSideNoBolts2 = true;
				if (turnFactor == -1) framePar.isFrameSideNoBolts1 = true;
			}
			if (par.holes[i].noBoltsOut) {
				if (turnFactor == 1) framePar.isFrameSideNoBolts1 = true;
				if (turnFactor == -1) framePar.isFrameSideNoBolts2 = true;
			}
			if (par.holes[i].noBolts) {
				framePar.isFrameSideNoBolts1 = true;
				framePar.isFrameSideNoBolts2 = true;
			}
			if (par.holes[i].noBoltsFrame) {
				framePar.isFrameSideNoBolts1 = true;
				framePar.isFrameSideNoBolts2 = true;
			}

			var frame = drawTreadFrame2(framePar);
			par.length = framePar.length;
			frame.position.x = par.holes[i].x;
			frame.position.y = par.holes[i].y;
			frames.add(frame);

			offsetHoleNextFrameDpk = framePar.offsetHoleNextFrameDpk;

			//для лотков и рифленки вместо отрисовки ступени отрисовываем площадки для рамок
			if ((framePar.isPltPFrame || framePar.isPltFrame) && (params.stairType == "лотки" || params.stairType == "рифленая сталь")) {
				var pltPar = {
					len: framePar.width,
					width: framePar.length,
					dxfBasePoint: dxfBasePoint,
					botMarshId: par.marshId,
					marshId: par.marshId,
					isP: true,
				}
				if (params.stairType == "лотки") pltPar.len -= 4 * 2; // 4 - толщина переднего и заднего фланца лотка
				pltPar = drawPlatform2(pltPar);
				var platform = pltPar.treads;
				platform.position.x = frame.position.x - framePar.sideHolePosX;
				if (params.stairType == "лотки") platform.position.x += 4;
				platform.position.y = frame.position.y - framePar.profHeight / 2 - 0.01;
				if (params.stairType == "рифленая сталь") {
					platform.position.y = frame.position.y + framePar.profHeight / 2 - 1 + 0.01;
					//platform.position.y = frame.position.y + framePar.profHeight / 2 - params.treadThickness - params.treadThickness / 2 + 0.01;
				}
				platform.position.z = frame.position.z;
				if (par.isBigPlt) {
					platform.position.z = -(framePar.length / 2 - params.M / 2 + params.stringerThickness) * turnFactor;
				};
				if (params.calcType == "vhod") {
					platform.position.z += (framePar.length / 2 + 3 + 1) * turnFactor; //Не понятно, подогнано
					if (params.M <= 1100) platform.position.z = frame.position.z//-3 * turnFactor; 
					if (par.isBigPlt) {
						platform.position.z = (params.M / 2 - framePar.length / 2 - params.stringerThickness - 3) * turnFactor;
					};
					platform.position.y = frame.position.y + framePar.profHeight / 2 - (5 - params.treadThickness);
				}
				frames.add(platform);
			}

			//рамки между маршами для П-образной с площадкой
			if (params.stairModel == "П-образная с площадкой" && framePar.marshId == 1 && framePar.isPltFrame) {
				//if (params.stairModel == "П-образная с площадкой" && framePar.marshId == 1 && framePar.isPltFrame && params.marshDist > 200) {
				framePar.isPltFrameMarshDist = true;

				var frame = drawTreadFrame2(framePar);
				par.length = framePar.length;
				frame.position.z = (params.M + params.marshDist) / 2 * turnFactor;
				frame.position.x = par.holes[i].x;
				frame.position.y = par.holes[i].y;
				frames.add(frame);

				//для лотков и рифленки вместо отрисовки ступени отрисовываем площадки для рамок
				if ((framePar.isPltPFrame || framePar.isPltFrame) && (params.stairType == "лотки" || params.stairType == "рифленая сталь")) {
					var pltPar = {
						len: framePar.width,
						width: framePar.length,
						dxfBasePoint: dxfBasePoint,
						botMarshId: par.marshId,
						marshId: par.marshId,
						isP: true,
					}
					pltPar = drawPlatform2(pltPar);
					var platform = pltPar.treads;
					platform.position.x = frame.position.x - framePar.sideHolePosX;
					platform.position.y = frame.position.y - framePar.profHeight / 2 - 0.01;
					if (params.stairType == "рифленая сталь")
						platform.position.y = frame.position.y + framePar.profHeight / 2 - 1 + 0.01;
					platform.position.z = (params.M - params.stringerThickness) * turnFactor;
					frames.add(platform);
				}
			}

			par.dxfBasePoint.x += 150;
			i++; //пропускаем следующее отверстие
		}
	}

	return frames;

}//end of drawFrames