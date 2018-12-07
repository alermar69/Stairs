
/**
 * Косоур
 * универсальный
 */
function drawStringerKo(stringerParams, turnStepsParams) {
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
*/

    var text = "Косоур " + (stringerParams.key === 'out' ? 'внешний' : 'внутренний');
	var textHeight = 30;
	var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -200);
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);


    stringerParams.stringerShape = new THREE.Shape();
    stringerParams.stringerShapeNo = new THREE.Shape();
    var key = stringerParams.key;

    // точки вставки уголков, рамок, перемычек
    stringerParams.elmIns[key] = {};
    stringerParams.elmIns[key].angles = [];
    stringerParams.elmIns[key].anglesop = [];
    stringerParams.elmIns[key].frames = [];
    stringerParams.elmIns[key].angleB = [];
    stringerParams.elmIns[key].angleU = [];
    stringerParams.elmIns[key].briges = [];
    stringerParams.elmIns[key].racks = [];

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;
    if (params.botFloorType === "черновой" && stringerParams.botEnd == "floor") {
        stringerOffset_y = stringerParams.botFloorsDist;
    }
    stringerOffset_x = stringerParams.a - stringerParams.b;
    //stringerOffset_y = stringerParams.treadThickness;

    // константы
    stringerParams.holeRad = 6.5;                       // радиус (диаметра) отверстий в тетивах
    stringerParams.stepHoleX1 = 45;                 // координата Х первого отверстия крепления уголка ступени относительно угла косоура
    stringerParams.holeDistU2_230 = 180;         // расстояние между отверстиями для уголка У2-230
    stringerParams.holeDistU2_200 = 150;         // расстояние между отверстиями для уголка У2-200
    stringerParams.holeDistU2_160 = 110;         // расстояние между отверстиями для уголка У2-160
    stringerParams.stepHoleY = -65;                 // координата Y отверстий крепления уголка ступени
    stringerParams.stringerWidth = 150;         // ширина тетивы
    stringerParams.rad1 = 10.0;                         // Радиус скругления внешних углов
    stringerParams.rad2 = 5.0;                           // Радиус скругления внутренних углов
    stringerParams.stairAngle1 = Math.atan(stringerParams.h / stringerParams.b);     // вычисляем угол наклона лестницы

    if (stringerParams.stairAmt > 10) {         // марш более 10 ступеней шириной 200мм
        stringerParams.stringerWidth = 200.0;
    }

    if (stringerParams.stringerType == "ломаная") {
        stringerParams.stringerWidth = 180;
        if (stringerParams.stairAmt > 10) stringerParams.stringerWidth = 200.0;
    }
    if (stringerParams.stringerType == "прямая") stringerParams.stringerWidth = 320;

    stringerParams.railingModel = "нет";
    stringerParams.railingSide_1 = "нет";
    stringerParams.railingPresence = "есть";

    if (stringerParams.railingSide_1 == "нет") {
        stringerParams.railingModel = "нет";
    }
    if (stringerParams.railingSide_1 != "нет") stringerParams.railingPresence = "есть";

    // установки размеров под уголки
    setStairAngles(stringerParams);
    // уголки и рамки
    stringerParams.stepHoleX2 = stringerParams.b - 45.0;
    stringerParams.stepHoleY = -20.0;           // координата Y отверстий крепления рамки


    // косоур
    stringerParams.p0 = { "x": stringerParams.botEnd == "platformP" ? 0.0 : stringerOffset_x, "y": -stringerOffset_y };

    /*низ марша*/

    if(stringerParams.botEnd == "floor") drawBotStepKo_floor(stringerParams);
    if(stringerParams.botEnd == "platformG") drawBotStepKo_pltG(stringerParams);
    if(stringerParams.botEnd == "platformP" && key == "in") drawBotStepKo_pltPIn(stringerParams);
    if(stringerParams.botEnd == "platformP" && key == "out") drawBotStepKo_pltPOut(stringerParams);
    if(stringerParams.botEnd == "winder" && key == "in") drawBotStepKo_wndIn(stringerParams, turnStepsParams);
    if(stringerParams.botEnd == "winder" && key == "out") drawBotStepKo_wndOut(stringerParams, turnStepsParams);



    /*средние ступени*/

    ltko_set_railing(stringerParams.stairAmt, stringerParams);
    drawMiddleStepsKo(stringerParams.stairAmt, stringerParams);

    /*верх марша*/

    if (stringerParams.topEnd == "floor") drawTopStepKo_floor(stringerParams);
    if (stringerParams.topEnd == "platformG") drawTopStepKo_pltG(stringerParams);
    if (stringerParams.topEnd == "platformP" && key == "in") drawTopStepKo_pltPIn(stringerParams);
    if (stringerParams.topEnd == "platformP" && key == "out") drawTopStepKo_pltPOut(stringerParams);
    if (stringerParams.topEnd == "winder" && key == "in") drawTopStepKo_wndIn(stringerParams, turnStepsParams);
    if (stringerParams.topEnd == "winder" && key == "out") drawTopStepKo_wndOut(stringerParams, turnStepsParams);

    stringerParams.dxfBasePoint.x += stringerParams.b * stringerParams.stairAmt + stringerParams.dxfBasePointGap;

    return stringerParams;
}


