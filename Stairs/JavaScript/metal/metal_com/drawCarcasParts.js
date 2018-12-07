

/*косоур прямой одномаршевой лестницы*/

function drawStringer0(model, stringerType, h1, b1, a1, stairAmt1, scale) {
	var p1_x; //нижняя точка зада площадки
	var p1_y; //нижняя точка зада площадки
	
	var stringerOffset_x = 0;
	var stringerOffset_y = 0;
	
	if (model == "ко") {
		stringerOffset_x = a1-b1;
		stringerOffset_y = treadThickness;	
		}

	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x*scale, 0);
	/*верхняя линия косоура*/

	var x2;
	var y2;

	if (stringerType == "пилообразная" || stringerType == "ломаная") {
		for (var i = 1; i < stairAmt1; i++) {
			x1 = b1*(i-1)*scale + stringerOffset_x*scale;
			y1 = h1*i*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + b1*scale;
			y2 = y1;
			stringerShape.lineTo(x2, y2);	  
			}
		 }
	if (stringerType == "прямая") {
		stringerShape.lineTo(0, h1*scale);
		x2 = b1*(stairAmt1-1)*scale;
		y2 = h1*(stairAmt1-1)*scale;
		}
		 
	//последний подъем	
	x1 = x2// + b1*scale;
	y1 = y2 + h1*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + a1*scale - stringerOffset_x*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);

	//зад косоура
	p1_x = x2;
	p1_y = y2 - stringerWidth*scale;
	stringerShape.lineTo(p1_x, p1_y);
		
	
	
	/*нижняя линия марша*/
	if (stringerType == "пилообразная" || stringerType == "прямая") {	
		x2 = a1*scale// + a3*scale;
		y2 = 0;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo(stringerOffset_x*scale, 0);
		}
	
	if (stringerType == "ломаная") {
		//верхний подъем*/		
		x2 = p1_x  - a1*scale + stringerWidth * scale;
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
		stringerShape.lineTo(stringerWidth * scale, 0);	 
		stringerShape.lineTo(stringerOffset_x*scale, 0);
		}
	
	

	return stringerShape;	
} //end of drawStringer0

var stringerPlatformHeight = 150;

/*внешний косоур нижнего марша*/

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
	stringerShape.moveTo(stringerOffset_x*scale, 0);
	
