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
		material: railingMaterial,
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


	//добавляем подпись в dxf файл
	if (par.text) {
		var textHeight = 30;
		var textBasePoint = newPoint_xy(par.dxfBasePoint, 40, -200);
		addText(par.text, textHeight, par.dxfArr, textBasePoint);
	}

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