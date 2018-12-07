var costMarkup=1.15;

function calculateCarcasPrice(){

params.model = "лт"//временная адаптация монокосоура
var model = params.model;
var stairModel = params.stairModel;
var platformWidth_1 = params.platformWidth_1;
var platformLength_1 = params.platformLength_1;
var turnType_1 = params.turnType_1;
var turnType_2 = params.turnType_2;
var platformTop = params.platformTop;
var platformLength_3 = params.platformLength_3;
var platformTopColumn = params.platformTopColumn;
var topFlan = params.topFlan;
var columnModel = params.columnModel;
var columnAmt = params.columnAmt;
var columnLength = params.columnLength;
var M = params.M;
var stringerType = params.stringerType;
var stairType = params.stairType;
var riserType = params.riserType;
var stairFrame = params.stairFrame;
var stairAmt1 = params.stairAmt1;
var h1 = params.h1;
var b1 = params.b1;
var a1 = params.a1;
var stairAmt2 = params.stairAmt2; 
var h2 = params.h2;
var b2 = params.b2;
var a2 = params.a2;
var stairAmt3 = params.stairAmt3;
var h3 = params.h3;
var b3 = params.b3;
var a3 = params.a3;
var fixType1 = params.fixType1;
var fixAmt1 = params.fixAmt1;
var fixType2 = params.fixType2;
var fixAmt2 = params.fixAmt2;
var fixType3 = params.fixType3;
var fixAmt3 = params.fixAmt3;
var bottomAngleType = params.bottomAngleType;
var metalPaint = params.metalPaint;
var timberPaint = params.timberPaint;
//var install = params.install;

//ширина верхней площадки равна ширине верхнего марша
var platformWidth_3 = M;

/*** ТЕТИВЫ ***/
var stringerArea = 0; //общая площадь всех тетив
var strigerPrice = 0; //общая стоимость косоуров
var stringerWeight = 0; //общий вес косоуров

calcStringer();
//console.log(stringerArea, strigerPrice, stringerWeight)

function calcStringer(){
var stringerStepLength1 = Math.sqrt(h1*h1 + b1*b1)/1000;
var stringerStepLength2 = Math.sqrt(h2*h2 + b2*b2)/1000;
var stringerStepLength3 = Math.sqrt(h3*h3 + b3*b3)/1000; 
var	stringerStepWidth = 0.3;

	
if (stairModel == "Прямая"){
	stringerArea = stringerStepLength1 * stringerStepWidth * stairAmt1 * 2;
	//console.log(stringerStepLength1, stringerStepWidth, stairAmt1)
	}
if (stairModel == "Г-образная с площадкой"){
	//нижний марш
	stringerArea = stringerStepLength1 * stringerStepWidth * stairAmt1 * 2;
	//площадка
	stringerArea  = stringerArea + M/1000 * 0.15 * 4;
	//верхний марш
	stringerArea = stringerArea + stringerStepLength3 * stringerStepWidth * stairAmt3 * 2;
	}
if (stairModel == "Г-образная с забегом"){
	//нижний марш
	stringerArea = stringerStepLength1 * stringerStepWidth * stairAmt1 * 2;
	//забег
	stringerArea  = stringerArea + M/1000 * h3/1000 * 5;
	//верхний марш
	stringerArea = stringerArea + stringerStepLength3 * stringerStepWidth * stairAmt3 * 2;
	}
if (stairModel == "П-образная с площадкой"){
	//нижний марш
	stringerArea = stringerStepLength1 * stringerStepWidth * stairAmt1 * 2;
	//площадка
	stringerArea  = stringerArea + platformLength_1/1000 * 2 * 0.15 + platformWidth_1/1000 * 4 * 0.15;
	//верхний марш
	stringerArea = stringerArea + stringerStepLength3 * stringerStepWidth * stairAmt3 * 2;
	}
if (stairModel == "П-образная с забегом"){
	//нижний марш
	stringerArea = stringerStepLength1 * stringerStepWidth * stairAmt1 * 2;
	//забег
	stringerArea  = stringerArea + M/1000 * h3/1000 * 10;
	//верхний марш
	stringerArea = stringerArea + stringerStepLength3 * stringerStepWidth * stairAmt3 * 2;
	}
if (stairModel == "П-образная трехмаршевая"){
	//нижний марш
	stringerArea = stringerStepLength1 * stringerStepWidth * stairAmt1 * 2;
	//повороты
	stringerArea  = stringerArea + M/1000 * h3/1000 * 10;
	//средний марш
	stringerArea = stringerArea + stringerStepLength2 * stringerStepWidth * stairAmt2 * 2;
	//верхний марш
	stringerArea = stringerArea + stringerStepLength3 * stringerStepWidth * stairAmt3 * 2;
	}

/*верхняя площадка*/
if (platformTop == "площадка") stringerArea += platformWidth_3*2*0.2/1000 + platformLength_3*2*0.2/1000;
	
var stringerMeterPrice = 4500; //цена тетивы из листа за м2	
strigerPrice = stringerMeterPrice * stringerArea;
stringerWeight = stringerArea * 62.4;

if (M > 1200) strigerPrice = strigerPrice * 1.5; //добавляется третий косоур

} //end of calcStringer()


/*** ДЕТАЛИ КАРКАСА ***/

var platformMetalListArea = 0;
var stairAngleAmt = 0;
var carcasAngleAmt = 0;
var baseFixAngleAmt = 0;
var frameAmt = 0;
var totalAnglePrice = 0; //общая цена всех гнутых уголков
var totalAnglePrice = 0;
var totalBoltPrice = 0;
var totalFramePrice = 0;



calcCarcasParts();

function calcCarcasParts(){
var stairAnglePrice = 50; //стоимость уголка ступени
//var stairAngleAmt;

var boltAmt;
if (model=="лт") var boltPrice = 10;
if (model=="ко") var boltPrice = 5;
//var totalBoltPrice;
//var carcasAngleAmt;
//var baseFixAngleAmt;
var carcasAnglePrice = 60;
var totalCarcasAnglePrice;
//var frameAmt;
var framePrice = 200;
if (model=="лт") framePrice = 300;
if (stairType == "рифленая сталь" || stairType == "лотки") {
	framePrice = 500;
	stairFrame = "есть"
	}
	
var brigeAmt1=0;
if (stairAmt1 > 5) brigeAmt1=1;
if (stairAmt1 > 8) brigeAmt1=2;
var brigeAmt2=0;
if (stairAmt2 > 5) brigeAmt2=1;
if (stairAmt2 > 8) brigeAmt2=2;
var brigeAmt3=0;
if (stairAmt1 > 5) brigeAmt3=1;
if (stairAmt1 > 8) brigeAmt3=2;
//var platformMetalListArea = 0;

if (stairModel == "Прямая"){
	if (stairFrame == "нет") {
		stairAngleAmt = stairAmt1 * 2 + brigeAmt1 * 2;
		carcasAngleAmt = brigeAmt1*2;
		baseFixAngleAmt = 4;
		frameAmt = 0;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4;		
		}
	if (stairFrame == "есть") {
		stairAngleAmt = 0;
		carcasAngleAmt = 0;
		baseFixAngleAmt = 4;
		frameAmt = stairAmt1;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4;	
		}
	if (stairAmt1 > 10) boltAmt += 16;	
	}
if (stairModel == "Г-образная с площадкой"){
	if (stairFrame == "нет") {
		brigeAmt1 += 2;
		stairAngleAmt = stairAmt1*2 + brigeAmt1*2 + stairAmt3*2 + brigeAmt3*2 + 8;
		carcasAngleAmt = brigeAmt1*2 + brigeAmt3*2 + 4;
		baseFixAngleAmt = 4;
		frameAmt = 0;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 8;		
		}
	if (stairFrame == "есть") {
		stairAngleAmt = 2;
		carcasAngleAmt = 4;
		baseFixAngleAmt = 4;
		frameAmt = stairAmt1 + stairAmt3 + 2;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 12;	
		}
	if (stairAmt1 > 10) boltAmt += 16;
	if (stairAmt3 > 10) boltAmt += 16;	
	if (stairType == "рифленая сталь" || stairType == "лотки") platformMetalListArea = M*M/1000000;
	}
if (stairModel == "Г-образная с забегом"){
	if (stairFrame == "нет") {
		brigeAmt1 += 2;
		stairAngleAmt = stairAmt1*2 + brigeAmt1*2 + stairAmt3*2 + brigeAmt3*2 + 7;
		carcasAngleAmt = brigeAmt1*2 + brigeAmt3*2 + 4;
		baseFixAngleAmt = 4;
		frameAmt = 0;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 8;		
		}
	if (stairFrame == "есть") {
		stairAngleAmt = 0;
		carcasAngleAmt = 4;
		baseFixAngleAmt = 4;
		frameAmt = stairAmt1 + stairAmt3 + 3;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 12;	
		}
	if (stairAmt1 > 10) boltAmt += 16;
	if (stairAmt3 > 10) boltAmt += 16;		
	if (stairType == "рифленая сталь" || stairType == "лотки") platformMetalListArea = M*M/1000000;
	}
if (stairModel == "П-образная с площадкой"){
	if (stairFrame == "нет") {
		stairAngleAmt = stairAmt1*2 + brigeAmt1*2 + stairAmt3*2 + brigeAmt3*2 + 20;
		carcasAngleAmt = brigeAmt1*2 + brigeAmt3*2 + 12;
		baseFixAngleAmt = 4;
		frameAmt = 0;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 8;		
		}
	if (stairFrame == "есть") {
		stairAngleAmt = 4;
		carcasAngleAmt = 12;
		baseFixAngleAmt = 4;
		frameAmt = stairAmt1 + stairAmt3 + 4;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 12;	
		}
	if (stairAmt1 > 10) boltAmt += 16;
	if (stairAmt3 > 10) boltAmt += 16;	
	if (stairType == "рифленая сталь" || stairType == "лотки") platformMetalListArea = platformLength_1*platformWidth_1/1000000;	
	
	}
if (stairModel == "П-образная с забегом"){
	if (stairFrame == "нет") {
		brigeAmt1 += 3;
		stairAngleAmt = stairAmt1*2 + brigeAmt1*2 + stairAmt3*2 + brigeAmt3*2 + 15;
		carcasAngleAmt = brigeAmt1*2 + brigeAmt3*2 + 8;
		baseFixAngleAmt = 4;
		frameAmt = 0;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 8;		
		}
	if (stairFrame == "есть") {
		stairAngleAmt = 0;
		carcasAngleAmt = 8;
		baseFixAngleAmt = 4;
		frameAmt = stairAmt1 + stairAmt3 + 6;
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 12;	
		}
	if (stairAmt1 > 10) boltAmt += 16;
	if (stairAmt3 > 10) boltAmt += 16;	
	if (stairType == "рифленая сталь" || stairType == "лотки") platformMetalListArea = M*M*2/1000000;
	}
if (stairModel == "П-образная трехмаршевая"){
	if (stairFrame == "нет") {
		stairAngleAmt = stairAmt1*2 + brigeAmt1*2 + stairAmt2*2 + brigeAmt2*2+ stairAmt3*2 + brigeAmt3*2;
		carcasAngleAmt = brigeAmt1*2 + brigeAmt2*2 + brigeAmt3*2 + 4;
		baseFixAngleAmt = 4;
		frameAmt = 0;
		if (turnType_1 == "забег") stairAngleAmt += 7;
		if (turnType_1 == "площадка") stairAngleAmt += 8;
		if (turnType_2 == "забег") stairAngleAmt += 7;
		if (turnType_2 == "площадка") stairAngleAmt += 8;
	
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 8;		
		}
	if (stairFrame == "есть") {
		stairAngleAmt = 0;
		carcasAngleAmt = 0;
		baseFixAngleAmt = 4;
		frameAmt = stairAmt1 + stairAmt2 + stairAmt3;
		if (turnType_1 == "забег") frameAmt += 3;
		if (turnType_1 == "площадка") frameAmt += 2;
		if (turnType_2 == "забег") frameAmt += 3;
		if (turnType_2 == "площадка") frameAmt += 2;		
		boltAmt = stairAngleAmt*2 + carcasAngleAmt*4 + baseFixAngleAmt*2 + frameAmt*4 + 8;	
		}
	if (stairAmt1 > 10) boltAmt += 16;
	if (stairAmt2 > 10) boltAmt += 16;
	if (stairAmt3 > 10) boltAmt += 16;
	if (stairType == "рифленая сталь" || stairType == "лотки") platformMetalListArea = M*M*2/1000000;	
	}
	
if (platformTop == "площадка") {
if (stairFrame == "нет") {
		var brigeAmtTopPlatform = Math.floor(platformLength_3/1000);
		var stairAngleAmtTopPlatform = Math.floor(platformLength_3/500) * 2 + Math.floor(platformWidth_3/1000) *2 + brigeAmt1*2;
		var carcasAngleAmtTopPlatform = brigeAmtTopPlatform*2 + 2;
		var boltAmtTopPlatform = stairAngleAmtTopPlatform*2 + carcasAngleAmtTopPlatform*4;
		stairAngleAmt += stairAngleAmtTopPlatform;
		carcasAngleAmt += carcasAngleAmtTopPlatform;
		boltAmt += boltAmtTopPlatform;		
		}
	if (stairFrame == "есть") {
		var frameAmtTopPlatform = Math.floor(platformLength_3/500);
		var boltAmtTopPlatform = frameAmtTopPlatform  * 4 + 16;
		carcasAngleAmt += 4; 
		frameAmt += frameAmtTopPlatform;
		boltAmt += boltAmtTopPlatform;	
		}
	if (stairType == "рифленая сталь" || stairType == "лотки") platformMetalListArea += platformLength_3*platformWidth_3*2/1000000;
	}
	

totalAnglePrice = stairAngleAmt * stairAnglePrice + carcasAngleAmt * carcasAnglePrice + baseFixAngleAmt * carcasAnglePrice; 
totalBoltPrice = boltAmt * boltPrice;
totalFramePrice += framePrice * frameAmt;
//console.log(frameAmt, framePrice)
if (M > 1200) totalFramePrice = totalFramePrice * 2; 

} //end of calcCarcasParts()

/*Колонны*/

var columnTotalPrice = 0;
calcColumns();

function calcColumns(){

if (columnModel == "40х40") columnTotalPrice = columnLength * 60 + columnAmt * 200;
if (columnModel == "100x50") columnTotalPrice = columnLength * 400 + columnAmt * 1000;
if (columnModel == "100x100") columnTotalPrice = columnLength * 600 + columnAmt * 1500;

}// end of calcColumns()




/***  ПОКРАСКА МЕТАЛЛА   ***/

var metalPaintTotalPrice = 0; //общая стоимость покраски металла
calcMetalPainting();

function calcMetalPainting(){

if (metalPaint != "нет"){
	/*считаем покраску порошком как базовую*/
	//транспорт, загрузка камеры, упаковка
	metalPaintTotalPrice = 6000;
	//тетивы, площадки
	metalPaintTotalPrice += stringerArea * 700// + platformMetalListArea * 700;
	//гнутые уголки
	metalPaintTotalPrice += (stairAngleAmt + carcasAngleAmt + baseFixAngleAmt)*50;
	//рамки
	metalPaintTotalPrice += frameAmt * 100;
	//металлические ступени
	if (stairType == "рифленая сталь" || stairType == "лотки") 
		metalPaintTotalPrice += frameAmt * 200;	
	//покрытие площадок
	if (stairType == "рифленая сталь" || stairType == "лотки") 
		metalPaintTotalPrice += platformMetalListArea * 700;	
	//колонны
	if (columnModel == "40х40") metalPaintTotalPrice += columnLength * 50 + columnAmt * 100;
	if (columnModel == "100x50") metalPaintTotalPrice += columnLength * 150 + columnAmt * 300;
	if (columnModel == "100x100") metalPaintTotalPrice += columnLength * 250 + columnAmt * 500;
		
	if (metalPaint == "грунт") metalPaintTotalPrice = 5000;
	if (metalPaint == "автоэмаль") metalPaintTotalPrice = metalPaintTotalPrice * 3;
}
} // end of calcMetalPainting()



/*** СТОИМОСТЬ СТУПЕНЕЙ ***/
var treadMeterPrice = 0;
var treadsTotalPrice = 0;
var timberPaintedArea = 0;

calcTreads();




function calcTreads(){
if (stairType == "сосна кл.Б") treadMeterPrice = 24000*0.04;
if (stairType == "береза паркет.") treadMeterPrice = 53000*0.04;
if (stairType == "дуб паркет.") treadMeterPrice = 75000*0.04;
if (stairType == "дуб ц/л") treadMeterPrice = 125000*0.04;

/*учитываем обрезки*/
if (M > 1100) treadMeterPrice = treadMeterPrice * 1.5;
/*учитываем работу по раскрою деревянных ступеней*/
treadMeterPrice = treadMeterPrice + 500;


if (stairType == "нет") treadMeterPrice = 0;
if (stairType == "рифленая сталь") treadMeterPrice = 0;
if (stairType == "рифленый алюминий") treadMeterPrice = 3500;
if (stairType == "лотки") treadMeterPrice = 0;
if (stairType == "дпк") treadMeterPrice = 2000;
if (stairType == "пресснастил") treadMeterPrice = 5000;
if (stairType == "стекло") treadMeterPrice = 10000;

if (stairModel == "Прямая"){
	if (riserType == "нет"){	
		treadsTotalPrice = stairAmt1 * 0.3 * treadMeterPrice;
		timberPaintedArea = stairAmt1 * 0.3 * 2 + 0.1;		
		}
	if (riserType == "есть"){
		treadsTotalPrice = stairAmt1 * (0.3 + 0.2*0.5) * treadMeterPrice;
		timberPaintedArea = stairAmt1 * (0.3 + 0.2*0.5)*2 + 0.15;		
		}	
	}
if (stairModel == "Г-образная с площадкой"){
	if (riserType == "нет"){	
		treadsTotalPrice = (stairAmt1 + stairAmt3) * 0.3 * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * 0.3 * 2 + 0.1;		
		}
	if (riserType == "есть"){
		treadsTotalPrice = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5) * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5)*2 + 0.15;		
		}	
	//площадка
	treadsTotalPrice += 0.6 * 2 * treadMeterPrice;
	timberPaintedArea += 0.6 * 2 * 2 + 0.16;	
	if (stairFrame == "есть") totalFramePrice += 1000;
	}
