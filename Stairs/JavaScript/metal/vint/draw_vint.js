//создаем глобальные массивы
var treads = [];
var risers = [];
var carcas = [];
var railing = [];
var topFloor = [];


var dxfPrimitivesArr = [];
var stairParams = {};


//функция - оболочка
function drawStaircase(viewportId, isVisible) {

    /*удаляем предыдущую лестницу*/
    if (treads) removeObjects(viewportId, 'treads');
    if (risers) removeObjects(viewportId, 'risers');
    if (carcas) removeObjects(viewportId, 'carcas');
    if (railing) removeObjects(viewportId, 'railing');
    if (topFloor) removeObjects(viewportId, 'topFloor');

    //очищаем глобальные массивы
    treads = [];
    risers = [];
    carcas = [];
    railing = [];
    topFloor = [];

    //обнуляем массив примитивов dxfBasePoint
    dxfPrimitivesArr = [];

    //локальный массив элементов лестницы
    var stairCase = [];

    /*вспомогательные оси*/
    var axes = new THREE.AxisHelper(2000);
    topFloor.push(axes);

    /*параметры лестницы*/
    var treadMaterial = getInputValue("treadMaterial");
    var staircaseHeight = getInputValue("staircaseHeight");
    var stepAmt = getInputValue("stepAmt");
    var staircaseDiam = getInputValue("staircaseDiam");
    var stepAngle = getInputValue("stepAngle");
    var platformAngle = getInputValue("platformAngle");
    var platformPosition = getInputValue("platformPosition");
    var handrailMaterial = getInputValue("handrailMaterial");
    var banisterPerStep = getInputValue("banisterPerStep");
    var columnDiam = getInputValue("columnDiam");
    var platformLedge = params.platformLedge;
    var turnFactor = params.turnFactor * 1;
    var treadLowRad = 75;
    var treadThickness = params.treadThickness;
    stairParams.treadThickness = treadThickness;
    var holeDiam = 22;
    var stairAmt = stepAmt - 1;
    if (platformPosition == "ниже") stairAmt = stepAmt - 2;
    stairParams.stairAmt = stairAmt;
    var botFloorType = params.botFloorType;

    var stairType = "timber";
    if (treadMaterial == "рифленая сталь" || treadMaterial == "лотки под плитку") stairType = "metal";


    //расчет подъема ступени
    var regShimAmt = params.regShimAmt;
    var regShimThk = 4; //толщина с учетом слоя краски
    var stepHeight = Math.floor((staircaseHeight - 20) / stepAmt);

    //заносим значения в глобальный массив параметров
    stairParams.stepHeight = stepHeight;
    console.log(stairParams.stepHeight)
    stairParams.stepAngle = stepAngle;
    stairParams.platformAngle = platformAngle;

    //переводим углы в радианы
    stepAngle = stepAngle / 180 * Math.PI;
    platformAngle = platformAngle / 180 * Math.PI;

    /*Материалы*/
    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var metalMaterial = new THREE.MeshLambertMaterial({ color: 0x363636, wireframe: false });
    var metalMaterial1 = new THREE.MeshLambertMaterial({ color: 0x333000, wireframe: false });
    var metalMaterial2 = new THREE.MeshLambertMaterial({ color: 0xBD3000, wireframe: false });
    var shimMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, wireframe: false });
    var floorMaterial = new THREE.MeshLambertMaterial({ color: 0xBFBFBF });

    var treadExtrudeOptions = {
        amount: treadThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    /*Угол ступени с учетом нахлеста ступеней*/
    var treadOverlayArcLength = 60; //длина дуги нахлеста ступеней на внешнем радиусе
    var treadOverlayArcAngle = treadOverlayArcLength / (staircaseDiam / 2);
    var treadAngle = stepAngle + treadOverlayArcAngle;





    /*
    var treadShape = drawVintTreadShape(treadParams);
    var geom = new THREE.ExtrudeGeometry(treadShape, treadExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
*/
    /*начальный угол лестницы*/

    var treadExtraAngle = Math.asin(treadLowRad / (staircaseDiam / 2));
    var platformDepth = staircaseDiam / 2 + platformLedge;
    var L1 = platformDepth / Math.cos(platformAngle / 2);
    var platformWidth = 2 * platformDepth / Math.sin(platformAngle / 2);
    var platformExtraAngle = Math.asin(treadLowRad / L1);
    var staircaseAngle = stairAmt * stepAngle + platformAngle / 2 - treadExtraAngle

    var startAngle = Math.PI - staircaseAngle;
    startAngle = startAngle * turnFactor
    if (turnFactor == -1) {
        var edgeAngle = treadAngle - 2 * Math.asin(treadLowRad / (staircaseDiam / 2));
        startAngle = startAngle - edgeAngle;
    }

    //startAngle = 0;

    stairParams.stairCaseAngle = staircaseAngle;

    /*ступени*/

    addVintTreads();

    function addVintTreads() {

        var treadParams = {
            staircaseDiam: staircaseDiam,
            treadAngle: treadAngle,
            treadLowRad: treadLowRad,
            columnDiam: columnDiam,
            holeDiam: holeDiam,
            type: "timber",
            overlayAngle: treadOverlayArcAngle,
            thk: treadThickness,
            material: timberMaterial,
        }
        if (treadMaterial == "рифленая сталь" || treadMaterial == "лотки под плитку") {
            treadParams.type = "metal";
            treadParams.material = metalMaterial;
        }

        //отрисовывамем винтовую ступень
        var posY = stepHeight;

        for (var i = 0; i < stairAmt; i++) {

            if (stairType != "metal" && i < regShimAmt) posY += regShimThk;

            treadParams = drawVintTread(treadParams);
            var tread = treadParams.mesh;
            tread.rotation.y = stepAngle * i * turnFactor + startAngle;
            tread.position.x = 0;
            tread.position.y = posY; //stepHeight * (i + 1)// - treadThickness;
            tread.position.z = 0;
            tread.castShadow = true;
            treads.push(tread);

            posY += stepHeight;
            if (stairType == "metal" && i < regShimAmt) posY += regShimThk;



            /*
            var turnStep1 = new THREE.Mesh(geom, meshTreadMaterial);
        	
            turnStep1.rotation.x = -0.5*Math.PI;
            turnStep1.rotation.z = stepAngle * i* turnFactor + startAngle;	
            turnStep1.position.x = 0;
            turnStep1.position.y =stepHeight* (i + 1) - treadThickness;
            turnStep1.position.z = 0;	
            turnStep1.castShadow = true;
            treads.push(turnStep1);	
            */
        }

    }
    /*бобышки*/

    addVintSpacers();

    function addVintSpacers() {

        var radiusTop = columnDiam / 2;
        var radiusBottom = radiusTop;
        var radialSegments = 36;
        var heightSegments = 1;
        var openEnded = false;
        var botFlanThk = 8;
        var middleFlanThk = 4;

        //первая бобышка
        var height = stepHeight - treadThickness - middleFlanThk - botFlanThk;
        if (stairType == "metal") height = stepHeight - botFlanThk;
        if (botFloorType == "черновой") height += params.botFloorsDist;
        var geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
        var spacer = new THREE.Mesh(geom, metalMaterial);
        spacer.position.x = 0;
        spacer.position.y = height / 2 + botFlanThk;
        if (botFloorType == "черновой") spacer.position.y -= params.botFloorsDist;
        spacer.position.z = 0;
        carcas.push(spacer);
        //сохраняем размер для спецификации
        stairParams.drumHeight_1 = height;

        //остальные бобышки

        var height = stepHeight - treadThickness - middleFlanThk;
        if (stairType == "metal") height = stepHeight - middleFlanThk;

        var geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
        posY = height / 2 + stepHeight;
        for (var i = 1; i < stairAmt + 1; i++) {
            //регулировочная шайба
            if (i <= regShimAmt) {
                posY += regShimThk;
            }
            var spacer = new THREE.Mesh(geom, metalMaterial);
            spacer.position.x = 0;
            spacer.position.y = posY;//height/2 +stepHeight * i;
            if (stairType == "metal") spacer.position.y += middleFlanThk;
            spacer.position.z = 0;
            spacer.castShadow = true;
            carcas.push(spacer);
            posY += stepHeight;
        }

        //сохраняем размер для спецификации
        stairParams.drumHeight_2 = height;

        //нижний фланец

        var flanParams = {
            material: metalMaterial1,
            dxfArr: dxfPrimitivesArr,
            dxfBasePoint: { x: -1000, y: 0, },
        }

        //отрисовываем нижний фланец
        flanParams = drawBotFlan(flanParams)

        var botFlan = flanParams.mesh;
        if (botFloorType == "черновой") botFlan.position.y = -params.botFloorsDist;
        carcas.push(botFlan);


        //средние фланцы
        var height = middleFlanThk;
        var geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)

        posY = -0.5 * height + stepHeight - treadThickness;
        for (var i = 0; i < stairAmt + 1; i++) {

            var spacerFlan = new THREE.Mesh(geom, metalMaterial1);
            spacerFlan.position.x = 0;
            spacerFlan.position.y = posY//-height/2 + stepHeight * (i+1) - treadThickness;
            if (stairType == "metal") spacerFlan.position.y += treadThickness + height;
            carcas.push(spacerFlan);
            posY += stepHeight;
            //регулировочная шайба
            if (i < regShimAmt) {
                posY += regShimThk;
            }

        }

        //верхний фланец для деревянной лестницы
        if (stairType == "timber") {
            var topFlan = new THREE.Mesh(geom, metalMaterial1);
            topFlan.position.y = height / 2 + stepHeight * (stairAmt + 1) + regShimAmt * regShimThk;
            carcas.push(topFlan);
        }

        //регулировочные шайбы
        var height = regShimThk;
        var geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)

        for (var i = 0; i < regShimAmt; i++) {
            var regShim = new THREE.Mesh(geom, shimMaterial);
            regShim.position.x = 0;
            regShim.position.y = -0.5 * height + (stepHeight + regShimThk) * (i + 1) - treadThickness;
            if (stairType == "metal") regShim.position.y += treadThickness + height;
            carcas.push(regShim);
        }

    }

    /*площадка*/

    addVintPlatform();

    function addVintPlatform() {

        var vintPlatformParams = {
            platformAngle: platformAngle,
            platformDepth: platformDepth,
            treadLowRad: treadLowRad,
            columnDiam: columnDiam,
            holeDiam: holeDiam,
            type: "timber",
            overlayAngle: treadOverlayArcAngle,
            thk: treadThickness,
            material: timberMaterial,
            turnFactor: turnFactor,
            dxfArr: dxfPrimitivesArr,
            dxfBasePoint: { x: 1000, y: -1000, },
            railingFlanSize: 76,
            railingFlanHoleDst: 55,
        }
        if (treadMaterial == "рифленая сталь" || treadMaterial == "лотки под плитку") {
            vintPlatformParams.type = "metal";
            vintPlatformParams.material = metalMaterial;
        }

        //отрисовываем площадку
        vintPlatformParams = drawVintPlatform(vintPlatformParams)
        var platform = vintPlatformParams.mesh;

        platform.rotation.y = (platformExtraAngle - platformAngle / 2 + Math.PI);
        if (turnFactor == -1) platform.rotation.y = -(platformExtraAngle - platformAngle / 2 + Math.PI);
        platform.position.x = 0;
        platform.position.y = stepHeight * (stairAmt + 1) + regShimAmt * regShimThk;
        platform.position.z = 0;
        platform.castShadow = true;
        treads.push(platform);
    }

    /*Параметры стоек*/
    var banisterProfileSize = 20;
    var banisterBottomOverhang = 36; //выступ балясини ниже нижней поверхности ступени
    var botLedge = banisterBottomOverhang + params.treadThickness; //выступ балясины ниже верхней поверхности ступени

    var railingHeight = 900; //номинальная высота ограждения в начале ступени
    var banisterHoleDist = []; //расстояние между отверстиями для уголков на балясинах

    //стартовая балясина
    var startBanisterLength = railingHeight + stepHeight;
    banisterHoleDist[0] = stairParams.stepHeight - params.treadThickness - 31 + 2;
    //if(params.treadMaterial == "рифленая сталь") banisterHoleDist[0] = stairParams.stepHeight - 46;
    if (botFloorType == "черновой") {
        startBanisterLength -= params.botFloorsDist;
        banisterHoleDist[0] += params.botFloorsDist;
    }
    stairParams.startBanisterLength = startBanisterLength;


    //длинные балясины
    var longBanisterLength = railingHeight + stepHeight + botLedge;
    stairParams.longBanisterLength = longBanisterLength;
    banisterHoleDist[1] = stairParams.stepHeight + 2;

    var banistrPositionAngle0 = treadExtraAngle - treadOverlayArcAngle / 2 - startAngle;
    if (turnFactor == -1) banistrPositionAngle0 = banistrPositionAngle0 - stepAngle;
    var banisterPositionRad = staircaseDiam / 2 //+ banisterProfileSize/2;

    var dxfBasePoint = { x: 0, y: 1000 }
    var balParams = {
        balMaterial: metalMaterial,
        angMaterial: metalMaterial1,
        dxfArr: dxfPrimitivesArr,
        dxfBasePoint: dxfBasePoint,
        size: banisterProfileSize,
        length: startBanisterLength,
        holeDst: 100,
        topHole: "yes",
        type: "first",
        angleShift: 0,
        text: "Первая балясина"
    }

    //сохраняем размеры для спецификации
    stairParams.banisterHoleDist = banisterHoleDist;

    /*Длинные стойки ограждений*/

    addVintLongBanisters();

    function addVintLongBanisters() {


        var banistrPositionAngle;
        /*
        //первая балясина
            var geom = new THREE.BoxGeometry( banisterProfileSize, startBanisterLength, banisterProfileSize);
            var i=0;
            var startBanister = new THREE.Mesh(geom, metalMaterial);
            banistrPositionAngle = (-stepAngle * i * turnFactor + banistrPositionAngle0);
            startBanister.rotation.y = -banistrPositionAngle;	
            startBanister.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
            startBanister.position.y = startBanisterLength/2 // +stepHeight * i - treadThickness - banisterBottomOverhang;
            startBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);	
            startBanister.castShadow = true;
            railing.push(startBanister);
        */


        //первая балясина
        balParams.holeDst = banisterHoleDist[0];
        balParams.angleShift = -2;
        if (regShimAmt > 0) balParams.angleShift = 2;
        if (stairType == "metal") balParams.angleShift = -2;
        balParams = drawBal(balParams);

        var startBanister = balParams.mesh;
        banistrPositionAngle = banistrPositionAngle0;
        startBanister.rotation.y = -banistrPositionAngle - Math.PI / 2;
        startBanister.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
        startBanister.position.y = 0
        if (botFloorType == "черновой") startBanister.position.y = -params.botFloorsDist;
        startBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
        startBanister.castShadow = true;
        railing.push(startBanister);

        //остальные балясины
        balParams.length = longBanisterLength;
        balParams.holeDst = banisterHoleDist[1];
        balParams.type = "long";
        balParams.text = "Длинные балясины";
        balParams.dxfBasePoint = { x: 750, y: 1000 }

        posY = stepHeight - treadThickness - banisterBottomOverhang;
        for (var i = 1; i < stairAmt + 1; i++) {
            //учитываем регулировочную шайбу
            balParams.angleShift = -2;
            if (i <= regShimAmt) {
                if (stairType != "metal") posY += regShimThk;
                if (i != regShimAmt) balParams.angleShift = 2;
            }

            balParams = drawBal(balParams);
            var longBanister = balParams.mesh;
            banistrPositionAngle = (-stepAngle * i * turnFactor + banistrPositionAngle0);
            longBanister.rotation.y = -banistrPositionAngle - Math.PI / 2;
            longBanister.position.x = (banisterPositionRad) * Math.cos(banistrPositionAngle);
            longBanister.position.y = posY;//stepHeight * i - treadThickness - banisterBottomOverhang;
            longBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
            longBanister.castShadow = true;
            railing.push(longBanister);
            balParams.dxfArr = []; //выводим в dxf только одну балясину	
            posY += stepHeight;
            if (i <= regShimAmt && stairType == "metal") posY += regShimThk;
        }


    }


    /*короткие стойки ограждений*/

    if (banisterPerStep > 1) addVintShortBanisters();

    function addVintShortBanisters() {

        var shortBanisterPerStep = banisterPerStep - 1;
        var banisterExtraLength = stepHeight / banisterPerStep;
        balParams.dxfBasePoint = { x: 1300, y: 1000 }
        balParams.text = "Промежуточные балясины";
        stairParams.shortBanisterLength = [];

        //добавляем балясины
        for (var j = 0; j < shortBanisterPerStep; j++) {
            var shortBanisterLength = longBanisterLength - stepHeight + banisterExtraLength * (j + 1);
            if (turnFactor == -1)
                shortBanisterLength = longBanisterLength - stepHeight + banisterExtraLength * (shortBanisterPerStep - j);
            var geom = new THREE.BoxGeometry(banisterProfileSize, shortBanisterLength, banisterProfileSize);
            var banistrPositionAngle1 = treadExtraAngle - treadOverlayArcAngle / 2 - stepAngle / banisterPerStep * (j + 1) - startAngle;
            //banistrPositionAngle1  = banistrPositionAngle1 * turnFactor;
            var banisterPositionRad = staircaseDiam / 2 //+ banisterProfileSize/2;

            balParams.length = shortBanisterLength;
            balParams.type = "middle";
            balParams.dxfArr = dxfPrimitivesArr; //выводим каждую промежуточную балясину по одному разу
            balParams.dxfBasePoint.x += 200;

            posY = stepHeight - treadThickness - banisterBottomOverhang;
            for (var i = 0; i < stairAmt; i++) {
                //учитываем регулировочную шайбу
                if (i < regShimAmt && stairType != "metal") posY += regShimThk;

                balParams = drawBal(balParams);
                var middleBanister = balParams.mesh;
                var banistrPositionAngle = -stepAngle * i * turnFactor + banistrPositionAngle1;
                middleBanister.rotation.y = -banistrPositionAngle - Math.PI / 2;
                middleBanister.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
                middleBanister.position.y = posY//stepHeight* (i + 1) - treadThickness - banisterBottomOverhang;
                middleBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
                middleBanister.castShadow = true;
                railing.push(middleBanister);
                balParams.dxfArr = []; //выводим только первую балясину
                balParams.text = "";
                posY += stepHeight;
                if (i < regShimAmt && stairType == "metal") posY += regShimThk;
            }
            //сохраняем размер для спецификации
            stairParams.shortBanisterLength.push(shortBanisterLength);
        }
    }

    /*поручень*/

    addVintHandrail();

    function addVintHandrail() {
        /*координаты верхних точек балЯсин*/
        var handrailPoints = [];
        banisterPositionRad += 10;
        posY = longBanisterLength / 2 - treadThickness - banisterBottomOverhang + longBanisterLength / 2;
        for (var i = 0; i < stairAmt + 1; i++) {
            banistrPositionAngle = -stepAngle * i * turnFactor + banistrPositionAngle0;
            var p1_x = banisterPositionRad * Math.cos(banistrPositionAngle);
            var p1_y = posY//longBanisterLength/2 +stepHeight * i - treadThickness - banisterBottomOverhang + longBanisterLength/2;
            var p1_z = banisterPositionRad * Math.sin(banistrPositionAngle);

            //выступ за первую стойку
            if (i == 0) {
                var j = -0.25
                banistrPositionAngle = -stepAngle * j * turnFactor + banistrPositionAngle0;
                var p0_x = banisterPositionRad * Math.cos(banistrPositionAngle);
                var p0_y = posY + stepHeight * j// - treadThickness - banisterBottomOverhang + longBanisterLength/2
                var p0_z = banisterPositionRad * Math.sin(banistrPositionAngle);
                handrailPoints.push(new THREE.Vector3(p0_x, p0_y, p0_z));
            }
            //остальные стойки
            handrailPoints.push(new THREE.Vector3(p1_x, p1_y, p1_z));
            //выступ за последнюю стойку
            if (i == stairAmt) {
                var j = 0.25
                banistrPositionAngle = -stepAngle * (i + j) * turnFactor + banistrPositionAngle0;
                var p0_x = banisterPositionRad * Math.cos(banistrPositionAngle);
                var p0_y = posY + stepHeight * j// - treadThickness - banisterBottomOverhang + longBanisterLength/2
                var p0_z = banisterPositionRad * Math.sin(banistrPositionAngle);
                handrailPoints.push(new THREE.Vector3(p0_x, p0_y, p0_z));
            }
            posY += stepHeight;
            if (i < regShimAmt) {
                posY += regShimThk;
            }
        }
        var handrailSpline = new THREE.CatmullRomCurve3(handrailPoints);
        var extrudeSettings = {
            steps: 200,
            bevelEnabled: false,
            extrudePath: handrailSpline
        };


        var shape = new THREE.Shape();
        shape.absarc(0, 0, 20, 0, 2 * Math.PI, true)

        /*прямоугольный поручень - не работает	
        if( handrailType == "40х60"){
        var shape = new THREE.Shape();
            shape.moveTo(-20, -30);
            shape.lineTo(-20, 30);
            shape.lineTo(20, 30);
            shape.lineTo(20, -30);
            shape.lineTo(-20, -30);
        }
        */

        var meshHandrailMaterial = timberMaterial;
        if (handrailMaterial == "Нержавейка" || handrailMaterial == "Алюминий")
            meshHandrailMaterial = metalMaterial;

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var handrailMesh = new THREE.Mesh(geometry, meshHandrailMaterial);

        //поднимаем поручень для контроля длины балясины
        handrailMesh.position.y += 20;
        railing.push(handrailMesh);
    }//end of addVintHandrail()

    /* секция ограждений площадки*/

    addPlatformRailingSection();

    /*вспомогательные оси*
    var axes2 = new THREE.AxisHelper( 2000 );
    axes2.position.y= stepHeight * stepAmt// - treadThickness;
    railing.push(axes2);
    */


    function addPlatformRailingSection() {
        var sectionExtrudeOptions = {
            amount: 20,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };

        var L1 = platformDepth / Math.cos(platformAngle / 2);
        var extraAngle = Math.asin(treadLowRad / L1);
        var edgeLength = L1 * Math.cos(extraAngle);


        var sectionLength = params.platformSectionLength - 120; //edgeLength - 160 - 50;
        stairParams.sectionLength = sectionLength;
        var sectionShape = drawPlatformRailingSectionShape(sectionLength);
        var sectionTyrnAngle = (platformAngle / 2 - platformExtraAngle) * turnFactor;
        var geom = new THREE.ExtrudeGeometry(sectionShape, sectionExtrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var railingSection = new THREE.Mesh(geom, metalMaterial);
        railingSection.rotation.y = Math.PI + sectionTyrnAngle;
        railingSection.position.x = -20 * Math.cos(sectionTyrnAngle) + 10 * Math.sin(sectionTyrnAngle);
        railingSection.position.y = stepHeight * (stairAmt + 1) + 100 + regShimAmt * regShimThk;
        railingSection.position.z = 20 * Math.sin(sectionTyrnAngle) + 10 * Math.cos(sectionTyrnAngle);
        railingSection.castShadow = true;
        railing.push(railingSection);

        /*внутренняя стойка*/
        var rackLength = 850 - 4
        var geometry = new THREE.BoxGeometry(40, rackLength, 40);
        var rack1 = new THREE.Mesh(geometry, metalMaterial);
        rack1.castShadow = true;
        rack1.rotation.y = sectionTyrnAngle
        rack1.position.y = stepHeight * (stairAmt + 1) + rackLength / 2 + 4 + regShimAmt * regShimThk;
        rack1.position.x = 0;
        rack1.position.z = 0;
        railing.push(rack1);

        //фланец	
        var flanParams = {
            material: metalMaterial,
            dxfArr: dxfPrimitivesArr,
            dxfBasePoint: { x: 1000, y: -1000, },
            size: 76,
            holeDst: 55,
        }
        flanParams = drawPlatformRailingFlan(flanParams)
        var botFlan = flanParams.mesh;
        botFlan.position.y = stepHeight * (stairAmt + 1) + 4 + regShimAmt * regShimThk;
        botFlan.rotation.y = sectionTyrnAngle
        railing.push(botFlan);

        /*кронштейн поручня*/
        var geometry = new THREE.CylinderGeometry(6, 6, 70);
        var handrailHolder = new THREE.Mesh(geometry, metalMaterial);
        handrailHolder.castShadow = true;
        handrailHolder.rotation.y = sectionTyrnAngle
        handrailHolder.position.y = stepHeight * (stairAmt + 1) + 35 + rackLength + 4 + regShimAmt * regShimThk;
        handrailHolder.position.x = 0;
        handrailHolder.position.z = 0;
        railing.push(handrailHolder);

        /*внeшняя стойка*/
        var rackLength = 850;
        geometry = new THREE.BoxGeometry(40, rackLength, 40);
        rack1 = new THREE.Mesh(geometry, metalMaterial);
        rack1.castShadow = true;
        rack1.rotation.y = sectionTyrnAngle;
        rack1.position.y = stepHeight * (stairAmt + 1) + rackLength / 2 + regShimAmt * regShimThk;
        rack1.position.x = -(sectionLength + 40) * Math.cos(sectionTyrnAngle);
        rack1.position.z = (sectionLength + 40) * Math.sin(sectionTyrnAngle);
        railing.push(rack1);

        //фланец	
        flanParams.dxfArr = []; //Не выводим в dxf
        flanParams = drawPlatformRailingFlan(flanParams)
        var botFlan = flanParams.mesh;
        botFlan.position.y = stepHeight * (stairAmt + 1) + regShimAmt * regShimThk;
        botFlan.position.x = rack1.position.x;
        botFlan.position.z = rack1.position.z;
        botFlan.rotation.y = sectionTyrnAngle
        railing.push(botFlan);

        /*кронштейн поручня*/
        var geometry = new THREE.CylinderGeometry(6, 6, 70);
        var handrailHolder = new THREE.Mesh(geometry, metalMaterial);
        handrailHolder.castShadow = true;
        handrailHolder.position.y = stepHeight * (stairAmt + 1) + 35 + rackLength + regShimAmt * regShimThk;
        handrailHolder.position.x = -(sectionLength + 40) * Math.cos(sectionTyrnAngle);
        handrailHolder.position.z = (sectionLength + 40) * Math.sin(sectionTyrnAngle);
        railing.push(handrailHolder);

        /*поручень*/
        var handrailPlatformLength = params.platformSectionLength//edgeLength-50;
        stairParams.handrailPlatformLength = handrailPlatformLength;
        var geometry = new THREE.CylinderGeometry(20, 20, handrailPlatformLength);
        var meshHandrailMaterial = timberMaterial;
        if (handrailMaterial == "Нержавейка" || handrailMaterial == "Алюминий")
            meshHandrailMaterial = metalMaterial;
        var handrail = new THREE.Mesh(geometry, meshHandrailMaterial);
        handrail.castShadow = true;
        handrail.rotation.x = -Math.PI / 2;
        handrail.rotation.z = sectionTyrnAngle + Math.PI / 2;
        handrail.position.y = stepHeight * (stairAmt + 1) + 85 + rackLength + regShimAmt * regShimThk;
        handrail.position.x = -(sectionLength + 40) * Math.cos(sectionTyrnAngle) / 2;
        handrail.position.z = (sectionLength + 40) * Math.sin(sectionTyrnAngle) / 2;
        railing.push(handrail);


    };//end of addPlatformRailingSection();



    //поворачиваем лестницу
    var rot = Math.PI + params.stairCaseRotation / 180 * Math.PI;
    var pos = {
        x: params.staircaseDiam / 2 + params.platformLedge,
        y: 0,
        z: params.staircaseDiam / 2 + 50,
    }
    var model = [
        treads,
        risers,
        carcas,
        railing,
    ]
    var modelObj = [];

    for (var i = 0; i < model.length; i++) {
        modelObj[i] = new THREE.Object3D();

        for (var j = 0; j < model[i].length; j++) {
            modelObj[i].add(model[i][j]);
        }
        modelObj[i].position.x += -pos.x + params.staircasePosX;
        modelObj[i].position.y += -pos.y + params.staircasePosY;
        modelObj[i].position.z += pos.z + params.staircasePosZ;
        modelObj[i].rotation.y = rot;
    }
    treads = [
        modelObj[0],
    ]
    risers = [
        modelObj[1],
    ]
    carcas = [
        modelObj[2],
    ]
    railing = [
        modelObj[3],
    ]



    // добавляем ребра объектов

    for (var i = carcas.length - 1; i > -1; i--) {
        addWareframe(carcas[i], carcas);
    }

    for (var i = treads.length - 1; i > -1; i--) {
        addWareframe(treads[i], treads);
    }

    for (var i = railing.length - 1; i > -1; i--) {
        addWareframe(railing[i], railing);
    }




    //добавляем объекты в сцену
    addObjects(viewportId, treads, 'treads');
    addObjects(viewportId, risers, 'risers');
    addObjects(viewportId, carcas, 'carcas');
    addObjects(viewportId, railing, 'railing');
    addObjects(viewportId, topFloor, 'topFloor');


    //выводим параметры геометрии

    printGeomParams();

}//end of drawVintStaircase(scene);

