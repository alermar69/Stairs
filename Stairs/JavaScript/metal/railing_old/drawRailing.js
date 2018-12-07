/***  Секции маршей   ***/


function drawRailingSection(
			bottomEnd, platformLengthBottom, topEnd, platformLengthTop, 
			railingSide, stairAmt, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection) {
//console.log(bottomEnd, platformLengthBottom, topEnd, platformLengthTop, 
			//railingSide, stairAmt, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection)
if (turnFactor == -1) {
	var railingSideTemp = railingSide;
    if (railingSideTemp == "left") railingSide = "right";
    if (railingSideTemp == "right") railingSide = "left";
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
		amount: glassThickness*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var forgingExtrudeOptions = {
		amount: 40*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

	var turnAngleTop = 0;
	if (topEnd == "забег") {
		var deltaXtopPlatform = platformLengthTop - b1/2 - 70;
		var deltaYtopPlatform = h2;
		turnAngleTop = Math.atan( deltaYtopPlatform/deltaXtopPlatform);
	}	
	var turnAngleBottom = 0;
	if (bottomEnd == "забег") {
		var deltaXbottomPlatform = platformLengthBottom + b1/2 - 70;
		var deltaYbottomPlatform = 2*h1;
		turnAngleBottom = Math.atan( deltaYbottomPlatform/deltaXbottomPlatform);
	}

		
/* —“ќ… » */


if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {

rackPosition = [];
rackNuber = 0;

if(stairAmt != 0) {

/*нижняя площадка*/
if (bottomEnd == "площадка") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
}
if (bottomEnd == "забег") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
}
var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки
 
rackPosition = [];
rackNuber = 0;

/*ограждения марша*/

	/*первая стойка марша*/
	var x0 = b1/2 * scale;
	var y0 = h1*scale - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
    var rackPosition1 = rackPosition[0]; //сохраняем координаты стойки марша
	
	x=x0;
	y=y0;
	/*средние стойки марша*/
	for (i = 0; i < stairAmt; i++) {
		x = x0 + b1*i*scale;
		y = y0 + h1*i*scale;
		basePoint = [x, y, z0];
		for (var j = 0; j < rackPositionStep.length; j++)
			if (i+1 == rackPositionStep[j]) 
				rack = drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
	}
	/*последняя стойка марша*/
	basePoint = [x, y, z0];
	if (topEnd == "нет" || topEnd == "забег")
				rack = drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
	if (topEnd == "площадка") {
		basePoint[0] += 50*scale;
		rack = drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
		
		/*средние стойки площадки*/
		var middleRackAmt = Math.round(platformLengthTop/800)-1;
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = (platformLengthTop-70 - 100 - 40)/(middleRackAmt + 1);
	    for (i = 0; i < middleRackAmt; i++) {
			p0 = newPoint_x(p0, rackDist*scale, 0);
			drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection);
	    }
		
		/*последняя стойка площадки*/
		p0 = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
		drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection);
	}
	if (topEnd == "забег") {
		/*последняя стойка площадки*/
		p0 = newPoint_x(basePoint, (platformLengthTop - 70 - b1/2)*scale, 0);
		p0[1] = p0[1] + h2*scale; 
		drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection);
	}


	if (topEnd == "забег") {
		var rackPosition2 =  rackPosition[rackPosition.length-2];
		var rackPosition3 =  rackPosition[rackPosition.length-1];
		//var turnAngleTop = Math.atan( (rackPosition3[1] - rackPosition2[1])/(rackPosition3[0] - rackPosition2[0]))
		}	

	}
if(stairAmt == 0) {
var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength);
    /*первая стойка*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
    var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки

/*остальные стойки*/
	var middleRackAmt = Math.round(sectionLength/800);
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = sectionLength/(middleRackAmt + 1);
    for (i = 0; i < middleRackAmt+1; i++) {
			p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
			drawRack3d(p0, rackLength, sectionAngle, railingMaterial, scale, railingSection);
    }	
	}
}


/* ригели */


if (railingModel == "Ригели") {
 
	//var rigelMaterial = railingMaterial;
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

	if (railingSide == "left") z0 = (railingPositionZ + 40)*scale*turnFactor;
	if (railingSide == "right") z0 = (railingPositionZ - rigelProfileZ)*scale; //*turnFactor;

if(stairAmt != 0) {	
/*нижняя площадка*/
if (bottomEnd == "площадка") {

	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = 0; //- rackOffsetY*scale;
	var rigelLength = platformLengthBottom + b1/2; 	
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = h1*scale + rigelDist*i*scale - rackOffsetY*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -handrailAngle);
	    drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
	}
}

