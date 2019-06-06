/**
http://6692035.ru/dev/egorov/timber/materials/railing_info_timber.png
*/

/**
 * 
 * @param {object} par
 *- par.marshId - ид марша
 *- par.side - сторона ограждения(in/out) 
 */
function calcRailingRacks(par) {
	var railingParams = {};
	var marshParams = getMarshParams(par.marshId);
	var turnParams = calcTurnParams(par.marshId);
	var model = params.model == 'косоуры' || (params.model == 'тетива+косоур' && par.side == 'in') ? 'косоур' : 'тетива';
	//Принудительно устанавливаем тип косоур, для данных типов лестниц
	if ((params.calcType == 'lt-ko' || params.calcType == 'mono' || params.calcType == "timber_stock")) model = 'косоур'

	var rackSize = params.rackSize;
	var side = par.side || 'in';
	if (!rackSize) rackSize = 95;
	var stepMooveAmt = 0;
	if (par.marshId == 1 && params.firstNewellPos == 'на второй ступени') stepMooveAmt = 1;
	if (par.marshId == 1 && params.firstNewellPos == "на третьей ступени") stepMooveAmt = 2;

	if (model == 'тетива' && par.marshId == 1 && params.firstNewellPos == "на первой ступени") stepMooveAmt = 1;
	if (model == 'тетива' && par.marshId == 1 && params.firstNewellPos == "на второй ступени") stepMooveAmt = 2;
	if (model == 'тетива' && par.marshId == 1 && params.firstNewellPos == "на третьей ступени") stepMooveAmt = 3;



	if (side == 'in' || params.stairModel == 'Прямая') {
		var marshFirst = {
			x: marshParams.a / 2 + marshParams.b * stepMooveAmt,
			y: marshParams.h + marshParams.h * stepMooveAmt + 0.05,
		};
		if (model == 'тетива') {
			marshFirst = {
				x: -rackSize / 2 + params.nose + marshParams.b * stepMooveAmt,
				y: marshParams.h * stepMooveAmt + 0.05,
			};
		}

		if (marshParams.botTurn !== 'пол') {
			marshFirst = {
				x: -rackSize / 2 - calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ,
				y: marshParams.h + 0.05,
			};
			if (params.stairModel == 'П-образная с площадкой') {
				// marshFirst = {
				// 	x: -rackSize / 2 + 50,//50 вырез в столбе на п-образных
				// 	y: marshParams.h + 0.05,
				// };
				marshFirst = {
					//x: -rackSize / 2 - calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ + params.nose + 10,
					x: -rackSize / 2 - calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ + params.nose,
					y: marshParams.h + 0.05,
				};
			}
		}
		// if (params.calcType !== 'timber' && marshParams.botTurn !== 'пол') {
		// 	marshFirst.x = -rackSize / 2 - calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ;
		// 	marshFirst.y += marshParams.h;
		// }
		railingParams.marshFirst = marshFirst;

		var marshLast = {
			x: marshParams.len + rackSize / 2 + turnParams.topMarshOffsetX - 0.05,
			y: marshParams.height + 0.05,
		};

		if (params.stairModel == 'П-образная с площадкой' && par.marshId == 1) {
			var marshLast = {
				//x: marshParams.len + rackSize / 2 + turnParams.topMarshOffsetX - 0.05 - params.nose - 10,
				x: marshParams.len + rackSize / 2 + turnParams.topMarshOffsetX - 0.05 - params.nose,
				y: marshParams.height + 0.05,
			};

			// marshLast = {
			// 	x: marshParams.len + rackSize / 2 + turnParams.topMarshOffsetX + params.nose - 50 - 0.05,
			// 	y: marshParams.height + 0.05,
			// };
		}

		if (marshParams.topTurn == 'пол') {
			marshLast.x += marshParams.a / 2;
			marshLast.y += marshParams.h;
		}
		railingParams.marshLast = marshLast;

		/** Резные столбы */
		if (marshParams.botTurn == 'пол') {
			if (params.startNewellType == "резной") {
				railingParams.marshFirst.x += params.startNewellMooveX * 1;
			}
		}
		if (marshParams.topTurn == 'пол') {
			if (params.lastNewellType == "резной") {
				railingParams.marshLast.x += params.lastNewellMooveX * 1;
			}
		}
	}
	if (side == 'out') {
		if (marshParams.botTurn !== 'пол') {
			var botFirst = {
				x: -turnParams.turnLengthBot + rackSize / 2,
				y: 0.03,
			};
			if (marshParams.botTurn == 'площадка') botFirst.x -= calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ;
			if (marshParams.botTurn == 'забег') botFirst.y -= marshParams.h;
			if (params.stairModel == 'П-образная с забегом') botFirst.x -= calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ;
			if (marshParams.botTurn == 'забег' && params.calcType == 'mono') botFirst.x -= params.nose + calcTurnParams(marshParams.prevMarshId).topMarshOffsetZ;
			if (marshParams.botTurn == 'забег' && marshParams.stairAmt == 0) botFirst.x -= params.marshDist;

			railingParams.botFirst = botFirst;
		}

		var marshFirst = {
			x: marshParams.a / 2 + marshParams.b * stepMooveAmt,
			y: marshParams.h + marshParams.h * stepMooveAmt + 0.05,
		};

		if (marshParams.botTurn !== 'пол') {
			if (marshParams.botTurn == 'площадка') {
				marshFirst = {
					x: -marshParams.a / 2,// - rackSize / 2,
					y: 0.03,
				}
			}
			if (marshParams.botTurn == 'забег') {
				marshFirst = {
					x: -marshParams.a / 2 + rackSize / 2,
					y: 0.03,
				}
				if (marshParams.stairAmt == 0 && (params.calcType == 'lt-ko' || params.calcType == 'mono')) {
					marshFirst = {
						x: -rackSize / 2,
						y: 0.03,
					}
				}
			}
		}
		railingParams.marshFirst = marshFirst;

		var marshLast = {
			x: marshParams.len,
			y: marshParams.height + 0.03,
		};
		if (marshParams.topTurn !== 'пол') {
			//На деревянных лестницах устанавливаем столб в конце ступени марша(перед поворотом), для нормального расположения опорного столба
			if (marshParams.topTurn == 'забег' && (params.calcType == 'lt-ko' || params.calcType == 'mono')) marshLast.x += rackSize;
			if (marshParams.topTurn == 'забег' && params.calcType == 'timber') {
				marshLast = {
					x: marshParams.len - rackSize / 2 + params.nose - 0.03,
					y: marshParams.height + 0.03,
					deltaY: marshParams.h //Эта переменная необходима чтобы удлиннить столб на опр. велечину
				};
			}
			if (marshParams.topTurn == 'площадка') marshLast.x += marshParams.a / 2;

			if (params.calcType == 'timber_stock') {
				//80 размер столба
				marshLast = {
					x: marshParams.len + 80,
					y: marshParams.height + 0.03,
					deltaY: 0 //Эта переменная необходима чтобы удлиннить столб на опр. велечину
				};
				if (params.riserType == 'нет') marshLast.x -= params.riserThickness;

				if (marshParams.topTurn == 'забег') {
					marshLast.x = marshParams.len - marshParams.a / 2;
					marshLast.deltaY = marshParams.h;
				}
			}

			marshLast.y += marshParams.h;
		}
		if (marshParams.topTurn == 'пол') {
			marshLast = {
				x: marshParams.len + rackSize / 2 + turnParams.topMarshOffsetX + marshParams.a / 2 - 0.05,
				y: marshParams.height + marshParams.h + 0.05,
			};
		}

		railingParams.marshLast = marshLast;

		if (marshParams.topTurn !== 'пол') {
			var topLast = {
				x: marshParams.len + turnParams.turnLengthTop - rackSize / 2,//turnParams.turnLengthTop - rackSize / 2,
				y: marshParams.height + marshParams.h + 0.03,
			};
			if (marshParams.topTurn == 'забег') topLast.y += marshParams.h_topWnd;
			railingParams.topLast = topLast;
		}

		/** Резные столбы */
		if (marshParams.botTurn == 'пол') {
			if (params.startNewellType == "резной") {
				railingParams.marshFirst.x += params.startNewellMooveX * 1;
			}
		}
		if (marshParams.topTurn == 'пол') {
			if (params.lastNewellType == "резной") {
				railingParams.marshLast.x += params.lastNewellMooveX * 1;
			}
		}
	}
	return railingParams;
}

function calcRailingRacksTet(par) {
	if (marshParams.botTurn !== 'пол') {
		var botFirst = {
			x: -params.M + rackSize + 10 - 35,//fix 35
			y: 0,
		};
		if (marshParams.botTurn == 'забег') {
			botFirst.y -= marshParams.h - 0.05;
		}
		if (params.stairModel == 'П-образная с забегом') {
			botFirst.x -= (rackSize - params.stringerThickness) / 2 - 2.5; //Пока ищу эти 2.5 подогнано
			if (params.model == 'тетива+косоур') {
				botFirst.x += 25;//Подогнано
			}
		}
		if (!getMarshParams(marshParams.prevMarshId).hasRailing.out) {
			botFirst.x += rackSize / 2 - params.nose;
		}
		if (params.stairModel == 'П-образная с площадкой') {
			var botFirst = {
				x: -params.platformLength_1 + rackSize / 2 - 7.5,
				y: 0,
			};
		}
		railingParams.botFirst = botFirst;
	}

	var marshFirst = {
		x: -rackSize / 2 + params.nose,
		y: 0,
	};
	if (marshParams.botTurn == 'забег') {
		marshFirst.x -= 0.03;
		marshFirst.y += 0.05;
	}
	if (marshParams.botTurn == 'площадка') {
		marshFirst.x -= marshParams.a / 2;
	}

	railingParams.marshFirst = marshFirst;

	var marshLast = {
		x: marshParams.a * marshParams.stairAmt - rackSize / 2 + params.nose + params.riserThickness,
		y: marshParams.h * (marshParams.stairAmt + 1) + 0.05
	};
	if (marshParams.topTurn == 'площадка') {
		marshLast = {
			x: marshParams.a * marshParams.stairAmt,
			y: marshParams.h * (marshParams.stairAmt + 1)
		};
	}
	if (marshParams.topTurn == 'пол') {
		marshLast = {
			x: marshParams.a * marshParams.stairAmt - rackSize / 2 - 5,
			y: marshParams.h * (marshParams.stairAmt + 1)
		};
	}
	railingParams.marshLast = marshLast;

	if (marshParams.topTurn !== 'пол') {
		var topLast = {
			x: marshParams.a * marshParams.stairAmt - rackSize / 2 + turnLength - stringerLedge - rackSize + rackSize / 2 - params.stringerThickness / 2 + 40,
			y: marshParams.h * (marshParams.stairAmt + 1),
		};
		if (marshParams.topTurn == 'забег') {
			topLast.y += marshParams.h_topWnd + 0.05;
		}
		if (params.stairModel == 'П-образная с площадкой') {
			topLast = {
				x: marshParams.a * marshParams.stairAmt + params.platformLength_1 - rackSize - rackSize / 2 + params.stringerThickness / 2,
				y: marshParams.h * (marshParams.stairAmt + 1),
			};
		}
		railingParams.topLast = topLast;
	}
	return railingParams
}