if (stairAmt1 == 0 ) {
/* STRINGER TOP LINE */
	if (stringerTurn == "площадка"){ 
		x1 = stringerOffset_x*scale;
		y1 = -stringerOffset_x*scale + h1*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + turnLength*scale - stringerOffset_x*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	if (stringerTurn == "забег"){
		//забег 1
		x1 = stringerOffset_x*scale;;
		y1 = -stringerOffset_x*scale + h1*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + L2 *(turnLength - stringerSideOffset) / turnLength *scale;
		y2 = y1;
		if (stringerType != "прямая") stringerShape.lineTo(x2, y2);
		//сохраняем точку
		x1t = x1;
		y1t = y1;
		
		//забег 2
		x1 = x2;
		y1 = y2 + h3*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1t + turnLength*scale - stringerOffset_x*scale;;
		y2 = y1;
		stringerShape.lineTo(x2, y2);	
		
		//зад площадки
		if (stringerType != "ломаная") {
			p1_x = x2;
			p1_y = y2 - Math.max(h1, h3)*scale;
			stringerShape.lineTo(p1_x, p1_y);
			}
		else {
			p1_x = x2;
			p1_y = y2 - stringerWidth*scale;
			stringerShape.lineTo(p1_x, p1_y);
			}
		
		}


		
	/* STRINGER BOTTOM LINE */
	if (stringerTurn == "площадка"){ 
		stringerShape.lineTo(x2, 0);
		stringerShape.moveTo(stringerOffset_x*scale, 0);
		}
	if (stringerTurn == "забег"){
		if (stringerType == "ломаная") {
			x1 = x1t + L2 *(turnLength - stringerSideOffset) / turnLength *scale + stringerWidth*scale;
			y1 = p1_y
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = y1 - h3*scale
			stringerShape.lineTo(x2, y2);
			
			x2 = x2-L2*scale;
			stringerShape.lineTo(x2, y2);
			stringerShape.lineTo(x2, 0);
			stringerShape.moveTo(stringerOffset_x*scale, 0);
			
			
			}
		else {
			stringerShape.lineTo(b1*scale, 0);
			stringerShape.moveTo(stringerOffset_x*scale, 0);
			}
		}		
}


else { // ненулевое количество ступеней в марше
	  
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
	  
	if (stringerTurn == "площадка"){  

	x1 = x2;
	y1 = y2 + h1*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + b1*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);	
	
	//площадка
	x1 = x2;
	y1 = y2 + h1*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + turnLength*scale - stringerOffset_y*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);	
	}	
	
	if (stringerTurn == "забег"){
	  //последний подъем	
	x1 = x2;
	y1 = y2 + h1*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + b1*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);	
	
	//забег 1
	x1 = x2;
	y1 = y2 + h1*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + L2 *(turnLength - stringerSideOffset) / turnLength *scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	//сохраняем точку
	x1t = x1;
	y1t = y1;
	
	//забег 2
	x1 = x2;
	y1 = y2 + h3*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1t + turnLength*scale - stringerOffset_x*scale;;
	y2 = y1;
	stringerShape.lineTo(x2, y2);	
	
	}
	
	//зад площадки
	if (stringerType != "ломаная") {
		p1_x = x2;
		p1_y = y2 - Math.max(h1, h3)*scale;
		stringerShape.lineTo(p1_x, p1_y);
		}
	else {
		p1_x = x2;
		p1_y = y2 - stringerWidth*scale;
		stringerShape.lineTo(p1_x, p1_y);
		}
		
}
if (stringerType == "прямая") {
	stringerShape.lineTo(0, h1*scale);
	
	if (stringerTurn == "площадка"){ 
	
	//верхняя линия марша	
	x1 = b1*stairAmt1*scale;
	y1 = h1*(stairAmt1 +1)*scale;
	stringerShape.lineTo(x1, y1);
	
	//площадка
	x2 = x1 + turnLength*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	
	//зад площадки
	p1_x = x2;
	p1_y = y2 - Math.max(h1, h3)*scale;
	stringerShape.lineTo(p1_x, p1_y);	
	}	
	
	if (stringerTurn == "забег"){
	  //последний подъем	
	x1 = b1*stairAmt1*scale;
	y1 = h1*(stairAmt1+1)*scale;
	stringerShape.lineTo(x1, y1);
	
	//забег 1
	x1 = x1 + L2 *scale;
	y1 = y1 + h3*scale;
	stringerShape.lineTo(x1, y1);

	//сохраняем точку
	x1t = x1 - L2 *scale;
	y1t = y1 - h3*scale; 
	
	//забег 2
	x2 = x1t + turnLength*scale;
	y2 = y1t + h3*scale;
	stringerShape.lineTo(x2, y2);	
	
	//зад площадки
	p1_x = x2;
	p1_y = y2 - Math.max(h1, h3)*scale;
	stringerShape.lineTo(p1_x, p1_y);
	}

}
	
/* STRINGER BOTTOM LINE */ 

if (stringerType == "пилообразная" || stringerType == "прямая") {
	if (stringerTurn == "площадка"){  
		x2 = p1_x - turnLength*scale + b1 * scale + stringerOffset_y*scale;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		}

	if (stringerTurn == "забег"){
		x2 = x1t + b1 * scale;
		y2 = y1t - h1*scale;
		stringerShape.lineTo(x2, y2);
		}

		stringerShape.lineTo(b1*scale, 0);
		stringerShape.lineTo(0, 0);	
	}
