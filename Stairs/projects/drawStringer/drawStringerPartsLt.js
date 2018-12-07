

function drawStringerLt(stringerParams, turnStepsParams) {
    stringerParams.stringerShape = new THREE.Shape();
    stringerParams.stringerShapeNo = new THREE.Shape();
    stringerParams.elmIns = {};
    var key = stringerParams.key

    // ��� �����
    stringerParams.frameWidth = stringerParams.a - 40.0;

    
    
    //stringerParams.M = 900.0;
    //botEndLength  = platformLength - 45.0    = stringerParams.M
    //topEndLength
    //stringerParams.platformLength = 1200;  
    //stringerParams.treadThickness = 40.0;


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

  //if (stringerParams.stairFrame == "����") {
  //  stringerParams.stepHoleX1 = 70.0;
  //  stringerParams.holeDist = stringerParams.a - (40.0 + 90.0);
  //  stringerParams.holeDist2 = stringerParams.a - (40.0 + 90.0);
  //  stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0);      // ���������� Y ��������� ��������� �����
  //}
  if (stringerParams.stairFrame == "����") {
    stringerParams.stepHoleX1 = 70.0;
    stringerParams.holeDist = stringerParams.a - (40.0 + 90.0);
    stringerParams.holeDist2 = stringerParams.a - (40.0 + 90.0);
    stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0);      // ���������� Y ��������� ��������� �����

    stringerParams.countFrames = Math.ceil(stringerParams.botEndLength - 30.0 / 605.0);
    stringerParams.distX = stringerParams.botEndLength - 30.0 / stringerParams.countFrames - 95.0;
    stringerParams.begX = 70.0;
    stringerParams.from1X = stringerParams.distX + 90.0
  }
  else {
    stringerParams.distX = stringerParams.holeDistU2_200;
    stringerParams.begX = 230.0;
    stringerParams.from1X = 120.0
  }

	
	/*��� �����*/
	
	if (stringerParams.botEnd == "floor") drawBotStepLt_floor(stringerParams);
	if (stringerParams.botEnd == "platformG") drawBotStepLt_pltG(stringerParams);
	if (stringerParams.botEnd == "platformP" && key == "in")drawBotStepLt_pltPIn(stringerParams);
	if (stringerParams.botEnd == "platformP" && key == "out")drawBotStepLt_pltPOut(stringerParams);
	if (stringerParams.botEnd == "winder" && key == "in")drawBotStepLt_wndIn(stringerParams, turnStepsParams);
	if (stringerParams.botEnd == "winder" && key == "out")drawBotStepLt_wndOut(stringerParams, turnStepsParams);
	


	/*������� �������*/
	
  ltko_set_railing(stringerParams.stairAmt, stringerParams);
  drawMiddleStepsLt(stringerParams.stairAmt, stringerParams);

	/*���� �����*/
	
	if(stringerParams.topEnd == "floor") drawTopStepLt_floor(stringerParams);
	if(stringerParams.topEnd == "platformG") drawTopStepLt_pltG(stringerParams);
	if(stringerParams.topEnd == "platformP" && key == "in")drawTopStepLt_pltPIn(stringerParams);
	if(stringerParams.topEnd == "platformP" && key == "out")drawTopStepLt_pltPOut(stringerParams);
	if(stringerParams.topEnd == "winder" && key == "in")drawTopStepLt_wndIn(stringerParams, turnStepsParams);
	if(stringerParams.topEnd == "winder" && key == "out")drawTopStepLt_wndOut(stringerParams, turnStepsParams);
    
	return stringerParams;
}


/**
 * ������ ����
 */

/**
 * ������ ������ ���� ����� ����������
 */
