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


//----------------------------------------------------------

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
		if (par.drawing.isPointSvg) {
			shapePar.drawing.pointStartSvg = par.drawing.pointStartSvg;
			shapePar.drawing.pointCurrentSvg = par.drawing.pointCurrentSvg;
		}
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
			holesPar.holeRad = par.fixPar.diam / 2 + 1.5;
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
				fix.position.z = par.thk * (1 + turnFactor) * 0.5;
				fix.rotation.x = -Math.PI / 2 * turnFactor;
				par.mesh.add(fix);
			}
		}
	}

	return par;

}//end of drawRectFlan2