if (stringerType == "ломаная") {
	if (stringerTurn == "площадка"){  
		x2 = p1_x - turnLength*scale + stringerWidth * scale + stringerOffset_y*scale;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h1*scale; 
		stringerShape.lineTo(x1, y1);
		}

	if (stringerTurn == "забег"){
		x2 = p1_x - (turnLength - L2)*scale + stringerWidth * scale;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h3*scale; 
		stringerShape.lineTo(x1, y1);
		x2 = x1 - L2*scale //+ stringerWidth * scale;
		y2 = y1; 
		stringerShape.lineTo(x2, y2);
		x1 = x2;
		y1 = y2 - h1*scale; 
		stringerShape.lineTo(x1, y1);
		}
	

		for (var i = 1; i < stairAmt1; i++) {
			x2 = x1 - b1*i*scale;
			y2 = y1 - h1*(i-1)*scale;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h1*scale
			stringerShape.lineTo(x2, y2);	  
			}
		//y2 = y2 - h1*scale
		//stringerShape.lineTo(x2, y2);	
		x2 = x2 - b1*scale;
		stringerShape.lineTo(x2, y2);
		stringerShape.lineTo((stringerWidth + stringerOffset_x) * scale, 0); 
		stringerShape.lineTo(stringerOffset_x*scale, 0);

	}	
}//end of stairAmt1 > 2
	return stringerShape;	 
} //end of drawStringer1
	
	
/*внутренний косоур нижнего марша*/

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
		stringerShape.moveTo(stringerOffset_x*scale, 0);
		
		
		
		if (stairAmt1 == 0) {
			x1 = stringerOffset_x*scale
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
				p1_y = y2 - h1*scale - (b1 - L1) * h1 * scale / b1;
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
			y1 = y2 - h1*scale - (b1 - L1) * h1 * scale / b1;
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
		stringerShape.lineTo(stringerWidth * scale, 0);	 
		stringerShape.moveTo(stringerOffset_x*scale, 0);
			
			}
		
		return stringerShape;
		}



} //end of drawStringer2


/*внешний косоур верхнего марша*/

