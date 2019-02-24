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
			var center = { x: 0, y: par.holeYTurnRack - holeDist }
			addRoundHole(shape, par.dxfArr, center, 3, par.dxfBasePoint);
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
			boltPar.diam = 6;

			var bolt2 = drawBolt(boltPar).mesh;
			bolt2.rotation.x = bolt.rotation.x;
			bolt2.position.x = 0;
			bolt2.position.y = par.holeYTurnRack - holeDist;
			bolt2.position.z = bolt.position.z;
			bolts.add(bolt2)

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