if (stairModel == "Г-образная с забегом"){
	if (riserType == "нет"){	
		treadsTotalPrice = (stairAmt1 + stairAmt3) * 0.3 * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * 0.3 * 2 + 0.1;		
		}
	if (riserType == "есть"){
		treadsTotalPrice = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5) * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5)*2 + 0.15;		
		}	
	//забег
	treadsTotalPrice += 0.6 * 3 * treadMeterPrice;
	timberPaintedArea += 0.6 * 3 * 2 + 0.16;
	if (stairFrame == "есть") totalFramePrice += 2100;
	}
	
if (stairModel == "П-образная с площадкой"){
	if (riserType == "нет"){	
		treadsTotalPrice = (stairAmt1 + stairAmt3) * 0.3 * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * 0.3 * 2 + 0.1;		
		}
	if (riserType == "есть"){
		treadsTotalPrice = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5) * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5)*2 + 0.15;		
		}	
	//площадка
	treadsTotalPrice += 0.6 * 4 * treadMeterPrice;
	timberPaintedArea += 0.6 * 4 * 2 + 0.16;		
	if (stairFrame == "есть") totalFramePrice += 2000;
	}
if (stairModel == "П-образная с забегом"){
	if (riserType == "нет"){	
		treadsTotalPrice = (stairAmt1 + stairAmt3) * 0.3 * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * 0.3 * 2 + 0.1;		
		}
	if (riserType == "есть"){
		treadsTotalPrice = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5) * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt3) * (0.3 + 0.2*0.5)*2 + 0.15;		
		}	
	//забег
	treadsTotalPrice += 0.6 * 6 * treadMeterPrice;
	timberPaintedArea += 0.6 * 6 * 2 + 0.16;	
	if (stairFrame == "есть") totalFramePrice += 4200;
	}
