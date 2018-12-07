//создаем глобальные массивы
var treads = [];
var risers = [];
var carcas = [];
var carcas1 = [];
var railing = [];
var topFloor = [];
var angles = [];


drawStaircase = function (viewportId, isVisible) {

    var x1, x2, y1, y2, x1t, y1t, x2t, y2t;

    var stringerThickness = 8;
    var treadThickness = params.treadThickness;
    var stringerWidth = 150;
    var riserThickness = 20;

    /*удаляем предыдущую лестницу*/
    if (treads) removeObjects(viewportId, 'treads');
    if (risers) removeObjects(viewportId, 'risers');
    if (carcas) removeObjects(viewportId, 'carcas');
    if (carcas1) removeObjects(viewportId, 'carcas1');
    if (railing) removeObjects(viewportId, 'railing');
    if (topFloor) removeObjects(viewportId, 'topFloor');
    if (angles) removeObjects(viewportId, 'angles');

    //очищаем глобальные массивы
    treads = [];
    risers = [];
    carcas = [];
    carcas1 = [];
    railing = [];
    topFloor = [];
    angles = [];

    /*удаляем контуры*/
    dxfPrimitivesArr = [];
    var dxfBasePointStep = 200.0;


    var stringerParams = {};

    /*задаем материалы*/

    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var metalMaterial = new THREE.MeshLambertMaterial({ color: 0x767676, wireframe: false });
    var metalMaterial2 = new THREE.MeshLambertMaterial({ color: 0xA3A3A3, wireframe: false });
    var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
    var concreteMaterial = new THREE.MeshLambertMaterial({ color: 0xBFBFBF });


    var stringerMaterial = metalMaterial;
    var floorMaterial = concreteMaterial;
    var flanMaterial = metalMaterial2;

    /*материал ступеней*/
    var stairType = params.stairType;
    var treadMaterial = timberMaterial;

    if (stairType == "рифленая сталь") treadMaterial = metalMaterial2;
    if (stairType == "рифленый алюминий") treadMaterial = metalMaterial2;
    if (stairType == "лотки") treadMaterial = metalMaterial2;
    if (stairType == "пресснастил") treadMaterial = metalMaterial2;
    if (stairType == "стекло") treadMaterial = glassMaterial;


    //материалы ограждений задаются внутри функции отрисовки секции

    var scale = 1;

    var model = params.model;
    var stairModel = params.stairModel;
    var turnSide = params.turnSide; //getInputValue("turnSide");
    var platformWidth_1 = parseFloat(document.getElementById("platformWidth_1").value);
    var platformLength_1 = parseFloat(document.getElementById("platformLength_1").value);
    var turnType_1 = document.getElementById('turnType_1').options[document.getElementById('turnType_1').selectedIndex].value;
    var turnType_2 = document.getElementById('turnType_2').options[document.getElementById('turnType_2').selectedIndex].value;
    var platformTop = document.getElementById('platformTop').options[document.getElementById('platformTop').selectedIndex].value;
    var platformLength_3 = parseFloat(document.getElementById("platformLength_3").value);
    var platformTopColumn = document.getElementById('platformTopColumn').options[document.getElementById('platformTopColumn').selectedIndex].value;
    var topFlan = document.getElementById('topFlan').options[document.getElementById('topFlan').selectedIndex].value;
    var columnModel = document.getElementById('columnModel').options[document.getElementById('columnModel').selectedIndex].value;
    var columnAmt = parseFloat(document.getElementById("columnAmt").value);
    var columnLength = parseFloat(document.getElementById("columnLength").value);
    var M = parseFloat(document.getElementById("M").value);
    var stringerType = document.getElementById('stringerType').options[document.getElementById('stringerType').selectedIndex].value;
    var riserType = document.getElementById('riserType').options[document.getElementById('riserType').selectedIndex].value;
    var stairFrame = document.getElementById('stairFrame').options[document.getElementById('stairFrame').selectedIndex].value;
    var stringerSideOffset = parseFloat(document.getElementById("sideOverHang").value);
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
    var marshDist = parseFloat(document.getElementById("marshDist").value);
    var platformRearStringer = document.getElementById('platformRearStringer').options[document.getElementById('platformRearStringer').selectedIndex].value;
    var tyrnLength; //Длина площадки
    var stringerTurn; //тип косоура: площадка или забег

    // чтобы по бокам между листом и тетивой был зазор по 2,5 мм
    // это на металлических ступенях. На всех остальных (деревянные, стеклянные, дпк)
    // надо сделать зазор до тетив 5 мм с каждой стороны
    var treadSideOffset = (model == "ко") ? 0.0 : 5.0;
    if (stairType == "рифленая сталь" || stairType == "рифленый алюминий") {
        treadSideOffset = 2.5;
    }

    var stringerOffset_x = 0.0;
    var stringerOffset_y = 0.0;
    var treadWidth = M - 2 * stringerThickness;
    if (model == "ко") {
        treadWidth = M;
        stringerOffset_x = a1 - b1;
        stringerOffset_y = treadThickness;
    }
    if (model == "лт") {
        stringerSideOffset = 0.0;
        treadWidth = M - 2 * stringerThickness - 2 * treadSideOffset;
    }

    var riserSideOffset = 10;
    var riserHeight;
    var dpcWidth = 150.0;
	var dpcDist = 3.0;

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
    install_perila = getInputValue("install_perila");

    //огражденя верхней площадки
    var topPltRail_3 = params.topPltRailing_3;
    var topPltRail_4 = params.topPltRailing_4;
    var topPltRail_5 = params.topPltRailing_5;
    //меняем местами на левой лестнице
    if (turnSide == "левое") {
        var topPltRailing_temp = topPltRail_3;
        topPltRail_3 = topPltRail_4;
        topPltRail_4 = topPltRailing_temp;
    }

    if (topPltRail_3 && topPltRail_4 && topPltRail_5)
        alert("Внимание! Замкнутое ограждение верхней площадки!")

    var lastMarsh = false; //секция ограждения на верхнем марше
    var topConnection = false; //стыковка секции ограждения с другой секцией сверху
    var bottomConnection = false; //стыковка секции ограждения с другой секцией снизу

    var stringerExtrudeOptions = {
        amount: stringerThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };


	/**
	 * два подступенка
	 */
    function draw2TurnRisers(riserParams1, turnParams) {
        var tyrnRisers = new THREE.Object3D();
        dxfBasePoint = newPoint_xy(dxfBasePoint, 1000, 0)

        //подступенок второй забежной ступени
        var turnSteps = turnParams.params;
        var turnAngle = turnSteps[1].edgeAngle;
        riserParams1.treadWidth = turnSteps[1].treadWidth / Math.cos(turnAngle);

        riserParams1 = drawRiser(riserParams1);
        var riser2 = riserParams1.mesh;
        riser2.position.x = turnSteps[1].stepWidthLow - riserParams1.riserThickness * Math.cos(turnAngle);
        riser2.position.y = treadThickness;
        riser2.position.z = -riserParams1.riserThickness * Math.sin(turnAngle);
        riser2.rotation.y = Math.PI / 2 - turnAngle;
        if (turnFactor == -1) {
            riser2.position.x = 0//(turnSteps[1].stepWidthLow - riserParams1.riserThickness * Math.cos(turnAngle));
            riser2.position.y = treadThickness;
            riser2.position.z = -turnSteps[1].stepWidthLow;
            riser2.rotation.y = turnAngle;
        }
        tyrnRisers.add(riser2);

        //подступенoк третей забежной ступени
        riserParams1.text = "3 забежной";
        turnAngle = turnSteps[2].angleX;
        //console.log(turnSteps[2])
        riserParams1.treadWidth = (turnSteps[2].treadWidthX - turnSteps[2].innerOffsetX) / Math.cos(turnAngle) + 20;

        turnAngle = turnSteps[2].angleY;
        riserParams1 = drawRiser(riserParams1);
        var riser3 = riserParams1.mesh;
        riser3.position.x = 25 - riserParams1.riserThickness * Math.sin(turnAngle) + 20 * Math.cos(turnAngle);
        riser3.position.y = treadThickness + riserParams1.h;
        riser3.position.z = -riserParams1.riserThickness * Math.cos(turnAngle) + turnSteps[2].innerOffsetX - 25 - 20 * Math.sin(turnAngle);
        riser3.rotation.y = turnAngle;
        if (turnFactor == -1) {
            riser3.position.x = -turnSteps[2].innerOffsetX + 25 + 20 * Math.sin(turnAngle);
            riser3.position.y = treadThickness + riserParams1.h;
            riser3.position.z = -25 - 20 * Math.cos(turnAngle);
            riser3.rotation.y = Math.PI / 2 - turnAngle;
        }
        tyrnRisers.add(riser3);

        risers.push(tyrnRisers);

        return tyrnRisers;
    }//end of draw2TurnRisers

    /**
     * Устанавливает параметры для рамок под площадкой
     * Рамки на площадку всегда 60х30 для всех видов ступеней
     * Особенности конструктива лестниц с рифленым листом или дпк:
     * кол-во перемычек рамок площадок 4 шт если шарина марша до 1000мм и 5 шт если больше
     */
    function setPlatformFrameParams(platformFramesParams) {
        // overhang              // свес платформы над рамкой
        // sideHolePosX          // расстояние к отверстию от края рамки
        if (model == "лт") {
            platformFramesParams.profile = "60x30";
            platformFramesParams.sideHolePosX = 55.0;
            if (platformFramesParams.stairType == "рифленая сталь" ||
                  platformFramesParams.stairType == "рифленый алюминий" || platformFramesParams.stairType == "дпк") {
                platformFramesParams.overhang = 0.0;
                //platformFramesParams.width = platformFramesParams.a;
                if (platformFramesParams.M < 1000.0) {
                    platformFramesParams.brigeAmt = 4;
                }
                else {
                    platformFramesParams.brigeAmt = 5;
                }
            }
            else {
                platformFramesParams.overhang = 20.0;
                //platformFramesParams.width = platformFramesParams.a - platformFramesParams.overhang - platformFramesParams.overhang;
                platformFramesParams.brigeAmt = 2;
            }
        }
        else {
            platformFramesParams.profile = "40x20";
            platformFramesParams.sideHolePosX = 45.0;
            platformFramesParams.overhang = 0.0;
            //platformFramesParams.width = platformFramesParams.b;
            platformFramesParams.brigeAmt = 2;
        }

        return platformFramesParams;
    }//end of setPlatformFrameParams


    /**
     * Устанавливает параметры для рамок под ступенями
     * Рамки ступени 40х20 при ширине марша до 1000мм и 60х30 если больше 1000мм
     * Особенности конструктива лестниц с рифленым листом или дпк:
     * кол-во перемычек рамок ступеней 3 шт если ширина марша до 1000мм и 4 шт если больше
     */
    function setMarshFrameParams(marshFramesParams) {
        // overhang              // свес ступени над рамкой
        // sideHolePosX          // расстояние к отверстию от края рамки
        if (model == "лт") {
            if (marshFramesParams.M < 1000.0) {
                marshFramesParams.profile = "40x20";
                marshFramesParams.sideHolePosX = 45.0;
            }
            else {
                marshFramesParams.profile = "60x30";
                marshFramesParams.sideHolePosX = 55.0;
            }
            if (marshFramesParams.stairType == "рифленая сталь" ||
                  marshFramesParams.stairType == "рифленый алюминий" || marshFramesParams.stairType == "дпк") {
                marshFramesParams.overhang = 0.0;
                marshFramesParams.width = marshFramesParams.a;
                if (marshFramesParams.M < 1000.0) {
                    marshFramesParams.brigeAmt = 3;
                }
                else {
                    marshFramesParams.brigeAmt = 4;
                }
            }
            else {
                marshFramesParams.overhang = 20.0;
                marshFramesParams.width = marshFramesParams.a - marshFramesParams.overhang - marshFramesParams.overhang;
                marshFramesParams.brigeAmt = 2;
            }
        }
        else {
            marshFramesParams.profile = "40x20";
            marshFramesParams.sideHolePosX = 45.0;
            marshFramesParams.overhang = 0.0;
            marshFramesParams.width = marshFramesParams.b;
            marshFramesParams.brigeAmt = 2;
        }

        return marshFramesParams;
    }//end of setMarshFrameParams



    /**
     * Отрисовка ступеней марша и подступенков
	 * и дпк
	 * и рифленки
     */
    function drawMarshTreads(treadParams, frameParams) {

        var groupTreads = new THREE.Object3D();
        var groupRisers = new THREE.Object3D();
        var tread, tread2;
        var geometry;
        var wid = treadParams.treadWidth;

        //ступени дпк без выгрузки контура в dxf
        if (treadParams.stairType == "дпк") {
            geometry = new THREE.BoxGeometry(dpcWidth, treadParams.treadThickness, wid);
            for (var i = 0; i < treadParams.stairAmt; i++) {
                //первая доска дпк
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = (treadParams.h * (i + 1) - treadParams.treadThickness / 2);
                tread.position.x = (treadParams.b * i + dpcWidth / 2 + treadParams.xadd);
                tread.position.z = treadParams.M / 2;
                groupTreads.add(tread);
                //вторая доска дпк
                tread2 = new THREE.Mesh(geometry, treadMaterial);
                tread2.position.y = (treadParams.h * (i + 1) - treadParams.treadThickness / 2);
                tread2.position.x = (treadParams.b * i + dpcWidth / 2 + (dpcWidth + dpcDist) + treadParams.xadd);
                tread2.position.z = treadParams.M / 2;
                groupTreads.add(tread2);
            }
        }

        //ступени с выгрузкой в dxf
        if (treadParams.stairType != "дпк") {
            var textHeight = 30;
            var textBasePoint = newPoint_xy(treadParams.dxfBasePoint, 20, -100 - wid * 0.5);
            addText('Ступень', textHeight, dxfPrimitivesArr, textBasePoint);
            addText((treadParams.text === '' ? '' : treadParams.text + ' ') + 'марш', textHeight, dxfPrimitivesArr, newPoint_xy(textBasePoint, 0, -40));

            // контур
            var treadShape = new THREE.Shape();
            var p0 = { "x": 0.0, "y": 0.0 };
            var p1 = newPoint_xy(p0, 0.0, -wid * 0.5);
            var p2 = newPoint_xy(p1, treadParams.a, 0.0);
            var p3 = newPoint_xy(p2, 0.0, wid);
            var p4 = newPoint_xy(p3, -treadParams.a, 0.0);
            addLine(treadShape, dxfPrimitivesArr, p1, p2, treadParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p2, p3, treadParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p3, p4, treadParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p4, p1, treadParams.dxfBasePoint);

            //отверстия для крепления к рамке (только для рифленки)
            if ((treadParams.stairType == "рифленая сталь" || treadParams.stairType == "рифленый алюминий") && treadParams.stringerTurn != "забег") {
                for (var i = 0; i < frameParams.holeCenters.length; i++) {
                    var center = frameParams.holeCenters[i];
                    center.y -= treadParams.M / 2.0 - stringerThickness;
                    var holeRad = 4;
                    addRoundHole(treadShape, dxfPrimitivesArr, center, holeRad, treadParams.dxfBasePoint); //функция в файле drawPrimitives
                }
            }

            var extrudeOptions = {
                amount: treadParams.treadThickness,
                bevelEnabled: false,
                curveSegments: 12,
                steps: 1
            };

            // ступени
            geometry = new THREE.ExtrudeGeometry(treadShape, extrudeOptions);
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            for (var i = 0; i < treadParams.stairAmt; i++) {
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.x = treadParams.b * i + treadParams.xadd;
                tread.position.y = treadParams.h * (i + 1) - treadParams.treadThickness;
                tread.position.z = treadParams.M / 2;
                tread.rotation.set(Math.PI * 1.5, 0.0, 0.0);
                groupTreads.add(tread);
            }//end of for
        }

        // подступенки
        if (treadParams.riserType == "есть") {
            dxfBasePoint = newPoint_xy(dxfBasePoint, 1000, 0);
            var riserParams1 = {
                text: treadParams.text + " марш",
                treadWidth: treadParams.treadWidth,    // определяет длину подступенка
                h: treadParams.h,
                treadThickness: treadParams.treadThickness,
                riserThickness: riserThickness,
                riserSideOffset: riserSideOffset,
                dxfBasePoint: treadParams.dxfBasePoint,
                dxfArr: dxfPrimitivesArr,
                material: treadMaterial,
            };
            for (var i = 0; i < treadParams.riserAmt; i++) {
                riserParams1 = drawRiser(riserParams1);
                var riser = riserParams1.mesh;
                riser.position.x = (treadParams.b * (i - 1) + treadParams.a + treadParams.xadd) - riserThickness;
                riser.position.y = (treadParams.h * i);
                riser.position.z = params.M - riserParams1.riserSideOffset;
                riser.rotation.y = Math.PI / 2;
                groupRisers.add(riser);
                riserParams1.dxfArr = dxfPrimitivesArr0; //остальные подступенки не выводим в dxf
            }
        }

        treadParams.treads = groupTreads;
        treadParams.risers = groupRisers;
        return treadParams;

    }//end of drawMarshTreads


    /**
	 * Отрисовка покрытия площадки
	 * и дпк
	 * и рифленки
	 */
    function drawPlatformCover(coverParams, platformFramesParams) {
        var treadsMarsh = [];

        var tread;
        var geometry;
        var wid = coverParams.platformWidth;
		var widTurn = stringerThickness + treadSideOffset + (coverParams.platformWidth - params.M +
			stringerThickness + stringerThickness + treadSideOffset + treadSideOffset) * (turnFactor - 1) * 0.5;
        var xshift = 0.0;
        if (params.model == "ко") {
            xshift = (coverParams.a - coverParams.b - 40.0);
            widTurn -= stringerThickness * turnFactor;
        }

        // Площадка
        if (coverParams.stairType != "дпк") {
            var textHeight = 30;
            var textBasePoint = newPoint_xy(coverParams.dxfBasePoint, 20, -100 - wid * 0.5);
            addText('Щит', textHeight, dxfPrimitivesArr, textBasePoint);
            addText((coverParams.text === '' ? '' : coverParams.text + ' ') + 'площадка', textHeight, dxfPrimitivesArr, newPoint_xy(textBasePoint, 0, -40));

            var halfPlatformLength = (coverParams.platformLength - treadSideOffset - 5.0) / 2.0;
            // контур
            var treadShape = new THREE.Shape();
            var p0 = { "x": 0.0, "y": 0.0 };
            var p1 = newPoint_xy(p0, 0.0, -wid * 0.5);
            var p2 = newPoint_xy(p1, halfPlatformLength, 0.0);
            var p3 = newPoint_xy(p2, 0.0, wid);
            var p4 = newPoint_xy(p3, -halfPlatformLength, 0.0);
            addLine(treadShape, dxfPrimitivesArr, p1, p2, coverParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p2, p3, coverParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p3, p4, coverParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p4, p1, coverParams.dxfBasePoint);

            //отверстия для крепления к рамке (только для рифленки)
            if ((coverParams.stairType == "рифленая сталь" || coverParams.stairType == "рифленый алюминий") && coverParams.stringerTurn != "забег") {
                for (var i = 0; i < platformFramesParams.holeCenters.length; i++) {
                    var center = platformFramesParams.holeCenters[i];
    				center.y -= treadSideOffset + coverParams.platformWidth / 2.0;
                    var holeRad = 4;
                    addRoundHole(treadShape, dxfPrimitivesArr, center, holeRad, coverParams.dxfBasePoint); //функция в файле drawPrimitives
                }
            }

            var extrudeOptions = {
                amount: coverParams.treadThickness,
                bevelEnabled: false,
                curveSegments: 12,
                steps: 1
            };

            // щит
            var x0 = coverParams.b * coverParams.stairAmt + xshift;
            var y0 = coverParams.h * coverParams.stairAmt;
            geometry = new THREE.ExtrudeGeometry(treadShape, extrudeOptions);
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            //первая половина щита
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.x = x0 + coverParams.xadd;
            tread.position.y = y0 + coverParams.h - coverParams.treadThickness;
            tread.position.z = wid / 2.0 + widTurn;
            tread.rotation.set(Math.PI * 1.5, 0.0, 0.0);
            tread.castShadow = true;
            treadsMarsh.push(tread);
            coverParams.group.add(tread);
            //вторая половина щита
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.x = x0 + coverParams.platformLength / 2.0 + coverParams.xadd;
            tread.position.y = y0 + coverParams.h - coverParams.treadThickness;
            tread.position.z = wid / 2.0 + widTurn;
            tread.rotation.set(Math.PI * 1.5, 0.0, 0.0);
            tread.castShadow = true;
            treadsMarsh.push(tread);
            coverParams.group.add(tread);

            //coverParams.dxfBasePoint.x += halfPlatformLength + coverParams.dxfBasePointStep;
        }
        if (coverParams.stairType == "дпк") {
            var x0 = coverParams.b * coverParams.stairAmt + dpcWidth / 2 + coverParams.xadd + xshift;
            var y0 = coverParams.h * coverParams.stairAmt;
            geometry = new THREE.BoxGeometry(dpcWidth, coverParams.treadThickness, wid);
            var deckAmt = Math.floor(coverParams.platformLength / (dpcWidth + dpcDist))
            for (var i = 0; i < deckAmt; i++) {
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.x = x0 + i * (dpcWidth + dpcDist);
                tread.position.y = y0 + coverParams.h - coverParams.treadThickness / 2;
                tread.position.z = wid / 2.0 + widTurn;
                tread.castShadow = true;
                treadsMarsh.push(tread);
                coverParams.group.add(tread);
				
            }
            //последняя урезанная доска
            var lastDeckWidth = coverParams.platformLength - deckAmt * (dpcWidth + dpcDist) - 5;
            if (lastDeckWidth) {
                ////console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми")
                geometry = new THREE.BoxGeometry(lastDeckWidth, coverParams.treadThickness, wid);
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.x = x0 + deckAmt * (dpcWidth + dpcDist) + (lastDeckWidth - dpcWidth) / 2;
                tread.position.y = y0 + coverParams.h - coverParams.treadThickness / 2;
                tread.position.z = wid / 2.0 + widTurn;
                tread.castShadow = true;
                treadsMarsh.push(tread);
                coverParams.group.add(tread);
            }
        }

        treads.push(coverParams.group);

        return treadsMarsh;
    }//end of drawPlatformCover


    /**
	 * Рамки марша
	 */
    function drawMarshFrames(marshFramesParams) {
        var framesMarsh = [];

        var textHeight = 30;
        var textBasePoint = newPoint_xy(marshFramesParams.dxfBasePoint, 20, -100 - marshFramesParams.M / 2);
        addText('Рамка', textHeight, dxfPrimitivesArr, textBasePoint);
        addText((marshFramesParams.text === '' ? '' : marshFramesParams.text + ' ') + 'марш', textHeight, dxfPrimitivesArr, newPoint_xy(textBasePoint, 0, -40));

        var frameParams = {};
        frameParams.dxfBasePoint = marshFramesParams.dxfBasePoint;
        frameParams.length = ((marshFramesParams.M - stringerThickness - stringerThickness) - stringerSideOffset - stringerSideOffset);
        frameParams.material = metalMaterial2;
        // рамки
        for (ii = 0; ii < marshFramesParams.stairAmt; ii++) {
            frameParams.dxfArr = (ii === 0) ? dxfPrimitivesArr : dxfPrimitivesArr0;

            frameParams.width = marshFramesParams.width;
            frameParams.profile = marshFramesParams.profile; //"40x20";
            frameParams.brigeAmt = marshFramesParams.brigeAmt;

            frame = drawTreadFrame(frameParams);
            var shiftX = (model == "ко") ? marshFramesParams.a - marshFramesParams.b : 5.0 + marshFramesParams.overhang;
            frame.position.x = marshFramesParams.b * ii + shiftX;
            frame.position.y = marshFramesParams.h * ii + marshFramesParams.h - marshFramesParams.treadThickness;
            frame.position.z = stringerSideOffset + stringerThickness;
            framesMarsh.push(frame);
            marshFramesParams.group.add(frame);
        }
        // отверстия в ступени для рифлёнки
        marshFramesParams.holeCenters = marshFramesParams.holeCenters.concat(frameParams.holeCenters);

        angles.push(marshFramesParams.group);

        return framesMarsh;
    }//end of drawMarshFrames


    /**
	 * Рамки площадки
	 */
    function drawPlatformFrames(platformFramesParams) {
        var framesMarsh = [];

        // расчёт рамок под площадкой
        var platformLen;
        var frameParams = {};
        frameParams.dxfBasePoint = platformFramesParams.dxfBasePoint;
        frameParams.material = metalMaterial2;
        if (model == "лт") {
            var platformLen = platformFramesParams.platformLength - platformFramesParams.overhang;

            if (platformFramesParams.stairType !== "рифленая сталь" &&
                    platformFramesParams.stairType !== "рифленый алюминий" && platformFramesParams.stairType !== "дпк") {
                platformLen -= 60.0;  // место для уголка
            }
            platformFramesParams.count = Math.ceil(platformLen / 605.0);
            platformFramesParams.start = platformFramesParams.overhang + 5;
            platformFramesParams.step = platformLen / platformFramesParams.count;
            platformFramesParams.width = platformFramesParams.step - 5.0;
            //var topDistX = topFrameLength - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX;
            frameParams.length = platformFramesParams.treadWidth + treadSideOffset + treadSideOffset;
        }
        if (model == "ко") {
            platformFramesParams.count = 2;
            platformFramesParams.start = platformFramesParams.a - platformFramesParams.b;
            platformFramesParams.step = (platformFramesParams.platformLength - platformFramesParams.b) / 2.0;
            platformFramesParams.width = platformFramesParams.b;
            frameParams.length = ((platformFramesParams.treadWidth) - stringerSideOffset - stringerSideOffset - stringerThickness - stringerThickness);
        }

        var textHeight = 30;
        var textBasePoint = newPoint_xy(platformFramesParams.dxfBasePoint, 20, -100 - platformFramesParams.M / 2);
        addText('Рамка', textHeight, dxfPrimitivesArr, textBasePoint);
        addText((platformFramesParams.text === '' ? '' : platformFramesParams.text + ' ') + 'площадка', textHeight, dxfPrimitivesArr, newPoint_xy(textBasePoint, 0, -40));

        // рамки
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            frameParams.dxfArr = (ii === 0) ? dxfPrimitivesArr : dxfPrimitivesArr0;

            frameParams.width = platformFramesParams.width;
            frameParams.profile = platformFramesParams.profile;
            frameParams.brigeAmt = platformFramesParams.brigeAmt;

            frame = drawTreadFrame(frameParams);
            frame.position.x = platformFramesParams.b * platformFramesParams.stairAmt +
            	platformFramesParams.step * ii + platformFramesParams.start;
            frame.position.y = platformFramesParams.h * (platformFramesParams.stairAmt + 1) - platformFramesParams.treadThickness;
            frame.position.z = platformFramesParams.z + stringerSideOffset + stringerThickness;
            framesMarsh.push(frame);
            platformFramesParams.group.add(frame);
        }
        //platformFramesParams.holeCenters = platformFramesParams.holeCenters.concat(frameParams.holeCenters);
        // отверстия в покрытии площадки для рифлёнки
        // сдвиг отверстий на входной параметр z
        if (platformFramesParams.addHoles) {
            for (var holeCount = 0; holeCount < frameParams.holeCenters.length; holeCount++) {
                frameParams.holeCenters[holeCount].y += platformFramesParams.z * turnFactor;
                platformFramesParams.holeCenters.push(frameParams.holeCenters[holeCount]);
            }
        }

        angles.push(platformFramesParams.group);

        return framesMarsh;
    }//end of drawPlatformFrames




    /*** ПРЯМАЯ ЛЕСТНИЦА  ***/


    if (stairModel == "Прямая") {
        if (stairAmt1 < 2) {
            alert("Невозможно построить одномаршевую лестницу с количеством ступеней меньше ДВУХ");
            return;
        }
        drawStraightStaircase();
    }


    function drawStraightStaircase() {
        var dxfBasePoint = { x: 0.0, y: 0.0 };

        // Массив элементов, которые тркбуют позиционирования и поворота
        // вместе с нижним маршем
        var bottomParts = [];



        // выходные массивы
        var treadsMarsh1;
        var framesMarsh1;
        var carcasMarsh1;
        var anglesMarsh1;
        var railingMarsh1;



        // параметры
        var marshTreadsParams1;
        var platformCoverParams3;
        var marshFramesParams1;
        var platformFramesParams3;
        var stringerParams1;

        var turnParams, turnFramesParams;


        var platformLengthTop;

        if (params.model == "ко") {
            platformLengthTop = platformLength_3;
        }
        else if (params.model == "лт") {
            platformLengthTop = platformLength_3 - stringerThickness;
        }


        // Прямые ступени и подступенки нижнего марша (кроме рифленки)

        marshTreadsParams1 = {
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h1,
            a: params.a1,
            b: params.b1,
            stairType: params.stairType,
            text: "",
            stairAmt: params.stairAmt1,
            xadd: (model == "ко") ? 0.0 : 5.0,
            riserType: riserType,
            riserAmt: (platformTop == "площадка") ? params.stairAmt1 + 1 : params.stairAmt1,
            dxfBasePoint: dxfBasePoint,
			};
        if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
            marshTreadsParams1 = drawMarshTreads(marshTreadsParams1);
            treads.push(marshTreadsParams1.treads);
            risers.push(marshTreadsParams1.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);
			}

            // Покрытие верхней площадки (кроме рифленки)
            platformCoverParams3 = {
                platformLength: platformLengthTop,
                platformWidth: treadWidth,
                treadThickness: treadThickness,
                M: params.M,
                dpcWidth: dpcWidth,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairType: params.stairType,
                text: "верхняя",
                stairAmt: params.stairAmt1,
                xadd: (model == "ко") ? 0.0 : 5.0,
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
				};
	if (platformTop == "площадка") {
            if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.platformLength + dxfBasePointStep, 0);
            }// end if
        }// end if


        if (stairFrame == "есть") {
            // Рамки нижнего марша
            marshFramesParams1 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairType: params.stairType,
                text: "",
                stairAmt: params.stairAmt1,
                holeCenters: [],
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
            marshFramesParams1 = setMarshFrameParams(marshFramesParams1);
            framesMarsh1 = drawMarshFrames(marshFramesParams1);
           // bottomParts.push(marshFramesParams1.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, marshFramesParams1.a + dxfBasePointStep, 0);

            if (platformTop == "площадка") {
                // Рамки верхней площадки
                platformFramesParams3 = {
                    M: params.M,
                    platformLength: platformLengthTop,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h1,
                    a: params.a1,
                    b: params.b1,
                    stairAmt: params.stairAmt1,
                    stairType: params.stairType,
                    text: "верхняя",
                    z: 0.0,
                    addHoles: true,
                    holeCenters: [],
                    group: new THREE.Object3D(),   // группа
                    dxfBasePoint: dxfBasePoint,
                };
                platformFramesParams3 = setPlatformFrameParams(platformFramesParams3);
                framesMarsh3 = drawPlatformFrames(platformFramesParams3);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformFramesParams3.platformLength + dxfBasePointStep, 0);
            }
        } // end if


        /***  КАРКАС ПРЯМОЙ ЛЕСТНИЦЫ  ***/

        // Косоуры нижнего марша
        // Тетивы верхней площадки
        stringerParams1 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: true,
            stairType: stairType,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "floor",
            topEndLength: tyrnLength,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            treadSideOffset: treadSideOffset,
            h: h1,
            b: b1,
            a: a1,
            stairAmt: (platformTop == "площадка") ? params.stairAmt1 + 1 : params.stairAmt1,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
            group: new THREE.Object3D(),      // группа
            groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
            railingModel: railingModel, //модель ограждения
            platformTopRailing: false, //наличие ограждения на верхней площадке
        };
        if (railingModel == "Самонесущее стекло") {
            stringerParams1.stringerLast = false;
			stringerParams1.straight = true;
        }


        drawStrightStringers();

        function drawStrightStringers() {
            if (platformTop == "площадка") {
                stringerParams1.topEnd = "platformG";
                stringerParams1.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams1.topEndLength = b1;
                stringerParams1.platformLength = params.platformLength_3;
            }
			

            /*внутренняя тетива/косоур*/			

            stringerParams1.key = "in";
            //наличие ограждений
            stringerParams1.railingPresence = false;
			if (railingSide_1 === "внутреннее" || railingSide_1 === "две") 
				stringerParams1.railingPresence = true;
			
            //ограждение верхней площадки
            stringerParams1.platformTopRailing = false;
			if(platformTop == "площадка" && turnFactor == 1){
				if (params.topPltRailing_3) stringerParams1.platformTopRailing = true;
				}
			if(platformTop == "площадка" && turnFactor == -1){
				if (params.topPltRailing_4) stringerParams1.platformTopRailing = true;
				}

            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams3, marshFramesParams1);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams3, marshFramesParams1);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = stringerSideOffset;
			if(turnFactor == -1)  stringer1.position.z = -stringerSideOffset - stringerThickness;
            stringer1.castShadow = true;
            carcas.push(stringer1);

			console.log(stringerParams1)

            /*внешняя тетива/косоур*/
			
			stringerParams1.key = "out";
			//наличие ограждений
			stringerParams1.railingPresence = false;
			if (railingSide_1 === "внешнее" || railingSide_1 === "две")
				stringerParams1.railingPresence = true;

				
            //ограждение верхней площадки
            stringerParams1.platformTopRailing = false;
			if(platformTop == "площадка" && turnFactor == 1){
				if (params.topPltRailing_4) stringerParams1.platformTopRailing = true;
				}
			if(platformTop == "площадка" && turnFactor == -1){
				if (params.topPltRailing_3) stringerParams1.platformTopRailing = true;
				}
            

            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams3, marshFramesParams1);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams3, marshFramesParams1);

            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = M - stringerThickness - stringerSideOffset;
            if(turnFactor == -1)  stringer2.position.z = - M + stringerSideOffset;
			stringer2.castShadow = true;
            carcas.push(stringer2);

			console.log(stringerParams1)
			
            /*верхняя площадка*/

            if (platformTop == "площадка") {
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams1, flanMaterial);
                    flanSide.position.x += stringerParams1.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams1.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams1, flanMaterial);
                    flanSide.position.x += stringerParams1.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams1.flanSidePointInsert.y;
                    flanSide.position.z += params.M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + a1 - b1 - 40.0 + params.platformLength_3 - stringerSideOffset,
                        y: h1 * (stairAmt1 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                    };
                    //наличие ограждений
                    stringerParams1.railingPresence = false;
                    if (railingSide_1 !== "нет")
                        stringerParams1.railingPresence = true;
                    //заднее ограждение верхней площадки
                    stringerParams1.platformTopRailing = false;
                    if (params.topPltRailing_5) {
                        stringerParams1.platformTopRailing = true;
                        stringerParams1.key = "rear";
                        stringerParams1.elmIns.rear = {};
                        stringerParams1.elmIns.rear.racks = [];
                    }
                    drawRearStringerKo(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (params.platformLength_3 - stringerSideOffset - b1 - 40.0);
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    stringerParams1.platformLength = params.platformLength_3;
                    stringerParams1.sideLength = (params.platformLength_3 - stringerSideOffset - params.b1 - 40.0);
                    drawSideStringerKo("out", stringerParams1, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams1, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = { x: b1 * stairAmt1 + params.platformLength_3 + 5.0,
                        y: h1 * (stairAmt1 + 1) + 5.0,
                        z: 0.0
                    };
                    //наличие ограждений
                    stringerParams1.railingPresence = false;
                    if (railingSide_1 !== "нет")
                        stringerParams1.railingPresence = true;
                    //заднее ограждение верхней площадки
                    stringerParams1.platformTopRailing = false;
                    if (params.topPltRailing_5) {
                        stringerParams1.platformTopRailing = true;
                        stringerParams1.key = "rear";
                        stringerParams1.elmIns.rear = {};
                        stringerParams1.elmIns.rear.racks = [];
                    }
										stringerParams1.platformEnd = true;//конечная площадка
                    drawRearStringer(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                }
            }
        }// end of drawStrightStringers


        /*** УГОЛКИ МАРША ПРЯМОЙ ЛЕСТНИЦЫ ***/

        // Уголки+перемычки нижнего марша
        // Уголки+перемычки верхней площадки
        drawStraightAngles();

        function drawStraightAngles() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);

            angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }

            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = (params.M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);

            // уголки под ступенями
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams1.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams1.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                    }

                    // перемычки
					//перемычки добавляются в stringerParams1.group внутри функции drawBridgeAngles
                    for (ii = 0; ii < stringerParams1.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams1, stringerParams1.elmIns["out"].briges[ii]);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            if (stringerParams1.divide !== 0) {
                drawFlanConcatAngles(stringerParams1, flanMaterial);
            }

            // верхние уголки
            if (platformTop != "площадка") {
                var topAnglePosition = params.topAnglePosition;
                if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
                    var angleU = drawAngleSupport("У4-70х70х100");
                    angleU.position.x = stringerParams1.elmIns["out"].angleU[0].x;
                    angleU.position.y = stringerParams1.elmIns["out"].angleU[0].y;
                    angleU.position.z = (stringerThickness + stringerSideOffset);
                    angleU.rotation.x = 0.0;
                    angleU.rotation.y = 0.0;
                    angleU.rotation.z = Math.PI * 0.5;
                    angleU.castShadow = true;
                    stringerParams1.groupang.add(angleU);
                    angleU = drawAngleSupport("У4-70х70х100");
                    angleU.position.x = stringerParams1.elmIns["out"].angleU[0].x;
                    angleU.position.y = stringerParams1.elmIns["out"].angleU[0].y + 100.0;
                    angleU.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                    angleU.rotation.x = Math.PI;
                    angleU.rotation.y = 0.0;
                    angleU.rotation.z = Math.PI * 0.5;
                    angleU.castShadow = true;
                    stringerParams1.groupang.add(angleU);
                }
                if (topAnglePosition == "вертикальная рамка") {
                    var topUnitBasePoint = {
                        x: stairAmt1 * b1,
                        y: stairAmt1 * h1,
                        z: 0,
                        rotationY: 0,
                    };
                    if (params.model == "лт") topUnitBasePoint.x = topUnitBasePoint.x - 5;
                    //console.log(topUnitBasePoint.x)
                    var unitParams = {
                        basepoint: topUnitBasePoint,
                        width: M - 2 * stringerThickness,
                        height: 200,
                        stringerSideOffset: stringerSideOffset,
                        model: params.model,
                        treadThickness: treadThickness,
                        stringerThickness: stringerThickness,
                        metalMaterial: metalMaterial,
                        treadMaterial: treadMaterial,
                        M: M,
                        h1: h1,
                        riserThickness: riserThickness,
                        nose: a1 - b1,
                        treadWidth: treadWidth,
                        dxfBasePoint: dxfBasePoint,
                    };

                    var topFixUnit = drawTopFixFrameUnit(unitParams)
                    stringerParams1.groupang.add(topFixUnit.frame);
                    treads.push(topFixUnit.tread);
                    risers.push(topFixUnit.riser);
                }
                /*верхний фланец (только для ЛТ)*/
                if (topFlan == "есть") {
                    var firstPosition_x = (stairAmt1 - 1) * b1 + a1 + 5;
                    var firstPosition_y = stairAmt1 * h1;
                    //var firstPosition_z = 0;
                    var flanLength = firstPosition_y - params.topFlanHolesPosition + 40 + 105 - (stairAmt1 - 1) * h1 + 55;
                    if (stairFrame == "есть") {
                        var frameProfileHeight = 40;
                        flanLength = treadThickness + frameProfileHeight + h1 + 20 - params.topFlanHolesPosition;
                        firstPosition_y = params.stairAmt1 * h1 - treadThickness - frameProfileHeight;
                    }

                    dxfBasePoint = { x: -500, y: 0 };

                    // левый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan = flanParams.mesh;
                    flan.position.x = firstPosition_x;
                    flan.position.y = firstPosition_y + h1 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan.position.y = firstPosition_y;
                    flan.position.z = flanParams.width + stringerThickness;
                    flan.rotation.x = 0;
                    flan.rotation.y = Math.PI * 0.5;
                    stringerParams1.groupang.add(flan);

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    flan2.position.y = firstPosition_y + h1 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan2.position.y = firstPosition_y;
                    flan2.position.z = params.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI * 0.5;
                    stringerParams1.groupang.add(flan2);
                }
            }

        }//end of drawStraightAngles()

        carcas.push(stringerParams1.group);
        angles.push(stringerParams1.groupang);

        dxfBasePoint = newPoint_xy(stringerParams1.dxfBasePoint, dxfBasePointStep, 0);

        if (stairType == "рифленая сталь" || stairType == "рифленый алюминий") {
            // Прямые ступени нижнего марша (рифленки)
            marshTreadsParams1.dxfBasePoint = dxfBasePoint;
            marshTreadsParams1 = drawMarshTreads(marshTreadsParams1, marshFramesParams1);
            treads.push(marshTreadsParams1.treads);
            risers.push(marshTreadsParams1.risers);
            bottomParts.push(marshTreadsParams1.treads);
            bottomParts.push(marshTreadsParams1.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);

            if (platformTop == "площадка") {
                // Покрытие верхней площадки (рифленки)
                platformCoverParams3.dxfBasePoint = dxfBasePoint;
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.a + dxfBasePointStep, 0);
            }
        } // end if


		//позиционирование деталей нижнего марша для левой лестницы
	var bridges = [stringerParams1.group]
	if(turnFactor == -1){
		var botMarsh = [
			treads,
			risers,
			//carcas,
			bridges,
			angles,
			]

		for(var i=0; i<botMarsh.length; i++){
			for(var j=0; j<botMarsh[i].length; j++){
				botMarsh[i][j].position.z = botMarsh[i][j].position.z -M;
				}
			}
		}

        /***  ОГРАЖДЕНИЯ ПРЯМОЙ ЛЕСТНИЦЫ  ***/

        drawStraightRailing();

        function drawStraightRailing() {
            if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {
                var railingSectionParams = {
                    bottomEnd: "нет",
                    platformLengthBottom: 0,
                    topEnd: platformTop,
                    platformLengthTop: platformLength_3,
                    railingSide: "right",
                    stairAmt: stairAmt1,
                    h1: h1,
                    b1: b1,
                    a1: a1,
                    h2: h2,
                    M: M,
                    scale: scale,
                    lastMarsh: true,
                    topConnection: false,
                    bottomConnection: false,
                    rigelAmt: params.rigelAmt,
                    racks: stringerParams1.elmIns["out"].racks,
                    dxfBasePoint: dxfBasePoint,
					dxfBasePointRigel: { x: 0, y: 6000 },
                    dxfBasePointHandrail: { x: 0, y: 3000 },
                    handrail: handrail,
                    textHeight: 30,
                    stringerSideOffset: stringerSideOffset,
                    stringerThickness: stringerThickness,
                    model: model,
                    platformTopRailing: false, //наличие ограждения на верхней площадке
                    topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
                }

                if (model === "лт") railingSectionParams.stringerSideOffset = 0;
				
	
				//внутренняя сторона
				key = "in"
                if(railingSide_1 == "две" || railingSide_1 === "внутреннее") {
					//ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
					if(platformTop == "площадка" && turnFactor == 1){
						if (params.topPltRailing_3) railingSectionParams.platformTopRailing = true;
						}
					if(platformTop == "площадка" && turnFactor == -1){
						if (params.topPltRailing_4) railingSectionParams.platformTopRailing = true;
						}	
					//направление штырьков и ригелей
					railingSectionParams.railingSide = "left";
                    railingSectionParams.racks = stringerParams1.elmIns[key].racks;					
                    var railingSection1 = drawRailingSectionNewel(railingSectionParams);
                    railingSection1.position.z = -40 * turnFactor;
					//if(turnFactor == -1) railingSection1.position.z = 40;
                    railing.push(railingSection1);
                }
				
                //внешняя  сторона
				key = "out";
				if(railingSide_1 == "две" || railingSide_1 === "внешнее") {
					//ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
					if(platformTop == "площадка" && turnFactor == 1){
						if (params.topPltRailing_4) railingSectionParams.platformTopRailing = true;
						}
					if(platformTop == "площадка" && turnFactor == -1){
						if (params.topPltRailing_3) railingSectionParams.platformTopRailing = true;
						}
                    railingSectionParams.racks = stringerParams1.elmIns[key].racks;
                    var railingSection2 = drawRailingSectionNewel(railingSectionParams);
                    railingSection2.position.z = M * turnFactor;
					//if(turnFactor == -1) railingSection2.position.z =  -M - 40;
                    railing.push(railingSection2);
                }

                /*заднее ограждение верхней площадки*/
                if (railingSide_1 !== "нет") {
                    if (platformTop == "площадка" && params.topPltRailing_5) {
                        railingSectionParams.topPltRailing_5 = true;
                        railingSectionParams.platformTopRailing = true;
                        railingSectionParams.racks = stringerParams1.elmIns["rear"].racks;
                        railingSectionParams.railingSide = "left";
                        railingPositionZ = -40 * turnFactor;

                        railingSection2 = drawRailingSectionNewel(railingSectionParams);
                        //railingSection2.position.z = railingPositionZ * scale;

                        railingSection2.rotation.y = -Math.PI / 2 * turnFactor;
                        railingSection2.position.x = b1 * (stairAmt1) * scale + platformLength_3 * scale + 40 + 5;
                        railingSection2.position.y = h1 * (stairAmt1 + 1) * scale + 5;
                        railingSection2.position.z = 0;
                        if (model === "ко") {
                            railingSection2.position.x -= stringerThickness * scale - a1 + b1 + 40;
                            railingSection2.position.y -= 40 + 5;
                        }


                        railing.push(railingSection2);
                    }
                }

                if (backRailing_3 === "есть" && platformTop === "площадка") {

                    var railingSectionPlatformParams = {
                        platformLength: M,
                        offsetLeft: 50,
                        offsetRight: 50,
                        handrailOffsetLeft: 50,
                        handrailOffsetRight: 50,
                        railingSide: "left",
                        scale: scale
                    }

                    var railingSection5 = drawRailingSectionPlatform(railingSectionPlatformParams);

                    railingSection5.rotation.y = -Math.PI / 2;
                    railingSection5.position.x = b1 * (stairAmt1) * scale + platformLength_3 * scale + stringerThickness * scale;
                    if (model === "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
                    railingSection5.position.y = h1 * (stairAmt1 + 1) * scale;
                    railingSection5.position.z = 0;

                    railing.push(railingSection5);
                }

            }

     if (railingModel == "Самонесущее стекло") {
                var railingSectionParams = {
                    bottomEnd: "нет",
                    platformLengthBottom: 0,
                    topEnd: platformTop,
                    platformLengthTop: platformLength_3,
                    railingSide: "right",
                    stairAmt: stairAmt1,
                    h1: h1,
                    b1: b1,
                    a1: a1,
                    h2: h2,
                    scale: scale,
                    lastMarsh: false,
                    topConnection: false,
                    bottomConnection: false,
                    topPltRailing_5: false,
                    platformTopRailing: false,
                    rigelAmt: params.rigelAmt,
                    racks: stringerParams1.elmIns["out"].racks,
                    dxfBasePoint: dxfBasePoint
                }

                if (platformTop === "площадка") {
                    railingSectionParams.stairAmt = stairAmt1 + 1;
                    if (params.topPltRailing_5) {
                        railingSectionParams.topPltRailing_5 = true;
                    }
                }
				
                //внутренняя сторона
				key = "in";
                if (railingSide_1 === "внутреннее" || railingSide_1 === "две") {
					//ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
					if(platformTop == "площадка" && turnFactor == 1){
						if (params.topPltRailing_3) railingSectionParams.platformTopRailing = true;
						}
					if(platformTop == "площадка" && turnFactor == -1){
						if (params.topPltRailing_4) railingSectionParams.platformTopRailing = true;
						}
					//направление рутелей
					railingSectionParams.railingSide = "left";
					//if(turnFactor == -1) railingSectionParams.railingSide = "right";
					railingSectionParams.racks = stringerParams1.elmIns[key].racks;
                    var railingSection1 = drawRailingSectionGlass(railingSectionParams);
                    railingSection1.position.z = -40 * turnFactor;
                    railing.push(railingSection1);
                }
                //внешняя сторона
				key = "out";
                if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
					//ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
					if(platformTop == "площадка" && turnFactor == 1){
						if (params.topPltRailing_4) railingSectionParams.platformTopRailing = true;
						}
					if(platformTop == "площадка" && turnFactor == -1){
						if (params.topPltRailing_3) railingSectionParams.platformTopRailing = true;
						}
                    //направление рутелей
					railingSectionParams.railingSide = "right";
					//if(turnFactor == -1) railingSectionParams.railingSide = "left";
					railingSectionParams.racks = stringerParams1.elmIns[key].racks;
                    var railingSection2 = drawRailingSectionGlass(railingSectionParams);
                    railingSection2.position.z = M * turnFactor;
                    railing.push(railingSection2);
                }

                /*заднее ограждение верхней площадки*/

                if (railingSide_1 !== "нет") {
                    if (platformTop == "площадка" && params.topPltRailing_5) {
                        railingSectionParams.platformLength = M;
                        railingSectionParams.offsetLeft = 50;
                        railingSectionParams.offsetRight = 50;
                        railingSectionParams.handrailOffsetLeft = 50;
                        railingSectionParams.handrailOffsetRight = 50;
                        railingSectionParams.railingSide = "left";
                        railingSectionParams.paltformGlassDeltaY = railingSection2.paltformGlassDeltaY;
                        railingSectionParams.racks = [
                            { x: 93, y: -65 },
                            { x: M - 93, y: -65 }
                        ];

                        var railingSection5 = drawRailingSectionGlassPlatform(railingSectionParams);
                        railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
                        railingSection5.position.x = b1 * (stairAmt1) * scale + platformLength_3 * scale + stringerThickness * scale;
                        if (model === "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness * scale;
                        railingSection5.position.y = h1 * (stairAmt1 + 1) + 5;
                        railingSection5.position.z = 0;
                        railing.push(railingSection5);
                    }
                }
            }
            if (railingModel == "Кованые балясины") {
							var railingSectionParams = {
									bottomEnd: "нет",
									platformLengthBottom: 0,
									topEnd: platformTop,
									platformLengthTop: platformLength_3,
									railingSide: "left",
									stairAmt: stairAmt1,
									h: h1,
									b: b1,
									a: a1,
									scale: scale,
									topPltRail_3: topPltRail_3,
									lastMarsh: true,
									topConnection: false,
									bottomConnection: false,
									connectionLength: 88,
									rigelAmt: params.rigelAmt,
									platformRack: false,
									stringerSideOffset: stringerSideOffset,
									dxfBasePoint: dxfBasePoint,
									handrail: handrail,
									turnFactor: turnFactor,
									text: 'Секция под кованые балясины'
							}

							/* внешняя сторона */
							key = "out"
							var railingSection1, railingSection2;
							if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
								railingSectionParams.railingSide = 'right';
								if(turnFactor == -1) railingSectionParams.railingSide = 'left';
									var racksStringer = [];
									var countRack = 0;
									for (; countRack < stringerParams1.elmIns[key].racks.length; countRack++) {
											racksStringer.push(stringerParams1.elmIns[key].racks[countRack]);
									}
									if (model == "ко" && platformTop == "площадка" && topPltRail_4) {
											var countArr = stringerParams1.elmIns[key].racks.length - 1;
											var point = newPoint_xy(stringerParams1.elmIns[key].racks[countArr], stringerParams1.elmIns['sideStringerKo'].racks[0].x + stringerParams1.b / 2, 0.0);
											racksStringer.push(point);
									}
									railingSectionParams.racks = racksStringer;
									if (topPltRail_4 && platformTop == "площадка") railingSectionParams.lastMarsh = false;
									if (topPltRail_5 && topPltRail_4 && platformTop == "площадка") railingSectionParams.topConnection = true;
									railingSectionParams.connectionLength = model == "ко" ? 148 : 88;
									railingSection1 = drawRailingSectionForge(railingSectionParams);
									railingSection1.position.z = M;
									if(turnFactor == -1) railingSection1.position.z = -M-40;
									railing.push(railingSection1);
									railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
									if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
									railingSectionParams.lastMarsh = true;
									railingSectionParams.topConnection = false;
							}
							/*//внутренняя сторона*/
							key = "in"
							if (railingSide_1 === "внутреннее" || railingSide_1 === "две") {
								railingSectionParams.railingSide = 'left';
								if(turnFactor == -1) railingSectionParams.railingSide = 'right';
									var racksStringer = [];
									var countRack = 0;
									for (; countRack < stringerParams1.elmIns[key].racks.length; countRack++) {
											racksStringer.push(stringerParams1.elmIns[key].racks[countRack]);
									}
									if (model == "ко" && platformTop == "площадка" && topPltRail_3) {
											var countArr = stringerParams1.elmIns[key].racks.length - 1;
											var point = newPoint_xy(stringerParams1.elmIns[key].racks[countArr], stringerParams1.elmIns['sideStringerKo'].racks[0].x + stringerParams1.b / 2, 0.0);
											racksStringer.push(point);
									}
									railingSectionParams.racks = racksStringer;
									if (topPltRail_3 && platformTop == "площадка") railingSectionParams.lastMarsh = false;
									if (topPltRail_5 && topPltRail_3 && platformTop == "площадка") railingSectionParams.topConnection = true;
									railingSectionParams.connectionLength = model == "ко" ? 148 : 88;
									railingSection2 = drawRailingSectionForge(railingSectionParams);
									railingSection2.position.z = -40;
									if(turnFactor == -1) railingSection2.position.z = 0;
									railing.push(railingSection2);
									railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
									if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
									railingSectionParams.topConnection = false;
							}
							//задняя сторона площадки
							if (railingSide_1 !== "нет") {
									if (platformTop == "площадка" && topPltRail_5) {
											railingSectionParams.railingSide = 'left';
											railingSectionParams.racks = stringerParams1.elmIns["rear"].racks;
											railingSectionParams.platformRack = true;
											railingSectionParams.bottomConnection = topPltRail_3 ? true : false;
											railingSectionParams.topConnection = topPltRail_4 ? true : false;
											railingSectionParams.connectionLength = model == 'ко' ? 153 : 110;
											var railingSection5 = drawRailingSectionForge(railingSectionParams);
											railingSection5.rotation.y = -Math.PI / 2;
											railingSection5.position.x = railingSectionParams.platformLengthTop + b1 * (stairAmt1) + 5 + 40;
											railingSection5.position.y = h1 * (stairAmt1 + 1) + 5;
											railingSection5.position.z = 0;
											railing.push(railingSection5);
											railingSectionParams.dxfBasePoint.x += M + 150;
											if (model === "ко") {
													railingSection5.position.x -= stringerThickness - a1 + b1 + 40;
													railingSection5.position.y -= 40 + 5;
													railingSection5.position.z += stringerSideOffset + stringerThickness;
											}
									}
							}
            }


        }//end of drawStraightRailing()
    }//end of drawStraightStairCase()


    /***   Г-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


    if (stairModel == "Г-образная с площадкой" || stairModel == "Г-образная с забегом") {
        drawGStaircase();
    }

    function drawGStaircase() {

        var platformLengthTop;
		var tyrnLength, stringerTurn;

        if (stairModel == "Г-образная с площадкой") {
            stringerTurn = "площадка";
            if (params.model == "ко") {
                tyrnLength = params.M + 50.0;
            }
            if (params.model == "лт") {
                tyrnLength = params.M - stringerThickness + 30.0;
            }
        }

        if (stairModel == "Г-образная с забегом") {
            stringerTurn = "забег";
            if (params.model == "ко") {
                tyrnLength = params.M + 25.0;
            }
            if (params.model == "лт") {
                tyrnLength = params.M - stringerThickness + 31.0;
            }
        }
    	if (params.model == "ко") {
    		platformLengthTop = platformLength_3;
    		}
    	if (params.model == "лт") {
    		platformLengthTop = platformLength_3 - stringerThickness;
    		}


        var dxfBasePoint = { x: 0.0, y: 0.0 };

        // Массив элементов, которые требуют позиционирования и поворота
        // вместе с нижним маршем и вместе с верхним маршем
        var bottomParts = [];
        var topParts = [];


        // выходные массивы
        var treadsMarsh1, treadsMarsh3;
        var framesMarsh1, framesMarsh3;
        var carcasMarsh1, carcasMarsh3;
        var anglesMarsh1, anglesMarsh3;
        var railingMarsh1, railingMarsh3;

        // параметры
        var marshTreadsParams1, marshTreadsParams3;
        var platformCoverParams1, platformCoverParams3;
        var platformFramesParams1, marshFramesParams1;
        var platformFramesParams3, marshFramesParams3;
        var stringerParams1, stringerParams3;

        var turnParams, turnFramesParams;
        var turnParams3;

        // Прямые ступени и подступенки нижнего марша (кроме рифленки)

        marshTreadsParams1 = {
            stringerTurn: stringerTurn,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h1,
            a: params.a1,
            b: params.b1,
            stairType: params.stairType,
            text: "нижний",
            stairAmt: params.stairAmt1,
            xadd: (model == "ко") ? 0.0 : 5.0,
            riserType: riserType,
            riserAmt: params.stairAmt1 + 1,
            dxfBasePoint: dxfBasePoint,
        };
        if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn == "забег") {
            marshTreadsParams1 = drawMarshTreads(marshTreadsParams1);
            treads.push(marshTreadsParams1.treads);
            risers.push(marshTreadsParams1.risers);
            bottomParts.push(marshTreadsParams1.treads);
            bottomParts.push(marshTreadsParams1.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);
        };

        // Покрытие промежуточной площадки (кроме рифленки)
        platformCoverParams1 = {
            stringerTurn: stringerTurn,
            platformLength: tyrnLength,
            platformWidth: treadWidth,
            treadThickness: treadThickness,
            M: params.M,
            dpcWidth: dpcWidth,
            h: params.h1,
            a: params.a1,
            b: params.b1,
            stairType: params.stairType,
            text: "нижняя",
            stairAmt: params.stairAmt1,
            xadd: (model == "ко") ? 0.0 : 5.0,
            group: new THREE.Object3D(),   // группа
            dxfBasePoint: dxfBasePoint,
        };
        if (stringerTurn == "площадка") {
    		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh1 = drawPlatformCover(platformCoverParams1, platformFramesParams1);
                bottomParts.push(platformCoverParams1.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams1.platformLength + dxfBasePointStep, 0);
            }
        }


        /***  Блок забежных ступеней  Г-образная  ***/


        if (stringerTurn == "забег") {
            var turnModel = model;
            if (model == "лт" && stairFrame == "есть") turnModel = "лт стекло";


            // параметры блока забежных ступеней
            var turnParams = {
                model: turnModel,
                stairModel: stairModel,
                marshDist: marshDist,
                M: M,
                h: h3,
                treadThickness: treadThickness,
                stringerThickness: stringerThickness,
                treadSideOffset: treadSideOffset,
                material: timberMaterial,
                turnFactor: turnFactor,
                dxfBasePoint: dxfBasePoint
            }
            if (params.stairType == "стекло") turnParams.material = glassMaterial;

            //отрисовываем блок забежных ступеней
            turnParams = drawTurnSteps(turnParams);

            /*задаем позицию блока забежных ступеней*/
            turnParams.meshes.rotation.y = -Math.PI / 2;
            turnParams.meshes.position.y = h1 * stairAmt1 + h1 - treadThickness;
            turnParams.meshes.position.x = b1 * stairAmt1 + marshTreadsParams1.xadd;
            turnParams.meshes.position.z = (M - stringerThickness - treadSideOffset) * turnFactor;
            if (model == "ко") {
                turnParams.meshes.position.z = M * turnFactor;
                turnParams.meshes.position.x = b1 * (stairAmt1 - 1) + a1 - 40;
            }
            treads.push(turnParams.meshes);


            /* Рамки под забежные ступени лт */

            if (turnModel == "лт стекло") {
                var frameMetalThickness = 8;
                turnFramesParams = {
                    textHeight: 30,
                    M: M,
                    h: h3,
                    marshDist: marshDist,
                    treadThickness: treadThickness,
                    stringerThickness: stringerThickness,
                    treadSideOffset: 5,
                    model: model,
                    stairModel: stairModel,
                    stairType: stairType,
                    metalMaterial: metalMaterial,
                    metalMaterial2: metalMaterial2,
                    turnFactor: turnFactor,
                    dxfBasePoint: dxfBasePoint,
                    treadsPosition: turnParams.treadsPosition,
                    turnSteps: turnParams.params,
                };

                turnFramesParams = drawTurnFramesLt(turnFramesParams, turnParams); //функция в файле drawCarcasPartsLib_2.0.js
                turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
                turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
                turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness/2;
                turnFramesParams.meshes.rotation.y = -Math.PI / 2;
                angles.push(turnFramesParams.meshes);
                //console.log(turnFramesParams.meshes.position.y)
            }

            /* Рамки под забежные ступени ко */

            if (params.model == "ко") {
                //задаем параметры блока рамок забежных ступеней
                var frameMetalThickness = 4;
                turnFramesParams = {
                    textHeight: 30,
                    M: params.M, // - ширина марша
                    stairModel: params.stairModel, // поворот лестницы
                    model: params.model, // модель лестницы: лт или ко
                    marshDist: params.marshDist, //зазор между маршами в плане. Для Г-образной не обязательный параметр
                    stringerThickness: stringerThickness, // - толщина косоура (8мм)
                    treadSideOffset: params.sideOverHang, //  - свес ступени над косоуром сбоку
                    frameMetalThickness: frameMetalThickness, // - толщина металла рамки (4мм)
                    turnFactor: turnFactor, //  - к-т направления поворота: 1 (праваЯ) или -1 (леваЯ)
                    h: params.h3, // подъем ступени
                    stepOffsetFront: 40 + frameMetalThickness, // отступ от передней кромки ступени
                    deltaXFrame: params.sideOverHang + stringerThickness + frameMetalThickness, //смещение по оси Х начальной точки рамки
                    holeRadScrew: 3.5, //радиус отверстий под шурупы
                    holeRadBolt: 6.5, //радиус отверстий под болты
                    heightFlan: 40, //высота фланцев рамки
                    lengthKo: {}, // длины проступи косоуров забежных ступеней
                    stepOff: (a1 - b1 - 40), //отступ от передней кромки ступени
                    material: metalMaterial, // материал рамки
                    material1: metalMaterial2, // материал рамки
                    dxfBasePoint: dxfBasePoint, // базовая точка вставки контуров рамок ступеней
                    turnSteps: turnParams.params, //параметры забежных ступеней
                }

                turnFramesParams = drawTurnFramesKo(turnFramesParams); //функция в файле drawCarcasPartsLib_2.0.js
                turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
                turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
                turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness + stringerThickness;
                turnFramesParams.meshes.rotation.y = -Math.PI / 2;
                angles.push(turnFramesParams.meshes);

            //подступенки забежных ступеней
            if (params.riserType == "есть") {
                var riserParams1 = {
                    h: h3,
                    riserThickness: riserThickness,
                    treadThickness: treadThickness,
                    riserSideOffset: riserSideOffset,
                    dxfBasePoint: dxfBasePoint,
                    material: treadMaterial,
                    text: "2 забежной",
                    dxfArr: dxfPrimitivesArr,
                };
                var tyrnRisers = draw2TurnRisers(riserParams1, turnParams);
                tyrnRisers.position.x = turnParams.meshes.position.x;
                tyrnRisers.position.y = turnParams.meshes.position.y;
                tyrnRisers.position.z = turnParams.meshes.position.z;
                if (turnFactor == -1) tyrnRisers.rotation.y = -Math.PI / 2;
            }
            } //end of params.model == "ко"

            //console.log(turnFramesParams.deltaXFrame)

            /*** УГОЛКИ Г-ОБРАЗНАЯ ЗАБЕГ ***/

            if (stairFrame == "нет") {
                turnParams = drawLtWinderAngles(turnParams, turnFactor); //функция в файле drawCarcasPartsLib_2.0.js

                turnParams.angles.meshes.rotation.y = turnParams.meshes.rotation.y;
                turnParams.angles.meshes.position.x = turnParams.meshes.position.x;
                turnParams.angles.meshes.position.y = turnParams.meshes.position.y;
                turnParams.angles.meshes.position.z = turnParams.meshes.position.z;
                turnParams.angles.meshes.castShadow = true;
                angles.push(turnParams.angles.meshes);
            }
        }//end of stringerTurn == "забег"


        // Прямые ступени и подступенки верхнего марша (кроме рифленки)

    	dxfBasePoint = newPoint_xy(dxfBasePoint, 500, 0);
        marshTreadsParams3 = {
            stringerTurn: stringerTurn,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h3,
            a: params.a3,
            b: params.b3,
            stairType: params.stairType,
            text: "верхний",
            stairAmt: params.stairAmt3,
            xadd: (model == "ко") ? 0.0 : 5.0,
            riserType: riserType,
            riserAmt: (platformTop == "площадка") ? params.stairAmt3 + 1 : params.stairAmt3,
            dxfBasePoint: dxfBasePoint,
        };
        if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn == "забег") {
            marshTreadsParams3 = drawMarshTreads(marshTreadsParams3);
            treads.push(marshTreadsParams3.treads);
            risers.push(marshTreadsParams3.risers);
            topParts.push(marshTreadsParams3.treads);
            topParts.push(marshTreadsParams3.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams3.a + dxfBasePointStep, 0);
        }

            // Покрытие верхней площадки (кроме рифленки)
            platformCoverParams3 = {
                stringerTurn: stringerTurn,
                platformLength: platformLengthTop,
                platformWidth: treadWidth,
                treadThickness: treadThickness,
                M: params.M,
                dpcWidth: dpcWidth,
                h: params.h3,
                a: params.a3,
                b: params.b3,
                stairType: params.stairType,
                text: "верхняя",
                stairAmt: params.stairAmt3,
                xadd: (model == "ко") ? 0.0 : 5.0,
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
        if (platformTop == "площадка") {
			if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);
                topParts.push(platformCoverParams3.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.platformLength + dxfBasePointStep, 0);
            }// end if
        }// end if


        if (stairFrame == "есть") {
            // Рамки нижнего марша
            marshFramesParams1 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairType: params.stairType,
                text: "нижний",
                stairAmt: params.stairAmt1,
                holeCenters: [],
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
            marshFramesParams1 = setMarshFrameParams(marshFramesParams1);
            framesMarsh1 = drawMarshFrames(marshFramesParams1);
            bottomParts.push(marshFramesParams1.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, marshFramesParams1.a + dxfBasePointStep, 0);

            if (stringerTurn == "площадка") {
                // Рамки промежуточной площадки
                platformFramesParams1 = {
                    M: params.M,
                    platformLength: tyrnLength,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h1,
                    a: params.a1,
                    b: params.b1,
                    stairAmt: stairAmt1,
                    stairType: params.stairType,
                    text: "промежуточная",
                    z: 0.0,
                    addHoles: true,
                    holeCenters: [],
                    group: new THREE.Object3D(),   // группа
                    dxfBasePoint: dxfBasePoint,
                };
                platformFramesParams1 = setPlatformFrameParams(platformFramesParams1);
                framesMarsh1 = drawPlatformFrames(platformFramesParams1);
                bottomParts.push(platformFramesParams1.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformFramesParams1.platformLength + dxfBasePointStep, 0);
            }
        } // end if


        /***  КОСОУРЫ Г-ОБРАЗНАЯ НИЖНИЙ МАРШ   ***/

        // Косоуры нижнего марша
        stringerParams1 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "platformG",
            topEndLength: tyrnLength + 15,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            treadSideOffset: treadSideOffset,
            h: h1,
            b: b1,
            a: a1,
            h3: h3,
            stairAmt: stairAmt1 + 1,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
            group: new THREE.Object3D(),      // группа
            groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
            railingModel: railingModel, //модель ограждения
        };

        drawGStringers1();

        function drawGStringers1() {
            if (params.model == "ко") stringerParams1.topEndLength = b1;

            if (params.model == "ко" && stairModel == "Г-образная с забегом") {
                stringerParams1.topEndLength = params.M + 25 - stringerSideOffset;
            }
            stringerParams1.platformLength = M + 40 + 10;
            /*внешняя тетива/косоур нижнего марша*/

            //наличие ограждений
            stringerParams1.railingPresence = false;
            if (railingSide_1 === "внешнее" || railingSide_1 === "две")
                stringerParams1.railingPresence = true;
            //ограждение верхней площадки
            stringerParams1.platformTopRailing = true;

            if (stairModel == "Г-образная с забегом") stringerParams1.topEnd = "winder";
            if (stairModel == "Г-образная с забегом" && stairAmt1 === 0) stringerParams1.botEnd = "winderBot0";
            stringerParams1.key = "out";
            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
            stringer1.castShadow = true;
            carcas.push(stringer1);

            /*внутренняя тетива/косоур нижнего марша*/

            //наличие ограждений
            stringerParams1.railingPresence = false;
            if (railingSide_1 === "внутреннее" || railingSide_1 === "две")
                stringerParams1.railingPresence = true;
            //ограждение верхней площадки
            stringerParams1.platformTopRailing = false;

            if (params.model == "ко" && stairModel == "Г-образная с забегом") {
                stringerParams1.stringerBotOutlength = turnFramesParams.lengthKo.lengthBotOutBend + turnFramesParams.lengthKo.lengthBotOutBend1 + b1 * (stairAmt1 - 1) + a1 - 4;
                stringerParams1.topEndLength = stringerSideOffset - 15 + stringerThickness + 60 + 5;
            }

            stringerParams1.key = "in";
            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = (M - stringerSideOffset - stringerThickness * (1 + turnFactor) * 0.5) * turnFactor;
            stringer2.castShadow = true;
            carcas.push(stringer2);

            /*промежуточная площадка*/
            if (stringerTurn == "площадка") {
                //наличие ограждений
                stringerParams1.railingPresence = false;
                if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
                    stringerParams1.railingPresence = true;
                    stringerParams1.platformTopRailing = true;
                    stringerParams1.key = "rear";
                    stringerParams1.elmIns.rear = {};
                    stringerParams1.elmIns.rear.racks = [];
                }
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams1, flanMaterial);
                    flanSide.position.x += stringerParams1.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams1.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams1, flanMaterial);
                    flanSide.position.x += stringerParams1.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams1.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                p0 = { x: b1 * stairAmt1 + a1 - b1 - 40.0 + tyrnLength - stringerSideOffset,
                        y: h1 * (stairAmt1 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                    };
                    stringerParams1.platformIntermediate = true;//отличие верхней площадки от промежуточной
                    stringerParams1.b3 = params.b3;//необходима для правильного позиционирования отверстия под КБ
                    drawRearStringerKo(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (tyrnLength - stringerSideOffset - b1 - 40.0);
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    //stringerParams1.tyrnLength = tyrnLength;
                    stringerParams1.sideLength = (tyrnLength - stringerSideOffset - params.b1 - 40.0);
                    drawSideStringerKo("in", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (params.model == "лт") {
                    // задняя тетива площадки
                p0 = { x: b1 * stairAmt1 + tyrnLength + 5.0 + stringerThickness,
                        y: h1 * (stairAmt1 + 1) + 5.0,
                        z: 0.0
                    };
										stringerParams1.platformEnd = false;//конечная площадка
                    drawRearStringer(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                }
            }//end of stringerTurn == "площадка"

        }// end of drawGStringers1()


        /*** УГОЛКИ Г-ОБРАЗНАЯ НИЖНИЙ МАРШ ***/

        // Уголки+перемычки нижнего марша
        // Уголки+перемычки промежуточной площадки
        drawGAngles1();

        function drawGAngles1() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = 0.0;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = (M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);

            // фланец крепления частей разделённой тетивы или косоура нижний марш
            if (stringerParams1.divide !== 0) {
                drawFlanConcatAngles(stringerParams1, flanMaterial);
            }

            // уголки под ступенями нижний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней нижний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams1.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams1.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                    }

                    // перемычки нижний марш
                    for (ii = 0; ii < stringerParams1.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams1, stringerParams1.elmIns["out"].briges[ii]);
                    }

                    if (stringerTurn == "площадка") {
                        // дополнительные уголки на перемычке под площадкой
                        // уголки крепления ступени
                        var p0 = stringerParams1.elmIns["out"].briges[ii - 1];
                        var angle1 = drawAngleSupport("У2-40х40х200");
                        angle1.position.x = p0.x;
                        angle1.position.y = p0.y;
                        angle1.position.z = stringerThickness + 105.0;
                        angle1.rotation.x = Math.PI * 0.5;
                        angle1.rotation.y = 0.0;
                        angle1.rotation.z = Math.PI * 0.5;
                        angle1.castShadow = true;
                        stringerParams1.groupang.add(angle1);
                        angle1 = drawAngleSupport("У2-40х40х200");
                        angle1.position.x = p0.x;
                        angle1.position.y = p0.y;
                        angle1.position.z = stringerThickness + treadWidth - 200.0 - 105.0;
                        angle1.rotation.x = Math.PI * 0.5;
                        angle1.rotation.y = 0.0;
                        angle1.rotation.z = Math.PI * 0.5;
                        angle1.castShadow = true;
                        stringerParams1.groupang.add(angle1);
                    }
                }
            }

        }//end of drawGAngles1()

        carcas.push(stringerParams1.group);
        angles.push(stringerParams1.groupang);

        bottomParts.push(stringerParams1.group);
        bottomParts.push(stringerParams1.groupang);

        if (stairFrame == "есть") {
            // Рамки верхнего марша
            marshFramesParams3 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h3,
                a: params.a3,
                b: params.b3,
                stairType: params.stairType,
                text: "верхний",
                stairAmt: params.stairAmt3,
                holeCenters: [],
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
            marshFramesParams3 = setMarshFrameParams(marshFramesParams3);
            framesMarsh3 = drawMarshFrames(marshFramesParams3);
            topParts.push(marshFramesParams3.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, a3, 0);

            if (platformTop == "площадка") {
                // Рамки верхней площадки
                platformFramesParams3 = {
                    M: params.M,
                    platformLength: platformLengthTop,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h3,
                    a: params.a3,
                    b: params.b3,
                    stairAmt: stairAmt3,
                    stairType: params.stairType,
                    text: "верхняя",
                    z: 0.0,
                    addHoles: true,
                    holeCenters: [],
                    group: new THREE.Object3D(),   // группа
                    dxfBasePoint: dxfBasePoint,
                };
                platformFramesParams3 = setPlatformFrameParams(platformFramesParams3);
                framesMarsh3 = drawPlatformFrames(platformFramesParams3);
                topParts.push(platformFramesParams3.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformLengthTop, 0);
            }
        }


        /*** КОСОУРЫ Г-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

        // Косоуры верхнего марша
        stringerParams3 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: true,
            stairType: stairType,
            botEnd: "platformG",
            botEndLength: tyrnLength,   // и для ЛТ и для КО длина нижней части не зависит от глубины площадки
            topEnd: "floor",
            topEndLength: 0,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            treadSideOffset: treadSideOffset,
            h: h3,
            b: b3,
            a: a3,
            h1: h1,
            stairAmt: (platformTop == "площадка") ? params.stairAmt3 + 1 : params.stairAmt3,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
            group: new THREE.Object3D(),      // группа
            groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
            railingModel: railingModel, //модель ограждения
        };

        drawGStringers3();

        function drawGStringers3() {
            if (platformTop == "площадка") {
                stringerParams3.topEnd = "platformG";
                stringerParams3.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams3.topEndLength = b3;
                stringerParams3.platformLength = params.platformLength_3;
            }

            // и для ЛТ и для КО длина нижней части не зависит от глубины площадки

            if (params.model == "лт") stringerParams.botEndLength = tyrnLength + 15.0;
            if (params.model == "ко") stringerParams3.botEndLength = 300;

            /*внешняя тетива/косоур верхнего марша*/

            //наличие ограждений
            stringerParams3.railingPresence = false;
            if ((railingSide_3 === "внешнее" && turnFactor > 0) ||(railingSide_3 === "внутреннее" && turnFactor < 0) || railingSide_3 === "две")
                stringerParams3.railingPresence = true;
            //ограждение верхней площадки
            stringerParams3.platformTopRailing = false;
            if (platformTop == "площадка" && params.topPltRailing_3)
                stringerParams3.platformTopRailing = true;

            if (stairModel == "Г-образная с забегом") stringerParams3.botEnd = "winder";
            stringerParams3.key = turnFactor > 0 ? "out" : "in";
            if (params.model == "лт") drawStringerLt(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams3.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer3 = new THREE.Mesh(geom, stringerMaterial);
            stringer3.position.set(0, 0.0, (stringerSideOffset));
            stringer3.castShadow = true;
            stringerParams3.group.add(stringer3);

            /*внутренняя тетива/косоур верхнего марша*/

            //наличие ограждений
            stringerParams3.railingPresence = false;
            if ((railingSide_3 === "внутреннее" && turnFactor > 0) || (railingSide_3 === "внешнее" && turnFactor < 0) || railingSide_3 === "две")
                stringerParams3.railingPresence = true;
            //ограждение верхней площадки
            stringerParams3.platformTopRailing = false;
            if (platformTop == "площадка" && params.topPltRailing_4)
                stringerParams3.platformTopRailing = true;

            stringerParams3.key = turnFactor > 0 ? "in" : "out";
            if (params.model == "лт") drawStringerLt(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams3.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer4 = new THREE.Mesh(geom, stringerMaterial);
            stringer4.position.set(0.0, 0.0, (M - stringerSideOffset - stringerThickness));
            stringer4.castShadow = true;
            stringerParams3.group.add(stringer4);

            /*верхняя площадка*/

            if (platformTop == "площадка") {
                //наличие ограждений
                stringerParams3.railingPresence = false;
                if (railingSide_3 !== "нет")
                    stringerParams3.railingPresence = true;
                //заднее ограждение верхней площадки
                stringerParams3.platformTopRailing = false;
                if (params.topPltRailing_5) {
                    stringerParams3.platformTopRailing = true;
                    stringerParams3.key = "rear";
                    stringerParams3.elmIns.rear = {};
                    stringerParams3.elmIns.rear.racks = [];
                }
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams3, flanMaterial);
                    flanSide.position.x += stringerParams3.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams3.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams3, flanMaterial);
                    flanSide.position.x += stringerParams3.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams3.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b3 * stairAmt3 + a3 - b3 - 40.0 + params.platformLength_3 - stringerSideOffset,
                        y: h3 * (stairAmt3 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                    };
                    drawRearStringerKo(stringerParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (params.platformLength_3 - stringerSideOffset - b3 - 40.0);
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    stringerParams3.sideLength = (platformLength_3 - stringerSideOffset - params.b3 - 40.0);
                    drawSideStringerKo("out", stringerParams3, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams3, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = { x: b3 * stairAmt3 + params.platformLength_3 + 5.0,
                        y: h3 * (stairAmt3 + 1) + 5.0,
                        z: 0.0
                    };
										stringerParams3.platformEnd = true;//конечная площадка
                    drawRearStringer(stringerParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
            }
        }//end of drawGStringers3()


        /*** УГОЛКИ Г-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

        // Уголки+перемычки верхнего марша
        // Уголки+перемычки верхней площадки
        drawGAngles3();

        function drawGAngles3() {
            // уголки крепления к нижнему маршу (площадке)
            if (stringerTurn == "площадка") {
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns["out"].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns["out"].angleB[0].y - 100.0;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);
            }
            if (stringerTurn == "забег") {
                if (turnFactor > 0) { var key1 = "out"; var key2 = "in"; } else { var key1 = "in"; var key2 = "out"; }
                //уголки соединения внешних тетив
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key1].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns[key1].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);

                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key1].angleB[1].x;
                angleB.position.y = stringerParams3.elmIns[key1].angleB[1].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);

                //уголки соединения внутренних тетив
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key2].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns[key2].angleB[0].y - 100;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);

                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key2].angleB[1].x;
                angleB.position.y = stringerParams3.elmIns[key2].angleB[1].y - 100;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);
            }

            // уголки под ступенями верхний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней верхний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams3.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams3.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams3.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams3.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams3.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams3.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams3.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams3.groupang.add(angle2);
                    }

                    // перемычки верхний марш
                    for (ii = 0; ii < stringerParams3.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams3, stringerParams3.elmIns["out"].briges[ii]);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            // верхний марш
            if (stringerParams3.divide !== 0) {
                drawFlanConcatAngles(stringerParams3, flanMaterial);
            }

            // верхние уголки
            if (platformTop != "площадка") {
                var topAnglePosition = params.topAnglePosition;
                if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
                    if (stringerParams3.elmIns["out"].angleU[0] !== undefined) {
                        var angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams3.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams3.elmIns["out"].angleU[0].y;
                        angleU.position.z = (stringerThickness + stringerSideOffset);
                        angleU.rotation.x = 0.0;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        stringerParams3.groupang.add(angleU);
                        angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams3.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams3.elmIns["out"].angleU[0].y + 100.0;
                        angleU.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                        angleU.rotation.x = Math.PI;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        stringerParams3.groupang.add(angleU);
                    }
                }
                if (topAnglePosition == "вертикальная рамка") {
                    var topUnitBasePoint = {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotationY: 0,
                    };
                    if (params.model == "лт") topUnitBasePoint.x = topUnitBasePoint.x - 5;
                    //console.log(topUnitBasePoint.x)
                    var unitParams = {
                        basepoint: topUnitBasePoint,
                        width: M - 2 * stringerThickness,
                        height: 200,
                        stringerSideOffset: stringerSideOffset,
                        model: params.model,
                        treadThickness: treadThickness,
                        stringerThickness: stringerThickness,
                        metalMaterial: metalMaterial,
                        treadMaterial: treadMaterial,
                        M: M,
                        h1: h3,
                        riserThickness: riserThickness,
                        nose: a3 - b3,
                        treadWidth: treadWidth,
                        dxfBasePoint: dxfBasePoint,
                    };
                    var topFixUnit = drawTopFixFrameUnit(unitParams);
//                    var complexUnit = topFixUnit.complexUnit;
//                    complexUnit.position.x = stairAmt1 * b1 + M + 25.0;
//                    complexUnit.position.y = (stairAmt1 + 1) * h1 + stairAmt3 * h3;
//                    complexUnit.position.z = (stairAmt3 * b3 + M - (a3 - b3)) * turnFactor;
//                    if (params.model == "лт") {
//                        complexUnit.position.x += 10.0;
//                        complexUnit.position.y -= 25.0;
//                        complexUnit.position.z += ((a3 - b3) - 40.0) * turnFactor
//                    }
//                    if (turnFactor == -1) complexUnit.position.x = complexUnit.position.x - M;
//                    complexUnit.rotation.y = -Math.PI / 2 * turnFactor
//                    angles.push(complexUnit);
                    var complexUnit = topFixUnit.complexUnit;
                    if (params.model == "лт") {
                        complexUnit.position.y = stairAmt3 * h3 - 25.0;
                        complexUnit.position.x = stairAmt3 * b3;
                    }
                    if (params.model == "ко") {
                        complexUnit.position.y = stairAmt3 * h3;
                        complexUnit.position.x = stairAmt3 * b3;
                    }
                    stringerParams3.groupang.add(complexUnit);
                }
                /*верхний фланец (только для ЛТ)  */
                if (topFlan == "есть") {
                    var firstPosition_x = (params.stairAmt3 - 1) * b3 + a3 + 5;  // -35
                    var firstPosition_y = params.stairAmt3 * h3 - 5;
                    //var firstPosition_z = 0;
                    var flanLength = firstPosition_y - params.topFlanHolesPosition + 40 + 105 - (params.stairAmt3 - 1) * h3 + 60;
                    if (stairFrame == "есть") {
                        var frameProfileHeight = 40;
                        flanLength = treadThickness + frameProfileHeight + h3 + 20 - params.topFlanHolesPosition;
                        firstPosition_y = params.stairAmt3 * h3 - treadThickness - frameProfileHeight - 5;
                    }

                    // левый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan = flanParams.mesh;
                    flan.position.x = firstPosition_x;
                    flan.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan.position.y = firstPosition_y;
                    flan.position.z = flanParams.width + stringerThickness;
                    flan.rotation.x = 0;
                    flan.rotation.y = Math.PI * 0.5;
                    //console.log(flan.position)
                    stringerParams3.groupang.add(flan);

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    flan2.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan2.position.y = firstPosition_y;
                    flan2.position.z = params.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI * 0.5;
                    stringerParams3.groupang.add(flan2);
                }
            }

        }//end of drawGAngles3()

        carcas1.push(stringerParams3.group);
        angles.push(stringerParams3.groupang);

        topParts.push(stringerParams3.group);
        topParts.push(stringerParams3.groupang);

        dxfBasePoint = newPoint_xy(stringerParams3.dxfBasePoint, dxfBasePointStep, 0);

        //покрытие ступеней и площадок из рифленки

        if ((stairType == "рифленая сталь" || stairType == "рифленый алюминий")) {
         	if (stringerTurn != "забег") {
            // Прямые ступени нижнего марша (рифленки)
            marshTreadsParams1.dxfBasePoint = dxfBasePoint;
            marshTreadsParams1 = drawMarshTreads(marshTreadsParams1, marshFramesParams1);
            treads.push(marshTreadsParams1.treads);
            risers.push(marshTreadsParams1.risers);
            bottomParts.push(marshTreadsParams1.treads);
            bottomParts.push(marshTreadsParams1.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);

            // Покрытие промежуточной площадки (рифленки)
            platformCoverParams1.dxfBasePoint = dxfBasePoint;
            treadsMarsh1 = drawPlatformCover(platformCoverParams1, platformFramesParams1);
            bottomParts.push(platformCoverParams1.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams1.platformLength + dxfBasePointStep, 0);

            // Прямые ступени верхнего марша (рифленки)
            marshTreadsParams3.dxfBasePoint = dxfBasePoint;
            marshTreadsParams3 = drawMarshTreads(marshTreadsParams3, marshFramesParams3);
            treads.push(marshTreadsParams3.treads);
            risers.push(marshTreadsParams3.risers);
            topParts.push(marshTreadsParams3.treads);
            topParts.push(marshTreadsParams3.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams3.a + dxfBasePointStep, 0);
    		}

            // Покрытие верхней площадки (рифленки)
            if (platformTop == "площадка") {
                platformCoverParams3.dxfBasePoint = dxfBasePoint;
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);
                topParts.push(platformCoverParams3.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.a + dxfBasePointStep, 0);
            }
        } // end if



        // установка позиции нижнего марша (при повороте верхнего)
        for (i = 0; i < bottomParts.length; i++) {
            bottomParts[i].position.z += params.M * (turnFactor - 1) * 0.5;
        }

        // установка позиции верхнего марша
        var pos = {
            x: params.b1 * params.stairAmt1 + params.M * (1 + turnFactor) * 0.5 + (params.model == "лт" ? 35.0 : 10.0 + params.a1 - params.b1),
            y: params.h1 * (params.stairAmt1 + 1),
            z: (params.M - (params.model == "лт" ? 40.0 : params.a3 - params.b3)) * turnFactor
        };
        if (stringerTurn == "забег") {
            if (params.model == "лт" && params.stairFrame == "нет") {
                pos.x += 1.0;
                pos.y += params.h3 * 2;
                pos.z += 40.0 * turnFactor;
            }
            if (params.model == "лт" && params.stairFrame == "есть") {
                pos.x += 40.0;
                pos.y += params.h3 * 2;
                pos.z += 40.0 * turnFactor;
            }
            if (params.model == "ко") {
				pos.x = params.b1 * (params.stairAmt1 - 1) + params.a1 - 15 + params.M * (1 + turnFactor) * 0.5;
				//if(turnFactor == -1) pos.x = params.b1 * (params.stairAmt1 - 1) + params.a1 - 15// + 4;
                pos.y += params.h3 * 2;
                pos.z = (params.M - (params.a3 - params.b3) + 72) * turnFactor;
            }

        }



        var rot = Math.PI * 0.5 * turnFactor;
        for (i = 0; i < topParts.length; i++) {
            topParts[i].position.x += pos.x;
            topParts[i].position.y += pos.y;
            topParts[i].position.z += pos.z;
            topParts[i].rotation.y -= rot;
        }



        /***  ОГРАЖДЕНИЯ Г-ОБРАЗНАЯ  ***/

        drawGRailing();

        function drawGRailing() {
            if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {
                var railingSectionParams = {
                    bottomEnd: "нет",
                    platformLengthBottom: 0,
                    topEnd: platformTop,
                    platformLengthTop: M,
                    railingSide: "left",
                    stairAmt: stairAmt1,
                    h1: h1,
                    b1: b1,
                    a1: a1,
                    h2: h2,
                    M: M,
                    scale: scale,
                    lastMarsh: true,
                    topConnection: false,
                    bottomConnection: false,
                    rigelAmt: params.rigelAmt,
                    racks: stringerParams1.elmIns["out"].racks,
                    dxfBasePointRigel: { x: 0, y: 6000 },
                    dxfBasePointHandrail: { x: 0, y: 3000 },
                    handrail: handrail,
                    textHeight: 30,
                    stringerSideOffset: stringerSideOffset,
                    stringerThickness: stringerThickness,
                    model: model,
                    stairModel: stairModel,
                    turnFactor: turnFactor,
                    platformTopRailing: false, //наличие ограждения на верхней площадке
                    topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
                }

                /*замыкание поручней внешних секций верхнего и нижнего маршей*/
                var outerHandrailConnection = false;
                var isSection1 = false;
                var isSection3 = false;
                if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
                if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
                if (isSection1 && isSection3) outerHandrailConnection = true;
                railingSectionParams.lastMarsh = false;

                if (model === "лт") railingSectionParams.stringerSideOffset = 0;
                var railingPositionZ = M * turnFactor;

                /*внешняя сторона нижнего марша*/
                var railingSection1;
                if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
                    railingSectionParams.topEnd = "площадка";
                    //if (stairModel == "Г-образная с забегом") railingSectionParams.topEnd = "забег";
                    railingSectionParams.topConnection = outerHandrailConnection;
                    railingSectionParams.bottomConnection = false;
                    railingSectionParams.platformLengthTop = M + 30;
                    if (model == "ко") railingSectionParams.platformLengthTop = M + 50;
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = true;
                    railingSectionParams.racks = stringerParams1.elmIns["out"].racks;
                    railingPositionZ = -40 * turnFactor;
                    railingSection1 = drawRailingSectionNewel(railingSectionParams);
                    railingSection1.position.z = railingPositionZ * scale;
                    railing.push(railingSection1);
                }

                /*внутренняя сторона нижнего марша*/

                if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
                    railingSectionParams.topEnd = "нет";
                    railingSectionParams.bottomEnd = "нет";
                    railingSectionParams.platformLengthBottom = 0;
                    railingSectionParams.platformLengthTop = 0;
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
                    railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
                    railingSectionParams.railingSide = "right";
                    railingPositionZ = M * turnFactor;
                    var railingSection2 = drawRailingSectionNewel(railingSectionParams);
                    railingSection2.position.z = railingPositionZ * scale;
                    railing.push(railingSection2);
                }


                /*верхний марш*/
                railingSectionParams.lastMarsh = true;

                var topPltRailing_3 = params.topPltRailing_3;
                var topPltRailing_4 = params.topPltRailing_4;

                if (turnFactor < 0) {
                    topPltRailing_3 = params.topPltRailing_4;
                    var topPltRailing_4 = params.topPltRailing_3;
                }

                railingSectionParams.a1 = a3;
                railingSectionParams.b1 = b3;
                railingSectionParams.h1 = h3;
                railingSectionParams.stairAmt = stairAmt3;

                /*внешняя сторона верхнего марша*/

                if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
                    railingSectionParams.topEnd = platformTop;
                    //railingSectionParams.bottomEnd = "площадка";
                    railingSectionParams.topConnection = false;
                    railingSectionParams.bottomConnection = outerHandrailConnection;
                    railingSectionParams.platformLengthTop = platformLength_3;
                    railingSectionParams.railingSide = "left";
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
                    if (platformTop == "площадка" && topPltRailing_3)
                        railingSectionParams.platformTopRailing = true;
                    railingSectionParams.racks = stringerParams3.elmIns["out"].racks;

                    var railingSection3 = drawRailingSectionNewel(railingSectionParams);

                    railingSection3.rotation.y = (-Math.PI / 2) * turnFactor;
                    railingSection3.position.x = b1 * (stairAmt1) * scale + M + 40 * 2 - 5;
                    railingSection3.position.y = h1 * (stairAmt1 + 1);
                    railingSection3.position.z = (M - 40) * turnFactor;
                    if (stairModel == "Г-образная с забегом") {
                        railingSection3.position.y += 2 * h3;
                        railingSection3.position.x += 40;
                        railingSection3.position.z += 40 * turnFactor;
                        if (model == "лт" && stairFrame == "нет") {
                            railingSection3.position.x -= 40;
                        }
                    }
                    if (model == "ко") {
                        railingSection3.position.x += a1 - b1 - 40 + stringerThickness + 5;
                        railingSection3.position.z -= (a3 - b3 - 40) * turnFactor;
                        if (stairModel == "Г-образная с забегом") {
                            railingSection3.position.x -= 40 + 24;
                            railingSection3.position.z += (40 - stringerThickness) * turnFactor;
                        }
                    }
                    railing.push(railingSection3);
                }

                /*внутренняя сторона верхнего марша*/

                if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
                    railingSectionParams.topEnd = platformTop;
                    railingSectionParams.bottomEnd = "нет";
                    railingSectionParams.platformLengthBottom = 0;
                    railingSectionParams.platformLengthTop = platformLength_3;
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
                    if (platformTop == "площадка" && topPltRailing_4)
                        railingSectionParams.platformTopRailing = true;

                    railingSectionParams.racks = stringerParams3.elmIns["in"].racks;
                    railingSectionParams.railingSide = "right";

                    var railingSection4 = drawRailingSectionNewel(railingSectionParams);

                    railingSection4.rotation.y = -Math.PI / 2 * turnFactor;
                    railingSection4.position.x = b1 * (stairAmt1) * scale + 40 - 5;
                    railingSection4.position.y = h1 * (stairAmt1 + 1);
                    railingSection4.position.z = (M - 40) * turnFactor;
                    if (stairModel == "Г-образная с забегом") {
                        railingSection4.position.y += 2 * h3;
                        railingSection4.position.x += 40;
                        railingSection4.position.z += 40 * turnFactor;
                        if (model == "лт" && stairFrame == "нет") {
                            railingSection4.position.x -= 40;
                        }
                    }

                    if (model == "ко") {
                        railingSection4.position.x += a1 - b1 - 40 + stringerThickness + 5;
                        railingSection4.position.z -= (a3 - b3 - 40) * turnFactor;
                        if (stairModel == "Г-образная с забегом") {
                            railingSection4.position.x -= 40 + 24;
                            railingSection4.position.z += (40 - stringerThickness) * turnFactor;
                        }
                    }

                    railing.push(railingSection4);
                }

                /*заднее ограждение промежуточной площадки*/
                if (!(stairModel == "Г-образная с забегом")) {
                    if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
                        railingSectionParams.h1 = h1;
                        railingSectionParams.stairAmt = stairAmt1;
                        railingSectionParams.topEnd = "площадка";
                        railingSectionParams.topPltRailing_5 = true;
                        railingSectionParams.platformTopRailing = true;
                        railingSectionParams.topConnection = true;
                        railingSectionParams.lastMarsh = false;
                        railingSectionParams.racks = stringerParams1.elmIns["rear"].racks;
                        railingSectionParams.railingSide = "left";
                        railingPositionZ = -40 * turnFactor;

                        var railingSection5 = drawRailingSectionNewel(railingSectionParams);

                        railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
                        railingSection5.position.x = b1 * (stairAmt1) * scale + M * scale + 40 * 2 - 5;
                        railingSection5.position.y = h1 * (stairAmt1 + 1) * scale + 5;
                        railingSection5.position.z = 0;
                        if (model === "ко") {
                            railingSection5.position.x += a1 - b1 - 40 + stringerThickness + 5;
                            railingSection5.position.y -= 40 + 5;
                        }
                        railing.push(railingSection5);
                    }
                }

                /*заднее ограждение верхней площадки*/
                if (railingSide_3 !== "нет") {
                    if (platformTop == "площадка" && params.topPltRailing_5) {
                        railingSectionParams.h1 = h3;
                        railingSectionParams.stairAmt = stairAmt3;
                        railingSectionParams.topPltRailing_5 = true;
                        railingSectionParams.platformTopRailing = true;
                        railingSectionParams.topConnection = false;
                        railingSectionParams.lastMarsh = true;
                        railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
                        railingSectionParams.railingSide = "left";

                        var railingSection6 = drawRailingSectionNewel(railingSectionParams);

                        railingSection6.rotation.y = -Math.PI * turnFactor;
                        railingSection6.position.x = b1 * (stairAmt1) * scale + M + 40 - 5;
                        railingSection6.position.y = h1 * (stairAmt1 + 1) * scale + 5 + h3 * (stairAmt3 + 1);
                        railingSection6.position.z = (M + b3 * (stairAmt3) * scale + platformLength_3 * scale + 5) * turnFactor;
                        if (stairModel == "Г-образная с забегом") {
                            railingSection6.position.y += 2 * h3;
                            railingSection6.position.x += 40;
                            railingSection6.position.z += 40 * turnFactor;
                        }
                        if (model === "ко") {
                            railingSection6.position.x += a1 - b1 - 40 + stringerThickness * 2;
                            railingSection6.position.z -= stringerThickness;
                            railingSection6.position.y -= 40 + 5;
                            if (stairModel == "Г-образная с забегом") {
                                railingSection6.position.x -= 40 + 24;
                                railingSection6.position.z += (40 - 8) * turnFactor;
                            }
                        }
                        railing.push(railingSection6);
                    }
                }
            }
            if (railingModel == "Стекло на стойках") {


            }
	        if (railingModel == "Самонесущее стекло") {
				var railingSectionParams = {
    	            bottomEnd: "нет",
    	            platformLengthBottom: 0,
    	            topEnd: platformTop,
    	            platformLengthTop: M,
    	            railingSide: "left",
    	            stairAmt: stairAmt1 + 1,
    	            h1: h1,
    	            b1: b1,
    	            a1: a1,
    	            h2: h2,
    	            h3: h3,
					b3: b3,
    	            a3: a3,
    	            M: M,
    	            scale: scale,
    	            lastMarsh: true,
    	            topConnection: false,
    	            bottomConnection: false,
    	            rigelAmt: params.rigelAmt,
    	            racks: stringerParams1.elmIns["out"].racks,
    	            dxfBasePoint: dxfBasePoint,
    	            handrail: handrail,
    	            textHeight: 30,
    	            stringerSideOffset: stringerSideOffset,
    	            stringerThickness: stringerThickness,
    	            model: model,
    	            platformTopRailing: false, //наличие ограждения на верхней площадке
    	            topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
    	        }

    	        /*замыкание поручней внешних секций верхнего и нижнего маршей*/
    	        var outerHandrailConnection = false;
    	        var isSection1 = false;
    	        var isSection3 = false;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
    	        if (isSection1 && isSection3) outerHandrailConnection = true;
    	        railingSectionParams.lastMarsh = false;

    	        if (model === "лт") railingSectionParams.stringerSideOffset = 0;
    	        var railingPositionZ = M * turnFactor;

    	        /*внешняя сторона нижнего марша*/
    	        var railingSection1;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "площадка";
    	            if (stairModel == "Г-образная с забегом") railingSectionParams.topEnd = "забег";
    	            railingSectionParams.topConnection = outerHandrailConnection;
    	            railingSectionParams.bottomConnection = false;
    	            railingSectionParams.platformLengthTop = M + 30;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = true;
					railingSectionParams.topPltRailing_5 = true;
    	            railingSectionParams.racks = stringerParams1.elmIns["out"].racks;
    	            railingPositionZ = -40 * turnFactor;
    	            railingSection1 = drawRailingSectionGlass(railingSectionParams);
    	            railingSection1.position.z = railingPositionZ * scale;
    	            railing.push(railingSection1);
					railingSectionParams.paltformGlassDeltaY = railingSection1.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }
				
				/*внутренняя сторона нижнего марша*/

    	        if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "нет";
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = 0;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";
    	            railingPositionZ = M * turnFactor;
    	            var railingSection2 = drawRailingSectionGlass(railingSectionParams);
    	            railingSection2.position.z = railingPositionZ * scale;
    	            railing.push(railingSection2);
					railingSectionParams.paltformGlassDeltaY = railingSection2.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/
				
				/*заднее ограждение промежуточной площадки*/
				
    	        if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
					if (stairModel != "Г-образная с забегом") {
    	            railingSectionParams.h1 = h1;
    	            railingSectionParams.stairAmt = stairAmt1;
    	            railingSectionParams.topEnd = "площадка";
    	            railingSectionParams.topPltRailing_5 = true;
    	            railingSectionParams.platformTopRailing = true;
    	            railingSectionParams.topConnection = true;
    	            railingSectionParams.lastMarsh = false;
    	            railingSectionParams.racks = stringerParams1.elmIns["rear"].racks;
    	            railingSectionParams.railingSide = "left";
					//railingSectionParams.paltformGlassDeltaY = railingSection1.paltformGlassDeltaY;
					railingSectionParams.platformLength = M;
    	            railingPositionZ = -40 * turnFactor;

    	            var railingSection5 = drawRailingSectionGlassPlatform(railingSectionParams);

    	            railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection5.position.x = b1 * (stairAmt1) + M + 5 + 30;// + 40 * 2 - 5;
    	            railingSection5.position.y = h1 * (stairAmt1 + 1) + 5;
    	            railingSection5.position.z = 0;
    	            if (model === "ко") {
    	                railingSection5.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection5.position.y -= 40 + 5;
    	            }
    	            railing.push(railingSection5);
					}
    	        }/**/

				/*верхний марш*/
				
    	        railingSectionParams.lastMarsh = true;

    	        var topPltRailing_3 = params.topPltRailing_3;
    	        var topPltRailing_4 = params.topPltRailing_4;

				if (turnFactor < 0) {
                    topPltRailing_3 = params.topPltRailing_4;
                    var topPltRailing_4 = params.topPltRailing_3;
                }
				
    	        railingSectionParams.a1 = a3;
    	        railingSectionParams.b1 = b3;
    	        railingSectionParams.h1 = h3;
    	        railingSectionParams.stairAmt = stairAmt3;
				
				/*внешняя сторона верхнего марша*/

    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
    	            railingSectionParams.topEnd = platformTop;
    	            //railingSectionParams.bottomEnd = "площадка";
    	            if (stairModel == "Г-образная с забегом") {
						railingSectionParams.bottomEnd = "забег";
						railingSectionParams.platformLengthBottom = M - 8;
					}
    	            railingSectionParams.topConnection = false;
    	            railingSectionParams.bottomConnection = outerHandrailConnection;
    	            railingSectionParams.platformLengthTop = platformLength_3;
					railingSectionParams.platformLength = platformLength_3;
    	            railingSectionParams.railingSide = "left";
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_3){
    	                railingSectionParams.platformTopRailing = true;
						railingSectionParams.stairAmt = stairAmt3 + 1;
					}
					if (!params.topPltRailing_5) {
						railingSectionParams.topPltRailing_5 = false;
					}
    	            railingSectionParams.racks = stringerParams3.elmIns["out"].racks;
					railingSectionParams.basePointBottomTurnGlassOut = stringerParams3.pgalssPosition;
    	            var railingSection3 = drawRailingSectionGlass(railingSectionParams);
