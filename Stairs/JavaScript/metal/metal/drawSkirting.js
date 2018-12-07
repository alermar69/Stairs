/**функция оболочка, отрисовывает плинтус на все варианты геометрии
	par = {
		treadsObj
		dxfBasePoint
		}
*/

function drawSkirting_all(par){

	par.mesh = new THREE.Object3D();
	var dxfBasePoint0 = copyPoint(par.dxfBasePoint);

	// Плинтус нижнего марша
	var marshId = 1;
	var skirting = drawMarshSkirting(par, marshId);
	par.mesh.add(skirting);
	
	// Плинтус второго марша
	par.dxfBasePoint = newPoint_xy(dxfBasePoint0, 5000, 0);
	
	if (params.stairModel == "П-образная трехмаршевая"){
		marshId = 2;		
		var skirting = drawMarshSkirting(par, marshId);	
		skirting.position.x = par.treadsObj.unitsPos.marsh2.x;
		skirting.position.y = par.treadsObj.unitsPos.marsh2.y;
		skirting.position.z = par.treadsObj.unitsPos.marsh2.z;	
		skirting.rotation.y = par.treadsObj.unitsPos.marsh2.rot;			
		par.mesh.add(skirting)
		}
	
	if (params.stairModel == "П-образная с забегом"){
		marshId = 2;
		var skirting = drawMarshSkirting(par, marshId);	
		skirting.position.x = par.treadsObj.unitsPos.turn2.x;
		skirting.position.y = par.treadsObj.unitsPos.turn2.y;
		skirting.position.z = par.treadsObj.unitsPos.turn2.z;	
		skirting.rotation.y = par.treadsObj.unitsPos.turn2.rot;			
		par.mesh.add(skirting)
		}
	
	if (params.stairModel == "П-образная с площадкой"){
		marshId = 2;
		var skirting = drawMarshSkirting(par, marshId);	
		skirting.position.x = par.treadsObj.unitsPos.turn1.x;
		skirting.position.y = par.treadsObj.unitsPos.turn1.y;
		skirting.position.z = par.treadsObj.unitsPos.turn1.z;	
		skirting.rotation.y = par.treadsObj.unitsPos.turn1.rot;			
		par.mesh.add(skirting)
	}	
	
	// Плинтус верхнего марша
	
	if (params.stairModel != "Прямая"){
		marshId = 3;
		par.dxfBasePoint = newPoint_xy(dxfBasePoint0, 10000, 0);
		var skirting = drawMarshSkirting(par, marshId);	
		skirting.position.x = par.treadsObj.unitsPos.marsh3.x;
		skirting.position.y = par.treadsObj.unitsPos.marsh3.y;
		skirting.position.z = par.treadsObj.unitsPos.marsh3.z;	
		skirting.rotation.y = par.treadsObj.unitsPos.marsh3.rot;		
		par.mesh.add(skirting)
	}
	
	return par;

} //end of drawSkirting_all

/** функция отрисовывает плинтус с двух сторон одного марша
	наличие плинтуса по сторонам считается внутри 
	par = {
		treadsObj
		dxfBasePoint
		}
	*/
	