if (stairModel == "П-образная трехмаршевая"){
	if (riserType == "нет"){	
		treadsTotalPrice = (stairAmt1 + stairAmt2 + stairAmt3) * 0.3 * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt2 + stairAmt3) * 0.3 * 2 + 0.1;		
		}
	if (riserType == "есть"){
		treadsTotalPrice = (stairAmt1 + stairAmt2 + stairAmt3) * (0.3 + 0.2*0.5) * treadMeterPrice;
		timberPaintedArea = (stairAmt1 + stairAmt2 + stairAmt3) * (0.3 + 0.2*0.5)*2 + 0.15;		
		}	
	if (turnType_1 == "забег") {
		treadsTotalPrice += 0.6 * 3 * treadMeterPrice;
		timberPaintedArea += 0.6 * 3 * 2 + 0.16;
		if (stairFrame == "есть") totalFramePrice += 2100;
		}
	if (turnType_1 == "площадка"){
		treadsTotalPrice += 0.6 * 2 * treadMeterPrice;
		timberPaintedArea += 0.6 * 2 * 2 + 0.16;
		if (stairFrame == "есть") totalFramePrice += 1000;
		}
	if (turnType_2 == "забег") {
		treadsTotalPrice += 0.6 * 3 * treadMeterPrice;
		timberPaintedArea += 0.6 * 3 * 2 + 0.16;
		if (stairFrame == "есть") totalFramePrice += 2100;
		}
	if (turnType_2 == "площадка"){
		treadsTotalPrice += 0.6 * 2 * treadMeterPrice;
		timberPaintedArea += 0.6 * 2 * 2 + 0.16;
		if (stairFrame == "есть") totalFramePrice += 1000;
		}	
	}

/*верхняя площадка*/
if (platformTop == "площадка") {
	//alert ("есть площадка");
	treadsTotalPrice += platformLength_3 * platformWidth_3 * treadMeterPrice / 1000000;
	timberPaintedArea += platformLength_3 * platformWidth_3 * 2 / 1000000;
	}
	
}//end of calcTreads()

/*покраска дерева*/
var timberPaintPrice = 0;

calcTimberPainting();

function calcTimberPainting(){
if (stairType == "нет") timberPaintedArea = 0;
if (stairType == "рифленая сталь") timberPaintedArea = 0;
if (stairType == "рифленый алюминий") timberPaintedArea = 0;
if (stairType == "лотки") timberPaintedArea = 0;
if (stairType == "дпк") timberPaintedArea = 0;
if (stairType == "пресснастил") timberPaintedArea = 0;
if (stairType == "стекло") timberPaintedArea = 0;

var timberPaintMeterPrice = 0;
if (timberPaint == "лак") timberPaintMeterPrice = 1000;
if (timberPaint == "морилка+лак") timberPaintMeterPrice = 1500;

timberPaintPrice = timberPaintMeterPrice * timberPaintedArea;
} //end of calcTimberPainting()


strigerPrice = strigerPrice * costMarkup;
totalAnglePrice = totalAnglePrice * costMarkup;
totalBoltPrice = totalBoltPrice * costMarkup;
totalFramePrice = totalFramePrice * costMarkup;
columnTotalPrice = columnTotalPrice * costMarkup;
metalPaintTotalPrice = metalPaintTotalPrice * costMarkup;
treadsTotalPrice = treadsTotalPrice * costMarkup;
timberPaintPrice = timberPaintPrice * costMarkup;


totalCostCarcas = strigerPrice + totalAnglePrice + totalBoltPrice + totalFramePrice + columnTotalPrice;

/*
document.getElementById('cost_carcas').innerHTML = 
"Тетивы: " + Math.round(strigerPrice) +  " руб; <br/>" + 
"Гнутые уголки: " + Math.round(totalAnglePrice) +  " руб; <br/>" + 
"Метизы: " + Math.round(totalBoltPrice) +  " руб; <br/>" + 
"Рамки: " + Math.round(totalFramePrice) +  " руб; <br/>"+
"Колонны: " + Math.round(columnTotalPrice) +  " руб; <br/>" + 
"Покраска металла: " + Math.round(metalPaintTotalPrice) +  " руб; <br/>" + 
"Ступени: " + Math.round(treadsTotalPrice) +  " руб; <br/>" + 
"Покраска дерева: " + Math.round(timberPaintPrice) +  " руб; <br/>" + 
"<b>Итого: " + Math.round(totalCostCarcas) +  " руб; </b><br/>";
*/

