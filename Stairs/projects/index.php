<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("������ ������� �� � �� v.3.0");
?>

<h1 id = "mainTitle">������ ������� �� � ��</h1>


<!--��������� ����-->

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

<!-- ����� ���������� ������-->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/calculator/general/forms/orderForm.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<!-- ���������� ��� ������������� -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/manual.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<!-- ������� ������ -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/history.php",
        "EDIT_TEMPLATE" => ""
    )
);?>



<!-- ������������ -->
<div id="visualisation">
    <h2 class="raschet" onclick="recalculate();">����� ��� ��������:</h2>
    <div id="Stats-output" style="display: none;"></div>

    <div id="WebGL-output"><canvas>��� ����������� ����������� �������� �������� � ���� ����</canvas></div>
</div>

<p class="raschet" onclick="exportToDxf(dxfPrimitivesArr);">������� �������� � dxf</p> 


<!-- ��������, ��������, ������������ -->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/content/description.php",
        "EDIT_TEMPLATE" => ""
    )
);?>


<!-- � �������� -->
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
<h2>�������������� ��������</h2>

<!-- ����� ���������� ������� �������-->
<?$APPLICATION->IncludeComponent(
    "bitrix:main.include",
    ".default",
    Array(
        "AREA_FILE_SHOW" => "file",
        "PATH" => "/manufacturing/metal/forms/carcas_form.php",
        "EDIT_TEMPLATE" => ""
    )
);?>

<h3>��������� ������� � ��������: </h3>
    <div id="resultCarcas">
    <p>������ ��� �� ����������.</p>
</div>

</div>

<div id="perilaForm">
<!-- ����� ���������� ����������-->
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
    <h3>��������� ����������:</h3>
    <p>������ ��� �� ����������.</p>
</div>


    <div id="marshRailingImages2D">
        <canvas id='section_1'>�������� �������� � Google Chrome</canvas>
    </div>

</div>


<div id="banister�onstructForm">
<h2>����������� ����������</h2>
<!-- ����� ���������� ����������� ����������-->
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
    <h3>��������� ����������:</h3>
    <p>������ ��� �� ����������.</p>
</div>

</div>




<!--����� ��������, ������-->
<div id="assembling">
<h2>��������, ������ �� �������</h2>
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
    <h3>��������� �������� � ������:</h3>
    <p>������ ��� �� ����������.</p>
</div>

<div id="cost" style="display: none">
<h2 class="raschet" onclick='recalculate()' >������ �������������</h2>

<h4>������������ �� ����</h4>
<table class="form_table" ><tbody>
<tr><th>������������</th><th>�-� �� �������������</th><th>�-� �� ����</th> </tr>
<tr>
    <td>������:</td>
    <td><input id="carcasCostFactor" type="number" value="1"></td>
    <td><input id="carcasPriceFactor" type="number" value="1"></td>
</tr>
<tr>
    <td>�������:</td>
    <td><input id="treadsCostFactor" type="number" value="1"></td>
    <td><input id="treadsPriceFactor" type="number" value="1"></td>
<tr>
    <td>������:</td>
    <td><input id="railingCostFactor" type="number" value="1"></td>
    <td><input id="railingPriceFactor" type="number" value="1"></td>
</tr>
<tr>
    <td>������:</td>
    <td><input id="assemblingCostFactor" type="number" value="1"></td>
    <td><input id="assemblingPriceFactor" type="number" value="1"></td>
</tr>
</tbody> </table>

<h3>����� �������������</h3>
<div id="total_cost">
    <p>������ ��� �� ����������</p>
</div>

<h3>������������� ������� � ��������</h3>
<div id="cost_carcas">
    <p>������ ��� �� ����������</p>
</div>

<h3>������������� ���������� ��������</h3>
<div id="cost_perila">
    <p>������ ��� �� ����������</p>
</div>

<h3>������������� ����������</h3>
<div id="cost_banister">
    <p>������ ��� �� ����������</p>
</div>

<h3>������������� ��������, ������</h3>
<div id="cost_assembling">
    <p>������ ��� �� ����������</p>
</div>



</div>

<div id="result" style="display: none;"></div>

<div id="specificationList" style="display: none;">
<h2 class="raschet" onclick="calculation();">������������</h2>
    <div id="metal_list"></div>

    <div id="timber_list"></div>

    <div id="store_list"></div>

    <div id="faq"></div>

</div>




<!-- ������ ���� -->

<div class="tabs">
    <ul>
        <li>�����</li>
        <li>�������</li>
        <li>�����</li>
        <li>����������</li>
    </ul>
    <div>

    <!-- ����� ����� ���������� ����-->
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

    <!--����� ���������� �������� -->
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
    <!-- ����� ���������� ������ -->
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

    <!-- ����� ���������� ���������� -->
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






<!--����� �����������-->
<script async="" src="/calculator/forms/FileSaver.min.js" /></script>

<!--�������-->
<script type="text/javascript" src="/calculator/general/viewports_2.0.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/three.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/stats.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/dat.gui.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/OrbitControls.js"></script>
<script type="text/javascript" src="/calculator/general/three_libs/ThreeBSP.js"></script>


<!--������������-->
<script type="text/javascript" src="drawStaircase.js"></script>
<script type="text/javascript" src="drawCarcasParts.js"></script>
<script type="text/javascript" src="drawRailing.js"></script>

<script type="text/javascript" src="drawStringerPartsLt.js"></script>
<script type="text/javascript" src="drawStringerPartsKo.js"></script>

<script type="text/javascript" src="/calculator/general/drawPrimitives.js"></script>
<script type="text/javascript" src="/calculator/general/drawRailingParts.js"></script>
<script type="text/javascript" src="/calculator/general/drawCarcasPartsLib.js"></script>
<script type="text/javascript" src="/calculator/banister/drawBanister.js"></script>
<script type="text/javascript" src="/calculator/banister/drawBanisterSection.js"></script>

<!--������� � dxf-->
<script type="text/javascript" src="/calculator/general/dxfFileMaker.js"></script>

<!--����� ������� � ����� � ����� �����-->
<script type="text/javascript" src="/calculator/general/dataExchangeXml_3.0.js"></script>

<!-- ������ ����-->
<script src="/calculator/general/right_menu/lighttabs.js"></script>
<link rel="stylesheet" href="/calculator/general/right_menu/lighttabs.css">

<!--��������� ������
<script type="text/javascript" src="change_offer.js"></script>
-->

<!--������ ����
<script type="text/javascript" src="priceCalc.js"></script>
<script type="text/javascript" src="/calculator/general/priceLib.js"></script>
<script type="text/javascript" src="/calculator/banister/priceCalcBanister.js"></script>
-->
<!--��������-->
<script type="text/javascript" src="personalScripts.js"></script>
<script type="text/javascript" src="/dev/allUsers/metal/main.js"></script>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
