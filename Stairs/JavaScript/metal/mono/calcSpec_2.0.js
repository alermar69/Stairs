/*соответствие обозначения узлов в спецификации и имени функции:
frames_platform_180_ItemsAdd - промежуточная площадка

*/

function createPartsList(){
	/*функция создает справочник деталей*/
	var list = {};
	//функции добавления элементов из файла calcSpecGeneral.js
	list.addItem = addItem;
	list.addSpecObjItems = addSpecObjItems;
	
	
//общие позиции для всех лестницы
addGeneralItems(list); //функция в файле /calculator/general/calcSpec.js

/* КАРКАС */

    //косоуры
    list.stringer = {
        name: "Косоур",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
    };
	
	//Фланцы крепления к перекрытиям
    list.topFloorFlan = {
        name: "Фланец крепления к верхнему перекрытию",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
		};
		
    list.botFloorFlan = {
        name: "Фланец крепления к нижнему перекрытию",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
		};
		
	list.wallFlan = {
        name: "Фланец промежуточного крепления к стене",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
		};

	//подложки прямых ступеней
    list.treadPlate = {
        name: "Подложка прямой ступени",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
		};
		
	//подложки забежных ступеней
    list.treadPlateWnd = {
        name: "Подложка забежной ступени",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
		};
	
	//подложки забежных ступеней
    list.framePlt = {
        name: "Рамка площадки",
        amtName: "мм",
        metalPaint: true,
        timberPaint: false,
        division: "metal",
        items: []
		};
	
	
	var treadLength = params.M;	
	var treadThkComment = "Толщина " + params.treadThickness + "+-1мм. "

	
	list.rectTread_marsh1 = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + params.a1 + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: params.a1 * treadLength / 1000000,
		paintedArea: (params.a1 * treadLength + (params.a1 + treadLength) * params.treadThickness) * 2 / 1000000,
		};
		
	list.rectTread_marsh2 = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + params.a2 + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: params.a2 * treadLength / 1000000,
		paintedArea: (params.a2 * treadLength + (params.a2 + treadLength) * params.treadThickness) * 2 / 1000000,

		};
		
	list.rectTread_marsh3 = {
		name: "Ступень прямоугольная " + params.stairType + " А=" + params.a3 + "мм В=" + treadLength + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: params.a3 * treadLength / 1000000,
		paintedArea: (params.a3 * treadLength + (params.a3 + treadLength) * params.treadThickness) * 2 / 1000000,

		};
		
	//Щиты промежуточной площадки
	
	var platformShieldLength = params.M;
	var platformShieldWidth = Math.floor((params.M + 45)/2);	
	if(params.stairModel == "П-образная с площадкой"){
		platformShieldLength = (params.M * 2 + params.marshDist);
		platformShieldWidth = Math.floor(params.platformLength_1/2);
		}

	list.platformShield = {
		name: "Щит промежуточной площадки " + params.stairType + " А=" + platformShieldLength + "мм В=" + platformShieldWidth + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: platformShieldLength * treadLength / 1000000,
		paintedArea: (platformShieldLength * treadLength + (platformShieldLength + treadLength) * params.treadThickness) * 2 / 1000000,
		};
	
//Щиты верхней площадки
	
	var platformShieldLength_top = params.M;
	var platformShieldWidth_top = Math.floor((params.M + 45)/2);	
	if(params.stairModel == "П-образная с площадкой"){
		platformShieldLength_top = (params.M * 2 + params.marshDist);
		platformShieldWidth_top = Math.floor(params.platformLength_1/2);
		}
		
	list.platformShield_top = {
		name: "Щит промежуточной площадки " + params.stairType + " А=" + platformShieldLength_top + "мм В=" + platformShieldWidth_top + "мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: true,
		division: "timber",
		items: [],
		comment: treadThkComment + "Фаски см. чертеж",
		area: platformShieldLength_top * treadLength / 1000000,
		paintedArea: (platformShieldLength_top * treadLength + (platformShieldLength_top + treadLength) * params.treadThickness) * 2 / 1000000,
		};

	
	//Ступени забежной группы
	
	var sizeA = 0;
	var sizeB = 0;
	var sizeC = 0;
	
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

	
	
//Опорные колонны

//console.log(staircasePartsParams.columns)
	
	for (var i=0; i<staircasePartsParams.columns.length; i++){
		var columnId = "column" + i;
		var name = "Колонна " + staircasePartsParams.columns[i].profSize  + "x" + staircasePartsParams.columns[i].profSize + "мм L=" + Math.round(staircasePartsParams.columns[i].poleLength) + "мм a=" + Math.round(staircasePartsParams.columns[i].topAngle/Math.PI*180*10)/10 + "гр."
		if(staircasePartsParams.columns[i].type == "подкос")
			name = "Подкос L=" + Math.round(staircasePartsParams.columns[i].sideLength) + "мм a=" + Math.round(staircasePartsParams.columns[i].topAngle/Math.PI*180*10)/10 + "гр."
		list[columnId] = {
			name: name,
			amtName: "шт",
			metalPaint: true,
			timberPaint: false,
			division: "metal",
			items: [],
			};		
		}

	
	
	
/* ОГРАЖДЕНИЯ */	

	var balMetalPaint = true;
	var balTimberPaint = true;
	var dept = "metal";
	
	if(params.banisterMaterial == "40х40 черн."){
		balMetalPaint = true;
		balTimberPaint = false;		
		}
	if(params.banisterMaterial == "40х40 нерж."){
		balMetalPaint = false;
		balTimberPaint = false;
		}
	if(params.banisterMaterial == "40х40 нерж+дуб"){
		balMetalPaint = false;
		balTimberPaint = true;
		dept = "timber";
		}
	


	//стойка ограждения начальная
    list.firstBal = {
        name: "Начальная стойка ограждения с фланцем " + params.banisterMaterial,
        amtName: "шт",
        metalPaint: balMetalPaint,
        timberPaint: balTimberPaint,
        division: dept,
        items: []
		};
	
	
	//стойка ограждения
    list.bal = {
        name: "Стойка ограждения " + params.banisterMaterial,
        amtName: "шт",
        metalPaint: balMetalPaint,
        timberPaint: balTimberPaint,
        division: dept,
        items: []
		};
	
	//Угловая стойка ограждения
    list.cornerBal = {
        name: "Угловая стойка ограждения " + params.banisterMaterial,
        amtName: "шт",
        metalPaint: balMetalPaint,
        timberPaint: balTimberPaint,
        division: dept,
        items: []
		};
	
	//L-образная стойка
    list.L_BalAmt = {
        name: "L-образная стойка ограждения " + params.banisterMaterial,
        amtName: "шт",
        metalPaint: balMetalPaint,
        timberPaint: balTimberPaint,
        division: dept,
        items: []
		};
		

//поручни

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
	 
		

//Фланец крепления секций поручней
	list.handrailConnector = {
		name: "Соединитель поручней",
		amtName: "шт.",
		metalPaintRailing: true,
		division: "metal",
		items: [],
		};
	