function drawRailingSection_4_pltP(par) {
	var railingRacks = par.railingRacks;
	var stringerParams = par.stringerParams;
	var posZ = par.posZ;
	var handrailPosY = 900;
	var wndDeltaY = 0;
	var section = new THREE.Object3D();
	var rackSize = params.rackSize;
	if (!rackSize) rackSize = 95;

	if (railingRacks.marshFirst) var marshFirst = railingRacks.marshFirst;
	if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
	if (railingRacks.marshFirst) {
		var marshFirstRailingPoint = newPoint_xy(marshFirst, rackSize / 2, 0);
		var marshLastRailingPoint = newPoint_xy(marshLast, -rackSize / 2, 0);
	}

	if (params.stairModel == 'П-образная с забегом' && model == 'тетива') {
		marshFirstRailingPoint = stringerParams.keyPoints.marshFirstRailingPoint;
		marshLastRailingPoint = stringerParams.keyPoints.marshLastRailingPoint;
	}

	{
		var handrailLength_X = marshLastRailingPoint.x - marshFirstRailingPoint.x;
		var handrailAngle = angle(marshFirstRailingPoint, marshLastRailingPoint);
		var handrailLength = handrailLength_X / Math.cos(handrailAngle);
		if (params.stairModel == 'П-образная с забегом') {
			wndDeltaY = 100 / Math.sin(handrailAngle) - par.h;
		}
		var handrailParams = {
			model: params.handrail,
			length: handrailLength,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: stringerParams.dxfBasePoint,
			startAngle: Math.PI / 2 - handrailAngle,
			endAngle: Math.PI / 2 - handrailAngle,
			fixType: "нет",
			side: "out",
			poleAngle: handrailAngle,
			startChamfer: "R3",
			endChamfer: "R3",
			marshId: par.marshId
		}
		var basePoint = newPoint_xy(marshFirstRailingPoint, 0, handrailPosY);

		var handrail = drawHandrail_4(handrailParams).mesh;
		handrail.position.x = basePoint.x;
		handrail.position.y = basePoint.y;
		handrail.position.z = posZ - handrailParams.wallOffset;
		section.add(handrail);
	}

	{
		var balParams = {
			basePoint: marshFirstRailingPoint,
			lenX: handrailLength_X,
			ang: handrailAngle,
			balLen: handrailPosY - wndDeltaY,
			balStep: par.b / params.timberBalStep,
			dxfBasePoint: stringerParams.dxfBasePoint,
			marshId: par.marshId,
		}
		if (par.stringerType == 'тетива') {
			balParams.stringerType = par.stringerType;
		}

		var balArr = drawBanistersArr(balParams);
		balArr.position.y = 0;
		if (params.timberBalBotEnd == "круг") {
			balArr.position.y = 100;
		}
		balArr.position.y += wndDeltaY;
		balArr.position.z = posZ;
		section.add(balArr);
	}

	return section;
}

