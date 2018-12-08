var draw = "";

function makeSvg() {

	//инициализация
	$("#svgOutputDiv").html("");
	var draw = Raphael("svgOutputDiv", 800, 800);
	var dimScale = $("#svgDimScale").val();

	//оси координат
	//drawAxisHelper(2000, draw)

	//создаем svg объекты из массива шейпов
	var basePoint = {x: 0, y: 0}
	var objDst = 200 + 100 * dimScale; //зазор между объектами на листе по вертикали

	// выводим только уникальные шейпы. Для повторяющихся считаем кол-во
	var shapesAmtList = [];
	var shapesMarsh = {};
	var shapesMarsh1 = {};
	var shapesTreadPlateCabriole = {};
	var shapesFlans = {};
    var isTreadPlateCabriole = false;
    var isFlans = false;
	$.each(shapesList, function () {
		var isUnique = true;
		var shape = this;
		var index = 0;
		for (var i = 0; i < shapesAmtList.length; i++) {
			if (isShapesEqual(shape, shapesAmtList[i])) {
				isUnique = false;
				index = i;
			}			
		}

		if (isUnique) {
			shape.amt = 1;
			shapesAmtList.push(shape);
		}
		else {
			shapesAmtList[index].amt += 1;
		}


		if (!shape.drawing) shape.drawing = {};

		if (shape.drawing.marshId) {
			var marshId = shape.drawing.marshId;
			if (!shapesMarsh[marshId]) {
				shapesMarsh[marshId] = {shapes:[]};
				shapesTreadPlateCabriole[marshId] = {shapes:[]};
			    shapesFlans[marshId] = {shapes:[]};
			}

			if (shape.drawing.group == "stringers") {
				if (shape.drawing.key == "in") shapesMarsh[marshId].shapes.push(shape);
			}
			if (shape.drawing.group == "carcasPlates") {
				shapesMarsh[marshId].shapes.push(shape);
			}
            if (shape.drawing.group == "carcasFlans_In") {
				shapesMarsh[marshId].shapes.push(shape);
			}


			if (shape.drawing.group == "treadPlate") {
				shapesTreadPlateCabriole[marshId].shapes.push(shape);
				isTreadPlateCabriole = true;
            }
		    if (shape.drawing.group == "carcasFlans") {
		        shapesFlans[marshId].shapes.push(shape);
		        isFlans = true;
		    }
		}

		
	});

	//создаем сборочный чертеж монокосоура
    basePoint = { x: 0, y: 0 };
	for (var key in shapesMarsh) {
		var shapes = shapesMarsh[key].shapes;

		if (shapes.length > 0) {
			//рисуем сборочный чертеж монокосоура	
			var svgPar = {
				draw: draw,
				basePoint: basePoint,
				basePointOffY: 0,
				borderFrame:
					{ botLeft: copyPoint(basePoint), topRigth: copyPoint(basePoint) }, //объект для точек границ сборочного чертежа
			}
			for (var j = 0; j < shapes.length; j++) {
				svgPar.shape = shapes[j];
				drawShapeSvg(svgPar);
			}

			//определяем масштаб и координаты листа
			scaleBorderDraw(svgPar);
			//создаем рамку листа
			var rect = drawRect(svgPar.borderFrame.botLeft, svgPar.formatX * svgPar.formatScale, -svgPar.formatY * svgPar.formatScale, draw).attr({
				fill: "none",
				stroke: "#555",
				"stroke-width": 1,
			})
			rect.setClass("other");

			//подпись
			var textHeight = 30 * dimScale; //высота текста
			var textPos = newPoint_xy(svgPar.borderFrame.botLeft, 50, svgPar.formatY * svgPar.formatScale - 50)
			var text = drawText("Сборочный чертеж монокосоура " + key + " марша", textPos, textHeight, draw)
			text.attr({ "font-size": textHeight, })
			var b = text.getBBox();
			text.attr({ x: textPos.x + b.width / 2, })

			basePoint.y = svgPar.borderFrame.botLeft.y - objDst - 500;
			if (params.model == "сварной") basePoint.y -= 500;
		}
	}

	//создаем сборочный чертеж подложек для трубы
	if (isTreadPlateCabriole) {
		var svgPar = {
			draw: draw,
			basePoint: basePoint,
			basePointOffY: 0,
			borderFrame:
				{ botLeft: copyPoint(basePoint), topRigth: copyPoint(basePoint) }, //объект для точек границ сборочного чертежа
		}
		for (var key in shapesTreadPlateCabriole) {
			var shapes = shapesTreadPlateCabriole[key].shapes;			

			if (shapes.length > 0) {
				//рисуем сборочный чертеж монокосоура				
				for (var j = 0; j < shapes.length; j++) {
					svgPar.shape = shapes[j];
					drawShapeSvg(svgPar);
				}


				var marshParams = getMarshParams(key);
                var count = marshParams.stairAmt;
			    if (marshParams.botTurn == "пол") count -= 1;
			    if (marshParams.lastMarsh && marshParams.topTurn == "пол") count -= 1;


				//подпись
				var textHeight = 30 * dimScale; //высота текста
				var textPos = newPoint_xy(svgPar.borderFrame.botLeft, 50, - 50)
                var str = "Сборочный чертеж подложек " + key + " марша: кол-во - " + count + " шт.";

                if (key.length > 1 && key.substr(2) == "first") str = "Сборочный чертеж первой подложки первого марша: кол-во - 1шт.";
                if (key.length > 1 && key.substr(2) == "topLast") str = "Сборочный чертеж последней подложки последнего марша: кол-во - 1шт.";
                if (key.length > 1 && key.substr(2) == "platform") str = "Сборочный чертеж подложки площадки " + key.substr(0, 1) + " марша: кол-во - 1шт.";
                if (key.length > 1 && key.substr(2) == "Turn1TreadPlate") str = "Сборочный чертеж первой забежной подложки " + key.substr(0, 1) + " марша: кол-во - 1шт.";
                if (key.length > 1 && key.substr(2) == "Turn2TreadPlate") str = "Сборочный чертеж второй забежной подложки " + key.substr(0, 1) + " марша: кол-во - 1шт.";
                if (key.length > 1 && key.substr(2) == "Turn3TreadPlate") str = "Сборочный чертеж третьей забежной подложки " + key.substr(0, 1) + " марша: кол-во - 1шт.";
				var text = drawText(str, textPos, textHeight, draw)
				text.attr({ "font-size": textHeight, })
				var b = text.getBBox();
				text.attr({ x: textPos.x + b.width / 2, });

				svgPar.basePoint = newPoint_xy(svgPar.borderFrame.botLeft, 0, - 200);
			}
		}

		//определяем масштаб и координаты листа
		scaleBorderDraw(svgPar);
		//создаем рамку листа
		var rect = drawRect(svgPar.borderFrame.botLeft, svgPar.formatX * svgPar.formatScale, -svgPar.formatY  * svgPar.formatScale, draw).attr({
			fill: "none",
			stroke: "#555",
			"stroke-width": 1,
		})
		rect.setClass("other");

		basePoint.y = svgPar.borderFrame.botLeft.y - objDst - 500;
	}

    //создаем сборочный чертеж подложек для трубы
    if (isFlans) {
        var svgPar = {
            draw: draw,
            basePoint: basePoint,
            basePointOffY: 0,
            borderFrame:
                { botLeft: copyPoint(basePoint), topRigth: copyPoint(basePoint) }, //объект для точек границ сборочного чертежа
        }
        for (var key in shapesFlans) {
            var shapes = shapesFlans[key].shapes;

            if (shapes.length > 0) {
                //рисуем сборочный чертеж монокосоура		              
                for (var j = 0; j < shapes.length; j++) {
                    svgPar.shape = shapes[j];
                    drawShapeSvg(svgPar);
                    svgPar.basePoint.x += svgPar.rect.width + 100;

                    //подпись
                    var textHeight = 20 * dimScale; //высота текста
                    var textPos = { x: svgPar.rect.x - 30, y: -svgPar.rect.y2 - 30 }
                    var str = svgPar.shape.drawing.name;
                    var text = drawText(str, textPos, textHeight, draw)
                    text.attr({ "font-size": textHeight, })
                    var b = text.getBBox();
                    text.attr({ x: textPos.x + b.width / 2, });
                }

                //подпись
                var textHeight = 30 * dimScale; //высота текста
                var textPos = newPoint_xy(svgPar.borderFrame.botLeft, 0, - 50)
                var str = key + " марш";
                var text = drawText(str, textPos, textHeight, draw)
                text.attr({ "font-size": textHeight, })
                var b = text.getBBox();
                text.attr({ x: textPos.x + b.width / 2, });

                svgPar.basePoint = newPoint_xy(svgPar.borderFrame.botLeft, 0, - 200);
            }
        }

        //определяем масштаб и координаты листа
        scaleBorderDraw(svgPar);
        //создаем рамку листа
        var rect = drawRect(svgPar.borderFrame.botLeft, svgPar.formatX * svgPar.formatScale, -svgPar.formatY * svgPar.formatScale, draw).attr({
            fill: "none",
            stroke: "#555",
            "stroke-width": 1,
        })
        rect.setClass("other");

        basePoint.y = svgPar.borderFrame.botLeft.y - objDst - 500;
    }

	//зум и сдвиг мышкой
	var panZoom = svgPanZoom('#svgOutputDiv svg', {
		zoomScaleSensitivity: 0.5,
		minZoom: 0.1,
		maxZoom: 100,
	});

	//слои
	var svgLayers = {
		parts: "детали",
		dimensions: "размеры",
		other: "прочее",
	}

	printLayersControls(svgLayers);


}






