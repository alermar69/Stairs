

function drawStringerKo(stringerParams, turnStepsParams) {
    stringerParams.stringerShape = new THREE.Shape();
    stringerParams.stringerShapeNo = new THREE.Shape();
    stringerParams.elmIns = {};
    var key = stringerParams.key

    // ��� ��������
    stringerParams.frameWidth = stringerParams.b;

    
    //stringerParams.M = 900.0;
    //botEndLength  = platformLength - 45.0    = stringerParams.M
    //topEndLength
    //stringerParams.platformLength = 1200;  
    //stringerParams.treadThickness = 40.0;
//stringerParams.stringerSideOffset = 75.0;


    // ����� ������� �������, �����, ���������
    stringerParams.elmIns[key] = {};
    stringerParams.elmIns[key].angles = [];
    stringerParams.elmIns[key].anglesop = [];
    stringerParams.elmIns[key].frames = [];
    stringerParams.elmIns[key].angleB = [];
    stringerParams.elmIns[key].angleU = [];
    stringerParams.elmIns[key].briges = [];

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;
    if (params.botFloorType === "��������") {
		  stringerOffset_y = stringerParams.botFloorsDist;
		}
    stringerOffset_x = stringerParams.a - stringerParams.b;
    //stringerOffset_y = stringerParams.treadThickness;

    // ���������
    stringerParams.holeRad = 6.5;            // ������ (��������) ��������� � �������
    stringerParams.stepHoleX1 = 45;          // ���������� � ������� ��������� ��������� ������ ������� ������������ ���� �������
    stringerParams.holeDistU2_230 = 180;     // ���������� ����� ����������� ��� ������ �2-230
    stringerParams.holeDistU2_200 = 150;     // ���������� ����� ����������� ��� ������ �2-200
    stringerParams.holeDistU2_160 = 110;     // ���������� ����� ����������� ��� ������ �2-160
    stringerParams.stepHoleY = -65;          // ���������� Y ��������� ��������� ������ �������
    stringerParams.stringerWidth = 150;      // ������ ������
    stringerParams.rad1 = 10.0;              // ������ ���������� ������� �����
    stringerParams.rad2 = 5.0;               // ������ ���������� ���������� �����
    stringerParams.stairAngle1 = Math.atan(stringerParams.h / stringerParams.b);   // ��������� ���� ������� ��������

    if (stringerParams.stairAmt > 10) {      // ���� ����� 10 �������� ������� 200��
      stringerParams.stringerWidth = 200.0;
    }
	
	if (stringerParams.stringerType == "�������") {
		stringerParams.stringerWidth = 180;
		if (stringerParams.stairAmt > 10) stringerParams.stringerWidth = 200.0;
  }
	if (stringerParams.stringerType == "������") stringerParams.stringerWidth = 320;

  stringerParams.railingModel = "���";
  stringerParams.railingSide_1 = "���";
  stringerParams.railingPresence = "����";

  if (stringerParams.railingSide_1 == "���") {
    stringerParams.railingModel = "���";
  }
  if (stringerParams.railingSide_1 != "���") stringerParams.railingPresence = "����";

  setStairAngles(stringerParams);

  // ������
  stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };

  stringerParams.stepHoleX2 = stringerParams.b - 45.0;
  stringerParams.stepHoleY = -20.0;      // ���������� Y ��������� ��������� �����

	
	/*��� �����*/
	
	if(stringerParams.botEnd == "floor") drawBotStepKo_floor(stringerParams);
	if(stringerParams.botEnd == "platformG") drawBotStepKo_pltG(stringerParams);
	if(stringerParams.botEnd == "platformP" && key == "in") drawBotStepKo_pltPIn(stringerParams);
	if(stringerParams.botEnd == "platformP" && key == "out") drawBotStepKo_pltPOut(stringerParams);
	if(stringerParams.botEnd == "winder" && key == "in") drawBotStepKo_wndIn(stringerParams, turnStepsParams);
	if(stringerParams.botEnd == "winder" && key == "out") drawBotStepKo_wndOut(stringerParams, turnStepsParams);
	


	/*������� �������*/
	
  ltko_set_railing(stringerParams.stairAmt, stringerParams);
  drawMiddleStepsKo(stringerParams.stairAmt, stringerParams);

	/*���� �����*/
	
	if (stringerParams.topEnd == "floor") drawTopStepKo_floor(stringerParams);
	if (stringerParams.topEnd == "platformG") drawTopStepKo_pltG(stringerParams);
	if (stringerParams.topEnd == "platformP" && key == "in") drawTopStepKo_pltPIn(stringerParams);
	if (stringerParams.topEnd == "platformP" && key == "out") drawTopStepKo_pltPOut(stringerParams);
	if (stringerParams.topEnd == "winder" && key == "in") drawTopStepKo_wndIn(stringerParams, turnStepsParams);
	if (stringerParams.topEnd == "winder" && key == "out") drawTopStepKo_wndOut(stringerParams, turnStepsParams);
    
	return stringerParams;
}


