//console.log("drawStringerPartsLt")
/**
 * Тетива
 * универсальная
 */
function drawStringerLt(stringerParams, turnFramesParams, botplatformFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams) {
    /*параметры:
        stringerParams.model
        stringerParams.botEnd
        stringerParams.topEnd
        stringerParams.botEndLength
        stringerParams.topEndLength
        stringerParams.stringerType
        stringerParams.stairFrame
        stringerParams.treadThickness
        stringerParams.botFloorType
        stringerParams.botFloorsDist
        stringerParams.topAnglePosition
        stringerParams.topFlan
        stringerParams.bottomAngleType
        stringerParams.h
        stringerParams.b
        stringerParams.a
        stringerParams.stairAmt
        stringerParams.thickness:
        stringerParams.dxfBasePoint
        stringerParams.dxfPrimitivesArr
        stringerParams.key

        //console.log(stringerParams.model);
        //console.log(stringerParams.botEnd);
        //console.log(stringerParams.topEnd);
        //console.log(stringerParams.botEndLength);
        //console.log(stringerParams.topEndLength);
        //console.log(stringerParams.stringerType);
        //console.log(stringerParams.stairFrame);
        //console.log(stringerParams.treadThickness);
        //console.log(stringerParams.botFloorType);
        //console.log(stringerParams.botFloorsDist);
        //console.log(stringerParams.topAnglePosition);
        //console.log(stringerParams.topFlan);
        //console.log(stringerParams.bottomAngleType);
        //console.log(stringerParams.h);
        //console.log(stringerParams.b);
        //console.log(stringerParams.a);
        //console.log(stringerParams.stairAmt);
        //console.log(stringerParams.thickness);
        //console.log(stringerParams.dxfBasePoint);
        //console.log(stringerParams.dxfPrimitivesArr);
        //console.log(stringerParams.key);
    */
    //console.log(stringerParams.topEndLength);

    var text = "Тетива " + (stringerParams.key === 'out' ? 'внешняя' : 'внутренняя');

    //if (stringerParams.stairModel == "Прямая" && stringerParams.key === (params.turnSide == "правое" ? "in" : "out")) text = text + " (зеркально)";
    if (stringerParams.stairModel == "Прямая" && stringerParams.key === (params.turnSide == "правое" ? "out" : "in")) text = text + " (зеркально)";
    //else if (stringerParams.stairModel != "Прямая" && stringerParams.key === (params.turnSide == "правое" ? "out" : "in")) text = text + " (зеркально)";
    else if (stringerParams.stairModel != "Прямая" && stringerParams.key === (params.turnSide == "правое" ? "in" : "out")) text = text + " (зеркально)";

    if (stringerParams.key === 'mid') text = "Дополнительный косоур";
    var textHeight = 30;
    //var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -200);
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, (stringerParams.botEnd == "platformG" || stringerParams.botEnd == "platformP") ? -350.0 : -150.0);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);


    if (stringerParams.botEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.botEndLength;

    stringerParams.stringerShape = new THREE.Shape();

    stringerParams.stringerShapeNo = new THREE.Shape();
    var key = stringerParams.key;



    // точки вставки уголков, рамок, перемычек
    stringerParams.elmIns[key] = {};
    stringerParams.elmIns[key].angles = [];
    stringerParams.elmIns[key].anglesop = [];
    stringerParams.elmIns[key].angleB = [];
    stringerParams.elmIns[key].angleU = [];
    stringerParams.elmIns[key].briges = [];
    stringerParams.elmIns[key].racks = [];

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;
    if (params.botFloorType === "черновой" && stringerParams.botEnd == "floor") {
        stringerOffset_y = stringerParams.botFloorsDist;
    }
    if (params.botFloorType === "черновой" && stringerParams.botEnd == "winderBot0") {
        stringerOffset_y = stringerParams.botFloorsDist;
    }



    // константы
    stringerParams.holeRad = 6.5;            // радиус (диаметра) отверстий в тетивах
    stringerParams.holeRutelRad = 9;		 // радиус отверстий под рутели в тетиве
    stringerParams.stepHoleX1 = 45;          // координата Х первого отверстия крепления уголка ступени относительно угла косоура
    stringerParams.holeDistU2_230 = 180;     // расстояние между отверстиями для уголка У2-230
    stringerParams.holeDistU2_200 = 150;     // расстояние между отверстиями для уголка У2-200
    stringerParams.holeDistU2_160 = 110;     // расстояние между отверстиями для уголка У2-160
    stringerParams.stepHoleY = -65;          // координата Y отверстий крепления уголка ступени
    stringerParams.stringerWidth = 150;      // ширина тетивы
    stringerParams.rad1 = 10.0;              // Радиус скругления внешних углов
    stringerParams.rad2 = 5.0;               // Радиус скругления внутренних углов
    stringerParams.rad3 = 3.0;               // Радиус скругления внутреннего угла на средней тетиве

    stringerParams.stairAngle1 = Math.atan(stringerParams.h / stringerParams.b);   // вычисляем угол наклона лестницы

    if (stringerParams.stairAmt > 10) {      // марш более 10 ступеней шириной 200мм
        stringerParams.stringerWidth = 200.0;
    }
        
    if ((stringerParams.stairFrame == "есть" && stringerParams.stairType == "дпк") || stringerParams.stairFrame == "лотки") {
        stringerParams.stringerWidth150 = 5.0 + stringerParams.treadThickness + 60.0 + 100.0 + 5.0;
    }
    else {
        stringerParams.stringerWidth150 = 150.0;
    }

    if (stringerParams.stringerType == "ломаная") {
        stringerParams.stringerWidth = 180;
        if (stringerParams.stairAmt > 10) stringerParams.stringerWidth = 200.0;
    }
    if (stringerParams.stringerType == "прямая") stringerParams.stringerWidth = 320;



    // установки размеров под уголки
    setStairAngles(stringerParams);


    //console.log(stringerParams.stringerShape.holes)

    // уголки и рамки
    if (stringerParams.stairFrame == "есть") {
        stringerParams.stepHoleX1 = marshFramesParams.sideHolePosX + 5.0 + marshFramesParams.overhang;
        //stringerParams.holeDist = stringerParams.a - (marshFramesParams.overhang + marshFramesParams.overhang +
        //	marshFramesParams.sideHolePosX + marshFramesParams.sideHolePosX);
        //if (stringerParams.stairType == "дпк") stringerParams.holeDist = marshFramesParams.dpcWidth * 2 + marshFramesParams.dpcDst - (marshFramesParams.overhang + marshFramesParams.overhang +
        //	marshFramesParams.sideHolePosX + marshFramesParams.sideHolePosX);
        marshFramesParams.holeDist = marshFramesParams.width - 90.0;
        stringerParams.holeDist2 = stringerParams.holeDist;
        stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0);      // координата Y отверстий крепления рамки
    }
    if (stringerParams.stairFrame == "лотки") {
        stringerParams.stepHoleX1 = 25 + 8;
        stringerParams.holeDist = stringerParams.a - 25 * 2 - 8;
        stringerParams.holeDist2 = stringerParams.holeDist;
        stringerParams.stepHoleY = -29;
    }



    // тетива
    stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };

    /*низ марша*/

    if (stringerParams.botEnd == "floor") drawBotStepLt_floor(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams);
    if (stringerParams.botEnd == "platformG") drawBotStepLt_pltG(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams);
    if (stringerParams.botEnd == "platformP" && key == "in") drawBotStepLt_pltPIn(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams);
    if (stringerParams.botEnd == "platformP" && key == "out") drawBotStepLt_pltPOut(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams);
    if (stringerParams.botEnd == "winder" && key == "in") drawBotStepLt_wndIn(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams);
    if (stringerParams.botEnd == "winder" && key == "out") drawBotStepLt_wndOut(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams);
    if (stringerParams.botEnd == "winderBot0") drawStringerLt_0Bot_WndG(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams);
    if (stringerParams.botEnd == "winderTop0" && key == "out") drawStringerLt_0Top_WndGOut(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams);
    if (stringerParams.botEnd == "winderTop0" && key == "in") drawStringerLt_0Top_WndGIn(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams);

    /*средние ступени*/

    ltko_set_railing(stringerParams.stairAmt, stringerParams);
    if (stringerParams.stairFrame == "лотки") {
        stringerParams.brige = [];
    }
    var brige = stringerParams.brige; //сохраняем расположение перемычек
    if (!stringerParams.straight) {		// для всех кроме прямой (с самонесущим стеклом, туда я добавил это свойство)
        if ((!stringerParams.stringerLast && key == "in") || (stringerParams.platformIncreased && stringerParams.stringerLast && key == "in")) {
            ltko_set_railing(stringerParams.stairAmt - 1, stringerParams);
            ltko_set_divide(stringerParams.stairAmt, stringerParams);
            if (stringerParams.stairAmt == 3) stringerParams.railing.push(2);
        }
    }
    if (stringerParams.stringerTurn == "забег" && stringerParams.railingModel == "Самонесущее стекло") {
        if (!stringerParams.stringerLast && key == "out") ltko_set_railing(stringerParams.stairAmt - 1, stringerParams);
    }
    stringerParams.brige = brige; //восстанавливаем расположение перемычек
    if (stringerParams.stairAmt > 2)
        drawMiddleStepsLt(stringerParams.stairAmt, stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams);

    /*верх марша*/

    if (stringerParams.topEnd == "floor") drawTopStepLt_floor(stringerParams, turnFramesParams, topplatformFramesParams, marshFramesParams);
    if (stringerParams.topEnd == "platformG") drawTopStepLt_pltG(stringerParams, turnFramesParams, topplatformFramesParams, marshFramesParams);
    if (stringerParams.topEnd == "platformP" && key == "in") drawTopStepLt_pltPIn(stringerParams, turnFramesParams, topplatformFramesParams, marshFramesParams);
    if (stringerParams.topEnd == "platformP" && key == "out") drawTopStepLt_pltPOut(stringerParams, turnFramesParams, topplatformFramesParams, marshFramesParams);
    if (stringerParams.topEnd == "winder" && key == "in") drawTopStepLt_wndIn(stringerParams, turnFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams);
    if (stringerParams.topEnd == "winder" && key == "out") drawTopStepLt_wndOut(stringerParams, turnFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams);

    stringerParams.dxfBasePoint.x += stringerParams.b * stringerParams.stairAmt + stringerParams.dxfBasePointStep;
    if (stringerParams.topEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.topEndLength;

    return stringerParams;
}

/**
 * положение уголков под площадкой при изменении глубины площадки
 * для Г-образной изменяется с шириной марша
 */
function selectStepHoleXsideG1(between) {
    if (between < 650.0) return 80.0;
    else if (between < 800.0) return 110.0;
    else if (between < 1000.0) return 150.0;
    return 200.0;
}
function selectStepHoleXsideG2(between) {
    if (between < 720.0) return 0.0;
    else if (between < 800.0) return 60.0;
    else if (between < 900.0) return 90.0;
    else if (between < 1000.0) return 140.0;
    return 190.0;
}

/**
 * положение уголков под площадкой при изменении глубины площадки
 * для П-образной
 */
function selectStepHoleXsideP2(between) {
    if (between < 640.0) return 0.0;
    else if (between < 720.0) return 60.0;
    else if (between < 790.0) return 90.0;
    else if (between < 880.0) return 130.0;
    else if (between < 980.0) return 80.0;
    return 140.0;
}
function selectStepHoleXsideP3(between) {
    if (between < 880.0) return 0.0;
    else if (between < 920.0) return 60.0;
    else if (between < 1020.0) return 90.0;
    else if (between < 1320.0) return 120.0;
    return 220.0;
}


/**
 * Нижние узлы
 */

/**
 * первый подъем если внизу перекрытие
 */
function drawBotStepLt_floor(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);

    // подъем
    var h_1 = stringerParams.h + 5;            // высота первого подъема
    if (stringerParams.botFloorType === "черновой") {
        h_1 = h_1 + stringerParams.botFloorsDist;
    }
    if (stringerParams.bottomAngleType === "регулируемая опора") {
        var h_1 = h_1 - 20;
        p0 = newPoint_xy(p0, 0.0, 20);
    }

    var p1 = newPoint_xy(p0, 0.0, h_1);
    var p1_1 = newPoint_xy(p0, stringerParams.rad1, h_1);
    var p2 = newPoint_xy(p1_1, stringerParams.b - stringerParams.rad1, 0.0);
    var p3 = newPoint_xy(p0, 0.0, h_1 - stringerParams.rad1);
    var p4 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    if (stringerParams.key === 'mid') {
        p3 = newPoint_xy(p0, 5.0 + marshFramesParams.overhang, h_1 - 5.0 - stringerParams.treadThickness);
        p1_1 = newPoint_xy(p0, stringerParams.rad3, h_1);
    }

    // срез передней кромки
    var p11 = newPoint_xy(p0, 0.0, 100.0);
    var p12 = polar(p11, Math.PI * (5.0 / 3.0), 30.0);
    var fil1 = fillet(p12, Math.PI * (2.0 / 3.0), p3, Math.PI * 1.5, stringerParams.rad1);

    // нижний край тетивы
    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    if (stringerParams.stringerType == "прямая") {
        var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    }

    var p00 = polar(p0, 0.0, 100.0);                         // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);       // точка пересчечения нижнего края и нижней линии марша
    var bottomLineP2 = itercection(p0, p00, p11, p12); //точка пересечения переднего среза и нижней линии

    if (stringerParams.stringerType == "ломаная") {
        bottomLineP1 = newPoint_xy(p0, stringerParams.b + stringerParams.stringerWidth, 0.0);
    }
    var fil2 = fillet(bottomLineP1, Math.PI, p11, Math.PI * (5.0 / 3.0), stringerParams.rad1);

    //скругление левого нижнего угла
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);

    // срез передней кромки
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil1.start, stringerParams.dxfBasePoint);

    //скругление стыка среза и левой вертикальной кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);

    stringerParams.bottomLineP1 = bottomLineP1;

    // подъем
    if (stringerParams.key === 'mid') { // дополнительный косоур на широком марше
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, newPoint_xy(p3, stringerParams.a - marshFramesParams.overhang - stringerParams.rad3 + 5.0, 0.0), stringerParams.dxfBasePoint);
        //   	    p2 = newPoint_xy(p2, stringerParams.a - stringerParams.b - 40.0 + 5.0, 0.0);
    }
    if (stringerParams.key !== 'mid') {
        if (stringerParams.stringerType == "пилообразная" || stringerParams.stringerType == "ломаная") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1_1, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
        }
        if (stringerParams.stringerType == "прямая") {
            var p31 = polar(p1, stringerParams.stairAngle1, 100.0);
            var fil3 = fillet(p0, Math.PI * 0.5, p31, stringerParams.stairAngle1 + Math.PI, stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil3.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);

            var p_t1 = newPoint_xy(p1, stringerParams.b * (stringerParams.stairAmt - 1), stringerParams.h * (stringerParams.stairAmt - 1));
            var p_t2 = newPoint_xy(p_t1, stringerParams.b, 0.0);
            var fil_t1 = fillet(p1, stringerParams.stairAngle1, p_t2, Math.PI, stringerParams.rad1);

            stringerParams.p_t1 = p_t1;
            stringerParams.topLineP2 = fil3.end
            stringerParams.fil_t1 = fil_t1;
        }
    }

    // отверстия под уголок/рамку ступени
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
    stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
    holes.push(hole1);
    holes.push(hole2);

    // зенковка отверстий
    if (stringerParams.key == 'mid') {
        var zencDiam = 20;		// диаметр зенковки

        var pz1 = newPoint_xy(center1, -zencDiam, zencDiam);
        var pz2 = newPoint_xy(center1, zencDiam, -zencDiam);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
        pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
        pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);

        pz1 = newPoint_xy(center2, -zencDiam, zencDiam);
        pz2 = newPoint_xy(center2, zencDiam, -zencDiam);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
        pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
        pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (!(stringerParams.stairAmt < 3 && key == "in")) {
                center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            } else {
                center1 = center2 = 0;
            }
        }

        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            center1 = newPoint_xy(p1_1, stringerParams.a * 0.5 - 5, -115);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            center2 = 0;
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        if (center1 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0) {
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
        }

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (stringerParams.railingModel != "Самонесущее стекло")
            if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)
    }

    // отверстия под нижний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, stringerParams.b / 2 - 30, 35.0);
    if (stringerParams.stringerType == "ломаная") center1 = newPoint_xy(p0, stringerParams.b / 2, 35.0);
    center2 = newPoint_xy(center1, 60.0, 0.0);
    if (params.bottomAngleType === "регулируемая опора") {
        center1 = newPoint_xy(p0, stringerParams.b / 2 - 30, 50.0);
        center2 = newPoint_xy(center1, 60.0, 0.0);
    }
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 35.0 };
    if (params.bottomAngleType === "регулируемая опора") stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 30.0 };
    holes.push(hole1);
    holes.push(hole2);

    stringerParams.pstart = fil2.start;
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = p2;
}//end of drawBotStepLt_floor

/**
 * первый подъем если снизу площадка (Г-образная и трехмаршевая лестница)
 */
function drawBotStepLt_pltG(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    var botStringerWidth;
    if (stringerParams.stringerType !== 'ломаная') {
        if (stringerParams.isStright2Marsh) botStringerWidth = 145.0;
        else botStringerWidth = 105.0;
    }
    else {
        botStringerWidth = stringerParams.stringerWidth + 40 + params.carcasPartsSpacing;
    }

    //console.log(botStringerWidth);
    var p1 = newPoint_xy(p0, botStringerWidth, -stringerParams.stringerWidth150 + 5.0);             // нижний правый угол
    var p2 = newPoint_xy(p0, 40.0, -stringerParams.stringerWidth150 + 5.0);
    p2 = newPoint_xy(p2, params.carcasPartsSpacing, 0.0); //зазор для проверки модели
    var p3 = newPoint_xy(p0, 40.0, 5.0 + 5.0);
    p3 = newPoint_xy(p3, params.carcasPartsSpacing, 0.0); //зазор для проверки модели
    var p4 = newPoint_xy(p0, 0.0, stringerParams.h + 5.0);  // верхний левый угол
    var p40 = copyPoint(p4);
    var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
    var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
    var p5 = newPoint_xy(p40, stringerParams.b - stringerParams.rad2, 0.0);
    if (stringerParams.key === 'mid') {
        var p40 = newPoint_xy(p4, marshFramesParams.overhang + 5.0, -stringerParams.treadThickness - 5.0);
        var p42 = copyPoint(p40);
        var p5 = newPoint_xy(p40, stringerParams.a - stringerParams.rad3 - 5.0, 0.0);
    }
    var pnext = newPoint_xy(p4, stringerParams.b, 0.0);
    var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
    if (stringerParams.stringerType !== 'ломаная') {
        var p11 = polar(p1, Math.PI / 3.0, 100.0);
        var fil1 = fillet(p11, Math.PI * (4.0 / 3.0), p1, 0.0, stringerParams.rad1);
    }
    else {
        var p11 = polar(p1, Math.PI * 0.5, 100.0);
        var fil1 = fillet(p11, Math.PI * 1.5, p1, 0.0, stringerParams.rad1);
    }
    var p31 = polar(p3, Math.PI * (2.0 / 3.0), 30.0);
    var fil2 = fillet(p2, Math.PI * 0.5, p31, Math.PI * (5.0 / 3.0), stringerParams.rad1);
    var fil3 = fillet(p3, Math.PI * (2.0 / 3.0), p40, Math.PI * 1.5, stringerParams.rad1);

    // проверка на обрезку нижней части
    var p20 = newPoint_xy(pnext, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    var testpt = itercection(p21, p20, fil1.start, polar(fil1.start, Math.PI / 3.0, 100.0));
    if (stringerParams.stringerType === "прямая") {
        var testp20 = newPoint_xy(p4, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
        var testp21 = polar(testp20, stringerParams.stairAngle1, 100.0);
        var testpt = itercection(testp21, testp20, fil1.start, polar(fil1.start, Math.PI / 3.0, 100.0));
    }
    var fnocut = testpt.y > p2.y + 5.0;
    if (fnocut) {
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p2, stringerParams.dxfBasePoint);
    }
    var p2_ = copyPoint(p2);
    var pbaseholes1 = copyPoint(p2);
    if (stringerParams.botEndLength > 0.0) {
        // под площадкой
        var pb2 = polar(p2, 0.0, -stringerParams.botEndLength + 5.0);
        //var pbaseholes1 = copyPoint(pb2);
        var pbaseholes1 = newPoint_xy(pb2, -5, 0);
        var pb3;
        var pb3 = newPoint_xy(pb2, 0.0, stringerParams.stringerWidth150);
        var ph = copyPoint(pb3);
        if (stringerParams.key === 'mid') pb3 = newPoint_xy(pb2, 0.0, stringerParams.stringerWidth150 - stringerParams.treadThickness - 5.0);
        //else
        p2_ = newPoint_xy(pb3, stringerParams.botEndLength - 5.0, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, pb2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, pb2, pb3, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, pb3, p2_, stringerParams.dxfBasePoint);
    }
    // подъем
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2_, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, 0.0, Math.PI / 6.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil3.start, stringerParams.dxfBasePoint);
    // срез передней кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);
    if (stringerParams.key === 'mid') {
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, p42, stringerParams.dxfBasePoint);
        // подъем
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
    }
    if (stringerParams.key !== 'mid') {
        if (stringerParams.stringerType === "пилообразная" || stringerParams.stringerType == "ломаная") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, p41, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            // подъем
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
        }
        if (stringerParams.stringerType === "прямая") {
            var p31 = polar(p4, stringerParams.stairAngle1, 100.0);
            var filp = fillet(fil3.end, Math.PI * 0.5, p31, stringerParams.stairAngle1 + Math.PI, stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, filp.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, filp.center, stringerParams.rad1, filp.angstart, filp.angend, stringerParams.dxfBasePoint);

            var p_t1 = newPoint_xy(p4, stringerParams.b * (stringerParams.stairAmt - 1), stringerParams.h * (stringerParams.stairAmt - 1));
            var p_t2 = newPoint_xy(p_t1, stringerParams.b, 0.0);
            var fil_t1 = fillet(p4, stringerParams.stairAngle1, p_t2, Math.PI, stringerParams.rad1);

            stringerParams.p_t1 = p_t1;
            stringerParams.topLineP2 = filp.end
            stringerParams.fil_t1 = fil_t1;
        }
    }
    p1 = copyPoint(p4);


    // отверстия под уголок/рамку ступени
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
    stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
    holes.push(hole1);
    holes.push(hole2);

    // зенковка отверстий
    if (stringerParams.key == 'mid') {
        var zencDiam = 20;		// диаметр зенковки

        var pz1 = newPoint_xy(center1, -zencDiam, zencDiam);
        var pz2 = newPoint_xy(center1, zencDiam, -zencDiam);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
        pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
        pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);

        pz1 = newPoint_xy(center2, -zencDiam, zencDiam);
        pz2 = newPoint_xy(center2, zencDiam, -zencDiam);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
        pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
        pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
    }

    if (stringerParams.stairFrame == "есть") {
        if (platformFramesParams !== undefined) {
            // отверстия под рамки под нижней площадкой
            var begX = platformFramesParams.sideHolePosX;
            var ii;
            for (ii = 0; ii < platformFramesParams.count; ii++) {
                hole1 = new THREE.Path();
                hole2 = new THREE.Path();
                center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
                addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                holes.push(hole1);
                holes.push(hole2);
                begX += platformFramesParams.width + 5.0;
            }
        }
        // отверстия под подкосы
        if (params.middlePltColumns == "подкосы") {
            var braceHoleRad = 6.5;
            var braceHoleDistX = 95;
            var braceHoleDistY = 60;

            if (stringerParams.botEndLength > 500) {
                //if ((stringerParams.key == "out" && params.middlePltConsolePos == "справа") || (stringerParams.key == "in" && params.middlePltConsolePos == "слева")) {
                if ((stringerParams.key == "out" && (params.middlePltConsolePos == "справа" || (params.middlePltConsolePos == "сзади" && params.turnSide == "левое"))) || (stringerParams.key == "in" && (params.middlePltConsolePos == "слева" || (params.middlePltConsolePos == "сзади" && params.turnSide == "правое")))) {
                    // первый подкос (передний)
                    var center1 = newPoint_xy(ph, 160 + stringerParams.stringerThickness - braceHoleDistX * 0.5, -120 + braceHoleDistY * 0.5 - 5);
                    //var center1 = newPoint_xy(ph, 0, 0);
                    var center2 = newPoint_xy(center1, braceHoleDistX, 0);
                    var center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                    var center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                    // второй подкос (задний)
                    center1 = newPoint_xy(ph, stringerParams.botEndLength - 200 - 5 + 20, -120 + braceHoleDistY * 0.5 - 5);
                    center2 = newPoint_xy(center1, braceHoleDistX, 0);
                    center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                    center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                }
            }
        }
    }
    if (stringerParams.stairFrame == "лотки") {
        // отверстия под ступени под площадкой
        if (stringerParams.platformLengthBot1) {
            var countTread = Math.ceil(stringerParams.platformLengthBot1 / 500);
            var widthTread = (stringerParams.platformLengthBot1 - stringerParams.stringerThickness) / countTread - 5;
            var holeDist = widthTread - 25 * 2 - 8;

            for (var i = 0; i < countTread; i++) {
                var hole1 = new THREE.Path();
                var hole2 = new THREE.Path();
                var center1 = newPoint_xy(ph,
                    stringerParams.stepHoleX1 + (widthTread + 5) * i - 4,
                    stringerParams.stepHoleY);
                var center2 = newPoint_xy(center1, holeDist, 0.0);
                addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                holes.push(hole1);
                holes.push(hole2);
            }
        }
    }

    // отверстия под нижний крепежный уголок
    // крепления к площадке
    // для прямой двухмаршевой будет фланец, вместо крепежного уголка
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(pbaseholes1, 35.0, 25.0);
    center2 = newPoint_xy(center1, 0.0, 60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
    holes.push(hole1);
    holes.push(hole2);
    if (stringerParams.isStright2Marsh) {
        // ещё два отверстия для фланца
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, 45.0, 0.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            center1 = newPoint_xy(p42, stringerParams.b * 0.5 - stringerParams.rad1, -115);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            if (key == 'in') {
                if (params.middlePltWidth - params.M >= 450) {
                    center1 = newPoint_xy(ph, 85, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
                }
                if (params.middlePltWidth - params.M <= 250) {
                    center1 = newPoint_xy(p42, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
                else {
                    center1 = newPoint_xy(p42, 30 - 170, -stringerParams.h + stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            }
            else if (params.middlePltWidth - params.M >= 160) {
                center1 = newPoint_xy(p42, 30 - 170, -stringerParams.h + stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }
            else if (key == 'out' && stringerParams.stringerLast && params.stairModel == "Прямая с промежуточной площадкой") {
                center1 = newPoint_xy(p42, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }
            else center1 = center2 = 0;
        }

        if (center1 !== 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }


    if (fnocut) {
        stringerParams.pstart = fil1.start;
        stringerParams.pstartang = Math.PI / 3.0;
    }
    else {
        stringerParams.pstart = p2;
        stringerParams.pstartang = 0.0;
    }
    stringerParams.p2 = pnext;
}//end of drawBotStepLt_pltG

/**
 * первый подъем если снизу площадка (П-образная, внутренняя сторона)
 */
function drawBotStepLt_pltPIn(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    p0 = newPoint_xy(p0, 30.0, 5.0);

    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);             // нижний правый угол
    // под площадкой
    var p01 = polar(p1, 0.0, -stringerParams.botEndLength + 5.0);
    //зазор для проверки модели
    p01 = newPoint_xy(p01, params.carcasPartsSpacing, 0.0);
    var p02 = newPoint_xy(p01, 0.0, stringerParams.stringerWidth150 - 5.0 - stringerParams.treadThickness);
    var p03 = newPoint_xy(p02, stringerParams.botEndLength - 5.0, 0.0);
    // низ
    var p2 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150 + 40.0 - stringerParams.treadThickness);
    var p3 = newPoint_xy(p0, 0.0, 0.0);
    var p4 = newPoint_xy(p0, -30.0, stringerParams.h);  // верхний левый угол
    var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
    var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
    var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
    var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
    var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
    var p11 = polar(p1, Math.PI / 3.0, 100.0);
    var fil1 = fillet(p11, Math.PI * (4.0 / 3.0), p1, 0.0, stringerParams.rad1);
    var p31 = polar(p3, Math.PI * (2.0 / 3.0), 30.0);
    var fil2 = fillet(p2, Math.PI * 0.5, p31, Math.PI * (5.0 / 3.0), stringerParams.rad1);
    var fil3 = fillet(p3, Math.PI * (2.0 / 3.0), p4, Math.PI * 1.5, stringerParams.rad1);

    // под площадкой
    if (stringerParams.stringerType == 'ломаная') {
        var p00 = newPoint_xy(p01, stringerParams.botEndLength + stringerParams.stringerWidth - 5.0, stringerParams.rad1);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p00, -stringerParams.rad1, 0.0), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p00, -stringerParams.rad1, -stringerParams.rad1), p01, stringerParams.dxfBasePoint);
    }
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p01, p02, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p02, p03, stringerParams.dxfBasePoint);
    // подъём
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p03, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, 0.0, Math.PI / 6.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil3.start, stringerParams.dxfBasePoint);
    // срез передней кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, p41, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    // подъем
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);

    p1 = copyPoint(p4);

    if (stringerParams.stairFrame == "нет") {
        // отверстия под уголок ступени
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
        holes.push(hole1);
        holes.push(hole2);

        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25.0;

        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p03, -stringerParams.stepHoleX1 + 5.0, stringerParams.stepHoleY + stringerParams.treadThickness + 5.0);
        var center2 = newPoint_xy(center1, -holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 2 уголок площадки
        var stepHoleXside2 = selectStepHoleXsideP2(stringerParams.botEndLength);
        if (stepHoleXside2 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(p03, -stepHoleXside2 - 335.0, -20.0);
            var center2 = newPoint_xy(center1, -holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под 3 уголок площадки
        var stepHoleXside3 = selectStepHoleXsideP3(stringerParams.botEndLength);
        if (stepHoleXside3 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(p03, -stringerParams.botEndLength + 5.0 + stepHoleXside3 + stringerParams.stepHoleX1, -20.0);
            var center2 = newPoint_xy(center1, holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под рамку ступени
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под рамки под площадкой
        var begX = -platformFramesParams.width - platformFramesParams.overhang + platformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p03, begX, stringerParams.stepHoleY + stringerParams.treadThickness + 5.0);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX -= platformFramesParams.width + 5.0;
        }
    }

    if (stringerParams.stairFrame == "нет") {
        // линия разделения
        p3 = newPoint_xy(p03, -301.0, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0 + stringerParams.treadThickness + 5.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        p3 = newPoint_xy(p3, -stringerParams.stringerThickness, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0 + stringerParams.treadThickness + 5.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);

        // отверстия под уголки крепления к поперечному косоуру площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p03, -271.0, -20.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].angleB.push({ "x": center1.x - 30.0, "y": center1.y + 20.0 });
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, -60.0 - stringerParams.stringerThickness, 0.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

    }


    //Отверстия под ограждения

    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, -115);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)
    }


    // отверстия под нижний крепежный уголок
    // крепления к площадке
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p01, 30.0, 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    stringerParams.pstart = p01;
    if (stringerParams.stringerType == 'ломаная') stringerParams.pstart = p00;
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = pnext;
}//end of drawBotStepLt_pltPIn

