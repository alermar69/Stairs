/***  Секции маршей   ***/


function drawRailingSection(par) {
var bottomEnd = par.bottomEnd;
var platformLengthBottom = par.platformLengthBottom;
var topEnd = par.topEnd;
var platformLengthTop = par.platformLengthTop;
var railingSide = par.railingSide;
var stairAmt = par.stairAmt;
var h1 = par.h1;
var b1 = par.b1;
var a1 = par.a1;
var h2 = par.h2;
var lastMarsh = par.lastMarsh;
var topConnection = par.topConnection;
var bottomConnection = par.bottomConnection;
			
if (turnFactor == -1) {
	var railingSideTemp = railingSide
	if (railingSideTemp == "left") railingSide = "right"
	if (railingSideTemp == "right") railingSide = "left"
	}
var railingSection = new THREE.Object3D();
var rackOffsetY = 150;
var rackLength = 900;
var rackPositionStep = setRackPosition (stairAmt);
var handrailAngle = Math.atan(h1 / b1);
var railingPositionZ = 0;
if (turnFactor == -1) railingPositionZ = -40;
var turnAngleTop = 0;
var turnAngleBottom = 0;
var basePoint = [];
/*материалы*/
var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
//var stringerMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});
//var floorMaterial = new THREE.MeshLambertMaterial( {color: 0xBFBFBF});
var railingMaterial =  new THREE.MeshLambertMaterial({color: 0xD0D0D0, wireframe: false});
var glassMaterial =  new THREE.MeshLambertMaterial({opacity:0.6, color: 0x3AE2CE, transparent:true});
var glassThickness = 8;
if (railingModel == "Самонесущее стекло") glassThickness = 12;
	var glassExtrudeOptions = {
		amount: glassThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var forgingExtrudeOptions = {
		amount: 40,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

	var turnAngleTop = 0;
	if (topEnd == "забег") {
		var deltaXtopPlatform = platformLengthTop - b1/2 - 70;
		var deltaYtopPlatform = h2;
		turnAngleTop = Math.atan( deltaYtopPlatform/deltaXtopPlatform)	
		}	
	var turnAngleBottom = 0;
	if (bottomEnd == "забег") {
		var deltaXbottomPlatform = platformLengthBottom + b1/2 - 70;
		var deltaYbottomPlatform = 2*h1;
		turnAngleBottom = Math.atan( deltaYbottomPlatform/deltaXbottomPlatform)
		}

//пример подключения функций 4.0
/*
	//отрисовка стойки
	var rackPos = {
		x: -1000,
		y: 1000,
		z: 1000,
		}
	var rackParams = {
		len: 900,
		railingSide: railingSide,
		stringerSideOffset: par.stringerSideOffset,
		showPins: false,
		showHoles: false,
		material: railingMaterial,
		dxfBasePoint: {x:0, y:0},
		dxfArr: dxfPrimitivesArr,
		}
	rackParams = drawRack3d_4(rackParams);
	var rack = rackParams.mesh;
	rack.position.x = rackPos.x;
	rack.position.y = rackPos.y;
	rack.position.z = rackPos.z;
	railingSection.add(rack);
	
	//отрисовка поручня и ригелей
	var poleParams = {
		type: "rect",
		poleProfileY: 40,
		poleProfileZ: 60,		
		length: 1000,
		poleAngle: Math.PI / 6,
		material: railingMaterial,
		dxfBasePoint: {x:0, y:0},
		dxfArr: dxfPrimitivesArr,
		}
	var polePos = newPoint_xy(rackPos, 0, 810);
	//смещаем поручень
	polePos = newPoint_x1(polePos, -50, poleParams.poleAngle);
	
	
	poleParams = drawPole3D_4(poleParams);
		var pole = poleParams.mesh;
		pole.position.x = polePos.x;
		pole.position.y = polePos.y;
		pole.position.z = polePos.z;
		railingSection.add(pole);
*/
		
/* ограждения со стойками */

function drawRacks(){}; //пустая функця для навигации

if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {
	if(stairAmt != 0) {

		/*нижняя площадка*/

		if (bottomEnd == "забег" || bottomEnd == "площадка") {
			/*первая стойка площадки/забега*/
			var rackPos0 = {
				x: 70 - platformLengthBottom,
				y: bottomEnd == "забег" ? -h1 : 0,
				z: railingPositionZ,
			}
			var rackPosition0 = newPoint_xy(rackPos0, 0, -h1);	// сохраняем координаты стойки для отрисовки стёкол

			var rackParams = {
				len: 900,
				railingSide: railingSide,
				stringerSideOffset: par.stringerSideOffset,
				showPins: false,
				showHoles: false,
				material: railingMaterial,
				dxfBasePoint: {x:0, y:0},
				dxfArr: dxfPrimitivesArr,
			}
			rackParams = drawRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = rackPos0.x;
			rack.position.y = rackPos0.y;
			rack.position.z = rackPos0.z;
			railingSection.add(rack);
			
			// вторая стойка на площадке
			if (bottomEnd == "площадка") {
				var rackPosPlt0 = {
					x: -70,
					y: 0,
					z: railingPositionZ,
				}
				rackParams = drawRack3d_4(rackParams);
				var rack = rackParams.mesh;
				rack.position.x = rackPosPlt0.x;
				rack.position.y = rackPosPlt0.y;
				rack.position.z = rackPosPlt0.z;
				railingSection.add(rack);
			}
		}
			
		rackPosition = [];

		//отрисовка стойки
		var rackPos1 = {
			x: b1/2,
			y: h1,
			z: railingPositionZ,
		}
		rackPosition.push(newPoint_xy(rackPos1, 0, -h1)); // сохраняем координаты стойки марша

		var rackParams = {
			len: 900,
			railingSide: railingSide,
			stringerSideOffset: par.stringerSideOffset,
			showPins: false,
			showHoles: false,
			material: railingMaterial,
			dxfBasePoint: {x:0, y:0},
			dxfArr: dxfPrimitivesArr,
		}
		rackParams = drawRack3d_4(rackParams);
		var rack = rackParams.mesh;
		rack.position.x = rackPos1.x;
		rack.position.y = rackPos1.y;
		rack.position.z = rackPos1.z;
		railingSection.add(rack);
		
		//отрисовка последней стойки
		var rackPos3 = {
			x: b1/2 + b1*(stairAmt - 1),
			y: h1*stairAmt,
			z: railingPositionZ,
		}

		rackParams = drawRack3d_4(rackParams);
		var rack = rackParams.mesh;
		rack.position.x = rackPos3.x;
		rack.position.y = rackPos3.y;
		rack.position.z = rackPos3.z;
		railingSection.add(rack);
		
		/*средние стойки марша*/
		for (i = 0; i < stairAmt; i++) {
			var rackPos2 = {
				x: rackPos1.x + b1*i,
				y: rackPos1.y + h1*i,
				z: railingPositionZ,
			}
			for (var j = 0; j < rackPositionStep.length; j++) {
				if (i+1 == rackPositionStep[j]) {
					rackParams = drawRack3d_4(rackParams);
					var rack = rackParams.mesh;
					rack.position.x = rackPos2.x;
					rack.position.y = rackPos2.y;
					rack.position.z = rackPos2.z;
					railingSection.add(rack);

					rackPosition.push(newPoint_xy(rackPos2, 0, -h1));	// сохраняем координаты средних стоек
				}
			}
		}

		rackPosition.push(newPoint_xy(rackPos3, 0, -h1));	// сохраняем координаты последней стойки

		// ограждение верхней площадки
		
		if (topEnd == "забег" || topEnd == "площадка") {
			/*последняя стойка забега/площадки*/
			var rackPosTop = newPoint_xy(rackPos3, (platformLengthTop - 70 - b1/2), topEnd == "забег" ? h1 : 0);
			
			rackPosition.push(newPoint_xy(rackPosTop, 0, -h1));	// сохраняем координаты последней стойки

			rackParams = drawRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = rackPosTop.x;
			rack.position.y = rackPosTop.y;
			rack.position.z = rackPosTop.z;
			railingSection.add(rack);
		}
	}
if(stairAmt == 0) {

var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength)
	/*первая стойка*/

var rackPos0 = {
				x: 70 - platformLengthBottom,
				y: -h1,
				z: railingPositionZ,
			}
			var rackPosition0 = newPoint_xy(rackPos0, 0, 0);	// сохраняем координаты стойки для отрисовки стёкол

			var rackParams = {
				len: 900,
				railingSide: railingSide,
				stringerSideOffset: par.stringerSideOffset,
				showPins: false,
				showHoles: false,
				material: railingMaterial,
				dxfBasePoint: {x:0, y:0},
				dxfArr: dxfPrimitivesArr,
			}
			
			rackParams = drawRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = rackPos0.x;
			rack.position.y = rackPos0.y;
			rack.position.z = rackPos0.z;
			railingSection.add(rack);
			
/*остальные стойки*/
	var middleRackAmt = Math.round(sectionLength/800);
		if (middleRackAmt < 0) middleRackAmt = 0;
		//var p0 = basePoint;
	//var p0 = rackPos0;
		var rackDist = sectionLength/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt+1; i++) {
			rackPos0 = newPoint_x(rackPos0, rackDist, -sectionAngle);
			rackParams = drawRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = rackPos0.x;
			rack.position.y = rackPos0.y;
			rack.position.z = rackPos0.z;
			railingSection.add(rack);
			}
	}
}


/* ригели */

function drawRigels(){}; //пустая функця для навигации

if (railingModel == "Ригели") {
	var rigelProfileY = 20;
	var rigelProfileZ = 20;
	
	if(rigelMaterial == "20х20 черн.") {
		rigelModel = "rect";
		rigelProfileY = 20;
		rigelProfileZ = 20;
		}
	if(rigelMaterial == "Ф12 нерж.") {
		rigelModel = "round";
		rigelProfileY = 12;
		rigelProfileZ = 12;
		}
	if(rigelMaterial == "Ф16 нерж.") {
		rigelModel = "round";
		rigelProfileY = 16;
		rigelProfileZ = 16;
		}

	if (railingSide == "left") var rigelZ = (railingPositionZ + 40)*turnFactor;
	if (railingSide == "right") var rigelZ = (railingPositionZ - rigelProfileZ);
	
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	
	var poleParams = {
		//type: "rect",
		type: rigelModel,
		poleProfileY: rigelProfileY,
		poleProfileZ: rigelProfileZ,
		length: 1000,
		poleAngle: Math.PI / 6,
		material: railingMaterial,
		dxfBasePoint: {x:0, y:0},
		dxfArr: dxfPrimitivesArr,
	}
	
	if(stairAmt != 0) {
		/*нижняя площадка/забег*/
		if (bottomEnd == "площадка" || bottomEnd == "забег") {
			var handrailAngleBottom = bottomEnd == "забег" ? Math.atan((rackPos0.y - rackPos1.y)/(rackPos0.x - rackPos1.x)) : 0;
			var handrailBottomLength = bottomEnd == "забег" ? (platformLengthBottom - 70 + b1/2)/Math.cos(handrailAngleBottom) : (platformLengthBottom - 70/* + b1/2*/);

			poleParams.length = handrailBottomLength;
			poleParams.poleAngle = handrailAngleBottom;

			var rigelPos = newPoint_xy(rackPos0, 0, rigelDist + (bottomEnd == "площадка" ? 17 : 0));
			rigelPos = newPoint_x1(rigelPos, -50, poleParams.poleAngle);
			rigelPos.z = rigelZ;
			var rigelFirstBottomPos = copyPoint(rigelPos);
			
			poleParams.length += 50/Math.cos(poleParams.poleAngle);
			//if(lastMarsh) rigelLength += params.topHandrailExtraLength;

			for (var i=1; i < rigelAmt+1; i++) {
				rigelPos.y = rigelFirstBottomPos.y + rigelDist * (i - 1);

				poleParams = drawPole3D_4(poleParams);
				var pole = poleParams.mesh;
				pole.position.x = rigelPos.x;
				pole.position.y = rigelPos.y;
				pole.position.z = rigelPos.z;
				railingSection.add(pole);
			}
		}

		/*ригели на марше*/

		var stepLength = h1/Math.sin(handrailAngle);
		var handrailLength = stepLength * stairAmt - 1/3*stepLength;
		if (lastMarsh) handrailLength += params.topHandrailExtraLength;
		if (topEnd == "забег" || topEnd == "площадка") handrailLength = (rackPos3.x - rackPos1.x + (bottomEnd != "забег" ? 50 : 0))/Math.cos(handrailAngle);
		if (railingModel == "Самонесущее стекло") handrailLength = stepLength * stairAmt + 0.2*stepLength;

		poleParams.length = handrailLength;
		poleParams.poleAngle = handrailAngle;

		var rigelPos = newPoint_xy(rackPos1, 0, 0);
		rigelPos.z = rigelZ;
		if (bottomEnd == "нет") rigelPos = newPoint_x1(rigelPos, -25, poleParams.poleAngle);
		
		var rigelLength = stepLength * (stairAmt - 1) + (topEnd == "нет" ? 50 : 25)/Math.cos(poleParams.poleAngle);
		if (bottomEnd != "нет") rigelLength -= 25/Math.cos(poleParams.poleAngle);
		poleParams.length = rigelLength;
		if(lastMarsh) rigelLength += params.topHandrailExtraLength;

		for (var i=1; i < rigelAmt+1; i++) {
			rigelPos.y = h1 + rigelDist*i;
				
			poleParams = drawPole3D_4(poleParams);
			var pole = poleParams.mesh;
			pole.position.x = rigelPos.x;
			pole.position.y = rigelPos.y;
			pole.position.z = rigelPos.z;
			railingSection.add(pole);
		}
		
		/*верхняя площадка/забег*/
		if (topEnd == "площадка" || topEnd == "забег") {
			var handrailAngleTop = topEnd == "забег" ? Math.atan((rackPosTop.y - rackPos3.y)/(rackPosTop.x - rackPos3.x)) : 0;
			var handrailTopLength = topEnd == "забег" ? (platformLengthTop - 70 - b1/2)/Math.cos(handrailAngleTop) : (platformLengthTop - 70 - b1/2);

			poleParams.length = handrailTopLength;
			poleParams.poleAngle = handrailAngleTop;

			var rigelPos = newPoint_xy(rigelPos, rigelLength * Math.cos(handrailAngle), rigelLength * Math.sin(handrailAngle) - rigelDist * (rigelAmt - 1));
			rigelPos.z = rigelZ;
			poleParams.length += 50;
			var rigelFirstBottomPos = copyPoint(rigelPos);
			//if(lastMarsh) rigelLength += params.topHandrailExtraLength;

			for (var i=1; i < rigelAmt+1; i++) {
				rigelPos.y = rigelFirstBottomPos.y + rigelDist * (i - 1);
					
				poleParams = drawPole3D_4(poleParams);
				var pole = poleParams.mesh;
				pole.position.x = rigelPos.x;
				pole.position.y = rigelPos.y;
				pole.position.z = rigelPos.z;
				railingSection.add(pole);
			}
		}
	}

if(stairAmt == 0) {
//middleRackAmt
	var rigelLength = (sectionLength + 60) / Math.cos(sectionAngle)	
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);

	poleParams.length = rigelLength;
	poleParams.poleAngle = sectionAngle;

	var rigelPos = newPoint_x1(rackPosition0, -30, poleParams.poleAngle);
	rigelPos.z = rigelZ;
	var firstRigelPos = newPoint_xy(rigelPos, 0, h1);

	for (var i=1; i < rigelAmt+1; i++) {
		rigelPos.y = firstRigelPos.y + rigelDist * (i - 1);
			
		poleParams = drawPole3D_4(poleParams);
		var pole = poleParams.mesh;
		pole.position.x = rigelPos.x;
		pole.position.y = rigelPos.y;
		pole.position.z = rigelPos.z;
		railingSection.add(pole);
	}
}

}

