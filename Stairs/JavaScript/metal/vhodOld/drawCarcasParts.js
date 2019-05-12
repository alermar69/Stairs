

/**
  косоур прямой одномаршевой лестницы
 */
function drawStringer0(model, stringerType, h1, b1, a1, stairAmt1, extShiftTop) {
	var p1_x; //нижняя точка зада площадки
	var p1_y; //нижняя точка зада площадки

	var stringerOffset_x = 0;
	var stringerOffset_y = 0;

	if (model == "ко") {
		stringerOffset_x = a1-b1;
		stringerOffset_y = treadThickness;
		}

	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x, 0);
	/*верхняя линия косоура*/

	var x2;
	var y2;

	if (stringerType == "пилообразная" || stringerType == "ломаная") {
		for (var i = 1; i < stairAmt1; i++) {
			x1 = b1*(i-1) + stringerOffset_x;
			y1 = h1*i - stringerOffset_y;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + b1;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}
		 }
	if (stringerType == "прямая") {
		stringerShape.lineTo(0, h1);
		x2 = b1*(stairAmt1-1);
		y2 = h1*(stairAmt1-1);
		}

	//последний подъем
	x1 = x2// + b1;
	y1 = y2 + h1;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + a1 - stringerOffset_x + extShiftTop;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//зад косоура
	p1_x = x2;
	p1_y = y2 - stringerWidth;
	stringerShape.lineTo(p1_x, p1_y);



	/*нижняя линия марша*/
	if (stringerType == "пилообразная" || stringerType == "прямая") {
		x2 = a1// + a3;
		y2 = 0;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo(stringerOffset_x, 0);
		}

	if (stringerType == "ломаная") {
		//верхний подъем*/
		x2 = p1_x  - a1 + stringerWidth;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h1;
		stringerShape.lineTo(x1, y1);

		for (var i = 1; i < stairAmt1-1; i++) {
			x2 = x1 - b1*i;
			y2 = y1 - h1*(i-1);
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h1;
			stringerShape.lineTo(x2, y2);
			}

		x2 = x2 - b1;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo(stringerWidth, 0);
		stringerShape.lineTo(stringerOffset_x, 0);
	}

	return stringerShape;
}//end of drawStringer0

/**
  дополнительный косоур прямой одномаршевой лестницы
  (дополнительные косоуры на широком марше)
 */
function drawStringer0mid(model, stringerType, h1, b1, a1, stairAmt1) {
	var p1_x; //нижняя точка зада площадки
	var p1_y; //нижняя точка зада площадки

	var stringerOffset_x = 0;
	var stringerOffset_y = treadThickness;


	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x, 0);
	/*верхняя линия косоура*/
	stringerShape.lineTo(stringerOffset_x, h1 - stringerOffset_y);
	stringerShape.lineTo(stringerOffset_x + a1, h1 - stringerOffset_y);

	var x2;
	var y2;

	if (stringerType == "пилообразная" || stringerType == "ломаная" || stringerType == "прямая") {
		for (var i = 2; i < stairAmt1; i++) {
			x1 = b1 * (i - 1) + stringerOffset_x;
			y1 = h1 * i - stringerOffset_y;
			stringerShape.lineTo(x1 + a1 - b1, y1 - h1 + stringerOffset_y);
			stringerShape.lineTo(x1, y1);
			x2 = x1 + a1;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
		}
	}

	//последний подъем
	x1 = x2;
	y1 = y2 + h1;
	stringerShape.lineTo(x1, y1 - h1 + stringerOffset_y);
	stringerShape.lineTo(x1 - a1 + b1, y1);
	x2 = x1 + b1 - stringerOffset_x;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//зад косоура
	p1_x = x2;
	p1_y = y2 - stringerWidth + stringerOffset_y;
	stringerShape.lineTo(p1_x, p1_y);


	/*нижняя линия марша*/
	if (stringerType == "пилообразная" || stringerType == "прямая") {
		x2 = a1;// + a3;
		y2 = 0;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo(stringerOffset_x, 0);
	}

	if (stringerType == "ломаная") {
		//верхний подъем*/
		x2 = p1_x - a1 + stringerWidth;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h1;
		stringerShape.lineTo(x1, y1);
		y1 += stringerOffset_y;

		for (var i = 1; i < stairAmt1-1; i++) {
			x2 = x1 - b1 * i;
			y2 = y1 - h1 * (i - 1) - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h1;
			stringerShape.lineTo(x2, y2);
		}

		x2 = x2 - b1;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo(stringerWidth, 0);
		stringerShape.lineTo(stringerOffset_x, 0);
	}

	return stringerShape;
}//end of drawStringer0mid



var stringerPlatformHeight = 150;

/**
  внешний косоур нижнего марша
*/
function drawStringer1(
				model, stringerTurn , stringerType,
				h1, b1, a1, stairAmt1, h3, L1, L2,
				turnLength, scale, stringerSideOffset) {

	var stringerOffset_x = 0;
	var stringerOffset_y = 0;

	if (model == "ко") {
		stringerOffset_x = a1-b1;
		stringerOffset_y = treadThickness;
		}
	//console.log ("stringerOffset_x = " + stringerOffset_x);
	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x, 0);

if (stairAmt1 == 0 ) {
/* STRINGER TOP LINE */
	if (stringerTurn == "площадка"){
		x1 = stringerOffset_x;
		y1 = -stringerOffset_x + h1;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + turnLength - stringerOffset_x;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	if (stringerTurn == "забег"){
		//забег 1
		x1 = stringerOffset_x;
		y1 = -stringerOffset_x + h1;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + L2 *(turnLength - stringerSideOffset) / turnLength;
		y2 = y1;
		if (stringerType != "прямая") stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x1;
		y1t = y1;

		//забег 2
		x1 = x2;
		y1 = y2 + h3;
		stringerShape.lineTo(x1, y1);
		x2 = x1t + turnLength - stringerOffset_x;
		y2 = y1;
		stringerShape.lineTo(x2, y2);

		//зад площадки
		if (stringerType != "ломаная") {
			p1_x = x2;
			p1_y = y2 - Math.max(h1, h3);
			stringerShape.lineTo(p1_x, p1_y);
			}
		else {
			p1_x = x2;
			p1_y = y2 - stringerWidth;
			stringerShape.lineTo(p1_x, p1_y);
			}

		}



	/* STRINGER BOTTOM LINE */
	if (stringerTurn == "площадка"){
		stringerShape.lineTo(x2, 0);
		stringerShape.moveTo(stringerOffset_x, 0);
		}
	if (stringerTurn == "забег"){
		if (stringerType == "ломаная") {
			x1 = x1t + L2 *(turnLength - stringerSideOffset) / turnLength  + stringerWidth;
			y1 = p1_y
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = y1 - h3
			stringerShape.lineTo(x2, y2);

			x2 = x2-L2;
			stringerShape.lineTo(x2, y2);
			stringerShape.lineTo(x2, 0);
			stringerShape.moveTo(stringerOffset_x, 0);


			}
		else {
			stringerShape.lineTo(b1, 0);
			stringerShape.moveTo(stringerOffset_x, 0);
			}
		}
}


else { // ненулевое количество ступеней в марше

/* STRINGER TOP LINE */

if (stringerType == "пилообразная" || stringerType == "ломаная") {
	for (var i = 1; i < stairAmt1; i++) {
		x1 = b1*(i-1) + stringerOffset_x;
		y1 = h1*i - stringerOffset_y;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + b1;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

	if (stairAmt1 == 1) {
		x2 = stringerOffset_x;
		y2 = -stringerOffset_y;
		}

	if (stringerTurn == "площадка"){

	x1 = x2;
	y1 = y2 + h1;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + b1;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//площадка
	x1 = x2;
	y1 = y2 + h1;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + turnLength - stringerOffset_y;
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	}

	if (stringerTurn == "забег"){
	  //последний подъем
	x1 = x2;
	y1 = y2 + h1;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + b1;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//забег 1
	x1 = x2;
	y1 = y2 + h1;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + L2 *(turnLength - stringerSideOffset) / turnLength;
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	//сохраняем точку
	x1t = x1;
	y1t = y1;

	//забег 2
	x1 = x2;
	y1 = y2 + h3;
	stringerShape.lineTo(x1, y1);
	x2 = x1t + turnLength - stringerOffset_x;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	}

	//зад площадки
	if (stringerType != "ломаная") {
		p1_x = x2;
		p1_y = y2 - Math.max(h1, h3);
		stringerShape.lineTo(p1_x, p1_y);
		}
	else {
		p1_x = x2;
		p1_y = y2 - stringerWidth;
		stringerShape.lineTo(p1_x, p1_y);
		}

}
if (stringerType == "прямая") {
	stringerShape.lineTo(0, h1);

	if (stringerTurn == "площадка"){

	//верхняя линия марша
	x1 = b1*stairAmt1;
	y1 = h1*(stairAmt1 +1);
	stringerShape.lineTo(x1, y1);

	//площадка
	x2 = x1 + turnLength;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//зад площадки
	p1_x = x2;
	p1_y = y2 - Math.max(h1, h3);
	stringerShape.lineTo(p1_x, p1_y);
	}

	if (stringerTurn == "забег"){
	  //последний подъем
	x1 = b1*stairAmt1;
	y1 = h1*(stairAmt1+1);
	stringerShape.lineTo(x1, y1);

	//забег 1
	x1 = x1 + L2;
	y1 = y1 + h3;
	stringerShape.lineTo(x1, y1);

	//сохраняем точку
	x1t = x1 - L2;
	y1t = y1 - h3;

	//забег 2
	x2 = x1t + turnLength;
	y2 = y1t + h3;
	stringerShape.lineTo(x2, y2);

	//зад площадки
	p1_x = x2;
	p1_y = y2 - Math.max(h1, h3);
	stringerShape.lineTo(p1_x, p1_y);
	}

}

/* STRINGER BOTTOM LINE */

if (stringerType == "пилообразная" || stringerType == "прямая") {
	if (stringerTurn == "площадка"){
		x2 = p1_x - turnLength + b1 + stringerOffset_y;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		}

	if (stringerTurn == "забег"){
		x2 = x1t + b1;
		y2 = y1t - h1;
		stringerShape.lineTo(x2, y2);
		}

		stringerShape.lineTo(b1, 0);
		stringerShape.lineTo(0, 0);
	}
if (stringerType == "ломаная") {
	if (stringerTurn == "площадка"){
		x2 = p1_x - turnLength + stringerWidth + stringerOffset_y;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h1;
		stringerShape.lineTo(x1, y1);
		}

	if (stringerTurn == "забег"){
		x2 = p1_x - (turnLength - L2) + stringerWidth;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h3;
		stringerShape.lineTo(x1, y1);
		x2 = x1 - L2 //+ stringerWidth;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h1;
		stringerShape.lineTo(x1, y1);
		}


		for (var i = 1; i < stairAmt1; i++) {
			x2 = x1 - b1*i;
			y2 = y1 - h1*(i-1);
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h1
			stringerShape.lineTo(x2, y2);
			}
		//y2 = y2 - h1
		//stringerShape.lineTo(x2, y2);
		x2 = x2 - b1;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo((stringerWidth + stringerOffset_x), 0);
		stringerShape.lineTo(stringerOffset_x, 0);

	}
}//end of stairAmt1 > 2
	return stringerShape;
}//end of drawStringer1


/**
  внутренний косоур нижнего марша
*/
function drawStringer2(
			model, stringerTurn , stringerType,
			h1, b1, a1, stairAmt1, h3, L1, L2,
			turnLength, scale, stringerSideOffset) {

	if (stringerTurn == "площадка"){
		var stringerShape = drawStringer1(
								model, stringerTurn , stringerType,
								h1, b1,a1, stairAmt1, h3, L1, L2,
								turnLength, scale, stringerSideOffset);
		return stringerShape;
		}



	if (stringerTurn == "забег"){
		var stringerOffset_x = 0;
		var stringerOffset_y = 0;

		if (model == "ко") {
			stringerOffset_x = a1-b1;
			stringerOffset_y = treadThickness;
			}

		var stringerShape = new THREE.Shape();
		stringerShape.moveTo(stringerOffset_x, 0);



		if (stairAmt1 == 0) {
			x1 = stringerOffset_x;
			y1 = h1*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + 100*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			stringerShape.lineTo(x2, 0);
			stringerShape.lineTo(stringerOffset_x*scale, 0);

			return stringerShape;
			}

	/* STRINGER TOP LINE */
		if (stringerType == "пилообразная" || stringerType == "ломаная") {
			for (var i = 1; i < stairAmt1; i++) {
				x1 = b1*(i-1)*scale + stringerOffset_x*scale;
				y1 = h1*i*scale - stringerOffset_y*scale;
				stringerShape.lineTo(x1, y1);
				x2 = x1 + b1*scale;
				y2 = y1;
				stringerShape.lineTo(x2, y2);
				}
			if (stairAmt1 == 1) {
				x2 = stringerOffset_x*scale;
				y2 = -stringerOffset_y*scale;
				}

			//последний подъем
			x1 = x2// + b1*scale;
			y1 = y2 + h1*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + b1*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);

			//забег 1
			x1 = x2;
			y1 = y2 + h1*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + L1*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			//сохраняем точку
			x1t = x1;
			y1t = y1;

			//зад площадки
			if (stringerType != "ломаная"){
				p1_x = x2;
				p1_y = y2 - h1*scale - (b1 - L1) * h1 / b1;
				stringerShape.lineTo(p1_x, p1_y);
				}
			else {
				p1_x = x2;
				p1_y = y2 - h1*scale - stringerWidth*scale;
				stringerShape.lineTo(p1_x, p1_y);

				}

			}
		if (stringerType == "прямая") {
			stringerShape.lineTo(0, h1*scale);

			x1 = b1*stairAmt1*scale;
			y1 = h1*(stairAmt1+1)*scale;
			stringerShape.lineTo(x1, y1);

			x2 = x1 + L1 *scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);

			//зад площадки
			x1 = x2;
			y1 = y2 - h1*scale - (b1 - L1) * h1 / b1;
			stringerShape.lineTo(x1, y1);
			}

		/*stringer bottom line*/
		if (stringerType == "пилообразная" || stringerType == "прямая") {
			stringerShape.lineTo(b1*scale, 0);
			stringerShape.lineTo(0, 0);
			}

		if (stringerType == "ломаная") {
			x2 = p1_x - b1*scale - L1*scale + stringerWidth*scale;
			y2 = p1_y;
			stringerShape.lineTo(x2, y2);
			x1 = x2;
			y1 = y2 - h1*scale;
			stringerShape.lineTo(x1, y1);



		for (var i = 1; i < stairAmt1-1; i++) {
			x2 = x1 - b1*i*scale;
			y2 = y1 - h1*(i-1)*scale;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h1*scale
			stringerShape.lineTo(x2, y2);
			}

		x2 = x2 - b1*scale;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo(stringerWidth, 0);
		stringerShape.moveTo(stringerOffset_x, 0);

			}

		return stringerShape;
		}



}//end of drawStringer2


/**
  внешний косоур верхнего марша
 */
function drawStringer3(model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, extShiftTop, stringerSideOffset) {

	var stringerOffset_x = 0;
	var stringerOffset_y = 0;

	if (model == "ко") {
		stringerOffset_x = a3-b3;
		stringerOffset_y = treadThickness;
		}

	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x, -stringerOffset_y);

	/*stringer top line*/
	if (stringerType == "пилообразная" || stringerType == "ломаная") {

	if (stringerTurn == "площадка"){

	//площадка
	x1 = stringerOffset_x;
	y1 = Math.max(h1, h3) - stringerOffset_y;
	if (stringerType == "ломаная") y1 = stringerWidth - stringerOffset_y;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + turnLength;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//прямые ступени
	x0 = x2;
	y0 = y2;
	for (var i = 1; i < stairAmt3; i++) {
		x1 = b3*(i-1) + x0;
		y1 = h3*i + y0
		stringerShape.lineTo(x1, y1);
		x2 = b3*i + x0;
		y2 = h3*i + y0;
		stringerShape.lineTo(x2, y2);
		}

	//последний подъем
	if (stairAmt3 !=0) {
		x1 = x2;
		y1 = y2 + h3;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3 - stringerOffset_x + extShiftTop;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	}

	if (stringerTurn == "забег"){

	//первый забег
	x1 = stringerOffset_x;
	y1 = Math.max(h1, h3) - stringerOffset_y;
	if (stringerType == "ломаная") y1 = stringerWidth - stringerOffset_y;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + (turnLength-L2);
	if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6));
	//console.log(x1, x2)
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	//сохраняем точку
	x1t = x2;
	y1t = y2;

	//второй забег
	x1 = x2;
	y1 = y2 + h3;
	stringerShape.lineTo(x1, y1);
	x2 = turnLength;
	if (model == 'ко') x2 = x2 + L1;
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	//сохраняем
	x2t = x2;
	y2t = y2;


	//прямые ступени
	x0 = x2;
	y0 = y2;
	for (var i = 1; i < stairAmt3; i++) {
		x1 = b3*(i-1) + x0;
		y1 = h3*i + y0
		stringerShape.lineTo(x1, y1);
		x2 = b3*i + x0;
		y2 = h3*i + y0;
		stringerShape.lineTo(x2, y2);
		}

		if (stairAmt3 ==0) {
			x2 = x2 + L1 - stringerOffset_x;
			if (model == 'ко') x2 = turnLength + L1;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}
		else {
			//последний подъем
			x1 = x2;
			y1 = y2 + h3;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + a3 - stringerOffset_x + extShiftTop;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}

	}
	//зад марша
	p1_x = x2;
	p1_y = y2 - h3;
	if (stringerType == "ломаная") p1_y = y2 - stringerWidth;
	stringerShape.lineTo(p1_x, p1_y);
	}

	if (stringerType == "прямая") {
		if (stringerTurn == "площадка"){

	//площадка
	x1 = 0;
	y1 = Math.max(h1, h3);
	stringerShape.lineTo(x1, y1);
	x2 = x1 + turnLength - b3;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	if (stairAmt3 ==0){
		x2 = x2 + b3;
		stringerShape.lineTo(x2, y2);
		}
	else{
		//последний подъем
		x1 = b3*stairAmt3 + x2;
		y1 = h3*stairAmt3 + y2;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3 + extShiftTop;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

	//зад марша
	x1 = x2;
	y1 = y2 - h3;
	stringerShape.lineTo(x1, y1);

	}

	if (stringerTurn == "забег"){

	//первый забег
	x1 = 0;
	y1 = Math.max(h1, h3);
	stringerShape.lineTo(x1, y1);

	//сохраняем точку
	x1t = x1 + (turnLength-L2);
	y1t = y1;

	//второй забег
	x1 = x1 + (turnLength-L2);
	y1 = y1 + h3;
	stringerShape.lineTo(x1, y1);

	if (stairAmt3 ==0){
		x2 = x1 + L1 + L2;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем
		x2t = x2;
		y2t = y2 + h3;
		}

	else {
		x2 = x1 + L2;
		y2 = y1 + h3;
		stringerShape.lineTo(x2, y2);
		//сохраняем
		x2t = x2;
		y2t = y2 - h3;
		//последний подъем
		x1 = x2 + b3*(stairAmt3-1);
		y1 = y2 + h3*(stairAmt3-1);
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

	//зад марша
	x1 = x2;
	y1 = y2 - h3;
	stringerShape.lineTo(x1, y1);

	}



	}//end of stringerType == "прямая"


	/*stringer bottom line*/

	if (stringerType == "пилообразная" || stringerType == "прямая") {

	if (stringerTurn == "площадка"){
		x2 = turnLength + stringerOffset_x;
		y2 = -stringerOffset_y;
		stringerShape.lineTo(x2, y2);
		}

	if (stringerTurn == "забег"){
		if (stairAmt3 !=0 || stringerType == "пилообразная") {
			x1 = x2t;
			y1 = y2t - h3;
			stringerShape.lineTo(x1, y1);
			x2 = x1t;
			y2 = y1t - Math.max(h1, h3);
			stringerShape.lineTo(x2, y2);
			}
		}
	}

	if (stringerType == "ломаная") {
		if (stairAmt3 !=0) {
			x2 = p1_x - a3 + stringerWidth;
			y2 = p1_y;
			stringerShape.lineTo(x2, y2);
			x1 = x2;
			y1 = y2 - h3;
			stringerShape.lineTo(x1, y1);

		for (var i = 1; i < stairAmt3; i++) {
			x2 = x1 - b3*i;
			y2 = y1 - h3*(i-1);
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h3
			stringerShape.lineTo(x2, y2);
			}

		if (stringerTurn == "площадка"){

			x2 = turnLength// + a3;
			y2 = -stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			}

		if (stringerTurn == "забег"){
			x1 = x2 - L2;
			if (model == 'ко') x1 = x2 + (L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6));
			y1 = y2// - h3;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = y1 - h3;
			stringerShape.lineTo(x2, y2);
			}
		}

	if (stairAmt3 ==0 && stringerTurn == "забег") {
		x2 = p1_x - (L1 + L2 - stringerWidth-stringerOffset_x);
		if (model == 'ко') x2 = p1_x;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		y2 = y2 - h3;
		stringerShape.lineTo(x2, y2);
		}
	}
	//stringerShape.lineTo(0, 0);
	stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);


	return stringerShape;
}//end of drawStringer3


/**
  внутренний косоур верхнего марша
 */
