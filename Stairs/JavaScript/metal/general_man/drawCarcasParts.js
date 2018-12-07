
/**функция отрисовывает прямоугольный флаенц с отверстиями
*@params height, width 
*@params roundHoleCenters, pathHoles, thk, dxfBasePoint, cornerRad, holeRad, noBolts //не обязательные
*@params dxfBasePoint //не обязательный. Если не указан, то в dxf контур не выводится

*@return par.mesh
*/
function drawRectFlan2(par){

	par.mesh = new THREE.Object3D();
	
	var dxfArr = dxfPrimitivesArr;
	//если не задана базовая точка, в dxf контур не выводим
	if(!par.dxfBasePoint) {
		dxfArr = [];
		par.dxfBasePoint = {x: 0, y: 0,}
		} 
	if(!par.thk) par.thk = 8;
	
	var p1 = {x:0, y:0,};
	var p2 = newPoint_xy(p1, 0, par.height);
	var p3 = newPoint_xy(p2, par.width, 0);
	var p4 = newPoint_xy(p1, par.width, 0);
	
	var holes = [p1, p2, p3, p4];
	
	//создаем шейп
	var shapePar = {
		points: holes,
		dxfArr: dxfArr,
		dxfBasePoint: par.dxfBasePoint,
		}
	if(par.cornerRad) {
		shapePar.radOut = par.cornerRad;
		shapePar.radIn = par.cornerRad;
		}
	
	par.shape = drawShapeByPoints2(shapePar).shape;

	if(par.pathHoles) par.shape.holes.push(...par.pathHoles);
	
	if(par.roundHoleCenters){
		var holesPar = {
			holeArr: par.roundHoleCenters,
			dxfBasePoint: par.dxfBasePoint,
			shape: par.shape,
			}
		if(par.holeRad) holesPar.holeRad = par.holeRad;
		addHolesToShape(holesPar);		
	}
	
	var extrudeOptions = {
		amount: par.thk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
	};

	var geom = new THREE.ExtrudeGeometry(par.shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var flan = new THREE.Mesh(geom, params.materials.metal2);
	par.mesh.add(flan);
	
	//болты в отверстиях
	
	if(typeof anglesHasBolts != "undefined" && anglesHasBolts && !par.noBolts){ //anglesHasBolts - глобальная переменная
		var boltPar = {
			diam: boltDiam,
			len: boltLen,
			};
		if(par.roundHoleCenters){
			for(var i=0; i<par.roundHoleCenters.length; i++){
				var bolt = drawBolt(boltPar).mesh;
				bolt.rotation.x = Math.PI / 2;
				bolt.position.x = par.roundHoleCenters[i].x;
				bolt.position.y = par.roundHoleCenters[i].y;
				bolt.position.z = boltPar.len / 2 - boltBulge;
				par.mesh.add(bolt);
				}
			}
		}

	return par;

}//end of drawRectFlan2