/* стекла на стойках */

function drawGlass(){}; //пустая функця для навигации

if (railingModel == "Стекло на стойках") {
var glassDist = 80;
var glassHeight = 600;

for (i=0; i<rackPosition.length-1; i++) {
	if (rackPosition[i].y == rackPosition[i+1].y) 
		var glassShape = drawGlassShape_4(rackPosition[i], rackPosition[i+1], 0, glassDist, glassHeight);
	else
		var glassShape = drawGlassShape_4(rackPosition[i], rackPosition[i+1], handrailAngle, glassDist, glassHeight);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition[i].x + glassDist/2;
	glass.position.y = rackPosition[i].y + 230;
	glass.position.z = railingPositionZ + 16;
	
	glass.castShadow = true;
	railingSection.add(glass);
	}
if(stairAmt != 0) {
	if (bottomEnd == "площадка") {
		var rackDist0 = rackPosPlt0.x - rackPos0.x;
		var p1 = rackPosition0;
		var p2 = newPoint_x (p1, rackDist0,0);
		
		var glassShape = drawGlassShape_4 (p1, p2, 0, glassDist, glassHeight);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = rackPosition0.x + glassDist/2;
		glass.position.y = rackPosition0.y + 230;
		glass.position.z = railingPositionZ + 16;
		
		glass.castShadow = true;
		railingSection.add(glass);	
	}

	if (bottomEnd == "забег") {
		var handrailAngleBottom = bottomEnd == "забег" ? Math.atan((rackPos0.y - rackPos1.y)/(rackPos0.x - rackPos1.x)) : 0;
		var turnAngleBottom = handrailAngleBottom;

		var glassShape = drawGlassShape_4 (rackPosition0, rackPosition[0], turnAngleBottom, glassDist, glassHeight);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = rackPosition0.x + glassDist/2;
		glass.position.y = rackPosition0.y + 230;
		glass.position.z = railingPositionZ + 16;	
		glass.castShadow = true;
		railingSection.add(glass);
	}
}
} //конец стекол на стойках