function printGeomParams() {
    var radianFactor = 180 / Math.PI;
    document.getElementById("geometry").innerHTML =
        "<h2>Расчетные параметры геометрии лестницы</h2>" +
        "Кол-во ступеней = " + stairParams.stairAmt + " шт + площадка<br/>" +
        "Подъем ступени = " + stairParams.stepHeight + " мм<br/>" +
        "Угол проступи treadAngle = " + Math.round(stairParams.treadAngle * radianFactor * 10) / 10 + "&deg;<br/>" +
        "Угол шага ступени stepAngle = " + Math.round(stairParams.stepAngle * 10) / 10 + "&deg;<br/>" +
        "Угол ребер ступени edgeAngle = " + Math.round(stairParams.treadEdgeAngle * radianFactor * 10) / 10 + "&deg;<br/>" +
        "Угол поворота лестницы  stairCaseAngle = " + Math.round(stairParams.stairCaseAngle * radianFactor * 10) / 10 + "&deg;<br/>" +
        "Угол площадки platformAngle = " + Math.round(stairParams.platformAngle * 10) / 10 + "&deg;<br/>" +
        "Угол ребер площадки edgeAngle = " + Math.round(stairParams.platformEdgeAngle * radianFactor * 10) / 10 + "&deg;<br/>" +
        "Глубина площадки platformDepth = " + Math.round(stairParams.platformDepth * 10) / 10 + " мм<br/>" +
        "Ширина площадки на выходе platformWidth = " + Math.round(stairParams.platformWidth * 10) / 10 + " мм";


}//end of printGeomParams()

