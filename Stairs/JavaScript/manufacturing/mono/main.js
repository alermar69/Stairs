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

function recalculateModule(){
	// getAllInputsValues(params);
	// changeAllForms();
	// drawStaircase('vl_1', true);
	// drawTopFloor();
	// redrawWalls();

	setHiddenLayers();
	drawBanister();
	calcSpec();
	if(!testingMode) checkSpec();
	drawSceneDimensions();
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

