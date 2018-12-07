

/***  Вспомогательные функции   ***/

/*стойка 40х40 с кронштейном поручня*/

function drawRack3d(rack3dParams) {

    var basePoint = rack3dParams.basePoint;
    var rackLength = rack3dParams.rackLength;
    var handrailAngle = rack3dParams.handrailAngle;
    var rackMaterial = rack3dParams.rackMaterial;
    var scale = rack3dParams.scale;
    var railingSection = rack3dParams.railingSection;
    var rackNumber = rack3dParams.rackNumber;
    var rackProfile = rack3dParams.rackProfile;
    var handrailHolderLength = rack3dParams.handrailHolderLength;

    //тело стойки
    var rack1 = new THREE.Object3D();
    var rackGeometry = new THREE.BoxGeometry(rackProfile * scale, (rackLength - handrailHolderLength) * scale, rackProfile * scale);
    var rack = new THREE.Mesh(rackGeometry, rackMaterial);
    rack.castShadow = true;
    rack1.add(rack);

    rack1.position.x = basePoint[0];
    rack1.position.y = basePoint[1] + (rackLength - handrailHolderLength) / 2 * scale;
    rack1.position.z = basePoint[2] + rackProfile / 2 * scale;
    
    railingSection.add(rack1);
    

    //кронштейн поручня
    var handrailHolderRadius = 6;

    var radiusTop = handrailHolderRadius * scale
    var radiusBottom = handrailHolderRadius * scale;
    var height = handrailHolderLength * scale;
    var segmentsX = 20
    var segmentsY = 0
    var openEnded = false;


    var handrailHolderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
    var handrailHolder = new THREE.Mesh(handrailHolderGeometry, rackMaterial);
    handrailHolder.position.x = basePoint[0];
    handrailHolder.position.y = basePoint[1] + (rackLength - handrailHolderLength / 2) * scale;
    handrailHolder.position.z = basePoint[2] + rackProfile / 2 * scale;
    handrailHolder.castShadow = true;
    railingSection.add(handrailHolder);

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

    var rackShape = draw4angleShape(angleBottom, angleTop, forgedRackProfile, rackLength, scale)
    var geom = new THREE.ExtrudeGeometry(rackShape, forgingExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var forgedRack = new THREE.Mesh(geom, rackMaterial);
    forgedRack.position.x = basePoint[0];
    forgedRack.position.y = basePoint[1];
    forgedRack.position.z = basePoint[2];
    forgedRack.castShadow = true;
    railingSection.add(forgedRack);

    /*сохраняем координаты в массив*/
    rackPosition[rackNuber] = [basePoint[0], basePoint[1]]
    rackNuber += 1;
}

/*палка в 3D*/


function drawPole3D(poleType, poleProfileY, poleProfileZ, basePoint, length, poleAngle, poleMaterial, scale, railingSection) {
    scale = 1;
    /*прямоугольная палка*/
    if (poleType != "round") {

        var poleGeometry = new THREE.BoxGeometry(length * scale, poleProfileY * scale, poleProfileZ * scale);
        var pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.rotation.z = poleAngle;

        if (basePoint instanceof Array) {
            pole.position.x = basePoint[0] + (length / 2 * Math.cos(poleAngle) - poleProfileY / 2 * Math.sin(poleAngle)) * scale;
            pole.position.y = basePoint[1] + (length / 2 * Math.sin(poleAngle) + poleProfileY / 2 * Math.cos(poleAngle)) * scale;
            pole.position.z = basePoint[2] + poleProfileZ / 2 * scale;
        }
        if (basePoint instanceof Object && basePoint.x != undefined) {
            pole.position.x = basePoint.x + (length / 2 * Math.cos(poleAngle) - poleProfileY / 2 * Math.sin(poleAngle)) //* scale;
            pole.position.y = basePoint.y + (length / 2 * Math.sin(poleAngle) + poleProfileY / 2 * Math.cos(poleAngle)) //* scale;
            pole.position.z = basePoint.z;

        }
        pole.castShadow = true;
        railingSection.add(pole);
    }
    /*круглая палка*/
    if (poleType == "round") {
        var poleRadius = poleProfileY / 2;
        var radiusTop = poleRadius * scale
        var radiusBottom = poleRadius * scale;
        var height = length * scale;
        var segmentsX = 20
        var segmentsY = 0
        var openEnded = false;


        var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
        var pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.rotation.z = poleAngle - Math.PI / 2;
        pole.position.x = basePoint[0] + (length / 2 * Math.cos(poleAngle) - poleRadius / 2 * Math.sin(poleAngle)) * scale;
        pole.position.y = basePoint[1] + (length / 2 * Math.sin(poleAngle) + poleRadius / 2 * Math.cos(poleAngle)) * scale;
        pole.position.z = basePoint[2] + poleRadius * scale;
        pole.castShadow = true;
        railingSection.add(pole);
        //stairCase.push(pole);

    }

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

    var testValue = getInputValue("testValue")
    var banisterLength = 750;
    var poleSize = 12

    var banisterExtrudeOptions = {
        amount: 12 * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

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
        var height1 = banisterLength / 2 - rad2 * 2


        var banisterPart1 = new THREE.Shape();
        banisterPart1.moveTo(0, 0);
        banisterPart1.lineTo(0, height1 * scale);
        banisterPart1.arc(0, rad2 * scale, rad2 * scale, 1.5 * Math.PI, 0, true)
        banisterPart1.lineTo(rad1 * scale, (height1 + rad2) * scale);
        banisterPart1.arc(-rad1 * scale, 0, rad1 * scale, 0, 1.5 * Math.PI, true)
        banisterPart1.lineTo(poleSize * scale, (height1 + poleSize) * scale);
        banisterPart1.lineTo(poleSize * scale, height1 * scale);
        banisterPart1.lineTo(poleSize * scale, 0);
        banisterPart1.lineTo(0, 0);

        var banisterPart2 = new THREE.Shape();
        banisterPart2.moveTo(poleSize * scale, banisterLength * scale);
        banisterPart2.lineTo(poleSize * scale, (banisterLength - height1) * scale);
        banisterPart2.arc(0, -rad2 * scale, rad2 * scale, 0.5 * Math.PI, -Math.PI, true)
        banisterPart2.lineTo(-(rad1 - poleSize) * scale, (banisterLength - height1 - rad2) * scale);
        banisterPart2.arc(rad1 * scale, 0, rad1 * scale, -Math.PI, 0.5 * Math.PI, true)
        banisterPart2.lineTo(0 * scale, (banisterLength - height1 - poleSize) * scale);
        banisterPart2.lineTo(0 * scale, banisterLength * scale);

        var banisterShape = [banisterPart1, banisterPart2]

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
        bagel1.position.x = basePoint[0] - deltaX
        bagel1.position.y = basePoint[1] - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel1.position.z = basePoint[2];
        bagel1.castShadow = true;
        railingSection.add(bagel1);
        //stairCase.push(bagel1);

        //бублик 2
        var bagel2 = new THREE.Mesh(geom, railingMaterial);
        bagel2.rotation.z = 0.75 * Math.PI;
        bagel2.position.x = basePoint[0] + bagelHeight * 1 * scale - deltaX
        bagel2.position.y = basePoint[1] + bagelHeight * 1.6 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel2.position.z = basePoint[2];
        bagel2.castShadow = true;
        railingSection.add(bagel2);
        //stairCase.push(bagel2);

        //бублик 3
        var bagel3 = new THREE.Mesh(geom, railingMaterial);
        bagel3.rotation.z = 1.25 * Math.PI;
        bagel3.position.x = basePoint[0] + bagelHeight * 0.3 * scale - deltaX
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
        bagel5.position.x = basePoint[0] + bagelHeight * 0.65 * scale
        bagel5.position.y = basePoint[1] + bagelHeight * 0.9 * scale - bagelHeight / 2 * scale + banisterLength / 2 * scale;
        bagel5.position.z = basePoint[2];
        bagel5.castShadow = true;
        railingSection.add(bagel5);
        //stairCase.push(bagel5);

        //бублик 6
        var bagel6 = new THREE.Mesh(geom, railingMaterial);
        bagel6.rotation.z = -0.25 * Math.PI;
        bagel6.position.x = basePoint[0] - bagelHeight * 0.1 * scale
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
        var poleSize = 12
        var valutShape = drawValut(radBottom, radTop, valutHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(valutShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var dist = valutHeight - radBottom - radTop
        var angle = Math.atan((radBottom + radTop - poleSize) / dist);
        var valutHeightRotated = dist / Math.cos(angle) + radBottom + radTop;


        var valut1 = new THREE.Mesh(geom, railingMaterial);
        valut1.rotation.z = - angle;
        valut1.position.x = basePoint[0] - (radBottom - poleSize / 2) * scale;
        valut1.position.y = basePoint[1] + radBottom * (1 + Math.sin(angle)) * scale + (banisterLength - valutHeightRotated) * 0.5 * scale;
        valut1.position.z = basePoint[2];
        valut1.castShadow = true;
        railingSection.add(valut1);
        //stairCase.push(valut1);

        /*бублики*/
        var bagelWidth = 70;
        var bagelHeight = 120;
        var poleSize = 12
        var bagelShape = drawBagel(bagelWidth, bagelHeight, poleSize, scale);

        var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var bagel1 = new THREE.Mesh(geom, railingMaterial);
        bagel1.rotation.z = - angle;
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
        var poleSize = 12
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
    var rad1 = (bagelWidth - 2 * poleSize) / 2
    var rad2 = bagelWidth / 2;
    var bagelShape = new THREE.Shape();
    bagelShape.moveTo(rad2 * 2 * scale, rad2 * scale);
    bagelShape.lineTo((bagelWidth - poleSize) * scale, bagelWidth / 2 * scale);
    bagelShape.arc(-rad1 * scale, 0 * scale, rad1 * scale, 0, -Math.PI, true)
    bagelShape.lineTo(poleSize * scale, (bagelHeight - rad2) * scale);
    bagelShape.arc(rad1 * scale, 0, rad1 * scale, Math.PI, 0, true)
    bagelShape.lineTo(bagelWidth * scale, (bagelHeight - rad2) * scale);
    bagelShape.arc(-rad2 * scale, 0, rad2 * scale, 0, Math.PI, true)
    bagelShape.lineTo(0 * scale, rad2 * scale);
    bagelShape.arc(rad2 * scale, 0, rad2 * scale, Math.PI, 2 * Math.PI, true)

    return bagelShape;
}


/*кованая волюта*/

function drawValut(radBottom, radTop, valutHeight, poleSize, scale) {
    var rad1 = radBottom - poleSize
    var rad2 = radBottom
    var dist = valutHeight - radBottom - radTop;
    var valutShape = new THREE.Shape();
    //нижний завиток
    valutShape.moveTo(0, 0);
    valutShape.absarc(rad2 * scale, 0, rad2 * scale, Math.PI, 2.5 * Math.PI, true)
    valutShape.lineTo(rad2 * scale, rad1 * scale);
    valutShape.absarc(rad2 * scale, 0, rad1 * scale, 0.5 * Math.PI, -1 * Math.PI, true)
    //перемычка
    valutShape.lineTo(poleSize * scale, dist * scale);
    //верхний завиток
    rad1 = radTop - poleSize
    rad2 = radTop
    valutShape.absarc(-rad1 * scale, dist * scale, rad2 * scale, 0, 1.5 * Math.PI, true)
    valutShape.lineTo(-rad1 * scale, (dist - rad1) * scale);
    valutShape.absarc(-rad1 * scale, dist * scale, rad1 * scale, 1.5 * Math.PI, 0, true)
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


function drawLatheBanister(banisterLength, banisterSize, botEndType, botEndLength, topEndType) {
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
    banister.add(balPart)

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


function drawLatheRack(rackSize) {
    /*возрващает точеный деревянный столб (мэш)*/

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var rackLength = 1000;
    var maxSize = rackSize;
    var minSize = maxSize * 0.6;
    var endPartHeight = rackLength * 0.25;
    var lathePartLength = rackLength - 2 * endPartHeight


    var rack = new THREE.Object3D();

    //точеный участок

    var points = drawLathePart(lathePartLength, minSize / 2, maxSize / 2);

    var latheGeometry = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
    var rackPart = new THREE.Mesh(latheGeometry, timberMaterial);
    rackPart.position.y = endPartHeight;
    rackPart.castShadow = true;
    rack.add(rackPart)


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


function drawTimberRack(rackSize) {
    /*возрващает точеный деревянный столб (мэш)*/

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var rackLength = 1000;
    var rack = new THREE.Object3D();


    //нижний квадратный участок
    var geom = new THREE.BoxGeometry(rackSize, rackLength, rackSize);
    var rackPart = new THREE.Mesh(geom, timberMaterial);
    rackPart.position.x = 0;
    rackPart.position.y = rackLength / 2;
    rackPart.position.z = 0;
    rackPart.castShadow = true;
    rack.add(rackPart);



    return rack;

} // end of drawTimberRack(); 


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

    return (rackPosition);
}

function drawHandrail(par) {

    //локальные переменные

    var poleType = par.poleType
    var poleProfileY = par.poleProfileY
    var poleProfileZ = par.poleProfileZ
    var length = par.length
    var poleAngle = par.poleAngle
    var poleMaterial = par.poleMaterial

    /*прямоугольная палка*/
    if (poleType != "round") {

        var poleGeometry = new THREE.BoxGeometry(length, poleProfileY, poleProfileZ);
        var pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.rotation.z = poleAngle;

        if (basePoint instanceof Object && basePoint.x != undefined) {
            pole.position.x = (length / 2 * Math.cos(poleAngle) - poleProfileY / 2 * Math.sin(poleAngle)) //* scale;
            pole.position.y = (length / 2 * Math.sin(poleAngle) + poleProfileY / 2 * Math.cos(poleAngle)) //* scale;
            pole.position.z = 0;

        }
        pole.castShadow = true;
        par.mesh.add(pole);
    }
    /*круглая палка*/
    if (poleType == "round") {
        var poleRadius = poleProfileY / 2;
        var radiusTop = poleRadius;
        var radiusBottom = poleRadius;
        var height = length;
        var segmentsX = 20
        var segmentsY = 1
        var openEnded = false;


        var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
        var pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.rotation.z = poleAngle - Math.PI / 2;
        pole.position.x = (length / 2 * Math.cos(poleAngle) - poleRadius / 2 * Math.sin(poleAngle));
        pole.position.y = (length / 2 * Math.sin(poleAngle) + poleRadius / 2 * Math.cos(poleAngle));
        pole.position.z = 0//poleRadius;	
        pole.castShadow = true;
        par.mesh.add(pole);

    }

    return par;
}