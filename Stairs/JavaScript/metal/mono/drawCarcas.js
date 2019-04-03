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

	par.material = new THREE.MeshLambertMaterial({ color: "#0000FF" });
	par.material = params.materials.bolt;
	par.dopParams = {};

	var thickness = params.stringerThickness;
	if (params.calcType == "mono") thickness = params.flanThickness;


	if (par.fixPart == 'химия') {
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
		if (typeof specObj != 'undefined' && par.partName) {
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

/*параметры крепления к стенам, нижнему и верхнему перекрытию*/
function getFixPart(marshId, wall = 'wall') {
	//наличие креплений к стене
	var fixPar = {
		fixType: 'нет',
		fixPart: 'нет',
		fixSpacer: 'нет',
		diam: 10,
		len: 100,
	}

	if (wall == 'wall') {
		//стена №1
		if (params.fixPart3 != "нет" && params.fixPart3 != "не указано") {
			var isWallFix = false;
			if (params.stairModel == "Прямая") isWallFix = true;
			if (params.stairModel != "Прямая" && marshId == 3) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType3;
				fixPar.fixPart = params.fixPart3;
				fixPar.fixSpacer = params.fixSpacer3;
				if (params.fixSpacerLength3) fixPar.fixSpacerLength = params.fixSpacerLength3;
			}
		}

		//стена №2
		if (params.fixPart4 != "нет" && params.fixPart4 != "не указано") {
			var isWallFix = false;
			if (params.stairModel == "Прямая") fixPar.out = true;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 3) isWallFix = true;
			if ((params.stairModel == "П-образная с забегом" ||
				params.stairModel == "П-образная с площадкой" ||
				params.stairModel == "П-образная трехмаршевая") &&
				marshId == 1) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType4;
				fixPar.fixPart = params.fixPart4;
				fixPar.fixSpacer = params.fixSpacer4;
				if (params.fixSpacerLength4) fixPar.fixSpacerLength = params.fixSpacerLength4;
			}
		}

		//стена №3
		if (params.fixPart5 != "нет" && params.fixPart5 != "не указано") {
			var isWallFix = false;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 1) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType5;
				fixPar.fixPart = params.fixPart5;
				fixPar.fixSpacer = params.fixSpacer5;
				if (params.fixSpacerLength5) fixPar.fixSpacerLength = params.fixSpacerLength5;
			}
		}

		//стена №4
		if (params.fixPart6 != "нет" && params.fixPart6 != "не указано") {
			var isWallFix = false;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 1) isWallFix = true;
			if ((params.stairModel == "П-образная с забегом" ||
				params.stairModel == "П-образная с площадкой" ||
				params.stairModel == "П-образная трехмаршевая") &&
				marshId == 2) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType6;
				fixPar.fixPart = params.fixPart6;
				fixPar.fixSpacer = params.fixSpacer6;
				if (params.fixSpacerLength6) fixPar.fixSpacerLength = params.fixSpacerLength6;
			}
		}
	}

	//нижнее перекрытие
	if (wall == 'botFloor') {
		if (params.fixPart1 != "нет" && params.fixPart1 != "не указано") {
			fixPar.fixType = params.fixType1;
			fixPar.fixPart = params.fixPart1;
			fixPar.fixSpacer = params.fixSpacer1;
			if (params.fixSpacerLength1) fixPar.fixSpacerLength = params.fixSpacerLength1;
		}
	}

	//верхнее перекрытие
	if (wall == 'topFloor') {
		if (params.fixPart2 != "нет" && params.fixPart2 != "не указано") {
			fixPar.fixType = params.fixType2;
			fixPar.fixPart = params.fixPart2;
			fixPar.fixSpacer = params.fixSpacer2;
			if (params.fixSpacerLength2) fixPar.fixSpacerLength = params.fixSpacerLength2;
		}
	}


	//определяем параметры крепления в зависимости от типа крепления и типа стены
	if (fixPar.fixPart == 'глухари') {
		if (params.model == "ко" && fixPar.fixType == 'дерево') {
			fixPar.diam = 12;
			fixPar.len = 200;
		}
	}

	if (fixPar.fixPart == 'шпилька насквозь') {
		if (fixPar.fixType == 'пеноблок' || ~fixPar.fixType.indexOf('кирпич')) {
			if (params.model == "лт") fixPar.diam = 12;
			if (params.model == "ко") fixPar.diam = 16;
		}
		fixPar.len = 300;
	}

	if (fixPar.fixPart == 'шпилька-шуруп') {
		fixPar.diam = 12;
	}

	if (fixPar.fixPart == 'саморезы') {
		fixPar.diam = 6;
		fixPar.len = 60;
	}


	//проставка
	if (fixPar.fixPart != "не указано" && fixPar.fixPart != "нет" &&
		fixPar.fixSpacer != "не указано" && fixPar.fixSpacer != "нет") {
		fixPar.isSpacer = true;
		fixPar.spacerWidt = 40;
		fixPar.spacerHeigth = 40;
		fixPar.spacerAmt = 1;

		if (fixPar.fixSpacer == "100х50") {
			fixPar.spacerWidt = 100;
			fixPar.spacerHeigth = 50;
		}
		if (fixPar.fixSpacer == "40х40 сдвоен.") {
			fixPar.spacerAmt = 2;
		}
	}

	return fixPar;
}


