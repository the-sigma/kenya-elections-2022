const UX = function () {
	this.resultsUrl = "https://script.google.com/macros/s/AKfycbw3iSpT_9VQAwcowW5z4S_Jwo8BGMShIA-zMFvhOLe6cj87lMVOGwqS9Pe9LmOIq7j0DA/exec"
	this.ls = window.localStorage
	this.electionsPg = ""
	let ua = navigator.userAgent, s = ua.indexOf(";") + 1, e = ua.indexOf(")")
	this.id = ua.substring(s, e)

	this.mainBox = document.querySelector("#progress .progres")
	this.auxBox = document.querySelector("#pgsr .pgsrctn")
	this.mdlNxt = document.querySelector(".mdlbody .nxt")
	this.mdlPrev = document.querySelector(".mdlbody .prv")
	this.mdlSeatsLen = 0

	this.mdlClose = document.querySelector(".pop .close")
	this.maps = document.querySelectorAll(".cnty svg .g")
	this.mapCtn = document.querySelector(".pop .modalctn")
	this.mapBox = this.mapCtn.querySelector(".mdlbox")
	this.pElect = document.querySelector("#p-elect")
	this.structCtn = document.querySelector(".struct")
	this.mainCtn = document.querySelector(".mainCtn")
	this.liveBx = this.mainCtn.querySelector(".live")
}

