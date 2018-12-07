﻿/***  Вспомогательные функции   ***/




/*поручень*/

function drawHandrail(handrailParams) {

    var type = handrailParams.type;
    var angle = handrailParams.angle;
    var turnAngleTop = handrailParams.turnAngleTop;
    var turnAngleBot = handrailParams.turnAngleBot;
    var stairAmt = handrailParams.stairAmt;
    var profileY = handrailParams.profileY;
    var topEnd = handrailParams.topEnd;
    var bottomEnd = handrailParams.bottomEnd;
    var dxfBasePoint = handrailParams.dxfBasePoint;
    var yTop = handrailParams.yTop;
    var material = handrailParams.material;
    var platformTopRailing = handrailParams.platformTopRailing;
    var handrailLength = handrailParams.handrailLength;
    var topPltRailing_5 = handrailParams.topPltRailing_5;

    var shape = new THREE.Shape();

    //определяем координаты поручня
    var p0, p1, p2, p3, p4, p5, p6, p7;
    p0 = { x: 0, y: 0 };
    p1 = polar(p0, angle + Math.PI / 2, profileY);
    p2 = polar(p1, angle, handrailLength);
    if (topEnd === "площадка" && platformTopRailing && !topPltRailing_5) {
        p3 = newPoint_xy(p0, handrailParams.platformLengthTop, yTop);
        p2 = itercection(p1, polar(p1, angle, 100), p3, polar(p3, turnAngleTop, 100));
        p4 = newPoint_xy(p3, 0, -profileY);
        p5 = itercection(p0, polar(p0, angle, 100), p4, polar(p4, turnAngleTop, 100));
		handrailParams.handrailLength = distance(p1,p2) + distance(p2,p3);
    } else {
        p3 = polar(p2, -Math.PI / 2 + angle, profileY);
        p5 = copyPoint(p3);
    }
    //координаты наружного поручня промежуточной площадки
    if (turnAngleBot !== 0) {
        p6 = polar(p0, turnAngleBot + Math.PI, handrailParams.platformLengthBot);
        p7 = polar(p6, turnAngleBot + Math.PI / 2, profileY);
		handrailParams.handrailLength += distance(p0,p6);
    }

    /*прямоугольный поручень*/
    if (type !== "round") {

        if (turnAngleBot !== 0) {
            addLine(shape, dxfPrimitivesArr, p0, p6, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p6, p7, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p7, p1, dxfBasePoint);
        } else
            addLine(shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);

        if ((topEnd === "площадка" || topEnd === "забег") && platformTopRailing && !topPltRailing_5) {
            addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p3, p4, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p4, p5, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p5, p0, dxfBasePoint);
        } else {
            addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
            addLine(shape, dxfPrimitivesArr, p3, p0, dxfBasePoint);
        }
    }

    /*круглый поручень*/
    if (type === "round") {

        handrailParams.meshes = [];

        var poleRadius = profileY / 2;
        var radiusTop = poleRadius;
        var radiusBottom = poleRadius;
        var height = distance(p5, p0);
        var segmentsX = 20;
        var segmentsY = 0;
        var openEnded = false;

        var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
        var pole = new THREE.Mesh(poleGeometry, material);
        pole.rotation.z = angle - Math.PI / 2;
        pole.position.x = height / 2 * Math.cos(angle) - poleRadius / 2 * Math.sin(angle);
        pole.position.y = height / 2 * Math.sin(angle) + poleRadius / 2 * Math.cos(angle);
        pole.position.z = poleRadius;
        handrailParams.meshes.push(pole);

        var trashShape = new THREE.Shape();
        addLine(trashShape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, p2, p5, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, p5, p0, dxfBasePoint);

        if (topEnd === "площадка" && platformTopRailing && !topPltRailing_5) {
            var trashShape1 = new THREE.Shape();
            addLine(trashShape1, dxfPrimitivesArr, p5, p2, dxfBasePoint);
            addLine(trashShape1, dxfPrimitivesArr, p2, p3, dxfBasePoint);
            addLine(trashShape1, dxfPrimitivesArr, p3, p4, dxfBasePoint);
            addLine(trashShape1, dxfPrimitivesArr, p4, p5, dxfBasePoint);

            height = distance(p3, p2);

            poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
            pole = new THREE.Mesh(poleGeometry, material);
            pole.rotation.z = turnAngleTop - Math.PI / 2;
            pole.position.x = p5.x + height / 2 * Math.cos(turnAngleTop);
            pole.position.y = p5.y + poleRadius / 2 * Math.cos(turnAngleTop);
            pole.position.y += height / 2 * Math.sin(turnAngleTop);
            pole.position.z = poleRadius;
            handrailParams.meshes.push(pole);
        }

        // наружный поручень промежуточной площадки
        if (turnAngleBot !== 0) {
            var trashShape2 = new THREE.Shape();
            addLine(trashShape2, dxfPrimitivesArr, p0, p6, dxfBasePoint);
            addLine(trashShape2, dxfPrimitivesArr, p6, p7, dxfBasePoint);
            addLine(trashShape2, dxfPrimitivesArr, p7, p1, dxfBasePoint);
            addLine(trashShape2, dxfPrimitivesArr, p1, p0, dxfBasePoint);

            height = distance(p0, p6);

            poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
            pole = new THREE.Mesh(poleGeometry, material);
            pole.rotation.z = turnAngleBot - Math.PI / 2;
            pole.position.x = p6.x + height / 2 * Math.cos(turnAngleBot) - poleRadius / 2 * Math.sin(angle);
            pole.position.y = p6.y + poleRadius / 2 * Math.cos(turnAngleBot);
            pole.position.y += height / 2 * Math.sin(turnAngleBot);
            pole.position.z = poleRadius;
            handrailParams.meshes.push(pole);
        }
    }

    handrailParams.shape = shape;


    return handrailParams;
}

/*стойка 40х40 с кронштейном поручня*/

function drawRack3d_2(rack3dParams) {

    var basePoint = rack3dParams.basePoint;
    var rackLength = rack3dParams.rackLength;
    var handrailAngle = rack3dParams.handrailAngle;
    var rackMaterial = rack3dParams.rackMaterial;
    var scale = rack3dParams.scale;
    var railingSection = rack3dParams.railingSection;
    var rackPosition = rack3dParams.rackPosition;
    var rackNumber = rack3dParams.rackNumber;
    var rackProfile = rack3dParams.rackProfile;
    var handrailHolderLength = rack3dParams.handrailHolderLength;

    //тело стойки
    var rack1 = new THREE.Object3D();
    var rackGeometry = new THREE.BoxGeometry(rackProfile * scale, (rackLength - handrailHolderLength) * scale, rackProfile * scale);
    var rack = new THREE.Mesh(rackGeometry, rackMaterial);
    rack.castShadow = true;
    rack1.add(rack);

    //var cylinder_material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    var cylinder_material = new THREE.MeshLambertMaterial({ color: 0xFF0000, wireframe: false });

    var heightCylinder = 40;
    heightCylinder += rack3dParams.stringerSideOffset;

    var cylinderHolderGeometry = new THREE.CylinderGeometry(6, 6, heightCylinder, 8, 4, false);
    cylinderHolderGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    var cylinderHolder = new THREE.Mesh(cylinderHolderGeometry, cylinder_material);
    cylinderHolder.position.x = rack.position.x;
    cylinderHolder.position.y = rack.position.y - (rackLength - handrailHolderLength) / 2 + 30;
    cylinderHolder.position.z = rack.position.z + rackProfile;
    if (rack3dParams.stringerSideOffset !== 0) cylinderHolder.position.z += heightCylinder - rackProfile / 2 - rackProfile * 2;
    if (rack3dParams.isRight) {
        cylinderHolder.position.z = -rackProfile;
        if (rack3dParams.stringerSideOffset !== 0) cylinderHolder.position.z += rackProfile * 2 + rackProfile / 2 - heightCylinder;
    }

    rack1.add(cylinderHolder);

    cylinderHolderGeometry = new THREE.CylinderGeometry(6, 6, heightCylinder, 8, 4, false);
    cylinderHolderGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    cylinderHolder = new THREE.Mesh(cylinderHolderGeometry, cylinder_material);
    cylinderHolder.position.x = rack.position.x;
    cylinderHolder.position.y = rack.position.y - (rackLength - handrailHolderLength) / 2 + 30 + 60;
    cylinderHolder.position.z = rack.position.z + rackProfile;
    if (rack3dParams.stringerSideOffset !== 0) cylinderHolder.position.z += heightCylinder - rackProfile / 2 - rackProfile * 2;
    if (rack3dParams.isRight) {
        cylinderHolder.position.z = -rackProfile;
        if (rack3dParams.stringerSideOffset !== 0) cylinderHolder.position.z += rackProfile * 2 + rackProfile / 2 - heightCylinder;
    }
    rack1.add(cylinderHolder);

    rack1.position.x = basePoint[0];
    rack1.position.y = basePoint[1] + (rackLength - handrailHolderLength) / 2 * scale - 30 - 60;
    rack1.position.z = basePoint[2] + rackProfile / 2 * scale;

    railingSection.add(rack1);

    //кронштейн поручня
    var handrailHolderRadius = 6;

    var radiusTop = handrailHolderRadius * scale;
    var radiusBottom = handrailHolderRadius * scale;
    var height = handrailHolderLength * scale;
    var segmentsX = 20;
    var segmentsY = 0;
    var openEnded = false;


    var handrailHolderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
    var handrailHolder = new THREE.Mesh(handrailHolderGeometry, rackMaterial);
    handrailHolder.position.x = basePoint[0]; //+ handrailHolderProfile /2 * scale;
    handrailHolder.position.y = basePoint[1] + (rackLength - handrailHolderLength / 2) * scale - 90;
    handrailHolder.position.z = basePoint[2] + rackProfile / 2 * scale;
    handrailHolder.castShadow = true;
    railingSection.add(handrailHolder);
    ////stairCase.push(handrailHolder);


    /*сохраняем координаты в массив*/
    rack3dParams.rackPosition[rackNumber] = [basePoint[0], basePoint[1]];
    rack3dParams.rackNumber += 1;

    return rack3dParams;
}



/*стойка кованой сеции*/

