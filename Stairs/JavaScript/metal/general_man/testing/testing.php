<h4>Синтетические конфигурации: </h4>
№ <input id="configId" type="number" value="0"> <button id="setConfig">Применить</button>
<button id="prevConfig">Предыдущая</button><button id="nextConfig">Следующая</button><br/>
Кол-во конфигураций: <input id="configAmt" type="number" value="2"> 
<button id="test_set">Проверить группу</button> 
<button id="stopTesting">Стоп</button>


<h4>Тестирование: </h4>

Режим: 
<select id="testingMode">
	<option value="без болтов">без болтов</option>
	<option value="болты Ф12">болты Ф12</option>
	<option value="болты Ф14">болты Ф14</option>
	<option value="дерево1">дерево1</option>
	<option value="дерево2">дерево2</option>
	<option value="болты Ф12 + Ф14">болты Ф12 + Ф14</option>
	<option value="сравнение ступеней">сравнение ступеней</option>
	<option value="сравнение каркаса">сравнение каркаса</option>
	<option value="отладка">отладка</option>
	<option value="критические ошибки">критические ошибки</option>
</select>

<button id="test_this">Проверить текущую</button></br>

</br>




<br/>
<h4>Результаты теста: </h4>
<div id="testResults"></div>
