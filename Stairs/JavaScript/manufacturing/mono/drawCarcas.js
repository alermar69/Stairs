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

//-----------------------------------------------------------------

function drawSVGForgedRailing(par) {
	var railingShapes = par.shapes;
	var draw = par.draw;

	if (railingShapes.length > 0) {
		var sets = [];
		$.each(railingShapes, function () {
			var shape = this;
			var par = this.drawing;
			var mirror = isMirrored(par.key);
			//Отрисовка секции
			{
				var set = sets.find(s => s.marshId == par.marshId && s.key == par.key);
				if (!set) {
					set = draw.set();
					set.marshId = par.marshId;
					set.key = par.key;
					//Кованные ограждения сверлятся сверху.
					set.listText = "Марш " + par.marshId + " Сторона " + (par.key == 'out' ? 'внешняя' : 'внутренняя') + ' (сверлить сверху)';
					if (params.orderName) set.listText = params.orderName + "\n" + set.listText;
					sets.push(set);
				}
				var elementBasePoint = { x: 0, y: 0 };

				if (par.elemType !== 'banister') {
					var obj = makeSvgFromShape(shape, draw);
				}
				if (par.elemType == 'banister') {
					var svgPath = $("#forgeModal .modalItem[data-itemName=" + par.banisterType + "]").find("path").eq(0).attr("d");
					var obj = draw.path(svgPath);
				}
				if (mirror) {
					obj.transform("S-1,1");
					par.pos.x *= -1;
				}
				obj.setClass("railing");//Устанавливаем класс

				if (par.elemType !== 'pole' && par.elemType !== 'banister') {
					elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x, par.pos.y);
				} else if (par.elemType == 'banister') {//Тк центр смещен в середину стойки
					var poleSize = 12;
					if (par.banisterType == '20х20') poleSize = 20;
					var b = obj.getBBox();

					var deltaY = par.balLen - b.height;//Высота штырька

					//Подогнано нужно потестить, но вроде ок
					// elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x - poleSize / 2, par.pos.y + b.height + deltaY);
					elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x - b.width / 2 + poleSize + poleSize / 2, par.pos.y + deltaY + 297);
					//Удлинняем балясину снизу
					if (deltaY > 0) {
						var rect = drawRect({ x: 0, y: 0 }, poleSize, deltaY, draw).attr({
							fill: "none",
							stroke: "#000",
							"stroke-width": 1,
						});
						rect.setClass("other");
						moove(rect, { x: elementBasePoint.x + b.width / 2 - poleSize / 2, y: par.pos.y + deltaY }, 'left_bot');
						set.push(rect);
					}
				} else {
					elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x + 20/*profile/2*/, par.pos.y);
				}

				if (par.elemType == 'pole' && mirror) {
					var b = obj.getBBox();
					elementBasePoint = newPoint_xy(elementBasePoint, -b.width, b.height);
					moove(obj, elementBasePoint);
				} else if (par.elemType == 'banister') {
					moove(obj, elementBasePoint, 'left_bot');
				} else {
					moove(obj, elementBasePoint, 'left_bot');
				}

				//Если есть свойство listText добавляем текст
				if (par.partIndex) {
					var objBbox = obj.getBBox()
					var text = getIdByPoleIndex(par.partIndex);

					//подпись
					var detailedTextPar = {
						draw: draw,
						center: { x: objBbox.cx, y: objBbox.cy * -1 },
						text: text + " ",
						side: 'left',
						lineWidth: 2,
						textHeight: 30 * dimScale,
						offset: 50,
					}
					if (mirror) detailedTextPar.side = 'right';
					var text = drawDetailText(detailedTextPar);
					set.push(text);
				}

				var dimSet = null;
				//Размеры
				if (par.elemType !== 'pole' && par.elemType !== 'banister') {
					// var dimPar = {
					// 	obj: obj,
					// 	draw: draw,
					// }
					// dimSet = drawDimensions(dimPar).set;
					// dimSet.setClass("dimensions");
				}

				//Диагональный размер 
				if (par.elemType == 'pole') {
					var poleBox = obj.getBBox();
					var cutLen = 20 / Math.cos(par.ang);
					var p1 = { x: poleBox.x, y: poleBox.y + poleBox.height - cutLen };
					var p2 = { x: poleBox.x2, y: poleBox.y2 - poleBox.height };
					if (mirror) {
						p1 = { x: poleBox.x2, y: poleBox.y2 - cutLen };
						p2 = { x: poleBox.x, y: poleBox.y };
					}

					/* разворачиваем иначе размеры не там где нужно */
					p1.y *= -1;
					p2.y *= -1;

					//Сохраняем точки начала и конца, в дальнейшем пригодятся для размеров балясин
					par.startPoint = p1;
					par.endPoint = p2;

					// //горизонтальный размер
					// var dimPar = {
					// 	type: "dist",
					// 	p1: p1,
					// 	p2: p2,
					// 	offset: 100,
					// 	side: "top",
					// 	draw: draw,
					// }

					// if (par.place == 'bot') {
					// 	dimPar.side = 'bot';
					// 	dimPar.offset = 200;
					// }

					// dimSet = drawDim(dimPar);
					// dimSet.setClass("dimensions");

					if (par.place == 'top') {
						var center = { x: p1.x, y: p1.y - cutLen };
						var offset = 80;
						if (!mirror) {
							if (par.place == 'top' && !(getMarshParams(par.marshId).botTurn !== 'пол' && par.key == 'out' && par.poleId == 1)) center = newPoint_xy(center, 40, 40 * Math.tan(par.ang));
							var p1 = polar(center, par.ang, offset);
							var p2 = newPoint_xy(center, 0, -offset);
						}

						if (mirror) {
							if (par.place == 'top' && !(getMarshParams(par.marshId).botTurn !== 'пол' && par.key == 'out' && par.poleId == 1)) center = newPoint_xy(center, -40, 40 * Math.tan(par.ang));
							var p1 = newPoint_xy(center, 0, -offset);
							var p2 = polar(center, -par.ang, -offset);
						}
						var anglePar = {
							draw: draw,
							center: center,
							p1: p1,
							p2: p2,
							offset: offset,
						}

						var angleDim = drawAngleDim2(anglePar);
						if (angleDim) set.push(angleDim);
					}

					if (par.place == 'bot') {
						var center = { x: p1.x, y: p1.y };
						var offset = 80;
						if (!mirror) {
							var p1 = newPoint_xy(center, 0, offset);
							var p2 = polar(center, par.ang, offset);
						}

						if (mirror) {
							var p1 = polar(center, -par.ang, -offset);
							var p2 = newPoint_xy(center, -0.01, offset);
						}
						var anglePar = {
							draw: draw,
							center: center,
							p1: p1,
							p2: p2,
							offset: offset,
						}

						var angleDim = drawAngleDim2(anglePar);
						if (angleDim) set.push(angleDim);
					}
				}

				if (par.elemType == 'rack' && shape.holes.length > 0) {
					var rackPar = {
						draw: draw,
						shape: shape,
						obj: obj,
						drawHoleSide: par.isTurnRack,
					}
					var rackSet = drawSVGRackHoles(rackPar);
					moove(rackSet, newPoint_xy(elementBasePoint, 20/*profile/2*/ - rackPar.xOffset, 0), 'left_bot');
					set.push(rackSet);
				}

				set.push(obj);
				if (dimSet) set.push(dimSet);
			}
			//Отрисовка деталей отдельно
			{
				if (par.elemType == 'banister') return;
				var set = sets.find(s => s.marshId == par.marshId && s.key == par.key && s.isParts == true);
				if (!set) {
					set = draw.set();
					set.marshId = par.marshId;
					set.key = par.key;
					set.isParts = true;
					//Кованные ограждения сверлятся сверху.
					set.listText = "Марш " + par.marshId + " Сторона " + (par.key == 'out' ? 'внешняя' : 'внутренняя') + " (сверлить сверху)";
					if (params.orderName) set.listText = params.orderName + "\n" + set.listText;
					set.drawedParts = [];
					set.baseY = 0;
					sets.push(set);
				}
				var objShape = draw.set();
				if (par.partIndex) {
					var index = getIdByPoleIndex(par.partIndex);
					if (set.drawedParts.includes(index)) return;
				}

				if (par.startAngle) {
					var point1 = { x: par.startAngle.center.x, y: par.startAngle.center.y * -1 }
					var circle1 = draw.circle(point1.x, point1.y, 3);
					circle1.attr("fill", "transparent");
					circle1.attr("stroke", "none");
					objShape.push(circle1);

					var point2 = { x: par.startAngle.p1.x, y: par.startAngle.p1.y * -1 }
					var circle2 = draw.circle(point2.x, point2.y, 3);
					circle2.attr("fill", "transparent");
					circle2.attr("stroke", "none");
					objShape.push(circle2);

					var point3 = { x: par.startAngle.p2.x, y: par.startAngle.p2.y * -1 }
					var circle3 = draw.circle(point3.x, point3.y, 3);
					circle3.attr("fill", "transparent");
					circle3.attr("stroke", "none");
					objShape.push(circle3);

					objShape.startAngle = {
						center: circle1,
						p1: circle2,
						p2: circle3
					}
				}

				if (par.endAngle) {
					var point1 = { x: par.endAngle.center.x, y: par.endAngle.center.y * -1 }
					var circle1 = draw.circle(point1.x, point1.y, 3);
					circle1.attr("fill", "transparent");
					circle1.attr("stroke", "none");
					objShape.push(circle1);

					var point2 = { x: par.endAngle.p1.x, y: par.endAngle.p1.y * -1 }
					var circle2 = draw.circle(point2.x, point2.y, 3);
					circle2.attr("fill", "transparent");
					circle2.attr("stroke", "none");
					objShape.push(circle2);

					var point3 = { x: par.endAngle.p2.x, y: par.endAngle.p2.y * -1 }
					var circle3 = draw.circle(point3.x, point3.y, 3);
					circle3.attr("fill", "transparent");
					circle3.attr("stroke", "none");
					objShape.push(circle3);

					objShape.endAngle = {
						center: circle1,
						p1: circle2,
						p2: circle3
					}
				}

				// if (par.startAngle) {
				// 	var anglePar = {
				// 		draw: draw,
				// 		center: par.startAngle.center,
				// 		p1: par.startAngle.p1,
				// 		p2: par.startAngle.p2,
				// 		offset: 100,
				// 		debug: true,
				// 		drawLines: true,
				// 	}

				// 	var angleDim = drawAngleDim2(anglePar);
				// 	objShape.push(angleDim);
				// }

				// if (par.endAngle) {
				// 	var anglePar = {
				// 		draw: draw,
				// 		center: par.endAngle.center,
				// 		p1: par.endAngle.p1,
				// 		p2: par.endAngle.p2,
				// 		offset: 100,
				// 		debug: true,
				// 		drawLines: true,
				// 	}

				// 	var angleDim = drawAngleDim2(anglePar);
				// 	objShape.push(angleDim);
				// }

				var obj = makeSvgFromShape(shape, draw);
				//угол поворота
				var ang = 0;
				if (par.baseLine) ang = angle(par.baseLine.p1, par.baseLine.p2) / Math.PI * 180;

				objShape.push(obj);

				if (par.dimPoints) {
					objShape.dimPoints = [];

					$.each(par.dimPoints, function () {
						// objShape.
						var point1 = { x: this.p1.x, y: this.p1.y * -1 };
						var circle1 = draw.circle(point1.x, point1.y, 3);
						circle1.attr("fill", "transparent");
						circle1.attr("stroke", "none");
						objShape.push(circle1);

						var point2 = { x: this.p2.x, y: this.p2.y * -1 };
						var circle2 = draw.circle(point2.x, point2.y, 3);
						circle2.attr("fill", "transparent");
						circle2.attr("stroke", "none");
						objShape.push(circle2);

						objShape.dimPoints.push({
							p1: circle1, p2: circle2, type: this.type
						});
					});
				}

				rotateSet2(objShape, ang);
				moove(objShape, { x: 0, y: set.baseY });

				if (mirror) objShape.transform("S-1,1,0,0...");

				if (objShape.startAngle) {
					var center = { x: objShape.startAngle.center.getBBox().cx, y: objShape.startAngle.center.getBBox().cy * -1 };
					var p1 = { x: objShape.startAngle.p1.getBBox().cx, y: objShape.startAngle.p1.getBBox().cy * -1 };
					var p2 = { x: objShape.startAngle.p2.getBBox().cx, y: objShape.startAngle.p2.getBBox().cy * -1 };
					p1.x += 0.01;
					p2.x -= 0.01;

					var anglePar = {
						draw: draw,
						center: center,
						p1: p1,
						p2: p2,
						offset: 150,
						drawLines: true,
					}

					var angleDim = drawAngleDim2(anglePar);
					set.push(angleDim);
				}

				if (objShape.endAngle) {
					var center = { x: objShape.endAngle.center.getBBox().cx, y: objShape.endAngle.center.getBBox().cy * -1 };
					var p1 = { x: objShape.endAngle.p1.getBBox().cx, y: objShape.endAngle.p1.getBBox().cy * -1 };
					var p2 = { x: objShape.endAngle.p2.getBBox().cx, y: objShape.endAngle.p2.getBBox().cy * -1 };
					p1.x += 0.01;
					p2.x -= 0.01;

					var anglePar = {
						draw: draw,
						center: center,
						p1: p1,
						p2: p2,
						offset: 150,
						drawLines: true,
					}

					var angleDim = drawAngleDim2(anglePar);
					set.push(angleDim);
				}

				if (objShape.dimPoints) {
					var dimPoints = [];
					$.each(objShape.dimPoints, function () {
						var p1 = { x: this.p1.getBBox().cx, y: this.p1.getBBox().cy * -1 };
						var p2 = { x: this.p2.getBBox().cx, y: this.p2.getBBox().cy * -1 };
						dimPoints.push({ p1: p1, p2: p2, type: 'hor' });
					});
					var dimPar = {
						dimPoints: dimPoints,
						draw: draw,
						dimOffset: 10,
					};
					var dim = drawDimensionsByPoints(dimPar);
					dim.setClass("dimensions");
					set.push(dim);
				}

				var bbox = obj.getBBox();

				set.baseY -= bbox.height + 200;

				set.push(objShape);

				bbox = obj.getBBox();

				if (par.partIndex) {
					var text = "Поз: " + getIdByPoleIndex(par.partIndex);// + " / " + par.partIndex;
					var info = getPartInfo(par.partIndex);
					if (info) {
						text += " " + info.poleProfileY + "х" + info.poleProfileZ;
					}
					set.drawedParts.push(getIdByPoleIndex(par.partIndex));
					text += " " + railingShapes.filter(function (s) {
						var shapePar = s.drawing;
						if (shapePar.marshId == par.marshId && shapePar.key == par.key && getIdByPoleIndex(shapePar.partIndex) == getIdByPoleIndex(par.partIndex)) {
							return true;
						}
						return false;
					}).length + " шт.";

					//подпись
					var detailedTextPar = {
						draw: draw,
						center: { x: bbox.cx, y: bbox.cy * -1 },
						text: text + " ",
						side: 'left',
						lineWidth: 2,
						textHeight: 30 * dimScale,
						offset: 140,
					}
					if (mirror) {
						detailedTextPar.side = 'right';
					}
					var text = drawDetailText(detailedTextPar);
					set.push(text);
				}

				var dimPar = {
					obj: obj,
					draw: draw,
				}
				dimSet = drawDimensions(dimPar).set;
				dimSet.setClass("dimensions");
				set.push(dimSet);

				// set.push(obj);
			}
		});

		//Устанавливаем размер между стойками и балясинами
		{
			$.each(sets, function () {
				if (this.isParts) return;
				var marshId = this.marshId;
				var key = this.key;
				var mirror = isMirrored(key);
				var factor = mirror ? -1 : 1;

				var racks = railingShapes.filter(shape => {
					if (shape.drawing) {
						if (shape.drawing.elemType == 'rack') {
							if (marshId == shape.drawing.marshId && key == shape.drawing.key) {
								return true;
							}
						}
					}
					return false
				});

				//Сортируем в правильном порядке
				racks.sort(function (a, b) {
					if (mirror) {
						return b.drawing.pos.x - a.drawing.pos.x;
					}
					if (!mirror) {
						return a.drawing.pos.x - b.drawing.pos.x;
					}
				});

				//Расстояние между стойками
				for (var i = 0; i < racks.length - 1; i++) {
					var pole = railingShapes.find(shape => {
						var data = shape.drawing || {};
						if (data.place == 'bot' && data.marshId == marshId && data.key == key && racks[i].drawing.poleId == data.poleId) {
							return shape
						}
						return false;
					});
					if (pole) {
						var firstRack = racks.find(shape => {
							var data = shape.drawing || {};
							if (shape.drawing.elemType == 'rack') {
								if (data.marshId == pole.drawing.marshId && data.key == pole.drawing.key && pole.drawing.poleId == data.poleId) {
									return shape
								}
							}
							return false;
						});
						var p1 = copyPoint(firstRack.drawing.pos);
						var p2 = copyPoint(racks[i + 1].drawing.pos);
						var polePos = copyPoint(pole.drawing.pos);
						var poleAngle = pole.drawing.ang;
						var cutLen = 20 / Math.cos(poleAngle);

						if (!mirror) p1.x += 40;
						if (mirror) p2.x += 40;

						polePos.y -= cutLen / 2 * factor;
						p1 = itercection(polePos, polar(polePos, poleAngle * factor, 100), p1, newPoint_xy(p1, 0, 100));
						p2 = itercection(polePos, polar(polePos, poleAngle * factor, 100), p2, newPoint_xy(p2, 0, 100));

						//горизонтальный размер
						var dimPar = {
							type: "dist",
							p1: p1,
							p2: p2,
							offset: 100 + (40 * i),
							side: "bot",
							draw: draw,
						}

						dimSet = drawDim(dimPar);
						dimSet.setClass("dimensions");
						this.push(dimSet);
					}
				}

				var poles = railingShapes.filter(shape => {
					if (shape.drawing) {
						if (shape.drawing.elemType == 'pole' && shape.drawing.place == 'bot') {
							if (marshId == shape.drawing.marshId && key == shape.drawing.key) {
								return true;
							}
						}
					}
					return false
				});

				var balDimOffset = 30;//Отступ размера балясин
				//Расстояние между балясинами
				for (var i = 0; i < poles.length; i++) {
					var pole = poles[i];
					if (pole) {
						var cutLen = 20 / Math.cos(pole.drawing.ang);
						var poleAngle = pole.drawing.ang;
						var poleStartPoint = pole.drawing.startPoint;
						// var poleEndPoint = pole.drawing.endPoint;
						var firstBal, secondBal;
						var firstBalPos, secondBalPos;
						//Выбираем первую вторую и последнюю балясину для размеров;
						railingShapes.forEach(s => {
							var data = s.drawing;
							if (data) {
								if (marshId == data.marshId && key == data.key && data.poleId == pole.drawing.poleId) {
									if (data.count > 2) {
										if (data.index == Math.floor(data.count / 2)) firstBal = s;
										if (data.index == (Math.floor(data.count / 2) + 1)) secondBal = s;
									}
								}
							}
						});

						if (firstBal && secondBal) {

							poleStartPoint = newPoint_xy(poleStartPoint, 0, firstBal.drawing.balLen / 3);

							var firstBalPos = newPoint_xy(firstBal.drawing.pos, 20, 0);
							firstBalPos = itercection(poleStartPoint, polar(poleStartPoint, poleAngle * factor, 100), firstBalPos, newPoint_xy(firstBalPos, 0, 100));

							var secondBalPos = newPoint_xy(secondBal.drawing.pos, 20, 0);//20 - profile / 2
							secondBalPos = itercection(poleStartPoint, polar(poleStartPoint, poleAngle * factor, 100), secondBalPos, newPoint_xy(secondBalPos, 0, 100));

							var dimPar = {
								type: "dist",
								p1: firstBalPos,
								p2: secondBalPos,
								offset: balDimOffset,
								side: "top",
								draw: draw,
							}

							dimSet = drawDim(dimPar);
							dimSet.setClass("dimensions");
							this.push(dimSet);

							//Высота балясины
							var dimPar = {
								type: "vert",
								p1: firstBal.drawing.pos,
								p2: newPoint_xy(firstBal.drawing.pos, 0, firstBal.drawing.balLen),
								offset: 50,
								side: "left",
								draw: draw,
							}
							if (!mirror) dimPar.offset = -50;

							dimSet = drawDim(dimPar);
							dimSet.setClass("dimensions");
							this.push(dimSet);
						}

					}
				}
			});
		}

		return sets;
	}
}