/**функция отрисовывает секцию ограждения, 4-я версия
*/
function drawRailingSection_4(par) {
	var section = new THREE.Object3D();
	par.mesh = section;

	// var turnFactor = params.turnSide == 'левое' ? -1 : 1;

	var stringerParams = par.stringerParams;
	var side = stringerParams.side;
	var model = stringerParams.type;

	var marshPar = getMarshParams(par.marshId);
	var rackSize = params.rackSize;
	var riserThickness = params.riserThickness || 0;
	if (!rackSize) rackSize = 95;

	if ((params.calcType == 'lt-ko' || params.calcType == 'mono' || params.calcType == 'timber_stock')) {
		side = (par.side == 'left' && turnFactor == 1) ? 'out' : 'in';
		if (turnFactor == -1) {
			side = (par.side == 'left' && turnFactor == -1) ? 'in' : 'out';
		}
		model = 'косоур';
	}
	var zeroPoint = { x: 0, y: 0 };
	if (par.botEnd !== 'нет') {
		par.hasFirstRack = !getMarshParams(marshPar.prevMarshId).hasRailing.out;
	}
	if (par.botEnd !== 'нет' && (params.stairModel == 'П-образная с площадкой' || params.stairModel == 'П-образная с забегом')) {
		par.hasFirstRack = true;
	}

	if (side == 'in') par.hasFirstRack = false;
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) par.hasFirstRack = false;

	//параметры марша
	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;
	par.lastMarsh = marshPar.lastMarsh;

	var railingRacks = calcRailingRacks({ marshId: par.marshId, side: side });
	if (model == 'косоур') {

		if (railingRacks.botFirst) var botFirst = railingRacks.botFirst;
		if (railingRacks.marshFirst) var marshFirst = railingRacks.marshFirst;
		if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
		if (railingRacks.topLast) var topLast = railingRacks.topLast;

		if (railingRacks.botFirst) {
			var botFirstRailingPoint = newPoint_xy(botFirst, rackSize / 2, 0);
			var botLastRailingPoint = newPoint_xy(marshFirst, -rackSize / 2, 0);
		}
		if (railingRacks.marshFirst) {
			var marshFirstRailingPoint = newPoint_xy(marshFirst, rackSize / 2, 0);
			var marshLastRailingPoint = newPoint_xy(marshLast, -rackSize / 2, 0);
			// if(params.railingModel == "Стекло") marshFirstRailingPoint.y += par.h + 50 + 60 / Math.cos(marshPar.ang);
		}

		if (railingRacks.topLast) {
			var topFirstRailingPoint = newPoint_xy(marshLast, rackSize / 2, 0);
			var topLastRailingPoint = newPoint_xy(topLast, -rackSize / 2, 0);
		}
	}
	if (model == 'тетива') {
		if (stringerParams.keyPoints.botFirst) var botFirst = stringerParams.keyPoints.botFirst;
		if (stringerParams.keyPoints.marshFirst) var marshFirst = stringerParams.keyPoints.marshFirst;
		if (stringerParams.keyPoints.marshLast) var marshLast = stringerParams.keyPoints.marshLast;
		if (stringerParams.keyPoints.topLast) var topLast = stringerParams.keyPoints.topLast;

		if (stringerParams.keyPoints.botFirstRailingPoint) var botFirstRailingPoint = stringerParams.keyPoints.botFirstRailingPoint;
		if (stringerParams.keyPoints.botLastRailingPoint) var botLastRailingPoint = stringerParams.keyPoints.botLastRailingPoint;
		if (stringerParams.keyPoints.marshFirstRailingPoint) var marshFirstRailingPoint = stringerParams.keyPoints.marshFirstRailingPoint;
		if (stringerParams.keyPoints.marshLastRailingPoint) var marshLastRailingPoint = stringerParams.keyPoints.marshLastRailingPoint;
		if (stringerParams.keyPoints.topFirstRailingPoint) var topFirstRailingPoint = stringerParams.keyPoints.topFirstRailingPoint;
		if (stringerParams.keyPoints.topLastRailingPoint) var topLastRailingPoint = stringerParams.keyPoints.topLastRailingPoint;

		if (par.marshId == 1) {
			var stepMooveAmt = 0;
			if (params.firstNewellPos == "на первой ступени") stepMooveAmt = 1;
			if (params.firstNewellPos == "на второй ступени") stepMooveAmt = 2;
			if (stepMooveAmt) {
				//marshFirst = newPoint_xy(stringerParams.keyPoints.marshFirst, par.b * stepMooveAmt, par.h * stepMooveAmt);
				marshFirstRailingPoint = newPoint_xy(stringerParams.keyPoints.marshFirstRailingPoint, par.b * stepMooveAmt, par.h * stepMooveAmt);
			}
		}

	}
	if (model == 'тетива' && params.stairModel == 'П-образная с площадкой' && par.marshId == 2) {
		if (railingRacks.marshFirst) var marshFirst = railingRacks.marshFirst;
		if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
		if (railingRacks.marshFirst) {
			var marshFirstRailingPoint = newPoint_xy(marshFirst, rackSize / 2, 0);
			var marshLastRailingPoint = newPoint_xy(marshLast, -rackSize / 2, 0);
		}
	}
	if (par.stairAmt == 0) {
		if (railingRacks.marshLast) var marshLast = railingRacks.marshLast;
		if (railingRacks.topLast) var topLast = railingRacks.topLast;
		if (railingRacks.marshLast && model == 'тетива') {
			var topFirstRailingPoint = stringerParams.keyPoints.topFirstRailingPoint;//newPoint_xy(marshLast, rackSize / 2, 0);
			if (par.topEnd == 'площадка') {
				topFirstRailingPoint = newPoint_xy(marshLast, rackSize / 2, 0);
				topFirstRailingPoint.y = stringerParams.keyPoints.topFirstRailingPoint.y;
			}
			var topLastRailingPoint = stringerParams.keyPoints.topLastRailingPoint;//newPoint_xy(topLast, -rackSize / 2, 0);
		}
		if (railingRacks.marshLast && model == 'косоур') {
			var topFirstRailingPoint = newPoint_xy(marshLast, rackSize / 2, 0);
			var topLastRailingPoint = newPoint_xy(topLast, -rackSize / 2, 0);
		}
	}

	//позиция секции по Z: на косоурах торец столба вровень с торцом ступени, на тетивах ось совпадает с осью тетивы
	var posZ = 0;

	if (model == "тетива") {
		posZ = params.stringerThickness / 2;
		if (par.side == "right") posZ = -params.stringerThickness / 2;
	}

	if (model == "косоур") {
		posZ = rackSize / 2;
		if (par.side == "right") posZ = -rackSize / 2;
	}
	if (model == "косоур" && (params.calcType == 'lt-ko' || params.calcType == 'mono')) {
		posZ = (rackSize / 2 + 40) * turnFactor;
		if (turnFactor == -1) posZ -= 5;
		if (side == "in") posZ = -rackSize / 2 * turnFactor;
		// if (side == "in" && turnFactor == 1) posZ -= 5;
	}

	if ((params.stairModel == 'П-образная с площадкой' || (params.stairModel == 'П-образная с забегом' && model == 'тетива')) && par.marshId == 2) {
		par.posZ = posZ;

		par.railingRacks = railingRacks;
		par.stringerType = model;
		var pltRailingMesh = drawRailingSection_4_pltP(par);

		par.mesh = pltRailingMesh;
		return par;
	}

	var hasTopRack = true;
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 2) {
		var hasTopRack = !getMarshParams(3).hasRailing.out;
	}

	//Избавляем себя от ошибок и не отрисовываем части которые не просчитались
	var hasBot = false;
	var hasMarsh = false;
	var hasTop = false;
	if (botFirstRailingPoint && botLastRailingPoint) hasBot = true;
	if (marshFirstRailingPoint && marshLastRailingPoint) hasMarsh = true;
	if (topFirstRailingPoint && topLastRailingPoint) hasTop = true;
	if (par.marshId == 1) {
		if (marshPar.stairAmt < 2) hasMarsh = false;
		if (marshPar.stairAmt == 2 && params.firstNewellPos == 'на второй ступени') hasMarsh = false;
	}

	var newellXOffset = 0;
	if (params.startNewellType == "резной") {
		if (params.startNewellModel == "01") newellXOffset = -10;
		if (params.startNewellModel == "02") newellXOffset = -10 - 215;
		if (params.startNewellModel == "03") newellXOffset = -10 - 18;
		if (params.startNewellModel == "04") newellXOffset = -10 - 10;
		if (params.startNewellModel == "05") newellXOffset = -10 - 18;
		if (params.startNewellModel == "06") newellXOffset = -10 - 2.5;
		if (params.startNewellModel == "07") newellXOffset = -10 + 3.5;
		if (params.startNewellModel == "08") newellXOffset = -10 - 2.5;
	}


	//задаем позицию поручня по высоте
	var handrailPosY = 800; //расстояние по Y от тетивы до низа поручня
	if (model == "косоур") handrailPosY = 850; //длина наибольшей балясины по ее оси
	// if ((params.calcType == 'lt-ko' || params.calcType == 'mono')) handrailPosY -= par.h / 2;
	// if (model == 'косоур' && marshPar.lastMarsh) handrailPosY += marshPar.h * 0.5;
	var handrailPosY_plt = 900; //на площадке балясины полноразмерные
	// if ((params.calcType == 'lt-ko')) handrailPosY_plt -= par.h / 2;
	var newellTopOffset = 40; //отступ верха столба от верха поручня
	var botHandrailFix = 0;
	var treadBalOffset = 10;

	var meterHandrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.handrailsPainting,
	}
	meterHandrailPar = calcHandrailMeterParams(meterHandrailPar);

	//позиция балясин относительно ступеней на лестнице на косоура�х
	var balPar_kos = calcBalPos(par.marshId);

	/*  ПОРУЧНИ  */
	{
		//поручень нижнего поворота

		if (par.botEnd == "площадка" && hasBot) {

			var handrailLength_X1 = botLastRailingPoint.x - botFirstRailingPoint.x;
			var handrailLength = handrailLength_X1;
			var handrailAngle1 = 0;

			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2,
				endAngle: Math.PI / 2,
				fixType: "нет",
				side: "out",
				poleAngle: 0,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId
			}
			var basePoint = newPoint_xy(botFirstRailingPoint, 0, handrailPosY_plt);
			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);

			//подбалясинная доска
			if ((model == "тетива" && params.timberBalBotEnd == "круг") ||
				(model == "косоур" && params.railingModel == "Стекло")) {
				var basePointBot = newPoint_xy(botFirstRailingPoint, 0, 60);
				handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePointBot.x, basePointBot.y)

				handrailParams.partName = "botPole";
				var handrail = drawHandrail_4(handrailParams).mesh;
				handrailParams.partName = null;
				handrail.position.x = basePointBot.x;
				handrail.position.y = basePointBot.y;
				handrail.position.z = posZ - handrailParams.wallOffset;
				section.add(handrail);
			}
		}

		if (par.botEnd == "забег" && hasBot) {
			var handrailAngle1 = angle(botFirstRailingPoint, botLastRailingPoint)

			if (model == "косоур") handrailAngle1 = angle(newPoint_xy(botFirst, 0, -par.h), marshFirst)
			if (model == "косоур" && params.stairModel == 'П-образная с забегом') {
				handrailAngle1 = angle(newPoint_xy(botFirst, 0, -par.h / 2), marshFirst)
				botHandrailFix = 80;//Подогнано
			}
			if (params.railingModel == 'Стекло' && model == 'косоур') botHandrailFix = -40;

			var handrailLength_X1 = botLastRailingPoint.x - botFirstRailingPoint.x;
			var handrailLength = handrailLength_X1 / Math.cos(handrailAngle1);


			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2 - handrailAngle1,
				endAngle: Math.PI / 2 - handrailAngle1,
				fixType: "нет",
				side: "out",
				poleAngle: handrailAngle1,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId
			}
			var basePoint = newPoint_xy(botFirstRailingPoint, 0, handrailPosY + botHandrailFix);
			if (model == "косоур") {
				//рассчитываем длину и позицию первой балясины на забеге
				var turnPar = {
					lenX: handrailLength_X1,
					balStep: par.b / params.timberBalStep,
					isBotTurn: true,
					ang: handrailAngle1,
					balLen: handrailPosY + botHandrailFix,
				}
				turnPar = calcWndBalPos(turnPar);

				var firstBalTopPoint = newPoint_xy(botFirstRailingPoint, turnPar.firstBalPosX, turnPar.firstBalLen);//12.5 отступ  к краю балясины ( 25 диаметр )
				if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
					firstBalTopPoint.y += 100;
				}
				basePoint = itercection(firstBalTopPoint, polar(firstBalTopPoint, handrailAngle1, 100), basePoint, newPoint_xy(basePoint, 0, 100));
			}

			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);

			//нижняя перемычка для стекла
			if (model == "косоур" && params.railingModel == "Стекло") {
				var poleParams = {
					model: params.handrail,
					length: handrailLength_X1,
					dxfArr: dxfPrimitivesArr,
					dxfBasePoint: stringerParams.dxfBasePoint,
					startAngle: Math.PI / 2 - handrailAngle1,
					endAngle: Math.PI / 2 - handrailAngle1,
					fixType: "нет",
					side: "out",
					poleAngle: handrailAngle1,
				}
				handrailParams.partName = "botPole";
				var botPole = drawHandrail_4(handrailParams).mesh;
				handrailParams.partName = null;
				botPole.position.x = basePoint.x;
				botPole.position.y = basePoint.y - 750;
				botPole.position.z = posZ - handrailParams.wallOffset; //костыль чтобы использовать функцию из пристенных поручней
				section.add(botPole);
			}
		}

		//координата верхнего угла поручня для построения столбов
		if (par.botEnd != "нет") {
			var handrailCutLen1 = meterHandrailPar.profY / Math.cos(handrailAngle1);
			var handrailPos1 = newPoint_xy(basePoint, 0, handrailCutLen1);
		}

		if (hasMarsh) {
			//поручень марша
			var startPoint = newPoint_xy(marshFirstRailingPoint, 0, par.h)
			if (par.marshId !== 1) {
				//Фикс для столба != 95
				// startPoint = newPoint_xy(marshFirstRailingPoint, (95 - params.rackSize) / 2, 0);
				startPoint = newPoint_xy(marshFirstRailingPoint, 0, 0);
			}
			//Фикс для столба != 95
			// var handrailLength_X = marshLastRailingPoint.x - marshFirstRailingPoint.x - (95 - params.rackSize) / 2;
			var handrailLength_X = marshLastRailingPoint.x - marshFirstRailingPoint.x - 0.05;
			var handrailAngle = Math.atan(par.h / par.b);
			var handrailLength = handrailLength_X / Math.cos(handrailAngle);
			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2 - handrailAngle,
				endAngle: Math.PI / 2 - handrailAngle,
				fixType: "нет",
				side: "out",
				poleAngle: handrailAngle,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId
			}
			var basePoint = newPoint_xy(marshFirstRailingPoint, 0, handrailPosY);
			if (model == "косоур") {
				var hDelta = (200 - par.h) / 2; //Фикс поручня, подогнано
				var handrailPosMarshCos = 1000 - hDelta;
				var deltaBal = treadBalOffset + 25;

				basePoint = newPoint_xy(zeroPoint, deltaBal, handrailPosMarshCos);
				basePoint = itercection(basePoint, polar(basePoint, handrailAngle, 100), startPoint, newPoint_xy(startPoint, 0, 100));
			}


			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)
			if (!(params.stairModel == 'П-образная с забегом' && par.marshId == 2)) {
				var handrail = drawHandrail_4(handrailParams).mesh;
				handrail.position.x = basePoint.x;
				handrail.position.y = basePoint.y;
				handrail.position.z = posZ - handrailParams.wallOffset; //костыль чтобы использовать функцию из пристенных поручней
				section.add(handrail);
				//нижняя перемычка для стекла
				if (model == "косоур" && params.railingModel == "Стекло") {
					handrailParams.partName = "botPole";
					var botPole = drawHandrail_4(handrailParams).mesh;
					handrailParams.partName = null;
					botPole.position.x = basePoint.x;
					botPole.position.y = basePoint.y - 750;
					botPole.position.z = posZ - handrailParams.wallOffset; //костыль чтобы использовать функцию из пристенных поручней
					section.add(botPole);
				}
			}

			//координата верхнего угла поручня для построения столбов

			var handrailCutLen = meterHandrailPar.profY / Math.cos(handrailAngle);
			var handrailPos = newPoint_xy(basePoint, 0, handrailCutLen);
			var handrailEndPos = polar(handrailPos, handrailAngle, handrailLength)

			//сохраняем позицию верхнего поручня для построения рейки в поручень
			var marshHandrailPos = copyPoint(basePoint);
			par.handrailParams = {
				handrailCutLen: handrailCutLen,
				handrailAngle: handrailAngle,
				handrailPos: handrailPos,
				handrailEndPos: handrailEndPos,
				handrailHeight: handrailPos.y - startPoint.y,
			}
		}
		//поручень верхнего поворота
		if (par.topEnd == "площадка" && hasTop) {

			var handrailLength = topLastRailingPoint.x - topFirstRailingPoint.x;
			var handrailLength_X2 = handrailLength;
			var handrailAngle2 = 0;

			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2,
				endAngle: Math.PI / 2,
				fixType: "нет",
				side: "out",
				poleAngle: 0,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId
			}
			var basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY_plt);
			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);

			//подбалясинная доска (только на тетиве если низ балясин круглый)
			if (model == "тетива" && params.timberBalBotEnd == "круг") {
				var basePoint = newPoint_xy(topFirstRailingPoint, 0, 60);
				handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)
				handrailParams.partName = "botPole";
				var handrail = drawHandrail_4(handrailParams).mesh;
				handrailParams.partName = null;
				handrail.position.x = basePoint.x;
				handrail.position.y = basePoint.y;
				handrail.position.z = posZ - handrailParams.wallOffset;
				section.add(handrail);
			}

			//сохраняем точку поручня для расчета длины столбов
			basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY_plt);
		}

		if (par.topEnd == "забег" && hasTop) {
			//поручень забега
			var handrailAngle2 = angle(topFirstRailingPoint, topLastRailingPoint)
			if (model == "косоур" && params.stairModel == 'П-образная с забегом') handrailAngle2 = angle(topFirstRailingPoint, newPoint_xy(topLastRailingPoint, 0, par.h / 2))
			var handrailLength_X2 = topLastRailingPoint.x - topFirstRailingPoint.x;
			var handrailLength = handrailLength_X2 / Math.cos(handrailAngle2);

			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2 - handrailAngle2,
				endAngle: Math.PI / 2 - handrailAngle2,
				fixType: "нет",
				side: "out",
				poleAngle: handrailAngle2,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId
			}
			var basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY);
			if (model == "косоур") {
				//предварительно рассчитываем базовую точку
				basePoint = newPoint_xy(topFirstRailingPoint, 0, handrailPosY);
				//рассчитываем длину и позицию первой балясины на забеге
				var turnPar = {
					lenX: handrailLength_X2,
					balStep: par.b / params.timberBalStep,
					isBotTurn: false,
					ang: handrailAngle2,
					balLen: handrailPosY,
				}

				turnPar = calcWndBalPos(turnPar);

				var firstBalTopPoint = newPoint_xy(topFirstRailingPoint, turnPar.firstBalPosX, turnPar.firstBalLen);
				if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
					firstBalTopPoint.y += 100;
				}
				basePoint = itercection(firstBalTopPoint, polar(firstBalTopPoint, handrailAngle2, 100), basePoint, newPoint_xy(basePoint, 0, 100));
			}

			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePoint.x, basePoint.y)

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePoint.x;
			handrail.position.y = basePoint.y;
			handrail.position.z = posZ - handrailParams.wallOffset;
			section.add(handrail);
		}

		if (params.stairModel == 'П-образная с площадкой' && par.marshId == 1 && getMarshParams(marshPar.nextMarshId).hasRailing.in && side == 'in') {
			var handrailLength = params.marshDist - 0.05;
			if (params.calcType == 'timber') {
				handrailLength = params.marshDist - 27.5 * 2 - 0.05; // 27.5 насколько столб ограждения выступает за марш, число статичное
				if (handrailLength < 0) handrailLength == 0;
			}
			var handrailParams = {
				model: params.handrail,
				length: handrailLength,
				dxfArr: dxfPrimitivesArr,
				dxfBasePoint: stringerParams.dxfBasePoint,
				startAngle: Math.PI / 2,
				endAngle: Math.PI / 2,
				fixType: "нет",
				side: "in",
				poleAngle: 0,
				startChamfer: "R3",
				endChamfer: "R3",
				marshId: par.marshId
			}
			var basePointP = newPoint_xy(marshLastRailingPoint, params.nose + 30 + rackSize / 2, handrailPosY_plt + par.h - 110);
			handrailParams.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, basePointP.x, basePointP.y)

			var handrail = drawHandrail_4(handrailParams).mesh;
			handrail.position.x = basePointP.x;
			handrail.position.y = basePointP.y;
			if (params.calcType == 'timber') handrail.position.z = 27.5 + handrailLength;
			if (params.calcType == 'timber' && turnFactor == -1) handrail.position.z = -27.5;
			handrail.rotation.y = Math.PI / 2;
			section.add(handrail);
		}

		//координата верхнего угла поручня для построения столбов
		if (par.topEnd != "нет") {
			var handrailCutLen2 = meterHandrailPar.profY / Math.cos(handrailAngle2);
			var handrailPos2 = newPoint_xy(basePoint, 0, handrailCutLen2);
			//верхний конец
			var handrailPos3 = newPoint_x1(handrailPos2, handrailLength_X2, handrailAngle2);
		}
	}

	/* 	СТОЛБЫ  */
	{
		var racks = [];
		var handrailCutLen = meterHandrailPar.profY / Math.cos(handrailAngle);

		if (par.botEnd != "нет" && hasBot) {
			//угловой столб
			if (par.hasFirstRack) {
				var rackPar = copyPoint(botFirst);
				rackPar.len = handrailPos1.y - rackPar.y + newellTopOffset;

				// if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && par.botEnd == 'забег') {
				// 	rackPar.len += par.h;
				// 	rackPar.y -= par.h;
				// }
				if (botFirst.deltaY) {
					rackPar.len += botFirst.deltaY;
					rackPar.y -= botFirst.deltaY;
				}
				racks.push(rackPar);
			}
			//второй столб
			var rackPar = copyPoint(marshFirst);
			rackPar.len = handrailPos.y - rackPar.y + newellTopOffset;
			// if (params.calcType == 'mono' && par.botEnd == 'забег') {
			// 	rackPar.len += par.h;
			// 	rackPar.y -= par.h;
			// }
			if (marshFirst.deltaY) {
				rackPar.len += marshFirst.deltaY;
				rackPar.y -= marshFirst.deltaY;
			}
			racks.push(rackPar);
		}

		//первый столб (только на первом марше)
		if (par.marshId == 1 && hasMarsh) {
			//обычный столб
			if (params.startNewellType != "резной") {
				var rackPar = copyPoint(marshFirst);
				rackPar.len = handrailPos.y - rackPar.y + newellTopOffset;
				if (marshFirst.deltaY) {
					rackPar.len += marshFirst.deltaY;
					rackPar.y -= marshFirst.deltaY;
				}
				racks.push(rackPar);
			}
			//первый резной столб
			if (params.startNewellType == "резной") {
				var zDelta = params.startNewellMooveZ * 1;
				if (side == "out") zDelta *= -1;
				var insetPar = {
					type: "startNewell",
					name: params.startNewellModel,
					obj: section,
					basePoint: {
						x: marshFirst.x,
						y: marshFirst.y,
						z: posZ + zDelta,
						rot: (params.startNewellRot * 1) * 180 / Math.PI,
					}
				}
				// if(params.firstNewellPos == "на первой ступени") {
				// 	insetPar.basePoint.x = params.b1 / 2;
				// 	insetPar.basePoint.y = params.h1;
				// }

				// if(params.firstNewellPos == "на второй ступени") {
				// 	insetPar.basePoint.x = params.b1 * 1.5;
				// 	insetPar.basePoint.y = params.h1 * 2;
				// }

				insetPar.basePoint.x += newellXOffset; // Корректировка для прилегания столба к поручню

				if (par.unit == "balustrade") insetPar.name = params.timberRackModel_bal;
				drawMeshInset(insetPar);
			}
		}

		// if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && side == 'in' && par.marshId > 1){

		/**
		 * Этот столб устанавливается нижним для марша
		 * Подробно:
		 Сложная проверка определяет наличие поворотного столба на моно и лт
		 В случае если марш не первый и есть ограждения на внутренней стороне ИЛИ
		 Если п-образня лестница(Забег/Площадка) и есть внутреннее ограждение 3 марша
		 */
		if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && side == 'in' &&
			((marshPar.hasRailing.in && par.marshId > 1) ||
				((params.stairModel == 'П-образная с забегом' || params.stairModel == 'П-образная с площадкой') && marshPar.hasRailing.in && par.marshId == 3))) {
			var rackPar = copyPoint(marshFirst);
			rackPar.len = handrailPos.y + 20;
			if (marshPar.botTurn == 'забег') {
				rackPar.len = marshPar.h * 2 + handrailPos.y + 20;
			}
			if (params.stairModel == 'П-образная трехмаршевая') {
				if (marshPar.botTurn == 'забег') {
					rackPar.y -= marshPar.h * 2;
				}
			}
			if (params.stairModel !== 'П-образная трехмаршевая') {
				if (marshPar.botTurn == 'забег') {
					rackPar.y -= marshPar.h * 2;
				}
			}
			rackPar.marshId = par.marshId;
			rackPar.y -= par.h;
			rackPar.rackSize = rackSize;
			rackPar.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, rackPar.x - rackSize / 2, rackPar.y);
			rackPar.turnType = marshPar.botTurn;

			if (par.marshId == 2) rackPar.newellId = 1;
			if (par.marshId == 3) rackPar.newellId = 2;
			rackPar.type = 'bot';//Определяет положение столба, верхний для марша или нижний

			var turnNewell = drawTurnNewell(rackPar).mesh;
			turnNewell.position.x = rackPar.x - 0.03;
			turnNewell.position.y = rackPar.y + 0.05;
			turnNewell.position.z = posZ - 0.005;

			section.add(turnNewell);
		}

		/**
		 * Этот столб устанавливается верхним для марша
		 * Подробно:
		 Сложная проверка определяет наличие поворотного столба на моно и лт
		 В случае если на марше имеется ограждение и не имеется на следующем марше ИЛИ
		 Если п-образня лестница(Забег/Площадка) и есть внутреннее ограждение 3 марша
		 И всё это при условии что марш не последний.
		 */
		if ((params.calcType == 'lt-ko' || params.calcType == 'mono') && side == 'in' &&
			((marshPar.hasRailing.in && !getMarshParams(marshPar.nextMarshId).hasRailing.in) ||
				(params.stairModel == 'П-образная с забегом' || params.stairModel == 'П-образная с площадкой') && marshPar.hasRailing.in)
			&& !marshPar.lastMarsh) {
			var rackPar = copyPoint(marshLast);
			rackPar.len = handrailEndPos.y - (marshPar.h * (marshPar.stairAmt + 1)) + 20;
			rackPar.marshId = par.marshId;
			rackPar.y += par.h;
			rackPar.rackSize = rackSize;
			// rackPar.dxfBasePoint = stringerParams.dxfBasePoint;
			rackPar.dxfBasePoint = newPoint_xy(stringerParams.dxfBasePoint, rackPar.x - rackSize / 2, rackPar.y);
			rackPar.turnType = marshPar.topTurn;

			if (par.marshId == 1) rackPar.newellId = 1;
			if (par.marshId == 2) rackPar.newellId = 2;
			rackPar.type = 'top';//Определяет положение столба, верхний для марша или нижний

			var turnNewell = drawTurnNewell(rackPar).mesh;
			turnNewell.position.x = rackPar.x;
			turnNewell.position.y = rackPar.y + 0.05;
			turnNewell.position.z = posZ - 0.05 * turnFactor;

			section.add(turnNewell);
		}

		//последний столб на перекрытии
		if (par.topEnd == "нет" && marshPar.lastMarsh && model == 'косоур') {
			if (params.lastNewellType !== "резной") {
				var rackPar = copyPoint(marshLast);
				rackPar.len = handrailEndPos.y - rackPar.y + newellTopOffset;
				if (marshLast.deltaY) {
					rackPar.len += marshLast.deltaY;
					rackPar.y -= marshLast.deltaY;
				}
				rackPar.y += 1;
				racks.push(rackPar);
			}
			//последний резной столб
			if (params.lastNewellType == "резной") {
				var zDelta = params.lastNewellMooveZ * 1;
				if (side == "out") zDelta *= -1;
				var insetPar = {
					type: "startNewell",
					name: params.startNewellModel,
					obj: section,
					basePoint: {
						x: marshLast.x - newellXOffset,
						y: marshLast.y,
						z: posZ + zDelta,
						rot: Math.PI + (params.startNewellRot * 1) * 180 / Math.PI,
					}
				}

				if (par.unit == "balustrade") insetPar.name = params.timberRackModel_bal;
				drawMeshInset(insetPar);
			}
		}

		if (par.topEnd != "нет" && hasTop) {
			var rackPar = copyPoint(marshLast);
			rackPar.len = handrailPos2.y - rackPar.y + newellTopOffset;
			// if (par.topEnd == 'забег' && model == 'косоур' && (params.calcType !== 'lt-ko' && params.calcType !== 'mono')) {//Смещаем столб вниз чтобы не перелопачивать функцию
			// 	rackPar.len += par.h;
			// 	rackPar.y -= par.h
			// }
			// if (!(params.stairModel == 'П-образная с забегом' && par.marshId == 2)){
			// }
			if (marshLast.deltaY) {
				rackPar.len += marshLast.deltaY;
				rackPar.y -= marshLast.deltaY;
			}
			racks.push(rackPar);
			if (hasTopRack) {
				//последний столб
				var rackPar = copyPoint(topLast);
				rackPar.len = handrailPos3.y - rackPar.y + newellTopOffset;
				if (topLast.deltaY) {
					rackPar.len += topLast.deltaY;
					rackPar.y -= topLast.deltaY;
				}
				racks.push(rackPar);
			}
		}

		var newelParams = {
			dxfBasePoint: stringerParams.dxfBasePoint,
			dxfPrimitivesArr: dxfPrimitivesArr,
			racks: racks,
			rackSize: rackSize,
		}

		var newels = drawNewells(newelParams).mesh;
		newels.position.z = posZ;
		section.add(newels);
	}

	/*  БАЛЯСИНЫ И СТЕКЛО  */
	{
		//задаем функцию отрисовки заполнения
		var drawFilling = drawBanistersArr;
		if (params.railingModel == "Стекло") drawFilling = drawGlassSect;

		if (model == "тетива" || params.railingModel == "Стекло") {
			//нижний поворот
			if (par.botEnd != "нет" && hasBot) {
				var balParams = {
					stringerType: model,
					basePoint: botFirstRailingPoint,
					lenX: handrailLength_X1,
					ang: handrailAngle1,
					balLen: handrailPosY_plt,
					balStep: par.b / params.timberBalStep,
					dxfBasePoint: stringerParams.dxfBasePoint,
				}
				if (par.botEnd == "забег" || params.timberBalBotEnd == "круг") balParams.balLen = handrailPosY;

				if (model == "косоур" && params.railingModel == "Стекло") balParams.balLen = handrailPosY - 150;
				if (params.railingModel == "Стекло" && model == "косоур" && testingMode) balParams.balLen -= 35 * Math.tan(handrailAngle);//Убавляем размер стекла для тестирования, тк оно заходит в паз

				var balArr = drawFilling(balParams);
				if (params.timberBalBotEnd == "круг" && params.railingModel !== "Стекло") balArr.position.y = 100;
				if (params.railingModel == "Стекло") balArr.position.y = 120;
				if (params.railingModel == "Стекло" && model == "косоур") balArr.position.y = 156;

				balArr.position.z = posZ;
				section.add(balArr);
			}

			if (hasMarsh) {
				//марш
				var balParams = {
					stringerType: model,
					basePoint: marshFirstRailingPoint,
					lenX: handrailLength_X,
					ang: handrailAngle,
					balLen: handrailPosY,
					balStep: par.b / params.timberBalStep,
					dxfBasePoint: stringerParams.dxfBasePoint,
				}
				if (params.railingModel == 'Стекло') {
					balParams.balLen -= 0.01;
					// balParams.basePoint.y -= 0.01;
				}

				if (model == "косоур" && params.railingModel == "Стекло") {
					balParams.balLen = handrailPosY - 150;
					if (testingMode) balParams.balLen -= 35 * Math.tan(handrailAngle);//Убавляем размер стекла для тестирования, тк оно заходит в паз
					balParams.basePoint = newPoint_xy(handrailPos, 0, -750);
				}

				var balArr = drawFilling(balParams);
				balArr.position.z = posZ;
				section.add(balArr);
			}
			//верхний поворот

			if (par.topEnd != "нет" && hasTop) {
				var balParams = {
					stringerType: model,
					basePoint: newPoint_xy(topFirstRailingPoint, 0, 0.04),
					lenX: handrailLength_X2,
					ang: handrailAngle2,
					balLen: handrailPosY_plt,
					balStep: par.b / params.timberBalStep,
					dxfBasePoint: stringerParams.dxfBasePoint,
				}
				if (par.topEnd == "забег" || params.timberBalBotEnd == "круг") balParams.balLen = handrailPosY;
				var balArr = drawFilling(balParams);
				if (params.timberBalBotEnd == "круг") {
					balArr.position.y = 100;
				}
				balArr.position.z = posZ;
				section.add(balArr);
			}
		}
		if (model == "косоур" && params.railingModel != "Стекло") {
			//нижний поворот
			if (hasBot) {
				if (par.botEnd == "площадка") {
					var balParams = {
						basePoint: botFirstRailingPoint,
						lenX: handrailLength_X1,
						ang: handrailAngle1,
						balLen: handrailPosY_plt,
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
					}
					if (par.botEnd == "забег") balParams.balLen = handrailPosY;

					var balArr = drawBanistersArr(balParams);
					// if(params.timberBalBotEnd == "круг") {
					// 	balArr.position.y = 100;
					// }
					balArr.position.z = posZ;
					section.add(balArr);
				}
				if (par.botEnd == "забег") {
					var balParams = {
						basePoint: botFirstRailingPoint,
						lenX: handrailLength_X1,
						ang: handrailAngle1,
						balLen: handrailPosY_plt,
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
						isBotTurn: true,
					}
					balParams.basePoint.y += 0.03;
					if (par.botEnd == "забег") balParams.balLen = handrailPosY + botHandrailFix;
					if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
						balParams.balLen += 100;
					}
					// if ((params.calcType == 'lt-ko' || params.calcType == 'mono')) {
					// 	balParams.balLen += par.h;
					// 	balParams.basePoint.y -= par.h;
					// }
					// 	balParams.basePoint.x -= 30;
					// 	balParams.balLen -= 10;
					// }

					var balArr = drawBanistersWndArr(balParams);
					// if(params.timberBalBotEnd == "круг") {
					// 	balArr.position.y = 100;
					// }
					balArr.position.z = posZ;
					section.add(balArr);
				}
			}

			//марш
			if (hasMarsh) {
				var startPos = Math.ceil(marshFirstRailingPoint.y / par.h) || 1;//Рассчитываем номер ступени для начала установки балясин
				if (side == 'in' && par.marshId > 1) startPos = 1;

				var balParams = {
					stringerType: model,
					lenX: handrailLength_X,
					a: par.a,
					b: par.b,
					h: par.h,
					stairAmt: par.stairAmt - startPos + 1,
					ang: handrailAngle,
					balLen: 900 - 0.01,
					dxfBasePoint: stringerParams.dxfBasePoint,
					marshId: par.marshId,
					marshHandrailPos: marshHandrailPos,
				}

				// var balsBasePoint = newPoint_xy(zeroPoint, 10 + par.b * startPos + calcTurnParams(par.marshId).topMarshOffsetX + params.nose, par.h * startPos - params.treadThickness);
				// if (params.riserType == 'есть') balsBasePoint.x += params.riserThickness;
				// par.b * startPos + 40, par.h * startPos - params.treadThickness
				// if (params.calcType == 'mono') balsBasePoint.x += 10;
				// задаем позицию первой балясины
				// var basePoint = newPoint_xy(par.basePoint, balPar_kos.deltaX1, params.treadThickness);

				// var balsBasePoint = newPoint_xy(zeroPoint, -balPar_kos.deltaX1 + par.b * startPos, par.h * startPos - params.treadThickness);
				// if (params.riserType == 'есть') balsBasePoint.x += params.riserThickness;

				var balDist = par.b / params.timberBalStep;
				//25 половина толщины основания балясины, treadOffset - отступ от начала ступени
				var treadOffset = 10;
				if (params.timberBalStep == 1) treadOffset = par.b / 2 - 5;
				if (params.timberBalStep == 1.5) treadOffset = 10;
				var balsBasePoint = newPoint_xy(zeroPoint, -balDist + 25 + treadOffset + par.b * startPos - balPar_kos.deltaX1, par.h * startPos - params.treadThickness);
				balParams.basePoint = balsBasePoint;

				if ((par.topEnd == 'площадка' || par.topEnd == 'нет') && (side == 'out' || marshPar.lastMarsh)) {
					// if (params.timberBalStep == 1) balParams.stairAmt -= 1;
					balParams.extraBanisterTop = true;
				}

				if (params.timberBalStep == 2 && marshPar.botTurn == 'пол') {
					balParams.extraBanisterBot = true;
				}

				if (side == 'out') {
					if (par.topEnd == 'забег' && params.calcType == 'timber' && params.timberBalStep !== 1) {
						if (params.timberBalStep == 1.5) {
							if (par.stairAmt % 2) balParams.stairAmt -= 1;
						} else {
							balParams.stairAmt -= 1;
						}
						balParams.extraBanisterTop = true;
					}

					if (params.stairModel == 'П-образная с забегом' && par.marshId == 1) {
						// balParams.stairAmt -= 1;
						balParams.extraBanisterTop = true;
					}
				}

				if (side == 'in') {
					if (params.timberBalStep == 2 && par.stairAmt == 1) {
						balParams.extraBanisterBot = false;
					}
					if (params.timberBalStep == 2 && marshPar.botTurn == 'забег' && params.calcType == 'lt-ko') {
						balParams.extraBanisterBot = true;
					}
				}

				//В случае если стартовый столб не на первой ступени убавяем кол-во ступеней для марша
				if (params.firstNewellPos == 'на второй ступени' && par.marshId == 1) {
					balParams.extraBanisterBot = true;
				}

				// Учитываем зазор
				balParams.balLen -= 0.1;
				balParams.basePoint.y += 0.05;
				if (testingMode && marshPar.lastMarsh) { //поднимаем балясины, чтобы не было пересечения с балкой
					balParams.balLen -= 0.2;
					balParams.basePoint.y += 0.1;
				}

				//Рассчет размера балясины
				if (params.timberBalStep == 1.5) balParams.balLen += balPar_kos.deltaLen1 / 2;
				if (params.timberBalStep == 1) balParams.balLen -= 15 * Math.tan(handrailAngle);

				var balArr = drawBanistersArr(balParams);
				balArr.position.z = posZ;
				section.add(balArr);
			}

			if (hasTop) {
				//верхний поворот
				if (par.topEnd == "площадка") {
					var balParams = {
						basePoint: topFirstRailingPoint,
						lenX: handrailLength_X2,
						ang: handrailAngle2,
						balLen: handrailPosY_plt,// + params.treadThickness,
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
					}
					// if(params.timberBalBotEnd == "круг") balParams.balLen = handrailPosY;
					var balArr = drawBanistersArr(balParams);
					// if(params.timberBalBotEnd == "круг") {
					// 	balArr.position.y = 100;
					// }
					balArr.position.z = posZ;
					section.add(balArr);
				}
				if (par.topEnd == "забег") {
					var balParams = {
						basePoint: topFirstRailingPoint,
						lenX: handrailLength_X2,
						ang: handrailAngle2,
						balLen: handrailPosY,// + params.treadThickness / Math.cos(handrailAngle2),
						balStep: par.b / params.timberBalStep,
						dxfBasePoint: stringerParams.dxfBasePoint,
						marshId: par.marshId,
						isBotTurn: false,
					}
					if (params.calcType == 'lt-ko' || params.calcType == 'mono') {
						balParams.balLen += 100;
					}
					// if ((params.calcType == 'lt-ko' || params.calcType == 'mono')) {
					// 	balParams.balLen += par.h;
					// 	balParams.basePoint.x -= 10;//Фикс пересечения с забежной ступенью на КО, тк столб стоит не на предудещй ступени
					// 	balParams.balLen -= 10 * Math.tan(handrailAngle2);
					// 	if (params.calcType == 'mono') {
					// 		balParams.basePoint.x -= 20;//Фикс пересечения с забежной ступенью на моно, тк столб стоит не на предудещй ступени
					// 		balParams.balLen -= 20 * Math.tan(handrailAngle2);
					// 		balParams.basePoint.y += 0.03;
					// 	}
					// }

					var balArr = drawBanistersWndArr(balParams);
					balArr.position.z = posZ;
					section.add(balArr);
				}
			}

			if (params.stairModel == 'П-образная с площадкой' && par.marshId == 1 && getMarshParams(marshPar.nextMarshId).hasRailing.in && side == 'in') {
				var balParams = {
					basePoint: { x: 0, y: 0 },
					lenX: params.marshDist,
					ang: 0,
					balLen: handrailPosY_plt - 110,
					balStep: 150,
					dxfBasePoint: stringerParams.dxfBasePoint,
					marshId: par.marshId,
				}

				var balArr = drawBanistersArr(balParams);
				balArr.position.x = basePointP.x - 30 - 20;
				balArr.position.y = basePointP.y - (handrailPosY_plt - 110);
				balArr.rotation.y = Math.PI / 2;
				section.add(balArr);

				// var balParams = {
				// 	stringerType: model,
				// 	basePoint: {x:0,y:0},
				// 	lenX: params.marshDist,
				// 	ang: 0,
				// 	balLen: handrailPosY_plt - 110,
				// 	balStep: 150,
				// 	dxfBasePoint: stringerParams.dxfBasePoint,
				// 	marshId: par.marshId,
				// }
				// var balParams = {
				// 	stringerType: 'тетива',
				// 	basePoint: {x:0,y:0},
				// 	lenX: params.marshDist,
				// 	ang: 0,
				// 	balLen: handrailPosY_plt - 110,
				// 	balStep: 150,
				// 	dxfBasePoint: stringerParams.dxfBasePoint,
				// 	marshId: par.marshId,
				// }

				// var balArr = drawFilling(balParams);
				// balArr.position.x = basePointP.x - 30 - 20;
				// balArr.position.y = basePointP.y - (handrailPosY_plt - 110);
				// balArr.rotation.y = Math.PI / 2;
				// section.add(balArr);
			}
		}
	}
	//сохраняем параметры для расчета длины поворотного столба
	par.handrailTopY = handrailPosY + handrailCutLen + newellTopOffset;

	par.mesh = section;

	return par;
} //end of drawRailingSection_4_new_test

