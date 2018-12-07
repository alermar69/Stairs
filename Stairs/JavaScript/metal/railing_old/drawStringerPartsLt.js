
/**
 * Тетива
 * универсальная
 */
function drawStringerLt(stringerParams, turnStepsParams) {
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
    
        stringerParams.platformframeProfile
        stringerParams.stairframeProfile
        stringerParams.platformframeBrigeAmt
        stringerParams.stairframeBrigeAmt
        stringerParams.frameOverhang
        stringerParams.frameWidth
    
    
        console.log(stringerParams.model);
        console.log(stringerParams.botEnd);
        console.log(stringerParams.topEnd);
        console.log(stringerParams.botEndLength);
        console.log(stringerParams.topEndLength);
        console.log(stringerParams.stringerType);
        console.log(stringerParams.stairFrame);
        console.log(stringerParams.treadThickness);
        console.log(stringerParams.botFloorType);
        console.log(stringerParams.botFloorsDist);
        console.log(stringerParams.topAnglePosition);
        console.log(stringerParams.topFlan);
        console.log(stringerParams.bottomAngleType);
        console.log(stringerParams.h);
        console.log(stringerParams.b);
        console.log(stringerParams.a);
        console.log(stringerParams.stairAmt);
        console.log(stringerParams.thickness);
        console.log(stringerParams.dxfBasePoint);
        console.log(stringerParams.dxfPrimitivesArr);
        console.log(stringerParams.key);
    */
    //console.log(stringerParams.topEndLength);

    var text = "Тетива " + (stringerParams.key === 'out' ? 'внешняя' : 'внутренняя');
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -200);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);


    if (stringerParams.botEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.botEndLength;

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

    // константы
    stringerParams.holeRad = 6.5;            // радиус (диаметра) отверстий в тетивах
    stringerParams.stepHoleX1 = 45;          // координата Х первого отверстия крепления уголка ступени относительно угла косоура
    stringerParams.holeDistU2_230 = 180;     // расстояние между отверстиями для уголка У2-230
    stringerParams.holeDistU2_200 = 150;     // расстояние между отверстиями для уголка У2-200
    stringerParams.holeDistU2_160 = 110;     // расстояние между отверстиями для уголка У2-160
    stringerParams.stepHoleY = -65;          // координата Y отверстий крепления уголка ступени
    stringerParams.stringerWidth = 150;      // ширина тетивы
    stringerParams.rad1 = 10.0;              // Радиус скругления внешних углов
    stringerParams.rad2 = 5.0;               // Радиус скругления внутренних углов
    stringerParams.stairAngle1 = Math.atan(stringerParams.h / stringerParams.b);   // вычисляем угол наклона лестницы

    if (stringerParams.stairAmt > 10) {      // марш более 10 ступеней шириной 200мм
        stringerParams.stringerWidth = 200.0;
    }
    if (stringerParams.stairFrame == "есть" && stringerParams.stairThin) {
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
    if (stringerParams.stairFrame == "есть") {
        stringerParams.stepHoleX1 = stringerParams.frameSideHolePosX + 5.0 + stringerParams.frameOverhang;
        stringerParams.holeDist = stringerParams.a - (stringerParams.frameOverhang + stringerParams.frameOverhang +
            stringerParams.frameSideHolePosX + stringerParams.frameSideHolePosX);
        stringerParams.holeDist2 = stringerParams.holeDist;
        stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0);      // координата Y отверстий крепления рамки

        // расчёт рамок под площадкой
        var botPlatformLen = stringerParams.botEndLength - stringerParams.stringerThickness -
            stringerParams.frameOverhang - 5.0;
        var topPlatformLen = stringerParams.topEndLength - stringerParams.stringerThickness -
            stringerParams.frameOverhang - 5.0;

        if (!stringerParams.stairThin) {
            botPlatformLen -= 60.0;  // место для уголка
            topPlatformLen -= 60.0;  // место для уголка
        }
        stringerParams.botCountFrames = Math.ceil(botPlatformLen / 605.0);
        stringerParams.topCountFrames = Math.ceil(topPlatformLen / 605.0);
        stringerParams.botDistX = botPlatformLen / stringerParams.botCountFrames -
            stringerParams.platformframeSideHolePosX - stringerParams.platformframeSideHolePosX - 5.0;
        stringerParams.topDistX = topPlatformLen / stringerParams.topCountFrames -
            stringerParams.platformframeSideHolePosX - stringerParams.platformframeSideHolePosX - 5.0;
    }


    // тетива
    stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };

    /*низ марша*/

    if (stringerParams.botEnd == "floor") drawBotStepLt_floor(stringerParams);
    if (stringerParams.botEnd == "platformG") drawBotStepLt_pltG(stringerParams);
    if (stringerParams.botEnd == "platformP" && key == "in") drawBotStepLt_pltPIn(stringerParams);
    if (stringerParams.botEnd == "platformP" && key == "out") drawBotStepLt_pltPOut(stringerParams);
    if (stringerParams.botEnd == "winder" && key == "in") drawBotStepLt_wndIn(stringerParams, turnStepsParams);
    if (stringerParams.botEnd == "winder" && key == "out") drawBotStepLt_wndOut(stringerParams, turnStepsParams);


    /*средние ступени*/

    ltko_set_railing(stringerParams.stairAmt, stringerParams);
    drawMiddleStepsLt(stringerParams.stairAmt, stringerParams);

    /*верх марша*/

    if (stringerParams.topEnd == "floor") drawTopStepLt_floor(stringerParams);
    if (stringerParams.topEnd == "platformG") drawTopStepLt_pltG(stringerParams);
    if (stringerParams.topEnd == "platformP" && key == "in") drawTopStepLt_pltPIn(stringerParams);
    if (stringerParams.topEnd == "platformP" && key == "out") drawTopStepLt_pltPOut(stringerParams);
    if (stringerParams.topEnd == "winder" && key == "in") drawTopStepLt_wndIn(stringerParams, turnStepsParams);
    if (stringerParams.topEnd == "winder" && key == "out") drawTopStepLt_wndOut(stringerParams, turnStepsParams);

    stringerParams.dxfBasePoint.x += stringerParams.b * stringerParams.stairAmt + stringerParams.dxfBasePointGap;
    if (stringerParams.topEndLength !== undefined) stringerParams.dxfBasePoint.x += stringerParams.topEndLength;

    return stringerParams;
}