function drawBotStepLt_floor(stringerParams) {
  var holes = stringerParams.stringerShape.holes;
  var key = stringerParams.key;
  var hole1, hole2;

  var p0 = copyPoint(stringerParams.p0);

  // ������
  var h_1 = stringerParams.h + 5;            // ������ ������� �������
  if (stringerParams.botFloorType === "��������"){
		h_1 = h_1 + stringerParams.botFloorsDist;
	}
  if (stringerParams.bottomAngleType === "������������ �����"){
	  var h_1 = h_1 - 20;
	  p0 = newPoint_xy(p0, 0.0, 20);
  }

  
  var p1 = newPoint_xy(p0, 0.0, h_1);
  var p1_1 = newPoint_xy(p0, stringerParams.rad1, h_1);
  var p2 = newPoint_xy(p1_1, stringerParams.b - stringerParams.rad1, 0.0);
  var p3 = newPoint_xy(p0, 0.0, h_1 - stringerParams.rad1);
  var p4 = newPoint_xy(p3, stringerParams.rad1, 0.0);

  // ���� �������� ������
  var p11 = newPoint_xy(p0, 0.0, 100.0);
  var p12 = polar(p11, Math.PI * (5.0 / 3.0), 30.0);
  var fil1 = fillet(p12, Math.PI * (2.0 / 3.0), p3, Math.PI * 1.5, stringerParams.rad1);

  // ������ ���� ������
  var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ ����� 
  if (stringerParams.stringerType == "������" ) {
		var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
		var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����
  }
  
  var p00 = polar(p0, 0.0, 100.0);                         // ������ ����� ������� ���� �������
  var bottomLineP1 = itercection(p0, p00, p20, p21);       // ����� ������������ ������� ���� � ������ ����� ����� 
  
  if(stringerParams.stringerType == "�������" ) {
		bottomLineP1 = newPoint_xy(p0, stringerParams.b + stringerParams.stringerWidth, 0.0);
	}
  var fil2 = fillet(bottomLineP1, Math.PI, p11, Math.PI * (5.0 / 3.0), stringerParams.rad1);
  
  //addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, fil2.start, stringerParams.dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil1.start, stringerParams.dxfBasePoint);

  // ���� �������� ������
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
  //addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);

  stringerParams.bottomLineP1 = bottomLineP1;
  
  // ������
  if (stringerParams.stringerType == "������������" || stringerParams.stringerType == "�������") {
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1_1, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
  }
  if (stringerParams.stringerType == "������") {
        var p31 = polar(p1, stringerParams.stairAngle1, 100.0);
        var fil3 = fillet(p0, Math.PI * 0.5, p31, stringerParams.stairAngle1 + Math.PI, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil3.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);

        var p_t1 = newPoint_xy(p1, stringerParams.b * (stringerParams.stairAmt - 1), stringerParams.h * (stringerParams.stairAmt - 1));
        var p_t2 = newPoint_xy(p_t1, stringerParams.b, 0.0);
        var fil_t1 = fillet(p1, stringerParams.stairAngle1, p_t2, Math.PI, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, fil_t1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil_t1.center, stringerParams.rad1, fil_t1.angstart, fil_t1.angend, stringerParams.dxfBasePoint);
        
        stringerParams.p_t1 = p_t1;
        stringerParams.fil_t1 = fil_t1;
    }

  // ��������� ��� ������/����� �������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
  stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y - stringerParams.treadThickness - 5.0, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);

  // ��������� ��� ������
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1_1, stringerParams.b * 0.5, stringerParams.stepHoleY);
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
  center1 = newPoint_xy(bottomLineP1, -20.0, 35.0);
  if(stringerParams.stringerType == "�������") center1 = newPoint_xy(bottomLineP1, -100.0, 35.0);
  center2 = newPoint_xy(center1, -60.0, 0.0);
  if (params.bottomAngleType === "������������ �����"){
  center1 = newPoint_xy(bottomLineP1, -20.0, 50.0);
  center2 = newPoint_xy(center1, -60.0, 0.0);
  }
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 20.0, "y": center2.y - 35.0 };
  if (params.bottomAngleType === "������������ �����") stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 20.0, "y": center2.y - 30.0 };
  holes.push(hole1);
  holes.push(hole2);

  stringerParams.pstart = fil2.start;
  stringerParams.pstartang = 0.0;
  stringerParams.p2 = p2;

} //end of drawBotStepLt_floor

/**
 * ������ ������ ���� ����� �������� (�-�������� � ������������ ��������)
 */