function drawForgedRack3d(basePoint, rackLength, handrailAngle, rackMaterial, scale, railingSection) {
    var angleBottom = 0;
    var angleTop = handrailAngle;
    var forgedRackProfile = 40;
    var forgingExtrudeOptions = {
        amount: 40,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var rackShape = draw4angleShape_0(angleBottom, angleTop, forgedRackProfile, rackLength, scale);
	console.log(rackShape)
    var geom = new THREE.ExtrudeGeometry(rackShape, forgingExtrudeOptions);
	
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var forgedRack = new THREE.Mesh(geom, rackMaterial);
    forgedRack.position.x = basePoint[0];
    forgedRack.position.y = basePoint[1];
    forgedRack.position.z = basePoint[2];
    forgedRack.castShadow = true;
    railingSection.add(forgedRack);

    /*сохраняем координаты в массив*/
    rackPosition[rackNumber] = [basePoint[0], basePoint[1]];
    //console.log(rackPosition, rackNumber)
    rackNumber += 1;
}

/*палка в 3D*/


function drawPole3D_2(pole3DParams) {

    var poleType = pole3DParams.poleType;
    var poleProfileY = pole3DParams.poleProfileY;
    var poleProfileZ = pole3DParams.poleProfileZ;
    var basePoint = pole3DParams.basePoint;
    var length = pole3DParams.length;
    var poleAngle = pole3DParams.poleAngle;
    var poleMaterial = pole3DParams.poleMaterial;
    var scale = 1;
    var dxfBasePoint = pole3DParams.dxfBasePoint;

    var pole3DExtrudeOptions = {
        amount: poleProfileZ,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var p0 = { x: 0, y: 0 };
    var p1 = newPoint_xy(p0, 0, poleProfileY);
    var p2 = newPoint_xy(p1, length, 0);
    var p3 = newPoint_xy(p2, 0, -poleProfileY);

	//console.log(p0,p1,p2,p3)
    scale = 1;
    /*прямоугольная палка*/
    if (poleType !== "round") {

        //var poleGeometry = new THREE.BoxGeometry(length * scale, poleProfileY * scale, poleProfileZ * scale);
        var shape = new THREE.Shape();
        addLine(shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, p3, p0, dxfBasePoint);

        var poleGeometry = new THREE.ExtrudeGeometry(shape, pole3DExtrudeOptions);
        poleGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var pole = new THREE.Mesh(poleGeometry, poleMaterial);

        pole.rotation.z = poleAngle;

        if (basePoint instanceof Array) {
            pole.position.x = basePoint[0];
            pole.position.y = basePoint[1];
            pole.position.z = basePoint[2];
        }
        if (basePoint instanceof Object && basePoint.x != undefined) {
            pole.position.x = basePoint.x + (length / 2 * Math.cos(poleAngle) - poleProfileY / 2 * Math.sin(poleAngle));
            pole.position.y = basePoint.y + (length / 2 * Math.sin(poleAngle) + poleProfileY / 2 * Math.cos(poleAngle));
            pole.position.z = basePoint.z;

        }
        pole.castShadow = true;
        pole3DParams.railingSection.add(pole);
		pole3DParams.mesh = pole;
    }
    /*круглая палка*/
    if (poleType === "round") {
        var poleRadius = poleProfileY / 2;
        var radiusTop = poleRadius * scale;
        var radiusBottom = poleRadius * scale;
        var height = length * scale;
        var segmentsX = 20;
        var segmentsY = 0;
        var openEnded = false;

        var trashShape = new THREE.Shape();
        addLine(trashShape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, p3, p0, dxfBasePoint);

        var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
        var pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.rotation.z = poleAngle - Math.PI / 2;
        pole.position.x = 0//basePoint[0] + (length / 2 * Math.cos(poleAngle) - poleRadius / 2 * Math.sin(poleAngle)) * scale;
        pole.position.y = 0//basePoint[1] + (length / 2 * Math.sin(poleAngle) + poleRadius / 2 * Math.cos(poleAngle)) * scale;
        pole.position.z = basePoint[2] + poleRadius * scale;
		//console.log(pole.position)
        pole.castShadow = true;
		if(pole3DParams.railingSection) pole3DParams.railingSection.add(pole);
		pole3DParams.mesh = pole;
    }

    return pole3DParams;
}

/*палка в 3D*/


function drawPole3D_3(poleParams){
var poleType = poleParams.poleType;
var poleProfileY = poleParams.poleProfileY;
var poleProfileZ = poleParams.poleProfileZ;
var basePoint = poleParams.basePoint;
var length = poleParams.length;
var poleAngle = poleParams.poleAngle;
var poleMaterial = poleParams.poleMaterial;
var railingSection = poleParams.railingSection;
var handrail = poleParams.handrail;
var dxfPrimitivesArr = poleParams.dxfPrimitivesArr;
var dxfBasePoint = poleParams.dxfBasePoint;
var bals = poleParams.bals;
var banisterTopLedge = poleParams.banisterTopLedge;
var type = poleParams.type;
var h1 = poleParams.h1;
var b1 = poleParams.b1;
var nose = poleParams.nose;
var minBanisterSize = poleParams.minBanisterSize;
var isTopMarsh = poleParams.isTopMarsh;
var is2MarshBottomRack = poleParams.is2MarshBottomRack;
var isTurn180 = poleParams.isTurn180;
var rackSize = parseInt(params.rackSize);

/*прямоугольная палка*/
 if (poleType != "round") {
    var poleShape = new THREE.Shape();
	var poleExtrudeOptions = {
		amount: poleProfileZ,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
		
	var p0 = { x: 0, y: 0};
	var p1 = { x: 0, y: 0};
	var p2 = { x: 0, y: 0};
	
	p1 = copyPoint(p0);
	p2 = newPoint_xy(p1, length - poleProfileY / Math.cos(Math.atan(h1/b1)) * Math.sin(Math.atan(h1/b1)), 0);
	addLine(poleShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, poleProfileY);
	p2.x += poleProfileY / Math.cos(Math.atan(h1/b1)) * Math.sin(Math.atan(h1/b1));
	addLine(poleShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, -(length - poleProfileY / Math.cos(Math.atan(h1/b1)) * Math.sin(Math.atan(h1/b1))), 0);
	addLine(poleShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, -poleProfileY);
	p2.x -= poleProfileY / Math.cos(Math.atan(h1/b1)) * Math.sin(Math.atan(h1/b1));
	addLine(poleShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	
	var poleGeometry = new THREE.ExtrudeGeometry(poleShape, poleExtrudeOptions);
	var pole = new THREE.Mesh( poleGeometry, poleMaterial);

	if (basePoint instanceof Array){
		pole.position.x = basePoint[0] + (length/2*Math.cos(poleAngle) - poleProfileY/2 * Math.sin(poleAngle)) * scale;
		pole.position.y = basePoint[1] + (length/2*Math.sin(poleAngle) + poleProfileY/2 * Math.cos(poleAngle)) * scale;
		pole.position.z = basePoint[2] + poleProfileZ /2 * scale;
		}
	if (basePoint instanceof Object && basePoint.x != undefined){		
		pole.position.x = nose;
		
		var verticalPoint1 = { x: pole.position.x, y: 0};
		var balPoint1 = { x: bals[0].banister.position.x + minBanisterSize/2, y: bals[0].banister.position.y + bals[0].length - banisterTopLedge };
		var balPoint2 = null;
		if(bals.length > 1){ 
		    balPoint2 = { x: bals[1].banister.position.x + minBanisterSize/2, y: bals[1].banister.position.y + bals[1].length - banisterTopLedge };
		}
		else{
			balPoint2 = polar(balPoint1, poleAngle, 20);
		}
		if(poleParams.turnStepsParams) balPoint2 = { x: bals[0].banister.position.x + minBanisterSize/2 + 20, y: bals[0].banister.position.y + bals[0].length - banisterTopLedge };
		var intersectionPoint = itercection(verticalPoint1, newPoint_xy(verticalPoint1, 0, 100), balPoint1, balPoint2);
		
		pole.position.y = intersectionPoint.y;
		pole.position.z = basePoint.z;
if (poleParams.banisterBottomBevel) pole.position.y += poleParams.banisterBottomBevel;
		}
    pole.rotation.z = poleAngle;
	var text = type == "left" ? "Поручень внешнего ограждения " : (type == "right" ? "Поручень внутреннего ограждения ":"Поручень ограждения задней стенки площадки ");
	text += type != "platform" ? (isTopMarsh ? (is2MarshBottomRack ? "среднего марша" : "верхнего марша") : "нижнего марша"): "";
	
if (poleParams.isTurn90Winder) {
	pole.position.x -= poleParams.railingPosCorrectionX;
	pole.position.y -= poleParams.railingPosCorrectionX * Math.tan(poleAngle);
}
//if(poleParams.turnStepsParams && isTopMarsh) pole.position.y -= params.h3;
if(poleParams.turnStepsParams){
	if (timberBalStep == 1) pole.position.y += 60;
	if (timberBalStep == 1.5) pole.position.y += 20;
	if (timberBalStep == 2) pole.position.y += 50;
	if (params.timberBalTopEnd == "квадрат" && params.timberBalBotEnd == "квадрат" && timberBalStep == 1) pole.position.y -= 40;
}
if(poleParams.turnStepsParams && !isTopMarsh && type != "platform") pole.position.y -= params.h1;
if(poleParams.turnStepsParams && poleParams.is2PlatformRailing && type != "platform") pole.position.y -= params.h2;
if(poleParams.turnStepsParams && !isTopMarsh && type == "platform") pole.position.y -= 50;
if(poleParams.turnStepsParams && (isTopMarsh && !poleParams.is2PlatformRailing) && params.model == "тетивы") {
	var _h3 = is2MarshBottomRack ? params.h2 : params.h3;
	pole.position.y = (- _h3 + 100) + (pole.position.x - (-rackSize - 5 + params.stringerThickness)) * Math.tan(poleAngle) + bals[0].length - 15 - 15;
    if(params.timberBalTopEnd == "круг") pole.position.y += (-(params.banisterSize - minBanisterSize)/2 - minBanisterSize) * Math.tan(poleAngle);
}
if(poleParams.turnStepsParams && type == "platform" && params.model == "тетивы") {
	var rackXPos1 = (-(rackSize - 20) - (rackSize - params.stringerThickness)/2) + (params.riserType == "нет" ? 20 : 0);
	pole.position.y = (-params.h1 + 100) + bals[0].length - 15 - 15;
	pole.position.y += (bals[0].banister.position.x - params.banisterSize/2 - (rackXPos1 + (rackSize - params.stringerThickness)/2 + params.stringerThickness)) * Math.tan(poleParams.platformTurnAngle);
	pole.position.y -= (bals[0].banister.position.x + minBanisterSize/2 - pole.position.x) * Math.tan(poleAngle);
	}

if(poleParams.turnStepsParams && (!isTopMarsh || poleParams.is2PlatformRailing) && params.model == "тетивы" && type != "platform") {
	pole.position.y = 15 / Math.cos(poleAngle) + pole.position.x * Math.tan(poleAngle) + bals[0].length - 15 - 15;
	
    if(params.timberBalTopEnd == "круг") pole.position.y += (-(params.banisterSize - minBanisterSize)/2 - minBanisterSize) * Math.tan(poleAngle);
}
	var textHeight = 30;
	var textBasePoint = newPoint_xy(dxfBasePoint, 0, -100)
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
	
	
	var text2 = type != "platform" ? (isTopMarsh ? (is2MarshBottomRack ? "Средний марш" : "Верхний марш") : "Нижний марш") : "";
	text2 += type == "left" ? " внешняя сторона " : (type == "right" ? " внутренняя сторона " : " задняя стенка площадки ");
	text2 += poleParams.turnStepsParams ? "забег" : "";
	var textHeight = 40;
	var textBasePoint = newPoint_xy(dxfBasePoint, -2000, 800);
	addText(text2, textHeight, dxfPrimitivesArr, textBasePoint);
	
	pole.castShadow = true;
	railingSection.add( pole );
/*pole.position.x = 0;
pole.position.y = 0;
pole.position.z = 0;*/
//console.log(pole.position);
	handrail.add( pole );
	}
//console.log(handrail);
/*круглая палка*/
if (poleType == "round") {
	var poleRadius = poleProfileY/2;
	var radiusTop = poleRadius*scale
	var radiusBottom = poleRadius*scale; 
	var height = length*scale;
	var segmentsX = 20 
	var segmentsY = 0 
	var openEnded = false;


	var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
	var pole = new THREE.Mesh( poleGeometry, poleMaterial);
	pole.rotation.z = poleAngle-Math.PI/2;
	pole.position.x = basePoint[0] + (length/2*Math.cos(poleAngle) - poleRadius/2 * Math.sin(poleAngle)) * scale;
	pole.position.y = basePoint[1] + (length/2*Math.sin(poleAngle) + poleRadius/2 * Math.cos(poleAngle)) * scale;
	pole.position.z = basePoint[2] + poleRadius * scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	
	}
}


/*стекло в форме параллелограмма*/

function drawGlassShape(glassParams) {
	// константы
	var radius1 = 50;		// радиус скругления переднего нижнего угла первого стекла
	var radius2 = 10;		// радиус скругления заднего нижнего угла первого стекла
	var radius3 = 55;		// радиус скругления сопряжения нижней линии на стекле верхней площадке
	var holeRad = 9;		// радиус отверстий под рутели
	
	if (glassParams.glassType == "turnTop") {		// последнее стекло нижнего марша если сверху забег
		
		// определяем необходимые размеры 
		var glassWidth = glassParams.platformLengthTop - (glassParams.glassPosition.x - (glassParams.b1 * (glassParams.stairAmt-1) + 5)) - glassParams.glassDist;
		if (glassParams.middleMarsh) glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + glassParams.racksHoles[0].x - glassParams.glassPosition.x + 83;
		glassParams.glassWidth.push(glassWidth);
		var glassHeight = glassParams.glassHeight - glassParams.paltformGlassDeltaY + glassWidth * Math.tan(glassParams.turnAngleBot);
		glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassParams.glassWidth[glassParams.glassWidth.length - 2] + 200;

		// текст в dxf
		var text = 'Стекло марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(glassParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		glassParams.glassShape = new THREE.Shape();
		var holes = glassParams.glassShape.holes;
		
		// контур стекла
		var p0 = {x:0, y:0};
		var p1 = copyPoint(p0);
		var p2 = newPoint_xy(p0, 0, glassHeight);
		var p3 = newPoint_xy(p1, glassWidth, glassWidth * Math.tan(glassParams.turnAngleBot));
		var fil = fillet(p2, glassParams.turnAngleTop2, p3, Math.PI*0.5, 0);		
		addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
		addLine(glassParams.glassShape, dxfPrimitivesArr, p2, fil.start, glassParams.dxfBasePoint);
		addLine(glassParams.glassShape, dxfPrimitivesArr, fil.end, p3, glassParams.dxfBasePoint);
		addLine(glassParams.glassShape, dxfPrimitivesArr, p3, p1, glassParams.dxfBasePoint);
		
		// отверстия под рутели
		// первая пара отверстий
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		center1 = newPoint_xy(p0, glassParams.racksHoles[0].x - glassParams.glassPosition.x, glassParams.racksHoles[0].y - glassParams.glassPosition.y - glassParams.paltformGlassDeltaY + glassWidth * Math.tan(glassParams.turnAngleBot));
		center2 = newPoint_xy(center1, 0.0, -100);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
		// вторая пара отверстий
		center1 = newPoint_xy(p0, glassParams.racksHoles[1].x - glassParams.glassPosition.x, glassParams.racksHoles[1].y - glassParams.glassPosition.y - glassParams.paltformGlassDeltaY + glassWidth * Math.tan(glassParams.turnAngleBot));
		center2 = newPoint_xy(center1, 0.0, -100);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
		
		glassParams.racksHoles.splice(0, 2); // удаляем первые 2 элемента
		glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth;

	}
	else {
		if (glassParams.glassType == "turnBottom") {		// первое стекло верхнего марша если снизу забег
		// определяем необходимые размеры 

		var glassWidth = 83 + glassParams.basePointBottomTurnGlassOut.x - glassParams.racksHoles[0].x;
		glassParams.glassWidth.push(glassWidth);
		var glassHeight = glassParams.glassHeight;
		glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassParams.glassWidth[0] + 200;

		// текст в dxf
		var text = 'Стекло забежного участка внешней тетивы верхнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(glassParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		glassParams.glassShape = new THREE.Shape();
		var holes = glassParams.glassShape.holes;
		
		// контур стекла
		var p0 = {x:0, y:0};
		var p1 = copyPoint(p0);
		var p2 = newPoint_xy(p1, 0, glassHeight);
		addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = newPoint_xy(p1, -glassWidth, -glassWidth * Math.tan(glassParams.turnAngleTop1));
		addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p02 = newPoint_xy(p0, -glassWidth, -glassWidth * Math.tan(glassParams.turnAngleBot));
		p2 = newPoint_xy(p02, 0.0, glassParams.paltformGlassDeltaY + glassParams.glassIndent);
		addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
		var fil = fillet(p2, 0, p0, Math.PI + glassParams.turnAngleBot, radius2);
		addLine(glassParams.glassShape, dxfPrimitivesArr, p2, fil.start, glassParams.dxfBasePoint);
		addArc(glassParams.glassShape, dxfPrimitivesArr, fil.center, radius2, fil.angstart, fil.angend, glassParams.dxfBasePoint);
		addLine(glassParams.glassShape, dxfPrimitivesArr, fil.end, p0, glassParams.dxfBasePoint);
		
		// отверстия под рутели
		// первая пара отверстий
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		center1 = newPoint_xy(p0, 83 - glassWidth, glassParams.racksHoles[0].y - glassParams.basePointBottomTurnGlassOut.y - 10);
		center2 = newPoint_xy(center1, 0.0, -100);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
		// вторая пара отверстий
		center1 = newPoint_xy(center1, glassParams.racksHoles[1].x - glassParams.racksHoles[0].x, glassParams.racksHoles[1].y - glassParams.racksHoles[0].y);
		center2 = newPoint_xy(center1, 0.0, -100);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);/**/
		
		glassParams.racksHoles.splice(0, 2); // удаляем первые 2 элемента
		glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth;

		}
		else {
			if (glassParams.glassType == "platformBottom" || glassParams.glassType == "platformBottom1" || glassParams.glassType == "platformBottom2") {		// первое стекло верхнего марша если снизу площадка
				
				// определяем необходимые размеры 
				//var glassWidth = 95 + glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + 245;
				var glassWidth = 95 + glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.basePointBottomTurnGlassOut.x - 72.5) - glassParams.racksHoles[1].x;
				if (glassParams.P3) glassWidth = 80 + glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + 80;
				//if (typeof(glassParams.glassWidthCorrection) == "number") glassWidth = glassWidth - glassParams.glassWidthCorrection;

				if (glassParams.glassType == "platformBottom1") glassWidth = 95 + glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.centralHolesDistance - glassParams.glassDist)*0.5;
				//if (glassParams.glassType == "platformBottom2") glassWidth = (glassParams.centralHolesDistance - glassParams.glassDist)*0.5 + glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + 245;
				if (glassParams.glassType == "platformBottom2") glassWidth = (glassParams.centralHolesDistance - glassParams.glassDist)*0.5 + glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.basePointBottomTurnGlassOut.x-72.5) - glassParams.racksHoles[1].x;

				glassParams.glassWidth.push(glassWidth);
				var glassHeight = glassParams.glassHeight - glassParams.paltformGlassDeltaY;
//if (glassParams.P3) glassHeight = glassParams.glassHeight;
				glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassParams.glassWidth[0] + 200;

				// текст в dxf
				var text = 'Стекло нижней площадки верхнего марша';
				var textHeight = 30;
				var textBasePoint = newPoint_xy(glassParams.dxfBasePoint, 20, -150);
				addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
				
				glassParams.glassShape = new THREE.Shape();
				var holes = glassParams.glassShape.holes;
				
				// контур стекла
				var p0 = {x:0, y:0};
				var p1 = copyPoint(p0);
				var p2 = newPoint_xy(p1, 0, glassHeight);
				addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
				p1 = copyPoint(p2);
				p2 = newPoint_xy(p1, glassWidth, 0);
				addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
				p1 = copyPoint(p2);
				p2 = newPoint_xy(p1, 0.0, -glassHeight);
				addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
				addLine(glassParams.glassShape, dxfPrimitivesArr, p2, p0, glassParams.dxfBasePoint);
				
				// отверстия под рутели
				// первая пара отверстий
				hole1 = new THREE.Path();
				hole2 = new THREE.Path();
				center1 = newPoint_xy(p0, 95, - glassParams.racksHoles[0].y + glassParams.glassIndent + 5);
				if (glassParams.glassType == "platformBottom2") center1 = newPoint_xy(p0, glassParams.racksHoles[0].x - glassParams.glassPosition.x - glassParams.glassDist, - glassParams.racksHoles[0].y + glassParams.glassIndent + 5);
if (glassParams.P3) center1 = newPoint_xy(p0, 80, - glassParams.racksHoles[0].y + glassParams.glassIndent + 5);
				/*if (typeof(glassParams.glassWidthCorrection) == "number") {
					center1 = newPoint_xy(center1, -glassParams.glassWidthCorrection, 0);
					if (glassParams.lastMarsh) center1 = newPoint_xy(center1, glassParams.glassWidthCorrection -20, 0);
				}*/
				center2 = newPoint_xy(center1, 0.0, -60);
				addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
				addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
				// вторая пара отверстий
				center1 = newPoint_xy(center1, glassParams.racksHoles[1].x - glassParams.racksHoles[0].x, 0);
				center2 = newPoint_xy(center1, 0.0, -60);
				addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
				addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
				
				glassParams.racksHoles.splice(0, 2); // удаляем первые 2 элемента
				glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth;
			}
				else {
					if (glassParams.glassType == "firstBottomPlatform") {	// первое стекло на марше если снизу площадка
						// определяем необходимые размеры 

						var glassWidth = glassParams.racksHoles[1].x - glassParams.glassPosition.x + (glassParams.b3 - glassParams.glassDist)*0.5;
						glassParams.glassWidth.push(glassWidth);
						var glassHeight = glassParams.glassHeight/* - glassParams.paltformGlassDeltaY*/;
						
						glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassParams.glassWidth[1] + 200;

						// текст в dxf
						var text = 'Стекло внешнего ограждения верхнего марша';
						var textHeight = 30;
						var textBasePoint = newPoint_xy(glassParams.dxfBasePoint, 20, -150);
						addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
						
						glassParams.glassShape = new THREE.Shape();
						var holes = glassParams.glassShape.holes;
						
						// контур стекла
						var p0 = {x:0, y:0};
						var p1 = newPoint_xy(p0, 0, glassParams.paltformGlassDeltaY);
//if (typeof(glassParams.glassWidthCorrection) == "number") p1 = newPoint_xy(p0, 0, glassParams.paltformGlassDeltaY + glassParams.glassWidthCorrection);
//console.log(glassParams.paltformGlassDeltaY);
						var pDelta = copyPoint(p1);
						var p2 = newPoint_xy(p0, 0, glassHeight);
						addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
						p1 = copyPoint(p2);
						p2 = newPoint_xy(p1, glassWidth, glassWidth * Math.tan(glassParams.handrailAngle));
						addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
						p1 = copyPoint(p2);
						p2 = newPoint_xy(p1, 0.0, -glassHeight);
						addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
						var fil = fillet(p2, Math.PI + glassParams.handrailAngle, pDelta, 0, radius2);
						addLine(glassParams.glassShape, dxfPrimitivesArr, p2, fil.start, glassParams.dxfBasePoint);
						addArc(glassParams.glassShape, dxfPrimitivesArr, fil.center, radius2, fil.angstart, fil.angend, glassParams.dxfBasePoint);
						addLine(glassParams.glassShape, dxfPrimitivesArr, fil.end, pDelta, glassParams.dxfBasePoint);
						
						// отверстия под рутели
						// первая пара отверстий
						hole1 = new THREE.Path();
						hole2 = new THREE.Path();
						center1 = newPoint_xy(p0, glassParams.racksHoles[0].x - glassParams.glassPosition.x - glassParams.glassDist, glassParams.racksHoles[0].y - glassParams.glassPosition.y + glassParams.paltformGlassDeltaY);
						center2 = newPoint_xy(center1, 0.0, -100);
						addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
						addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
						// вторая пара отверстий
						center1 = newPoint_xy(center1, glassParams.racksHoles[1].x - glassParams.racksHoles[0].x, glassParams.racksHoles[1].y - glassParams.racksHoles[0].y);
						center2 = newPoint_xy(center1, 0.0, -100);
						addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
						addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
						
						glassParams.racksHoles.splice(0, 2); // удаляем первые 2 элемента
						glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth;
					}
					else {
						if (glassParams.glassType == "turnBackP" || glassParams.glassType == "turnBackP2") {		// первое стекло на забежном участке П-образной с забегом

							// определяем необходимые размеры 
							//var glassWidth = glassParams.platformLengthTop - (glassParams.glassPosition.x - (glassParams.b1 * (glassParams.stairAmt-1) + 5)) - glassParams.glassDist;
							var glassWidth = (glassParams.centralHolesDistace - glassParams.glassDist)*0.5 + (glassParams.racksHoles[1].x - glassParams.racksHoles[0].x) + (83 - glassParams.glassDist);
							glassParams.glassWidth.push(glassWidth);
							var glassHeight = glassParams.glassHeight;
							glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth + 200;

							// текст в dxf
							var text = 'Первое стекло забежного участка';
							var textHeight = 30;
							var textBasePoint = newPoint_xy(glassParams.dxfBasePoint, 20, -150);
							addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
							
							glassParams.glassShape = new THREE.Shape();
							var holes = glassParams.glassShape.holes;
							
							// контур стекла
							var p0 = {x:0, y:0};
							if (glassParams.glassType == "turnBackP") {
								var p1 = newPoint_xy(p0, 0, glassParams.paltformGlassDeltaY1 + glassParams.glassIndent - glassParams.glassDist*Math.tan(glassParams.turnAngle));
								var p2 = newPoint_xy(p0, 0, glassHeight);
								var p3 = newPoint_xy(p2, glassWidth, glassWidth * Math.tan(glassParams.turnAngle));
								var p4 = newPoint_xy(p3, 0, -glassHeight);
								var fil = fillet(p4, Math.PI + glassParams.turnAngle, p1, 0, radius2);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p2, p3, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p3, p4, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p4, fil.start, glassParams.dxfBasePoint);
								addArc(glassParams.glassShape, dxfPrimitivesArr, fil.center, radius2, fil.angstart, fil.angend, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, fil.end, p1, glassParams.dxfBasePoint);
							}
							if (glassParams.glassType == "turnBackP2") {
								var p1 = copyPoint(p0);
								var p2 = newPoint_xy(p0, 0, glassHeight);
								var p3 = newPoint_xy(p2, glassWidth, glassWidth * Math.tan(glassParams.turnAngle));
								var p4 = newPoint_xy(p3, 0, -glassHeight);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p2, p3, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p3, p4, glassParams.dxfBasePoint);
								addLine(glassParams.glassShape, dxfPrimitivesArr, p4, p1, glassParams.dxfBasePoint);
							}
							
							// отверстия под рутели
							// первая пара отверстий
							hole1 = new THREE.Path();
							hole2 = new THREE.Path();
							center1 = newPoint_xy(p1, 83 - glassParams.glassDist, 180 + glassParams.glassDist*Math.tan(glassParams.turnAngle));
							if (glassParams.glassType == "turnBackP2") center1 = newPoint_xy(p1, glassParams.racksHoles[0].x - glassParams.glassPosition.x, glassParams.racksHoles[0].y - glassParams.glassPosition.y);
							//center2 = newPoint_xy(center1, 0.0, -120);
							center2 = newPoint_xy(center1, 0.0, -100);
							addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
							addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
							// вторая пара отверстий
							center1 = newPoint_xy(center1, glassParams.racksHoles[1].x - glassParams.racksHoles[0].x, glassParams.racksHoles[1].y - glassParams.racksHoles[0].y);
							//center2 = newPoint_xy(center1, 0.0, -120);
							center2 = newPoint_xy(center1, 0.0, -100);
							addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
							addRoundHole(glassParams.glassShape, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
							
							glassParams.racksHoles.splice(0, 2); // удаляем первые 2 элемента
							glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth;

						}
						else {
    var glassHeight1 = glassParams.glassHeight;
	if (glassParams.glassType == "platform" || glassParams.glassType == "platformBack" || glassParams.glassType == "platformBackP" || glassParams.glassType == "platform1" || glassParams.glassType == "platform2") {
		glassHeight1 = glassHeight1 - glassParams.paltformGlassDeltaY;
	}
	
	if (glassParams.glassType == "first" || glassParams.glassType == "first1") {
		//var glassWidth = glassParams.racksHoles[2].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist) / 2 + glassParams.a1 / 2 - glassParams.glassIndent + 5;
		if (glassParams.lastMarsh) {
			//glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist) / 2 + glassParams.a1 / 2 - glassParams.glassIndent + 5;
			glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist) / 2 + glassParams.a1 / 2 - glassParams.glassIndent + 5 - 50;
			if (typeof(glassParams.glassWidthCorrection) == "number") {
				glassWidth = glassWidth + glassParams.glassWidthCorrection;
			}
		}
		else {
			var glassWidth = glassParams.racksHoles[2].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist) / 2 + glassParams.a1 / 2 - glassParams.glassIndent + 5;
		}
		if (glassParams.P3 && glassParams.lastMarsh && glassParams.bottomEnd == "нет") glassWidth = 40 + (glassParams.racksHoles[1].x - glassParams.racksHoles[0].x) + (glassParams.b1 - glassParams.glassDist)/2;
	}
	else {
		if (glassParams.glassType == "last") {
			var glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist) * 0.5 + 60;
			if (glassParams.glassWidthCorrection) {
				if (typeof(glassParams.glassWidthCorrection) == "number") {
					glassWidth = glassWidth + glassParams.glassWidthCorrection;
//console.log(glassParams);
				}
			}
if (glassParams.P3 && glassParams.middleMarsh && glassParams.bottomEnd == "нет") glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist)/* * 0.5*/;
		}
		else {
			if (glassParams.glassType == "platform" || glassParams.glassType == "platform2") {
				var glassWidth = glassParams.platformLengthTop - (glassParams.glassPosition.x - (glassParams.b1 * (glassParams.stairAmt-1) + 5)) - glassParams.glassDist;
				if (glassParams.middleMarsh) var glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + glassParams.racksHoles[0].x - glassParams.glassPosition.x + 155;
			}
			else {
				if (glassParams.glassType == "platformBack") {
					var glassWidth = glassParams.platformLengthTop - 2*glassParams.glassIndent;
				}
				else {
					if (glassParams.glassType == "platform1") {
						var glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (120 - glassParams.glassDist)/2 + (glassParams.racksHoles[0].x - glassParams.glassPosition.x + glassParams.glassDist);
					}
					else {
						if (glassParams.glassType == "platformBackP") {
							var glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + 100 - 8 + (glassParams.centralHolesDistace - glassParams.glassDist)*0.5;
						}
						else {
							var glassWidth = glassParams.racksHoles[1].x - glassParams.racksHoles[0].x + (glassParams.b1 - glassParams.glassDist);
							if (glassParams.glassWidthCorrection) {
								if (typeof(glassParams.glassWidthCorrection) == "boolean") {
									glassWidth = glassParams.racksHoles[1].x - glassParams.basePointBottomTurnGlassOut.x + (glassParams.b1 - glassParams.glassDist)*0.5;
								}
							}
						}
					}
				}
			}
		}
	}

	glassParams.glassWidth.push(glassWidth);	// сохраняем ширину стекла в массив чтобы использовать её при позиционировании
	
	var glassHeight2 = glassWidth * Math.tan(glassParams.handrailAngle);
	if (glassParams.glassType == "platform" || glassParams.glassType == "platformBack" || glassParams.glassType == "platform1" || glassParams.glassType == "platform2") {
		glassHeight2 = 0;
	}
	

    glassParams.glassShape = new THREE.Shape();
	if (glassParams.glassType != "first" && glassParams.glassType != "platformBack") {
		glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassParams.glassWidth[0] + 200;
	}

	// текст в dxf
	var text = 'Стекло марша';
	if (glassParams.glassType == "platform" || glassParams.glassType == "platform1" || glassParams.glassType == "platform2") {
		text = "Стекло платформы";
	}
	if (glassParams.glassType == "platformBack" || glassParams.glassType == "platformBackP") {
		text = "Стекло заднего ограждения платформы";
	}
    var textHeight = 30;
    var textBasePoint = newPoint_xy(glassParams.dxfBasePoint, 20, -150);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
	
	var holes = glassParams.glassShape.holes;
	
	var p0 = {x:0, y:0};
	
	// передняя вертикальная линия
	// для первого стекла
	if (glassParams.glassType == "first" || glassParams.glassType == "first1") {
		if (!glassParams.lastMarsh) {
			var p1 = newPoint_xy(p0, 0.0, glassParams.rackOffsetY - 5 - glassParams.glassIndent / Math.cos(glassParams.handrailAngle));
			var ph = copyPoint(p1);
			var pc1 = newPoint_xy(p1, radius1, radius1);
			var p_start = newPoint_xy(pc1, 0, -radius1);
			addArc(glassParams.glassShape, dxfPrimitivesArr, pc1, radius1, Math.PI * 1.5, Math.PI, glassParams.dxfBasePoint);
			p1 = newPoint_xy(pc1, -radius1, 0.0);
		}
		else {
			var p1 = polar(p0, glassParams.handrailAngle, 100);
			var p2 = polar(p0, Math.PI*0.5, 100);
			var fil0 = fillet(p1, Math.PI + glassParams.handrailAngle, p2, Math.PI*1.5, radius1);
			var p_start = copyPoint(fil0.start);
			var ph = copyPoint(p0);
			addArc(glassParams.glassShape, dxfPrimitivesArr, fil0.center, radius1, fil0.angstart, fil0.angend, glassParams.dxfBasePoint);
			p1 = copyPoint(fil0.end);
			glassParams.basePointCoordinate = newPoint_xy(fil0.center, -radius1, -radius1);
		}
	}
	else {
		var p1 = copyPoint(p0);
	}
	var p2 = newPoint_xy(p0, 0, glassHeight1);
	addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
	// верхнияя линия вдоль марша
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, glassWidth, glassHeight2);
	addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0.0, - glassHeight1);
	addLine(glassParams.glassShape, dxfPrimitivesArr, p1, p2, glassParams.dxfBasePoint);
	if (glassParams.glassType == "first" || glassParams.glassType == "first1") {
		if (!glassParams.lastMarsh) {
			var fil = fillet(p2, Math.PI + glassParams.handrailAngle, p_start, 0, radius2);
			addLine(glassParams.glassShape, dxfPrimitivesArr, p2, fil.start, glassParams.dxfBasePoint);
			addArc(glassParams.glassShape, dxfPrimitivesArr, fil.center, radius2, fil.angstart, fil.angend, glassParams.dxfBasePoint);
			addLine(glassParams.glassShape, dxfPrimitivesArr, fil.end, p_start, glassParams.dxfBasePoint);
		}
		else {
			addLine(glassParams.glassShape, dxfPrimitivesArr, p2, p_start, glassParams.dxfBasePoint);
		}
	}
	else {
		addLine(glassParams.glassShape, dxfPrimitivesArr, p2, p0, glassParams.dxfBasePoint);
	}
	// отверстия под рутели
	// для первого стекла
	if (glassParams.glassType == "first" || glassParams.glassType == "first1") {
		// первое отверстие нижнего или пара отверстий верхнего марша
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		var center1 = newPoint_xy(ph, glassParams.racksHoles[0].x - glassParams.glassIndent, glassParams.racksHoles[0].y - glassParams.glassIndent);
		if (glassParams.lastMarsh) {
			//var center1 = newPoint_xy(ph, glassParams.racksHoles[0].x - glassParams.glassIndent, glassParams.racksHoles[0].y - glassParams.glassIndent);
			//var center1 = newPoint_xy(ph, glassParams.b1/2 -50, glassParams.rackOffsetY - 50 * Math.tan(glassParams.handrailAngle) - 10/Math.cos(glassParams.handrailAngle) - 10*Math.tan(glassParams.handrailAngle) + glassParams.h1 - 115);
var center1 = newPoint_xy(ph, glassParams.b1/2 -50, glassParams.rackOffsetY - 50 * Math.tan(glassParams.handrailAngle) - glassParams.glassIndent/Math.cos(glassParams.handrailAngle) - glassParams.glassIndent + glassParams.h1 - 110);
			if (typeof(glassParams.glassWidthCorrection) == "number") {
				center1 =  newPoint_xy(center1, glassParams.glassWidthCorrection, glassParams.glassWidthCorrection*Math.tan(glassParams.handrailAngle));
			}
//if (glassParams.lastMarsh && !glassParams.middleMarsh) //console.log(glassParams.glassWidthCorrection, center1);

		}
if (glassParams.P3 && glassParams.bottomEnd == "площадка") center1 = newPoint_xy(ph, glassParams.racksHoles[0].x - glassParams.glassPosition.x - glassParams.glassDist, glassParams.racksHoles[0].y - glassParams.glassPosition.y + glassParams.basePointCoordinate.y);
if (glassParams.P3 && glassParams.lastMarsh && glassParams.bottomEnd == "нет") center1 = newPoint_xy(ph, glassParams.racksHoles[0].x - glassParams.glassPosition.x - 50, glassParams.racksHoles[0].y - glassParams.glassPosition.y - 50*Math.tan(glassParams.handrailAngle));
		var center2 = newPoint_xy(center1, 0.0, -100);
		addCircle(hole1, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		holes.push(hole1);
		if (glassParams.lastMarsh) {
			addCircle(hole2, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
			holes.push(hole2);
		}
		// первая пара отверстий
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		if (!glassParams.lastMarsh) {
			center1 = newPoint_xy(ph, glassParams.racksHoles[1].x - glassParams.glassIndent, glassParams.racksHoles[1].y - glassParams.glassIndent);
			//center1 = newPoint_xy(ph, glassParams.racksHoles[1].x - glassParams.glassIndent - glassParams.glassDist, glassParams.racksHoles[1].y - glassParams.glassIndent - (glassParams.glassIndent/Math.cos(handrailAngle) + glassParams.glassDist*Math.tan(glassParams.handrailAngle)));
		}
		else {
			center1 = newPoint_xy(center1, glassParams.racksHoles[1].x - glassParams.racksHoles[0].x, glassParams.racksHoles[1].y - glassParams.racksHoles[0].y);
		}
		//center2 = newPoint_xy(center1, 0.0, -120);
		center2 = newPoint_xy(center1, 0.0, -100);
		addCircle(hole1, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addCircle(hole2, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
		holes.push(hole1);
		holes.push(hole2);
		// вторая пара отверстий
		if (!glassParams.lastMarsh) {
			hole1 = new THREE.Path();
			hole2 = new THREE.Path();
			center1 = newPoint_xy(ph, glassParams.racksHoles[2].x - glassParams.glassIndent, glassParams.racksHoles[2].y - glassParams.glassIndent);
			//center2 = newPoint_xy(center1, 0.0, -120);
			center2 = newPoint_xy(center1, 0.0, -100);
if (glassParams.glassType == "first1") center2 = newPoint_xy(center1, 0.0, -100);
			addCircle(hole1, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
			addCircle(hole2, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
			holes.push(hole1);
			holes.push(hole2);
		}
		if (!glassParams.lastMarsh) {
			glassParams.racksHoles.splice(0, 3); // удаляем первые 3 элемента
		}
		else {
			glassParams.racksHoles.splice(0, 2); // удаляем первые 3 элемента
		}
	}
	// для остальных стекол
	else {
		// первая пара отверстий
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		if (glassParams.glassType == "platformBack" || glassParams.glassType == "platformBackP") {
			center1 = newPoint_xy(p0, glassParams.racksHoles[0].x - glassParams.glassIndent, 150 + glassParams.racksHoles[0].y - glassParams.glassIndent);
			if (glassParams.glassType == "platformBackP") center1 = newPoint_xy(center1, -glassParams.glassPosition.x, 0);
			center2 = newPoint_xy(center1, 0.0, -60);
		}
		else {
			center1 = newPoint_xy(p0, glassParams.racksHoles[0].x - glassParams.glassPosition.x, glassParams.racksHoles[0].y - glassParams.glassPosition.y);
			/*if (glassParams.holesCorrection) {
				center1 = newPoint_xy(p0, glassParams.racksHoles[0].x - glassParams.glassPosition.x - glassParams.holesCorrection.x, glassParams.racksHoles[0].y - glassParams.glassPosition.y - glassParams.holesCorrection.y);
				
			}*/
			//center2 = newPoint_xy(center1, 0.0, -120);
			center2 = newPoint_xy(center1, 0.0, -100);
		}
		if (glassParams.glassType == "platform" || glassParams.glassType == "platform1" || glassParams.glassType == "platform2") {
			center1.y = center1.y - glassParams.paltformGlassDeltaY;
			center2 = newPoint_xy(center1, 0.0, -60);
		}
		addCircle(hole1, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addCircle(hole2, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
		holes.push(hole1);
		holes.push(hole2)
		// вторая пара отверстий
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		if (glassParams.glassType == "platformBack" || glassParams.glassType == "platformBackP") {
			center1 = newPoint_xy(p0, glassParams.racksHoles[1].x - glassParams.glassIndent, 150 + glassParams.racksHoles[1].y - glassParams.glassIndent);
			if (glassParams.glassType == "platformBackP") center1 = newPoint_xy(center1, -glassParams.glassPosition.x, 0);
			center2 = newPoint_xy(center1, 0.0, -60);
			center2 = newPoint_xy(center1, 0.0, -60);
		}
		else {
			center1 = newPoint_xy(p0, glassParams.racksHoles[1].x - glassParams.glassPosition.x, glassParams.racksHoles[1].y - glassParams.glassPosition.y);
			if (glassParams.holesCorrection) center1 = newPoint_xy(p0, glassParams.racksHoles[1].x - glassParams.glassPosition.x - glassParams.holesCorrection.x, glassParams.racksHoles[1].y - glassParams.glassPosition.y - glassParams.holesCorrection.y);
			//center2 = newPoint_xy(center1, 0.0, -120);
			center2 = newPoint_xy(center1, 0.0, -100);
			if (glassParams.topEnd == "нет" && glassParams.glassType == "last") center2 = newPoint_xy(center1, 0.0, -100);
		}
		if (glassParams.glassType == "platform" || glassParams.glassType == "platform1" || glassParams.glassType == "platform2") {
			center1.y = center1.y - glassParams.paltformGlassDeltaY;
			center2 = newPoint_xy(center1, 0.0, -60);
		}
		addCircle(hole1, dxfPrimitivesArr, center1, holeRad, glassParams.dxfBasePoint);
		addCircle(hole2, dxfPrimitivesArr, center2, holeRad, glassParams.dxfBasePoint);
		holes.push(hole1);
		holes.push(hole2);/**/
		
		glassParams.racksHoles.splice(0, 2); // удаляем первые 2 элемента
		
	}
	if (glassParams.glassType == "platform" || glassParams.glassType == "platformBack" || glassParams.glassType == "platformBackP" || glassParams.glassType == "platform1") {
		glassParams.dxfBasePoint.x = glassParams.dxfBasePoint.x + glassWidth;
//console.log(glassParams.dxfBasePoint.x);
	}
	}
				}
				}
	}
	}
    return glassParams;
}	// end of drawGlassShape();

function draw4AngleGlass(par){
	/*исходные данные:
	p1 - левая нижняя точка
	p2 - правая нижняя точка
	height - высота
	offsetLeft - отступ справа
	offsetRight - отступ слева
	offsetY - отступ вверх
	material - материал
	thickness - толщина
	dxfPrimitivesArr
	dxfBasePoint
	*/
	var shape = new THREE.Shape();
	var angleX = angle(par.p1, par.p2)
	//console.log(angleX/Math.PI*180)
	var p1 = newPoint_x1(par.p1, par.offsetLeft, angleX); //левый нижний угол
		p1 = newPoint_xy(p1, 0, par.offsetY); //поднимаем вверх
	var p2 = newPoint_x1(par.p2, -par.offsetRight, angleX); //правый нижний угол
		p2 = newPoint_xy(p2, 0, par.offsetY); //поднимаем вверх
		
	var p3 = newPoint_xy(p2, 0, par.height) //верхний правый угол
	var p4 = newPoint_xy(p1, 0, par.height) //верхний левый угол
	
	addLine(shape, par.dxfPrimitivesArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfPrimitivesArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfPrimitivesArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfPrimitivesArr, p4, p1, par.dxfBasePoint);
	
	var extrudeOptions = {
        amount: par.thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};
	
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom, par.material);
	
	par.mesh = mesh;
	
	return par;
}//end of draw4AngleGlass





function draw4angleShape(handrailParams) {
	/*
	handrailParams.type							// тип поручня
	handrailParams.handrailAngle				// угол наклона поручня
	handrailParams.handrailProfileHeight		// высота профиля поручня
	handrailParams.handrailLength				// длина поручня
	handrailParams.dxfBasePoint
	*/
    handrailParams.handrailShape = new THREE.Shape();
	var p0 = {x: 0, y: 0};
	var p1 = copyPoint(p0);
	// поручень марша
	if (handrailParams.type == "") {
		// текст в dxf
		var text = 'Поручень нижнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, handrailParams.handrailAngle, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle / 2, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle / 2));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень марша если сверху забег
	if (handrailParams.type == "marshTurnTop") {
		// текст в dxf
		var text = 'Поручень нижнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, handrailParams.handrailAngle, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle*0.5 + handrailParams.turnAngleTop * 0.5, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle*0.5 - handrailParams.turnAngleTop*0.5));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень марша если снизу забег
	if (handrailParams.type == "marshTurnBottom") {
		// текст в dxf
		var text = 'Поручень верхнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle - (handrailParams.handrailAngle - handrailParams.turnAngleTop)*0.5, handrailParams.handrailProfileHeight/Math.cos((handrailParams.handrailAngle - handrailParams.turnAngleTop)*0.5));
//console.log(handrailParams.handrailAngle, handrailParams.turnAngleTop);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, handrailParams.handrailAngle, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		/*p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle*0.5 + handrailParams.turnAngleTop * 0.5, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle*0.5 - handrailParams.turnAngleTop*0.5));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;*/
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle / 2, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle / 2));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень марша если снизу площадка
	if (handrailParams.type == "marshPlatformBottom") {
		// текст в dxf
		var text = 'Поручень верхнего марша внешний';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle*0.5, handrailParams.handrailProfileHeight/Math.cos(handrailParams.handrailAngle*0.5));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, handrailParams.handrailAngle, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		/*p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle*0.5 + handrailParams.turnAngleTop * 0.5, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle*0.5 - handrailParams.turnAngleTop*0.5));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;*/
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle / 2, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle / 2));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень площадки если площадка
	if (handrailParams.type == "platformTop") {
		// текст в dxf
		var text = 'Поручень верхней платформы';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle * 0.5, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle / 2));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, 0, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень площадки если забег
	if (handrailParams.type == "turnTop") {
		// текст в dxf
		var text = 'Поручень забежного участка нижнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle * 0.5 - handrailParams.turnAngleTop * 0.5, handrailParams.handrailProfileHeight / Math.cos(handrailParams.handrailAngle * 0.5 - handrailParams.turnAngleTop * 0.5));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, 0, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5, handrailParams.handrailProfileHeight/Math.cos(handrailParams.turnAngleTop));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень площадки если забег снизу
	if (handrailParams.type == "turnBottom") {
		// текст в dxf
		var text = 'Поручень забежного участка верхнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.turnAngleTop, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, handrailParams.turnAngleTop, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.turnAngleTop + (handrailParams.handrailAngle - handrailParams.turnAngleTop)*0.5, handrailParams.handrailProfileHeight/Math.cos((handrailParams.handrailAngle - handrailParams.turnAngleTop)*0.5));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень нижней площадки верхнего марша
	if (handrailParams.type == "platformBottom") {
		// текст в dxf
		var text = 'Поручень нижней площадки верхнего марша';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		var p2 = polar(p1, Math.PI * 0.5, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, 0, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle*0.5, handrailParams.handrailProfileHeight/Math.cos(handrailParams.handrailAngle*0.5));
if (handrailParams.P3) p2 = polar(p1, Math.PI * 1.5, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
//console.log(handrailParams.dxfBasePoint.x);
	}
	// поручень забежного участка П-образной с забегом
	if (handrailParams.type == "turnBack") {
		// текст в dxf
		var text = 'поручень забежного участка';
		var textHeight = 30;
		var textBasePoint = newPoint_xy(handrailParams.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
		
		// контур
		//var p2 = polar(p1, Math.PI * 0.5, handrailParams.handrailProfileHeight);
		var p2 = polar(p1, Math.PI * 0.5 + handrailParams.handrailAngle, handrailParams.handrailProfileHeight);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, handrailParams.handrailAngle, handrailParams.handrailLength);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		p1 = copyPoint(p2);
		p2 = polar(p1, Math.PI * 1.5 + handrailParams.handrailAngle, handrailParams.handrailProfileHeight/Math.cos(handrailParams.handrailAngle));
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p1, p2, handrailParams.dxfBasePoint);
		addLine(handrailParams.handrailShape, dxfPrimitivesArr, p2, p0, handrailParams.dxfBasePoint);
		handrailParams.lastPoint = p2;
		handrailParams.dxfBasePoint.x = handrailParams.dxfBasePoint.x + handrailParams.handrailLength + 200;
	}
    return handrailParams;
}	// end of draw4angleShape();


/*параллелограмм*/

function draw4angleShape_0(angleBottom, angleTop, width, leftHeight, scale) {
var glassShape = new THREE.Shape();
	glassShape.moveTo(0, 0);	
	var x = 0;
	var y = leftHeight * scale;
	glassShape.lineTo(x, y);
	x = width * scale;
	y = y + width * Math.tan(angleTop) * scale;
	glassShape.lineTo(x, y);
	x = x;
	y = width * Math.tan(angleBottom) * scale;
	glassShape.lineTo(x, y);
	glassShape.lineTo(0, 0);	
	return glassShape;
}


/*кованая балясина*/


function drawForgedBanister(length, type, basePoint, scale, railingMaterial, railingSection) {

    var testValue = getInputValue("testValue");
    var banisterLength = length;
    var poleSize = 12;
    var banisterExtrudeOptions = {
        amount: 12 * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
	

	 if (type == "20х20"){
		poleSize = 20;
		var poleGeometry = new THREE.BoxGeometry(poleSize, banisterLength, poleSize);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2;
        pole.position.z = basePoint[2];
        pole.castShadow = true;
        railingSection.add(pole);
		}

    if (type == "bal_1" || type == "bal_3") {
        //шишка
        var bulbGeometry = new THREE.OctahedronGeometry(25 * scale, 0);
        var bulb = new THREE.Mesh(bulbGeometry, railingMaterial);
        bulb.rotation.y = Math.PI / 4;
        bulb.position.x = basePoint[0];
        bulb.position.y = basePoint[1] + banisterLength / 2 * scale;
        bulb.position.z = basePoint[2] + poleSize / 2 * scale;
        bulb.castShadow = true;
        railingSection.add(bulb);
        //stairCase.push(bulb); 

        //палка
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, banisterLength * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);
    }

    if (type == "bal_2" || type == "bal_4") {
        //шишка
        var bulbGeometry = new THREE.OctahedronGeometry(25 * scale, 0);
        var bulb = new THREE.Mesh(bulbGeometry, railingMaterial);
        bulb.rotation.y = Math.PI / 4;
        bulb.position.x = basePoint[0];
        bulb.position.y = basePoint[1] + banisterLength / 3 * scale;
        bulb.position.z = basePoint[2] + poleSize / 2 * scale;
        bulb.castShadow = true;
        railingSection.add(bulb);
        //stairCase.push(bulb); 

        var bulb = new THREE.Mesh(bulbGeometry, railingMaterial);
        bulb.rotation.y = Math.PI / 4;
        bulb.position.x = basePoint[0];
        bulb.position.y = basePoint[1] + banisterLength * 2 / 3 * scale;
        bulb.position.z = basePoint[2] + poleSize / 2 * scale;
        bulb.castShadow = true;
        railingSection.add(bulb);
        //stairCase.push(bulb);

        //палка
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, banisterLength * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);
    }

    if (type == "bal_5" || type == "bal_9") {
        var rad1 = 40;
        var rad2 = 50;
        var height1 = banisterLength / 2 - rad2 * 2;
        var banisterPart1 = new THREE.Shape();
        banisterPart1.moveTo(0, 0);
        banisterPart1.lineTo(0, height1 * scale);
        banisterPart1.arc(0, rad2 * scale, rad2 * scale, 1.5 * Math.PI, 0, true);
        banisterPart1.lineTo(rad1 * scale, (height1 + rad2) * scale);
        banisterPart1.arc(-rad1 * scale, 0, rad1 * scale, 0, 1.5 * Math.PI, true);
        banisterPart1.lineTo(poleSize * scale, (height1 + poleSize) * scale);
        banisterPart1.lineTo(poleSize * scale, height1 * scale);
        banisterPart1.lineTo(poleSize * scale, 0);
        banisterPart1.lineTo(0, 0);

        var banisterPart2 = new THREE.Shape();
        banisterPart2.moveTo(poleSize * scale, banisterLength * scale);
        banisterPart2.lineTo(poleSize * scale, (banisterLength - height1) * scale);
        banisterPart2.arc(0, -rad2 * scale, rad2 * scale, 0.5 * Math.PI, -Math.PI, true);
        banisterPart2.lineTo(-(rad1 - poleSize) * scale, (banisterLength - height1 - rad2) * scale);
        banisterPart2.arc(rad1 * scale, 0, rad1 * scale, -Math.PI, 0.5 * Math.PI, true);
        banisterPart2.lineTo(0 * scale, (banisterLength - height1 - poleSize) * scale);
        banisterPart2.lineTo(0 * scale, banisterLength * scale);

        var banisterShape = [banisterPart1, banisterPart2];
        var geom = new THREE.ExtrudeGeometry(banisterShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var banister = new THREE.Mesh(geom, railingMaterial);
        banister.position.x = basePoint[0];
        banister.position.y = basePoint[1];
        banister.position.z = basePoint[2];
        banister.castShadow = true;
        railingSection.add(banister);
        //stairCase.push(banister);


    }

    if (type == "bal_6") {
        var bagelWidth = 70;
        var bagelHeight = 140;

        var bagelShape = drawBagel(bagelWidth, bagelHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        //бублик 1
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0];
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //бублик 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI;
        bagel2.position.x = basePoint[0];
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //палка
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, banisterLength * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);	
    }

    if (type == "bal_7") {
        var bagelWidth = 70;
        var bagelHeight = 140;

        var bagelShape = drawBagel(bagelWidth, bagelHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        //бублик 1
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0];
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 3 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //бублик 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI;
        bagel2.position.x = basePoint[0];
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength / 3 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //бублик 3
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0];
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength * 2 / 3 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //бублик 4
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI;
        bagel2.position.x = basePoint[0];
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength * 2 / 3 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);



        //палка
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, banisterLength * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);	
    }

    if (type == "bal_8") {
        var bagelWidth = 50;
        var bagelHeight = 120;

        var bagelShape = drawBagel(bagelWidth, bagelHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        //бублик 1

        var deltaX = bagelWidth * scale + bagelHeight * 0.5 * scale;
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0] - deltaX;
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //бублик 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = 0.75 * Math.PI;
        bagel2.position.x = basePoint[0] + bagelHeight * 1 * scale - deltaX;
        bagel2.position.y = basePoint[1] + bagelHeight * 1.6 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //бублик 3
        var bagel3 = new THREE.Mesh(geom, railingMaterial);
        bagel3.rotation.z = 1.25 * Math.PI;
        bagel3.position.x = basePoint[0] + bagelHeight * 0.3 * scale - deltaX;
        bagel3.position.y = basePoint[1] + bagelHeight * 0.1 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel3.position.z = basePoint[2];
        bagel3.castShadow = true;
        railingSection.add(bagel3);
        //stairCase.push(bagel3);

        //бублик 4

        var deltaX = bagelWidth * scale + bagelHeight * 0.5 * scale;
        var bagel4 = new THREE.Mesh(geom, railingMaterial);
        bagel4.rotation.z = Math.PI;
        bagel4.position.x = basePoint[0] + bagelWidth * scale + bagelHeight * 0.5 * scale;
        bagel4.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel4.position.z = basePoint[2];
        bagel4.castShadow = true;
        railingSection.add(bagel4);
        //stairCase.push(bagel4);

        //бублик 5
        var bagel5 = new THREE.Mesh(geom, railingMaterial);
        bagel5.rotation.z = 0.25 * Math.PI;
        bagel5.position.x = basePoint[0] + bagelHeight * 0.65 * scale;
        bagel5.position.y = basePoint[1] + bagelHeight * 0.9 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel5.position.z = basePoint[2];
        bagel5.castShadow = true;
        railingSection.add(bagel5);
        //stairCase.push(bagel5);

        //бублик 6
        var bagel6 = new THREE.Mesh(geom, railingMaterial);
        bagel6.rotation.z = -0.25 * Math.PI;
        bagel6.position.x = basePoint[0] - bagelHeight * 0.1 * scale;
        bagel6.position.y = basePoint[1] - bagelHeight * 1.1 * scale + banisterLength / 2 * scale;
        bagel6.position.z = basePoint[2];
        bagel6.castShadow = true;
        railingSection.add(bagel6);
        //stairCase.push(bagel6);

        //шишка 
        var bulbGeometry = new THREE.OctahedronGeometry(25 * scale, 0);
        var bulb = new THREE.Mesh(bulbGeometry, railingMaterial);
        bulb.rotation.y = Math.PI / 4;
        bulb.position.x = basePoint[0];
        bulb.position.y = basePoint[1] + banisterLength / 2 * scale;
        bulb.position.z = basePoint[2] + poleSize / 2 * scale;
        bulb.castShadow = true;
        railingSection.add(bulb);
        //stairCase.push(bulb); 

        //палка
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, banisterLength * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);	
    }

    if (type == "bal_10" || type == "bal_11") {

        //палка
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, banisterLength * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + banisterLength / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);
    }

    if (type == "bal_12") {
        /*волюта*/
        var radBottom = 65;
        var radTop = 65;
        var valutHeight = 400;
        var poleSize = 12;
        var valutShape = drawValut(radBottom, radTop, valutHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(valutShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var dist = valutHeight - radBottom - radTop;
        var angle = Math.atan((radBottom + radTop - poleSize) / dist);
        var valutHeightRotated = dist / Math.cos(angle) + radBottom + radTop;


        var valut1 = new THREE.Mesh(geom, railingMaterial);
        valut1.rotation.z = -angle;
        valut1.position.x = basePoint[0] - (radBottom - poleSize / 2) * scale;
        valut1.position.y = basePoint[1] + radBottom * (1 + Math.sin(angle)) * scale + (banisterLength - valutHeightRotated) * 0.5 * scale;
        valut1.position.z = basePoint[2];
        valut1.castShadow = true;
        railingSection.add(valut1);
        //stairCase.push(valut1);

        /*бублики*/
        var bagelWidth = 70;
        var bagelHeight = 120;
        var poleSize = 12;
        var bagelShape = drawBagel(bagelWidth, bagelHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.rotation.z = -angle;
        bagel1.position.x = basePoint[0] - bagelHeight / 2 * scale * Math.sin(angle);
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale * Math.cos(angle) + banisterLength / 2 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI - angle;
        bagel2.position.x = basePoint[0] + bagelHeight / 2 * scale * Math.sin(angle);
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale * Math.cos(angle) + banisterLength / 2 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        /*окончания*/
        var length = (banisterLength - valutHeightRotated) * 0.5;
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, length * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + length / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);

        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + 1.5 * length * scale + valutHeightRotated * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);


    }

    if (type == "bal_13") {
        /*волюта*/
        var radBottom = 55;
        var radTop = 25;
        var valutHeight = 300;
        var poleSize = 12;
        var valutShape = drawValut(radBottom, radTop, valutHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(valutShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var angle = 26 / 180 * Math.PI;
        var valutHeightRotated = 445;

        var valut1 = new THREE.Mesh(geom, railingMaterial);
        valut1.rotation.z = 0 - angle;
        valut1.position.x = basePoint[0] - (radBottom - poleSize / 2) * scale;
        valut1.position.y = basePoint[1] + radBottom * (1 + Math.sin(angle)) * scale + (banisterLength - valutHeightRotated) * 0.5 * scale;
        valut1.position.z = basePoint[2];
        valut1.castShadow = true;
        railingSection.add(valut1);
        //stairCase.push(valut1);

        var valut2 = new THREE.Mesh(geom, railingMaterial);
        valut2.rotation.z = Math.PI - angle;
        valut2.position.x = basePoint[0] + 99 * scale - (radBottom - poleSize / 2) * scale;
        valut2.position.y = basePoint[1] + 290 * scale + radBottom * (1 + Math.sin(angle)) * scale + (banisterLength - valutHeightRotated) * 0.5 * scale;
        valut2.position.z = basePoint[2];
        valut2.castShadow = true;
        railingSection.add(valut2);
        //stairCase.push(valut2);

        /*окончания*/

        var length = (banisterLength - valutHeightRotated) * 0.5;
        var poleGeometry = new THREE.BoxGeometry(poleSize * scale, length * scale, poleSize * scale);
        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + length / 2 * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);

        var pole = new THREE.Mesh(poleGeometry, railingMaterial);
        pole.position.x = basePoint[0];
        pole.position.y = basePoint[1] + 1.5 * length * scale + valutHeightRotated * scale;
        pole.position.z = basePoint[2] + poleSize / 2 * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);


    }

}


