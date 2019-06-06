<h4>1. Общие характеристики:</h4>

<table class="form_table" ><tbody>

<tr id="model_tr"><td>Тип модулей:</td> <td>
	<select id="model" size="1" onchange="">
		<option value="Стамет">Стандартные</option>
		<option value="Стиль-Т" style="display: none;">Усиленные</option>
		<option value="Наша лестница" style="display: none;">Наша лестница</option>
		<option value="Мечта" style="display: none;">Мечта</option>
		
	</select>
</td></tr>

<tr><td>Геометрия лестницы:</td> <td> 
	<select id="stairModel" size="1" onchange="changeAllForms()">
		<option value="Прямая">Прямая</option>
		<option value="Г-образная с площадкой">Г-образная с площадкой</option>
		<option value="Г-образная с забегом">Г-образная с забегом</option>
		<option value="П-образная с площадкой" >П-образная с площадкой</option>
		<option value="П-образная с забегом">П-образная с забегом</option>
		<option value="П-образная трехмаршевая">П-образная трехмаршевая</option>
		<option style="display: none;" value="Прямая двухмаршевая">Прямая двухмаршевая</option>
		<option  style="display: none;" value="Криволинейная">Криволинейная</option>
	</select>
</td></tr>



<tr id="middlePlatform_tr_2" style="display: none;">
	<td>Глубина промежуточной площадки:</td> 
	<td><input id="platformLength_1" type="number" value="1000"></td>
</tr>

<tr id="middlePlatform_tr_3" style="display: none;">
	<td>Ширина промежуточной площадки:</td>
	<td><input id="platformWidth_1" type="number" value="2000"></td>
</tr>

<tr id="marshDist_tr" style="display: none;"><td>Зазор между маршами в плане:</td> <td> 
	<input id="marshDist" type="number" value="70"> 
</td></tr>

<tr id="turn_tr_11"><td>Нижний поворот:</td> <td> 
	<select id="turnType_1" size="1" onchange="">
		<option value="забег">забег</option>
		<option value="площадка">площадка</option>
	</select>
</td></tr>

<tr id="turn_tr_12"><td>Верхний поворот:</td> <td> 
	<select id="turnType_2" size="1" onchange="">
		<option value="забег">забег</option>
		<option value="площадка">площадка</option>
	</select>
</td></tr>

<tr id="turnSide_tr"><td>Направление поворота:</td> <td> 
<select id="turnSide" size="1" onchange="">
 	<option value="правое" selected >правое</option>
 	<option value="левое"   >левое</option>
</select>
</td></tr>

<tr id="M_tr"><td>Внешняя ширина маршей:</td> <td> 
	<input id="M" type="number" value="900">
</td></tr>

<tr style="display: none"><td>Подступенки:</td> <td> 
	<select id="riserType" size="1" onchange="">
		<option value="нет">нет</option>
		<option value="есть">есть</option>		
	</select>
</td></tr>	

<tr id="platformTop_tr_11"> 
	<td>Тип установки верхней ступени:</td> <td> 
	<select id="topStairType" size="1" onchange="">
		<option value="ниже">ниже перекрытия</option>
		<option value="вровень">вровень с перекрытием</option>		
	</select>
</td></tr>

<tr id="platformTop_tr_14" style="display: none;"><td>Верхнее крепление:</td> <td> 
	<select id="topAnglePosition" size="1" onchange="">
		<option value="под ступенью">под ступенью</option>
		<option value="над ступенью">над ступенью</option>		
	</select>
</td></tr>

<tr id=""><td>Размер модуля h x b:</td> <td> 
	<select id="moduleSize" size="1" onchange="">
		<option value="225">225x225</option>
		<option value="190">190x225</option>		
	</select>
</td></tr>


<tr id=""><td>Больцы:</td> <td> 
	<select id="bolzSize" size="1" onchange="">
		<option value="25">Ф25</option>
		<option value="38">Ф38 нерж.</option>		
	</select>
</td></tr>

	
</tbody> </table>

<div id="stepParamsTab">
<h4>2. Параметры ступеней:</h4>
<table class="form_table">
<tbody>
<tr>
	<th style="width: 20%;">Марш</th>
	<th>Кол-во прямых ступеней</th>
	<th>Подъем ступени</th>
	<th>Проступь</th>
	<th>Ступень</th>
</tr>

<tr>
	<td style="width: 20%;">Нижний</td>
	<td><input id="stairAmt1" type="number" value="7"></td>
	<td><input id="h1" type="number" value="225"></td>
	<td><input id="b1" type="number" value="225"></td>
	<td><input id="a1" type="number" value="300"></td>
</tr>

<tr class="marsh_2_tr">
	<td>Средний</td>
	<td><input id="stairAmt2" type="number" value="5"></td>
	<td><input id="h2" type="number" value="225"></td>
	<td><input id="b2" type="number" value="225"></td>
	<td><input id="a2" type="number" value="300"></td>
</tr>

<tr class="marsh_3_tr">
	<td>Верхний</td>
	<td><input id="stairAmt3" type="number" value="5"></td>
	<td><input id="h3" type="number" value="225"></td>
	<td><input id="b3" type="number" value="225"></td>
	<td><input id="a3" type="number" value="300"></td>
</tr>

</tbody>
</table>
</div>

