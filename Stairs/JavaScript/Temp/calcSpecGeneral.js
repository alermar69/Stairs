function addGeneralItems(list) {


	/***  ГАЙКИ  ***/


	function nuts() { }; //пустая функция для навигации

	list.nut_M6 = {
		name: "Гайка М6",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.nut_M8 = {
		name: "Гайка М8",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.nut_M10 = {
		name: "Гайка М10",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.nut_M12 = {
		name: "Гайка М12",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.nut_M14 = {
		name: "Гайка М14",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.nut_M16 = {
		name: "Гайка М16",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.nut_M20 = {
		name: "Гайка М20",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.capNut_M6 = {
		name: "Гайка М6 колп.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.capNut_M8 = {
		name: "Гайка М8 колп.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.capNut_M10 = {
		name: "Гайка М10 колп.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.capNut_M12 = {
		name: "Гайка М12 колп.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.capNut_M14 = {
		name: "Гайка М14 колп.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.capNut_M16 = {
		name: "Гайка М16 колп.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.plasticCap_M10 = {
		name: "Колпачек М10 пласт.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	//цвет пластиковых колпачков
	var capColor = "черный";
	if (params.metalPaint == "порошок") {
		if (params.carcasColor == "светло-серый") capColor = "серый";
		if (params.carcasColor == "темно-серый") capColor = "серый";
		if (params.carcasColor == "коричневый") capColor = "коричневый";
		if (params.carcasColor == "черный") capColor = "черный";
		if (params.carcasColor == "белый") capColor = "белый";
		if (params.carcasColor == "бежевый") capColor = "серый";
		if (params.carcasColor == "медный антик") capColor = "коричневый";
		if (params.carcasColor == "белое серебро") capColor = "белый";
		if (params.carcasColor == "черное серебро") capColor = "серый";
		if (params.carcasColor == "черная ящерица") capColor = "черный";
		if (params.carcasColor == "бежевая ящерица") capColor = "серый";
		if (params.carcasColor == "коричневая ящерица") capColor = "коричневый";
	}
	list.plasticCap_M10.name += " " + capColor;

	/***  ШАЙБЫ  ***/


	function shims() { }; //пустая функция для навигации

	list.shim_M6 = {
		name: "Шайба М6",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M8 = {
		name: "Шайба М8",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M10 = {
		name: "Шайба М10",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M12 = {
		name: "Шайба М12",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M14 = {
		name: "Шайба М14",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M16 = {
		name: "Шайба М16",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M20 = {
		name: "Шайба М20",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};


	/***  ШАЙБЫ УВЕЛИЧЕННЫЕ  ***/


	function shims_L() { }; //пустая функция для навигации

	list.shim_M6_L = {
		name: "Шайба М6 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M8_L = {
		name: "Шайба М8 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M10_L = {
		name: "Шайба М10 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M12_L = {
		name: "Шайба М12 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M14_L = {
		name: "Шайба М14 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M16_L = {
		name: "Шайба М16 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.shim_M20_L = {
		name: "Шайба М20 увел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};


	/*** САМОРЕЗЫ ***/


	function screws() { }; //пустая функция для навигации

	//Саморез крепления деревянного поручня
	list.timberHandrailScrew = {
		name: "Саморез Ф4,2х32 пол. гол. остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Саморез крепления металлического поручня
	list.metalHandrailScrew = {
		name: "Саморез Ф4,2х19 пол. гол. сверло",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.rigelScrew = {
		name: "Саморез Ф4,2х32 пол. гол. сверло",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Саморезы крепления к ступеням
	list.treadScrew = {
		name: "Саморез Ф6,3х32 пол. гол. остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};



	list.glassHolderMetalScrew = {
		name: "Саморез Ф4,2х32 п/ш сверло",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.glassHolderTimberScrew = {
		name: "Саморез Ф4,2х32 п/ш остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Нижнее крепление подступенков
	list.riserScrewBot = {
		name: "Саморез Ф3,5х55 потай остр. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};
	//Верхнее крепление подступенков
	list.riserScrewTop = {
		name: "Саморез Ф3,5х35 потай отср. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Верхнее крепление подступенков забежных ступеней КО
	list.riserScrewTopWinderKo = {
		name: "Саморез Ф3,5х16 потай остр. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};


	//Саморезы крепления к ступеням
	list.screw_6x60 = {
		name: "Саморез Ф6х60 потай остр. желт.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.screw_6x32 = {
		name: "Саморез Ф6,3х32 пол. гол. остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	//Крепление ригеледержателей
	list.rigelHolderScrew = {
		name: "Саморез Ф4,2х32 пол. гол. сверло",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Саморезы крепления к ступеням
	list.treadScrew_ko = {
		name: "Саморез Ф3,5х35 потай остр. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	//Саморезы крепления к ступеням
	list.screw_3x55 = {
		name: "Саморез Ф3,5х55 потай остр. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.screw_3x35 = {
		name: "Саморез Ф3,5х35 потай остр. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.screw_4x45 = {
		name: "Саморез Ф4,2х55 потай остр. бел.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.screw_4x32 = {
		name: "Саморез Ф4,2х32 пол. гол. остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.screw_4x19 = {
		name: "Саморез Ф4,2х19 пол. гол. остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.screw_4x16 = {
		name: "Саморез Ф4х16 потай остр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.roofingScrew_5x19 = {
		name: "Кровельный саморез 5,5x19",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.roofingScrew_5x32 = {
		name: "Кровельный саморез 5,5x32",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.screw_8x80 = {
		name: "Глухарь Ф8х80",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.screw_8x120 = {
		name: "Глухарь Ф8х120",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.screw_10x100 = {
		name: "Глухарь 10х100",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.dowel_10x50 = {
		name: "Дюбель пласт. Ф10х50",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.dowel_6x40 = {
		name: "Дюбель пласт. Ф6х40",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};


	//Крепление поручней ограждения
	list.roundRutel = {
		name: "Рутель угловой под круглый поручень",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Крепление поручней ограждения
	list.planeRutel = {
		name: "Рутель угловой под плоский поручень",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};



	/***  БОЛТЫ, ВИНТЫ, ШПИЛЬКИ  ***/


	function bolts() { }; //пустая функция для навигации

	list.bolt_M6x20 = {
		name: "Винт М6х20 пол. гол. крест",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.boltHex_M6x30 = {
		name: "Винт М6х30 внутр. шестигр. плоск. гол.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.boltHex_M6x35 = {
		name: "Болт М6х35 с внутр. шестигр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.bolt_M10x30 = {
		name: "Болт М10х30 шестигр. гол.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.bolt_M10x40 = {
		name: "Болт М10х40 шестигр. гол.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.bolt_M10x60 = {
		name: "Болт М10х60 шестигр. гол.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.bolt_M10x70 = {
		name: "Болт М10х70 шестигр. гол.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};


	list.hexVint_M10x20 = {
		name: "Болт М10х20 потай внутр. шестигр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.hexVint_M10x30 = {
		name: "Болт М10х30 потай внутр. шестигр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.hexVint_M10x40 = {
		name: "Болт М10х40 потай внутр. шестигр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.hexVint_M10x140 = {
		name: "Болт М10х140 потай внутр. шестигр.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.vint_M6x10 = {
		name: "Винт М6х10 потай крест",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.vint_M6x70 = {
		name: "Винт М6х70 потай крест",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.rivet_M6 = {
		name: "Заклепка резьбовая М6",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};
	list.boltMeb_M6x35 = {
		name: "Болт мебельный М6х35",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.boltMeb_M8x19 = {
		name: "Болт мебельный М8х16",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.stud_M10x140 = {
		name: "Шпилька М10 L=140",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "metal",
		items: []
	};

	list.stud_M10 = {
		name: "Шпилька М10 L=1000",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.stud_M12 = {
		name: "Шпилька М12 L=1000",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.stud_M16 = {
		name: "Шпилька М16 L=1000",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.chemAnc = {
		name: "Химический анкер летн.",
		amtName: "баллон",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.chemAncNose = {
		name: "Носик для химического анкера",
		amtName: "шт",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};



	/***  ФУРНИТУРА  ***/


	function furniture() { }; //пустая функция для навигации

	//кольца на стыки
	list.handrailRing = {
		name: "Кольцо для поручня ПВХ",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	//Шарниры ригелей
	list.inoxRigelJoint = {
		name: "Шарнир ригеля 12мм внешний",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};


	list.inoxRigelJoint16 = {
		name: "Шарнир ригеля 16мм внешний",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Шарнир поручня нерж.
	list.inoxHandrailJoint = {
		name: "Шарнир внутр. нерж. Ф50",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Шарнир поручня ПВХ
	list.pvcHandrailJoint = {
		name: "Шарнир внешний под ПВХ",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//кронштейны поручня
	list.bracket = {
		name: "Кронштейн поручня П-образный для стойки 20х20",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		group: "Ограждения",
		items: []
	};


	//Крышка фланца черн.
	list.steelCover = {
		name: "Декоративная крышка основания стойки (черн.)",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_1",
		group: "Ограждения",
		items: [],
	};

	//Крышка фланца нерж.
	list.stainlessCover = {
		name: "Декоративная крышка основания стойки (нерж.)",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Крепление поручня к стойкам
	list.handrailHolderBase = {
		name: "Основание штыря 40х40 нерж.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
		comment: "Выдать в цех"
	};

	//Кронштейн штырь с шарниром 
	list.handrailHolderTurn = {
		name: "Кронштейн поручня штырь с шарниром",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Кронштейн штырь прямой
	list.handrailHolder = {
		name: "Кронштейн поручня штырь прямой с резьбой",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Кронштейн штырь с двумя лодочками
	list.handrailHolderAng = {
		name: "Кронштейн с двумя лодочками",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Лодочка под круглый поручень
	list.handrailHolderFlanArc = {
		name: "Лодочка под круглый поручень",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Лодочка под плоский поручень
	list.handrailHolderFlanPlane = {
		name: "Лодочка под плоский поручень",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Кронштейн пристенный под плоскость
	list.sideHandrailHolder_pl = {
		name: "Кронштейн пристенный под плоский поручень",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Кронштейн пристенный под круг
	list.sideHandrailHolder_rd = {
		name: "Кронштейн пристенный под круглый поручень",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.rigelHolder12 = {
		name: "Ригеледержатель Ф12 плоск.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.rigelHolder16 = {
		name: "Ригеледержатель Ф16 плоск.",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//стеклодержатели

	list.glassHolder = {
		name: "Стеклодержатель 8мм",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.rutel_m14 = {
		name: "Рутель L = 125",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//Закладная стойки ограждения
	list.banisterInnerFlange = {
		name: "Закладная стойки",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};

	//Шарнир поручня
	list.stainlessJoint_50 = {
		name: "Шарнир нерж. Ф50",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	//боковой кронштейн стойки КО

	list.sideRackHolder = {
		name: "Кронштейн бокового крепления стойки (черн)",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};



	/***  УГОЛКИ  ***/


	function angles() { }; //пустая функция для навигации
	//Уголок крепления к перекрытию
	list.angle100 = {
		name: "У4-70х70х100",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};

	//Крепление к нижнему перекрытию
	list.regSupport = {
		name: "Регулируемая опора",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};

	//Крепление к нижнему перекрытию
	list.angle_u5_100 = {
		name: "У5-60х60х100",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};

	list.angle90 = {
		name: "У2-40х40х90",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};

	list.angle20 = {
		name: "Уголок крепления балясины",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		group: "Ограждения",
		items: []
	};

	//Уголок крепления ступени
	list.angle160 = {
		name: "У2-40х40х160",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};
	//Уголок крепления ступени
	list.angle200 = {
		name: "У2-40х40х200",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};
	//Уголок крепления ступени
	list.angle230 = {
		name: "У2-40х40х230",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};
	//Уголок крепления деталей каркаса
	list.carcasAngle = {
		name: "У4-60х60х100",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "stock_2",
		items: [],
	};



	/***  ЗАГЛУШКИ ПЛАСТИКОВЫЕ	***/


	function plasticPlugs() { }; //пустая функция для навигации

	//цвет пластиковых заглушек
	var plugColor = "черный";
	if (params.metalPaint == "порошок") {
		if (params.carcasColor == "белый") plugColor = "белый";
	}

	list.plasticPlug_20_20 = {
		name: "Заглушка пласт. 20х20 " + plugColor,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.plasticPlug_40_20 = {
		name: "Заглушка пласт. 40х20",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.plasticPlug_40_40 = {
		name: "Заглушка пласт. 40х40 " + plugColor,
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};


	list.plasticPlug_60_30 = {
		name: "Заглушка пласт. 60х30",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.plasticPlug_100_50 = {
		name: "Заглушка пласт. 100х50",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};



	/***  ЗАГЛУШКИ НЕРЖАВЕЮЩИЕ  ***/


	function inoxPlugs() { }; //пустая функция для навигации

	list.stainlessPlug_12 = {
		name: "Заглушка нерж. Ф12",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.stainlessPlug_16 = {
		name: "Заглушка нерж. Ф16",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
		group: "Ограждения",
	};

	list.stainlessPlug_50 = {
		name: "Заглушка нерж. Ф50",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};

	list.stainlessPlug_pvc = {
		name: "Заглушка внешняя для поручня ПВХ",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};

	list.tube_12x45 = {
		name: "Трубка нерж. Ф12х40",
		amtName: "шт.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: []
	};





	/***  ПРОЧЕЕ  ***/

	function other() { }; //пустая функция для навигации

	//Кованые секции ограждения
	list.forgedSection = {
		name: "Секция ограждения ков.",
		amtName: "шт.",
		metalPaintRailing: true,
		division: "metal",
		items: [],
	};

	//Сварные секции ограждения
	list.latticeSection = {
		name: "Секция ограждения сварная",
		amtName: "шт.",
		metalPaintRailing: true,
		division: "metal",
		items: [],
	};

	//Вилка подкоса
	list.braceFork = {
		name: "Вилка подкоса с фланцем",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	//Вилка подкоса
	list.scotch = {
		name: "Скотч двухсторонний, м.п.",
		amtName: "м.п.",
		metalPaint: false,
		timberPaint: false,
		division: "stock_1",
		items: [],
	};


	list.fixSpacer1 = {
		name: "Проставка " + params.fixSpacer1 + " L=" + params.fixSpacerLength1 + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	list.fixSpacer2 = {
		name: "Проставка " + params.fixSpacer2 + " L=" + params.fixSpacerLength2 + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	list.fixSpacer3 = {
		name: "Проставка " + params.fixSpacer3 + " L=" + (params.fixSpacerLength3 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	list.fixSpacer4 = {
		name: "Проставка " + params.fixSpacer4 + " L=" + (params.fixSpacerLength4 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	list.fixSpacer5 = {
		name: "Проставка " + params.fixSpacer5 + " L=" + (params.fixSpacerLength5 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	list.fixSpacer6 = {
		name: "Проставка " + params.fixSpacer6 + " L=" + (params.fixSpacerLength6 + params.wallDist) + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};

	var studLength = params.fixSpacerLength3;
	if (params.fixSpacerLength4 > studLength) studLength = params.fixSpacerLength4;
	if (params.fixSpacerLength5 > studLength) studLength = params.fixSpacerLength5;
	if (params.fixSpacerLength6 > studLength) studLength = params.fixSpacerLength6;

	list.stud_screw_M12 = {
		name: "Шпилька-шуруп М12 L=" + studLength + "мм",
		amtName: "шт.",
		metalPaint: true,
		timberPaint: false,
		division: "metal",
		items: [],
	};



}


//функция возвращает тип покраски для таблицы спецификации
function isPainting(item) {
	var paintType;

	//покраска металла
	if ('metalPaint' in item && item.metalPaint) {
		//детали каркаса
		paintType = params.metalPaint;
		if (params.metalPaint !== 'нет') paintType += ", цвет " + params.carcasColor;

		//детали ограждений		
		if (params.calcType != 'vint' && (item.group == "Ограждения" || item.group == "handrails")) {
			paintType = params.metalPaint_railing;
			if (params.metalPaint_railing !== 'нет') paintType += ", цвет " + params.metalBalColor;
		}
	}


	if ('timberPaint' in item && item.timberPaint && params.timberPaint !== 'нет') {
		paintType = params.timberPaint;
		if (params.timberPaint == "морилка+лак" || params.timberPaint == "морилка+масло") paintType += ", морилка " + params.timberColorNumber;
	}


	if ('timberPaintRailing' in item && item.timberPaintRailing && params.timberPaint_perila !== 'нет') {
		paintType = params.timberPaint_perila;
		if (params.timberPaint_perila == "морилка+лак" || params.timberPaint == "морилка+масло") paintType += ", морилка " + params.railingTimberColorNumber;
		if (params.timberPaint_perila == "как на лестнице") {
			paintType = params.timberPaint;
			if (params.timberPaint == "морилка+лак" || params.timberPaint == "морилка+масло") paintType += ", морилка " + params.carcasColorNumber;
		}
	}
	if ('timberPaint_bal' in item && item.timberPaint_bal && params.timberPaint_perila_bal !== 'нет') {
		paintType = params.timberPaint_perila_bal + ", цвет " + $("#timberColorNumber_bal").val();
		if (params.timberPaint_perila_bal == "как на лестнице") {
			paintType = params.timberPaint + ", цвет " + $("#metalColorNumber").val();
		}
	}

	if ('timberPaint_treads' in item && item.timberPaint_treads && params.timberPaint_treads !== 'нет') {
		paintType = params.timberPaint;
		if (params.timberPaint == "морилка+лак" || params.timberPaint == "морилка+масло") paintType += ", морилка " + params.treadColorNumber;
	}

	if ('timberPaint_carcas' in item && item.timberPaint_carcas && params.timberPaint_carcas !== 'нет') {
		paintType = params.timberPaint;
		if (params.timberPaint == "морилка+лак" || params.timberPaint == "морилка+масло") paintType += ", морилка " + params.carcasColorNumber;
	}

	//покраска дерева на деревянных лестницах
	if (!('metalPaint' in item && item.metalPaint && params.metalPaint !== 'нет')) {
		if ('timberPaint' in item && item.timberPaint && params.timberPaint !== 'нет') {
			paintType = params.timberPaint;
			if (item.group) var groupColor = params[item.group + "Color"];
			if (groupColor && groupColor != "без морилки") paintType += ", морилка " + groupColor;
			if (groupColor == "без морилки") paintType += ", " + groupColor;
		}

	}
	if (!paintType)
		paintType = "нет";



	return paintType;
}

/** функция возвращает породу дерева для позиции спецификации
*/
function getMaterialName(item) {
	var matName = "";
	if (item.group) matName = params[item.group + "Material"];

	return matName;
}

function addFixParts(par) {
	var partsList = par.partsList;

	//химия

	if (par.fixPart == "химия") {
		item = {
			id: "chemAnc",
			amt: par.amt / 20,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);
		partsList["chemAnc"].comment = "монтаж: " + params.isHeating;

		var studLength = (150 + params.fixSpacerLength1) * 4 / 1000;

		item = {
			id: "stud_M" + par.studDiam,
			amt: studLength,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "nut_M" + par.studDiam,
			amt: par.amt,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "shim_M" + par.studDiam,
			amt: par.amt,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);
	} //end of химия

	//глухари

	if (par.fixPart == "глухари") {
		item = {
			id: "screw_10x100",
			amt: par.amt,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "shim_M10",
			amt: par.amt,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);
	} //end of глухари

	//шпилька насквозь
	if (par.fixPart == "шпилька насквозь") {
		var studLength = 300 * par.amt / 1000;
		item = {
			id: "stud_M" + par.studDiam,
			amt: studLength,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "nut_M" + par.studDiam,
			amt: par.amt * 2,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "shim_M" + par.studDiam,
			amt: par.amt * 2,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);
	}

	//саморезы
	if (par.fixPart == "саморезы") {
		item = {
			id: "screw_6x60",
			amt: par.amt,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);


		if (par.fixSurfaceType != "дерево") {
			item = {
				id: "dowel_10x50",
				amt: par.amt,
				discription: par.discription,
				unit: par.unit,
				itemGroup: par.itemGroup,
			};
			if (item.amt > 0) partsList.addItem(item);
		}
	}

	//шпилька-шуруп
	if (par.fixPart == "шпилька-шуруп") {
		item = {
			id: "stud_screw_M" + par.studDiam,
			amt: par.amt,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "nut_M" + par.studDiam,
			amt: par.amt * 2,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);

		item = {
			id: "shim_M" + par.studDiam,
			amt: par.amt * 2,
			discription: par.discription,
			unit: par.unit,
			itemGroup: par.itemGroup,
		};
		if (item.amt > 0) partsList.addItem(item);
	}

}//end of addFixParts


function wallMountingItemsAdd(par) {

	var amt = par.amt;
	if (par.fixPart != "не указано" && par.fixPart != "нет" &&
		par.fixSpacer == "40х40 сдвоен.") amt = par.amt * 2;

	var fixParams = {
		partsList: par.partsList,
		fixPart: par.fixPart,
		fixSurfaceType: par.fixSurfaceType,
		discription: par.discription,
		unit: "Крепление к стенам",
		itemGroup: "Крепление к обстановке",
		amt: amt,
		extraStudLength: par.fixSpacerLength,
		studDiam: 10,
	};
	if (par.fixSurfaceType == "пеноблок") fixParams.studDiam = 16;


	if (params.isAssembling == "есть") addFixParts(fixParams);

	//проставка
	if (par.fixPart != "не указано" && par.fixPart != "нет" &&
		par.fixSpacer != "не указано" && par.fixSpacer != "нет") {
		var spacerAmt = par.fixAmt;
		if (par.fixSpacer == "40х40 сдвоен.") spacerAmt = spacerAmt;

		item = {
			id: par.fixSpacerId,
			amt: spacerAmt,
			discription: par.discription,
			unit: "Крепление к стенам",
			itemGroup: "Крепление к обстановке",
		};
		if (item.amt > 0) partsList.addItem(item);
	}

}//end of wallMountingItemsAdd

/** функция рассчитывает кол-во стыков ограждений с шарнирами
*/

function calcRailingJointAmt() {
	var jointAmt = 0;
	if (params.stairModel != "Прямая") {
		if (params.railingSide_1 == "внешнее" || params.railingSide_1 == "две") jointAmt += 1;
		if (params.railingSide_3 == "внешнее" || params.railingSide_3 == "две") jointAmt += 1;
	}
	if (params.stairModel == "П-образная трехмаршевая") {
		if (params.railingSide_2 == "внешнее" || params.railingSide_2 == "две") jointAmt += 1;
	}
	return jointAmt;

}//end of calcRailingJointAmt


// функция вывода спецификации шаблон "Комплектовка"
function printSpecificationCollation(partsList) {

	// заполнение спецификации металлического цеха
	var $metal = $('#metal_list'), metal_specification = '',
		$timber = $('#timber_list'), timber_specification = '',
		$stock1 = $('#stock1_list'), stock1_specification = '',
		$stock2 = $('#stock2_list'), stock2_specification = '';
	$.each(partsList, function (articul, list) {
		if ($.type(list) != 'object')
			return;
		//комментарии
		var comment = "";
		if (list.comment) comment = list.comment;

		//выбираем спецификацию для цеха
		var countItem = 0;
		$.each(list.items, function (i, item) {
			countItem += item.amt;
		});

		var isModelData = "";
		if (list.isModelData) isModelData = "да"
		var row = "<tr class='specRow' data-articul='" + articul + "'>" +
			"<td data-propId='name'>" + list.name + "</td>" +
			"<td data-propId='amt'>" + countItem + "</td>" +
			"<td data-propId='painting'>" + isPainting(list) + "</td>" +
			"<td data-propId='comment'>" + comment + "</td>" +
			"<td data-propId='isModelData'>" + isModelData + "</td>" +
			"</tr>";

		if (list.division == "timber") {
			var row = "<tr class='specRow' data-articul='" + articul + "'>" +
				"<td data-propId='name'>" + list.name + "</td>" +
				"<td data-propId='material'>" + getMaterialName(list) + "</td>" +
				"<td data-propId='amt'>" + countItem + "</td>" +
				"<td data-propId='painting'>" + isPainting(list) + "</td>" +
				"<td data-propId='comment'>" + comment + "</td>" +
				"<td data-propId='isModelData'>" + isModelData + "</td>" +
				"</tr>";
		}

		if (countItem > 0)
			switch (list.division) {
				case 'stock_1': // Склад фурнитуры
					stock1_specification += row;
					break;
				case 'stock_2': // Склад заготовок
					stock2_specification += row;
					break;
				case 'metal': //металлический цех
					metal_specification += row;
					break;
				case 'timber': // столярный цех
					timber_specification += row;
					break;
			}
	});

	$metal.html("<h3>Детали, изготавливаемые в металлическом цеху:</h3>" +
		"<table class = 'tab_4'>" +
		"<thead><tr><th>Наименование</th><th>Кол-во</th><th>Покраска</th><th>Комментарии</th><th>С модели</th></tr></thead><tbody>" +
		metal_specification +
		"</tbody></table>");
	$timber.html("<h3>Детали, изготавливаемые в столярном цеху:</h3>" +
		"<table class = 'tab_4' id='timberSpec'>" +
		"<thead><tr><th>Наименование</th><th>Материал</th><th>Кол-во</th><th>Покраска</th><th>Комментарии</th><th>С модели</th></tr></thead><tbody>" +
		timber_specification +
		"</tbody></table>");

	$stock1.html("<h3>Детали со склада фурнитуры:</h3>" +
		"<table class = 'tab_4'>" +
		"<thead><tr><th>Наименование</th><th>Кол-во</th><th>Покраска</th><th>Комментарии</th><th>С модели</th></tr></thead><tbody>" +
		stock1_specification +
		"</tbody></table>");
	$stock2.html("<h3>Детали со склада заготовок:</h3>" +
		"<table class = 'tab_4'>" +
		"<thead><tr><th>Наименование</th><th>Кол-во</th><th>Покраска</th><th>Комментарии</th><th>С модели</th></tr></thead><tbody>" +
		stock2_specification +
		"</tbody></table>");
} // end of printSpecificationCollation()

// функция вывода спецификации шаблон "Сборка"
function printSpecificationAssembly(partsList) {

	// заполнение спецификации металлического цеха
	var $specification = $('#specificationAssembly'), newList = {};
	//перебираем все элементы справочника
	$.each(partsList, function (articul, list) {
		//if()
		if ($.type(list) != 'object')
			return;
		//перебираем добавленные в справочник элементы
		$.each(list.items, function (i, item) {
			//если данная группа еще не созданна
			if (!(item.group in newList)) {
				//добавляем новую группу
				newList[item.group] = '';
			}
			//добавляем элементы в группу
			newList[item.group] += "<tr><td>" + list.name + "</td><td>" + item.amt + "</td><td>" + item.discription + "</td><td>" + isPainting(list) + "</td><td>" + item.unit + "</td><td>" + articul + "</td><td><input type='checkbox' class='specCheckbox'></td></tr>";
		});

	});
	var tables = '';
	$.each(newList, function (group, trs) {
		tables += "<h3>Группа: " + group + "</h3>" +
			"<table class = 'tab_4'>" +
			"<thead><tr><th>Наименование</th><th>Кол-во</th><th>Назначение</th><th>Покраска</th><th>Узел</th><th>Артикул</th><th>Проверено</th></tr></thead><tbody>" +
			trs +
			"</tbody></table>";
	});
	$specification.html(tables);
} // end of printSpecificationAssembly()

/** функция выводит на страницу параметры деталей, снятые с модели
*/

function printPartsAmt() {

	var modelInfo = ""
	var ignorList = ["forgedRack"]
	modelInfo += "<h3>Детали лестницы</h3>" +
		"<table class='tab_2'><tbody><tr><th>Наименование</th><th>кол-во</th><th>артикул</th></tr>"
	for (var partName in partsAmt) {
		if (partsAmt[partName] && ignorList.indexOf(partName) == -1) {
			for (var type in partsAmt[partName]["types"]) {
				modelInfo += "<tr><td>" + partsAmt[partName].name + " " + type + "</td><td>" + partsAmt[partName]["types"][type] + "</td><td class='partId'>" + partName + type + "</td></tr>";
			}
		}
	}
	modelInfo += "</tbody></table>";
	modelInfo += "<h3>Детали балюстрады</h3>" +
		"<table class='tab_2'><tbody><tr><th>Наименование</th><th>кол-во</th><th>артикул</th></tr>"
	for (var partName in partsAmt_bal) {
		if (partsAmt_bal[partName] && ignorList.indexOf(partName) == -1) {
			for (var type in partsAmt_bal[partName]["types"]) {
				//modelInfo +=  partsAmt_bal[partName].name + " " + type + ": " + partsAmt_bal[partName]["types"][type] + "шт;<br/>"
				modelInfo += "<tr><td>" + partsAmt_bal[partName].name + " " + type + "</td><td>" + partsAmt_bal[partName]["types"][type] + "</td><td class='partId'>" + partName + type + "</td></tr>";
			}
		}
	}
	modelInfo += "</tbody></table>";

	var totalGlassArea = getPartPropVal("glasses", "sumArea", partsAmt) + getPartPropVal("glasses", "sumArea", partsAmt_bal);
	if (totalGlassArea) {
		modelInfo += "<h3>Информация по стеклам / экранам</h3>" +
			"Ко-во на лестнице: " + getPartPropVal("glasses", "amt", partsAmt) + " шт; <br/>" +
			"Ко-во на балюстраде: " + getPartPropVal("glasses", "amt", partsAmt_bal) + " шт; <br/>" +
			"<b>Общее кол-во: " + (getPartPropVal("glasses", "amt", partsAmt) + getPartPropVal("glasses", "amt", partsAmt_bal)) + " шт; </b><br/>" +
			"Площадь на лестнице: " + Math.round(getPartPropVal("glasses", "sumArea", partsAmt) * 100) / 100 + " м2; <br/>" +
			"Площадь на балюстраде: " + Math.round(getPartPropVal("glasses", "sumArea", partsAmt_bal) * 100) / 100 + " м2; <br/>" +
			"<b>Общая площадь: " + Math.round(totalGlassArea * 100) / 100 + " м2; </b><br/>";
	}

	$("#modelInfo").html(modelInfo);

	//комментарии к спецификации
	var comment = "<h2>Примечания к спецификации</h2>";
	var isUnit = staircaseHasUnit();

	//покраска металла в несколько цветов
	var singleMetalColor = true;
	var color = "";
	$("#colorsFormTable tr[data-mat='metal']:visible").each(function () {
		if (!color) color = $(this).find(".Color").val();
		else {
			if (color != $(this).find(".Color").val()) singleMetalColor = false;
		}
	})
	if (!singleMetalColor) comment += "<p class='specAlert'>Покраска металла в несколько цветов</p>";

	//покраска дерева в несколько цветов
	var singleTimberColor = true;
	var singleTimberType = true;
	var color = "";
	var timberType = "";
	$("#colorsFormTable tr[data-mat='timber']:visible").each(function () {
		//цвет
		if (!color) color = $(this).find(".Color").val();
		else if (color != $(this).find(".Color").val()) singleTimberColor = false;

		//порода дерева
		if (!timberType) timberType = $(this).find(".Material").val();
		else if (timberType != $(this).find(".Material").val()) singleTimberType = false;

	})
	if (!singleTimberType) comment += "<p class='specAlert'>Используется несколько пород дерева</p>";
	if (!singleTimberColor) comment += "<p class='specAlert'>Покраска дерева в несколько цветов</p>";


	if (!singleMetalColor || !singleTimberColor || !singleTimberType) {
		$("#specComment").html(comment);
	}


}//end of printPartsAmt

function printPoleList() {

	//копируем детали в новый массив с одновременной групировкой одинаковых деталей
	var poleTypes = {};
	for (var mat in poleList) {
		poleTypes[mat] = [];
	}

	//перебираем все палки
	for (var mat in poleTypes) {
		for (var i = 0; i < poleList[mat].length; i++) {
			var newPole = poleList[mat][i];
			var isNewType = true;

			//перебираем уже внесенные палки, ищем дубли
			for (var j = 0; j < poleTypes[mat].length; j++) {
				var oldPole = poleTypes[mat][j];
				//сравниваем размеры и кромку нового эл-та с уже добавленными
				if (newPole.len1 == oldPole.len1 &&
					newPole.angStart == oldPole.angStart &&
					newPole.angEnd == oldPole.angEnd &&
					newPole.poleProfileY == oldPole.poleProfileY &&
					newPole.poleProfileZ == oldPole.poleProfileZ) {
					isNewType = false;
					oldPole.amt += 1;
					//добавляем название, если оно не было добавлено раньше
					if (oldPole.description.indexOf(newPole.text) == -1) {
						oldPole.description.push(newPole.text)
					}
				}
			}//конец поиска дублей

			if (isNewType) poleTypes[mat].push(newPole);

		}//конец перебора панелей
	}//конец перебора материалов

	var text = "<h3>Ведомость деталей</h3>" +
		"<table class='tab_2' id='partsTable'><tbody>" +
		"<tr>" +
		"<th>Профиль</th>" +
		"<th>Lполн.</th>" +
		"<th>L1</th>" +
		"<th>L2</th>" +
		"<th>a1</th>" +
		"<th>b1</th>" +
		"<th>a2</th>" +
		"<th>b2</th>" +
		"<th>C</th>" +
		"<th>кол-во</th>" +
		"<th>Описание</th>" +
		"</tr>";
	for (var mat in poleTypes) {
		for (var i = 0; i < poleTypes[mat].length; i++) {
			var item = poleTypes[mat][i];
			text += "<tr>" +
				"<td>" + mat + "</td>" +
				"<td>" + item.len3 + "</td>" +
				"<td>" + item.len1 + "</td>" +
				"<td>" + item.len2 + "</td>" +
				"<td>" + item.angStart + "</td>" +
				"<td>" + item.cutOffsetStart + "</td>" +
				"<td>" + item.angEnd + "</td>" +
				"<td>" + item.cutOffsetEnd + "</td>" +
				"<td>" + item.poleProfileY + "</td>" +
				"<td>" + item.amt + "</td><td>";

			for (var j = 0; j < item.description.length; j++) {
				text += item.description[j];
				if (j < item.description.length - 1) text += "; <br/>";
			}
			text += "</td></tr>";
		}
	}

	text += "</tbody></table>"
	//кнопка выгрузки в xls
	text += '<button id="downLoadPoleList">Скачать xls</button>';
	text += "<p>Обозначение размеров: </p> <img src='/drawings/railing/poleDimensions.jpg' width='600'>"

	$("#poleList").html(text);
}

function getPartAmt(partName, dataObj) {
	if (!dataObj) dataObj = partsAmt;

	var itemAmt = 0;
	if (dataObj[partName]) itemAmt = dataObj[partName].amt;

	return itemAmt;
} //end of getPartAmt

function getPartArea(partName, dataObj) {
	if (!dataObj) dataObj = partsAmt;

	var itemArea = 0;
	if (dataObj[partName]) itemArea = dataObj[partName].area;

	return itemArea;
} //end of getPartAmt

function getPartPropVal(partName, prop, dataObj) {
	if (!dataObj) dataObj = partsAmt;
	var propVal = 0;
	if (dataObj[partName]) propVal = dataObj[partName][prop];

	return propVal;
} //end of getPartPropVal


function getTreadParams() {
	var par = {};

	par.fixPart = "screw";
	par.fixPartId = "screw_6x32";

	par.material = "timber";
	par.timberPaint = true;
	par.metalPaint = false;
	par.division = "timber";



	if (params.stairType == "рифленая сталь" ||
		params.stairType == "рифленый алюминий" ||
		params.stairType == "лотки") {
		par.material = "metal";
		par.timberPaint = false;
		par.metalPaint = true;
		par.fixPart = "bolt";
		par.fixPartId = "";
		//	if(params.boltHead == "hexagon") par.fixPartId = "bolt_M10x30";
		par.division = "metal";
	}


	if (params.stairType == "дпк") {
		par.timberPaint = false;
		par.fixPart = "boltMeb";
		par.fixPartId = "boltMeb_M6x35";
	}
	if (params.stairType == "лиственница тер.") {
		par.fixPart = "boltMeb";
		par.fixPartId = "boltMeb_M6x35";
	}
	if (params.stairType == "пресснастил") {
		par.material = "metal";
		par.timberPaint = false;
		par.fixPart = "bolt";
		par.fixPartId = "hexVint_M10x20";
		if (params.boltHead == "hexagon") par.fixPartId = "bolt_M10x30";
		par.division = "metal";
	}

	if (params.stairType == "стекло") {
		par.material = "glass";
		par.timberPaint = false;
		par.fixPart = "scotch";
		par.fixPartId = "scotch";
	}

	return par;
} //end of getTreadParams