/*сохраняем себестоимость в глобальный объект*/

staircaseCost.stringer = strigerPrice;
staircaseCost.angles = totalAnglePrice;
staircaseCost.bolts = totalBoltPrice;
staircaseCost.frames = totalFramePrice;
staircaseCost.columns = columnTotalPrice;
staircaseCost.carcasMetalPaint = metalPaintTotalPrice;
staircaseCost.treads = treadsTotalPrice;
staircaseCost.carcasTimberPaint = timberPaintPrice;
staircaseCost.carcas = totalCostCarcas;


/*** ОБЩАЯ СТОИМОСТЬ ЛЕСТНИЦЫ ***/
var margin = 4 / costMarkup;
var marginPaint = 2 / costMarkup; //наценка на покраску

totalCarcasPrice = Math.round((strigerPrice + totalAnglePrice + totalBoltPrice + totalFramePrice + columnTotalPrice) * margin);
treadsTotalPrice = Math.round(treadsTotalPrice * margin);
metalPaintTotalPrice = Math.round(metalPaintTotalPrice * marginPaint);
timberPaintPrice = Math.round(timberPaintPrice * marginPaint);
var totalPrice_0 = Math.round(totalCarcasPrice + treadsTotalPrice);
var totalPrice_1 = Math.round(totalCarcasPrice + treadsTotalPrice + metalPaintTotalPrice + timberPaintPrice);
var totalInstalPrice = Math.round(totalPrice_1 * 0.2);
//if (totalInstalPrice < 13000) totalInstalPrice = 13000;
//if (install == "нет") totalInstalPrice = 0;
//var totalPrice_2 = Math.round(totalPrice_1 + totalInstalPrice);
//discount = Math.round(discount * totalPrice_0);
//totalPrice_3 = Math.round(totalPrice_2 - discount);

/*сохраняем цены в глобальный объект*/
staircasePrice.carcas = totalCarcasPrice;
staircasePrice.treads = treadsTotalPrice;
staircasePrice.carcasMetalPaint = metalPaintTotalPrice;
staircasePrice.carcasTimberPaint = timberPaintPrice;

}//Конец функции calculateCarcasPrice()


function calculateRailingPrice(){

/*создаем массивы параметров маршей. Индекс - номер марша.*/
var h_all = []; 
var b_all = [];
var stairAmt_all = [];
var railingSide_all = [];
var imageNumber = 0; //номер изображения, куда выводится картинка
var turnType_1;
var turnType_2;
var topRailingLength = [];
var topRailingJointRack = [];

/*обнуляем счетчики*/
railingParams.handrailAmt = 0;
railingParams.rigelAmt = 0;
railingParams.rackAmt = 0;
railingParams.balAmt1 = 0;
railingParams.balAmt2 = 0;
railingParams.glassAmt = 0;
railingParams.glassArea = 0;
railingParams.handrailLength = []; // массив длин поручней
railingParams.rigelLength = []; //массив длин ригелей


for (var i = 0; i < railingParams.handrailLength.length; i++) railingParams.handrailLength[i] = 0;
for (var i = 0; i < railingParams.rigelLength.length; i++) railingParams.rigelLength[i] = 0;
 

/*получаем из формы параметры маршей**/
for (var i = 1; i < 4; i++) {
	h_all[i] = parseFloat(document.getElementById('h' + i).value);
	b_all[i] = parseFloat(document.getElementById('b' + i).value);
	stairAmt_all[i] = parseFloat(document.getElementById('stairAmt' + i).value);
	railingSide_all[i] = document.getElementById('railingSide_' + i).options[document.getElementById('railingSide_' + i).selectedIndex].value;
}

var M = params.M;
var stairModel = params.stairModel;
var platformTop_0 = params.platformTop;
var rigelAmt_0 = Number(params.rigelAmt);
var rackTypeKovka = params.rackTypeKovka;
var banister1 = params.banister1;
var banister2 = params.banister2;
var railingModel = params.railingModel;
var turnType_1 = params.turnType_1;
var turnType_2 = params.turnType_2;
var platformLength_3 = params.platformLength_3;
var backRailing_3 = params.backRailing_3;
var backRailing_1 = params.backRailing_1;
var backRailing_2 = params.backRailing_2;

/*построение эскизов ограждений*/

drawRailings2D();

function drawRailings2D(){
if (stairModel == "Прямая") {
imageAmt = 0;
var imageNumber = 1;
if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "внутреннее") imageAmt = 1; 
if (railingSide_all[1] == "две") imageAmt = 2; 
if (platformTop_0 == "площадка" && backRailing_3 == "есть") topRailingAmt = topRailingAmt + 1;
var divId = "marshRailingImages2D";
var divHeader = "Ограждения маршей:";
addImage(imageAmt, divId, divHeader);

/*внешнее ограждение марша*/
if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
/*Ограждение марша*/
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: "нет",
	platformTop: platformTop_0,
	platformLengthBot: 0,
	platformLengthTop: platformLength_3,
	h: h_all[1], //подъем ступени
	b: b_all[1], //Ширина проступи
	a: b_all[1] + 20, //ширина ступени
	stairAmt: stairAmt_all[1], //кол-во ступеней
	stairAngle: Math.atan(h_all[1] / b_all[1]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внешнее ограждение марша"
	}
	if (platformTop == "нет") railingSectionParams.platformLengthTop = 0;
imageNumber = imageNumber + 1;	
drawMarshRailing2D(railingSectionParams);
}

/*внутреннее ограждение верхнего марша*/
if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
/*Ограждение марша*/

var railingSectionParams = {
	railingModel: railingModel,
	platformBot: "нет",
	platformTop: "нет",
	platformLengthBot: 0,
	platformLengthTop: 0,
	h: h_all[1], //подъем ступени
	b: b_all[1], //Ширина проступи
	a: b_all[1] + 20, //ширина ступени
	stairAmt: stairAmt_all[1], //кол-во ступеней
	stairAngle: Math.atan(h_all[1] / b_all[1]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внутреннее ограждение марша"
	}
drawMarshRailing2D(railingSectionParams);
}

}
		
if (stairModel != "Прямая") {

if (stairModel == "Г-образная с площадкой") {
	turnType_1 = "площадка";
	turnType_2 = turnType_1;
	backRailing_1 = "нет"; //внешнее ограждение площадки
	backRailing_2 = "нет"; //внешнее ограждение забега
	railingSide_all[2] = "нет"; //ограждение среднего марша
	}
if (stairModel == "Г-образная с забегом") {
	turnType_1 = "забег";
	turnType_2 = turnType_1;
	backRailing_1 = "нет";
	backRailing_2 = "нет";
	railingSide_all[2] = "нет";
	}
if (stairModel == "П-образная с площадкой") {
	turnType_1 = "площадка";
	turnType_2 = turnType_1;
	//backRailing_1 = "нет";
	backRailing_2 = "нет";
	railingSide_all[2] = "нет";
	}
if (stairModel == "П-образная с забегом") {
	turnType_1 = "забег";
	turnType_2 = turnType_1;
	backRailing_1 = "нет";
	//backRailing_2 = "нет";
	railingSide_all[2] = "нет";
	}
if (stairModel == "П-образная трехмаршевая") {
	turnType_1 = turnType_1;
	turnType_2 = turnType_2;
	backRailing_1 = "нет";
	backRailing_2 = "нет";
	}
	

/*создаем нужное кол-во изображений*/
imageAmt = 0;
var imageNumber = 0;
if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "внутреннее") imageAmt = imageAmt + 1; 
if (railingSide_all[1] == "две") imageAmt = imageAmt + 2; 
if (railingSide_all[2] == "внешнее" || railingSide_all[2] == "внутреннее") imageAmt = imageAmt + 1; 
if (railingSide_all[2] == "две") imageAmt = imageAmt + 2; 
if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "внутреннее") imageAmt = imageAmt + 1; 
if (railingSide_all[3] == "две") imageAmt = imageAmt + 2; 
if (backRailing_1 == "есть") imageAmt = imageAmt + 1; 
if (backRailing_2 == "есть") imageAmt = imageAmt + 1;

