var params = {}; //глобальный массив значений инпутов
var viewportsParams = []; //глобальный массив параметров видовых экранов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0 = []; //вспомогательный глобоальный массив
var staircasePrice = {}; //глобальный массив цен элементов лестницы
var staircaseCost = {}; //глобальный массив себестоимости элементов лестницы
var railingParams = {}; //глобальный массив параметров ограждений
var banisterParams = {}; //глобальный массив параметров балюстрады
var staircasePartsParams = {}; //параметры деталей лестницы для спецификации
//параметры деталей балюстрады для спецификации
var balPartsParams = {
	handrails: [],
	rigels: [],
	};
var isPageChanged = false; // тригер на изменение любого значения на странице
var workList = {}; //сдельные расценки для цеха
var poleList = {}; //ведомость резки профилей и поручней
var isDoorsOpened = false;
var wrPrice = {}; //глобальный массив цен элементов шкафа
var wrCost = {}; //глобальный массив себестоимости элементов шкафа
var wrParams = {}; //глобальный массив параметров ограждений
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var partsAmt_bal = {}; //глобальный массив количеств эл-тов для спецификации балюстрады
var specObj = partsAmt; //ссылка на массив данных для спецификации (лестница или балюстрада)
var layers = {};
var shapesList = [];
var isFixPats = true; //отрисовывать болты крепления к стенам, к нижнему и верхнему перекрытию

$(function () {
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
		risers: "Подступенки",
		treadPlates: "Подложки",
		carcas: "Каркас",
		carcas1: "Каркас1",
		flans: "Фланцы",
		railing: "Ограждения лестницы",
		forge: "Ковка",
		handrails: "Поручни", 
		topRailing: "Балюстрада",
		doors: "Фасады",
		shelfs: "Полки",
		metis: "Метизы",
		carcas_wr: "Каркас шкафа",
		wrCarcas1: "Каркас шкафа1",
		wrCarcas2: "Каркас шкафа2",
		wireframesinter: "Пересечения",
		dimensions: "Размеры",
		}
	for(var layer in layers){
		addLayer(layer, layers[layer]);
		}



var angles = [];


//конфигурируем правое меню
	$("#rightMenu").lightTabs();
	$("#wageInfo").lightTabs();

		//скрываем блоки для отладки
	//$('.canvas canvas:eq(1)').toggle()
	//$('.canvas canvas:eq(2)').toggle()
/* 	$("#mainImages").hide();
	$("#description").hide();
	$("#complect").hide();
	$("#totalResult").hide();
	$("#about").hide(); */

	recalculate = function() {
		getAllInputsValues(params);
		changeAllForms();
		setHiddenLayers();
		drawStaircase('vl_1', true);
		//drawStaircase('vl_2', true);
		//drawStaircase('vl_3', true);
		//drawBanister();
		drawWardrobeMarsh1('vl_1', true);
		drawTopFloor();
		redrawWalls();
		drawBanister();
		//расчет цены
		//staircasePrice = {}; //очищаем глобальный массив цен элементов лестницы
		//calculateCarcasPrice();
		//calculateRailingPrice();
	//	calculateBanisterPrice(); //функция в файле priceCalcBanister.js
	//	calculateAssemblingPrice();
	//	calculateTotalPrice();
	//	printPrice();
	//	printCost();
		//расчет спецификации
		//crateWorksList(); //функция в файле /calculator/general/works.js
		calcSpec();
		checkSpec();
		drawWardrobeMarsh1('vl_1', true);	

		//calculateBanisterSpec(); //функция в файле calcSpecBanister.js
	}


	//пересчитываем лестницу
	recalculate();
	//вешаем перерисовку стен на измененние инпутов формы параметров стен
	//$('.form_table,.tabs').delegate('input,select,textarea', 'click', recalculate);

	//вешаем перерисовку стен на измененние инпутов формы параметров стен
	$('.tabs').delegate('input,select,textarea', 'click', redrawWalls);





	//скрываем ненужные блоки
	$("#mainImages").hide();
	$("#marshRailingImages2D").hide();
	//$("#manufacturing_inputs").hide();
	$("#description").hide();
	$("#complect").hide();
	$("#totalResult").hide();
	$("#about").hide();
	//$("#cost").hide();
	
	
	//сворачивание блоков
	initToggleDivs();

});

function changeAllForms() {
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormCarcas();
	changeFormRailing();
	changeFormBanisterConstruct();
	//changeOffer();
	//complectDescription();
	changeFormAssembling();
	changeFormWr();
	$('.installation_man').show();
}

function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
	configSectInputs();
	configBoxInputs();
	addDimRows();
}

