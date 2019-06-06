<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Расчет винтовых лестниц v.2.1");
?> 
 
<h1 id = "mainTitle">Данные для производства винтовой лестницы</h1>
<!--служебные поля-->
<div id="calcInfo" style="display: none">
	<select size="1" id="calcType">
		<option value="lt-ko">lt-ko</option>
		<option value="timber">timber</option>
		<option value="vint" selected >vint</option>
		<option value="vhod">vhod</option>
		<option value="geometry">geometry</option>		
	</select>
	<input type="text" value="2.1" id = "calcVersion">
</div>

<!-- Форма параметров заказа-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/orderForm.php" ?>

<!-- Блоки для вывода данных на странице, файлы заказа, чертежи-->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/include_areas/output.php" ?>

<!-- форма параметров винтовой лестницы (каркас + ограждения)-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/vint/forms/vint_form.php" ?>

<!-- форма параметров конструкции балюстрады-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/banister/forms/banister_construct_form.php" ?>

<!--форма доставка, сборка-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/assemblingForm.php" ?>


<!--Расчетные параметры геометрии-->
<div id="geometryWrap" >
	<h2>Расчетные параметры геометрии лестницы</h2>
	<div id="geometry" class="toggleDiv"></div>
</div>

<!--себестоимость-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/vint/forms/cost.php" ?>

<!-- всплывающее окошко с информацией о детали -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/partInfo.php" ?>


</div> <!--end of .content--> 

<!-- спецификация, расчет трудоемкости и сдельной оплаты -->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/calc_spec/pagePart.php" ?>


<div class="content">

<div id="manInfo"></div>
<div id="assemblingInfo"></div>

<!-- правое меню винтовой лестницы -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/right_menu/rightMenu_vint.php" ?>

<!-- общие библиотеки -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/libs_man.php" ?>
 
<!--визуализация-->
<script type="text/javascript" src="draw_vint.js"></script>
<script type="text/javascript" src="drawRailing.js"></script>
<script type="text/javascript" src="drawCarcasParts.js"></script>
<!--<script type="text/javascript" src="/calculator/vint/changeFormBanister.js"></script>-->
<script type="text/javascript" src="/calculator/general/drawCarcasPartsLib.js"></script>
<script type="text/javascript" src="/manufacturing/timber/drawRailing.js"></script>
<script type="text/javascript" src="/manufacturing/metal/drawFrames.js"></script>

<script type="text/javascript" src="/manufacturing/general/drawRailing.js"></script>

<!--изменение оффера
<script type="text/javascript" src="content/change_offer.js"></script>
-->

<!--расчет спецификации-->
<script type="text/javascript" src="calcSpec_3.0.js"></script>

<!--Шаблоны оформления-->
<script type="text/javascript" src="view.js"></script>

	<!-- автотесты -->
	<script type="text/javascript" src="testing.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/baseTest.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/testingLib.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/testingActions.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/checkSamples.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/testHelper.js"></script>
	<script type="text/javascript" src="/manufacturing/general/testing/debug/testReport.js"></script>
    <script type="text/javascript" src="/manufacturing/general/testing/debug/testSamples.js"></script>

<!--оболочки-->
<script type="text/javascript" src="main.js"></script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>