/**
 * Нижние узлы
 */

/**
 * первый подъем если внизу перекрытие
 */
function drawBotStepKo_floor(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);

    // подъем
    console.log(stringerParams.botFloorsDist);
    var h_1 = stringerParams.h - stringerParams.treadThickness;                     // высота первого подъема
    if (params.botFloorType === "черновой"){
        h_1 = h_1 + stringerParams.botFloorsDist;
    }
    if (params.bottomAngleType === "регулируемая опора"){
        var h_1 = h_1 - 20;
        p0 = newPoint_xy(p0, 0.0, 20);
    }

    var p1 = polar(p0, Math.PI * 0.5, h_1);

    // проступь
    var p2 = polar(p1, 0.0, stringerParams.b);

    // нижний край косоура

    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    var p00 = polar(p0, 0.0, 100.0);                                                 // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);           // точка пересчечения нижнего края и нижней линии марша

    if (stringerParams.stringerType != "ломаная")
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, stringerParams.dxfBasePoint);

    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // отверстия под рамку
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });


    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        holes.push(hole1);
        holes.push(hole2);
        // ... ограждения
    }

    // отверстия под нижний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 160.0, 35.0);
    if (params.bottomAngleType === "регулируемая опора") center1 = newPoint_xy(p0, stringerParams.b+25, 50.0);
    center2 = newPoint_xy(center1, 60.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 35.0};
    if (params.bottomAngleType === "регулируемая опора")
        stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 30.0};
    holes.push(hole1);
    holes.push(hole2);

    stringerParams.pstart = bottomLineP1;
    stringerParams.p2 = p2;
} //end of drawBotStepKo_floor

/**
 * первый подъем если снизу площадка (Г-образная и трехмаршевая лестница)
 */
function drawBotStepKo_pltG(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;


    var p0 = copyPoint(stringerParams.p0);

    // подъем
    var h_1 = 150.0;                        // высота первого подъема

    var p1 = polar(p0, Math.PI * 0.5, h_1);

    // проступь
    var p2 = polar(p1, 0.0, stringerParams.stringerSideOffset);

    // нижний край косоура
    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    var p00 = polar(p0, 0.0, 100.0);                                                 // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);           // точка пересчечения нижнего края и нижней линии марша
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, stringerParams.dxfBasePoint);

    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);

    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // отверстия крепления к площадке
    // отверстия под нижний крепежный уголок
    // крепления к площадке
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0, 25.0);
    center2 = newPoint_xy(center1, 0.0, 60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };

    // второй подъём
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, stringerParams.b, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // отверстия под рамку
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });


    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        // ... ограждения
    }

    stringerParams.pstart = bottomLineP1;
    stringerParams.p2 = p2;
} //end of drawBotStepKo_pltG

/**
 * первый подъем если снизу площадка (П-образная лестница, внутренняя сторона)
 */