console.log(stringerParams3.pgalssPosition);
    	            railingSection3.rotation.y = (-Math.PI / 2) * turnFactor;
    	            railingSection3.position.x = b1 * (stairAmt1) * scale + M + 40 * 2 - 5;
    	            railingSection3.position.y = h1 * (stairAmt1 + 1);
    	            if (stairModel == "Г-образная с забегом") railingSection3.position.y = h1 * (stairAmt1 + 1) + 2 * h3;
    	            railingSection3.position.z = (M - 40) * turnFactor;
if (stairFrame == "есть" && stairModel == "Г-образная с забегом") {
	railingSection3.position.x = railingSection3.position.x + 40;
}/**/
    	            if (model == "ко") {
    	                railingSection3.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection3.position.z -= (a3 - b3 - 40) * turnFactor;
    	            }
    	            railing.push(railingSection3);
					railingSectionParams.paltformGlassDeltaY = railingSection3.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/
				
				/*внутренняя сторона верхнего марша*/

    	        if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = platformLength_3;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_4) {
    	                railingSectionParams.platformTopRailing = true;
						railingSectionParams.stairAmt = stairAmt3 + 1;
					}
					if (stairModel == "Г-образная с забегом") {
						railingSectionParams.insideTurn = true;
					}
					railingSectionParams.racks = stringerParams3.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";

    	            var railingSection4 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection4.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection4.position.x = b1 * (stairAmt1) + 40 - 5;
    	            railingSection4.position.y = h1 * (stairAmt1 + 1);
					railingSection4.position.z = (M - 40) * turnFactor;
    	            if (stairModel == "Г-образная с забегом") {
						railingSection4.position.y = h1 * (stairAmt1 + 1) + 2 * h3;
    	            	railingSection4.position.z = (M) * turnFactor;
    	            }