UX.prototype.__init__ = function () {
	let data = new FormData()
	data.append("action", "INIT")
	data.append("id", this.ls.getItem("id") || this.id)

	fetch(this.resultsUrl, { method: "POST", body: data })
		.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP Error! status: ${res.status}`)
			} return res.json()
		}).then(e => {
			if (e.error) {
				throw new Error(e.error)
				return
			}

			this.structCtn.style.display = "none"
			this.mainCtn.style.display = "block"
			this.paintMap(e.results.regions)
			this.loadMain(e.results.national)
			this.loadAux(e.results.regions)
			this.ls.setItem("eResults", JSON.stringify(e.results.regions))
			this.isCompl(e.results)
			this.reset()
			if (e.results.msc.id) {
				this.ls.setItem("id", e.results.msc.id)
			}
		}).catch(er => {
			document.body.innerHTML = `<div class="body-err"><div><h3>An error occured!</h3><p>${er}.</p><a href="${this.electionsPg}">Reload page</a></div>
			<div class="svg">
			<svg width="900.000000pt" height="900.000000pt" viewBox="0 0 900.000000 900.000000"
			preserveAspectRatio="xMidYMid meet">
			<g transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)"
			fill="#27abab" stroke="none">
			<path d="M4125 8589 c-132 -3 -267 -11 -300 -18 -33 -6 -94 -10 -137 -10 -42
			1 -80 -1 -86 -5 -5 -3 -65 -11 -133 -16 -67 -6 -147 -18 -178 -26 -30 -7 -74
			-14 -98 -14 -23 0 -45 -4 -48 -10 -3 -5 -32 -10 -63 -10 -31 -1 -68 -7 -82
			-15 -14 -8 -41 -14 -61 -15 -20 0 -56 -7 -79 -15 -23 -8 -54 -15 -69 -15 -14
			0 -35 -7 -45 -15 -11 -8 -33 -15 -49 -15 -33 0 -171 -39 -232 -65 -16 -8 -64
			-25 -105 -38 -156 -52 -317 -129 -493 -236 -156 -95 -157 -95 -259 -176 -28
			-22 -71 -55 -94 -73 -105 -78 -475 -455 -536 -546 -13 -18 -50 -68 -83 -111
			-33 -42 -79 -105 -102 -139 -24 -33 -52 -74 -63 -91 -33 -47 -110 -168 -110
			-171 0 -2 -19 -36 -42 -76 -63 -108 -153 -296 -208 -433 -43 -107 -120 -339
			-120 -363 0 -10 -4 -22 -9 -28 -9 -9 -25 -71 -41 -156 -5 -27 -12 -53 -16 -59
			-10 -16 -35 -171 -43 -264 -3 -44 -12 -90 -19 -102 -7 -12 -12 -58 -12 -105
			-1 -46 -5 -117 -10 -158 -19 -145 -3 -743 22 -835 5 -22 14 -76 18 -120 13
			-133 42 -294 71 -391 5 -17 9 -38 9 -48 0 -10 7 -39 15 -65 8 -25 33 -107 55
			-181 37 -121 134 -385 165 -450 7 -14 26 -54 42 -90 101 -219 168 -339 352
			-625 167 -261 543 -690 812 -926 137 -121 166 -146 214 -185 28 -22 82 -62
			120 -89 39 -26 104 -72 145 -100 111 -77 299 -185 433 -249 65 -31 121 -56
			124 -56 4 0 14 -6 22 -14 9 -7 44 -23 79 -35 34 -12 70 -25 80 -30 41 -21 94
			-41 107 -41 8 0 29 -6 47 -14 18 -8 60 -22 93 -31 33 -9 69 -20 80 -25 31 -12
			145 -42 195 -51 25 -4 74 -12 110 -19 36 -6 94 -15 130 -20 36 -4 112 -15 170
			-23 142 -21 520 -30 710 -18 202 13 281 21 294 29 11 6 70 14 209 28 37 4 70
			11 73 15 3 5 19 9 35 9 16 0 44 6 62 13 18 8 50 17 72 21 22 4 67 17 100 28
			33 12 76 24 95 28 19 5 60 18 90 30 30 12 69 26 85 30 127 36 574 258 734 365
			57 39 122 80 145 93 22 12 61 40 86 60 25 21 61 49 80 62 178 122 565 502 691
			679 81 113 179 261 179 269 0 5 13 27 29 50 61 83 210 417 240 537 7 28 16 59
			21 70 22 58 60 222 69 295 4 36 12 74 18 85 5 11 13 63 16 115 3 52 10 108 16
			123 14 37 15 526 1 563 -6 15 -13 70 -17 123 -3 53 -10 105 -16 116 -5 10 -13
			46 -17 80 -12 97 -32 188 -46 217 -8 15 -14 40 -14 57 0 16 -4 33 -10 36 -5 3
			-10 17 -10 31 0 28 -110 336 -140 392 -11 20 -27 55 -36 77 -23 59 -49 111
			-95 195 -22 41 -50 93 -62 115 -11 22 -31 54 -44 72 -12 17 -23 34 -23 37 0 2
			-28 46 -62 96 -35 50 -76 113 -93 138 -29 45 -54 79 -165 221 -198 253 -582
			643 -817 828 -15 12 -55 45 -88 72 -33 28 -100 78 -148 113 -48 35 -120 87
			-160 117 -40 30 -81 60 -92 66 -11 6 -65 40 -120 76 -55 36 -119 76 -142 89
			-46 25 -64 57 -42 71 8 5 762 9 1677 9 l1662 0 -2 643 -3 642 -2235 0 c-1229
			1 -2343 -2 -2475 -6z m695 -1287 c30 -14 340 -351 444 -482 211 -267 286 -368
			316 -423 12 -21 40 -65 63 -97 44 -61 129 -195 136 -214 2 -6 23 -40 45 -76
			23 -36 50 -85 61 -110 10 -25 22 -50 27 -56 10 -14 118 -231 118 -238 0 -3 11
			-29 24 -58 13 -29 34 -78 46 -108 12 -30 26 -59 31 -64 5 -6 9 -22 9 -37 0
			-15 7 -32 15 -39 8 -7 15 -22 15 -34 0 -11 6 -33 14 -48 8 -15 17 -40 21 -57
			4 -17 11 -33 16 -36 5 -4 9 -17 9 -31 0 -14 5 -35 12 -47 6 -12 15 -40 19 -62
			7 -38 11 -53 39 -135 7 -19 16 -55 20 -80 4 -25 18 -94 30 -155 27 -136 38
			-204 49 -325 5 -52 14 -117 20 -144 19 -81 19 -730 0 -812 -6 -27 -15 -92 -20
			-144 -11 -124 -22 -193 -49 -315 -12 -55 -25 -121 -29 -148 -4 -26 -13 -53
			-19 -59 -7 -7 -12 -21 -12 -33 0 -21 -23 -98 -46 -153 -8 -18 -14 -41 -14 -52
			0 -19 -18 -66 -46 -123 -8 -16 -14 -32 -14 -37 0 -8 -44 -105 -106 -235 -85
			-178 -221 -393 -356 -564 -62 -77 -244 -258 -308 -305 -31 -23 -62 -47 -70
			-54 -55 -47 -320 -192 -353 -192 -7 0 -22 -7 -33 -15 -10 -8 -31 -15 -45 -15
			-14 0 -34 -7 -45 -15 -10 -8 -32 -15 -47 -15 -16 0 -38 -5 -50 -12 -76 -40
			-707 -44 -782 -5 -11 6 -40 14 -65 18 -197 31 -604 223 -788 372 -296 238
			-539 497 -722 770 -30 45 -57 84 -60 87 -9 8 -70 100 -70 106 0 3 -17 31 -38
			62 -46 67 -43 62 -152 278 -96 190 -135 275 -175 384 -15 41 -32 89 -39 105
			-22 53 -38 99 -45 135 -4 19 -13 45 -19 57 -7 12 -12 30 -12 40 0 10 -7 31
			-15 47 -8 15 -15 42 -15 60 0 17 -7 40 -15 50 -8 11 -15 36 -15 55 0 19 -4 48
			-9 65 -52 167 -84 422 -112 885 -11 182 -6 328 21 611 5 52 12 129 15 170 4
			41 10 84 15 95 5 11 11 38 13 60 2 22 14 76 27 120 12 44 26 100 31 125 5 24
			14 49 19 54 6 6 10 20 10 32 0 12 6 35 14 51 8 15 22 48 31 73 35 94 109 250
			140 295 27 40 41 64 58 100 8 17 21 37 28 45 8 8 35 44 61 80 55 77 177 213
			228 255 21 17 69 57 107 90 147 125 361 258 543 336 52 22 106 45 120 51 85
			37 137 55 188 68 18 4 38 12 45 18 7 5 28 12 47 15 19 4 67 16 105 27 39 11
			88 23 110 26 22 3 57 12 78 20 20 8 56 14 79 14 22 0 57 4 77 9 20 5 85 15
			144 21 59 6 118 15 130 20 25 10 705 12 727 2z"/>
			</g>
			</svg>
			</div>
		</div>`
		})
}
UX.prototype.loadMap = function () {
	const h2 = this.mapCtn.querySelector(".mapid h2")
	this.maps.forEach(map => {
		map.addEventListener("click", (e) => {
			document.body.classList.add("info", "noscroll")
			this.mapBox.innerHTML = ""
			const obj = JSON.parse(this.ls.getItem("eResults")),
				cnty = obj[map.id],
				posts = cnty["posts"]
			h2.textContent = `${cnty.id}. ${cnty.name} County`
			this.loadHtm(posts, this.mapBox, " Results")
			this.mdlSeatsLen = 0
			this.mapBox.scrollLeft = 0
			const divs = Array.from(this.mapBox.querySelectorAll(".mdlbox .seat"))
			if (divs.length <= 1) {
				this.mdlPrev.classList.add("end")
				this.mdlNxt.classList.add("end")
			} else {
				this.mdlNxt.classList.remove("end")
				this.mdlPrev.classList.add("end")
			}
		})
	})
}

UX.prototype.isCompl = function (obj) {
	if (obj.msc.complete) {
		let nat = obj.national,
			sorted = this.sortObj(nat["candidates"]),
			win = Object.entries(sorted)[0]
		this.liveBx.innerHTML = `<h2>Election Results</h2>`
		this.pElect.innerHTML = `<div class="pediv">
		<h2 class="hr-brand">President Elect</h2>
		</div>
		<div class="p-elect-div">
		<img class="flag" src="imgs/flagbg.jpg">
		<img src="imgs/confetti.gif">
		<div class="p-elect-ctn">
		<div class="p-elect-img">
		<img src="imgs/Presidential/${win[0]}.png">
		</div>
		<div class="p-elect-desc">
		<div>
		<h3>${win[1][0]}</h3>
		<div class="h5spcheck">
		<div class="h5sp">
		<div class="h5">
		<h5>ELECTED THE</h5>
		<h5 class="m-0 p-0">PRESIDENT</h5>
		</div>
		<div class="p">
		<p>5</p>
		<h5>TH</h5>
		</div>
		</div>
		<div class="check">
		<img src="imgs/check.png">
		</div>
		</div>
		</div>
		</div>
		</div>
		</div>`
	} else {
		this.liveBx.innerHTML = `<h6>LIVE<span></span></h6>
		<h2>Presidential Results</h2>`
		this.pElect.innerHTML = ""
	}
}

UX.prototype.loadMain = function (obj) {
	let seat = this.mainBox.querySelector(".seat"),
		top = this.mainBox.querySelector(".cadts"),
		cadsBx = document.createElement("div"),
		sorted = this.sortObj(obj["candidates"]),
		azimio = Object.entries(sorted).filter(a => a[1][1] === "AZIMIO")[0],
		uda = Object.entries(sorted).filter(a => a[1][1] === "UDA")[0]

	top.innerHTML = `<div class="race flexrow">
		<div class="top">
		<div class="topimg">
		<img src="imgs/rao.png" alt="raila">
		</div>
		<div class="name text-center my-2">
		<h5>Raila</h5>
		</div>
		</div>
		<div class="top">
		<div class="topimg">
		<img src="imgs/wsr.png" alt="ruto">
		</div>
		<div class="name text-center my-2">
		<h5>Ruto</h5>
		</div>
		</div>
		</div>
		<div class="bar">
		<div class="pmp flexrow mb-1">
		<h6 class="flexrow"><span class="picon odcon"><img src="imgs/azimio.png" alt="azimio"></span><span class="p-name azimio text-light px-1">AZIMIO</span></h6>
		<h6>50% +1 to win</h6>
		<h6 class="flexrow"><span class="p-name uda text-light px-1">UDA</span><span class="picon udcon"><img src="imgs/uda.png" alt="uda"></span></h6>
		</div>
		<div class="barctn">
		<span class="race1" style="width:${azimio[1][3]};"></span>
		<span class="race2" style="width:${uda[1][3]};"></span>
		</div>
		<div class="num flexrow mt-1">
		<div class="raonum">
		<h3>${azimio[1][3]}</h3>
		<h5>${Number(azimio[1][2]).toLocaleString("en-US")}</h5>
		</div>
		<div class="text-end">
		<h3>${uda[1][3]}</h3>
		<h5>${Number(uda[1][2]).toLocaleString("en-US")}</h5>
		</div>
		</div>
		</div>`

	cadsBx.setAttribute("class", "apcr")
	seat.setAttribute("class", "seat")
	seat.innerHTML = `<h3>National Presidential Results</h3>`
	for (let [m, n] of Object.entries(sorted)) {
		cadsBx.innerHTML += `<div class="cadctn flexrowb ${n[1].toLowerCase()}">
		    <div class="flexrowb">
		    <span class="cadimgctn">
		    <img src="imgs/Presidential/${m}.png" alt="&sigma;" >
		    </span>
		    <div class="nmpt">
			<h6 class="d-flex align-items-center mb-2">
		    <span class="picons"><img src="imgs/${n[1].toLowerCase()}.png" alt="&sigma;" ></span>
		    <span class="p-name px-1">${n[1]}</span></h6>
		    <h5 class="mb-1">${n[0]}</h5>
		    </div>
		    </div>
		    <div class="accm">
		    <h2>${n[3]}</h2>
		    <h6>${Number(n[2]).toLocaleString("en-US")}</h6>
		    </div>`
	}
	cadsBx.innerHTML += `<div class="votes flexrowb">
		    <div class="accm cast">
		    <h2>Valid</h2>
		    <h5>${Number(obj["valid"]).toLocaleString("en-US")}</h5>
		    </div>
		    <div class="h3">
		    <h3>Total Votes</h3>
		    </div>
		    <div class="accm void">
		    <h2>Void</h2>
		    <h5>${Number(obj["void"]).toLocaleString("en-US")}</h5>
		    </div>
		    </div>`
	seat.appendChild(cadsBx)
}

UX.prototype.loadAux = function (obj) {
	this.auxBox.innerHTML = ""
	const sorted = Object.entries(obj).sort((a, b) => a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0)
		.reduce((x, [m, n]) => {
			x[m] = n
			return x
		}, {})
	for (const [k, v] of Object.entries(sorted)) {
		let card = document.createElement("div"),
			cntyDiv = document.createElement("div"),
			h1 = document.createElement("h1"),
			ctyObj = sorted[k]

		pgsrBx = document.createElement("div")
		cntyDiv.setAttribute("class", "cnty col-12 col-md-6 col-lg-6 col-xl-4")
		h1.setAttribute("class", "hr-brand")
		pgsrBx.setAttribute("class", "pgsrbox")
		card.setAttribute("class", "card")
		h1.textContent = `${ctyObj.id}. ${ctyObj.name} County`
		card.appendChild(h1)
		card.appendChild(pgsrBx)
		cntyDiv.appendChild(card)
		this.loadHtm(v.posts, pgsrBx, ` - ${ctyObj.name}`)
		this.auxBox.appendChild(cntyDiv)
	}

}

UX.prototype.loadHtm = function (posts, el, str = "") {
	try {
		for (const [k, v] of Object.entries(posts)) {
			let seat = document.createElement("div"),
				cadsBx = document.createElement("div"),
				sorted = this.sortObj(posts[k]["candidates"])

			cadsBx.setAttribute("class", "apcr")
			seat.setAttribute("class", "seat")
			seat.innerHTML = `<h3>${k + str}</h3>`
			for (let [m, n] of Object.entries(sorted)) {
				cadsBx.innerHTML += `<div class="cadctn flexrowb ${n[1].toLowerCase()}">
			    <div class="flexrowb">
			    <span class="cadimgctn">
			    <img src="imgs/${k}/${m}.png" alt="&sigma;">
			    </span>
			    <div class="nmpt">

				<h6 class="d-flex align-items-center mb-2">
		    	<span class="picons"><img src="imgs/${n[1].toLowerCase()}.png" alt="&sigma;" ></span>
		    	<span class="p-name px-1">${n[1]}</span></h6>
			    <h5 class="mb-1">${n[0]}</h5>
			    </div>
			    </div>
			    <div class="accm">
			    <h2>${n[3]}</h2>
			    <h6>${Number(n[2]).toLocaleString("en-US")}</h6>
			    </div>`
			}

			if (k === "Presidential") {
				cadsBx.innerHTML += `<div class="votes flexrowb">
			    <div class="accm cast">
			    <h2>Valid</h2>
			    <h5>${Number(posts[k]["valid"]).toLocaleString("en-US")}</h5>
			    </div>
			    <div class="h3">
			    <h3>Total Votes</h3>
			    </div>
			    <div class="accm void">
			    <h2>Void</h2>
			    <h5>${Number(posts[k]["void"]).toLocaleString("en-US")}</h5>
			    </div>
			    </div>`
			}
			seat.appendChild(cadsBx)
			el.appendChild(seat)
		}
	} catch (er) {
		console.log(er)
	}
}

UX.prototype.reset = function () {
	let data = new FormData()
	data.append("action", "REFRESH")
	fetch(this.resultsUrl, { method: "POST", body: data })
		.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP Error! status: ${res.status}`)
			} return res.json()
		}).then(e => {
			if (e.error) {
				throw new Error(e.error)
				return
			}
			this.paintMap(e.results.regions)
			this.loadMain(e.results.national)
			this.loadAux(e.results.regions)
			this.ls.setItem("eResults", JSON.stringify(e.results.regions))
			this.isCompl(e.results)
			setTimeout(() => {
				this.reset()
			}, 30000)

		}).catch(er => {
			console.log(er)
			this.reset()
		})
}

