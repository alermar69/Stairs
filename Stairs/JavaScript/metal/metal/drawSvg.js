var draw = "";

$(function(){
	$("#makeSvg").click(function(){
		makeSvg();
		$("#svgParForm").show();
		
	})
	
	$("#saveSvg2").click(function(){
		var text = $("#svgOutputDiv").html();
		saveSvgFile(text);
	})
	
	$("#saveDxf2").click(function(){		
		var svg = $("#svgOutputDiv").find("svg").clone().attr({"id": "temp"});
		$("#svgOutputDiv").append(svg)
		$("svg#temp g").removeAttr("transform")
		$("svg#temp g").removeAttr("style")
		flatten($("svg#temp")[0])
		svgToDxf($("svg#temp")[0])
		$("svg#temp").remove();
	})

})

function makeSvg(){
	
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
	$.each(shapesList, function(){
		var isUnique = true;
		var shape = this;
		var index = 0;
		for(var i=0; i < shapesAmtList.length; i++){
			if(isShapesEqual(shape, shapesAmtList[i])) {
				isUnique = false;
				index = i;
			}
		}

		if(isUnique) {
			shape.amt = 1;
			shapesAmtList.push(shape);
		}		
		else {
			shapesAmtList[index].amt += 1;
		}
	});

	//выводим на страницу уникальные шейпы
	
	$.each(shapesAmtList, function(i){
		var obj = makeSvgFromShape(this, draw);
		obj.setClass("parts");
		
		//зеркалим объект если это есть в его параметрах
		if(this.drawing.mirrow) mirrow(obj, "y")
		
		//угол поворота
		var ang = 0;
		if(this.drawing && this.drawing.baseLine){
			ang = angle(this.drawing.baseLine.p1, this.drawing.baseLine.p2) / Math.PI * 180;
		};
		
		rotate(obj, ang);		
		moove(obj, basePoint);

		//описанный прямоугольник
		var b = obj.getBBox()
		var rect = drawRect({x: b.x, y: -b.y}, b.width, b.height, draw).attr({
			fill: "none",
			stroke: "#555",
			"stroke-width": 1,
		})
		rect.setClass("other");
		
		//базовые точки размеров
		var p1 = {x: b.x, y: -b.y}
		var p2 = newPoint_xy(p1, b.width, 0)
		var p3 = newPoint_xy(p1, b.width, -b.height)
		
		//горизонтальный размер
		var dimPar = {
			type: "hor",
			p1: p1,
			p2: p2,
			offset: 50,
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
		
		//подпись
		var textHeight = 30 * dimScale; //высота текста
		var textPos = {
			x: b.cx,
			y: -b.y - b.height - textHeight,
			};
		var text = drawText("Кол-во " + this.amt + " шт.", textPos, textHeight, draw)
		text.attr({cx: textPos.x, "font-size": textHeight,})

		
		basePoint.y -= b.height + objDst;
	});
	
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

	printLayersControls(svgLayers)
	
	
}