/**
	Функция отрисовывает поворотный столб на mono и lt-ko
	@param rackSize размер столба
	@param marshId ид марша
	@param len высота столба
	@param turnType Тип поворота(необходимо для определения наличия отверстия под каркас)
	@param dxfBasePoint
	
	@return {mesh} par.mesh
*/

function drawTurnNewell(par) {
	par.mesh = new THREE.Object3D();
	var mat = params.materials.newell; // Материал

	var extrudeOptions = {
		amount: par.rackSize,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};


	var marshParams = getMarshParams(par.marshId);

	//Контур столба
	var p1 = {
		x: 0,
		y: 0
	};


	var p2 = newPoint_xy(p1, 0, par.len);
	var p3 = newPoint_xy(p2, par.rackSize - 0.025, 0);
	var p4 = newPoint_xy(p1, par.rackSize - 0.025, 0);
	var points = [p1, p2, p3, p4];

	var sideOverHang = params.sideOverHang;
	if (marshParams.stringerCover == "внутренняя") sideOverHang -= 2;

	if (par.rackSize - sideOverHang > 0 && par.turnType == 'забег' && params.calcType == 'lt-ko') {
		var overHangDelta = par.rackSize - sideOverHang;
		var p3_1 = newPoint_xy(p4, 0, marshParams.h_topWnd - params.treadThickness + 0.03);
		var p3_2 = newPoint_xy(p3_1, -overHangDelta - 0.01, 0);
		var p3_3 = newPoint_xy(p4, -overHangDelta, 0);
		var points = [p1, p2, p3, p3_1, p3_2, p3_3];
	}
	//создаем шейп
	var shapePar = {
		points: points,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
		//markPoints: true, //пометить точки в dxf для отладки
	}
	if (par.rackSize - sideOverHang > 0 && par.turnType == 'забег' && params.calcType == 'lt-ko') {
		shapePar.drawing = { group: 'timberTurnRack', dimPoints: [{ p1: p3_1, p2: p3_2, type: 'hor' }, { p1: p3_2, p2: p3_3, type: 'vert' }] };
	}
	var shape = drawShapeByPoints2(shapePar).shape;
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);

	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var mesh = new THREE.Mesh(geom, mat);
	mesh.position.x -= par.rackSize / 2 + 0.01;
	mesh.position.z -= par.rackSize / 2;
	par.mesh.add(mesh);

	if (params.stairModel == 'П-образная трехмаршевая' && par.newellId == 1) par.mesh.rotation.y = turnFactor * Math.PI / 2;
	if (params.stairModel == 'П-образная трехмаршевая' && par.newellId == 2 && par.type == 'top') par.mesh.rotation.y = 0;// turnFactor * Math.PI / 2;
	if (params.stairModel == 'П-образная трехмаршевая' && par.newellId == 2 && par.type == 'bot') par.mesh.rotation.y = turnFactor * Math.PI / 2;
	if (params.stairModel == 'П-образная с забегом' && par.marshId == 3) par.mesh.rotation.y = turnFactor * Math.PI / 2;
	if (params.stairModel == 'Г-образная с забегом' && par.marshId == 3) par.mesh.rotation.y = turnFactor * Math.PI / 2;

	//верхняя крышка
	var maxSize = par.rackSize;
	if (params.newellTopType != "пирамидка" && params.newellTopType != "плоское") {
		var capSize = maxSize + 15;
		var capThk = 20;
		var platePar = {
			len: capSize,
			width: capSize,
			thk: capThk,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, -(capSize - maxSize) / 2, par.len + 50),
			text: "",
			material: params.materials.newell,
		}
		var cap = drawPlate(platePar).mesh;
		cap.rotation.x = Math.PI / 2;
		cap.position.y = par.len + capThk;
		cap.position.x = -capSize / 2;
		cap.position.z = -capSize / 2;
		par.mesh.add(cap);
	}
	//шар
	if (params.newellTopType == "шар" && !testingMode) {
		var ballPar = {
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, maxSize / 2, par.len + 200),
			material: params.materials.newell,
		}
		var ball = drawLatheBall(ballPar).mesh;
		ball.position.y = par.len + capThk;
		par.mesh.add(ball);
	}

	//сохраняем данные для спецификации
	var partName = "timberTurnNewell";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				paintedArea: 0,
				name: "Поворотный Столб ограждения",
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "amt",
				group: "newells",
			}
		}
		var name = Math.round(maxSize) + "x" + Math.round(maxSize) + "x" + Math.round(par.len);
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["paintedArea"] += maxSize * 4 * par.len / 1000000;
	}
	par.mesh.specId = partName + name;

	return par
}

