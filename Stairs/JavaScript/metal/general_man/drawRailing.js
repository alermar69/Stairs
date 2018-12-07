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

	// ограждения второго марша
	if (params.stairModel == "П-образная трехмаршевая" || (params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная с площадкой") && !(params.railingModel == 'Деревянные балясины' || params.railingModel == 'Дерево с ковкой')) {
		par.dxfBasePoint.x = dxfX0;
		par.dxfBasePoint.y += 3000;

		marshId = 2;
		var railingObj = drawMarshRailing(par, marshId);
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

		if(railingObj.forgedParts) {
			var forge = railingObj.forgedParts;
			forge.position.x += basePltPoint.x;
			forge.position.y += basePltPoint.y;
			forge.position.z += basePltPoint.z;
			forge.rotation.y = basePltPoint.rot;
			par.forgedParts.add(forge);
		}
		if(railingObj.handrails) {
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

	if (params.calcType == 'timber') {
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

function drawMarshRailing(par, marshId) {

	var marshRailing = new THREE.Object3D();
	var forgedParts = new THREE.Object3D();
	var handrails = new THREE.Object3D();

	var marshParams = getMarshParams(marshId);
	var turnParams = calcTurnParams(marshId);

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
	}
	if (params.calcType == 'timber') {
		sideOffset = 0;//30;
	}

	//внутренняя сторона
	var hasRailing = false;
	if(marshParams.hasRailing.in) hasRailing = true;
	if(marshParams.hasTopPltRailing.in) hasRailing = true;
	//костыль для ограждения верхней площадки Прямой с промежуточной площадкой: там объединяются массивы для 1 и 3 марша и отрисовывается ограждение как будто только для первого марша
	if(params.stairModel == "Прямая с промежуточной площадкой"){
		if(getMarshParams(3).hasTopPltRailing.in) hasRailing = true;
		}
	
	if (marshId != "topPlt" && hasRailing) {

		//смещаем dxfBasePoint на длину нижнего участка
		par.dxfBasePoint.x += turnParams.turnLengthBot;
		sectionPar.dxfBasePoint = par.dxfBasePoint;

		sectionPar.key = "in";
		var sectionObj = drawRailingSection(sectionPar);
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
	if(marshParams.hasRailing.out) hasRailing = true;
	if(marshParams.hasTopPltRailing.out) hasRailing = true;
	//костыль для ограждения верхней площадки Прямой с промежуточной площадкой: там объединяются массивы для 1 и 3 марша и отрисовывается ограждение как будто только для первого марша
	if(params.stairModel == "Прямая с промежуточной площадкой"){
		if(getMarshParams(3).hasTopPltRailing.out) hasRailing = true;
		}
	
	if (marshId != "topPlt" && hasRailing) {
		sectionPar.key = "out";
		if (params.stairModel == "П-образная с забегом" && marshId == 2) sectionPar.isRearPRailing = true;

		var sectionObj = drawRailingSection(sectionPar);
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
	if (marshId == "topPlt" && params.topPltRailing_5 && params.platformRearStringer == 'есть') {
		sectionPar.key = "rear";
		var sectionObj = drawRailingSection(sectionPar);
		var section = sectionObj.mesh;
		section.position.y = mooveY;
		section.position.z = (- sideOffset) * turnFactor;
		if (params.platformTop == 'увеличенная' && turnFactor == 1 && params.stairModel == 'Прямая') {
			section.position.x = -(params.platformWidth_3 - params.M) - 5;
		}
		/*
		section.position.z = -(params.M / 2 + sectionPar.rackProfile - sideOffset) * turnFactor; //-(params.M / 2 + sectionPar.rackProfile) * turnFactor;
		if(params.stairModel == "Прямая") section.position.z = params.M / 2 * turnFactor;
		if (params.railingModel == "Самонесущее стекло"){
			section.position.z = -(params.M / 2 ) * turnFactor;
			if(params.stairModel == "Прямая") section.position.z = (params.M / 2 ) * turnFactor;
			}

		if(params.model == "лт") {
			if (params.railingModel == "Кованые балясины" || params.railingModel == "Самонесущее стекло") section.position.x -= 5;
			}
		*/
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
	}
	return result;

} //end of drawMarshRailing


function drawMarshRailing_timber(par) {
	var section = new THREE.Object3D();
	var handrails = new THREE.Object3D();

	var marshParams = getMarshParams(par.marshId);
	var turnParams = calcTurnParams(par.marshId);

	var stringerParams = {};
	if (params.calcType == 'timber') {
		var stringerParams = par.stringerParams[par.marshId].params[par.key];
	}
	if (params.calcType == "lt-ko") {
		var stringerParams = par.stringerParams[par.marshId];
	}
	if (params.calcType == 'mono') {
		var stringerParams = marshParams;
		stringerParams.dxfBasePoint = par.dxfBasePoint;
	}
	var railingSectionParams = {
		marshId: par.marshId,
		topEnd: marshParams.topTurn == 'пол' ? 'нет' : marshParams.topTurn,
		botEnd: marshParams.botTurn == 'пол' ? 'нет' : marshParams.botTurn,
		stringerParams: stringerParams,
		side: marshParams.side[par.key],
	}
	if (par.key == 'in') {
		railingSectionParams.topEnd = 'нет';
		railingSectionParams.botEnd = 'нет';
	}
	console.log(railingSectionParams)
	var railingSection = drawRailingSection_4(railingSectionParams).mesh;
	section.add(railingSection);

	//сохраняем данные для спецификации

	var handrailPoints = railingSectionParams.stringerParams.keyPoints;
	if (typeof railingParams != 'undefined') {
		if (!railingParams.sections) {
			railingParams.sections = {
				types: [],
				sumLen: 0,
			}
		}
		if (handrailPoints) {
			for(var i=1; i<handrailPoints.length; i++){
				var sectLen = distance(handrailPoints[i-1], handrailPoints[i]);
				railingParams.sections.types.push(sectLen);
				railingParams.sections.sumLen += sectLen / 1000;
				}
			}
		}

	var result = {
		mesh: section,
		handrails: handrails,
	}
	return result;
} //end of drawMarshRailing_timber

/* Функция отрисовки ограждения с ригелями и стеклом на стойках для metal, vhod и mono*/
function drawRailingSectionNewel2(par) {

	var section = new THREE.Object3D();
	var handrails = new THREE.Object3D();

	var rackLength = 950;
	par.rackLength = rackLength;
	var rackProfile = 40;
	par.rackProfile = rackProfile;
	var railingPositionZ = 0;
	if (turnFactor === -1) railingPositionZ = -40;
	if (params.calcType === 'lt-ko' || params.calcType === 'vhod') {
		//адаптация к единой функции drawMarshRailing

		par.racks = [];
		if (par.stringerParams && par.stringerParams[par.marshId].elmIns[par.key]) par.racks = par.stringerParams[par.marshId].elmIns[par.key].racks
		//объединяем массивы первого и третьего марша
		if ((params.stairModel == "Прямая с промежуточной площадкой" || params.stairModel == 'Прямая горка') && par.marshId !== 'topPlt') {
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
		if (params.stairModel == 'Прямая горка' && par.marshId !== 'topPlt') {
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
		setRailingParams(par) //функция в файле calcRailingParams.js
		if (par.racks.length == 0) return section;

		//задаем параметры
		{
			var railingSide = par.railingSide;
			if (!par.railingSide && params.model == "ко" && par.marshId == 'topPlt')
				railingSide = "right";
			var dxfBasePoint = par.dxfBasePoint;
			var racks = par.racks;
			var model = params.model;

			//параметры марша
			var marshPar = getMarshParams(par.marshId);

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
				material: params.materials.metal,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, racks[i].x, racks[i].y),
				dxfArr: dxfPrimitivesArr,
				realHolder: true, //точно отрисовываем кронштейн поручня
				holderAng: racks[i].holderAng,
				sectText: par.text,
			}
			if (params.rackBottom == "сверху с крышкой") {
				rackParams.showPins = false;
				rackParams.showHoles = false;
				rackParams.isBotFlan = true;
			}
			if (params.banisterMaterial != "40х40 черн.") rackParams.material = params.materials.inox;

			rackParams = drawRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = racks[i].x;
			rack.position.y = racks[i].y;
			rack.position.z = railingPositionZ;
			section.add(rack);

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
		if (params.calcType === 'lt-ko' || params.calcType === 'vhod') {
			var rigelBasePoints = [];
			if (parRacks.marsh1First) rigelBasePoints.push(copyPoint(parRacks.marsh1First));
			if (parRacks.botFirst) rigelBasePoints.push(copyPoint(parRacks.botFirst));
			if (parRacks.marshFirst) rigelBasePoints.push(copyPoint(parRacks.marshFirst));
			if (parRacks.marshLast) {
				rigelBasePoints.push(copyPoint(parRacks.marshLast));
				if (params.model == "ко" && par.lastMarsh && params.platformTop == "нет") {
					rigelBasePoints[rigelBasePoints.length - 1].y += calcLastRackDeltaY();
				}
			}
			if (parRacks.topLast) rigelBasePoints.push(copyPoint(parRacks.topLast));
			if (parRacks.marsh2Last) rigelBasePoints.push(copyPoint(parRacks.marsh2Last));
		}
		if (params.calcType === 'mono') {
			var rigelBasePoints = calcRigelPoints(par, parRacks);
		}


		var rigelPar = {
			points: rigelBasePoints,
			botEnd: par.botEnd,
			dxfBasePoint: copyPoint(par.dxfBasePoint),
			sectText: par.text,
		}

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
		if (railingSide === "right") side = "in";

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
		}

		//удлиннение поручня последнего марша
		if (params.stairModel == "Прямая" || par.marshId == 3) {
			handrailParams.extraLengthEnd += params.topHandrailExtraLength;
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



	if (params.model == 'лт') {
		section.position.x = -5;
	}

	var result = {
		mesh: section,
		handrails: handrails,
	}
	return result;

} //end of drawRailingSectionNewel


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

	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
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
				var point = newPoint_xy(points[i], -offset, 0)
			}
			//если последний участок наклонный
			if (points[i - 1].x != points[i].x) {
				var handrailAngle = angle(points[i - 1], points[i])
				var point = newPoint_xy(points[i], 0, -offset / Math.cos(handrailAngle))
				//удлиннение поручня за конечную точку
				point = polar(point, handrailAngle, par.extraLengthEnd)
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
				if (par.connection == "без зазора") length -= meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle)
			}


			if (meterHandrailPar.handrailModel == "round") {
				length = distance(p1, p2);
				//укорачиваем поручень чтобы он не врезался в стойку верхнего марша
				var key = par.key;
				if (params.stairModel == "Прямая" || params.stairModel == "Прямая с промежуточной площадкой") {
					if (par.key == "in") key = "out";
					if (par.key == "out") key = "in";
				}

				if (!marshPar.lastMarsh && key == "in") length -= meterHandrailPar.profY * Math.tan(handrailAngle)
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
					rad: endOffset,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, p2.x, p2.y)
				}
				var sphere = drawHandrailJoint(jointParams);
				sphere.position.x = p2.x;
				sphere.position.y = p2.y;
				sphere.position.z = endOffset + 20;
				if (side == "in") sphere.position.z = -endOffset - 30;
				par.mesh.add(sphere);

				//Шарнир на конце если есть соединение со следующим участком
				if (par.topConnection && i == points.length - 3) {
					jointParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, p3.x, p3.y)
					var sphere = drawHandrailJoint(jointParams);
					sphere.position.x = p3.x;
					sphere.position.y = p3.y;
					sphere.position.z = endOffset + 20;
					if (side == "in") sphere.position.z = -endOffset - 30;
					par.mesh.add(sphere);

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


function drawPolylineRigel(par) {

	var dxfBasePoint = par.dxfBasePoint;
	var side = par.side;

	par.mesh = new THREE.Object3D();

	if (!par.points) return par;

	var points = par.points;
	var offset = par.offset;

	//зазор между торцами ригелей при соединении шарниром
	var endOffset = 0;
	if (par.connection != "без зазора") endOffset = 7;

	//задаем параметры ригелей
	rigelParams = {
		type: "rect",
		poleProfileY: 20,
		poleProfileZ: 20,
		length: 0, //пересчитывается в цикле
		poleAngle: 0, //пересчитывается в цикле
		material: params.materials.metal,
		dxfArr: dxfPrimitivesArr,
		partName: "rigels",
		dxfBasePoint: par.dxfBasePoint,
		angDxf: true,
		sectText: par.sectText,
	};

	if (params.rigelMaterial === "Ф12 нерж.") {
		rigelParams.type = "round";
		rigelParams.poleProfileY = 12;
		rigelParams.poleProfileZ = 12;
		rigelParams.material = params.materials.inox;
	}
	if (params.rigelMaterial === "Ф16 нерж.") {
		rigelParams.type = "round";
		rigelParams.poleProfileY = 16;
		rigelParams.poleProfileZ = 16;
		rigelParams.material = params.materials.inox;
	}

	//выпуск ригеля за ось стойки по X
	var extraLenEnd = 50;
	var extraLenMid = 20;
	if (rigelParams.type == "round") extraLenMid = 70; //отступ чтобы шарнир не попал на стойку

	//сортируем массив points в порядке возрастания координаты x
	par.points.sort(function (a, b) {
		return a.x - b.x;
	});

	var lastPoint = copyPoint(par.points[0])
	for (var i = 0; i < par.points.length - 1; i++) {
		var p1 = copyPoint(lastPoint);
		var p2 = copyPoint(par.points[i + 1]);
		var ang = angle(p1, p2);
		if (p1.ang) ang = p1.ang;

		if (rigelParams.type != "round") {
			//продлеваем ригель в обе стороны
			if (i == 0) p1 = polar(p1, ang, -extraLenEnd);
			else p1 = polar(p1, ang, -extraLenMid);
			if (i < par.points.length - 2) p2 = polar(p2, ang, extraLenMid);
			else p2 = polar(p2, ang, extraLenEnd);

			//пересчитываем базовые точки для нечетных участков чтобы избежать пересечения
			if (i % 2 == 1) {
				var deltaY = par.points[i].y - p1.y + rigelParams.poleProfileY / Math.cos(ang);
				deltaY += rigelParams.poleProfileY / Math.cos(angle(par.points[i - 1], par.points[i]));
				p1.y += deltaY;
				p2.y += deltaY;

			}
			lastPoint = copyPoint(par.points[i + 1])
		}
		if (rigelParams.type == "round") {

			if (i == 0) p1 = polar(p1, ang, -extraLenEnd);
			//переносим конечную точку так, чтобы шарнир не попал на стойку
			if (i < par.points.length - 2) {
				p2 = polar(p2, ang, -extraLenMid);
				p2.y = par.points[i + 1].y; //если следующий участок горизонтальный, он должен таким и остаться
			}
			else p2 = polar(p2, ang, extraLenEnd);

			lastPoint = copyPoint(p2)
		}

		rigelParams.length = distance(p1, p2) - 10; //10 - размер шарнира
		rigelParams.poleAngle = angle(p1, p2);;
		rigelParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, p1.x, p1.y);

		var rigel = drawPole3D_4(rigelParams).mesh;
		rigel.position.x = p1.x;
		rigel.position.y = p1.y;
		par.mesh.add(rigel);

		//шарниры ригелей
		if (rigelParams.type == "round") {
		}


	}

	// par.meterHandrailPar = meterHandrailPar;

	return par;
} //end of drawPolylineRigel

/* функция отрисовки секции с коваными балясинами */
function drawRailingSectionForge2(par) {
	var section = new THREE.Object3D();
	var forgedParts = new THREE.Object3D();
	var handrails = new THREE.Object3D();
	var marshPar = getMarshParams(par.marshId);
	var sectionLen = 0; //параметр для спецификации

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
				var angMarsh = calcAngleX1(newP, parRacks.marshLast);
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
			}
		}

		parRacks.angMarsh = angle(topPoint2, topPoint3)
		//parRacks.angMarsh = marshPar.ang;
		parRacks.marshLen = distance(topPoint2, topPoint3)

		rackPar.angTop = parRacks.angMarsh;

		//первая стойка
		if (!parRacks.botFirst) {
			pos.x = parRacks.marshFirst.x;
			pos.y = parRacks.marshFirst.y - 90;
			rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
			if (params.calcType == 'mono') {
				rackPar.monoType = parRacks.marshFirst.type;
			}
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
				var rack = drawForgedFramePart2(rackPar).mesh;
				rack.position.x = pos.x;
				rack.position.z = railingPositionZ;
				rack.position.y = pos.y + deltaY;
				section.add(rack);

			}
		}
		var rackLength2 = rackPar.len2;


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
			rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
			if (params.calcType == 'mono') {
				rackPar.monoType = parRacks.marshLast.type;
			}
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
			y: parRacks.marsh2Last.y - 90 + rackPar.len2 + 20 / Math.cos(parRacks.angMarsh2),
		}

		parRacks.angMarsh2 = angle(topPoint4, topPoint5)
		parRacks.marshLen = distance(topPoint4, topPoint5)

		rackPar.angTop = parRacks.angMarsh2;
		//последняя стойка
		pos.x = parRacks.marsh2Last.x;
		pos.y = parRacks.marsh2Last.y - 90;
		rackPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
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
		for(var i=1; i<handrailPoints.length; i++){
			var sectLen = distance(handrailPoints[i-1], handrailPoints[i]);
			railingParams.sections.types.push(sectLen);
			railingParams.sections.sumLen += sectLen / 1000;
			}
		}

	return result;

} // end of drawRailingSectionForge2



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
		var p0 = {x: 0, y: 0};
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

		if (params.calcType == 'mono') {
			p0.y += 90; //костыль для совместимости с лт
			var botLen = 0;
			var stepH = par.stepH;
			var nextStepH = par.nextStepH;
			var holeDiam = 6;
			var bottomHoleOffset = 20;
			var banisterAngleOffset = 16;

			var angleParams = {
				material: par.material,
				dxfArr: []
				}

			//расчет длины нижней части стойки (ниже уровня ступени)
			var botLen = marshPar.h; //длина от верха ступени до низа стойки
			if(par.monoType == 'middle') botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
			if(par.monoType == 'last') botLen = params.treadThickness + bottomHoleOffset + banisterAngleOffset;
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
			var p3 = newPoint_xy(p0, par.poleProfileY / 2, -botLen);
			var p4 = newPoint_xy(p3, -par.poleProfileY, 0);
			points.push(p3, p4);

			//отверстия под уголки

			//верхнее отверстие
			var center1 = newPoint_xy(p0, 0, -params.treadThickness - banisterAngleOffset);
			holeCenters.push(center1)
			//нижнее отверстие
			if(par.monoType == 'middle'){
				var center2 = newPoint_xy(center1, 0, -marshPar.h);
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
			if(par.type == 'first'){
				var flanPar = {
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
					}
				var botFlan =  drawPlatformRailingFlan(flanPar).mesh;
				botFlan.position.z = rackProfile / 2;
				botFlan.position.y = p3.y;
				par.mesh.add(botFlan);
				}
		}

		//стойки лт и ко

		if (params.calcType == 'lt-ko' || params.calcType == 'vhod') {
			var p3 = newPoint_xy(p0, par.poleProfileY / 2, 0);
			var p4 = newPoint_xy(p3, -par.poleProfileY, 0);
			points.push(p3, p4);

			var holeDiam = 13;
			var holeDist = 60;

			//отверстия для бокового крепления

			if(params.rackBottom == "боковое"){
				//верхнее отверстие
				var center = {x: 0, y: 90,}
				//нижнее отверстие
				var center2 = newPoint_xy(center, 0, -holeDist)
				holeCenters.push(center, center2)


				//болты

				if(typeof anglesHasBolts != "undefined" && anglesHasBolts){ //anglesHasBolts - глобальная переменная
					var boltPar = {
						diam: boltDiam,
						len: boltLen,
						}
					var bolt = drawBolt(boltPar).mesh;
					bolt.rotation.x = Math.PI / 2;
					bolt.position.x = 0;
					bolt.position.y = 90;
					bolt.position.z = boltLen / 2 - boltBulge;
					if(par.railingSide == "left") bolt.position.z = 40 - boltLen / 2 + boltBulge;

					par.mesh.add(bolt)

					var bolt2 = drawBolt(boltPar).mesh;
					bolt2.rotation.x = Math.PI / 2;
					bolt2.position.x = 0;
					bolt2.position.y = 90 - holeDist;
					bolt2.position.z = bolt.position.z;
					par.mesh.add(bolt2)
				}

				//кронштейн из пластин для КО
				if(params.model == "ко" && params.rackBottom == "боковое" && !par.isBotFlan){
					var holderPar = {
						railingSide: par.railingSide,
						dxfBasePoint: par.dxfBasePoint,
						material: params.materials.metal2,
					}
					var holder = drawRackHolder(holderPar).mesh;
					holder.position.y = 20;
					if(par.railingSide == "right" || par.marshId == "topPlt") holder.position.z = 40;
					par.mesh.add(holder);
				}
			}

			//фланец балясины

			if(params.rackBottom == "сверху с крышкой"){
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
		}

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

/** Функция отрисовывает стекло
ссылка на чертеж 6692035.ru/drawings/railing/drawGlass2.pdf

*@params angleTop, heightLeft, width, thk
*@params angleBot, botCutHeight, topCutHeight, holeCenters - не обязательные
*@params dxfBasePoint - если не указан, то в dxf не выводится

*@returns par.mesh
*/

function drawGlass2(par){

	par.dxfArr = dxfPrimitivesArr;
	if(!par.dxfBasePoint) {
		par.dxfBasePoint = {x: 0, y:0,};
		par.dxfArr = [];
		}

	//необязательные параметры
	if(!par.angleBot) par.angleBot = par.angleTop;
	if(!par.botCutHeight) par.botCutHeight = 0;
	if(!par.topCutHeight) par.topCutHeight = 0;
	if(!par.holeCenters) par.holeCenters = [];


    var extrudeOptions = {
        amount: par.thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};

	//четырехугольник без срезов
	var p1 = {x: 0, y: 0};
	var p2 = newPoint_xy(p1, 0, par.heightLeft);
	var p3 = newPoint_x1(p2, par.width, par.angleTop);
	var p4 = newPoint_x1(p1, par.width, par.angleBot);


	//срез снизу
	var botY = p1.y;
	if(par.botCutHeight != 0) {
		var p11 = newPoint_y(p1,  par.botCutHeight, par.angleBot);
		var p12 = newPoint_xy(p1, 0, par.botCutHeight);
		botY = p12.y;
		}

	//срез сверху
	var topY = p3.y;
	if(par.topCutHeight != 0) {
		var p31 = newPoint_y(p1,  -par.topCutHeight, par.angleTop);
		var p32 = newPoint_xy(p3, 0, -par.topCutHeight);
		topY = p32.y;
		}

	var shape = new THREE.Shape();

	//начинаем с 4 точки
	if(par.botCutHeight == 0){
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
		}
	if(par.botCutHeight != 0){
		addLine(shape, par.dxfArr, p4, p11, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p11, p12, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p12, p2, par.dxfBasePoint);
		}

	//начинаем с 2 точки
	if(par.topCutHeight == 0){
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
		}
	if(par.topCutHeight != 0){
		addLine(shape, par.dxfArr, p2, p31, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p31, p32, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p32, p4, par.dxfBasePoint);
		}


	//длина стекла справа (для расчета длины слева следующего стекла)
	par.heightRight = p3.y - p4.y;

	//базовые точки для поручней
	par.p1 = copyPoint(p2);
	par.p2 = copyPoint(p3);

	//отверстия стекла
	for(var i = 0; i < par.holeCenters.length; ++i){
		addRoundHole(shape, dxfPrimitivesArr, par.holeCenters[i], par.holeCenters[i].rad, par.dxfBasePoint);
	}

	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var glass = new THREE.Mesh(geometry, params.materials.glass);

	par.mesh = glass;

	//сохраняем данные для спецификации
	var glassHeight2 = topY - botY;
	var partName = "glasses";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				sumArea: 0,
				name: "Стекло",
				metalPaint: false,
				timberPaint: false,
				division: "stock_2",
				workUnitName: "amt",
				group: "Ограждения",
				}
			}
		var name = Math.round(par.width) + "x" + Math.round(glassHeight2);
		var area = Math.round(par.width * glassHeight2 / 10000)/100;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumArea"] += area;
		}

	return par;
} //end of drawGlass2