function drawBotStepKo_pltPIn(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p0 = copyPoint(stringerParams.p0);

    // подъем
    var h_1 = 150.0;                        // высота первого подъема

    var p1 = polar(p0, Math.PI * 0.5, h_1);

    // проступь
    var p2 = polar(p1, 0.0, stringerParams.botEndLength);

    // нижний край косоура
    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    var p00 = polar(p0, 0.0, 100.0);                                                 // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);           // точка пересчечения нижнего края и нижней линии марша
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, stringerParams.dxfBasePoint);

    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);

    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // отверстия крепления к площадке
    // отверстия под нижний крепежный уголок
    // крепления к площадке
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0, 25.0);
    center2 = newPoint_xy(center1, 0.0, 60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };

    // отверстия под рамку
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });

    // второй подъём
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, stringerParams.b, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // отверстия под рамку
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });

    stringerParams.pstart = bottomLineP1;
    stringerParams.p2 = p2;
} //end of drawBotStepKo_pltPIn

/**
 *  последний подъем если сверху площадка (П-образная лестница внешняя)
 */
function drawBotStepKo_pltPOut(stringerParams) {
  drawBotStepKo_pltPIn(stringerParams);
} //end of drawBotStepKo_pltPOut

/**
 * первый подъем если сверху забег (внутренняя сторона марша)
 */
function drawBotStepKo_wndIn(stringerParams) {

} //end of drawBotStepLt_wndIn

/**
 * первый подъем если сверху забег (внешняя сторона марша)
 */
function drawBotStepKo_wndOut(stringerParams) {

} //end of drawBotStepKo_wndOut


/**
 * средние ступени
 */
function drawMiddleStepsKo(stairAmt, stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var hole1, hole2;

    var p2 = copyPoint(stringerParams.p2);
    var p1 = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // номер ступени
    var ii = 2;                             // цикл начинаем со ступени №2
    for (; ii < stairAmt; ii++) {
        // подъем ступени
        var p1 = copyPoint(p2);
        var p3 = newPoint_xy(p1, 0.0, stringerParams.h);
        var p2 = newPoint_xy(p3, stringerParams.b, 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p3, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);

        p1 = copyPoint(p3);

        // отверстия под рамку
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p3.y, "width": stringerParams.frameWidth });
        holes.push(hole1);
        holes.push(hole2);

        // стыковка деталей косоура
        if (ii == stringerParams.divide) {
            var divideP1 = newPoint_xy(p2, -stringerParams.b * 0.5, 0.0);
            var divideP2 = newPoint_xy(divideP1, 0.0, -20.0);
            divideP2 = itercection(divideP1, divideP2, p20, p21);
            // точка пересчечения линии стыка и нижней линии марша
            addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, divideP1, divideP2, stringerParams.dxfBasePoint);
            // фланец
            p0 = newPoint_xy(p1, 5.0, -50.0);
            stringerParams.flanPointInsert = p0;
            drawFlanKo(stringerParams, p0, holes);
        }

        // отверстия под стойку
        if (stringerParams.railing.indexOf(ii) != -1) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
            holes.push(hole1);
            holes.push(hole2);
            // ... ограждение
        }
    }

    stringerParams.p2 = p2;
} //end of drawMiddleStepsKo

/**
 * Верхние узлы
 */

/**
 * последний подъем если сверху перекрытие
 */
