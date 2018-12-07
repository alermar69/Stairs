$(function(){

	//проверить текущую
	$("#test_this").click(function() {
		testingMode = true;
		var testType = getTestType();
		if(testType == "intercections") queueConfigurationTest(function(){
			//отключаем режим тестирования
			hidenLayers = []; //очищаем массив чтобы можно было посмотреть все слои
			testingMode = false;					
			});
		if(testType == "compare") compareLayers(function(){});
	});
	
	//загрузка синтетической конфигурации при клике по номеру конфигурации в отчете о тестировании
	$("#testResults").delegate('.configId', 'click', function(){
		var configId = $(this).text();
		setConfig(configId);
		}
	);
	
	//применить конфигурацию
	$("#setConfig").click(function() {
		var configId =  $("#configId").val();
		setConfig(configId)
	});
	
	//следующая конфигурация
	$("#nextConfig").click(function(){
		setNextConfig();
	});
	
	//предыдущая конфигурация
	$("#prevConfig").click(function(){
		setPrevConfig();	
	});
	
	//Загрузка данных кп для режима последние
	$("#loadLastOffers").click(function(){
		loadLastOffers(function(){
			//записываем конфигурации
			configurator.resetCounter();
			configurator.configs = [];
			$.each(offers, function(){
				var config = JSON.parse(this.orderdata);
				configurator.configs.push(config);					
				});
			console.log(configurator.configs)
			$("#configAmt").val(configurator.configs.length);
			});
		
	});
	
	//тест группы конфигураций	
	$("#test_set").click(function() {
		
		var generatorMode = $("#configGeneratorMode").val();
		if(generatorMode == "синтетические"){
			testConfigs_synth();
			}
		if(generatorMode == "сохраненные"){
			testConfigs_saved();
			}
		if(generatorMode == "последние"){			
			
			loadLastOffers(function(){
				//записываем конфигурации
				configurator.configs = [];
				$.each(offers, function(){
					var config = JSON.parse(this.orderdata);
					removeTestingParams(config); //удалем параметры инпутов тестирования
					configurator.configs.push(config);					
					});
				testConfigs_synth();
				});
			}
	});
	
	//стоп
	$("#stopTesting").click(function() {
		stopTesting = true; //глобальная переменная
		console.log(stopTesting)
		});

});

function removeTestingParams(config){
	$("#testingInputs").find("input,select,textarea").each(function(){
		delete config[this.id];
		})
}