function drawBotStepLt_pltG(stringerParams) {
  var holes = stringerParams.stringerShape.holes;
  var key = stringerParams.key;
  var hole1, hole2;

  var p0 = copyPoint(stringerParams.p0);

  var p1 = newPoint_xy(p0, 65.0, -150.0);             // ������ ������ ����
  var p2 = newPoint_xy(p0, 0.0, -150.0);
  var p3 = newPoint_xy(p0, 0.0, 5.0);
  var p4 = newPoint_xy(p0, -40.0, stringerParams.h);  // ������� ����� ����
  var p41 = newPoint_xy(p4, 0.0, -stringerParams.rad1);
  var p42 = newPoint_xy(p4, stringerParams.rad1, 0.0);
  var p5 = newPoint_xy(p4, stringerParams.b - stringerParams.rad2, 0.0);
  var pnext = newPoint_xy(p5, stringerParams.rad2, 0.0);
  var p4c = newPoint_xy(p41, stringerParams.rad1, 0.0);
  var p11 = polar(p1, Math.PI / 3.0, 100.0);
  var fil1 = fillet(p11, Math.PI * (4.0 / 3.0), p1, 0.0, stringerParams.rad1);
  var p31 = polar(p3, Math.PI * (2.0 / 3.0), 30.0);
  var fil2 = fillet(p2, Math.PI * 0.5, p31, Math.PI * (5.0 / 3.0), stringerParams.rad1);
  var fil3 = fillet(p3, Math.PI * (2.0 / 3.0), p4, Math.PI * 1.5, stringerParams.rad1);

  // �������� �� ������� ������ �����
  var p20 = newPoint_xy(pnext, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����
  var testpt = itercection(p21, p20, fil1.start, polar(fil1.start, Math.PI / 3.0, 100.0));
  var fnocut = testpt.y > p2.y + 5.0;
  if (fnocut) {
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p2, stringerParams.dxfBasePoint);
  }
  // ������
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil2.start, stringerParams.dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, 0.0, Math.PI / 6.0, stringerParams.dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil3.start, stringerParams.dxfBasePoint);
  // ���� �������� ������
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil3.center, stringerParams.rad1, fil3.angstart, fil3.angend, stringerParams.dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil3.end, p41, stringerParams.dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4c, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
  // ������
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p42, p5, stringerParams.dxfBasePoint);

  p1 = copyPoint(p4);

  // ��������� ��� ������/����� �������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
  stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y - stringerParams.treadThickness - 5.0, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);

//        // ��������� ��� ������
//        if (stringerParams.stairAmt > 2) {
//          hole1 = new THREE.Path();
//          hole2 = new THREE.Path();
//          center1 = newPoint_xy(p42, stringerParams.b * 0.5, stringerParams.stepHoleY);
//          center2 = newPoint_xy(center1, 0.0, -60.0);
//          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//          holes.push(hole1);
//          holes.push(hole2);
//          // ... ����������
//        }

  // ��������� ��� ������ ��������� ������
  // ��������� � ��������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p0, 30.0, 25.0 - 150.0);
  center2 = newPoint_xy(center1, 0.0, 60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleB[0] = { "x": center2.x - 30.0, "y": center2.y + 20.0 };
  holes.push(hole1);
  holes.push(hole2);

  if (fnocut) {
    stringerParams.pstart = fil1.start;
    stringerParams.pstartang = Math.PI / 3.0;
  }
  else {
    stringerParams.pstart = p2;
    stringerParams.pstartang = 0.0;
  }
  stringerParams.p2 = pnext;
} //end of drawBotStepLt_pltG

/**
 * ������ ������ ���� ����� �������� (�-�������� ��������, ���������� �������)
 */
function drawBotStepLt_pltPIn(stringerParams) {


} //end of drawBotStepLt_pltPIn

/**
 * ������ ������ ���� ����� �������� (�-�������� � ������������ ��������)
 */
function drawBotStepLt_pltPOut(stringerParams) {

} //end of drawBotStepLt_pltPOut

/**
 * ������ ������ ���� ������ ����� (���������� ������� �����)
 */
function drawBotStepLt_wndIn(stringerParams) {

} //end of drawBotStepLt_wndIn

/**
 * ������ ������ ���� ������ ����� (������� ������� �����)
 */
function drawBotStepLt_wndOut(stringerParams) {

} //end of drawBotStepLt_wndOut


/**
 * ������� �������
 */
