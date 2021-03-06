<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Расчет деревянных лестниц v.4.1");
?>

<h1 id = "mainTitle">Проектирование деревянных лестниц</h1>

<!--служебные поля-->

<div id="calcInfo" style="display: none">
	<select size="1" id="calcType">
		<option value="lt-ko"  >lt-ko</option>
		<option value="timber" selected >timber</option>
		<option value="vint">vint</option>
		<option value="vhod">vhod</option>
		<option value="mono">mono</option>
		<option value="geometry">geometry</option>
	</select>
	<input type="text" value="4.1" id = "calcVersion"></li>
</div>

<!-- Форма параметров заказа-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/orderForm.php" ?>

<!-- Блоки для вывода данных на странице, файлы заказа, чертежи-->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/include_areas/output.php" ?>

<!-- форма параметров проемов каркаса-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/timber/forms/carcas_form.php" ?>

<!-- форма параметров ограждений-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/timber/forms/railing_form.php" ?>


<!-- форма параметров конструкции балюстрады-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/banister/forms/banister_construct_form.php" ?>

<!-- форма параметров каркаса шкафа -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/wardrobe/forms/stairs_wr.php" ?>

<!--форма доставка, сборка-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/assemblingForm.php" ?>

<!--комментарии менеджера-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/comments.php" ?>

<!--себестоимость-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/cost.php" ?>


</div> <!--end of .content-->

<!-- спецификация, расчет трудоемкости и сдельной оплаты -->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/calc_spec/pagePart.php" ?>


<div class="content">

<!-- правое меню -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/right_menu/rightMenu.php" ?>

<!-- общие библиотеки -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/libs_man.php" ?>

<!--визуализация-->

	<script type="text/javascript" src="drawStaircase.js"></script>
	<script type="text/javascript" src="drawCarcasParts.js"></script>
	<script type="text/javascript" src="drawRailing.js"></script>
	<script type="text/javascript" src="drawStringerParts.js"></script>
	<script type="text/javascript" src="drawNewell.js"></script>
	<script type="text/javascript" src="drawCarcas.js"></script>
	<script type="text/javascript" src="/manufacturing/general/drawSkirting.js"></script>

	<script type="text/javascript" src="/calculator/geometry/calcGeomParams2.js"></script>
	<script type="text/javascript" src="/manufacturing/general/drawTreads.js"></script>
	<script type="text/javascript" src="/manufacturing/general/drawRailing.js"></script>
	<script type="text/javascript" src="/manufacturing/general/calcParams.js"></script>
	<script type="text/javascript" src="/manufacturing/general/sideHandrail.js"></script>

	<!-- автотесты -->
	<script type="text/javascript" src="testing.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/baseTest.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/testingLib.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/testingActions.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/checkSamples.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/testHelper.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/debug/testReport.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/testSamples.js"></script>
	
<!--расчет спецификации-->
<script type="text/javascript" src="calcSpec_2.0.js"></script>

<!--оболочки-->
<script type="text/javascript" src="../general/main.js"></script>
<script type="text/javascript" src="main.js"></script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
