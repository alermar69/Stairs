$(function () {

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

	//скрываем ненужные блоки
	$("#mainImages").hide();
	$("#marshRailingImages2D").hide();
	//$("#manufacturing_inputs").hide();
	$("#description").hide();
	$("#complect").hide();
	$("#totalResult").hide();
	$("#about").hide();
	//$("#cost").hide();
	
	//пересчитываем лестницу
	recalculate();
});

function recalculate(){
	getAllInputsValues(params);
	changeAllForms();
	setHiddenLayers();
	drawStaircase('vl_1', true);
	//drawStaircase('vl_2', true);
	//drawStaircase('vl_3', true);
	//drawBanister();
	//drawWardrobeMarsh1('vl_1', true);
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
	if(!testingMode) checkSpec();
	setDimensions("vl_1", "3d");
	//drawWardrobeMarsh1('vl_1', true);	

	//calculateBanisterSpec(); //функция в файле calcSpecBanister.js
}


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

