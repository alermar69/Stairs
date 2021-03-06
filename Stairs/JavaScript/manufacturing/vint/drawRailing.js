function drawSpiralRailing(par) {

	var stepHeight = par.stepHeight;
	var banistrPositionAngle0 = 0;
	var rad = par.rad;
	var turnFactor = par.turnFactor;
	var stepHeight = par.stepHeight;
	var stairAmt = par.stairAmt;
	var banisterPerStep = par.banisterPerStep;
	var treadExtraAngle = par.treadExtraAngle;
	var regShimThk = 4

	var railingSection = new THREE.Object3D();
	var handrail = new THREE.Object3D();
	var rigels = new THREE.Object3D();

	var railingHeight = 900; //номинальная высота ограждения в начале ступени
	var glassMaterial = new THREE.MeshLambertMaterial({
		opacity: 0.6,
		color: 0x3AE2CE,
		transparent: true
	});
	glassMaterial.side = THREE.DoubleSide;

	//переводим углы в радианы
	var stepAngle = params.stepAngle / 180 * Math.PI;
	var platformAngle = platformAngle / 180 * Math.PI;

	if (params.railingModel == "Частые стойки") {
		var railingLift = 0;

		/*Параметры стоек*/
		var banisterProfileSize = 20;
		var banisterBottomOverhang = 36; //выступ балясини ниже нижней поверхности ступени
		var botLedge = banisterBottomOverhang + params.treadThickness; //выступ балясины ниже верхней поверхности ступени
		/*
			if(par.base == "stringer") {
				//banisterBottomOverhang -= 50;
				//botLedge -= 100;
				}
		*/

		var railingHeight = 900; //номинальная высота ограждения в начале ступени
		var banisterHoleDist = []; //расстояние между отверстиями для уголков на балясинах

		//стартовая балясина
		var startBanisterLength = railingHeight + stepHeight;
		banisterHoleDist[0] = stairParams.stepHeight - params.treadThickness - 31 + 2;

		if (botFloorType == "черновой") {
			startBanisterLength += params.botFloorsDist;
			banisterHoleDist[0] += params.botFloorsDist;
		}
		stairParams.startBanisterLength = startBanisterLength;

		var banisterPositionRad = params.staircaseDiam / 2 + 0.1;

		//длинные балясины
		var longBanisterLength = railingHeight + stepHeight + botLedge;
		stairParams.longBanisterLength = longBanisterLength;
		banisterHoleDist[1] = stairParams.stepHeight + 2;

		//	var banistrPositionAngle0 = par.treadExtraAngle - par.treadOverlayArcAngle/2 - par.startAngle;
		//	if(turnFactor == -1) banistrPositionAngle0 = banistrPositionAngle0 - stepAngle;


		var dxfBasePoint = {
			x: 0,
			y: 1000
		}
		var balParams = {
			balMaterial: params.materials.metal,
			angMaterial: params.materials.metal2,
			dxfArr: dxfPrimitivesArr,
			dxfBasePoint: dxfBasePoint,
			size: banisterProfileSize,
			length: startBanisterLength,
			holeDst: 100,
			topHole: "yes",
			type: "first",
			angleShift: 0,
			text: "Первая балясина"
		}
		
		if (params.botFloorType == 'черновой') balParams.length += params.botFloorsDist;

		//сохраняем размеры для спецификации
		stairParams.banisterHoleDist = banisterHoleDist;

		/*Длинные стойки ограждений*/

		addVintLongBanisters();

		function addVintLongBanisters() {


			var banistrPositionAngle;


			//первая балясина
			balParams.holeDst = banisterHoleDist[0];
			if (params.botFloorType == 'черновой') balParams.holeDst += params.botFloorsDist;
			balParams.angleShift = 2;
			if (regShimAmt > 0) balParams.angleShift = 2;
			if (par.stairType == "metal") balParams.angleShift = -2;
			balParams = drawBal(balParams);

			var startBanister = balParams.mesh;
			banistrPositionAngle = banistrPositionAngle0;
			startBanister.rotation.y = -banistrPositionAngle - Math.PI / 2;
			startBanister.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
			startBanister.position.y = 0;
			if (params.botFloorType == "черновой") startBanister.position.y = -params.botFloorsDist;
			startBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
			startBanister.castShadow = true;
			//railing.push(startBanister);
			railingSection.add(startBanister);

			//остальные балясины
			balParams.length = longBanisterLength;
			balParams.holeDst = banisterHoleDist[1];
			balParams.type = "longBal";
			balParams.text = "Длинные балясины";
			balParams.dxfBasePoint = {
				x: 750,
				y: 1000
			}

			posY = stepHeight - params.treadThickness - banisterBottomOverhang;
			for (var i = 1; i < stairAmt + 1; i++) {
				var shimDelta = 0;
				//учитываем регулировочную шайбу
				balParams.angleShift = -2;
				if (i <= params.regShimAmt) {
					//if (par.stairType != "metal") posY += regShimThk;
					posY += regShimThk;
					if (i != params.regShimAmt) balParams.angleShift = 2;
					if (par.stairType == 'metal') {
						shimDelta = -regShimThk;
						if (i == params.regShimAmt) {
							balParams.angleShift = 2;
						}
					};
				}

				balParams = drawBal(balParams);
				var longBanister = balParams.mesh;
				//banistrPositionAngle = (-stepAngle * i * turnFactor + banistrPositionAngle0);
				banistrPositionAngle = (-stepAngle * i * turnFactor + banistrPositionAngle0);
				longBanister.rotation.y = -banistrPositionAngle - Math.PI / 2;
				longBanister.position.x = (banisterPositionRad) * Math.cos(banistrPositionAngle);
				longBanister.position.y = posY + shimDelta - 0.1;
				longBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
				longBanister.castShadow = true;
				//railing.push(longBanister);
				railingSection.add(longBanister);
				balParams.dxfArr = []; //выводим в dxf только одну балясину	
				posY += stepHeight;
			}


		}


		/*короткие стойки ограждений*/

		if (banisterPerStep > 1) addVintShortBanisters();

		function addVintShortBanisters() {

			var shortBanisterPerStep = banisterPerStep - 1;
			var banisterExtraLength = stepHeight / banisterPerStep;
			balParams.dxfBasePoint = {
				x: 1300,
				y: 1000
			}
			balParams.text = "Промежуточные балясины";
			stairParams.shortBanisterLength = [];

			//добавляем балясины
			for (var j = 0; j < shortBanisterPerStep; j++) {
				var shortBanisterLength = longBanisterLength - stepHeight + banisterExtraLength * (j + 1);
				if (turnFactor == -1)
					shortBanisterLength = longBanisterLength - stepHeight + banisterExtraLength * (shortBanisterPerStep - j);
				if (par.base == "stringer") shortBanisterLength = longBanisterLength;
				var geom = new THREE.BoxGeometry(banisterProfileSize, shortBanisterLength, banisterProfileSize);
				//var banistrPositionAngle1 = par.treadExtraAngle - par.treadOverlayArcAngle/2 - stepAngle/banisterPerStep * (j + 1) - par.startAngle;
				//banistrPositionAngle1  = banistrPositionAngle1 * turnFactor;
				//var banisterPositionRad = params.staircaseDiam/2 //+ banisterProfileSize/2;
				var banistrPositionAngle1 = -stepAngle / banisterPerStep * (j + 1) * turnFactor

				balParams.length = shortBanisterLength;
				balParams.type = "middle";
				if (par.base == "stringer") balParams.type = "longBal";
				if (par.base == "stringer") balParams.base = "stringer";
				balParams.dxfArr = dxfPrimitivesArr; //выводим каждую промежуточную балясину по одному разу
				balParams.dxfBasePoint.x += 200;

				posY = stepHeight - params.treadThickness - banisterBottomOverhang;
				if (par.base == "stringer") posY -= stepHeight / (shortBanisterPerStep + 1) * (j + 1);
				if (par.base == "stringer") balParams.holeOffset = stepHeight / (shortBanisterPerStep + 1) * (j + 1);
				for (var i = 0; i < stairAmt; i++) {
					var shimDelta = 0;
					//учитываем регулировочную шайбу
					balParams.angleShift = -2;
					if (i < params.regShimAmt) {
						//if (par.stairType != "metal") posY += regShimThk;
						posY += regShimThk;
						if (i != params.regShimAmt) balParams.angleShift = 2;
						if (par.stairType == 'metal') shimDelta = -regShimThk;
					}

					balParams = drawBal(balParams);
					var middleBanister = balParams.mesh;
					var banistrPositionAngle = -stepAngle * i * turnFactor + banistrPositionAngle1;
					middleBanister.rotation.y = -banistrPositionAngle - Math.PI / 2;
					middleBanister.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
					middleBanister.position.y = posY + shimDelta - 0.1;
					middleBanister.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
					middleBanister.castShadow = true;
					//railing.push(middleBanister);
					railingSection.add(middleBanister);
					balParams.dxfArr = []; //выводим только первую балясину
					balParams.text = "";
					posY += stepHeight;
				}
				//сохраняем размер для спецификации
				stairParams.shortBanisterLength.push(shortBanisterLength);
			}
		}

	} //конец частых стоек


	/*стойки для ограждений с ригелями или стеклом на стойках*/

	if (par.model == "Ригели" || par.model == "Стекло на стойках") {

		//считаем длину ограждения
		par.railingLength = Math.sqrt((stepAngle * rad) * (stepAngle * rad) + stepHeight * stepHeight) * stairAmt;
		var rackAmt = Math.ceil(par.railingLength / 900) + 1;
		var topRackOffset = 0.3;
		var rackAngleDist = stepAngle * (stairAmt - topRackOffset) / (rackAmt - 1);
		var rackDistY = stepHeight * (stairAmt - topRackOffset) / (rackAmt - 1);
		var banisterProfileSize = 40;
		var longBanisterLength = railingHeight + 150;
		//var banisterPositionRad = rad + banisterProfileSize / 2 + 2;
		//      if (par.side == "in") banisterPositionRad = rad - banisterProfileSize / 2 - 2;

		var banisterPositionRad = params.staircaseDiam / 2 + 0.1;

		var dxfBasePoint = { x: 0, y: 1000 }

		var rackParams = {
			len: longBanisterLength,
			railingSide: "",
			showPins: true,
			showHoles: true,
			isBotFlan: false,
			material: params.materials.metal_railing,
			dxfBasePoint: dxfBasePoint,
			dxfArr: dxfPrimitivesArr,
			realHolder: true, //точно отрисовываем кронштейн поручня
			//holderAng: stairParams.stairCaseAngle,
			holderAng: (stairAmt + 1.5) * stepAngle,
			sectText: '',
			marshId: 1,
			key: "out",
		}
		var modelTemp = params.model;
		params.model = 'лт';
		for (var i = 0; i < rackAmt; i++) {
			if (i == 0) rackParams.len = longBanisterLength - 40;
			if (i != 0) rackParams.len = longBanisterLength;

			rackParams = drawRack3d_4(rackParams);

			var rack = rackParams.mesh;
			banistrPositionAngle = -rackAngleDist * i * turnFactor;
			rack.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
			rack.position.y = rackDistY * i + 50;
			if (i == 0) rack.position.y += 40;
			rack.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
			rack.rotation.y = Math.PI / 2 - banistrPositionAngle;
			rack.castShadow = true;
			railingSection.add(rack);
		}
		params.model = modelTemp;


		//уголки для крепления ступеней
		if (true) {
			var angleGap = 0.1; //зазор чтобы проходили тесты
			var angleParams = {
				material: params.materials.metal2,
				dxfArr: [],
			}

			var banisterBottomOverhang = 36; //выступ балясини ниже нижней поверхности ступени

			var banisterPositionRad = params.staircaseDiam / 2 + 0.1;
			var banistrPositionAngle;

			posY = stepHeight - params.treadThickness - banisterBottomOverhang;

			for (var i = 0; i < stairAmt; i++) {
				var shimDelta = 0;
				//учитываем регулировочную шайбу
				if (i <= params.regShimAmt) {
					posY += regShimThk;
					if (par.stairType == 'metal') shimDelta = -regShimThk;
				}

				angleParams = drawBanisterAngle(angleParams);
				var angle = angleParams.mesh;

				banistrPositionAngle = (-stepAngle * i * turnFactor);
				angle.rotation.y = -banistrPositionAngle - Math.PI / 2;
				angle.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
				angle.position.y = posY + shimDelta - 0.1 + 20 - angleParams.holeOffset;
				angle.position.z = banisterPositionRad * Math.sin(banistrPositionAngle) + 0.1;
				angle.castShadow = true;
				railingSection.add(angle);
				//--------------------------------------------

				angleParams = drawBanisterAngle(angleParams);
				var angle = angleParams.mesh;
				banistrPositionAngle = (-stepAngle * (i + 1) * turnFactor + banistrPositionAngle0);
				angle.rotation.y = -banistrPositionAngle - Math.PI / 2;
				angle.position.x = (banisterPositionRad) * Math.cos(banistrPositionAngle);
				angle.position.y = posY + shimDelta - 0.1 + 20 - angleParams.holeOffset;
				angle.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
				angle.castShadow = true;
				railingSection.add(angle);

				//-----------------------------------


				angleParams = drawBanisterAngle(angleParams);
				var angle = angleParams.mesh;
				var banistrPositionAngle = -stepAngle * i * turnFactor - stepAngle / 2 * turnFactor;
				angle.rotation.y = -banistrPositionAngle - Math.PI / 2;
				angle.position.x = banisterPositionRad * Math.cos(banistrPositionAngle);
				angle.position.y = posY + shimDelta - 0.1 + 20 - angleParams.holeOffset;
				angle.position.z = banisterPositionRad * Math.sin(banistrPositionAngle);
				angle.castShadow = true;
				railingSection.add(angle);

				posY += stepHeight;
			}

		} //конец частых стоек
	}

	/*ригели*/
	if (par.model == "Ригели") {
		var rigelRad = 6;

		var rigelParams = {
			poleType: "round",
			poleSize: rigelRad * 2,
			poleRad: rad - rigelRad,
			posY: 0,
			model: par.model,
			material: params.materials.metal,
			startOffset: 0.1,
			endOffset: -0.3,
			partName: "spiralRigel",
			material: params.materials.inox,
		}
		if (par.side == "in") {
			rigelParams.poleRad = rad + rigelRad;
			rigelParams.endOffset = -0.1;
		}
		for (var i = 0; i < params.rigelAmt * 1.0; i++) {
			rigelParams.posY = (longBanisterLength - 200) * (i + 1) / (params.rigelAmt * 1.0 + 1) + 150;
			rigels.add(drawVinPole(rigelParams));
		}
	}

	//стекло на стойках

	if (par.model == "Стекло на стойках") {
		var glassHeight = 650;
		var stringerExtraStep = 0.5;
		var glassOffset = 40;
		var angleGlassOffset = glassOffset / banisterPositionRad;
		var glassAngle = rackAngleDist - 2 * angleGlassOffset;
		var glassDeltaY = rackDistY * glassAngle / rackAngleDist;

		var glassParams = {
			rad: banisterPositionRad,
			height: glassDeltaY,
			stripeWidth: glassHeight,
			angle: glassAngle,
			botHeight: glassHeight,
			topHeight: glassHeight,
			turnFactor: turnFactor,
			material: glassMaterial,
		}

		for (var i = 0; i < rackAmt - 1; i++) {
			glassParams = drawSpiralStripe(glassParams);
			var glass = glassParams.mesh;
			glass.rotation.x = -Math.PI / 2;
			glass.rotation.z = (angleGlassOffset + rackAngleDist * i) * turnFactor;
			glass.position.y = railingHeight - glassHeight + 50 + rackDistY * i;
			railingSection.add(glass);
		}
	}


	//поручень

	var handrailParams = {
		poleType: "round",
		poleSize: 50,
		poleRad: banisterPositionRad,
		posY: longBanisterLength,
		model: par.model,
		material: params.materials.timber,
		startOffset: 0.25,
		endOffset: 0.25,
		partName: "spiralHandrail",
	}
	if (par.model == "Частые стойки") {
		handrailParams.poleRad += 10;
		//handrailParams.posY += 20 / Math.cos((stairAmt + 1.5) * stepAngle) + 15;
		handrailParams.posY += 20;
	}
	if (par.model != "Частые стойки") {
		handrailParams.startOffset = 0.25;
		handrailParams.endOffset = 0.1;
	}
	if (par.model == "Ригели" || par.model == "Стекло на стойках") {
		handrailParams.posY += 50;
		handrailParams.poleRad += 20;
	}

	if (handrailMaterial == "Нержавейка" || handrailMaterial == "Алюминий")
		handrailParams.material = params.materials.metal;

	handrail.add(drawVinPole(handrailParams));




	if (par.model == "Самонесущее стекло") {

		//считаем длину ограждения
		par.railingLength = Math.sqrt((stepAngle * rad) * (stepAngle * rad) + stepHeight * stepHeight) * stairAmt;
		var rackAmt = Math.ceil(par.railingLength / 900) + 1;
		var topRackOffset = 0.3;
		var rackAngleDist = stepAngle * (stairAmt - topRackOffset) / (rackAmt - 1);
		var rackDistY = stepHeight * (stairAmt - topRackOffset) / (rackAmt - 1);
		var banisterProfileSize = 40;
		var longBanisterLength = railingHeight + 150;
		var banisterPositionRad = rad + banisterProfileSize / 2 + 2;
		if (par.side == "in") banisterPositionRad = rad - banisterProfileSize / 2 - 2;

		var glassHeight = 1200;
		var glassOffset = 5;
		var angleGlassOffset = glassOffset / banisterPositionRad;
		var glassAngle = rackAngleDist - 2 * angleGlassOffset;
		var glassDeltaY = rackDistY * glassAngle / rackAngleDist;

		var glassParams = {
			rad: banisterPositionRad,
			height: glassDeltaY,
			stripeWidth: glassHeight,
			angle: glassAngle,
			botHeight: glassHeight,
			topHeight: glassHeight,
			turnFactor: turnFactor,
			material: glassMaterial,
		}

		for (var i = 0; i < rackAmt - 1; i++) {
			glassParams = drawSpiralStripe(glassParams);
			var glass = glassParams.mesh;
			glass.rotation.x = -Math.PI / 2;
			glass.rotation.z = (angleGlassOffset + rackAngleDist * i) * turnFactor;
			glass.position.y = -100 + rackDistY * i;
			railingSection.add(glass);
		}


	}

	function drawVinPole(par) {

		var stairAmt = params.stepAmt - 1;
		if (params.platformPosition == "ниже") stairAmt = params.stepAmt - 2;
		var banisterBottomOverhang = 36; //выступ балясини ниже нижней поверхности ступени
		var botLedge = banisterBottomOverhang + params.treadThickness; //выступ балясины ниже верхней поверхности ступени

		var startAngle = 0;
		var endAngle = 0;
		/*координаты верхних точек балЯсин*/
		var handrailPoints = [];
		for (var i = 0; i < stairAmt + 1; i++) {
			banistrPositionAngle = -stepAngle * i * turnFactor + banistrPositionAngle0;
			var p1_x = par.poleRad * Math.cos(banistrPositionAngle);
			var p1_y = par.posY + stepHeight * i - params.treadThickness - banisterBottomOverhang;
			if (par.model != "Частые стойки") p1_y = par.posY + stepHeight * i
			var p1_z = par.poleRad * Math.sin(banistrPositionAngle);

			//выступ за первую стойку
			if (i == 0) {
				var j = -par.startOffset
				banistrPositionAngle = -stepAngle * j * turnFactor + banistrPositionAngle0;
				var p0_x = par.poleRad * Math.cos(banistrPositionAngle);
				var p0_y = par.posY + stepHeight * j - params.treadThickness - banisterBottomOverhang;
				if (par.model != "Частые стойки") p0_y = par.posY + stepHeight * j;
				var p0_z = par.poleRad * Math.sin(banistrPositionAngle);
				handrailPoints.push(new THREE.Vector3(p0_x, p0_y, p0_z));
				startAngle = banistrPositionAngle;
			}
			//остальные стойки
			handrailPoints.push(new THREE.Vector3(p1_x, p1_y, p1_z));
			//выступ за последнюю стойку
			if (i == stairAmt) {
				var j = i + par.endOffset;
				banistrPositionAngle = -stepAngle * j * turnFactor + banistrPositionAngle0;
				var p0_x = par.poleRad * Math.cos(banistrPositionAngle);
				var p0_y = par.posY + stepHeight * j - params.treadThickness - banisterBottomOverhang
				if (par.model != "Частые стойки") p0_y = par.posY + stepHeight * j;
				var p0_z = par.poleRad * Math.sin(banistrPositionAngle);
				handrailPoints.push(new THREE.Vector3(p0_x, p0_y, p0_z));
				endAngle = banistrPositionAngle;
			}
		}
		var handrailSpline = new THREE.CatmullRomCurve3(handrailPoints);
		
		
		var shape = new THREE.Shape();
		shape.absarc(0, 0, par.poleSize / 2, 0, 2 * Math.PI, true)

		var extrudeSettings = {
			steps: 200,
			bevelEnabled: false,
			extrudePath: handrailSpline
		};
	
		var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
		var handrail = new THREE.Mesh(geometry, par.material);

		// var pts = [], count = 4;
		// for ( var i = 0; i < count; i ++ ) {
		// 	var l = 40;
		// 	var a = 2 * i / count * Math.PI;
		// 	pts.push( new THREE.Vector2( Math.cos( a ) * l, Math.sin( a ) * l ) );
		// }

		// var shape = new THREE.Shape( pts );
		// var geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
		// var material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );
		// var handrail = new THREE.Mesh( geometry, material );

		//поднимаем поручень для контроля длины балясина
		handrail.position.y += 20;
		var mesh = new THREE.Object3D();
		mesh.add(handrail);

		//рассчитываем длину
		var sumLen = 0;
		for (var i = 0; i < handrailPoints.length - 1; i++) {
			sumLen += distance3d(handrailPoints[i], handrailPoints[i + 1]);
		}
		sumLen += 600; //Учитываем обрезаемые хвостовики

		if (params.handrailMaterial == 'ПВХ' && par.partName !== "spiralRigel") {
			var plugParams = {
				id: "stainlessPlug_pvc",
				width: 50,
				height: 50,
				description: "Заглушка поручня",
				group: "Поручни",
				isCirclePlug: true,
				type: "ПВХ",
			}
			var plug = drawPlug(plugParams);
			plug.position.x = handrailPoints[0].x;
			plug.position.y = handrailPoints[0].y;
			plug.position.z = handrailPoints[0].z;
			// plug.rotation.x = Math.PI / 2;
			// plug.rotation.y = startAngle;
			// plug.rotation.z = 0;
			if(!testingMode) mesh.add(plug);

			var plug = drawPlug(plugParams);
			plug.position.x = handrailPoints[handrailPoints.length - 1].x;
			plug.position.y = handrailPoints[handrailPoints.length - 1].y;
			plug.position.z = handrailPoints[handrailPoints.length - 1].z;
			// plug.rotation.x = Math.PI / 2;
			// plug.rotation.y = endAngle;
			// plug.rotation.z = 0;
			if(!testingMode) mesh.add(plug);
		}

		//сохраняем данные для спецификации
		var partName = par.partName;
		if (params.handrailMaterial == "ПВХ" && partName !== "spiralRigel") partName = "pvcHandrail"
		if (typeof specObj != 'undefined') {
			if (!specObj[partName]) {
				specObj[partName] = {
					types: {},
					amt: 0,
					area: 0,
					paintedArea: 0,
					sumLength: 0,
					name: "Спиральный поручень " + params.handrailMaterial,
					metalPaint: false,
					timberPaint: false,
					division: "metal",
					workUnitName: "sumLength", //единица измерения
					group: "spiral_handrails",
				}
				if (params.handrailMaterial == "Дуб") {
					specObj[partName].division = "timber";
					specObj[partName].timberPaint = true;
				}
				if (params.handrailMaterial == "ПВХ") {
					specObj[partName].name += " цвет " + params.handrailColor;
					specObj[partName].division = "metal";
					specObj[partName].timberPaint = false;
				}
				if (partName == "spiralRigel") {
					specObj[partName].name = "Спиральный ригель";
					specObj[partName].division = "metal";
					specObj[partName].timberPaint = false;
				}
			}
			
			//рассчитываем кол-во кусков исходя из максимальной длины куска
			var maxLen = 3000;
			if(partName == "spiralRigel") maxLen = 6000;
			var partsAmt_l = Math.ceil(sumLen / maxLen);
			
			//рассчитываем кол-во кусков с учетом максимальной высоты стапеля
			var maxHeight = 1800;
			var partsAmt_h = Math.ceil(params.staircaseHeight / maxHeight);
			
			var polePartsAmt = Math.max(partsAmt_l, partsAmt_h);
			
			var partLen = Math.round(sumLen / polePartsAmt)
			
			var name = " L=" + partLen;
			if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += polePartsAmt;
			if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = polePartsAmt;
			specObj[partName]["amt"] += polePartsAmt;
			specObj[partName]["sumLength"] += sumLen / 1000;

		}
		mesh.specId = partName + name;

		if (polePartsAmt > 1  && par.partName !== "spiralRigel") {
			for (var i = 0; i < polePartsAmt - 1; i++) {
				var pos = Math.floor(handrailPoints.length / polePartsAmt) * (i + 1);
				if (params.handrailMaterial == 'ПВХ') {
					var ring = drawHandrailRing();
					ring.position.x = handrailPoints[pos].x;
					ring.position.y = handrailPoints[pos].y;
					ring.position.z = handrailPoints[pos].z;
					ring.rotation.x = Math.PI / 2;
					if(!testingMode) mesh.add(ring);
				}
				if(params.handrailMaterial == 'Дуб'){
					var bolt = drawHandrailZipBolt();
					bolt.position.x = handrailPoints[pos].x;
					bolt.position.y = handrailPoints[pos].y;
					bolt.position.z = handrailPoints[pos].z;
					bolt.rotation.x = Math.PI / 2;
					if(!testingMode) mesh.add(bolt);
				}
			}
		}

		return mesh;

	} //end of drawVinPole()

	par.mesh = railingSection;
	par.handrail = handrail;
	par.rigels = rigels;


	return par;

}; //end of drawSpiralRailing

