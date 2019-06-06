<table><tbody>
<tr><td>Шапка</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('headerContainer', 200)"/></td>
</tr>
<tr><td>Подпись</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('footerText', 200)"/></td>
</tr>


<tr><td>История версий</td>
<td><input type="checkbox" onclick="showHideDiv('history', 200)"/></td>
</tr>
<tr><td>Инструкции</td>
<td><input type="checkbox" onclick="showHideDiv('manual', 200)"/></td>
</tr>

<tr><td>Картинки</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('mainImages', 200)" /></td>
</tr>
<tr><td>Описание</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('description', 200)" /></td>
</tr>

<tr><td>Общая цена</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('totalResult', 200)" /> </td>
</tr>
<tr><td>О компании</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('about', 200)" /> </td>
</tr>
<tr><td>Расчет каркаса</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('carcasForm', 200)" /> </td>
</tr>

<tr><td>Сборка</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('assembling', 200)" /> </td>
</tr>

<tr><td>Себестоимость</td>
<td> <input type="checkbox" onclick="showHideDiv('cost', 200)" /></td>
</tr>

<tr><td>Спецификация</td>
<td> <input type="checkbox" onclick="showHideDiv('specificationList', 200)" /></td>
</tr>

</tbody></table>

<!--
<p class='raschet' id="saveIntoFile" onclick="saveToXml('content', 'test')">Сохранить в файл</p>
<p class='raschet' onclick="$('#loadXML').click();">Загрузить из файла</p>
<p><input type="file" accept="text/xml" id="loadXML" onchange="loadFromXml('content');" style="display:none"></p>
<p class='raschet' onclick="saveToBD('content', '/calculator/general/db_data_exchange/dataExchangeXml_2.1.php')">Сохранить в базу</p>
<p class='raschet' onclick="loadFromBD('content', '/calculator/general/db_data_exchange/dataExchangeXml_2.1.php')">Загрузить из базы</p>
<p class="raschet" onclick="exportToDxf(dxfPrimitivesArr);">Экспорт контуров в dxf</p>
-->

<!-- кнопки -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/leftMenuButtons.php" ?>