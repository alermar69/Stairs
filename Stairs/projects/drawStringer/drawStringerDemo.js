//создаем глобальные массивы
var meshes = [];


drawMeshes = function (viewportId, isVisible) {

/*удаляем существующие объекты*/
	if (meshes) removeObjects(viewportId, 'meshes');


//очищаем глобальные массивы
	meshes = [];


   /*задаем материалы*/
	var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
	var metalMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});
		
/*** ДОБАВЛЕНИЕ ОБЪЕКТОВ ***/

/*задаем параметры косоура*/
var stringerThickness = 8;
var dxfBasePoint =  {x:0,y:0};
var stringerParams = {
	model: params.model,
	botEnd: params.botEnd,
	topEnd: params.topEnd,
	botEndLength: params.botEndLength,
	topEndLength: params.topEndLength,
	stringerType: params.stringerType,
	stairFrame: params.stairFrame,
	treadThickness: params.treadThickness,
	botFloorType: params.botFloorType,
	botFloorsDist: params.botFloorsDist,
	topAnglePosition: params.topAnglePosition,
	topFlan: params.topFlan,
	bottomAngleType: params.bottomAngleType,
	h: params.h,
	b: params.b,
	a: params.a,
	stairAmt: params.stairAmt,
	thickness: stringerThickness,
	dxfBasePoint: dxfBasePoint,
	dxfPrimitivesArr: dxfPrimitivesArr,
	key: params.stringerSide,
}


/*Косоур*/

if(params.model == "лт") stringerParams = drawStringerLt(stringerParams);
if(params.model == "ко") stringerParams = drawStringerKo(stringerParams);


	var extrudeOptions = {
		amount: stringerParams.thickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(stringerParams.stringerShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var stringer = new THREE.Mesh(geometry, metalMaterial);
		stringer.position.x = 0;
		stringer.position.y = 0;		
		stringer.position.z = 0;
		meshes.push(stringer);


/*
	var shape = drawShape(height, width);
	var extrudeOptions = {
		amount: thickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var exampleBox2 = new THREE.Mesh(geometry, metalMaterial);
		exampleBox2.position.x = 0;
		exampleBox2.position.y = 0;		
		exampleBox2.position.z = 1000;
		meshes.push(exampleBox2);
*/


//добавляем объекты в сцену
		addObjects(viewportId, meshes, 'meshes');

}//end of 