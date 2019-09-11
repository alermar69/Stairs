//глобальные переменные для тестирования
var testingMode = false;
var boltDiam = 10;
var boltBulge = 8;
var boltLen = 30;
var turnFactor = 1;
var treadsObj;

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
	treadsObj = drawTreads();

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

		setTimeout(function() {
			if(typeof staircaseLoaded != 'undefined') staircaseLoaded();
		}, 0);

	}

	//измерение размеров на модели
	addMeasurement(viewportId);

} //end of drawStair

//--------------------------------------------------------------------
function drawMiddleStringers(par, marshId) {
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
	if (turnFactor == -1) {
		sideIn = "left";
		sideOut = "right";
	}

	var midStringers = [];
	var stringerThickness = params.stringerThickness;
	var treadWidth = params.M - 2 * stringerThickness;
	var midStringerAmt = Math.floor(treadWidth / 1090);
	var midstringerBetweenLen = (treadWidth - stringerThickness * midStringerAmt) / (midStringerAmt + 1);
	if (midStringerAmt > 0) {
		for (i = 1; i <= midStringerAmt; i++) {
			if (i == 1) stringerParams.midStringerFirst = true;
			if (i !== 1) stringerParams.midStringerFirst = false;
			var midStringer = drawStringer(stringerParams).mesh;
			midStringer.position.x = -stringerParams.treadFrontOverHang;
			midStringer.position.z = midstringerBetweenLen * i - params.M / 2 + params.stringerThickness * i;
			midStringers.push(midStringer);
			mesh.add(midStringer);

			//уголки
			var midAngle = drawCarcasAngles(stringerParams.carcasHoles, sideIn);
			midAngle.position.x = midStringer.position.x;
			midAngle.position.z = midStringer.position.z;
			if (sideIn == "left") midAngle.position.z += params.stringerThickness;
			angles.add(midAngle);

			//рамки
			if (hasTreadFrames()) {
				par.dxfBasePoint.x += stringerParams.lenX;
				par.dxfBasePoint.x += 2000;
				var framePar = {
					holes: stringerParams.carcasHoles,
					dxfBasePoint: par.dxfBasePoint,
				}
				var frames = drawFrames(framePar);
				frames.position.x = -stringerParams.treadFrontOverHang;
				frames.position.z = midStringer.position.z - framePar.length / 2;
				angles.add(frames)
			}

			//длинные болты
			if (drawLongBolts) {
				var boltPar = {
					diam: 10,
					len: 40,
					headType: "шестигр.",
				}
				var longBoltPos = stringerParams.elmIns[stringerParams.key].longBolts;
				for (var j = 0; j < longBoltPos.length; j++) {
					var bolt = drawBolt(boltPar).mesh;
					bolt.rotation.x = Math.PI / 2 * turnFactor;
					bolt.position.x = longBoltPos[j].x;
					if (params.model == "лт") bolt.position.x -= 5;
					bolt.position.y = longBoltPos[j].y;
					bolt.position.z = midAngle.position.z//params.stringerThickness/2;
					mesh.add(bolt);
				}
			}
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


	stringerParams.mesh = mesh;
	stringerParams.angles = angles;
	return stringerParams;
}

function drawHandrail_4(par) {

	//адаптация для отрисовки пристенных поручней
	if (!par.startAngle && par.startAngle !== 0) par.startAngle = Math.PI / 2;
	if (!par.endAngle && par.endAngle !== 0) par.endAngle = Math.PI / 2;
	if (!par.fixType) par.fixType = "кронштейны";
	if (!par.poleAngle) par.poleAngle = 0;
	if (!par.dxfArr) par.dxfArr = dxfPrimitivesArr;
	if (!par.dxfBasePoint) {
		par.dxfBasePoint = { x: 0, y: 0 };
		par.dxfArr = [];
	}

	par.mesh = new THREE.Object3D();
	par.wallOffset = 50; //расстояние от стены до оси поручня
	par.holderHeight = 50; //высота кронштейна от оси до лодочки
	par.holderEndOffset = 70; //расстояние от кронштейна до конца поручня
	par.holderMaxDist = 800; //максимальное расстояние между кронштейнами

	//параметры поручня
	var handrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_railing,
		timberPaint: params.timberPaint_perila,
	}
	if (par.unit == "balustrade") {
		var handrailPar = {
			prof: params.handrailProf_bal,
			sideSlots: params.handrailSlots_bal,
			handrailType: params.handrail_bal,
			metalPaint: params.metalPaint_railing,
			timberPaint: params.timberPaint_perila_bal,
		}
	}
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js

	par.profHeight = handrailPar.profY;
	par.profWidth = handrailPar.profZ;
	par.type = handrailPar.handrailModel;
	par.poleMaterial = params.materials.metal_railing;
	if (handrailPar.mat == "timber") par.poleMaterial = params.materials.handrail;
	if (handrailPar.mat == "inox") par.poleMaterial = params.materials.inox;

	if (par.cutBasePlane == 'top') return drawHandrailPorfile_4(par);

	//поручень
	//рассчитываем абсолютные углы
	var angStart = par.poleAngle + par.startAngle;
	var angEnd = par.poleAngle + par.endAngle;
	var startCutLen = par.profHeight / Math.sin(par.startAngle)
	var endCutLen = par.profHeight / Math.sin(par.endAngle)

	var p0 = { x: 0, y: 0 };
	//круглый поручень строится по оси
	if (par.type == "round") p0 = polar(p0, par.poleAngle + Math.PI / 2, -par.profHeight / 2);
	var p1 = polar(p0, angStart, startCutLen);
	var p2 = polar(p1, par.poleAngle, par.length);
	var p3 = polar(p2, angEnd, -endCutLen);

	var shape = new THREE.Shape();
	addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);

	//добавляем шейп в глобальный массив для последующего образмеривания
	if (typeof shapesList != "undefined" && par.drawing) {
		shape.drawing = par.drawing;

		shape.drawing.startCutX = p0.x - p1.x;
		shape.drawing.endCutX = p3.x - p2.x;

		shape.drawing.baseLine = { p1: p0, p2: p3 };
		if (Math.abs(par.startAngle) !== Math.PI / 2) {
			shape.drawing.startAngle = { center: copyPoint(p0) };

			var len = Math.abs(startCutLen) + 130;
			var angP1 = polar(p0, angStart, -len);
			var angP2 = polar(p0, par.poleAngle + Math.PI / 2, -len * Math.sin(angStart));

			shape.drawing.startAngle.p1 = angP2;
			shape.drawing.startAngle.p2 = angP1;

			if (Math.abs(par.startAngle) < Math.PI / 2) {
				var len = Math.abs(startCutLen) + 130;
				shape.drawing.startAngle.center = copyPoint(p1);
				var angP1 = polar(p1, angStart, len);
				var angP2 = polar(p1, par.poleAngle + Math.PI / 2, len * Math.sin(angStart));

				shape.drawing.startAngle.p1 = angP1;
				shape.drawing.startAngle.p2 = angP2;
			}
		}

		if (Math.abs(par.endAngle) !== Math.PI / 2) {
			shape.drawing.endAngle = { center: copyPoint(p3) };

			var len = Math.abs(endCutLen) + 130;
			var angP1 = polar(p3, angEnd, len);
			var angP2 = polar(p3, par.poleAngle + Math.PI / 2, len * Math.sin(angEnd));

			shape.drawing.endAngle.p1 = angP1;
			shape.drawing.endAngle.p2 = angP2;

			if (par.endAngle < Math.PI / 2) {
				shape.drawing.endAngle.center = copyPoint(p2);

				var angP1 = polar(p2, angEnd, -len);
				var angP2 = polar(p2, par.poleAngle + Math.PI / 2, -len * Math.sin(angEnd));

				shape.drawing.endAngle.p1 = angP2;
				shape.drawing.endAngle.p2 = angP1;
			}
		}

		shapesList.push(shape);
	}

	par.len = par.length;
	par.len2 = distance(p3, p0)

	if (par.type == "rect") {
		var extrudeOptions = {
			amount: par.profWidth,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		}
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var pole = new THREE.Mesh(geometry, par.poleMaterial);
		pole.userData.angle = par.poleAngle;
		pole.position.z = par.wallOffset - par.profWidth / 2;
		if (par.side == "in") pole.position.z = -par.wallOffset - par.profWidth / 2;
		par.mesh.add(pole);
	}

	if (par.type == "round") {
		var pos = { x: 0, y: 0, }
		//pos = polar(pos, par.poleAngle + Math.PI/2, par.profHeight/2)
		pos = polar(pos, par.poleAngle, par.length / 2)
		var geometry = new THREE.CylinderGeometry(par.profHeight / 2, par.profHeight / 2, par.length, 30, 1, false);
		var pole = new THREE.Mesh(geometry, par.poleMaterial);
		pole.userData.angle = par.poleAngle;
		pole.rotation.z = Math.PI / 2 + par.poleAngle;
		pole.position.x = pos.x;
		pole.position.y = pos.y
		pole.position.z = par.wallOffset;
		if (par.side == "in") pole.position.z = -par.wallOffset;

		if (par.fixType == "кронштейны") {
			pole.position.z = par.wallOffset;
			if (par.side == "in") pole.position.z = -par.wallOffset;
		}

		par.mesh.add(pole);
	}

	//Силикон
	if (par.hasSilicone) {
		var siliconePar = {
			description: "Крепление поручней",
			group: "Ограждения",
			len: par.len2,
		}

		var silicone = drawSilicone(siliconePar).mesh;
		var silicone_pos = polar(p0, par.poleAngle, siliconePar.len / 2);
		silicone.position.x = silicone_pos.x;
		silicone.position.y = silicone_pos.y;

		silicone.rotation.z = par.poleAngle + Math.PI / 2;
		silicone.position.z = par.wallOffset - par.profWidth / 2;
		if (par.side == "in") silicone.position.z = -par.wallOffset - par.profWidth / 2;
		par.mesh.add(silicone);
	}

	//кронштейны
	if (par.fixType == "кронштейны") {
		par.holderMaterial = params.materials.inox;
		if (params.sideHandrailHolders == "крашеные") par.holderMaterial = params.materials.metal;
		var holderAmt = Math.ceil((par.length - 2 * par.holderEndOffset) / par.holderMaxDist) + 1;
		if (holderAmt < 2) holderAmt = 2;
		var holderDst = (par.length - 2 * par.holderEndOffset) / (holderAmt - 1);

		var holderParams = {
			wallOffset: par.wallOffset,
			height: par.holderHeight,
			dxfArr: dxfPrimitivesArr0,
			dxfBasePoint: { x: 0, y: 0 },
			material: par.holderMaterial,
			isGlassHandrail: par.isGlassHandrail,
		}
		var pos0 = polar(p0, par.poleAngle + Math.PI / 2, -holderParams.height)

		for (var i = 0; i < holderAmt; i++) {
			holderParams = drawWallHandrailHolder(holderParams);
			var holder = holderParams.mesh;
			holder.rotation.z = par.poleAngle
			pos = polar(pos0, par.poleAngle, par.holderEndOffset + holderDst * i);
			holder.position.set(pos.x, pos.y, 0)
			if (par.side == "in") {
				holder.rotation.y = Math.PI;
				holder.rotation.z = -par.poleAngle
			}
			par.mesh.add(holder);
		}

		par.holderAmt = holderAmt;
	}

	if ((par.startPlug || par.endPlug) &&
		(handrailPar.mat == 'metal' || handrailPar.mat == 'inox' || handrailPar.handrailType == 'ПВХ')) {
		var plugParams = {
			id: handrailPar.handrailPlugId,
			width: handrailPar.profY,
			height: handrailPar.profZ,
			description: "Заглушка поручня",
			group: "Ограждения"
		}
		if ((params.handrailMaterial == 'ПВХ' || handrailPar.handrailType == 'ПВХ') && par.partName !== "spiralRigel") {
			var plugParams = {
				id: "stainlessPlug_pvc",
				width: 50,
				height: 50,
				description: "Заглушка поручня",
				group: "Поручни",
				isCirclePlug: true,
				type: "inox",
			}
		}
		if (handrailPar.mat == 'inox') plugParams.type = "inox";

		if (handrailPar.handrailType == "Ф50 нерж.") plugParams.isCirclePlug = true;

		//var zOffset = -par.wallOffset;
		//if (par.side == 'out') zOffset = par.wallOffset;
		var zOffset = par.wallOffset;
		if (par.side == 'in') zOffset = -par.wallOffset;

		if (par.startPlug) {
			var plugBasePoint = polar(p1, par.poleAngle + Math.PI / 2, -handrailPar.profY / 2);
			var startPlug = drawPlug(plugParams);
			startPlug.position.x = plugBasePoint.x;
			startPlug.position.y = plugBasePoint.y;
			startPlug.position.z = zOffset;
			startPlug.rotation.z = par.poleAngle + Math.PI / 2;
			if (!testingMode) par.mesh.add(startPlug);
		}

		if (par.endPlug) {
			var plugBasePoint = p2;//newPoint_xy(p1, length, 0)
			plugBasePoint = polar(plugBasePoint, par.poleAngle + Math.PI / 2, -handrailPar.profY / 2);
			var endPlug = drawPlug(plugParams);
			endPlug.position.x = plugBasePoint.x;
			endPlug.position.y = plugBasePoint.y;
			endPlug.position.z = zOffset;
			endPlug.rotation.z = par.poleAngle + Math.PI / 2;
			if (!testingMode) par.mesh.add(endPlug);
		}

	}


	//сохраняем данные для спецификации
	var partName = "handrails";
	if (par.partName) partName = par.partName; //используется для sideHandrails
	if (typeof specObj != 'undefined' && partName) {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				sumLength: 0,
				name: "Поручень",
				metalPaint: (handrailPar.mat == "metal"),
				timberPaint: (handrailPar.mat == "timber"),
				division: handrailPar.mat,
				workUnitName: "amt",
				group: "handrails",
				type_comments: {}
			}
			if (handrailPar.mat == "inox") specObj[partName].division = "metal";
			//if(params.calcType == "timber") specObj[partName].name = "Поручень";
			if (par.partName == "botPole") specObj[partName].name = "Подбалясная рейка";
			if (params.calcType == 'vhod' && params.staircaseType == 'Готовая') specObj[partName].name = "Поручень " + handrailPar.handrailType;

		}

		var name = Math.round(par.profWidth) + "x" + Math.round(par.profHeight) + "х" + Math.round(par.length);
		if (par.type == "round") name = "Ф" + Math.round(par.profHeight) + "х" + Math.round(par.length);
		if (params.calcType == 'vhod' && params.staircaseType == 'Готовая') name = "L=" + Math.round(par.length) + "мм";
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumLength"] += Math.round(par.length) / 1000;

		if (partName == "handrails" || partName == 'sideHandrails') {
			var prot = 'нет';
			if (params.handrailSlots == 'да' && par.unit !== "balustrade") prot = 'есть';
			if (params.handrailSlots_bal == 'да' && par.unit == "balustrade") prot = 'есть';
			specObj[partName]["type_comments"][name] = "Сторона " + (par.side == 'out' ? 'внешняя' : 'внутренняя');
			if (par.unit == "balustrade") specObj[partName]["type_comments"][name] = 'Баллюстрада'
			if (par.marshId) specObj[partName]["type_comments"][name] = "Марш " + getMarshParams(par.marshId).marshName + "; Сторона " + (par.side == 'out' ? 'внешняя' : 'внутренняя');
			specObj[partName]["type_comments"][name] += "; Проточки по бокам: " + prot;
		}
	}
	par.mesh.specId = partName + name;

	if (par.hasFixings) {
		var screwPar = {
			id: "screw_8x120",
			description: "Крепление поручней к столбу",
			group: "Ограждения",
			hasShim: true
		}
		var rackSize = 95;

		var screw = drawScrew(screwPar).mesh;
		screw.rotation.z = -Math.PI / 2;
		screw.position.x = p0.x - 60 + (120 - rackSize) - 0.5;
		screw.position.y = p0.y + startCutLen / 2;
		screw.position.z = rackSize / 2;
		if (!testingMode) par.mesh.add(screw);

		var plug = drawTimberPlug(25);
		plug.rotation.z = -Math.PI / 2;
		plug.position.x = p0.x - 60 - 60 + (120 - rackSize) - 1 - 0.5;
		plug.position.y = p0.y + startCutLen / 2;
		plug.position.z = rackSize / 2;
		if (!testingMode) par.mesh.add(plug);

		var screw = drawScrew(screwPar).mesh;
		screw.rotation.z = Math.PI / 2
		screw.position.x = p2.x + 60 - (120 - rackSize) + 0.5;
		screw.position.y = p2.y - endCutLen / 2;
		screw.position.z = rackSize / 2;
		if (!testingMode) par.mesh.add(screw);

		var plug = drawTimberPlug(25);
		plug.rotation.z = Math.PI / 2
		plug.position.x = p2.x + 120 - (120 - rackSize) + 1 + 0.5;
		plug.position.y = p2.y - endCutLen / 2;
		plug.position.z = rackSize / 2;
		if (!testingMode) par.mesh.add(plug);
	}

	//сохраняем данные для ведомости заготовок
	if (!par.sectText) par.sectText = "";
	if (typeof poleList != 'undefined') {
		var boardType = handrailPar.profY + "х" + handrailPar.profZ;
		if (par.type == "round") boardType = "Ф" + handrailPar.profY;

		if (handrailPar.mat == "metal") boardType += " черн.";
		if (handrailPar.mat == "inox") boardType += " нерж.";
		if (handrailPar.mat == "timber") boardType += " " + params.handrailsMaterial;


		//формируем массив, если такого еще не было
		if (!poleList[boardType]) poleList[boardType] = [];
		var polePar = {
			len1: Math.round(par.len),
			len2: Math.round(par.len2),
			angStart: Math.round((par.startAngle - Math.PI / 2) * 180 / Math.PI * 10) / 10,
			angEnd: Math.round((par.endAngle - Math.PI / 2) * 180 / Math.PI * 10) / 10,
			cutOffsetStart: Math.round(handrailPar.profY * Math.tan(par.startAngle - Math.PI / 2)),
			cutOffsetEnd: Math.round(handrailPar.profY * Math.tan(par.endAngle - Math.PI / 2)),
			poleProfileY: handrailPar.profY,
			poleProfileZ: handrailPar.profZ,
		}
		//пересчитываем углы
		if (startCutLen < 0) polePar.angStart = Math.round((polePar.angStart + 180) * 10) / 10;
		if (endCutLen < 0) angEnd += 180;
		//максимальная длина палки
		polePar.len3 = polePar.len1;
		if (polePar.cutOffsetStart < 0) polePar.len3 += -polePar.cutOffsetStart;
		if (polePar.cutOffsetEnd > 0) polePar.len3 += polePar.cutOffsetEnd;
		if (par.type == "round") {
			polePar = {
				len1: Math.round(par.len),
				len2: Math.round(par.len),
				len3: Math.round(par.len),
				angStart: 0,
				angEnd: 0,
				cutOffsetStart: 0,
				cutOffsetEnd: 0,
				poleProfileY: handrailPar.profY,
				poleProfileZ: handrailPar.profZ,
			}
		}

		if (par.startChamfer) polePar.startChamfer = par.startChamfer;
		if (par.endChamfer) polePar.endChamfer = par.endChamfer;

		polePar.text = par.sectText + " поручень";

		var text = "";

		var prot = 'нет';
		if (params.handrailSlots == 'да' && par.unit !== "balustrade") prot = 'есть';
		if (params.handrailSlots_bal == 'да' && par.unit == "balustrade") prot = 'есть';
		text = "Сторона " + (par.side == 'out' ? 'внешняя' : 'внутренняя');
		if (par.unit == "balustrade") specObj[partName]["type_comments"][name] = 'Баллюстрада'
		if (par.marshId) text = "Марш " + getMarshParams(par.marshId).marshName + "; Сторона " + (par.side == 'out' ? 'внешняя' : 'внутренняя');
		text += "; Проточки по бокам: " + prot;

		polePar.description = [];
		polePar.description.push(polePar.text + "; " + text);
		polePar.amt = 1;
		polePar.material = calcHandrailMeterParams({ handrailType: params.handrail }).mat;
		if (par.unit == 'balustrade') polePar.material = calcHandrailMeterParams({ handrailType: params.handrail_bal }).mat;

		var partIndex = poleList[boardType].push(polePar);
		polePar.partIndex = partIndex;
		if (shape.drawing) shape.drawing.partIndex = partIndex;
	}

	return par;
}//end of drawHandrail_4

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
					//connectionFlan.position.z = -connectionFlan.position.z -meterHandrailPar.profZ;
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