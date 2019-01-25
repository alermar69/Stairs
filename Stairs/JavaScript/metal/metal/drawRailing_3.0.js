/** частные функции для единой функции отрисовки ограждений */

function calcHandrailPoints(par, parRacks){
	var handrailPoints = [];
	
			var meterHandrailPar = {
				prof: params.handrailProf,
				sideSlots: params.handrailSlots,
				handrailType: params.handrail,
				metalPaint: params.metalPaint_perila,
				timberPaint: params.timberPaint_perila,
				}
			meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);
	
			//рассчитываем координаты верхней точки кронштейна стойки
	
			if(parRacks.marsh1First) var marsh1First = calcHolderTopPoint(parRacks.marsh1First);
			if(parRacks.botFirst) var botFirst = calcHolderTopPoint(parRacks.botFirst);
			if(parRacks.botLast) var botLast = calcHolderTopPoint(parRacks.botLast);
			if(parRacks.topFirst) var topFirst = calcHolderTopPoint(parRacks.topFirst);
			if(parRacks.topLast) var topLast = calcHolderTopPoint(parRacks.topLast);
			if(parRacks.marshFirst)var marshFirst = calcHolderTopPoint(parRacks.marshFirst);
			if(parRacks.marshLast) var marshLast = calcHolderTopPoint(parRacks.marshLast);
			if(parRacks.marsh2Last) var marsh2Last = calcHolderTopPoint(parRacks.marsh2Last);
	
			//формируем массив точек поручня по координатам стоек с учетом того, чтобы стык не попадал на лодочку
	
			if (par.botEnd != "нет" && !par.isRearPRailing){
				if (par.botEnd == "площадка"){
					var extraLen = 80;
					if(par.firstRackPos) extraLen = par.firstRackPos;
					if(params.model == "ко") extraLen += params.sideOverHang;
					if(par.botConnection) {
						if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
						if(meterHandrailPar.handrailModel == "round")
							extraLen += par.rackProfile / 2;
						if(meterHandrailPar.handrailModel != "round")
							extraLen += par.rackProfile / 2 - meterHandrailPar.profZ / 2;
						}
	
					var p1 = newPoint_xy(botFirst, -extraLen, 0);
					var p2 = itercection(marshLast, polar(marshLast, parRacks.angMarsh, 100), botFirst, polar(botFirst, 0, 100));
					}
				if (par.botEnd == "забег"){
					var p2 = polar(marshFirst, parRacks.angMarsh, -50);
					var botHandrailAng = angle(botFirst, p2);
					var p1 = polar(botFirst, botHandrailAng, -50);
					}
				if(params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt"){
					var extraLen = 80;
					if(meterHandrailPar.handrailModel == "round") extraLen += 50;
					var p0 = polar(marsh1First, parRacks.angMarsh1, -extraLen)
					handrailPoints.push(p0);
					p1 = itercection(marsh1First, polar(marsh1First, parRacks.angMarsh1, 100), botFirst, polar(botFirst, 0, 100));
					p2 = itercection(marshLast, polar(marshLast, parRacks.angMarsh, 100), botFirst, polar(botFirst, 0, 100));
				}
				handrailPoints.push(p1);
				handrailPoints.push(p2);
				}
	
			if (par.botEnd == "нет" || par.isRearPRailing){
				var extraLen = 80;
				if(par.firstRackPos) extraLen = par.firstRackPos;
				if (par.marshId == 'topPlt' && par.key == 'rear') {
					extraLen = 70 + params.stringerThickness + 40 / 2 - meterHandrailPar.profZ / 2;//40 - ширина стойки, 70 - расстояние от центра стойки до края тетивы
					if (params.model == "ко") extraLen += params.sideOverHang;
				}
				//просто свободный конец поручня на круглом поручне
				if(!par.isRearPRailing && meterHandrailPar.handrailModel == "round"){
					extraLen += 50;
					}
				if(par.isPlatform && par.botConnection){
					if(params.model == "ко") extraLen += params.sideOverHang;
					if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
					if(meterHandrailPar.handrailModel == "round")
						extraLen -= par.rackProfile / 2;
					if(meterHandrailPar.handrailModel != "round")
						extraLen += par.rackProfile / 2 - meterHandrailPar.profZ / 2;
					}
	
				var p1 = polar(marshFirst, parRacks.angMarsh, -extraLen);
				handrailPoints.push(p1);
				}
	
			if (par.topEnd != "нет" && !par.isRearPRailing){
				if (par.topEnd == "площадка") {
					var p1 = itercection(marshLast, polar(marshLast, parRacks.angMarsh, 100), topLast, polar(topLast, 0, 100));
					//var p1 = itercection(marshFirst, polar(marshFirst, parRacks.angMarsh, 100), topLast, polar(topLast, 0, 100));
					if (params.railingModel == 'Ригели' && params.stairModel == "Прямая горка") {
						p1 = polar(p1, parRacks.angMarsh, 40);
					}
					//продлеваем поручень до конца площадки
					var extraLen = 80;
					if (par.lastMarsh) extraLen = 70;
					if (par.key == 'in' && hasCustomMidPlt(par)) {
						extraLen = 0;
					}
					if(par.lastRackPos) extraLen = par.lastRackPos;
					if (params.model == "ко") extraLen += params.sideOverHang;
					//if (par.lastMarsh && !par.topConnection && params.rackBottom == "сверху с крышкой") extraLen -= 80;
					if(par.topConnection) {
						if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
						if(meterHandrailPar.handrailModel == "round")
							extraLen += par.rackProfile / 2;
						if(meterHandrailPar.handrailModel != "round")
							extraLen += par.rackProfile / 2 + meterHandrailPar.profZ / 2;
						}
					var p2 = newPoint_xy(topLast, extraLen, 0);
					}
				if (par.topEnd == "забег"){
					var p1 = polar(topFirst, parRacks.angMarsh, 50);
					var topHandrailAng = angle(p1, topLast);
					var p2 = polar(topLast, topHandrailAng, 50)
					}
				if(params.stairModel == "Прямая горка"){
					var p2 = itercection(marsh2Last, polar(marsh2Last, -parRacks.angMarsh, 100), topLast, polar(topLast, 0, -100));
					if (params.railingModel == 'Ригели') {
						p2 = polar(p2, -parRacks.angMarsh, -40);
					}
					var p3 = polar(marsh2Last, -parRacks.angMarsh, 80)
					handrailPoints.push(p3);
				}
				handrailPoints.push(p1);
				handrailPoints.push(p2);
			}
	
			if (par.topEnd == "нет" || par.isRearPRailing){
				var extraLen = 75;
				if (par.lastRackPos) extraLen = par.lastRackPos;
				if (par.marshId == 'topPlt' && par.key == 'rear') {
					extraLen = 70 + params.stringerThickness + 40 / 2 - meterHandrailPar.profZ / 2; //40 - ширина стойки, 70 - расстояние от центра стойки до края тетивы
					if (params.model == "ко") extraLen += params.sideOverHang;
				}
	
				if(par.topConnection){
					//if (params.rackBottom == "сверху с крышкой") extraLen -= 80;
					if(meterHandrailPar.handrailModel == "round")
						extraLen += par.rackProfile / 2;
					if(meterHandrailPar.handrailModel != "round")
						extraLen += par.rackProfile / 2 - meterHandrailPar.profZ / 2;
					if(par.isRearPRailing) extraLen += meterHandrailPar.profZ;
	
					}
				var p1 = polar(marshLast, parRacks.angMarsh, extraLen);

				//если на следующем марше поворотная стойка, удиняем поручень до неё
				if (parRacks.marshLast.noDraw && parRacks.marshLast.dxToMarshNext) {
					p1 = newPoint_x1(marshLast, parRacks.marshLast.dxToMarshNext + (parRacks.marshLast.x - marshLast.x) + 10 - par.rackProfile, parRacks.angMarsh);
				}
				handrailPoints.push(p1);
			}
			
			return handrailPoints;
	} //end of calcHandrailPoints
	
	
	
	/***  СЕКЦИЯ ОГРАЖДЕНИЯ САМОНЕСУЩЕЕ СТЕКЛО  ***/
	
	
	function drawRailingSectionGlass(par){
	
		var section = new THREE.Object3D();
		var handrails = new THREE.Object3D();
	
			var marshParams = getMarshParams(par.marshId);
			var nextMarshParams = getMarshParams(marshParams.nextMarshId);
	
		//адаптация к единой функции drawMarshRailing
		if(par.stringerParams){
			par.racks = par.stringerParams[par.marshId].elmIns[par.key].racks
			if ((params.stairModel == "Прямая с промежуточной площадкой" || params.stairModel == 'Прямая горка') && par.marshId !== 'topPlt') {
				par.racks = [];
				par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
				//пересчитываем координаты стоек второго марша с учетом позиции марша
				for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
					var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
					point.x += par.stringerParams[3].treadsObj.unitsPos.marsh3.x;
					point.y += par.stringerParams[3].treadsObj.unitsPos.marsh3.y;
					par.racks.push(point)
				}
			}
			//рассчитываем необходимые параметры и добавляем в объект par
			setRailingParams(par)//функция в файле calcRailingParams.js
			par.keyPoints = par.stringerParams[par.marshId].keyPoints[par.key];
		}
	
		if (params.stairModel == "Прямая с промежуточной площадкой") {
			par.botEnd = "нет"
		}
	
			if (par.racks.length == 0) return section;
	
		var stringerSideOffset = 0;
		if(params.model == "ко") stringerSideOffset = params.sideOverHang;
		var glassDist = 10
			var glassThickness = 12 //толщина стекла
			var platformStringerWidth = 150; //ширина тетивы площадки
		var platformGlassMaxLength = 800 //максимальная длина стекла по горизонтали
		var glassHeight = 1300; //1400;
		var handrailPoints = [];
		var handrailSlotDepth = 15;
		var railingZOffset = 20 //зазор от стекла до торца марша
		if(params.model == "ко") railingZOffset = 5;
		var rutelLength = 50 + stringerSideOffset; //длина рутеля
		var rutelDiam = 14; //диаметр рутеля
			var rutelHoleDiam = 18; //диаметр отверстия под рутели
	
	
		var glassLengths = [];
	
		par.a = params.a1;
		par.b = params.b1;
		par.h = params.h1;
		par.stairAmt = params.stairAmt1;
		if(par.marshId == 2) {
			par.a = params.a2;
			par.b = params.b2;
			par.h = params.h2;
				par.stairAmt = params.stairAmt2;
			}
		if(par.marshId == 3) {
			par.a = params.a3;
			par.b = params.b3;
			par.h = params.h3;
				par.stairAmt = params.stairAmt3;
			}
	
		par.lastMarsh = false;
		if (par.marshId == 3) par.lastMarsh = true;
		if (params.stairModel == "Прямая" && par.marshId == 1) par.lastMarsh = true;
		if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId == 1) par.lastMarsh = true;
	
		var meterHandrailPar = {
			prof: params.handrailProf,
			sideSlots: params.handrailSlots,
			handrailType: params.handrail,
			metalPaint: params.metalPaint_perila,
			timberPaint: params.timberPaint_perila,
			}
		meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);
	
	
		//точки, снятые с тетивы / косоура
	
		if(!par.keyPoints) par.keyPoints = {};
		//нижний угол в начале секции
			if (!par.keyPoints.botLineP0) par.keyPoints.botLineP0 = newPoint_xy(par.racks[1], -100, -100);
			if (par.marshId == 1) {
			par.keyPoints.botLineP0 = copyPoint(par.keyPoints.zeroPoint);
				//смещяем начало ограждений если ограждение не с первой ступени
			if (params.railingStart !== 0)
				par.keyPoints.botLineP0 = newPoint_xy(par.keyPoints.botLineP0, par.b * params.railingStart, par.h * params.railingStart);
	
			}
		//нижний угол в конце секции
			if (!par.keyPoints.botLineP10) par.keyPoints.botLineP10 = newPoint_xy(par.racks[par.racks.length - 1], 100, -100);
		//нижняя линия на марше
		if(!par.keyPoints.marshBotLineP1) par.keyPoints.marshBotLineP1 = {x: 0, y: 0};
		if (!par.keyPoints.marshBotLineP2) par.keyPoints.marshBotLineP2 = { x: 100, y: 100 };
	
		if (par.isPlatform && par.keyPoints.end2) {		
			par.keyPoints.botLineP0.x = par.keyPoints.end2.x;
			par.keyPoints.botLineP10.x = par.keyPoints.end1.x;
		}
	
		//сортируем массив racks в порядке возрастания координаты x
		par.racks.sort(function (a, b) {
				return a.x - b.x;
			});
	
		//координата нижнего угла первого стекла марша
		var p0 = { x: 0, y: 0 };
		if (par.marshId == 1) p0 = copyPoint(par.keyPoints.botLineP0)
		
			//для внутренней стороны марша кроме первого
			if (par.botEnd == "нет" && par.marshId !== 1) p0 = newPoint_xy(par.keyPoints.botLineP0, railingZOffset, 0);
			if (par.botEnd == "забег" && par.stairAmt == 0 && par.lastMarsh) {
				//p0 = newPoint_xy(p0, par.b, 0);
				if (params.model == "ко") p0 = newPoint_xy(p0, params.lastWinderTreadWidth - 15, 0);
				if (params.model == "лт") p0 = newPoint_xy(p0, params.lastWinderTreadWidth + 15, 0);
			}
	
		var marshStart = itercection(p0, newPoint_xy(p0, 0, 100), par.keyPoints.marshBotLineP1, par.keyPoints.marshBotLineP2)
	
	//нижний поворот
		if (params.stairModel == "П-образная с забегом" && par.marshId == 2) {
			par.botEnd = "нет";
		}
	
		if(par.botEnd != "нет"){
	
			//координата нижнего угла секции
			var glassPos = newPoint_xy(par.keyPoints.botLineP0,  glassDist - params.stringerThickness, 0);
			if (par.botConnection) glassPos = newPoint_xy(glassPos, -railingZOffset - stringerSideOffset, 0);
			if (par.botEnd == "площадка") glassPos.x += params.stringerThickness;
			if (par.botEnd == "площадка" && params.model == "ко") glassPos.y = marshStart.y;
	
	
			var glassPar = {
				angleTop: 0,
				width: marshStart.x - glassPos.x - glassDist,
				heightLeft: glassHeight,
				botCutHeight: 0,
				topCutHeight: 0,
				thk: glassThickness,
				angleBot: 0,
				holes: [],
				dxfBasePoint: par.dxfBasePoint,
				dxfArr: dxfPrimitivesArr,
				}
	
	
	
			//расчет параметров стекла на забеге
			if (par.botEnd == "забег") {
				//Рассчитываем координаты углов стекла (вспомогательыне точки)
				var p0 = copyPoint(glassPos); //сохраняем точку
				var p1 = newPoint_xy(p0, 0, glassHeight);
				var p2 = newPoint_xy(marshStart, 0, glassHeight);
				var p3 = copyPoint(marshStart);
				var p4 = newPoint_xy(p0, 150, 0); //длина 150 установлена для теста
	
				glassPos = itercection(p0, p1, p3, p4); //рассчитываем позицию угла стекла без среза
	
				glassPar.angleTop = angle(p1, p2);
				glassPar.angleBot = angle(p4, p3);
				glassPar.botCutHeight = p0.y - glassPos.y;
	
				glassPar.heightLeft += glassPar.botCutHeight; //высота слева с учетом среза должна быть равной номинальной
				}
	
			//формирование массива holes для рутелей из массива отверстий par.racks
			for(var j = 0; j < par.racks.length; j++){
				var hole = { x: par.racks[j].x, y: par.racks[j].y, rad: rutelHoleDiam/2 };
				if(glassPos.x < hole.x && glassPos.x + glassPar.width > hole.x){
					hole.x -= glassPos.x;
					hole.y -= glassPos.y;
					glassPar.holes.push(hole);
					}
				}
	
			//Отрисовка стекла нижнего поворота
	
			glassPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, glassPos.x, glassPos.y);
			var glass = drawGlass_ko(glassPar).mesh;
			glass.position.x = glassPos.x;
			glass.position.y = glassPos.y;
			glass.position.z = railingZOffset;
			if(par.railingSide == 'left') glass.position.z = -railingZOffset - glassThickness;
			section.add(glass);
	
			//базовая точка для поручня
			handrailPoints.push(newPoint_xy(glassPos, glassDist, glassPar.heightLeft));
	
		}
	
	//стекла на марше
	
	
		//параметры стекол на марше
	
		var glassPos = marshStart;
		var marshAngle = angle(par.keyPoints.marshBotLineP1, par.keyPoints.marshBotLineP2);
			var marshSectLen = par.b * par.stairAmt;
		if(params.startTreadAmt > 0 && par.marshId == 1) glassPos = newPoint_xy(marshStart, params.startTreadAmt * par.b + 20, params.startTreadAmt * par.h)
	
	
			//if (par.stairAmt == 0) marshSectLen = par.keyPoints.botLineP10.x - par.keyPoints.botLineP0.x;
	
			//для внутренней стороны марша кроме последнего считаем длину марша через координаты угла косоура
			if (!par.lastMarsh && par.topEnd == "нет") {
					marshSectLen = par.keyPoints.botLineP10.x - marshStart.x - railingZOffset - glassThickness - glassDist;
					if (params.stairModel == "П-образная с забегом" || params.stairModel == "П-образная с площадкой")
				marshSectLen += glassThickness + glassDist;
			if (params.model == "ко") {
				marshSectLen -= 100;
				if (params.stairModel == "П-образная с площадкой") marshSectLen += 45;
			}
			}
	
		//для последнего марша считаем длину марша через координаты угла косоура
		if(par.lastMarsh && par.topEnd == "нет") {
			marshSectLen = par.keyPoints.botLineP10.x;
					marshSectLen -= glassDist;
	
			if(par.key == "in") {
				marshSectLen = par.keyPoints.botLineP10.x - glassDist - railingZOffset - par.keyPoints.botLineP0.x;
				}
			}
	
		if(params.startTreadAmt > 0 && par.marshId == 1) marshSectLen -= params.startTreadAmt * par.b + 20;	
	
		if(par.topEnd == "площадка") marshSectLen += par.b;
	
		//рассчитываем координаты разрывов стекол по координатам рутелей
			//определяем индекс первого и последнего рутеля марша
			var marshFirstRutIndex = 0;
			var marshLastRutIndex = 3;
			for(var i=0; i< par.racks.length; i++){
				if(par.racks[i].x > 0) {
					marshFirstRutIndex = i;
					break;
					}
				}
	
		var marshLen = marshSectLen;
		if (params.railingStart !== 0 && par.marshId == 1) marshLen += params.railingStart * par.b;
			for(var i=0; i< par.racks.length; i++){
				if (par.racks[i].x > marshLen) {
					break;
					}
				marshLastRutIndex = i;
				}
	
			//рассчитываем координаты разрывов стекол
			var divideX = [];
			for(var i = marshFirstRutIndex + 3; i < marshLastRutIndex-2; i++){
				if(par.racks[i+1].x - par.racks[i].x - par.b < 0.01){
					divideX.push(par.racks[i].x + par.b / 2);
					i += 3;
					}
				}
			//массив длин стекол
			var glassLengths = [];
			for(var i=0; i< divideX.length; i++){
				if (i == 0) glassLengths.push(divideX[i] - glassDist - (marshLen - marshSectLen));
				if(i != 0) glassLengths.push(divideX[i] - divideX[i - 1] - glassDist);
				}
	
			//первое стекло
			if (divideX[0]) glassLengths.push(marshLen - divideX[divideX.length - 1])
			else glassLengths.push(marshSectLen)
	
					if (par.stairAmt == 0 && !par.isPlatform) {
							glassLengths = [];
							if (par.topEnd != "нет" || par.botEnd != "нет")
									handrailPoints.push(newPoint_xy(glassPos, 0, glassHeight));
					}
	
		//параметры заднего ограждения забега П-образной лестницы
		if(par.isRearPWnd){
					var glassPos = newPoint_xy(par.keyPoints.botLineP0, -stringerSideOffset + glassDist - railingZOffset - params.stringerThickness, 0);
			marshAngle = angle(par.racks[1], par.racks[par.racks.length - 1]);
	
					var totalSectLen = par.keyPoints.botLineP10.x - par.keyPoints.botLineP0.x - glassDist
							+ params.stringerThickness + railingZOffset * 2 + glassThickness + stringerSideOffset*2;
					glassLengths = [totalSectLen / 2 - glassDist / 2, totalSectLen / 2 - glassDist / 2]
			}
	
		//параметры стекла на площадке
		if(par.isPlatform){
				glassPos = copyPoint(par.keyPoints.botLineP0);
					//glassPos.x -= railingZOffset - glassDist + stringerSideOffset;
			marshAngle = 0;
			glassLengths = [];
	
					//var totalSectLen = par.keyPoints.botLineP10.x;
			var totalSectLen = par.keyPoints.botLineP10.x - par.keyPoints.botLineP0.x;
					//totalSectLen += railingZOffset * 2 + glassThickness + stringerSideOffset * 2;// - glassDist;
					if (!par.isRearPRailing && par.lastMarsh) totalSectLen -= glassThickness + glassDist ;
					if (params.model == "ко" && par.lastMarsh) {
							glassPos.x -= params.stringerThickness;
							totalSectLen += params.stringerThickness * 2;
					}
					if (par.isRearPRailing && dyRearPlatform) glassPos.y -= dyRearPlatform;
					if (!par.isRearPRailing && par.lastMarsh && dyLastRearPlatform) glassPos.y -= dyLastRearPlatform;
	
			var glassAmt = Math.round(par.racks.length / 4); //по 4 рутеля на каждое стекло
					glassWidth = (totalSectLen - glassDist * glassAmt) / glassAmt;
			for(var i=0; i<glassAmt; i++){
				glassLengths.push(glassWidth);
				}
			}
	
	
	
		//отрисовка стекол марша
	
			for(var i=0; i<glassLengths.length; i++){
	
			var glassPar = {
				angleTop: marshAngle,
				width: sectLen,
				heightLeft: glassHeight,
				botCutHeight: 0,
				topCutHeight: 0,
				thk: glassThickness,
				angleBot: marshAngle,
				holes: [],
				dxfBasePoint: par.dxfBasePoint,
				dxfArr: dxfPrimitivesArr,
				}
	
			//срез низа первого стекла первого марша
				if (i == 0 && par.marshId == 1) {
					if (marshStart.y - glassDist < 0) {
						glassPar.botCutHeight = par.keyPoints.botLineP0.y - marshStart.y + glassDist;
						glassPar.botCutHeight -= par.h * params.railingStart;
					}
			}
			else glassPar.botCutHeight = 0;
			if (params.startTreadAmt > 0 && par.marshId == 1 && i == 0) {
				glassPar.botCutHeight = 0;
				if (params.railingStart == 0) glassPar.botCutHeight = - marshStart.y - par.h + glassDist;
			}
	
			/*
			//срез верха последнего стекла
			if(par.topEnd == "площадка" && i == glassLengths.length - 1 && par.botEnd != "забег"){
				glassPar.topCutHeight = botCutHeight;
				}
			*/
	
			glassPar.width = glassLengths[i];
	
			//формирование массива holes для рутелей из массива отверстий par.racks
			for(var j = 0; j < par.racks.length; j++){
				var hole = { x: par.racks[j].x, y: par.racks[j].y, rad: rutelHoleDiam/2 };
				if(glassPos.x < hole.x && glassPos.x + glassPar.width > hole.x){
					hole.x -= glassPos.x;
					hole.y -= glassPos.y;
					glassPar.holes.push(hole);
					}
				}
	
	
			//отрисовка стекла марша
	
			glassPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, glassPos.x, glassPos.y);
			var glass = drawGlass_ko(glassPar).mesh;
			glass.position.x = glassPos.x;
			glass.position.y = glassPos.y;
			glass.position.z = railingZOffset;
			if(par.railingSide == 'left') glass.position.z = -railingZOffset - glassThickness;
			section.add(glass);
	
			//точка поручня на первом стекле
			if(i == 0) handrailPoints.push(newPoint_xy(glassPos, 0, glassHeight));
			//точка поручня на последнем стекле
			if(i == glassLengths.length - 1){
				var handrailPoint = newPoint_xy(glassPos, 0, glassHeight);
					handrailPoint = newPoint_x1(handrailPoint, glassPar.width, marshAngle);
				handrailPoints.push(handrailPoint);
				}
	
			glassPos = newPoint_x1(glassPos, glassPar.width + glassDist, glassPar.angleTop);
	
		} //конец цикла построения стекол марша
	
	
		if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId !== 'topPlt') {
		//Отрисовка стекла промежуточной площадки
			{
				glassPos = newPoint_x1(marshStart, marshSectLen, marshAngle)
				glassPos = newPoint_xy(glassPos, glassDist, 0);
				var extraLenX = stringerSideOffset - glassDist;
				var sectLen = (par.b * par.stairAmt + params.middlePltLength) - glassPos.x + extraLenX;
	
	
				var glassPar = {
					angleTop: 0,
					width: sectLen,
					heightLeft: glassHeight,
					botCutHeight: 0,
					topCutHeight: 0,
					thk: glassThickness,
					angleBot: 0,
					holes: [],
					dxfBasePoint: par.dxfBasePoint,
					dxfArr: dxfPrimitivesArr,
				}
	
				//формирование массива holes для рутелей из массива отверстий par.racks
				for (var j = 0; j < par.racks.length; j++) {
					var hole = { x: par.racks[j].x, y: par.racks[j].y, rad: rutelHoleDiam / 2 };
					if (glassPos.x < hole.x && glassPos.x + glassPar.width > hole.x) {
						hole.x -= glassPos.x;
						hole.y -= glassPos.y;
						glassPar.holes.push(hole);
					}
				}
	
				//Отрисовка стекла верхнего поворота
				glassPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, glassPos.x, glassPos.y);
				var glass = drawGlass_ko(glassPar).mesh;
				glass.position.x = glassPos.x;
				glass.position.y = glassPos.y;
				glass.position.z = railingZOffset;
				if (par.railingSide == 'left') glass.position.z = -railingZOffset - glassThickness;
				section.add(glass);
	
				//базовая точка для поручня
				var ph = newPoint_x1(glassPos, sectLen, glassPar.angleBot)
				var handrailPoint = newPoint_xy(ph, 0, glassPar.heightLeft)
	
				//handrailPoints.push(handrailPoint);
			}
		//Отрисовка стекла верхнего марша
			{
				//параметры стекол на марше
	
				var glassPos = newPoint_xy(ph, 10, 0);
				var marshAngle = Math.atan(params.h3 / params.b3);
				var marshSectLen = params.b3 * params.stairAmt3;
				
				if (par.topEnd == "площадка") marshSectLen += par.b;
	
				//рассчитываем координаты разрывов стекол по координатам рутелей
				//определяем индекс первого и последнего рутеля марша
				var marshFirstRutIndex = 0;
				var marshLastRutIndex = 3;
				for (var i = 0; i < par.racks.length; i++) {
					if (par.racks[i].x > 0) {
						marshFirstRutIndex = i;
						break;
					}
				}
	
				for (var i = 0; i < par.racks.length; i++) {
					if (par.racks[i].x > marshSectLen) {
						break;
					}
					marshLastRutIndex = i;
				}
	
				//рассчитываем координаты разрывов стекол
				var divideX = [];
				for (var i = marshFirstRutIndex + 3; i < marshLastRutIndex - 2; i++) {
					if (par.racks[i + 1].x - par.racks[i].x - params.b3 < 0.01) {
						divideX.push(par.racks[i].x + params.b3 / 2);
						i += 3;
					}
				}
				//массив длин стекол
				var glassLengths = [];
				for (var i = 0; i < divideX.length; i++) {
					if (i == 0) glassLengths.push(divideX[i] - glassDist);
					if (i != 0) glassLengths.push(divideX[i] - divideX[i - 1] - glassDist);
				}
	
				//первое стекло
				if (divideX[0]) glassLengths.push(marshSectLen - divideX[divideX.length - 1])
				else glassLengths.push(marshSectLen)
	
				//отрисовка стекол марша
				for (var i = 0; i < glassLengths.length; i++) {
	
					var glassPar = {
						angleTop: marshAngle,
						width: sectLen,
						heightLeft: glassHeight,
						botCutHeight: 0,
						topCutHeight: 0,
						thk: glassThickness,
						angleBot: marshAngle,
						holes: [],
						dxfBasePoint: par.dxfBasePoint,
						dxfArr: dxfPrimitivesArr,
					}
	
					glassPar.width = glassLengths[i];
	
					//формирование массива holes для рутелей из массива отверстий par.racks
					for (var j = 0; j < par.racks.length; j++) {
						var hole = { x: par.racks[j].x, y: par.racks[j].y, rad: rutelHoleDiam / 2 };
						if (glassPos.x < hole.x && glassPos.x + glassPar.width > hole.x) {
							hole.x -= glassPos.x;
							hole.y -= glassPos.y;
							glassPar.holes.push(hole);
						}
					}
	
	
					//отрисовка стекла марша
	
					glassPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, glassPos.x, glassPos.y);
					var glass = drawGlass_ko(glassPar).mesh;
					glass.position.x = glassPos.x;
					glass.position.y = glassPos.y;
					glass.position.z = railingZOffset;
					if (par.railingSide == 'left') glass.position.z = -railingZOffset - glassThickness;
					section.add(glass);
	
					//точка поручня на первом стекле
					if (i == 0) handrailPoints.push(newPoint_xy(glassPos, 0, glassHeight));
					//точка поручня на последнем стекле
					if (i == glassLengths.length - 1) {
						var handrailPoint = newPoint_xy(glassPos, 0, glassHeight);
						handrailPoint = newPoint_x1(handrailPoint, glassPar.width, marshAngle);
						handrailPoints.push(handrailPoint);
					}
	
					glassPos = newPoint_x1(glassPos, glassPar.width + glassDist, glassPar.angleTop);
	
				} //конец цикла построения стекол марша
				var ph1 = copyPoint(glassPos);
			}
		}
	
	
	
	//верхний поворот
	
		if(par.topEnd != "нет"){
	
					glassPos = newPoint_x1(marshStart, marshSectLen, marshAngle)
					//if (par.botEnd == "забег" && par.stairAmt == 0) glassPos = copyPoint(marshStart);
				glassPos = newPoint_xy(glassPos, glassDist, 0);
			var extraLenX = stringerSideOffset - glassDist;
					if (par.topConnection) extraLenX += railingZOffset + glassDist + glassThickness;
	
			var sectLen = par.keyPoints.botLineP10.x - glassPos.x + extraLenX;
				if (par.stairAmt == 0) {
						glassPos = copyPoint(marshStart);
							sectLen = par.keyPoints.botLineP10.x - glassPos.x + extraLenX;
				}
	
				if (par.topEnd == "площадка") {
						sectLen += params.stringerThickness;
			}
	
			if (params.stairModel == "Прямая с промежуточной площадкой") {
				glassPos = newPoint_xy(ph1, 0, 0);
				sectLen = params.platformLength_3 - params.b3;
			}
	
					//запоминаем сдвиг по высоте от верхнего края косоура до нижнего края стекла для заднего стекла площадки
				if (!par.lastMarsh) dyRearPlatform = par.keyPoints.botLineP10.y - glassPos.y;
			if (par.lastMarsh) dyLastRearPlatform = par.keyPoints.botLineP10.y - glassPos.y;
	
	
			var glassPar = {
				angleTop: 0,
				width: sectLen,
				heightLeft: glassHeight,
				botCutHeight: 0,
				topCutHeight: 0,
				thk: glassThickness,
				angleBot: 0,
				holes: [],
				dxfBasePoint: par.dxfBasePoint,
				dxfArr: dxfPrimitivesArr,
					}
	
				//срез низа первого стекла первого марша если в марше 0 ступеней
					if (par.stairAmt == 0 && par.marshId == 1) {
							if (par.topEnd == "забег") {
					glassPos = {x:0, y: -50,}            
					glassPar.botCutHeight = 50 + glassDist;
					//пересчитываем точку поручня
					handrailPoints[handrailPoints.length - 1].y = - glassPar.botCutHeight + glassPar.heightLeft
					}
					
							if (par.topEnd == "площадка") {
									glassPar.heightLeft -= glassDist;
									glassPos.y += glassDist;
							}
					}
	
	
			//расчет параметров стекла на забеге
			if(par.topEnd == "забег") {
				//Рассчитываем координаты углов стекла
				var p0 = copyPoint(glassPos);
				var p1 = newPoint_xy(p0, 0, glassHeight);
				var p3 = newPoint_xy(par.keyPoints.botLineP10, extraLenX, 0);
				var p2 = newPoint_xy(p3, 0, glassHeight);
	
				glassPar.angleTop = angle(p1, p2);
				glassPar.angleBot = angle(p0, p3);
				}
	
			//формирование массива holes для рутелей из массива отверстий par.racks
			for(var j = 0; j < par.racks.length; j++){
				var hole = { x: par.racks[j].x, y: par.racks[j].y, rad: rutelHoleDiam/2 };
				if(glassPos.x < hole.x && glassPos.x + glassPar.width > hole.x){
					hole.x -= glassPos.x;
					hole.y -= glassPos.y;
					glassPar.holes.push(hole);
					}
				}
	
			//Отрисовка стекла верхнего поворота
			glassPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, glassPos.x, glassPos.y);
			var glass = drawGlass_ko(glassPar).mesh;
			glass.position.x = glassPos.x;
			glass.position.y = glassPos.y;
			glass.position.z = railingZOffset;
			if(par.railingSide == 'left') glass.position.z = -railingZOffset - glassThickness;
			section.add(glass);
	
			//базовая точка для поручня
			var ph = newPoint_x1(glassPos, sectLen, glassPar.angleBot)
			var handrailPoint = newPoint_xy(ph, 0, glassPar.heightLeft)
			//укорачиваем поручень чтобы не было пересечения с поручнем верхнего марша
			if(par.key == "out" && par.topConnection){
				if(params.handrailFixType == "кронштейны")  handrailPoint = newPoint_x1(handrailPoint, -150, glassPar.angleTop)
				if(params.handrailFixType == "паз")  handrailPoint = newPoint_x1(handrailPoint, 40 / 2 - 6, glassPar.angleTop)
	
				}
	
			handrailPoints.push(handrailPoint);
	
		}
	
	
	
		//отрисовка рутелей
	
		if(typeof anglesHasBolts != "undefined" && anglesHasBolts && par.showPins){ //anglesHasBolts - глобальная переменная
	
	
			var rutelGeometry = new THREE.CylinderGeometry(rutelDiam/2, rutelDiam/2, rutelLength, 20, 0, false);
		var rutelMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
	
		for(var i = 0; i < par.racks.length; ++i){
			var center = { x: par.racks[i].x, y: par.racks[i].y };
			var rutel = new THREE.Mesh(rutelGeometry, rutelMaterial);
	
			//позиционирование рутеля
				rutel.rotation.x = Math.PI / 2;
			rutel.position.x = center.x;
			rutel.position.y = center.y;
			rutel.position.z = -rutelLength/2 + glassThickness + railingZOffset;
			if(par.railingSide == 'left') rutel.position.z = rutelLength/2 - glassThickness - railingZOffset;
	
			section.add(rutel);
			}
		}
	
		//сохраняем массив точек в отдельную переменную
		var handrailPoints0 = handrailPoints;
		
		//поручни
	
			if (params.handrail !== "нет") {
					var meterHandrailPar = {
							prof: params.handrailProf,
							sideSlots: params.handrailSlots,
							handrailType: params.handrail,
							metalPaint: params.metalPaint_perila,
							timberPaint: params.timberPaint_perila,
					}
					meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);
	
			handrailParams = {
				points: handrailPoints,
				side: par.railingSide,
				offset: handrailSlotDepth,
				extraLengthStart: 10,
				extraLengthEnd: 10,
				connection: params.handrailConnectionType,
				dxfBasePoint: par.dxfBasePoint,
				fixType: params.handrailFixType,
				sectText: par.text,
				}
	
			//удлиннение поручня последнего марша
			if(params.stairModel == "прямая" || par.marshId == 3) {
				handrailParams.extraLengthEnd += params.topHandrailExtraLength;
				}
	
			//вертикальные участки
			if(params.startVertHandrail == "есть" && params.handrailFixType == "паз"){
				//начало секции
				//первый марш
				if(par.marshId == 1) {
					var startPoint = {
						x: handrailParams.points[0].x,
						y: 0,
						}
						//newPoint_xy(handrailParams.points[0], 0, -glassHeight);
									handrailParams.points.unshift(startPoint);
									if (par.key == 'in' && (!nextMarshParams.hasRailing.in || params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом")) {
											if (params.model == "ко") handrailParams.points[handrailParams.points.length - 1] = newPoint_x1(handrailParams.points[handrailParams.points.length - 1], -meterHandrailPar.profY - 3, marshAngle);
											if (params.model == "лт") handrailParams.points[handrailParams.points.length - 1] = newPoint_x1(handrailParams.points[handrailParams.points.length - 1], -meterHandrailPar.profY + handrailParams.extraLengthEnd, marshAngle);
											var startPoint = newPoint_xy(handrailParams.points[handrailParams.points.length - 1], 0, -glassHeight); //поправить
								handrailParams.points.push(startPoint);
						}
					}
				//средний марш
							if (par.marshId == 2 && par.botEnd == 'нет') {
									if (par.key == 'in') {
											if (params.model == "ко") handrailParams.points[0] = newPoint_x1(handrailParams.points[0], (meterHandrailPar.profY - 40) + 3, marshAngle);
											if (params.model == "лт") handrailParams.points[0] = newPoint_x1(handrailParams.points[0], (meterHandrailPar.profY - 40), marshAngle);
									}
					var startPoint = newPoint_xy(handrailParams.points[0], 0, -glassHeight); //поправить
									handrailParams.points.unshift(startPoint);
									if (par.key == 'in' && (!nextMarshParams.hasRailing.in || params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом")) {
											if (params.model == "ко") handrailParams.points[handrailParams.points.length - 1] = newPoint_x1(handrailParams.points[handrailParams.points.length - 1], -meterHandrailPar.profY - 3, marshAngle);
											if (params.model == "лт") handrailParams.points[handrailParams.points.length - 1] = newPoint_x1(handrailParams.points[handrailParams.points.length - 1], -meterHandrailPar.profY + handrailParams.extraLengthEnd, marshAngle);
											var startPoint = newPoint_xy(handrailParams.points[handrailParams.points.length - 1], 0, -glassHeight); //поправить
											handrailParams.points.push(startPoint);
									}
					}
				//верхний марш
							if (par.marshId == 3 && par.botEnd == 'нет') {
									if (par.key == 'in') {
											if (params.model == "ко") handrailParams.points[0] = newPoint_x1(handrailParams.points[0], (meterHandrailPar.profY - 40) + 3, marshAngle);
											if (params.model == "лт") handrailParams.points[0] = newPoint_x1(handrailParams.points[0], (meterHandrailPar.profY - 40), marshAngle);
									}
					var startPoint = newPoint_xy(handrailParams.points[0], 0, -glassHeight); //поправить
					handrailParams.points.unshift(startPoint);
					}
			}
			if (par.marshId == "topPlt" && params.handrailFixType == "кронштейны") {			
				var extraLengthBack = 50 + meterHandrailPar.profZ / 2 + 5;// 50- расстояние от стены до оси поручня
				handrailParams.extraLengthEnd -= extraLengthBack * 2;
			}
	
			handrailParams = drawPolylineHandrail(handrailParams);
	
			var handrail = handrailParams.mesh;
	
			if(params.handrailFixType == "паз"){
				handrail.position.z = -handrailParams.wallOffset - railingZOffset - glassThickness / 2;
				if(par.railingSide == "right") handrail.position.z = handrailParams.wallOffset + railingZOffset + glassThickness / 2;
			}
			if (par.marshId == "topPlt") {
				if (params.handrailFixType == "паз")
					handrail.position.z = 2 - glassThickness / 2 - handrailParams.meterHandrailPar.profZ / 2;
				if (params.handrailFixType == "кронштейны") {
					//handrail.position.z = 2 - glassThickness / 2 - handrailParams.meterHandrailPar.profZ / 2;
					handrail.position.x -= extraLengthBack + 10;
					handrail.rotation.y = Math.PI;
				}
			}
			handrails.add(handrail);
	
		} //конец поручней
		
		//сохраняем данные для спецификации
		if (typeof railingParams != 'undefined') {
			if (!railingParams.sections) {
				railingParams.sections = {
					types: [],
					sumLen: 0,
				}
			}
			for(var i=1; i<handrailPoints0.length; i++){
				var sectLen = distance(handrailPoints0[i-1], handrailPoints0[i]);
				railingParams.sections.types.push(sectLen);
				railingParams.sections.sumLen += sectLen / 1000;
				}
			}
	
		var textHeight = 30;
		var text = par.text;
			var textBasePoint = newPoint_xy(par.dxfBasePoint, 20, -150);
		addText(text, textHeight, dxfPrimitivesArr, textBasePoint);
	
		par.mesh = section;
		
		var result = {
			mesh: section,
			handrails: handrails,
			}
		return result;
	
	}//end of drawRailingSectionGlass
	
	
	
	
	function drawGlass_ko(par){
		/* ссылка на чертеж 6692035.ru/drawings/railing/glassParams_ko.pdf
		angleTop
		heightLeft
		width
		thk
		botCutHeight
		angleBot
		holes
		*/
	
		var glassMaterial = new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x3AE2CE, transparent: true });
			var extrudeOptions = {
					amount: par.thk,
					bevelEnabled: false,
					curveSegments: 12,
					steps: 1
			};
	
		//четырехугольник без срезов
		var p1 = {x: 0, y: 0};
		var p2 = newPoint_xy(p1, 0, par.heightLeft);
		var p3 = newPoint_x1(p2, par.width, par.angleTop);
		var p4 = newPoint_x1(p1, par.width, par.angleBot);
	
	
		//срез снизу
		var botY = p1.y;
		if(par.botCutHeight != 0) {
			var p11 = newPoint_y(p1,  par.botCutHeight, par.angleBot);
			var p12 = newPoint_xy(p1, 0, par.botCutHeight);
			botY = p12.y;
			}
	
		//срез сверху
		var topY = p3.y;
		if(par.topCutHeight != 0) {
			var p31 = newPoint_y(p1,  -par.topCutHeight, par.angleTop);
			var p32 = newPoint_xy(p3, 0, -par.topCutHeight);
			topY = p32.y;
			}
	
		var shape = new THREE.Shape();
	
		//начинаем с 4 точки
		if(par.botCutHeight == 0){
			addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
			}
		if(par.botCutHeight != 0){
			addLine(shape, par.dxfArr, p4, p11, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p11, p12, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p12, p2, par.dxfBasePoint);
			}
	
		//начинаем с 2 точки
		if(par.topCutHeight == 0){
			addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
			}
		if(par.topCutHeight != 0){
			addLine(shape, par.dxfArr, p2, p31, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p31, p32, par.dxfBasePoint);
			addLine(shape, par.dxfArr, p32, p4, par.dxfBasePoint);
			}
	
	
		//длина стекла справа (для расчета длины слева следующего стекла)
		par.heightRight = p3.y - p4.y;
	
		//базовые точки для поручней
		par.p1 = copyPoint(p2);
		par.p2 = copyPoint(p3);
	
		//отверстия стекла
		for(var i = 0; i < par.holes.length; ++i){
			addRoundHole(shape, dxfPrimitivesArr, par.holes[i], par.holes[i].rad, par.dxfBasePoint);
		}
	
	
		if (!shape.userData) shape.userData = {};
		shape.userData.type = 'glass';
		shape.userData.keyPoints = {topP1: p2, topP2: p3, botP1: p4, botP2: p1};
		if (p11) {
			shape.userData.keyPoints.botP2 = p11;
			shape.userData.keyPoints.botP3 = p12;
		}
		shapesList.push(shape);
	
		var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var glass = new THREE.Mesh(geometry, glassMaterial);
	
		par.mesh = glass;
	
		//сохраняем данные для спецификации
		var glassHeight2 = topY - botY;
		var partName = "glasses";
		if(typeof specObj !='undefined'){
			if(!specObj[partName]){
				specObj[partName] = {
					types: {},
					amt: 0,
					sumArea: 0,
					area: 0,
					name: "Стекло",
					metalPaint: false,
					timberPaint: false,
					division: "stock_2",
					workUnitName: "amt", //единица измерения
					}
				}
			var name = Math.round(par.width) + "x" + Math.round(glassHeight2);
			var area = Math.round(par.width * glassHeight2 / 10000)/100;
			if(specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if(!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
			specObj[partName]["area"] += area;
			specObj[partName]["sumArea"] += area;
			}
	
		return par;
	} //end of drawGlass_ko
	
	/**функция определяет из массива стоек racks начальную и конечную стойки марша и площадок,
		и задает длину стоек
		*/
		
	function setRacksParams(par) {
	
		//параметры марша
		var marshPar = getMarshParams(par.marshId);
		var prevMarshPar = getMarshParams(marshPar.prevMarshId);
		var nextMarshPar = getMarshParams(marshPar.nextMarshId);
		par.a = marshPar.a;
		par.b = marshPar.b;
		par.h = marshPar.h;
		par.stairAmt = marshPar.stairAmt;
	
		//рассчитываем необходимые параметры и добавляем в объект par
		setRailingParams(par) //функция в файле calcRailingParams.js
	
		//костыль для верхней площадки лт лестницы сдвигаем стойки заднего ограждения, что бы совпали отверстия 
		if (params.model == "лт" && params.railingModel == "Кованые балясины" && par.isPlatform && par.marshId == "topPlt") {
			par.racks[0].x -= 5;
			par.racks[par.racks.length - 1].x -= 5;
		}
		
	
		var racks = par.racks;
		var parRacks = {};
	
		//костыль для второго марша сдвигаем стойки
		if (params.stairModel == "Прямая горка") {
			for (var i = 0; i < racks.length; i++) {
				if (racks[i + 1]) {
					if (racks[i].x > racks[i + 1].x) {
						racks[i].x += 10;
					}
				}
			}
		}
	
		//сортируем массив points в порядке возрастания координаты x
		racks.sort(function (a, b) {
			return a.x - b.x;
			});
	
		//определяем крайние стойки снизу
		if (par.botEnd != "нет") {
			parRacks.botFirst = racks[0];
			parRacks.botLast = racks[1];
	
			//ищем стойки на той же высоте но дальше по Х
			for(var i = 0; i<racks.length; i++){
				if (!racks[i]) continue;
				if(racks[i].y == parRacks.botLast.y && racks[i].x > parRacks.botLast.x){
					parRacks.botLast = racks[i];
					}
				}
			}
		if(params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt"){
			var botFirst = {};
			var botLast = {};
			for(var i = 0; i < racks.length - 1; i++){
				if (!botFirst.x && racks[i].y == racks[i+1].y) {
					botFirst = racks[i];
				}
				if(racks[i].y == botFirst.y) botLast = racks[i];
				if(racks[i + 1].y == botFirst.y) botLast = racks[i + 1];
			}
			parRacks.botFirst = botFirst;
			parRacks.botLast = botLast;
		}
	
		//определяем крайние точки сверху
		if (par.topEnd !== "нет") {
			parRacks.topLast = racks[racks.length - 1];
			parRacks.topFirst = racks[racks.length - 2];
			//ищем стойки на той же высоте но ближе по Х
			for(var i = racks.length - 1; i>0; i--){
				if(racks[i].y == parRacks.topFirst.y && racks[i].x < parRacks.topFirst.x){
					parRacks.topFirst = racks[i];
					}
				if(racks[i].y == parRacks.topLast.y && racks[i].x > parRacks.topLast.x){
					parRacks.topLast = racks[i];
					}
				}
			}
	
		//определяем крайние стойки марша
		parRacks.marshFirst = racks[0];
		if (par.botEnd != "нет") parRacks.marshFirst = parRacks.botLast;
		parRacks.marshLast = racks[racks.length - 1];
		if (par.topEnd != "нет" && racks.length > 2) parRacks.marshLast = parRacks.topFirst;
	
		if(params.stairModel == "Прямая горка"){
			var topFirst = {};
			for(var i=0; i < racks.length; i++){
				if(!topFirst.x && racks[i].y == racks[i+1].y) {
					topFirst = racks[i];
				}
				if(racks[i].y == topFirst.y) parRacks.topLast = racks[i];
			}
			parRacks.marshLast = topFirst;
			parRacks.topFirst = topFirst;
	
			parRacks.marsh2First = parRacks.topLast;
			parRacks.marsh2First.x += 10;
			parRacks.marsh2Last = racks[racks.length-1];		
		}
	
		//определяем крайние стойки марша
		parRacks.marshFirst = racks[0];
		if (par.botEnd != "нет") parRacks.marshFirst = parRacks.botLast;
		parRacks.marshLast = racks[racks.length - 1];
		if (par.topEnd != "нет" && racks.length > 2) parRacks.marshLast = parRacks.topFirst;

		
		//рассчитываем длины и углы верхнего и нижнего участков
	
		if ((par.botEnd !== "нет" && par.stairAmt > 0) || (par.botEnd == "площадка" && par.topEnd == "площадка")) {
					parRacks.angBot = calcAngleX1(parRacks.botFirst, parRacks.botLast);
					parRacks.botLen = distance(parRacks.botFirst, parRacks.botLast);
			}
		if ((par.topEnd !== "нет" && par.stairAmt > 0) || par.topEnd == "площадка") {
					parRacks.angTop = calcAngleX1(parRacks.topFirst, parRacks.topLast);
					parRacks.topLen = distance(parRacks.topFirst, parRacks.topLast);
			}
	
		//задаем длину стоек
		var rackPlatformLength = par.rackLength + 50;
		for(var i=0; i<racks.length; i++){
			if (!racks[i]) continue;
			racks[i].len = par.rackLength;
			if (params.railingModel != "Кованые балясины"){
				if(par.botEnd == "площадка" && racks[i].x <= 0) racks[i].len = rackPlatformLength;
				if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt")
				{
					if (parRacks.botFirst.x < racks[i].x && parRacks.botLast.x > racks[i].x)
						racks[i].len = rackPlatformLength;
				}
	
				if(par.topEnd == "площадка" && racks[i].y == parRacks.topLast.y) racks[i].len = rackPlatformLength;
				if (par.topEnd == "площадка" && racks[i].x == parRacks.marshLast.x && racks.length > 2) racks[i].len = par.rackLength;
				}
			if (par.isPlatform) racks[i].len = rackPlatformLength;
			//if (marshPar.botTurn != "пол" && i == 0 && par.key == "in" && prevMarshPar.hasRailing.in) {
			if (racks[i].isTurnRack) {
				racks[i].len += setTurnRacksParams(par.marshId, par.key).rackLenAdd;
				//racks[i].isTurnMonoRack = true;
				if (params.model == "ко") racks[i].isTurnMonoRack = true;
			}
		}
	
		//перенос первой стойки при наличии пригласительных ступеней
		if(par.marshId == 1 && params.startTreadAmt > params.railingStart){
	
			var frontOffset = 200; //отступ стойки от края ступени
			var stepWidth = staircasePartsParams.startTreadsParams[Number(params.railingStart) + 1].stepLeft;
			if(par.railingSide == "right") stepWidth = staircasePartsParams.startTreadsParams[Number(params.railingStart) + 1].stepRight;
			parRacks.marshFirst.x -= stepWidth - par.a;
			}
	
		//Удлинение и перенос последней стойки последнего марша
	
		var dyLastRack = 0;
		if (marshPar.lastMarsh && params.platformTop == "нет") dyLastRack = calcLastRackDeltaY();
		if (params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt") dyLastRack = calcLastRackDeltaY();
		
		if (params.railingModel != "Кованые балясины" && !par.isPlatform && dyLastRack) parRacks.marshLast.len = par.rackLength + dyLastRack;
	
		//удлиннение и перенос последней стойки перед забегом на ко
		if (params.model == "ко" && par.key == "in" && marshPar.topTurn == "забег"){
			parRacks.marshLast.len += calcLastRackDeltaY("wnd_ko", par.marshId);
			}
		
		
		//Рассчитываем угол и длину марша
	
		var topPoint1 = newPoint_xy(parRacks.marshFirst, 0, parRacks.marshFirst.len);
		var topPoint2 = newPoint_xy(parRacks.marshLast, 0, parRacks.marshLast.len);
	
		parRacks.angMarsh = Math.atan(par.h / par.b);
		//if (par.topEnd == "площадка" && par.key == "out")
		//	parRacks.angMarsh = calcAngleX1(parRacks.marshFirst, parRacks.marshLast);
		if (par.stairAmt < 2 && par.key == "out")
			parRacks.angMarsh = calcAngleX1(parRacks.marshFirst, parRacks.marshLast);
	
	
		if (racks.length == 2){
			parRacks.angMarsh = angle(topPoint1, topPoint2);
			}
	
		//заднее ограждение забега
		if (par.isRearPRailing){
			parRacks = {};
			parRacks.marshFirst = racks[0];
			parRacks.marshLast = racks[racks.length - 1];
			parRacks.angMarsh = angle(parRacks.marshFirst, parRacks.marshLast);
			}
	
		if(par.isPlatform) parRacks.angMarsh = 0;
			parRacks.marshLen = distance(topPoint1, topPoint2);
	
	
		//задаем верхний угол стоек
		for(var i=0; i<racks.length; i++){
			if(!racks[i]) continue;
			racks[i].holderAng = parRacks.angMarsh;
			if (params.stairModel == 'Прямая с промежуточной площадкой' && par.marshId != "topPlt") racks[i].holderAng = getMarshParams(3).ang;
			if(racks[i].x < parRacks.marshFirst.x) racks[i].holderAng = parRacks.angBot;
			if(racks[i].x > parRacks.marshLast.x) racks[i].holderAng = parRacks.angTop;
			}
	
		if(par.botEnd == "площадка") parRacks.marshFirst.holderAng = parRacks.angBot;
	
		if(par.botEnd == "забег" && !par.isRearPRailing){
			var mFirst = polar(parRacks.marshFirst, parRacks.marshFirst.holderAng, -40);
			parRacks.botFirst.holderAng = calcAngleX1(parRacks.botFirst, mFirst);
		}
	
		if(par.topEnd == "забег" && !par.isRearPRailing){
			var mLast = polar(parRacks.marshLast, parRacks.marshLast.holderAng, 40);
			parRacks.topLast.holderAng = calcAngleX1(mLast, parRacks.topLast);
		}
	
		if(params.stairModel == "Прямая горка"){
			parRacks.angMarsh2 = -parRacks.angMarsh;
			for(var i=0; i<racks.length; i++){
				//задаем верхний угол и длину стоек второго марша
				if(racks[i].x >= parRacks.marsh2First.x) {
					racks[i].holderAng = -parRacks.angMarsh;
					racks[i].len = par.rackLength;
					}
				}
			}
	
		if(params.stairModel == "Прямая с промежуточной площадкой" && par.marshId != "topPlt"){
	
			parRacks.angMarsh1 = Math.atan(params.h1 / params.b1);
			for(var i=0; i<racks.length; i++){
				if(!racks[i]) continue;
			//задаем верхний угол и длину стоек первого марша
				if(racks[i].x <= parRacks.botFirst.x) {
					racks[i].holderAng = parRacks.angMarsh1;
					racks[i].len = par.rackLength;
					}
				}
				parRacks.marsh1First = copyPoint(racks[0]);
				parRacks.marsh1First.len = par.rackLength;
				parRacks.marsh1First.holderAng = parRacks.angMarsh1;
	
				parRacks.botFirst = copyPoint(parRacks.botFirst)
				parRacks.botFirst.len = rackPlatformLength;
				parRacks.botFirst.holderAng = 0;
	
				//удлинняем первую стойку верхнего марша
				parRacks.marshFirst.len = rackPlatformLength;
	
				parRacks.angBot = 0;
				parRacks.angMarsh = Math.atan(params.h3 / params.b3);
	
			}
	
			//если все стойки находятся на площадке, делаем их одинаковой длины
			if (racks[0].y == racks[racks.length - 1].y) {
					for (var i = 0; i < racks.length; i++) {
							if (!racks[i]) continue;
							racks[i].len = rackPlatformLength;
					}
			}
	
			par.parRacks = parRacks;
	
			return par;
	}


/** функция задает смещение и удлинение поворотной стойки для lt-ko:
 *
	*stringerShiftPoint: { x: 0, y: 0 }: смещение поворотной стойки
	*rackLenAdd: удлинение стойки
	*shiftBotFrame: сдвиг кронштейна крепления к косоуру  вниз чтобы не попадал на крепление рамки
	*shiftYtoP0: сдвиг вниз от начальной точки
	*shiftYforShiftX: сдвиг вниз по Y из-за сдвига по Х
*/

function setTurnRacksParams(marshId, key) {
	var marshPar = getMarshParams(marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);

	var rackProfile = 40;

	var turnParams = calcTurnParams(marshPar.prevMarshId)

	if ((params.stairModel == "П-образная с забегом" && marshId == 3) ||
		(params.stairModel == "П-образная трехмаршевая" && marshId == 3 && params.stairAmt2 == 0 && marshPar.botTurn == "забег")) {
		prevMarshPar.hasRailing.in = true;
	}
	if (params.stairModel == "П-образная с площадкой" && marshId == 3) {
		prevMarshPar.hasRailing.in = false;
	}

	var par = {
		stringerShiftPoint: { x: 0, y: 0 }, // смещение поворотной стойки
		rackLenAdd: 0, // удлинение стойки
		shiftBotFrame: 0, //сдвиг кронштейна крепления к косоуру вниз чтобы не попадал на крепление рамки
		shiftYtoP0: 0, //сдвиг вниз от начальной точки
		shiftYforShiftX: 0,//сдвиг вниз по Y из-за сдвига по Х
	}
	if (marshPar.botTurn != "пол" && key == "in" && prevMarshPar.hasRailing.in) {	

		par.shiftYforShiftX = (marshPar.b * 0.5 - rackProfile / 2) * Math.tan(marshPar.ang);

		if (params.model == "ко") {
			par.shiftBotFrame = 30; 
			if (marshPar.botTurn == "забег") {
				par.shiftYtoP0 = marshPar.h * 2 + prevMarshPar.h + par.shiftBotFrame;
				par.stringerShiftPoint.x = -(turnParams.topMarshOffsetZ + params.nose) + rackProfile / 2;
				par.stringerShiftPoint.y = - par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 + marshPar.h - par.shiftYforShiftX - (turnParams.topMarshOffsetZ + params.nose) * Math.tan(marshPar.ang);
			}
			if (marshPar.botTurn == "площадка") {
				par.shiftYtoP0 = marshPar.h + prevMarshPar.h + par.shiftBotFrame; 
				par.stringerShiftPoint.x = rackProfile / 2;
				par.stringerShiftPoint.y = - par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 - par.shiftYforShiftX;
			}
		}

		if (params.model == "лт") {			
			if (marshPar.botTurn == "забег") {
				par.shiftYtoP0 = marshPar.h * 3 + prevMarshPar.h;
				par.stringerShiftPoint.x = rackProfile / 2;
				par.stringerShiftPoint.y = -par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 - par.shiftYforShiftX;
			}
			if (marshPar.botTurn == "площадка") {
				par.shiftYforShiftX -= (40 + 5) * Math.tan(marshPar.ang);
				par.shiftYtoP0 = marshPar.h + prevMarshPar.h;
				par.stringerShiftPoint.x = rackProfile / 2 + 40;
				par.stringerShiftPoint.y = - par.shiftYtoP0;
				par.rackLenAdd = par.shiftYtoP0 - par.shiftYforShiftX;
			}
		}
	}

	return par;
}



// Функция рисует стойки в зависимости от типа
function drawRackMono(par) {

	par.mesh = new THREE.Object3D();

	getMarshAllParams(par);

	var marshPar = par.marshPar;
	var prevMarshPar = par.prevMarshPar;
	var nextMarshPar = par.nextMarshPar = nextMarshPar;

	var metalMaterial = params.materials.metal;
	if (params.banisterMaterial != "40х40 черн.") metalMaterial = params.materials.inox;

	var rackProfile = 40 - 0.02;
	var bottomHoleOffset = 20;
	var holeDiam = 6;
	var banisterAngleOffset = 16;
	var banisterFlanThk = 8; //толщина фланца L-образной стойки
	var sideLen = 120; //длина уступа L-образной стойки
	//к-т, учитывающий сторону ограждения
	var sideFactor = 1;
	if (par.railingSide === "left") sideFactor = -1;

	//сдвиг первой стойки первого марша, чтобы стойка не пересекала пригласительную ступень

	par.isFirstMove = false;
	if (par.isFirst && params.railingStart != 0) {
		if (params.startTreadAmt == params.railingStart && (params.arcSide == par.railingSide || params.arcSide == "two"))
			par.isFirstMove = true;
	}

	//расчет длины нижней части стойки (ниже уровня ступени)
	var botLen = marshPar.h; //длина от верха ступени до низа стойки
	if (par.type == 'middle') botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
	if (par.type == 'last') botLen = params.treadThickness + rackProfile + banisterFlanThk;
	if (par.type == 'turnRackStart') {
		//Г-образный поворот
		if (params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
			botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset + prevMarshPar.h;
			if (marshPar.botTurn == "забег") botLen += marshPar.h * 2;
			if (params.stairModel == "П-образная трехмаршевая" && par.marshId == 3 && params.stairAmt2 == 0 && params.turnType_1 !== "забег")
				botLen -= prevMarshPar.h;
		}
		//П-образный поворот
		if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
			botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset;
			if (marshPar.botTurn == "забег") {
				if (marshPar.botTurn == "забег") {
					if (params.marshDist > 40)
						botLen += marshPar.h * 3;
					else
						botLen += marshPar.h * 5;
				}
			}
		}
	}
	if (par.type == 'turnRackEnd') {
		//Г-образный поворот
		if (params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {
			botLen += params.treadThickness + bottomHoleOffset + banisterAngleOffset + prevMarshPar.h;
			if (marshPar.botTurn == "забег") botLen += marshPar.h * 3;
		}
		//П-образный поворот
		if (params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом") {
			botLen = params.treadThickness + bottomHoleOffset + banisterAngleOffset + marshPar.h;
		}
	}
	if (par.isFirstFlan) {
		botLen -= params.treadThickness + bottomHoleOffset + banisterAngleOffset;
		if (params.botFloorType == "черновой") botLen += params.botFloorsDist;
	}


	var points = [];
	var p0 = { x: 0, y: 0, }; //точка на оси стойки на уровне верха ступени
	//if (params.model == "ко") p0.y -= 90;

	//верхние точки
	var p1 = newPoint_xy(p0, -rackProfile / 2, par.len);
	var p2 = newPoint_xy(p0, rackProfile / 2, par.len);
	if (params.model == "ко") {
		p1.y = p2.y -= 90;
	}
	points.push(p1, p2)
	var topPoint = copyPoint(p1); //сохраняем точку

	//нижние точки
	if (par.type != 'last') {
		var p3 = newPoint_xy(p0, rackProfile / 2, -botLen);
		var p4 = newPoint_xy(p0, -rackProfile / 2, -botLen);

		if (params.model == "ко") {
			var p3 = newPoint_xy(p0, rackProfile / 2, -90);
			var p4 = newPoint_xy(p0, -rackProfile / 2, -90);
		}
		points.push(p3, p4)
	}
	if (par.type == 'last') {
		var p3 = newPoint_xy(p0, rackProfile / 2, -botLen);
		var p4 = newPoint_xy(p3, -(sideLen + rackProfile), 0);
		var p5 = newPoint_xy(p4, 0, rackProfile);
		var p6 = newPoint_xy(p5, sideLen, 0);
		points.push(p3, p4, p5, p6)
	}

	if (params.banisterMaterial == "40х40 нерж+дуб") {
		var topPartLen = 120;
		var timberPartLen = 600;
		points[0].y -= topPartLen + timberPartLen;
		points[1].y -= topPartLen + timberPartLen;
	}

	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}

	var shape = drawShapeByPoints2(shapePar).shape;

	//отверстия под уголки
	var holeCenters = [];
	if (par.type == 'first' || par.type == 'middle') {
		//верхнее отверстие
		var center1 = newPoint_xy(p0, 0, -params.treadThickness - banisterAngleOffset);
		holeCenters.push(center1)
		if (params.stairModel == "П-образная трехмаршевая" && par.key == "in" && par.marshId == 1 && params.stairAmt2 == 0 && marshPar.topTurn == "площадка") {
			center1.anglePos = 'справа';
		}
		//нижнее отверстие
		if (par.type == 'middle') {
			var center2 = newPoint_xy(center1, 0, -marshPar.h);
			//уголок первой стойки к пригласительной ступени
			if (isFirstMove) center2.anglePos = 'слева';

			holeCenters.push(center2);
		}
		//размер для спецификации
		var sizeA = botLen + center1.y;
		if (par.type == 'middle') sizeA = distance(center1, center2)

	}
	if (par.type == 'turnRackStart' || par.type == 'turnRackEnd') {
		var rackPar = {
			marshId: par.marshId,
			type: par.type,
			isFirstFlan: par.isFirstFlan,
		}
		holeCenters = setTurnRackHoles(rackPar).holes;
	}



	var holesPar = {
		holeArr: [],
		dxfBasePoint: par.dxfBasePoint,
		shape: shape,
		holeRad: holeDiam / 2,
	}
	for (var i = 0; i < holeCenters.length; i++) {
		if (holeCenters[i].y <= points[0].y) {
			holesPar.holeArr.push(holeCenters[i]);
		}
	}

	addHolesToShape(holesPar);

	//отверстие под кронштейн крепления к косоуру
	if (params.model == "ко") {
		var rad = 6.5;
		var holeDist = 60;
		
		var center = copyPoint(p0);
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);

		var center = newPoint_xy(center, 0, -holeDist);
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);
	}

	if (par.type == 'turnRackStart' || par.type == 'turnRackEnd') {
		shape.drawing = {};
		shape.drawing.group = 'turnRack';
		shape.drawing.name = 'Поворотный столб марш: ' + par.marshId;
		shape.drawing.yDelta = botLen;
		shapesList.push(shape);
	}

	var extrudeOptions = {
		amount: rackProfile,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var rack = new THREE.Mesh(geom, metalMaterial);
	if (par.type == 'last') {
		rack.position.z = rackProfile / 2;
		rack.rotation.y = -Math.PI / 2;
		rack.position.x = rackProfile / 2;
		if (par.railingSide == "left") {
			rack.rotation.y = Math.PI / 2;
			rack.position.x = -rackProfile / 2;
		}
	}
	rack.position.z += 0.01 * sideFactor;
	if (params.model == "ко") {
		rack.rotation.y += Math.PI / 2;
		rack.position.z += rackProfile /2;
		rack.position.x -= rackProfile /2;
	}
	par.mesh.add(rack);

	//вставка и верхняя часть комбинированной стойки
	if (params.banisterMaterial == "40х40 нерж+дуб") {

		//вставка

		var pt1 = newPoint_xy(points[0], 0, 0);
		var pt2 = newPoint_xy(pt1, 0, timberPartLen)
		var pt3 = newPoint_xy(pt2, rackProfile, 0)
		var pt4 = newPoint_xy(pt1, rackProfile, 0)

		var points = [pt1, pt2, pt3, pt4];

		//создаем шейп
		var shapePar = {
			points: points,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
		}

		var shape = drawShapeByPoints2(shapePar).shape;

		var holesPar = {
			holeArr: [],
			dxfBasePoint: par.dxfBasePoint,
			shape: shape,
			holeRad: holeDiam / 2,
		}
		for (var i = 0; i < holeCenters.length; i++) {
			if (holeCenters[i].y > points[0].y) {
				holesPar.holeArr.push(holeCenters[i]);
			}
		}

		addHolesToShape(holesPar);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, params.materials.timber);
		par.mesh.add(rack);

		//верх

		var pt1 = newPoint_xy(pt2, 0, 0);
		var pt2 = newPoint_xy(pt1, 0, topPartLen)
		var pt3 = newPoint_xy(pt2, rackProfile, 0)
		var pt4 = newPoint_xy(pt1, rackProfile, 0)

		var points = [pt1, pt2, pt3, pt4];

		//создаем шейп
		var shapePar = {
			points: points,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: par.dxfBasePoint,
		}

		var shape = drawShapeByPoints2(shapePar).shape;

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, metalMaterial);
		par.mesh.add(rack);

	}
	//добавлем уголки

	var angPar = {
		holeCenters: holeCenters,
		railingSide: par.railingSide,
		dxfBasePoint: par.dxfBasePoint,
	}
	var angles = addRackAngles(angPar).mesh;
	par.mesh.add(angles);

	//фланцы
	if (par.type == 'first' || par.isFirstFlan || par.type == 'platformRear') {
		var flanPar = {
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
			marshId: par.marshId,
		}
		var botFlan = drawPlatformRailingFlan(flanPar).mesh;
		botFlan.position.z = rackProfile / 2;
		botFlan.position.y = p3.y;
		par.mesh.add(botFlan);
	}

	if (par.type == 'last') {
		var flanPar = {
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 100, 0),
			marshId: par.marshId,
		}
		var botFlan = drawLastRackFlan(flanPar).mesh;
		botFlan.rotation.y = Math.PI / 2;
		botFlan.position.z = -sideLen / 2 - 5
		if (par.railingSide === "left") {
			botFlan.position.z = sideLen / 2 + rackProfile + 5
		}
		botFlan.position.y = p3.y + rackProfile;
		par.mesh.add(botFlan);
	}

	//кронштейн из пластин для КО
	if (params.model == "ко") {
		var meshHolder = new THREE.Object3D();

		var holderPar = {
			railingSide: par.railingSide,
			dxfBasePoint: par.dxfBasePoint,
			material: par.material
		}
		var holder = drawRackHolder(holderPar).mesh;
		holder.position.y = -70;
		if (par.railingSide == "right") holder.position.z = 40;		
		meshHolder.add(holder);

		//болты
		if (typeof anglesHasBolts != "undefined" && anglesHasBolts && par.showPins) { //anglesHasBolts - глобальная переменная
			var boltPar = {
				diam: boltDiam,
				len: 20,
				headType: "потай",
			}
			boltPar.headType = "шестигр.";

			var bolt = drawBolt(boltPar).mesh;

			if (params.model == "ко") {
				bolt.rotation.x = -Math.PI / 2;
				bolt.position.x = 0;
				bolt.position.y = 0;
				bolt.position.z = 2 + 4;

				if (par.railingSide == "left") {
					bolt.rotation.x = Math.PI / 2;
					bolt.position.z = rackProfile - 2 - 4;
				}
			}
			meshHolder.add(bolt)


			var bolt2 = drawBolt(boltPar).mesh;
			bolt2.rotation.x = bolt.rotation.x;
			bolt2.rotation.x = bolt.rotation.x;
			bolt2.position.y = -holeDist;
			bolt2.position.z = bolt.position.z;
			meshHolder.add(bolt2)

		}

		meshHolder.rotation.y += Math.PI / 2 * turnFactor;
		meshHolder.position.z += rackProfile / 2;
		meshHolder.position.x -= rackProfile / 2 * turnFactor;
		par.mesh.add(meshHolder)
	}

	//кронштейн поручня
	var holderParams = {
		angTop: par.holderAng * turnFactor,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, topPoint.y),
		isForge: false,
	}
	if (params.model == "ко") holderParams.angTop *= turnFactor;
	var holder = drawHandrailHolder(holderParams).mesh;
	holder.position.x = 0;
	holder.position.y = topPoint.y;
	holder.position.z = rackProfile / 2;

	par.mesh.add(holder);	

	//сохраняем данные для спецификации
	var rackLen = topPoint.y - p3.y;

	//стойка в сборе

	var partName = "racks";
	if (par.type == 'turnRackStart' || par.type == 'turnRackEnd') partName = "turnRack";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Стойка ограждения ",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Ограждения",
			}
			if (partName == "turnRack") specObj[partName].name = "Столб поворотный "
			if (params.banisterMaterial == "40х40 нерж+дуб") {
				specObj[partName].division = "timber";
				specObj[partName].metalPaint = false;
				specObj[partName].timberPaint = true;
				specObj[partName].name += "комб. ";
				specObj[partName].group = "timberBal"
			}
			if (params.banisterMaterial == "40х40 нерж.") {
				specObj[partName].metalPaint = false;
				specObj[partName].name += "нерж. ";
			}
			if (params.banisterMaterial == "40х40 черн.") {
				specObj[partName].name += "черн. ";
			}

		}

		var name = "";
		if (par.type == 'first') name += " начальная с фланцем ";
		if (par.type == 'last') name += " L-образная ";
		name += "L=" + Math.round(rackLen);
		if (par.type == 'first' || par.type == 'middle') name += " A=" + Math.round(sizeA);

		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	//окончания комбинированных стоек

	if (params.banisterMaterial == "40х40 нерж+дуб") {
		//верх стойки
		var partName = "combRackTop";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Верх комб. стойки ",
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt", //единица измерения
					group: "Ограждения",
				};
			}

			var name = "L=" + topPartLen;
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}

		//низ стойки
		var partName = "combRackBot";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Низ комб. стойки",
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt", //единица измерения
					group: "Ограждения",
				};
			}
			console.log(rackLen)
			var name = ""
			if (par.type == 'first') name += " начальной с фланцем ";
			if (par.type == 'last') name += " L-образной ";
			name += "L=" + Math.round(rackLen - topPartLen - timberPartLen);
			if (par.type == 'first' || par.type == 'middle') name += " A=" + Math.round(sizeA);


			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}

	}

	return par;
}	

