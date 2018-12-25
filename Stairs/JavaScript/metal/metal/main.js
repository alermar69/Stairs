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
var materials = {}; //потребность в материалах
var anglesHasBolts = true; //отрисовывать болты уголков
var drawLongBolts = true; //отрисовывать длинные болты, соединяющие два уголка через тетиву насквозь
var shapesList = [];

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
		angles: "Уголки/рамки",
		carcas: "Каркас",
		carcas1: "Каркас1",
		railing: "Ограждения лестницы",
		topRailing: "Балюстрада",
		forge: "Ковка",
		handrails: "Поручни", 
		treads_new: "Ступени нов.",
		carcas_new: "Каркас нов.",
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
	$("#rightMenu").lightTabs();
	$("#wageInfo").lightTabs();
	

    recalculate = function() {
        getAllInputsValues(params);
        changeAllForms();
		setHiddenLayers();
        drawStaircase('vl_1', true);
		drawWardrobeMarsh1('vl_1', true);		
		drawTopFloor();
		redrawWalls();
		drawBanister();
		//crateWorksList(); //функция в файле /calculator/general/works.js
		calculateSpec();	
		//printWorks(); //функция в файле /calculator/general/works.js
		drawCustomDimensions('vl_1');
		checkSpec();
		}

   
		
    //пересчитываем лестницу
    recalculate();
    //вешаем перерисовку стен на измененние инпутов формы параметров стен
    $('.tabs').delegate('input,select,textarea', 'change', function(){
		getAllInputsValues(params);
		drawTopFloor();
		redrawWalls();
		drawCustomDimensions('vl_1');
		}
	);

		


    //скрываем ненужные блоки
    $("#mainImages").hide();
    $("#marshRailingImages2D").hide();
	//$("#svgDrawings").hide();
    //$("#cost").hide();
	$('#specificationList').show();
	
	
	

	
		

		
	//сохранение ведомости заготовок в xls
	$("#poleList").delegate('#downLoadPoleList', 'click', function(){
		tableToExcel('partsTable', 'Детали',);
		})
		
	//сворачивание блоков
	initToggleDivs();
	
});


function changeAllForms() {		
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormCarcas();
	changeFormRailing();
	changeFormBanisterConstruct();
	changeFormAssembling();
	changeFormWr();
	changeFormStartTreads();
	$('.installation_man').show();
}

function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
	//setHandrailParams_bal();
	configSectInputs();
	configBoxInputs();
	addDimRows();
}