/*функция отрисовывает деревянный столб*/

function drawTimberNewell_4(par) {

	/*
	возвращает деревянный столб
	par = {
		type:  // "точеные" || "квадратные"
		len: 1200,
		isNotched: true, // true || false
		topType: "шар", // "шар" || "пирамидка" || "крышка"
		botNotch: {
			x: 40,
			y: 200,
			},
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: {x: -500, y:0},
		}
	*/
	/*
	if(par.unit == "balustrade"){
		par.botEnd = params.timberBalBotEnd_bal;
		par.topEnd = params.timberBalTopEnd_bal;
		par.type = params.timberBalType_bal;	
	}
*/

	if (!par.isNotched) par.isNotched = false;
	if (!par.rackSize) par.rackSize = params.rackSize;
	if (!par.rackSize) par.rackSize = 95;
	if (!par.layer) par.layer = "railing";
	if (!par.dxfArr) par.dxfArr = dxfPrimitivesArr;


	var maxSize = par.rackSize;
	var minSize = maxSize * 0.6;
	var topEndLen = 200;
	var latheLen = 600;
	if ($sceneStruct['vl_1']["banisters"]) {
		latheLen = 700;
		topEndLen = 150;
	}
	var botEndLen = par.len - latheLen - topEndLen;

	//В случае если botEndLen меньше 0, устанавливаем на 10(чтобы был зазор резной части от ступени)
	if (botEndLen < 0) {
		par.len += -botEndLen + 10;
		botEndLen = 10;
	}
	var extrudeOptions = {
		amount: par.rackSize,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	par.mesh = new THREE.Object3D();

	//нижний участок
	if (par.type == "квадратные" && !$sceneStruct['vl_1']["banisters"]) botEndLen = par.len

	var shape = new THREE.Shape();
	//левая сторона
	var p0 = { x: 0, y: 0 };
	var p1 = newPoint_xy(p0, 0, botEndLen);
	var p2 = newPoint_xy(p1, maxSize, 0);
	addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);

	//правая сторона
	if (par.isNotched) {
		var p3 = newPoint_xy(p0, maxSize, par.botNotch.y);
		if (testingMode) {
			p3.y += 0.11;//Делаем вырез большы чтобы небыло пересечения с балкой
		}
		var p4 = newPoint_xy(p3, -par.botNotch.x, 0);
		var p5 = newPoint_xy(p0, maxSize - par.botNotch.x, 0);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p4, p5, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p5, p0, par.dxfBasePoint, par.layer);
	}
	if (!par.isNotched) {
		var p3 = newPoint_xy(p0, maxSize, 0);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint, par.layer);
	}

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	var botPart = new THREE.Mesh(geom, params.materials.newell);
	botPart.userData.type = 'timberNewell';
	par.mesh.add(botPart);

	var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, botEndLen);

	if (par.type == "точеные" || $sceneStruct['vl_1']["banisters"]) {
		//точеный участок
		if (!$sceneStruct['vl_1']["banisters"]) {
			dxfBasePoint = newPoint_xy(par.dxfBasePoint, maxSize / 2, botEndLen);
			var points = drawLathePart(latheLen, minSize / 2, maxSize / 2, par.dxfArr, dxfBasePoint);
			var geom = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
			var lathePart = new THREE.Mesh(geom, params.materials.newell);
			lathePart.position.x = maxSize / 2;
			lathePart.position.y = botEndLen;
			lathePart.position.z = maxSize / 2;
			lathePart.castShadow = true;
			lathePart.userData.type = 'timberNewell';
			par.mesh.add(lathePart);
		}
		//точеный участок
		if ($sceneStruct['vl_1']["banisters"]) {
			var insetPar = {
				type: "timberNewell",
				name: params.timberRackModel,
				obj: par.mesh,
				material: params.materials.newell,
				basePoint: {
					x: 0,
					y: botEndLen,
					z: 0,
				}
			}
			if (par.unit == "balustrade") insetPar.name = params.timberRackModel_bal;
			drawMeshInset(insetPar);
		}


		//верхний квадратный участок
		dxfBasePoint = newPoint_xy(dxfBasePoint, -maxSize / 2, latheLen);
		var shape = new THREE.Shape();
		var p0 = { x: 0, y: botEndLen + latheLen };
		var p1 = newPoint_xy(p0, 0, topEndLen);
		var p2 = newPoint_xy(p1, maxSize, 0);
		var p3 = newPoint_xy(p0, maxSize, 0);
		addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint, par.layer);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		var topPart = new THREE.Mesh(geom, params.materials.newell);
		topPart.userData.type = 'timberNewell';
		par.mesh.add(topPart);
	}




	//верхняя крышка
	if (par.topType != "пирамидка" && par.topType != "плоское") {
		var capSize = maxSize + 15;
		var capThk = 20;
		var platePar = {
			len: capSize,
			width: capSize,
			thk: capThk,
			dxfArr: par.dxfArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, -(capSize - maxSize) / 2, topEndLen + 50),
			text: "",
			material: params.materials.newell,
		}
		var cap = drawPlate(platePar).mesh;
		cap.rotation.x = Math.PI / 2;
		cap.position.x = maxSize / 2 - capSize / 2;
		cap.position.y = par.len + capThk;
		cap.position.z = maxSize / 2 - capSize / 2;
		par.mesh.add(cap);
	}
	//шар
	if (par.topType == "шар" && !testingMode) {
		var ballPar = {
			dxfArr: par.dxfArr,
			dxfBasePoint: newPoint_xy(dxfBasePoint, maxSize / 2, topEndLen + 200),
			material: params.materials.newell,
		}
		var ball = drawLatheBall(ballPar).mesh;
		ball.position.y = par.len + capThk;
		ball.position.x = maxSize / 2;
		ball.position.z = maxSize / 2;
		par.mesh.add(ball);
	}

	//сохраняем данные для спецификации
	var partName = "timberNewell";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				paintedArea: 0,
				name: "Столб ограждения",
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "amt",
				group: "newells",
			}
		}
		var name = Math.round(maxSize) + "x" + Math.round(maxSize) + "x" + Math.round(par.len);
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["paintedArea"] += maxSize * 4 * par.len / 1000000;
	}
	par.mesh.specId = partName + name;

	return par;

}

