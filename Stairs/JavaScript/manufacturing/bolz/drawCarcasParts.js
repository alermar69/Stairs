/**������� ��������� �������. ������� ����� ��� ����� �������� ���������
*/
function drawBolzs(par) {

	par.mesh = new THREE.Object3D();

	//��������� �����
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
	if (marshPar.topTurn !== '���') countBolz += 1;

	for (var i = 0; i < countBolz; i++) {

		var bolz = drawBolz(bolzPar).mesh;
		bolz.position.y = par.h * i;
		bolz.position.x = par.b * i + offsetX;
		bolz.position.z = offsetZ * turnFactor;
		if (params.stairModel !== "������") bolz.position.z = -offsetZ * turnFactor;
		if (params.stairModel == "������" && turnFactor == -1) bolz.position.z -= bolzProfile;
		if (params.stairModel !== "������" && turnFactor == 1) bolz.position.z -= bolzProfile;

		par.mesh.add(bolz);
	}

	if (marshPar.botTurn == '�����') {
		var bolz = drawBolz(bolzPar).mesh;
		bolz.position.y = - marshPar.h;
		bolz.position.x = offsetX;
		bolz.position.z = -offsetZ * turnFactor;
		if (turnFactor == 1) bolz.position.z -= bolzProfile;
		par.mesh.add(bolz);
	}
	if (marshPar.topTurn == '�����') {
		var bolz = drawBolz(bolzPar).mesh;
		bolz.position.y = par.h * marshPar.stairAmt + marshPar.h_topWnd;
		bolz.position.x = par.b * marshPar.stairAmt + offsetX + 44;
		bolz.position.z = -offsetZ * turnFactor;
		if (turnFactor == 1) bolz.position.z -= bolzProfile;
		par.mesh.add(bolz);
	}

	return par;
}//end of drawBolzs

/**������� ��������� �������. ������� ����� ��� ����� �������� ���������
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

	//������� ����
	var shapePar = {
		points: pointsShape,
		dxfArr: dxfPrimitivesArr,
		dxfBasePoint: par.dxfBasePoint,
	}
	//��������� ��� �������� �������
	if (!par.drawing) {
		shapePar.drawing = {
			name: "�����",
			group: "Bolzs",
		}
	}
	shape = drawShapeByPoints2(shapePar).shape;

	//������� ��� �������
	var text = '�����';
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, -70, -100)
	addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

	//����
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


	//��������� ������ ��� ������������
	var partName = "bolz";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				sumLength: 0,
				name: "�����",
				metalPaint: true,
				timberPaint: false,
				division: "metal",
				workUnitName: "amt", //������� ���������
				group: "������",
			}
		}
		var name = 'h=' + bolzLength + '��';
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
		specObj[partName]["sumLength"] += bolzLength;
	}
	par.mesh.specId = partName + name;

	par.dxfBasePoint.x += par.bolzProfile + 100;

	return par;
}//end of drawBolz