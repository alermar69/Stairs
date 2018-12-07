//создаем глобальные массивы
var treads = [];
var risers = [];
var carcas = [];
var railing = [];
var topFloor = [];
var dxfPrimitivesArr0 = [];

	var stringerThickness = 8;
	var treadThickness = 40;
	var stringerWidth = 150; 
	var riserThickness = 20;

	
	
drawStaircase = function (viewportId, isVisible) {

		var x1, x2, y1, y2, x1t, y1t, x2t, y2t;

/*удаляем предыдущую лестницу*/
	if (treads) removeObjects(viewportId, 'treads');
	if (risers) removeObjects(viewportId, 'risers');
	if (carcas) removeObjects(viewportId, 'carcas');
	if (railing) removeObjects(viewportId, 'railing');
	if (topFloor) removeObjects(viewportId, 'topFloor');

//очищаем глобальные массивы
	treads = [];
	risers = [];
	carcas = [];
	railing = [];
	topFloor = [];
	dxfPrimitivesArr = [];
	var dxfBasePoint = {x:0, y:0}

		/*задаем материалы*/
		
		var timberMaterial = new THREE.MeshLambertMaterial({color: params.timberColor, overdraw: 0.5});
		var metalMaterial = new THREE.MeshLambertMaterial({color: params.metalColor, wireframe: false});
		var metalMaterial2 = new THREE.MeshLambertMaterial({color: 0xA3A3A3, wireframe: false});
		var glassMaterial = new THREE.MeshLambertMaterial({opacity:0.6, color: 0x3AE2CE, transparent:true});
		var concreteMaterial = new THREE.MeshLambertMaterial({color: 0xBFBFBF});


		var stringerMaterial = metalMaterial;
		var floorMaterial = concreteMaterial;
		
		/*материал ступеней*/
		var stairType = params.stairType;
		var treadMaterial = timberMaterial;
		
		if(stairType == "рифленая сталь") treadMaterial = metalMaterial;
		if(stairType == "рифленый алюминий") treadMaterial = metalMaterial2;
		if(stairType == "лотки") treadMaterial = metalMaterial2;
		if(stairType == "пресснастил") treadMaterial = metalMaterial2;
		if(stairType == "стекло") treadMaterial = glassMaterial;	
		
 

		//материалы ограждений задаются внутри функции отрисовки секции

		var scale = 1;
		var topStepPos = {} //точка привязки для поворота лестницы
		var model = document.getElementById('model').options[document.getElementById('model').selectedIndex].value;
		var stairModel = document.getElementById('stairModel').options[document.getElementById('stairModel').selectedIndex].value;
		var turnSide = getInputValue("turnSide");
		var platformWidth_1 = parseFloat(document.getElementById("platformWidth_1").value);
		var platformLength_1 = parseFloat(document.getElementById("platformLength_1").value);
		var turnType_1 = document.getElementById('turnType_1').options[document.getElementById('turnType_1').selectedIndex].value;
		var turnType_2 = document.getElementById('turnType_2').options[document.getElementById('turnType_2').selectedIndex].value;
		var platformTop = params.platformTop;
		//var platformWidth_3 = parseFloat(document.getElementById("platformWidth_3").value);
		var platformLength_3 = parseFloat(document.getElementById("platformLength_3").value);
		var platformTopColumn = document.getElementById('platformTopColumn').options[document.getElementById('platformTopColumn').selectedIndex].value;
		var topFlan = document.getElementById('topFlan').options[document.getElementById('topFlan').selectedIndex].value;
		var columnModel = document.getElementById('columnModel').options[document.getElementById('columnModel').selectedIndex].value;
		var M = parseFloat(document.getElementById("M").value);
		var stringerType = document.getElementById('stringerType').options[document.getElementById('stringerType').selectedIndex].value;
		var riserType = document.getElementById('riserType').options[document.getElementById('riserType').selectedIndex].value;
		var stairFrame = document.getElementById('stairFrame').options[document.getElementById('stairFrame').selectedIndex].value;
		var stairAmt1 = parseFloat(document.getElementById("stairAmt1").value);
		var h1 = parseFloat(document.getElementById("h1").value);
		var b1 = parseFloat(document.getElementById("b1").value);
		var a1 = parseFloat(document.getElementById("a1").value);
		var stairAmt2 = parseFloat(document.getElementById("stairAmt2").value);
		var h2 = parseFloat(document.getElementById("h2").value);
		var b2 = parseFloat(document.getElementById("b2").value);
		var a2 = parseFloat(document.getElementById("a2").value);
		var stairAmt3 = parseFloat(document.getElementById("stairAmt3").value);
		var h3 = parseFloat(document.getElementById("h3").value);
		var b3 = parseFloat(document.getElementById("b3").value);
		var a3 = parseFloat(document.getElementById("a3").value);
		var bottomAngleType = document.getElementById('bottomAngleType').options[document.getElementById('bottomAngleType').selectedIndex].value;
		var metalPaint = document.getElementById('metalPaint').options[document.getElementById('metalPaint').selectedIndex].value;
		var timberPaint = document.getElementById('timberPaint').options[document.getElementById('timberPaint').selectedIndex].value;

		var topStairType = document.getElementById('topStairType').options[document.getElementById('topStairType').selectedIndex].value;
		
		if (stairModel == "П-образная с площадкой") params.marshDist = params.platformWidth_1 - 2 * M;
		var marshDist = params.marshDist;
		
		var platformRearStringer = document.getElementById('platformRearStringer').options[document.getElementById('platformRearStringer').selectedIndex].value;
		var tyrnLength; //Длина площадки
		var stringerTurn; //тип косоура: площадка или забег

		if (platformTop == "площадка") stairAmt3 = stairAmt3 + 1;


		var stringerSideOffset = 0;
		var stringerOffset_x = 0;
		var stringerOffset_y = 0;
		window.treadWidth = M - 2 * stringerThickness;
		if (model == "ко") {
			stringerSideOffset = params.sideOverHang;
			treadWidth = M
			stringerOffset_x = a1 - b1;
			stringerOffset_y = treadThickness;
		}


		var riserSideOffset = 10;
		var riserHeight;
		stringerWidth = 150;

		/*направление поворота (глобальные переменные)*/

		if (turnSide == "правое") turnFactor = 1;
		if (turnSide == "левое") turnFactor = -1;


		/* данные по перилам (глобальные переменные) */
		railingSide_1 = getInputValue("railingSide_1");
		railingSide_2 = getInputValue("railingSide_2");
		railingSide_3 = getInputValue("railingSide_3");
		backRailing_1 = getInputValue("backRailing_1");
		backRailing_2 = getInputValue("backRailing_2");
		backRailing_3 = getInputValue("backRailing_3");
		topRailingAmt = getInputValue("topRailingAmt");
		balRackBottom = getInputValue("balRackBottom");
		railingModel = getInputValue("railingModel");
		handrail = getInputValue("handrail");
		banisterMaterial = getInputValue("banisterMaterial");
		rackBottom = getInputValue("rackBottom");
		rigelMaterial = getInputValue("rigelMaterial");
		rigelAmt = getInputValue("rigelAmt");
		glassHandrail = getInputValue("glassHandrail");
		rackTypeKovka = getInputValue("rackTypeKovka");
		banister1 = getInputValue("banister1");
		banister2 = getInputValue("banister2");
		balDist = []; //расстояние между балясинами
		balDist[0] = getInputValue("balDist"); //примерное расстояние между балясинами
		timberBalStep = getInputValue("timberBalStep");
		timberBal = getInputValue("timberBal");
		timberRack = getInputValue("timberRack");
		metalPaint_perila = getInputValue("metalPaint_perila");
		comments_04 = getInputValue("comments_04");
		timberPaint_perila = getInputValue("timberPaint_perila");
		comments_05 = getInputValue("comments_05");
		//install_perila = getInputValue("install_perila");
		
		//огражденя верхней площадки
		var topPltRailing_3 = params.topPltRailing_3;
		var topPltRailing_4 = params.topPltRailing_4;
		var topPltRailing_5 = params.topPltRailing_5;
		//меняем местами на левой лестнице
		if (turnSide == "левое"){
			var topPltRailing_temp = topPltRailing_3;
			topPltRailing_3 = topPltRailing_4
			topPltRailing_4 = topPltRailing_temp;
//			console.log(topPltRailing_3)
			}
			
		if(topPltRailing_3 && topPltRailing_4 && topPltRailing_5) 
			alert("Внимание! Замкнутое ограждение верхней площадки!")
		

		var lastMarsh = false; //секция ограждения на верхнем марше
		var topConnection = false; //стыковка секции ограждения с другой секцией сверху
		var bottomConnection = false; //стыковка секции ограждения с другой секцией снизу


		/*контур нижней забежной ступени*/

		var stepWidthLow = 100;
		if (model == "ко") stepWidthLow = 50;
		var stepWidthHigh = stepWidthLow + M * Math.tan(Math.PI / 6)
		var extrudeOptions = {
			amount: treadThickness * scale,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var turnStepShape1 = new THREE.Shape();
		turnStepShape1.moveTo(0, 0);
		turnStepShape1.lineTo(0, M * scale);
		turnStepShape1.lineTo(stepWidthLow * scale, M * scale);
		turnStepShape1.lineTo(stepWidthHigh * scale, 0);
		turnStepShape1.lineTo(0, 0);

		/*контур средней забежной ступени*/
		var L1 = 100;
		if (model == "ко") L1 = 50;
		var L2 = M * Math.tan(Math.PI / 6);
		var turnStepShape2 = new THREE.Shape();
		turnStepShape2.moveTo(L2 * scale, 0);	 //точка 0
		turnStepShape2.lineTo(M * scale, 0); //точка 1
		turnStepShape2.lineTo(M * scale, (M + L1 - L2) * scale); //точка 2
		turnStepShape2.lineTo(0, (M + L1) * scale); //точка 3
		turnStepShape2.lineTo(0, M * scale); //точка 4
		turnStepShape2.lineTo(L2 * scale, 0); //точка 0

		var stringerExtrudeOptions = {
			amount: stringerThickness * scale,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};


		/*** ПРЯМАЯ ЛЕСТНИЦА  ***/


		function drawStrightStaircase(){}; //пустая функция для навигации через список функций
		
		if (stairModel == "Прямая") {

			if (stairAmt1 < 2) {
				alert("Невозможно построить одномаршевую лестницу с количеством ступеней меньше ДВУХ");
				return;
			}

			stairAmt = stairAmt1;
			if (platformTop == "площадка") stairAmt = stairAmt1 + 1;

			/*ступени*/
			geometry = new THREE.BoxGeometry(a1 * scale, treadThickness * scale, treadWidth * scale);

			var tread;
			for (var i = 0; i < stairAmt; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = (h1 * (i + 1) - treadThickness / 2) * scale;
				tread.position.x = (b1 * i + a1 / 2) * scale;
				//tread.position.z = (M/2 + stringerThickness)*scale;
				tread.position.z = M / 2 * turnFactor;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);
			}

			/*подступенки*/
			if (riserType == "есть") {
				riserHeight = h1 - treadThickness;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, (M - 2 * riserSideOffset) * scale);

				var riser;
				for (var i = 0; i < stairAmt; i++) {
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.position.y = (h1 * i + riserHeight / 2) * scale;
					riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2) * scale;
					riser.position.z = M / 2 * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}
			}


			/*верхняя площадка*/

			if (platformTop == "площадка") {
				geometry = new THREE.BoxGeometry(platformLength_3 * scale, treadThickness * scale, treadWidth * scale);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = (h1 * stairAmt - treadThickness / 2) * scale;
				tread.position.x = (b1 * (stairAmt - 1) + platformLength_3 / 2) * scale;
				//tread.position.z = (M/2 + stringerThickness)*scale;
				tread.position.z = M / 2 * turnFactor;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);
				
				topStepPos = {
					x: tread.position.x + platformLength_3/2,
					z: 0,
					}
			}

			/*верхнее перекрытие*/

			if (platformTop != "площадка") {
				
				topStepPos = {
					x: tread.position.x + a1/2,
					z: 0,
					}
					
				/*
				geometry = new THREE.BoxGeometry(M, 300 * scale, M);
				floorTop = new THREE.Mesh(geometry, floorMaterial);
				floorTop.castShadow = true;
				if (topStairType == "ниже") floorTop.position.y = tread.position.y + h1 * scale - 150 * scale + treadThickness / 2 * scale;
				if (topStairType == "вровень") floorTop.position.y = tread.position.y - 150 * scale + treadThickness / 2 * scale;

				floorTop.position.x = tread.position.x + (a1 + M) / 2 * scale;
				floorTop.position.z = tread.position.z;
				//scene.add( floorTop );
				topFloor.push(floorTop);
				*/
			}
			
	/* ПЛИНТУС */
	
	 function addStrightSkirting(){}; //пустая функция для навигации
		 
	 if(params.model == "ко" && params.riserType == "есть" && params.skirting_1 != "нет"){
		 
		 var skirtingParams = {
			thk: params.riserThickness,
			rise: params.h1,
			step: params.b1,
			nose: params.a1 - params.b1 - params.riserThickness,
			treadThk: params.treadThickness,
			las: false,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
			material: timberMaterial,
			}
		
		//внутренняя сторона
		if(params.skirting_1 == "внутреннее" || params.skirting_1 == "две"){
			var posZ = 0;
			if(turnFactor == -1) posZ = - skirtingParams.thk;
			for(var i=0; i<stairAmt1; i++){
				if(i == stairAmt1 - 1) {
					skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			}
			
		//внешняя сторона
		skirtingParams.step = params.b1;
		skirtingParams.last = false;
		if(params.skirting_1 == "внешнее" || params.skirting_1 == "две"){
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M//- skirtingParams.thk;
			for(var i=0; i<stairAmt1; i++){				
				if(i == stairAmt1 - 1) {
					skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			}
		
		}
		
		//end of addSkirting
			

			/***  КАРКАС ПРЯМОЙ ЛЕСТНИЦЫ  ***/
			
			
			function drawStrightStringers(){}; //пустая функция для навигации через список функций

			var stringerShape = drawStringer0(model, stringerType, h1, b1, a1, stairAmt, scale);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

			/*левый косоур*/

			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.position.x = 0;
			stringer1.position.y = 0;
			stringer1.position.z = stringerSideOffset * turnFactor;
			if(turnFactor == -1) stringer1.position.z = stringer1.position.z - stringerThickness;
			stringer1.castShadow = true;
			//scene.add(stringer1);
			carcas.push(stringer1);

			/*правый косоур*/

			var stringer2 = new THREE.Mesh(geom, stringerMaterial);
			stringer2.position.x = 0;
			stringer2.position.y = 0;
			stringer2.position.z = (M - stringerThickness) * turnFactor - stringerSideOffset * turnFactor;
			if(turnFactor == -1) stringer2.position.z = stringer2.position.z - stringerThickness;
			stringer2.castShadow = true;
			//scene.add(stringer2);
			carcas.push(stringer2);

			/*косоуры площадки*/

			if (platformTop == "площадка") {
				stringerWidth = 150;

				var geom = new THREE.BoxGeometry((platformLength_3 - a1) * scale, stringerWidth * scale, stringerThickness * scale);

				/*левый косоур площадки*/
				var platformStringer1 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer1.position.x = (b1 * (stairAmt - 1) + a1 / 2 + platformLength_3 / 2) * scale;
				platformStringer1.position.y = (h1 * stairAmt - stringerWidth / 2 - stringerOffset_y) * scale;
				platformStringer1.position.z = (stringerThickness / 2 + stringerSideOffset) * turnFactor;
				platformStringer1.castShadow = true;
				//scene.add(platformStringer1);
				carcas.push(platformStringer1);

				/*правый косоур площадки*/
				var platformStringer2 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer2.position.x = (b1 * (stairAmt - 1) + a1 / 2 + platformLength_3 / 2) * scale;
				platformStringer2.position.y = (h1 * stairAmt - stringerWidth / 2 - stringerOffset_y) * scale;
				platformStringer2.position.z = (M - stringerThickness / 2) * turnFactor - stringerSideOffset * turnFactor;
				platformStringer2.castShadow = true;
				//scene.add(platformStringer2);
				carcas.push(platformStringer2);

				/*задняя тетива площадки*/
				if (platformRearStringer == "есть") {
					var geom = new THREE.BoxGeometry(stringerThickness * scale, stringerWidth * scale, M * scale);
					var platformStringer3 = new THREE.Mesh(geom, stringerMaterial);
					platformStringer3.position.x = (b1 * (stairAmt - 1) + platformLength_3 + stringerThickness / 2) * scale;
					platformStringer3.position.y = (h1 * stairAmt - stringerWidth / 2 - stringerOffset_y) * scale;
					platformStringer3.position.z = M / 2 * turnFactor;
					platformStringer3.castShadow = true;
					//scene.add(platformStringer3);
					carcas.push(platformStringer3);
				}

			}
			
			//рамки 
			if(params.stairFrame == "есть"){
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b1,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			
			var frameParams = drawFrame(frameParams);
			
			for(var i = 0; i < stairAmt1; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * i + frameParams.thk/2;
			    if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
			
			    carcas.push(frame);
			}
			}
			
		//колонны
		
		function drawStrightColumns(){}; //пустая функция для навигации
		
		if(params.columnModel != "нет"){
			var profWidth = 40;
			var profHeight = 40;
			if(params.columnModel == "100x50"){
				profWidth = 100;
				profHeight = 50;
				}
			if(params.columnModel == "100x100"){
				profWidth = 100;
				profHeight = 100;
				}
			var colParams = {
				colLength: h1 * Math.round(stairAmt1 / 2) + h1/2,
				profWidth: profWidth,
				profHeight: profHeight,
				material: stringerMaterial,
				dxfArr: dxfPrimitivesArr, 
				dxfBasePoint: dxfBasePoint,
				text: "",
				}
			
			//позиции колонн
			var posX_1 = b1 * Math.round(stairAmt1 / 2) + (a1 - b1) + 20 + profWidth/2;
			var posX_top1 = b1 * stairAmt1 + params.platformLength_3 - profWidth/2 - 70;
			var posX_top2 = b2 * stairAmt1 + profWidth/2 + 100;
			
			var posZ_1 = (stringerThickness + profHeight / 2) * turnFactor;
			if (model == "ко") posZ_1 = (stringerSideOffset - profHeight / 2) * turnFactor;
			
			var posZ_2 = (M - stringerThickness - profHeight / 2) * turnFactor;
			if (model == "ко") posZ_2 = (M - stringerSideOffset + profHeight / 2) * turnFactor;
			
			
			//колонны под серединой марша
			if(params.isColumn1){
				colParams.text = "Колонна 1"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col1 = colParams.mesh;
				col1.position.x = posX_1;
				col1.position.y = 0;
				col1.position.z = posZ_1;
				carcas.push(col1);				
				}
			if(params.isColumn2){
				colParams.text = "Колонна 2"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_1;
				col2.position.y = 0;
				col2.position.z = posZ_2;
				carcas.push(col2);
				}
				
			//колонны верхней площадки
			colParams.colLength = h1 * (stairAmt1 + 1) - 50;
			if(params.isColumnTop1){
				colParams.text = "Колонна верхняя 1"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_top1;
				col2.position.y = 0;
				col2.position.z = posZ_1;
				carcas.push(col2);
				}
				
			if(params.isColumnTop2){
				colParams.text = "Колонна верхняя 2"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_top2;
				col2.position.y = 0;
				col2.position.z = posZ_1;
				carcas.push(col2);
				}
				
			if(params.isColumnTop3){
				colParams.text = "Колонна верхняя 3"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_top1;
				col2.position.y = 0;
				col2.position.z = posZ_2;
				carcas.push(col2);
				}
				
			if(params.isColumnTop4){
				colParams.text = "Колонна верхняя 4"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_top2;
				col2.position.y = 0;
				col2.position.z = posZ_2;
				carcas.push(col2);
				}
				
			
				
			}
		

			/***  ОГРАЖДЕНИЯ ПРЯМОЙ ЛЕСТНИЦЫ  ***/
			
			
			function drawStrightRailing(){}; //пустая функция для навигации через список функций
			
			
			var bottomEnd = "нет";
			var platformLengthBottom = 0;
            var platformLengthTop = platformLength_3
		    if (params.rackBottom == "сверху с крышкой" && model == "ко")
		        platformLengthTop -= 60;
			lastMarsh = true;
			topConnection = false;
			bottomConnection = false;

			//правая сторона
			if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
				var railingPositionZ = M*turnFactor;
				var railingSide = "right"
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";				
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection1 = drawRailingSection(sectionParams);
                railingSection1.position.z = railingPositionZ * scale;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection1.position.z -= 80 * turnFactor;
			        railingSection1.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection1.position.y += 60;
			    }

				//scene.add( railingSection2 );
			    railing.push(railingSection1);
			}
			//левая сторона
			if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
				var railingSide = "left"
				railingPositionZ = -40*turnFactor;
				var topEnd = "нет";
				if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection2 =drawRailingSection(sectionParams);
                railingSection2.position.z = railingPositionZ * scale;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection2.position.z += 80 * turnFactor;
			        railingSection2.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection2.position.y += 60;
			    }
				//scene.add( railingSection2 );
				railing.push(railingSection2)
			}

			/*заднее ограждение верхней площадки*/

			if (topPltRailing_5 && platformTop == "площадка") {
                var platformLength = M;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLength -= 160;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "left"
				var sectionPos = "staircase";

				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide,
					railingModel, sectionPos) //функция в файле drawBanisterSection.js
				railingSection5.rotation.y = -Math.PI / 2
				railingSection5.position.x = b1 * (stairAmt1) * scale + platformLength_3 * scale + stringerThickness * scale;
				if (model == "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
				railingSection5.position.y = h1 * (stairAmt1 + 1) + 60;
				railingSection5.position.z = 0;
				if(turnFactor == -1) {
					railingSection5.position.z = -M;
					railingSection5.position.x = railingSection5.position.x + 40;
                }
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection5.position.z += 80;
			        railingSection5.position.x -= 80;
			        railingSection5.position.y += 50 + treadThickness;
			    }

				//scene.add( railingSection5 );
				railing.push(railingSection5)
			}

	/*** ПРИСТЕННЫЙ ПОРУЧЕНЬ ***/