//сохраняем данные для спецификации


/*функция отрисовывает деревянную балясину*/

function drawTimberBanister_4(par) {

	/*возвращает деревянную балясину (мэш)
	banisterLength, banisterSize, botEndType, botEndLength, topEndType, type
	par = {
		len //длина по оси балясины
		size //размер заготовки
		botEnd
		topEnd
		botAng
		topAng
		type точеные || квадратные


		}
	*/

	var dimAng = par.topAng || 0;//Угол для спецификации
	var balName = params.timberBalModel;
	if (par.unit == "balustrade") balName = params.timberBalModel_bal;
	var balPar = getTimberBalParams(balName); //функция в файле /manufacturing/timber/drawRailing.js
	par.botEnd = balPar.botEnd;
	par.topEnd = balPar.topEnd;
	par.type = balPar.type;

	if (!par.size) par.size = 50;
	if (!par.botAng) par.botAng = 0;
	if (!par.topAng) par.topAng = 0;
	if (par.botEnd == "круг") par.botAng = 0;
	if (par.topEnd == "круг") par.topAng = 0;

	if (!par.dxfArr) par.dxfArr = dxfPrimitivesArr;

	if (!par.layer) par.layer = "railing";

	var maxSize = par.size;
	var minSize = 25;
	var topEndLen = 70;
	var latheLen = 600;
	var botEndLen = par.len - latheLen - topEndLen;
	if (par.botEnd == "круг" && par.topEnd == "круг") {
		botEndLen = (par.len - latheLen) / 2;
		topEndLen = botEndLen;
	}

	if (par.type == "квадратные" && !$sceneStruct['vl_1']["banisters"]) botEndLen = par.len;

	var extrudeOptions = {
		amount: maxSize,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	par.mesh = new THREE.Object3D();

	//нижний участок
	var botEndSize = maxSize
	if (par.botEnd == "круг") botEndSize = minSize

	var shape = new THREE.Shape();
	var p0 = { x: 0, y: 0 };
	var p1 = newPoint_x1(p0, -botEndSize / 2, par.botAng);
	if (par.type == "точеные" || $sceneStruct['vl_1']["banisters"]) {
		var p2 = newPoint_xy(p0, -botEndSize / 2, botEndLen);
		var p3 = newPoint_xy(p2, botEndSize, 0);
	}
	if (par.type == "квадратные" && !$sceneStruct['vl_1']["banisters"]) {
		var p2 = newPoint_xy(p0, 0, par.len);
		p2 = newPoint_x1(p2, -botEndSize / 2, par.topAng);
		var p3 = newPoint_x1(p2, botEndSize, par.topAng);
	}
	var p4 = newPoint_x1(p0, botEndSize / 2, par.botAng);

	//сохраняем размер
	var deltaY_bot = p4.y - p1.y

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	if (par.botEnd == "круг")
		geom = new THREE.CylinderGeometry(botEndSize / 2, botEndSize / 2, botEndLen);
	var botPart = new THREE.Mesh(geom, params.materials.banister);
	if (par.botEnd == "круг") botPart.position.y = botEndLen / 2
	if (par.botEnd == "квадрат") botPart.position.z = -botEndSize / 2
	// par.mesh.add(botPart);
	if (!testingMode) par.mesh.add(botPart); //Во время тестирования скрываем
	if (testingMode && par.botEnd == 'квадрат') par.mesh.add(botPart); //Квадраты оставляем

	if (par.type == "точеные" || $sceneStruct['vl_1']["banisters"]) {
		//точеный участок
		if (!$sceneStruct['vl_1']["banisters"]) {
			var dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, p2.y - p0.y);
			var points = drawLathePart(latheLen, minSize / 2, maxSize / 2, par.dxfArr, dxfBasePoint);
			var geom = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
			var lathePart = new THREE.Mesh(geom, params.materials.banister);
			lathePart.position.x = 0;
			lathePart.position.y = p2.y - p0.y;
			lathePart.position.z = 0;
			lathePart.castShadow = true;
			if (!testingMode) par.mesh.add(lathePart); //Во время тестирования скрываем
		}


		if ($sceneStruct['vl_1']["banisters"] && !testingMode) {
			var insetPar = {
				type: "timber",
				name: params.timberBalModel,
				obj: par.mesh,
				basePoint: {
					x: -25,
					y: botEndLen,
					z: -25,
				}
			}
			if (par.unit == "balustrade") insetPar.name = params.timberBalModel_bal;

			drawMeshInset(insetPar);
		}

		//верхний участок

		var topEndSize = maxSize
		if (par.topEnd == "круг") topEndSize = minSize

		var shape = new THREE.Shape();
		var p1 = newPoint_xy(p0, -topEndSize / 2, botEndLen + latheLen);
		var p2 = newPoint_xy(p0, 0, par.len - 10 / Math.cos(par.topAng));
		p2 = newPoint_x1(p2, -topEndSize / 2, par.topAng);
		var p3 = newPoint_x1(p2, topEndSize, par.topAng);
		var p4 = newPoint_xy(p1, topEndSize, 0);


		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint, par.layer);
		addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint, par.layer);

		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		if (par.topEnd == "круг")
			geom = new THREE.CylinderGeometry(topEndSize / 2, topEndSize / 2, topEndLen);
		var topPart = new THREE.Mesh(geom, params.materials.banister);
		if (par.topEnd == "круг") topPart.position.y = botEndLen + latheLen + topEndLen / 2;
		if (par.topEnd == "квадрат") topPart.position.z = -topEndSize / 2
		if (par.topEnd == "квадрат") topPart.position.y -= 0.02;

		if (!testingMode) par.mesh.add(topPart); //Во время тестирования скрываем
		if (testingMode && par.topEnd == 'квадрат') par.mesh.add(topPart); //Квадраты оставляем
	}

	dimAng = dimAng * 180 / Math.PI;

	//сохраняем данные для спецификации
	var partName = "timberBal";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				paintedArea: 0,
				name: "Балясина",
				metalPaint: false,
				timberPaint: true,
				division: "timber",
				workUnitName: "amt",
				group: "timberBal",
			}
		}
		var name = Math.round(maxSize) + "x" + Math.round(maxSize) + "x" + Math.round(par.len) + " " + dimAng.toFixed(1) + " гр.";
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["paintedArea"] += maxSize * 4 * par.len / 1000000;
	}
	par.mesh.specId = partName + name;

	return par;
} // end of drawLatheBanister_4();