<h4>3. Больцы, уголки к стене</h4>
<table class="form_table" ><tbody>
	<tr>
		<th>Марш</th>
		<th>Уголки к стене</th>
		<th>Больцы</th>
	</tr>
	
	<tr>
		<td>Нижний</td> 
		<td> 
			<select id="treadFixSide1" size="1">
				<option value="нет">нет</option>
				<option value="внешняя">внешняя</option>
				<option value="внутренняя">внутренняя</option>
				<option value="две стороны">две стороны</option>		
			</select>
		</td>
		<td> 
			<select id="bolzSide1" size="1">
				<option value="нет">нет</option>
				<option value="внешняя">внешняя</option>
				<option value="внутренняя">внутренняя</option>
				<option value="две стороны">две стороны</option>		
			</select>
		</td>
	</tr>
	<tr class="marsh_2_tr">
		<td>Средний</td> 
		<td> 
			<select id="treadFixSide2" size="1">
				<option value="нет">нет</option>
				<option value="внешняя">внешняя</option>
				<option value="внутренняя">внутренняя</option>
				<option value="две стороны">две стороны</option>		
			</select>
		</td>
		<td> 
			<select id="bolzSide2" size="1">
				<option value="нет">нет</option>
				<option value="внешняя">внешняя</option>
				<option value="внутренняя">внутренняя</option>
				<option value="две стороны">две стороны</option>		
			</select>
		</td>		
		</tr>
	<tr class="marsh_3_tr">
		<td>Верхний</td>
		<td> 
			<select id="treadFixSide3" size="1">
				<option value="нет">нет</option>
				<option value="внешняя">внешняя</option>
				<option value="внутренняя">внутренняя</option>
				<option value="две стороны">две стороны</option>		
			</select>
		</td>
		<td> 
			<select id="bolzSide3" size="1">
				<option value="нет">нет</option>
				<option value="внешняя">внешняя</option>
				<option value="внутренняя">внутренняя</option>
				<option value="две стороны">две стороны</option>		
			</select>
		</td>
	</tr>
	
</tbody></table>

</div>

<div id="assembling_inputs">



<h4>4. Крепление каркаса к стенам и перекрытиям.</h4>

<table class="form_table">
<tbody>

<tr>
	<td>Нижнее перекрытие</td> 
	<td> 
	<select id="fixType1" size="1" onchange="">
		<option value="монолит">монолит</option>
		<option value="пустотелая плита" >пустотелая плита</option>
		<option value="дерево" >дерево</option>		
	</select>
	</td>
</tr>

<tr>
	<td>Стены</td> 
	<td> 
	<select id="fixType2" size="1" onchange="">
		<option value="монолит">монолит</option>
		<option value="полнотелый кирпич" >полнотелый кирпич</option>
		<option value="пустотелый кирпич" >пустотелый кирпич</option>
		<option value="пеноблок" >пеноблок</option>
		<option value="дерево" >дерево</option>	
		<option value="гипсокартон" >гипсокартон</option>			
	</select>
	</td>
</tr>

<tr>
	<td>Верхнее перекрытие</td> 
	<td> 
	<select id="fixType3" size="1" onchange="">
		<option value="монолит">монолит</option>
		<option value="пустотелая плита" >пустотелая плита</option>
		<option value="дерево" >дерево</option>		
	</select>
	</td>
</tr>

<tr>
	<td>Опора 5 модуля</td> 
	<td> 
	<select id="fixType5" size="1" onchange="">
		<option value="столб">столб</option>
		<option value="консоль" >консоль</option>
	</select>
	</td>
</tr>

<tr>
	<td>Опора 9 модуля</td> 
	<td> 
	<select id="fixType9" size="1" onchange="">
		<option value="столб">столб</option>
		<option value="консоль" >консоль</option>
	</select>
	</td>
</tr>

<tr>
	<td>Опора 13 модуля</td> 
	<td> 
	<select id="fixType13" size="1" onchange="">
		<option value="столб">столб</option>
		<option value="консоль" selected >консоль</option>
	</select>
	</td>
</tr>



</tbody></table>
<br/>



<div id="complect_inputs">
<h4>5. Комплектация лестницы:</h4>

<table class="form_table" ><tbody>

<tr><td>Ступени:</td> <td> 
	<select id="stairType" size="1" onchange="">
		<option value="сосна кл.Б">сосна кл.Б</option>
		<option value="береза паркет.">береза паркет.</option>
		<option value="дуб паркет.">дуб паркет.</option>
		<option value="дуб ц/л">дуб ц/л</option>
		<option value="нет">нет</option>
	</select>
</td></tr>

	

<tr><td>Покраска металла:</td> <td> 
	<select id="metalPaint" size="1" onchange="">
		<option value="нет">нет</option>
		<option value="грунт">грунт</option>
		<option value="порошок" selected >порошок</option>
		<option value="автоэмаль">автоэмаль</option>
	</select>
</td></tr>

<tr id='carcasMetalColor_tr'>
	<td>Цвет покраски металла</td> 
	<td><textarea id="comments_01" rows="1" cols="30" class="comments">не указан</textarea></td>
</tr>

<tr id="timberPaint_tr"><td>Покраска дерева:</td> <td> 
	<select id="timberPaint" size="1" onchange="">
		<option value="нет">нет</option>
		<option value="лак">лак</option>
		<option value="морилка+лак">морилка+лак</option>		
	</select>
</td></tr>

<tr id='carcasTimberColor_tr'>
	<td>Цвет покраски дерева</td> 
	<td><textarea id="comments_02" rows="1" cols="30" class="comments">не указан</textarea></td>
</tr>

<tr><td>Цвет металлических деталей (приблизительно):</td> <td> 
	<input type="color" id="metalColor" value="#363636"/>
</td></tr>
<tr><td>Цвет деревянных деталей (приблизительно):</td> <td> 
	<input type="color" id="timberColor" value="#804000"/>
</td></tr>


</tbody> </table>

</div>

Комментарии к расчету:<br/>  <textarea id="comments_03" rows="1" cols="80" class="comments"></textarea>
<br/>

<!--Обработчик формы-->
<script type="text/javascript" src="/calculator/module/forms/carcas_form_change.js"></script>

