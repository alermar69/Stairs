
/**функция отрисовывает прямоугольный флаенц с отверстиями
*@params height, width 
*@params roundHoleCenters, pathHoles, thk, dxfBasePoint, cornerRad, holeRad, noBolts //не обязательные
*@params dxfBasePoint //не обязательный. Если не указан, то в dxf контур не выводится

*@return par.mesh
*/
function drawRectFlan2(par) {

	par.mesh = new THREE.Object3D();

	var dxfArr = dxfPrimitivesArr;
	//если не задана базовая точка, в dxf контур не выводим
	if (!par.dxfBasePoint) {
		dxfArr = [];
		par.dxfBasePoint = { x: 0, y: 0, }
	}
	if (!par.thk) par.thk = 8;
	if (!par.material) par.material = params.materials.metal2

	var p1 = { x: 0, y: 0, };
	var p2 = newPoint_xy(p1, 0, par.height);
	var p3 = newPoint_xy(p2, par.width, 0);
	var p4 = newPoint_xy(p1, par.width, 0);

	var points = [p1, p2, p3, p4];

	//срезанный задний угол для пресснастила
	if (par.cutAngle) {
		var p5 = newPoint_xy(p1, 0, 30);
		points[0].x += 30;
		points.splice(1, 0, p5)
	}

	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfArr,
		dxfBasePoint: par.dxfBasePoint,
	}
	if (par.cornerRad) {
		shapePar.radOut = par.cornerRad;
		shapePar.radIn = par.cornerRad;
	}
	if (par.drawing) {
		shapePar.drawing = {
			name: par.drawing.name,
			group: par.drawing.group,
			marshId: par.drawing.marshId,
			basePoint: par.drawing.basePoint,
			location: par.drawing.location,
		}
		if (par.drawing.isRotate) shapePar.drawing.baseLine = { p1: p1, p2: p2 }
		if (par.drawing.isCount) shapePar.drawing.isCount = par.drawing.isCount;
		if (par.drawing.isPointSvg) {
			shapePar.drawing.pointStartSvg = par.drawing.pointStartSvg;
			shapePar.drawing.pointCurrentSvg = par.drawing.pointCurrentSvg;
		}
	}

	par.shape = drawShapeByPoints2(shapePar).shape;

	if (par.pathHoles) par.shape.holes.push(...par.pathHoles);

	if (par.roundHoleCenters) {
		var holesPar = {
			holeArr: par.roundHoleCenters,
			dxfBasePoint: par.dxfBasePoint,
			shape: par.shape,
		}

		//если есть отверстия для крепления к стене, тогда их добавляем в шейп отдельно, чтобы можно было задать другой радиус
		if (par.fixPar) {
			var holes = [];
			var holesFix = [];
			for (var i = 0; i < par.roundHoleCenters.length; i++) {
				if (par.roundHoleCenters[i].isFixPart)
					holesFix.push(par.roundHoleCenters[i]);
				else
					holes.push(par.roundHoleCenters[i]);
			}
			holesPar.holeArr = holesFix;
			holesPar.holeRad = par.fixPar.diamHole / 2;
			addHolesToShape(holesPar);

			holesPar.holeRad = "undefined";
			holesPar.holeArr = holes;
		}

		if (par.holeRad) holesPar.holeRad = par.holeRad;
		addHolesToShape(holesPar);

	}

	var extrudeOptions = {
		amount: par.thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(par.shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var flan = new THREE.Mesh(geom, par.material);
	par.mesh.add(flan);

	//болты в отверстиях

	if (typeof anglesHasBolts != "undefined" && anglesHasBolts && !par.noBolts) { //anglesHasBolts - глобальная переменная
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
		};
		if (par.roundHoleCenters) {
			for (var i = 0; i < par.roundHoleCenters.length; i++) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = par.roundHoleCenters[i].x;
				bolt.position.y = par.roundHoleCenters[i].y;
				bolt.position.z = boltPar.len / 2 - boltBulge;
				if (par.mirrowBolts) {
					bolt.rotation.x = -Math.PI / 2;
					bolt.position.z = -boltPar.len / 2 + boltBulge + par.thk;
				}
				if (par.dzBolt) bolt.position.z += par.dzBolt;
				par.mesh.add(bolt);
			}
		}
	}

	//Саморезы в отверстиях
	if (par.hasScrews) {
		if (par.roundHoleCenters) {
			var screwId = "screw_6x32"
			var screwPar = {
				id: screwId,
				description: "Крепление ступеней",
				group: "Ступени"
			}
			for (var i = 0; i < par.roundHoleCenters.length; i++) {
				var screw = drawScrew(screwPar).mesh;
				screw.rotation.x = Math.PI / 2
				screw.position.x = par.roundHoleCenters[i].x;
				screw.position.y = par.roundHoleCenters[i].y;
				screw.position.z = 0;
				par.mesh.add(screw);
			}
		}
	}

	if (par.boltParams) {
		if (par.roundHoleCenters) {
			for (var i = 0; i < par.roundHoleCenters.length; i++) {
				var bolt = drawBolt(par.boltParams).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = par.roundHoleCenters[i].x;
				bolt.position.y = par.roundHoleCenters[i].y;
				bolt.position.z = par.boltParams.len / 2;
				if (par.mirrowBolts) {
					bolt.rotation.x = -Math.PI / 2;
					bolt.position.z = -par.boltParams.len / 2 + par.thk;
				}
				if (par.boltParams.offsetY) {
					bolt.position.z -= par.boltParams.offsetY;
				}
				if (par.dzBolt) bolt.position.z += par.dzBolt;
				par.mesh.add(bolt);
			}
		}
	}

	//болты крепления к верхнему перекрытию
	if (typeof isFixPats != "undefined" && isFixPats && par.fixPar) { //глобальная переменная
		if (par.fixPar.fixPart !== 'нет') {
			for (var i = 0; i < holesFix.length; i++) {
				var fix = drawFixPart(par.fixPar).mesh;
				fix.position.x = holesFix[i].x;
				fix.position.y = holesFix[i].y;
				fix.position.z = par.thk * (1 + turnFactor) * 0.5;
				fix.rotation.x = -Math.PI / 2 * turnFactor;
				par.mesh.add(fix);
			}
		}
	}

	return par;

}//end of drawRectFlan2

