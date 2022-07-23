window.onload = () =>{
	let ui = new UI(), ux = new UX(), dd = new Date("8/9/2022"), durDiv = document.querySelector(".loader .dur")
	
	// setInterval(()=>{
	// 	let nn = dd - Date.now(),
	// 	    obj = convMs(nn)
	// 	durDiv.innerHTML = `<h3>LIVE IN</h3><h5>${obj.d} Days: ${obj.h} Hrs: ${obj.m} Min: ${obj.s} Sec</h5>`
	// }, 1000)
	
	ui.endLoad()
	ui.closeDlg()
	ui.events()
	ux.__init__()
	ux.loadMap()
	ux.mapEvents()
}

function convMs(ms) {
  let days, h, m, s, ht, mt, st
  
  st = parseInt(Math.floor(ms / 1000));
  mt = parseInt(Math.floor(st / 60));
  ht = parseInt(Math.floor(mt / 60));
  days = parseInt(Math.floor(ht / 24));

  s = parseInt(st % 60);
  m = parseInt(mt % 60);
  h = parseInt(ht % 24);

  return { d: days, h, m, s};
}
