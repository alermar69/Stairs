function drawWndTreadFlan(par) {

	if (turnFactor > 0 && par.frameId != 3) {
		var tempPoint = copyPoint(par.line.p1);
		par.line.p1 = copyPoint(par.line.p2);
		par.line.p2 = copyPoint(tempPoint);
	}

	var flanHeight = 40;
	if (par.flanHeight) flanHeight = par.flanHeight;

	var holeOffset = 20;
	var thkTop = 4;

	var flanPar = {
		height: flanHeight,
		width: par.line.len,
		thk: 4,
		roundHoleCenters: [],
		dxfBasePoint: par.dxfBasePoint,
	}
	par.flanWidth = flanPar.width;
	par.flanThickness = flanPar.thk;
	par.flanHeight = flanHeight;

	//Отверстия под шурупы крепления подступенка
	if (par.type == "riser_holes" && params.riserType == "есть") {
		var center1 = {
			x: flanPar.width / 2,
			y: flanPar.height / 2,
		};
		var center2 = newPoint_xy(center1, flanPar.width / 2 - 50, 0);
		var center3 = newPoint_xy(center1, -(flanPar.width / 2 - 50), 0);
		flanPar.roundHoleCenters.push(center1, center2, center3);
		flanPar.holeRad = 4;
		flanPar.noBolts = true;
	}

	// Отверстие для крепления к каркасу
	if (par.type == "1_hole") {
		var center1 = {
			x: flanPar.width / 2,
			y: flanPar.height / 2,
		}
		flanPar.roundHoleCenters.push(center1);
	}
	if (par.type == "2_holes") {
		var center1 = {
			x: holeOffset,
			y: flanPar.height / 2,
		}
		var center2 = newPoint_xy(center1, flanPar.width - holeOffset * 2, 0)
		flanPar.roundHoleCenters.push(center1, center2);
	}

	flanPar.mirrowBolts = true;

	//параметры для рабочего чертежа
	if (!par.drawing) {
		flanPar.drawing = {
			name: "Фланец",
			group: "Flans",
		}
	}

	var flan = drawRectFlan2(flanPar).mesh;
	flan.rotation.y = - Math.PI / 2 + calcAngleX1(par.line.p1, par.line.p2);
	flan.position.x = par.line.p1.y;
	flan.position.z = par.line.p1.x;
	flan.position.y = -flanPar.height + thkTop;

	par.roundHoleCenters = flanPar.roundHoleCenters;
	par.mesh = flan;


	//сохраняем данные для спецификации
	var frameName = "frame" + par.frameId + "Flans";
	staircasePartsParams[frameName].push(Math.round(par.flanWidth))


	return par;

}//end of drawWndTreadFlan;