function drawTopStepKo_floor(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    //размеры верхнего выступа
    var topLedgeWidth = 0;
    var topLedgeHeight  = 0;
    if (stringerParams.topAnglePosition == "вертикальная рамка"){
        topLedgeWidth = 40;
        topLedgeHeight  = stringerParams.h - 20;
        }
    // последняя проступь
    var topStepWidth = stringerParams.b;
    if (stringerParams.topAnglePosition == "вертикальная рамка") topStepWidth = stringerParams.b + topLedgeWidth;
    if (stringerParams.topFlan == "есть") topStepWidth = topStepWidth + 8;


    var botLiteP3 = newPoint_xy(stringerParams.p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
    //var p21 = polar(botLiteP3, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    var p1 = copyPoint(stringerParams.p2);
    var topLineP10 = newPoint_xy(p1, 0, stringerParams.h);

    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // проступь
    p1 = copyPoint(p2);
    botLineP1 = newPoint_xy(p1, topStepWidth, topLedgeHeight);
    if(topLedgeWidth == 0)
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, botLineP1, stringerParams.dxfBasePoint);

    //верхний выступ
    if(topLedgeWidth != 0){
        p2 = newPoint_xy(p1, stringerParams.b , 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0 , topLedgeHeight);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, topLedgeWidth , 0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
        }

    // отверстия под рамку
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();

    var center1 = newPoint_xy(topLineP10, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(topLineP10, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": topLineP10.y, "width": stringerParams.frameWidth });


    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(topLineP10, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
            // ... ограждение
    }

    if (stringerParams.stringerType == "ломаная") {
        //var p1 = newPoint_xy(botLineP1, 0.0, -stringerParams.h + stringerParams.treadThickness - topLedgeHeight);

       var botLineP2 = newPoint_xy(botLineP1, 0.0, -(stringerParams.stringerWidth + topLedgeHeight));
       var p11 = newPoint_xy(botLineP2, -(topStepWidth - stringerParams.stringerWidth), 0.0);


       //var p11 = newPoint_xy(p1, -(stringerParams.b - (stringerParams.pstart.x - stringerParams.p0.x - stringerParams.b)), 0.0);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, botLineP1, botLineP2, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, botLineP2, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
        var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);

        // нижняя линия марша

        var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, 0.0, -stringerParams.rad2), newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);


        var i = 2;
        for (; i < stringerParams.stairAmt-1; i++) {
            var p1 = copyPoint(p22);
            if (i === stringerParams.stairAmt - stringerParams.divide + 1) {
                var p11 = newPoint_xy(p1, 0.0, -stringerParams.h);
                var p22 = newPoint_xy(p11, -stringerParams.b, 0.0);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, 0.0, stringerParams.rad1), newPoint_xy(p11, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);

                var pc11 = newPoint_xy(p11, -stringerParams.rad1, stringerParams.rad1);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad1,   Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);

                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, -stringerParams.rad1, 0.0), newPoint_xy(p22, -stringerParams.rad1, 0.0), stringerParams.dxfBasePoint);
                }
            else {
                if (i !== stringerParams.stairAmt - stringerParams.divide + 2) {
                    var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
                    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
                    }

                var p11 = newPoint_xy(p1, -stringerParams.b, 0.0);
                var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);

                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad1, 0.0), newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);

                var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
                addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, 0.0, -stringerParams.rad2), newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);
                }
        }

        //последний нижний уступ
        p1 = copyPoint(p22);
        p11 = newPoint_xy(p1, -stringerParams.b, 0.0);
        p22 = newPoint_xy(p11, 0.0, -(2*stringerParams.h - stringerParams.stringerWidth - stringerParams.treadThickness));

        if (params.botFloorType === "черновой") p22 = newPoint_xy(p22, 0.0, -stringerParams.botFloorsDist);
        if (params.bottomAngleType === "регулируемая опора") p22 = newPoint_xy(p22, 0.0, 20);

        pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad1, 0.0), newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
        var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, 0.0, -stringerParams.rad2), newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);

        pc1 = newPoint_xy(p22, -stringerParams.rad1, stringerParams.rad1);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);

        var p0 = copyPoint(stringerParams.p0);
        if (params.bottomAngleType === "регулируемая опора") p0 = newPoint_xy(p0, 0.0, 20);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p22, -stringerParams.rad1, 0), p0, stringerParams.dxfBasePoint);
    }

        //addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad1, 0.0), stringerParams.pstart, stringerParams.dxfBasePoint);

    if (stringerParams.stringerType != "ломаная") {
        var fil1 = fillet(botLineP1, Math.PI * 1.5, botLiteP3, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(botLiteP3, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, 0.0, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, botLineP1, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // нижняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        // низ
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
    }


    p1 = copyPoint(botLineP1);

    // отверстия под верхний крепежный уголок
    if (stringerParams.topAnglePosition == "вертикальная рамка"){
        center1 = newPoint_xy(botLineP1, -topLedgeWidth/2, -30);
        if (stringerParams.topFlan == "есть") center1 = newPoint_xy(center1, - 8, 0);
        center2 = newPoint_xy(center1, 0.0, -100.0);
        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(stringerParams.stringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angleU.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
        }
}//end of drawTopStepKo_floor

/**
 * последний подъем если сверху площадка (Г-образная лестница)
 */
function drawTopStepKo_pltG(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
// первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    //var p3 = newPoint_xy(p2, stringerParams.b, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);

    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p2, stringerParams.topEndLength, 0.0);    
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    var pc3 = newPoint_xy(p1, (stringerParams.platformLength - stringerParams.stringerSideOffset 
      - (stringerParams.a - stringerParams.b)), 0.0);
    //var pc3 = newPoint_xy(p1, (stringerParams.platformLength - stringerParams.stringerSideOffset), 0.0);


    // отверстия под рамку
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });
    holes.push(hole1);
    holes.push(hole2);


    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        //center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
        center1 = newPoint_xy(p1, stringerParams.b / 2 + 65, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        holes.push(hole1);
        holes.push(hole2);


        // отверстия под стойку 2
        //hole1 = new THREE.Path();
        //hole2 = new THREE.Path();
        center1 = newPoint_xy(pc3, -60 - 5 - 30, stringerParams.stepHoleY);
        //center2 = newPoint_xy(center1, 0.0, -60.0);
        //addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        //addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        //holes.push(hole1);
        //holes.push(hole2);
        // ... ограждение
    }

  // Задняя кромка
  var p00 = newPoint_xy(p2, 0.0, -100.0);
  var bottomLineP2 = itercection(p2, p00, p20, p21);       // точка пересечения нижней линии марша и задней кромки
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, bottomLineP2, stringerParams.dxfBasePoint);
  // нижняя линия марша
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP2, stringerParams.pstart, stringerParams.dxfBasePoint);

  // отверстия под соединительный фланец
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p2, -30.0, -65.0);
  center2 = newPoint_xy(center1, 0.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  stringerParams.flanSidePointInsert = newPoint_xy(center1, -20.0, 20.0);

  // отверстия для крепления верхнего марша
  if (key == "in") {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p2, -135.0, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
  }
}//end of drawTopStepKo_pltG