if (bottomEnd == "забег") {
	var turnAngleBottom = Math.atan( (rackPosition1[1] - rackPosition0[1])/(rackPosition1[0] - rackPosition0[0]));
    var x0 = (70 - platformLengthBottom) * scale;
	var y0 = 0; //- rackOffsetY*scale;
	var rigelLength = (platformLengthBottom + b1/2)/Math.cos(turnAngleBottom); 	
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = rigelDist*i*scale - rackOffsetY*scale - 60*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -handrailAngle);
	    drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, turnAngleBottom, railingMaterial, scale, railingSection);
	}


}

/*ригели на марше*/
	var stepLength = h1/Math.sin(handrailAngle);
	var rigelLength = stepLength * (stairAmt - 1) + 100; 	
	x0 = b1/2 * scale;
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = h1*scale + rigelDist*i*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -handrailAngle);
	    var basePoint_obj = {};
	basePoint_obj.x = basePoint[0];
	basePoint_obj.y = basePoint[1];
	basePoint_obj.z = basePoint[2];
	
	//console.log(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, handrailAngle)
	drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, handrailAngle, railingMaterial, scale, railingSection);
	}

	if (topEnd == "площадка") {
		basePoint = [x, y, z0];
		var p1t = basePoint; //сохраняем точку
		basePoint[0] += 50*scale;
		y0 = basePoint[1];		
		rigelLength = platformLengthTop - 70 - b1/2;
	    for (var i=1; i < rigelAmt+1; i++) {
			basePoint[1] = y0 + h1*scale + rigelDist*i*scale;
			drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
			}
	}
	if (topEnd == "забег") {		
		basePoint = rackPosition2;
		basePoint[2] = z0;
		y0 = basePoint[1];		
		rigelLength = (platformLengthTop - 70 - b1/2)/Math.cos(turnAngleTop);
		for (var i=1; i < rigelAmt+1; i++) {
			basePoint[1] = y0 + h1*scale + rigelDist*i*scale - 60*scale;
			drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, turnAngleTop, railingMaterial, scale, railingSection);
			}	
		}
}

if(stairAmt == 0) {	
//middleRackAmt
	var rigelLength = (sectionLength + 60) / Math.cos(sectionAngle);
    x0 = rackPosition0[0];
    rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = -h1*scale + rigelDist*i*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -sectionAngle);
	    drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, sectionAngle, railingMaterial, scale, railingSection);
	}


}

}
/* стекла на стойках */

if (railingModel == "Стекло на стойках") {
var glassDist = 80;
var glassHeight = 600;
for (i=0; i<rackPosition.length-1; i++) {
	if (rackPosition[i][1] == rackPosition[i+1][1]) 
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], 0, glassDist, glassHeight, scale);
	else
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], handrailAngle, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition[i][0] + glassDist/2*scale;
	glass.position.y = rackPosition[i][1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;
	
	glass.castShadow = true;
	railingSection.add(glass);
	//stairCase.push(glass);
	}
