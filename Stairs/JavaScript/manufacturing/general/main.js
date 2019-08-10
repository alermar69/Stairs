var params = {}; //глобальный массив значений инпутов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0 = []; //вспомогательный глобоальный массив
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
var materials = {}; //потребность в материалах
var anglesHasBolts = true; //отрисовывать болты уголков
var drawLongBolts = true; //отрисовывать длинные болты, соединяющие два уголка через тетиву насквозь
var priceObj = {};
var shapesList = [];

$(function () {
	
	//добавляем видовые экраны на страницу
	addViewport('WebGL-output', 'vl_1');//параметры outputDivId, viewportId

	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true);//параметры viewportId, isVisible

	//добавляем стены
	addWalls('vl_1', false);//параметры viewportId, isVisible
	
	if($("#calcType").val() != "railing"){
		//добавляем балюстраду
		addBanister('vl_1');

		//добавляем верхнее перекрытие
		addTopFloor('vl_1');
	}
		
	//конфигурируем правое меню
	$(".tabs").lightTabs();
	
	//конфигурируем табы в трудоемкости
	$("#wageInfo").lightTabs();
	
	//создаем номенклатуру материалов
	createMaterialsList(); //в файле /calculator/general/materials.js

	//сворачивание блоков
	initToggleDivs(); // функция в файле formsChange.js
	
	//вешаем перерисовку стен на измененние инпутов формы параметров стен
    $('.tabs').delegate('input,select,textarea', 'change', function(){
		getAllInputsValues(params);
		drawTopFloor();
		redrawWalls();
		drawCustomDimensions('vl_1');
		}
	);

});

function fontLoadedCallback(){
	setDimensions("vl_1", "3d");
}