/* Самонесущее стекло */

function drawGlassSection(){}; //пустая функця для навигации

if (railingModel == "Самонесущее стекло") {

	var glassDist = 10; //зазор между стеклами
	var glassOffset = 15; //зазор от стекла до торца ступени
	var glassHeight = 1030;
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = (railingPositionZ + glassOffset)
	if (railingSide == "left") z0 = (railingPositionZ + 40 - glassOffset - glassThickness);

if (stairAmt!= 0){
	if (topEnd == "забег") {
		deltaXtopPlatform = platformLengthTop - b1;
		deltaYtopPlatform = h1;
		turnAngleTop = Math.atan( deltaYtopPlatform/deltaXtopPlatform)	
		}	
	if (bottomEnd == "забег") {
		deltaXbottomPlatform = platformLengthBottom;
		deltaYbottomPlatform = h1;
		turnAngleBottom = Math.atan( deltaYbottomPlatform/deltaXbottomPlatform)
		}
	
/*нижняя площадка*/

if (bottomEnd != "нет") {

	var glassSectionLength1 = platformLengthBottom;
	if (bottomConnection) glassSectionLength1 = glassSectionLength1 + glassOffset - glassDist;

	var glassAmt_1 = Math.round(glassSectionLength1/800);
	var glassLengthX = glassSectionLength1/glassAmt_1;
	var p1 = {x:0, y:0};
	var p2 = {x:glassLengthX , y:glassLengthX * Math.tan(turnAngleBottom)};
	x0 = 0 - glassSectionLength1;
	y0 = -rackOffsetY - glassSectionLength1 * Math.tan(turnAngleBottom);
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape_4 (p1, p2, turnAngleBottom, glassDist, glassHeight);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX  * i;
		glass.position.y = y0 + glassLengthX * Math.tan(turnAngleBottom) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		
		}
	}	

/*марш*/
	
	var glassSectionLength2 = b1 * stairAmt;
	
	if (topEnd == "нет") {
		if (lastMarsh) glassSectionLength2 = b1 * (stairAmt - 1) + a1;
		else glassSectionLength2 = b1 * stairAmt - glassDist - glassOffset;
		}
	
	if (bottomEnd == "нет") glassSectionLength2 = glassSectionLength2 - glassOffset;
	var glassAmt_1 = Math.round(glassSectionLength2/800);
	if (glassAmt_1 == 0) glassAmt_1 = 1;
	var glassLengthX = glassSectionLength2/glassAmt_1;
	var p1 = {x:0, y:0};
	var p2 = {x: glassLengthX , y: glassLengthX * Math.tan(handrailAngle)};
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = 0;
	if (bottomEnd == "нет") x0 = glassOffset;
	y0 = -rackOffsetY;//-h1;
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape_4 (p1, p2, handrailAngle, glassDist, glassHeight);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX  * i;
		glass.position.y = y0 + glassLengthX * Math.tan(handrailAngle) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint = {
		x: glass.position.x + glassLengthX,
		y: glass.position.y + glassLengthX * Math.tan(handrailAngle),
		z: glass.position.z,
		};
		
/*верхняя площадка*/

if (topEnd != "нет") {

	var glassSectionLength3 = platformLengthTop - b1;
	if (topConnection) glassSectionLength3 = glassSectionLength3 + glassOffset + glassDist + glassThickness;
	var glassAmt_1 = Math.round(glassSectionLength3/800);
	var glassLengthX = glassSectionLength3/glassAmt_1;
	var p1 = {x:0, y:0};
	var p2 = {x: glassLengthX , y: glassLengthX * Math.tan(turnAngleTop)};
	x0 = basePoint.x
	y0 = basePoint.y
	//z0 = basePoint[2]
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape_4 (p1, p2, turnAngleTop, glassDist, glassHeight);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX  * i;
		glass.position.y = y0 + glassLengthX * Math.tan(turnAngleTop) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	}	
}

if(stairAmt == 0) {
	
	var glassSectionLength0 = platformLengthTop + platformLengthBottom - glassDist;
	if (bottomConnection) glassSectionLength0 = glassSectionLength0 + glassOffset// - glassDist;
	if (topConnection) glassSectionLength0 = glassSectionLength0 + glassOffset + glassDist + glassThickness;

	var glassAngle = Math.atan(3*h1 / glassSectionLength0)
	var glassAmt_1 = Math.round(glassSectionLength0/800);
	var glassLengthX = glassSectionLength0/glassAmt_1;
	var p1 = {x:0, y:0};
	var p2 = {x: glassLengthX , y: glassLengthX * Math.tan(glassAngle)};
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = -platformLengthBottom + glassDist;
	if (bottomConnection) x0 = x0 - glassOffset ;

	y0 = -rackOffsetY - h1;
	
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape_4 (p1, p2, glassAngle, glassDist, glassHeight);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX  * i;
		glass.position.y = y0 + glassLengthX * Math.tan(glassAngle) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint.x = glass.position.x + glassLengthX ;
	basePoint.y = glass.position.y + glassLengthX * Math.tan(handrailAngle);
	basePoint.z = glass.position.z



	}
}// конец самонесущего стекла


/*  ковка */

function drawForgedSection(){}; //пустая функця для навигации