//учитываем заднее ограждение верхней площадки
if (platformTop_0 == "площадка" && backRailing_3 == "есть") imageAmt = imageAmt + 1;
var divId = "marshRailingImages2D";
var divHeader = "Ограждения маршей:";
addImage(imageAmt, divId, divHeader);

/*внешнее ограждение нижнего марша*/
if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
/*Ограждение марша*/
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: "нет",
	platformTop: turnType_1,
	platformLengthBot: 0,
	platformLengthTop: M,
	h: h_all[1], //подъем ступени
	b: b_all[1], //Ширина проступи
	a: b_all[1] + 20, //ширина ступени
	stairAmt: stairAmt_all[1], //кол-во ступеней
	stairAngle: Math.atan(h_all[1] / b_all[1]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внешнее ограждение нижнего марша"
	}
drawMarshRailing2D(railingSectionParams);
}

/*внутреннее ограждение нижнего марша*/
if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
/*Ограждение марша*/
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: "нет",
	platformTop: "нет",
	platformLengthBot: 0,
	platformLengthTop: 0,
	h: h_all[1], //подъем ступени
	b: b_all[1], //Ширина проступи
	a: b_all[1] + 20, //ширина ступени
	stairAmt: stairAmt_all[1], //кол-во ступеней
	stairAngle: Math.atan(h_all[1] / b_all[1]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внутреннее ограждение нижнего марша"
	}
drawMarshRailing2D(railingSectionParams);
}

/*внешнее ограждение верхнего марша*/
if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "две") {
/*Ограждение марша*/
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: turnType_2,
	platformTop: platformTop_0,
	platformLengthBot: M,
	platformLengthTop: platformLength_3,
	h: h_all[3], //подъем ступени
	b: b_all[3], //Ширина проступи
	a: b_all[3] + 20, //ширина ступени
	stairAmt: stairAmt_all[3], //кол-во ступеней
	stairAngle: Math.atan(h_all[3] / b_all[3]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внешнее ограждение верхнего марша"
	}
if (platformTop == "нет") railingSectionParams.platformLengthTop = 0;
 
drawMarshRailing2D(railingSectionParams);
}

/*внутреннее ограждение верхнего марша*/
if (railingSide_all[3] == "внутреннее" || railingSide_all[3] == "две") {
/*Ограждение марша*/
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: "нет",
	platformTop: "нет",
	platformLengthBot: 0,
	platformLengthTop: 0,
	h: h_all[3], //подъем ступени
	b: b_all[3], //Ширина проступи
	a: b_all[3] + 20, //ширина ступени
	stairAmt: stairAmt_all[3], //кол-во ступеней
	stairAngle: Math.atan(h_all[3] / b_all[3]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внутреннее ограждение верхнего марша"
	}
drawMarshRailing2D(railingSectionParams);
}

/*внешнее ограждение промежуточной площадки*/
if (backRailing_1 == "есть") {
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	baseType: "площадка",
	platformLength: M*2,
	middleRackAmt: 1,
	h: 0, 
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 10,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Внешнее ограждение промежуточной площадки"
	}
drawPlatformRailing2D(railingSectionParams);
}

/*внешнее ограждение забега П-образной лестницы*/
if (backRailing_2 == "есть") {
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	baseType: "забег",
	platformLength: M*2,
	middleRackAmt: 1,
	h: h_all[3], //подъем ступени
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 10,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Заднее ограждение забега"
	}
drawPlatformRailing2D(railingSectionParams);
}



/*внешнее ограждение среднего марша*/
if (railingSide_all[2] == "внешнее" || railingSide_all[2] == "две") {
/*Ограждение марша*/
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: turnType_1,
	platformTop: turnType_2,
	platformLengthBot: M,
	platformLengthTop: platformLength_3,
	h: h_all[2], //подъем ступени
	b: b_all[2], //Ширина проступи
	a: b_all[2] + 20, //ширина ступени
	stairAmt: stairAmt_all[2], //кол-во ступеней
	stairAngle: Math.atan(h_all[2] / b_all[2]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 3,
	balAmtPlatTop: 6,
	imageName: "Внешнее ограждение среднего марша"
	}
if (platformTop == "нет") railingSectionParams.platformLengthTop = 0; 
drawMarshRailing2D(railingSectionParams);
}

/*внутреннее ограждение верхнего марша*/
if (railingSide_all[2] == "внутреннее" || railingSide_all[2] == "две") {
/*Ограждение марша*/
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	platformBot: "нет",
	platformTop: "нет",
	platformLengthBot: 0,
	platformLengthTop: 0,
	//platformLengthTop: M,
	h: h_all[2], //подъем ступени
	b: b_all[2], //Ширина проступи
	a: b_all[2] + 20, //ширина ступени
	stairAmt: stairAmt_all[2], //кол-во ступеней
	stairAngle: Math.atan(h_all[2] / b_all[2]),
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 5,
	balAmtMarsh: 3,
	balAmtPlatTop: 6,
	imageName: "Внутреннее ограждение среднего марша"
	}
drawMarshRailing2D(railingSectionParams);
}

/*заднее ограждение верхней площадки*/
if (platformTop_0 == "площадка" && backRailing_3 == "есть") {
imageNumber = imageNumber + 1;
var railingSectionParams = {
	railingModel: railingModel,
	baseType: "площадка",
	platformLength: M,
	middleRackAmt: 1,
	h: 0,	
	imageId: "section_" + imageNumber,
	balAmtPlatBot: 10,
	balAmtMarsh: 10,
	balAmtPlatTop: 6,
	imageName: "Заднее ограждение верхней площадки"
	}
drawPlatformRailing2D(railingSectionParams);
}
}

}//end of drawRailings2D()

/*расcчитываем все параметры ограждений*/

railingParams.handrailType = params.handrail;
railingParams.timberBalStep = params.timberBalStep;

if (railingModel != "Деревянные балясины") 
	calculateAllRailingParams(railingParams);
if (railingModel == "Деревянные балясины") 
	calcTimberRailingParams(railingParams);


function calculateAllRailingParams(railingParams) {
	var handrailType = railingParams.handrailType;
	railingParams.handrailLength_sum = 0;
	railingParams.rigelLength_sum = 0;
// console.log(railingParams.handrailLength)
	for (i = 1; i < railingParams.handrailAmt+1; i++) {
		railingParams.handrailLength_sum = railingParams.handrailLength_sum + railingParams.handrailLength[i];
		}

	if (handrailType == "нет" && railingModel == "Самонесущее стекло") railingParams.handrailLength_sum = 0;


	for (i = 1; i < railingParams.rigelAmt+1; i++) {
		railingParams.rigelLength_sum = railingParams.rigelLength_sum + railingParams.rigelLength[i];
		}
	railingParams.handrailLength_sum = Math.round(railingParams.handrailLength_sum*10/(0.2*1000))/10;
	railingParams.rigelLength_sum = Math.round(railingParams.rigelLength_sum*10/(0.2*1000))/10;
	railingParams.glassArea = Math.round(railingParams.glassArea*100)/100;

//return railingParams;
}

function calcTimberRailingParams(railingParams){
var timberBalStep = railingParams.timberBalStep;

var balAmt = 0;
var turnBalAmt = 0;
var handrailAmt = 0;
var handrailLength_sum = 0;
var stepLength1 = Math.sqrt(h_all[1]*h_all[1] + b_all[1]*b_all[1])/1000;
var stepLength2 = Math.sqrt(h_all[2]*h_all[2] + b_all[2]*b_all[2])/1000;
var stepLength3 = Math.sqrt(h_all[3]*h_all[3] + b_all[3]*b_all[3])/1000;


if (stairModel == "Прямая") {
	/*внутренне ограждение нижнего марша*/
	if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 2;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;		
		}
	/*внешнее ограждение нижнего марша*/
	if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 2;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;
		}
	}