function drawStringer3(model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, scale, stringerSideOffset) {
	
	var stringerOffset_x = 0;
	var stringerOffset_y = 0;
	
	if (model == "ко") {
		stringerOffset_x = a3-b3;
		stringerOffset_y = treadThickness;	
		}

	var stringerShape = new THREE.Shape();
	stringerShape.moveTo(stringerOffset_x*scale, -stringerOffset_y*scale);
	
	/*stringer top line*/
	if (stringerType == "пилообразная" || stringerType == "ломаная") {
		
	if (stringerTurn == "площадка"){ 
	
	//площадка	
	x1 = stringerOffset_x*scale;
	y1 = Math.max(h1, h3)*scale - stringerOffset_y*scale;
	if (stringerType == "ломаная") y1 = stringerWidth*scale - stringerOffset_y*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + turnLength*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);	
	
	//прямые ступени
	x0 = x2;
	y0 = y2;
	for (var i = 1; i < stairAmt3; i++) {
		x1 = b3*(i-1)*scale + x0;
		y1 = h3*i*scale + y0
		stringerShape.lineTo(x1, y1);
		x2 = b3*i*scale + x0;
		y2 = h3*i*scale + y0;
		stringerShape.lineTo(x2, y2);	  
		}
	
	//последний подъем
	if (stairAmt3 !=0) {
		x1 = x2;
		y1 = y2 + h3*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3*scale - stringerOffset_x*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	}
	
	if (stringerTurn == "забег"){ 
	
	//первый забег	
	x1 = stringerOffset_x*scale;
	y1 = Math.max(h1, h3)*scale - stringerOffset_y*scale;
	if (stringerType == "ломаная") y1 = stringerWidth*scale - stringerOffset_y*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + (turnLength-L2)*scale;
	if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6))*scale;
//	console.log(x1, x2)
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	//сохраняем точку
	x1t = x2;
	y1t = y2;

	//второй забег
	x1 = x2;
	y1 = y2 + h3*scale;
	stringerShape.lineTo(x1, y1);
	x2 = turnLength*scale;
	if (model == 'ко') x2 = x2 + L1*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);
	//сохраняем
	x2t = x2;
	y2t = y2;
	
	
	//прямые ступени
	x0 = x2;
	y0 = y2;
	for (var i = 1; i < stairAmt3; i++) {
		x1 = b3*(i-1)*scale + x0;
		y1 = h3*i*scale + y0
		stringerShape.lineTo(x1, y1);
		x2 = b3*i*scale + x0;
		y2 = h3*i*scale + y0;
		stringerShape.lineTo(x2, y2);	  
		}
	 
		if (stairAmt3 ==0) {
			x2 = x2 + L1*scale - stringerOffset_x*scale;
			if (model == 'ко') x2 = turnLength + L1;
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}
		else {			
			//последний подъем		
			x1 = x2;
			y1 = y2 + h3*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1 + a3*scale - stringerOffset_x*scale;		
			y2 = y1;
			stringerShape.lineTo(x2, y2);
			}
		
	}
	//зад марша
	p1_x = x2;
	p1_y = y2 - h3*scale;
	if (stringerType == "ломаная") p1_y = y2 - stringerWidth*scale;
	stringerShape.lineTo(p1_x, p1_y);
	}
	
	if (stringerType == "прямая") {
		if (stringerTurn == "площадка"){ 
	
	//площадка	
	x1 = 0;
	y1 = Math.max(h1, h3)*scale;
	stringerShape.lineTo(x1, y1);
	x2 = x1 + turnLength*scale - b3*scale;
	y2 = y1;
	stringerShape.lineTo(x2, y2);	
	
	if (stairAmt3 ==0){
		x2 = x2 + b3*scale; 
		stringerShape.lineTo(x2, y2);		
		}	
	else{
		//последний подъем
		x1 = b3*stairAmt3*scale + x2;
		y1 = h3*stairAmt3*scale + y2;
		stringerShape.lineTo(x1, y1);	
		x2 = x1 + a3*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	
	//зад марша
	x1 = x2;
	y1 = y2 - h3*scale;
	stringerShape.lineTo(x1, y1);
	
	}
	
	if (stringerTurn == "забег"){ 
	
	//первый забег	
	x1 = 0;
	y1 = Math.max(h1, h3)*scale;
	stringerShape.lineTo(x1, y1);

	//сохраняем точку
	x1t = x1 + (turnLength-L2)*scale;
	y1t = y1;

	//второй забег
	x1 = x1 + (turnLength-L2)*scale;
	y1 = y1 + h3*scale;
	stringerShape.lineTo(x1, y1);
	
	if (stairAmt3 ==0){
		x2 = x1 + L1*scale + L2*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		//сохраняем
		x2t = x2;
		y2t = y2 + h3*scale;
		}
	
	else {		
		x2 = x1 + L2*scale;
		y2 = y1 + h3*scale;
		stringerShape.lineTo(x2, y2);
		//сохраняем
		x2t = x2;
		y2t = y2 - h3*scale;
		//последний подъем
		x1 = x2 + b3*(stairAmt3-1)*scale;
		y1 = y2 + h3*(stairAmt3-1)*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	
	//зад марша
	x1 = x2;
	y1 = y2 - h3*scale;
	stringerShape.lineTo(x1, y1);
	
	}
	
	
	
	}//end of stringerType == "прямая"
	

	/*stringer bottom line*/
	
	if (stringerType == "пилообразная" || stringerType == "прямая") {
	
	if (stringerTurn == "площадка"){ 
		x2 = turnLength*scale + stringerOffset_x*scale;;
		y2 = -stringerOffset_y*scale;
		stringerShape.lineTo(x2, y2);
		}
	
	if (stringerTurn == "забег"){ 
		if (stairAmt3 !=0 || stringerType == "пилообразная") {
			x1 = x2t;
			y1 = y2t - h3*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1t;
			y2 = y1t - Math.max(h1, h3)*scale;
			stringerShape.lineTo(x2, y2);
			}
		}
	}
	
	if (stringerType == "ломаная") {
		if (stairAmt3 !=0) {
			x2 = p1_x - a3*scale + stringerWidth*scale;
			y2 = p1_y;
			stringerShape.lineTo(x2, y2);
			x1 = x2;
			y1 = y2 - h3*scale; 
			stringerShape.lineTo(x1, y1);	

		for (var i = 1; i < stairAmt3; i++) {
			x2 = x1 - b3*i*scale;
			y2 = y1 - h3*(i-1)*scale;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h3*scale
			stringerShape.lineTo(x2, y2);	  
			}

		if (stringerTurn == "площадка"){ 
		
			x2 = turnLength*scale// + a3*scale;
			y2 = -stringerOffset_y*scale;
			stringerShape.lineTo(x2, y2);
			}
		
		if (stringerTurn == "забег"){ 
			x1 = x2 - L2*scale;
			if (model == 'ко') x1 = x2 + (L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6))*scale;
			y1 = y2// - h3*scale;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = y1 - h3*scale;
			stringerShape.lineTo(x2, y2);
			}
		}	
	
	if (stairAmt3 ==0 && stringerTurn == "забег") {
		x2 = p1_x - (L1 + L2 - stringerWidth-stringerOffset_x)*scale;
		if (model == 'ко') x2 = p1_x;
		y2 = p1_y;
		stringerShape.lineTo(x2, y2);
		y2 = y2 - h3*scale;
		stringerShape.lineTo(x2, y2);	
		}
	}
		//stringerShape.lineTo(0, 0);
		stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);
	
	
	