if (railingModel == "Кованые балясины") {

rackPosition = [];
rackNuber = 0;

var angleBottom = 0;
var angleTop = handrailAngle;
var forgedRackProfile = 40;
var forgedRackLength = 900;
var longRackLength = 900;
var shortRackLength = rackOffsetY;

// параметры стоек
var rackParams = {
	len: longRackLength,
	angleTop: bottomEnd == "забег" ? turnAngleBottom : 0, 
	material: railingMaterial,
}
	
if (stairAmt != 0) {
	
/*нижняя площадка*/

	if (bottomEnd == "площадка" || bottomEnd == "забег") {

		var rackPos0 = {
			x: b1/2,
			y: h1 - rackOffsetY,
			z: railingPositionZ
		}
		var rackPos0 = newPoint_xy(rackPos0, -(bottomEnd == "забег" ? h1*2/Math.tan(turnAngleBottom) + 40 : (platformLengthBottom - 40 + b1/2)), - (bottomEnd == "забег" ? h1*2 : h1));

		var rackParams = drawForgedRack3d_4(rackParams);
		var rack = rackParams.mesh;

		rack.position.x = rackPos0.x;
		rack.position.y = rackPos0.y;
		rack.position.z = rackPos0.z;
		railingSection.add(rack);
	}

/*первая стойка марша*/

	var rackPos1 = {
		x: b1/2,
		y: h1 - rackOffsetY,
		z: railingPositionZ
	}
	rackParams.angleTop = handrailAngle;

	var rackParams = drawForgedRack3d_4(rackParams);
	var rack = rackParams.mesh;

	rack.position.x = rackPos1.x;
	rack.position.y = rackPos1.y;
	rack.position.z = rackPos1.z;
	railingSection.add(rack);
	
	/*последняя стойка марша*/
	
	var rackPos3 = {
		x: b1/2 + b1*(stairAmt - 1),
		y: h1*stairAmt - rackOffsetY,
		z: railingPositionZ,
	}
	rackParams.angleTop = topEnd == "забег" ? turnAngleTop : 0;
	if (topEnd == "нет") rackParams.angleTop = handrailAngle;

	var rackParams = drawForgedRack3d_4(rackParams);
	var rack = rackParams.mesh;

	rack.position.x = rackPos3.x;
	rack.position.y = rackPos3.y;
	rack.position.z = rackPos3.z;
	railingSection.add(rack);
	
	/*средние стойки марша*/
	
	rackParams.angleTop = handrailAngle;
	for (i = 0; i < stairAmt; i++) {
		var rackPos2 = {
			x: rackPos1.x + b1*i,
			y: rackPos1.y + h1*i,
			z: railingPositionZ,
		}
		rackParams.len = shortRackLength;
		for (var j = 0; j < rackPositionStep.length; j++) {
			if (i+1 == rackPositionStep[j]) {
				rackParams = drawForgedRack3d_4(rackParams);
				var rack = rackParams.mesh;
				rack.position.x = rackPos2.x;
				rack.position.y = rackPos2.y;
				rack.position.z = rackPos2.z;
				railingSection.add(rack);

				var rackPosArray = [rackPos2.x, rackPos2.y - h1];	// сохраняем координаты средних стоек
				rackPosition.push(rackPosArray);
			}
		}
	}
	
		/*верхняя площадка*/

		if (topEnd == "забег" || topEnd == "площадка") {
			/*последняя стойка забега/площадки*/
			var rackPosTop = newPoint_xy(rackPos3, topEnd == "забег" ? h1/Math.tan(turnAngleTop) : (platformLengthTop - 70 - b1/2 - 10), topEnd == "забег" ? h1 : 0);
			rackParams.angleTop = topEnd == "забег" ? turnAngleTop : 0;
			rackParams.len = longRackLength;

			var railingPlatformLength = rackPosTop.x - rackPos3.x;

			rackParams = drawForgedRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = rackPosTop.x;
			rack.position.y = rackPosTop.y;
			rack.position.z = rackPosTop.z;
			railingSection.add(rack);
		}
	
/*перемычки нижней площадки*/

if (bottomEnd != "нет") {
	// нижняя
	var leftHeight = 20/Math.cos(turnAngleBottom);
	var poleLength = (rackPos1.x - rackPos0.x - (bottomEnd == "забег" ? 40 : 0))/Math.cos(turnAngleBottom);
	var bottomPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPos0.x;
	bottomPole.position.y = rackPos0.y + rackOffsetY;
	bottomPole.position.z = rackPos0.z;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	// верхняя
	if (params.handrailFixType != "паз") {
		var poleLength = (rackPos1.x - rackPos0.x + (bottomEnd == "площадка" ? 40 : -22))/Math.cos(turnAngleBottom);
		var topPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, 1);
		var topPoleGeom = new THREE.ExtrudeGeometry(topPoleShape, forgingExtrudeOptions);
		topPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var topPole = new THREE.Mesh(topPoleGeom, railingMaterial);
		topPole.position.x = rackPos0.x;
		topPole.position.y = rackPos0.y + longRackLength;
		topPole.position.z = rackPos0.z;
		topPole.castShadow = true;
		railingSection.add(topPole);
		// замыкание верхней премычки
		if (bottomConnection && bottomEnd == "забег") {
			poleLength = 30;
			var topConectionPoleShape = draw4angleShape(0, 0, poleLength, leftHeight, 1);
			var topConectionPoleGeom = new THREE.ExtrudeGeometry(topConectionPoleShape, forgingExtrudeOptions);
			topConectionPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var topConectionPole = new THREE.Mesh(topConectionPoleGeom, railingMaterial);
			topConectionPole.position.x = rackPos0.x - poleLength;
			topConectionPole.position.y = rackPos0.y + longRackLength;
			topConectionPole.position.z = rackPos0.z;
			topConectionPole.castShadow = true;
			railingSection.add(topConectionPole);
		}
	}
}

/*нижняя перемычка марша*/

	var leftHeight = 20/Math.cos(handrailAngle);
	var poleLength = b1*stairAmt-b1
	var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPos1.x;
	bottomPole.position.y = rackPos1.y + rackOffsetY;
	bottomPole.position.z = rackPos1.z;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	
	/*верхняя перемычка марша*/
	
if (params.handrailFixType != "паз") {
	var leftHeight = 20/Math.cos(handrailAngle);
	var poleLength = b1*stairAmt-b1 + ((((railingSide == "right" && turnFactor > 0) || (railingSide == "left" && turnFactor < 0)) && !lastMarsh) ? 40 : 0);
	var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPos1.x;
	bottomPole.position.y = rackPos1.y + 900;
	bottomPole.position.z = rackPos1.z;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
}

/*перемычки верхней площадки*/

if (topEnd != "нет") {
	// нижняя
	var leftHeight = 20/Math.cos(turnAngleTop);
	var poleLength = (rackPosTop.x - rackPos3.x)/Math.cos(turnAngleTop);
	var bottomPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPos3.x;
	bottomPole.position.y = rackPos3.y + rackOffsetY;
	bottomPole.position.z = rackPos3.z;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	// верхняя
	if (params.handrailFixType != "паз") {
		var poleLength = (rackPosTop.x - rackPos3.x + (topEnd == "площадка" ? 40 : -22))/Math.cos(turnAngleTop);
		var topPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, 1);
		var topPoleGeom = new THREE.ExtrudeGeometry(topPoleShape, forgingExtrudeOptions);
		topPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var topPole = new THREE.Mesh(topPoleGeom, railingMaterial);
		topPole.position.x = rackPos3.x;
		topPole.position.y = rackPos3.y + longRackLength;
		topPole.position.z = rackPos3.z;
		topPole.castShadow = true;
		railingSection.add(topPole);
		// замыкание верхней премычки
		if (topConnection && topEnd == "забег") {
			poleLength = 40 + 30 + 40;
			var topConectionPoleShape = draw4angleShape(0, 0, poleLength, leftHeight, 1);
			var topConectionPoleGeom = new THREE.ExtrudeGeometry(topConectionPoleShape, forgingExtrudeOptions);
			topConectionPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var topConectionPole = new THREE.Mesh(topConectionPoleGeom, railingMaterial);
			topConectionPole.position.x = rackPosTop.x;
			topConectionPole.position.y = rackPosTop.y + longRackLength;
			topConectionPole.position.z = rackPosTop.z;
			topConectionPole.castShadow = true;
			railingSection.add(topConectionPole);
		}
	}
}