function drawVintTreadShape(par) {

    /*чертеж ступени с обозначением параметров здесь:
    http://6692035.ru/calculator/vint/autoCad/vintTread.pdf
    */

    //локальные переменные
    var staircaseDiam = par.staircaseDiam;
    var treadAngle = par.treadAngle;
    var treadLowRad = par.treadLowRad;
    var columnRad = par.columnDiam / 2 + params.carcasPartsSpacing; //учитываем зазор для тестирования
    var holeDiam = par.holeDiam;
    var type = par.type;
    var stairRad = staircaseDiam / 2;
    var overlayAngle = par.overlayAngle;

    /*рассчитываем угол между ребрами ступени*/
    var extraAngle = Math.asin(treadLowRad / stairRad);
    var edgeLength = stairRad * Math.cos(extraAngle);
    var edgeAngle = treadAngle - 2 * extraAngle;


    //сохраняем значения в массив параметров
    stairParams.treadAngle = treadAngle;
    stairParams.treadEdgeAngle = edgeAngle;

    //деревянная ступень
    if (type == "timber") {
        /*рассчитываем координаты точек*/
        var p0 = { x: 0, y: 0 }
        var p1 = {
            x: 0,
            y: -treadLowRad,
        }
        var p2 = {
            x: -treadLowRad * Math.sin(edgeAngle),
            y: treadLowRad * Math.cos(edgeAngle)
        }
        var p3 = {
            x: stairRad * Math.cos(treadAngle - extraAngle),
            y: stairRad * Math.sin(treadAngle - extraAngle)
        }
        var p4 = {
            x: edgeLength,
            y: -treadLowRad
        }
        var dxfBasePoint = {
            x: 0,
            y: 0,
        }

        /*вычерчиваем конутр ступени*/

        var treadShape = new THREE.Shape();
        addArc(treadShape, dxfPrimitivesArr, p0, treadLowRad, 1.5 * Math.PI, (Math.PI / 2 + edgeAngle), dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addArc(treadShape, dxfPrimitivesArr, p0, stairRad, (treadAngle - extraAngle), -extraAngle, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p4, p1, dxfBasePoint);

        /*отверстие*/
        var hole = new THREE.Path();
        addCircle(hole, dxfPrimitivesArr, p0, holeDiam / 2, dxfBasePoint)
        //hole.absarc(p0.x, p0.y, holeDiam/2, 0, 2*Math.PI, true)
        treadShape.holes.push(hole);

        //Направление волокон
        var trashShape = new THREE.Shape();
        var pt1 = newPoint_xy(p0, 200, 0)
        var pt11 = newPoint_xy(pt1, 40, 10)
        var pt12 = newPoint_xy(pt1, 40, -10)
        addLine(trashShape, dxfPrimitivesArr, pt1, pt11, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, pt1, pt12, dxfBasePoint);
        var pt2 = newPoint_xy(pt1, 400, 0)
        var pt21 = newPoint_xy(pt2, -40, 10)
        var pt22 = newPoint_xy(pt2, -40, -10)
        addLine(trashShape, dxfPrimitivesArr, pt2, pt21, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, pt2, pt22, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, pt1, pt2, dxfBasePoint);

        var text = "Направление волокон"
        var textHeight = 20;
        var textBasePoint = newPoint_xy(dxfBasePoint, 210, 30);
        addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
    }

    /*металлическая ступень*/

    if (type == "metal") {

        var deltaAng = Math.PI / 6; //половина угла, на который уменьшается дуга ступени, прилегающая к бобышке
        /*рассчитываем координаты точек*/
        var p0 = { x: 0, y: 0 }
        var p11 = polar(p0, -Math.PI / 2 + deltaAng, columnRad); //точка на дуге
        var p1 = polar(p11, -Math.PI / 2, 5);
        var p21 = polar(p0, edgeAngle + Math.PI / 2 - deltaAng, columnRad) //точка на дуге
        var p2 = polar(p21, Math.PI / 2 + edgeAngle, 5);

        var p3 = {
            x: stairRad * Math.cos(treadAngle - extraAngle),
            y: stairRad * Math.sin(treadAngle - extraAngle)
        }
        var p4 = {
            x: edgeLength,
            y: -treadLowRad
        }

        var dxfBasePoint = {
            x: 0,
            y: 0,
        }

        /*вычерчиваем конутр ступени*/

        var treadShape = new THREE.Shape();
        addLine(treadShape, dxfPrimitivesArr, p1, p11, dxfBasePoint);
        addArc(treadShape, dxfPrimitivesArr, p0, columnRad, -Math.PI / 2 + deltaAng, (Math.PI / 2 + edgeAngle - deltaAng), dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p21, p2, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addArc(treadShape, dxfPrimitivesArr, p0, stairRad, (treadAngle - extraAngle), -extraAngle, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p4, p1, dxfBasePoint);

        //параметры для передней пластины
        par.edgeLength = distance(p4, p1)
        par.p1 = p1;
        par.p2 = p2;
        par.ang1 = angle(p1, p4)
        par.ang2 = angle(p2, p3)
        /*отверстия под стойки*/

        //отверстия под первую балясину
        var holesOffset = 22; //отступ отверстий от внешней кромки ступени
        var holeDst = 24; //расстояние между отверстиями в уголке
        var holePosRad = stairRad - holesOffset; //радиус расположения отверстий
        var dirAng = overlayAngle / 2 - extraAngle //угол направления на балясину
        var deltAng = holeDst / 2 / holePosRad; //дельта угла из-за того, что в уголке 2 отверстия

        var holeRad = 3.5;
        var center1 = polar(p0, dirAng + deltAng, holePosRad)
        var center2 = polar(p0, dirAng - deltAng, holePosRad)
        addRoundHole(treadShape, dxfPrimitivesArr, center1, holeRad, dxfBasePoint); //функция в файле drawPrimitives
        addRoundHole(treadShape, dxfPrimitivesArr, center2, holeRad, dxfBasePoint);

        //отверстия под остальные стойки
        var stepAngle = params.stepAngle / 180 * Math.PI;
        var balAngle = stepAngle / params.banisterPerStep; //угол между балясинами
        for (var i = 1; i < params.banisterPerStep + 1; i++) {
            dirAng = dirAng + balAngle;
            var center1 = polar(p0, dirAng + deltAng, holePosRad)
            var center2 = polar(p0, dirAng - deltAng, holePosRad)
            addRoundHole(treadShape, dxfPrimitivesArr, center1, holeRad, dxfBasePoint);
            addRoundHole(treadShape, dxfPrimitivesArr, center2, holeRad, dxfBasePoint);
        }

    }


    //подпись
    var text = "Винтовая ступень (вид сверху) "
    if (params.turnFactor == -1) text = "Винтовая ступень (вид снизу) "
    text += (params.stepAmt - 1) + " шт."
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, 20, -150);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    /*
    var dxfContent = generateDxfContent (dxfPrimitivesArr);
    document.getElementById('resultDxf').innerHTML = dxfContent;
*/
    par.shape = treadShape;
    return par;


}

function drawVintPlatformShape(par) {

    /*чертеж площадки с обозначением параметров здесь:
    http://6692035.ru/calculator/vint/autoCad/vintPlatform.pdf
    */
    var platformAngle = par.platformAngle;
    var platformDepth = par.platformDepth;
    var treadLowRad = par.treadLowRad;
    var holeDiam = par.holeDiam;
    //var treadMaterial = par.treadMaterial; 
    var type = par.type;
    var columnRad = par.columnDiam / 2 + params.carcasPartsSpacing; //учитываем зазор для тестирования

    var L1 = platformDepth / Math.cos(platformAngle / 2);
    var platformWidth = 2 * platformDepth * Math.tan(platformAngle / 2);
    var extraAngle = Math.asin(treadLowRad / L1);
    var edgeAngle = platformAngle - 2 * extraAngle;
    var edgeLength = L1 * Math.cos(extraAngle);

    //сохраняем значеня в глобальный массив параметров

    stairParams.platformEdgeAngle = edgeAngle;
    stairParams.platformDepth = platformDepth;
    stairParams.platformWidth = platformWidth;

    if (type == "timber") {
        /*рассчитываем координаты точек*/
        var p0 = {
            x: 0,
            y: 0,
        }
        var p1 = {
            x: 0,
            y: -treadLowRad,
        }
        var p2 = {
            x: -treadLowRad * Math.sin(edgeAngle),
            y: treadLowRad * Math.cos(edgeAngle),
        }

        var p3 = {
            x: L1 * Math.cos(platformAngle - extraAngle),
            y: L1 * Math.sin(platformAngle - extraAngle),
        }
        var p4 = {
            x: edgeLength,
            y: -treadLowRad,
        }
        var dxfBasePoint = {
            x: 0,
            y: -1500,
        }
        var cornerAngle = (Math.PI - edgeAngle) / 2
        var ledgeOffset = 80;
        var L2 = ledgeOffset / Math.tan(cornerAngle);
        var L3 = (p4.x - params.staircaseDiam / 2) - L2;
        var L4 = L3 * Math.cos(cornerAngle);
        var L5 = L4 * Math.sin(cornerAngle)
        var L6 = L4 * Math.cos(cornerAngle)
        var p5 = {
            x: p4.x - L2 - L6,
            y: p4.y + ledgeOffset + L5
        }
        var p6 = {
            x: params.staircaseDiam / 2,
            y: p4.y + ledgeOffset
        }
        var p7 = {
            x: params.staircaseDiam / 2,
            y: p4.y
        }
        /*отрисовываем контур площадки*/

        var treadShape = new THREE.Shape();
        addArc(treadShape, dxfPrimitivesArr, p0, treadLowRad, 1.5 * Math.PI, (Math.PI / 2 + edgeAngle), dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p3, p5, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p5, p6, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p6, p7, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p7, p1, dxfBasePoint);

        /*отверстие*/
        var hole = new THREE.Path();
        //hole.absarc(0, 0, holeDiam/2, 0, 2*Math.PI, true)
        addCircle(hole, dxfPrimitivesArr, p0, holeDiam / 2, dxfBasePoint);
        treadShape.holes.push(hole);

        //Направление волокон
        var trashShape = new THREE.Shape();
        var pt1 = newPoint_xy(p0, 200, 0)
        var pt11 = newPoint_xy(pt1, 40, 10)
        var pt12 = newPoint_xy(pt1, 40, -10)
        addLine(trashShape, dxfPrimitivesArr, pt1, pt11, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, pt1, pt12, dxfBasePoint);
        var pt2 = newPoint_xy(pt1, 400, 0)
        var pt21 = newPoint_xy(pt2, -40, 10)
        var pt22 = newPoint_xy(pt2, -40, -10)
        addLine(trashShape, dxfPrimitivesArr, pt2, pt21, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, pt2, pt22, dxfBasePoint);
        addLine(trashShape, dxfPrimitivesArr, pt1, pt2, dxfBasePoint);

        var text = "Направление волокон"
        var textHeight = 20;
        var textBasePoint = newPoint_xy(dxfBasePoint, 210, 30);
        addText(text, textHeight, dxfPrimitivesArr, textBasePoint);



    }
    if (type == "metal") {

        var deltaAng = Math.PI / 6; //половина угла, на который уменьшается дуга ступени, прилегающая к бобышке
        /*рассчитываем координаты точек*/
        var p0 = { x: 0, y: 0 }
        var p11 = polar(p0, -Math.PI / 2 + deltaAng, columnRad); //точка на дуге
        var p1 = polar(p11, -Math.PI / 2, 5);
        var p21 = polar(p0, edgeAngle + Math.PI / 2 - deltaAng, columnRad) //точка на дуге
        var p2 = polar(p21, Math.PI / 2 + edgeAngle, 5);
        var p3 = {
            x: L1 * Math.cos(platformAngle - extraAngle),
            y: L1 * Math.sin(platformAngle - extraAngle),
        }
        var p4 = {
            x: edgeLength,
            y: -treadLowRad,
        }
        var dxfBasePoint = {
            x: 0,
            y: -1500,
        }

        /*отрисовываем контур площадки*/

        var treadShape = new THREE.Shape();
        addLine(treadShape, dxfPrimitivesArr, p1, p11, dxfBasePoint);
        addArc(treadShape, dxfPrimitivesArr, p0, columnRad, -Math.PI / 2 + deltaAng, (Math.PI / 2 + edgeAngle - deltaAng), dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p21, p2, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p3, p4, dxfBasePoint);
        addLine(treadShape, dxfPrimitivesArr, p4, p1, dxfBasePoint);

        //параметры для передней пластины
        par.edgeLength = distance(p4, p1);
        par.rearEdgeLength = distance(p4, p3);
        par.p1 = p1;
        par.p2 = p2;
        par.p3 = p3;
        par.ang1 = angle(p1, p4)
        par.ang2 = angle(p2, p3)
        par.ang3 = angle(p3, p4)

        //Отверстия под болты крепления секции ограждения
        var holeRad = 4;
        var flanHoleDst = par.railingFlanHoleDst;
        var polarDst = flanHoleDst / 2 / Math.sin(Math.PI / 4);
        var sectionLength = edgeLength - 160 - 50 + 40;
        var sectionTurnAngle = edgeAngle

        var flanCenter = polar(p0, edgeAngle, sectionLength)
        var center1 = polar(flanCenter, Math.PI * 0.25 + sectionTurnAngle, polarDst)
        var center2 = polar(flanCenter, Math.PI * 0.75 + sectionTurnAngle, polarDst)
        var center3 = polar(flanCenter, Math.PI * 1.25 + sectionTurnAngle, polarDst)
        var center4 = polar(flanCenter, Math.PI * 1.75 + sectionTurnAngle, polarDst)
        addRoundHole(treadShape, dxfPrimitivesArr, center1, holeRad, dxfBasePoint);
        addRoundHole(treadShape, dxfPrimitivesArr, center2, holeRad, dxfBasePoint);
        addRoundHole(treadShape, dxfPrimitivesArr, center3, holeRad, dxfBasePoint);
        addRoundHole(treadShape, dxfPrimitivesArr, center4, holeRad, dxfBasePoint);

        //отверстие для последней балясины
        var holeCenter = { x: params.staircaseDiam / 2 + 10, y: -32 };
        var holeSize = 25;
        var polarDst = holeSize / 2 / Math.sin(Math.PI / 4);
        var sectionTurnAngle = 0;

        var ph1 = polar(holeCenter, Math.PI * 0.25 + sectionTurnAngle, polarDst)
        var ph2 = polar(holeCenter, Math.PI * 0.75 + sectionTurnAngle, polarDst)
        var ph3 = polar(holeCenter, Math.PI * 1.25 + sectionTurnAngle, polarDst)
        var ph4 = polar(holeCenter, Math.PI * 1.75 + sectionTurnAngle, polarDst)

        var sqHole = new THREE.Path();
        addLine(sqHole, dxfPrimitivesArr, ph1, ph2, dxfBasePoint);
        addLine(sqHole, dxfPrimitivesArr, ph2, ph3, dxfBasePoint);
        addLine(sqHole, dxfPrimitivesArr, ph3, ph4, dxfBasePoint);
        addLine(sqHole, dxfPrimitivesArr, ph4, ph1, dxfBasePoint);
        treadShape.holes.push(sqHole);

        //круглые отверстия под болты
        var center1 = newPoint_xy(holeCenter, -10 - 22, -12)
        var center2 = newPoint_xy(holeCenter, -10 - 22, 12)
        addRoundHole(treadShape, dxfPrimitivesArr, center1, holeRad, dxfBasePoint);
        addRoundHole(treadShape, dxfPrimitivesArr, center2, holeRad, dxfBasePoint);

    }



    //подпись
    var text = "Верхняя площадка (вид сверху)"
    if (params.turnFactor == -1) text = "Верхняя площадка (вид снизу)"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, 20, -150);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    par.shape = treadShape
    return par;
}

