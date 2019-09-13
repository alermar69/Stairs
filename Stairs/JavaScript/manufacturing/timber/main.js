$(function () {
	
	//Добавляем слои в 3Д меню
	layers = {
		treads: "Ступени",
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
	for(var layer in layers){
		addLayer(layer, layers[layer]);
		}
		

   //скрываем ненужные блоки
    $("#mainImages").hide();
    $("#marshRailingImages2D").hide();
	
    //пересчитываем лестницу
    recalculate();
});

function recalculate(){
	getAllInputsValues(params);
	changeAllForms();
	drawStaircase('vl_1', true);
	//drawWardrobeMarsh1('vl_1', true);
	drawTopFloor();
	redrawWalls();
	drawBanister();
	
	crateWorksList(); //функция в файле /calculator/general/works.js
	calculateSpec();
	checkSpec();
}

function changeAllForms() {
	getAllInputsValues(params);
	changeFormsGeneral();
	changeFormRailing();
	changeFormCarcas();
	changeFormBanisterConstruct();
	changeFormWr();
}

function configDinamicInputs() {
	changeFormBanister();
	changeFormTopFloor();
	changeFormLedges();
	changeAllForms();
	configSectInputs();
	configBoxInputs();
}

	
	