function drawMarshSkirting(par, marshId){
	 
	var mesh = new THREE.Object3D();
	var marshPar = getMarshParams(marshId);
	var skirtingSectPar = {
		marshId: marshId,
		wndPar: par.treadsObj.wndPar,
		dxfBasePoint: par.dxfBasePoint,
		}
	if(par.treadsObj.wndPar2 && marshId > 2) skirtingSectPar.wndPar = par.treadsObj.wndPar2;
	if(!par.treadsObj.wndPar && par.treadsObj.wndPar2) skirtingSectPar.wndPar = par.treadsObj.wndPar2;
	var dxfBasePoint0 = copyPoint(par.dxfBasePoint);

	//внутренняя сторона марша
	var side = "in";
	if(marshPar.hasSkirting[side]){
		skirtingSectPar.side = side;
		var sect = drawScirtingSection(skirtingSectPar);
		sect.position.z = params.M / 2 * turnFactor;
		if (turnFactor == 1) sect.position.z -= params.riserThickness;
		mesh.add(sect);		
		}

	//внешняя сторона марша
	side = "out"
	if(marshPar.hasSkirting[side]){
		skirtingSectPar.side = side;
		par.dxfBasePoint = newPoint_xy(dxfBasePoint0, 0, -3000);
		var sect = drawScirtingSection(skirtingSectPar);
		sect.position.z = -params.M / 2 * turnFactor;
		if (turnFactor == -1) sect.position.z -= params.riserThickness;
		mesh.add(sect);		
	}	

	//задний плинтус площадки П-образной с площадкой
	if (marshId == 2 &&params.stairModel == "П-образная с площадкой" &&params.riserType == "есть" &&params.skirting_plt == "есть") {
		var isScirting1 = getMarshParams(1).hasSkirting.out;
		var isScirting3 = getMarshParams(3).hasSkirting.out;
		var skirtingParams = {
			rise: 0,
			step: params.M * 2 + params.marshDist,
			isLast: true,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
			skirtingDescription: "Плинтус задней стороны площадки ",
		}
		if (isScirting1) skirtingParams.step -= params.riserThickness;
		if (isScirting3) skirtingParams.step -= params.riserThickness;

		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		skirting.position.x = params.platformLength_1 + params.nose;
		if (turnFactor == -1 && params.railingModel !== "Самонесущее стекло") skirting.position.x -= params.riserThickness
		skirting.position.z = (- params.M / 2 + 0.1) * turnFactor;
		if (isScirting1) skirting.position.z += params.riserThickness * turnFactor;
		skirting.rotation.y = -Math.PI / 2 * turnFactor;
		mesh.add(skirting);	
	}
	
	return mesh;
} //end of drawMarshSkirting

/** функция отрисовывает плинтус по одной стороне марша: внешней или внутренней
*@params par = {
	marshId
	side
	dxfBasePoint
	
	}
*/

