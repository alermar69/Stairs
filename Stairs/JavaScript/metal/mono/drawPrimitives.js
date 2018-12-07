function newPoint_xy_arr(basePoint, deltaX, deltaY){
/*функция выдает массив координат точки, удаленной от базовой на заданное расстояние по
оси х и у*/
var newPoint=[];
newPoint[0] = basePoint[0] + deltaX;
newPoint[1] = basePoint[1] - deltaY;
return newPoint;
}

function newPoint_xy(basePoint, deltaX, deltaY){
/*функция выдает массив координат точки, удаленной от базовой на заданное расстояние по
оси х и у*/
var newPoint = {
	x: 0,
	y: 0,
	}
newPoint.x = basePoint.x + deltaX;
newPoint.y = basePoint.y + deltaY;
return newPoint;
}

function newPoint_x(basePoint, deltaX, angle){
/*функция выдает массив координат точки, удаленной от базовой при заданном расстоянии и угле смещения
относительно оси x*/
var newPoint=[];
newPoint[0] = basePoint[0] + deltaX;
newPoint[1] = basePoint[1] - deltaX * Math.tan(angle);
return newPoint;
}

function newPoint_y(basePoint, deltaY, angle){
/*функция выдает массив координат точки, удаленной от базовой при заданном расстоянии и угле смещения
относительно оси y*/
var newPoint=[];
newPoint[0] = basePoint[0] + deltaY / Math.tan(angle);
newPoint[1] = basePoint[1] + deltaY;
return newPoint;
}



function distance(point_1, point_2){
/*рассчитывается расстояние между двумя точками*/
var dist=0;
dist = (point_1[0] - point_2[0])*(point_1[0] - point_2[0]) + (point_1[1] - point_2[1])*(point_1[1] - point_2[1]);
dist = Math.sqrt(dist);
return dist;
}

function addLine(shape, dxfArr, startPoint, endPoint, dxfBasePoint) {
//console.log(startPoint, endPoint, dxfBasePoint);
/*добавление в shape*/
/*
shape.moveTo(startPoint.x, startPoint.y);
shape.lineTo(endPoint.x, endPoint.y);
*/

var curve = new THREE.LineCurve( new THREE.Vector2( startPoint.x, startPoint.y ), new THREE.Vector2( endPoint.x, endPoint.y ) );
shape.curves.push( curve );
shape.actions.push( { action: 'lineTo', args: [ endPoint.x, endPoint.y ] } );


/*добавление в массив dxf*/

var id = dxfArr.length;
dxfArr[id] =
"0" + "\n" +
"LINE" + "\n" +
"5" + "\n" +
id + "\n" +
"8" + "\n" +
"0" + "\n" +
"10" + "\n" +
(startPoint.x + dxfBasePoint.x) + "\n" +
"20" + "\n" +
(startPoint.y + dxfBasePoint.y) + "\n" +
"30" + "\n" +
"0.0" + "\n" +
"11" + "\n" +
(endPoint.x + dxfBasePoint.x) + "\n" +
"21" + "\n" +
(endPoint.y + dxfBasePoint.y) + "\n" +
"31" + "\n" +
"0.0" + "\n";
}

function addArc(shape, dxfArr, centerPoint, radius, startAngle, endAngle, dxfBasePoint){
/*добавление в shape*/
shape.absarc(centerPoint.x, centerPoint.y, radius, startAngle, endAngle, true)

/*добавление в dxf*/
/*переводим углы в градусы*/
startAngle = startAngle * 180 / Math.PI;
endAngle = endAngle * 180 / Math.PI;
/*дуга строится против часовой стрелки*/
if(startAngle > endAngle) {
	var temp = startAngle;
	startAngle = endAngle;
	endAngle = temp
	}


var id = dxfArr.length;
dxfArr[id] =
"0" + "\n" +
"ARC" + "\n" +
"5" + "\n" +
id + "\n" +
"8" + "\n" +
"0" + "\n" +
"10" + "\n" +
(centerPoint.x + dxfBasePoint.x) + "\n" +
"20" + "\n" +
(centerPoint.y + dxfBasePoint.y) + "\n" +
"30" + "\n" +
"0.0" + "\n" +
"40" + "\n" +
radius + "\n" +
"50" + "\n" +
startAngle + "\n" +
"51" + "\n" +
endAngle + "\n";

}

function addCircle(shape, dxfArr, centerPoint, radius, dxfBasePoint) {
/*добавление в shape*/
shape.absarc(centerPoint.x, centerPoint.y, radius, 0, 2*Math.PI, true)

/*добавление в dxf*/
var id = dxfArr.length;
dxfArr[id] =
"0" + "\n" +
"CIRCLE" + "\n" +
"5" + "\n" +
id + "\n" +
"8" + "\n" +
"0" + "\n" +
"10" + "\n" +
(centerPoint.x + dxfBasePoint.x) + "\n" +
"20" + "\n" +
(centerPoint.y + dxfBasePoint.y) + "\n" +
"30" + "\n" +
"0.0" + "\n" + //центр z
"40" + "\n" +
radius + "\n"; //радиус
}