/**
 * ������ ����
 */

/**
 * ������ ������ ���� ����� ����������
 */
function drawBotStepKo_floor(stringerParams) {
  var holes = stringerParams.stringerShape.holes;
  var key = stringerParams.key;
  var hole1, hole2;

  var p0 = copyPoint(stringerParams.p0);

  // ������
  var h_1 = stringerParams.h - stringerParams.treadThickness;            // ������ ������� �������
	if (params.botFloorType === "��������"){
		//stringerParams.stringerOffset_y = stringerParams.stringerOffset_y - params.botFloorsDist;
		h_1 = h_1 - stringerParams.stringerOffset_y;
	}
  if (params.bottomAngleType === "������������ �����"){
	  var h_1 = h_1 - 20;
	  p0 = newPoint_xy(p0, 0.0, 20);
  }
	  
  var p1 = polar(p0, Math.PI * 0.5, h_1);

  // ��������
  var p2 = polar(p1, 0.0, stringerParams.b);

  // ������ ���� �������
  var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����
  var p00 = polar(p0, 0.0, 100.0);                         // ������ ����� ������� ���� �������
  var bottomLineP1 = itercection(p0, p00, p20, p21);       // ����� ������������ ������� ���� � ������ ����� �����
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, stringerParams.dxfBasePoint);
console.log(bottomLineP1)
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

  // ��������� ��� �����
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);


  // ��������� ��� ������
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    // ... ����������
  }

  // ��������� ��� ������ ��������� ������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p0, 140.0, 35.0);
  center2 = newPoint_xy(center1, 60.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleB[0] = { "x": center1.x - 20.0, "y": center1.y - 35.0 };
  holes.push(hole1);
  holes.push(hole2);

  stringerParams.pstart = bottomLineP1;
  stringerParams.p2 = p2;
} //end of drawBotStepKo_floor

/**
 * ������ ������ ���� ����� �������� (�-�������� � ������������ ��������)
 */
function drawBotStepKo_pltG(stringerParams) {
  var holes = stringerParams.stringerShape.holes;
  var key = stringerParams.key;
  var hole1, hole2, hole3, hole4;

  
  var p0 = copyPoint(stringerParams.p0);

  // ������
  var h_1 = 150.0;            // ������ ������� �������

  var p1 = polar(p0, Math.PI * 0.5, h_1);

  // ��������
  var p2 = polar(p1, 0.0, stringerParams.stringerSideOffset);

  // ������ ���� �������
  var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����
  var p00 = polar(p0, 0.0, 100.0);                         // ������ ����� ������� ���� �������
  var bottomLineP1 = itercection(p0, p00, p20, p21);       // ����� ������������ ������� ���� � ������ ����� �����
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, stringerParams.dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

  // ��������� ��������� � ��������
  // ��������� ��� ������ ��������� ������
  // ��������� � ��������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p0, 30.0, 25.0);
  center2 = newPoint_xy(center1, 0.0, 60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
  holes.push(hole1);
  holes.push(hole2);

  // ������ ������
  p1 = copyPoint(p2);
  p2 = newPoint_xy(p1, 0.0, stringerParams.h);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
  // ��������
  p1 = copyPoint(p2);
  p2 = newPoint_xy(p1, stringerParams.b, 0.0);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

  // ��������� ��� �����
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);


  // ��������� ��� ������
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    // ... ����������
  }

  stringerParams.pstart = bottomLineP1;
  stringerParams.p2 = p2;
} //end of drawBotStepKo_pltG

/**
 * ������ ������ ���� ����� �������� (�-�������� ��������, ���������� �������)
 */
