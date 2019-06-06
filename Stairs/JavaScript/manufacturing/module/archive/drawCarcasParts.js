function drawMarsh(par){
	
	
	var x0 = par.a / 2;
	var y0 = 0;
	var z0 = 0;
	console.log(par.treadOffset)
	if(par.botEnd == "platform") {
		var platformModuleStep = (par.M + par.b)/ 2;
		x0 = x0 + platformModuleStep - par.a / 2;
		y0 = par.h;
		}
	if(par.botEnd == "winder") {
		var platformModuleStep = par.M/2 - par.b/2 + 80;
		x0 = x0 + platformModuleStep - par.a / 2 + par.b;
		y0 = par.h * 2;
		}

	//ступени
	
	var geometry = new THREE.BoxGeometry(par.a, par.treadThickness, par.M);
	var tread;
	for (var i = 0; i < par.stairAmt; i++) {
		tread = new THREE.Mesh(geometry, par.treadMaterial);
		tread.position.y = y0 + (par.h * (i + 1) - par.treadThickness / 2);
		tread.position.x = x0 + par.b * i;
		tread.position.z = par.M / 2//* turnFactor;
		par.treads.add(tread);
		}
		
	//Площадка
	if(par.topEnd == "platform") {
		var geometry = new THREE.BoxGeometry(par.M, par.treadThickness, par.M);
		var platform = new THREE.Mesh(geometry, par.treadMaterial);
			platform.position.y = y0 + (par.h * (i + 1) - par.treadThickness / 2);
			platform.position.x = x0 + par.b * (i+1);
			platform.position.z = par.M / 2//* turnFactor;
			par.treads.add(platform);
		}
	//забежные ступени
	if(par.topEnd == "winder" && par.stairAmt != 0) {
		//задаем параметры блока забежных ступеней 
		turnParams = {
			model: "module",
			stairModel: params.stairModel,
			marshDist: params.marshDist,
			M: par.M,
			h: par.h1,
			treadThickness: par.treadThickness,
			stringerThickness: 0,
			treadSideOffset: 0,
			material: par.treadMaterial,
			turnFactor: par.turnFactor,
			dxfBasePoint: {x:0, y:0}
		}

		if(par.topEnd == "winder" && par.botEnd == "winder") 
			turnParams.stairModel = "Г-образная с забегом";
		//отрисовываем блок забежных ступеней 	
		var turnSteps = drawTurnSteps(turnParams); //функция в файле drawCarcasPartsLib.js;
		turnSteps.meshes.rotation.y = -0.5 * Math.PI; // * turnFactor;
		turnSteps.meshes.position.x = par.stairAmt * par.b;
		turnSteps.meshes.position.y = (par.stairAmt + 1) * par.h - par.treadThickness//par.treadThickness / 2 * par.turnFactor + par.h + y0 - par.treadThickness * ((1 + par.turnFactor) * 0.5);
		turnSteps.meshes.position.z = z0 + par.M * par.turnFactor;
		turnSteps.meshes.castShadow = true;
		par.treads.add(turnSteps.meshes);
	}
	
/*каркас*/
	
	//нижний модуль
	
	var moduleParams = {
		rise: par.h - par.treadThickness,
		step: par.b,
		type: "bottom",
		material: par.carcasMaterial,
		dxfBasePoint: {x:0, y:0},
		dxfPrimitivesArr: dxfPrimitivesArr,
		}
	var moduleAmt = par.stairAmt;
	if(par.botEnd == "platform"){
		moduleParams.rise = par.h;
		moduleParams.type = "middle";
		moduleParams.step = platformModuleStep;
		moduleAmt += 1;
		}
	if(par.botEnd == "winder"){
		moduleParams.rise = par.h;
		moduleParams.type = "middle";
		moduleAmt += 2;
		if(par.stairAmt == 0) platformModuleStep = par.M / 2 - 50;
		moduleParams.step = platformModuleStep
		}
	if(par.topEnd == "winder"){
		moduleAmt += 1;
		var platformModuleStepTop = par.M/2 - par.b/2;
		if(par.stairAmt == 0) platformModuleStepTop = par.M / 2 - 100;
		}
	if(par.stairAmt == 0) moduleAmt = 0;
	moduleParams = drawModule(moduleParams);
	var module = moduleParams.mesh;			
		module.position.y = 0;
		module.position.z = par.M/2//* turnFactor;
		//позиционирование по Х 		
		var moduleOffset = moduleParams.cylDiam/2 + par.a-par.b + par.treadOffset;
		if(par.botEnd == "platform" || par.botEnd == "winder") {
			moduleOffset = 0;
			module.position.y = -par.treadThickness;
			}
		module.position.x = moduleOffset;
		
	par.carcas.add(module);
	
	//сохраняем позицию нижнего модуля
	x0 = module.position.x;
	if(par.botEnd == "platform") x0 = x0 - par.b + platformModuleStep;
	if(par.botEnd == "winder") x0 = x0 - par.b + platformModuleStep;
	var z0 = module.position.z;
	
	
	//средние модули
	
	moduleParams.rise = par.h;
	moduleParams.step = par.b;
	moduleParams.type = "middle";
	
	
	if(par.stairAmt == 0){
		moduleParams.step = params.marshDist + 100 + 50;
		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = platformModuleStep;
			module.position.y = par.h - par.treadThickness;
			module.position.z = z0;
		par.carcas.add(module);	
		}

	for (var i=1; i<moduleAmt - 1; i++){
		moduleParams = drawModule(moduleParams);
		var module = moduleParams.mesh;
			module.position.x = x0 + par.b * i;
			module.position.y = par.h * i - par.treadThickness;
			module.position.z = z0;
		par.carcas.add(module);
		}
		
	//сохраняем позицию предпоследнего модуля
	x0 = module.position.x;
	y0 = module.position.y;
	
	//последний модуль 
	moduleParams.rise = par.h;
	moduleParams.type = "top";
	
	if(par.topEnd == "platform"){
		moduleParams.type = "middle";
		var platformModuleStep = par.M/2 + par.b - moduleOffset;
		moduleParams.step = platformModuleStep;
		}
	if (par.topEnd == "winder") {
		moduleParams.type = "middle";
		moduleParams.rise = par.h;
		moduleParams.step = platformModuleStepTop;
		}
		
	moduleParams = drawModule(moduleParams);
	var module = moduleParams.mesh;
		module.position.x = x0 + par.b;
		if(par.stairAmt == 0) module.position.x = par.M/2 + 100 + params.marshDist
		module.position.y = y0 + par.h;
		module.position.z = z0;
	par.carcas.add(module);
	


	return par;
} //end of drawMarsh