function drawMiddleStepsLt(stairAmt, stringerParams) {
	var holes = stringerParams.stringerShape.holes;
	var key = stringerParams.key;
  var hole1, hole2, hole3, hole4;

  
  var p2 = copyPoint(stringerParams.p2);
  var p1 = copyPoint(p2);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // ������ ����� �� ������ ����� �����
  
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����

  // ����� �������
  var ii = 2;                // ���� �������� �� ������� �2
  for (; ii < stairAmt; ii++) {
    // ������ �������
    var p1 = copyPoint(p2);
    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
    var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    var p2 = newPoint_xy(p4, stringerParams.b - stringerParams.rad1, 0.0);
	if (stringerParams.stringerType != "������"){
		addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
		addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);
		addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
		addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad2, 0.0), stringerParams.dxfBasePoint);
		}
    p1 = newPoint_xy(p1, 0.0, stringerParams.h);

    // ��������� ��� ������/����� �������
    if (stringerParams.stairFrame == "����" || (stringerParams.brige.indexOf(ii) == -1 && (ii != stringerParams.divide))) {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
      var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
      stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
      stringerParams.elmIns[key].anglesop.push(stringerParams.angleBottomType);
      stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y - stringerParams.treadThickness - 5, "width": stringerParams.frameWidth });
      holes.push(hole1);
      holes.push(hole2);
    }

    // ��������� ��� ���������
    if (stringerParams.stairFrame == "���" && stringerParams.brige.indexOf(ii) != -1) {
      stringerParams.elmIns[key].briges.push(newPoint_xy(p1, 35.0, -45.0));
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      hole3 = new THREE.Path();
      hole4 = new THREE.Path();
      center1 = newPoint_xy(p1, 73.0, -65.0);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      var center4 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
      var center3 = newPoint_xy(center4, -50.0, 0.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
      holes.push(hole1);
      holes.push(hole2);
      holes.push(hole3);
      holes.push(hole4);
      stringerParams.elmIns[key].angles.push({ "x": center3.x - stringerParams.anglePosX + 5.0, "y": center3.y + stringerParams.anglePosY });
      stringerParams.elmIns[key].anglesop.push("�2-40�40�90");
    }

    // �������� ������� ������
    if (ii == stringerParams.divide) {
      if (stringerParams.stairFrame == "���") {
        var divideY = 95.0;
      }
      else {
        var divideY = stringerParams.treadThickness + 100.0; // 5.0 + 40.0 + 50.0 + 5.0
      }

      var divideP1 = newPoint_xy(p1, 0.0, -divideY);
      var divideP2 = newPoint_xy(divideP1, 20.0, 0.0);
      divideP2 = itercection(divideP1, divideP2, p20, p21);
      // ����� ������������ ����� ����� � ������ ����� �����
	  if (stringerParams.stringerType == "������" ) {
  		divideP1 = itercection(divideP1, divideP2, p1, polar(p1, stringerParams.stairAngle1, 100.0));  
  		var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // ������ ����� �� ������ ����� �����
  		var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����
  		divideP2 = itercection(divideP1, divideP2, p20, p21);
	  }
	  if (stringerParams.stringerType == "�������") {
		  divideP2 = newPoint_xy(divideP1, stringerParams.b + stringerParams.stringerWidth, 0.0);
	  }
      addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, divideP1, divideP2, stringerParams.dxfBasePoint);
      // ������
      p0 = newPoint_xy(p1, 10.0, -(divideY - 50.0));
      stringerParams.flanPointInsert = p0;
      drawFlanLt(stringerParams, p0, holes);
    }

    // ��������� ��� ������ �� ������ �������
    if (stringerParams.railing.indexOf(ii) != -1) {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
      holes.push(hole1);
      holes.push(hole2);
      // ... ����������
    }
  }

  stringerParams.p2 = p2;
} //end of drawMiddleStepsLt

/**
 * ������� ����
 */

/**
 * ��������� ������ ���� ������ ����������
 */
