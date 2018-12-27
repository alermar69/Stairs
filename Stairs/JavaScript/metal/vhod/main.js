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
		getAllInputsValues(params);
		changeAllForms();
		drawStaircase('vl_1', true);
		// drawWardrobeMarsh1('vl_1', true);//FIX		
		drawTopFloor();
		redrawWalls();
		drawBanister();
		//crateWorksList(); //функция в файле /calculator/general/works.js
		if(params.staircaseType == "На заказ" )calculateSpec();
		if(params.staircaseType == "Готовая" )calcSpec_vl();
		//printWorks(); //функция в файле /calculator/general/works.js
		drawCustomDimensions('vl_1');
		}

	changeAllForms = function() {
		getAllInputsValues(params);
		changeFormsGeneral();
		changeFormCarcas();
		changeFormRailing();
		changeFormBanisterConstruct();
		changeFormAssembling();
		$('.installation_man').show();

	}

	//пересчитываем лестницу
	recalculate();
	//вешаем перерисовку стен на измененние инпутов формы параметров стен
	$('.tabs').delegate('input,select,textarea', 'change', function() {
		getAllInputsValues(params);
		drawTopFloor();
		redrawWalls();
	});
	$('.form_table,.tabs').delegate('input,select,textarea', 'change', changeAllForms);

	//вешаем пересчет на все заголовки разделов
	$('.raschet').click(function() {
		recalculate();
	});
//перерисовка пользовательских размеров
	$('#dimParamsTable').delegate('input,select,textarea', 'change', function(){
		changeFormDim();
		drawCustomDimensions('vl_1');
		});


	//скрываем ненужные блоки
	$("#mainImages").hide();
	$("#marshRailingImages2D").hide();
	//$("#cost").hide();
	$('#specificationList').show();

	configDinamicInputs = function() {
		changeFormBanister();
		changeFormTopFloor();
		changeFormLedges();
		changeAllForms();
		//setHandrailParams_bal();
		// configSectInputs();//FIX
		// configBoxInputs();//FIX
		addDimRows();
	}

	var orderName = $.urlParam('orderName');
	if(orderName){
		$('#orderName').val(orderName);
		_loadFromBD('content', '/calculator/general/db_data_exchange/dataExchangeXml_2.1.php', orderName)
		var comLink = $("#comLink").attr("href") + "?orderName=" + orderName;
		$("#comLink").attr("href", comLink); //устаналиваем значение
		var montLink = $("#montLink").attr("href") + "?orderName=" + orderName;
		$("#montLink").attr("href", montLink); //устаналиваем значение
		var oldVerLink = $("#oldVerLink").attr("href") + "?orderName=" + orderName;
		$("#oldVerLink").attr("href", oldVerLink); //устаналиваем значение
	}
	
	$("#showPass").click(function(){
		alert("Логин: demo Пароль: demo_pass Как посмотреть модель: https://youtu.be/8zySuZ2spzg ")		
		});

	//сохранение ведомости заготовок в xls
	$("#poleList").delegate('#downLoadPoleList', 'click', function() {
		tableToExcel('partsTable', 'Детали', );
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