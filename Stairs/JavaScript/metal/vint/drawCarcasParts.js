function drawBanisterAngle(par) {
    par.mesh = new THREE.Object3D();
    par.thk = 2;
    //par.dxfArr = [];
    var extrudeOptions = {
        amount: par.thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    //верхняя пластина
    var dxfBasePoint = { x: 0, y: 0 }
    var p0 = { x: 0, y: 0 }
    var topShape = new THREE.Shape();
    var cornerRad = 8;
    var clockwise = true;
    par.holeDist = 24;

    //углы без учета скруглений
    var p1 = copyPoint(p0);
    var p2 = newPoint_xy(p1, 0, 5);
    var p3 = newPoint_xy(p1, -20, 30);
    var p4 = newPoint_xy(p1, 40, 30);
    var p5 = newPoint_xy(p1, 20, 5);
    var p6 = newPoint_xy(p1, 20, 0);

    //скругление левого угла
    var fil1 = calcFilletParams1(p2, p3, p4, cornerRad, clockwise)
    //скругление правого угла
    var fil2 = calcFilletParams1(p3, p4, p5, cornerRad, clockwise)

    addLine(topShape, par.dxfArr, p1, p2, dxfBasePoint);
    addLine(topShape, par.dxfArr, p2, fil1.start, dxfBasePoint);
    addArc(topShape, par.dxfArr, fil1.center, cornerRad, fil1.angstart, fil1.angend, dxfBasePoint)
    addLine(topShape, par.dxfArr, fil1.end, fil2.start, dxfBasePoint);
    addArc(topShape, par.dxfArr, fil2.center, cornerRad, fil2.angstart, fil2.angend, dxfBasePoint)
    addLine(topShape, par.dxfArr, fil1.end, p5, dxfBasePoint);
    addLine(topShape, par.dxfArr, p5, p6, dxfBasePoint);
    addLine(topShape, par.dxfArr, p6, p1, dxfBasePoint);

    //отверстия
    var center1 = newPoint_xy(p1, -2, 22);
    var holeRad = 3.5;
    addRoundHole(topShape, par.dxfArr, center1, holeRad, dxfBasePoint); //функция в файле drawPrimitives

    var center2 = newPoint_xy(center1, par.holeDist, 0);
    var holeRad = 3.5;
    addRoundHole(topShape, par.dxfArr, center2, holeRad, dxfBasePoint); //функция в файле drawPrimitives



    var geometry = new THREE.ExtrudeGeometry(topShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topPlate = new THREE.Mesh(geometry, par.material);
    topPlate.rotation.x = Math.PI / 2
    topPlate.position.x = -10;
    topPlate.position.y = 25;
    topPlate.position.z = 0;
    par.mesh.add(topPlate);



    //вертикальная пластина
    var frontShape = new THREE.Shape();
    var dxfBasePoint = { x: 0, y: -50 }
    var p0 = { x: 0, y: 0 }
    par.holeOffset = 9;
    par.height = 25;
    par.vertWidth = 20;

    var p1 = copyPoint(p0);
    var p2 = newPoint_xy(p1, 0, par.height);
    var p3 = newPoint_xy(p1, par.vertWidth, par.height);
    var p4 = newPoint_xy(p1, par.vertWidth, 0);


    addLine(frontShape, par.dxfArr, p1, p2, dxfBasePoint);
    addLine(frontShape, par.dxfArr, p2, p3, dxfBasePoint);
    addLine(frontShape, par.dxfArr, p3, p4, dxfBasePoint);
    addLine(frontShape, par.dxfArr, p4, p1, dxfBasePoint);

    //овальное отверстие
    var holeWidth = 7;
    var holeHeight = 10;
    var hole1 = new THREE.Path();
    var center1 = newPoint_xy(p1, 10, 7.5);
    var center2 = newPoint_xy(center1, 0, 3);
    var p1 = newPoint_xy(center1, holeWidth / 2, 0);
    var p2 = newPoint_xy(center2, holeWidth / 2, 0);
    var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
    var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
    addLine(hole1, par.dxfArr, p1, p2, dxfBasePoint)
    addArc(hole1, par.dxfArr, center2, holeWidth / 2, 0, Math.PI, dxfBasePoint)
    addLine(hole1, par.dxfArr, p3, p4, dxfBasePoint)
    addArc(hole1, par.dxfArr, center1, holeWidth / 2, Math.PI, Math.PI * 2, dxfBasePoint)
    frontShape.holes.push(hole1);

    var geometry = new THREE.ExtrudeGeometry(frontShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var frontPlate = new THREE.Mesh(geometry, par.material);
    frontPlate.position.x = -10;
    frontPlate.position.y = 0;
    frontPlate.position.z = 0;
    par.mesh.add(frontPlate);


    return par;
} //end of drawBanisterAngle

function drawBal(par) {
    //функция отрисовывает прямоугольную балясину с боковыми уголками

    par.mesh = new THREE.Object3D();
    var dxfBasePoint = par.dxfBasePoint;


    /*стойка*/
    var extrudeOptions = {
        amount: par.size,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var shape = new THREE.Shape();
    var p0 = { x: 0, y: 0 }

    var p1 = copyPoint(p0);
    var p2 = newPoint_xy(p1, 0, par.length);
    var p3 = newPoint_xy(p1, par.size, par.length);
    var p4 = newPoint_xy(p1, par.size, 0);

    addLine(shape, par.dxfArr, p1, p2, dxfBasePoint);
    addLine(shape, par.dxfArr, p2, p3, dxfBasePoint);
    addLine(shape, par.dxfArr, p3, p4, dxfBasePoint);
    addLine(shape, par.dxfArr, p4, p1, dxfBasePoint);


    //отверстие под нижний уголок
    par.botHoleOffset = 20;
    if (par.type == "first") par.botHoleOffset = 15;
    var center1 = newPoint_xy(p1, par.size / 2, par.botHoleOffset);
    par.holeRad = 3.5;
    addRoundHole(shape, par.dxfArr, center1, par.holeRad, dxfBasePoint); //функция в файле drawPrimitives

    //отверстие под средний уголок
    if (par.type != "middle") {
        var center2 = newPoint_xy(center1, 0, par.holeDst);
        addRoundHole(shape, par.dxfArr, center2, par.holeRad, dxfBasePoint); //функция в файле drawPrimitives
    }

    //отверстие под кронштейн поручня
    if (par.topHole == "yes") {
        par.bracketHoleOffset = 8;
        var center3 = newPoint_xy(p2, par.size / 2, -par.bracketHoleOffset);
        addRoundHole(shape, par.dxfArr, center3, par.holeRad, dxfBasePoint); //функция в файле drawPrimitives
    }

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var bal = new THREE.Mesh(geometry, par.balMaterial);
    bal.position.x = -par.size / 2;
    bal.position.y = 0;
    bal.position.z = -par.size;
    par.mesh.add(bal);

    //подпись под фигурой
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, -100, -50)
    addText(par.text, textHeight, dxfPrimitivesArr, textBasePoint)

    /*уголки*/

    var angleParams = {
        material: par.angMaterial,
        dxfArr: [],
    }

    //нижний уголок
    angleParams = drawBanisterAngle(angleParams);
    var angle = angleParams.mesh;
    if (par.type == "first") {
        angle.rotation.z = Math.PI;
        //angle.position.x = 0;
        angle.position.y = angleParams.height;
    }
    if (par.type != "first") {
        //angle.position.x = 0;
        angle.position.y = par.botHoleOffset - angleParams.holeOffset;
    }
    par.mesh.add(angle);

    //верхний уголок
    if (par.type != "middle") {
        angleParams = drawBanisterAngle(angleParams);
        var angle = angleParams.mesh;
        //angle.position.x = 0;
        angle.position.y = par.botHoleOffset + par.holeDst - angleParams.holeOffset + par.angleShift;
        par.mesh.add(angle);
    }

    return par;

} //end of drawBal20x20


function drawMetalTreadFrontPlate(par) {
    var length = par.length;
    var widthHi = 120; //высота ребна на внутренней стороне
    par.widthHi = widthHi;
    var widthLow = 40; //высота ребра на внешней стороне
    var offsetIn = 15; //длина горизонтального участка у столба
    var cornerRad = 15; //радиус скругления нижнего угла на внешней стороне 

    var shape = new THREE.Shape();
    var extrudeOptions = {
        amount: par.thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var p0 = { x: 0, y: 0 }

    var p1 = copyPoint(p0);
    var p2 = newPoint_xy(p1, 0, widthHi);
    var p3 = newPoint_xy(p2, length, 0);
    var p4 = newPoint_xy(p3, 0, -widthLow);
    var p5 = newPoint_xy(p1, offsetIn, 0);

    //скругление нижнего угла на внешней стороне
    var clockwise = true;
    var fil4 = calcFilletParams1(p3, p4, p1, cornerRad, clockwise)

    addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p3, fil4.start, par.dxfBasePoint);
    addArc(shape, par.dxfArr, fil4.center, cornerRad, fil4.angstart, fil4.angend, par.dxfBasePoint);
    addLine(shape, par.dxfArr, fil4.end, p5, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p5, p1, par.dxfBasePoint);

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topPlate = new THREE.Mesh(geometry, par.material);
    par.mesh = topPlate;

    return par;

}

function drawVintTread(par) {

    par.mesh = new THREE.Object3D();

    //верхняя пластина
    var extrudeOptions = {
        amount: par.thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    topPlateParams = drawVintTreadShape(par);
    var shape = topPlateParams.shape;
    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topPlate = new THREE.Mesh(geom, par.material);
    topPlate.rotation.x = -0.5 * Math.PI;
    topPlate.position.y = -par.thk;
    par.mesh.add(topPlate);



    //передние пластины

    if (par.type == "metal") {
        var frontPlateParams = {
            length: topPlateParams.edgeLength,
            thk: 4,
            dxfArr: dxfPrimitivesArr,
            dxfBasePoint: { x: 2000, y: 0, },
            material: par.material,
        }

        //первая пластина
        frontPlateParams = drawMetalTreadFrontPlate(frontPlateParams)
        var frontPlate = frontPlateParams.mesh;
        frontPlate.position.y = -par.thk - frontPlateParams.widthHi - params.carcasPartsSpacing;
        frontPlate.position.z = -par.p1.y - frontPlateParams.thk;
        frontPlate.position.x = par.p1.x;
        frontPlate.rotation.y = par.ang1;
        par.mesh.add(frontPlate);

        //вторая пластина
        frontPlateParams.dxfArr = [];
        frontPlateParams = drawMetalTreadFrontPlate(frontPlateParams)
        var frontPlate = frontPlateParams.mesh;
        frontPlate.position.y = -par.thk - frontPlateParams.widthHi - params.carcasPartsSpacing;
        frontPlate.position.z = -par.p2.y// - frontPlateParams.thk;
        frontPlate.position.x = par.p2.x;
        frontPlate.rotation.y = par.ang2;
        par.mesh.add(frontPlate);
    }


    return par;
}

function drawVintPlatform(par) {

    par.mesh = new THREE.Object3D();
    //верхняя пластина
    var extrudeOptions = {
        amount: par.thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    topPlateParams = drawVintPlatformShape(par);

    var shape = topPlateParams.shape;
    console.log(shape)
    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topPlate = new THREE.Mesh(geom, par.material);
    topPlate.rotation.x = -0.5 * Math.PI;
    topPlate.position.y = -par.thk;
    if (par.turnFactor == -1) {
        topPlate.rotation.x = 0.5 * Math.PI;
        topPlate.position.y += par.thk;
    }

    par.mesh.add(topPlate);


    //боковые пластины

    if (par.type == "metal") {
        var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 1000, 0)
        var length = topPlateParams.edgeLength;
        var width = 120; //высота ребра


        var shape = new THREE.Shape();

        var p0 = { x: 0, y: 0 }
        var p1 = copyPoint(p0);
        var p2 = newPoint_xy(p1, 0, width);
        var p3 = newPoint_xy(p2, length, 0);
        var p4 = newPoint_xy(p3, 0, -width);

        addLine(shape, par.dxfArr, p1, p2, dxfBasePoint);
        addLine(shape, par.dxfArr, p2, p3, dxfBasePoint);
        addLine(shape, par.dxfArr, p3, p4, dxfBasePoint);
        addLine(shape, par.dxfArr, p4, p1, dxfBasePoint);

        //подпись под фигурой
        var text = "Боковые пластины площадки 2шт"
        var textHeight = 30;
        var textBasePoint = newPoint_xy(dxfBasePoint, 100, -100)
        addText(text, textHeight, par.dxfArr, textBasePoint)

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        //первая пластина
        var frontPlate = new THREE.Mesh(geometry, par.material);
        frontPlate.position.y = -par.thk - width - params.carcasPartsSpacing;
        frontPlate.position.z = -topPlateParams.p1.y - par.thk
        if (par.turnFactor == -1) frontPlate.position.z = topPlateParams.p1.y// - par.thk;
        frontPlate.position.x = topPlateParams.p1.x;
        frontPlate.rotation.y = topPlateParams.ang1 * par.turnFactor;
        par.mesh.add(frontPlate);

        //вторая пластина
        var frontPlate = new THREE.Mesh(geometry, par.material);
        frontPlate.position.y = -par.thk - width - params.carcasPartsSpacing;
        frontPlate.position.z = -topPlateParams.p2.y //- par.thk
        frontPlate.rotation.y = topPlateParams.ang2 * par.turnFactor;
        if (par.turnFactor == -1) {
            frontPlate.rotation.z = -Math.PI;
            frontPlate.position.z = topPlateParams.p2.y
            frontPlate.rotation.y = -topPlateParams.ang2 + Math.PI;
            frontPlate.position.y = -par.thk - params.carcasPartsSpacing;
        }
        frontPlate.position.x = topPlateParams.p2.x;

        par.mesh.add(frontPlate);

        //задняя пластина
        var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 2500, 0)
        var length = topPlateParams.rearEdgeLength
        //добавляем зазор от боковых пластин
        var offset = 20;
        length += -offset;
        var shape = new THREE.Shape();
        var p0 = { x: 0, y: 0 }
        var p1 = copyPoint(p0);
        var p2 = newPoint_xy(p1, 0, width);
        var p3 = newPoint_xy(p2, length, 0);
        var p4 = newPoint_xy(p3, 0, -width);

        addLine(shape, par.dxfArr, p1, p2, dxfBasePoint);
        addLine(shape, par.dxfArr, p2, p3, dxfBasePoint);
        addLine(shape, par.dxfArr, p3, p4, dxfBasePoint);
        addLine(shape, par.dxfArr, p4, p1, dxfBasePoint);

        //отверстия
        var sideHoleOffset = 70;
        var holeAmt = 5;
        var holeDist = (length - 2 * sideHoleOffset) / (holeAmt - 1);
        var holeRad = 7;

        for (var i = 0; i < holeAmt; i++) {
            var center = newPoint_xy(p0, sideHoleOffset + holeDist * i, width / 2)
            addRoundHole(shape, par.dxfArr, center, holeRad, dxfBasePoint);
        }


        //подпись под фигурой
        var text = "Задняя пластина площадки 1 шт"
        var textHeight = 30;
        var textBasePoint = newPoint_xy(dxfBasePoint, 100, -100)
        addText(text, textHeight, par.dxfArr, textBasePoint)

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var rearPlate = new THREE.Mesh(geometry, par.material);
        rearPlate.position.y = -par.thk - width - params.carcasPartsSpacing;
        rearPlate.position.z = -topPlateParams.p3.y //- par.thk
        if (par.turnFactor == -1) rearPlate.position.z = topPlateParams.p3.y// - par.thk;
        rearPlate.position.x = topPlateParams.p3.x;
        rearPlate.rotation.y = topPlateParams.ang3 * par.turnFactor;
        //корректируем положение с учетом зазора
        rearPlate.position.x += offset / 2 * Math.cos(topPlateParams.ang3);
        rearPlate.position.z += offset / 2 * Math.sin(topPlateParams.ang3);

        par.mesh.add(rearPlate);



    }
    return par;
}

function drawBotFlan(par) {

    var rad = 120;
    var thk = 8;
    var holesAmt = 6;
    var holeRad = 7;
    var holePosRad = 100;
    var shape = new THREE.Shape();
    var extrudeOptions = {
        amount: 8,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    //внешний контур
    var flanCenter = { x: 0, y: 0 }
    addCircle(shape, par.dxfArr, flanCenter, rad, par.dxfBasePoint)

    //отверстия
    var angleStep = Math.PI * 2 / holesAmt;
    for (var i = 0; i < holesAmt; i++) {
        var center = polar(flanCenter, angleStep * i, holePosRad);
        addRoundHole(shape, par.dxfArr, center, holeRad, par.dxfBasePoint);
    }

    //подпись под фигурой
    var text = "Нижний фланец"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(par.dxfBasePoint, -100, -200)
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint)

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

    par.mesh = new THREE.Mesh(geometry, par.material);
    par.mesh.rotation.x = -Math.PI / 2
    return par;



}

function drawPlatformRailingFlan(par) {
    var size = par.size;
    var thk = 4;
    var holeRad = 4;
    var holeDst = par.holeDst;
    var rackSize = 40;

    var shape = new THREE.Shape();
    var extrudeOptions = {
        amount: thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    //внешний контур

    var p0 = { x: 0, y: 0 }
    var p1 = copyPoint(p0);
    var p2 = newPoint_xy(p1, 0, size);
    var p3 = newPoint_xy(p2, size, 0);
    var p4 = newPoint_xy(p3, 0, -size);

    addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

    //круглые отверстия
    var holeOffset = (size - holeDst) / 2;
    var center1 = newPoint_xy(p0, holeOffset, holeOffset)
    addRoundHole(shape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
    var center2 = newPoint_xy(center1, 0, holeDst)
    addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
    var center2 = newPoint_xy(center1, holeDst, holeDst)
    addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
    var center2 = newPoint_xy(center1, holeDst, 0)
    addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint);

    //квадратное отверстие
    holeOffset = (size - rackSize) / 2;
    ph1 = newPoint_xy(p0, holeOffset, holeOffset)
    ph2 = newPoint_xy(ph1, rackSize, 0)
    ph3 = newPoint_xy(ph1, rackSize, rackSize)
    ph4 = newPoint_xy(ph1, 0, rackSize)

    var sqHole = new THREE.Path();
    addLine(sqHole, par.dxfArr, ph1, ph2, par.dxfBasePoint);
    addLine(sqHole, par.dxfArr, ph2, ph3, par.dxfBasePoint);
    addLine(sqHole, par.dxfArr, ph3, ph4, par.dxfBasePoint);
    addLine(sqHole, par.dxfArr, ph4, ph1, par.dxfBasePoint);

    shape.holes.push(sqHole);


    //подпись под фигурой
    var text = "Фланец ограждений"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(par.dxfBasePoint, -100, -200)
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint)

    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

    var flan = new THREE.Mesh(geometry, par.material);
    flan.rotation.x = -Math.PI / 2
    flan.position.x = -size / 2
    flan.position.z = size / 2

    par.mesh = new THREE.Object3D();
    par.mesh.add(flan);
    return par;


}