function drawBolt(par) {
	/*
	diam
	len
	headType
	*/

    par.mesh = new THREE.Object3D();
    if (!par.headType) {
        par.headType = "потай";
        if (par.len == 40 || params.boltHead == "hexagon") par.headType = "шестигр.";
    }

    var headHeight = 4;

    var boltColor = "#808080"; //серый для странных болтов	
    if (par.len == 20) boltColor = "#FF0000"; //красный
    if (par.len == 30) boltColor = "#0000FF"; //синий
    if (par.len == 40) boltColor = "#00FF00"; //зеленый

    var boltMaterial = new THREE.MeshLambertMaterial({ color: boltColor });
    if (!$sceneStruct.vl_1.realColors) {
        boltMaterial = params.materials.bolt;
    }
    var boltLen = par.len;
    if ($sceneStruct.vl_1.boltHead && !testingMode && par.headType != "шестигр.") boltLen -= headHeight;

    var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, boltLen, 10, 1, false);
    var bolt = new THREE.Mesh(geometry, boltMaterial);
    if ($sceneStruct.vl_1.boltHead && !testingMode && par.headType != "шестигр.") bolt.position.y += headHeight / 2;
    par.mesh.add(bolt);


    if (!$sceneStruct.vl_1.realColors) {
        if (params.paintedBolts == "есть") boltMaterial = params.materials.metal;
    }
    //головка для шестигранных болтов
    if (!testingMode && $sceneStruct.vl_1.boltHead && par.headType == "шестигр.") {
        var headHeight = par.diam * 0.6;


        var polygonParams = {
            cornerRad: 0,
            vertexAmt: 6,
            edgeLength: par.diam * 0.9815,
            basePoint: { x: 0, y: 0 },
            type: "shape",
            dxfPrimitivesArr: [],
            dxfBasePoint: { x: 0, y: 0 },
        }


        var shape = drawPolygon(polygonParams).shape;

        var extrudeOptions = {
            amount: headHeight,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };

        var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        var head = new THREE.Mesh(geom, boltMaterial);
        head.rotation.x = -Math.PI / 2;
        //	head.position.x = -polygonParams.edgeLength / 2;
        //	head.position.z = polygonParams.edgeLength * Math.cos(Math.PI / 6);
        //head.position.y = par.len / 2// + par.diam / 2;
        head.position.y = -par.len / 2 - headHeight;
        par.mesh.add(head);
    }

    //головка для болтов в потай
    if ($sceneStruct.vl_1.boltHead && par.headType != "шестигр." && par.headType != 'шпилька') {
        var shape = new THREE.Shape();
        addCircle(shape, [], { x: 0, y: 0 }, par.diam, { x: 0, y: 0 })

        //шестигранное отверстие
        var polygonParams = {
            cornerRad: 0,
            vertexAmt: 6,
            edgeLength: par.diam * 0.4,
            basePoint: { x: 0, y: 0 },
            type: "path",
            dxfPrimitivesArr: [],
            dxfBasePoint: { x: 0, y: 0 },
        }
        //polygonParams.basePoint = newPoint_xy(polygonParams.basePoint, -polygonParams.edgeLength / 2, -polygonParams.edgeLength * Math.cos(Math.PI / 6))

        var path = drawPolygon(polygonParams).path;

		if (par.headType == "пол. гол. крест") {
			var path = drawCrossPath(polygonParams).path
		}

		if(par.headType !== 'меб.') shape.holes.push(path);

        var extrudeOptions = {
            amount: headHeight,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };

        var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

        //var geometry = new THREE.CylinderGeometry(par.diam, par.diam, headThk, 30, 1, false);
        var head = new THREE.Mesh(geom, boltMaterial);
        head.rotation.x = -Math.PI / 2;
        head.position.y = -par.len / 2 - headHeight * 0.1;
        par.mesh.add(head);

        //заглушка дна чтобы не просвечивал белый материал
        var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, 0.1, 10, 1, false);
        var cyl = new THREE.Mesh(geometry, boltMaterial);
        cyl.position.y = -par.len / 2 + headHeight;
        par.mesh.add(cyl);

    }
    if (par.headShim && !testingMode) {
        //шайба
        var shimParams = { diam: par.diam }
        var shim = drawShim(shimParams).mesh;
        shim.position.y = -par.len / 2 + 2;
        par.mesh.add(shim);
    }
    if (!par.noNut && !testingMode) {

        //гайка
        var nutParams = { diam: par.diam, isCap: par.hasCapNut }
        var nut = drawNut(nutParams).mesh;
        nut.position.y = par.len / 2 - nutParams.nutHeight - 1;
        par.mesh.add(nut);

        //шайба
        var shimParams = { diam: par.diam }
        var shim = drawShim(shimParams).mesh;
        //shim.position.y = 1;
        shim.position.y = nut.position.y - shimParams.shimThk;
        if (par.nutOffset) {
            shim.position.y -= par.nutOffset;
        }
        par.mesh.add(shim);

        ////гайка
        //var nutParams = { diam: par.diam }
        //var nut = drawNut(nutParams).mesh;
        //nut.position.y = shim.position.y + shimParams.shimThk;
        //par.mesh.add(nut);
    }
    if (par.hasRivet && !testingMode) {
        var rivetParams = { diam: par.diam }
        var rivet = drawRivet(rivetParams).mesh;
		//rivet.position.y = par.len / 2 - rivetParams.rivetThk - 1;
		rivet.position.y = -par.len / 2 + headHeight;
        par.mesh.add(rivet)
		}
	if (!testingMode && params.isPlasticCaps == "есть" && (params.calcType == 'lt-ko' || params.calcType == 'vhod') && !par.noNut && par.diam == 10){
			var cap = drawPlasticCap(par.diam);
			cap.position.y = par.len / 2 - 7;
			par.mesh.add(cap);
		}
    //сохраняем данные для спецификации
		par.partName = "bolt"
		if (par.diam != 10) par.partName += "M" + par.diam;
		if (par.headType == 'шпилька') par.partName = 'stud';
    if (typeof specObj != 'undefined' && par.partName) {
        if (!specObj[par.partName]) {
            specObj[par.partName] = {
                types: {},
                amt: 0,
                name: "Болт",
                metalPaint: (params.paintedBolts == "есть"),
                timberPaint: false,
                division: "stock_1",
                workUnitName: "amt",
                group: "Метизы",
						}
						if (par.partName == 'stud') {
							specObj[par.partName].name = "Шпилька";
							if (par.diam == 10 && (par.len == 100 || par.len == 140)) {
								specObj[par.partName].name += " сантехническая"
							}
							if (par.diam == 14 && (par.len == 125 || par.len == 150)) {
								specObj[par.partName].name += " рутеля"
							}
						}
        }
        var headName = "шестигр. гол.";
        if (par.headType == "потай") headName = "потай внутр. шестигр."
        if (par.headType == "пол. гол. крест") headName = par.headType;
        if (par.headType == "внутр. шестигр. плоск. гол.") headName = par.headType;
				var name = "М" + par.diam + "х" + par.len + " " + headName;
				if (par.headType == "меб.") name = "мебельный М" + par.diam + "х" + par.len;
				if (par.partName == 'stud') {
					name = "М" + par.diam + " L=" + par.len;
					if (par.diam == 10 && (par.len == 100 || par.len == 140)) {
						name = "М" + par.diam + "х" + par.len;
					}
				}
        if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
        if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
        specObj[par.partName]["amt"] += 1;
    }

	//Назначаем артикул тут, тк шайба и гайка получат свой во время отрисовки.
	par.mesh.specId = par.partName + name;
	par.mesh.setLayer("metis");
	return par;
}

function drawPlasticCap(diam){
	var extrudeOptions = {
		amount: 8,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var shape = new THREE.Shape();

	var center = { x: 0, y: 0 };
	var dxfBasePoint = { x: 0, y: 0 };
	var dxfArr = [];
	addCircle(shape, dxfArr, center, diam + 1, dxfBasePoint);

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var cap = new THREE.Mesh(geom, params.materials.bolt);
	cap.rotation.x = -Math.PI / 2;

	//цвет пластиковых колпачков
	var capColor = "ЧЕРНЫЙ";
	if(params.metalPaint == "порошок"){
		if(params.carcasColor == "светло-серый") capColor = "СЕРЫЙ";
		if(params.carcasColor == "темно-серый") capColor = "СЕРЫЙ";
		if(params.carcasColor == "коричневый") capColor = "КОРИЧНЕВЫЙ";
		if(params.carcasColor == "черный") capColor = "ЧЕРНЫЙ";
		if(params.carcasColor == "белый") capColor = "БЕЛЫЙ";
		if(params.carcasColor == "бежевый") capColor = "СЕРЫЙ";
		if(params.carcasColor == "медный антик") capColor = "КОРИЧНЕВЫЙ";
		if(params.carcasColor == "белое серебро") capColor = "БЕЛЫЙ";
		if(params.carcasColor == "черное серебро") capColor = "СЕРЫЙ";
		if(params.carcasColor == "черная ящерица") capColor = "ЧЕРНЫЙ";
		if(params.carcasColor == "бежевая ящерица") capColor = "СЕРЫЙ";
		if(params.carcasColor == "коричневая ящерица") capColor = "КОРИЧНЕВЫЙ";
	}

	//сохраняем данные для спецификации
	var partName = "plasticCap_"
	if (typeof specObj != 'undefined' && partName) {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Колпачок на гайку",
				metalPaint: true,
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Метизы",
			}
		}
		var name = "М" + diam + " " + capColor;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	cap.specId = partName + name;
	
	return cap;
}

function drawCrossPath(par){
	/*рисует правильный многоугольник со скругленными краями*/

	par.path = new THREE.Path();
	var dxfPrimitivesArr = par.dxfPrimitivesArr;
	var dxfBasePoint = par.dxfBasePoint;
	var layer = 0;
	
	var crossThickness = 1;//Общая ширина линии креста
	var crossLength = 8;//Общая длинна линии креста

	var p0 = newPoint_xy(par.basePoint, -crossThickness / 2, crossLength / 2);
	var p1 = newPoint_xy(par.basePoint, crossThickness / 2, crossLength / 2);
	var p2 = newPoint_xy(par.basePoint, crossThickness / 2, crossThickness / 2);
	var p3 = newPoint_xy(par.basePoint, crossLength / 2, crossThickness / 2);
	var p4 = newPoint_xy(par.basePoint, crossLength / 2, -crossThickness / 2);
	var p5 = newPoint_xy(par.basePoint, crossThickness / 2, -crossThickness / 2);
	var p6 = newPoint_xy(par.basePoint, crossThickness / 2, -crossLength / 2);
	var p7 = newPoint_xy(par.basePoint, -crossThickness / 2, -crossLength / 2);
	var p8 = newPoint_xy(par.basePoint, -crossThickness / 2, -crossThickness / 2);
	var p9 = newPoint_xy(par.basePoint, -crossLength / 2, -crossThickness / 2);
	var p10 = newPoint_xy(par.basePoint, -crossLength / 2, crossThickness / 2);
	var p11 = newPoint_xy(par.basePoint, -crossThickness / 2, crossThickness / 2);

	addLine(par.path, dxfPrimitivesArr, p0, p1, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p1, p2, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p2, p3, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p3, p4, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p4, p5, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p5, p6, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p6, p7, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p7, p8, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p8, p9, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p9, p10, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p10, p11, dxfBasePoint, layer);
	addLine(par.path, dxfPrimitivesArr, p11, p0, dxfBasePoint, layer);

	return par;	
}

