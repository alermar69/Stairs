<table><tbody>
<tr><td>Шапка</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('headerContainer', 200)"/></td>
</tr>
<tr><td>Подпись</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('footerText', 200)"/></td>
</tr>
<tr><td>Правое меню</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('rightMenu', 200)"/></td>
</tr>
<tr><td>История версий</td>
<td><input type="checkbox" onclick="showHideDiv('history', 200)"/></td>
</tr>
<tr><td>Инструкции</td>
<td><input type="checkbox" onclick="showHideDiv('manual', 200)"/></td>
</tr>
<tr><td>Визуализация 3D</td>
<td><input type="checkbox" checked="checked" onclick="showHideDiv('visualisation', 200)"/></td>
</tr>
<tr><td>Визуализация 2D</td>
<td><input type="checkbox" onclick="showHideDiv('2d', 200)"/></td>
</tr>


</tbody></table>

<p class='raschet' id="saveIntoFile" onclick="saveToXml('content', 'test')">Сохранить в файл</p>
<p class='raschet' onclick="$('#loadXML').click();">Загрузить из файла</p>
<p><input type="file" accept="text/xml" id="loadXML" onchange="loadFromXml('content');" style="display:none"></p>
<p class='raschet' onclick="saveToBD('content', '/calculator/general/db_data_exchange/dataExchangeXml_2.1.php')">Сохранить в базу</p>
<p class='raschet' onclick="loadFromBD('content', '/calculator/general/db_data_exchange/dataExchangeXml_2.1.php')">Загрузить из базы</p>
<p class="raschet" onclick="exportToDxf(dxfPrimitivesArr);">Экспорт контуров в dxf</p>

<p id="viewLink">Ссылка для монтажников</p>