/** функция добавляет уголки стоек по массиву координат отверстий
*@param holeCenters
*@param railingSide


*/

function addRackAngles(par) {

	par.mesh = new THREE.Object3D();
	var rackProfile = 40;
	//к-т, учитывающий сторону ограждения
	var sideFactor = 1;
	if (par.railingSide === "left") sideFactor = -1;

	for (var i = 0; i < par.holeCenters.length; i++) {
		var angleParams = drawBanisterAngle();
		var angle = angleParams.mesh;
		angle.position.y = par.holeCenters[i].y - angleParams.holeOffset;
		angle.position.z = rackProfile;

		if (par.railingSide === "right") {
			angle.position.z = 0;
			angle.rotation.y = Math.PI;
		}

		if (par.holeCenters[i].anglePos == 'справа') {
			angle.rotation.y = Math.PI / 2;
			angle.position.x += rackProfile / 2;
			angle.position.z += rackProfile / 2 * turnFactor;

			addLeader("Справа", 30, 70, 60, dxfPrimitivesArr, par.holeCenters[i], par.dxfBasePoint);
		}

		if (par.holeCenters[i].anglePos == 'слева') {
			angle.rotation.y = -Math.PI / 2

			angle.position.x += -rackProfile / 2;
			angle.position.z += rackProfile / 2 * turnFactor;

			addLeader("Слева", 30, 70, 60, dxfPrimitivesArr, par.holeCenters[i], par.dxfBasePoint);
		}

		if (par.holeCenters[i].anglePos == 'спереди') {
			angle.rotation.y += -Math.PI;
			angle.position.z += rackProfile * turnFactor;
		}
		par.mesh.add(angle);
	}
	return par;

}//end of addRackAngles