function drawStringer4(model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, extShiftTop, stringerSideOffset) {

	var stringerOffset_x = 0;
	var stringerOffset_y = 0;

	if (model == "ко") {
		stringerOffset_x = a3-b3;
		stringerOffset_y = treadThickness;
		}

	var stringerShape = new THREE.Shape();
	//stringerShape.moveTo(stringerOffset_x, 0);
	stringerShape.moveTo(0, 0);

	/*stringer top line*/
	if (stringerType == "пилообразная" || stringerType == "ломаная") {

	if (stringerTurn == "площадка"){
			//выступ под площадкой
			if (model == "ко") {
			//console.log (stringerSideOffset);
			//
			x1 = -stringerSideOffset;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h3 - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			x2 = 0;
			stringerShape.lineTo(x2, y2);
			}
		else {
			//первый подъем
			x2 = 0//stringerOffset_x;
			y2 = h3 - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			}

		//прямые ступени
		x0 = x2;
		y0 = y2;
		for (var i = 1; i < stairAmt3; i++) {
			x1 = b3*(i-1) + x0;
			y1 = h3*i + y0
			stringerShape.lineTo(x1, y1);
			x2 = b3*i + x0;
			y2 = h3*i + y0;
			stringerShape.lineTo(x2, y2);
			}
		}


	if (stringerTurn == "забег"){
	//выступ под площадкой
		if (model == "ко") {
			x1 = -stringerSideOffset;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h3 - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			x1 = - (stringerSideOffset - L1)/Math.tan(Math.PI/6);
			y1 = y2;
			stringerShape.lineTo(x1, y1);
			x1 = x1;
			y1 = y1 + h3;
			stringerShape.lineTo(x1, y1);

			x2 = L1 - stringerSideOffset*Math.tan(Math.PI/6);
			y2 = y1
			stringerShape.lineTo(x2, y2);

			x2 = x2;
			y2 = y2 + h3;
			stringerShape.lineTo(x2, y2);

			x2 = L1;
			y2 = y2;
			stringerShape.lineTo(x2, y2);
			}
		else {
			//первый подъем
			x2 = 0;
			y2 = 3*h3;
			stringerShape.lineTo(x2, y2);
			}

		//прямые ступени
		x0 = x2;
		y0 = y2;
		for (var i = 1; i < stairAmt3; i++) {
			x1 = b3*(i-1) + x0;
			y1 = h3*i + y0
			stringerShape.lineTo(x1, y1);
			x2 = b3*i + x0;
			y2 = h3*i + y0;
			stringerShape.lineTo(x2, y2);
			}
		}
	if (stairAmt3 ==0) {
		x2 = x2 + L1 - stringerOffset_x;
		if (model == "ко") x2 = L1 //stringerSideOffset// + L1;
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}
	else {
		//последний подъем
		x1 = x2;
		y1 = y2 + h3;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3 - stringerOffset_x + extShiftTop;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	//зад марша
	p1_x = x2;
	p1_y = y2 - h3;
	if (stringerType == "ломаная") p1_y = y2 - stringerWidth;
	stringerShape.lineTo(p1_x, p1_y);

	}

	if (stringerType == "прямая") {


	if (stringerTurn == "площадка"){
		//первый подъем
		x2 = 0;
		y2 = h3*2;
		stringerShape.lineTo(x2, y2);

	if (stairAmt3 ==0) {
	/*
		x2 = x2 + L1 - stringerOffset_x;
		y2 = y2;
		stringerShape.lineTo(x2, y2);*/
		}
	else {
		x1 = b3*(stairAmt3 - 1);
		y1 = h3*(stairAmt3 + 1);
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3 + extShiftTop;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	}


	if (stringerTurn == "забег"){



	if (stairAmt3 ==0) {
		//первый подъем
		x2 = 0;
		y2 = 3*h3;
		stringerShape.lineTo(x2, y2);
		//последний подъем
		x2 = x2 + L1 - stringerOffset_x;
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}
	else {
		//первый подъем
		x2 = 0;
		y2 = 4*h3;
		stringerShape.lineTo(x2, y2);
		//последний подъем
		x1 = b3*(stairAmt3 - 1);
		y1 = h3*(stairAmt3 + 3);
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

		}

	//зад марша
	p1_x = x2;
	p1_y = y2 - h3;
	stringerShape.lineTo(p1_x, p1_y);

	}

	/*stringer bottom line*/
	//if (stringerType == "пилообразная" || stringerType == "прямая") {
	if (stringerType != "ломаная" || stairAmt3 == 0) {

	if (stringerTurn == "забег"){
	if (stairAmt3 ==0) {
		if (model == "ко") x2 = p1_x//(L1 + 130);
		else p1_x//x2 = 130;
		y2 = p1_y - treadThickness;//2*h3 + 130*h3/b3;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset);
		else x1 = 70;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
	}
	else {
		if (model == "ко") x2 = (L1 + 130);
		else x2 = 130;
		y2 = 2*h3 + 130*h3/b3;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset);
		else x1 = 70;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
		}
	}
	//stringerShape.lineTo(stringerOffset_x, 0);
	stringerShape.lineTo(0, 0);

	}

	//if (stringerType == "ломаная") {
	else {
			x2 = p1_x - a3 + stringerWidth;
			y2 = p1_y;
			stringerShape.lineTo(x2, y2);
			x1 = x2;
			y1 = y2 - h3;
			stringerShape.lineTo(x1, y1);

		for (var i = 1; i < stairAmt3; i++) {
			x2 = x1 - b3*i;
			y2 = y1 - h3*(i-1);
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h3
			stringerShape.lineTo(x2, y2);
			}


		if (model == "ко") stringerShape.lineTo((120 - stringerSideOffset), 0);
		else stringerShape.lineTo(stringerWidth, 0);
		stringerShape.lineTo(0, 0);

	}

	return stringerShape;
}//end of drawStringer4


/**
  дополнительный косоур внешний косоур верхнего марша
  (дополнительные косоуры на широком марше)
 */
function drawStringer4mid(model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, stringerSideOffset) {

	var stringerOffset_x = 0;
	//var stringerOffset_y = 0;
	var stringerOffset_y = treadThickness;

	if (model == "ко") {
		stringerOffset_x = a3-b3;
		stringerOffset_y = treadThickness;
		}

	var stringerShape = new THREE.Shape();
	//stringerShape.moveTo(stringerOffset_x, 0);
	stringerShape.moveTo(0, 0);

	/*stringer top line*/
	if (stringerType == "пилообразная" || stringerType == "ломаная") {

	if (stringerTurn == "площадка"){
			//выступ под площадкой
			if (model == "ко") {
			//console.log (stringerSideOffset);
			//
			x1 = -stringerSideOffset;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h3 - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			x2 = 0//stringerSideOffset;
			stringerShape.lineTo(x2, y2);
			}
		else {
			//первый подъем
			x2 = 0//stringerOffset_x;
			y2 = h3 - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			}

		//прямые ступени
		x0 = x2;
		y0 = y2;
		for (var i = 1; i < stairAmt3; i++) {
			x1 = b3*(i-1) + x0;
			y1 = h3*i + y0
			stringerShape.lineTo(x1, y1);
			x2 = b3*i + x0;
			y2 = h3*i + y0;
			stringerShape.lineTo(x2, y2);
			}
		}


	if (stringerTurn == "забег"){
	//выступ под площадкой
		if (model == "ко") {
			x1 = -stringerSideOffset;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h3 - stringerOffset_y;
			stringerShape.lineTo(x2, y2);
			x1 = - (stringerSideOffset - L1)/Math.tan(Math.PI/6);
			y1 = y2;
			stringerShape.lineTo(x1, y1);
			x1 = x1;
			y1 = y1 + h3;
			stringerShape.lineTo(x1, y1);

			x2 = L1 - stringerSideOffset*Math.tan(Math.PI/6);
			y2 = y1
			stringerShape.lineTo(x2, y2);

			x2 = x2;
			y2 = y2 + h3;
			stringerShape.lineTo(x2, y2);

			x2 = L1;
			y2 = y2;
			stringerShape.lineTo(x2, y2);
			}
		else {
			//первый подъем
			x2 = 0;
			y2 = 3*h3;
			stringerShape.lineTo(x2, y2);
			}

		//прямые ступени
		x0 = x2;
		y0 = y2;
		for (var i = 1; i < stairAmt3; i++) {
			x1 = b3*(i-1) + x0;
			y1 = h3*i + y0
			stringerShape.lineTo(x1, y1);
			x2 = b3*i + x0;
			y2 = h3*i + y0;
			stringerShape.lineTo(x2, y2);
			}
		}
	if (stairAmt3 ==0) {
		x2 = x2 + L1 - stringerOffset_x;
		if (model == "ко") x2 = L1 //stringerSideOffset// + L1;
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}
	else {
		//последний подъем
		x1 = x2;
		y1 = y2 + h3;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3 - stringerOffset_x;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	//зад марша
	p1_x = x2;
	p1_y = y2 - h3;
	if (stringerType == "ломаная") p1_y = y2 - stringerWidth;
	stringerShape.lineTo(p1_x, p1_y);

	}

	if (stringerType == "прямая") {


	if (stringerTurn == "площадка"){
		//первый подъем
		x2 = 0;
		y2 = h3*2;
		stringerShape.lineTo(x2, y2);

	if (stairAmt3 ==0) {
	/*
		x2 = x2 + L1 - stringerOffset_x;
		y2 = y2;
		stringerShape.lineTo(x2, y2);*/
		}
	else {
		x1 = b3*(stairAmt3 - 1);
		y1 = h3*(stairAmt3 + 1);
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	}


	if (stringerTurn == "забег"){



	if (stairAmt3 ==0) {
		//первый подъем
		x2 = 0;
		y2 = 3*h3;
		stringerShape.lineTo(x2, y2);
		//последний подъем
		x2 = x2 + L1 - stringerOffset_x;
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}
	else {
		//первый подъем
		x2 = 0;
		y2 = 4*h3;
		stringerShape.lineTo(x2, y2);
		//последний подъем
		x1 = b3*(stairAmt3 - 1);
		y1 = h3*(stairAmt3 + 3);
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

		}

	//зад марша
	p1_x = x2;
	p1_y = y2 - h3;
	stringerShape.lineTo(p1_x, p1_y);

	}

	/*stringer bottom line*/
	//if (stringerType == "пилообразная" || stringerType == "прямая") {
	if (stringerType != "ломаная" || stairAmt3 == 0) {

	if (stringerTurn == "забег"){
	if (stairAmt3 ==0) {
		if (model == "ко") x2 = p1_x//(L1 + 130);
		else p1_x//x2 = 130;
		y2 = p1_y - treadThickness;//2*h3 + 130*h3/b3;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset);
		else x1 = 70;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
	}
	else {
		if (model == "ко") x2 = (L1 + 130);
		else x2 = 130;
		y2 = 2*h3 + 130*h3/b3;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset);
		else x1 = 70;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
		}
	}
	//stringerShape.lineTo(stringerOffset_x, 0);
	stringerShape.lineTo(0, 0);

	}

	//if (stringerType == "ломаная") {
	else {
			x2 = p1_x - a3 + stringerWidth;
			y2 = p1_y;
			stringerShape.lineTo(x2, y2);
			x1 = x2;
			y1 = y2 - h3;
			stringerShape.lineTo(x1, y1);

		for (var i = 1; i < stairAmt3; i++) {
			x2 = x1 - b3*i;
			y2 = y1 - h3*(i-1);
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h3
			stringerShape.lineTo(x2, y2);
			}


		if (model == "ко") stringerShape.lineTo((120 - stringerSideOffset), 0);
		else stringerShape.lineTo(stringerWidth, 0);
		stringerShape.lineTo(0, 0);

	}

	return stringerShape;
}//end of drawStringer4mid


/*внешний косоур среднего марша П-образной лестницы*/

function drawStringer5(
			model,
			stringerType,
			turnType_1, turnType_2,
			h1, b1, stairAmt1,
			h2, b2, stairAmt2,
			h3, b3, stairAmt3,
			a2, a3, L1, L2, turnLength,
			marshDist, scale, stringerSideOffset) {


	var stringerOffset_x = 0;
	var stringerOffset_y = 0;

	if (model == "ко") {
		stringerOffset_x = a2-b2;
		stringerOffset_y = treadThickness;
		//console.log(stringerOffset_y);
		}

	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x, -stringerOffset_y);


/*stringer top line*/

	if (stringerType == "пилообразная" || stringerType == "ломаная") {


	/*низ марша*/
	stringerPlatformHeight = Math.max(h1, h2);
	if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

	if (turnType_1 == "площадка") {
		//площадка
		x1 = stringerOffset_x;
		y1 = stringerPlatformHeight*scale - stringerOffset_y*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + turnLength*scale - stringerOffset_x*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//базовая точка для прямых ступеней
		x0 = x2;
		y0 = y2;
		}

	if (turnType_1 == "забег") {

		//первый забег
		x1 = stringerOffset_x*scale;
		y1 = Math.max(h1, h2)*scale - stringerOffset_y*scale;
		if (stringerType == "ломаная") y1 = stringerWidth*scale - stringerOffset_y*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + (turnLength-L2)*scale;
		if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6))*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x2;
		y1t = y2;

		//второй забег
		x1 = x2;
		y1 = y2 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = turnLength*scale;
		if (model == 'ко') x2 = x2 + L1*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем
		x2t = x2;
		y2t = y2;
		//базовая точка для прямых ступеней
		x0 = x2;
		y0 = y2;
		}

	/*прямые ступени*/

	for (var i = 1; i < stairAmt2; i++) {
			x1 = b2*(i-1)*scale + x0;
			y1 = h2*i*scale + y0
			stringerShape.lineTo(x1, y1);
			x2 = b2*i*scale + x0;
			y2 = h2*i*scale + y0;
			stringerShape.lineTo(x2, y2);
			}
	x0 = x2;
	y0 = y2;

	/*верх марша*/

	stringerPlatformHeight = Math.max(h2, h3);

	if (turnType_2 == "площадка"){
		//последний подъем
		x1 = x0;
		y1 = y0 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + b2*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);

		//площадка
		x1 = x2;
		y1 = y2 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + turnLength*scale - stringerSideOffset*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

	if (turnType_2 == "забег"){
		//последний подъем
		if (stairAmt2) {
			x1 = x0;
			y1 = y0 + h2*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + b2*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}
		else {
			x2 = x0 + marshDist*scale;
			y2 = y0;
			stringerShape.lineTo(x2, y2);
			}

		//забег 1
		x1 = x2;
		y1 = y2 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + L2 *scale;
		if (model == "ко") x2 = x1 + L2 *(turnLength - stringerSideOffset)/turnLength *scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x1;
		y1t = y1;

		//забег 2
		x1 = x2;
		y1 = y2 + h3*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1t + turnLength*scale;
		if (model == "ко") x2 = x2 - stringerSideOffset *scale
		y2 = y1;
		stringerShape.lineTo(x2, y2);


		}
		//зад площадки
		var p1_x = x2;
		var p1_y = y2 - stringerPlatformHeight*scale;
		if (stringerType == "ломаная") p1_y = y2 - stringerWidth*scale;
		stringerShape.lineTo(p1_x, p1_y);
	}

	if (stringerType == "прямая") {

	/*низ марша*/
	stringerPlatformHeight = Math.max(h1, h2);
	x1 = 0;
	y1 = stringerPlatformHeight*scale;
	stringerShape.lineTo(x1, y1);

	if (turnType_1 == "площадка") {
		//площадка

		x2 = x1 + turnLength*scale - b2*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//базовая точка для прямых ступеней
		x0 = x2 + b2*scale;
		y0 = y2 + h2*scale;
		}

	if (turnType_1 == "забег") {
		//первый забег
		x2 = x1 + (turnLength-L2)*scale;
		y2 = y1 + h2*scale;
		stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x2;
		y1t = y2;

		//второй забег
		//x1 = x2 //+ L2*scale;
		//y1 = y2 + h2*scale;
		//stringerShape.lineTo(x1, y1);
		x2 = x2 + L2*scale;
		y2 = y2 + h2*scale;
		if (stairAmt2) stringerShape.lineTo(x2, y2);
		//сохраняем
		x2t = x2;
		y2t = y2;
		//базовая точка для прямых ступеней
		x0 = x2;
		y0 = y2;
		}


	x0 = b2*stairAmt2*scale + x0;
	y0 = h2*(stairAmt2-1)*scale + y0;

	if (!stairAmt2) x0 = x0 + marshDist*scale;

	/*верх марша*/

	stringerPlatformHeight = Math.max(h2, h3);

	if (turnType_2 == "площадка"){
		x2 = x0
		y2 = y0 + h2*scale;
		stringerShape.lineTo(x2, y2);

		//площадка

		x2 = x2 + turnLength*scale;
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}

	if (turnType_2 == "забег"){

		//забег 1
		x1 = x0;
		y1 = y0 + h2*scale;
		if (stairAmt2) stringerShape.lineTo(x1, y1);
		x2 = x1 + L2 *scale;
		y2 = y1 + h3*scale;
		stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x1;
		y1t = y1;

		//забег 2

		x2 = x1t + turnLength*scale;
		y2 = y1t + h3*scale;
		stringerShape.lineTo(x2, y2);


		}
		//зад площадки
		var p1_x = x2;
		var p1_y = y2 - stringerPlatformHeight*scale;
		stringerShape.lineTo(p1_x, p1_y);



	}

/*stringer bottom line*/

	if (stringerType == "пилообразная" || stringerType == "прямая") {

	if (turnType_2 == "забег"){
		if (stairAmt2) {
			x1 = x1t + b2 * scale;
			y1 = y1t - h2*scale;
			stringerShape.lineTo(x1, y1);
			}
		else {
			x1 = p1_x;
			y1 = p1_y;
			}

		}
	if (turnType_2 == "площадка"){
		x1 = p1_x - turnLength*scale + b2*scale;
		y1 = p1_y;
		stringerShape.lineTo(x1, y1);
		}

	if (turnType_1 == "площадка"){
	//stringerShape.moveTo(stringerOffset_x*scale, -stringerOffset_y*scale);
		stringerShape.lineTo(turnLength*scale + stringerOffset_x*scale, -stringerOffset_y*scale);
		stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);

		}

	if (turnType_1 == "забег"){
		if (stairAmt2) {
			x1 = turnLength*scale + b2*scale;
			y1 = h2*scale + stringerPlatformHeight*scale;
			stringerShape.lineTo(x1, y1);
			}
		stringerShape.lineTo(b2*scale + stringerOffset_x*scale, -stringerOffset_y*scale);
		stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);
		}
	}

	if (stringerType == "ломаная") {

	if (turnType_2 == "забег"){
		//if (stairAmt2) {
			//второй забег
			x1 = p1_x - (turnLength - L2) * scale + stringerWidth*scale;
			y1 = p1_y //- h2*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = y1 - h3*scale;
			stringerShape.lineTo(x2, y2);
			//первый забег
			x1 = x2 - L2 * scale;
			y1 = y2;
			stringerShape.lineTo(x1, y1);
			x1 = x1;
			y1 = y1 - h2*scale;
			stringerShape.lineTo(x1, y1);

		}
	if (turnType_2 == "площадка"){
		x1 = p1_x - turnLength*scale + stringerWidth*scale;
		y1 = p1_y;
		stringerShape.lineTo(x1, y1);
		y1 = y1-h2*scale;
		stringerShape.lineTo(x1, y1);

		}

	for (var i = 1; i < stairAmt2+1; i++) {
			x2 = x1 - b2*i*scale;
			y2 = y1 - h2*(i-1)*scale;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h2*scale
			stringerShape.lineTo(x2, y2);
			}
	if (!stairAmt2) {
		x2 = x1 - marshDist*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}

	if (turnType_1 == "забег"){

		x2 = x2 - L2*scale;
		y2 = y2
		stringerShape.lineTo(x2, y2);
		y2 = y2 - h2*scale
		stringerShape.lineTo(x2, y2);
		}


	stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);
	}

	return stringerShape;
}//end of drawStringer5


/*внутренний косоур среднего марша П-образной лестницы*/

function drawStringer6(
			model,
			stringerType,
			turnType_1, turnType_2,
			h1, b1, stairAmt1,
			h2, b2, stairAmt2,
			h3, b3, stairAmt3,
			a2, a3, L1, L2, turnLength,
			marshDist, scale, stringerSideOffset) {

	var stringerOffset_x = 0;
	var stringerOffset_y = 0;

	if (model == "ко") {
		stringerOffset_x = a2-b2;
		stringerOffset_y = treadThickness;
		}
	var stringerPlatformHeight = Math.max(h1, h2);
	if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(0, 0);


	/*stringer top line*/
	if (stringerType == "пилообразная" || stringerType == "ломаная") {

	/*низ марша*/

	if (turnType_1 == "площадка") {
		if (model == "ко") {
			//выступ под площадкой
			x1 = -stringerSideOffset*scale;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = stringerPlatformHeight*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x2, y2);
			x2 = 0
			stringerShape.lineTo(x2, y2);
			}
		else {
			//первый подъем
			x2 = 0; //stringerOffset_x*scale;
			y2 = stringerPlatformHeight*scale;
			stringerShape.lineTo(x2, y2);
			}
		//базовая точка для прямых ступеней
		x0 = x2;
		y0 = y2;
		}

	if (turnType_1 == "забег") {
	//выступ под площадкой
		if (model == "ко") {
			x1 = -stringerSideOffset*scale;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h2*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x2, y2);
			x1 = - (stringerSideOffset - L1)/Math.tan(Math.PI/6)*scale;
			y1 = y2;
			stringerShape.lineTo(x1, y1);
			x1 = x1;
			y1 = y1 + h2*scale;
			stringerShape.lineTo(x1, y1);

			x2 = L1*scale - stringerSideOffset*Math.tan(Math.PI/6)*scale;
			y2 = y1
			stringerShape.lineTo(x2, y2);

			x2 = x2;
			y2 = y2 + h2*scale;
			stringerShape.lineTo(x2, y2);

			x2 = L1*scale;
			y2 = y2;
			stringerShape.lineTo(x2, y2);
			}
		else {
			//первый подъем
			x2 = 0;
			y2 = 3*h2*scale;
			stringerShape.lineTo(x2, y2);
			}

		//базовая точка для прямых ступеней
		x0 = x2;
		y0 = y2;
		}

	/*прямые ступени*/

	for (var i = 1; i < stairAmt2; i++) {
			x1 = b2*(i-1)*scale + x0;
			y1 = h2*i*scale + y0
			stringerShape.lineTo(x1, y1);
			x2 = b2*i*scale + x0;
			y2 = h2*i*scale + y0;
			stringerShape.lineTo(x2, y2);
			}
	x0 = x2;
	y0 = y2;

	/*верх марша*/

	stringerPlatformHeight = Math.max(h2, h3);
	if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

	if (turnType_2 == "площадка"){
		//последний подъем
		x1 = x0;
		y1 = y0 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + b2*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);

		//площадка
		x1 = x2;
		y1 = y2 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + turnLength*scale - stringerSideOffset*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);

		//зад площадки
		var p1_x = x2;
		var p1_y = y2 - stringerPlatformHeight*scale;
		stringerShape.lineTo(p1_x, p1_y);

		}

	if (turnType_2 == "забег"){
		//последний подъем
		if (stairAmt2) {
			x1 = x0;
			y1 = y0 + h2*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + b2*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}
		else {
			x2 = x0 + marshDist*scale;
			y2 = y0;
			stringerShape.lineTo(x2, y2);
			}

		//забег 1
		x1 = x2;
		y1 = y2 + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + L1 *scale + stringerSideOffset*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x1;
		y1t = y1;

		//зад площадки
		if (stringerType == "пилообразная") {
			if (stairAmt2) {
				p1_x = x2;
				p1_y = y2 - 2*h2*scale + L1 * h2 * scale / b2;
				stringerShape.lineTo(p1_x, p1_y);
				}
			else {
				p1_x = x2;
				p1_y = y2 - h2*scale + L1 * h2 * scale / b2;
				stringerShape.lineTo(p1_x, p1_y);
				}
			}
		if (stringerType == "ломаная") {
			p1_x = x2;
			p1_y = y2 - h2*scale - stringerWidth*scale;
			stringerShape.lineTo(p1_x, p1_y);
			}

		}

	}

	if (stringerType == "прямая") {

	/*низ марша*/

	if (turnType_1 == "площадка") {
		//площадка
		x1 = 0;
		y1 = stringerPlatformHeight*scale + h2*scale;
		stringerShape.lineTo(x1, y1);

		//базовая точка для прямых ступеней
		x0 = x1;
		y0 = y1;
		}

	if (turnType_1 == "забег") {

		//первый подъем
		x2 = 0;
		y2 = 3*h2*scale;
		stringerShape.lineTo(x2, y2);
		if (stairAmt2) {
			x2 = x2;
			y2 = y2 + h2*scale;
			stringerShape.lineTo(x2, y2);
			}
		else {
			x2 = x2 + marshDist*scale;
			y2 = y2 + h2*scale;
			stringerShape.lineTo(x2, y2);
			}
		//базовая точка для прямых ступеней
		x0 = x2;
		y0 = y2;
		}

	x0 = b2*stairAmt2*scale + x0;
	y0 = h2*stairAmt2*scale + y0;

	/*верх марша*/

	stringerPlatformHeight = Math.max(h2, h3);

	if (turnType_2 == "площадка"){
		//площадка
		x1 = x0;
		y1 = y0;
		stringerShape.lineTo(x1, y1);
		x2 = x0 + turnLength*scale;
		y2 = y0;
		stringerShape.lineTo(x2, y2);

		//зад площадки
		var p1_x = x2;
		var p1_y = y2 - stringerPlatformHeight*scale;
		stringerShape.lineTo(p1_x, p1_y);

		}

	if (turnType_2 == "забег"){
		//забег 1
		x1 = x0;
		y1 = y0// + h2*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + L1 *scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x1;
		y1t = y1;

		//зад площадки
		if (stairAmt2) {
			x1 = x2;
			y1 = y2 - 2*h2*scale + L1 * h2 * scale / b2;
			stringerShape.lineTo(x1, y1);
			}
		else {
			x1 = x2;
			y1 = y2 - h2*scale + L1 * h2 * scale / b2;
			stringerShape.lineTo(x1, y1);
			}


		}

	}


/*stringer bottom line*/

	if (stringerType == "пилообразная" || stringerType == "прямая") {

	if (turnType_2 == "забег"){
		}

	if (turnType_2 == "площадка"){
		x1 = p1_x - turnLength*scale + b2*scale;
		y1 = p1_y;
		stringerShape.lineTo(x1, y1);
		}

	if (turnType_1 == "площадка"){
		}

	if (turnType_1 == "забег"){
	/*
		if (model == "ко") x2 = (L1 + 130)*scale;
		else x2 = 130*scale;
		y2 = 2*h2*scale + 130*h2/b2*scale;
		stringerShape.lineTo(x2, y2);
		x1 = 70*scale;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
*/
		if (model == "ко") x2 = (L1 + 130)*scale;
		else x2 = 130*scale;
		y2 = 2*h2*scale + 130*h2/b2*scale;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset)*scale;
		else x1 = 70*scale;
		y1 = 0;
		stringerShape.lineTo(x1, y1);


		}


	}

	if (stringerType == "ломаная") {
		if (turnType_2 == "площадка"){
			x1 = p1_x - turnLength*scale + stringerWidth*scale;
			y1 = p1_y;
			stringerShape.lineTo(x1, y1);
			y1 = y1 - h2*scale;
			stringerShape.lineTo(x1, y1);
			}

		if (turnType_2 == "забег"){
			x1 = p1_x - L1*scale + stringerWidth*scale - stringerSideOffset*scale;
			y1 = p1_y;
			}

		for (var i = 1; i < stairAmt2+1; i++) {
			x2 = x1 - b2*i*scale;
			y2 = y1 - h2*(i-1)*scale;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h2*scale
			stringerShape.lineTo(x2, y2);
			}

		if (!stairAmt2) {
			x2 = x1 - marshDist*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}

		if (turnType_1 == "забег"){
			x2 = stringerWidth*scale;
			y2 = 0;
			stringerShape.lineTo(x2, y2);
			}


	}

	stringerShape.lineTo(0, 0);



	return stringerShape;
}//end of drawStringer6



/**
 * Добор верхней площадки
 */