//Стекла ограждения
	list.glassSet = {
		name: "Стекло ограждения закаленное 8мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "timber",
		items: [],
		};
	
	if(params.railingModel == "Самонесущее стекло") list.glassSet.name = "Стекло однослойное закаленное 12мм";
	
	


	return list;
}//end of createPartsList



// функция расчёта спецификации
function calcSpec(){


	/* Инициализация справочника деталей*/
	var partsList = createPartsList();
	var item = {}
	
	
	var glassHolderScrewId = "glassHolderMetalScrew";
	var firstBalFlanCoverId = "steelCover";
	if(params.banisterMaterial != "40х40 черн.") firstBalFlanCoverId = "stainlessCover";
	if(params.banisterMaterial == "40х40 нерж+дуб") glassHolderScrewId = "glassHolderTimberScrew";
		
//console.log(partsAmt_bal)


	
	

	

function addCarcasItems(){}; //пустая функция для навигации

	/***  КАРКАС   ***/
	
	var nutAmtWeld = 0;
	

	
	//нижний марш
	
	item = {
        id: "stringer",
        amt: 1,
        discription: "Косоур нижнего марша",
        unit: "Косоур",
        itemGroup: "Каркас"
    };
    if(item.amt > 0) partsList.addItem(item);
	
	item = {
        id: "treadPlate",
        amt: params.stairAmt1,
        discription: "Подложки ступеней нижнего марша",
        unit: "Подложки",
        itemGroup: "Каркас"
    };
    if(item.amt > 0) partsList.addItem(item);
	
	
	
	
	//метизы крепления подложек нижнего марша
	
	if(params.model == "сварной"){
		item = {
			id: "hexVint_M10x30",
			amt: params.stairAmt1 * 4,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		var nutAmt = params.stairAmt1 * 4;
		nutAmtWeld += nutAmt;
		item = {
			id: "nut_M10",
			amt: nutAmt,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		}
		
	if(params.model == "труба"){
		item = {
			id: "boltMeb_M8x19",
			amt: params.stairAmt1 * 6,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M8",
			amt: params.stairAmt1 * 6,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "shim_M8",
			amt: params.stairAmt1 * 6,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		}
		
	//верхний марш
	
	if(params.stairModel != "Прямая"){
		item = {
			id: "stringer",
			amt: 1,
			discription: "Косоур верхнего марша",
			unit: "Косоур",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "treadPlate",
			amt: params.stairAmt3,
			discription: "Подложки ступеней верхнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
	//метизы крепления подложек верхнего марша	
	if(params.model == "сварной"){
		item = {
			id: "hexVint_M10x30",
			amt: params.stairAmt3 * 4,
			discription: "Крепление подложек верхнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		var nutAmt = params.stairAmt3 * 4;
		nutAmtWeld += nutAmt;
		item = {
			id: "nut_M10",
			amt: nutAmt,
			discription: "Ввариваются в косоур верхнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		}
		
	if(params.model == "труба"){
		item = {
			id: "boltMeb_M8x19",
			amt: params.stairAmt3 * 6,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M8",
			amt: params.stairAmt3 * 6,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "shim_M8",
			amt: params.stairAmt3 * 6,
			discription: "Крепление подложек нижнего марша",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		}
		
		//метизы крепленя косоуров между собой
		
		if(params.model == "сварной"){
		item = {
			id: "bolt_M10x40",
			amt: 4,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M10",
			amt: 4,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		}
		
	if(params.model == "труба"){
		
		item = {
			id: "bolt_M10x40",
			amt: 2,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "stud_M10x140",
			amt: 2,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M10",
			amt: 6,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		}
	
	item = {
			id: "shim_M10",
			amt: 8,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
	
		}

	//промежуточная площадка
	
	if(params.stairModel == "Г-образная с площадкой"){
				
		if(params.model == "сварной"){
			//кол-во больших подложек на повороте
			var treadPlatePltAmt = 3;
			if (params.M < 710) treadPlatePltAmt = 2;
			item = {
				id: "treadPlate",
				amt: treadPlatePltAmt,
				discription: "Подложки площадки большие",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "treadPlate",
				amt: 1,
				discription: "Подложка площадки малая",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
		
			item = {
				id: "hexVint_M10x30",
				amt: (treadPlatePltAmt + 1) * 4,
				discription: "Крепление подложек промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			var nutAmt = (treadPlatePltAmt + 1) * 4;
			nutAmtWeld += nutAmt;
			item = {
				id: "nut_M10",
				amt: nutAmt,
				discription: "Ввариваются в косоур промежуточной площадки",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
		
			}
		
		if(params.model == "труба"){
			//рамка площадки
			item = {
				id: "framePlt",
				amt: 1,
				discription: "Рамка промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//метизы крепления рамки площадки
			item = {
				id: "nut_M10",
				amt: 3,
				discription: "Крепление рамки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "nut_M10",
				amt: 3,
				discription: "Крепление рамки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "shim_M10",
				amt: 6,
				discription: "Крепление рамки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
		
		} //end of Г-образная с площадкой
	
	if(params.stairModel == "Г-образная с забегом"){
		item = {
			id: "treadPlateWnd",
			amt: 3,
			discription: "Подложки забежных ступеней",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		//метизы крепления подложек забега	
		if(params.model == "сварной"){
			item = {
				id: "hexVint_M10x30",
				amt: 3 * 4,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			var nutAmt = 3 * 4;
			nutAmtWeld += nutAmt;
			item = {
				id: "nut_M10",
				amt: nutAmt,
				discription: "Ввариваются в косоур забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			}
			
		if(params.model == "труба"){
			item = {
				id: "boltMeb_M8x19",
				amt: 3 * 6,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "nut_M8",
				amt: 3 * 6,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "shim_M8",
				amt: 3 * 6,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			}
		
		} //end of Г-образная с забегом
	
	if(params.stairModel == "П-образная с площадкой"){
		item = {
			id: "stringer",
			amt: 1,
			discription: "Балка площадки",
			unit: "Косоур",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		if(params.model == "сварной"){
			//кол-во больших подложек на повороте
			var treadPlatePltAmt = 6;
			if (params.platformLength_1 < 710) treadPlatePltAmt = 4;
			item = {
				id: "treadPlate",
				amt: treadPlatePltAmt,
				discription: "Подложки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "hexVint_M10x30",
				amt: treadPlatePltAmt * 4,
				discription: "Крепление подложек промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			var nutAmt = treadPlatePltAmt * 4;
			nutAmtWeld += nutAmt;
			item = {
				id: "nut_M10",
				amt: nutAmt,
				discription: "Ввариваются в косоур промежуточной площадки",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
		
			}
		
		if(params.model == "труба"){
			//рамка площадки
			item = {
				id: "framePlt",
				amt: 2,
				discription: "Рамка промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//метизы крепления рамки площадки
			item = {
				id: "nut_M10",
				amt: 6,
				discription: "Крепление рамки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "nut_M10",
				amt: 6,
				discription: "Крепление рамки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "shim_M10",
				amt: 12,
				discription: "Крепление рамки промежуточной площадки",
				unit: "Площадка",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);			
			}
		
		} //end of П-образная с площадкой

	if(params.stairModel == "П-образная с забегом"){
		item = {
			id: "stringer",
			amt: 1,
			discription: "Косоур забега",
			unit: "Косоур",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "treadPlateWnd",
			amt: 6,
			discription: "Подложки забежных ступеней",
			unit: "Подложки",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);

		//метизы крепления подложек забега	
		if(params.model == "сварной"){
			item = {
				id: "hexVint_M10x30",
				amt: 6 * 4,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			var nutAmt = 6 * 4;
			nutAmtWeld += nutAmt;
			item = {
				id: "nut_M10",
				amt: nutAmt,
				discription: "Ввариваются в косоур забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			}
			
		if(params.model == "труба"){
			item = {
				id: "boltMeb_M8x19",
				amt: 6 * 6,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "nut_M8",
				amt: 6 * 6,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "shim_M8",
				amt: 6 * 6,
				discription: "Крепление подложек забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			}
			
		}//end of П-образная с забегом

	if(params.stairModel == "П-образная трехмаршевая"){
		item = {
			id: "stringer",
			amt: 1,
			discription: "Косоур среднего марша",
			unit: "Косоур",
			itemGroup: "Каркас"
		};
		if(item.amt > 0) partsList.addItem(item);
		if(params.turnType_1 == "забег"){
			item = {
				id: "treadPlateWnd",
				amt: 3,
				discription: "Подложки забежных ступеней нижнего забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			//метизы крепления подложек забега	
			if(params.model == "сварной"){
				item = {
					id: "hexVint_M10x30",
					amt: 3 * 4,
					discription: "Крепление подложек нижнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				var nutAmt = 3 * 4;
				nutAmtWeld += nutAmt;
				item = {
					id: "nut_M10",
					amt: nutAmt,
					discription: "Ввариваются в косоур нижнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
			
				}
				
			if(params.model == "труба"){
				item = {
					id: "boltMeb_M8x19",
					amt: 3 * 6,
					discription: "Крепление подложек нижнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "nut_M8",
					amt: 3 * 6,
					discription: "Крепление подложек нижнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "shim_M8",
					amt: 3 * 6,
					discription: "Крепление подложек нижнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				}
			
			
			}//end of params.turnType_1 == "забег"
			
		if(params.turnType_1 == "площадка"){
			if(params.model == "сварной"){
				//кол-во больших подложек на повороте
				var treadPlatePltAmt = 3;
				if (params.M < 710) treadPlatePltAmt = 2;
				item = {
					id: "treadPlate",
					amt: treadPlatePltAmt,
					discription: "Подложки нижней площадки большие",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "treadPlate",
					amt: 1,
					discription: "Подложка нижней площадки малая",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
			
				item = {
					id: "hexVint_M10x30",
					amt: (treadPlatePltAmt + 1) * 4,
					discription: "Крепление подложек нижней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				var nutAmt = (treadPlatePltAmt + 1) * 4;
				nutAmtWeld += nutAmt;
				item = {
					id: "nut_M10",
					amt: nutAmt,
					discription: "Ввариваются в косоур нижней площадки",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
			
				}
			
			if(params.model == "труба"){
				//рамка площадки
				item = {
					id: "framePlt",
					amt: 1,
					discription: "Рамка нижней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				//метизы крепления рамки площадки
				item = {
					id: "nut_M10",
					amt: 3,
					discription: "Крепление рамки нижней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "nut_M10",
					amt: 3,
					discription: "Крепление рамки нижней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "shim_M10",
					amt: 6,
					discription: "Крепление рамки нижней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);			
				}
			
			}//end of params.turnType_1 == "площадка"
		if(params.turnType_2 == "забег"){
			item = {
				id: "treadPlateWnd",
				amt: 3,
				discription: "Подложки забежных ступеней верхнего забега",
				unit: "Подложки",
				itemGroup: "Каркас"
			};
			if(item.amt > 0) partsList.addItem(item);
			
			//метизы крепления подложек забега	
			if(params.model == "сварной"){
				item = {
					id: "hexVint_M10x30",
					amt: 3 * 4,
					discription: "Крепление подложек верхнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				var nutAmt = 3 * 4;
				nutAmtWeld += nutAmt;
				item = {
					id: "nut_M10",
					amt: nutAmt,
					discription: "Ввариваются в косоур верхнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				}
				
			if(params.model == "труба"){
				item = {
					id: "boltMeb_M8x19",
					amt: 3 * 6,
					discription: "Крепление подложек верхнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "nut_M8",
					amt: 3 * 6,
					discription: "Крепление подложек верхнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "shim_M8",
					amt: 3 * 6,
					discription: "Крепление подложек верхнего забега",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
				}
			} //end of params.turnType_2 == "забег"
			
		if(params.turnType_2 == "площадка"){
			if(params.model == "сварной"){
				//кол-во больших подложек на повороте
				var treadPlatePltAmt = 3;
				if (params.M < 710) treadPlatePltAmt = 2;
				item = {
					id: "treadPlate",
					amt: treadPlatePltAmt,
					discription: "Подложки верхней площадки большие",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "treadPlate",
					amt: 1,
					discription: "Подложка верхней площадки малая",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
			
				item = {
					id: "hexVint_M10x30",
					amt: (treadPlatePltAmt + 1) * 4,
					discription: "Крепление подложек верхней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				var nutAmt = (treadPlatePltAmt + 1) * 4;
				nutAmtWeld += nutAmt;
				item = {
					id: "nut_M10",
					amt: nutAmt,
					discription: "Ввариваются в косоур верхней площадки",
					unit: "Подложки",
					itemGroup: "Каркас"
				};
				if(item.amt > 0) partsList.addItem(item);
			
				}
			
			if(params.model == "труба"){
				//рамка площадки
				item = {
					id: "framePlt",
					amt: 1,
					discription: "Рамка верхней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				//метизы крепления рамки площадки
				item = {
					id: "nut_M10",
					amt: 3,
					discription: "Крепление рамки верхней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "nut_M10",
					amt: 3,
					discription: "Крепление рамки верхней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);
				
				item = {
					id: "shim_M10",
					amt: 6,
					discription: "Крепление рамки верхней площадки",
					unit: "Поворотные площадки",
					itemGroup: "Каркас"
					};
				if(item.amt > 0) partsList.addItem(item);			
				}
			} //end of params.turnType_2 == "площадка"
			
		//метизы крепленя косоуров между собой
		
		if(params.model == "сварной"){
		item = {
			id: "bolt_M10x40",
			amt: 4,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M10",
			amt: 4,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		}
		
	if(params.model == "труба"){
		
		item = {
			id: "bolt_M10x40",
			amt: 2,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "stud_M10x140",
			amt: 2,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M10",
			amt: 6,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		}
	
	item = {
			id: "shim_M10",
			amt: 8,
			discription: "Крепление косоуров между собой",
			unit: "Косоур",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		}
		

		
function addTreadItems(){}; //пустая функция для навигации


/***  СТУПЕНИ  ***/

	
if(params.stairType != "нет"){
	
	//нижний марш
	item = {
		id: "rectTread_marsh1",
		amt: params.stairAmt1,
		discription: "Ступени нижнего марша",
		unit: "Нижний марш",
		itemGroup: "Ступени"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	//шурупы крепления ступеней нижнего марша
	item = {
		id: "treadScrew",
		amt: params.stairAmt1 * 4,
		discription: "Крепление ступеней к подложкам",
		unit: "Нижний марш",
		itemGroup: "Ступени"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	//расчет объема для фот
	addTimberWorks("rect", "rectTread_marsh1", params.stairAmt1, partsList);

	
	//верхний марш
	
	if(params.stairModel != "Прямая"){
		item = {
			id: "rectTread_marsh3",
			amt: params.stairAmt3,
			discription: "Ступени верхнего марша",
			unit: "Верхний марш",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//шурупы крепления ступеней верхнего марша
		item = {
			id: "treadScrew",
			amt: params.stairAmt3 * 4,
			discription: "Крепление ступеней к подложкам",
			unit: "Верхний марш",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
	
		//расчет объема для фот
		addTimberWorks("rect", "rectTread_marsh3", params.stairAmt3, partsList);
	
		}
	
	if(params.stairModel == "Г-образная с площадкой"){
		item = {
			id: "platformShield",
			amt: 2,
			discription: "Промежуточная площадка",
			unit: "Площадка",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//шурупы крепления щитов площадки
		item = {
			id: "treadScrew",
			amt: (treadPlatePltAmt + 1) * 4,
			discription: "Крепление щитов площадки",
			unit: "Площадка",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("rect", "platformShield", 2, partsList);
		
		}
	
	if(params.stairModel == "Г-образная с забегом"){
		item = {
			id: "winderTread1",
			amt: 1,
			discription: "Нижняя забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "winderTread2",
			amt: 1,
			discription: "Средняя забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "winderTread3",
			amt: 1,
			discription: "Верхняя забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//шурупы крепления забежных ступеней
		item = {
			id: "treadScrew",
			amt: 14,
			discription: "Крепление забежных ступеней",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("забег", "winderTread1", 1, partsList);
		addTimberWorks("забег", "winderTread2", 1, partsList);
		addTimberWorks("забег", "winderTread3", 1, partsList);
		}
		
	if(params.stairModel == "П-образная с площадкой"){
		item = {
			id: "platformShield",
			amt: 2,
			discription: "Промежуточная площадка",
			unit: "Площадка",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//шурупы крепления щитов площадки
		item = {
			id: "treadScrew",
			amt: (treadPlatePltAmt) * 4,
			discription: "Крепление щитов площадки",
			unit: "Площадка",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("rect", "platformShield", 2, partsList);
		}
	
	if(params.stairModel == "П-образная с забегом"){
		item = {
			id: "winderTread1",
			amt: 2,
			discription: "Первая и четвертая забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "winderTread2",
			amt: 2,
			discription: "Вторая и пятая забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "winderTread3",
			amt: 1,
			discription: "Третья забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "winderTread6",
			amt: 1,
			discription: "Шестая забежная ступень",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//шурупы крепления забежных ступеней
		item = {
			id: "treadScrew",
			amt: 28,
			discription: "Крепление забежных ступеней",
			unit: "Забег",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("забег", "winderTread1", 2, partsList);
		addTimberWorks("забег", "winderTread2", 2, partsList);
		addTimberWorks("забег", "winderTread3", 1, partsList);
		addTimberWorks("забег", "winderTread6", 1, partsList);
		}
	
	if(params.stairModel == "П-образная трехмаршевая"){
		
		item = {
			id: "rectTread_marsh2",
			amt: params.stairAmt2,
			discription: "Ступени среднего марша",
			unit: "Средний марш",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//шурупы крепления ступеней среднего марша
		item = {
			id: "treadScrew",
			amt: params.stairAmt2 * 4,
			discription: "Крепление ступеней к подложкам",
			unit: "Средний марш",
			itemGroup: "Ступени"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//расчет объема для фот
		addTimberWorks("rect", "rectTread_marsh2", params.stairAmt2, partsList);
		
		if(params.turnType_1 == "забег"){
			item = {
				id: "winderTread1",
				amt: 1,
				discription: "Нижняя забежная ступень нижний забег",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "winderTread2",
				amt: 1,
				discription: "Средняя забежная ступень нижний забег",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "winderTread3",
				amt: 1,
				discription: "Верхняя забежная ступень нижний забег",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//шурупы крепления забежных ступеней
			item = {
				id: "treadScrew",
				amt: 14,
				discription: "Крепление забежных ступеней",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);			
			
			//расчет объема для фот
			addTimberWorks("забег", "winderTread1", 1, partsList);
			addTimberWorks("забег", "winderTread2", 1, partsList);
			addTimberWorks("забег", "winderTread3", 1, partsList);
			} //end of params.turnType_1 == "забег"
			
		if(params.turnType_1 == "площадка"){			
			item = {
				id: "platformShield",
				amt: 2,
				discription: "Промежуточная площадка",
				unit: "Площадка",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//шурупы крепления щитов площадки
			item = {
				id: "treadScrew",
				amt: (treadPlatePltAmt + 1) * 4,
				discription: "Крепление щитов площадки",
				unit: "Площадка",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "platformShield", 2, partsList);
			
			} //end of params.turnType_1 == "площадка"
		
		if(params.turnType_2 == "забег"){
			item = {
				id: "winderTread1",
				amt: 1,
				discription: "Нижняя забежная ступень верхний забег",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "winderTread2",
				amt: 1,
				discription: "Средняя забежная ступень верхний забег",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			item = {
				id: "winderTread3",
				amt: 1,
				discription: "Верхняя забежная ступень верхний забег",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//шурупы крепления забежных ступеней
			item = {
				id: "treadScrew",
				amt: 14,
				discription: "Крепление забежных ступеней",
				unit: "Забег",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("забег", "winderTread1", 1, partsList);
			addTimberWorks("забег", "winderTread2", 1, partsList);
			addTimberWorks("забег", "winderTread3", 1, partsList);
		
			} //end of params.turnType_2 == "забег"
			
		if(params.turnType_2 == "площадка"){
		
			item = {
				id: "platformShield",
				amt: 2,
				discription: "Промежуточная площадка",
				unit: "Площадка",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//шурупы крепления щитов площадки
			item = {
				id: "treadScrew",
				amt: (treadPlatePltAmt + 1) * 4,
				discription: "Крепление щитов площадки",
				unit: "Площадка",
				itemGroup: "Ступени"
				};
			if(item.amt > 0) partsList.addItem(item);
			
			//расчет объема для фот
			addTimberWorks("rect", "platformShield", 2, partsList);
		
			} //end of params.turnType_2 == "площадка"
		
		}

	}//end of stairType != "нет"


function addColumns(){}; //пустая функция для навигации

	for (var i=0; i<staircasePartsParams.columns.length; i++){
		var columnId = "column" + i;
		item = {
				id: columnId,
				amt: 1,
				discription: "Опора лестницы",
				unit: "Колонны",
				itemGroup: "Каркас"
				};
			if(item.amt > 0) partsList.addItem(item);
		}
	
	var colAmt = staircasePartsParams.columns.length;
	
	if(params.model == "сварной"){
		item = {
			id: "bolt_M10x40",
			amt: colAmt*4,
			discription: "Крепление опор к косоурам",
			unit: "Колонны",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M10",
			amt: colAmt*4,
			discription: "Крепление опор к косоурам",
			unit: "Колонны",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		}
		
	if(params.model == "труба"){
		item = {
			id: "stud_M10x140",
			amt: colAmt*4,
			discription: "Крепление опор к косоурам",
			unit: "Колонны",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "nut_M10",
			amt: colAmt*8,
			discription: "Крепление опор к косоурам",
			unit: "Колонны",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		}
	
	item = {
			id: "shim_M10",
			amt: colAmt*8,
			discription: "Крепление опор к косоурам",
			unit: "Колонны",
			itemGroup: "Каркас"
			};
		if(item.amt > 0) partsList.addItem(item);
		
//end of addColumns



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
		fixPart: params.fixPart1,
		fixSurfaceType: params.fixType1,
		discription: "Крепление колонн к перекрытию",
		unit: "Низ лестницы",
		itemGroup: "Крепление к обстановке",
		amt: colAmt * 4,
		extraStudLength: 0,
		studDiam: 10,
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

function addFlans(){}; //пустая функция для навигации
	//фланцы крепления к перекрытиям
	
	item = {
        id: "topFloorFlan",
        amt: 1,
        discription: "Фланец",
        unit: "Косоур",
        itemGroup: "Каркас"
    };
    if(item.amt > 0) partsList.addItem(item);
	
	item = {
        id: "botFloorFlan",
        amt: 1,
        discription: "Фланец",
        unit: "Косоур",
        itemGroup: "Каркас"
    };
    if(item.amt > 0) partsList.addItem(item);
	
	var wallFlanAmt = 0;
	if(params.stairModel == "Г-образная с площадкой" || params.stairModel == "Г-образная с забегом") wallFlanAmt = 1;
	if(params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом" ||
	params.stairModel == "П-образная трехмаршевая") wallFlanAmt = 2;
	
	item = {
        id: "wallFlan",
        amt: wallFlanAmt,
        discription: "Фланец",
        unit: "Косоур",
        itemGroup: "Каркас"
    };
    if(item.amt > 0) partsList.addItem(item);
	
	item = {
		id: "hexVint_M10x30",
		amt: (wallFlanAmt + 2)*4,
		discription: "Крепление фланцев каркаса",
		unit: "Косоур",
		itemGroup: "Каркас"
		};
	if(item.amt > 0) partsList.addItem(item);
		
	item = {
		id: "nut_M10",
		amt: (wallFlanAmt + 2)*4,
		discription: "Крепление фланцев каркаса",
		unit: "Косоур",
		itemGroup: "Каркас"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	item = {
		id: "shim_M10",
		amt: (wallFlanAmt + 2)*4,
		discription: "Крепление фланцев каркаса",
		unit: "Косоур",
		itemGroup: "Каркас"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	
	
	

//end of addFlans

	
function addRailingItems(){}; //пустая функция для навигации
	
	
/***  ОГРАЖДЕНИЯ ***/
	
	//рассчитываем параметры ограждений
	railingParams = calcRailingParams();


//стойки ограждений
	if(params.railingModel == "Ригели" || params.railingModel == "Стекло на стойках"){
	
	//нижний марш
	item = {
		id: "firstBal",
		amt: railingParams.firstBalAmt,
		discription: "Первые стойки",
		unit: "Ограждения",
		itemGroup: "Ограждения"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	item = {
		id: "bal",
		amt: railingParams.marshBalAmt1,
		discription: "Стойки ограждения нижнего марша",
		unit: "Ограждения",
		itemGroup: "Ограждения"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	//средний марш
	item = {
		id: "bal",
		amt: railingParams.marshBalAmt2,
		discription: "Стойки ограждения среднего марша",
		unit: "Ограждения",
		itemGroup: "Ограждения"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	//верхний марш
	item = {
		id: "bal",
		amt: railingParams.marshBalAmt3,
		discription: "Стойки ограждения верхнего марша",
		unit: "Ограждения",
		itemGroup: "Ограждения"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	//угловые стойки
	item = {
		id: "cornerBal",
		amt: railingParams.cornerBalAmt,
		discription: "Угловые удлиненные стойки ограждения",
		unit: "Ограждения",
		itemGroup: "Ограждения"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	//стойки площадки
	item = {
		id: "L_BalAmt",
		amt: railingParams.L_BalAmt,
		discription: "L-образные стойки",
		unit: "Ограждения",
		itemGroup: "Ограждения"
		};
	if(item.amt > 0) partsList.addItem(item);
	
	if(params.banisterMaterial == "40х40 нерж+дуб"){
			addTimberWorks("combBanister", "combinedBanister", railingParams.handrailHolderAmt, partsList);
			}
	
	// основание штыря
		if(params.banisterMaterial == "40х40 нерж." || params.banisterMaterial == "40х40 нерж+дуб"){
		    item = {
				id:  "handrailHolderBase",
				amt: railingParams.handrailHolderAmt,
				discription: "Крепление поручня к стойкам",
				unit: "banisterItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
			
		if(params.banisterMaterial == "40х40 черн."){
		    item = {
				id:  "nut_M8",
				amt: railingParams.handrailHolderAmt,
				discription: "Крепление кронштейна поручня к основанию",
				unit: "banisterItemsAdd",
				itemGroup: "Ограждения",
				};
			if(item.amt > 0) partsList.addItem(item);
			}
			
		// штыри
		item = {
		    id:  "handrailHolderTurn",
		    amt: railingParams.handrailHolderAmt,
		    discription: "Крепление поручня к стойкам",
		    unit: "banisterItemsAdd",
		    itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
		    id:  "vint_M6x10",
		    amt: railingParams.handrailHolderAmt,
		    discription: "Крепление лодочки к штырю",
		    unit: "banisterItemsAdd",
		    itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//лодочки
		var handrailHolderFlanId = "handrailHolderFlanPlane";
		if(staircasePartsParams.handrailPar.handrailModel == "round")
			handrailHolderFlanId = "handrailHolderFlanArc";

		item = {
			id:  handrailHolderFlanId,
			amt: railingParams.handrailHolderAmt,
			discription: "Крепление поручня к стойкам",
			unit: "banisterItemsAdd",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);
				
		// шурупы
		var handrailScrewId = "timberHandrailScrew";
		if(staircasePartsParams.handrailPar.mat == "metal") handrailScrewId = "metalHandrailScrew";
		
		item = {
			id:  handrailScrewId,
			amt: 2 * railingParams.handrailHolderAmt,
			discription: "Крепление поручня к стойкам",
			unit: "banisterItemsAdd",
			itemGroup: "Ограждения",
			};
		if(item.amt > 0) partsList.addItem(item);	
	
		item = {
			id: "handrailHolderAng",
			amt: railingParams.handrailHolderAngAmt,
			discription: "Кронштейн поручня для угловых стоек",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
	
		
			
	}
 	
//уголки крепления балясин к ступеням
	if(params.railingModel != "Самонесущее стекло"){
		item = {
			id: "angle20",
			amt: railingParams.angleAmt,
			discription: "Крепление стоек ограждения к ступеням",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "treadScrew",
			amt: railingParams.angleAmt * 2,
			discription: "Крепление уголков стоек ограждения к ступеням",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "rivet_M6",
			amt: railingParams.angleAmt,
			discription: "Крепление стоек ограждения к ступеням",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		partsList.rivet_M6.comment = "Выдать в цех"
		
		item = {
			id: "bolt_M6x20",
			amt: railingParams.angleAmt,
			discription: "Крепление уголков к стойкам ограждений",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "shim_M6",
			amt: railingParams.angleAmt,
			discription: "Крепление уголков к стойкам ограждений",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//заглушки стоек
		var plugAmt = railingParams.marshBalAmt1 + railingParams.marshBalAmt2 + railingParams.marshBalAmt3 + railingParams.cornerBalAmt
		item = {
			id: "plasticPlug_40_40",
			amt: plugAmt,
			discription: "Стойки площадки",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		//крышки фланцев первых стоек
		item = {
			id: firstBalFlanCoverId,
			amt: railingParams.firstBalAmt,
			discription: "Первые стойки",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		
	
		}

		
//ригели
	if(params.railingModel == "Ригели"){

		// расчет кол-ва фурнитуры
		var rackAmt = railingParams.handrailHolderAmt + railingParams.cornerBalAmt; //общее кол-во стоек
		var jointAmt = calcRailingJointAmt(); //кол-во стыков ограждения с шарнирами
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
		
		
		var metalPaint = false;
		if(params.rigelMaterial == "20х20 черн.") metalPaint = true;

		var itemsPar = {
			specObj: partsAmt,
			partName: "rigels",
			metalPaint: metalPaint,
			timberPaint: false,
			division: "metal",
			itemGroup: "Ограждения",
			}
		
		partsList.addSpecObjItems(itemsPar);
		
		var rigelAmt = getPartAmt("rigels");
		
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
			
} //end of ригели
	
		
//стекло на стойках		
	if(params.railingModel == "Стекло на стойках"){
		item = {
			id: "glassSet",
			amt: railingParams.glassAmt,
			discription: "Стекла ограждения",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: "glassHolder",
			amt: railingParams.glassHolderAmt,
			discription: "Крепление стекол к стойкам",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);
		
		item = {
			id: glassHolderScrewId,
			amt: railingParams.glassHolderAmt,
			discription: "Крепление стеклодержателей к стойкам",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);		
		} //eng of Стекло на стойках

//ковка		
	if(params.railingModel == "Кованые балясины"){		
		item = {
			id: "forgedSection",
			amt: railingParams.sectionAmt,
			discription: "Крепление стеклодержателей к стойкам",
			unit: "Ограждения",
			itemGroup: "Ограждения"
			};
		if(item.amt > 0) partsList.addItem(item);	
		}
		
//самонесущее стекло
	if(params.railingModel == "Самонесущее стекло") {
		item = {
			id: "glassSet",
			amt: railingParams.glassAmt,
			discription: "Стекла ограждения",
			unit: "Ограждения",
			itemGroup: "Ограждения"
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
	calcSpecBanister(partsList);
	
function addWorks(){}


//ступени, детали каркаса
addTimberWorksCarcas("tread") //функция в works.js
addTimberWorksCarcas("wndTread")
addTimberWorksCarcas("riser")
addTimberWorksCarcas("riser_arc")
addTimberWorksCarcas("startTread")

//плинтус
addTimberWorksCarcas("skirting_vert")
addTimberWorksCarcas("skirting_hor")
		
//детали ограждений
addTimberWorksRailing("handrails") //функция в works.js
if(params.banisterMaterial == "40х40 нерж+дуб") addTimberWorksRailing("racks")



	
	

	
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
	printPartsAmt();
	
} //end of calculateSpec

function showDrawingsLinks(){
//console.log("adsfa")
	var pathTreads = "/drawings/treads/";
	var pathRailing = "/drawings/railing_mono/"
	var fileNameRectTread = "rectTreads_mono.pdf";
	if(params.model == "труба") fileNameRectTread = "rectTreads_mono_pipe.pdf";
	var fileNameWndTread = "winderTreads";
	var fileNamePlatformHalf = "platformHalf"
	
	var turnSideName = "_right";
	if(params.turnSide == "левое") turnSideName = "_left";
	
	var stairType = "timber";
	if(params.stairType == "нет") stairType = "no";


		
	fileNameWndTread += "_mono";
	fileNamePlatformHalf += "_mono"; 

	fileNameWndTread += turnSideName;
	
	fileNameWndTread += ".pdf";
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
	//Прямые ступени
	if(stairType == "timber") links += "<a href='" + pathTreads + fileNameRectTread + "' target='_blank'>Прямые ступени</a><br/>";
	//Забежные ступени
	if(stairType == "timber" && isWinder) links += "<a href='" + pathTreads + fileNameWndTread + "' target='_blank'>Забежные ступени</a><br/>";
	//половинки площадки
	if(stairType == "timber" && isPlatform) links += "<a href='" + pathTreads + fileNamePlatformHalf + "' target='_blank'>Щиты площадки</a><br/>" 
	//стойки ограждений
	if(railingSide_1 != "нет" || railingSide_2 != "нет" || railingSide_3 != "нет"){
		if(params.banisterMaterial == "40х40 черн.") var filename = "rack";
		if(params.banisterMaterial == "40х40 нерж.") var filename = "rack_inox";
			links += "<a href='" + pathRailing + filename + ".pdf' target='_blank'>Стойки ограждения марша</a><br/>";
			links += "<a href='" + pathRailing + filename + "_first.pdf' target='_blank'>Первая стойка ограждения марша</a><br/>";
			links += "<a href='" + pathRailing + filename + "_L.pdf' target='_blank'>L-образная стойка ограждения марша</a><br/>";
			
		}
	if(params.railingModel_bal == "Ригели" || params.railingModel_bal == "Стекло на стойках"){
		links += "<a href='" + pathRailing + filename + "_bal.pdf' target='_blank'>Стойка ограждения балюстрады</a><br/>";
		}
	
	//колонны
	if(params.marshMiddleFix_1 == "колонна" || 
		params.marshMiddleFix_2 == "колонна" || 
		params.marshMiddleFix_3 == "колонна" ||
		params.isColumn1 || params.isColumn2 || params.isColumn3 || params.isColumn4){
			links += "<a href='/drawings/carcas/column_mono.pdf' target='_blank'>Колонны марша</a><br/>";
			}
	
	 $("#drawings").html(links)

}//end of showDrawingsLinks



















function calcRailingParams(){
	var marshBalAmt1 = 0; //балясины первого марша
	var marshBalAmt2 = 0; //балясины второго марша
	var marshBalAmt3 = 0; //балясины третьего марша
	var firstBalAmt = 0; //стартовые балясины
	var cornerBalAmt = 0; //угловые балясины
	var L_BalAmt = 0; //L - образные стойки на угол площадки
	var handrailAmt = 0;
	var handrailHolderAmt = 0;
	var handrailHolderAngAmt = 0; //угловой кронштейн поручня к поворотной стойке
	var angleAmt = 0;
	var rigelAmt = 0;
	var rigelHolderAmt = 0;
	var glassHolderAmt = 0;
	var glassAmt = 0;
	var sectionAmt = 0;
	var handrailLength = 0;
	var stepLength1 = Math.sqrt(params.b1*params.b1 + params.h1*params.h1);
	var stepLength2 = Math.sqrt(params.b2*params.b2 + params.h2*params.h2);
	var stepLength3 = Math.sqrt(params.b3*params.b3 + params.h3*params.h3);
	
	if(params.stairModel == "Прямая"){		
		if(params.platformTop == "нет"){
			if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
				firstBalAmt += 1;
				L_BalAmt += 1;
				marshBalAmt1 += calcMarshBal(params.stairAmt1) - 2;
				sectionAmt += 1;
				glassAmt += marshBalAmt1 - 1;
				rigelAmt += 1;
				handrailLength += stepLength1 * params.stairAmt1;				
				}
			if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") {
				firstBalAmt += 1;
				L_BalAmt += 1;
				marshBalAmt1 += calcMarshBal(params.stairAmt1) - 2;
				sectionAmt += 1;
				glassAmt += marshBalAmt1 - 1;
				rigelAmt += 1;
				handrailLength += stepLength1 * params.stairAmt1;
				}
			}
		if(params.platformTop == "есть"){
			if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
				firstBalAmt += 1;
				marshBalAmt1 += calcMarshBal(params.stairAmt1 + 1) - 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt1 - 1;
				rigelAmt += 1;
				handrailLength += stepLength1 * params.stairAmt1;
				}
			if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") {
				firstBalAmt += 1;
				marshBalAmt1 += calcMarshBal(params.stairAmt1 + 1) - 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt1 - 1;
				rigelAmt += 1;
				handrailLength += stepLength1 * params.stairAmt1;
				}
			if(topPltRailing_3) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_4){
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				sectionAmt += 1;
				glassAmt += L_BalAmt - 1;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_5) {
				L_BalAmt += Math.ceil(params.M/1000) + 1;
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.M;
				}
			}
		
		}//end of Прямая
		
	if(params.stairModel == "Г-образная с площадкой" || params.stairModel == "Г-образная с забегом"){		
		
		//нижний марш
		if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") {
			firstBalAmt += 1;
			marshBalAmt1 += calcMarshBal(params.stairAmt1) - 2;			
			sectionAmt += 1;
			glassAmt += marshBalAmt1 - 1;
			rigelAmt += 1;
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				handrailHolderAngAmt = 1;
				cornerBalAmt += 1;
				}
			else marshBalAmt1 += 1;
			handrailLength += stepLength1 * params.stairAmt1;
			}
		if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			firstBalAmt += 1;
			marshBalAmt1 += calcMarshBal(params.stairAmt1 + 1) - 1;
			L_BalAmt += 1;
			sectionAmt += 1;
			glassAmt += marshBalAmt1 - 1;
			rigelAmt += 1;
			handrailLength += stepLength1 * params.stairAmt1 + params.M;
			}
		
		//верхний марш
		if(params.platformTop == "нет"){
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				L_BalAmt += 1;
				marshBalAmt3 += calcMarshBal(params.stairAmt3) - 1;
				if(cornerBalAmt == 0) cornerBalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3;
				}
			if(params.railingSide_3 == "внешнее" || params.railingSide_1 == "две") {
				L_BalAmt += 1;
				marshBalAmt3 += calcMarshBal(params.stairAmt3);
				L_BalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3 + params.M;
				}
			}
		if(params.platformTop == "есть"){
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				marshBalAmt3 += calcMarshBal(params.stairAmt3 + 1);
				if(cornerBalAmt == 0) cornerBalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength1 * params.stairAmt1;
				}
			if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
				marshBalAmt3 += calcMarshBal(params.stairAmt3 + 1);
				L_BalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3 + params.M;
				}
			if(topPltRailing_3) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_4){
				L_BalAmt += Math.ceil(params.M/1000) + 1;
				sectionAmt += 1;
				glassAmt += L_BalAmt - 1;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_5) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.M;
				}
			}
		
		}//end of Г-образная
		

	if(params.stairModel == "П-образная с площадкой" || params.stairModel == "П-образная с забегом"){		
		//нижний марш
		if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") {
			firstBalAmt += 1;
			marshBalAmt1 += calcMarshBal(params.stairAmt1) - 2;
			if(params.marshDist == 40) cornerBalAmt += 1;
			if(params.marshDist > 40) marshBalAmt1 += 1;	
			sectionAmt += 1;
			glassAmt += marshBalAmt1 - 1;
			rigelAmt += 1;
			handrailLength += stepLength1 * params.stairAmt1;
			}
		if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			firstBalAmt += 1;
			marshBalAmt1 += calcMarshBal(params.stairAmt1 + 1) - 1;
			L_BalAmt += 1;
			sectionAmt += 1;
			glassAmt += marshBalAmt1 - 1;
			rigelAmt += 1;
			handrailLength += stepLength1 * params.stairAmt1 + params.platformLength_1;
			}
		
		//верхний марш
		if(params.platformTop == "нет"){
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				L_BalAmt += 1;
				marshBalAmt3 += calcMarshBal(params.stairAmt3) - 2;
				if(params.marshDist == 40 && cornerBalAmt == 0) cornerBalAmt += 1;
				if(params.marshDist > 40) marshBalAmt3 += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3;
				}
			if(params.railingSide_3 == "внешнее" || params.railingSide_1 == "две") {
				L_BalAmt += 1;
				marshBalAmt3 += calcMarshBal(params.stairAmt3)-1;
				L_BalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3 + params.platformLength_1;
				}
			}
		if(params.platformTop == "есть"){
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				marshBalAmt3 += calcMarshBal(params.stairAmt3 + 1);
				cornerBalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3;
				}
			if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
				marshBalAmt3 += calcMarshBal(params.stairAmt3 + 1);
				L_BalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3 + params.platformLength_1;
				}
			if(topPltRailing_3) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_4){
				L_BalAmt += Math.ceil(params.M/1000) + 1;
				sectionAmt += 1;
				glassAmt += L_BalAmt - 1;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_5) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.M;
				}
			}
		
		}//end of П-образная
	
	if(params.stairModel == "П-образная трехмаршевая"){		
		//нижний марш
		if(params.railingSide_1 == "внутреннее" || params.railingSide_1 == "две") {
			firstBalAmt += 1;
			marshBalAmt1 += calcMarshBal(params.stairAmt1) - 2;
			cornerBalAmt += 1;			
			sectionAmt += 1;
			glassAmt += marshBalAmt1 - 1;
			rigelAmt += 1;
			handrailLength += stepLength1 * params.stairAmt1;
			}
		if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			firstBalAmt += 1;
			marshBalAmt1 += calcMarshBal(params.stairAmt1 + 1)-1;
			L_BalAmt += 1;
			sectionAmt += 1;
			glassAmt += marshBalAmt1 - 1;
			rigelAmt += 1;
			handrailLength += stepLength1 * params.stairAmt1 + params.M;
			}
		
		//средний марш
		if(params.railingSide_2 == "внутреннее" || params.railingSide_2 == "две") {
			marshBalAmt1 += calcMarshBal(params.stairAmt2) - 2;
			cornerBalAmt += 1;			
			sectionAmt += 1;
			glassAmt += marshBalAmt2 - 1;
			rigelAmt += 1;
			handrailLength += stepLength2 * params.stairAmt2;
			}
		if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
			marshBalAmt1 += calcMarshBal(params.stairAmt2 + 1);
			L_BalAmt += 1;
			sectionAmt += 1;
			glassAmt += marshBalAmt2 - 1;
			rigelAmt += 1;
			handrailLength += stepLength2 * params.stairAmt2 + params.M * 2;
			}
		
		//верхний марш
		if(params.platformTop == "нет"){
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				L_BalAmt += 1;
				marshBalAmt3 += calcMarshBal(params.stairAmt3) - 2;
				if(cornerBalAmt == 0) cornerBalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3;
				}
			if(params.railingSide_3 == "внешнее" || params.railingSide_1 == "две") {
				L_BalAmt += 1;
				marshBalAmt3 += calcMarshBal(params.stairAmt3) - 1;
				L_BalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3 + params.M;
				}
			}
		if(params.platformTop == "есть"){
			if(params.railingSide_3 == "внутреннее" || params.railingSide_3 == "две") {
				marshBalAmt3 += calcMarshBal(params.stairAmt1 + 1);
				if(cornerBalAmt == 0) cornerBalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3;
				}
			if(params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") {
				marshBalAmt3 += calcMarshBal(params.stairAmt1 + 1);
				L_BalAmt += 1;
				sectionAmt += 1;
				glassAmt += marshBalAmt3 - 1;
				rigelAmt += 1;
				handrailLength += stepLength3 * params.stairAmt3 + params.M;
				}
			if(topPltRailing_3) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_4){
				L_BalAmt += Math.ceil(params.M/1000) + 1;
				sectionAmt += 1;
				glassAmt += L_BalAmt - 1;
				rigelAmt += 1;
				handrailLength += params.platformLength_3;
				}
			if(topPltRailing_5) {
				L_BalAmt += Math.ceil(params.platformLength_3/1000);
				glassAmt += L_BalAmt;
				rigelAmt += 1;
				handrailLength += params.M;
				}
			}
		
		}//end of трехмаршевая
		
		handrailHolderAmt = firstBalAmt + marshBalAmt1 + marshBalAmt2 + marshBalAmt3 + cornerBalAmt + L_BalAmt;
		angleAmt = (marshBalAmt1 + marshBalAmt2 + marshBalAmt3) * 2 + firstBalAmt;
		
		if(params.stairModel == "Г-образная с площадкой"){
			if(angleAmt != 0) angleAmt += 3;
			}			
		if(params.stairModel == "Г-образная с забегом"){
			if(angleAmt != 0) angleAmt += 5;
			}
		if(params.stairModel == "П-образная с площадкой"){
			if(angleAmt != 0) angleAmt += 3;
			}
		if(params.stairModel == "П-образная с забегом"){
			if(angleAmt != 0) angleAmt += 8;
			}
		if(params.stairModel == "П-образная трехмаршевая"){
			if(params.turnType_1 == "площадка") if(angleAmt != 0) angleAmt += 3;
			if(params.turnType_1 == "забег") if(angleAmt != 0) angleAmt += 5;
			if(params.turnType_2 == "площадка") if(angleAmt != 0) angleAmt += 3;
			if(params.turnType_2 == "забег") if(angleAmt != 0) angleAmt += 5;
			}
		
		handrailAmt = rigelAmt;
		rigelAmt = rigelAmt * params.rigelAmt;
		rigelHolderAmt = (marshBalAmt1 + marshBalAmt2 + marshBalAmt3 + cornerBalAmt * 2 + L_BalAmt) * params.rigelAmt;
		glassHolderAmt = glassAmt * 4;
		
		
		//формируем возвращаемый объект
		var railingParams = {
			firstBalAmt: firstBalAmt,
			marshBalAmt1: marshBalAmt1,
			marshBalAmt2: marshBalAmt2,
			marshBalAmt3: marshBalAmt3,
			cornerBalAmt: cornerBalAmt,
			L_BalAmt: L_BalAmt,
			handrailAmt: handrailAmt,
			handrailHolderAmt: handrailHolderAmt,
			handrailHolderAngAmt: handrailHolderAngAmt,
			angleAmt: angleAmt,
			rigelAmt: rigelAmt,
			rigelHolderAmt: rigelHolderAmt,
			glassAmt: glassAmt,
			glassHolderAmt: glassHolderAmt,
			sectionAmt: sectionAmt,
			handrailLength: handrailLength,
	
			};
		return railingParams;
	} //end of calcRailingParams()
	

// функция расчёта кол-ва стоек в зависимости от числа прямых ступеней
function calcMarshBal(stairAmt) {

		var newellAmt = [];
		
		/*кол-во стоек*/
		newellAmt[0] = 0;
		newellAmt[1] = 0;
		newellAmt[2] = 2;
		newellAmt[3] = 2;
		newellAmt[4] = 2;
		newellAmt[5] = 3;
		newellAmt[6] = 3;
		newellAmt[7] = 3;
		newellAmt[8] = 4;
		newellAmt[9] = 4;
		newellAmt[10] = 4;
		newellAmt[11] = 5;
		newellAmt[12] = 5;
		newellAmt[13] = 5;
		newellAmt[14] = 6;
		newellAmt[15] = 6;
		newellAmt[16] = 6;
		newellAmt[17] = 7;
		newellAmt[18] = 7;
		newellAmt[19] = 7;
		

		return newellAmt[stairAmt];

    } // end of calcMarshBal()