/**
 * последний подъем если сверху площадка (П-образная лестница внутренняя сторона)
 */
function drawTopStepKo_pltPIn(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
// первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    //var p3 = newPoint_xy(p2, stringerParams.b, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);

    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p2, stringerParams.topEndLength, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

    // отверстия под рамку
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });
    holes.push(hole1);
    holes.push(hole2);


//    // отверстия под стойку
//    if (stringerParams.stairAmt > 2) {
//        hole1 = new THREE.Path();
//        hole2 = new THREE.Path();
//        center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
//        center2 = newPoint_xy(center1, 0.0, -60.0);
//        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//        holes.push(hole1);
//        holes.push(hole2);
//      // ... ограждение
//    }

    // Задняя кромка
    var p00 = newPoint_xy(p2, 0.0, -100.0);
    var bottomLineP2 = itercection(p2, p00, p20, p21);       // точка пересечения нижней линии марша и задней кромки
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, bottomLineP2, stringerParams.dxfBasePoint);
    // нижняя линия марша
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP2, stringerParams.pstart, stringerParams.dxfBasePoint);

    // отверстия под уголок крепления к поперечному косоуру площадки
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p2, -30.0, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].angleU[0] = { "x": center2.x + 30.0, "y": center2.y - 20.0 };
    stringerParams.flanSidePointInsert = newPoint_xy(center1, -20.0, 20.0);
}//end of drawTopStepKo_pltPIn

/**
 * последний подъем если сверху площадка (П-образная лестница внешняя)
 */
function drawTopStepKo_pltPOut(stringerParams) {
	drawTopStepKo_pltPIn(stringerParams);
}//end of drawTopStepKo_pltPOut

/**
 * последний подъем если сверху забег (внутренняя сторона)
 */
function drawTopStepKo_wndIn(stringerParams) {

}//end of drawTopStepKo_wndIn

/**
 * последний подъем если сверху забег (внешняя сторона)
 */
function drawTopStepKo_wndOut(stringerParams) {

}//end of drawTopStepKo_wndOut


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


function toRadians(angle){
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