/*балясины нижней площадки*/ 

if (bottomEnd != "нет") {
	var p0t = [rackPos0.x, rackPos0.y, rackPos0.z];
	p0t = newPoint_x(p0t, 40, -turnAngleBottom);
	var p1t = [rackPos1.x, rackPos1.y];
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleBottom;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2 + rackOffsetY

	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawForgedBanister (balType, insertPoint, 1, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}
	
/*балясины марша*/
	var p0 = [rackPos1.x, rackPos1.y, rackPos1.z];
	var p1 = [rackPos3.x, rackPos3.y, rackPos3.z];
	var balAmt = Math.round((p1[0] - p0[0])/(balDist[0]))
	balDist[1] = (p1[0] - p0[0])/(balAmt + 1);
	var angle_1 = handrailAngle;
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2 + rackOffsetY
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawForgedBanister (balType, insertPoint, 1, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
	}

/*балясины верхей площадки*/	

if (topEnd != "нет") {
	var p0t = p1;
	p0t = newPoint_x(p0t, 40, 0);
	var p1t = [rackPosTop.x, rackPosTop.y - h1];
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleTop;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2 + rackOffsetY
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawForgedBanister (balType, insertPoint, 1, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	

/* верхние перемычки и кронштейны для поручня с зазором */

if (handrail != "нет" && params.handrailFixType != "паз") {
	// поручень
	var pins2 = new THREE.Object3D();
	var handrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.timberPaint_perila,
	}
	
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js

	var handrailProfileY = handrailPar.profY;
	var handrailProfileZ = handrailPar.profZ;
	var handrailModel = handrailPar.handrailModel;
	var handrailMaterial = railingMaterial;
	if (handrailPar.mat == "timber") handrailMaterial = timberMaterial;
	
	// параметры штырей
	var pinRadius = 5;
	var pinHeight = 50;
	var segmentsX = 20;
	var segmentsY = 0;
	var openEnded = false;
	
		
	/* Штыри нижней площадки */
		
	if (bottomEnd != "нет")	{
		var pins1 = new THREE.Object3D();

		var handrailBracketsLength = (rackPos1.x - rackPos0.x + (bottomEnd == "площадка" ? 40 : -22))/Math.cos(turnAngleBottom);

		// первый штырь
		var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
		var pin = new THREE.Mesh(pinGeometry, railingMaterial);
		pin.position.x = 0;
		pin.position.y = pinHeight*0.5;
		pin.position.z = 0;
		
		pin.castShadow = true;
		pins1.add(pin);
		
		// последний штырь
		var pin1 = new THREE.Mesh(pinGeometry, railingMaterial);
		pin1.position.x = handrailBracketsLength - 70*(bottomEnd == "площадка" ? 3 : 2);
		pin1.position.y = pinHeight*0.5;
		pin1.position.z = 0;

		pin1.castShadow = true;
		pins1.add(pin1);
		
		// средние штыри
		if (pin1.position.x - pin.position.x >= 800) {
			var pinAmt = Math.ceil((pin1.position.x - pin.position.x)/800);
			var pinDist = (pin1.position.x - pin.position.x)/pinAmt;
			for (i=1; i<pinAmt; i++) {
				var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
				var pinN = new THREE.Mesh(pinGeometry, railingMaterial);
				pinN.position.x = i*pinDist;
				pinN.position.y = pinHeight*0.5;
				pinN.position.z = 0;
				pinN.castShadow = true;
				pins1.add(pinN);
			}
		}
		
		// позиционирование  штырей
		pins1.position.x = rackPos0.x + 70;
		pins1.position.y = rackPos0.y + longRackLength + 20;
		pins1.position.z = handrailProfileZ * 0.5 * turnFactor;
		if (bottomEnd == "забег") pins1.position.y = rackPos0.y + longRackLength + 70*Math.tan(turnAngleBottom) + 20/Math.cos(turnAngleBottom);
		pins1.rotation.z = bottomEnd == "площадка" ? 0 : turnAngleBottom;
		
		railingSection.add(pins1);
	}
	
	/* Штыри на марше */
	
	// первый штырь
	var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
	var pin = new THREE.Mesh(pinGeometry, railingMaterial);
	pin.position.x = 0;
	pin.position.y = pinHeight * 0.5;
	pin.position.z = 0;
	pin.castShadow = true;
	pins2.add(pin);
	
	// последний штырь
	var pin1 = new THREE.Mesh(pinGeometry, railingMaterial);
	//pin1.position.x = (b1 * (stairAmt-1) - balDist[1])/Math.cos(handrailAngle);
	pin1.position.x = (b1 * (stairAmt-1) - balDist[1])/Math.cos(handrailAngle) - 70;
	pin1.position.y = pinHeight*0.5;
	pin1.position.z = 0;
	pin1.castShadow = true;
	pins2.add(pin1);

	// средние штыри
	if (pin1.position.x - pin.position.x >= 800) {
		var pinAmt = Math.ceil((pin1.position.x - pin.position.x)/800);
		var pinDist = (pin1.position.x - pin.position.x)/pinAmt;
		for (i=1; i<pinAmt; i++) {
			var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
			var pinN = new THREE.Mesh(pinGeometry, railingMaterial);
			pinN.position.x = i*pinDist;
			pinN.position.y = pinHeight*0.5;
			pinN.position.z = 0;
			pinN.castShadow = true;
			pins2.add(pinN);
		}
	}
	
	// позиционирование штырей
	pins2.position.x = rackPos1.x + 70;
	pins2.position.y = rackPos1.y + longRackLength + 20/Math.cos(handrailAngle) + 70*Math.tan(handrailAngle);
	pins2.position.z = handrailProfileZ * 0.5 * turnFactor;
	pins2.rotation.z = handrailAngle;
	
	railingSection.add(pins2);
	
	/* Штыри верхей площадки */
	
	if (topEnd != "нет") {
		var pins3 = new THREE.Object3D();
		
		handrailLength = topEnd == "площадка" ? (rackPosTop.x - rackPos3.x) : (platformLengthTop - b1/2 - 60)/Math.cos(turnAngleTop);
		
		// первый штырь
		var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
		var pin = new THREE.Mesh(pinGeometry, railingMaterial);

		pin.position.x = 0;
		pin.position.y = pinHeight*0.5;
		pin.position.z = 0;
		pin.castShadow = true;
		pins3.add(pin);
		
		// второй штырь
		var pin1 = new THREE.Mesh(pinGeometry, railingMaterial);
		pin1.position.x = handrailLength - 70*2;
		pin1.position.y = pinHeight*0.5;
		pin1.position.z = 0;

		pin1.castShadow = true;
		pins3.add(pin1);
		
		// средние штыри
		if (pin1.position.x - pin.position.x >= 800) {
			var pinAmt = Math.ceil((pin1.position.x - pin.position.x)/800);
			var pinDist = (pin1.position.x - pin.position.x)/pinAmt;
			for (i=1; i<pinAmt; i++) {
				var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
				var pinN = new THREE.Mesh(pinGeometry, railingMaterial);
				pinN.position.x = i*pinDist;
				pinN.position.y = pinHeight*0.5;
				pinN.position.z = 0;
				pinN.castShadow = true;
				pins3.add(pinN);
			}
		}
		
		// позиционирование штырей
		pins3.position.x = rackPos3.x + 70;
		pins3.position.y = rackPos3.y + longRackLength + 20;
		pins3.position.z = handrailProfileZ * 0.5 * turnFactor;
		if (topEnd == "забег") pins3.position.y = rackPos3.y + longRackLength + 20/Math.cos(turnAngleTop) + 70*Math.tan(turnAngleTop);
		
		pins3.rotation.z = topEnd == "площадка" ? 0 : turnAngleTop;
		
		railingSection.add(pins3);
	}
}
}

if(stairAmt == 0) {
var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength)
	/*первая стойка*/
	var x0 = (50 - platformLengthBottom) ;
	var y0 = - rackOffsetY - h1;
	var z0 = railingPositionZ;
	var basePoint = [x0, y0, z0];
		drawForgedRack3d(basePoint, longRackLength, sectionAngle, railingMaterial, 1, railingSection)
		
var rackPos1 = {
	x: (50 - platformLengthBottom),
	y: - rackOffsetY - h1,
	z: railingPositionZ
}
rackParams.angleTop = sectionAngle;

var rackParams = drawForgedRack3d_4(rackParams);
var rack = rackParams.mesh;

rack.position.x = rackPos1.x;
rack.position.y = rackPos1.y;
rack.position.z = rackPos1.z;
railingSection.add(rack);

var rackPosition0 = copyPoint(rackPos1); //сохраняем координаты стойки площадки

/*средние стойки*/

	var middleRackAmt = Math.round(sectionLength/800);
	rackParams.len = shortRackLength;
		if (middleRackAmt < 0) middleRackAmt = 0;
		var rackPos2 = copyPoint(rackPos1);
		var rackDist = sectionLength/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt; i++) {
			rackPos2 = newPoint_x(rackPos2, rackDist, -sectionAngle);
			rackParams = drawForgedRack3d_4(rackParams);
			var rack = rackParams.mesh;
			rack.position.x = rackPos2.x;
			rack.position.y = rackPos2.y;
			rack.position.z = rackPos2.z;
			railingSection.add(rack);
		}
		
