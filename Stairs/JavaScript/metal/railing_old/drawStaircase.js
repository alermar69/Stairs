//создаем глобальные массивы
var treads = [];
var risers = [];
var carcas = [];
var railing = [];
var topFloor = [];
var angles = [];


drawStaircase = function (viewportId, isVisible) {

    var x1, x2, y1, y2, x1t, y1t, x2t, y2t;

    var stringerThickness = 8;
    var treadThickness = 40;
    var stringerWidth = 150;
    var riserThickness = 20;
    var textHeight = 30; //высота текста подписи контуров в dxf

    /*удаляем предыдущую лестницу*/
    if (treads) removeObjects(viewportId, 'treads');
    if (risers) removeObjects(viewportId, 'risers');
    if (carcas) removeObjects(viewportId, 'carcas');
    if (railing) removeObjects(viewportId, 'railing');
    if (topFloor) removeObjects(viewportId, 'topFloor');
    if (angles) removeObjects(viewportId, 'angles');

    //очищаем глобальные массивы
    treads = [];
    risers = [];
    carcas = [];
    railing = [];
    topFloor = [];
    angles = [];

    /*удаляем контуры*/
    dxfPrimitivesArr = [];

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

    /*ступени*/
    if (stairType == "рифленая сталь") treadThickness = 6;
    if (stairType == "рифленый алюминий") treadThickness = 6;
    if (stairType == "дпк") treadThickness = 20;
    if (stairType == "стекло") treadThickness = 32;

    var stairThin = (stairType == "рифленая сталь" || stairType == "рифленый алюминий" || stairType == "дпк");

    var stringerOffset_x = 0.0;
    var stringerOffset_y = 0.0;
    window.treadWidth = M - 2 * stringerThickness;
    if (model == "ко") {
        treadWidth = M;
        stringerOffset_x = a1 - b1;
        stringerOffset_y = treadThickness;
    }
    if (model == "лт") {
        stringerSideOffset = 0.0;
    }

    var riserSideOffset = 10;
    var riserHeight;
    //stringerWidth = 150;
    var dpcWidth = 145.0;

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

    var lastMarsh = false; //секция ограждения на верхнем марше
    var topConnection = false; //стыковка секции ограждения с другой секцией сверху
    var bottomConnection = false; //стыковка секции ограждения с другой секцией снизу


    /*контур нижней забежной ступени*/

    var stepWidthLow = 100;
    if (model == "ко") stepWidthLow = 50;
    var stepWidthHigh = stepWidthLow + M * Math.tan(Math.PI / 6);
    var extrudeOptions = {
        amount: treadThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var turnStepShape1 = new THREE.Shape();
    turnStepShape1.moveTo(0, 0);
    turnStepShape1.lineTo(0, M);
    turnStepShape1.lineTo(stepWidthLow, M);
    turnStepShape1.lineTo(stepWidthHigh, 0);
    turnStepShape1.lineTo(0, 0);

    /*контур средней забежной ступени*/
    var L1 = 100;
    if (model == "ко") L1 = 50;
    var L2 = M * Math.tan(Math.PI / 6);
    var turnStepShape2 = new THREE.Shape();
    turnStepShape2.moveTo(L2, 0);    //точка 0
    turnStepShape2.lineTo(M, 0); //точка 1
    turnStepShape2.lineTo(M, (M + L1 - L2)); //точка 2
    turnStepShape2.lineTo(0, (M + L1)); //точка 3
    turnStepShape2.lineTo(0, M); //точка 4
    turnStepShape2.lineTo(L2, 0); //точка 0

    var stringerExtrudeOptions = {
        amount: stringerThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };


    /** 
      Устанавливает параметры рамок под ступенями и площадками
        Рамки на площадку всегда 60х30 для всех видов ступеней
        Рамки ступени 40х20 при ширине марша до 1000мм и 60х30 если больше 1000мм
        Особенности конструктива лестниц с рифленым листом или дпк:
        кол-во перемычек рамок ступеней 3 шт если ширина марша до 1000мм и 4 шт если больше
        кол-во перемычек рамок площадок 4 шт если шарина марша до 1000мм и 5 шт если больше
     */
    function setParametersFrame(stringerParams) {
        // platformframeProfile;  // профиль рамки под площадкой
        // stairframeProfile;     // профиль рамки ступени
        // platformframeBrigeAmt; // перемычки рамки под площадкой
        // stairframeBrigeAmt;    // перемычки рамки под ступенью
        // frameOverhang;         // свес ступени над рамкой 
        // frameBotWidth;         // ширина рамки нижнего марша
        // frameTopWidth;         // ширина рамки верхнего марша

        // stringerParams.frameSideHolePosX          // расстояние к отверстию от края рамки
        // stringerParams.platformframeSideHolePosX  // расстояние к отверстию от края рамки для платформы
        // stringerParams.angleHolePosX

        // frameFlanPosX;            // расстояние до перемычки от края рамки 
        // todo: ...  несколько расстояний
        // frameFlanHolePosX;        // расстояние к отверстию в перемычке от края рамки


        stringerParams.platformframeProfile = "60x30";
        stringerParams.platformframeSideHolePosX = 55.0;
        if (stringerParams.M < 1000.0) {
            stringerParams.stairframeProfile = "40x20";
            stringerParams.frameSideHolePosX = 45.0;
        }
        else {
            stringerParams.stairframeProfile = "60x30";
            stringerParams.frameSideHolePosX = 55.0;
        }
        if (stringerParams.model == "лт") {
            if (stringerParams.stairThin) {
                stringerParams.frameOverhang = 0.0;
                stringerParams.frameWidth = stringerParams.a;
                if (stringerParams.M < 1000.0) {
                    stringerParams.platformframeBrigeAmt = 4;
                    stringerParams.stairframeBrigeAmt = 3;
                }
                else {
                    stringerParams.platformframeBrigeAmt = 5;
                    stringerParams.stairframeBrigeAmt = 4;
                }
            }
            else {
                stringerParams.frameOverhang = 20.0;
                stringerParams.frameWidth = stringerParams.a - stringerParams.frameOverhang - stringerParams.frameOverhang;
                stringerParams.stairframeBrigeAmt = 2;
                stringerParams.platformframeBrigeAmt = 2;
            }
        }
        else {
            stringerParams.frameOverhang = 0.0;
            stringerParams.frameWidth = stringerParams.b;
            stringerParams.stairframeBrigeAmt = 2;
            stringerParams.platformframeBrigeAmt = 2;
        }
    }


    /**
      Отрисовка ступеней с отверстиями
      c подступенками
      для марша
      текст для контура, количество, дополнительное смещение

      Все листы покрытия ступеней и площадок с отверстиями, совпадающими с отверстиями в перемычках рамок
      и размер листа надо сделать на 5 мм меньше длины рамки, 
      чтобы по бокам между листом и тетивой был зазор по 2,5 мм
      это на металлических ступенях. На всех остальных (деревянные, стеклянные, дпк) 
      надо сделать зазор до тетив 5 мм с каждой стороны
     */
    function drawTreads(text, stairAmt1, xadd, grouptread, groupriser) {
        var holeRad = 4.0;
        stringerParams.treadGap = 0.0;
        if (stringerParams.model === "лт") {
            stringerParams.treadGap = (stringerParams.stairType == "рифленая сталь" || stringerParams.stairType == "рифленый алюминий") ? 2.5 : 5.0;
        }

        var tread, tread2;
        var geometry;
        if (stringerParams.stairType == "дпк") {
            geometry = new THREE.BoxGeometry(dpcWidth, stringerParams.treadThickness, stringerParams.treadWidth -
                stringerParams.treadGap - stringerParams.treadGap);
            for (var i = 0; i < stairAmt1; i++) {
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = (stringerParams.h * (i + 1) - stringerParams.treadThickness / 2);
                tread.position.x = (stringerParams.b * i + dpcWidth / 2 + xadd);
                tread.position.z = stringerParams.M / 2;
                tread.castShadow = true;
                grouptread.add(tread);
                tread2 = new THREE.Mesh(geometry, treadMaterial);
                tread2.position.y = (stringerParams.h * (i + 1) - stringerParams.treadThickness / 2);
                tread2.position.x = (stringerParams.b * i + dpcWidth / 2 + 150.0 + xadd);
                tread2.position.z = stringerParams.M / 2;
                tread2.castShadow = true;
                grouptread.add(tread2);
            }

            lastPosition = { x: tread.position.x, y: tread.position.y, z: tread.position.z };
        }
        else {
            var textHeight = 30;
            var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -100 - stringerParams.M / 2);
            addText('Ступень ' + (text === '' ? '' : text + ' ') + 'марша', textHeight, dxfPrimitivesArr, textBasePoint);

            //stringerParams.dxfBasePoint.y += stringerParams.treadWidth * 0.5;

            var extrudeOptions = {
                amount: stringerParams.treadThickness,
                bevelEnabled: false,
                curveSegments: 12,
                steps: 1
            };

            // контур
            var treadShape = new THREE.Shape();

            var p0 = { "x": 0.0, "y": 0.0 };
            var p1 = newPoint_xy(p0, 0.0, -stringerParams.treadWidth * 0.5 + stringerParams.treadGap);
            var p2 = newPoint_xy(p1, stringerParams.a, 0.0);
            var p3 = newPoint_xy(p2, 0.0, stringerParams.treadWidth - stringerParams.treadGap - stringerParams.treadGap);
            var p4 = newPoint_xy(p3, -stringerParams.a, 0.0);
            addLine(treadShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
            addLine(treadShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

            // отверстия
            if (stringerParams.model === "лт" && stringerParams.stairFrame === "есть" &&
                (stringerParams.stairType == "рифленая сталь" || stringerParams.stairType == "рифленый алюминий")) {
                var holes = treadShape.holes;
                var dX, begY;
                if (stringerParams.stairframeBrigeAmt == 3) {  // 3
                    dX = 50.0;
                    begY = 45.5;
                }
                else {  // 4
                    dX = 60.0;
                    begY = 45.5;
                }
                var distY = (stringerParams.treadWidth - begY - begY) / (stringerParams.stairframeBrigeAmt - 1);
                var hole1, center1;
                for (var i = 0; i < stringerParams.stairframeBrigeAmt; i++) {
                    hole1 = new THREE.Path();
                    center1 = newPoint_xy(p4, dX, -begY + stringerParams.treadGap);
                    addCircle(hole1, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    holes.push(hole1);
                    hole1 = new THREE.Path();
                    center1 = newPoint_xy(p4, stringerParams.a - dX, -begY + stringerParams.treadGap);
                    addCircle(hole1, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
                    holes.push(hole1);
                    begY += distY;
                }
            }

            // ступени
            geometry = new THREE.ExtrudeGeometry(treadShape, extrudeOptions);
            geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            for (var i = 0; i < stairAmt1; i++) {
                var tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.x = stringerParams.b * i + xadd;
                tread.position.y = stringerParams.h * (i + 1) - stringerParams.treadThickness;
                tread.position.z = stringerParams.M / 2;
                tread.rotation.x = Math.PI * 1.5;
                tread.rotation.y = 0.0;
                tread.rotation.z = 0.0;
                tread.castShadow = true;
                grouptread.add(tread);
            }

            stringerParams.dxfBasePoint.x += stringerParams.a + stringerParams.dxfBasePointGap;
            //stringerParams.dxfBasePoint.y -= stringerParams.treadWidth * 0.5;

            lastPosition = { x: tread.position.x, y: tread.position.y + stringerParams.treadThickness / 2, z: tread.position.z };
        }

        // подступенки
        if (riserType == "есть") {
            var riserHeight = stringerParams.h - stringerParams.treadThickness;
            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (stringerParams.M - 2 * riserSideOffset));
            var riser;
            for (var i = 0; i < stringerParams.stairAmt; i++) {
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.position.y = (stringerParams.h * i + riserHeight / 2);
                riser.position.x = (stringerParams.b * (i - 1) + stringerParams.a - riserThickness / 2 + xadd);
                riser.position.z = stringerParams.M / 2;
                riser.castShadow = true;
                groupriser.add(riser);
            }
        }

        //return tread;
        return lastPosition;
    }


    /*** ПРЯМАЯ ЛЕСТНИЦА  ***/


    if (stairModel == "Прямая") {
        if (stairAmt1 < 2) {
            alert("Невозможно построить одномаршевую лестницу с количеством ступеней меньше ДВУХ");
            return;
        }
        drawStraightStaircase();
    }


    function drawStraightStaircase() {
        var group = new THREE.Object3D();     // группа
        var groupang = new THREE.Object3D();  // группа для уголков
        var grouptread = new THREE.Object3D();  // группа для ступеней
        var groupriser = new THREE.Object3D();  // группа для подмтупенков

        var lastPosition;

        var stairAmt = stairAmt1;

        var dxfBasePoint = { "x": 0.0, "y": 0.0 };

        var xadd = (model == "ко") ? 0.0 : 5.0;

        if (platformTop == "площадка") stairAmt = stairAmt1 + 1;

        stringerParams = {
            model: model,
            stringerType: stringerType,
            stringerLast: true,
            stairType: stairType,
            stairThin: stairThin,
            botEnd: "floor",
            topEnd: "floor",
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            h: h1,
            b: b1,
            a: a1,
            stairAmt: stairAmt,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointGap: 100.0,
            elmIns: {},// точки размещения уголков и рамок
        };

        setParametersFrame(stringerParams);  // параметры рамок под ступенями и площадками

        // Ступени
        //var tread = drawTreads("", stairAmt1, xadd, grouptread, groupriser);
        lastPosition = drawTreads("", stairAmt1, xadd, grouptread, groupriser);


        /*верхняя площадка*/

        if (platformTop == "площадка") {
            var halfPlatformLength = (platformLength_3 - 2 - stringerThickness - 5) / 2;
            geometry = new THREE.BoxGeometry(halfPlatformLength, treadThickness, treadWidth);
            //первая половина щита
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = (h1 * stairAmt - treadThickness / 2);
            tread.position.x = (b1 * (stairAmt - 1) + halfPlatformLength / 2) + 5;
            tread.position.z = M / 2;
            tread.castShadow = true;
            treads.push(tread);
            //вторая половина щита
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = (h1 * stairAmt - treadThickness / 2);
            tread.position.x = (b1 * (stairAmt - 1) + platformLength_3 / 2 + halfPlatformLength / 2) + 2;
            tread.position.z = M / 2;
            tread.castShadow = true;
            treads.push(tread);
        }

        /*верхнее перекрытие*/

        if (platformTop != "площадка") {
            var topStepWidth = a1 + 5.0;
            if (params.model == "ко") topStepWidth = a1;
            if (topFlan == "есть") topStepWidth += 8;
            if (params.topAnglePosition == "вертикальная рамка") {
                topStepWidth = b1 + 80;
                if (params.model == "ко") topStepWidth = a1 + 40;
            }

            geometry = new THREE.BoxGeometry(M, 300, M);
            floorTop = new THREE.Mesh(geometry, floorMaterial);
            floorTop.castShadow = true;
            if (topStairType == "ниже") floorTop.position.y = lastPosition.y + h1 - 150 + treadThickness / 2;
            if (topStairType == "вровень") floorTop.position.y = lastPosition.y - 150 + treadThickness / 2;
            floorTop.position.x = b1 * (stairAmt - 1) + topStepWidth + M / 2;
            if (stairType == "дпк") floorTop.position.x = b1 * (stairAmt - 1) + dpcWidth * 2 + 15 + M / 2;
            floorTop.position.z = lastPosition.z;
            topFloor.push(floorTop);  //scene.add()
        }


        /***  КАРКАС ПРЯМОЙ ЛЕСТНИЦЫ  ***/


        drawStrightStringers();

        function drawStrightStringers() {

            if (platformTop == "площадка") {
                stringerParams.topEnd = "platformG";
                stringerParams.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams.topEndLength = b1;
                stringerParams.platformLength = params.platformLength_3;
            }
            //stringerParams.topEndLength = 1000;
            // console.log(params.platformLength_3, stringerParams.topEndLength);

            /*левая тетива/косоур*/

            stringerParams.key = "out";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);

            var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = stringerSideOffset;
            stringer1.castShadow = true;
            carcas.push(stringer1);  //scene.add()

            //сохраняем позицию косоура
            stringerParams.stringer1_pos = stringer1.position;


            /*правая тетива/косоур*/

            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = ((M - stringerThickness) - stringerSideOffset);
            stringer2.castShadow = true;
            carcas.push(stringer2);  //scene.add()

            /*верхняя площадка*/

            if (platformTop == "площадка") {
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams, flanMaterial, group);
                    flanSide.position.x += stringerParams.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams, flanMaterial, group);
                    flanSide.position.x += stringerParams.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + params.platformLength_3 - stringerSideOffset,
                        y: h1 * (stairAmt1 + 1) - treadThickness,
                        z: stringerSideOffset + stringerThickness
                    };
                    drawRearStringerKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (params.platformLength_3 - stringerSideOffset - b1 - (a1 - b1));
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    
                    drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + params.platformLength_3 + 5,
                        y: h1 * (stairAmt1 + 1) + 5.0,
                        z: 0.0
                    };
                    drawRearStringer(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
            }

        }// end of drawStrightStringers


        /*** УГОЛКИ МАРША ПРЯМОЙ ЛЕСТНИЦЫ ***/


        drawStraightAngles();

        function drawStraightAngles() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.castShadow = true;
            groupang.add(angleB);

            angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }

            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = (M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            groupang.add(angleB);

            // уголки/рамки под ступенями
            var ii;
            var frame;
            if (stairFrame == "есть") {
                var frameParams = {};
                frameParams.length = ((M - stringerThickness - stringerThickness) - stringerSideOffset - stringerSideOffset);
                frameParams.material = metalMaterial2;
                frameParams.dxfBasePoint = { x: -300, y: 0 };
                // рамки
                for (ii = 0; ii < stringerParams.elmIns["out"].frames.length; ii++) {
                    frameParams.width = stringerParams.elmIns["out"].frames[ii].width;
                    frameParams.profile = stringerParams.elmIns["out"].frames[ii].profile;
                    frameParams.brigeAmt = stringerParams.elmIns["out"].frames[ii].brigeAmt;
                    frame = drawTreadFrame(frameParams);
                    frame.position.x = stringerParams.elmIns["out"].frames[ii].x;
                    frame.position.y = stringerParams.elmIns["out"].frames[ii].y;
                    frame.position.z = stringerThickness + stringerSideOffset;
                    groupang.add(frame);
                    frameParams.dxfBasePoint.x -= 300.0;
                }
            }
            else {
                if (params.model == "лт") {
                    // уголки крепления ступеней
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                    }

                    // перемычки
                    for (ii = 0; ii < stringerParams.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams, stringerParams.elmIns["out"].briges[ii], group, groupang);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            if (stringerParams.divide !== 0) {
                drawFlanConcatAngles(stringerParams, flanMaterial, group, groupang);
            }

            // верхние уголки
            if (platformTop != "площадка") {
                var topAnglePosition = params.topAnglePosition;
                if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
                    var angleU = drawAngleSupport("У4-70х70х100");
                    angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                    angleU.position.y = stringerParams.elmIns["out"].angleU[0].y;
                    angleU.position.z = (stringerThickness + stringerSideOffset);
                    angleU.rotation.x = 0.0;
                    angleU.rotation.y = 0.0;
                    angleU.rotation.z = Math.PI * 0.5;
                    angleU.castShadow = true;
                    groupang.add(angleU);
                    angleU = drawAngleSupport("У4-70х70х100");
                    angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                    angleU.position.y = stringerParams.elmIns["out"].angleU[0].y + 100.0;
                    angleU.position.z = ((M - stringerThickness) - stringerSideOffset);
                    angleU.rotation.x = Math.PI;
                    angleU.rotation.y = 0.0;
                    angleU.rotation.z = Math.PI * 0.5;
                    angleU.castShadow = true;
                    groupang.add(angleU);
                }
                if (topAnglePosition == "вертикальная рамка") {
                    var topUnitBasePoint = {
                        x: stairAmt1 * b1,
                        y: stairAmt1 * h1,
                        z: 0,
                        rotationY: 0,
                    };
                    if (params.model == "лт") topUnitBasePoint.x = topUnitBasePoint.x - 5;
                    console.log(topUnitBasePoint.x);
                    var unitParams = {
                        basepoint: topUnitBasePoint,
                        width: M - 2 * stringerThickness,
                        height: 200,
                        stringerSideOffset: stringerSideOffset,
                        model: stringerParams.model,
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

                    var topFixUnit = drawTopFixFrameUnit(unitParams);
                    groupang.add(topFixUnit.frame);
                    treads.push(topFixUnit.tread);
                    risers.push(topFixUnit.riser);
                }
                /*верхний фланец (только для ЛТ)*/
                if (topFlan == "есть") {
                    var firstPosition_x = (stairAmt1 - 1) * b1 + a1 + 5;
                    var firstPosition_y = stairAmt1 * h1;
                    var firstPosition_z = 0;
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
                    groupang.add(flan);

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    flan2.position.y = firstPosition_y + h1 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan2.position.y = firstPosition_y;
                    flan2.position.z = stringerParams.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI * 0.5;
                    groupang.add(flan2);
                }
            }
            // позиция группы
            group.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, 0.0);
            groupang.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, 0.0);
            grouptread.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, 0.0);
            groupriser.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, 0.0);
            carcas.push(group);
            angles.push(groupang);
            treads.push(grouptread);
            risers.push(groupriser);
        }//end of drawStraightAngles()


        /***  ОГРАЖДЕНИЯ ПРЯМОЙ ЛЕСТНИЦЫ  ***/


        //drawStraightRailing();

        drawStraightRailing();


        function drawStraightRailing() {

            var railingSectionParams = {
                bottomEnd: "нет",
                platformLengthBottom: 0,
                topEnd: platformTop,
                platformLengthTop: platformLength_3,
                railingSide: "right",
                stairAmt: stairAmt,
                h1: h1,
                b1: b1,
                a1: a1,
                h2: h2,
                scale: scale,
                lastMarsh: true,
                topConnection: false,
                bottomConnection: false,
                rigelAmt: params.rigelAmt,
                racks: stringerParams.elmIns["out"].racks,
                dxfBasePoint: dxfBasePoint,
                handrail: handrail,
                textHeight: textHeight,
                stringerSideOffset: stringerSideOffset,
                model: model
            }

            if (model === "лт") railingSectionParams.stringerSideOffset = 0;

            var railingSectionFunction = function () { };
            if (railingModel === "Ригели" || railingModel === "Стекло на стойках") {
                railingSectionFunction = drawRailingSectionNewel;
            }

            var railingPositionZ = M * turnFactor;
            //правая сторона
            var railingSection2;
            if (railingSide_1 === "внешнее" || railingSide_1 === "две") {
                railingSection2 = railingSectionFunction(railingSectionParams);
                railingSection2.position.z = railingPositionZ * scale;
                railing.push(railingSection2);
            }
            //левая сторона
            if (railingSide_1 === "внутреннее" || railingSide_1 === "две") {
                railingSectionParams.railingSide = "left";
                railingPositionZ = -40 * turnFactor;
                railingSection2 = railingSectionFunction(railingSectionParams);
                railingSection2.position.z = railingPositionZ * scale;
                railing.push(railingSection2);
            }

            /*заднее ограждение верхней площадки*/
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
        }//end of drawStraightRailing()

    }//end of drawStraightStairCase()


    /***   Г-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


    if (stairModel == "Г-образная с площадкой" || stairModel == "Г-образная с забегом") {
        drawGStaircase();
    }

    function drawGStaircase() {
        var group = new THREE.Object3D();     // группа
        var groupang = new THREE.Object3D();  // группа для уголков
        var grouptread = new THREE.Object3D();  // группа для ступеней
        var groupriser = new THREE.Object3D();  // группа для подмтупенков

        var lastPosition;

        //        var stairAmt = stairAmt1;

        var xadd = (model == "ко") ? 0.0 : 5.0;

        var dxfBasePoint = { "x": 0.0, "y": 0.0 };

        //        /*ступени нижний марш*/
        //
        //        if (stairType != "дпк") {
        //        var geometry = new THREE.BoxGeometry(a1, treadThickness, treadWidth);
        //        var tread;
        //        var x0 = a1 / 2;
        //        var y0 = -treadThickness / 2;
        //        var z0 = M / 2 * turnFactor;
        //        for (var i = 0; i < stairAmt1; i++) {
        //            tread = new THREE.Mesh(geometry, treadMaterial);
        //            tread.position.y = y0 + h1 * (i + 1);
        //            tread.position.x = x0 + (b1 * i + xadd);
        //            tread.position.z = z0;
        //            tread.castShadow = true;
        //            treads.push(tread);
        //            }
        //        }
        //
        //        if(stairType == "дпк") {
        //            geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
        //            var tread;
        //            for (var i = 0; i < stairAmt1; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = (h1 * (i + 1) - treadThickness / 2);
        //                tread.position.x = (b1 * i + dpcWidth / 2 + xadd);
        //                tread.position.z = M / 2 * turnFactor;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //            var tread2;
        //            for (var i = 0; i < stairAmt1; i++) {
        //                tread2 = new THREE.Mesh(geometry, treadMaterial);
        //                tread2.position.y = (h1 * (i + 1) - treadThickness / 2);
        //                tread2.position.x = (b1 * i + dpcWidth / 2 + 150.0 + xadd);
        //                tread2.position.z = M / 2 * turnFactor;
        //                tread2.castShadow = true;
        //                treads.push(tread2);
        //            }
        //        }
        //
        //        /*подступенки нижний марш*/
        //        if (riserType == "есть") {
        //            riserHeight = h1 - treadThickness;
        //            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));
        //
        //            var riser;
        //            for (var i = 0; i < stairAmt1 + 1; i++) {
        //                riser = new THREE.Mesh(geometry, treadMaterial);
        //                riser.position.y = (h1 * i + riserHeight / 2);
        //                riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2 + xadd);
        //                riser.position.z = M / 2 * turnFactor;
        //                riser.castShadow = true;
        //                risers.push(riser);
        //            }
        //        }

        stringerParams = {};

        if (platformTop == "площадка") stairAmt = stairAmt1 + 1;

        stringerParams = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            stairThin: stairThin,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "platformG",
            topEndLength: tyrnLength,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            h: h1,
            b: b1,
            a: a1,
            stairAmt: stairAmt1 + 1,
            topFlan: topFlan,
            stairFrame: stairFrame,
            bridgeThickness: 8.0,
            topAnglePosition: params.topAnglePosition,
            bottomAngleType: params.bottomAngleType,
            botFloorType: params.botFloorType,
            botFloorsDist: params.botFloorsDist,
            dxfBasePoint: dxfBasePoint,
            dxfBasePointGap: 100.0,
            elmIns: {},// точки размещения уголков и рамок
        };

        setParametersFrame(stringerParams);  // параметры рамок под ступенями и площадками

        // Ступени
        lastPosition = drawTreads("нижнего", stairAmt1, xadd, grouptread, groupriser);



        if (stairModel == "Г-образная с площадкой") {
            if (stairAmt1 == 0) {
                x0 = -b1;
                y0 = y0;
            }
            else {
                x0 = lastPosition.x - a1 / 2;
                y0 = lastPosition.y;
            }
            z0 = M * turnFactor;

            var platformLength;
            if (model == "ко") {
                platformLength = M + 50.0;
            }
            else if (model == "лт") {
                platformLength = M - stringerThickness + 30.0;
            }

            // Площадка
            if (stairType != "дпк") {
                var halfPlatformLength = (platformLength - 2) / 2;
                if (model == "лт") halfPlatformLength = halfPlatformLength - 2;
                geometry = new THREE.BoxGeometry(halfPlatformLength, treadThickness, treadWidth);
                //первая половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = h1 + y0;
                tread.position.x = b1 + x0 + M / 2 - (M - halfPlatformLength) / 2;
                tread.position.z = M / 2 * turnFactor;
                tread.castShadow = true;
                treads.push(tread);
                //вторя половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = h1 + y0;
                tread.position.x = b1 + x0 + M / 2 - (M - halfPlatformLength) / 2 + platformLength / 2 + 2;
                if (model == "лт") tread.position.x = tread.position.x - 2;
                tread.position.z = M / 2 * turnFactor;
                tread.castShadow = true;
                treads.push(tread);
            }
            if (stairType == "дпк") {
                x0 = stairAmt1 * b1 + dpcWidth / 2 + xadd;
                geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
                var deckAmt = Math.floor(platformLength / (dpcWidth + 5));
                var tread;
                for (var i = 0; i < deckAmt; i++) {
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = h1 + y0;
                    tread.position.x = x0 + i * (dpcWidth + 5);
                    tread.position.z = M / 2 * turnFactor;
                    tread.castShadow = true;
                    treads.push(tread);
                }
                //последняя урезанная доска
                var lastDeckWidth = platformLength - deckAmt * (dpcWidth + 5) - 5;
                if (lastDeckWidth) {
                    console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми");
                    geometry = new THREE.BoxGeometry(lastDeckWidth, treadThickness, treadWidth);
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = h1 + y0;
                    tread.position.x = x0 + deckAmt * (dpcWidth + 5) + (lastDeckWidth - dpcWidth) / 2;
                    tread.position.z = M / 2 * turnFactor;
                    tread.castShadow = true;
                    treads.push(tread);
                }

            }
            y0 = tread.position.y;
            z0 = M * turnFactor;

            //смещаем верхний марш
            if (model == "ко") {
                // x0 = tread.position.x + 25.0;
                z0 = z0 - (a3 - b3) * turnFactor;
            }
            else {
                // x0 = tread.position.x + 15.0;
                z0 = z0 - (40.0 - 5.0) * turnFactor;
                //x0 = x0 + stringerThickness / 2;
            }
            if (model == "лт" && stairAmt3 == 0) z0 = M * turnFactor - (a3 - b3) * turnFactor;
        }
        // уровень площадки
        var platformH = y0 + treadThickness / 2.0;

        if (stairModel == "Г-образная с забегом") {
            if (stairAmt1 == 0) {
                x0 = -b1;
                y0 = y0;
            }
            else {
                x0 = tread.position.x - a1 / 2;
                y0 = tread.position.y;
            }
            z0 = 0;

            /*первая забежная ступень*/

            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep1 = new THREE.Mesh(geom, treadMaterial);
            turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep1.position.x = b1 + x0;
            turnStep1.position.y = treadThickness / 2 * turnFactor + h1 + y0;
            turnStep1.position.z = z0;
            turnStep1.castShadow = true;
            treads.push(turnStep1);

            /*вторая забежная ступень*/

            geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep2 = new THREE.Mesh(geom, treadMaterial);
            turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep2.position.x = b1 + x0;
            turnStep2.position.y = (h1 + h3) + y0 + treadThickness / 2 * turnFactor;
            turnStep2.position.z = 0;
            turnStep2.castShadow = true;
            treads.push(turnStep2);


            /*третья забежная ступень*/

            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep3 = new THREE.Mesh(geom, treadMaterial);
            turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
            turnStep3.rotation.z = 0.5 * Math.PI;
            turnStep3.position.x = b1 + M + x0;
            turnStep3.position.y = -treadThickness / 2 * turnFactor + (h1 + h3 * 2) + y0;
            turnStep3.position.z = M * turnFactor + stepWidthLow * turnFactor;
            turnStep3.castShadow = true;
            treads.push(turnStep3);

            /*подступенок второй забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6);
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 6 * turnFactor;
                riser.position.y = y0 + riserHeight / 2 + treadThickness / 2 + h1;
                riser.position.x = b1 + x0 + (L1 + L2 / 2) - riserThickness / 2;
                riser.position.z = M / 2 * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }


            //опорные точки для верхнего марша
            x0 = x0 + b1 + M / 2;
            y0 = (stairAmt1 + 1) * h1 + 2 * h3 - treadThickness / 2;
            z0 = M * turnFactor;

            /*подступенок третьей забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6);
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 3 * turnFactor;
                riser.position.y = y0 - riserHeight / 2 - treadThickness / 2; // + h1;
                riser.position.x = x0; //+ (L1 + L2) - riserThickness/2;
                riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * turnFactor;
                riser.castShadow = true;
                risers.push(riser);

            }

            //смещаем верхний марш
            if (model == "ко") z0 = z0 + (L1 - (a3 - b3)) * turnFactor;
            if (model == "лт" && stairAmt3 == 0) z0 = (M + L1 - (a3 - b3)) * turnFactor;
        }


        //        /*верхний марш*/
        //        if(stairType != "дпк") {
        //            //корректируем привязку верхнего марша
        //            x0 = stairAmt1 * b1 + M/2 + 5 + 30;
        //            if(model == "ко") x0 = x0 + 15;
        //
        //            geometry = new THREE.BoxGeometry(treadWidth, treadThickness, a3);
        //            for (var i = 0; i < stairAmt3; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = y0 + h3 * (i + 1);
        //                tread.position.x = x0;
        //                tread.position.z = z0 + (b3 * i + a3 / 2) * turnFactor;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //        }
        //        if(stairType == "дпк") {
        //        //корректируем привязку верхнего марша
        //            x0 = stairAmt1 * b1 + M/2 + 5 + 30;
        //
        //
        //            geometry = new THREE.BoxGeometry(treadWidth, treadThickness, dpcWidth);
        //            var tread;
        //            for (var i = 0; i < stairAmt3; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = y0 + h3 * (i + 1);
        //                tread.position.x = x0;
        //                tread.position.z = z0 + (b3 * i + dpcWidth / 2 + xadd) * turnFactor;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //            var tread2;
        //            for (var i = 0; i < stairAmt3; i++) {
        //                tread2 = new THREE.Mesh(geometry, treadMaterial);
        //                tread2.position.y = y0 + h3 * (i + 1);
        //                tread2.position.x = x0;
        //                tread2.position.z = z0 + (b3 * i + dpcWidth / 2 + 150.0 + xadd) * turnFactor;
        //                tread2.castShadow = true;
        //                treads.push(tread2);
        //            }
        //        }


        if (stairModel == "Г-образная с площадкой") {
            stringerTurn = "площадка";
            tyrnLength = M;
        }
        if (stairModel == "Г-образная с забегом") {
            stringerTurn = "забег";
            tyrnLength = M;
        }



        /***  КОСОУРЫ Г-ОБРАЗНАЯ НИЖНИЙ МАРШ   ***/


        drawGStringers1();

        function drawGStringers1() {

            if (params.model == "лт") stringerParams.topEndLength = platformLength + 15.0;
            if (params.model == "ко") stringerParams.topEndLength = b1;



            /*внешняя тетива/косоур нижнего марша*/

            stringerParams.key = "out";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
            stringer1.castShadow = true;
            carcas.push(stringer1);

            //сохраняем позицию косоура
            stringerParams.stringer1_pos = stringer1.position;

            /*внутренняя тетива/косоур нижнего марша*/

            stringerParams.key = "in";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = (M - stringerSideOffset - stringerThickness * (1 + turnFactor) * 0.5) * turnFactor;
            stringer2.castShadow = true;
            carcas.push(stringer2);

            /*промежуточная площадка*/

            if (model == "ко") {
                //левый соединительный фланец
                var flanSide = drawFlanSideConcat("left", stringerParams, flanMaterial, group);
                flanSide.position.x += stringerParams.flanSidePointInsert.x;
                flanSide.position.y += stringerParams.flanSidePointInsert.y;
                flanSide.position.z += stringerSideOffset + stringerThickness;

                //правый соединительный фланец
                flanSide = drawFlanSideConcat("right", stringerParams, flanMaterial, group);
                flanSide.position.x += stringerParams.flanSidePointInsert.x;
                flanSide.position.y += stringerParams.flanSidePointInsert.y;
                flanSide.position.z += M - stringerSideOffset - stringerThickness;

                //задняя тетива площадки
                p0 = {
                    x: b1 * stairAmt1 + platformLength - stringerSideOffset,
                    y: h1 * (stairAmt1 + 1) - treadThickness,
                    z: stringerSideOffset + stringerThickness
                };
                drawRearStringerKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                //уголки добавляются внутри функции drawRearStringerKo

                p0.x -= (platformLength - stringerSideOffset - b1 - (a1 - b1));
                p0.z -= stringerThickness;

                //боковые тетивы площадки
                stringerParams.platformLength = platformLength;
                drawSideStringerKo("in", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
            }
            if (model == "лт") {
                // задняя тетива площадки
                p0 = {
                    x: b1 * stairAmt1 + platformLength + 5.0 + stringerThickness,
                    y: h1 * (stairAmt1 + 1) + 5.0,
                    z: 0.0
                };
                drawRearStringer(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
            }

        } // end of drawGStringers1()



        /*** УГОЛКИ Г-ОБРАЗНАЯ НИЖНИЙ МАРШ ***/


        drawGAngles1();

        function drawGAngles1() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = 0.0;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            groupang.add(angleB);
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = (M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            groupang.add(angleB);

            // фланец крепления частей разделённой тетивы или косоура нижний марш
            if (stringerParams.divide !== 0) {
                drawFlanConcatAngles(stringerParams, flanMaterial, group, groupang);
            }

            // уголки/рамки под ступенями нижний марш
            var ii;
            var frame;
            if (stairFrame == "есть") {
                var frameParams = {};
                frameParams.length = ((M - stringerThickness - stringerThickness) - stringerSideOffset - stringerSideOffset);
                frameParams.material = metalMaterial2;
                frameParams.dxfBasePoint = { x: -300, y: 0 };
                // рамки нижний марш
                for (ii = 0; ii < stringerParams.elmIns["out"].frames.length; ii++) {
                    frameParams.width = stringerParams.elmIns["out"].frames[ii].width;
                    frameParams.profile = stringerParams.elmIns["out"].frames[ii].profile;
                    frameParams.brigeAmt = stringerParams.elmIns["out"].frames[ii].brigeAmt;
                    frame = drawTreadFrame(frameParams);
                    frame.position.x = stringerParams.elmIns["out"].frames[ii].x;
                    frame.position.y = stringerParams.elmIns["out"].frames[ii].y;
                    frame.position.z = stringerThickness + stringerSideOffset;
                    groupang.add(frame);
                    frameParams.dxfBasePoint.x -= 300.0;
                }
            }
            else {
                if (stringerParams.model == "лт") {
                    // уголки крепления ступеней нижний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                    }

                    // перемычки нижний марш
                    for (ii = 0; ii < stringerParams.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams, stringerParams.elmIns["out"].briges[ii], group, groupang);
                    }

                    // дополнительные уголки на перемычке под площадкой
                    // уголки крепления ступени
                    var p0 = stringerParams.elmIns["out"].briges[ii - 1];
                    var angle1 = drawAngleSupport("У2-40х40х200");
                    angle1.position.x = p0.x;
                    angle1.position.y = p0.y;
                    angle1.position.z = stringerThickness + 105.0;
                    angle1.rotation.x = Math.PI * 0.5;
                    angle1.rotation.y = 0.0;
                    angle1.rotation.z = Math.PI * 0.5;
                    angle1.castShadow = true;
                    groupang.add(angle1);
                    angle1 = drawAngleSupport("У2-40х40х200");
                    angle1.position.x = p0.x;
                    angle1.position.y = p0.y;
                    angle1.position.z = stringerThickness + treadWidth - 200.0 - 105.0;
                    angle1.rotation.x = Math.PI * 0.5;
                    angle1.rotation.y = 0.0;
                    angle1.rotation.z = Math.PI * 0.5;
                    angle1.castShadow = true;
                    groupang.add(angle1);
                }
            }
        }//end of drawGAngles()

        // позиция группы
        var shifta = turnFactor < 0 ? -stringerParams.M : 0.0;
        group.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        groupang.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        grouptread.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        groupriser.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        carcas.push(group);
        angles.push(groupang);
        treads.push(grouptread);
        risers.push(groupriser);


        group = new THREE.Object3D();       // группа поворота
        groupang = new THREE.Object3D();    // группа поворота для уголков
        grouptread = new THREE.Object3D();  // группа для ступеней
        groupriser = new THREE.Object3D();  // группа для подмтупенков


        /*** КОСОУРЫ Г-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/


        stringerParams.stringerLast = true;
        stringerParams.botEnd = "platformG";
        stringerParams.topEnd = "floor";
        stringerParams.stairAmt = stairAmt3;
        stringerParams.h = h3;
        stringerParams.b = b3;
        stringerParams.a = a3;

        setParametersFrame(stringerParams);  // параметры рамок под ступенями и площадками

        // Ступени
        lastPosition = drawTreads("верхнего", stairAmt3, xadd, grouptread, groupriser);




        if (platformTop == "площадка") stairAmt3 = stairAmt3 + 1;

        //базовая точка для верхней площадки
        if (stairAmt3 == 0) {
            platform_x = x0;
            platform_y = y0;
            platform_z = z0 + ((a3 - b3) - a3 / 2) * turnFactor;
        }
        else {
            platform_x = lastPosition.x;
            platform_y = lastPosition.y + h3;
            platform_z = lastPosition.z + b3 * turnFactor;
        }

        //        /*подступенки верхний марш*/
        //        if (riserType == "есть") {
        //            riserHeight = h3 - treadThickness;
        //            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));
        //
        //            var riser;
        //            for (var i = 0; i < stairAmt3; i++) {
        //                riser = new THREE.Mesh(geometry, treadMaterial);
        //                riser.rotation.y = -0.5 * Math.PI;
        //                riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness / 2);
        //                riser.position.x = x0 + xadd;
        //                riser.position.z = z0 + (b3 * (i - 1) + a3 - riserThickness / 2) * turnFactor;
        //                riser.castShadow = true;
        //                risers.push(riser);
        //            }
        //        }


        /*верхняя площадка*/

        if (platformTop == "площадка") {
            if (stairType != "дпк") {
                var topPlatformLength = platformLength_3;
                if (params.model == "лт") topPlatformLength = topPlatformLength - stringerThickness - 10;
                var halfPlatformLength = (topPlatformLength - 2) / 2;
                geometry = new THREE.BoxGeometry(treadWidth, treadThickness, halfPlatformLength);
                //первая половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = platform_y;
                tread.position.x = platform_x;
                tread.position.z = platform_z + (halfPlatformLength - a3) / 2 * turnFactor;
                tread.castShadow = true;
                //treads.push(tread);
                grouptread.add(tread);
                //вторая половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = platform_y;
                tread.position.x = platform_x;
                tread.position.z = platform_z + (halfPlatformLength - a3 + topPlatformLength + 4) / 2 * turnFactor;
                tread.castShadow = true;
                //treads.push(tread);
                grouptread.add(tread);
            }
            if (stairType == "дпк") {
                geometry = new THREE.BoxGeometry(treadWidth, treadThickness, dpcWidth);
                var deckAmt = Math.floor(platformLength_3 / (dpcWidth + 5));
                var tread;
                console.log(deckAmt);
                for (var i = 0; i < deckAmt; i++) {
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = platform_y;
                    tread.position.x = platform_x;
                    tread.position.z = platform_z + i * (dpcWidth + 5) * turnFactor;
                    tread.castShadow = true;
                    //treads.push(tread);
                    grouptread.add(tread);
                }
                //последняя урезанная доска
                var lastDeckWidth = platformLength_3 - deckAmt * (dpcWidth + 5) - 15 - stringerThickness;
                if (lastDeckWidth) {
                    console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми");
                    geometry = new THREE.BoxGeometry(treadWidth, treadThickness, lastDeckWidth);
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = platform_y;
                    tread.position.x = platform_x;
                    tread.position.z = platform_z + (deckAmt * (dpcWidth + 5) + (lastDeckWidth - dpcWidth) / 2) * turnFactor;
                    tread.castShadow = true;
                    //treads.push(tread);
                    grouptread.add(tread);
                }

            }
        }

        /*верхнее перекрытие*/

        if (platformTop != "площадка") {

            if (stairType == "дпк") platform_z = platform_z + dpcWidth / 2 * turnFactor;
            geometry = new THREE.BoxGeometry(M, 300, M);
            floorTop = new THREE.Mesh(geometry, floorMaterial);
            floorTop.castShadow = true;
            if (topStairType == "ниже") floorTop.position.y = platform_y - 150 + treadThickness / 2;
            if (topStairType == "вровень") floorTop.position.y = platform_y - h3 - 150 + treadThickness / 2;
            floorTop.position.x = platform_x;
            floorTop.position.z = platform_z + (a3 + M - b3 * 2) / 2 * turnFactor;
            if (topFlan == "есть") floorTop.position.z += 8;

            if (params.topAnglePosition == "вертикальная рамка") {
                floorTop.position.z = floorTop.position.z + 40 * turnFactor;
                if (params.model == "лт") floorTop.position.z = floorTop.position.z - 5 * turnFactor;
            }
            topFloor.push(floorTop);
        }




        drawGStringers3();

        function drawGStringers3() {

            if (platformTop == "площадка") {
                stringerParams.topEnd = "platformG";
                stringerParams.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams.topEndLength = b3;
            }

            //        if (params.model == "лт") stringerParams.botEndLength = platformLength + 15.0;
            //        if (params.model == "ко") stringerParams.botEndLength = stringerSideOffset;

            /*внешняя тетива/косоур верхнего марша*/

            stringerParams.key = "out";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            if (stairModel == "Г-образная с площадкой") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer3 = new THREE.Mesh(geom, stringerMaterial);
                stringer3.position.set(0.0, 0.0, stringerSideOffset);
                stringer3.castShadow = true;
                group.add(stringer3);
            }
            if (stairModel == "Г-образная с забегом") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer3 = new THREE.Mesh(geom, stringerMaterial);
                stringer3.rotation.y = -0.5 * Math.PI * turnFactor;
                stringer3.position.x = b1 * stairAmt1 + M - stringerSideOffset;
                stringer3.position.y = h1 * (stairAmt1 + 1) + h3 - Math.max(h1, h3);
                stringer3.position.z = (M - 111.0) * turnFactor;
                stringer3.castShadow = true;
                carcas.push(stringer3);
            }

            /*внутренняя тетива/косоур верхнего марша*/

            stringerParams.key = "in";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            if (stairModel == "Г-образная с площадкой") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer4 = new THREE.Mesh(geom, stringerMaterial);
                stringer4.position.set(0.0, 0.0, M - stringerThickness - stringerSideOffset);
                stringer4.castShadow = true;
                group.add(stringer4);
            }
            if (stairModel == "Г-образная с забегом") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer4 = new THREE.Mesh(geom, stringerMaterial);
                stringer4.rotation.y = -0.5 * Math.PI * turnFactor;
                stringer4.position.x = b1 * stairAmt1 + stringerSideOffset + stringerThickness;
                stringer4.position.y = h1 * (stairAmt1 + 1) - h3;
                stringer4.position.z = (M - 111.0) * turnFactor;
                stringer4.castShadow = true;
                carcas.push(stringer4);
            }

            /*верхняя площадка*/

            if (platformTop == "площадка") {
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams, flanMaterial, group);
                    flanSide.position.x += stringerParams.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams, flanMaterial, group);
                    flanSide.position.x += stringerParams.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b3 * (stairAmt3 - 1) + params.platformLength_3,
                        y: h3 * (stairAmt3) - treadThickness + 200 - 10,
                        z: stringerSideOffset + stringerThickness
                    };
                    drawRearStringerKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    p0.x -= (params.platformLength_3 - stringerSideOffset - b3 - (a3 - b3));
                    p0.z -= stringerThickness;

                    //боковые тетивы площадки
                    stringerParams.platformLength = params.platformLength_3;
                    drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = {
                        x: b3 * (stairAmt3 - 1) + params.platformLength_3 - stringerThickness - 27.0,
                        y: h3 * (stairAmt3),
                        z: 0.0
                    };
                    drawRearStringer(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
            }

        } //end of drawGStringers3()


        /*** УГОЛКИ Г-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/


        drawGAngles3();

        function drawGAngles3() {
            // уголки крепления к нижнему маршу (площадке)
            var angleB = drawAngleSupport("У4-60х60х100");
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = 0.0;
            angleB.rotation.z = Math.PI * 1.5;
            angleB.castShadow = true;
            groupang.add(angleB);
            angleB = drawAngleSupport("У4-60х60х100");
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y - 100.0;
            angleB.position.z = (M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = Math.PI * 0.5;
            angleB.castShadow = true;
            groupang.add(angleB);

            // уголки/рамки под ступенями верхний марш
            var ii;
            var frame;
            if (stairFrame == "есть") {
                var frameParams = {};
                frameParams.length = ((M - stringerThickness - stringerThickness) - stringerSideOffset - stringerSideOffset);
                frameParams.material = metalMaterial2;
                frameParams.dxfBasePoint = { x: -300, y: 700.0 };
                // рамки верхний марш
                for (ii = 0; ii < stringerParams.elmIns["out"].frames.length; ii++) {
                    frameParams.width = stringerParams.elmIns["out"].frames[ii].width;
                    frameParams.profile = stringerParams.elmIns["out"].frames[ii].profile;
                    frameParams.brigeAmt = stringerParams.elmIns["out"].frames[ii].brigeAmt;
                    frame = drawTreadFrame(frameParams);
                    frame.position.x = stringerParams.elmIns["out"].frames[ii].x;
                    frame.position.y = stringerParams.elmIns["out"].frames[ii].y;
                    frame.position.z = stringerThickness + stringerSideOffset;
                    groupang.add(frame);
                    frameParams.dxfBasePoint.x -= 300.0;
                }
            }
            else {
                if (stringerParams.model == "лт") {
                    // уголки крепления ступеней верхний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                    }

                    // перемычки верхний марш
                    for (ii = 0; ii < stringerParams.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams, stringerParams.elmIns["out"].briges[ii], group, groupang);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            // верхний марш
            if (stringerParams.divide !== 0) {
                drawFlanConcatAngles(stringerParams, flanMaterial, group, groupang);
            }

            // верхние уголки
            if (platformTop != "площадка") {
                var topAnglePosition = params.topAnglePosition;
                if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
                    if (stringerParams.elmIns["out"].angleU[0] !== undefined) {
                        var angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams.elmIns["out"].angleU[0].y;
                        angleU.position.z = (stringerThickness + stringerSideOffset);
                        angleU.rotation.x = 0.0;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        groupang.add(angleU);
                        angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams.elmIns["out"].angleU[0].y + 100.0;
                        angleU.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angleU.rotation.x = Math.PI;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        groupang.add(angleU);
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
                    console.log(topUnitBasePoint.x);
                    var unitParams = {
                        basepoint: topUnitBasePoint,
                        width: M - 2 * stringerThickness,
                        height: 200,
                        stringerSideOffset: stringerSideOffset,
                        model: stringerParams.model,
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
                    if (params.model == "лт") complexUnit.position.x = stairAmt1 * b1 + 26 + stringerThickness + M;
                    if (params.model == "ко") complexUnit.position.x = stairAmt1 * b1 + 50 + M;
                    if (turnFactor == -1) complexUnit.position.x = complexUnit.position.x - M;
                    complexUnit.position.y = (stairAmt1 + 1) * h1 + stairAmt3 * h3;
                    complexUnit.position.z = (stairAmt3 * b3 + M - (a3 - b3)) * turnFactor;
                    complexUnit.rotation.y = -Math.PI / 2 * turnFactor;
                    angles.push(complexUnit);
                }
                /*верхний фланец (только для ЛТ)  */
                if (topFlan == "есть") {
                    var firstPosition_x = (params.stairAmt3 - 1) * b3 + a3 - 35;
                    var firstPosition_y = params.stairAmt3 * h3 - 5;
                    var firstPosition_z = 0;
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
                    console.log(flan.position);
                    groupang.add(flan);

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    flan2.position.y = firstPosition_y + h3 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan2.position.y = firstPosition_y;
                    flan2.position.z = stringerParams.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI * 0.5;
                    groupang.add(flan2);
                }
            }

            /* верхние уголки
             if (stringerParams.elmIns["out"].angleU[0] !== undefined) {
               var angleU = drawAngleSupport("У4-70х70х100");
               angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
               angleU.position.y = stringerParams.elmIns["out"].angleU[0].y;
               angleU.position.z = (stringerThickness + stringerSideOffset);
               angleU.rotation.x = 0.0;
               angleU.rotation.y = 0.0;
               angleU.rotation.z = Math.PI * 0.5;
               angleU.castShadow = true;
               groupang.add(angleU);
               angleU = drawAngleSupport("У4-70х70х100");
               angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
               angleU.position.y = stringerParams.elmIns["out"].angleU[0].y + 100.0;
               angleU.position.z = ((M - stringerThickness) - stringerSideOffset);
               angleU.rotation.x = Math.PI;
               angleU.rotation.y = 0.0;
               angleU.rotation.z = Math.PI * 0.5;
               angleU.castShadow = true;
               groupang.add(angleU);
             }*/

        } // end of drawGAngles3();


        // позиция группы
        var shiftb = turnFactor > 0 ? stringerParams.M : 0.0;
        if (model == "ко") {
            group.position.set(b1 * stairAmt1 + 50.0 + shiftb, platformH - treadThickness - 150.0,
              (M - stringerSideOffset - a3 + b3) * turnFactor);
            groupang.position.set(b1 * stairAmt1 + 50.0 + shiftb, platformH - treadThickness - 150.0,
              (M - stringerSideOffset - a3 + b3) * turnFactor);
            grouptread.position.set(b1 * stairAmt1 + 50.0 + shiftb, platformH - treadThickness - 150.0,
              (M - stringerSideOffset - a3 + b3) * turnFactor);
            groupriser.position.set(b1 * stairAmt1 + 50.0 + shiftb, platformH - treadThickness - 150.0,
              (M - stringerSideOffset - a3 + b3) * turnFactor);
        }
        else {
            group.position.set(b1 * stairAmt1 + 30.0 + 5.0 + shiftb, platformH + 5.0, M * turnFactor);
            groupang.position.set(b1 * stairAmt1 + 30.0 + 5.0 + shiftb, platformH + 5.0, M * turnFactor);
            grouptread.position.set(b1 * stairAmt1 + 30.0 + 5.0 + shiftb, platformH + 5.0, M * turnFactor);
            groupriser.position.set(b1 * stairAmt1 + 30.0 + 5.0 + shiftb, platformH + 5.0, M * turnFactor);
        }
        group.rotation.y -= Math.PI * 0.5 * turnFactor;
        groupang.rotation.y -= Math.PI * 0.5 * turnFactor;
        grouptread.rotation.y -= Math.PI * 0.5 * turnFactor;
        groupriser.rotation.y -= Math.PI * 0.5 * turnFactor;
        carcas.push(group);
        angles.push(groupang);
        treads.push(grouptread);
        risers.push(groupriser);


        /***  ОГРАЖДЕНИЯ Г-ОБРАЗНАЯ  ***/


        //    drawGRailing();

        function drawGRailing() {

            /*замыкание поручней внешних секций верхнего и нижнего маршей*/
            var outerHandrailConnection = false;
            var isSection1 = false;
            var isSection3 = false;
            if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
            if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
            if (isSection1 && isSection3) outerHandrailConnection = true;
            lastMarsh = false;

            /*внешняя сторона нижнего марша*/

            if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
                var topEnd = "площадка";
                if (stairModel == "Г-образная с забегом") topEnd = "забег";
                var bottomEnd = "нет";
                var platformLengthBottom = 0;
                var platformLengthTop = M;
                var railingSide = "left";
                topConnection = outerHandrailConnection;
                bottomConnection = false;
                railingPositionZ = -40 * turnFactor;
                var railingSection1 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, (stairAmt1 + 1), h1, b1, a1, h3, lastMarsh, topConnection, bottomConnection);
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
                railingPositionZ = M * turnFactor;
                var railingSection2 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt1, h1, b1, a1, h2, lastMarsh, topConnection, bottomConnection);
                ;
                railingSection2.position.z = railingPositionZ;
                railing.push(railingSection2);
            }


            /*внешняя сторона верхнего марша*/
            lastMarsh = true;

            if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
                var topEnd = platformTop;
                var bottomEnd = "площадка";
                if (stairModel == "Г-образная с забегом") bottomEnd = "забег";
                var platformLengthTop = platformLength_3;
                var platformLengthBottom = M;
                var railingSide = "left";
                topConnection = false;
                bottomConnection = outerHandrailConnection;
                railingPositionZ = M * turnFactor;
                var railingSection3 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt3, h3, b3, a3, h2, lastMarsh, topConnection, bottomConnection);
                railingSection3.rotation.y = (-Math.PI / 2) * turnFactor;
                railingSection3.position.x = stringer4.position.x + M - stringerThickness + 40;
                if (model == "ко") railingSection3.position.x = railingSection3.position.x - stringerSideOffset;
                railingSection3.position.y = h1 * (stairAmt1 + 1); // + h3;
                if (stairModel == "Г-образная с забегом") railingSection3.position.y = h1 * (stairAmt1 + 1) + 2 * h3;
                railingSection3.position.z = stringer4.position.z;
                railing.push(railingSection3);
            }

            /*внутренняя сторона верхнего марша*/

            if (railingSide_3 == "внутреннее" || railingSide_3 == "две") {
                var topEnd = platformTop;
                var bottomEnd = "нет";
                var platformLengthTop = platformLength_3;
                var platformLengthBottom = 0;
                var railingSide = "right";
                railingPositionZ = M * turnFactor;
                var railingSection4 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt3, h3, b3, a3, h3, lastMarsh, topConnection, bottomConnection);
                railingSection4.rotation.y = -Math.PI / 2 * turnFactor;
                //console.log(railingSection4.rotation.y)
                //console.log(turnFactor)
                railingSection4.position.x = stringer4.position.x - stringerThickness;
                if (model == "ко") railingSection4.position.x = railingSection4.position.x - stringerSideOffset;
                railingSection4.position.y = h1 * (stairAmt1 + 1); // + h3;
                if (stairModel == "Г-образная с забегом") railingSection4.position.y = h1 * (stairAmt1 + 1) + 2 * h3;
                railingSection4.position.z = stringer4.position.z;
                railing.push(railingSection4);
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
                railingSection5.position.x = platform_x - M / 2;
                railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2;
                railingSection5.position.z = platformStringer1.position.z + ((platformLength_3 - a3) / 2 + 40) * turnFactor;
                if (model == "лт") railingSection5.position.z = railingSection5.position.z + stringerThickness * turnFactor;

                /*
                 = b1*(stairAmt1) + platformLength_3 + stringerThickness;
                 if (model == "ко") railingSection5.position.x = railingSection5.position.x - stringerThickness;
                 railingSection5.position.y = h1*(stairAmt1 + 1);
                 railingSection5.position.z = 0*/
                railing.push(railingSection5);
            }

        } //end of drawGRailing()
    }//end of drawGStairCase()


    /*** П-ОБРАЗНАЯ ЛЕСТНИЦА   ***/


    if (stairModel == "П-образная с площадкой" || stairModel == "П-образная с забегом") {
        drawPStairCase();
    }

    function drawPStairCase() {
        var group = new THREE.Object3D();     // группа
        var groupang = new THREE.Object3D();  // группа для уголков
        var grouptread = new THREE.Object3D();  // группа для ступеней
        var groupriser = new THREE.Object3D();  // группа для подмтупенков

        var xadd = (model == "ко") ? 0.0 : 5.0;

        var dxfBasePoint = { "x": 0.0, "y": 0.0 };

        //        /*ступени нижний марш*/
        //
        //        if (stairType != "дпк") {
        //            var geometry = new THREE.BoxGeometry(a1, treadThickness, treadWidth);
        //            var tread;
        //            var x0 = a1 / 2;
        //            var y0 = -treadThickness / 2;
        //            var z0 = M / 2 * turnFactor;
        //            for (var i = 0; i < stairAmt1; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = y0 + h1 * (i + 1);
        //                tread.position.x = x0 + (b1 * i + xadd);
        //                tread.position.z = z0;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //        }
        //
        //        if(stairType == "дпк") {
        //            geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
        //            var tread;
        //            for (var i = 0; i < stairAmt1; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = (h1 * (i + 1) - treadThickness / 2);
        //                tread.position.x = (b1 * i + dpcWidth / 2 + xadd);
        //                tread.position.z = M / 2 * turnFactor;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //            var tread2;
        //            for (var i = 0; i < stairAmt1; i++) {
        //                tread2 = new THREE.Mesh(geometry, treadMaterial);
        //                tread2.position.y = (h1 * (i + 1) - treadThickness / 2);
        //                tread2.position.x = (b1 * i + dpcWidth / 2 + 150.0 + xadd);
        //                tread2.position.z = M / 2 * turnFactor;
        //                tread2.castShadow = true;
        //                treads.push(tread2);
        //            }
        //        }
        //
        //        /*подступенки нижний марш*/
        //        if (riserType == "есть") {
        //            riserHeight = h1 - treadThickness;
        //            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));
        //
        //            var riser;
        //            for (var i = 0; i < stairAmt1 + 1; i++) {
        //                riser = new THREE.Mesh(geometry, treadMaterial);
        //                riser.position.y = (h1 * i + riserHeight / 2);
        //                riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2 + xadd);
        //                riser.position.z = M / 2 * turnFactor;
        //                riser.castShadow = true;
        //                risers.push(riser);
        //            }
        //        }

        stringerParams = {};

        stringerParams = {
            model: model,
            stringerTurn: stringerTurn,
            stringerType: stringerType,
            stringerLast: false,
            stairType: stairType,
            stairThin: stairThin,
            botEnd: "floor",
            botEndLength: 0,
            topEnd: "platformP",
            topEndLength: tyrnLength,
            stringerThickness: stringerThickness,
            stringerSideOffset: stringerSideOffset,
            M: M,
            treadWidth: treadWidth,
            treadThickness: treadThickness,
            h: h1,
            b: b1,
            a: a1,
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
            dxfBasePointGap: 100.0,
            elmIns: {},// точки размещения уголков и рамок
        };

        setParametersFrame(stringerParams);  // параметры рамок под ступенями и площадками

        // Ступени
        var tread = drawTreads("нижнего", stairAmt1, xadd, grouptread, groupriser);


        if (stairModel == "П-образная с площадкой") {
            if (stairAmt1 == 0) {
                x0 = -b1;
                y0 = y0;
            }
            else {
                x0 = tread.position.x - a1 / 2;
                y0 = tread.position.y;
            }
            z0 = M * turnFactor;

            var platformLength = platformLength_1;
            var platformWidth = platformWidth_1;
            var platformShiftLt = (model == "ко") ? 0.0 : stringerThickness;

            // Площадка
            if (stairType != "дпк") {
                var halfPlatformLength = (platformLength - 2) / 2;
                if (model == "лт") halfPlatformLength = halfPlatformLength - 2;
                geometry = new THREE.BoxGeometry(halfPlatformLength, treadThickness, platformWidth - platformShiftLt * 2.0);
                //первая половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = h1 + y0;
                tread.position.x = b1 + x0 + halfPlatformLength / 2;
                tread.position.z = platformWidth / 2.0 * turnFactor;
                tread.castShadow = true;
                treads.push(tread);
                //вторя половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = h1 + y0;
                tread.position.x = b1 + x0 + halfPlatformLength / 2 + platformLength / 2 + 2;
                if (model == "лт") tread.position.x = tread.position.x - 2;
                tread.position.z = platformWidth / 2.0 * turnFactor;
                tread.castShadow = true;
                treads.push(tread);
            }
            if (stairType == "дпк") {
                var x00 = stairAmt1 * b1 + dpcWidth / 2 + xadd;
                geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, platformWidth - platformShiftLt * 2.0);
                var deckAmt = Math.floor(platformLength / (dpcWidth + 5));
                var tread;
                for (var i = 0; i < deckAmt; i++) {
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = h1 + y0;
                    tread.position.x = x00 + i * (dpcWidth + 5);
                    tread.position.z = platformWidth / 2.0 * turnFactor;
                    tread.castShadow = true;
                    //                    treads.push(tread);
                }
                //последняя урезанная доска
                var lastDeckWidth = platformLength - deckAmt * (dpcWidth + 5) - 5;
                if (lastDeckWidth) {
                    console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми");
                    geometry = new THREE.BoxGeometry(lastDeckWidth, treadThickness, platformWidth - platformShiftLt * 2.0);
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = h1 + y0;
                    tread.position.x = x00 + deckAmt * (dpcWidth + 5) + (lastDeckWidth - dpcWidth) / 2;
                    tread.position.z = platformWidth / 2.0 * turnFactor;
                    tread.castShadow = true;
                    //                    treads.push(tread);
                }

            }

            y0 = tread.position.y;
            z0 = (platformWidth - M) * turnFactor;

            //смещаем верхний марш
            if (model == "ко") {
                x0 = x0 + a3 + (a3 - b3);
            }
            else {
                x0 = x0 + a3 + (40.0 - 5.0);
            }
            //if (model == "лт" && stairAmt3 == 0) z0 = M * turnFactor - (a3 - b3) * turnFactor;
        }
        // уровень площадки
        var platformH = y0 + treadThickness / 2.0;


        if (stairModel == "П-образная с забегом") {
            if (stairAmt1 == 0) {
                x0 = -b1;
                y0 = y0 + h1;
            }
            else {
                x0 = tread.position.x - a1 / 2;
                y0 = tread.position.y + h1;
            }
            z0 = 0; //M;

            /* забежная ступень 1 */
            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep1 = new THREE.Mesh(geom, treadMaterial);
            turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep1.position.x = b1 + x0;
            turnStep1.position.y = treadThickness / 2 * turnFactor + y0;
            turnStep1.position.z = z0;
            turnStep1.castShadow = true;
            treads.push(turnStep1);

            /* забежная ступень 2 */

            geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep2 = new THREE.Mesh(geom, treadMaterial);
            turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep2.position.x = b1 + x0;
            turnStep2.position.y = turnStep1.position.y + h3;
            turnStep2.position.z = 0;
            turnStep2.castShadow = true;
            treads.push(turnStep2);


            /* забежная ступень 3 */

            geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep3 = new THREE.Mesh(geom, treadMaterial);
            turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
            turnStep3.rotation.z = 0.5 * Math.PI;
            turnStep3.position.x = b1 + M + x0;
            turnStep3.position.y = turnStep2.position.y + h3 - treadThickness * turnFactor;
            turnStep3.position.z = (M + stepWidthLow) * turnFactor;
            turnStep3.castShadow = true;
            treads.push(turnStep3);

            /*удлиннение 3 забежной ступени*/
            if (model == "ко") {
                var extraTread;
                geometry = new THREE.BoxGeometry(treadWidth, treadThickness, marshDist);
                extraTread = new THREE.Mesh(geometry, treadMaterial);
                extraTread.position.x = turnStep3.position.x - M / 2;
                extraTread.position.y = turnStep3.position.y + treadThickness / 2 * turnFactor;
                extraTread.position.z = turnStep3.position.z + marshDist / 2 * turnFactor;
                extraTread.castShadow = true;
                treads.push(extraTread);
            }

            if (model == "лт" && marshDist > 70) {
                var extraTread;
                geometry = new THREE.BoxGeometry(treadWidth, treadThickness, (marshDist - 70));
                extraTread = new THREE.Mesh(geometry, treadMaterial);
                extraTread.position.x = turnStep3.position.x - M / 2;
                extraTread.position.y = turnStep3.position.y + treadThickness / 2;
                extraTread.position.z = turnStep3.position.z + (marshDist - 70) / 2 * turnFactor;
                extraTread.castShadow = true;
                treads.push(extraTread);
            }

            /* забежная ступень 4 */

            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep4 = new THREE.Mesh(geom, treadMaterial);
            turnStep4.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep4.rotation.z = 0.5 * Math.PI;
            turnStep4.position.x = x0 + b1 + M;
            turnStep4.position.y = turnStep1.position.y + h3 * 3;
            turnStep4.position.z = z0 + (M + marshDist) * turnFactor;
            turnStep4.castShadow = true;
            treads.push(turnStep4);

            /* забежная ступень 5 */

            geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep5 = new THREE.Mesh(geom, treadMaterial);
            turnStep5.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep5.rotation.z = 0.5 * Math.PI;
            turnStep5.position.x = b1 + x0 + M;
            turnStep5.position.y = turnStep1.position.y + h3 * 4;
            turnStep5.position.z = 0 + (marshDist + M) * turnFactor;
            turnStep5.castShadow = true;
            treads.push(turnStep5);

            /* забежная ступень 6 */

            geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep6 = new THREE.Mesh(geom, treadMaterial);
            turnStep6.rotation.x = -0.5 * Math.PI * turnFactor;
            turnStep6.rotation.z = 0 * Math.PI;
            turnStep6.position.x = b1 + x0 - stepWidthLow;
            turnStep6.position.y = -treadThickness * turnFactor + turnStep1.position.y + h3 * 5;
            turnStep6.position.z = (2 * M + marshDist) * turnFactor;
            turnStep6.castShadow = true;
            treads.push(turnStep6);


            /*подступенок второй забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 6 * turnFactor;
                riser.position.x = turnStep1.position.x + (L1 + L2 / 2) - riserThickness / 2 * turnFactor;
                riser.position.y = turnStep1.position.y + riserHeight / 2;
                riser.position.z = turnStep1.position.z + M / 2 * turnFactor;
                if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
                riser.castShadow = true;
                risers.push(riser);
            }


            /*подступенок третьей забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 3 * turnFactor;
                riser.position.x = turnStep2.position.x + M / 2;// + (L1 + L2) - riserThickness/2;
                riser.position.y = turnStep2.position.y + riserHeight / 2;
                riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * turnFactor;
                if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
                riser.castShadow = true;
                risers.push(riser);
            }

            /*подступенок четвертой забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 2 * turnFactor;
                riser.position.x = turnStep3.position.x - M / 2;
                riser.position.y = turnStep4.position.y - riserHeight / 2 - treadThickness * turnFactor;
                if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
                riser.position.z = turnStep4.position.z - (riserThickness / 2 - L1) * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }

            /*подступенок пятой забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = Math.PI / 3 * turnFactor;
                riser.position.x = turnStep3.position.x - M / 2;
                riser.position.y = turnStep5.position.y - riserHeight / 2 - treadThickness * turnFactor;
                if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
                riser.position.z = turnStep5.position.z - (riserThickness / 2 - L1 - L2 / 2) * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }

            /*подступенок шестой забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = Math.PI / 6 * turnFactor;
                riser.position.x = turnStep3.position.x - M + L2 / 2 - L1 + riserThickness / 2;
                riser.position.y = turnStep6.position.y - riserHeight / 2;// - treadThickness
                if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
                riser.position.z = turnStep6.position.z - M / 2 * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }


            x0 = turnStep6.position.x + stepWidthLow;
            y0 = turnStep6.position.y + treadThickness / 2 * turnFactor;
            z0 = turnStep6.position.z - M * turnFactor;

            if (model == "ко") x0 = x0 + (a3 - b3) - stepWidthLow;

        }

        //корректируем привязку верхнего марша
        x0 = stairAmt1 * b1 + 30.0;
        if (model == "ко") x0 = stairAmt1 * b1 + (a3 - b3);

        //        /*верхний марш*/
        //        if (stairType != "дпк") {
        //            geometry = new THREE.BoxGeometry(a3, treadThickness, treadWidth);
        //
        //            for (var i = 0; i < stairAmt3; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = y0 + h3 * (i + 1);
        //                tread.position.x = x0 - (b3 * i + a3 / 2);
        //                tread.position.z = z0 + M / 2 * turnFactor;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //        }
        //        if (stairType == "дпк") {
        //            geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
        //            var tread;
        //            for (var i = 0; i < stairAmt3; i++) {
        //                tread = new THREE.Mesh(geometry, treadMaterial);
        //                tread.position.y = y0 + h3 * (i + 1);
        //                tread.position.x = x0 - (b3 * i + dpcWidth / 2 + xadd);
        //                tread.position.z = z0 + M / 2 * turnFactor;
        //                tread.castShadow = true;
        //                treads.push(tread);
        //            }
        //            var tread2;
        //            for (var i = 0; i < stairAmt3; i++) {
        //                tread2 = new THREE.Mesh(geometry, treadMaterial);
        //                tread2.position.y = y0 + h3 * (i + 1);
        //                tread2.position.x = x0 - (b3 * i + dpcWidth / 2 + 150.0 + xadd);
        //                tread2.position.z = z0 + M / 2 * turnFactor;
        //                tread2.castShadow = true;
        //                treads.push(tread2);
        //            }
        //        }

        if (platformTop == "площадка") stairAmt3 = stairAmt3 + 1;

        //базовая точка для верхней площадки
        if (stairAmt3 == 0) {
            platform_x = x0;
            platform_y = y0;
            platform_z = z0 + ((a3 - b3) - a3 / 2) * turnFactor;
        }
        else {
            platform_x = tread.position.x + (a3 - b3);
            platform_y = tread.position.y + h3;
            platform_z = tread.position.z;
        }

        //        /*подступенки верхний марш*/
        //        if (riserType == "есть") {
        //            riserHeight = h3 - treadThickness;
        //            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));
        //
        //            var riser;
        //            for (var i = 0; i < stairAmt3; i++) {
        //                riser = new THREE.Mesh(geometry, treadMaterial);
        //                riser.rotation.y = 0.0;
        //                riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness / 2 );
        //                riser.position.x = x0 - (b3 * (i - 1) + a3 - riserThickness / 2);
        //                riser.position.z = z0 + M / 2 * turnFactor;
        //                riser.castShadow = true;
        //                risers.push(riser);
        //            }
        //        }


        /*верхняя площадка*/

        if (platformTop == "площадка") {
            if (stairType != "дпк") {
                var topPlatformLength = platformLength_3;
                if (model == "лт") topPlatformLength = topPlatformLength - stringerThickness - 10;
                var halfPlatformLength = (topPlatformLength - 2) / 2;
                geometry = new THREE.BoxGeometry(halfPlatformLength, treadThickness, treadWidth);
                //первая половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = platform_y;
                tread.position.x = platform_x - (halfPlatformLength + a3) / 2;
                tread.position.z = platform_z;
                tread.castShadow = true;
                treads.push(tread);
                //вторая половина щита
                tread = new THREE.Mesh(geometry, treadMaterial);
                tread.position.y = platform_y;
                tread.position.x = platform_x - (halfPlatformLength + a3 + topPlatformLength + 4) / 2;
                tread.position.z = platform_z;
                tread.castShadow = true;
                treads.push(tread);
            }
            if (stairType == "дпк") {
                //x0 = stairAmt1 * b1 + dpcWidth / 2 + xadd;
                geometry = new THREE.BoxGeometry(dpcWidth, treadThickness, treadWidth);
                var deckAmt = Math.floor(platformLength_3 / (dpcWidth + 5));
                var tread;
                console.log(deckAmt);
                for (var i = 0; i < deckAmt; i++) {
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = platform_y;
                    tread.position.x = platform_x - b3 - i * (dpcWidth + 5);
                    tread.position.z = platform_z;
                    tread.castShadow = true;
                    treads.push(tread);
                }
                //последняя урезанная доска
                var lastDeckWidth = platformLength_3 - deckAmt * (dpcWidth + 5) - 15 - stringerThickness;
                if (lastDeckWidth) {
                    console.log("Ширина последней доски площадки = " + lastDeckWidth + " мм. Рекомендуюется изменить ширину марша чтобы все доски были целыми");
                    geometry = new THREE.BoxGeometry(lastDeckWidth, treadThickness, treadWidth);
                    tread = new THREE.Mesh(geometry, treadMaterial);
                    tread.position.y = platform_y;
                    tread.position.x = platform_x - b3 - (deckAmt * (dpcWidth + 5) + (lastDeckWidth - dpcWidth) / 2);
                    tread.position.z = platform_z;
                    tread.castShadow = true;
                    treads.push(tread);
                }

            }
        }

        /*верхнее перекрытие*/

        if (platformTop != "площадка") {
            geometry = new THREE.BoxGeometry(M, 300, M);
            floorTop = new THREE.Mesh(geometry, floorMaterial);
            floorTop.castShadow = true;
            platform_x = tread.position.x;

            platform_y = tread.position.y;
            platform_z = tread.position.z;
            if (topStairType == "ниже") floorTop.position.y = platform_y + h3 - 150 + treadThickness / 2;
            if (topStairType == "вровень") floorTop.position.y = platform_y - 150 + treadThickness / 2;
            floorTop.position.x = platform_x - (a3 + M) / 2;
            if (topFlan == "есть") floorTop.position.x += -8;
            floorTop.position.z = platform_z;

            if (params.topAnglePosition == "вертикальная рамка") {
                //floorTop.position.x = floorTop.position.x - 40;
                if (params.model == "лт") floorTop.position.x = floorTop.position.x - 35;
            }
            topFloor.push(floorTop);
        }


        if (stairModel == "П-образная с площадкой") {
            stringerTurn = "площадка";
            tyrnLength = M;
        }
        if (stairModel == "П-образная с забегом") {
            stringerTurn = "забег";
            tyrnLength = M;
        }


        /***  КОСОУРЫ П-ОБРАЗНАЯ НИЖНИЙ МАРШ   ***/

        drawPStringers1();

        function drawPStringers1() {

            if (params.model == "лт") stringerParams.topEndLength = platformLength - stringerThickness + 5.0;
            if (params.model == "ко") stringerParams.topEndLength = b1;

            /*внешняя тетива/косоур нижнего марша*/

            stringerParams.key = "out";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer1 = new THREE.Mesh(geom, stringerMaterial);
            stringer1.position.x = 0;
            stringer1.position.y = 0;
            stringer1.position.z = (stringerSideOffset + stringerThickness * (1 - turnFactor) * 0.5) * turnFactor;
            stringer1.castShadow = true;
            carcas.push(stringer1);
            //сохраняем позицию косоура
            stringerParams.stringer1_pos = stringer1.position;

            /*внутренняя тетива/косоур нижнего марша*/

            stringerParams.key = "in";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer2 = new THREE.Mesh(geom, stringerMaterial);
            stringer2.position.x = 0;
            stringer2.position.y = 0;
            stringer2.position.z = (M - stringerSideOffset - stringerThickness * (1 + turnFactor) * 0.5) * turnFactor;
            stringer2.castShadow = true;
            carcas.push(stringer2);

            /*промежуточная площадка*/

            if (model == "ко") {
                //задняя тетива площадки
                p0 = {
                    x: b1 * stairAmt1 + platformLength,
                    y: h1 * (stairAmt1 + 1) - treadThickness,
                    z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                };
                drawRearStringerPKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                //уголки добавляются внутри функции drawRearStringerPKo

                p0.x = platformLength;
                p0.x = b1 * stairAmt1 + a1 + stringerThickness;

                //боковые тетивы площадки
                stringerParams.platformLength = platformLength;
                stringerParams.sideLength = platformLength - a1 - stringerThickness - stringerThickness;
                drawSideStringerPKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                drawSideStringerPKo("in", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                p0.z += platformWidth_1 - M - M + stringerSideOffset + stringerSideOffset + stringerThickness;
                drawSideStringerPKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                drawSideStringerPKo("in", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);

                //поперечная тетива площадки
                p0 = {
                    x: b1 * stairAmt1 + a1 + stringerThickness,
                    y: h1 * stairAmt1 + h1 - treadThickness,
                    z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                };
                drawTransStringerPKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
            }
            if (model == "лт") {
                // задняя тетива площадки
                p0 = {
                    x: b1 * stairAmt1 + platformLength + 5.0,
                    y: h1 * (stairAmt1 + 1) + 5.0,
                    z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                };
                drawRearStringerPLt(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                //уголки добавляются внутри функции drawRearStringerPLt

                if (stairFrame == "нет") {
                    //поперечная тетива площадки
                    p0 = {
                        x: b1 * stairAmt1 + 306.0 + stringerThickness,
                        y: h1 * stairAmt1 + h1 - treadThickness,
                        z: stringerSideOffset - (platformWidth_1 - M) * (1 - turnFactor) * 0.5
                    };
                    drawTransStringerPLt(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
            }
        } // end of drawPStringers1()


        /*** УГОЛКИ П-ОБРАЗНАЯ НИЖНИЙ МАРШ ***/


        drawPAngles1();

        function drawPAngles1() {
            // нижние уголки
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = stringerThickness + stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = 0.0;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            groupang.add(angleB);
            var angleB = drawAngleSupport("У4-70х70х100");
            if (params.bottomAngleType === "регулируемая опора") {
                angleB = drawAdjustableLeg();
            }
            angleB.position.x = stringerParams.elmIns["out"].angleB[0].x + 100.0;
            angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
            angleB.position.z = (M - stringerThickness) - stringerSideOffset;
            angleB.rotation.x = 0.0;
            angleB.rotation.y = Math.PI;
            angleB.rotation.z = 0.0;
            angleB.castShadow = true;
            groupang.add(angleB);

            // фланец крепления частей разделённой тетивы или косоура нижний марш
            if (stringerParams.divide !== 0) {
                drawFlanConcatAngles(stringerParams, flanMaterial, group, groupang);
            }

            // уголки/рамки под ступенями нижний марш
            var ii;
            var frame;
            if (stairFrame == "есть") {
                var frameParams = {};
                frameParams.material = metalMaterial2;
                frameParams.dxfBasePoint = { x: -300, y: 0 };
                // рамки нижний марш
                // только для "out" элементов
                for (ii = 0; ii < stringerParams.elmIns["out"].frames.length; ii++) {
                    frameParams.length = ((M - stringerThickness - stringerThickness) - stringerSideOffset - stringerSideOffset);
                    frameParams.width = stringerParams.elmIns["out"].frames[ii].width;
                    frameParams.profile = stringerParams.elmIns["out"].frames[ii].profile;
                    frameParams.brigeAmt = stringerParams.elmIns["out"].frames[ii].brigeAmt;
                    frame = drawTreadFrame(frameParams);
                    frame.position.x = stringerParams.elmIns["out"].frames[ii].x;
                    frame.position.y = stringerParams.elmIns["out"].frames[ii].y;
                    frame.position.z = stringerParams.elmIns["out"].frames[ii].z === undefined ?
                      stringerThickness + stringerSideOffset : stringerParams.elmIns["out"].frames[ii].z;
                    groupang.add(frame);
                    frameParams.dxfBasePoint.x -= 300.0;

                    // рамки между маршами (теже параметры)
                    if (stringerParams.model == "лт" && ii >= stairAmt1) {
                        frameParams.length = platformWidth_1 - M - M;
                        //frameParams.width = stringerParams.elmIns["out"].frames[ii].width;
                        //frameParams.profile = stringerParams.elmIns["out"].frames[ii].profile;
                        frameParams.brigeAmt = stairThin ? Math.round(frameParams.length / 500.0) + 2 : 2;
                        frame = drawTreadFrame(frameParams);
                        frame.position.x = stringerParams.elmIns["out"].frames[ii].x;
                        frame.position.y = stringerParams.elmIns["out"].frames[ii].y;
                        frame.position.z = turnFactor > 0 ? M : -frameParams.length;
                        groupang.add(frame);
                        frameParams.dxfBasePoint.x -= 300.0;
                    }
                }
            }
            else {
                if (stringerParams.model == "лт") {
                    // уголки крепления ступеней нижний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                    }

                    // перемычки нижний марш
                    for (ii = 0; ii < stringerParams.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams, stringerParams.elmIns["out"].briges[ii], group, groupang);
                    }

                }
            }

            if (!(stringerParams.model == "лт" && stairFrame == "есть")) {
                // уголки крепления к поперечному косоуру площадки
                var angleU = drawAngleSupport("У4-60х60х100");
                angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                angleU.position.y = stringerParams.elmIns["out"].angleU[0].y;
                angleU.position.z = (stringerThickness + stringerSideOffset);
                angleU.rotation.x = 0.0;
                angleU.rotation.y = 0.0;
                angleU.rotation.z = Math.PI * 0.5;
                angleU.castShadow = true;
                groupang.add(angleU);
                angleU = drawAngleSupport("У4-60х60х100");
                angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                angleU.position.y = stringerParams.elmIns["out"].angleU[0].y + 100.0;
                angleU.position.z = ((M - stringerThickness) - stringerSideOffset);
                angleU.rotation.x = Math.PI;
                angleU.rotation.y = 0.0;
                angleU.rotation.z = Math.PI * 0.5;
                angleU.castShadow = true;
                groupang.add(angleU);
            }
        }//end of drawPAngles1()

        // позиция группы
        var shifta = turnFactor < 0 ? -stringerParams.M : 0.0;
        group.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        groupang.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        grouptread.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        groupriser.position.set(stringerParams.stringer1_pos.x, stringerParams.stringer1_pos.y, shifta);
        carcas.push(group);
        angles.push(groupang);
        treads.push(grouptread);
        risers.push(groupriser);


        group = new THREE.Object3D();       // группа поворота
        groupang = new THREE.Object3D();    // группа поворота для уголков
        grouptread = new THREE.Object3D();  // группа для ступеней
        groupriser = new THREE.Object3D();  // группа для подмтупенков


        /*** КОСОУРЫ П-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

        stringerParams.stringerLast = true;
        stringerParams.botEnd = "platformP";
        stringerParams.topEnd = "floor";
        stringerParams.stairAmt = stairAmt3;
        stringerParams.h = h3;
        stringerParams.b = b3;
        stringerParams.a = a3;

        setParametersFrame(stringerParams);  // параметры рамок под ступенями и площадками

        // Ступени
        var tread = drawTreads("верхнего", stairAmt3, xadd, grouptread, groupriser);


        drawPStringers3();

        function drawPStringers3() {
            if (platformTop == "площадка") {
                stringerParams.topEnd = "platformG";
                stringerParams.topEndLength = params.platformLength_3 + 7.0;
                if (params.model == "ко") stringerParams.topEndLength = b3;
            }

            if (params.model == "лт") stringerParams.botEndLength = platformLength - 3.0;
            if (params.model == "ко") stringerParams.botEndLength = a1;

            /*внешняя тетива/косоур верхнего марша*/

            stringerParams.key = turnFactor > 0 ? "out" : "in";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            if (stairModel == "П-образная с площадкой") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer3 = new THREE.Mesh(geom, stringerMaterial);
                stringer3.position.set(0.0, 0.0, stringerSideOffset);
                stringer3.castShadow = true;
                group.add(stringer3);
            }
            if (stairModel == "П-образная с забегом") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer3 = new THREE.Mesh(geom, stringerMaterial);
                stringer3.rotation.y = -0.5 * Math.PI * turnFactor;
                stringer3.position.x = b1 * stairAmt1 + M - stringerSideOffset;
                stringer3.position.y = h1 * (stairAmt1 + 1) + h3 - Math.max(h1, h3);
                stringer3.position.z = (M - 111.0) * turnFactor;
                stringer3.castShadow = true;
                carcas.push(stringer3);

            }

            /*внутренняя тетива/косоур верхнего марша*/

            stringerParams.key = turnFactor > 0 ? "in" : "out";
            if (params.model == "лт") stringerParams = drawStringerLt(stringerParams);
            if (params.model == "ко") stringerParams = drawStringerKo(stringerParams);
            if (stairModel == "П-образная с площадкой") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer4 = new THREE.Mesh(geom, stringerMaterial);
                stringer4.position.set(0.0, 0.0, M - stringerThickness - stringerSideOffset);
                stringer4.castShadow = true;
                group.add(stringer4);
            }
            if (stairModel == "П-образная с забегом") {
                var geom = new THREE.ExtrudeGeometry(stringerParams.stringerShape, stringerExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var stringer4 = new THREE.Mesh(geom, stringerMaterial);
                stringer4.rotation.y = -0.5 * Math.PI * turnFactor;
                stringer4.position.x = b1 * stairAmt1 + stringerSideOffset + stringerThickness;
                stringer4.position.y = h1 * (stairAmt1 + 1) - h3;
                stringer4.position.z = (M - 111.0) * turnFactor;
                stringer4.castShadow = true;
                carcas.push(stringer4);
            }


            /*верхняя площадка*/

            if (platformTop == "площадка") {
                if (model == "ко") {
                    //левый соединительный фланец
                    var flanSide = drawFlanSideConcat("left", stringerParams, flanMaterial, group);
                    flanSide.position.x += stringerParams.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams.flanSidePointInsert.y;
                    flanSide.position.z += stringerSideOffset + stringerThickness;

                    //правый соединительный фланец
                    flanSide = drawFlanSideConcat("right", stringerParams, flanMaterial, group);
                    flanSide.position.x += stringerParams.flanSidePointInsert.x;
                    flanSide.position.y += stringerParams.flanSidePointInsert.y;
                    flanSide.position.z += M - stringerSideOffset - stringerThickness;

                    //задняя тетива площадки
                    p0 = {
                        x: b3 * (stairAmt3 - 1) + a1 + params.platformLength_3 - stringerSideOffset - (a3 - b3),
                        y: h3 * stairAmt3 - treadThickness + 200 - 10,
                        z: stringerSideOffset + stringerThickness
                    };
                    drawRearStringerKo(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                    //уголки добавляются внутри функции drawRearStringerKo

                    //боковые тетивы площадки
                    p0.x -= (params.platformLength_3 - stringerSideOffset - b3 - (a3 - b3));
                    p0.z -= stringerThickness;
                    stringerParams.platformLength = params.platformLength_3;
                    drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                    p0.z += M - stringerSideOffset - stringerSideOffset - stringerThickness;
                    drawSideStringerKo("out", stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
                if (model == "лт") {
                    // задняя тетива площадки
                    p0 = {
                        x: b3 * (stairAmt3 - 1) + params.platformLength_3 - stringerThickness - 22,
                        y: h3 * (stairAmt3),
                        z: 0.0
                    };
                    drawRearStringer(stringerParams, p0, group, groupang, stringerMaterial, stringerExtrudeOptions);
                }
            }

        } //end of drawPStringers3()


        /*** УГОЛКИ П-ОБРАЗНАЯ ВЕРХНИЙ МАРШ ***/

        drawPAngles3();

        function drawPAngles3() {
            if (!(stringerParams.model == "лт" && stairFrame == "есть")) {
                // уголки крепления к нижнему маршу (площадке)
                var angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams.elmIns["out"].angleB[0].y;
                angleB.position.z = stringerThickness + stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = 0.0;
                angleB.rotation.z = Math.PI * 1.5;
                angleB.castShadow = true;
                groupang.add(angleB);
                angleB = drawAngleSupport("У4-60х60х100");
                angleB.position.x = stringerParams.elmIns["out"].angleB[0].x;
                angleB.position.y = stringerParams.elmIns["out"].angleB[0].y - 100.0;
                angleB.position.z = (M - stringerThickness) - stringerSideOffset;
                angleB.rotation.x = 0.0;
                angleB.rotation.y = Math.PI;
                angleB.rotation.z = Math.PI * 0.5;
                angleB.castShadow = true;
                groupang.add(angleB);
            }

            // уголки/рамки под ступенями верхний марш
            var ii;
            var frame;
            if (stairFrame == "есть") {
                var frameParams = {};
                frameParams.length = ((M - stringerThickness - stringerThickness) - stringerSideOffset - stringerSideOffset);
                frameParams.material = metalMaterial2;
                frameParams.dxfBasePoint = { x: -300, y: 700.0 };
                // рамки верхний марш
                // только для "out" элементов
                for (ii = 0; ii < stringerParams.elmIns["out"].frames.length; ii++) {
                    frameParams.width = stringerParams.elmIns["out"].frames[ii].width;
                    frameParams.profile = stringerParams.elmIns["out"].frames[ii].profile;
                    frameParams.brigeAmt = stringerParams.elmIns["out"].frames[ii].brigeAmt;
                    frame = drawTreadFrame(frameParams);
                    frame.position.x = stringerParams.elmIns["out"].frames[ii].x;
                    frame.position.y = stringerParams.elmIns["out"].frames[ii].y;
                    frame.position.z = stringerThickness + stringerSideOffset;
                    groupang.add(frame);
                    frameParams.dxfBasePoint.x -= 300.0;
                }
            }
            else {
                if (stringerParams.model == "лт") {
                    // уголки крепления ступеней верхний марш
                    var angle2, angleType, angleLen;
                    for (ii = 0; ii < stringerParams.elmIns["out"].angles.length; ii++) {
                        angleType = stringerParams.elmIns["out"].anglesop[ii];
                        angleLen = getDimsAngle(angleType).len;
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = (stringerThickness + stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = 0.0;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                        angle2 = drawAngleSupport(angleType);
                        angle2.position.x = stringerParams.elmIns["out"].angles[ii].x + angleLen;
                        angle2.position.y = stringerParams.elmIns["out"].angles[ii].y;
                        angle2.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angle2.rotation.x = Math.PI * 0.5;
                        angle2.rotation.y = 0.0;
                        angle2.rotation.z = Math.PI;
                        angle2.castShadow = true;
                        groupang.add(angle2);
                    }

                    // перемычки верхний марш
                    for (ii = 0; ii < stringerParams.elmIns["out"].briges.length; ii++) {
                        drawBridgeAngles(stringerParams, stringerParams.elmIns["out"].briges[ii], group, groupang);
                    }
                }
            }

            // фланец крепления частей разделённой тетивы или косоура
            // верхний марш
            if (stringerParams.divide !== 0) {
                drawFlanConcatAngles(stringerParams, flanMaterial, group, groupang);
            }

            // верхние уголки
            if (platformTop != "площадка") {
                var topAnglePosition = params.topAnglePosition;
                if (topAnglePosition == "над ступенью" || topAnglePosition == "под ступенью") {
                    if (stringerParams.elmIns["out"].angleU[0] !== undefined) {
                        var angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams.elmIns["out"].angleU[0].y;
                        angleU.position.z = (stringerThickness + stringerSideOffset);
                        angleU.rotation.x = 0.0;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        groupang.add(angleU);
                        angleU = drawAngleSupport("У4-70х70х100");
                        angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
                        angleU.position.y = stringerParams.elmIns["out"].angleU[0].y + 100.0;
                        angleU.position.z = ((M - stringerThickness) - stringerSideOffset);
                        angleU.rotation.x = Math.PI;
                        angleU.rotation.y = 0.0;
                        angleU.rotation.z = Math.PI * 0.5;
                        angleU.castShadow = true;
                        groupang.add(angleU);
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
                        model: stringerParams.model,
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
                        complexUnit.position.y = stairAmt3 * h3 - 5.0;
                        //complexUnit.position.x = stairAmt3 * b3 - (a3 - b3);
                        complexUnit.position.x = stairAmt3 * b3 - 35.0;
                    }
                    if (params.model == "ко") {
                        complexUnit.position.y = stairAmt3 * h3 + 150.0 + treadThickness;
                        complexUnit.position.x = stairAmt3 * b3 + a1 - (a3 - b3);
                    }
                    groupang.add(complexUnit);
                }
                /*верхний фланец (только для ЛТ)  */
                if (topFlan == "есть") {
                    var firstPosition_x = (params.stairAmt2 - 1) * b2 + a2 - 35 + 5;
                    var firstPosition_y = params.stairAmt2 * h2 - 5;
                    var firstPosition_z = 0;
                    var flanLength = firstPosition_y - params.topFlanHolesPosition + 40 + 105 - (params.stairAmt2 - 1) * h2 + 60;
                    if (stairFrame == "есть") {
                        var frameProfileHeight = 40;
                        flanLength = treadThickness + frameProfileHeight + h3 + 20 - params.topFlanHolesPosition;
                        firstPosition_y = params.stairAmt3 * h3 - treadThickness - frameProfileHeight - 5;
                    }
                    // левый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan = flanParams.mesh;
                    flan.position.x = firstPosition_x;
                    flan.position.y = firstPosition_y + h2 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan.position.y = firstPosition_y;
                    flan.position.z = flanParams.width + stringerThickness;
                    flan.rotation.x = 0;
                    flan.rotation.y = Math.PI * 0.5;
                    console.log(flan.position);
                    groupang.add(flan);

                    // правый фланец
                    var flanParams = drawTopFixFlan(flanLength, dxfBasePoint, dxfPrimitivesArr);
                    var flan2 = flanParams.mesh;
                    flan2.position.x = firstPosition_x;
                    flan2.position.y = firstPosition_y + h2 - flanParams.height + flanParams.hole1Y - params.topFlanHolesPosition;
                    if (stairFrame == "есть") flan2.position.y = firstPosition_y;
                    flan2.position.z = stringerParams.M - stringerThickness;
                    flan2.rotation.x = 0;
                    flan2.rotation.y = Math.PI * 0.5;
                    groupang.add(flan2);
                }
            }

            /* верхние уголки
             if (stringerParams.elmIns["out"].angleU[0] !== undefined) {
               var angleU = drawAngleSupport("У4-70х70х100");
               angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
               angleU.position.y = stringerParams.elmIns["out"].angleU[0].y;
               angleU.position.z = (stringerThickness + stringerSideOffset);
               angleU.rotation.x = 0.0;
               angleU.rotation.y = 0.0;
               angleU.rotation.z = Math.PI * 0.5;
               angleU.castShadow = true;
               groupang.add(angleU);
               angleU = drawAngleSupport("У4-70х70х100");
               angleU.position.x = stringerParams.elmIns["out"].angleU[0].x;
               angleU.position.y = stringerParams.elmIns["out"].angleU[0].y + 100.0;
               angleU.position.z = ((M - stringerThickness) - stringerSideOffset);
               angleU.rotation.x = Math.PI;
               angleU.rotation.y = 0.0;
               angleU.rotation.z = Math.PI * 0.5;
               angleU.castShadow = true;
               groupang.add(angleU);
             }*/

        } // end of drawPAngles3();


        // позиция группы
        var shiftb = turnFactor < 0 ? stringerParams.M : 0.0;
        if (model == "ко") {
            group.position.set(b1 * stairAmt1 + a1, platformH - treadThickness - 150.0,
              platformWidth * turnFactor + shiftb);
            groupang.position.set(b1 * stairAmt1 + a1, platformH - treadThickness - 150.0,
              platformWidth * turnFactor + shiftb);
            grouptread.position.set(b1 * stairAmt1 + a1, platformH - treadThickness - 150.0,
              platformWidth * turnFactor + shiftb);
            groupriser.position.set(b1 * stairAmt1 + a1, platformH - treadThickness - 150.0,
              platformWidth * turnFactor + shiftb);
        }
        else {
            group.position.set(b1 * stairAmt1, platformH + 5.0, platformWidth * turnFactor + shiftb);
            groupang.position.set(b1 * stairAmt1, platformH + 5.0, platformWidth * turnFactor + shiftb);
            grouptread.position.set(b1 * stairAmt1, platformH + 5.0, platformWidth * turnFactor + shiftb);
            groupriser.position.set(b1 * stairAmt1, platformH + 5.0, platformWidth * turnFactor + shiftb);
        }
        group.rotation.y -= Math.PI;
        groupang.rotation.y -= Math.PI;
        grouptread.rotation.y -= Math.PI;
        groupriser.rotation.y -= Math.PI;
        carcas.push(group);
        angles.push(groupang);
        treads.push(grouptread);
        risers.push(groupriser);


        /***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ЛЕСТНИЦЫ  ***/


        //        drawPRailing();

        function drawPRailing() {

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
                ;
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

        } //end of drawPRailing()

    }//end of drawPStairCase()


    /***  П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ ЛЕСТНИЦА   ***/


    if (stairModel == "П-образная трехмаршевая") {
        drawP3StairCase();
    }

    function drawP3StairCase() {

        /*ступени нижний марш*/
        geometry = new THREE.BoxGeometry(a1, treadThickness, treadWidth);
        var tread;
        var x0 = a1 / 2;
        var y0 = -treadThickness / 2;
        var z0 = M / 2 * turnFactor;
        for (var i = 0; i < stairAmt1; i++) {
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = h1 * (i + 1) + y0;
            tread.position.x = b1 * i + x0;
            tread.position.z = z0;
            tread.castShadow = true;
            treads.push(tread);
        }

        /*подступенки нижний марш*/
        if (riserType == "есть") {
            riserHeight = h1 - treadThickness;
            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

            var riser;
            for (var i = 0; i < stairAmt1 + 1; i++) {
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.position.y = (h1 * i + riserHeight / 2);
                riser.position.x = (b1 * (i - 1) + a1 - riserThickness / 2);
                riser.position.z = M / 2 * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }
        }


        if (turnType_1 == "площадка") {
            if (stairAmt1 == 0) {
                x0 = -b1;
                y0 = y0;
            }
            else {
                x0 = tread.position.x - a1 / 2;
                y0 = tread.position.y;
            }
            z0 = M * turnFactor;

            geometry = new THREE.BoxGeometry(treadWidth, treadThickness, treadWidth);
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = h1 + y0;
            tread.position.x = b1 + x0 + M / 2;
            tread.position.z = M / 2 * turnFactor;
            tread.castShadow = true;
            treads.push(tread);

            x0 = tread.position.x;
            y0 = tread.position.y + treadThickness / 2;
            z0 = M * turnFactor;

            if (model == "ко") z0 = z0 - (a2 - b2) * turnFactor; // + stepWidthLow;
        }

        if (turnType_1 == "забег") {
            if (stairAmt1 == 0) {
                x0 = -b1;
                y0 = y0;
            }
            else {
                x0 = tread.position.x - a1 / 2;
                y0 = tread.position.y;
            }
            z0 = 0;
            /* забежная ступень 1*/
            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep1 = new THREE.Mesh(geom, treadMaterial);
            turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep1.position.x = b1 + x0;
            turnStep1.position.y = y0 + treadThickness / 2 * turnFactor + h1;
            turnStep1.position.z = z0;
            turnStep1.castShadow = true;
            treads.push(turnStep1);

            /* забежная ступень 2 */
            geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep2 = new THREE.Mesh(geom, treadMaterial);
            turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep2.position.x = b1 + x0;
            turnStep2.position.y = y0 + treadThickness / 2 * turnFactor + h1 + h2;
            turnStep2.position.z = 0;
            turnStep2.castShadow = true;
            treads.push(turnStep2);


            /* забежная ступень 3 */

            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep3 = new THREE.Mesh(geom, treadMaterial);
            turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
            turnStep3.rotation.z = 0.5 * Math.PI;
            turnStep3.position.x = b1 + M + x0;
            turnStep3.position.y = y0 - treadThickness / 2 * turnFactor + h1 + h2 * 2;
            turnStep3.position.z = (M + stepWidthLow) * turnFactor;
            turnStep3.castShadow = true;
            treads.push(turnStep3);

            /*подступенок второй забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h2 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);

                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 6 * turnFactor;
                riser.position.x = turnStep1.position.x + (L1 + L2 / 2) - riserThickness / 2;
                riser.position.y = turnStep1.position.y + riserHeight / 2;
                if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
                riser.position.z = turnStep1.position.z + M / 2 * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }


            /*подступенок третьей забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h2 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -Math.PI / 3 * turnFactor;
                riser.position.x = turnStep2.position.x + M / 2; // + (L1 + L2) - riserThickness/2;
                riser.position.y = turnStep2.position.y + riserHeight / 2;
                if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
                riser.position.z = (M - L2 / 2 + L1 - riserThickness / 2) * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }


            //x0 = tread.position.x + M / 2;
            x0 = x0 + b1 + M / 2;
            y0 = turnStep3.position.y + treadThickness;
            if (turnFactor == -1) y0 = turnStep3.position.y;
            z0 = M * turnFactor;

            if (model == "ко") z0 = z0 + (stepWidthLow - (a2 - b2)) * turnFactor;
        }


        /*ступени средний марш*/

        geometry = new THREE.BoxGeometry(treadWidth, treadThickness, a2);

        tread;

        for (var i = 0; i < stairAmt2; i++) {
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = y0 + (h2 * (i + 1) - treadThickness / 2);
            tread.position.x = x0; // + M/2;
            tread.position.z = z0 + (b2 * i + a2 / 2) * turnFactor;
            tread.castShadow = true;
            treads.push(tread);
        }

        /*подступенки средний марш*/
        if (riserType == "есть") {
            riserHeight = h2 - treadThickness;
            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

            var riser;
            for (var i = 0; i < stairAmt2 + 1; i++) {
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = -0.5 * Math.PI;
                riser.position.y = y0 + (h2 * i + riserHeight / 2);
                riser.position.x = x0; //+ M/2;
                riser.position.z = z0 + (b2 * (i - 1) + a2 - riserThickness / 2) * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }
        }

        /*верхний поворот*/
        x0 = tread.position.x;
        y0 = tread.position.y;
        z0 = tread.position.z - a2 / 2 * turnFactor;

        if (model == "ко") z0 = z0 + (a2 - b2 - stepWidthLow) * turnFactor;

        if (turnType_2 == "площадка") {

            geometry = new THREE.BoxGeometry(treadWidth, treadThickness, treadWidth);
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = y0 + h2;
            tread.position.x = x0;
            tread.position.z = z0 + (b2 + M / 2) * turnFactor;
            tread.castShadow = true;
            treads.push(tread);

            x0 = tread.position.x - M / 2;
            y0 = tread.position.y - treadThickness / 2;
            z0 = tread.position.z + M / 2 * turnFactor;

            //смещаем верхний марш для КО
            if (model == "ко") {
                x0 = x0 + (a3 - b3);
            }
            else z0 = z0 + stringerThickness / 2 * turnFactor;
        }

        if (turnType_2 == "забег") {

            /* забежная ступень 1*/
            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep1 = new THREE.Mesh(geom, treadMaterial);
            turnStep1.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep1.rotation.z = 0.5 * Math.PI;
            turnStep1.position.x = x0 + M / 2;
            turnStep1.position.y = y0 + treadThickness / 2 * turnFactor + h2;
            turnStep1.position.z = z0 + b2 * turnFactor;
            turnStep1.castShadow = true;
            treads.push(turnStep1);

            /* забежная ступень 2 */
            geom = new THREE.ExtrudeGeometry(turnStepShape2, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep2 = new THREE.Mesh(geom, treadMaterial);
            turnStep2.rotation.x = 0.5 * Math.PI * turnFactor;
            turnStep2.rotation.z = 0.5 * Math.PI;
            turnStep2.position.x = x0 + M / 2; //b1 + x0;
            turnStep2.position.y = y0 + treadThickness / 2 * turnFactor + h2 + h3;
            turnStep2.position.z = z0 + b2 * turnFactor;
            turnStep2.castShadow = true;
            treads.push(turnStep2);


            /* забежная ступень 3 */

            var geom = new THREE.ExtrudeGeometry(turnStepShape1, extrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var turnStep3 = new THREE.Mesh(geom, treadMaterial);
            turnStep3.rotation.x = -0.5 * Math.PI * turnFactor;
            //turnStep3.rotation.z=1*Math.PI;
            turnStep3.position.x = x0 - M / 2 - stepWidthLow;
            turnStep3.position.y = y0 - treadThickness / 2 * turnFactor + h2 + h3 * 2;
            turnStep3.position.z = z0 + (M + b2) * turnFactor;
            turnStep3.castShadow = true;
            treads.push(turnStep3);

            /*подступенок второй забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = Math.PI / 3 * turnFactor;
                riser.position.x = turnStep1.position.x - M / 2;
                riser.position.y = turnStep2.position.y - riserHeight / 2 - treadThickness;
                if (turnFactor == -1) riser.position.y = riser.position.y + treadThickness;
                riser.position.z = turnStep2.position.z + (L1 + L2 / 2 - riserThickness / 2) * turnFactor;
                riser.castShadow = true;
                riser.
                risers.push(riser);
            }

            /*подступенок третьей забежной ступени*/
            if (riserType == "есть") {
                riserHeight = h3 - treadThickness;
                var riserLength = M / Math.cos(Math.PI / 6) - riserSideOffset * 2;
                geometry = new THREE.BoxGeometry(riserThickness, riserHeight, riserLength);
                var riser;
                riser = new THREE.Mesh(geometry, treadMaterial);
                riser.rotation.y = Math.PI / 6 * turnFactor;
                riser.position.x = turnStep1.position.x - M + L2 / 2 - L1 + riserThickness / 2;
                riser.position.y = turnStep3.position.y - riserHeight / 2;
                if (turnFactor == -1) riser.position.y = riser.position.y - treadThickness;
                riser.position.z = turnStep3.position.z - M / 2 * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }


            x0 = turnStep3.position.x + stepWidthLow;
            y0 = turnStep3.position.y;
            z0 = turnStep3.position.z;
            if (turnFactor == -1) y0 = turnStep3.position.y - treadThickness;

            //смещаем верхний марш для КО
            if (model == "ко") x0 = x0 - L1 + (a3 - b3);

        }


        /*ступенни верхний марш*/

        geometry = new THREE.BoxGeometry(a3, treadThickness, treadWidth);

        for (var i = 0; i < stairAmt3; i++) {
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = y0 + (h3 * (i + 1) + treadThickness / 2);
            tread.position.x = x0 - (b3 * i + a3 / 2);
            tread.position.z = z0 - M / 2 * turnFactor;
            tread.castShadow = true;
            treads.push(tread);
        }

        /*подступенки верхнего марша*/
        if (riserType == "есть") {
            riserHeight = h3 - treadThickness;
            geometry = new THREE.BoxGeometry(riserThickness, riserHeight, (M - 2 * riserSideOffset));

            var riser;
            for (var i = 0; i < stairAmt3; i++) {
                riser = new THREE.Mesh(geometry, treadMaterial);
                //riser.rotation.y=-0.5*Math.PI;
                riser.position.y = y0 + (h3 * i + riserHeight / 2 + treadThickness);
                riser.position.x = x0 - (b3 * (i - 1) + a3 - riserThickness / 2);
                riser.position.z = z0 - M / 2 * turnFactor;
                riser.castShadow = true;
                risers.push(riser);
            }
        }

        /*верхняя площадка*/
        var platform_x = tread.position.x;
        var platform_y = tread.position.y;
        var platform_z = tread.position.z;
        var platformWidthTop = M - 2 * stringerThickness;
        if (model == "ко") platformWidthTop = M;
        if (platformTop == "площадка") {
            geometry = new THREE.BoxGeometry(platformLength_3, treadThickness, platformWidthTop);
            tread = new THREE.Mesh(geometry, treadMaterial);
            tread.position.y = platform_y;
            tread.position.x = platform_x - (platformLength_3 - a3) / 2;
            tread.position.z = platform_z;
            tread.castShadow = true;
            treads.push(tread);
        }

        /*верхнее перекрытие*/

        if (platformTop != "площадка") {
            //базовая точка для верхней площадки
            if (stairAmt3 == 0) {
                platform_x = x0 + a3 / 2;
                platform_y = y0; //+ h3
                platform_z = z0 - M / 2 * turnFactor;
                if (model == "ко") platform_x = platform_x - (a3 - b3);
                if (model == "лт" && turnType_2 == "забег") platform_x = platform_x - L1;
            }
            else {
                platform_x = tread.position.x;
                platform_y = tread.position.y;
                platform_z = tread.position.z;
            }
            geometry = new THREE.BoxGeometry(M, 300, M);
            floorTop = new THREE.Mesh(geometry, floorMaterial);
            floorTop.castShadow = true;
            if (topStairType == "ниже") floorTop.position.y = platform_y + h3 - 150 + treadThickness / 2;
            if (topStairType == "вровень") floorTop.position.y = platform_y - 150 + treadThickness / 2;
            floorTop.position.x = platform_x - (a3 + M) / 2;
            floorTop.position.z = platform_z;
            topFloor.push(floorTop);
        }


        /***  КАРКАС П-ОБРАЗНОЙ ТРЕХМАРШЕВОЙ ЛЕСТНИЦЫ   ***/



        var extraStep = 0;

        if (turnType_1 == "площадка") {
            stringerTurn = "площадка";
            tyrnLength = M;

        }
        if (turnType_1 == "забег") {
            stringerTurn = "забег";
            tyrnLength = M;
            extraStep += 2;
        }

        /*внешний косоур нижнего марша*/

        var stringerShape = drawStringer1(
            model, stringerTurn, stringerType,
            h1, b1, a1, stairAmt1, h2, L1, L2,
            tyrnLength, stringerSideOffset);
        var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var stringer1 = new THREE.Mesh(geom, stringerMaterial);
        stringer1.position.x = 0;
        stringer1.position.y = 0;
        stringer1.position.z = stringerSideOffset * turnFactor;
        if (turnFactor == -1) stringer1.position.z = stringer1.position.z - stringerThickness;

        stringer1.castShadow = true;
        carcas.push(stringer1);

        /*внутренний косоур нижнего марша*/

        stringerShape = drawStringer2(
            model, stringerTurn, stringerType,
            h1, b1, a1, stairAmt1, h2, L1, L2,
            tyrnLength, stringerSideOffset);
        var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var stringer2 = new THREE.Mesh(geom, stringerMaterial);
        stringer2.position.x = 0;
        stringer2.position.y = 0;
        stringer2.position.z = (M - stringerThickness / 2 - stringerSideOffset) * turnFactor;
        stringer2.castShadow = true;
        carcas.push(stringer2);

        /*внешний косоур верхнего марша*/

        if (turnType_2 == "площадка") {
            stringerTurn = "площадка";
            tyrnLength = M;
        }
        if (turnType_2 == "забег") {
            stringerTurn = "забег";
            tyrnLength = M;
        }
        //stringerWidth = 150;

        stringerShape = drawStringer3(
            model, stringerTurn, stringerType,
            h2, b2, stairAmt2, h3, b3, stairAmt3, a3, L1, L2,
            tyrnLength, stringerSideOffset);

        if (turnType_2 == "площадка") {
            var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer3 = new THREE.Mesh(geom, stringerMaterial);
            stringer3.rotation.y = -1 * Math.PI * turnFactor;
            stringer3.position.x = b1 * stairAmt1 + M;
            if (model == "ко") stringer3.position.x = stringer3.position.x + (a3 - b3);
            stringer3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1 + extraStep) - Math.max(h2, h3);
            if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1 + extraStep) - stringerWidth;
            stringer3.position.z = (M * 2 + b2 * stairAmt2 - stringerSideOffset) * turnFactor;
            if (turnType_1 == "площадка") stringer3.position.z = stringer3.position.z - (a2 - b2) * turnFactor;
            stringer3.castShadow = true;
            carcas.push(stringer3);
        }
        if (turnType_2 == "забег") {
            var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer3 = new THREE.Mesh(geom, stringerMaterial);
            stringer3.rotation.y = -1 * Math.PI * turnFactor;
            stringer3.position.x = b1 * stairAmt1 + M;
            //stringer3.position.y = h1*(stairAmt1 + 1) + h3*4 - Math.max(h1, h3);
            stringer3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1 + extraStep) + h3 - Math.max(h2, h3);
            if (stringerType == "ломаная") stringer3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1 + extraStep) + h3 - stringerWidth;
            stringer3.position.z = (M * 2 + b2 * stairAmt2 - stringerSideOffset) * turnFactor;
            if (turnType_1 == "площадка") stringer3.position.z = stringer3.position.z - (a2 - b2) * turnFactor;
            stringer3.castShadow = true;
            carcas.push(stringer3);
        }

        /*внутренний косоур верхнего марша*/

        stringerShape = drawStringer4(
            model, stringerTurn, stringerType,
            h2, b2, stairAmt2, h3, b3, stairAmt3, a3, L1, L2,
            tyrnLength, stringerSideOffset);


        if (turnType_2 == "площадка") {
            var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer4 = new THREE.Mesh(geom, stringerMaterial);
            stringer4.rotation.y = -1 * Math.PI * turnFactor;
            stringer4.position.x = b1 * stairAmt1;// + stringerThickness;
            stringer4.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1 + extraStep) - h3;
            stringer4.position.z = (M + b2 * stairAmt2 + stringerThickness + stringerSideOffset) * turnFactor;
            stringer4.castShadow = true;
            carcas.push(stringer4);
        }
        if (turnType_2 == "забег") {
            var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var stringer4 = new THREE.Mesh(geom, stringerMaterial);
            stringer4.rotation.y = -1 * Math.PI * turnFactor;
            stringer4.position.x = b1 * stairAmt1;
            stringer4.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1 + extraStep) - h3;
            stringer4.position.z = (M + b2 * stairAmt2 + stringerSideOffset) * turnFactor;
            stringer4.castShadow = true;
            carcas.push(stringer4);
        }

        /*внешний косоур среднего марша*/
        tyrnLength = M;
        var stringerPlatformHeight = Math.max(h1, h2);
        if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

        stringerShape = drawStringer5(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, tyrnLength, marshDist,
            stringerSideOffset);

        var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var stringer5 = new THREE.Mesh(geom, stringerMaterial);
        stringer5.rotation.y = -0.5 * Math.PI * turnFactor;
        stringer5.position.x = b1 * stairAmt1 + M - stringerSideOffset;
        stringer5.position.y = h1 * (stairAmt1 + 1) + h2 - stringerPlatformHeight;
        stringer5.position.z = 0;
        stringer5.castShadow = true;
        carcas.push(stringer5);

        if (turnType_1 == "площадка") {
            stringer5.position.y = stringer5.position.y - h2;
        }


        /*внутренний косоур среднего марша*/
        tyrnLength = M;
        var stringerPlatformHeight = Math.max(h1, h2);
        if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

        stringerShape = drawStringer6(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, tyrnLength,
            marshDist, stringerSideOffset);

        var geom = new THREE.ExtrudeGeometry(stringerShape, stringerExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var stringer6 = new THREE.Mesh(geom, stringerMaterial);
        stringer6.rotation.y = -0.5 * Math.PI * turnFactor;
        stringer6.position.x = b1 * stairAmt1 + stringerThickness + stringerSideOffset;
        stringer6.position.z = M * turnFactor;
        stringer6.castShadow = true;
        carcas.push(stringer6);

        if (turnType_1 == "площадка") {
            stringer6.position.y = h1 * (stairAmt1 + 1) - stringerPlatformHeight;
        }
        if (turnType_1 == "забег") {
            stringer6.position.y = h1 * (stairAmt1 + 1) - h2;
        }

        /*косоуры площадки*/

        if (platformTop == "площадка") {
            //var stringerWidth = 150;
            var geom = new THREE.BoxGeometry((platformLength_3 - a3), stringerWidth, stringerThickness);

            /*левый косоур площадки*/
            var platformStringer1 = new THREE.Mesh(geom, stringerMaterial);
            platformStringer1.position.x = platform_x - platformLength_3 / 2;
            platformStringer1.position.y = platform_y - stringerWidth / 2 + treadThickness / 2 - stringerOffset_y;
            platformStringer1.position.z = platform_z - (M / 2 - stringerThickness / 2 - stringerSideOffset) * turnFactor;
            platformStringer1.castShadow = true;
            carcas.push(platformStringer1);

            /*правый косоур площадки*/
            var platformStringer2 = new THREE.Mesh(geom, stringerMaterial);
            platformStringer2.position.x = platformStringer1.position.x;
            platformStringer2.position.y = platformStringer1.position.y; //- stringerOffset_y
            platformStringer2.position.z = platform_z + (M / 2 + stringerThickness / 2 - stringerSideOffset) * turnFactor;
            platformStringer2.castShadow = true;
            carcas.push(platformStringer2);

            /*задняя тетива площадки*/
            if (platformRearStringer == "есть") {
                var geom = new THREE.BoxGeometry(stringerThickness, stringerWidth, M);
                var platformStringer3 = new THREE.Mesh(geom, stringerMaterial);
                platformStringer3.position.x = platformStringer1.position.x - (platformLength_3 - a3 + stringerThickness) / 2;
                platformStringer3.position.y = platformStringer1.position.y - stringerOffset_y;
                platformStringer3.position.z = platform_z;
                platformStringer3.castShadow = true;
                carcas.push(platformStringer3);
            }

        }

        /***  ОГРАЖДЕНИЯ П-ОБРАЗНОЙ ТРЕХМАРШЕВОЙ ЛЕСТНИЦЫ  ***/

        /*замыкание поручней внешних секций верхнего и нижнего маршей*/
        var outerHandrailConnection = false;
        var outerHandrailConnection1 = false;
        var outerHandrailConnection2 = false;
        var isSection1 = false;
        var isSection2 = false;
        var isSection3 = false;
        if (railingSide_1 == "внешнее" || railingSide_1 == "две") isSection1 = true;
        if (railingSide_2 == "внешнее" || railingSide_2 == "две") isSection2 = true;
        if (railingSide_3 == "внешнее" || railingSide_3 == "две") isSection3 = true;
        if (isSection1 && isSection2) outerHandrailConnection1 = true;
        if (isSection2 && isSection3) outerHandrailConnection2 = true;
        lastMarsh = false;

        /*внешняя сторона нижнего марша*/

        if (railingSide_1 == "внешнее" || railingSide_1 == "две") {
            var topEnd = "площадка";
            if (turnType_1 == "забег") topEnd = "забег";
            var bottomEnd = "нет";
            var platformLengthBottom = 0;
            var platformLengthTop = M;
            var railingSide = "left";
            topConnection = outerHandrailConnection1;
            bottomConnection = false;
            railingPositionZ = -40;
            var railingSection1 = drawRailingSection(
                bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                railingSide, (stairAmt1 + 1), h1, b1, a1, h2, lastMarsh, topConnection, bottomConnection);
            ;
            railingSection1.position.z = railingPositionZ * turnFactor;
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
            railingPositionZ = M;
            var railingSection2 = drawRailingSection(
                bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                railingSide, stairAmt1, h1, b1, a1, h3, lastMarsh, topConnection, bottomConnection);
            ;
            railingSection2.position.z = railingPositionZ * turnFactor;
            railing.push(railingSection2);
        }

        /*внутренняя сторона среднего марша*/

        if (stairAmt2 != 0) {
            if (railingSide_2 == "внутреннее" || railingSide_2 == "две") {

                var topEnd = "нет";
                var bottomEnd = "нет";
                var platformLengthTop = 0;
                var platformLengthBottom = 0;
                var railingSide = "right";
                topConnection = false;
                bottomConnection = false;
                railingPositionZ = M;
                var railingSection6 = drawRailingSection(
                    bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                    railingSide, stairAmt2, h2, b2, a2, h3, lastMarsh, topConnection, bottomConnection);
                ;
                railingSection6.rotation.y = -Math.PI / 2 * turnFactor;
                railingSection6.position.x = stringer6.position.x - stringerThickness;
                if (model == "ко") railingSection6.position.x = railingSection6.position.x - stringerSideOffset;
                railingSection6.position.y = h1 * (stairAmt1 + 1); // + h3;
                if (turnType_1 == "забег") railingSection6.position.y = h1 * (stairAmt1 + 1) + 2 * h2;
                railingSection6.position.z = stringer6.position.z;
                railing.push(railingSection6);
            }
        }

        /*внешняя сторона среднего марша*/

        if (railingSide_2 == "внешнее" || railingSide_2 == "две") {

            var topEnd = "площадка";
            var bottomEnd = "площадка";
            var platformLengthTop = M;
            var platformLengthBottom = M;
            if (turnType_1 == "забег") bottomEnd = "забег";
            if (turnType_2 == "забег") topEnd = "забег";
            var railingSide = "left";
            topConnection = outerHandrailConnection1;
            bottomConnection = outerHandrailConnection2;
            //railingPositionZ = M;
            var railingSection5 = drawRailingSection(
                bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                railingSide, (stairAmt2 + 1), h2, b2, a2, h3, lastMarsh, topConnection, bottomConnection);
            railingSection5.rotation.y = -Math.PI / 2 * turnFactor;
            railingSection5.position.x = stringer5.position.x + 40;
            if (model == "ко") railingSection5.position.x = railingSection5.position.x + stringerSideOffset;
            railingSection5.position.y = h1 * (stairAmt1 + 1); // + h3;
            if (turnType_1 == "забег") railingSection5.position.y = h1 * (stairAmt1 + 1) + 2 * h2;
            railingSection5.position.z = M * turnFactor;
            railing.push(railingSection5);
        }

        lastMarsh = true;

        /*внешняя сторона верхнего марша*/

        if (railingSide_3 == "внешнее" || railingSide_3 == "две") {
            var topEnd = platformTop;
            var bottomEnd = "площадка";
            var platformLengthTop = platformLength_3;
            var platformLengthBottom = M;
            if (turnType_2 == "забег") bottomEnd = "забег";
            var railingSide = "left";
            topConnection = false;
            bottomConnection = outerHandrailConnection2;
            var railingSection3 = drawRailingSection(
                bottomEnd, platformLengthBottom, topEnd, platformLengthTop,
                railingSide, stairAmt3, h3, b3, a3, h3, lastMarsh, topConnection, bottomConnection);
            ;
            railingSection3.rotation.y = -Math.PI * turnFactor;
            railingSection3.position.x = b1 * stairAmt1;
            railingSection3.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
            if (turnType_1 == "забег") railingSection3.position.y += 2 * h2;
            if (turnType_2 == "забег") railingSection3.position.y += 2 * h3;
            railingSection3.position.z = stringer3.position.z + 40 * turnFactor;
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
            ;
            railingSection4.rotation.y = -Math.PI * turnFactor;
            railingSection4.position.x = b1 * stairAmt1;
            railingSection4.position.y = h1 * (stairAmt1 + 1) + h2 * (stairAmt2 + 1);
            if (turnType_1 == "забег") railingSection4.position.y += 2 * h2;
            if (turnType_2 == "забег") railingSection4.position.y += 2 * h3;
            railingSection4.position.z = stringer4.position.z - stringerThickness * turnFactor;
            if (model == "ко") railingSection4.position.z = railingSection4.position.z - stringerSideOffset * turnFactor;
            railing.push(railingSection4);
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
            //railingSection5.rotation.y = -Math.PI/2
            railingSection5.position.x = platformStringer1.position.x - (platformLength_3 - a3) / 2 - 40;//- M/2;
            railingSection5.position.y = platformStringer1.position.y + stringerWidth / 2 + stringerOffset_y;
            railingSection5.position.z = platformStringer1.position.z + (stringerThickness / 2 - stringerSideOffset) * turnFactor;
            if (model == "лт") railingSection5.position.x = railingSection5.position.x - stringerThickness;
            railing.push(railingSection5);
        }

    }//конец П-образной трехмаршевой


    //добавляем объекты в сцену

    addObjects(viewportId, treads, 'treads');
    addObjects(viewportId, risers, 'risers');
    addObjects(viewportId, carcas, 'carcas');
    addObjects(viewportId, railing, 'railing');
    addObjects(viewportId, topFloor, 'topFloor');
    addObjects(viewportId, angles, 'angles');

}; //end of drawStair