if (stairModel == "Г-образная с площадкой") {
	/*внутренне ограждение нижнего марша*/
	if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;
		}
	/*внешнее ограждение нижнего марша*/
	if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
		turnBalAmt = Math.round(M / b_all[1]);
		balAmt += Math.round(stairAmt_all[1] * timberBalStep) + turnBalAmt;
		rackAmt += 3;
		handrailLength_sum += stepLength1 * stairAmt_all[1] + M/1000;
		handrailAmt += 2;
		}
		/*внутренне ограждение верхнего марша*/
	if (railingSide_all[3] == "внутреннее" || railingSide_all[3] == "две") {
		balAmt += Math.round(stairAmt_all[3] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength3 * stairAmt_all[3];
		handrailAmt += 1;
		}
	/*внешнее ограждение верхнего марша*/
	if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "две") {
		turnBalAmt = Math.round(M / b_all[3]);
		balAmt += Math.round(stairAmt_all[3] * timberBalStep) + turnBalAmt;
		rackAmt += 2;
		handrailLength_sum += stepLength3 * stairAmt_all[3] + M/1000;
		handrailAmt += 2;
		}
	}
if (stairModel == "Г-образная с забегом") {
	/*внутренне ограждение нижнего марша*/
	if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;
		}
	/*внешнее ограждение нижнего марша*/
	if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
		turnBalAmt = Math.round(M / b_all[1]);
		balAmt += Math.round(stairAmt_all[1] * timberBalStep) + turnBalAmt;
		rackAmt += 3;
		handrailLength_sum += stepLength1 * stairAmt_all[1] + M/1000;
		handrailAmt += 2;
		}
		/*внутренне ограждение верхнего марша*/
	if (railingSide_all[3] == "внутреннее" || railingSide_all[3] == "две") {
		balAmt += Math.round(stairAmt_all[3] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength3 * stairAmt_all[3];
		handrailAmt += 1;
		}
	/*внешнее ограждение верхнего марша*/
	if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "две") {
		turnBalAmt = Math.round(M / b_all[3]);
		balAmt += Math.round(stairAmt_all[3] * timberBalStep) + turnBalAmt;
		rackAmt += 2;
		handrailLength_sum += stepLength3 * stairAmt_all[3] + M/1000;
		handrailAmt += 2;
		}
	}
if (stairModel == "П-образная с площадкой") {
	/*внутренне ограждение нижнего марша*/
	if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;
		}
	/*внешнее ограждение нижнего марша*/
	if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
		turnBalAmt = Math.round(platformLength_1 / b_all[1]);
		balAmt += Math.round(stairAmt_all[1] * timberBalStep) + turnBalAmt;
		rackAmt += 3;
		handrailLength_sum += stepLength1 * stairAmt_all[1] + platformLength_1/1000;
		handrailAmt += 2;
		}
	/*внутренне ограждение верхнего марша*/
	if (railingSide_all[3] == "внутреннее" || railingSide_all[3] == "две") {
		balAmt += Math.round(stairAmt_all[3] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength3 * stairAmt_all[3];
		handrailAmt += 1;
		}
	/*внешнее ограждение верхнего марша*/
	if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "две") {
		turnBalAmt = Math.round(platformLength_1 / b_all[3]);
		balAmt += Math.round(stairAmt_all[3] * timberBalStep) + turnBalAmt;
		rackAmt += 2;
		handrailLength_sum += stepLength3 * stairAmt_all[3] + platformLength_1/1000;
		handrailAmt += 2;
		}
	/*внешнее ограждение промежуточной площадки*/
	if (backRailing_1 == "есть") {
		turnBalAmt = Math.round(platformWidth_1 / b_all[3]);
		balAmt += Math.round(stairAmt_all[3] * timberBalStep) + turnBalAmt;
		rackAmt += 1;
		handrailLength_sum += platformWidth_1/1000;
		handrailAmt += 1;
		}
	}
if (stairModel == "П-образная с забегом") {
	/*внутренне ограждение нижнего марша*/
	if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;
		}
	/*внешнее ограждение нижнего марша*/
	if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
		turnBalAmt = Math.round(M / b_all[1]);
		balAmt += Math.round(stairAmt_all[1] * timberBalStep) + turnBalAmt;
		rackAmt += 3;
		handrailLength_sum += stepLength1 * stairAmt_all[1] + M/1000;
		handrailAmt += 2;
		}
	/*внутренне ограждение верхнего марша*/
	if (railingSide_all[3] == "внутреннее" || railingSide_all[3] == "две") {
		balAmt += Math.round(stairAmt_all[3] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength3 * stairAmt_all[3];
		handrailAmt += 1;
		}
	/*внешнее ограждение верхнего марша*/
	if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "две") {
		turnBalAmt = Math.round(M / b_all[3]);
		balAmt += Math.round(stairAmt_all[3] * timberBalStep) + turnBalAmt;
		rackAmt += 2;
		handrailLength_sum += stepLength3 * stairAmt_all[3] + M/1000;
		handrailAmt += 2;
		}
	/*внешнее ограждение забега П-образной лестницы*/
	if (backRailing_2 == "есть") {
		turnBalAmt = Math.round(2 * M / b_all[3]);
		balAmt += turnBalAmt;
		rackAmt += 1;
		handrailLength_sum += 2 * M / 1000;
		handrailAmt += 1;
		}	
	}
if (stairModel == "П-образная трехмаршевая") {
	/*внутренне ограждение нижнего марша*/
	if (railingSide_all[1] == "внутреннее" || railingSide_all[1] == "две") {
		balAmt += Math.round(stairAmt_all[1] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength1 * stairAmt_all[1];
		handrailAmt += 1;
		}
	/*внешнее ограждение нижнего марша*/
	if (railingSide_all[1] == "внешнее" || railingSide_all[1] == "две") {
		turnBalAmt = Math.round(M / b_all[1]);
		balAmt += Math.round(stairAmt_all[1] * timberBalStep) + turnBalAmt;
		rackAmt += 3;
		handrailLength_sum += stepLength1 * stairAmt_all[1] + M/1000;
		handrailAmt += 2;
		}
	/*внутренне ограждение среднего марша*/
	if (railingSide_all[2] == "внутреннее" || railingSide_all[2] == "две") {
		balAmt += Math.round(stairAmt_all[2] * timberBalStep);
		rackAmt += 0;
		handrailLength_sum += stepLength2 * stairAmt_all[2];
		handrailAmt += 1;
		}
	/*внешнее ограждение среднего марша*/
	if (railingSide_all[2] == "внешнее" || railingSide_all[2] == "две") {
		turnBalAmt = Math.round(M / b_all[2]);
		balAmt += Math.round(stairAmt_all[2] * timberBalStep) + turnBalAmt;
		rackAmt += 3;
		handrailLength_sum += stepLength2 * stairAmt_all[2] + 2 * M / 1000;
		handrailAmt += 3;
		}
	/*внутренне ограждение верхнего марша*/
	if (railingSide_all[3] == "внутреннее" || railingSide_all[3] == "две") {
		balAmt += Math.round(stairAmt_all[3] * timberBalStep);
		rackAmt += 1;
		handrailLength_sum += stepLength3 * stairAmt_all[3];
		handrailAmt += 1;
		}
	/*внешнее ограждение верхнего марша*/
	if (railingSide_all[3] == "внешнее" || railingSide_all[3] == "две") {
		turnBalAmt = Math.round(M / b_all[3]);
		balAmt += Math.round(stairAmt_all[3] * timberBalStep) + turnBalAmt;
		rackAmt += 2;
		handrailLength_sum += stepLength3 * stairAmt_all[3] + M/1000;
		handrailAmt += 2;
		}
	}
handrailLength_sum = Math.round (handrailLength_sum * 10)/10;

//переносим значения в глобальный объект
railingParams.balAmt = balAmt;
railingParams.rackAmt = rackAmt;
railingParams.handrailAmt = handrailAmt;
railingParams.handrailLength_sum = handrailLength_sum;



}

/***  РАСЧЕТ ЦЕНЫ  ***/