/** функция отрисовывает стекло для ограждений на стойках
*/

function drawGlassNewell(par) {
    var p1 = par.p1;
    var p2 = par.p2;
		var angle = calcAngleX1(p1, p2)
		//if(par.isHandrailAngle) angle = par.angle;
    var glassDist = par.glassDist;
    var glassHeight = par.glassHeight;
    var dxfBasePoint = par.dxfBasePoint;

    var obj = new THREE.Object3D();

    var glassWidth = p2.x - p1.x - glassDist*2;
    yOffset = Math.tan(angle) * glassWidth;
    var glassShape = new THREE.Shape();

    var pg1 = newPoint_xy(p1, glassDist, 0);
    var pg2 = newPoint_xy(p1, glassDist, glassHeight);

    var pt1 = newPoint_xy(p2, -glassDist, 0);
    var pg3 = itercection(pg1, polar(pg1, angle, 100.0), pt1, polar(pt1, Math.PI / 2, 100.0));
    var pg4 = itercection(pg2, polar(pg2, angle, 100.0), pt1, polar(pt1, Math.PI / 2, 100.0));

    addLine(glassShape, dxfPrimitivesArr, pg1, pg2, dxfBasePoint);
    addLine(glassShape, dxfPrimitivesArr, pg2, pg4, dxfBasePoint);
    addLine(glassShape, dxfPrimitivesArr, pg4, pg3, dxfBasePoint);
    addLine(glassShape, dxfPrimitivesArr, pg3, pg1, dxfBasePoint);

	var extrudeOptions = {
        amount: 8,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};


	par.glassMaterial = params.materials.glass;
	if (params.railingModel == "Экраны лазер") par.glassMaterial = params.materials.metal;

    var geom = new THREE.ExtrudeGeometry(glassShape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var glass = new THREE.Mesh(geom, par.glassMaterial);
    obj.add(glass);

    //стеклодержатели--------------------------------------
    var offsetX = pg1.x - 22; //45;
    var offsetY = pg1.y + 100;
    var dxfBasePoint_h = newPoint_xy(dxfBasePoint, offsetX, offsetY);

    var glassHolderParams = {
        dxfBasePoint: dxfBasePoint_h,
        dxfArr: dxfPrimitivesArr,
        material: par.glassHolderMaterial,
        turn: 1,
			}
    var glassHolder = drawGlassHolder1(glassHolderParams).mesh;
    glassHolder.position.z = -16 + 10;
    glassHolder.position.x = offsetX;
    glassHolder.position.y = offsetY;
    obj.add(glassHolder);

    //----------------------
    offsetX = pg2.x - 22;
    offsetY = pg2.y - 140;
    glassHolderParams.dxfBasePoint = newPoint_xy(dxfBasePoint, offsetX, offsetY);
    var glassHolder = drawGlassHolder1(glassHolderParams).mesh;
    glassHolder.position.z = -16 + 10;
    glassHolder.position.x = offsetX;
    glassHolder.position.y = offsetY;
    obj.add(glassHolder);
    //----------------------
    offsetX = pg3.x + 22;
    offsetY = pg3.y + 100;
    glassHolderParams.dxfBasePoint = newPoint_xy(dxfBasePoint, offsetX, offsetY);
    glassHolderParams.turn = -1;
    var glassHolder = drawGlassHolder1(glassHolderParams).mesh;
    glassHolder.position.z = -16+10;
    glassHolder.position.x = offsetX;
    glassHolder.position.y = offsetY;
    obj.add(glassHolder);
    //----------------------
    offsetX = pg4.x + 22;
    offsetY = pg4.y - 140;
    glassHolderParams.dxfBasePoint = newPoint_xy(dxfBasePoint, offsetX, offsetY);
    var glassHolder = drawGlassHolder1(glassHolderParams).mesh;
    glassHolder.position.z = -6;
    glassHolder.position.x = offsetX;
    glassHolder.position.y = offsetY;
    obj.add(glassHolder);
    //----------------------

    par.mesh = obj;


	//сохраняем данные для спецификации
	var sizeHor = pg4.x - pg1.x;
	var sizeVert = pg4.y - pg1.y;
	var partName = "glasses";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				sumArea: 0,
				name: "Стекло",
				metalPaint: false,
				timberPaint: false,
				division: "stock_2",
				workUnitName: "amt",
				group: "Ограждения",
				}
			}
		var name = Math.round(sizeHor) + "x" + Math.round(sizeVert);
		var area = Math.round(sizeHor * sizeVert / 10000)/100;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumArea"] += area;
		}

    return par;
}