/*последняя стойка*/
	rackParams.len = longRackLength;
	rackPos3 = newPoint_x(rackPos2, rackDist, -sectionAngle);
	rackParams = drawForgedRack3d_4(rackParams);
	var rack = rackParams.mesh;
	rack.position.x = rackPos3.x;
	rack.position.y = rackPos3.y;
	rack.position.z = rackPos3.z;
	railingSection.add(rack);
	
/*нижняя перемычка*/
	var leftHeight = 20/Math.cos(sectionAngle);
	var poleLength = sectionLength;
	var bottomPoleShape = draw4angleShape (sectionAngle, sectionAngle, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPos1.x;
	bottomPole.position.y = rackPos1.y + rackOffsetY;
	bottomPole.position.z = rackPos1.z;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
/*верхняя перемычка*/
if (params.handrailFixType != "паз") {
	if (!topConnection) poleLength += 40;
	var topPoleShape = draw4angleShape (sectionAngle, sectionAngle, poleLength, leftHeight, 1)
	var topPoleGeom = new THREE.ExtrudeGeometry(topPoleShape, forgingExtrudeOptions);
	topPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var topPole = new THREE.Mesh(topPoleGeom, railingMaterial);
	topPole.position.x = rackPos1.x;
	topPole.position.y = rackPos1.y + 900;
	topPole.position.z = rackPos1.z;
	topPole.castShadow = true;
	railingSection.add(topPole);
	// замыкание нижней премычки
		if (bottomConnection) {
			poleLength = 30 + 20;
			var topConectionPoleShape = draw4angleShape(0, 0, poleLength, leftHeight, 1);
			var topConectionPoleGeom = new THREE.ExtrudeGeometry(topConectionPoleShape, forgingExtrudeOptions);
			topConectionPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var topConectionPole = new THREE.Mesh(topConectionPoleGeom, railingMaterial);
			topConectionPole.position.x = rackPos1.x - poleLength;
			topConectionPole.position.y = rackPos1.y + longRackLength;
			topConectionPole.position.z = rackPos1.z;
			topConectionPole.castShadow = true;
			railingSection.add(topConectionPole);
		}
	// замыкание верхней премычки
		if (topConnection) {
			poleLength = 40 + 30 + 40 + 20;
			var topConectionPoleShape = draw4angleShape(0, 0, poleLength, leftHeight, 1);
			var topConectionPoleGeom = new THREE.ExtrudeGeometry(topConectionPoleShape, forgingExtrudeOptions);
			topConectionPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var topConectionPole = new THREE.Mesh(topConectionPoleGeom, railingMaterial);
			topConectionPole.position.x = rackPos3.x;
			topConectionPole.position.y = rackPos3.y + longRackLength;
			topConectionPole.position.z = rackPos3.z;
			topConectionPole.castShadow = true;
			railingSection.add(topConectionPole);
		}
}

/*балясины*/

	var balAmt = Math.round((sectionLength-40)/balDist[0])
	balDist[1] = (sectionLength-40)/(balAmt + 1);
	var angle_1 = sectionAngle;
	//p0 = newPoint_x(rackPosition0, 40, -angle_1);
	//p0[1] = p0[1] - 5;
	//p0[2] = z0 + 14;
	var p0 = [rackPos1.x, rackPos1.y, rackPos1.z];
	p0 = newPoint_x(p0, 40, -angle_1);
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2 + rackOffsetY
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawForgedBanister (balType, insertPoint, 1, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
		}
	
/* кронштейны для поручня с зазором */

if (handrail != "нет" && params.handrailFixType != "паз") {
	/* Штыри на марше */

	var handrailProfileY = 20;
	var handrailProfileZ = 40;
	
	// параметры штырей
	var pinRadius = 5;
	var pinHeight = 50;
	var segmentsX = 20;
	var segmentsY = 0;
	var openEnded = false;
	
	var pins = new THREE.Object3D();
	// первый штырь
	var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
	var pin = new THREE.Mesh(pinGeometry, railingMaterial);
	pin.position.x = 0;
	pin.position.y = pinHeight * 0.5;
	pin.position.z = 0;
	pin.castShadow = true;
	pins.add(pin);
	console.log(pin);
	// последний штырь
	var pin1 = new THREE.Mesh(pinGeometry, railingMaterial);
	pin1.position.x = sectionLength/Math.cos(sectionAngle) - 70 - 20;
	pin1.position.y = pinHeight*0.5;
	pin1.position.z = 0;
	pin1.castShadow = true;
	pins.add(pin1);

	// средние штыри
	if (pin1.position.x - pin.position.x >= 800) {
		var pinAmt = Math.ceil((pin1.position.x - pin.position.x)/800);
		var pinDist = (pin1.position.x - pin.position.x)/pinAmt;
		for (i=1; i<pinAmt; i++) {
			var pinGeometry = new THREE.CylinderGeometry(pinRadius, pinRadius, pinHeight, segmentsX, segmentsY, openEnded);
			var pinN = new THREE.Mesh(pinGeometry, railingMaterial);
			pinN.position.x = i*pinDist;
			pinN.position.y = pinHeight*0.5;
			pinN.position.z = 0;
			pinN.castShadow = true;
			pins.add(pinN);
		}
	}
	
	// позиционирование штырей
	pins.position.x = rackPos1.x + 70;
	pins.position.y = rackPos1.y + longRackLength + 20/Math.cos(sectionAngle) + 70*Math.tan(sectionAngle);
	pins.position.z = handrailProfileZ * 0.5 * turnFactor;
	pins.rotation.z = sectionAngle;
	
	railingSection.add(pins);
}
}
	

}//конец кованых ограждений


/* Поручень */

function drawHandrail(){}; //пустая функця для навигации

