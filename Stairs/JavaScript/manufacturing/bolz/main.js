$(function () {

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

    //скрываем ненужные блоки
    $("#mainImages").hide();
    $("#marshRailingImages2D").hide();
	//$("#svgDrawings").hide();
    //$("#cost").hide();
	$('#specificationList').show();
	
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
	calculateSpec();	
	drawSceneDimensions();
	if(!testingMode) checkSpec();
}

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