function drawExtender(par) {
	var sideProfHeight = 100;
	var sideProfWidth = 50;
	var topProfHeight = 20;
	var topProfWidth = 40;

	var sideExtender = new THREE.Object3D();

	//верхняя рамка
	var shape = new THREE.Shape();

	//внешний контур
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.width);
	var p3 = newPoint_xy(p1, par.length, par.width);
	var p4 = newPoint_xy(p1, par.length, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	//внутренний контур
	var hole = new THREE.Path();
	p1 =  newPoint_xy(p0, topProfWidth, topProfWidth);
	p2 = newPoint_xy(p1, 0, par.width - 2 * topProfWidth);
	p3 = newPoint_xy(p1, par.length - 2 * topProfWidth, par.width - 2 * topProfWidth);
	p4 = newPoint_xy(p1, par.length - 2 * topProfWidth, 0);
	addLine(hole, par.dxfArr, p1, p4, par.dxfBasePoint);
	addLine(hole, par.dxfArr, p4, p3, par.dxfBasePoint);
	addLine(hole, par.dxfArr, p3, p2, par.dxfBasePoint);
	addLine(hole, par.dxfArr, p2, p1, par.dxfBasePoint);
	shape.holes.push(hole);

	var extrudeOptions = {
		amount: topProfHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var topFrame = new THREE.Mesh(geometry, par.material);
	topFrame.rotation.x = Math.PI/2;
	topFrame.position.y = -par.coverThk;
	topFrame.position.z = -par.width

	sideExtender.add(topFrame);


	//боковые профили

	var shape = new THREE.Shape();
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, sideProfHeight);
	var p3 = newPoint_xy(p1, par.width, sideProfHeight);
	var p4 = newPoint_xy(p1, par.width, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	var extrudeOptions = {
		amount: topProfWidth,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var sideProf1 = new THREE.Mesh(geometry, par.material);
	sideProf1.rotation.y = Math.PI/2;
	sideProf1.position.x = 100 - sideProfWidth;
	sideProf1.position.y = -sideProfHeight - topProfHeight - par.coverThk;
	sideExtender.add(sideProf1);

	var sideProf2 = new THREE.Mesh(geometry, par.material);
	sideProf2.rotation.y = Math.PI/2;
	sideProf2.position.x = par.length - 100;
	sideProf2.position.y = -sideProfHeight - topProfHeight - par.coverThk;
	sideExtender.add(sideProf2);

	//покрытие

	var shape = new THREE.Shape();
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.width);
	var p3 = newPoint_xy(p1, par.length, par.width);
	var p4 = newPoint_xy(p1, par.length, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	var extrudeOptions = {
		amount: par.coverThk,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var cover = new THREE.Mesh(geometry, par.coverMaterial);
	cover.rotation.x = Math.PI/2;
	cover.position.z = -par.width
	sideExtender.add(cover);



	par.mesh = sideExtender;

	return par;
}//end of drawExtender


function drawConsoles(par) {
	var profHeight = 100;
	var profWidth = 50;
	var maxDst = 1200; //максимально допустимое расстояние между подкосами
	var angle = Math.PI / 6;
	var consoles = new THREE.Object3D();

	var shape = new THREE.Shape();

	//внешний контур
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, profHeight / Math.cos(angle));
	var p3 = newPoint_xy(p2, par.width, par.width * Math.tan(angle));
	var p4 = newPoint_xy(p3, 0, -profHeight / Math.cos(angle));
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	var extrudeOptions = {
		amount: profWidth,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));

	var consoleAmt = Math.ceil(par.dst/maxDst) + 1;
	var dst = (par.dst - profWidth) / (consoleAmt - 1);
	for(var i=0; i<consoleAmt; i++){
		var console = new THREE.Mesh(geometry, par.material);
		console.rotation.y = Math.PI/2;
		console.position.x = dst * i;
		console.position.y = -profHeight / Math.cos(angle) - par.width * Math.tan(angle);
		consoles.add(console);
		}

	par.mesh = consoles;

	return par;
}//end of drawConsoles


/**
 * Подкос под верхней площадкой
 */
 
function drawBrace(par) {
	
	var brace = new THREE.Object3D();
	
	// константы
	var profHeight = 60;
	var profWidth = 30;
	var maxDst = 1200; //максимально допустимое расстояние между подкосами
	var angle = Math.PI / 6;
	var rad1 = 10;
	var rad2 = 30;
	var plateThickness = 8;
	var holeRad = 6.5;
	var jointHeight = 90;
	var jointLength = 135;
	var jointWidth = 80;
	var teethSize = 50;
	
	// стержень
	var rod = new THREE.Object3D();
	var rodShape = new THREE.Shape();
	var rodLength = (par.width - (plateThickness + 45)*2) / Math.cos(angle) + 30*2;
	// контур
	var p1 = {"x":-30, "y":-profHeight*0.5};
	var p2 = newPoint_xy(p1, 0, profHeight);
	var p3 = newPoint_xy(p2, rodLength, 0);
	var p4 = newPoint_xy(p3, 0, -profHeight);
	addLine(rodShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(rodShape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(rodShape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(rodShape, par.dxfArr, p4, p1, par.dxfBasePoint);
	// круглые отверстия
	//center1 = newPoint_xy(p0, 30, profHeight*0.5);
	center1 = {"x":0, "y":0};
	center2 = newPoint_xy(p4, -30, profHeight*0.5);
	addRoundHole(rodShape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
	addRoundHole(rodShape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
	
	var text = "Стержень подкоса"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -80);
    addText(text, textHeight, par.dxfArr, textBasePoint);
	
	var extrudeOptions = {
        amount: profWidth,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1,
	}
	
	var geometry = new THREE.ExtrudeGeometry(rodShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    rod = new THREE.Mesh(geometry, par.material);

	rod.position.x = (jointLength + profWidth)*0.5;
	rod.position.y = jointHeight*0.5;
	rod.position.z = plateThickness + 45;
	rod.rotation.x = -angle;
	rod.rotation.y = -Math.PI*0.5;

    brace.add(rod);

	// кронштейн
	
	// Фланец кронштейна
	par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, -200);
	var wallPlateShape = new THREE.Shape();
	// контур
	var p0 = {"x":0, "y":0};
	var p1 = newPoint_xy(p0, 0, rad1);
	var p2 = newPoint_xy(p0, 0, jointHeight - rad1);
	addLine(wallPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	var pc = newPoint_xy(p1, rad1, 0);
	p2 = newPoint_xy(p1, rad1, rad1);
	addArc(wallPlateShape, par.dxfArr, pc, rad1, Math.PI, Math.PI * 0.5, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, jointLength - rad1*2, 0);
	addLine(wallPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	pc = newPoint_xy(p1, 0, -rad1);
	p2 = newPoint_xy(p1, rad1, -rad1);
	addArc(wallPlateShape, par.dxfArr, pc, rad1, Math.PI * 0.5, 0, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, -(jointHeight - rad1*2));
	addLine(wallPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	pc = newPoint_xy(p1, -rad1, 0);
	p2 = newPoint_xy(p1, -rad1, -rad1);
	addArc(wallPlateShape, par.dxfArr, pc, rad1, Math.PI * 2, Math.PI * 1.5, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p0, rad1, 0);
	addLine(wallPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	pc = newPoint_xy(p1, 0, rad1);
	p2 = newPoint_xy(p1, -rad1, rad1);
	addArc(wallPlateShape, par.dxfArr, pc, rad1, Math.PI * 1.5, Math.PI, par.dxfBasePoint);
	// круглые отверстия
	center1 = newPoint_xy(p0, 20, 15);
	center2 = newPoint_xy(p0, 20, jointHeight - 15);
	center3 = newPoint_xy(p0, jointLength - 20, jointHeight - 15);
	center4 = newPoint_xy(p0, jointLength - 20, 15);
	addRoundHole(wallPlateShape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
	addRoundHole(wallPlateShape, par.dxfArr, center2, holeRad, par.dxfBasePoint);
	addRoundHole(wallPlateShape, par.dxfArr, center3, holeRad, par.dxfBasePoint);
	addRoundHole(wallPlateShape, par.dxfArr, center4, holeRad, par.dxfBasePoint);
	// прямоугольные отверстия
	/*первое прямоугольное отверстие*/
    var hole1 = new THREE.Path();
    var p1 = newPoint_xy(p0, (jointLength - (profWidth - 1))/2 - (plateThickness + 2), (jointHeight - (teethSize + 2))/2);
	var p2 = newPoint_xy(p1, plateThickness + 2, 0);
    var p3 = newPoint_xy(p2, 0, teethSize + 2);
    var p4 = newPoint_xy(p3, -(plateThickness + 2), 0);
    addLine(hole1, par.dxfArr, p1, p2, par.dxfBasePoint);
    addLine(hole1, par.dxfArr, p2, p3, par.dxfBasePoint);
    addLine(hole1, par.dxfArr, p3, p4, par.dxfBasePoint);
    addLine(hole1, par.dxfArr, p4, p1, par.dxfBasePoint);
    wallPlateShape.holes.push(hole1);
	/*второе прямоугольное отверстие*/
	var hole2 = new THREE.Path();
    var p1 = newPoint_xy(p0, (jointLength + (profWidth - 1))/2, (jointHeight - (teethSize + 2))/2);
    var p2 = newPoint_xy(p1, plateThickness + 2, 0);
    var p3 = newPoint_xy(p2, 0, teethSize + 2);
    var p4 = newPoint_xy(p3, -(plateThickness + 2), 0);
    addLine(hole2, par.dxfArr, p1, p2, par.dxfBasePoint);
    addLine(hole2, par.dxfArr, p2, p3, par.dxfBasePoint);
    addLine(hole2, par.dxfArr, p3, p4, par.dxfBasePoint);
    addLine(hole2, par.dxfArr, p4, p1, par.dxfBasePoint);
    wallPlateShape.holes.push(hole2);
	
	var text = "Фланец кронштейна"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -80);
    addText(text, textHeight, par.dxfArr, textBasePoint);
	
	var extrudeOptions = {
        amount: plateThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1,
	}
	
	var geometry = new THREE.ExtrudeGeometry(wallPlateShape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	wallPlate1 = new THREE.Mesh(geometry, par.material);

	wallPlate1.position.x = 0;
	wallPlate1.position.y = 0;
	wallPlate1.position.z = 0;

    brace.add(wallPlate1);

	if (par.topJoin == true) {
		wallPlate2 = new THREE.Mesh(geometry, par.material);

		wallPlate2.position.x = 0;
		wallPlate2.position.y = (rodLength - 30*2) * Math.sin(angle);
		wallPlate2.position.z = par.width - plateThickness;

		brace.add(wallPlate2);
	}

	// Косынка кронштейна
	
	par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 300, 0);
	
	//var rodPlate = new THREE.Object3D();
	var rodPlateShape = new THREE.Shape();
	// контур
	var p0 = {"x":0, "y":0};
	var p1 = copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, (jointHeight - teethSize)/2);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, -plateThickness, 0);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, teethSize);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, plateThickness, 0);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, (jointHeight - teethSize)/2);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, jointWidth - rad2, 0);
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	var pc = newPoint_xy(p1, 0, -rad2);
	p2 = newPoint_xy(p1, rad2, -rad2);
	addArc(rodPlateShape, par.dxfArr, pc, rad2, Math.PI * 0.5, 0, par.dxfBasePoint);
	p1 = copyPoint(p2);
	p2 = newPoint_xy(p1, 0, -(jointHeight - rad2*2));
	addLine(rodPlateShape, par.dxfArr, p1, p2, par.dxfBasePoint);
	p1 = copyPoint(p2);
	var pc = newPoint_xy(p1, -rad2, 0);
	p2 = newPoint_xy(p1, -rad2, -rad2);
	addArc(rodPlateShape, par.dxfArr, pc, rad2, Math.PI * 2, Math.PI * 1.5, par.dxfBasePoint);
	addLine(rodPlateShape, par.dxfArr, p2, p0, par.dxfBasePoint);
	// отверстия
	center1 = newPoint_xy(p0, 45, jointHeight*0.5);
	addRoundHole(rodPlateShape, par.dxfArr, center1, holeRad, par.dxfBasePoint);
	
	var text = "Косынка кронштейна"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -80);
    addText(text, textHeight, par.dxfArr, textBasePoint);
	
	/*var extrudeOptions = {
        amount: plateThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1,
	}*/
	
	var geometry = new THREE.ExtrudeGeometry(rodPlateShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    rodPlate1 = new THREE.Mesh(geometry, par.material);

	rodPlate1.position.x = (jointLength - (profWidth - 1))/2 - 1;
	rodPlate1.position.y = 0;
	rodPlate1.position.z = plateThickness;
	rodPlate1.rotation.y = -Math.PI*0.5;

    brace.add(rodPlate1);
	
	rodPlate2 = new THREE.Mesh(geometry, par.material);
	rodPlate2.position.x = (jointLength + (profWidth - 1))/2 + (plateThickness + 1);
	rodPlate2.position.y = 0;
	rodPlate2.position.z = plateThickness;
	rodPlate2.rotation.y = -Math.PI*0.5;

    brace.add(rodPlate2);
	
	if (par.topJoin == true) {
		rodPlate3 = new THREE.Mesh(geometry, par.material);
		rodPlate3.position.x = (jointLength - (profWidth - 1))/2 - (plateThickness + 1);
		rodPlate3.position.y = (rodLength - 30*2) * Math.sin(angle);
		rodPlate3.position.z = par.width - plateThickness;
		rodPlate3.rotation.y = Math.PI*0.5;

		brace.add(rodPlate3);
		
		rodPlate4 = new THREE.Mesh(geometry, par.material);
		rodPlate4.position.x = (jointLength + (profWidth - 1))/2 + 1;
		rodPlate4.position.y = (rodLength - 30*2) * Math.sin(angle);
		rodPlate4.position.z = par.width - plateThickness;
		rodPlate4.rotation.y = Math.PI*0.5;

		brace.add(rodPlate4);
	}
	brace.params = {
		height: (rodLength - 30*2) * Math.sin(angle),	// расстояние между отверстиями по вертикали
		jointHeight: jointHeight,	// высота соединения (проушины)
		jointLength: jointLength	// Длина соединения (проушины)
	};

	return brace;
}//end of drawBrace

/**
 * Колона под площадкой
 * без/с фланцем
 */
function drawColumnF(par) {
	var shape = new THREE.Shape();

	// внешний контур
	var p0 =  {x:0,y:0};
	var p1 =  copyPoint(p0);
	var p2 = newPoint_xy(p1, 0, par.colLength);
	var p3 = newPoint_xy(p1, par.profWidth, par.colLength);
	var p4 = newPoint_xy(p1, par.profWidth, 0);
	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	var extrudeOptions = {
		amount: par.profHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var col = new THREE.Mesh(geometry, par.material);

	//par.mesh = col;
    var grp = new THREE.Object3D();
    grp.add(col);

    // фланец
	if (par.flanMaterial !== undefined) {
		var flanThickness = 8.0;
		col.position.z = par.dir == "left" ? flanThickness : -flanThickness;
		var flan = drawFlanColumn(par, par.flanMaterial);
    	flan.position.x = 0.0;
    	flan.position.y = par.colLength - 46.0;
    	flan.position.z = par.dir == "left" ? 0.0 : par.profHeight - flanThickness;
    	flan.rotation.x = 0.0;
    	flan.rotation.y = 0.0;
    	flan.rotation.z = 0.0;
    	grp.add(flan);
	}

	par.mesh = grp;


	return par;
}//end of drawColumn



/**
 * из ЛТ
 */



/**
 * положение уголков под площадкой при изменении ширины марша
 */
function selectStepHoleXrear1(between) {
	if (between < 650.0) return 80.0;
	else if (between < 800.0) return 110.0;
	else if (between < 1000.0) return 150.0;
	return 200.0;
}


/**
 * ЧЕРЧЕНИЕ ПЕРЕМЫЧКИ
 */
function drawBrigeShape(stringerParams) {
    var text = 'Перемычка';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var brigeShape = new THREE.Shape();

	var spacing = params.carcasPartsSpacing; //зазор для проверки модели
	var bridgeWidth = 105.0;
	var stringersDist = stringerParams.treadWidth + stringerParams.treadSideOffset * 2;
	var bridgeLength = stringersDist - spacing * 2; //учитываем зазор
	//console.log(params.carcasPartsSpacing)
    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, spacing, 0);
	var p2 = newPoint_xy(p0, spacing, -bridgeWidth);
    var p3 = newPoint_xy(p2, bridgeLength, 0.0);
    var p4 = newPoint_xy(p1, bridgeLength, 0.0);
    addLine(brigeShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(brigeShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(brigeShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addLine(brigeShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

    var holes = brigeShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(center1, stringersDist - 60.0, 0.0);
    var center4 = newPoint_xy(center2, stringersDist - 60.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
	var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(center1, stepHoleXrear1, 0.0);
    center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
    center3 = newPoint_xy(center3, -stepHoleXrear1, 0.0);
    center4 = newPoint_xy(center3, -stringerParams.holeDistU2_200, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    return brigeShape;
}//end of drawBrigeShape

/**
 * Перемычка
 * уголки крепления к тетивам
 * уголки крепления ступени
 *
 */
function drawBridgeAngles(stringerParams, ptIns) {
    var bridgeMaterial = new THREE.MeshLambertMaterial({ color: 0x068636, wireframe: false });

    var bridgeExtrudeOptions = {
        amount: stringerParams.bridgeThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    // перемычка
    var brigeShape = drawBrigeShape(stringerParams);
    var geom = new THREE.ExtrudeGeometry(brigeShape, bridgeExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var brige = new THREE.Mesh(geom, bridgeMaterial);
    brige.position.x = ptIns.x + stringerParams.bridgeThickness + stringerParams.bridgeThickness + 60.0;
    brige.position.y = ptIns.y + 0.0;
    brige.position.z = stringerParams.stringerThickness;
    brige.rotation.x = 0.0;
    brige.rotation.y = Math.PI * 1.5;
    brige.rotation.z = 0.0;
    brige.castShadow = true;
    stringerParams.group.add(brige);

    // уголки крепления к тетивам
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x + stringerParams.bridgeThickness + 60.0;
    angle0.position.y = ptIns.y;
    angle0.position.z = stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x + stringerParams.bridgeThickness + 60.0;
    angle0.position.y = ptIns.y - 100.0;
    angle0.position.z = stringerParams.stringerThickness + stringerParams.treadWidth + stringerParams.treadSideOffset * 2;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления ступени
    var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);
    var angle1 = drawAngleSupport("У2-40х40х200");
    angle1.position.x = ptIns.x + stringerParams.bridgeThickness + 60.0;
    angle1.position.y = ptIns.y;
    angle1.position.z = stringerParams.stringerThickness + stepHoleXrear1 + 5.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х200");
    angle1.position.x = ptIns.x + stringerParams.bridgeThickness + 60.0;
    angle1.position.y = ptIns.y;
    angle1.position.z = stringerParams.stringerThickness + stringerParams.treadWidth +
          stringerParams.treadSideOffset * 2 - 200.0 - stepHoleXrear1 - 5.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.treadWidth + stringerParams.treadSideOffset * 2 + stringerParams.dxfBasePointStep;

} //end of drawBridgeAngles

/**
 * Фланец крепления частей разделённой тетивы или косоура
 * уголки на фланце под ступенью
 */
function drawFlanConcatAngles(stringerParams, flanMaterial) {
    var text = 'Фланец крепления частей';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    if (stringerParams.model == "ко") {
        drawFlanKo(stringerParams);
    }
    else {
        drawFlanLt(stringerParams);
    }
    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(stringerParams.flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert.x;
    flan.position.y = stringerParams.flanPointInsert.y;
    flan.position.z = stringerParams.stringerSideOffset + stringerParams.stringerThickness;
    if (params.turnSide == "левое") {
        flan.position.z *= -1;
        flan.position.z -= stringerParams.stringerThickness;
    }
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);
    flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert.x;
    flan.position.y = stringerParams.flanPointInsert.y;
    flan.position.z = (stringerParams.M - stringerParams.stringerThickness - flanThickness) - stringerParams.stringerSideOffset;
    if (params.turnSide == "левое") {
        flan.position.z *= -1;
        flan.position.z -= stringerParams.stringerThickness;
    }
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

    var angle1;
    // уголки на фланцах
    if (stringerParams.model == "лт" && stringerParams.stairFrame == "нет") {
        angle1 = drawAngleSupport(stringerParams.angleBottomType);
        angle1.position.x = stringerParams.flanangle1PointInsert.x;
        angle1.position.y = stringerParams.flanangle1PointInsert.y;
        angle1.position.z = stringerParams.stringerThickness + stringerParams.stringerSideOffset + flanThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = 0.0;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport(stringerParams.angleBottomType);
        angle1.position.x = stringerParams.flanangle1PointInsert.x + stringerParams.angleLen;
        angle1.position.y = stringerParams.flanangle1PointInsert.y;
        angle1.position.z = stringerParams.stringerThickness + stringerParams.stringerSideOffset +
          stringerParams.treadWidth + stringerParams.treadSideOffset * 2 - flanThickness;
        angle1.rotation.x = Math.PI * 1.5;
        angle1.rotation.y = Math.PI;
        angle1.rotation.z = 0.0;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.b + stringerParams.dxfBasePointStep;

} //end of drawFlanConcatAngles


/**
 * Контур задней тетивы промежуточной площадки
 */
function drawRearStringerShape(stringerParams, platformCoverParams, turnFactor) {
    var text = 'Задняя тетива площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var rearStringerShape = new THREE.Shape();
/**/
if (stringerParams.railingModel == "Самонесущее стекло") {
if (stringerParams.stairModel == "П-образная с забегом" || stringerParams.stairModel == "П-образная с площадкой") {
//stringerParams.key = "rear";
stringerParams.elmIns[stringerParams.key] = {};
stringerParams.elmIns[stringerParams.key].racks = [];
}
}

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, stringerParams.M, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
    var pdop0 = copyPoint(p0);
    var pdop1 = copyPoint(p1);
    var pdop2 = copyPoint(p2);
    var pdop3 = copyPoint(p3);
    if (stringerParams.platformIncreased) {
        var len = platformCoverParams.platformWidth - stringerParams.M + stringerParams.stringerThickness * 2 + stringerParams.treadSideOffset * 2;
    	if (turnFactor < 0) {
    		pdop0 = newPoint_xy(pdop0, -len, 0.0);
    		pdop1 = newPoint_xy(pdop1, -len, 0.0);
    	}
    	else {
    		pdop2 = newPoint_xy(pdop2, len, 0.0);
    		pdop3 = newPoint_xy(pdop3, len, 0.0);
    	}
    }
    addLine(rearStringerShape, dxfPrimitivesArr, pdop0, pdop1, stringerParams.dxfBasePoint);
    addLine(rearStringerShape, dxfPrimitivesArr, pdop1, pdop2, stringerParams.dxfBasePoint);
    addLine(rearStringerShape, dxfPrimitivesArr, pdop2, pdop3, stringerParams.dxfBasePoint);
    addLine(rearStringerShape, dxfPrimitivesArr, pdop3, pdop0, stringerParams.dxfBasePoint);

    var holes = rearStringerShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

	if (stringerParams.midstringers.length > 1) {
    	// отверстия под крепёжные уголки дополнительных косоуров
    	var positionZ = 0;
		for (var k = 0; k < stringerParams.midstringers.length - 1; k++) {
    		positionZ += stringerParams.midstringers[k];
	    	hole1 = new THREE.Path();
    		hole2 = new THREE.Path();
    		hole3 = new THREE.Path();
    		hole4 = new THREE.Path();
    		center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness + positionZ, 85.0 - stringerParams.stringerWidth150);
    		center2 = newPoint_xy(center1, 0.0, -60.0);
    		center3 = newPoint_xy(center1, -60.0 - stringerParams.stringerThickness, 0.0);
    		center4 = newPoint_xy(center3, 0.0, -60.0);
    		addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    		addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    		addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    		addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    		holes.push(hole1);
    		holes.push(hole2);
    		holes.push(hole3);
    		holes.push(hole4);
    	}
    }

    if (stringerParams.platformIncreased) {
    	// отверстия под крепежный уголок к боковой тетиве увеличенной площадки
		hole1 = new THREE.Path();
		hole2 = new THREE.Path();
		if (turnFactor < 0) {
    		center1 = newPoint_xy(pdop1, 30.0 + stringerParams.stringerThickness, 85.0);
    	}
    	else {
    		center1 = newPoint_xy(pdop2, -30.0 - stringerParams.stringerThickness, 85.0);
    	}
    	center2 = newPoint_xy(center1, 0.0, -60.0);
    	addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    	addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    	holes.push(hole1);
    	holes.push(hole2);
    }

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        var holeRad = stringerParams.holeRad;
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(pdop0, 85.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
                addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);

            	// отверстия под средние стойки
            	//var length = Math.abs(center1.x - p0.x - 80);
            	//var lenRacks = len + stringerParams.stringerThickness + stringerParams.stringerThickness - 190;
            	var lenRacks = Math.abs(pdop0.x - pdop3.x) - 170;
            	if (lenRacks > 1100) {
	                var middleRackAmt = Math.round(lenRacks / 800) - 1;
	                if (middleRackAmt < 0) middleRackAmt = 0;
	                var rackDist = (lenRacks) / (middleRackAmt + 1);
	                //var racksMiddle = [];
	                for (var i = 1; i <= middleRackAmt; i++) {
	                    var center13 = newPoint_xy(center1, rackDist * i, 0);
	                    var center12 = newPoint_xy(center13, 0.0, -60.0);
	                    addRoundHole(rearStringerShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
	                    addRoundHole(rearStringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
	                    //racksMiddle.push({ "x": center13.x, "y": center13.y });
	                }
	            }

                // отверстия под стойку 2
                //добавляем отверстия под стойку 1
                center1 = newPoint_xy(pdop3, -85.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            	addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            	addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
            }
        }
        //if (stringerParams.railingModel == "Стекло на стойках") {
        //    center1 = newPoint_xy(center1, 50.0, 0.0);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
			if (stringerParams.railingPresence && stringerParams.platformTopRailing) {			////!!!!
			center1 = newPoint_xy(center1, 50.0, 0.0);
			center2 = newPoint_xy(center1, 0.0, -60.0);
			stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
			addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
			addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);

			center3 = newPoint_xy(center3, -50.0, 0.0);
			center4 = newPoint_xy(center3, 0.0, -60.0);
			stringerParams.elmIns[stringerParams.key].racks.push({ "x": center3.x, "y": center3.y });/**/
			addRoundHole(rearStringerShape, dxfPrimitivesArr, center3, holeRad, stringerParams.dxfBasePoint);
			addRoundHole(rearStringerShape, dxfPrimitivesArr, center4, holeRad, stringerParams.dxfBasePoint);
			}
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
/*
				holeRack1 = new THREE.Path();
                holeRack2 = new THREE.Path();
                holeRack3 = new THREE.Path();
                holeRack4 = new THREE.Path();
                centerRack1 = newPoint_xy(center1, 50.0, 0.0);
                centerRack2 = newPoint_xy(centerRack1, 0.0, -60.0);
                centerRack3 = newPoint_xy(center3, -50.0, 0.0);
                if (stringerParams.stairModel != 'Прямая' && !stringerParams.platformEnd) centerRack3 = newPoint_xy(center3, - params.b3 / 2 - 2, 0.0);
                centerRack4 = newPoint_xy(centerRack3, 0.0, -60.0);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, centerRack1, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, centerRack2, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, centerRack3, holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, centerRack4, holeRad, stringerParams.dxfBasePoint);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": centerRack1.x, "y": centerRack1.y });
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": centerRack3.x, "y": centerRack3.y });
            	addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
            	addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
*/
				
				// отверстия под стойку 1
                center1 = newPoint_xy(pdop0, 85.0, stringerParams.stepHoleY);
//if (turnFactor < 0) center1 = newPoint_xy(pdop3, 85.0 - len, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
                addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);

            	// отверстия под средние стойки
            	//var length = Math.abs(center1.x - p0.x - 80);
            	//var lenRacks = len + stringerParams.stringerThickness + stringerParams.stringerThickness - 190;
            	var lenRacks = Math.abs(pdop0.x - pdop3.x) - 170;
            	if (lenRacks > 1100) {
	                var middleRackAmt = Math.round(lenRacks / 800) - 1;
	                if (middleRackAmt < 0) middleRackAmt = 0;
	                var rackDist = (lenRacks) / (middleRackAmt + 1);
	                //var racksMiddle = [];
	                for (var i = 1; i <= middleRackAmt; i++) {
	                    var center13 = newPoint_xy(center1, rackDist * i, 0);
	                    var center12 = newPoint_xy(center13, 0.0, -60.0);
	                    addRoundHole(rearStringerShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
	                    addRoundHole(rearStringerShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
	                    //racksMiddle.push({ "x": center13.x, "y": center13.y });
	                }
	            }
				if (stringerParams.botEnd != "floor" || (params.middlePltWidth - params.M < 160)) {
					// отверстия под стойку 2
					//добавляем отверстия под стойку 1
					center1 = newPoint_xy(pdop3, -85.0, stringerParams.stepHoleY);
					if (params.stairModel == "Г-образная с площадкой") {
						if (stringerParams.botEnd == "floor") center1 = newPoint_xy(pdop3, -170.0 + params.middlePltWidth - params.M, stringerParams.stepHoleY);
					}
					center2 = newPoint_xy(center1, 0.0, -60.0);
					stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
					addRoundHole(rearStringerShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
					addRoundHole(rearStringerShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
				}
            }
        }
    }

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    if (stringerParams.stairFrame == "нет") {
    	var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(center1, stepHoleXrear1, 0.0);
        center2 = newPoint_xy(center1, stringerParams.holeDistU2_200, 0.0);
        center3 = newPoint_xy(center3, -stepHoleXrear1, 0.0);
        center4 = newPoint_xy(center3, -stringerParams.holeDistU2_200, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);
    }
    return rearStringerShape;
} //end of drawRearStringerShape

/**
 * Задняя тетива площадки
 * уголки крепления к тетивам
 * уголки крепления площадки
 */
function drawRearStringer(stringerParams, platformCoverParams, ptIns, stringerMaterial, stringerExtrudeOptions, turnFactor, isAnglesOnly) {
	if (!isAnglesOnly) {
    	stringerParams.dxfBasePoint.x += platformCoverParams.platformWidth + stringerParams.dxfBasePointStep;

    	// Задняя тетива
    	var rearStringerShape = drawRearStringerShape(stringerParams, platformCoverParams, turnFactor);
    	var geom = new THREE.ExtrudeGeometry(rearStringerShape, stringerExtrudeOptions);
    	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    	var rearStringer = new THREE.Mesh(geom, stringerMaterial);
    	rearStringer.position.x = ptIns.x;
    	rearStringer.position.y = ptIns.y;
    	rearStringer.position.z = ptIns.z;
    	rearStringer.rotation.x = 0.0;
    	rearStringer.rotation.y = Math.PI * 1.5 * (!stringerParams.stringerLast ? turnFactor : 1)/**/;
		
		if (!stringerParams.stringerLast && turnFactor < 0) {
			rearStringer.position.x -= stringerParams.stringerThickness;
			rearStringer.position.z += stringerParams.M;
		}
    	rearStringer.rotation.z = 0.0;
    	rearStringer.castShadow = true;
    	stringerParams.group.add(rearStringer);
    }

	    // уголки крепления задней тетивы
	    var angle0 = drawAngleSupport("У4-60х60х100");
	    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
	    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
	    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
	    angle0.rotation.x = Math.PI * 1.0;
	    angle0.rotation.y = Math.PI * 1.5;
		    angle0.rotation.z = Math.PI * 0.5;
    	angle0.castShadow = true;
    	stringerParams.groupang.add(angle0);
    	angle0 = drawAngleSupport("У4-60х60х100");
    	angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    	angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0; // - 45.0;
    	angle0.position.z = ptIns.z + stringerParams.stringerThickness + stringerParams.treadWidth + stringerParams.treadSideOffset * 2;
    	angle0.rotation.x = 0.0;
    	angle0.rotation.y = Math.PI * 1.0;
    	angle0.rotation.z = Math.PI * 1.5;
    	angle0.castShadow = true;
    	stringerParams.groupang.add(angle0);
    	if (stringerParams.platformIncreased) {
		    angle0 = drawAngleSupport("У4-60х60х100");
		    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
		    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0; // - 45.0;
		    angle0.position.z = ptIns.z + platformCoverParams.platformWidth + stringerParams.stringerThickness + stringerParams.treadSideOffset * 2;
		    angle0.rotation.x = 0.0;
	   		angle0.rotation.y = Math.PI * 1.0;
	    	angle0.rotation.z = Math.PI * 1.5;
	    	if (turnFactor < 0) {
	    		angle0.position.z = ptIns.z - platformCoverParams.platformWidth + stringerParams.M - stringerParams.treadSideOffset * 2 - stringerParams.stringerThickness;
		    	angle0.rotation.x = Math.PI * 0.5;
	    		angle0.rotation.y = Math.PI * 1.5;
		    	angle0.rotation.z = 0.0;
		    }
		    angle0.castShadow = true;
		    stringerParams.groupang.add(angle0);
		}

    	// уголки крепления к дополнительным косоурам
		if (stringerParams.midstringers.length > 1) {
			// отверстия под крепёжные уголки дополнительных косоуров
	    	var positionZ = 0;
			for (var k = 0; k < stringerParams.midstringers.length - 1; k++) {
	    		positionZ += stringerParams.midstringers[k];
	    		angle0 = drawAngleSupport("У4-60х60х100");
			    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
	    		angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
	    		angle0.position.z = ptIns.z + stringerParams.stringerThickness + positionZ;
	    		angle0.rotation.x = Math.PI * 1.0;
	    		angle0.rotation.y = Math.PI * 1.5;
	    		angle0.rotation.z = Math.PI * 0.5;
	    		angle0.castShadow = true;
	    		stringerParams.groupang.add(angle0);
    			angle0 = drawAngleSupport("У4-60х60х100");
	    		angle0.position.x = ptIns.x - stringerParams.stringerThickness;
	    		angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
	    		angle0.position.z = ptIns.z + stringerParams.stringerThickness - stringerParams.stringerThickness + positionZ;
	    		angle0.rotation.x = 0.0;
	    		angle0.rotation.y = Math.PI * 1.0;
	    		angle0.rotation.z = Math.PI * 1.5;
	    		angle0.castShadow = true;
	    		stringerParams.groupang.add(angle0);
			}
		}

	if (!isAnglesOnly) {
	    // уголки крепления площадки к задней тетиве
	    if (stringerParams.stairFrame == "нет") {
	    	var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);
	        var angle1 = drawAngleSupport("У2-40х40х200");
	        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
	        angle1.position.y = ptIns.y - 45.0;
	        angle1.position.z = ptIns.z + stringerParams.stringerThickness + stepHoleXrear1 + 5.0;
	        angle1.rotation.x = Math.PI * 0.5;
	        angle1.rotation.y = 0.0;
	        angle1.rotation.z = Math.PI * 0.5;
	        angle1.castShadow = true;
	        stringerParams.groupang.add(angle1);
	        angle1 = drawAngleSupport("У2-40х40х200");
	        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
	        angle1.position.y = ptIns.y - 45.0;
	        angle1.position.z = ptIns.z + stringerParams.stringerThickness + stringerParams.treadWidth +
	            stringerParams.treadSideOffset * 2 - 200.0 - stepHoleXrear1 - 5.0;
	        angle1.rotation.x = Math.PI * 0.5;
	        angle1.rotation.y = 0.0;
	        angle1.rotation.z = Math.PI * 0.5;
	        angle1.castShadow = true;
	        stringerParams.groupang.add(angle1);
	    }

	    stringerParams.dxfBasePoint.x += stringerParams.M + stringerParams.dxfBasePointStep;
    }
}//end of drawRearStringer


/**
 * Контур заднего косоура промежуточной площадки
 */
function drawRearStringerKoShape(stringerParams) {
    var text = 'Задний косоур площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var rearStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness
      - stringerParams.stringerSideOffset - stringerParams.stringerThickness, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerKoShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0, -65.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под стойку 2
                //добавляем отверстия под стойку 1
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }
        //if (stringerParams.railingModel == "Стекло на стойках") {
        //    center1 = newPoint_xy(center1, 50.0, 0.0);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Самонесущее стекло") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 50.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
                // отверстия под стойку 2
                center1 = newPoint_xy(p3, -50.0, stringerParams.stepHoleY);
				if (stringerParams.platformIntermediate) {
					center1 = newPoint_xy(p3, - stringerParams.b3 / 2 + stringerParams.stringerSideOffset + 8, stringerParams.stepHoleY);
				}
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }

        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p0, 130.0, -20.0);
    center2 = newPoint_xy(center1, 50.0, 0.0);
    center3 = newPoint_xy(p3, -130.0, -20.0);
    center4 = newPoint_xy(center3, -50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);
    return rearStringerKoShape;
} //end of drawRearStringerKoShape

/**
 * Задний косоур площадки
 * уголки крепления к косоурам
 * уголки крепления площадки
 */
function drawRearStringerKo(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    // Задний косоур
    var rearStringerKoShape = drawRearStringerKoShape(stringerParams);
    var geom = new THREE.ExtrudeGeometry(rearStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления заднего косоура
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness
      - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к заднему косоуру
    var angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 110.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness
      - stringerParams.stringerSideOffset - stringerParams.stringerThickness - 105.0 - 100.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.M + stringerParams.dxfBasePointStep;

} //end of drawRearStringerKo

/**
 * Боковой косоур площадки
 * вставка рамки под площадкой
 */
function drawSideStringerKo(key, stringerParams, platformFramesParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Боковой косоур площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.sideLength - params.carcasPartsSpacing * 2, 0.0);
    //console.log(stringerParams.platformLength);
    //console.log(stringerParams.stringerSideOffset);

    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = sideStringerKoShape.holes;

    // отверстия под крепежный уголок
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия для рамки под площадкой
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, (platformFramesParams.platformLength * 0.5) - 50.0 - stringerParams.a, -20.0);
    center2 = newPoint_xy(center1, stringerParams.stepHoleX2 - stringerParams.stepHoleX1, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия под соединительный фланец
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

            if (stringerParams.key !== "rearP1") {
                // отверстия под средние стойки
                //var length = Math.abs(center1.x - p0.x - 80);
                var length = stringerParams.lengthMiddle;
                if (length > 1300) {
                    var middleRackAmt = Math.round(length / 800) - 1;
                    if (middleRackAmt < 0) middleRackAmt = 0;
                    var rackDist = (length) / (middleRackAmt + 1);
                    var racksMiddle = [];
                    for (var i = 1; i <= middleRackAmt; i++) {
                        var center13 = newPoint_xy(center1, -rackDist * i, 0);
                        var center12 = newPoint_xy(center13, 0.0, -60.0);
                        addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);

                        racksMiddle.push({ "x": center13.x, "y": center13.y });
                    }
                }
            }
        }
        //if (stringerParams.railingModel == "Самонесущее стекло") {
        //    center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
			stringerParams.elmIns.sideStringerKo = {};
			stringerParams.elmIns.sideStringerKo.racks= [];
			stringerParams.elmIns.sideStringerKo.racks.push({ "x": center1.x, "y": center1.y });
        }
        addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }


    // Боковой косоур
    var geom = new THREE.ExtrudeGeometry(sideStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerKo = new THREE.Mesh(geom, stringerMaterial);
    sideStringerKo.position.x = ptIns.x;
    sideStringerKo.position.y = ptIns.y;
    sideStringerKo.position.z = ptIns.z;
    sideStringerKo.rotation.x = 0.0;
    sideStringerKo.rotation.y = 0.0;
    sideStringerKo.rotation.z = 0.0;
    sideStringerKo.castShadow = true;
    stringerParams.group.add(sideStringerKo);

    stringerParams.dxfBasePoint.x += platformFramesParams.platformLength + stringerParams.dxfBasePointStep;

} //end of drawSideStringerKo

/**
 * Фланец крепления бокового косоура к нижнему маршу
 */
function drawFlanSideConcat(dir, stringerParams, flanMaterial) {
    var text = 'Фланец крепления бокового косоура к нижнему маршу';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    var p1 = newPoint_xy(p0, 0.0, -100.0);
    var p2 = newPoint_xy(p1, 108.0, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 100.0);
    addLine(flanShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = flanShape.holes;

    // отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 20.0, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -20.0, -20.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = 0.0;
    flan.position.y = 0.0;
    flan.position.z = dir == "left" ? 0.0 : -flanThickness;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

    stringerParams.dxfBasePoint.x += 100.0 + stringerParams.dxfBasePointStep;

    return flan;
} //end of drawFlanSideConcat




/**
 * Контур заднего косоура промежуточной площадки для П-образной
 */
function drawRearStringerPKoShape(stringerParams, mm) {
    var rearStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset
      - stringerParams.stringerSideOffset, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerKoShape.holes;

    //    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
    //       stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    // на два марша
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, -65.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, mm - 30.0 + stringerParams.stringerThickness, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -mm + 30.0 - stringerParams.stringerThickness, -65.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    // отверстия под левый опорный уголок площадки
    // отверстия под правый опорный уголок площадки
    // на два марша
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    hole3 = new THREE.Path();
    hole4 = new THREE.Path();
    center1 = newPoint_xy(p0, 130.0 + stringerParams.stringerThickness, -20.0);
    center2 = newPoint_xy(center1, 50.0, 0.0);
    center3 = newPoint_xy(p3, -130.0 - stringerParams.stringerThickness, -20.0);
    center4 = newPoint_xy(center3, -50.0, 0.0);
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
    center1 = newPoint_xy(p0, mm - 130.0 + stringerParams.stringerThickness, -20.0);
    center2 = newPoint_xy(center1, -50.0, 0.0);
    center3 = newPoint_xy(p3, -mm + 130.0 - stringerParams.stringerThickness, -20.0);
    center4 = newPoint_xy(center3, 50.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing && stringerParams.key !== "rearP1") {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под средние стойки
                if (Math.abs(p3.x - p0.x) > 800) {
                    var middleRackAmt = Math.round((p3.x - p0.x) / 800) - 1;
                    if (middleRackAmt < 0) middleRackAmt = 0;
                    var rackDist = (p3.x - p0.x - 200) / (middleRackAmt + 1);
                    var racksMiddle = [];
                    for (var i = 1; i <= middleRackAmt; i++) {
                        var center11 = newPoint_xy(center1, rackDist * i, 0);
                        var center12 = newPoint_xy(center11, 0.0, -60.0);
                        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        racksMiddle.push({ "x": center11.x, "y": center11.y });
                    }
                    stringerParams.elmIns[stringerParams.key].racks[0].racksMiddle = racksMiddle;
                }

                // отверстия под стойку 2
                //добавляем отверстия под стойку 1
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });


            }
        }
        //if (stringerParams.railingModel == "Стекло на стойках") {
        //    center1 = newPoint_xy(center1, 50.0, 0.0);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Самонесущее стекло") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под стойку 2
                //добавляем отверстия под стойку 1
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }

        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(rearStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }

    return rearStringerKoShape;
} //end of drawRearStringerPKoShape

