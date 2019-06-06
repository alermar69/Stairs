function changeFormRailing(){
getAllInputsValues(params);


/*вывод кол-ва маршей в зависимости от модели*/
$('#marsh_2_perila_tr').hide();
$('#marsh_3_perila_tr').show();

//средний марш
if (params.stairModel == "П-образная трехмаршевая") $('#marsh_2_perila_tr').show();

//верхний марш
if (params.stairModel == "Прямая") $('#marsh_3_perila_tr').hide();


/*заднее ограждение П-образной площадки/забега*/
$('#backRailing_1_tr').hide();
$('#backRailing_2_tr').hide();

if (params.stairModel == "П-образная с площадкой") $('#backRailing_1_tr').show();
if (params.stairModel == "П-образная с забегом") $('#backRailing_2_tr').show();


/*ограждение верхней площадки*/
$('#topPltRailing_tr').hide();
if (params.platformTop == "площадка")  $("#topPltRailing_tr").show();



/*Характеристики ограждений*/

if (params.railingModel == "Самонесущее стекло") {
	$('#glass_tr_1').show();
	}
else {
	$('#glass_tr_1').hide();
	}

if (params.railingModel == "Ригели") {
	$('#rigel_tr_1').show();
	$('#rigel_tr_2').show();	
	}
else {
	$('#rigel_tr_1').hide();
	$('#rigel_tr_2').hide();
}

if (params.railingModel == "Кованые балясины") {
	$('#kovka_tr_1').show();
	$('#kovka_tr_2').show();
	$('#kovka_tr_3').show();
	$('#kovka_tr_4').show();
	}
else {
	$('#kovka_tr_1').hide();
	$('#kovka_tr_2').hide();
	$('#kovka_tr_3').hide();
	$('#kovka_tr_4').hide();
}

if (params.railingModel == "Деревянные балясины"){
	$('#timberBal_tr_1').show();
	$('#timberBal_tr_2').show();
	$('#timberBal_tr_3').show();
	$('#timberBal_tr_4').show();
	$('#timberBal_tr_5').show();
	$('#timberBal_tr_6').show();
	$('#timberBal_tr_7').show();
	$('#timberBal_tr_8').show();
	$('#timberBal_tr_9').show();
	}
else {
	$('#timberBal_tr_1').hide();
	$('#timberBal_tr_2').hide();
	$('#timberBal_tr_3').hide();
	$('#timberBal_tr_4').hide();
	$('#timberBal_tr_5').hide();
	$('#timberBal_tr_6').hide();
	$('#timberBal_tr_7').hide();
	$('#timberBal_tr_8').hide();
	$('#timberBal_tr_9').hide();
	}
	
	
if (params.railingModel == "Ригели" || params.railingModel == "Стекло на стойках")
	$('#banisterMaterial_tr').show();	
else $('#banisterMaterial_tr').hide();

/*выбор поручней*/
/*задаем массив доступных значений*
var handrailCompatible = [];

if (params.railingModel == "Редкие стойки" || params.railingModel == "Частые стойки") 
	handRailCompatible = [1,2,3,5,6,12];
if (params.railingModel == "Ригели") handRailCompatible = [1,2,3,5,6,12];
if (params.railingModel == "Стекло на стойках") handRailCompatible = [1,2,3,5,6,12];
if (params.railingModel == "Самонесущее стекло") handRailCompatible = [12,13,14,15,16];
if (params.railingModel == "Кованые балясины") handRailCompatible = [1,2,3,4,8,11];
if (params.railingModel == "Деревянные балясины") handRailCompatible = [8,11,17,18,19];

showOptions('handrail', handRailCompatible);
*/
/*
var handrail = document.getElementById('handrail').options;
var i;
var j;
for (i = 0; i < handrail.length; i++) {
	if (handRailCompatible[0] == (i+1)) handrail[i].selected = "true";
	handrail[i].style.display = "none";
	for (j = 0; j < handRailCompatible.length; j++)
		if (handRailCompatible[j] == (i+1)) {
		handrail[i].style.display = "block";		
		}
}*/

} //end of changeForm