/**
 * первый подъем если снизу площадка (П-образная лестница, внешняя сторона)
 */
function drawBotStepLt_pltPOut(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    // подъем
    var p0 = newPoint_xy(stringerParams.p0, -stringerParams.botEndLength + 35.0, -stringerParams.stringerWidth150 + 5.0);
    //зазор для проверки модели
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);
    var p1 = polar(p0, Math.PI * 0.5, stringerParams.stringerWidth150); // высота первого подъема

    // под площадкой
    if (stringerParams.stringerType == 'ломаная') {
        var p00 = newPoint_xy(p0, stringerParams.botEndLength + stringerParams.stringerWidth - 35.0, stringerParams.rad1);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p00, -stringerParams.rad1, 0.0), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p00, -stringerParams.rad1, -stringerParams.rad1), p0, stringerParams.dxfBasePoint);
    }
    var p2 = polar(p1, 0.0, stringerParams.botEndLength - 40.0 - params.carcasPartsSpacing);
    var ph = copyPoint(p2);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    // подъём
    var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(pc2, stringerParams.rad2, 0.0);
    var p4 = newPoint_xy(p3, 0.0, stringerParams.h - stringerParams.rad2 - stringerParams.rad1);
    var p42 = copyPoint(p4);
    var p4c = newPoint_xy(p4, stringerParams.rad1, 0.0);
    var p5 = newPoint_xy(p4c, 0.0, stringerParams.rad1);
    var p6 = newPoint_xy(p5, stringerParams.b - stringerParams.rad1 - stringerParams.rad2, 0.0);
    p2 = newPoint_xy(p6, stringerParams.rad2, 0.0);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p5, p6, stringerParams.dxfBasePoint);


    if (stringerParams.stairFrame == "нет") {
        // отверстия под уголок ступени
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p5, stringerParams.stepHoleX1 - stringerParams.rad1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
        holes.push(hole1);
        holes.push(hole2);

        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25.0;

        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, -stringerParams.stepHoleX1 + 40.0, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, -holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        var rutelHoleBase4 = copyPoint(center2);

        // отверстия под 2 уголок площадки
        var stepHoleXside2 = selectStepHoleXsideP2(stringerParams.botEndLength);
        if (stepHoleXside2 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, -stepHoleXside2 - 300.0, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, -holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под 3 уголок площадки
        var stepHoleXside3 = selectStepHoleXsideP3(stringerParams.botEndLength);
        if (stepHoleXside3 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, -stringerParams.botEndLength + 40.0 + stepHoleXside3 + stringerParams.stepHoleX1, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }

        var rutelHoleBase1 = center1 === undefined ? newPoint_xy(ph, -stringerParams.botEndLength + 90.0 + stringerParams.stepHoleX1, stringerParams.stepHoleY) : copyPoint(center1);
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под рамку ступени
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p5, stringerParams.stepHoleX1 - stringerParams.rad1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под рамки под площадкой
        var begX = -platformFramesParams.width - platformFramesParams.overhang + platformFramesParams.sideHolePosX + 35.0;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX -= platformFramesParams.width + 5.0;
        }
        var rutelHoleBase1 = copyPoint(center1);
    }

    if (stringerParams.stairFrame == "нет") {
        // линия разделения
        p3 = newPoint_xy(ph, -266.0, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        p3 = newPoint_xy(p3, -stringerParams.stringerThickness, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);

        // отверстия под уголки крепления к поперечному косоуру площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, -236.0, -25.0 - stringerParams.treadThickness);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].angleB.push({ "x": center1.x - 30.0, "y": center1.y + 20.0 });
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, -60.0 - stringerParams.stringerThickness, 0.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            // отверстия под стойку 1
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            // отверстия под стойки промежуточной площадки
            //добавляем отверстия под стойку 1
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            // отверстия под стойку 1 промежуточной площадки
            stringerParams.elmIns.rearP = {};
            stringerParams.elmIns.rearP.racks = [];

            center1 = newPoint_xy(p1, 60 + 5 + 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns["rearP"].racks.push({ "x": center1.x, "y": center1.y });

            // отверстия под средние стойки
            if (stringerParams.platformLengthBot > 1000) {
                var middleRackAmt = Math.round(stringerParams.platformLengthBot / 800) - 1;
                if (middleRackAmt < 0) middleRackAmt = 0;
                var rackDist = (stringerParams.platformLengthBot - 200) / (middleRackAmt + 1);
                var racksMiddle = [];
                for (var i = 1; i <= middleRackAmt; i++) {
                    var center11 = newPoint_xy(center1, rackDist * i, 0);
                    var center12 = newPoint_xy(center11, 0.0, -60.0);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    racksMiddle.push({ "x": center11.x, "y": center11.y });
                }
                var number = stringerParams.elmIns["rearP"].racks.length - 1;
                stringerParams.elmIns["rearP"].racks[number].racksMiddle = racksMiddle;
            }

            //добавляем отверстия под стойку 1 промежуточной площадки
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            // отверстия под стойку 2 промежуточной площадки
            center1 = newPoint_xy(ph, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns["rearP"].racks.push({ "x": center1.x, "y": center1.y });

        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(p4, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            // первая пара отверстий под стекло площадки
            //center1 = newPoint_xy(ph, 0, 0);
            center1 = rutelHoleBase1;
            if (stringerParams.stairFrame != "нет") center1 = newPoint_xy(rutelHoleBase1, -17, 0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
            // центральные отверстия для двойного стекла площадки
            //if (stringerParams.botEndLength + 8 + 3 - stringerParams.b> 1000) {
            if (stringerParams.botEndLength - stringerParams.b > 1000) {
                // вторая пара отверстий под стекло площадки
                center1 = newPoint_xy(ph, -stringerParams.botEndLength * 0.5 + 45 - 60, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0, -60);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                // третья пара отверстий под стекло площадки
                center1 = newPoint_xy(center1, 120, 0.0);
                center2 = newPoint_xy(center1, 0, -60);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            }
            // последняя пара отверстий под стекло площадки
            center1 = newPoint_xy(rutelHoleBase4, -60, 0.0);
            if (stringerParams.stairFrame != "нет") center1 = newPoint_xy(ph, -180, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
            // отверстия на первой ступени марша
            center1 = newPoint_xy(p4c, stringerParams.b * 0.5 - stringerParams.rad1, -115);
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            // отверстия под стойку 1
            center1 = newPoint_xy(ph, -stringerParams.botEndLength + 135, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            // отверстия под стойку 2
            center1 = newPoint_xy(ph, -stringerParams.b / 2 + 5.0, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)
    }

    // отверстия под нижний крепежный уголок
    // крепления к площадке
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, 32.0, 25.0 - stringerParams.stringerWidth150);
    center2 = newPoint_xy(center1, 0.0, 60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    stringerParams.pstart = p0;
    if (stringerParams.stringerType == 'ломаная') stringerParams.pstart = p00;
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = p2;
}//end of drawBotStepLt_pltPOut

/**
 * первый подъем если снизу забег (внутренняя сторона марша)
 */
function drawBotStepLt_wndIn(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    p0 = newPoint_xy(p0, 0.0, -stringerParams.h1 - stringerParams.h);
    var h = 0;
    if (stringerParams.h1 < 235 && stringerParams.stairAmt1 == 0) {
        h = 235 - stringerParams.h1;
        p0 = newPoint_xy(p0, 0.0, h);
    }
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели

    if (stringerParams.stairFrame == "есть") {
        var profileHeight = 40;
        var treadSideOffset = stringerParams.treadSideOffset;						// зазор между тетивой и ступенью
        var holeCoordY2 = stringerParams.h - stringerParams.treadThickness - profileHeight / 2 + (stringerParams.h1 - stringerParams.h) - h;		// координата y для отверстий второй забежной ступени
        var holeCoordX2_1 = turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y1;
        var holeCoordX2_2 = turnFramesParams.params.frameParams2.frameDimensions.x - turnFramesParams.params.frameParams2.frameDimensions.z - holeCoordX2_1 - turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y2;
        var holeCoordY3 = holeCoordY2 + stringerParams.h;

        //если третья забежная ступень
        if (typeof (turnStepsParams.params[6]) == "undefined") {
            //var holeCoordX3_1 = 5 + turnStepsParams.params[3].stepWidthLow - 10 + 20;
            var holeCoordX3_1 = 55;
        }
        //если шестая забежная ступень
        if (typeof (turnStepsParams.params[6]) != "undefined") {
            var holeCoordX3_1 = 5 + turnStepsParams.params[6].stepWidthLow - 10 + 20;
        }
        var holeCoordX3_2 = 40;
        if (stringerParams.stairAmt == 0 && stringerParams.marshDist >= 205) {
            holeCoordX3_1 = 5 + 10 / Math.cos(turnStepsParams.params[3].edgeAngle) + (treadSideOffset - 8) * Math.tan(turnStepsParams.params[3].edgeAngle) + turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3_1.x1;
            holeCoordX3_2 = turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3_1.x2 - holeCoordX3_2;
        }
        //var holeCoordX3_1 = 5 + turnStepsParams.params[3].stepWidthLow - 10 + 20;

        // точки
        var p2 = newPoint_xy(p0, 0.0, -(stringerParams.treadThickness + 20 + 45 + 60 + 25) + (stringerParams.h1 - stringerParams.h));
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 3 + (stringerParams.h1 - stringerParams.h) + 5 - h);
        if (stringerParams.stairAmt == 0) {
            p4 = newPoint_xy(p0, 0, stringerParams.h * 2 + (stringerParams.h1 - stringerParams.h) + 5 - h);
        }

        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
        if (stringerParams.stairAmt == 0) {
            p5 = newPoint_xy(p4, (stringerParams.marshDist - 75) - stringerParams.rad2, 0.0);
        }
        var p5 = newPoint_xy(p5, -params.carcasPartsSpacing, 0.0);//уменьшить длину если есть зазор для проверки модели
        var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
        var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
        var p3 = newPoint_xy(p2, 50, 0.0);
        if (stringerParams.stringerType == 'ломаная') {
            p3 = newPoint_xy(p2, stringerParams.stringerWidth - stringerParams.rad1, 0.0);
        }
        var pc = newPoint_xy(p3, 0.0, stringerParams.rad1);
        var pstart = polar(pc, 2 * Math.PI - Math.PI / 18, stringerParams.rad1);	// точка для привязки нижней линии
        /*if (stringerParams.stairAmt == 0) {
    		if ((stringerParams.marshDist - 75) <= -(stringerParams.rad1 + stringerParams.rad2)) {
    			p41 = newPoint_xy(p4, 0.0, -stringerParams.rad2);
    			//p42 = newPoint_xy(p4, -stringerParams.rad2, 0.0);
    			//p4c = newPoint_xy(p41, -stringerParams.rad2, 0.0);
    		}
    	}*/
        if (stringerParams.stairAmt != 0) {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 2 * Math.PI - Math.PI / 18, Math.PI * 1.5, stringerParams.dxfBasePoint);
        }
        else {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 2 * Math.PI - 15.7138 * Math.PI / 180, Math.PI * 1.5, stringerParams.dxfBasePoint);
        }
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p0, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
        if (stringerParams.stairAmt == 1) {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            pnext = copyPoint(p42);
        }
        else {
            if (stringerParams.stairAmt == 0) {
                if ((stringerParams.marshDist - 75) >= stringerParams.rad1) {
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                    // проступь
                    if ((stringerParams.marshDist - 75) != stringerParams.rad1) {
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, pnext, stringerParams.dxfBasePoint);
                    }
                }
                else {
                    // проступь
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p4, stringerParams.dxfBasePoint);
                }
            }
            else {
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                // проступь
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
            }
        }

        p1 = copyPoint(p4);

        // отверстия под рамку ступени
        if (stringerParams.stairAmt > 0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под нижние крепежные уголки
        // первый уголок
        if (h != 0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p2, 30.0, 70 - h);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        } else {
            // первый уголок
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p2, 30.0, 25.0);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
            // второй уголок
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p2, 30.0, 130.0);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[1] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX2_1, holeCoordY2);
        center2 = newPoint_xy(center1, holeCoordX2_2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // третья забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX3_1, holeCoordY3);
        if (params.stairModel == "П-образная трехмаршевая") {
            if (stringerParams.stairAmt3 == 0 && stringerParams.topEnd == "winder") {
                center1 = newPoint_xy(center1, -70, 0);
            }
        }
        if (params.stairModel == "П-образная с забегом") {
            if (stringerParams.stairAmt3 == 0 && stringerParams.topEnd == "winder" && stringerParams.marshDist < 205) {
                center1 = newPoint_xy(center1, -70, 0);
            }
        }
        center2 = newPoint_xy(center1, holeCoordX3_2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        stringerParams.pstart = pstart;
        if (stringerParams.stairAmt == 0 && stringerParams.stringerType != 'ломаная') {
            stringerParams.pstart = pc;
        }
        stringerParams.pstartang = Math.PI / 2 - Math.PI / 18;
        stringerParams.p2 = pnext;
    } //end of stringerParams.stairFrame == "есть"


    if (stringerParams.stairFrame == "нет") {
        var angleHeight = 40;
        var holeCoordY2 = stringerParams.h - stringerParams.treadThickness - angleHeight / 2 + (stringerParams.h1 - stringerParams.h) - h; // координата y для отверстий второй забежной ступени
        var holeCoordX2_1 = turnStepsParams.angles.params.a2_Wnd.x - 8 - 5 - 25;
        var holeCoordX2_2 = holeCoordX2_1 + 50;
        var holeCoordY3 = holeCoordY2 + stringerParams.h;

        // точки
        var p2 = newPoint_xy(p0, 0.0, -(stringerParams.treadThickness + 20 + 55 + 60 + 25 + 5) + (stringerParams.h1 - stringerParams.h));
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 3 + (stringerParams.h1 - stringerParams.h) + 5 - h);
        if (stringerParams.stairAmt == 0) {
            var p4 = newPoint_xy(p0, 0, stringerParams.h * 2 + (stringerParams.h1 - stringerParams.h) + 5 - h);
        }
        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
        if (stringerParams.stairAmt == 0) {
            var offset3_4 = stringerParams.marshDist - 31 - 5; //
            var p5 = newPoint_xy(p4, offset3_4 - stringerParams.rad2, 0.0);
        }
        var p5 = newPoint_xy(p5, -params.carcasPartsSpacing, 0.0);//уменьшить длину если есть зазор для проверки модели
        var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
        var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
        var p3 = newPoint_xy(p2, 50, 0.0);
        if (stringerParams.stringerType == 'ломаная') {
            p3 = newPoint_xy(p2, stringerParams.stringerWidth - stringerParams.rad1, 0.0);
        }
        var pc = newPoint_xy(p3, 0.0, stringerParams.rad1);
        var pstart = polar(pc, 0, stringerParams.rad1);	// точка для привязки нижней линии

        if (stringerParams.stairAmt != 0) {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 2 * Math.PI - Math.PI / 18, Math.PI * 1.5, stringerParams.dxfBasePoint);
        }
        else {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 2 * Math.PI - 15.7138 * Math.PI / 180, Math.PI * 1.5, stringerParams.dxfBasePoint);
        }
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p0, stringerParams.dxfBasePoint);

        if (stringerParams.stairAmt == 1) {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            pnext = copyPoint(p42);
        } else {
            if (stringerParams.stairAmt == 0) {
                if ((stringerParams.marshDist - 31) >= stringerParams.rad1) {
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                    // проступь
                    if ((stringerParams.marshDist - 31) != stringerParams.rad1) {
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
                    }
                } else {
                    // проступь
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p4, stringerParams.dxfBasePoint);
                }
            } else {
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                // проступь
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
            }
        }
        p1 = copyPoint(p4);


        /*отверстия под уголки соединения тетив*/

        var pH = newPoint_xy(p0, 0.0, -(stringerParams.treadThickness + 20) + (stringerParams.h1 - stringerParams.h));
        if (h != 0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(pH, 30.0, -h);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 30.0, "y": center1.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        } else {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(pH, 30.0, 0);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
            // второй уголок
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(center1, 0.0, -60.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[1] = { "x": center1.x - 30.0, "y": center1.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        }
        //console.log(key)

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX2_1, holeCoordY2); //turnStepsParams.angles.params[6].y - stringerParams.treadThickness - 20
        center2 = newPoint_xy(p0, holeCoordX2_2, holeCoordY2); //50 расстояние между двумя отверстиями уголка
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[2] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
        // третья забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX2_1, holeCoordY3);
        center2 = newPoint_xy(p0, holeCoordX2_2, holeCoordY3);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[3] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под перемычку
        if (stringerParams.stairAmt > 0) {
            stringerParams.elmIns[key].briges.push(newPoint_xy(p1, stringerParams.b - stringerParams.rad1 - 5.0 - 6.0 - 60.0, -45.0));
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            hole3 = new THREE.Path();
            hole4 = new THREE.Path();
            center1 = newPoint_xy(p1, stringerParams.b - stringerParams.rad1 - 5.0 - 6.0 - 60.0 + 38.0, -65.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            var center4 = newPoint_xy(p1, 45.0, -65.0);
            var center3 = newPoint_xy(center4, 50.0, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            holes.push(hole3);
            holes.push(hole4);
            stringerParams.elmIns[key].angles.push({ "x": center4.x - stringerParams.angleHolePosX + 5.0, "y": center4.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push("У2-40х40х90");
        }

        stringerParams.pstart = pstart;
        stringerParams.pstartang = Math.PI / 2 - Math.PI / 18;
        if (stringerParams.stairAmt == 0) stringerParams.pstartang = 2 * Math.PI - 15.7138 * Math.PI / 180;
        stringerParams.p2 = pnext;
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.stairAmt != 1 && !(stringerParams.stairAmt == 2 && stringerParams.topEnd == "winder")) {
                center1 = newPoint_xy(p4, stringerParams.b * 0.5, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            } else {
                center1 = center2 = 0;
            }
        }
        /* if (stringerParams.railingModel == "Стекло на стойках") {
             center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
             center2 = newPoint_xy(center1, 0.0, -60.0);
         }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, -110);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        if (center1 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        if (center2 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)


    }
}//end of drawBotStepLt_wndIn

/**
 * первый подъем если снизу забег (внешняя сторона марша)
 */
function drawBotStepLt_wndOut(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    p0 = newPoint_xy(p0, 0.0, -stringerParams.h1 - stringerParams.h);

    if (stringerParams.stairFrame == "есть") {
        //константы
        var topLineStringerProtrusion = 0;
        var stringerProtrusionEdge = 5;					// выступ тетивы за край степени
        var profileHeight = 40;							// высота профиля в рамках
        var angleHoleDistance = 60;						// расстояние между отверстиями в уголках
        var angelLenght = 20 + angleHoleDistance + 20;	// длина уголка
        var angleClearance = 5;							// зазор между уголками
        //var wndBottomAngle = 20 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        var wndBottomAngle = 15 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        //var treadSideOffset = 5;						// зазор между тетивой и ступенью
        var treadSideOffset = stringerParams.treadSideOffset;						// зазор между тетивой и ступенью


        var stringerBackLineLenght = stringerProtrusionEdge + stringerParams.treadThickness + profileHeight + angleClearance + angelLenght + angleClearance + angelLenght + angleClearance;		// длинна задней вертикальной линии тетивы

        var holeCoordY3 = -stringerParams.h - 5 - stringerParams.treadThickness - 20;		// координата y для отверстий второй забежной ступени
        var holeCoordY2 = -5 - stringerParams.treadThickness - 20;		// координата y для отверстий второй забежной ступени
        var holeCoordX2 = stringerParams.stringerThickness + turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_2.x1;
        var holeCoordX2_1 = turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y1;
        var holeCoordX2_2 = turnFramesParams.params.frameParams2.frameDimensions.x - turnFramesParams.params.frameParams2.frameDimensions.z - holeCoordX2_1 - turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y2;
        // проверяем существет ли шестая забежная ступень чтобы определиться откуда брать координаты отверстий
        if (typeof (turnFramesParams.params.frameParams6) != "undefined") {
            if (turnStepsParams.params[6].turnFactor == 1) {
                var holeCoordX3_1 = 5 + turnStepsParams.params[6].stepWidthLow - 10 - turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y1;
                var holeCoordX3_2 = 5 + turnStepsParams.params[6].stepWidthLow - 10 - (turnFramesParams.params.frameParams6.frameDimensions.z - 80) + turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y2;
            }
            else {
                var holeCoordX3_1 = 5 + turnStepsParams.params[6].stepWidthLow - 10 - turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y2;
                var holeCoordX3_2 = 5 + turnStepsParams.params[6].stepWidthLow - 10 - (turnFramesParams.params.frameParams6.frameDimensions.z - 80) + turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y1;
            }
        }
        else {
            var holeCoordX3_1 = 5 + turnStepsParams.params[3].stepWidthLow - 10 - turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3top_2.y2;
            var holeCoordX3_2 = 5 + turnStepsParams.params[3].stepWidthLow - 10 - (turnFramesParams.params.frameParams3.frameDimensions.z - 80) + turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3top_2.y1;
        }
        if (stringerParams.stairAmt == 0) {
            holeCoordX3_1 = 5 + turnStepsParams.params[6].stepWidthLow - 10 - turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y2;
            holeCoordX3_2 = 5 + turnStepsParams.params[6].stepWidthLow - 10 - (turnFramesParams.params.frameParams6.frameDimensions.z - 80) + turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y1;
            if (stringerParams.marshDist >= 205) {
                holeCoordX3_1 = 5 + turnStepsParams.params[3].stepWidthLow - turnStepsParams.params[3].stepWidthHi + (10 / Math.cos(turnStepsParams.params[3].edgeAngle) + (8 - treadSideOffset) * Math.tan(turnStepsParams.params[3].edgeAngle)) + turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3_2.x1;
                holeCoordX3_2 = 5 + turnStepsParams.params[3].stepWidthLow - turnStepsParams.params[3].stepWidthHi + (10 / Math.cos(turnStepsParams.params[3].edgeAngle) + (8 - treadSideOffset) * Math.tan(turnStepsParams.params[3].edgeAngle)) + turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3_2.x2;
            }
            holeCoordX3_1 = holeCoordX3_1 + 5 - (stringerParams.marshDist - 70);
            holeCoordX3_2 = holeCoordX3_2 + 5 - (stringerParams.marshDist - 70);
        }

        var turnStepLength3 = 5 + turnStepsParams.params[3].stepWidthLow - turnStepsParams.params[3].stepWidthHi - 5;			// длина третьей проступи забежного участка

        // точки
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 3 + (stringerParams.h1 - stringerParams.h) + 5);
        if (stringerParams.stairAmt == 0) {
            p4 = newPoint_xy(p0, -5 + (stringerParams.marshDist - 70), stringerParams.h * 3 + (stringerParams.h1 - stringerParams.h) + 5);
        }
        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p1 = newPoint_xy(p4, 0, -stringerParams.h);
        var pCentralHoles = copyPoint(p1);
        var p11 = newPoint_xy(p1, 0, stringerParams.rad2);
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p_1 = newPoint_xy(pc1, 0, -stringerParams.rad2);
        var p_2 = newPoint_xy(p_1, turnStepLength3 + stringerParams.rad2 + stringerParams.rad1, 0);
        if (stringerParams.stairAmt == 0) {
            p_2 = newPoint_xy(p_2, 5 - (stringerParams.marshDist - 70), 0.0);
        }
        var pc_1 = newPoint_xy(p_2, 0.0, -stringerParams.rad1);
        var p_3 = newPoint_xy(p_2, -stringerParams.rad1, -stringerParams.h + stringerParams.rad2);
        var p_4 = newPoint_xy(pc_1, -stringerParams.rad1, 0.0);
        var pc_2 = newPoint_xy(p_3, -stringerParams.rad2, 0.0);
        var p_5 = newPoint_xy(pc_2, 0.0, -stringerParams.rad2);
        var p_6 = newPoint_xy(p_5, -stringerParams.M - turnStepLength3 + 5, 0.0);	// p_6 - опорная точка для отрисовки отверстий под уголки
        var topLineP1 = copyPoint(p_6); //опорная точка для отрисовки отверстий под уголки
        p_6 = newPoint_xy(p_6, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
        /*if (stringerParams.stairAmt == 0) {
    		p_6 = newPoint_xy(p_6, 5, 0.0);
    	}*/
        var p_7 = newPoint_xy(p_6, 0.0, -stringerBackLineLenght);			//передняя линия
        var p_8 = newPoint_xy(p_7, 0.15 * stringerParams.M, 0.0);							// 0.15*stringerParams.M - длина нижней горизотральной линии тетивы (значение в модели 123.185)
        var pc_3 = newPoint_xy(p_8, 0.0, stringerParams.rad1);
        if (stringerParams.stringerType != 'ломаная') {
            if (stringerParams.stairAmt != 0) {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, 1.5 * Math.PI + wndBottomAngle, Math.PI * 1.5, stringerParams.dxfBasePoint);
            }
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_8, p_7, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_7, p_6, stringerParams.dxfBasePoint);
        }
        else {
            var turnStepLength2 = -stringerParams.M - turnStepLength3 + 5;
            var p_7 = newPoint_xy(p_6, 0.0, -stringerParams.h - stringerParams.stringerWidth);
            var p_9 = newPoint_xy(p_6, stringerParams.stringerWidth, -stringerParams.stringerWidth - stringerParams.rad2);
            var p_8 = fillet(p_9, Math.PI * 1.5, p_7, Math.PI * 2.0, stringerParams.rad1);
            var p_10 = newPoint_xy(p_9, -turnStepLength2 - stringerParams.rad2, stringerParams.rad2);
            var p_11 = newPoint_xy(p_10, stringerParams.rad1, stringerParams.h - stringerParams.rad2);
            var p_12 = newPoint_xy(p_11, -turnStepLength3 - stringerParams.rad1, stringerParams.rad2);
            pc_3 = newPoint_xy(p_12, 0.0, stringerParams.rad1);
            if (stringerParams.stairAmt != 0) {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
            }
            //console.log(p_7, p_8, p_9, p_10, p_11, p_12, pc_3);
            //console.log(turnStepLength2, turnStepLength3,stringerParams.M,  stringerParams.stringerThickness);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_12, newPoint_xy(p_11, stringerParams.rad2, stringerParams.rad2), stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p_11, stringerParams.rad2, 0.0), stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_11, newPoint_xy(p_10, stringerParams.rad1, stringerParams.rad1), stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p_10, 0.0, stringerParams.rad1), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_10, newPoint_xy(p_9, stringerParams.rad2, stringerParams.rad2), stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p_9, stringerParams.rad2, 0.0), stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_9, p_8.start, stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, p_8.center, stringerParams.rad1, p_8.angstart, p_8.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_8.end, p_7, stringerParams.dxfBasePoint);//
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_7, p_6, stringerParams.dxfBasePoint);//
        }
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_6, p_5, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_3, p_4, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_2, p_1, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p41, stringerParams.dxfBasePoint);

        if (stringerParams.stringerType != 'ломаная') {
            var pstart = polar(pc_3, 1.5 * Math.PI + wndBottomAngle, stringerParams.rad1);	// точка для привязки нижней линии
            if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
                pstart = copyPoint(p_7);
            }
        }
        else {
            if (stringerParams.stairAmt != 0) var pstart = newPoint_xy(pc_3, stringerParams.rad1, 0.0);
            else var pstart = copyPoint(p_12);
        }

        var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
        var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            pnext = copyPoint(p42);
        }
        var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);

        addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        // подъем
        if (stringerParams.stairAmt > 1) {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
        }
        p1 = copyPoint(p4);

        // отверстия под уголок/рамку ступени
        if (stringerParams.stairAmt > 1 || (stringerParams.stairAmt == 1 && stringerParams.topEnd != "winder")) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под нижние крепежные уголки
        // первый уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_7, 30 + stringerParams.stringerThickness, 25.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
        // второй уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center2, 0.0, 45.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[1] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        center1 = newPoint_xy(p_6, holeCoordX2, holeCoordY2);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        // третья забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var pc = copyPoint(p4);
        if (params.stairModel == "П-образная трехмаршевая") {
            if (stringerParams.stairAmt3 == 0 && stringerParams.topEnd == "winder") {
                pc = newPoint_xy(pc, -70, 0);
            }
        }
        if (params.stairModel == "П-образная с забегом") {
            if (stringerParams.stairAmt3 == 0 && stringerParams.topEnd == "winder" && stringerParams.marshDist < 205) {
                pc = newPoint_xy(pc, -70, 0);
            }
        }
        center1 = newPoint_xy(pc, holeCoordX3_1, holeCoordY3);
        center2 = newPoint_xy(pc, holeCoordX3_2, holeCoordY3);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        stringerParams.pstart = pstart;
        //stringerParams.pstartang = Math.PI / 9;
        stringerParams.pstartang = wndBottomAngle;
        stringerParams.p2 = pnext;
    }


    if (stringerParams.stairFrame == "нет") {
        //константы
        var topLineStringerProtrusion = 0;
        var stringerProtrusionEdge = 5;					// выступ тетивы за край ступени
        var angleHeight = 40;							// высота профиля в рамках
        var angleHoleDistance = 60;						// расстояние между отверстиями в уголках
        var angleLenght = 20 + angleHoleDistance + 20;	// длина уголка
        var angleClearance = 5;							// зазор между уголками
        //var wndBottomAngle = 20 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        var wndBottomAngle = 15 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью

        var stringerBackLineLenght = stringerProtrusionEdge + stringerParams.treadThickness + angleHeight + angleClearance + angleLenght + angleClearance + angleLenght + angleClearance;		// длинна задней вертикальной линии тетивы

        var turnStepLength3 = turnStepsParams.params[3].stepWidthHi - turnStepsParams.params[3].stepWidthLow + stringerParams.stringerThickness;// длина  проступи третьей забежной ступени
        var turnStepLength2 = stringerParams.M - turnStepLength3 - 5 - stringerParams.stringerThickness;// длина проступи второй забежной ступени

        var angleHoleY = 20;
        var angleLenghtWnd = turnStepsParams.angles.params.angleLength;	// длина уголка для забежных ступеней


        // точки
        //
        //console.log(stringerParams.h, stringerParams.h1)
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 2 + stringerParams.h1 + 5);

        if (stringerParams.stairAmt == 0) {
            p4 = newPoint_xy(p0, -5 + (stringerParams.marshDist - 33), stringerParams.h * 3 + (stringerParams.h1 - stringerParams.h) + 5);
        }

        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p1 = newPoint_xy(p4, 0, -stringerParams.h);
        var pCentralHoles = copyPoint(p1);
        var p11 = newPoint_xy(p1, 0, stringerParams.rad2);
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p_1 = newPoint_xy(pc1, 0, -stringerParams.rad2);
        var p_2 = newPoint_xy(p_1, -turnStepLength3 + stringerParams.rad2 + stringerParams.rad1, 0);//угол 3 забежной ступени
        if (stringerParams.stairAmt == 0) {
            p_2 = newPoint_xy(p_2, 5 - (stringerParams.marshDist - 34), 0.0);
        }
        var pc_1 = newPoint_xy(p_2, 0.0, -stringerParams.rad1);
        var p_3 = newPoint_xy(p_2, -stringerParams.rad1, -stringerParams.h + stringerParams.rad2);
        var p_4 = newPoint_xy(pc_1, -stringerParams.rad1, 0.0);
        var pc_2 = newPoint_xy(p_3, -stringerParams.rad2, 0.0);
        var p_5 = newPoint_xy(pc_2, 0.0, -stringerParams.rad2); //дальний угол 2 забежной ступени
        var p_6 = newPoint_xy(p_5, -turnStepLength2, 0.0);	// верхний угол тетивы
        var topLineP1 = copyPoint(p_6); //опорная точка для отрисовки отверстий под уголки
        p_6 = newPoint_xy(p_6, params.carcasPartsSpacing, 0.0); //зазор для проверки модели
        var p_7 = newPoint_xy(p_6, 0.0, -stringerBackLineLenght);			//передняя линия
        var p_8 = newPoint_xy(p_7, 0.15 * stringerParams.M, 0.0);				// 0.15*stringerParams.M - длина нижней горизотральной линии тетивы (значение в модели 123.185)
        var pc_3 = newPoint_xy(p_8, 0.0, stringerParams.rad1);
        if (stringerParams.stringerType != 'ломаная') {
            if (stringerParams.stairAmt > 1) {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, 1.5 * Math.PI + wndBottomAngle, Math.PI * 1.5, stringerParams.dxfBasePoint);
                //нижняя горизонтальная линия
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_8, p_7, stringerParams.dxfBasePoint);
            }
            //левая вертикальная линия
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_7, p_6, stringerParams.dxfBasePoint);// подъем на 2-ую
        }
        else {
            var p_7 = newPoint_xy(p_6, 0.0, -stringerParams.h - stringerParams.stringerWidth);
            var p_9 = newPoint_xy(p_6, stringerParams.stringerWidth, -stringerParams.stringerWidth - stringerParams.rad2);
            var p_8 = fillet(p_9, Math.PI * 1.5, p_7, Math.PI * 2.0, stringerParams.rad1);
            var p_10 = newPoint_xy(p_9, turnStepLength2 - stringerParams.rad2, stringerParams.rad2);
            var p_11 = newPoint_xy(p_10, stringerParams.rad1, stringerParams.h - stringerParams.rad2);
            var p_12 = newPoint_xy(p_11, turnStepLength3 - stringerParams.rad1, stringerParams.rad2);
            pc_3 = newPoint_xy(p_12, 0.0, stringerParams.rad1);
            if (stringerParams.stairAmt != 0) {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
            }
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_12, newPoint_xy(p_11, stringerParams.rad2, stringerParams.rad2), stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p_11, stringerParams.rad2, 0.0), stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_11, newPoint_xy(p_10, stringerParams.rad1, stringerParams.rad1), stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p_10, 0.0, stringerParams.rad1), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_10, newPoint_xy(p_9, stringerParams.rad2, stringerParams.rad2), stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p_9, stringerParams.rad2, 0.0), stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_9, p_8.start, stringerParams.dxfBasePoint);//
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, p_8.center, stringerParams.rad1, p_8.angstart, p_8.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_8.end, p_7, stringerParams.dxfBasePoint);//
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_7, p_6, stringerParams.dxfBasePoint);//
        }


        //первая забежная проступь
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_6, p_5, stringerParams.dxfBasePoint);// проступь 2-ая
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        //подъем
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_3, p_4, stringerParams.dxfBasePoint);// подъем на 3-ую
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        //вторая забежная проступь
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_2, p_1, stringerParams.dxfBasePoint);// проступь 3-ая
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        //подъем
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p41, stringerParams.dxfBasePoint);

        if (stringerParams.stringerType != 'ломаная') {
            var pstart = polar(pc_3, 1.5 * Math.PI + wndBottomAngle, stringerParams.rad1);	// точка для привязки нижней линии
            if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) pstart = copyPoint(p_7);
        }
        else {
            if (stringerParams.stairAmt != 0) var pstart = newPoint_xy(pc_3, stringerParams.rad1, 0.0);
            else var pstart = copyPoint(p_12);
        }

        var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
        var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            pnext = copyPoint(p42);
        }
        var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);

        addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        // подъем
        if (stringerParams.stairAmt > 1) {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
        }
        p1 = copyPoint(p4);

        // отверстия под нижние крепежные уголки
        // первый уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(topLineP1, 30, 25.0 - stringerBackLineLenght);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
        // второй уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center2, 0.0, 45.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[1] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);

        var xOfssetCenterAngle = angleLenghtWnd / 2 - 25;
        var pWnd = newPoint_xy(p0, -stringerParams.stringerThickness - stringerParams.treadSideOffset, -stringerParams.treadThickness - angleHoleY + (stringerParams.h1 - stringerParams.h));
        var anglParam = turnStepsParams.angles.params;
        var tFr = turnStepsParams.turnFactor;

        //todo: anglParam.a2_2.y anglParam.a3_1.y anglParam.a3_2.y
        var p_wnd2_2 = newPoint_xy(pWnd, tFr * (anglParam.a2_2.x), stringerParams.h);    // опорная точка для отверстий уголка второй забежной ступени
        var p_wnd3_1 = newPoint_xy(pWnd, tFr * (anglParam.a3_1.x), stringerParams.h * 2);// опорная точка для отверстий первого уголка третьей забежной ступени
        var p_wnd3_2 = newPoint_xy(pWnd, tFr * (anglParam.a3_2.x), stringerParams.h * 2);// опорная точка для отверстий первого уголка третьей забежной ступени

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_wnd2_2, xOfssetCenterAngle, 0);
        center2 = newPoint_xy(p_wnd2_2, -xOfssetCenterAngle, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // третья забежная ступень
        // первый уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        if (params.stairModel == "П-образная трехмаршевая") {
            if (stringerParams.stairAmt3 == 0 && stringerParams.topEnd == "winder") {
                p_wnd3_1 = newPoint_xy(p_wnd3_1, -70, 0);
            }
        }
        center1 = newPoint_xy(p_wnd3_1, xOfssetCenterAngle, 0);
        center2 = newPoint_xy(p_wnd3_1, -xOfssetCenterAngle, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // второй уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_wnd3_2, xOfssetCenterAngle, 0);//xOfssetCenterAngle
        center2 = newPoint_xy(p_wnd3_2, -xOfssetCenterAngle, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под перемычку
        if (stringerParams.stairAmt > 0 && !(stringerParams.stairAmt == 1 && params.stairModel == "П-образная трехмаршевая")) {
            stringerParams.elmIns[key].briges.push(newPoint_xy(p1, stringerParams.b - stringerParams.rad1 - 5.0 - 6.0 - 60.0, -45.0));
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            hole3 = new THREE.Path();
            hole4 = new THREE.Path();
            center1 = newPoint_xy(p1, stringerParams.b - stringerParams.rad1 - 5.0 - 6.0 - 60.0 + 38.0, -65.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            var center4 = newPoint_xy(p1, 45.0, -65.0);
            var center3 = newPoint_xy(center4, 50.0, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            holes.push(hole3);
            holes.push(hole4);
            stringerParams.elmIns[key].angles.push({ "x": center4.x - stringerParams.angleHolePosX + 5.0, "y": center4.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push("У2-40х40х90");
        }

        stringerParams.pstart = pstart;
        //stringerParams.pstartang = Math.PI / 9;
        stringerParams.pstartang = wndBottomAngle;
        stringerParams.p2 = pnext;
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            // отверстия под стойку 1
            center1 = newPoint_xy(topLineP1, 60 + 15 + stringerParams.stringerThickness, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            //добавляем отверстия под стойку 1
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint)

            // отверстия под стойку 2
            center1 = newPoint_xy(p4, stringerParams.b * 0.5, stringerParams.stepHoleY);
            if (stringerParams.stairAmt === 0 || (stringerParams.stairAmt === 1 && stringerParams.topEnd == "winder" && params.stairModel == "П-образная трехмаршевая"))
                center1 = newPoint_xy(p_2, (p1.x - p_2.x) * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        /*if (stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            // отверстия под стойку 1
            center1 = newPoint_xy(p_6, 60 + 15 + stringerParams.stringerThickness, -110);
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            // отверстия под стойку 2
            if (stringerParams.stairAmt < 10) {
                var holeXDim = stringerParams.stringerWidth / Math.cos(stringerParams.stairAngle1);
                center1 = newPoint_xy(pc1, -holeXDim / Math.tan(stringerParams.stairAngle1) + stringerParams.rad2, -holeXDim - stringerParams.rad2 + 80);
            }
            else {
                var holeXDim = 80 / Math.cos(stringerParams.stairAngle1);
                center1 = newPoint_xy(pc1, -holeXDim / Math.tan(stringerParams.stairAngle1) + stringerParams.rad2, -holeXDim - stringerParams.rad2);
            }
            if (stringerParams.text == "забежный") {
                center1 = newPoint_xy(pCentralHoles, -120, -110);
            }
            center1.x = -263.523138347365;
            center1.y = -97.43909577894496;
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            //stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            // отверстия под стойку 3 (на ступени)
            center1 = newPoint_xy(p4, stringerParams.b * 0.5 + stringerParams.rad1, -110);
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            // отверстия под стойку 1
            center1 = newPoint_xy(topLineP1, 60 + 5 + 30 + stringerParams.stringerThickness, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            //добавляем отверстия под стойку 1
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint)

            // отверстия под стойку 2
            if (stringerParams.stairAmt == 0) {
                center1 = center2 = 0;
            }
            else {
                center1 = newPoint_xy(p4, stringerParams.b * 0.5, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }

        if (center1 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        if (center2 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1 != 0) if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center2 != 0) if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }

}//end of drawBotStepLt_wndOut


/**
 * средние ступени
 */
function drawMiddleStepsLt(stairAmt, stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;
    //console.log(stairAmt)

    var p2 = copyPoint(stringerParams.p2);
    var p1 = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    //console.log("Номера ступеней под опоры");
    //console.log(key, stringerParams.railing);

    // номер ступени
    var ii = 2;                // цикл начинаем со ступени №2
    for (; ii < stairAmt; ii++) {
        // подъем ступени
        var p1 = copyPoint(p2);
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
        var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
        var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
        var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
        var p2 = newPoint_xy(p4, stringerParams.b - stringerParams.rad1, 0.0);
        if (stringerParams.key === 'mid') {
            var pc1m = newPoint_xy(p1, 10.0 + stringerParams.a - stringerParams.b - stringerParams.rad3, stringerParams.rad3 - stringerParams.treadThickness - 5.0);
            var p10m = newPoint_xy(pc1m, stringerParams.rad3, 0.0);
            var p3m = newPoint_xy(p10m, 0.0, stringerParams.treadThickness + 5.0);
            var p4m = newPoint_xy(p10m, stringerParams.b - stringerParams.a + marshFramesParams.overhang - 5.0, stringerParams.h - stringerParams.rad3);
            var p31m = newPoint_xy(p4m, 0.0, -45.0);
            var p2m = newPoint_xy(p4m, stringerParams.a - marshFramesParams.overhang, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1m, stringerParams.rad3, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10m, p3m, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3m, p31m, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p31m, p4m, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4m, newPoint_xy(p2m, 5.0 - stringerParams.rad3, 0.0), stringerParams.dxfBasePoint);
        }
        if (stringerParams.key !== 'mid') {
            if (stringerParams.stringerType != "прямая") {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
            }
        }
        p1 = newPoint_xy(p1, 0.0, stringerParams.h);

        // отверстия под уголок/рамку ступени
        if (stringerParams.stairFrame == "есть" || (stringerParams.brige.indexOf(ii) == -1 && (ii != stringerParams.divide))) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
            holes.push(hole1);
            holes.push(hole2);

            // зенковка отверстий
            if (stringerParams.key == 'mid') {
                var zencDiam = 20;		// диаметр зенковки

                var pz1 = newPoint_xy(center1, -zencDiam, zencDiam);
                var pz2 = newPoint_xy(center1, zencDiam, -zencDiam);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
                pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
                pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);

                pz1 = newPoint_xy(center2, -zencDiam, zencDiam);
                pz2 = newPoint_xy(center2, zencDiam, -zencDiam);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
                pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
                pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
            }
        }

        // отверстия под перемычку
        if (stringerParams.stairFrame == "нет" && stringerParams.brige.indexOf(ii) != -1) {
            stringerParams.elmIns[key].briges.push(newPoint_xy(p1, stringerParams.b - stringerParams.rad1 - 5.0 - 6.0 - 60.0, -45.0));
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            hole3 = new THREE.Path();
            hole4 = new THREE.Path();
            center1 = newPoint_xy(p1, stringerParams.b - stringerParams.rad1 - 5.0 - 6.0 - 60.0 + 38.0, -65.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            var center4 = newPoint_xy(p1, 45.0, -65.0);
            var center3 = newPoint_xy(center4, 50.0, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            holes.push(hole3);
            holes.push(hole4);
            stringerParams.elmIns[key].angles.push({ "x": center4.x - stringerParams.angleHolePosX + 5.0, "y": center4.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push("У2-40х40х90");
        }

        // стыковка деталей тетивы
        if (ii == stringerParams.divide) {
            if (stringerParams.stairFrame == "нет") {
                var divideY = 95.0;
            }
            else {
                var divideY = stringerParams.treadThickness + 100.0; // 5.0 + 40.0 + 50.0 + 5.0
            }

            var divideP1 = newPoint_xy(p1, 0.0, -divideY);
            var divideP2 = newPoint_xy(divideP1, 20.0, 0.0);
            divideP2 = itercection(divideP1, divideP2, p20, p21);
            // точка пересчечения линии стыка и нижней линии марша
            if (stringerParams.stringerType == "прямая") {
                divideP1 = itercection(divideP1, divideP2, p1, polar(p1, stringerParams.stairAngle1, 100.0));
                var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
                var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
                divideP2 = itercection(divideP1, divideP2, p20, p21);
            }
            if (stringerParams.stringerType == "ломаная") {
                divideP2 = newPoint_xy(divideP1, stringerParams.b + stringerParams.stringerWidth, 0.0);
            }
            addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, divideP1, divideP2, stringerParams.dxfBasePoint);
            // фланец
            p0 = newPoint_xy(p1, 10.0, -(divideY - 50.0));
            stringerParams.flanPointInsert = p0;
            stringerParams.divideY = divideY;
            drawFlanLt(stringerParams, p0, holes);
        }
        // отверстия под стойку по центру ступени
        if (stringerParams.railing.indexOf(ii) != -1) {
            if (stringerParams.railingPresence) {
                var holeRad = stringerParams.holeRad;
                if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
                    center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
                /*  if (stringerParams.railingModel == "Стекло на стойках") {
                      center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
                      center2 = newPoint_xy(center1, 0.0, -60.0);
                  }*/
                if (stringerParams.railingModel == "Самонесущее стекло") {
                    holeRad = stringerParams.holeRutelRad;
                    var rutelOffsetX = 120;
                    center1 = newPoint_xy(p1, rutelOffsetX, -115);
                    //center2 = newPoint_xy(center1, 0.0, -120);
                    center2 = newPoint_xy(center1, 0.0, -100);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
                if (stringerParams.railingModel == "Кованые балясины") {
                    center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }

                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)

                //выноска
                var text = "Стойки";
                if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
                var textHeight = 20;
                var offsetLeft = 200;
                var offsetTop = 100;
                if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
                if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)
            }
        }
    }//end of cycle
    stringerParams.p2 = p2;
}//end of drawMiddleStepsLt

/**
 * Верхние узлы
 */

/**
 * последний подъем если сверху перекрытие
 */
function drawTopStepLt_floor(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;

    //размеры верхнего выступа
    var topLedgeWidth = 0;
    var topLedgeHeight = 0;
    if (stringerParams.topAnglePosition == "над ступенью") {
        topLedgeWidth = 90;
        topLedgeHeight = 110;
    }
    if (stringerParams.topAnglePosition == "вертикальная рамка") {
        topLedgeWidth = 85;
        topLedgeHeight = stringerParams.h - 25;
    }
    // последняя проступь
    var topStepWidth = stringerParams.a + 5.0;
    if (stringerParams.topAnglePosition == "вертикальная рамка") topStepWidth = stringerParams.b + 80;


    if (stringerParams.stringerType == "пилообразная" || stringerParams.stringerType == "ломаная" || stringerParams.key === 'mid') {
        var botLineP3 = newPoint_xy(stringerParams.p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша

        //последний подъем
        if (stringerParams.stairAmt != 1) {
            var p1 = copyPoint(stringerParams.p2);
            var p11 = newPoint_xy(p1, 0.0, stringerParams.rad2);
            var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
            var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
            var p20 = newPoint_xy(p2, 0.0, -stringerParams.rad1);
            p1 = copyPoint(p2);
            var topLineP10 = p1; //сохраняем точку
            var pc2 = newPoint_xy(p1, stringerParams.rad1, -stringerParams.rad1);

            if (stringerParams.key === 'mid') {
                var pc1m = newPoint_xy(stringerParams.p2, 10.0 + stringerParams.a - stringerParams.b - stringerParams.rad3, stringerParams.rad3 - stringerParams.treadThickness - 5.0);
                var p10m = newPoint_xy(pc1m, stringerParams.rad3, 0.0);
                var p3m = newPoint_xy(p10m, 0.0, stringerParams.treadThickness + 5.0);
                var p4m = newPoint_xy(p10m, stringerParams.b - stringerParams.a + marshFramesParams.overhang - 5.0, stringerParams.h - stringerParams.rad3);
                var p31m = newPoint_xy(p4m, 0.0, -45.0);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1m, stringerParams.rad3, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10m, p3m, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3m, p31m, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p31m, p4m, stringerParams.dxfBasePoint);
                p11 = copyPoint(p4m);
                p2 = newPoint_xy(p1, topStepWidth, -stringerParams.treadThickness - 5.0);
            }
            if (stringerParams.key !== 'mid') {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p20, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                p11 = newPoint_xy(p1, stringerParams.rad1, 0.0);
                p2 = newPoint_xy(p1, topStepWidth, 0.0);
            }

            if (stringerParams.topFlan == "есть") p2 = newPoint_xy(p1, topStepWidth + 8.0, 0.0);
            if (topLedgeWidth == 0)
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p2, stringerParams.dxfBasePoint);
        }
        if (stringerParams.stairAmt === 1) {
            if (stringerParams.botEnd == "winderTop0") {
                topStepWidth = stringerParams.turnStepLength3;
                if (stringerParams.topAnglePosition == "вертикальная рамка") topStepWidth += 35;
            }
            var p11 = copyPoint(stringerParams.p2);
            var p1 = newPoint_xy(p11, -stringerParams.rad2, 0);;
            var topLineP10 = copyPoint(p1);
            var p2 = newPoint_xy(p1, topStepWidth, 0.0);
            if (stringerParams.topFlan == "есть") p2 = newPoint_xy(p1, topStepWidth + 8.0, 0.0);
            if (topLedgeWidth == 0)
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p2, stringerParams.dxfBasePoint);
            var botLineP3 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), -stringerParams.h); // первая точка на нижней линии марша
            if (stringerParams.botEnd == "winderTop0") {
                botLineP3 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0);
            }
        }

        /*верхний выступ*/

        if (topLedgeWidth != 0) {
            //верхняя проступь
            p2 = newPoint_xy(p2, -topLedgeWidth, 0.0);
            p21 = newPoint_xy(p2, -stringerParams.rad2, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p21, stringerParams.dxfBasePoint);

            //вертикальный участок
            //нижняя дуга
            p1 = copyPoint(p2);
            p11 = newPoint_xy(p1, 0.0, stringerParams.rad2);
            pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);

            //вертикальная линия
            p2 = newPoint_xy(p1, 0.0, topLedgeHeight);
            p20 = newPoint_xy(p2, 0.0, -stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p20, stringerParams.dxfBasePoint);

            //горизонтальный участок

            //верхняя дуга
            p1 = copyPoint(p2);
            p11 = newPoint_xy(p1, stringerParams.rad1, 0.0);
            pc1 = newPoint_xy(p1, stringerParams.rad1, -stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);

            p2 = newPoint_xy(p1, topLedgeWidth, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p2, stringerParams.dxfBasePoint);
        } //end of topLedgeWidth != 0

        var botLineP1 = copyPoint(p2);
    }

    if (stringerParams.stringerType == "прямая") {
        var p2 = stringerParams.p_t1;
        var botLineP3 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);

        // проступь
        var topLineP10 = p2; //сохраняем точку
        var botLineP1 = newPoint_xy(p2, topStepWidth, topLedgeHeight);

        if (stringerParams.key !== 'mid') {
            if (topLedgeWidth == 0) {
                //верхняя линия
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, stringerParams.fil_t1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.center, stringerParams.rad1, stringerParams.fil_t1.angstart, stringerParams.fil_t1.angend, stringerParams.dxfBasePoint);
                //горизонтальная линия последней ступени
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.end, botLineP1, stringerParams.dxfBasePoint);
            }
            if (topLedgeWidth != 0) {
                var fil2 = calculateFilletParams(p2, stringerParams.stairAngle1, botLineP1, Math.PI, stringerParams.rad1, true)
                //верхняя линия
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, fil2.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart - Math.PI, fil2.angend, stringerParams.dxfBasePoint);
                //горизонтальная линия последней ступени
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, botLineP1, stringerParams.dxfBasePoint);
            }
        }
    }


    // отверстия под уголок/рамку ступени
    if (stringerParams.stairAmt > 1) {
        var hole1 = new THREE.Path();
        var hole2 = new THREE.Path();
        var center1 = newPoint_xy(topLineP10, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
        // if (stringerParams.topAnglePosition == "рамка верхней ступени") center2 = newPoint_xy(center2, 20, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({
            "x": center1.x - stringerParams.angleHolePosX,
            "y": center1.y + stringerParams.angleHolePosY
        });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
        holes.push(hole1);
        holes.push(hole2);

        // зенковка отверстий
        if (stringerParams.key == 'mid') {
            var zencDiam = 20;		// диаметр зенковки

            var pz1 = newPoint_xy(center1, -zencDiam, zencDiam);
            var pz2 = newPoint_xy(center1, zencDiam, -zencDiam);
            addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
            pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
            pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
            addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);

            pz1 = newPoint_xy(center2, -zencDiam, zencDiam);
            pz2 = newPoint_xy(center2, zencDiam, -zencDiam);
            addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
            pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
            pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
            addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
        }
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.stairAmt != 1) {
                center1 = newPoint_xy(topLineP10, stringerParams.b * 0.5, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            } else {
                center1 = center2 = 0;
            }
        }
        /* if (stringerParams.railingModel == "Стекло на стойках") {
             center1 = newPoint_xy(topLineP10, stringerParams.b * 0.5, stringerParams.stepHoleY);
             center2 = newPoint_xy(center1, 0.0, -60.0);
         }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            center1 = newPoint_xy(topLineP10, stringerParams.a * 0.5 + 5, -115);
            center2 = newPoint_xy(center1, 0.0, -100);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(topLineP10, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        if (center1 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        if (center2 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)
    }


    // Задняя кромка
    var hh = -stringerParams.h;
    var hh3 = stringerParams.key === 'mid' ? stringerParams.treadThickness + 5.0 : 0.0;

    if (stringerParams.stringerType === "ломаная") {
        var botLineP2 = newPoint_xy(botLineP1, 0.0, -stringerParams.stringerWidth);
        if (stringerParams.topAnglePosition == "над ступенью" || stringerParams.topAnglePosition == "вертикальная рамка")
            botLineP2 = newPoint_xy(botLineP1, 0.0, -topLedgeHeight - stringerParams.stringerWidth);
        if (stringerParams.topAnglePosition == "под ступенью") {
            var backLineLength = stringerParams.treadSideOffset + stringerParams.treadThickness + 40 + 100 + 10;	// 40 = высота уголка/рамки, 100 = ширина уголка, 10 = отступ от нижней грани уголка
            botLineP2 = newPoint_xy(botLineP1, 0.0, -backLineLength);
        }
        var p11 = newPoint_xy(botLineP2, -(topStepWidth - stringerParams.stringerWidth), hh3);
        addLine1(botLineP1, newPoint_xy(botLineP2, 0.0, stringerParams.rad1 + hh3), stringerParams);

        var pc1 = newPoint_xy(botLineP2, -stringerParams.rad1, stringerParams.rad1 + hh3);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);

        addLine1(pe_arc, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams);

        var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
        var pe_arc = addArc1(pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams);

        //var p22 = newPoint_xy(p11, 0.0, hh);
        var p22 = newPoint_xy(p11, 0.0, -(stringerParams.h - (stringerParams.topAnglePosition == "под ступенью" ? backLineLength - stringerParams.h : 0)));
        addLine1(pe_arc, newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams);


        var i = 2;
        for (; i < stringerParams.stairAmt; i++) {
            var p1 = copyPoint(p22);
            var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
            var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);

            var p11 = newPoint_xy(p1, -stringerParams.b, 0.0);
            var p22 = newPoint_xy(p11, 0.0, (i === stringerParams.stairAmt - 1) ? hh - 5.0 : hh);
            if (stringerParams.bottomAngleType == "регулируемая опора" && i == stringerParams.stairAmt - 1) p22.y += 20;

            addLine1(pe_arc, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams);

            var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
            var pe_arc = addArc1(pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams);
            /*if (stringerParams.bottomAngleType === "регулируемая опора") {
                var h_1 = h_1 - 20;
                p0 = newPoint_xy(p0, 0.0, 20);
            }*/
            addLine1(pe_arc, newPoint_xy(p22, 0.0, stringerParams.rad1/* + ((stringerParams.bottomAngleType == "регулируемая опора" && i == stringerParams.stairAmt - 1) ? 20 : 0)*/), stringerParams);
        }
        pc1 = newPoint_xy(p22, -stringerParams.rad1, stringerParams.rad1);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
        p2 = { x: stringerParams.pstart.x, y: p22.y };
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p22, -stringerParams.rad1, 0.0), p2, stringerParams.dxfBasePoint);


        //		pc1 = newPoint_xy(p2, stringerParams.rad2, -stringerParams.rad2);
        //		addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 0.5, Math.PI * 1.0, stringerParams.dxfBasePoint);
        //		addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, 0.0, -stringerParams.rad2), stringerParams.pstart, stringerParams.dxfBasePoint);
        /*if (p22.y != stringerParams.pstart.y) {
            var p3 = newPoint_xy(p22, 0, -(p22.y - stringerParams.pstart.y));
            var p22 = addLine1(newPoint_xy(p22, 0.0, stringerParams.rad1), newPoint_xy(p3, 0.0, stringerParams.rad1), stringerParams);
            var p22 = copyPoint(p3);
        }
        var pc1 = newPoint_xy(p22, -stringerParams.rad1, stringerParams.rad1);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);
        addLine1(pe_arc, stringerParams.pstart, stringerParams);*/


    }

    if (stringerParams.stringerType !== "ломаная") {
        var fil1 = fillet(botLineP1, Math.PI * 1.5, botLineP3, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(botLineP3, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart,
            stringerParams.pstartang, stringerParams.rad1);

        //задняя линия марша
        if (fil1.end.x <= fil2.start.x) {
            var fil1 = fillet(botLineP1, Math.PI * 1.5, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, botLineP1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        } else {
            var blP1 = botLineP1;
            if (stringerParams.stringerType !== "прямая" && distance(botLineP1, fil1.start) < 170.0) {
                var blP2 = newPoint_xy(botLineP1, 0.0, -180.0 + hh3);
                if (stringerParams.topAnglePosition == "над ступенью" || stringerParams.topAnglePosition == "вертикальная рамка")
                    blP2 = newPoint_xy(botLineP1, 0.0, -topLedgeHeight - 180.0);
                addLine1(botLineP1, newPoint_xy(blP2, 0.0, stringerParams.rad1), stringerParams);
                var pc1 = newPoint_xy(blP2, -stringerParams.rad1, stringerParams.rad1);
                var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);
                fil1 = fillet(blP2, Math.PI, botLineP3, stringerParams.stairAngle1, stringerParams.rad2);
                blP1 = newPoint_xy(blP2, -stringerParams.rad1, 0.0);
            }
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, blP1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, fil1.rad, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            // нижняя линия марша
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
            // низ
            if (key == "out") {
                stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5)); // точка привязки стекла ограждения (самонесущее стекло)
            }
            if (stringerParams.stairAmt == 1 && stringerParams.botEnd == "winder" && stringerParams.key == "out") {
                var ang = calcAngleX1(fil2.center, newPoint_xy(stringerParams.pstart, 0.15 * stringerParams.M, 0.0));
                var fil3 = fillet(fil2.center, ang, stringerParams.pstart, 0, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil3.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);
                fil2 = fil3;
            }
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
    }
    if (stringerParams.stringerType !== "прямая") botLineP1 = newPoint_xy(botLineP1, 0.0, hh3);

    //var p1 = copyPoint(p2);


    // отверстия под верхний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var angleOffset;

    if (stringerParams.topAnglePosition == "под ступенью") angleOffset = -95 - topLedgeHeight;
    if (stringerParams.topAnglePosition == "над ступенью") angleOffset = 85 - topLedgeHeight;
    if (stringerParams.topAnglePosition == "вертикальная рамка") angleOffset = 100 - topLedgeHeight - 40;

    if (stringerParams.topAnglePosition != "рамка верхней ступени") {
        center1 = newPoint_xy(botLineP1, -40.0, angleOffset);
        //console.log(center1)
        if (stringerParams.topAnglePosition == "вертикальная рамка") center1 = newPoint_xy(botLineP1, -20.0, angleOffset);
        //if (stringerParams.topFlan == "есть") center1 = newPoint_xy(p1, -48.0, angleOffset);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        if (stringerParams.topAnglePosition == "вертикальная рамка")
            center2 = newPoint_xy(center1, 0.0, -100.0);

        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleU.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
        stringerParams.stringerShape.holes.push(hole1);
        stringerParams.stringerShape.holes.push(hole2);
    }

    // отверстия под опорные колонны
    if (params.staircaseType == "На заказ" && stringerParams.key !== 'mid') {
        if (params.topStepColumns === "есть" && params.platformTop === "нет") {
            var holeRad = 6;
            var center1 = newPoint_xy(botLineP1, -130.0, -105.0);
            var center2 = newPoint_xy(center1, 0, -60);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
        }
    }

}//end of drawTopStepLt_floor

