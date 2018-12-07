var params = {}; //глобальный массив значений инпутов
var viewportsParams = []; //глобальный массив параметров видовых экранов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf

$(function () {
	//добавляем видовые экраны на страницу
	addViewport('WebGL-output', 'vl_1');//параметры outputDivId, viewportId
	//addViewport('WebGL-output', 'vl_2');
	//addViewport('WebGL-output', 'vl_3');

	/*вспомогательные оси*/		
	var axes = new THREE.AxisHelper( 2000 );
	$['vl_1'].add(axes);
	
	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true);//параметры viewportId, isVisible
	//addFloorPlane('vl_2', true);
/*
	//добавляем стены
	//addWalls('vl_1', true);//параметры viewportId, isVisible 
	//addWalls('vl_2', true);

	//добавляем балюстраду
	//addBanister('vl_3');

	//добавляем проем
	//addTopFloor('vl_3');
*/
	//Добавляем слои в 3Д меню
	addLayer('meshes', 'Объекты');
	//addLayer('risers', 'Подступенки');
	//addLayer('carcas', 'Каркас');
	//addLayer('railing', 'Ограждения лестницы');
	//addLayer('topFloor', 'Верхнее перекрытие');

	//конфигурируем правое меню
	//$(".tabs").lightTabs();

	recalculate = function() {
		dxfPrimitivesArr = []; //Очищаем массив примитивов 
		getAllInputsValues(params);
		changeAllForms();
		drawMeshes('vl_1', true);
		//drawStaircase('vl_2', true);
		//drawBanister();
		//drawTopFloor();
		//redrawWalls();
		//drawBanister();
		//расчет цены
		//calculateCarcasPrice();
		//calculateRailingPrice();
	}

	changeAllForms = function () {
	/*	changeFormCarcas();
		changeFormRailing();
		changeFormBanisterConstruct();
		changeOffer();
		complectDescription();
		changeFormAssembling();*/
	}
	//пересчитываем лестницу
	recalculate();
/*	//вешаем перерисовку стен на измененние инпутов формы параметров стен
	$('.form_table,.tabs').delegate('input,select,textarea', 'click', recalculate);
	
	//скрываем ненужные блоки
	$("#mainImages").hide();
	$("#marshRailingImages2D").hide();*/
});