function drawTopStepLt_floor(stringerParams) {
	var holes = stringerParams.stringerShape.holes;
	var key = stringerParams.key;
  if (stringerParams.stringerType == "������") {
        var p2 = stringerParams.p_t1;
        var p1 = newPoint_xy(p2, 0.0, -stringerParams.h);
        var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0);
        var p21 = polar(p20, stringerParams.stairAngle1, 100.0);
		
        // ��������
        p1 = copyPoint(p2);
        if (stringerParams.topFlan == "����") {
            p2 = newPoint_xy(p2, stringerParams.a + 13.0, 0.0);
        } else {
            p2 = newPoint_xy(p2, stringerParams.a + 5.0, 0.0);
        }
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, stringerParams.fil_t1.end, p2, stringerParams.dxfBasePoint);
  }

  if (stringerParams.stringerType == "������������" || stringerParams.stringerType == "�������") {
      var p1 = copyPoint(stringerParams.p2);
      var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
      var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0); // ������ ����� �� ������ ����� �����
      var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����

      var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
      // ������ �������
      var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
      var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
      addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
      addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

      // ��������
      p1 = copyPoint(p2);
      var topStepWidth = stringerParams.a + 5.0;  
      if (stringerParams.topFlan == "����") topStepWidth = stringerParams.a + 13.0;

      p2 = newPoint_xy(p2, topStepWidth, 0.0);


      var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
      var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
      addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
      addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);
  }

  // ��������� ��� ������/����� �������
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
  stringerParams.elmIns[key].anglesop.push(stringerParams.angleTopType);
  stringerParams.elmIns[key].frames.push({ "x": center1.x - 45.0, "y": p1.y - stringerParams.treadThickness - 5.0, "width": stringerParams.frameWidth });
  holes.push(hole1);
  holes.push(hole2);

  // ��������� ��� ������
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
      // ... ����������
  }

    // ������ ������    

	if (stringerParams.stringerType == "�������") {
		var p1 = newPoint_xy(p2, 0.0, -stringerParams.stringerWidth);

        var p11 = newPoint_xy(p1, -(topStepWidth - stringerParams.stringerWidth), 0.0);
        addLine1(p2, newPoint_xy(p1, 0.0, stringerParams.rad1), stringerParams);

        var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);

        addLine1(pe_arc, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams);
		
        var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
        var pe_arc = addArc1(pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams);


        var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);
        addLine1(pe_arc, newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams);


        var i = 2;
        for (; i < stringerParams.stairAmt; i++) {
            var p1 = copyPoint(p22);
            var pc1 = newPoint_xy(p1, -stringerParams.rad1, stringerParams.rad1);
            var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);

            var p11 = newPoint_xy(p1, -stringerParams.b, 0.0);
            var p22 = newPoint_xy(p11, 0.0, -stringerParams.h);

            addLine1(pe_arc, newPoint_xy(p11, stringerParams.rad2, 0.0), stringerParams);

            var pc11 = newPoint_xy(p11, stringerParams.rad2, -stringerParams.rad2);
            var pe_arc = addArc1(pc11, stringerParams.rad2, Math.PI * 0.5, Math.PI, stringerParams);

            addLine1(pe_arc, newPoint_xy(p22, 0.0, stringerParams.rad1), stringerParams);
        }
		if(p22.y != stringerParams.pstart.y){
			var p3 = newPoint_xy(p22, 0, -(p22.y - stringerParams.pstart.y));
			var p22 = addLine1(newPoint_xy(p22, 0.0, stringerParams.rad1), newPoint_xy(p3, 0.0, stringerParams.rad1), stringerParams);
			var p22 = copyPoint(p3);
		}
        var pc1 = newPoint_xy(p22, -stringerParams.rad1, stringerParams.rad1);
        var pe_arc = addArc1(pc1, stringerParams.rad1, Math.PI * 2.0, Math.PI * 1.5, stringerParams);
        addLine1(pe_arc, stringerParams.pstart, stringerParams);
  }
    
	if (stringerParams.stringerType != "�������") {
        var fil1 = fillet(p2, Math.PI * 1.5, p20, stringerParams.stairAngle1, stringerParams.rad1);
        var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, 
          stringerParams.pstartang, stringerParams.rad1);
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
        // ������ ����� �����
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
        addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
        // ���
        addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);
  }

  var p1 = copyPoint(p2);


  // ��������� ��� ������� ��������� ������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var angleOffset;
  if (stringerParams.stairFrame == "����") {
    angleOffset = - (stringerParams.treadThickness + 65.0);
  }
  else {
    if (stringerParams.a < 245) {
      angleOffset = -105;
    }
    else {
      angleOffset = -65;
    }
  }

  if (stringerParams.topFlan == "����") {
    center1 = newPoint_xy(p1, -48.0, angleOffset);
  }
  else {
    center1 = newPoint_xy(p1, -40.0, angleOffset);
  }
  center2 = newPoint_xy(center1, 0.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  stringerParams.elmIns[key].angleU.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
  holes.push(hole1);
  holes.push(hole2);
}//end of drawTopStepLt_floor

