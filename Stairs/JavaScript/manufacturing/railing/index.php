<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Расчет ограждений v.2.0"); 
?> 

<h1 id = "mainTitle">Расчет ограждений</h1>

<!--служебные поля-->

<div id="calcInfo" style="display: none">
	<select size="1" id="calcType">
		<option value="lt-ko">lt-ko</option>
		<option value="timber"  >timber</option>
		<option value="vint">vint</option>
		<option value="vhod">vhod</option>
		<option value="mono"  >mono</option>	
		<option value="geometry">geometry</option>
		<option value="railing" selected >railing</option>	
	</select>
	<input type="text" value="2.0" id = "calcVersion">
</div>

<!-- Форма параметров заказа-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/orderForm.php" ?>

<!-- Блоки для вывода данных на странице, файлы заказа, чертежи-->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/include_areas/output.php" ?>

<!-- форма параметров ограждений-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/railing/forms/railing_config.php" ?>

<!--форма доставка, сборка-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/assemblingForm.php" ?>

<!--себестоимость-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/railing/forms/cost.php" ?>


<!-- спецификация, расчет трудоемкости и сдельной оплаты -->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/calc_spec/pagePart.php" ?>


<div class="content">

<!-- правое меню ограждения -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/railing/forms/rightMenu.php" ?>

<!-- общие библиотеки -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/libs_man.php" ?>
 
<!--визуализация-->
<script type="text/javascript" src="/calculator/railing/drawStaircase.js"></script>
<script type="text/javascript" src="/calculator/railing/concreteStairs.js"></script>
<script type="text/javascript" src="/calculator/railing/drawRailing.js"></script>
<script type="text/javascript" src="/manufacturing/general/drawRailing.js"></script>


<!--изменение оффера--
<script type="text/javascript" src="change_offer.js"></script>

<!--расчет цены-
<script type="text/javascript" src="priceCalc.js"></script>
->

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
<script type="text/javascript" src="main.js"></script>

<link href="/calculator/railing/styles.css" type="text/css" rel="stylesheet" />

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