/**
 * последний подъем если сверху площадка (Г-образная лестница)
 */
function drawTopStepLt_pltG(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {

    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var treadThickness = stringerParams.treadThickness;
    if (stringerParams.stairFrame == "лотки") {
        treadThickness = 0;
    }

    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(stringerParams.stringerType === 'прямая' ? stringerParams.p_t1 : p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    var wid150 = stringerParams.stringerWidth150;
    if (stringerParams.key === 'mid' || stringerParams.platformIncreased) {
        wid150 -= treadThickness + 5.0;
    }
    

    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
    if (stringerParams.key === 'mid') {
        var pc1m = newPoint_xy(stringerParams.p2, 10.0 + stringerParams.a - stringerParams.b - stringerParams.rad3, stringerParams.rad3 - stringerParams.treadThickness - 5.0);
        var p10m = newPoint_xy(pc1m, stringerParams.rad3, 0.0);
        var p3m = newPoint_xy(p10m, 0.0, stringerParams.treadThickness + 5.0);
        //var p4m = newPoint_xy(p10m, stringerParams.b - stringerParams.a + marshFramesParams.overhang - 5.0, stringerParams.h - stringerParams.rad3);
        var p4m = newPoint_xy(p10m, stringerParams.b - stringerParams.a + platformFramesParams.overhang - 5.0, stringerParams.h - stringerParams.rad3);
        var p31m = newPoint_xy(p4m, 0.0, -45.0);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1m, stringerParams.rad3, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10m, p3m, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3m, p31m, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p31m, p4m, stringerParams.dxfBasePoint);

        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, stringerParams.topEndLength - stringerParams.rad1, 0.0);
        botLineP1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth150);
        //зазор для проверки модели
        p2 = newPoint_xy(p2, -params.carcasPartsSpacing, -stringerParams.treadThickness - 5.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4m, p2, stringerParams.dxfBasePoint);
    }
    if (stringerParams.key !== 'mid') {
        if (stringerParams.stringerType === 'прямая') {
            var p2 = newPoint_xy(stringerParams.p_t1, stringerParams.topEndLength - stringerParams.rad1, 0);
            var pc3 = copyPoint(p2);
            botLineP1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth150);
            if (stringerParams.platformIncreased) {
                var p2 = newPoint_xy(p2, 0.0, -treadThickness - 5.0);
                var fil1 = fillet(stringerParams.topLineP2, stringerParams.stairAngle1, p2, Math.PI, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, fil1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
                //горизонтальная линия последней ступени
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p2, stringerParams.dxfBasePoint);
            }
            else {
                //верхняя линия
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, stringerParams.fil_t1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.center, stringerParams.rad1, stringerParams.fil_t1.angstart, stringerParams.fil_t1.angend, stringerParams.dxfBasePoint);
                //горизонтальная линия последней ступени
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.end, p2, stringerParams.dxfBasePoint);
            }
        }
        if (stringerParams.stringerType !== 'прямая') {
            if (stringerParams.platformIncreased) {
                var p15 = newPoint_xy(p1, 5.0, 0.0);
                p3 = newPoint_xy(p15, 0.0, stringerParams.h - treadThickness - 5.0); 
                var pc15 = newPoint_xy(pc1, 5.0, 0.0);
                //addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad2, 0.0), p1, stringerParams.dxfBasePoint);
                //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc15, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
                //addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p15, 0.0, stringerParams.rad2), p3, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -5.0, 0.0), p15, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p15, p3, stringerParams.dxfBasePoint);
                // проступь
                p2 = newPoint_xy(p3, stringerParams.topEndLength - 15.0, 0.0);
                botLineP1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth150 + treadThickness + 5.0); 
                //зазор для проверки модели
                p2 = newPoint_xy(p2, -params.carcasPartsSpacing, 0.0);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);
            }
            else {
                //			    if (stringerParams.botEnd != "winderTop0" && stringerParams.key != "in") {
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);
                //			    } else {
                //			        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p3, stringerParams.dxfBasePoint);
                //			    }
                // проступь
                p1 = copyPoint(p2);
                p2 = newPoint_xy(p1, stringerParams.topEndLength - stringerParams.rad1, 0.0);
                var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
                var pc3 = copyPoint(p2);
                botLineP1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth150);
                //зазор для проверки модели
                p2 = newPoint_xy(p2, -params.carcasPartsSpacing, 0.0);
                var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);
            }
        }


        if (stringerParams.platformIncreased) {
            var p15 = newPoint_xy(p1, 5.0, 0.0);

            // отверстия под уголок крепления тетивы увеличенной площадки
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p15, 30.0, 85.0 - stringerParams.stringerWidth150 + stringerParams.h);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }
    }

    if (stringerParams.stringerType !== 'ломаная') {
        // Задняя кромка
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0.0, -wid150);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        var fil1 = fillet(p2, Math.PI, p20, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // нижняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        if (key == "out") {
            stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5));			// точка привязки стекла ограждения (самонесущее стекло)
        }
        // низ
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
    }
    if (stringerParams.stringerType === 'ломаная') {
        // Задняя кромка
        var hh = -stringerParams.h + stringerParams.rad2 + stringerParams.rad1;
        var hh2 = (stringerParams.key === 'mid' || stringerParams.platformIncreased) ? hh + treadThickness + 5.0 : hh;
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0.0, -wid150);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        //нижняя линия под площадкой
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p2, -stringerParams.topEndLength + stringerParams.rad1 + stringerParams.rad2 + stringerParams.stringerWidth, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc1 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI / 2, Math.PI, stringerParams.dxfBasePoint);
        //последний подъем
        p1 = newPoint_xy(pc1, -stringerParams.rad2, 0.0);
        p2 = newPoint_xy(p1, 0.0, hh2 - stringerParams.stringerWidth + wid150);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc1 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
        //проступь
        p1 = newPoint_xy(pc1, 0.0, -stringerParams.rad1);
        p2 = newPoint_xy(p1, -stringerParams.b + stringerParams.rad2 + stringerParams.rad1, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc1 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI / 2, Math.PI, stringerParams.dxfBasePoint);
        for (i = 0; i < stringerParams.stairAmt - 3; i++) {
            p1 = newPoint_xy(pc1, -stringerParams.rad2, 0.0);
            p2 = newPoint_xy(p1, 0.0, hh);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc1 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
            p1 = newPoint_xy(pc1, 0.0, -stringerParams.rad1);
            p2 = newPoint_xy(p1, -stringerParams.b + stringerParams.rad2 + stringerParams.rad1, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc1 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
        }
        p1 = newPoint_xy(pc1, -stringerParams.rad2, 0.0);
        if (stringerParams.botEnd == 'floor') {
            var fil1 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, Math.PI * 2.0, stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            // низ
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
        else {
            p2 = newPoint_xy(p1, 0.0, hh);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc1 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
            p1 = newPoint_xy(pc1, 0.0, -stringerParams.rad1);
            var fil1 = fillet(p1, Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad2, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
        if (key == "out") {
            var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
            stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5));			// точка привязки стекла ограждения (самонесущее стекло)
        }
    }

    // отверстия

    // отверстия под задний крепежный уголок
    // для прямой двухмаршевой будет фланец, вместо заднего крепежного уголка
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(botLineP1, -30.0, 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    // позиция для фланца крепления к тетиве марша (для прямой готовой)
    stringerParams.flanPointInsert0 = newPoint_xy(center1, -20.0, 20.0);
    if (stringerParams.isStright2Marsh && !stringerParams.stringerLast) {
        // ещё два отверстия для фланца
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, -45.0, 0.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.flanPointInsert2 = newPoint_xy(center1, -20.0, 20.0);
    }

    if (stringerParams.stairFrame == "нет") {
        // отверстия под перемычку 1
        // и под уголок крепления верхнего марша
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 73.0, -65.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));

        // отверстия под 1 уголок площадки
        var stepHoleXside1 = selectStepHoleXsideG1(stringerParams.topEndLength);
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, stepHoleXside1 + 80.0, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push("У2-40х40х200");
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под перемычку 2
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, ((stringerParams.topEndLength * 0.5) + 48.0), -65.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));
        var pCentralHoles = copyPoint(center1);

        // отверстия под 2 уголок площадки
        var stepHoleXside2 = selectStepHoleXsideG2(stringerParams.topEndLength);
        if (stepHoleXside2 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(center1, stepHoleXside2 + 10.0, 0.0);
            center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push("У2-40х40х200");
            holes.push(hole1);
            holes.push(hole2);
        }
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под уголок крепления верхнего марша
        if (((key == "in" && params.turnSide == "правое") || (key == "out" && params.turnSide == "левое")) && !stringerParams.stringerLast && !stringerParams.isStright2Marsh) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            //center1 = newPoint_xy(ph, 73.0, 85.0 - wid150);
            center1 = newPoint_xy(botLineP1, -stringerParams.M + 46.0, 85.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }
        // отверстия под уголки средней тетивы для широкой лестницы
        if (key == "in" && !stringerParams.stringerLast && stringerParams.midstringers) {
            if (stringerParams.midstringers.length > 1) {
                var positionZ = 0;
                for (var k = 0; k < stringerParams.midstringers.length - 1; k++) {
                    positionZ += stringerParams.midstringers[k];
                    hole1 = new THREE.Path();
                    hole2 = new THREE.Path();
                    hole3 = new THREE.Path();
                    hole4 = new THREE.Path();
                    center1 = newPoint_xy(botLineP1, stringerParams.stringerThickness - stringerParams.M * 0.5 + 68 / 2, 85);	// 68 = расстояние между отверстиями по X
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    center3 = newPoint_xy(center1, -60.0 - stringerParams.stringerThickness, 0.0);
                    center4 = newPoint_xy(center3, 0.0, -60.0);
                    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    holes.push(hole1);
                    holes.push(hole2);
                    holes.push(hole3);
                    holes.push(hole4);
                }
            }
        }

        var pCentralHoles = newPoint_xy(ph, stringerParams.platformLength * 0.5, stringerParams.stepHoleY);
        // отверстия под рамки под площадкой
        var begX = platformFramesParams.overhang + 5.0 + platformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            if (center1.x > botLineP1.x) break;
            hole1 = new THREE.Path();
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            if (center2.x > botLineP1.x) break;
            hole2 = new THREE.Path();
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole2);

            begX += platformFramesParams.width + 5.0;

            // зенковка отверстий
            if (stringerParams.key == 'mid') {
                var zencDiam = 20;		// диаметр зенковки

                var pz1 = newPoint_xy(center1, -zencDiam, zencDiam);
                var pz2 = newPoint_xy(center1, zencDiam, -zencDiam);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
                pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
                pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);

                pz1 = newPoint_xy(center2, -zencDiam, zencDiam);
                pz2 = newPoint_xy(center2, zencDiam, -zencDiam);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
                pz1 = newPoint_xy(pz1, 0, -zencDiam * 2);
                pz2 = newPoint_xy(pz2, 0, zencDiam * 2);
                addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, pz1, pz2, stringerParams.dxfBasePoint);
            }
        }

        // отверстия под подкосы
        if (params.topPltColumns == "подкосы" || params.middlePltColumns == "подкосы") {
            var braceHoleRad = 6.5;
            var braceHoleDistX = 95;
            var braceHoleDistY = 60;

            if (params.stairModel == "Прямая") {
                //if ((params.topPltConsolePos == (params.turnSide == "правое" ? "справа" : "слева") && stringerParams.key == "in") || (params.topPltConsolePos == (params.turnSide == "правое" ? "слева" : "справа") && stringerParams.key == "out")) {
                if ((params.topPltConsolePos == (params.turnSide == "правое" ? "справа" : "слева") && stringerParams.key == "out") || (params.topPltConsolePos == (params.turnSide == "правое" ? "слева" : "справа") && stringerParams.key == "in")) {
                    // первый подкос (передний)
                    var center1 = newPoint_xy(ph, (stringerParams.b - braceHoleDistX) * 0.5, -120 + braceHoleDistY * 0.5 - 5);
                    var center2 = newPoint_xy(center1, braceHoleDistX, 0);
                    var center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                    var center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                    // второй подкос (задний)
                    center1 = newPoint_xy(center1, 600, 0);
                    center2 = newPoint_xy(center1, braceHoleDistX, 0);
                    center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                    center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                }
                //else if (params.topPltConsolePos == "сзади") {
                else if (params.topPltConsolePos == "сзади" && !stringerParams.platformIncreased) {
                    var center = newPoint_xy(ph, 200 + 50, -120 - 5);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center, braceHoleRad, stringerParams.dxfBasePoint);
                }
            }
            else if (params.stairModel == "Г-образная с площадкой") {
                if (stringerParams.stringerLast == true) {
                    if ((stringerParams.key == "out" && params.topPltConsolePos == "справа") || (stringerParams.key == "in" && params.topPltConsolePos == "слева")) {
                        // первый подкос (передний)
                        var center1 = newPoint_xy(ph, (stringerParams.b - braceHoleDistX) * 0.5, -120 + braceHoleDistY * 0.5 - 5);
                        var center2 = newPoint_xy(center1, braceHoleDistX, 0);
                        var center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                        var center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                        // второй подкос (задний)
                        center1 = newPoint_xy(center1, 600, 0);
                        center2 = newPoint_xy(center1, braceHoleDistX, 0);
                        center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                        center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                    }
                    //else if (params.topPltConsolePos == "сзади") {
                    else if (params.topPltConsolePos == "сзади" && !stringerParams.platformIncreased) {
                        //var center = newPoint_xy(ph, 200 + 50, -120 - 5);
                        var center = newPoint_xy(ph, 200 + 158, -120 - 5);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center, braceHoleRad, stringerParams.dxfBasePoint);
                    }
                }
                else {
                    if (((params.middlePltConsolePos == "справа" && params.turnSide == "левое") || (params.middlePltConsolePos == "слева" && params.turnSide == "правое")) && stringerParams.key == "in") {
                        // первый подкос (передний)
                        var center1 = newPoint_xy(ph, (stringerParams.b - braceHoleDistX) * 0.5, -120 + braceHoleDistY * 0.5 - 5);
                        var center2 = newPoint_xy(center1, braceHoleDistX, 0);
                        var center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                        var center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                        // второй подкос (задний)
                        center1 = newPoint_xy(center1, 600, 0);
                        center2 = newPoint_xy(center1, braceHoleDistX, 0);
                        center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                        center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                    }
                    else if (params.middlePltConsolePos == "сзади") {
                        var center = newPoint_xy(ph, 200 + 50 - 5, -120 - 5);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center, braceHoleRad, stringerParams.dxfBasePoint);
                    }
                }
            }
            else {
                if ((stringerParams.key == "out" && (stringerParams.stringerLast ? params.topPltConsolePos : params.middlePltConsolePos) == "справа") || (stringerParams.key == "in" && (stringerParams.stringerLast ? params.topPltConsolePos : params.middlePltConsolePos) == "слева")) {
                    // первый подкос (передний)
                    var center1 = newPoint_xy(ph, (stringerParams.b - braceHoleDistX) * 0.5, -120 + braceHoleDistY * 0.5 - 5);
                    var center2 = newPoint_xy(center1, braceHoleDistX, 0);
                    var center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                    var center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                    // второй подкос (задний)
                    if (stringerParams.stringerLast) center1 = newPoint_xy(center1, 600, 0);
                    else center1 = newPoint_xy(ph, stringerParams.topEndLength - 200 - braceHoleDistX * 0.5 - 10, -120 + braceHoleDistY * 0.5 - 5);
                    center2 = newPoint_xy(center1, braceHoleDistX, 0);
                    center3 = newPoint_xy(center1, 0, -braceHoleDistY);
                    center4 = newPoint_xy(center1, braceHoleDistX, -braceHoleDistY);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center3, braceHoleRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center4, braceHoleRad, stringerParams.dxfBasePoint);
                }
                else if ((stringerParams.stringerLast && params.topPltConsolePos == "сзади") || (!stringerParams.stringerLast && params.middlePltConsolePos == "сзади")) {
                    var center = newPoint_xy(ph, 200 + 50 + stringerParams.stringerThickness + (stringerParams.stringerLast ? 0 : 22), -120 - 5);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center, braceHoleRad, stringerParams.dxfBasePoint);
                }
            }
        }
    }
    if (stringerParams.stairFrame == "лотки") {
        // отверстия под ступени под площадкой
        var countTread = Math.ceil(stringerParams.platformLength1 / 500);
        var widthTread = (stringerParams.platformLength1 - stringerParams.stringerThickness) / countTread - 5;// * (countTread - 1);
        var holeDist = widthTread - 25 * 2 - 8;

        for (var i = 0; i < countTread; i++) {
            var hole1 = new THREE.Path();
            var hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, stringerParams.stepHoleX1 + (widthTread + 5) * i, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, holeDist, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }

    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = center2 = 0;
            //if (!((!stringerParams.stringerLast || (!stringerParams.platformTopRailing && stringerParams.stairAmt == 1)) && key == "in")) {

            if (stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(ph, stringerParams.b * 0.5 + 50, stringerParams.stepHoleY);
                if (!stringerParams.platformTopRailing) center1 = newPoint_xy(center1, -50, 0);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }

            if (params.staircaseType == "На заказ") {
                // отверстия под средние стойки
                if (stringerParams.platformLength > 1300 && stringerParams.platformTopRailing) {
                    var middleRackAmt = Math.round(stringerParams.platformLength / 800) - 1;
                    if (middleRackAmt < 0) middleRackAmt = 0;
                    var rackDist = (stringerParams.platformLength - 200 - 38) / (middleRackAmt + 1);
                    var racksMiddle = [];
                    for (var i = 1; i <= middleRackAmt; i++) {
                        var center11 = newPoint_xy(center1, rackDist * i, 0);
                        var center12 = newPoint_xy(center11, 0.0, -60.0);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        racksMiddle.push({ "x": center11.x, "y": center11.y });
                    }
                    var number = stringerParams.elmIns[key].racks.length - 1;
                    stringerParams.elmIns[key].racks[number].racksMiddle = racksMiddle;
                }


                // отверстия под стойку 2
                if (stringerParams.platformTopRailing) {
                    //добавляем отверстия под стойку 1
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    //console.log('aaa');
                    //console.log(pc3);
                    //console.log(center1);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            }
        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            //if (!(!stringerParams.stringerLast && key == "in")) {
            if (!(!stringerParams.stringerLast && key == "in") || stringerParams.straight) {
                // отверстия под последнее стекло марша
                //center1 = newPoint_xy(pc2, stringerParams.a * 0.5 + 5, stringerParams.stepHoleY);
                center1 = newPoint_xy(pc2, stringerParams.a * 0.5 + 5, -100);
                //center2 = newPoint_xy(center1, 0.0, -120);
                center2 = newPoint_xy(center1, 0.0, -100);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                if (stringerParams.platformTopRailing) {
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    // отверстия под стойку 1
                    var glassSectionLength = stringerParams.platformLength - stringerParams.b;
                    center1 = newPoint_xy(pc2, 450, stringerParams.stepHoleY + (pc3.y - pc2.y));
                    center2 = newPoint_xy(center1, 0.0, -60);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc2, stringerParams.b + 100, stringerParams.stepHoleY + (pc3.y - pc2.y));
                        center2 = newPoint_xy(center1, 0.0, -60);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    if (glassSectionLength > 1000) {
                        // первое среднее
                        center1 = newPoint_xy(pCentralHoles, -60, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                        // второе среднее
                        center1 = newPoint_xy(center1, /*stringerParams.b*/ 120, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    }
                    // отверстия под стойку 2
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc3, -60 - 5 - 30 - 60, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            }
        }

        if (stringerParams.railingModel == "Кованые балясины") {

            if (params.stairModel == "Прямая") {
                if (!(!stringerParams.stringerLast && key == "in")) {
                    // отверстия под стойку
                    pc2 = newPoint_xy(pc2, 0, stringerParams.rad1);
                    hole1 = new THREE.Path();
                    hole2 = new THREE.Path();
                    center1 = newPoint_xy(pc2, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                    if (params.platformTop == "увеличенная" && key == "in") center1 = newPoint_xy(ph, -stringerParams.b * 0.5, -stringerParams.h + stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    // отверстия под стойку 2
                    if (stringerParams.platformTopRailing) {
                        hole1 = new THREE.Path();
                        hole2 = new THREE.Path();
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    }
                }
                else {
                    center1 = center2 = 0;
                }
            }
            if (params.stairModel == "Г-образная с площадкой") {
                if ((key == "out" && !stringerParams.stringerLast) || (key == "in" && !stringerParams.stringerLast && (params.middlePltLength - params.M >= 160)) || (stringerParams.stringerLast && (key == "out" || (key == "in" && (params.platformTop == "площадка"))))) {
                    // отверстия под стойку
                    pc2 = newPoint_xy(pc2, 0, stringerParams.rad1);
                    hole1 = new THREE.Path();
                    hole2 = new THREE.Path();
                    center1 = newPoint_xy(pc2, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                    //if (params.platformTop == "увеличенная" && key == "in" && stringerParams.stringerLast) center1 = newPoint_xy(ph, -stringerParams.b * 0.5, -stringerParams.h +  stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                    // отверстия под стойку 2

                    if (stringerParams.platformTopRailing || (!stringerParams.stringerLast && key == "in" && (params.middlePltLength - params.M >= 450))) {
                        hole1 = new THREE.Path();
                        hole2 = new THREE.Path();
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                        if (!stringerParams.stringerLast && key == "in" && (params.middlePltLength - params.M >= 450)) center1 = newPoint_xy(pc2, params.middlePltLength - params.M - 100, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    }
                }
                else {
                    center1 = center2 = 0;
                }
            }
            if (params.stairModel == "Прямая с промежуточной площадкой") {
                if (!stringerParams.stringerLast || (stringerParams.stringerLast && !stringerParams.platformIncreased)) {
                    // отверстия под стойку
                    pc2 = newPoint_xy(pc2, 0, stringerParams.rad1);
                    hole1 = new THREE.Path();
                    hole2 = new THREE.Path();
                    center1 = newPoint_xy(pc2, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                    //if (params.platformTop == "увеличенная" && key == "in" && stringerParams.stringerLast) center1 = newPoint_xy(ph, -stringerParams.b * 0.5, -stringerParams.h +  stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                    // отверстия под стойку 2

                    if (stringerParams.platformTopRailing) {
                        hole1 = new THREE.Path();
                        hole2 = new THREE.Path();
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                        //if (!stringerParams.stringerLast && key == "in" && (params.middlePltLength - params.M >= 450)) center1 = newPoint_xy(pc2, params.middlePltLength - params.M - 100, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    }
                }
                else {
                    center1 = center2 = 0;
                }
            }
        }

        if (center1 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)/**/

    }


    // отверстия под опорные колонны
    if (params.staircaseType == "На заказ") {
        if (stringerParams.stringerLast) {
            if ((stringerParams.key == "out" && params.isColumnTop2 && params.platformTop == "увеличенная") ||
                (stringerParams.key == "out" && params.isColumnTop2 && params.platformTop == "площадка" && params.turnSide == "правое") ||
                (stringerParams.key == "out" && params.isColumnTop4 && params.platformTop == "площадка" && params.turnSide == "левое") ||
                (stringerParams.key == "in" && params.isColumnTop6 && params.platformTop == "увеличенная") ||
                (stringerParams.key == "in" && params.isColumnTop4 && params.platformTop == "площадка" && params.turnSide == "правое") ||
                (stringerParams.key == "in" && params.isColumnTop2 && params.platformTop == "площадка" && params.turnSide == "левое")) {
                var holeRad = 6;
                var center1 = newPoint_xy(ph, 135.0, -105.0);
                var center2 = newPoint_xy(center1, 0, -60);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            }
            if ((stringerParams.key == "out" && params.isColumnTop1 && params.platformTop == "увеличенная") ||
                (stringerParams.key == "out" && params.isColumnTop1 && params.platformTop == "площадка" && params.turnSide == "правое") ||
                (stringerParams.key == "out" && params.isColumnTop3 && params.platformTop == "площадка" && params.turnSide == "левое") ||
                (stringerParams.key == "in" && params.isColumnTop5 && params.platformTop == "увеличенная") ||
                (stringerParams.key == "in" && params.isColumnTop3 && params.platformTop == "площадка" && params.turnSide == "правое") ||
                (stringerParams.key == "in" && params.isColumnTop1 && params.platformTop == "площадка" && params.turnSide == "левое")) {
                var holeRad = 6;
                var center1 = newPoint_xy(botLineP1, -130.0, 85.0);
                var center2 = newPoint_xy(center1, 0, -60);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            }
        }
        if (!stringerParams.stringerLast) {
            if ((params.isColumnMiddle2 && stringerParams.key == "out") ||
                (params.isColumnMiddle4 && stringerParams.key == "in")) {
                var holeRad = 6;
                var columnDiffHole = ph.x + 135.0 - (botLineP1.x - stringerParams.M + 46.0);
                if (Math.abs(columnDiffHole) > 20.0) columnDiffHole = 0.0;
                //alert("z-" + (ph.x + 135.0 - (botLineP1.x - stringerParams.M + 46.0)));
                var center1 = newPoint_xy(ph, 135.0 - columnDiffHole, -105.0);
                var center2 = newPoint_xy(center1, 0, -60);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            }
            if ((params.isColumnMiddle1 && stringerParams.key == "out") ||
                (params.isColumnMiddle3 && stringerParams.key == "in")) {
                var holeRad = 6;
                var center1 = newPoint_xy(botLineP1, -130.0, 85.0);
                var center2 = newPoint_xy(center1, 0, -60);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            }
        }
    }

}//end of drawTopStepLt_pltG

/**
 * последний подъем если сверху площадка (П-образная лестница внутренняя сторона)
 */
function drawTopStepLt_pltPIn(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p01 = newPoint_xy(p1, -stringerParams.rad2, 0.0);
    var p02 = newPoint_xy(p01, 16.0, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p01, p02, stringerParams.dxfBasePoint);
    var p2 = newPoint_xy(p02, stringerParams.rad2, stringerParams.h - stringerParams.treadThickness - 5.0);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    var p1 = copyPoint(p02);
    var pc1 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    var p10 = newPoint_xy(p1, stringerParams.rad2, stringerParams.rad2);
    var p3 = newPoint_xy(p1, stringerParams.rad2, stringerParams.h - stringerParams.treadThickness - 5.0 - stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, stringerParams.topEndLength - 16.0, 0.0);
    var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    //зазор для проверки модели
    p2 = newPoint_xy(p2, -params.carcasPartsSpacing, 0.0);
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
    if (stringerParams.stringerType != 'ломаная') {
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150 + stringerParams.treadThickness + 5.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        p1 = copyPoint(p2);
        var fil1 = fillet(p2, Math.PI, p20, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart,
            stringerParams.pstartang, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // нижняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        // низ
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
    }
    else {
        // Задняя кромка
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150 + stringerParams.treadThickness + 5.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        //нижняя линия под площадкой
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p2, -stringerParams.topEndLength + 16.0 + stringerParams.rad2 + stringerParams.stringerWidth, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI / 2, Math.PI, stringerParams.dxfBasePoint);
        //последний подъем
        p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
        p2 = newPoint_xy(p1, 0.0, stringerParams.stringerWidth150 - stringerParams.treadThickness - 5.0 - stringerParams.h + stringerParams.treadThickness + 5.0 + stringerParams.rad1 - stringerParams.stringerWidth + stringerParams.rad2);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
        //проступь
        p1 = newPoint_xy(pc2, 0.0, -stringerParams.rad1);
        p2 = newPoint_xy(p1, -stringerParams.b + stringerParams.rad2 + stringerParams.rad1 - 16.0, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI / 2, Math.PI, stringerParams.dxfBasePoint);
        for (i = 0; i < stringerParams.stairAmt - 3; i++) {
            p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
            p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad2 + stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
            p1 = newPoint_xy(pc2, 0.0, -stringerParams.rad1);
            p2 = newPoint_xy(p1, -stringerParams.b + stringerParams.rad2 + stringerParams.rad1, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
        }
        p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
        if (stringerParams.botEnd == 'floor') {
            var fil1 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, Math.PI * 2.0, stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            // низ
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
        else {
            p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad1 + stringerParams.rad2);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
            p1 = newPoint_xy(pc2, 0.0, -stringerParams.rad1);
            var fil1 = fillet(p1, Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad2, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
    }
    // отверстия

    if (stringerParams.stairFrame == "нет") {
        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25.0;

        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, stringerParams.stepHoleX1 - 16.0, stringerParams.stepHoleY + 45.0);
        var center2 = newPoint_xy(center1, holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 2 уголок площадки
        var stepHoleXside2 = selectStepHoleXsideP2(stringerParams.topEndLength);
        if (stepHoleXside2 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, stepHoleXside2 + 324.0, -20.0);
            var center2 = newPoint_xy(center1, holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под 3 уголок площадки
        var stepHoleXside3 = selectStepHoleXsideP3(stringerParams.topEndLength);
        if (stepHoleXside3 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, stringerParams.topEndLength - 16.0 - stepHoleXside3 - stringerParams.stepHoleX1, -20.0);
            var center2 = newPoint_xy(center1, -holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под рамки под площадкой
        var begX = -16.0 + platformFramesParams.overhang + 5.0 + platformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY + stringerParams.treadThickness + 5.0);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX += platformFramesParams.width + 5.0;
        }
    }

    if (stringerParams.stairFrame == "нет") {
        // линия разделения
        p3 = newPoint_xy(ph, 290.0, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0 + stringerParams.treadThickness + 5.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        p3 = newPoint_xy(p3, stringerParams.stringerThickness, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0 + stringerParams.treadThickness + 5.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);

        // отверстия под уголки крепления к поперечному косоуру площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 260.0, -20.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].angleU.push({ "x": center2.x + 30.0, "y": center2.y - 20.0 });
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, 60.0 + stringerParams.stringerThickness, 0.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
    }

    // отверстия под задний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, -30.0, 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            //center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
            //center2 = newPoint_xy(center1, 0.0, -60.0);
            center1 = center2 = 0;
            //stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            //center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
            //center2 = newPoint_xy(center1, 0.0, -60.0);
            center1 = center2 = 0;
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }

        if (center1 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)


    }
}//end of drawTopStepLt_pltPIn

/**
 * последний подъем если сверху площадка (П-образная лестница внешняя)
 */
function drawTopStepLt_pltPOut(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, stringerParams.topEndLength, 0.0);
    var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    var pc3 = copyPoint(p2);
    //зазор для проверки модели
    p2 = newPoint_xy(p2, -params.carcasPartsSpacing, 0.0);
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
    if (stringerParams.stringerType != 'ломаная') {
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        p1 = copyPoint(p2);
        var fil1 = fillet(p2, Math.PI, p20, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // нижняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        if (key == "out") {
            stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5));			// точка привязки стекла ограждения (самонесущее стекло)
        }
        // низ
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
    }
    else {
        // Задняя кромка
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        //нижняя линия под площадкой
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p2, -stringerParams.topEndLength + stringerParams.rad2 + stringerParams.stringerWidth, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI / 2, Math.PI, stringerParams.dxfBasePoint);
        //последний подъем
        p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
        p2 = newPoint_xy(p1, 0.0, -(stringerParams.h + stringerParams.stringerWidth - stringerParams.stringerWidth150) + stringerParams.rad1 + stringerParams.rad2);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
        //проступь
        p1 = newPoint_xy(pc2, 0.0, -stringerParams.rad1);
        p2 = newPoint_xy(p1, -stringerParams.b + stringerParams.rad2 + stringerParams.rad1, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI / 2, Math.PI, stringerParams.dxfBasePoint);
        for (i = 0; i < stringerParams.stairAmt - 3; i++) {
            p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
            p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad2 + stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
            p1 = newPoint_xy(pc2, 0.0, -stringerParams.rad1);
            p2 = newPoint_xy(p1, -stringerParams.b + stringerParams.rad2 + stringerParams.rad1, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
        }
        p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
        if (stringerParams.botEnd == 'floor') {
            var fil1 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, Math.PI * 2.0, stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            // низ
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
        else {
            p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad1 + stringerParams.rad2);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, 2 * Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
            p1 = newPoint_xy(pc2, 0.0, -stringerParams.rad1);
            var fil1 = fillet(p1, Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad2, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
        }
        if (key == "out") {
            var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
            stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5));			// точка привязки стекла ограждения (самонесущее стекло)
        }
    }

    // отверстия

    if (stringerParams.stairFrame == "нет") {
        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25.0;

        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 2 уголок площадки
        var stepHoleXside2 = selectStepHoleXsideP2(stringerParams.topEndLength);
        if (stepHoleXside2 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, stepHoleXside2 + 340.0, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под 3 уголок площадки
        var stepHoleXside3 = selectStepHoleXsideP3(stringerParams.topEndLength);
        if (stepHoleXside3 > 0.0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            var center1 = newPoint_xy(ph, stringerParams.topEndLength - stepHoleXside3 - stringerParams.stepHoleX1, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, -holeDist3, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
            stringerParams.elmIns[key].anglesop.push(aTyp);
            holes.push(hole1);
            holes.push(hole2);
        }

        var pCentralHoles = newPoint_xy(ph, stringerParams.topEndLength * 0.5, stringerParams.stepHoleY);
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под рамки под площадкой
        var begX = platformFramesParams.overhang + 5.0 + platformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX += platformFramesParams.width + 5.0;
        }
    }
    var pCentralHoles = newPoint_xy(ph, stringerParams.topEndLength * 0.5, stringerParams.stepHoleY);
    if (stringerParams.stairFrame == "нет") {
        // линия разделения
        p3 = newPoint_xy(ph, 306.0, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        p3 = newPoint_xy(p3, stringerParams.stringerThickness, 0.0);
        p4 = newPoint_xy(p3, 0.0, -150.0);
        addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);

        // отверстия под уголки крепления к поперечному косоуру площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 276.0, -25.0 - stringerParams.treadThickness);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].angleU.push({ "x": center2.x + 30.0, "y": center2.y - 20.0 });
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, 60.0 + stringerParams.stringerThickness, 0.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
    }

    // отверстия под задний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, -32.0, 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            // отверстия под стойку 1
            center1 = newPoint_xy(ph, stringerParams.b * 0.5 + 65, stringerParams.stepHoleY);
            if (!stringerParams.platformTopRailing) center1 = newPoint_xy(center1, -65, 0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            // отверстия под средние стойки
            if (stringerParams.platformLength > 1500 && stringerParams.platformTopRailing) {
                var middleRackAmt = Math.round(stringerParams.platformLength / 800) - 1;
                if (middleRackAmt < 0) middleRackAmt = 0;
                var rackDist = (stringerParams.platformLength - 200) / (middleRackAmt + 1);
                var racksMiddle = [];
                for (var i = 1; i <= middleRackAmt; i++) {
                    var center11 = newPoint_xy(center1, rackDist * i, 0);
                    var center12 = newPoint_xy(center11, 0.0, -60.0);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    racksMiddle.push({ "x": center11.x, "y": center11.y });
                }
                var number = stringerParams.elmIns[key].racks.length - 1;
                stringerParams.elmIns[key].racks[number].racksMiddle = racksMiddle;
            }

            // отверстия под стойку 2
            if (stringerParams.platformTopRailing) {
                //добавляем отверстия под стойку 1
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            if (!(!stringerParams.stringerLast && key == "in")) {
                // отверстия под последнее стекло марша
                //center1 = newPoint_xy(pc2, stringerParams.a * 0.5 + 5, stringerParams.stepHoleY);
                center1 = newPoint_xy(pc2, stringerParams.a * 0.5 + 5, -100);
                //center2 = newPoint_xy(center1, 0.0, -120);
                center2 = newPoint_xy(center1, 0.0, -100);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                if (stringerParams.platformTopRailing) {
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    // отверстия под стойку 1
                    //var glassSectionLength = stringerParams.topEndLength - stringerParams.b - 9;
                    var glassSectionLength = stringerParams.topEndLength - stringerParams.b;
                    center1 = newPoint_xy(pc2, 380, stringerParams.stepHoleY + (pc3.y - pc2.y));
                    center2 = newPoint_xy(center1, 0.0, -60);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc2, stringerParams.b + 100, stringerParams.stepHoleY + (pc3.y - pc2.y));
                        center2 = newPoint_xy(center1, 0.0, -60);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);

                    if (glassSectionLength > 1000) {
                        // первое среднее
                        center1 = newPoint_xy(pCentralHoles, -60, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                        // второе среднее
                        center1 = newPoint_xy(center1, /*stringerParams.b*/ 120, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    }
                    // отверстия под стойку 2
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc3, -60 - 5 - 30 - 60, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            }
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            // отверстия под стойку
            pCenter = newPoint_xy(ph, 0, stringerParams.rad1);
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(pCenter, stringerParams.b * 0.5, stringerParams.stepHoleY - stringerParams.rad1);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            // отверстия под стойку 2
            if (stringerParams.platformTopRailing) {
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }

        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }
}//end of drawTopStepLt_pltPOut

/**
 * последний подъем если сверху забег (внутренняя сторона)
 */
function drawTopStepLt_wndIn(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    if (stringerParams.stairFrame == "есть") {
        //константы
        var topLineStringerProtrusion = 30;
        var treadSideOffset = 5;						// зазор между тетивой и ступенью
        //var treadSideOffset = stringerParams.treadSideOffset;						// зазор между тетивой и ступенью

        stringerParams.topEndLength = 5 + turnStepsParams.params[1].stepWidthLow + 15;

        var holeCoordY = topLineStringerProtrusion + stringerParams.treadThickness + turnFramesParams.params.frameParams1.holesCoordinates.holesCoordinates1_1.y1 + 5;
        var holeCoordX1 = 15 + turnFramesParams.params.frameParams1.holesCoordinates.holesCoordinates1_1.x1;
        var holeCoordX2 = 15 + turnFramesParams.params.frameParams1.holesCoordinates.holesCoordinates1_1.x2;

        var p1 = copyPoint(stringerParams.p2);
        //var p_3 = newPoint_xy(p1, -stringerParams.b + stringerParams.stringerWidth, -stringerParams.stringerWidth);
        var p_3 = newPoint_xy(p1, -stringerParams.b + stringerParams.stringerWidth, -stringerParams.stringerWidth);
        var p2 = newPoint_xy(p1, 0.0, stringerParams.h + topLineStringerProtrusion);
        var ph = copyPoint(p2);
        /*if (stringerParams.stairAmt == 0) {
            ph = newPoint_xy(p2, - treadSideOffset, 0.0);
        }*/

        if (stringerParams.stringerType == "прямая") {
            var p20 = newPoint_xy(p1, -stringerParams.b + (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
        }
        else {
            var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        }
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

        // подъем ступени
        if (stringerParams.botEnd == "winderBot0") {
            holeCoordX1 = holeCoordX1 - 10;
            holeCoordX2 = holeCoordX2 - 10;
            // проступь
            p1 = copyPoint(stringerParams.p2);
            var ph = copyPoint(p1);
            if (stringerParams.h <= 235)
                ph = newPoint_xy(ph, 0, 30);
            //p2 = newPoint_xy(p1, stringerParams.topEndLength, 0.0);
            p2 = newPoint_xy(p1, stringerParams.topEndLength + 60, 40 - stringerParams.treadThickness);

            // Задняя кромка
            var p20 = itercection(stringerParams.pstart, polar(stringerParams.pstart, 0, 100.0), p2, polar(p2, Math.PI * 3 / 2, 100.0));

            var fil1 = fillet(p1, 0, p20, Math.PI * 0.5, stringerParams.rad1);
            var fil2 = fillet(p2, Math.PI * 1.5, stringerParams.pstart, 0, stringerParams.rad1);

            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), stringerParams.rad1, Math.PI * 0.5, 0, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);

        } else {
            // подъем ступени
            if (stringerParams.stairAmt == 0) {
                if ((stringerParams.marshDist - 75) >= stringerParams.rad1) {
                    var p10 = copyPoint(p1);
                    //var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
                    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion + 40 - stringerParams.treadThickness);
                } else {
                    var p10 = newPoint_xy(p1, -(stringerParams.marshDist - 75), 0.0);
                    //var p3 = newPoint_xy(p10, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
                    var p3 = newPoint_xy(p10, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion + 40 - stringerParams.treadThickness);
                }
            } else {
                if (stringerParams.botEnd == "winderTop0") {
                    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
                    var p10 = copyPoint(p1);
                    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion + 40 - stringerParams.treadThickness);
                } else {
                    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
                    var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
                    //var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
                    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion + 40 - stringerParams.treadThickness);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
                }
            }
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

            // проступь
            p1 = copyPoint(p2);
            //p2 = newPoint_xy(p1, stringerParams.topEndLength, 0.0);
            p2 = newPoint_xy(p1, stringerParams.topEndLength, 40 - stringerParams.treadThickness);
            if (stringerParams.stringerType == "ломаная" && stringerParams.stairAmt == 0) p2 = newPoint_xy(p3, stringerParams.stringerWidth, stringerParams.rad1 + 40 - stringerParams.treadThickness);
            var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
            var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad1, 0.0), stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI * 0.5, 0, stringerParams.dxfBasePoint);


            // Задняя кромка
            p1 = copyPoint(p2);
            if (stringerParams.stringerType == "ломаная") {
                if (stringerParams.stairAmt != 0) {
                    p1 = newPoint_xy(p1, 0.0, -stringerParams.rad1);
                    var fil0 = fillet(p1, Math.PI * 1.5, p_3, 0, stringerParams.rad1);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad1, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, newPoint_xy(p_3, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
                    pc = newPoint_xy(p_3, stringerParams.rad2, -stringerParams.rad2);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
                    // Нижняя линия ломаной
                    var i;
                    p1 = newPoint_xy(p_3, 0.0, -stringerParams.rad2);
                    for (i = 1; i < stringerParams.stairAmt - 2; i++) {
                        p2 = newPoint_xy(p1, 0.0, -(stringerParams.h - stringerParams.rad2 - stringerParams.rad1));
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                        p1 = copyPoint(p2);
                        pc = newPoint_xy(p1, -stringerParams.rad1, 0.0);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 0.0, -Math.PI * 0.5, stringerParams.dxfBasePoint);
                        p1 = newPoint_xy(pc, 0.0, -stringerParams.rad1);
                        p2 = newPoint_xy(p1, -(stringerParams.b - stringerParams.rad2 - stringerParams.rad1), 0.0);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                        p1 = newPoint_xy(p2, -stringerParams.rad2, -stringerParams.rad2);
                        pc = newPoint_xy(p2, 0.0, -stringerParams.rad2);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
                    }
                    if (stringerParams.botEnd != 'winder' && stringerParams.botEnd != 'platformG') {
                        var fil0 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, 0, stringerParams.rad1);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad1, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
                    }
                    else {
                        p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad2 + stringerParams.rad1);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, 0.0), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
                        var fil0 = fillet(newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), fil0.start, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad2, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
                    }
                }
                else {
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, 0.0, -stringerParams.rad1), stringerParams.pstart, stringerParams.dxfBasePoint);
                }
            } else {
                if (stringerParams.stairAmt != 0) {
                    p1 = newPoint_xy(p1, 0.0, -stringerParams.rad1);
                    var fil1 = fillet(p1, Math.PI * 1.5, p20, stringerParams.stairAngle1, stringerParams.rad1);
                    var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
                    // нижняя линия марша
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
                    // низ
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
                } else {
                    p2 = newPoint_xy(p1, 0.0, -213.620); // 213.620 - длина задней линии тетивы (взята с модели)
                    pc1 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
                    p1 = newPoint_xy(p1, 0.0, -stringerParams.rad1);
                    alfa = Math.atan((pc1.y - stringerParams.pstart.y) / (pc1.x - stringerParams.pstart.x)); // определяем угол наклона нижней линии тетивы
                    // задняя линия тетивы
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, 2 * Math.PI, 1.5 * Math.PI + alfa, stringerParams.dxfBasePoint);
                    p1 = polar(pc1, 1.5 * Math.PI + alfa, stringerParams.rad1);
                    p2 = polar(stringerParams.pstart, 1.5 * Math.PI + alfa, stringerParams.rad1);
                    // нижняя линия марша
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.pstart, stringerParams.rad1, 1.5 * Math.PI + alfa, 1.5 * Math.PI, stringerParams.dxfBasePoint);
                }
            }
        }

        // отверстия
        // отверстия под уголки крепления верхнего марша
        // первая пара отверстий
        if (stringerParams.h < 235 && stringerParams.botEnd == "winderBot0") {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            //var ph = newPoint_xy(ph, 0, - stringerParams.h);
            //var center1 = newPoint_xy(ph, holeCoordX1, 30); //
            center1 = newPoint_xy(ph, holeCoordX2, -holeCoordY);
            var center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        } else {
            // первая пара отверстий
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, holeCoordX2, -holeCoordY + 60);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            // вторая пара отверстий
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, holeCoordX2, -holeCoordY - 45);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }

        // первое отверстие под рамку первой забежной ступени (второе совпадает с уголками)
        hole1 = new THREE.Path();
        center1 = newPoint_xy(ph, holeCoordX1, -holeCoordY);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
    }


    if (stringerParams.stairFrame == "нет") {
        stringerParams.topEndLength = 5 + turnStepsParams.params[1].stepWidthLow + 25;

        var topLineStringerProtrusion = 30;
        var treadSideOffset = 5;  // зазор между тетивой и ступенью
        var holeCoordX1 = 74;

        var p1 = copyPoint(stringerParams.p2);

        var p_3 = newPoint_xy(p1, -stringerParams.b + stringerParams.stringerWidth, -stringerParams.stringerWidth);
        var p2 = newPoint_xy(p1, 0.0, stringerParams.h + topLineStringerProtrusion);
        var ph = copyPoint(p2);

        if (stringerParams.stringerType == "прямая") {
            var p20 = newPoint_xy(p1, -stringerParams.b + (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
        }
        else {
            var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        }
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
        // подъем ступени
        if (stringerParams.botEnd == "winderBot0") {
            holeCoordX1 = holeCoordX1 - 10;
            // проступь
            p1 = copyPoint(stringerParams.p2);
            var ph = copyPoint(p1);
            if (stringerParams.h <= 235)
                ph = newPoint_xy(ph, 0, 30);
            //p2 = newPoint_xy(p1, stringerParams.topEndLength, 0.0);
            p2 = newPoint_xy(p1, stringerParams.topEndLength + 75, 40 - stringerParams.treadThickness);

            // Задняя кромка
            var p20 = itercection(stringerParams.pstart, polar(stringerParams.pstart, 0, 100.0), p2, polar(p2, Math.PI * 3 / 2, 100.0));

            var fil1 = fillet(p1, 0, p20, Math.PI * 0.5, stringerParams.rad1);
            var fil2 = fillet(p2, Math.PI * 1.5, stringerParams.pstart, 0, stringerParams.rad1);

            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), stringerParams.rad1, Math.PI * 0.5, 0, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);

        } else {
            // подъем ступени
            if (stringerParams.botEnd == "winderTop0") {
                var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
                var p10 = copyPoint(p1);
                var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
            } else {
                var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
                var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
                var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
            }
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

            // проступь
            p1 = copyPoint(p2);
            //p2 = newPoint_xy(p1, stringerParams.topEndLength, 0.0);
            p2 = newPoint_xy(p1, stringerParams.topEndLength, 40 - stringerParams.treadThickness);
            if (stringerParams.stringerType == "ломаная" && stringerParams.stairAmt == 0) p2 = newPoint_xy(p1, stringerParams.stringerWidth, 40 - stringerParams.treadThickness);
            var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
            var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            pc2 = newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad1, 0.0), stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI * 0.5, 0, stringerParams.dxfBasePoint);

            // Задняя кромка
            p1 = copyPoint(p2);
            ph3 = copyPoint(p1);
            if (stringerParams.stringerType == "ломаная") {
                p1 = newPoint_xy(p1, 0.0, -stringerParams.rad1);
                if (stringerParams.stairAmt != 0) {
                    var fil0 = fillet(p1, Math.PI * 1.5, p_3, 0, stringerParams.rad1);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad1, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, newPoint_xy(p_3, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
                    pc = newPoint_xy(p_3, stringerParams.rad2, -stringerParams.rad2);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
                    // Нижняя линия ломаной
                    var i;
                    p1 = newPoint_xy(p_3, 0.0, -stringerParams.rad2);
                    for (i = 1; i < stringerParams.stairAmt - 2; i++) {
                        p2 = newPoint_xy(p1, 0.0, -(stringerParams.h - stringerParams.rad2 - stringerParams.rad1));
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                        p1 = copyPoint(p2);
                        pc = newPoint_xy(p1, -stringerParams.rad1, 0.0);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 0.0, -Math.PI * 0.5, stringerParams.dxfBasePoint);
                        p1 = newPoint_xy(pc, 0.0, -stringerParams.rad1);
                        p2 = newPoint_xy(p1, -(stringerParams.b - stringerParams.rad2 - stringerParams.rad1), 0.0);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                        p1 = newPoint_xy(p2, -stringerParams.rad2, -stringerParams.rad2);
                        pc = newPoint_xy(p2, 0.0, -stringerParams.rad2);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
                    }
                    if (stringerParams.botEnd != 'winder' && stringerParams.botEnd != 'platformG') {
                        var fil0 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, 0, stringerParams.rad1);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad1, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
                    }
                    else {
                        p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad2 + stringerParams.rad1);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, 0.0), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
                        var fil0 = fillet(newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), fil0.start, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad2, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
                    }
                }
                else {
                    p_3.x = p1.x;
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p_3, stringerParams.dxfBasePoint);
                    pc_3 = newPoint_xy(p_3, -stringerParams.rad1, 0.0);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
                    p1 = newPoint_xy(p_3, -stringerParams.rad1, -stringerParams.rad1);
                    p2.x = stringerParams.pstart.x;
                    p2.y = p1.y;
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, newPoint_xy(p2, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, stringerParams.rad2, -stringerParams.rad2), stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, 0.0, -stringerParams.rad2), stringerParams.pstart, stringerParams.dxfBasePoint);
                }
            } else {
                if (stringerParams.stairAmt != 0) {
                    p1 = newPoint_xy(p1, 0.0, -stringerParams.rad1);
                    var fil1 = fillet(p1, Math.PI * 1.5, p20, stringerParams.stairAngle1, stringerParams.rad1);
                    var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil1.start, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);

                    if (stringerParams.botEnd == "winderTop0") {
                        // низ
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);

                    } else {
                        // нижняя линия марша
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
                        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
                        // низ
                        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
                    }

                } else {
                    p1 = copyPoint(p2);
                    p2 = newPoint_xy(p1, 0.0, -213.620); // 213.620 - длина задней линии тетивы (взята с модели)
                    pc1 = newPoint_xy(p2, -stringerParams.rad1, 0.0);
                    p1 = newPoint_xy(p1, 0.0, -stringerParams.rad1);
                    alfa = Math.atan((pc1.y - stringerParams.pstart.y) / (pc1.x - stringerParams.pstart.x)); // определяем угол наклона нижней линии тетивы
                    // задняя линия тетивы
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, 2 * Math.PI, 1.5 * Math.PI + alfa, stringerParams.dxfBasePoint);
                    p1 = polar(pc1, 1.5 * Math.PI + alfa, stringerParams.rad1);
                    p2 = polar(newPoint_xy(stringerParams.pstart, 0, 0), 1.5 * Math.PI + alfa, stringerParams.rad1);
                    // нижняя линия марша
                    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, stringerParams.pstart, stringerParams.dxfBasePoint);
                    //addArc(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.pstart, stringerParams.rad1, 1.5*Math.PI + alfa, 1.5*Math.PI, stringerParams.dxfBasePoint);
                }
            }
        }

        // отверстия

        // отверстия под уголки крепления верхнего марша
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();


        if (stringerParams.h < 235 && stringerParams.botEnd == "winderBot0") {
            center1 = newPoint_xy(ph, holeCoordX1, -(topLineStringerProtrusion + stringerParams.rad2 + stringerParams.treadThickness + 20));
            var center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        } else {
            var center1 = newPoint_xy(ph,
                holeCoordX1,
                -(topLineStringerProtrusion + stringerParams.rad2 + stringerParams.treadThickness + 20 - 60)); //
            var center2 = newPoint_xy(center1, 0.0, -60.0);
            var center3 = newPoint_xy(center2, 0.0, -60.0);
            var center4 = newPoint_xy(center3, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            holes.push(hole3);
            holes.push(hole4);
        }
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = center2 = 0;
        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            //center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
            //center2 = newPoint_xy(center1, 0.0, -60.0);
            center1 = center2 = 0;
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = center2 = 0;
        }

        if (center1 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }
}//end of drawTopStepLt_wndIn