/**
 * Нижние узлы
 */

/**
 * первый подъем если внизу перекрытие
 */
function drawBotStepLt_floor(stringerParams) {
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

    // срез передней кромки
    var p11 = newPoint_xy(p0, 0.0, 100.0);
    var p12 = polar(p11, Math.PI * (5.0 / 3.0), 30.0);
    var fil1 = fillet(p12, Math.PI * (2.0 / 3.0), p3, Math.PI * 1.5, stringerParams.rad1);

    // нижний край тетивы
    var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
    // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    if (stringerParams.stringerType == "прямая") {
        var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    }

    var p00 = polar(p0, 0.0, 100.0);                         // вторая точка нижнего края косоура
    var bottomLineP1 = itercection(p0, p00, p20, p21);       // точка пересчечения нижнего края и нижней линии марша

    if (stringerParams.stringerType == "ломаная") {
        bottomLineP1 = newPoint_xy(p0, stringerParams.b + stringerParams.stringerWidth, 0.0);
    }
    var fil2 = fillet(bottomLineP1, Math.PI, p11, Math.PI * (5.0 / 3.0), stringerParams.rad1);

    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil1.start, stringerParams.dxfBasePoint);

    // срез передней кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);

    stringerParams.bottomLineP1 = bottomLineP1;

    // подъем
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
        stringerParams.topLineP2 = fil3.end;
        stringerParams.fil_t1 = fil_t1;
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
    stringerParams.elmIns[key].frames.push({
        "x": center1.x - stringerParams.frameSideHolePosX, "y": p1.y - stringerParams.treadThickness - 5.0,
        "width": stringerParams.frameWidth, "profile": stringerParams.stairframeProfile, "brigeAmt": stringerParams.stairframeBrigeAmt
    });
    holes.push(hole1);
    holes.push(hole2);

    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p1_1, stringerParams.b * 0.5, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        //stringerParams.elmIns[key].racks.push({ "x": center2.x, "y": center2.y});

        holes.push(hole1);
        holes.push(hole2);
        // ... ограждения
    }

    // отверстия под нижний крепежный уголок
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(bottomLineP1, -20.0, 35.0);
    if (stringerParams.stringerType == "ломаная") center1 = newPoint_xy(bottomLineP1, -100.0, 35.0);
    center2 = newPoint_xy(center1, -60.0, 0.0);
    if (params.bottomAngleType === "регулируемая опора") {
        center1 = newPoint_xy(bottomLineP1, -20.0, 50.0);
        center2 = newPoint_xy(center1, -60.0, 0.0);
    }
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 20.0, "y": center2.y - 35.0 };
    if (params.bottomAngleType === "регулируемая опора") stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 20.0, "y": center2.y - 30.0 };
    holes.push(hole1);
    holes.push(hole2);

    stringerParams.pstart = fil2.start;
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = p2;
} //end of drawBotStepLt_floor