/**
 * Задний косоур площадки для П-образной
 * уголки крепления к косоурам
 * уголки крепления площадки
 */
function drawRearStringerPKo(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Задний косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Задний косоур
    var rearStringerKoShape = drawRearStringerPKoShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(rearStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления заднего косоура
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к заднему косоуру
    // на два марша
    var angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 110.0 + stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
      stringerParams.stringerSideOffset - 105.0 - 100.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 110.0 + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x - stringerParams.stringerThickness;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + stringerParams.platformWidth_1 + 5 - stringerParams.stringerSideOffset -
      stringerParams.stringerSideOffset - stringerParams.stringerThickness - 105.0 - 100.0;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = 0.0;
    angle1.rotation.z = Math.PI * 0.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawRearStringerPKo

///**
// * Контур поперечного косоура промежуточной площадки
// */
//function drawTransStringerPKoShape(stringerParams) {
//    var transStringerKoShape = new THREE.Shape();
//
//    var p0 = { "x": 0.0, "y": 0.0 };
//
//    var p1 = newPoint_xy(p0, 0.0, -150.0);
//    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset -
//      stringerParams.stringerSideOffset, 0.0);
//    var p3 = newPoint_xy(p2, 0.0, 150.0);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
//    addLine(transStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);
//
//    var holes = transStringerKoShape.holes;
//
//    // отверстия под левый крепежный уголок
//    // отверстия под правый крепежный уголок
//    var hole1 = new THREE.Path();
//    var hole2 = new THREE.Path();
//    var hole3 = new THREE.Path();
//    var hole4 = new THREE.Path();
//    var center1 = newPoint_xy(p0, 30.0, -65.0);
//    var center2 = newPoint_xy(center1, 0.0, -60.0);
//    var center3 = newPoint_xy(p3, -30.0, -65.0);
//    var center4 = newPoint_xy(center3, 0.0, -60.0);
//    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    holes.push(hole1);
//    holes.push(hole2);
//    holes.push(hole3);
//    holes.push(hole4);
//
//    // отверстия под левый опорный уголок площадки
//    // отверстия под правый опорный уголок площадки
//    hole1 = new THREE.Path();
//    hole2 = new THREE.Path();
//    hole3 = new THREE.Path();
//    hole4 = new THREE.Path();
//    center1 = newPoint_xy(p0, 130.0, -20.0);
//    center2 = newPoint_xy(center1, 50.0, 0.0);
//    center3 = newPoint_xy(p3, -130.0, -20.0);
//    center4 = newPoint_xy(center3, -50.0, 0.0);
//    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
//    holes.push(hole1);
//    holes.push(hole2);
//    holes.push(hole3);
//    holes.push(hole4);
//
//    return transStringerKoShape;
//} //end of drawTransStringerPKoShape

/**
 * Поперечный косоур площадки
 */
function drawTransStringerPKo(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Передний косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Поперечный косоур
    var transStringerKoShape = drawRearStringerPKoShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(transStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления поперечного косоура
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y - 45.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    // уголки крепления площадки к поперечному косоуру
    // на два марша
    var angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + 200.0 + stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + mm - 95.0 - stringerParams.stringerThickness;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - 110.0 -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset - stringerParams.stringerSideOffset;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);
    angle1 = drawAngleSupport("У2-40х40х90");
    angle1.position.x = ptIns.x;
    angle1.position.y = ptIns.y;
    angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - mm + 185.0 +
        stringerParams.stringerThickness - stringerParams.stringerSideOffset - stringerParams.stringerSideOffset;
    angle1.rotation.x = Math.PI * 0.5;
    angle1.rotation.y = Math.PI * 0.0;
    angle1.rotation.z = Math.PI * 1.5;
    angle1.castShadow = true;
    stringerParams.groupang.add(angle1);

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawTransStringerPKo


/**
 * Боковой косоур площадки для П-образной
 * вставка рамки под площадкой
 */
function drawSideStringerPKo(key, stringerParams, holesFrameParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Боковой косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerKoShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
    var p1 = newPoint_xy(p0, 0.0, -150.0);
    var p2 = newPoint_xy(p1, stringerParams.sideLength - params.carcasPartsSpacing*2, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 150.0);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(sideStringerKoShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = sideStringerKoShape.holes;

    // отверстия под крепежный уголок с задним косоуром
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p3, -30.0, -65.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия для рамки под площадкой
    var platformpos = stringerParams.sideLength - (stringerParams.platformLength_1 / 2.0 + 40.0);
    if (platformpos < 100.0) platformpos = 100.0;
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, platformpos, -20.0);
    center2 = newPoint_xy(center1, stringerParams.stepHoleX2 - stringerParams.stepHoleX1, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    // отверстия под крепежный уголок с поперечным косоуром
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p0, 30.0, -65.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                if (key === "out") {
                    // отверстия под стойку 1
                    center1 = newPoint_xy(p3, -80.0 - stringerParams.stringerThickness, stringerParams.stepHoleY);
                    center2 = newPoint_xy(center1, 0.0, -60.0);

                    if (stringerParams.key !== "rearP1") {
                        // отверстия под средние стойки
                        //var length = Math.abs(center1.x - p0.x - 80);
                        var length = stringerParams.lengthMiddle;
                        if (length > 1300) {
                            var middleRackAmt = Math.round(length / 800) - 1;
                            if (middleRackAmt < 0) middleRackAmt = 0;
                            var rackDist = (length) / (middleRackAmt + 1);
                            for (var i = 1; i <= middleRackAmt; i++) {
                                var center13 = newPoint_xy(center1, -rackDist * i, 0);
                                var center12 = newPoint_xy(center13, 0.0, -60.0);
                                addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
                                addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                            }
                        }
                    }

                    if (stringerParams.key === "rearP1") {
                        //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                        // отверстия под стойку 2
                        //добавляем отверстия под стойку 1

                        center11 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                        //center2 = newPoint_xy(center1, 0.0, -60.0);
                        stringerParams.elmIns[stringerParams.key].racks.push({ "x": center11.x, "y": center11.y });

                        // отверстия под средние стойки
                        //var length = Math.abs(center1.x - center11.x);
                        var length = stringerParams.lengthMiddle;
                        if (length > 1300) {
                            var middleRackAmt = Math.round(length / 800) - 1;
                            if (middleRackAmt < 0) middleRackAmt = 0;
                            var rackDist = (length - 300) / (middleRackAmt + 1);
                            var racksMiddle = [];
                            for (var i = 1; i <= middleRackAmt; i++) {
                                var center13 = newPoint_xy(center11, rackDist * i, 0);
                                var center12 = newPoint_xy(center13, 0.0, -60.0);
                                addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
                                addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);

                                racksMiddle.push({ "x": center13.x + 150 - 5, "y": center13.y });
                            }
                            var number = stringerParams.elmIns[stringerParams.key].racks.length - 1;
                            stringerParams.elmIns[stringerParams.key].racks[number].racksMiddle = racksMiddle;
                        }
                    }
                } else
                    center1 = center2 = 0;
            }
        }
        //if (stringerParams.railingModel == "Стекло на стойках") {
        //    center1 = newPoint_xy(center1, 50.0, 0.0);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Самонесущее стекло") {
            center1 = newPoint_xy(center1, 50.0, 0.0);
            center2 = newPoint_xy(center1, 0.0, -60.0);
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
				if (key === "out") {
					center1 = newPoint_xy(p3, -80.0, -20.0);
					center2 = newPoint_xy(center1, 0.0, -60.0);
					stringerParams.elmIns.rearSideP = {};
					stringerParams.elmIns.rearSideP.racks= [];
					stringerParams.elmIns.rearSideP.racks.push({ "x": center1.x, "y": center1.y });
				}
				else center1 = center2 = 0;
            }
        }

        if (center1 !== 0)
            addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        if (center2 !== 0)
            addRoundHole(sideStringerKoShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    }

    // Боковой косоур
    var geom = new THREE.ExtrudeGeometry(sideStringerKoShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerKo = new THREE.Mesh(geom, stringerMaterial);
    sideStringerKo.position.x = ptIns.x;
    sideStringerKo.position.y = ptIns.y;
    sideStringerKo.position.z = ptIns.z;
    sideStringerKo.rotation.x = 0.0;
    sideStringerKo.rotation.y = 0.0;
    sideStringerKo.rotation.z = 0.0;
    sideStringerKo.castShadow = true;
    stringerParams.group.add(sideStringerKo);

    stringerParams.dxfBasePoint.x += stringerParams.sideLength + stringerParams.dxfBasePointStep;

} //end of drawSideStringerPKo


/**
 * Контур задней тетивы промежуточной площадки для П-образной
 */
function drawRearStringerPLtShape(stringerParams, mm) {
    var text = 'Задняя тетива';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var rearStringerLtShape = new THREE.Shape();
/*if (stringerParams.railingModel == "Самонесущее стекло") {
//stringerParams.key = "rear";
stringerParams.elmIns[stringerParams.key] = {};
stringerParams.elmIns[stringerParams.key].racks = [];
}*/

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset
      - stringerParams.stringerSideOffset, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(rearStringerLtShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = rearStringerLtShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    // на два марша
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, mm - 30.0 + stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -mm + 30.0 - stringerParams.stringerThickness, 85.0 - stringerParams.stringerWidth150);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

if (stringerParams.railingModel == "Самонесущее стекло") {
var centralHole1 = copyPoint(center1);
var centralHole3 = copyPoint(center3);
}
    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            if (stringerParams.railingPresence && stringerParams.platformTopRailing) {
                // отверстия под стойку 1
                center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

                // отверстия под средние стойки
                if (Math.abs(p3.x - p0.x) > 800) {
                    var middleRackAmt = Math.round((p3.x - p0.x) / 800) - 1;
                    if (middleRackAmt < 0) middleRackAmt = 0;
                    var rackDist = (p3.x - p0.x - 200) / (middleRackAmt + 1);
                    var racksMiddle = [];
                    for (var i = 1; i <= middleRackAmt; i++) {
                        var center11 = newPoint_xy(center1, rackDist * i, 0);
                        var center12 = newPoint_xy(center11, 0.0, -60.0);
                        addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center11, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                        racksMiddle.push({ "x": center11.x, "y": center11.y });
                    }
                    stringerParams.elmIns[stringerParams.key].racks[0].racksMiddle = racksMiddle;
                }

                // отверстия под стойку 2
                //добавляем отверстия под стойку 1
                addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
                addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
                center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
                center2 = newPoint_xy(center1, 0.0, -60.0);
                stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
            }
        }
        //if (stringerParams.railingModel == "Стекло на стойках") {
        //    center1 = newPoint_xy(center1, 50.0, 0.0);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Самонесущее стекло") {
            holeRad = stringerParams.holeRutelRad;
			if (stringerParams.railingPresence && stringerParams.platformTopRailing) {			////!!!!
				// первая пара отверстий под рутели
				center1 = newPoint_xy(p0, 100, 85.0 - stringerParams.stringerWidth150);
				center2 = newPoint_xy(center1, 0.0, -60.0);
				stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
				// вторая пара отверстий под рутели
				center1 = newPoint_xy(centralHole1, 60.0, 0.0);
				center2 = newPoint_xy(center1, 0.0, -60.0);
				stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
				// третья пара отверстий под рутели
				center3 = newPoint_xy(centralHole3, -60.0, 0.0);
				center4 = newPoint_xy(center3, 0.0, -60.0);
				stringerParams.elmIns[stringerParams.key].racks.push({ "x": center3.x, "y": center3.y });
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center3, holeRad, stringerParams.dxfBasePoint);
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center4, holeRad, stringerParams.dxfBasePoint);
				// четвёртая пара отверстий под рутели
				center3 = newPoint_xy(p3, -100, 85.0 - stringerParams.stringerWidth150);
				center4 = newPoint_xy(center3, 0.0, -60.0);
				stringerParams.elmIns[stringerParams.key].racks.push({ "x": center3.x, "y": center3.y });
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center3, holeRad, stringerParams.dxfBasePoint);
				addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center4, holeRad, stringerParams.dxfBasePoint);
				/**/
			}
        }
        if (stringerParams.railingModel == "Кованые балясины") {
            // отверстия под стойку 1
            center1 = newPoint_xy(p0, 80.0, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

            // отверстия под стойку 2
            //добавляем отверстия под стойку 1
            addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            center1 = newPoint_xy(p3, -80.0, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });

        }