function addStrightSideHandrail(){}; //пустая функция для навигации

var sideHandrailParams = {
	dxfArr: dxfPrimitivesArr,
	dxfBasePoint: {x:-300, y:-3000},	
	stairType: "metal_com"
	}
	
sideHandrailParams = drawStrightSideHandrail(sideHandrailParams);
	
sideHandrailParams = drawStrightSideHandrail(sideHandrailParams);
	
var handrails = sideHandrailParams.handrails;
railing.push(handrails);
		}//конец прямой лестницы


		/***   Г-ОБРАЗНАЯ ЛЕСТНИЦА   ***/
		
		
		function drawGStaircase(){}; //пустая функция для навигации через список функций
		if (stairModel == "Г-образная с площадкой" || stairModel == "Г-образная с забегом") {

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

			if (stairModel == "Г-образная с площадкой") {
				if (stairAmt1 == 0) {
					x0 = -b1 * scale
					y0 = y0
				}
				else {
					x0 = tread.position.x - a1 / 2 * scale;
					y0 = tread.position.y;
				}
				z0 = M * scale * turnFactor;

				var platformLength = M;
				if (model == "лт") platformLength = M - stringerThickness;

				geometry = new THREE.BoxGeometry(platformLength * scale, treadThickness * scale, treadWidth * scale);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = h1 * scale + y0;
				tread.position.x = b1 * scale + x0 + M / 2 * scale - (M - platformLength) / 2 * scale;
				tread.position.z = M / 2 * scale * turnFactor;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);

				x0 = tread.position.x;
				y0 = tread.position.y;
				z0 = M * scale * turnFactor;

				//смещаем верхний марш
				if (model == "ко") {
					z0 = z0 - (a3 - b3) * scale * turnFactor;
				}
				else x0 = x0 + stringerThickness / 2 * scale;
				if (model == "лт" && stairAmt3 == 0) z0 = M * scale * turnFactor - (a3 - b3) * scale * turnFactor;
			}

			if (stairModel == "Г-образная с забегом") {
				if (stairAmt1 == 0) {
					x0 = -b1 * scale
					y0 = y0
				}
				else {
					x0 = tread.position.x - a1 / 2 * scale;
					y0 = tread.position.y;
				}
				z0 = 0;

				/*первая забежная ступень*/
				
				var treadParams = {
					treadThickness: treadThickness,
					length: M,
					stepWidthLow: 100,
					turnFactor: turnFactor,
					material: treadMaterial,
					}
				if (model == "ко") treadParams.stepWidthLow = 50;				
				
				treadParams = drawWinderTread1(treadParams);
				var turnStep1 = treadParams.mesh;
				turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
				turnStep1.position.x = b1 * scale + x0;
				turnStep1.position.y = treadThickness / 2 * scale * turnFactor + h1 * scale + y0;
				turnStep1.position.z = z0;
				turnStep1.castShadow = true;
				treads.push(turnStep1);

				/*вторая забежная ступень*/

				geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var turnStep2 = new THREE.Mesh(geom, treadMaterial);
				turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
				turnStep2.position.x = b1 * scale + x0;
				turnStep2.position.y = (h1 + h3) * scale + y0 + treadThickness / 2 * scale * turnFactor;
				turnStep2.position.z = 0;
				turnStep2.castShadow = true;
				//scene.add(turnStep2);
				treads.push(turnStep2);


				/*третья забежная ступень*/
				if(stairAmt3 == 0) treadParams.stepWidthLow = params.lastWinderTreadWidth;
				treadParams = drawWinderTread1(treadParams);
				var turnStep3 = treadParams.mesh;
				turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
				turnStep3.rotation.z = 0.5 * Math.PI;
				turnStep3.position.x = b1 * scale + M * scale + x0;
				turnStep3.position.y = -treadThickness / 2 * scale * turnFactor + (h1 + h3 * 2) * scale + y0;
				turnStep3.position.z = (M + treadParams.stepWidthLow) * turnFactor;
				turnStep3.castShadow = true;
				treads.push(turnStep3);

				/*подступенок второй забежной ступени*/
				if (riserType == "есть") {
					riserHeight = h3 - treadThickness;
					var riserLength = M / Math.cos(Math.PI / 6);
					geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);

					var riser;
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = -Math.PI / 6 * turnFactor;
					riser.position.y = y0 + riserHeight / 2 * scale + treadThickness / 2 * scale + h1 * scale;
					riser.position.x = b1 * scale + x0 + (L1 + L2 / 2) * scale - riserThickness / 2 * scale;
					riser.position.z = M / 2 * scale * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}


				//опорные точки для верхнего марша
				x0 = x0 + b1 * scale + M / 2 * scale;
				y0 = (stairAmt1 + 1) * h1 * scale + 2 * h3 * scale - treadThickness / 2 * scale;
				z0 = M * scale * turnFactor;

				/*подступенок третьей забежной ступени*/
				if (riserType == "есть") {
					riserHeight = h3 - treadThickness;
					var riserLength = M / Math.cos(Math.PI / 6);
					geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);

					var riser;
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = -Math.PI / 3 * turnFactor;
					riser.position.y = y0 - riserHeight / 2 * scale - treadThickness / 2 * scale// + h1*scale;
					riser.position.x = x0 //+ (L1 + L2) *scale - riserThickness/2 * scale;
					riser.position.z = (M * scale - L2 / 2 * scale + L1 * scale - riserThickness / 2 * scale) * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);

				}

				//смещаем верхний марш
				if (model == "ко") z0 = z0 + (L1 * scale - (a3 - b3) * scale) * turnFactor;
				if (model == "лт" && stairAmt3 == 0) z0 = (M * scale + L1 * scale - (a3 - b3) * scale) * turnFactor;


			}


			/*верхний марш*/

			geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, a3 * scale);


			for (var i = 0; i < stairAmt3; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h3 * (i + 1) * scale// - treadThickness/2);
				tread.position.x = x0// + M/2*scale;
				tread.position.z = z0 + (b3 * i + a3 / 2) * scale * turnFactor;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);
			}

		//базовая точка для верхней площадки
			if (stairAmt3 == 0) {
				platform_x = x0
				platform_y = y0 //+ h3*scale
				platform_z = z0 + ((a3 - b3) * scale - a3 / 2 * scale) * turnFactor;
			}
			else {
				platform_x = tread.position.x;
				platform_y = tread.position.y;
				platform_z = tread.position.z;
			}

			/*подступенки верхний марш*/
			if (riserType == "есть") {
				riserHeight = h3 - treadThickness;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, (M - 2 * riserSideOffset) * scale);

				var riser;
				for (var i = 0; i < stairAmt3; i++) {
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = -0.5 * Math.PI;
					riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness / 2) * scale;
					riser.position.x = x0 //+ M/2*scale;
					riser.position.z = z0 + (b3 * (i - 1) + a3 - riserThickness / 2) * scale * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}
			}


			/*верхняя площадка*/
			if (platformTop == "площадка") {
				geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, platformLength_3 * scale);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y  // + treadThickness/2*scale;
				tread.position.x = platform_x//(b1 * (stairAmt - 1) + platformLength_3/2) * scale;
				tread.position.z = platform_z + (platformLength_3 - a3) / 2 * scale * turnFactor;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);
				
				topStepPos = {
					x: platform_x + M/2,
					z: platform_z + (platformLength_3 - a3 / 2) * turnFactor,
					}

				
			}

			/*верхнее перекрытие*/

			if (platformTop != "площадка") {
			/*
				geometry = new THREE.BoxGeometry(M * scale, 300 * scale, M * scale);
				floorTop = new THREE.Mesh(geometry, floorMaterial);
				floorTop.castShadow = true;
				if (topStairType == "ниже") floorTop.position.y = platform_y + h3 * scale - 150 * scale + treadThickness / 2 * scale;
				if (topStairType == "вровень") floorTop.position.y = platform_y - 150 * scale + treadThickness / 2 * scale;
				floorTop.position.x = platform_x;
				floorTop.position.z = platform_z + (a3 + M) / 2 * scale * turnFactor;
				//scene.add( floorTop );
				topFloor.push(floorTop);
			*/
				topStepPos = {
					x: platform_x + M/2,
					z: platform_z + (a3 / 2) * turnFactor,
					}
					
			}

			/* ПЛИНТУС */
	
	 function addGSkirting(){}; //пустая функция для навигации
		 
	 if(params.model == "ко" && params.riserType == "есть" && (params.skirting_1 != "нет" || params.skirting_3 != "нет" )){
		 
		 var skirtingParams = {
			thk: params.riserThickness,
			rise: params.h1,
			step: params.b1,
			nose: params.a1 - params.b1 - params.riserThickness,
			treadThk: params.treadThickness,
			last: false,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
			material: timberMaterial,
			}
		
		//внутренняя сторона нижнего марша
		if(params.skirting_1 == "внутреннее" || params.skirting_1 == "две"){
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M//- skirtingParams.thk;
			for(var i=0; i<stairAmt1; i++){
				if(i == stairAmt1 - 1) {
					//skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b1;
		skirtingParams.last = false;
		if(params.skirting_1 == "внешнее" || params.skirting_1 == "две"){
			//плинтус марша
			var posZ = 0;
			if(turnFactor == -1) posZ = - skirtingParams.thk;
			
			for(var i=0; i<stairAmt1; i++){				
				/*if(i == stairAmt1 - 1) {
					skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
				*/
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			//плинутс площадки
			if(params.stairModel == "Г-образная с площадкой"){
				skirtingParams.step = params.M - params.riserThickness;
				skirtingParams.last = true;
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = h1 * stairAmt1;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			else if(stairModel == "Г-образная с забегом"){				
					skirtingParams.rise = params.h1;
					
					var tread3Width = M * Math.tan(Math.PI / 6) + L1 - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1;
				    skirting.position.y = h1 * stairAmt1;
				    skirting.position.z = posZ;
				    treads.push(skirting);
					
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;		
					skirtingParams.rise = params.h3;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + M * Math.tan(Math.PI / 6);
				    skirting.position.y = h1 * stairAmt1 + h1;
				    skirting.position.z = posZ;
				    treads.push(skirting);
				}
			}
			
		
		//внутренняя сторона верхнего марша
		skirtingParams.step = params.b3;
		skirtingParams.rise = params.h3;
		var topMarshSkirting = new THREE.Object3D();
		
		if(params.skirting_3 == "внутреннее" || params.skirting_3 == "две"){			
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M//- skirtingParams.thk;
			for(var i=0; i<stairAmt3; i++){
				if(i == stairAmt3 - 1) {
					skirtingParams.step = params.a3 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b3 * i + M  - params.riserThickness;
				if(stairModel == "Г-образная с забегом") skirting.position.x = b3 * i + Math.abs(z0) + skirtingParams.nose;
				skirting.position.y = h3 * i;
				if(stairModel == "Г-образная с забегом") skirting.position.y += 2*h3;	
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b3;
		skirtingParams.rise = params.h3;
		skirtingParams.last = false;
		var posZ = 0;
		if(turnFactor == -1) posZ = - skirtingParams.thk;
			
		if(params.skirting_3 == "внешнее" || params.skirting_3 == "две"){			
			//плинутс площадки
			if(params.stairModel == "Г-образная с площадкой"){
				skirtingParams.rise = 0;
				skirtingParams.step = params.M - params.riserThickness;
				//skirtingParams.last = true;
				//console.log(skirtingParams)
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = 0; //skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = 0; //h1 * stairAmt1;
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
				else if(stairModel == "Г-образная с забегом"){
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;
					skirtingParams.rise = 0;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = 0;
				    skirting.position.y = h3;
				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
					
					skirtingParams.rise = params.h3;
					skirtingParams.last = true;
					
					var tread3Width = M * Math.tan(Math.PI / 6) - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;
					skirtingParams.last = true;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = (M + L1 - L2) * scale - params.riserThickness;
				    skirting.position.y = h3;
				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
				}
				
			//плинтус марша
			skirtingParams.step = params.b3;
			skirtingParams.rise = params.h3;		
			
			for(var i=0; i<stairAmt3; i++){				
				if(i == stairAmt3 - 1) {
					skirtingParams.step = params.a3 - params.riserThickness;
					skirtingParams.last = true;
					}
				
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b3 * i + params.M - params.riserThickness;			
				if(stairModel == "Г-образная с забегом") skirting.position.x = b3 * i + Math.abs(z0) + skirtingParams.nose;
				skirting.position.y = h3 * i;
				if(stairModel == "Г-образная с забегом") skirting.position.y += 2*h3;			
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			
			if(params.stairModel == "Г-образная с забегом"){
				
				}
			}
		
		//позиционируем группу верхнего марша*/
		topMarshSkirting.rotation.y = -Math.PI/2 * turnFactor;
		topMarshSkirting.position.x = stairAmt1 * b1 + M;
		topMarshSkirting.position.y = (stairAmt1 + 1) * h1;
		treads.push(topMarshSkirting);
			
		
		}
		
		//end of addGSkirting

			/***  КАРКАС Г-ОБРАЗНОЙ ЛЕСТНИЦЫ   ***/

			
			function drawGStringers(){}; //пустая функция для навигации через список функций
			if (stairModel == "Г-образная с площадкой") {
				stringerTurn = "площадка";
				tyrnLength = M;
			}
			if (stairModel == "Г-образная с забегом") {
				stringerTurn = "забег";
				tyrnLength = M;
			}

			/*внешний косоур нижнего марша*/

			var stringerShape = drawStringer1(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.position.x = 0;
			stringer1.position.y = 0;
			stringer1.position.z = stringerSideOffset * scale * turnFactor;
			if (turnFactor == -1) stringer1.position.z = stringer1.position.z - stringerThickness * scale;
			stringer1.castShadow = true;
			//scene.add(stringer1);
			carcas.push(stringer1);

			/*внутренний косоур нижнего марша*/

			stringerShape = drawStringer2(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer2 = new THREE.Mesh(geom, stringerMaterial);
			stringer2.position.x = 0;
			stringer2.position.y = 0;
			stringer2.position.z = ((M - stringerThickness) * scale - stringerSideOffset * scale) * turnFactor;
			stringer2.castShadow = true;
			//scene.add(stringer2);
			carcas.push(stringer2);

			/*внешний косоур верхнего марша*/

			stringerShape = drawStringer3(
				model, stringerTurn, stringerType,
				h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, stringerSideOffset);

			if (stairModel == "Г-образная с площадкой") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -0.5 * Math.PI * turnFactor;
				stringer3.position.x = b1 * stairAmt1 * scale + M * scale - stringerSideOffset * scale;
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale - Math.max(h1, h3) * scale;
				if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) * scale - stringerWidth * scale;
				if (model == "ко") stringer3.position.z = -(a3 - b3) * scale * turnFactor;
				else stringer3.position.z = 0;
				stringer3.castShadow = true;
				//scene.add(stringer3);
				carcas.push(stringer3);
			}
			if (stairModel == "Г-образная с забегом") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -0.5 * Math.PI * turnFactor;
				stringer3.position.x = b1 * stairAmt1 * scale + M * scale - stringerSideOffset * scale;
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h3 * scale - Math.max(h1, h3) * scale;
				if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h3 * scale - stringerWidth * scale;
				stringer3.position.z = 0;
				stringer3.castShadow = true;
				//scene.add(stringer3);
				carcas.push(stringer3);
			}

			/*внутренний косоур верхнего марша*/

			stringerShape = drawStringer4(
				model, stringerTurn, stringerType,
				h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, stringerSideOffset);

			if (stairModel == "Г-образная с площадкой") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.rotation.y = -0.5 * Math.PI * turnFactor;
				stringer4.position.x = b1 * stairAmt1 * scale + stringerThickness * scale + stringerSideOffset * scale;
				stringer4.position.y = h1 * (stairAmt1 + 1) * scale - h3 * scale;
				if (model == "ко") stringer4.position.z = M * scale * turnFactor //- (a3-b3)*scale;
				else stringer4.position.z = M * scale * turnFactor;
				stringer4.castShadow = true;
				//scene.add(stringer4);
				carcas.push(stringer4);
			}
			if (stairModel == "Г-образная с забегом") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.rotation.y = -0.5 * Math.PI * turnFactor;
				stringer4.position.x = b1 * stairAmt1 * scale + stringerSideOffset * scale + stringerThickness * scale;
				stringer4.position.y = h1 * (stairAmt1 + 1) * scale - h3 * scale;
				stringer4.position.z = M * scale * turnFactor;
				stringer4.castShadow = true;
				//scene.add(stringer4);
				carcas.push(stringer4);
			}


			/*косоуры площадки*/

			if (platformTop == "площадка") {
				var stringerWidth = 150;
				var geom = new THREE.BoxGeometry(stringerThickness * scale, stringerWidth * scale, (platformLength_3 - a3) * scale);

				/*левый косоур площадки*/
				var platformStringer1 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer1.position.x = platform_x - (M / 2 - stringerThickness / 2) * scale + stringerSideOffset * scale;
				platformStringer1.position.y = platform_y - stringerWidth / 2 * scale + treadThickness / 2 * scale // + treadThickness/2*scale;
				platformStringer1.position.z = platform_z + platformLength_3 / 2 * scale * turnFactor
				platformStringer1.castShadow = true;
				//scene.add(platformStringer1);
				carcas.push(platformStringer1);

				/*правый косоур площадки*/
				var platformStringer2 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer2.position.x = platform_x + (M / 2 - stringerThickness / 2) * scale - stringerSideOffset * scale;
				platformStringer2.position.y = platformStringer1.position.y;
				platformStringer2.position.z = platform_z + platformLength_3 / 2 * scale * turnFactor
				platformStringer2.castShadow = true;
				//scene.add(platformStringer2);
				carcas.push(platformStringer2);

				/*задняя тетива площадки*/
				if (platformRearStringer == "есть") {
					var geom = new THREE.BoxGeometry(M * scale, stringerWidth * scale, stringerThickness * scale);
					var platformStringer3 = new THREE.Mesh(geom, stringerMaterial);
					platformStringer3.position.x = platform_x//(b1 * (stairAmt - 1) + platformLength_3 + stringerThickness/2) * scale;
					platformStringer3.position.y = platformStringer1.position.y;
					platformStringer3.position.z = platformStringer1.position.z + (platformLength_3 - a3 + stringerThickness) / 2 * scale * turnFactor;
					platformStringer3.castShadow = true;
					//scene.add(platformStringer3);
					carcas.push(platformStringer3);
				}

			}
			
			
			//рамки 
			if(params.stairFrame == "есть"){
			//рамки нижнего марша
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b1,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			
			var frameParams = drawFrame(frameParams);
			
			for(var i = 0; i < stairAmt1; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * i + frameParams.thk/2;
				
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
			
			    carcas.push(frame);
			}
			
			//рамки площадки
			if(stairModel == "Г-образная с площадкой") {
				frameParams.width = M/4;
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
				
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + M/4 + frameParams.thk/2 + 100;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки забега
			if(stairModel == "Г-образная с забегом") {
				frameParams.isTurn = true;
				frameParams.h1 = h3;
				frameParams.h2 = h3;

				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += 54;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки верхнего марша
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b3,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			
			for(var i = 0; i < stairAmt3; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.position.z = (b3 * i + M + frameParams.thk) * turnFactor;
				if(model == "ко" && stairModel == "Г-образная с забегом") 
					frame.position.z += a3-b3 + frameParams.thk;
					
			    frame.position.y = h1 * (stairAmt1 + 1) + h3 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.length / 2 + stringerThickness;
				
				if(turnFactor == -1) {
					frame.position.z = -b3 * i - M - frameParams.width - frameParams.thk * 2;
					frame.position.x += stringerThickness;
				}
				if(stairModel == "Г-образная с забегом") frame.position.y += 2*h3;
				if(model == "ко") {
					frame.position.x += stringerSideOffset;
				}
			
			    carcas.push(frame);
			}
			}
			
		//колонны
		
		function drawGColumns(){

			var profWidth = 40;
			var profHeight = 40;
			if (params.columnModel == "100x50") {
				profWidth = 100;
				profHeight = 50;
			}
			if (params.columnModel == "100x100") {
				profWidth = 100;
				profHeight = 100;
			}
			var colLength1 = h1 * stairAmt1 - h1/2
			var colParams = {
				colLength: colLength1,
				profWidth: profWidth,
				profHeight: profHeight,
				material: stringerMaterial,
				dxfArr: dxfPrimitivesArr, 
				dxfBasePoint: dxfBasePoint,
				text: "",
			}
			//позиции колонн
			
			// первая
			var posX_1 = b1 * stairAmt1 - b1/2;
			var posZ_1 = (stringerThickness + profHeight/2) * turnFactor;
			if (model == "ко") posZ_1 = (stringerSideOffset - profHeight/2) * turnFactor;

			// вторая
			var posZ_2 = (M - stringerThickness - profHeight/2) * turnFactor;
			if (model == "ко") posZ_2 = (M + profHeight/2 - stringerSideOffset) * turnFactor;

			// третья
			var posX_3 = b1 * stairAmt1 + M - stringerThickness - profHeight/2;
			var posZ_3 = (stringerThickness + profWidth/2) * turnFactor;
			if (model == "ко") {
				posX_3 = b1 * stairAmt1 + M + profHeight/2 - stringerSideOffset;
				posZ_3 += stringerSideOffset * turnFactor;
			}

			// четвёртая
			var posX_4 = b1 * stairAmt1 + M - stringerThickness - profHeight/2;
			var posZ_4 = (M - stringerThickness - profWidth/2) * turnFactor;
			if (model == "ко") {
				posX_4 = b1 * stairAmt1 + M + profHeight/2 - stringerSideOffset;
				posZ_4 -= stringerSideOffset * turnFactor;
			}

			if(params.isColumn1){
				colParams.text = "Колонна 1"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col1 = colParams.mesh;
				col1.position.x = posX_1;
				col1.position.y = 0;
				col1.position.z = posZ_1;
				carcas.push(col1);
			}
			if(params.isColumn2){
				colParams.text = "Колонна 2"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_1;
				col2.position.y = 0;
				col2.position.z = posZ_2;
				carcas.push(col2);
			}
			if(params.isColumn3){
				colParams.text = "Колонна 3"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h1;
				if(stairModel == "Г-образная с забегом") colParams.colLength = colLength1 + h1 + h3;
				colParams = drawColumn(colParams);
				var col3 = colParams.mesh;
				col3.rotation.y = -Math.PI / 2;
				col3.position.x = posX_3;
				col3.position.y = 0;
				col3.position.z = posZ_3;
				carcas.push(col3);
			}
			if(params.isColumn4){
				colParams.text = "Колонна 4"
				colParams.dxfBasePoint.x += 300;
				if(stairModel == "Г-образная с забегом") colParams.colLength = colLength1 + h1 + 2 * h3;
				colParams = drawColumn(colParams);
				var col4 = colParams.mesh;
				col4.rotation.y = -Math.PI / 2;
				col4.position.x = posX_4;
				col4.position.y = 0;
				col4.position.z = posZ_4;
				carcas.push(col4);
			}
		}
		
		if (params.columnModel != "нет") {
			drawGColumns();
		}
		
			/***  ОГРАЖДЕНИЯ Г-ОБРАЗНОЙ ЛЕСТНИЦЫ  ***/

			
			function drawGRailing(){}; //пустая функция для навигации через список функций
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
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthTop -= 60;
				var railingSide = "left"
				topConnection = outerHandrailConnection;
				bottomConnection = false;
				railingPositionZ = -40 * turnFactor;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1+1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection1 = drawRailingSection(sectionParams);
                railingSection1.position.z = railingPositionZ * scale;
                if (params.rackBottom == "сверху с крышкой" && model == "ко") {
                    railingSection1.position.z += 80 * turnFactor;
                    railingSection1.position.y += 50 + treadThickness;
                    if (railingModel == "Кованые балясины")
                        railingSection1.position.y += 60;
                }
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
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				
				var railingSection2 = drawRailingSection(sectionParams);
                railingSection2.position.z = railingPositionZ * scale;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection2.position.z -= 80 * turnFactor;
                    railingSection2.position.y += 50 + treadThickness;
                    if (railingModel == "Кованые балясины")
                        railingSection2.position.y += 60;
			    }
				//scene.add( railingSection2 );
				railing.push(railingSection2)
			}


			/*внешняя сторона верхнего марша*/
			lastMarsh = true;

			if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "площадка";
				if (stairModel == "Г-образная с забегом") bottomEnd = "забег";
				var platformLengthTop = platformLength_3;
                var platformLengthBottom = M;
                if (params.rackBottom == "сверху с крышкой" && model == "ко") {
                    platformLengthBottom -= 60;
                    platformLengthTop -= 100;
                }
				var railingSide = "left"
				topConnection = false;
				bottomConnection = outerHandrailConnection;
				railingPositionZ = M * turnFactor;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";
				
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection3 = drawRailingSection(sectionParams);
				railingSection3.rotation.y = (-Math.PI / 2 ) * turnFactor
				railingSection3.position.x = stringer4.position.x + M * scale - stringerThickness * scale + 40 * scale;
				if (model == "ко") railingSection3.position.x = railingSection3.position.x - stringerSideOffset * scale;
				railingSection3.position.y = h1 * (stairAmt1 + 1) * scale// + h3*scale;
				if (stairModel == "Г-образная с забегом") railingSection3.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h3 * scale;
                railingSection3.position.z = stringer4.position.z;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection3.position.x -= 80;
                    railingSection3.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection3.position.y += 60;
			    }
				//scene.add( railingSection3 );
				railing.push(railingSection3)
			}

			/*внутренняя сторона верхнего марша*/

			if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "нет";
                var platformLengthTop = platformLength_3;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthTop -= 100;
				var platformLengthBottom = 0;
				var railingSide = "right"
				railingPositionZ = M * turnFactor;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";
				
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection4 = drawRailingSection(sectionParams);
				railingSection4.rotation.y = -Math.PI / 2 * turnFactor
				railingSection4.position.x = stringer4.position.x - stringerThickness * scale;
				if (model == "ко") railingSection4.position.x = railingSection4.position.x - stringerSideOffset * scale;
				railingSection4.position.y = h1 * (stairAmt1 + 1) * scale// + h3*scale;
				if (stairModel == "Г-образная с забегом") railingSection4.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h3 * scale;
                railingSection4.position.z = stringer4.position.z;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection4.position.x += 80;
                    railingSection4.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection4.position.y += 60;
			    }
				//scene.add( railingSection4 );
				railing.push(railingSection4)
			}

			/*заднее ограждение верхней площадки*/
	
			if (topPltRailing_5 && platformTop == "площадка") {
				
                var platformLength = M;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLength -= 160;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "right"
				if (railingModel == "Самонесущее стекло") railingSide = "left"
				var sectionPos = "staircase";

				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide,
					railingModel, sectionPos) //функция в файле drawBanisterSection.js
				railingSection5.position.x = platform_x - M / 2 * scale;
				railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2 * scale;
				railingSection5.position.z = platformStringer1.position.z + ((platformLength_3 - a3) / 2 * scale + 40 * scale) * turnFactor;
                if (model == "лт") railingSection5.position.z = railingSection5.position.z + stringerThickness * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
                    railingSection5.position.z -= 80 * turnFactor;
                    railingSection5.position.x += 80;
			        railingSection5.position.y += 110 + treadThickness;
			    }

				console.log(platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide)
				railing.push(railingSection5)
			}

				/*** ПРИСТЕННЫЙ ПОРУЧЕНЬ ***/

function addGHandrail(){}; //пустая функция для навигации

var sideHandrailParams = {
	dxfArr: dxfPrimitivesArr,
	dxfBasePoint: {x:0, y:-4000},	
	stairType: "metal_com",
	topMarshPos_Z: z0
	}
	
sideHandrailParams = drawTurn90SideHandrail(sideHandrailParams);
	
var handrails = sideHandrailParams.handrails;
railing.push(handrails);
			
		}//конец Г-образной


		/*** П-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


		function drawPStaircase(){}; //пустая функция для навигации через список функций
		if (stairModel == "П-образная с площадкой" || stairModel == "П-образная с забегом") {

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

			if (stairModel == "П-образная с площадкой") {
				if (stairAmt1 == 0) {
					x0 = -b1 * scale
					y0 = y0
				}
				else {
					x0 = tread.position.x - a1 / 2 * scale;
					y0 = tread.position.y;
				}
				z0 = M * scale * turnFactor;
				var platformWidth = platformWidth_1;
				if (model == 'лт') platformWidth = platformWidth_1 - 2 * stringerThickness;

				geometry = new THREE.BoxGeometry(platformLength_1 * scale, treadThickness * scale, platformWidth * scale);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = h1 * scale + y0;
				tread.position.x = b1 * scale + x0 + platformLength_1 / 2 * scale;
				tread.position.z = platformWidth_1 / 2 * scale * turnFactor;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);

				x0 = tread.position.x - platformLength_1 / 2 * scale;
				y0 = tread.position.y;
				z0 = (platformWidth_1 - M) * scale * turnFactor;

				if (model == "ко") x0 = x0 + (a3 - b3) * scale;
			}

			if (stairModel == "П-образная с забегом") {
				if (stairAmt1 == 0) {
					x0 = -b1 * scale
					y0 = y0 + h1 * scale;
				}
				else {
					x0 = tread.position.x - a1 / 2 * scale;
					y0 = tread.position.y + h1 * scale;
				}
				z0 = 0 //M*scale;

				/* забежная ступень 1 */
				
				var treadParams = {
					treadThickness: treadThickness,
					length: M,
					stepWidthLow: 100,
					turnFactor: turnFactor,
					material: treadMaterial,
					}
				if (model == "ко") treadParams.stepWidthLow = 50;				
				
				treadParams = drawWinderTread1(treadParams);
				var turnStep1 = treadParams.mesh;
				turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
				turnStep1.position.x = b1 * scale + x0;
				turnStep1.position.y = treadThickness / 2 * scale * turnFactor + y0;
				turnStep1.position.z = z0;
				turnStep1.castShadow = true;
				treads.push(turnStep1);

				/* забежная ступень 2 */

				geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var turnStep2 = new THREE.Mesh(geom, treadMaterial);
				turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
				turnStep2.position.x = b1 * scale + x0;
				turnStep2.position.y = turnStep1.position.y + h3 * scale;
				turnStep2.position.z = 0;
				turnStep2.castShadow = true;
				//scene.add(turnStep2);
				treads.push(turnStep2);


				/* забежная ступень 3 */
				if (model == "ко") treadParams.stepWidthLow += marshDist;
				if (model == "лт" && marshDist > 70) treadParams.stepWidthLow += marshDist - 70;
				treadParams = drawWinderTread1(treadParams);
				var turnStep3 = treadParams.mesh;
				turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
				turnStep3.rotation.z = 0.5 * Math.PI;
				turnStep3.position.x = b1 * scale + M * scale + x0;
				turnStep3.position.y = turnStep2.position.y + h3 * scale - treadThickness * scale * turnFactor;
				turnStep3.position.z = (M * scale + treadParams.stepWidthLow) * turnFactor;
				turnStep3.castShadow = true;
				treads.push(turnStep3);

				/*удлиннение 3 забежной ступени*/
				if (model == "ко") {
					var extraTread;
					geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, marshDist * scale);
					extraTread = new THREE.Mesh(geometry, treadMaterial);
					extraTread.position.x = turnStep3.position.x - M / 2 * scale;
					extraTread.position.y = turnStep3.position.y + treadThickness / 2 * scale * turnFactor;
					extraTread.position.z = turnStep3.position.z + marshDist / 2 * scale * turnFactor;
					extraTread.castShadow = true;
					//scene.add( extraTread );
					//treads.push(extraTread); 
				}

				if (model == "лт" && marshDist > 70) {
					var extraTread;
					geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, (marshDist - 70) * scale);
					extraTread = new THREE.Mesh(geometry, treadMaterial);
					extraTread.position.x = turnStep3.position.x - M / 2 * scale;
					extraTread.position.y = turnStep3.position.y + treadThickness / 2 * turnFactor;
					extraTread.position.z = turnStep3.position.z + (marshDist - 70) / 2 * scale * turnFactor;
					extraTread.castShadow = true;
					//scene.add( extraTread );
					//treads.push(extraTread);
				}

				/* забежная ступень 4 */

				var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var turnStep4 = new THREE.Mesh(geom, treadMaterial);
				turnStep4.rotation.x = 0.5 * Math.PI * turnFactor;
				turnStep4.rotation.z = 0.5 * Math.PI;
				turnStep4.position.x = x0 + b1 * scale + M * scale;
				turnStep4.position.y = turnStep1.position.y + h3 * 3 * scale;
				turnStep4.position.z = z0 + (M + marshDist) * scale * turnFactor;
				turnStep4.castShadow = true;
				//scene.add(turnStep4);
				treads.push(turnStep4);

				/* забежная ступень 5 */

				geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var turnStep5 = new THREE.Mesh(geom, treadMaterial);
				turnStep5.rotation.x = 0.5 * Math.PI * turnFactor;
				turnStep5.rotation.z = 0.5 * Math.PI;
				turnStep5.position.x = b1 * scale + x0 + M * scale;
				turnStep5.position.y = turnStep1.position.y + h3 * 4 * scale;
				turnStep5.position.z = 0 + (marshDist + M) * scale * turnFactor;
				turnStep5.castShadow = true;
				//scene.add(turnStep5);
				treads.push(turnStep5);

				/* забежная ступень 6 */
				
				treadParams.stepWidthLow = 100;
				if (model == "ко") treadParams.stepWidthLow = 50;
				if(stairAmt3 == 0) treadParams.stepWidthLow = params.lastWinderTreadWidth;
				
				treadParams = drawWinderTread1(treadParams);
				var turnStep6 = treadParams.mesh;
				turnStep6.rotation.x = -0.5 * Math.PI * turnFactor;
				turnStep6.rotation.z = 0 * Math.PI;
				turnStep6.position.x = b1 + x0 - treadParams.stepWidthLow;
				turnStep6.position.y = -treadThickness * scale * turnFactor + turnStep1.position.y + h3 * 5 * scale;
				turnStep6.position.z = (2 * M + marshDist) * scale * turnFactor;
				turnStep6.castShadow = true;
				//scene.add(turnStep6);
				treads.push(turnStep6);


				/*подступенок второй забежной ступени*/
				if (riserType == "есть") {
					riserHeight = h3 - treadThickness;
					var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
					geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);

					var riser;
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = -Math.PI / 6 * turnFactor;
					riser.position.x = turnStep1.position.x + (L1 + L2 / 2) * scale - riserThickness / 2 * scale * turnFactor;
					riser.position.y = turnStep1.position.y + riserHeight / 2 * scale;
					riser.position.z = turnStep1.position.z + M / 2 * scale * turnFactor;
					if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness * scale;
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
					riser.rotation.y = -Math.PI / 3 * turnFactor;
					riser.position.x = turnStep2.position.x + M / 2 * scale;// + (L1 + L2) *scale - riserThickness/2 * scale;
					riser.position.y = turnStep2.position.y + riserHeight / 2 * scale;
					riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * scale * turnFactor;
					if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness * scale;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}

				/*подступенок четвертой забежной ступени*/
				if (riserType == "есть") {
					riserHeight = h3 - treadThickness;
					var riserLength = M - riserSideOffset * 2;
					geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);
					var riser;
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = -Math.PI / 2 * turnFactor;
					riser.position.x = turnStep3.position.x - M / 2 * scale;
					riser.position.y = turnStep4.position.y - riserHeight / 2 * scale - treadThickness * scale * turnFactor;
					if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness * scale;
					riser.position.z = turnStep4.position.z - (riserThickness / 2 - L1) * scale * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}

				/*подступенок пятой забежной ступени*/
				if (riserType == "есть") {
					riserHeight = h3 - treadThickness;
					var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
					geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);
					var riser;
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = Math.PI / 3 * turnFactor;
					riser.position.x = turnStep3.position.x - M / 2 * scale;
					riser.position.y = turnStep5.position.y - riserHeight / 2 * scale - treadThickness * scale * turnFactor;
					if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness * scale;
					riser.position.z = turnStep5.position.z - (riserThickness / 2 - L1 - L2 / 2) * scale * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}

				/*подступенок шестой забежной ступени*/
				if (riserType == "есть") {
					riserHeight = h3 - treadThickness;
					var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
					geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, riserLength * scale);
					var riser;
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.rotation.y = Math.PI / 6 * turnFactor;
					riser.position.x = turnStep3.position.x - M * scale + L2 / 2 * scale - L1 * scale + riserThickness / 2 * scale;
					riser.position.y = turnStep6.position.y - riserHeight / 2 * scale;// - treadThickness*scale
					if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness * scale;
					riser.position.z = turnStep6.position.z - M / 2 * scale * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}


				x0 = turnStep6.position.x + treadParams.stepWidthLow * scale;
				y0 = turnStep6.position.y + treadThickness / 2 * scale * turnFactor;
				z0 = turnStep6.position.z - M * scale * turnFactor;

				if (model == "ко") x0 = x0 + (a3 - b3) * scale - treadParams.stepWidthLow;

			}


			/*верхний марш*/

			geometry = new THREE.BoxGeometry(a3 * scale, treadThickness * scale, treadWidth * scale);

			for (var i = 0; i < stairAmt3; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + h3 * (i + 1) * scale; // - treadThickness/2)*scale;
				tread.position.x = x0 - (b3 * i + a3 / 2) * scale;
				tread.position.z = z0 + M / 2 * scale * turnFactor;
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
					riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness / 2 ) * scale;
					riser.position.x = x0 - (b3 * (i - 1) + a3 - riserThickness / 2) * scale;
					riser.position.z = z0 + M / 2 * scale * turnFactor;
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
				geometry = new THREE.BoxGeometry(platformLength_3 * scale, treadThickness * scale, platformWidthTop * scale);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y  // + treadThickness/2*scale;
				tread.position.x = platform_x - (platformLength_3 - a3) / 2 * scale;
				tread.position.z = platform_z// + (platformLength_3 - a3)/2*scale;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);
				
				topStepPos = {
					x: platform_x - platformLength_3 + a3 / 2, 
					z: platform_z + (M / 2) * turnFactor,
					}
			}

			/*верхнее перекрытие*/

			if (platformTop != "площадка") {
				//базовая точка для верхней площадки
				if (stairAmt3 == 0) {
					platform_x = x0 + a3 / 2 * scale;
					platform_y = y0 //+ h3*scale
					platform_z = z0 + M / 2 * scale * turnFactor;
					if (model == "ко") platform_x = platform_x - (a3 - b3) * scale
					if (model == "лт" && stairModel == "П-образная с забегом") platform_x = platform_x - L1 * scale

				}
				else {
					platform_x = tread.position.x;
					platform_y = tread.position.y;
					platform_z = tread.position.z;
				}
				/*
				geometry = new THREE.BoxGeometry(M * scale, 300 * scale, M * scale);
				floorTop = new THREE.Mesh(geometry, floorMaterial);
				floorTop.castShadow = true;
				if (topStairType == "ниже") floorTop.position.y = platform_y + h3 * scale - 150 * scale + treadThickness / 2 * scale;
				if (topStairType == "вровень") floorTop.position.y = platform_y - 150 * scale + treadThickness / 2 * scale;
				floorTop.position.x = platform_x - (a3 + M) / 2 * scale;
				floorTop.position.z = platform_z//*turnFactor;
				//scene.add( floorTop );
				topFloor.push(floorTop);
				*/
				topStepPos = {
					x: platform_x - a3 / 2,
					z: platform_z + (M / 2) * turnFactor,
					}
				
			}

	function addPSkirting(){}; //пустая функция для навигации
		 
	 if(params.model == "ко" && params.riserType == "есть" && (params.skirting_1 != "нет" || params.skirting_3 != "нет" )){
		 
		 var skirtingParams = {
			thk: params.riserThickness,
			rise: params.h1,
			step: params.b1,
			nose: params.a1 - params.b1 - params.riserThickness,
			treadThk: params.treadThickness,
			last: false,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
			material: timberMaterial,
			}
		
		//внутренняя сторона нижнего марша
		if(params.skirting_1 == "внутреннее" || params.skirting_1 == "две"){
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M//- skirtingParams.thk;
			for(var i=0; i<stairAmt1; i++){
				if(i == stairAmt1 - 1) {
					//skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b1;
		skirtingParams.last = false;
		if(params.skirting_1 == "внешнее" || params.skirting_1 == "две"){
			//плинтус марша
			var posZ = 0;
			if(turnFactor == -1) posZ = - skirtingParams.thk;
			
			for(var i=0; i<stairAmt1; i++){				
				/*if(i == stairAmt1 - 1) {
					skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
				*/
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			//плинтyс площадки
			if(params.stairModel == "П-образная с площадкой"){
				skirtingParams.step = params.platformLength_1 - params.riserThickness;
				skirtingParams.last = true;
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = h1 * stairAmt1;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			else if(stairModel == "П-образная с забегом"){				
					skirtingParams.rise = params.h1;
					
					var tread3Width = M * Math.tan(Math.PI / 6) + L1 - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1;
				    skirting.position.y = h1 * stairAmt1;
				    skirting.position.z = posZ;
				    treads.push(skirting);
					
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;		
					skirtingParams.rise = params.h3;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + M * Math.tan(Math.PI / 6);
				    skirting.position.y = h1 * stairAmt1 + h1;
				    skirting.position.z = posZ;
				    treads.push(skirting);
				}
			}
		
        if(params.skirting_plt == "есть"){
			if(params.stairModel == "П-образная с площадкой"){
				skirtingParams.step = 2*params.M + params.marshDist;
				skirtingParams.rise = 0;
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + params.platformLength_1 - skirtingParams.thk;
				if(turnFactor == -1) skirting.position.x -= skirtingParams.thk;
				skirting.position.y = h1 * (stairAmt1 + 1);
				skirting.position.z = 0;
				skirting.rotation.y = -Math.PI/2 * turnFactor;
				treads.push(skirting);
			}
		}

        if(params.skirting_wnd == "есть"){
			if(stairModel == "П-образная с забегом"){

					//плинтус задней стенки забега
					
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;
					skirtingParams.rise = 0;
					
				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + params.M - skirtingParams.thk;
					if(turnFactor == -1) skirting.position.x -= skirtingParams.thk;
				    skirting.position.y = h1*(stairAmt1+1) + h3;
				    skirting.position.z = 0;
			    	skirting.rotation.y = -Math.PI/2 * turnFactor;
				    treads.push(skirting);
					
					skirtingParams.rise = params.h3;
					skirtingParams.step = M * Math.tan(Math.PI / 6) + params.marshDist + L1 - params.riserThickness;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + params.M - skirtingParams.thk;
					if(turnFactor == -1) skirting.position.x -= skirtingParams.thk;
				    skirting.position.y = h1*(stairAmt1+1) + h3;
				    skirting.position.z = ((M + L1 - L2) * scale - params.riserThickness)*turnFactor;
			    	skirting.rotation.y = -Math.PI/2 * turnFactor;
				    treads.push(skirting);
					
					skirtingParams.rise = params.h3;
					skirtingParams.step = M * Math.tan(Math.PI / 6) + L1 - params.riserThickness;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + params.M - skirtingParams.thk;
					if(turnFactor == -1) skirting.position.x -= skirtingParams.thk;
				    skirting.position.y = h1*(stairAmt1+1) + 2*h3;
				    skirting.position.z = ((M + L1 - L2) * scale - params.riserThickness + M * Math.tan(Math.PI / 6) + params.marshDist)*turnFactor;
			    	skirting.rotation.y = -Math.PI/2 * turnFactor;
				    treads.push(skirting);
					
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;	
					skirtingParams.rise = params.h3;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + params.M - skirtingParams.thk;
					if(turnFactor == -1) skirting.position.x -= skirtingParams.thk;
				    skirting.position.y = h1*(stairAmt1+1) + 3*h3;
				    skirting.position.z = ((M + L1 - L2) * scale - params.riserThickness + M * Math.tan(Math.PI / 6) + params.marshDist + M * Math.tan(Math.PI / 6))*turnFactor;
			    	skirting.rotation.y = -Math.PI/2 * turnFactor;
				    treads.push(skirting);
			}
		}			
			
		//внутренняя сторона верхнего марша
		skirtingParams.step = params.b3;
		skirtingParams.rise = params.h3;
		var topMarshSkirting = new THREE.Object3D();
		
		if(params.skirting_3 == "внутреннее" || params.skirting_3 == "две"){
			var stepWidthLow = 50;
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M;
			for(var i=0; i<stairAmt3; i++){
				if(i == stairAmt3 - 1) {
					skirtingParams.step = params.a3 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b3 * i + params.platformLength_1 - params.riserThickness;
				if(stairModel == "П-образная с забегом") skirting.position.x = M + b3 * i + stepWidthLow - params.riserThickness;
				skirting.position.y = h3 * i;
				if(stairModel == "П-образная с забегом") skirting.position.y += 5*h3;
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b3;
		skirtingParams.rise = params.h3;
		skirtingParams.last = false;
		var posZ = 0;
		if(turnFactor == -1) posZ = - skirtingParams.thk;
			
		if(params.skirting_3 == "внешнее" || params.skirting_3 == "две"){
			//плинутс площадки
			if(params.stairModel == "П-образная с площадкой"){
				skirtingParams.rise = 0;
				skirtingParams.step = params.platformLength_1 - params.riserThickness;
				//skirtingParams.last = true;
				//console.log(skirtingParams)
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = 0; //skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = 0; //h1 * stairAmt1;
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
				else if(stairModel == "П-образная с забегом"){
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;
					skirtingParams.rise = 0;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = 0;
				    skirting.position.y = 4*h3;
				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
					
					skirtingParams.rise = params.h3;
					skirtingParams.last = true;
					
					var tread3Width = M * Math.tan(Math.PI / 6) - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;
					skirtingParams.last = true;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = (M + L1 - L2) * scale - params.riserThickness;
				    skirting.position.y = 4*h3;
				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
				}
				
			//плинтус марша
			skirtingParams.step = params.b3;
			skirtingParams.rise = params.h3;		
			
			for(var i=0; i<stairAmt3; i++){				
				if(i == stairAmt3 - 1) {
					skirtingParams.step = params.a3 - params.riserThickness;
					skirtingParams.last = true;
					}
				
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b3 * i + params.platformLength_1 - params.riserThickness;			
				if(stairModel == "П-образная с забегом") skirting.position.x = M + b3 * i + stepWidthLow - params.riserThickness;
				skirting.position.y = h3 * i;
				if(stairModel == "П-образная с забегом") skirting.position.y += 5*h3;			
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			
			if(params.stairModel == "П-образная с забегом"){
				
				}
			}
		
		//позиционируем группу верхнего марша*/
		topMarshSkirting.rotation.y = -Math.PI * turnFactor;
		topMarshSkirting.position.x = stairAmt1 * b1 + params.platformLength_1;
		if(stairModel == "П-образная с забегом") topMarshSkirting.position.x = stairAmt1 * b1 + M;
		topMarshSkirting.position.y = (stairAmt1 + 1) * h1;
		topMarshSkirting.position.z = (2*M + marshDist)*turnFactor;
		
		treads.push(topMarshSkirting);
			
		
		}
		

			/***  КАРКАС П-ОБРАЗНОЙ ЛЕСТНИЦЫ   ***/


			function drawPStringers(){}; //пустая функция для навигации через список функций
			if (stairModel == "П-образная с площадкой") {
				stringerTurn = "площадка";
				tyrnLength = platformLength_1;
			}
			if (stairModel == "П-образная с забегом") {
				stringerTurn = "забег";
				tyrnLength = M;
			}

			/*внешний косоур нижнего марша*/

			var stringerShape = drawStringer1(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.position.x = 0;
			stringer1.position.y = 0;
			stringer1.position.z = stringerSideOffset * scale * turnFactor;
			if (turnFactor == -1) stringer1.position.z = stringer1.position.z - stringerThickness * scale;
			stringer1.castShadow = true;
			//scene.add(stringer1);
			carcas.push(stringer1);

			/*внутренний косоур нижнего марша*/

			stringerShape = drawStringer2(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer2 = new THREE.Mesh(geom, stringerMaterial);
			stringer2.position.x = 0;
			stringer2.position.y = 0;
			stringer2.position.z = (M - stringerThickness - stringerSideOffset) * scale * turnFactor;
			stringer2.castShadow = true;
			//scene.add(stringer2);
			carcas.push(stringer2);

			/*внешний косоур верхнего марша*/
			var stringerPlatformHeight = Math.max(h1, h3);
			if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

			stringerShape = drawStringer3(
				model, stringerTurn, stringerType,
				h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, stringerSideOffset);

			if (stairModel == "П-образная с площадкой") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -1 * Math.PI * turnFactor;
				stringer3.position.x = b1 * stairAmt1 * scale + platformLength_1 * scale;
				if (model == "ко") stringer3.position.x = stringer3.position.x + (a3 - b3) * scale;
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale - stringerPlatformHeight * scale;
				stringer3.position.z = (platformWidth_1 - stringerSideOffset) * scale * turnFactor;
				stringer3.castShadow = true;
				//scene.add(stringer3);
				carcas.push(stringer3);

			}
			if (stairModel == "П-образная с забегом") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -1 * Math.PI * turnFactor;
				stringer3.position.x = b1 * stairAmt1 * scale + M * scale;
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h3 * 4 * scale - Math.max(h1, h3) * scale;
				if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h3 * 4 * scale - stringerWidth * scale;
				stringer3.position.z = (M * 2 + marshDist - stringerSideOffset) * scale * turnFactor;
				stringer3.castShadow = true;
				//scene.add(stringer3);
				carcas.push(stringer3);

			}

			/*внутренний косоур верхнего марша*/

			var stringerPlatformHeight = Math.max(h1, h3);
			if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;


			if (stairModel == "П-образная с площадкой") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.rotation.y = -1 * Math.PI * turnFactor;
				stringer4.position.x = b1 * stairAmt1 * scale + platformLength_1 * scale;
				if (model == "ко") stringer4.position.x = stringer4.position.x + (a3 - b3) * scale;
				//	stringer4.position.y = h1*(stairAmt1 + 1)*scale - Math.max(h1, h3)*scale;
				// 21.07.16 - исправление ошибки неверной координаты по высоте у внутренней тетивы ЛТ4
				stringer4.position.y = h1 * (stairAmt1 + 1) * scale - stringerPlatformHeight * scale;
				stringer4.position.z = (platformWidth_1 - M + stringerSideOffset + stringerThickness) * scale * turnFactor;
				stringer4.castShadow = true;
				//scene.add(stringer4);
				carcas.push(stringer4);
			}

			stringerShape = drawStringer4(
				model, stringerTurn, stringerType,
				h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, stringerSideOffset);

			if (stairModel == "П-образная с забегом") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.rotation.y = -1 * Math.PI * turnFactor;
				stringer4.position.x = b1 * stairAmt1 * scale;
				stringer4.position.y = h1 * (stairAmt1 + 1) * scale + h3 * 2 * scale;
				stringer4.position.z = (M + marshDist + stringerSideOffset + stringerThickness) * scale * turnFactor;
				stringer4.castShadow = true;
				//scene.add(stringer4);
				carcas.push(stringer4);
			}

			/*внешний косоур среднего марша*/

			if (stairModel == "П-образная с площадкой") {
				var stringerPlatformHeight = Math.max(h1, h3);
				if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
				geometry = new THREE.BoxGeometry(stringerThickness * scale, stringerPlatformHeight * scale, platformWidth_1 * scale);
				var stringer5 = new THREE.Mesh(geometry, stringerMaterial);
				stringer5.position.x = b1 * stairAmt1 * scale + platformLength_1 * scale - stringerSideOffset * scale;
				stringer5.position.y = h1 * (stairAmt1 + 1) * scale - stringerPlatformHeight / 2 * scale;
				if (model == "ко") stringer5.position.y = stringer5.position.y - treadThickness * scale;
				stringer5.position.z = platformWidth_1 / 2 * scale * turnFactor;
				stringer5.castShadow = true;
				//scene.add(stringer5);
				carcas.push(stringer5);
			}

			if (stairModel == "П-образная с забегом") {
				tyrnLength = M;
				h2 = h3;
				var stringerPlatformHeight = Math.max(h1, h3);
				if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
				stairAmt2 = 0;
				turnType_1 = "забег";
				turnType_2 = "забег";

				stringerShape = drawStringer5(
					model,
					stringerType,
					turnType_1, turnType_2,
					h1, b1, stairAmt1,
					h2, b2, stairAmt2,
					h3, b3, stairAmt3,
					a2, a3, L1, L2, tyrnLength,
					marshDist, scale, stringerSideOffset);

				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer5 = new THREE.Mesh(geom, stringerMaterial);
				stringer5.rotation.y = -0.5 * Math.PI * turnFactor;
				stringer5.position.x = b1 * stairAmt1 * scale + M * scale - stringerSideOffset * scale;
				stringer5.position.y = h1 * (stairAmt1 + 1) * scale + h2 * scale - stringerPlatformHeight * scale;
				stringer5.position.z = 0//M*scale + b2*stairAmt2*scale;
				stringer5.castShadow = true;
				//scene.add(stringer5);
				carcas.push(stringer5);

			}

			/*внутренний косоур среднего марша*/
			if (stairModel == "П-образная с площадкой") {
				var stringerPlatformHeight = Math.max(h1, h3);
				if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
				var plateLength = (platformWidth_1 - M);
				geometry = new THREE.BoxGeometry(stringerThickness * scale, stringerPlatformHeight * scale, (plateLength) * scale);
				var stringer5 = new THREE.Mesh(geometry, stringerMaterial);
				stringer5.position.x = b1 * stairAmt1 * scale + stringerSideOffset * scale;
				stringer5.position.y = h1 * (stairAmt1 + 1) * scale - stringerPlatformHeight / 2 * scale;
				stringer5.position.z = (platformWidth_1 - plateLength / 2 ) * scale * turnFactor;
				if (model == "ко") {
					stringer5.position.y = stringer5.position.y - treadThickness * scale;
					stringer5.position.z = stringer5.position.z - stringerSideOffset * scale * turnFactor;
				}

				stringer5.castShadow = true;
				//scene.add(stringer5);
				carcas.push(stringer5);
			}

			if (stairModel == "П-образная с забегом") {
				tyrnLength = M;
				h2 = h3;
				var stringerPlatformHeight = Math.max(h1, h2);
				if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
				stairAmt2 = 0;
				turnType_1 = "забег";
				turnType_2 = "забег";

				stringerShape = drawStringer6(
					model,
					stringerType,
					turnType_1, turnType_2,
					h1, b1, stairAmt1,
					h2, b2, stairAmt2,
					h3, b3, stairAmt3,
					a2, a3, L1, L2, tyrnLength,
					marshDist, scale, stringerSideOffset);

				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer6 = new THREE.Mesh(geom, stringerMaterial);
				stringer6.rotation.y = -0.5 * Math.PI * turnFactor;
				stringer6.position.x = b1 * stairAmt1 * scale + stringerThickness * scale + stringerSideOffset * scale;
				stringer6.position.y = h1 * (stairAmt1 + 1) * scale// + h2*scale;
				stringer6.position.z = M * scale * turnFactor;
				stringer6.castShadow = true;
				//scene.add(stringer6);
				carcas.push(stringer6);

				if (turnType_1 == "площадка") {
					stringer6.position.y = stringer6.position.y - stringerPlatformHeight * scale;
				}
				if (turnType_1 == "забег") {
					stringer6.position.y = stringer6.position.y - h2 * scale;
				}

			}

			/*косоуры площадки*/

			if (platformTop == "площадка") {
				var stringerWidth = 150;
				var geom = new THREE.BoxGeometry((platformLength_3 - a3) * scale, stringerWidth * scale, stringerThickness * scale);

				/*левый косоур площадки*/
				var platformStringer1 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer1.position.x = platform_x - platformLength_3 / 2 * scale
				platformStringer1.position.y = platform_y - stringerWidth / 2 * scale + treadThickness / 2 * scale - stringerOffset_y * scale;
				platformStringer1.position.z = platform_z + (M / 2 - stringerThickness / 2 - stringerSideOffset) * scale * turnFactor;
				platformStringer1.castShadow = true;
				//scene.add(platformStringer1);
				carcas.push(platformStringer1);

				/*правый косоур площадки*/
				var platformStringer2 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer2.position.x = platformStringer1.position.x;
				platformStringer2.position.y = platformStringer1.position.y;
				platformStringer2.position.z = platform_z + ( -M / 2 + stringerThickness / 2 + stringerSideOffset) * scale * turnFactor;
				platformStringer2.castShadow = true;
				//scene.add(platformStringer2);
				carcas.push(platformStringer2);

				/*задняя тетива площадки*/
				if (platformRearStringer == "есть") {
					var geom = new THREE.BoxGeometry(stringerThickness * scale, stringerWidth * scale, M * scale);
					var platformStringer3 = new THREE.Mesh(geom, stringerMaterial);
					platformStringer3.position.x = platformStringer1.position.x - (platformLength_3 - a3 + stringerThickness) / 2 * scale;
					platformStringer3.position.y = platformStringer1.position.y;
					platformStringer3.position.z = platform_z;
					platformStringer3.castShadow = true;
					//scene.add(platformStringer3);
					carcas.push(platformStringer3);
				}

			}
			
			//рамки 
			if(params.stairFrame == "есть"){
			//рамки нижнего марша
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b1,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			
			var frameParams = drawFrame(frameParams);
			
			for(var i = 0; i < stairAmt1; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * i + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки площадки
			if(stairModel == "П-образная с площадкой") {
				frameParams.width = platformLength_1/4;
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
				
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + platformLength_1/4 + frameParams.thk/2 + 100;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки забега
			if(stairModel == "П-образная с забегом") {
				frameParams.isTurn = true;
				frameParams.h1 = h3;
				frameParams.h2 = h3;
				frameParams.marshDist = params.marshDist;

				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
				
				frameParams.marshDist = null;
				frameParams.isTurn = true;
				frameParams.h1 = h3;
				frameParams.h2 = h3;

				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = 0;
				if(turnFactor == -1) frame.rotation.y = Math.PI;
			    frame.position.z = (frameParams.length / 2 + stringerThickness + M/2 + marshDist + 10) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2 + 3*h2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2 + M/2 - 10;
			
				if(model == "ко") {
					frame.position.z += (stringerSideOffset + 30) * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки верхнего марша
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b3,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			
			for(var i = 0; i < stairAmt3; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (M*2 + marshDist - frameParams.length/2 - stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) + h3 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 - b3 * (i+1) + frameParams.thk/2;
				
				if(turnFactor == -1) {
					frame.position.z -= stringerThickness;
				}
				
				if(model == "ко") {
					frame.position.z -= stringerSideOffset * turnFactor;
			        if(stairModel == "П-образная с забегом") frame.position.x -= a3 - b3 + frameParams.thk/2;
				}
			    if(stairModel == "П-образная с забегом") frame.position.y += 5*h3;
			
			    carcas.push(frame);
			}
			
			//рамки площадки
			if(stairModel == "П-образная с площадкой") {
				frameParams.width = platformLength_1/4;
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness + marshDist + M) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk;
			
				if(model == "ко") {
					frame.position.z += stringerSideOffset * turnFactor;
				}
			    if(stairModel == "П-образная с забегом") frame.position.y += 5*h3;
			    
				carcas.push(frame);
				
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness + marshDist + M) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + platformLength_1/4 + frameParams.thk + 100;
			
				if(model == "ко") {
					frame.position.z += stringerSideOffset * turnFactor;
				}
			    if(stairModel == "П-образная с забегом") frame.position.y += 5*h3;
			
			    carcas.push(frame);
			}
			}
			
		//колонны
		
		function drawPColumns(){}; //пустая функция для навигации
		
		if (params.columnModel != "нет") {
			var profWidth = 40;
			var profHeight = 40;
			if (params.columnModel == "100x50") {
				profWidth = 100;
				profHeight = 50;
			}
			if (params.columnModel == "100x100") {
				profWidth = 100;
				profHeight = 100;
			}
			var colLength1 =  h1 * stairAmt1 - h1/2
			var colParams = {
				colLength: colLength1,
				profWidth: profWidth,
				profHeight: profHeight,
				material: stringerMaterial,
				dxfArr: dxfPrimitivesArr, 
				dxfBasePoint: dxfBasePoint,
				text: "",
			}
			
			//позиции колонн по X и Z
			// первая
			var posX_1 = b1 * stairAmt1 - b1/2;
			var posZ_1 = (stringerThickness + profHeight/2) * turnFactor;
			if (model == "ко") posZ_1 = (stringerSideOffset - profHeight/2) * turnFactor;

			// вторая
			var posZ_2 = (M - stringerThickness - profHeight/2) * turnFactor;
			if (model == "ко") posZ_2 = (M + profHeight/2 - stringerSideOffset) * turnFactor;

			// третья
			var posX_3 = b1 * stairAmt1 + (stairModel == "П-образная с забегом" ? M : platformLength_1) - stringerThickness - profHeight/2;
			var posZ_3 = (stringerThickness + profWidth/2) * turnFactor;
			if (model == "ко") {
				posX_3 = b1 * stairAmt1 + (stairModel == "П-образная с забегом" ? M : platformLength_1) + profHeight/2 - stringerSideOffset;
				posZ_3 += stringerSideOffset * turnFactor;
			}

			// четвёртая
			var posZ_4 = (M + params.marshDist/2) * turnFactor;

			// пятая
			var posZ_5 = (M + stringerThickness + params.marshDist + profHeight/2) * turnFactor;
			if (model == "ко") posZ_5 = (M + params.marshDist - profHeight/2 + stringerSideOffset) * turnFactor;

			// шестая
			var posZ_6 = (M*2 - stringerThickness - profHeight/2 + params.marshDist) * turnFactor;
			if (model == "ко") posZ_6 = (M*2 + profHeight/2 + params.marshDist - stringerSideOffset) * turnFactor;

			// седьмая
			var posZ_7 = (M*2 - stringerThickness - profWidth/2 + params.marshDist) * turnFactor;
			if (model == "ко") posZ_7 -= stringerSideOffset * turnFactor;
				
			if (params.isColumn1) {
				colParams.text = "Колонна 1"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col1 = colParams.mesh;
				col1.position.x = posX_1;
				col1.position.y = 0;
				col1.position.z = posZ_1;
				carcas.push(col1);
			}
			if (params.isColumn2) {
				colParams.text = "Колонна 2"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_1;
				col2.position.y = 0;
				col2.position.z = posZ_2;
				carcas.push(col2);
			}
			if (params.isColumn3) {
				colParams.text = "Колонна 3"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h1;
				if(stairModel == "П-образная с забегом") colParams.colLength = colLength1 + h3*2;
				colParams = drawColumn(colParams);
				var col3 = colParams.mesh;
				col3.rotation.y = -Math.PI / 2;
				col3.position.x = posX_3;
				col3.position.y = 0;
				col3.position.z = posZ_3;
				carcas.push(col3);
			}
			
			if (params.isColumn4) {
				colParams.text = "Колонна 4"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h3
				if(stairModel == "П-образная с забегом") colParams.colLength = colLength1 + h3*3;
				colParams = drawColumn(colParams);
				var col4 = colParams.mesh;
				col4.rotation.y = -Math.PI / 2;
				col4.position.x = posX_3;
				col4.position.y = 0;
				col4.position.z = posZ_4;
				carcas.push(col4);
			}
			
			if (params.isColumn5) {
				colParams.text = "Колонна 5"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + 2*h3
				if(stairModel == "П-образная с забегом") colParams.colLength = colLength1 + h3*7;
				colParams = drawColumn(colParams);
				var col5 = colParams.mesh;
				col5.position.x = posX_1;
				col5.position.y = 0;
				col5.position.z = posZ_5;
				carcas.push(col5);
			}
			
			if (params.isColumn6) {
				colParams.text = "Колонна 6"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + 2*h3
				if(stairModel == "П-образная с забегом") colParams.colLength = colLength1 + h3*7;
				colParams = drawColumn(colParams);
				var col6 = colParams.mesh;
				col6.position.x = posX_1; 
				col6.position.y = 0;
				col6.position.z = posZ_6;
				carcas.push(col6);
			}
				
			if (params.isColumn7) {
				colParams.text = "Колонна 7"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h3
				if(stairModel == "П-образная с забегом") colParams.colLength = colLength1 + h3*5;
				colParams = drawColumn(colParams);
				var col7 = colParams.mesh;
				col7.rotation.y = -Math.PI / 2;
				col7.position.x = posX_3;
				col7.position.y = 0;
				col7.position.z = posZ_7;
				carcas.push(col7);
			}
		}

			/***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ЛЕСТНИЦЫ  ***/

			
			function drawPRailing(){}; //пустая функция для навигации через список функций
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
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthTop -= 60;
				var railingSide = "left";
				topConnection = outerHandrailConnection1;
				bottomConnection = false;
				railingPositionZ = -40 * turnFactor;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1+1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection1 = drawRailingSection(sectionParams);
                railingSection1.position.z = railingPositionZ * scale;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection1.position.z += 80 * turnFactor;
			        railingSection1.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection1.position.y += 60;
			    }
				//scene.add( railingSection1 );
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
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection2 = drawRailingSection(sectionParams);
                railingSection2.position.z = railingPositionZ * scale;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection2.position.z -= 80 * turnFactor;
			        railingSection2.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection2.position.y += 60;
			    }
				//scene.add( railingSection2 );
				railing.push(railingSection2);
			}

			/*внешняя сторона верхнего марша*/

			lastMarsh = true;

			if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "площадка";
				var platformLengthTop = platformLength_3;
				var platformLengthBottom = platformLength_1;
				if (stairModel == "П-образная с забегом") {
					bottomEnd = "забег";
					platformLengthBottom = M;
                }
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        platformLengthBottom -= 90;
			        platformLengthTop -= 100;
			    }
				var railingSide = "left";
				topConnection = false;
				bottomConnection = outerHandrailConnection2;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection3 = drawRailingSection(sectionParams);
				railingSection3.rotation.y = -Math.PI * turnFactor;
				railingSection3.position.x = b1 * stairAmt1 * scale;
				railingSection3.position.y = h1 * (stairAmt1 + 1) * scale;
				railingSection3.position.z = stringer3.position.z + 40 * scale * turnFactor;
				if (stairModel == "П-образная с забегом") railingSection3.position.y += 5 * h3 * scale;
				if (model == "ко") railingSection3.position.z = railingSection3.position.z + stringerSideOffset * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
                    railingSection3.position.z -= 80 * turnFactor;
			        railingSection3.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection3.position.y += 60;
			    }
				//scene.add( railingSection3 );
				railing.push(railingSection3);
			}

			/*внутренняя сторона верхнего марша*/

			if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "нет";
                var platformLengthTop = platformLength_3;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthTop -= 100;
				var platformLengthBottom = 0;
				var railingSide = "right";
				topConnection = false;
				bottomConnection = false;
				railingPositionZ = M;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection4 = drawRailingSection(sectionParams);
				railingSection4.rotation.y = -Math.PI * turnFactor;
				railingSection4.position.x = b1 * stairAmt1 * scale;
				railingSection4.position.y = h1 * (stairAmt1 + 1) * scale;
				if (stairModel == "П-образная с забегом") railingSection4.position.y += 5 * h3 * scale;
				railingSection4.position.z = stringer4.position.z - stringerThickness * scale * turnFactor;
                if (model == "ко") railingSection4.position.z = railingSection4.position.z - stringerSideOffset * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
                    railingSection4.position.z += 80 * turnFactor;
			        railingSection4.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection4.position.y += 60;
			    }
				//scene.add( railingSection4 );
				railing.push(railingSection4);
			}

			/*заднее ограждение забега*/
			if (backRailing_2 == "есть" && stairModel == "П-образная с забегом") {

				var topEnd = "забег";
				var bottomEnd = "забег";
				var platformLengthTop = M;
                var platformLengthBottom = M + marshDist;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthBottom -= 160;
				var railingSide = "left";
				topConnection = outerHandrailConnection2;
				bottomConnection = outerHandrailConnection1;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: 0, 
					h1: h3, 
					b1: b1, 
					a1: a1, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection5 = drawRailingSection(sectionParams);
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection5.position.x = stringer5.position.x + 40 * scale;
				if (model == "ко") railingSection5.position.x = railingSection5.position.x + stringerSideOffset * scale;
				railingSection5.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h3 * scale;
                railingSection5.position.z = (M + marshDist) * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection5.position.z += 80 * turnFactor;
			        railingSection5.position.x -= 80;
			        railingSection5.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection5.position.y += 60;
			    }
				//scene.add( railingSection5 );
				railing.push(railingSection5);

			}

			/*заднее ограждение площадки*/
			if (backRailing_1 == "есть" && stairModel == "П-образная с площадкой") {
                var platformLength = platformWidth_1;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLength -= 160;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "left";
				var sectionPos = "staircase";
				
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide, 
					stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}

				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide,
					railingModel, sectionPos) //функция в файле drawBanisterSection.js
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection5.position.x = b1 * (stairAmt1) * scale + platformLength_1 * scale + stringerThickness * scale;
				if (model == "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
				railingSection5.position.y = h1 * (stairAmt1 + 1) * scale;
                railingSection5.position.z = 0;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection5.position.z += 80 * turnFactor;
			        railingSection5.position.x -= 80;
			        railingSection5.position.y += 110 + treadThickness;
			    }
				//scene.add( railingSection5 );
				railing.push(railingSection5);
			}

			/*заднее ограждение верхней площадки*/
			if (topPltRailing_5 && platformTop == "площадка") {

                var platformLength = M;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLength -= 160;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "right";
				if (railingModel == "Самонесущее стекло") railingSide = "left";
				var sectionPos = "staircase";

				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide,
					railingModel, sectionPos) //функция в файле drawBanisterSection.js
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection5.position.x = platformStringer1.position.x - (platformLength_3 - a3) / 2 * scale - 40 * scale;//- M/2*scale;
				railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2 * scale + stringerOffset_y * scale;
				railingSection5.position.z = platformStringer2.position.z - (stringerSideOffset + stringerThickness / 2) * scale * turnFactor;
				if (model == "лт") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
				//scene.add( railingSection5 );
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection5.position.z += 80 * turnFactor;
			        railingSection5.position.x += 80;
			        railingSection5.position.y += 110 + treadThickness;
			    }
				railing.push(railingSection5);
			}

		/*** ПРИСТЕННЫЙ ПОРУЧЕНЬ ***/