/** функция задает расположение и ориентацию отверстий под уголки в поворотных столбах
	*массив хранит следующие данные о каждом отверстии:
	*offset: отступ от нижней части стойки
	*anglePos: на какой грани расположен уголок. Сторона спрва-слева определяется если смотреть на марш сбоку
	*@param marshId
	*@param type - является ли первой стойкой секции
*/

function setTurnRackHoles(par) {
	var holes = [];
	var p0 = { x: 0, y: 0, }; //базовая точка на оси стойки на уровне верхней плоскости ступени
	//параметры марша
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);

	var angleHoleOffset = 16; //отступ отверстия уголка от нижней поверхности ступени

	//костыль для совместимости со старым кодом - удалить
	var rackParams = {}
	rackParams.nextStepH = marshPar.h;
	rackParams.holderAng = prevMarshPar.ang;
	rackParams.nextMarshAng = marshPar.ang;
	rackParams.additionalHolder = prevMarshPar.hasRailing.in;

	if (params.model == "ко") {
		var dy = setTurnRacksParams(par.marshId, "in").shiftYtoP0;
		p0.y += dy + 4;
	}

	//верхний уголок
	var center1 = newPoint_xy(p0, 0, -params.treadThickness - angleHoleOffset);
	var center1 = newPoint_xy(p0, 0, 0);
	if (params.stairModel == "П-образная с площадкой" && par.type == 'turnRackEnd') center1.anglePos = 'справа';

	holes.push(center1);

	if (params.stairModel == "П-образная с забегом" && params.model !== "ко") {
		//поворотный столб в начале секции

		if (par.type == 'turnRackStart') {
			//6 забежная ступень
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'сзади';
			holes.push(center);
			//5 забежная ступень
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);
			//4 забежная ступень
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);
			//3 забежная ступень
			var center = newPoint_xy(center, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);

			if (params.marshDist == 40) {
				//2 забежная ступень
				var center = newPoint_xy(center, 0, -marshPar.h);
				center.anglePos = 'спереди';
				holes.push(center);
				//1 забежная ступень
				var center = newPoint_xy(center, 0, -marshPar.h);
				center.anglePos = 'спереди';
				holes.push(center);
			}
		}

		//поворотный столб в конце секции
		if (par.type == 'turnRackEnd') {
			//последняя прямая ступень марша
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'сзади';
			holes.push(center);
			//вторая забежная ступень
			var center = newPoint_xy(center1, 0, marshPar.h_topWnd);
			center.anglePos = 'сзади';
			holes.push(center);
			//третья забежная ступень
			var center = newPoint_xy(center, 0, marshPar.h_topWnd);
			center.anglePos = 'справа';
			holes.push(center);
		}
	}
	if (params.stairModel == "П-образная с забегом" && params.model == "ко") {
		//5 забежная ступень
		var center = newPoint_xy(center1, 0, -marshPar.h);
		holes.push(center);
	}


	if (params.stairModel == "П-образная с площадкой" && params.model !== "ко") {

		//поворотный столб в начале секции
		if (par.type == 'turnRackStart') {
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'слева';
			holes.push(center);
		}

		//поворотный столб в конце секции
		if (par.type == 'turnRackEnd') {
			var center = newPoint_xy(center1, 0, -marshPar.h);
			holes.push(center);
		}
	}








	//Г-образный поворот

	if (params.stairModel != "П-образная с площадкой" && params.stairModel != "П-образная с забегом") {

		if (marshPar.botTurn == "забег") {
			var center = newPoint_xy(center1, 0, -marshPar.h);
			center.anglePos = 'сзади';
			holes.push(center);

			if (params.model !== "ко") {
				var center = newPoint_xy(center, 0, -marshPar.h);
				center.anglePos = 'слева';
				holes.push(center);


				if (!par.isFirstFlan) {
					var center = newPoint_xy(center, 0, -marshPar.h);
					center.anglePos = 'слева';
					holes.push(center);
				}
			}
		}

		if (marshPar.botTurn == "площадка" && params.model !== "ко") {
			if (!par.isFirstFlan) {
				var center = newPoint_xy(center1, 0, -marshPar.h);
				center.anglePos = 'слева';
				holes.push(center);
			}
		}

		if (!(params.stairModel == "П-образная трехмаршевая" && par.marshId == 3 && params.stairAmt2 == 0 && params.turnType_1 !== "забег")) {
			if (params.model !== "ко") {
				if (!par.isFirstFlan) var center = newPoint_xy(center, 0, -prevMarshPar.h);
				if (par.isFirstFlan) var center = newPoint_xy(center, 0, -marshPar.h);
				center.anglePos = 'слева';
				holes.push(center);
			}
		}
	}	

	/*	
		//для левой лестницы бокоые уголки ставятся на другой стороне
		if(turnFactor == -1){
			for(var i=0; i < holes.length; i++){
				if (holes[i].anglePos == 'справа') holes[i].anglePos = 'слева';
				else if(holes[i].anglePos == 'слева') holes[i].anglePos = 'справа';
				}
			}
	*/
	par.holes = holes;
	return par;

}//end of setTurnRackHoles