if (stringerParams.railingModel != "Самонесущее стекло") {
        addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addRoundHole(rearStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
}
    }

    if (stringerParams.stairFrame == "нет") {
        // отверстия под левый опорный уголок площадки
        // отверстия под правый опорный уголок площадки
        // на два марша
		var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);

        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(p0, stepHoleXrear1 + 25.0 + stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center2 = newPoint_xy(center1, stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -stepHoleXrear1 - 25.0 - stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center4 = newPoint_xy(center3, -stringerParams.stringerWidth150, 0.0);
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
        center1 = newPoint_xy(p0, mm - stepHoleXrear1 - 25.0 + stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center2 = newPoint_xy(center1, -stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -mm + stepHoleXrear1 + 25.0 - stringerParams.stringerThickness, -20.0 - 5.0 - stringerParams.treadThickness);
        center4 = newPoint_xy(center3, stringerParams.stringerWidth150, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);
    }
    return rearStringerLtShape;
} //end of drawRearStringerPLtShape

/**
 * Задняя тетива площадки для П-образной
 * уголки крепления к тетивам, косоурам
 * уголки крепления площадки
 */
function drawRearStringerPLt(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Задняя тетива
    var rearStringerLtShape = drawRearStringerPLtShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(rearStringerLtShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления задней тетивы
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.5;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x - stringerParams.stringerThickness;
    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    if (stringerParams.stairFrame == "нет") {
        // уголки крепления площадки к задней тетиве
        // на два марша
		var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);

        var angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + stepHoleXrear1 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
          stringerParams.stringerSideOffset - stepHoleXrear1 - 105.0 - 100.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + stepHoleXrear1 + stringerParams.platformWidth_1 -
            stringerParams.M + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y - 5.0 - stringerParams.treadThickness;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 + 5 - stringerParams.stringerSideOffset -
          stringerParams.stringerSideOffset - stringerParams.stringerThickness - stepHoleXrear1 - 105.0 - 100.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawRearStringerPLt

/**
 * Контур поперечного косоура промежуточной площадки для лестницы на тетивах
 */
function drawTransStringerPLtShape(stringerParams, mm) {
    var text = 'Передний косоур';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var transStringerltShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, -145.0 + stringerParams.treadThickness);
    var p2 = newPoint_xy(p1, stringerParams.platformWidth_1 - stringerParams.stringerSideOffset -
      stringerParams.stringerSideOffset, 0.0);
    var p3 = newPoint_xy(p2, 0.0, 145.0 - stringerParams.treadThickness);
    addLine(transStringerltShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(transStringerltShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(transStringerltShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(transStringerltShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = transStringerltShape.holes;

    // отверстия под левый крепежный уголок
    // отверстия под правый крепежный уголок
    // на два марша
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, 30.0 + stringerParams.stringerThickness, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -30.0 - stringerParams.stringerThickness, -20.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p0, mm - 14.0 - stringerParams.stringerThickness, -20.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p3, -mm + 14.0 + stringerParams.stringerThickness, -20.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    if (stringerParams.stairFrame == "нет") {
        // отверстия под левый опорный уголок площадки
        // отверстия под правый опорный уголок площадки
        // на два марша
		var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);

        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        hole3 = new THREE.Path();
        hole4 = new THREE.Path();
        center1 = newPoint_xy(p0, stepHoleXrear1 + 25.0 + stringerParams.stringerThickness, -20.0);
        center2 = newPoint_xy(center1, stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -stepHoleXrear1 - 25.0 - stringerParams.stringerThickness, -20.0);
        center4 = newPoint_xy(center3, -stringerParams.stringerWidth150, 0.0);
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
        center1 = newPoint_xy(p0, mm - stepHoleXrear1 - 25.0 + stringerParams.stringerThickness, -20.0);
        center2 = newPoint_xy(center1, -stringerParams.stringerWidth150, 0.0);
        center3 = newPoint_xy(p3, -mm + stepHoleXrear1 + 25.0 - stringerParams.stringerThickness, -20.0);
        center4 = newPoint_xy(center3, stringerParams.stringerWidth150, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        holes.push(hole3);
        holes.push(hole4);
    }

    return transStringerltShape;
} //end of drawTransStringerPLtShape

/**
 * Поперечный косоур площадки для лестницы на тетивах
 */
function drawTransStringerPLt(stringerParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var mm = stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerThickness - stringerParams.stringerSideOffset;

    // Поперечный косоур
    var transStringerltShape = drawTransStringerPLtShape(stringerParams, mm);
    var geom = new THREE.ExtrudeGeometry(transStringerltShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var rearStringerKo = new THREE.Mesh(geom, stringerMaterial);
    rearStringerKo.position.x = ptIns.x;
    rearStringerKo.position.y = ptIns.y;
    rearStringerKo.position.z = ptIns.z;
    rearStringerKo.rotation.x = 0.0;
    rearStringerKo.rotation.y = Math.PI * 1.5;
    rearStringerKo.rotation.z = 0.0;
    rearStringerKo.castShadow = true;
    stringerParams.group.add(rearStringerKo);

    // уголки крепления поперечного косоура
    // на два марша
    var angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
        stringerParams.stringerSideOffset;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.M + stringerParams.stringerThickness;
    angle0.rotation.x = Math.PI * 1.0;
    angle0.rotation.y = Math.PI * 1.0;
    angle0.rotation.z = Math.PI * 0.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);
    angle0 = drawAngleSupport("У4-60х60х100");
    angle0.position.x = ptIns.x;
    angle0.position.y = ptIns.y;
    angle0.position.z = ptIns.z + stringerParams.platformWidth_1 -
        stringerParams.stringerSideOffset - stringerParams.stringerSideOffset - stringerParams.stringerThickness;
    angle0.rotation.x = 0.0;
    angle0.rotation.y = Math.PI * 0.5;
    angle0.rotation.z = Math.PI * 1.5;
    angle0.castShadow = true;
    stringerParams.groupang.add(angle0);

    if (stringerParams.stairFrame == "нет") {
        // уголки крепления площадки к поперечному косоуру
        // на два марша
		var stepHoleXrear1 = selectStepHoleXrear1(stringerParams.M);

        var angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stepHoleXrear1 + 200.0 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + mm - stepHoleXrear1 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - stepHoleXrear1 - stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 - mm + stepHoleXrear1 + 200.0 - stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = Math.PI * 0.0;
        angle1.rotation.z = Math.PI * 1.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);


        var angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stepHoleXrear1 + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + 5 + stringerParams.M - stringerParams.stringerSideOffset - stringerParams.stringerThickness -
          stringerParams.stringerSideOffset - stepHoleXrear1 - 105.0 - 100.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);

        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stepHoleXrear1 + stringerParams.platformWidth_1 -
            stringerParams.M + stringerParams.stringerThickness;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
        angle1 = drawAngleSupport("У2-40х40х200");
        angle1.position.x = ptIns.x - stringerParams.stringerThickness;
        angle1.position.y = ptIns.y;
        angle1.position.z = ptIns.z + stringerParams.platformWidth_1 + 5 - stringerParams.stringerSideOffset -
          stringerParams.stringerSideOffset - stringerParams.stringerThickness - stepHoleXrear1 - 105.0 - 100.0;
        angle1.rotation.x = Math.PI * 0.5;
        angle1.rotation.y = 0.0;
        angle1.rotation.z = Math.PI * 0.5;
        angle1.castShadow = true;
        stringerParams.groupang.add(angle1);
    }

    stringerParams.dxfBasePoint.x += stringerParams.platformWidth_1 + stringerParams.dxfBasePointStep;

} //end of drawTransStringerPLt


/**
 * размеры уголка по обозначению
 */
function getDimsAngle(number) {
    var common = { holePosX: 25.0, holePosY: 20.0 }; // от края до отверстия
    if (number == "У2-40х40х160") {
        common.len = 160.0;
    }
    else if (number == "У2-40х40х200") {
        common.len = 200.0;
    }
    else if (number == "У2-40х40х230") {
        common.len = 230.0;
    }
    else if (number == "У2-40х40х90") {
        common.len = 90.0;
    }
    else if (number == "У2-40х40х100") {
        common.len = 100.0;
    }
    else if (number == "У4-60х60х100") {
        common.len = 100.0;
    }
    else {
        return {};
    }
    return common;
} //end of getDimsAngle

/**
 * Выбор уголка под ступенями
 */
function setStairAngles(stringerParams) {
/*
    // уголок под верхней ступенью
    if (stringerParams.a < 285) {
        stringerParams.angleTopType = "У2-40х40х160";
        stringerParams.holeDist2 = stringerParams.holeDistU2_160;
        stringerParams.angle2Len = 160.0;
    }
    else {
        stringerParams.angleTopType = "У2-40х40х200";
        stringerParams.holeDist2 = stringerParams.holeDistU2_200;
        stringerParams.angle2Len = 200.0;
    }
*/
    // остальные уголки
    if (stringerParams.a > 260) {
        stringerParams.angleBottomType = "У2-40х40х230";
        stringerParams.holeDist = stringerParams.holeDistU2_230;
        stringerParams.angleLen = 230.0;
    }
    else {
        stringerParams.angleBottomType = "У2-40х40х200";
        stringerParams.holeDist = stringerParams.holeDistU2_200;
        stringerParams.angleLen = 200.0;
    }
    if (stringerParams.a < 230) {
        stringerParams.angleBottomType = "У2-40х40х160";
        stringerParams.holeDist = stringerParams.holeDistU2_160;
        stringerParams.angleLen = 160.0;
    }

	//делаем верхний уголок точно таким же, как остальные
		stringerParams.angleTopType =  stringerParams.angleBottomType;
		stringerParams.holeDist2 = stringerParams.holeDist;
		stringerParams.angle2Len = stringerParams.angleLen;


    // от края до отверстия
    stringerParams.angleHolePosX = 25.0;
    stringerParams.angleHolePosY = 20.0;
} //end of setStairAngles

/**
 * ЗАДАНИЕ РАСПОЛОЖЕНИЯ СТОЕК, ПЕРЕМЫЧЕК, РАЗРЕЗА СРЕДНИХ СТУПЕНЕЙ ;;;
 */
function ltko_set_railing(stairAmt, stringerParams) {
    // номера ступеней, где устанавливается стойка
    stringerParams.railing = [];
    // номера ступеней, где устанавливается перемычка
    stringerParams.brige = [];
    // номер ступени разделения
    stringerParams.divide = 0;
if (stringerParams.stringerLast) //console.log(stairAmt);
    if (stairAmt == 2) {
        if (railingModel == "Кованые балясины" || railingModel == "Ригели" || railingModel == "Стекло на стойках") stringerParams.railing = [1, 2];
    }
    if (stairAmt == 3) {
        stringerParams.railing = [1, 3];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 3];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3];
        }
        stringerParams.brige = [];
    }
    if (stairAmt == 4) {
        stringerParams.railing = [1, 4];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [2, 3];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [2, 3, 4];
        }
        stringerParams.brige = [];
    }
    if (stairAmt == 5) {
        stringerParams.railing = [1, 3, 5];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 5];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 5];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 5];
        }
        stringerParams.brige = [3];
    }
    if (stairAmt == 6) {
        stringerParams.railing = [1, 4, 6];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 3, 4, 6];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6];
        }
        stringerParams.brige = [4];
    }
    if (stairAmt == 7) {
        stringerParams.railing = [1, 4, 7];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 7];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4, 5, 7];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 7];
        }
        stringerParams.brige = [4];
    }
    if (stairAmt == 8) {
        stringerParams.railing = [1, 3, 6, 8];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4, 6, 7];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4, 5, 8];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [4, 5, 8];
        }
        stringerParams.brige = [5];
    }
    if (stairAmt == 9) {
        stringerParams.railing = [1, 4, 6, 9];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 5, 6, 9];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4, 6, 7];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6, 7, 9];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6, 7, 9];
        }
        stringerParams.brige = [4, 6];
    }
    if (stairAmt == 10) {
        stringerParams.railing = [1, 4, 7, 10];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8, 9, 10];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 7, 8];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6, 7, 10];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [4, 5, 7, 8, 10];
        }
        stringerParams.brige = [4, 7];
    }
    if (stairAmt == 11) {
        stringerParams.railing = [1, 3, 6, 9, 11];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8, 9, 11];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 8, 9];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 7, 8, 11];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6, 7, 9, 10, 11];
        }
        stringerParams.brige = [5, 8];
        stringerParams.divide = 7;
    }
    if (stairAmt == 12) {
        stringerParams.railing = [1, 3, 6, 9, 12];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8, 9, 12];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 8, 9];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6, 7, 9, 10, 12];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6, 7, 9, 10, 12];
        }
        stringerParams.brige = [5, 8];
        stringerParams.divide = 7;
    }
    if (stairAmt == 13) {
        stringerParams.railing = [1, 4, 7, 10, 13];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 5, 6, 10, 11, 13];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4, 6, 7, 9, 10];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6, 7, 9, 10, 13];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6, 7, 9, 10, 13];
        }
        stringerParams.brige = [5, 9];
        stringerParams.divide = 8;
    }
    if (stairAmt == 14) {
        stringerParams.railing = [1, 3, 6, 9, 12, 14];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 3, 4, 6, 7, 9, 10, 12, 13, 14];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 8, 9, 11, 12];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6, 7, 10, 11, 14];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6, 7, 10, 11, 14];
        }
        stringerParams.brige = [6, 10];
        stringerParams.divide = 8;
    }
    if (stairAmt == 15) {
        stringerParams.railing = [1, 3, 6, 9, 12, 15];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 3, 4, 6, 7, 9, 10, 12, 13, 15];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4, 6, 7, 9, 10, 12, 13];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [3, 4, 6, 7, 9, 10, 12, 13, 15];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [3, 4, 6, 7, 9, 10, 12, 13, 15];
        }
        stringerParams.brige = [6, 10];
        stringerParams.divide = 8;
    }
    if (stairAmt == 16) {
        stringerParams.railing = [1, 4, 7, 10, 13, 16];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8, 9, 12, 13, 16];
            alert("Необходимо вручную сделать отверстие под рутель в соедининительном фланце!");
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 8, 9, 12, 13];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4, 5, 8, 9, 12, 13, 16];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [4, 5, 8, 9, 12, 13, 16];
        }
        stringerParams.brige = [6, 11];
        stringerParams.divide = 9;
    }
    if (stairAmt == 17) {
        stringerParams.railing = [1, 3, 6, 9, 12, 15, 17];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 17];
            alert("Необходимо вручную сделать отверстие под рутель в соедининительном фланце!");
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 8, 9, 11, 12, 14, 15];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4, 5, 8, 9, 11, 12, 14, 15, 17];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [4, 5, 8, 9, 11, 12, 14, 15, 17];
        }
        stringerParams.brige = [7, 12];
        stringerParams.divide = 10;
    }
    if (stairAmt == 18) {
        stringerParams.railing = [1, 4, 7, 10, 13, 16, 18];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8, 9, 12, 13, 16, 17, 18];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [3, 4, 6, 7, 9, 10, 12, 13, 15, 16];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4, 5, 8, 9, 12, 13, 15, 16, 18];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [4, 5, 8, 9, 12, 13, 15, 16, 18];
        }
        stringerParams.brige = [7, 12];
        stringerParams.divide = 11;
    }
    if (stairAmt == 19) {
        stringerParams.railing = [1, 4, 7, 10, 13, 16, 19];
        if (railingModel == "Самонесущее стекло") {
            stringerParams.railing = [2, 4, 5, 8, 9, 12, 13, 16, 17, 19];
            if (stringerParams.stringerLast) {
                stringerParams.railing = [4, 5, 8, 9, 12, 13, 16, 17];
            }
			if (stringerParams.stringerMiddle && stringerParams.key == "in") stringerParams.railing = [4, 5, 8, 9, 12, 13, 16, 17, 19];
			if (stringerParams.stringerMiddle && stringerParams.key == "out") stringerParams.railing = [4, 5, 8, 9, 12, 13, 16, 17, 19];
        }
        stringerParams.brige = [7, 12];
        stringerParams.divide = 11;
    }
} //end of ltko_set_railing
///ПРАВКА РАЗРЕЗА СРЕДНИХ СТУПЕНЕЙ
function ltko_set_divide(stairAmt, stringerParams) {
    stringerParams.divide = (stairAmt == 11 || stairAmt == 12) ? 7 :
							(stairAmt == 13 || stairAmt == 14 || stairAmt == 15) ? 8 :
							(stairAmt == 16) ? 9 :
							(stairAmt == 17) ? 10 :
							(stairAmt == 18 || stairAmt == 19) ? 11 : 0;
} //end of ltko_set_divide
/*
 * Тетива
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */
function drawFlanLt(stringerParams, p0, holes) {
  	var skew1 = (stringerParams.stringerWidth - 10.0 - (stringerParams.divideY + 50.0 - stringerParams.h) * Math.cos(stringerParams.stairAngle1)) / Math.sin(stringerParams.stairAngle1);
   	var skew2 = (stringerParams.stringerWidth - 10.0 - (stringerParams.divideY - 50.0 - stringerParams.h) * Math.cos(stringerParams.stairAngle1)) / Math.sin(stringerParams.stairAngle1);
    if (stringerParams.stringerType == "ломаная") {
		skew1 = stringerParams.stringerWidth + stringerParams.b - 10.0;
		skew2 = stringerParams.stringerWidth + stringerParams.b - 10.0;
    }
    else if (stringerParams.stringerType == "прямая") {
  		skew1 = (stringerParams.stringerWidth - 10.0 - (stringerParams.divideY + 50.0 - stringerParams.h) * Math.cos(stringerParams.stairAngle1)) / Math.sin(stringerParams.stairAngle1) - stringerParams.b;
   		skew2 = (stringerParams.stringerWidth - 10.0 - (stringerParams.divideY - 50.0 - stringerParams.h) * Math.cos(stringerParams.stairAngle1)) / Math.sin(stringerParams.stairAngle1) - stringerParams.b;
    }

    if (p0 === undefined || holes === undefined) {
        stringerParams.flanShape = new THREE.Shape();

        var p0 = { "x": 0.0, "y": 0.0 };

        var p1 = newPoint_xy(p0, 0.0, 0.0);
        var p2 = newPoint_xy(p0, stringerParams.rad1, -100.0);
        var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad1);
        var p3 = newPoint_xy(p0, skew1 - 10.0, -100.0);
        var p4 = newPoint_xy(p0, skew2 - 10.0, 0.0);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p1,
          newPoint_xy(p1, 0.0, -(100.0 - stringerParams.rad1)), stringerParams.dxfBasePoint);
        addArc(stringerParams.flanShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

        holes = stringerParams.flanShape.holes;
    }
    else {
        stringerParams.flanangle1PointInsert = newPoint_xy(p0, 10.0, 0.0);
    }

    // отверстия

    var p1 = copyPoint(p0);

    // левые отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p1, 35.0, -20.0);
    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
    var center3 = newPoint_xy(center1, 0.0, -60.0);
    var center4 = newPoint_xy(center1, stringerParams.holeDist, -60.0);
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
  	var dx = stringerParams.holeDist;
  	var off = (stringerParams.stringerType == "ломаная") ? 80.0 : 110.0;
    if (stringerParams.holeDist * 3 + off - 10.0 > skew2) {
        dx = Math.ceil((skew2 - off - stringerParams.holeDist) * 0.5);
    }
  	center1 = newPoint_xy(center2, dx + dx, 0.0);
    center2 = newPoint_xy(center1, -dx, 0.0);
    center3 = newPoint_xy(center2, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
	if (stringerParams.stringerType == "ломаная") {
    	hole4 = new THREE.Path();
    	center4 = newPoint_xy(center1, 0.0, -60.0);
    	addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    	holes.push(hole4);
	}
} //end of drawFlanLt

/*
 * Косоур
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */
function drawFlanKo(stringerParams, p0, holes) {
  	var skew1 = (stringerParams.stringerWidth - 10.0 - (stringerParams.divideY + 50.0 - stringerParams.h) * Math.cos(stringerParams.stairAngle1)) / Math.sin(stringerParams.stairAngle1);
   	var skew2 = (stringerParams.stringerWidth - 10.0 - (stringerParams.divideY - 50.0 - stringerParams.h) * Math.cos(stringerParams.stairAngle1)) / Math.sin(stringerParams.stairAngle1);
    if (stringerParams.stringerType == "ломаная") {
		skew1 = stringerParams.stringerWidth + stringerParams.b - 10.0;
		skew2 = stringerParams.stringerWidth + stringerParams.b - 10.0;
    }

    if (p0 === undefined || holes === undefined) {
        stringerParams.flanShape = new THREE.Shape();

        var p0 = { "x": 0.0, "y": 0.0 };

        var p1 = newPoint_xy(p0, 0.0, 0.0);
        var p2 = newPoint_xy(p0, stringerParams.rad1, -100.0);
        var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad1);
        var p3 = newPoint_xy(p0, skew1 - 10.0, -100.0);
        var p4 = newPoint_xy(p0, skew2 - 10.0, 0.0);

        addLine(stringerParams.flanShape, dxfPrimitivesArr, p1,
          newPoint_xy(p1, 0.0, -(100.0 - stringerParams.rad1)), stringerParams.dxfBasePoint);
        addArc(stringerParams.flanShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 1.5, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
        addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

        holes = stringerParams.flanShape.holes;
    }
    else {
        stringerParams.flanangle1PointInsert = newPoint_xy(p0, 10.0, 0.0);
    }

    // отверстия

    var p1 = copyPoint(p0);

    // левые отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p1, 35.0, -20.0);
    var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
    var center3 = newPoint_xy(center1, 0.0, -60.0);
    var center4 = newPoint_xy(center1, stringerParams.holeDist, -60.0);
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
  	var dx = stringerParams.holeDist;
    if (stringerParams.holeDist * 3 + 100.0 > skew2) {
        dx = Math.ceil((skew2 - 110.0 - stringerParams.holeDist) * 0.5);
    }
  	center1 = newPoint_xy(center2, dx + dx, 0.0);
    center2 = newPoint_xy(center1, -dx, 0.0);
    center3 = newPoint_xy(center2, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
} //end of drawFlanKo








/*внешний косоур среднего марша П-образной лестницы*/

function drawStringer5(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, turnLength,
            marshDist, stringerSideOffset) {

    var stringerPlatformHeight = 150;


    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a2 - b2;
        stringerOffset_y = treadThickness;
        //console.log(stringerOffset_y);
    }

    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(stringerOffset_x, -stringerOffset_y);


    /*stringer top line*/

    if (stringerType == "пилообразная" || stringerType == "ломаная") {


        /*низ марша*/
        stringerPlatformHeight = Math.max(h1, h2);
        if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

        if (turnType_1 == "площадка") {
            //площадка
            x1 = stringerOffset_x;
            y1 = stringerPlatformHeight - stringerOffset_y;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + turnLength - stringerOffset_x;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        if (turnType_1 == "забег") {

            //первый забег
            x1 = stringerOffset_x;
            y1 = Math.max(h1, h2) - stringerOffset_y;
            if (stringerType == "ломаная") y1 = stringerWidth - stringerOffset_y;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + (turnLength - L2);
            if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset) * Math.tan(Math.PI / 6));
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x2;
            y1t = y2;

            //второй забег
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = turnLength;
            if (model == 'ко') x2 = x2 + L1;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем
            x2t = x2;
            y2t = y2;
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        /*прямые ступени*/

        for (var i = 1; i < stairAmt2; i++) {
            x1 = b2 * (i - 1) + x0;
            y1 = h2 * i + y0
            stringerShape.lineTo(x1, y1);
            x2 = b2 * i + x0;
            y2 = h2 * i + y0;
            stringerShape.lineTo(x2, y2);
        }
        x0 = x2;
        y0 = y2;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);

        if (turnType_2 == "площадка") {
            //последний подъем
            x1 = x0;
            y1 = y0 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b2;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //площадка
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + turnLength - stringerSideOffset;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_2 == "забег") {
            //последний подъем
            if (stairAmt2) {
                x1 = x0;
                y1 = y0 + h2;
                stringerShape.lineTo(x1, y1);
                x2 = x1 + b2;
                y2 = y1;
                stringerShape.lineTo(x2, y2);
            }
            else {
                x2 = x0 + marshDist;
                y2 = y0;
                stringerShape.lineTo(x2, y2);
            }

            //забег 1
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L2;
            if (model == "ко") x2 = x1 + L2 * (turnLength - stringerSideOffset) / turnLength;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //забег 2
            x1 = x2;
            y1 = y2 + h3;
            stringerShape.lineTo(x1, y1);
            x2 = x1t + turnLength;
            if (model == "ко") x2 = x2 - stringerSideOffset
            y2 = y1;
            stringerShape.lineTo(x2, y2);


        }
        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight;
        if (stringerType == "ломаная") p1_y = y2 - stringerWidth;
        stringerShape.lineTo(p1_x, p1_y);
    }

    if (stringerType == "прямая") {

        /*низ марша*/
        stringerPlatformHeight = Math.max(h1, h2);
        x1 = 0;
        y1 = stringerPlatformHeight;
        stringerShape.lineTo(x1, y1);

        if (turnType_1 == "площадка") {
            //площадка

            x2 = x1 + turnLength - b2;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //базовая точка для прямых ступеней
            x0 = x2 + b2;
            y0 = y2 + h2;
        }

        if (turnType_1 == "забег") {
            //первый забег
            x2 = x1 + (turnLength - L2);
            y2 = y1 + h2;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x2;
            y1t = y2;

            //второй забег
            //x1 = x2 //+ L2;
            //y1 = y2 + h2;
            //stringerShape.lineTo(x1, y1);
            x2 = x2 + L2;
            y2 = y2 + h2;
            if (stairAmt2) stringerShape.lineTo(x2, y2);
            //сохраняем
            x2t = x2;
            y2t = y2;
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }


        x0 = b2 * stairAmt2 + x0;
        y0 = h2 * (stairAmt2 - 1) + y0;

        if (!stairAmt2) x0 = x0 + marshDist;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);

        if (turnType_2 == "площадка") {
            x2 = x0
            y2 = y0 + h2;
            stringerShape.lineTo(x2, y2);

            //площадка

            x2 = x2 + turnLength;
            y2 = y2;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_2 == "забег") {

            //забег 1
            x1 = x0;
            y1 = y0 + h2;
            if (stairAmt2) stringerShape.lineTo(x1, y1);
            x2 = x1 + L2;
            y2 = y1 + h3;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //забег 2

            x2 = x1t + turnLength;
            y2 = y1t + h3;
            stringerShape.lineTo(x2, y2);


        }
        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight;
        stringerShape.lineTo(p1_x, p1_y);



    }

    /*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

        if (turnType_2 == "забег") {
            if (stairAmt2) {
                x1 = x1t + b2;
                y1 = y1t - h2;
                stringerShape.lineTo(x1, y1);
            }
            else {
                x1 = p1_x;
                y1 = p1_y;
            }

        }
        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + b2;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
        }

        if (turnType_1 == "площадка") {
            //stringerShape.moveTo(stringerOffset_x, -stringerOffset_y);
            stringerShape.lineTo(turnLength + stringerOffset_x, -stringerOffset_y);
            stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);

        }

        if (turnType_1 == "забег") {
            if (stairAmt2) {
                x1 = turnLength + b2;
                y1 = h2 + stringerPlatformHeight;
                stringerShape.lineTo(x1, y1);
            }
            stringerShape.lineTo(b2 + stringerOffset_x, -stringerOffset_y);
            stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);
        }
    }

    if (stringerType == "ломаная") {

        if (turnType_2 == "забег") {
            //if (stairAmt2) {
            //второй забег
            x1 = p1_x - (turnLength - L2) + stringerWidth;
            y1 = p1_y //- h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = y1 - h3;
            stringerShape.lineTo(x2, y2);
            //первый забег
            x1 = x2 - L2;
            y1 = y2;
            stringerShape.lineTo(x1, y1);
            x1 = x1;
            y1 = y1 - h2;
            stringerShape.lineTo(x1, y1);

        }
        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + stringerWidth;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
            y1 = y1 - h2;
            stringerShape.lineTo(x1, y1);

        }

        for (var i = 1; i < stairAmt2 + 1; i++) {
            x2 = x1 - b2 * i;
            y2 = y1 - h2 * (i - 1);
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2
            stringerShape.lineTo(x2, y2);
        }
        if (!stairAmt2) {
            x2 = x1 - marshDist;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_1 == "забег") {

            x2 = x2 - L2;
            y2 = y2
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2
            stringerShape.lineTo(x2, y2);
        }


        stringerShape.lineTo(stringerOffset_x, -stringerOffset_y);
    }

    return stringerShape;
}//end of drawStringer5


/*внутренний косоур среднего марша П-образной лестницы*/