function drawPlatformRailingSectionShape(sectionLength) {
    var latticeHeight = 730;
    var latticeStep = 120;
    var barSize = 20;
    var verticalBarAmt = Math.floor(sectionLength / latticeStep);
    var holeWidth = (sectionLength - barSize * verticalBarAmt) / (verticalBarAmt + 1);
    stairParams.sectionHoleWidth = holeWidth;
    stairParams.sectionBalAmt = verticalBarAmt;

    /*внешний контур*/
    var sectionShape = new THREE.Shape();


    var p0 = { x: 0, y: 0 };
    var p1 = { x: 0, y: barSize };
    var p2 = { x: holeWidth, y: barSize };
    var p3 = { x: holeWidth, y: (latticeHeight - barSize) };
    var p4 = { x: 0, y: (latticeHeight - barSize) };
    var p5 = { x: 0, y: latticeHeight };
    var p6 = { x: sectionLength, y: latticeHeight };
    var p7 = { x: sectionLength, y: (latticeHeight - barSize) };
    var p8 = { x: (sectionLength - holeWidth), y: (latticeHeight - barSize) };
    var p9 = { x: (sectionLength - holeWidth), y: barSize };
    var p10 = { x: sectionLength, y: barSize };
    var p11 = { x: sectionLength, y: 0 };

    var dxfBasePoint = {
        x: 0,
        y: -3000,
    }
    addLine(sectionShape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p3, p4, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p4, p5, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p5, p6, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p6, p7, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p7, p8, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p8, p9, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p9, p10, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p10, p11, dxfBasePoint);
    addLine(sectionShape, dxfPrimitivesArr, p11, p0, dxfBasePoint);


    /*внутренний контур*/
    for (var i = 1; i < verticalBarAmt; i++) {
        var leftOffset = (barSize + holeWidth) * i;
        var hole = new THREE.Path();

        var p0 = { x: (leftOffset + holeWidth), y: barSize };
        var p1 = { x: (leftOffset + holeWidth), y: (latticeHeight - barSize) };
        var p2 = { x: leftOffset, y: (latticeHeight - barSize) };
        var p3 = { x: leftOffset, y: barSize };
        var p4 = { x: (leftOffset + holeWidth), y: barSize };
        addLine(hole, dxfPrimitivesArr, p0, p1, dxfBasePoint);
        addLine(hole, dxfPrimitivesArr, p1, p2, dxfBasePoint);
        addLine(hole, dxfPrimitivesArr, p2, p3, dxfBasePoint);
        addLine(hole, dxfPrimitivesArr, p3, p4, dxfBasePoint);

        sectionShape.holes.push(hole);
    }
    return sectionShape;

};//end of drawPlatformRailingSectionShape();