function drawRailingSectionNewel2(par) {

	var section = new THREE.Object3D();
	var handrails = new THREE.Object3D();

	var rackLength = 950;
	par.rackLength = rackLength;
	var rackProfile = 40;
	par.rackProfile = rackProfile;
	var railingPositionZ = 0;
	if (turnFactor === -1) railingPositionZ = -40;
	var turnRacksParams = setTurnRacksParams(par.marshId, par.key);//параметры поворотной стойки

	if (params.calcType === 'lt-ko' || params.calcType === 'vhod') {
		//адаптация к единой функции drawMarshRailing

		par.racks = [];
		if (par.stringerParams && par.stringerParams[par.marshId].elmIns[par.key]) par.racks = par.stringerParams[par.marshId].elmIns[par.key].racks
		//объединяем массивы первого и третьего марша
		if ((params.stairModel == "Прямая с промежуточной площадкой" || params.stairModel == 'Прямая горка') && par.marshId !== 'topPlt') {
			par.racks = [];
			// par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
			par.racks.push.apply(par.racks, par.stringerParams[1].elmIns[par.key].racks);
			//пересчитываем координаты стоек второго марша с учетом позиции марша
			for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
				var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
				point.x += par.stringerParams[3].treadsObj.unitsPos.marsh3.x;
				point.y += par.stringerParams[3].treadsObj.unitsPos.marsh3.y;
				par.racks.push(point)
			}
		}
		if (params.stairModel == 'Прямая горка' && par.marshId !== 'topPlt') {
			par.racks = [];
			// par.racks.push(...par.stringerParams[1].elmIns[par.key].racks);
			par.racks.push.apply(par.racks, par.stringerParams[1].elmIns[par.key].racks);
			//пересчитываем координаты стоек второго марша с учетом позиции марша
			for (var i = 0; i < par.stringerParams[3].elmIns[par.key].racks.length; i++) {
				var point = copyPoint(par.stringerParams[3].elmIns[par.key].racks[i]);
				point.x = par.stringerParams[3].treadsObj.unitsPos.marsh3.x - point.x;
				point.y = par.stringerParams[3].treadsObj.unitsPos.marsh3.y + point.y;
				par.racks.push(point)
			}
		}
		//рассчитываем необходимые параметры и добавляем в объект par
		setRailingParams(par) //функция в файле calcRailingParams.js
		if (par.racks.length == 0) return section;

		//задаем параметры
		{
			if (par.key == "front") par.railingSide = "left";
			var railingSide = par.railingSide;
			if (!par.railingSide && params.model == "ко" && par.marshId == 'topPlt')
				railingSide = "right";
			var dxfBasePoint = par.dxfBasePoint;
			var racks = par.racks;
			var model = params.model;

			//параметры марша
			var marshPar = getMarshParams(par.marshId);
			var prevMarshPar = getMarshParams(marshPar.prevMarshId);

			par.a = marshPar.a;
			par.b = marshPar.b;
			par.h = marshPar.h;
			par.stairAmt = marshPar.stairAmt;
			par.lastMarsh = marshPar.lastMarsh;

			//задаем длину стоек
			var rackLength = 950;
			par.rackLength = rackLength;
			var rackProfile = 40;

			var dxfText = {
				side: railingSide === "left" ? " - наружный" : " - внутренний",
				marsh: " нижнего марша "
			}
		}


		/*Стойки*/

		//выделяем из массива racks первые и последние стойки поворотов и марша, рассчтываем длины и углы
		var parRacks = setRacksParams(par).parRacks; //функция в metal/drawRailing.js

		for (var i = 0; i < racks.length; i++) {
			if (!racks[i]) continue;
			var rackParams = {
				len: racks[i].len,
				railingSide: railingSide,
				stringerSideOffset: params.sideOverHang,
				showPins: true,
				showHoles: true,
				isBotFlan: false,
				material: params.materials.metal,
				dxfBasePoint: newPoint_xy(par.dxfBasePoint, racks[i].x, racks[i].y),
				dxfArr: dxfPrimitivesArr,
				realHolder: true, //точно отрисовываем кронштейн поручня
				holderAng: racks[i].holderAng,
				sectText: par.text,
				marshId: par.marshId, 
				key: par.key,
			}
			if (params.rackBottom == "сверху с крышкой") {
				rackParams.showPins = false;
				rackParams.showHoles = false;
				rackParams.isBotFlan = true;
			}
			if (params.banisterMaterial != "40х40 черн.") rackParams.material = params.materials.inox;

			if (!racks[i].noDraw) {
				if (racks[i].isTurnMonoRack) {
					rackParams.type = 'turnRackStart';
					rackParams = drawRackMono(rackParams);
				}
				else {
					if (racks[i].isTurnRack) rackParams.holeYTurnRack = turnRacksParams.shiftYtoP0;
					rackParams = drawRack3d_4(rackParams);
				}
				var rack = rackParams.mesh;
				rack.position.x = racks[i].x;
				rack.position.y = racks[i].y;
				rack.position.z = railingPositionZ;
				section.add(rack);
			}
		} //конец стоек
	}

	if (params.calcType === 'mono') {
		var racks_mesh = drawRacksMono(par);
		section.add(racks_mesh.mesh);
		var parRacks = par.parRacks;
		var racks = par.racks;
	}

	/* ригели */

	if (params.railingModel === "Ригели") {

		//Задаем позицию ригелей по Z
		var rigelPosZ = 0
		var rigelProfZ = 20;
		if (params.rigelMaterial == "Ф12 нерж.") rigelProfZ = 12;
		if (par.railingSide == "left") rigelPosZ = (railingPositionZ + rackProfile) * turnFactor + 0.01;
		if (par.railingSide == "right") rigelPosZ = (railingPositionZ - rigelProfZ - 0.01);
		if (par.marshId == "topPlt") {
			rigelPosZ = -rigelProfZ - 0.01;
			if (turnFactor == -1) rigelPosZ -= rackProfile - 0.01;
		}
		if (par.marshId == "topPlt" && par.key == "front") {
			rigelPosZ = rackProfile * (1 + turnFactor) * 0.5;
		}
		if (par.rigelMoveZ) rigelPosZ += par.rigelMoveZ;

		//шаг ригелей по вертикали
		var rigelAmt = Number(params.rigelAmt);
		//устраняем пересечение нижнего ригеля и нижней забежной ступени на монокосоарах
		var rigelMooveY = 0;
		if (params.calcType === 'mono') {
			if (rigelAmt == 2) rigelMooveY = -40;
			if (rigelAmt == 3) rigelMooveY = 50;
			if (rigelAmt == 4) rigelMooveY = -120;
		};
		if (params.calcType === 'lt-ko' || params.calcType === 'vhod') rigelMooveY = par.b / 2 * Math.tan(parRacks.angMarsh);
		if (isNaN(rigelMooveY)) rigelMooveY = 0;
		var rigelDist = (rackLength - 50 - rigelMooveY) / (rigelAmt + 1);


		//формируем массив базовых точек для ригелей
		if (params.calcType === 'lt-ko' || params.calcType === 'vhod') {
			var rigelBasePoints = [];

			if (parRacks.marsh1First) rigelBasePoints.push(copyPoint(parRacks.marsh1First));
			if (parRacks.botFirst) rigelBasePoints.push(copyPoint(parRacks.botFirst));
			if (parRacks.marshFirst) {
				rigelBasePoints.push(copyPoint(parRacks.marshFirst));
				if (params.model == "лт")
					rigelBasePoints[rigelBasePoints.length - 1].y += turnRacksParams.rackLenAdd - turnRacksParams.shiftYforShiftX;

			}
			
			if (parRacks.marshLast) {
				rigelBasePoints.push(copyPoint(parRacks.marshLast));
				if (params.model == "ко" && par.lastMarsh && params.platformTop == "нет") {
					rigelBasePoints[rigelBasePoints.length - 1].y += calcLastRackDeltaY();
				}
				if (params.model == "ко" && parRacks.marshLast.len != parRacks.marshFirst.len) {
					rigelBasePoints[rigelBasePoints.length - 1].y += parRacks.marshLast.len - parRacks.marshFirst.len;
				}
				//если на следующем марше поворотная стойка сохраняем сдвиг отверстия до края следующего марша
				if (parRacks.marshLast.noDraw && parRacks.marshLast.dxToMarshNext) {
					rigelBasePoints[rigelBasePoints.length - 1].dxToMarshNext = parRacks.marshLast.dxToMarshNext;
				}
			}
			if (parRacks.topLast) rigelBasePoints.push(copyPoint(parRacks.topLast));
			if (parRacks.marsh2Last) rigelBasePoints.push(copyPoint(parRacks.marsh2Last));
		}
		if (params.calcType === 'mono') {
			var rigelBasePoints = calcRigelPoints(par, parRacks);
		}

		var side = "out";
		if (railingSide === "right") side = "in";
		var rigelPar = {
			points: rigelBasePoints,
			botEnd: par.botEnd,
			dxfBasePoint: copyPoint(par.dxfBasePoint),
			sectText: par.text,
			topConnection: par.topConnection,
		}

		if (params.model == "ко") rigelMooveY += turnRacksParams.rackLenAdd;
		
		for (var i = 0; i < rigelAmt; i++) {
			rigelPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, rigelDist * (i + 1) + rigelMooveY);
			var rigel = drawPolylineRigel(rigelPar).mesh;
			rigel.position.y = rigelDist * (i + 1) + rigelMooveY;
			rigel.position.z = rigelPosZ;
			section.add(rigel);
		}

	} //конец ригелей

	/* стекло на стойках */
	if (params.railingModel == "Стекло на стойках" || params.railingModel == "Экраны лазер") {

		var glassDist = rackProfile / 2 + 22;
		var glassHeight = 800;

		glassParams = {
			p1: 0,
			p2: 0,
			angle: parRacks.angMarsh,
			glassDist: glassDist,
			glassHeight: glassHeight,
			glassMaterial: params.materials.glass,
			glassHolderMaterial: params.materials.inox,
			dxfBasePoint: par.dxfBasePoint,
		}
		if (params.railingModel == "Экраны лазер") glassParams.glassMaterial = params.materials.metal;

		//номинальная длина стойки
		var nominalLen = rackLength;
		if (params.calcType === 'mono') nominalLen = 800;
		var pltDeltaY = 0;//Нужна для корректировки положения стоек на площадках

		for (var i = 0; i < racks.length - 1; i++) {
			//выравниваем стекло на площадке
			if (par.topTurn == "площадка" && par.key == "out" && Math.abs(racks[i].y - racks[i + 1].y) < 0.01 && i > 1) {
				// 20 зазор стекла от площадки
				if (racks[i].y - racks[i - 1].y > 0.01) pltDeltaY = -20 + par.rackProfile + params.flanThickness + params.treadThickness + glassDist;
			}
			//выравниваем стекло на площадке
			if (par.botTurn == "площадка" && par.key == "out" && racks[i].y - racks[i + 1].y < 0.01) {
				pltDeltaY = -20 + par.rackProfile + params.flanThickness + params.treadThickness + glassDist;
			}
		
			glassParams.p1 = copyPoint(racks[i]);
			glassParams.p2 = copyPoint(racks[i + 1]);
			//если на следующем марше поворотная стойка сдвигаем стойку до края следующего марша
			if (parRacks.marshLast.noDraw && racks[i + 1].dxToMarshNext) {
				glassParams.p2.x += racks[i + 1].dxToMarshNext - rackProfile / 2;
			}
			glassParams.p1.y += racks[i].len - nominalLen + 80 - pltDeltaY;
			glassParams.p2.y += racks[i + 1].len - nominalLen + 80 - pltDeltaY;
			if (Math.abs(racks[i].y - racks[i + 1].y) < 0.01) glassParams.p1.y = glassParams.p2.y;
			if (par.botTurn == "площадка" && par.key == "out" && i == 0) glassParams.p2.y = glassParams.p1.y;

			glassParams.glassHeight = rackLength - 170;
			//уменьшаем высоту стекла чтобы оно не касалось ступеней
			if (params.rackBottom == "сверху с крышкой" && (glassParams.p1.y !== glassParams.p2.y)) {
				var dy = par.h - (par.b / 2 - (par.a - par.b) - glassDist) * Math.tan(parRacks.angMarsh);
				glassParams.glassHeight = rackLength - dy - 100;
				glassParams.p1.y += dy - 70;
				glassParams.p2.y += dy - 70;
			}

			if (params.calcType === 'mono') {
				glassParams.glassHeight = 700;
			}

			var glassParams = drawGlassNewell(glassParams);
			var glass = glassParams.mesh;

			glass.position.z = railingPositionZ + 16;
			glass.castShadow = true;
			section.add(glass);

			//сохраняем данные для спецификации
			staircasePartsParams.glassAmt += 1;
		}
	} //конец стекол на стойках

	/* Поручни */

	if (params.handrail != "нет") {
		if (params.stairModel == "Прямая с промежуточной площадкой") par.topConnection = false;

		var handrailPoints = calcHandrailPoints(par, parRacks);

		

		var side = "out";
		if (railingSide === "right") side = "in";

		handrailParams = {
			points: handrailPoints,
			side: side,
			offset: 0,
			extraLengthStart: 0,
			extraLengthEnd: 0,
			connection: params.handrailConnectionType,
			dxfBasePoint: par.dxfBasePoint,
			fixType: "нет",
			topConnection: par.topConnection,
			sectText: par.text,
			marshId: par.marshId,
			key: par.key,
			topPoint: parRacks.marshLast,
		}

		//удлиннение поручня последнего марша
		if (params.stairModel == "Прямая" || par.marshId == 3) {
			handrailParams.extraLengthEnd += params.topHandrailExtraLength;
		}

		handrailParams = drawPolylineHandrail(handrailParams);

		var handrail = handrailParams.mesh;
		var posZ = -handrailParams.wallOffset + rackProfile / 2 * turnFactor;
		if (side == "in") posZ = handrailParams.wallOffset + rackProfile / 2 * turnFactor;

		handrail.position.z = posZ;
		handrails.add(handrail);
	} //конец поручней


	//сохраняем данные для спецификации
	var handrailPoints = calcHandrailPoints(par, parRacks);
	if (typeof railingParams != 'undefined') {
		if (!railingParams.sections) {
			railingParams.sections = {
				types: [],
				sumLen: 0,
			}
		}		

		for (var i = 1; i < handrailPoints.length; i++) {
			var sectLen = distance(handrailPoints[i - 1], handrailPoints[i]);
			railingParams.sections.types.push(sectLen);
			railingParams.sections.sumLen += sectLen / 1000;
		}
	}



	if (params.model == 'лт') {
		section.position.x = -5;
	}

	var result = {
		mesh: section,
		handrails: handrails,
	}
	return result;

} //end of drawRailingSectionNewel

