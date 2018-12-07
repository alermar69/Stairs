$(function(){
    changeFormBanister = function(){
        removeBanister();
        var amt = $('#banisterSectionAmt').val();
        for(var i = 0; i < amt; i++)
            appendBanister(i);
    };
    removeBanister = function(){
        var inputs = $('table tr').filter(function(){
            return $(this).find('[id^=banisterSection]').length > 0;
        });
        $.each(inputs, function(i,v){
            $(v).remove();
        });
    };
    appendBanister = function (number) {
        var el = $('#banisterSectionType' + number);
        if (el.length > 0)
            return;
        $('<tr>' +
            '<td>' +
            '<select id="banisterSectionType'+number+'" size="1" onchange="">' +
            '<option value="секция">секция</option>' +
            '<option value="пропуск">пропуск</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select id="banisterSectionDirection'+number+'" size="1" onchange="">' +
            '<option value="вперед">вперед</option>' +
            '<option value="назад" selected>назад</option>' +
            '<option value="вправо" >вправо</option>' +
            '<option value="влево">влево</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="number" id="banisterSectionLength'+number+'" value="1000"/></td>' +
            '<td>' +
            '<select id="banisterSectionConnection'+number+'" size="1" onchange="">' +
            '<option value="начало">начало</option>' +
            '<option value="конец">конец</option>' +
            '<option value="две стороны">две стороны</option>' +
            '<option value="нет" selected >нет</option>' +
            '</select>' +
            '</td>' +
            '<td><button class="delete" data-name="banisterForm" data-countid="banisterSectionAmt">Удалить</button></td>' +
            '</tr>').clone().appendTo($('#banisterForm tbody'));
        reindexId('banisterForm', 'banisterSectionAmt');
    };

    changeFormTopFloor = function(){
        removeTopFloor();
        var amt = $('#topFloorAmt').val();
        for(var i = 0; i < amt; i++)
            appendTopFloor(i);
    };
    removeTopFloor = function(){
        var inputs = $('table tr').filter(function(){
            return $(this).find('[id^=floorHoleLedge]').length > 0;
        });
        $.each(inputs, function(i,v){
            $(v).remove();
        });
    };
    appendTopFloor = function (number) {
        var el = $('#floorHoleLedgeBaseEdge' + number);
        if (el.length > 0)
            return;
        $('<tr>' +
            '<td>' +
            '<select id="floorHoleLedgeBaseEdge'+number+'" size="1" onchange="">' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4" selected="">4</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="number" id="floorHoleLedgeLength'+number+'" value="1000"></td>' +
            '<td><input type="number" id="floorHoleLedgeWidth'+number+'" value="1000"></td>' +
            '<td><input type="number" id="floorHoleLedgePosition'+number+'" value="0"></td>' +
            '<td><button class="delete" data-name="topFloorForm" data-countid="topFloorAmt">Удалить</button></td>' +
            '</tr>').clone().appendTo($('#topFloorForm tbody'));
        reindexId('topFloorForm', 'topFloorAmt');
    };


    reindexId = function(id, countId){
        var group = $('#'+id+' tbody tr'), amt = 0;
        //перебираем все строки таблицы
        $.each(group, function(i, val){
            var self = i, input = $(val).find('td input,select,textarea');
            //перебираем элементы в строке
            $.each(input, function(i, val){
                var id = val.id.match(/^([^0-9]+)[0-9]+$/)[1];
                val.id = id+(self-1);
            });
            amt = i;
        });
        $('#'+countId).val(amt);
        $.each($viewportsContainsBanister, function(i, v){
            drawBanister();
        });
        $.each($viewportsContainsTopFloor, function(i, v){
            drawTopFloor();
        });
    };

    addButtonDelete = function(id, countid){
        $('#'+id+' tr').each(function(i, v){
            var el = $(v);
            if(el.find('th').length == 0)
                el.append('<td><button class="delete" data-name="'+id+'" data-countid="'+countid+'">Удалить</button></td>');
            else el.append('<th>#</th>');
        });
    }
    //добавим кнопку удаления

    addButtonDelete('topFloorForm', 'topFloorAmt');
    addButtonDelete('banisterForm', 'banisterSectionAmt');

    $(".delete").live('click', function(e){
        $(this).parents('tr').remove();
        reindexId($(this).data('name'), $(this).data('countid'));
    });
	$('.form_table').delegate('input,select,textarea', 'click', function(){
	   	drawTopFloor();
        	drawBanister();
		return true;
	s});
   //добавим кнопку добавления выступа
    $button = $('<button>Добавить перила</button>').click(function(){
        $('<tr>' +
            '<td>' +
            '<select id="banisterSectionType0" size="1" onchange="">' +
            '<option value="секция">секция</option>' +
            '<option value="пропуск">пропуск</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select id="banisterSectionDirection0" size="1" onchange="">' +
            '<option value="вперед">вперед</option>' +
            '<option value="назад" selected>назад</option>' +
            '<option value="вправо" >вправо</option>' +
            '<option value="влево">влево</option>' +
            '</select>' +
            '</td>' +
            '<td><input type="number" id="banisterSectionLength0" value="1000"/></td>' +
            '<td>' +
            '<select id="banisterSectionConnection0" size="1" onchange="">' +
            '<option value="начало">начало</option>' +
            '<option value="конец">конец</option>' +
            '<option value="две стороны">две стороны</option>' +
        '<option value="нет" selected >нет</option>' +
        '</select>' +
        '</td>' +
        '<td><button class="delete" data-name="banisterForm" data-countid="banisterSectionAmt">Удалить</button></td>' +
        '</tr>').clone().appendTo($('#banisterForm tbody') );
        //переиндексируем Id
        reindexId('banisterForm', 'banisterSectionAmt');
    });
    $('#banisterForm table').before($button);

    $buttonTopFloor = $('<button>Добавить выступы</button>').click(function(){
        $('<tr>' +
        '<td>' +
        '<select id="floorHoleLedgeBaseEdge0" size="1" onchange="">' +
        '<option value="1">1</option>' +
        '<option value="2">2</option>' +
        '<option value="3">3</option>' +
        '<option value="4" selected="">4</option>' +
        '</select>' +
        '</td>' +
        '<td><input type="number" id="floorHoleLedgeLength0" value="1000"></td>' +
        '<td><input type="number" id="floorHoleLedgeWidth0" value="1000"></td>' +
        '<td><input type="number" id="floorHoleLedgePosition0" value="0"></td>' +
        '<td><button class="delete" data-name="topFloorForm" data-countid="topFloorAmt">Удалить</button></td>' +
        '</tr>').clone().appendTo($('#topFloorForm tbody') );
        //переиндексируем Id
        reindexId('topFloorForm', 'topFloorAmt');
    });
    $('#topFloorForm table').before($buttonTopFloor);
    //$('.tabs #topFloorForm').delegate('input,select,textarea', 'click', drawTopFloor);
    //$('#topFloorForm,#banisterForm').delegate('input,select,textarea', 'click', drawBanister);
});