function drawShapeSvg(par) {
	var shape = par.shape;
	var draw = par.draw;
	var basePoint = par.basePoint;


	var obj = makeSvgFromShape(shape, draw);
	obj.setClass("parts");

	//зеркалим объект если это есть в его параметрах
	if (shape.drawing.mirrow) mirrow(obj, "y");

	var b = obj.getBBox()
	var width = b.width;
	var height = b.height;

	if (shape.drawing.basePoint) {
		basePoint = newPoint_xy(basePoint, shape.drawing.basePoint.x, shape.drawing.basePoint.y);
		if (par.basePointOffY) basePoint.y -= par.basePointOffY;
	};

	var moovePoint = copyPoint(basePoint);
	moove(obj, moovePoint);


	//угол поворота
	var ang = 0;
	if (shape.drawing.baseLine) {
		ang = angle(shape.drawing.baseLine.p1, shape.drawing.baseLine.p2) / Math.PI * 180;
		if (shape.drawing.isTurned) ang *= -1;
	};

	
	rotate(obj, ang);
	

	//описанный прямоугольник
	var b = obj.getBBox()
	if (!(shape.drawing.isTurned || shape.drawing.group == "stringers")) {
		var rect = drawRect({ x: b.x, y: -b.y }, b.width, b.height, draw).attr({
			fill: "none",
			stroke: "#555",
			"stroke-width": 1,
		})
		rect.setClass("other");
	}



	//базовые точки размеров
	var p1 = { x: b.x, y: -b.y }
	var p2 = newPoint_xy(p1, b.width, 0);
	var p3 = newPoint_xy(p1, b.width, -b.height);
	var p4 = newPoint_xy(p1, 0, -b.height);

	if (!(shape.drawing.isTurned || shape.drawing.group == "stringers")) {
		//горизонтальный размер
		var dimPar = {
			type: "hor",
			p1: p1,
			p2: p2,
			offset: 30,
			side: "top",
			draw: draw,
		}

		var dim = drawDim(dimPar);
		dim.setClass("dimensions");


		//вертикальный размер
	    var dimPar = {
	        type: "vert",
	        p1: p2,
	        p2: p3,
	        offset: 50,
	        side: "right",
	        draw: draw,
	    }

		var dim = drawDim(dimPar);
		dim.setClass("dimensions");
	}

	if (shape.drawing.isTurned) {
		var angRad = angle(shape.drawing.baseLine.p1, shape.drawing.baseLine.p2);
		var pt1 = newPoint_xy(p1, 0, -width * Math.sin(angRad));
		var pt2 = newPoint_xy(p2, -height * Math.sin(angRad), 0);
		var pt3 = newPoint_xy(p3, 0, width * Math.sin(angRad));
		var pt4 = newPoint_xy(p4, height * Math.sin(angRad), 0);
		//наклонный размер
		var dimPar = {
			type: "dist",
			p1: pt3,
			p2: pt4,
			offset: 50,
			side: "bot",
			draw: draw,
		}

		var dim = drawDim(dimPar);
		dim.setClass("dimensions");

		//наклонный размер
		var dimPar = {
			type: "dist",
			p1: pt2,
			p2: pt3,
			offset: 50,
			side: "top",
			draw: draw,
		}

		var dim = drawDim(dimPar);
		dim.setClass("dimensions");
	}

	if (shape.drawing.group == "stringers") {
		//наклонный размер
		var dimPar = {
			type: "dist",
			p1: p2,
			p2: p4,
			offset: 50,
			side: "right",
			draw: draw,
		}

		var dim = drawDim(dimPar);
		dim.setClass("dimensions");
	}


	//определяем границы сборочного чертежа
	if (b.x < par.borderFrame.botLeft.x) par.borderFrame.botLeft.x = b.x;
	if (-b.y2 < par.borderFrame.botLeft.y) par.borderFrame.botLeft.y = -b.y2;

	if (b.x2 > par.borderFrame.topRigth.x) par.borderFrame.topRigth.x = b.x2;
	if (-b.y > par.borderFrame.topRigth.y) par.borderFrame.topRigth.y = -b.y;

	par.borderFrame.width = par.borderFrame.topRigth.x - par.borderFrame.botLeft.x;
	par.borderFrame.height = par.borderFrame.topRigth.y - par.borderFrame.botLeft.y;


    if (shape.drawing.group == "stringers") par.basePointOffY = b.height;

    par.rect = b;

	return par;
}