function drawStringer6(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, turnLength,
            marshDist, stringerSideOffset) {

    var stringerPlatformHeight = 150;

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a2 - b2;
        stringerOffset_y = treadThickness;
    }
    var stringerPlatformHeight = Math.max(h1, h2);
    if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(0, 0);


    /*stringer top line*/
    if (stringerType == "пилообразная" || stringerType == "ломаная") {

        /*низ марша*/

        if (turnType_1 == "площадка") {
            if (model == "ко") {
                //выступ под площадкой
                x1 = -stringerSideOffset;
                y1 = 0;
                stringerShape.lineTo(x1, y1);
                x2 = x1;
                y2 = stringerPlatformHeight - stringerOffset_y;
                stringerShape.lineTo(x2, y2);
                x2 = 0
                stringerShape.lineTo(x2, y2);
            }
            else {
                //первый подъем
                x2 = 0; //stringerOffset_x;
                y2 = stringerPlatformHeight;
                stringerShape.lineTo(x2, y2);
            }
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        if (turnType_1 == "забег") {
            //выступ под площадкой
            if (model == "ко") {
                x1 = -stringerSideOffset;
                y1 = 0;
                stringerShape.lineTo(x1, y1);
                x2 = x1;
                y2 = h2 - stringerOffset_y;
                stringerShape.lineTo(x2, y2);
                x1 = -(stringerSideOffset - L1) / Math.tan(Math.PI / 6);
                y1 = y2;
                stringerShape.lineTo(x1, y1);
                x1 = x1;
                y1 = y1 + h2;
                stringerShape.lineTo(x1, y1);

                x2 = L1 - stringerSideOffset * Math.tan(Math.PI / 6);
                y2 = y1
                stringerShape.lineTo(x2, y2);

                x2 = x2;
                y2 = y2 + h2;
                stringerShape.lineTo(x2, y2);

                x2 = L1;
                y2 = y2;
                stringerShape.lineTo(x2, y2);
            }
            else {
                //первый подъем
                x2 = 0;
                y2 = 3 * h2;
                stringerShape.lineTo(x2, y2);
            }

            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        /*прямые ступени*/

        for (var i = 1; i < stairAmt2; i++) {
            x1 = b2 * (i - 1) + x0;
            y1 = h2 * i + y0
            stringerShape.lineTo(x1, y1);
            x2 = b2 * i + x0;
            y2 = h2 * i + y0;
            stringerShape.lineTo(x2, y2);
        }
        x0 = x2;
        y0 = y2;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);
        if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

        if (turnType_2 == "площадка") {
            //последний подъем
            x1 = x0;
            y1 = y0 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b2;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //площадка
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + turnLength - stringerSideOffset;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //зад площадки
            var p1_x = x2;
            var p1_y = y2 - stringerPlatformHeight;
            stringerShape.lineTo(p1_x, p1_y);

        }

        if (turnType_2 == "забег") {
            //последний подъем
            if (stairAmt2) {
                x1 = x0;
                y1 = y0 + h2;
                stringerShape.lineTo(x1, y1);
                x2 = x1 + b2;
                y2 = y1;
                stringerShape.lineTo(x2, y2);
            }
            else {
                x2 = x0 + marshDist;
                y2 = y0;
                stringerShape.lineTo(x2, y2);
            }

            //забег 1
            x1 = x2;
            y1 = y2 + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L1 + stringerSideOffset;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //зад площадки
            if (stringerType == "пилообразная") {
                if (stairAmt2) {
                    p1_x = x2;
                    p1_y = y2 - 2 * h2 + L1 * h2 / b2;
                    stringerShape.lineTo(p1_x, p1_y);
                }
                else {
                    p1_x = x2;
                    p1_y = y2 - h2 + L1 * h2 / b2;
                    stringerShape.lineTo(p1_x, p1_y);
                }
            }
            if (stringerType == "ломаная") {
                p1_x = x2;
                p1_y = y2 - h2 - stringerWidth;
                stringerShape.lineTo(p1_x, p1_y);
            }

        }

    }

    if (stringerType == "прямая") {

        /*низ марша*/

        if (turnType_1 == "площадка") {
            //площадка
            x1 = 0;
            y1 = stringerPlatformHeight + h2;
            stringerShape.lineTo(x1, y1);

            //базовая точка для прямых ступеней
            x0 = x1;
            y0 = y1;
        }

        if (turnType_1 == "забег") {

            //первый подъем
            x2 = 0;
            y2 = 3 * h2;
            stringerShape.lineTo(x2, y2);
            if (stairAmt2) {
                x2 = x2;
                y2 = y2 + h2;
                stringerShape.lineTo(x2, y2);
            }
            else {
                x2 = x2 + marshDist;
                y2 = y2 + h2;
                stringerShape.lineTo(x2, y2);
            }
            //базовая точка для прямых ступеней
            x0 = x2;
            y0 = y2;
        }

        x0 = b2 * stairAmt2 + x0;
        y0 = h2 * stairAmt2 + y0;

        /*верх марша*/

        stringerPlatformHeight = Math.max(h2, h3);

        if (turnType_2 == "площадка") {
            //площадка
            x1 = x0;
            y1 = y0;
            stringerShape.lineTo(x1, y1);
            x2 = x0 + turnLength;
            y2 = y0;
            stringerShape.lineTo(x2, y2);

            //зад площадки
            var p1_x = x2;
            var p1_y = y2 - stringerPlatformHeight;
            stringerShape.lineTo(p1_x, p1_y);

        }

        if (turnType_2 == "забег") {
            //забег 1
            x1 = x0;
            y1 = y0// + h2;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L1;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //зад площадки
            if (stairAmt2) {
                x1 = x2;
                y1 = y2 - 2 * h2 + L1 * h2 / b2;
                stringerShape.lineTo(x1, y1);
            }
            else {
                x1 = x2;
                y1 = y2 - h2 + L1 * h2 / b2;
                stringerShape.lineTo(x1, y1);
            }


        }

    }


    /*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

        if (turnType_2 == "забег") {
        }

        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + b2;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
        }

        if (turnType_1 == "площадка") {
        }

        if (turnType_1 == "забег") {
            /*
                if (model == "ко") x2 = (L1 + 130);
                else x2 = 130;
                y2 = 2*h2 + 130*h2/b2;
                stringerShape.lineTo(x2, y2);
                x1 = 70;
                y1 = 0;
                stringerShape.lineTo(x1, y1);
        */
            if (model == "ко") x2 = (L1 + 130);
            else x2 = 130;
            y2 = 2 * h2 + 130 * h2 / b2;
            stringerShape.lineTo(x2, y2);
            if (model == "ко") x1 = (80 - stringerSideOffset);
            else x1 = 70;
            y1 = 0;
            stringerShape.lineTo(x1, y1);


        }


    }

    if (stringerType == "ломаная") {
        if (turnType_2 == "площадка") {
            x1 = p1_x - turnLength + stringerWidth;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
            y1 = y1 - h2;
            stringerShape.lineTo(x1, y1);
        }

        if (turnType_2 == "забег") {
            x1 = p1_x - L1 + stringerWidth - stringerSideOffset;
            y1 = p1_y;
        }

        for (var i = 1; i < stairAmt2 + 1; i++) {
            x2 = x1 - b2 * i;
            y2 = y1 - h2 * (i - 1);
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2
            stringerShape.lineTo(x2, y2);
        }

        if (!stairAmt2) {
            x2 = x1 - marshDist;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
        }

        if (turnType_1 == "забег") {
            x2 = stringerWidth;
            y2 = 0;
            stringerShape.lineTo(x2, y2);
        }


    }

    stringerShape.lineTo(0, 0);



    return stringerShape;
}//end of drawStringer6




function drawTopFixFlan(length, dxfBasePoint, dxfPrimitivesArr) {
    /*функция отрисовывает верхний фланец крепления к перекрытию ФК-15*/
    // var dxfBasePoint = { "x": 0.0, "y": 0.0 };
    var flanParams = {
        width: 100,
        holeDiam: 13,
        holeDiam5: 0,
        angleRadUp: 10,
        angleRadDn: 10,
        hole1X: 50,
        hole1Y: 20,
        hole2X: 20,
        hole2Y: 20,
        hole3X: 20,
        hole3Y: 20,
        hole4X: 50,
        hole4Y: 80,
        hole5X: 0,
        hole5Y: 0,
        height: length,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    };

    //добавляем фланец
    flanParams = drawRectFlan(flanParams);

    var text = "Фланец верхний";
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, -50, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var thickness = 8;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanParams.shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var metalMaterial = new THREE.MeshLambertMaterial({ color: 0x363636, wireframe: false });
    flanParams.mesh = new THREE.Mesh(geometry, metalMaterial);

    return flanParams;
}//end of drawTopFixFlan