function drawRectFlan2(par) {

	par.mesh = new THREE.Object3D();

	var dxfArr = dxfPrimitivesArr;
	//если не задана базовая точка, в dxf контур не выводим
	if (!par.dxfBasePoint) {
		dxfArr = [];
		par.dxfBasePoint = { x: 0, y: 0, }
	}
	if (!par.thk) par.thk = 8;
	if (!par.material) par.material = params.materials.metal2

	var p1 = { x: 0, y: 0, };
	var p2 = newPoint_xy(p1, 0, par.height);
	var p3 = newPoint_xy(p2, par.width, 0);
	var p4 = newPoint_xy(p1, par.width, 0);

	var points = [p1, p2, p3, p4];

	//срезанный задний угол для пресснастила
	if (par.cutAngle) {
		var p5 = newPoint_xy(p1, 0, 30);
		points[0].x += 30;
		points.splice(1, 0, p5)
	}

	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfArr,
		dxfBasePoint: par.dxfBasePoint,
	}
	if (par.cornerRad) {
		shapePar.radOut = par.cornerRad;
		shapePar.radIn = par.cornerRad;
	}
	if (par.drawing) {
		shapePar.drawing = {
			name: par.drawing.name,
			group: par.drawing.group,
			marshId: par.drawing.marshId,
			basePoint: par.drawing.basePoint,
			location: par.drawing.location,
		}
		if (par.drawing.isRotate) shapePar.drawing.baseLine = { p1: p1, p2: p2 }
		if (par.drawing.isCount) shapePar.drawing.isCount = par.drawing.isCount;
	}

	par.shape = drawShapeByPoints2(shapePar).shape;

	if (par.pathHoles) par.shape.holes.push(...par.pathHoles);

	if (par.roundHoleCenters) {
		var holesPar = {
			holeArr: par.roundHoleCenters,
			dxfBasePoint: par.dxfBasePoint,
			shape: par.shape,
		}
		
		//если есть отверстия для крепления к стене, тогда их добавляем в шейп отдельно, чтобы можно было задать другой радиус
		if (par.fixPar) {
			var holes = [];
			var holesFix = [];
			for (var i = 0; i < par.roundHoleCenters.length; i++) {				
				if (par.roundHoleCenters[i].isFixPart)
					holesFix.push(par.roundHoleCenters[i]);
				else
					holes.push(par.roundHoleCenters[i]);
			}
			holesPar.holeArr = holesFix;
			holesPar.holeRad = par.fixPar.diam / 2 + 1;
			addHolesToShape(holesPar);

			holesPar.holeRad = "undefined";
			holesPar.holeArr = holes;
		}

		if (par.holeRad) holesPar.holeRad = par.holeRad;
		addHolesToShape(holesPar);
		
	}

	var extrudeOptions = {
		amount: par.thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(par.shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var flan = new THREE.Mesh(geom, par.material);
	par.mesh.add(flan);

	//болты в отверстиях

	if (typeof anglesHasBolts != "undefined" && anglesHasBolts && !par.noBolts) { //anglesHasBolts - глобальная переменная
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
		};
		if (par.roundHoleCenters) {
			for (var i = 0; i < par.roundHoleCenters.length; i++) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = par.roundHoleCenters[i].x;
				bolt.position.y = par.roundHoleCenters[i].y;
				bolt.position.z = boltPar.len / 2 - boltBulge;
				if (par.mirrowBolts) {
					bolt.rotation.x = -Math.PI / 2;
					bolt.position.z = -boltPar.len / 2 + boltBulge + par.thk;
				}
				par.mesh.add(bolt);
			}
		}
	}

	//болты крепления к верхнему перекрытию
	if (typeof isFixPats != "undefined" && isFixPats && par.fixPar) { //глобальная переменная
		if (par.fixPar.fixPart !== 'нет') {
			for (var i = 0; i < holesFix.length; i++) {
				var fix = drawFixPart(par.fixPar).mesh;
				fix.position.x = holesFix[i].x;
				fix.position.y = holesFix[i].y;
				fix.position.z = params.flanThickness * (1 + turnFactor) * 0.5;
				fix.rotation.x = -Math.PI / 2 * turnFactor;
				par.mesh.add(fix);
			}
		}
	}

	return par;

}//end of drawRectFlan2