if(stairAmt != 0) {		
	if (bottomEnd == "площадка") {
	var rackDist0 = platformLengthBottom - 70 + b1/2;
	var p1 = rackPosition0;
	var p2 = newPoint_x (p1, rackDist0*scale,0);
	    var glassShape = drawGlassShape (p1, p2, 0, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition0[0] + glassDist/2*scale;
	glass.position.y = rackPosition0[1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;
	
	glass.castShadow = true;
	railingSection.add(glass);	
	}
	
	if (bottomEnd == "забег") {
	var turnAngleBottom = Math.atan( (rackPosition1[1] - rackPosition0[1])/(rackPosition1[0] - rackPosition0[0]));
	    var glassShape = drawGlassShape (rackPosition0, rackPosition1, turnAngleBottom, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition0[0] + glassDist/2*scale;
	glass.position.y = rackPosition0[1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;	
	glass.castShadow = true;
	railingSection.add(glass);
	}
}
} //конец стекол на стойках


/* —јћќЌ?—”ў?? —“? Ћќ */

if (railingModel == "Самонесущее стекло") {


	var glassDist = 10; //зазор между стеклами
	var glassOffset = 15; //зазор от стекла до торца ступени
	var glassHeight = 1030;
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = (railingPositionZ + glassOffset)*scale;
    if (railingSide == "left") z0 = (railingPositionZ + 40 - glassOffset - glassThickness)*scale;

if (stairAmt!= 0){
	if (topEnd == "забег") {
		deltaXtopPlatform = platformLengthTop - b1;
		deltaYtopPlatform = h1;
		turnAngleTop = Math.atan( deltaYtopPlatform/deltaXtopPlatform);
	}	
	if (bottomEnd == "забег") {
		deltaXbottomPlatform = platformLengthBottom;
		deltaYbottomPlatform = h1;
		turnAngleBottom = Math.atan( deltaYbottomPlatform/deltaXbottomPlatform);
	}
	
/*нижняя площадка*/

if (bottomEnd != "нет") {

	var glassSectionLength1 = platformLengthBottom;
	if (bottomConnection) glassSectionLength1 = glassSectionLength1 + glassOffset - glassDist;

	var glassAmt_1 = Math.round(glassSectionLength1/800);
	var glassLengthX = glassSectionLength1/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(turnAngleBottom)];
	x0 = 0 - glassSectionLength1*scale;
	y0 = -rackOffsetY*scale - glassSectionLength1 * Math.tan(turnAngleBottom)*scale;
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, turnAngleBottom, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(turnAngleBottom) * i;
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
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(handrailAngle)];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = 0;
	if (bottomEnd == "нет") x0 = glassOffset*scale;
	y0 = -rackOffsetY*scale;//-h1*scale;
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, handrailAngle, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(handrailAngle) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint[0] = glass.position.x + glassLengthX * scale;
	basePoint[1] = glass.position.y + glassLengthX*scale * Math.tan(handrailAngle);
	basePoint[2] = glass.position.z;

/*верхняя площадка*/

if (topEnd != "нет") {

	var glassSectionLength3 = platformLengthTop - b1;
	if (topConnection) glassSectionLength3 = glassSectionLength3 + glassOffset + glassDist + glassThickness;
	var glassAmt_1 = Math.round(glassSectionLength3/800);
	var glassLengthX = glassSectionLength3/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(turnAngleTop)];
	x0 = basePoint[0];
    y0 = basePoint[1];
    //z0 = basePoint[2]
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, turnAngleTop, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(turnAngleTop) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	}	
}

if(stairAmt == 0) {
	
	var glassSectionLength0 = platformLengthTop + platformLengthBottom - glassDist;
	if (bottomConnection) glassSectionLength0 = glassSectionLength0 + glassOffset; // - glassDist;
	if (topConnection) glassSectionLength0 = glassSectionLength0 + glassOffset + glassDist + glassThickness;

	////console.log(bottomConnection, topConnection)
	var glassAngle = Math.atan(3*h1 / glassSectionLength0);
    var glassAmt_1 = Math.round(glassSectionLength0/800);
	var glassLengthX = glassSectionLength0/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(glassAngle)];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = -platformLengthBottom*scale + glassDist*scale;
	if (bottomConnection) x0 = x0 - glassOffset *scale;

	y0 = -rackOffsetY*scale - h1*scale;
	
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, glassAngle, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(glassAngle) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint[0] = glass.position.x + glassLengthX * scale;
	basePoint[1] = glass.position.y + glassLengthX*scale * Math.tan(handrailAngle);
	basePoint[2] = glass.position.z;
}
}// конец самонесущего стекла


/*  ковка */


if (railingModel == "Кованые балясины") {

rackPosition = [];
rackNuber = 0;

var angleBottom = 0;
var angleTop = handrailAngle;
var forgedRackProfile = 40;
var forgedRackLength = 900;
	var longRackLength = 900;
	var shortRackLength = rackOffsetY;

if (stairAmt != 0) {
/*нижняя площадка*/
if (bottomEnd == "площадка") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawForgedRack3d(basePoint, longRackLength, turnAngleBottom, railingMaterial, scale, railingSection);
}
if (bottomEnd == "забег") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawForgedRack3d(basePoint, longRackLength, turnAngleBottom, railingMaterial, scale, railingSection);
}

if (bottomEnd != "нет") {
	var rackPosition0 = basePoint; //сохраняем координаты стойки площадки
	//обнуляем массив координат стоек 
	rackPosition = [];
	rackNuber = 0;
	}

