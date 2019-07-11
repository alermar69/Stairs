var params = {}; //глобальный массив значений инпутов
var viewportsParams = []; //глобальный массив параметров видовых экранов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0=[]; //вспомогательный массив, чтобы не засорЯть основной чертеж
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
var dxfBasePoint = {};
var workList = {}; //сдельные расценки для цеха
var isDoorsOpened = false;
var wrPrice = {}; //глобальный массив цен элементов шкафа
var wrCost = {}; //глобальный массив себестоимости элементов шкафа
var wrParams = {}; //глобальный массив параметров ограждений
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var partsAmt_bal = {}; //глобальный массив количеств эл-тов для спецификации балюстрады
var specObj = partsAmt; //ссылка на массив данных для спецификации (лестница или балюстрада)
var layers = {};
var poleList = {}; //ведомость резки профилей и поручней
var shapesList = [];

$(function () {
    //добавляем видовые экраны на страницу
    addViewport('WebGL-output', 'vl_1');//параметры outputDivId, viewportId
    //addViewport('WebGL-output', 'vl_2');
    //addViewport('WebGL-output', 'vl_3');

    //добавляем нижнее перекрытие
    addFloorPlane('vl_1', true);//параметры viewportId, isVisible
    //addFloorPlane('vl_2', true);

    //добавляем стены
    addWalls('vl_1', true);//параметры viewportId, isVisible
    //addWalls('vl_2', true);

    //добавляем балюстраду
    addBanister('vl_1');

    //добавляем проем
    addTopFloor('vl_1');
	
	//Добавляем слои в 3Д меню
	layers = {
		treads: "Ступени",
		risers: "Подступенки",
		carcas: "Каркас",
		carcas1: "Каркас1",
		newel: "Столбы_1",
		newel1: "Столбы_2",
		newel2: "Столбы_3",
		newel3: "Столбы_4",		
		railing: "Ограждения лестницы",
		topRailing: "Балюстрада",
		forge: "Ковка",
		handrails: "Поручни", 
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
		

    //конфигурируем правое меню
    $(".tabs").lightTabs();

    recalculate = function() {
        getAllInputsValues(params);
        changeAllForms();
        drawStaircase('vl_1', true);
		//drawWardrobeMarsh1('vl_1', true);
		drawTopFloor();
		redrawWalls();
		drawBanister();
		
		crateWorksList(); //функция в файле /calculator/general/works.js
		calculateSpec();
		checkSpec();
    }

     
		
    //пересчитываем лестницу
    recalculate();



    //скрываем ненужные блоки
    $("#mainImages").hide();
    $("#marshRailingImages2D").hide();
	
	
    //$("#cost").hide();

		
	//сворачивание блоков
	initToggleDivs();
});

function changeAllForms() {
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormRailing();
	changeFormCarcas();
	changeFormBanisterConstruct();
	changeFormWr();
}

function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
	configSectInputs();
	configBoxInputs();
}

	
	