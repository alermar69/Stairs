
/**
 * ЧЕРЧЕНИЕ ПЕРЕМЫЧКИ
 */
function drawBrigeShape(stringerParams) {
    var text = 'Перемычка';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var brigeShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -105.0);
    var p2 = newPoint_xy(p1, stringerParams.treadWidth + stringerParams.treadSideOffset * 2, 0.0);
    var p3 = newPoint_xy(p0, stringerParams.treadWidth + stringerParams.treadSideOffset * 2, 0.0);
    addLine(brigeShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(brigeShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(brigeShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(brigeShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = brigeShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(center1, stringerParams.treadWidth + stringerParams.treadSideOffset * 2 - 60.0, 0.0);
    var center4 = newPoint_xy(center2, stringerParams.treadWidth + stringerParams.treadSideOffset * 2 - 60.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(center1, 100.0, 0.0);
    center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
    center3 = newPoint_xy(center3, -100.0, 0.0);
    center4 = newPoint_xy(center3, -stringerParams.holeDistU2_200, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    return brigeShape;
}//end of drawBrigeShape


/**
 * Перемычка
 * уголки крепления к тетивам
 * уголки крепления ступени
 * уголки крепления ступени к тетивам
 *
 */
function drawBridgeAngles(stringerParams, ptIns) {
    var bridgeMaterial = new THREE.MeshLambertMaterial({ color: 0x068636, wireframe: false });

    var bridgeExtrudeOptions = {
        amount: stringerParams.bridgeThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    // перемычка
    var brigeShape = drawBrigeShape(stringerParams);
    var geom = new THREE.ExtrudeGeometry(brigeShape, bridgeExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var brige = new THREE.Mesh(geom, bridgeMaterial);
    brige.position.x = ptIns.x + stringerParams.bridgeThickness;
    brige.position.y = ptIns.y + 0.0;
    brige.position.z = stringerParams.stringerThickness;
    brige.rotation.x = 0.0;
    brige.rotation.y = Math.PI * 1.5;
    brige.rotation.z = 0.0;
    brige.castShadow = true;
    stringerParams.group.add(brige);

    // уголки крепления к тетивам
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x + stringerParams.bridgeThickness;
    angle0.position.y = ptIns.y - 100.0;
    angle0.position.z = stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x + stringerParams.bridgeThickness;
    angle0.position.y = ptIns.y;
    angle0.position.z = stringerParams.stringerThickness + stringerParams.treadWidth + stringerParams.treadSideOffset * 2;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления ступени
    var angle1 = drawAngleSupport("У2-40х40х200");
    angle1.position.x = ptIns.x + stringerParams.bridgeThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = stringerParams.stringerThickness + 200.0 + 105.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х200");
    angle1.position.x = ptIns.x + stringerParams.bridgeThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = stringerParams.stringerThickness + stringerParams.treadWidth +
          stringerParams.treadSideOffset * 2 - 105.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.treadWidth + stringerParams.treadSideOffset * 2 + stringerParams.dxfBasePointStep;

} //end of drawBridgeAngles

/**
 * Фланец крепления частей разделённой тетивы или косоура
 * уголки на фланце под ступенью
 */
function drawFlanConcatAngles(stringerParams, flanMaterial) {
    var text = 'Фланец крепления частей';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    if (stringerParams.model == "ко") {
        drawFlanKo(stringerParams);
    }
    else {
        drawFlanLt(stringerParams);
    }
    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(stringerParams.flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert.x;
    flan.position.y = stringerParams.flanPointInsert.y;
    flan.position.z = stringerParams.stringerSideOffset + stringerParams.stringerThickness;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);
    flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert.x;
    flan.position.y = stringerParams.flanPointInsert.y;
    flan.position.z = (stringerParams.M - stringerParams.stringerThickness - flanThickness) - stringerParams.stringerSideOffset;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

    var angle1;
    // уголки на фланцах
    if (stringerParams.model == "лт" && stringerParams.stairFrame == "нет") {
        angle1 = drawAngleSupport("У2-40х40х90");
        angle1.position.x = stringerParams.flanangle1PointInsert.x;
        angle1.position.y = stringerParams.flanangle1PointInsert.y;
        angle1.position.z = stringerParams.stringerThickness + stringerParams.stringerSideOffset + flanThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = 0.0;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х90");
        angle1.position.x = stringerParams.flanangle2PointInsert.x - 90.0;
        angle1.position.y = stringerParams.flanangle2PointInsert.y;
        angle1.position.z = stringerParams.stringerThickness + stringerParams.stringerSideOffset + flanThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = 0.0;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport("У2-40х40х90");
        angle1.position.x = stringerParams.flanangle1PointInsert.x + 90.0;
        angle1.position.y = stringerParams.flanangle1PointInsert.y;
        angle1.position.z = stringerParams.stringerThickness + stringerParams.stringerSideOffset +
          stringerParams.treadWidth + stringerParams.treadSideOffset * 2 - flanThickness;
        angle1.rotation.x = Math.PI * 1.5;
        angle1.rotation.y = Math.PI;
        angle1.rotation.z = 0.0;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х90");
        angle1.position.x = stringerParams.flanangle2PointInsert.x;
        angle1.position.y = stringerParams.flanangle2PointInsert.y;
        angle1.position.z = stringerParams.stringerThickness + stringerParams.stringerSideOffset +
          stringerParams.treadWidth + stringerParams.treadSideOffset * 2 - flanThickness;
        angle1.rotation.x = Math.PI * 1.5;
        angle1.rotation.y = Math.PI;
        angle1.rotation.z = 0.0;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.b + stringerParams.dxfBasePointStep;

} //end of drawFlanConcatAngles

/**
 * Контур задней тетивы промежуточной площадки
 */
function drawRearStringerShape(stringerParams) {
    var text = 'Задняя тетива площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var rearStringerShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, stringerParams.M, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
    addLine(rearStringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    //    // ??? todo: учесть turnFactor
    //    // отверстия под стойку перил
    //    hole1 = new THREE.Path();
    //    hole2 = new THREE.Path();
    //    center1 = newPoint_xy(center1, 50.0, 0.0);
    //    center2 = newPoint_xy(center1, 0.0, -60.0);
    //    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //    holes.push(hole1);
    //    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под стойку 2
                //добавляем отверстия под стйку 1
                addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }
        if (stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Самонесущее стекло") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Кованые балясины") {
					holeRack1 = new THREE.Path();
					holeRack2 = new THREE.Path();
					holeRack3 = new THREE.Path();
					holeRack4 = new THREE.Path();
					centerRack1 = newPoint_xy(center1, 50.0, 0.0);
					centerRack2 = newPoint_xy(centerRack1, 0.0, -60.0);
					//centerRack3 = newPoint_xy(center3, -154.8, 0.0);
					centerRack3 = newPoint_xy(center3, -50.0, 0.0);
					centerRack4 = newPoint_xy(centerRack3, 0.0, -60.0);
					addCircle(holeRack1, dxfPrimitivesArr, centerRack1, stringerParams.holeRad, stringerParams.dxfBasePoint);
					addCircle(holeRack2, dxfPrimitivesArr, centerRack2, stringerParams.holeRad, stringerParams.dxfBasePoint);
					addCircle(holeRack3, dxfPrimitivesArr, centerRack3, stringerParams.holeRad, stringerParams.dxfBasePoint);
					addCircle(holeRack4, dxfPrimitivesArr, centerRack4, stringerParams.holeRad, stringerParams.dxfBasePoint);
					stringerParams.elmIns[stringerParams.key].racks.push({ "x": centerRack1.x, "y": centerRack1.y });
					stringerParams.elmIns[stringerParams.key].racks.push({ "x": centerRack3.x, "y": centerRack3.y });
					holes.push(holeRack1);
					holes.push(holeRack2);
					holes.push(holeRack3);
					holes.push(holeRack4);
        }

        addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    if (stringerParams.stairFrame == "нет") {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(center1, 100.0, 0.0);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        center3 = newPoint_xy(center3, -100.0, 0.0);
        center4 = newPoint_xy(center3, -stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);
    }
    return rearStringerShape;
} //end of drawRearStringerShape

/**
 * Задняя тетива площадки
 * уголки крепления к тетивам
 * уголки крепления площадки
 */
function drawRearStringer(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    // Задняя тетива
    var rearStringerShape = drawRearStringerShape(stringerParams);
    var geom = new THREE.ExtrudeGeometry(rearStringerShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringer = new THREE.Mesh(geom, stringerMaterial);
    rearStringer.position.x = ptIns.x;
    rearStringer.position.y = ptIns.y;
    rearStringer.position.z = ptIns.z;
    rearStringer.rotation.x = 0.0;
    rearStringer.rotation.y = Math.PI * 1.5;
    rearStringer.rotation.z = 0.0;
    rearStringer.castShadow = true;
    stringerParams.group.add(rearStringer);

    // уголки крепления задней тетивы
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0; // - 45.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness + stringerParams.treadWidth + stringerParams.treadSideOffset * 2;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к задней тетиве
    if (stringerParams.stairFrame == "нет") {
        var angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 45.0;
        angle1.position.z = ptIns.z + stringerParams.stringerThickness + 105.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 45.0;
        angle1.position.z = ptIns.z + stringerParams.stringerThickness + stringerParams.treadWidth +
            stringerParams.treadSideOffset * 2 - 200.0 - 105.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.M + stringerParams.dxfBasePointStep;

} //end of drawRearStringer


/**
 * Контур заднего косоура промежуточной площадки
 */
function drawRearStringerKoShape(stringerParams) {
    var text = 'Задний косоур площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var rearStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness
      - stringerParams.stringerSideOffset - stringerParams.stringerThickness, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerKoShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0, -65.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    //  // ??? todo: учесть turnFactor
    //  // отверстия для соединения колонны слева
    //  (setq center1 (polar p1 0 130))   ;смещение по X
    //  (setq center1 (polar center1 (/ pi 2) -65))
    //  (setq center2 (polar center1 (/ pi 2) -60))
    //  (command "_circle" center1 holeRad)
    //  (command "_circle" center2 holeRad)
    //
    //  // отверстия для колонны справа
    //  (setq center1 (polar p2 0 -85))   ;смещение по X
    //  (setq center1 (polar center1 (/ pi 2) -65))
    //  (setq center2 (polar center1 (/ pi 2) -60))
    //  (command "_circle" center1 holeRad)
    //  (command "_circle" center2 holeRad)
    //
    //  // отверстия под стойку перил
    //  (setvar "clayer" "Отверстия для стоек")
    //  (setq center1 (c:new-point p1 80 stepHoleY))
    //  (setq center2 (c:new-point center1 0 -60))
    //  (command "_circle" center1 holeRad)
    //  (command "_circle" center2 holeRad)

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под стойку 2
                //добавляем отверстия под стйку 1
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }
        if (stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Самонесущее стекло") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }

        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p0, 130.0, -20.0);
    center2 = newPoint_xy(center1, 50.0, 0.0);
    center3 = newPoint_xy(p3, -130.0, -20.0);
    center4 = newPoint_xy(center3, -50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);
    return rearStringerKoShape;
} //end of drawRearStringerKoShape

/**
 * Задний косоур площадки
 * уголки крепления к косоурам
 * уголки крепления площадки
 */
function drawRearStringerKo(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    // Задний косоур
    var rearStringerKoShape = drawRearStringerKoShape(stringerParams);
    var geom = new THREE.ExtrudeGeometry(rearStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления заднего косоура
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness
      - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к заднему косоуру
    var angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 110.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness
      - stringerParams.stringerSideOffset - stringerParams.stringerThickness - 105.0 - 100.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.M + stringerParams.dxfBasePointStep;

} //end of drawRearStringerKo

/**
 * Боковой косоур площадки
 * вставка рамки под площадкой
 */
function drawSideStringerKo(key, stringerParams, platformFramesParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Боковой косоур площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.sideLength, 0.0);
    //console.log(stringerParams.platformLength);
    //console.log(stringerParams.stringerSideOffset);

    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = sideStringerKoShape.holes;

    // отверстия под крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия для рамки под площадкой
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, (platformFramesParams.platformLength * 0.5) - 50.0 - stringerParams.a, -20.0);
    center2 = newPoint_xy(center1, stringerParams.stepHoleX2 - stringerParams.stepHoleX1, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия под соединительный фланец
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели") {
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Самонесущее стекло") {
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }

        addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }


    // Боковой косоур
    var geom = new THREE.ExtrudeGeometry(sideStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerKo = new THREE.Mesh(geom, stringerMaterial);
    sideStringerKo.position.x = ptIns.x;
    sideStringerKo.position.y = ptIns.y;
    sideStringerKo.position.z = ptIns.z;
    sideStringerKo.rotation.x = 0.0;
    sideStringerKo.rotation.y = 0.0;
    sideStringerKo.rotation.z = 0.0;
    sideStringerKo.castShadow = true;
    stringerParams.group.add(sideStringerKo);

    stringerParams.dxfBasePoint.x += platformFramesParams.platformLength + stringerParams.dxfBasePointStep;

} //end of drawSideStringerKo

/**
 * Фланец крепления бокового косоура к нижнему маршу
 */
function drawFlanSideConcat(dir, stringerParams, flanMaterial) {
    var text = 'Фланец крепления бокового косоура к нижнему маршу';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    var p1 = newPoint_xy(p0, 0.0, -100.0);
    var p2 = newPoint_xy(p1, 108.0, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 100.0);
    addLine(flanShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = flanShape.holes;

    // отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 20.0, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -20.0, -20.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = 0.0;
    flan.position.y = 0.0;
    flan.position.z = dir == "left" ? 0.0 : -flanThickness;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

    stringerParams.dxfBasePoint.x += 100.0 + stringerParams.dxfBasePointStep;

    return flan;
} //end of drawFlanSideConcat




/**
 * Контур заднего косоура промежуточной площадки для П-образной
 */
function drawRearStringerPKoShape(stringerParams, mm) {
    var rearStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset
      - stringerParams.stringerSideOffset, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerKoShape.holes;

    //    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
    //       stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    // на два марша
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, -65.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, mm - 30.0 + stringerParams.stringerThickness, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -mm + 30.0 - stringerParams.stringerThickness, -65.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    // на два марша
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p0, 130.0 + stringerParams.stringerThickness, -20.0);
    center2 = newPoint_xy(center1, 50.0, 0.0);
    center3 = newPoint_xy(p3, -130.0 - stringerParams.stringerThickness, -20.0);
    center4 = newPoint_xy(center3, -50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p0, mm - 130.0 + stringerParams.stringerThickness, -20.0);
    center2 = newPoint_xy(center1, -50.0, 0.0);
    center3 = newPoint_xy(p3, -mm + 130.0 - stringerParams.stringerThickness, -20.0);
    center4 = newPoint_xy(center3, 50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);
    return rearStringerKoShape;
} //end of drawRearStringerPKoShape

/**
 * Задний косоур площадки для П-образной
 * уголки крепления к косоурам
 * уголки крепления площадки
 */
function drawRearStringerPKo(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Задний косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Задний косоур
    var rearStringerKoShape = drawRearStringerPKoShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(rearStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления заднего косоура
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к заднему косоуру
    // на два марша
    var angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 110.0 + stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
      stringerParams.stringerSideOffset - 105.0 - 100.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 110.0 + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + stringerParams.platformWidth_1 + 5 - stringerParams.stringerSideOffset -
      stringerParams.stringerSideOffset - stringerParams.stringerThickness - 105.0 - 100.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawRearStringerPKo

///**
// * Контур поперечного косоура промежуточной площадки
// */
//function drawTransStringerPKoShape(stringerParams) {
//    var transStringerKoShape = new THREE.Shape();
//
//    var p0 = { "x": 0.0, "y": 0.0 };
//
//    var p1 = newPoint_xy(p0, 0.0, -150.0);
//    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset -
//      stringerParams.stringerSideOffset, 0.0);
//    var p3 = newPoint_xy(p2, 0.0, 150.0);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);
//
//    var holes = transStringerKoShape.holes;
//
//    // отверстия под левый крепежный уголок
//    // отверстия под правый крепежный уголок
//    var hole1 = new THREE.Path();
//    var hole2 = new THREE.Path();
//    var hole3 = new THREE.Path();
//    var hole4 = new THREE.Path();
//    var center1 = newPoint_xy(p0, 30.0, -65.0);
//    var center2 = newPoint_xy(center1, 0.0, -60.0);
//    var center3 = newPoint_xy(p3, -30.0, -65.0);
//    var center4 = newPoint_xy(center3, 0.0, -60.0);
//    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    holes.push(hole1);
//    holes.push(hole2);
//    holes.push(hole3);
//    holes.push(hole4);
//
//    // отверстия под левый опорный уголок площадки
//    // отверстия под правый опорный уголок площадки
//    hole1 = new THREE.Path();
//    hole2 = new THREE.Path();
//    hole3 = new THREE.Path();
//    hole4 = new THREE.Path();
//    center1 = newPoint_xy(p0, 130.0, -20.0);
//    center2 = newPoint_xy(center1, 50.0, 0.0);
//    center3 = newPoint_xy(p3, -130.0, -20.0);
//    center4 = newPoint_xy(center3, -50.0, 0.0);
//    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    holes.push(hole1);
//    holes.push(hole2);
//    holes.push(hole3);
//    holes.push(hole4);
//
//    return transStringerKoShape;
//} //end of drawTransStringerPKoShape

/**
 * Поперечный косоур площадки
 */
function drawTransStringerPKo(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Передний косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Поперечный косоур
    var transStringerKoShape = drawRearStringerPKoShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(transStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления поперечного косоура
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к поперечному косоуру
    // на два марша
    var angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 200.0 + stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + mm - 95.0 - stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - 110.0 -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset - stringerParams.stringerSideOffset;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - mm + 185.0 +
        stringerParams.stringerThickness - stringerParams.stringerSideOffset - stringerParams.stringerSideOffset;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawTransStringerPKo


/**
 * Боковой косоур площадки для П-образной
 * вставка рамки под площадкой
 */
function drawSideStringerPKo(key, stringerParams, holesFrameParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Боковой косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.sideLength, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = sideStringerKoShape.holes;

    // отверстия под крепежный уголок с задним косоуром
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p3, -30.0, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия для рамки под площадкой
    var platformpos = stringerParams.sideLength - (stringerParams.platformLength_1 / 2.0 + 40.0);
    if (platformpos < 100.0) platformpos = 100.0;
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, platformpos, -20.0);
    center2 = newPoint_xy(center1, stringerParams.stepHoleX2 - stringerParams.stepHoleX1, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия под крепежный уголок с поперечным косоуром
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // Боковой косоур
    var geom = new THREE.ExtrudeGeometry(sideStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerKo = new THREE.Mesh(geom, stringerMaterial);
    sideStringerKo.position.x = ptIns.x;
    sideStringerKo.position.y = ptIns.y;
    sideStringerKo.position.z = ptIns.z;
    sideStringerKo.rotation.x = 0.0;
    sideStringerKo.rotation.y = 0.0;
    sideStringerKo.rotation.z = 0.0;
    sideStringerKo.castShadow = true;
    stringerParams.group.add(sideStringerKo);

    stringerParams.dxfBasePoint.x += stringerParams.sideLength + stringerParams.dxfBasePointStep;

} //end of drawSideStringerKo


/**
 * Контур задней тетивы промежуточной площадки для П-образной
 */
function drawRearStringerPLtShape(stringerParams, mm) {
    var text = 'Задняя тетива';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var rearStringerLtShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset
      - stringerParams.stringerSideOffset, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerLtShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    // на два марша
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, mm - 30.0 + stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -mm + 30.0 - stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    if (stairFrame == "нет") {
        // отверстия под левый опорный уголок площадки
        // отверстия под правый опорный уголок площадки
        // на два марша
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(p0, 135.0 + stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center2 = newPoint_xy(center1, stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -135.0 - stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center4 = newPoint_xy(center3, -stringerParams.stringerWidth150, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);

        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(p0, mm - 135.0 + stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center2 = newPoint_xy(center1, -stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -mm + 135.0 - stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center4 = newPoint_xy(center3, stringerParams.stringerWidth150, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);
    }
    return rearStringerLtShape;
} //end of drawRearStringerPLtShape

/**
 * Задняя тетива площадки для П-образной
 * уголки крепления к тетивам, косоурам
 * уголки крепления площадки
 */
function drawRearStringerPLt(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Задняя тетива
    var rearStringerLtShape = drawRearStringerPLtShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(rearStringerLtShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления задней тетивы
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    if (stairFrame == "нет") {
        // уголки крепления площадки к задней тетиве
        // на два марша
        var angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + 110.0 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
          stringerParams.stringerSideOffset - 215.0 - 100.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + 110.0 + stringerParams.platformWidth_1 -
            stringerParams.M + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 + 5 - stringerParams.stringerSideOffset -
          stringerParams.stringerSideOffset - stringerParams.stringerThickness - 215.0 - 100.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawRearStringerPLt

/**
 * Контур поперечного косоура промежуточной площадки для лестницы на тетивах
 */
function drawTransStringerPLtShape(stringerParams, mm) {
    var text = 'Передний косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var transStringerltShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -145.0 + stringerParams.treadThickness);
    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset -
      stringerParams.stringerSideOffset, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 145.0 - stringerParams.treadThickness);
    addLine(transStringerltShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(transStringerltShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(transStringerltShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(transStringerltShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = transStringerltShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    // на два марша
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, -20.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, mm - 14.0 - stringerParams.stringerThickness, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -mm + 14.0 + stringerParams.stringerThickness, -20.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    if (stairFrame == "нет") {
        // отверстия под левый опорный уголок площадки
        // отверстия под правый опорный уголок площадки
        // на два марша
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(p0, 135.0 + stringerParams.stringerThickness, -20.0);
        center2 = newPoint_xy(center1, stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -135.0 - stringerParams.stringerThickness, -20.0);
        center4 = newPoint_xy(center3, -stringerParams.stringerWidth150, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);

        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(p0, mm - 135.0 - stringerParams.stringerThickness, -20.0);
        center2 = newPoint_xy(center1, -stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -mm + 135.0 + stringerParams.stringerThickness, -20.0);
        center4 = newPoint_xy(center3, stringerParams.stringerWidth150, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);
    }

    return transStringerltShape;
} //end of drawTransStringerPLtShape

/**
 * Поперечный косоур площадки для лестницы на тетивах
 */
function drawTransStringerPLt(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Поперечный косоур
    var transStringerltShape = drawTransStringerPLtShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(transStringerltShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления поперечного косоура
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    if (stairFrame == "нет") {
        // уголки крепления площадки к поперечному косоуру
        // на два марша
        var angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + 310.0 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + mm - 110.0 - stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - 110.0 - stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - mm + 310.0 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawTransStringerPLt


/**
 * размеры уголка по обозначению
 */
function getDimsAngle(number) {
    var common = { holePosX: 25.0, holePosY: 20.0 }; // от края до отверстия
    if (number == "У2-40х40х160") {
        common.len = 160.0;
    }
    else if (number == "У2-40х40х200") {
        common.len = 200.0;
    }
    else if (number == "У2-40х40х230") {
        common.len = 230.0;
    }
    else if (number == "У2-40х40х90") {
        common.len = 90.0;
    }
    else if (number == "У2-40х40х100") {
        common.len = 100.0;
    }
    else if (number == "У4-60х60х100") {
        common.len = 100.0;
    }
    else {
        return {};
    }
    return common;
} //end of getDimsAngle

/**
 * Выбор уголка под ступенями
 */
function setStairAngles(stringerParams) {
    // уголок под верхней ступенью
    if (stringerParams.a < 285) {
        stringerParams.angleTopType = "У2-40х40х160";
        stringerParams.holeDist2 = stringerParams.holeDistU2_160;
        stringerParams.angle2Len = 160.0;
    }
    else {
        stringerParams.angleTopType = "У2-40х40х200";
        stringerParams.holeDist2 = stringerParams.holeDistU2_200;
        stringerParams.angle2Len = 200.0;
    }
    // остальные уголки
    if (stringerParams.a > 260) {
        stringerParams.angleBottomType = "У2-40х40х230";
        stringerParams.holeDist = stringerParams.holeDistU2_230;
        stringerParams.angleLen = 230.0;
    }
    else {
        stringerParams.angleBottomType = "У2-40х40х200";
        stringerParams.holeDist = stringerParams.holeDistU2_200;
        stringerParams.angleLen = 200.0;
    }
    if (stringerParams.a < 230) {
        stringerParams.angleBottomType = "У2-40х40х160";
        stringerParams.holeDist = stringerParams.holeDistU2_160;
        stringerParams.angleLen = 160.0;
    }

    // от края до отверстия
    stringerParams.angleHolePosX = 25.0;
    stringerParams.angleHolePosY = 20.0;
} //end of setStairAngles

/**
 * ЗАДАНИЕ РАСПОЛОЖЕНИЯ СТОЕК, ПЕРЕМЫЧЕК, РАЗРЕЗА СРЕДНИХ СТУПЕНЕЙ ;;;
 */
function ltko_set_railing(stairAmt, stringerParams) {
    // номера ступеней, где устанавливается стойка
    stringerParams.railing = [];
    // номера ступеней, где устанавливается перемычка
    stringerParams.brige = [];
    // номер ступени разделения
    stringerParams.divide = 0;

    if (stairAmt == 3) {
        stringerParams.railing = [1, 3];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 3];
		}
        stringerParams.brige = [];
    }
    if (stairAmt == 4) {
        stringerParams.railing = [1, 4];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4];
		}
        stringerParams.brige = [];
    }
    if (stairAmt == 5) {
        stringerParams.railing = [1, 3, 5];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 5];
		}
        stringerParams.brige = [3];
    }
    if (stairAmt == 6) {
        stringerParams.railing = [1, 4, 6];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 3, 4, 6];
		}
        stringerParams.brige = [4];
    }
    if (stairAmt == 7) {
        stringerParams.railing = [1, 4, 7];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 7];
		}
        stringerParams.brige = [4];
    }
    if (stairAmt == 8) {
        stringerParams.railing = [1, 3, 6, 8];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8];
		}
        stringerParams.brige = [5];
    }
    if (stairAmt == 9) {
        stringerParams.railing = [1, 4, 6, 9];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 5, 6, 9];
		}
        stringerParams.brige = [4, 6];
    }
    if (stairAmt == 10) {
        stringerParams.railing = [1, 4, 7, 10];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8, 9, 10];
		}
        stringerParams.brige = [4, 7];
    }
    if (stairAmt == 11) {
        stringerParams.railing = [1, 3, 6, 9, 11];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8, 9, 11];
		}
        stringerParams.brige = [5, 8];
        stringerParams.divide = 7;
    }
    if (stairAmt == 12) {
        stringerParams.railing = [1, 3, 6, 9, 12];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8, 9, 12];
		}
        stringerParams.brige = [5, 8];
        stringerParams.divide = 7;
    }
    if (stairAmt == 13) {
        stringerParams.railing = [1, 4, 7, 10, 13];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 5, 6, 10, 11, 13];
		}
        stringerParams.brige = [5, 9];
        stringerParams.divide = 8;
    }
    if (stairAmt == 14) {
        stringerParams.railing = [1, 3, 6, 9, 12, 14];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 3, 4, 6, 7, 9, 10, 12, 13, 14];
		}
        stringerParams.brige = [6, 10];
        stringerParams.divide = 8;
    }
    if (stairAmt == 15) {
        stringerParams.railing = [1, 3, 6, 9, 12, 15];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 3, 4, 6, 7, 9, 10, 12, 13, 15];
		}
        stringerParams.brige = [6, 10];
        stringerParams.divide = 8;
    }
    if (stairAmt == 16) {
        stringerParams.railing = [1, 4, 7, 10, 13, 16];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8, 9, 12, 13, 16];
			alert("Необходимо вручную сделать отверстие под рутель в соедининительном фланце!");
		}
        stringerParams.brige = [6, 11];
        stringerParams.divide = 9;
    }
    if (stairAmt == 17) {
        stringerParams.railing = [1, 3, 6, 9, 12, 15, 17];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 17];
			alert("Необходимо вручную сделать отверстие под рутель в соедининительном фланце!");
		}
        stringerParams.brige = [7, 12];
        stringerParams.divide = 10;
    }
    if (stairAmt == 18) {
        stringerParams.railing = [1, 4, 7, 10, 13, 16, 18];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8, 9, 12, 13, 16, 17, 18];
		}
        stringerParams.brige = [7, 12];
        stringerParams.divide = 11;
    }
    if (stairAmt == 19) {
        stringerParams.railing = [1, 4, 7, 10, 13, 16, 19];
		if (railingModel == "Самонесущее стекло") {
			stringerParams.railing = [2, 4, 5, 8, 9, 12, 13, 16, 17, 19];
		}
        stringerParams.brige = [7, 12];
        stringerParams.divide = 11;
    }
} //end of ltko_set_railing