function drawBotStepKo_pltPIn(stringerParams) {


} //end of drawBotStepKo_pltPIn

/**
 * ������ ������ ���� ����� �������� (�-�������� � ������������ ��������)
 */
function drawBotStepKo_pltPOut(stringerParams) {

} //end of drawBotStepKo_pltPOut

/**
 * ������ ������ ���� ������ ����� (���������� ������� �����)
 */
function drawBotStepKo_wndIn(stringerParams) {

} //end of drawBotStepLt_wndIn

/**
 * ������ ������ ���� ������ ����� (������� ������� �����)
 */
function drawBotStepKo_wndOut(stringerParams) {

} //end of drawBotStepKo_wndOut


/**
 * ������� �������
 */
function drawMiddleStepsKo(stairAmt, stringerParams) {
	var holes = stringerParams.stringerShape.holes;
	var key = stringerParams.key;
  var hole1, hole2, hole3, hole4;

  var hole1, hole2;

  var p2 = copyPoint(stringerParams.p2);
  var p1 = copyPoint(p2);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����

  // ����� �������
  var ii = 2;                // ���� �������� �� ������� �2
  for (; ii < stairAmt; ii++) {
    // ������ �������
    var p1 = copyPoint(p2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h);
    var p2 = newPoint_xy(p3, stringerParams.b, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p3, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, stringerParams.dxfBasePoint);

    p1 = copyPoint(p3);

    // ��������� ��� �����
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p3.y, "width": stringerParams.frameWidth });
    holes.push(hole1);
    holes.push(hole2);

    // �������� ������� �������
    if (ii == stringerParams.divide) {
      var divideP1 = newPoint_xy(p2, -stringerParams.b * 0.5, 0.0);
      var divideP2 = newPoint_xy(divideP1, 0.0, -20.0);
      divideP2 = itercection(divideP1, divideP2, p20, p21);
      // ����� ������������ ����� ����� � ������ ����� �����
      addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, divideP1, divideP2, stringerParams.dxfBasePoint);
      // ������
      p0 = newPoint_xy(p1, 5.0, -50.0);
      stringerParams.flanPointInsert = p0;
      drawFlanKo(stringerParams, p0, holes);
    }

    // ��������� ��� ������
    if (stringerParams.railing.indexOf(ii) != -1) {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
      holes.push(hole1);
      holes.push(hole2);
      // ... ����������
    }
  }

  stringerParams.p2 = p2; 
} //end of drawMiddleStepsKo

/**
 * ������� ����
 */

/**
 * ��������� ������ ���� ������ ����������
 */
