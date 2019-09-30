<table id="leftMenu"><tbody>
<tr>
	<td>Оформление:</td>
	<td><select id="viewTemplate"> 			
		<option value="стандарт">Стандарт</option>
		<option value="монтаж">Монтаж</option>
		</select>
	</td>
</tr>

<tr><td>Шапка</td>
<td><input checked type="checkbox" id="show_headerContainer"/></td>
</tr>

<tr><td>История версий</td>
<td><input type="checkbox" id="show_history"/></td>
</tr>
<tr><td>Инструкции</td>
<td><input type="checkbox" id="show_manual"/></td>
</tr>

<tr><td>Параметры лестницы</td>
<td><input checked type="checkbox" id="show_staircaseForm" /> </td>
</tr>
<tr><td>Параметры балюстрады</td>
<td><input checked type="checkbox" id="show_balustradeFormDiv" /> </td>
</tr>
<tr><td>Сборка</td>
<td><input checked type="checkbox" id="show_assembling" /> </td>
</tr>

<tr><td>Геометрия</td>
<td>  <input checked type="checkbox" id="show_geometry" /></td>
</tr>

<tr><td>Спецификация (комплектовка)</td>
<td> <input type="checkbox" checked="checked" onclick="showHideDiv('specificationList1', 200)" /></td>
</tr>

<tr><td>Спецификация (сборка)</td>
<td> <input type="checkbox" checked="checked" onclick="showHideDiv('specificationList2', 200)" /></td>
</tr>

<tr><td>Заготовки</td>
<td> <input type="checkbox" onclick="showHideDiv('poleList', 200)" /></td>
</tr>


<tr><td>Изготовление</td>
<td> <input checked type="checkbox" id="show_drawings" /></td>
</tr>

<tr><td>ФОТ</td>
<td> <input checked type="checkbox" id="show_works" /></td>
</tr>

<tr><td>Монтаж</td>
<td> <input checked type="checkbox" id="show_assemblingInfo" /></td>
</tr>

<tr><td>Подпись</td>
<td> <input checked type="checkbox" id="show_footerText" /></td>
</tr>



</tbody></table>
<!--
<button id="saveIntoFile" onclick="saveToFile('content', 'test')">Сохранить в файл</button>
<button onclick="$('#loadXML').click();">Загрузить из файла</button>
<p><input type="file" accept="text/json" id="loadXML" onchange="loadFromFile('content');" style="display:none"></p>
-->

<!-- кнопки -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/leftMenuButtons.php" ?>

<p>Ссылки: <br/>
<a href="/calculator/vint/" id="comLink" target="_blank">КП</a><br/>
<a href="/installation/vint/" id="montLink" target="_blank">Монтаж</a>
<button id="showPass">Показать пароль</button>
</p>