if(handrail !="нет") {
	
var handrailPar = {
	prof: params.handrailProf,
	sideSlots: params.handrailSlots,
	handrailType: params.handrail,
	metalPaint: params.metalPaint_perila,
	timberPaint: params.timberPaint_perila,
	}
handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js

var handrailProfileY = handrailPar.profY;
var handrailProfileZ = handrailPar.profZ;
var handrailModel = handrailPar.handrailModel;
var handrailMaterial = railingMaterial;
if(handrailPar.mat == "timber") handrailMaterial = timberMaterial;

		handrailPar.handrailModel
//параметры поручня
var poleParams = {
		//type: "rect",
		type: handrailPar.handrailModel,
		poleProfileY: handrailProfileY,
		poleProfileZ: handrailProfileZ,		
		length: 1000,
		poleAngle: Math.PI / 6,
		material: handrailMaterial,
		dxfBasePoint: {x:0, y:0},
		dxfArr: dxfPrimitivesArr,
	}

if (railingModel != "Самонесущее стекло") {
if (stairAmt != 0) {
	/*поручень нижней площадки*/

	if (bottomEnd == "площадка" || bottomEnd == "забег") {
		var handrailAngleBottom = bottomEnd == "забег" ? Math.atan((rackPos0.y - rackPos1.y)/(rackPos0.x - rackPos1.x)) : 0;
		var handrailBottomLength = bottomEnd == "забег" ? (platformLengthBottom - 70 + b1/2)/Math.cos(handrailAngleBottom) : (platformLengthBottom - 70 + (railingModel == "Кованые балясины" ? b1/2 : 0));
	if (bottomEnd == "площадка") handrailBottomLength += 50;
		poleParams.length = handrailBottomLength;
		poleParams.poleAngle = handrailAngleBottom;

		var polePos = newPoint_xy(rackPos0, bottomEnd == "площадка" ? -50 : 0, 810);
		if (railingModel == "Кованые балясины") polePos.y += 90 + (params.handrailFixType == "кронштейны" ? (20 + pinHeight)/(bottomEnd == "забег" ? Math.cos(handrailAngleBottom) : 1) : 0);

		poleParams = drawPole3D_4(poleParams);
		var pole = poleParams.mesh;
		pole.position.x = polePos.x;
		pole.position.y = polePos.y;
		pole.position.z = polePos.z;
		railingSection.add(pole);

		if (bottomEnd == "забег" && bottomConnection) {
			poleParams.length = 70;
			poleParams.poleAngle = 0;
			polePos.x -= poleParams.length;
			
			poleParams = drawPole3D_4(poleParams);
			var pole = poleParams.mesh;
			pole.position.x = polePos.x;
			pole.position.y = polePos.y;
			pole.position.z = polePos.z;
			railingSection.add(pole);
		}
	}
	
	/* поручень марша */
	
	var stepLength = h1/Math.sin(handrailAngle);
	var handrailLength = stepLength * stairAmt - 1/3*stepLength;
	//if (lastMarsh) handrailLength += params.topHandrailExtraLength;
	if (topEnd == "забег" || topEnd == "площадка") handrailLength = (rackPos3.x - rackPos1.x + (bottomEnd != "забег" ? 50 : 0))/Math.cos(handrailAngle);

	poleParams.length = handrailLength;
	poleParams.poleAngle = handrailAngle;
		
	var polePos = newPoint_xy(rackPos1, 0, 810);
	if (railingModel == "Кованые балясины") polePos.y += 90 + (params.handrailFixType == "кронштейны" ? (20 + pinHeight)/(bottomEnd == "забег" ? Math.cos(handrailAngle) : 1) : 0);

	//смещаем поручень
	if (bottomEnd == "нет" || bottomEnd == "площадка") polePos = newPoint_x1(polePos, -50, poleParams.poleAngle);
	
	poleParams = drawPole3D_4(poleParams);
	var pole = poleParams.mesh;
	pole.position.x = polePos.x;
	pole.position.y = polePos.y;
	pole.position.z = polePos.z;
	railingSection.add(pole);
	
	/*поручень верхней площадки*/

	if (topEnd == "площадка" || topEnd == "забег") {
		var handrailAngleTop = topEnd == "забег" ? Math.atan((rackPosTop.y - rackPos3.y)/(rackPosTop.x - rackPos3.x)) : 0;
		var handrailTopLength = topEnd == "забег" ? (platformLengthTop - 70 - b1/2)/Math.cos(handrailAngleTop) : (platformLengthTop - 70 - b1/2);
		if (topEnd == "площадка") handrailTopLength += 50;

		poleParams.length = handrailTopLength;
		poleParams.poleAngle = handrailAngleTop;

		var polePos = newPoint_xy(rackPos3, 0, 810);
		if (railingModel == "Кованые балясины") polePos.y += 90 + (params.handrailFixType == "кронштейны" ? (20 + pinHeight)/(bottomEnd == "забег" ? Math.cos(handrailAngleTop) : 1) : 0);

		poleParams = drawPole3D_4(poleParams);
		var pole = poleParams.mesh;
		pole.position.x = polePos.x;
		pole.position.y = polePos.y;
		pole.position.z = polePos.z;
		railingSection.add(pole);
		
		if (topEnd == "забег" && topConnection) {
			polePos = newPoint_x1(polePos, rackPosTop.x - rackPos3.x, poleParams.poleAngle);
			poleParams.length = 70 + handrailProfileZ;
			poleParams.poleAngle = 0;

			poleParams = drawPole3D_4(poleParams);
			var pole = poleParams.mesh;
			pole.position.x = polePos.x;
			pole.position.y = polePos.y;
			pole.position.z = polePos.z;
			railingSection.add(pole);
		}
	}
}
if(stairAmt == 0) {
	var handrailLength = sectionLength / Math.cos(sectionAngle);
	if (!bottomConnection) handrailLength = handrailLength + 70 / Math.cos(sectionAngle);
	if (!topConnection) handrailLength = handrailLength + 70 / Math.cos(sectionAngle);	
	x0 = rackPosition0[0];
	y0 = -h1 - rackOffsetY + rackLength;
	z0 = railingPositionZ + 20 - handrailProfileZ/2;
	basePoint = [x0, y0, z0];
	if (!bottomConnection) basePoint = newPoint_x(basePoint, -70, - sectionAngle);

	poleParams.length = handrailLength + 100;
	poleParams.poleAngle = sectionAngle;
		
	var polePos = newPoint_xy(rackPosition0, 0, 810);
	if (railingModel == "Кованые балясины") polePos.y += 90 + (params.handrailFixType == "кронштейны" ? (20 + pinHeight)/Math.cos(sectionAngle) : 0);

	//смещаем поручень
	polePos = newPoint_x1(polePos, -50, poleParams.poleAngle);
	
	poleParams = drawPole3D_4(poleParams);
	var pole = poleParams.mesh;
	pole.position.x = polePos.x;
	pole.position.y = polePos.y;
	pole.position.z = polePos.z;
	railingSection.add(pole);

/*

	if (topConnection) {
		var basePoint1 = newPoint_x(basePoint, handrailLength * Math.cos(sectionAngle), -sectionAngle);
		var handrailLength1 = 70 + (handrailProfileZ + 40)/2;
		if (railingModel == "Кованые балясины") handrailLength1 += 20;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, handrailLength1, 0, handrailMaterial, 1, railingSection);
		}
	if (bottomConnection) {
		basePoint = newPoint_x(basePoint, -70, 0);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, 70, 0, handrailMaterial, 1, railingSection);
		}*/
}
}
if (railingModel == "Самонесущее стекло") {


z0 = z0 - (-6 + handrailProfileZ/2) 

	var handrailExtrudeOptions = {
		amount: handrailProfileZ,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

if(stairAmt != 0) {			
/* поручень нижней площадки*/

if (bottomEnd != "нет"){
	var leftHeight = handrailProfileY/Math.cos(turnAngleBottom);
	var poleLength = glassSectionLength1;
	var deltaY = handrailProfileY / Math.cos(handrailAngle) -  handrailProfileY / Math.cos(turnAngleBottom)
	x0 = 0 - glassSectionLength1;
	y0 = (glassHeight - rackOffsetY-20 + deltaY) - glassSectionLength1 * Math.tan(turnAngleBottom);
	var bottomPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = x0;
	bottomPole.position.y = y0;
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}

/* поручень марша*/

	var leftHeight = handrailProfileY/Math.cos(handrailAngle);
	var poleLength = glassSectionLength2
	var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = 0;
	bottomPole.position.y = (glassHeight - rackOffsetY - 20)
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	
	basePoint.x = bottomPole.position.x + glassSectionLength2 ;
	basePoint.y = bottomPole.position.y + glassSectionLength2 * Math.tan(handrailAngle);

/*поручень верхней площадки*/

if (topEnd != "нет"){
	var leftHeight = handrailProfileY/Math.cos(turnAngleTop);
	var poleLength = glassSectionLength3
	var deltaY = handrailProfileY / Math.cos(handrailAngle) -  handrailProfileY / Math.cos(turnAngleTop)
	var bottomPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = basePoint.x
	bottomPole.position.y = basePoint.y + deltaY
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}


}
if(stairAmt == 0) {	
	var leftHeight = handrailProfileY/Math.cos(glassAngle);
	var poleLength = glassSectionLength0;
	x0 = -platformLengthBottom + glassDist;
	if (bottomConnection) x0 = x0 - glassOffset ;
	y0 = (glassHeight - rackOffsetY - h1)
	var bottomPoleShape = draw4angleShape (glassAngle, glassAngle, poleLength, leftHeight, 1)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = x0;
	bottomPole.position.y = y0;
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}
}
	
	}; //конец поручня
	
	return (railingSection)

} //end of drawRailingSection();




