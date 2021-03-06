<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Расчет пожарных лестниц v.1.0"); 
?> 

<h1 id = "mainTitle">Коммерческое предложение на пожарные лестницы</h1>


<!--служебные поля-->

<div id="calcInfo" style="display: none">
	<select size="1" id="calcType">
		<option value="lt-ko">lt-ko</option>
		<option value="timber"  >timber</option>
		<option value="vint">vint</option>
		<option value="vhod">vhod</option>
		<option value="mono">mono</option>
		<option value="module" >module</option>
		<option value="fire" >fire</option>
		<option value="fire_2" selected >fire_2</option>	
		<option value="geometry">geometry</option>		
	</select>
	<input type="text" value="1.0" id = "calcVersion">
</div>

<!-- Форма параметров заказа-->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/forms/orderForm.php" ?>



<h2 class="raschet">Основные размеры лестницы</h2>
<canvas id='mainView'>Обновите браузер</canvas>


<!-- файлы заказа и типовые чертежи -->
<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/orderFiles/orderFiles.php" ?>

<!-- форма параметров лестницы-->
	<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/fire_2/forms/carcas_form.php" ?>

<!--форма доставка, сборка-->
	<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/fire_2/forms/assemblingForm.php" ?>

<!--себестоимость-->
	<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/fire_2/forms/cost.php" ?>

	

</div> <!--end of .content-->

<!-- спецификация, расчет трудоемкости и сдельной оплаты -->
<?php include $_SERVER['DOCUMENT_ROOT']."/manufacturing/general/calc_spec/pagePart.php" ?>




<div id="faq"></div>	
	<div id="drawings"></div>	
	<div id="works"></div>

<div class="content">



<div id="result" style="display: none;"></div>

<div id="specificationList" style="display: none;">
<h2>Приблизительный расход материала</h2>

	<div id="materialNeed"></div>

</div>



<!-- общие библиотеки -->

<?php include $_SERVER['DOCUMENT_ROOT']."/calculator/general/libs_man.php" ?>


<!--2D графика-->
<script type="text/javascript" src="/manufacturing/fire_2/drawStaircase.js"></script>
<script type="text/javascript" src="/calculator/general/draw2DLib.js"></script>

<!--изменение оффера-->
<script type="text/javascript" src="change_offer.js"></script>


<!--расчет цены-->
<script type="text/javascript" src="/calculator/fire_2/priceCalc.js"></script>


<!--спецификация-->
<script type="text/javascript" src="calcSpec.js"></script>
<script type="text/javascript" src="/manufacturing/fire/calc_spec_2.0.js"></script>


<!--оболочки-->
<script type="text/javascript" src="main.js"></script>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>