/*первая стойка марша*/
	x0 = b1/2*scale;
	y0 = h1*scale - rackOffsetY*scale;
	z0 = railingPositionZ * scale;
    basePoint = [x0, y0, z0];
	var p0 = [x0, y0, z0];
	p0 = newPoint_x(p0, forgedRackProfile*scale, -handrailAngle);
	drawForgedRack3d(basePoint, longRackLength, handrailAngle, railingMaterial, scale, railingSection);
    var rackPosition1 = rackPosition[0]; //сохраняем координаты стойки

	/*средние стойки марша*/
	for (i = 0; i < stairAmt; i++) {
		x = x0 + b1*i*scale;
		y = y0 + h1*i*scale;
		basePoint = [x, y, z0];
		for (var j = 0; j < rackPositionStep.length; j++)
			if (i+1 == rackPositionStep[j]){
				drawForgedRack3d(basePoint, shortRackLength, handrailAngle, railingMaterial, scale, railingSection);
			    }
		}
	/*последняя стойка марша*/
	basePoint = [x, y, z0];
	var rackTopAngle = handrailAngle;
	if (topEnd == "площадка") rackTopAngle = 0;
	if (topEnd == "забег") rackTopAngle = turnAngleTop;
	var rackPosition2 = basePoint; //сохраняем координаты стойки
	
	
	drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection);
    var p1 = [x, y, z0];
	
/*верхняя площадка*/

if (topEnd == "площадка") {

 	/*средние стойки площадки*/
		var middleRackAmt = Math.ceil(platformLengthTop/1000)-1;
		if (middleRackAmt < 0) middleRackAmt = 0;
		var rackDist = (platformLengthTop-70 - 100 - 40)/(middleRackAmt + 1);
    for (i = 0; i < middleRackAmt; i++) {
			basePoint = newPoint_x(basePoint, rackDist*scale, 0);
			drawForgedRack3d(basePoint, shortRackLength, rackTopAngle, railingMaterial, scale, railingSection);
    }
		
		/*последняя стойка площадки*/
		//basePoint = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
		basePoint = newPoint_x(basePoint, rackDist*scale, 0);
		drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection);
}
	if (topEnd == "забег") {
		/*последняя стойка площадки*/
		basePoint = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
		basePoint[1] = basePoint[1] + h2 *scale; 
		drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection);
	}
	
	var p2 = basePoint;
	
/*нижняя перемычка нижней площадки*/

if (bottomEnd != "нет"){
	var leftHeight = 20/Math.cos(turnAngleBottom);
	var poleLength = (platformLengthBottom + b1/2 - 70 - 40)/Math.cos(turnAngleBottom);
	var bottomPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0];
    bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}

/*нижняя перемычка марша*/

	var leftHeight = 20/Math.cos(handrailAngle);
	var poleLength = b1*stairAmt-b1;
    var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition1[0];
    bottomPole.position.y = rackPosition1[1] + rackOffsetY*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);

/*нижняя перемычка верхней площадки*/

if (topEnd != "нет"){
	var leftHeight = 20/Math.cos(turnAngleTop);
	var poleLength = (platformLengthTop - b1/2 - 70 - 50 + 40)/Math.cos(turnAngleTop);
	var bottomPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition2[0];
    bottomPole.position.y = rackPosition2[1] + rackOffsetY*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}
	

/*балясины нижней площадки*/ 

if (bottomEnd != "нет"){
	var p0t = rackPosition0;
	p0t = newPoint_x(p0t, 40*scale, -turnAngleBottom);
	var p1t = rackPosition1;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale));
    balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleBottom;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale;
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
		drawForgedBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	
	
/*балясины марша*/

	var balAmt = Math.round((p1[0] - p0[0])/(balDist[0]*scale));
    balDist[1] = (p1[0] - p0[0])/(balAmt + 1);
	var angle_1 = handrailAngle;
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale;
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
		//console.log(balType, insertPoint, scale)
		drawForgedBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
		}

/*балясины верхей площадки*/	

if (topEnd != "нет"){
	var p0t = p1;
	p0t = newPoint_x(p0t, 40*scale, 0);
	var p1t = p2;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale));
    balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleTop;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale;
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
		drawForgedBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	
}