/**
 * первый подъем если снизу площадка (Г-образная и трехмаршевая лестница)
 */
function drawBotStepLt_pltG(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);

    var p1 = newPoint_xy(p0, 65.0, -stringerParams.stringerWidth150);             // нижний правый угол
    var p2 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p3 = newPoint_xy(p0, 0.0, 5.0);
    var p4 = newPoint_xy(p0, -40.0, stringerParams.h);  // верхний левый угол
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

    // проверка на обрезку нижней части
    var p20 = newPoint_xy(pnext, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
    // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
    var testpt = itercection(p21, p20, fil1.start, polar(fil1.start, Math.PI / 3.0, 100.0));
    var fnocut = testpt.y > p2.y + 5.0;
    if (fnocut) {
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p2, stringerParams.dxfBasePoint);
    }
    // подъем
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, 0.0, Math.PI / 6.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil3.start, stringerParams.dxfBasePoint);
    // срез передней кромки
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, p41, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    // подъем
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);

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
    stringerParams.elmIns[key].frames.push({
        "x": center1.x - stringerParams.frameSideHolePosX, "y": p1.y - stringerParams.treadThickness - 5.0,
        "width": stringerParams.frameWidth, "profile": stringerParams.stairframeProfile, "brigeAmt": stringerParams.stairframeBrigeAmt
    });
    holes.push(hole1);
    holes.push(hole2);

    //        // отверстия под стойку
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //          // ... ограждения
    //        }

    // отверстия под нижний крепежный уголок
    // крепления к площадке
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0, 25.0 - stringerParams.stringerWidth150);
    center2 = newPoint_xy(center1, 0.0, 60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
    holes.push(hole1);
    holes.push(hole2);

    if (fnocut) {
        stringerParams.pstart = fil1.start;
        stringerParams.pstartang = Math.PI / 3.0;
    }
    else {
        stringerParams.pstart = p2;
        stringerParams.pstartang = 0.0;
    }
    stringerParams.p2 = pnext;
} //end of drawBotStepLt_pltG

/**
 * первый подъем если снизу площадка (П-образная, внутренняя сторона)
 */
