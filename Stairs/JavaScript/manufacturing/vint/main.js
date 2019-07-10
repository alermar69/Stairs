var params = {}; //глобальный массив значений инпутов
var dxfPrimitivesArr = []; //глобоальный массив примитивов длЯ экспорта в dxf
var dxfPrimitivesArr0=[]; //вспомогательный массив, чтобы не засорЯть основной чертеж
var staircasePrice = {}; //глобальный массив цен элементов лестницы
var staircaseCost = {}; //глобальный массив себестоимости элементов лестницы
var railingParams = {}; //глобальный массив параметров ограждений
var banisterParams = {}; //глобальный массив параметров балюстрады
var isPageChanged = false; // тригер на изменение любого значениЯ на странице
var staircasePartsParams = {}; //параметры деталей лестницы для спецификации
var midHoldersParams = {};
//параметры деталей балюстрады для спецификации	
var balPartsParams = {
	handrails: [],
	rigels: [],
	};
var workList = {}; //сдельные расценки для цеха
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var partsAmt_bal = {}; //глобальный массив количеств эл-тов для спецификации балюстрады
var specObj = partsAmt; //ссылка на массив данных для спецификации (лестница или балюстрада)
var layers = {};
var anglesHasBolts = true; //отрисовывать болты уголков
var drawLongBolts = true; //отрисовывать длинные болты, соединяющие два уголка через тетиву насквозь
var shapesList = [];
var isFixPats = true; //отрисовывать болты крепления к стенам, к нижнему и верхнему перекрытию
var poleList = {}; //ведомость резки профилей и поручней

$(function() {
//добавляем видовые экраны на страницу
	addViewport('WebGL-output', 'vl_1');//параметры outputDivId, viewportId
	
	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true);//параметры viewportId, isVisible
	
	//добавляем стены
	addWalls('vl_1', true);//параметры viewportId, isVisible 
	
	//добавляем балюстраду
	addBanister('vl_1');
	
	//добавляем проем
	addTopFloor('vl_1');

	//Добавляем слои в 3Д меню
	layers = {
		treads: "Ступени",
		angles: "Уголки/рамки",
		carcas: "Каркас",
		shims: "Шайбы",
		rod: "Стержень",
		stringers: "Тетивы",
		stringers2: "Тетивы2",
		railing: "Ограждения лестницы",
		topRailing: "Балюстрада",
		forge: "Ковка",
		handrails: "Поручни",
		rigels: "Ригели",
		wireframesinter: "Пересечения",
		dimensions: "Размеры",
		}
	for(var layer in layers){
		addLayer(layer, layers[layer]);
		}
		
//конфигурируем правое меню
	$("#rightMenu").lightTabs();
	$("#wageInfo").lightTabs();
	
	//пересчитываем лестницу
	recalculate();

	
	
//задаем начальное положение стены 1	
	/*setInputValue("wallPositionX_1", -params.staircaseDiam/2 - 1500 - 100);
	setInputValue("wallPositionZ_1", -params.staircaseDiam/2 - 50);
	setInputValue("wallLength_1", params.staircaseDiam + 1500 + 300);
	*/
	//задаем начальное положение стены 3
	setInputValue("wallPositionX_3", 1000);
	setInputValue("wallPositionZ_3", 0);
	setInputValue("wallLength_3", params.staircaseDiam);
	
	
	//перерисовываем стены
	redrawWalls();
	
	
	//скрываем ненужные блоки 
	$("#cost").hide();
	//$("#rightMenu").hide();
	$("#description").hide();
	$("#complect").hide();
	$("#totalResult").hide();
	$("#about").hide();
	
	//сворачивание блоков
	initToggleDivs();
	
});

function recalculate() {
	getAllInputsValues(params);
	changeAllForms();
	drawStaircase('vl_1', true);
	//drawStaircase('vl_2', true);
	drawTopFloor();
	redrawWalls();
	drawBanister();	

	//расчет цены
	//staircasePrice = {}; //очищаем глобальный массив цен элементов лестницы
	//calculateStaircasePrice();
	//calculateBanisterPrice(); //функциЯ в файле priceCalcBanister.js
	//calculateAssemblingPrice();
	//calculateTotalPrice();
	//printPrice();
	//printCost();
	//спецификациЯ
	//crateWorksList(); //функция в файле /calculator/general/works.js
	calcSpecVint();	
	if(!testingMode) checkSpec();
//	printWorks();
	//drawWardrobeMarsh1('vl_1', true);	
}

function changeAllForms(){
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormVint();
	changeFormAssembling();
	changeFormBanisterConstruct();
	$('.installation_man').show();
	$("#banisterСonstructFormWrap").show();

	
}

function configDinamicInputs() {
		changeFormBanister();
		changeFormTopFloor();
		changeFormLedges();
		changeAllForms();
		//redrawWalls();
		addDimRows();
	}