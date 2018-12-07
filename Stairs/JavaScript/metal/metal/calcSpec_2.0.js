/*соответствие обозначения узлов в спецификации и имени функции:
frames_platform_180_ItemsAdd - промежуточная площадка

*/


function createPartsList(){
	
	//console.log(staircasePartsParams)
	//console.log(partsAmt)
	//console.log(partsAmt_bal)
	//console.log(poleList)

	/*функция создает справочник деталей*/
	var list = {};
	//функция добавления применения элемента
	list.addItem = function(itemParams){
		var item = {
			amt: itemParams.amt, //кол-во в данном применении
			discription: itemParams.discription, //описание применения
			unit: itemParams.unit, //узел лестницы
			group: itemParams.itemGroup, //группа деталей лестницы
			};
		//добавляем информацию о размерах, если она есть
		if(itemParams.size) item.size = itemParams.size;
		
		this[itemParams.id].items.push(item);
	};
	
	//общие позиции для всех лестницы
	addGeneralItems(list); //функция в файле /calculator/general/calcSpec.js
	
	list.fixSpacer1 = {
		name: "Проставка " + params.fixSpacer1 + " L=" + params.fixSpacerLength1 + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
		
	list.fixSpacer2 = {
		name: "Проставка " + params.fixSpacer2 + " L=" + params.fixSpacerLength2 + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
	
 	list.fixSpacer3 = {
		name: "Проставка " + params.fixSpacer3 + " L=" + (params.fixSpacerLength3 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
		
	list.fixSpacer4 = {
		name: "Проставка " + params.fixSpacer4 + " L=" + (params.fixSpacerLength4 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
		
	list.fixSpacer5 = {
		name: "Проставка " + params.fixSpacer5 + " L=" + (params.fixSpacerLength5 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
		
	list.fixSpacer6 = {
		name: "Проставка " + params.fixSpacer6 + " L=" + (params.fixSpacerLength6 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
	
	var studLength = params.fixSpacerLength3;
	if(params.fixSpacerLength4 > studLength) studLength = params.fixSpacerLength4;
	if(params.fixSpacerLength5 > studLength) studLength = params.fixSpacerLength5;
	if(params.fixSpacerLength6 > studLength) studLength = params.fixSpacerLength6;
	
	list.stud_screw_M12 = {
		name: "Шпилька-шуруп М12 L=" + studLength + "мм", 
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};

//Фланец крепления к перекрытию
	list.fk15_flange = {
		name: "Фланец крепления к верхнему перекрытию",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};



//Ступени марша


	var treadLength = params.M;
	if(params.model == "лт") treadLength = params.M - 26;
	if(params.stairType == "рифленая сталь") treadLength = params.M - 16;
	
	var treadThkComment = "Толщина " + params.treadThickness + "+-1мм. "
	if(params.riserType == "есть") treadThkComment = "Толщина " + params.treadThickness + "мм допуск -0,5мм. "
	
	var riserThtComment = "Толщина " + params.riserThickness + "+-1мм. "
	
	list.rectTread_marsh1 = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + params.a1 + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: "Cтупень первого марша. " + treadThkComment + "Фаски см. чертеж",
		area: params.a1 * treadLength / 1000000,
		paintedArea: (params.a1 * treadLength + (params.a1 + treadLength) * params.treadThickness) * 2 / 1000000,
		};
		
	list.rectTread_marsh2 = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + params.a2 + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: "Cтупень среднего марша. " + treadThkComment + "Фаски см. чертеж",
		area: params.a2 * treadLength / 1000000,
		paintedArea: (params.a2 * treadLength + (params.a2 + treadLength) * params.treadThickness) * 2 / 1000000,

		};
		
	list.rectTread_marsh3 = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + params.a3 + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: "Cтупень верхнего марша. " + treadThkComment + "Фаски см. чертеж",
		area: params.a3 * treadLength / 1000000,
		paintedArea: (params.a3 * treadLength + (params.a3 + treadLength) * params.treadThickness) * 2 / 1000000,

		};
	

		
	//последняя ступень если есть вертикальная рамка
	var lastMarsh_a = params.a3;
	var lastMarsh_b = params.b3;
	var lastMarsh_h = params.h3;
	if(params.stairModel == "Прямая"){
		lastMarsh_a = params.a1;
		lastMarsh_b = params.b1;
		lastMarsh_h = params.h1;
		}
	var lastStairWidth = lastMarsh_a;
	if(params.model=="лт" && params.topAnglePosition == "вертикальная рамка") 
		lastStairWidth = lastMarsh_b + 40 - params.riserThickness;
	 if (params.model == "ко" && params.riserType == "есть" && params.topAnglePosition != "вертикальная рамка")
                    lastStairWidth = lastMarsh_a + params.riserThickness;
	list.lastStair = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + lastStairWidth + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: "Последняя ступень верхнего марша. " + treadThkComment + "Фаски см. чертеж",
		area: (params.a3 - params.riserThickness) * treadLength / 1000000,
		paintedArea: ((params.a3 - params.riserThickness) * treadLength + ((params.a3 - params.riserThickness) + treadLength) * params.treadThickness) * 2 / 1000000,
		};
		
	//Урезанная ступень вертикальной рамки крепления к перекрытию
	var smallStairWidth = lastMarsh_a - lastMarsh_b + params.riserThickness + 40;
	if(params.model=="лт") smallStairWidth = 80;
	list.smallStair = {
		name: "Ступень урезанная " + params.stairType + " А=" + smallStairWidth + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: "Ступень вертикальной рамки. " + treadThkComment + "Фаски см. чертеж",
		area: 80 * treadLength / 1000000,
		paintedArea: (80 * treadLength + (80 + treadLength) * params.treadThickness) * 2 / 1000000,
		};
	
	list.lastRiser = {
		name: "Подступенок вертикальной рамки " + params.stairType + " А=" + lastMarsh_h + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: riserThtComment, 
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.treadThickness) * 2 / 1000000,
		};

		
//Щиты промежуточной площадки

	list.platformShield = {
		name: "Щит промежуточной площадки " + params.stairType + " А=" + staircasePartsParams.halfPlatformLength + "мм В=" + staircasePartsParams.platformWidth + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: staircasePartsParams.halfPlatformLength * treadLength / 1000000,
		paintedArea: (staircasePartsParams.halfPlatformLength * treadLength + (staircasePartsParams.halfPlatformLength + treadLength) * params.treadThickness) * 2 / 1000000,

	};
	
//Щиты верхней площадки
	list.platformShield_top = {
		name: "Щит верхней площадки " + params.stairType + " А=" + staircasePartsParams.halfPlatformLength_top + "мм В=" + staircasePartsParams.platformWidth_top + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: staircasePartsParams.halfPlatformLength_top * treadLength / 1000000,
		paintedArea: (staircasePartsParams.halfPlatformLength_top * treadLength + (staircasePartsParams.halfPlatformLength_top + treadLength) * params.treadThickness) * 2 / 1000000,

	};

	
	//Ступени забежной группы
	
	var sizeA = 0;
	var sizeB = 0;
	var sizeC = 0;
	
	//console.log(staircasePartsParams.winderTreadsParams);
	if(staircasePartsParams.winderTreadsParams){
		sizeA = Math.round(staircasePartsParams.winderTreadsParams[1].treadWidth);
		sizeB = Math.round(staircasePartsParams.winderTreadsParams[1].stepWidthHi);
		sizeC = Math.round(staircasePartsParams.winderTreadsParams[1].stepWidthLow);
		}
	list.winderTread1 = {
		name: "Забежная ступень нижняя " + params.stairType + " А=" + sizeA + "мм В=" + sizeB + "мм C=" + sizeC + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: treadThkComment + "Изготавливается на чпу. Фаски и контрольные размеры см. чертеж",
		area: (sizeB + sizeC) * sizeA / 2 / 1000000,
		paintedArea: ((sizeB + sizeC) * sizeA / 2  + sizeA + sizeB * params.treadThickness) * 2 / 1000000,

		};
	if(staircasePartsParams.winderTreadsParams){
		sizeA = Math.round(staircasePartsParams.winderTreadsParams[2].sizeA);
		sizeB = Math.round(staircasePartsParams.winderTreadsParams[2].sizeB);
		}
	list.winderTread2 = {
		name: "Забежная ступень средняя " + params.stairType + " А=" + sizeA + "мм В=" + sizeB + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: treadThkComment + "Изготавливается на чпу. Фаски и контрольные размеры см. чертеж",
		area: sizeB * sizeA / 1000000,
		paintedArea: (sizeA * sizeB + (sizeB + sizeA) * params.treadThickness * 2 )/ 1000000,
		};
	if(staircasePartsParams.winderTreadsParams){
		var sizeA = Math.round(staircasePartsParams.winderTreadsParams[3].treadWidth);
		var sizeB = Math.round(staircasePartsParams.winderTreadsParams[3].stepWidthHi);
		var sizeC = Math.round(staircasePartsParams.winderTreadsParams[3].stepWidthLow);
		}
	list.winderTread3 = {
		name: "Забежная ступень верхняя " + params.stairType + " А=" + sizeA + "мм В=" + sizeB + "мм C=" + sizeC + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: treadThkComment + "Изготавливается на чпу. Фаски и контрольные размеры см. чертеж",
		area: (sizeB + sizeC) * sizeA / 2 / 1000000,
		paintedArea: ((sizeB + sizeC) * sizeA / 2  + sizeA + sizeB * params.treadThickness) * 2 / 1000000,

		};
	
	if(staircasePartsParams.winderTreadsParams){
		if(staircasePartsParams.winderTreadsParams[6]){
			var sizeA = Math.round(staircasePartsParams.winderTreadsParams[6].treadWidth);
			var sizeB = Math.round(staircasePartsParams.winderTreadsParams[6].stepWidthHi);
			var sizeC = Math.round(staircasePartsParams.winderTreadsParams[6].stepWidthLow);
			}
		}
	list.winderTread6 = {
		name: "Забежная ступень верхняя " + params.stairType + " А=" + sizeA + "мм В=" + sizeB + "мм C=" + sizeC + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber", //переопределяется в функции calculateSpec
		items: [],
		comment: treadThkComment + "Изготавливается на чпу. Фаски и контрольные размеры см. чертеж",
		area: (sizeB + sizeC) * sizeA / 2 / 1000000,
		paintedArea: ((sizeB + sizeC) * sizeA / 2  + sizeA + sizeB * params.treadThickness) * 2 / 1000000,

		};
	
	
//Подступенки марша

	var riserHeightOffset = 1; // зазор между ступенью и подступенком по высоте
	var riserWidthOffset = 0; //разница между длиной подступенка и ступени
	
	list.riser_marsh1 = {
		name: "Подступенок нижний марш " + params.stairType + " " + Math.round(params.h1 - riserHeightOffset) + "x" + (params.M - riserWidthOffset),
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h1 * treadLength / 1000000,
		paintedArea: (params.h1 * treadLength + (params.h1 + treadLength) * params.riserThickness) * 2 / 1000000,
		};
	
	list.riser_marsh2 = {
		name: "Подступенок средний марш " + params.stairType + " " + Math.round(params.h2 - riserHeightOffset) + "x" + (params.M - riserWidthOffset),
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h2 * treadLength / 1000000,
		paintedArea: (params.h2 * treadLength + (params.h2 + treadLength) * params.riserThickness) * 2 / 1000000,
		};
	
	list.riser_marsh3 = {
		name: "Подступенок верхний марш " + params.stairType + " " + Math.round(params.h3 - riserHeightOffset) + "x" + (params.M - riserWidthOffset),
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.riserThickness) * 2 / 1000000,
		};
		
	list.firstRiser_marsh1 = {
		name: "Подступенок первый нижний марш " + params.stairType + " " + Math.round(params.h1 - riserHeightOffset - params.treadThickness) + "x" + (params.M - riserWidthOffset),
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h1 * treadLength / 1000000,
		paintedArea: (params.h1 * treadLength + (params.h1 + treadLength) * params.riserThickness) * 2 / 1000000,
		};
	
	list.firstRiser_marsh2 = {
		name: "Подступенок первый средний марш " + params.stairType + " " + Math.round(params.h2 - riserHeightOffset - params.treadThickness) + "x" + (params.M - riserWidthOffset),
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h2 * treadLength / 1000000,
		paintedArea: (params.h2 * treadLength + (params.h2 + treadLength) * params.riserThickness) * 2 / 1000000,
		};
	
	list.firstRiser_marsh3 = {
		name: "Подступенок первый верхний марш " + params.stairType + " " + Math.round(params.h3 - riserHeightOffset - params.treadThickness) + "x" + (params.M - riserWidthOffset),
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.riserThickness) * 2 / 1000000,
		};
		
//Подступенки забежной группы
//	console.log(staircasePartsParams)
	list.riser_wnd2 = {
		name: "Подступенок второй забежной ступени " + params.stairType + " " + Math.round(params.h3 - riserHeightOffset) + "x" + staircasePartsParams.wndRiserLength2,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.riserThickness) * 2 / 1000000,

		};
	list.riser_wnd3 = {
		name: "Подступенок третей забежной ступени " + params.stairType + " " + Math.round(params.h3 - riserHeightOffset) + "x" + staircasePartsParams.wndRiserLength3,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.riserThickness) * 2 / 1000000,

		};
		
	list.riser_wnd5 = {
		name: "Подступенок пятой забежной ступени " + params.stairType + " " + Math.round(params.h3 - riserHeightOffset) + "x" + staircasePartsParams.wndRiserLength2,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.riserThickness) * 2 / 1000000,

		};
	list.riser_wnd6 = {
		name: "Подступенок шестой забежной ступени " + params.stairType + " " + Math.round(params.h3 - riserHeightOffset) + "x" + staircasePartsParams.wndRiserLength3,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: riserThtComment + "Все грани скруглить R=3мм",
		area: params.h3 * treadLength / 1000000,
		paintedArea: (params.h3 * treadLength + (params.h3 + treadLength) * params.riserThickness) * 2 / 1000000,

		};

	

	
	
	
/* рамки */	

	//Вертикальная рамка крепления к верхнему перекрытию
	var frameLength = params.M - 16;
	var frameHeight = lastMarsh_h;
	if(params.model == "ко") frameHeight = lastMarsh_h + 20;
	if(params.model == "ко") frameLength += -params.sideOverHang * 2;
	list.topFloorFrame = {
		name: "Вертикальная рамка A=" + frameLength + "мм С=" + frameHeight + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "крепление к верхнему перекрытию",
		};
	
	var frameLength = staircasePartsParams.frameLength_3;
	var frameWidth = staircasePartsParams.frameWidth_3;
	if(params.stairModel == "Прямая") frameWidth = staircasePartsParams.frameWidth_1;
	if(params.model == "лт") frameWidth += 20;
	list.lastFrame = {
		name: "Рамка последней ступени A=" + frameLength + "мм В=" + frameWidth + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "cм. чертеж",
		};
	if(params.topFlan == "есть") list.lastFrame.name += " с приваренными фланцами"
	
	//Рамки прямых ступеней
	list.treadFrame_marsh1 = {
		name: "Рамка ступени A=" + staircasePartsParams.frameLength_1 + "мм B=" + staircasePartsParams.frameWidth_1 + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Нижний марш",
		};
		
	list.treadFrame_marsh2 = {
		name: "Рамка ступени A=" + staircasePartsParams.frameLength_2 + "мм B=" + staircasePartsParams.frameWidth_2 + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Средний марш",
		};
		
	list.treadFrame_marsh3 = {
		name: "Рамка ступени A=" + staircasePartsParams.frameLength_3 + "мм B=" + staircasePartsParams.frameWidth_3 + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Верхний марш",
		};
	
	//рамки промежуточной площадки
	list.platformFrame = {
		name: "Рамка площадки A=" + staircasePartsParams.frameLength_plt + "мм B=" + staircasePartsParams.frameWidth_plt + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Промежуточная площадка",
		};
	
	if(params.model == "ко") list.platformFrame.name = "Рамка площадки A=" + staircasePartsParams.frameLength_1 + "мм B=" + staircasePartsParams.frameWidth_1 + "мм",
		
		
	//рамки промежуточной площадки
	list.platformFrame2 = {
		name: "Рамка площадки A=" + staircasePartsParams.frameLength_2 + "мм B=" + staircasePartsParams.frameWidth_2 + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "верхняя промежуточная площадка",
		};
		
	//рамки промежуточной площадки средние П-образной лестницы
	list.platformFrame_mid = {
		name: "Рамка площадки A=" + staircasePartsParams.frameLength_pltMid + "мм B=" + staircasePartsParams.frameWidth_pltMid + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "промежуточная площадка",
		};
		
	//рамки верхней площадки
	list.platformFrame_top = {
		name: "Рамка площадки A=" + staircasePartsParams.frameLength_topPlt + "мм B=" + staircasePartsParams.frameWidth_topPlt + "мм",
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "верхняя площадка",
		};
	
	var turnName = "правая";
	if(params.turnSide == "левое") turnName = "левая";
	list.zabegStairFrame = {
		name: "Рамка забежная " + turnName,
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Детали изготавливаются на чпу. Схему сборки cм. чертеж",
		};
		
	list.zabegStairFrame1 = {
		name: "Рамка забежная нижняя " + turnName,
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Фланцы: ",
		};
	
	for(var i=0; i<staircasePartsParams.frame1Flans.length; i++){
		list.zabegStairFrame1.comment += staircasePartsParams.frame1Flans[i];
		if(i<staircasePartsParams.frame1Flans.length - 1) list.zabegStairFrame1.comment += "; ";
		}
		
	list.zabegStairFrame2 = {
		name: "Рамка забежная средння " + turnName,
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Фланцы: ",
		};
	for(var i=0; i<staircasePartsParams.frame2Flans.length; i++){
		list.zabegStairFrame2.comment += staircasePartsParams.frame2Flans[i];
		if(i<staircasePartsParams.frame2Flans.length - 1) list.zabegStairFrame2.comment += "; ";
		}
		
	list.zabegStairFrame3 = {
		name: "Рамка забежная верхняя " + turnName,
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Фланцы: ",
		};
	for(var i=0; i<staircasePartsParams.frame3Flans.length; i++){
		list.zabegStairFrame3.comment += staircasePartsParams.frame3Flans[i];
		if(i<staircasePartsParams.frame3Flans.length - 1) list.zabegStairFrame3.comment += "; ";
		}
		
	list.zabegStairFrame6 = {
		name: "Рамка забежная верхняя " + turnName,
		amtName: "мм",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		comment: "Фланцы: ",
		};
	
		for(var i=0; i<staircasePartsParams.frame6Flans.length; i++){
			list.zabegStairFrame6.comment += staircasePartsParams.frame6Flans[i];
			if(i<staircasePartsParams.frame6Flans.length - 1) list.zabegStairFrame6.comment += "; ";
			}

	
	
//Фланец крепления балок длинных маршей
	list.stringerFlange = {
		name: "Фланец соединительный",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};


//Перемычка марша
	list.bridge = {
		name: "Перемычка",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
	
	//Соединительный фланец косоуров площадки
	list.pltFlan = {
		name: "Фланец соединения косоуров марша и площадки",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Боковая пластина верхней площадки
	list.sidePlatformTopStringer = {
		name: "Пластина",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Задняя пластина верхней площадки
	list.backPlatformTopStringer = {
		name: "Пластина",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Перемычка верхней площадки
	list.platformTopBridge = {
		name: "Перемычка",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		comment: "верхняя площадка",
		items: [],
	};
//Фланец крепления боковых пластин площадки к маршевым
	list.platformTopFlan = {
		name: "ФК4-100х150",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};


//Задняя пластина промежуточной площадки
	list.platformBackStringer = {
		name: "Задняя пластина площадки",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Боковая пластина промежуточной площадки
	list.platformSideStringer = {
		name: "Пластина площадки",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Перемычка площадки
	list.platformBridge = {
		name: "Перемычка площадки",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "metal",
		items: [],
	};


//Перемычка забежной группы
	list.zabegBridge = {
		name: "Перемычка",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

		


	
	

//Фланец соединения боковых пластин промежуточной площадки и косоуров низлежащего марша
	list.platformFlan = {
		name: "Фланец 108х100",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Передняя/задняя пластина промежуточной площадки
	list.platformFrontBackStringer = {
		name: "Пластина площадки",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Боковая/внутренняя пластина промежуточной площадки
	list.platformSideInnerStringer = {
		name: "Пластина площадки",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};


		
//Боковое крепление стоек ограждения
	list.steelSideBush = {
		name: "Проставка черн. 20х20",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Боковое крепление стоек ограждения
	list.stainlessSideBush = {
		name: "Проставка нерж. 20х20",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Стойка ограждения
var balLen = 950;
if(params.rackBottom == "сверху с крышкой") balLen = "830 с фланцем";
	list.steelBanister = {
		name: "Стойка ограждения (40х40 черн.) L=" + balLen,
		amtName: "шт.",
		metalPaintRailing: true,
		division: "metal",
		items: [],
	};
//Стойка ограждения
	list.stainlessBanister = {
		name: "Стойка ограждения (40х40 нерж.) L=" + balLen,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "metal",
		items: [],
	};
//Стойка ограждения
	list.combinedBanister = {
		name: "Стойка ограждения (40х40 нерж+дуб) L=" + balLen,
		amtName: "шт.",
		timberPaintRailing: true,
		division: "metal",
		items: [],
	};

//поручни
/*
	//группируем поручни одинаковой длины
	staircasePartsParams.handrailTypes = [];
	
	for(var i=0; i<staircasePartsParams.handrails.length; i++){
		var newType = true;
		if(i>0){
			for(var j=0; j<staircasePartsParams.handrailTypes.length; j++){
				if(staircasePartsParams.handrailTypes[j].len == staircasePartsParams.handrails[i]){
					staircasePartsParams.handrailTypes[j].amt += 1;
					newType = false;
					}
				}
			}
		if(newType) {
			var handrailType = {
				len: staircasePartsParams.handrails[i],
				amt: 1,
				}
			staircasePartsParams.handrailTypes.push(handrailType);
			}
		}
			
	//создаем позицию в спецификации под каждый тип поручня
	var handrailMetalPaint = true;
	var handrailTimberPaint = false;
	var handrailDiv = "metal";
	
	//параметры поручня
	var handrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		}
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js
	
	//сохраняем параметры поручня в глобальный объект
	staircasePartsParams.handrailPar = handrailPar;
	
	if(handrailPar.mat == "timber"){
		handrailMetalPaint = false;
		handrailTimberPaint = true;
		handrailDiv = "timber";
		}
	if(handrailPar.mat == "inox"){
		handrailMetalPaint = false;
		}
	
	var handrailName = params.handrail;
	if(handrailPar.mat == "timber"){
		handrailName += " " + params.handrailProf;
		if(params.handrailSlots == "да") handrailName += " с проточками под пальцы"
		}

	for(var i=0; i<staircasePartsParams.handrailTypes.length; i++){
		var handrailId = "handrail" + i;
		list[handrailId] = {
			name: "Поручень L=" + Math.round(staircasePartsParams.handrailTypes[i].len),
			amtName: "шт",
			metalPaint: handrailMetalPaint,
			timberPaint: handrailTimberPaint,
			division: handrailDiv,
			items: [],
			comment: handrailName,
			};		
		}
*/	 
		
//ригели
	
//группируем ригели одинаковой длины
	staircasePartsParams.rigelTypes = [];
	
	for(var i=0; i<staircasePartsParams.rigels.length; i++){
		var newType = true;
		if(i>0){
			for(var j=0; j<staircasePartsParams.rigelTypes.length; j++){
				if(staircasePartsParams.rigelTypes[j].len == staircasePartsParams.rigels[i]){
					staircasePartsParams.rigelTypes[j].amt += 1;
					newType = false;
					}
				}
			}
		if(newType) {
			var handrailType = {
				len: staircasePartsParams.rigels[i],
				amt: 1,
				}
			staircasePartsParams.rigelTypes.push(handrailType);
			}
		}
			
	//создаем позицию в спецификации под каждый тип ригеля
	var rigelMetalPaint = true;
	if(params.rigelMaterial != "20х20 черн."){
		rigelMetalPaint = false;
		}

	for(var i=0; i<staircasePartsParams.rigelTypes.length; i++){
		var rigelId = "rigel" + i;
		list[rigelId] = {
			name: "Ригель L=" + Math.round(staircasePartsParams.rigelTypes[i].len),
			amtName: "шт",
			metalPaint: rigelMetalPaint,
			timberPaint: false,
			division: "metal",
			items: [],
			comment: params.rigelMaterial,
			};		 
		}

//Фланец крепления секций поручней
	list.handrailFlunge = {
		name: "Фланец (черн.)",
		amtName: "шт.",
		metalPaintRailing: true,
		division: "metal",
		items: [],
	};


//ригели лестницы	

	var metalPaint = false;
	if(params.rigelMaterial == "20х20 черн.") metalPaint = true;
	//console.log(metalPaint);
	for (var i=0; i<staircasePartsParams.rigels.length; i++){
		var itemName = "rigel_" + i;
		list[itemName] = {
			name: "Ригель " + params.rigelMaterial + " L=" + Math.round(staircasePartsParams.rigels[i]),
			amtName: "шт.",
			timberPaintRailing: false,
			metalPaintRailing: metalPaint,
			division: "metal", 
			items: [],
			};
		
		}
	

//Стекла ограждения
	list.glassRailing = {
		name: "Стекло ограждения",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "timber",
		items: [],
	};

	

//Опорные колонны

	//группируем колонны одинаковой длины
	staircasePartsParams.columnTypes = [];
	
	for(var i=0; i<staircasePartsParams.columns.length; i++){
		var newType = true;
		if(i>0){
			for(var j=0; j<staircasePartsParams.columnTypes.length; j++){
				if(staircasePartsParams.columnTypes[j].len == staircasePartsParams.columns[i]){
					staircasePartsParams.columnTypes[j].amt += 1;
					newType = false;
					}
				}
			}
		if(newType) {
			var colType = {
				len: staircasePartsParams.columns[i],
				amt: 1,
				}
			staircasePartsParams.columnTypes.push(colType);
			}
		}
			
	//создаем позицию в спецификации под каждый тип колонн
	var deltaHeight = 0;
	if(params.columnModel == "100x50" || params.columnModel == "100x100") deltaHeight = 65;
	
	for(var i=0; i<staircasePartsParams.columnTypes.length; i++){
		var columnId = "column" + i;
		list[columnId] = {
			name: "Опорная колонна " + params.columnModel + " L=" + Math.round(staircasePartsParams.columnTypes[i].len - deltaHeight),
			amtName: "шт",
			metalPaint: true,
			timberPaint: false,
			division: "metal",
			items: [],
			};		
		}

//группируем подкосы одинаковой длины
	staircasePartsParams.braceTypes = [];
		
	for(var i=0; i<staircasePartsParams.braces.length; i++){
		var newType = true;
		if(i>0){
			for(var j=0; j<staircasePartsParams.braceTypes.length; j++){
				if(staircasePartsParams.braceTypes[j].len == staircasePartsParams.braces[i]){
					staircasePartsParams.braceTypes[j].amt += 1;
					newType = false;
					}
				}
			}
		if(newType) {
			var braceType = {
				len: staircasePartsParams.braces[i],
				amt: 1,
				}
			staircasePartsParams.braceTypes.push(braceType);
			}
		}
			
	//создаем позицию в спецификации под каждый тип колонн
	for(var i=0; i<staircasePartsParams.braceTypes.length; i++){
		var braceId = "brace" + i;
		list[braceId] = {
			name: "Подкос 60х30 L=" + Math.round(staircasePartsParams.braceTypes[i].len),
			amtName: "шт",
			metalPaint: true,
			timberPaint: false,
			division: "metal",
			items: [],
			};		
		}
		
		
		
//Тетива марша
	list.stringer = {
		name: "Тетива",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
		};
	return list;
}//end of createPartsList

// функция расчёта спецификации
function calculateSpec(){

	//покраска ограждений
	if(params.metalPaint_perila == "как на лестнице") params.metalPaint_perila = params.metalPaint;
	if(params.railingMetalColorNumber == "как на лестнице") params.railingMetalColorNumber = params.metalColorNumber;
	if(params.timberPaint_perila == "как на лестнице") params.timberPaint_perila = params.timberPaint;
	if(params.railingTimberColorNumber == "как на лестнице") params.railingTimberColorNumber = params.timberColorNumber;

	/* Инициализация справочника деталей*/
    var stringerThickness = 8;
	var partsList = createPartsList();
	var item = {}

	//задаем тип болтов каркаса
	if(params.boltHead == "countersunk") {
		carcasBoltId = "hexVint_M10x30";
		stairBoltId = "hexVint_M10x30";
		if(params.stairFrame == "нет") stairBoltId = "hexVint_M10x20";
		}
	if(params.boltHead == "hexagon") {
		carcasBoltId = "bolt_M10x30";
		stairBoltId = "bolt_M10x30";	
		}


	//задаем тип несущих элементов
	if(params.model == "лт") partsList.stringer.name = "Тетива";
	if(params.model == "ко") partsList.stringer.name = "Косоур";


	
	//задаем тип шурупов крепления ступеней
	var treadScrewName = "screw_6x32";
	if(params.model == "ко") treadScrewName = "screw_4x32";
	var riserScrewName = "screw_4x32";	
	var wndRiserScrewName = "screw_4x19";
	if(wndFrames == "профиль") wndRiserScrewName = "screw_4x32";

	
    //учитываем покраску болтов

    if(params.metalPaint != "нет" && params.paintedBolts != "нет") {
		partsList[carcasBoltId]["metalPaint"] = true;
		partsList[stairBoltId]["metalPaint"] = true;
		partsList.bolt_M10x40.metalPaint = true;
		}
    else{
		partsList[carcasBoltId]["metalPaint"] = false;
		partsList[stairBoltId]["metalPaint"] = false;
		partsList.bolt_M10x40.metalPaint = false;
    }
	
	//задаем тип ступеней
	if(params.stairType == "рифленая сталь" || params.stairType == "рифленый алюминий"){
		partsList.rectTread_marsh1.division = "metal";
		partsList.rectTread_marsh2.division = "metal";
		partsList.rectTread_marsh3.division = "metal";
		partsList.winderTread1.division = "metal";
		partsList.winderTread2.division = "metal";
		partsList.winderTread3.division = "metal";
		partsList.winderTread6.division = "metal";
		partsList.platformShield.division = "metal";
		partsList.platformShield_top.division = "metal";	
		}
	
    // добавление позиций крепления к нижнему перекрытию
    function bottomMountingItemsAdd() {
	
		if(params.bottomAngleType == "уголок"){
		    item = {
				id: "angle100",
				amt: 2,
				discription: "Крепление к нижнему перекрытию",
				unit: "bottomMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
		    if(item.amt > 0) partsList.addItem(item);				
			}
			
		if(params.bottomAngleType == "регулируемая опора") {
		    item = {
				id: "regSupport",
				amt: 2,
				discription: "Крепление к нижнему перекрытию",
				unit: "bottomMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
		    if(item.amt > 0) partsList.addItem(item);

		    item = {
				id: "angle_u5_100",
				amt: 2,
				discription: "Крепление к нижнему перекрытию",
				unit: "bottomMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
		    if(item.amt > 0) partsList.addItem(item);

		    item = {
				id: "nut_M20",
				amt: 4,
				discription: "Крепление к нижнему перекрытию",
				unit: "bottomMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
						
			
		}

		// метизы

		var carcasBoltAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// крепление уголков основания
		carcasBoltAmt = 4;
		nutAmt = carcasBoltAmt;
		shimAmt = carcasBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = carcasBoltAmt * 2;

		// добавление позиций в спецификацию
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление к нижнему перекрытию",
		    unit: "bottomMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id: "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление к нижнему перекрытию",
		    unit: "bottomMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
		};
		if(item.amt > 0) partsList.addItem(item);
       
		item = {
		    id: "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление к нижнему перекрытию",
		    unit: "bottomMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
		};
		if(item.amt > 0) partsList.addItem(item);

    } // bottomMountingItemsAdd

// функция добавления деталей крепления к верхнему
function topMountingItemsAdd() {
	if(params.platformTop == "нет"|| params.platformRearStringer == "нет"){
	if(params.topAnglePosition == "под ступенью" || params.topAnglePosition == "над ступенью"){
		item = {
		    id: "angle100",
		    amt: 2,
		    discription: "Крепление к верхнему перекрытию",
		    unit: "topMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
			};
		if(item.amt > 0) partsList.addItem(item);
		}
	
	if(params.topAnglePosition == "вертикальная рамка"){
		item = {
		    id: "topFloorFrame",
		    amt: 1,
		    discription: "Крепление к верхнему перекрытию",
		    unit: "topMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
			};
		if(item.amt > 0) partsList.addItem(item);
		}

		if(params.topFlan == "есть" && params.topAnglePosition != "рамка верхней ступени"){
		    item = {
				id: "fk15_flange",
				amt: 2,
				discription: "Крепление к верхнему перекрытию",
				unit: "topMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
		    if(item.amt > 0) partsList.addItem(item);
			}

		// метизы

		var carcasBoltAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		if(params.topAnglePosition != "рамка верхней ступени") carcasBoltAmt = 4;


		// добавление крепежа при наличии верхнего фланца
		if(params.topFlan == "есть" && params.topAnglePosition != "рамка верхней ступени")
		    carcasBoltAmt = carcasBoltAmt + 4;

		nutAmt = carcasBoltAmt;
		shimAmt = carcasBoltAmt;

		// добавление позиций в спецификацию
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление к верхнему перекрытию",
		    unit: "topMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id: "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление к верхнему перекрытию",
		    unit: "topMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id: "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление к верхнему перекрытию",
		    unit: "topMountingItemsAdd",
		    itemGroup: "Крепление к перекрытиям",
		};
		if(item.amt > 0) partsList.addItem(item);			
}
} // end of topMountingItemsAdd()



// функция добавления позиций прямых ступеней марша
function angles_marshItemsAdd(stairAmt, a, topMarsh, marshName) {
	var angleAmt90 = 0;
	var angleAmt160 = 0;
	var angleAmt200 = 0;
	var angleAmt230 = 0;
	var stringerFlangeAmt = 0;
	var bridgeAmt = 0;

	bridgeAmt = calcMarshBridgesAmt(stairAmt);
	
	if(params.stairModel == "Прямая"){
		if(params.platformTop == "площадка") bridgeAmt = calcMarshBridgesAmt(stairAmt + 1);	
		}
	if(params.stairModel != "Прямая"){
		if(marshName == "нижний") bridgeAmt = calcMarshBridgesAmt(stairAmt + 1);
		if(marshName == "средний") bridgeAmt = calcMarshBridgesAmt(stairAmt + 1);
		if(marshName == "верхний" && params.platformTop == "площадка") 
			bridgeAmt = calcMarshBridgesAmt(stairAmt + 1);	
		}	
		
	//наличие перемычки внизу марша для верхнего марша лестниц с забегом
		var botBridgePresent = false;
		if(params.stairModel == "Г-образная с забегом" || params.stairModel == "П-образная с забегом"){
			if(marshName == "верхний") botBridgePresent = true;	
			}
		if(params.stairModel == "П-образная трехмаршевая"){
			if(marshName == "верхний" && params.turnType_2 == "забег") botBridgePresent = true;
			if(marshName == "средний" && params.turnType_1 == "забег") botBridgePresent = true;
			}
		
		if(botBridgePresent) bridgeAmt += 1;
	
	// ступени
	if(params.stairType != "нет") {
		var treadId = "rectTread_marsh1";
		if(marshName == "средний") treadId = "rectTread_marsh2";
		if(marshName == "верхний") treadId = "rectTread_marsh3";
		
	    item = {
			id:  treadId,
			amt: stairAmt,
			discription: "Ступени " + marshName + " марш",
			unit: marshName + " марш",
			itemGroup: "Ступени",
		    };
		if(item.amt > 0) partsList.addItem(item);
		
		var isVerticalFrame = false;
		if(params.topAnglePosition == "вертикальная рамка"){
			if(params.stairModel == "Прямая") isVerticalFrame = true;
			if(marshName == "верхний") isVerticalFrame = true;
			}
		
		if(isVerticalFrame){
			item = {
				id:  "smallStair",
				amt: 1,
				discription: "Ступени вертикальной рамки марш",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "lastRiser",
				amt: 1,
				discription: "Подступенок вертикальной рамки марш",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: treadScrewName,
				amt: 4,
				discription: "Крепление урезанной ступени к рамке",
				unit: marshName + " марш",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "smallStair", 1, partsList);
			addTimberWorks("rect", "lastRiser", 1, partsList);

			}
		
		//расчет объема для фот
		addTimberWorks("rect", treadId, stairAmt, partsList);
		};	
	
	
		
		// добавление уголков ступеней
		if(a > 260) {
		    angleAmt230 = (stairAmt - bridgeAmt) * 2; // основные уголки ступеней
			//if(botBridgePresent) angleAmt230 = angleAmt230 - 2;
		}

		if(230 <= a && a <= 260) {
		    angleAmt200 = (stairAmt - bridgeAmt) * 2; // основные уголки ступеней
			//if(botBridgePresent) angleAmt200 = angleAmt200 - 2;
		}

		if(a < 230) {
		    angleAmt160 = (stairAmt - bridgeAmt) * 2; // основные уголки ступеней
			//if(botBridgePresent) angleAmt160 = angleAmt160 - 2;
		}

		//console.log(bridgeAmt)

		/*
		//меняем уголки при соединении длинного марша фланцем
		if(stairAmt > 10) {
		    stringerFlangeAmt += 2;


		    item = {
				id:  "stringerFlange",
				amt: stringerFlangeAmt,
				discription: "Соединительный Фланец " + marshName + " марш",
				unit: marshName + " марш",
				itemGroup: "Каркас",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			
		}
*/
		// добавление уголков каркаса
		var carcasAngleAmt = bridgeAmt * 2;

		// добавление уголков перемычек
		angleAmt200 = angleAmt200 + bridgeAmt * 2;
		angleAmt90 = angleAmt90 + bridgeAmt * 2;


		// добавление позиций в спецификацию

		item = {
		    id:  "angle90",
		    amt: angleAmt90,
		    discription: "Уголок крепления ступени " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "angle160",
		    amt: angleAmt160,
		    discription: "Уголок крепления ступени " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "angle200",
		    amt: angleAmt200,
		    discription: "Уголок крепления ступени " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "angle230",
		    amt: angleAmt230,
		    discription: "Уголок крепления ступени " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок каркаса " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "bridge",
		    amt: bridgeAmt,
		    discription: "Перемычка " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// крепление перемычек
		carcasBoltAmt = carcasAngleAmt * 4;
		nutAmt = carcasBoltAmt;
		shimAmt = carcasBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = carcasBoltAmt * 2;
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление перемычек " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление перемычек " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление перемычек " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
	/*	
		// крепление соединительных фланцев
		carcasBoltAmt = stringerFlangeAmt * 7;
		nutAmt = carcasBoltAmt;
		shimAmt = carcasBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = carcasBoltAmt * 2;
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление соединительных фланцев " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление соединительных фланцев " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление соединительных фланцев " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
*/
		

		// крепление уголков ступеней
		stairBoltAmt = (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;
		// минус крепление 90 уголков на соединительных фланцах
		if(stairAmt > 10) stairBoltAmt = stairBoltAmt - 4;
		nutAmt = stairBoltAmt;
		shimAmt = stairBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = stairBoltAmt * 2;
		
		item = {
		    id:  stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление уголков ступеней " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков ступеней " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков ступеней " + marshName + " марш",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		// крепление ступеней
		stepScrewAmt = (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;
		if(params.stairType != "нет") {
		item = {
			id:  treadScrewName,
			amt: stepScrewAmt,
			discription: "Крепление ступеней " + marshName + " марш",
			unit: marshName + " марш",
			itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		};
	
} // end of angles_marshItemsAdd()


// функция добавления позиций верхней площадки
    function angles_platformTopItemsAdd(a) {

		var carcasBoltAmt = 0;
		var stairBoltAmt = 0;
		var longBoltAmt = 0;
		

		// добавление щитов площадки
		var platformShieldAmt = Math.ceil(params.platformLength_3 / 600);
		
	
		if(params.stairType != "нет") {
		    item = {
				id:  "platformShield_top",
				amt: platformShieldAmt,
				discription:  "Щиты верхней площадки",
				unit: "Верхняя площадка",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);

		//расчет объема для фот
		addTimberWorks("rect", "platformShield_top", 2, partsList);

		}
		
		//задняя тетива
		if(params.platformRearStringer == "есть"){
		    item = {
				id:  "backPlatformTopStringer",
				amt: 1,
				discription: "Задняя пластина верхней площадки",
				unit: "Верхняя площадка",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			var angleAmt = 1; 
			if(params.M > 800) angleAmt = 2;
			item = {
				id: "angle200",
				amt: angleAmt,
				discription: "Уголки на задней тетиве",
				unit: "Верхняя площадка",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "carcasAngle",
				amt: 2,
				discription: "Уголок крепления задней тетивы",
				unit: "Верхняя площадка",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			carcasBoltAmt += 8;
			stairBoltAmt += angleAmt * 2;
			}

		var platformTopBridgeAmt = platformShieldAmt;
		
		//боковые уголки
		var angleId = "angle90"; 
		if(params.platformLength_3 > 782) angleId = "angle200";
		item = {
		    id:  angleId,
		    amt: platformTopBridgeAmt * 2,
		    discription: "Уголки на боковых тетивах",
		    unit: "Верхняя площадка",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		stairBoltAmt += platformTopBridgeAmt * 2 * 2;
		
		//перемычки
		
		if(platformTopBridgeAmt > 0){
			item = {
				id:  "platformTopBridge",
				amt: platformTopBridgeAmt,
				discription: "Перемычка верхней площадки",
				unit: "Верхняя площадка",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "carcasAngle",
				amt: platformTopBridgeAmt * 2,
				discription: "Уголки на перемычках",
				unit: "Верхняя площадка",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			var angleId = "angle90"; 
			if(params.M > 599) angleId = "angle200";
			var angleAmt = platformTopBridgeAmt * 2;
			if(platformShieldAmt > 1) angleAmt += (platformTopBridgeAmt - 1) * 2; //учитываем уголки с двух сторон на всех перемычках кроме первой
			
			item = {
				id:  angleId,
				amt: angleAmt,
				discription: "Уголки на перемычках",
				unit: "Верхняя площадка",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			carcasBoltAmt += platformTopBridgeAmt * 8;
			stairBoltAmt += 4; //уголки первой перемычки			
			if(platformShieldAmt > 1) longBoltAmt += (platformTopBridgeAmt - 1) * 4; //уголки остальных перемычек
		}
		

		// метизы

		// крепление щитов
		stepScrewAmt = stairBoltAmt + longBoltAmt * 2;

		
		//метизы каркаса
		
		var nutAmt = carcasBoltAmt + stairBoltAmt + longBoltAmt;
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей верхней площадки",
		    unit: "Верхняя площадка",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей верхней площадки",
		    unit: "Верхняя площадка",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "shim_M10",
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей верхней площадки",
		    unit: "Верхняя площадка",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//метизы крепления ступеней
		
		item = {
		    id: "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозоне крепление уголков на перемычках",
		    unit: "Верхняя площадка",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление уголков верхней площадки",
		    unit: "Верхняя площадка",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
		item = {
		    id:  "nut_M10",
		    amt: longBoltAmt + stairBoltAmt,
		    discription: "Крепление уголков верхней площадки",
		    unit: "Верхняя площадка",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: longBoltAmt + stairBoltAmt,
		    discription: "Крепление уголков верхней площадки",
		    unit: "Верхняя площадка",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
			
		
		
		if(params.stairType != "нет"){
		    item = {
				id:  treadScrewName,
				amt: stepScrewAmt,
				discription: "Крепление щитов верхней площадки",
				unit: "Верхняя площадка",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
    } // end of angles_platformTopItemsAdd()  


// функция добавления позиций промежуточной площадки (ЛТ2)
    function angles_platform_90_ItemsAdd(bottomStairAmt, topStairAmt, preTopMarsh) {

		var bridgeAmt = 0;
		var angleAmt90 = 0;
		var angleAmt160 = 0;
		var angleAmt200 = 0;
		var angleAmt230 = 0;
		var angleAmt100 = 0;
		var carcasAngleAmt = 0;

		// перемычки площадки

		// вычисление кол-ва щитов площадки
		if(params.model == "лт")
		    var platformTrueLength = params.M + 16;
		if(params.model == "ко")
		    var platformTrueLength = params.M + 50;

		// определение кол-ва щитов
		var pltShieldAmt = Math.ceil(platformTrueLength/600);

		// добавление позиций в спецификацию

		//	itemAdd("Щит (" + stairType + ")", "Щиты промежуточной площадки", "Столярный цех", "platformShield", itemAmount);
		
		if(params.stairType != "нет") {
			item = {
				id:  "platformShield",
				amt: pltShieldAmt,
				discription: "Щиты промежуточной площадки",
				unit: "angles_platform_90_ItemsAdd",
				itemGroup: "Ступени",
			};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "platformShield", 2, partsList);
		
		}
		
		var bridgeAmt = pltShieldAmt;

		// уголки каркаса крепления перемычек
		carcasAngleAmt = carcasAngleAmt + bridgeAmt * 2;

		// уголки крепления ступеней на перемычках
		angleAmt200 = angleAmt200 + 2 + (bridgeAmt - 1) * 4;

		// уголки крепления ступеней на косоурах
		angleAmt200 = angleAmt200 + bridgeAmt * 2;

		// уголки каркаса на задней пластине
		carcasAngleAmt = carcasAngleAmt + 2;

		// уголки крепления ступеней на задней пластине
		angleAmt200 = angleAmt200 + 2;

		// уголки каркаса на внутреннем косоуре (под первой прямой ступенью вышестоящего марша)
		if(!(params.platformTop != "площадка" && topStairAmt == 0 && preTopMarsh))
		    carcasAngleAmt = carcasAngleAmt + 2;

		// добавление позиций в спецификацию

		//	itemAdd ("У2-40х40х90", "Уголок крепления ступени", "Склад", "angle90", angleAmt90);
		item = {
		    id:  "angle90",
		    amt: angleAmt90,
		    discription: "Уголок крепления щитов промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "angle160",
		    amt: angleAmt160,
		    discription: "Уголок крепления щитов промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "angle200",
		    amt: angleAmt200,
		    discription: "Уголок крепления щитов промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "angle230",
		    amt: angleAmt230,
		    discription: "Уголок крепления щитов промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "bridge",
		    amt: bridgeAmt,
		    discription: "Перемычка промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// задняя пластина площадки

		//	itemAdd ("Пластина", "Задняя пластина промежуточной площадки", "Металлический цех", "platformBackStringer", 1);
		item = {
		    id:  "platformBackStringer",
		    amt: 1,
		    discription: "Задняя пластина промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// метизы

		var stairBoltAmt = 0;
		var carcasBoltAmt = 0;
		var longBoltAmt = 0;
		var stepScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// сквозное крепление уголков щитов (на перемычках)
		if(bridgeAmt > 1)
		    longBoltAmt = longBoltAmt + 4 * (bridgeAmt - 1);

		// сквозное крепление уголков каркаса (на внутреннем косоуре)
		if(topStairAmt > 0)
		    longBoltAmt = longBoltAmt + 4;

		// крепление уголков каркаса
		carcasBoltAmt = carcasBoltAmt + carcasAngleAmt * 4;

		// вычитание креплений уголков каркаса, крепящихся через внутренний косоур насквозь
		if(topStairAmt > 0)
		    carcasBoltAmt = carcasBoltAmt - 4 * 2;

		// крепление уголков щитов
		stairBoltAmt = stairBoltAmt + (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;

		// вычитание креплений уголков перемычек, крепящихся насквозь
		stairBoltAmt = stairBoltAmt - 4 * (bridgeAmt - 1) * 2;

		// крепление щитов
		stepScrewAmt = stepScrewAmt + (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;

		

		//метизы каркаса
		
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;		
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей каркаса промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозное крепление деталей промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление деталей каркаса промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление деталей каркаса промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
		//метизы уголков ступеней
		
		nutAmt = stairBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt * 2;
		
		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление уголков промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		
		if(params.stairType != "нет"){
		    item = {
				id:  treadScrewName,
				amt: stepScrewAmt,
				discription: "Крепление щитов промежуточной площадки",
				unit: "angles_platform_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
		}

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков промежуточной площадки",
		    unit: "angles_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

    } // end of angles_platform_90_ItemsAdd()


// функция добавления позиций промежуточной площадки (ЛТ4)
    function angles_platform_180_ItemsAdd(bottomStairAmt, topStairAmt) {

		// определение кол-ва щитов промежуточной площадки
		if(params.model == "лт")
		    var platformTrueLength = M + 7;
		if(params.model == "ко")
		    var platformTrueLength = M + 0;

		var itemAmount = 2;

	// добавление позиций в спецификацию		
	if(params.stairType != "нет") {
		item = {
		    id:  "platformShield",
		    amt: itemAmount,
		    discription: "Щиты промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Ступени",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
			addTimberWorks("rect", "platformShield", 2, partsList);
			
		}

		
		// уголлки карсаса на передней пластине площадки
		var carcasAngleAmt = 8;

		// уголлки карсаса на задней пластине площадки
		carcasAngleAmt += 4;
		
		// уголлки карсаса на средней пластине площадки
		carcasAngleAmt += 4;

		// уголки крепления переднего щита
		var angleAmt200 = 12;

		// уголки крепления заднего щита
		angleAmt200 += 12;

		// дополнительные уголки крепления щитов при их кол-ве 3 и более
		if(itemAmount > 2)
		    angleAmt200 += 2 * 6 * (itemAmount - 2);

		// добавление позиций в спецификацию

		item = {
		    id:  "angle200",
		    amt: angleAmt200,
		    discription: "Уголок крепления ступени",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок крепления деталей каркаса",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);


		// боковые пластины площадки

		item = {
		    id:  "platformSideStringer",
		    amt: 2,
		    discription: "Передняя и задняя пластины промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// перемычки площадки

		item = {
		    id:  "platformBridge",
		    amt: 2,
		    discription: "Перемычка площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// метизы

		var stairBoltAmt = 0;
		var carcasBoltAmt = 0;
		var longBoltAmt = 0;
		var longBoltAmt1 = 0;
		var stepScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// сквозное крепление уголков каркаса на передней пластине
	    longBoltAmt += 8;
		// крепление уголков каркаса
		carcasBoltAmt += carcasAngleAmt * 4 - longBoltAmt * 2;
		

		// сквозное крепление уголков щитов (на передней пластине)
		longBoltAmt1 += 8;		
		// крепление уголков щитов
		stairBoltAmt += angleAmt200 * 2 - longBoltAmt1 * 2;
		
		// крепление щитов
		stepScrewAmt = stepScrewAmt + angleAmt200 * 2;


		//метизы каркаса
		
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление уголков каркаса промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозное крепление уголков каркаса промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков каркаса промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков каркаса промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
		//метизы уголков ступеней
		
		nutAmt = stairBoltAmt + longBoltAmt1;
		shimAmt = nutAmt + longBoltAmt1;
		
		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление уголков щитов промежуточной площадки",
			unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "bolt_M10x30",
		    amt: longBoltAmt1,
		    discription: "Сквозное крепление уголков щитов промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков щитов промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков щитов промежуточной площадки",
		    unit: "angles_platform_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		if(params.stairType != "нет"){
		    item = {
				id:  treadScrewName,
				amt: stepScrewAmt,
				discription: "Крепление щитов промежуточной площадки",
				unit: "angles_platform_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
		}

		

    } // end of angles_platform_180_ItemsAdd


// функция добавления позиций забежной группы (ЛТ3)
    function angles_zabeg_90_ItemsAdd(a_top, bottomStairAmt, topStairAmt) {

		

		// добавление позиций ступеней в спецификацию
		if(params.stairType != "нет"){
		
		    item = {
				id:  "winderTread1",
				amt: 1,
				discription: "Первая снизу забежная ступень",
				unit: "angles_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "winderTread2",
				amt: 1,
				discription: "Вторая снизу забежная ступень",
				unit: "angles_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "winderTread3",
				amt: 1,
				discription: "Третья снизу забежная ступень",
				unit: "angles_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("winder", "winderTread1", 1, partsList);
			addTimberWorks("winder", "winderTread2", 1, partsList);
			addTimberWorks("winder", "winderTread3", 1, partsList);
			

			
		}

		var angleAmt90 = 0;
		var angleAmt160 = 0;
		var angleAmt200 = 0;
		var angleAmt230 = 0;
		var angleAmt100 = 0;

		
		// перемычка на первой забежной ступени
		var bridgeAmt = 1;

		// уголки каркаса крепления перемычек
		var carcasAngleAmt = bridgeAmt * 2;

		// уголки каркаса крепления косоуров, 2 на внешние косоуры, 2 на внутренние
		carcasAngleAmt += 2 + 2;

		// уголки крепления ступеней на перемычках
		var angleAmt200 = bridgeAmt * 2;

		// уголки крепления ступеней на косоурах

		// 1 на первой, 2 на второй, 2 на третьей
		angleAmt200 += 1 + 2 + 2;

		// 1 на второй, 1 на третьей
		angleAmt90 += 1 + 1;

		//корректируем уголки на забеге при узком марше
		
		if(params.M <= 700) { 
		    angleAmt200 -= 5;
		    angleAmt160 += 5;
			}
		
		

		// добавление позиций в спецификацию

		//	itemAdd ("У2-40х40х90", "Уголок крепления ступени", "Склад", "angle90", angleAmt90);
		item = {
		    id:  "angle90",
		    amt: angleAmt90,
		    discription: "Уголок крепления забежной ступени",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У2-40х40х160", "Уголок крепления ступени", "Склад", "angle160", angleAmt160);
		item = {
		    id:  "angle160",
		    amt: angleAmt160,
		    discription: "Уголок крепления забежной ступени",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У2-40х40х200", "Уголок крепления ступени", "Склад", "angle200", angleAmt200);
		item = {
		    id:  "angle200",
		    amt: angleAmt200,
		    discription: "Уголок крепления забежной ступени",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У2-40х40х230", "Уголок крепления ступени", "Склад", "angle230", angleAmt230);
		item = {
		    id:  "angle230",
		    amt: angleAmt230,
		    discription: "Уголок крепления забежной ступени",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У4-60х60х100", "Уголок крепления деталей каркаса", "Склад", "carcasAngle", carcasAngleAmt);
		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("Перемычка", "Перемычка забежной группы", "Металлический цех", "zabegBridge", bridgeAmt);
		item = {
		    id:  "zabegBridge",
		    amt: bridgeAmt,
		    discription: "Перемычка забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);


		// метизы

		var stairBoltAmt = 0;
		var carcasBoltAmt = 0;
		var longBoltAmt = 0;
		var stepScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// сквозное крепление уголков каркаса (соединяющих внутренние косоуры и того, что на перемычке первой забежной ступени)
		longBoltAmt = longBoltAmt + 2;

		// крепление уголков каркаса
		carcasBoltAmt = carcasBoltAmt + carcasAngleAmt * 4 - longBoltAmt * 2;

		// крепление уголков ступеней
		stairBoltAmt = stairBoltAmt + (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;

		// крепление ступени
		stepScrewAmt = stepScrewAmt + (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;

		
		//метизы каркаса
		
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозное крепление деталей забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление деталей каркаса забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление деталей каркаса забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
		//метизы уголков ступеней
		
		nutAmt = stairBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt * 2;	
		
		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление уголков забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		
		if(params.stairType != "нет"){
		    item = {
				id:  treadScrewName,
				amt: stepScrewAmt,
				discription: "Крепление забежных ступеней",
				unit: "angles_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
		}

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков забежной группы",
		    unit: "angles_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
    } // end of angles_zabeg_90_ItemsAdd()


// функция добавления позиций забежной группы (ЛТ5)
    function angles_zabeg_180_ItemsAdd(a_top, bottomStairAmt, topStairAmt) {

		var bridgeAmt = 0;
		var angleAmt90 = 0;
		var angleAmt160 = 0;
		var angleAmt200 = 0;
		var angleAmt230 = 0;
		var angleAmt100 = 0;
		var carcasAngleAmt = 0;

		// добавление позиций ступеней в спецификацию
		if(params.stairType != "нет"){
		
		    item = {
				id:  "winderTread1",
				amt: 2,
				discription: "Первая и четвертая снизу забежные ступени",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread2",
				amt: 2,
				discription: "Вторая и пятая снизу забежные ступени",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread3",
				amt: 1,
				discription: "Третья снизу забежная ступень",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread6",
				amt: 1,
				discription: "Шестая снизу забежная ступень",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("winder", "winderTread1", 2, partsList);
			addTimberWorks("winder", "winderTread2", 2, partsList);
			addTimberWorks("winder", "winderTread3", 1, partsList);
			addTimberWorks("winder", "winderTread6", 1, partsList);
			
		}
		
		// перемычка на первой забежной ступени
		bridgeAmt += 1;

		// перемычка на четвертой забежной ступени
		bridgeAmt += 1;

		/*
		// перемычка на первой прямой ступени после третьей забежной ступени при наличии вышестоящего марша
		if(topStairAmt > 1) {
		    bridgeAmt = bridgeAmt + 1;
		    angleAmt90 = angleAmt90 + 2;

		    // удаление уголков ступеней вышестоящего марша
		    if(a_top >= 285) {
			angleAmt230 = angleAmt230 - 2;
		    }
		    if(260 <= a_top && a_top < 285) {
			angleAmt230 = angleAmt230 - 2;
		    }
		    if(230 <= a_top && a_top < 260) {
			angleAmt200 = angleAmt200 - 2;
		    }
		    if(a_top < 230) {
			angleAmt160 = angleAmt160 - 2;
		    }

		}
*/
		// уголки каркаса крепления перемычек
		carcasAngleAmt = bridgeAmt * 2;

		// уголки каркаса крепления косоуров, 4 на внешние косоуры, 4 на внутренние
		carcasAngleAmt += 4 + 4;

		// уголки крепления ступеней на перемычках
		angleAmt200 += bridgeAmt * 2;

		// уголки крепления ступеней на косоурах

		// 1 на первой, 2 на второй, 2 на третьей, 1 на четвертой, 2 на пятой, 2 на шестой
		angleAmt200 = angleAmt200 + 1 + 2 + 2 + 1 + 2 + 2;

		// 1 на второй, 1 на третьей, 1 на пятой, 1 на шестой
		angleAmt90 = 4;

		//корректируем уголки на забеге в зависимости от ширины марша
		if(params.M < 820) { //вторая и пятая забежные ступени
		    angleAmt200 = angleAmt200 - 2;
		    angleAmt90 = angleAmt90 + 2;
		}

		if(params.M < 780) { //третья и шестая забежные ступени
		    angleAmt200 = angleAmt200 - 2;
		    angleAmt90 = angleAmt90 + 2;
		}

		// добавление позиций в спецификацию

		//	itemAdd ("У2-40х40х90", "Уголок крепления ступени", "Склад", "angle90", angleAmt90);
		item = {
		    id:  "angle90",
		    amt: angleAmt90,
		    discription: "Уголок крепления забежных ступеней",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У2-40х40х160", "Уголок крепления ступени", "Склад", "angle160", angleAmt160);
		item = {
		    id:  "angle160",
		    amt: angleAmt160,
		    discription: "Уголок крепления забежных ступеней",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У2-40х40х200", "Уголок крепления ступени", "Склад", "angle200", angleAmt200);
		item = {
		    id:  "angle200",
		    amt: angleAmt200,
		    discription: "Уголок крепления забежных ступеней",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У2-40х40х230", "Уголок крепления ступени", "Склад", "angle230", angleAmt230);
		item = {
		    id:  "angle230",
		    amt: angleAmt230,
		    discription: "Уголок крепления забежных ступеней",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("У4-60х60х100", "Уголок крепления деталей каркаса", "Склад", "carcasAngle", carcasAngleAmt);
		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок каркаса забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		//	itemAdd ("Перемычка", "Перемычка забежной группы", "Металлический цех", "zabegBridge", bridgeAmt);
		item = {
		    id:  "bridge",
		    amt: bridgeAmt,
		    discription: "Перемычка забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);


		// метизы

		var stairBoltAmt = 0;
		var carcasBoltAmt = 0;
		var longBoltAmt = 0;
		var stepScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// сквозное крепление уголков каркаса (соединяющих внутренние косоуры и тех, что на перемычках первой и четвертой забежных ступеней)
		longBoltAmt = longBoltAmt + 2 + 2;

		// крепление уголков каркаса
		carcasBoltAmt = carcasBoltAmt + carcasAngleAmt * 4 - longBoltAmt * 2;

		// крепление уголков ступеней
		stairBoltAmt = stairBoltAmt + (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;

		// крепление ступени
		stepScrewAmt = stepScrewAmt + (angleAmt90 + angleAmt160 + angleAmt200 + angleAmt230) * 2;
//console.log(angleAmt90,angleAmt160,angleAmt200,angleAmt230)
		//console.log(stepScrewAmt)
		//метизы каркаса
		
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;			
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозное крепление деталей забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление деталей каркаса забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление деталей каркаса забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
		//метизы уголков ступеней
		
		nutAmt = stairBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt * 2;	
		
		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление уголков забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		
		if(params.stairType != "нет"){
		    item = {
				id:  treadScrewName,
				amt: stepScrewAmt,
				discription: "Крепление забежных ступеней",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
		}

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков забежной группы",
		    unit: "angles_zabeg_180_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

    } // end of angles_zabeg_180_ItemsAdd()


// функция добавления прямых ступеней марша

function frames_marshItemsAdd(stairAmt, marshName) {

		var stringerFlangeAmt = 0;

		// определение размеров рамок
		if(params.model == "лт"){
			 var frameLength = params.M - 2 * stringerThickness;
			 var frameWidth = 0;
			 if(marshName == "нижний") frameWidth = params.a1;
			 if(marshName == "средний") frameWidth = params.a2;
			 if(marshName == "верхний") frameWidth = params.a3;
			 if(params.stairType != "рифленая сталь" && params.stairType != "рифленый алюминий")
				frameWidth = frameWidth - 40;
			if(params.stairType == "дпк") frameWidth = 285;	
			}
		   
		if(params.model == "ко"){
		    var frameLength = params.M - 2 * params.sideOverHang - 2 * stringerThickness;
			var frameWidth = 0;
			if(marshName == "нижний") frameWidth = params.b1;
			if(marshName == "средний") frameWidth = params.b2;
			if(marshName == "верхний") frameWidth = params.b3;			
			}
		
		var frameId = "treadFrame_marsh1";
		if(marshName == "средний") {
				frameId = "treadFrame_marsh2";
				}
			if(marshName == "верхний") {
				frameId = "treadFrame_marsh3";
				}

		if(params.stairType != "нет"){
			var treadId = "rectTread_marsh1";
			var riserId = "riser_marsh1";
			if(marshName == "средний") {
				treadId = "rectTread_marsh2";
				riserId = "riser_marsh2";
				}
			if(marshName == "верхний") {
				treadId = "rectTread_marsh3";
				riserId = "riser_marsh3";
				}
			
		//первый подступенок марша
		var firstRiserId = "no";
		if(marshName == "нижний") firstRiserId = "firstRiser_marsh1";
		if(marshName == "средний" && params.turnType_1 == "площадка") firstRiserId = "firstRiser_marsh2";
		if(marshName == "верхний"){
			if(params.stairModel == "Г-образная с площадкой" || 
				params.stairModel == "П-образная с площадкой" ||
				(params.stairModel == "П-образная трехмаршевая" && params.turnType_2 == "площадка")
				)
				 firstRiserId = "firstRiser_marsh3";
			}
				
				
		//последняя ступень другая
		var isLastTreadDif = false;
		if (params.model == "ко" && params.riserType == "есть" && params.topAnglePosition != "вертикальная рамка"){
			isLastTreadDif = true;	
			}
		if(params.model =="лт" && params.topAnglePosition == "вертикальная рамка")
			isLastTreadDif = true;
		
		if((marshName == "верхний" || params.stairModel == "Прямая") && isLastTreadDif){
			item = {
				id:  "lastStair",
				amt: 1,
				discription: "Последняя ступень марша",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
		
		var stairAmtFullSize = stairAmt; //кол-во полноразмерных ступеней
		if((marshName == "верхний" || params.stairModel == "Прямая") && isLastTreadDif) stairAmtFullSize -= 1;
			
			item = {
				id:  treadId,
				amt: stairAmtFullSize,
				discription: "Ступени " + marshName + " марш",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			
		//вертикальная рамка
		var isVerticalFrame = false;
		if(params.topAnglePosition == "вертикальная рамка"){
			if(params.stairModel == "Прямая") isVerticalFrame = true;
			if(marshName == "верхний") isVerticalFrame = true;
			}
//			console.log(isVerticalFrame)		
		if(isVerticalFrame){	
			item = {
				id:  "smallStair",
				amt: 1,
				discription: "Ступени вертикальной рамки марш",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "lastRiser",
				amt: 1,
				discription: "Подступенок вертикальной рамки марш",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  treadScrewName,
				amt: 4,
				discription: "Крепление урезанной ступени к рамке",
				unit: marshName + " марш",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
		
		

		//расчет объема для фот
		addTimberWorks("rect", treadId, stairAmt, partsList);
					
			
		if(params.riserType == "есть") {
			var riserAmt = stairAmt
			if(firstRiserId != "no") riserAmt -= 1;
			if(riserAmt < 0) riserAmt = 0;
		    item = {
				id:  riserId,
				amt: riserAmt,
				discription: "Подступенки марша",
				unit: marshName + " марш",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", riserId, riserAmt, partsList);
			
			if(firstRiserId != "no"){
				item = {
					id:  firstRiserId,
					amt: 1,
					discription: "Первый подступенки марша",
					unit: marshName + " марш",
					itemGroup: "Ступени",
					};
				if(item.amt > 0) partsList.addItem(item);			
				//расчет объема для фот
				addTimberWorks("rect", firstRiserId, 1, partsList);
				}
			}	
		}

		var isLastFrameFix = false;
		var fixFrameAmt = 0;
		if(params.topAnglePosition == "рамка верхней ступени"){
			if(params.stairModel == "Прямая") fixFrameAmt = 1;
			if(marshName == "верхний") fixFrameAmt = 1;						
			}
		
	 if(params.stairType != "рифленая сталь"){
		item = {
		    id:  frameId,
		    amt: stairAmt - fixFrameAmt,
		    discription: "Рамка ступени",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "lastFrame",
		    amt: fixFrameAmt,
		    discription: "Последняя рамка верхнего марша",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		}

	// крепление рамок ступеней
	var frameBoltAmt = 4 * stairAmt;
	var nutAmt = frameBoltAmt;
	var shimAmt = frameBoltAmt;
	//if(params.boltHead == "hexagon") shimAmt = shimAmt + frameBoltAmt;
		
		item = {
		    id: stairBoltId,
		    amt: frameBoltAmt,
		    discription: "Крепление прямых рамок",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление прямых рамок",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление прямых рамок",
		    unit: marshName + " марш",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
	

	//Крепление покрытия ступеней
		if(params.stairType == "сосна кл.Б" ||
			params.stairType == "сосна экстра"||		
			params.stairType == "береза паркет."||
			params.stairType == "лиственница паркет."||
			params.stairType == "дуб паркет."|| 
			params.stairType == "дуб ц/л") {
				item = {
					id:  treadScrewName,
					amt: stairAmt * 4,
					discription: "Крепление ступеней",
					unit: marshName + " марш",
					itemGroup: "Крепление ступеней",
					};
				if(item.amt > 0) partsList.addItem(item);				
				}

		if(params.stairType == "рифленый алюминий"){
			var boltPerTread = 8;
			if(params.M < 1000) boltPerTread = 6;
			item = {
				id:  "bolt_M6x20",
				amt: stairAmt * boltPerTread,
				discription: "Крепление рифленого листа к рамке",
				unit: marshName + " марш",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "shim_M6",
				amt: stairAmt * boltPerTread * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: marshName + " марш",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "nut_M6",
				amt: stairAmt * boltPerTread,
				discription: "Крепление рифленого листа к рамке",
				unit: marshName + " марш",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
			
	 	if(params.stairType == "дпк"){			
			}
		if(params.stairType == "стекло"){			
			}
		


	// крепление подступенков
	if(params.riserType == "есть" && params.stairType != "нет") {
		riserScrewTopAmt = 3 * stairAmt;
		riserScrewBotAmt = 3 * stairAmt;
		
		item = {
			id:  riserScrewName,
			amt: riserScrewBotAmt,
			discription: "Нижнее крепление подступенков",
			unit: marshName + " марш",
			itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id:  riserScrewName,
			amt: riserScrewTopAmt,
			discription: "Верхнее крепление подступенков",
			unit: marshName + " марш",
			itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		}		

} // end of frames_marshItemsAdd()


// функция добавления позиций верхней площадки
    function frames_platformTopItemsAdd() {

		var angleAmt100 = 0;
		var carcasAngleAmt = 0;

		// добавление пластин

		item = {
		    id:  "sidePlatformTopStringer",
		    amt: 2,
		    discription: "Боковая пластина верхней площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		if(params.platformRearStringer == "есть"){
		    item = {
				id:  "backPlatformTopStringer",
				amt: 1,
				discription: "Задняя пластина верхней площадки",
				unit: "frames_platformTopItemsAdd",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			}

		// определение ширины рамок
		if(params.model == "лт")
		    var itemName = "Рамка 200х" + (params.M - 2 * stringerThickness) + " мм";
		if(params.model == "ко")
		    var itemName = "Рамка 200х" + (params.M - 2 * params.sideOverHang - 2 * stringerThickness) + " мм";

		// определение кол-ва щитов
		var platformTopShieldAmt = Math.ceil(params.platformLength_3/600);

		// уголки крепления задней пластины
		if(params.platformRearStringer == "есть")
		    carcasAngleAmt = carcasAngleAmt + 2;

		// уголки крепления к перекрытию
		if(params.platformRearStringer == "нет")
		    angleAmt100 = angleAmt100 + 2;

		if(params.platformLength_3 > 600) {

		}

		// добавление позиций в спецификацию
if(params.stairType != "нет") {
		item = {
		    id:  "platformShield_top",
		    amt: platformTopShieldAmt,
		    discription: "Щиты верхней площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Ступени",
		};
		if(item.amt > 0) partsList.addItem(item);	
		
		//расчет объема для фот
			addTimberWorks("rect", "platformShield_top", platformTopShieldAmt, partsList);
			
			
		if(params.riserType == "есть") {
			item = {
				id:  "riser_marsh3",
				amt: 1,
				discription: "Подступенок площадки",
				unit: "frames_platformTopItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "riser_marsh3", 1, partsList);
			
			
			}
			
		}
	if(params.stairType != "рифленая сталь"){
		item = {
		    id:  "platformFrame_top",
		    amt: platformTopShieldAmt,
		    discription: "Рамка верхней площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		}

		item = {
		    id:  "angle100",
		    amt: angleAmt100,
		    discription: "Уголок крепления к перекрытию",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок верхней площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		var platformTopFlan = 0;
		if(params.model == "ко") platformTopFlan = 2;
		item = {
		    id:  "platformTopFlan",
		    amt: platformTopFlan,
		    discription: "Фланец крепления боковых пластин верхней площадки к маршевым",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// метизы

		var carcasBoltAmt = 0;
		var frameScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// крепление уголков крепления к перекрытию
		carcasBoltAmt = carcasBoltAmt + angleAmt100 * 2;

		// крепление уголков каркаса
		carcasBoltAmt = carcasBoltAmt + carcasAngleAmt * 4;

		// крепление фланцев перекрытия

		// крепление соединительных фланцев
		carcasBoltAmt = carcasBoltAmt + 4 * platformTopFlan;

		// крепление рамок щитов
		var frameBoltAmt = 4 * (params.platformTopShieldAmt + 1);

		// крепление щитов
		frameScrewAmt = frameScrewAmt + 4 * (params.platformTopShieldAmt + 1);

		

	//метизы каркаса
		
		nutAmt = carcasBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;	

		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей каркаса",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление деталей",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление деталей",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		
		
		//метизы рамок
		
		nutAmt = frameBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + frameBoltAmt;	
		
		item = {
		    id: carcasBoltId,
		    amt: frameBoltAmt,
		    discription: "Крепление рамок площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление рамок верхней площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление рамок верхней площадки",
		    unit: "frames_platformTopItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		

	if(params.stairType != "нет") {		
		if(params.stairType == "сосна кл.Б" ||
			params.stairType == "сосна экстра"||
			params.stairType == "береза паркет."||
			params.stairType == "лиственница паркет."||			
			params.stairType == "дуб паркет."|| 
			params.stairType == "дуб ц/л") {
				item = {
					id:  treadScrewName,
					amt: frameScrewAmt,
					discription: "Крепление ступеней",
					unit: "frames_platformTopItemsAdd",
					itemGroup: "Крепление ступеней",
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id:  riserScrewName,
					amt: 6,
					discription: "Нижнее крепление подступенка верхней площадки",
					unit: "frames_platformTopItemsAdd",
					itemGroup: "Крепление ступеней",
				};
				if(item.amt > 0) partsList.addItem(item);
				
				

				
				}

		if(params.stairType == "рифленый алюминий"){
			var boltPerTread = 8;
			if(params.M < 1000) boltPerTread = 6;
			item = {
				id:  "bolt_M6x20",
				amt: frameScrewAmt * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_platformTopItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "shim_M6",
				amt: frameScrewAmt * 2 * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_platformTopItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "nut_M6",
				amt: frameScrewAmt * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_platformTopItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
	 	if(params.stairType == "дпк"){
			
			}
		if(params.stairType == "стекло"){
			
			}
			
			
	}

} // end of frames_platformTopItemsAdd()


// функция добавления позиций промежуточной площадки (КО/ЛТ-2)
    function frames_platform_90_ItemsAdd(topStairAmt, preTopMarsh) {
		
		// вычисление кол-ва щитов площадки
		if(params.model == "лт")
		    var platformTrueLength = params.M + 16;
		if(params.model == "ко")
		    var platformTrueLength = params.M + 50;

		var platformShieldAmt = Math.ceil(platformTrueLength/600);


		// добавление позиций рамок в спецификацию
		var itemId = "platformFrame";
		if(preTopMarsh && params.model == "ко" && params.stairModel == "П-образная трехмаршевая") 
			itemId = "platformFrame2";
		if(params.stairType != "рифленая сталь"){
			item = {
				id:  itemId,
				amt: platformShieldAmt,
				discription: "Рамка под ступень",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			}

		var angleAmt90 = 0;		
		var platformFlan = 0;
		if(params.model == "ко") {
			platformFlan = 2; // фланцы соединения пластин площадки с тетивами нижнего марша
			angleAmt90 = 2; // уголки крепления ступеней на задней пластине
			}

		
		

		// уголки соединения пластин
		var carcasAngleAmt = 2;
		// уголки за боковой пластиной под первой прямой ступенью вышестоящего марша
		if(topStairAmt > 0) carcasAngleAmt += 2;

		// добавление позиций в спецификацию

		if(params.stairType != "нет") {
			item = {
				id:  "platformShield",
				amt: platformShieldAmt,
				discription: "Щиты промежуточной площадки",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "platformShield", platformShieldAmt, partsList);
			}
			
		if(params.riserType == "есть" && params.stairType != "нет"){	
			var riserId = "riser_marsh1";
			if(params.stairModel == "П-образная трехмаршевая" && preTopMarsh == true) 
				riserId = "riser_marsh2";
			item = {
				id:  riserId,
				amt: 1,
				discription: "Подступенок промежуточной площадки",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", riserId, 1, partsList);
			
			};
		
		item = {
		    id:  "angle90",
		    amt: angleAmt90,
		    discription: "Крепление щитов площадки на задней тетиве",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок крепления деталей каркаса",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// боковые пластины
		if(params.model == "ко" && params.stringerDivision == "есть"){
			item = {
				id:  "platformSideStringer",
				amt: 2,
				discription: "Боковая пластина промежуточной площадки",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "pltFlan",
				amt: 2,
				discription: "Фланец площадки",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Каркас",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			}

		// задняя пластина площадки

		item = {
		    id:  "platformBackStringer",
		    amt: 1,
		    discription: "Задняя пластина промежуточной площадки",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
			
			
			


		// метизы

		var stairBoltAmt = 0;
		var carcasBoltAmt = 0;
		var longBoltAmt = 0;
		var stepScrewAmt = 0;
		var frameScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// крепление уголков щитов к задней пластине
		stairBoltAmt = 2 * angleAmt90;

		// крепление рамок щитов
		stairBoltAmt = stairBoltAmt + 4 * platformShieldAmt;
		

		// крепление уголков каркаса
		carcasBoltAmt = 4 * carcasAngleAmt;

		// крепление соединительных фланцев косоуров и боковых пластин
		if(params.stringerDivision == "есть") carcasBoltAmt += 4 * platformFlan;

		// крепление щитов
		frameScrewAmt = frameScrewAmt + 4 * platformShieldAmt;
		stepScrewAmt = stepScrewAmt + 2 * angleAmt90;

		// сквозное крепление уголков на внутреннем косоуре
		longBoltAmt = longBoltAmt + 2;

		// коррекция крепления уголков
		carcasBoltAmt = carcasBoltAmt - 2 * longBoltAmt;

		//метизы каркаса
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;

		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей каркаса",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозное крепление деталей",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление деталей",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление деталей",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		//метизы рамок
		nutAmt = stairBoltAmt;
		shimAmt = nutAmt;
		
		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление рамок промежуточной площадки",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
			discription: "Крепление рамок промежуточной площадки",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление рамок промежуточной площадки",
		    unit: "frames_platform_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		
		if(params.stairType != "нет"){
		
		if(params.stairType == "сосна кл.Б" ||
			params.stairType == "сосна экстра"||
			params.stairType == "береза паркет."||
			params.stairType == "лиственница паркет."||
			params.stairType == "дуб паркет."|| 
			params.stairType == "дуб ц/л") {
				
				 item = {
					id:  treadScrewName,
					amt: frameScrewAmt,
					discription: "Крепление цитов к рамкам",
					unit: "frames_platform_90_ItemsAdd",
					itemGroup: "Крепление ступеней",
					};
					if(item.amt > 0) partsList.addItem(item);
			
				item = {
					id:  treadScrewName,
					amt: stepScrewAmt,
					discription: "Крепление ступеней",
					unit: "frames_platform_90_ItemsAdd",
					itemGroup: "Крепление ступеней",
					};
				if(item.amt > 0) partsList.addItem(item);
				
				if(params.riserType == "есть"){
					item = {
						id:  riserScrewName,
						amt: 6,
						discription: "Крепление подступенка площадки",
						unit: "frames_platform_90_ItemsAdd",
						itemGroup: "Крепление ступеней",				
						};
					if(item.amt > 0) partsList.addItem(item);
					}

				
				}

		if(params.stairType == "рифленый алюминий"){
			var boltPerTread = 8;
			if(params.M < 1000) boltPerTread = 6;
			item = {
				id:  "bolt_M6x20",
				amt: frameScrewAmt * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "shim_M6",
				amt: frameScrewAmt * 2 * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "nut_M6",
				amt: frameScrewAmt * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_platform_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			
			
			}
	 	if(params.stairType == "дпк"){
			
			}
		if(params.stairType == "стекло"){
			
			}
			
} //конец крепления ступеней

		

		
		
	//метизы рамок
	

    } // end of frames_platform_90_ItemsAdd()


// функция добавления позиций промежуточной площадки (КО/ЛТ4)
function frames_platform_180_ItemsAdd(topStairAmt) {

	if(params.model == "лт")
		var platformTrueLength = params.platformLength_1 + 7;
	if(params.model == "ко")
		var platformTrueLength = params.platformLength_1 + 0;

	var platformShieldAmt = Math.ceil(platformTrueLength/600);

	var frameAmt = 4;
		
	// рамки площадки
	if(params.model == "лт"){
			if(params.stairType != "рифленая сталь"){
			item = {
				id:  "platformFrame",
				amt: 4,
				discription: "Рамка промежуточной площадки большая",
				unit: "frames_platform_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);

			item = {
				id:  "platformFrame_mid",
				amt: 2,
				discription: "Рамка промежуточной площадки малая",
				unit: "frames_platform_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
		}
	if(params.model == "ко"){
		var frameLength = params.M - 2 * params.sideOverHang - 2 * stringerThickness;			
		//три рамки площадки шириной как в нижнем марше
		var frameWidth1 = params.b1;
		item = {
			id:  "platformFrame",
			amt: 4,
			discription: "Рамка площадки",
			unit: "промежуточная площадка",
			itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		/*
		//рамка площадки, примыкающая к верхнему маршу
		var frameWidth3 = params.b3;
		item = {
			id:  "platformFrame2",
			amt: 1,
			discription: "Рамка " + frameLength + "x" + frameWidth3 + "мм",
			unit: "промежуточная площадка",
			itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		*/
		}
	
	//крепление рамок площадки
	var carcasBoltAmt = frameAmt * 4;
	var nutAmt = carcasBoltAmt;
	var shimAmt = nutAmt;

	item = {
	    id: carcasBoltId,
	    amt: carcasBoltAmt,
	    discription: "Крепление рамок площадки",
	    unit: "промежуточная площадка",
	    itemGroup: "Крепление ступеней",
	};
	if(item.amt > 0) partsList.addItem(item);
		item = {
	    id:  "nut_M10",
	    amt: nutAmt,
	    discription: "Крепление рамок площадки",
	    unit: "промежуточная площадка",
	    itemGroup: "Крепление ступеней",
		};
	if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление рамок площадки",
		    unit: "промежуточная площадка",
		   itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);	
	

	// уголлки каркаса на передней пластине площадки
	var carcasAngleAmt = 0;
	if(params.model == "ко") {
		carcasAngleAmt = 8;
		var carcasBoltAmt = 16;
		var longBoltAmt = 8;		
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;	

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок каркаса на передней балке",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление уголков передней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Крепление уголков передней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков передней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков передней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);		
		}

		// уголлки карсаса на задней пластине площадки
		carcasAngleAmt = 4;
		var carcasBoltAmt = carcasAngleAmt * 4;
		nutAmt = carcasBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;	

		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок каркаса на задней балке",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление уголков задней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление уголков задней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление уголков задней балки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);	
		

	// уголки крепления щитов
	var angleAmt90 = 0;
	if(params.model == "ко") {
		angleAmt90 = 4;
		
		item = {
		    id:  "angle90",
		    amt: angleAmt90,
		    discription: "Крепления щитов промежуточной площадки",
		    unit: "промежуточная площадка",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id: stairBoltId,
		    amt: angleAmt90 * 2,
		    discription: "Крепление уголков щитов",
		    unit: "промежуточная площадка",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "nut_M10",
		    amt: angleAmt90 * 2,
		    discription: "Крепление уголков щитов",
		    unit: "промежуточная площадка",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: angleAmt90 * 2,
		    discription: "Крепление уголков щитов",
		    unit: "промежуточная площадка",
		    itemGroup: "Крепление ступеней",
		};
		if(item.amt > 0) partsList.addItem(item);		
		}
		

	//щиты площадки
	if(params.stairType != "нет"){
		item = {
			id:  "platformShield",
			amt: platformShieldAmt,
			discription: "Щиты промежуточной площадки",
			unit: "промежуточная площадка",
			itemGroup: "Ступени",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("rect", "platformShield", platformShieldAmt, partsList);
		
		var screwAmt = frameAmt * 4 + angleAmt90 * 2;
		
		if(params.stairType == "сосна кл.Б" ||
			params.stairType == "сосна экстра"||	
			params.stairType == "береза паркет."||
			params.stairType == "лиственница паркет."||
			params.stairType == "дуб паркет."|| 
			params.stairType == "дуб ц/л") {
				
				 item = {
					id:  treadScrewName,
					amt: screwAmt,
					discription: "Крепление покрытия площадки",
					unit: "промежуточная площадка",
					itemGroup: "Крепление ступеней",
					};
					if(item.amt > 0) partsList.addItem(item);
					
					if(params.riserType == "есть"){
						item = {
							id:  riserScrewName,
							amt: 6,
							discription: "Крепление подступенка площадки",
							unit: "промежуточная площадка",
							itemGroup: "Крепление ступеней",			
							};
						if(item.amt > 0) partsList.addItem(item);
						}
			
				}

		if(params.stairType == "рифленый алюминий"){

			item = {
				id:  "bolt_M6x20",
				amt: screwAmt * 2,
				discription: "Крепление покрытия площадки",
				unit: "промежуточная площадка",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "shim_M6",
				amt: screwAmt * 2 * 2,
				discription: "Крепление покрытия площадки",
				unit: "промежуточная площадка",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "nut_M6",
				amt: screwAmt * 2,
				discription: "Крепление покрытия площадки",
				unit: "промежуточная площадка",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			
			
			}
	 	if(params.stairType == "дпк"){
			
			}
		if(params.stairType == "стекло"){
			
			}
			
} //конец крепления покрытия площадки
	
		
	if(params.riserType == "есть" && params.stairType != "нет") {
	    item = {
			id:  "riser_marsh1",
			amt: 1,
			discription: "Подступенок помежуточной площадки",
			unit: "промежуточная площадка",
			itemGroup: "Ступени",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("rect", "riser_marsh1", 1, partsList);
			
		}

		


		item = {
		    id:  "platformFrontBackStringer",
		    amt: 2,
		    discription: "Передняя/задняя пластина промежуточной площадки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "platformSideInnerStringer",
		    amt: 4,
		    discription: "Боковая/внутренняя пластина промежуточной площадки",
		    unit: "промежуточная площадка",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
} // end of frames_platform_180_ItemsAdd()


// функция добавления позиций забежной группы (КО/ЛТ-3)
    function frames_zabeg_90_ItemsAdd(topStairAmt, preTopMarsh) {		

		// уголки каркаса крепления косоуров, 2 на внешние косоуры, 2 на внутренние
		var carcasAngleAmt = 2 + 2;
		if(params.stairModel == "П-образная трехмаршевая" && preTopMarsh == false && params.stairAmt1 == 0)
			carcasAngleAmt -= 1;
		if(params.stairModel != "П-образная трехмаршевая" && params.stairAmt1 == 0)
			carcasAngleAmt -= 1;

		var wndName = "нижний";
		if(params.stairModel == "П-образная трехмаршевая"&& preTopMarsh == true)
			wndName = "верхний";
		
		// добавление позиций в спецификацию
		if(params.stairType != "нет"){
		
		    item = {
				id:  "winderTread1",
				amt: 1,
				discription: "Первая снизу забежная ступень " + wndName + " забег",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread2",
				amt: 1,
				discription: "Вторая снизу забежня ступень " + wndName + " забег",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread3",
				amt: 1,
				discription: "Третья забежная ступень " + wndName + " забег",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);

			//расчет объема для фот
			addTimberWorks("winder", "winderTread1", 1, partsList);
			addTimberWorks("winder", "winderTread2", 1, partsList);
			addTimberWorks("winder", "winderTread3", 1, partsList);
			}
		
		if(params.riserType == "есть" && params.stairType != "нет") {
			var riserHeight = (params.h3 - params.treadThickness);
			var riserId_wnd1 = "riser_marsh1";
			var riserId_wnd2 = "riser_wnd2";
			var riserId_wnd3 = "riser_wnd3";
			
			if(params.stairModel == "П-образная трехмаршевая"){
				if(preTopMarsh == false){
					riserId_wnd1 = "riser_marsh1";
					riserId_wnd2 = "riser_wnd2";
					riserId_wnd3 = "riser_wnd3";
					}
				if(preTopMarsh == true){
					riserId_wnd1 = "riser_marsh2";
					riserId_wnd2 = "riser_wnd5";
					riserId_wnd3 = "riser_wnd6";
					}
				} 
			
			item = {
				id:  riserId_wnd1,
				amt: 1,
				discription: "Подступенок первой забежной ступени " + wndName + " забег",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  riserId_wnd2,
				amt: 1,
				discription: "Подступенок второй забежной ступени " + wndName + " забег",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			
			item = {
				id:  riserId_wnd3,
				amt: 1,
				discription: "Подступенок третьей забежной ступени " + wndName + " забег",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			
			//расчет объема для фот
			addTimberWorks("rect", riserId_wnd1, 1, partsList);
			addTimberWorks("rect", riserId_wnd2, 1, partsList);
			addTimberWorks("rect", riserId_wnd3, 1, partsList);
			}

		if(params.stairType != "рифленая сталь"){
		   item = {
				id:  "zabegStairFrame1",
				amt: 3,
				discription: "Рамки забежной группы",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "zabegStairFrame2",
				amt: 3,
				discription: "Рамки забежной группы",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "zabegStairFrame3",
				amt: 3,
				discription: "Рамки забежной группы",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
		item = {
		    id:  "carcasAngle",
		    amt: carcasAngleAmt,
		    discription: "Уголок каркаса забежной группы",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);

		// метизы

		var stairBoltAmt = 0;
		var carcasBoltAmt = 0;
		var longBoltAmt = 0;
		var frameScrewAmt = 0;
		var nutAmt = 0;
		var shimAmt = 0;

		// крепление рамок ступеней
		stairBoltAmt += 3 * 3;

		// крепление уголков каркаса
		carcasBoltAmt += 4 * carcasAngleAmt;
		
		if(params.model == "лт") {
			stairBoltAmt += 2;
			carcasBoltAmt -= 1;
			longBoltAmt += 1;
			}

		// крепление первой, второй и третьей забежных ступеней
		frameScrewAmt = frameScrewAmt + 5 + 9 + 6;


		//метизы каркаса
		nutAmt = carcasBoltAmt + longBoltAmt;
		shimAmt = nutAmt + longBoltAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;	
		
		item = {
		    id: carcasBoltId,
		    amt: carcasBoltAmt,
		    discription: "Крепление деталей каркаса",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "bolt_M10x40",
		    amt: longBoltAmt,
		    discription: "Сквозное крепление деталей",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление деталей",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление деталей",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//метизы рамок ступеней
		
		nutAmt = stairBoltAmt;
		shimAmt = nutAmt;
		//if(params.boltHead == "hexagon") shimAmt = shimAmt + stairBoltAmt;	

		item = {
		    id: stairBoltId,
		    amt: stairBoltAmt,
		    discription: "Крепление рамок забежных ступеней",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
			
		item = {
		    id:  "nut_M10",
		    amt: nutAmt,
		    discription: "Крепление рамок забежных ступеней",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: shimAmt,
		    discription: "Крепление рамок забежных ступеней",
		    unit: "frames_zabeg_90_ItemsAdd",
		    itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		

		if(params.stairType != "нет"){
			if(params.stairType == "сосна кл.Б" ||
				params.stairType == "сосна экстра"||		
				params.stairType == "береза паркет."||
				params.stairType == "лиственница паркет."||
				params.stairType == "дуб паркет."|| 
				params.stairType == "дуб ц/л") {
					item = {
						id:  treadScrewName,
						amt: frameScrewAmt,
						discription: "Крепление ступеней",
						unit: "frames_zabeg_90_ItemsAdd",
						itemGroup: "Крепление ступеней",
						};
					if(item.amt > 0) partsList.addItem(item);
					
					if(params.riserType == "есть"){
						item = {
							id:  riserScrewName,
							amt: 3 * 3,
							discription: "Нижнее крепление подступенков забега",
							unit: "frames_zabeg_90_ItemsAdd",
							itemGroup: "Крепление ступеней",			
							};
						if(item.amt > 0) partsList.addItem(item);
						
						item = {
							id:  wndRiserScrewName,
							amt: 3 * 3,
							discription: "Верхнее крепление подступенков забега",
							unit: "frames_zabeg_90_ItemsAdd",
							itemGroup: "Крепление ступеней",			
							};
						if(item.amt > 0) partsList.addItem(item);
						}
				}
				
				if(params.stairType == "рифленый алюминий"){
			var boltPerTread = 8;
			if(params.M < 1000) boltPerTread = 6;
			var stairAmt = 3;
			item = {
				id:  "bolt_M6x20",
				amt: stairAmt * boltPerTread,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "shim_M6",
				amt: stairAmt * boltPerTread * 2,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "nut_M6",
				amt: stairAmt * boltPerTread,
				discription: "Крепление рифленого листа к рамке",
				unit: "frames_zabeg_90_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
			
	 	if(params.stairType == "дпк"){			
			}
		if(params.stairType == "стекло"){			
			}
				
		  }

} // end of frames_zabeg_90_ItemsAdd


// функция добавления позиций забежной группы (КО/ЛТ-5)
function frames_zabeg_180_ItemsAdd(topStairAmt) {

	// забежные ступени
		if(params.stairType != "нет"){
		
		    item = {
				id:  "winderTread1",
				amt: 2,
				discription: "Первая и четвертая снизу забежные ступени",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread2",
				amt: 2,
				discription: "Вторая и пятая снизу забежные ступени",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread3",
				amt: 1,
				discription: "Третья снизу забежная ступень",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			 item = {
				id:  "winderTread6",
				amt: 1,
				discription: "Шестая снизу забежная ступень",
				unit: "angles_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("winder", "winderTread1", 2, partsList);
			addTimberWorks("winder", "winderTread2", 2, partsList);
			addTimberWorks("winder", "winderTread3", 1, partsList);
			addTimberWorks("winder", "winderTread6", 1, partsList);			
		}
	
	//подступенки
		if(params.riserType == "есть" && params.stairType != "нет") {
			
			item = {
				id:  "riser_marsh1",
				amt: 2,
				discription: "Подступенок первой и четвертой забежной ступени",
				unit: "frames_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "riser_wnd2",
				amt: 2,
				discription: "Подступенок второй и пятой забежной ступени",
				unit: "frames_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			
			item = {
				id:  "riser_wnd3",
				amt: 2,
				discription: "Подступенок третьей и шестой забежной ступени",
				unit: "frames_zabeg_180_ItemsAdd",
				itemGroup: "Ступени",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "riser_marsh1", 2, partsList);
			addTimberWorks("rect", "riser_wnd2", 2, partsList);
			addTimberWorks("rect", "riser_wnd3", 2, partsList); 
			
			}
	
	//рамки забежных ступеней
	if(params.stairType != "рифленая сталь"){
	
		item = {
			id:  "zabegStairFrame1",
			amt: 2,
			discription: "Рамки забежной группы",
			unit: "frames_zabeg_180_ItemsAdd",
			itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id:  "zabegStairFrame2",
			amt: 2,
			discription: "Рамки забежной группы",
			unit: "frames_zabeg_180_ItemsAdd",
			itemGroup: "Крепление ступеней",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//для ко 3 и 6 рамки одинаковые, а для лт разные
		if(params.model == "ко"){
			item = {
				id:  "zabegStairFrame3",
				amt: 2,
				discription: "Рамки забежной группы",
				unit: "frames_zabeg_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
		if(params.model == "лт"){
			item = {
				id:  "zabegStairFrame3",
				amt: 1,
				discription: "Рамки забежной группы",
				unit: "frames_zabeg_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id:  "zabegStairFrame6",
				amt: 1,
				discription: "Рамки забежной группы",
				unit: "frames_zabeg_180_ItemsAdd",
				itemGroup: "Крепление ступеней",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			}
			
		
		}

	// уголки каркаса: 4 на внешние косоуры, 4 на внутренние
	var carcasAngleAmt = 2 * 4;
	item = {
	    id:  "carcasAngle",
	    amt: carcasAngleAmt,
	    discription: "Уголок каркаса забежной группы",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	// крепление рамок ступеней
	var frameBoltAmt = 3 * 6;
	if(params.model == "лт") frameBoltAmt = 4 * 6;
	var nutAmt = frameBoltAmt;
	var shimAmt = frameBoltAmt;
	//if(params.boltHead == "hexagon") shimAmt = shimAmt + frameBoltAmt;
	
	item = {
	    id: stairBoltId,
	    amt: frameBoltAmt,
	    discription: "Крепление забежных рамок",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Крепление ступеней",
		};
	if(item.amt > 0) partsList.addItem(item);
	
	item = {
	    id:  "nut_M10",
	    amt: nutAmt,
	    discription: "Крепление забежных рамок",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Крепление ступеней",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
	    id:  "shim_M10",
	    amt: shimAmt,
	    discription: "Крепление забежных рамок",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Крепление ступеней",
		};
	if(item.amt > 0) partsList.addItem(item);
	
	// крепление уголков каркаса
	var carcasBoltAmt = 4 * carcasAngleAmt;
	var nutAmt = carcasBoltAmt;
	var shimAmt = carcasBoltAmt;
	//if(params.boltHead == "hexagon") shimAmt = shimAmt + carcasBoltAmt;
	
	item = {
	    id: stairBoltId,
	    amt: carcasBoltAmt,
	    discription: "Крепление уголков каркаса на забеге",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);
	
	item = {
	    id:  "nut_M10",
	    amt: nutAmt,
	    discription: "Крепление уголков каркаса на забеге",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
	    id:  "shim_M10",
	    amt: shimAmt,
	    discription: "Крепление уголков каркаса на забеге",
	    unit: "frames_zabeg_180_ItemsAdd",
	    itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	
	//шурупы ступеней
	if(params.stairType != "нет"){
		var frameScrewAmt = (5 + 9 + 6) * 2;
	  if(params.stairType == "сосна кл.Б" ||
			params.stairType == "сосна экстра"||		
			params.stairType == "береза паркет."||
			params.stairType == "лиственница паркет."||
			params.stairType == "дуб паркет."|| 
			params.stairType == "дуб ц/л") {
			   item = {
					id:  treadScrewName,
					amt: frameScrewAmt,
					discription: "Крепление забежных ступеней",
					unit: "frames_zabeg_180_ItemsAdd",
					itemGroup: "Крепление ступеней",
					};
				if(item.amt > 0) partsList.addItem(item);
				
				if(params.riserType == "есть"){
					item = {
						id:  riserScrewName,
						amt: 3 * 6,
						discription: "Нижнее крепление подступенков забега",
						unit: "frames_zabeg_90_ItemsAdd",
						itemGroup: "Крепление ступеней",			
						};
					if(item.amt > 0) partsList.addItem(item);
					
					item = {
						id:  wndRiserScrewName,
						amt: 3 * 6,
						discription: "Верхнее крепление подступенков забега",
						unit: "frames_zabeg_90_ItemsAdd",
						itemGroup: "Крепление ступеней",			
						};
					if(item.amt > 0) partsList.addItem(item);
					}
						
				}
				
				if(params.stairType == "рифленый алюминий"){
					var boltPerTread = 8;
					if(params.M < 1000) boltPerTread = 6;
					var stairAmt = 6;
					item = {
						id:  "bolt_M6x20",
						amt: stairAmt * boltPerTread,
						discription: "Крепление рифленого листа к рамке",
						unit: "frames_zabeg_90_ItemsAdd",
						itemGroup: "Крепление ступеней",
						};
					if(item.amt > 0) partsList.addItem(item);
					
					item = {
						id:  "shim_M6",
						amt: stairAmt * boltPerTread * 2,
						discription: "Крепление рифленого листа к рамке",
						unit: "frames_zabeg_90_ItemsAdd",
						itemGroup: "Крепление ступеней",
						};
					if(item.amt > 0) partsList.addItem(item);
					
					item = {
						id:  "nut_M6",
						amt: stairAmt * boltPerTread,
						discription: "Крепление рифленого листа к рамке",
						unit: "frames_zabeg_90_ItemsAdd",
						itemGroup: "Крепление ступеней",
						};
					if(item.amt > 0) partsList.addItem(item);			
					}
			
	 	if(params.stairType == "дпк"){			
			}
		if(params.stairType == "стекло"){			
			}
			
	}



} // end of frames_zabeg_180_ItemsAdd

// функция расчёта кол-ва перемычек в зависимости от числа прямых ступеней
    function calcMarshBridgesAmt(stairAmt) {

		/*задаем справочные данные по кол-ву стоек, перемычек
		 Первый индекс - кол-во ступеней в марше;
		 Второй индекс - параметры:
		 1 - кол-во стоек с одной стороны;
		 2 - кол-во перемычек;
		 */
		var marshParam = new Array(30);
		for(var i = 0; i < marshParam.length; i++)
		    marshParam[i] = new Array(50);

		/*кол-во стоек*/
		marshParam[0][1] = 0;
		marshParam[0][2] = 0;

		marshParam[1][1] = 0;
		marshParam[1][2] = 0;

		marshParam[2][1] = 2;
		marshParam[2][2] = 0;

		marshParam[3][1] = 2;
		marshParam[3][2] = 0;

		marshParam[4][1] = 2;
		marshParam[4][2] = 0;

		marshParam[5][1] = 3;
		marshParam[5][2] = 1;

		marshParam[6][1] = 3;
		marshParam[6][2] = 1;

		marshParam[7][1] = 3;
		marshParam[7][2] = 1;

		marshParam[8][1] = 4;
		marshParam[8][2] = 1;

		marshParam[9][1] = 4;
		marshParam[9][2] = 2;

		marshParam[10][1] = 4;
		marshParam[10][2] = 2;

		marshParam[11][1] = 5;
		marshParam[11][2] = 2;

		marshParam[12][1] = 5;
		marshParam[12][2] = 2;

		marshParam[13][1] = 5;
		marshParam[13][2] = 2;

		marshParam[14][1] = 6;
		marshParam[14][2] = 2;

		marshParam[15][1] = 6;
		marshParam[15][2] = 2;

		marshParam[16][1] = 6;
		marshParam[16][2] = 2;

		marshParam[17][1] = 7;
		marshParam[17][2] = 2;

		marshParam[18][1] = 7;
		marshParam[18][2] = 2;

		marshParam[19][1] = 7;
		marshParam[19][2] = 2;

		/*кол-во перемычек*/
		return marshParam[stairAmt][2];

    } // end of calcMarshBridgesAmt()


// функция расчёта кол-ва стоек в зависимости от числа прямых ступеней
    function calcMarshBanisterAmt(stairAmt) {
//	//console.log(stairAmt)
		/*задаем справочные данные по кол-ву стоек, перемычек
		 Первый индекс - кол-во ступеней в марше;
		 Второй индекс - параметры:
		 1 - кол-во стоек с одной стороны;
		 2 - кол-во перемычек;
		 */
		var marshParam = new Array(30);
		for(var i = 0; i < marshParam.length; i++)
		    marshParam[i] = new Array(50);

		/*кол-во стоек*/
		marshParam[0][1] = 0;
		marshParam[0][2] = 0;

		marshParam[1][1] = 0;
		marshParam[1][2] = 0;

		marshParam[2][1] = 2;
		marshParam[2][2] = 0;

		marshParam[3][1] = 2;
		marshParam[3][2] = 0;

		marshParam[4][1] = 2;
		marshParam[4][2] = 0;

		marshParam[5][1] = 3;
		marshParam[5][2] = 1;

		marshParam[6][1] = 3;
		marshParam[6][2] = 1;

		marshParam[7][1] = 3;
		marshParam[7][2] = 1;

		marshParam[8][1] = 4;
		marshParam[8][2] = 1;

		marshParam[9][1] = 4;
		marshParam[9][2] = 2;

		marshParam[10][1] = 4;
		marshParam[10][2] = 2;

		marshParam[11][1] = 5;
		marshParam[11][2] = 2;

		marshParam[12][1] = 5;
		marshParam[12][2] = 2;

		marshParam[13][1] = 5;
		marshParam[13][2] = 2;

		marshParam[14][1] = 6;
		marshParam[14][2] = 2;

		marshParam[15][1] = 6;
		marshParam[15][2] = 2;

		marshParam[16][1] = 6;
		marshParam[16][2] = 2;

		marshParam[17][1] = 7;
		marshParam[17][2] = 2;

		marshParam[18][1] = 7;
		marshParam[18][2] = 2;

		marshParam[19][1] = 7;
		marshParam[19][2] = 2;

		/*кол-во перемычек*/
		return marshParam[stairAmt][1];

    } // end of calcMarshBanisterAmt()


// функция добавления тетив
    function ltStringerAdd() {

		// ПРЯМАЯ

		if(params.stairModel == "Прямая") { // straight

		    // левый косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Левая тетива марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Левая тетива марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Левая тетива марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // правый косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Правая тетива марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Правая тетива марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Правая тетива марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of straight

		// Г-ОБРАЗНАЯ С ПЛОЩАДКОЙ

		if(params.stairModel == "Г-образная с площадкой") { // platform90

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }


		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of platform90


		// Г-ОБРАЗНАЯ С ЗАБЕГОМ

		if(params.stairModel == "Г-образная с забегом") { // zabeg90

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);				}
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of zabeg90


		// П-ОБРАЗНАЯ С ПЛОЩАДКОЙ

		if(params.stairModel == "П-образная с площадкой") { // platform180

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);				}
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);				}
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of platform180


		// П-ОБРАЗНАЯ С ЗАБЕГОМ

		if(params.stairModel == "П-образная с забегом") { // zabeg180

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);				}
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // забежная группа

		    item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива забежной группы",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
		    };
		    if(item.amt > 0) partsList.addItem(item);
		    item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива забежной группы",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
		    };
		    if(item.amt > 0) partsList.addItem(item);
		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of zabeg180


		// П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ

		if(params.stairModel == "П-образная трехмаршевая") { // 3marsh

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива нижнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // средний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива среднего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива среднего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива среднего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива среднего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива среднего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива среднего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренняя тетива верхнего марша",
			unit: "ltStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of 3marsh

    } // end of ltStringerAdd()


// функция добавления косоуров
    function koStringerAdd() {

		// ПРЯМАЯ

		if(params.stairModel == "Прямая") { // straight

		    // левый косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Левый косоур марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Левый косоур марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Левый косоур марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // правый косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Правый косоур марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Правый косоур марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Правый косоур марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of straight

		// Г-ОБРАЗНАЯ С ПЛОЩАДКОЙ

		if(params.stairModel == "Г-образная с площадкой") { // platform90

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of platform90


		// Г-ОБРАЗНАЯ С ЗАБЕГОМ

		if(params.stairModel == "Г-образная с забегом") { // zabeg90

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }


		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of zabeg90


		// П-ОБРАЗНАЯ С ПЛОЩАДКОЙ

		if(params.stairModel == "П-образная с площадкой") { // platform180

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }


		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of platform180


		// П-ОБРАЗНАЯ С ЗАБЕГОМ

		if(params.stairModel == "П-образная с забегом") { // zabeg180

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // забежная группа

		    item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур забежной группы",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
		    };
		    if(item.amt > 0) partsList.addItem(item);
		    item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур забежной группы",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
		    };
		    if(item.amt > 0) partsList.addItem(item);
		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of zabeg180


		// П-ОБРАЗНАЯ ТРЕХМАРШЕВАЯ

		if(params.stairModel == "П-образная трехмаршевая") { // 3marsh

		    // нижний марш

		    // внешний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt1 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt1 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур нижнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // средний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур среднего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур среднего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур среднего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур среднего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур среднего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур среднего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // верхний марш

		    // внешний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внешний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		    // внутренний косоур
		    if(params.stairAmt3 <= 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }
		    if(params.stairAmt3 > 10) {
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
			item = {
			id:  "stringer",
			amt: 1,
			discription:  "Внутренний косоур верхнего марша",
			unit: "koStringerAdd",
			itemGroup: "Каркас",
			};
			if(item.amt > 0) partsList.addItem(item);
		    }

		} // end of 3marsh

    } // end of koStringerAdd()


// функция подсчета стоек лестницы
    function calcTotalBanisterAmt() {

		var marshBanisterAmt = 0;

		// стойки

		if(params.stairModel == "Прямая") {

		    if(params.platformTop == "нет" && params.railingSide_1 != "нет") {

			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1);

			if(params.railingSide_1 == "две")
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1);
		    }

		    if(params.platformTop == "площадка" && railingSide_1 != "нет") {

			if(params.railingSide_1 == "две") {

			marshBanisterAmt = marshBanisterAmt + 2 * calcMarshBanisterAmt(params.stairAmt1 + 1);
			marshBanisterAmt = marshBanisterAmt + 2 * Math.round(params.platformLength_3/800);

			}

			if(params.railingSide_1 == "внешнее" || params.railingSide_1 == 'внутреннее') {

			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1 + 1);
			marshBanisterAmt = marshBanisterAmt + Math.round(params.platformLength_3/800);

			}

		    }

		} // end of straight block



		if(params.stairModel == "Г-образная с площадкой") {

		    // нижний марш

		    // внутреннее ограждение
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две"){
			marshBanisterAmt += calcMarshBanisterAmt(params.stairAmt1);

		    }
		    // внешнее ограждение
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			marshBanisterAmt += calcMarshBanisterAmt(params.stairAmt1 + 1) + Math.round(params.M/800);

		    }

		    // верхний марш

		    // внутреннее ограждение

		    if(params.platformTop == "нет" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3);

		    }
		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }

		    // внешнее
		    if(params.platformTop == "нет" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt += Math.round(params.M/800) + calcMarshBanisterAmt(params.stairAmt3) + 1;
		    }

		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + Math.round(params.M/800) + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }

		} // end of G-platform block


		if(params.stairModel == "Г-образная с забегом") {

		    // нижний марш

		    // внутреннее ограждение
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две"){
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1);

		    }
		    // внешнее ограждение
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1 + 1) + 1;

		    }

		    // верхний марш

		    // внутреннее ограждение

		    if(params.platformTop == "нет" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3);

		    }
		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }

		    // внешнее
		    if(params.platformTop == "нет" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + 1 + calcMarshBanisterAmt(params.stairAmt3);

		    }

		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + 1 + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }

		} // end of G-zabeg block


		if(params.stairModel == "П-образная с площадкой") {

		    // нижний марш

		    // внутреннее ограждение
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две"){
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1);

		    }
		    // внешнее ограждение
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1 + 1) + Math.round(params.platformLength_1/800);

		    }

		    // заднее ограждение площадки
		    if(params.backRailing_1 == "есть")
			marshBanisterAmt = marshBanisterAmt + Math.round(params.platformWidth_1/856);

		    // верхний марш

		    // внутреннее ограждение

		    if(params.platformTop == "нет" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3);

		    }
		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }

		    // внешнее
		    if(params.platformTop == "нет" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + Math.round(platformLength_1/800) + calcMarshBanisterAmt(params.stairAmt3);

		    }

		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + Math.round(platformLength_1/800) + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }


		} // end of P-platform block


		if(params.stairModel == "П-образная с забегом") {

		    // нижний марш

		    // внутреннее ограждение
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две"){
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1);
		    }
		    // внешнее ограждение
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1 + 1) + 1;
		    }

		    // заднее ограждение площадки
		    if(backRailing_2 == "есть")
			marshBanisterAmt = marshBanisterAmt + 4;

		    // верхний марш

		    // внутреннее ограждение

		    if(params.platformTop == "нет" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3);
		    }
		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);
		    }

		    // внешнее
		    if(params.platformTop == "нет" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + 1 + calcMarshBanisterAmt(params.stairAmt3);
		    }

		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + 1 + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);
		    }

		} // end of P-zabeg block

		if(params.stairModel == "П-образная трехмаршевая") {

		    // нижний марш

		    // внутреннее ограждение
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две"){
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1);

		    }
		    // внешнее ограждение
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt1 + 1);

			if(params.turnType_1 == "площадка")
			marshBanisterAmt = marshBanisterAmt + Math.round(params.M/800);

			if(params.turnType_1 == "забег")
			marshBanisterAmt = marshBanisterAmt + 1;
		    }

		    // средний марш

		    // внутреннее ограждение
		    if(params.railingSide_2 == "внутреннее" || params.railingSide_2 == "две"){
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt2);
		    }

		    // внешнее ограждение
		    if(params.railingSide_2 == "внешнее" || params.railingSide_2 == "две"){
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt2 + 1);

			if(params.turnType_1 == "площадка")
			marshBanisterAmt = marshBanisterAmt + Math.round(params.M/800);

			if(params.turnType_1 == "забег")
			marshBanisterAmt = marshBanisterAmt + 1;

			if(params.turnType_2 == "площадка")
			marshBanisterAmt = marshBanisterAmt + Math.round(params.M/800);

			if(params.turnType_2 == "забег")
			marshBanisterAmt = marshBanisterAmt + 1;

		    }

		    // верхний марш

		    // внутреннее ограждение

		    if(params.platformTop == "нет" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3);

		    }
		    if(params.platformTop == "площадка" && (params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

		    }

		    // внешнее

		    if(params.turnType_2 == "площадка") {

			if(params.platformTop == "нет" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + Math.round(params.M/800) + calcMarshBanisterAmt(params.stairAmt3);

			}

			if(params.platformTop == "площадка" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + Math.round(params.M/800) + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

			}

		    }

		    if(params.turnType_2 == "забег") {

			if(params.platformTop == "нет" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + 1 + calcMarshBanisterAmt(params.stairAmt3);

			}

			if(params.platformTop == "площадка" && (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")) {
			marshBanisterAmt = marshBanisterAmt + 1 + calcMarshBanisterAmt(params.stairAmt3 + 1) + Math.round(params.platformLength_3/800);

			}

		    }

		} // end of 3marsh block
		
		//заднее ограждение врехней площадки
		if(params.platformTop == "площадка" && params.topPltRailing_5) marshBanisterAmt += 2;

		return marshBanisterAmt;

    } // end of banisterCounting
	



// добавление крепления стоек к лестнице
function marshBanisterFittingsAdd(marshBanisterAmt) {

	// примыкание к лестнице

if(params.model == "лт" && params.stairFrame == "есть") {

	if(params.rackBottom == 'боковое') {

		item = {
			id: carcasBoltId,
			amt: marshBanisterAmt * 2,
			discription: "Крепление стоек ограждения",
			unit: "banisterMountingCounting",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
			id:  "plasticPlug_40_40",
			amt: marshBanisterAmt,
			discription: "Низ стоек ограждения",
			unit: "banisterMountingCounting",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
			id:  "banisterInnerFlange",
			amt: marshBanisterAmt,
			discription: "Закладная стойки ограждения",
			unit: "banisterMountingCounting",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		} // end of side mounting block

	if(params.rackBottom == 'сверху без крышки') {
		item = {
			id:  "bottomRailingPillarScrew",
			amt: 4 * marshBanisterAmt,
			discription: "Крепление стоек к ступеням",
			unit: "banisterMountingCounting",
			itemGroup: "Ограждения",
		};
		if(item.amt > 0) partsList.addItem(item);
		} // end of top mounting wo cover block

	if(params.rackBottom == 'сверху с крышкой') {
		if(params.banisterMaterial == "40х40 черн.") {
			item = {
			    id:  "screw_6x32",
			    amt: 4 * marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			    id:  "steelCover",
			    amt: marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			} // end of steel banister block

		if(params.banisterMaterial == "40х40 нерж." || params.banisterMaterial == "40х40 нерж+дуб") {
			item = {
			    id:  "screw_6x32",
			    amt: 4 * marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			item = {
			    id:  "stainlessCover",
			    amt: marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			} // end of stainless &amp; combi banister block

		} // end of top mounting with cover block

	} // end of lt-frames block

	if(params.model == "лт" && params.stairFrame == "нет") {
		if(params.rackBottom == 'боковое') {
			item = {
				id: carcasBoltId,
				amt: 2 * marshBanisterAmt,
				discription: "Крепление стоек ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

			item = {
				id:  "plasticPlug_40_40",
				amt: marshBanisterAmt,
				discription: "Низ стоек ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

			item = {
				id:  "banisterInnerFlange",
				amt: marshBanisterAmt,
				discription: "Закладная стойки ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

		    } // end of side mounting block

		    if(params.rackBottom == 'сверху без крышки') {

			item = {
				id:  "screw_6x32",
				amt: 4 * marshBanisterAmt,
				discription: "Крепление стоек к ступеням",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

		    } // end of top mounting wo cover block

		    if(params.rackBottom == 'сверху с крышкой') {

			if(params.banisterMaterial == "40х40 черн.") {


			item = {
			    id:  "screw_6x32",
			    amt: 4 * marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			//				itemAdd ("Декоративная крышка основания стойки (черн.)", "Крепление стоек к ступеням", "Склад", "steelCover", marshBanisterAmt);
			item = {
			    id:  "steelCover",
			    amt: marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			} // end of steel banister block

			if(params.banisterMaterial == "40х40 нерж." || params.banisterMaterial == "40х40 нерж+дуб") {


			item = {
			    id:  "screw_6x32",
			    amt: 4 * marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			//				itemAdd ("Декоративная крышка основания стойки (нерж.)", "Крепление стоек к ступеням", "Склад", "stainlessCover", marshBanisterAmt);
			item = {
			    id:  "stainlessCover",
			    amt: marshBanisterAmt,
			    discription: "Крепление стоек к ступеням",
			    unit: "banisterMountingCounting",
			    itemGroup: "Ограждения",
			};
			if(item.amt > 0) partsList.addItem(item);

			} // end of stainless &amp; combi banister block

		    } // end of top mounting with cover block

		} // end of lt-angles block

	if(params.model == "ко") {
		if(params.rackBottom == 'боковое') {
			item = {
				id:  "hexVint_M10x140",
				amt: 2 * marshBanisterAmt,
				discription: "Крепление стоек ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
/*
			item = {
				id:  "shim_M10",
				amt: 2 * marshBanisterAmt,
				discription: "Крепление стоек ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

			item = {
				id:  "nut_M10",
				amt: 2 * marshBanisterAmt,
				discription: "Крепление стоек ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
*/
			item = {
				id:  "plasticPlug_40_40",
				amt: marshBanisterAmt,
				discription: "Низ стоек ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

			item = {
				id:  "banisterInnerFlange",
				amt: marshBanisterAmt,
				discription: "Закладная стойки ограждения",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

			if(params.banisterMaterial == "40х40 черн."){
				item = {
					id:  "steelSideBush",
					amt: 2 * marshBanisterAmt,
					discription: "Боковое крепление стоек ограждения",
					unit: "banisterMountingCounting",
					itemGroup: "Ограждения",
					};
				if(item.amt > 0) partsList.addItem(item);
				}
			if(params.banisterMaterial == "40х40 нерж." || params.banisterMaterial == "40х40 нерж+дуб"){
				item = {
					id:  "stainlessSideBush",
					amt: 2 * marshBanisterAmt,
					discription: "Боковое крепление стоек ограждения",
					unit: "banisterMountingCounting",
					itemGroup: "Ограждения",
					};
				if(item.amt > 0) partsList.addItem(item);
				}

		    } // end of side mounting block

		if(params.rackBottom == 'сверху без крышки') {
			item = {
				id:  "screw_6x32",
				amt: 4 * marshBanisterAmt,
				discription: "Крепление стоек к ступеням",
				unit: "banisterMountingCounting",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

		    } // end of top mounting wo cover block

		if(params.rackBottom == 'сверху с крышкой') {
			if(params.banisterMaterial == "40х40 черн.") {
				item = {
					id:  "screw_6x32",
					amt: 4 * marshBanisterAmt,
					discription: "Крепление стоек к ступеням",
					unit: "banisterMountingCounting",
					itemGroup: "Ограждения",
					};
				if(item.amt > 0) partsList.addItem(item);

				item = {
					id:  "steelCover",
					amt: marshBanisterAmt,
					discription: "Крепление стоек к ступеням",
					unit: "banisterMountingCounting",
					itemGroup: "Ограждения",
					};
				if(item.amt > 0) partsList.addItem(item);
				} // end of steel banister block

			if(params.banisterMaterial == "40х40 нерж." || params.banisterMaterial == "40х40 нерж+дуб") {
				item = {
					id:  "screw_6x32",
					amt: 4 * marshBanisterAmt,
					discription: "Крепление стоек к ступеням",
					unit: "banisterMountingCounting",
					itemGroup: "Ограждения",
					};
				if(item.amt > 0) partsList.addItem(item);

				item = {
					id:  "stainlessCover",
					amt: marshBanisterAmt,
					discription: "Крепление стоек к ступеням",
					unit: "banisterMountingCounting",
					itemGroup: "Ограждения",
					};
				if(item.amt > 0) partsList.addItem(item);
				} // end of stainless &amp; combi banister block
		    } // end of top mounting with cover block
		} // end of ko block
    } // end of marshBanisterFittingsAdd()


// функция расчета ригельных ограждения маршей
    function banisterItemsAdd() {

		// определение кол-ва стоек
		var marshBanisterAmt = calcTotalBanisterAmt();

		// добавление позиций стоек в спецификацию
		var itemArticle;
		if(params.banisterMaterial == "40х40 черн.") itemArticle = "steelBanister";
		if(params.banisterMaterial == "40х40 нерж.") itemArticle = "stainlessBanister";
		if(params.banisterMaterial == "40х40 нерж+дуб") itemArticle = "combinedBanister";

		item = {
		    id:  itemArticle,
		    amt: marshBanisterAmt,
		    discription: "Стойка ограждения",
		    unit: "banisterItemsAdd",
		    itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		if(params.banisterMaterial == "40х40 нерж+дуб"){
			addTimberWorks("combBanister", "combinedBanister", marshBanisterAmt, partsList);
			}


		// крепление стоек к лестнице
		marshBanisterFittingsAdd(marshBanisterAmt);

		// примыкание к поручню

		// основание штыря
		if(params.banisterMaterial == "40х40 нерж." || params.banisterMaterial == "40х40 нерж+дуб"){
		    item = {
				id:  "handrailHolderBase",
				amt: marshBanisterAmt,
				discription: "Крепление поручня к стойкам",
				unit: "banisterItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
			
		if(params.banisterMaterial == "40х40 черн."){
		    item = {
				id:  "nut_M8",
				amt: marshBanisterAmt,
				discription: "Крепление кронштейна поручня к основанию",
				unit: "banisterItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
			
		// штыри
		item = {
		    id:  "handrailHolderTurn",
		    amt: marshBanisterAmt,
		    discription: "Крепление поручня к стойкам",
		    unit: "banisterItemsAdd",
		    itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "vint_M6x10",
		    amt: marshBanisterAmt,
		    discription: "Крепление лодочки к штырю",
		    unit: "banisterItemsAdd",
		    itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//рассчитываем параметры поручня	
		var handrailPar = {
			prof: params.handrailProf,
			sideSlots: params.handrailSlots,
			handrailType: params.handrail,
			}
		handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js
	
		//лодочки

		item = {
			id:  handrailPar.holderFlanId,
			amt: marshBanisterAmt,
			discription: "Крепление поручня к стойкам",
			unit: "banisterItemsAdd",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
				
		// шурупы

		item = {
			id:  handrailPar.screwId,
			amt: 2 * marshBanisterAmt,
			discription: "Крепление поручня к стойкам",
			unit: "banisterItemsAdd",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		
} // end of banisterItemsAdd


// функция добавления позиций ригелей и их фурнитуры
function rigelItemsAdd() {

		// расчет кол-ва фурнитуры
		var rackAmt = calcTotalBanisterAmt(); //общее кол-во стоек на лестнице
		var jointAmt = calcRailingJointAmt(); //кол-во стыков ограждения с шарнирами
		
		if(rackAmt <= 0) return;
		var rigelHolderAmt = params.rigelAmt * rackAmt;
		var screwAmt = rigelHolderAmt;
		var rigelJointAmt = jointAmt * params.rigelAmt;
		var rigelPlugAmt = staircasePartsParams.rigels.length * params.rigelAmt * 2;
		
		var rigelScrewId = "rigelScrew";	
		if(params.rigelMaterial == "20х20 черн."){
			var rigelPlugId = "plasticPlug_20_20";
			var rigelHolderId = "no";
			var rigelJointId = "no";
			screwAmt += jointAmt * params.rigelAmt; //на переломе ограждения к стойке крепятся 2 ригеля
			}
		if(params.rigelMaterial == "Ф12 нерж."){
			var rigelPlugId = "stainlessPlug_12";
			var rigelHolderId = "rigelHolder12";
			var rigelJointId = "inoxRigelJoint";
			rigelPlugAmt -= rigelJointAmt * 2;
			}
		if(params.rigelMaterial == "Ф16 нерж."){
			var rigelPlugId = "stainlessPlug_16"
			var rigelHolderId = "rigelHolder16";
			var rigelJointId = "inoxRigelJoint16";
			rigelPlugAmt -= rigelJointAmt * 2;
			}
		
		
		for(var i=0; i<staircasePartsParams.rigelTypes.length; i++){
			var rigelId = "rigel" + i;
			item = {
				id: rigelId,
				amt: staircasePartsParams.rigelTypes[i].amt * params.rigelAmt,
				discription: "Ригель лестницы",
				unit: "Ограждения",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
		
		item = {
			id: rigelPlugId,
			amt: rigelPlugAmt,
			discription: "Заглушки ригелей",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: rigelScrewId,
			amt: screwAmt,
			discription: "Крепление ригелей к стойкам",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
		if(params.rigelMaterial != "20х20 черн."){
			item = {
				id: rigelHolderId,
				amt: rigelHolderAmt,
				discription: "Крепление ригелей к стойкам",
				unit: "Ограждения",
				itemGroup: "Ограждения"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: rigelJointId,
				amt: rigelJointAmt,
				discription: "Соединение ригелей",
				unit: "Ограждения",
				itemGroup: "Ограждения"
				};
			if(item.amt > 0) partsList.addItem(item);		
			}
			
} // end of rigelItemsAdd


// функция добавления позиций стекол и их фурнитуры
    function glassItemsAdd() {
		var glassHolderAmt = staircasePartsParams.glassAmt * 4;
		
		var glassHolderScrewId = "glassHolderMetalScrew";
		if(params.banisterMaterial == "40х40 нерж+дуб") glassHolderScrewId = "glassHolderTimberScrew";
		
		    item = {
				id:  "glassRailing",
				amt: staircasePartsParams.glassAmt,
				discription: "Стекла ограждения",
				unit: "glassItemsAdd",
				itemGroup: "Ограждения",
				};
		    if(item.amt > 0) partsList.addItem(item);

		    item = {
				id:  "glassHolder",
				amt: glassHolderAmt,
				discription: "Крепление стекол ограждения",
				unit: "glassItemsAdd",
				itemGroup: "Ограждения",
				};
		    if(item.amt > 0) partsList.addItem(item);

		    item = {
				id:  glassHolderScrewId,
				amt: glassHolderAmt,
				discription: "Крепление стеклодержателей",
				unit: "glassItemsAdd",
				itemGroup: "Ограждения",
				};
		    if(item.amt > 0) partsList.addItem(item);

		

    } // end of glassItemsAdd


// функция подсчета количества стеклянных секций на марше
    function glassSectionAmt(bottomLength, stairAmt, a, b, lastMarsh, topLength) {
		
		var middleLength;

		var bottomGlassSectionAmt = 0;
		var middleGlassSectionAmt = 0;
		var topGlassSectionAmt = 0;
		var marshGlassSectionAmt = 0;

		var glassDist = 10; //зазор между стеклами
		var glassOffset = 15; //зазор от стекла до торца ступени
		var glassThickness = 8;

		if(bottomLength) bottomLength = bottomLength + glassOffset - glassDist;
		bottomGlassSectionAmt = Math.round(bottomLength/800);
		if(bottomLength != 0 && bottomGlassSectionAmt == 0) bottomGlassSectionAmt = 1;

		middleLength = stairAmt * b;
		if(topLength == 0) {
		    if(lastMarsh) middleLength = b * (stairAmt - 1) + a;
		    else middleLength = b * stairAmt - glassDist - glassOffset;
		}
		if(bottomLength == 0) middleLength = middleLength - glassOffset;
		middleGlassSectionAmt = Math.round(middleLength/800);
		if(middleGlassSectionAmt == 0) middleGlassSectionAmt = 1;

		topGlassSectionAmt = Math.round(topLength/800);
		if(topLength != 0 && topGlassSectionAmt == 0) topGlassSectionAmt = 1;

		marshGlassSectionAmt = bottomGlassSectionAmt + middleGlassSectionAmt + topGlassSectionAmt;

	
		return marshGlassSectionAmt;

    } // end of glassSectionAmt

// функция добавления позиций ограждений с самонесущим стеклом
    function selfCarrierGlassItemsAdd() {
		
		var totalGlassSectionAmt = 0;
		var rutelAmt = 0;

		if(params.stairModel == "Прямая") {

		    var lastMarsh = true;

		    //внешнее ограждение нижнего марша
		    if((params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, params.platformLength_3 - params.b1);
		    if((params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		    //внутреннее ограждение нижнего марша
		    if((params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, params.platformLength_3 - params.b1);
		    if((params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		}

		if(params.stairModel == "Г-образная с площадкой") {

		    var lastMarsh = false;

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, params.M - params.b1);
		    }

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		    var lastMarsh = true;

		    //внешнее ограждение верхнего марша
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		    //внутреннее ограждение верхнего марша
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);
		}

		if(params.stairModel == "Г-образная с забегом") {

		    var lastMarsh = false;

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, params.M - params.b1);
		    }

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		    var lastMarsh = true;

		    //внешнее ограждение верхнего марша
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		    //внутреннее ограждение верхнего марша
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		}

		if(params.stairModel == "П-образная с площадкой") {

		    var lastMarsh = false;

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, platformLength_1 - params.b1);
		    }

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		    //заднее ограждение промежуточной площадки
		    if(params.backRailing_1 == "есть")
			totalGlassSectionAmt = totalGlassSectionAmt + Math.round(params.platformWidth_1/800);

			
		    var lastMarsh = true;

		    //внешнее ограждение верхнего марша
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(platformLength_1, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(platformLength_1, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		    //внутреннее ограждение верхнего марша
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		}

		if(params.stairModel == "П-образная с забегом") {

		    var lastMarsh = false;

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, params.M - params.b1);
		    }

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		    //заднее ограждение забежной группы
		    if(params.backRailing_2 == "есть")
			totalGlassSectionAmt = totalGlassSectionAmt + Math.round((params.M + params.marshDist + params.M)/800);

		    var lastMarsh = true;

		    //внешнее ограждение верхнего марша
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		    //внутреннее ограждение верхнего марша
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		}

		if(params.stairModel == "П-образная трехмаршевая") {

		    var lastMarsh = false;

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1 + 1, params.a1, params.b1, lastMarsh, params.M - params.b1);
		    }

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt1, params.a1, params.b1, lastMarsh, 0);

		    var lastMarsh = false;

		    //внешнее ограждение среднего марша
		    if(params.railingSide_2 == "внешнее" || params.railingSide_2 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt2 + 1, params.a2, params.b2, lastMarsh, params.M - params.b2);

		    //внутреннее ограждение среднего марша
		    if(params.railingSide_2 == "внутреннее" || params.railingSide_2 == "две")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt2, params.a2, params.b2, lastMarsh, 0);

		    var lastMarsh = true;

		    //внешнее ограждение верхнего марша
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(params.M, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);

		    //внутреннее ограждение верхнего марша
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "площадка")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3 + 1, params.a3, params.b3, lastMarsh, params.platformLength_3 - params.b3);
		    if((params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") && params.platformTop == "нет")
			totalGlassSectionAmt = totalGlassSectionAmt + glassSectionAmt(0, params.stairAmt3, params.a3, params.b3, lastMarsh, 0);
		}

		if(totalGlassSectionAmt != 0) rutelAmt = 4 * totalGlassSectionAmt + 1;

		
		
		if(totalGlassSectionAmt != 0){
		
			item = {
				id:  "glassRailing",
				amt: totalGlassSectionAmt,
				discription: "Стекла ограждения лестницы",
				unit: "selfCarrierGlassItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
		

		item = {
		    id:  "rutel_m14",
		    amt: rutelAmt,
		    discription: "Крепление стекол ограждения",
		    unit: "selfCarrierGlassItemsAdd",
		    itemGroup: "Ограждения",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M14",
		    amt: 2 * rutelAmt,
		    discription: "Крепление рутелей",
		    unit: "selfCarrierGlassItemsAdd",
		    itemGroup: "Ограждения",
		};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "nut_M14",
		    amt: 2 * rutelAmt,
		    discription: "Крепление рутелей",
		    unit: "selfCarrierGlassItemsAdd",
		    itemGroup: "Ограждения",
		};
		if(item.amt > 0) partsList.addItem(item);

		// кронштейны поручней
		
		if(params.handrail != "нет" && glassHandrail == "сбоку") {
			var handrailHolderId = "planeRutel";
			if(staircasePartsParams.handrailPar.handrailModel == "round") handrailHolderId = "roundRutel";

			//кронштейны поручня
			item = {
				id:  handrailHolderId,
				amt: 2 * totalGlassSectionAmt,
				discription: "Крепление поручней ограждения",
				unit: "selfCarrierGlassItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);

			// шурупы
			var handrailScrewId = "timberHandrailScrew";
			if(staircasePartsParams.handrailPar.mat == "metal") handrailScrewId = "metalHandrailScrew";
			
			item = {
				id:  handrailScrewId,
				amt: 4 * totalGlassSectionAmt,
				discription: "Крепление поручня к кронштейнам",
				unit: "banisterItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
			
			}
	}
} // end of selfCarrierGlassItemsAdd


// функция добавления позиций кованых ограждений
    function kovkaItemsAdd() {

		var sectionAmt = 0;

		// расчет кол-ва секций
		if(params.stairModel == "Прямая") {

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			sectionAmt++;

		}

		if(params.stairModel == "Г-образная с площадкой") {

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внешнее ограждение верхнего марша
		    if(params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")
			sectionAmt++;

		    //внутреннее ограждение верхнего марша
		    if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")
			sectionAmt++;
		}

		if(params.stairModel == "Г-образная с забегом") {

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внешнее ограждение верхнего марша
		    if(params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")
			sectionAmt++;

		    //внутреннее ограждение верхнего марша
		    if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")
			sectionAmt++;

		}

		if(params.stairModel == "П-образная с площадкой") {

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //заднее ограждение промежуточной площадки
		    if(backRailing_1 == "есть")
			sectionAmt++;

		    //внешнее ограждение верхнего марша
		    if(params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")
			sectionAmt++;

		    //внутреннее ограждение верхнего марша
		    if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")
			sectionAmt++;

		}

		if(params.stairModel == "П-образная с забегом") {

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //заднее ограждение забежной группы
		    if(backRailing_2 == "есть")
			sectionAmt++;

		    //внешнее ограждение верхнего марша
		    if(params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")
			sectionAmt++;

		    //внутреннее ограждение верхнего марша
		    if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")
			sectionAmt++;

		}

		if(params.stairModel == "П-образная трехмаршевая") {

		    //внешнее ограждение нижнего марша
		    if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внутреннее ограждение нижнего марша
		    if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две")
			sectionAmt++;

		    //внешнее ограждение среднего марша
		    if(params.railingSide_2 == "внешнее" || params.railingSide_2 == "две")
			sectionAmt++;

		    //внутреннее ограждение среднего марша
		    if(params.railingSide_2 == "внутреннее" || params.railingSide_2 == "две")
			sectionAmt++;

		    //внешнее ограждение верхнего марша
		    if(params.railingSide_3 == "внешнее" || params.railingSide_3 == "две")
			sectionAmt++;

		    //внутреннее ограждение верхнего марша
		    if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две")
			sectionAmt++;

		}

		//заднее ограждение верхней площадки
		if(params.backRailing_3 == "есть")
		    sectionAmt++;

		// добавление в спецификацию

		item = {
		    id:  "forgedSection",
		    amt: sectionAmt,
		    discription: "Кованые ограждения",
		    unit: "kovkaItemsAdd",
		    itemGroup: "Ограждения",
		};
		if(item.amt > 0) partsList.addItem(item);

		// вычисление кол-ва креплений к лестнице
		var mountingAmt = calcTotalBanisterAmt();

		// примыкание к лестнице

		var banisterMaterial = "40х40 черн.";

		marshBanisterFittingsAdd(mountingAmt);

    }


/*** ЛЕСТНИЦЫ НА УГОЛКАХ ***/




    if(params.stairFrame == "нет" && params.stairType != "рифленая сталь") {

		if(params.model == "лт") {

		    // добавление тетив
		    ltStringerAdd();

		    // ЛТ1

		function calcStrightStair_angles(){}; //пустая функция для навигации
			
		    if(params.stairModel == "Прямая") { // lt1

			// добавление позиций, относящихся ко креплению к нижнему перекрытию
			bottomMountingItemsAdd();
			
			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt1, params.a1, true, "нижний");

			// добавление позиций, относящихся ко креплению к верхнему перекрытию
			if(params.platformTop == "нет")
			topMountingItemsAdd();

			// добавление позиций, относящихся к верхней площадке
			if(params.platformTop == "площадка") {
			angles_platformTopItemsAdd(params.a1);
			}


		    } // end of lt1
			
		function calcGPltStair_angles(){}; //пустая функция для навигации

		    if(params.stairModel == "Г-образная с площадкой") { // lt2

			// НИЖНИЙ МАРШ

			// добавление позиций, относящихся ко креплению к нижнему перекрытию
			bottomMountingItemsAdd();
			
			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt1, params.a1, false, "нижний");


			// ПРОМЕЖУТОЧНАЯ ПЛОЩАДКА

			// добавление позиций, относящихся к промежуточной площадке
			angles_platform_90_ItemsAdd(params.stairAmt1, params.stairAmt3, true);


			// ВЕРХНИЙ МАРШ

			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt3, params.a3, true, "верхний");

			// добавление позиций, относящихся ко креплению к верхнему перекрытию
			if(params.platformTop == "нет")
			topMountingItemsAdd(params.a3);

			// добавление позиций, относящихся к верхней площадке
			if(params.platformTop == "площадка") {
			angles_platformTopItemsAdd(params.a3);
			}

		    } // end of lt2
			
		function calcGWndStair_angles(){}; //пустая функция для навигации

		    if(params.stairModel == "Г-образная с забегом") { // lt3

			// НИЖНИЙ МАРШ

			// добавление позиций, относящихся ко креплению к нижнему перекрытию
			bottomMountingItemsAdd();
			
			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt1, params.a1, false, "нижний");


			// ЗАБЕЖНАЯ ГРУППА

			// добавление позиций, относящихся к забежной группе
			angles_zabeg_90_ItemsAdd(params.a3, params.stairAmt1, params.stairAmt3);


			// ВЕРХНИЙ МАРШ

			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt3, params.a3, true, "верхний");

			// добавление позиций, относящихся ко креплению к верхнему перекрытию
			if(params.platformTop == "нет")
			topMountingItemsAdd(params.a3);

			// добавление позиций, относящихся к верхней площадке
			if(params.platformTop == "площадка") {
			angles_platformTopItemsAdd(params.a3);
			}

		    } // end of lt3
			
		function calcPPltStair_angles(){}; //пустая функция для навигации

		    if(params.stairModel == "П-образная с площадкой") { // lt4

			// НИЖНИЙ МАРШ

			// добавление позиций, относящихся ко креплению к нижнему перекрытию
			bottomMountingItemsAdd();
			
			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt1, params.a1, false, "нижний");


			// ПРОМЕЖУТОЧНАЯ ПЛОЩАДКА

			// добавление позиций, относящихся к промежуточной площадке
			angles_platform_180_ItemsAdd(params.stairAmt1, params.stairAmt3);


			// ВЕРХНИЙ МАРШ

			// добавление позиций, относящихся к прямым ступеням марша, без учёта верхней ступени/площадки
			angles_marshItemsAdd(params.stairAmt3, params.a3, true, "верхний");

			// добавление позиций, относящихся ко креплению к верхнему перекрытию
			if(params.platformTop == "нет")
			topMountingItemsAdd(params.a3);

			// добавление позиций, относящихся к верхней площадке
			if(params.platformTop == "площадка") {
			angles_platformTopItemsAdd(params.a3);
			}

		    } // end of lt4
			
		function calcGWndStair_angles(){}; //пустая функция для навигации

		    if(params.stairModel == "П-образная с забегом") { // lt5

			// НИЖНИЙ МАРШ

			// добавление позиций, относящихся к нижней ступени
			bottomMountingItemsAdd(params.a1);
			
			// добавление позиций, относящихся к прямым ступеням марша, без учёта нижней ступени (с учётом верхней прямой - отсюда stairAmt1 + 1)
			angles_marshItemsAdd(params.stairAmt1, params.a1, false, "нижний");


			// ЗАБЕЖНАЯ ГРУППА

			// добавление позиций, относящихся к забежной группе
			angles_zabeg_180_ItemsAdd(params.a3, params.stairAmt1, params.stairAmt3);


			// ВЕРХНИЙ МАРШ

			// добавление позиций, относящихся к прямым ступеням марша, без учёта верхней ступени/площадки
			angles_marshItemsAdd(params.stairAmt3, params.a3, true, "верхний");

			// добавление позиций, относящихся к верхней ступени
			if(params.platformTop == "нет")
			topMountingItemsAdd(a3);

			// добавление позиций, относящихся к верхней площадке
			if(params.platformTop == "площадка") {
			angles_platformTopItemsAdd(params.a3);
			}

		    } // end of lt5
			
		function calcP3Stair_angles(){}; //пустая функция для навигации

		    if(params.stairModel == "П-образная трехмаршевая") { // lt53

			// НИЖНИЙ МАРШ

			// добавление позиций, относящихся ко креплению к нижнему перекрытию
			bottomMountingItemsAdd();
			
			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt1, params.a1, false, "нижний");


			// ПЕРВЫЙ ПОВОРОТ

			// добавление позиций, относящихся к забежной группе
			if(params.turnType_1 == "площадка")
			angles_platform_90_ItemsAdd(params.stairAmt1, params.stairAmt2, false);

			if(params.turnType_1 == "забег")
			angles_zabeg_90_ItemsAdd(params.a2, params.stairAmt1, params.stairAmt2);


			// СРЕДНИЙ МАРШ

			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt2, params.a2, false, "средний");


			// ВТОРОЙ ПОВОРОТ

			// добавление позиций, относящихся к забежной группе
			if(params.turnType_2 == "площадка")
			angles_platform_90_ItemsAdd(params.stairAmt2, params.stairAmt3, true);

			if(params.turnType_2 == "забег")
			angles_zabeg_90_ItemsAdd(params.a3, params.stairAmt2, params.stairAmt3);


			// ВЕРХНИЙ МАРШ

			// добавление позиций, относящихся к ступеням марша
			angles_marshItemsAdd(params.stairAmt3, params.a3, true, "верхний");


			// добавление позиций, относящихся ко креплению к верхнему перекрытию
			if(params.platformTop == "нет")
			topMountingItemsAdd(params.a3);

			// добавление позиций, относящихся к верхней площадке
			if(params.platformTop == "площадка") {
			angles_platformTopItemsAdd(params.a3);
			}

		    } // end of lt53

		} // end of lt block

    } // end of angles block


// ЛЕСТНИЦЫ НА РАМКАХ

    if(params.stairFrame == "есть" || params.stairType == "рифленая сталь") { // frames block

		if(params.model == "лт") ltStringerAdd();
		if(params.model == "ко") koStringerAdd();

		// КО/ЛТ-1

	function calcStrightStair_frames(){}; //пустая функция для навигации
		
		if(params.stairModel == "Прямая") { // ko-lt-1

		    // добавление позиций, относящихся ко креплению к нижнему перекрытию
		    bottomMountingItemsAdd();

		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt1, "нижний");

		    // добавление позиций верхней ступени марша
		    if(params.platformTop == "нет")
			topMountingItemsAdd();

		    // добавление позиций, относящихся к верхней площадке
		    if(params.platformTop == "площадка") {
			frames_platformTopItemsAdd();
		    }

		} // end of ko-lt-1

		// КО/ЛТ-2
		
	function calcGPltStair_frames(){}; //пустая функция для навигации

		if(params.stairModel == "Г-образная с площадкой") { // ko-lt-2

		    // НИЖНИЙ МАРШ

		    // добавление позиций, относящихся ко креплению к нижнему перекрытию
		    bottomMountingItemsAdd();
			
		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt1, "нижний");

		    // ПРОМЕЖУТОЧНАЯ ПЛОЩАДКА

		    // добавление позиций, относящихся к забежной группе
		    frames_platform_90_ItemsAdd(params.stairAmt3, true);


		    // ВЕРХНИЙ МАРШ

		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt3, "верхний");

		    // добавление позиций верхней ступени марша
		    if(params.platformTop == "нет")
			topMountingItemsAdd();

		    // добавление позиций, относящихся к верхней площадке
		    if(params.platformTop == "площадка") {
			frames_platformTopItemsAdd();
		    }

		} // end of ko-lt-2


		// КО/ЛТ-3

	function calcGWndStair_frames(){}; //пустая функция для навигации
	
		if(params.stairModel == "Г-образная с забегом") { // ko-lt3

		    // НИЖНИЙ МАРШ

		    // добавление позиций, относящихся ко креплению к нижнему перекрытию
		    bottomMountingItemsAdd();
			
		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt1, "нижний");


		    // ЗАБЕЖНАЯ ГРУППА

		    // добавление позиций, относящихся к забежной группе
		    frames_zabeg_90_ItemsAdd(params.stairAmt3, true);


		    // ВЕРХНИЙ МАРШ

		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt3, "верхний");

		    // добавление позиций верхней ступени марша
		    if(params.platformTop == "нет")
			topMountingItemsAdd();

		    // добавление позиций, относящихся к верхней площадке
		    if(params.platformTop == "площадка") {
			frames_platformTopItemsAdd();
		    }

		} // end of ko-lt3


		// КО/ЛТ-4
		
		function calcPPltStair_frames(){}; //пустая функция для навигации

		if(params.stairModel == "П-образная с площадкой") { // ko-lt-4

		    // НИЖНИЙ МАРШ

		    // добавление позиций, относящихся ко креплению к нижнему перекрытию
		    bottomMountingItemsAdd();
			
		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt1, "нижний");


		    // ПРОМЕЖУТОЧНАЯ ПЛОЩАДКА

		    // добавление позиций, относящихся к промежуточной площадке
		    frames_platform_180_ItemsAdd(params.stairAmt3);


		    // ВЕРХНИЙ МАРШ

		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt3, "верхний");

		    // добавление позиций верхней ступени марша
		    if(params.platformTop == "нет")
			topMountingItemsAdd();

		    // добавление позиций, относящихся к верхней площадке
		    if(params.platformTop == "площадка") {
			frames_platformTopItemsAdd();
		    }

		} // end of ko-lt-4


		// КО/ЛТ-5
		
		function calcGWndStair_frames(){}; //пустая функция для навигации

		if(params.stairModel == "П-образная с забегом") { // ko-lt5

		    // НИЖНИЙ МАРШ

		    // добавление позиций, относящихся ко креплению к нижнему перекрытию
		    bottomMountingItemsAdd();
			
		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt1, "нижний");


		    // ЗАБЕЖНАЯ ГРУППА

		    // добавление позиций, относящихся к забежной группе
		    frames_zabeg_180_ItemsAdd(params.stairAmt3);


		    // ВЕРХНИЙ МАРШ

		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt3, "верхний");

		    // добавление позиций верхней ступени марша
		    if(params.platformTop == "нет")
			topMountingItemsAdd();

		    // добавление позиций, относящихся к верхней площадке
		    if(params.platformTop == "площадка") {
			frames_platformTopItemsAdd();
		    }

		} // end of ko-lt5


		// КО/ЛТ-5 С ТРЕМЯ МАРШАМИ
		
		function calcP3Stair_frames(){}; //пустая функция для навигации

		if(params.stairModel == "П-образная трехмаршевая") { // ko-lt53

		    // НИЖНИЙ МАРШ

		    // добавление позиций, относящихся ко креплению к нижнему перекрытию
		    bottomMountingItemsAdd();
			
		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt1, "нижний");


		    // ПЕРВЫЙ ПОВОРОТ

		    // добавление позиций, относящихся к повороту
		    if(params.turnType_1 == "площадка")
			frames_platform_90_ItemsAdd(params.stairAmt2, false);

		    if(params.turnType_1 == "забег")
			frames_zabeg_90_ItemsAdd(params.stairAmt2, false);


		    // СРЕДНИЙ МАРШ

		    // добавление позиций, относящихся к ступеням марша
		    frames_marshItemsAdd(params.stairAmt2, "средний");


		    // ВТОРОЙ ПОВОРОТ

		    // добавление позиций, относящихся к повороту
		    if(params.turnType_2 == "площадка")
			frames_platform_90_ItemsAdd(params.stairAmt3, true);

		    if(params.turnType_2 == "забег")
			frames_zabeg_90_ItemsAdd(params.stairAmt3, true);


		    // ВЕРХНИЙ МАРШ

		    // добавление позиций средних ступеней марша
		    frames_marshItemsAdd(params.stairAmt3, "верхний");

		    // добавление позиций верхней ступени марша
		    if(params.platformTop == "нет")
			topMountingItemsAdd();

		    // добавление позиций, относящихся к верхней площадке
		    if(params.platformTop == "площадка") {
			frames_platformTopItemsAdd();
		    }

		} // end of ko-lt5

    } // end of frames block

	
/***  ОПОРНЫЕ КОЛОННЫ  ***/


function columnsAdd(){}; //пустая функция для навигации

//колонны
	var columnAmt = 0;
	for(var i=0; i<staircasePartsParams.columnTypes.length; i++){
		var columnId = "column" + i;
		item = {
			id:  columnId,
			amt: staircasePartsParams.columnTypes[i].amt,
			discription: "Опоры лестницы",
			unit: "columnsAdd",
			itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		columnAmt += staircasePartsParams.columnTypes[i].amt;			
		}
	
	
	item = {
		id:  "banisterInnerFlange",
		amt: columnAmt,
		discription: "Закладная колонн",
		unit: "columnsAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);
	
	
    if(params.columnModel == "40х40"){
		item = {
		    id:  "plasticPlug_40_40",
		    amt: columnAmt * 2,
		    discription: "Опоры колонн",
		    unit: "columnsAdd",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		}
		
    if(params.columnModel == "100x50") {

		item = {
		    id:  "regSupport",
		    amt: columnAmt,
		    discription: "Опоры колонн",
		    unit: "columnsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		partsList.regSupport.comment = "выдать в цех"

		item = {
		    id:  "nut_M20",
		    amt: columnAmt * 2,
		    discription: "Опоры колонн",
		    unit: "columnsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		partsList.nut_M20.comment = "выдать в цех";
		
		item = {
		    id:  "plasticPlug_100_50",
		    amt: columnAmt,
		    discription: "Опоры колонн",
		    unit: "columnsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);		
		}

		item = {
		    id: carcasBoltId,
		    amt: 2 * columnAmt,
		    discription: "Крепление колонн",
		    unit: "columnsAdd",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);

		
//подкосы

function bracesAdd(){}; //пустая функция для навигации

	var braceAmt = 0;
	for(var i=0; i<staircasePartsParams.braceTypes.length; i++){
		var braceId = "brace" + i;
		item = {
			id:  braceId,
			amt: staircasePartsParams.braceTypes[i].amt,
			discription: "Подкосы лестницы",
			unit: "bracesAdd",
			itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
		braceAmt += staircasePartsParams.braceTypes[i].amt;			
		}
	

	item = {
		id:  "plasticPlug_60_30",
		amt: braceAmt * 2,
		discription: "Заглушки подкосов",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
		id: "braceFork",
		amt: 2 * braceAmt,
		discription: "Деталь подкоса",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);		
	
	item = {
		id: "bolt_M10x70",
		amt: 2 * braceAmt,
		discription: "Деталь подкоса",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
		id:  "nut_M10",
		amt: 2 * braceAmt,
		discription: "Деталь подкоса",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
		id:  "shim_M10",
		amt: 4 * braceAmt,
		discription: "Деталь подкоса",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);
	
	item = {
		id: carcasBoltId,
		amt: 4 * braceAmt,
		discription: "Крепление подкосов к каркасу",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
		id:  "nut_M10",
		amt: 4 * braceAmt,
		discription: "Крепление подкосов к каркасу",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);

	item = {
		id:  "shim_M10",
		amt: 4 * braceAmt,
		discription: "Крепление подкосов к каркасу",
		unit: "bracesAdd",
		itemGroup: "Каркас",
		};
	if(item.amt > 0) partsList.addItem(item);
	
	
//крепления к перекрытиям

function floorsMountingItemsAdd(){}; //пустая функция для навигации	
	
	//крепление к нижнему перекрытию
	var fixParams = {
		partsList: partsList,
		fixPart: params.fixPart1,
		fixSurfaceType: params.fixType1,
		discription: "Крепление к нижнему перекрытию",
		unit: "Низ лестницы",
		itemGroup: "Крепление к обстановке",
		amt: 4,
		extraStudLength: params.fixSpacerLength1,
		studDiam: 10,
		}
	if(params.bottomAngleType == "регулируемая опора") {
		fixParams.fixPart = "саморезы";
		fixParams.amt = 8;
		}
	
	if(params.isAssembling == "есть") addFixParts(fixParams);
	
	//проставка
	if(params.fixPart1 != "не указано" && params.fixPart1 != "нет" && 
		params.fixSpacer1 != "не указано" && params.fixSpacer1 != "нет"){
			item = {
				id: "fixSpacer1",
				amt: 2,
				discription: "Крепление к нижнему перекрытию",
				unit: "bottomMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
			if(item.amt > 0) partsList.addItem(item);					
			}
		
	//крепление колонн
	var fixParams = {
		partsList: partsList,
		fixPart: "саморезы",
		fixSurfaceType: params.fixType1,
		discription: "Крепление колонн к перекрытию",
		unit: "Низ лестницы",
		itemGroup: "Крепление к обстановке",
		amt: columnAmt * 4,
		extraStudLength: 0,
		studDiam: 6,
		}
	if(params.isAssembling == "есть") addFixParts(fixParams);
	
	
	//крепление к верхнему перекрытию
	var fixParams = {
		partsList: partsList,
		fixPart: params.fixPart2,
		discription: "Крепление к верхнему перекрытию",
		unit: "Верх лестницы",
		itemGroup: "Крепление к обстановке",
		amt: 4,
		extraStudLength: params.fixSpacerLength2,
		studDiam: 10,
		}
	
	if(params.isAssembling == "есть") addFixParts(fixParams);
	
	//проставка
	if(params.fixPart2 != "не указано" && params.fixPart2 != "нет" && 
		params.fixSpacer2 != "не указано" && params.fixSpacer2 != "нет"){
			item = {
				id: "fixSpacer2",
				amt: 2,
				discription: "Крепление к верхнему перекрытию",
				unit: "topMountingItemsAdd",
				itemGroup: "Крепление к перекрытиям",
				};
			if(item.amt > 0) partsList.addItem(item);					
			}
	
	
//соединение длинных тетив/косоуров фланцами

function divideFlansAdd(){}; //пустая функция для навигации

	//соединение длинного марша фланцем
//	console.log(staircasePartsParams.divideAmt)
	if(staircasePartsParams.divideAmt) {

		    item = {
				id:  "stringerFlange",
				amt: staircasePartsParams.divideAmt,
				discription: "Соединительный фланец длинных тетив/косоуров",
				unit:"Соединенительные фланцы",
				itemGroup: "Каркас",
				};
		    if(item.amt > 0) partsList.addItem(item);
			
		item = {
		    id: carcasBoltId,
		    amt: staircasePartsParams.divideAmt * 7,
		    discription: "Крепление соединительных фланцев тетив/косоуров",
		   unit:"Соединенительные фланцы",
		    itemGroup: "Каркас",
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "nut_M10",
		    amt: staircasePartsParams.divideAmt * 7,
		    discription: "Крепление соединительных фланцев тетив/косоуров",
		   unit:"Соединенительные фланцы",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);

		item = {
		    id:  "shim_M10",
		    amt: staircasePartsParams.divideAmt* 7,
		    discription: "Крепление соединительных фланцев тетив/косоуров",
		   unit:"Соединенительные фланцы",
		    itemGroup: "Каркас",
			};
		if(item.amt > 0) partsList.addItem(item);
	}
	
//крепление к стенам

function wallsMountingItemsAdd(){} //пустая функция для навигации

	//стена 1
	var fixParams={
		partsList: partsList,
		amt: params.fixAmt3,
		discription: "Крепление к стене 1",
		fixSurfaceType: params.fixType3,
		fixPart: params.fixPart3,
		fixSpacer: params.fixSpacer3,
		fixSpacerLength: params.fixSpacerLength3,
		fixSpacerId: "fixSpacer3",
		}
	wallMountingItemsAdd(fixParams);
	
	
	//стена 2
	var fixParams={
		partsList: partsList,
		amt: params.fixAmt4,
		discription: "Крепление к стене 2",
		fixSurfaceType: params.fixType4,
		fixPart: params.fixPart4,
		fixSpacer: params.fixSpacer4,
		fixSpacerLength: params.fixSpacerLength4,
		fixSpacerId: "fixSpacer4",
		}
	wallMountingItemsAdd(fixParams);
	
	//стена 3
	var fixParams={
		partsList: partsList,
		amt: params.fixAmt5,
		discription: "Крепление к стене 3",
		fixSurfaceType: params.fixType5,
		fixPart: params.fixPart5,
		fixSpacer: params.fixSpacer5,
		fixSpacerLength: params.fixSpacerLength5,
		fixSpacerId: "fixSpacer5",
		}
	 wallMountingItemsAdd(fixParams);
	
	//стена 4
	var fixParams={
		partsList: partsList,
		amt: params.fixAmt6,
		discription: "Крепление к стене 4",
		fixSurfaceType: params.fixType6,
		fixPart: params.fixPart6,
		fixSpacer: params.fixSpacer6,
		fixSpacerLength: params.fixSpacerLength6,
		fixSpacerId: "fixSpacer6",
		}
	 wallMountingItemsAdd(fixParams);

	//end of wallsMountingItemsAdd	
	


// ОГРАЖДЕНИЯ
	
function railingItemsAdd(){}; //пустая функция для навигации

    if(params.railingModel == "Ригели") {
		banisterItemsAdd();
		rigelItemsAdd();
		} // end of rigels block

    if(params.railingModel == "Стекло на стойках") {
		banisterItemsAdd();
		glassItemsAdd();
		} // end of glass &amp; banisters block

    if(params.railingModel == "Самонесущее стекло") {
		selfCarrierGlassItemsAdd();
		} // end of self-carrier glass block

    if(params.railingModel == "Кованые балясины") {
		kovkaItemsAdd();
		} // end of kovka block

		


//Поручни и фурнитура

function handrailsItemsAdd(){};


//рассчитываем параметры поручня	
	var handrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		}
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js
		
	if(partsAmt.handrails){
		for(var type in partsAmt.handrails.types){
			
			var handrailId = "handrail_" + type;
			var handrailName = "Поручень " + params.handrail;
			if(handrailPar.mat == "timber"){
				if(params.handrailSlots == "да") handrailName += " с проточками под пальцы"
				}
			
			//создаем новую позицию
			partsList[handrailId] = {
				name: handrailName + " " + type,
				amtName: "шт",
				metalPaint: handrailPar.metalPaint,
				timberPaint: handrailPar.timberPaint,
				division: handrailPar.division,
				items: [],
				comment: "с модели",
				};
				
			//добавляем кол-во
			item = {
				id:  handrailId,
				amt: partsAmt.handrails.types[type],
				discription: "Поручень лестницы",
				unit: "Поручни",
				itemGroup: "Ограждения",
				};
			console.log(item)
			if(item.amt > 0) partsList.addItem(item);
			}
		
		
	//заглушки

	if(handrailPar.handrailPlugId != "no"){
		item = {
			id: handrailPar.handrailPlugId,
			amt: partsAmt.handrails.amt,
			discription: "Заглушка поручня",
			unit: "Поручни",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		}
	
	//фурнитура пристенных поручней
	if(staircasePartsParams.sideHandrailHolderAmt > 0){
		var holerId = "sideHandrailHolder_pl";
		if(handrailPar.handrailModel == "round") holerId = "sideHandrailHolder_rd";
		
		item = {
			id:  holerId,
			amt: staircasePartsParams.sideHandrailHolderAmt,
			discription: "Крепление поручней к стенам",
			unit: "Пристенные поручни",
			itemGroup: "Пристенные поручни",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id:  "screw_4x45",
			amt: staircasePartsParams.sideHandrailHolderAmt * 4,
			discription: "Крепление поручней к стенам",
			unit: "Пристенные поручни",
			itemGroup: "Пристенные поручни",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id:  handrailPar.screwId,
			amt: staircasePartsParams.sideHandrailHolderAmt * 2,
			discription: "Крепление поручней к кронштейнам",
			unit: "Пристенные поручни",
			itemGroup: "Пристенные поручни",
			};
		if(item.amt > 0) partsList.addItem(item);
		
	}
	
	if(handrailPar.mat == "timber") {
		addTimberWorks("handrail", "handrail", Math.round(railingParams.handrailLength/100)/10, partsList);
		}
		
} //конец поручней
//end of handrailsItemsAdd
	
	
	
//балюстрада
	
function balustradeItemsAdd(){}; //функция для навигации
	
	calcSpecBanister(partsList);
	
	
	
    // вывод спецификации "Комплектовка"
    printSpecificationCollation(partsList);
    // вывод спецификации "Сборка"
    printSpecificationAssembly(partsList);
    //включаем сортировку и поиск по таблица спецификаций
    $('.tab_4').tablesorter({
		widgets: [ 'zebra', 'filter' ],
		theme: 'blue',
		usNumberFormat : false,
		sortReset      : true,
		sortRestart    : true,
    });
	
	showDrawingsLinks();
	printPartsAmt(); //функция в файле calcSpecGeneral.js
	printPoleList(); //функция в файле calcSpecGeneral.js
	

} //end of calculateSpec




function showDrawingsLinks(){	

	var pathFrames = "/drawings/frames/";
	var pathTreads = "/drawings/treads/";
	var fileName = "01.pdf";
	var fileNameP = "p-01.pdf";
	var fileNameRectTread = "rectTreads";
	var fileNameWndTread = "winderTreads";
	var fileNamePlatformHalf = "platformHalf"
	
	var turnSideName = "right";
	if(params.turnSide == "левое") turnSideName = "left";
	
	var stairType = "timber";
	if(params.stairType == "рифленая сталь") stairType = "metal";
	if(params.stairType == "рифленый алюминий") stairType = "metal";
	if(params.stairType == "дпк") stairType = "dpc";
	if(params.stairType == "стекло") stairType = "glass";
	if(params.stairType == "нет") stairType = "no";

	if(stairType == "metal"){
		if(params.M <= 900 ) fileName = "06.pdf";
		if(params.M > 900 ) fileName = "07.pdf";
		fileNameP = "p-02.pdf";
		};
	if(stairType == "dpc"){
		if(params.M <= 900 ) fileName = "04.pdf";
		if(params.M > 900 ) fileName = "05.pdf";
		};
	if(stairType == "glass"){
		if(params.M <= 900 ) fileName = "02.pdf";
		if(params.M > 900 ) fileName = "03.pdf";
		fileNameP = "p-02.pdf";
		};
	
	
		
	if(params.model == "лт") {
		fileNameWndTread += "_lt_";
		fileNameRectTread += "_lt";
		fileNamePlatformHalf += "_lt"; 
		}
	if(params.model == "ко") {
		fileNameWndTread += "_ko_";
		fileNameRectTread += "_ko";
		fileNamePlatformHalf += "_ko";
		}
	fileNameWndTread += turnSideName;
	if(params.riserType == "есть") {
		fileNameWndTread += "_risers";
		fileNameRectTread += "_risers";
		}
	fileNameWndTread += ".pdf";
	fileNameRectTread += ".pdf";
	fileNamePlatformHalf += ".pdf";

	var isPlatform = false;
	var isWinder = false;
	if(params.stairModel == "Г-образная с площадкой") isPlatform = true;
	if(params.stairModel == "Г-образная с забегом") isWinder = true;
	if(params.stairModel == "П-образная с площадкой") isPlatform = true;
	if(params.stairModel == "П-образная с забегом") isWinder = true;
	if(params.stairModel == "П-образная трехмаршевая") {
		if(params.turnType_1 == "площадка") isPlatform = true;
		if(params.turnType_2 == "площадка") isPlatform = true;
		if(params.turnType_1 == "забег") isWinder = true;
		if(params.turnType_2 == "забег") isWinder = true;
		}
	if(params.platformTop == "площадка") isPlatform = true;
	
	
	
	var links = "<p>Типовые чертежи:</p>";
	//рамки прямых ступеней
	if(params.stairFrame == "есть") links += "<a href='" + pathFrames + fileName + "' target='_blank'>Рамки прямых ступеней</a><br/>";
	//рамки забежных ступеней
	if(params.stairFrame == "есть" && isWinder) links += "<a href='" + pathFrames + "winderFrames_ko_" + turnSideName + ".pdf' target='_blank'>Рамки забежных ступеней</a><br/>"
	//рамки площадки
	if(params.stairFrame == "есть" && isPlatform && params.model != "ко") links += "<a href='" + pathFrames + fileNameP + "' target='_blank'>Рамки площадки</a><br/>"
	//вертикальная рамка
	if(params.topAnglePosition == "вертикальная рамка") links += "<a href='" + pathFrames + "top_frame.pdf' target='_blank'>Вертикальная рамка крепления к верхнему перекрытию<br/></a>"
	//Прямые ступени
	if(stairType == "timber") links += "<a href='" + pathTreads + fileNameRectTread + "' target='_blank'>Прямые ступени</a><br/>";
	if(stairType == "metal") links += "<a href='" + pathTreads + "steelTread.pdf' target='_blank'>Прямые ступени</a><br/>";

	//Забежные ступени
	if(stairType == "timber" && isWinder) links += "<a href='" + pathTreads + fileNameWndTread + "' target='_blank'>Забежные ступени</a><br/>";
	//половинки площадки
	if(stairType == "timber" && isPlatform) links += "<a href='" + pathTreads + fileNamePlatformHalf + "' target='_blank'>Щиты площадки</a><br/>" 
	if(stairType == "metal" && isPlatform) links += "<a href='" + pathTreads + "steelPlatform.pdf' target='_blank'>Площадки</a><br/>";

	//колонны
	if(params.isColumn1 || 
		params.isColumn2 || 
		params.isColumn3 || 
		params.isColumn4 || 
		params.isColumn5 || 
		params.isColumn6 || 
		params.isColumn7 || 
		params.isColumn8) 
			links += "<a href='/drawings/carcas/column_100x50.pdf' target='_blank'>Колонны</a><br/>" 

	
	
	
	 $("#drawings").html(links)
	 
	 
	 
	}

	
