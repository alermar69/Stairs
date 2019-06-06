//создаем глобальные массивы
var treads = [];
var risers = [];
var carcas = [];
var railing = [];
var topFloor = [];
var angles = [];
var dxfBasePoint = {
    x: 0,
    y: 0
}


drawStaircase = function(viewportId, isVisible) {

	var x1, x2, y1, y2, x1t, y1t, x2t, y2t;

	var stringerThickness = params.stringerThickness;
	var treadThickness = 40;
	var stringerWidth = 150;
	var riserThickness = 20;
	var treadOffset = 5;
	var treadWidth = params.M;
	

	/*удаляем предыдущую лестницу*/
	if (treads) removeObjects(viewportId, 'treads');
	if (risers) removeObjects(viewportId, 'risers');
	if (carcas) removeObjects(viewportId, 'carcas');
	if (railing) removeObjects(viewportId, 'railing');
	if (topFloor) removeObjects(viewportId, 'topFloor');
	if (angles) removeObjects(viewportId, 'angles');

	//очищаем глобальные массивы
	treads = [];
	risers = [];
	carcas = [];
	railing = [];
	topFloor = [];
	angles = [];

	/*удаляем контуры*/
	dxfPrimitivesArr = [];

	var stringerParams = {};

	/*задаем материалы*/

	var timberMaterial = new THREE.MeshLambertMaterial({color: params.timberColor, overdraw: 0.5});
	var metalMaterial = new THREE.MeshLambertMaterial({color: params.metalColor, wireframe: false});
	var metalMaterial2 = new THREE.MeshLambertMaterial({color: 0xA3A3A3,wireframe: false});
	var glassMaterial = new THREE.MeshLambertMaterial({opacity: 0.6,color: 0x3AE2CE,transparent: true});
	var concreteMaterial = new THREE.MeshLambertMaterial({color: 0xBFBFBF});

	var stringerMaterial = metalMaterial;
	var floorMaterial = concreteMaterial;
	var flanMaterial = metalMaterial2;
	
	/*материал ступеней*/
	var stairType = params.stairType;
	var treadMaterial = timberMaterial;

	if (stairType == "рифленая сталь") treadMaterial = metalMaterial2;
	if (stairType == "рифленый алюминий") treadMaterial = metalMaterial2;
	if (stairType == "лотки") treadMaterial = metalMaterial2;
	if (stairType == "пресснастил") treadMaterial = metalMaterial2;
	if (stairType == "стекло") treadMaterial = glassMaterial;
	//материалы ограждений задаются внутри функции отрисовки секции


	var model = params.model;
	var stairModel = params.stairModel;
	var turnSide =  params.turnSide;
	var platformWidth_1 = params.platformWidth_1;
	var platformLength_1 = params.platformLength_1;
	var turnType_1 = params.turnType_1;
	var turnType_2 = params.turnType_2;
	var platformTop = params.platformTop;
	var platformLength_3 = params.platformLength_3;
	var platformTopColumn = params.platformTopColumn;
	var topFlan = params.topFlan;
	var columnModel = params.columnModel;
	var columnAmt = params.columnAmt;
	var columnLength =  params.columnLength;
	var M =  params.M;
	var stringerType = params.stringerType;
	var riserType = params.riserType;
	var stairFrame = params.stairFrame;
	var stairAmt1 =  params.stairAmt1;
	var h1 =  params.h1;
	var b1 =  params.b1;
	var a1 =  params.a1;
	var stairAmt2 =  params.stairAmt2;
	var h2 =  params.h2;
	var b2 =  params.b2;
	var a2 =  params.a2;
	var stairAmt3 =  params.stairAmt3;
	var h3 =  params.h3;
	var b3 =  params.b3;
	var a3 =  params.a3;
	var bottomAngleType = params.bottomAngleType;
	var metalPaint = params.metalPaint;
	var timberPaint = params.timberPaint;
	var topStairType = params.topStairType;
	var marshDist =  params.marshDist;
	var platformRearStringer = params.platformRearStringer;
	var tyrnLength; //Длина площадки
	var stringerTurn; //тип косоура: площадка или забег
	

	if (platformTop == "площадка") stairAmt3 = stairAmt3 + 1;


	/*направление поворота (глобальные переменные)*/

	if (params.turnSide == "правое") turnFactor = 1;
	if (params.turnSide == "левое") turnFactor = -1;

	//параметры ограждений
	var lastMarsh = false; //секция ограждения на верхнем марше
	var topConnection = false; //стыковка секции ограждения с другой секцией сверху
	var bottomConnection = false; //стыковка секции ограждения с другой секцией снизу



	/*** ПРЯМАЯ ЛЕСТНИЦА  ***/


	if (params.stairModel == "Прямая") {
		if (params.stairAmt1 < 2) {
			alert("Невозможно построить одномаршевую лестницу с количеством ступеней меньше ДВУХ");
			return;
		}
		
		var marshParams1 = {
			botEnd: "floor",
			topEnd: "floor",
			h: params.h1,
			h1: 0,
			b: params.b1,
			a: params.a1,
			stairAmt: params.stairAmt1,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams1 = drawMarsh(marshParams1);
		
		treads.push(marshParams1.treads);
		carcas.push(marshParams1.carcas);
		
		//верхнее перекрытие
		var topStepWidth = a1 + 5.0;
		var topFloorThickness = 300;
		geometry = new THREE.BoxGeometry(M, topFloorThickness, M);
		floorTop = new THREE.Mesh(geometry, floorMaterial);
		floorTop.castShadow = true;
		if (topStairType == "ниже") floorTop.position.y = (stairAmt1 + 1) * h1 - topFloorThickness/2;
		if (topStairType == "вровень") floorTop.position.y = stairAmt1 * h1 - topFloorThickness/2;
		floorTop.position.x = b1 * (stairAmt1 - 1) + topStepWidth + M / 2;
		floorTop.position.z = M/2;
		topFloor.push(floorTop); 
	} //конец прямой
	
	
/***   Г-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


if (stairModel == "Г-образная с площадкой" || stairModel == "Г-образная с забегом") {
	var marshParams1 = {
			botEnd: "floor",
			topEnd: "platform",
			h: params.h1,
			h1: params.h3,
			b: params.b1,
			a: params.a1,
			stairAmt: params.stairAmt1,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		if(stairModel == "Г-образная с забегом") marshParams1.topEnd = "winder"
		marshParams1 = drawMarsh(marshParams1);
		
		treads.push(marshParams1.treads);
		carcas.push(marshParams1.carcas);
		
			var marshParams3 = {
			botEnd: "platform",
			topEnd: "floor",
			h: params.h3,
			h1: params.h3,
			b: params.b3,
			a: params.a3,
			stairAmt: params.stairAmt3,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		if(stairModel == "Г-образная с забегом") marshParams3.botEnd = "winder"
		marshParams3 = drawMarsh(marshParams3);
		
		//позиционируем верхний марш
		var topMarsh = [
			marshParams3.treads,
			marshParams3.carcas,
			]
		var rot = -Math.PI/2
		var x0 = b1 * stairAmt1 + M;
		var	y0 = stairAmt1 * h1 - treadThickness / 2;
		var z0 = M/2 * turnFactor;
		if(stairModel == "Г-образная с забегом"){
			y0 += h3;
			}
		for (var i=0; i<topMarsh.length; i++){
			topMarsh[i].rotation.y = rot;
			topMarsh[i].position.x = x0;
			topMarsh[i].position.y = y0;
			topMarsh[i].position.z = z0;		
			}
		
		treads.push(marshParams3.treads);
		carcas.push(marshParams3.carcas);
		
		//верхнее перекрытие
		var topStepWidth = a1 + 5.0;
		var topFloorThickness = 300;
		geometry = new THREE.BoxGeometry(M, topFloorThickness, M);
		floorTop = new THREE.Mesh(geometry, floorMaterial);
		floorTop.castShadow = true;
		if (topStairType == "ниже") floorTop.position.y = (stairAmt1 + 1) * h1 + (stairAmt3+1) * h3 - topFloorThickness/2;
		if (topStairType == "вровень") floorTop.position.y = floorTop.position.y - h3;
		if(stairModel == "Г-образная с забегом") floorTop.position.y += 2*h3;
		floorTop.position.x = b1 * (stairAmt1 - 1) + topStepWidth + M / 2;
		floorTop.position.z = M + stairAmt3 * b3 + M/2;
		topFloor.push(floorTop); 
	} //конец Г-образной
	
	
/***   П-ОБРАЗНАЯ ЛЕСТНИЦА С ЗАБЕГОМ  ***/

	
if (stairModel == "П-образная с забегом") {
	var marshParams1 = {
			botEnd: "floor",
			topEnd: "winder",
			h: params.h1,
			h1: params.h3,
			b: params.b1,
			a: params.a1,
			stairAmt: params.stairAmt1,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams1 = drawMarsh(marshParams1);
		
		treads.push(marshParams1.treads);
		carcas.push(marshParams1.carcas);
		
		//косоур забега
		
		var marshParams2 = {
			botEnd: "winder",
			topEnd: "winder",
			h: params.h3,
			h1: params.h3,
			b: params.b3,
			a: params.a3,
			stairAmt: 0,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams2 = drawMarsh(marshParams2);
		
		//позиционируем косоур забега
		var middleMarsh = [
			marshParams2.treads,
			marshParams2.carcas,
			]
		var rot = -Math.PI/2
		var x0 = b1 * stairAmt1 + M;
		var	y0 = stairAmt1 * h1 + h3 - treadThickness / 2;
		var z0 = M/2//(M * 2 + params.marshDist) * turnFactor;

		for (var i=0; i<middleMarsh.length; i++){
			middleMarsh[i].rotation.y = rot;
			middleMarsh[i].position.x = x0;
			middleMarsh[i].position.y = y0;
			middleMarsh[i].position.z = z0;		
			}
		
		treads.push(marshParams2.treads);
		carcas.push(marshParams2.carcas);
		
		
		//верхний марш
			var marshParams3 = {
			botEnd: "winder",
			topEnd: "floor",
			h: params.h3,
			h1: params.h3,
			b: params.b3,
			a: params.a3,
			stairAmt: params.stairAmt3,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams3 = drawMarsh(marshParams3);
		
		//позиционируем верхний марш
		var topMarsh = [
			marshParams3.treads,
			marshParams3.carcas,
			]
		var rot = -Math.PI
		var x0 = b1 * stairAmt1 + M/2;
		var	y0 = stairAmt1 * h1 - treadThickness / 2;
		var z0 = (M * 2 + params.marshDist) * turnFactor;
		if(stairModel == "П-образная с забегом"){
			y0 += h3*4;
			}
		for (var i=0; i<topMarsh.length; i++){
			topMarsh[i].rotation.y = rot;
			topMarsh[i].position.x = x0;
			topMarsh[i].position.y = y0;
			topMarsh[i].position.z = z0;		
			}
		
		treads.push(marshParams3.treads);
		carcas.push(marshParams3.carcas);
		
		//верхнее перекрытие
		var topStepWidth = a1 + 5.0;
		var topFloorThickness = 300;
		geometry = new THREE.BoxGeometry(M, topFloorThickness, M);
		floorTop = new THREE.Mesh(geometry, floorMaterial);
		floorTop.castShadow = true;
		if (topStairType == "ниже") floorTop.position.y = (stairAmt1 + 1) * h1 + (stairAmt3+1) * h3 - topFloorThickness/2;
		if (topStairType == "вровень") floorTop.position.y = floorTop.position.y - h3;
		if(stairModel == "Г-образная с забегом") floorTop.position.y += 2*h3;
		floorTop.position.x = b1 * (stairAmt1 - 1) + topStepWidth + M / 2;
		floorTop.position.z = M + stairAmt3 * b3 + M/2;
		topFloor.push(floorTop); 
	} //конец П-образной
	

/***   П-ОБРАЗНАЯ ЛЕСТНИЦА С ЗАБЕГОМ  ***/

	
if (stairModel == "П-образная трехмаршевая") {
	var turn1 = "platform";
	if(turnType_1 == "забег") turn1 = "winder";
	var turn2 = "platform";
	if(turnType_2 == "забег") turn2 = "winder";
	
	var marshParams1 = {
			botEnd: "floor",
			topEnd: turn1,
			h: params.h1,
			h1: params.h2,
			b: params.b1,
			a: params.a1,
			stairAmt: params.stairAmt1,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams1 = drawMarsh(marshParams1);
		
		treads.push(marshParams1.treads);
		carcas.push(marshParams1.carcas);
		
		//средний марш
		
		var marshParams2 = {
			botEnd: turn1,
			topEnd: turn2,
			h: params.h2,
			h1: params.h3,
			b: params.b2,
			a: params.a2,
			stairAmt: stairAmt2,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams2 = drawMarsh(marshParams2);
		
		//позиционируем косоур забега
		var middleMarsh = [
			marshParams2.treads,
			marshParams2.carcas,
			]
		var rot = -Math.PI/2
		var x0 = b1 * stairAmt1 + M;
		var	y0 = stairAmt1 * h1 - treadThickness / 2;
		var z0 = M/2;
		if(turn1 == "winder") y0 += h2*2;

		for (var i=0; i<middleMarsh.length; i++){
			middleMarsh[i].rotation.y = rot;
			middleMarsh[i].position.x = x0;
			middleMarsh[i].position.y = y0;
			middleMarsh[i].position.z = z0;		
			}
		
		treads.push(marshParams2.treads);
		carcas.push(marshParams2.carcas);
		
		
		//верхний марш
			var marshParams3 = {
			botEnd: turn1,
			topEnd: "floor",
			h: params.h3,
			h1: params.h3,
			b: params.b3,
			a: params.a3,
			stairAmt: params.stairAmt3,
			M: params.M,
			treadThickness: treadThickness,
			turnFactor: turnFactor,
			treadOffset: treadOffset,
			treadMaterial: treadMaterial,
			carcasMaterial: metalMaterial,
			treads: new THREE.Object3D(),
			carcas: new THREE.Object3D(),
			angles: new THREE.Object3D(),
			bolz: new THREE.Object3D(),
			}
		marshParams3 = drawMarsh(marshParams3);
		
		//позиционируем верхний марш
		var topMarsh = [
			marshParams3.treads,
			marshParams3.carcas,
			]
		var rot = -Math.PI
		var x0 = b1 * stairAmt1 + M/2;
		var	y0 = (stairAmt1 + 1) * h1 + h2*stairAmt2 - treadThickness / 2;
		var z0 = (M * 2 + b2 * stairAmt2) * turnFactor;
		if(turn1 == "winder") y0 += h2*2;
		if(turn2 == "winder") y0 += h3*2;
			
		for (var i=0; i<topMarsh.length; i++){
			topMarsh[i].rotation.y = rot;
			topMarsh[i].position.x = x0;
			topMarsh[i].position.y = y0;
			topMarsh[i].position.z = z0;		
			}
		
		treads.push(marshParams3.treads);
		carcas.push(marshParams3.carcas);
		
		//верхнее перекрытие
		var topStepWidth = a1 + 5.0;
		var topFloorThickness = 300;
		geometry = new THREE.BoxGeometry(M, topFloorThickness, M);
		floorTop = new THREE.Mesh(geometry, floorMaterial);
		floorTop.castShadow = true;
		if (topStairType == "ниже") floorTop.position.y = (stairAmt1 + 1) * h1 + (stairAmt3+1) * h3 - topFloorThickness/2;
		if (topStairType == "вровень") floorTop.position.y = floorTop.position.y - h3;
		if(stairModel == "Г-образная с забегом") floorTop.position.y += 2*h3;
		floorTop.position.x = b1 * (stairAmt1 - 1) + topStepWidth + M / 2;
		floorTop.position.z = M + stairAmt3 * b3 + M/2;
		topFloor.push(floorTop); 
	} //конец П-образной трехмаршевой
	
	
	
	
	
	
	
	
	
	
	
	function drawStraightStaircase() {
		var stairAmt = params.stairAmt1;

		var dxfBasePoint = {
			"x": 0.0,
			"y": 0.0
		};


		var geometry = new THREE.BoxGeometry(params.a1, treadThickness, params.M);
		var tread;
		for (var i = 0; i < params.stairAmt1; i++) {
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = (h1 * (i + 1) - treadThickness / 2);
			tread.position.x = (b1 * i + a1 / 2);
			tread.position.z = M / 2 * turnFactor;
			tread.castShadow = true;
			treads.push(tread); //scene.add()
			}

		/*верхнее перекрытие*/
		if (platformTop != "площадка") {
			var topStepWidth = a1 + 5.0;
			if (params.model == "ко") topStepWidth = a1;
			if (topFlan == "есть") topStepWidth += 8;
			if (params.topAnglePosition == "вертикальная рамка") {
				topStepWidth = b1 + 80;
				if (params.model == "ко") topStepWidth = a1 + 40;
			}
			geometry = new THREE.BoxGeometry(M, 300, M);
			floorTop = new THREE.Mesh(geometry, floorMaterial);
			floorTop.castShadow = true;
			if (topStairType == "ниже") floorTop.position.y = tread.position.y + h1 - 150 + treadThickness / 2;
			if (topStairType == "вровень") floorTop.position.y = tread.position.y - 150 + treadThickness / 2;
			floorTop.position.x = b1 * (stairAmt - 1) + topStepWidth + M / 2;
			if (stairType == "дпк") floorTop.position.x = b1 * (stairAmt - 1) + dpcWidth * 2 + 15 + M / 2;
			floorTop.position.z = tread.position.z;
			topFloor.push(floorTop); //scene.add()
		}


		/***  КАРКАС ПРЯМОЙ ЛЕСТНИЦЫ  ***/


		var group = new THREE.Object3D(); // группа
		var groupang = new THREE.Object3D(); // группа для уголков

	drawStrightStringer();

	function drawStrightStringer() {

		//нижний модуль
		var moduleParams = {
			rise: h1 - treadThickness,
			step: b1,
			type: "bottom",
			material: metalMaterial,
			dxfBasePoint: {x:0, y:0},
			dxfPrimitivesArr: dxfPrimitivesArr,
			}

		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = moduleParams.cylDiam/2 + a1-b1 + treadOffset;
			module.position.y = 0;
			module.position.z = M/2 * turnFactor;
		carcas.push(module);
		
		//сохраняем позицию нижнего модуля
		var x0 = module.position.x;
		var z0 = module.position.z;
		
		//средние модули
		moduleParams.rise = h1;
		moduleParams.type = "middle";
		
		for (var i=1; i<stairAmt1 - 1; i++){
			moduleParams = drawModule(moduleParams);
			var module = moduleParams.mesh;
				module.position.x = x0 + b1 * i;
				module.position.y = h1 * i - treadThickness;
				module.position.z = z0;
			carcas.push(module);
			}
			
		//сохраняем позицию предпоследнего модуля
		x0 = module.position.x;
		y0 = module.position.y;
		
		//последний модуль
		//средние модули
		moduleParams.rise = h1;
		moduleParams.type = "top";		
		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = x0 + b1; 
			module.position.y = y0 + h1;
			module.position.z = z0;
		carcas.push(module);

	} // end of drawStrightStringers


		/***  ОГРАЖДЕНИЯ ПРЯМОЙ ЛЕСТНИЦЫ  ***/


		//drawStraightRailing();

		function drawStraightRailing() {}; //пустая функция для навигации через список функций
		var bottomEnd = "нет";
		var platformLengthBottom = 0;
		var platformLengthTop = 1000;
		lastMarsh = true;
		topConnection = false;
		bottomConnection = false;
		//правая сторона
		if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
		//if (true) {
			var railingPositionZ = M;
			if(turnFactor == -1) railingPositionZ += 40;
			var railingSide = "right"
				//верхняя площадка
			var topEnd = "нет";
			if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";
			var railingSection2 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection2.position.z = railingPositionZ;

			railing.push(railingSection2)
		}
		/*левая сторона*/
		if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
			var railingSide = "left"
			railingPositionZ = - 20 - 20 * turnFactor;
			var topEnd = "нет";
			if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";
			var railingSection2 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection2.position.z = railingPositionZ;
			railing.push(railingSection2)
		}

		/*заднее ограждение верхней площадки*/
		console.log(topPltRailing_5);
		if (topPltRailing_5 && platformTop == "площадка") {
		//if (backRailing_3 == "есть" && platformTop == "площадка") {

			var platformLength = M;
			var offsetLeft = 50;
			var offsetRight = 50;
			var handrailOffsetLeft = 50;
			var handrailOffsetRight = 50;
			var railingSide = "left"
			var railingSection5 = drawRailingSectionPlatform(
				platformLength, offsetLeft, offsetRight,
				handrailOffsetLeft, handrailOffsetRight, railingSide,
				scale);
			railingSection5.rotation.y = -Math.PI / 2
			railingSection5.position.x = b1 * (stairAmt1) * scale + platformLength_3 * scale + stringerThickness * scale;
			if (model == "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
			railingSection5.position.y = h1 * (stairAmt1 + 1) * scale;
			railingSection5.position.z = 0;
			if(turnFactor == -1) {
				railingSection5.position.x = railingSection5.position.x + 40;
			}

			//scene.add( railingSection5 );
			railing.push(railingSection5)
		}

	} //end of drawStraightStairCase()

	function drawGStaircase() {
		
		if (params.turnSide == "правое") turnFactor = 1;
		if (params.turnSide == "левое") turnFactor = -1;
		
		/*ступени нижний марш*/

			var geometry = new THREE.BoxGeometry(a1, treadThickness, treadWidth);
			var tread;
			var x0 = a1 / 2;
			var y0 = -treadThickness / 2;
			var z0 = M / 2 * turnFactor;
			console.log(x0, y0, z0)
			for (var i = 0; i < stairAmt1; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h1 * (i + 1);
				tread.position.x = x0 + b1 * i;
				tread.position.z = z0;
				tread.castShadow = true;
				treads.push(tread);
			}


		/*подступенки нижний марш*/
		if (riserType == "есть") {
			riserHeight = h1 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

			var riser;
			for (var i = 0; i < stairAmt1 + 1; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.position.y = (h1 * i + riserHeight / 2);
				riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2 + xadd);
				riser.position.z = M / 2 * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}
		}

		if (stairModel == "Г-образная с площадкой") {
			if (stairAmt1 == 0) {
				x0 = -b1;
				y0 = y0;
			} else {
				x0 = tread.position.x - a1 / 2;
				y0 = tread.position.y;
			}
			z0 = M * turnFactor;

			var platformLength = M;


			// Площадка

				geometry = new THREE.BoxGeometry(platformLength, treadThickness, treadWidth);
				//первая половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = h1 + y0;
				tread.position.x = b1 + x0 + platformLength / 2;
				tread.position.z = M / 2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);

		
			y0 = tread.position.y;
			z0 = M * turnFactor;

		}
		// уровень площадки
		var platformH = y0 + treadThickness / 2.0;

		if (stairModel == "Г-образная с забегом") {
			if (stairAmt1 == 0) {
				x0 = -b1
				y0 = y0
			} else {
				x0 = tread.position.x - a1 / 2;
				y0 = tread.position.y;
			}
			z0 = 0;

			var turnFactor = 1;
			if (params.turnSide === "левое") turnFactor = -1;
			var dxfBasePoint = {
				x: 0,
				y: 0
			};

			if (stairModel == "Г-образная с забегом") {
				//задаем параметры блока забежных ступеней 
				turnParams = {
					model: "лт",
					stairModel: params.stairModel,
					marshDist: params.marshDist,
					M: params.M,
					h: params.h3,
					treadThickness: treadThickness,
					stringerThickness: 0,
					treadSideOffset: 0,
					material: timberMaterial,
					turnFactor: turnFactor,
					dxfBasePoint: {x:0, y:0}
				}

				//отрисовываем блок забежных ступеней 	
				var turnSteps = drawTurnSteps(turnParams); //функция в файле drawCarcasPartsLib.js;
				turnSteps.meshes.rotation.y = -0.5 * Math.PI; // * turnFactor;
				turnSteps.meshes.position.x = b1 + x0 + 4.555;
				turnSteps.meshes.position.y = treadThickness / 2 * turnFactor + h1 + y0 - treadThickness * ((1 + turnFactor) * 0.5);
				turnSteps.meshes.position.z = z0 + turnParams.M * turnFactor;
				turnSteps.meshes.castShadow = true;
				treads.push(turnSteps.meshes);
			}

			/*подступенок второй забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6);
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 6 * turnFactor;
				riser.position.y = y0 + riserHeight / 2 + treadThickness / 2 + h1;
				riser.position.x = b1 + x0 + (L1 + L2 / 2) - riserThickness / 2 + 4;
				riser.position.z = M / 2 * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}


			//опорные точки для верхнего марша
			x0 = x0 + b1 + M / 2;
			y0 = (stairAmt1 + 1) * h1 + 2 * h3 - treadThickness / 2;
			z0 = M * turnFactor;

			/*подступенок третьей забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6);
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 3 * turnFactor;
				riser.position.y = y0 - riserHeight / 2 - treadThickness / 2 // + h1;
				riser.position.x = x0 + riserThickness + riserThickness / 2; //+ (L1 + L2) - riserThickness/2;
				riser.position.z = (M - L2 / 2 + L1 - 2) * turnFactor;
				riser.castShadow = true;
				risers.push(riser);

			}

			//смещаем верхний марш
			if (model == "ко") z0 = z0 + (L1 - (a3 - b3)) * turnFactor;
			if (model == "лт" && stairAmt3 == 0) z0 = (M + L1 - (a3 - b3)) * turnFactor;
		}


		/*верхний марш*/

			//корректируем привязку верхнего марша
			x0 = stairAmt1 * b1 + M / 2;
			z0 = (M - (a3-b3)) * turnFactor;
			if (stairModel == "Г-образная с забегом") z0 = z0 + 100;

			geometry = new THREE.BoxGeometry(treadWidth, treadThickness, a3);
			for (var i = 0; i < stairAmt3; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h3 * (i + 1);
				tread.position.x = x0;
				tread.position.z = z0 + (b3 * i + a3 / 2) * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
			}
		

		if (platformTop == "площадка") stairAmt3 = stairAmt3 + 1;

		//базовая точка для верхней площадки
		if (stairAmt3 == 0) {
			platform_x = x0;
			platform_y = y0;
			platform_z = z0 + ((a3 - b3) - a3 / 2) * turnFactor;
		} else {
			platform_x = tread.position.x;
			platform_y = tread.position.y + h3;
			platform_z = tread.position.z + b3 * turnFactor;
		}

		/*подступенки верхний марш*/
		if (riserType == "есть") {
			riserHeight = h3 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

			var riser;
			for (var i = 0; i < stairAmt3; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -0.5 * Math.PI;
				riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness / 2);
				riser.position.x = x0 + xadd;
				riser.position.z = z0 + (b3 * (i - 1) + a3 - riserThickness / 2) * turnFactor + 22 * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}
		}


		/*верхняя площадка*/

		if (platformTop == "площадка") {

				var topPlatformLength = platformLength_3;
				if (params.model == "лт") topPlatformLength = topPlatformLength - stringerThickness - 10;
				var halfPlatformLength = (topPlatformLength - 2) / 2;
				geometry = new THREE.BoxGeometry(treadWidth, treadThickness, halfPlatformLength);
				//первая половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y;
				tread.position.x = platform_x;
				tread.position.z = platform_z + (halfPlatformLength - a3) / 2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
				//вторая половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y;
				tread.position.x = platform_x;
				tread.position.z = platform_z + (halfPlatformLength - a3 + topPlatformLength + 4) / 2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
			
		}

		/*верхнее перекрытие*/

		if (platformTop != "площадка") {

			if (stairType == "дпк") platform_z = platform_z + dpcWidth / 2 * turnFactor

			geometry = new THREE.BoxGeometry(M, 300, M);
			floorTop = new THREE.Mesh(geometry, floorMaterial);
			floorTop.castShadow = true;
			if (topStairType == "ниже") floorTop.position.y = platform_y - h3 - 30 + treadThickness / 2;
			if (topStairType == "вровень") floorTop.position.y = platform_y - h3 - 150 + treadThickness / 2;
			floorTop.position.x = platform_x;
			floorTop.position.z = platform_z + (a3 + M - b3 * 2) / 2 * turnFactor;

			if (params.topAnglePosition == "вертикальная рамка") {
				floorTop.position.z = floorTop.position.z + 40 * turnFactor;
				if (params.model == "лт") floorTop.position.z = floorTop.position.z - 5 * turnFactor;
			}
			topFloor.push(floorTop);
		}

		if (stairModel == "Г-образная с площадкой") {
			stringerTurn = "площадка";
			tyrnLength = M;
		}
		if (stairModel == "Г-образная с забегом") {
			stringerTurn = "забег";
			tyrnLength = M;
		}

		stringerParams = {};

		var group = new THREE.Object3D(); // группа
		var groupang = new THREE.Object3D(); // группа для уголков


		/***  КОСОУР Г-ОБРАЗНАЯ НИЖНИЙ МАРШ   ***/


	drawGStringer1();

	function drawGStringer1() {
	//нижний модуль
		var moduleParams = {
			rise: h1 - treadThickness,
			step: b1,
			type: "bottom",
			material: metalMaterial,
			dxfBasePoint: {x:0, y:0},
			dxfPrimitivesArr: dxfPrimitivesArr,
			}

		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = b1/2 //moduleParams.cylDiam/2 + a1/2 + treadOffset;
			module.position.y = 0;
			module.position.z = M/2 * turnFactor;
		carcas.push(module);
		
		//сохраняем позицию нижнего модуля
		var x0 = module.position.x;
		var z0 = module.position.z;
		
		//средние модули
		moduleParams.rise = h1;
		moduleParams.type = "middle";
		
		for (var i=1; i<stairAmt1 - 1; i++){
			moduleParams = drawModule(moduleParams);
			var module = moduleParams.mesh;
				module.position.x = x0 + b1 * i;
				module.position.y = h1 * i - treadThickness;
				module.position.z = z0;
			carcas.push(module);
			}
					
		//сохраняем позицию предпоследнего модуля
		x0 = module.position.x;
		y0 = module.position.y;
		
		//последний модуль
		if(stairModel == "Г-образная с площадкой") {		
			var platformModuleStep = (params.M + params.b1)/ 2;
			moduleParams.step = platformModuleStep;
			moduleParams = drawModule(moduleParams);
				var module = moduleParams.mesh;
					module.position.x = x0 + b1;
					module.position.y = y0 + h1;
					module.position.z = z0;
				carcas.push(module);
			
			}
		if (stairModel == "Г-образная с забегом") {
			//модули забега
			moduleParams.rise = h1;
			moduleParams = drawModule(moduleParams);
			var module = moduleParams.mesh;
				module.position.x = x0 + b1;
				module.position.y = y0 + h1;
				module.position.z = z0;
			carcas.push(module);
			
			moduleParams.rise = h1;
			moduleParams.step = params.M/2 - b1/2;
			moduleParams = drawModule(moduleParams);
			var module = moduleParams.mesh;
				module.position.x = x0 + b1 + b1;
				module.position.y = y0 + h1 + h1;
				module.position.z = z0;
			carcas.push(module);
			}
				
		//сохраняем позицию предпоследнего модуля
		x0 = module.position.x;
		y0 = module.position.y;
		

	} // end of drawGStringer1()

	

		/*** КОСОУРЫ Г-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

	var topStringer = new THREE.Object3D();
		
	drawGStringers3();

	function drawGStringers3() {
	
	
	//нижний модуль
	if(stairModel == "Г-образная с площадкой") {
		var platformModuleStep = (params.M + 127)/ 2 + 5;
		var moduleParams = {
			rise: h1,
			step: platformModuleStep,
			type: "middle",
			material: metalMaterial,
			dxfBasePoint: {x:0, y:0},
			dxfPrimitivesArr: dxfPrimitivesArr,
			}

		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = 0;
			module.position.y = 0;
			module.position.z = 0;
		topStringer.add(module);
		}
		if (stairModel == "Г-образная с забегом") {
		var platformModuleStep = params.M/2 - b3/2 + 80;
		var moduleParams = {
			rise: h3, 
			step: platformModuleStep,
			type: "middle",
			material: metalMaterial,
			dxfBasePoint: {x:0, y:0},
			dxfPrimitivesArr: dxfPrimitivesArr,
			}

		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = 0;
			module.position.y = 0;
			module.position.z = 0;
		topStringer.add(module);
		}
		
		//сохраняем позицию нижнего модуля
		var x0 = platformModuleStep;
		var y0 = h1;
		if (stairModel == "Г-образная с забегом") y0 = h3;
		var z0 = module.position.z;
		
		//средние модули
		moduleParams.step = b3;
		moduleParams.rise = h3;
		var modAmt3 = stairAmt3 - 1; //кол-во модулей в верхнем марше
		if (stairModel == "Г-образная с забегом") modAmt3 = stairAmt3;
		for (var i=0; i<modAmt3; i++){
			moduleParams = drawModule(moduleParams);
			var module = moduleParams.mesh;
				module.position.x = x0 + b3 * i;
				module.position.y = y0 + h3 * i;
				module.position.z = z0;
			topStringer.add(module);
			}
			
		//сохраняем позицию предпоследнего модуля
		x0 = module.position.x;
		y0 = module.position.y;
		
		//последний модуль
		//средние модули
		moduleParams.type = "top";		
		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = x0 + b3; 
			module.position.y = y0 + h3;
			module.position.z = z0;
		topStringer.add(module);
	
		
	} //end of drawGStringers3()

	//позиция верхнего косоура
	topStringer.rotation.y = - Math.PI/2;
	topStringer.position.x = b1*stairAmt1 + M/2;
	topStringer.position.y = stairAmt1 * h1 - treadThickness;
	if (stairModel == "Г-образная с забегом") topStringer.position.y = (stairAmt1 + 1) * h1 - treadThickness;
	topStringer.position.z = M/2 * turnFactor;
	carcas.push(topStringer);

		/*** УГОЛКИ Г-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/


		//drawGAngles3();

		// позиция группы
		/*
		var shiftb = turnFactor > 0 ? stringerParams.M : 0.0;
		if (model == "ко") {
			group.position.set(b1 * stairAmt1 + 50.0 + shiftb, platformH - treadThickness - 150.0,
				(M - stringerSideOffset - a3 + b3) * turnFactor);
			groupang.position.set(b1 * stairAmt1 + 50.0 + shiftb, platformH - treadThickness - 150.0,
				(M - stringerSideOffset - a3 + b3) * turnFactor);
		} else {
			group.position.set(b1 * stairAmt1 + 30.0 + 5.0 + shiftb, platformH + 5.0, M * turnFactor);
			groupang.position.set(b1 * stairAmt1 + 30.0 + 5.0 + shiftb, platformH + 5.0, M * turnFactor);
		}
		group.rotation.y -= Math.PI * 0.5 * turnFactor;
		groupang.rotation.y -= Math.PI * 0.5 * turnFactor;
		carcas.push(group);
		angles.push(groupang);
		*/

		/***  ОГРАЖДЕНИЯ Г-ОБРАЗНАЯ  ***/


		function drawGRailing() {}; //пустая функция для навигации через список функций
		/*замыкание поручней внешних секций верхнего и нижнего маршей*/
		var outerHandrailConnection = false;
		var isSection1 = false;
		var isSection3 = false;
		if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
		if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
		if (isSection1 && isSection3) outerHandrailConnection = true;
		lastMarsh = false;

		/*внешняя сторона нижнего марша*/

		if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
			var topEnd = "площадка";
			if (stairModel == "Г-образная с забегом") topEnd = "забег";
			var bottomEnd = "нет";
			var platformLengthBottom = 0;
			var platformLengthTop = M;
			var railingSide = "left"
			topConnection = outerHandrailConnection;
			bottomConnection = false;
			railingPositionZ = -40 * turnFactor;
			var railingSection1 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, (stairAmt1 + 1), h1, b1, a1, h3, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection1.position.z = railingPositionZ * scale;
			//scene.add( railingSection1 );
			railing.push(railingSection1)
		}

		/*внутренняя сторона нижнего марша*/

		if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
			var topEnd = "нет";
			var bottomEnd = "нет";
			var platformLengthBottom = 0;
			var platformLengthTop = 0;
			var railingSide = "right"
			railingPositionZ = M * turnFactor;
			var railingSection2 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt1, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection2.position.z = railingPositionZ * scale;
			//scene.add( railingSection2 );
			railing.push(railingSection2)
		}


		/*внешняя сторона верхнего марша*/
		lastMarsh = true;

		if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
			console.log("dfasdfasd");
			var topEnd = platformTop;
			var bottomEnd = "площадка";
			if (stairModel == "Г-образная с забегом") bottomEnd = "забег";
			var platformLengthTop = platformLength_3;
			var platformLengthBottom = M;
			var railingSide = "left"
			topConnection = false;
			bottomConnection = outerHandrailConnection;
			railingPositionZ = M * turnFactor;
			//верхняя площадка
			var topEnd = "нет";
			if (topPltRailing_3 && platformTop == "площадка") {
				 topEnd = "площадка";
				 console.log("fas");
			}

			var railingSection3 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt3, h3, b3, a3, h2, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection3.rotation.y = (-Math.PI / 2) * turnFactor
			railingSection3.position.x = b1 * stairAmt1 + 30 + M + M / 2; //stringer3.position.x + 
			if (model == "ко") railingSection3.position.x = railingSection3.position.x - stringerSideOffset * scale;
			railingSection3.position.y = h1 * (stairAmt1 + 1) * scale // + h3*scale;
			if (stairModel == "Г-образная с забегом") railingSection3.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h3 * scale;
			railingSection3.position.z = M * turnFactor; //
			//scene.add( railingSection3 );
			railing.push(railingSection3)
		}

		/*внутренняя сторона верхнего марша*/

		if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
			var topEnd = platformTop;
			var bottomEnd = "нет";
			var platformLengthTop = platformLength_3;
			var platformLengthBottom = 0;
			var railingSide = "right"
			railingPositionZ = M * turnFactor;
			//верхняя площадка
			var topEnd = "нет";
			if (topPltRailing_4 && platformTop == "площадка") {
				topEnd = "площадка";
			}
			var railingSection4 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt3, h3, b3, a3, h3, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection4.rotation.y = -Math.PI / 2 * turnFactor
			railingSection4.position.x = b1 * stairAmt1 - 30 + M / 2; //stringer4.position.x 
			if (model == "ко") railingSection4.position.x = railingSection4.position.x - stringerSideOffset * scale;
			railingSection4.position.y = h1 * (stairAmt1 + 1) * scale // + h3*scale;
			if (stairModel == "Г-образная с забегом") railingSection4.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h3 * scale;
			railingSection4.position.z = M * turnFactor; //stringer4.position.z
			railing.push(railingSection4)
		}

		/*заднее ограждение верхней площадки*/
		if (topPltRailing_5 && platformTop == "площадка") {

			var platformLength = M;
			var offsetLeft = 50;
			var offsetRight = 50;
			var handrailOffsetLeft = 50;
			var handrailOffsetRight = 50;
			var railingSide = "right"
			if (railingModel == "Самонесущее стекло") railingSide = "left"

			var railingSection5 = drawRailingSectionPlatform(
				platformLength, offsetLeft, offsetRight,
				handrailOffsetLeft, handrailOffsetRight, railingSide,
				scale)
			railingSection5.position.x = platform_x - M / 2 * scale;
			railingSection5.position.y = h1 * (stairAmt1 + 1) + h3 * stairAmt3 ;//platformStringer1.position.y + 
			railingSection5.position.z = (M  + a3 - b3 + b3 * stairAmt3  + platformLength_3 - a3 + 22 * turnFactor + 20) * turnFactor + 20;
			if (stairModel == "Г-образная с забегом") {
				railingSection5.position.y += 2 * h3;
				//railingSection5.position.z += 40 * turnFactor;
			}
			
			railing.push(railingSection5)
		}
	} //end of drawGStairCase()

	
	/*** П-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


	if (stairModel == "П-образная с площадкой" || stairModel == "П-образная с забегом") {
		//drawPStairCase();
	}

	function drawPStairCase() {
		var xadd = (model == "ко") ? 0.0 : 5.0;

		var dxfBasePoint = {
			"x": 0.0,
			"y": 0.0
		};

		/*ступени нижний марш*/

		if (stairType != "дпк") {
			var geometry = new THREE.BoxGeometry(a1, treadThickness, treadWidth);
			var tread;
			var x0 = a1 / 2;
			var y0 = -treadThickness / 2;
			var z0 = M / 2 * turnFactor;
			for (var i = 0; i < stairAmt1; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h1 * (i + 1);
				tread.position.x = x0 + (b1 * i + xadd);
				tread.position.z = z0;
				tread.castShadow = true;
				treads.push(tread);
			}
		}

		if (stairType == "дпк") {
			geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
			var tread;
			for (var i = 0; i < stairAmt1; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = (h1 * (i + 1) - treadThickness / 2);
				tread.position.x = (b1 * i + dpcWidth / 2 + xadd);
				tread.position.z = M / 2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
			}
			var tread2;
			for (var i = 0; i < stairAmt1; i++) {
				tread2 = new THREE.Mesh(geometry, treadMaterial);
				tread2.position.y = (h1 * (i + 1) - treadThickness / 2);
				tread2.position.x = (b1 * i + dpcWidth / 2 + 150.0 + xadd);
				tread2.position.z = M / 2 * turnFactor;
				tread2.castShadow = true;
				treads.push(tread2);
			}
		}

		/*подступенки нижний марш*/
		if (riserType == "есть") {
			riserHeight = h1 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

			var riser;
			for (var i = 0; i < stairAmt1 + 1; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.position.y = (h1 * i + riserHeight / 2);
				riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2 + xadd);
				riser.position.z = M / 2 * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}
		}

		if (stairModel == "П-образная с площадкой") {
			if (stairAmt1 == 0) {
				x0 = -b1;
				y0 = y0;
			} else {
				x0 = tread.position.x - a1 / 2;
				y0 = tread.position.y;
			}
			z0 = M * turnFactor;

			var platformLength = platformLength_1;
			var platformWidth = platformWidth_1;
			var platformShiftLt = (model == "ко") ? 0.0 : stringerThickness;

			// Площадка
			if (stairType != "дпк") {
				var halfPlatformLength = (platformLength - 2) / 2;
				if (model == "лт") halfPlatformLength = halfPlatformLength - 2;
				geometry = new THREE.BoxGeometry(halfPlatformLength, treadThickness, platformWidth - platformShiftLt * 2.0);
				//первая половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = h1 + y0;
				tread.position.x = b1 + x0 + halfPlatformLength / 2;
				tread.position.z = platformWidth / 2.0 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
				//вторя половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = h1 + y0;
				tread.position.x = b1 + x0 + halfPlatformLength / 2 + platformLength / 2 + 2;
				if (model == "лт") tread.position.x = tread.position.x - 2;
				tread.position.z = platformWidth / 2.0 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
			}
			if (stairType == "дпк") {
				var x00 = stairAmt1 * b1 + dpcWidth / 2 + xadd;
				geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, platformWidth - platformShiftLt * 2.0);
				var deckAmt = Math.floor(platformLength / (dpcWidth + 5))
				var tread;
				for (var i = 0; i < deckAmt; i++) {
					tread = new THREE.Mesh(geometry, treadMaterial);
					tread.position.y = h1 + y0;
					tread.position.x = x00 + i * (dpcWidth + 5);
					tread.position.z = platformWidth / 2.0 * turnFactor;
					tread.castShadow = true;
					treads.push(tread);
				}
				//последняя урезанная доска
				var lastDeckWidth = platformLength - deckAmt * (dpcWidth + 5) - 5;
				if (lastDeckWidth) {
					console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми")
					geometry = new THREE.BoxGeometry(lastDeckWidth, treadThickness, platformWidth - platformShiftLt * 2.0);
					tread = new THREE.Mesh(geometry, treadMaterial);
					tread.position.y = h1 + y0;
					tread.position.x = x00 + deckAmt * (dpcWidth + 5) + (lastDeckWidth - dpcWidth) / 2;
					tread.position.z = platformWidth / 2.0 * turnFactor;
					tread.castShadow = true;
					treads.push(tread);
				}

			}

			y0 = tread.position.y;
			z0 = (platformWidth - M) * turnFactor;

			//смещаем верхний марш
			if (model == "ко") {
				x0 = x0 + a3 + (a3 - b3);
			} else {
				x0 = x0 + a3 + (40.0 - 5.0);
			}
			//if (model == "лт" && stairAmt3 == 0) z0 = M * turnFactor - (a3 - b3) * turnFactor;
		}
		// уровень площадки
		var platformH = y0 + treadThickness / 2.0;


		if (stairModel == "П-образная с забегом") {
			if (stairAmt1 == 0) {
				x0 = -b1
				y0 = y0 + h1;
			} else {
				x0 = tread.position.x - a1 / 2;
				y0 = tread.position.y + h1;
			}
			z0 = 0; //M;

			/* забежная ступень 1 */
			var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep1 = new THREE.Mesh(geom, treadMaterial);
			turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep1.position.x = b1 + x0;
			turnStep1.position.y = treadThickness / 2 * turnFactor + y0;
			turnStep1.position.z = z0;
			turnStep1.castShadow = true;
			treads.push(turnStep1);

			/* забежная ступень 2 */

			geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep2 = new THREE.Mesh(geom, treadMaterial);
			turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep2.position.x = b1 + x0;
			turnStep2.position.y = turnStep1.position.y + h3;
			turnStep2.position.z = 0;
			turnStep2.castShadow = true;
			treads.push(turnStep2);


			/* забежная ступень 3 */

			geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep3 = new THREE.Mesh(geom, treadMaterial);
			turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
			turnStep3.rotation.z = 0.5 * Math.PI;
			turnStep3.position.x = b1 + M + x0;
			turnStep3.position.y = turnStep2.position.y + h3 - treadThickness * turnFactor;
			turnStep3.position.z = (M + stepWidthLow) * turnFactor;
			turnStep3.castShadow = true;
			treads.push(turnStep3);

			/*удлиннение 3 забежной ступени*/
			if (model == "ко") {
				var extraTread;
				geometry = new THREE.BoxGeometry(treadWidth, treadThickness, marshDist);
				extraTread = new THREE.Mesh(geometry, treadMaterial);
				extraTread.position.x = turnStep3.position.x - M / 2;
				extraTread.position.y = turnStep3.position.y + treadThickness / 2 * turnFactor;
				extraTread.position.z = turnStep3.position.z + marshDist / 2 * turnFactor;
				extraTread.castShadow = true;
				treads.push(extraTread);
			}

			if (model == "лт" && marshDist > 70) {
				var extraTread;
				geometry = new THREE.BoxGeometry(treadWidth, treadThickness, (marshDist - 70));
				extraTread = new THREE.Mesh(geometry, treadMaterial);
				extraTread.position.x = turnStep3.position.x - M / 2;
				extraTread.position.y = turnStep3.position.y + treadThickness / 2;
				extraTread.position.z = turnStep3.position.z + (marshDist - 70) / 2 * turnFactor;
				extraTread.castShadow = true;
				treads.push(extraTread);
			}

			/* забежная ступень 4 */

			var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep4 = new THREE.Mesh(geom, treadMaterial);
			turnStep4.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep4.rotation.z = 0.5 * Math.PI;
			turnStep4.position.x = x0 + b1 + M;
			turnStep4.position.y = turnStep1.position.y + h3 * 3;
			turnStep4.position.z = z0 + (M + marshDist) * turnFactor;
			turnStep4.castShadow = true;
			treads.push(turnStep4);

			/* забежная ступень 5 */

			geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep5 = new THREE.Mesh(geom, treadMaterial);
			turnStep5.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep5.rotation.z = 0.5 * Math.PI;
			turnStep5.position.x = b1 + x0 + M;
			turnStep5.position.y = turnStep1.position.y + h3 * 4;
			turnStep5.position.z = 0 + (marshDist + M) * turnFactor;
			turnStep5.castShadow = true;
			treads.push(turnStep5);

			/* забежная ступень 6 */

			geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep6 = new THREE.Mesh(geom, treadMaterial);
			turnStep6.rotation.x = -0.5 * Math.PI * turnFactor;
			turnStep6.rotation.z = 0 * Math.PI;
			turnStep6.position.x = b1 + x0 - stepWidthLow;
			turnStep6.position.y = -treadThickness * turnFactor + turnStep1.position.y + h3 * 5;
			turnStep6.position.z = (2 * M + marshDist) * turnFactor;
			turnStep6.castShadow = true;
			treads.push(turnStep6);


			/*подступенок второй забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 6 * turnFactor;
				riser.position.x = turnStep1.position.x + (L1 + L2 / 2) - riserThickness / 2 * turnFactor;
				riser.position.y = turnStep1.position.y + riserHeight / 2;
				riser.position.z = turnStep1.position.z + M / 2 * turnFactor;
				if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
				riser.castShadow = true;
				risers.push(riser);
			}


			/*подступенок третьей забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 3 * turnFactor;
				riser.position.x = turnStep2.position.x + M / 2; // + (L1 + L2) - riserThickness/2;
				riser.position.y = turnStep2.position.y + riserHeight / 2;
				riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * turnFactor;
				if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
				riser.castShadow = true;
				risers.push(riser);
			}

			/*подступенок четвертой забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 2 * turnFactor;
				riser.position.x = turnStep3.position.x - M / 2;
				riser.position.y = turnStep4.position.y - riserHeight / 2 - treadThickness * turnFactor;
				if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
				riser.position.z = turnStep4.position.z - (riserThickness / 2 - L1) * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}

			/*подступенок пятой забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = Math.PI / 3 * turnFactor;
				riser.position.x = turnStep3.position.x - M / 2;
				riser.position.y = turnStep5.position.y - riserHeight / 2 - treadThickness * turnFactor;
				if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
				riser.position.z = turnStep5.position.z - (riserThickness / 2 - L1 - L2 / 2) * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}

			/*подступенок шестой забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = Math.PI / 6 * turnFactor;
				riser.position.x = turnStep3.position.x - M + L2 / 2 - L1 + riserThickness / 2;
				riser.position.y = turnStep6.position.y - riserHeight / 2; // - treadThickness
				if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
				riser.position.z = turnStep6.position.z - M / 2 * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}


			x0 = turnStep6.position.x + stepWidthLow;
			y0 = turnStep6.position.y + treadThickness / 2 * turnFactor;
			z0 = turnStep6.position.z - M * turnFactor;

			if (model == "ко") x0 = x0 + (a3 - b3) - stepWidthLow;

		}

		//корректируем привязку верхнего марша
		x0 = stairAmt1 * b1 + 30.0;
		if (model == "ко") x0 = stairAmt1 * b1 + (a3 - b3);

		/*верхний марш*/
		if (stairType != "дпк") {
			geometry = new THREE.BoxGeometry(a3, treadThickness, treadWidth);

			for (var i = 0; i < stairAmt3; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h3 * (i + 1);
				tread.position.x = x0 - (b3 * i + a3 / 2);
				tread.position.z = z0 + M / 2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
			}
		}
		if (stairType == "дпк") {
			geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
			var tread;
			for (var i = 0; i < stairAmt3; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h3 * (i + 1);
				tread.position.x = x0 - (b3 * i + dpcWidth / 2 + xadd);
				tread.position.z = z0 + M / 2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
			}
			var tread2;
			for (var i = 0; i < stairAmt3; i++) {
				tread2 = new THREE.Mesh(geometry, treadMaterial);
				tread2.position.y = y0 + h3 * (i + 1);
				tread2.position.x = x0 - (b3 * i + dpcWidth / 2 + 150.0 + xadd);
				tread2.position.z = z0 + M / 2 * turnFactor;
				tread2.castShadow = true;
				treads.push(tread2);
			}
		}

		if (platformTop == "площадка") stairAmt3 = stairAmt3 + 1;

		//базовая точка для верхней площадки
		if (stairAmt3 == 0) {
			platform_x = x0;
			platform_y = y0;
			platform_z = z0 + ((a3 - b3) - a3 / 2) * turnFactor;
		} else {
			platform_x = tread.position.x + (a3 - b3);
			platform_y = tread.position.y + h3;
			platform_z = tread.position.z;
		}

		/*подступенки верхний марш*/
		if (riserType == "есть") {
			riserHeight = h3 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

			var riser;
			for (var i = 0; i < stairAmt3; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = 0.0;
				riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness / 2);
				riser.position.x = x0 - (b3 * (i - 1) + a3 - riserThickness / 2);
				riser.position.z = z0 + M / 2 * turnFactor;
				riser.castShadow = true;
				risers.push(riser);
			}
		}

		/*верхняя площадка*/

		if (platformTop == "площадка") {
			if (stairType != "дпк") {
				var topPlatformLength = platformLength_3;
				if (model == "лт") topPlatformLength = topPlatformLength - stringerThickness - 10;
				var halfPlatformLength = (topPlatformLength - 2) / 2;
				geometry = new THREE.BoxGeometry(halfPlatformLength, treadThickness, treadWidth);
				//первая половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y;
				tread.position.x = platform_x - (halfPlatformLength + a3) / 2;
				tread.position.z = platform_z;
				tread.castShadow = true;
				treads.push(tread);
				//вторая половина щита
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y;
				tread.position.x = platform_x - (halfPlatformLength + a3 + topPlatformLength + 4) / 2;
				tread.position.z = platform_z;
				tread.castShadow = true;
				treads.push(tread);
			}
			if (stairType == "дпк") {
				//x0 = stairAmt1 * b1 + dpcWidth / 2 + xadd;
				geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
				var deckAmt = Math.floor(platformLength_3 / (dpcWidth + 5))
				var tread;
				console.log(deckAmt)
				for (var i = 0; i < deckAmt; i++) {
					tread = new THREE.Mesh(geometry, treadMaterial);
					tread.position.y = platform_y;
					tread.position.x = platform_x - b3 - i * (dpcWidth + 5);
					tread.position.z = platform_z;
					tread.castShadow = true;
					treads.push(tread);
				}
				//последняя урезанная доска
				var lastDeckWidth = platformLength_3 - deckAmt * (dpcWidth + 5) - 15 - stringerThickness;
				if (lastDeckWidth) {
					console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми")
					geometry = new THREE.BoxGeometry(lastDeckWidth, treadThickness, treadWidth);
					tread = new THREE.Mesh(geometry, treadMaterial);
					tread.position.y = platform_y;
					tread.position.x = platform_x - b3 - (deckAmt * (dpcWidth + 5) + (lastDeckWidth - dpcWidth) / 2);
					tread.position.z = platform_z;
					tread.castShadow = true;
					treads.push(tread);
				}

			}
		}

		/*верхнее перекрытие*/

		if (platformTop != "площадка") {
			geometry = new THREE.BoxGeometry(M, 300, M);
			floorTop = new THREE.Mesh(geometry, floorMaterial);
			floorTop.castShadow = true;
			platform_x = tread.position.x;

			platform_y = tread.position.y;
			platform_z = tread.position.z;
			if (topStairType == "ниже") floorTop.position.y = platform_y + h3 - 150 + treadThickness / 2;
			if (topStairType == "вровень") floorTop.position.y = platform_y - 150 + treadThickness / 2;
			floorTop.position.x = platform_x - (a3 + M) / 2;
			if (topFlan == "есть") floorTop.position.x += -8;
			floorTop.position.z = platform_z;

			if (params.topAnglePosition == "вертикальная рамка") {
				//floorTop.position.x = floorTop.position.x - 40;
				if (params.model == "лт") floorTop.position.x = floorTop.position.x - 35;
			}
			topFloor.push(floorTop);
		}


		if (stairModel == "П-образная с площадкой") {
			stringerTurn = "площадка";
			tyrnLength = M;
		}
		if (stairModel == "П-образная с забегом") {
			stringerTurn = "забег";
			tyrnLength = M;
		}

		stringerParams = {};

		var group = new THREE.Object3D(); // группа
		var groupang = new THREE.Object3D(); // группа для уголков


		/***  КОСОУРЫ П-ОБРАЗНАЯ НИЖНИЙ МАРШ   ***/


		drawPStringers1();

		function drawPStringers1() {
			stringerParams = {
				model: model,
				stringerTurn: stringerTurn,
				stringerType: stringerType,
				botEnd: "floor",
				botEndLength: 0,
				topEnd: "platformP",
				topEndLength: tyrnLength,
				stringerThickness: stringerThickness,
				stringerSideOffset: stringerSideOffset,
				M: M,
				treadWidth: treadWidth,
				treadThickness: treadThickness,
				h: h1,
				h3: h3,
				b: b1,
				a: a1,
				stairAmt: stairAmt1 + 1,
				topFlan: topFlan,
				stairFrame: stairFrame,
				bridgeThickness: 8.0,
				topAnglePosition: params.topAnglePosition,
				bottomAngleType: params.bottomAngleType,
				botFloorType: params.botFloorType,
				botFloorsDist: params.botFloorsDist,
				platformLength_1: platformLength_1,
				platformWidth_1: platformWidth_1,
				botFrameHoleX: 45.0, // для рамок 40x20
				topFrameHoleX: 55.0, // для рамок 60x30
				dxfBasePoint: dxfBasePoint,
				dxfBasePointGap: 100.0,
				elmIns: {}, // точки размещения уголков и рамок
			};

			if (platformTop == "площадка") {
				stringerParams.topEnd = "platformG";
				stringerParams.topEndLength = params.platformLength_3;
			}

			if (params.model == "ко" && stairModel == "П-образная с забегом") {
				stringerParams.topEnd = "winder";
			}
			/*косоур верхнего марша*/

			stringerParams.key = "out";
			if (params.model == "ко") stringerParams = drawStringerMk(stringerParams);
			var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.position.x = 0;
			stringer1.position.y = 0;
			stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
			stringer1.castShadow = true;
			carcas.push(stringer1);

			//сохраняем позицию косоура
			stringerParams.stringer1_pos = stringer1.position;


			/*промежуточная площадка*/

			stringerParams.dxfBasePoint = {
				"x": 0.0,
				"y": 1500.0
			};
			//var rearStringer, sideStringer;
			if (model == "ко" && stairModel == "П-образная с площадкой") {
				//задняя тетива площадки
				p0 = {
					x: b1 * stairAmt1 + platformLength / 2 + stringerParams.stringerThickness / 2,
					y: h1 * (stairAmt1 + 1) - treadThickness,
					z: (stringerThickness / 2 + M / 2) * turnFactor //stringerSideOffset + stringerThickness
				};
				drawRearStringerPKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
			}

		} // end of drawPStringers1()


		/*** УГОЛКИ П-ОБРАЗНАЯ НИЖНИЙ МАРШ ***/


		//drawPAngles1();

		// позиция группы
		var shifta = turnFactor < 0 ? -stringerParams.M : 0.0;
		group.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
		groupang.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
		carcas.push(group);
		angles.push(groupang);


		group = new THREE.Object3D(); // группа поворота
		groupang = new THREE.Object3D(); // группа поворота для уголков

		/***  КОСОУРЫ П-ОБРАЗНАЯ СРЕДНИЙ МАРШ   ***/

		if (params.model == "ко" && stairModel == "П-образная с забегом") {
			drawPStringers2();
		}

		function drawPStringers2() {

			stringerParams.botEnd = "winder";
			stringerParams.topEnd = "winder";
			stringerParams.stairAmt = 0;
			stringerParams.h = h3;
			stringerParams.b = b3;
			stringerParams.a = a3;

			if (params.model == "лт") stringerParams.topEndLength = platformLength + 15.0;
			if (params.model == "ко") stringerParams.topEndLength = 1000;

			var lengthKo = 2000;

			/*внешний косоур среднего марша*/

			stringerParams.dxfBasePoint = {
				"x": 7500.0,
				"y": 3000.0
			};

			stringerParams.key = "out";
			if (params.model == "ко") stringerParams = drawStringerMk(stringerParams);
			var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.rotation.y = -0.5 * Math.PI * turnFactor;
			stringer1.position.x = b1 * stairAmt1 + M / 2 + stringerParams.stringerThickness / 2;
			stringer1.position.y = h1 * (stairAmt1) - (215 - h1) + h3 - 40;
			stringer1.position.z = (M / 2 + stringerParams.stringerThickness / 2) * turnFactor;
			stringerParams.stringerTopOut = stringer1;
			carcas.push(stringer1);

			//сохраняем позицию косоура
			stringerParams.stringer1_pos = stringer1.position;

		} // end of drawPStringers2()


		/*** КОСОУРЫ П-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

		drawPStringers3();

		function drawPStringers3() {
			stringerParams.botEnd = "platformP";
			stringerParams.topEnd = "floor";
			stringerParams.stairAmt = stairAmt3;
			stringerParams.h = h3;
			stringerParams.h3 = h3;
			stringerParams.b = b3;
			stringerParams.a = a3;
			stringerParams.botFrameHoleX = 55.0; // для рамок 60x30
			stringerParams.topFrameHoleX = 45.0; // для рамок 40x20

			if (platformTop == "площадка") {
				stringerParams.topEnd = "platformG";
				stringerParams.topEndLength = params.platformLength_3;
				stringerParams.botEndLength = params.platformLength_3;
			}

			if (params.model == "лт") stringerParams.botEndLength = platformLength + 2.0;
			if (params.model == "ко") stringerParams.botEndLength = params.platformLength_3;

			if (params.model == "ко" && stairModel == "П-образная с забегом") {
				stringerParams.botEnd = "winder";
				stringerParams.stairAmt += 1;
			}
			/*косоур верхнего марша*/
			stringerParams.key = "out";
			if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
			if (params.model == "ко") stringerParams = drawStringerMk(stringerParams);
			if (stairModel == "П-образная с площадкой") {
				var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.position.set(-platformLength_1 + stringerParams.a + 50, 0.0, stringerSideOffset); // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
				stringer3.castShadow = true;
				group.add(stringer3);
			}
			if (stairModel == "П-образная с забегом") {
				var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -Math.PI * turnFactor;
				stringer3.position.x = b1 * (stairAmt1 + 2);
				stringer3.position.y = h1 * (stairAmt1) - (215 - h1) + h3 - 40 + h3 * 3;
				stringer3.position.z = (M + marshDist + stringerSideOffset + stringerThickness/2) * turnFactor + stringerThickness/2;
				stringer3.castShadow = true;
				carcas.push(stringer3);

			}

		} //end of drawPStringers3()


		/*** УГОЛКИ П-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/


		//drawPAngles3();


		// позиция группы
		var shiftb = turnFactor < 0 ? stringerParams.M : 0.0;
		if (model == "ко") {
			group.position.set(b1 * stairAmt1 + a1, platformH - treadThickness - 150.0,
				platformWidth * turnFactor + shiftb);
			groupang.position.set(b1 * stairAmt1 + a1, platformH - treadThickness - 150.0,
				platformWidth * turnFactor + shiftb);
		} else {
			group.position.set(b1 * stairAmt1, platformH + 5.0, platformWidth * turnFactor + shiftb);
			groupang.position.set(b1 * stairAmt1, platformH + 5.0, platformWidth * turnFactor + shiftb);
		}
		group.rotation.y -= Math.PI;
		groupang.rotation.y -= Math.PI;
		carcas.push(group);
		angles.push(groupang);


		/***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ЛЕСТНИЦЫ  ***/


		drawPRailing();

		function drawPRailing() {

			/*замыкание поручней внешних секций верхнего и нижнего маршей*/
			var outerHandrailConnection = false;
			var outerHandrailConnection1 = false;
			var outerHandrailConnection2 = false;
			var isSection1 = false;
			var isSection2 = false;
			var isSection3 = false;
			if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
			if (backRailing_1 == "есть" || backRailing_2 == "есть") isSection2 = true;
			if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
			if (isSection1 && isSection2) outerHandrailConnection1 = true;
			if (isSection2 && isSection3) outerHandrailConnection2 = true;

			lastMarsh = false;

			/*внешняя сторона нижнего марша*/

			if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
				var topEnd = "площадка";
				var bottomEnd = "нет";
				var platformLengthBottom = 0;
				var platformLengthTop = platformLength_1;
				if (stairModel == "П-образная с забегом") {
					topEnd = "забег";
					platformLengthTop = M;
				}
				var railingSide = "left";
				topConnection = outerHandrailConnection1;
				bottomConnection = false;
				railingPositionZ = -40 * turnFactor;
				var railingSection1 = drawRailingSection(
					bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
					railingSide, (stairAmt1 + 1), h1, b1, a1, h3, scale, lastMarsh, topConnection, bottomConnection);
				railingSection1.position.z = railingPositionZ;
				railing.push(railingSection1);
			}


			/*внутренняя сторона нижнего марша*/

			if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
				var topEnd = "нет";
				var bottomEnd = "нет";
				var platformLengthBottom = 0;
				var platformLengthTop = 0;
				var railingSide = "right";
				topConnection = false;
				bottomConnection = false;
				railingPositionZ = M * turnFactor;
				var railingSection2 = drawRailingSection(
					bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
					railingSide, stairAmt1, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection);;
				railingSection2.position.z = railingPositionZ;
				railing.push(railingSection2);
			}

			/*внешняя сторона верхнего марша*/

			lastMarsh = true;

			if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
				var topEnd = "нет";
				var bottomEnd = "площадка";
				var platformLengthTop = platformLength_3;
				var platformLengthBottom = platformLength_1;
				if (stairModel == "П-образная с забегом") {
					bottomEnd = "забег";
					platformLengthBottom = M;
				}
				if (topPltRailing_3 && platformTop == "площадка") {
					topEnd = "площадка";
				}
				var railingSide = "left";
				topConnection = false;
				bottomConnection = outerHandrailConnection2;
				var railingSection3 = drawRailingSection(
					bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
					railingSide, stairAmt3, h3, b3, a3, h3, lastMarsh, topConnection, bottomConnection);;
				railingSection3.rotation.y = -Math.PI * turnFactor;
				railingSection3.position.x = b1 * stairAmt1 + 30;
				railingSection3.position.y = h1 * (stairAmt1 + 1);
				railingSection3.position.z = (platformWidth_1 + 40) * turnFactor; //stringer3.position.z
				if (stairModel == "П-образная с забегом") {
					railingSection3.position.y += 5 * h3;
					railingSection3.position.z = (2 * M + marshDist + 40) * turnFactor;
				}
				
				railing.push(railingSection3);
			}

			/*внутренняя сторона верхнего марша*/

			if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
				var topEnd = "нет";
				var bottomEnd = "нет";
				var platformLengthTop = platformLength_3;
				var platformLengthBottom = 0;
				var railingSide = "right";
				topConnection = false;
				bottomConnection = false;
				railingPositionZ = M;
				if (topPltRailing_4 && platformTop == "площадка") {
					topEnd = "площадка";
				}
				var railingSection4 = drawRailingSection(
					bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
					railingSide, stairAmt3, h3, b3, a3, h3, lastMarsh, topConnection, bottomConnection);

				railingSection4.rotation.y = -Math.PI * turnFactor;
				railingSection4.position.x = b1 * stairAmt1;
				railingSection4.position.y = h1 * (stairAmt1 + 1);
				railingSection4.position.z = (platformWidth_1 - M) * turnFactor; //stringer4.position.z
				if (stairModel == "П-образная с забегом") {
					railingSection4.position.y += 5 * h3;
					railingSection4.position.z = (M + marshDist) * turnFactor;
				}
				railing.push(railingSection4);
			}

			/*заднее ограждение забега*/
			if (backRailing_2 == "есть" && stairModel == "П-образная с забегом") {

				var topEnd = "забег";
				var bottomEnd = "забег";
				var platformLengthTop = M;
				var platformLengthBottom = M + marshDist;
				var railingSide = "left";
				topConnection = outerHandrailConnection2;
				bottomConnection = outerHandrailConnection1;
				var railingSection5 = drawRailingSection(
					bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
					railingSide, 0, h3, b1, a1, h3, lastMarsh, topConnection, bottomConnection);;
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection5.position.x = b1 * stairAmt1 + M + 40;
				railingSection5.position.y = h1 * (stairAmt1 + 1) + 2 * h3;
				railingSection5.position.z = (M + marshDist) * turnFactor;
				railing.push(railingSection5);

			}

			/*заднее ограждение площадки*/
			if (backRailing_1 == "есть" && stairModel == "П-образная с площадкой") {
				var platformLength = platformWidth_1;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "left";

				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide, scale);
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection5.position.x = b1 * (stairAmt1) + platformLength_1 + stringerThickness;
				if (model == "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness;
				railingSection5.position.y = h1 * (stairAmt1 + 1);
				railingSection5.position.z = 0;
				railing.push(railingSection5);
			}

			/*заднее ограждение верхней площадки*/
			if (topPltRailing_5 && platformTop == "площадка") {
				var platformLength = M;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "right";
				if (railingModel == "Самонесущее стекло") railingSide = "left";

				var railingSection6 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide, scale);
				railingSection6.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection6.position.x = b1 * stairAmt1 + 50.0 - b3 * (stairAmt3 - 1) - platformLength_3 - 40; //- M/2 - (platformLength_3 - a3) / 2 - 40;
				railingSection6.position.y = h1 * (stairAmt1 + 1) + h3 * stairAmt3;
				railingSection6.position.z = (platformWidth_1 - M) * turnFactor;
				if (stairModel == "П-образная с забегом") {
					railingSection6.position.y += h3 * 5;
					railingSection6.position.z = (M + marshDist ) * turnFactor;
				}
				console.log(railingSection6);
				railing.push(railingSection6);
			}

		} //end of drawPRailing()

	} //end of drawPStairCase()


	/***  П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ЛЕСТНИЦА   ***/


	function drawP3Staircase() {}; //пустая функция для навигации через список функций
	if (stairModel == "П-образная трехмаршевая_") {

		/*ступени нижний марш*/
		geometry = new THREE.BoxGeometry(a1 * scale, treadThickness * scale, treadWidth * scale);
		var tread;
		var x0 = a1 / 2 * scale;
		var y0 = -treadThickness / 2 * scale;
		var z0 = M / 2 * scale * turnFactor;
		for (var i = 0; i < stairAmt1; i++) {
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = h1 * (i + 1) * scale + y0;
			tread.position.x = b1 * i * scale + x0;
			tread.position.z = z0;
			tread.castShadow = true;
			//scene.add( tread );
			treads.push(tread);
		}

		/*подступенки нижний марш*/
		if (riserType == "есть") {
			riserHeight = h1 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, (M - 2 * riserSideOffset) * scale);

			var riser;
			for (var i = 0; i < stairAmt1 + 1; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.position.y = (h1 * i + riserHeight / 2) * scale;
				riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2) * scale;
				riser.position.z = M / 2 * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}
		}


		if (turnType_1 == "площадка") {
			if (stairAmt1 == 0) {
				x0 = -b1 * scale
				y0 = y0
			} else {
				x0 = tread.position.x - a1 / 2 * scale;
				y0 = tread.position.y;
			}
			z0 = M * scale * turnFactor;

			geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, treadWidth * scale);
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = h1 * scale + y0;
			tread.position.x = b1 * scale + x0 + M / 2 * scale;
			tread.position.z = M / 2 * scale * turnFactor;
			tread.castShadow = true;
			//scene.add( tread );
			treads.push(tread);

			x0 = tread.position.x;
			y0 = tread.position.y + treadThickness / 2 * scale;
			z0 = M * scale * turnFactor;

			if (model == "ко") z0 = z0 - (a2 - b2) * scale * turnFactor // + stepWidthLow * scale;
		}

		if (turnType_1 == "забег") {
			if (stairAmt1 == 0) {
				x0 = -b1 * scale
				y0 = y0
			} else {
				x0 = tread.position.x - a1 / 2 * scale;
				y0 = tread.position.y;
			}
			z0 = 0;
			/* забежная ступень 1*/
			var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep1 = new THREE.Mesh(geom, treadMaterial);
			turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep1.position.x = b1 * scale + x0;
			turnStep1.position.y = y0 + treadThickness / 2 * scale * turnFactor + h1 * scale;
			turnStep1.position.z = z0;
			turnStep1.castShadow = true;
			//scene.add(turnStep1);
			treads.push(turnStep1);

			/* забежная ступень 2 */
			geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep2 = new THREE.Mesh(geom, treadMaterial);
			turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep2.position.x = b1 * scale + x0;
			turnStep2.position.y = y0 + treadThickness / 2 * scale * turnFactor + h1 * scale + h2 * scale;
			turnStep2.position.z = 0;
			turnStep2.castShadow = true;
			//scene.add(turnStep2);
			treads.push(turnStep2);


			/* забежная ступень 3 */

			var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep3 = new THREE.Mesh(geom, treadMaterial);
			turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
			turnStep3.rotation.z = 0.5 * Math.PI;
			turnStep3.position.x = b1 * scale + M * scale + x0;
			turnStep3.position.y = y0 - treadThickness / 2 * scale * turnFactor + h1 * scale + h2 * 2 * scale;
			turnStep3.position.z = (M + stepWidthLow) * scale * turnFactor;
			turnStep3.castShadow = true;
			//scene.add(turnStep3);
			treads.push(turnStep3);

			/*подступенок второй забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h2 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);

				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 6 * turnFactor;
				riser.position.x = turnStep1.position.x + (L1 + L2 / 2) * scale - riserThickness / 2 * scale;
				riser.position.y = turnStep1.position.y + riserHeight / 2 * scale;
				if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness * scale;
				riser.position.z = turnStep1.position.z + M / 2 * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}


			/*подступенок третьей забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h2 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -Math.PI / 3 * turnFactor;
				riser.position.x = turnStep2.position.x + M / 2 * scale // + (L1 + L2) *scale - riserThickness/2 * scale;
				riser.position.y = turnStep2.position.y + riserHeight / 2 * scale;
				if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness * scale;
				riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}


			//x0 = tread.position.x + M / 2 *scale;
			x0 = x0 + b1 * scale + M / 2 * scale;
			y0 = turnStep3.position.y + treadThickness * scale;
			if (turnFactor == -1) y0 = turnStep3.position.y;
			z0 = M * scale * turnFactor;

			if (model == "ко") z0 = z0 + (stepWidthLow - (a2 - b2)) * scale * turnFactor;
		}


		/*ступени средний марш*/

		geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, a2 * scale);

		tread;

		for (var i = 0; i < stairAmt2; i++) {
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = y0 + (h2 * (i + 1) - treadThickness / 2) * scale;
			tread.position.x = x0 // + M/2*scale;
			tread.position.z = z0 + (b2 * i + a2 / 2) * scale * turnFactor;
			tread.castShadow = true;
			//scene.add( tread );
			treads.push(tread);
		}

		/*подступенки средний марш*/
		if (riserType == "есть") {
			riserHeight = h2 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, (M - 2 * riserSideOffset) * scale);

			var riser;
			for (var i = 0; i < stairAmt2 + 1; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = -0.5 * Math.PI;
				riser.position.y = y0 + (h2 * i + riserHeight / 2) * scale;
				riser.position.x = x0 //+ M/2*scale;
				riser.position.z = z0 + (b2 * (i - 1) + a2 - riserThickness / 2) * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}
		}

		/*верхний поворот*/
		x0 = tread.position.x;
		y0 = tread.position.y;
		z0 = tread.position.z - a2 / 2 * scale * turnFactor;

		if (model == "ко") z0 = z0 + (a2 - b2 - stepWidthLow) * scale * turnFactor;

		if (turnType_2 == "площадка") {

			geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, treadWidth * scale);
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = y0 + h2 * scale;
			tread.position.x = x0;
			tread.position.z = z0 + (b2 + M / 2) * scale * turnFactor;
			tread.castShadow = true;
			//scene.add( tread );
			treads.push(tread);

			x0 = tread.position.x - M / 2 * scale;
			y0 = tread.position.y - treadThickness / 2 * scale;
			z0 = tread.position.z + M / 2 * scale * turnFactor;

			//смещаем верхний марш для КО
			if (model == "ко") {
				x0 = x0 + (a3 - b3) * scale;
			} else z0 = z0 + stringerThickness / 2 * scale * turnFactor;
		}

		if (turnType_2 == "забег") {

			/* забежная ступень 1*/
			var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep1 = new THREE.Mesh(geom, treadMaterial);
			turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep1.rotation.z = 0.5 * Math.PI;
			turnStep1.position.x = x0 + M / 2 * scale;
			turnStep1.position.y = y0 + treadThickness / 2 * scale * turnFactor + h2 * scale;
			turnStep1.position.z = z0 + b2 * scale * turnFactor;
			turnStep1.castShadow = true;
			//scene.add(turnStep1);
			treads.push(turnStep1);

			/* забежная ступень 2 */
			geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep2 = new THREE.Mesh(geom, treadMaterial);
			turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
			turnStep2.rotation.z = 0.5 * Math.PI;
			turnStep2.position.x = x0 + M / 2 * scale //b1*scale + x0;
			turnStep2.position.y = y0 + treadThickness / 2 * scale * turnFactor + h2 * scale + h3 * scale;
			turnStep2.position.z = z0 + b2 * scale * turnFactor;
			turnStep2.castShadow = true;
			//scene.add(turnStep2);
			treads.push(turnStep2);


			/* забежная ступень 3 */

			var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var turnStep3 = new THREE.Mesh(geom, treadMaterial);
			turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
			//turnStep3.rotation.z=1*Math.PI;
			turnStep3.position.x = x0 - M / 2 * scale - stepWidthLow * scale;
			turnStep3.position.y = y0 - treadThickness / 2 * scale * turnFactor + h2 * scale + h3 * 2 * scale;
			turnStep3.position.z = z0 + (M + b2) * scale * turnFactor;
			turnStep3.castShadow = true;
			//scene.add(turnStep3);
			treads.push(turnStep3);

			/*подступенок второй забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = Math.PI / 3 * turnFactor;
				riser.position.x = turnStep1.position.x - M / 2 * scale;
				riser.position.y = turnStep2.position.y - riserHeight / 2 * scale - treadThickness * scale;
				if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness * scale;
				riser.position.z = turnStep2.position.z + (L1 + L2 / 2 - riserThickness / 2) * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}

			/*подступенок третьей забежной ступени*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);
				var riser;
				riser = new THREE.Mesh(geometry, treadMaterial);
				riser.rotation.y = Math.PI / 6 * turnFactor;
				riser.position.x = turnStep1.position.x - M * scale + L2 / 2 * scale - L1 * scale + riserThickness / 2 * scale;
				riser.position.y = turnStep3.position.y - riserHeight / 2 * scale;
				if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness * scale;
				riser.position.z = turnStep3.position.z - M / 2 * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}


			x0 = turnStep3.position.x + stepWidthLow * scale;
			y0 = turnStep3.position.y;
			z0 = turnStep3.position.z;
			if (turnFactor == -1) y0 = turnStep3.position.y - treadThickness * scale;

			//смещаем верхний марш для КО
			if (model == "ко") x0 = x0 - L1 * scale + (a3 - b3) * scale;

		}


		/*ступенни верхний марш*/

		geometry = new THREE.BoxGeometry(a3 * scale, treadThickness * scale, treadWidth * scale);

		for (var i = 0; i < stairAmt3; i++) {
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = y0 + (h3 * (i + 1) + treadThickness / 2) * scale;
			tread.position.x = x0 - (b3 * i + a3 / 2) * scale;
			tread.position.z = z0 - M / 2 * scale * turnFactor;
			tread.castShadow = true;
			//scene.add( tread );
			treads.push(tread);
		}

		/*подступенки верхнего марша*/
		if (riserType == "есть") {
			riserHeight = h3 - treadThickness;
			geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, (M - 2 * riserSideOffset) * scale);

			var riser;
			for (var i = 0; i < stairAmt3; i++) {
				riser = new THREE.Mesh(geometry, treadMaterial);
				//riser.rotation.y=-0.5*Math.PI;
				riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness) * scale;
				riser.position.x = x0 - (b3 * (i - 1) + a3 - riserThickness / 2) * scale;
				riser.position.z = z0 - M / 2 * scale * turnFactor;
				riser.castShadow = true;
				//scene.add( riser );
				risers.push(riser);
			}
		}

		/*верхняя площадка*/
		var platform_x = tread.position.x;
		var platform_y = tread.position.y;
		var platform_z = tread.position.z;
		var platformWidthTop = M - 2 * stringerThickness;
		if (model == "ко") platformWidthTop = M;
		if (platformTop == "площадка") {
			geometry = new THREE.BoxGeometry(platformLength_3 * scale, treadThickness, platformWidthTop);
			tread = new THREE.Mesh(geometry, treadMaterial);
			tread.position.y = platform_y;
			tread.position.x = platform_x - (platformLength_3 - a3) / 2;
			tread.position.z = platform_z;
			tread.castShadow = true;
			//scene.add( tread );
			treads.push(tread);
		}

		/*верхнее перекрытие*/

		if (platformTop != "площадка") {
			//базовая точка для верхней площадки
			if (stairAmt3 == 0) {
				platform_x = x0 + a3 / 2 * scale;
				platform_y = y0 //+ h3*scale
				platform_z = z0 - M / 2 * scale * turnFactor;
				if (model == "ко") platform_x = platform_x - (a3 - b3) * scale
				if (model == "лт" && turnType_2 == "забег") platform_x = platform_x - L1 * scale;

			} else {
				platform_x = tread.position.x;
				platform_y = tread.position.y;
				platform_z = tread.position.z;
			}
			geometry = new THREE.BoxGeometry(M * scale, 300 * scale, M * scale);
			floorTop = new THREE.Mesh(geometry, floorMaterial);
			floorTop.castShadow = true;
			if (topStairType == "ниже") floorTop.position.y = platform_y + h3 * scale - 150 * scale + treadThickness / 2 * scale;
			if (topStairType == "вровень") floorTop.position.y = platform_y - 150 * scale + treadThickness / 2 * scale;
			floorTop.position.x = platform_x - (a3 + M) / 2 * scale;
			floorTop.position.z = platform_z;
			//scene.add( floorTop );
			topFloor.push(floorTop);
		}


		/***  КАРКАС П-ОБРАЗНОЙ ТРЕХМАРШЕВОЙ ЛЕСТНИЦЫ   ***/
		//drawP3Stringers();
		function drawP3Stringers() {}; //пустая функция для навигации через список функций
		dxfBasePoint = {
			"x": 0.0,
			"y": 0.0
		};
		stringerParams = {
			model: model,
			stringerTurn: stringerTurn,
			stringerType: stringerType,
			botEnd: "floor",
			botEndLength: 0,
			topEnd: "platformG",
			topEndLength: tyrnLength,
			stringerThickness: stringerThickness,
			stringerSideOffset: stringerSideOffset,
			M: M,
			treadWidth: treadWidth,
			treadThickness: treadThickness,
			h: h1,
			h3: h2,
			b: b1,
			a: a1,
			stairAmt: stairAmt1 + 1,
			topFlan: topFlan,
			stairFrame: stairFrame,
			bridgeThickness: 8.0,
			topAnglePosition: params.topAnglePosition,
			bottomAngleType: params.bottomAngleType,
			botFloorType: params.botFloorType,
			botFloorsDist: params.botFloorsDist,
			dxfBasePoint: dxfBasePoint,
			elmIns: {}, // точки размещения уголков и рамок
		};

		if (turnType_1 == "площадка") {
			platformLength = M + 50.0;
			stringerParams.topEnd = "platformG";
			stringerParams.topEndLength = platformLength;
			//if (params.model == "ко") stringerParams.topEndLength = b3;
		}



		/*косоур нижнего марша*/

		stringerParams.key = "out";
		if (turnType_1 == "забег") {
			stringerParams.topEnd = "winder";
			//stringerParams.stairAmt += 1;
		}

		stringerParams = drawStringerMk(stringerParams);
		var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var stringer1 = new THREE.Mesh(geom, stringerMaterial);
		stringer1.position.x = 0;
		stringer1.position.y = 0;
		stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
		stringer1.castShadow = true;
		carcas.push(stringer1);

		/*косоур среднего марша*/
		turnType_1 == "забег" ? stringerParams.botEnd = "winder" : stringerParams.botEnd = "platformG";
		turnType_2 == "забег" ? stringerParams.topEnd = "winder" : stringerParams.topEnd = "platformG";
		
		stringerParams.h = params.h2;
		stringerParams.h3 = params.h3;
		stringerParams.b = params.b2;
		stringerParams.a = params.a2;
		if(params.turnType_1 == "площадка") stringerParams.stairAmt = params.stairAmt2 + 1; 
		if(params.turnType_1 == "забег") stringerParams.stairAmt = params.stairAmt2 + 2;
		console.log(params.h2)
		console.log(stringerParams)
		stringerParams = drawStringerMk(stringerParams);
		var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var stringer2 = new THREE.Mesh(geom, stringerMaterial);
		stringer2.rotation.y = -Math.PI / 2 * turnFactor;;
		stringer2.position.x = b1 * stairAmt1 + 30 + M / 2 + stringerThickness / 2;
		if(params.turnType_1 == "забег") 
			stringer2.position.y = h1 * (stairAmt1 + 1) + h2 - 215 - treadThickness;
		if(params.turnType_1 == "площадка") 
			stringer2.position.y = h1 * (stairAmt1 + 1) - stringerWidth - treadThickness;
		stringer2.position.z = (M / 2 + stringerThickness / 2 - 70) * turnFactor;
		stringer2.castShadow = true;
		carcas.push(stringer2);

		/*косоур верхнего марша*/
		stringerParams.topEnd = "floor";
		stringerParams.stairAmt = params.stairAmt3;
		if(params.turnType_2 == "забег") stringerParams.stairAmt = params.stairAmt3 + 1;
		if (platformTop == "площадка") {
			stringerParams.topEnd = "platformG";
			stringerParams.topEndLength = params.platformLength_3;
			//if (params.model == "ко") stringerParams.topEndLength = b3;
		}
		turnType_2 == "забег" ? stringerParams.botEnd = "winder" : stringerParams.botEnd = "platformG";
		stringerParams.h = h3;
		stringerParams.h3 = h3;
		stringerParams.b = b3;
		stringerParams.a = a3;

		stringerParams = drawStringerMk(stringerParams);
		var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var stringer3 = new THREE.Mesh(geom, stringerMaterial);
		stringer3.rotation.y = Math.PI;
		stringer3.position.x = b1 * stairAmt1 + 70 + M / 2 - stringerThickness / 2;
		stringer3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) - stringerWidth - treadThickness;
		if(params.turnType_1 == "забег") stringer3.position.y += h2 * 2;
		if(params.turnType_2 == "забег") {
			stringer3.position.y += h3 + stringerWidth - 215;
			
			}
		
		stringer3.position.z = (M + b2 * stairAmt2 + stringerSideOffset + stringerThickness / 2) * turnFactor + stringerThickness / 2;//+ 30 * 2
		stringer3.castShadow = true;
		carcas.push(stringer3);

		/***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ТРЕХМАРШЕВОЙ ЛЕСТНИЦЫ  ***/


		function drawP3Railing() {}; //пустая функция для навигации через список функций

		/*замыкание поручней внешних секций верхнего и нижнего маршей*/
		var outerHandrailConnection = false;
		var outerHandrailConnection1 = false;
		var outerHandrailConnection2 = false;
		var isSection1 = false;
		var isSection2 = false;
		var isSection3 = false;
		if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
		if (railingSide_2 == "внешнее" || railingSide_2 == "две") isSection2 = true;
		if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
		if (isSection1 && isSection2) outerHandrailConnection1 = true;
		if (isSection2 && isSection3) outerHandrailConnection2 = true;
		lastMarsh = false;

		/*внешняя сторона нижнего марша*/

		if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
			var topEnd = "площадка";
			if (turnType_1 == "забег") topEnd = "забег";
			var bottomEnd = "нет";
			var platformLengthBottom = 0;
			var platformLengthTop = M;
			var railingSide = "left";
			topConnection = outerHandrailConnection1;
			bottomConnection = false;
			railingPositionZ = -40;
			var railingSection1 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, (stairAmt1 + 1), h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection1.position.z = railingPositionZ * scale * turnFactor;
			railing.push(railingSection1);
		}

		/*внутренняя сторона нижнего марша*/

		if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
			var topEnd = "нет";
			var bottomEnd = "нет";
			var platformLengthBottom = 0;
			var platformLengthTop = 0;
			var railingSide = "right";
			topConnection = false;
			bottomConnection = false;
			railingPositionZ = M;
			var railingSection2 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt1, h1, b1, a1, h3, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection2.position.z = railingPositionZ * scale * turnFactor;
			//scene.add( railingSection2 );
			railing.push(railingSection2);
		}

		/*внутренняя сторона среднего марша*/

		if (stairAmt2 != 0) {
			if (railingSide_2 == "внутреннее" || railingSide_2 == "две") {

				var topEnd = "нет";
				var bottomEnd = "нет";
				var platformLengthTop = 0;
				var platformLengthBottom = 0;
				var railingSide = "right";
				topConnection = false;
				bottomConnection = false;
				railingPositionZ = M;
				var railingSection6 = drawRailingSection(
					bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
					railingSide, stairAmt2, h2, b2, a2, h3, scale, lastMarsh, topConnection, bottomConnection);;
				railingSection6.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection6.position.x = b1 * stairAmt1;
				railingSection6.position.y = h1 * (stairAmt1 + 1) * scale;
				if (turnType_1 == "забег") railingSection6.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h2 * scale;
				railingSection6.position.z = M * turnFactor;
				railing.push(railingSection6);
			}
		}

		/*внешняя сторона среднего марша*/

		if (railingSide_2 == "внешнее" || railingSide_2 == "две") {

			var topEnd = "площадка";
			var bottomEnd = "площадка";
			var platformLengthTop = M;
			var platformLengthBottom = M;
			if (turnType_1 == "забег") bottomEnd = "забег";
			if (turnType_2 == "забег") topEnd = "забег";
			var railingSide = "left";
			topConnection = outerHandrailConnection1;
			bottomConnection = outerHandrailConnection2;
			//railingPositionZ = M;
			var railingSection5 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, (stairAmt2 + 1), h2, b2, a2, h3, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
			railingSection5.position.x = b1 * stairAmt1 + M + 40;//stringer5.position.x + 
			railingSection5.position.y = h1 * (stairAmt1 + 1) * scale // + h3*scale;
			if (turnType_1 == "забег") railingSection5.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h2 * scale;
			railingSection5.position.z = M * scale * turnFactor;
			railing.push(railingSection5);
		}

		lastMarsh = true;

		/*внешняя сторона верхнего марша*/

		if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
			var topEnd = "нет";
			var bottomEnd = "площадка";
			var platformLengthTop = platformLength_3;
			var platformLengthBottom = M;
			if (turnType_2 == "забег") bottomEnd = "забег";
			var railingSide = "left";
			topConnection = false;
			bottomConnection = outerHandrailConnection2;
			//верхняя площадка
			var topEnd = "нет";
			console.log(topPltRailing_3);
			if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";

			var railingSection3 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt3, h3, b3, a3, h3, scale, lastMarsh, topConnection, bottomConnection);;
			railingSection3.rotation.y = -Math.PI * turnFactor;
			railingSection3.position.x = b1 * stairAmt1 * scale;
			railingSection3.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1) * scale;
			if (turnType_1 == "забег") railingSection3.position.y += 2 * h2 * scale;
			if (turnType_2 == "забег") railingSection3.position.y += 2 * h3 * scale;
			railingSection3.position.z = stringer3.position.z + 40 * scale * turnFactor;
			if (model == "ко") railingSection3.position.z = railingSection3.position.z + stringerSideOffset * turnFactor + stringerThickness / 2 * turnFactor - stringerThickness / 2;
			//scene.add( railingSection3 );
			railing.push(railingSection3);
		}

		/*внутренняя сторона верхнего марша*/

		if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
			var topEnd = platformTop;
			var bottomEnd = "нет";
			var platformLengthTop = platformLength_3;
			var platformLengthBottom = 0;
			var railingSide = "right";
			topConnection = false;
			bottomConnection = false;
			railingPositionZ = M;
			//верхняя площадка
			var topEnd = "нет";
			if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";
			var railingSection4 = drawRailingSection(
				bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
				railingSide, stairAmt3, h3, b3, a3, h3, scale, lastMarsh, topConnection, bottomConnection);
			;
			railingSection4.rotation.y = -Math.PI * turnFactor;
			railingSection4.position.x = b1 * stairAmt1 * scale;
			railingSection4.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1) * scale;
			if (turnType_1 == "забег") railingSection4.position.y += 2 * h2 * scale;
			if (turnType_2 == "забег") railingSection4.position.y += 2 * h3 * scale;
			railingSection4.position.z = stringer3.position.z - stringerSideOffset * turnFactor - stringerThickness / 2 * turnFactor - stringerThickness / 2;
			console.log(stringer3.position);
			//scene.add( railingSection4 );
			railing.push(railingSection4);
		}

		/*заднее ограждение верхней площадки*/
		if (topPltRailing_5 && platformTop == "площадка") {

			var platformLength = M;
			var offsetLeft = 50;
			var offsetRight = 50;
			var handrailOffsetLeft = 50;
			var handrailOffsetRight = 50;
			var railingSide = "right";
			if (railingModel == "Самонесущее стекло") railingSide = "left";


			var railingSection5 = drawRailingSectionPlatform(
				platformLength, offsetLeft, offsetRight,
				handrailOffsetLeft, handrailOffsetRight, railingSide,
				scale)
			railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
			//railingSection5.rotation.y = -Math.PI/2
			railingSection5.position.x = platform_x - platformLength_3 + a3 / 2 - 40;//- M/2*scale;
			railingSection5.position.y = platform_y + stringerWidth / 2 + stringerOffset_y
			railingSection5.position.z = platform_z - M / 2 * turnFactor;
			railing.push(railingSection5);
		}

	} //конец П-образной трехмаршевой


	//добавляем объекты в сцену

	addObjects(viewportId, treads, 'treads');
	addObjects(viewportId, risers, 'risers');
	addObjects(viewportId, carcas, 'carcas');
	addObjects(viewportId, railing, 'railing');
	addObjects(viewportId, topFloor, 'topFloor');
	addObjects(viewportId, angles, 'angles');

} //end of drawStair