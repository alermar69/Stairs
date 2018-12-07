<div id="specificationList1">
	
	<h2>Параметры деталей, снятые с модели</h2>
	<div id="modelInfo" class="toggleDiv"></div>

	<h2>Спецификация лестницы (Комплектовка)</h2>
	<div class="toggleDiv">
		<div id="metal_list"></div>
		<div id="timber_list"></div>
		<div id="stock1_list"></div>
		<div id="stock2_list"></div>
	
	<button onclick="downloadXls(['#stock1_list', '#stock2_list'], '/manufacturing/general/calc_spec/');" class="saveXLS">Скачать XLS для склада</button>
	<button onclick="downloadXls(['#metal_list', '#timber_list', '#stock1_list', '#stock2_list'], '/manufacturing/general/calc_spec/', true);" class="saveXLS">Скачать XLS полный</button>
	</div>
</div>


<div id="specificationList2">
	<h2>Спецификация лестницы (сборка)</h2>
	<div id="specificationAssembly" class="toggleDiv"></div>	
</div>

<h2>Ведомость заготовок</h2>
<div id="poleList" class="toggleDiv"> </div>



<h2>Расчет трудоемкости и сдельных расценок</h2>

<div class="tabs toggleDiv" id="wageInfo">
	<ul>
		<li>Сводная</li>
		<li>Металл</li>
		<li>Дерево</li>
		<li>Маляр</li>
		<li>Монтаж</li>
	</ul>
	<div>
	<div id="works_all"></div>
	<div id="works_metal"></div>
	<div id="works_timber"></div>
	<div id="works_timberPaint"></div>
	<div id="works_install"></div>
		
	</div>
</div>

<h2>Предупреждения по расчету сдельных расценок</h2>
<div id="works_log" class="toggleDiv"></div>