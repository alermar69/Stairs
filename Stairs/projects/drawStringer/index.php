<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("������ 3D ������������� v.1.6"); 
?> 

<h1 id = "mainTitle">��������� �����/�������� (����)</h1>


<h2>���������</h3>
<table class="form_table"><tbody>

<tr><td>model</td> <td> 
	<select id="model" size="1">
		<option value="��">��</option>
		<option value="��">��</option>
		<option value="���">���</option>
	</select>
</td></tr>

<tr>
	<td>stringerSide:</td> 
	<td><select id="stringerSide" size="1">
			<option value="out">out</option>
			<option value="in">in</option>
		</select></td>
</tr>
<tr>
	<td>botEnd:</td> 
	<td><select id="botEnd" size="1">
			<option value="floor">floor</option>
			<option value="platformG">platformG</option>
			<option value="platformP">platformP</option>
			<option value="winder">winder</option>
		</select></td>
</tr>

<tr>
	<td>topEnd:</td> 
	<td><select id="topEnd" size="1">
			<option value="floor">floor</option>
			<option value="platformG">platformG</option>
			<option value="platformP">platformP</option>
			<option value="winder">winder</option>
		</select></td>
</tr>

<tr><td>botEndLength:</td>
	<td><input id="botEndLength" type="number" value="900"></td>
</tr>

<tr><td>topEndLength:</td>
	<td><input id="topEndLength" type="number" value="900"></td>
</tr>

<tr><td>stringerType:</td> <td> 
	<select id="stringerType" size="1" onchange="">
		<option value="������������" selected >������������</option>
		<option value="�������">�������</option>
		<option value="������">������</option>
	</select>
</td></tr>

<tr><td>stairFrame:</td> <td> 
	<select id="stairFrame" size="1">
		<option value="���">���</option>
		<option value="����">����</option>
	</select>
</td></tr>
<tr>

<tr>
	<td>treadThickness</td>
	<td><input id="treadThickness" type="number" value="40"></td>
</tr>

<td>��� ��������� �������� botFloorType</td> 
	<td> 
	<select id="botFloorType" size="1" onchange="">
		<option value="��������">�� �������� ���</option>
		<option value="��������">�� �������� ���</option>		
	</select>
	</td>
</tr>

<tr>
	<td>������� ����� ��������� � ��������� ����� botFloorsDist</td>
	<td><input id="botFloorsDist" type="number" value="25"></td>
</tr>

<tr id="platformTop_tr_14"><td>��� ��������� � �������� ���������� topAnglePosition:</td> <td> 
	<select id="topAnglePosition" size="1" onchange="">
		<option value="��� ��������">������ ��� ��������</option>
		<option value="��� ��������">������ ��� ��������</option>
		<option value="����� ������� �������">����� ����� ������� �������</option>
		<option value="������������ �����">������������ �����</option>
	</select>
</td></tr>

<tr id="platformTop_tr_4">
	<td>������ ��������� � �������� ���������� topFlan:</td> <td> 
	<select id="topFlan" size="1" onchange="">
		<option selected value="���">���</option>
		<option value="����">����</option>		
	</select>
</td></tr>

<tr>
	<td>��� ��������� � ������� ���������� bottomAngleType:</td> <td> 
	<select id="bottomAngleType" size="1" onchange="">
		<option value="������">������</option>
		<option value="������������ �����">������������ �����</option>
	</select>
</td></tr>

<tr><td>h:</td>
	<td><input id="h" type="number" value="180"></td>
</tr>
<tr id=""><td>b:</td>
	<td><input id="b" type="number" value="260"></td>
</tr>
<tr id=""><td>a:</td>
	<td><input id="a" type="number" value="300"></td>
</tr>
<tr id=""><td>stairAmt:</td>
	<td><input id="stairAmt" type="number" value="7"></td>
</tr>
</tbody>
</table>


<!-- ������������ -->
<div id="visualisation">
	<h2 class="raschet" onclick="recalculate();">��������� ����������:</h2>
	<div id="Stats-output" style="display: none;"></div>

	<div id="WebGL-output"><canvas>��� ����������� ����������� �������� �������� � ���� ����</canvas></div> 
</div>

<p class="raschet" onclick="exportToDxf(dxfPrimitivesArr);">������� �������� � dxf</p> 


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
<script type="text/javascript" src="drawStringerDemo.js"></script>
<script type="text/javascript" src="drawStringerPartsLt.js"></script>
<script type="text/javascript" src="drawStringerPartsKo.js"></script>
<script type="text/javascript" src="/calculator/general/drawPrimitives.js"></script>


<!--������� � dxf-->
<script type="text/javascript" src="/calculator/general/dxfFileMaker.js"></script>

<!--��������-->
<script type="text/javascript" src="personalScripts.js"></script>
<script type="text/javascript" src="main.js"></script>



<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
