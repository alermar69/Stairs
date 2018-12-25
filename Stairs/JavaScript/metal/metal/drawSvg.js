var draw = "";

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

		if (shape.userData) {
			if (shape.userData.type) {
				if (!sortedShapes[shape.userData.type]) sortedShapes[shape.userData.type] = [];
				sortedShapes[shape.userData.type].push(shape);
			}
		}
		if(isUnique) {
			shape.amt = 1;
			shapesAmtList.push(shape);
		}else {
			shapesAmtList[index].amt += 1;
		}
	});

	if (sortedShapes.railing) drawRailing(sortedShapes.railing);
	
	/**
	var moovedBasePoint = copyPoint(basePoint);
	if (this.userData) {
		console.log(this);
		if (this.userData.pos) {
			if (this.userData.type !== 'pole') {
				moovedBasePoint = newPoint_xy(railingBasePoint, this.userData.pos.x, this.userData.pos.y + this.userData.len - 800);
			}else{
				moovedBasePoint = newPoint_xy(railingBasePoint, this.userData.pos.x + 20, this.userData.pos.y);
			}
			if (this.userData.key == 'out') {
				moovedBasePoint.x += 3000
			}
		}
	}
	*/
	
	//выводим на страницу уникальные шейпы
	
	$.each(shapesAmtList, function(i){
		var obj = makeSvgFromShape(this, draw);
		obj.setClass("parts");
		
		//зеркалим объект если это есть в его параметрах
		if(this.drawing && this.drawing.mirrow) mirrow(obj, "y")
		
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
	
	/**
		Отрисовывает секции ограждения
	*/
	
	function drawRailing(shapeArr){
		if (shapeArr.length > 0) {
			var sets = [];
			$.each(shapeArr, function(){
				var shape = this;
				var par = this.userData;
				var mirror = isMirrored(par.key);
				var set = sets.find(s => s.marshId == par.marshId && s.key == par.key);
				if (!set){
					set = draw.set();
					set.marshId = par.marshId;
					set.key = par.key;
					sets.push(set);
				}

				var elementBasePoint = {x:0, y:0};

				if (par.elemType !== 'banister'){
					var obj = makeSvgFromShape(shape, draw);
				}
				if (par.elemType == 'banister') {
					
					var svgPath = $("#forgeModal .modalItem[data-itemName=" + par.banisterType + "]").find("path").eq(0).attr("d");
					if (svgPath) {
						var obj = draw.path(svgPath);
					}
					else{
						var src = `/dev/egorov/bal/${par.banisterType}.png`;
						var obj = draw.image(src, 0,-400, 300, 800);
					}
				}
				if (mirror) {
					obj.transform("S-1,1");
					par.pos.x *= -1;
				}
				obj.setClass("railing");//Устанавливаем класс
	
				if (par.elemType !== 'pole' && par.elemType !== 'banister') {
					elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x, par.pos.y);
				}else if(par.elemType == 'banister') {//Тк центр смещен в середину стойки
					var b = obj.getBBox();
					elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x - b.width / 2 + 12, par.pos.y + b.height / 2);
					
					//Удлинняем балясину сверху и снизу
					{
						//Сверху
						var rect = drawRect({x: 0, y: 0}, 12, 150, draw).attr({
							fill: "none",
							stroke: "#000",
							"stroke-width": 1,
						});
						rect.setClass("other");
						moove(rect, {x: par.pos.x + 6, y: par.pos.y + par.balLen}, 'left_bot');
						set.push(rect);
						
						//снизу
						var rect = drawRect({x: 0, y: 0}, 12, 150, draw).attr({
							fill: "none",
							stroke: "#000",
							"stroke-width": 1,
						});
						rect.setClass("other");
						moove(rect, {x: par.pos.x + 6, y: par.pos.y + 150}, 'left_bot');
						set.push(rect);
					}
				}else{
					elementBasePoint = newPoint_xy(elementBasePoint, par.pos.x + 20/*profile/2*/, par.pos.y);
				}
	
				if (par.elemType == 'pole' && mirror) {
					var b = obj.getBBox();
					elementBasePoint = newPoint_xy(elementBasePoint, -b.width, b.height);
					moove(obj, elementBasePoint);
				}else{
					moove(obj, elementBasePoint, 'left_bot');
				}
				
				var dimSet = null;
				//Размеры
				if(par.elemType !== 'pole' && par.elemType !== 'banister'){
					var dimPar = {
						obj: obj,
						draw: draw,
					}
					dimSet = drawDimensions(dimPar).set;
					dimSet.setClass("dimensions");
				}
				
				//Диагональный размер 
				if (par.elemType == 'pole') {
					var poleBox = obj.getBBox();
					var cutLen = 20 / Math.cos(par.ang);
					var p1 = {x: poleBox.x, y: poleBox.y + poleBox.height - cutLen};
					var p2 = {x: poleBox.x2, y:poleBox.y2 - poleBox.height};
					if (mirror) {
						p1 = {x: poleBox.x2, y:poleBox.y2 - cutLen};
						p2 = {x: poleBox.x, y: poleBox.y};
					}
					
					/* разворачиваем иначе размеры не там где нужно */
					p1.y *= -1;
					p2.y *= -1;
					
					//Сохраняем точки начала и конца, в дальнейшем пригодятся для размеров балясин
					par.startPoint = p1;
					par.endPoint = p2;
					
					//горизонтальный размер
					var dimPar = {
						type: "dist",
						p1: p1,
						p2: p2,
						offset: 100,
						side: "top",
						draw: draw,
					}
					
					if (par.place == 'bot') {
						dimPar.side = 'bot';
						dimPar.offset = 200;
					}
					
					dimSet = drawDim(dimPar);
					dimSet.setClass("dimensions");
				}
				
				set.push(obj);
				if (dimSet) set.push(dimSet);
			});
			
			//Устанавливаем размер между стойками и балясинами
			{
				$.each(sets, function(){
					var marshId = this.marshId;
					var key = this.key;
					var mirror = isMirrored(key);
					var factor = mirror ? -1 : 1;

					var racks = shapeArr.filter(shape => {
						if (shape.userData) {
							if (shape.userData.elemType == 'rack') {
								if (marshId == shape.userData.marshId && key == shape.userData.key) {
									return true;
								}
							}
						}
						return false
					});
					
					//Сортируем в правильном порядке
					racks.sort(function (a, b) {
						if (mirror) {
							return b.userData.pos.x - a.userData.pos.x;
						}
						if (!mirror) {
							return a.userData.pos.x - b.userData.pos.x;
						}
					});
					
					//Расстояние между стойками
					for (var i = 0; i < racks.length - 1; i++) {
						var pole = shapeArr.find(shape =>{
							var data = shape.userData || {};
							if (data.place == 'bot' && data.marshId == marshId && data.key == key && racks[i].userData.poleId == data.poleId) {
								return shape
							}
							return false;
						});
						if (pole) {
							var p1 = copyPoint(racks[i].userData.pos);
							var p2 = copyPoint(racks[i + 1].userData.pos);
							var polePos = copyPoint(pole.userData.pos);
							var poleAngle = pole.userData.ang;
							var cutLen = 20 / Math.cos(poleAngle);
							
							if (!mirror) p1.x += 40;
							if (mirror) p2.x += 40;

							polePos.y -= cutLen / 2 * factor;
							p1 = itercection(polePos, polar(polePos, poleAngle * factor, 100), p1, newPoint_xy(p1, 0, 100));
							p2 = itercection(polePos, polar(polePos, poleAngle * factor, 100), p2, newPoint_xy(p2, 0, 100));

							//горизонтальный размер
							var dimPar = {
								type: "dist",
								p1: p1,
								p2: p2,
								offset: 100,
								side: "bot",
								draw: draw,
							}
							
							dimSet = drawDim(dimPar);
							dimSet.setClass("dimensions");
							this.push(dimSet);
						}
					}
					
					var poles = shapeArr.filter(shape => {
						if (shape.userData) {
							if (shape.userData.elemType == 'pole' && shape.userData.place == 'bot') {
								if (marshId == shape.userData.marshId && key == shape.userData.key) {
									return true;
								}
							}
						}
						return false
					});
					
					//Расстояние между балясинами
					for (var i = 0; i < poles.length; i++) {
						var pole = poles[i];
						if (pole) {
							var cutLen = 20 / Math.cos(pole.userData.ang);
							var poleAngle = pole.userData.ang;
							var poleStartPoint = pole.userData.startPoint;
							var poleEndPoint = pole.userData.endPoint;
							var firstBal, secondBal, lastBal;
							var firstBalPos, secondBalPos, lastBalPos;
							//Выбираем первую вторую и последнюю балясину для размеров;
							shapeArr.forEach(s => {
								var data = s.userData;
								if (data) {
									if (marshId == data.marshId && key == data.key && data.poleId == pole.userData.poleId) {
										if (data.index == 0) firstBal = s;
										if (data.index == 1 && data.index !== data.count) secondBal = s;
										if (data.index == data.count - 1) lastBal = s;
									}
								}
							});
							
							if (firstBal) {
								var balPos = newPoint_xy(firstBal.userData.pos, 20, 0);//20 - profile / 2
								firstBalPos = itercection(poleStartPoint, polar(poleStartPoint, poleAngle * factor, 100), balPos, newPoint_xy(balPos, 0, 100));
							
								var dimPar = {
									type: "dist",
									p1: poleStartPoint,
									p2: firstBalPos,
									offset: 10,
									side: "top",
									draw: draw,
								}
							
								dimSet = drawDim(dimPar);
								dimSet.setClass("dimensions");
								this.push(dimSet);
							}
							
							if (firstBal && secondBal) {
								var secondBalPos = newPoint_xy(secondBal.userData.pos, 20, 0);//20 - profile / 2
								secondBalPos = itercection(poleStartPoint, polar(poleStartPoint, poleAngle * factor, 100), secondBalPos, newPoint_xy(secondBalPos, 0, 100));
							
								var dimPar = {
									type: "dist",
									p1: firstBalPos,
									p2: secondBalPos,
									offset: 10,
									side: "top",
									draw: draw,
								}
							
								dimSet = drawDim(dimPar);
								dimSet.setClass("dimensions");
								this.push(dimSet);
							}
							
							if (lastBal) {
								var balPos = newPoint_xy(lastBal.userData.pos, 20, 0);//20 - profile / 2
								lastBalPos = itercection(poleEndPoint, polar(poleEndPoint, poleAngle * factor, 100), balPos, newPoint_xy(balPos, 0, 100));
							
								var dimPar = {
									type: "dist",
									p1: lastBalPos,
									p2: poleEndPoint,
									offset: 10,
									side: "top",
									draw: draw,
								}
							
								dimSet = drawDim(dimPar);
								dimSet.setClass("dimensions");
								this.push(dimSet);
							}
						}
					}
				});
			}
			
			setA4(sets);
		}
	}
	
	/**
		Вписывает элементы в a4 лист
		@param elemArr - массив с элементами
		
		@return lists - массив с листами
	*/
	
	function setA4(elemArr){
		var koef = 1.4143;
		var lists = [];
		
		for (var i = 0; i < elemArr.length; i++) {
			var set = draw.set();
			
			var obj = elemArr[i];
			var bbox = obj.getBBox();
			var listHeight = bbox.height + 200;
			var listWidth = listHeight * koef;
			
			var rectPos = {
				x: bbox.x - listWidth / 2 + bbox.width / 2, 
				y: -bbox.y + listHeight / 2 - bbox.height / 2
			};
			var rect = drawRect(rectPos, listWidth, listHeight, draw).attr({
				fill: "none",
				stroke: "#000",
				"stroke-width": 2,
			});
			rect.setClass("other");
			
			var text = `Марш ${obj.marshId} Сторона ${obj.key == 'out' ? 'внешняя' : 'внутренняя'}`;
			//подпись
			var textHeight = 30; //высота текста
			var textPos = newPoint_xy(rectPos, 250, -textHeight);
			
			var text = drawText(text, textPos, textHeight, draw)
			text.attr({cx: textPos.x, "font-size": textHeight})
			
			
			set.push(rect, obj, text);
			lists.push(set);
		}
		
		var listBasePoint = {x:3000, y: 0};
		var previousWidth = 0
		for (var i = 0; i < lists.length; i++) {
			var listBbox = lists[i].getBBox();
			listBasePoint = newPoint_xy(listBasePoint, previousWidth + 100, 0)
			moove(lists[i], listBasePoint);
			previousWidth = listBbox.width;
		}
		
		console.log(lists);
	}
	
	/**
		Функция отрисовывает вертикальные и горизонтальные размеры для элемента
		
		@param draw - paper(место в котором рисуем)
		@param obj - сам объект
		
		@returns par.set - массив с размерами
		@returns par.height - высота
		@returns par.width - ширина
	*/
	function drawDimensions(par){
		var draw = par.draw;
		par.set = draw.set();
		var b = par.obj.getBBox();
		par.height = b.height;
		par.width = b.width;
		
		var rect = drawRect({x: b.x, y: -b.y}, b.width, b.height, draw).attr({
			fill: "none",
			stroke: "#555",
			"stroke-width": 1,
		})
		rect.setClass("other");
		par.set.push(rect);
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
		par.set.push(dim);
		
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
		par.set.push(dim);
		
		return par;
	}
	
	/**
		Рассчитывает зеркалиться ли деталь
	*/
	function isMirrored(side){
		var isMirrored = false;
		if (turnFactor == 1 && side == 'in') isMirrored = true;
		if (turnFactor == -1 && side == 'out') isMirrored = true;
		return isMirrored;
	}
	
	//кованые секции
	function addForgedSections(arr, obj){
		if(obj.children){
			$.each(obj.children, function(){
				if(this.drawing && this.drawing.group == "forgedSections"){
					arr.push(this);
				}
				addForgedSections(arr, this)
			})
		}
	}
	
	var sections = [];
	addForgedSections(sections, view.scene);
	console.log(sections);
	
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