if (stairFrame == "есть" && stairModel == "Г-образная с забегом") {
	railingSection4.position.x = railingSection4.position.x + 40;
}/**/
					if (model == "ко") {
    	                railingSection4.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection4.position.z -= (a3 - b3 - 40) * turnFactor;
    	            }

    	            railing.push(railingSection4);
					railingSectionParams.paltformGlassDeltaY = railingSection4.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/
				
				/*заднее ограждение верхней площадки*/
				
    	        if (railingSide_3 !== "нет") {
    	            if (platformTop == "площадка" && params.topPltRailing_5) {
    	                railingSectionParams.h1 = h3;
    	                railingSectionParams.stairAmt = stairAmt3+1;
    	                railingSectionParams.topPltRailing_5 = true;
    	                railingSectionParams.platformTopRailing = true;
    	                railingSectionParams.topConnection = false;
    	                railingSectionParams.lastMarsh = true;
    	                railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
    	                railingSectionParams.railingSide = "left";
						railingSectionParams.platformLength = M;

    	                var railingSection6 = drawRailingSectionGlassPlatform(railingSectionParams);

    	                railingSection6.rotation.y = -Math.PI * turnFactor;
    	                railingSection6.position.x = b1 * (stairAmt1) + M + 40 - 5;
						railingSection6.position.y = h1 * (stairAmt1 + 1) + 5 + h3 * (stairAmt3 + 1);
						railingSection6.position.z = (M + b3 * (stairAmt3) + platformLength_3 + 5 - 35 - 1) * turnFactor;
						if (stairModel == "Г-образная с забегом") {
							railingSection6.position.y = h1 * (stairAmt1 + 1) + 5 + h3 * (stairAmt3 + 3);
							railingSection6.position.z = (M + b3 * (stairAmt3) + platformLength_3 + 5) * turnFactor;
						}
    	                if (model === "ко") {
    	                    railingSection6.position.x += a1 - b1 - 40 + stringerThickness * 2;
    	                    railingSection6.position.z -= stringerThickness;
    	                    railingSection6.position.y -= 40 + 5;
    	                }
if (stairFrame == "есть" && stairModel == "Г-образная с забегом") {
	railingSection6.position.x = railingSection6.position.x + 40;
}/**/
    	                railing.push(railingSection6);
    	            }
    	        }/**/

	        }
            if (railingModel == "Кованые балясины") {
				// параметры
				var railingSectionParams = {
				    bottomEnd: "нет",
				    platformLengthBottom: 0,
				    topEnd: platformTop,
				    platformLengthTop: platformLength_3,
				    railingSide: "left",
				    stairAmt: stairAmt1,
				    h: h1,
				    b: b1,
				    a: a1,
				    scale: scale,
				    lastMarsh: true,
				    topConnection: false,
				    bottomConnection: false,
				    connectionLength: 88,
				    rigelAmt: params.rigelAmt,
				    stringerSideOffset: stringerParams1.stringerSideOffset,
				    racks: stringerParams1.elmIns["out"].racks,
				    platformRack: false,
				    winder: false,
				    topWinder: false,
				    dxfBasePoint: dxfBasePoint,
				    handrail: handrail,
				    turnFactor: turnFactor,
				    text: 'Секция под кованые балясины',
				    gInBottom: false
				}
				var railingSectionFunction = function() {};
				railingSectionFunction = drawRailingSectionForge; //
				var railingPositionZ = M * turnFactor;
				var railingSection1, railingSection2, railingSection3, railingSection4, railingSection5;
				/*ограждения нижнего марша*/
				if (railingSide_1 === "внутреннее" || railingSide_1 === "две") {
				    railingSectionParams.gInBottom = true;
				    railingSectionParams.railingSide = 'right';
				    railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
				    railingSection1 = railingSectionFunction(railingSectionParams);
				    railingSection1.position.z = railingPositionZ + 40 * (0.5 * turnFactor - 0.5);
				    railing.push(railingSection1);
				    railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
				    if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
				    railingSectionParams.gInBottom = false;
				}
				if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
				    railingSectionParams.lastMarsh = false;
				    railingSectionParams.railingSide = 'left';
				    if (stairModel == "Г-образная с забегом") railingSectionParams.winder = true;
				    railingSectionParams.topConnection = true;
				    railingSectionParams.connectionLength = model == "ко" ? 158 : 88;
				    var racksStringer = [];
				    var countRack = 0;
				    for (; countRack < stringerParams1.elmIns['out'].racks.length; countRack++) {
				        racksStringer.push(stringerParams1.elmIns['out'].racks[countRack]);
				    }
				    if (model == "ко" && stairModel != 'Г-образная с забегом') {
				        var countArr = stringerParams1.elmIns['out'].racks.length - 1;
				        var point = newPoint_xy(stringerParams1.elmIns['out'].racks[countArr], stringerParams1.elmIns['sideStringerKo'].racks[0].x + stringerParams1.b / 2 + 8, 0.0);
				        racksStringer.push(point);
				    }
				    railingSectionParams.racks = racksStringer;
				    railingSection2 = railingSectionFunction(railingSectionParams);
				    railingSection2.position.z = -20 - 20 * turnFactor;
				    if (model == "ко") {
				        railingSection2.position.x += 0;
				        railingSection2.position.z -= (a3 - b3 - 40) * turnFactor;
				    }
				    railing.push(railingSection2);
				    railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
				    if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
				    railingSectionParams.topConnection = false;
				    railingSectionParams.winder = false;
				}
				/*ограждения верхнего марша*/
				railingSectionParams.h = h3;
				railingSectionParams.a = a3;
				railingSectionParams.b = b3;
				//IN
				if (railingSide_3 === "внутреннее" || railingSide_3 === "две") {
				    railingSectionParams.lastMarsh = (topPltRail_4 && platformTop == "площадка") ? false : true;
				    if (topPltRail_5 && topPltRail_4 && platformTop == "площадка") railingSectionParams.topConnection = true;
				    railingSectionParams.railingSide = 'right';
				    var racksStringer = [];
				    for (i = 0; i < stringerParams3.elmIns['in'].racks.length; i++) {
				        racksStringer.push(stringerParams3.elmIns['in'].racks[i]);
				    }
				    if (model == "ко" && platformTop == "площадка" && topPltRail_4) {
				        var countArr = stringerParams3.elmIns['out'].racks.length - 1;
				        var point = newPoint_xy(stringerParams3.elmIns['out'].racks[countArr], stringerParams3.elmIns['sideStringerKo'].racks[0].x + stringerParams3.b / 2, 0.0);
				        racksStringer.push(point);
				    }
				    railingSectionParams.racks = racksStringer;
				    railingSection3 = railingSectionFunction(railingSectionParams);
				    railingSection3.rotation.y = -Math.PI / 2 * turnFactor;
                    railingSection3.position.x = b1 * (stairAmt1) * scale + 40 - 5;
                    railingSection3.position.y = h1 * (stairAmt1 + 1);
                    railingSection3.position.z = (M - 40) * turnFactor;
                    if (stairModel == "Г-образная с забегом") {
                        railingSection3.position.y += 2 * h3;
                        railingSection3.position.x += 40;
                        railingSection3.position.z += 40 * turnFactor;
                        if (model == "лт" && stairFrame == "нет") {
                            railingSection3.position.x -= 40;
                        }
                    }

                    if (model == "ко") {
                        railingSection3.position.x += a1 - b1 - 40 + stringerThickness + 5;
                        railingSection3.position.z -= (a3 - b3 - 40) * turnFactor;
                        if (stairModel == "Г-образная с забегом") {
                            railingSection3.position.x -= 40 + 24;
                            railingSection3.position.z += (40 - stringerThickness) * turnFactor;
                        }
                    }
				    railing.push(railingSection3);
				    railingSectionParams.topConnection = false;
				    railingSectionParams.dxfBasePoint.x += stringerParams1.M + b3 * stairAmt3 + 300;
				    if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
				}
				/*OUT*/
				if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
				    if (stairModel == "Г-образная с забегом") railingSectionParams.winder = true;
				    railingSectionParams.bottomConnection = true;
				    if (topPltRail_5 && topPltRail_3 && platformTop == "площадка") railingSectionParams.topConnection = true;
				    railingSectionParams.railingSide = 'left';
				    railingSectionParams.connectionLength = model == "ко" ? 153 : 62 + 40 + 8;
				    railingSectionParams.lastMarsh = (topPltRail_3 && platformTop == "площадка") ? false : true;
				    var railSectionMarsh3Out = [];
				    var racksStringer = [];
				    if (stairModel != 'Г-образная с забегом') {
				        for (i = 0; i < stringerParams1.elmIns['rear'].racks.length; i++) {
				            var point = newPoint_xy(stringerParams1.elmIns['rear'].racks[i], -stringerParams1.M + 40, 5);
				            if (model == "ко") {
				                point = newPoint_xy(stringerParams1.elmIns['rear'].racks[i], -stringerParams1.M + stringerParams1.stringerSideOffset + a3 - b3 + 8, -40);
				            }
				            racksStringer.push(point);
				        }
				    }
				    for (i = 0; i < stringerParams3.elmIns['out'].racks.length; i++) {
				        racksStringer.push(stringerParams3.elmIns['out'].racks[i]);
				    }
				    if (model == "ко" && platformTop == "площадка" && topPltRail_3) {
				        var countArr = stringerParams3.elmIns['out'].racks.length - 1;
				        var point = newPoint_xy(stringerParams3.elmIns['out'].racks[countArr],
				            stringerParams3.elmIns['sideStringerKo'].racks[0].x + stringerParams3.b / 2,
				            0.0);
				        racksStringer.push(point);
				    }
				    railingSectionParams.racks = racksStringer;
				    railingSection4 = drawRailingSectionForge3(railingSectionParams);
				    railingSection4.rotation.y = (-Math.PI / 2) * turnFactor;
				    railingSection4.position.x = b1 * (stairAmt1) * scale + M + 40 * 2 - 5;
				    railingSection4.position.y = h1 * (stairAmt1 + 1);
				    railingSection4.position.z = (M - 40) * turnFactor;
				    if (stairModel == "Г-образная с забегом") {
				        railingSection4.position.y += 2 * h3;
				        railingSection4.position.x += 40 * (0.5 + 0.5 * turnFactor);
				        railingSection4.position.z += 40 * turnFactor;
				        if (model == "лт" && stairFrame == "нет") {
				            railingSection4.position.x -= 40;
				        }
				    }
				    if (model == "ко") {
				        railingSection4.position.x += a1 - b1 - 40 + stringerThickness + 5;
				        railingSection4.position.z -= (a3 - b3 - 40) * turnFactor;
				        if (stairModel == "Г-образная с забегом") {
				            railingSection4.position.x -= 40 + 24;
				            railingSection4.position.z += (40 - stringerThickness) * turnFactor;
				        }
				    }
				    railing.push(railingSection4);
				    railingSectionParams.dxfBasePoint.x += b3 * stairAmt3 + 100;
				    if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
				    railingSectionParams.bottomConnection = railingSectionParams.topConnection = false;
				    railingSectionParams.winder = false;
				}
				//заднее ограждение верхней площадки
				if (railingSide_3 !== "нет") {
				    if (platformTop == "площадка" && params.topPltRailing_5) {
				        railingSectionParams.railingSide = 'left';
				        railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
				        railingSectionParams.platformRack = true;
				        if (topPltRail_4) railingSectionParams.topConnection = true;
				        if (topPltRail_3) railingSectionParams.bottomConnection = true;
				        railingSectionParams.connectionLength = model == 'ко' ? 153 : 110;
				        railingSection5 = railingSectionFunction(railingSectionParams);
				        railingSection5.rotation.y = -Math.PI * turnFactor;
				        railingSection5.position.x = b1 * (stairAmt1) * scale + M - 5 + 20 + 20 * turnFactor; //b1 * (stairAmt1) + 40 + M - 5
				        railingSection5.position.y = h1 * (stairAmt1 + 1) + 5 + h3 * (stairAmt3 + 1);
				        railingSection5.position.z = (M + b3 * (stairAmt3) + platformLength_3 + 5) * turnFactor;
				        if (stairModel == "Г-образная с забегом") {
				            railingSection5.position.y += 2 * h3;
				            railingSection5.position.x += 40;
				            railingSection5.position.z += 40 * turnFactor;
							if (model == "лт" && stairFrame == "нет") {
								railingSection5.position.x -= 40;
							}
				        }
				        if (model === "ко") {
				            railingSection5.position.x += a1 - b1 - 40 - stringerSideOffset + stringerThickness;
				            railingSection5.position.z -= stringerThickness;
				            railingSection5.position.y -= 40 + 5;
				            if (stairModel == "Г-образная с забегом") {
				                railingSection5.position.x -= 40 + 24;
				                railingSection5.position.z += (40 - 8) * turnFactor;
				            }
				        }
				        railing.push(railingSection5);
				        railingSectionParams.dxfBasePoint.x += M + 150;
				    }
				}
            }
        } //end of drawGRailing()
    }//end of drawGStairCase()


    /*** П-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


    if (stairModel == "П-образная с площадкой" || stairModel == "П-образная с забегом") {
        drawPStairCase();
    }

    function drawPStairCase() {

		var platformLength, platformLengthTop;
		var tyrnLength, stringerTurn;

        if (stairModel == "П-образная с площадкой") {
            stringerTurn = "площадка";
			tyrnLength = M;
        }

        if (stairModel == "П-образная с забегом") {
            stringerTurn = "забег";
            if (params.model == "ко") {
                tyrnLength = params.M + 25.0;
            }
            if (params.model == "лт") {
                tyrnLength = params.M - stringerThickness + 31.0;
            }
        }
        if (params.model == "ко") {
            platformLengthTop = platformLength_3;
            platformLength = platformLength_1;
        	}
        if (params.model == "лт") {
            platformLengthTop = platformLength_3 - stringerThickness;
            platformLength = platformLength_1 - stringerThickness;
        	}




        var dxfBasePoint = { x: 0.0, y: 0.0 };

        // Массив элементов, которые тркбуют позиционирования и поаорота
        // вместе с нижним маршем и вместе с верхним маршем
        var bottomParts = [];
        var topParts = [];

        // выходные массивы
        var treadsMarsh1, treadsMarsh3;
        var framesMarsh1, framesMarsh3;
        var carcasMarsh1, carcasMarsh3;
        var anglesMarsh1, anglesMarsh3;
        var railingMarsh1, railingMarsh3;

        // параметры
        var marshTreadsParams1, marshTreadsParams3;
        var platformCoverParams1, platformCoverParams3;
        var platformFramesParams1, marshFramesParams1;
        var platformFramesParams3, marshFramesParams3;
        var stringerParams1, stringerParams3;

        var turnParams, turnFramesParams;
        var turnParams3;


        // Прямые ступени нижнего марша (кроме рифленки)
        marshTreadsParams1 = {
            stringerTurn: stringerTurn,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h1,
            a: params.a1,
            b: params.b1,
            stairType: params.stairType,
            text: "нижний",
            stairAmt: params.stairAmt1,
            xadd: (model == "ко") ? 0.0 : 5.0,
            riserType: riserType,
            riserAmt: params.stairAmt1 + 1,
            group: new THREE.Object3D(),        // группа
            groupriser: new THREE.Object3D(),   // группа
            dxfBasePoint: dxfBasePoint,
        };
        if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn == "забег") {
            marshTreadsParams1 = drawMarshTreads(marshTreadsParams1, marshFramesParams1);
            treads.push(marshTreadsParams1.treads);
            risers.push(marshTreadsParams1.risers);
            bottomParts.push(marshTreadsParams1.treads);
            bottomParts.push(marshTreadsParams1.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);
        }

        dxfBasePoint = newPoint_xy(dxfBasePoint, 500, 0);

        // Покрытие промежуточной площадки (кроме рифленки)

        platformCoverParams1 = {
            stringerTurn: stringerTurn,
            platformLength: platformLength,
            platformWidth: platformWidth_1 - (model == "ко" ? 0.0 : stringerThickness * 2),
            treadThickness: treadThickness,
            M: params.M,
            dpcWidth: dpcWidth,
            h: params.h1,
            a: params.a1,
            b: params.b1,
            stairType: params.stairType,
            text: "нижняя",
            stairAmt: params.stairAmt1,
            xadd: (model == "ко") ? 0.0 : 5.0,
            group: new THREE.Object3D(),   // группа
            dxfBasePoint: dxfBasePoint,
        };
        if (stringerTurn == "площадка") {
    		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh1 = drawPlatformCover(platformCoverParams1, platformFramesParams1);
                bottomParts.push(platformCoverParams1.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams1.platformLength + dxfBasePointStep, 0);
            }
        }


        /***  Блок забежных ступеней  П-образная  ***/

        if (stringerTurn == "забег") {
            var turnModel = model;
            if (model == "лт" && stairFrame == "есть") turnModel = "лт стекло";


            // параметры блока забежных ступеней
            var turnParams = {
                model: turnModel,
                stairModel: stairModel,
                marshDist: marshDist,
                M: M,
                h: h3,
                treadThickness: treadThickness,
                stringerThickness: stringerThickness,
                treadSideOffset: treadSideOffset,
                material: timberMaterial,
                turnFactor: turnFactor,
                dxfBasePoint: dxfBasePoint
            }
            if (params.stairType == "стекло") turnParams.material = glassMaterial;

            //отрисовываем блок забежных ступеней
            turnParams = drawTurnSteps(turnParams);

            /*задаем позицию блока забежных ступеней*/
            turnParams.meshes.rotation.y = -Math.PI / 2;
            turnParams.meshes.position.y = h1 * stairAmt1 + h1 - treadThickness;
            turnParams.meshes.position.x = b1 * stairAmt1 + marshTreadsParams1.xadd;
            turnParams.meshes.position.z = (M - stringerThickness - treadSideOffset) * turnFactor;
            if (model == "ко") {
                turnParams.meshes.position.z = M * turnFactor;
                turnParams.meshes.position.x = b1 * (stairAmt1 - 1) + a1 - 40;
            }
            treads.push(turnParams.meshes);


            /* Рамки под забежные ступени лт */

            if (turnModel == "лт стекло") {
                var frameMetalThickness = 8;
                turnFramesParams = {
                    textHeight: 30,
                    M: M,
                    h: h3,
                    marshDist: marshDist,
                    treadThickness: treadThickness,
                    stringerThickness: stringerThickness,
                    treadSideOffset: 5,
                    model: model,
                    stairModel: stairModel,
                    stairType: stairType,
                    metalMaterial: metalMaterial,
                    metalMaterial2: metalMaterial2,
                    turnFactor: turnFactor,
                    dxfBasePoint: dxfBasePoint,
                    treadsPosition: turnParams.treadsPosition,
                    turnSteps: turnParams.params,
                };

                turnFramesParams = drawTurnFramesLt(turnFramesParams, turnParams); //функция в файле drawCarcasPartsLib_2.0.js
                turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
                turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
                turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness/2;
                turnFramesParams.meshes.rotation.y = -Math.PI / 2;
                angles.push(turnFramesParams.meshes);
                //console.log(turnFramesParams.meshes.position.y)
            }

            /* Рамки под забежные ступени ко */

            if (params.model == "ко") {
                //задаем параметры блока рамок забежных ступеней
                var frameMetalThickness = 4;
                turnFramesParams = {
                    textHeight: 30,
                    M: params.M, // - ширина марша
                    stairModel: params.stairModel, // поворот лестницы
                    model: params.model, // модель лестницы: лт или ко
                    marshDist: params.marshDist, //зазор между маршами в плане. Для Г-образной не обязательный параметр
                    stringerThickness: stringerThickness, // - толщина косоура (8мм)
                    treadSideOffset: params.sideOverHang, //  - свес ступени над косоуром сбоку
                    frameMetalThickness: frameMetalThickness, // - толщина металла рамки (4мм)
                    turnFactor: turnFactor, //  - к-т направления поворота: 1 (праваЯ) или -1 (леваЯ)
                    h: params.h3, // подъем ступени
                    stepOffsetFront: 40 + frameMetalThickness, // отступ от передней кромки ступени
                    deltaXFrame: params.sideOverHang + stringerThickness + frameMetalThickness, //смещение по оси Х начальной точки рамки
                    holeRadScrew: 3.5, //радиус отверстий под шурупы
                    holeRadBolt: 6.5, //радиус отверстий под болты
                    heightFlan: 40, //высота фланцев рамки
                    lengthKo: {}, // длины проступи косоуров забежных ступеней
                    stepOff: (a1 - b1 - 40), //отступ от передней кромки ступени
                    material: metalMaterial, // материал рамки
                    material1: metalMaterial2, // материал рамки
                    dxfBasePoint: dxfBasePoint, // базовая точка вставки контуров рамок ступеней
                    turnSteps: turnParams.params, //параметры забежных ступеней
                    topMarsh: false, // верхний забег
                }

                turnFramesParams = drawTurnFramesKo(turnFramesParams); //функция в файле drawCarcasPartsLib_2.0.js
                turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
                turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
                turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness + stringerThickness;
                turnFramesParams.meshes.rotation.y = -Math.PI / 2;
                angles.push(turnFramesParams.meshes);

                //отрисовываем верхний блок рамок забежных ступеней
                turnFramesParams.dxfBasePoint = { x: 0, y: 1500 };
                turnFramesParams.topMarsh = true;
                turnFramesParams = drawTurnFramesKo(turnFramesParams);
                turnFramesParams.meshes.position.x = turnParams.meshes.position.x + 25.0;
                turnFramesParams.meshes.position.y = turnParams.meshes.position.y + turnFramesParams.h * 3;
                turnFramesParams.meshes.position.z = turnParams.meshes.position.z + (params.marshDist - 25) * turnFramesParams.turnFactor;
                turnFramesParams.meshes.rotation.y = Math.PI; // * turnFactor;
                if (turnFactor == -1) turnFramesParams.meshes.rotation.y = 0;
                angles.push(turnFramesParams.meshes);

            //подступенки забежных ступеней
            if (params.riserType == "есть") {
                var riserParams1 = {
                    h: h3,
                    riserThickness: riserThickness,
                    treadThickness: treadThickness,
                    riserSideOffset: riserSideOffset,
                    dxfBasePoint: dxfBasePoint,
                    material: treadMaterial,
                    text: "2 забежной",
                    dxfArr: dxfPrimitivesArr,
                };
                var tyrnRisers = draw2TurnRisers(riserParams1, turnParams);
                tyrnRisers.position.x = turnParams.meshes.position.x;
                tyrnRisers.position.y = turnParams.meshes.position.y;
                tyrnRisers.position.z = turnParams.meshes.position.z;
                if (turnFactor == -1) tyrnRisers.rotation.y = -Math.PI / 2;

                var tyrnRisers2 = draw2TurnRisers(riserParams1, turnParams);
       			tyrnRisers2.position.x = turnParams.meshes.position.x + 25;
                tyrnRisers2.position.y = turnParams.meshes.position.y + h3 * 3;
       			tyrnRisers2.position.z = turnParams.meshes.position.z + (params.marshDist - 25.0) * turnFactor;
                tyrnRisers2.rotation.y = -Math.PI / 2;
                if (turnFactor == -1) tyrnRisers2.rotation.y = 0.0;

                //подступенок четвёртой забежной ступени
                riserParams1.text = "4 забежной";
                var turnSteps = turnParams.params;
                riserParams1.treadWidth = treadWidth;

                riserParams1 = drawRiser(riserParams1);
                var riser2 = riserParams1.mesh;
                riser2.position.x = 35.0;
                riser2.position.y = treadThickness + h3 * 2;
                riser2.position.z = (params.marshDist - 15.0) * turnFactor;
                if (turnFactor == -1) {
                    riser2.position.x = (params.marshDist + 5.0) * turnFactor;
                    riser2.position.y = treadThickness + h3 * 2;
                    riser2.position.z = -35.0;
                    riser2.rotation.y = Math.PI / 2;
                }
                tyrnRisers.add(riser2);
                risers.push(tyrnRisers);
                risers.push(tyrnRisers2);
            }
            } //end of params.model == "ко"

            //console.log(turnFramesParams.deltaXFrame)

//            /*** УГОЛКИ П-ОБРАЗНАЯ ЗАБЕГ ***/
//
//            if (stairFrame == "нет") {
//                turnParams = drawLtWinderAngles(turnParams, turnFactor); //функция в файле drawCarcasPartsLib_2.0.js
//
//                turnParams.angles.meshes.rotation.y = turnParams.meshes.rotation.y;
//                turnParams.angles.meshes.position.x = turnParams.meshes.position.x;
//                turnParams.angles.meshes.position.y = turnParams.meshes.position.y;
//                turnParams.angles.meshes.position.z = turnParams.meshes.position.z;
//                turnParams.angles.meshes.castShadow = true;
//                angles.push(turnParams.angles.meshes);
//            }

            /*** УГОЛКИ П-ОБРАЗНАЯ ЗАБЕЖНЫЕ СТУПЕНИ ***/

            if (stairFrame == "нет") {
                turnParams = drawLtWinderAngles(turnParams, turnFactor);

                turnParams.angles.meshes.rotation.y = turnParams.meshes.rotation.y;
                turnParams.angles.meshes.position.x = turnParams.meshes.position.x;
                turnParams.angles.meshes.position.y = turnParams.meshes.position.y;
                turnParams.angles.meshes.position.z = turnParams.meshes.position.z;
                turnParams.angles.meshes.castShadow = true;
                angles.push(turnParams.angles.meshes);
            }
        }//end of stringerTurn == "забег"



        dxfBasePoint = newPoint_xy(dxfBasePoint, 5000, 0);
        // Прямые ступени верхнего марша (кроме рифленки)
        marshTreadsParams3 = {
            stringerTurn: stringerTurn,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h3,
            a: params.a3,
            b: params.b3,
            stairType: params.stairType,
            text: "верхний",
            stairAmt: params.stairAmt3,
            xadd: (model == "ко") ? 0.0 : 5.0,
            riserType: riserType,
            riserAmt: (platformTop == "площадка") ? params.stairAmt3 + 1 : params.stairAmt3,
            group: new THREE.Object3D(),        // группа
            groupriser: new THREE.Object3D(),   // группа
            dxfBasePoint: dxfBasePoint,
        };
        if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn == "забег") {
            marshTreadsParams3 = drawMarshTreads(marshTreadsParams3, marshFramesParams3);
            treads.push(marshTreadsParams3.treads);
            risers.push(marshTreadsParams3.risers);
            topParts.push(marshTreadsParams3.treads);
            topParts.push(marshTreadsParams3.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams3.a + dxfBasePointStep, 0);
        }

            // Покрытие верхней площадки (кроме рифленки)
            platformCoverParams3 = {
                stringerTurn: stringerTurn,
                platformLength: platformLengthTop,
                platformWidth: treadWidth,
                treadThickness: treadThickness,
                M: params.M,
                dpcWidth: dpcWidth,
                h: params.h3,
                a: params.a3,
                b: params.b3,
                stairType: params.stairType,
                text: "верхняя",
                stairAmt: params.stairAmt3,
                xadd: (model == "ко") ? 0.0 : 5.0,
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
        if (platformTop == "площадка") {
			if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);
                topParts.push(platformCoverParams3.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.platformLength + dxfBasePointStep, 0);
            }// end if
        }// end if


        dxfBasePoint = newPoint_xy(dxfBasePoint, 1000, 0);
        if (stairFrame == "есть") {
            // Рамки нижнего марша
            marshFramesParams1 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairType: params.stairType,
                text: "нижний",
                stairAmt: params.stairAmt1,
                holeCenters: [],
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
            marshFramesParams1 = setMarshFrameParams(marshFramesParams1);
            framesMarsh1 = drawMarshFrames(marshFramesParams1);
            bottomParts.push(marshFramesParams1.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, marshFramesParams1.a + dxfBasePointStep, 0);

            // Рамки промежуточной площадки
            platformFramesParams1 = {
                M: params.M,
                platformLength: platformLength,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairAmt: stairAmt1,
                stairType: params.stairType,
                text: "промежуточная",
                z: 0.0,
                addHoles: true,
                holeCenters: [],
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
            if (stringerTurn == "площадка") {
                platformFramesParams1 = setPlatformFrameParams(platformFramesParams1);
                framesMarsh1 = drawPlatformFrames(platformFramesParams1);
                bottomParts.push(platformFramesParams1.group);

                platformFramesParams1.z = (platformWidth_1 - params.M) * turnFactor;
                platformFramesParams1.group = new THREE.Object3D();   // группа
                framesMarsh11 = drawPlatformFrames(platformFramesParams1);
                bottomParts.push(platformFramesParams1.group);

                if (params.model == "лт") {
                    // рамки между маршами
                    platformFramesParams1.z = turnFactor > 0 ? params.M - stringerThickness : -platformWidth_1 + params.M + params.M - stringerThickness;
                    platformFramesParams1.treadWidth = platformWidth_1 - params.M - params.M;
                    platformFramesParams1.brigeAmt = 2;
                    platformFramesParams1.addHoles = false;
                    platformFramesParams1.group = new THREE.Object3D();   // группа
                    framesMarsh11 = drawPlatformFrames(platformFramesParams1);
                    bottomParts.push(platformFramesParams1.group);
                }

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformFramesParams1.platformLength + dxfBasePointStep, 0);
            }
        } // end if


        /***  КОСОУРЫ П-ОБРАЗНАЯ НИЖНИЙ МАРШ   ***/

        // Косоуры нижнего марша
        stringerParams1 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "platformP",
            topEndLength: tyrnLength,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            treadSideOffset: treadSideOffset,
            h: h1,
            b: b1,
            a: a1,
            h3: h3,
            stairAmt: stairAmt1 + 1,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            platformLength_1: platformLength_1,
            platformWidth_1: platformWidth_1,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
            group: new THREE.Object3D(),      // группа
            groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
            railingModel: railingModel, //модель ограждения
        };

        drawPStringers1();

        function drawPStringers1() {
            if (stairModel == "П-образная с площадкой") {
                if (params.model == "лт") stringerParams1.topEndLength = platformLength - stringerThickness + 5.0;
                if (params.model == "ко") stringerParams1.topEndLength = b1;
            }
            if (stairModel == "П-образная с забегом") {
                if (params.model == "лт") stringerParams1.topEndLength = params.M + 31 + 5;
                if (params.model == "ко") stringerParams1.topEndLength = params.M + 25 - stringerSideOffset;
            }
            stringerParams1.platformLength = platformLength_1;
            //console.log(stringerParams1.topEndLength)
            /*внешняя тетива/косоур нижнего марша*/

            //наличие ограждений
            stringerParams1.railingPresence = false;
            if (railingSide_1 === "внешнее" || railingSide_1 === "две")
                stringerParams1.railingPresence = true;
            //ограждение верхней площадки
            stringerParams1.platformTopRailing = true;

            if (stairModel == "П-образная с забегом") stringerParams1.topEnd = "winder";
            stringerParams1.key = "out";
            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
            stringer1.castShadow = true;
            carcas.push(stringer1);

            /*внутренняя тетива/косоур нижнего марша*/

            //наличие ограждений
            stringerParams1.railingPresence = false;
            if (railingSide_1 === "внутреннее" || railingSide_1 === "две")
                stringerParams1.railingPresence = true;
            //ограждение верхней площадки
            stringerParams1.platformTopRailing = false;

            if (params.model == "ко" && stairModel == "П-образная с забегом") {
                stringerParams1.stringerBotOutlength = turnFramesParams.lengthKo.lengthBotOutBend + turnFramesParams.lengthKo.lengthBotOutBend1 + b1 * (stairAmt1 - 1) + a1 - 4;
                stringerParams1.topEndLength = stringerSideOffset - 15 + stringerThickness + 60 + 5;
            }

            stringerParams1.key = "in";
            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = (M - stringerSideOffset - stringerThickness * (1 + turnFactor) * 0.5) * turnFactor;
            stringer2.castShadow = true;
            carcas.push(stringer2);

            /*промежуточная площадка*/

            if (stringerTurn == "площадка") {
                //наличие ограждений
                stringerParams1.railingPresence = false;
                if (backRailing_1 === "есть") {
                    stringerParams1.railingPresence = true;
                    stringerParams1.platformTopRailing = true;
                    stringerParams1.key = "rear1";
                    stringerParams1.elmIns.rear1 = {};
                    stringerParams1.elmIns.rear1.racks = [];
					
                }

                if (model == "ко") {
                    //задняя тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + a1 - b1 - 40.0 + platformLength - stringerSideOffset,
                        y: h1 * (stairAmt1 + 1) - treadThickness,
                        z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                    };
                    drawRearStringerPKo(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerPKo

                    p0.x -= (platformLength - stringerSideOffset - b1 - 40.0) - stringerThickness;

                    //боковые тетивы площадки
                    stringerParams1.platformLength = platformLength;

                    //наличие ограждений
                    stringerParams1.railingPresence = false;
                    if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
                        stringerParams1.railingPresence = true;
                        stringerParams1.platformTopRailing = true;
                        stringerParams1.key = "out";
                    }
                    stringerParams1.sideLength = (platformLength - stringerSideOffset - params.b1 - 40.0) - stringerThickness - stringerThickness;
                    drawSideStringerPKo("out", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);

                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerPKo("in", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);

                    p0.z += platformWidth_1 - M - M + stringerSideOffset + stringerSideOffset + stringerThickness;
                    drawSideStringerPKo("in", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);

                    //наличие ограждений
                    stringerParams1.railingPresence = false;
                    if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
                        stringerParams1.railingPresence = true;
                        stringerParams1.platformTopRailing = true;
                        stringerParams1.key = "rearP1";
                        stringerParams1.elmIns.rearP1 = {};
                        stringerParams1.elmIns.rearP1.racks = [];
                    }
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerPKo("out", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);

                    //поперечная тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + a1 + stringerThickness,
                        y: h1 * stairAmt1 + h1 - treadThickness,
                        z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                    };
                    drawTransStringerPKo(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + platformLength + 5.0,
                        y: h1 * (stairAmt1 + 1) + 5.0,
                        z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                    };
                    drawRearStringerPLt(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerPLt

                    if (stairFrame == "нет") {
                        //поперечная тетива площадки
                        p0 = {
                            x: b1 * stairAmt1 + 306.0 + stringerThickness,
                            y: h1 * stairAmt1 + h1 - treadThickness,
                            z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                        };

                        drawTransStringerPLt(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                    }
                }
            }
        }//end of drawPStringers1()


        /*** УГОЛКИ П-ОБРАЗНАЯ НИЖНИЙ МАРШ ***/

        // Уголки+перемычки нижнего марша
        // Уголки+перемычки промежуточной площадки
        drawPAngles1();

        function drawPAngles1() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = 0.0;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = (params.M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);

            // фланец крепления частей разделённой тетивы или косоура нижний марш
            if (stringerParams1.divide !== 0) {
                drawFlanConcatAngles(stringerParams1, flanMaterial);
            }

            // уголки под ступенями нижний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней нижний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams1.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams1.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                    }

                    // перемычки нижний марш
                    for (ii = 0; ii < stringerParams1.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams1, stringerParams1.elmIns["out"].briges[ii]);
                    }
                }
            }

            if (stringerTurn == "площадка") {
                if (!(params.model == "лт" && stairFrame == "есть")) {
                    // уголки крепления к поперечному косоуру площадки
                    var angleU = drawAngleSupport("У4-60х60х100");
                    angleU.position.x = stringerParams1.elmIns["out"].angleU[0].x;
                    angleU.position.y = stringerParams1.elmIns["out"].angleU[0].y;
                    angleU.position.z = (stringerThickness + stringerSideOffset);
                    angleU.rotation.x = 0.0;
                    angleU.rotation.y = 0.0;
                    angleU.rotation.z = Math.PI * 0.5;
                    angleU.castShadow = true;
                    stringerParams1.groupang.add(angleU);
                    angleU = drawAngleSupport("У4-60х60х100");
                    angleU.position.x = stringerParams1.elmIns["out"].angleU[0].x;
                    angleU.position.y = stringerParams1.elmIns["out"].angleU[0].y + 100.0;
                    angleU.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                    angleU.rotation.x = Math.PI;
                    angleU.rotation.y = 0.0;
                    angleU.rotation.z = Math.PI * 0.5;
                    angleU.castShadow = true;
                    stringerParams1.groupang.add(angleU);
                }
            }
        }//end of drawPAngles1()


        carcas.push(stringerParams1.group);
        angles.push(stringerParams1.groupang);

        bottomParts.push(stringerParams1.group);
        bottomParts.push(stringerParams1.groupang);

        if (stairFrame == "есть") {
            // Рамки верхнего марша
            marshFramesParams3 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h3,
                a: params.a3,
                b: params.b3,
                stairType: params.stairType,
                text: "верхний",
                stairAmt: params.stairAmt3,
                holeCenters: [],
                group: new THREE.Object3D(),   // группа
                dxfBasePoint: dxfBasePoint,
            };
            marshFramesParams3 = setMarshFrameParams(marshFramesParams3);
            framesMarsh3 = drawMarshFrames(marshFramesParams3);
            topParts.push(marshFramesParams3.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, marshFramesParams3.a + dxfBasePointStep, 0);

            if (platformTop == "площадка") {
                // Рамки верхней площадки
                platformFramesParams3 = {
                    M: params.M,
                    platformLength: platformLengthTop,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h3,
                    a: params.a3,
                    b: params.b3,
                    stairAmt: stairAmt3,
                    stairType: params.stairType,
                    text: "верхняя",
                    z: 0.0,
                    addHoles: true,
                    holeCenters: [],
                    group: new THREE.Object3D(),   // группа
                    dxfBasePoint: dxfBasePoint,
                };
                platformFramesParams3 = setPlatformFrameParams(platformFramesParams3);
                framesMarsh3 = drawPlatformFrames(platformFramesParams3);
                topParts.push(platformFramesParams3.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformLengthTop + dxfBasePointStep, 0);
            }
        }


        /*** КОСОУРЫ П-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

        // Косоуры верхнего марша
        // Тетивы верхней площадки
        stringerParams3 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: true,
            stairType: stairType,
            botEnd: "platformP",
            botEndLength: 0,
            topEnd: "floor",
            topEndLength: tyrnLength,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            treadSideOffset: treadSideOffset,
            h: h3,
            b: b3,
            a: a3,
            h1: h1,
            stairAmt: (platformTop == "площадка") ? params.stairAmt3 + 1 : params.stairAmt3,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
            group: new THREE.Object3D(),      // группа
            groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
            railingModel: railingModel, //модель ограждения
        };

        drawPStringers3();

        function drawPStringers3() {
            if (platformTop == "площадка") {
                stringerParams3.topEnd = "platformG";
                stringerParams3.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams3.topEndLength = b3;
                stringerParams3.platformLength = params.platformLength_3;
            }
            if (stairModel == "П-образная с площадкой") {
                stringerParams3.platformLengthBot = params.platformLength_1;
            }

            if (params.model == "лт") stringerParams3.botEndLength = platformLength - 3.0;
            if (params.model == "ко") stringerParams3.botEndLength = b1 + 40.0;

            /*внешняя тетива/косоур верхнего марша*/

            //наличие ограждений
            stringerParams3.railingPresence = false;
            if ((railingSide_3 === "внешнее" && turnFactor > 0) || (railingSide_3 === "внутреннее" && turnFactor < 0) || railingSide_3 === "две")
                stringerParams3.railingPresence = true;
            //ограждение верхней площадки
            stringerParams3.platformTopRailing = false;
            if (platformTop == "площадка" && params.topPltRailing_3)
                stringerParams3.platformTopRailing = true;


            stringerParams3.key = turnFactor > 0 ? "out" : "in";
            if (stairModel == "П-образная с забегом") stringerParams3.botEnd = "winder";
            if (params.model == "лт") drawStringerLt(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams3.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer3 = new THREE.Mesh(geom, stringerMaterial);
            stringer3.position.set(0.0, 0.0, stringerSideOffset);
            stringer3.castShadow = true;
            stringerParams3.group.add(stringer3);

            /*внутренняя тетива/косоур верхнего марша*/

            //наличие ограждений
            stringerParams3.railingPresence = false;
            if ((railingSide_3 === "внутреннее" && turnFactor > 0) || (railingSide_3 === "внешнее" && turnFactor < 0) || railingSide_3 === "две")
                stringerParams3.railingPresence = true;
            //ограждение верхней площадки
            stringerParams3.platformTopRailing = false;
            if (platformTop == "площадка" && params.topPltRailing_4)
                stringerParams3.platformTopRailing = true;

            stringerParams3.key = turnFactor > 0 ? "in" : "out";
            if (params.model == "лт") drawStringerLt(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams3.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer4 = new THREE.Mesh(geom, stringerMaterial);
            stringer4.position.set(0.0, 0.0, M - stringerThickness - stringerSideOffset);
            stringer4.castShadow = true;
            stringerParams3.group.add(stringer4);


            /*верхняя площадка*/

            if (platformTop == "площадка") {
                //наличие ограждений
                stringerParams3.railingPresence = false;
                if (railingSide_3 !== "нет")
                    stringerParams3.railingPresence = true;
                //заднее ограждение верхней площадки
                stringerParams3.platformTopRailing = false;
                if (params.topPltRailing_5) {
                    stringerParams3.platformTopRailing = true;
                    stringerParams3.key = "rear";
                    stringerParams3.elmIns.rear = {};
                    stringerParams3.elmIns.rear.racks = [];
                }
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams3, flanMaterial);
                    flanSide.position.x += stringerParams3.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams3.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams3, flanMaterial);
                    flanSide.position.x += stringerParams3.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams3.flanSidePointInsert.y;
                    flanSide.position.z += params.M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b3 * stairAmt3 + a3 - b3 - 40.0 + params.platformLength_3 - stringerSideOffset,
                        y: h3 * (stairAmt3 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                    };
                    drawRearStringerKo(stringerParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    //боковые тетивы площадки
                    p0.x -= (params.platformLength_3 - stringerSideOffset - b3 - 40.0);
                    p0.z -= stringerThickness;

                    stringerParams3.platformLength = params.platformLength_3;
                    stringerParams3.sideLength = (platformLength_3 - stringerSideOffset - params.b3 - 40.0);
                    drawSideStringerKo("out", stringerParams3, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams3, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = {
                        x: b3 * stairAmt3 + params.platformLength_3 + 5.0,
                        y: h3 * (stairAmt3 + 1) + 5.0,
                        z: 0.0
                    };
										stringerParams3.platformEnd = true;//конечная площадка
                    drawRearStringer(stringerParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
            }

        }//end of drawPStringers3()


        /*** УГОЛКИ П-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

        // порядок отрисовки тетив/косоуров для получения координат уголков крепления
        var key1 = "out";
        var key2 = "in";
        if (turnFactor < 0) { key1 = "in"; key2 = "out"; }

        // Уголки+перемычки верхнего марша
        // Уголки+перемычки верхней площадки
        drawPAngles3();

        function drawPAngles3() {
            if (stringerTurn == "площадка") {
                if (!(params.model == "лт" && stairFrame == "есть")) {
                    // уголки крепления к нижнему маршу (площадке)
                    var angleB = drawAngleSupport("У4-60х60х100");
                    angleB.position.x = stringerParams3.elmIns["out"].angleB[0].x;
                    angleB.position.y = stringerParams3.elmIns["out"].angleB[0].y;
                    angleB.position.z = stringerThickness + stringerSideOffset;
                    angleB.rotation.x = 0.0;
                    angleB.rotation.y = 0.0;
                    angleB.rotation.z = Math.PI * 1.5;
                    angleB.castShadow = true;
                    stringerParams3.groupang.add(angleB);
                    angleB = drawAngleSupport("У4-60х60х100");
                    angleB.position.x = stringerParams3.elmIns["out"].angleB[0].x;
                    angleB.position.y = stringerParams3.elmIns["out"].angleB[0].y - 100.0;
                    angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                    angleB.rotation.x = 0.0;
                    angleB.rotation.y = Math.PI;
                    angleB.rotation.z = Math.PI * 0.5;
                    angleB.castShadow = true;
                    stringerParams3.groupang.add(angleB);
                }
            }

            if (stringerTurn == "забег") {
                //уголки соединения внешних тетив
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key1].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns[key1].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);

                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key1].angleB[1].x;
                angleB.position.y = stringerParams3.elmIns[key1].angleB[1].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);

                //уголки соединения внутренних тетив
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key2].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns[key2].angleB[0].y - 100;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);

                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns[key2].angleB[1].x;
                angleB.position.y = stringerParams3.elmIns[key2].angleB[1].y - 100;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);
            }

            // уголки под ступенями верхний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней верхний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams3.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams3.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams3.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams3.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams3.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams3.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams3.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams3.groupang.add(angle2);
                    }

                    // перемычки верхний марш
                    for (ii = 0; ii < stringerParams3.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams3, stringerParams3.elmIns["out"].briges[ii]);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            // верхний марш
            if (stringerParams3.divide !== 0) {
                drawFlanConcatAngles(stringerParams3, flanMaterial);
            }

            // верхние уголки
            if (platformTop != "площадка") {
                var topAnglePosition = params.topAnglePosition;
                if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
                    if (stringerParams3.elmIns["out"].angleU[0] !== undefined) {
                        var angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams3.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams3.elmIns["out"].angleU[0].y;
                        angleU.position.z = (stringerThickness + stringerSideOffset);
                        angleU.rotation.x = 0.0;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        stringerParams3.groupang.add(angleU);
                        angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams3.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams3.elmIns["out"].angleU[0].y + 100.0;
                        angleU.position.z = ((params.M - stringerThickness) - stringerSideOffset);
                        angleU.rotation.x = Math.PI;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        stringerParams3.groupang.add(angleU);
                    }
                }
                if (topAnglePosition == "вертикальная рамка") {
                    var topUnitBasePoint = {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotationY: 0,
                    };
                    if (params.model == "лт") topUnitBasePoint.x = topUnitBasePoint.x - 5;
                    var unitParams = {
                        basepoint: topUnitBasePoint,
                        width: M - 2 * stringerThickness,
                        height: 200,
                        stringerSideOffset: stringerSideOffset,
                        model: params.model,
                        treadThickness: treadThickness,
                        stringerThickness: stringerThickness,
                        metalMaterial: metalMaterial,
                        treadMaterial: treadMaterial,
                        M: M,
                        h1: h3,
                        riserThickness: riserThickness,
                        nose: a3 - b3,
                        treadWidth: treadWidth,
                        dxfBasePoint: dxfBasePoint,
                    };
                    var topFixUnit = drawTopFixFrameUnit(unitParams)
                    var complexUnit = topFixUnit.complexUnit;
                    if (params.model == "лт") {
                        complexUnit.position.y = stairAmt3 * h3 - 25.0;
                        complexUnit.position.x = stairAmt3 * b3;
                    }
                    if (params.model == "ко") {
                        complexUnit.position.y = stairAmt3 * h3;
                        complexUnit.position.x = stairAmt3 * b3;
                    }
                    stringerParams3.groupang.add(complexUnit);
                }
                /*верхний фланец (только для ЛТ)  */
                if (topFlan == "есть") {
                    var firstPosition_x = (params.stairAmt3 - 1) * b3 + a3 + 5;
                    var firstPosition_y = params.stairAmt3 * h3 + 5;
                    //var firstPosition_z = 0;
                    var flanLength = firstPosition_y - params.topFlanHolesPosition + 40 + 105 - (params.stairAmt3 - 1) * h3 + 60;
                    if (stairFrame == "есть") {
                        var frameProfileHeight = 40;
                        flanLength = treadThickness + frameProfileHeight + h3 + 20 - params.topFlanHolesPosition;
                        firstPosition_y = stairAmt3 * h3 - treadThickness - frameProfileHeight - 5;
                    }

                    //console.log(firstPosition_y)
                    // левый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan = flanParams.mesh;
                    flan.position.x = firstPosition_x;
                    if (stairFrame == "нет") flan.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition + 5;
                    if (stairFrame == "есть") flan.position.y = firstPosition_y;
                    flan.position.z = flanParams.width + stringerThickness;
                    flan.rotation.x = 0;
                    flan.rotation.y = Math.PI * 0.5;
                    //console.log(flan.position)
                    stringerParams3.groupang.add(flan);
                    //console.log(flan.position.y)

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    if (stairFrame == "нет") flan2.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition + 5;
                    if (stairFrame == "есть") flan2.position.y = firstPosition_y;
                    flan2.position.z = params.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI * 0.5;
                    stringerParams3.groupang.add(flan2);

                    dxfBasePoint = newPoint_xy(dxfBasePoint, 2000, 0);
                }
            }
        }// end of drawPAngles3();

        carcas.push(stringerParams3.group);
        angles.push(stringerParams3.groupang);

        topParts.push(stringerParams3.group);
        topParts.push(stringerParams3.groupang);

        dxfBasePoint = newPoint_xy(stringerParams3.dxfBasePoint, dxfBasePointStep, 0);

        //покрытие ступеней и площадок из рифленки

		if ((stairType == "рифленая сталь" || stairType == "рифленый алюминий")) {
		 	if (stringerTurn != "забег") {
            // Прямые ступени нижнего марша (рифленки)
            marshTreadsParams1.dxfBasePoint = dxfBasePoint;
            marshTreadsParams1 = drawMarshTreads(marshTreadsParams1, marshFramesParams1);
            treads.push(marshTreadsParams1.treads);
            risers.push(marshTreadsParams1.risers);
            bottomParts.push(marshTreadsParams1.treads);
            bottomParts.push(marshTreadsParams1.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);

            // Покрытие промежуточной площадки (рифленки)
            platformCoverParams1.dxfBasePoint = dxfBasePoint;
            treadsMarsh1 = drawPlatformCover(platformCoverParams1, platformFramesParams1);
            bottomParts.push(platformCoverParams1.group);

            dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams1.platformLength + dxfBasePointStep, 0);

            // Прямые ступени верхнего марша (рифленки)
            marshTreadsParams3.dxfBasePoint = dxfBasePoint;
            marshTreadsParams3 = drawMarshTreads(marshTreadsParams3, marshFramesParams3);
            treads.push(marshTreadsParams3.treads);
            risers.push(marshTreadsParams3.risers);
            topParts.push(marshTreadsParams3.treads);
            topParts.push(marshTreadsParams3.risers);
            dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams3.a + dxfBasePointStep, 0);
    		}

            // Покрытие верхней площадки (рифленки)
            if (platformTop == "площадка") {
                platformCoverParams3.dxfBasePoint = dxfBasePoint;
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);
                topParts.push(platformCoverParams3.group);

                dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.a + dxfBasePointStep, 0);
            }
        } // end if




        //позиционирование групп верхнего марша


        // установка позиции нижнего марша (при повороте верхнего)
        for (i = 0; i < bottomParts.length; i++) {
            bottomParts[i].position.z += params.M * (turnFactor - 1) * 0.5;
        }

        // установка позиции верхнего марша
        var pos = {
            x: params.b1 * params.stairAmt1 + (params.model == "лт" ? 35 : params.a1 - params.b1 - 40.0 + params.a3 - params.b3),
            y: params.h1 * (params.stairAmt1 + 1),
            z: platformWidth_1 * turnFactor - params.M * (turnFactor - 1) * 0.5
        };
        if (stringerTurn == "забег") {
            if (params.model == "лт" && stairFrame == "есть") pos.x += 40.0;
            if (params.model == "ко") pos.x -= 47.0;
            pos.y += params.h3 * 5;
            pos.z = params.M * (turnFactor + 1) - params.M * (1 - turnFactor) * 0.5 + params.marshDist * turnFactor;
        }
        var rot = -Math.PI;
        for (i = 0; i < topParts.length; i++) {
            topParts[i].position.x += pos.x;
            topParts[i].position.y += pos.y;
            topParts[i].position.z += pos.z;
            topParts[i].rotation.y -= rot;
        }



        /*** ТЕТИВЫ П-ОБРАЗНАЯ ЗАБЕЖНОЙ УЧАСТОК ***/


        //dxfBasePoint = newPoint_xy(stringerParams3.dxfBasePoint, dxfBasePointStep, 0);

        stringerParams2 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "platformP",
            topEndLength: tyrnLength,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            treadSideOffset: treadSideOffset,
            h: h1,
            b: b1,
            a: a1,
            h3: h3,
            stairAmt: stairAmt1 + 1,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            platformLength_1: platformLength_1,
            platformWidth_1: platformWidth_1,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
            group: new THREE.Object3D(),      // группа
            groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
            railingModel: railingModel, //модель ограждения
        };

        drawPStringers2();

        function drawPStringers2() {
            stringerParams2.botEnd = params.model == "лт" ? "winder" : "winder2";
            stringerParams2.topEnd = params.model == "лт" ? "winder" : "winder2";
            if (stairModel == "П-образная с забегом") {
                stringerParams2.stairAmt = 0;
            }

            stringerParams2.h1 = h1;
            stringerParams2.h = h3;
            stringerParams2.b = b3;
            stringerParams2.a = a3;

            stringerParams2.topEndLength = stringerSideOffset - 15 + 60 + stringerThickness * 3 + 4.5;

            /*тетивы забежных ступеней*/
            if (stairModel == "П-образная с забегом") {
                /*внутренняя тетива забежных степеней*/
                stringerParams2.key = "in";
                stringerParams2.text = "забежный";
                stringerParams2.marshDist = marshDist;
                if (params.model == "лт") drawStringerLt(stringerParams2, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
                if (params.model == "ко") drawStringerKo(stringerParams2, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
                var geom = new THREE.ExtrudeGeometry(stringerParams2.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer5 = new THREE.Mesh(geom, stringerMaterial);
                stringer5.position.set(0.0, 0.0, -stringerSideOffset * turnFactor + (params.M - stringerThickness) * (turnFactor + 1) * 0.5);
                stringerParams2.group.add(stringer5);

                /*внешняя тетива забежных степеней*/

                dxfBasePoint = newPoint_xy(dxfBasePoint, 2000, 0);
                stringerParams2.dxfBasePoint = dxfBasePoint;
                //наличие ограждений
                stringerParams2.railingPresence = false;
                if (backRailing_2 != "нет")
                    stringerParams2.railingPresence = true;

                stringerParams2.key = "out";
                stringerParams2.text = "забежный";
                if (params.model == "лт") drawStringerLt(stringerParams2, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
                if (params.model == "ко") drawStringerKo(stringerParams2, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
                var geom = new THREE.ExtrudeGeometry(stringerParams2.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                stringer6 = new THREE.Mesh(geom, stringerMaterial);
                stringer6.position.set(0.0, 0.0, -(M - stringerSideOffset - stringerThickness) * turnFactor + (params.M - stringerThickness) * (turnFactor + 1) * 0.5);
                if (params.model == "ко")
                    stringer6.position.x -= stringerThickness * 2 + 1;
                stringerParams2.group.add(stringer6);
            }
        }


/*** УГОЛКИ П-ОБРАЗНАЯ ЗАБЕЖНЫЙ МАРШ ***/


        drawPAngles2();

        function drawPAngles2() {
            if (stringerTurn == "забег") {
                //уголки соединения внешних тетив
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams2.elmIns[key1].angleB[0].x;
                if (params.model == "ко")
                    angleB.position.x -= stringerThickness * 2 + 2;
                angleB.position.y = stringerParams2.elmIns[key1].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams2.groupang.add(angleB);

                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams2.elmIns[key1].angleB[1].x;
                if (params.model == "ко")
                    angleB.position.x -= stringerThickness * 2 + 2;
                angleB.position.y = stringerParams2.elmIns[key1].angleB[1].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams2.groupang.add(angleB);

                //уголки соединения внутренних тетив
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams2.elmIns[key2].angleB[0].x;
                angleB.position.y = stringerParams2.elmIns[key2].angleB[0].y - 100;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams2.groupang.add(angleB);

                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams2.elmIns[key2].angleB[1].x;
                angleB.position.y = stringerParams2.elmIns[key2].angleB[1].y - 100;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams2.groupang.add(angleB);


                if (params.model == "лт") {
                    // перемычка под 4 забежной
                    dxfBasePoint = newPoint_xy(dxfBasePoint, 2000, 0);
                    stringerParams2.dxfBasePoint = dxfBasePoint;
                    for (ii = 0; ii < stringerParams2.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams2, stringerParams2.elmIns["out"].briges[ii], stringerParams2.group, stringerParams2.groupang);
                    }
                }
            }
        }


        //позиционирование групп забежного участка

        if (stringerTurn == "забег") {
            // позиция верхнего марша
            var pos = {
                x: params.M * (turnFactor + 1) * 0.5 + params.b1 * params.stairAmt1,
                y: params.h1 * (params.stairAmt1 + 1),
                z: 0.0
            };
            if (params.model == "лт" && params.stairFrame == "нет") {
                pos.x += 36.0;
                pos.y += params.h3 * 2;
                pos.z += (-1 + params.M) * turnFactor;
            }
            if (params.model == "лт" && params.stairFrame == "есть") {
                pos.x += 75;
                pos.y += params.h3 * 2;
                pos.z += (params.M) * turnFactor;
            }
            if (params.model == "ко") {
                pos.x += -15.0 + params.a1 - params.b1; // params.b1 * (params.stairAmt1 - 1) + params.a1 - 15,
                pos.y += params.h3 * 2;
// todo: было 72
				pos.z += (75.0 - params.a3 + params.b3) * turnFactor;  //
            }


            wndGroups = [stringerParams2.group, stringerParams2.groupang]
            var rot = Math.PI * 0.5 * turnFactor;
            for (i = 0; i < wndGroups.length; i++) {
                wndGroups[i].position.x += pos.x;
                wndGroups[i].position.y += pos.y;
                wndGroups[i].position.z += pos.z;
                wndGroups[i].rotation.y -= rot;
            }
            carcas.push(stringerParams2.group);
            angles.push(stringerParams2.groupang)
        }



        /***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ЛЕСТНИЦЫ  ***/

        drawPRailing();
        function drawPRailing() {
            if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {
                var railingSectionParams = {
                    bottomEnd: "нет",
                    platformLengthBottom: 0,
                    topEnd: platformTop,
                    platformLengthTop: M,
                    railingSide: "left",
                    stairAmt: stairAmt1,
                    h1: h1,
                    b1: b1,
                    a1: a1,
                    h2: h2,
                    M: M,
                    scale: scale,
                    lastMarsh: true,
                    topConnection: false,
                    bottomConnection: false,
                    rigelAmt: params.rigelAmt,
                    racks: stringerParams1.elmIns["out"].racks,
                    dxfBasePointRigel: { x: 0, y: 6000 },
                    dxfBasePointHandrail: { x: 0, y: 3000 },
                    handrail: handrail,
                    textHeight: 30,
                    stringerSideOffset: stringerSideOffset,
                    stringerThickness: stringerThickness,
                    model: model,
                    stairModel: stairModel,
                    turnFactor: turnFactor,
                    platformTopRailing: false, //наличие ограждения на верхней площадке
                    topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
                }

                /*замыкание поручней внешних секций верхнего и нижнего маршей*/
                var outerHandrailConnection = false;
                var isSection1 = false;
                var isSection3 = false;
                if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
                if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
                if (isSection1 && isSection3) outerHandrailConnection = true;
                railingSectionParams.lastMarsh = false;

                if (model === "лт") railingSectionParams.stringerSideOffset = 0;
                var railingPositionZ = M * turnFactor;

                /*внешняя сторона нижнего марша*/
                var railingSection1;
                if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
                    railingSectionParams.topEnd = "площадка";
                    //if (stairModel == "Г-образная с забегом") railingSectionParams.topEnd = "забег";
                    railingSectionParams.topConnection = outerHandrailConnection;
                    railingSectionParams.bottomConnection = false;
                    railingSectionParams.platformLengthTop = platformLength_1;
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = true;
                    railingSectionParams.racks = stringerParams1.elmIns["out"].racks;
                    railingPositionZ = -40 * turnFactor;
                    railingSection1 = drawRailingSectionNewel(railingSectionParams);
                    railingSection1.position.z = railingPositionZ * scale;
                    railing.push(railingSection1);
                }

                /*внутренняя сторона нижнего марша*/

                if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
                    railingSectionParams.topEnd = "нет";
                    railingSectionParams.bottomEnd = "нет";
                    railingSectionParams.platformLengthBottom = 0;
                    railingSectionParams.platformLengthTop = 0;
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
                    railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
                    railingSectionParams.railingSide = "right";
                    railingPositionZ = M * turnFactor;
                    var railingSection2 = drawRailingSectionNewel(railingSectionParams);
                    railingSection2.position.z = railingPositionZ * scale;
                    railing.push(railingSection2);
                }


                /*верхний марш*/
                railingSectionParams.lastMarsh = true;

                var topPltRailing_3 = params.topPltRailing_3;
                var topPltRailing_4 = params.topPltRailing_4;

                if (turnFactor < 0) {
                    topPltRailing_3 = params.topPltRailing_4;
                    var topPltRailing_4 = params.topPltRailing_3;
                }

                railingSectionParams.a1 = a3;
                railingSectionParams.b1 = b3;
                railingSectionParams.h1 = h3;
                railingSectionParams.stairAmt = stairAmt3;

                /*внешняя сторона верхнего марша*/

                if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
                    railingSectionParams.topEnd = platformTop;
                    //railingSectionParams.bottomEnd = "площадка";
                    railingSectionParams.topConnection = false;
                    railingSectionParams.bottomConnection = outerHandrailConnection;
                    railingSectionParams.platformLengthTop = platformLength_3;
                    railingSectionParams.railingSide = "left";
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
                    if (platformTop == "площадка" && topPltRailing_3)
                        railingSectionParams.platformTopRailing = true;
                    railingSectionParams.racks = stringerParams3.elmIns["out"].racks;

                    var railingSection3 = drawRailingSectionNewel(railingSectionParams);

                    railingSection3.rotation.y = -Math.PI * turnFactor;
                    railingSection3.position.x = b1 * stairAmt1 + 40 - 5;
                    railingSection3.position.y = h1 * (stairAmt1 + 1);
                    railingSection3.position.z = (platformWidth_1 + 40) * turnFactor;
                    if (stairModel == "П-образная с забегом") {
                        railingSection3.position.y += 5 * h3;
                        railingSection3.position.x += 40;
                        railingSection3.position.z = (marshDist + M * 2 + 40) * turnFactor;
                        if (model == "лт" && stairFrame == "нет") {
                            railingSection3.position.x -= 40;
                        }
                    }
                    if (model == "ко") {
                        railingSection3.position.x += a1 - b1 - 40 + 5;
                        railingSection3.position.x += a3 - b3 - 40;
                        //railingSection3.position.z -= (a3 - b3 - 40) * turnFactor;
                        if (stairModel == "П-образная с забегом") {
                            railingSection3.position.x -= 80 + stringerThickness;
                        }
                    }
                    
                    railing.push(railingSection3);
                }

                /*внутренняя сторона верхнего марша*/

                if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
                    railingSectionParams.topEnd = platformTop;
                    railingSectionParams.bottomEnd = "нет";
                    railingSectionParams.platformLengthBottom = 0;
                    railingSectionParams.platformLengthTop = platformLength_3;
                    //ограждение верхней площадки
                    railingSectionParams.platformTopRailing = false;
                    if (platformTop == "площадка" && topPltRailing_4)
                        railingSectionParams.platformTopRailing = true;
                    railingSectionParams.racks = stringerParams3.elmIns["in"].racks;
                    railingSectionParams.railingSide = "right";

                    var railingSection4 = drawRailingSectionNewel(railingSectionParams);

                    railingSection4.rotation.y = -Math.PI * turnFactor;
                    railingSection4.position.x = b1 * stairAmt1 + 40 - 5;
                    railingSection4.position.y = h1 * (stairAmt1 + 1);
                    railingSection4.position.z = (platformWidth_1 - M) * turnFactor;
                    if (stairModel == "П-образная с забегом") {
                        railingSection4.position.y += 5 * h3;
                        railingSection4.position.x += 40;
                        railingSection4.position.z = (marshDist + M) * turnFactor;
                        if (model == "лт" && stairFrame == "нет") {
                            railingSection4.position.x -= 40;
                        }
                    }

                    if (model == "ко") {
                        railingSection4.position.x += a1 - b1 - 40 + 5;
                        railingSection4.position.x += a3 - b3 - 40;
                        //railingSection4.position.z -= (a3 - b3 - 40) * turnFactor;
                        if (stairModel == "П-образная с забегом") {
                            railingSection4.position.x -= 80 + stringerThickness;
                        }
                    }

                    railing.push(railingSection4);
                }

                /*заднее ограждение промежуточной площадки*/
                if (!(stairModel == "П-образная с забегом")) {
                    if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
                        railingSectionParams.h1 = h1;
                        railingSectionParams.stairAmt = stairAmt1;
                        railingSectionParams.platformLengthTop = platformLength_1;
                        railingSectionParams.topEnd = "площадка";
                        railingSectionParams.topPltRailing_5 = true;
                        railingSectionParams.platformTopRailing = true;
                        railingSectionParams.topConnection = true;
                        railingSectionParams.lastMarsh = false;
                        if (model === "лт")
                            railingSectionParams.racks = stringerParams3.elmIns["rearP"].racks;
                        if (model === "ко") {
                            //stringerParams1.elmIns["rearP1"].racks.push(stringerParams3.elmIns["rearP1"].racks[0]);
                            var p1 = stringerParams3.elmIns["rearP1"].racks[0];
                            var p2 = stringerParams1.elmIns["rearP1"].racks[0];
                            stringerParams1.elmIns["rearP1"].racks.push(newPoint_xy(p2, (platformLength_1 - p2.x - p1.x - stringerSideOffset - 18), 0));
                            railingSectionParams.racks = stringerParams1.elmIns["rearP1"].racks;
                        }

                        railingSectionParams.railingSide = "left";
                        railingPositionZ = -40 * turnFactor;

                        var railingSection5 = drawRailingSectionNewel(railingSectionParams);

                        railingSection5.rotation.y = -Math.PI * turnFactor;
                        railingSection5.position.x = b1 * (stairAmt1) + 40 - 5;//+ platformLength_1;
                        railingSection5.position.y = h1 * (stairAmt1 + 1);
                        railingSection5.position.z = (platformWidth_1 + 40) * turnFactor;
                        if (model === "ко") {
                            railingSection5.position.x += a1 - b1 - 80 - 5 + platformLength_1;
                            railingSection5.position.y -= 40;
                        }
                        railing.push(railingSection5);
                    }
                }

                /*заднее ограждение верхней площадки*/
                if (railingSide_3 !== "нет") {
                    if (platformTop == "площадка" && params.topPltRailing_5) {
                        railingSectionParams.h1 = h3;
                        railingSectionParams.stairAmt = stairAmt3;
                        railingSectionParams.topPltRailing_5 = true;
                        railingSectionParams.platformTopRailing = true;
                        railingSectionParams.topConnection = false;
                        railingSectionParams.lastMarsh = true;
                        railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
                        railingSectionParams.railingSide = "left";

                        var railingSection6 = drawRailingSectionNewel(railingSectionParams);

                        railingSection6.rotation.y = Math.PI / 2 * turnFactor;
                        railingSection6.position.x = b1 * (stairAmt1) -
                            b3 * (stairAmt3) -
                            platformLength_3 -
                            stringerThickness * 2 + 6;
                        railingSection6.position.y = h1 * (stairAmt1 + 1) * scale + 5 + h3 * (stairAmt3 + 1);
                        railingSection6.position.z = platformWidth_1 * turnFactor;

                        //if (model == "лт") railingSection6.position.x -= railingSection6.position.x - stringerThickness;
                        if (stairModel == "П-образная с забегом") {
                            railingSection6.position.y += 5 * h3;
                            railingSection6.position.x += 40;
                            railingSection6.position.z = (marshDist + M * 2) * turnFactor;
                            if (model == "лт" && stairFrame == "нет") {
                                railingSection6.position.x -= 40;
                            }
                        }
                        if (model === "ко") {
                            railingSection6.position.x += a1 - b1 - 40 + stringerThickness * 2;
                            railingSection6.position.z -= stringerThickness * turnFactor;
                            railingSection6.position.y -= 40 + 5;
                            if (stairModel == "П-образная с забегом") {
                                railingSection6.position.x -= 80 + stringerThickness;
                                railingSection6.position.z += (stringerThickness) * turnFactor;
                            }
                        }
                        
                        railing.push(railingSection6);
                    }
                }

                /*заднее ограждение промежуточной площадки П-образная с площадкой*/
                if (backRailing_1 == "есть" && stairModel == "П-образная с площадкой") {
                    railingSectionParams.platformLengthTop = platformWidth_1;
                    railingSectionParams.h1 = h3;
                    railingSectionParams.stairAmt = stairAmt3;
                    railingSectionParams.topPltRailing_5 = true;
                    railingSectionParams.platformTopRailing = true;
                    railingSectionParams.topConnection = false;
                    railingSectionParams.lastMarsh = false;
                    railingSectionParams.racks = stringerParams1.elmIns["rear1"].racks;

                    railingSectionParams.railingSide = "left";

                    var railingSection7 = drawRailingSectionNewel(railingSectionParams);

                    railingSection7.rotation.y = -Math.PI / 2 * turnFactor;
                    railingSection7.position.x = b1 * (stairAmt1) + platformLength_1 + stringerThickness + 40 - 10;
                    railingSection7.position.y = h1 * (stairAmt1 + 1) + 5;
                    railingSection7.position.z = 0;
                    if (model == "ко") {
                        railingSection7.position.x += a1 - b1 - 40;
                        railingSection7.position.y -= 40 + 5;
                        railingSection7.position.z -= stringerThickness;
                    }
                    railing.push(railingSection7);
                }

                /*заднее ограждение промежуточной площадки П-образная с забегом*/
                if (backRailing_2 === "есть" && stairModel == "П-образная с забегом") {
                    railingSectionParams.h1 = h3;
                    railingSectionParams.stairAmt = stairAmt3;
                    railingSectionParams.topPltRailing_5 = true;
                    railingSectionParams.platformTopRailing = true;
                    railingSectionParams.topConnection = false;
                    railingSectionParams.lastMarsh = false;

                    railingSectionParams.racks = stringerParams2.elmIns["out"].racks;
                    railingSectionParams.platformLengthTop = railingSectionParams.racks[3].x - railingSectionParams.racks[0].x;
                    railingSectionParams.platformLengthTop += 40 + 80 * 2;
                    if (model == "ко")
                        railingSectionParams.platformLengthTop += stringerSideOffset * 2;

                    railingSectionParams.railingSide = "left";

                    var railingSection7 = drawRailingSectionNewel(railingSectionParams);

                    railingSection7.rotation.y = -Math.PI / 2 * turnFactor;
                    railingSection7.position.x = b1 * (stairAmt1) + M + 115;
                    railingSection7.position.y = h1 * (stairAmt1 + 1) + h3 * 2;
                    railingSection7.position.z = M * turnFactor;
                    if (model == "ко") {
                        railingSection7.position.x += a1 - b1 - 90;
                        railingSection7.position.z -= (M - 24 + stringerSideOffset) * turnFactor;
                    }
                    if (model == "лт" && stairFrame == "нет" && stairModel == "П-образная с забегом") {
                        railingSection7.position.x -= 40;
                        railingSection7.position.z -= 1 * turnFactor;
                    }
                    railing.push(railingSection7);
                }
            }
            if (railingModel == "Стекло на стойках") {

            }
	        if (railingModel == "Самонесущее стекло") {
				var railingSectionParams = {
    	            bottomEnd: "нет",
    	            platformLengthBottom: 0,
    	            topEnd: platformTop,
    	            platformLengthTop: M,
    	            railingSide: "left",
    	            stairAmt: stairAmt1 + 1,
    	            h1: h1,
    	            b1: b1,
    	            a1: a1,
    	            h2: h2,
    	            h3: h3,
					b3: b3,
    	            a3: a3,
    	            M: M,
    	            scale: scale,
    	            //lastMarsh: true,
    	            lastMarsh: false,
    	            topConnection: false,
    	            bottomConnection: false,
    	            rigelAmt: params.rigelAmt,
    	            racks: stringerParams1.elmIns["out"].racks,
    	            dxfBasePoint: dxfBasePoint,
    	            handrail: handrail,
    	            textHeight: 30,
    	            stringerSideOffset: stringerSideOffset,
    	            stringerThickness: stringerThickness,
    	            model: model,
    	            platformTopRailing: false, //наличие ограждения на верхней площадке
    	            topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
    	        }
				railingSectionParams.stairModel = "П-образная с площадкой";
    	        /*замыкание поручней внешних секций верхнего и нижнего маршей*/
    	        var outerHandrailConnection = false;
    	        var isSection1 = false;
    	        var isSection3 = false;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
    	        if (isSection1 && isSection3) outerHandrailConnection = true;
    	        railingSectionParams.lastMarsh = false;

    	        if (model === "лт") railingSectionParams.stringerSideOffset = 0;
    	        var railingPositionZ = M * turnFactor;

    	        /*внешняя сторона нижнего марша*/
    	        var railingSection1;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "площадка";
    	            railingSectionParams.topConnection = outerHandrailConnection;
    	            railingSectionParams.bottomConnection = false;
    	            railingSectionParams.platformLengthTop = stringerParams1.topEndLength;
					if (stairModel == "П-образная с забегом") {
						railingSectionParams.topEnd = "забег";
						railingSectionParams.platformLengthTop = M + 70;
					}
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = true;
					if (backRailing_1 == "есть") railingSectionParams.topPltRailing_5 = true;
    	            railingSectionParams.racks = stringerParams1.elmIns["out"].racks;
    	            railingPositionZ = -40 * turnFactor;
    	            railingSection1 = drawRailingSectionGlass(railingSectionParams);
    	            railingSection1.position.z = railingPositionZ * scale;
    	            railing.push(railingSection1);
					railingSectionParams.paltformGlassDeltaY = railingSection1.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }

				/*внутренняя сторона нижнего марша*/

    	        if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "нет";
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = 0;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";
    	            railingPositionZ = M * turnFactor;
    	            var railingSection2 = drawRailingSectionGlass(railingSectionParams);
    	            railingSection2.position.z = railingPositionZ * scale;
    	            railing.push(railingSection2);
					railingSectionParams.paltformGlassDeltaY = railingSection2.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/

				/*заднее ограждение промежуточной площадки*/

				if ((backRailing_1 == "есть" && stairModel == "П-образная с площадкой") || (backRailing_2 == "есть" && stairModel == "П-образная с забегом")) {
    	            railingSectionParams.h1 = h1;
    	            railingSectionParams.stairAmt = stairAmt1;
    	            railingSectionParams.topEnd = "площадка";
					railingSectionParams.topPltRailing_5 = true;
    	            railingSectionParams.platformTopRailing = true;
    	            railingSectionParams.topConnection = true;
    	            railingSectionParams.lastMarsh = false;
    	            railingSectionParams.railingSide = "left";
					//railingSectionParams.paltformGlassDeltaY = railingSection1.paltformGlassDeltaY;
    	            railingPositionZ = -40 * turnFactor;
					railingSectionParams.stairModel = stairModel;
					railingSectionParams.platformLength = stringerParams1.platformWidth_1;
					
					if (stairModel == "П-образная с площадкой") {
						railingSectionParams.racks = stringerParams1.elmIns["rear1"].racks;
					}		
					if (stairModel == "П-образная с забегом") {
						railingSectionParams.racks = stringerParams2.elmIns["out"].racks;
						railingSectionParams.topEnd = "забег";
						railingSectionParams.bottomEnd = "забег";
						railingSectionParams.stairAmt = 0;
					}

    	            var railingSection5 = drawRailingSectionGlassPlatform(railingSectionParams);

    	            railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection5.position.x = b1 * (stairAmt1) + stringerParams1.topEndLength + 5 + 5;
    	            railingSection5.position.y = h1 * (stairAmt1 + 1) + 5;
    	            railingSection5.position.z = 0;
					if (stairModel == "П-образная с забегом") {
						railingSection5.position.x = b1 * (stairAmt1) + 70 + 5 + M;
						railingSection5.position.y = h1 * (stairAmt1 + 1) + 2*h3;
						railingSection5.position.z = M * turnFactor;
						if (stairFrame == "нет") {
							railingSection5.position.x = railingSection5.position.x - 40;
						}
					}
    	            if (model === "ко") {
    	                railingSection5.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection5.position.y -= 40 + 5;
    	            }
    	            railing.push(railingSection5);
				}

				/*верхний марш*/

    	        railingSectionParams.lastMarsh = true;

    	        var topPltRailing_3 = params.topPltRailing_3;
    	        var topPltRailing_4 = params.topPltRailing_4;
				
				if (turnFactor < 0) {
                    topPltRailing_3 = params.topPltRailing_4;
                    var topPltRailing_4 = params.topPltRailing_3;
                }

    	        railingSectionParams.a1 = a3;
    	        railingSectionParams.b1 = b3;
    	        railingSectionParams.h1 = h3;
    	        railingSectionParams.stairAmt = stairAmt3;
				
				/*внешняя сторона верхнего марша*/

    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
					railingSectionParams.stairModel = stairModel;
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.bottomEnd = "площадка";
    	            railingSectionParams.platformLengthBottom = platformLength_1;
    	            if (stairModel == "П-образная с забегом") {
						railingSectionParams.bottomEnd = "забег";
						railingSectionParams.platformLengthBottom = M - 8;
					}
    	            railingSectionParams.topConnection = false;
    	            railingSectionParams.bottomConnection = outerHandrailConnection;
    	            railingSectionParams.platformLengthTop = platformLength_3;
					railingSectionParams.platformLength = platformLength_3;

    	            railingSectionParams.railingSide = "left";
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_3) {
    	                railingSectionParams.platformTopRailing = true;
						railingSectionParams.stairAmt = stairAmt3 + 1;
					}
					railingSectionParams.topPltRailing_5_low = false;
					if (backRailing_1 == "есть") railingSectionParams.topPltRailing_5_low = true;
					railingSectionParams.topPltRailing_5 = params.topPltRailing_5;
    	            railingSectionParams.racks = stringerParams3.elmIns["out"].racks;
					railingSectionParams.basePointBottomTurnGlassOut = stringerParams3.pgalssPosition;
    	            var railingSection3 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection3.rotation.y = (-Math.PI) * turnFactor;
    	            railingSection3.position.x = b1 * (stairAmt1) + 40 - 5;
    	            railingSection3.position.y = h1 * (stairAmt1 + 1);
    	            railingSection3.position.z = (stringerParams1.platformWidth_1 + 40) * turnFactor;
					if (stairModel == "П-образная с забегом") {
						railingSection3.position.y = h1 * (stairAmt1 + 1) + 5 * h3;
						railingSection3.position.x = b1 * (stairAmt1) + 40 + 70 + 5;
						railingSection3.position.z = (2*M + marshDist + 40) * turnFactor;
						if (stairFrame == "нет") {
							railingSection3.position.x = railingSection3.position.x - 40;
						}
					}
    	            if (model == "ко") {
    	                railingSection3.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection3.position.z -= (a3 - b3 - 40) * turnFactor;
    	            }
    	            railing.push(railingSection3);
					railingSectionParams.paltformGlassDeltaY = railingSection3.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/

				/*внутренняя сторона верхнего марша*/

    	        if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {

					railingSectionParams.topPltRailing_5_low = false;
					if (backRailing_1 == "есть") railingSectionParams.topPltRailing_5_low = true;
					railingSectionParams.topPltRailing_5 = params.topPltRailing_5;
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = platformLength_3;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_4) {
    	                railingSectionParams.platformTopRailing = true;
						railingSectionParams.stairAmt = stairAmt3 + 1;
					}
					railingSectionParams.racks = stringerParams3.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";

    	            var railingSection4 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection4.rotation.y = -Math.PI * turnFactor;
    	            railingSection4.position.x = b1 * (stairAmt1) + 40 - 5;
    	            railingSection4.position.y = h1 * (stairAmt1 + 1);
					railingSection4.position.z = (stringerParams1.platformWidth_1 - M) * turnFactor;
    	            if (stairModel == "П-образная с забегом") {
						railingSection4.position.y = h1 * (stairAmt1 + 1) + 5 * h3;
						railingSection4.position.x = b1 * (stairAmt1) + 70 + 5;
						railingSection4.position.z = (M + marshDist) * turnFactor;
						if (stairFrame == "нет") {
							railingSection4.position.x = railingSection4.position.x - 40;
						}
					}
					if (model == "ко") {
    	                railingSection4.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection4.position.z -= (a3 - b3 - 40) * turnFactor;
    	            }

    	            railing.push(railingSection4);
					railingSectionParams.paltformGlassDeltaY = railingSection4.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }

				/*заднее ограждение верхней площадки*/
				
    	        if (railingSide_3 !== "нет") {
    	            if (platformTop == "площадка" && params.topPltRailing_5) {
    	                railingSectionParams.h1 = h3;
    	                railingSectionParams.stairAmt = stairAmt3+1;
    	                railingSectionParams.topPltRailing_5 = true;
    	                railingSectionParams.platformTopRailing = true;
    	                railingSectionParams.topConnection = false;
    	                railingSectionParams.lastMarsh = true;
    	                railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
    	                railingSectionParams.railingSide = "left";
						railingSectionParams.platformLength = M;

    	                var railingSection6 = drawRailingSectionGlassPlatform(railingSectionParams);

    	                railingSection6.rotation.y = -Math.PI*0.5 * turnFactor;
    	                railingSection6.position.x = b1 * (stairAmt1) - b3 * (stairAmt3) - platformLength_3 - 35 + 8;
						railingSection6.position.y = h1 * (stairAmt1 + 1) + 5 + h3 * (stairAmt3 + 1);
						//railingSection6.position.z = (M + b3 * (stairAmt3) + platformLength_3 + 5 - 35 - 1) * turnFactor;
						railingSection6.position.z = (stringerParams1.platformWidth_1 - M) * turnFactor;
						if (stairModel == "П-образная с забегом") {
							railingSection6.position.y = h1 * (stairAmt1 + 1) + 5 + h3 * (stairAmt3 + 5 + 1);
							railingSection6.position.x = b1 * (stairAmt1) + 70 + 5 - b3 * (stairAmt3) - platformLength_3 - 60;
							railingSection6.position.z = (M + marshDist) * turnFactor;
							if (stairFrame == "нет") {
								railingSection6.position.x = railingSection6.position.x - 40;
							}
						}
    	                if (model === "ко") {
    	                    railingSection6.position.x += a1 - b1 - 40 + stringerThickness * 2;
    	                    railingSection6.position.z -= stringerThickness;
    	                    railingSection6.position.y -= 40 + 5;
    	                }
    	                railing.push(railingSection6);
    	            }
    	        }/**/
	        }
			
            if (railingModel == "Кованые балясины") {
							var railingSectionParams = {
									bottomEnd: "нет",
									platformLengthBottom: 0,
									topEnd: platformTop,
									platformLengthTop: platformLength_3,
									railingSide: "right",
									stairAmt: stairAmt1,
									h: h1,
									b: b1,
									a: a1,
									scale: scale,
									lastMarsh: true,
									topConnection: false,
									bottomConnection: false,
									connectionLength: 88,
									rigelAmt: params.rigelAmt,
									stringerSideOffset: stringerParams1.stringerSideOffset,
									racks: stringerParams1.elmIns["out"].racks,
									platformRack: false,
									winder: false,
									topWinder: false,
									turnFactor: turnFactor,
									dxfBasePoint: dxfBasePoint,
									handrail: handrail,
									turnFactor: turnFactor,
									text: 'Секция под кованые балясины',
									gInBottom: false
							}
							var railingSectionFunction = function() {};
							railingSectionFunction = drawRailingSectionForge; //
							var railingPositionZ = M * turnFactor;
							var railingSection1, railingSection2, railingSection3, railingSection4;
							//IN
							if (railingSide_1 === "внутреннее" || railingSide_1 === "две") {
									railingSectionParams.gInBottom = true;
									railingSectionParams.railingSide = 'right';
									railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
									railingSection1 = railingSectionFunction(railingSectionParams);
									railingSection1.position.z = railingPositionZ + 40 * (0.5 * turnFactor - 0.5);
									railing.push(railingSection1);
									railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
									if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
									railingSectionParams.gInBottom = false;
							}
							//OUT
							if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
									railingSectionParams.lastMarsh = false;
									if (stairModel == "П-образная с забегом") railingSectionParams.winder = true;
									railingSectionParams.railingSide = 'left';
									railingSectionParams.topConnection = ((backRailing_1 == "есть" && stairModel == "П-образная с площадкой") || (backRailing_2 == "есть" && stairModel == "П-образная с забегом")) ? true : false;
									railingSectionParams.connectionLength = model == "ко" ? 158 : 125;
									var racksStringer = [];
									var countRack = 0;
									for (; countRack < stringerParams1.elmIns['out'].racks.length; countRack++) {
											racksStringer.push(stringerParams1.elmIns['out'].racks[countRack]);
									}
									if (model == "ко" && stairModel != 'П-образная с забегом') {
											var countArr = stringerParams1.elmIns['out'].racks.length - 1;
											var point = newPoint_xy(stringerParams1.elmIns['out'].racks[countArr], stringerParams1.elmIns['rearSideP'].racks[0].x + stringerParams1.b / 2 + 8, 0.0);
											racksStringer.push(point);
									}
									railingSectionParams.racks = racksStringer;
									railingSection2 = railingSectionFunction(railingSectionParams);
									railingSection2.position.z = -20 * (1 + turnFactor);
									railing.push(railingSection2);
									railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
									if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
									railingSectionParams.topConnection = false;
									railingSectionParams.winder = false;
							}
							/*ограждения верхнего марша*/
							railingSectionParams.h = h3;
							railingSectionParams.a = a3;
							railingSectionParams.b = b3;
							//IN
							if (railingSide_3 === "внутреннее" || railingSide_3 === "две") {
									railingSectionParams.lastMarsh = (topPltRail_4 && platformTop == "площадка") ? false : true;
									if (topPltRail_5 && topPltRail_4 && platformTop == "площадка") railingSectionParams.topConnection = true;
									railingSectionParams.railingSide = 'right';
									var racksStringer = [];
									for (i = 0; i < stringerParams3.elmIns['in'].racks.length; i++) {
											racksStringer.push(stringerParams3.elmIns['in'].racks[i]);
									}
									if (model == "ко" && platformTop == "площадка" && topPltRail_4) {
											var countArr = stringerParams3.elmIns['out'].racks.length - 1;
											var point = newPoint_xy(stringerParams3.elmIns['out'].racks[countArr], stringerParams3.elmIns['sideStringerKo'].racks[0].x + stringerParams3.b / 2, 0.0);
											racksStringer.push(point);
									}
									railingSectionParams.racks = racksStringer;
									railingSection3 = railingSectionFunction(railingSectionParams);
									railingSection3.rotation.y = -Math.PI * turnFactor;
									railingSection3.position.x = b1 * stairAmt1 + 40 - 5;
									railingSection3.position.y = h1 * (stairAmt1 + 1);
									railingSection3.position.z = (platformWidth_1 - M) * turnFactor + 40 * (0.5 - 0.5 * turnFactor);
									if (stairModel == "П-образная с забегом") {
											railingSection3.position.y += 5 * h3;
											railingSection3.position.x += 40;
											railingSection3.position.z = (marshDist + M) * turnFactor;
											if (model == "лт" && stairFrame == "нет") {
													railingSection3.position.x -= 40;
											}
									}
									if (model == "ко") {
											railingSection3.position.x += a1 - b1 - 40 + 5;
											railingSection3.position.x += a3 - b3 - 40;
											if (stairModel == "П-образная с забегом") {
													railingSection3.position.x -= 80 + stringerThickness;
											}
									}
									railing.push(railingSection3);
									railingSectionParams.bottomConnection = railingSectionParams.topConnection = false;
									railingSectionParams.dxfBasePoint.x += stringerParams1.M + b3 * stairAmt3 + 300;
									if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
							}
							/*/OUT*/
							if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
									railingSectionParams.railingSide = 'left';
									if (stairModel == "П-образная с забегом") railingSectionParams.winder = true;
									if ((backRailing_1 == "есть" && stairModel == "П-образная с площадкой") || (backRailing_2 == "есть" && stairModel == "П-образная с забегом")) railingSectionParams.bottomConnection = true;
									if (topPltRail_5 && topPltRail_3 && platformTop == "площадка") railingSectionParams.topConnection = true;
									railingSectionParams.connectionLength = model == "ко" ? 170 : 123;
									railingSectionParams.lastMarsh = (topPltRail_3 && platformTop == "площадка") ? false : true;
									var racksStringer = [];
									if (model == "ко" && stairModel != 'П-образная с забегом') {
											var point = newPoint_xy(stringerParams3.elmIns['out'].racks[0], stringerParams3.b * 0.5 - stringerParams1.platformLength_1 + 162, 0.0);
											racksStringer.push(point);
									}
									for (i = 0; i < stringerParams3.elmIns['out'].racks.length; i++) {
											racksStringer.push(stringerParams3.elmIns['out'].racks[i]);
									}
									if (model == "ко" && platformTop == "площадка" && topPltRail_3) {
											var countArr = stringerParams3.elmIns['out'].racks.length - 1;
											var point = newPoint_xy(stringerParams3.elmIns['out'].racks[countArr], stringerParams3.elmIns['sideStringerKo'].racks[0].x + stringerParams3.b / 2, 0.0);
											racksStringer.push(point);
									}
									railingSectionParams.racks = racksStringer;
									railingSection4 = drawRailingSectionForge3(railingSectionParams);
									railingSection4.rotation.y = -Math.PI * turnFactor;
									railingSection4.position.x = b1 * stairAmt1 + 40 - 5;
									railingSection4.position.y = h1 * (stairAmt1 + 1);
									railingSection4.position.z = (platformWidth_1) * turnFactor + 40 * (0.5 + 0.5 * turnFactor);
									if (stairModel == "П-образная с забегом") {
											railingSection4.position.y += 5 * h3;
											railingSection4.position.x += 40;
											railingSection4.position.z = (marshDist + M * 2 + 40) * turnFactor;
											if (model == "лт" && stairFrame == "нет") {
													railingSection4.position.x -= 40;
											}
									}
									if (model == "ко") {
											railingSection4.position.x += a1 - b1 - 40 + 5;
											railingSection4.position.x += a3 - b3 - 40;
											if (stairModel == "П-образная с забегом") {
													railingSection4.position.x -= 80 + stringerThickness;
											}
									}
									railing.push(railingSection4);
									railingSectionParams.dxfBasePoint.x += b3 * stairAmt3 + M + 100;
									if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
									railingSectionParams.bottomConnection = railingSectionParams.topConnection = false;
									railingSectionParams.winder = false;
							}
							/*/заднее ограждение промежуточной площадки П-образной с площадкой*/
							if (backRailing_1 == "есть" && stairModel == "П-образная с площадкой") {
									railingSectionParams.racks = stringerParams1.elmIns["rear1"].racks;
									railingSectionParams.platformRack = true;
									railingSectionParams.bottomConnection = true;
									railingSectionParams.topConnection = true;
									railingSectionParams.railingSide = 'left';
									railingSectionParams.connectionLength = model == "ко" ? 175 : 60;
									var railingSection5 = railingSectionFunction(railingSectionParams);
									railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
									railingSection5.position.x = b1 * (stairAmt1) + platformLength_1 + stringerThickness + 40 * (0.5 * turnFactor + 0.5) - 10;
									railingSection5.position.y = h1 * (stairAmt1 + 1) + 5;
									railingSection5.position.z = 0;
									if (model == "ко") {
											railingSection5.position.x += a1 - b1 - 40;
											railingSection5.position.y -= 40 + 5;
											railingSection5.position.z += stringerParams1.stringerSideOffset * turnFactor;
									}
									railing.push(railingSection5);
									railingSectionParams.dxfBasePoint.x += platformWidth_1 + 150;
							}
							/*/заднее ограждение промежуточной площадки П-образной с забегом*/
							if (backRailing_2 == "есть" && stairModel == "П-образная с забегом") {
									railingSectionParams.racks = stringerParams2.elmIns["out"].racks;
									railingSectionParams.platformRack = true;
									railingSectionParams.bottomConnection = true;
									railingSectionParams.topConnection = true;
									railingSectionParams.railingSide = 'left';
									railingSectionParams.winder = true;
									railingSectionParams.connectionLength = model == "ко" ? 175 : 123;
									var railingSection6 = railingSectionFunction(railingSectionParams);
									railingSection6.rotation.y = -Math.PI / 2 * turnFactor;
									railingSection6.position.x = b1 * (stairAmt1) + M + 115;
									railingSection6.position.y = h1 * (stairAmt1 + 1) + h3 * 2;
									railingSection6.position.z = M * turnFactor;
									if (model == "ко") {
											railingSection6.position.x += a1 - b1 - 90;
											railingSection6.position.z -= (M - 24 + stringerSideOffset) * turnFactor;
									}
									if (model == "лт" && stairFrame == "нет" && stairModel == "П-образная с забегом") {
											railingSection6.position.x -= 40;
											railingSection6.position.z -= 1 * turnFactor;
									}
									railing.push(railingSection6);
									railingSectionParams.topConnection = railingSectionParams.bottomConnection = false;
									railingSectionParams.dxfBasePoint.x += platformWidth_1 + 150;
							}
							/*/заднее ограждение верхней площадки*/
							if (platformTop == "площадка" && params.topPltRailing_5) {
									railingSectionParams.topConnection = (topPltRail_4) ? true : false;
									railingSectionParams.bottomConnection = (topPltRail_3) ? true : false;
									railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
									railingSectionParams.platformRack = true;
									railingSectionParams.railingSide = 'left';
									railingSectionParams.connectionLength = model == 'ко' ? 153 : 103;
									var railingSection7 = railingSectionFunction(railingSectionParams);
									
									railingSection7.rotation.y = Math.PI / 2 * turnFactor;
									railingSection7.position.x = b1 * (stairAmt1) -
											b3 * (stairAmt3) -
											platformLength_3 -
											stringerThickness * 2 + 6 + 40 * (0.5 - 0.5 * turnFactor);
									railingSection7.position.y = h1 * (stairAmt1 + 1) * scale + 5 + h3 * (stairAmt3 + 1);
									railingSection7.position.z = platformWidth_1 * turnFactor;
									
									if (stairModel == "П-образная с забегом") {
											railingSection7.position.y += 5 * h3;
											railingSection7.position.x += 40;
											railingSection7.position.z = (marshDist + M * 2) * turnFactor;
											if (model == "лт" && stairFrame == "нет") {
													railingSection7.position.x -= 40;
											}
									}
									if (model === "ко") {
											railingSection7.position.x += a1 - b1 - 40 + stringerThickness * 2;
											railingSection7.position.z -= stringerThickness * turnFactor;
											railingSection7.position.y -= 40 + 5;
											if (stairModel == "П-образная с забегом") {
													railingSection7.position.x -= 80 + stringerThickness;
													railingSection7.position.z += (stringerThickness) * turnFactor;
											}
									}
									railing.push(railingSection7);
									railingSectionParams.dxfBasePoint.x += M + 150;
							}
            }
        }//end of drawPRailing()

        function drawPRailing1() {
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
                var railingSide = "left";
                topConnection = outerHandrailConnection1;
                bottomConnection = false;
                railingPositionZ = -40 * turnFactor;
                var railingSection1 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, (stairAmt1 + 1), h1, b1, a1, h3, lastMarsh, topConnection, bottomConnection);
                ;
                railingSection1.position.z = railingPositionZ;
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
                var railingSection2 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt1, h1, b1, a1, h2, lastMarsh, topConnection, bottomConnection);
                railingSection2.position.z = railingPositionZ;
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
                var railingSide = "left";
                topConnection = false;
                bottomConnection = outerHandrailConnection2;
                var railingSection3 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt3, h3, b3, a3, h3, lastMarsh, topConnection, bottomConnection);
                railingSection3.rotation.y = -Math.PI * turnFactor;
                railingSection3.position.x = b1 * stairAmt1;
                railingSection3.position.y = h1 * (stairAmt1 + 1);
                railingSection3.position.z = stringer3.position.z + 40 * turnFactor;
                if (stairModel == "П-образная с забегом") railingSection3.position.y += 5 * h3;
                if (model == "ко") railingSection3.position.z = railingSection3.position.z + stringerSideOffset * turnFactor;

                railing.push(railingSection3);
            }

            /*внутренняя сторона верхнего марша*/

            if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
                var topEnd = platformTop;
                var bottomEnd = "нет";
                var platformLengthTop = platformLength_3;
                var platformLengthBottom = 0;
                var railingSide = "right";
                topConnection = false;
                bottomConnection = false;
                railingPositionZ = M;
                var railingSection4 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt3, h3, b3, a3, h3, lastMarsh, topConnection, bottomConnection);

                railingSection4.rotation.y = -Math.PI * turnFactor;
                railingSection4.position.x = b1 * stairAmt1;
                railingSection4.position.y = h1 * (stairAmt1 + 1);
                if (stairModel == "П-образная с забегом") railingSection4.position.y += 5 * h3;
                railingSection4.position.z = stringer4.position.z - stringerThickness * turnFactor;
                if (model == "ко") railingSection4.position.z = railingSection4.position.z - stringerSideOffset * turnFactor;
                railing.push(railingSection4);
            }

            /*заднее ограждение забега*/
            if (backRailing_2 == "есть" && stairModel == "П-образная с забегом") {

                var topEnd = "забег";
                var bottomEnd = "забег";
                var platformLengthTop = M;
                var platformLengthBottom = M + marshDist;
                var railingSide = "left";
                topConnection = outerHandrailConnection2;
                bottomConnection = outerHandrailConnection1;
                var railingSection5 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, 0, h3, b1, a1, h3, lastMarsh, topConnection, bottomConnection);
                ;
                railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
                railingSection5.position.x = stringer5.position.x + 40;
                if (model == "ко") railingSection5.position.x = railingSection5.position.x + stringerSideOffset;
                railingSection5.position.y = h1 * (stairAmt1 + 1) + 2 * h3;
                railingSection5.position.z = (M + marshDist) * turnFactor;
                railing.push(railingSection5);

            }

            /*заднее ограждение площадки*/
            if (backRailing_1 == "есть" && stairModel == "П-образная с площадкой") {
                var platformLength = platformWidth_1;
                var offsetLeft = 50;
                var offsetRight = 50;
                var handrailOffsetLeft = 50;
                var handrailOffsetRight = 50;
                var railingSide = "left";


                var railingSection5 = drawRailingSectionPlatform(
                    platformLength, offsetLeft, offsetRight,
                    handrailOffsetLeft, handrailOffsetRight, railingSide);
                railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
                railingSection5.position.x = b1 * (stairAmt1) + platformLength_1 + stringerThickness;
                if (model == "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness;
                railingSection5.position.y = h1 * (stairAmt1 + 1);
                railingSection5.position.z = 0;
                railing.push(railingSection5);
            }

            /*заднее ограждение верхней площадки*/
            if (backRailing_3 == "есть" && platformTop == "площадка") {

                var platformLength = M;
                var offsetLeft = 50;
                var offsetRight = 50;
                var handrailOffsetLeft = 50;
                var handrailOffsetRight = 50;
                var railingSide = "right";
                if (railingModel == "Самонесущее стекло") railingSide = "left";

                var railingSection5 = drawRailingSectionPlatform(
                    platformLength, offsetLeft, offsetRight,
                    handrailOffsetLeft, handrailOffsetRight, railingSide);
                railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
                railingSection5.position.x = platformStringer1.position.x - (platformLength_3 - a3) / 2 - 40;//- M/2;
                railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2 + stringerOffset_y;
                railingSection5.position.z = platformStringer2.position.z - (stringerSideOffset + stringerThickness / 2) * turnFactor;
                if (model == "лт") railingSection5.position.x = railingSection5.position.x - stringerThickness;
                railing.push(railingSection5);
            }

        }//end of drawPRailing1()

    }//end of drawPStairCase()


    /***  П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ЛЕСТНИЦА   ***/


    if (stairModel == "П-образная трехмаршевая") {
        drawP3StairCase();
    }

    function drawP3StairCase() {

		var tyrnLength, tyrnLength2, stringerTurn, stringerTurn2;
		var platformLengthTop;

		// 1
        if (stairModel == "П-образная трехмаршевая" && turnType_1 == "площадка") {
            stringerTurn = "площадка";
			if (params.model == "ко") {
				tyrnLength = params.M + 50.0;
				}
			if (params.model == "лт") {
				tyrnLength = params.M - stringerThickness + 30.0;
				}
        }
        if (stairModel == "П-образная трехмаршевая" && turnType_1 == "забег") {
            stringerTurn = "забег";
    		if (params.model == "ко") {
    			tyrnLength = params.M + 25.0;
    			}
    		if (params.model == "лт") {
    			tyrnLength = params.M - stringerThickness + 31.0;
    			}
        }

		// 2
        if (stairModel == "П-образная трехмаршевая" && turnType_2 == "площадка") {
            stringerTurn2 = "площадка";
			if (params.model == "ко") {
				tyrnLength2 = params.M + 50.0;
				}
			if (params.model == "лт") {
				tyrnLength2 = params.M - stringerThickness + 30.0;
				}
        }
        if (stairModel == "П-образная трехмаршевая" && turnType_2 == "забег") {
            stringerTurn2 = "забег";
    		if (params.model == "ко") {
    			tyrnLength2 = params.M + 25.0;
    			}
    		if (params.model == "лт") {
    			tyrnLength2 = params.M - stringerThickness + 31.0;
    			}
        }
    	if (params.model == "ко") {
    		platformLengthTop = platformLength_3;
    		}
    	if (params.model == "лт") {
    		platformLengthTop = platformLength_3 - stringerThickness;
    		}


        var dxfBasePoint = { x: 0.0, y: 0.0 };

		// Массив элементов, которые требуют позиционирования и поворота
    	// вместе с нижним маршем и вместе с верхним маршем
    	var bottomParts = [];
    	var midParts = [];
    	var topParts = [];


        // выходные массивы
        var treadsMarsh1, treadsMarsh3;
        var framesMarsh1, framesMarsh3;
		var carcasMarsh1, carcasMarsh3;
		var anglesMarsh1, anglesMarsh3;
		var railingMarsh1, railingMarsh3;

		// параметры
		var marshTreadsParams1, marshTreadsParams2, marshTreadsParams3;
		var platformCoverParams1, platformCoverParams2, platformCoverParams3;
		var platformFramesParams1, marshFramesParams1;
		var platformFramesParams2, marshFramesParams2;
		var platformFramesParams3, marshFramesParams3;
		var stringerParams1, stringerParams2, stringerParams3;

		var turnParams, turnFramesParams;
		var turnParams2;
		var turnParams3;

// Прямые ступени и подступенки нижнего марша (кроме рифленки)

        marshTreadsParams1 = {
            stringerTurn: stringerTurn,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h1,
            a: params.a1,
            b: params.b1,
            stairType: params.stairType,
            text: "нижний",
            stairAmt: params.stairAmt1,
        	xadd: (model == "ко") ? 0.0 : 5.0,
        	riserType: riserType,
            riserAmt: params.stairAmt1 + 1,
        	dxfBasePoint: dxfBasePoint,
			};
		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn == "забег") {
			marshTreadsParams1 = drawMarshTreads(marshTreadsParams1);
			treads.push(marshTreadsParams1.treads);
			risers.push(marshTreadsParams1.risers);
			bottomParts.push(marshTreadsParams1.treads);
			bottomParts.push(marshTreadsParams1.risers);
    		dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);
			};

        	// Покрытие промежуточной площадки (кроме рифленки)
        	platformCoverParams1 = {
            	stringerTurn: stringerTurn,
			    platformLength: tyrnLength,
                platformWidth: treadWidth,
                treadThickness: treadThickness,
                M: params.M,
                dpcWidth: dpcWidth,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairType: params.stairType,
                text: "промежуточная",
                stairAmt: params.stairAmt1,
            	xadd: (model == "ко") ? 0.0 : 5.0,
            	group: new THREE.Object3D(),   // группа
            	dxfBasePoint: dxfBasePoint,
        	};
        if (stringerTurn == "площадка") {
    		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh1 = drawPlatformCover(platformCoverParams1, platformFramesParams1);
                bottomParts.push(platformCoverParams1.group);

        		dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams1.platformLength + dxfBasePointStep, 0);
        	}
        }


