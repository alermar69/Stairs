//������� ���������� �������
var frames = [];

drawMeshes = function (viewportId, isVisible) {

	/*������� ������������ �������*/
	if (frames) removeObjects(viewportId, 'frames');

	//������� ���������� �������
	frames = [];
	/*������� �������*/
    dxfPrimitivesArr = [];
	
   /*������ ���������*/
	var metalMaterial2 = new THREE.MeshLambertMaterial({color: 0xA3A3A3, wireframe: false});
	var metalMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});
	
	/*������ ��������� �������*/

	var M = parseFloat(document.getElementById("M").value);
	var turnFactor = document.getElementById('turnFactor').options[document.getElementById('turnFactor').selectedIndex].value;
		
	var basePoint = {
		x: 0,
		y: 0,
		z: 0,
		rotationY: 0,
	}

	var frameParams1 = {
		basepoint: basePoint,
		M: M,
		turnFactor: turnFactor,
		metalMaterial: metalMaterial,
		metalMaterial2: metalMaterial2,
	}
	
	frameParams1 = drawLtTurnFrame1(frameParams1);
	frames.push(frameParams1.frame);

	addObjects(viewportId, frames, 'frames');
}//end of drawMeshes()
