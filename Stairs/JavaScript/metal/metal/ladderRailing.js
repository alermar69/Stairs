function drawLadderHandrail(par){
	/*функция отрисовывает секцию ограждения модель "Трап" для крутых лестниц в подвал.
		исходные данные:
		marshId
		dxfBasePoint
		возвращает mesh
	*/
	
	par.mesh = new THREE.Object3D();
	
	var marshPar = getMarshParams(par.marshId);
	
	par.h = marshPar.h;
	par.b = marshPar.b;
	par.stairAmt = marshPar.stairAmt;
	var marshAng = marshPar.ang;
	
	var handrailOffset = 300;
	var handrailEndOffset = 100;
	var handrailLen = 1000;
	var startStep = params.railingStart * 1.0 + 1;
	
	//базовые точки
	var p0 = {x:0, y:0};
	var balPos1 = newPoint_xy(p0, par.b * (startStep - 1), par.h * startStep); //стойка от угла ступени с номером startStep
	var balPos2 = newPoint_xy(p0, par.b * (par.stairAmt - 1), par.h * par.stairAmt); //стойка от угла последней ступени
	
	//сдвигаем стойки на половину ширины профиля стоек
	balPos1 = polar(balPos1, marshAng, 20);
	balPos2 = polar(balPos2, marshAng, 20);
	
	//концы поручня
	var p1 = polar(balPos1, marshAng + Math.PI / 2, handrailOffset + 0.1);
	p1 = polar(p1, marshAng, -handrailEndOffset);
	
	var p2 = polar(balPos2, marshAng + Math.PI / 2, handrailOffset + 0.1);
	p2 = polar(p2, marshAng, handrailEndOffset);

	
	//поручень
	var handrailPar = {
		prof: params.handrailProf,
		sideSlots: params.handrailSlots,
		handrailType: params.handrail,
		metalPaint: params.metalPaint_perila,
		timberPaint: params.timberPaint_perila,
		}
	handrailPar = calcHandrailMeterParams(handrailPar); //функция в файле priceLib.js

	var handrailProfileY = handrailPar.profY;
	var handrailProfileZ = handrailPar.profZ;
	var handrailModel = handrailPar.handrailModel;
	var handrailMaterial = params.materials.metal;
	if(handrailPar.mat == "timber") handrailMaterial = params.materials.timber;


	//параметры поручня
	var poleParams = {
		partName: "handrails",
		type: handrailPar.handrailModel,
		poleProfileY: handrailProfileY,
		poleProfileZ: handrailProfileZ,		
		length: distance(p1, p2),
		poleAngle: marshAng,
		material: handrailMaterial,
		dxfBasePoint: newPoint_xy(par.dxfBasePoint, p1.x, p1.y),
		dxfArr: dxfPrimitivesArr,
		}
		
	poleParams = drawPole3D_4(poleParams);
	var pole = poleParams.mesh;
	pole.position.x = p1.x;
	pole.position.y = p1.y;
	pole.position.z = 0;
	par.mesh.add(pole);
	
//стойки
	
	//сдвигаем стойки на тетиву на 150мм
	var balOnlay = 150;
	balPos1 = polar(balPos1, marshAng - Math.PI / 2, balOnlay);
	balPos2 = polar(balPos2, marshAng - Math.PI / 2, balOnlay);
	
	var balMaxDist = 1200;
	var balAmt = Math.ceil(distance(balPos1, balPos2) / balMaxDist) + 1;
	var balDist = distance(balPos1, balPos2) / (balAmt - 1);
	
	var poleParams = {
		partName: "ladderBal",
		type: "rect",
		poleProfileY: 40,
		poleProfileZ: 20,
		length: handrailOffset + balOnlay,
		poleAngle: marshAng + Math.PI / 2,
		material: params.materials.metal,
		dxfBasePoint: {x:0, y:0},
		dxfArr: dxfPrimitivesArr,
		}
		
	//отрисовка стоек
	for(var i=0; i<balAmt; i++){
		var pos = polar(balPos1, marshAng, balDist * i);
		poleParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
		poleParams = drawPole3D_4(poleParams);
		var pole = poleParams.mesh;
		pole.position.x = pos.x;
		pole.position.y = pos.y;
		pole.position.z = handrailProfileZ / 2 - poleParams.poleProfileZ / 2;
		par.mesh.add(pole);
		}
	
	
	
//ригели
	
	var rigelDist = handrailOffset / (params.rigelAmt * 1.0 + 1);
	var rigelExtraLen = 40 * 2 + poleParams.poleProfileY; //ригель выступает за стойку на 40мм в начале и в конце ограждения
	var basepoint0 = polar(balPos1, marshAng + Math.PI/2, balOnlay + rigelDist);
	basepoint0 = polar(basepoint0, marshAng, -80);
	
	var rigelModel = "rect";
	var rigelProfileY = 20;
	var rigelProfileZ = 20;
	
	if(params.rigelMaterial == "Ф12 нерж.") {
		rigelModel = "round";
		rigelProfileY = 12;
		rigelProfileZ = 12;
		}

	var rigelZ = 0//35 * turnFactor;
//	if (par.side == "right") var rigelZ = - rigelProfileZ;
	if (par.side == "left") var rigelZ = rigelProfileZ + 20;
	

	var poleParams = {
		partName: "rigels",
		type: rigelModel,
		poleProfileY: rigelProfileY,
		poleProfileZ: rigelProfileZ,
		length: distance(balPos1, balPos2) + rigelExtraLen,
		poleAngle: marshAng,
		material: params.materials.metal,
		dxfBasePoint: {x:0, y:0},
		dxfArr: dxfPrimitivesArr,
		}

	//отрисовка ригелей
	for(var i=0; i<params.rigelAmt; i++){
		var pos = polar(basepoint0, marshAng + Math.PI / 2, rigelDist * i)
		poleParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, pos.x, pos.y);
		poleParams = drawPole3D_4(poleParams);
		var pole = poleParams.mesh;
		pole.position.x = pos.x;
		pole.position.y = pos.y;
		pole.position.z = rigelZ;
		par.mesh.add(pole);
		}
		
		
	return par;

} //end of drawLadderHandrail