/***  Блок забежных ступеней 1 П-образная трехмаршевая ***/


if (stringerTurn == "забег") {
	var turnModel = model;
	if(model == "лт" && stairFrame == "есть") turnModel = "лт стекло";


	// параметры блока забежных ступеней
	var turnParams = {
		model: turnModel,
		stairModel: stairModel,
		marshDist: marshDist,
		M: M,
		h: h2,
		treadThickness: treadThickness,
		stringerThickness: stringerThickness,
		treadSideOffset: treadSideOffset,
		material: timberMaterial,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint
		}
	if(params.stairType == "стекло") turnParams.material = glassMaterial;

	//отрисовываем блок забежных ступеней
	turnParams = drawTurnSteps(turnParams);

	/*задаем позицию блока забежных ступеней*/
	turnParams.meshes.rotation.y = - Math.PI / 2;
	turnParams.meshes.position.y = h1 * stairAmt1 + h1 - treadThickness;
	turnParams.meshes.position.x = b1 * stairAmt1 + marshTreadsParams1.xadd;
	turnParams.meshes.position.z = (M - stringerThickness - treadSideOffset) * turnFactor;
	if(model == "ко") {
		turnParams.meshes.position.z = M * turnFactor;
		turnParams.meshes.position.x = b1 * (stairAmt1-1) + a1-40;
		}
	treads.push(turnParams.meshes);


	/* Рамки под забежные ступени лт */

	if (turnModel == "лт стекло") {
		var frameMetalThickness = 8;
		 turnFramesParams = {
			textHeight: 30,
			M: M,
			h: h2,
			marshDist: marshDist,
			treadThickness: treadThickness,
			stringerThickness: stringerThickness,
			treadSideOffset: 5,
			model: model,
			stairModel: stairModel,
			stairType: stairType,
			metalMaterial: metalMaterial,
			metalMaterial2: metalMaterial2,
			turnFactor: turnFactor,
			dxfBasePoint: dxfBasePoint,
			treadsPosition: turnParams.treadsPosition,
			turnSteps: turnParams.params,
			};

		turnFramesParams = drawTurnFramesLt(turnFramesParams, turnParams); //функция в файле drawCarcasPartsLib_2.0.js
		turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
		turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
		turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness/2;
		turnFramesParams.meshes.rotation.y = -Math.PI / 2;
		angles.push(turnFramesParams.meshes);
		console.log(turnFramesParams.meshes.position.y)
		}

	/* Рамки под забежные ступени ко */

	if (params.model == "ко") {
	  //задаем параметры блока рамок забежных ступеней
		var frameMetalThickness = 4;
		turnFramesParams = {
		    textHeight: 30,
			M: params.M, // - ширина марша
			stairModel: params.stairModel, // поворот лестницы
			model: params.model, // модель лестницы: лт или ко
			marshDist: params.marshDist, //зазор между маршами в плане. Для Г-образной не обязательный параметр
			stringerThickness: stringerThickness, // - толщина косоура (8мм)
			treadSideOffset: params.sideOverHang, //  - свес ступени над косоуром сбоку
			frameMetalThickness: frameMetalThickness, // - толщина металла рамки (4мм)
			turnFactor: turnFactor, //  - к-т направления поворота: 1 (праваЯ) или -1 (леваЯ)
			h: params.h2, // подъем ступени
			stepOffsetFront: 40 + frameMetalThickness, // отступ от передней кромки ступени
			deltaXFrame: params.sideOverHang + stringerThickness + frameMetalThickness, //смещение по оси Х начальной точки рамки
			holeRadScrew: 3.5, //радиус отверстий под шурупы
			holeRadBolt: 6.5, //радиус отверстий под болты
			heightFlan: 40, //высота фланцев рамки
			lengthKo: {}, // длины проступи косоуров забежных ступеней
			stepOff: (a1 - b1 - 40), //отступ от передней кромки ступени
			material: metalMaterial, // материал рамки
			material1: metalMaterial2, // материал рамки
			dxfBasePoint: dxfBasePoint, // базовая точка вставки контуров рамок ступеней
			turnSteps: turnParams.params, //параметры забежных ступеней
			}

		turnFramesParams = drawTurnFramesKo(turnFramesParams); //функция в файле drawCarcasPartsLib_2.0.js
		turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
		turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
		turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness + stringerThickness;
		turnFramesParams.meshes.rotation.y = -Math.PI / 2;
		angles.push(turnFramesParams.meshes);

	//подступенки забежных ступеней
	if (params.riserType == "есть"){
		var riserParams1 = {
			h: h2,
			riserThickness: riserThickness,
			treadThickness: treadThickness,
			riserSideOffset: riserSideOffset,
			dxfBasePoint: dxfBasePoint,
			material: treadMaterial,
    			text: "1 забежной",
			dxfArr: dxfPrimitivesArr,
			};
    		var tyrnRisers = draw2TurnRisers(riserParams1, turnParams);
    		tyrnRisers.position.x = turnParams.meshes.position.x;
    		tyrnRisers.position.y = turnParams.meshes.position.y;
    		tyrnRisers.position.z = turnParams.meshes.position.z;
    		if (turnFactor == -1) tyrnRisers.rotation.y = -Math.PI / 2;
			}
		} //end of params.model == "ко"

		//console.log(turnFramesParams.deltaXFrame)

/*** УГОЛКИ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ЗАБЕГ ***/

		if (stairFrame == "нет") {
			turnParams = drawLtWinderAngles(turnParams, turnFactor); //функция в файле drawCarcasPartsLib_2.0.js

    		turnParams.angles.meshes.rotation.y = turnParams.meshes.rotation.y;
    		turnParams.angles.meshes.position.x = turnParams.meshes.position.x;
    		turnParams.angles.meshes.position.y = turnParams.meshes.position.y;
    		turnParams.angles.meshes.position.z = turnParams.meshes.position.z;
    		turnParams.angles.meshes.castShadow = true;
    		angles.push(turnParams.angles.meshes);
    	}
}//end of stringerTurn == "забег"