function drawTopStepKo_floor(stringerParams) {
	var holes = stringerParams.stringerShape.holes;
	var key = stringerParams.key;
  var hole1, hole2, hole3, hole4;

  var p1 = copyPoint(stringerParams.p2);
  var p2 = newPoint_xy(p1, 0.0, stringerParams.h);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����

  // ������ �������
  //var p3 = newPoint_xy(p2, stringerParams.b, 0.0);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
  //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);

  // ��������
  p1 = copyPoint(p2);
  if (stringerParams.topFlan == "����") {
    p2 = newPoint_xy(p2, stringerParams.b + 8.0, 0.0);
  }
  else {
    p2 = newPoint_xy(p2, stringerParams.b, 0.0);
  }
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

  // ��������� ��� �����
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);

  // ��������� ��� ������
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
      // ... ����������
  }

  if (stringerParams.stringerType == "�������") {
    var p1 = newPoint_xy(p2, 0.0, -stringerParams.h + stringerParams.treadThickness);
    var p11 = newPoint_xy(p1, -(stringerParams.b - (stringerParams.pstart.x - stringerParams.p0.x - stringerParams.b)), 0.0);
    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, newPoint_xy(p1, 0.0, stringerParams.rad2), stringerParams.dxfBasePoint);
		addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p1, stringerParams.dxfBasePoint);
    //var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    //addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 2.0, Math.PI * 1.5,  stringerParams.dxfBasePoint);

    //addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad1, 0.0), newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
		addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
    var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);

    // ������ ����� �����

    var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, 0.0, -stringerParams.rad2), newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);


    var i = 2;
    for (; i < stringerParams.stairAmt; i++) {
        var p1 = copyPoint(p22);

        if (i === stringerParams.stairAmt - stringerParams.divide + 1) {
            var p11 = newPoint_xy(p1, 0.0, -stringerParams.h);
            var p22 = newPoint_xy(p11, -stringerParams.b, 0.0);

            addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, 0.0, stringerParams.rad1), newPoint_xy(p11, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);

            var pc11 = newPoint_xy(p11, -stringerParams.rad1, stringerParams.rad1);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad1,  Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);

            addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, -stringerParams.rad1, 0.0), newPoint_xy(p22, -stringerParams.rad1, 0.0), stringerParams.dxfBasePoint);
        } else {
            if (i !== stringerParams.stairAmt - stringerParams.divide + 2) {
                var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
                addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
            }

            var p11 = newPoint_xy(p1, -stringerParams.b, 0.0);
            var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);

            addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad1, 0.0), newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);

            var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
            addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams.dxfBasePoint);

            addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p11, 0.0, -stringerParams.rad2), newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams.dxfBasePoint);
        }
    }
    var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, newPoint_xy(p1, -stringerParams.rad1, 0.0), stringerParams.pstart, stringerParams.dxfBasePoint);
  }
  else {
    var fil1 = fillet(p2, Math.PI * 1.5, p20, stringerParams.stairAngle1, stringerParams.rad1);
    var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, 0.0, stringerParams.rad1);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
    // ������ ����� �����
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
    // ���
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
  }


  p1 = copyPoint(p2);
	
  // ��������� ��� ������� ��������� ������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  if (stringerParams.topFlan == "����") {
    center1 = newPoint_xy(p2, -48.0, -70.0);
  }
  else {
    center1 = newPoint_xy(p2, -40.0, -70.0);
  }
  center2 = newPoint_xy(center1, 0.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleU.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
  holes.push(hole1);
  holes.push(hole2);
}//end of drawTopStepKo_floor

/**
 * ��������� ������ ���� ������ �������� (�-�������� ��������)
 */
function drawTopStepKo_pltG(stringerParams) {
	var holes = stringerParams.stringerShape.holes;
	var key = stringerParams.key;
  var hole1, hole2, hole3, hole4;

  var p0 = copyPoint(stringerParams.p0);

  // ������
  var h_1 = 150.0;            // ������ ������� �������

  var p1 = polar(p0, Math.PI * 0.5, h_1);

  // ��������
  var p2 = polar(p1, 0.0, stringerParams.stringerSideOffset);

  // ������ ���� �������
  var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����
  var p00 = polar(p0, 0.0, 100.0);                         // ������ ����� ������� ���� �������
  var bottomLineP1 = itercection(p0, p00, p20, p21);       // ����� ������������ ������� ���� � ������ ����� �����
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, stringerParams.dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

  // ��������� ��������� � ��������
  // ��������� ��� ������ ��������� ������
  // ��������� � ��������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p0, 30.0, 25.0);
  center2 = newPoint_xy(center1, 0.0, 60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
  holes.push(hole1);
  holes.push(hole2);

  // ������ ������
  p1 = copyPoint(p2);
  p2 = newPoint_xy(p1, 0.0, stringerParams.h);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
  // ��������
  p1 = copyPoint(p2);
  p2 = newPoint_xy(p1, stringerParams.b, 0.0);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);

  // ��������� ��� �����
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);


  // ��������� ��� ������
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    // ... ����������
  }

  stringerParams.pstart = bottomLineP1;
  stringerParams.p2 = p2;
}//end of drawTopStepKo_floor

/**
 * ��������� ������ ���� ������ �������� (�-�������� �������� ���������� �������)
 */
function drawTopStepKo_pltPIn(stringerParams) {

}//end of drawTopStepKo_floor

/**
 * ��������� ������ ���� ������ �������� (�-�������� �������� �������)
 */
function drawTopStepKo_pltPOut(stringerParams) {

}//end of drawTopStepKo_floor

/**
 * ��������� ������ ���� ������ ����� (���������� �������)
 */
function drawTopStepKo_wndIn(stringerParams) {

}//end of drawTopStepKo_floor

/**
 * ��������� ������ ���� ������ ����� (������� �������)
 */
function drawTopStepKo_wndOut(stringerParams) {

}//end of drawTopStepKo_floor


/*
 * ������
 * ���������� ��������������� ������
 * ������
 * ���������
 */