function drawPolylineRigel(par) {

	var dxfBasePoint = par.dxfBasePoint;
	var side = par.side;

	par.mesh = new THREE.Object3D();

	if (!par.points) return par;

	var points = par.points;
	var offset = par.offset;

	//зазор между торцами ригелей при соединении шарниром
	var endOffset = 0;
	if (par.connection != "без зазора") endOffset = 7;

	//задаем параметры ригелей
	rigelParams = {
		type: "rect",
		poleProfileY: 20,
		poleProfileZ: 20,
		length: 0, //пересчитывается в цикле
		poleAngle: 0, //пересчитывается в цикле
		material: params.materials.metal,
		dxfArr: dxfPrimitivesArr,
		partName: "rigels",
		dxfBasePoint: par.dxfBasePoint,
		angDxf: true,
		sectText: par.sectText,
	};

	if (params.rigelMaterial === "Ф12 нерж.") {
		rigelParams.type = "round";
		rigelParams.poleProfileY = 12;
		rigelParams.poleProfileZ = 12;
		rigelParams.material = params.materials.inox;
	}
	if (params.rigelMaterial === "Ф16 нерж.") {
		rigelParams.type = "round";
		rigelParams.poleProfileY = 16;
		rigelParams.poleProfileZ = 16;
		rigelParams.material = params.materials.inox;
	}

	//выпуск ригеля за ось стойки по X
	var extraLenEnd = 50;
	var extraLenMid = 20;
	if (rigelParams.type == "round") extraLenMid = 70; //отступ чтобы шарнир не попал на стойку
	if (testingMode) extraLenEnd = 20;

	//сортируем массив points в порядке возрастания координаты x
	par.points.sort(function (a, b) {
		return a.x - b.x;
	});

	var lastPoint = copyPoint(par.points[0])
	for (var i = 0; i < par.points.length - 1; i++) {
		var p1 = copyPoint(lastPoint);
		var p2 = copyPoint(par.points[i + 1]);
		var ang = angle(p1, p2);
		if (p1.ang) ang = p1.ang;

		if (rigelParams.type != "round") {
			//продлеваем ригель в обе стороны
			if (i == 0) p1 = polar(p1, ang, -extraLenEnd);
			else p1 = polar(p1, ang, -extraLenMid);
			if (i < par.points.length - 2) p2 = polar(p2, ang, extraLenMid);
			else p2 = polar(p2, ang, extraLenEnd);

			//пересчитываем базовые точки для нечетных участков чтобы избежать пересечения
			if (i % 2 == 1) {
				var deltaY = par.points[i].y - p1.y + rigelParams.poleProfileY / Math.cos(ang);
				deltaY += rigelParams.poleProfileY / Math.cos(angle(par.points[i - 1], par.points[i]));
				p1.y += deltaY;
				p2.y += deltaY;

			}
			lastPoint = copyPoint(par.points[i + 1])
		}
		if (rigelParams.type == "round") {

			if (i == 0) p1 = polar(p1, ang, -extraLenEnd);
			//переносим конечную точку так, чтобы шарнир не попал на стойку
			if (i < par.points.length - 2) {
				p2 = polar(p2, ang, -extraLenMid);
				p2.y = par.points[i + 1].y; //если следующий участок горизонтальный, он должен таким и остаться
			}
			else p2 = polar(p2, ang, extraLenEnd);

			lastPoint = copyPoint(p2);

			var radJoint = 6 + 0.2;
			var angBot = angle(p1, p2);
			var pcJoint = polar(p2, angBot + Math.PI / 2, rigelParams.poleProfileY / 2);
			pcJoint = polar(pcJoint, angBot, -radJoint);

			if (par.points[i + 2]) {
				var p3 = copyPoint(par.points[i + 2]);
				var angTop = angle(p2, p3);
				var pt1 = polar(pcJoint, angTop, radJoint);
				var pt2 = itercection(p2, polar(p2, angTop + Math.PI / 2, 100), pcJoint, polar(pcJoint, angTop, 100));
				var lengthOff = distance(pt1, pt2);
				if (pt2.x > pt1.x) lengthOff *= -1;

				lastPoint = polar(p2, angTop, lengthOff);
			}
		}

		

		rigelParams.length = distance(p1, p2) - 10; //10 - размер шарнира
		if (rigelParams.type == "round") rigelParams.length = distance(p1, p2) - radJoint * 2;
		rigelParams.poleAngle = angle(p1, p2);
		rigelParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, p1.x, p1.y);

		//если на следующем марше поворотная стойка, удлиняем ригели до неё
		if (par.points[i + 1].dxToMarshNext) {
			p2 = newPoint_xy(par.points[i + 1], par.points[i + 1].dxToMarshNext, 0);
			rigelParams.length = (p2.x - p1.x) / Math.cos(rigelParams.poleAngle);
		}

		var rigel = drawPole3D_4(rigelParams).mesh;
		rigel.position.x = p1.x;
		rigel.position.y = p1.y;
		par.mesh.add(rigel);

		//шарниры ригелей
		if (rigelParams.type == "round") {
			//if (par.points[i + 2] || (par.topConnection && i == points.length - 2)) {
			if (par.points[i + 2]) {
				var jointParams = {
					rad: 6,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, pcJoint.x, pcJoint.y),
					type: "rigelJoint",
				}

				var sphere = drawHandrailJoint(jointParams);
				sphere.position.x = pcJoint.x;
				sphere.position.y = pcJoint.y;
				sphere.position.z = jointParams.rad;
				par.mesh.add(sphere);
			}
		}


	}

	// par.meterHandrailPar = meterHandrailPar;

	return par;
} //end of drawPolylineRigel