function addPHandrail(){}; //пустая функция для навигации

var sideHandrailParams = {
	dxfArr: dxfPrimitivesArr,
	dxfBasePoint: {x:-300, y:-4000},	
	stairType: "metal_com",
	topMarshPos_Z: z0
	}
	
sideHandrailParams = drawTurn180SideHandrail(sideHandrailParams);
	
var handrails = sideHandrailParams.handrails;
railing.push(handrails);
		}//конец П-образной


		/***  П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ЛЕСТНИЦА   ***/


		function drawP3Staircase(){}; //пустая функция для навигации через список функций
		if (stairModel == "П-образная трехмаршевая") {

			/*ступени нижний марш*/
			geometry = new THREE.BoxGeometry(a1 * scale, treadThickness * scale, treadWidth * scale);
			var tread;
			var x0 = a1 / 2 * scale;
			var y0 = -treadThickness / 2 * scale;
			var z0 = M / 2 * scale * turnFactor;
			
			var x1 = a1 / 2 * scale;
			var y1 = -treadThickness / 2 * scale;
			var z1 = M / 2 * scale * turnFactor;
			
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
				}
				else {
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

				if (model == "ко") z0 = z0 - (a2 - b2) * scale * turnFactor// + stepWidthLow * scale;
			}

			if (turnType_1 == "забег") {
				if (stairAmt1 == 0) {
					x0 = -b1 * scale
					y0 = y0
				}
				else {
					x0 = tread.position.x - a1 / 2 * scale;
					y0 = tread.position.y;
				}
				z0 = 0;
				/* забежная ступень 1*/
				
				
				var treadParams = {
					treadThickness: treadThickness,
					length: M,
					stepWidthLow: 100,
					turnFactor: turnFactor,
					material: treadMaterial,
					}
				if (model == "ко") treadParams.stepWidthLow = 50;				
				
				treadParams = drawWinderTread1(treadParams);
				var turnStep1 = treadParams.mesh;
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

				treadParams = drawWinderTread1(treadParams);
				var turnStep3 = treadParams.mesh;
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
					riser.position.x = turnStep2.position.x + M / 2 * scale// + (L1 + L2) *scale - riserThickness/2 * scale;
					riser.position.y = turnStep2.position.y + riserHeight / 2 * scale;
					if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness * scale;
					riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * scale * turnFactor;
					riser.castShadow = true;
					//scene.add( riser );
					risers.push(riser);
				}


				//x0 = tread.position.x + M / 2 *scale;
				x1 = x0 = x0 + b1 * scale + M / 2 * scale;
				y1 = y0 = turnStep3.position.y + treadThickness * scale;
				if (turnFactor == -1) y1 = y0 = turnStep3.position.y;
				z1 = z0 = M * scale * turnFactor;

				if (model == "ко") z1 = z0 = z0 + (stepWidthLow - (a2 - b2)) * scale * turnFactor;
			}


			/*ступени средний марш*/

			geometry = new THREE.BoxGeometry(treadWidth * scale, treadThickness * scale, a2 * scale);

			tread;

			for (var i = 0; i < stairAmt2; i++) {
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = y0 + (h2 * (i + 1) - treadThickness / 2) * scale;
				tread.position.x = x0// + M/2*scale;
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
					riser.position.y = y0 + (h2 * i + riserHeight / 2 ) * scale;
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
				}
				else z0 = z0 + stringerThickness / 2 * scale * turnFactor;
			}

			if (turnType_2 == "забег") {

				/* забежная ступень 1*/
				var treadParams = {
					treadThickness: treadThickness,
					length: M,
					stepWidthLow: 100,
					turnFactor: turnFactor,
					material: treadMaterial,
					}
				if (model == "ко") treadParams.stepWidthLow = 50;				
				
				treadParams = drawWinderTread1(treadParams);
				var turnStep1 = treadParams.mesh;
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

				if(stairAmt3 == 0) treadParams.stepWidthLow = params.lastWinderTreadWidth;
				treadParams = drawWinderTread1(treadParams);
				var turnStep3 = treadParams.mesh;
				turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
				//turnStep3.rotation.z=1*Math.PI;
				turnStep3.position.x = x0 - M / 2 - treadParams.stepWidthLow;
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


				x0 = turnStep3.position.x + treadParams.stepWidthLow * scale;
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
					riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness ) * scale;
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
				geometry = new THREE.BoxGeometry(platformLength_3 * scale, treadThickness * scale, platformWidthTop * scale);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y;
				tread.position.x = platform_x - (platformLength_3 - a3) / 2 * scale;
				tread.position.z = platform_z;
				tread.castShadow = true;
				//scene.add( tread );
				treads.push(tread);
				
				topStepPos = {
					x: platform_x - platformLength_3 + a3 / 2,  
					z: platform_z + (M / 2) * turnFactor,
					}
			}

			/*верхнее перекрытие*/

			if (platformTop != "площадка") {
//базовая точка для верхней площадки
				if (stairAmt3 == 0) {
					platform_x = x0 + a3 / 2 * scale;
					platform_y = y0 //+ h3*scale
					platform_z = z0 - M / 2 * scale * turnFactor;
					if (model == "ко") platform_x = platform_x - (a3 - b3) * scale
					if (model == "лт" && turnType_2 == "забег") platform_x = platform_x - L1 * scale

				}
				else {
					platform_x = tread.position.x;
					platform_y = tread.position.y;
					platform_z = tread.position.z;
				}
				/*
				geometry = new THREE.BoxGeometry(M * scale, 300 * scale, M * scale);
				floorTop = new THREE.Mesh(geometry, floorMaterial);
				floorTop.castShadow = true;
				if (topStairType == "ниже") floorTop.position.y = platform_y + h3 * scale - 150 * scale + treadThickness / 2 * scale;
				if (topStairType == "вровень") floorTop.position.y = platform_y - 150 * scale + treadThickness / 2 * scale;
				floorTop.position.x = platform_x - (a3 + M) / 2 * scale;
				floorTop.position.z = platform_z;
				//scene.add( floorTop );
				topFloor.push(floorTop);
				*/
				
				topStepPos = {
					x: platform_x - a3 / 2,
					z: platform_z + (M / 2) * turnFactor,
					}
			}


	function addP3MarshesSkirting(){}; //пустая функция для навигации
		 
	 if(params.model == "ко" && params.riserType == "есть" && (params.skirting_1 != "нет" || params.skirting_3 != "нет" )){
		 
		 var skirtingParams = {
			thk: params.riserThickness,
			rise: params.h1,
			step: params.b1,
			nose: params.a1 - params.b1 - params.riserThickness,
			treadThk: params.treadThickness,
			last: false,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
			material: timberMaterial,
			}
		
		//внутренняя сторона нижнего марша
		if(params.skirting_1 == "внутреннее" || params.skirting_1 == "две"){
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M//- skirtingParams.thk;
			for(var i=0; i<stairAmt1; i++){
				if(i == stairAmt1 - 1) {
					//skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b1;
		skirtingParams.last = false;
		if(params.skirting_1 == "внешнее" || params.skirting_1 == "две"){
			//плинтус марша
			var posZ = 0;
			if(turnFactor == -1) posZ = - skirtingParams.thk;
			
			for(var i=0; i<stairAmt1; i++){				
				/*if(i == stairAmt1 - 1) {
					skirtingParams.step = params.a1 - params.riserThickness;
					skirtingParams.last = true;
					}
				*/
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * i;
				skirting.position.y = h1 * i;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			//плинутс площадки
			if(params.turnType_1 == "площадка"){
				skirtingParams.step = params.M - params.riserThickness;
				skirtingParams.last = true;
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = h1 * stairAmt1;
				skirting.position.z = posZ
				treads.push(skirting);
				}
			else if(params.turnType_1 == "забег"){				
					skirtingParams.rise = params.h1;
					
					var tread3Width = M * Math.tan(Math.PI / 6) + L1 - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1;
				    skirting.position.y = h1 * stairAmt1;
				    skirting.position.z = posZ;
				    treads.push(skirting);
					
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;		
					skirtingParams.rise = params.h2;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = skirtingParams.nose + b1 * stairAmt1 + M * Math.tan(Math.PI / 6);
				    skirting.position.y = h1 * stairAmt1 + h1;
				    skirting.position.z = posZ;
				    treads.push(skirting);
				}
			}
			
		

				
		//внутренняя сторона верхнего марша
		skirtingParams.step = params.b2;
		skirtingParams.rise = params.h2;
		var topMarshSkirting = new THREE.Object3D();
		
		if(params.skirting_2 == "внутреннее" || params.skirting_2 == "две"){			
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M//- skirtingParams.thk;
			for(var i=0; i<stairAmt2; i++){
				if(i == stairAmt2 - 1) {
					skirtingParams.step = params.a2 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b2 * i + M  - params.riserThickness;
				if(turnType_1 == "забег") skirting.position.x = b2 * i + Math.abs(z1) + skirtingParams.nose;
				skirting.position.y = h2 * i;
				if(turnType_1 == "забег") skirting.position.y += 2*h2;	
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b2;
		skirtingParams.rise = params.h2;
		skirtingParams.last = false;
		var posZ = 0;
		if(turnFactor == -1) posZ = - skirtingParams.thk;
			
		if(params.skirting_2 == "внешнее" || params.skirting_2 == "две"){			
			//плинутс площадки
			if(params.turnType_1 == "площадка"){
				skirtingParams.rise = 0;
				skirtingParams.step = params.M - params.riserThickness;
				//skirtingParams.last = true;
				//console.log(skirtingParams)
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = 0; //skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = 0; //h1 * stairAmt1;
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
				else if(turnType_1 == "забег"){
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;
					skirtingParams.rise = 0;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = 0;
				    skirting.position.y = h2;
				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
					
					skirtingParams.rise = params.h2;
					skirtingParams.last = true;
					
					var tread3Width = M * Math.tan(Math.PI / 6) - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;
					skirtingParams.last = true;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = (M + L1 - L2) * scale - params.riserThickness;
				    skirting.position.y = h2;
				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
				}
				
			//плинтус марша
			skirtingParams.step = params.b2;
			skirtingParams.rise = params.h2;		
			
			for(var i=0; i<stairAmt2; i++){			
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b2 * i + params.M - params.riserThickness;			
				if(turnType_1 == "забег") skirting.position.x = b2 * i + Math.abs(z1) + skirtingParams.nose;
				skirting.position.y = h2 * i;
				if(turnType_1 == "забег") skirting.position.y += 2*h2;			
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			
			if(params.turnType_2 == "площадка"){
				skirtingParams.step = params.M - params.riserThickness;
				skirtingParams.last = true;
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				
				skirting.position.x = b2 * stairAmt2 + params.M - params.riserThickness;			
				if(turnType_1 == "забег") skirting.position.x = skirtingParams.nose + b2 * stairAmt2 + Math.abs(z1);
				skirting.position.y = h2 * stairAmt2;
				if(turnType_1 == "забег") skirting.position.y += 2*h2;	
				skirting.position.z = posZ
				topMarshSkirting.add(skirting);
				}
			else if(params.turnType_2 == "забег"){				
					skirtingParams.rise = params.h2;
				    skirtingParams.last = false;
					
					var tread3Width = M * Math.tan(Math.PI / 6);
					skirtingParams.step = tread3Width - params.riserThickness;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
					
					skirting.position.x = b2 * stairAmt2 + params.M - params.riserThickness;			
				    if(turnType_1 == "забег") skirting.position.x = skirtingParams.nose + b2 * stairAmt2 + Math.abs(z1);
				    skirting.position.y = h2 * stairAmt2;
				    if(turnType_1 == "забег") skirting.position.y += 2*h2;	

				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
					
					skirtingParams.step = (M - L2) * scale - params.riserThickness;		
					skirtingParams.rise = params.h2;
					skirtingParams.last = true;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
					
					skirting.position.x = b2 * stairAmt2 + params.M + M * Math.tan(Math.PI / 6) - 2*params.riserThickness;			
				    if(turnType_1 == "забег") skirting.position.x = skirtingParams.nose + b2 * stairAmt2 + M * Math.tan(Math.PI / 6) + Math.abs(z1) - params.riserThickness;
				    skirting.position.y = h2 * (stairAmt2 + 1);
				    if(turnType_1 == "забег") skirting.position.y += 2*h2;
					

				    skirting.position.z = posZ;
				    topMarshSkirting.add(skirting);
				}
			}
		
		//позиционируем группу верхнего марша*/
		topMarshSkirting.rotation.y = -Math.PI/2 * turnFactor;
		topMarshSkirting.position.x = stairAmt1 * b1 + M;
		topMarshSkirting.position.y = (stairAmt1 + 1) * h1;
		treads.push(topMarshSkirting);
			
		
		
		
		//внутренняя сторона верхнего марша
		skirtingParams.step = params.b3;
		skirtingParams.rise = params.h3;
		var top3MarshSkirting = new THREE.Object3D();
		
		if(params.skirting_3 == "внутреннее" || params.skirting_3 == "две"){
			var stepWidthLow = 50;
			var posZ = M - skirtingParams.thk;
			if(turnFactor == -1) posZ = -M;
			for(var i=0; i<stairAmt3; i++){
				if(i == stairAmt3 - 1) {
					skirtingParams.step = params.a3 - params.riserThickness;
					skirtingParams.last = true;
					}
					
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b3 * i + params.M - params.riserThickness;
				if(params.turnType_2 == "забег") skirting.position.x = M + b3 * i + stepWidthLow - params.riserThickness;
				skirting.position.y = h3 * i;
				skirting.position.z = posZ
				top3MarshSkirting.add(skirting);
				}
			}
			
		//внешняя сторона нижнего марша
		skirtingParams.step = params.b3;
		skirtingParams.rise = params.h3;
		skirtingParams.last = false;
		var posZ = 0;
		if(turnFactor == -1) posZ = - skirtingParams.thk;
			
		if(params.skirting_3 == "внешнее" || params.skirting_3 == "две"){
			//плинутс площадки
			if(params.turnType_2 == "площадка"){
				skirtingParams.rise = 0;
				skirtingParams.step = params.M - params.riserThickness;
				//skirtingParams.last = true;
				//console.log(skirtingParams)
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = 0; //skirtingParams.nose + b1 * stairAmt1;
				skirting.position.y = 0; //h1 * stairAmt1;
				skirting.position.z = posZ
				top3MarshSkirting.add(skirting);
				}
				else if(params.turnType_2 == "забег"){
					skirtingParams.step = (M + L1 - L2) * scale - params.riserThickness;
					skirtingParams.rise = 0;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = 0;
					skirting.position.y -= h3;
				    skirting.position.z = posZ;
				    top3MarshSkirting.add(skirting);
					
					skirtingParams.rise = params.h3;
					skirtingParams.last = true;
					
					var tread3Width = M * Math.tan(Math.PI / 6) - params.riserThickness;
					skirtingParams.step = tread3Width - params.riserThickness;
					skirtingParams.last = true;

				    skirtingParams = drawSkirting(skirtingParams);
				    var skirting = skirtingParams.mesh;
				    skirting.position.x = (M + L1 - L2) * scale - params.riserThickness;
					skirting.position.y -= h3;
				    skirting.position.z = posZ;
				    top3MarshSkirting.add(skirting);
				}
				
			//плинтус марша
			skirtingParams.step = params.b3;
			skirtingParams.rise = params.h3;		
			
			for(var i=0; i<stairAmt3; i++){				
				if(i == stairAmt3 - 1) {
					skirtingParams.step = params.a3 - params.riserThickness;
					skirtingParams.last = true;
					}
				
				skirtingParams = drawSkirting(skirtingParams);
				var skirting = skirtingParams.mesh;
				skirting.position.x = b3 * i + params.M - params.riserThickness;			
				if(params.turnType_2 == "забег") skirting.position.x = M + b3 * i + stepWidthLow - params.riserThickness;
				skirting.position.y = h3 * i;		
				skirting.position.z = posZ
				top3MarshSkirting.add(skirting);
				}
			}
		
		//позиционируем группу верхнего марша*/
		top3MarshSkirting.rotation.y = -Math.PI * turnFactor;
		top3MarshSkirting.position.x = stairAmt1 * b1 + params.M;
		top3MarshSkirting.position.y = (stairAmt1 + 1) * h1 + (stairAmt2 + 1) * h2;
		if(params.turnType_1 == "забег") top3MarshSkirting.position.y += h2 * 2;
		if(params.turnType_2 == "забег") top3MarshSkirting.position.y += h3 * 2;
		top3MarshSkirting.position.z = (stairAmt2 * b2 + 2*M)*turnFactor;
		if(params.turnType_1 == "площадка") top3MarshSkirting.position.z -= 50*turnFactor;
		
		treads.push(top3MarshSkirting);
			
		}
		
			
			/***  КАРКАС П-ОБРАЗНОЙ ТРЕХМАРШЕВОЙ ЛЕСТНИЦЫ   ***/


			function drawP3Stringers(){}; //пустая функция для навигации через список функций
			var extraStep = 0;

			if (turnType_1 == "площадка") {
				stringerTurn = "площадка";
				tyrnLength = M;

			}
			if (turnType_1 == "забег") {
				stringerTurn = "забег";
				tyrnLength = M;
				extraStep += 2;
			}

			/*внешний косоур нижнего марша*/

			var stringerShape = drawStringer1(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h2, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.position.x = 0;
			stringer1.position.y = 0;
			stringer1.position.z = stringerSideOffset * scale * turnFactor;
			if (turnFactor == -1) stringer1.position.z = stringer1.position.z - stringerThickness * scale;

			stringer1.castShadow = true;
			//scene.add(stringer1);
			carcas.push(stringer1);

			/*внутренний косоур нижнего марша*/

			stringerShape = drawStringer2(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h2, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer2 = new THREE.Mesh(geom, stringerMaterial);
			stringer2.position.x = 0;
			stringer2.position.y = 0;
			stringer2.position.z = (M - stringerThickness / 2 - stringerSideOffset) * scale * turnFactor;
			stringer2.castShadow = true;
			//scene.add(stringer2);
			carcas.push(stringer2);

			/*внешний косоур верхнего марша*/

			if (turnType_2 == "площадка") {
				stringerTurn = "площадка";
				tyrnLength = M;
			}
			if (turnType_2 == "забег") {
				stringerTurn = "забег";
				tyrnLength = M;
			}
			stringerWidth = 150;

			stringerShape = drawStringer3(
				model, stringerTurn, stringerType,
				h2, b2, stairAmt2, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, stringerSideOffset);

			if (turnType_2 == "площадка") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -1 * Math.PI * turnFactor;
				stringer3.position.x = b1 * stairAmt1 * scale + M * scale;
				if (model == "ко") stringer3.position.x = stringer3.position.x + (a3 - b3) * scale;
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1 + extraStep) * scale - Math.max(h2, h3) * scale;
				if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1 + extraStep) * scale - stringerWidth * scale;
				stringer3.position.z = (M * 2 + b2 * stairAmt2 - stringerSideOffset) * scale * turnFactor;
				if (turnType_1 == "площадка" && model == "ко") stringer3.position.z = stringer3.position.z - (a2 - b2) * scale * turnFactor;
				stringer3.castShadow = true;
				carcas.push(stringer3);
			}
			if (turnType_2 == "забег") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.rotation.y = -1 * Math.PI * turnFactor;
				stringer3.position.x = b1 * stairAmt1 * scale + M * scale;
				//stringer3.position.y = h1*(stairAmt1 + 1)*scale + h3*4*scale - Math.max(h1, h3)*scale;
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1 + extraStep) * scale + h3 * scale - Math.max(h2, h3) * scale;
				if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1 + extraStep) * scale + h3 * scale - stringerWidth * scale;
				stringer3.position.z = (M * 2 + b2 * stairAmt2 - stringerSideOffset) * scale * turnFactor;
				if (turnType_1 == "площадка" && model == "ко") stringer3.position.z = stringer3.position.z - (a2 - b2) * scale * turnFactor;
				stringer3.castShadow = true;
				//scene.add(stringer3);
				carcas.push(stringer3);
			}

			/*внутренний косоур верхнего марша*/

			stringerShape = drawStringer4(
				model, stringerTurn, stringerType,
				h2, b2, stairAmt2, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, stringerSideOffset);


			if (turnType_2 == "площадка") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.rotation.y = -1 * Math.PI * turnFactor;
				stringer4.position.x = b1 * stairAmt1 * scale;// + stringerThickness*scale;
				stringer4.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1 + extraStep) * scale - h3 * scale;
				stringer4.position.z = (M + b2 * stairAmt2 + stringerThickness + stringerSideOffset) * scale * turnFactor;
				stringer4.castShadow = true;
				//scene.add(stringer4);
				carcas.push(stringer4);
			}
			if (turnType_2 == "забег") {
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.rotation.y = -1 * Math.PI * turnFactor;
				stringer4.position.x = b1 * stairAmt1 * scale;
				stringer4.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1 + extraStep) * scale - h3 * scale;
				stringer4.position.z = (M + b2 * stairAmt2 + stringerSideOffset) * scale * turnFactor;
				stringer4.castShadow = true;
				//scene.add(stringer4);
				carcas.push(stringer4);
			}

			/*внешний косоур среднего марша*/
			tyrnLength = M;
			var stringerPlatformHeight = Math.max(h1, h2);
			if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

			stringerShape = drawStringer5(
				model,
				stringerType,
				turnType_1, turnType_2,
				h1, b1, stairAmt1,
				h2, b2, stairAmt2,
				h3, b3, stairAmt3,
				a2, a3, L1, L2, tyrnLength, marshDist,
				scale, stringerSideOffset);

			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer5 = new THREE.Mesh(geom, stringerMaterial);
			stringer5.rotation.y = -0.5 * Math.PI * turnFactor;
			stringer5.position.x = b1 * stairAmt1 * scale + M * scale - stringerSideOffset * scale;
			stringer5.position.y = h1 * (stairAmt1 + 1) * scale + h2 * scale - stringerPlatformHeight * scale;
			stringer5.position.z = 0;
			stringer5.castShadow = true;
			//scene.add(stringer5);
			carcas.push(stringer5);

			if (turnType_1 == "площадка") {
				stringer5.position.y = stringer5.position.y - h2 * scale;
			}


			/*внутренний косоур среднего марша*/
			tyrnLength = M;
			var stringerPlatformHeight = Math.max(h1, h2);
			if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

			stringerShape = drawStringer6(
				model,
				stringerType,
				turnType_1, turnType_2,
				h1, b1, stairAmt1,
				h2, b2, stairAmt2,
				h3, b3, stairAmt3,
				a2, a3, L1, L2, tyrnLength,
				marshDist, scale, stringerSideOffset);

			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer6 = new THREE.Mesh(geom, stringerMaterial);
			stringer6.rotation.y = -0.5 * Math.PI * turnFactor;
			stringer6.position.x = b1 * stairAmt1 * scale + stringerThickness * scale + stringerSideOffset * scale;
			stringer6.position.z = M * scale * turnFactor;
			stringer6.castShadow = true;
			//scene.add(stringer6);
			carcas.push(stringer6);

			if (turnType_1 == "площадка") {
				stringer6.position.y = h1 * (stairAmt1 + 1) * scale - stringerPlatformHeight * scale;
			}
			if (turnType_1 == "забег") {
				stringer6.position.y = h1 * (stairAmt1 + 1) * scale - h2 * scale;
			}

			/*косоуры площадки*/

			if (platformTop == "площадка") {
				var stringerWidth = 150;
				var geom = new THREE.BoxGeometry((platformLength_3 - a3) * scale, stringerWidth * scale, stringerThickness * scale);

				/*левый косоур площадки*/
				var platformStringer1 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer1.position.x = platform_x - platformLength_3 / 2 * scale;
				platformStringer1.position.y = platform_y - stringerWidth / 2 * scale + treadThickness / 2 * scale - stringerOffset_y * scale;
				platformStringer1.position.z = platform_z - (M / 2 - stringerThickness / 2 - stringerSideOffset) * scale * turnFactor;
				platformStringer1.castShadow = true;
				//scene.add(platformStringer1);
				carcas.push(platformStringer1);

				/*правый косоур площадки*/
				var platformStringer2 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer2.position.x = platformStringer1.position.x;
				platformStringer2.position.y = platformStringer1.position.y; //- stringerOffset_y*scale
				platformStringer2.position.z = platform_z + (M / 2 + stringerThickness / 2 - stringerSideOffset) * scale * turnFactor;
				platformStringer2.castShadow = true;
				//scene.add(platformStringer2);
				carcas.push(platformStringer2);

				/*задняя тетива площадки*/
				if (platformRearStringer == "есть") {
					var geom = new THREE.BoxGeometry(stringerThickness * scale, stringerWidth * scale, M * scale);
					var platformStringer3 = new THREE.Mesh(geom, stringerMaterial);
					platformStringer3.position.x = platformStringer1.position.x - (platformLength_3 - a3 + stringerThickness) / 2 * scale;
					platformStringer3.position.y = platformStringer1.position.y - stringerOffset_y * scale;
					platformStringer3.position.z = platform_z;
					platformStringer3.castShadow = true;
					//scene.add(platformStringer3);
					carcas.push(platformStringer3);
				}

			}
			
			//рамки 
			if(params.stairFrame == "есть"){
			//рамки нижнего марша
			var frameParams = {
	            length: M - 2*stringerThickness + 5,
	            width: b1,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			var frameParams = drawFrame(frameParams);
			
			for(var i = 0; i < stairAmt1; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * i + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
			
			    carcas.push(frame);
			}
			
			//рамки площадки
			if(turnType_1 == "площадка") {
				frameParams.width = M/4;
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
				
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + M/4 + frameParams.thk/2 + 100;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки забега
			if(turnType_1 == "забег") {
				frameParams.isTurn = true;
				frameParams.h1 = h2;
				frameParams.h2 = h2;

				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (frameParams.length / 2 + stringerThickness) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2;
			
				if(model == "ко") {
					frame.position.x += a1-b1;
					frame.position.z += stringerSideOffset * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки среднего марша
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b2,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") frameParams.length -= stringerSideOffset * 2;
			
			for(var i = 0; i < stairAmt2; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.position.z = (b2 * i + M + frameParams.thk/2) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) + h2 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.length / 2 + stringerThickness;
				
				if(turnFactor == -1) {
					frame.position.z -= frameParams.width - 10;
					frame.position.x += stringerThickness;
				}
				if(turnType_1 == "забег") frame.position.y += 2*h2;
				if(model == "ко") {
					frame.position.x += stringerSideOffset;
					if(turnType_1 == "забег") frame.position.z += (a2-b2) * turnFactor + frameParams.thk/2;
				}
			
			    carcas.push(frame);
			}
			//рамки площадки
			if(turnType_2 == "площадка") {
				frameParams.width = M/4;
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.position.z = (b2 * stairAmt2 + M + 5) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.length / 2 + stringerThickness;
				
				if(turnFactor == -1) {
					frame.position.z -= frameParams.width - 10;
					frame.position.x += stringerThickness;
				}
			    if(model == "ко") {
					frame.position.x += stringerSideOffset;
					if(turnType_1 == "забег") frame.position.z += (a2-b2) * turnFactor + frameParams.thk/2;
				}
				if(turnType_1 == "забег") frame.position.y += 2*h2;
			    carcas.push(frame);
				
				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.position.z = (b2 * stairAmt2 + M/4 + M + 5 + 100) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 + frameParams.length / 2 + stringerThickness;
				
				if(turnFactor == -1) {
					frame.position.z -= frameParams.width - 10;
					frame.position.x += stringerThickness;
				}
			    if(model == "ко") {
					frame.position.x += stringerSideOffset;
					if(turnType_1 == "забег") frame.position.z += (a2-b2) * turnFactor + frameParams.thk/2;
				}
				if(turnType_1 == "забег") frame.position.y += 2*h2;
			    carcas.push(frame);
			}
			
			//рамки забега
			if(turnType_2 == "забег") {
				frameParams.isTurn = true;
				frameParams.h1 = h3;
				frameParams.h2 = h3;

				var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = 0;
				if(turnFactor == -1) frame.rotation.y = Math.PI;
			    frame.position.z = (b2 * stairAmt2 + M + 5) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) - treadThickness - frameParams.height / 2;
				if(turnType_1 == "забег") frame.position.y += 2*h2;
			    frame.position.x = b1 * stairAmt1 + frameParams.thk/2 + M/2 - 10;
			
				if(model == "ко") {
					frame.position.z += 40 * turnFactor;
				}
				
			    carcas.push(frame);
			}
			
			//рамки верхнего марша
			var frameParams = {
	            length: M - 2*stringerThickness,
	            width: b3,
	            height: 40,
	            thk: 20,
	            material: metalMaterial,
			}
			if(model == "ко") {
				frameParams.length -= stringerSideOffset * 2.5;
				if(turnType_1 == "площадка" && turnType_2 == "забег") frameParams.length += 20;
				if(turnType_1 == "забег") frameParams.length += stringerSideOffset/1.5;
			}
			
			for(var i = 0; i < stairAmt3; ++i){
			    var frameParams = drawFrame(frameParams);
			    var frame = frameParams.frame;
			    frame.rotation.y = Math.PI / 2;
			    frame.position.z = (b2 * stairAmt2 + 3*M/2) * turnFactor;
			    frame.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) + h3 * (i + 1) - treadThickness - frameParams.height / 2;
			    frame.position.x = b1 * stairAmt1 - b3 * (i+1) + 5;
				
				if(turnFactor == -1) {
					frame.position.z -= stringerThickness;
				}
				if(turnType_1 == "забег") frame.position.y += 2*h2;
				if(turnType_2 == "забег") frame.position.y += 2*h3;
				if(model == "ко") {
					frame.position.z -= stringerSideOffset/4 * turnFactor;
					if(turnType_2 == "забег") frame.position.x -= a3-b3 + frameParams.thk/2;
					if(turnType_1 == "площадка" && turnType_2 == "забег") frame.position.z -= 10 * turnFactor;
				    if(turnType_1 == "забег") frame.position.z += stringerSideOffset/4 * turnFactor;
				}
			
			    carcas.push(frame);
			}
			}
			
		/*колонны*/
		function drawP3Columns(){}; //пустая функция для навигации
			
		if (params.columnModel != "нет") {
			var profWidth = 40;
			var profHeight = 40;
			if (params.columnModel == "100x50") {
				profWidth = 100;
				profHeight = 50;
			}
			if (params.columnModel == "100x100") {
				profWidth = 100;
				profHeight = 100;
			}
			var colLength1 =  h1 * stairAmt1 - h1/2
			var colParams = {
				colLength: colLength1,
				profWidth: profWidth,
				profHeight: profHeight,
				material: stringerMaterial,
				dxfArr: dxfPrimitivesArr, 
				dxfBasePoint: dxfBasePoint,
				text: "",
			}
			
			//позиция колонн по X и Z

			// первая
			var posX_1 = b1 * stairAmt1 - b1/2;
			var posZ_1 = (stringerThickness + profHeight/2) * turnFactor;
			if (model == "ко") posZ_1 = (stringerSideOffset - profHeight/2) * turnFactor;

			// вторая
			var posZ_2 = (M - stringerThickness - profHeight/2) * turnFactor;
			if (model == "ко") posZ_2 = (M + profHeight/2 - stringerSideOffset) * turnFactor;

			// третья
			var posX_3 = b1 * stairAmt1 + M - stringerThickness - profHeight/2;
			var posZ_3 = (stringerThickness + profWidth/2) * turnFactor;
			if (model == "ко") {
				posX_3 = b1 * stairAmt1 + M + profHeight/2 - stringerSideOffset;
				posZ_3 += stringerSideOffset * turnFactor;
			}

			// четвёртая
			var posX_4 = b1 * stairAmt1 + M - stringerThickness - profHeight/2;
			var posZ_4 = (M - stringerThickness - profWidth/2) * turnFactor;
			if (model == "ко") {
				posX_4 -= stringerSideOffset;
				posZ_4 -= stringerSideOffset * turnFactor;
			}

			// пятая
			var posZ_5 = (M + stringerThickness + stairAmt2 * b2 + profHeight/2) * turnFactor;
			if (model == "ко") posZ_5 = (M + stairAmt2 * b2 - profHeight/2 + stringerSideOffset) * turnFactor;
						
			// шестая
			var posZ_6 = (M*2 - stringerThickness - profHeight/2 + stairAmt2 * b2) * turnFactor;
			if (model == "ко") posZ_6 = (M*2 + profHeight/2 + stairAmt2 * b2 - (stringerSideOffset + (turnType_1 == "площадка" ? a2-b2 : 0))) * turnFactor;

			// седьмая
			var posZ_7 = (M*2 - stringerThickness - profWidth/2 + stairAmt2 * b2) * turnFactor;
			if (model == "ко") posZ_7 -= (stringerSideOffset + (turnType_1 == "площадка" ? a2-b2 : 0)) * turnFactor;

			// восьмая
			var posX_8 = b1 * stairAmt1 + M - stringerThickness - profHeight/2;
			var posZ_8 = (M + stairAmt2 * b2 + profWidth/2) * turnFactor;
			if (model == "ко") {
				posX_8 -= stringerSideOffset;
				posZ_8 += stringerSideOffset * turnFactor;
			}
			
			if (params.isColumn1) {
				colParams.text = "Колонна 1"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col1 = colParams.mesh;
				col1.position.x = posX_1;
				col1.position.y = 0;
				col1.position.z = posZ_1;
				carcas.push(col1);
			}
			if (params.isColumn2) {
				colParams.text = "Колонна 2"
				colParams.dxfBasePoint.x += 300;
				colParams = drawColumn(colParams);
				var col2 = colParams.mesh;
				col2.position.x = posX_1;
				col2.position.y = 0;
				col2.position.z = posZ_2;
				carcas.push(col2);
			}
			if (params.isColumn3) {
				colParams.text = "Колонна 3"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h1;
				if (turnType_1 == "забег") colParams.colLength = h1 * (stairAmt1 + 1) + h2 - h2/2;
				colParams = drawColumn(colParams);
				var col3 = colParams.mesh;
				col3.rotation.y = -Math.PI / 2;
				col3.position.x = posX_3;
				col3.position.y = 0;
				col3.position.z = posZ_3;
				carcas.push(col3);
			}
			
			if (params.isColumn4) {
				colParams.text = "Колонна 4"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h1
				//if(turnType_1 == "забег") colParams.colLength = colLength1 + h1 + h2*2;
if(turnType_1 == "забег") colParams.colLength = h1 * (stairAmt1 + 1) + h2*2 - h2/2;
				colParams = drawColumn(colParams);
				var col4 = colParams.mesh;
col4.rotation.y = -Math.PI / 2;
				col4.position.x = posX_3;
				col4.position.y = 0;
				//col4.position.z = posZ_2;
col4.position.z = posZ_4;
				carcas.push(col4);
			}
			
			colLength1 = h1 * (stairAmt1 + 1) + (stairAmt2 + 1) * h2 - h3/2;
			if (turnType_1 == "забег") colLength1 += 2 * h2;
			
			if (params.isColumn5) {
				colParams.text = "Колонна 5"
				colParams.dxfBasePoint.x += 300;
				//colParams.colLength = colLength1 + 2*h2
colParams.colLength = colLength1 + h3;
				if(turnType_2 == "забег") colParams.colLength = colLength1 + h3*3;
				colParams = drawColumn(colParams);
				var col5 = colParams.mesh;
				col5.position.x = posX_1;
				col5.position.y = 0;
				col5.position.z = posZ_5;
				carcas.push(col5);
			}
			
			if (params.isColumn6) {
				colParams.text = "Колонна 6"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1 + h3;
				if(turnType_2 == "забег") colParams.colLength = colLength1 + h3*3;
				colParams = drawColumn(colParams);
				var col6 = colParams.mesh;
				col6.position.x = posX_1; 
				col6.position.y = 0;
				col6.position.z = posZ_6;
				carcas.push(col6);
			}
				
			colLength1 = h1 * (stairAmt1 + 1) + (stairAmt2 + 1) * h2 - h2/2;
			if (turnType_1 == "забег") colLength1 += 2 * h2;
				
			if (params.isColumn7) {
				colParams.text = "Колонна 7"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1;
				if(turnType_2 == "забег") colParams.colLength = colLength1 + h3;
				colParams = drawColumn(colParams);
				var col7 = colParams.mesh;
				col7.rotation.y = -Math.PI / 2;
				col7.position.x = posX_3;
				col7.position.y = 0;
				col7.position.z = posZ_7;
				carcas.push(col7);
			}
			
			if (params.isColumn8) {
				colParams.text = "Колонна 8"
				colParams.dxfBasePoint.x += 300;
				colParams.colLength = colLength1;
				if(turnType_2 == "забег") colParams.colLength = colLength1;
				colParams = drawColumn(colParams);
				var col8 = colParams.mesh;
				col8.rotation.y = -Math.PI / 2;
				col8.position.x = posX_3;
				col8.position.y = 0;
				col8.position.z = posZ_8;
				carcas.push(col8);
			}
		}

			/***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ТРЕХМАРШЕВОЙ ЛЕСТНИЦЫ  ***/

			
			function drawP3Railing(){}; //пустая функция для навигации через список функций
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
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthTop -= 60;
				var railingSide = "left";
				topConnection = outerHandrailConnection1;
				bottomConnection = false;
				railingPositionZ = -40;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1+1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				
				var railingSection1 = drawRailingSection(sectionParams);
                railingSection1.position.z = railingPositionZ * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection1.position.z += 80 * turnFactor;
			        railingSection1.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection1.position.y += 60;
			    }
				//scene.add( railingSection1 );
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
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection2 = drawRailingSection(sectionParams);
                railingSection2.position.z = railingPositionZ * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection2.position.z -= 80 * turnFactor;
			        railingSection2.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection2.position.y += 60;
			    }
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
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt2, 
					h1: h2, 
					b1: b2, 
					a1: a2, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
					var railingSection6 = drawRailingSection(sectionParams);
					railingSection6.rotation.y = -Math.PI / 2 * turnFactor;
					railingSection6.position.x = stringer6.position.x - stringerThickness * scale;
					if (model == "ко") railingSection6.position.x = railingSection6.position.x - stringerSideOffset * scale;
					railingSection6.position.y = h1 * (stairAmt1 + 1) * scale// + h3*scale;
					if (turnType_1 == "забег") railingSection6.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h2 * scale;
                    railingSection6.position.z = stringer6.position.z;
				    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
				        railingSection6.position.x += 80;
				        railingSection6.position.y += 50 + treadThickness;
				        if (railingModel == "Кованые балясины")
				            railingSection6.position.y += 60;
				    }
					//scene.add( railingSection6 );
					railing.push(railingSection6);
				}
			}

			/*внешняя сторона среднего марша*/

			if (railingSide_2 == "внешнее" || railingSide_2 == "две") {

				var topEnd = "площадка";
				var bottomEnd = "площадка";
				var platformLengthTop = M;
                var platformLengthBottom = M;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        platformLengthBottom -= 60;
			        platformLengthTop -= 110;
			    }
				if (turnType_1 == "забег") bottomEnd = "забег";
				if (turnType_2 == "забег") topEnd = "забег";
				var railingSide = "left";
				topConnection = outerHandrailConnection1;
				bottomConnection = outerHandrailConnection2;
				//railingPositionZ = M;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: (stairAmt2 + 1), 
					h1: h2, 
					b1: b2, 
					a1: a2, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection5 = drawRailingSection(sectionParams);
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				railingSection5.position.x = stringer5.position.x + 40 * scale;
				if (model == "ко") railingSection5.position.x = railingSection5.position.x + stringerSideOffset * scale;
				railingSection5.position.y = h1 * (stairAmt1 + 1) * scale// + h3*scale;
				if (turnType_1 == "забег") railingSection5.position.y = h1 * (stairAmt1 + 1) * scale + 2 * h2 * scale;
                railingSection5.position.z = M * scale * turnFactor;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection5.position.x -= 80;
			        railingSection5.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection5.position.y += 60;
			    }
				//scene.add( railingSection5 );
				railing.push(railingSection5);
			}

			lastMarsh = true;

			/*внешняя сторона верхнего марша*/

			if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "площадка";
				var platformLengthTop = platformLength_3;
                var platformLengthBottom = M;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        platformLengthBottom -= 90;
			        platformLengthTop -= 100;
			    }
				if (turnType_2 == "забег") bottomEnd = "забег";
				var railingSide = "left";
				topConnection = false;
				bottomConnection = outerHandrailConnection2;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection3 = drawRailingSection(sectionParams);
				railingSection3.rotation.y = -Math.PI * turnFactor;
				railingSection3.position.x = b1 * stairAmt1 * scale;
				railingSection3.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1) * scale;
				if (turnType_1 == "забег") railingSection3.position.y += 2 * h2 * scale;
				if (turnType_2 == "забег") railingSection3.position.y += 2 * h3 * scale;
				railingSection3.position.z = stringer3.position.z + 40 * scale * turnFactor;
                if (model == "ко") {
                    railingSection3.position.z = railingSection3.position.z + stringerSideOffset * scale * turnFactor;
                    if (turnType_1 == "площадка" && turnType_2 == "площадка")
                        railingSection3.position.z -= 10 * turnFactor;
                }
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection3.position.z -= 80 * turnFactor;
			        railingSection3.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection3.position.y += 60;
			    }
				//scene.add( railingSection3 );
				railing.push(railingSection3);
			}

			/*внутренняя сторона верхнего марша*/

			if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "нет";
				var platformLengthTop = platformLength_3;
                var platformLengthBottom = 0;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLengthTop -= 100;
				var railingSide = "right";
				topConnection = false;
				bottomConnection = false;
				railingPositionZ = M;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection4 = drawRailingSection(sectionParams);
				railingSection4.rotation.y = -Math.PI * turnFactor;
				railingSection4.position.x = b1 * stairAmt1 * scale;
				railingSection4.position.y = h1 * (stairAmt1 + 1) * scale + h2 * (stairAmt2 + 1) * scale;
				if (turnType_1 == "забег") railingSection4.position.y += 2 * h2 * scale;
				if (turnType_2 == "забег") railingSection4.position.y += 2 * h3 * scale;
				railingSection4.position.z = stringer4.position.z - stringerThickness * scale * turnFactor;
                if (model == "ко") {
                    railingSection4.position.z = railingSection4.position.z - stringerSideOffset * scale * turnFactor;
                    if (turnType_1 == "площадка" && turnType_2 == "площадка")
                        railingSection4.position.z -= 50 * turnFactor;
                }
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection4.position.z += 80 * turnFactor;
			        railingSection4.position.y += 50 + treadThickness;
			        if (railingModel == "Кованые балясины")
			            railingSection4.position.y += 60;
			    }
				//scene.add( railingSection4 );
				railing.push(railingSection4);
			}

			/*заднее ограждение верхней площадки*/
			if (topPltRailing_5 && platformTop == "площадка") {

                var platformLength = M;
			    if (params.rackBottom == "сверху с крышкой" && model == "ко")
			        platformLength -= 160;
				var offsetLeft = 50;
				var offsetRight = 50;
				var handrailOffsetLeft = 50;
				var handrailOffsetRight = 50;
				var railingSide = "right";
				if (railingModel == "Самонесущее стекло") railingSide = "left";
				var sectionPos = "staircase";


				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide,
					railingModel, sectionPos) //функция в файле drawBanisterSection.js
				railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
				//railingSection5.rotation.y = -Math.PI/2
				railingSection5.position.x = platformStringer1.position.x - (platformLength_3 - a3) / 2 * scale - 40 * scale;//- M/2*scale;
				railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2 * scale + stringerOffset_y * scale;
				railingSection5.position.z = platformStringer1.position.z + (stringerThickness / 2 - stringerSideOffset) * scale * turnFactor;
				if (model == "лт") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
				//scene.add( railingSection5 );
			    if (params.rackBottom == "сверху с крышкой" && model == "ко") {
			        railingSection5.position.z += 80 * turnFactor;
			        railingSection5.position.x += 80;
			        railingSection5.position.y += 110 + treadThickness;
			    }
				railing.push(railingSection5);
			}

				/*** ПРИСТЕННЫЙ ПОРУЧЕНЬ ***/

