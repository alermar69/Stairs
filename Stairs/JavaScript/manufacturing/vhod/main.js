var params = {}; //глобальный массив значений инпутов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0 = []; //вспомогательный массив, чтобы не засорЯть основной чертеж
var staircasePrice = {}; //глобальный массив цен элементов лестницы
var staircaseCost = {}; //глобальный массив себестоимости элементов лестницы
var railingParams = {}; //глобальный массив параметров ограждений
var banisterParams = {}; //глобальный массив параметров балюстрады
var staircasePartsParams = {}; //параметры деталей лестницы для спецификации
staircasePartsParams.handrails = []; //массив длин поручней лестницы
//параметры деталей балюстрады для спецификации	
var balPartsParams = {
	handrails: [],
	rigels: [],
};
var dxfBasePoint = {};
var workList = {}; //сдельные расценки для цеха
var isDoorsOpened = false;
var wrPrice = {}; //глобальный массив цен элементов шкафа
var wrCost = {}; //глобальный массив себестоимости элементов шкафа
var wrParams = {}; //глобальный массив параметров ограждений
var glassSectParams = []; //глобальный массив параметров секций ограждений
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var partsAmt_bal = {}; //глобальный массив количеств эл-тов для спецификации балюстрады
var specObj = partsAmt; //ссылка на массив данных для спецификации (лестница или балюстрада)
var poleList = {}; //ведомость резки профилей и поручней
var layers = {};
var anglesHasBolts = true; //отрисовывать болты уголков
var drawLongBolts = true; //отрисовывать длинные болты, соединяющие два уголка через тетиву насквозь
var shapesList = [];
var isFixPats = true; //отрисовывать болты крепления к стенам, к нижнему и верхнему перекрытию
var modelSpec = {};//Сюда попадает итоговая спецификация
var calculatedSpec = {};//Сюда попадает итоговая спецификация


$(function() {
	//добавляем видовые экраны на страницу
	addViewport('WebGL-output', 'vl_1'); //параметры outputDivId, viewportId

	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true); //параметры viewportId, isVisible

	//добавляем стены
	addWalls('vl_1', true); //параметры viewportId, isVisible

	//добавляем балюстраду
	addBanister('vl_1');

	//добавляем проем
	addTopFloor('vl_1');

	//Добавляем слои в 3Д меню
	layers = {
		treads: "Ступени",
		//risers: "Подступенки",
		angles: "Уголки/рамки",
		carcas: "Каркас",
		carcas1: "Каркас1",
		railing: "Ограждения лестницы",
		topRailing: "Балюстрада",
		forge: "Ковка",
		handrails: "Поручни",
		wireframesinter: "Пересечения",
		dimensions: "Размеры",
		
	}
	for (var layer in layers) {
		addLayer(layer, layers[layer]);
	}
	
//конфигурируем правое меню
	$("#rightMenu").lightTabs();
	$("#wageInfo").lightTabs();


	recalculate = function() {
		shapesList = []; //Очищаем
		if(params.staircaseType == 'Готовая') $("#dpcWidth").val("140");
		getAllInputsValues(params);
		changeAllForms();
		drawStaircase('vl_1', true);
		// drawWardrobeMarsh1('vl_1', true);//FIX		
		drawTopFloor();
		redrawWalls();
		drawBanister();
		//crateWorksList(); //функция в файле /calculator/general/works.js
		calculateSpec();
		if(params.staircaseType == "Готовая" )calcSpec_vl();
		//printWorks(); //функция в файле /calculator/general/works.js
		drawCustomDimensions('vl_1');
		checkSpec();
		}

	

	//пересчитываем лестницу
	recalculate();
	
	//скрываем ненужные блоки
	$("#mainImages").hide();
	$("#marshRailingImages2D").hide();
	//$("#cost").hide();
	$('#specificationList').show();

	
	//сворачивание блоков
	initToggleDivs();
});

changeAllForms = function() {
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormCarcas();
	changeFormRailing();
	changeFormBanisterConstruct();
	changeFormAssembling();
	$('.installation_man').show();
}
	
function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
	//setHandrailParams_bal();
	// configSectInputs();//FIX
	// configBoxInputs();//FIX
	addDimRows();
}