/*
 * Тетива
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */
function drawFlanLt(stringerParams, p0, holes) {
    if (p0 === undefined || holes === undefined) {
        stringerParams.flanShape = new THREE.Shape();

        var p0 = { "x": 0.0, "y": 0.0 };

        var p1 = newPoint_xy(p0, 0.0, 0.0);
        var p2 = newPoint_xy(p0, stringerParams.rad1, -100.0);
        var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad1);
        var p3 = newPoint_xy(p0, stringerParams.a - 10.0, -(100.0 - stringerParams.rad1));
        var pc3 = newPoint_xy(p3, -stringerParams.rad1, 0.0);
        var p4 = newPoint_xy(p0, stringerParams.a - 10.0, 0.0);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p1,
          newPoint_xy(p1, 0.0, -(100.0 - stringerParams.rad1)), stringerParams.dxfBasePoint);
        addArc(stringerParams.flanShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p2,
          newPoint_xy(p2, (stringerParams.a - 10.0 - stringerParams.rad1 - stringerParams.rad1), 0.0), stringerParams.dxfBasePoint);
        addArc(stringerParams.flanShape, dxfPrimitivesArr, pc3, stringerParams.rad1, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

        holes = stringerParams.flanShape.holes;
    }
    else {
        stringerParams.flanangle1PointInsert = newPoint_xy(p0, 5.0, 0.0);
        stringerParams.flanangle2PointInsert = newPoint_xy(p0, stringerParams.a - 10.0 - 5.0, 0.0);
    }

    // отверстия

    var p1 = copyPoint(p0);
    var p4 = newPoint_xy(p1, stringerParams.a - 10.0, 0.0);

    // левые отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p1, 25.0, -20.0);
    var center2 = newPoint_xy(center1, 50.0, 0.0);
    var center3 = newPoint_xy(center1, 0.0, -60.0);
    var center4 = newPoint_xy(center1, 50.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p4, -75.0, -20.0);
    center2 = newPoint_xy(center1, 50.0, 0.0);
    center3 = newPoint_xy(center1, 0.0, -60.0);
    center4 = newPoint_xy(center1, 50.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);
} //end of drawFlanLt