function drawFlanKo(stringerParams, p0, holes) {
  if (p0 === undefined || holes === undefined) {
    stringerParams.flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var cha = 15.0;
    var p1 = newPoint_xy(p0, 0.0, 0.0);
    var p2 = newPoint_xy(p0, 0.0, -150.0);
    var p3 = newPoint_xy(p0, stringerParams.b - 10.0 - cha, -150.0);
    var p4 = newPoint_xy(p0, stringerParams.b - 10.0, -(150.0 - cha));
    var p5 = newPoint_xy(p0, stringerParams.b - 10.0, 0.0);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p5, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p5, p1, stringerParams.dxfBasePoint);

    holes = stringerParams.flanShape.holes;
  }

  // ���������

  var p1 = copyPoint(p0);
  var p4 = newPoint_xy(p1, stringerParams.b - 10.0, 0.0);

  // ����� ���������
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var hole3 = new THREE.Path();
  var hole4 = new THREE.Path();
  var center1 = newPoint_xy(p1, 25.0, -20.0);
  var center2 = newPoint_xy(center1, 50.0, 0.0);
  var center3 = newPoint_xy(center1, 0.0, -110.0);
  var center4 = newPoint_xy(center3, 50.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);

  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  hole3 = new THREE.Path();
  hole4 = new THREE.Path();
  center1 = newPoint_xy(p4, -25.0, -20.0);
  center2 = newPoint_xy(center1, -50.0, 0.0);
  center3 = newPoint_xy(center1, 0.0, -110.0);
  center4 = newPoint_xy(center3, -50.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);
} //end of drawFlanKo



/**
 * ������� ������������ �����, ���������, ������� ������� ��������
 */
function ltko_set_railing(stairAmt, stringerParams) {
  // ������ ��������, ��� ��������������� ������
  stringerParams.railing = [];
  // ������ ��������, ��� ��������������� ���������
  stringerParams.brige = [];
  // ����� ������� ����������
  stringerParams.divide = 0;

  if (stairAmt == 3) {
      stringerParams.railing = [1, 3];
      stringerParams.brige = [];
  }
  if (stairAmt == 4) {
      stringerParams.railing = [1, 4];
      stringerParams.brige = [];
  }
  if (stairAmt == 5) {
      stringerParams.railing = [1, 3, 5];
      stringerParams.brige = [3];
  }
  if (stairAmt == 6) {
      stringerParams.railing = [1, 4, 6];
      stringerParams.brige = [4];
  }
  if (stairAmt == 7) {
      stringerParams.railing = [1, 4, 7];
      stringerParams.brige = [4];
  }
  if (stairAmt == 8) {
      stringerParams.railing = [1, 3, 6, 8];
      stringerParams.brige = [5];
  }
  if (stairAmt == 9) {
      stringerParams.railing = [1, 4, 6, 9];
      stringerParams.brige = [4, 6];
  }
  if (stairAmt == 10) {
      stringerParams.railing = [1, 4, 7, 10];
      stringerParams.brige = [4, 7];
  }
  if (stairAmt == 11) {
      stringerParams.railing = [1, 3, 6, 9, 11];
      stringerParams.brige = [5, 8];
      stringerParams.divide = 7;
  }
  if (stairAmt == 12) {
      stringerParams.railing = [1, 3, 6, 9, 12];
      stringerParams.brige = [5, 8];
      stringerParams.divide = 7;
  }
  if (stairAmt == 13) {
      stringerParams.railing = [1, 4, 7, 10, 13];
      stringerParams.brige = [5, 9];
      stringerParams.divide = 8;
  }
  if (stairAmt == 14) {
      stringerParams.railing = [1, 3, 6, 9, 12, 14];
      stringerParams.brige = [6, 10];
      stringerParams.divide = 8;
  }
  if (stairAmt == 15) {
      stringerParams.railing = [1, 3, 6, 9, 12, 15];
      stringerParams.brige = [6, 10];
      stringerParams.divide = 8;
  }
  if (stairAmt == 16) {
      stringerParams.railing = [1, 4, 7, 10, 13, 16];
      stringerParams.brige = [6, 11];
      stringerParams.divide = 9;
  }
  if (stairAmt == 17) {
      stringerParams.railing = [1, 3, 6, 9, 12, 15, 17];
      stringerParams.brige = [7, 12];
      stringerParams.divide = 10;
  }
  if (stairAmt == 18) {
      stringerParams.railing = [1, 4, 7, 10, 13, 16, 18];
      stringerParams.brige = [7, 12];
      stringerParams.divide = 11;
  }
  if (stairAmt == 19) {
      stringerParams.railing = [1, 4, 7, 10, 13, 16, 19];
      stringerParams.brige = [7, 12];
      stringerParams.divide = 11;
  }
} //end of ltko_set_railing