/** функция отрисовывает гайку
	diam
	isLong
	isSelfLock
	isCap
*/
function drawNut(par){


	par.nutHeight = par.diam * 0.8;
	if(par.isLong) {
		par.nutHeight = par.diam * 2.5;
		if(par.diam == 20) par.nutHeight = 60;
	}
	
	if(!par.dxfBasePoint) {
		par.dxfBasePoint = {x:0, y:0};
		par.dxfArr = [];
	}
	
	var polygonParams = {
		cornerRad: 0,
		vertexAmt: 6,
		edgeLength: par.diam * 0.9815,
		basePoint: {x:0,y:0},
		type: "shape",
		dxfPrimitivesArr: par.dxfArr,
		dxfBasePoint: par.dxfBasePoint,	
		}
	
	
	var shape = drawPolygon(polygonParams).shape;
	
	//центральное отверстие
	
	//var flanCenter = {x: polygonParams.edgeLength / 2, y: polygonParams.edgeLength * Math.cos(Math.PI / 6)}
	if(!par.isCap) addRoundHole(shape, par.dxfArr, polygonParams.basePoint, par.diam/ 2 + 0.5, par.dxfBasePoint);	
	
	var extrudeOptions = {
        amount: par.nutHeight,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
		};

    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var head = new THREE.Mesh(geom, params.materials.bolt);
	head.rotation.x = -Math.PI / 2;
	head.position.x = 0//-polygonParams.edgeLength / 2;
	head.position.z = 0//polygonParams.edgeLength * Math.cos(Math.PI / 6);
	//head.position.y = par.len / 2// + par.diam / 2;
	
	par.mesh = head;
	
	//сохраняем данные для спецификации
	par.partName = "nut_"
	if (par.isCap) par.partName = "capNut_";
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: "Гайка",
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Метизы",
			}
		}
		var name = "М" + par.diam;
		if(par.isSelfLock) name += " самоконтрящаяся"
		if(par.isLong) name += " удлин."
		if (par.isCap) name += " колп."

		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}
	par.mesh.specId = par.partName + name;
	
	return par;
	

}

/** функция отрисовывает стандартную метрическую шайбу
	diam
*/

function drawShim(par) {
	
	par.shimThk = par.diam * 0.2;
	par.radIn = par.diam / 2 + 1;
	par.radOut = par.diam * 1.1;
	
	var extrudeOptions = {
		amount: par.shimThk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var shape = new THREE.Shape();

	var center = { x: 0, y: 0 };
	var dxfBasePoint = { x: 0, y: 0 };
	var dxfArr = [];
	addCircle(shape, dxfArr, center, par.radOut, dxfBasePoint);

	var hole = new THREE.Path();
	addCircle(hole, dxfArr, center, par.radIn, dxfBasePoint);
	shape.holes.push(hole);

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var shim = new THREE.Mesh(geom, params.materials.bolt);
	shim.rotation.x = -Math.PI / 2;

	//сохраняем данные для спецификации
	par.partName = "shim_"
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: "Шайба",
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Метизы",
			}
		}
		var name = "М" + par.diam;
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	par.mesh = shim;
	par.mesh.specId = par.partName + "М" + par.diam;
	
	return par;
}


/*Функция отрисовки гнутого уголка с отверстиями*/