function drawPolylineHandrail(par) {

	var marshPar = getMarshParams(par.marshId);

	var dxfBasePoint = par.dxfBasePoint;
	var side = par.side;

	//адаптация
	if (side == "left") side = "out";
	if (side == "right") side = "in";

	par.mesh = new THREE.Object3D();

	if (!par.points) return par;

	var points = par.points;
	var offset = par.offset;

	//сортируем массив points в порядке возрастания координаты x
	par.points.sort(function (a, b) {
		return a.x - b.x;
	});

	//удаляем ошибочные точки чтобы поручень отрисовывался в любом случае
	$.each(par.points, function (i) {
		if (!isFinite(this.x) || !isFinite(this.y)) {
			par.points.splice(i, 1);
		}
	})
	//костыль чтобы поручень отрисовывался если не осталось точек
	if (points.length < 2) {
		points = [];
		var p1 = { x: -params.M / 2, y: 0 }
		var p2 = { x: params.M / 2, y: 0 }
		points.push(p1, p2)
	}

	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.timberPaint_perila,
	}
	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

	//для круглого поручня базовые точки находятся на оси поручня
	if (meterHandrailPar.handrailModel == "round") offset -= meterHandrailPar.profY / 2;

	//пересчет базовых точек чтобы сместить поручень на величину offset

	var points1 = []; //массив точек с отступом
	var points2 = []; //массив центров шарниров
	for (var i = 0; i < points.length; i++) {
		//первая точка
		if (i == 0) {
			//если первый участок вертикальный
			if (points[i].x == points[i + 1].x) {
				var point = newPoint_xy(points[i], offset, 0)
			}
			//если первый участок наклонный
			if (points[i].x != points[i + 1].x) {
				var handrailAngle = angle(points[i], points[i + 1])
				var point = newPoint_xy(points[i], 0, -offset / Math.cos(handrailAngle))
				//удлиннение поручня за начальную точку
				point = polar(point, handrailAngle, -par.extraLengthStart)
			}
			points1.push(point);
		}

		//промежуточные точки
		if (i > 0 && i < points.length - 1) {
			var line1 = parallel(points[i - 1], points[i], -offset);
			var line2 = parallel(points[i], points[i + 1], -offset);
			var point = itercection(line1.p1, line1.p2, line2.p1, line2.p2)
			points1.push(point);
		}

		//последняя точка
		if (i == points.length - 1) {

			//если последний участок вертикальный
			if (points[i - 1].x == points[i].x) {
				//var point = newPoint_xy(points[i], -offset, 0)
				var point = newPoint_xy(points[i], offset, 0);
			}
			//если последний участок наклонный
			if (points[i - 1].x != points[i].x) {
				var handrailAngle = angle(points[i - 1], points[i])
				//var point = newPoint_xy(points[i], 0, -offset / Math.cos(handrailAngle))
				//var point = newPoint_xy(points[i], 0, -offset * Math.tan(handrailAngle))
				var line1 = parallel(points[i - 1], points[i], -offset);
				var point = itercection(line1.p1, line1.p2, points[i], polar(points[i], Math.PI / 2, 100))
				//var point = itercection(points[i - 1], polar(points[i - 1], handrailAngle, 100), points[i], polar(points[i], Math.PI / 2, 100))

				if (params.handrailEndHor == "нет" || !marshPar.lastMarsh) {
					//удлиннение поручня за конечную точку
					point = polar(point, handrailAngle, par.extraLengthEnd)
					point = polar(point, handrailAngle, -10 / Math.cos(handrailAngle))
					//if (params.handrailEndType == "под углом") point = polar(point, handrailAngle, meterHandrailPar.profY)
					if (params.calcType == "mono") point = polar(point, handrailAngle, -0.1)
				}

				if (params.handrailEndHor == "да" && marshPar.lastMarsh) {
					point = newPoint_y(point, params.handrailEndHeight, handrailAngle);
					points1.push(point);
					var point = newPoint_xy(point, params.handrailEndLen, 0)
				}

			}
			points1.push(point);
		}
	}

	points = points1;

	//расчет длин и углов всех участков поручня

	var startOffset = 0; //смещение начала текущего куска поручня от базовой точки
	var startAngle = Math.PI / 2; //угол начала текущего куска поручня

	for (var i = 0; i < points.length - 1; i++) {
		if (points[i] && points[i + 1]) {
			//расчет угла поручня
			var p1 = copyPoint(points[i]); //первая точка текущего куска
			var p2 = copyPoint(points[i + 1]); //вторая точка текущего куска
			var p3 = copyPoint(points[i + 2]); //вторая точка следующего куска

			var handrailAngle = Math.atan((p2.y - p1.y) / (p2.x - p1.x));

			//расчет начального угла поручня для первого куска
			if (i == 0 && params.handrailEndType == "под углом" && p2.x != p1.x) {
				startAngle = Math.PI / 2 - handrailAngle;
			}
			//для остальных кусков стартовый угол рассчитан на предыдущей итерации цикла


			//расчет конечного угла и длины куска (кроме последнего)
			if (p3) var handrailAngle2 = Math.atan((p3.y - p2.y) / (p3.x - p2.x));

			if (par.connection == "без зазора" && p3) {
				var endAngle = Math.PI / 2 - (handrailAngle - handrailAngle2) / 2;
				//вертикальный участок
				if (p2.x - p1.x == 0) {
					var length = distance(p1, p2) + meterHandrailPar.profY * Math.tan(Math.PI / 2 - endAngle);
				}
				//горизонтальный или наклонный участок
				if (p2.x - p1.x != 0) {
					var length = distance(p1, p2) + meterHandrailPar.profY * Math.tan(Math.PI / 2 - endAngle) - meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle);
				}
			}

			//прямые торцы
			if (par.connection != "без зазора") {
				endAngle = Math.PI / 2;
				var length = distance(p1, p2) - meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle);
			}

			//последний кусок
			if (i == points.length - 2) {
				endAngle = Math.PI / 2;
				if (params.handrailEndType == "под углом" && p2.x != p1.x) {
					endAngle = Math.PI / 2 - handrailAngle;
				}
				var length = distance(p1, p2);
				//if (par.connection == "без зазора") length += meterHandrailPar.profY * Math.tan((Math.PI / 2 - handrailAngle)/2)
				if (params.startVertHandrail == "есть" && params.handrailFixType == "паз") {
					length -= meterHandrailPar.profY * Math.tan(Math.PI / 2 - startAngle)
				}
			}


			if (meterHandrailPar.handrailModel == "round") {
				length = distance(p1, p2);
				//укорачиваем поручень чтобы он не врезался в стойку верхнего марша
				var key = par.key;
				if (params.stairModel == "Прямая" || params.stairModel == "Прямая с промежуточной площадкой") {
					if (par.key == "in") key = "out";
					if (par.key == "out") key = "in";
				}

				//if (!marshPar.lastMarsh && key == "in") length -= meterHandrailPar.profY * Math.tan(handrailAngle)
			}



			//расчет позиции шарниров
			if (i < points.length - 2 && par.connection == "шарнир") {
				var axis1 = parallel(p1, p2, meterHandrailPar.profY / 2);
				var axis2 = parallel(p2, p3, meterHandrailPar.profY / 2);
				var spherePos = itercection(axis1.p1, axis1.p2, axis2.p1, axis2.p2)
			}

			//корректировка длины и позиции в зависимости от типа стыковки кусков
			var basePoint = copyPoint(p1);

			if (par.connection == "без зазора") endOffset = 0;

			if (par.connection == "шарнир") {
				endOffset = 26;
				//если есть шарнир
				if (i <= points.length - 2) {
					length -= endOffset * 2;
					basePoint = polar(basePoint, handrailAngle, endOffset)
				}
			}
			if (par.connection == "прямые") {
				length -= startOffset; //вычитаем отступ, рассчитанный на предыдущей итерации
				basePoint = polar(basePoint, handrailAngle, startOffset)
				endOffset = 0;
				if (p3 && handrailAngle < handrailAngle2) endOffset = meterHandrailPar.profY * Math.tan((handrailAngle2 - handrailAngle) / 2);
				//круглый поручень базируется по оси, поэтому нужны зазоры и при загибе вниз
				if (meterHandrailPar.handrailModel == "round" && p3 && handrailAngle > handrailAngle2)
					endOffset = meterHandrailPar.profY * Math.tan((handrailAngle - handrailAngle2) / 2);
				length -= endOffset;
			}



			//построение поручня
			var handrailParams = {
				model: params.handrail,
				length: length - 0.01, // костыль чтобы не было пересечений
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: par.dxfBasePoint,
				startAngle: startAngle,
				endAngle: endAngle,
				fixType: par.fixType,
				side: side,
				poleAngle: handrailAngle,
				sectText: par.sectText,
			}
			if (params.railingModel == "Самонесущее стекло") handrailParams.isGlassHandrail = true;

			handrailParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)			

			handrailParams = drawHandrail_4(handrailParams);
			var handrail = handrailParams.mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;

			par.wallOffset = handrailParams.wallOffset;
			par.mesh.add(handrail);


			//шарнир
			if (i < points.length - 2 && par.connection == "шарнир") {

				var jointParams = {
					rad: 25,
					dxfBasePoint: newPoint_xy(par.dxfBasePoint, p2.x, p2.y)
				}
				var posZ = jointParams.rad * 2;
				if (side == "in") posZ = -jointParams.rad * 2;

				var sphere = drawHandrailJoint(jointParams);
				sphere.position.x = p2.x;
				sphere.position.y = p2.y;
				sphere.position.z = posZ;
				par.mesh.add(sphere);

				//Шарнир на конце если есть соединение со следующим участком
				if (par.topConnection && i == points.length - 3) {
					jointParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, p3.x, p3.y)
					var sphere = drawHandrailJoint(jointParams);
					sphere.position.x = p3.x;
					sphere.position.y = p3.y;
					sphere.position.z = posZ;
					par.mesh.add(sphere);

				}
			}


			//добавляем кронштейн поручня к поворотному столбу
			if (par.topPoint) {
				//если нет последней стойки
				if (par.topPoint.noDraw) {
					var holderPar = {
						topPoint: polar(basePoint, handrailAngle, handrailParams.length),//точка верхнего края поручня
						holderAng: par.topPoint.holderAng,
						dxfBasePoint: handrailParams.dxfBasePoint,
					}
					holderPar.dxfBasePoint = newPoint_xy(handrailParams.dxfBasePoint, -basePoint.x, -basePoint.y);

					var holder = drawHandrailHolderTurnRack(holderPar).mesh;
					holder.position.z += -30 * turnFactor;
					par.mesh.add(holder);
				}
			}

			//сохраняем начальный параметры для следующего участка
			startAngle = -endAngle;
			startOffset = endOffset;
		}
	}

	par.meterHandrailPar = meterHandrailPar;

	return par;
} //end of drawPolylineHandrail