/*
 * Косоур
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */
function drawFlanKo(stringerParams, p0, holes) {
    if (p0 === undefined || holes === undefined) {
        stringerParams.flanShape = new THREE.Shape();

        var p0 = { "x": 0.0, "y": 0.0 };

        var cha = 15.0;
        var p1 = newPoint_xy(p0, 0.0, 0.0);
        var p2 = newPoint_xy(p0, 0.0, -150.0);
        var p3 = newPoint_xy(p0, stringerParams.b - 10.0 - cha, -150.0);
        var p4 = newPoint_xy(p0, stringerParams.b - 10.0, -(150.0 - cha));
        var p5 = newPoint_xy(p0, stringerParams.b - 10.0, 0.0);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p5, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p5, p1, stringerParams.dxfBasePoint);

        holes = stringerParams.flanShape.holes;
    }

    // отверстия

    var p1 = copyPoint(p0);
    var p4 = newPoint_xy(p1, stringerParams.b - 10.0, 0.0);

    // левые отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p1, 25.0, -20.0);
    var center2 = newPoint_xy(center1, 50.0, 0.0);
    var center3 = newPoint_xy(center1, 0.0, -110.0);
    var center4 = newPoint_xy(center3, 50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p4, -25.0, -20.0);
    center2 = newPoint_xy(center1, -50.0, 0.0);
    center3 = newPoint_xy(center1, 0.0, -110.0);
    center4 = newPoint_xy(center3, -50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);
} //end of drawFlanKo