function drawHandrailZipBolt(){
	var material = params.materials.inox;

	var geometry = new THREE.CylinderGeometry( 5, 5, 30, 32 );
	var ring = new THREE.Mesh(geometry, material);

	var partName = "zipBolt"
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Зип-болт прямой",
				metalPaint: false,
				timberPaint: false,
				isModelData: true,
				division: "stock_1",
				workUnitName: "amt",
				group: "Поручни",
				purposes: ["Соединение поручня на лестнице"]
			}
		}
		var name = 0;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	ring.specId = partName;	
	ring.setLayer("metis");

	return ring;
}

function drawHandrailRing(){
	var material = params.materials.inox;

	var geometry = new THREE.CylinderGeometry( 30, 30, 10, 32 );
	var ring = new THREE.Mesh(geometry, material);

	var partName = "handrailRing_model";
	if (typeof specObj != 'undefined') {
		if (!specObj[partName]) {
			specObj[partName] = {
				types: {},
				amt: 0,
				name: "Кольцо для поручня ПВХ",
				metalPaint: false,
				timberPaint: false,
				isModelData: true,
				division: "stock_1",
				workUnitName: "amt",
				group: "Поручни",
				purposes: ["Соединение поручня на лестнице"]
			}
		}
		var name = 0;
		if (specObj[partName]["types"][name]) specObj[partName]["types"][name] += 1;
		if (!specObj[partName]["types"][name]) specObj[partName]["types"][name] = 1;
		specObj[partName]["amt"] += 1;
	}

	ring.specId = partName;	
	ring.setLayer("metis");

	return ring;
}