function drawAngleSupport(par, parDop) {
    /*исходные данные - модель уголка:
        У2-40х40х230
        У2-40х40х200
        У2-40х40х160
        У2-40х40х90
        У4-60х60х100
        У4-70х70х100
        У5-60х60х100
		
		noBoltsInSide1
		noBoltsInSide2
    */

	if (!par.model) {
		var angleModel = par; //костыль для совместимости, когда в параметрах передавалась только модель
		par = {};
		if (parDop && parDop.pos) par.pos = parDop.pos;
	}
	else var angleModel = par.model;


	//if(!dxfBasePoint.x || !dxfBasePoint.y) dxfBasePoint = {x:0,y:0};
	var dxfBasePoint = { x: 0, y: 0 };

	var color = 0xC0C0C0;

	var partParams = {
		height: 40,
		holeDiam1: 7,
		holeDiam2: 13,
		hole1Y: 15,
		hole2Y: 20,
		metalThickness: 3
	}

	if (angleModel == "У2-40х40х230") {
		partParams.width = 230;
		partParams.holeDist1 = 200;
		partParams.holeDist2 = 180;
		color = 0xFF0000;
	}

	if (angleModel == "У2-40х40х200") {
		partParams.width = 200;
		partParams.holeDist1 = 170;
		partParams.holeDist2 = 150;
		color = 0xFFFF00;
	}

	if (angleModel == "У2-40х40х160") {
		partParams.width = 160;
		partParams.holeDist1 = 130;
		partParams.holeDist2 = 110;
		color = 0xFF00FF;
	}

	if (angleModel == "У2-40х40х90") {
		partParams.width = 90;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 50;
		color = 0x00FF00;
	}

	if (angleModel == "У4-60х60х100") {
		partParams.width = 100;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 60;
		partParams.height = 60,
			partParams.holeDiam1 = 13,
			partParams.holeDiam2 = 13,
			partParams.hole1Y = 30,
			partParams.hole2Y = 30,
			partParams.metalThickness = 8
		color = 0x004080;
	}

	if (angleModel == "У4-70х70х100") {
		partParams.width = 100;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 60;
		partParams.height = 70,
			partParams.holeDiam1 = 0,
			partParams.holeDiam2 = 13,
			//partParams.hole1Y = 30,
			partParams.hole2Y = 20,
			partParams.metalThickness = 8
		color = 0x800000;
	}

	if (angleModel == "У5-60х60х100") {
		partParams.width = 100;
		partParams.holeDist1 = 60;
		partParams.holeDist2 = 0;
		partParams.height = 60,
			partParams.holeDiam1 = 13,
			partParams.holeDiam2 = 23,
			partParams.hole1Y = 30,
			partParams.hole2Y = 23,
			partParams.metalThickness = 8
		color = 0x008040;
	}

	var metalMaterial = new THREE.MeshLambertMaterial({ color: color, wireframe: false });
	if (!$sceneStruct.vl_1.realColors) metalMaterial = params.materials.metal;

	// Уголок деталь изгиб
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 0;

	var shape = drawAngleSupportCentr(partParams.width, partParams.metalThickness);//передаваемые параметры (width, metalThickness)

	var extrudeOptions = {
		amount: partParams.width,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var angleSupportCentrGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	angleSupportCentrGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var angleSupport1 = new THREE.Mesh(angleSupportCentrGeometry, metalMaterial);
	angleSupport1.position.x = 0;
	angleSupport1.position.y = 0;
	angleSupport1.position.z = 0;

	angleSupport1.rotation.x = Math.PI / 2;
	angleSupport1.rotation.y = Math.PI / 2;
	angleSupport1.rotation.z = 0;

	//meshes.push(angleSupport1);

	// Уголок деталь полка 1
	dxfBasePoint.x = 0;
	dxfBasePoint.y = -100;
	var shape = drawAngleSupportSide(partParams.width, partParams.height, partParams.holeDist1, partParams.hole1Y, partParams.holeDiam1, partParams.metalThickness);//передаваемые параметры (width, height, holeDist, hole1Y, holeDiam, metalThickness)

	/*добавление овальных отверстий*/

	if (angleModel == "У4-70х70х100") {

		var holeWidth = 13;

		/*
		/*первое отверстие*
		var hole1 = new THREE.Path();
		var center1 = { x: 20, y: 19 };
		var center2 = newPoint_xy(center1, 0, 10);
		var p1 = newPoint_xy(center1, holeWidth / 2, 0);
		var p2 = newPoint_xy(center2, holeWidth / 2, 0);
		var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
		var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
		addLine(hole1, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
		addArc2(hole1, dxfPrimitivesArr0, center2, holeWidth / 2, Math.PI, 0, true, dxfBasePoint)
		addLine(hole1, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
		addArc2(hole1, dxfPrimitivesArr0, center1, holeWidth / 2, 0, -Math.PI, false, dxfBasePoint)
		shape.holes.push(hole1);

		/*второе отверстие*
		var hole2 = new THREE.Path();
		var center1 = { x: 80, y: 19 };
		var center2 = newPoint_xy(center1, 0, 10);
		var p1 = newPoint_xy(center1, holeWidth / 2, 0);
		var p2 = newPoint_xy(center2, holeWidth / 2, 0);
		var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
		var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
		addLine(hole2, dxfPrimitivesArr0, p1, p2, dxfBasePoint)
		addArc2(hole2, dxfPrimitivesArr0, center2, holeWidth / 2, Math.PI, 0, true, dxfBasePoint)
		addLine(hole2, dxfPrimitivesArr0, p3, p4, dxfBasePoint)
		addArc2(hole2, dxfPrimitivesArr0, center1, holeWidth / 2, 0, Math.PI, false, dxfBasePoint)
		shape.holes.push(hole2);
		*/
		var rad = 6.5;
		var clockwise = true;
		var distOval = 10;
		var center1 = { x: 20, y: 24 };
		var center2 = { x: 80, y: 24 };

		//нижнее отверстие
		addOvalHoleY(shape, [], center1, rad, distOval, dxfBasePoint, clockwise)
		//верхнее отверстие
		addOvalHoleY(shape, [], center2, rad, distOval, dxfBasePoint, clockwise)
	}
	var extrudeOptions = {
		amount: partParams.metalThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var angleSupportGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	angleSupportGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var angleSupport2 = new THREE.Mesh(angleSupportGeometry, metalMaterial);
	angleSupport2.position.x = 0;
	angleSupport2.position.y = partParams.metalThickness * 2;
	angleSupport2.position.z = 0;

	angleSupport2.rotation.x = 0;
	angleSupport2.rotation.y = 0;
	angleSupport2.rotation.z = 0;

	//meshes.push(angleSupport2);

	// Уголок деталь полка 2
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 100;
	if (par.pos) {
		var fixPar = getFixPart(0, par.pos);
		partParams.holeDiam2 = 13;
		if (angleModel == "У5-60х60х100" && params.bottomAngleType == "регулируемая опора") partParams.holeDiam2 = 22;
	}
	var shape = drawAngleSupportSide(partParams.width, partParams.height, partParams.holeDist2, partParams.hole2Y, partParams.holeDiam2, partParams.metalThickness);

	var extrudeOptions = {
		amount: partParams.metalThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var angleSupportGeometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	angleSupportGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var angleSupport3 = new THREE.Mesh(angleSupportGeometry, metalMaterial);
	angleSupport3.position.x = 0;
	angleSupport3.position.y = partParams.metalThickness;
	angleSupport3.position.z = partParams.metalThickness * 2;

	angleSupport3.rotation.x = Math.PI / 2;
	angleSupport3.rotation.y = 0;
	angleSupport3.rotation.z = 0;

	//meshes.push(angleSupport3);

	var complexObject1 = new THREE.Object3D();
	complexObject1.add(angleSupport1);
	complexObject1.add(angleSupport2);
	complexObject1.add(angleSupport3);

	complexObject1.position.x = 0;
	complexObject1.position.y = 0;
	complexObject1.position.z = 0;

	complexObject1.rotation.x = 0;
	complexObject1.rotation.y = 0;
	complexObject1.rotation.z = 0;

	/* болты крепления к нижнему или верхнему перекрытию */
	if (typeof isFixPats != "undefined" && isFixPats && (angleModel !== "У5-60х60х100" && params.bottomAngleType !== "регулируемая опора")) { //глобальная переменная
		if (par.pos) {
			var fixPar = getFixPart(0, par.pos);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = (partParams.width - partParams.holeDist2) / 2;
			fix.position.y = 0;
			fix.position.z = partParams.height - partParams.hole2Y;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += partParams.metalThickness;
			}
			complexObject1.add(fix);

			var fix = drawFixPart(fixPar).mesh;
			fix.position.x = (partParams.width + partParams.holeDist2) / 2;
			fix.position.y = 0;
			fix.position.z = partParams.height - partParams.hole2Y;
			fix.rotation.x = 0;
			if (turnFactor == -1) {
				fix.rotation.x = Math.PI;
				fix.position.y += partParams.metalThickness;
			}
			complexObject1.add(fix);
		}
	}

	/* болты */
	var partName = "treadAngle";
	if (angleModel == "У4-70х70х100" || angleModel == "У4-60х60х100" || angleModel == "У5-60х60х100") partName = "carcasAngle";

	//болты в грани 1
	if (!par.noBoltsInSide1) par.noBoltsInSide1 = false;	//болты есть
	if (angleModel == "У4-70х70х100" || angleModel == "У5-60х60х100") par.noBoltsInSide1 = true;
	
	if (angleModel == "У4-70х70х100" && params.calcType == 'vhod' && params.staircaseType == 'Готовая' && params.platformRearStringer !== "нет" && params.platformTop !== 'нет') {
		par.noBoltsInSide1 = false;
	}

	//болты в грани 2
	if (!par.noBoltsInSide2) par.noBoltsInSide2 = false; //болты есть
	if (angleModel != "У4-70х70х100" && angleModel != "У4-60х60х100" && angleModel != "У5-60х60х100")
		par.noBoltsInSide2 = true;

	if (partParams.holeDiam1 == 7 && partName == 'treadAngle') {
		
		var screwId = "screw_6x32";
		var screwPar = {
			id: screwId,
			description: "Крепление ступеней",
			group: "Ступени"
		}

		var screw = drawScrew(screwPar).mesh;
		
		var x = (partParams.width - partParams.holeDist1) / 2;
		var y = partParams.height - partParams.hole1Y;
		if (angleModel == "У4-70х70х100") y = partParams.height - 35;
		var z = -screwPar.len / 2 + 10;

		screw.rotation.x = Math.PI / 2
		screw.position.x = x;
		screw.position.y = y;
		screw.position.z = z;
		complexObject1.add(screw)

		var screw2 = drawScrew(screwPar).mesh;
		screw2.rotation.x = Math.PI / 2
		screw2.position.x = x + partParams.holeDist1;
		screw2.position.y = y;
		screw2.position.z = z;
		complexObject1.add(screw2)
	}

	if (typeof anglesHasBolts != "undefined" && anglesHasBolts) { //глобальная переменная
		//болты в грани №1
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
		}
		if (!testingMode) {
			if (partName == "treadAngle") boltPar.len = 20;
			if (partName == "carcasAngle") boltPar.len = 30;
		}


		if (!par.noBoltsInSide1) {
			if (angleModel == "У4-70х70х100" && params.calcType == 'vhod' && params.staircaseType == 'Готовая') boltPar.len = 30;
			
			var x = (partParams.width - partParams.holeDist2) / 2;
			var z = partParams.height - partParams.hole2Y;
			var y = boltPar.len / 2 - boltBulge;
			if (!par.noBoltsInSide1_1) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.position.x = x;
				bolt.position.z = z;
				bolt.position.y = y;
				complexObject1.add(bolt)
			}

			if (!par.noBoltsInSide1_2) {
				var bolt2 = drawBolt(boltPar).mesh;
				bolt2.position.x = x + partParams.holeDist2;
				bolt2.position.y = y;
				bolt2.position.z = z;
				complexObject1.add(bolt2)
			}
		}

		//болты в грани №2

		if (!par.noBoltsInSide2) {
			var x = (partParams.width - partParams.holeDist1) / 2;
			var y = partParams.height - partParams.hole1Y;
			if (angleModel == "У4-70х70х100") y = partParams.height - 35;
			var z = boltPar.len / 2 - boltBulge;
			if (!par.noBoltsInSide2_1) {
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2
				bolt.position.x = x;
				bolt.position.y = y;
				bolt.position.z = z;
				complexObject1.add(bolt)
			}

			if (!par.noBoltsInSide2_2) {
				var bolt2 = drawBolt(boltPar).mesh;
				bolt2.rotation.x = Math.PI / 2
				bolt2.position.x = x + partParams.holeDist1;
				bolt2.position.y = y;
				bolt2.position.z = z;
				complexObject1.add(bolt2)
			}
		}
	}


	//сохраняем данные для спецификации

	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Уголок ступени",
				metalPaint: true,
				timberPaint: false,
				division: "stock_2",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
			}
		}
		if (partName == "carcasAngle") specObj[partName].name = "Уголок каркаса";

		var name = angleModel;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}
	
	complexObject1.specId = partName + angleModel;

	//параметры для позиционирования
	var dimensions = {
		width: partParams.width,
		holeDist1: partParams.holeDist1,
		holeDist2: partParams.holeDist2,
		holePos: {
			x: (partParams.width - partParams.holeDist2) / 2,
			y: partParams.height - partParams.hole1Y,
		}
	}
	if (angleModel == "У4-70х70х100") dimensions.holePos.y = partParams.height - 35;
	if (angleModel == "У5-60х60х100") {
		dimensions.holePos.y = partParams.height - partParams.hole1Y;
		dimensions.holePos.x = (partParams.width - partParams.holeDist1) / 2
	}

	if (angleModel == "У2-40х40х230" ||
		angleModel == "У2-40х40х200" ||
		angleModel == "У2-40х40х160" ||
		angleModel == "У2-40х40х90") {
		dimensions.holePos.y = partParams.height - partParams.hole2Y;
	}

	complexObject1.dimensions = dimensions;

	return complexObject1
}

function calcScrewsCount(){
	var screws = [];
	view.scene.traverse(function(node){
		if (node instanceof THREE.Mesh || node instanceof THREE.LineSegments) {
			node.visible = false;
		}
		if (node.name == 'screw') {
			screws.push(node);
			// screws.push(node.parent);
		}
	});
	$.each(screws, function(){
		setObjectVisible(this);
	})
	return screws;
}

function setObjectVisible(obj){
	obj.visible = true;
	$.each(obj.children, function(){
		if (this instanceof THREE.LineSegments) return;

		this.visible = true;
		if (this.children && this.children.length > 0) {
			setObjectVisible(this);
		}
	});
}

/**
 * Отрисовывает саморез
 * @param {object} par 
 * par.id - ид
 * par.description - Описание в спецификации
 * par.group - Группа спецификации
 */