/*кованый бублик */


function drawBagel(bagelWidth, bagelHeight, poleSize, scale) {
    var rad1 = (bagelWidth - 2 * poleSize) / 2;
    var rad2 = bagelWidth / 2;
    var bagelShape = new THREE.Shape();
    bagelShape.moveTo(rad2 * 2 * scale, rad2 * scale);
    bagelShape.lineTo((bagelWidth - poleSize) * scale, bagelWidth / 2 * scale);
    bagelShape.arc(-rad1 * scale, 0 * scale, rad1 * scale, 0, -Math.PI, true);
    bagelShape.lineTo(poleSize * scale, (bagelHeight - rad2) * scale);
    bagelShape.arc(rad1 * scale, 0, rad1 * scale, Math.PI, 0, true);
    bagelShape.lineTo(bagelWidth * scale, (bagelHeight - rad2) * scale);
    bagelShape.arc(-rad2 * scale, 0, rad2 * scale, 0, Math.PI, true);
    bagelShape.lineTo(0 * scale, rad2 * scale);
    bagelShape.arc(rad2 * scale, 0, rad2 * scale, Math.PI, 2 * Math.PI, true);
    return bagelShape;
}


/*кованая волюта*/

function drawValut(radBottom, radTop, valutHeight, poleSize, scale) {
    var rad1 = radBottom - poleSize;
    var rad2 = radBottom;
    var dist = valutHeight - radBottom - radTop;
    var valutShape = new THREE.Shape();
    //нижний завиток
    valutShape.moveTo(0, 0);
    valutShape.absarc(rad2 * scale, 0, rad2 * scale, Math.PI, 2.5 * Math.PI, true);
    valutShape.lineTo(rad2 * scale, rad1 * scale);
    valutShape.absarc(rad2 * scale, 0, rad1 * scale, 0.5 * Math.PI, -1 * Math.PI, true);
    //перемычка
    valutShape.lineTo(poleSize * scale, dist * scale);
    //верхний завиток
    rad1 = radTop - poleSize;
    rad2 = radTop;
    valutShape.absarc(-rad1 * scale, dist * scale, rad2 * scale, 0, 1.5 * Math.PI, true);
    valutShape.lineTo(-rad1 * scale, (dist - rad1) * scale);
    valutShape.absarc(-rad1 * scale, dist * scale, rad1 * scale, 1.5 * Math.PI, 0, true);
    //перемычка
    valutShape.lineTo(0, 0);

    return valutShape;
}