/*внешний косоур среднего марша П-образной лестницы*/

function drawStringer5(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, turnLength,
            marshDist, stringerSideOffset) {

    var stringerPlatformHeight = 150;


    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a2 - b2;
        stringerOffset_y = treadThickness;
        //console.log(stringerOffset_y);
    }

    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(stringerOffset_x, -stringerOffset_y);


    /*stringer top line*/

    if (stringerType == "пилообразная" || stringerType == "ломаная") {


        /*низ марша*/
        stringerPlatformHeight = Math.max(h1, h2);
        if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

        if (turnType_1 == "площадка") {
            //площадка
            x1 = stringerOffset_x;
            y1 = stringerPlatformHeight - stringerOffset_y;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + turnLength - stringerOffset_x;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        if (turnType_1 == "забег") {

            //первый забег
            x1 = stringerOffset_x;
            y1 = Math.max(h1, h2) - stringerOffset_y;
            if (stringerType == "ломаная") y1 = stringerWidth - stringerOffset_y;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + (turnLength - L2);
            if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset) * Math.tan(Math.PI / 6));
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x2;
            y1t = y2;

            //второй забег
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = turnLength;
            if (model == 'ко') x2 = x2 + L1;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем
            x2t = x2;
            y2t = y2;
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        /*прямые ступени*/

        for (var i = 1; i < stairAmt2; i++) {
            x1 = b2 * (i - 1) + x0;
            y1 = h2 * i + y0
            stringerShape.lineTo(x1, y1);
            x2 = b2 * i + x0;
            y2 = h2 * i + y0;
            stringerShape.lineTo(x2, y2);
        }
        x0 = x2;
        y0 = y2;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);

        if (turnType_2 == "площадка") {
            //последний подъем
            x1 = x0;
            y1 = y0 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b2;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //площадка
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + turnLength - stringerSideOffset;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_2 == "забег") {
            //последний подъем
            if (stairAmt2) {
                x1 = x0;
                y1 = y0 + h2;
                stringerShape.lineTo(x1, y1);
                x2 = x1 + b2;
                y2 = y1;
                stringerShape.lineTo(x2, y2);
            }
            else {
                x2 = x0 + marshDist;
                y2 = y0;
                stringerShape.lineTo(x2, y2);
            }

            //забег 1
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L2;
            if (model == "ко") x2 = x1 + L2 * (turnLength - stringerSideOffset) / turnLength;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //забег 2
            x1 = x2;
            y1 = y2 + h3;
            stringerShape.lineTo(x1, y1);
            x2 = x1t + turnLength;
            if (model == "ко") x2 = x2 - stringerSideOffset
            y2 = y1;
            stringerShape.lineTo(x2, y2);


        }
        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight;
        if (stringerType == "ломаная") p1_y = y2 - stringerWidth;
        stringerShape.lineTo(p1_x, p1_y);
    }

    if (stringerType == "прямая") {

        /*низ марша*/
        stringerPlatformHeight = Math.max(h1, h2);
        x1 = 0;
        y1 = stringerPlatformHeight;
        stringerShape.lineTo(x1, y1);

        if (turnType_1 == "площадка") {
            //площадка

            x2 = x1 + turnLength - b2;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //базовая точка для прямых ступеней
            x0 = x2 + b2;
            y0 = y2 + h2;
        }

        if (turnType_1 == "забег") {
            //первый забег
            x2 = x1 + (turnLength - L2);
            y2 = y1 + h2;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x2;
            y1t = y2;

            //второй забег
            //x1 = x2 //+ L2;
            //y1 = y2 + h2;
            //stringerShape.lineTo(x1, y1);
            x2 = x2 + L2;
            y2 = y2 + h2;
            if (stairAmt2) stringerShape.lineTo(x2, y2);
            //сохраняем
            x2t = x2;
            y2t = y2;
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }


        x0 = b2 * stairAmt2 + x0;
        y0 = h2 * (stairAmt2 - 1) + y0;

        if (!stairAmt2) x0 = x0 + marshDist;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);

        if (turnType_2 == "площадка") {
            x2 = x0
            y2 = y0 + h2;
            stringerShape.lineTo(x2, y2);

            //площадка

            x2 = x2 + turnLength;
            y2 = y2;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_2 == "забег") {

            //забег 1
            x1 = x0;
            y1 = y0 + h2;
            if (stairAmt2) stringerShape.lineTo(x1, y1);
            x2 = x1 + L2;
            y2 = y1 + h3;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //забег 2

            x2 = x1t + turnLength;
            y2 = y1t + h3;
            stringerShape.lineTo(x2, y2);


        }
        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight;
        stringerShape.lineTo(p1_x, p1_y);



    }

    /*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

        if (turnType_2 == "забег") {
            if (stairAmt2) {
                x1 = x1t + b2;
                y1 = y1t - h2;
                stringerShape.lineTo(x1, y1);
            }
            else {
                x1 = p1_x;
                y1 = p1_y;
            }

        }
        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + b2;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
        }

        if (turnType_1 == "площадка") {
            //stringerShape.moveTo(stringerOffset_x, -stringerOffset_y);
            stringerShape.lineTo(turnLength + stringerOffset_x, -stringerOffset_y);
            stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);

        }

        if (turnType_1 == "забег") {
            if (stairAmt2) {
                x1 = turnLength + b2;
                y1 = h2 + stringerPlatformHeight;
                stringerShape.lineTo(x1, y1);
            }
            stringerShape.lineTo(b2 + stringerOffset_x, -stringerOffset_y);
            stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);
        }
    }

    if (stringerType == "ломаная") {

        if (turnType_2 == "забег") {
            //if (stairAmt2) {
            //второй забег
            x1 = p1_x - (turnLength - L2) + stringerWidth;
            y1 = p1_y //- h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = y1 - h3;
            stringerShape.lineTo(x2, y2);
            //первый забег
            x1 = x2 - L2;
            y1 = y2;
            stringerShape.lineTo(x1, y1);
            x1 = x1;
            y1 = y1 - h2;
            stringerShape.lineTo(x1, y1);

        }
        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + stringerWidth;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
            y1 = y1 - h2;
            stringerShape.lineTo(x1, y1);

        }

        for (var i = 1; i < stairAmt2 + 1; i++) {
            x2 = x1 - b2 * i;
            y2 = y1 - h2 * (i - 1);
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2
            stringerShape.lineTo(x2, y2);
        }
        if (!stairAmt2) {
            x2 = x1 - marshDist;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_1 == "забег") {

            x2 = x2 - L2;
            y2 = y2
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2
            stringerShape.lineTo(x2, y2);
        }


        stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);
    }

    return stringerShape;
}//end of drawStringer5


/*внутренний косоур среднего марша П-образной лестницы*/

