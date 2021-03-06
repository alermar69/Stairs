<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Расчет входных лестниц v.4.1");
?>

<h1 id = "mainTitle">Расчет входных лестниц</h1>


<!--служебные поля-->

<div id="calcInfo" style="display: none">
	<select size="1" id="calcType">
		<option value="lt-ko"  >lt-ko</option>
		<option value="timber"  >timber</option>
		<option value="vint">vint</option>
		<option value="vhod" selected>vhod</option>
		<option value="mono"  >mono</option>
		<option value="geometry">geometry</option>
	</select>
	<input type="text" value="4.1" id = "calcVersion">
</div>

<!-- Форма параметров заказа-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/orderForm.php" ?>

<!-- Блоки для вывода данных на странице, файлы заказа, чертежи-->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/include_areas/output.php" ?>

<!-- форма параметров проемов каркаса-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/vhod/forms/carcas_form.php" ?>

<!-- форма параметров ограждений-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/vhod/forms/railing_form.php" ?>

<!-- форма параметров конструкции балюстрады-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/banister/forms/banister_construct_form.php" ?>

<!--форма доставка, сборка-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/assemblingForm.php" ?>

<!--себестоимость-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/cost.php" ?>

<!-- всплывающее окошко с информацией о детали -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/partInfo.php" ?>

</div> <!--end of .content-->

<div id="result" style="display: none;"></div>

<!-- спецификация, расчет трудоемкости и сдельной оплаты -->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/calc_spec/pagePart.php" ?>


<div class="content">

<!-- правое меню -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/right_menu/rightMenu.php" ?>

<!-- общие библиотеки -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/libs_man.php" ?>

<script type="text/javascript" src="/manufacturing/general/drawRailing.js"></script>	

	<script type="text/javascript" src="/manufacturing/metal/drawFrames.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawStringerPartsKo.js"></script>
	<!--<script type="text/javascript" src="/manufacturing/metal/drawStaircase.js"></script>-->
	<script type="text/javascript" src="/manufacturing/metal/drawCarcasParts.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawCarcasPartsLib_2.0.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawStringerPartsLt.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawCarcas.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawStringers.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawRailing_3.0.js"></script>
	<script type="text/javascript" src="/manufacturing/general/sideHandrail.js"></script>
	

	<!--визуализация-->
	<script type="text/javascript" src="drawStaircase.js"></script>
	<script type="text/javascript" src="drawVhodStock.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/drawSvg.js"></script>

<!--файлы с едиными функциями (сейчас в работе)-->
	<script type="text/javascript" src="/manufacturing/general/drawTreads.js"></script>
	<script type="text/javascript" src="/manufacturing/general/calcParams.js"></script>
	<script type="text/javascript" src="/manufacturing/general/drawCarcasParts.js"></script>
	
	<script type="text/javascript" src="/manufacturing/general/calcRailingParams.js"></script>
    
	<!-- автотесты -->
	<script type="text/javascript" src="/manufacturing/general/testing/testingLib.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/testingActions.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/checkSamples.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/testHelper.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/debug/testReport.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/testSamples.js"></script>



	<!--расчет спецификации-->
	<script type="text/javascript" src="vhodStockSpec.js"></script>
	<script type="text/javascript" src="/manufacturing/metal/calcSpec_3.0.js"></script>

	<!--оболочки-->
	<script type="text/javascript" src="main.js"></script>

	<!--тестирование-->
	<script type="text/javascript" src="testing.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/baseTest.js"></script>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>