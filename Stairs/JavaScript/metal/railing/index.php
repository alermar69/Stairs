<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Расчет лестниц лт и ко v.3.0");
?>

<h1 id = "mainTitle">Расчет лестниц лт и ко</h1>


<!--служебные поля-->

<div id="calcInfo" style="display: none">
    <select size="1" id="calcType">
        <option value="lt-ko" selected >lt-ko</option>
        <option value="timber"  >timber</option>
        <option value="vint">vint</option>
        <option value="vhod">vhod</option>
        <option value="mono"  >mono</option>
        <option value="geometry">geometry</option>
    </select>
    <input type="text" value="3.0" id = "calcVersion"></li>
</div>

<!-- Форма параметров заказа-->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/calculator/general/forms/orderForm.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<!-- Инструкции для пользователей -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/manual.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<!-- История версий -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/history.php",
        "EDIT_TEMPLATE" => ""
    )
);?>



<!-- визуализация -->
<div id="visualisation">
    <h2 class="raschet" onclick="recalculate();">Общий вид лестницы:</h2>
    <div id="Stats-output" style="display: none;"></div>

    <div id="WebGL-output"><canvas>Для отображения содержимого откройте страницу в Гугл Хром</canvas></div>
</div>

<p class="raschet" onclick="exportToDxf(dxfPrimitivesArr);">Экспорт контуров в dxf</p> 


<!-- Картинки, описание, комплектация -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/description.php",
        "EDIT_TEMPLATE" => ""
    )
);?>


<!-- О компании -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/about.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<div id="carcasForm">
<h2>Характеристики лестницы</h2>

<!-- форма параметров проемов каркаса-->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/forms/carcas_form.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<h3>Стоимость каркаса и ступеней: </h3>
    <div id="resultCarcas">
    <p>Расчет еще не произведен.</p>
</div>

</div>

<div id="perilaForm">
<!-- форма параметров ограждений-->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/forms/railing_form.php",
        "EDIT_TEMPLATE" => ""
    )
);?>


<div id="resultPerila">
    <h3>Стоимость ограждений:</h3>
    <p>Расчет еще не произведен.</p>
</div>


    <div id="marshRailingImages2D">
        <canvas id='section_1'>Откройте страницу в Google Chrome</canvas>
    </div>

</div>


<div id="banisterСonstructForm">
<h2>Конструкция балюстрады</h2>
<!-- форма параметров конструкции ограждения-->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/calculator/banister/forms/banister_construct_form.php",
        "EDIT_TEMPLATE" => ""
    )
); ?>


<div id="price_banister">
    <h3>Стоимость балюстрады:</h3>
    <p>Расчет еще не произведен.</p>
</div>

</div>




<!--форма доставка, сборка-->
<div id="assembling">
<h2>Доставка, сборка на объекте</h2>
    <?$APPLICATION->IncludeComponent(
        "bitrix:main.include",
        ".default",
        Array(
            "AREA_FILE_SHOW" => "file",
            "PATH" => "/calculator/general/forms/assemblingForm.php",
            "EDIT_TEMPLATE" => ""
        )
    ); ?>

</div>


<div id="price_assembling">
    <h3>Стоимость доставки и сборки:</h3>
    <p>Расчет еще не произведен.</p>
</div>

<div id="cost" style="display: none">
<h2 class="raschet" onclick='recalculate()' >Расчет себестоимости</h2>

<h4>Коэффициенты на цену</h4>
<table class="form_table" ><tbody>
<tr><th>Наименование</th><th>к-т на себестоимость</th><th>к-т на цену</th> </tr>
<tr>
    <td>Каркас:</td>
    <td><input id="carcasCostFactor" type="number" value="1"></td>
    <td><input id="carcasPriceFactor" type="number" value="1"></td>
</tr>
<tr>
    <td>Ступени:</td>
    <td><input id="treadsCostFactor" type="number" value="1"></td>
    <td><input id="treadsPriceFactor" type="number" value="1"></td>
<tr>
    <td>Перила:</td>
    <td><input id="railingCostFactor" type="number" value="1"></td>
    <td><input id="railingPriceFactor" type="number" value="1"></td>
</tr>
<tr>
    <td>Сборка:</td>
    <td><input id="assemblingCostFactor" type="number" value="1"></td>
    <td><input id="assemblingPriceFactor" type="number" value="1"></td>
</tr>
</tbody> </table>

<h3>Общая себестоимость</h3>
<div id="total_cost">
    <p>Расчет еще не произведен</p>
</div>

<h3>Себестоимость каркаса и ступеней</h3>
<div id="cost_carcas">
    <p>Расчет еще не произведен</p>