/**
 * ��������� ������ ���� ������ �������� (�-�������� ��������)
 */
function drawTopStepLt_pltG(stringerParams) {
	var holes = stringerParams.stringerShape.holes;
	var key = stringerParams.key;
  var hole1, hole2, hole3, hole4;

  var p1 = copyPoint(stringerParams.p2);
  var p2 = newPoint_xy(p1, 0.0, stringerParams.h);
  var ph = copyPoint(p2);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // ������ ����� �� ������ ����� �����
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // ������ ����� �� ������ �����

  // ������ �������
  var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
  var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
  var p3 = newPoint_xy(p1, 0.0, stringerParams.h - stringerParams.rad1);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, stringerParams.dxfBasePoint);

  // ��������
  p1 = copyPoint(p2);
  p2 = newPoint_xy(p1, stringerParams.botEndLength - stringerParams.rad1, 0.0);
  var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
  var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, stringerParams.dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, stringerParams.dxfBasePoint);

  // ������ ������
  p1 = copyPoint(p2);
  p2 = newPoint_xy(p1, 0.0, -150.0);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
  p1 = copyPoint(p2);
  var fil1 = fillet(p2, Math.PI, p20, stringerParams.stairAngle1, stringerParams.rad1);
  var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, 
    stringerParams.pstartang, stringerParams.rad1);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, stringerParams.dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, stringerParams.dxfBasePoint);
  // ������ ����� �����
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, stringerParams.dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, stringerParams.dxfBasePoint);
  // ���
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, stringerParams.dxfBasePoint);

  // ���������

  if (stringerParams.stairFrame == "���") {
    // ��������� ��� ��������� 1
    // � ��� ������ ��������� �������� �����
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(ph, 73.0, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));

    // ��������� ��� ������ ������� 1
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(ph, stringerParams.begX, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, stringerParams.distX, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
    stringerParams.elmIns[key].anglesop.push("�2-40�40�200");
    holes.push(hole1);
    holes.push(hole2);

    // ��������� ��� ��������� 2
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(ph, ((stringerParams.botEndLength * 0.5) + 48.0), -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    stringerParams.elmIns[key].briges.push(newPoint_xy(center1, -38.0, 20.0));

    // ��������� ��� ������ ������� 2
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(center1, stringerParams.from1X, 0.0);
    center2 = newPoint_xy(center1, stringerParams.distX, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    stringerParams.elmIns[key].angles.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
    stringerParams.elmIns[key].anglesop.push("�2-40�40�200");
    holes.push(hole1);
    holes.push(hole2);
  }
  else {
    // ��������� ��� ������ ��������� �������� �����
    if (key == "in") {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      center1 = newPoint_xy(ph, 73.0, -65.0);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
      holes.push(hole1);
      holes.push(hole2);
    }

    // ��������� ��� ����� ��� ���������
    var ii;
    for (ii = 0; ii < stringerParams.countFrames; ii++) { 
      // ��������� ��� �����
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      center1 = newPoint_xy(ph, stringerParams.begX, stringerParams.stepHoleY);
      center2 = newPoint_xy(center1, stringerParams.distX, 0.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
      stringerParams.elmIns[key].frames.push({"x": center1.x - 45.0, "y": ph.y - stringerParams.treadThickness - 5.0,
        "width" : stringerParams.distX + 90.0 });
      holes.push(hole1);
      holes.push(hole2);

      stringerParams.begX += stringerParams.distX + 90.0 + 5.0;
    }
  }

	// ��������� ��� ������ ��������� ������
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p1, -30.0, 150.0 - 65.0);
  center2 = newPoint_xy(center1, 0.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);

//        // ��������� ��� ������
//        if (stringerParams.stairAmt > 2) {
//          hole1 = new THREE.Path();
//          hole2 = new THREE.Path();
//          center1 = newPoint_xy(p1, stringerParams.b * 0.5, stringerParams.stepHoleY);
//          center2 = newPoint_xy(center1, 0.0, -60.0);
//          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//          holes.push(hole1);
//          holes.push(hole2);
//            // ... ����������
//        }

				// ��������� ��� ������ 1
////  (if (> stairAmt1 2)
////    (progn
////      (setvar "clayer" "��������� ��� �����")
////      (setq center1 (c:new-point p1 180 -65))
////      (setq center2 (c:new-point center1 0 -60))
////      (command "_circle" center1 holeRad)
////      (command "_circle" center2 holeRad)
//        if (stringerParams.stairAmt > 2) {
//          hole1 = new THREE.Path();
//          hole2 = new THREE.Path();
//          center1 = newPoint_xy(ph, stringerParams.b * 0.5, stringerParams.stepHoleY);
//          center2 = newPoint_xy(center1, 0.0, -60.0);
//          addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//          addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//          holes.push(hole1);
//          holes.push(hole2);
//            // ... ����������
//        }

        // ��������� ��� ������ 2
//  (if (> stairAmt1 2)
//    (progn
//      (setvar "clayer" "��������� ��� �����")
//      (setq center1 (c:new-point p2 -80 -65))
//      (setq center2 (c:new-point center1 0 -60))
//      (command "_circle" center1 holeRad)
//      (command "_circle" center2 holeRad)


}//end of drawTopStepLt_floor

/**
 * ��������� ������ ���� ������ �������� (�-�������� �������� ���������� �������)
 */
function drawTopStepLt_pltPIn(stringerParams) {

}//end of drawTopStepLt_floor

/**
 * ��������� ������ ���� ������ �������� (�-�������� �������� �������)
 */
function drawTopStepLt_pltPOut(stringerParams) {

}//end of drawTopStepLt_floor

/**
 * ��������� ������ ���� ������ ����� (���������� �������)
 */
function drawTopStepLt_wndIn(stringerParams) {

}//end of drawTopStepLt_floor

/**
 * ��������� ������ ���� ������ ����� (������� �������)
 */
function drawTopStepLt_wndOut(stringerParams) {

}//end of drawTopStepLt_floor



/*
 * ������
 * ���������� ��������������� ������
 * ������
 * ���������
 */
function drawFlanLt(stringerParams, p0, holes) {
  if (p0 === undefined || holes === undefined) {
    stringerParams.flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, 0.0);
    var p2 = newPoint_xy(p0, stringerParams.rad1, -100.0);
    var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad1);
    var p3 = newPoint_xy(p0, stringerParams.a - 10.0, -(100.0 - stringerParams.rad1));
    var pc3 = newPoint_xy(p3, -stringerParams.rad1, 0.0);
    var p4 = newPoint_xy(p0, stringerParams.a - 10.0, 0.0);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p1,
      newPoint_xy(p1, 0.0, -(100.0 - stringerParams.rad1)), stringerParams.dxfBasePoint);
    addArc(stringerParams.flanShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p2,
      newPoint_xy(p2, (stringerParams.a - 10.0 - stringerParams.rad1 - stringerParams.rad1), 0.0), stringerParams.dxfBasePoint);
    addArc(stringerParams.flanShape, dxfPrimitivesArr, pc3, stringerParams.rad1, Math.PI * 1.5, Math.PI * 2.0, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

    holes = stringerParams.flanShape.holes;
  }
  else {
    stringerParams.flanangle1PointInsert = newPoint_xy(p0, 5.0, 0.0);
    stringerParams.flanangle2PointInsert = newPoint_xy(p0, stringerParams.a - 10.0 - 5.0, 0.0);
  }

  // ���������

  var p1 = copyPoint(p0);
  var p4 = newPoint_xy(p1, stringerParams.a - 10.0, 0.0);

  // ����� ���������
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var hole3 = new THREE.Path();
  var hole4 = new THREE.Path();
  var center1 = newPoint_xy(p1, 25.0, -20.0);
  var center2 = newPoint_xy(center1, 50.0, 0.0);
  var center3 = newPoint_xy(center1, 0.0, -60.0);
  var center4 = newPoint_xy(center1, 50.0, -60.0);
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
  center1 = newPoint_xy(p4, -75.0, -20.0);
  center2 = newPoint_xy(center1, 50.0, 0.0);
  center3 = newPoint_xy(center1, 0.0, -60.0);
  center4 = newPoint_xy(center1, 50.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);
} //end of drawFlanLt



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
