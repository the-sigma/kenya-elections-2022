

	const UI = function () {
		this.loader = document.querySelector(".loader")
		this.mdlClose = document.querySelector(".pop .close")
		this.homeSec = document.querySelector("#home")
		this.progSec = document.querySelector("#progress")
		this.floaTag = document.querySelector("div.float")
		this.pElect = document.querySelector("#p-elect")
		
	}
	
	UI.prototype.isInView = function (el, p, d = true) {
		const percentVisible = p/100,
		{top:elemTop, bottom:elemBottom, height:elemHeight} = el.getBoundingClientRect(),
		overhang = elemHeight * (1 - percentVisible)
	 	
	 	if(!d){return (elemTop >= -overhang && elemBottom <= window.innerHeight + overhang)}
		return elemBottom <= window.innerHeight + overhang
	}


	UI.prototype.closeDlg = function (){
		this.mdlClose.addEventListener("click", (e)=>{
			e.preventDefault()
			document.body.classList.remove("info","noscroll")
		})
	}
	
	UI.prototype.endLoad = function () {
		this.loader.style.display = "none"
		this.toggleBodyscroll()
	}
	
    UI.prototype.toggleBodyscroll = function () {
		if (!document.body.classList.contains("noscroll")){
			document.body.classList.add("noscroll")
		}else{document.body.classList.remove("noscroll")}
	}
	
	UI.prototype.addScroll = function () {
		if (document.body.classList.contains("noscroll")){
			document.body.classList.remove("noscroll")
		}
	}
	
	UI.prototype.removeScroll = function () {
		if (!document.body.classList.contains("noscroll")){
			document.body.classList.add("noscroll")
		}
	}
	
	UI.prototype.events = function(){
		window.addEventListener("scroll", (e) =>{
			if(this.isInView(this.homeSec, 0, false) || this.isInView(this.progSec, 0, false) || this.isInView(this.pElect, 0, false)){
				this.floaTag.classList.remove("opac")
			}else this.floaTag.classList.add("opac")
		})
	}

	
	
	