function drawVint(par){
	par.mesh = new THREE.Object3D();
	par.mesh.specId = par.id + "_model";

	par.len = 10;
	par.diam = 6;
	var vintName = "Винт М" + par.diam + "x" + par.len;
	if (par.id == "vint_M6x10") {
		vintName = "Винт М6х12 потай крест";
	}
	if (par.id == "vint_M6x70") {
		vintName = "Винт М6х70 потай крест";
		par.len = 50;
	}
	
	var shape = new THREE.Shape();
	addCircle(shape, [], { x: 0, y: 0 }, par.diam, { x: 0, y: 0 })

	//шестигранное отверстие
	var polygonParams = {
		cornerRad: 0,
		vertexAmt: 6,
		edgeLength: par.diam * 0.4,
		basePoint: { x: 0, y: 0 },
		type: "path",
		dxfPrimitivesArr: [],
		dxfBasePoint: { x: 0, y: 0 },
	}
	var path = drawCrossPath(polygonParams).path

	shape.holes.push(path);
	var headHeight = 2;
	var extrudeOptions = {
		amount: headHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var vintMaterial = new THREE.MeshLambertMaterial({ color: "#808080" });
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var head = new THREE.Mesh(geom, vintMaterial);
	head.rotation.x = -Math.PI / 2;
	head.position.y = par.len / 2 - headHeight * 0.1;
	if(!testingMode) par.mesh.add(head);

	var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, par.len, 10, 1, false);
	var vint = new THREE.Mesh(geometry, vintMaterial);
	
	if(!testingMode) par.mesh.add(vint);

	//сохраняем данные для спецификации
	par.partName = par.id + "_model";
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: vintName,
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				purposes: [],
				workUnitName: "amt",
				group: "",
			}
			if (par.group) specObj[par.partName].group = par.group;
		}
		if (par.description) {
			if (specObj[par.partName].purposes.indexOf(par.description) == -1) specObj[par.partName].purposes.push(par.description);
		}

		name = 0;//Очищаем тк переменная с нужным именем уже создана
		
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	return par
}

/**
 * Отрисовывает саморез
 * @param {object} par 
 * par.id - ид
 * par.description - Описание в спецификации
 * par.group - Группа пецификации
 */
function drawScrew(par){
	par.mesh = new THREE.Object3D();
	var screwParams = getScrewParams(par.id);
	par.mesh.specId = screwParams.id + "_model";
	if (screwParams.id == 'screw_10x100') {
		par.mesh.specId = screwParams.id;//Костыль чтобы не было ошибки, будет тут пока не будут проработаны крепления к обстановке, после он не понадобится
	}

	par.len = screwParams.len;
	par.diam = screwParams.diam;
	
	var screwMaterial = new THREE.MeshLambertMaterial({ color: "#808080" });
	var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, par.len, 10, 1, false);
	var screw = new THREE.Mesh(geometry, screwMaterial);
	if(!testingMode) par.mesh.add(screw);

	if (par.hasShim) {
		//шайба
		var shimParams = { diam: par.diam }
		var shim = drawShim(shimParams).mesh;
		shim.position.y = -par.len / 2;
		par.mesh.add(shim);
	}

	if (par.dowelId) {
		var dowelPar = {
			id: par.dowelId,
			description: par.description,
			group: par.group
		}
	
		var dowel = drawDowel(dowelPar).mesh;
		dowel.position.y = 30;
		par.mesh.add(dowel);
	}

	if (par.timberPlugDiam) {
		var plug = drawTimberPlug(par.timberPlugDiam);
		plug.position.y = -par.len / 2;
		par.mesh.add(plug);
	}

	//сохраняем данные для спецификации
	par.partName = par.mesh.specId;
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: screwParams.name,
				metalPaint: false,
				timberPaint: false,
				isModelData: true,
				division: "stock_1",
				purposes: [],
				workUnitName: "amt",
				group: "Метизы",
			}
			if (par.group) specObj[par.partName].group = par.group;
		}
		if (par.description) {
			if (specObj[par.partName].purposes.indexOf(par.description) == -1) specObj[par.partName].purposes.push(par.description);
		}

		name = 0;
		
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	par.mesh.setLayer("metis");

	return par
}

/**
 * Отрисовывает метиз
 * @param {object} par 
 * par.id - ид
 * par.description - Описание в спецификации
 * par.group - Группа пецификации
 */
function drawNagel(par){
	var diam = 8;
	var len = 40;
	var name = "Шкант id не найден";
	if (par.id == "nagel") {
		name = "Шкант Ф8х40";
		diam = 8;
		len = 40;
	}

	var material = new THREE.MeshLambertMaterial({ color: "#808080" });
	var geometry = new THREE.CylinderGeometry(diam / 2, diam / 2, len, 10, 1, false);
	var nagel = new THREE.Mesh(geometry, material);
	nagel.specId = par.id;

	//сохраняем данные для спецификации
	par.partName = par.id;
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: name,
				metalPaint: false,
				timberPaint: false,
				isModelData: true,
				division: "stock_1",
				purposes: [],
				workUnitName: "amt",
				group: "Метизы",
			}
			if (par.group) specObj[par.partName].group = par.group;
		}
		if (par.description) {
			if (specObj[par.partName].purposes.indexOf(par.description) == -1) specObj[par.partName].purposes.push(par.description);
		}

		name = 0;
		
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	nagel.setLayer("metis");

	return nagel
}

/**
 * Отрисовывает дюбель
 * @param {object} par 
 * par.id - ид
 * par.description - Описание в спецификации
 * par.group - Группа пецификации
 */
function drawDowel(par){
	par.mesh = new THREE.Object3D();
	par.mesh.specId = par.id;

	//Формируем список со всей фурнитурой, чтобы достать от туда имя
	var partsList = {};
	addGeneralItems(partsList);

	par.diam = 10;
	par.len = 50;
	par.dowelName = null;
	if(partsList[par.id]) par.dowelName = partsList[par.id].name;
	if (!par.dowelName) par.dowelName = "Дюбель пласт. Ф" + par.diam + "x" + par.len;
	var dowelMaterial = new THREE.MeshLambertMaterial({ color: "#0000FF" });
	
	var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, par.len, 10, 1, false);
	var dowel = new THREE.Mesh(geometry, dowelMaterial);
	
	if(!testingMode) par.mesh.add(dowel);

	//сохраняем данные для спецификации
	par.partName = par.id;

	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: par.dowelName,
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				purposes: [],
				workUnitName: "amt",
				group: "",
			}
			if (par.group) specObj[par.partName].group = par.group;
		}
		if (par.description) {
			if (specObj[par.partName].purposes.indexOf(par.description) == -1) specObj[par.partName].purposes.push(par.description);
		}

		name = 0;//Очищаем тк переменная с нужным именем уже создана
		
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	par.mesh.setLayer("metis");

	return par
}
/**
 * Получает информацию для отрисовки самореза
 * @param {string} screwId 
 */
function getScrewParams(screwId){
	//Формируем список со всей фурнитурой, чтобы достать от туда имя
	var partsList = {};
	addGeneralItems(partsList);

	var diam = 6;
	var len = 40;
	var screwName = null;
	if(partsList[screwId]) screwName = partsList[screwId].name;
	if (!screwName) screwName = "Саморез Ф" + diam + "x" + len;
	
	if(screwId == "screw_6x32"){
		screwName = "Саморез Ф6,3х32 пол. гол. остр.";
		len = 32;
		diam = 6;
	}
	if(screwId == "timberHandrailScrew"){
		screwName = "Саморез Ф4,2х32 пол. гол. остр.";
		len = 32;
		diam = 4;
	}
	if(screwId == "metalHandrailScrew"){
		screwName = "Саморез Ф4,2х19 пол. гол. сверло";
		len = 19;
		diam = 4;
	}
	if(screwId == "rigelScrew"){
		screwName = "Саморез Ф4,2х32 пол. гол. сверло";
		len = 32;
		diam = 4;
	}
	if(screwId == "treadScrew"){
		screwName =  "Саморез Ф6,3х32 пол. гол. остр.";
		len = 32;
		diam = 6;
	}
	if(screwId == "glassHolderMetalScrew"){
		screwName = "Саморез Ф4,2х32 п/ш сверло";
		len = 32;
		diam = 4;
	}
	if(screwId == "glassHolderTimberScrew"){
		screwName = "Саморез Ф4,2х32 п/ш остр.";
		len = 32;
		diam = 4;
	}
	if(screwId == "riserScrewBot"){
		screwName = "Саморез Ф3,5х55 потай бел.";
		len = 55;
		diam = 3;
	}
	if(screwId == "riserScrewTop"){
		screwName = "Саморез Ф3,5х35 потай бел.";
		len = 35;
		diam = 3;
	}
	if(screwId == "riserScrewTopWinderKo"){
		screwName = "Саморез Ф3,5х16 потай бел.";
		len = 16;
		diam = 3;
	}
	if(screwId == "screw_5x90"){
		screwName =  "Саморез Ф5х90 потай бел.";
		len = 90;
		diam = 5;
	}
	if(screwId == "screw_6x60"){
		screwName =  "Саморез Ф6х60 потай желт.";
		len = 60;
		diam = 6;
	}
	if(screwId == "screw_6x60_r"){
		screwName =  "Саморез Ф6,3х60 пол. гол. остр.";
		len = 60;
		diam = 6;
	}
	if(screwId == "screw_6x32"){
		screwName =  "Саморез Ф6,3х32 пол. гол. остр.";
		len = 32;
		diam = 6;
	}
	if(screwId == "rigelHolderScrew"){
		screwName = "Саморез Ф4,2х32 пол. гол. сверло";
		len = 32;
		diam = 4;
	}
	if(screwId == "treadScrew_ko"){
		screwName =  "Саморез Ф3,5х35 потай бел.";
		len = 35;
		diam = 3;
	}
	if(screwId == "screw_3x55"){
		screwName =  "Саморез Ф3,5х55 потай бел.";
		len = 55;
		diam = 3;
	}
	if(screwId == "screw_3x35"){
		screwName = "Саморез Ф3,5х35 потай бел.";
		len = 35;
		diam = 3;
	}
	if(screwId == "screw_4x45"){
		screwName = "Саморез Ф4,5х45 потай бел.";
		len = 45;
		diam = 4;
	}
	if(screwId == "screw_4x35"){
		screwName = "Саморез Ф4х35 потай желт.";
		len = 35;
		diam = 4;
	}
	if(screwId == "screw_4x32"){
		screwName = "Саморез Ф4,2х32 пол. гол. остр.";
		len = 32;
		diam = 4;
	}
	if(screwId == "screw_4x19"){
		screwName = "Саморез Ф4,2х19 пол. гол. остр.";
		len = 19;
		diam = 4;
	}
	if(screwId == "screw_4x16"){
		screwName = "Саморез Ф4х16 потай остр.";
		len = 16;
		diam = 4;
	}
	if(screwId == "roofingScrew_5x19"){
		screwName =  "Кровельный саморез 5,5x19";
		len = 19;
		diam = 5;
	}
	if(screwId == "roofingScrew_5x32"){
		screwName =  "Кровельный саморез 5,5x32";
		len = 32;
		diam = 5;
	}
	if(screwId == "screw_8x60"){
		screwName = "Глухарь 8х60";
		len = 60;
		diam = 8;
	}
	if(screwId == "screw_8x80"){
		screwName = "Глухарь 8х80";
		len = 80;
		diam = 8;
	}
	if(screwId == "screw_8x120"){
		screwName = "Глухарь 8х120";
		len = 120;
		diam = 8;
	}
	if(screwId == "screw_10x100"){
		screwName =  "Глухарь 10х100";
		len = 100;
		diam = 10;
	}

	return {id: screwId, len: len, diam: diam, name: screwName};
}

