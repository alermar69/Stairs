﻿/***  Секции маршей   ***/

function drawRailingSectionNewel(railingSectionParams) {

    var bottomEnd = railingSectionParams.bottomEnd;
    var platformLengthBottom = railingSectionParams.platformLengthBottom;
    var topEnd = railingSectionParams.topEnd;
    var platformLengthTop = railingSectionParams.platformLengthTop;
    var railingSide = railingSectionParams.railingSide;
    var stairAmt = railingSectionParams.stairAmt;
    var h1 = railingSectionParams.h1;
    var b1 = railingSectionParams.b1;
    var a1 = railingSectionParams.a1;
    var h2 = railingSectionParams.h2;
    var scale = railingSectionParams.scale;
    var lastMarsh = railingSectionParams.lastMarsh;
    var topConnection = railingSectionParams.topConnection;
    var bottomConnection = railingSectionParams.bottomConnection;
    var rigelAmt = railingSectionParams.rigelAmt;
    var racks = railingSectionParams.racks;
    var dxfBasePoint = railingSectionParams.dxfBasePoint;
    var handrail = railingSectionParams.handrail;
    var textHeight = 30;

    if (turnFactor === -1) {
        var railingSideTemp = railingSide;
        if (railingSideTemp === "left") railingSide = "right";
        if (railingSideTemp === "right") railingSide = "left";
    }
    var railingSection = new THREE.Object3D();
    var rackOffsetY = 150;
    var rackLength = 900;
    var rackPositionStep = setRackPosition(stairAmt);
    var handrailAngle = Math.atan(h1 / b1);
    var railingPositionZ = 0;
    if (turnFactor === -1) railingPositionZ = -40;
    var turnAngleTop = 0;
    var turnAngleBottom = 0;

    /*материалы*/
    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var railingMaterial = new THREE.MeshLambertMaterial({ color: 0xD0D0D0, wireframe: false });
    var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
    var glassThickness = 8;
    var glassExtrudeOptions = {
        amount: glassThickness * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    if (topEnd === "забег") {
        var deltaXtopPlatform = platformLengthTop - b1 / 2 - 70;
        var deltaYtopPlatform = h2;
        turnAngleTop = Math.atan(deltaYtopPlatform / deltaXtopPlatform);
    }
    if (bottomEnd === "забег") {
        var deltaXbottomPlatform = platformLengthBottom + b1 / 2 - 70;
        var deltaYbottomPlatform = 2 * h1;
        turnAngleBottom = Math.atan(deltaYbottomPlatform / deltaXbottomPlatform);
    }

    var x;
    var y;
    var i;
    var y0;
    var x0;
    var z0;
    var p0;
    var rackPosition0;
    var rackPosition1;
    var rackPosition2;
    var sectionAngle;
    var sectionLength;

    //задаем параметры стоек
    var rackParams = {
        basePoint: [],
        rackLength: rackLength,
        handrailAngle: handrailAngle,
        rackMaterial: railingMaterial,
        scale: scale,
        railingSection: railingSection,
        rackPosition: [],
        rackNumber: 0,
        rackProfile: 40,
        handrailHolderLength: 70,
        isRight: false,
        stringerSideOffset: railingSectionParams.stringerSideOffset
    }

    if (railingSide === "right") rackParams.isRight = true;

    //рисуем стойки
    if (railingModel === "Ригели" || railingModel === "Стекло на стойках") {

        if (stairAmt !== 0) {

            /*нижняя площадка*/
            if (bottomEnd === "площадка") {
                /*первая стойка площадки*/
                x0 = (70 - platformLengthBottom) * scale;
                y0 = -rackOffsetY * scale;
                z0 = railingPositionZ * scale;
                rackParams.basePoint = [x0, y0, z0];
                drawRack3d(rackParams);
            }
            if (bottomEnd === "забег") {
                /*первая стойка площадки*/
                x0 = (70 - platformLengthBottom) * scale;
                y0 = -rackOffsetY * scale - h1 * scale;
                z0 = railingPositionZ * scale;
                rackParams.basePoint = [x0, y0, z0];
                drawRack3d(rackParams);
            }
            rackPosition0 = rackParams.rackPosition[0]; //сохраняем координаты стойки площадки

            rackParams.rackPosition = [];
            rackParams.rackNumber = 0;
            var rackPosition = rackParams.rackPosition;

            /*ограждения марша*/
            z0 = railingPositionZ * scale;
            for (i = 0; i < racks.length; i++) {
                x0 = racks[i].x;
                y0 = racks[i].y;
                if (railingSectionParams.model === "ко" && railingSectionParams.topPltRailing_5) {
                    x0 += railingSectionParams.stringerSideOffset + railingSectionParams.stringerThickness;
                    //y0 -= 40 + 5;
                }
                rackParams.basePoint = [x0, y0, z0];
                drawRack3d(rackParams);
            }

            if (topEnd === "забег") {
                /*последняя стойка площадки*/
                p0 = newPoint_x(rackParams.basePoint, (platformLengthTop - 70 - b1 / 2) * scale, 0);
                p0[1] = p0[1] + h2 * scale;
                rackParams.basePoint = p0;
                drawRack3d(rackParams);
            }

            if (topEnd === "забег") {
                rackPosition2 = rackPosition[rackPosition.length - 2];
                var rackPosition3 = rackPosition[rackPosition.length - 1];
                //var turnAngleTop = Math.atan( (rackPosition3[1] - rackPosition2[1])/(rackPosition3[0] - rackPosition2[0]))
            }

        }
        if (stairAmt === 0) {
            sectionLength = platformLengthBottom + platformLengthTop - 140;
            sectionAngle = Math.atan(3 * h1 / sectionLength);
            /*первая стойка*/
            x0 = (70 - platformLengthBottom) * scale;
            y0 = -rackOffsetY * scale - h1 * scale;
            z0 = railingPositionZ * scale;
            rackParams.basePoint = [x0, y0, z0];
            drawRack3d(rackParams);
            rackPosition0 = rackParams.rackPosition[0]; //сохраняем координаты стойки площадки

            /*остальные стойки*/
            var middleRackAmt = Math.round(sectionLength / 800);
            if (middleRackAmt < 0) middleRackAmt = 0;
            p0 = rackParams.basePoint;
            var rackDist = sectionLength / (middleRackAmt + 1);
            for (i = 0; i < middleRackAmt + 1; i++) {
                rackParams.basePoint = newPoint_x(p0, rackDist * scale, -sectionAngle);
                drawRack3d(rackParams);
            }
        }
    }

    /* ригели */

    var stepLength;
    var pole3DParams;
    if (railingModel === "Ригели") {

        //задаем параметры ригелей
        rigelParams = {
            poleType: "rect",
            poleProfileY: 20,
            poleProfileZ: 20,
            basePoint: [0, 0, 0],
            length: 0,
            poleAngle: 0,
            poleMaterial: railingMaterial,
            scale: scale,
            railingSection: railingSection
        };

        if (rigelMaterial === "Ф12 нерж.") {
            rigelParams.poleType = "round";
            rigelParams.poleProfileY = 12;
            rigelParams.poleProfileZ = 12;
        }
        if (rigelMaterial === "Ф16 нерж.") {
            rigelParams.poleType = "round";
            rigelParams.poleProfileY = 16;
            rigelParams.poleProfileZ = 16;
        }

        if (railingSide === "left") z0 = (railingPositionZ + rackParams.rackProfile) * scale * turnFactor;
        if (railingSide === "right") z0 = (railingPositionZ - rigelParams.poleProfileZ) * scale; //*turnFactor;

        var rigelDist;
        rigelAmt = Number(rigelAmt);
        rigelDist = (rackLength - 150) / (rigelAmt + 1);

        if (!railingSectionParams.topPltRailing_5) {
            if (stairAmt !== 0) {
                if (bottomEnd === "площадка") {
                    x0 = (70 - platformLengthBottom) * scale;
                    y0 = 0; //- rackOffsetY*scale;
                    rigelParams.length = platformLengthBottom + b1 / 2;
                    rigelAmt = Number(rigelAmt);
                    rigelDist = (rackLength - 150) / (rigelAmt + 1);
                    for (i = 1; i < rigelAmt + 1; i++) {
                        y0 = h1 * scale + rigelDist * i * scale - rackOffsetY * scale;
                        rigelParams.basePoint = [x0, y0, z0];
                        rigelParams.basePoint = newPoint_x(rigelParams.basePoint, -30 * scale, -handrailAngle);
                        drawPole3D(rigelParams);
                    }
                }

                if (bottomEnd === "забег") {
                    turnAngleBottom = Math.atan((rackPosition1[1] - rackPosition0[1]) / (rackPosition1[0] - rackPosition0[0]));
                    x0 = (70 - platformLengthBottom) * scale;
                    y0 = 0; //- rackOffsetY*scale;
                    rigelParams.length = (platformLengthBottom + b1 / 2) / Math.cos(turnAngleBottom);
                    rigelParams.poleAngle = turnAngleBottom;
                    rigelAmt = Number(rigelAmt);
                    rigelDist = (rackLength - 150) / (rigelAmt + 1);
                    for (i = 1; i < rigelAmt + 1; i++) {
                        y0 = rigelDist * i * scale - rackOffsetY * scale - 60 * scale;
                        rigelParams.basePoint = [x0, y0, z0];
                        rigelParams.basePoint = newPoint_x(rigelParams.basePoint, -30 * scale, -handrailAngle);
                        drawPole3D(rigelParams);
                    }


                }

                /*ригели на марше*/
                stepLength = b1 / Math.cos(handrailAngle);
                rigelParams.length = stepLength * stairAmt + (30 + rackParams.rackProfile / 2 + 65) / Math.cos(handrailAngle);
                if (topEnd == "нет") rigelParams.length -= stepLength;
                rigelParams.poleAngle = handrailAngle;
                rigelParams.dxfBasePoint = { x: 0, y: 5000 };


                x0 = b1 / 2 * scale;
                if (railingSectionParams.model === "ко") {
                    x0 += a1 - b1;
                    //rigelParams.length -= a1 - b1;
                }

                for (i = 1; i < rigelAmt + 1; i++) {
                    rigelParams.dxfBasePoint = newPoint_xy(rigelParams.dxfBasePoint, 0, 100);
                    y0 = h1 * scale + rigelDist * i * scale;
                    rigelParams.basePoint = [x0, y0, z0];
                    rigelParams.basePoint = newPoint_x(rigelParams.basePoint, -30 * scale, -handrailAngle);
                    drawPole3D(rigelParams);

                    addText("Ригель марша " + i + " - внешний", textHeight, dxfPrimitivesArr, newPoint_xy(rigelParams.dxfBasePoint, 0, -40));
                }

                /*ригели на площадке*/
                if (topEnd === "площадка" && railingSectionParams.platformTopRailing) {
                    x0 = racks[racks.length - 2].x - rackParams.rackProfile / 2;
                    y0 = h1 + Math.sin(handrailAngle) * (rigelParams.length - 30 * Math.sin(handrailAngle));
                    rigelParams.basePoint = [x0, y0, z0];
                    rigelParams.length = platformLengthTop - rigelParams.poleProfileZ - b1 / 2 - 65;
                    if (railingSectionParams.model === "ко" && railingSectionParams.lastMarsh) {
                        rigelParams.length -= 40;
                    }
                    rigelParams.poleAngle = 0;
                    for (i = 1; i < rigelAmt + 1; i++) {
                        rigelParams.dxfBasePoint = newPoint_xy(rigelParams.dxfBasePoint, 0, 100);
                        rigelParams.basePoint[1] = y0 + rigelDist * i * scale;
                        drawPole3D(rigelParams);

                        addText("Ригель площадки " + i + " - внешний", textHeight, dxfPrimitivesArr, newPoint_xy(rigelParams.dxfBasePoint, 0, -40));
                    }
                }
                if (topEnd === "забег") {
                    rigelParams.basePoint = rackPosition2;
                    rigelParams.basePoint[2] = z0;
                    y0 = rigelParams.basePoint[1];
                    rigelParams.length = (platformLengthTop - 70 - b1 / 2) / Math.cos(turnAngleTop);
                    rigelParams.poleAngle = turnAngleTop;
                    for (i = 1; i < rigelAmt + 1; i++) {
                        rigelParams.basePoint[1] = y0 + h1 * scale + rigelDist * i * scale - 60 * scale;
                        drawPole3D(rigelParams);
                    }
                }
            }

            if (stairAmt === 0) {
                //middleRackAmt
                rigelParams.length = (sectionLength + 60) / Math.cos(sectionAngle);
                rigelParams.poleAngle = sectionAngle;
                x0 = rackPosition0[0];
                rigelAmt = Number(rigelAmt);
                rigelDist = (rackLength - 150) / (rigelAmt + 1);
                for (i = 1; i < rigelAmt + 1; i++) {
                    y0 = -h1 * scale + rigelDist * i * scale;
                    rigelParams.basePoint = [x0, y0, z0];
                    rigelParams.basePoint = newPoint_x(rigelParams.basePoint, -30 * scale, -sectionAngle);
                    drawPole3D(rigelParams);
                }


            }
        }

        /*ригели задние на площадке*/
        if (railingSectionParams.topPltRailing_5) {
            if (topEnd === "площадка" && railingSectionParams.platformTopRailing) {
                x0 = 0;
                stepLength = b1 / Math.cos(handrailAngle);
                var length = stepLength * stairAmt + (30 + rackParams.rackProfile / 2 + 65) / Math.cos(handrailAngle);
                y0 = h1 + Math.sin(handrailAngle) * (length - 30 * Math.sin(handrailAngle));
                y0 -= h1 * (stairAmt + 1) + 5;
                if (railingSectionParams.model === "ко") y0 += 40 + 5;
                rigelParams.basePoint = [x0, y0, z0];
                rigelParams.length = railingSectionParams.M;
                if (topConnection) {
                    rigelParams.length += b1 / 2 - 10;
                    if (railingSectionParams.model === "ко") rigelParams.length += 40 - 10;
                }
                rigelParams.poleAngle = 0;
                rigelParams.dxfBasePoint = { x: 0, y: 6000 };
                for (i = 1; i < rigelAmt + 1; i++) {
                    rigelParams.dxfBasePoint = newPoint_xy(rigelParams.dxfBasePoint, 0, 100);
                    rigelParams.basePoint[1] = y0 + rigelDist * i * scale;
                    drawPole3D(rigelParams);

                    addText("Ригель площадки " + i + " - задний", textHeight, dxfPrimitivesArr, newPoint_xy(rigelParams.dxfBasePoint, 0, -40));
                }
            }
        }
    }

    /* стекла на стойках */

    if (railingModel === "Стекло на стойках") {
        var glassDist = 80;
        var glassHeight = 600;
        for (i = 0; i < rackPosition.length - 1; i++) {
            if (rackPosition[i][1] == rackPosition[i + 1][1])
                var glassShape = drawGlassShape(rackPosition[i], rackPosition[i + 1], 0, glassDist, glassHeight, scale);
            else
                var glassShape = drawGlassShape(rackPosition[i], rackPosition[i + 1], handrailAngle, glassDist, glassHeight, scale);
            var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

            var glass = new THREE.Mesh(geom, glassMaterial);
            glass.position.x = rackPosition[i][0] + glassDist / 2 * scale;
            glass.position.y = rackPosition[i][1] + 230 * scale;
            glass.position.z = railingPositionZ * scale + 16 * scale;

            glass.castShadow = true;
            railingSection.add(glass);
            //stairCase.push(glass);
        }
        if (stairAmt != 0) {
            if (bottomEnd == "площадка") {
                var rackDist0 = platformLengthBottom - 70 + b1 / 2;
                var p1 = rackPosition0;
                var p2 = newPoint_x(p1, rackDist0 * scale, 0);
                var glassShape = drawGlassShape(p1, p2, 0, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = rackPosition0[0] + glassDist / 2 * scale;
                glass.position.y = rackPosition0[1] + 230 * scale;
                glass.position.z = railingPositionZ * scale + 16 * scale;

                glass.castShadow = true;
                railingSection.add(glass);
            }

            if (bottomEnd == "забег") {
                turnAngleBottom = Math.atan((rackPosition1[1] - rackPosition0[1]) / (rackPosition1[0] - rackPosition0[0]));
                var glassShape = drawGlassShape(rackPosition0, rackPosition1, turnAngleBottom, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = rackPosition0[0] + glassDist / 2 * scale;
                glass.position.y = rackPosition0[1] + 230 * scale;
                glass.position.z = railingPositionZ * scale + 16 * scale;
                glass.castShadow = true;
                railingSection.add(glass);
            }
        }
    } //конец стекол на стойках

    /* Поручни */

    if (handrail !== "нет") {

        //задаем параметры поручней
        var handrailParams = {
            type: "rect",
            profileY: 40,
            profileZ: 60,
            angle: handrailAngle,
            topEnd: topEnd,
            bottomEnd: bottomEnd,
            stairAmt: stairAmt,
            //platformLengthTop: platformLengthTop - b1 / 2,
            platformLengthTop: platformLengthTop + b1 * stairAmt,
            h1: h1,
            material: railingMaterial,
            platformTopRailing: railingSectionParams.platformTopRailing,
            handrailLength: 0,
            topPltRailing_5: railingSectionParams.topPltRailing_5, //наличие заднего ограждения на верхней площадке
        };

        /*параметры поручня в зависимости от модели*/
        var handrailModel = "rect";
        var handrailProfileY = 40;
        var handrailProfileZ = 60;
        var handrailMaterial = railingMaterial;
        handrailParams.dxfBasePoint = { x: 0, y: 3000 };

        if (handrail === "40х20 черн.") {
            handrailModel = "rect";
            handrailProfileY = 20;
            handrailProfileZ = 40;
        }
        if (handrail === "40х40 черн.") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 40;
        }
        if (handrail === "60х30 черн.") {
            handrailModel = "rect";
            handrailProfileY = 30;
            handrailProfileZ = 60;
        }
        if (handrail === "кованый полукруглый") {
            handrailModel = "rect";
            handrailProfileY = 30;
            handrailProfileZ = 50;
        }
        if (handrail === "40х40 нерж.") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 40;
        }
        if (handrail === "Ф50 нерж.") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
        }
        if (handrail === "Ф50 сосна") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "омега-образный сосна") {
            handrailModel = "omega";
            handrailProfileY = 55;
            handrailProfileZ = 75;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "50х50 сосна") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "40х60 береза") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "омега-образный дуб") {
            handrailModel = "omega";
            handrailProfileY = 55;
            handrailProfileZ = 75;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "40х60 дуб") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "40х60 дуб с пазом") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail === "Ф50 нерж. с пазом") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
        }
        if (handrail === "40х60 нерж. с пазом") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 60;
        }

        handrailParams.type = handrailModel;
        handrailParams.profileY = handrailProfileY;
        handrailParams.profileZ = handrailProfileZ;


        if (stairAmt !== 0) {
            /*поручень нижней площадки*/

            if (bottomEnd === "площадка") {
                pole3DParams.basePoint[0] = -platformLengthBottom * scale - (handrailProfileZ + 40) / 2 * scale;
                pole3DParams.basePoint[1] = -rackOffsetY * scale + rackLength * scale;
                pole3DParams.basePoint[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                pole3DParams.length = platformLengthBottom + b1 / 2 + handrailProfileZ / 2;
                pole3DParams.poleAngle = 0;

                drawPole3D(pole3DParams);
            }
            if (bottomEnd === "забег") {
                turnAngleBottom = Math.atan((rackPosition1[1] - rackPosition0[1]) / (rackPosition1[0] - rackPosition0[0]));
                if (!bottomConnection) {
                    basePoint[0] = -platformLengthBottom * scale - (handrailProfileZ + 40) / 2 * scale;
                    basePoint[1] = -rackOffsetY * scale + rackLength * scale - h1 * scale;
                    basePoint[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                    var deltaY = (rackPosition0[0] - basePoint[0]) * Math.tan(turnAngleBottom);
                    basePoint[1] = basePoint[1] - deltaY;

                    pole3DParams.basePoint = basePoint;
                }
                if (bottomConnection) {
                    basePoint[0] = -platformLengthBottom * scale + 70 * scale;
                    basePoint[1] = -rackOffsetY * scale + rackLength * scale - h1 * scale;
                    basePoint[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                    var basePoint1 = [];
                    basePoint1[0] = -platformLengthBottom * scale;
                    basePoint1[1] = -rackOffsetY * scale + rackLength * scale - h1 * scale;
                    basePoint1[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;

                    pole3DParams.length = 70;
                    pole3DParams.poleAngle = 0;
                    pole3DParams.basePoint = basePoint1;

                    drawPole3D(pole3DParams);

                    pole3DParams.basePoint = basePoint;
                }

                pole3DParams.length = (rackPosition1[0] - pole3DParams.basePoint[0]) / scale / Math.cos(turnAngleBottom);
                pole3DParams.poleAngle = turnAngleBottom;

                drawPole3D(pole3DParams);
            }

            /*поручень марша*/
            var stepLength = handrailParams.h1 / Math.sin(handrailAngle);
            var handrailLength = stepLength * stairAmt - 1 / 3 * stepLength;
            
            if (topEnd === "площадка") handrailLength = handrailLength - 1 / 3 * stepLength;
            if (!railingSectionParams.platformTopRailing) handrailLength = stepLength * stairAmt + (30 + rackParams.rackProfile / 2 + 65) / Math.cos(handrailAngle);
            if (topEnd === "нет") handrailLength -= stepLength;
            if (topEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;
            if (bottomEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;

            x0 = b1 / 2 * scale - 50 * Math.cos(handrailAngle);
            handrailParams.platformLengthTop -= x0;

            if (railingSectionParams.model === "ко") {
                if (railingSectionParams.lastMarsh) handrailParams.platformLengthTop -= x0 - 40;
                x0 += a1 - b1;
            }
            y0 = racks[0].y - 90 + rackLength * scale - 50 * Math.sin(handrailAngle);
            z0 = railingPositionZ - (handrailProfileZ - rackParams.rackProfile) / 2;

            
            handrailParams.yTop = racks[racks.length - 1].y - 90 + rackLength * scale - y0 + handrailProfileY;
            handrailParams.handrailLength = handrailLength;

            //задаем параметры для заднего поручня
            if (railingSectionParams.topPltRailing_5) {
                handrailParams.handrailLength = railingSectionParams.M;
                if (topConnection) {
                    handrailParams.handrailLength += b1 / 2 - 40 - 10;
                    if (railingSectionParams.model === "ко") handrailParams.handrailLength += 40 - 10;
                }
                handrailParams.angle = 0;
                x0 = 0;
                y0 = racks[0].y - 90 + rackLength * scale;
            }

            var handrailShape = drawHandrail(handrailParams).shape;
            var handrailMesh;
            if (handrailParams.type !== "round") {

                var handrailExtrudeOptions = {
                    amount: handrailProfileZ * scale,
                    bevelEnabled: false,
                    curveSegments: 12,
                    steps: 1
                };
                var geom = new THREE.ExtrudeGeometry(handrailShape, handrailExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                handrailMesh = new THREE.Mesh(geom, handrailMaterial);
                handrailMesh.position.x = x0;
                handrailMesh.position.y = y0;
                handrailMesh.position.z = z0;
                handrailMesh.castShadow = true;
                //carcas.push(handrailMesh);  //scene.add()
                railingSection.add(handrailMesh);

                addText("Поручень " + "внешний", textHeight, dxfPrimitivesArr, newPoint_xy(handrailParams.dxfBasePoint, 100, 20));
            }

            if (handrailParams.type === "round") {
                for (var j = 0; j < handrailParams.meshes.length; j++) {
                    handrailMesh = handrailParams.meshes[j];
                    handrailMesh.position.x += x0;
                    handrailMesh.position.y += y0;
                    handrailMesh.position.z += z0;
                    railingSection.add(handrailMesh);
                }
            }
            /*поручень верхней площадки*/

            //if (topEnd === "площадка") {
            //    pole3DParams.basePoint[0] = b1 * (stairAmt - 0.5) * scale;
            //    pole3DParams.basePoint[1] = h1 * stairAmt * scale - rackOffsetY * scale + rackLength * scale;
            //    pole3DParams.basePoint[2] = z0;
            //    pole3DParams.length = platformLengthTop - b1 / 2;
            //    pole3DParams.poleAngle = 0;
            //    drawPole3D(pole3DParams);
            //}
            //if (topEnd === "забег") {
            //    pole3DParams.basePoint[0] = b1 * (stairAmt - 0.5) * scale;
            //    pole3DParams.basePoint[1] = h1 * stairAmt * scale - rackOffsetY * scale + rackLength * scale;//rackPosition2[1];// + rackLength*scale;
            //    pole3DParams.basePoint[2] = z0;
            //    pole3DParams.length = (platformLengthTop - b1 / 2) / Math.cos(turnAngleTop);
            //    if (topConnection) pole3DParams.length = pole3DParams.length - 70 / Math.cos(turnAngleTop);
            //    pole3DParams.poleAngle = turnAngleTop;

            //    drawPole3D(pole3DParams);
            //    if (topConnection) {
            //        /*basePoint = rackPosition3;
            //        basePoint[1] = rackPosition3[1] + rackLength*scale;
            //        basePoint[2] = z0; */
            //        pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, handrailLength * Math.cos(turnAngleTop) * scale, -turnAngleTop);
            //        //console.log(basePoint1);
            //        pole3DParams.length = 70 + (handrailProfileZ + 40) / 2;
            //        pole3DParams.poleAngle = 0;
            //        drawPole3D(pole3DParams);
            //    }

            //}
        }
        if (stairAmt === 0) {
            pole3DParams.length = sectionLength / Math.cos(sectionAngle);
            if (!bottomConnection) pole3DParams.length = pole3DParams.length + 70 / Math.cos(sectionAngle);
            if (!topConnection) pole3DParams.length = pole3DParams.length + 70 / Math.cos(sectionAngle);
            x0 = rackPosition0[0];
            y0 = -h1 * scale - rackOffsetY * scale + rackLength * scale;
            z0 = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
            pole3DParams.basePoint = [x0, y0, z0];
            if (!bottomConnection) pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -70 * scale, -sectionAngle);
            pole3DParams.poleAngle = sectionAngle;
            //if (railingModel == "Кованые балясины") basePoint = newPoint_x(basePoint, 20*scale, -sectionAngle)
            drawPole3D(pole3DParams);

            pole3DParams.poleAngle = 0;
            if (topConnection) {
                pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, pole3DParams.length * Math.cos(sectionAngle) * scale, -sectionAngle);
                pole3DParams.length = 70 + (handrailProfileZ + 40) / 2;
                if (railingModel === "Кованые балясины") pole3DParams.length += 20;
                drawPole3D(pole3DParams);
            }
            if (bottomConnection) {
                pole3DParams.length = 70;
                pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -70 * scale, 0);
                drawPole3D(pole3DParams);
            }

        }


    }; //конец поручня

    return (railingSection);
}

/* функция отрисовки кованой балясины */
function drawRailingSectionForge(railingSectionParams) {
	/*материалы*/
	var railingMaterial = new THREE.MeshLambertMaterial({color: 0xD0D0D0,wireframe: false});
	var forgingExtrudeOptions = {amount: 40, bevelEnabled: false, curveSegments: 12, steps: 1};
	var stairAmt = railingSectionParams.stairAmt;
	var h1 = railingSectionParams.h1;
	var b1 = railingSectionParams.b1;
	var a1 = railingSectionParams.a1;
	var h2 = railingSectionParams.h2;
	var scale = railingSectionParams.scale;
	var rack = railingSectionParams.racks;
	var bottomConnection = railingSectionParams.bottomConnection;
	var topConnection = railingSectionParams.topConnection;	
	var dxfBasePoint = railingSectionParams.dxfBasePoint;
	var railingSide = railingSectionParams.railingSide;
	if (turnFactor === -1) {
		var railingSideTemp = railingSide;
		if (railingSideTemp === "left") railingSide = "right";
		if (railingSideTemp === "right") railingSide = "left";
	}
	var platformLengthTop = railingSectionParams.platformLengthTop;
	var railingSection = new THREE.Object3D();
	var platformLengthTop = railingSectionParams.platformLengthTop;
	var rackPositionStep = setRackPosition(stairAmt);
	var handrailAngle = Math.atan(h1 / b1);
	var railingPositionZ = 0;
	if (turnFactor === -1) railingPositionZ = -40;
	var turnAngleTop = 0;
	var turnAngleBottom = 0;
	var lastMarsh = railingSectionParams.lastMarsh;
	var platformRack = railingSectionParams.platformRack;
	var angleBottom = 0;
	var angleTop = handrailAngle;
	var forgedRackProfile = 40;
	var forgedRackLength = 900;
	var longRackLength = 900;
	var widthBottomRack = 20;
	var widthBottomRackAngle = widthBottomRack / Math.cos(angleTop);
	var rackOffsetY = 150;
	var shortRackLength = rackOffsetY;
	var railSectForgeShape = new THREE.Shape();
	
	var basePoint = {x: 0, y: 0};
	var newelParams = {
		width: 40, //размер профиля
		height: 900, //высота стойки
		type: "left", //тип: left, right, middle
		angle: angleTop, //угол наклона секции
		holeDiam: 13, //диаметр отверстий крепления к каркасу
		botHoleOffset: 30, //отступ нижнего отверстия от низа стойки
		holeDist: 60, //расстояние между отверстиями
		length: shortRackLength, //высота короткой стойки
		bottomConnection: bottomConnection,
		topConnection: topConnection,
		shape: railSectForgeShape,
		dxfBasePoint: dxfBasePoint
	}
	
	//переменные для отверстий в секцию под кованые балясины
	var vertexMarsh = [];
	var vertexPlatform = [];
	//добавляем подпись в dxf файл
	var text = railingSectionParams.text;
	var textHeight = 30;
	var textBasePoint = newPoint_xy(dxfBasePoint, 40, -200);
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

	/*секция под кованые балясины (сплошной шейп)*/
	var racks = rack;
	var countRecks = racks.length;

	//if(lastMarsh && !platformRack) countRecks -= 1;
	//if (gInBottom) countRecks += 1;
	var countBegin = 0;
	for (i = 0; i < countRecks; i++) {
		//устанавливаем угол, под которым будет продолжать прорисовываться шейп
		i < countRecks-1 && racks[i+1].y-racks[i].y > 10 ? newelParams.angle = angleTop : newelParams.angle = 0;
		
		var pNext;
		if (i == 0) {
			newelParams.type = 'left';
			newelParams.pStart = copyPoint(racks[i]);
			drawForgeFrameNewel2D(newelParams);
			pNext = newPoint_xy(racks[i+1], - newelParams.width/2, -newelParams.botHoleOffset - newelParams.holeDist + newelParams.length);
			addLine(railSectForgeShape, dxfPrimitivesArr, newelParams.pFinish, pNext, dxfBasePoint);
			vertexMarsh[0] = newPoint_xy(newelParams.pFinish, 0, widthBottomRackAngle);
			vertexMarsh[1] = newPoint_xy(vertexMarsh[0], 0, 750 - 2 * widthBottomRackAngle);
		}
		else if (i == (countRecks - 1)) {
			newelParams.type = 'right';
			newelParams.pStart = copyPoint(racks[i]);
			drawForgeFrameNewel2D(newelParams);
			if(lastMarsh || platformRack) {
				vertexMarsh[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRackAngle);
				vertexMarsh[2] = newPoint_xy(vertexMarsh[3], 0, 750 - 2 * widthBottomRackAngle);
			}
			else {
				vertexPlatform[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRack);
				vertexPlatform[2] = newPoint_xy(vertexPlatform[3], 0, 750 - 2 * widthBottomRack);
			}
		}
		else {
			newelParams.type = 'middle';
			newelParams.pStart = copyPoint(racks[i]);
			drawForgeFrameNewel2D(newelParams);
			pNext =  newPoint_xy(racks[i+1], - newelParams.width/2, -newelParams.botHoleOffset - newelParams.holeDist + newelParams.length);
			addLine(railSectForgeShape, dxfPrimitivesArr, newelParams.pFinish, pNext, dxfBasePoint);
			
			if((racks[i+1].y - racks[i].y) < 20 && (racks[i].y - racks[i-1].y) > 20) {
				vertexMarsh[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRackAngle);
				vertexMarsh[2] = newPoint_xy(vertexMarsh[3], 0, 750 - 2 * widthBottomRackAngle);
				if(!lastMarsh && !platformRack) {					
					vertexPlatform[0] = newPoint_xy(newelParams.pFinish, 0, widthBottomRack);
					vertexPlatform[1] = newPoint_xy(vertexPlatform[0], 0, 750 - 2 * widthBottomRack);
				}
			}
		}
	}	
	pNext = fillet(newelParams.pFinish, Math.PI, newelParams.pEnd, angleTop, 0);
	addLine(railSectForgeShape, dxfPrimitivesArr, newelParams.pFinish, pNext.center, dxfBasePoint);
	addLine(railSectForgeShape, dxfPrimitivesArr, pNext.center, newelParams.pEnd, dxfBasePoint);
	
	//добавляем отверстия 
	addHoleRailingSectionForge(railSectForgeShape, dxfPrimitivesArr, vertexMarsh, dxfBasePoint);
	if(!lastMarsh && !platformRack) addHoleRailingSectionForge(railSectForgeShape, dxfPrimitivesArr, vertexPlatform, dxfBasePoint);
	var geom = new THREE.ExtrudeGeometry(railSectForgeShape, forgingExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var railSectForge = new THREE.Mesh(geom, railingMaterial);
	railSectForge.position = {x: 0, y: 0, z: railingPositionZ};
	railingSection.add(railSectForge);
	
	
/*Кованые балясины*/
	
	//балясины марша     
	var balParams = {p1: vertexMarsh[0], p2: vertexMarsh[3], balDist: balDist[0], angle: angleTop, length: (750 - 2 * widthBottomRackAngle), dxfPrimitivesArr: dxfPrimitivesArr, mat: railingMaterial, dBPoint: dxfBasePoint} 
	if (platformRack) balParams.angle = 0;
	var balMarsh3d = addBalRailingSectionForge(balParams);
	railingSection.add(balMarsh3d);
	if(!lastMarsh && !platformRack) {
		//балясины площадки
		balParams.p1 = vertexPlatform[0];
		balParams.p2 = vertexPlatform[3];
		balParams.angle = 0;
		balParams.length = 750 - 2 * widthBottomRack;
		var balPlatform3d = addBalRailingSectionForge(balParams); 
		railingSection.add(balPlatform3d);
	}
	
	return railingSection;
}
// end  drawRailingSectionForge

/* функция отрисовки кованой балясины */
function drawRailingSectionForge3(railingSectionParams) {
    /*материалы*/
    var railingMaterial = new THREE.MeshLambertMaterial({ color: 0xD0D0D0, wireframe: false });
    var forgingExtrudeOptions = { amount: 40, bevelEnabled: false, curveSegments: 12, steps: 1 };
    var stairAmt = railingSectionParams.stairAmt;
    var h1 = railingSectionParams.h1;
    var b1 = railingSectionParams.b1;
    var a1 = railingSectionParams.a1;
    var h2 = railingSectionParams.h2;
    var scale = railingSectionParams.scale;
    var rack = railingSectionParams.racks;
    var bottomConnection = railingSectionParams.bottomConnection;
    var topConnection = railingSectionParams.topConnection;
    var dxfBasePoint = railingSectionParams.dxfBasePoint;
    var railingSide = railingSectionParams.railingSide;
    if (turnFactor === -1) {
        var railingSideTemp = railingSide;
        if (railingSideTemp === "left") railingSide = "right";
        if (railingSideTemp === "right") railingSide = "left";
    }
    var platformLengthTop = railingSectionParams.platformLengthTop;
    var railingSection = new THREE.Object3D();
    var platformLengthTop = railingSectionParams.platformLengthTop;
    var rackPositionStep = setRackPosition(stairAmt);
    var handrailAngle = Math.atan(h1 / b1);
    var railingPositionZ = 0;
    if (turnFactor === -1) railingPositionZ = -40;
    var turnAngleTop = 0;
    var turnAngleBottom = 0;
    var lastMarsh = railingSectionParams.lastMarsh;
    var platformRack = railingSectionParams.platformRack;
    var angleBottom = 0;
    var angleTop = handrailAngle;
    var forgedRackProfile = 40;
    var widthBottomRack = 20;
    var widthBottomRackAngle = widthBottomRack / Math.cos(angleTop);
    var rackOffsetY = 150;
    var shortRackLength = rackOffsetY;
    var railSectForgeShape = new THREE.Shape();

    var basePoint = { x: 0, y: 0 };
    var newelParams = {
        width: 40, //размер профиля
        height: 900, //высота стойки
        type: "left", //тип: left, right, middle
        angle: angleTop, //угол наклона секции
        holeDiam: 13, //диаметр отверстий крепления к каркасу
        botHoleOffset: 30, //отступ нижнего отверстия от низа стойки
        holeDist: 60, //расстояние между отверстиями
        length: shortRackLength, //высота короткой стойки
        bottomConnection: bottomConnection,
        topConnection: topConnection,
        shape: railSectForgeShape,
        dxfBasePoint: dxfBasePoint
    }

    //переменные для отверстий в секцию под кованые балясины
    var vertexMarsh = [];
    var vertexPlatformBot = [];
    var vertexPlatformTop = [];
    //добавляем подпись в dxf файл
    var text = railingSectionParams.text;
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, 40, -200);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    /*секция под кованые балясины (сплошной шейп)*/
    var racks = rack;
    var countRecks = racks.length;

    if (lastMarsh && !platformRack) countRecks -= 1;
    var pointUzelTop;
    //var numberFirstRackTopPlatform = lastMarsh ? countRecks - 1 : countRecks - 2; // номер стойки, первой на верхней площадке
    for (i = 0; i < countRecks; i++) {
        //устанавливаем угол, под которым будет продолжать прорисовываться шейп
        if (i < countRecks - 1 && i > 0) {
            if (racks[i + 1].y - racks[i].y > 10 && racks[i].y - racks[i - 1].y > 10) newelParams.angle = angleTop;
            else newelParams.angle = 0;
        } else {
            newelParams.angle = 0;
        }

        var pNext;
        if (i == 0) {
            newelParams.type = 'left';
            newelParams.pStart = copyPoint(racks[i]);
            drawForgeFrameNewel2D(newelParams);
            pNext = newPoint_xy(racks[i + 1], -newelParams.width / 2, -newelParams.botHoleOffset - newelParams.holeDist + newelParams.length);
            addLine(railSectForgeShape, dxfPrimitivesArr, newelParams.pFinish, pNext, dxfBasePoint);
            vertexPlatformBot[0] = newPoint_xy(newelParams.pFinish, 0, widthBottomRack);
            vertexPlatformBot[1] = newPoint_xy(vertexPlatformBot[0], 0, 750 - 2 * widthBottomRack);
        }
        else if (i == (countRecks - 1)) {
            newelParams.type = 'right';
            newelParams.pStart = copyPoint(racks[i]);
            drawForgeFrameNewel2D(newelParams);
            if (lastMarsh) {
                pointUzelTop = newelParams.pTrash;
                vertexMarsh[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRackAngle);
                vertexMarsh[2] = newPoint_xy(vertexMarsh[3], 0, 750 - 2 * widthBottomRackAngle);
            }
            else {
                vertexPlatformTop[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRack);
                vertexPlatformTop[2] = newPoint_xy(vertexPlatformTop[3], 0, 750 - 2 * widthBottomRack);
            }
        }
        else {
            newelParams.type = 'middle';
            newelParams.pStart = copyPoint(racks[i]);
            drawForgeFrameNewel2D(newelParams);
            pNext = newPoint_xy(racks[i + 1], -newelParams.width / 2, -newelParams.botHoleOffset - newelParams.holeDist + newelParams.length);
            addLine(railSectForgeShape, dxfPrimitivesArr, newelParams.pFinish, pNext, dxfBasePoint);
            if (i == (countRecks - 2)) pointUzelTop = newelParams.pTrash;

            if ((racks[i + 1].y - racks[i].y) < 20 && (racks[i].y - racks[i - 1].y) > 20) {
                vertexMarsh[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRackAngle);
                vertexMarsh[2] = newPoint_xy(vertexMarsh[3], 0, 750 - 2 * widthBottomRackAngle);
                vertexPlatformTop[0] = newPoint_xy(newelParams.pFinish, 0, widthBottomRack);
                vertexPlatformTop[1] = newPoint_xy(vertexPlatformTop[0], 0, 750 - 2 * widthBottomRack);
            }
            if ((racks[i + 1].y - racks[i].y) > 20 && (racks[i].y - racks[i - 1].y) < 20) {
                vertexPlatformBot[3] = newPoint_xy(newelParams.pStart, 0, widthBottomRack);
                vertexPlatformBot[2] = newPoint_xy(vertexPlatformBot[3], 0, 750 - 2 * widthBottomRack);
                vertexMarsh[0] = newPoint_xy(newelParams.pFinish, 0, widthBottomRackAngle);
                vertexMarsh[1] = newPoint_xy(vertexMarsh[0], 0, 750 - 2 * widthBottomRackAngle);
            }
        }
    }
    console.log(vertexMarsh);
    console.log(vertexPlatformBot);
    console.log(vertexPlatformTop);
    var pNext1 = newPoint_x(pointUzelTop, -40, 0);
    pNext = fillet(pNext1, angleTop + Math.PI, newelParams.pEnd, 0, 0);
    addLine(railSectForgeShape, dxfPrimitivesArr, newelParams.pFinish, pNext1, dxfBasePoint);
    addLine(railSectForgeShape, dxfPrimitivesArr, pNext1, pNext.center, dxfBasePoint);
    addLine(railSectForgeShape, dxfPrimitivesArr, pNext.center, newelParams.pEnd, dxfBasePoint);

    // добавляем отверстия
    addHoleRailingSectionForge(railSectForgeShape, dxfPrimitivesArr, vertexPlatformBot, dxfBasePoint);
    addHoleRailingSectionForge(railSectForgeShape, dxfPrimitivesArr, vertexMarsh, dxfBasePoint);
    if (!lastMarsh) addHoleRailingSectionForge(railSectForgeShape, dxfPrimitivesArr, vertexPlatformTop, dxfBasePoint);

    var geom = new THREE.ExtrudeGeometry(railSectForgeShape, forgingExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var railSectForge = new THREE.Mesh(geom, railingMaterial);
    railSectForge.position = { x: 0, y: 0, z: railingPositionZ };
    railingSection.add(railSectForge);

    /*Кованые балясины*/

    //балясины марша     
    var balParams = { p1: vertexMarsh[0], p2: vertexMarsh[3], balDist: balDist[0], angle: angleTop, length: (750 - 2 * widthBottomRackAngle), dxfPrimitivesArr: dxfPrimitivesArr, mat: railingMaterial, dBPoint: dxfBasePoint }
    var balMarsh3d = addBalRailingSectionForge(balParams);
    railingSection.add(balMarsh3d);
    //балясины нижней площадки
    balParams.p1 = vertexPlatformBot[0];
    balParams.p2 = vertexPlatformBot[3];
    balParams.angle = 0;
    balParams.length = 750 - 2 * widthBottomRack;
    var balPlatform3dBot = addBalRailingSectionForge(balParams);
    railingSection.add(balPlatform3dBot);
    if (!lastMarsh) {
        //балясины верхней площадки
        balParams.p1 = vertexPlatformTop[0];
        balParams.p2 = vertexPlatformTop[3];
        balParams.angle = 0;
        balParams.length = 750 - 2 * widthBottomRack;
        var balPlatform3dTop = addBalRailingSectionForge(balParams);
        railingSection.add(balPlatform3dTop);
    }
    return railingSection;
}
// end  drawRailingSectionForge3	


/*
Функция отрисовки ограждения с самонесущим стеклом
*/
function drawRailingSectionGlass(railingSectionParams) {
	
	var bottomEnd = railingSectionParams.bottomEnd;
	var platformLengthBottom = railingSectionParams.platformLengthBottom;
	var topEnd = railingSectionParams.topEnd;
	var platformLengthTop = railingSectionParams.platformLengthTop;
	var railingSide = railingSectionParams.railingSide;
	var stairAmt = railingSectionParams.stairAmt;
	var h1 = railingSectionParams.h1;
	var b1 = railingSectionParams.b1;
	var a1 = railingSectionParams.a1;
	var h2 = railingSectionParams.h2;
	var scale = railingSectionParams.scale;
	var lastMarsh = railingSectionParams.lastMarsh;
	var topConnection = railingSectionParams.topConnection;
	var bottomConnection = railingSectionParams.bottomConnection;
	var rigelAmt = railingSectionParams.rigelAmt;
	var racks = railingSectionParams.racks.slice(0, railingSectionParams.racks.length); // создаём копию
	var dxfBasePoint = railingSectionParams.dxfBasePoint;

	if (turnFactor === -1) {
		var railingSideTemp = railingSide;
		if (railingSideTemp === "left") railingSide = "right";
		if (railingSideTemp === "right") railingSide = "left";
	}
	var railingSection = new THREE.Object3D();
    /*var rackOffsetY = 150;
    var rackLength = 900;
    var rackPositionStep = setRackPosition(stairAmt);*/
    var handrailAngle = Math.atan(h1 / b1);
    var railingPositionZ = 0;
    if (turnFactor === -1) railingPositionZ = -40;
    /*var turnAngleTop = 0;
    var turnAngleBottom = 0;*/
    //var basePoint = [];

    /*материалы*/
	var railingMaterial = new THREE.MeshLambertMaterial({ color: 0xD0D0D0, wireframe: false });
	var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
	var rutelMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, overdraw: 0.5 });
	var glassThickness = 12;

	var glassExtrudeOptions = {
		amount: glassThickness * scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var rutelExtrudeOptions = {
		amount: 50,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var turnAngleTop = 0;
	if (topEnd === "забег") {
		var deltaXtopPlatform = platformLengthTop - b1 / 2 - 70;
		var deltaYtopPlatform = h2;
		turnAngleTop = Math.atan(deltaYtopPlatform / deltaXtopPlatform);
	}
	var turnAngleBottom = 0;
	if (bottomEnd === "забег") {
		var deltaXbottomPlatform = platformLengthBottom + b1 / 2 - 70;
		var deltaYbottomPlatform = 2 * h1;
		turnAngleBottom = Math.atan(deltaYbottomPlatform / deltaXbottomPlatform);
	}
	
	var x0;
	var y0;
	
	// Ограждение
	
	if (stairAmt > 10) {
		var rackOffsetY = 200 / Math.cos(handrailAngle);		// 200 = ширина тетивы
	}
	else {
		var rackOffsetY = 150 / Math.cos(handrailAngle);		// 150 = ширина тетивы
	}
	var glassDist = 8;			// зазор между стеклами
	var glassOffset = 20;		// зазор между стеклом и тетивой
	var glassHeight = 1030;		// высота стекла
	var glassIndent = 10;		// отступ от края тетивы
		
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = (railingPositionZ + glassOffset);
	if (railingSide == "left") z0 = (railingPositionZ + 40 - glassOffset - glassThickness);

	if (stairAmt != 0) {
		if (topEnd == "забег") {
			deltaXtopPlatform = platformLengthTop - b1;
			deltaYtopPlatform = h1;
			turnAngleTop = Math.atan(deltaYtopPlatform / deltaXtopPlatform);
		}
		if (bottomEnd == "забег") {
			deltaXbottomPlatform = platformLengthBottom;
			deltaYbottomPlatform = h1;
			turnAngleBottom = Math.atan(deltaYbottomPlatform / deltaXbottomPlatform);
		}

		// устанавливаем параметры стёкол
		
		dxfBasePoint.x = dxfBasePoint.x + 300;
		var glassParams = {
			a1: a1,
			b1: b1,
			h1: h1,
			glassWidth: [],
			stairAmt: stairAmt,
			platformLengthTop: platformLengthTop,	// длина верхней платформы
			racksHoles: racks,						// координаты отверстий в тетиве
			handrailAngle: handrailAngle,			// угол наклона марша
			glassDist: glassDist,					// расстояние между стеклами
			glassHeight: glassHeight,				// высота вертикальной линии стекла
			glassType: "",							// первое, последнее или на площадке
			glassIndent: glassIndent,				// отступ певого стекла от пола (взято с модели)
			rackOffsetY: rackOffsetY,				// смещение стёкол по оси Y
			dxfBasePoint: dxfBasePoint,
			glassSectionLength: 0,
		};

		/*нижняя площадка*/

		if (bottomEnd != "нет") {
			var glassSectionLength1 = platformLengthBottom;
			if (bottomConnection) glassSectionLength1 = glassSectionLength1 + glassOffset - glassDist;

			var glassAmt_1 = Math.round(glassSectionLength1 / 800);
			var glassLengthX = glassSectionLength1 / glassAmt_1;
			var p1 = [0, 0];
			var p2 = [glassLengthX, glassLengthX * Math.tan(turnAngleBottom)];
			x0 = 0 - glassSectionLength1;
			y0 = -rackOffsetY- glassSectionLength1 * Math.tan(turnAngleBottom);
			for (i = 0; i < glassAmt_1; i++) {
				var glassShape = drawGlassShape(p1, p2, turnAngleBottom, glassDist, glassHeight, scale);
				var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
				geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var glass = new THREE.Mesh(geom, glassMaterial);
				glass.position.x = x0 + glassLengthX * i;
				glass.position.y = y0 + glassLengthX * Math.tan(turnAngleBottom) * i;
				glass.position.z = z0;
				glass.castShadow = true;
				railingSection.add(glass);
			}
		}

		/*марш*/

		var glassSectionLength2 = b1 * stairAmt;				// определяем длину ограждения
		if (topEnd == "нет") {
			if (lastMarsh) glassSectionLength2 = b1 * (stairAmt - 1) + a1;
			else glassSectionLength2 = b1 * stairAmt - glassDist - glassIndent;
		}
		if (bottomEnd == "нет") glassSectionLength2 = glassSectionLength2 - glassIndent;

		glassParams.glassSectionLength = glassSectionLength2;

		var glassAmt_1 = (racks.length - 1)/2;			// кол-во стекол
		if (topEnd != "нет") {
			glassAmt_1 = (racks.length - 3)/2;
			if (platformLengthTop - b1 > 1000) {
				glassAmt_1 = glassAmt_1 - 1;
			}
		}
		if (glassAmt_1 == 0) glassAmt_1 = 1;

		x0 = 0;
		if (bottomEnd == "нет") x0 = glassIndent;
		y0 = -rackOffsetY + glassIndent + 5 + glassIndent / Math.cos(handrailAngle);
		var handrailBasePoint = {x: glassIndent, y: -rackOffsetY + glassIndent + 5 + glassIndent / Math.cos(handrailAngle)};

		// расставляем рутели
		var rutelRad = 7;
		for (j = 0; j < racks.length; j++) {
			rutelShape = new THREE.Shape();
			center = {x:0, y:0};
			addCircle(rutelShape, dxfPrimitivesArr0, center, rutelRad, glassParams.dxfBasePoint);
			var geom = new THREE.ExtrudeGeometry(rutelShape, rutelExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var rutel = new THREE.Mesh(geom, rutelMaterial);
			
			rutel.position.x = racks[j].x;
			rutel.position.y = racks[j].y;
			rutel.position.z = 0;
			rutel.castShadow = true;
			railingSection.add(rutel);
			if (j != 0) {
				var rutel1 = new THREE.Mesh(geom, rutelMaterial);
				rutel1.position.x = racks[j].x;
				rutel1.position.y = racks[j].y - 120;
				if (topEnd != "нет") {
					if (platformLengthTop - b1 < 1000) {
						if (j == racks.length-1 || j == racks.length-2) {
							rutel1.position.y = racks[j].y - 60;
						}
					}
					else {
						if (j == racks.length-1 || j == racks.length-2 || j == racks.length-3 || j == racks.length-4) {
							rutel1.position.y = racks[j].y - 60;
						}
					}
				}
				rutel1.position.z = 0;
				rutel1.castShadow = true;
				railingSection.add(rutel1);
			}
		}	// конец расстановки рутелей
console.log(glassAmt_1);
			// отрисовываем стёкла на марше
			var glassCoordX = 0;
			var handrailGlassSectionLength = 0;
            for (i = 0; i < glassAmt_1; i++) {
				if (i == 0) {
					glassParams.glassType = "first";
				}
				else {
					if (i == glassAmt_1 - 1) {
						glassParams.glassType = "last";
					}
				}
				
                glassParams = drawGlassShape(glassParams);
                var geom = new THREE.ExtrudeGeometry(glassParams.glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var glass = new THREE.Mesh(geom, glassMaterial);
				
				// вычисляем координаты расположения стёкол и отверстий в них
				if (i == 0) {
					var glassCoordX1 = glassParams.glassWidth[i] + glassDist;		// координата Х первого стекла
					var glassHolesCoordX = x0 + glassCoordX1;
					var glassHolesCoordY = y0 + glassCoordX1 * Math.tan(handrailAngle);
					handrailGlassSectionLength = handrailGlassSectionLength + (glassParams.glassWidth[i] + glassDist) / Math.cos(handrailAngle);
				}
				if (i > 0) {
					glassCoordX = glassCoordX1 + (glassParams.glassWidth[i-1] + glassDist) * (i-1);		// координата Х остальных стекол
					glassHolesCoordX = glassHolesCoordX + (glassParams.glassWidth[i] + glassDist);
					glassHolesCoordY = glassHolesCoordY + (glassParams.glassWidth[i] + glassDist) * Math.tan(handrailAngle);
					handrailGlassSectionLength = handrailGlassSectionLength + (glassParams.glassWidth[i] + glassDist) / Math.cos(handrailAngle);
				}

				// позиционирование стекла
                glass.position.x = x0 + glassCoordX;
                glass.position.y = y0 + glassCoordX * Math.tan(handrailAngle);
                glass.position.z = z0;
                glass.castShadow = true;
                railingSection.add(glass);
				glassParams.glassType = "";		// обновляем тип стекла
				glassParams.glassPosition = {x: glassHolesCoordX, y: glassHolesCoordY};		// записываем координаты отверстий в стёклах
            }	// конец отрисовки стёкол на марше
			
			// сохраняем координаты для позиционирования следующего стёкла
			var basePoint = [];
			basePoint[0] = glass.position.x + glassParams.glassWidth[glassParams.glassWidth.length - 1];
            basePoint[1] = glass.position.y + glassParams.glassWidth[glassParams.glassWidth.length - 1] * Math.tan(handrailAngle);
            basePoint[2] = glass.position.z;

            /*верхняя площадка*/

            if (topEnd != "нет") {

                var glassSectionLength3 = platformLengthTop - b1;
                if (topConnection) glassSectionLength3 = glassSectionLength3 + glassOffset + glassDist + glassThickness;
                //var glassAmt_1 = Math.round(glassSectionLength3 / 800);
				var glassAmt_1 = 1;
				glassParams.glassType = "platform";		// задаём тип стекла - платформа
				if (glassSectionLength3 > 1000) {
					glassAmt_1 = 2;
					glassParams.glassType = "platform1";		// задаём тип стекла - платформа
				}
                var glassLengthX = glassSectionLength3 / glassAmt_1;
				
				
				//glassParams.handrailAngle = 0;
				var paltformGlassDeltaY = (glassParams.h1 * (glassParams.stairAmt) + 5) - glassParams.glassPosition.y - 150 + glassParams.glassIndent;
				glassParams.paltformGlassDeltaY = paltformGlassDeltaY;
                x0 = basePoint[0];
                y0 = basePoint[1];
                for (i = 0; i < glassAmt_1; i++) {
					if (i == glassAmt_1 - 1) {
						glassParams.glassType = "platform2";
					}
					
					glassParams = drawGlassShape(glassParams);
                    var geom = new THREE.ExtrudeGeometry(glassParams.glassShape, glassExtrudeOptions);
                    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                    var glass = new THREE.Mesh(geom, glassMaterial);

					glass.position.x = x0 + glassDist;
					if (i > 0) {
						glass.position.x = x0 + glassDist + glassParams.glassWidth[glassParams.glassWidth.length-2] + glassDist;
					}
					else {
						glassHolesCoordX = glassHolesCoordX + (glassParams.glassWidth[glassParams.glassWidth.length-1] + glassDist);
					}
                    glass.position.y = y0 + glassDist * Math.tan(handrailAngle) + paltformGlassDeltaY;
                    glass.position.z = z0;
					
					glassParams.glassPosition = {x: glassHolesCoordX, y: glassHolesCoordY};		// записываем координаты отверстий в стёклах
					
                    glass.castShadow = true;
                    railingSection.add(glass);
					
					/*// вычисляем координаты расположения стёкол и отверстий в них
					if (i == 0) {
						var glassCoordX1 = glassParams.glassWidth[i] + glassDist;		// координата Х первого стекла
						var glassHolesCoordX = x0 + glassCoordX1;
						var glassHolesCoordY = y0 + glassCoordX1 * Math.tan(handrailAngle);
						handrailGlassSectionLength = handrailGlassSectionLength + (glassParams.glassWidth[i] + glassDist) / Math.cos(handrailAngle);
					}
					if (i > 0) {
						glassCoordX = glassCoordX1 + (glassParams.glassWidth[i-1] + glassDist) * (i-1);		// координата Х остальных стекол
						glassHolesCoordX = glassHolesCoordX + (glassParams.glassWidth[i] + glassDist);
						glassHolesCoordY = glassHolesCoordY + (glassParams.glassWidth[i] + glassDist) * Math.tan(handrailAngle);
						handrailGlassSectionLength = handrailGlassSectionLength + (glassParams.glassWidth[i] + glassDist) / Math.cos(handrailAngle);
					}

					// позиционирование стекла
					glass.position.x = x0 + glassCoordX;
					glass.position.y = y0 + glassCoordX * Math.tan(handrailAngle);
					glass.position.z = z0;
					glass.castShadow = true;
					railingSection.add(glass);
					glassParams.glassType = "";		// обновляем тип стекла
					glassParams.glassPosition = {x: glassHolesCoordX, y: glassHolesCoordY};		// записываем координаты отверстий в стёклах*/
                }
            }
        }

		if (stairAmt == 0) {

            var glassSectionLength0 = platformLengthTop + platformLengthBottom - glassDist;
            if (bottomConnection) glassSectionLength0 = glassSectionLength0 + glassOffset; // - glassDist;
            if (topConnection) glassSectionLength0 = glassSectionLength0 + glassOffset + glassDist + glassThickness;

            ////console.log(bottomConnection, topConnection)
            var glassAngle = Math.atan(3 * h1 / glassSectionLength0);
            var glassAmt_1 = Math.round(glassSectionLength0 / 800);
            var glassLengthX = glassSectionLength0 / glassAmt_1;
            var p1 = [0, 0];
            var p2 = [glassLengthX * scale, glassLengthX * scale * Math.tan(glassAngle)];
            rackPosition0 = p1;
            rackPosition1 = p2;
            x0 = -platformLengthBottom * scale + glassDist * scale;
            if (bottomConnection) x0 = x0 - glassOffset;

            y0 = -rackOffsetY - h1;

            for (i = 0; i < glassAmt_1; i++) {
                var glassShape = drawGlassShape(p1, p2, glassAngle, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = x0 + glassLengthX * i;
                glass.position.y = y0 + glassLengthX * Math.tan(glassAngle) * i;
                glass.position.z = z0;
                glass.castShadow = true;
                railingSection.add(glass);
            }

            basePoint[0] = glass.position.x + glassLengthX;
            basePoint[1] = glass.position.y + glassLengthX * Math.tan(handrailAngle);
            basePoint[2] = glass.position.z;
        }
    // конец ограждения
	
	// Поручни
	
		var handrailModel = "rect";
		var handrailProfileY = 40;
		var handrailProfileZ = 60;

		if (handrail === "40х20 черн.") {
			handrailModel = "rect";
			handrailProfileY = 20;
			handrailProfileZ = 40;
		}
		if (handrail === "40х40 черн.") {
			handrailModel = "rect";
			handrailProfileY = 40;
			handrailProfileZ = 40;
		}
		if (handrail === "60х30 черн.") {
			handrailModel = "rect";
			handrailProfileY = 30;
			handrailProfileZ = 60;
		}
		if (handrail === "кованый полукруглый") {
			handrailModel = "rect";
			handrailProfileY = 30;
			handrailProfileZ = 50;
		}
		if (handrail === "40х40 нерж.") {
			handrailModel = "rect";
			handrailProfileY = 40;
			handrailProfileZ = 40;
		}
		if (handrail === "Ф50 нерж.") {
			handrailModel = "round";
			handrailProfileY = 50;
			handrailProfileZ = 50;
		}
		if (handrail === "Ф50 сосна") {
			handrailModel = "round";
			handrailProfileY = 50;
			handrailProfileZ = 50;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "омега-образный сосна") {
			handrailModel = "omega";
			handrailProfileY = 55;
			handrailProfileZ = 75;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "50х50 сосна") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "40х60 береза") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "омега-образный дуб") {
			handrailModel = "omega";
			handrailProfileY = 55;
			handrailProfileZ = 75;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "40х60 дуб") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "40х60 дуб с пазом") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "Ф50 нерж. с пазом") {
			handrailModel = "round";
			handrailProfileY = 50;
			handrailProfileZ = 50;
		}
		if (handrail === "40х60 нерж. с пазом") {
			handrailModel = "rect";
			handrailProfileY = 40;
			handrailProfileZ = 60;
		}

		var handrailMaterial =  railingMaterial;
		var handrailIndent = 20;		// отступ торца поручня от края стекла в продольном направлении

		z0 = z0 - (-6 + handrailProfileZ / 2) * scale;
		var handrailExtrudeOptions = {
			amount: handrailProfileZ * scale,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
		dxfBasePoint = glassParams.dxfBasePoint;
		dxfBasePoint.x = dxfBasePoint.x + 300;

		var handrailParams = {
			type: "",
			handrailAngle: handrailAngle,
			handrailProfileHeight: handrailProfileY,
			//handrailLength: (glassSectionLength2 + handrailIndent + glassDist) / Math.cos(handrailAngle) + handrailProfileY*0.5 * Math.tan(handrailAngle) + handrailProfileY*0.5 * Math.sin(handrailAngle/2),
			handrailLength: handrailGlassSectionLength + handrailIndent/Math.cos(handrailAngle) + handrailProfileY*0.5 * Math.tan(handrailAngle) + handrailProfileY*0.5 * Math.sin(handrailAngle/2),
			dxfBasePoint: dxfBasePoint
		}

		if (stairAmt != 0) {
	/* поручень нижней площадки*/

			if (bottomEnd != "нет") {
				var leftHeight = handrailProfileY / Math.cos(turnAngleBottom);
				var poleLength = glassSectionLength1;
				var deltaY = handrailProfileY / Math.cos(handrailAngle) - handrailProfileY / Math.cos(turnAngleBottom);
				x0 = 0 - glassSectionLength1 * scale;
				y0 = (glassHeight - rackOffsetY - 20 + deltaY) * scale - glassSectionLength1 * Math.tan(turnAngleBottom) * scale;
				var bottomPoleShape = draw4angleShape(turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale);
				var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
				bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
				bottomPole.position.x = x0;
				bottomPole.position.y = y0;
				bottomPole.position.z = z0;
				bottomPole.castShadow = true;
				railingSection.add(bottomPole);
			}

	/* поручень марша*/

			handrailParams = draw4angleShape(handrailParams);
			var handrailGeom = new THREE.ExtrudeGeometry(handrailParams.handrailShape, handrailExtrudeOptions);
			handrailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var handrail = new THREE.Mesh(handrailGeom, handrailMaterial);

			handrail.position.x = handrailBasePoint.x - handrailIndent;
			handrail.position.y = handrailBasePoint.y + glassHeight - handrailIndent * Math.tan(handrailAngle) - ((handrailProfileY*0.5)/Math.cos(handrailAngle));
			handrail.position.z = z0;
			handrail.castShadow = true;
			railingSection.add(handrail);

			basePoint[0] = handrail.position.x + handrailParams.lastPoint.x;
			basePoint[1] = handrail.position.y + handrailParams.lastPoint.y;

	/*поручень верхней площадки*/

			if (topEnd != "нет") {
				//var deltaY = handrailProfileY / Math.cos(handrailAngle) - handrailProfileY / Math.cos(turnAngleTop);
						
				handrailParams.handrailLength = ((b1 * (stairAmt-1) + 5) + platformLengthTop) - (handrailParams.lastPoint.x - handrailIndent + handrailBasePoint.x - handrailProfileY * Math.tan(handrailAngle/2));
				if (railingSectionParams.topPltRailing_5 === true) {
					handrailParams.handrailLength = handrailParams.handrailLength + handrailProfileZ;
				}
				handrailParams.type = "platformTop";
						
				handrailParams = draw4angleShape(handrailParams);
				var handrailGeom = new THREE.ExtrudeGeometry(handrailParams.handrailShape, handrailExtrudeOptions);
				handrailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
				var handrail = new THREE.Mesh(handrailGeom, handrailMaterial);
						
				handrail.position.x = basePoint[0];
				handrail.position.y = basePoint[1]/* + deltaY*/;
				handrail.position.z = z0;
				handrail.castShadow = true;
				railingSection.add(handrail);
			}
		}
		if (stairAmt == 0) {
			var leftHeight = handrailProfileY / Math.cos(glassAngle);
			var poleLength = glassSectionLength0;
			x0 = -platformLengthBottom * scale + glassDist * scale;
			if (bottomConnection) x0 = x0 - glassOffset * scale;
			y0 = (glassHeight - rackOffsetY - h1) * scale;
			var bottomPoleShape = draw4angleShape(glassAngle, glassAngle, poleLength, leftHeight, scale);
			var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
			bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
			bottomPole.position.x = x0;
			bottomPole.position.y = y0;
			bottomPole.position.z = z0;
			bottomPole.castShadow = true;
			railingSection.add(bottomPole);
		}
		// конец поручней
		railingSection.paltformGlassDeltaY = paltformGlassDeltaY;
		return (railingSection);
} //end of drawRailingSectionGlass();


	/*
	Ограждение с самонесущим стеклом для площадки
	*/

function drawRailingSectionGlassPlatform(railingSectionPlatformParams) {
/*	
					platformLength: M,
                    offsetLeft: 50,
                    offsetRight: 50,
                    handrailOffsetLeft: 50,
                    handrailOffsetRight: 50,
                    railingSide: "left",
                    scale: scale
*/
    var platformLength = railingSectionPlatformParams.platformLength;
    var offsetLeft = railingSectionPlatformParams.offsetLeft;
    var offsetRight = railingSectionPlatformParams.offsetRight;
    var handrailOffsetLeft = railingSectionPlatformParams.handrailOffsetLeft;
    var handrailOffsetRight = railingSectionPlatformParams.handrailOffsetRight;
    var railingSide = railingSectionPlatformParams.railingSide;
    //var scale = railingSectionPlatformParams.scale;
	var racks = railingSectionPlatformParams.racks;
	var paltformGlassDeltaY = railingSectionPlatformParams.paltformGlassDeltaY;

    var railingSection = new THREE.Object3D();
    var rackOffsetY = 150;
    var rackLength = 900;
    var railingPositionZ = -40;
    if (turnFactor == -1) railingPositionZ = 0;
    var basePoint = [];
    if (turnFactor == -1) {
        var railingSideTemp = railingSide;
        if (railingSideTemp == "left") railingSide = "right";
        if (railingSideTemp == "right") railingSide = "left";
    }

    /*материалы*/
    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var railingMaterial = new THREE.MeshLambertMaterial({ color: 0xD0D0D0, wireframe: false });
    var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
	var rutelMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000, overdraw: 0.5 });
    var glassThickness = 12;
    var handrailAngle = 0;
    var glassExtrudeOptions = {
        amount: glassThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
	var rutelExtrudeOptions = {
		amount: 50,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
    var forgingExtrudeOptions = {
        amount: 40,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
	
	var glassDist = 8; //зазор между стеклами
	var glassOffset = 20; //зазор от стекла до торца ступени
	var glassHeight = 1030;
	var glassIndent = 10;
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = glassOffset;
	if (railingSide == "left") z0 = (0 - glassOffset - glassThickness);
	var sectionLength = platformLength;
	var glassAngle = 0;
	//var glassAmt_1 = Math.round(sectionLength / 800);
	var glassAmt_1 = 1;
	var glassLengthX = sectionLength / glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX, 0];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	//x0 = glassDist;
	x0 = glassIndent;
	//y0 = -rackOffsetY;
	y0 = -rackOffsetY + glassIndent;
	//y0 = 0;
	
		// устанавливаем параметры стёкол
		dxfBasePoint = {};
		//dxfBasePoint.x = b1 * stairAmt + platformLengthTop + 300;
		dxfBasePoint.x = 0;
		//dxfBasePoint.y = 0.5 * glassHeight;
		dxfBasePoint.y = 0;
		var glassParams = {
			a1: a1,
			b1: b1,
			h1: h1,
			//p1: p1,
			//p2: p2,
			glassWidth: [],
			stairAmt: 0,
			platformLengthTop: platformLength,		// длина верхней платформы
			racksHoles: racks,						// координаты отверстий в тетиве
			handrailAngle: glassAngle,				// угол наклона марша
			glassDist: glassDist,					// расстояние между стеклами
			glassHeight: glassHeight,				// высота вертикальной линии стекла
			glassType: "platformBack",				// первое, последнее или на площадке
			glassIndent: glassIndent,				// отступ певого стекла от пола (взято с модели)
			rackOffsetY: rackOffsetY,				// смещение стёкол по оси Y
			paltformGlassDeltaY: paltformGlassDeltaY,
			dxfBasePoint: dxfBasePoint,
			glassSectionLength: 0,
		};
		
		// расставляем рутели
		var rutelRad = 7;
		for (j = 0; j < racks.length; j++) {
			rutelShape = new THREE.Shape();
			center = {x:0, y:0};
			addCircle(rutelShape, dxfPrimitivesArr, center, rutelRad, glassParams.dxfBasePoint);
			var geom = new THREE.ExtrudeGeometry(rutelShape, rutelExtrudeOptions);
			geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
			var rutel = new THREE.Mesh(geom, rutelMaterial);
			
			rutel.position.x = racks[j].x;
			rutel.position.y = racks[j].y;
			rutel.position.z = -40;
			rutel.castShadow = true;
			railingSection.add(rutel);

				var rutel1 = new THREE.Mesh(geom, rutelMaterial);
				rutel1.position.x = racks[j].x;
				rutel1.position.y = racks[j].y - 60;
				rutel1.position.z = -40;
				rutel1.castShadow = true;
				railingSection.add(rutel1);
		}	// конец расстановки рутелей

	for (i = 0; i < glassAmt_1; i++) {
		var glassParams = drawGlassShape(glassParams);
		var geom = new THREE.ExtrudeGeometry(glassParams.glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * i;
		glass.position.y = y0;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
	}
railingBasePosition = {
	x: glass.position.x,
	y: glass.position.y + glassHeight - paltformGlassDeltaY,
	z: glass.position.z
};
		basePoint[0] = glass.position.x + glassLengthX;
		basePoint[1] = glass.position.y + glassLengthX * Math.tan(handrailAngle);
		basePoint[2] = glass.position.z;
		
		
///////////////

	// Поручни
	
		var handrailModel = "rect";
		var handrailProfileY = 40;
		var handrailProfileZ = 60;

		if (handrail === "40х20 черн.") {
			handrailModel = "rect";
			handrailProfileY = 20;
			handrailProfileZ = 40;
		}
		if (handrail === "40х40 черн.") {
			handrailModel = "rect";
			handrailProfileY = 40;
			handrailProfileZ = 40;
		}
		if (handrail === "60х30 черн.") {
			handrailModel = "rect";
			handrailProfileY = 30;
			handrailProfileZ = 60;
		}
		if (handrail === "кованый полукруглый") {
			handrailModel = "rect";
			handrailProfileY = 30;
			handrailProfileZ = 50;
		}
		if (handrail === "40х40 нерж.") {
			handrailModel = "rect";
			handrailProfileY = 40;
			handrailProfileZ = 40;
		}
		if (handrail === "Ф50 нерж.") {
			handrailModel = "round";
			handrailProfileY = 50;
			handrailProfileZ = 50;
		}
		if (handrail === "Ф50 сосна") {
			handrailModel = "round";
			handrailProfileY = 50;
			handrailProfileZ = 50;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "омега-образный сосна") {
			handrailModel = "omega";
			handrailProfileY = 55;
			handrailProfileZ = 75;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "50х50 сосна") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "40х60 береза") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "омега-образный дуб") {
			handrailModel = "omega";
			handrailProfileY = 55;
			handrailProfileZ = 75;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "40х60 дуб") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "40х60 дуб с пазом") {
			handrailModel = "rect";
			handrailProfileY = 60;
			handrailProfileZ = 40;
			pole3DParams.poleMaterial = timberMaterial;
		}
		if (handrail === "Ф50 нерж. с пазом") {
			handrailModel = "round";
			handrailProfileY = 50;
			handrailProfileZ = 50;
		}
		if (handrail === "40х60 нерж. с пазом") {
			handrailModel = "rect";
			handrailProfileY = 40;
			handrailProfileZ = 60;
		}

		var handrailMaterial =  railingMaterial;
		var handrailIndent = 0;		// отступ торца поручня от края стекла в продольном направлении

		z0 = z0 - (-6 + handrailProfileZ / 2);
		var handrailExtrudeOptions = {
			amount: handrailProfileZ,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
		dxfBasePoint = {};
		dxfBasePoint.x = 0;
		dxfBasePoint.y = 0;
		var handrailParams = {
			type: "platformTop",
			handrailAngle: handrailAngle,
			handrailProfileHeight: handrailProfileY,
			handrailLength: platformLength - 2*glassIndent + glassThickness,
			dxfBasePoint: dxfBasePoint
		}
		
		handrailParams = draw4angleShape(handrailParams);
		var handrailGeom = new THREE.ExtrudeGeometry(handrailParams.handrailShape, handrailExtrudeOptions);
		handrailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var handrail = new THREE.Mesh(handrailGeom, handrailMaterial);
						
		handrail.position.x = railingBasePosition.x - glassThickness/2;
		handrail.position.y = railingBasePosition.y - handrailProfileY*0.5;
		handrail.position.z = z0;
		handrail.castShadow = true;
		railingSection.add(handrail);

		// конец поручней
	return (railingSection);
}	//end of drawRailingSectionGlassPlatform();







function drawRailingSection(railingSectionParams) {

    var bottomEnd = railingSectionParams.bottomEnd;
    var platformLengthBottom = railingSectionParams.platformLengthBottom;
    var topEnd = railingSectionParams.topEnd;
    var platformLengthTop = railingSectionParams.platformLengthTop;
    var railingSide = railingSectionParams.railingSide;
    var stairAmt = railingSectionParams.stairAmt;
    var h1 = railingSectionParams.h1;
    var b1 = railingSectionParams.b1;
    var a1 = railingSectionParams.a1;
    var h2 = railingSectionParams.h2;
    var scale = railingSectionParams.scale;
    var lastMarsh = railingSectionParams.lastMarsh;
    var topConnection = railingSectionParams.topConnection;
    var bottomConnection = railingSectionParams.bottomConnection;
    var rigelAmt = railingSectionParams.rigelAmt;
    var racks = railingSectionParams.racks;
    var dxfBasePoint = railingSectionParams.dxfBasePoint;

    //console.log(bottomEnd, platformLengthBottom, topEnd, platformLengthTop, 
    //railingSide, stairAmt, h1, b1, a1, h2, scale, lastMarsh, topConnection, bottomConnection)
    if (turnFactor === -1) {
        var railingSideTemp = railingSide;
        if (railingSideTemp === "left") railingSide = "right";
        if (railingSideTemp === "right") railingSide = "left";
    }
    var railingSection = new THREE.Object3D();
    var rackOffsetY = 150;
    var rackLength = 900;
    var rackPositionStep = setRackPosition(stairAmt);
    var handrailAngle = Math.atan(h1 / b1);
    var railingPositionZ = 0;
    if (turnFactor === -1) railingPositionZ = -40;
    var turnAngleTop = 0;
    var turnAngleBottom = 0;
    var basePoint = [];

    /*материалы*/
    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    //var stringerMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});
    //var floorMaterial = new THREE.MeshLambertMaterial( {color: 0xBFBFBF});
    var railingMaterial = new THREE.MeshLambertMaterial({ color: 0xD0D0D0, wireframe: false });
    var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
    var glassThickness = 8;
    if (railingModel === "Самонесущее стекло") glassThickness = 12;
    var glassExtrudeOptions = {
        amount: glassThickness * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var forgingExtrudeOptions = {
        amount: 40 * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    turnAngleTop = 0;
    if (topEnd === "забег") {
        var deltaXtopPlatform = platformLengthTop - b1 / 2 - 70;
        var deltaYtopPlatform = h2;
        turnAngleTop = Math.atan(deltaYtopPlatform / deltaXtopPlatform);
    }
    turnAngleBottom = 0;
    if (bottomEnd === "забег") {
        var deltaXbottomPlatform = platformLengthBottom + b1 / 2 - 70;
        var deltaYbottomPlatform = 2 * h1;
        turnAngleBottom = Math.atan(deltaYbottomPlatform / deltaXbottomPlatform);
    }


    /* —“ќ… » */

    var x;
    var y;
    var i;
    var y0;
    var x0;
    var z0;
    var p0;
    var rackPosition0;
    var rackPosition1;
    var rackPosition2;
    var sectionAngle;
    var sectionLength;

    //задаем параметры стоек
    var rack3dParams = {
        basePoint: [],
        rackLength: rackLength,
        handrailAngle: handrailAngle,
        rackMaterial: railingMaterial,
        scale: scale,
        railingSection: railingSection,
        rackPosition: [],
        rackNumber: 0,
        rackProfile: 40,
        handrailHolderLength: 70
    }

    //рисуем стойки
    if (railingModel === "Ригели" || railingModel === "Стекло на стойках") {

        if (stairAmt !== 0) {

            /*нижняя площадка*/
            if (bottomEnd === "площадка") {
                /*первая стойка площадки*/
                x0 = (70 - platformLengthBottom) * scale;
                y0 = -rackOffsetY * scale;
                z0 = railingPositionZ * scale;
                rack3dParams.basePoint = [x0, y0, z0];
                drawRack3d(rack3dParams);
            }
            if (bottomEnd === "забег") {
                /*первая стойка площадки*/
                x0 = (70 - platformLengthBottom) * scale;
                y0 = -rackOffsetY * scale - h1 * scale;
                z0 = railingPositionZ * scale;
                rack3dParams.basePoint = [x0, y0, z0];
                drawRack3d(rack3dParams);
            }
            rackPosition0 = rack3dParams.rackPosition[0]; //сохраняем координаты стойки площадки

            rack3dParams.rackPosition = [];
            rack3dParams.rackNumber = 0;
            rackPosition = rack3dParams.rackPosition;

            /*ограждения марша*/
            z0 = railingPositionZ * scale;
            for (i = 0; i < racks.length; i++) {
                x0 = racks[i].x;
                y0 = racks[i].y;
                rack3dParams.basePoint = [x0, y0, z0];
                drawRack3d(rack3dParams);
            }

            ///*первая стойка марша*/
            //x0 = b1 / 2 * scale;
            //y0 = h1 * scale - rackOffsetY * scale;
            //z0 = railingPositionZ * scale;
            //rack3dParams.basePoint = [x0, y0, z0];
            //drawRack3d(rack3dParams);
            //rackPosition1 = rackPosition[0]; //сохраняем координаты стойки марша

            //x = x0;
            //y = y0;
            ///*средние стойки марша*/
            //var rack;
            //for (i = 0; i < stairAmt; i++) {
            //    x = x0 + b1 * i * scale;
            //    y = y0 + h1 * i * scale;
            //    rack3dParams.basePoint = [x, y, z0];
            //    for (var j = 0; j < rackPositionStep.length; j++)
            //        if (i + 1 == rackPositionStep[j])
            //            rack = drawRack3d(rack3dParams).rackNumber;
            //}
            ///*последняя стойка марша*/
            //rack3dParams.basePoint = [x, y, z0];
            //if (topEnd === "нет" || topEnd === "забег")
            //    rack = drawRack3d(rack3dParams).rackNumber;

            //if (topEnd === "площадка") {
            //    rack3dParams.basePoint[0] += 50 * scale;
            //    rack = drawRack3d(rack3dParams).rackNumber;

            //    /*средние стойки площадки*/
            //    var middleRackAmt = Math.round(platformLengthTop / 800) - 1;
            //    if (middleRackAmt < 0) middleRackAmt = 0;
            //    p0 = rack3dParams.basePoint;
            //    var rackDist = (platformLengthTop - 70 - 100 - 40) / (middleRackAmt + 1);
            //    for (i = 0; i < middleRackAmt; i++) {
            //        p0 = newPoint_x(p0, rackDist * scale, 0);
            //        rack3dParams.basePoint = newPoint_x(p0, rackDist * scale, 0);
            //        drawRack3d(rack3dParams);
            //    }

            //    /*последняя стойка площадки*/
            //    rack3dParams.basePoint = newPoint_x(rack3dParams.basePoint, (platformLengthTop - 50 - 70 - b1 / 2) * scale, 0);
            //    drawRack3d(rack3dParams);
            //}

            if (topEnd === "забег") {
                /*последняя стойка площадки*/
                p0 = newPoint_x(rack3dParams.basePoint, (platformLengthTop - 70 - b1 / 2) * scale, 0);
                p0[1] = p0[1] + h2 * scale;
                rack3dParams.basePoint = p0;
                drawRack3d(rack3dParams);
            }


            if (topEnd === "забег") {
                rackPosition2 = rackPosition[rackPosition.length - 2];
                var rackPosition3 = rackPosition[rackPosition.length - 1];
                //var turnAngleTop = Math.atan( (rackPosition3[1] - rackPosition2[1])/(rackPosition3[0] - rackPosition2[0]))
            }

        }
        if (stairAmt === 0) {
            sectionLength = platformLengthBottom + platformLengthTop - 140;
            sectionAngle = Math.atan(3 * h1 / sectionLength);
            /*первая стойка*/
            x0 = (70 - platformLengthBottom) * scale;
            y0 = -rackOffsetY * scale - h1 * scale;
            z0 = railingPositionZ * scale;
            rack3dParams.basePoint = [x0, y0, z0];
            drawRack3d(rack3dParams);
            rackPosition0 = rack3dParams.rackPosition[0]; //сохраняем координаты стойки площадки

            /*остальные стойки*/
            var middleRackAmt = Math.round(sectionLength / 800);
            if (middleRackAmt < 0) middleRackAmt = 0;
            p0 = rack3dParams.basePoint;
            var rackDist = sectionLength / (middleRackAmt + 1);
            for (i = 0; i < middleRackAmt + 1; i++) {
                rack3dParams.basePoint = newPoint_x(p0, rackDist * scale, -sectionAngle);
                drawRack3d(rack3dParams);
            }
        }
    }


    /* ригели */

    var stepLength;
    var pole3DParams;
    if (railingModel === "Ригели") {

        //задаем параметры ригелей
        pole3DParams = {
            poleType: "rect",
            poleProfileY: 20,
            poleProfileZ: 20,
            basePoint: [0, 0, 0],
            length: 0,
            poleAngle: 0,
            poleMaterial: railingMaterial,
            scale: scale,
            railingSection: railingSection
        };

        if (rigelMaterial === "Ф12 нерж.") {
            pole3DParams.poleType = "round";
            pole3DParams.poleProfileY = 12;
            pole3DParams.poleProfileZ = 12;
        }
        if (rigelMaterial === "Ф16 нерж.") {
            pole3DParams.poleType = "round";
            pole3DParams.poleProfileY = 16;
            pole3DParams.poleProfileZ = 16;
        }

        if (railingSide === "left") z0 = (railingPositionZ + 40) * scale * turnFactor;
        if (railingSide === "right") z0 = (railingPositionZ - pole3DParams.poleProfileZ) * scale; //*turnFactor;

        var rigelDist;
        if (stairAmt !== 0) {
            /*нижняя площадка*/
            if (bottomEnd === "площадка") {
                x0 = (70 - platformLengthBottom) * scale;
                y0 = 0; //- rackOffsetY*scale;
                pole3DParams.length = platformLengthBottom + b1 / 2;
                rigelAmt = Number(rigelAmt);
                rigelDist = (rackLength - 150) / (rigelAmt + 1);
                for (i = 1; i < rigelAmt + 1; i++) {
                    y0 = h1 * scale + rigelDist * i * scale - rackOffsetY * scale;
                    pole3DParams.basePoint = [x0, y0, z0];
                    pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -30 * scale, -handrailAngle);
                    drawPole3D(pole3DParams);
                }
            }

            if (bottomEnd === "забег") {
                turnAngleBottom = Math.atan((rackPosition1[1] - rackPosition0[1]) / (rackPosition1[0] - rackPosition0[0]));
                x0 = (70 - platformLengthBottom) * scale;
                y0 = 0; //- rackOffsetY*scale;
                pole3DParams.length = (platformLengthBottom + b1 / 2) / Math.cos(turnAngleBottom);
                pole3DParams.poleAngle = turnAngleBottom;
                rigelAmt = Number(rigelAmt);
                rigelDist = (rackLength - 150) / (rigelAmt + 1);
                for (i = 1; i < rigelAmt + 1; i++) {
                    y0 = rigelDist * i * scale - rackOffsetY * scale - 60 * scale;
                    pole3DParams.basePoint = [x0, y0, z0];
                    pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -30 * scale, -handrailAngle);
                    drawPole3D(pole3DParams);
                }


            }

            /*ригели на марше*/
            stepLength = h1 / Math.sin(handrailAngle);
            pole3DParams.length = stepLength * (stairAmt - 1) + 100;
            pole3DParams.poleAngle = handrailAngle;
            x0 = b1 / 2 * scale;
            rigelAmt = Number(rigelAmt);
            rigelDist = (rackLength - 150) / (rigelAmt + 1);
            for (i = 1; i < rigelAmt + 1; i++) {
                y0 = h1 * scale + rigelDist * i * scale;
                pole3DParams.basePoint = [x0, y0, z0];
                pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -30 * scale, -handrailAngle);
                var basePointObj = {};
                basePointObj.x = pole3DParams.basePoint[0];
                basePointObj.y = pole3DParams.basePoint[1];
                basePointObj.z = pole3DParams.basePoint[2];

                //console.log(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, handrailAngle)
                drawPole3D(pole3DParams);
            }

            if (topEnd === "площадка") {
                pole3DParams.basePoint = [x, y, z0];
                var p1t = pole3DParams.basePoint; //сохраняем точку
                pole3DParams.basePoint[0] += 50 * scale;
                y0 = pole3DParams.basePoint[1];
                pole3DParams.length = platformLengthTop - 70 - b1 / 2;
                pole3DParams.poleAngle = 0;
                for (i = 1; i < rigelAmt + 1; i++) {
                    pole3DParams.basePoint[1] = y0 + h1 * scale + rigelDist * i * scale;
                    drawPole3D(pole3DParams);
                }
            }
            if (topEnd === "забег") {
                pole3DParams.basePoint = rackPosition2;
                pole3DParams.basePoint[2] = z0;
                y0 = pole3DParams.basePoint[1];
                pole3DParams.length = (platformLengthTop - 70 - b1 / 2) / Math.cos(turnAngleTop);
                pole3DParams.poleAngle = turnAngleTop;
                for (i = 1; i < rigelAmt + 1; i++) {
                    pole3DParams.basePoint[1] = y0 + h1 * scale + rigelDist * i * scale - 60 * scale;
                    drawPole3D(pole3DParams);
                }
            }
        }

        if (stairAmt === 0) {
            //middleRackAmt
            pole3DParams.length = (sectionLength + 60) / Math.cos(sectionAngle);
            pole3DParams.poleAngle = sectionAngle;
            x0 = rackPosition0[0];
            rigelAmt = Number(rigelAmt);
            rigelDist = (rackLength - 150) / (rigelAmt + 1);
            for (i = 1; i < rigelAmt + 1; i++) {
                y0 = -h1 * scale + rigelDist * i * scale;
                pole3DParams.basePoint = [x0, y0, z0];
                pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -30 * scale, -sectionAngle);
                drawPole3D(pole3DParams);
            }


        }

    }
    /* стекла на стойках */

    if (railingModel === "Стекло на стойках") {
        var glassDist = 80;
        var glassHeight = 600;
        for (i = 0; i < rackPosition.length - 1; i++) {
            if (rackPosition[i][1] == rackPosition[i + 1][1])
                var glassShape = drawGlassShape(rackPosition[i], rackPosition[i + 1], 0, glassDist, glassHeight, scale);
            else
                var glassShape = drawGlassShape(rackPosition[i], rackPosition[i + 1], handrailAngle, glassDist, glassHeight, scale);
            var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

            var glass = new THREE.Mesh(geom, glassMaterial);
            glass.position.x = rackPosition[i][0] + glassDist / 2 * scale;
            glass.position.y = rackPosition[i][1] + 230 * scale;
            glass.position.z = railingPositionZ * scale + 16 * scale;

            glass.castShadow = true;
            railingSection.add(glass);
            //stairCase.push(glass);
        }
        if (stairAmt != 0) {
            if (bottomEnd == "площадка") {
                var rackDist0 = platformLengthBottom - 70 + b1 / 2;
                var p1 = rackPosition0;
                var p2 = newPoint_x(p1, rackDist0 * scale, 0);
                var glassShape = drawGlassShape(p1, p2, 0, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = rackPosition0[0] + glassDist / 2 * scale;
                glass.position.y = rackPosition0[1] + 230 * scale;
                glass.position.z = railingPositionZ * scale + 16 * scale;

                glass.castShadow = true;
                railingSection.add(glass);
            }

            if (bottomEnd == "забег") {
                turnAngleBottom = Math.atan((rackPosition1[1] - rackPosition0[1]) / (rackPosition1[0] - rackPosition0[0]));
                var glassShape = drawGlassShape(rackPosition0, rackPosition1, turnAngleBottom, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = rackPosition0[0] + glassDist / 2 * scale;
                glass.position.y = rackPosition0[1] + 230 * scale;
                glass.position.z = railingPositionZ * scale + 16 * scale;
                glass.castShadow = true;
                railingSection.add(glass);
            }
        }
    } //конец стекол на стойках


    /* —јћќЌ?—”ў?? —“? Ћќ */

    if (railingModel === "Самонесущее стекло") {


        var glassDist = 10; //зазор между стеклами
        var glassOffset = 15; //зазор от стекла до торца ступени
        var glassHeight = 1030;
        if (glassHandrail == "сбоку") glassHeight = 1100;
        if (railingSide == "right") z0 = (railingPositionZ + glassOffset) * scale;
        if (railingSide == "left") z0 = (railingPositionZ + 40 - glassOffset - glassThickness) * scale;

        if (stairAmt != 0) {
            if (topEnd == "забег") {
                deltaXtopPlatform = platformLengthTop - b1;
                deltaYtopPlatform = h1;
                turnAngleTop = Math.atan(deltaYtopPlatform / deltaXtopPlatform);
            }
            if (bottomEnd == "забег") {
                deltaXbottomPlatform = platformLengthBottom;
                deltaYbottomPlatform = h1;
                turnAngleBottom = Math.atan(deltaYbottomPlatform / deltaXbottomPlatform);
            }

            /*нижняя площадка*/

            if (bottomEnd != "нет") {

                var glassSectionLength1 = platformLengthBottom;
                if (bottomConnection) glassSectionLength1 = glassSectionLength1 + glassOffset - glassDist;

                var glassAmt_1 = Math.round(glassSectionLength1 / 800);
                var glassLengthX = glassSectionLength1 / glassAmt_1;
                var p1 = [0, 0];
                var p2 = [glassLengthX * scale, glassLengthX * scale * Math.tan(turnAngleBottom)];
                x0 = 0 - glassSectionLength1 * scale;
                y0 = -rackOffsetY * scale - glassSectionLength1 * Math.tan(turnAngleBottom) * scale;
                for (i = 0; i < glassAmt_1; i++) {
                    var glassShape = drawGlassShape(p1, p2, turnAngleBottom, glassDist, glassHeight, scale);
                    var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                    var glass = new THREE.Mesh(geom, glassMaterial);
                    glass.position.x = x0 + glassLengthX * scale * i;
                    glass.position.y = y0 + glassLengthX * scale * Math.tan(turnAngleBottom) * i;
                    glass.position.z = z0;
                    glass.castShadow = true;
                    railingSection.add(glass);

                }
            }

            /*марш*/

            var glassSectionLength2 = b1 * stairAmt;

            if (topEnd == "нет") {
                if (lastMarsh) glassSectionLength2 = b1 * (stairAmt - 1) + a1;
                else glassSectionLength2 = b1 * stairAmt - glassDist - glassOffset;
            }

            if (bottomEnd == "нет") glassSectionLength2 = glassSectionLength2 - glassOffset;
            var glassAmt_1 = Math.round(glassSectionLength2 / 800);
            if (glassAmt_1 == 0) glassAmt_1 = 1;
            var glassLengthX = glassSectionLength2 / glassAmt_1;
            var p1 = [0, 0];
            var p2 = [glassLengthX * scale, glassLengthX * scale * Math.tan(handrailAngle)];
            rackPosition0 = p1;
            rackPosition1 = p2;
            x0 = 0;
            if (bottomEnd == "нет") x0 = glassOffset * scale;
            y0 = -rackOffsetY * scale;//-h1*scale;
            for (i = 0; i < glassAmt_1; i++) {
                var glassShape = drawGlassShape(p1, p2, handrailAngle, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = x0 + glassLengthX * scale * i;
                glass.position.y = y0 + glassLengthX * scale * Math.tan(handrailAngle) * i;
                glass.position.z = z0;
                glass.castShadow = true;
                railingSection.add(glass);
            }

            basePoint[0] = glass.position.x + glassLengthX * scale;
            basePoint[1] = glass.position.y + glassLengthX * scale * Math.tan(handrailAngle);
            basePoint[2] = glass.position.z;

            /*верхняя площадка*/

            if (topEnd != "нет") {

                var glassSectionLength3 = platformLengthTop - b1;
                if (topConnection) glassSectionLength3 = glassSectionLength3 + glassOffset + glassDist + glassThickness;
                var glassAmt_1 = Math.round(glassSectionLength3 / 800);
                var glassLengthX = glassSectionLength3 / glassAmt_1;
                var p1 = [0, 0];
                var p2 = [glassLengthX * scale, glassLengthX * scale * Math.tan(turnAngleTop)];
                x0 = basePoint[0];
                y0 = basePoint[1];
                //z0 = basePoint[2]
                for (i = 0; i < glassAmt_1; i++) {
                    var glassShape = drawGlassShape(p1, p2, turnAngleTop, glassDist, glassHeight, scale);
                    var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                    var glass = new THREE.Mesh(geom, glassMaterial);
                    glass.position.x = x0 + glassLengthX * scale * i;
                    glass.position.y = y0 + glassLengthX * scale * Math.tan(turnAngleTop) * i;
                    glass.position.z = z0;
                    glass.castShadow = true;
                    railingSection.add(glass);
                }
            }
        }

        if (stairAmt == 0) {

            var glassSectionLength0 = platformLengthTop + platformLengthBottom - glassDist;
            if (bottomConnection) glassSectionLength0 = glassSectionLength0 + glassOffset; // - glassDist;
            if (topConnection) glassSectionLength0 = glassSectionLength0 + glassOffset + glassDist + glassThickness;

            ////console.log(bottomConnection, topConnection)
            var glassAngle = Math.atan(3 * h1 / glassSectionLength0);
            var glassAmt_1 = Math.round(glassSectionLength0 / 800);
            var glassLengthX = glassSectionLength0 / glassAmt_1;
            var p1 = [0, 0];
            var p2 = [glassLengthX * scale, glassLengthX * scale * Math.tan(glassAngle)];
            rackPosition0 = p1;
            rackPosition1 = p2;
            x0 = -platformLengthBottom * scale + glassDist * scale;
            if (bottomConnection) x0 = x0 - glassOffset * scale;

            y0 = -rackOffsetY * scale - h1 * scale;

            for (i = 0; i < glassAmt_1; i++) {
                var glassShape = drawGlassShape(p1, p2, glassAngle, glassDist, glassHeight, scale);
                var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var glass = new THREE.Mesh(geom, glassMaterial);
                glass.position.x = x0 + glassLengthX * scale * i;
                glass.position.y = y0 + glassLengthX * scale * Math.tan(glassAngle) * i;
                glass.position.z = z0;
                glass.castShadow = true;
                railingSection.add(glass);
            }

            basePoint[0] = glass.position.x + glassLengthX * scale;
            basePoint[1] = glass.position.y + glassLengthX * scale * Math.tan(handrailAngle);
            basePoint[2] = glass.position.z;
        }
    }// конец самонесущего стекла


    /*  ковка */
    if (railingModel === "Кованые балясины") {

        rackPosition = [];
        rackNumber = 0;

        var angleBottom = 0;
        var angleTop = handrailAngle;
        var forgedRackProfile = 40;
        var forgedRackLength = 900;
        var longRackLength = 900;
        var shortRackLength = rackOffsetY;

        if (stairAmt != 0) {
            /*нижняя площадка*/
            if (bottomEnd == "площадка") {
                /*первая стойка площадки*/
                x0 = (70 - platformLengthBottom) * scale;
                y0 = -rackOffsetY * scale;
                z0 = railingPositionZ * scale;
                basePoint = [x0, y0, z0];
                drawForgedRack3d(basePoint, longRackLength, turnAngleBottom, railingMaterial, scale, railingSection);
            }
            if (bottomEnd == "забег") {
                /*первая стойка площадки*/
                x0 = (70 - platformLengthBottom) * scale;
                y0 = -rackOffsetY * scale - h1 * scale;
                z0 = railingPositionZ * scale;
                basePoint = [x0, y0, z0];
                drawForgedRack3d(basePoint, longRackLength, turnAngleBottom, railingMaterial, scale, railingSection);
            }

            if (bottomEnd != "нет") {
                rackPosition0 = basePoint; //сохраняем координаты стойки площадки
                //обнуляем массив координат стоек 
                rackPosition = [];
                rackNumber = 0;
            }

            /*первая стойка марша*/
            x0 = b1 / 2 * scale;
            y0 = h1 * scale - rackOffsetY * scale;
            z0 = railingPositionZ * scale;
            basePoint = [x0, y0, z0];
            p0 = [x0, y0, z0];
            p0 = newPoint_x(p0, forgedRackProfile * scale, -handrailAngle);
            console.log(rackPosition)
            drawForgedRack3d(basePoint, longRackLength, handrailAngle, railingMaterial, scale, railingSection);
            console.log(rackPosition)
            rackPosition1 = rackPosition[0]; //сохраняем координаты стойки
            console.log(rackPosition[0])

            /*средние стойки марша*/
            for (i = 0; i < stairAmt; i++) {
                x = x0 + b1 * i * scale;
                y = y0 + h1 * i * scale;
                basePoint = [x, y, z0];
                for (var j = 0; j < rackPositionStep.length; j++)
                    if (i + 1 == rackPositionStep[j]) {
                        console.log(basePoint, shortRackLength, handrailAngle);
                        drawForgedRack3d(basePoint, shortRackLength, handrailAngle, railingMaterial, scale, railingSection);
                    }
            }
            /*последняя стойка марша*/
            basePoint = [x, y, z0];
            var rackTopAngle = handrailAngle;
            if (topEnd == "площадка") rackTopAngle = 0;
            if (topEnd == "забег") rackTopAngle = turnAngleTop;
            rackPosition2 = basePoint; //сохраняем координаты стойки


            drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection);
            var p1 = [x, y, z0];

            /*верхняя площадка*/

            if (topEnd == "площадка") {

                /*средние стойки площадки*/
                var middleRackAmt = Math.ceil(platformLengthTop / 1000) - 1;
                if (middleRackAmt < 0) middleRackAmt = 0;
                var rackDist = (platformLengthTop - 70 - 100 - 40) / (middleRackAmt + 1);
                for (i = 0; i < middleRackAmt; i++) {
                    basePoint = newPoint_x(basePoint, rackDist * scale, 0);
                    drawForgedRack3d(basePoint, shortRackLength, rackTopAngle, railingMaterial, scale, railingSection);
                }

                /*последняя стойка площадки*/
                //basePoint = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
                basePoint = newPoint_x(basePoint, rackDist * scale, 0);
                drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection);
            }
            if (topEnd == "забег") {
                /*последняя стойка площадки*/
                basePoint = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1 / 2) * scale, 0);
                basePoint[1] = basePoint[1] + h2 * scale;
                drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection);
            }

            var p2 = basePoint;

            /*нижняя перемычка нижней площадки*/

            if (bottomEnd != "нет") {
                var leftHeight = 20 / Math.cos(turnAngleBottom);
                var poleLength = (platformLengthBottom + b1 / 2 - 70 - 40) / Math.cos(turnAngleBottom);
                var bottomPoleShape = draw4angleShape(turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale);
                var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
                bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
                bottomPole.position.x = rackPosition0[0];
                bottomPole.position.y = rackPosition0[1] + rackOffsetY * scale;
                bottomPole.position.z = z0;
                bottomPole.castShadow = true;
                railingSection.add(bottomPole);
            }

            /*нижняя перемычка марша*/

            var leftHeight = 20 / Math.cos(handrailAngle);
            console.log(handrailAngle);
            console.log(leftHeight);
            var poleLength = b1 * stairAmt - b1;
            var bottomPoleShape = draw4angleShape(handrailAngle, handrailAngle, poleLength, leftHeight, scale);
            var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
            bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
            bottomPole.position.x = rackPosition1[0];
            bottomPole.position.y = rackPosition1[1] + rackOffsetY * scale;
            bottomPole.position.z = z0;
            bottomPole.castShadow = true;
            railingSection.add(bottomPole);

            /*нижняя перемычка верхней площадки*/

            if (topEnd != "нет") {
                var leftHeight = 20 / Math.cos(turnAngleTop);
                console.log(leftHeight);
                var poleLength = (platformLengthTop - b1 / 2 - 70 - 50 + 40) / Math.cos(turnAngleTop);
                var bottomPoleShape = draw4angleShape(turnAngleTop, turnAngleTop, poleLength, leftHeight, scale);
                var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
                bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
                bottomPole.position.x = rackPosition2[0];
                bottomPole.position.y = rackPosition2[1] + rackOffsetY * scale;
                bottomPole.position.z = z0;
                bottomPole.castShadow = true;
                railingSection.add(bottomPole);
            }


            /*балясины нижней площадки*/

            if (bottomEnd != "нет") {
                var p0t = rackPosition0;
                p0t = newPoint_x(p0t, 40 * scale, -turnAngleBottom);
                var p1t = rackPosition1;
                var balAmt = Math.round((p1t[0] - p0t[0]) / (balDist[0] * scale));
                balDist[1] = (p1t[0] - p0t[0]) / (balAmt + 1);
                var angle_1 = -turnAngleBottom;
                var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
                insertPoint[1] += leftHeight / 2 * scale + rackOffsetY * scale;
                var bal_1 = banister1;
                var bal_2 = banister2;
                var balAmt1 = 0;
                var balAmt2 = 0;
                var balType = bal_2;
                for (i = 0; i < balAmt; i++) {
                    if (balType == bal_1) {
                        balType = bal_2;
                        balAmt2 = balAmt2 + 1;
                    }
                    else {
                        balType = bal_1;
                        balAmt1 = balAmt1 + 1;
                    }
                    drawForgedBanister(balType, insertPoint, scale, railingMaterial, railingSection);
                    insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
                }
            }

            /*балясины марша*/
            var balAmt = Math.round((p1[0] - p0[0]) / (balDist[0] * scale));
            balDist[1] = (p1[0] - p0[0]) / (balAmt + 1);
            var angle_1 = handrailAngle;
            var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
            insertPoint[1] += leftHeight / 2 * scale + rackOffsetY * scale;
            var bal_1 = banister1;
            var bal_2 = banister2;
            var balAmt1 = 0;
            var balAmt2 = 0;
            var balType = bal_2;
            for (i = 0; i < balAmt; i++) {
                if (balType == bal_1) {
                    balType = bal_2;
                    balAmt2 = balAmt2 + 1;
                }
                else {
                    balType = bal_1;
                    balAmt1 = balAmt1 + 1;
                }
                //console.log(balType, insertPoint, scale)
                //drawForgedBanister(type, basePoint, scale, railingMaterial, railingSection) 
                drawForgedBanister(balType, insertPoint, scale, railingMaterial, railingSection);
                insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
            }

            /*балясины верхей площадки*/

            if (topEnd != "нет") {
                var p0t = p1;
                p0t = newPoint_x(p0t, 40 * scale, 0);
                var p1t = p2;
                var balAmt = Math.round((p1t[0] - p0t[0]) / (balDist[0] * scale));
                balDist[1] = (p1t[0] - p0t[0]) / (balAmt + 1);
                var angle_1 = -turnAngleTop;
                var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
                insertPoint[1] += leftHeight / 2 * scale + rackOffsetY * scale;
                var bal_1 = banister1;
                var bal_2 = banister2;
                var balAmt1 = 0;
                var balAmt2 = 0;
                var balType = bal_2;
                for (i = 0; i < balAmt; i++) {
                    if (balType == bal_1) {
                        balType = bal_2;
                        balAmt2 = balAmt2 + 1;
                    }
                    else {
                        balType = bal_1;
                        balAmt1 = balAmt1 + 1;
                    }
                    drawForgedBanister(balType, insertPoint, scale, railingMaterial, railingSection);
                    insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
                }
            }
        }

        if (stairAmt == 0) {
            sectionLength = platformLengthBottom + platformLengthTop - 140;
            sectionAngle = Math.atan(3 * h1 / sectionLength);
            /*первая стойка*/
            x0 = (50 - platformLengthBottom) * scale;
            y0 = -rackOffsetY * scale - h1 * scale;
            z0 = railingPositionZ * scale;
            basePoint = [x0, y0, z0];
            drawForgedRack3d(basePoint, longRackLength, sectionAngle, railingMaterial, scale, railingSection);
            rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки

            /*средние стойки*/
            var middleRackAmt = Math.round(sectionLength / 800);
            if (middleRackAmt < 0) middleRackAmt = 0;
            p0 = basePoint;
            var rackDist = sectionLength / (middleRackAmt + 1);
            for (i = 0; i < middleRackAmt; i++) {
                p0 = newPoint_x(p0, rackDist * scale, -sectionAngle);
                drawForgedRack3d(p0, shortRackLength, sectionAngle, railingMaterial, scale, railingSection);
            }
            /*последняя стойка*/
            p0 = newPoint_x(p0, rackDist * scale, -sectionAngle);
            drawForgedRack3d(p0, longRackLength, sectionAngle, railingMaterial, scale, railingSection);

            /*нижняя перемычка*/
            var leftHeight = 20 / Math.cos(sectionAngle);
            var poleLength = sectionLength;
            var bottomPoleShape = draw4angleShape(sectionAngle, sectionAngle, poleLength, leftHeight, scale);
            var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
            bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
            bottomPole.position.x = rackPosition0[0];
            bottomPole.position.y = rackPosition0[1] + rackOffsetY * scale;
            bottomPole.position.z = z0;
            bottomPole.castShadow = true;
            railingSection.add(bottomPole);

            /*балясины*/

            var balAmt = Math.round((sectionLength - 40) / balDist[0]);
            //console.log(balAmt);
            balDist[1] = (sectionLength - 40) / (balAmt + 1) * scale;
            var angle_1 = sectionAngle;
            p0 = newPoint_x(rackPosition0, 40 * scale, -angle_1);
            p0[1] = p0[1] - 5 * scale;
            p0[2] = z0 + 14 * scale;
            var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
            insertPoint[1] += leftHeight / 2 * scale + rackOffsetY * scale;
            var bal_1 = banister1;
            var bal_2 = banister2;
            var balAmt1 = 0;
            var balAmt2 = 0;
            var balType = bal_2;
            for (i = 0; i < balAmt; i++) {
                if (balType == bal_1) {
                    balType = bal_2;
                    balAmt2 = balAmt2 + 1;
                }
                else {
                    balType = bal_1;
                    balAmt1 = balAmt1 + 1;
                }
                drawForgedBanister(balType, insertPoint, scale, railingMaterial, railingSection);
                insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
            }


        }

    }//конец кованых ограждений



    /* поручни*/

    if (handrail !== "нет") {

        //задаем параметры поручней
        pole3DParams = {
            poleType: "rect",
            poleProfileY: 40,
            poleProfileZ: 60,
            basePoint: [0, 0, 0],
            length: 0,
            poleAngle: 0,
            poleMaterial: railingMaterial,
            scale: scale,
            railingSection: railingSection
        };

        /*параметры поручня в зависимости от модели*/
        var handrailModel = "rect";
        var handrailProfileY = 40;
        var handrailProfileZ = 60;

        if (handrail === "40х20 черн.") {
            handrailModel = "rect";
            handrailProfileY = 20;
            handrailProfileZ = 40;
        }
        if (handrail === "40х40 черн.") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 40;
        }
        if (handrail === "60х30 черн.") {
            handrailModel = "rect";
            handrailProfileY = 30;
            handrailProfileZ = 60;
        }
        if (handrail === "кованый полукруглый") {
            handrailModel = "rect";
            handrailProfileY = 30;
            handrailProfileZ = 50;
        }
        if (handrail === "40х40 нерж.") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 40;
        }
        if (handrail === "Ф50 нерж.") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
        }
        if (handrail === "Ф50 сосна") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "омега-образный сосна") {
            handrailModel = "omega";
            handrailProfileY = 55;
            handrailProfileZ = 75;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "50х50 сосна") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "40х60 береза") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "омега-образный дуб") {
            handrailModel = "omega";
            handrailProfileY = 55;
            handrailProfileZ = 75;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "40х60 дуб") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "40х60 дуб с пазом") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            pole3DParams.poleMaterial = timberMaterial;
        }
        if (handrail === "Ф50 нерж. с пазом") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
        }
        if (handrail === "40х60 нерж. с пазом") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 60;
        }

        pole3DParams.poleType = handrailModel;
        pole3DParams.poleProfileY = handrailProfileY;
        pole3DParams.poleProfileZ = handrailProfileZ;

        if (railingModel !== "Самонесущее стекло") {
            if (stairAmt !== 0) {
                /*поручень нижней площадки*/

                if (bottomEnd === "площадка") {
                    pole3DParams.basePoint[0] = -platformLengthBottom * scale - (handrailProfileZ + 40) / 2 * scale;
                    pole3DParams.basePoint[1] = -rackOffsetY * scale + rackLength * scale;
                    pole3DParams.basePoint[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                    pole3DParams.length = platformLengthBottom + b1 / 2 + handrailProfileZ / 2;
                    pole3DParams.poleAngle = 0;

                    drawPole3D(pole3DParams);
                }
                if (bottomEnd === "забег") {
                    turnAngleBottom = Math.atan((rackPosition1[1] - rackPosition0[1]) / (rackPosition1[0] - rackPosition0[0]));
                    if (!bottomConnection) {
                        basePoint[0] = -platformLengthBottom * scale - (handrailProfileZ + 40) / 2 * scale;
                        basePoint[1] = -rackOffsetY * scale + rackLength * scale - h1 * scale;
                        basePoint[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                        var deltaY = (rackPosition0[0] - basePoint[0]) * Math.tan(turnAngleBottom);
                        basePoint[1] = basePoint[1] - deltaY;

                        pole3DParams.basePoint = basePoint;
                    }
                    if (bottomConnection) {
                        basePoint[0] = -platformLengthBottom * scale + 70 * scale;
                        basePoint[1] = -rackOffsetY * scale + rackLength * scale - h1 * scale;
                        basePoint[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                        var basePoint1 = [];
                        basePoint1[0] = -platformLengthBottom * scale;
                        basePoint1[1] = -rackOffsetY * scale + rackLength * scale - h1 * scale;
                        basePoint1[2] = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;

                        pole3DParams.length = 70;
                        pole3DParams.poleAngle = 0;
                        pole3DParams.basePoint = basePoint1;

                        drawPole3D(pole3DParams);

                        pole3DParams.basePoint = basePoint;
                    }

                    pole3DParams.length = (rackPosition1[0] - pole3DParams.basePoint[0]) / scale / Math.cos(turnAngleBottom);
                    pole3DParams.poleAngle = turnAngleBottom;

                    drawPole3D(pole3DParams);
                }

                /*поручень марша*/
                pole3DParams.shape = new THREE.Shape();

                stepLength = h1 / Math.sin(handrailAngle);
                var handrailLength = stepLength * stairAmt - 1 / 3 * stepLength;

                if (topEnd === "площадка") handrailLength = handrailLength - 1 / 3 * stepLength;
                if (topEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;
                if (bottomEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;

                x0 = b1 / 2 * scale;
                y0 = h1 * scale - rackOffsetY * scale + rackLength * scale + racks[0].y - 90;
                z0 = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;

                pole3DParams.length = handrailLength;
                pole3DParams.poleAngle = handrailAngle;

                var p0 = { x: 0, y: 0 }
                console.log(pole3DParams);
                var p1 = polar(p0, pole3DParams.poleAngle + Math.PI / 2, pole3DParams.poleProfileY);
                var p2 = polar(p1, pole3DParams.poleAngle, pole3DParams.length);
                var p3 = newPoint_xy(p2, platformLengthTop - b1 / 2, 0);
                var p4 = newPoint_xy(p3, 0, -pole3DParams.poleProfileY);
                var p5 = itercection(p0, polar(p0, pole3DParams.poleAngle, 100), p4, newPoint_xy(p4, -100, 0));

                addLine(pole3DParams.shape, dxfPrimitivesArr, p0, p1, dxfBasePoint);
                addLine(pole3DParams.shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
                addLine(pole3DParams.shape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
                addLine(pole3DParams.shape, dxfPrimitivesArr, p3, p4, dxfBasePoint);
                addLine(pole3DParams.shape, dxfPrimitivesArr, p4, p5, dxfBasePoint);
                addLine(pole3DParams.shape, dxfPrimitivesArr, p5, p0, dxfBasePoint);

                var handrailExtrudeOptions = {
                    amount: pole3DParams.poleProfileZ * scale,
                    bevelEnabled: false,
                    curveSegments: 12,
                    steps: 1
                };
                var geom = new THREE.ExtrudeGeometry(pole3DParams.shape, handrailExtrudeOptions);
                geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var handrail = new THREE.Mesh(geom, pole3DParams.poleMaterial);
                handrail.position.x = 0;
                handrail.position.y = y0 - 100;
                handrail.position.z = -pole3DParams.poleProfileZ / 2 - rack3dParams.rackProfile / 2;
                handrail.castShadow = true;
                carcas.push(handrail);  //scene.add()

                //stepLength = h1 / Math.sin(handrailAngle);
                //var handrailLength = stepLength * stairAmt - 1 / 3 * stepLength;

                //if (topEnd === "площадка") handrailLength = handrailLength - 1 / 3 * stepLength;
                //if (topEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;
                //if (bottomEnd === "забег") handrailLength = handrailLength - 1 / 3 * stepLength;

                //x0 = b1 / 2 * scale;
                //y0 = h1 * scale - rackOffsetY * scale + rackLength * scale + racks[0].y -90;
                //z0 = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;

                //pole3DParams.length = handrailLength;
                //pole3DParams.poleAngle = handrailAngle;
                //pole3DParams.basePoint = [x0, y0, z0];

                //if (bottomEnd !== "забег")
                //    pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -b1 / 3 * scale, -handrailAngle);

                //drawPole3D(pole3DParams);

                /*поручень верхней площадки*/

                //if (topEnd === "площадка") {
                //    pole3DParams.basePoint[0] = b1 * (stairAmt - 0.5) * scale;
                //    pole3DParams.basePoint[1] = h1 * stairAmt * scale - rackOffsetY * scale + rackLength * scale;
                //    pole3DParams.basePoint[2] = z0;
                //    pole3DParams.length = platformLengthTop - b1 / 2;
                //    pole3DParams.poleAngle = 0;
                //    drawPole3D(pole3DParams);
                //}
                //if (topEnd === "забег") {
                //    pole3DParams.basePoint[0] = b1 * (stairAmt - 0.5) * scale;
                //    pole3DParams.basePoint[1] = h1 * stairAmt * scale - rackOffsetY * scale + rackLength * scale;//rackPosition2[1];// + rackLength*scale;
                //    pole3DParams.basePoint[2] = z0;
                //    pole3DParams.length = (platformLengthTop - b1 / 2) / Math.cos(turnAngleTop);
                //    if (topConnection) pole3DParams.length = pole3DParams.length - 70 / Math.cos(turnAngleTop);
                //    pole3DParams.poleAngle = turnAngleTop;

                //    drawPole3D(pole3DParams);
                //    if (topConnection) {
                //        /*basePoint = rackPosition3;
                //        basePoint[1] = rackPosition3[1] + rackLength*scale;
                //        basePoint[2] = z0; */
                //        pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, handrailLength * Math.cos(turnAngleTop) * scale, -turnAngleTop);
                //        //console.log(basePoint1);
                //        pole3DParams.length = 70 + (handrailProfileZ + 40) / 2;
                //        pole3DParams.poleAngle = 0;
                //        drawPole3D(pole3DParams);
                //    }

                //}
            }
            if (stairAmt === 0) {
                pole3DParams.length = sectionLength / Math.cos(sectionAngle);
                if (!bottomConnection) pole3DParams.length = pole3DParams.length + 70 / Math.cos(sectionAngle);
                if (!topConnection) pole3DParams.length = pole3DParams.length + 70 / Math.cos(sectionAngle);
                x0 = rackPosition0[0];
                y0 = -h1 * scale - rackOffsetY * scale + rackLength * scale;
                z0 = railingPositionZ * scale + 20 * scale - handrailProfileZ / 2 * scale;
                pole3DParams.basePoint = [x0, y0, z0];
                if (!bottomConnection) pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -70 * scale, -sectionAngle);
                pole3DParams.poleAngle = sectionAngle;
                //if (railingModel == "Кованые балясины") basePoint = newPoint_x(basePoint, 20*scale, -sectionAngle)
                drawPole3D(pole3DParams);

                pole3DParams.poleAngle = 0;
                if (topConnection) {
                    pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, pole3DParams.length * Math.cos(sectionAngle) * scale, -sectionAngle);
                    pole3DParams.length = 70 + (handrailProfileZ + 40) / 2;
                    if (railingModel === "Кованые балясины") pole3DParams.length += 20;
                    drawPole3D(pole3DParams);
                }
                if (bottomConnection) {
                    pole3DParams.length = 70;
                    pole3DParams.basePoint = newPoint_x(pole3DParams.basePoint, -70 * scale, 0);
                    drawPole3D(pole3DParams);
                }

            }
        }

        if (railingModel === "Самонесущее стекло") {


            z0 = z0 - (-6 + handrailProfileZ / 2) * scale;
            var handrailExtrudeOptions = {
                amount: handrailProfileZ * scale,
                bevelEnabled: false,
                curveSegments: 12,
                steps: 1
            };

            if (stairAmt != 0) {
                /* поручень нижней площадки*/

                if (bottomEnd != "нет") {
                    var leftHeight = handrailProfileY / Math.cos(turnAngleBottom);
                    var poleLength = glassSectionLength1;
                    var deltaY = handrailProfileY / Math.cos(handrailAngle) - handrailProfileY / Math.cos(turnAngleBottom);
                    x0 = 0 - glassSectionLength1 * scale;
                    y0 = (glassHeight - rackOffsetY - 20 + deltaY) * scale - glassSectionLength1 * Math.tan(turnAngleBottom) * scale;
                    var bottomPoleShape = draw4angleShape(turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale);
                    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
                    bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                    var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
                    bottomPole.position.x = x0;
                    bottomPole.position.y = y0;
                    bottomPole.position.z = z0;
                    bottomPole.castShadow = true;
                    railingSection.add(bottomPole);
                }

                /* поручень марша*/

                var leftHeight = handrailProfileY / Math.cos(handrailAngle);
                var poleLength = glassSectionLength2;
                var bottomPoleShape = draw4angleShape(handrailAngle, handrailAngle, poleLength, leftHeight, scale);
                var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
                bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
                bottomPole.position.x = 0;
                bottomPole.position.y = (glassHeight - rackOffsetY - 20) * scale;
                bottomPole.position.z = z0;
                bottomPole.castShadow = true;
                railingSection.add(bottomPole);

                basePoint[0] = bottomPole.position.x + glassSectionLength2 * scale;
                basePoint[1] = bottomPole.position.y + glassSectionLength2 * Math.tan(handrailAngle) * scale;

                /*поручень верхней площадки*/

                if (topEnd != "нет") {
                    var leftHeight = handrailProfileY / Math.cos(turnAngleTop);
                    var poleLength = glassSectionLength3;
                    var deltaY = handrailProfileY / Math.cos(handrailAngle) - handrailProfileY / Math.cos(turnAngleTop);
                    var bottomPoleShape = draw4angleShape(turnAngleTop, turnAngleTop, poleLength, leftHeight, scale);
                    var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
                    bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                    var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
                    bottomPole.position.x = basePoint[0];
                    bottomPole.position.y = basePoint[1] + deltaY * scale;
                    bottomPole.position.z = z0;
                    bottomPole.castShadow = true;
                    railingSection.add(bottomPole);
                }


            }
            if (stairAmt == 0) {
                var leftHeight = handrailProfileY / Math.cos(glassAngle);
                var poleLength = glassSectionLength0;
                x0 = -platformLengthBottom * scale + glassDist * scale;
                if (bottomConnection) x0 = x0 - glassOffset * scale;
                y0 = (glassHeight - rackOffsetY - h1) * scale;
                var bottomPoleShape = draw4angleShape(glassAngle, glassAngle, poleLength, leftHeight, scale);
                var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
                bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
                var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
                bottomPole.position.x = x0;
                bottomPole.position.y = y0;
                bottomPole.position.z = z0;
                bottomPole.castShadow = true;
                railingSection.add(bottomPole);
            }
        }

    }; //конец поручня

    return (railingSection);
} //end of drawRailingSection();


function drawRailingSectionPlatform(railingSectionPlatformParams) {

    var platformLength = railingSectionPlatformParams.platformLength;
    var offsetLeft = railingSectionPlatformParams.offsetLeft;
    var offsetRight = railingSectionPlatformParams.offsetRight;
    var handrailOffsetLeft = railingSectionPlatformParams.handrailOffsetLeft;
    var handrailOffsetRight = railingSectionPlatformParams.handrailOffsetRight;
    var railingSide = railingSectionPlatformParams.railingSide;
    var scale = railingSectionPlatformParams.scale;

    var railingSection = new THREE.Object3D();
    var rackOffsetY = 150;
    var rackLength = 900;
    var railingPositionZ = -40;
    if (turnFactor == -1) railingPositionZ = 0;
    var basePoint = [];
    if (turnFactor == -1) {
        var railingSideTemp = railingSide;
        if (railingSideTemp == "left") railingSide = "right";
        if (railingSideTemp == "right") railingSide = "left";
    }

    /*материалы*/
    var timberMaterial = new THREE.MeshLambertMaterial({ color: 0x804000, overdraw: 0.5 });
    var railingMaterial = new THREE.MeshLambertMaterial({ color: 0xD0D0D0, wireframe: false });
    var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
    var glassThickness = 8;
    if (railingModel == "Самонесущее стекло") glassThickness = 12;
    var handrailAngle = 0;
    var glassExtrudeOptions = {
        amount: glassThickness * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var forgingExtrudeOptions = {
        amount: 40 * scale,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    /* —“ќ… » */


    if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {

        rackPosition = [];
        rackNumber = 0;

        var sectionLength = platformLength - offsetLeft - offsetRight - 40;

        /*первая стойка*/
        var x0 = offsetLeft * scale + 20 * scale;
        var y0 = -rackOffsetY * scale;
        var z0 = railingPositionZ * scale;
        var basePoint = [x0, y0, z0];
        drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
        var rackPosition1 = basePoint; //сохраняем координаты стойки марша

        /*средние стойки*/
        var middleRackAmt = Math.round(sectionLength / 800) - 1;
        if (middleRackAmt < 0) middleRackAmt = 0;

        var p0 = basePoint;
        var rackDist = sectionLength / (middleRackAmt + 1);
        for (i = 0; i < middleRackAmt + 1; i++) {
            p0 = newPoint_x(p0, rackDist * scale, 0);
            drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection);
        }
        var rackPosition2 = p0; //сохраняем координаты стойки марша
    }


    /* ригели */


    if (railingModel == "Ригели") {

        //var rigelMaterial = railingMaterial;
        var rigelProfileY = 20;
        var rigelProfileZ = 20;

        if (rigelMaterial == "20х20 черн.") {
            rigelModel = "rect";
            rigelProfileY = 20;
            rigelProfileZ = 20;
        }
        if (rigelMaterial == "Ф12 нерж.") {
            rigelModel = "round";
            rigelProfileY = 12;
            rigelProfileZ = 12;
        }
        if (rigelMaterial == "Ф16 нерж.") {
            rigelModel = "round";
            rigelProfileY = 16;
            rigelProfileZ = 16;
        }

        var x0 = (offsetLeft - 30) * scale;
        var y0 = 0;
        var rigelLength = platformLength - offsetLeft - offsetRight + 60;
        if (railingSide == "left") z0 = railingPositionZ * scale + 40 * scale;
        if (railingSide == "right") z0 = railingPositionZ * scale - rigelProfileZ * scale;
        rigelAmt = Number(rigelAmt);
        var rigelDist = (rackLength - rackOffsetY) / (rigelAmt + 1);
        for (var i = 1; i < rigelAmt + 1; i++) {
            y0 = rigelDist * i * scale; // + rackOffsetY*scale;
            basePoint = [x0, y0, z0];
            drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
        }
    }

    /* стекла на стойках */

    if (railingModel == "Стекло на стойках") {
        var glassDist = 60;
        var glassHeight = 600;
        for (i = 0; i < rackPosition.length - 1; i++) {
            if (rackPosition[i][1] == rackPosition[i + 1][1])
                var glassShape = drawGlassShape(rackPosition[i], rackPosition[i + 1], 0, glassDist, glassHeight, scale);
            else
                var glassShape = drawGlassShape(rackPosition[i], rackPosition[i + 1], handrailAngle, glassDist, glassHeight, scale);
            var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

            var glass = new THREE.Mesh(geom, glassMaterial);
            glass.position.x = rackPosition[i][0] + 30 * scale;
            glass.position.y = rackPosition[i][1] + 230 * scale;
            glass.position.z = railingPositionZ * scale + 16 * scale;

            glass.castShadow = true;
            railingSection.add(glass);

        }

    } //конец стекол на стойках


    /* —јћќЌ?—”ў?? —“? Ћќ */

    if (railingModel == "Самонесущее стекло") {

        var glassDist = 10; //зазор между стеклами
        var glassOffset = 15; //зазор от стекла до торца ступени
        var glassHeight = 1030;
        if (glassHandrail == "сбоку") glassHeight = 1100;
        if (railingSide == "right") z0 = glassOffset * scale;
        if (railingSide == "left") z0 = (0 - glassOffset - glassThickness) * scale;
        var sectionLength = platformLength;
        var glassAngle = 0;
        var glassAmt_1 = Math.round(sectionLength / 800);
        var glassLengthX = sectionLength / glassAmt_1;
        var p1 = [0, 0];
        var p2 = [glassLengthX * scale, 0];
        var rackPosition0 = p1;
        var rackPosition1 = p2;
        x0 = glassDist * scale;
        y0 = -rackOffsetY * scale;

        for (i = 0; i < glassAmt_1; i++) {
            var glassShape = drawGlassShape(p1, p2, glassAngle, glassDist, glassHeight, scale);
            var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
            var glass = new THREE.Mesh(geom, glassMaterial);
            glass.position.x = x0 + glassLengthX * scale * i;
            glass.position.y = y0;
            glass.position.z = z0;
            glass.castShadow = true;
            railingSection.add(glass);
        }

        basePoint[0] = glass.position.x + glassLengthX * scale;
        basePoint[1] = glass.position.y + glassLengthX * scale * Math.tan(handrailAngle);
        basePoint[2] = glass.position.z;
    }// конец самонесущего стекла

    /*  ковка */


    if (railingModel == "Кованые балясины") {

        rackPosition = [];
        rackNumber = 0;

        var angleBottom = 0;
        var angleTop = 0;
        var forgedRackProfile = 40;
        var forgedRackLength = 900;
        var longRackLength = 900;
        var shortRackLength = rackOffsetY;
        var sectionLength = platformLength - offsetLeft - offsetRight - 40;

        /*первая стойка площадки*/
        var x0 = offsetLeft * scale;
        var y0 = -rackOffsetY * scale;
        var z0 = railingPositionZ * scale;
        var basePoint = [x0, y0, z0];
        drawForgedRack3d(basePoint, longRackLength, 0, railingMaterial, scale, railingSection);
        var rackPosition0 = basePoint; //сохраняем координаты стойки марша

        var middleRackAmt = Math.round(platformLength / 800) - 1;
        if (middleRackAmt < 0) middleRackAmt = 0;

        var p0 = basePoint;
        var rackDist = (platformLength - offsetLeft - offsetRight - 40) / (middleRackAmt + 1);
        for (i = 0; i < middleRackAmt; i++) {
            p0 = newPoint_x(p0, rackDist * scale, 0);
            drawForgedRack3d(p0, shortRackLength, 0, railingMaterial, scale, railingSection);
        }
        /*последняя стойка*/
        p0 = newPoint_x(p0, rackDist * scale, 0);
        drawForgedRack3d(p0, longRackLength, 0, railingMaterial, scale, railingSection);
        var rackPosition1 = p0; //сохраняем координаты стойки марша


        /*нижняя перемычка*/

        var leftHeight = 20;
        var poleLength = sectionLength - 40;
        var bottomPoleShape = draw4angleShape(0, 0, poleLength, leftHeight, scale);
        var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
        bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
        bottomPole.position.x = rackPosition0[0] + 40 * scale;
        bottomPole.position.y = rackPosition0[1] + rackOffsetY * scale;
        bottomPole.position.z = z0;
        bottomPole.castShadow = true;
        railingSection.add(bottomPole);


        /*балясины*/

        var p0t = rackPosition0;
        p0t = newPoint_x(p0t, 40 * scale, 0);
        var p1t = rackPosition1;
        var balAmt = Math.round((p1t[0] - p0t[0]) / (balDist[0] * scale));
        balDist[1] = (p1t[0] - p0t[0]) / (balAmt + 1);
        var angle_1 = 0;
        var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
        insertPoint[1] += leftHeight / 2 * scale + rackOffsetY * scale;
        var bal_1 = banister1;
        var bal_2 = banister2;
        var balAmt1 = 0;
        var balAmt2 = 0;
        var balType = bal_2;
        for (i = 0; i < balAmt; i++) {
            if (balType == bal_1) {
                balType = bal_2;
                balAmt2 = balAmt2 + 1;
            }
            else {
                balType = bal_1;
                balAmt1 = balAmt1 + 1;
            }
            drawForgedBanister(balType, insertPoint, scale, railingMaterial, railingSection);
            insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
        }


    }//конец кованых ограждений

    /* ѕќ–”„?Ќ№ */

    if (handrail != "нет") {

        /*параметры поручня в зависимости от модели*/

        var handrailMaterial = railingMaterial;
        var handrailProfileY = 40;
        var handrailProfileZ = 60;

        if (handrail == "40х20 черн.") {
            handrailModel = "rect";
            handrailProfileY = 20;
            handrailProfileZ = 40;
        }
        if (handrail == "40х40 черн.") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 40;
        }
        if (handrail == "60х30 черн.") {
            handrailModel = "rect";
            handrailProfileY = 30;
            handrailProfileZ = 60;
        }
        if (handrail == "кованый полукруглый") {
            handrailModel = "rect";
            handrailProfileY = 30;
            handrailProfileZ = 50;
        }
        if (handrail == "40х40 нерж.") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 40;
        }
        if (handrail == "Ф50 нерж.") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
        }
        if (handrail == "Ф50 сосна") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "омега-образный сосна") {
            handrailModel = "omega";
            handrailProfileY = 55;
            handrailProfileZ = 75;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "50х50 сосна") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "40х60 береза") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "омега-образный дуб") {
            handrailModel = "omega";
            handrailProfileY = 55;
            handrailProfileZ = 75;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "40х60 дуб") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "40х60 дуб с пазом") {
            handrailModel = "rect";
            handrailProfileY = 60;
            handrailProfileZ = 40;
            handrailMaterial = timberMaterial;
        }
        if (handrail == "Ф50 нерж. с пазом") {
            handrailModel = "round";
            handrailProfileY = 50;
            handrailProfileZ = 50;
        }
        if (handrail == "40х60 нерж. с пазом") {
            handrailModel = "rect";
            handrailProfileY = 40;
            handrailProfileZ = 60;
        }


        if (railingModel != "Самонесущее стекло") {
            var handrailLength = sectionLength + handrailOffsetLeft + handrailOffsetRight + 40;
            basePoint[0] = (offsetLeft - handrailOffsetLeft) * scale;
            basePoint[1] = -rackOffsetY * scale + rackLength * scale;
            basePoint[2] = railingPositionZ * scale - (handrailProfileZ - 40) / 2 * scale;
            drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
        }

        if (railingModel == "Самонесущее стекло") {
            var handrailLength = sectionLength; // + handrailOffsetLeft + handrailOffsetRight + 40;
            basePoint[0] = 0;
            basePoint[1] = (glassHeight - rackOffsetY) * scale;
            basePoint[2] = railingPositionZ * scale - (handrailProfileZ - 40) / 2 * scale;
            drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
            //console.log(basePoint)
        }

    }; //конец поручня



    return (railingSection);
}// end of drawRailingSectionPlatform