function addP3MarshesHandrail(){}; //пустая функция для навигации

var sideHandrailParams = {
	dxfArr: dxfPrimitivesArr,
	dxfBasePoint: {x:-300, y:-6000},	
	stairType: "metal_com",
	topMarshPos_Z: z0
	}
	
sideHandrailParams = draw3marshSideHandrail(sideHandrailParams);
	
var handrails = sideHandrailParams.handrails;
railing.push(handrails);
			
		}//конец П-образной трехмаршевой
		
		
/*** Прямая двухмаршевая ***/


function drawStright2MarshStaircase(){}; //пустая функция для навигации через список функций

if (stairModel == "Прямая двухмаршевая") {

	/*ступени нижний марш*/
	geometry = new THREE.BoxGeometry(a1 * scale, treadThickness * scale, treadWidth * scale);

	var tread;
	var x0 = a1 / 2;
	var y0 = -treadThickness / 2;
	var z0 = M / 2 * turnFactor;

	for (var i = 0; i < stairAmt1; i++) {
		tread = new THREE.Mesh(geometry, treadMaterial);
		tread.position.y = h1 * (i + 1) + y0;
		tread.position.x = b1 * i + x0;
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

	x0 = b1 * stairAmt1;
	y0 = h1 * (stairAmt1 + 1);
	z0 = 0;

//Промежуточная площадка

	var platformLength = M;
	if (model == "лт") platformLength = M - stringerThickness;

	geometry = new THREE.BoxGeometry(platformLength * scale, treadThickness * scale, treadWidth * scale);
	tread = new THREE.Mesh(geometry, treadMaterial);
	tread.position.x = platformLength / 2 + x0;
	tread.position.y = -treadThickness/2 + y0;
	tread.position.z = M / 2 * scale * turnFactor;
	tread.castShadow = true;
	treads.push(tread);



/*ступени верхний марш*/
	geometry = new THREE.BoxGeometry(a3 * scale, treadThickness * scale, treadWidth * scale);

	var tread;
	x0 = x0 + platformLength + a3/2;
	if(model == "ко") x0 = x0 - (a3 - b3)

	for (var i = 0; i < stairAmt3; i++) {
		tread = new THREE.Mesh(geometry, treadMaterial);
		tread.position.y = h3 * (i + 1) + y0 - treadThickness/2;
		tread.position.x = b3 * i + x0;
		tread.position.z = M / 2 * turnFactor;
		tread.castShadow = true;
		treads.push(tread);
	}
	
	//подступенки верхний марш
				if (riserType == "есть") {
				riserHeight = h1 - treadThickness;
				geometry = new THREE.BoxGeometry(riserThickness * scale, riserHeight * scale, (M - 2 * riserSideOffset) * scale);

				var riser;
				for (var i = 0; i < stairAmt3; i++) {
					riser = new THREE.Mesh(geometry, treadMaterial);
					riser.position.x = b3 * (i - 1) + a3/2 - riserThickness / 2 + x0;
					riser.position.y = h3 * i + riserHeight / 2 +y0;
					riser.position.z = M / 2 * scale * turnFactor;
					riser.castShadow = true;
					risers.push(riser);
				}
			}
				

				platform_x = tread.position.x;
				platform_y = tread.position.y;
				platform_z = tread.position.z;
			

			/*верхняя площадка*/
			if (platformTop == "площадка") {
				geometry = new THREE.BoxGeometry(platformLength_3, treadThickness, treadWidth);
				tread = new THREE.Mesh(geometry, treadMaterial);
				tread.position.y = platform_y;
				tread.position.x = platform_x + (platformLength_3 - a3)/2;
				tread.position.z = M/2 * turnFactor;
				tread.castShadow = true;
				treads.push(tread);
				
				topStepPos = {
					x: tread.position.x + platformLength_3 / 2,
					z: 0,
					}
			}

			/*верхнее перекрытие*/

			if (platformTop != "площадка") {
				/*
				geometry = new THREE.BoxGeometry(M * scale, 300 * scale, M * scale);
				floorTop = new THREE.Mesh(geometry, floorMaterial);
				floorTop.castShadow = true;
				if (topStairType == "ниже") floorTop.position.y = platform_y + h3 * scale - 150 * scale + treadThickness / 2 * scale;
				if (topStairType == "вровень") floorTop.position.y = platform_y - 150 * scale + treadThickness / 2 * scale;
				floorTop.position.x = platform_x + (a3 + M) / 2;
				floorTop.position.z = M / 2 * turnFactor;
				topFloor.push(floorTop);
				*/
				topStepPos = {
					x: tread.position.x + a3/2,
					z: 0,
					}
			}


			/***  КАРКАС ПРЯМОЙ ДВУМАРШЕВОЙ ЛЕСТНИЦЫ   ***/

			
			function drawStright2MarshStringers(){}; //пустая функция для навигации через список функций
				stringerTurn = "площадка";
				tyrnLength = M;


			/*внешний косоур нижнего марша*/

			var stringerShape = drawStringer1(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer1 = new THREE.Mesh(geom, stringerMaterial);
			stringer1.position.x = 0;
			stringer1.position.y = 0;
			stringer1.position.z = stringerSideOffset * scale * turnFactor;
			if (turnFactor == -1) stringer1.position.z = stringer1.position.z - stringerThickness * scale;
			stringer1.castShadow = true;
			carcas.push(stringer1);

			/*внутренний косоур нижнего марша*/

			if(model == 'лт')tyrnLength = M - stringerThickness;
			stringerShape = drawStringer2(
				model, stringerTurn, stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				tyrnLength, scale, stringerSideOffset);
			var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var stringer2 = new THREE.Mesh(geom, stringerMaterial);
			stringer2.position.x = 0;
			stringer2.position.y = 0;
			stringer2.position.z = ((M - stringerThickness) * scale - stringerSideOffset * scale) * turnFactor;
			stringer2.castShadow = true;
			carcas.push(stringer2);

			/*внешний косоур верхнего марша*/

			stringerShape = drawStringer4(
				model, stringerTurn, stringerType,
				h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, 0);

				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer3 = new THREE.Mesh(geom, stringerMaterial);
				stringer3.position.x = b1 * stairAmt1 * scale + M;
				if(model == 'лт') stringer3.position.x = stringer3.position.x - stringerThickness
				stringer3.position.y = h1 * (stairAmt1 + 1) * scale - Math.max(h1, h3) * scale;
				stringer3.position.z = stringerSideOffset * turnFactor;
				stringer3.castShadow = true;
				carcas.push(stringer3);
		

			/*внутренний косоур верхнего марша*/

			stringerShape = drawStringer4(
				model, stringerTurn, stringerType,
				h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2,
				tyrnLength, scale, 0);
				var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var stringer4 = new THREE.Mesh(geom, stringerMaterial);
				stringer4.position.x = stringer3.position.x;
				stringer4.position.y = stringer3.position.y;
				stringer4.position.z = (M - stringerThickness - stringerSideOffset) * turnFactor;
				stringer4.castShadow = true;
				carcas.push(stringer4);


			/*косоуры верхней площадки*/

			if (platformTop == "площадка") {
				var stringerWidth = 150;
				var stringerLength = platformLength_3 - a3
				var geom = new THREE.BoxGeometry(stringerLength, stringerWidth, stringerThickness) ;

				/*левый косоур площадки*/
				var platformStringer1 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer1.position.x = platform_x + (stringerLength + a3) / 2;
				platformStringer1.position.y = platform_y - stringerWidth / 2 + treadThickness / 2 // + treadThickness/2*scale;
				if(model == 'ко') platformStringer1.position.y = platformStringer1.position.y - treadThickness;
				platformStringer1.position.z = (stringerSideOffset + stringerThickness/2) * turnFactor;
				platformStringer1.castShadow = true;
				carcas.push(platformStringer1);

				/*правый косоур площадки*/
				var platformStringer2 = new THREE.Mesh(geom, stringerMaterial);
				platformStringer2.position.x = platformStringer1.position.x
				platformStringer2.position.y = platformStringer1.position.y;
				platformStringer2.position.z = (M - stringerSideOffset - stringerThickness/2) * turnFactor
				platformStringer2.castShadow = true;
				carcas.push(platformStringer2);

				/*задняя тетива площадки*/
				if (platformRearStringer == "есть") {
					var geom = new THREE.BoxGeometry(stringerThickness, stringerWidth, M - 2*stringerSideOffset);
					var platformStringer3 = new THREE.Mesh(geom, stringerMaterial);
					platformStringer3.position.x = platform_x + stringerLength + a3/2 + stringerThickness/2;
					platformStringer3.position.y = platformStringer1.position.y;
					platformStringer3.position.z = M/2 * turnFactor;
					platformStringer3.castShadow = true;
					carcas.push(platformStringer3);
				}

			}

			/***  ОГРАЖДЕНИЯ ПРЯМОЙ ДВУХМАРШЕВОЙ ЛЕСТНИЦЫ  ***/

			
			function drawStright2Railing(){}; //пустая функция для навигации через список функций
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
				var bottomEnd = "нет";
				var platformLengthBottom = 0;
				var platformLengthTop = M;
				var railingSide = "left"
				topConnection = outerHandrailConnection;
				bottomConnection = false;
				railingPositionZ = -40 * turnFactor;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1+1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection1 = drawRailingSection(sectionParams);
				railingSection1.position.z = railingPositionZ * scale;
				railing.push(railingSection1)
			}

			/*внутренняя сторона нижнего марша*/

			if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
				var topEnd = "площадка";
				var bottomEnd = "нет";
				var platformLengthBottom = 0;
				var platformLengthTop = M;
				var railingSide = "right"
				railingPositionZ = M * turnFactor;
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt1+1, 
					h1: h1, 
					b1: b1, 
					a1: a1, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection2 = drawRailingSection(sectionParams);
				railingSection2.position.z = railingPositionZ;
				railing.push(railingSection2)
			}


			/*внешняя сторона верхнего марша*/
			lastMarsh = true;

			if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
				var topEnd = platformTop;
				var bottomEnd = "нет";
				var platformLengthTop = platformLength_3;
				var platformLengthBottom = 0;
				var railingSide = "left"
				topConnection = false;
				bottomConnection = outerHandrailConnection;
				railingPositionZ = M * turnFactor;
				//верхняя площадка
				var topEnd = "нет";
				if (topPltRailing_3 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h2, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection3 = drawRailingSection(sectionParams);
				railingSection3.position.x = stringer4.position.x;
				if (model == "ко") railingSection3.position.x = railingSection3.position.x - stringerSideOffset * scale;
				railingSection3.position.y = h1 * (stairAmt1 + 1) * scale// + h3*scale;
				railingSection3.position.z = -40 * turnFactor;
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
				if (topPltRailing_4 && platformTop == "площадка") topEnd = "площадка";
				var sectionParams = {					
					bottomEnd: bottomEnd, 
					platformLengthBottom: platformLengthBottom, 
					topEnd: topEnd, 
					platformLengthTop: platformLengthTop,
					railingSide: railingSide, 
					stairAmt: stairAmt3, 
					h1: h3, 
					b1: b3, 
					a1: a3, 
					h2: h3, 
					scale: scale, 
					lastMarsh: lastMarsh, 
					topConnection: topConnection, 
					bottomConnection: bottomConnection,
					}
				var railingSection4 = drawRailingSection(sectionParams);
				railingSection4.position.x = stringer4.position.x;
				if (model == "ко") railingSection4.position.x = railingSection4.position.x - stringerSideOffset * scale;
				railingSection4.position.y = h1 * (stairAmt1 + 1) * scale// + h3*scale;
				railingSection4.position.z = M*turnFactor;
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
				var sectionPos = "staircase";

				
				var railingSection5 = drawRailingSectionPlatform(
					platformLength, offsetLeft, offsetRight,
					handrailOffsetLeft, handrailOffsetRight, railingSide,
					railingModel, sectionPos) //функция в файле drawBanisterSection.js
				railingSection5.rotation.y = Math.PI/2;
				railingSection5.position.x = platform_x + platformLength_3 - a3/2 + stringerThickness + 40;
				railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2 * scale;
				railingSection5.position.z = M*turnFactor//platformStringer1.position.z + ((platformLength_3 - a3) / 2 * scale + 40 * scale) * turnFactor;
				//if (model == "лт") railingSection5.position.z = railingSection5.position.z + stringerThickness * scale * turnFactor;

				railing.push(railingSection5)
			}

		}//конец Прямой двухмаршевой

		
		
	//сдвигаем и поворачиваем лестницу чтобы верхний марш был вдоль оси Х
	
	if(params.stairModel == "Прямая" || params.stairModel == "Прямая двухмаршевая"){
		var pos={
			x: topStepPos.x,
			z: topStepPos.z,
			}
		var rot = 0;
		}
	if(params.stairModel == "Г-образная с площадкой" || params.stairModel == "Г-образная с забегом"){
		var pos={
			x: topStepPos.z * turnFactor,
			z: topStepPos.x * turnFactor,
			}
		var rot = Math.PI / 2 * turnFactor;
		}
	if(params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная трехмаршевая"){
		var pos={
			x: -topStepPos.x,
			z: topStepPos.z,
			}
		var rot = Math.PI;
		}
	
	if(params.stairAmt3 == 0) {
		var showLastTreadWidth = false;
			if(params.stairModel == "Г-образная с забегом") showLastTreadWidth = true;
			if(params.stairModel == "П-образная с забегом") showLastTreadWidth = true;
			if(params.stairModel == "П-образная трехмаршевая" && params.turnType_2 == "забег") showLastTreadWidth = true;
	
		if(showLastTreadWidth){
			if(params.model == "лт") pos.x += params.lastWinderTreadWidth - 100;
			if(params.model == "ко") pos.x += params.lastWinderTreadWidth - 50;
			}
		}

	//сохраняем позицию лестницы для позиционирования шкафа
	params.starcasePos = pos;
	params.starcasePos.rot = rot;
	
	var model = [
		treads,
		risers,
		carcas,
		railing,
		]
	var modelObj = [];
	
	for (var i=0; i<model.length; i++){
		modelObj[i] = new THREE.Object3D();
		
		for (var j=0; j<model[i].length; j++){
			modelObj[i].add(model[i][j]);
			}
		modelObj[i].position.x += -pos.x + params.staircasePosX;
		modelObj[i].position.z += pos.z + params.staircasePosZ;
		modelObj[i].rotation.y = rot;
		}
		treads = [
			modelObj[0],
			]
		risers = [
			modelObj[1],
			]
		carcas = [
			modelObj[2],
			]
		railing = [
			modelObj[3],
			]

		
//добавляем объекты в сцену
		addObjects(viewportId, treads, 'treads');
		addObjects(viewportId, risers, 'risers');
		addObjects(viewportId, carcas, 'carcas');
		addObjects(viewportId, railing, 'railing');
		//addObjects(viewportId, topFloor, 'topFloor');
 //измерение размеров на модели
	addMeasurement(viewportId);

	} //end of drawStair
	