/**
 * последний подъем если сверху забег (внешняя сторона)
 */
function drawTopStepLt_wndOut(stringerParams, turnFramesParams, platformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    if (stringerParams.stairFrame == "есть") {
        //константы
        var topLineStringerProtrusion = 0;
        var stringerProtrusionEdge = 5;					// выступ тетивы за край степени
        var profileHeight = 40;							// высота профиля в рамках
        var angleHoleDistance = 60;						// расстояние между отверстиями в уголках
        var angelLenght = 20 + angleHoleDistance + 20;	// длина уголка
        var angleClearance = 5;							// зазор между уголками
        var wndBottomAngle = 10 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        var treadSideOffset = stringerParams.treadSideOffset;						// зазор между тетивой и ступенью


        var totalLengthWndOut = 83 + turnStepsParams.params[2].stepOffsetY + turnStepsParams.params[2].stepWidthY + 2 * treadSideOffset;// длина забежного участка тетивы
        //stringerParams.topEndLength = 5 + turnStepsParams.params[1].stepWidthLow + 5;
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            wndBottomAngle = 17.888 * Math.PI / 180;
            totalLengthWndOut = totalLengthWndOut - 10;
        }

        //todo:

        var holeCoordY = topLineStringerProtrusion + stringerParams.treadThickness + turnFramesParams.params.frameParams1.holesCoordinates.holesCoordinates1_1.y1 + stringerProtrusionEdge;
        var holeCoordX1 = 15 + turnFramesParams.params.frameParams1.holesCoordinates.holesCoordinates1_2.x1;
        var holeCoordX2 = 15 + turnFramesParams.params.frameParams1.holesCoordinates.holesCoordinates1_2.x2;

        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            holeCoordX1 = holeCoordX1 - 5;
            holeCoordX2 = holeCoordX2 - 5;

        }/**/
        var holeCoordX3 = /*15 + */turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_3.x1;

        var stringerBackLineLenght = stringerProtrusionEdge + stringerParams.treadThickness + profileHeight + angleClearance + angelLenght + angleClearance + angelLenght + angleClearance;		// длинна задней вертикальной линии тетивы


        var p1 = copyPoint(stringerParams.p2);
        var p_3 = newPoint_xy(p1, -stringerParams.b + stringerParams.stringerWidth, -stringerParams.stringerWidth);		// для ломаной
        var p2 = newPoint_xy(p1, 0.0, stringerParams.h + topLineStringerProtrusion);
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            p2 = copyPoint(p1);
        }
        var ph = copyPoint(p2);
        /*if (stringerParams.stairAmt == 0) {
            ph = newPoint_xy(p2, - treadSideOffset, 0.0);
        }*/

        if (stringerParams.stringerType == "прямая") {
            var p20 = newPoint_xy(p1, -stringerParams.b + (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
        }
        else {
            var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        }
        //  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

        // подъем ступени
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
        if (stringerParams.stairAmt > 1) {
            var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);
        }
        else {
            var p3 = copyPoint(p1);
        }
        // Первая проступь забежного участка
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, totalLengthWndOut - turnStepsParams.params[2].stepWidthY - 5 - treadSideOffset, 0.0);
        var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
        if (stringerParams.stairAmt > 1) {
            var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        }
        else {
            p4 = copyPoint(p3);
        }
        pc2 = newPoint_xy(p2, -stringerParams.rad2, stringerParams.rad2);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        var lengthB1 = p2.x - p1.x;//длина первой проступи
        // подъем
        p1 = newPoint_xy(p2, 0.0, stringerParams.rad2);
        p2 = newPoint_xy(p1, 0.0, stringerParams.h3 - stringerParams.rad1 - stringerParams.rad2);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, stringerParams.rad1, 0.0);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        // Вторая проступь забежного участка
        p1 = newPoint_xy(pc2, 0.0, stringerParams.rad1);
        // todo: корректировать длину в сторону уменьшения
        //p2 = newPoint_xy(p1, turnStepsParams.params[2].stepWidthY + treadSideOffset + stringerParams.stringerThickness, 0);
        p2 = newPoint_xy(p1, turnStepsParams.params[2].stepWidthY - treadSideOffset + stringerParams.stringerThickness, 0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        var pr2 = copyPoint(p2);//точка для отверстия под ограждение

        // Задняя кромка
        p1 = copyPoint(p2);
        ph3 = copyPoint(p1);
        if (stringerParams.stringerType == "ломаная") {
            p2 = newPoint_xy(p1, -(totalLengthWndOut - stringerParams.rad2 - stringerParams.stringerWidth), -(stringerParams.h3 + stringerParams.stringerWidth));
            var fil0 = fillet(p1, Math.PI * 1.5, p2, Math.PI * 2.0, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, p2, stringerParams.dxfBasePoint);
            var pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            // Нижняя линия ломаной
            var i;
            p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
            for (i = 1; i < stringerParams.stairAmt - 1; i++) {
                p2 = newPoint_xy(p1, 0.0, -(stringerParams.h - stringerParams.rad2 - stringerParams.rad1));
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                p1 = copyPoint(p2);
                pc = newPoint_xy(p1, -stringerParams.rad1, 0.0);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 0.0, -Math.PI * 0.5, stringerParams.dxfBasePoint);
                p1 = newPoint_xy(pc, 0.0, -stringerParams.rad1);
                p2 = newPoint_xy(p1, -(stringerParams.b - stringerParams.rad2 - stringerParams.rad1), 0.0);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                p1 = newPoint_xy(p2, -stringerParams.rad2, -stringerParams.rad2);
                pc = newPoint_xy(p2, 0.0, -stringerParams.rad2);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            }
            if (stringerParams.botEnd != 'winder' && stringerParams.botEnd != 'platformG') {
                var fil0 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, 0, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad1, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
            else {
                p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad2 + stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, 0.0), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
                var fil0 = fillet(newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), fil0.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad2, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
            if (key == "out") {
                var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
                stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5)); // точка привязки стекла ограждения (самонесущее стекло)
            }
        }
        else {
            p2 = newPoint_xy(p1, 0, -stringerBackLineLenght);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            if (stringerParams.stairAmt > 1) {
                var fil1 = fillet(p2, Math.PI + wndBottomAngle, p20, stringerParams.stairAngle1, stringerParams.rad1);
                var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
                // нижняя линия марша
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
                if (key == "out") {
                    stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5)); // точка привязки стекла ограждения (самонесущее стекло)
                }
                // низ
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
            else {
                var ang = calcAngleX1(p2, newPoint_xy(stringerParams.pstart, 0.3 * stringerParams.M, 0.0));
                var fil1 = fillet(p2, ang, stringerParams.pstart, 0.0, stringerParams.rad1);
                //var fil1 = fillet(p2, Math.PI + wndBottomAngle, stringerParams.pstart, 0.0, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
        }
        // отверстия
        // отверстия под уголки крепления верхнего марша
        // первая пара отверстий
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph3, -30, -(stringerProtrusionEdge + stringerParams.treadThickness + profileHeight + 25));	// здесь 25 - это расстояние от фланца рамки до верхнего отверстия в уголке
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // вторая пара отверстий
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center2, 0.0, -45);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под рамку первой забежной ступени
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        //console.log(holeCoordY)
        center1 = newPoint_xy(ph, holeCoordX1, -holeCoordY);
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            center1 = newPoint_xy(ph, holeCoordX1 - 5, -holeCoordY);
        }
        center2 = newPoint_xy(center1, holeCoordX2 - holeCoordX1, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // отверстие под рамку второй забежной ступени
        hole1 = new THREE.Path();
        center1 = newPoint_xy(ph, totalLengthWndOut - holeCoordX3 - 8, stringerParams.h3 - holeCoordY);		// здесь 8 - это толщина фланца в рамке
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
    }


    if (stringerParams.stairFrame == "нет") {
        var topLineStringerProtrusion = 0;
        var treadSideOffset = stringerParams.treadSideOffset;
        var stringerProtrusionEdge = 5;					// выступ тетивы за край степени
        var profileHeight = 40;							// высота профиля в рамках
        var angleHoleDistance = 60;						// расстояние между отверстиями в уголках
        var angleHoleY = 20;						    // отступ от низа ступени до центра отверстия крепления уголка
        var angleLenght = 20 + angleHoleDistance + 20;	// длина уголка
        var angleLenghtWnd = turnStepsParams.angles.params.angleLength;	// длина уголка для забежных ступеней
        var angleHoleDistanceWnd = -25 + angleLenghtWnd - 25;					// расстояние между отверстиями в уголках
        var angleClearance = 5;							// зазор между уголками
        var wndBottomAngle = 10 * Math.PI / 180;					// угол нижней линии тетивы под забежной частью
        if (stringerParams.stairAmt == 0) {
            wndBottomAngle = 17.888 * Math.PI / 180;
        }

        //var totalLengthWndOut = turnStepsParams.params[2].stepOffsetY + turnStepsParams.params[2].stepWidthY + stringerParams.stringerThickness + treadSideOffset * 2 + 31 + stringerProtrusionEdge; // *2
        var totalLengthWndOut = stringerParams.M + 31 + stringerProtrusionEdge;
        // длинна задней вертикальной линии тетивы
        var stringerBackLineLenght = stringerProtrusionEdge + stringerParams.treadThickness + profileHeight + angleClearance + angleLenght + angleClearance + angleLenght + angleClearance;
        if (stringerParams.stairAmt == 0) {
            wndBottomAngle = 17.888 * Math.PI / 180;
            totalLengthWndOut -= 5;
        }

        var p1 = copyPoint(stringerParams.p2);
        var p_3 = newPoint_xy(p1, -stringerParams.b + stringerParams.stringerWidth, -stringerParams.stringerWidth);

        var p2 = newPoint_xy(p1, 0.0, stringerParams.h + topLineStringerProtrusion);
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            p2 = copyPoint(p1);
        }
        var ph = copyPoint(p2);

        if (stringerParams.stringerType == "прямая") {
            var p20 = newPoint_xy(p1, -stringerParams.b + (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        }
        else {
            var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        }

        // подъем ступени
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
        if (stringerParams.stairAmt > 1) {
            var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1 + topLineStringerProtrusion);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);
        }
        else {
            var p3 = copyPoint(p1);
        }

        // Первая проступь забежного участка
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, totalLengthWndOut - turnStepsParams.params[2].stepWidthY - stringerParams.stringerThickness - treadSideOffset - 5, 0.0);
        var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
        if (stringerParams.stairAmt > 1) {
            var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        }
        else {
            p4 = copyPoint(p3);
        }
        pc2 = newPoint_xy(p2, -stringerParams.rad2, stringerParams.rad2);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        var lengthB1 = p2.x - p1.x;//длина первой проступи
        // подъем
        p1 = newPoint_xy(p2, 0.0, stringerParams.rad2);
        p2 = newPoint_xy(p1, 0.0, stringerParams.h3 - stringerParams.rad1 - stringerParams.rad2); //
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        pc2 = newPoint_xy(p2, stringerParams.rad1, 0.0);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);

        // Вторая проступь забежного участка
        p1 = newPoint_xy(pc2, 0.0, stringerParams.rad1);
        p2 = newPoint_xy(ph, totalLengthWndOut, stringerParams.h3);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        var pr2 = copyPoint(p2);//точка для отверстия под ограждение

        // Задняя кромка
        p1 = copyPoint(p2);
        ph3 = copyPoint(p1);
        if (stringerParams.stringerType == "ломаная") {
            p2 = newPoint_xy(p1, -(totalLengthWndOut - stringerParams.rad2 - stringerParams.stringerWidth), -(stringerParams.h3 + stringerParams.stringerWidth));
            //console.log(p1, p2);
            var fil0 = fillet(p1, Math.PI * 1.5, p2, Math.PI * 2.0, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, p2, stringerParams.dxfBasePoint);
            var pc2 = newPoint_xy(p2, 0.0, -stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            // Нижняя линия ломаной
            var i;
            p1 = newPoint_xy(pc2, -stringerParams.rad2, 0.0);
            for (i = 1; i < stringerParams.stairAmt - 1; i++) {
                p2 = newPoint_xy(p1, 0.0, -(stringerParams.h - stringerParams.rad2 - stringerParams.rad1));
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                p1 = copyPoint(p2);
                pc = newPoint_xy(p1, -stringerParams.rad1, 0.0);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 0.0, -Math.PI * 0.5, stringerParams.dxfBasePoint);
                p1 = newPoint_xy(pc, 0.0, -stringerParams.rad1);
                p2 = newPoint_xy(p1, -(stringerParams.b - stringerParams.rad2 - stringerParams.rad1), 0.0);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                p1 = newPoint_xy(p2, -stringerParams.rad2, -stringerParams.rad2);
                pc = newPoint_xy(p2, 0.0, -stringerParams.rad2);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
            }
            if (stringerParams.botEnd != 'winder' && stringerParams.botEnd != 'platformG') {
                var fil0 = fillet(p1, Math.PI * 1.5, stringerParams.pstart, 0, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, fil0.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad1, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
            else {
                p2 = newPoint_xy(p1, 0.0, -stringerParams.h + stringerParams.rad2 + stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, 0.0), stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
                var fil0 = fillet(newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), Math.PI, stringerParams.pstart, Math.PI * 0.5, stringerParams.rad2);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p2, -stringerParams.rad1, -stringerParams.rad1), fil0.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil0.center, stringerParams.rad2, fil0.angstart, fil0.angend, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil0.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
        }
        else {
            p2 = newPoint_xy(p1, 0, -stringerBackLineLenght);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            if (stringerParams.stairAmt != 0) {
                var fil1 = fillet(p2, Math.PI + wndBottomAngle, p20, stringerParams.stairAngle1, stringerParams.rad1);
                var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, stringerParams.pstartang, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
                // нижняя линия марша
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
                // низ
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
            else {
                var fil1 = fillet(p2, Math.PI + wndBottomAngle, stringerParams.pstart, 0.0, stringerParams.rad1);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, stringerParams.pstart, stringerParams.dxfBasePoint);
            }
        }



        // отверстия

        // отверстия под перемычку
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            var center1 = newPoint_xy(ph, 64.0, -(stringerProtrusionEdge + stringerParams.treadThickness + 20));
        }
        else {
            var center1 = newPoint_xy(ph, 74.0, -(stringerProtrusionEdge + stringerParams.treadThickness + 20));
        }
        var center2 = newPoint_xy(center1, 0.0, -angleHoleDistance);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));
        //stringerParams.elmIns[key].briges.push(newPoint_xy(newPoint_xy(center1, -114, 0), -38.0, 20.0));
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        var xOffsetStrTh = stringerParams.stairAmt < 2 ? -8 : 0;

        //отверстия под уголки первой забежной ступени
        var angPos = turnStepsParams.angles.params;
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        ph = copyPoint(stringerParams.p2)
        var angleHoleOffsetX = angPos.a1_1.x - angleLenghtWnd + 5 + 25;
        var angleHoleOffsetY = stringerParams.h - stringerParams.treadThickness - angleHoleY - 5;
        //поправка для внешней тетивы П-образной лестницы с забегом
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            angleHoleOffsetY = angleHoleOffsetY - stringerParams.h;
            angleHoleOffsetX = angleHoleOffsetX - stringerParams.stringerThickness;
        }
        center1 = newPoint_xy(ph, angleHoleOffsetX, angleHoleOffsetY)
        center2 = newPoint_xy(center1, angleHoleDistanceWnd, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        //отверстия под уголки второй забежной ступени
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        //console.log(angPos.a2_1.x)
        var angleHoleOffsetX = angPos.a2_1.x - angleLenghtWnd + 5 + 25;
        var angleHoleOffsetY = stringerParams.h + stringerParams.h3 - stringerParams.treadThickness - angleHoleY - 5;
        //поправка для внешней тетивы П-образной лестницы с забегом
        if (stringerParams.stairAmt == 0 || stringerParams.stairAmt == 1) {
            angleHoleOffsetY = angleHoleOffsetY - stringerParams.h;
            angleHoleOffsetX = angleHoleOffsetX - stringerParams.stringerThickness;
        }
        center1 = newPoint_xy(ph, angleHoleOffsetX, angleHoleOffsetY);
        center2 = newPoint_xy(center1, angleHoleDistanceWnd, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия для крепления с верхним маршем
        // первая пара отверстий
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        //var xOffsetAngle = stringerParams.stairAmt != 0 ? 29 : 37; // отступаем от края тетивы до отверстия
        var xOffsetAngle = -30 - stringerParams.stringerThickness;
        center1 = newPoint_xy(ph3, xOffsetAngle, -(stringerProtrusionEdge + stringerParams.treadThickness + profileHeight + 25));	// здесь 25 - это расстояние от фланца рамки до верхнего отверстия в уголке
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // вторая пара отверстий
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center2, 0.0, -45);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            // отверстия под стойку 1
            center1 = newPoint_xy(p3, stringerParams.b * 0.5 + 80, stringerParams.stepHoleY);
            if ((stringerParams.stairAmt === 0 && stringerParams.botEnd !== "winderBot0") || (stringerParams.stairAmt === 1 && stringerParams.botEnd == "winder" && params.stairModel == "П-образная трехмаршевая"))
                center1 = newPoint_xy(p3, lengthB1 * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            //добавляем отверстия под стойку 1
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint)

            // отверстия под стойку 2
            center1 = newPoint_xy(pr2, -60 - stringerParams.stringerThickness - 15, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        /*if (stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            if (stringerParams.text != "забежный") {
                center1 = newPoint_xy(p3, stringerParams.a * 0.5 + 5, -100);
                center2 = newPoint_xy(center1, 0.0, -100);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                //добавляем отверстия под стойку 1
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
                addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
            }
            // отверстия под стойку 2
            center1 = newPoint_xy(pr2, -60 - stringerParams.stringerThickness - 15, -110);
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            // отверстия под стойку 1
            if (stringerParams.stairAmt == 0) {
                //center1 = newPoint_xy(p3, stringerParams.b * 0.5 + 200, stringerParams.stepHoleY + stringerParams.rad1);
                center1 = center2 = 0;
            }
            else {
                center1 = newPoint_xy(p3, stringerParams.b * 0.5, stringerParams.stepHoleY + stringerParams.rad1);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }

            //добавляем отверстия под стойку 1
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint)

            // отверстия под стойку 2
            center1 = newPoint_xy(pr2, -60 - 5 - 30 - stringerParams.stringerThickness, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        if (center1 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }
}//end of drawTopStepLt_wndOut

/**
 * тетива верхнего марша (одна ступень в марше)
 */
function drawStringerLt_1Top_PltG(stringerParams, turnFramesParams, botplatformFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams) {

    var text = "Тетива " + (stringerParams.key === 'out' ? 'внешняя' : 'внутренняя');
    var textHeight = 30;
    //var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -200);
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, (stringerParams.botEnd == "platformG" || stringerParams.botEnd == "platformP") ? -350.0 : -150.0);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    if (stringerParams.botEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.botEndLength;

    stringerParams.stringerShape = new THREE.Shape();
    stringerParams.stringerShapeNo = new THREE.Shape();
    var key = stringerParams.key;

    // точки вставки уголков, рамок, перемычек
    stringerParams.elmIns[key] = {};
    stringerParams.elmIns[key].angles = [];
    stringerParams.elmIns[key].anglesop = [];
    stringerParams.elmIns[key].angleB = [];
    stringerParams.elmIns[key].angleU = [];
    stringerParams.elmIns[key].briges = [];
    stringerParams.elmIns[key].racks = [];

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;
    if (params.botFloorType === "черновой" && stringerParams.botEnd == "floor") {
        stringerOffset_y = stringerParams.botFloorsDist;
    }

    // константы
    stringerParams.holeRad = 6.5;            // радиус (диаметра) отверстий в тетивах
    stringerParams.holeRutelRad = 9;		 // радиус отверстий под рутели в тетиве
    stringerParams.stepHoleX1 = 45;          // координата Х первого отверстия крепления уголка ступени относительно угла косоура
    stringerParams.holeDistU2_230 = 180;     // расстояние между отверстиями для уголка У2-230
    stringerParams.holeDistU2_200 = 150;     // расстояние между отверстиями для уголка У2-200
    stringerParams.holeDistU2_160 = 110;     // расстояние между отверстиями для уголка У2-160
    stringerParams.stepHoleY = -65;          // координата Y отверстий крепления уголка ступени
    stringerParams.stringerWidth = 150;      // ширина тетивы
    stringerParams.rad1 = 10.0;              // Радиус скругления внешних углов
    stringerParams.rad2 = 5.0;               // Радиус скругления внутренних углов
    stringerParams.stairAngle1 = Math.atan(stringerParams.h / stringerParams.b);   // вычисляем угол наклона лестницы

    if (stringerParams.stairFrame == "есть" &&
        (stringerParams.stairType == "рифленая сталь" || stringerParams.stairType == "рифленый алюминий" ||
            stringerParams.stairType == "дпк")) {
        stringerParams.stringerWidth150 = 5.0 + stringerParams.treadThickness + 60.0 + 100.0 + 5.0;
    }
    else {
        stringerParams.stringerWidth150 = 150.0;
    }

    if (stringerParams.stringerType == "ломаная") stringerParams.stringerWidth = 180;
    if (stringerParams.stringerType == "прямая") stringerParams.stringerWidth = 320;

    //console.log()
    // установки размеров под уголки
    setStairAngles(stringerParams);
    // уголки и рамки
    if (stringerParams.stairFrame == "есть") {
        stringerParams.stepHoleX1 = marshFramesParams.sideHolePosX + 5.0 + marshFramesParams.overhang;
        stringerParams.holeDist = stringerParams.a - (marshFramesParams.overhang + marshFramesParams.overhang +
            marshFramesParams.sideHolePosX + marshFramesParams.sideHolePosX);
        stringerParams.holeDist2 = stringerParams.holeDist;
        stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0);      // координата Y отверстий крепления рамки
    }

    // тетива
    stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };
    stringerParams.divide = 0;

    var holes = stringerParams.stringerShape.holes;

    //размеры верхнего выступа
    var topLedgeWidth = 0;
    var topLedgeHeight = 0;
    if (stringerParams.topAnglePosition == "над ступенью") {
        topLedgeWidth = 90;
        topLedgeHeight = 110;
    }
    if (stringerParams.topAnglePosition == "вертикальная рамка") {
        topLedgeWidth = 85;
        topLedgeHeight = stringerParams.h - 25;
    }

    // НИЖНЯЯ ЧАСТЬ

    var p0 = copyPoint(stringerParams.p0);

    var p1 = newPoint_xy(p0, 105.0, -stringerParams.stringerWidth + 5.0);             // нижний правый угол
    var p2 = newPoint_xy(p0, 40.0, -stringerParams.stringerWidth + 5.0);
    p2 = newPoint_xy(p2, params.carcasPartsSpacing, 0.0); //зазор для проверки модели
    var p3 = newPoint_xy(p0, 40.0, 5.0 + 5.0);
    p3 = newPoint_xy(p3, params.carcasPartsSpacing, 0.0); //зазор для проверки модели
    var p4 = newPoint_xy(p0, 0.0, stringerParams.h + 5.0);  // верхний левый угол
    var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
    var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
    var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
    var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
    var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
    var p11 = polar(p1, Math.PI / 3.0, 100.0);
    var fil1 = fillet(p11, Math.PI * (4.0 / 3.0), p1, 0.0, stringerParams.rad1);
    var p31 = polar(p3, Math.PI * (2.0 / 3.0), 30.0);
    var fil2 = fillet(p2, Math.PI * 0.5, p31, Math.PI * (5.0 / 3.0), stringerParams.rad1);
    var fil3 = fillet(p3, Math.PI * (2.0 / 3.0), p4, Math.PI * 1.5, stringerParams.rad1);

    // обрезка нижней части
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p2, stringerParams.dxfBasePoint);
    // подъем
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, 0.0, Math.PI / 6.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil3.start, stringerParams.dxfBasePoint);
    // срез передней кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, p41, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);

    // отверстия под нижний крепежный уголок
    // крепления к площадке
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 70.0, 25.0 - stringerParams.stringerWidth + 5.0);
    center2 = newPoint_xy(center1, 0.0, 60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
    holes.push(hole1);
    holes.push(hole2);

    // сохраняем точку и угол для замыкания контура
    pstart = fil1.start;
    pstartang = Math.PI / 3.0;

    // ВЕРХНЯЯ ЧАСТЬ

    // последняя проступь
    var topStepWidth = stringerParams.a + 5.0;
    if (stringerParams.topAnglePosition == "вертикальная рамка") topStepWidth = stringerParams.b + 80;

    if (stringerParams.stringerType == "пилообразная" || stringerParams.stringerType == "ломаная") {
        var botLineP3 = newPoint_xy(pnext, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша

        p1 = newPoint_xy(p42, -stringerParams.rad1, 0.0);
        p11 = newPoint_xy(p1, stringerParams.rad1, 0.0);
        pc1 = newPoint_xy(p1, stringerParams.rad1, -stringerParams.rad1);
        //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        var topLineP10 = p1; //сохраняем точку

        p2 = newPoint_xy(p1, topStepWidth, 0.0);
        if (stringerParams.topFlan == "есть") p2 = newPoint_xy(p1, topStepWidth + 8.0, 0.0);
        if (topLedgeWidth == 0) addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p2, stringerParams.dxfBasePoint);

        /*верхний выступ*/

        if (topLedgeWidth != 0) {
            //верхняя проступь
            p2 = newPoint_xy(p2, -topLedgeWidth, 0.0);
            p21 = newPoint_xy(p2, -stringerParams.rad2, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p21, stringerParams.dxfBasePoint);

            //вертикальный участок
            //нижняя дуга
            p1 = copyPoint(p2);
            p11 = newPoint_xy(p1, 0.0, stringerParams.rad2);
            pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);

            //вертикальная линия
            p2 = newPoint_xy(p1, 0.0, topLedgeHeight);
            p20 = newPoint_xy(p2, 0.0, -stringerParams.rad1);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p20, stringerParams.dxfBasePoint);

            //горизонтальный участок

            //верхняя дуга
            p1 = copyPoint(p2);
            p11 = newPoint_xy(p1, stringerParams.rad1, 0.0);
            pc1 = newPoint_xy(p1, stringerParams.rad1, -stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);

            p2 = newPoint_xy(p1, topLedgeWidth, 0.0);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p2, stringerParams.dxfBasePoint);
        } //end of topLedgeWidth != 0

        var botLineP1 = copyPoint(p2);
    }

    if (stringerParams.stringerType == "прямая") {
        var p2 = stringerParams.p_t1;
        var botLineP3 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);

        // проступь
        var topLineP10 = p2; //сохраняем точку
        var botLineP1 = newPoint_xy(p2, topStepWidth, topLedgeHeight);

        if (topLedgeWidth == 0) {
            //верхняя линия
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, stringerParams.fil_t1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.center, stringerParams.rad1, stringerParams.fil_t1.angstart, stringerParams.fil_t1.angend, stringerParams.dxfBasePoint);
            //горизонтальная линия последней ступени
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.end, botLineP1, stringerParams.dxfBasePoint);
        };

        if (topLedgeWidth != 0) {
            var fil2 = calculateFilletParams(p2, stringerParams.stairAngle1, botLineP1, Math.PI, stringerParams.rad1, true)
            //верхняя линия
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, fil2.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart - Math.PI, fil2.angend, stringerParams.dxfBasePoint);
            //горизонтальная линия последней ступени
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, botLineP1, stringerParams.dxfBasePoint);
        };

    }

    // отверстия под уголок/рамку ступени
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(topLineP10, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
    //if (stringerParams.topAnglePosition == "рамка верхней ступени") center2 = newPoint_xy(center2, 20, 0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
    stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
    holes.push(hole1);
    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(topLineP10, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }
        //if (stringerParams.railingModel == "Самонесущее стекло") {
        //    holeRad = stringerParams.holeRutelRad;
        //    center1 = newPoint_xy(topLineP10, stringerParams.a * 0.5 + 5, -115);
        //	center2 = newPoint_xy(center1, 0.0, -100);
        //    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        //}
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(topLineP10, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        }

        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }

    // Задняя кромка

    if (stringerParams.stringerType == "ломаная") {
        var botLineP2 = newPoint_xy(botLineP1, 0.0, -stringerParams.stringerWidth);
        if (stringerParams.topAnglePosition == "над ступенью" || stringerParams.topAnglePosition == "вертикальная рамка")
            botLineP2 = newPoint_xy(botLineP1, 0.0, -topLedgeHeight - stringerParams.stringerWidth);

        var p11 = newPoint_xy(botLineP2, -(topStepWidth - stringerParams.stringerWidth), 0.0);
        addLine1(botLineP1, newPoint_xy(botLineP2, 0.0, stringerParams.rad1), stringerParams);

        var pc1 = newPoint_xy(botLineP2, -stringerParams.rad1, stringerParams.rad1);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);

        addLine1(pe_arc, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams);

        var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
        var pe_arc = addArc1(pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams);

        var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);
        addLine1(pe_arc, newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams);


        var i = 2;
        for (; i < stringerParams.stairAmt; i++) {
            var p1 = copyPoint(p22);
            var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
            var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);

            var p11 = newPoint_xy(p1, -stringerParams.b, 0.0);
            var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);

            addLine1(pe_arc, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams);

            var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
            var pe_arc = addArc1(pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams);

            addLine1(pe_arc, newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams);
        }
        if (p22.y != pstart.y) {
            var p3 = newPoint_xy(p22, 0, -(p22.y - pstart.y));
            var p22 = addLine1(newPoint_xy(p22, 0.0, stringerParams.rad1), newPoint_xy(p3, 0.0, stringerParams.rad1), stringerParams);
            var p22 = copyPoint(p3);
        }
        var pc1 = newPoint_xy(p22, -stringerParams.rad1, stringerParams.rad1);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);
        addLine1(pe_arc, pstart, stringerParams);
    }

    if (stringerParams.stringerType != "ломаная") {
        var fil1 = fillet(botLineP1, Math.PI * 1.5, botLineP3, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(botLineP3, stringerParams.stairAngle1 + Math.PI, pstart,
            pstartang, stringerParams.rad1);
        //задняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, botLineP1, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // нижняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        // низ
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, pstart, stringerParams.dxfBasePoint);
    }

    var p1 = copyPoint(p2);


    // отверстия под верхний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var angleOffset;

    if (stringerParams.topAnglePosition == "под ступенью") angleOffset = -105 - topLedgeHeight;
    if (stringerParams.topAnglePosition == "над ступенью") angleOffset = 85 - topLedgeHeight;
    if (stringerParams.topAnglePosition == "вертикальная рамка") angleOffset = 100 - topLedgeHeight;

    if (stringerParams.topAnglePosition != "рамка верхней ступени") {
        center1 = newPoint_xy(botLineP1, -40.0, angleOffset);
        //console.log(center1)
        if (stringerParams.topAnglePosition == "вертикальная рамка") center1 = newPoint_xy(botLineP1, -20.0, angleOffset);
        //if (stringerParams.topFlan == "есть") center1 = newPoint_xy(p1, -48.0, angleOffset);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        if (stringerParams.topAnglePosition == "вертикальная рамка")
            center2 = newPoint_xy(center1, 0.0, -100.0);

        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleU.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
        stringerParams.stringerShape.holes.push(hole1);
        stringerParams.stringerShape.holes.push(hole2);
    }

    stringerParams.dxfBasePoint.x += stringerParams.b * stringerParams.stairAmt + stringerParams.dxfBasePointStep;
    if (stringerParams.topEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.topEndLength;

    return stringerParams;
}

