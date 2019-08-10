$(function() {

	//Добавляем слои в 3Д меню
	layers = {
		treads: "Ступени",
		angles: "Уголки/рамки",
		carcas: "Каркас",
		shims: "Шайбы",
		rod: "Стержень",
		stringers: "Тетивы",
		stringers2: "Тетивы2",
		railing: "Ограждения лестницы",
		topRailing: "Балюстрада",
		forge: "Ковка",
		handrails: "Поручни",
		rigels: "Ригели",
		metis: "Метизы",
		wireframesinter: "Пересечения",
		dimensions: "Размеры",
		}
	for(var layer in layers){
		addLayer(layer, layers[layer]);
		}
		


	
	
//задаем начальное положение стены 1	
	/*setInputValue("wallPositionX_1", -params.staircaseDiam/2 - 1500 - 100);
	setInputValue("wallPositionZ_1", -params.staircaseDiam/2 - 50);
	setInputValue("wallLength_1", params.staircaseDiam + 1500 + 300);
	*/
	//задаем начальное положение стены 3
	setInputValue("wallPositionX_3", 1000);
	setInputValue("wallPositionZ_3", 0);
	setInputValue("wallLength_3", params.staircaseDiam);
	
	
	//скрываем ненужные блоки 
	$("#cost").hide();
	//$("#rightMenu").hide();
	$("#description").hide();
	$("#complect").hide();
	$("#totalResult").hide();
	$("#about").hide();
	
	//пересчитываем лестницу
	recalculate();	
});

function recalculate(){
	getAllInputsValues(params);
	changeAllForms();
	drawStaircase('vl_1', true);
	//drawStaircase('vl_2', true);
	drawTopFloor();
	redrawWalls();
	drawBanister();	

	//расчет цены
	//staircasePrice = {}; //очищаем глобальный массив цен элементов лестницы
	//calculateStaircasePrice();
	//calculateBanisterPrice(); //функциЯ в файле priceCalcBanister.js
	//calculateAssemblingPrice();
	//calculateTotalPrice();
	//printPrice();
	//printCost();
	//спецификациЯ
	//crateWorksList(); //функция в файле /calculator/general/works.js
	calcSpecVint();	
	if(!testingMode) checkSpec();
//	printWorks();
	//drawWardrobeMarsh1('vl_1', true);	
}

function changeAllForms(){
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormVint();
	changeFormAssembling();
	changeFormBanisterConstruct();
	$('.installation_man').show();
	$("#banisterСonstructFormWrap").show();

	
}

function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
	//redrawWalls();
	addDimRows();
}