</div>

<h3>Себестоимость ограждений лестницы</h3>
<div id="cost_perila">
    <p>Расчет еще не произведен</p>
</div>

<h3>Себестоимость балюстрады</h3>
<div id="cost_banister">
    <p>Расчет еще не произведен</p>
</div>

<h3>Себестоимость доставки, сборки</h3>
<div id="cost_assembling">
    <p>Расчет еще не произведен</p>
</div>



</div>

<div id="result" style="display: none;"></div>

<div id="specificationList" style="display: none;">
<h2 class="raschet" onclick="calculation();">Спецификация</h2>
    <div id="metal_list"></div>

    <div id="timber_list"></div>

    <div id="store_list"></div>

    <div id="faq"></div>

</div>




<!-- правое меню -->

<div class="tabs">
    <ul>
        <li>Стены</li>
        <li>Выступы</li>
        <li>Проем</li>
        <li>Балюстрада</li>
    </ul>
    <div>

    <!-- Форма ввода параметров стен-->
        <div id="wallsFormDiv">

            <?$APPLICATION->IncludeComponent(
                "bitrix:main.include",
                ".default",
                Array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => "/calculator/walls/forms/walls_form.php",
                    "EDIT_TEMPLATE" => ""
                )
            );?>

        </div>

    <!--форма параметров выступов -->
        <div id="ledgeForm">

            <?$APPLICATION->IncludeComponent(
                "bitrix:main.include",
                ".default",
                Array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => "/calculator/walls/forms/ledges_form.php",
                    "EDIT_TEMPLATE" => ""
                )
            );?>

        </div>
    <!-- форма параметров проема -->
    <div id="topFloorForm">
            <?$APPLICATION->IncludeComponent(
                "bitrix:main.include",
                ".default",
                Array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => "/calculator/banister/forms/floor_form.php",
                    "EDIT_TEMPLATE" => ""
                )
            );?>
        </div>

    <!-- форма параметров балюстрады -->
    <div id="banisterForm">
            <?$APPLICATION->IncludeComponent(
                "bitrix:main.include",
                ".default",
                Array(
                    "AREA_FILE_SHOW" => "file",
                    "PATH" => "/calculator/banister/forms/banister_form.php",
                    "EDIT_TEMPLATE" => ""
                )
            );?>
        </div>

    </div>
</div>






<!--общие библитотеки-->
<script async="" type="text/javascript" src="/calculator/forms/FileSaver.min.js" /></script>

<!--графика-->
<script type="text/javascript" src="/calculator/general/viewports_2.0.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/three.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/stats.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/dat.gui.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/OrbitControls.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/ThreeBSP.js"></script>


<!--визуализация-->
<script type="text/javascript" src="drawStaircase.js"></script>
<script type="text/javascript" src="drawCarcasParts.js"></script>
<script type="text/javascript" src="drawCarcasPartsLib_2.0.js"></script>
<script type="text/javascript" src="drawRailing_2.0.js"></script>
<script type="text/javascript" src="drawRailingParts_2.0.js"></script>

<script type="text/javascript" src="drawStringerPartsLt.js"></script>
<script type="text/javascript" src="drawStringerPartsKo.js"></script>

<script type="text/javascript" src="/calculator/general/drawPrimitives.js"></script>
<!-- <script type="text/javascript" src="/calculator/general/drawRailingParts.js"></script> -->
<!--<script type="text/javascript" src="/calculator/general/drawCarcasPartsLib.js"></script> -->
<script type="text/javascript" src="/calculator/banister/drawBanister.js"></script>
<script type="text/javascript" src="/calculator/banister/drawBanisterSection.js"></script>

<!--экспорт в dxf-->
<script type="text/javascript" src="/calculator/general/dxfFileMaker.js"></script>

<!--обмен данными с базой и через файлы-->
<script type="text/javascript" src="/calculator/general/dataExchangeXml_3.0.js"></script>

<!-- правое меню-->
<script type="text/javascript" src="/calculator/general/right_menu/lighttabs.js"></script>
<link rel="stylesheet" href="/calculator/general/right_menu/lighttabs.css">

<!--изменение оффера
<script type="text/javascript" src="change_offer.js"></script>
-->

<!--расчет цены
<script type="text/javascript" src="priceCalc.js"></script>
<script type="text/javascript" src="/calculator/general/priceLib.js"></script>
<script type="text/javascript" src="/calculator/banister/priceCalcBanister.js"></script>
-->
<!--оболочки-->
<script type="text/javascript" src="personalScripts.js"></script>
<script type="text/javascript" src="/dev/allUsers/metal/main.js"></script>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