/**
 * тетива нижнего марша (0 ступеней в марше)
 */
function drawStringerLt_0Bot_PltG(stringerParams, turnFramesParams, botplatformFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams) {

    var text = "Тетива " + (stringerParams.key === 'out' ? 'внешняя' : 'внутренняя');
    var textHeight = 30;
    //var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -200);
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, (stringerParams.botEnd == "platformG" || stringerParams.botEnd == "platformP") ? -350.0 : -150.0);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    if (stringerParams.botEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.botEndLength;

    stringerParams.stringerShape = new THREE.Shape();
    stringerParams.stringerShapeNo = new THREE.Shape();
    var key = stringerParams.key;

    // точки вставки уголков, рамок, перемычек
    stringerParams.elmIns[key] = {};
    stringerParams.elmIns[key].angles = [];
    stringerParams.elmIns[key].anglesop = [];
    stringerParams.elmIns[key].angleB = [];
    stringerParams.elmIns[key].angleU = [];
    stringerParams.elmIns[key].briges = [];
    stringerParams.elmIns[key].racks = [];

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;
    if (params.botFloorType === "черновой" && stringerParams.botEnd == "floor") {
        stringerOffset_y = stringerParams.botFloorsDist;
    }

    // константы
    stringerParams.holeRad = 6.5;            // радиус (диаметра) отверстий в тетивах
    stringerParams.holeRutelRad = 9;		 // радиус отверстий под рутели в тетиве
    stringerParams.stepHoleX1 = 45;          // координата Х первого отверстия крепления уголка ступени относительно угла косоура
    stringerParams.holeDistU2_230 = 180;     // расстояние между отверстиями для уголка У2-230
    stringerParams.holeDistU2_200 = 150;     // расстояние между отверстиями для уголка У2-200
    stringerParams.holeDistU2_160 = 110;     // расстояние между отверстиями для уголка У2-160
    stringerParams.stepHoleY = -65;          // координата Y отверстий крепления уголка ступени
    stringerParams.stringerWidth = 150;      // ширина тетивы
    stringerParams.rad1 = 10.0;              // Радиус скругления внешних углов
    stringerParams.rad2 = 5.0;               // Радиус скругления внутренних углов
    stringerParams.stairAngle1 = Math.atan(stringerParams.h / stringerParams.b);   // вычисляем угол наклона лестницы

    if (stringerParams.stairFrame == "есть" &&
        (stringerParams.stairType == "рифленая сталь" || stringerParams.stairType == "рифленый алюминий" ||
            stringerParams.stairType == "дпк")) {
        stringerParams.stringerWidth150 = 5.0 + stringerParams.treadThickness + 60.0 + 100.0 + 5.0;
    }
    else {
        stringerParams.stringerWidth150 = 150.0;
    }

    if (stringerParams.stringerType == "ломаная") stringerParams.stringerWidth = 180;
    if (stringerParams.stringerType == "прямая") stringerParams.stringerWidth = 320;

    // установки размеров под уголки
    setStairAngles(stringerParams);
    // уголки и рамки
    if (stringerParams.stairFrame == "есть") {
        stringerParams.stepHoleX1 = marshFramesParams.sideHolePosX + 5.0 + marshFramesParams.overhang;
        stringerParams.holeDist = stringerParams.a - (marshFramesParams.overhang + marshFramesParams.overhang + marshFramesParams.sideHolePosX + marshFramesParams.sideHolePosX);
        stringerParams.holeDist2 = stringerParams.holeDist;
        stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0);      // координата Y отверстий крепления рамки
    }

    // тетива
    stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };
    stringerParams.divide = 0;

    // НИЗ

    var holes = stringerParams.stringerShape.holes;
    var hole1, hole2, hole3, hole4;

    var p0 = copyPoint(stringerParams.p0);

    // подъем
    var h_1 = stringerParams.h + 5;            // высота первого подъема
    if (stringerParams.botFloorType === "черновой") {
        h_1 = h_1 + stringerParams.botFloorsDist;
    }
    if (stringerParams.bottomAngleType === "регулируемая опора") {
        var h_1 = h_1 - 20;
        p0 = newPoint_xy(p0, 0.0, 20);
    }


    var p1 = newPoint_xy(p0, 0.0, h_1);
    var p1_1 = newPoint_xy(p0, stringerParams.rad1, h_1);
    var p2 = newPoint_xy(p1_1, stringerParams.b - stringerParams.rad1, 0.0);
    var p3 = newPoint_xy(p0, 0.0, h_1 - stringerParams.rad1);
    var p4 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    var pStartTop = newPoint_xy(p1, 0.0, -stringerParams.h);
    // срез передней кромки
    var p11 = newPoint_xy(p0, 0.0, 100.0);
    var p12 = polar(p11, Math.PI * (5.0 / 3.0), 30.0);
    var fil1 = fillet(p12, Math.PI * (2.0 / 3.0), p3, Math.PI * 1.5, stringerParams.rad1);

    // нижний край тетивы
    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    if (stringerParams.stringerType == "прямая") {
        var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    }

    var p00 = polar(p0, 0.0, 100.0);                         // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);       // точка пересчечения нижнего края и нижней линии марша
    var bottomLineP2 = itercection(p0, p00, p11, p12); //точка пересечения переднего среза и нижней линии

    if (stringerParams.stringerType == "ломаная") {
        bottomLineP1 = newPoint_xy(p0, stringerParams.b + stringerParams.stringerWidth, 0.0);
    }
    var fil2 = fillet(bottomLineP1, Math.PI, p11, Math.PI * (5.0 / 3.0), stringerParams.rad1);

    //скругление левого нижнего угла
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);

    // срез передней кромки
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil1.start, stringerParams.dxfBasePoint);

    //скругление стыка среза и левой вертикальной кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);

    stringerParams.bottomLineP1 = bottomLineP1;

    // подъем
    if (stringerParams.stringerType == "пилообразная" || stringerParams.stringerType == "ломаная") {
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1_1, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
    }
    if (stringerParams.stringerType == "прямая") {
        var p31 = polar(p1, stringerParams.stairAngle1, 100.0);
        var fil3 = fillet(p0, Math.PI * 0.5, p31, stringerParams.stairAngle1 + Math.PI, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil3.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);

        var p_t1 = newPoint_xy(p1, stringerParams.b * (stringerParams.stairAmt - 1), stringerParams.h * (stringerParams.stairAmt - 1));
        var p_t2 = newPoint_xy(p_t1, stringerParams.b, 0.0);
        var fil_t1 = fillet(p1, stringerParams.stairAngle1, p_t2, Math.PI, stringerParams.rad1);

        stringerParams.p_t1 = p_t1;
        stringerParams.topLineP2 = fil3.end
        stringerParams.fil_t1 = fil_t1;
    }

    // отверстия под нижний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(bottomLineP2, 40.0, 35.0);
    if (stringerParams.stringerType == "ломаная") center1 = newPoint_xy(p0, 100.0, 35.0);
    center2 = newPoint_xy(center1, 60.0, 0.0);
    if (params.bottomAngleType === "регулируемая опора") {
        center1 = newPoint_xy(bottomLineP2, 40.0, 50.0);
        center2 = newPoint_xy(center1, 60.0, 0.0);
    }
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 35.0 };
    if (params.bottomAngleType === "регулируемая опора") stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 30.0 };
    holes.push(hole1);
    holes.push(hole2);

    var pstart = fil2.start;
    var pstartang = 0.0;

    // ВЕРХ

    var p1 = copyPoint(pStartTop);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    var ph = copyPoint(p2);

    // подъем ступени
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);

    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, stringerParams.topEndLength - stringerParams.rad1, 0.0);
    var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    var pc3 = copyPoint(p2);

    botLineP1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth150);
    //зазор для проверки модели
    p2 = newPoint_xy(p2, -params.carcasPartsSpacing, 0.0);
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150);
    var pn2 = newPoint_xy(p1, 0.0, -p1.y);
    if (params.bottomAngleType === "регулируемая опора") {
        p2 = newPoint_xy(p2, 0.0, pstart.y - p2.y);
        pn2 = newPoint_xy(p1, 0.0, -p1.y);
    }
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    if (params.bottomAngleType != "регулируемая опора") {
        var pn1 = newPoint_xy(p2, -60.0, 0.0);
        var fil1 = fillet(pn1, Math.PI * 4 / 3, pstart, 0, stringerParams.rad1);
        var fil2 = fillet(fil1.start, Math.PI / 3, p2, Math.PI, stringerParams.rad2);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil2.end, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad2, fil2.angend, fil2.angstart, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.start, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, pstart, stringerParams.dxfBasePoint);
    }
    // низ
    if (params.bottomAngleType == "регулируемая опора") addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, pstart, stringerParams.dxfBasePoint);

    // отверстия

    if (stringerParams.stairFrame == "нет") {
        // отверстия под перемычку 1
        // и под уголок крепления верхнего марша
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 73.0, -65.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));

        // отверстия под уголок ступени 1
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 230.0, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push("У2-40х40х200");
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под перемычку 2
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, ((stringerParams.topEndLength * 0.5) + 48.0), -65.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));
        var pCentralHoles = copyPoint(center1);
        // отверстия под уголок ступени 2
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, 120.0, 0.0);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push("У2-40х40х200");
        holes.push(hole1);
        holes.push(hole2);
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под нижний крепежный уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(pn2, -200, 35.0);
        center2 = newPoint_xy(center1, 60.0, 0.0);
        if (params.bottomAngleType === "регулируемая опора") {
            center1 = newPoint_xy(p2, -200, 50.0);
            center2 = newPoint_xy(center1, 60.0, 0.0);
        }
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[1] = { "x": center1.x - 20.0, "y": center1.y - 35.0 };
        if (params.bottomAngleType === "регулируемая опора") stringerParams.elmIns[key].angleB[1] = { "x": center1.x - 20.0, "y": center1.y - 30.0 };
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под уголок крепления верхнего марша
        if (key == "in" && !stringerParams.stringerLast) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, 73.0, 85.0 - stringerParams.stringerWidth150);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }
        var pCentralHoles = newPoint_xy(ph, stringerParams.platformLength * 0.5, stringerParams.stepHoleY);
        // отверстия под рамки под площадкой
        var begX = topplatformFramesParams.overhang + 5.0 + topplatformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < topplatformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, topplatformFramesParams.width - topplatformFramesParams.sideHolePosX - topplatformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX += topplatformFramesParams.width + 5.0;
        }
    }

    // отверстия под задний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(botLineP1, -30.0, 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    if (stringerParams.isStright2Marsh && !stringerParams.stringerLast) {
        // ещё два отверстия для фланца
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, -45.0, 0.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.flanPointInsert2 = newPoint_xy(center1, -20.0, 20.0);
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (!(!stringerParams.stringerLast && key == "in")) {
                // отверстия под стойку 1
                center1 = newPoint_xy(ph, stringerParams.b * 0.5 + 65, stringerParams.stepHoleY);
                if (!stringerParams.platformTopRailing) center1 = newPoint_xy(center1, -65, 0);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под средние стойки
                if (stringerParams.platformLength > 1300 && stringerParams.platformTopRailing) {
                    var middleRackAmt = Math.round(stringerParams.platformLength / 800) - 1;
                    if (middleRackAmt < 0) middleRackAmt = 0;
                    var rackDist = (stringerParams.platformLength - 200) / (middleRackAmt + 1);
                    var racksMiddle = [];
                    for (var i = 1; i <= middleRackAmt; i++) {
                        var center11 = newPoint_xy(center1, rackDist * i, 0);
                        var center12 = newPoint_xy(center11, 0.0, -60.0);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        racksMiddle.push({ "x": center11.x, "y": center11.y });
                    }
                    var number = stringerParams.elmIns[key].racks.length - 1;
                    stringerParams.elmIns[key].racks[number].racksMiddle = racksMiddle;
                }


                // отверстия под стойку 2
                if (stringerParams.platformTopRailing) {
                    //добавляем отверстия под стойку 1
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            } else {
                center1 = center2 = 0;
            }
        }
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            if (!(!stringerParams.stringerLast && key == "in") || stringerParams.straight) {
                // отверстия под последнее стекло марша

                if (stringerParams.platformTopRailing) {
                    // отверстия под стойку 1
                    var glassSectionLength = stringerParams.platformLength - stringerParams.b;
                    center1 = newPoint_xy(pc2, 450, stringerParams.stepHoleY + (pc3.y - pc2.y));
                    center2 = newPoint_xy(center1, 0.0, -60);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc2, stringerParams.b + 100, stringerParams.stepHoleY + (pc3.y - pc2.y));
                        center2 = newPoint_xy(center1, 0.0, -60);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    if (glassSectionLength > 1000) {
                        // первое среднее
                        center1 = newPoint_xy(pCentralHoles, -60, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                        // второе среднее
                        center1 = newPoint_xy(center1, /*stringerParams.b*/ 120, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    }
                    // отверстия под стойку 2
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc3, -60 - 5 - 30 - 60, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            }
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            if (!(!stringerParams.stringerLast && key == "in")) {
                // отверстия под стойку
                pc2 = newPoint_xy(pc2, 0, stringerParams.rad1);
                hole1 = new THREE.Path();
                hole2 = new THREE.Path();
                center1 = newPoint_xy(pc2, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под стойку 2
                if (stringerParams.platformTopRailing) {
                    hole1 = new THREE.Path();
                    hole2 = new THREE.Path();
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            } else {
                center1 = center2 = 0;
            }
        }

        if (center1 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);

        //выноска
        var text = "Стойки";
        if (stringerParams.railingModel == "Самонесущее стекло") text = "Рутели";
        var textHeight = 20;
        var offsetLeft = 200;
        var offsetTop = 100;
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center1, stringerParams.dxfBasePoint)
        if (center1) addLeader(text, textHeight, offsetLeft, offsetTop, dxfPrimitivesArr, center2, stringerParams.dxfBasePoint)

    }

    stringerParams.dxfBasePoint.x += stringerParams.b * stringerParams.stairAmt + stringerParams.dxfBasePointStep;
    if (stringerParams.topEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.topEndLength;

    return stringerParams;
}

/**
 * тетива нижнего марша если в нижнем марше 0 ступеней
 * Г-образная лестница с забегом
 */
function drawStringerLt_0Bot_WndG(stringerParams, turnFramesParams, botplatformFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;


    var p0 = copyPoint(stringerParams.p0);

    var topLineStringerProtrusion = 0;
    if (key == "in" && stringerParams.h >= 235)
        topLineStringerProtrusion = 30;

    // подъем
    var h_1 = stringerParams.h + 5 + topLineStringerProtrusion;            // высота первого подъема
    if (stringerParams.botFloorType === "черновой") {
        h_1 = h_1 + stringerParams.botFloorsDist;
    }
    if (stringerParams.bottomAngleType === "регулируемая опора") {
        var h_1 = h_1 - 20;
        p0 = newPoint_xy(p0, 0.0, 20);
    }


    var p1 = newPoint_xy(p0, 0.0, h_1);
    var p1_1 = newPoint_xy(p0, stringerParams.rad1, h_1);
    var p2 = newPoint_xy(p1_1, stringerParams.b - stringerParams.rad1, 0.0);
    var p3 = newPoint_xy(p0, 0.0, h_1 - stringerParams.rad1);
    var p4 = newPoint_xy(p3, stringerParams.rad1, 0.0);

    // срез передней кромки
    var p11 = newPoint_xy(p0, 0.0, 100.0);
    var p12 = polar(p11, Math.PI * (5.0 / 3.0), 30.0);
    var fil1 = fillet(p12, Math.PI * (2.0 / 3.0), p3, Math.PI * 1.5, stringerParams.rad1);

    // нижний край тетивы
    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    if (stringerParams.stringerType == "прямая") {
        var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    }

    var p00 = polar(p0, 0.0, 100.0);                         // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);       // точка пересчечения нижнего края и нижней линии марша
    var bottomLineP2 = itercection(p0, p00, p11, p12); //точка пересечения переднего среза и нижней линии

    if (stringerParams.stringerType == "ломаная") {
        bottomLineP1 = newPoint_xy(p0, stringerParams.b + stringerParams.stringerWidth, 0.0);
    }
    var fil2 = fillet(bottomLineP1, Math.PI, p11, Math.PI * (5.0 / 3.0), stringerParams.rad1);

    //скругление левого нижнего угла
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);

    // срез передней кромки
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil1.start, stringerParams.dxfBasePoint);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, p0, stringerParams.dxfBasePoint);

    //скругление стыка среза и левой вертикальной кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);

    stringerParams.bottomLineP1 = bottomLineP1;

    // подъем
    if (stringerParams.stringerType == "пилообразная" || stringerParams.stringerType == "ломаная") {
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1_1, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
    }
    if (stringerParams.stringerType == "прямая") {
        var p31 = polar(p1, stringerParams.stairAngle1, 100.0);
        var fil3 = fillet(p0, Math.PI * 0.5, p31, stringerParams.stairAngle1 + Math.PI, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil3.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);

        var p_t1 = newPoint_xy(p1, stringerParams.b * (stringerParams.stairAmt - 1), stringerParams.h * (stringerParams.stairAmt - 1));
        var p_t2 = newPoint_xy(p_t1, stringerParams.b, 0.0);
        var fil_t1 = fillet(p1, stringerParams.stairAngle1, p_t2, Math.PI, stringerParams.rad1);

        stringerParams.p_t1 = p_t1;
        stringerParams.topLineP2 = fil3.end
        stringerParams.fil_t1 = fil_t1;
    }

    // отверстия под нижний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    bottomLineP2 = newPoint_xy(bottomLineP2, 35.0, 0);
    if (stringerParams.stairFrame == "есть") bottomLineP2 = newPoint_xy(bottomLineP2, 35.0, 0);
    center1 = newPoint_xy(bottomLineP2, 40.0, 35.0);
    if (stringerParams.stringerType == "ломаная") center1 = newPoint_xy(p0, 100.0, 35.0);
    center2 = newPoint_xy(center1, 60.0, 0.0);
    if (params.bottomAngleType === "регулируемая опора") {
        center1 = newPoint_xy(bottomLineP2, 40.0, 50.0);
        center2 = newPoint_xy(center1, 60.0, 0.0);
    }
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 35.0 };
    if (params.bottomAngleType === "регулируемая опора") stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 30.0 };
    holes.push(hole1);
    holes.push(hole2);

    stringerParams.pstart = fil2.start;
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = p1_1;

}