function drawSilicone(par){
	par.mesh = new THREE.Object3D();
	par.mesh.specId = "silicone_model";
	
	var siliconeMaterial = new THREE.MeshLambertMaterial({ color: "#808080" });
	var geometry = new THREE.CylinderGeometry(2, 2, par.len, 10, 1, false);
	var silicone = new THREE.Mesh(geometry, siliconeMaterial);
	par.mesh.add(silicone);

	//сохраняем данные для спецификации
	par.partName = "silicone_model";
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: "Силикон прозрачный 260 мл.",
				metalPaint: false,
				timberPaint: false,
				isModelData: true,
				division: "stock_1",
				purposes: [],
				workUnitName: "amt",
				group: "Метизы",
			}
			if (par.group) specObj[par.partName].group = par.group;
		}
		if (par.description) {
			if (specObj[par.partName].purposes.indexOf(par.description) == -1) specObj[par.partName].purposes.push(par.description);
		}

		name = 0;
		var count = par.len / 10000;
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += count;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = count;
		specObj[par.partName]["amt"] += 1;
	}

	par.mesh.setLayer("metis");

	return par
}

function drawChemAnc(){
	par = {};
	par.mesh = new THREE.Object3D();
	par.mesh.specId = "chemAnc";
	
	var chemAncMaterial = new THREE.MeshLambertMaterial({ color: "#808080" });
	var geometry = new THREE.CylinderGeometry(2, 2, par.len, 10, 1, false);
	var silicone = new THREE.Mesh(geometry, chemAncMaterial);
	par.mesh.add(silicone);

	//сохраняем данные для спецификации
	par.partName = "chemAnc";
	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: "Химический анкер",
				metalPaint: false,
				timberPaint: false,
				isModelData: true,
				division: "stock_1",
				purposes: [],
				workUnitName: "amt",
				group: "Метизы",
			}
			if (par.group) specObj[par.partName].group = par.group;
		}
		if (par.description) {
			if (specObj[par.partName].purposes.indexOf(par.description) == -1) specObj[par.partName].purposes.push(par.description);
		}

		name = 0;
		
		if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
		if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
		specObj[par.partName]["amt"] += 1;
	}

	par.mesh.setLayer("metis");

	return par
}

/*отрисовка шейпа гнутого участка уголка*/

function drawAngleSupportCentr(width, metalThickness) {

	var shape = new THREE.Shape();
	var p1 = { x: 0, y: 0 }
	var centerPoint = { x: 0, y: 0 };
	var p2 = copyPoint(p1);
	var flanParams = { //объявление параметров уголка
		width: width,
		bendRad: metalThickness
	}

	//прорисовка внешнего угла скругления
	if (flanParams.bendRad > 0) {
		var startAngle = Math.PI * 3 / 2;
		var endAngle = Math.PI;

		var dxfBasePoint = { x: 0, y: 0 }


		centerPoint.x = flanParams.bendRad * 2; //назначение центра скругления
		centerPoint.y = flanParams.bendRad * 2;
		addArc2(shape, dxfPrimitivesArr0, centerPoint, flanParams.bendRad * 2, startAngle, endAngle, true, dxfBasePoint);
	}

	//прорисовка верхнего участка
	p1.x = 0;
	p1.y = flanParams.bendRad * 2;
	p2 = newPoint_xy(p1, metalThickness, 0); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr0, p1, p2, dxfBasePoint);

	//прорисовка внутреннего угла скругления
	if (flanParams.bendRad > 0) {
		/*
		var startAngle = Math.PI;
		var endAngle = Math.PI * 3 / 2;
		*/
		centerPoint.x = flanParams.bendRad * 2; //назначение центра скругления
		centerPoint.y = flanParams.bendRad * 2;
		addArc2(shape, dxfPrimitivesArr0, centerPoint, flanParams.bendRad, startAngle, endAngle, false, dxfBasePoint);
	}

	//прорисовка нижнего участка
	p1.x = flanParams.bendRad * 2;
	p1.y = flanParams.bendRad;
	p2 = newPoint_xy(p1, 0, -flanParams.bendRad); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr0, p1, p2, dxfBasePoint);

	return shape;
}

/*отрисовка шейпа боковины уголка*/

function drawAngleSupportSide(width, height, holeDist, hole2Y, holeDiam, metalThickness) {

	var dxfBasePoint = { x: 0, y: 0 }
	var flanParams = { //объявление параметров уголка
		width: width,
		height: height,
		holeDiam: holeDiam,
		holeDist: holeDist,
		angleRadUp: 10,
		angleRadDn: 0,
		metalThickness: metalThickness,
		hole2X: 0,
		hole2Y: hole2Y,
		hole3X: 0,
		hole3Y: hole2Y,
		dxfBasePoint: dxfBasePoint,
		dxfPrimitivesArr: dxfPrimitivesArr0

	}

	flanParams.height = flanParams.height - flanParams.metalThickness * 2;
	if (holeDist == 0) {
		flanParams.hole2X = flanParams.width / 2;
	}
	else {
		flanParams.hole2X = (flanParams.width - flanParams.holeDist) / 2;
		flanParams.hole3X = flanParams.hole2X;

	}
	var shape = drawRectFlan(flanParams).shape;

	return shape;
}