function drawBotStepLt_pltPIn(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = copyPoint(stringerParams.p0);
    p0 = newPoint_xy(p0, -5.0, 0.0);

    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);             // нижний правый угол
    // под площадкой
    var p01 = polar(p1, 0.0, -stringerParams.botEndLength + 5.0);
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

    // отверстия под уголок/рамку ступени
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
    stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
    stringerParams.elmIns[key].frames.push({
        "x": center1.x - stringerParams.frameSideHolePosX, "y": p1.y - stringerParams.treadThickness - 5.0,
        "width": stringerParams.frameWidth, "profile": stringerParams.stairframeProfile, "brigeAmt": stringerParams.stairframeBrigeAmt
    });
    holes.push(hole1);
    holes.push(hole2);

    if (stringerParams.stairFrame == "нет") {
        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p03, -stringerParams.stepHoleX1 + 5.0, stringerParams.stepHoleY + stringerParams.treadThickness + 5.0);
        var center2 = newPoint_xy(center1, -stringerParams.holeDist2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - stringerParams.angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
        holes.push(hole1);
        holes.push(hole2);

        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25;

        if (stringerParams.platformLength_1 < 880.0) {
            aTyp = "У2-40х40х90";
            holeDist3 = 50.0;
            angleHolePosX = 20;
        }

        // отверстия под 2 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p03, -381.0 - stringerParams.stepHoleX1, -20.0);
        var center2 = newPoint_xy(center1, -holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 3 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(p03, -stringerParams.botEndLength + 55.0 + stringerParams.stepHoleX1, -20.0);
        var center2 = newPoint_xy(center1, holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);
    }
    else {
        // отверстия под рамки под площадкой
        var frwid = stringerParams.botDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        var begX = -stringerParams.botDistX - stringerParams.frameOverhang - stringerParams.platformframeSideHolePosX;
        var ii;
        for (ii = 0; ii < stringerParams.botCountFrames; ii++) {
            // отверстия под рамку
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p03, begX, stringerParams.stepHoleY + stringerParams.treadThickness + 5.0);
            center2 = newPoint_xy(center1, stringerParams.botDistX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].frames.push({
                "x": center1.x - stringerParams.platformframeSideHolePosX, "y": p03.y - stringerParams.treadThickness - 5.0,
                "width": frwid,
                "profile": stringerParams.platformframeProfile, "brigeAmt": stringerParams.platformframeBrigeAmt
            });
            holes.push(hole1);
            holes.push(hole2);

            begX -= frwid + 5.0;
        }
    }

    //        // отверстия под стойку
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //          // ... ограждения
    //        }


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
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = pnext;
} //end of drawBotStepLt_pltPIn

/**
 * первый подъем если снизу площадка (П-образная лестница, внешняя сторона)
 */
function drawBotStepLt_pltPOut(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2;

    var p0 = newPoint_xy(stringerParams.p0, -stringerParams.botEndLength, -stringerParams.stringerWidth150);

    // подъем
    var h_1 = stringerParams.stringerWidth150;                        // высота первого подъема

    var p1 = polar(p0, Math.PI * 0.5, h_1);

    // под площадкой
    var p2 = polar(p1, 0.0, stringerParams.botEndLength - 40.0);
    var ph = copyPoint(p2);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    // подъём
    var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(pc2, stringerParams.rad2, 0.0);
    var p4 = newPoint_xy(p3, 0.0, stringerParams.h - stringerParams.rad2 - stringerParams.rad1);
    var p4c = newPoint_xy(p4, stringerParams.rad1, 0.0);
    var p5 = newPoint_xy(p4c, 0.0, stringerParams.rad1);
    var p6 = newPoint_xy(p5, stringerParams.b - stringerParams.rad1 - stringerParams.rad2, 0.0);
    p2 = newPoint_xy(p6, stringerParams.rad2, 0.0);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p5, p6, stringerParams.dxfBasePoint);

    // отверстия под уголок/рамку ступени
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p5, stringerParams.stepHoleX1 - stringerParams.rad1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
    stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
    stringerParams.elmIns[key].frames.push({
        "x": center1.x - stringerParams.frameSideHolePosX, "y": p5.y - stringerParams.treadThickness - 5.0,
        "width": stringerParams.frameWidth, "profile": stringerParams.stairframeProfile, "brigeAmt": stringerParams.stairframeBrigeAmt
    });
    holes.push(hole1);
    holes.push(hole2);

    if (stringerParams.stairFrame == "нет") {
        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, -stringerParams.stepHoleX1 + 40.0, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, -stringerParams.holeDist2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - stringerParams.angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
        holes.push(hole1);
        holes.push(hole2);

        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25;
        if (stringerParams.platformLength_1 < 880.0) {
            aTyp = "У2-40х40х90";
            holeDist3 = 50.0;
            angleHolePosX = 20;
        }

        // отверстия под 2 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, -346.0 - stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, -holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 3 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, -stringerParams.botEndLength + 90.0 + stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);
    }
    else {
        // отверстия под рамки под площадкой
        var frwid = stringerParams.botDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        var begX = -stringerParams.botDistX - stringerParams.frameOverhang - 5.0 - stringerParams.platformframeSideHolePosX;
        var ii;
        for (ii = 0; ii < stringerParams.botCountFrames; ii++) {
            // отверстия под рамку
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX + 40.0, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, stringerParams.botDistX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].frames.push({
                "x": center1.x - stringerParams.platformframeSideHolePosX, "y": ph.y - stringerParams.treadThickness - 5.0,
                "width": frwid,
                "profile": stringerParams.platformframeProfile, "brigeAmt": stringerParams.platformframeBrigeAmt
            });
            holes.push(hole1);
            holes.push(hole2);

            begX -= frwid + 5.0;
        }
    }

    //        // отверстия под стойку
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //          // ... ограждения
    //        }


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
    stringerParams.pstartang = 0.0;
    stringerParams.p2 = p2;
} //end of drawBotStepLt_pltPOut

