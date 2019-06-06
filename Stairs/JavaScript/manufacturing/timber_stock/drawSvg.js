var draw = "";
// var listBasePoint = {x:3000, y: 0}; //Глобально для позиционирования листов
// var previousWidth = 0; //Глобально для позиционирования листов

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
	
	//Массив в который попадают элементы которые требуют уникальной отрисовки
	var sortedShapes = {};
	
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

		if (shape.drawing) {
			if (shape.drawing.group) {
				if (!sortedShapes[shape.drawing.group]) sortedShapes[shape.drawing.group] = [];
				sortedShapes[shape.drawing.group].push(shape);
			}
		}
		if(isUnique) {
			shape.amt = 1;
			shapesAmtList.push(shape);
		}else {
			shapesAmtList[index].amt += 1;
		}
	});
	
	if (sortedShapes.timberStockNewell) {
		var newellPar = {
			draw: draw, 
			shapes: sortedShapes.timberStockNewell,
		}
		var newells = drawTimberStockNewellSVG(newellPar);
		var a4Params = {
			elements: newells,
			basePoint: {x:2500, y:0},
			orientation: 'hor',
			posOrientation: 'hor',
			draw: draw,
		}
		var lists = setA4(a4Params);
	}
	
	// var sections = [];
	// addForgedSections(sections, view.scene);
	
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

/**
 * Функция отрисовывает один столб деревянных модульных лестниц
 *- par.draw - paper raphael'a
 *- par.shapes - массив шейпов для отрисовки
 */
function drawTimberStockNewellSVG(par){
	var shapes = par.shapes;
	var draw = par.draw;
	var sets = [];

	var textHeight = 30;

	if (shapes.length > 0) {
		$.each(shapes, function(){
			var shape = this;
			var par = this.drawing;
			var set = draw.set();
			set.listText = par.name;
			
			var elementBasePoint = {x:0, y:0};

			for (var i = 1; i <= 4; i++) {
				var obj = makeSvgFromShape(shape, draw);
				moove(obj, elementBasePoint, 'left_bot');
				set.push(obj);

				if (par.fixPoints && par.fixPoints instanceof Array) {
					var fixPoints = [];
					fixPoints = par.fixPoints.filter(function(p){
						return p.side == i;
					});
					if (fixPoints.length > 0) {
						for (var j = 0; j < fixPoints.length; j++) {
							var fixPoint = fixPoints[j];
							var fixBasePoint =  newPoint_xy(elementBasePoint, fixPoint.x, fixPoint.y)
							if (fixPoint.type == 'stringerFixing') {
								var fixPointPar = {
									draw: draw,
									basePoint: fixBasePoint,
								}
								var holes = drawFixHoles(fixPointPar);
								set.push(holes);
							}
							if (fixPoint.type == 'wndFixing') {
								var circle = draw.circle(fixBasePoint.x, fixBasePoint.y * -1, 20); //Умножаем на -1 тк в свг y направлена вниз
								circle.attr("stroke", "#000");
								circle.attr("stroke-width", "2");
								set.push(circle);
							}
						}
					}
				}

				
				var text = drawText('Сторона ' + i, newPoint_xy(elementBasePoint, par.rackSize / 2, - 50), textHeight, draw)
				text.attr({cx: elementBasePoint.x + par.rackSize / 2, "font-size": textHeight});
				set.push(text);
				
				elementBasePoint.x += par.rackSize + 100;
			}

			elementBasePoint.x += 50;//Сдвигаем чтобы чертежи не пересеклись

			var minDiam = 8;
			var maxDiam = 14;

			var rect = drawRect(elementBasePoint, 80, -80, draw, 3);
			set.push(rect);

			var circle = draw.circle(elementBasePoint.x + 24, (elementBasePoint.y + 24) * -1, minDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
			circle.attr("stroke", "#000");
			circle.attr("stroke-width", "2");
			set.push(circle);

			var circle = draw.circle(elementBasePoint.x + 24 + 32, (elementBasePoint.y + 24) * -1, minDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
			circle.attr("stroke", "#000");
			circle.attr("stroke-width", "2");
			set.push(circle);

			var circle = draw.circle(elementBasePoint.x + 24 + 16, (elementBasePoint.y + 24 + 16) * -1, maxDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
			circle.attr("stroke", "#000");
			circle.attr("stroke-width", "2");
			set.push(circle);

			var circle = draw.circle(elementBasePoint.x + 24, (elementBasePoint.y + 24 + 32) * -1, minDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
			circle.attr("stroke", "#000");
			circle.attr("stroke-width", "2");
			set.push(circle);

			var circle = draw.circle(elementBasePoint.x + 24 + 32, (elementBasePoint.y + 24 + 32) * -1, minDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
			circle.attr("stroke", "#000");
			circle.attr("stroke-width", "2");
			set.push(circle);

			var text = drawText('Верхняя сторона', newPoint_xy(elementBasePoint, par.rackSize / 2, - 50), textHeight, draw)
			text.attr({cx: elementBasePoint.x + par.rackSize / 2, "font-size": textHeight});
			set.push(text);

			sets.push(set);
		});
	}
	return sets;
}

/**
 * Функция отрисовывает комплект отверстий крепежа косоура к столбу
 *- par.basePoint - базовая точка отверстий
 *- par.draw - paper raphael'a

 * @returns set с отверстиями
 */
function drawFixHoles(par){
	var set = par.draw.set();

	var minDiam = 8;
	var maxDiam = 12;

	var circle = par.draw.circle(par.basePoint.x, par.basePoint.y * -1, minDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
	circle.attr("stroke", "#000");
	circle.attr("stroke-width", "2");
	set.push(circle);

	var circle = par.draw.circle(par.basePoint.x, (par.basePoint.y - 32) * -1, maxDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
	circle.attr("stroke", "#000");
	circle.attr("stroke-width", "2");
	set.push(circle);

	var circle = par.draw.circle(par.basePoint.x, (par.basePoint.y - 96) * -1, minDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
	circle.attr("stroke", "#000");
	circle.attr("stroke-width", "2");
	set.push(circle);

	var circle = par.draw.circle(par.basePoint.x, (par.basePoint.y - 128) * -1, maxDiam / 2); //Умножаем на -1 тк в свг y направлена вниз
	circle.attr("stroke", "#000");
	circle.attr("stroke-width", "2");
	set.push(circle);

	return set;
}