if(stairAmt == 0) {
var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength);
    /*первая стойка*/
	var x0 = (50 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
		drawForgedRack3d(basePoint, longRackLength, sectionAngle, railingMaterial, scale, railingSection);
    var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки

/*средние стойки*/
	var middleRackAmt = Math.round(sectionLength/800);
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = sectionLength/(middleRackAmt + 1);
    for (i = 0; i < middleRackAmt; i++) {
			p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
			drawForgedRack3d(p0, shortRackLength, sectionAngle, railingMaterial, scale, railingSection);
    }
/*последняя стойка*/
	p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
	drawForgedRack3d(p0, longRackLength, sectionAngle, railingMaterial, scale, railingSection);

/*нижняя перемычка*/
	var leftHeight = 20/Math.cos(sectionAngle);
	var poleLength = sectionLength;
	var bottomPoleShape = draw4angleShape (sectionAngle, sectionAngle, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0];
    bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);	

/*балясины*/

	var balAmt = Math.round((sectionLength-40)/balDist[0]);
    //console.log(balAmt);
	balDist[1] = (sectionLength-40)/(balAmt + 1)*scale;
	var angle_1 = sectionAngle;
	p0 = newPoint_x(rackPosition0, 40*scale, -angle_1);
	p0[1] = p0[1] - 5*scale;
	p0[2] = z0 + 14*scale;
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale;
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
		drawForgedBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
		}
		
	
	}
	
}//конец кованых ограждений


/* ѕќ–”„?Ќ№ */

if(handrail !="нет") {
	
/*параметры поручня в зависимости от модели*/

	var handrailMaterial = railingMaterial;
	var handrailProfileY = 40;
	var handrailProfileZ = 60;
	
	if(handrail == "40х20 черн.") {
		handrailModel = "rect";
		handrailProfileY = 20;
		handrailProfileZ = 40;
		}				
	if(handrail == "40х40 черн.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "60х30 черн.") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 60;
		}
	if(handrail == "кованый полукруглый") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 50;
		}
	if(handrail == "40х40 нерж.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "Ф50 нерж.") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}		
	if(handrail == "Ф50 сосна") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный сосна") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "50х50 сосна") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 береза") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный дуб") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 дуб") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}	
	if(handrail == "40х60 дуб с пазом") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "Ф50 нерж. с пазом") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}
	if(handrail == "40х60 нерж. с пазом") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 60;
		}	

