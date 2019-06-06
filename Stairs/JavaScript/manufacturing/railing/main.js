var params = {}; //глобальный массив значений инпутов
var viewportsParams = []; //глобальный массив параметров видовых экранов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0 = []; //вспомогательный глобоальный массив
var staircasePrice = {}; //глобальный массив цен элементов лестницы
var staircaseCost = {}; //глобальный массив себестоимости элементов лестницы
var railingParams = {}; //глобальный массив параметров ограждений
var banisterParams = {}; //глобальный массив параметров балюстрады
var isPageChanged = false; // тригер на изменение любого значения на странице
var materials = {}; //потребность в материалах
var isDoorsOpened = false;
var wrPrice = {}; //глобальный массив цен элементов шкафа
var wrCost = {}; //глобальный массив себестоимости элементов шкафа
var wrParams = {}; //глобальный массив параметров ограждений
var railingPar = {};
var holeMooveParams = []; //массив данных для смещения отверстий
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var partsAmt_bal = {}; //глобальный массив количеств эл-тов для спецификации балюстрады
var specObj = partsAmt; //ссылка на массив данных для спецификации (лестница или балюстрада)
var layers = {};
var poleList = {}; //ведомость резки профилей и поручней

$(function () {
	//добавляем видовые экраны на страницу  
	addViewport('WebGL-output', 'vl_1');//параметры outputDivId, viewportId

	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true);//параметры viewportId, isVisible

	//Добавляем слои в 3Д меню
	layers = {
		concrete: "Бетон",
		railing: "Ограждения",
		wireframesinter: "Пересечения",
		dimensions: "Размеры",
		}
	for(var layer in layers){
		addLayer(layer, layers[layer]);
		}
		/*
	//Добавляем слои в 3Д меню
	addLayer('concrete', 'Бетон');
	addLayer('railing', 'Ограждения');
	*/
	
//конфигурируем правое меню
	$("#rightMenu").lightTabs();
	$("#wageInfo").lightTabs();
	

	//создаем номенклатуру материалов
	createMaterialsList(); //в файле /calculator/general/materials.js
	
	
	//скрываем блоки, не нужные для моделирования
	$('.canvas canvas:eq(1)').toggle()
	$('.canvas canvas:eq(2)').toggle()
	$("#mainImages").hide();
	$("#description").hide();
	$("#complect").hide();
	$("#marshRailingImages2D").hide();
	$("#about").hide();
//	$("#production_data").hide();

	//$("#specificationList").show();
	recalculate = function() {
		getAllInputsValues(params);
		changeAllForms();
		drawStaircase('vl_1', true);
		//второй видовый экран
		if($("#showVl_2").prop('checked')) {
			drawStaircase('vl_2', true);
			}
		//третий видовый экран
		if($("#showVl_3").prop('checked')) {
			drawStaircase('vl_3', true);
			}
		redrawWalls();
		drawConcrete('vl_1');
		
		//данные для производства
		createMaterialsList(); // обнуляем список материалов
		
		crateWorksList();
		calcWorks(partsAmt, "staircase");
		calcWorks(partsAmt_bal, "banister");
		printWorks2();
		
		
		calcSpec();
		//drawWardrobeMarsh1('vl_1', true);	 
		
	}

	
	//пересчитываем лестницу
	recalculate();
	
	//вешаем перерисовку стен, проема и балюстрады на измененние инпутов формы параметров стен
	$('.tabs').delegate('input,select,textarea', 'change', function(){
		recalculate();
		});
	
	
	//толщина ступеней по умолчанию
	
	$("#stairType").change(function(){
		setTreadThickness();
		recalculate();
		});
		


	//сворачивание блоков
	initToggleDivs();
	
});

function changeAllForms() {
	changeFormConcrete();
	changeFormRailing();
	changeFormAssembling();
	$('.installation_man').show();

}

function configDinamicInputs() {
	addConcreteRows();
	addRailingRows();
	addRutelRows();
	changeFormLedges();
	addDimRows();
}
