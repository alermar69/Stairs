<h2>Тестирование</h2>

<div id="testingInputs" class="toggleDiv">

	Перебор конфигураций: 
	<select id="configGeneratorMode">
		<option value="нет">нет</option>
		<option value="синтетические">синтетические</option>
		<option value="сохраненные">сохраненные</option>
		<option value="последние">последние</option>
	</select>

	<!-- прогон конфигураций из базы -->
	<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/testing/baseTest.php" ?>

	<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/testing/testing.php" ?>
	
</div>