if (railingModel != "Самонесущее стекло") {
if(stairAmt != 0) {		
/*поручень нижней площадки*/

	if (bottomEnd == "площадка") {
		basePoint[0] = - platformLengthBottom * scale - (handrailProfileZ+40)/2*scale;
		basePoint[1] = - rackOffsetY*scale + rackLength*scale;
		basePoint[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
		handrailLength = platformLengthBottom + b1/2 + handrailProfileZ/2;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
		}
	if (bottomEnd == "забег") {
		var turnAngleBottom = Math.atan( (rackPosition1[1] - rackPosition0[1])/(rackPosition1[0] - rackPosition0[0]));
	    if (!bottomConnection){
			basePoint[0] = - platformLengthBottom * scale - (handrailProfileZ+40)/2*scale;
			basePoint[1] = - rackOffsetY*scale + rackLength*scale - h1*scale;
			basePoint[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
			var deltaY = (rackPosition0[0] - basePoint[0])*Math.tan(turnAngleBottom);
			basePoint[1] = basePoint[1] - deltaY;
			}
		if (bottomConnection) {
			basePoint[0] = - platformLengthBottom * scale + 70*scale;
			basePoint[1] = - rackOffsetY*scale + rackLength*scale - h1*scale;
			basePoint[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
			var basePoint1 = [];
			basePoint1[0] = - platformLengthBottom * scale;
			basePoint1[1] = - rackOffsetY*scale + rackLength*scale - h1*scale;
			basePoint1[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
			drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, 70, 0, handrailMaterial, scale, railingSection);
			}
		handrailLength = (rackPosition1[0] - basePoint[0])/ scale / Math.cos(turnAngleBottom);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, turnAngleBottom, handrailMaterial, scale, railingSection);
		}
 
/*поручень марша*/
 
	var stepLength = h1/Math.sin(handrailAngle);
	var handrailLength = stepLength * stairAmt - 1/3*stepLength;
	if (topEnd == "площадка") handrailLength = handrailLength - 1/3*stepLength;
	if (topEnd == "забег") handrailLength = handrailLength - 1/3*stepLength;
	if (railingModel == "Самонесущее стекло") handrailLength = stepLength * stairAmt + 0.2*stepLength;
	if (bottomEnd == "забег") handrailLength = handrailLength - 1/3*stepLength;
	
	x0 = b1/2 * scale;
	y0 = h1*scale - rackOffsetY*scale + rackLength*scale;
	z0 = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
	basePoint = [x0, y0, z0];
	
	if (bottomEnd != "забег") basePoint = newPoint_x(basePoint, -b1/3*scale, -handrailAngle);
    drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, handrailAngle, handrailMaterial, scale, railingSection);
	
/*поручень верхней площадки*/
	
	if (topEnd == "площадка") {
		basePoint[0] = b1*(stairAmt-0.5)*scale;
		basePoint[1] = h1*stairAmt*scale - rackOffsetY*scale + rackLength*scale;
		basePoint[2] = z0;
		handrailLength = platformLengthTop - b1/2;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
		}
	if (topEnd == "забег") {
		basePoint[0] = b1*(stairAmt-0.5)*scale;
		basePoint[1] = h1*stairAmt*scale - rackOffsetY*scale + rackLength*scale;//rackPosition2[1];// + rackLength*scale;
		basePoint[2] = z0; 
		handrailLength = (platformLengthTop - b1/2)/Math.cos(turnAngleTop);
		if (topConnection) handrailLength = handrailLength - 70/Math.cos(turnAngleTop);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, turnAngleTop, handrailMaterial, scale, railingSection);
		if (topConnection) {
			/*basePoint = rackPosition3;
			basePoint[1] = rackPosition3[1] + rackLength*scale;
			basePoint[2] = z0; */
			var basePoint1 = newPoint_x(basePoint, handrailLength * Math.cos(turnAngleTop)*scale, -turnAngleTop);
			//console.log(basePoint1);
			handrailLength = 70 + (handrailProfileZ + 40)/2;
			drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, handrailLength, 0, handrailMaterial, scale, railingSection);
			} 
		
		}
}
if(stairAmt == 0) {	 
	var handrailLength = sectionLength / Math.cos(sectionAngle);
	if (!bottomConnection) handrailLength = handrailLength + 70 / Math.cos(sectionAngle);
	if (!topConnection) handrailLength = handrailLength + 70 / Math.cos(sectionAngle);	
	x0 = rackPosition0[0];
	y0 = -h1*scale - rackOffsetY*scale + rackLength*scale;
	z0 = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
	basePoint = [x0, y0, z0];
	if (!bottomConnection) basePoint = newPoint_x(basePoint, -70*scale, - sectionAngle);
	//if (railingModel == "Кованые балясины") basePoint = newPoint_x(basePoint, 20*scale, -sectionAngle)
	drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, sectionAngle, handrailMaterial, scale, railingSection);

	if (topConnection) {
		var basePoint1 = newPoint_x(basePoint, handrailLength * Math.cos(sectionAngle)*scale, -sectionAngle);
		var handrailLength1 = 70 + (handrailProfileZ + 40)/2;
		if (railingModel == "Кованые балясины") handrailLength1 += 20;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, handrailLength1, 0, handrailMaterial, scale, railingSection);
		}
	if (bottomConnection) {
		basePoint = newPoint_x(basePoint, -70*scale, 0);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, 70, 0, handrailMaterial, scale, railingSection);
		}

}
}
if (railingModel == "Самонесущее стекло") {


z0 = z0 - (-6 + handrailProfileZ/2)*scale;
    var handrailExtrudeOptions = {
		amount: handrailProfileZ*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

if(stairAmt != 0) {			
/* поручень нижней площадки*/

if (bottomEnd != "нет"){
	var leftHeight = handrailProfileY/Math.cos(turnAngleBottom);
	var poleLength = glassSectionLength1;
	var deltaY = handrailProfileY / Math.cos(handrailAngle) -  handrailProfileY / Math.cos(turnAngleBottom);
    x0 = 0 - glassSectionLength1*scale;
	y0 = (glassHeight - rackOffsetY-20 + deltaY)*scale - glassSectionLength1 * Math.tan(turnAngleBottom)*scale;
	var bottomPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale);
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
	var poleLength = glassSectionLength2;
    var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = 0;
	bottomPole.position.y = (glassHeight - rackOffsetY - 20)*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	
	basePoint[0] = bottomPole.position.x + glassSectionLength2 *scale;
	basePoint[1] = bottomPole.position.y + glassSectionLength2 * Math.tan(handrailAngle)*scale;

/*поручень верхней площадки*/

if (topEnd != "нет"){
	var leftHeight = handrailProfileY/Math.cos(turnAngleTop);
	var poleLength = glassSectionLength3;
    var deltaY = handrailProfileY / Math.cos(handrailAngle) -  handrailProfileY / Math.cos(turnAngleTop);
    var bottomPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = basePoint[0];
    bottomPole.position.y = basePoint[1] + deltaY*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}


}
if(stairAmt == 0) {	
	var leftHeight = handrailProfileY/Math.cos(glassAngle);
	var poleLength = glassSectionLength0;
	x0 = -platformLengthBottom*scale + glassDist*scale;
	if (bottomConnection) x0 = x0 - glassOffset *scale;
	y0 = (glassHeight - rackOffsetY - h1)*scale;
    var bottomPoleShape = draw4angleShape (glassAngle, glassAngle, poleLength, leftHeight, scale);
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
	
	return (railingSection);
} //end of drawRailingSection();






function drawRailingSectionPlatform(
			platformLength, offsetLeft, offsetRight,
			handrailOffsetLeft, handrailOffsetRight, railingSide, 
			scale) {

var railingSection = new THREE.Object3D();
var rackOffsetY = 150;
var rackLength = 900;
var railingPositionZ = -40;
if (turnFactor == -1) railingPositionZ = 0;
var basePoint = [];
if (turnFactor == -1) {
	var railingSideTemp = railingSide;
    if (railingSideTemp == "left") railingSide = "right";
    if (railingSideTemp == "right") railingSide = "left";
}
	
/*материалы*/
var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
var railingMaterial =  new THREE.MeshLambertMaterial({color: 0xD0D0D0, wireframe: false});
var glassMaterial =  new THREE.MeshLambertMaterial({opacity:0.6, color: 0x3AE2CE, transparent:true});
var glassThickness = 8;
if (railingModel == "Самонесущее стекло") glassThickness = 12;
var handrailAngle = 0;
var glassExtrudeOptions = {
	amount: glassThickness*scale,
	bevelEnabled: false,
	curveSegments: 12,
	steps: 1
	};
var forgingExtrudeOptions = {
	amount: 40*scale,
	bevelEnabled: false,
	curveSegments: 12,
	steps: 1
	};

/* —“ќ… » */


if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {

rackPosition = [];
rackNuber = 0;

var sectionLength = platformLength - offsetLeft - offsetRight - 40;

/*первая стойка*/
	var x0 = offsetLeft * scale + 20*scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
    var rackPosition1 = basePoint; //сохраняем координаты стойки марша

/*средние стойки*/
	var middleRackAmt = Math.round(sectionLength/800)-1;
	if (middleRackAmt < 0) middleRackAmt = 0;
	
	var p0 = basePoint;
	var rackDist = sectionLength/(middleRackAmt + 1);
    for (i = 0; i < middleRackAmt+1; i++) {
		p0 = newPoint_x(p0, rackDist*scale, 0);
		drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection);
    }			
	var rackPosition2 = p0; //сохраняем координаты стойки марша
}


/* ригели */


if (railingModel == "Ригели") {
 
	//var rigelMaterial = railingMaterial;
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

	var x0 = (offsetLeft - 30) * scale;
	var y0 = 0;
	var rigelLength = platformLength - offsetLeft - offsetRight + 60;
	if (railingSide == "left") z0 = railingPositionZ*scale + 40*scale;
	if (railingSide == "right") z0 = railingPositionZ*scale - rigelProfileZ*scale;
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-rackOffsetY)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
		y0 = rigelDist*i*scale; // + rackOffsetY*scale;
		basePoint = [x0, y0, z0];
		drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
		}
}