function drawMarshRailing(par, marshId) {


	var marshRailing = new THREE.Object3D();
	var forgedParts = new THREE.Object3D();
	var handrails = new THREE.Object3D();

	var marshParams = getMarshParams(marshId);
	var turnParams = calcTurnParams(marshId);

	var handrailParams = {};
	//Параметры ограждения для корректного рассчета поворотного столба

	var sectionPar = {
		marshId: marshId,
		dxfBasePoint: par.dxfBasePoint,
		stringerParams: par.stringerParams,
		rackProfile: 40
	}

	if (par.treadsObj.wndPar2 || par.treadsObj.wndPar) {
		sectionPar.wndPar = par.treadsObj.wndPar2 ? par.treadsObj.wndPar2.params : par.treadsObj.wndPar.params
	}
	if (params.calcType == 'timber' || params.calcType == 'timber_stock') {
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
		if (params.stairType == "дпк") mooveY += 14;
	}
	if (params.railingModel == "Деревянные балясины" ||
		params.railingModel == "Стекло" ||
		params.railingModel == "Дерево с ковкой") {
		sideOffset = 0;//30;
		sideOffset = 0;
		mooveY = 0;
	}

	//внутренняя сторона
	var hasRailing = false;
	if (marshParams.hasRailing.in) hasRailing = true;
	if (marshParams.hasTopPltRailing.in) hasRailing = true;
	//костыль для ограждения верхней площадки Прямой с промежуточной площадкой: там объединяются массивы для 1 и 3 марша и отрисовывается ограждение как будто только для первого марша
	if (params.stairModel == "Прямая с промежуточной площадкой") {
		if (getMarshParams(3).hasTopPltRailing.in) hasRailing = true;
	}

	if (marshId != "topPlt" && hasRailing) {

		//смещаем dxfBasePoint на длину нижнего участка
		par.dxfBasePoint.x += turnParams.turnLengthBot;
		sectionPar.dxfBasePoint = par.dxfBasePoint;

		sectionPar.key = "in";
		var sectionObj = drawRailingSection(sectionPar);
		if (params.calcType == 'timber') handrailParams.in = sectionObj.handrailParams;
		var section = sectionObj.mesh;
		section.position.y = mooveY;
		section.position.z = (params.M / 2 + 0.01 - sideOffset) * turnFactor;

		if (params.stairModel == "Прямая") {
			if (!(params.calcType == 'timber' || params.calcType == 'timber_stock')) section.position.z = -(params.M / 2 - sideOffset + sectionPar.rackProfile) * turnFactor;
			if ((params.calcType == 'timber' || params.calcType == 'timber_stock') && (params.model == 'косоуры' || params.model == 'тетива+косоур')) section.position.z -= params.rackSize * turnFactor;
			if (params.calcType == 'timber' && !(params.model == 'косоуры' || params.model == 'тетива+косоур')) section.position.z -= params.stringerThickness * turnFactor;
		}
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
	if (marshParams.hasRailing.out) hasRailing = true;
	if (marshParams.hasTopPltRailing.out) hasRailing = true;
	//костыль для ограждения верхней площадки Прямой с промежуточной площадкой: там объединяются массивы для 1 и 3 марша и отрисовывается ограждение как будто только для первого марша
	if (params.stairModel == "Прямая с промежуточной площадкой") {
		if (getMarshParams(3).hasTopPltRailing.out) hasRailing = true;
	}

	if (marshId != "topPlt" && hasRailing) {
		sectionPar.key = "out";
		if (params.stairModel == "П-образная с забегом" && marshId == 2) sectionPar.isRearPRailing = true;

		var sectionObj = drawRailingSection(sectionPar);
		if (params.calcType == 'timber') handrailParams.out = sectionObj.handrailParams;

		var section = sectionObj.mesh;
		section.position.y = mooveY;
		section.position.z = -(params.M / 2 + sectionPar.rackProfile - sideOffset) * turnFactor; //-(params.M / 2 + sectionPar.rackProfile) * turnFactor;
		if (params.stairModel == "Прямая" && !(params.calcType == 'timber' || params.calcType == 'timber_stock')) section.position.z = (params.M / 2 - sideOffset) * turnFactor;
		// if (params.stairModel == "Прямая" && params.calcType == 'timber') section.position.z += params.rackSize * turnFactor;
		if (params.stairModel == "Прямая" && (params.calcType == 'timber' || params.calcType == 'timber_stock') && params.model == 'косоуры') section.position.z += params.rackSize * turnFactor;
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
		if (params.calcType !== 'mono') {
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
		}
		if (params.calcType == 'mono' && params.railingModel !== "Самонесущее стекло") {
			sectionPar.isBotFlan = true;
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
		if (params.calcType == 'mono' && params.railingModel !== "Самонесущее стекло") {
			section.position.x -= sectionPar.rackProfile + 18; //18 - расстояние от края нижнего фланца до стойки
			section.position.y += 0.01;
		}
		if (params.calcType == 'mono' && params.railingModel == "Самонесущее стекло") {
			section.position.x = params.platformLength_1 + params.nose; 
			//section.position.y = mooveY;
			section.position.z = (params.M / 2 + params.marshDist / 2) * turnFactor;
			//section.position.z -= (params.M * 2 + params.marshDist) * (1 + turnFactor) * 0.5;
			section.rotation.y = -Math.PI / 2;
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
	if (marshId == "topPlt" && params.topPltRailing_5 && (params.platformRearStringer == 'есть' || params.calcType == "mono")) {
		sectionPar.key = "rear";
		var sectionObj = drawRailingSection(sectionPar);
		var section = sectionObj.mesh;
		section.position.y = mooveY;
		section.position.z = (- sideOffset) * turnFactor;
		if (params.platformTop == 'увеличенная' && turnFactor == 1 && params.stairModel == 'Прямая') {
			section.position.x = -(params.platformWidth_3 - params.M) - 5;
		}
		if (params.platformTop == 'увеличенная' && params.stairModel !== 'Прямая' && params.turnSide == "правое") {
			section.position.x -= params.platformWidth_3 - params.M;
		}

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

	/*	
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
	*/
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
		sectionPar.railingSide = "left";
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

	if (params.calcType == 'timber' || params.calcType == 'timber_stock') {
		marshRailing.position.z += (params.M / 2 + sideOffset / 2) * turnFactor;
	}

	par.isRearPRailing = null; // Очищаем, вызывает ошибки в других маршах

	var result = {
		railing: marshRailing,
		forgedParts: forgedParts,
		handrails: handrails,
		handrailParams: handrailParams,
	}
	return result;

} //end of drawMarshRailing
