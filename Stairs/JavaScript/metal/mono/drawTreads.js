


function drawHoldersArr(par){
	/*
	marshId
	side
	*/
	//параметры марша
	var marshPar = getMarshParams(par.botMarshId);
	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;
	
	var sideOffset = 40; //Отступ оси рутеля от передней или задней грани ступени
	var rutelDist = par.a - sideOffset * 2;
	
	var p0 = {x: sideOffset, y: par.h - params.treadThickness / 2};
	var points = [];
	
	for(var i=0; i<par.stairAmt; i++){
		var p1 = newPoint_xy(p0, par.b * i, par.h * i);
		points.push(p1);
		var p2 = newPoint_xy(p1, rutelDist, 0);
		points.push(p2);
		}
		
	return points;

}


function drawTreads() {
	var treadsGroup = new THREE.Object3D();
	var dxfBasePoint = { x: 0, y: -2000, }
	var turnEnd = [];
	var allUnitsPos = {}; //массив позиций всех участков для использования в построении каркаса

	//выбор функции отрисовки забежных ступеней
	var drawWndTreads = drawWndTreadsMetal;
	if (params.calcType == "mono") drawWndTreads = drawWndTreadsMono;
	if (params.calcType == "timber") drawWndTreads = drawWndTreadsTimber;

	//нижний марш
	var marshId = 1;

	var treadParams1 = {
		marshId: marshId,
		dxfBasePoint: dxfBasePoint,
	}

	var marshTreads = drawMarshTreads2(treadParams1).treads;
	treadsGroup.add(marshTreads);

	var unitPos = calcMarshEndPoint(marshTreads.position, marshTreads.rotation.y, treadParams1);
	var lastMarshEnd = copyPoint(unitPos);
	lastMarshEnd.rot = 0;


	if (params.stairModel != "Прямая") {

		//первый поворот

		//сохраняем позицию и поворот
		allUnitsPos.turn1 = copyPoint(unitPos);
		allUnitsPos.turn1.rot = 0;

		var marshPar1 = getMarshParams(marshId);
		var turnType1 = marshPar1.topTurn;
		if (turnType1 == "площадка") {
			var pltPar = {
				len: params.M + calcTurnParams(marshId).topMarshOffsetX - (params.M - calcTreadLen()) / 2,
				width: calcTreadLen(),
				dxfBasePoint: dxfBasePoint,
			}
			if (params.stairModel == "П-образная с площадкой") {
				pltPar.width = params.M * 2 + params.marshDist - (params.M - calcTreadLen());
			}
			if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0) {
				pltPar.plusMarshDist = true;
			}
			pltPar = drawPlatform2(pltPar);
			var platform = pltPar.treads;
			platform.position.x = unitPos.x;
			platform.position.y = unitPos.y;
			platform.position.z = unitPos.z;
			treadsGroup.add(platform);
			var unitPos = calcTurnEndPoint(platform.position, platform.rotation.y, marshId, pltPar.plusMarshDist);
		}
		if (turnType1 == "забег") {

			var wndPar = {
				botMarshId: 1,
				dxfBasePoint: dxfBasePoint,
			}
			if (params.stairModel == "П-образная трехмаршевая" && params.stairAmt2 == 0) {
				wndPar.plusMarshDist = true; //необходимо учисть зазор между маршами в ширине последней ступени
			}
			if (params.stairModel == "П-образная с забегом") {
				wndPar.plusMarshDist = true;
			}

			//отрисовываем блок забежных ступеней 	
			var wndTreads = drawWndTreads(wndPar).treads; //функция в файле drawTreads.js;
			wndTreads.position.x = unitPos.x;
			wndTreads.position.y = unitPos.y;
			wndTreads.position.z = unitPos.z;
			treadsGroup.add(wndTreads);
			var unitPos = calcTurnEndPoint(wndTreads.position, wndTreads.rotation.y, marshId, wndPar.plusMarshDist);
			console.log(wndTreads)
		}

		turnEnd[1] = copyPoint(unitPos);

		//второй марш
		if (params.stairModel == "П-образная трехмаршевая") {
			var marsh2BasePoint = copyPoint(unitPos);
			marshId = 2;

			//сохраняем позицию и поворот
			allUnitsPos.marsh2 = copyPoint(unitPos);
			allUnitsPos.marsh2.rot = unitPos.rot;

			var treadParams2 = {
				marshId: marshId,
				dxfBasePoint: dxfBasePoint,
			}

			var marshTreads = drawMarshTreads2(treadParams2).treads;
			marshTreads.rotation.y = unitPos.rot;
			marshTreads.position.x = unitPos.x;
			marshTreads.position.y = unitPos.y;
			marshTreads.position.z = unitPos.z;
			treadsGroup.add(marshTreads);

			var unitPos = calcMarshEndPoint(marshTreads.position, marshTreads.rotation.y, treadParams2);

		}

		//второй поворот
		if (params.stairModel == "П-образная трехмаршевая" || params.stairModel == "П-образная с забегом") {
			var marshPar2 = getMarshParams(marshId);
			var turnType2 = marshPar2.topTurn;

			//сохраняем позицию и поворот
			allUnitsPos.turn2 = copyPoint(unitPos);
			allUnitsPos.turn2.rot = unitPos.rot;

			if (turnType2 == "площадка") {
				var pltPar = {
					len: params.M + calcTurnParams(marshId).topMarshOffsetX,
					width: params.M,
					dxfBasePoint: dxfBasePoint,
				}

				pltPar = drawPlatform2(pltPar);
				var platform = pltPar.treads;
				platform.rotation.y = unitPos.rot;
				platform.position.x = unitPos.x;
				platform.position.y = unitPos.y;
				platform.position.z = unitPos.z;
				treadsGroup.add(platform);

				var unitPos = calcTurnEndPoint(platform.position, platform.rotation.y, marshId);

				turnEnd[2] = copyPoint(unitPos);
			}
			if (turnType2 == "забег" || params.stairModel == "П-образная с забегом") {
				var wndPar = {
					botMarshId: marshId,
					dxfBasePoint: dxfBasePoint,
				}

				//отрисовываем блок забежных ступеней 	
				var wndTreads = drawWndTreads(wndPar).treads; //функция в файле drawTreads.js;
				wndTreads.rotation.y = unitPos.rot;
				wndTreads.position.x = unitPos.x;
				wndTreads.position.y = unitPos.y;
				wndTreads.position.z = unitPos.z;
				if (params.stairModel == "П-образная с забегом") wndTreads.position.y += params.h3;
				treadsGroup.add(wndTreads);
				var unitPos = calcTurnEndPoint(wndTreads.position, wndTreads.rotation.y, marshId);
			}
		}
		turnEnd[2] = copyPoint(unitPos);
		if (params.stairModel == "П-образная с забегом") turnEnd[1] = copyPoint(unitPos);

		//верхний марш

		marshId = 3;

		//сохраняем позицию и поворот
		allUnitsPos.marsh3 = copyPoint(unitPos);
		allUnitsPos.marsh3.rot = unitPos.rot;

		var treadParams3 = {
			marshId: marshId,
			dxfBasePoint: dxfBasePoint,
		}

		var marshTreads = drawMarshTreads2(treadParams3).treads;
		marshTreads.rotation.y = unitPos.rot;
		marshTreads.position.x = unitPos.x;
		marshTreads.position.y = unitPos.y;
		marshTreads.position.z = unitPos.z;
		treadsGroup.add(marshTreads);
		lastMarshEnd = calcMarshEndPoint(marshTreads.position, marshTreads.rotation.y, treadParams3);

	}

	//верхняя площадка
	if (params.platformTop == "площадка") {
		dxfBasePoint = newPoint_xy(dxfBasePoint, 1000, 0);

		//сохраняем позицию и поворот
		allUnitsPos.topPlt = copyPoint(lastMarshEnd);
		allUnitsPos.topPlt.rot = lastMarshEnd.rot;

		var pltPar = {
			len: params.platformLength_3,
			width: params.M,
			dxfBasePoint: dxfBasePoint,
		}

		pltPar = drawPlatform2(pltPar);
		var platform = pltPar.treads;
		platform.rotation.y = lastMarshEnd.rot;
		platform.position.x = lastMarshEnd.x;
		platform.position.y = lastMarshEnd.y;
		platform.position.z = lastMarshEnd.z;
		treadsGroup.add(platform);

		lastMarshEnd.x += params.platformLength_3 * Math.cos(lastMarshEnd.rot);
		lastMarshEnd.z += params.platformLength_3 * Math.sin(lastMarshEnd.rot);
	}

	//формируем возвращаемый объект
	var par = {
		mesh: treadsGroup,
		turnEnd: turnEnd,
		lastMarshEnd: lastMarshEnd,
		wndPar: wndPar,
		unitsPos: allUnitsPos,
	}

	return par;


} //end of drawTreads