function drawStringer6(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, turnLength,
            marshDist, stringerSideOffset) {

    var stringerPlatformHeight = 150;

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a2 - b2;
        stringerOffset_y = treadThickness;
    }
    var stringerPlatformHeight = Math.max(h1, h2);
    if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(0, 0);


    /*stringer top line*/
    if (stringerType == "пилообразная" || stringerType == "ломаная") {

        /*низ марша*/

        if (turnType_1 == "площадка") {
            if (model == "ко") {
                //выступ под площадкой
                x1 = -stringerSideOffset;
                y1 = 0;
                stringerShape.lineTo(x1, y1);
                x2 = x1;
                y2 = stringerPlatformHeight - stringerOffset_y;
                stringerShape.lineTo(x2, y2);
                x2 = 0
                stringerShape.lineTo(x2, y2);
            }
            else {
                //первый подъем
                x2 = 0; //stringerOffset_x;
                y2 = stringerPlatformHeight;
                stringerShape.lineTo(x2, y2);
            }
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        if (turnType_1 == "забег") {
            //выступ под площадкой
            if (model == "ко") {
                x1 = -stringerSideOffset;
                y1 = 0;
                stringerShape.lineTo(x1, y1);
                x2 = x1;
                y2 = h2 - stringerOffset_y;
                stringerShape.lineTo(x2, y2);
                x1 = -(stringerSideOffset - L1) / Math.tan(Math.PI / 6);
                y1 = y2;
                stringerShape.lineTo(x1, y1);
                x1 = x1;
                y1 = y1 + h2;
                stringerShape.lineTo(x1, y1);

                x2 = L1 - stringerSideOffset * Math.tan(Math.PI / 6);
                y2 = y1
                stringerShape.lineTo(x2, y2);

                x2 = x2;
                y2 = y2 + h2;
                stringerShape.lineTo(x2, y2);

                x2 = L1;
                y2 = y2;
                stringerShape.lineTo(x2, y2);
            }
            else {
                //первый подъем
                x2 = 0;
                y2 = 3 * h2;
                stringerShape.lineTo(x2, y2);
            }

            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        /*прямые ступени*/

        for (var i = 1; i < stairAmt2; i++) {
            x1 = b2 * (i - 1) + x0;
            y1 = h2 * i + y0
            stringerShape.lineTo(x1, y1);
            x2 = b2 * i + x0;
            y2 = h2 * i + y0;
            stringerShape.lineTo(x2, y2);
        }
        x0 = x2;
        y0 = y2;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);
        if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

        if (turnType_2 == "площадка") {
            //последний подъем
            x1 = x0;
            y1 = y0 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b2;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //площадка
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + turnLength - stringerSideOffset;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //зад площадки
            var p1_x = x2;
            var p1_y = y2 - stringerPlatformHeight;
            stringerShape.lineTo(p1_x, p1_y);

        }

        if (turnType_2 == "забег") {
            //последний подъем
            if (stairAmt2) {
                x1 = x0;
                y1 = y0 + h2;
                stringerShape.lineTo(x1, y1);
                x2 = x1 + b2;
                y2 = y1;
                stringerShape.lineTo(x2, y2);
            }
            else {
                x2 = x0 + marshDist;
                y2 = y0;
                stringerShape.lineTo(x2, y2);
            }

            //забег 1
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L1 + stringerSideOffset;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //зад площадки
            if (stringerType == "пилообразная") {
                if (stairAmt2) {
                    p1_x = x2;
                    p1_y = y2 - 2 * h2 + L1 * h2 / b2;
                    stringerShape.lineTo(p1_x, p1_y);
                }
                else {
                    p1_x = x2;
                    p1_y = y2 - h2 + L1 * h2 / b2;
                    stringerShape.lineTo(p1_x, p1_y);
                }
            }
            if (stringerType == "ломаная") {
                p1_x = x2;
                p1_y = y2 - h2 - stringerWidth;
                stringerShape.lineTo(p1_x, p1_y);
            }

        }

    }

    if (stringerType == "прямая") {

        /*низ марша*/

        if (turnType_1 == "площадка") {
            //площадка
            x1 = 0;
            y1 = stringerPlatformHeight + h2;
            stringerShape.lineTo(x1, y1);

            //базовая точка для прямых ступеней
            x0 = x1;
            y0 = y1;
        }

        if (turnType_1 == "забег") {

            //первый подъем
            x2 = 0;
            y2 = 3 * h2;
            stringerShape.lineTo(x2, y2);
            if (stairAmt2) {
                x2 = x2;
                y2 = y2 + h2;
                stringerShape.lineTo(x2, y2);
            }
            else {
                x2 = x2 + marshDist;
                y2 = y2 + h2;
                stringerShape.lineTo(x2, y2);
            }
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        x0 = b2 * stairAmt2 + x0;
        y0 = h2 * stairAmt2 + y0;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);

        if (turnType_2 == "площадка") {
            //площадка
            x1 = x0;
            y1 = y0;
            stringerShape.lineTo(x1, y1);
            x2 = x0 + turnLength;
            y2 = y0;
            stringerShape.lineTo(x2, y2);

            //зад площадки
            var p1_x = x2;
            var p1_y = y2 - stringerPlatformHeight;
            stringerShape.lineTo(p1_x, p1_y);

        }

        if (turnType_2 == "забег") {
            //забег 1
            x1 = x0;
            y1 = y0// + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L1;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //зад площадки
            if (stairAmt2) {
                x1 = x2;
                y1 = y2 - 2 * h2 + L1 * h2 / b2;
                stringerShape.lineTo(x1, y1);
            }
            else {
                x1 = x2;
                y1 = y2 - h2 + L1 * h2 / b2;
                stringerShape.lineTo(x1, y1);
            }


        }

    }


    /*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

        if (turnType_2 == "забег") {
        }

        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + b2;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
        }

        if (turnType_1 == "площадка") {
        }

        if (turnType_1 == "забег") {
            /*
                if (model == "ко") x2 = (L1 + 130);
                else x2 = 130;
                y2 = 2*h2 + 130*h2/b2;
                stringerShape.lineTo(x2, y2);
                x1 = 70;
                y1 = 0;
                stringerShape.lineTo(x1, y1);
        */
            if (model == "ко") x2 = (L1 + 130);
            else x2 = 130;
            y2 = 2 * h2 + 130 * h2 / b2;
            stringerShape.lineTo(x2, y2);
            if (model == "ко") x1 = (80 - stringerSideOffset);
            else x1 = 70;
            y1 = 0;
            stringerShape.lineTo(x1, y1);


        }


    }

    if (stringerType == "ломаная") {
        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + stringerWidth;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
            y1 = y1 - h2;
            stringerShape.lineTo(x1, y1);
        }

        if (turnType_2 == "забег") {
            x1 = p1_x - L1 + stringerWidth - stringerSideOffset;
            y1 = p1_y;
        }

        for (var i = 1; i < stairAmt2 + 1; i++) {
            x2 = x1 - b2 * i;
            y2 = y1 - h2 * (i - 1);
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2
            stringerShape.lineTo(x2, y2);
        }

        if (!stairAmt2) {
            x2 = x1 - marshDist;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_1 == "забег") {
            x2 = stringerWidth;
            y2 = 0;
            stringerShape.lineTo(x2, y2);
        }


    }

    stringerShape.lineTo(0, 0);



    return stringerShape;
}//end of drawStringer6




function drawTopFixFlan(length, dxfBasePoint, dxfPrimitivesArr) {
    /*функция отрисовывает верхний фланец крепления к перекрытию ФК-15*/
    // var dxfBasePoint = { "x": 0.0, "y": 0.0 };
    var flanParams = {
        width: 100,
        holeDiam: 13,
        holeDiam5: 0,
        angleRadUp: 10,
        angleRadDn: 10,
        hole1X: 50,
        hole1Y: 20,
        hole2X: 20,
        hole2Y: 20,
        hole3X: 20,
        hole3Y: 20,
        hole4X: 50,
        hole4Y: 80,
        hole5X: 0,
        hole5Y: 0,
        height: length,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    };

    //добавляем фланец
    flanParams = drawRectFlan(flanParams);

    var text = "Фланец верхний";
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, -50, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var thickness = 8;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanParams.shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var metalMaterial = new THREE.MeshLambertMaterial({ color: 0x363636, wireframe: false });
    flanParams.mesh = new THREE.Mesh(geometry, metalMaterial);

    return flanParams;
}//end of drawTopFixFlan