function drawHandrailHolderTurnRack(par) {
	//кронштейн поручня к поворотному столбу


	var topPoint = par.topPoint;//точка верхнего края поручня
	var handrailAng = Math.abs(par.holderAng);
	rackProfile = 40;

	var holderParams = {
		angTop: (Math.PI / 2 - handrailAng) * turnFactor,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, topPoint.x, topPoint.y),
		isForge: false,
		isHor: true,
	}
	var dy = (19 / Math.sin(handrailAng) + 53) * Math.tan(handrailAng);//расстояние сдвига кронштейна вниз от верхнего края поручня
	holderParams.dxfBasePoint.y -= dy;

	var holder = drawHandrailHolder(holderParams).mesh;

	holder.position.y = topPoint.y - 0.5;
	holder.position.y -= dy;
	holder.position.x = topPoint.x;
	holder.position.z = -rackProfile / 2 * turnFactor;
	holder.rotation.z = -Math.PI / 2 * turnFactor;
	if (turnFactor == 1) holder.rotation.y = Math.PI;

	par.mesh = holder;

	return par;
}


function getMarshAllParams(par) {
	if (par.marshId) {
		if(!par.marshPar) par.marshPar = getMarshParams(par.marshId);
		if(!par.prevMarshPar) par.prevMarshPar = getMarshParams(par.marshPar.prevMarshId);
		if(!par.nextMarshPar) par.nextMarshPar = getMarshParams(par.marshPar.nextMarshId);
		if (!par.turnBotParams) par.turnBotParams = calcTurnParams(par.marshPar.prevMarshId);
		if (!par.turnParams) par.turnParams = calcTurnParams(par.marshId);
	}
}