function drawTopFixFrameUnit(unitParams) {
    /*функция отрисовывает блок верхней ступени для крепления с вертикальной рамкой*/
    var topFixUnit = {}
    topFixUnit.frame = new THREE.Object3D();
    topFixUnit.tread = new THREE.Shape();
    topFixUnit.riser = new THREE.Shape();

    var frameFlanThickness = 8;
    var width = unitParams.width - 2 * frameFlanThickness;
    var height = unitParams.height;
    var angleThickess = 4;
    var anglesize = 40;
    var metalMaterial = unitParams.metalMaterial;
    var treadMaterial = unitParams.treadMaterial;


    var firstPosition_x = unitParams.basepoint.x + 90 - 5 - anglesize;
    var firstPosition_y = unitParams.basepoint.y - 20 - 20;
    var firstPosition_z = unitParams.basepoint.z + unitParams.stringerSideOffset;
    if (unitParams.model == "ко") {
        width = width - 2 * unitParams.stringerSideOffset;
        firstPosition_x = unitParams.basepoint.x + unitParams.nose;
    }

    var deltaY = unitParams.h1 - height + 20;

    // нижняя горизонт. полка
    geometry = new THREE.BoxGeometry(anglesize, angleThickess, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + angleThickess / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // нижняя вертик. полка
    geometry = new THREE.BoxGeometry(angleThickess, anglesize, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize - angleThickess / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + anglesize / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // верхняя горизонт. полка
    geometry = new THREE.BoxGeometry(anglesize, angleThickess, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + height - angleThickess / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // верхняя вертик. полка
    geometry = new THREE.BoxGeometry(angleThickess, anglesize, width);
    topFrameType4 = new THREE.Mesh(geometry, metalMaterial);
    topFrameType4.position.x = firstPosition_x + anglesize - angleThickess / 2;
    topFrameType4.position.y = firstPosition_y - unitParams.treadThickness / 2 + height - anglesize / 2 + deltaY;
    topFrameType4.position.z = firstPosition_z + width / 2 + unitParams.stringerThickness + frameFlanThickness;
    topFixUnit.frame.add(topFrameType4);

    // фланцы
    var shape = drawTopFrameFlan(height, width, unitParams.dxfBasePoint);
    var extrudeOptions = {
        amount: frameFlanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    // левый фланец
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topLeftFrameFlan = new THREE.Mesh(geometry, metalMaterial);
    topLeftFrameFlan.position.x = firstPosition_x;
    topLeftFrameFlan.position.y = firstPosition_y - unitParams.treadThickness / 2 + deltaY;
    topLeftFrameFlan.position.z = firstPosition_z + unitParams.stringerThickness;
    topFixUnit.frame.add(topLeftFrameFlan);

    // правый фланец
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var topRightFrameFlan = new THREE.Mesh(geometry, metalMaterial);
    topRightFrameFlan.position.x = firstPosition_x;
    topRightFrameFlan.position.y = firstPosition_y - unitParams.treadThickness / 2 + deltaY;
    topRightFrameFlan.position.z = firstPosition_z + unitParams.stringerThickness + width + frameFlanThickness;
    topFixUnit.frame.add(topRightFrameFlan);



    // верхний узкий кусок ступени
    var lastTreadWidth = 80;
    if (unitParams.model == "ко") {
        lastTreadWidth = 40 + unitParams.nose;
    }
    //console.log(lastTreadWidth, unitParams.treadThickness, unitParams.treadWidth)
    geometry = new THREE.BoxGeometry(lastTreadWidth, unitParams.treadThickness, unitParams.treadWidth);
    var tread;
    tread = new THREE.Mesh(geometry, treadMaterial);
    tread.position.y = firstPosition_y + unitParams.treadThickness / 2 + unitParams.h1;
    tread.position.x = firstPosition_x;
    if (unitParams.model == "ко") {
        tread.position.x = firstPosition_x + 40 - lastTreadWidth / 2;
    }
    tread.position.z = unitParams.M / 2;
    tread.castShadow = true;
    topFixUnit.tread = tread;

    // рисуем подступенок
    riserHeight = unitParams.h1 - unitParams.treadThickness;
    geometry = new THREE.BoxGeometry(unitParams.riserThickness, riserHeight, unitParams.treadWidth);

    var riser;
    riser = new THREE.Mesh(geometry, treadMaterial);
    riser.position.y = firstPosition_y + riserHeight / 2 + unitParams.treadThickness;
    riser.position.x = firstPosition_x - unitParams.riserThickness / 2;
    if (unitParams.model == "ко") {
        riser.position.x = firstPosition_x - unitParams.riserThickness / 2;
    }
    riser.position.z = unitParams.M / 2;
    riser.castShadow = true;
    topFixUnit.riser = riser;

    topFixUnit.complexUnit = new THREE.Object3D();
    topFixUnit.complexUnit.add(topFixUnit.frame);
    topFixUnit.complexUnit.add(topFixUnit.tread);
    topFixUnit.complexUnit.add(topFixUnit.riser);

    //поворот деталей
    topFixUnit.complexUnit.rotation.y = unitParams.basepoint.rotationY;
    //topFixUnit.tread.rotation.y = unitParams.basepoint.rotationY;
    //topFixUnit.riser.rotation.y = unitParams.basepoint.rotationY;


    return topFixUnit;

} //end of drawTopFixFrameUnit()

//фланец вертикальной рамки крепленя к перекрытию

function drawTopFrameFlan(height, width, dxfBasePoint) {
    var shape = new THREE.Shape();
    flanWidth = 40;
    flanLength = height;

    /*внешний контур*/

    var p1 = { x: 0, y: 0 }
    var p2 = newPoint_xy(p1, flanWidth, 0) // params basePoint, deltaX, deltaY
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0, flanLength);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, -flanWidth, 0);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = copyPoint(p2);
    p2 = newPoint_xy(p1, 0, -flanLength);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

    /*первое овальное отверстие*/
    var hole1 = new THREE.Path();
    var holeWidth = 13;
    var center1 = { x: 20, y: 30 };
    var center2 = newPoint_xy(center1, 0, 40);
    var p1 = newPoint_xy(center1, holeWidth / 2, 0);
    var p2 = newPoint_xy(center2, holeWidth / 2, 0);
    var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
    var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
    addLine(hole1, dxfPrimitivesArr, p1, p2, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr, center2, holeWidth / 2, 0, Math.PI, dxfBasePoint)
    addLine(hole1, dxfPrimitivesArr, p3, p4, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr, center1, holeWidth / 2, Math.PI, Math.PI * 2, dxfBasePoint)
    shape.holes.push(hole1);

    /*второе овальное отверстие*/
    var hole1 = new THREE.Path();
    var holeWidth = 13;
    var center1 = { x: 20, y: height - 30 - 40 };
    var center2 = newPoint_xy(center1, 0, 40);
    var p1 = newPoint_xy(center1, holeWidth / 2, 0);
    var p2 = newPoint_xy(center2, holeWidth / 2, 0);
    var p3 = newPoint_xy(center2, -holeWidth / 2, 0);
    var p4 = newPoint_xy(center1, -holeWidth / 2, 0);
    addLine(hole1, dxfPrimitivesArr, p1, p2, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr, center2, holeWidth / 2, 0, Math.PI, dxfBasePoint)
    addLine(hole1, dxfPrimitivesArr, p3, p4, dxfBasePoint)
    addArc(hole1, dxfPrimitivesArr, center1, holeWidth / 2, Math.PI, Math.PI * 2, dxfBasePoint)
    shape.holes.push(hole1);

	var text = "Фланец верхней рамки"
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, 20, -150.0);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    return shape;
}// end of drawTopFrameFlan



function drawLtTurnFrame1(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var M = frameParams.M;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    /*** ДОБАВЛЕНИЕ ФЛАНЦЕВ ***/

    var rightFlanPosition = stringerThickness;
    var leftFlanPosition = M - 2 * stringerThickness - flanThickness;
    //задаем параметры фланца
    //dxfBasePoint = {x: 0, y: 0};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);
    //var dxfPrimitivesArr = {};
    var alfa = toRadians(20.0215);
    var widthShortFlan = 20 + 20 + 58 + 20 + (20 / Math.cos(alfa));
    var widthLongFlan = widthShortFlan + Math.tan(alfa) * (M - 2 * stringerThickness - 2 * flanThickness);

    /*короткий фланец*/
    var flanParams = {
        width: widthShortFlan,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 40,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 98,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    // координаты отверстий рамки
    var holesCoordinates1_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    // размеры рамки
    var frameDimensions = { x: widthLongFlan, z: M - 2 * stringerThickness };

    //добавляем коротий фланец
    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию короткого фланца
    if (turnFactor == -1) {
        flan.position.x = -frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }
    else {
        //flan.position.x = frameParams.basepoint.x * Math.sin(frameParams.basepoint.rotationY) - flanThickness * Math.cos(frameParams.basepoint.rotationY);
        flan.position.x = (frameParams.basepoint.x - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + 0;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);//-flanThickness * Math.cos(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }

    //добавляем фланец в сцену
    frameParams.frame.add(flan);

    /*длинный фланец*/
    //dxfBasePoint = {x: 0, y: 100};
    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 100)
    flanParams = {
        width: widthLongFlan,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 50,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 98 + 20 + Math.tan(alfa) * (M - 2 * stringerThickness - 2 * flanThickness) - 30,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    }
    var holesCoordinates1_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    //добавляем фланец
    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию фланца
    if (turnFactor == -1) {
        flan.position.x = (-frameParams.basepoint.x + leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }
    else {
        flan.position.x = (frameParams.basepoint.x - (leftFlanPosition + flanThickness)) * Math.cos(frameParams.basepoint.rotationY) + frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + 0;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - (leftFlanPosition + flanThickness)) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY + Math.PI / 2;
        flan.rotation.z = 0;
    }

    //добавляем фланец в сцену
    frameParams.frame.add(flan);

    /*** ДОБАВЛЕНИЕ ПРОФИЛЕЙ ***/

    /*задаем параметры объекта*/

    var profileHeight = 40;
    var profileWidth = 20;
    var angle;
    if (turnFactor == -1) {
        angle = -alfa;
    }
    else {
        angle = alfa;
    }
    var angle1 = Math.PI / 2 - angle;
    var angle2 = Math.PI / 2 - angle;
    var backLength1 = (M - 2 * stringerThickness - 2 * flanThickness) / Math.cos(alfa);
    var backLength2 = M - 2 * stringerThickness - 2 * flanThickness;

    /*задний профиль*/

    //var dxfBasePoint = {x:0, y:200};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 250);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: angle1,
        angle2: angle2,
        backLength: backLength1,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == -1) {
        profile.position.x = (-frameParams.basepoint.x + flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - (widthShortFlan)) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - (widthShortFlan)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY - alfa;
    }
    else {
        profile.position.x = (frameParams.basepoint.x - leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.z - (widthLongFlan)) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - (widthLongFlan)) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = -frameParams.basepoint.rotationY + alfa;
    }
    frameParams.frame.add(profile);

    /*передний профиль*/

    //var dxfBasePoint = {x:0, y:300};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 300);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2,
        angle2: Math.PI / 2,
        backLength: backLength2,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile1 = profileParams.mesh;
    if (turnFactor == -1) {
        profile1.position.x = (-frameParams.basepoint.x + flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        profile1.position.y = frameParams.basepoint.y + profileHeight;
        profile1.position.z = (frameParams.basepoint.z - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile1.rotation.x = Math.PI / 2;
        profile1.rotation.y = 0;
        profile1.rotation.z = frameParams.basepoint.rotationY + 0;
    }
    else {
        profile1.position.x = (frameParams.basepoint.x - leftFlanPosition) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        profile1.position.y = frameParams.basepoint.y + profileHeight;
        profile1.position.z = (frameParams.basepoint.z - profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x - leftFlanPosition) * Math.sin(frameParams.basepoint.rotationY);
        profile1.rotation.x = Math.PI / 2;
        profile1.rotation.y = 0;
        profile1.rotation.z = -frameParams.basepoint.rotationY + 0;
    }
    frameParams.frame.add(profile1);

    var holesCoordinates = { holesCoordinates1_1: holesCoordinates1_1, holesCoordinates1_2: holesCoordinates1_2 };
    //добавляем объекты в сцену
    frameParams.holesCoordinates = holesCoordinates;
    frameParams.frameDimensions = frameDimensions;
    return frameParams;
}// end of drawLtTurnFrame1

function drawLtTurnFrame2(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var M = frameParams.M;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    var alfa = toRadians(55.5134);		// угол первого профиля из 3д модели
    var betta = toRadians(22.6552);		// угол второго профиля из 3д модели
    var profileHeight = 40;				// высота профиля
    var profileWidth = 20;				// ширина профиля

    /* Расчёты размеров */

    var a = profileWidth / Math.cos(betta);
    var c = profileWidth / Math.cos(Math.PI / 2 - alfa);
    var flan1Lenght = 80 + c;
    var profile1Lenght = (M - 2 * (stringerThickness + flanThickness)) / Math.sin(alfa);
    var flan2Lenght = M - stringerThickness + c - profile1Lenght * Math.cos(alfa);
    var profile2Lenght = (M - stringerThickness - flanThickness) / Math.cos(betta);
    var flan3Lenght = M - 2 * (stringerThickness + flanThickness) - profile2Lenght * Math.sin(betta);
    var x3_1 = Math.cos(betta) * (profile2Lenght - 50);
    var z3_1 = Math.sin(betta) * (profile2Lenght - 50) + a;
    var x3_2 = Math.cos(alfa) * (profile1Lenght - 50);
    var z3_2 = Math.sin(alfa) * (profile1Lenght - 50);
    var gamma = Math.atan((z3_2 - z3_1) / (x3_2 - x3_1));
    var profile3Lenght = (z3_2 - z3_1) / Math.sin(gamma);
    var gamma1 = Math.PI / 2 + gamma - betta;
    var gamma2 = alfa - gamma - Math.PI / 2;

    /*** ДОБАВЛЕНИЕ ФЛАНЦЕВ ***/

    //var dxfBasePoint = {x: 0, y: 400};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 0.0);
    //var dxfPrimitivesArr = {};

    /** Добавляем первый фланец **/
    var flanParams = {
        width: 40,  //ширина фланца
        height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 5,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    //координаты отверстий
    var holesCoordinates2_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    // рзмеры рамки
    var frameDimensions = { x: (M - 2 * stringerThickness) + flan1Lenght, z: M - 2 * stringerThickness };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию первого фланца
    if (turnFactor == 1) {
        flan.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI / 2;
    }
    else {
        flan.position.x = -(5 + stringerThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - 10) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = frameParams.basepoint.z * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY - Math.PI;
        flan.rotation.z = -Math.PI / 2;
    }
    frameParams.frame.add(flan);

    /*** Добавляем первый профиль ***/

    //var dxfBasePoint = {x:0, y:550};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 160);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: alfa,
        angle2: alfa,
        backLength: profile1Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {
        profile.position.x = (frameParams.basepoint.x - (flan1Lenght - c)) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + c) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY + Math.PI - alfa;
    }
    else {
        profile.position.x = (frameParams.basepoint.x + (flan1Lenght - c)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - 10 + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + c) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = -Math.PI;
        profile.rotation.z = frameParams.basepoint.rotationY + Math.PI - alfa;
    }
    frameParams.frame.add(profile);

    /** Добавляем второй фланец **/

    //dxfBasePoint = {x: 0, y: 600};
    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 240);

    var flanParams = {
        width: flan2Lenght,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: flan2Lenght - c - 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 0,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 0,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    var holesCoordinates2_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию второго фланца
    if (turnFactor == 1) {
        flan.position.x =
		(frameParams.basepoint.x - (M - stringerThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) -
		(frameParams.basepoint.x + M - stringerThickness - flanThickness) * Math.sin(frameParams.basepoint.rotationY);

        flan.position.y = frameParams.basepoint.y;

        flan.position.z =
		(frameParams.basepoint.z - (M - stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - stringerThickness - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = 0;
    }
    else {
        flan.position.x = (frameParams.basepoint.x + (M - stringerThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + M - stringerThickness - flanThickness - 10) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.height;
        flan.position.z = (frameParams.basepoint.z - (M - stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - stringerThickness - frameParams.basepoint.z)/*(frameParams.basepoint.x + M - flan1Lenght -5)*/ * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI;
    }
    frameParams.frame.add(flan);

    /*** Добавляем второй профиль ***/

    //var dxfBasePoint = {x:0, y:700};
    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 320);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2 + betta,
        angle2: Math.PI - (alfa - betta),
        backLength: profile2Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {
        profile.position.x =
		(frameParams.basepoint.x - flan1Lenght - profile2Lenght * Math.cos(betta)) * Math.cos(frameParams.basepoint.rotationY) -
		(profile2Lenght * Math.sin(betta) + frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);

        profile.position.y = frameParams.basepoint.y;

        profile.position.z =
		(frameParams.basepoint.z - flanThickness - profile2Lenght * Math.sin(betta)) * Math.cos(frameParams.basepoint.rotationY) +
		(profile2Lenght * Math.cos(betta) - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);

        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY - betta;
    }
    else {
        profile.position.x = (frameParams.basepoint.x + flan1Lenght + profile2Lenght * Math.cos(betta)) * Math.cos(frameParams.basepoint.rotationY) + (profile2Lenght * Math.sin(betta) + frameParams.basepoint.x - 10 + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - flanThickness - profile2Lenght * Math.sin(betta)) * Math.cos(frameParams.basepoint.rotationY) + (profile2Lenght * Math.cos(betta) - frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = Math.PI;
        profile.rotation.z = frameParams.basepoint.rotationY - betta;
    }
    frameParams.frame.add(profile);

    /** Добавляем третий фланец**/

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 400);

    flanParams = {
        width: flan3Lenght,  //ширина фланца
        height: 40,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: flan3Lenght - a - 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 0,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 0,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    }
    var holesCoordinates2_3 = { x1: flanParams.hole1X, y1: flanParams.hole1Y };
    //добавляем фланец
    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию фланца
    if (turnFactor == 1) {
        flan.position.x =
		(frameParams.basepoint.x - (M - stringerThickness - flanThickness + flan1Lenght)) * Math.cos(frameParams.basepoint.rotationY) -
		(frameParams.basepoint.x + M - 2 * stringerThickness - flanThickness) * Math.sin(frameParams.basepoint.rotationY);

        flan.position.y =
		frameParams.basepoint.y;

        flan.position.z =
		(frameParams.basepoint.z - (M - 2 * stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) +
		(M - frameParams.basepoint.z - flanThickness - stringerThickness) * Math.sin(frameParams.basepoint.rotationY);

        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY - Math.PI / 2;
        flan.rotation.z = 0;
    }
    else {
        flan.position.x = (frameParams.basepoint.x + (M - stringerThickness - flanThickness + flan1Lenght) + flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (M + frameParams.basepoint.x - 2 * stringerThickness - flanThickness - 10) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = (frameParams.basepoint.z - (M - 2 * stringerThickness - flanThickness)) * Math.cos(frameParams.basepoint.rotationY) + (M - frameParams.basepoint.z - stringerThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = -frameParams.basepoint.rotationY - Math.PI / 2;
        flan.rotation.z = 0;
    }

    //добавляем фланец в сцену
    frameParams.frame.add(flan);

    /*** Добавляем третий профиль ***/

    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 480);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2 - gamma1,
        angle2: Math.PI / 2 + gamma2,
        backLength: -profile3Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {
        profile.position.x =
		(frameParams.basepoint.x - flan1Lenght - x3_1) * Math.cos(frameParams.basepoint.rotationY) -
		(z3_1 + frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);

        profile.position.y = frameParams.basepoint.y + profileHeight;

        profile.position.z =
		(frameParams.basepoint.z - flanThickness - z3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(x3_1 - frameParams.basepoint.z - 5) * Math.sin(frameParams.basepoint.rotationY);

        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = -frameParams.basepoint.rotationY + gamma;
    }
    else {
        profile.position.x = (frameParams.basepoint.x + flan1Lenght + x3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(z3_1 + frameParams.basepoint.x - 5) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness - z3_1) * Math.cos(frameParams.basepoint.rotationY) +
		(x3_1 - frameParams.basepoint.z - 5) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = -Math.PI;
        profile.rotation.z = -frameParams.basepoint.rotationY + gamma;
    }
    frameParams.frame.add(profile);

    var holesCoordinates = { holesCoordinates2_1: holesCoordinates2_1, holesCoordinates2_2: holesCoordinates2_2, holesCoordinates2_3: holesCoordinates2_3 };
    //добавляем объекты в сцену
    frameParams.holesCoordinates = holesCoordinates;
    frameParams.frameDimensions = frameDimensions;
    return frameParams;
}// end of drawLtTurnFrame2

function drawLtTurnFrame3(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var limMarshDist = 205;
    var M = frameParams.M;
    var marshDist = frameParams.marshDist;
    var stairModel = frameParams.stairModel;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    if (marshDist < limMarshDist) {									// для маленького межмаршевого расстояния
        //задаем параметры фланца

        var alfa = toRadians(34.4866);
        var profileHeight = 40;				// высота профиля
        var profileWidth = 20;				// ширина профиля

        /* Расчёты размеров */

        var a = profileWidth / Math.cos(alfa);
        var flan1Lenght = 80 + profileWidth;
        var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
        var profile2Lenght = profile1Lenght / Math.cos(alfa);
        var flan2Lenght = profile2Lenght * Math.sin(alfa) + profileWidth;

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 0);

        /* Первый фланец */

        var flanParams = {
            width: 40,  //ширина фланца
            height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 5,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        // координаты отверстий
        var holesCoordinates3_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
        // размеры рамки
        var frameDimensions = { x: flan2Lenght + flan1Lenght - profileWidth, z: M - 2 * stringerThickness };

        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию первого фланца

        if (turnFactor == 1) {						// для правого
            flan.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.width;
            flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = -Math.PI / 2;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.width;
            flan.position.z = (frameParams.basepoint.z) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = Math.PI;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI / 2;
        }
        frameParams.frame.add(flan);

        /* Первый профиль */

        dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 140);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: Math.PI / 2,
            angle2: Math.PI / 2,
            backLength: profile1Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile = profileParams.mesh;
        if (turnFactor == 1) {									// для правого
            profile.position.x = (frameParams.basepoint.x + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y;
            profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = -Math.PI / 2;
            profile.rotation.y = 0;
            profile.rotation.z = frameParams.basepoint.rotationY + Math.PI / 2;
        }
        else {							// для левого
            profile.position.x = (frameParams.basepoint.x - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y;
            profile.position.z = (frameParams.basepoint.z - flanThickness - profile1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = -Math.PI / 2;
            profile.rotation.y = 0;
            profile.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
        }
        frameParams.frame.add(profile);

        /* Второй профиль */

        dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 200);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: alfa,
            angle2: Math.PI / 2 + alfa,
            backLength: profile2Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile = profileParams.mesh;
        if (turnFactor == 1) {		// для правого
            profile.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y + profileHeight;
            profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = -Math.PI / 2;
            profile.rotation.y = Math.PI;
            profile.rotation.z = -frameParams.basepoint.rotationY + Math.PI / 2 - alfa;
        }
        else {						// для левого
            profile.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile.position.y = frameParams.basepoint.y;
            profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
            profile.rotation.x = Math.PI / 2;
            profile.rotation.y = Math.PI;
            profile.rotation.z = -frameParams.basepoint.rotationY - Math.PI / 2 - alfa;
        }
        frameParams.frame.add(profile);

        /* Второй фланец */

        dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -100, 0);

        var flanParams = {
            width: 40,  //ширина фланца
            height: flan2Lenght,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 0,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: a + 30,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: profileWidth + 30,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        var holesCoordinates3_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };

        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию второго фланца
        if (turnFactor == 1) {						// для правого
            flan.position.x = (frameParams.basepoint.x - flan2Lenght + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + profile1Lenght + 2 * flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.width;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - flan2Lenght + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = -Math.PI / 2;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x + flan2Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + profile1Lenght + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI / 2;
        }
        frameParams.frame.add(flan);

        var holesCoordinates = { holesCoordinates3_1: holesCoordinates3_1, holesCoordinates3_2: holesCoordinates3_2 };
        //добавляем объекты в сцену
        frameParams.holesCoordinates = holesCoordinates;
        frameParams.frameDimensions = frameDimensions;

        return frameParams;
    }

    else {							// для большого межмаршего расстояния
        //задаем параметры фланца
        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 0.0);

        //константы
        var alfa = 34.4866 * Math.PI / 180;
        var profileHeight = 40;
        var profileWidth = 20;

        //расчёты длин
        var a = profileWidth / Math.cos(alfa);
        var flan1Lenght = 20 + 20 + 58 + 20 + a + marshDist - limMarshDist;
        var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
        var profile2Lenght = profile1Lenght / Math.cos(alfa);
        var flan2Lenght = profile2Lenght * Math.sin(alfa) + flan1Lenght;

        /* первый фланец */

        var flanParams = {
            width: flan1Lenght,  //ширина фланца
            height: 40,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 0,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: 40,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: flan1Lenght - profileWidth - 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        // координаты отверстий
        var holesCoordinates3_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
        // размеры рамки
        var frameDimensions = { x: M - 2 * stringerThickness, z: flan2Lenght };

        //добавляем первый фланец
        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию первого фланца

        if (turnFactor == 1) {						// для правого
            flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y;
            flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = 0;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.height;
            flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI;
        }

        //добавляем фланец в сцену
        frameParams.frame.add(flan);

        /* первый профиль */

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 80);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: Math.PI / 2,
            angle2: Math.PI / 2,
            backLength: profile1Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile1 = profileParams.mesh;
        if (turnFactor == 1) {								// для правого
            profile1.position.x = (frameParams.basepoint.x + flan1Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile1.position.y = frameParams.basepoint.y + profileHeight;
            profile1.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile1.rotation.x = Math.PI / 2;
            profile1.rotation.y = 0;
            profile1.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
        }
        else {												// для левого
            profile1.position.x = (frameParams.basepoint.x - flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile1.position.y = frameParams.basepoint.y + profileHeight;
            profile1.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            profile1.rotation.x = Math.PI / 2;
            profile1.rotation.y = 0;
            profile1.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
        }
        frameParams.frame.add(profile1);

        /* второй профиль */

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 160);

        var profileParams = {
            width: profileWidth,
            height: profileHeight,
            angle1: alfa - Math.PI / 2,
            angle2: alfa - Math.PI / 2,
            backLength: profile2Lenght,
            material: metalMaterial,
            dxfBasePoint: dxfBasePoint,
            dxfPrimitivesArr: dxfPrimitivesArr,
        }

        profileParams = drawProfile(profileParams);

        var profile2 = profileParams.mesh;
        if (turnFactor == 1) {								// для правого
            profile2.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile2.position.y = frameParams.basepoint.y + profileHeight;
            profile2.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            profile2.rotation.x = Math.PI / 2;
            profile2.rotation.y = 0;
            profile2.rotation.z = frameParams.basepoint.rotationY - alfa - Math.PI / 2;
        }
        else {												// для левого
            profile2.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - profileWidth) * Math.sin(frameParams.basepoint.rotationY);
            profile2.position.y = frameParams.basepoint.y;
            profile2.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            profile2.rotation.x = -Math.PI / 2;
            profile2.rotation.y = 0;
            profile2.rotation.z = frameParams.basepoint.rotationY + Math.PI / 2 - alfa;
        }
        frameParams.frame.add(profile2);

        /* второй фланец */

        var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 240);

        var flanParams = {
            width: flan2Lenght,  //ширина фланца
            height: 40,  //длина фланца (высота при вертикальном расположении)
            holeDiam: 12,  //диаметр отверстий с 1 по 4
            holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
            angleRadUp: 0,  //радиус скругления верхних углов фланца
            angleRadDn: 0,  //радиус скругления нижних углов фланца
            hole1X: a + 30,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole1Y: 20,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole2X: flan2Lenght - profileWidth - 30,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
            hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
            hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
            dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
            dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
        };
        var holesCoordinates3_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
        //добавляем второй фланец
        flanParams = drawRectFlan(flanParams);
        var flanShape = flanParams.shape;

        var thickness = flanThickness;
        var extrudeOptions = {
            amount: thickness,
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1
        };
        var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
        var flan = new THREE.Mesh(geometry, metalMaterial2);

        //задаем позицию второго фланца

        if (turnFactor == 1) {						// для правого
            flan.position.x = (frameParams.basepoint.x - flan2Lenght + flan1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = 0;
        }
        else {										// для левого
            flan.position.x = (frameParams.basepoint.x - flan1Lenght + flan2Lenght) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
            flan.position.y = frameParams.basepoint.y + flanParams.height;
            flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x - flanThickness) * Math.sin(frameParams.basepoint.rotationY);
            flan.rotation.x = 0;
            flan.rotation.y = frameParams.basepoint.rotationY;
            flan.rotation.z = Math.PI;
        }

        //добавляем фланец в сцену
        frameParams.frame.add(flan);

        var holesCoordinates = { holesCoordinates3_1: holesCoordinates3_1, holesCoordinates3_2: holesCoordinates3_2 };
        //добавляем объекты в сцену
        frameParams.holesCoordinates = holesCoordinates;
        frameParams.frameDimensions = frameDimensions;

        return frameParams;
    }
}// end of drawLtTurnFrame3

function drawLtTurnFrame3Top(frameParams) {
    frameParams.frame = new THREE.Object3D();

    var stringerThickness = 8;
    var flanThickness = 8;
    var M = frameParams.M;
    var marshDist = frameParams.marshDist;
    var turnFactor = frameParams.turnFactor;
    var metalMaterial = frameParams.metalMaterial;
    var metalMaterial2 = frameParams.metalMaterial2;

    // константы

    var alfa = toRadians(34.4866);
    var profileHeight = 40;				// высота профиля
    var profileWidth = 20;				// ширина профиля

    /* Расчёты размеров */

    var a = profileWidth / Math.cos(alfa);
    var flan1Lenght = 80 + profileWidth;
    var profile1Lenght = M - 2 * (stringerThickness + flanThickness);
    var profile2Lenght = profile1Lenght / Math.cos(alfa);
    var flan2Lenght = profile2Lenght * Math.sin(alfa) + profileWidth;

    var dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0.0, 0.0);

    /* Первый фланец */

    var flanParams = {
        width: 40,  //ширина фланца
        height: flan1Lenght,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 5,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: flan1Lenght - 20 - 40,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: 20,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    // координаты отверстий
    var holesCoordinates3_1 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };
    // размеры рамки
    var frameDimensions = { x: M - 2 * stringerThickness, z: flan2Lenght + flan1Lenght - profileWidth };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию первого фланца

    if (turnFactor == 1) {						// для правого
        flan.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI / 2;
    }
    else {										// для левого
        flan.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = Math.PI;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = Math.PI / 2;
    }
    frameParams.frame.add(flan);

    /* Первый профиль */

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 150);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: Math.PI / 2,
        angle2: Math.PI / 2,
        backLength: profile1Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {									// для правого
        profile.position.x = (frameParams.basepoint.x + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY + Math.PI / 2;
    }
    else {							// для левого
        profile.position.x = (frameParams.basepoint.x - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness - profile1Lenght) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = 0;
        profile.rotation.z = frameParams.basepoint.rotationY - Math.PI / 2;
    }
    frameParams.frame.add(profile);

    /* Второй профиль */

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, 0, 230);

    var profileParams = {
        width: profileWidth,
        height: profileHeight,
        angle1: alfa,
        angle2: Math.PI / 2 + alfa,
        backLength: profile2Lenght,
        material: metalMaterial,
        dxfBasePoint: dxfBasePoint,
        dxfPrimitivesArr: dxfPrimitivesArr,
    }

    profileParams = drawProfile(profileParams);

    var profile = profileParams.mesh;
    if (turnFactor == 1) {		// для правого
        profile.position.x = frameParams.basepoint.x * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y + profileHeight;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - frameParams.basepoint.z * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = -Math.PI / 2;
        profile.rotation.y = Math.PI;
        profile.rotation.z = -frameParams.basepoint.rotationY + Math.PI / 2 - alfa;
    }
    else {						// для левого
        profile.position.x = (frameParams.basepoint.x) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        profile.position.y = frameParams.basepoint.y;
        profile.position.z = (frameParams.basepoint.z - flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z) * Math.sin(frameParams.basepoint.rotationY);
        profile.rotation.x = Math.PI / 2;
        profile.rotation.y = Math.PI;
        profile.rotation.z = -frameParams.basepoint.rotationY - Math.PI / 2 - alfa;
    }
    frameParams.frame.add(profile);

    /* Второй фланец */

    dxfBasePoint = newPoint_xy(frameParams.dxfBasePoint, -50, 0);

    var flanParams = {
        width: 40,  //ширина фланца
        height: flan2Lenght,  //длина фланца (высота при вертикальном расположении)
        holeDiam: 12,  //диаметр отверстий с 1 по 4
        holeDiam5: 0,  //диаметр пятого (условно центрального) отверстия
        angleRadUp: 0,  //радиус скругления верхних углов фланца
        angleRadDn: 0,  //радиус скругления нижних углов фланца
        hole1X: 20,  //координаты первого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole1Y: a + 30,  //координаты первого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole2X: 20,  //координаты второго отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole2Y: profileWidth + 30,  //координаты второго отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole3X: 0,  //координаты третьего отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole3Y: 0,  //координаты третьего отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole4X: 0,  //координаты четвертого отверстия по оси Х (отсчитываются от соответствующего внешного угла фланца)
        hole4Y: 0,  //координаты четвертого отверстия по оси Y (отсчитываются от соответствующего внешного угла фланца)
        hole5X: 0,  //координаты пятого отверстия по оси Х (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        hole5Y: 0,  //координаты пятого отверстия по оси Y (отсчитываются от начальной точки фланца: ,  //левый нижний угол)
        dxfBasePoint: dxfBasePoint,  //базовая точка для вставки контуров в dxf файл
        dxfPrimitivesArr: dxfPrimitivesArr,  //массив для вставки
    };
    var holesCoordinates3_2 = { x1: flanParams.hole1X, y1: flanParams.hole1Y, x2: flanParams.hole2X, y2: flanParams.hole2Y };

    flanParams = drawRectFlan(flanParams);
    var flanShape = flanParams.shape;

    var thickness = flanThickness;
    var extrudeOptions = {
        amount: thickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };
    var geometry = new THREE.ExtrudeGeometry(flanShape, extrudeOptions);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geometry, metalMaterial2);

    //задаем позицию второго фланца
    if (turnFactor == 1) {						// для правого
        flan.position.x = (frameParams.basepoint.x - flan2Lenght + profileWidth) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.x + profile1Lenght + 2 * flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y + flanParams.width;
        flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z - flan2Lenght + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = -Math.PI / 2;
    }
    else {										// для левого
        flan.position.x = (frameParams.basepoint.x + flan2Lenght - profileWidth) * Math.cos(frameParams.basepoint.rotationY) + (frameParams.basepoint.x + profile1Lenght + flanThickness) * Math.sin(frameParams.basepoint.rotationY);
        flan.position.y = frameParams.basepoint.y;
        flan.position.z = (frameParams.basepoint.z - profile1Lenght - 2 * flanThickness) * Math.cos(frameParams.basepoint.rotationY) - (frameParams.basepoint.z + profileWidth) * Math.sin(frameParams.basepoint.rotationY);
        flan.rotation.x = 0;
        flan.rotation.y = frameParams.basepoint.rotationY;
        flan.rotation.z = Math.PI / 2;
    }
    frameParams.frame.add(flan);

    var holesCoordinates = { holesCoordinates3top_1: holesCoordinates3_1, holesCoordinates3top_2: holesCoordinates3_2 };
    //добавляем объекты в сцену
    frameParams.holesCoordinates = holesCoordinates;
    frameParams.frameDimensions = frameDimensions;

    return frameParams;
}// end of drawLtTurnFrame3Top



/**
 * Фланцы крепления верхней и нижней тетивы
 * для прямой двухмаршевой
 */
function drawFlans2MarshStringers(stringerParams, flanMaterial) {
    var text = 'Фланец крепления тетив';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    stringerParams.flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, 0.0);
    var p2 = newPoint_xy(p0, 195.0, 0.0);
    var p3 = newPoint_xy(p0, 195.0, -100.0);
    var p4 = newPoint_xy(p0, 0.0, -100.0);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

    holes = stringerParams.flanShape.holes;

    // отверстия

    var p1 = copyPoint(p0);

    // левые отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p1, 20.0, -20.0);
    var center2 = newPoint_xy(center1, 110.0, 0.0);
    var center3 = newPoint_xy(p1, 20.0, -80.0);
    var center4 = newPoint_xy(center3, 110.0, 0.0);
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
  	center1 = newPoint_xy(center1, 45.0, 0.0);
    center2 = newPoint_xy(center2, 45.0, 0.0);
    center3 = newPoint_xy(center3, 45.0, 0.0);
    center4 = newPoint_xy(center4, 45.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);

    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(stringerParams.flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert2.x;
    flan.position.y = stringerParams.flanPointInsert2.y;
    flan.position.z = stringerParams.stringerSideOffset + stringerParams.stringerThickness + (turnFactor - 1) * 0.5 * stringerParams.M;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);
    flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert2.x;
    flan.position.y = stringerParams.flanPointInsert2.y;
    flan.position.z = (stringerParams.M - stringerParams.stringerThickness - flanThickness) - stringerParams.stringerSideOffset + (turnFactor - 1) * 0.5 * stringerParams.M;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

	if (stringerParams.midstringers.length > 1) {
    	// фланцы для дополнительных косоуров
    	var positionZ = 0;
		for (var k = 0; k < stringerParams.midstringers.length - 1; k++) {
    		positionZ += stringerParams.midstringers[k];
    		flan = new THREE.Mesh(geom, flanMaterial);
    		flan.position.x = stringerParams.flanPointInsert2.x;
    		flan.position.y = stringerParams.flanPointInsert2.y;
    		flan.position.z = stringerParams.stringerSideOffset + stringerParams.stringerThickness +
    			(turnFactor - 1) * 0.5 * stringerParams.M + positionZ;
    		flan.rotation.x = 0.0;
    		flan.rotation.y = 0.0;
    		flan.rotation.z = 0.0;
    		flan.castShadow = true;
    		stringerParams.group.add(flan);
    	}
	}

    stringerParams.dxfBasePoint.x += 300.0 + stringerParams.dxfBasePointStep;

}//end of drawFlans2MarshStringers



/**
 * Боковая тетива увеличенной площадки
 * вставка рамки под площадкой
 */
function drawSideStringerLongLt(key, stringerParams, platformFramesParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Боковая тетива площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerLtShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, platformFramesParams.platformLength - params.carcasPartsSpacing * 2, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);

    var holes = sideStringerLtShape.holes;

    // отверстия под крепёжные уголки
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p2, -30.0, 85.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p1, 30.0, 85.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);


    // отверстия под рамки под площадкой
    if (stringerParams.stairFrame == "лотки") {
        // отверстия под ступени под площадкой
        var countTread = Math.ceil(stringerParams.platformLength1 / 500);
        var widthTread = (stringerParams.platformLength1 - stringerParams.stringerThickness) / countTread -
            5; // * (countTread - 1);
        var holeDist = widthTread - 25 * 2 - 8;

        for (var i = 0; i < countTread; i++) {
            var hole1 = new THREE.Path();
            var hole2 = new THREE.Path();
            var center1 = newPoint_xy(p0, stringerParams.stepHoleX1 + (widthTread + 5) * i  - 5, stringerParams.stepHoleY);
            var center2 = newPoint_xy(center1, holeDist, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
        }

    } else {
        var begX = platformFramesParams.overhang + platformFramesParams.sideHolePosX;
        var ii;
        for (ii = 0; ii < platformFramesParams.count; ii++) {
            hole1 = new THREE.Path();
            hole2 = new THREE.Path();
            center1 = newPoint_xy(p0, begX, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
            addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
            addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            holes.push(hole1);
            holes.push(hole2);
            begX += platformFramesParams.width + 5.0;
        }
    }


    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p0, 95 - stringerParams.stringerThickness, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
	        addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);

            // отверстия под средние стойки
            //var length = Math.abs(center1.x - p0.x - 80);
            //var lenRacks = platformFramesParams.platformLength - 95 - 95 + stringerParams.stringerThickness + stringerParams.stringerThickness;
            var lenRacks = platformFramesParams.platformLength - 95 - 95 + stringerParams.stringerThickness;
            if (lenRacks > 1200) {
                var middleRackAmt = Math.round(lenRacks / 800) - 1;
                if (middleRackAmt < 0) middleRackAmt = 0;
                var rackDist = (lenRacks) / (middleRackAmt + 1);
                //var racksMiddle = [];
                for (var i = 1; i <= middleRackAmt; i++) {
                    var center13 = newPoint_xy(center1, rackDist * i, 0);
                    var center12 = newPoint_xy(center13, 0.0, -60.0);
                    addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    //racksMiddle.push({ "x": center13.x, "y": center13.y });
                }
            }

            center1 = newPoint_xy(p3, -95, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        }
        //if (stringerParams.railingModel == "Самонесущее стекло") {
        //    center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Кованые балясины") {
			stringerParams.elmIns.sideStringerLt = {};
			stringerParams.elmIns.sideStringerLt.racks= [];
			center1 = newPoint_xy(p0, 95, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
			stringerParams.elmIns.sideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            center1 = newPoint_xy(p3, -95, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
			stringerParams.elmIns.sideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        }
    }
	
	// отверстия под опорные колонны сзади
	if (params.topPltColumns == "подкосы" && params.topPltConsolePos == "сзади") {
		var center = newPoint_xy(p0, 200 + 50 - 5, -120 - 5);
		addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center, stringerParams.holeRad, stringerParams.dxfBasePoint);
	}

	// отверстия под опорные колонны
	if (params.staircaseType !== "Готовая") {
		if (params.isColumnTop4) {
			var holeRad = 6;
			var center1 = newPoint_xy(p1, stringerParams.b/2, 85.0);
			var center2 = newPoint_xy(center1, 0, -60);
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
		}
		if (params.isColumnTop3) {
			var holeRad = 6;
			var center1 = newPoint_xy(p2, -130.0, 85.0);
			var center2 = newPoint_xy(center1, 0, -60);
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, holeRad, stringerParams.dxfBasePoint);
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, holeRad, stringerParams.dxfBasePoint);
		}
	}

    // Боковая тетива
    var geom = new THREE.ExtrudeGeometry(sideStringerLtShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerLt = new THREE.Mesh(geom, stringerMaterial);
    sideStringerLt.position.x = ptIns.x;
    sideStringerLt.position.y = ptIns.y;
    sideStringerLt.position.z = ptIns.z;
    sideStringerLt.rotation.x = 0.0;
    sideStringerLt.rotation.y = 0.0;
    sideStringerLt.rotation.z = 0.0;
    sideStringerLt.castShadow = true;
    stringerParams.group.add(sideStringerLt);

    stringerParams.dxfBasePoint.x += platformFramesParams.platformLength + stringerParams.dxfBasePointStep;
}//end of drawSideStringerLongLt


/**
 * Передняя тетива бокового выступа площадки
 */
function drawFrontStringerLongLt(key, stringerParams, platformFramesParams, ptIns, stringerMaterial, stringerExtrudeOptions, turnFactor) {
    var text = 'Передняя тетива бокового выступа площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerLtShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    var len = platformFramesParams.treadWidth + stringerParams.treadSideOffset * 2;
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, len + stringerParams.stringerThickness + stringerParams.stringerThickness - params.carcasPartsSpacing * 2, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
   	var dy = stringerParams.stringerWidth150 - stringerParams.h;
    if (stringerParams.stringerType == "прямая") {
    	if (turnFactor > 0) {
    		var ps0 = copyPoint(p0);
    		var ps1 = copyPoint(p1);
    		var ps2 = newPoint_xy(p2, -stringerParams.stringerThickness, 0.0);
    		var ps3 = newPoint_xy(p3, -stringerParams.stringerThickness, 0.0);
	    }
	    else {
    		var ps0 = newPoint_xy(p0, stringerParams.stringerThickness, 0.0);
    		var ps1 = newPoint_xy(p1, stringerParams.stringerThickness, 0.0);
    		var ps2 = copyPoint(p2);
    		var ps3 = copyPoint(p3);
	    }
    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps0, ps1, stringerParams.dxfBasePoint);
    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps1, ps2, stringerParams.dxfBasePoint);
    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps2, ps3, stringerParams.dxfBasePoint);
    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps3, ps0, stringerParams.dxfBasePoint);
    }
    else if (dy > 0.0) {
    	// с вырезом в углу
    	if (turnFactor > 0) {
    		var ps1 = newPoint_xy(p3, 0.0, -stringerParams.stringerWidth150 + dy);
    		var ps2 = newPoint_xy(ps1, -stringerParams.stringerThickness, 0.0);
    		var ps3 = newPoint_xy(p2, -stringerParams.stringerThickness, 0.0);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, p1, ps3, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps3, ps2, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps2, ps1, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps1, p3, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);
    	}
    	else {
    		var ps1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150 + dy);
    		var ps2 = newPoint_xy(ps1, stringerParams.stringerThickness, 0.0);
    		var ps3 = newPoint_xy(p1, stringerParams.stringerThickness, 0.0);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, p0, ps1, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps1, ps2, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps2, ps3, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, ps3, p2, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
	    	addLine(sideStringerLtShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);
	    }
    }
    else {
	    addLine(sideStringerLtShape, dxfPrimitivesArr, p0, p1, stringerParams.dxfBasePoint);
	    addLine(sideStringerLtShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
	    addLine(sideStringerLtShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
	    addLine(sideStringerLtShape, dxfPrimitivesArr, p3, p0, stringerParams.dxfBasePoint);
    }

    var holes = sideStringerLtShape.holes;

    // отверстия под крепёжные уголки
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
	var center1 = newPoint_xy(p2, -30.0 - stringerParams.stringerThickness, 85.0);
	var center2 = newPoint_xy(center1, 0.0, -60.0);
	var center3 = newPoint_xy(p1, 30.0 + stringerParams.stringerThickness, 85.0);
	var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);


    //Отверстия под ограждения
    if (stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
            center1 = newPoint_xy(p0, 60 + 5 + 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);

            // отверстия под средние стойки
            //var length = Math.abs(center1.x - p0.x - 80);
            var lenRacks = len + stringerParams.stringerThickness + stringerParams.stringerThickness - 190;
            if (lenRacks > 1200) {
                var middleRackAmt = Math.round(lenRacks / 800) - 1;
                if (middleRackAmt < 0) middleRackAmt = 0;
                var rackDist = (lenRacks) / (middleRackAmt + 1);
                //var racksMiddle = [];
                for (var i = 1; i <= middleRackAmt; i++) {
                    var center13 = newPoint_xy(center1, rackDist * i, 0);
                    var center12 = newPoint_xy(center13, 0.0, -60.0);
                    addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
                    //racksMiddle.push({ "x": center13.x, "y": center13.y });
                }
            }

            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        }
        //if (stringerParams.railingModel == "Самонесущее стекло") {
        //    center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Кованые балясины") {
			//stringerParams.elmIns.sideStringerLt = {};
			//stringerParams.elmIns.sideStringerLt.racks= [];
			stringerParams.elmIns.frontSideStringerLt = {};
			stringerParams.elmIns.frontSideStringerLt.racks= [];
			center1 = newPoint_xy(p0, 60 + 5 + 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
			//stringerParams.elmIns.sideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
			stringerParams.elmIns.frontSideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
            center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
			//stringerParams.elmIns.sideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
			stringerParams.elmIns.frontSideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
			addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);


        }
    }


    // Передняя тетива
    var geom = new THREE.ExtrudeGeometry(sideStringerLtShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerLt = new THREE.Mesh(geom, stringerMaterial);
    sideStringerLt.position.x = ptIns.x - stringerParams.stringerThickness;
    sideStringerLt.position.y = ptIns.y;
    sideStringerLt.position.z = ptIns.z + stringerParams.stringerThickness + (1 - turnFactor) * 0.5 * (len + stringerParams.stringerThickness);
    sideStringerLt.rotation.x = 0.0;
    sideStringerLt.rotation.y = Math.PI * 0.5;
    sideStringerLt.rotation.z = 0.0;
    sideStringerLt.castShadow = true;
    stringerParams.group.add(sideStringerLt);

    // уголки крепления к тетиве марша и боковой тетиве площадки
    if (stringerParams.platformIncreased) {
	    angle0 = drawAngleSupport("У4-60х60х100");
	    angle0.position.x = ptIns.x;
	    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0; // - 45.0;
	    angle0.position.z = ptIns.z;
   	    if (turnFactor < 0) {
			angle0.position.z = ptIns.z + len + stringerParams.stringerThickness;
		}
	    angle0.rotation.x = 0.0;
	    angle0.rotation.y = Math.PI * 0.5;
	    angle0.rotation.z = Math.PI * 1.5;
	    angle0.castShadow = true;
	    stringerParams.groupang.add(angle0);

	    angle0 = drawAngleSupport("У4-60х60х100");
	    angle0.position.x = ptIns.x;
	    angle0.position.y = ptIns.y - stringerParams.stringerWidth150 + 105.0; // - 45.0;
	    angle0.position.z = ptIns.z - len;
   	    if (turnFactor < 0) {
			angle0.position.z = ptIns.z + stringerParams.stringerThickness;
		}
    	angle0.rotation.x = Math.PI * 1.0;
    	angle0.rotation.y = Math.PI * 1.0;
    	angle0.rotation.z = Math.PI * 0.5;
	    angle0.castShadow = true;
	    stringerParams.groupang.add(angle0);
	}

    stringerParams.dxfBasePoint.x += len + stringerParams.dxfBasePointStep;
}//end of drawFrontStringerLongLt