/**
 * тетива верхнего марша если в верхнем марше 0 ступеней
 * Г-образная лестница с забегом
 */
function drawStringerLt_0Top_WndGOut(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    p0 = newPoint_xy(p0, 0.0, -stringerParams.h1 - stringerParams.h);


    if (stringerParams.stairFrame == "есть") {
        //константы
        var topLineStringerProtrusion = 0;
        var stringerProtrusionEdge = 5;					// выступ тетивы за край степени
        var profileHeight = 40;							// высота профиля в рамках
        var angleHoleDistance = 60;						// расстояние между отверстиями в уголках
        var angelLenght = 20 + angleHoleDistance + 20;	// длина уголка
        var angleClearance = 5;							// зазор между уголками
        //var wndBottomAngle = 20 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        var wndBottomAngle = 15 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        //var treadSideOffset = 5;						// зазор между тетивой и ступенью
        var treadSideOffset = stringerParams.treadSideOffset;						// зазор между тетивой и ступенью


        var stringerBackLineLenght = stringerProtrusionEdge + stringerParams.treadThickness + profileHeight + angleClearance + angelLenght + angleClearance + angelLenght + angleClearance;		// длинна задней вертикальной линии тетивы

        var holeCoordY3 = -stringerParams.h - 5 - stringerParams.treadThickness - 20;		// координата y для отверстий второй забежной ступени
        var holeCoordY2 = -5 - stringerParams.treadThickness - 20;		// координата y для отверстий второй забежной ступени
        var holeCoordX2 = stringerParams.stringerThickness + turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_2.x1;
        var holeCoordX2_1 = turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y1;
        var holeCoordX2_2 = turnFramesParams.params.frameParams2.frameDimensions.x - turnFramesParams.params.frameParams2.frameDimensions.z - holeCoordX2_1 - turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y2;

        //var holeCoordX3_1 = 5 + turnStepsParams.params[3].stepWidthLow - 10 - turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3top_2.y2;
        if (!turnFramesParams.params.frameParams6) {
            var holeCoordX3_1 = 35 - turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3top_2.y2;
            var holeCoordX3_2 = 35 -
                (turnFramesParams.params.frameParams3.frameDimensions.z - 80) +
                turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3top_2.y1;
        } else {
            var holeCoordX3_1 = 35 - turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y2;
            var holeCoordX3_2 = 35 -
                (turnFramesParams.params.frameParams6.frameDimensions.z - 80) +
                turnFramesParams.params.frameParams6.holesCoordinates.holesCoordinates3top_2.y1;
        }
        //var holeCoordX3_2 = 5 + turnStepsParams.params[3].stepWidthLow - 10 - (turnFramesParams.params.frameParams3.frameDimensions.z - 80) + turnFramesParams.params.frameParams3.holesCoordinates.holesCoordinates3top_2.y1;


        var turnStepLength3 = 5 + turnStepsParams.params[3].stepWidthLow - turnStepsParams.params[3].stepWidthHi - 5;			// длина третьей проступи забежного участка
        if (turnStepsParams.params[6])
            stringerParams.turnStepLength3 = turnStepsParams.params[6].stepWidthHi;
        else
            stringerParams.turnStepLength3 = turnStepsParams.params[3].stepWidthHi;

        // точки
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 3 + (stringerParams.h1 - stringerParams.h) + 5);
        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p1 = newPoint_xy(p4, 0, -stringerParams.h);
        var pCentralHoles = copyPoint(p1);
        var p11 = newPoint_xy(p1, 0, stringerParams.rad2);
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p_1 = newPoint_xy(pc1, 0, -stringerParams.rad2);
        var p_2 = newPoint_xy(p_1, turnStepLength3 + stringerParams.rad2 + stringerParams.rad1, 0);
        var p2 = newPoint_xy(p_2, -stringerParams.rad2 + stringerParams.turnStepLength3, 0);

        var pc_1 = newPoint_xy(p_2, 0.0, -stringerParams.rad1);
        var p_3 = newPoint_xy(p_2, -stringerParams.rad1, -stringerParams.h + stringerParams.rad2);
        var p_4 = newPoint_xy(pc_1, -stringerParams.rad1, 0.0);
        var pc_2 = newPoint_xy(p_3, -stringerParams.rad2, 0.0);
        var p_5 = newPoint_xy(pc_2, 0.0, -stringerParams.rad2);
        var p_6 = newPoint_xy(p_5, -stringerParams.M - turnStepLength3 + 5, 0.0);	// p_6 - опорная точка для отрисовки отверстий под уголки
        var topLineP1 = copyPoint(p_6); //опорная точка для отрисовки отверстий под уголки
        p_6 = newPoint_xy(p_6, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
        /*if (stringerParams.stairAmt == 0) {
    		p_6 = newPoint_xy(p_6, 5, 0.0);
    	}*/
        var p_7 = newPoint_xy(p_6, 0.0, -stringerBackLineLenght);			//передняя линия
        var p_8 = newPoint_xy(p_7, 0.15 * stringerParams.M, 0.0);							// 0.15*stringerParams.M - длина нижней горизотральной линии тетивы (значение в модели 123.185)
        var pc_3 = newPoint_xy(p_8, 0.0, stringerParams.rad1);
        if (stringerParams.stairAmt != 0) {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, 1.5 * Math.PI + wndBottomAngle, Math.PI * 1.5, stringerParams.dxfBasePoint);
        }
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_8, p_7, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_7, p_6, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_6, p_5, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_3, p_4, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        var pnext = copyPoint(p_2);
        if (stringerParams.topEnd == "platformG") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_2, p_1, stringerParams.dxfBasePoint);
            var pnext = copyPoint(p_1);
            //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
            //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p41, stringerParams.dxfBasePoint);
        }
        //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_2, p_1, stringerParams.dxfBasePoint);
        //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p41, stringerParams.dxfBasePoint);

        //var pstart = polar(pc_3, 1.5 * Math.PI + wndBottomAngle, stringerParams.rad1);	// точка для привязки нижней линии
        pstart = copyPoint(p_8);


        //var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);



        //var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);

        //addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        //// подъем
        //if (stringerParams.stairAmt > 1) {
        //    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);
        //}
        p1 = newPoint_xy(p_2, -stringerParams.rad1, 0.0);

        // отверстия под уголок/рамку ступени
        //if (stringerParams.stairAmt != 0) {
        //    hole1 = new THREE.Path();
        //    hole2 = new THREE.Path();
        //    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        //    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
        //    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        //    stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
        //    holes.push(hole1);
        //    holes.push(hole2);
        //}

        // отверстия под нижние крепежные уголки
        // первый уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_7, 30 + stringerParams.stringerThickness, 25.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
        // второй уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center2, 0.0, 45.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[1] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        center1 = newPoint_xy(p_6, holeCoordX2, holeCoordY2);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        // третья забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p4, holeCoordX3_1, holeCoordY3);
        center2 = newPoint_xy(p4, holeCoordX3_2, holeCoordY3);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        stringerParams.pstart = pstart;
        //stringerParams.pstartang = Math.PI / 9;
        stringerParams.pstartang = wndBottomAngle;
        stringerParams.p2 = pnext;
    }


    if (stringerParams.stairFrame == "нет") {
        //константы
        var topLineStringerProtrusion = 0;
        var stringerProtrusionEdge = 5;					// выступ тетивы за край ступени
        var angleHeight = 40;							// высота профиля в рамках
        var angleHoleDistance = 60;						// расстояние между отверстиями в уголках
        var angleLenght = 20 + angleHoleDistance + 20;	// длина уголка
        var angleClearance = 5;							// зазор между уголками
        //var wndBottomAngle = 20 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью
        var wndBottomAngle = 15 * Math.PI / 180;			// угол нижней линии тетивы под забежной частью

        var stringerBackLineLenght = stringerProtrusionEdge + stringerParams.treadThickness + angleHeight + angleClearance + angleLenght + angleClearance + angleLenght + angleClearance;		// длинна задней вертикальной линии тетивы

        var turnStepLength3 = turnStepsParams.params[3].stepWidthHi - turnStepsParams.params[3].stepWidthLow + stringerParams.stringerThickness;// длина  проступи третьей забежной ступени
        var turnStepLength2 = stringerParams.M - turnStepLength3 - 5 - stringerParams.stringerThickness;// длина проступи второй забежной ступени
        if (turnStepsParams.params[6])
            stringerParams.turnStepLength3 = turnStepsParams.params[6].stepWidthHi + stringerParams.stringerThickness;
        else
            stringerParams.turnStepLength3 = turnStepsParams.params[3].stepWidthHi + stringerParams.stringerThickness;

        var angleHoleY = 20;
        var angleLenghtWnd = turnStepsParams.angles.params.angleLength;	// длина уголка для забежных ступеней


        // точки
        //
        //console.log(stringerParams.h, stringerParams.h1)
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 2 + stringerParams.h1 + 5);
        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p1 = newPoint_xy(p4, 0, -stringerParams.h);
        var pCentralHoles = copyPoint(p1);
        var p11 = newPoint_xy(p1, 0, stringerParams.rad2);
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        var p_1 = newPoint_xy(pc1, 0, -stringerParams.rad2);
        var p_2 = newPoint_xy(p_1, -turnStepLength3 + stringerParams.rad2 + stringerParams.rad1, 0);//угол 3 забежной ступени
        var p2 = newPoint_xy(p_2, -stringerParams.rad2 + stringerParams.turnStepLength3, 0);

        var pc_1 = newPoint_xy(p_2, 0.0, -stringerParams.rad1);
        var p_3 = newPoint_xy(p_2, -stringerParams.rad1, -stringerParams.h + stringerParams.rad2);
        var p_4 = newPoint_xy(pc_1, -stringerParams.rad1, 0.0);
        var pc_2 = newPoint_xy(p_3, -stringerParams.rad2, 0.0);
        var p_5 = newPoint_xy(pc_2, 0.0, -stringerParams.rad2); //дальний угол 2 забежной ступени
        var p_6 = newPoint_xy(p_5, -turnStepLength2, 0.0);	// верхний угол тетивы
        var topLineP1 = copyPoint(p_6); //опорная точка для отрисовки отверстий под уголки
        p_6 = newPoint_xy(p_6, params.carcasPartsSpacing, 0.0); //зазор для проверки модели
        var p_7 = newPoint_xy(p_6, 0.0, -stringerBackLineLenght);			//передняя линия
        var p_8 = newPoint_xy(p_7, 0.15 * stringerParams.M, 0.0);				// 0.15*stringerParams.M - длина нижней горизотральной линии тетивы (значение в модели 123.185)
        var pc_3 = newPoint_xy(p_8, 0.0, stringerParams.rad1);
        if (stringerParams.stairAmt != 0) {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_3, stringerParams.rad1, 1.5 * Math.PI + wndBottomAngle, Math.PI * 1.5, stringerParams.dxfBasePoint);
        }

        //нижняя горизонтальная линия
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_8, p_7, stringerParams.dxfBasePoint);
        //левая вертикальная линия
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_7, p_6, stringerParams.dxfBasePoint);// подъем на 2-ую
        //первая забежная проступь
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_6, p_5, stringerParams.dxfBasePoint);// проступь 2-ая
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2, stringerParams.dxfBasePoint);
        //подъем
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_3, p_4, stringerParams.dxfBasePoint);// подъем на 3-ую
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc_1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        var pnext = copyPoint(p_2);
        if (stringerParams.topEnd == "platformG") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p_2, p_1, stringerParams.dxfBasePoint);
            var pnext = copyPoint(p_1);
        }

        pstart = copyPoint(p_8);

        p1 = copyPoint(p4);

        // отверстия под нижние крепежные уголки
        // первый уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(topLineP1, 30, 25.0 - stringerBackLineLenght);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
        // второй уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center2, 0.0, 45.0);
        center2 = newPoint_xy(center1, 0.0, 60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[1] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);

        var xOfssetCenterAngle = angleLenghtWnd / 2 - 25;
        var pWnd = newPoint_xy(p0, -stringerParams.stringerThickness - stringerParams.treadSideOffset, -stringerParams.treadThickness - angleHoleY + (stringerParams.h1 - stringerParams.h));
        var anglParam = turnStepsParams.angles.params;
        var tFr = turnStepsParams.turnFactor;

        //todo: anglParam.a2_2.y anglParam.a3_1.y anglParam.a3_2.y
        var p_wnd2_2 = newPoint_xy(pWnd, tFr * (anglParam.a2_2.x), stringerParams.h);    // опорная точка для отверстий уголка второй забежной ступени
        var p_wnd3_1 = newPoint_xy(pWnd, tFr * (anglParam.a3_1.x), stringerParams.h * 2);// опорная точка для отверстий первого уголка третьей забежной ступени
        var p_wnd3_2 = newPoint_xy(pWnd, tFr * (anglParam.a3_2.x), stringerParams.h * 2);// опорная точка для отверстий первого уголка третьей забежной ступени

        if (turnStepsParams.params[6])
            var p_wnd3_1 = newPoint_xy(pWnd, tFr * (anglParam.a6_1.z + 144), stringerParams.h * 2);// опорная точка для отверстий первого уголка третьей забежной ступени

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_wnd2_2, xOfssetCenterAngle, 0);
        center2 = newPoint_xy(p_wnd2_2, -xOfssetCenterAngle, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // третья забежная ступень
        // первый уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_wnd3_1, xOfssetCenterAngle, 0);
        center2 = newPoint_xy(p_wnd3_1, -xOfssetCenterAngle, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // второй уголок
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p_wnd3_2, xOfssetCenterAngle, 0);//xOfssetCenterAngle
        center2 = newPoint_xy(p_wnd3_2, -xOfssetCenterAngle, 0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        stringerParams.pstart = pstart;
        //stringerParams.pstartang = Math.PI / 9;
        stringerParams.pstartang = wndBottomAngle;
        stringerParams.p2 = pnext;
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            // отверстия под стойку 1
            center1 = newPoint_xy(topLineP1, 60 + 15 + stringerParams.stringerThickness, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            if (stringerParams.topEnd != "platformG") {
                //добавляем отверстия под стойку 1
                addRoundHole(stringerParams.stringerShape,
                    dxfPrimitivesArr,
                    center1,
                    stringerParams.holeRad,
                    stringerParams.dxfBasePoint)
                addRoundHole(stringerParams.stringerShape,
                    dxfPrimitivesArr,
                    center2,
                    stringerParams.holeRad,
                    stringerParams.dxfBasePoint)

                // отверстия под стойку 2
                center1 = newPoint_xy(p2, -98, stringerParams.stepHoleY);
                if (stringerParams.stairAmt === 0)
                    center1 = newPoint_xy(p_2, (p1.x - p_2.x) * 0.5, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                if (stringerParams.stairFrame == "нет") {
                    center1 = 0;
                }
            }
        }
        /*if (stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            // отверстия под стойку 1
            center1 = newPoint_xy(p_6, 60 + 15 + stringerParams.stringerThickness, -110);
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            // отверстия под стойку 2
            if (stringerParams.stairAmt < 10) {
                var holeXDim = stringerParams.stringerWidth / Math.cos(stringerParams.stairAngle1);
                center1 = newPoint_xy(pc1, -holeXDim / Math.tan(stringerParams.stairAngle1) + stringerParams.rad2, -holeXDim - stringerParams.rad2 + 80);
            }
            else {
                var holeXDim = 80 / Math.cos(stringerParams.stairAngle1);
                center1 = newPoint_xy(pc1, -holeXDim / Math.tan(stringerParams.stairAngle1) + stringerParams.rad2, -holeXDim - stringerParams.rad2);
            }
            if (stringerParams.text == "забежный") {
                center1 = newPoint_xy(pCentralHoles, -120, -110);
            }
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            // отверстия под стойку 3 (на ступени)
            center1 = newPoint_xy(p4, stringerParams.b * 0.5 + stringerParams.rad1, -110);
            //center2 = newPoint_xy(center1, 0.0, -120.0);
            center2 = newPoint_xy(center1, 0.0, -100.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

        }
        if (stringerParams.railingModel == "Кованые балясины") {
            // отверстия под стойку 1
            center1 = newPoint_xy(topLineP1, 60 + 5 + 30 + stringerParams.stringerThickness, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

            //добавляем отверстия под стойку 1
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint)

            // отверстия под стойку 2
            if (stringerParams.stairAmt == 0) {
                center1 = center2 = 0;
            }
            else {
                center1 = newPoint_xy(p4, stringerParams.b * 0.5, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }

        if (center1 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint)
        if (center2 != 0) addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint)
    }
}

/**
 * тетива верхнего марша если в верхнем марше 0 ступеней
 * Г-образная лестница с забегом
 */
function drawStringerLt_0Top_WndGIn(stringerParams, turnFramesParams, botplatformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    p0 = newPoint_xy(p0, 0.0, -stringerParams.h1 - stringerParams.h);
    var h = 0;
    if (stringerParams.h1 < 235 && stringerParams.stairAmt1 == 0) {
        h = 235 - stringerParams.h1;
        p0 = newPoint_xy(p0, 0.0, h);
    }
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели

    if (stringerParams.stairFrame == "есть") {
        var profileHeight = 40;
        var treadSideOffset = stringerParams.treadSideOffset;						// зазор между тетивой и ступенью
        var holeCoordY2 = stringerParams.h - stringerParams.treadThickness - profileHeight / 2 + (stringerParams.h1 - stringerParams.h) - h;		// координата y для отверстий второй забежной ступени
        var holeCoordX2_1 = turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y1;
        var holeCoordX2_2 = turnFramesParams.params.frameParams2.frameDimensions.x - turnFramesParams.params.frameParams2.frameDimensions.z - holeCoordX2_1 - turnFramesParams.params.frameParams2.holesCoordinates.holesCoordinates2_1.y2;
        var holeCoordY3 = holeCoordY2 + stringerParams.h;

        if (turnStepsParams.params[6])
            stringerParams.turnStepLength3 = turnStepsParams.params[6].stepWidthLow;
        else
            stringerParams.turnStepLength3 = turnStepsParams.params[3].stepWidthLow;

        var holeCoordX3_1 = 5 + turnStepsParams.params[3].stepWidthLow - 10 + 20;
        var holeCoordX3_1 = 55;


        var holeCoordX3_2 = 40;

        // точки
        var p2 = newPoint_xy(p0, 0.0, -(stringerParams.treadThickness + 20 + 45 + 60 + 25) + (stringerParams.h1 - stringerParams.h));
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 2 + (stringerParams.h1 - stringerParams.h) + 5 - h);

        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
        var p5 = newPoint_xy(p5, -params.carcasPartsSpacing, 0.0);//уменьшить длину если есть зазор для проверки модели
        var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
        var p3 = newPoint_xy(p2, 50, 0.0);
        var pc = newPoint_xy(p3, 0.0, stringerParams.rad1);
        var pstart = polar(pc, 2 * Math.PI - Math.PI / 18, stringerParams.rad1);	// точка для привязки нижней линии

        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 2 * Math.PI - Math.PI / 18, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p0, stringerParams.dxfBasePoint);

        if (stringerParams.topEnd == "platformG" || stringerParams.topEnd == "winder") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p4, stringerParams.dxfBasePoint);
            var pnext = copyPoint(p4);
        } else {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape,
                dxfPrimitivesArr,
                p4c,
                stringerParams.rad1,
                Math.PI,
                Math.PI * 0.5,
                stringerParams.dxfBasePoint);

            pnext = copyPoint(p42);
        }




        p1 = copyPoint(p4);


        // отверстия под нижние крепежные уголки
        // первый уголок
        if (h != 0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p2, 30.0, 70 - h);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        } else {
            // первый уголок
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p2, 30.0, 25.0);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
            // второй уголок
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p2, 30.0, 130.0);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[1] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX2_1, holeCoordY2);
        center2 = newPoint_xy(center1, holeCoordX2_2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // третья забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX3_1, holeCoordY3);
        center2 = newPoint_xy(center1, holeCoordX3_2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);

        stringerParams.pstart = pstart;
        if (stringerParams.stairAmt == 0) {
            stringerParams.pstart = pc;
        }
        stringerParams.pstartang = Math.PI / 2 - Math.PI / 18;
        stringerParams.p2 = pnext;
    } //end of stringerParams.stairFrame == "есть"


    if (stringerParams.stairFrame == "нет") {
        var angleHeight = 40;
        var holeCoordY2 = stringerParams.h - stringerParams.treadThickness - angleHeight / 2 + (stringerParams.h1 - stringerParams.h) - h; // координата y для отверстий второй забежной ступени
        var holeCoordX2_1 = turnStepsParams.angles.params.a2_Wnd.x - 8 - 5 - 25;
        var holeCoordX2_2 = holeCoordX2_1 + 50;
        var holeCoordY3 = holeCoordY2 + stringerParams.h;

        if (turnStepsParams.params[6])
            stringerParams.turnStepLength3 = turnStepsParams.params[6].stepWidthLow;
        else
            stringerParams.turnStepLength3 = turnStepsParams.params[3].stepWidthLow;

        // точки
        var p2 = newPoint_xy(p0, 0.0, -(stringerParams.treadThickness + 20 + 55 + 60 + 25 + 5) + (stringerParams.h1 - stringerParams.h));
        var p4 = newPoint_xy(p0, 0, stringerParams.h * 2 + (stringerParams.h1 - stringerParams.h) + 5 - h);
        var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
        var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
        var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
        var p5 = newPoint_xy(p5, -params.carcasPartsSpacing, 0.0);//уменьшить длину если есть зазор для проверки модели
        var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
        var p3 = newPoint_xy(p2, 50, 0.0);
        var pc = newPoint_xy(p3, 0.0, stringerParams.rad1);
        var pstart = polar(pc, 0, stringerParams.rad1);	// точка для привязки нижней линии

        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc, stringerParams.rad1, 2 * Math.PI - Math.PI / 18, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p0, stringerParams.dxfBasePoint);
        if (stringerParams.topEnd != "platformG" && stringerParams.topEnd != "winder") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p41, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape,
                dxfPrimitivesArr,
                p4c,
                stringerParams.rad1,
                Math.PI,
                Math.PI * 0.5,
                stringerParams.dxfBasePoint);
        }
        pnext = copyPoint(p42);
        if (stringerParams.topEnd == "platformG" || stringerParams.topEnd == "winder") {
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p4, stringerParams.dxfBasePoint);
            var pnext = copyPoint(p4);
        }

        p1 = copyPoint(p4);


        /*отверстия под уголки соединения тетив*/

        var pH = newPoint_xy(p0, 0.0, -(stringerParams.treadThickness + 20) + (stringerParams.h1 - stringerParams.h));
        if (h != 0) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(pH, 30.0, -h);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 30.0, "y": center1.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        } else {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(pH, 30.0, 0);
            center2 = newPoint_xy(center1, 0.0, 60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
            // второй уголок
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(center1, 0.0, -60.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].angleB[1] = { "x": center1.x - 30.0, "y": center1.y + 20.0 };
            holes.push(hole1);
            holes.push(hole2);
        }
        //console.log(key)

        // отверстия под забежные ступени
        // вторая забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX2_1, holeCoordY2); //turnStepsParams.angles.params[6].y - stringerParams.treadThickness - 20
        center2 = newPoint_xy(p0, holeCoordX2_2, holeCoordY2); //50 расстояние между двумя отверстиями уголка
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[2] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);
        // третья забежная ступень
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, holeCoordX2_1, holeCoordY3);
        center2 = newPoint_xy(p0, holeCoordX2_2, holeCoordY3);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleB[3] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под перемычку
        //if (stringerParams.stairFrame == "нет" && stringerParams.stairAmt != 0) {
        //    stringerParams.elmIns[key].briges.push(newPoint_xy(p1, -38.0, -45.0));
        //    hole1 = new THREE.Path();
        //    hole2 = new THREE.Path();
        //    hole3 = new THREE.Path();
        //    hole4 = new THREE.Path();
        //    center1 = newPoint_xy(p1, 74.0, -65.0);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //    var center4 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
        //    var center3 = newPoint_xy(center4, -50.0, 0.0);
        //    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //    holes.push(hole1);
        //    holes.push(hole2);
        //    holes.push(hole3);
        //    holes.push(hole4);
        //    stringerParams.elmIns[key].angles.push({ "x": center3.x - stringerParams.angleHolePosX + 5.0, "y": center3.y + stringerParams.angleHolePosY });
        //    stringerParams.elmIns[key].anglesop.push("У2-40х40х90");
        //}

        stringerParams.pstart = pstart;
        stringerParams.pstartang = Math.PI / 2 - Math.PI / 18;
        if (stringerParams.stairAmt == 0) stringerParams.pstartang = 2 * Math.PI - 15.7138 * Math.PI / 180;
        stringerParams.p2 = pnext;
    }
}


