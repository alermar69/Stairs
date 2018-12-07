$(function(){
    //селекторы блоков с таблицами
    downloadXls = function(selectors, url, full){
	var struct = {};
	struct['order'] = $('#orderName').val();
	struct['manager'] = $('#managerName').val();
	tables = []; 
	
	$.each(selectors, function(index, selector){
	    var $rows = $(selector+' table tbody tr');
	    var title = $(selector+ ' h3:first').text();
	    var data = {};
	    data['title'] = title;
	    data['rows'] = [];
	    $rows.each(function(j, row){
	    	var $ceils = $(row).find('td');
		
		data['rows'].push([ $($ceils[0]).text(), $($ceils[1]).text(), $($ceils[2]).text(), $($ceils[3]).text() ] );
	    });
	    tables.push(data);
	});
	struct['tables'] = JSON.stringify(tables);
	var inputs = '';
	inputs+='<input type="hidden" name="order" value="'+ $('#orderName').val() +'" />';
	inputs+='<input type="hidden" name="manager" value="'+ $('#managerName').val() +'" />';
	inputs+='<input type="hidden" name="tables" value=\''+ JSON.stringify(tables) +'\' />';
	if(full)
		inputs+='<input type="hidden" name="type" value="full" />';
	$('<form action="'+url+'" method="POST">'+
                    inputs+'</form>').appendTo('body').submit().remove();
    };
    
});