function scaleBorderDraw(par) {
	//делаем отступы чертежа от краев листа
	var borderFrame = par.borderFrame;
	borderFrame.botLeft = newPoint_xy(borderFrame.botLeft, -80, -80); //80 - отступ, чтобы надпись и размер попали в лист
	borderFrame.topRigth = newPoint_xy(borderFrame.botLeft, 80, 80); //80 - отступ, чтобы надпись и размер попали в лист
	borderFrame.width += 80 * 2;
	borderFrame.height += 80 * 2;

	par.formatOrient = "horizontal";
	if (borderFrame.height > borderFrame.width) par.formatOrient = "vertical";

	//определяем масштаб листа
	var formatScale = 1;
	par.formatX = 297;
	par.formatY = 210;
	if (par.formatOrient == "vertical") {
		par.formatX = 210;
		par.formatY = 297;
	}

	var formatScaleX = borderFrame.width / par.formatX;
	var formatScaleY = borderFrame.height / par.formatY;
	if (formatScaleX > formatScaleY) {
		formatScale = formatScaleX;
		borderFrame.botLeft.y -=
			(par.formatY * formatScale - borderFrame.height) / 2; //сдвигаем по Y, чтобы чертеж был посередине листа
	}
	if (formatScaleX <= formatScaleY) {
		formatScale = formatScaleY;
		borderFrame.botLeft.x -=
			(par.formatX * formatScale - borderFrame.width) / 2; //сдвигаем по X, чтобы чертеж был посередине листа
	}


	par.formatScale = formatScale;

	return par;
}


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
        }
        if (par.drawing.isRotate) shapePar.drawing.baseLine = { p1: p1, p2: p2 }
    }

    par.shape = drawShapeByPoints2(shapePar).shape;

    if (par.pathHoles) par.shape.holes.push(...par.pathHoles);

    if (par.roundHoleCenters) {
        var holesPar = {
            holeArr: par.roundHoleCenters,
            dxfBasePoint: par.dxfBasePoint,
            shape: par.shape,
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
                par.mesh.add(bolt);
            }
        }
    }

    return par;

}//end of drawRectFlan2