/* стекла на стойках */

if (railingModel == "Стекло на стойках") {
var glassDist = 60;
var glassHeight = 600;
for (i=0; i<rackPosition.length-1; i++) {
	if (rackPosition[i][1] == rackPosition[i+1][1]) 
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], 0, glassDist, glassHeight, scale);
	else
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], handrailAngle, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition[i][0] + 30*scale;
	glass.position.y = rackPosition[i][1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;
	
	glass.castShadow = true;
	railingSection.add(glass);

	}
	
} //конец стекол на стойках


/* —јћќЌ?—”ў?? —“? Ћќ */

if (railingModel == "Самонесущее стекло") {

	var glassDist = 10; //зазор между стеклами
	var glassOffset = 15; //зазор от стекла до торца ступени
	var glassHeight = 1030;
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = glassOffset*scale;
	if (railingSide == "left") z0 = (0 - glassOffset - glassThickness)*scale;
	var sectionLength = platformLength;
	var glassAngle = 0;
    var glassAmt_1 = Math.round(sectionLength/800);
	var glassLengthX = sectionLength/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, 0];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = glassDist*scale;
	y0 = - rackOffsetY*scale;
	
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, glassAngle, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0;
	    glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint[0] = glass.position.x + glassLengthX * scale;
	basePoint[1] = glass.position.y + glassLengthX*scale * Math.tan(handrailAngle);
	basePoint[2] = glass.position.z;
}// конец самонесущего стекла
	
	/*  ковка */