function drawModule(par){
	
	/*Фуниция отрисовывает модуль каркаса модульной лестницы
	исходные данные:
	rise - подъем
	step - проступь
	type - тип модуля: bottom || middle || top
	material,
	dxfBasePoint
	dxfPrimitivesArr, 
	*/
	
	par.mesh = new THREE.Object3D();
	//задаем параметры модуля

   var cylDiam = 127; //диаметр стаканов
   var bridgeHeight = 150; //высота перемычки Y
   var bridgeWidth = 80; //щирина перемычки Z
   var rise = par.rise;
   var step = par.step;
   var botCylLedge = 10; //выступ стакана снизу за перемычку
   var treadPlateThickness = 4; //толщина металла фланцев


	/*первый стакан*/
	var radiusTop = cylDiam / 2;
	var radiusBottom = cylDiam / 2;
	var cylHeight = rise - treadPlateThickness;
	var segmentsX = 20;
	var segmentsY = 0;
	var openEnded = false;
	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, cylHeight, segmentsX, segmentsY, openEnded);
	var cyl1 = new THREE.Mesh(geometry, par.material);
	cyl1.position.x = 0;
	cyl1.position.y = cylHeight/2;
	cyl1.position.z = 0;
	par.mesh.add(cyl1);

   /*перемычка*/
	var bridgeLength = step;
	if(par.type == "bottom" && rise < bridgeHeight - 2*treadPlateThickness) {
		bridgeHeight = rise - 2*treadPlateThickness;
		botCylLedge = 0;
		}
	if(par.type == "top") bridgeLength = step - cylDiam / 2;
	var geometry = new THREE.BoxGeometry(bridgeLength, bridgeHeight, bridgeWidth);
	var exampleBox = new THREE.Mesh(geometry, par.material);
		exampleBox.position.x = bridgeLength/2;
		exampleBox.position.y = cylHeight - bridgeHeight/2;		
		exampleBox.position.z = 0;
		par.mesh.add(exampleBox);
	
	/*второй стакан*/
	if(par.type != "top"){
		var cylHeight = bridgeHeight + treadPlateThickness + botCylLedge;
		var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, cylHeight, segmentsX, segmentsY, openEnded);
		var cyl2 = new THREE.Mesh(geometry, par.material);
		cyl2.position.x = step;
		cyl2.position.y = cylHeight/2 + rise - cylHeight;
		cyl2.position.z = 0;
		par.mesh.add(cyl2);
		}
	
	/*подложка*/
	var plateParams = {
		width: 150,
		length: 200,	
		thickness: treadPlateThickness,
		material: par.material,
		dxfBasePoint: par.dxfBasePoint,
		dxfPrimitivesArr: par.dxfPrimitivesArr,	
		}
	plateParams = drawModulePlate(plateParams);
	var treadPlate = plateParams.mesh;
	treadPlate.rotation.x = Math.PI/2;
	treadPlate.position.x = -plateParams.width / 2;
	treadPlate.position.y = rise;
	treadPlate.position.z = -plateParams.length / 2;
	par.mesh.add(treadPlate);
	
	
	/*нижний фланец крепления к перекрытию*/
	if(par.type == "bottom"){
		var plateParams = {
			width: 150,
			length: 200,	
			thickness: treadPlateThickness,
			material: par.material,
			dxfBasePoint: {x:0, y:0},
			dxfPrimitivesArr: dxfPrimitivesArr,	
			}
		plateParams = drawModulePlate(plateParams);
		var botFlan = plateParams.mesh;
		botFlan.rotation.x = Math.PI/2;
		botFlan.position.x = -plateParams.width / 2;
		botFlan.position.y = plateParams.thickness; 
		botFlan.position.z = -plateParams.length / 2;
		par.mesh.add(botFlan);	
		}
		
	/*верхний фланец крепления к перекрытию*/
	if(par.type == "top"){
		var plateParams = {
			width: 150,
			length: 300,	
			thickness: treadPlateThickness,
			material: par.material,
			dxfBasePoint: {x:0, y:0},
			dxfPrimitivesArr: dxfPrimitivesArr,
			}
		plateParams = drawModulePlate(plateParams);
		var botFlan = plateParams.mesh;
		botFlan.rotation.y = -Math.PI/2;
		botFlan.position.x = bridgeLength;
		botFlan.position.y = rise - bridgeHeight - 40; ; 
		botFlan.position.z = -plateParams.width / 2;
		par.mesh.add(botFlan);	
		}
		
	//дополнительные возвращаемые параметры
	par.cylDiam = cylDiam;
	
	return par;
	}//end of drawModule