/*отрисовка болтов крепления к стенам, нижнему и верхнему перекрытию*/
function drawFixPart(par) {
	/*
	diam
	len
	headType
	*/
	
	var shimParams = {diam: par.diam};
	var nutParams = {diam: par.diam}

	par.mesh = new THREE.Object3D();
	var fixPart = new THREE.Object3D();
	if (turnFactor == -1) fixPart.rotation.x = Math.PI;

	if (!anglesHasBolts) return par;

	par.material = new THREE.MeshLambertMaterial({ color: "#0000FF" });
	par.material = params.materials.bolt;
	par.dopParams = {};

	var thickness = params.stringerThickness;
	if (params.calcType == "mono") thickness = params.flanThickness;
	if (params.calcType == "vint") thickness = 8;
	if (par.thickness) thickness = par.thickness;

	

	if (par.fixPart == 'химия') {
		var stud = drawStudF(par);
		fixPart.add(stud);
		
		if (!testingMode) {
			//гайка
			var nut = drawNut(nutParams).mesh;
			nut.position.y = par.len / 2 - nutParams.nutHeight - 5;
			fixPart.add(nut);

			//шайба
			var shim = drawShim(shimParams).mesh;
			shim.position.y = nut.position.y - shimParams.shimThk;
			fixPart.add(shim);
		}
		//хим. анкер

		//сохраняем данные для спецификации
		var partName = "chemAnc"
		if (typeof specObj != 'undefined' && partName) {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Анкер химический",
					metalPaint: false,
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "(эконом)";
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1 / 20;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1 / 20;
			specObj[partName]["amt"] += 1 / 20;
		}
		par.mesh.specId = partName + name;

		fixPart.position.y = (-par.len / 2 + nutParams.nutHeight + shimParams.shimThk + 5) * turnFactor + thickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'глухари') {
		//глухарь
		var screw = drawScrewF(par);
		fixPart.add(screw);

		//шайба
		
		var shim = drawShim(shimParams).mesh;
		shim.position.y = par.len / 2 - shimParams.shimThk;
		fixPart.add(shim);

		fixPart.position.y = (-par.len / 2 + shimParams.shimThk) * turnFactor + thickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'шпилька насквозь') {
		//шпилька
		var stud = drawStudF(par);
		fixPart.add(stud);

		//гайка
		var nut = drawNut(nutParams).mesh;
		nut.position.y = par.len / 2 - nutParams.nutHeight - 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShim(shimParams).mesh;
		shim.position.y = nut.position.y - shimParams.shimThk;
		fixPart.add(shim);

		//гайка
		nut = drawNut(nutParams).mesh;
		nut.position.y = - par.len / 2 + 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShim(shimParams).mesh;
		shim.position.y = nut.position.y + nutParams.nutHeight;
		fixPart.add(shim);

		fixPart.position.y = (-par.len / 2 + nutParams.nutHeight + shimParams.shimThk + 5) * turnFactor + thickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'саморезы') {
		//саморез
		par.dopParams.name = "Саморез";
		
		//дюбель
		if (par.fixType !== 'дерево') {
			par.dowelId = "dowel_10x50"
		}
			
		var screw = drawScrew(par).mesh;
		//screw.position.y = 0;
		fixPart.add(screw);

		/*
		if (par.fixType !== 'дерево') {
			//дюбель	
			par.dopParams = {
				name: "Дюбель пласт.",
				lenCylinder: 50,
				diamCylinder: 10,
				material: new THREE.MeshLambertMaterial({ color: "#0000FF" })
			}
			var dowel = drawStudF(par);
			dowel.position.y = - par.len / 2 + par.dopParams.lenCylinder / 2 + 1;
			fixPart.add(dowel);
		}
		*/

		fixPart.position.y = (-par.len / 2) * turnFactor + thickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	if (par.fixPart == 'шпилька-шуруп') {
		//шпилька
		par.dopParams.name = "Шпилька-шуруп"
		var stud = drawStudF(par);
		fixPart.add(stud);

		//гайка
		var nut = drawNut(nutParams).mesh;
		nut.position.y = par.len / 2 - nutParams.nutHeight - 5;
		fixPart.add(nut);

		//шайба
		var shim = drawShim(shimParams).mesh;
		shim.position.y = nut.position.y - shimParams.shimThk;
		fixPart.add(shim);

		fixPart.position.y = (-par.len / 2 + nutParams.nutHeight + shimParams.shimThk + 5) * turnFactor + thickness * (1 + turnFactor) * 0.5;

		par.mesh.add(fixPart);
	}

	//проставка
	if (par.isSpacer) {
		for (var i = 1; i <= par.spacerAmt; i++) {
			par.material = params.materials.bolt;
			var spacer = drawSpacerF(par);
			spacer.position.y = -fixPart.position.y * turnFactor - par.spacerAmount * i;
			if (turnFactor == -1) spacer.position.y -= thickness;
			fixPart.add(spacer);

			par.mesh.add(fixPart);
		}
	}

	//проставка
	function drawSpacerF(par) {
		var extrudeOptions = {
			amount: par.fixSpacerLength,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var shape = new THREE.Shape();

		var center = { x: 0, y: 0 };
		var dxfBasePoint = { x: 0, y: 0 };
		var dxfArr = [];

		var p1 = newPoint_xy(center, -par.spacerWidt / 2, -par.spacerHeigth / 2);
		var p2 = newPoint_xy(center, -par.spacerWidt / 2, par.spacerHeigth / 2);
		var p3 = newPoint_xy(center, par.spacerWidt / 2, par.spacerHeigth / 2);
		var p4 = newPoint_xy(center, par.spacerWidt / 2, -par.spacerHeigth / 2);

		var pointsShape = [p1, p2, p3, p4];

		//создаем шейп
		var shapePar = {
			points: pointsShape,
			dxfArr: dxfArr,
			dxfBasePoint: dxfBasePoint,
		}
		var shape = drawShapeByPoints2(shapePar).shape;

		var hole = new THREE.Path();
		addCircle(hole, dxfArr, center, par.diam / 2 + 1, dxfBasePoint);
		shape.holes.push(hole);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var shim = new THREE.Mesh(geom, par.material);
		shim.rotation.x = -Math.PI / 2;

		//сохраняем данные для спецификации
		par.partName = "fixSpacer"
		par.partName += "_M" + par.diam + "-" + par.fixSpacer;
		if (typeof specObj != 'undefined' && par.partName && par.fixSpacerLength) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: "Проставка",
					metalPaint: true,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = "М" + par.diam + "-" + par.spacerWidt + 'x' + par.spacerHeigth + 'x' + par.fixSpacerLength;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}
		shim.specId = par.partName + name;

		par.spacerAmount = extrudeOptions.amount;

		return shim;
	}

	//глухарь
	function drawScrewF(par) {
		var screw = new THREE.Object3D();

		//шпилька
		var geometry = new THREE.CylinderGeometry(par.diam / 2, par.diam / 2, par.len, 10, 1, false);
		var stud = new THREE.Mesh(geometry, par.material);
		screw.add(stud);

		//головка для болтов
		var extrudeOptions = {
			amount: par.diam * 0.6,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
		var polygonParams = {
			cornerRad: 0,
			vertexAmt: 6,
			edgeLength: par.diam * 0.9815,
			basePoint: { x: 0, y: 0 },
			type: "shape",
			dxfPrimitivesArr: [],
			dxfBasePoint: { x: 0, y: 0 },
		}
		var shape = drawPolygon(polygonParams).shape;

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var head = new THREE.Mesh(geom, par.material);
		head.rotation.x = -Math.PI / 2;
		head.position.y = par.len / 2
		screw.add(head);

		//сохраняем данные для спецификации
		var nameFix = "Глухарь";
		if (par.dopParams.name) nameFix = par.dopParams.name;

		var d = '';
		if (nameFix == "Саморез") d = 'Ф';

		par.partName = "screw"
		par.partName += "_" + d + par.diam;

		if (typeof specObj != 'undefined' && par.partName) {
			if (!specObj[par.partName]) {
				specObj[par.partName] = {
					types: {},
					amt: 0,
					name: nameFix,
					metalPaint: false,
					timberPaint: false,
					division: "stock_1",
					workUnitName: "amt",
					group: "Крепление к обстановке",
				}
			}
			var name = d + par.diam + "х" + par.len;
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}
		screw.specId = par.partName + name;

		par.headAmount = extrudeOptions.amount;

		addSpecIdToChilds(screw, par.partName + name);
		
		return screw;
	}

	return par;
}

//шпилька или деталь в виде цилиндра
function drawStudF(par) {
	var len = par.len;
	if (par.dopParams.lenCylinder) len = par.dopParams.lenCylinder;
	var diam = par.diam;
	if (par.dopParams.diamCylinder) diam = par.dopParams.diamCylinder;
	var material = par.material;
	if (par.dopParams.material) material = par.dopParams.material;


	var geometry = new THREE.CylinderGeometry(diam / 2, diam / 2, len, 10, 1, false);
	var stud = new THREE.Mesh(geometry, material);

	//сохраняем данные для спецификации
	var nameFix = "Шпилька";
	if (par.dopParams.name) nameFix = par.dopParams.name;

	par.partName = "stud_M"
	if (nameFix == 'Шпилька-шуруп') par.partName = "stud_screw_M"
	if (nameFix != "Шпилька") par.partName += diam;

	//if (nameFix == 'Химический анкер, баллон') par.partName = "chemAnc"
	if (nameFix == 'Дюбель') par.partName = "dowel" + "_Ф" + diam;


	if (typeof specObj != 'undefined' && par.partName) {
		if (!specObj[par.partName]) {
			specObj[par.partName] = {
				types: {},
				amt: 0,
				name: nameFix,
				metalPaint: false,
				timberPaint: false,
				division: "stock_1",
				workUnitName: "amt",
				group: "Крепление к обстановке",
				discription: "Крепление к стене 1"
			}
			if (nameFix == 'Шпилька-шуруп') specObj[par.partName].division = 'metal';
		}
		var name = "М" + diam + "x" + len;
		if (nameFix == "Шпилька") name = diam;
		//if (nameFix == 'Химический анкер, баллон') name = "Ф" + diam + "x" + len;
		if (nameFix == 'Дюбель') name = "Ф" + diam + "x" + len;
		if (nameFix == "Шпилька") {
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += Math.round(len / 1000 * 10) / 10;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = Math.round(len / 1000 * 10) / 10;
			specObj[par.partName]["amt"] += Math.round(len / 1000 * 10) / 10;
		}
		else {
			if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
			if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
			specObj[par.partName]["amt"] += 1;
		}

	}
	stud.specId = par.partName + name;

	return stud;
}

/*параметры крепления к стенам, нижнему и верхнему перекрытию*/
function getFixPart(marshId, wall = 'wall') {
	//наличие креплений к стене
	var fixPar = {
		fixType: 'нет',
		fixPart: 'нет',
		fixSpacer: 'нет',
		diam: 10,
		diamHole: 15,
		len: 100,
	}

	if (wall == 'wall') {
		//стена №1
		if (params.fixPart3 != "нет" && params.fixPart3 != "не указано") {
			var isWallFix = false;
			if (params.stairModel == "Прямая") isWallFix = true;
			if (params.stairModel != "Прямая" && marshId == 3) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType3;
				fixPar.fixPart = params.fixPart3;
				fixPar.fixSpacer = params.fixSpacer3;
				if (params.fixSpacerLength3) fixPar.fixSpacerLength = params.fixSpacerLength3;
			}
		}

		//стена №2
		if (params.fixPart4 != "нет" && params.fixPart4 != "не указано") {
			var isWallFix = false;
			if (params.stairModel == "Прямая") fixPar.out = true;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 3) isWallFix = true;
			if ((params.stairModel == "П-образная с забегом" ||
				params.stairModel == "П-образная с площадкой" ||
				params.stairModel == "П-образная трехмаршевая") &&
				marshId == 1) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType4;
				fixPar.fixPart = params.fixPart4;
				fixPar.fixSpacer = params.fixSpacer4;
				if (params.fixSpacerLength4) fixPar.fixSpacerLength = params.fixSpacerLength4;
			}
		}

		//стена №3
		if (params.fixPart5 != "нет" && params.fixPart5 != "не указано") {
			var isWallFix = false;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 1) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType5;
				fixPar.fixPart = params.fixPart5;
				fixPar.fixSpacer = params.fixSpacer5;
				if (params.fixSpacerLength5) fixPar.fixSpacerLength = params.fixSpacerLength5;
			}
		}

		//стена №4
		if (params.fixPart6 != "нет" && params.fixPart6 != "не указано") {
			var isWallFix = false;
			if ((params.stairModel == "Г-образная с забегом" || params.stairModel == "Г-образная с площадкой") &&
				marshId == 1) isWallFix = true;
			if ((params.stairModel == "П-образная с забегом" ||
				params.stairModel == "П-образная с площадкой" ||
				params.stairModel == "П-образная трехмаршевая") &&
				marshId == 2) isWallFix = true;

			if (isWallFix) {
				fixPar.fixType = params.fixType6;
				fixPar.fixPart = params.fixPart6;
				fixPar.fixSpacer = params.fixSpacer6;
				if (params.fixSpacerLength6) fixPar.fixSpacerLength = params.fixSpacerLength6;
			}
		}
	}

	//нижнее перекрытие
	if (wall == 'botFloor') {
		if (params.fixPart1 != "нет" && params.fixPart1 != "не указано") {
			fixPar.fixType = params.fixType1;
			fixPar.fixPart = params.fixPart1;
			fixPar.fixSpacer = params.fixSpacer1;
			if (params.fixSpacerLength1) fixPar.fixSpacerLength = params.fixSpacerLength1;
		}
	}

	//верхнее перекрытие
	if (wall == 'topFloor') {
		if (params.fixPart2 != "нет" && params.fixPart2 != "не указано") {
			fixPar.fixType = params.fixType2;
			fixPar.fixPart = params.fixPart2;
			fixPar.fixSpacer = params.fixSpacer2;
			if (params.fixSpacerLength2) fixPar.fixSpacerLength = params.fixSpacerLength2;
		}
	}

	//верхнее перекрытие
	if (wall == 'vint') {
		if (marshId == 1 && params.fixPart3 != "нет" && params.fixPart3 != "не указано") {
			fixPar.fixType = params.fixType3;
			fixPar.fixPart = params.fixPart3;
			fixPar.fixSpacer = params.fixSpacer3;
			if (params.fixSpacerLength3) fixPar.fixSpacerLength = params.fixSpacerLength3;
		}
		if (marshId == 2 && params.fixPart4 != "нет" && params.fixPart4 != "не указано") {
			fixPar.fixType = params.fixType4;
			fixPar.fixPart = params.fixPart4;
			fixPar.fixSpacer = params.fixSpacer4;
			if (params.fixSpacerLength4) fixPar.fixSpacerLength = params.fixSpacerLength4;
		}
		if (marshId == 3 && params.fixPart3 != "нет" && params.fixPart3 != "не указано") {
			fixPar.fixType = params.fixType5;
			fixPar.fixPart = params.fixPart5;
			fixPar.fixSpacer = params.fixSpacer5;
			if (params.fixSpacerLength5) fixPar.fixSpacerLength = params.fixSpacerLength5;
		}
		if (marshId == 4 && params.fixPart3 != "нет" && params.fixPart3 != "не указано") {
			fixPar.fixType = params.fixType6;
			fixPar.fixPart = params.fixPart6;
			fixPar.fixSpacer = params.fixSpacer6;
			if (params.fixSpacerLength6) fixPar.fixSpacerLength = params.fixSpacerLength6;
		}
	}


	//определяем параметры крепления в зависимости от типа крепления и типа стены
	if (fixPar.fixPart == 'глухари') {
		if (params.model == "ко" && fixPar.fixType == 'дерево') {
			//fixPar.diam = 12;
			//fixPar.len = 200;
			fixPar.diam = 10;
			fixPar.len = 100;
		}
	}

	if (fixPar.fixPart == 'шпилька насквозь') {
		if (fixPar.fixType == 'пеноблок' || ~fixPar.fixType.indexOf('кирпич')) {
			if (params.model == "лт") fixPar.diam = 12;
			if (params.model == "ко") fixPar.diam = 16;
		}
		fixPar.len = 300;
	}

	if (fixPar.fixPart == 'шпилька-шуруп') {
		fixPar.diam = 12;
	}

	if (fixPar.fixPart == 'саморезы') {
		fixPar.diam = 6;
		fixPar.len = 60;
	}


	//проставка
	if (fixPar.fixPart != "не указано" && fixPar.fixPart != "нет" &&
		fixPar.fixSpacer != "не указано" && fixPar.fixSpacer != "нет") {
		fixPar.isSpacer = true;
		fixPar.spacerWidt = 40;
		fixPar.spacerHeigth = 40;
		fixPar.spacerAmt = 1;

		if (fixPar.fixSpacer == "100х50") {
			fixPar.spacerWidt = 100;
			fixPar.spacerHeigth = 50;
		}
		if (fixPar.fixSpacer == "40х40 сдвоен.") {
			fixPar.spacerAmt = 2;
		}
	}

	fixPar.diamHole = fixPar.diam + 5;
	if (fixPar.fixType == 'дерево') fixPar.diamHole = fixPar.diam + 3;

	return fixPar;
}