//добавляем информацию о конструкции ограждений в массив параметров
railingParams.railingName = "лестница";
railingParams.metalPaint = params.metalPaint_perila;
railingParams.timberPaint = params.timberPaint_perila;
railingParams.handrailType = params.handrail;
railingParams.rackType = params.banisterMaterial;
railingParams.rackBottom = params.rackBottom;
railingParams.rigelType = params.rigelMaterial;
railingParams.rigelAmt_0 = rigelAmt_0;
railingParams.railingModel = railingModel;
railingParams.railingTimber = params.railingTimber;
//блоки, куда выводить данные
railingParams.priceDivId = "resultPerila";
railingParams.costDivId = "cost_perila";

calcRailingPrice(railingParams); //функция находится в файле /calculator/general/priceLib.js


}//Конец функции calculateRailingPrice()

function calculateTotalPrice(){

var totalMetalPaintPrice = 0;
var totalTimberPaintPrice = 0;
var totalStaircasePrice = 0;
var totalMetalPaintCost = 0;
var totalTimberPaintCost = 0;
var totalStaircaseCost = 0;
var discount = params.discountFactor / 100;
var discountSum = 0;
var stairCaseFinalPrice = 0;
var outputDivId="totalResult";

staircasePrice.carcasFinal = 0;
staircasePrice.treadsFinal = 0;
staircasePrice.railingFinal = 0;
staircasePrice.banisterFinal = 0;
staircasePrice.assemblingFinal = 0;


/*учитываем пользовательские к-ты на цену*/
staircasePrice.carcas = staircasePrice.carcas * params.carcasPriceFactor;
staircasePrice.treads = staircasePrice.treads * params.treadsPriceFactor;
staircasePrice.railing = staircasePrice.railing * params.railingPriceFactor;
staircasePrice.banister = staircasePrice.banister * params.railingPriceFactor;
staircasePrice.assembling = staircasePrice.assembling * params.assemblingPriceFactor;

/*учитываем пользовательские к-ты на себестоимость*/
staircaseCost.carcas = staircaseCost.carcas * params.carcasCostFactor;
staircaseCost.treads = staircaseCost.treads * params.treadsCostFactor;
staircaseCost.railing = staircaseCost.railing * params.railingCostFactor;
staircaseCost.banister = staircaseCost.banister * params.railingCostFactor;
staircaseCost.assembling = staircaseCost.assembling * params.assemblingCostFactor;

/*корректируем цены для монокосоура*/
var monoModel = $("#model").val();
if(monoModel == "сварной") {
	staircaseCost.carcas = staircaseCost.carcas * 1.3;
	staircasePrice.carcas = staircasePrice.carcas * 1.1;
	}
if(monoModel == "труба") {
	staircaseCost.carcas = staircaseCost.carcas * 1.3;
	staircasePrice.carcas = staircasePrice.carcas * 0.9;
	}
	
//каркас
if(staircasePrice.carcas) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.carcas;
	discountSum = discountSum + staircasePrice.carcas * discount;
	staircasePrice.carcasFinal = Math.round(staircasePrice.carcas*(1-discount))
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.carcas;
	}
	
//ступени
if(staircasePrice.treads) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.treads;
	discountSum = discountSum + staircasePrice.treads * discount;
	staircasePrice.treadsFinal = Math.round(staircasePrice.treads*(1-discount))
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.treads;
	}

//покраска металлических деталей каркаса	
if(staircasePrice.carcasMetalPaint) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.carcasMetalPaint;
	totalMetalPaintPrice = totalMetalPaintPrice + staircasePrice.carcasMetalPaint;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.carcasMetalPaint;
	totalMetalPaintCost = totalMetalPaintCost + staircaseCost.carcasMetalPaint;
	}

//покраска деревянных деталей каркаса
if(staircasePrice.carcasTimberPaint) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.carcasTimberPaint;
	totalTimberPaintPrice = totalTimberPaintPrice + staircasePrice.carcasTimberPaint;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.carcasTimberPaint;
	totalTimberPaintCost = totalTimberPaintCost + staircaseCost.carcasTimberPaint;
	}

//ограждение лестницы
if(staircasePrice.railing) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.railing;	
	discountSum = discountSum + staircasePrice.railing * discount;
	staircasePrice.railingFinal = Math.round(staircasePrice.railing*(1-discount))
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.railing;	
	}

//покраска металлических деталей ограждения лестницы
if(staircasePrice.railingMetalPaint) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.railingMetalPaint;
	totalMetalPaintPrice = totalMetalPaintPrice + staircasePrice.railingMetalPaint;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.railingMetalPaint;
	totalMetalPaintCost = totalMetalPaintCost + staircaseCost.railingMetalPaint;
	}
	
//покраска деревянных деталей ограждения лестницы
if(staircasePrice.railingTimberPaint) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.railingTimberPaint;
	totalTimberPaintPrice = totalTimberPaintPrice + staircasePrice.railingTimberPaint;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.railingTimberPaint;
	totalTimberPaintCost = totalTimberPaintCost + staircaseCost.railingTimberPaint;
	}
	
//балюстрада
if(staircasePrice.banister) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.banister;
	discountSum = discountSum + staircasePrice.banister * discount;
	staircasePrice.banisterFinal = Math.round(staircasePrice.banister*(1-discount))
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.banister;
	}
	
	//console.log(staircasePrice.banister, staircaseCost.banister)
//покраска металла балюстрады
if(staircasePrice.banisterMetalPaint) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.banisterMetalPaint;
	totalMetalPaintPrice = totalMetalPaintPrice + staircasePrice.banisterMetalPaint;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.banisterMetalPaint;
	totalMetalPaintCost = totalMetalPaintCost + staircaseCost.banisterMetalPaint;
	}
	
//покраска дерева балюстрады
if(staircasePrice.banisterTimberPaint) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.banisterTimberPaint;
	totalTimberPaintPrice = totalTimberPaintPrice + staircasePrice.banisterTimberPaint;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.banisterTimberPaint;
	totalTimberPaintCost = totalTimberPaintCost + staircaseCost.banisterTimberPaint;
	}
	
//сборка
if(staircasePrice.assembling) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.assembling;
	staircasePrice.assemblingFinal = staircasePrice.assembling;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.assembling;
	}

//доставка
if(staircasePrice.delivery || staircaseCost.delivery) {
	totalStaircasePrice = totalStaircasePrice + staircasePrice.delivery;
	//себестоимость
	totalStaircaseCost = totalStaircaseCost + staircaseCost.delivery;
	}

//общая стоимость лестницы	
stairCaseFinalPrice = totalStaircasePrice - discountSum;


/*сохраняем информацию в глобальный массив*/
staircasePrice.totalPrice = totalStaircasePrice;
staircasePrice.discountSum = discountSum;
staircasePrice.finalPrice = stairCaseFinalPrice;
staircasePrice.metalPaint = totalMetalPaintPrice;
staircasePrice.timberPaint = totalTimberPaintPrice;

staircaseCost.totalCost = totalStaircaseCost;
staircaseCost.metalPaint = totalMetalPaintCost;
staircaseCost.timberPaint = totalTimberPaintCost;
//валовая прибыль
staircasePrice.vp = staircasePrice.finalPrice - staircaseCost.totalCost;

}