function drawLathePart(length, minSize, maxSize) {
    /*возвращает массив точек для точеного участка деревянной балясины или столба*/
    var points = [];
    var point = new THREE.Vector3(minSize, 0, 0);
    points.push(point);
    point = new THREE.Vector3(maxSize, 10 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(minSize, 20 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(maxSize, 200 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(minSize, 230 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(maxSize, 250 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(minSize, 270 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(maxSize, 300 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(minSize, 480 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(maxSize, 490 / 500 * length, 0);
    points.push(point);
    point = new THREE.Vector3(minSize, 500 / 500 * length, 0);
    points.push(point);
    return points;
}//end of drawLathePart


function drawLatheBanister_com(banisterLength, banisterSize, botEndType, botEndLength, topEndType) {
    /*возвращает точеную балясину (мэш)*/

    var maxSize = banisterSize;
    var minSize = 25;
    var topEndLength = 100;
    var lathePartLength = banisterLength - topEndLength - botEndLength;

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });

    var banister = new THREE.Object3D();

    //точеный участок

    var points = drawLathePart(lathePartLength, minSize / 2, maxSize / 2);

    var latheGeometry = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
    var balPart = new THREE.Mesh(latheGeometry, timberMaterial);
    balPart.position.y = botEndLength;
    balPart.castShadow = true;
    banister.add(balPart);

    //нижний участок


    //if (params.timberBalBotEnd == "квадрат")
    //botEndType = params.timberBalBotEnd
    if (botEndType == "квадрат")
        var geom = new THREE.BoxGeometry(maxSize, botEndLength, maxSize);
    else
        var geom = new THREE.CylinderGeometry(minSize / 2, minSize / 2, botEndLength);

    var balPart = new THREE.Mesh(geom, timberMaterial);
    balPart.position.x = 0;
    balPart.position.y = botEndLength / 2;
    balPart.position.z = 0;
    balPart.castShadow = true;
    banister.add(balPart);


    //верхний участок
    //if (params.timberBalTopEnd == "квадрат")
    //topEndType = params.timberBalTopEnd
    if (topEndType == "квадрат")
        var geom = new THREE.BoxGeometry(maxSize, topEndLength, maxSize);
    else
        var geom = new THREE.CylinderGeometry(minSize / 2, minSize / 2, topEndLength);


    var balPart = new THREE.Mesh(geom, timberMaterial);
    balPart.position.x = 0;
    balPart.position.y = banisterLength - topEndLength / 2;
    balPart.position.z = 0;
    balPart.castShadow = true;
    banister.add(balPart);


    return banister;
} // end of drawLatheBanister(); 


function drawLatheRack_com(rackSize) {
    /*возрващает точеный деревянный столб (мэш)*/

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var rackLength = 1000;
    var maxSize = rackSize;
    var minSize = maxSize * 0.6;
    var endPartHeight = rackLength * 0.25;
    var lathePartLength = rackLength - 2 * endPartHeight;
    var rack = new THREE.Object3D();

    //точеный участок

    var points = drawLathePart(lathePartLength, minSize / 2, maxSize / 2);

    var latheGeometry = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
    var rackPart = new THREE.Mesh(latheGeometry, timberMaterial);
    rackPart.position.y = endPartHeight;
    rackPart.castShadow = true;
    rack.add(rackPart);


    //нижний квадратный участок
    var geom = new THREE.BoxGeometry(rackSize, endPartHeight, rackSize);
    var rackPart = new THREE.Mesh(geom, timberMaterial);
    rackPart.position.x = 0;
    rackPart.position.y = endPartHeight / 2;
    rackPart.position.z = 0;
    rackPart.castShadow = true;
    rack.add(rackPart);

    //верхний квадратный участок
    var geom = new THREE.BoxGeometry(rackSize, endPartHeight, rackSize);
    var rackPart = new THREE.Mesh(geom, timberMaterial);
    rackPart.position.x = 0;
    rackPart.position.y = rackLength - endPartHeight / 2;
    rackPart.position.z = 0;
    rackPart.castShadow = true;
    rack.add(rackPart);

    return rack;

} // end of drawLatheRack(); 


function setRackPosition(stairAmt) {
    /*задает номера ступеней марша, где располагаются стойки ограждений*/

    var rackPosition = [];
    if (stairAmt == 0) rackPosition = [];
    if (stairAmt == 1) rackPosition = [];
    if (stairAmt == 2) rackPosition = [];
    if (stairAmt == 3) rackPosition = [];
    if (stairAmt == 4) rackPosition = [];
    if (stairAmt == 5) rackPosition = [3];
    if (stairAmt == 6) rackPosition = [4];
    if (stairAmt == 7) rackPosition = [4];
    if (stairAmt == 8) rackPosition = [3, 6];
    if (stairAmt == 9) rackPosition = [4, 6];
    if (stairAmt == 10) rackPosition = [4, 7];
    if (stairAmt == 11) rackPosition = [3, 6, 9];
    if (stairAmt == 12) rackPosition = [3, 6, 9];
    if (stairAmt == 13) rackPosition = [4, 7, 10];
    if (stairAmt == 14) rackPosition = [3, 6, 9, 12];
    if (stairAmt == 15) rackPosition = [3, 6, 9, 12];
    if (stairAmt == 16) rackPosition = [4, 7, 10, 13];
    if (stairAmt == 17) rackPosition = [3, 6, 9, 12, 15];
    if (stairAmt == 18) rackPosition = [4, 7, 10, 13, 16];
    if (stairAmt == 19) rackPosition = [4, 7, 10, 13, 16];	
	if (stairAmt == 20) rackPosition = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 21) rackPosition = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 22) rackPosition = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 23) rackPosition = [4, 7, 10, 13, 17, 19];
	if (stairAmt == 24) rackPosition = [3, 6, 9, 12, 15, 18, 21];
	if (stairAmt == 25) rackPosition = [3, 6, 9, 12, 15, 18, 21];
	 

    return (rackPosition);
}

/*функция отрисовывает стойку секции кованых балясин */
function drawForgeFrameNewel2D(newelParams) {
    var pStart = newelParams.pStart,
        width = newelParams.width,
        shape = newelParams.shape,
        height = newelParams.height,
        angle = newelParams.angle,
        type = newelParams.type,
        length = newelParams.length,
        botHoleOffset = newelParams.botHoleOffset,
        holeDist = newelParams.holeDist,
		bottomConnection = newelParams.bottomConnection,
		topConnection = newelParams.topConnection,
		connectionLength = newelParams.connectionLength;
    var pLT, pLB, pRT, pRB;
    var pEnd; // верхняя точка левой стойки, начало шейпа
    var leftHeight = length,
        rightHeight = length + width * Math.tan(angle);
    if (type == 'left') leftHeight += height - length;
	else if (type == 'right') rightHeight += height - length;
	
    pLT = newPoint_xy(pStart, -width / 2, -botHoleOffset - holeDist + leftHeight);
    pLB = newPoint_xy(pLT, 0, -leftHeight);
    pRB = newPoint_xy(pLB, width, 0);
    pRT = newPoint_xy(pRB, 0, rightHeight);

    if (bottomConnection && type == 'left') {
        var pLTx, pLTy, pLTxy;
        var xOffset = connectionLength;
        var yOffset = 20;
        pLTx = newPoint_xy(pLT, -xOffset, 0);
        pLTxy = newPoint_xy(pLTx, 0, -yOffset);
        pLTy = newPoint_xy(pLTxy, xOffset, 0);
        addLine(shape, dxfPrimitivesArr, pLT, pLTx, newelParams.dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, pLTx, pLTxy, newelParams.dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, pLTxy, pLTy, newelParams.dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, pLTy, pLB, newelParams.dxfBasePoint);
    } else addLine(shape, dxfPrimitivesArr, pLT, pLB, newelParams.dxfBasePoint);
    addLine(shape, dxfPrimitivesArr, pLB, pRB, newelParams.dxfBasePoint);
    if (topConnection && type == 'right') {
        var pRTx, pRTy, pRTxy;
        var xOffset = connectionLength;
        var yOffset = 20;
        pRTx = newPoint_xy(pRT, xOffset, 0);
        pRTxy = newPoint_xy(pRTx, 0, -yOffset);
        pRTy = newPoint_xy(pRTxy, -xOffset, 0);
        addLine(shape, dxfPrimitivesArr, pRB, pRTy, newelParams.dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, pRTy, pRTxy, newelParams.dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, pRTxy, pRTx, newelParams.dxfBasePoint);
        addLine(shape, dxfPrimitivesArr, pRTx, pRT, newelParams.dxfBasePoint);
    }
    else addLine(shape, dxfPrimitivesArr, pRB, pRT, newelParams.dxfBasePoint);
    newelParams.pFinish = pRT;
    newelParams.pStart = pLT;
    newelParams.pTrash = newPoint_xy(pRB, 0, height + width * Math.tan(angle));
    if (type == 'left') newelParams.pEnd = pLT;
    if (!newelParams.topRack) {
        // добавляем отверстия для крепления к тетиве
        var center1 = newPoint_xy(pLB, width / 2, newelParams.botHoleOffset);
        var center2 = newPoint_xy(center1, 0, newelParams.holeDist);
        addRoundHole(shape, dxfPrimitivesArr, center1, newelParams.holeDiam / 2, newelParams.dxfBasePoint);
        addRoundHole(shape, dxfPrimitivesArr, center2, newelParams.holeDiam / 2, newelParams.dxfBasePoint);
    }

    return newelParams;
}
// end  drawForgeFrameNewel2D

// функция создает отверстия в секции по указанным параметрам 
function addHoleRailingSectionForge(shape, dxfPrimitivesArr, pArr, dBPoint) {
    var hole = new THREE.Path();
    addLine(hole, dxfPrimitivesArr, pArr[0], pArr[1], dBPoint);
    addLine(hole, dxfPrimitivesArr, pArr[1], pArr[2], dBPoint);
    addLine(hole, dxfPrimitivesArr, pArr[2], pArr[3], dBPoint);
    addLine(hole, dxfPrimitivesArr, pArr[3], pArr[0], dBPoint);
    shape.holes.push(hole);
    return shape;
}

// функция возвращает группу кованых балясин для секции
function addBalRailingSectionForge(balParams) {
    var p1 = balParams.p1;
    var p2 = balParams.p2;
    var balDist = balParams.balDist;
    var angle = balParams.angle;
    var length = balParams.length;
    var dxfPrimitivesArr = balParams.dxfPrimitivesArr;
    var dBPoint = balParams.dBPoint;
    var obj3D = new THREE.Object3D();
    var trashShape = new THREE.Shape();
    var mat = balParams.mat;
    var balAmt = Math.round((p2.x - p1.x) / balDist);
    balDist = (p2.x - p1.x) / (balAmt + 1);
    var insertPoint = [];
    var pOffset = { x: 0, y: 0, z: 0 };
    pOffset = newPoint_x(p1, balDist, -angle);
    var bal_1 = banister1;
    var bal_2 = banister2;
    var balAmt1 = 0;
    var balAmt2 = 0;
    insertPoint[0] = pOffset.x;
    insertPoint[1] = pOffset.y;
    insertPoint[2] = 40 / 2 - 6;// 12 - толщина палки, 6 - отступаем половину чтобы была по центру
    var balType = bal_2;
    var balLength = 710;
	for (i = 0; i < balAmt; i++) {
        if (balType == bal_1) {
            balType = bal_2;
            balAmt2 = balAmt2 + 1;
        }
        else {
            balType = bal_1;
            balAmt1 = balAmt1 + 1;
        }
        drawForgedBanister(balLength, balType, insertPoint, 1, mat, obj3D);
        addLine(trashShape, dxfPrimitivesArr, pOffset, newPoint_xy(pOffset, 0, length), dBPoint);
        pOffset = newPoint_x(pOffset, balDist, -angle);
        insertPoint[0] = pOffset.x;
        insertPoint[1] = pOffset.y;
    }
    return obj3D;
}



/*** СТАРЫЕ ФУНКЦИИ ***/


//старая функция отрисовки стойки

function drawRack3d(basePoint, rackLength, handrailAngle, rackMaterial, scale, railingSection){

//тело стойки
var rackProfile = 40;
var handrailHolderLength = 70;
var rackGeometry = new THREE.BoxGeometry( rackProfile * scale, (rackLength - handrailHolderLength) * scale, rackProfile * scale );
var rack = new THREE.Mesh( rackGeometry, rackMaterial);
rack.position.x = basePoint[0];
rack.position.y = basePoint[1] + (rackLength-handrailHolderLength)/2*scale;
rack.position.z = basePoint[2] + rackProfile /2 * scale;	
rack.castShadow = true;
railingSection.add( rack );

//кронштейн поручня
var handrailHolderRadius = 6;

var radiusTop = handrailHolderRadius*scale
var radiusBottom = handrailHolderRadius*scale; 
var height = handrailHolderLength*scale;
var segmentsX = 20 
var segmentsY = 0 
var openEnded = false;


var handrailHolderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
var handrailHolder = new THREE.Mesh( handrailHolderGeometry, rackMaterial);
handrailHolder.position.x = basePoint[0] //+ handrailHolderProfile /2 * scale;
handrailHolder.position.y = basePoint[1] + (rackLength - handrailHolderLength/2)*scale;
handrailHolder.position.z = basePoint[2] + rackProfile /2 * scale;	
handrailHolder.castShadow = true;
railingSection.add( handrailHolder );

/*сохраняем координаты в массив*/
rackPosition[rackNumber] = [basePoint[0], basePoint[1]]
rackNumber += 1;
}

/*палка в 3D*/


function drawPole3D(poleType, poleProfileY, poleProfileZ, basePoint, length, poleAngle, poleMaterial, scale, railingSection){
scale = 1;
/*прямоугольная палка*/
if (poleType != "round") {

	var poleGeometry = new THREE.BoxGeometry( length * scale, poleProfileY * scale, poleProfileZ * scale );
	var pole = new THREE.Mesh( poleGeometry, poleMaterial);
	pole.rotation.z = poleAngle;

	if (basePoint instanceof Array){
		pole.position.x = basePoint[0] + (length/2*Math.cos(poleAngle) - poleProfileY/2 * Math.sin(poleAngle)) * scale;
		pole.position.y = basePoint[1] + (length/2*Math.sin(poleAngle) + poleProfileY/2 * Math.cos(poleAngle)) * scale;
		pole.position.z = basePoint[2] + poleProfileZ /2 * scale;
		}
	if (basePoint instanceof Object && basePoint.x != undefined){		
		pole.position.x = basePoint.x + (length/2*Math.cos(poleAngle) - poleProfileY/2 * Math.sin(poleAngle)) //* scale;
		pole.position.y = basePoint.y + (length/2*Math.sin(poleAngle) + poleProfileY/2 * Math.cos(poleAngle)) //* scale;
		pole.position.z = basePoint.z;

		}
	pole.castShadow = true;
	railingSection.add( pole );
	}
/*круглая палка*/
if (poleType == "round") {
	var poleRadius = poleProfileY/2;
	var radiusTop = poleRadius*scale
	var radiusBottom = poleRadius*scale; 
	var height = length*scale;
	var segmentsX = 20 
	var segmentsY = 0 
	var openEnded = false;


	var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
	var pole = new THREE.Mesh( poleGeometry, poleMaterial);
	pole.rotation.z = poleAngle-Math.PI/2;
	pole.position.x = basePoint[0] + (length/2*Math.cos(poleAngle) - poleRadius/2 * Math.sin(poleAngle)) * scale;
	pole.position.y = basePoint[1] + (length/2*Math.sin(poleAngle) + poleRadius/2 * Math.cos(poleAngle)) * scale;
	pole.position.z = basePoint[2] + poleRadius * scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	}

}

function drawBalRack(par){
	
	var metalMaterial =  new THREE.MeshLambertMaterial({color: 0xD0D0D0, wireframe: false});
	var rack = new THREE.Object3D();
	var rackLength = par.length - par.handrailHolderLength;
	var geometry = new THREE.BoxGeometry( 40, rackLength, 40);
	var rack1 = new THREE.Mesh( geometry, metalMaterial  );
	rack1.castShadow = true;
	rack1.rotation.y = 0;
	rack1.position.y = rackLength/2;//stepHeight * (stairAmt + 1) + rackLength/2 + 4 + regShimAmt * regShimThk;
	rack1.position.x = 0;
	rack1.position.z = 0;
	rack.add(rack1);
	
	//фланец	
	var flanParams = {
		material: metalMaterial,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: {x:1000, y:-1000,},
		size: 76,
		holeDst: 55,
		}	
	flanParams = drawPlatformRailingFlan(flanParams)
	var botFlan = flanParams.mesh;
	botFlan.position.y = 0//stepHeight * (stairAmt + 1) + 4 + regShimAmt * regShimThk;
	botFlan.rotation.y = 0//sectionTyrnAngle
	rack.add(botFlan);
	
	/*кронштейн поручня*/
	if(par.handrailHolderLength != 0){
		var geometry = new THREE.CylinderGeometry( 6, 6, par.handrailHolderLength);
		var handrailHolder = new THREE.Mesh( geometry, metalMaterial  );
		handrailHolder.castShadow = true;
		handrailHolder.rotation.y = //sectionTyrnAngle
		handrailHolder.position.y = rackLength + par.handrailHolderLength / 2 //stepHeight * (stairAmt + 1) + 35 + rackLength + 4 + regShimAmt * regShimThk;
		handrailHolder.position.x = 0;
		handrailHolder.position.z = 0;
		rack.add(handrailHolder);
		}
	par.mesh = rack;
	
	return par;
	}

function drawPlatformRailingFlan(par){
	var size = par.size;
	var thk = 4;
	var holeRad = 4;
	var holeDst = par.holeDst;
	var rackSize = 40;
	
	var shape = new THREE.Shape();
	var extrudeOptions = {
		amount: thk, 
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	
	//внешний контур
	
	var p0 = {x:0, y:0}
	var p1 = copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, size);
	var p3 = newPoint_xy(p2, size, 0);
	var p4 = newPoint_xy(p3, 0, -size);

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	//круглые отверстия
	var holeOffset = (size - holeDst) / 2;
	var center1 = newPoint_xy(p0, holeOffset, holeOffset)
	addRoundHole(shape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
	var center2 = newPoint_xy(center1, 0, holeDst)
	addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
	var center2 = newPoint_xy(center1, holeDst, holeDst)
	addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
	var center2 = newPoint_xy(center1, holeDst, 0)
	addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
	
	//квадратное отверстие
	holeOffset = (size - rackSize) / 2;
	ph1 = newPoint_xy(p0, holeOffset, holeOffset)
	ph2 = newPoint_xy(ph1, rackSize, 0)
	ph3 = newPoint_xy(ph1, rackSize, rackSize)
	ph4 = newPoint_xy(ph1, 0, rackSize)
	
	var sqHole = new THREE.Path();
	addLine(sqHole, par.dxfArr, ph1, ph2, par.dxfBasePoint);
	addLine(sqHole, par.dxfArr, ph2, ph3, par.dxfBasePoint);
	addLine(sqHole, par.dxfArr, ph3, ph4, par.dxfBasePoint);
	addLine(sqHole, par.dxfArr, ph4, ph1, par.dxfBasePoint);
	
	shape.holes.push(sqHole);
	
	
	//подпись под фигурой
	var text = "Фланец ограждений"
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, -100, -200)
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint)
	
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var flan = new THREE.Mesh(geometry, par.material);	
	flan.rotation.x = -Math.PI / 2
	flan.position.x = -size/2
	flan.position.z = size/2
	
	par.mesh = new THREE.Object3D();
	par.mesh.add(flan);
	return par;


}


function drawGlassProfile(par) {

//	//console.log(par)
    var extrudeOptions = {
        amount: par.height,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

	var p0 = { x: 0, y: 0 };
	var p00 = newPoint_xy(p0, par.length, 0);
	
    var p1 = newPoint_xy(p0, par.width * Math.tan(par.angleStart)/2, -par.width/2);
    var p2 = newPoint_xy(p1, -par.width * Math.tan(par.angleStart), par.width);	
    var p4 = newPoint_xy(p00, -par.width * Math.tan(par.angleEnd)/2, -par.width/2);
    var p3 = newPoint_xy(p4, par.width * Math.tan(par.angleEnd), par.width);
       
        var shape = new THREE.Shape();
        addLine(shape, par.dxfPrimitivesArr, p1, p2, par.dxfBasePoint);
        addLine(shape, par.dxfPrimitivesArr, p2, p3, par.dxfBasePoint);
        addLine(shape, par.dxfPrimitivesArr, p3, p4, par.dxfBasePoint);
        addLine(shape, par.dxfPrimitivesArr, p4, p1, par.dxfBasePoint);

        var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var pole = new THREE.Mesh(geom, par.material);
        pole.rotation.x = Math.PI/2;
		pole.position.y = -par.height/2;
		pole.position.z = -20;
		par.mesh = pole;
    return par;
}

function drawForgeFrame(par){
	var section = new THREE.Object3D();
	var shape = new THREE.Shape();

	//верхняя линия
	var points = [];
	points[0] = {x:0, y: par.firstRackDelta};
	points[1] = newPoint_xy(points[0], 0, par.height - par.firstRackDelta);
	points[2] = newPoint_xy(points[1], par.length, 0);
	points[3] = newPoint_xy(points[2], 0, -par.height);
	points[4] = newPoint_xy(points[3], -par.legProf, 0);
	
	
	//нижняя линия
	var shortLegsAmt = Math.round(par.length/800) - 1;
	if(shortLegsAmt < 0) shortLegsAmt = 0;
	var shortLegDst = (par.length - (shortLegsAmt + 2) * par.legProf) / (shortLegsAmt + 1);
	
	for (var i=0; i<=shortLegsAmt; i++){
		var j = points.length;
		points[j] = newPoint_xy(points[j-1], 0, par.shortLegLength);
		points[j+1] = newPoint_xy(points[j], -shortLegDst, 0);
		points[j+2] = newPoint_xy(points[j+1], 0, -par.shortLegLength);
		//укороченная последнаяя стойка
		if(i == shortLegsAmt) points[j+2] = newPoint_xy(points[j+1], 0, -par.shortLegLength + par.firstRackDelta); 
		points[j+3] = newPoint_xy(points[j+2], -par.legProf, 0);		
		}
	
	//внутренняя линия
	var hole = new THREE.Path();
	var holePoints = [];
		holePoints[0] = newPoint_xy(points[0], par.legProf, (par.shortLegLength + par.botProf - par.firstRackDelta));
		holePoints[1] = newPoint_xy(points[1], par.legProf, -par.topProf);
		holePoints[2] = newPoint_xy(points[2], -par.legProf, -par.topProf);
		holePoints[3] = newPoint_xy(points[3], -par.legProf, (par.shortLegLength + par.botProf));
	
	//формируем hole
	for (var i=holePoints.length-1; i>0; i--){
		addLine(hole, par.dxfPrimitivesArr, holePoints[i], holePoints[i-1], par.dxfBasePoint);
		}
	addLine(hole, par.dxfPrimitivesArr, holePoints[0], holePoints[holePoints.length-1], par.dxfBasePoint);
	
	//формируем shape
	for (var i=0; i<points.length-1; i++){
		addLine(shape, par.dxfPrimitivesArr, points[i], points[i+1], par.dxfBasePoint);
		}
	addLine(shape, par.dxfPrimitivesArr, points[points.length-1], points[0], par.dxfBasePoint);
	
	shape.holes.push(hole);
	var extrudeOptions = {
        amount: par.legProf,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};
	
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom, par.material);
	mesh.position.y = -150;
	mesh.position.z = -40;
	
	section.add(mesh);
	
	//фланцы
	var flanParams = {
		material: par.material,
		dxfArr: par.dxfPrimitivesArr,
		dxfBasePoint: {x:1000, y:-1000,},
		size: 76,
		holeDst: 55,
		}
	var flanDst = (par.length - par.legProf) / (shortLegsAmt + 1)
	for (var i=0; i<shortLegsAmt+2; i++){	
		flanParams = drawPlatformRailingFlan(flanParams)
		var botFlan = flanParams.mesh;
		botFlan.position.x = flanDst * i + 20;
		botFlan.position.y = -150;
		if(i==0) botFlan.position.y += par.firstRackDelta;
		botFlan.position.z = -20
		section.add(botFlan);
		
	}
	
	par.mesh = section;	
	return par;
	
	}
	
//зажимной стеклодержатель
	
function drawGlassHolder(par){
	par.thk = 20;
	par.height = 40;
	par.width = 50;
	par.rad = par.height / 2;
	par.radOffset = par.width - par.rad;
	
	var shape = new THREE.Shape();
	var p0 = { "x": 0.0, "y": 0.0 };
	var p1 = newPoint_xy(p0, 0.0, par.height);
	var p2 = newPoint_xy(p1, par.radOffset, 0.0);
	var p3 = newPoint_xy(p0, par.radOffset, 0);
	var center = newPoint_xy(p0, par.radOffset, par.rad);
	
	addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addArc(shape, par.dxfArr, center, par.rad, Math.PI/2, -Math.PI/2, par.dxfBasePoint)

    	var extrudeOptions = {
    		amount: par.thk,
    		bevelEnabled: false,
    		curveSegments: 12,
    		steps: 1
        };


		geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glassHolder = new THREE.Mesh(geometry, par.material);
		
		par.mesh = glassHolder;		
        return par;
}
