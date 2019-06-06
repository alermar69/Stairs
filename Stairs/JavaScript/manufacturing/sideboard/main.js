var params = {}; //глобальный массив значений инпутов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0 = []; //вспомогательный массив, чтобы не засорЯть основной чертеж
var workList = {}; //сдельные расценки для цеха
var isDoorsOpened = false;
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var poleList = {}; //ведомость резки профилей и поручней
var layers = {};

$(function () {
    loadFont();
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

	//Добавляем слои в 3Д меню
	layers = {
		carcas: "Каркас",
		doors: "Фасады",
		panels: "Пенели",
		boxes: "Ящики",
		countertop: "Столешница",
		metiz: "Фурнитура",
		wireframesinter: "Пересечения",
		dimensions: "Размеры",
		dimensions2: "Размеры2",
		}
	for(var layer in layers){
		addLayer(layer, layers[layer]);
		}

//конфигурируем правое меню
	$("#rightMenu").lightTabs();
	$("#wageInfo").lightTabs();
/*	
	var orderName = $.urlParam('orderName');
	if(orderName){
		$('#orderName').val(orderName);
		_loadFromBD('content', '/calculator/general/db_data_exchange/dataExchangeXml_2.1.php', orderName)
		var comLink = $("#comLink").attr("href") + "?orderName=" + orderName;
		$("#comLink").attr("href", comLink); //устаналиваем значение
		var montLink = $("#montLink").attr("href") + "?orderName=" + orderName;
		$("#montLink").attr("href", montLink); //устаналиваем значение
		}
*/
    recalculate = function() {
		getAllInputsValues(params);
		changeAllForms();
		setHiddenLayers();
		drawSideboard('vl_1', true);
		drawCustomDimensions('vl_1');
		//drawWardrobeMarsh1('vl_1', true);		
		//drawTopFloor();
		//redrawWalls();
		//drawBanister();
	//	crateWorksList(); //функция в файле /calculator/general/works.js
		calculateSpec();	
	//	printWorks(); //функция в файле /calculator/general/works.js
	//	drawWardrobeMarsh1('vl_1', true);	
		}


		
    //пересчитываем лестницу
    recalculate();

	$('.form_table,.tabs').delegate('input,select,textarea', 'change', changeAllForms);
	
	//вешаем пересчет на все заголовки разделов
	$('.raschet').click(function(){
		recalculate();
		});
	//перерисовка пользовательских размеров
	$('#dimParamsTable').delegate('input,select,textarea', 'change', function(){
		changeFormDim();
		drawCustomDimensions('vl_1');
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


		
	$("#viewLink").click(function(){
		if(params.orderName){
			var link = "http://6692035.ru/installation/metal/?orderName=" + params.orderName;
			var result = prompt("Ссылка для просмотра 3D модели. Логин demo, пароль demo_pass", link);			
			};		
		});
		
	//сохранение ведомости заготовок в xls
	$("#poleList").delegate('#downLoadPoleList', 'click', function(){
		tableToExcel('partsTable', 'Детали',);
		})
	
	//сворачивание блоков
	initToggleDivs();
});

function changeAllForms() {
	getAllInputsValues(params);
	mainFormChange();
	$('.installation_man').show();
}

function configDinamicInputs() {
//	changeFormBanister();
//	changeFormTopFloor();
//	changeFormLedges();
	changeAllForms();
	configBoxInputs();
	configShelfInputs();
	//setHandrailParams_bal();
//	configSectInputs();
//	configBoxInputs();
addDimRows();
}
