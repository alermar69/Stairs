<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Шаблон 3D визуализатора v.1.6"); 
?> 

<h1 id = "mainTitle">Отрисовка тетив/косоуров (демо)</h1>


<h2>Параметры</h3>
<table class="form_table"><tbody>

<tr><td>model</td> <td> 
	<select id="model" size="1">
		<option value="лт">ЛТ</option>
		<option value="ко">КО</option>
		<option value="нет">нет</option>
	</select>
</td></tr>

<tr>
	<td>stringerSide:</td> 
	<td><select id="stringerSide" size="1">
			<option value="out">out</option>
			<option value="in">in</option>
		</select></td>
</tr>
<tr>
	<td>botEnd:</td> 
	<td><select id="botEnd" size="1">
			<option value="floor">floor</option>
			<option value="platformG">platformG</option>
			<option value="platformP">platformP</option>
			<option value="winder">winder</option>
		</select></td>
</tr>

<tr>
	<td>topEnd:</td> 
	<td><select id="topEnd" size="1">
			<option value="floor">floor</option>
			<option value="platformG">platformG</option>
			<option value="platformP">platformP</option>
			<option value="winder">winder</option>
		</select></td>
</tr>

<tr><td>botEndLength:</td>
	<td><input id="botEndLength" type="number" value="900"></td>
</tr>

<tr><td>topEndLength:</td>
	<td><input id="topEndLength" type="number" value="900"></td>
</tr>

<tr><td>stringerType:</td> <td> 
	<select id="stringerType" size="1" onchange="">
		<option value="пилообразная" selected >пилообразная</option>
		<option value="ломаная">ломаная</option>
		<option value="прямая">прямая</option>
	</select>
</td></tr>

<tr><td>stairFrame:</td> <td> 
	<select id="stairFrame" size="1">
		<option value="нет">нет</option>
		<option value="есть">есть</option>
	</select>
</td></tr>
<tr>

<tr>
	<td>treadThickness</td>
	<td><input id="treadThickness" type="number" value="40"></td>
</tr>

<td>Тип установки лестницы botFloorType</td> 
	<td> 
	<select id="botFloorType" size="1" onchange="">
		<option value="чистовой">на чистовой пол</option>
		<option value="черновой">на черновой пол</option>		
	</select>
	</td>
</tr>

<tr>
	<td>Разница высот чистового и чернового полов botFloorsDist</td>
	<td><input id="botFloorsDist" type="number" value="25"></td>
</tr>

<tr id="platformTop_tr_14"><td>Тип крепления к верхнему перекрытию topAnglePosition:</td> <td> 
	<select id="topAnglePosition" size="1" onchange="">
		<option value="под ступенью">Уголок под ступенью</option>
		<option value="над ступенью">Уголок над ступенью</option>
		<option value="рамка верхней ступени">Через рамку верхней ступени</option>
		<option value="вертикальная рамка">Вертикальная рамка</option>
	</select>
</td></tr>

<tr id="platformTop_tr_4">
	<td>Фланец крепления к верхнему перекрытию topFlan:</td> <td> 
	<select id="topFlan" size="1" onchange="">
		<option selected value="нет">нет</option>
		<option value="есть">есть</option>		
	</select>
</td></tr>

<tr>
	<td>Тип крепления к нижнему перекрытию bottomAngleType:</td> <td> 
	<select id="bottomAngleType" size="1" onchange="">
		<option value="уголок">уголок</option>
		<option value="регулируемая опора">регулируемая опора</option>
	</select>
</td></tr>

<tr><td>h:</td>
	<td><input id="h" type="number" value="180"></td>
</tr>
<tr id=""><td>b:</td>
	<td><input id="b" type="number" value="260"></td>
</tr>
<tr id=""><td>a:</td>
	<td><input id="a" type="number" value="300"></td>
</tr>
<tr id=""><td>stairAmt:</td>
	<td><input id="stairAmt" type="number" value="7"></td>
</tr>
</tbody>
</table>


<!-- визуализация -->
<div id="visualisation">
	<h2 class="raschet" onclick="recalculate();">Результат посторения:</h2>
	<div id="Stats-output" style="display: none;"></div>

	<div id="WebGL-output"><canvas>Для отображения содержимого откройте страницу в Гугл Хром</canvas></div> 
</div>

<p class="raschet" onclick="exportToDxf(dxfPrimitivesArr);">Экспорт контуров в dxf</p> 


<!--общие библитотеки-->
<script async="" src="/calculator/forms/FileSaver.min.js" /></script>

<!--графика-->
<script type="text/javascript" src="/calculator/general/viewports_2.0.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/three.js"></script> 
<script type="text/javascript" src="/calculator/general/three_libs/stats.js"></script> 
<script type="text/javascript" src="/calculator/general/three_libs/dat.gui.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/OrbitControls.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/ThreeBSP.js"></script>

 
<!--визуализация-->
<script type="text/javascript" src="drawStringerDemo.js"></script>
<script type="text/javascript" src="drawStringerPartsLt.js"></script>
<script type="text/javascript" src="drawStringerPartsKo.js"></script>
<script type="text/javascript" src="/calculator/general/drawPrimitives.js"></script>


<!--экспорт в dxf-->
<script type="text/javascript" src="/calculator/general/dxfFileMaker.js"></script>

<!--оболочки-->
<script type="text/javascript" src="personalScripts.js"></script>
<script type="text/javascript" src="main.js"></script>



<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
