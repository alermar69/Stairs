<div id="specificationList1">
	
	<h2>Параметры деталей, снятые с модели</h2>
	<div id="modelInfo" class="toggleDiv"></div>
	
	<h2>Результаты проверки спецификации</h2>
	<div id="specCheckResult" class="toggleDiv"></div>
	
	<h2>Комментарии к спецификации</h2>
	<div id="specComment" class="toggleDiv"></div>

	<h2>Спецификация лестницы (Комплектовка)</h2>
	<div class="toggleDiv">
		<div id="metal_list"></div>
		<div id="timber_list"></div>
		<div id="stock1_list"></div>
		<div id="stock2_list"></div>
	
	<button onclick="downloadXls(['#stock1_list', '#stock2_list'], '/manufacturing/general/calc_spec/');" class="btn btn-primary">Скачать XLS для склада</button>
	<button onclick="downloadXls(['#metal_list', '#timber_list', '#stock1_list', '#stock2_list', '#materialNeed'], '/manufacturing/general/calc_spec/', true);" class="btn btn-primary">Скачать XLS полный</button>
	
	<button id="saveSpecData" class="btn btn-primary">
		<i class="glyphicon glyphicon-floppy-disk"></i>
		<span>Сохранить</span>	
	</button>
	
	<a class="btn btn-primary specLink" href="" target='_blank'>
		<i class="glyphicon glyphicon-pencil"></i>
		<span>Редактировать</span>	
	</a>
	
	</div>
</div>

<div id="specificationList2">
	<h2>Спецификация лестницы (сборка)</h2>
	<div id="specificationAssembly" class="toggleDiv"></div>	
</div>

<h2>Ведомость заготовок</h2>
<div id="poleList" class="toggleDiv"> </div>

<!--данные для производства-->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/include_areas/production_data.php" ?>