/** функция отрисовывает резьбовою заклепку
	diam
*/
function drawRivet(par) {
    par.mesh = new THREE.Object3D();

    //головка заклепки
    par.shimThk = par.diam * 0.2;
    par.radIn = par.diam / 2 + 0.5;
    par.radOut = par.diam * 1.1;

    var extrudeOptions = {
        amount: par.shimThk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var shape = new THREE.Shape();

    var center = { x: 0, y: 0 };
    var dxfBasePoint = { x: 0, y: 0 };
    var dxfArr = [];
    addCircle(shape, dxfArr, center, par.radOut, dxfBasePoint);

    var hole = new THREE.Path();
    addCircle(hole, dxfArr, center, par.radIn, dxfBasePoint);
    shape.holes.push(hole);

    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var shim = new THREE.Mesh(geom, params.materials.bolt);
    shim.rotation.x = -Math.PI / 2;
    par.mesh.add(shim);

    //ножка заклепки
    par.rivetThk = par.diam * 0.8;
    par.radIn = par.diam / 2 + 0.5;
    par.radOut = par.diam / 2 + 1.5;

    var extrudeOptions = {
        amount: par.rivetThk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var shape = new THREE.Shape();

    var center = { x: 0, y: 0 };
    var dxfBasePoint = { x: 0, y: 0 };
    var dxfArr = [];
    addCircle(shape, dxfArr, center, par.radOut, dxfBasePoint);

    var hole = new THREE.Path();
    addCircle(hole, dxfArr, center, par.radIn, dxfBasePoint);
    shape.holes.push(hole);

    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rivet = new THREE.Mesh(geom, params.materials.bolt);
    rivet.position.y = par.shimThk;
    rivet.rotation.x = -Math.PI / 2;
    par.mesh.add(rivet);

    //сохраняем данные для спецификации
    par.partName = "rivet_"
    if (typeof specObj != 'undefined' && par.partName) {
        if (!specObj[par.partName]) {
            specObj[par.partName] = {
                types: {},
                amt: 0,
                name: "Заклепка резьбовая",
                metalPaint: false,
                timberPaint: false,
                division: "stock_1",
                workUnitName: "amt",
                group: "Метизы",
            }
        }
        var name = "М" + par.diam;
        if (specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] += 1;
        if (!specObj[par.partName]["types"][name]) specObj[par.partName]["types"][name] = 1;
        specObj[par.partName]["amt"] += 1;
    }

	par.rivetThk += par.shimThk;
	par.mesh.specId = par.partName + name;
	par.mesh.setLayer("metis");
	return par;
}