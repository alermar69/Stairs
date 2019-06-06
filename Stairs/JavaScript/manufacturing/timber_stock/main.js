var params = {}; //глобальный массив значений инпутов
var viewportsParams = []; //глобальный массив параметров видовых экранов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf
var dxfPrimitivesArr0 = []; //вспомогательный массив, чтобы не засорЯть основной чертеж
var staircasePrice = {}; //глобальный массив цен элементов лестницы
var staircaseCost = {}; //глобальный массив себестоимости элементов лестницы
var railingParams = {}; //глобальный массив параметров ограждений
var banisterParams = {}; //глобальный массив параметров балюстрады
var staircasePartsParams = {}; //параметры деталей лестницы для спецификации
var materials = {}; //потребность в материалах
var dxfBasePoint = {};
var workList = {}; //сдельные расценки для цеха
var isDoorsOpened = false;
var wrPrice = {}; //глобальный массив цен элементов шкафа
var wrCost = {}; //глобальный массив себестоимости элементов шкафа
var wrParams = {}; //глобальный массив параметров ограждений
var partsAmt = {}; //глобальный массив количеств эл-тов для спецификации лестницы
var partsAmt_bal = {}; //глобальный массив количеств эл-тов для спецификации балюстрады
var specObj = partsAmt; //ссылка на массив данных для спецификации (лестница или балюстрада)
var layers = {};
var shapesList = [];
var poleList = {}; //ведомость резки профилей и поручней

$(function () {
	//добавляем видовые экраны на страницу
	addViewport('WebGL-output', 'vl_1'); //параметры outputDivId, viewportId

	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true); //параметры viewportId, isVisible

	//добавляем стены
	addWalls('vl_1', false); //параметры viewportId, isVisible

	//добавляем балюстраду
	addBanister('vl_1');

	//добавляем проем
	addTopFloor('vl_1');

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
	for (var layer in layers) {
		addLayer(layer, layers[layer]);
	}

	var loader = new THREE.FontLoader();
	if (!fontGlob) {
		//Загружаем шрифты
		var mesh = loader.load( '/calculator/general/three_libs/font.json', function ( font ) {
			fontGlob = font; // После загрузки шрифтов загружаем текста
			if (fontGlob) {
				setDimensions('vl_1', '3d');
			}
		});
	}

	//конфигурируем правое меню
	$(".tabs").lightTabs();


	recalculate = function () {

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

	}

	//пересчитываем лестницу
	recalculate();

	//скрываем ненужные блоки
	$("#mainImages").hide();

	//$("#cost").hide();

	//сворачивание блоков
	initToggleDivs();
});

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