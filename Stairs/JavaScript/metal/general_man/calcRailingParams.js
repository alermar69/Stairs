function setRailingParams(par) {

	//получаем параметры марша по его номеру
	var marshParams = getMarshParams(par.marshId);
	var nextMarshParams = getMarshParams(marshParams.nextMarshId);
	var prevMarshParams = getMarshParams(marshParams.prevMarshId);

	//стыковка ограждений
	par.topConnection = false;
	par.botConnection = false;

	//стыковка сверху
	if (params.stairModel != "Прямая") {
		if (par.marshId != 3) {
			if (marshParams.hasRailing[par.key] && nextMarshParams.hasRailing[par.key])
				par.topConnection = true;
		}
		//стыковка снизу
		if (par.marshId != 1) {
			if (marshParams.hasRailing[par.key] && prevMarshParams.hasRailing[par.key])
				par.botConnection = true;
		}
	}

	//соответствие стороны ограждения in-out и right-left
	par.railingSide = marshParams.side[par.key]

	//тип верхнего и нижнего поворота
	par.topEnd = marshParams.topTurn;
	par.botEnd = marshParams.botTurn;
	if (marshParams.topTurn == "пол") par.topEnd = "нет";
	if (marshParams.botTurn == "пол") par.botEnd = "нет";


	//на внутренней стороне марша тип поворота всегда "нет" кроме верхней площадки
	if (par.key == "in") par.topEnd = par.botEnd = "нет";
	//если сверху верхняя площадка
	//получаем данные о наличии ограждений на верхней площадке
	var topPltRailing = getTopPltRailing(); //функция в файле inputsReading.js
	var isTopPlt = false;
	if (marshParams.hasTopPltRailing[par.key]){
		par.topEnd = "площадка";
		isTopPlt = true;
		}
	/*
	if (marshParams.lastMarsh && (params.platformTop == "площадка" || params.platformTop == "увеличенная")) {
		par.topEnd = "нет";
		if (!(params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой')) {
			if (topPltRailing[par.key] && !(params.platformTop == 'увеличенная' && par.key == 'in')) {//FIX
				par.topEnd = "площадка";
				isTopPlt = true;
			}
		}
		if (params.stairModel == 'Прямая' || params.stairModel == 'Прямая с промежуточной площадкой') {
			//if (topPltRailing[par.key] && !(params.platformTop == 'увеличенная' && par.key == 'out')) {//FIX
			if (topPltRailing[par.key]) {//FIX
				par.topEnd = "площадка";
				isTopPlt = true;
			}
		}
	}
	*/
	if (par.key == 'in' && hasCustomMidPlt(par) && params.middlePltWidth >= params.M + 200 && par.marshId == 3) par.botEnd = "площадка";
	if (par.key == "in" && hasCustomMidPlt(par) && params.middlePltLength >= params.M + 200 && par.marshId == 1) par.topEnd = "площадка";

	if (params.stairModel == "Прямая с промежуточной площадкой") {
		par.botEnd = "площадка";
		par.topEnd = "нет";
		//костыль - берем параметры 3-го марша, т.к. массивы стоек 1 и 3 марша объединяются, но ограждение отрисовывается с marshId = 1
		if (getMarshParams(3).hasTopPltRailing[par.key]){
			par.topEnd = "площадка";
			};

	}

	if (params.stairModel == "Прямая горка") {
		if (par.marshId == 1) {
			par.botEnd = "нет";
			par.topEnd = "площадка";
		}
	}
	//секцию ограждений на марше с кол-вом ступеней 0
	if (par.marshId != 2 && par.stairAmt == 0) {
		if (par.topEnd == "площадка" && par.botEnd == "площадка" && par.key == "out")
			par.botEnd = "площадка";
		else
			par.botEnd = "нет";

		if (par.marshId == 3 && params.platformTop == "площадка" && par.key == "out")
			par.topEnd = "площадка";
		else
			par.topEnd = "нет";
	}

	//секцию ограждений на марше с кол-вом ступеней 1
	if (par.marshId != 2 && par.stairAmt == 1) {
		if (par.botEnd == "забег") par.botEnd = "нет";
		if (par.topEnd == "забег") par.topEnd = "нет";
	}

	//если в марше 0 или 1 ступень, то нижнее ограждение забега является ограждением марша
	if (marshParams.stairAmt < 2 && par.botEnd == "забег" && params.railingModel != "Самонесущее стекло") {
		par.botEnd = "нет";
	}

	//секции ограждений верхней площадки

	if (par.marshId == "topPlt") {
		par.topEnd = "нет";
		par.botEnd = "нет";
		par.isPlatform = true;
	}

	//длина верхнего участка

	par.platformLengthTop = 0;
	if (par.topEnd != "нет") par.platformLengthTop = params.M;
	//для верхней площадки лестницы длина берется из параметров
	if (isTopPlt) par.platformLengthTop = params.platformLength_3;
	//для промежуточной площадки П-образной лестницы длина берется из параметров
	if (par.topEnd == "площадка" && !isTopPlt && params.stairModel == "П-образная с площадкой")
		par.platformLengthTop = params.platformLength_1 - 45;

	//длина нижнего участка

	par.platformLengthBottom = 0;
	if (par.botEnd != "нет") par.platformLengthBottom = params.M;
	//П-образная с площадкой
	if (par.botEnd == "площадка" && !isTopPlt && params.stairModel == "П-образная с площадкой")
		par.platformLengthBottom = params.platformLength_1 + 40;

}; //end of setRailingParams


function setRackPos(marshId) {

	// номера средних ступеней марша, где устанавливается стойка
	var rackPos = [];

	var marshParams = getMarshParams(marshId);
	var stairAmt = marshParams.stairAmt;

	//учитываем начало ограждений не с первой ступени
	if (marshId == 1) stairAmt -= params.railingStart;

	if (stairAmt == 5) rackPos = [3];
	if (stairAmt == 6) rackPos = [4];
	if (stairAmt == 7) rackPos = [4];
	if (stairAmt == 8) rackPos = [3, 6];
	if (stairAmt == 9) rackPos = [4, 6];
	if (stairAmt == 10) rackPos = [4, 7];
	if (stairAmt == 11) rackPos = [3, 6, 9];
	if (stairAmt == 12) rackPos = [3, 6, 9];
	if (stairAmt == 13) rackPos = [4, 7, 10];
	if (stairAmt == 14) rackPos = [3, 6, 9, 12];
	if (stairAmt == 15) rackPos = [3, 6, 9, 12];
	if (stairAmt == 16) rackPos = [4, 7, 10, 13];
	if (stairAmt == 17) rackPos = [3, 6, 9, 12, 15];
	if (stairAmt == 18) rackPos = [4, 7, 10, 13, 16];
	if (stairAmt == 19) rackPos = [4, 7, 10, 13, 16];
	if (stairAmt == 20) rackPos = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 21) rackPos = [3, 6, 9, 12, 15, 18];
	if (stairAmt == 22) rackPos = [4, 7, 10, 13, 16, 19];
	if (stairAmt == 23) rackPos = [3, 6, 9, 12, 15, 18, 21];
	if (stairAmt == 24) rackPos = [3, 6, 9, 12, 15, 18, 21];
	if (stairAmt == 25) rackPos = [4, 7, 10, 13, 16, 19, 22];


	return rackPos;

} //end of setRackPos