/**
 * ����� ������ ��� ���������
 */
function setStairAngles(stringerParams) {
  // ������ ��� ������� ��������
  if (stringerParams.a < 285) {
    stringerParams.angleTopType = "�2-40�40�160";
    stringerParams.holeDist2 = stringerParams.holeDistU2_160;
    stringerParams.angle2Len = 160.0;
  }
  else {
    stringerParams.angleTopType = "�2-40�40�200";
    stringerParams.holeDist2 = stringerParams.holeDistU2_200;
    stringerParams.angle2Len = 200.0;
  }
  // ��������� ������
  if (stringerParams.a > 260) {
    stringerParams.angleBottomType = "�2-40�40�230";
    stringerParams.holeDist = stringerParams.holeDistU2_230;
    stringerParams.angleLen = 230.0;
  }
  else {
    stringerParams.angleBottomType = "�2-40�40�200";
    stringerParams.holeDist = stringerParams.holeDistU2_200;
    stringerParams.angleLen = 200.0;
  }
  if (stringerParams.a < 230) {
    stringerParams.angleBottomType = "�2-40�40�160";
    stringerParams.holeDist = stringerParams.holeDistU2_160;
    stringerParams.angleLen = 160.0;
  }

  // �� ���� �� ���������
  stringerParams.anglePosX = 25.0;
  stringerParams.anglePosY = 20.0;
} //end of setStairAngles



/**
 * ������ ����� ���������� ���� ��������
 * @param {Object} <��������� �����>
 * @param {Double} <���� ������� ������������ �������>
 * @param {Object} <�������� �����>
 * @param {Double} <���� ������� ������������ �������>
 * @param {Double} <������ ����������>
 * @return {Object} -
 *   ����� ����������� ��������, ��������� ����� ����, �������� ����� ����, ����� ����,
 *   ��������� ���� ����, �������� ���� ����
 */
function fillet(pt1, ang1, pt2, ang2, rad) {
  var pti = itercection(pt1, polar(pt1, ang1, 1.0), pt2, polar(pt2, ang2, 1.0));
  if (pti.x !== undefined && pti.y !== undefined) {
    var n = Math.abs(rad / Math.tan((ang2 - ang1) * 0.5));
    var pta = polar(pti, ang1, -n);
    var ptb = polar(pti, ang2, -n);
    var ang = Math.abs(ang2 - ang1);
    ang = ang1 + Math.PI * ((ang2 > ang1 && ang > Math.PI) || (ang2 < ang1 && ang < Math.PI) ? 0.5 : -0.5);
    var ptc = polar(pta, ang, rad);
    return { "int": pti, "start": pta, "end": ptb, "center": ptc, "angstart": anglea(ptc, pta), "angend": anglea(ptc, ptb) };
  }
  else {
    return null;
  }
}

/**
 * ���� ����� ���� X � ��������, ����������� �����
 * @param {Object} - ����� 1
 * @param {Object} - ����� 2
 * @return {Double}
 */
function anglea(pt1, pt2) {
  var x = pt2.x - pt1.x;
  var y = pt2.y - pt1.y;
  var ang = Math.acos(x / Math.sqrt(x * x + y * y));
  return pt2.y > pt1.y ? ang : Math.PI + Math.PI - ang;
}


function toRadians(angle){
  return angle * (Math.PI / 180);
}

function addArc1(centerPoint, radius, startAngle, endAngle, stringerParams) {
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, centerPoint, radius, startAngle, endAngle, stringerParams.dxfBasePoint);

  //���������� ����� �������� ���������� ���������
  return polar(centerPoint, endAngle, radius);
}

function addLine1(startPoint, endPoint, stringerParams) {
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, startPoint, endPoint, stringerParams.dxfBasePoint);

  //���������� ����� �������� ���������� ���������
  return endPoint;
}