//зажимной стеклодержатель

function drawGlassHolder1(par) {
		var glassHolder = new THREE.Object3D();
		var glassThickness = 8;
		var glassOffset = 20;
    par.thk = 20;
    par.height = 40;
    par.width = 50 * par.turn;
    par.rad = par.height / 2;
    par.radOffset = par.width  - par.rad * par.turn;

    var shape = new THREE.Shape();
    var p0 = { "x": 0.0, "y": 0.0 };
    var p1 = newPoint_xy(p0, 0.0, par.height);
    var p2 = newPoint_xy(p1, par.radOffset, 0.0);
    var p3 = newPoint_xy(p0, par.radOffset, 0);
    var center = newPoint_xy(p0, par.radOffset, par.rad);

    addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);

    if (par.turn === 1)
        addArc(shape, par.dxfArr, center, par.rad, Math.PI / 2, -Math.PI / 2, par.dxfBasePoint);
    else
        addArc(shape, par.dxfArr, center, par.rad, Math.PI / 2, Math.PI * 3 / 2, par.dxfBasePoint);

		var arcPartThickness = (par.thk - glassThickness) / 2;

    var extrudeOptions = {
        amount: arcPartThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};

    geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var halfHolderPart = new THREE.Mesh(geometry, params.materials.metal2);
		glassHolder.add(halfHolderPart);

    var halfHolderPart = new THREE.Mesh(geometry, params.materials.metal2);
		halfHolderPart.position.z = glassThickness + arcPartThickness;
		glassHolder.add(halfHolderPart);

		var p1 = newPoint_xy(p0, 0.0, par.height);
		var p2 = newPoint_xy(p1, glassOffset * par.turn, 0);
		var p3 = newPoint_xy(p2, 0.0, -par.height);

		var shape = new THREE.Shape();

		addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);

		extrudeOptions.amount = glassThickness;
		geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var centerHolderPart = new THREE.Mesh(geometry, params.materials.metal2);
		centerHolderPart.position.z = arcPartThickness;
		glassHolder.add(centerHolderPart);

		var partName = "glassHolder";
		if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Стеклодержатель зажимной ",
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Ограждения",
				}
			}
		var name = "8мм";
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		}

    par.mesh = glassHolder;
    return par;
} // end of drawGlassHolder1

/** функция задает удлиннение последней стойки верхнего марша
*/

function calcLastRackDeltaY() {
	var marshParams = getMarshParams(3);
	if (params.stairModel == 'Прямая') marshParams = getMarshParams(1);

	var dyLastRack = 0;
	if (params.platformTop == "нет") {
		if (params.model == "лт") {
			if (params.topAnglePosition == "под ступенью" ||
				params.topAnglePosition == "рамка верхней ступени") {
				dyLastRack = 25;
				if (params.stairType == "дпк") {
					dyLastRack = (marshParams.a - 80 - marshParams.b / 2) * Math.tan(marshParams.ang);
				}
			}
		}
		if (params.model == "ко") {
			var dyLastRack = 50;
			if (params.topAnglePosition == "вертикальная рамка") dyLastRack = 100;
		}
	}
	if (params.calcType == 'mono') {
		dyLastRack = (marshParams.a - 50 - 95) * Math.tan(marshParams.ang);
	}
	if (params.rackBottom == "сверху с крышкой") dyLastRack = 0;
	if (params.stairModel == 'Прямая горка' && params.calcType == 'vhod') dyLastRack = 0;
	return dyLastRack;
}