/**
 * первый подъем если сверху забег (внутренняя сторона марша)
 */
function drawBotStepLt_wndIn(stringerParams) {

} //end of drawBotStepLt_wndIn

/**
 * первый подъем если сверху забег (внешняя сторона марша)
 */
function drawBotStepLt_wndOut(stringerParams) {

} //end of drawBotStepLt_wndOut


/**
 * средние ступени
 */
function drawMiddleStepsLt(stairAmt, stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;


    var p2 = copyPoint(stringerParams.p2);
    var p1 = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
    // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

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
        if (stringerParams.stringerType != "прямая") {
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
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
            stringerParams.elmIns[key].frames.push({
                "x": center1.x - stringerParams.frameSideHolePosX, "y": p1.y - stringerParams.treadThickness - 5,
                "width": stringerParams.frameWidth, "profile": stringerParams.stairframeProfile, "brigeAmt": stringerParams.stairframeBrigeAmt
            });
            holes.push(hole1);
            holes.push(hole2);
        }

        // отверстия под перемычку
        if (stringerParams.stairFrame == "нет" && stringerParams.brige.indexOf(ii) != -1) {
            stringerParams.elmIns[key].briges.push(newPoint_xy(p1, 35.0, -45.0));
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            hole3 = new THREE.Path();
            hole4 = new THREE.Path();
            center1 = newPoint_xy(p1, 73.0, -65.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            var center4 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
            var center3 = newPoint_xy(center4, -50.0, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            holes.push(hole3);
            holes.push(hole4);
            stringerParams.elmIns[key].angles.push({ "x": center3.x - stringerParams.angleHolePosX + 5.0, "y": center3.y + stringerParams.angleHolePosY });
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
                var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
                // первая точка на нижней линии марша
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
            drawFlanLt(stringerParams, p0, holes);
        }

        // отверстия под стойку по центру ступени
        if (stringerParams.railing.indexOf(ii) != -1) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
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
} //end of drawMiddleStepsLt

/**
 * Верхние узлы
 */

/**
 * последний подъем если сверху перекрытие
 */
function drawTopStepLt_floor(stringerParams) {
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


    if (stringerParams.stringerType == "пилообразная" || stringerParams.stringerType == "ломаная") {

        var botLineP3 = newPoint_xy(stringerParams.p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // первая точка на нижней линии марша

        //последний подъем
        var p1 = copyPoint(stringerParams.p2);
        var p11 = newPoint_xy(p1, 0.0, stringerParams.rad2);
        var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);

        var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
        var p20 = newPoint_xy(p2, 0.0, -stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p11, p20, stringerParams.dxfBasePoint);

        p1 = copyPoint(p2);
        p11 = newPoint_xy(p1, stringerParams.rad1, 0.0);
        pc1 = newPoint_xy(p1, stringerParams.rad1, -stringerParams.rad1);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        var topLineP10 = p1; //сохнаняем точку

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
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, stringerParams.fil_t1.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.center, stringerParams.rad1, stringerParams.fil_t1.angstart, stringerParams.fil_t1.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.end, botLineP1, stringerParams.dxfBasePoint);
        };

        if (topLedgeWidth != 0) {
            var fil2 = calculateFilletParams(p2, stringerParams.stairAngle1, botLineP1, Math.PI, stringerParams.rad1, true);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.topLineP2, fil2.start, stringerParams.dxfBasePoint);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart - Math.PI, fil2.angend, stringerParams.dxfBasePoint);
            addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, botLineP1, stringerParams.dxfBasePoint);
        };

    }


    // отверстия под уголок/рамку ступени
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(topLineP10, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
    if (stringerParams.topAnglePosition == "рамка верхней ступени") center2 = newPoint_xy(center2, 20, 0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
    stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
    stringerParams.elmIns[key].frames.push({
        "x": center1.x - stringerParams.frameSideHolePosX, "y": topLineP10.y - stringerParams.treadThickness - 5.0,
        "width": stringerParams.frameWidth + 20, "profile": stringerParams.stairframeProfile, "brigeAmt": stringerParams.stairframeBrigeAmt
    });
    holes.push(hole1);
    holes.push(hole2);

    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(topLineP10, stringerParams.b * 0.5, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        holes.push(hole1);
        holes.push(hole2);
        // ... ограждение
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
        if (p22.y != stringerParams.pstart.y) {
            var p3 = newPoint_xy(p22, 0, -(p22.y - stringerParams.pstart.y));
            var p22 = addLine1(newPoint_xy(p22, 0.0, stringerParams.rad1), newPoint_xy(p3, 0.0, stringerParams.rad1), stringerParams);
            var p22 = copyPoint(p3);
        }
        var pc1 = newPoint_xy(p22, -stringerParams.rad1, stringerParams.rad1);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);
        addLine1(pe_arc, stringerParams.pstart, stringerParams);
    }

    if (stringerParams.stringerType != "ломаная") {
        var fil1 = fillet(botLineP1, Math.PI * 1.5, botLineP3, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(botLineP3, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart,
        stringerParams.pstartang, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, botLineP1, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // нижняя линия марша
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        // низ
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
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
        console.log(center1);
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

}//end of drawTopStepLt_floor

/**
 * последний подъем если сверху площадка (Г-образная лестница)
 */
function drawTopStepLt_pltG(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    console.log(stringerParams.botEndLength);
    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
    // первая точка на нижней линии марша
    var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

    // подъем ступени
    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

    // проступь
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, stringerParams.topEndLength - stringerParams.rad1, 0.0);
    var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    var pc3 = copyPoint(p2);
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150);
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
    else {
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

        // отверстия под рамки под площадкой
        var frwid = stringerParams.topDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        //stringerParams.frameOverhang + stringerParams.frameOverhang;
        //var frwid = stringerParams.topDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        //var begX = stringerParams.platformframeSideHolePosX + 25.0;
        //var begX = 50.0 + stringerParams.frameOverhang;
        var begX = 5.0 + stringerParams.frameOverhang + stringerParams.platformframeSideHolePosX;
        var ii;
        for (ii = 0; ii < stringerParams.topCountFrames; ii++) {
            // отверстия под рамку
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, stringerParams.topDistX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].frames.push({
                "x": center1.x - stringerParams.platformframeSideHolePosX, "y": ph.y - stringerParams.treadThickness - 5.0,
                "width": frwid,
                "profile": stringerParams.platformframeProfile, "brigeAmt": stringerParams.platformframeBrigeAmt
            });
            holes.push(hole1);
            holes.push(hole2);

            begX += frwid + 5.0;
        }
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

    // отверстия под стойку
    if (stringerParams.stairAmt > 2) {
        // отверстия под стойку 1
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(ph, stringerParams.b / 2 + 65, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под стойку 2
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(pc3, -60-5-30, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, 0.0, -60.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].racks.push({ "x": center1.x, "y": center1.y });
        holes.push(hole1);
        holes.push(hole2);
        // ... ограждение
    }

    ////  // отверстия под стойку 1
    ////  (if (> stairAmt1 2)
    ////    (progn
    ////      (setvar "clayer" "Отверстия для стоек")
    ////      (setq center1 (c:new-point p1 180 -65))
    ////      (setq center2 (c:new-point center1 0 -60))
    ////      (command "_circle" center1 holeRad)
    ////      (command "_circle" center2 holeRad)
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //            // ... ограждение
    //        }

    //  // отверстия под стойку 2
    //  (if (> stairAmt1 2)
    //    (progn
    //      (setvar "clayer" "Отверстия для стоек")
    //      (setq center1 (c:new-point p2 -80 -65))
    //      (setq center2 (c:new-point center1 0 -60))
    //      (command "_circle" center1 holeRad)
    //      (command "_circle" center2 holeRad)


}//end of drawTopStepLt_pltG

/**
 * последний подъем если сверху площадка (П-образная лестница внутренняя сторона)
 */
function drawTopStepLt_pltPIn(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p01 = newPoint_xy(p1, -stringerParams.rad2, 0.0);
    var p02 = newPoint_xy(p01, 16.0, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p01, p02, stringerParams.dxfBasePoint);
    var p2 = newPoint_xy(p02, stringerParams.rad2, stringerParams.h - stringerParams.treadThickness - 5.0);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
    // первая точка на нижней линии марша
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
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
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

    // отверстия

    if (stringerParams.stairFrame == "нет") {
        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, stringerParams.stepHoleX1 - 16.0, stringerParams.stepHoleY + 45.0);
        var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
        holes.push(hole1);
        holes.push(hole2);

        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25;
        if (stringerParams.platformLength_1 < 880.0) {
            aTyp = "У2-40х40х90";
            holeDist3 = 50.0;
            angleHolePosX = 20;
        }

        // отверстия под 2 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, 370.0 + stringerParams.stepHoleX1, -20.0);
        var center2 = newPoint_xy(center1, holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 3 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, stringerParams.topEndLength - 66.0 - stringerParams.stepHoleX1, -20.0);
        var center2 = newPoint_xy(center1, -holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);
    }
    else {
        // отверстия под рамки под площадкой
        var frwid = stringerParams.topDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        var begX = -16.0 + stringerParams.platformframeSideHolePosX + 5.0 + stringerParams.frameOverhang;
        //var frwid = stringerParams.topDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        //var begX = stringerParams.platformframeSideHolePosX + 25.0;
        var ii;
        for (ii = 0; ii < stringerParams.topCountFrames; ii++) {
            // отверстия под рамку
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY + stringerParams.treadThickness + 5.0);
            center2 = newPoint_xy(center1, stringerParams.topDistX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].frames.push({
                "x": center1.x - stringerParams.platformframeSideHolePosX, "y": ph.y - stringerParams.treadThickness - 5.0,
                "width": frwid,
                "profile": stringerParams.platformframeProfile, "brigeAmt": stringerParams.platformframeBrigeAmt
            });
            holes.push(hole1);
            holes.push(hole2);

            begX += frwid + 5.0;
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

    //        // отверстия под стойку
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //            // ... ограждение
    //        }

    ////  // отверстия под стойку 1
    ////  (if (> stairAmt1 2)
    ////    (progn
    ////      (setvar "clayer" "Отверстия для стоек")
    ////      (setq center1 (c:new-point p1 180 -65))
    ////      (setq center2 (c:new-point center1 0 -60))
    ////      (command "_circle" center1 holeRad)
    ////      (command "_circle" center2 holeRad)
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //            // ... ограждение
    //        }

    //  // отверстия под стойку 2
    //  (if (> stairAmt1 2)
    //    (progn
    //      (setvar "clayer" "Отверстия для стоек")
    //      (setq center1 (c:new-point p2 -80 -65))
    //      (setq center2 (c:new-point center1 0 -60))
    //      (command "_circle" center1 holeRad)
    //      (command "_circle" center2 holeRad)
}//end of drawTopStepLt_pltPIn

/**
 * последний подъем если сверху площадка (П-образная лестница внешняя)
 */
function drawTopStepLt_pltPOut(stringerParams) {
    var holes = stringerParams.stringerShape.holes;
    var key = stringerParams.key;
    var hole1, hole2, hole3, hole4;

    var p1 = copyPoint(stringerParams.p2);
    var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
    var ph = copyPoint(p2);

    var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
    // первая точка на нижней линии марша
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
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

    // Задняя кромка
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0.0, -stringerParams.stringerWidth150);
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

    // отверстия

    if (stringerParams.stairFrame == "нет") {
        // отверстия под 1 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
        holes.push(hole1);
        holes.push(hole2);

        var aTyp = "У2-40х40х200";
        var holeDist3 = 150.0;
        var angleHolePosX = 25;
        if (stringerParams.platformLength_1 < 880.0) {
            aTyp = "У2-40х40х90";
            holeDist3 = 50.0;
            angleHolePosX = 20;
        }

        // отверстия под 2 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, 386.0 + stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center1.x - angleHolePosX, "y": center1.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);

        // отверстия под 3 уголок площадки
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        var center1 = newPoint_xy(ph, stringerParams.topEndLength - 50.0 - stringerParams.stepHoleX1, stringerParams.stepHoleY);
        var center2 = newPoint_xy(center1, -holeDist3, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        stringerParams.elmIns[key].angles.push({ "x": center2.x - angleHolePosX, "y": center2.y + stringerParams.angleHolePosY });
        stringerParams.elmIns[key].anglesop.push(aTyp);
        holes.push(hole1);
        holes.push(hole2);
    }
    else {
        // отверстия под рамки под площадкой
        var frwid = stringerParams.topDistX + stringerParams.platformframeSideHolePosX + stringerParams.platformframeSideHolePosX;
        var begX = stringerParams.platformframeSideHolePosX + 5.0 + stringerParams.frameOverhang;
        var ii;
        for (ii = 0; ii < stringerParams.topCountFrames; ii++) {
            // отверстия под рамку
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(ph, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, stringerParams.topDistX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            stringerParams.elmIns[key].frames.push({
                "x": center1.x - stringerParams.platformframeSideHolePosX, "y": ph.y - stringerParams.treadThickness - 5.0,
                "width": frwid,
                "profile": stringerParams.platformframeProfile, "brigeAmt": stringerParams.platformframeBrigeAmt
            });
            holes.push(hole1);
            holes.push(hole2);

            begX += frwid + 5.0;
        }
    }

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
    center1 = newPoint_xy(p1, -32.0, stringerParams.stringerWidth150 - 85.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    //        // отверстия под стойку
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //            // ... ограждение
    //        }

    ////  // отверстия под стойку 1
    ////  (if (> stairAmt1 2)
    ////    (progn
    ////      (setvar "clayer" "Отверстия для стоек")
    ////      (setq center1 (c:new-point p1 180 -65))
    ////      (setq center2 (c:new-point center1 0 -60))
    ////      (command "_circle" center1 holeRad)
    ////      (command "_circle" center2 holeRad)
    //        if (stringerParams.stairAmt > 2) {
    //          hole1 = new THREE.Path();
    //          hole2 = new THREE.Path();
    //          center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
    //          center2 = newPoint_xy(center1, 0.0, -60.0);
    //          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    //          holes.push(hole1);
    //          holes.push(hole2);
    //            // ... ограждение
    //        }

    //  // отверстия под стойку 2
    //  (if (> stairAmt1 2)
    //    (progn
    //      (setvar "clayer" "Отверстия для стоек")
    //      (setq center1 (c:new-point p2 -80 -65))
    //      (setq center2 (c:new-point center1 0 -60))
    //      (command "_circle" center1 holeRad)
    //      (command "_circle" center2 holeRad)
}//end of drawTopStepLt_pltPOut

/**
 * последний подъем если сверху забег (внутренняя сторона)
 */
function drawTopStepLt_wndIn(stringerParams) {

}//end of drawTopStepLt_wndIn

/**
 * последний подъем если сверху забег (внешняя сторона)
 */
function drawTopStepLt_wndOut(stringerParams) {

}//end of drawTopStepLt_wndOut