function drawScirtingSection(par){
	
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	var mesh = new THREE.Object3D();
	var dxfBasePoint0 = copyPoint(par.dxfBasePoint);
	
	var skirtingParams = {
		rise: marshPar.h,
		step: marshPar.b,
		isLast: false,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		skirtingDescription: "Плинтус площадки " + par.marshId + " марша ",
		}
	
	//нижний участок
	
	var turnPar = calcTurnParams(marshPar.prevMarshId);
	
	
	if(par.side == "out" && marshPar.botTurn == "площадка"){
		skirtingParams.skirtingDescription = "Плинтус площадки ";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = 0;
		skirtingParams.step = turnPar.turnLengthBot  + params.nose - 0.1// - params.riserThickness * 2;
		//подрезамем плинтус если на нижнем марше тоже есть плинтус
		if (prevMarshPar.hasSkirting.out) skirtingParams.step -= params.riserThickness;
		if (params.stairModel === "П-образная с площадкой")
			skirtingParams.step = params.platformLength_1 + params.nose;
		
		if (marshPar.stairAmt == 0 && par.marshId == 3) {
			skirtingParams.isLast = true;
			}
		var basePoint = {
			x: params.nose - skirtingParams.step,
			y: 0,
			}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose - skirtingParams.step;
		skirting.position.y = 0;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		}
	if(par.side == "out" && marshPar.botTurn == "забег"){
		//вторая забежная ступень
		//skirtingParams.skirtingDescription = "Плинтус площадки " + 1 + "шт.";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = 0;
		skirtingParams.step = par.wndPar.params[2].stepWidthX - 0.11// - params.riserThickness * 2;
		//подрезамем плинтус если на нижнем марше тоже есть плинтус
		if (prevMarshPar.hasSkirting.out) {
			skirtingParams.step -= params.riserThickness;
		}
		
		var basePoint = {
			x: -turnPar.turnLengthBot,
			y: -marshPar.h,
			}
		//сдвигаем плинтус если на нижнем марше тоже есть плинтус
		if (prevMarshPar.hasSkirting.out) basePoint.x += params.riserThickness + 0.1;
		if (marshPar.stairAmt == 0 && !marshPar.lastMarsh) basePoint.x -= ((params.marshDist - 57) + (params.nose - 40) );
		
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = -turnPar.turnLengthBot;
		//сдвигаем плинтус если на нижнем марше тоже есть плинтус
		if(prevMarshPar.hasSkirting.out) skirting.position.x += params.riserThickness + 0.1;
		skirting.position.y = -marshPar.h;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		
		//третья забежная ступень
		skirtingParams.skirtingDescription = "Плинтус площадки";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = marshPar.h;
		if (marshPar.stairAmt == 0 && par.marshId == 3) {
			skirtingParams.isLast = true;
		}
		//skirtingParams.step = par.wndPar.params[3].stepWidthHi - params.nose - 0.01// - params.riserThickness * 2;
		skirtingParams.nose = 21.824 / Math.cos(par.wndPar.params[3].edgeAngle) + 0.01; 
		skirtingParams.step = par.wndPar.params[3].stepWidthHi - skirtingParams.nose // - params.riserThickness * 2;
		//if (marshPar.stairAmt == 0) skirting.step += 45;
		

		var basePoint = {
			x: params.nose - par.wndPar.params[3].stepWidthHi + skirtingParams.nose - 0.01,
			y: -marshPar.h,
			}
		if (marshPar.stairAmt == 0 && marshPar.lastMarsh)
			basePoint.x += 45 - (100 - params.lastWinderTreadWidth);
		if (marshPar.stairAmt == 0 && !marshPar.lastMarsh) basePoint.x -= (params.nose - 20);
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose - par.wndPar.params[3].stepWidthHi + skirtingParams.nose - 0.01;
		if (marshPar.stairAmt == 0) skirting.position.x += 45 - (100 - params.lastWinderTreadWidth);
		skirting.position.y = -marshPar.h;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);

		skirtingParams.nose = params.nose;
	}
	
	if(par.side == "in" && marshPar.botTurn == "площадка"){
		skirtingParams.rise = 0;
		if (params.stairModel === "П-образная с площадкой")
			skirtingParams.rise = marshPar.h;
		skirtingParams.step = marshPar.b;
		
		var basePoint = {
			x: params.nose,
			y: 0,
			}
		if (params.stairModel !== "П-образная с площадкой") basePoint.y = marshPar.h;
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose;
		if (params.stairModel !== "П-образная с площадкой") skirting.position.y = marshPar.h;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		}
	
	//плинтус на пригласительных ступенях
	var hasStartTreadScirting = false;
	if(params.stairModel == "Прямая" && marshPar.side[par.side] == params.arcSide) hasStartTreadScirting = true;
	if(params.stairModel != "Прямая" && marshPar.side[par.side] != params.arcSide && params.arcSide != "two") 
		hasStartTreadScirting = true;
	
	console.log(par.side, marshPar.side[par.side], params.arcSide)
	if(params.startTreadAmt > 0 && hasStartTreadScirting && par.marshId == 1){
		skirtingParams.skirtingDescription = "Плинтус площадки ";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.rise = params.h1;
		var treadLen = staircasePartsParams.startTreadsParams[1].stepLeft;
		if(params.arcSide == "left") treadLen = staircasePartsParams.startTreadsParams[1].stepRight;
		skirtingParams.step = treadLen - params.nose;
		if(params.fullArcFront == "да") skirtingParams.step += 2; //костыль чтобы не было пересечений
		console.log(staircasePartsParams.startTreadsParams);

		
		var basePoint = {
			x: params.b1 + params.nose - skirtingParams.step,
			y: 0,
			}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;

		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		}
	
	//марш
	skirtingParams.rise = marshPar.h;
	skirtingParams.step = marshPar.b;
	var startTread = 0;
	if(marshPar.botTurn == "площадка" && par.side == "in" && par.marshId > 1) startTread = 1;
	if(params.startTreadAmt > 0 && par.marshId == 1) startTread = params.startTreadAmt;
	
	for (var i = startTread; i < marshPar.stairAmt; i++) {
		if (i == marshPar.stairAmt - 1 && marshPar.topTurn == "пол") {
			skirtingParams.skirtingDescription = "Плинтус последней ступени " + par.marshId + " марша ";
			skirtingParams.dxfArr = dxfPrimitivesArr;
			skirtingParams.dxfBasePoint.x -= 1000;
			skirtingParams.isLast = true;
		}

		var basePoint = {
			x: params.nose + marshPar.b * i,
			y: marshPar.h * i,
			}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose + marshPar.b * i;
		skirting.position.y = marshPar.h * i;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		//skirtingParams.dxfArr = dxfPrimitivesArr0;
		}
	
	//верхний участок
	
	if(marshPar.topTurn == "площадка"){
		skirtingParams.skirtingDescription = "Плинтус площадки ";
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.dxfBasePoint.x -= params.M + 500;
		if (par.side == "out") {
			skirtingParams.step = turnPar.turnLengthTop - params.nose;
			if (params.stairModel === "П-образная с площадкой")
				skirtingParams.step = params.platformLength_1;
		}
		if (par.side == "in") {
			skirtingParams.step = turnPar.topMarshOffsetX;
			if (params.stairModel === "П-образная с площадкой")
				skirtingParams.step = 0;
		}
		
		skirtingParams.isLast = true;
		
		var basePoint = {
			x: params.nose + marshPar.b * marshPar.stairAmt,
			y: marshPar.h * marshPar.stairAmt,
			}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose + marshPar.b * marshPar.stairAmt;
		skirting.position.y = marshPar.h * marshPar.stairAmt;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		}
	if(marshPar.topTurn == "забег"){
		//skirtingParams.skirtingDescription = "Плинтус площадки " + 1 + "шт.";riserThickness

		//первая забежная ступень
		skirtingParams.dxfArr = dxfPrimitivesArr;
		skirtingParams.dxfBasePoint.x -= params.M + 500;

		skirtingParams.nose = params.nose;
		if (marshPar.stairAmt == 0 && !marshPar.lastMarsh) skirtingParams.nose = 20;

		if (par.side == "out") {
			skirtingParams.step = par.wndPar.params[1].stepWidthHi - skirtingParams.nose - params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle);
		}
		if (par.side == "in")
			skirtingParams.step = par.wndPar.params[1].stepWidthLow + 60 - skirtingParams.nose;
		
		skirtingParams.isLast = false;
		
		var basePoint = {
			x: skirtingParams.nose + marshPar.b * marshPar.stairAmt,
			y: marshPar.h * marshPar.stairAmt,
		}
		skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
		
		skirtingParams = drawSkirting2(skirtingParams);
		var skirting = skirtingParams.mesh;
		/*
		skirting.position.x = params.nose + marshPar.b * marshPar.stairAmt;
		skirting.position.y = marshPar.h * marshPar.stairAmt;
		*/
		skirting.position.x = basePoint.x;
		skirting.position.y = basePoint.y;
		mesh.add(skirting);
		
		//вторая забежная ступень
		if(par.side == "out"){
			skirtingParams.step = par.wndPar.params[2].stepWidthY - 20.525 / Math.cos(par.wndPar.params[1].edgeAngle) + params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle);
			skirtingParams.nose = 20.525 / Math.cos(par.wndPar.params[1].edgeAngle);
			//skirtingParams.step = par.wndPar.params[2].stepWidthY - params.nose;
			skirtingParams.rise = nextMarshPar.h;
			skirtingParams.isLast = true;
			var basePoint = {
				x: marshPar.b * marshPar.stairAmt + par.wndPar.params[1].stepWidthHi - params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle),
				y: marshPar.h * marshPar.stairAmt + marshPar.h,
				//y: marshPar.h * marshPar.stairAmt + nextMarshPar.h,
				}
			skirtingParams.dxfBasePoint = newPoint_xy(dxfBasePoint0, basePoint.x, basePoint.y);
			
			skirtingParams = drawSkirting2(skirtingParams);
			var skirting = skirtingParams.mesh;
			/*
			skirting.position.x = marshPar.b * marshPar.stairAmt + par.wndPar.params[1].stepWidthHi - params.riserThickness * Math.tan(par.wndPar.params[1].edgeAngle);
			skirting.position.y = marshPar.h * marshPar.stairAmt + nextMarshPar.h;
			*/
			skirting.position.x = basePoint.x;
			skirting.position.y = basePoint.y;
			mesh.add(skirting);
			}
		}

	return mesh;

}