function drawTopFixFrameUnit(unitParams) {
    /*функция отрисовывает блок верхней ступени для крепления с вертикальной рамкой*/
    var topFixUnit = {}
    topFixUnit.frame = new THREE.Object3D();
    topFixUnit.tread = new THREE.Shape();
    topFixUnit.riser = new THREE.Shape();

    var frameFlanThickness = 8;
    var width = unitParams.width - 2 * frameFlanThickness;
    var height = unitParams.height;
    var angleThickess = 4;
    var anglesize = 40;
    var metalMaterial = unitParams.metalMaterial;
    var treadMaterial = unitParams.treadMaterial;


    var firstPosition_x = unitParams.basepoint.x + 90 - 5 - anglesize;
    var firstPosition_y = unitParams.basepoint.y - 20 - 20;
    var firstPosition_z = unitParams.basepoint.z + unitParams.stringerSideOffset;
    if (unitParams.model == "ко") {
        width = width - 2 * unitParams.stringerSideOffset;
        firstPosition_x = unitParams.basepoint.x + unitParams.nose;
    }

    var deltaY = unitParams.h1 - height + 20;

    // нижняя горизонт. полка
    geometry = new THREE.BoxGeometry(anglesize, angleThickess, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + angleThickess / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // нижняя вертик. полка
    geometry = new THREE.BoxGeometry(angleThickess, anglesize, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize - angleThickess / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + anglesize / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // верхняя горизонт. полка
    geometry = new THREE.BoxGeometry(anglesize, angleThickess, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + height - angleThickess / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // верхняя вертик. полка
    geometry = new THREE.BoxGeometry(angleThickess, anglesize, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize - angleThickess / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + height - anglesize / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // фланцы
    var shape = drawTopFrameFlan(height, width, unitParams.dxfBasePoint);
    var extrudeOptions = {
        amount: frameFlanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    // левый фланец
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topLeftFrameFlan = new THREE.Mesh(geometry, metalMaterial);
    topLeftFrameFlan.position.x = firstPosition_x;
    topLeftFrameFlan.position.y = firstPosition_y - unitParams.treadThickness / 2 + deltaY;
    topLeftFrameFlan.position.z = firstPosition_z + unitParams.stringerThickness;
    topFixUnit.frame.add(topLeftFrameFlan);

    // правый фланец
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topRightFrameFlan = new THREE.Mesh(geometry, metalMaterial);
    topRightFrameFlan.position.x = firstPosition_x;
    topRightFrameFlan.position.y = firstPosition_y - unitParams.treadThickness / 2 + deltaY;
    topRightFrameFlan.position.z = firstPosition_z + unitParams.stringerThickness + width + frameFlanThickness;
    topFixUnit.frame.add(topRightFrameFlan);



    // верхний узкий кусок ступени
    var lastTreadWidth = 80;
    if (unitParams.model == "ко") {
        lastTreadWidth = 40 + unitParams.nose;
    }
    console.log(lastTreadWidth, unitParams.treadThickness, unitParams.treadWidth)
    geometry = new THREE.BoxGeometry(lastTreadWidth, unitParams.treadThickness, unitParams.treadWidth);
    var tread;
    tread = new THREE.Mesh(geometry, treadMaterial);
    tread.position.y = firstPosition_y + unitParams.treadThickness / 2 + unitParams.h1;
    tread.position.x = firstPosition_x;
    if (unitParams.model == "ко") {
        tread.position.x = firstPosition_x + 40 - lastTreadWidth / 2;
    }
    tread.position.z = unitParams.M / 2;
    tread.castShadow = true;
    topFixUnit.tread = tread;

    // рисуем подступенок
    riserHeight = unitParams.h1 - unitParams.treadThickness;
    geometry = new THREE.BoxGeometry(unitParams.riserThickness, riserHeight, unitParams.treadWidth);

    var riser;
    riser = new THREE.Mesh(geometry, treadMaterial);
    riser.position.y = firstPosition_y + riserHeight / 2 + unitParams.treadThickness;
    riser.position.x = firstPosition_x - unitParams.riserThickness / 2;
    if (unitParams.model == "ко") {
        riser.position.x = firstPosition_x - unitParams.riserThickness / 2;
    }
    riser.position.z = unitParams.M / 2;
    riser.castShadow = true;
    topFixUnit.riser = riser;

    topFixUnit.complexUnit = new THREE.Object3D();
    topFixUnit.complexUnit.add(topFixUnit.frame);
    topFixUnit.complexUnit.add(topFixUnit.tread);
    topFixUnit.complexUnit.add(topFixUnit.riser);

    //поворот деталей
    topFixUnit.complexUnit.rotation.y = unitParams.basepoint.rotationY;
    //topFixUnit.tread.rotation.y = unitParams.basepoint.rotationY;
    //topFixUnit.riser.rotation.y = unitParams.basepoint.rotationY;


    return topFixUnit;

} //end of drawTopFixFrameUnit()


function drawTopFrameFlan(height, width, dxfBasePoint) {
    var shape = new THREE.Shape();
    flanWidth = 40;
    flanLength = height;

    /*внешний контур*/

    var p1 = { x: 0, y: 0 }
    var p2 = newPoint_xy(p1, flanWidth, 0) // params basePoint, deltaX, deltaY
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0, flanLength);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, -flanWidth, 0);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0, -flanLength);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

    /*первое овальное отверстие*/
    var hole1 = new THREE.Path();
    var holeWidth = 13;
    var center1 = { x: 20, y: 30 };
    var center2 = newPoint_xy(center1, 0, 40);
    var p1 = newPoint_xy(center1, holeWidth / 2, 0);
    var p2 = newPoint_xy(center2, holeWidth / 2, 0);
    var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
    var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
    addLine(hole1, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr0, center2, holeWidth / 2, 0, Math.PI, dxfBasePoint)
    addLine(hole1, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr0, center1, holeWidth / 2, Math.PI, Math.PI * 2, dxfBasePoint)
    shape.holes.push(hole1);

    /*второе овальное отверстие*/
    var hole1 = new THREE.Path();
    var holeWidth = 13;
    var center1 = { x: 20, y: height - 30 - 40 };
    var center2 = newPoint_xy(center1, 0, 40);
    var p1 = newPoint_xy(center1, holeWidth / 2, 0);
    var p2 = newPoint_xy(center2, holeWidth / 2, 0);
    var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
    var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
    addLine(hole1, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr0, center2, holeWidth / 2, 0, Math.PI, dxfBasePoint)
    addLine(hole1, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr0, center1, holeWidth / 2, Math.PI, Math.PI * 2, dxfBasePoint)
    shape.holes.push(hole1);

    return shape;
}



function drawLtTurnFrame1(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var M = frameParams.M;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    /*** ДОБАВЛЕНИЕ ФЛАНЦЕВ ***/

    var rightFlanPosition = stringerThickness;
    var leftFlanPosition = M - 2 * stringerThickness - flanThickness;
    //задаем параметры фланца
    //dxfBasePoint = {x: 0, y: 0};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);
    //var dxfPrimitivesArr = {};
    var alfa = toRadians(20.0215);
    var widthShortFlan = 20 + 20 + 58 + 20 + (20 / Math.cos(alfa));
    var widthLongFlan = widthShortFlan + Math.tan(alfa) * (M - 2 * stringerThickness - 2 * flanThickness);

    /*короткий фланец*/
    var flanParams = {
        width: widthShortFlan,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 40,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 98,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    // координаты отверстий рамки
    var holesCoordinates1_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    // размеры рамки
    var frameDimensions = { x: widthLongFlan, z: M - 2 * stringerThickness };

    //добавляем коротий фланец
    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию короткого фланца
    if (turnFactor == -1) {
        flan.position.x = -frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }
    else {
        //flan.position.x = frameParams.basepoint.x * Math.sin(frameParams.basepoint.rotationY) - flanThickness * Math.cos(frameParams.basepoint.rotationY);
        flan.position.x = (frameParams.basepoint.x - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + 0;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);//-flanThickness * Math.cos(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }

    //добавляем фланец в сцену
    frameParams.frame.add(flan);

    /*длинный фланец*/
    //dxfBasePoint = {x: 0, y: 100};
    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 100)
    flanParams = {
        width: widthLongFlan,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 50,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 98 + 20 + Math.tan(alfa) * (M - 2 * stringerThickness - 2 * flanThickness) - 30,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    }
    var holesCoordinates1_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    //добавляем фланец
    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию фланца
    if (turnFactor == -1) {
        flan.position.x = (-frameParams.basepoint.x + leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }
    else {
        flan.position.x = (frameParams.basepoint.x - (leftFlanPosition + flanThickness)) * Math.cos(frameParams.basepoint.rotationY) + frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + 0;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - (leftFlanPosition + flanThickness)) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }

    //добавляем фланец в сцену
    frameParams.frame.add(flan);

    /*** ДОБАВЛЕНИЕ ПРОФИЛЕЙ ***/

    /*задаем параметры объекта*/

    var profileHeight = 40;
    var profileWidth = 20;
    var angle;
    if (turnFactor == -1) {
        angle = -alfa;
    }
    else {
        angle = alfa;
    }
    var angle1 = Math.PI / 2 - angle;
    var angle2 = Math.PI / 2 - angle;
    var backLength1 = (M - 2 * stringerThickness - 2 * flanThickness) / Math.cos(alfa);
    var backLength2 = M - 2 * stringerThickness - 2 * flanThickness;

    /*задний профиль*/

    //var dxfBasePoint = {x:0, y:200};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 250);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: angle1,
        angle2: angle2,
        backLength: backLength1,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == -1) {
        profile.position.x = (-frameParams.basepoint.x + flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - (widthShortFlan)) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - (widthShortFlan)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY - alfa;
    }
    else {
        profile.position.x = (frameParams.basepoint.x - leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.z - (widthLongFlan)) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - (widthLongFlan)) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = -frameParams.basepoint.rotationY + alfa;
    }
    frameParams.frame.add(profile);

    /*передний профиль*/

    //var dxfBasePoint = {x:0, y:300};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 300);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2,
        angle2: Math.PI / 2,
        backLength: backLength2,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile1 = profileParams.mesh;
    if (turnFactor == -1) {
        profile1.position.x = (-frameParams.basepoint.x + flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        profile1.position.y = frameParams.basepoint.y + profileHeight;
        profile1.position.z = (frameParams.basepoint.z - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile1.rotation.x = Math.PI / 2;
        profile1.rotation.y = 0;
        profile1.rotation.z = frameParams.basepoint.rotationY + 0;
    }
    else {
        profile1.position.x = (frameParams.basepoint.x - leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        profile1.position.y = frameParams.basepoint.y + profileHeight;
        profile1.position.z = (frameParams.basepoint.z - profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
        profile1.rotation.x = Math.PI / 2;
        profile1.rotation.y = 0;
        profile1.rotation.z = -frameParams.basepoint.rotationY + 0;
    }
    frameParams.frame.add(profile1);

    var holesCoordinates = { holesCoordinates1_1: holesCoordinates1_1, holesCoordinates1_2: holesCoordinates1_2 };
    //добавляем объекты в сцену
    frameParams.holesCoordinates = holesCoordinates;
    frameParams.frameDimensions = frameDimensions;
    return frameParams;
}

function drawLtTurnFrame2(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var M = frameParams.M;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    var alfa = toRadians(55.5134);		// угол первого профиля из 3д модели
    var betta = toRadians(22.6552);		// угол второго профиля из 3д модели
    var profileHeight = 40;				// высота профиля
    var profileWidth = 20;				// ширина профиля

    /* Расчёты размеров */

    var a = profileWidth / Math.cos(betta);
    var c = profileWidth / Math.cos(Math.PI / 2 - alfa);
    var flan1Lenght = 80 + c;
    var profile1Lenght = (M - 2 * (stringerThickness + flanThickness)) / Math.sin(alfa);
    var flan2Lenght = M - stringerThickness + c - profile1Lenght * Math.cos(alfa);
    var profile2Lenght = (M - stringerThickness - flanThickness) / Math.cos(betta);
    var flan3Lenght = M - 2 * (stringerThickness + flanThickness) - profile2Lenght * Math.sin(betta);
    var x3_1 = Math.cos(betta) * (profile2Lenght - 50);
    var z3_1 = Math.sin(betta) * (profile2Lenght - 50) + a;
    var x3_2 = Math.cos(alfa) * (profile1Lenght - 50);
    var z3_2 = Math.sin(alfa) * (profile1Lenght - 50);
    var gamma = Math.atan((z3_2 - z3_1) / (x3_2 - x3_1));
    var profile3Lenght = (z3_2 - z3_1) / Math.sin(gamma);
    var gamma1 = Math.PI / 2 + gamma - betta;
    var gamma2 = alfa - gamma - Math.PI / 2;

    /*** ДОБАВЛЕНИЕ ФЛАНЦЕВ ***/

    //var dxfBasePoint = {x: 0, y: 400};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 0.0);
    //var dxfPrimitivesArr = {};

    /** Добавляем первый фланец **/
    var flanParams = {
        width: 40,  //ширина фланца
        height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 5,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    //координаты отверстий
    var holesCoordinates2_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    // рзмеры рамки
    var frameDimensions = { x: (M - 2 * stringerThickness) + flan1Lenght, z: M - 2 * stringerThickness };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию первого фланца
    if (turnFactor == 1) {
        flan.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI / 2;
    }
    else {
        flan.position.x = -(5 + stringerThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - 10) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY - Math.PI;
        flan.rotation.z = -Math.PI / 2;
    }
    frameParams.frame.add(flan);

    /*** Добавляем первый профиль ***/

    //var dxfBasePoint = {x:0, y:550};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 160);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: alfa,
        angle2: alfa,
        backLength: profile1Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {
        profile.position.x = (frameParams.basepoint.x - (flan1Lenght - c)) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + c) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY + Math.PI - alfa;
    }
    else {
        profile.position.x = (frameParams.basepoint.x + (flan1Lenght - c)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - 10 + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + c) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = -Math.PI;
        profile.rotation.z = frameParams.basepoint.rotationY + Math.PI - alfa;
    }
    frameParams.frame.add(profile);

    /** Добавляем второй фланец **/

    //dxfBasePoint = {x: 0, y: 600};
    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 240);

    var flanParams = {
        width: flan2Lenght,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: flan2Lenght - c - 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 0,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 0,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    var holesCoordinates2_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию второго фланца
    if (turnFactor == 1) {
        flan.position.x =
		(frameParams.basepoint.x - (M - stringerThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) -
		(frameParams.basepoint.x + M - stringerThickness - flanThickness) * Math.sin(frameParams.basepoint.rotationY);

        flan.position.y = frameParams.basepoint.y;

        flan.position.z =
		(frameParams.basepoint.z - (M - stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - stringerThickness - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = 0;
    }
    else {
        flan.position.x = (frameParams.basepoint.x + (M - stringerThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + M - stringerThickness - flanThickness - 10) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.height;
        flan.position.z = (frameParams.basepoint.z - (M - stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - stringerThickness - frameParams.basepoint.z)/*(frameParams.basepoint.x + M - flan1Lenght -5)*/ * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI;
    }
    frameParams.frame.add(flan);

    /*** Добавляем второй профиль ***/

    //var dxfBasePoint = {x:0, y:700};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 320);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2 + betta,
        angle2: Math.PI - (alfa - betta),
        backLength: profile2Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {
        profile.position.x =
		(frameParams.basepoint.x - flan1Lenght - profile2Lenght * Math.cos(betta)) * Math.cos(frameParams.basepoint.rotationY) -
		(profile2Lenght * Math.sin(betta) + frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);

        profile.position.y = frameParams.basepoint.y;

        profile.position.z =
		(frameParams.basepoint.z - flanThickness - profile2Lenght * Math.sin(betta)) * Math.cos(frameParams.basepoint.rotationY) +
		(profile2Lenght * Math.cos(betta) - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);

        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY - betta;
    }
    else {
        profile.position.x = (frameParams.basepoint.x + flan1Lenght + profile2Lenght * Math.cos(betta)) * Math.cos(frameParams.basepoint.rotationY) + (profile2Lenght * Math.sin(betta) + frameParams.basepoint.x - 10 + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - flanThickness - profile2Lenght * Math.sin(betta)) * Math.cos(frameParams.basepoint.rotationY) + (profile2Lenght * Math.cos(betta) - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = Math.PI;
        profile.rotation.z = frameParams.basepoint.rotationY - betta;
    }
    frameParams.frame.add(profile);

    /** Добавляем третий фланец**/

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 400);

    flanParams = {
        width: flan3Lenght,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: flan3Lenght - a - 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 0,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 0,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    }
    var holesCoordinates2_3 = { x1: flanParams.hole1X, y1: flanParams.hole1Y };
    //добавляем фланец
    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию фланца
    if (turnFactor == 1) {
        flan.position.x =
		(frameParams.basepoint.x - (M - stringerThickness - flanThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) -
		(frameParams.basepoint.x + M - 2 * stringerThickness - flanThickness) * Math.sin(frameParams.basepoint.rotationY);

        flan.position.y =
		frameParams.basepoint.y;

        flan.position.z =
		(frameParams.basepoint.z - (M - 2 * stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - frameParams.basepoint.z - flanThickness - stringerThickness) * Math.sin(frameParams.basepoint.rotationY);

        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY - Math.PI / 2;
        flan.rotation.z = 0;
    }
    else {
        flan.position.x = (frameParams.basepoint.x + (M - stringerThickness - flanThickness + flan1Lenght) + flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (M + frameParams.basepoint.x - 2 * stringerThickness - flanThickness - 10) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = (frameParams.basepoint.z - (M - 2 * stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) + (M - frameParams.basepoint.z - stringerThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY - Math.PI / 2;
        flan.rotation.z = 0;
    }

    //добавляем фланец в сцену
    frameParams.frame.add(flan);

    /*** Добавляем третий профиль ***/

    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 480);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2 - gamma1,
        angle2: Math.PI / 2 + gamma2,
        backLength: -profile3Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {
        profile.position.x =
		(frameParams.basepoint.x - flan1Lenght - x3_1) * Math.cos(frameParams.basepoint.rotationY) -
		(z3_1 + frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);

        profile.position.y = frameParams.basepoint.y + profileHeight;

        profile.position.z =
		(frameParams.basepoint.z - flanThickness - z3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(x3_1 - frameParams.basepoint.z - 5) * Math.sin(frameParams.basepoint.rotationY);

        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = -frameParams.basepoint.rotationY + gamma;
    }
    else {
        profile.position.x = (frameParams.basepoint.x + flan1Lenght + x3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(z3_1 + frameParams.basepoint.x - 5) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness - z3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(x3_1 - frameParams.basepoint.z - 5) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = -Math.PI;
        profile.rotation.z = -frameParams.basepoint.rotationY + gamma;
    }
    frameParams.frame.add(profile);

    var holesCoordinates = { holesCoordinates2_1: holesCoordinates2_1, holesCoordinates2_2: holesCoordinates2_2, holesCoordinates2_3: holesCoordinates2_3 };
    //добавляем объекты в сцену
    frameParams.holesCoordinates = holesCoordinates;
    frameParams.frameDimensions = frameDimensions;
    return frameParams;
}

function drawLtTurnFrame3(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var limMarshDist = 205;
    var M = frameParams.M;
    var marshDist = frameParams.marshDist;
    var stairModel = frameParams.stairModel;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    if (marshDist < limMarshDist) {									// для маленького межмаршевого расстояния
        //задаем параметры фланца

        var alfa = toRadians(34.4866);
        var profileHeight = 40;				// высота профиля
        var profileWidth = 20;				// ширина профиля

        /* Расчёты размеров */

        var a = profileWidth / Math.cos(alfa);
        var flan1Lenght = 80 + profileWidth;
        var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
        var profile2Lenght = profile1Lenght / Math.cos(alfa);
        var flan2Lenght = profile2Lenght * Math.sin(alfa) + profileWidth;

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);

        /* Первый фланец */

        var flanParams = {
            width: 40,  //ширина фланца
            height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 5,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        // координаты отверстий
        var holesCoordinates3_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
        // размеры рамки
        var frameDimensions = { x: flan2Lenght + flan1Lenght - profileWidth, z: M - 2 * stringerThickness };

        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию первого фланца

        if (turnFactor == 1) {						// для правого
            flan.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.width;
            flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = -Math.PI / 2;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.width;
            flan.position.z = (frameParams.basepoint.z) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = Math.PI;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI / 2;
        }
        frameParams.frame.add(flan);

        /* Первый профиль */

        dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 140);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: Math.PI / 2,
            angle2: Math.PI / 2,
            backLength: profile1Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile = profileParams.mesh;
        if (turnFactor == 1) {									// для правого
            profile.position.x = (frameParams.basepoint.x + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y;
            profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = -Math.PI / 2;
            profile.rotation.y = 0;
            profile.rotation.z = frameParams.basepoint.rotationY + Math.PI / 2;
        }
        else {							// для левого
            profile.position.x = (frameParams.basepoint.x - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y;
            profile.position.z = (frameParams.basepoint.z - flanThickness - profile1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = -Math.PI / 2;
            profile.rotation.y = 0;
            profile.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
        }
        frameParams.frame.add(profile);

        /* Второй профиль */

        dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 200);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: alfa,
            angle2: Math.PI / 2 + alfa,
            backLength: profile2Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile = profileParams.mesh;
        if (turnFactor == 1) {		// для правого
            profile.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y + profileHeight;
            profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = -Math.PI / 2;
            profile.rotation.y = Math.PI;
            profile.rotation.z = -frameParams.basepoint.rotationY + Math.PI / 2 - alfa;
        }
        else {						// для левого
            profile.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y;
            profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = Math.PI / 2;
            profile.rotation.y = Math.PI;
            profile.rotation.z = -frameParams.basepoint.rotationY - Math.PI / 2 - alfa;
        }
        frameParams.frame.add(profile);

        /* Второй фланец */

        dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -100, 0);

        var flanParams = {
            width: 40,  //ширина фланца
            height: flan2Lenght,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 0,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: a + 30,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: profileWidth + 30,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        var holesCoordinates3_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };

        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию второго фланца
        if (turnFactor == 1) {						// для правого
            flan.position.x = (frameParams.basepoint.x - flan2Lenght + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + profile1Lenght + 2 * flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.width;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - flan2Lenght + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = -Math.PI / 2;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x + flan2Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + profile1Lenght + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI / 2;
        }
        frameParams.frame.add(flan);

        var holesCoordinates = { holesCoordinates3_1: holesCoordinates3_1, holesCoordinates3_2: holesCoordinates3_2 };
        //добавляем объекты в сцену
        frameParams.holesCoordinates = holesCoordinates;
        frameParams.frameDimensions = frameDimensions;

        return frameParams;
    }

    else {							// для большого межмаршего расстояния
        //задаем параметры фланца
        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 0.0);

        //константы
        var alfa = 34.4866 * Math.PI / 180;
        var profileHeight = 40;
        var profileWidth = 20;

        //расчёты длин
        var a = profileWidth / Math.cos(alfa);
        var flan1Lenght = 20 + 20 + 58 + 20 + a + marshDist - limMarshDist;
        var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
        var profile2Lenght = profile1Lenght / Math.cos(alfa);
        var flan2Lenght = profile2Lenght * Math.sin(alfa) + flan1Lenght;

        /* первый фланец */

        var flanParams = {
            width: flan1Lenght,  //ширина фланца
            height: 40,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 0,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: 40,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: flan1Lenght - profileWidth - 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        // координаты отверстий
        var holesCoordinates3_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
        // размеры рамки
        var frameDimensions = { x: M - 2 * stringerThickness, z: flan2Lenght };

        //добавляем первый фланец
        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию первого фланца

        if (turnFactor == 1) {						// для правого
            flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y;
            flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = 0;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.height;
            flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI;
        }

        //добавляем фланец в сцену
        frameParams.frame.add(flan);

        /* первый профиль */

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 80);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: Math.PI / 2,
            angle2: Math.PI / 2,
            backLength: profile1Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile1 = profileParams.mesh;
        if (turnFactor == 1) {								// для правого
            profile1.position.x = (frameParams.basepoint.x + flan1Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile1.position.y = frameParams.basepoint.y + profileHeight;
            profile1.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile1.rotation.x = Math.PI / 2;
            profile1.rotation.y = 0;
            profile1.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
        }
        else {												// для левого
            profile1.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile1.position.y = frameParams.basepoint.y + profileHeight;
            profile1.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            profile1.rotation.x = Math.PI / 2;
            profile1.rotation.y = 0;
            profile1.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
        }
        frameParams.frame.add(profile1);

        /* второй профиль */

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 160);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: alfa - Math.PI / 2,
            angle2: alfa - Math.PI / 2,
            backLength: profile2Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile2 = profileParams.mesh;
        if (turnFactor == 1) {								// для правого
            profile2.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile2.position.y = frameParams.basepoint.y + profileHeight;
            profile2.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile2.rotation.x = Math.PI / 2;
            profile2.rotation.y = 0;
            profile2.rotation.z = frameParams.basepoint.rotationY - alfa - Math.PI / 2;
        }
        else {												// для левого
            profile2.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile2.position.y = frameParams.basepoint.y;
            profile2.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            profile2.rotation.x = -Math.PI / 2;
            profile2.rotation.y = 0;
            profile2.rotation.z = frameParams.basepoint.rotationY + Math.PI / 2 - alfa;
        }
        frameParams.frame.add(profile2);

        /* второй фланец */

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 240);

        var flanParams = {
            width: flan2Lenght,  //ширина фланца
            height: 40,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 0,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: a + 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: flan2Lenght - profileWidth - 30,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        var holesCoordinates3_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
        //добавляем второй фланец
        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию второго фланца

        if (turnFactor == 1) {						// для правого
            flan.position.x = (frameParams.basepoint.x - flan2Lenght + flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = 0;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x - flan1Lenght + flan2Lenght) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.height;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI;
        }

        //добавляем фланец в сцену
        frameParams.frame.add(flan);

        var holesCoordinates = { holesCoordinates3_1: holesCoordinates3_1, holesCoordinates3_2: holesCoordinates3_2 };
        //добавляем объекты в сцену
        frameParams.holesCoordinates = holesCoordinates;
        frameParams.frameDimensions = frameDimensions;

        return frameParams;
    }
}

function drawLtTurnFrame3Top(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var M = frameParams.M;
    var marshDist = frameParams.marshDist;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    // константы

    var alfa = toRadians(34.4866);
    var profileHeight = 40;				// высота профиля
    var profileWidth = 20;				// ширина профиля

    /* Расчёты размеров */

    var a = profileWidth / Math.cos(alfa);
    var flan1Lenght = 80 + profileWidth;
    var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
    var profile2Lenght = profile1Lenght / Math.cos(alfa);
    var flan2Lenght = profile2Lenght * Math.sin(alfa) + profileWidth;

    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 0.0);

    /* Первый фланец */

    var flanParams = {
        width: 40,  //ширина фланца
        height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 5,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    // координаты отверстий
    var holesCoordinates3_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    // размеры рамки
    var frameDimensions = { x: M - 2 * stringerThickness, z: flan2Lenght + flan1Lenght - profileWidth };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию первого фланца

    if (turnFactor == 1) {						// для правого
        flan.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI / 2;
    }
    else {										// для левого
        flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = Math.PI;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = Math.PI / 2;
    }
    frameParams.frame.add(flan);

    /* Первый профиль */

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 150);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2,
        angle2: Math.PI / 2,
        backLength: profile1Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {									// для правого
        profile.position.x = (frameParams.basepoint.x + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY + Math.PI / 2;
    }
    else {							// для левого
        profile.position.x = (frameParams.basepoint.x - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness - profile1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
    }
    frameParams.frame.add(profile);

    /* Второй профиль */

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 230);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: alfa,
        angle2: Math.PI / 2 + alfa,
        backLength: profile2Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {		// для правого
        profile.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = Math.PI;
        profile.rotation.z = -frameParams.basepoint.rotationY + Math.PI / 2 - alfa;
    }
    else {						// для левого
        profile.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = Math.PI;
        profile.rotation.z = -frameParams.basepoint.rotationY - Math.PI / 2 - alfa;
    }
    frameParams.frame.add(profile);

    /* Второй фланец */

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -50, 0);

    var flanParams = {
        width: 40,  //ширина фланца
        height: flan2Lenght,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: a + 30,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: profileWidth + 30,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    var holesCoordinates3_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию второго фланца
    if (turnFactor == 1) {						// для правого
        flan.position.x = (frameParams.basepoint.x - flan2Lenght + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + profile1Lenght + 2 * flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - flan2Lenght + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI / 2;
    }
    else {										// для левого
        flan.position.x = (frameParams.basepoint.x + flan2Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + profile1Lenght + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = Math.PI / 2;
    }
    frameParams.frame.add(flan);

    var holesCoordinates = { holesCoordinates3top_1: holesCoordinates3_1, holesCoordinates3top_2: holesCoordinates3_2 };
    //добавляем объекты в сцену
    frameParams.holesCoordinates = holesCoordinates;
    frameParams.frameDimensions = frameDimensions;

    return frameParams;
}








/**
 * расчет точек сопряжения двух отрезков
 * @param {Object} <начальная точка>
 * @param {Double} <угол первого сопрягаемого отрезка>
 * @param {Object} <конечная точка>
 * @param {Double} <угол второго сопрягаемого отрезка>
 * @param {Double} <радиус сопряжения>
 * @return {Object} -
 *   точка пересечения отрезков, начальная точка дуги, конечная точка дуги, центр дуги,
 *   начальный угол дуги, конечный угол дуги
 */
function fillet(pt1, ang1, pt2, ang2, rad) {
    var pti = itercection(pt1, polar(pt1, ang1, 1.0), pt2, polar(pt2, ang2, 1.0));
    if (pti.x !== undefined && pti.y !== undefined) {
        var n = Math.abs(rad / Math.tan((ang2 - ang1) * 0.5));
        var pta = polar(pti, ang1, -n);
        var ptb = polar(pti, ang2, -n);
        var ang = Math.abs(ang2 - ang1);
        ang = ang1 + Math.PI * ((ang2 > ang1 && ang > Math.PI) || (ang2 < ang1 && ang < Math.PI) ? 0.5 : -0.5);
        var ptc = polar(pta, ang, rad);
        return { "int": pti, "start": pta, "end": ptb, "center": ptc, "angstart": anglea(ptc, pta), "angend": anglea(ptc, ptb) };
    }
    else {
        return null;
    }
}

/**
 * угол между осью X и отрезком, соединяющим точки
 * @param {Object} - точка 1
 * @param {Object} - точка 2
 * @return {Double}
 */
function anglea(pt1, pt2) {
    var x = pt2.x - pt1.x;
    var y = pt2.y - pt1.y;
    var ang = Math.acos(x / Math.sqrt(x * x + y * y));
    return pt2.y > pt1.y ? ang : Math.PI + Math.PI - ang;
}


function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function addArc1(centerPoint, radius, startAngle, endAngle, stringerParams) {
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, centerPoint, radius, startAngle, endAngle, stringerParams.dxfBasePoint);

    //Возвращает точку привязки следующего примитива
    return polar(centerPoint, endAngle, radius);
}

function addLine1(startPoint, endPoint, stringerParams) {
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, startPoint, endPoint, stringerParams.dxfBasePoint);

    //Возвращает точку привязки следующего примитива
    return endPoint;
}
