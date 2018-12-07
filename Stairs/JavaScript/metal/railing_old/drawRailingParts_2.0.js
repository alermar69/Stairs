/***  Вспомогательные функции   ***/

/*Поручень марша и площадки*/

function drawHandrail(handrailParams) {

    var type = handrailParams.type;
    var angle = handrailParams.angle;
    var stairAmt = handrailParams.stairAmt;
    var profileY = handrailParams.profileY;
    var topEnd = handrailParams.topEnd;
    var bottomEnd = handrailParams.bottomEnd;
    var dxfBasePoint = handrailParams.dxfBasePoint;
    var yTop = handrailParams.yTop;
    var material = handrailParams.material;

    var shape = new THREE.Shape();

    var stepLength = handrailParams.h1 / Math.sin(angle);
    var handrailLength = stepLength * stairAmt - 1 / 3 * stepLength;

    if (topEnd === "площадка") handrailLength = handrailLength - 1 / 3 * stepLength;
    if (topEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;
    if (bottomEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;

    //определяем координаты поручня
    var p0, p1, p2, p3, p4, p5;
    p0 = { x: 0, y: 0 };
    p1 = polar(p0, angle + Math.PI / 2, profileY);
    p2 = polar(p1, angle, handrailLength);
    if (topEnd === "площадка") { 
        var pt = newPoint_xy(p0, 0, yTop);
        p2 = itercection(p1, polar(p1, angle, 100), pt, newPoint_xy(pt, 100, 0));
        p3 = newPoint_xy(p0, handrailParams.platformLengthTop, p2.y);
        p4 = newPoint_xy(p3, 0, -profileY);
        p5 = itercection(p0, polar(p0, angle, 100), p4, newPoint_xy(p4, -100, 0));
    } else {
        p3 = polar(p2, -Math.PI / 2 + angle, profileY);
    }

    /*прямоугольный поручень*/
    if (type !== "round") {

        addLine(shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);

        if (topEnd === "площадка") { //РїРѕСЂСѓС‡РµРЅСЊ РІРµСЂС…РЅРµР№ РїР»РѕС‰Р°РґРєРё
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

        if (topEnd === "площадка") {
            var trashShape1 = new THREE.Shape();
            addLine(trashShape1, dxfPrimitivesArr, p5, p2, dxfBasePoint);
            addLine(trashShape1, dxfPrimitivesArr, p2, p3, dxfBasePoint);
            addLine(trashShape1, dxfPrimitivesArr, p3, p4, dxfBasePoint);
            addLine(trashShape1, dxfPrimitivesArr, p4, p5, dxfBasePoint);

            height = distance(p3, p2);

            poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
            pole = new THREE.Mesh(poleGeometry, material);
            pole.rotation.z = -Math.PI / 2;
            pole.position.x = p5.x + height / 2;
            pole.position.y = p5.y + poleRadius / 2;// * Math.cos(angle);
            pole.position.z = poleRadius;
            handrailParams.meshes.push(pole);
        }
    }

    handrailParams.shape = shape;
    return handrailParams;
}

/*стойка 40х40 с кронштейном поручня*/

function drawRack3d(rack3dParams) {

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
    if (rack3dParams.stringerSideOffset !== 0) cylinderHolder.position.z += heightCylinder - rackProfile / 2 - rackProfile*2;
    if (rack3dParams.isRight) {
        cylinderHolder.position.z = -rackProfile;
        if (rack3dParams.stringerSideOffset !== 0) cylinderHolder.position.z += rackProfile*2 + rackProfile / 2 - heightCylinder ;
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
        amount: 40 * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var rackShape = draw4angleShape(angleBottom, angleTop, forgedRackProfile, rackLength, scale);
    var geom = new THREE.ExtrudeGeometry(rackShape, forgingExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var forgedRack = new THREE.Mesh(geom, rackMaterial);
    forgedRack.position.x = basePoint[0];
    forgedRack.position.y = basePoint[1];
    forgedRack.position.z = basePoint[2];
    forgedRack.castShadow = true;
    railingSection.add(forgedRack);

    /*СЃРѕС…СЂР°РЅСЏРµРј РєРѕРѕСЂРґРёРЅР°С‚С‹ РІ РјР°СЃСЃРёРІ*/
    rackPosition[rackNumber] = [basePoint[0], basePoint[1]];
    rackNumber += 1;
}

/*палка в 3D*/


function drawPole3D(pole3DParams) {

    var poleType = pole3DParams.poleType;
    var poleProfileY = pole3DParams.poleProfileY;
    var poleProfileZ = pole3DParams.poleProfileZ;
    var basePoint = pole3DParams.basePoint;
    var length = pole3DParams.length;
    var poleAngle = pole3DParams.poleAngle;
    var poleMaterial = pole3DParams.poleMaterial;
    var scale = pole3DParams.scale;
    var dxfBasePoint = pole3DParams.dxfBasePoint;

    var pole3DExtrudeOptions = {
        amount: poleProfileZ * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var p0 = { x: 0, y: 0 };
    var p1 = newPoint_xy(p0, 0, poleProfileY);
    var p2 = newPoint_xy(p1, length, 0);
    var p3 = newPoint_xy(p2, 0, -poleProfileY);

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
            //* scale;
            pole.position.y = basePoint.y + (length / 2 * Math.sin(poleAngle) + poleProfileY / 2 * Math.cos(poleAngle));
            //* scale;
            pole.position.z = basePoint.z;

        }
        pole.castShadow = true;
        pole3DParams.railingSection.add(pole);
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
        pole.position.x = basePoint[0] + (length / 2 * Math.cos(poleAngle) - poleRadius / 2 * Math.sin(poleAngle)) * scale;
        pole.position.y = basePoint[1] + (length / 2 * Math.sin(poleAngle) + poleRadius / 2 * Math.cos(poleAngle)) * scale;
        pole.position.z = basePoint[2] + poleRadius * scale;
        pole.castShadow = true;
        pole3DParams.railingSection.add(pole);
        //stairCase.push(pole);

    }

    return pole3DParams;
}


/*стекло в форме параллелограмма*/


function drawGlassShape(p1, p2, angle, glassDist, glassHeight, scale) {
    var glassHeight1 = glassHeight * scale;
    var glassHeight2 = glassHeight1 + (p2[1] - p1[1]) - glassDist * scale * Math.tan(angle);
    var glassWidth = p2[0] - p1[0] - glassDist * scale;

    var glassShape = new THREE.Shape();
    glassShape.moveTo(0, 0);
    var x = 0;
    var y = glassHeight1;
    glassShape.lineTo(x, y);
    x = glassWidth;
    y = glassHeight2;
    glassShape.lineTo(x, y);
    x = glassWidth;
    y = glassHeight2 - glassHeight1;
    glassShape.lineTo(x, y);
    glassShape.lineTo(0, 0);

    return glassShape;
}


/*параллелограмм*/

function draw4angleShape(angleBottom, angleTop, width, leftHeight, scale) {
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


function drawForgedBanister(type, basePoint, scale, railingMaterial, railingSection) {

    var testValue = getInputValue("testValue");
    var banisterLength = 750;
    var poleSize = 12;
    var banisterExtrudeOptions = {
        amount: 12 * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    if (type == "bal_1" || type == "bal_3") {
        //С€РёС€РєР°
        var bulbGeometry = new THREE.OctahedronGeometry(25 * scale, 0);
        var bulb = new THREE.Mesh(bulbGeometry, railingMaterial);
        bulb.rotation.y = Math.PI / 4;
        bulb.position.x = basePoint[0];
        bulb.position.y = basePoint[1] + banisterLength / 2 * scale;
        bulb.position.z = basePoint[2] + poleSize / 2 * scale;
        bulb.castShadow = true;
        railingSection.add(bulb);
        //stairCase.push(bulb); 

        //РїР°Р»РєР°
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
        //С€РёС€РєР°
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

        //РїР°Р»РєР°
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
        //Р±СѓР±Р»РёРє 1
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0];
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //Р±СѓР±Р»РёРє 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI;
        bagel2.position.x = basePoint[0];
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //РїР°Р»РєР°
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
        //Р±СѓР±Р»РёРє 1
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0];
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 3 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //Р±СѓР±Р»РёРє 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI;
        bagel2.position.x = basePoint[0];
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength / 3 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //Р±СѓР±Р»РёРє 3
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0];
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength * 2 / 3 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //Р±СѓР±Р»РёРє 4
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = Math.PI;
        bagel2.position.x = basePoint[0];
        bagel2.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength * 2 / 3 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);



        //РїР°Р»РєР°
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
        //Р±СѓР±Р»РёРє 1

        var deltaX = bagelWidth * scale + bagelHeight * 0.5 * scale;
        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.position.x = basePoint[0] - deltaX;
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //Р±СѓР±Р»РёРє 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = 0.75 * Math.PI;
        bagel2.position.x = basePoint[0] + bagelHeight * 1 * scale - deltaX;
        bagel2.position.y = basePoint[1] + bagelHeight * 1.6 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //Р±СѓР±Р»РёРє 3
        var bagel3 = new THREE.Mesh(geom, railingMaterial);
        bagel3.rotation.z = 1.25 * Math.PI;
        bagel3.position.x = basePoint[0] + bagelHeight * 0.3 * scale - deltaX;
        bagel3.position.y = basePoint[1] + bagelHeight * 0.1 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel3.position.z = basePoint[2];
        bagel3.castShadow = true;
        railingSection.add(bagel3);
        //stairCase.push(bagel3);

        //Р±СѓР±Р»РёРє 4

        var deltaX = bagelWidth * scale + bagelHeight * 0.5 * scale;
        var bagel4 = new THREE.Mesh(geom, railingMaterial);
        bagel4.rotation.z = Math.PI;
        bagel4.position.x = basePoint[0] + bagelWidth * scale + bagelHeight * 0.5 * scale;
        bagel4.position.y = basePoint[1] + bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel4.position.z = basePoint[2];
        bagel4.castShadow = true;
        railingSection.add(bagel4);
        //stairCase.push(bagel4);

        //Р±СѓР±Р»РёРє 5
        var bagel5 = new THREE.Mesh(geom, railingMaterial);
        bagel5.rotation.z = 0.25 * Math.PI;
        bagel5.position.x = basePoint[0] + bagelHeight * 0.65 * scale;
        bagel5.position.y = basePoint[1] + bagelHeight * 0.9 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel5.position.z = basePoint[2];
        bagel5.castShadow = true;
        railingSection.add(bagel5);
        //stairCase.push(bagel5);

        //Р±СѓР±Р»РёРє 6
        var bagel6 = new THREE.Mesh(geom, railingMaterial);
        bagel6.rotation.z = -0.25 * Math.PI;
        bagel6.position.x = basePoint[0] - bagelHeight * 0.1 * scale;
        bagel6.position.y = basePoint[1] - bagelHeight * 1.1 * scale + banisterLength / 2 * scale;
        bagel6.position.z = basePoint[2];
        bagel6.castShadow = true;
        railingSection.add(bagel6);
        //stairCase.push(bagel6);

        //С€РёС€РєР° 
        var bulbGeometry = new THREE.OctahedronGeometry(25 * scale, 0);
        var bulb = new THREE.Mesh(bulbGeometry, railingMaterial);
        bulb.rotation.y = Math.PI / 4;
        bulb.position.x = basePoint[0];
        bulb.position.y = basePoint[1] + banisterLength / 2 * scale;
        bulb.position.z = basePoint[2] + poleSize / 2 * scale;
        bulb.castShadow = true;
        railingSection.add(bulb);
        //stairCase.push(bulb); 

        //РїР°Р»РєР°
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

        //РїР°Р»РєР°
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
        /*РІРѕР»СЋС‚Р°*/
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

        /*Р±СѓР±Р»РёРєРё*/
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

        /*РѕРєРѕРЅС‡Р°РЅРёСЏ*/
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
        /*РІРѕР»СЋС‚Р°*/
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

        /*РѕРєРѕРЅС‡Р°РЅРёСЏ*/

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
    //РЅРёР¶РЅРёР№ Р·Р°РІРёС‚РѕРє
    valutShape.moveTo(0, 0);
    valutShape.absarc(rad2 * scale, 0, rad2 * scale, Math.PI, 2.5 * Math.PI, true);
    valutShape.lineTo(rad2 * scale, rad1 * scale);
    valutShape.absarc(rad2 * scale, 0, rad1 * scale, 0.5 * Math.PI, -1 * Math.PI, true);
    //РїРµСЂРµРјС‹С‡РєР°
    valutShape.lineTo(poleSize * scale, dist * scale);
    //РІРµСЂС…РЅРёР№ Р·Р°РІРёС‚РѕРє
    rad1 = radTop - poleSize;
    rad2 = radTop;
    valutShape.absarc(-rad1 * scale, dist * scale, rad2 * scale, 0, 1.5 * Math.PI, true);
    valutShape.lineTo(-rad1 * scale, (dist - rad1) * scale);
    valutShape.absarc(-rad1 * scale, dist * scale, rad1 * scale, 1.5 * Math.PI, 0, true);
    //РїРµСЂРµРјС‹С‡РєР°
    valutShape.lineTo(0, 0);

    return valutShape;
}


function drawLathePart(length, minSize, maxSize) {
    /*РІРѕР·РІСЂР°С‰Р°РµС‚ РјР°СЃСЃРёРІ С‚РѕС‡РµРє РґР»СЏ С‚РѕС‡РµРЅРѕРіРѕ СѓС‡Р°СЃС‚РєР° РґРµСЂРµРІСЏРЅРЅРѕР№ Р±Р°Р»СЏСЃРёРЅС‹ РёР»Рё СЃС‚РѕР»Р±Р°*/
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


function drawLatheBanister(banisterLength, banisterSize, botEndType, botEndLength, topEndType) {
    /*РІРѕР·РІСЂР°С‰Р°РµС‚ С‚РѕС‡РµРЅСѓСЋ Р±Р°Р»СЏСЃРёРЅСѓ (РјСЌС€)*/

    var maxSize = banisterSize;
    var minSize = 25;
    var topEndLength = 100;
    var lathePartLength = banisterLength - topEndLength - botEndLength;

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });

    var banister = new THREE.Object3D();

    //С‚РѕС‡РµРЅС‹Р№ СѓС‡Р°СЃС‚РѕРє

    var points = drawLathePart(lathePartLength, minSize / 2, maxSize / 2);

    var latheGeometry = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
    var balPart = new THREE.Mesh(latheGeometry, timberMaterial);
    balPart.position.y = botEndLength;
    balPart.castShadow = true;
    banister.add(balPart);

    //РЅРёР¶РЅРёР№ СѓС‡Р°СЃС‚РѕРє


    //if (params.timberBalBotEnd == "РєРІР°РґСЂР°С‚")
    //botEndType = params.timberBalBotEnd
    if (botEndType == "РєРІР°РґСЂР°С‚")
        var geom = new THREE.BoxGeometry(maxSize, botEndLength, maxSize);
    else
        var geom = new THREE.CylinderGeometry(minSize / 2, minSize / 2, botEndLength);

    var balPart = new THREE.Mesh(geom, timberMaterial);
    balPart.position.x = 0;
    balPart.position.y = botEndLength / 2;
    balPart.position.z = 0;
    balPart.castShadow = true;
    banister.add(balPart);


    //РІРµСЂС…РЅРёР№ СѓС‡Р°СЃС‚РѕРє
    //if (params.timberBalTopEnd == "РєРІР°РґСЂР°С‚")
    //topEndType = params.timberBalTopEnd
    if (topEndType == "РєРІР°РґСЂР°С‚")
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


function drawLatheRack(rackSize) {
    /*РІРѕР·СЂРІР°С‰Р°РµС‚ С‚РѕС‡РµРЅС‹Р№ РґРµСЂРµРІСЏРЅРЅС‹Р№ СЃС‚РѕР»Р± (РјСЌС€)*/

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var rackLength = 1000;
    var maxSize = rackSize;
    var minSize = maxSize * 0.6;
    var endPartHeight = rackLength * 0.25;
    var lathePartLength = rackLength - 2 * endPartHeight;
    var rack = new THREE.Object3D();

    //С‚РѕС‡РµРЅС‹Р№ СѓС‡Р°СЃС‚РѕРє

    var points = drawLathePart(lathePartLength, minSize / 2, maxSize / 2);

    var latheGeometry = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
    var rackPart = new THREE.Mesh(latheGeometry, timberMaterial);
    rackPart.position.y = endPartHeight;
    rackPart.castShadow = true;
    rack.add(rackPart);


    //РЅРёР¶РЅРёР№ РєРІР°РґСЂР°С‚РЅС‹Р№ СѓС‡Р°СЃС‚РѕРє
    var geom = new THREE.BoxGeometry(rackSize, endPartHeight, rackSize);
    var rackPart = new THREE.Mesh(geom, timberMaterial);
    rackPart.position.x = 0;
    rackPart.position.y = endPartHeight / 2;
    rackPart.position.z = 0;
    rackPart.castShadow = true;
    rack.add(rackPart);

    //РІРµСЂС…РЅРёР№ РєРІР°РґСЂР°С‚РЅС‹Р№ СѓС‡Р°СЃС‚РѕРє
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
    /*Р·Р°РґР°РµС‚ РЅРѕРјРµСЂР° СЃС‚СѓРїРµРЅРµР№ РјР°СЂС€Р°, РіРґРµ СЂР°СЃРїРѕР»Р°РіР°СЋС‚СЃСЏ СЃС‚РѕР№РєРё РѕРіСЂР°Р¶РґРµРЅРёР№*/

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

    return (rackPosition);
}