function drawRack3d_4(par) {
	/*
	par.len
	par.material
	par.railingSide //в какую сторону штырьки
	par.showPins //показывать ли штырьки бокового крепления
	par.isBotFlan // есть ли нижний фланец
	par.stringerSideOffset
	dxfArr
	dxfBasePoint
	showHoles
	realHolder: false;
	базовая точка - ось верхнего отверстия
	*/

	if (!par.layer) par.layer = "railing";
	if (!par.material) par.material = params.materials.metal;

	var len = par.len;
	var profSize = 40;
	par.holderLength = 70;
	par.mesh = new THREE.Object3D();

	var topLen = 120;

	var timberPartLen = 600;
	var botLen = len - topLen - timberPartLen;
	if (params.banisterMaterial != "40х40 нерж+дуб") botLen = len;

	//тело стойки
	var p0 = { x: 0, y: 0 }
	var p1 = newPoint_xy(p0, -profSize / 2, -90);
	var p2 = newPoint_xy(p1, 0, botLen)
	var p3 = newPoint_xy(p2, profSize, 0)
	var p4 = newPoint_xy(p1, profSize, 0)

	var shape = new THREE.Shape();

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

	//отверстия
	if (par.showHoles) {
		var rad = 6.5;
		var holeDist = 60;
		//верхнее отверстие
		var center = { x: 0, y: 0 }
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);
		var center = { x: 0, y: -holeDist }
		addRoundHole(shape, par.dxfArr, center, rad, par.dxfBasePoint);

		//на поворотной стойке для лт добавляем дополнительное отверстие крепления
		if (par.holeYTurnRack) {
			var center = { x: 0, y: par.holeYTurnRack - holeDist}
			addRoundHole(shape, par.dxfArr, center, 3, par.dxfBasePoint);
		}
	}

	var extrudeOptions = {
		amount: profSize,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var rack = new THREE.Mesh(geom, par.material);

	//если поворотная стойка, тогда ее надо повернуть
	if (par.holeYTurnRack) {
		rack.rotation.y += Math.PI / 2 * turnFactor;
		rack.position.z += rackProfile / 2;
		rack.position.x -= rackProfile / 2 * turnFactor;
	}
	par.mesh.add(rack);

	//части комбинированной балясины
	if (params.banisterMaterial == "40х40 нерж+дуб") {

		//вставка

		var p1 = newPoint_xy(p0, -profSize / 2, -90 + botLen);
		var p2 = newPoint_xy(p1, 0, timberPartLen)
		var p3 = newPoint_xy(p2, profSize, 0)
		var p4 = newPoint_xy(p1, profSize, 0)

		var shape = new THREE.Shape();

		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, params.materials.timber);
		par.mesh.add(rack);

		//верх

		var p1 = newPoint_xy(p0, -profSize / 2, -90 + botLen + timberPartLen);
		var p2 = newPoint_xy(p1, 0, topLen)
		var p3 = newPoint_xy(p2, profSize, 0)
		var p4 = newPoint_xy(p1, profSize, 0)

		var shape = new THREE.Shape();

		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var rack = new THREE.Mesh(geom, par.material);
		par.mesh.add(rack);

	}


	//кронштейн поручня

	//приблизительная отрисовка кронштейна
	if (!par.realHolder) {
		var holderRad = 6;
		var segmentsX = 20;
		var segmentsY = 0;
		var openEnded = false;


		var geom = new THREE.CylinderGeometry(holderRad, holderRad, par.holderLength, segmentsX, segmentsY, openEnded);
		var handrailHolder = new THREE.Mesh(geom, params.materials.inox);
		handrailHolder.position.y = (len + par.holderLength / 2) - 90;
		handrailHolder.position.z = profSize / 2;

		par.mesh.add(handrailHolder);
	}
	//точная отрисовка кронштейна
	if (par.realHolder) {
		var holderParams = {
			angTop: par.holderAng,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, 0, len - 90),
			isForge: false,
		}
		var holder = drawHandrailHolder(holderParams).mesh;
		holder.position.x = 0;
		holder.position.y = len - 90;
		holder.position.z = 20;

		par.mesh.add(holder)
	}

	//болты

	if (typeof anglesHasBolts != "undefined" && anglesHasBolts && par.showPins) { //anglesHasBolts - глобальная переменная
		var bolts = new THREE.Object3D();
		var boltPar = {
			diam: boltDiam,
			len: 20,
			headType: "потай",
		}
		if (params.model == "ко") boltPar.headType = "шестигр.";

		var bolt = drawBolt(boltPar).mesh;
		if (params.model == "лт") {
			bolt.rotation.x = Math.PI / 2;
			bolt.position.x = 0;
			bolt.position.y = 0;
			bolt.position.z = 2

			if (par.railingSide == "left") {
				bolt.rotation.x = -Math.PI / 2;
				bolt.position.z = profSize - 2
			}
		}

		if (params.model == "ко") {
			bolt.rotation.x = -Math.PI / 2;
			bolt.position.x = 0;
			bolt.position.y = 0;
			bolt.position.z = 2 + 4//boltLen / 2 + boltBulge - 4;

			if (par.railingSide == "left") {
				bolt.rotation.x = Math.PI / 2;
				bolt.position.z = profSize - 2 - 4// - boltLen / 2 - boltBulge + 4;
			}
		}
		bolts.add(bolt)


		var bolt2 = drawBolt(boltPar).mesh;
		bolt2.rotation.x = bolt.rotation.x;
		bolt2.position.x = 0;
		bolt2.position.y = -holeDist;
		bolt2.position.z = bolt.position.z;
		bolts.add(bolt2)

		//на поворотной стойке для лт добавляем дополнительный болт крепления и поворачиваем болты
		if (par.holeYTurnRack) {
			boltPar.diam = 6;

			var bolt2 = drawBolt(boltPar).mesh;
			bolt2.rotation.x = bolt.rotation.x;
			bolt2.position.x = 0;
			bolt2.position.y = par.holeYTurnRack - holeDist;
			bolt2.position.z = bolt.position.z;
			bolts.add(bolt2)

			bolts.rotation.y += Math.PI / 2 * turnFactor;
			bolts.position.z += rackProfile / 2;
			bolts.position.x -= rackProfile / 2 * turnFactor;
		}

		par.mesh.add(bolts)
	}

	//кронштейн из пластин для КО
	if (params.model == "ко" && params.rackBottom == "боковое" && !par.isBotFlan) {
		var holderPar = {
			railingSide: par.railingSide,
			dxfBasePoint: par.dxfBasePoint,
			material: par.material
		}
		var holder = drawRackHolder(holderPar).mesh;
		holder.position.y = -70;
		if (par.railingSide == "right") holder.position.z = 40;
		par.mesh.add(holder);

	}

	//нижний фланец
	if (par.isBotFlan) {
		var flanParams = {
			material: par.material,
			dxfArr: [], //мусорный массив
			dxfBasePoint: { x: 1000, y: -1000, },
			size: 76,
			holeDst: 55,
		}
		flanParams = drawPlatformRailingFlan(flanParams)
		var botFlan = flanParams.mesh;
		botFlan.position.z = 20;
		botFlan.position.y = -90;
		par.mesh.add(botFlan);
	}

	//сохраняем данные для спецификации
	var banisterMaterial = params.banisterMaterial;
	if (specObj.unit == "banister") banisterMaterial = params.banisterMaterial_bal;

	var partName = "racks";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Стойка бок. L =",
				metalPaint: false,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt",
				group: "Ограждения",
			}
			if (par.isBotFlan) specObj[partName].name = "Стойка фланц. L =";
			if (banisterMaterial == "40х40 черн.") specObj[partName].metalPaint = true;
			if (banisterMaterial == "40х40 нерж+дуб") {
				specObj[partName].timberPaint = true;
				specObj[partName].division = "timber";
				specObj[partName].group = "timberBal";
			}
		}
		var name = par.len;
		if (banisterMaterial == "40х40 черн.") name += " черн.";
		if (banisterMaterial == "40х40 нерж.") name += " нерж.";
		if (banisterMaterial == "40х40 нерж+дуб") name += " комб.";
		if (par.holderAng == 0) name += " штырь прямой"
		else name += " штырь с шарниром"
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;

	}

	//окончания комбинированных стоек

	if (params.banisterMaterial == "40х40 нерж+дуб") {
		//верх стойки
		var partName = "combRackTop";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Верх комб. стойки ",
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt", //единица измерения
					group: "Ограждения",
				};
			}

			var name = "L=" + topLen;
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}

		//низ стойки
		var partName = "combRackBot";
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					name: "Низ комб. стойки",
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "amt", //единица измерения
					group: "Ограждения",
				};
			}

			var name = ""
			if (par.isBotFlan) name = "фланц. "
			name += "L=" + Math.round(par.len - topLen - timberPartLen);

			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
			specObj[partName]["amt"] += 1;
		}

	}

	//сохраняем данные для ведомости заготовок

	if (typeof poleList != 'undefined') {
		var poleType = profSize + "х" + profSize;
		if (params.banisterMaterial == "40х40 черн.") poleType += " черн.";
		if (params.banisterMaterial == "40х40 нерж.") poleType += " нерж.";
		if (params.banisterMaterial == "40х40 нерж+дуб") poleType += " нерж.";

		//формируем массив, если такого еще не было
		if (!poleList[poleType]) poleList[poleType] = [];
		var polePar = {
			len1: botLen,
			len2: botLen,
			len3: botLen,
			angStart: 0,
			angEnd: 0,
			cutOffsetStart: 0,
			cutOffsetEnd: 0,
			poleProfileY: profSize,
			poleProfileZ: profSize,
		}

		polePar.text = par.sectText + " стойки";
		if (params.banisterMaterial == "40х40 нерж+дуб") polePar.text += "(низ)"
		polePar.description = [];
		polePar.description.push(polePar.text);
		polePar.amt = 1;

		poleList[poleType].push(polePar);

		//верх комбинированной стойки
		if (params.banisterMaterial == "40х40 нерж+дуб") {
			var polePar = {
				len1: topLen,
				len2: topLen,
				len3: topLen,
				angStart: 0,
				angEnd: 0,
				cutOffsetStart: 0,
				cutOffsetEnd: 0,
				poleProfileY: profSize,
				poleProfileZ: profSize,
			}

			polePar.text = par.sectText + " стойки(верх)";
			polePar.description = [];
			polePar.description.push(polePar.text);
			polePar.amt = 1;

			poleList[poleType].push(polePar);
		}

	}

	return par;
}//end of drawRack3d_4