/**
 * тетива верхнего марша если в марше 1 ступень
 * Г-образная лестница с забегом
 */
function drawStringerLt_1Top_WndG(stringerParams, turnFramesParams, botplatformFramesParams, topplatformFramesParams, marshFramesParams, turnStepsParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    //// подъем ступени
    //var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    //var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    //var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
    //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

    //// проступь
    //p1 = copyPoint(p2);
    //p2 = newPoint_xy(p1, stringerParams.topEndLength - stringerParams.rad1, 0.0);
    //var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    //var pc3 = copyPoint(p2);
    //botLineP1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth150);
    ////зазор для проверки модели
    //p2 = newPoint_xy(p2, -params.carcasPartsSpacing, 0.0);
    //var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    var fil1 = fillet(p2, Math.PI, p20, stringerParams.stairAngle1, stringerParams.rad1);
    var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart,
        stringerParams.pstartang, stringerParams.rad1);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
    // нижняя линия марша
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
    if (key == "out") {
        stringerParams.pgalssPosition = polar(fil2.end, fil2.angend - Math.PI * 1.5, stringerParams.rad1 * Math.tan((fil2.angstart - fil2.angend) * 0.5));			// точка привязки стекла ограждения (самонесущее стекло)
    }
    // низ
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);

    // отверстия

    if (stringerParams.stairFrame == "нет") {
        // отверстия под перемычку 1
        // и под уголок крепления верхнего марша
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 73.0, -65.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));

        // отверстия под уголок ступени 1
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, 230.0, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push("У2-40х40х200");
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под перемычку 2
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, ((stringerParams.topEndLength * 0.5) + 48.0), -65.0);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));
        var pCentralHoles = copyPoint(center1);
        // отверстия под уголок ступени 2
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(center1, 120.0, 0.0);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push("У2-40х40х200");
        holes.push(hole1);
        holes.push(hole2);
    }
    if (stringerParams.stairFrame == "есть") {
        // отверстия под уголок крепления верхнего марша
        if (key == "in" && !stringerParams.stringerLast) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, 73.0, 85.0 - stringerParams.stringerWidth150);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }
        var pCentralHoles = newPoint_xy(ph, stringerParams.platformLength * 0.5, stringerParams.stepHoleY);
        // отверстия под рамки под площадкой
        var begX = platformFramesParams.overhang + 5.0 + platformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX += platformFramesParams.width + 5.0;
        }
    }

    // отверстия под задний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(botLineP1, -30.0, 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (!(!stringerParams.stringerLast && key == "in")) {
                // отверстия под стойку 1
                center1 = newPoint_xy(ph, stringerParams.b * 0.5 + 65, stringerParams.stepHoleY);
                if (!stringerParams.platformTopRailing) center1 = newPoint_xy(center1, -65, 0);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под средние стойки
                if (stringerParams.platformLength > 1300 && stringerParams.platformTopRailing) {
                    var middleRackAmt = Math.round(stringerParams.platformLength / 800) - 1;
                    if (middleRackAmt < 0) middleRackAmt = 0;
                    var rackDist = (stringerParams.platformLength - 200) / (middleRackAmt + 1);
                    var racksMiddle = [];
                    for (var i = 1; i <= middleRackAmt; i++) {
                        var center11 = newPoint_xy(center1, rackDist * i, 0);
                        var center12 = newPoint_xy(center11, 0.0, -60.0);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        racksMiddle.push({ "x": center11.x, "y": center11.y });
                    }
                    var number = stringerParams.elmIns[key].racks.length - 1;
                    stringerParams.elmIns[key].racks[number].racksMiddle = racksMiddle;
                }


                // отверстия под стойку 2
                if (stringerParams.platformTopRailing) {
                    //добавляем отверстия под стойку 1
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            } else {
                center1 = center2 = 0;
            }
        }
        /*  if (stringerParams.railingModel == "Стекло на стойках") {
              center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
              center2 = newPoint_xy(center1, 0.0, -60.0);
          }*/
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
            //if (!(!stringerParams.stringerLast && key == "in")) {
            if (!(!stringerParams.stringerLast && key == "in") || stringerParams.straight) {
                // отверстия под последнее стекло марша
                //center1 = newPoint_xy(pc2, stringerParams.a * 0.5 + 5, stringerParams.stepHoleY);
                center1 = newPoint_xy(pc2, stringerParams.a * 0.5 + 5, -100);
                //center2 = newPoint_xy(center1, 0.0, -120);
                center2 = newPoint_xy(center1, 0.0, -100);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                if (stringerParams.platformTopRailing) {
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    // отверстия под стойку 1
                    var glassSectionLength = stringerParams.platformLength - stringerParams.b;
                    center1 = newPoint_xy(pc2, 450, stringerParams.stepHoleY + (pc3.y - pc2.y));
                    center2 = newPoint_xy(center1, 0.0, -60);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc2, stringerParams.b + 100, stringerParams.stepHoleY + (pc3.y - pc2.y));
                        center2 = newPoint_xy(center1, 0.0, -60);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    if (glassSectionLength > 1000) {
                        // первое среднее
                        center1 = newPoint_xy(pCentralHoles, -60, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                        // второе среднее
                        center1 = newPoint_xy(center1, /*stringerParams.b*/ 120, 0);
                        center2 = newPoint_xy(center1, 0, -60);
                        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
                    }
                    // отверстия под стойку 2
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    if (stringerParams.stairFrame == "есть") {
                        center1 = newPoint_xy(pc3, -60 - 5 - 30 - 60, stringerParams.stepHoleY);
                        center2 = newPoint_xy(center1, 0.0, -60.0);
                    }
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            }
        }

        if (stringerParams.railingModel == "Кованые балясины") {
            if (!(!stringerParams.stringerLast && key == "in")) {
                // отверстия под стойку
                pc2 = newPoint_xy(pc2, 0, stringerParams.rad1);
                hole1 = new THREE.Path();
                hole2 = new THREE.Path();
                center1 = newPoint_xy(pc2, stringerParams.b * 0.5 - stringerParams.rad1, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под стойку 2
                if (stringerParams.platformTopRailing) {
                    hole1 = new THREE.Path();
                    hole2 = new THREE.Path();
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);
                    stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
                }
            } else {
                center1 = center2 = 0;
            }
        }

        if (center1 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0)
            addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
    }

}