function drawModulePlate(par) {

    /*функция отрисовывает верхний фланец крепления к перекрытию ФК-15*/
    // var dxfBasePoint = { "x": 0.0, "y": 0.0 };
    var flanParams = {
        width: par.width,
        holeDiam: 13,
        holeDiam5: 0,
        angleRadUp: 15,
        angleRadDn: 15,
        hole1X: 20,
        hole1Y: 20,
        hole2X: 20,
        hole2Y: 20,
        hole3X: 20,
        hole3Y: 20,
        hole4X: 20,
        hole4Y: 20,
        hole5X: 0,
        hole5Y: 0,
        height: par.length,
        dxfBasePoint: par.dxfBasePoint,
        dxfPrimitivesArr: par.dxfPrimitivesArr,
    };

    //добавляем фланец
    flanParams = drawRectFlan(flanParams);
	flanParams.length = par.length;
	flanParams.thickness = par.thickness;

    var text = "Подложка ступени";
    var textHeight = 30;
    var textBasePoint = newPoint_xy(par.dxfBasePoint, -50, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var extrudeOptions = {
        amount: par.thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanParams.shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    flanParams.mesh = new THREE.Mesh(geometry, par.material);
	
	return flanParams;
}//end of drawModulePlate


function drawTurnStepsModule(par){


}