/** Функция отрисовывает вертикальный и горизонтальную планку плинтуса (к-т на одну ступень)
*/


function drawSkirting2(par) {
	par.mesh = new THREE.Object3D();
	var width = 60;
	var frontEdgeRad = 3;
	if (params.nose < 0) params.nose = 0;
	var extrudeOptions = {
		amount: params.riserThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var gap = 0.1; //зазор от плинтуса до ступени/подступенка

	var nose = params.nose;
	if (par.nose) nose = par.nose;
	nose += 0.01;
	
	// вертикальная планка
	if (par.rise != 0) {
		var shape = new THREE.Shape();
		var p0 = { "x": 0.0, "y": gap };
		var p1 = newPoint_xy(p0, -width, 0);
		var p2 = newPoint_xy(p1, 0, par.rise + width - gap);
		var p3 = newPoint_xy(p2, width, 0);
		var p4 = newPoint_xy(p3, 0, -width + gap);
		var p5 = newPoint_xy(p4, -nose, 0); //скругляемый угол
	//	if(!testingMode) p5.filletRad = 6;
		var p6 = newPoint_xy(p5, 0, -params.treadThickness - gap * 2);
		var p7 = newPoint_xy(p6, nose, 0);
		var points = [p0, p1, p2, p3, p4, p5, p6, p7];
 
		//создаем шейп
		var shapePar = {
			points: points,
			dxfArr: par.dxfArr,
			dxfBasePoint: par.dxfBasePoint,
			}

		var shape = drawShapeByPoints2(shapePar).shape;

		var extrudeOptions = {
			amount: params.riserThickness,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
			};
		//косоур на марше
		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geom, params.materials.timber);
		mesh.position.x -= gap;
		par.mesh.add(mesh);

	}

	//горизонтальная планка

	if (par.step != 0) {
		var length = par.step - width;
		if (par.isLast) length = par.step;
		par.dxfBasePoint.y += par.rise;

		var shape = new THREE.Shape();
		var p0 = { "x": 0.0, "y": 0.0 };
		var p1 = newPoint_xy(p0, 0, width);
		var p2 = newPoint_xy(p1, length, 0);
		var p3 = newPoint_xy(p2, 0, -width);
		var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 100, 0);

		addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);

		geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geometry, params.materials.timber);
		mesh.position.y = par.rise + gap;
		mesh.position.x -= gap;
		par.mesh.add(mesh);
	}

	var text = par.skirtingDescription;
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -100)
	addText(text, textHeight, par.dxfArr, textBasePoint);

	
	//сохраняем данные для спецификации
	var partName = "skirting_vert";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Планка плинтуса верт.",
				area: 0,
				paintedArea: 0,
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "area", //единица измерения
				}
			}
		var len = par.rise + width;
		var area = len * width / 1000000;
		var paintedArea = area * 2 + (len + width) * 2 * params.riserThickness / 1000000;
		
		var name = Math.round(len) + "x" + Math.round(width) + "x" + params.riserThickness;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += paintedArea;
		}
		
	var partName = "skirting_hor";
	if(typeof specObj !='undefined'){
		if(!specObj[partName]){
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Планка плинтуса гор.",
				area: 0,
				paintedArea: 0,
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "area", //единица измерения
				}
			}		
		var len = length;
		var area = len * width / 1000000;
		var paintedArea = area * 2 + (len + width) * 2 * params.riserThickness / 1000000;
		
		var name = Math.round(len) + "x" + Math.round(width) + "x" + params.riserThickness;
		if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["area"] += area;
		specObj[partName]["paintedArea"] += paintedArea;
		}
		
		
	return par;


}//end of drawSkirting2