if (railingModel == "Кованые балясины") {

rackPosition = [];
rackNuber = 0;

var angleBottom = 0;
var angleTop = 0;
var forgedRackProfile = 40;
var forgedRackLength = 900;
var longRackLength = 900;
var shortRackLength = rackOffsetY;
var sectionLength = platformLength - offsetLeft - offsetRight - 40;

/*первая стойка площадки*/
	var x0 = offsetLeft * scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawForgedRack3d(basePoint, longRackLength, 0, railingMaterial, scale, railingSection);
    var rackPosition0 = basePoint; //сохраняем координаты стойки марша
 
 	var middleRackAmt = Math.round(platformLength/800)-1;
	if (middleRackAmt < 0) middleRackAmt = 0;
	
	var p0 = basePoint;
	var rackDist = (platformLength - offsetLeft - offsetRight - 40)/(middleRackAmt + 1);
    for (i = 0; i < middleRackAmt; i++) {
		p0 = newPoint_x(p0, rackDist*scale, 0);
		drawForgedRack3d(p0, shortRackLength, 0, railingMaterial, scale, railingSection);
    }
/*последняя стойка*/
	p0 = newPoint_x(p0, rackDist*scale, 0);
	drawForgedRack3d(p0, longRackLength, 0, railingMaterial, scale, railingSection);
    var rackPosition1 = p0; //сохраняем координаты стойки марша
	
	
/*нижняя перемычка*/

	var leftHeight = 20;
	var poleLength = sectionLength - 40;
	var bottomPoleShape = draw4angleShape (0, 0, poleLength, leftHeight, scale);
    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0] + 40*scale;
    bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale;
    bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	

/*балясины*/ 

	var p0t = rackPosition0;
	p0t = newPoint_x(p0t, 40*scale, 0); 
	var p1t = rackPosition1;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale));
    balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = 0;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale;
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
		drawForgedBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}

	
}//конец кованых ограждений

/* ѕќ–”„?Ќ№ */

if(handrail !="нет") {
	
/*параметры поручня в зависимости от модели*/

	var handrailMaterial = railingMaterial;
	var handrailProfileY = 40;
	var handrailProfileZ = 60;
	
	if(handrail == "40х20 черн.") {
		handrailModel = "rect";
		handrailProfileY = 20;
		handrailProfileZ = 40;
		}				
	if(handrail == "40х40 черн.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "60х30 черн.") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 60;
		}
	if(handrail == "кованый полукруглый") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 50;
		}
	if(handrail == "40х40 нерж.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "Ф50 нерж.") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}		
	if(handrail == "Ф50 сосна") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный сосна") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "50х50 сосна") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 береза") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный дуб") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 дуб") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}	
	if(handrail == "40х60 дуб с пазом") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "Ф50 нерж. с пазом") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}
	if(handrail == "40х60 нерж. с пазом") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 60;
		}	


if (railingModel != "Самонесущее стекло") {
	var handrailLength = sectionLength + handrailOffsetLeft + handrailOffsetRight + 40;
	basePoint[0] = (offsetLeft - handrailOffsetLeft)*scale;
	basePoint[1] = - rackOffsetY*scale + rackLength*scale;
	basePoint[2] = railingPositionZ*scale - (handrailProfileZ-40)/2*scale;
	drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
	}

if (railingModel == "Самонесущее стекло") {
	var handrailLength = sectionLength; // + handrailOffsetLeft + handrailOffsetRight + 40;
	basePoint[0] = 0;
	basePoint[1] =  (glassHeight - rackOffsetY)*scale;
	basePoint[2] = railingPositionZ*scale - (handrailProfileZ-40)/2*scale;
	drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
	//console.log(basePoint)
	}
	
	}; //конец поручня

	
	
	return (railingSection);
}// end of drawRailingSectionPlatform