// Прямые ступени и подступенки промежуточного марша (кроме рифленки)

    	dxfBasePoint = newPoint_xy(dxfBasePoint, 500, 0);
        marshTreadsParams2 = {
            stringerTurn: stringerTurn2,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h2,
            a: params.a2,
            b: params.b2,
            stairType: params.stairType,
            text: "промежуточный",
            stairAmt: params.stairAmt2,
        	xadd: (model == "ко") ? 0.0 : 5.0,
        	riserType: riserType,
            riserAmt: params.stairAmt2 + 1,
        	dxfBasePoint: dxfBasePoint,
			};
		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn2 == "забег") {
			marshTreadsParams2 = drawMarshTreads(marshTreadsParams2);
			treads.push(marshTreadsParams2.treads);
			risers.push(marshTreadsParams2.risers);
			midParts.push(marshTreadsParams2.treads);
			midParts.push(marshTreadsParams2.risers);
    		dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams2.a + dxfBasePointStep, 0);
		}

    	// Покрытие промежуточной площадки (кроме рифленки)
    	platformCoverParams2 = {
        	stringerTurn: stringerTurn,
		    platformLength: tyrnLength2,
            platformWidth: treadWidth,
            treadThickness: treadThickness,
            M: params.M,
            dpcWidth: dpcWidth,
            h: params.h2,
            a: params.a2,
            b: params.b2,
            stairType: params.stairType,
            text: "промежуточная",
            stairAmt: params.stairAmt2,
        	xadd: (model == "ко") ? 0.0 : 5.0,
        	group: new THREE.Object3D(),   // группа
        	dxfBasePoint: dxfBasePoint,
    	};
        if (stringerTurn2 == "площадка") {
    		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh2 = drawPlatformCover(platformCoverParams2, platformFramesParams2);
                midParts.push(platformCoverParams2.group);

        		dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams2.platformLength + dxfBasePointStep, 0);
        	}
        }


