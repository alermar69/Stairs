var params = {}; //���������� ������ �������� �������
var viewportsParams = []; //���������� ������ ���������� ������� �������
var dxfPrimitivesArr = []; //����������� ������ ���������� ��� �������� � dxf

$(function () {
	//��������� ������� ������ �� ��������
	addViewport('WebGL-output', 'vl_1');//��������� outputDivId, viewportId
	//addViewport('WebGL-output', 'vl_2');
	//addViewport('WebGL-output', 'vl_3');

	/*��������������� ���*/		
	var axes = new THREE.AxisHelper( 2000 );
	$['vl_1'].add(axes);
	
	//��������� ������ ����������
	addFloorPlane('vl_1', true);//��������� viewportId, isVisible
	//addFloorPlane('vl_2', true);
/*
	//��������� �����
	//addWalls('vl_1', true);//��������� viewportId, isVisible 
	//addWalls('vl_2', true);

	//��������� ����������
	//addBanister('vl_3');

	//��������� �����
	//addTopFloor('vl_3');
*/
	//��������� ���� � 3� ����
	addLayer('meshes', '�������');
	//addLayer('risers', '�����������');
	//addLayer('carcas', '������');
	//addLayer('railing', '���������� ��������');
	//addLayer('topFloor', '������� ����������');

	//������������� ������ ����
	//$(".tabs").lightTabs();

	recalculate = function() {
		dxfPrimitivesArr = []; //������� ������ ���������� 
		getAllInputsValues(params);
		changeAllForms();
		drawMeshes('vl_1', true);
		//drawStaircase('vl_2', true);
		//drawBanister();
		//drawTopFloor();
		//redrawWalls();
		//drawBanister();
		//������ ����
		//calculateCarcasPrice();
		//calculateRailingPrice();
	}

	changeAllForms = function () {
	/*	changeFormCarcas();
		changeFormRailing();
		changeFormBanisterConstruct();
		changeOffer();
		complectDescription();
		changeFormAssembling();*/
	}
	//������������� ��������
	recalculate();
/*	//������ ����������� ���� �� ���������� ������� ����� ���������� ����
	$('.form_table,.tabs').delegate('input,select,textarea', 'click', recalculate);
	
	//�������� �������� �����
	$("#mainImages").hide();
	$("#marshRailingImages2D").hide();*/
});