/*стойка 40х40 с кронштейном поручня*/

function drawRack3d_4(par) {
	/*
	par.len
	par.material
	par.pinSide
	par.stringerSideOffset
	базовая точка - ось верхнего отверстия
	*/
	
    var len = par.len;
    var profSize = 40;
    par.holderLength = 70;
	par.mesh = new THREE.Object3D();

    //тело стойки
	var p0 = {x: 0, y: 0}
	var p1 = newPoint_xy(p0, -profSize/2, -90);
	var p2 = newPoint_xy(p1, 0, len - par.holderLength)
	var p3 = newPoint_xy(p2, profSize, 0)
	var p4 = newPoint_xy(p1, profSize, 0)

	var shape = new THREE.Shape();

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);
	
	//отверстия
	if(par.showHoles){
		var rad = 6.5;
		//верхнее отверстие
		var center = {x:0, y:0}		
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);
		var center = {x:0, y:-60}		
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);
		 
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
		par.mesh.add(rack);
	

	//подпись
	if(par.text){
		var textHeight = 17;
		var textBasePoint = newPoint_xy(par.dxfBasePoint, 20, -150);
		addText(par.text, textHeight,  par.dxfArr, textBasePoint);
		}
		

	
	
	//кронштейн поручня
    var holderRad = 6;
    var segmentsX = 20;
    var segmentsY = 0;
    var openEnded = false;


    var geom = new THREE.CylinderGeometry(holderRad, holderRad, par.holderLength, segmentsX, segmentsY, openEnded);
    var handrailHolder = new THREE.Mesh(geom, par.material);
    handrailHolder.position.y = (len - par.holderLength / 2) - 90;
    handrailHolder.position.z = profSize / 2;
	
    par.mesh.add(handrailHolder);
	

    //штырьки для отверстий
	if(par.showPins){
		var pinMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, wireframe: false });
		var pinRad = 6;
		var pinLength = 20;
		if(par.stringerSideOffset) pinLength += par.stringerSideOffset;

		var geom = new THREE.CylinderGeometry(pinRad, pinRad, pinLength, 8, 4, false);
		geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
		
		//верхний штырек
		var pin = new THREE.Mesh(geom, pinMaterial);
			pin.position.y = 0;
			pin.position.z = -pinLength / 2;
			if(par.railingSide == "left") pin.position.z = pinLength/2 + profSize;
		par.mesh.add(pin);
		
		//нижний штырек
		var pin = new THREE.Mesh(geom, pinMaterial);
			pin.position.y = -60;
			pin.position.z = -pinLength / 2;
			if(par.railingSide == "left") pin.position.z = pinLength/2 + profSize;
		par.mesh.add(pin);
		}
	
	return par;
}//end of drawRack3d_4

function drawPole3D_4(par) {
	
	/*
	var pole3DParams = {
		type: "rect",
		poleProfileY: 40,
		poleProfileZ: 60,
		dxfBasePoint: railingSectionParams.dxfBasePointHandrail,
		length: 1000,
		poleAngle: 0,
		material: railingMaterial,
		dxfArr: dxfPrimitivesArr,
		}
		*/

	par.mesh = new THREE.Object3D();
	
    var pole3DExtrudeOptions = {
        amount: par.poleProfileZ,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};

    var p0 = { x: 0, y: 0 };
    var p1 = newPoint_xy(p0, 0, par.poleProfileY);
    var p2 = newPoint_xy(p1, par.length, 0);
    var p3 = newPoint_xy(p2, 0, -par.poleProfileY);
	
	var shape = new THREE.Shape();
	addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);

    /*прямоугольная палка*/
    if (par.type != "round") {
        var poleGeometry = new THREE.ExtrudeGeometry(shape, pole3DExtrudeOptions);
        poleGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var pole = new THREE.Mesh(poleGeometry, par.material);
        pole.rotation.z = par.poleAngle;
		}
    /*круглая палка*/
    if (par.type == "round") {
        var poleRadius = par.poleProfileY / 2;
        var radiusTop = poleRadius;
        var radiusBottom = poleRadius;
        var height = par.length;
        var segmentsX = 20;
        var segmentsY = 0;
        var openEnded = false;
        var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
        var pole = new THREE.Mesh(poleGeometry, par.material);
        pole.rotation.z = par.poleAngle - Math.PI / 2;
		pole.position.x = (par.length / 2 * Math.cos(par.poleAngle) - par.poleProfileY / 2 * Math.sin(par.poleAngle));
		pole.position.y = (par.length / 2 * Math.sin(par.poleAngle) + par.poleProfileY / 2 * Math.cos(par.poleAngle));
        pole.position.z = poleRadius;
		}
	
	//добавляем подпись в dxf файл
	if(par.text){		
		var textHeight = 30;
		var textBasePoint = newPoint_xy(par.dxfBasePoint, 40, -200);
		addText(par.text, textHeight, par.dxfArr, textBasePoint);
		}

	par.mesh.add(pole);
	
    return par;
} //end of drawPole3D_4

/*стойка кованой сеции*/

function drawForgedRack3d_4(par) {
	/*
	par={
		len: 0,
		angleTop: 0, 
		material: metalMaterial,
		}
	*/
	var angleBottom = 0;
	var angleTop = par.angleTop;
	var profSize = 40;
	var forgingExtrudeOptions = {
			amount: profSize,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
			};

	var rackShape = draw4angleShape (angleBottom, angleTop, profSize, par.len, 1)
	var geom = new THREE.ExtrudeGeometry(rackShape, forgingExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	var forgedRack = new THREE.Mesh(geom, par.material);
	
	par.mesh = forgedRack;
	
	return par;
} //end of drawForgedRack3d_4

/*стекло в форме параллелограмма*/

function drawGlassShape_4(p1, p2, angle, glassDist, glassHeight) {
var glassHeight1 = glassHeight;
var glassHeight2 = glassHeight1 + (p2.y-p1.y) - glassDist * Math.tan(angle);
var glassWidth = p2.x - p1.x - glassDist;

var glassShape = new THREE.Shape();
	glassShape.moveTo(0, 0);
	var x = 0;
	var y = glassHeight1;
	glassShape.lineTo(x, y);
	x = glassWidth;
	y = glassHeight2;
	glassShape.lineTo(x, y);
	x = glassWidth;
	y = glassHeight2-glassHeight1;
	glassShape.lineTo(x, y);
	glassShape.lineTo(0, 0);
	
	return glassShape;
}