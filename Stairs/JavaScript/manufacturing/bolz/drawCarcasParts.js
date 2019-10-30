/**функция отрисовки больцев
*/
function drawBolzs(par) {

	par.mesh = new THREE.Object3D();

	//параметры марша
	var marshPar = getMarshParams(par.marshId);

	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;

	var bolzProfile = 40;

	var offsetX = (params.nose - bolzProfile) / 2;
	var offsetZ = 10;

	var bolzPar = {
		marshId: par.marshId,
		dxfBasePoint: par.dxfBasePoint,
		h: par.h,
		bolzProfile: bolzProfile,
	}

	var countBolz = par.stairAmt;
	if (marshPar.topTurn !== 'пол') countBolz += 1;

	for (var i = 0; i < countBolz; i++) {

		var bolz = drawBolz(bolzPar).mesh;
		bolz.position.y = par.h * i;
		bolz.position.x = par.b * i + offsetX;
		bolz.position.z = offsetZ * turnFactor;
		if (params.stairModel !== "Прямая") bolz.position.z = -offsetZ * turnFactor;
		if (params.stairModel == "Прямая" && turnFactor == -1) bolz.position.z -= bolzProfile;
		if (params.stairModel !== "Прямая" && turnFactor == 1) bolz.position.z -= bolzProfile;
		if (par.isWndP) {
			bolz.position.x = -offsetX - 15 + params.marshDist;
		}
		par.mesh.add(bolz);
	}

	if (marshPar.botTurn == 'забег') {
		var bolz = drawBolz(bolzPar).mesh;
		bolz.position.y = - marshPar.h;
		bolz.position.x = offsetX;
		bolz.position.z = -offsetZ * turnFactor;
		if (turnFactor == 1) bolz.position.z -= bolzProfile;
		if (par.isWndP) {
			bolz.position.x = -offsetX - 15;
		}
		par.mesh.add(bolz);
	}
	if (marshPar.topTurn == 'забег') {
		var bolz = drawBolz(bolzPar).mesh;
		bolz.position.y = par.h * marshPar.stairAmt + marshPar.h_topWnd;
		bolz.position.x = par.b * marshPar.stairAmt + offsetX;
		bolz.position.z = -offsetZ * turnFactor;
		if (turnFactor == 1) bolz.position.z -= bolzProfile;
		if (par.isWndP) {
			bolz.position.x = -offsetX - 15 + params.marshDist;
		}
		par.mesh.add(bolz);
	}

	return par;
}//end of drawBolzs

/**функция отрисовки больца
*/
function drawBolz(par) {

	par.mesh = new THREE.Object3D();

	var bolzLength = par.h - params.treadThickness;


	var p0 = { x: 0, y: 0 }
	var p1 = copyPoint(p0)
	var p2 = newPoint_xy(p1, 0, bolzLength);
	var p3 = newPoint_xy(p2, par.bolzProfile, 0)
	var p4 = newPoint_xy(p1, par.bolzProfile, 0)

	var pointsShape = [p1, p2, p3, p4];

	//создаем шейп
	var shapePar = {
		points: pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}
	//параметры для рабочего чертежа
	if (!par.drawing) {
		shapePar.drawing = {
			name: "Больц",
			group: "Bolzs",
		}
	}
	shape = drawShapeByPoints2(shapePar).shape;

	//подпись под фигурой
	var text = 'Больц';
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, -70, -100)
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

	//тело
	var extrudeOptions = {
		amount: par.bolzProfile,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bolz = new THREE.Mesh(geom, params.materials.metal);
	par.mesh.add(bolz);


	//сохраняем данные для спецификации
	var partName = "bolz";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				sumLength: 0,
				name: "Больц",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //единица измерения
				group: "Каркас",
			}
		}
		var name = 'h=' + bolzLength + 'мм';
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumLength"] += bolzLength;
	}
	par.mesh.specId = partName + name;

	par.dxfBasePoint.x += par.bolzProfile + 100;

	return par;
}//end of drawBolz