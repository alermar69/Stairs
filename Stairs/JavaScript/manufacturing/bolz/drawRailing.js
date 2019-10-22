function calcRacksBolzs(par) {
	//параметры марша
	var marshPar = getMarshParams(par.marshId);
	var prevMarshPar = getMarshParams(marshPar.prevMarshId);
	var nextMarshPar = getMarshParams(marshPar.nextMarshId);
	par.a = marshPar.a;
	par.b = marshPar.b;
	par.h = marshPar.h;
	par.stairAmt = marshPar.stairAmt;

	var rackProfile = 40;

	var offsetX = (params.nose - rackProfile) / 2 + rackProfile / 2;

	ltko_set_railing(par.stairAmt + 1, par);

	var rack = { x: offsetX, y: par.h }
	par.racks.push(rack);

	for (var i = 0; i < par.railing.length; i++) {
		var rack = { x: offsetX + par.b * (par.railing[i] - 1), y: par.h * par.railing[i] }
		par.racks.push(rack);
	}

	var rack = { x: offsetX + par.b * (par.stairAmt - 1), y: par.h * par.stairAmt }
	par.racks.push(rack);

	return par;
}