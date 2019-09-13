$(function () {

	//Добавляем слои в 3Д меню
	layers = {
		treads: "Ступени",
		plugs: "Заглушки",
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
	for (var layer in layers) {
		addLayer(layer, layers[layer]);
	}



	
	//скрываем ненужные блоки
	$("#mainImages").hide();

	//пересчитываем лестницу
	recalculate();
});

function recalculate(){

	if (testingMode) {
		$sceneStruct["vl_1"]["newell_fixings"] = false;
	}

	shapesList = [];
	setStockParams()
	getAllInputsValues(params);
	changeAllForms();
	drawStaircase('vl_1', true);
	drawTopFloor();
	redrawWalls();
	drawBanister();

	//данные для производства	
	crateWorksList();
	calcWorks(partsAmt, "staircase");
	calcWorks(partsAmt_bal, "banister");
	printWorks2();

	calculateSpec();
	setDimensions('vl_1', '3d');
	if(!testingMode) checkSpec();

}


function changeAllForms() {
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormRailing();
	changeFormBanisterConstruct();
	changeFormAssembling();
	setStockParams();
}

function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
}