function getTimberBalParams(name) {

	name = Number(name);

	var par = {};
	//нижний хвостовик
	par.botEnd = "квадрат"
	if (name <= 4) par.botEnd = "круг"

	//верхний хвостовик
	par.topEnd = "квадрат"
	if (name <= 8) par.topEnd = "круг"

	par.type = "точеные"
	if (name >= 14 && name <= 20) par.type = "квадратные"

	return par;
}

/*функция отрисовывает точеный шар для верха столба */

function drawLatheBall(par) {

	var maxSize = 40;
	var minSize = 20;
	var length = 100;
	var nominalLength = 95;

	/*возвращает массив точек для точеного навершия столба*/
	var points = [];
	var point = new THREE.Vector3(maxSize, 0, 0);
	points.push(point);
	point = new THREE.Vector3(maxSize, 5 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(minSize, 15 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(minSize, 20 / nominalLength * length, 0);
	points.push(point);
	//шар
	point = new THREE.Vector3(26.5, 25 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(34.6, 35 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(38.7, 45 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(40, 55 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(38.7, 65 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(34.6, 75 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(26.5, 85 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(19.4, 90 / nominalLength * length, 0);
	points.push(point);
	point = new THREE.Vector3(0, 95 / nominalLength * length, 0);
	points.push(point);

	//строим контур в dxf
	var trashShape = new THREE.Shape();
	//правая сторона
	for (var i = 0; i < points.length - 1; i++) {
		addLine(trashShape, par.dxfArr, points[i], points[i + 1], par.dxfBasePoint);
	}
	//левая сторона
	for (var i = 0; i < points.length - 1; i++) {
		var p1 = {
			x: -points[i].x,
			y: points[i].y,
			z: 0,
		}
		var p2 = {
			x: -points[i + 1].x,
			y: points[i + 1].y,
			z: 0,
		}
		addLine(trashShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	}

	var geom = new THREE.LatheGeometry(points, 12, 2, 2 * Math.PI);
	var lathePart = new THREE.Mesh(geom, par.material);
	lathePart.castShadow = true;
	par.mesh = lathePart;

	return par;
}//end of drawLatheBall

/*универсальная функция отрисовки прямоугольной пластины*/

function drawPlate_(par) {
	//функция отрисовывает пластину
	/*
	par={
		height
		width
		dxfArr
		dxfBasePoint
		text
		material
		}
	*/
	var p0 = { x: 0, y: 0 }
	var p1 = copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.height)
	var p3 = newPoint_xy(p1, par.width, par.height)
	var p4 = newPoint_xy(p1, par.width, 0)

	var shape = new THREE.Shape();

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	//отверстия
	if (par.roundHoles) {
		for (var i = 0; i < par.roundHoles.length; i++) {
			addRoundHole(shape, par.dxfArr, par.roundHoles[i].center, par.roundHoles[i].rad, par.dxfBasePoint)
		}
	}

	//подпись
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, 20, -150);
	addText(par.text, textHeight, par.dxfArr, textBasePoint);

	var treadExtrudeOptions = {
		amount: par.thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(shape, treadExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	par.mesh = new THREE.Mesh(geom, par.material);

	//площадь
	par.area = par.width * par.height / 1000000;
	//периметр
	par.perim = (par.width + par.height) * 2 / 1000;

	return par;


}//end of drawPlate

/*функция возвращает массив столбов, построенных по координатам и длинне каждого столба*/

function drawNewells(par) {

	par.mesh = new THREE.Object3D();

	for (var i = 0; i < par.racks.length; ++i) {
		var newellParams = {
			type: params.timberNewellType,
			len: par.racks[i].len,
			rackSize: par.rackSize - 0.02,
			topType: params.newellTopType,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: newPoint_xy(par.dxfBasePoint, par.racks[i].x - par.rackSize / 2, par.racks[i].y),
		}

		var rack = drawTimberNewell_4(newellParams).mesh;
		rack.position.x = par.racks[i].x - newellParams.rackSize / 2;
		rack.position.y = par.racks[i].y + 0.01;

		rack.position.z = - newellParams.rackSize / 2 - 0.01;
		par.mesh.add(rack);
	}
	return par;
}

/*функция возвращает группу стекол для любой секции*/

function drawGlassSect(par) {

	var obj3D = new THREE.Object3D();

	var glassDist = 10;
	var glassAmt = Math.ceil(par.lenX / 1000);
	var glassLen = (par.lenX - glassDist) / glassAmt - glassDist;

	var glassPar = {
		p1: par.basePoint, // левая нижняя точка
		p2: newPoint_x1(par.basePoint, par.lenX, par.ang), // правая нижняя точка
		height: par.balLen - 0.05, // высота
		offsetLeft: 0, // отступ справа
		offsetRight: 0, // отступ слева
		offsetY: 0, // отступ вверх
		material: params.materials.glass, // материал
		thickness: 8, // толщина
		dxfPrimitivesArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}
	for (var i = 0; i < glassAmt; i++) {
		basePoint = newPoint_x1(par.basePoint, (glassLen + glassDist) * i + glassDist, par.ang);
		basePoint.y += 0.025;
		glassPar.p1 = basePoint;
		glassPar.p2 = newPoint_x1(basePoint, glassLen, par.ang)
		var glass = draw4AngleGlass_4(glassPar).mesh;
		obj3D.add(glass);
	}

	return obj3D;
} //end of drawGlassSect

function isInsetBanister(balName) {
	return (balName == "bal_1" || balName == "bal_2" || balName == "bal_3" || balName == "bal_4" || balName == "bal_10" || balName == "bal_11") || params.railingModel == 'Деревянные балясины';
}

var wrapperBanister1, wrapperBanister2, oldDrawFunctionWrapper = null;
function drawBanisterFunctionWrapper(par) {
	if (!isInsetBanister(par.type) && par.type == params.banister1 && !wrapperBanister1) {
		wrapperBanister1 = oldDrawFunctionWrapper(par).mesh;
		return { mesh: wrapperBanister1 }
	}
	if (!isInsetBanister(par.type) && par.type == params.banister2 && !wrapperBanister2) {
		wrapperBanister2 = oldDrawFunctionWrapper(par).mesh;
		return { mesh: wrapperBanister2 }
	}
	if (!isInsetBanister(par.type)) {
		var banister = null;
		if (par.type == params.banister1) banister = wrapperBanister1.clone();
		if (par.type == params.banister2) banister = wrapperBanister2.clone();
		return { mesh: banister }
	} else {
		return oldDrawFunctionWrapper(par)
	}
}

// функция возвращает группу деревянных балясин для всех секций, кроме забегов на косоурах

function drawBanistersArr(par) {

	var balSize = 50;
	var obj3D = new THREE.Object3D();
	var drawBanisterFunction = drawTimberBanister_4;

	var railingModel = params.railingModel;
	var timberBalBotEnd = params.timberBalBotEnd;
	var timberBalTopEnd = params.timberBalTopEnd;

	if (par.unit == "balustrade") {
		railingModel = params.railingModel_bal;
		timberBalBotEnd = params.timberBalBotEnd_bal;
		timberBalTopEnd = params.timberBalTopEnd_bal;
	}

	if (railingModel == "Дерево с ковкой") {
		drawBanisterFunction = drawForgedBanister_4;
		if ($sceneStruct['vl_1']["banisters"]) drawBanisterFunction = drawForgedBanister_5;
	}

	if ((!isInsetBanister(params.banister1) || !isInsetBanister(params.banister2)) && params.calcType == 'railing') {
		wrapperBanister1 = null;
		wrapperBanister2 = null;
		oldDrawFunctionWrapper = null;

		oldDrawFunctionWrapper = drawBanisterFunction;
		drawBanisterFunction = drawBanisterFunctionWrapper;
	}

	if (par.stringerType != "косоур") {
		var balAmt = Math.round((par.lenX + balSize) / par.balStep) - 1;
		balDist = (par.lenX + balSize) / (balAmt + 1);
		var pos = newPoint_x1(par.basePoint, balDist - balSize / 2, par.ang);

		for (i = 0; i < balAmt; i++) {
			var balType = getBalType(i, par.unit); //функция в файле manufacturing/general/drawRailing.js
			var basePoint = newPoint_x1(pos, balDist * i, par.ang);

			var balPar = {
				len: par.balLen,
				botAng: par.ang,
				topAng: par.ang,
				type: balType,
				dxfBasePoint: par.dxfBasePoint,
				material: params.materials.metal2,
				unit: par.unit,
			}
			// if(par.unit == "balustrade") balPar.len += 10;//Поправляем высоту для баллюстрады
			balPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

			if (par.stringerType == "тетива" && timberBalBotEnd == "квадрат") balPar.len -= (20 + 0.025) / Math.cos(balPar.botAng);
			// if(par.unit !== "balustrade" && timberBalTopEnd == "квадрат" && par.stringerType !== "тетива") balPar.len -= 10.01;

			var banister = drawBanisterFunction(balPar).mesh;

			banister.position.x = basePoint.x;
			banister.position.y = basePoint.y;
			if (par.stringerType == "тетива" && timberBalBotEnd == "квадрат") banister.position.y += 10 / Math.cos(balPar.botAng) + 0.02;
			banister.position.z = 0;
			if (!(testingMode && railingModel == "Дерево с ковкой")) {
				obj3D.add(banister);
			}
		}
	}

	if (par.stringerType == "косоур") {

		balDist = par.b / params.timberBalStep;
		//позиция балясин на лестнице на косоурах
		var balPar_kos = calcBalPos(par.marshId);

		//задаем позицию первой балясины
		var basePoint = newPoint_xy(par.basePoint, balPar_kos.deltaX1, params.treadThickness);

		//цикл отрисовки балясин по всем ступеням марша
		var balId = 0; //номер балясины в массиве
		for (i = 0; i < par.stairAmt; i++) {

			var balPar = {
				len: par.balLen,
				botAng: 0,
				topAng: par.ang,
				type: getBalType(balId, par.unit), //функция в файле manufacturing/general/drawRailing.js,
				dxfBasePoint: par.dxfBasePoint,
				material: params.materials.metal2,
			}

			//первая балясина на ступени
			if (i != 0) basePoint = newPoint_xy(basePoint, balDist, par.h);
			if (params.timberBalStep == 2) {
				if (i == 0) balPar.len -= 0; //начинаем со второй балясины
				if (i != 0) balPar.len -= balPar_kos.deltaLen2;
			}
			if (params.timberBalStep == 1.5) {
				if (i % 2 == 0) balPar.len -= balPar_kos.deltaLen1;
				if (i % 2 != 0) balPar.len -= balPar_kos.deltaLen2;
			}


			balPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

			var banister = drawBanisterFunction(balPar).mesh;
			banister.position.x = basePoint.x;
			banister.position.y = basePoint.y;
			banister.position.z = 0;
			if (!(testingMode && params.railingModel == "Дерево с ковкой")) {
				obj3D.add(banister);
			}
			balId += 1;

			//вторая балясина на ступени
			var isSecondBal = false;
			if (params.timberBalStep == 1.5 && i % 2) isSecondBal = true; //2 балясины на нечетных ступенях
			if (params.timberBalStep == 2) isSecondBal = true; //2 балясины на нечетных ступенях
			// if(i == 0 && params.calcType == "timber") isSecondBal = false; //на первой ступени всегда одна ступень
			if (i == 0) isSecondBal = false; //на первой ступени всегда одна ступень

			if (isSecondBal) {
				balPar.type = getBalType(balId, par.unit);

				balPar.len = par.balLen;
				basePoint = newPoint_xy(basePoint, balDist, 0);
				balPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y);
				var banister = drawBanisterFunction(balPar).mesh;
				banister.position.x = basePoint.x;
				banister.position.y = basePoint.y;
				banister.position.z = 0;
				if (!(testingMode && params.railingModel == "Дерево с ковкой")) {
					obj3D.add(banister);
				}
				balId += 1;
			}

		}

		//дополнительная балясина если сверху площадка
		var isExtraBanister = false;
		if (par.extraBanisterTop) {
			if (params.timberBalStep == 2) isExtraBanister = true;
			if (params.timberBalStep == 1.5 && par.stairAmt % 2 == 1) isExtraBanister = true;
		}
		if (isExtraBanister) {
			var balPar = {
				len: par.balLen,
				botAng: 0,
				topAng: par.ang,
				type: getBalType(balId, par.unit),
				dxfBasePoint: par.dxfBasePoint,
				material: params.materials.metal2,
			}

			if (i != 0) basePoint = newPoint_xy(basePoint, balDist, par.h);
			if (params.timberBalStep == 2) {
				balPar.len -= balPar_kos.deltaLen2;
			}
			if (params.timberBalStep == 1.5) {
				balPar.len -= balPar_kos.deltaLen2;
			}

			balPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

			var banister = drawBanisterFunction(balPar).mesh;
			banister.position.x = basePoint.x;
			banister.position.y = basePoint.y;
			banister.position.z = 0;
			if (!(testingMode && params.railingModel == "Дерево с ковкой")) {
				obj3D.add(banister);
			}
			balId += 1;
		}

		//дополнительная балясина если снизу площадка
		if (par.extraBanisterBot && params.timberBalStep == 2) {
			balId = -1;
			var balPar = {
				len: par.balLen - balPar_kos.deltaLen2,
				botAng: 0,
				topAng: par.ang,
				type: getBalType(balId, par.unit),
				dxfBasePoint: par.dxfBasePoint,
				material: params.materials.metal2,
			}

			basePoint = newPoint_xy(par.basePoint, balPar_kos.deltaX2, params.treadThickness);
			balPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

			var banister = drawBanisterFunction(balPar).mesh;
			banister.position.x = basePoint.x;
			banister.position.y = basePoint.y;
			banister.position.z = 0;
			if (!(testingMode && params.railingModel == "Дерево с ковкой")) {
				obj3D.add(banister);
			}
		}
	}

	//подбалясинная доска снизу
	if (par.stringerType == "тетива" && params.timberBalBotEnd == "квадрат") {

		var polePar = {
			type: "rect",
			poleProfileY: 10,
			poleProfileZ: 60,
			dxfBasePoint: par.dxfBasePoint,
			length: par.lenX / Math.cos(par.ang),
			poleAngle: par.ang,
			angStart: par.ang,
			angEnd: par.ang,
			material: params.materials.timber,
			dxfArr: dxfPrimitivesArr,
			partName: "botPole",
			layer: "railing",
		}
		var basePoint = par.basePoint;
		polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

		var pole = drawPole3D_4(polePar).mesh;
		pole.position.x = basePoint.x;
		pole.position.y = basePoint.y + 0.01;
		pole.position.z = -polePar.poleProfileZ / 2;
		obj3D.add(pole);
	}

	//рейка в поручень
	if (timberBalTopEnd == "квадрат") {

		var polePar = {
			type: "rect",
			poleProfileY: 10 - 0.03,
			poleProfileZ: 50,
			dxfBasePoint: par.dxfBasePoint,
			length: par.lenX / Math.cos(par.ang),
			poleAngle: par.ang,
			angStart: par.ang,
			angEnd: par.ang,
			material: params.materials.handrail,
			dxfArr: dxfPrimitivesArr,
			partName: "topPole",
			layer: "railing",
		}
		if (testingMode) polePar.poleProfileY = 1;


		var basePoint = newPoint_xy(par.basePoint, 0, par.balLen);
		if (par.stringerType == "косоур") basePoint = copyPoint(par.marshHandrailPos);
		polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y - 10 / Math.cos(par.ang))

		var pole = drawPole3D_4(polePar).mesh;
		pole.position.x = basePoint.x;
		pole.position.y = basePoint.y - polePar.poleProfileY / Math.cos(polePar.poleAngle) - 0.01;// - 0.01;
		pole.position.z = -polePar.poleProfileZ / 2;
		obj3D.add(pole);
	}

	return obj3D;
}

// функция возвращает группу деревянных балясин забегов на косоурах

function drawBanistersWndArr(par) {

	var obj3D = new THREE.Object3D();
	var drawBanisterFunction = drawTimberBanister_4;
	var balType1 = null;
	var balType2 = null;
	if (params.railingModel == "Дерево с ковкой") {
		drawBanisterFunction = drawForgedBanister_4;
		if ($sceneStruct['vl_1']["banisters"]) drawBanisterFunction = drawForgedBanister_5;

		balType1 = params.banister1;
		balType2 = params.banister2;
	}
	//рассчитываем параметры балясин на забеге
	wndPar = calcWndBalPos(par);

	//позиция первой балясины
	var pos = newPoint_xy(par.basePoint, wndPar.firstBalPosX, 0);

	var balPar = {
		len: wndPar.firstBalLen,
		botAng: 0,
		topAng: par.ang,
		type: balType1,
		dxfBasePoint: par.dxfBasePoint,
		material: params.materials.metal2,
	}

	//цикл построения балясин
	for (i = 0; i < wndPar.balAmt; i++) {
		balPar.balType = balType1;
		if (i % 2) balPar.balType = balType2;

		var basePoint = newPoint_xy(pos, wndPar.balDist * i, 0);
		balPar.len = wndPar.firstBalLen + wndPar.deltaLen * i;

		//высота подъема ступени на забеге
		var h_wnd = getMarshParams(par.marshId).h_topWnd;
		if (par.isBotTurn) h_wnd = getMarshParams(par.marshId).h_botWnd;

		//балясины второй ступени
		if (i > wndPar.longestBalIndex) {
			balPar.len -= h_wnd;
			basePoint.y += h_wnd;
		}

		balPar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

		var banister = drawBanisterFunction(balPar).mesh;
		banister.position.x = basePoint.x;
		banister.position.y = basePoint.y;
		banister.position.z = 0;
		if (!(testingMode && params.railingModel == "Дерево с ковкой")) {
			obj3D.add(banister);
		}
	}

	//рейка в поручень
	if (params.timberBalTopEnd == "квадрат") {

		var polePar = {
			type: "rect",
			poleProfileY: 10 - 0.03,
			poleProfileZ: 50,
			dxfBasePoint: par.dxfBasePoint,
			length: par.lenX / Math.cos(par.ang),
			poleAngle: par.ang,
			angStart: par.ang,
			angEnd: par.ang,
			material: params.materials.handrail,
			dxfArr: dxfPrimitivesArr,
			partName: "topPole",
			layer: "railing",
		}

		var firstBalTopPoint = newPoint_xy(par.basePoint, wndPar.firstBalPosX, wndPar.firstBalLen - 10 / Math.cos(par.ang));
		basePoint = itercection(firstBalTopPoint, polar(firstBalTopPoint, par.ang, 100), par.basePoint, newPoint_xy(par.basePoint, 0, 100));

		polePar.dxfBasePoint = newPoint_xy(par.dxfBasePoint, basePoint.x, basePoint.y)

		var pole = drawPole3D_4(polePar).mesh;
		pole.position.x = basePoint.x;
		pole.position.y = basePoint.y;
		pole.position.z = -polePar.poleProfileZ / 2;
		obj3D.add(pole);
	}



	return obj3D;

} //end of drawBanistersWndArr

//функция рассчитывает параметры балясин на косоурах на марше

function calcBalPos(marshId) {

	var par = getMarshParams(marshId);

	balDist = par.b / params.timberBalStep;
	var firstBalOffset = 10 + 50 / 2; //отступ оси первой балясины от переднего ребра ступени


	var deltaX1 = 0; //отступ перой балясины от внутреннего угла косоура по X
	var deltaX2 = 0;
	var deltaX3 = 0;
	var riserOffset = 0;
	if (params.riserType == "есть") riserOffset = params.riserThickness;

	if (params.timberBalStep == 1) {
		deltaX1 = -par.b / 2 - riserOffset;
		par.minPos = deltaX1;
		par.deltaLen1 = 0;
	}
	if (params.timberBalStep == 1.5) {
		deltaX2 = -par.a + firstBalOffset - riserOffset;
		deltaX3 = deltaX2 + balDist;
		deltaX1 = deltaX3 + balDist - par.b;
		par.minPos = deltaX3;
		//уменьшение длины балясины относительно номинальной длины
		par.deltaLen1 = par.h - par.h / params.timberBalStep;
		par.deltaLen2 = par.h / params.timberBalStep;
		par.deltaLen3 = 0;
	}
	if (params.timberBalStep == 2) {
		deltaX2 = -par.a + firstBalOffset - riserOffset;
		deltaX1 = deltaX2 + balDist;
		par.minPos = deltaX1;
		//уменьшение длины балясины относительно номинальной длины
		par.deltaLen1 = 0;
		par.deltaLen2 = par.h / params.timberBalStep;
	}

	par.deltaX1 = deltaX1;
	par.deltaX2 = deltaX2;
	par.deltaX3 = deltaX3;



	return par;

}

function calcWndBalPos(par) {
	/*функция рассчитывает параметры балясин на косоурах на забеге
	параметры:
	lenX
	balStep
	isBotTurn
	ang
	balLen
	*/
	var balSize = 50;
	var balAmt = Math.round((par.lenX + balSize) / par.balStep) - 1;
	if (balAmt > 3 && balAmt % 2 == 0) balAmt -= 1; //кол-во балясин должно быть нечетным
	if (balAmt < 2) balAmt = 2;
	var balDist = (par.lenX + balSize) / (balAmt + 1);

	//определяем номер самой длинной балясины
	var longestBalIndex = 0;
	if (balAmt > 2) {
		longestBalIndex = Math.floor(balAmt / 2); //для верхнего поворота самая длинная средняя
		if (par.isBotTurn) longestBalIndex -= 1; //для нижнего поворота самая длинная перед средней
	}

	//разница длины между двумя соседними балясинами на одной ступени
	var deltaLen = balDist * Math.tan(par.ang);

	//рассчитываем длину и позицию самой первой балясины снизу
	var firstBalLen = par.balLen - longestBalIndex * deltaLen;
	var firstBalPosX = balDist - balSize / 2;

	//возвращаемые параметры
	var result = {
		firstBalLen: firstBalLen,
		longestBalIndex: longestBalIndex,
		balAmt: balAmt,
		balDist: balDist,
		balSize: balSize,
		firstBalPosX: firstBalPosX,
		deltaLen: deltaLen,
	}


	return result;

}//end of calcWndBalPos