/***  Блок забежных ступеней 2 П-образная трехмаршевая ***/


if (stringerTurn2 == "забег") {
	var turnModel = model;
	if(model == "лт" && stairFrame == "есть") turnModel = "лт стекло";


	// параметры блока забежных ступеней
	var turnParams = {
		model: turnModel,
		stairModel: stairModel,
		marshDist: marshDist,
		M: M,
		h: h3,
		treadThickness: treadThickness,
		stringerThickness: stringerThickness,
		treadSideOffset: treadSideOffset,
		material: timberMaterial,
		turnFactor: turnFactor,
		dxfBasePoint: dxfBasePoint
		}
	if(params.stairType == "стекло") turnParams.material = glassMaterial;

	//отрисовываем блок забежных ступеней
	turnParams = drawTurnSteps(turnParams);

	/*задаем позицию блока забежных ступеней*/

	var platformX2 = model == "лт" ? 44.0 : 10.0 + params.a1 - params.b1;
	var platformY2 = h2 * (stairAmt2 + 1);
	var platformZ2 = (model == "лт" ? -22.0 : -32.0) - params.a2 + params.b2;
	if (stringerTurn == "забег") {
		platformX2 += model == "лт" ? 0.0 : -25.0;
		if (model == "лт" && stairFrame == "есть") platformX2 += 39.0;
		platformY2 += h2 * 2;
		platformZ2 += model == "лт" ? 40.0 : 72.0;
	}
	turnParams.meshes.rotation.y = -Math.PI * (1 + turnFactor) * 0.5;
	turnParams.meshes.position.y = platformY2 + h1 * stairAmt1 + h1 - treadThickness;
	turnParams.meshes.position.x = platformX2 + b1 * stairAmt1 + marshTreadsParams1.xadd;
	turnParams.meshes.position.z = (platformZ2 + M - stringerThickness - treadSideOffset + b2 * (stairAmt2 - 1) + a2) * turnFactor;
	treads.push(turnParams.meshes);


	/* Рамки под забежные ступени лт */

	if (turnModel == "лт стекло") {
		var frameMetalThickness = 8;
		 turnFramesParams = {
			textHeight: 30,
			M: M,
			h: h3,
			marshDist: marshDist,
			treadThickness: treadThickness,
			stringerThickness: stringerThickness,
			treadSideOffset: 5,
			model: model,
			stairModel: stairModel,
			stairType: stairType,
			metalMaterial: metalMaterial,
			metalMaterial2: metalMaterial2,
			turnFactor: turnFactor,
			dxfBasePoint: dxfBasePoint,
			treadsPosition: turnParams.treadsPosition,
			turnSteps: turnParams.params,
			};

		turnFramesParams = drawTurnFramesLt(turnFramesParams, turnParams); //функция в файле drawCarcasPartsLib_2.0.js
		turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
		turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
		turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness/2;
		turnFramesParams.meshes.rotation.y = -Math.PI * (1 + turnFactor) * 0.5;
		angles.push(turnFramesParams.meshes);
		console.log(turnFramesParams.meshes.position.y)
		}

	/* Рамки под забежные ступени ко */

	if (params.model == "ко") {
		//задаем параметры блока рамок забежных ступеней
		var frameMetalThickness = 4;
		turnFramesParams = {
		    textHeight: 30,
			M: params.M, // - ширина марша
			stairModel: params.stairModel, // поворот лестницы
			model: params.model, // модель лестницы: лт или ко
			marshDist: params.marshDist, //зазор между маршами в плане. Для Г-образной не обязательный параметр
			stringerThickness: stringerThickness, // - толщина косоура (8мм)
			treadSideOffset: params.sideOverHang, //  - свес ступени над косоуром сбоку
			frameMetalThickness: frameMetalThickness, // - толщина металла рамки (4мм)
			turnFactor: turnFactor, //  - к-т направления поворота: 1 (праваЯ) или -1 (леваЯ)
			h: params.h3, // подъем ступени
			stepOffsetFront: 40 + frameMetalThickness, // отступ от передней кромки ступени
			deltaXFrame: params.sideOverHang + stringerThickness + frameMetalThickness, //смещение по оси Х начальной точки рамки
			holeRadScrew: 3.5, //радиус отверстий под шурупы
			holeRadBolt: 6.5, //радиус отверстий под болты
			heightFlan: 40, //высота фланцев рамки
			lengthKo: {}, // длины проступи косоуров забежных ступеней
			stepOff: (a1 - b1 - 40), //отступ от передней кромки ступени
			material: metalMaterial, // материал рамки
			material1: metalMaterial2, // материал рамки
			dxfBasePoint: dxfBasePoint, // базовая точка вставки контуров рамок ступеней
			turnSteps: turnParams.params, //параметры забежных ступеней
			}

		turnFramesParams = drawTurnFramesKo(turnFramesParams); //функция в файле drawCarcasPartsLib_2.0.js
		turnFramesParams.meshes.position.x = turnParams.meshes.position.x;
		turnFramesParams.meshes.position.y = turnParams.meshes.position.y;
		turnFramesParams.meshes.position.z = turnParams.meshes.position.z; // + frameMetalThickness + stringerThickness;
		turnFramesParams.meshes.rotation.y = -Math.PI * (1 + turnFactor) * 0.5;
		angles.push(turnFramesParams.meshes);

	//подступенки забежных ступеней
	if (params.riserType == "есть") {
		var riserParams1 = {
   			h: h3,
			riserThickness: riserThickness,
			treadThickness: treadThickness,
			riserSideOffset: riserSideOffset,
			dxfBasePoint: dxfBasePoint,
			material: treadMaterial,
			text: "2 забежной",
			dxfArr: dxfPrimitivesArr,
			};
    		var tyrnRisers = draw2TurnRisers(riserParams1, turnParams);
    		tyrnRisers.position.x = turnParams.meshes.position.x;
    		tyrnRisers.position.y = turnParams.meshes.position.y;
    		tyrnRisers.position.z = turnParams.meshes.position.z;
       		tyrnRisers.rotation.y = -Math.PI * 0.5 * (1 + turnFactor) * 0.5;
			}
		} //end of params.model == "ко"

		//console.log(turnFramesParams.deltaXFrame)

/*** УГОЛКИ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ЗАБЕГ 2 ***/

		if (stairFrame == "нет") {
			turnParams = drawLtWinderAngles(turnParams, turnFactor); //функция в файле drawCarcasPartsLib_2.0.js

    		turnParams.angles.meshes.rotation.y = turnParams.meshes.rotation.y;
    		turnParams.angles.meshes.position.x = turnParams.meshes.position.x;
    		turnParams.angles.meshes.position.y = turnParams.meshes.position.y;
    		turnParams.angles.meshes.position.z = turnParams.meshes.position.z;
    		turnParams.angles.meshes.castShadow = true;
    		angles.push(turnParams.angles.meshes);
    	}
}//end of stringerTurn2 == "забег"


// Прямые ступени и подступенки верхнего марша (кроме рифленки)

    	dxfBasePoint = newPoint_xy(dxfBasePoint, 500, 0);
        marshTreadsParams3 = {
            stringerTurn: stringerTurn2,
            treadThickness: treadThickness,
            M: params.M,
            treadWidth: treadWidth,
            dpcWidth: dpcWidth,
            h: params.h3,
            a: params.a3,
            b: params.b3,
            stairType: params.stairType,
            text: "верхний",
            stairAmt: params.stairAmt3,
        	xadd: (model == "ко") ? 0.0 : 5.0,
        	riserType: riserType,
            riserAmt: (platformTop == "площадка") ? params.stairAmt3 + 1 : params.stairAmt3,
        	dxfBasePoint: dxfBasePoint,
			};
		if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий" || stringerTurn2 == "забег") {
			marshTreadsParams3 = drawMarshTreads(marshTreadsParams3);
			treads.push(marshTreadsParams3.treads);
			risers.push(marshTreadsParams3.risers);
			topParts.push(marshTreadsParams3.treads);
			topParts.push(marshTreadsParams3.risers);
    		dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams3.a + dxfBasePointStep, 0);
		}


        if (platformTop == "площадка") {
        	// Покрытие верхней площадки (кроме рифленки)
        	platformCoverParams3 = {
	            stringerTurn: stringerTurn2,
        	    platformLength: platformLengthTop,
                platformWidth: treadWidth,
                treadThickness: treadThickness,
                M: params.M,
                dpcWidth: dpcWidth,
                h: params.h3,
                a: params.a3,
                b: params.b3,
                stairType: params.stairType,
                text: "верхняя",
                stairAmt: params.stairAmt3,
            	xadd: (model == "ко") ? 0.0 : 5.0,
            	group: new THREE.Object3D(),   // группа
            	dxfBasePoint: dxfBasePoint,
        	};
			if (stairType !== "рифленая сталь" && stairType !== "рифленый алюминий") {
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);
                topParts.push(platformCoverParams3.group);

        		dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.platformLength + dxfBasePointStep, 0);
        	}// end if
        }// end if


        if (stairFrame == "есть") {
    		// Рамки нижнего марша
    		marshFramesParams1 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h1,
                a: params.a1,
                b: params.b1,
                stairType: params.stairType,
                text: "нижний",
                stairAmt: params.stairAmt1,
                holeCenters: [],
            	group: new THREE.Object3D(),   // группа
            	dxfBasePoint: dxfBasePoint,
    		};
            marshFramesParams1 = setMarshFrameParams(marshFramesParams1);
    		framesMarsh1 = drawMarshFrames(marshFramesParams1);
            bottomParts.push(marshFramesParams1.group);

    		dxfBasePoint = newPoint_xy(dxfBasePoint, marshFramesParams1.a + dxfBasePointStep, 0);

        	if (stringerTurn == "площадка") {
        		// Рамки промежуточной площадки
        		platformFramesParams1 = {
                    M: params.M,
					platformLength: tyrnLength,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h1,
                    a: params.a1,
                    b: params.b1,
                    stairAmt: stairAmt1,
                    stairType: params.stairType,
                    text: "промежуточная",
                    z: 0.0,
                    addHoles: true,
                    holeCenters: [],
                	group: new THREE.Object3D(),   // группа
                	dxfBasePoint: dxfBasePoint,
        		};
        		platformFramesParams1 = setPlatformFrameParams(platformFramesParams1);
        		framesMarsh1 = drawPlatformFrames(platformFramesParams1);
                bottomParts.push(platformFramesParams1.group);

        		dxfBasePoint = newPoint_xy(dxfBasePoint, params.M + dxfBasePointStep, 0);
        	}
        }// end if


/***  КОСОУРЫ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ НИЖНИЙ МАРШ   ***/

  		// Косоуры нижнего марша
        stringerParams1 = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "platformG",
            topEndLength: tyrnLength + 15,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
			treadSideOffset: treadSideOffset,
            h: h1,
            b: b1,
            a: a1,
            h3: h2,
            stairAmt: stairAmt1 + 1,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
          	group: new THREE.Object3D(),      // группа
          	groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
			railingModel: railingModel, //модель ограждения
        };

        drawP3Stringers1();

        function drawP3Stringers1() {
            if (params.model == "ко") stringerParams1.topEndLength = b1;

            if (params.model == "ко" && stringerTurn == "забег") {
				stringerParams1.topEndLength = params.M + 25 - stringerSideOffset;
			}
            stringerParams1.platformLength = M + 40 + 10;
            /*внешняя тетива/косоур нижнего марша*/

			//наличие ограждений
			stringerParams1.railingPresence = false;
			if (railingSide_1 === "внешнее" || railingSide_1 === "две")
			    stringerParams1.railingPresence = true;
            //ограждение верхней площадки
			stringerParams1.platformTopRailing = true;

            if (stringerTurn == "забег") stringerParams1.topEnd = "winder";
            stringerParams1.key = "out";
            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
            stringer1.castShadow = true;
            carcas.push(stringer1);

            /*внутренняя тетива/косоур нижнего марша*/

			//наличие ограждений
			stringerParams1.railingPresence = false;
			if (railingSide_1 === "внутреннее" || railingSide_1 === "две")
			    stringerParams1.railingPresence = true;
            //ограждение верхней площадки
			stringerParams1.platformTopRailing = false;

			if (params.model == "ко" && stringerTurn == "забег") {
                stringerParams1.stringerBotOutlength = turnFramesParams.lengthKo.lengthBotOutBend + turnFramesParams.lengthKo.lengthBotOutBend1 + b1 * (stairAmt1 - 1) + a1 - 4;
                stringerParams1.topEndLength = stringerSideOffset - 15 + stringerThickness + 60 + 5;
			}

            stringerParams1.key = "in";
            if (params.model == "лт") drawStringerLt(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams1, turnFramesParams, undefined, platformFramesParams1, marshFramesParams1, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams1.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = (M - stringerSideOffset - stringerThickness * (1 + turnFactor) * 0.5) * turnFactor;
            stringer2.castShadow = true;
            carcas.push(stringer2);

        /*промежуточная площадка*/
            if (stringerTurn == "площадка") {
                //наличие ограждений
                stringerParams1.railingPresence = false;
                if (railingSide_2 === "внешнее" || railingSide_2 === "две") {
                    stringerParams1.railingPresence = true;
                    stringerParams1.platformTopRailing = true;
                    stringerParams1.key = "rear";
                    stringerParams1.elmIns.rear = {};
                    stringerParams1.elmIns.rear.racks = [];
                }
            if (model == "ко") {
                //левый соединительный фланец
                var flanSide = drawFlanSideConcat("left", stringerParams1, flanMaterial);
                flanSide.position.x += stringerParams1.flanSidePointInsert.x;
                flanSide.position.y += stringerParams1.flanSidePointInsert.y;
                flanSide.position.z += stringerSideOffset + stringerThickness;

                //правый соединительный фланец
                flanSide = drawFlanSideConcat("right", stringerParams1, flanMaterial);
                flanSide.position.x += stringerParams1.flanSidePointInsert.x;
                flanSide.position.y += stringerParams1.flanSidePointInsert.y;
                flanSide.position.z += M - stringerSideOffset - stringerThickness;

                //задняя тетива площадки
                p0 = { x: b1 * stairAmt1 + a1 - b1 - 40.0 + tyrnLength - stringerSideOffset,
                       y: h1 * (stairAmt1 + 1) - treadThickness,
                       z: stringerSideOffset + stringerThickness
                     };
								stringerParams1.platformIntermediate = true;//отличие верхней площадки от промежуточной
								stringerParams1.b = params.b2;//необходима для правильного позиционирования отверстия под КБ
                drawRearStringerKo(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
                //уголки добавляются внутри функции drawRearStringerKo

                p0.x -= (tyrnLength - stringerSideOffset - b1 - 40.0);
                p0.z -= stringerThickness;

                //боковые тетивы площадки
                //stringerParams1.tyrnLength = tyrnLength;
                stringerParams1.sideLength = (tyrnLength - stringerSideOffset - params.b1 - 40.0);
                drawSideStringerKo("in", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);
                p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                drawSideStringerKo("out", stringerParams1, platformFramesParams1, p0, stringerMaterial, stringerExtrudeOptions);
            }
            if (params.model == "лт") {
                // задняя тетива площадки
                p0 = { x: b1 * stairAmt1 + tyrnLength + 5.0 + stringerThickness,
                       y: h1 * (stairAmt1 + 1) + 5.0,
                       z: 0.0
                     };
								stringerParams1.platformEnd = false;//конечная площадка
                drawRearStringer(stringerParams1, p0, stringerMaterial, stringerExtrudeOptions);
            }
		}//end of stringerTurn == "площадка"

	}// end of drawP3Stringers1()


/*** УГОЛКИ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ НИЖНИЙ МАРШ ***/

		// Уголки+перемычки нижнего марша
		// Уголки+перемычки промежуточной площадки
		drawP3Angles1();

        function drawP3Angles1() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = 0.0;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams1.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams1.elmIns["out"].angleB[0].y;
            angleB.position.z = (M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            stringerParams1.groupang.add(angleB);

            // фланец крепления частей разделённой тетивы или косоура нижний марш
            if (stringerParams1.divide !== 0) {
                drawFlanConcatAngles(stringerParams1, flanMaterial);
            }

            // уголки под ступенями нижний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней нижний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams1.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams1.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams1.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams1.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams1.groupang.add(angle2);
                    }

                    // перемычки нижний марш
                    for (ii = 0; ii < stringerParams1.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams1, stringerParams1.elmIns["out"].briges[ii]);
                    }

                    if (stringerTurn == "площадка") {
                        // дополнительные уголки на перемычке под площадкой
                        // уголки крепления ступени
                        var p0 = stringerParams1.elmIns["out"].briges[ii - 1];
                        var angle1 = drawAngleSupport("У2-40х40х200");
                        angle1.position.x = p0.x;
                        angle1.position.y = p0.y;
                        angle1.position.z = stringerThickness + 105.0;
                        angle1.rotation.x = Math.PI * 0.5;
                        angle1.rotation.y = 0.0;
                        angle1.rotation.z = Math.PI * 0.5;
                        angle1.castShadow = true;
                        stringerParams1.groupang.add(angle1);
                        angle1 = drawAngleSupport("У2-40х40х200");
                        angle1.position.x = p0.x;
                        angle1.position.y = p0.y;
                        angle1.position.z = stringerThickness + treadWidth - 200.0 - 105.0;
                        angle1.rotation.x = Math.PI * 0.5;
                        angle1.rotation.y = 0.0;
                        angle1.rotation.z = Math.PI * 0.5;
                        angle1.castShadow = true;
                        stringerParams1.groupang.add(angle1);
                    }
                }
            }

        }//end of drawP3Angles1()

		carcas.push(stringerParams1.group);
		angles.push(stringerParams1.groupang);

        bottomParts.push(stringerParams1.group);
        bottomParts.push(stringerParams1.groupang);


        if (stairFrame == "есть") {
    		// Рамки промежуточного марша
    		marshFramesParams2 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h2,
                a: params.a2,
                b: params.b2,
                stairType: params.stairType,
                text: "промежуточный",
                stairAmt: params.stairAmt2,
                holeCenters: [],
    			group: new THREE.Object3D(),   // группа
            	dxfBasePoint: dxfBasePoint,
    		};
            marshFramesParams2 = setMarshFrameParams(marshFramesParams2);
    		framesMarsh2 = drawMarshFrames(marshFramesParams2);
            midParts.push(marshFramesParams2.group);

	  		dxfBasePoint = newPoint_xy(dxfBasePoint, a2, 0);

            if (stringerTurn2 == "площадка") {
        		// Рамки 2 площадки
        		platformFramesParams2 = {
                    M: params.M,
                    platformLength: tyrnLength2,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h2,
                    a: params.a2,
                    b: params.b2,
                    stairAmt: stairAmt2,
                    stairType: params.stairType,
                    text: "промежуточная",
                    z: 0.0,
	                addHoles: true,
                    holeCenters: [],
                	group: new THREE.Object3D(),   // группа
                	dxfBasePoint: dxfBasePoint,
        		};
        		platformFramesParams2 = setPlatformFrameParams(platformFramesParams2);
        		framesMarsh2 = drawPlatformFrames(platformFramesParams2);
                midParts.push(platformFramesParams2.group);

		  		dxfBasePoint = newPoint_xy(dxfBasePoint, params.M + dxfBasePointStep, 0);
            }
    	}