return stringerShape;
}//end of drawStringer3


/*внутренний косоур верхнего марша*/

function drawStringer4(model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, scale, stringerSideOffset) {

	var stringerOffset_x = 0;
	var stringerOffset_y = 0;
	
	if (model == "ко") {
		stringerOffset_x = a3-b3;
		stringerOffset_y = treadThickness;	
		}

	var stringerShape = new THREE.Shape();
	//stringerShape.moveTo(stringerOffset_x*scale, 0);
	stringerShape.moveTo(0, 0);
	
	/*stringer top line*/
	if (stringerType == "пилообразная" || stringerType == "ломаная") {
		
	if (stringerTurn == "площадка"){ 
			//выступ под площадкой
			if (model == "ко") {
			//console.log (stringerSideOffset);
			//
			x1 = -stringerSideOffset*scale;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h3*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x2, y2);
			x2 = 0//stringerSideOffset*scale;
			stringerShape.lineTo(x2, y2);		
			}		
		else {
			//первый подъем
			x2 = 0//stringerOffset_x*scale;
			y2 = h3*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x2, y2);
			}
		
		//прямые ступени
		x0 = x2;
		y0 = y2;
		for (var i = 1; i < stairAmt3; i++) {
			x1 = b3*(i-1)*scale + x0;
			y1 = h3*i*scale + y0
			stringerShape.lineTo(x1, y1);
			x2 = b3*i*scale + x0;
			y2 = h3*i*scale + y0;
			stringerShape.lineTo(x2, y2);	  
			}
		}


	if (stringerTurn == "забег"){ 
	//выступ под площадкой
		if (model == "ко") {
			x1 = -stringerSideOffset*scale;
			y1 = 0;
			stringerShape.lineTo(x1, y1);
			x2 = x1;
			y2 = h3*scale - stringerOffset_y*scale;
			stringerShape.lineTo(x2, y2);
			x1 = - (stringerSideOffset - L1)/Math.tan(Math.PI/6)*scale;
			y1 = y2; 
			stringerShape.lineTo(x1, y1);
			x1 = x1;
			y1 = y1 + h3*scale; 
			stringerShape.lineTo(x1, y1);
			
			x2 = L1*scale - stringerSideOffset*Math.tan(Math.PI/6)*scale;
			y2 = y1 
			stringerShape.lineTo(x2, y2);
			
			x2 = x2;
			y2 = y2 + h3*scale; 
			stringerShape.lineTo(x2, y2);
			
			x2 = L1*scale;
			y2 = y2; 
			stringerShape.lineTo(x2, y2);		
			}		
		else {
			//первый подъем	
			x2 = 0;
			y2 = 3*h3*scale;
			stringerShape.lineTo(x2, y2);	
			}
		
		//прямые ступени
		x0 = x2;
		y0 = y2;
		for (var i = 1; i < stairAmt3; i++) {
			x1 = b3*(i-1)*scale + x0;
			y1 = h3*i*scale + y0
			stringerShape.lineTo(x1, y1);
			x2 = b3*i*scale + x0;
			y2 = h3*i*scale + y0;
			stringerShape.lineTo(x2, y2);	  
			}
		}
	if (stairAmt3 ==0) {
		x2 = x2 + L1*scale - stringerOffset_x*scale;
		if (model == "ко") x2 = L1 //stringerSideOffset// + L1;
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}
	else {			
		//последний подъем
		x1 = x2;
		y1 = y2 + h3*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3*scale - stringerOffset_x*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);	
		}
	//зад марша
	p1_x = x2;
	p1_y = y2 - h3*scale;
	if (stringerType == "ломаная") p1_y = y2 - stringerWidth*scale;
	stringerShape.lineTo(p1_x, p1_y);
		
	}
	
	if (stringerType == "прямая") {
	
	
	if (stringerTurn == "площадка"){ 
		//первый подъем	
		x2 = 0;
		y2 = h3*2*scale;
		stringerShape.lineTo(x2, y2);	
		
	if (stairAmt3 ==0) {
	/*
		x2 = x2 + L1*scale - stringerOffset_x*scale;	
		y2 = y2;
		stringerShape.lineTo(x2, y2);*/
		}
	else {	
		x1 = b3*(stairAmt3 - 1)*scale;
		y1 = h3*(stairAmt3 + 1)*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
	}


	if (stringerTurn == "забег"){ 

		
		
	if (stairAmt3 ==0) {
		//первый подъем	
		x2 = 0;
		y2 = 3*h3*scale;
		stringerShape.lineTo(x2, y2);
		//последний подъем	
		x2 = x2 + L1*scale - stringerOffset_x*scale;	
		y2 = y2;
		stringerShape.lineTo(x2, y2);
		}
	else {	
		//первый подъем	
		x2 = 0;
		y2 = 4*h3*scale;
		stringerShape.lineTo(x2, y2);
		//последний подъем
		x1 = b3*(stairAmt3 - 1)*scale;
		y1 = h3*(stairAmt3 + 3)*scale;
		stringerShape.lineTo(x1, y1);
		x2 = x1 + a3*scale;
		y2 = y1;
		stringerShape.lineTo(x2, y2);
		}
		
		}
	
	//зад марша
	p1_x = x2;
	p1_y = y2 - h3*scale;
	stringerShape.lineTo(p1_x, p1_y);	
	
	}
	
	/*stringer bottom line*/
	//if (stringerType == "пилообразная" || stringerType == "прямая") {
	if (stringerType != "ломаная" || stairAmt3 == 0) {
	
	if (stringerTurn == "забег"){ 
	if (stairAmt3 ==0) {
		if (model == "ко") x2 = p1_x//(L1 + 130)*scale;
		else p1_x//x2 = 130*scale;
		y2 = p1_y - treadThickness*scale;//2*h3*scale + 130*h3/b3*scale;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset)*scale;
		else x1 = 70*scale;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
	}
	else {
		if (model == "ко") x2 = (L1 + 130)*scale;
		else x2 = 130*scale;
		y2 = 2*h3*scale + 130*h3/b3*scale;
		stringerShape.lineTo(x2, y2);
		if (model == "ко") x1 = (80 - stringerSideOffset)*scale;
		else x1 = 70*scale;
		y1 = 0;
		stringerShape.lineTo(x1, y1);
		}
	}
	//stringerShape.lineTo(stringerOffset_x*scale, 0);
	stringerShape.lineTo(0, 0);
		
	}
	
	//if (stringerType == "ломаная") {
	else {
			x2 = p1_x - a3*scale + stringerWidth*scale;
			y2 = p1_y;
			stringerShape.lineTo(x2, y2);
			x1 = x2;
			y1 = y2 - h3*scale; 
			stringerShape.lineTo(x1, y1);	

		for (var i = 1; i < stairAmt3; i++) {
			x2 = x1 - b3*i*scale;
			y2 = y1 - h3*(i-1)*scale;
			stringerShape.lineTo(x2, y2);
			y2 = y2 - h3*scale
			stringerShape.lineTo(x2, y2);	  
			}

		
		if (model == "ко") stringerShape.lineTo((120 - stringerSideOffset)*scale, 0);
		else stringerShape.lineTo(stringerWidth*scale, 0);
		stringerShape.lineTo(0, 0);
	
	}

return stringerShape;
}//end of drawStringer4


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
	stringerShape.moveTo(stringerOffset_x*scale, -stringerOffset_y*scale);

	