/**
 * Боковая тетива площадки для готовой лестницы
 * вставка рамки под площадкой
 */
function drawSideStringerPrefabricateLt(key, stringerParams, platformFramesParams, ptIns, stringerMaterial, stringerExtrudeOptions) {
    var text = 'Боковая тетива площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var sideStringerLtShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };
    p0 = newPoint_xy(p0, params.carcasPartsSpacing, 0.0);//зазор для проверки модели
    var p1 = newPoint_xy(p0, 0.0, -stringerParams.stringerWidth150);
    var p2 = newPoint_xy(p1, platformFramesParams.platformLength - params.carcasPartsSpacing * 2, 0.0);
    var p3 = newPoint_xy(p2, 0.0, stringerParams.stringerWidth150);
    var p0r = copyPoint(p0);
    var p3r = copyPoint(p3);
    if (key === "mid") {
    	p0r = newPoint_xy(p0, 0.0, -stringerParams.treadThickness);
    	p3r = newPoint_xy(p3, 0.0, -stringerParams.treadThickness);
    }
    addLine(sideStringerLtShape, dxfPrimitivesArr, p0r, p1, stringerParams.dxfBasePoint);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p2, p3r, stringerParams.dxfBasePoint);
    addLine(sideStringerLtShape, dxfPrimitivesArr, p3r, p0r, stringerParams.dxfBasePoint);

    var holes = sideStringerLtShape.holes;

    // отверстия под крепёжный уголок и фланец
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p2, -30.0, 85.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    var center3 = newPoint_xy(p1, 30.0, 85.0);
    var center4 = newPoint_xy(center3, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);


    // отверстия под рамки под площадкой
    var begX = platformFramesParams.overhang + platformFramesParams.sideHolePosX - 20.0;
    var ii;
    for (ii = 0; ii < platformFramesParams.count; ii++) {
        hole1 = new THREE.Path();
        hole2 = new THREE.Path();
        center1 = newPoint_xy(p0, begX, stringerParams.stepHoleY);
        center2 = newPoint_xy(center1, platformFramesParams.width - platformFramesParams.sideHolePosX - platformFramesParams.sideHolePosX, 0.0);
        addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        holes.push(hole1);
        holes.push(hole2);
        begX += platformFramesParams.width + 5.0;
    }


    //Отверстия под ограждения
    if (key !== "mid" && stringerParams.railingPresence) {
        if (stringerParams.railingModel == "Ригели" || stringerParams.railingModel == "Стекло на стойках") {
//            center1 = newPoint_xy(p0, 95 - stringerParams.stringerThickness, stringerParams.stepHoleY);
//            center2 = newPoint_xy(center1, 0.0, -60.0);
//            //stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
//	        addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
//        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
//
//            // отверстия под средние стойки
//            //var length = Math.abs(center1.x - p0.x - 80);
//            //var lenRacks = platformFramesParams.platformLength - 95 - 95 + stringerParams.stringerThickness + stringerParams.stringerThickness;
//            var lenRacks = platformFramesParams.platformLength - 95 - 95 + stringerParams.stringerThickness;
//            if (lenRacks > 1200) {
//                var middleRackAmt = Math.round(lenRacks / 800) - 1;
//                if (middleRackAmt < 0) middleRackAmt = 0;
//                var rackDist = (lenRacks) / (middleRackAmt + 1);
//                //var racksMiddle = [];
//                for (var i = 1; i <= middleRackAmt; i++) {
//                    var center13 = newPoint_xy(center1, rackDist * i, 0);
//                    var center12 = newPoint_xy(center13, 0.0, -60.0);
//                    addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center13, stringerParams.holeRad, stringerParams.dxfBasePoint);
//                    addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center12, stringerParams.holeRad, stringerParams.dxfBasePoint);
//                    //racksMiddle.push({ "x": center13.x, "y": center13.y });
//                }
//            }
//
            center1 = newPoint_xy(p3, -140, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
            stringerParams.elmIns[stringerParams.key].racks.push({ "x": center1.x, "y": center1.y });
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        }
        //if (stringerParams.railingModel == "Самонесущее стекло") {
        //    center1 = newPoint_xy(p3, -60 - 5 - 30, stringerParams.stepHoleY);
        //    center2 = newPoint_xy(center1, 0.0, -60.0);
        //}
        if (stringerParams.railingModel == "Кованые балясины") {
            center1 = newPoint_xy(p3, -95, stringerParams.stepHoleY);
            center2 = newPoint_xy(center1, 0.0, -60.0);
			stringerParams.elmIns.sideStringerLt = {};
			stringerParams.elmIns.sideStringerLt.racks= [];
			stringerParams.elmIns.sideStringerLt.racks.push({ "x": center1.x, "y": center1.y });
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
        	addRoundHole(sideStringerLtShape, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
        }
    }


    // Боковая тетива
    var geom = new THREE.ExtrudeGeometry(sideStringerLtShape, stringerExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var sideStringerLt = new THREE.Mesh(geom, stringerMaterial);
    sideStringerLt.position.x = ptIns.x;
    sideStringerLt.position.y = ptIns.y;
    sideStringerLt.position.z = ptIns.z;
    sideStringerLt.rotation.x = 0.0;
    sideStringerLt.rotation.y = 0.0;
    sideStringerLt.rotation.z = 0.0;
    sideStringerLt.castShadow = true;
    stringerParams.group.add(sideStringerLt);

    stringerParams.dxfBasePoint.x += platformFramesParams.platformLength + stringerParams.dxfBasePointStep;
}//end of drawSideStringerPrefabricateLt

/**
 * Фланцы крепления тетив площадки к тетивам марша для готовой лестницы
 * для прямой
 */
function drawFlansPrefabricate(stringerParams, flanMaterial, isColumnTop2, isColumnTop4) {
    var text = 'Фланец крепления тетивы площадки';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(stringerParams.dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    stringerParams.flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, 0.0);
    var p2 = newPoint_xy(p0, 100.0, 0.0);
    var p3 = newPoint_xy(p0, 100.0, -100.0);
    var p4 = newPoint_xy(p0, 0.0, -100.0);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p1, p2, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, stringerParams.dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, stringerParams.dxfBasePoint);

    holes = stringerParams.flanShape.holes;

    // отверстия

    var p1 = copyPoint(p0);

    // отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var hole3 = new THREE.Path();
    var hole4 = new THREE.Path();
    var center1 = newPoint_xy(p1, 20.0, -20.0);
    var center2 = newPoint_xy(center1, 60.0, 0.0);
    var center3 = newPoint_xy(p1, 20.0, -80.0);
    var center4 = newPoint_xy(center3, 60.0, 0.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, stringerParams.dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);
    holes.push(hole3);
    holes.push(hole4);


    // отверстия для колоны
    var hole5 = new THREE.Path();
    var hole6 = new THREE.Path();
    center1 = newPoint_xy(p1, 50.0, -20.0);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole5, dxfPrimitivesArr, center1, stringerParams.holeRad, stringerParams.dxfBasePoint);
    addCircle(hole6, dxfPrimitivesArr, center2, stringerParams.holeRad, stringerParams.dxfBasePoint);

	if (isColumnTop2) {
    	holes.push(hole5);
    	holes.push(hole6);
    }


    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(stringerParams.flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert0.x;
    flan.position.y = stringerParams.flanPointInsert0.y;
    flan.position.z = stringerParams.stringerSideOffset + stringerParams.stringerThickness + (turnFactor - 1) * 0.5 * stringerParams.M;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

	if (isColumnTop2 && !isColumnTop4) {
    	holes.pop();
    	holes.pop();
	}
	else if (!isColumnTop2 && isColumnTop4) {
    	holes.push(hole5);
    	holes.push(hole6);
    }

    geom = new THREE.ExtrudeGeometry(stringerParams.flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    flan = new THREE.Mesh(geom, flanMaterial);
    flan.position.x = stringerParams.flanPointInsert0.x;
    flan.position.y = stringerParams.flanPointInsert0.y;
    flan.position.z = (stringerParams.M - stringerParams.stringerThickness - flanThickness) - stringerParams.stringerSideOffset + (turnFactor - 1) * 0.5 * stringerParams.M;
    flan.rotation.x = 0.0;
    flan.rotation.y = 0.0;
    flan.rotation.z = 0.0;
    flan.castShadow = true;
    stringerParams.group.add(flan);

	if (stringerParams.midstringers.length > 1) {
    	// фланцы для дополнительных косоуров
    	var positionZ = 0;
		for (var k = 0; k < stringerParams.midstringers.length - 1; k++) {
    		positionZ += stringerParams.midstringers[k];
    		flan = new THREE.Mesh(geom, flanMaterial);
    		flan.position.x = stringerParams.flanPointInsert0.x;
    		flan.position.y = stringerParams.flanPointInsert0.y;
    		flan.position.z = stringerParams.stringerSideOffset + stringerParams.stringerThickness +
    			(turnFactor - 1) * 0.5 * stringerParams.M + positionZ;
    		flan.rotation.x = 0.0;
    		flan.rotation.y = 0.0;
    		flan.rotation.z = 0.0;
    		flan.castShadow = true;
    		stringerParams.group.add(flan);
    	}
	}

    stringerParams.dxfBasePoint.x += 300.0 + stringerParams.dxfBasePointStep;

}//end of drawFlansPrefabricate


/**
 * Фланец крепления колоны к площадке
 */
function drawFlanColumn(columnParams, flanMaterial) {
    var dxfBasePoint = columnParams.dxfBasePoint;
	dxfBasePoint.x += 100;

    var text = 'Фланец крепления колоны';
    var textHeight = 30;
    var textBasePoint = newPoint_xy(dxfBasePoint, 20, -250);
    addText(text, textHeight, dxfPrimitivesArr, textBasePoint);

    var flanShape = new THREE.Shape();

    var p0 = { x: 0.0, y: 0.0 };
    var p1 = newPoint_xy(p0, 0.0, 154.0);
    var p2 = newPoint_xy(p0, 40.0, 0.0);
    var p3 = newPoint_xy(p0, 40.0, 154.0);
    var ptc1 = newPoint_xy(p1, 8.0, 0.0);
    var ptc2 = newPoint_xy(p3, -8.0, 0.0);
    addLine(flanShape, dxfPrimitivesArr, p1, p0, dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p0, p2, dxfBasePoint);
    addLine(flanShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
    addArc(flanShape, dxfPrimitivesArr, ptc2, 8.0, 0, Math.PI * 0.5, dxfBasePoint)
    addLine(flanShape, dxfPrimitivesArr, newPoint_xy(ptc2, 0.0, 8.0), newPoint_xy(ptc1, 0.0, 8.0), dxfBasePoint);
    addArc(flanShape, dxfPrimitivesArr, ptc1, 8.0, Math.PI * 0.5, Math.PI, dxfBasePoint);

    var holes = flanShape.holes;

    // отверстия
    var hole1 = new THREE.Path();
    var hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, 20.0, -8.0);
    var center2 = newPoint_xy(center1, 0.0, -60.0);
    addLine(hole1, dxfPrimitivesArr, newPoint_xy(center1, -6.0, 0.0), newPoint_xy(center1, -6.0, -20.0), dxfBasePoint);
    addArc(hole1, dxfPrimitivesArr, newPoint_xy(center1, 0.0, -20.0), 6.0, Math.PI, Math.PI * 2.0, dxfBasePoint)
    addLine(hole1, dxfPrimitivesArr, newPoint_xy(center1, 6.0, -20.0), newPoint_xy(center1, 6.0, 0.0), dxfBasePoint);
    addArc(hole1, dxfPrimitivesArr, center1, 6.0, 0, Math.PI, dxfBasePoint);

    addLine(hole2, dxfPrimitivesArr, newPoint_xy(center2, -6.0, 0.0), newPoint_xy(center2, -6.0, -20.0), dxfBasePoint);
    addArc(hole2, dxfPrimitivesArr, newPoint_xy(center2, 0.0, -20.0), 6.0, Math.PI, Math.PI * 2.0, dxfBasePoint)
    addLine(hole2, dxfPrimitivesArr, newPoint_xy(center2, 6.0, -20.0), newPoint_xy(center2, 6.0, 0.0), dxfBasePoint);
    addArc(hole2, dxfPrimitivesArr, center2, 6.0, 0, Math.PI, dxfBasePoint);
    holes.push(hole1);
    holes.push(hole2);

    var flanThickness = 8.0;
    var flanExtrudeOptions = {
        amount: flanThickness,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(flanShape, flanExtrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var flan = new THREE.Mesh(geom, flanMaterial);
    flan.castShadow = true;

    columnParams.dxfBasePoint.x += columnParams.dxfBasePointStep;

    return flan;
}//end of drawFlanColumn




/**
 * расчет точек сопряжения двух отрезков
 * @param {Object} <начальная точка>
 * @param {Double} <угол первого сопрягаемого отрезка>
 * @param {Object} <конечная точка>
 * @param {Double} <угол второго сопрягаемого отрезка>
 * @param {Double} <радиус сопряжения>
 * @return {Object} -
 *   точка пересечения отрезков, начальная точка дуги, конечная точка дуги, центр дуги,
 *   начальный угол дуги, конечный угол дуги
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
        return { "int": pti, "start": pta, "end": ptb, "center": ptc, "angstart": anglea(ptc, pta), "angend": anglea(ptc, ptb), "rad": rad };
    }
    else {
        return null;
    }
}

/**
 * угол между осью X и отрезком, соединяющим точки
 * @param {Object} - точка 1
 * @param {Object} - точка 2
 * @return {Double}
 */
function anglea(pt1, pt2) {
    var x = pt2.x - pt1.x;
    var y = pt2.y - pt1.y;
    var ang = Math.acos(x / Math.sqrt(x * x + y * y));
    return pt2.y > pt1.y ? ang : Math.PI + Math.PI - ang;
}


function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function addArc1(centerPoint, radius, startAngle, endAngle, stringerParams) {
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, centerPoint, radius, startAngle, endAngle, stringerParams.dxfBasePoint);

    //Возвращает точку привязки следующего примитива
    return polar(centerPoint, endAngle, radius);
}

function addLine1(startPoint, endPoint, stringerParams) {
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, startPoint, endPoint, stringerParams.dxfBasePoint);

    //Возвращает точку привязки следующего примитива
    return endPoint;
}

function drawColumn(par){
	par.mesh = new THREE.Object3D();
	var shape = new THREE.Shape();

	var p1 =  {x:0,y:0}
	var p2 = newPoint_xy(p1, 0, par.colLength) // params basePoint, deltaX, deltaY
	var p3 = newPoint_xy(p1, par.profWidth, par.colLength)
	var p4 = newPoint_xy(p1, par.profWidth, 0)

	addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
	addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

	//круглое отверстие 1
	var holeOffset = 20;
	var holeDst = 60;
	var holeRad = 6.5;
	var center1 = newPoint_xy(p2, par.profWidth/2, -holeOffset);
	var center2 = newPoint_xy(center1, 0, -holeDst);
	addRoundHole(shape, par.dxfArr, center1, holeRad, par.dxfBasePoint); //функция в файле drawPrimitives
	addRoundHole(shape, par.dxfArr, center2, holeRad, par.dxfBasePoint); //функция в файле drawPrimitives


	//подпись под фигурой
	var text = par.text;
	var textHeight = 30;
	var textBasePoint = newPoint_xy(par.dxfBasePoint, -70, -100)
	addText(text, textHeight, par.dxfArr, textBasePoint)

	//тело
	var extrudeOptions = {
		amount: par.profHeight,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var col = new THREE.Mesh(geom, par.material);
	col.position.x = -par.profWidth / 2;
	col.position.z = -par.profHeight / 2;

	par.mesh.add(col);
	return par;
}//end of drawColumn


/*функция отрисовки сварной ступени из листа*/
function drawSteelTread(par) {
    //константы
    var flanHeight = 40;
    var vertPlateWidth = 60;
    var flanHoleOffset = 25;
    var flanHoleRad = 6.5;
    var thk = 4;
    var flanThk = 8;
    par.mesh = new THREE.Object3D();

    //передняя пластина
    var plateParams = {
        len: par.len,
        width: vertPlateWidth,
        dxfBasePoint: par.dxfBasePoint,
        dxfArr: par.dxfArr,
        thk: thk,
        material: par.material,
    }
    plateParams = drawPlate(plateParams);
    var plate = plateParams.mesh;
    plate.position.y = - vertPlateWidth - thk;
    par.mesh.add(plate);

    //задняя пластина
    plateParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, vertPlateWidth + 100 + par.width);

    plateParams = drawPlate(plateParams);
    var plate = plateParams.mesh;
    plate.position.z = -par.width + thk;
    plate.position.y = - vertPlateWidth - thk;
    par.mesh.add(plate);


    //верхняя пластина
    plateParams.width = par.width// - 2 * thk;
    plateParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 0, vertPlateWidth + 50);

    plateParams = drawPlate(plateParams);
    var plate = plateParams.mesh;
    plate.rotation.x = -Math.PI / 2;
    plate.position.z = thk;
    plate.position.y = -thk;
    par.mesh.add(plate);

    //левый фланец
    plateParams.width = par.width - 2 * thk;
    plateParams.len = flanHeight;
    plateParams.thk = flanThk;
    plateParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, -flanHeight - 50, vertPlateWidth + 50);
    var center1 = { x: plateParams.len / 2, y: flanHoleOffset };
    var center2 = { x: plateParams.len / 2, y: plateParams.width - flanHoleOffset };
    plateParams.holes = [];
    plateParams.holes.push({ center: center1, rad: flanHoleRad })
    plateParams.holes.push({ center: center2, rad: flanHoleRad })

    plateParams = drawPlate(plateParams);
    var plate = plateParams.mesh;
    plate.rotation.x = -Math.PI / 2;
    plate.rotation.y = -Math.PI / 2;
    //plate.position.z = -thk;
    plate.position.y = -flanHeight - thk;
    plate.position.x = flanThk;
    par.mesh.add(plate);

    //правый фланец
    plateParams.dxfBasePoint = newPoint_xy(par.dxfBasePoint, par.len + 50, vertPlateWidth + 50);
    plateParams = drawPlate(plateParams);
    var plate = plateParams.mesh;
    plate.rotation.x = -Math.PI / 2;
    plate.rotation.y = -Math.PI / 2;
    plate.position.x = par.len// - flanThk;
    plate.position.y = -flanHeight - thk;
    par.mesh.add(plate);

    //подпись
    var textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -100);
    addText(par.text, 30, par.dxfArr, textBasePoint);

    textBasePoint = newPoint_xy(par.dxfBasePoint, 0, -160);
    addText("количество - " + par.count, 30, par.dxfArr, textBasePoint);

    return par;

}//end of drawSteelTread


function drawPlate(par) {

    var mesh = new THREE.Object3D();

    var shape = new THREE.Shape();
    var p1 = { x: 0, y: 0 }
    var p2 = newPoint_xy(p1, 0, par.width);
    var p3 = newPoint_xy(p1, par.len, par.width);
    var p4 = newPoint_xy(p1, par.len, 0);
    var dxfBasePoint = copyPoint(par.dxfBasePoint)

    addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
    addLine(shape, par.dxfArr, p4, p1, par.dxfBasePoint);

    //отверстия
    if (par.holes != undefined) {
        for (var i = 0; i < par.holes.length; i++) {
            addRoundHole(shape, par.dxfArr, par.holes[i].center, par.holes[i].rad, par.dxfBasePoint)
        }
    }

    var extrudeOptions = {
        amount: par.thk,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    };

    var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    par.mesh = new THREE.Mesh(geom, par.material);
    par.shape = shape;

    return par;

}