function printPrice(){
var carcasPriceDivId = "resultCarcas";
var railingPriceDivId = "resultPerila";
var banisterPriceDivId = "price_banister";
var assemblingPriceDivId = "price_assembling";
var totalPriceDivId = "totalResult";

//округляем все цены 
$.each(staircasePrice, function(i){ 
	staircasePrice[i] = Math.round(this);
	});
	
/*** КАРКАС ***/

var outputDiv = document.getElementById(carcasPriceDivId);
outputDiv.innerHTML = "";
	outputDiv.innerHTML +=
	"Cтоимость каркаса: " + staircasePrice.carcas +  " руб; <br/>";
	if (staircasePrice.treads != 0)
		outputDiv.innerHTML += 
			"Cтоимость ступеней: " + staircasePrice.treads +  " руб; <br/>";

	if (staircasePrice.carcasMetalPaint != 0 || staircasePrice.carcasTimberPaint != 0) {
		outputDiv.innerHTML += "<h3>Дополнительные услуги:</h3>";
	if (staircasePrice.carcasMetalPaint != 0) outputDiv.innerHTML +=
		"Покраска металла: " + staircasePrice.carcasMetalPaint +  " руб; <br/>";
	if (staircasePrice.carcasTimberPaint != 0) outputDiv.innerHTML +=
		"Покраска дерева: " + staircasePrice.carcasTimberPaint +  " руб; <br/>";
	}
	
	
/*** ОГРАЖДЕНИЯ ЛЕСТНИЦЫ ***/

railingParams.priceDivId = railingPriceDivId;
railingParams.railingName = "лестница";
printRailingPrice(railingParams); //функция в файле priceLib.js

/*** БАЛЮСТРАДА ***/

banisterParams.priceDivId = banisterPriceDivId;
banisterParams.railingName == "балюстрада";
printRailingPrice(banisterParams); //функция в файле priceLib.js

/*** СБОРКА, ДОСТАВКА ***/
var outputDiv = document.getElementById(assemblingPriceDivId);
outputDiv.innerHTML = "";

if(staircasePrice.assembling)
	outputDiv.innerHTML += 
		"Стоимость сборки: " + staircasePrice.assembling + "руб;<br/>";
if(params.delivery != "нет" &&  staircasePrice.delivery)
	outputDiv.innerHTML += 
		"Стоимость доставки: " + staircasePrice.delivery + "руб;<br/>";	
if(params.delivery != "нет" &&  staircasePrice.delivery == 0)
	outputDiv.innerHTML += "Доставка: бесплатно<br/>";	

	
/*** ОБЩАЯ ЦЕНА ***/


var outputDiv = document.getElementById(totalPriceDivId);
outputDiv.innerHTML = "";

if(staircasePrice.carcas)
	outputDiv.innerHTML += 
		"Стоимость каркаса: " + staircasePrice.carcas + "руб;<br/>";
if(staircasePrice.treads)
	outputDiv.innerHTML += 
		"Стоимость ступеней: " + staircasePrice.treads + "руб;<br/>";		
if(staircasePrice.railing)
	outputDiv.innerHTML += 
		"Стоимость ограждений лестницы: " + staircasePrice.railing + "руб;<br/>";
if(staircasePrice.banister)
	outputDiv.innerHTML += 
		"Стоимость балюстрады: " + staircasePrice.banister + "руб;<br/>";
		
//доп. услуги
if(staircasePrice.assembling || staircasePrice.metalPaint || staircasePrice.timberPaint || params.delivery != "нет")
	outputDiv.innerHTML += "<h3>Дополнительные услуги </h3>";
if(staircasePrice.metalPaint)
	outputDiv.innerHTML += "Покраска металла: " + staircasePrice.metalPaint + "руб;<br/>";	
if(staircasePrice.timberPaint)
	outputDiv.innerHTML += "Покраска дерева: " + staircasePrice.timberPaint + "руб;<br/>";		
if(staircasePrice.assembling)
	outputDiv.innerHTML += "Сборка: " + staircasePrice.assembling + "руб;<br/>";	
if(params.delivery != "нет" &&  staircasePrice.delivery)
	outputDiv.innerHTML += 
		"Доставка: " + staircasePrice.delivery + "руб;<br/>";	
if(params.delivery != "нет" &&  staircasePrice.delivery == 0)
	outputDiv.innerHTML += "Доставка: бесплатно<br/>";	
	
//общая стоимость
outputDiv.innerHTML += "<h3>Общая стоимость лестницы </h3>" + 
	"<b>Общая стоимость лестницы: " + staircasePrice.totalPrice + " руб;</b> <br/>" + 
	"<b class='yellow'>Скидка: " + staircasePrice.discountSum +  " руб; </b><br/>" + 
	"<b class='yellow'>Цена со скидкой: " + staircasePrice.finalPrice +  " руб; </b><br/>";

}

function printCost(){
var carcasCostDivId = "cost_carcas";
var railingCostDivId = "cost_perila";
var banisterCostDivId = "cost_banister";
var assemblingCostDivId = "cost_assembling";
var totalCostDivId = "total_cost";
//округляем значения
$.each(staircaseCost, function(i){
	staircaseCost[i] = Math.round(this);
	});


var tableBody = "";
tableBody += "<tr><td>Каркас</td><td>" + staircaseCost.carcas +"</td><td>"+ staircasePrice.carcas + "</td><td>" + staircasePrice.carcasFinal + "</td></tr>";
tableBody += "<tr><td>Ступени</td><td>" + staircaseCost.treads +"</td><td>"+ staircasePrice.treads + "</td><td>"+ staircasePrice.treadsFinal + "</td></tr>";
tableBody += "<tr><td>Ограждения лестницы</td><td>" + staircaseCost.railing +"</td><td>"+ staircasePrice.railing +"</td><td>"+ staircasePrice.railingFinal + "</td></tr>";
tableBody += "<tr><td>Балюстрада</td><td>" + staircaseCost.banister +"</td><td>"+ staircasePrice.banister +"</td><td>"+ staircasePrice.banisterFinal + "</td></tr>";
tableBody += "<tr><td>Покраска металла</td><td>" + staircaseCost.metalPaint +"</td><td>"+ staircasePrice.metalPaint +"</td><td>"+ staircasePrice.metalPaint + "</td></tr>";
tableBody += "<tr><td>Покраска дерева</td><td>" + staircaseCost.timberPaint +"</td><td>"+ staircasePrice.timberPaint +"</td><td>"+ staircasePrice.timberPaint + "</td></tr>";
tableBody += "<tr><td>Сборка</td><td>" + staircaseCost.assembling +"</td><td>"+ staircasePrice.assembling +"</td><td>"+ staircasePrice.assemblingFinal + "</td></tr>";
tableBody += "<tr><td>Доставка</td><td>" + staircaseCost.delivery +"</td><td>"+ staircasePrice.delivery +"</td><td>"+ staircasePrice.delivery + "</td></tr>";
tableBody += "<tr><td><b>Итого</b></td><td><b>" + staircaseCost.totalCost +"</b></td><td><b>" + staircasePrice.totalPrice + "</b></td><td><b>" + staircasePrice.finalPrice + "</b></td></tr>";

var outputDiv = document.getElementById(totalCostDivId);
outputDiv.innerHTML = "";
outputDiv.innerHTML += 
	"<table class='form_table'><tbody><tr><th>Наименование</th><th>Себестоимость</th><th>Цена без скидки</th><th>Цена со скидкой</th></tr>" + 
	tableBody + 
	"</tbody></table>";
var vpPart = Math.round(staircasePrice.vp / staircasePrice.finalPrice * 100)
outputDiv.innerHTML += "<b class='yellow'>Валовая прибыль: " + staircasePrice.vp + " руб (" + vpPart + "%)</b>";

/*себестоимость каркаса*/
outputDiv = document.getElementById(carcasCostDivId);
outputDiv.innerHTML =
	"Тетивы: " + Math.round(staircaseCost.stringer) +  " руб; <br/>" + 
	"Гнутые уголки: " + Math.round(staircaseCost.angles) +  " руб; <br/>" + 
	"Метизы: " + Math.round(staircaseCost.bolts) +  " руб; <br/>" + 
	"Рамки: " + Math.round(staircaseCost.frames) +  " руб; <br/>"+
	"Колонны: " + Math.round(staircaseCost.columns) +  " руб; <br/>" + 
	"<b>Итого каркас: " + Math.round(staircaseCost.carcas) +  " руб; </b><br/>" + 
	"Ступени: " + Math.round(staircaseCost.treads) +  " руб; <br/>" +
	"Покраска металла: " + Math.round(staircaseCost.carcasMetalPaint) +  " руб; <br/>" + 	
	"Покраска дерева: " + Math.round(staircaseCost.carcasTimberPaint) +  " руб; <br/>";	

/*** ОГРАЖДЕНИЯ ЛЕСТНИЦЫ ***/
outputDivId = railingCostDivId;
printRailingCost("лестница", outputDivId);

/*** БАЛЮСТРАДА ***/
outputDivId = banisterCostDivId;
printRailingCost("балюстрада", outputDivId);

/*** ДОСТАВКА, СБОРКА ***/
outputDiv = document.getElementById(assemblingCostDivId);
outputDiv.innerHTML =
"Сборка: " + staircaseCost.assembling +  " руб; <br/>"+
"Доставка: " + staircaseCost.delivery +  " руб; <br/>";

}