UX.prototype.sortObj = function (obj) {
	return Object.entries(obj).sort((a, b) => b[1][2] - a[1][2])
		.reduce((x, [m, n]) => {
			x[m] = n
			return x
		}, {})
}

UX.prototype.paintMap = function (obj) {
	this.maps.forEach(map => {
		try {
			map.classList = "g"
			const cands = obj[map.id]["posts"]["Presidential"]["candidates"]
			const sorted = Object.entries(cands).sort((a, b) => b[1][2] - a[1][2]),
				fst = sorted[0][1], snd = sorted[1][1]
			if (fst[2] > snd[2]) {
				if (fst[1] === "UDA" || fst[1] === "AZIMIO") {
					map.classList.add(fst[1].toLowerCase())
				} else map.classList.add("other")
			} else if (fst[2] > 0 && fst[2] === snd[2]) map.classList.add("tie")
		} catch (er) {
			return
		}
	})
}

UX.prototype.mapEvents = function () {
	let s = 0,
		d = 0,
		end = 0

	this.mdlNxt.addEventListener("click", (e) => {
		e.preventDefault()
		this.scrolNxt(this.mapBox, this.mdlPrev, e.target)
	})

	this.mdlPrev.addEventListener("click", (e) => {
		e.preventDefault()
		this.scrolPrv(this.mapBox, this.mdlNxt, e.target)
	})

	this.mapBox.addEventListener("touchstart", (e) => {
		s = e.touches[0].pageX
	})

	this.mapBox.addEventListener("touchmove", (e) => {
		d = e.touches[0].pageX
	})

	this.mapBox.addEventListener("touchend", (e) => {
		end = d - s
		if (end < -50) this.scrolNxt(this.mapBox, this.mdlPrev, this.mdlNxt)
		else if (end > 50) this.scrolPrv(this.mapBox, this.mdlNxt, this.mdlPrev)
	})
}

UX.prototype.scrolNxt = function (ctn, a, e) {
	const divs = Array.from(this.mapBox.querySelectorAll(".mdlbox .seat"))
	if (divs.length === 1) return
	this.mdlSeatsLen++
	if (this.mdlSeatsLen >= divs.length - 1) {
		e.classList.add("end")
		this.mdlSeatsLen = divs.length - 1
	}
	a.classList.remove("end")
	ctn.scrollLeft += (divs[this.mdlSeatsLen].getBoundingClientRect().left - 20)
}

UX.prototype.scrolPrv = function (ctn, a, e) {
	const divs = Array.from(this.mapBox.querySelectorAll(".mdlbox .seat"))
	if (divs.length === 1) return
	this.mdlSeatsLen--
	if (this.mdlSeatsLen <= 0) {
		e.classList.add("end")
		this.mdlSeatsLen = 0
	}
	a.classList.remove("end")
	ctn.scrollLeft += (divs[this.mdlSeatsLen].getBoundingClientRect().left - 20)
}
