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

        if (params.calcType == 'mono') {
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
            if (par.monoType != 'last') {
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
            if (par.monoType == 'first') {
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

        if (params.calcType == 'lt-ko' || params.calcType == 'vhod') {
            var p3 = newPoint_xy(p0, par.poleProfileY / 2, 0);
            var p4 = newPoint_xy(p3, -par.poleProfileY, 0);
            points.push(p3, p4);

            var holeDiam = 13;
            var holeDist = 60;

            //отверстия для бокового крепления

            if (params.rackBottom == "боковое") {
                //верхнее отверстие
                var center = { x: 0, y: 90, }
                //нижнее отверстие
                var center2 = newPoint_xy(center, 0, -holeDist)
                holeCenters.push(center, center2)


                //болты

                if (typeof anglesHasBolts != "undefined" && anglesHasBolts) { //anglesHasBolts - глобальная переменная
                    var boltPar = {
                        diam: boltDiam,
                        len: boltLen,
                    }
                    var bolt = drawBolt(boltPar).mesh;
                    bolt.rotation.x = Math.PI / 2;
                    bolt.position.x = 0;
                    bolt.position.y = 90;
                    bolt.position.z = boltLen / 2 - boltBulge;
                    if (par.railingSide == "left") bolt.position.z = 40 - boltLen / 2 + boltBulge;

                    par.mesh.add(bolt)

                    var bolt2 = drawBolt(boltPar).mesh;
                    bolt2.rotation.x = Math.PI / 2;
                    bolt2.position.x = 0;
                    bolt2.position.y = 90 - holeDist;
                    bolt2.position.z = bolt.position.z;
                    par.mesh.add(bolt2)
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
                    par.mesh.add(holder);
                }
            }

            //фланец балясины

            if (params.rackBottom == "сверху с крышкой") {
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