/*** КОСОУРЫ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ПРОМЕЖУТОЧНЫЙ МАРШ ***/

		// Косоуры промежуточного марша
        stringerParams2 = {
            model: model,
            stringerTurn: stringerTurn2,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            botEnd: stringerTurn == "площадка" ? "platformG" : "winder",
			botEndLength: tyrnLength + 15,
            topEnd: stringerTurn2 == "площадка" ? "platformG" : "winder",
			topEndLength: tyrnLength2 + 15,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
			treadSideOffset: treadSideOffset,
            h: h2,
            b: b2,
            a: a2,
			h1: h1,
			h3: h3,
            stairAmt: params.stairAmt2 + 1,        //(platformTop == "площадка") ? params.stairAmt2 + 1 : params.stairAmt2,
            topFlan: "нет",
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
          	group: new THREE.Object3D(),      // группа
          	groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
			railingModel: railingModel, //модель ограждения
        };

        drawP3Stringers2();

        function drawP3Stringers2() {
            if (params.model == "ко") stringerParams2.topEndLength = b2;

            if (params.model == "ко" && stringerTurn2 == "забег") {
				stringerParams2.topEndLength = turnFactor > 0 ? params.M + 25 - stringerSideOffset : stringerSideOffset - 15 + stringerThickness + 60 + 5;
			}
            stringerParams2.platformLength = params.M + 40 + 10;


            /*внешняя тетива/косоур верхнего марша*/
//if (railingModel == "Самонесущее стекло") stringerParams2.stringerLast = true;
if (railingModel == "Самонесущее стекло") stringerParams2.stringerMiddle = true;
			//наличие ограждений
			stringerParams2.railingPresence = false;
			if ((railingSide_2 === "внешнее" && turnFactor > 0) || (railingSide_2 === "внутреннее" && turnFactor < 0) || railingSide_2 === "две")
			    stringerParams2.railingPresence = true;
            //ограждение верхней площадки
			stringerParams2.platformTopRailing = true;

            stringerParams2.key = turnFactor > 0 ? "out" : "in";
            if (params.model == "лт") drawStringerLt(stringerParams2, turnFramesParams, platformFramesParams1, platformFramesParams2, marshFramesParams2, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams2, turnFramesParams, platformFramesParams1, platformFramesParams2, marshFramesParams2, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams2.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer3 = new THREE.Mesh(geom, stringerMaterial);
			stringer3.position.set(0, 0.0, (stringerSideOffset));
            stringer3.castShadow = true;
            stringerParams2.group.add(stringer3);

            /*внутренняя тетива/косоур верхнего марша*/

			//наличие ограждений
			stringerParams2.railingPresence = false;
			if ((railingSide_2 === "внутреннее" && turnFactor > 0) || (railingSide_2 === "внешнее" && turnFactor < 0) || railingSide_2 === "две")
			    stringerParams2.railingPresence = true;
            //ограждение верхней площадки
			stringerParams2.platformTopRailing = turnFactor > 0 ? false : true;

			if (params.model == "ко" && stringerTurn2 == "забег") {
				stringerParams2.topEndLength = turnFactor < 0 ? params.M + 25 - stringerSideOffset : stringerSideOffset - 15 + stringerThickness + 60 + 5;
			}

            stringerParams2.key = turnFactor > 0 ? "in" : "out";
            if (params.model == "лт") drawStringerLt(stringerParams2, turnFramesParams, platformFramesParams1, platformFramesParams2, marshFramesParams2, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams2, turnFramesParams, platformFramesParams1, platformFramesParams2, marshFramesParams2, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams2.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer4 = new THREE.Mesh(geom, stringerMaterial);
            stringer4.position.set(0.0, 0.0, (M - stringerSideOffset - stringerThickness));
			stringer4.castShadow = true;
            stringerParams2.group.add(stringer4);

            /*верхняя площадка*/

            if (stringerTurn2 == "площадка") {
                //наличие ограждений
                stringerParams2.railingPresence = false;
                if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
                    stringerParams2.railingPresence = true;
                    stringerParams2.platformTopRailing = true;
                    stringerParams2.key = "rear";
                    stringerParams2.elmIns.rear = {};
                    stringerParams2.elmIns.rear.racks = [];
                }
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams2, flanMaterial);
                    flanSide.position.x += stringerParams2.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams2.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams2, flanMaterial);
                    flanSide.position.x += stringerParams2.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams2.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b2 * stairAmt2 + a2 - b2 - 40.0 + tyrnLength2 - stringerSideOffset,
                        y: h2 * (stairAmt2 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                      };
                    stringerParams1.platformIntermediate = true;//отличие верхней площадки от промежуточной
                    stringerParams1.b = params.b3;//необходима для правильного позиционирования отверстия под КБ
                    drawRearStringerKo(stringerParams2, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (tyrnLength2 - stringerSideOffset - b2 - 40.0);
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    stringerParams2.sideLength = (tyrnLength2 - stringerSideOffset - params.b2 - 40.0);
                    drawSideStringerKo("out", stringerParams2, platformFramesParams2, p0, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams2, platformFramesParams2, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
					p0 = { x: b2 * stairAmt2 + tyrnLength2 + 5.0 + stringerThickness,
                           y: h2 * (stairAmt2 + 1) + 5.0,
                           z: 0.0
                         };
										stringerParams2.platformEnd = false;//конечная площадка
                    drawRearStringer(stringerParams2, p0, stringerMaterial, stringerExtrudeOptions);
                }
            }
        }//end of drawP3Stringers2()


/*** УГОЛКИ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ПРОМЕЖУТОЧНЫЙ МАРШ ***/

		// Уголки+перемычки промежуточного марша
		// Уголки+перемычки промежуточной площадки
        drawP3Angles2();

        function drawP3Angles2() {
            // уголки крепления к нижнему маршу (площадке)
            if (stringerTurn == "площадка") {
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams2.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams2.elmIns["out"].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams2.groupang.add(angleB);
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams2.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams2.elmIns["out"].angleB[0].y - 100.0;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams2.groupang.add(angleB);
            }
			if (stringerTurn == "забег") {
				if (turnFactor > 0) { var key1 = "out"; var key2 = "in"; } else { var key1 = "in"; var key2 = "out"; }
				//уголки соединения внешних тетив
				var angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams2.elmIns[key1].angleB[0].x;
				angleB.position.y = stringerParams2.elmIns[key1].angleB[0].y;
				angleB.position.z = stringerThickness + stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = 0.0;
				angleB.rotation.z = Math.PI * 1.5;
				angleB.castShadow = true;
				stringerParams2.groupang.add(angleB);

				var angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams2.elmIns[key1].angleB[1].x;
				angleB.position.y = stringerParams2.elmIns[key1].angleB[1].y;
				angleB.position.z = stringerThickness + stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = 0.0;
				angleB.rotation.z = Math.PI * 1.5;
				angleB.castShadow = true;
				stringerParams2.groupang.add(angleB);

				//уголки соединения внутренних тетив
				angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams2.elmIns[key2].angleB[0].x;
				angleB.position.y = stringerParams2.elmIns[key2].angleB[0].y - 100;
				angleB.position.z = (M - stringerThickness) - stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = Math.PI;
				angleB.rotation.z = Math.PI * 0.5;
				angleB.castShadow = true;
				stringerParams2.groupang.add(angleB);

				angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams2.elmIns[key2].angleB[1].x;
				angleB.position.y = stringerParams2.elmIns[key2].angleB[1].y - 100;
				angleB.position.z = (M - stringerThickness) - stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = Math.PI;
				angleB.rotation.z = Math.PI * 0.5;
				angleB.castShadow = true;
				stringerParams2.groupang.add(angleB);
				}

            // уголки под ступенями верхний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней верхний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams2.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams2.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams2.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams2.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams2.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams2.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams2.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams2.groupang.add(angle2);
                    }

                    // перемычки верхний марш
                    for (ii = 0; ii < stringerParams2.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams2, stringerParams2.elmIns["out"].briges[ii]);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            // верхний марш
            if (stringerParams2.divide !== 0) {
                drawFlanConcatAngles(stringerParams2, flanMaterial);
            }

        }//end of drawP3Angles2()

		carcas1.push(stringerParams2.group);
		angles.push(stringerParams2.groupang);

        midParts.push(stringerParams2.group);
        midParts.push(stringerParams2.groupang);



        if (stairFrame == "есть") {
    		// Рамки верхнего марша
    		marshFramesParams3 = {
                M: params.M,
                treadWidth: treadWidth,
                treadThickness: treadThickness,
                h: params.h3,
                a: params.a3,
                b: params.b3,
                stairType: params.stairType,
                text: "верхний",
                stairAmt: params.stairAmt3,
                holeCenters: [],
    			group: new THREE.Object3D(),   // группа
            	dxfBasePoint: dxfBasePoint,
    		};
            marshFramesParams3 = setMarshFrameParams(marshFramesParams3);
    		framesMarsh3 = drawMarshFrames(marshFramesParams3);
            topParts.push(marshFramesParams3.group);

	  		dxfBasePoint = newPoint_xy(dxfBasePoint, a3, 0);

            if (platformTop == "площадка") {
        		// Рамки верхней площадки
        		platformFramesParams3 = {
                    M: params.M,
                    platformLength: platformLengthTop,
                    treadWidth: treadWidth,
                    treadThickness: treadThickness,
                    h: params.h3,
                    a: params.a3,
                    b: params.b3,
                    stairAmt: stairAmt3,
                    stairType: params.stairType,
                    text: "верхняя",
                    z: 0.0,
	                addHoles: true,
                    holeCenters: [],
                	group: new THREE.Object3D(),   // группа
                	dxfBasePoint: dxfBasePoint,
        		};
        		platformFramesParams3 = setPlatformFrameParams(platformFramesParams3);
        		framesMarsh3 = drawPlatformFrames(platformFramesParams3);
                topParts.push(platformFramesParams3.group);

		  		dxfBasePoint = newPoint_xy(dxfBasePoint, platformLengthTop, 0);
            }
    	}


/*** КОСОУРЫ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ВЕРХНИЙ МАРШ ***/

		// Косоуры верхнего марша
        stringerParams3 = {
            model: model,
            stringerTurn: stringerTurn2,
            stringerType: stringerType,
            stringerLast: true,
            stairType: stairType,
            botEnd: "platformG",
			botEndLength: tyrnLength2,   // и для ЛТ и для КО длина нижней части не зависит от глубины площадки
            topEnd: "floor",
			topEndLength: 0,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
			treadSideOffset: treadSideOffset,
            h: h3,
            b: b3,
            a: a3,
			h1: h2,
            stairAmt: (platformTop == "площадка") ? params.stairAmt3 + 1 : params.stairAmt3,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointStep: dxfBasePointStep,
          	group: new THREE.Object3D(),      // группа
          	groupang: new THREE.Object3D(),   // группа
            elmIns: {},// точки размещения уголков
			railingModel: railingModel, //модель ограждения
        };

        drawP3Stringers3();

        function drawP3Stringers3() {
            if (platformTop == "площадка") {
                stringerParams3.topEnd = "platformG";
                stringerParams3.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams3.topEndLength = b3;
                stringerParams3.platformLength = params.platformLength_3;
                }

            // и для ЛТ и для КО длина нижней части не зависит от глубины площадки

			if (params.model == "лт") stringerParams.botEndLength = tyrnLength2 + 15.0;
			if (params.model == "ко") stringerParams3.botEndLength = 300;

            /*внешняя тетива/косоур верхнего марша*/

			//наличие ограждений
			stringerParams3.railingPresence = false;
			if ((railingSide_3 === "внешнее" && turnFactor > 0) || (railingSide_3 === "внутреннее" && turnFactor < 0) || railingSide_3 === "две")
			    stringerParams3.railingPresence = true;
            //ограждение верхней площадки
			stringerParams3.platformTopRailing = false;
			if (platformTop == "площадка" && params.topPltRailing_3)
			    stringerParams3.platformTopRailing = true;

            if (stringerTurn2 == "забег") stringerParams3.botEnd = "winder";
            stringerParams3.key = turnFactor > 0 ? "out" : "in";
            if (params.model == "лт") drawStringerLt(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams3.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer3 = new THREE.Mesh(geom, stringerMaterial);
			stringer3.position.set(0, 0.0, (stringerSideOffset));
            stringer3.castShadow = true;
            stringerParams3.group.add(stringer3);

            /*внутренняя тетива/косоур верхнего марша*/

			//наличие ограждений
			stringerParams3.railingPresence = false;
			if ((railingSide_3 === "внутреннее" && turnFactor > 0) || (railingSide_3 === "внешнее" && turnFactor < 0) || railingSide_3 === "две")
			    stringerParams3.railingPresence = true;
            //ограждение верхней площадки
			stringerParams3.platformTopRailing = false;
			if (platformTop == "площадка" && params.topPltRailing_4)
			    stringerParams3.platformTopRailing = true;

            stringerParams3.key = turnFactor > 0 ? "in" : "out";
            if (params.model == "лт") drawStringerLt(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            if (params.model == "ко") drawStringerKo(stringerParams3, turnFramesParams, platformFramesParams1, platformFramesParams3, marshFramesParams3, turnParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams3.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer4 = new THREE.Mesh(geom, stringerMaterial);
            stringer4.position.set(0.0, 0.0, (M - stringerSideOffset - stringerThickness));
			stringer4.castShadow = true;
            stringerParams3.group.add(stringer4);

            /*верхняя площадка*/

            if (platformTop == "площадка") {
                //наличие ограждений
                stringerParams3.railingPresence = false;
                if (railingSide_3 !== "нет")
                    stringerParams3.railingPresence = true;
                //заднее ограждение верхней площадки
                stringerParams3.platformTopRailing = false;
                if (params.topPltRailing_5) {
                    stringerParams3.platformTopRailing = true;
                    stringerParams3.key = "rear";
                    stringerParams3.elmIns.rear = {};
                    stringerParams3.elmIns.rear.racks = [];
                }
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams3, flanMaterial);
                    flanSide.position.x += stringerParams3.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams3.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams3, flanMaterial);
                    flanSide.position.x += stringerParams3.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams3.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b3 * stairAmt3 + a3 - b3 - 40.0 + params.platformLength_3 - stringerSideOffset,
                        y: h3 * (stairAmt3 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                      };
                    drawRearStringerKo(stringerParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (params.platformLength_3 - stringerSideOffset - b3 - 40.0);
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    stringerParams3.sideLength = (platformLength_3 - stringerSideOffset - params.b3 - 40.0);
                    drawSideStringerKo("out", stringerParams3, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams3, platformFramesParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = { x: b3 * stairAmt3 + params.platformLength_3 + 5.0,
                           y: h3 * (stairAmt3 + 1) + 5.0,
                           z: 0.0
                         };
										stringerParams3.platformEnd = true;//конечная площадка
                    drawRearStringer(stringerParams3, p0, stringerMaterial, stringerExtrudeOptions);
                }
            }
        }//end of drawP3Stringers3()


/*** УГОЛКИ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ВЕРХНИЙ МАРШ ***/

		// Уголки+перемычки верхнего марша
		// Уголки+перемычки верхней площадки
        drawP3Angles3();

        function drawP3Angles3() {
            // уголки крепления к нижнему маршу (площадке)
            if (stringerTurn2 == "площадка") {
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns["out"].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams3.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams3.elmIns["out"].angleB[0].y - 100.0;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                stringerParams3.groupang.add(angleB);
            }
			if (stringerTurn2 == "забег") {
				if (turnFactor > 0) { var key1 = "out"; var key2 = "in"; } else { var key1 = "in"; var key2 = "out"; }
				//уголки соединения внешних тетив
				var angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams3.elmIns[key1].angleB[0].x;
				angleB.position.y = stringerParams3.elmIns[key1].angleB[0].y;
				angleB.position.z = stringerThickness + stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = 0.0;
				angleB.rotation.z = Math.PI * 1.5;
				angleB.castShadow = true;
				stringerParams3.groupang.add(angleB);

				var angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams3.elmIns[key1].angleB[1].x;
				angleB.position.y = stringerParams3.elmIns[key1].angleB[1].y;
				angleB.position.z = stringerThickness + stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = 0.0;
				angleB.rotation.z = Math.PI * 1.5;
				angleB.castShadow = true;
				stringerParams3.groupang.add(angleB);

				//уголки соединения внутренних тетив
				angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams3.elmIns[key2].angleB[0].x;
				angleB.position.y = stringerParams3.elmIns[key2].angleB[0].y - 100;
				angleB.position.z = (M - stringerThickness) - stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = Math.PI;
				angleB.rotation.z = Math.PI * 0.5;
				angleB.castShadow = true;
				stringerParams3.groupang.add(angleB);

				angleB = drawAngleSupport("У4-60х60х100");
				angleB.position.x = stringerParams3.elmIns[key2].angleB[1].x;
				angleB.position.y = stringerParams3.elmIns[key2].angleB[1].y - 100;
				angleB.position.z = (M - stringerThickness) - stringerSideOffset;
				angleB.rotation.x = 0.0;
				angleB.rotation.y = Math.PI;
				angleB.rotation.z = Math.PI * 0.5;
				angleB.castShadow = true;
				stringerParams3.groupang.add(angleB);
				}

            // уголки под ступенями верхний марш
            var ii;
            if (stairFrame == "нет") {
                if (params.model == "лт") {
                    // уголки крепления ступеней верхний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams3.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams3.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams3.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams3.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        stringerParams3.groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams3.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams3.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        stringerParams3.groupang.add(angle2);
                    }

                    // перемычки верхний марш
                    for (ii = 0; ii < stringerParams3.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams3, stringerParams3.elmIns["out"].briges[ii]);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            // верхний марш
            if (stringerParams3.divide !== 0) {
                drawFlanConcatAngles(stringerParams3, flanMaterial);
            }

            // верхние уголки
            if (platformTop != "площадка") {
            var topAnglePosition = params.topAnglePosition;
            if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
             if (stringerParams3.elmIns["out"].angleU[0] !== undefined) {
              var angleU = drawAngleSupport("У4-70х70х100");
              angleU.position.x = stringerParams3.elmIns["out"].angleU[0].x;
              angleU.position.y = stringerParams3.elmIns["out"].angleU[0].y;
              angleU.position.z = (stringerThickness + stringerSideOffset);
              angleU.rotation.x = 0.0;
              angleU.rotation.y = 0.0;
              angleU.rotation.z = Math.PI * 0.5;
              angleU.castShadow = true;
              stringerParams3.groupang.add(angleU);
              angleU = drawAngleSupport("У4-70х70х100");
              angleU.position.x = stringerParams3.elmIns["out"].angleU[0].x;
              angleU.position.y = stringerParams3.elmIns["out"].angleU[0].y + 100.0;
              angleU.position.z = ((params.M - stringerThickness) - stringerSideOffset);
              angleU.rotation.x = Math.PI;
              angleU.rotation.y = 0.0;
              angleU.rotation.z = Math.PI * 0.5;
              angleU.castShadow = true;
              stringerParams3.groupang.add(angleU);
            }
               }
            if (topAnglePosition == "вертикальная рамка") {
                    var topUnitBasePoint = {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotationY: 0,
                        };
                    if (params.model == "лт") topUnitBasePoint.x  = topUnitBasePoint.x - 5;
                    //console.log(topUnitBasePoint.x)
                    var unitParams = {
                        basepoint: topUnitBasePoint,
                        width: M - 2 * stringerThickness,
                        height: 200,
                        stringerSideOffset: stringerSideOffset,
                        model: params.model,
                        treadThickness: treadThickness,
                        stringerThickness: stringerThickness,
                        metalMaterial: metalMaterial,
                        treadMaterial: treadMaterial,
                        M: M,
                        h1: h3,
                        riserThickness: riserThickness,
                        nose: a3 - b3,
                        treadWidth: treadWidth,
                        dxfBasePoint: dxfBasePoint,
                        };
                    var topFixUnit = drawTopFixFrameUnit(unitParams);
                    var complexUnit = topFixUnit.complexUnit;
                    if (params.model == "лт") {
                        complexUnit.position.y = stairAmt3 * h3 - 25.0;
                        complexUnit.position.x = stairAmt3 * b3;
                    }
                    if (params.model == "ко") {
                        complexUnit.position.y = stairAmt3 * h3;
                        complexUnit.position.x = stairAmt3 * b3;
                    }
                    stringerParams3.groupang.add(complexUnit);
                }
                /*верхний фланец (только для ЛТ)  */
                if (topFlan == "есть") {
                    var firstPosition_x = (params.stairAmt3 - 1) * b3 + a3 + 5;
                    var firstPosition_y = params.stairAmt3 * h3 - 5;
                    //var firstPosition_z = 0;
                    var flanLength = firstPosition_y - params.topFlanHolesPosition + 40 + 105 -(params.stairAmt3 - 1) * h3 + 60;
    				if(stairFrame == "есть") {
    					var frameProfileHeight = 40;
    					flanLength = treadThickness + frameProfileHeight + h3 + 20 - params.topFlanHolesPosition;
    					firstPosition_y = params.stairAmt3 * h3 - treadThickness - frameProfileHeight - 5;
    					}

                    // левый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan = flanParams.mesh;
                    flan.position.x = firstPosition_x;
                    flan.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if(stairFrame == "есть") flan.position.y = firstPosition_y;
    				flan.position.z = flanParams.width + stringerThickness;
                    flan.rotation.x = 0;
                    flan.rotation.y = Math.PI*0.5;
                    //console.log(flan.position)
                    stringerParams3.groupang.add(flan);

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    flan2.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if(stairFrame == "есть") flan2.position.y = firstPosition_y;
    				flan2.position.z = params.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI*0.5;
                    stringerParams3.groupang.add(flan2);
                }
            }

        }//end of drawP3Angles3()

		carcas1.push(stringerParams3.group);
		angles.push(stringerParams3.groupang);

        topParts.push(stringerParams3.group);
        topParts.push(stringerParams3.groupang);

   		dxfBasePoint = newPoint_xy(stringerParams3.dxfBasePoint, dxfBasePointStep, 0);

		//покрытие ступеней и площадок из рифленки

        if ((stairType == "рифленая сталь" || stairType == "рифленый алюминий")) {
         	if (stringerTurn != "забег") {
        		// Прямые ступени нижнего марша (рифленки)
    			marshTreadsParams1.dxfBasePoint = dxfBasePoint;
    			marshTreadsParams1 = drawMarshTreads(marshTreadsParams1, marshFramesParams1);
    			treads.push(marshTreadsParams1.treads);
    			risers.push(marshTreadsParams1.risers);
    			bottomParts.push(marshTreadsParams1.treads);
    			bottomParts.push(marshTreadsParams1.risers);
        		dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams1.a + dxfBasePointStep, 0);

        		// Покрытие промежуточной площадки (рифленки)
    			platformCoverParams1.dxfBasePoint = dxfBasePoint;
                treadsMarsh1 = drawPlatformCover(platformCoverParams1, platformFramesParams1);
                bottomParts.push(platformCoverParams1.group);

      		    dxfBasePoint = newPoint_xy(dxfBasePoint, params.M + dxfBasePointStep, 0);

        		// Прямые ступени промежуточного марша (рифленки)
    			marshTreadsParams2.dxfBasePoint = dxfBasePoint;
				marshTreadsParams2 = drawMarshTreads(marshTreadsParams2, marshFramesParams2);
				treads.push(marshTreadsParams2.treads);
				risers.push(marshTreadsParams2.risers);
				midParts.push(marshTreadsParams2.treads);
				midParts.push(marshTreadsParams2.risers);
    			dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams2.a + dxfBasePointStep, 0);

        		// Покрытие промежуточной площадки (рифленки)
    			platformCoverParams2.dxfBasePoint = dxfBasePoint;
                treadsMarsh2 = drawPlatformCover(platformCoverParams2, platformFramesParams2);
                midParts.push(platformCoverParams2.group);

      		    dxfBasePoint = newPoint_xy(dxfBasePoint, params.M + dxfBasePointStep, 0);

        		// Прямые ступени верхнего марша (рифленки)
    			marshTreadsParams3.dxfBasePoint = dxfBasePoint;
    			marshTreadsParams3 = drawMarshTreads(marshTreadsParams3, marshFramesParams3);
    			treads.push(marshTreadsParams3.treads);
    			risers.push(marshTreadsParams3.risers);
    			topParts.push(marshTreadsParams3.treads);
    			topParts.push(marshTreadsParams3.risers);
        		dxfBasePoint = newPoint_xy(dxfBasePoint, marshTreadsParams3.a + dxfBasePointStep, 0);
        	}

    		// Покрытие верхней площадки (рифленки)
            if (platformTop == "площадка") {
				platformCoverParams3.dxfBasePoint = dxfBasePoint;
                treadsMarsh3 = drawPlatformCover(platformCoverParams3, platformFramesParams3);
                topParts.push(platformCoverParams3.group);

	    		dxfBasePoint = newPoint_xy(dxfBasePoint, platformCoverParams3.a + dxfBasePointStep, 0);
            }
        } // end if



        // установка позиции нижнего марша (при повороте верхнего)
    	for (i = 0; i < bottomParts.length; i++) {
    	    bottomParts[i].position.z += params.M * (turnFactor - 1) * 0.5;
    	}


    	// установка позиции промежуточного марша
    	var pos = {
    			x: params.b1 * params.stairAmt1 + params.M * (1 + turnFactor) * 0.5 + (params.model == "лт" ? 35.0 : 10.0 + params.a1 - params.b1),
    			y: params.h1 * (params.stairAmt1 + 1),
    			z: (params.M - (params.model == "лт" ? 40.0 : params.a2 - params.b2)) * turnFactor
			};
		if (stringerTurn == "забег") {
			pos.y += params.h2 * 2;
			if (params.model == "лт" && params.stairFrame == "нет"){
				pos.x += 1.0;
				pos.z += 40.0 * turnFactor;
				}
			if (params.model == "лт" && params.stairFrame == "есть"){
				pos.x += 40.0;
				pos.z += 40.0 * turnFactor;
				}
			if (params.model == "ко"){
				pos.x = params.b1 * (params.stairAmt1 - 1) + params.a1 - 15 + params.M * (1 + turnFactor) * 0.5;
				pos.z += 72.0 * turnFactor;
				}

			}
    	var rot = Math.PI * 0.5 * turnFactor;
    	for (i = 0; i < midParts.length; i++) {
    	    midParts[i].position.x += pos.x;
    	    midParts[i].position.y += pos.y;
    	    midParts[i].position.z += pos.z;
    	    midParts[i].rotation.y -= rot;
    	}


        // установка позиции верхнего марша
    	var pos = {
    			x: pos.x - params.M * (1 + turnFactor) * 0.5 + (params.model == "лт" ? 40.0 : params.a3 - params.b3),
    			y: pos.y + params.h2 * (params.stairAmt2 + 1),
    			z: pos.z + (params.b2 * params.stairAmt2 + (params.model == "лт" ? 35.0 : 10.0 + params.a2 - params.b2)) * turnFactor +
    				params.M * (1 + turnFactor) * 0.5
			};
		if (stringerTurn2 == "забег") {
			pos.y += params.h3 * 2;
			if (params.model == "лт" && params.stairFrame == "нет"){
				pos.x += -40.0;
				pos.z += 1.0 * turnFactor;
				}
			if (params.model == "лт" && params.stairFrame == "есть"){
				pos.x += -40.0;
				pos.z += 40.0 * turnFactor;
				}
			if (params.model == "ко"){
				pos.x -= 72.0;
				pos.z += -25.0 * turnFactor;
				}

			}
    	var rot = Math.PI * turnFactor;
    	for (i = 0; i < topParts.length; i++) {
    	    topParts[i].position.x += pos.x;
    	    topParts[i].position.y += pos.y;
    	    topParts[i].position.z += pos.z;
    	    topParts[i].rotation.y -= rot;
    	}


/***  ОГРАЖДЕНИЯ П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ***/

        drawP3Railing();

    	function drawP3Railing() {
    	    if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {
    	        var railingSectionParams = {
    	            bottomEnd: "нет",
    	            platformLengthBottom: 0,
    	            topEnd: platformTop,
    	            platformLengthTop: M,
    	            railingSide: "left",
    	            stairAmt: stairAmt1,
    	            h1: h1,
    	            b1: b1,
    	            a1: a1,
    	            h2: h2,
    	            M: M,
    	            scale: scale,
    	            lastMarsh: true,
    	            topConnection: false,
    	            bottomConnection: false,
    	            rigelAmt: params.rigelAmt,
    	            racks: stringerParams1.elmIns["out"].racks,
    	            dxfBasePointRigel: { x: 0, y: 6000 },
    	            dxfBasePointHandrail: { x: 0, y: 3000 },
    	            handrail: handrail,
    	            textHeight: 30,
    	            stringerSideOffset: stringerSideOffset,
    	            stringerThickness: stringerThickness,
    	            model: model,
    	            stairModel: stairModel,
    	            turnFactor: turnFactor,
    	            platformTopRailing: false, //наличие ограждения на верхней площадке
    	            topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
    	        }

    	        /*замыкание поручней внешних секций верхнего и нижнего маршей*/
    	        var outerHandrailConnection = false;
    	        var isSection1 = false;
    	        var isSection3 = false;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
    	        if (isSection1 && isSection3) outerHandrailConnection = true;
    	        railingSectionParams.lastMarsh = false;

    	        if (model === "лт") railingSectionParams.stringerSideOffset = 0;
    	        var railingPositionZ = M * turnFactor;

    	        /*внешняя сторона нижнего марша*/
    	        var railingSection1;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "площадка";
    	            railingSectionParams.topConnection = outerHandrailConnection;
    	            railingSectionParams.bottomConnection = false;
    	            railingSectionParams.platformLengthTop = M + 30;
    	            if (model == "ко") railingSectionParams.platformLengthTop = M + 50;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = true;
    	            railingSectionParams.racks = stringerParams1.elmIns["out"].racks;
    	            railingPositionZ = -40 * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSectionParams.turn = true;//наличие забега
    	            }

    	            railingSection1 = drawRailingSectionNewel(railingSectionParams);
    	            railingSection1.position.z = railingPositionZ * scale;
    	            railing.push(railingSection1);

    	            railingSectionParams.turn = false;
    	        }

    	        /*внутренняя сторона нижнего марша*/

    	        if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "нет";
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = 0;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";
    	            railingPositionZ = M * turnFactor;
    	            var railingSection2 = drawRailingSectionNewel(railingSectionParams);
    	            railingSection2.position.z = railingPositionZ * scale;
    	            railing.push(railingSection2);
    	        }

    	        /*средний марш*/
    	        railingSectionParams.a1 = a2;
    	        railingSectionParams.b1 = b2;
    	        railingSectionParams.h1 = h2;
    	        railingSectionParams.stairAmt = stairAmt2;
    	        /*внешняя сторона среднего марша*/
    	        if (railingSide_2 == "внешнее" || railingSide_2 == "две") {
    	            railingSectionParams.topEnd = "площадка";
    	            railingSectionParams.topConnection = outerHandrailConnection;
    	            railingSectionParams.bottomConnection = outerHandrailConnection;
    	            railingSectionParams.platformLengthTop = M + 30;
    	            railingSectionParams.railingSide = "left";
    	            if (model == "ко") railingSectionParams.platformLengthTop = M + 50;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = true;

    	            railingSectionParams.racks = stringerParams2.elmIns["out"].racks;
    	            if (turnType_1 == "забег") {
    	                railingSectionParams.turn = true;//наличие нижнего забега
    	                railingSectionParams.middleMarsh = true;
    	            }
    	            if (turnType_2 == "забег") {
    	                railingSectionParams.turnTop = true;//наличие верхнего забега
    	            }

    	            var railingSection1 = drawRailingSectionNewel(railingSectionParams);
    	            railingSection1.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection1.position.x = b1 * (stairAmt1) + M + 40 * 2 - 5;
    	            railingSection1.position.y = h1 * (stairAmt1 + 1);
    	            railingSection1.position.z = (M - 40) * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSection1.position.y += 2 * h2;
    	                railingSection1.position.z += 40 * turnFactor;
    	                }
                    if (model == "ко") {
                        railingSection1.position.x -= 25.0 - a1 + b1;
                        railingSection1.position.z += (40.0 - a2 + b2) * turnFactor;
    	            	if (turnType_1 == "забег") {
	                        railingSection1.position.x -= 25.0;
    	                    railingSection1.position.z += 32.0 * turnFactor;
	    	            }
                    }
                  	if (model == "лт" && stairFrame == "есть" && turnType_1 == "забег") {
                  		railingSection1.position.x += 40.0;
    	            }

    	            railing.push(railingSection1);
    	            railingSectionParams.middleMarsh = false;
    	            railingSectionParams.turn = false;
    	            railingSectionParams.turnTop = false;
    	        }

    	        /*внутренняя сторона среднего марша*/

    	        if (railingSide_2 == "внутреннее" || railingSide_2 == "две") {
    	            railingSectionParams.topEnd = "нет";
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = 0;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            railingSectionParams.racks = stringerParams2.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";

    	            var railingSection2 = drawRailingSectionNewel(railingSectionParams);
    	            railingSection2.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection2.position.x = b1 * (stairAmt1) * scale + 40 - 5;
    	            railingSection2.position.y = h1 * (stairAmt1 + 1);
    	            railingSection2.position.z = (M - 40) * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSection2.position.y += 2 * h2;
    	                railingSection2.position.z += 40 * turnFactor;
    	                }
                    if (model == "ко") {
                        railingSection2.position.x -= 25.0 - a1 + b1;
                        railingSection2.position.z += (40.0 - a2 + b2) * turnFactor;
    	            	if (turnType_1 == "забег") {
	                        railingSection2.position.x -= 25.0;
    	                    railingSection2.position.z += 32.0 * turnFactor;
	    	            }
                    }
                  	if (model == "лт" && stairFrame == "есть" && turnType_1 == "забег") {
                  		railingSection2.position.x += 40.0;
    	            }

    	            railing.push(railingSection2);
    	        }


    	        /*верхний марш*/
    	        railingSectionParams.lastMarsh = true;

    	        var topPltRailing_3 = params.topPltRailing_3;
    	        var topPltRailing_4 = params.topPltRailing_4;

    	        if (turnFactor < 0) {
    	            topPltRailing_3 = params.topPltRailing_4;
    	            var topPltRailing_4 = params.topPltRailing_3;
    	        }

    	        railingSectionParams.a1 = a3;
    	        railingSectionParams.b1 = b3;
    	        railingSectionParams.h1 = h3;
    	        railingSectionParams.stairAmt = stairAmt3;

    	        /*внешняя сторона верхнего марша*/

    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.topConnection = false;
    	            railingSectionParams.bottomConnection = outerHandrailConnection;
    	            railingSectionParams.platformLengthTop = platformLength_3;
    	            railingSectionParams.railingSide = "left";
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_3)
    	                railingSectionParams.platformTopRailing = true;


    	            if (turnType_2 == "забег") {
    	                railingSectionParams.turn = true;//наличие забега
    	            }
    	            railingSectionParams.racks = stringerParams3.elmIns["out"].racks;

    	            var railingSection3 = drawRailingSectionNewel(railingSectionParams);

    	            railingSectionParams.turn = false;
    	            railingSection3.rotation.y = -Math.PI * turnFactor;
    	            railingSection3.position.x = b1 * (stairAmt1) + 80 - 5;
    	            railingSection3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
    	            railingSection3.position.z = (M * 2 + 35 + b2 * stairAmt2) * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSection3.position.y += 2 * h2;
    	                railingSection3.position.z += 40 * turnFactor;
    	                railingSection3.position.x += 1;
    	                }
    	            if (turnType_2 == "забег") {
    	                railingSection3.position.y += 2 * h3;
    	                railingSection3.position.z += 1 * turnFactor;
    	                railingSection3.position.x -= 40;
    	            }
    	            if (model == "ко") {
                        railingSection3.position.x += a3 - b3 - 25.0 + a1 - b1 - 40.0;
                        railingSection3.position.z += 15.0 * turnFactor;
    	            	if (turnType_1 == "забег") {
    	                    railingSection3.position.z += 32.0 * turnFactor;
	                        railingSection3.position.x += -26.0;
    	                }
   	                	if (turnType_2 == "забег") {
							railingSection3.position.z += -26.0 * turnFactor;
							railingSection3.position.x += -32.0;
    	                }
    	            }
    	            if (model == "лт" && stairFrame == "есть") {
    	            	if (turnType_1 == "забег") {
                    		railingSection3.position.x += 39.0;
                    	}
    	            	if (turnType_2 == "забег") {
		                	railingSection3.position.z += 39.0 * turnFactor;
						}
    	            }
    	            railing.push(railingSection3);
    	        }

    	        /*внутренняя сторона верхнего марша*/

    	        if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = platformLength_3;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_4)
    	                railingSectionParams.platformTopRailing = true;
    	            railingSectionParams.racks = stringerParams3.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";

    	            var railingSection4 = drawRailingSectionNewel(railingSectionParams);

    	            railingSection4.rotation.y = -Math.PI * turnFactor;
    	            railingSection4.position.x = b1 * (stairAmt1) + 80 - 5;
    	            railingSection4.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
    	            railingSection4.position.z = (M + 35 + b2 * stairAmt2 - 40) * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSection4.position.y += 2 * h2;
    	                railingSection4.position.z += 40 * turnFactor;
    	                railingSection4.position.x += 1;
    	                }
    	            if (turnType_2 == "забег") {
    	                railingSection4.position.y += 2 * h3;
    	                railingSection4.position.z += 1 * turnFactor;
    	                railingSection4.position.x -= 40;
    	                }
    	            if (model == "ко") {
                        railingSection4.position.x += a3 - b3 - 25.0 + a1 - b1 - 40.0;
                        railingSection4.position.z += 15.0 * turnFactor;
    	            	if (turnType_1 == "забег") {
    	                    railingSection4.position.z += 32.0 * turnFactor;
	                        railingSection4.position.x += -26.0;
    	                }
   	                	if (turnType_2 == "забег") {
							railingSection4.position.z += -26.0 * turnFactor;
							railingSection4.position.x += -32.0;
    	                }
    	            }
    	            if (model == "лт" && stairFrame == "есть") {
    	            	if (turnType_1 == "забег") {
	                    	railingSection4.position.x += 39.0;
						}
    	            	if (turnType_2 == "забег") {
		                	railingSection4.position.z += 39.0 * turnFactor;
						}
    	            }

    	            railing.push(railingSection4);
    	        }

    	        /*заднее ограждение промежуточной площадки*/
    	        if (turnType_1 == "площадка") {
    	            if (railingSide_2 === "внешнее" || railingSide_2 === "две") {
    	                railingSectionParams.h1 = h1;
    	                railingSectionParams.stairAmt = stairAmt1;
    	                railingSectionParams.topEnd = "площадка";
    	                railingSectionParams.topPltRailing_5 = true;
    	                railingSectionParams.platformTopRailing = true;
    	                railingSectionParams.topConnection = true;
    	                railingSectionParams.lastMarsh = false;
    	                railingSectionParams.racks = stringerParams1.elmIns["rear"].racks;
    	                railingSectionParams.railingSide = "left";
    	                railingPositionZ = -40 * turnFactor;

    	                var railingSection5 = drawRailingSectionNewel(railingSectionParams);

    	                railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
    	                railingSection5.position.x = b1 * (stairAmt1) * scale + M * scale + 40 * 2 - 5;
    	                railingSection5.position.y = h1 * (stairAmt1 + 1) * scale + 5;
    	                railingSection5.position.z = 0;
    	                if (model === "ко") {
    	                    railingSection5.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                    railingSection5.position.y -= 40 + 5;
    	                }
    	                railing.push(railingSection5);
    	            }
    	        }

    	        /*заднее ограждение промежуточной площадки*/
    	        if (turnType_2 == "площадка") {
    	            if (railingSide_2 === "внешнее" || railingSide_2 === "две") {
    	                railingSectionParams.h1 = h2;
    	                railingSectionParams.stairAmt = stairAmt2;
    	                railingSectionParams.topEnd = "площадка";
    	                railingSectionParams.topPltRailing_5 = true;
    	                railingSectionParams.platformTopRailing = true;
    	                railingSectionParams.topConnection = true;
    	                railingSectionParams.lastMarsh = false;
    	                railingSectionParams.racks = stringerParams2.elmIns["rear"].racks;
    	                railingSectionParams.railingSide = "left";

    	                var railingSection5 = drawRailingSectionNewel(railingSectionParams);

    	                railingSection5.rotation.y = -Math.PI * turnFactor;
    	                railingSection5.position.x = b1 * (stairAmt1) + 40 - 5 + M;
    	                railingSection5.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) + 5;
    	                railingSection5.position.z = (M * 2 + 35 + b2 * stairAmt2) * turnFactor;
    	                if (turnType_1 == "забег") {
    	                    railingSection5.position.y += 2 * h2;
    	                    railingSection5.position.z += 40 * turnFactor;
    	                }
    	                if (model === "ко") {
    	                    railingSection5.position.x += a1 - b1 - 40 + stringerThickness + 7;
    	                    railingSection5.position.y -= 40 + 5;
							railingSection5.position.z += 12.0 * turnFactor;
    	                	if (turnType_1 == "забег") {
								railingSection5.position.z += 33.0 * turnFactor;
								railingSection5.position.x += -25.0;
	    	                }
    	                }
	    	            if (model == "лт" && stairFrame == "есть") {
	    	            	if (turnType_1 == "забег") {
    		                	railingSection5.position.x += 40.0;
    						}
    	                }
    	                railing.push(railingSection5);
    	            }
    	        }

    	        /*заднее ограждение верхней площадки*/
    	        if (railingSide_3 !== "нет") {
    	            if (platformTop == "площадка" && params.topPltRailing_5) {
    	                railingSectionParams.h1 = h3;
    	                railingSectionParams.stairAmt = stairAmt3;
    	                railingSectionParams.topPltRailing_5 = true;
    	                railingSectionParams.platformTopRailing = true;
    	                railingSectionParams.topConnection = false;
    	                railingSectionParams.lastMarsh = true;
    	                railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
    	                railingSectionParams.railingSide = "left";

    	                var railingSection6 = drawRailingSectionNewel(railingSectionParams);

    	                railingSection6.rotation.y = -3 * Math.PI / 2 * turnFactor;
    	                railingSection6.position.x = b1 * stairAmt1 - b3 * stairAmt3 - platformLength_3 - 8 + 40;
    	                railingSection6.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) + h3 * (stairAmt3 + 1) + 5;
    	                railingSection6.position.z = (M * 2 + b2 * (stairAmt2) + 36 - 40) * turnFactor;
    	                if (turnType_1 == "забег") {
    	                    railingSection6.position.y += 2 * h2;
    	                    railingSection6.position.z += 40 * turnFactor;
    	                }
    	                if (turnType_2 == "забег") {
    	                    railingSection6.position.y += 2 * h3;
    	                    railingSection6.position.x -= 40;
    	                }

    	                if (model === "ко") {
    	                    railingSection6.position.x += a1 - b1 - 40 + stringerThickness * 2;
    	                    railingSection6.position.z -= stringerThickness;
    	                    railingSection6.position.y -= 40 + 5;
    	                    if (stairModel == "Г-образная с забегом") {
    	                        railingSection6.position.x -= 40 + 24;
    	                        railingSection6.position.z += (40 - 8) * turnFactor;
    	                    }
    	                }
    	                railing.push(railingSection6);
    	            }
    	        }
    	    }
	        if (railingModel == "Стекло на стойках") {


	        }
	        if (railingModel == "Самонесущее стекло") {
				var railingSectionParams = {
    	            bottomEnd: "нет",
    	            platformLengthBottom: 0,
    	            topEnd: platformTop,
    	            platformLengthTop: M,
    	            railingSide: "left",
    	            stairAmt: stairAmt1 + 1,
    	            h1: h1,
    	            b1: b1,
    	            a1: a1,
    	            h2: h2,
    	            h3: h3,
					b3: b3,
    	            a3: a3,
    	            M: M,
    	            scale: scale,
    	            //lastMarsh: true,
    	            lastMarsh: false,
    	            topConnection: false,
    	            bottomConnection: false,
    	            rigelAmt: params.rigelAmt,
    	            racks: stringerParams1.elmIns["out"].racks,
    	            dxfBasePoint: dxfBasePoint,
    	            handrail: handrail,
    	            textHeight: 30,
    	            stringerSideOffset: stringerSideOffset,
    	            stringerThickness: stringerThickness,
    	            model: model,
    	            platformTopRailing: false, //наличие ограждения на верхней площадке
    	            topPltRailing_5: false, //наличие заднего ограждения на верхней площадке
    	        }

				//railingSectionParams.stairModel = "П-образная с площадкой";
railingSectionParams.stairModel = "П-образная трехмаршевая";
    	        /*замыкание поручней внешних секций верхнего и нижнего маршей*/
    	        var outerHandrailConnection = false;
    	        var isSection1 = false;
    	        var isSection3 = false;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
    	        if (isSection1 && isSection3) outerHandrailConnection = true;
    	        railingSectionParams.lastMarsh = false;

    	        if (model === "лт") railingSectionParams.stringerSideOffset = 0;
    	        var railingPositionZ = M * turnFactor;
				
				//railingSectionParams.turnType_bot = turnType_2;
    	        //railingSectionParams.turnType_top = turnType_1;
				
    	        /*внешняя сторона нижнего марша*/
    	        var railingSection1;
    	        if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "площадка";
    	            railingSectionParams.topConnection = outerHandrailConnection;
    	            railingSectionParams.bottomConnection = false;
    	            railingSectionParams.platformLengthTop = stringerParams1.topEndLength;
					if (turnType_1 == "забег") {
						railingSectionParams.topEnd = "забег";		//наличие забега
						railingSectionParams.platformLengthTop = M + 70;
					}
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = true;
					if (backRailing_1 == "есть") railingSectionParams.topPltRailing_5 = true;
    	            railingSectionParams.racks = stringerParams1.elmIns["out"].racks;
    	            railingPositionZ = -40 * turnFactor;
    	            railingSection1 = drawRailingSectionGlass(railingSectionParams);
    	            railingSection1.position.z = railingPositionZ * scale;
    	            railing.push(railingSection1);
					railingSectionParams.paltformGlassDeltaY = railingSection1.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }
//console.log(railingSectionParams.paltformGlassDeltaY);
				/*внутренняя сторона нижнего марша*/

    	        if (railingSide_1 == "внутреннее" || railingSide_1 == "две") {
    	            railingSectionParams.topEnd = "нет";
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = 0;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";
    	            railingPositionZ = M * turnFactor;
    	            var railingSection2 = drawRailingSectionGlass(railingSectionParams);
    	            railingSection2.position.z = railingPositionZ * scale;
    	            railing.push(railingSection2);
					railingSectionParams.paltformGlassDeltaY = railingSection2.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/
//console.log(railingSectionParams.paltformGlassDeltaY);
////////////////////////////////

				/* средний марш */
				
				railingSectionParams.a1 = a2;
    	        railingSectionParams.b1 = b2;
    	        railingSectionParams.h1 = h2;
				railingSectionParams.stairAmt = stairAmt2;
				railingSectionParams.stringerWidth = stringerParams2.stringerWidth;
				
				/*внешняя сторона среднего марша*/

				railingSectionParams.lastMarsh = true;
    	        railingSectionParams.turnType_bot = turnType_1;
    	        railingSectionParams.turnType_top = turnType_2;
    	        if (railingSide_2 == "внешнее" || railingSide_2 == "две") {
					//railingSectionParams.stairModel = stairModel;
					//railingSectionParams.stairModel = "П-образная с площадкой";
					railingSectionParams.stairModel = "П-образная трехмаршевая";
    	            railingSectionParams.topEnd = "площадка";
    	            railingSectionParams.bottomEnd = "площадка";
    	            railingSectionParams.platformLengthBottom = M - 8;
					railingSectionParams.platformLengthTop = M - 8;
					railingSectionParams.stairAmt = stairAmt2 + 1;
					
					if (turnType_1 == "забег") {
						railingSectionParams.bottomEnd = "забег";		//наличие забега снизу
						railingSectionParams.platformLengthTop = M - 8;
					}
					if (turnType_2 == "забег") {
						railingSectionParams.topEnd = "забег";		//наличие забега сверху
						railingSectionParams.platformLengthBottom = M - 8;
					}
					
    	            railingSectionParams.topConnection = false;
    	            railingSectionParams.bottomConnection = outerHandrailConnection;
    	            //railingSectionParams.platformLengthTop = platformLength_3;
					railingSectionParams.platformLength = platformLength_3;

    	            railingSectionParams.railingSide = "left";
    	            //ограждение верхней площадки
    	            //railingSectionParams.platformTopRailing = false;
    	            railingSectionParams.platformTopRailing = true;
					
					railingSectionParams.topPltRailing_5_low = false;
					//if (railingSide_2 == "внешнее" || railingSide_2 == "две") railingSectionParams.topPltRailing_5_low = true;	// для концов поручней

					if (turnType_1 == "площадка") {	// переносим координаты отверстий с задней тетивы в тетиву марша
						var newHole = {
							x: -(stringerParams1.elmIns["rear"].racks[0].x - 40),
							y: stringerParams1.elmIns["rear"].racks[0].y + 5,
						}
						stringerParams2.elmIns["out"].racks.unshift(newHole);
						newHole = {
							x: -(stringerParams1.elmIns["rear"].racks[1].x - 40),
							y: stringerParams1.elmIns["rear"].racks[1].y + 5,
						}
						stringerParams2.elmIns["out"].racks.unshift(newHole);
					}
					railingSectionParams.middleMarsh = true;
if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
					railingSectionParams.topPltRailing_5 = true;
}
    	            railingSectionParams.racks = stringerParams2.elmIns["out"].racks;
					railingSectionParams.basePointBottomTurnGlassOut = stringerParams2.pgalssPosition;
    	            var railingSection2 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection2.rotation.y = (-Math.PI*0.5) * turnFactor;
					railingSection2.position.x = b1 * (stairAmt1) + M + 80 - 5;
					railingSection2.position.y = h1 * (stairAmt1 + 1);
					railingSection2.position.z = (M-40) * turnFactor;
					if (turnType_1 == "забег") {
						railingSection2.position.y += 2 * h2;
						railingSection2.position.x += 40;
					}
					if (turnType_2 == "забег") {
						// корректировка позиционирования
					}
    	            railing.push(railingSection2);
					railingSectionParams.paltformGlassDeltaY = railingSection2.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }
//console.log(railingSectionParams.paltformGlassDeltaY);
				/*внутренняя сторона среднего марша*/

    	        if (railingSide_2 == "внутреннее" || railingSide_2 == "две") {

					railingSectionParams.topPltRailing_5_low = false;
					//railingSectionParams.topPltRailing_5_low = true;
					//railingSectionParams.topPltRailing_5 = params.topPltRailing_5;
    	            railingSectionParams.topEnd = "нет";
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = 0;
    	            //ограждение верхней площадки
    	            //railingSectionParams.platformTopRailing = false;
					railingSectionParams.racks = stringerParams2.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";
					if (turnType_1 == "забег") {
						railingSectionParams.insideTurn = true;		//наличие забега снизу
					}
//console.log(stringerParams2);
    	            var railingSection2 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection2.rotation.y = (-Math.PI*0.5) * turnFactor;
					railingSection2.position.x = b1 * (stairAmt1) + 40 - 5;
					railingSection2.position.y = h1 * (stairAmt1 + 1);
					railingSection2.position.z = (M - 40) * turnFactor;
					if (turnType_1 == "забег") {
						railingSection2.position.y += 2 * h2;
						railingSection2.position.z += 40 * turnFactor;
						railingSection2.position.x += 40;
					}
					if (turnType_2 == "забег") {
						//корректировка позиционирования
					}
    	            railing.push(railingSection2);
					railingSectionParams.paltformGlassDeltaY = railingSection2.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }
//console.log(railingSectionParams.paltformGlassDeltaY);
				
				

////////////////////////////////

				/*верхний марш*/

    	        railingSectionParams.lastMarsh = true;
				delete railingSectionParams.middleMarsh;

    	        var topPltRailing_3 = params.topPltRailing_3;
    	        var topPltRailing_4 = params.topPltRailing_4;
				
				if (turnFactor < 0) {
                    topPltRailing_3 = params.topPltRailing_4;
                    var topPltRailing_4 = params.topPltRailing_3;
                }

    	        railingSectionParams.a1 = a3;
    	        railingSectionParams.b1 = b3;
    	        railingSectionParams.h1 = h3;
    	        railingSectionParams.stairAmt = stairAmt3;
				
				railingSectionParams.turnType_bot = turnType_2;
    	        //railingSectionParams.turnType_top = turnType_2;
				railingSectionParams.stringerWidth = stringerParams3.stringerWidth;

				/*внешняя сторона верхнего марша*/

    	        if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
					//railingSectionParams.stairModel = stairModel;
					//railingSectionParams.stairModel = "П-образная с площадкой";
					railingSectionParams.stairModel = "П-образная трехмаршевая";
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.bottomEnd = "площадка";
    	            railingSectionParams.platformLengthBottom = M - 8;
if (turnType_2 == "забег") {
	railingSectionParams.bottomEnd = "забег";		//наличие забега
	railingSectionParams.platformLengthBottom = M - 8;
}
    	            railingSectionParams.topConnection = false;
    	            railingSectionParams.bottomConnection = outerHandrailConnection;
    	            railingSectionParams.platformLengthTop = platformLength_3;
					railingSectionParams.platformLength = platformLength_3;

    	            railingSectionParams.railingSide = "left";
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_3) {
    	                railingSectionParams.platformTopRailing = true;
						railingSectionParams.stairAmt = stairAmt3 + 1;
					}
					railingSectionParams.topPltRailing_5_low = false;
if (railingSide_2 == "внешнее" || railingSide_2 == "две") railingSectionParams.topPltRailing_5_low = true;	// для концов поручней

if (turnType_2 == "площадка") {				// переносим координаты отверстий с задней тетивы в тетиву марша
	var newHole = {
		x: -(stringerParams2.elmIns["rear"].racks[0].x - 40),
		y: stringerParams2.elmIns["rear"].racks[0].y + 5,
	}
	stringerParams3.elmIns["out"].racks.unshift(newHole);
	newHole = {
		x: -(stringerParams2.elmIns["rear"].racks[1].x - 40),
		y: stringerParams2.elmIns["rear"].racks[1].y + 5,
	}
	stringerParams3.elmIns["out"].racks.unshift(newHole);
}
					railingSectionParams.topPltRailing_5 = params.topPltRailing_5;
    	            railingSectionParams.racks = stringerParams3.elmIns["out"].racks;
					railingSectionParams.basePointBottomTurnGlassOut = stringerParams3.pgalssPosition;
    	            var railingSection3 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection3.rotation.y = (-Math.PI) * turnFactor;
railingSection3.position.x = b1 * (stairAmt1) + 80 - 5;
railingSection3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
railingSection3.position.z = (M * 2 + 35 + b2 * stairAmt2) * turnFactor;
if (turnType_1 == "забег") {
    railingSection3.position.y += 2 * h2;
    railingSection3.position.z += 40 * turnFactor;
    //railingSection3.position.x += 1;
    railingSection3.position.x += 40;
}
if (turnType_2 == "забег") {
    railingSection3.position.y += 2 * h3;
    //railingSection3.position.z += 1 * turnFactor;
    railingSection3.position.z += 40 * turnFactor;
    //railingSection3.position.x -= 40;
}
    	            if (model == "ко") {
    	                railingSection3.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection3.position.z -= (a3 - b3 - 40) * turnFactor;
    	            }
    	            railing.push(railingSection3);
					railingSectionParams.paltformGlassDeltaY = railingSection3.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }/**/
if (railingSide_3 == "внутреннее" || railingSide_3 == "нет") {
	if (turnType_2 == "площадка") railingSectionParams.paltformGlassDeltaY = railingSectionParams.paltformGlassDeltaY + 60;
	if (turnType_2 == "забег") railingSectionParams.paltformGlassDeltaY -= 180;
}
				/*внутренняя сторона верхнего марша*/

    	        if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {

					//railingSectionParams.topPltRailing_5_low = false;
					//if (backRailing_1 == "есть") railingSectionParams.topPltRailing_5_low = true;
					railingSectionParams.topPltRailing_5 = params.topPltRailing_5;
    	            railingSectionParams.topEnd = platformTop;
    	            railingSectionParams.bottomEnd = "нет";
    	            railingSectionParams.platformLengthBottom = 0;
    	            railingSectionParams.platformLengthTop = platformLength_3;
    	            //ограждение верхней площадки
    	            railingSectionParams.platformTopRailing = false;
    	            if (platformTop == "площадка" && topPltRailing_4) {
    	                railingSectionParams.platformTopRailing = true;
						railingSectionParams.stairAmt = stairAmt3 + 1;
					}
					railingSectionParams.racks = stringerParams3.elmIns["in"].racks;
    	            railingSectionParams.railingSide = "right";

    	            var railingSection4 = drawRailingSectionGlass(railingSectionParams);

    	            railingSection4.rotation.y = -Math.PI * turnFactor;
    	            /*railingSection4.position.x = b1 * (stairAmt1) + 40 - 5;
    	            railingSection4.position.y = h1 * (stairAmt1 + 1);
					railingSection4.position.z = (stringerParams1.platformWidth_1 - M) * turnFactor;*/
railingSection4.position.x = b1 * (stairAmt1) + 80 - 5;
railingSection4.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
railingSection4.position.z = (M - 5 + b2 * stairAmt2) * turnFactor;
if (turnType_1 == "забег") {
    railingSection4.position.y += 2 * h2;
    railingSection4.position.z += 40 * turnFactor;
    //railingSection4.position.x += 1;
    railingSection4.position.x += 40;
}
if (turnType_2 == "забег") {
    railingSection4.position.y += 2 * h3;
    //railingSection4.position.z += 1 * turnFactor;
    railingSection4.position.z += 40 * turnFactor;
    railingSection4.position.x -= 40;
}
					if (model == "ко") {
    	                railingSection4.position.x += a1 - b1 - 40 + stringerThickness + 5;
    	                railingSection4.position.z -= (a3 - b3 - 40) * turnFactor;
    	            }

    	            railing.push(railingSection4);
					railingSectionParams.paltformGlassDeltaY = railingSection4.paltformGlassDeltaY;		// уменьшение стекла заднего ограждения
    	        }

				/*заднее ограждение верхней площадки*/
				
    	        if (railingSide_3 !== "нет") {
    	            if (platformTop == "площадка" && params.topPltRailing_5) {
    	                railingSectionParams.h1 = h3;
    	                railingSectionParams.stairAmt = stairAmt3+1;
    	                railingSectionParams.topPltRailing_5 = true;
    	                railingSectionParams.platformTopRailing = true;
    	                railingSectionParams.topConnection = false;
    	                railingSectionParams.lastMarsh = true;
    	                railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
    	                railingSectionParams.railingSide = "left";
						railingSectionParams.platformLength = M;

    	                var railingSection6 = drawRailingSectionGlassPlatform(railingSectionParams);

    	                railingSection6.rotation.y = -Math.PI*0.5 * turnFactor;
railingSection6.position.x = b1 * (stairAmt1) - b3 * (stairAmt3) - platformLength_3 + 20 - 5;
railingSection6.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) + h3 * (stairAmt3 + 1) + 5;
railingSection6.position.z = (M - 5 + b2 * stairAmt2) * turnFactor;
if (turnType_1 == "забег") {
    railingSection6.position.y += 2 * h2;
    railingSection6.position.z += 40 * turnFactor;
    //railingSection6.position.x += 1;
    railingSection6.position.x += 40;
}
if (turnType_2 == "забег") {
    railingSection6.position.y += 2 * h3;
    //railingSection6.position.z += 1 * turnFactor;
    railingSection6.position.z += 40 * turnFactor;
    railingSection6.position.x -= 40;
}
    	                if (model === "ко") {
    	                    railingSection6.position.x += a1 - b1 - 40 + stringerThickness * 2;
    	                    railingSection6.position.z -= stringerThickness;
    	                    railingSection6.position.y -= 40 + 5;
    	                }
    	                railing.push(railingSection6);
    	            }
    	        }

	        }
	        if (railingModel == "Кованые балясины") {
	            var railingSectionParams = {
	                bottomEnd: "нет",
	                platformLengthBottom: 0,
	                topEnd: platformTop,
	                platformLengthTop: platformLength_3,
	                railingSide: "right",
	                stairAmt: stairAmt1,
	                h: h1,
	                b: b1,
	                a: a1,
	                scale: scale,
	                lastMarsh: true,
	                topConnection: false,
	                bottomConnection: false,
	                connectionLength: 88,
	                rigelAmt: params.rigelAmt,
	                stringerSideOffset: stringerSideOffset,
	                winder: false,
	                topWinder: false,
	                dxfBasePoint: dxfBasePoint,
	                handrail: handrail,
                    turnFactor: turnFactor,
	                text: 'Секция под кованые балясины',
	                gInBottom: false
	            }
	            var railingSectionFunction = function() {};
	            railingSectionFunction = drawRailingSectionForge; //
	            var railingPositionZ = M * turnFactor;
	            var railingSection1, railingSection2, railingSection3, railingSection4, railingSection5, railingSection6, railingSection7;
	            /* IN */
	            if (railingSide_1 === "внутреннее" || railingSide_1 === "две") {
	                railingSectionParams.gInBottom = true;
	                railingSectionParams.railingSide = 'right';
	                railingSectionParams.racks = stringerParams1.elmIns["in"].racks;
	                railingSection1 = railingSectionFunction(railingSectionParams);
	                railingSection1.position.z = railingPositionZ + 40 * (0.5 * turnFactor - 0.5);
	                railing.push(railingSection1);
	                railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
	                if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
	                railingSectionParams.gInBottom = false;
	            }
	            /* OUT */
	            if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
	                railingSectionParams.lastMarsh = (railingSide_2 === "внешнее" || railingSide_2 === "две" || turnType_1 == 'забег' || model == "лт") ? false : true;
	                if (turnType_1 == "забег") railingSectionParams.winder = true;
	                railingSectionParams.railingSide = 'left';
	                railingSectionParams.topConnection = (railingSide_2 == 'внешнее' || railingSide_2 == 'две') ? true : false;
	                railingSectionParams.connectionLength = model == "ко" ? 158 : 125;
	                var racksStringer = [];
	                var countRack = 0;
	                for (; countRack < stringerParams1.elmIns['out'].racks.length; countRack++) {
	                    racksStringer.push(stringerParams1.elmIns['out'].racks[countRack]);
	                }
	                if (railingSide_2 === "внешнее" || railingSide_2 === "две") {
	                    if (model == "ко" && turnType_1 != 'забег') {
	                        var countArr = stringerParams1.elmIns['out'].racks.length - 1;
	                        var point = newPoint_xy(stringerParams1.elmIns['out'].racks[countArr], stringerParams1.elmIns['sideStringerKo'].racks[0].x + stringerParams1.b / 2 + 8, 0.0);
	                        racksStringer.push(point);
	                    }
	                }
	                railingSectionParams.racks = racksStringer;
	                railingSection2 = railingSectionFunction(railingSectionParams);
	                railingSection2.position.z = -20 * (1 + turnFactor);
	                railing.push(railingSection2);
	                railingSectionParams.dxfBasePoint.x += b1 * stairAmt1 + 100;
	                if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
	                railingSectionParams.topConnection = false;
	                railingSectionParams.winder = false;
	            }
	            /*ограждения среднего марша*/
	            railingSectionParams.h = h2;
	            railingSectionParams.a = a2;
	            railingSectionParams.b = b2;
	            /*внутренняя сторона среднего марша*/
	            if (railingSide_2 == "внутреннее" || railingSide_2 == "две") {
	                railingSectionParams.lastMarsh = true;
	                railingSectionParams.racks = stringerParams2.elmIns["in"].racks;
	                railingSectionParams.railingSide = "right";
	                var railingSection3 = railingSectionFunction(railingSectionParams);
    	            railingSection3.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection3.position.x = b1 * (stairAmt1) + 40 * (0.5* turnFactor + 0.5) - 5;
    	            railingSection3.position.y = h1 * (stairAmt1 + 1);
    	            railingSection3.position.z = (M - 40) * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSection3.position.y += 2 * h2;
    	                railingSection3.position.z += 40 * turnFactor;
    	                }
                    if (model == "ко") {
                        railingSection3.position.x -= 25.0 - a1 + b1;
                        railingSection3.position.z += (40.0 - a2 + b2) * turnFactor;
    	            	if (turnType_1 == "забег") {
	                        railingSection3.position.x -= 25.0;
    	                    railingSection3.position.z += 32.0 * turnFactor;
	    	            }
                    }
                  	if (model == "лт" && stairFrame == "есть" && turnType_1 == "забег") {
                  		railingSection3.position.x += 40.0;
    	            }
	                railing.push(railingSection3);
	                railingSectionParams.dxfBasePoint.x += b2 * stairAmt2 + 100;
	            }
	            /*внешняя сторона среднего марша*/
	            if (railingSide_2 == "внешнее" || railingSide_2 == "две") {
	                var racksStringer = [];
	                if (turnType_1 != 'забег') {
	                    for (i = 0; i < stringerParams1.elmIns['rear'].racks.length; i++) {
	                        var point = newPoint_xy(stringerParams1.elmIns['rear'].racks[i], -stringerParams1.M + 40, 5);
	                        if (model == "ко") {
	                            point = newPoint_xy(stringerParams1.elmIns['rear'].racks[i], -stringerParams1.M + stringerParams1.stringerSideOffset + a3 - b3 + 8, -40);
	                        }
	                        racksStringer.push(point);
	                    }
	                }
	                for (i = 0; i < stringerParams2.elmIns['out'].racks.length; i++) {
	                    racksStringer.push(stringerParams2.elmIns['out'].racks[i]);
	                }
	                if (model == "ко" && turnType_2 == "площадка") {
	                    var countArr = stringerParams2.elmIns['out'].racks.length - 1;
	                    var point = newPoint_xy(stringerParams2.elmIns['out'].racks[countArr],
	                        stringerParams2.elmIns['sideStringerKo'].racks[0].x + stringerParams2.b / 2,
	                        0.0);
	                    racksStringer.push(point);
	                }
	                railingSectionParams.racks = racksStringer;
	                railingSectionParams.winder = true;
	                if (turnType_2 == "забег") railingSectionParams.topWinder = true;
	                railingSectionParams.lastMarsh = false;
	                if (railingSide_3 == 'внешнее' || railingSide_3 == 'две') railingSectionParams.topConnection = true;
	                if (railingSide_1 == 'внешнее' || railingSide_1 == 'две') railingSectionParams.bottomConnection = true;
	                railingSectionParams.connectionLength = model == "ко" ? 170 : 123;
	                railingSectionParams.railingSide = 'left';
	                var railingSection4 = drawRailingSectionForge3(railingSectionParams);
	                railingSection4.rotation.y = -Math.PI / 2 * turnFactor;
    	            railingSection4.position.x = b1 * (stairAmt1) + M + 40 * (1 + 0.5 * turnFactor + 0.5) - 5;
    	            railingSection4.position.y = h1 * (stairAmt1 + 1);
    	            railingSection4.position.z = (M - 40) * turnFactor;
    	            if (turnType_1 == "забег") {
    	                railingSection4.position.y += 2 * h2;
    	                railingSection4.position.z += 40 * turnFactor;
    	                }
                    if (model == "ко") {
                        railingSection4.position.x -= 25.0 - a1 + b1;
                        railingSection4.position.z += (40.0 - a2 + b2) * turnFactor;
    	            	if (turnType_1 == "забег") {
	                        railingSection4.position.x -= 25.0;
    	                    railingSection4.position.z += 32.0 * turnFactor;
	    	            }
                    }
                  	if (model == "лт" && stairFrame == "есть" && turnType_1 == "забег") {
                  		railingSection4.position.x += 40.0;
    	            }

	                railing.push(railingSection4);
	                railingSectionParams.lastMarsh =
	                    railingSectionParams.winder =
	                    railingSectionParams.topWinder =
	                    railingSectionParams.topConnection = railingSectionParams.bottomConnection = false;
	                railingSectionParams.dxfBasePoint.x += b2 * stairAmt2 + 100;
	            }
	            /*ограждения верхнего марша*/
	            railingSectionParams.h = h3;
	            railingSectionParams.a = a3;
	            railingSectionParams.b = b3;
	            //IN
	            if (railingSide_3 === "внутреннее" || railingSide_3 === "две") {
	                railingSectionParams.lastMarsh = (topPltRail_4 && platformTop == "площадка") ? false : true;
	                if (topPltRail_5 && topPltRail_4 && platformTop == "площадка") railingSectionParams.topConnection = true;
	                railingSectionParams.railingSide = 'right';
	                var racksStringer = [];
	                for (i = 0; i < stringerParams3.elmIns['in'].racks.length; i++) {
	                    racksStringer.push(stringerParams3.elmIns['in'].racks[i]);
	                }
	                if (model == "ко" && platformTop == "площадка" && topPltRail_4) {
	                    var countArr = stringerParams3.elmIns['out'].racks.length - 1;
	                    var point = newPoint_xy(stringerParams3.elmIns['out'].racks[countArr], stringerParams3.elmIns['sideStringerKo'].racks[0].x + stringerParams3.b / 2, 0.0);
	                    racksStringer.push(point);
	                }
	                railingSectionParams.racks = racksStringer;
	                railingSection5 = railingSectionFunction(railingSectionParams);
	                railingSection5.rotation.y = -Math.PI * turnFactor;
	                railingSection5.position.x = b1 * (stairAmt1) + 80 - 5;
	                railingSection5.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
	                railingSection5.position.z = (M + 35 + b2 * stairAmt2 - 40) * turnFactor + (1 - turnFactor) * 40 / 2;
	                if (turnType_1 == "забег") {
	                    railingSection5.position.y += 2 * h2;
	                    railingSection5.position.z += 40 * turnFactor;
	                    railingSection5.position.x += 1;
	                }
	                if (turnType_2 == "забег") {
	                    railingSection5.position.y += 2 * h3;
	                    railingSection5.position.z += 1 * turnFactor;
	                    railingSection5.position.x -= 40;
	                }
	                if (model == "ко") {
	                    railingSection5.position.x += a3 - b3 - 25.0 + a1 - b1 - 40.0;
	                    railingSection5.position.z += 15.0 * turnFactor;
	                    if (turnType_1 == "забег") {
	                        railingSection5.position.z += 32.0 * turnFactor;
	                        railingSection5.position.x += -26.0;
	                    }
	                    if (turnType_2 == "забег") {
	                        railingSection5.position.z += -26.0 * turnFactor;
	                        railingSection5.position.x += -32.0;
	                    }
	                }
	                if (model == "лт" && stairFrame == "есть") {
	                    if (turnType_1 == "забег") {
	                        railingSection5.position.x += 39.0;
	                    }
	                    if (turnType_2 == "забег") {
	                        railingSection5.position.z += 39.0 * turnFactor;
	                    }
	                }
	                railing.push(railingSection5);
	                railingSectionParams.bottomConnection = railingSectionParams.topConnection = false;
	                railingSectionParams.dxfBasePoint.x += stringerParams1.M + b3 * stairAmt3 + 300;
	                if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
	            }
	            /*/OUT*/
	            if (railingSide_3 === "внешнее" || railingSide_3 === "две") {
	                railingSectionParams.railingSide = 'left';
	                if (turnType_2 == "забег") railingSectionParams.winder = true;
	                if (railingSide_2 == "внешнее" || railingSide_2 == "две") railingSectionParams.bottomConnection = true;
	                if (topPltRail_5 && topPltRail_3 && platformTop == "площадка") railingSectionParams.topConnection = true;
	                railingSectionParams.connectionLength = model == "ко" ? 180 : 123;
	                railingSectionParams.lastMarsh = (topPltRail_3 && platformTop == "площадка") ? false : true;
	                var racksStringer = [];
	                if (turnType_2 != 'забег') {
	                    for (i = 0; i < stringerParams2.elmIns['rear'].racks.length; i++) {
	                        var point = newPoint_xy(stringerParams2.elmIns['rear'].racks[i], -stringerParams1.M + 40, 5);
	                        if (model == "ко") {
	                            point = newPoint_xy(stringerParams2.elmIns['rear'].racks[i], -stringerParams1.M + stringerParams1.stringerSideOffset + a3 - b3 + 8, -40);
	                        }
	                        racksStringer.push(point);
	                    }
	                }
	                for (i = 0; i < stringerParams3.elmIns['out'].racks.length; i++) {
	                    racksStringer.push(stringerParams3.elmIns['out'].racks[i]);
	                }
	                if (model == "ко" && platformTop == "площадка" && topPltRail_3) {
	                    var countArr = stringerParams3.elmIns['out'].racks.length - 1;
	                    var point = newPoint_xy(stringerParams3.elmIns['out'].racks[countArr],
	                        stringerParams3.elmIns['sideStringerKo'].racks[0].x + stringerParams3.b / 2,
	                        0.0);
	                    racksStringer.push(point);
	                }
	                railingSectionParams.racks = racksStringer;
	                railingSection6 = drawRailingSectionForge3(railingSectionParams);
	                railingSection6.rotation.y = -Math.PI * turnFactor;
	                railingSection6.position.x = b1 * (stairAmt1) + 80 - 5;
	                railingSection6.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
	                railingSection6.position.z = (M * 2 + 35 + b2 * stairAmt2) * turnFactor + (1 - turnFactor) * 40 / 2;
	                if (turnType_1 == "забег") {
	                    railingSection6.position.y += 2 * h2;
	                    railingSection6.position.z += 40 * turnFactor;
	                    railingSection6.position.x += 1;
	                }
	                if (turnType_2 == "забег") {
	                    railingSection6.position.y += 2 * h3;
	                    railingSection6.position.z += 1 * turnFactor;
	                    railingSection6.position.x -= 40;
	                }
	                if (model == "ко") {
	                    railingSection6.position.x += a3 - b3 - 25.0 + a1 - b1 - 40.0;
	                    railingSection6.position.z += 15.0 * turnFactor;
	                    if (turnType_1 == "забег") {
	                        railingSection6.position.z += 32.0 * turnFactor;
	                        railingSection6.position.x += -26.0;
	                    }
	                    if (turnType_2 == "забег") {
	                        railingSection6.position.z += -26.0 * turnFactor;
	                        railingSection6.position.x += -32.0;
	                    }
	                }
	                if (model == "лт" && stairFrame == "есть") {
	                    if (turnType_1 == "забег") {
	                        railingSection6.position.x += 39.0;
	                    }
	                    if (turnType_2 == "забег") {
	                        railingSection6.position.z += 39.0 * turnFactor;
	                    }
	                }
	                railing.push(railingSection6);
	                railingSectionParams.dxfBasePoint.x += b3 * stairAmt3 + M + 100;
	                if (!railingSectionParams.lastMarsh) railingSectionParams.dxfBasePoint.x += platformLength_3;
	                railingSectionParams.bottomConnection = railingSectionParams.topConnection = false;
	                railingSectionParams.winder = false;
	                railingSectionParams.lastMarsh = true;
	            }
	            /*/заднее ограждение верхней площадки*/
	            if (platformTop == "площадка" && params.topPltRailing_5) {
	                railingSectionParams.topConnection = (topPltRail_4 && (railingSide_3 == 'внутреннее' || railingSide_3 == 'две')) ? true : false;
	                railingSectionParams.bottomConnection = (topPltRail_3 && (railingSide_3 == 'внешнее' || railingSide_3 == 'две')) ? true : false;
	                railingSectionParams.racks = stringerParams3.elmIns["rear"].racks;
	                railingSectionParams.platformRack = true;
	                railingSectionParams.railingSide = 'left';
	                railingSectionParams.connectionLength = model == 'ко' ? 143 : 103;
	                var railingSection7 = railingSectionFunction(railingSectionParams);
	                railingSection7.rotation.y = -3 * Math.PI / 2 * turnFactor;
					railingSection7.position.x = b1 * stairAmt1 - b3 * stairAmt3 - platformLength_3 - 8 + 40;
					railingSection7.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1) + h3 * (stairAmt3 + 1) + 5;
					railingSection7.position.z = (M * 2 + b2 * (stairAmt2) + 36 - 40) * turnFactor;
					if (turnType_1 == "забег") {
						railingSection7.position.y += 2 * h2;
						railingSection7.position.z += 40 * turnFactor;
					}
					if (turnType_2 == "забег") {
						railingSection7.position.y += 2 * h3;
						railingSection7.position.x -= 40;
					}

					if (model === "ко") {
						railingSection7.position.x += a1 - b1 - 40 + stringerThickness * 2;
						railingSection7.position.z -= stringerThickness;
						railingSection7.position.y -= 40 + 5;
						if (stairModel == "Г-образная с забегом") {
							railingSection7.position.x -= 40 + 24;
							railingSection7.position.z += (40 - 8) * turnFactor;
						}
					}
	                railing.push(railingSection7);
	                railingSectionParams.dxfBasePoint.x += M + 150;
	            }
	        }
    	} //end of drawP3Railing()
    }//end of drawP3StairCase()


    //добавляем объекты в сцену

    addObjects(viewportId, treads, 'treads');
    addObjects(viewportId, risers, 'risers');
    addObjects(viewportId, carcas, 'carcas');
    addObjects(viewportId, carcas1, 'carcas1');
    addObjects(viewportId, railing, 'railing');
    addObjects(viewportId, topFloor, 'topFloor');
    addObjects(viewportId, angles, 'angles');

} //end of drawStair