/*stringer top line*/

	if (stringerType == "пилообразная" || stringerType == "ломаная") {

	
	/*низ марша*/
	stringerPlatformHeight = Math.max(h1, h2);
	if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
	
	if (turnType_1 == "площадка") {
		//площадка	
		x1 = stringerOffset_x*scale;
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
		x0 = x2 + b2*scale;;
		y0 = y2 + h2*scale;;
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

function drawConsoles(par) {
    var profHeight = 100;
    var profWidth = 50;
    var maxDst = 1200; //максимально допустимое расстояние между подкосами
    var angle = Math.PI / 6;
    var consoles = new THREE.Object3D();

    var shape = new THREE.Shape();

    //внешний контур
    var p0 = { x: 0, y: 0 };
    var p1 = copyPoint(p0);
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

    var consoleAmt = Math.ceil(par.dst / maxDst) + 1;
    var dst = (par.dst - profWidth) / (consoleAmt - 1);
    for (var i = 0; i < consoleAmt; i++) {
        var console = new THREE.Mesh(geometry, par.material);
        console.rotation.y = Math.PI / 2;
        console.position.x = dst * i - par.stringerSideOffset;
        console.position.y = -profHeight / Math.cos(angle) - par.width * Math.tan(angle);
        consoles.add(console);
    }

    par.mesh = consoles;

    return par;

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
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var col = new THREE.Mesh(geom, par.material);
	col.position.x = -par.profWidth / 2;
	col.position.z = -par.profHeight / 2;
	
	par.mesh.add(col);
	return par;			
	}
	
	
function drawWinderTread1(par){
	/*
	var treadParams = {
		treadThickness:
		length:
		stepWidthLow:
		turnFactor
		material:
		}
		*/
	par.stepWidthHigh = par.stepWidthLow + par.length * Math.tan(Math.PI / 6);

	var extrudeOptions = {
			amount: par.treadThickness,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};

		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, par.length);
		shape.lineTo(par.stepWidthLow, par.length);
		shape.lineTo(par.stepWidthHigh, 0);
		shape.lineTo(0, 0);
		
		var geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		par.mesh = new THREE.Mesh(geom, par.material);
		
		return par;
		
		
}//end of drawWinderTread1


/* Отрисовка плинтуса */

function drawSkirting(par){
	par.mesh = new THREE.Object3D();
	var width = 60;
	var frontEdgeRad = 3;
	if (par.nose < 0) par.nose = 0;
	var extrudeOptions = {
			amount: par.thk,
			bevelEnabled: false,
			curveSegments: 12,
			steps: 1
		};
	
	// вертикальная планка
	if(par.rise != 0){
		var shape = new THREE.Shape();
		var p0 = { "x": 0.0, "y": 0.0 };
		var p1 = newPoint_xy(p0, -width, 0);
		var p2 = newPoint_xy(p1, 0, par.rise + width);
		var p3= newPoint_xy(p2, width, 0);
		var p4= newPoint_xy(p3, 0, -width);
		var p5= newPoint_xy(p4, -par.nose, 0); //скругляемый угол
		var p6= newPoint_xy(p5, 0, -par.treadThk);
		var p7= newPoint_xy(p6, par.nose, 0);
		
		var fil5 = calcFilletParams1(p6, p5, p4, frontEdgeRad, false);

		addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p3, p4, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p4, fil5.end, par.dxfBasePoint);
		addArc(shape, par.dxfArr, fil5.center, frontEdgeRad, fil5.angend, fil5.angstart, par.dxfBasePoint)
		addLine(shape, par.dxfArr, fil5.start, p6, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p6, p7, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p7, p0, par.dxfBasePoint);
		
		geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geometry, par.material);
		par.mesh.add(mesh);
		}
	
	//горизонтальная планка
	
	if(par.step != 0){
		var length = par.step - width;
		if(par.last) length = par.step;
		
		var shape = new THREE.Shape();
		var p0 = { "x": 0.0, "y": 0.0 };
		var p1 = newPoint_xy(p0, 0, width);
		var p2 = newPoint_xy(p1, length, 0);
		var p3 = newPoint_xy(p2, 0, -width);
		par.dxfBasePoint = newPoint_xy(par.dxfBasePoint, 100, 0);
		
		addLine(shape, par.dxfArr, p0, p1, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p1, p2, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p2, p3, par.dxfBasePoint);
		addLine(shape, par.dxfArr, p3, p0, par.dxfBasePoint);
		
		geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
		var mesh = new THREE.Mesh(geometry, par.material);
		mesh.position.y = par.rise;
		par.mesh.add(mesh);
		}
	
    return par;
	

}//end of drawSkirting

function drawFrame(par){
	var length = par.length;
	var width = par.width;
	var height = par.height;
	var thk = par.thk;
	var material = par.material;
	
	var frame = new THREE.Object3D();
	
	var geometry1 = new THREE.BoxGeometry(length, height, thk);
	var framePart1 = new THREE.Mesh(geometry1, material);
	frame.add(framePart1);
	
	var geometry2 = new THREE.BoxGeometry(length, height, thk);
	var framePart2 = new THREE.Mesh(geometry2, material);
	framePart2.position.z += width - thk;
	frame.add(framePart2);
	
	par.frame = frame;
	
	return par;
}






















