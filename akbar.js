var mainStyle = "font-size: small; text-transform: uppercase; font-family: sans-serif; margin: 5px; left: 0; padding: 5px 10px; box-sizing: border-box; width: auto; background-color: #000; color: #fff; position: fixed; top: 0; z-index: 99999; box-shadow: #ddd 3px 3px 0px;";
document.querySelector('head').innerHTML += '<style>.vis-helper-span a {font-size: small; text-transform: none; color: #fff; text-decoration: none;}</style>';
var orig = document.body.style.cssText;

function filter(text) {
	var output = "-webkit-filter:"+text+";";
	output+="-moz-filter:"+text+";";
	output+="-ms-filter:"+text+";";
	output+="filter:"+text+";";
	return output;
}

function lowvis() {
	reset();
	document.body.style.cssText += filter('blur(3px)');
}

function colorblind(){
	reset();
	document.documentElement.style.cssText += filter('grayscale(100%)');
}

function rp(e){
	reset();

	document.querySelector('head').innerHTML += '<style>:root {cursor: none; --cursorX: 50vw; --cursorY: 50vh;} :root:before {content: ""; display: block; width: 100%; height: 100%; position: fixed; pointer-events: none; background: radial-gradient(circle 20vmax at var(--cursorX) var(--cursorY), rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 1) 100%);}</style>';
	document.addEventListener('mousemove',rp)

    var x = e.clientX
    var y = e.clientY

	console.log(x,y)
  
    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
  }

function reset(){
	document.documentElement.style.cssText = "";
	document.querySelector("#akbar-filter").style.cssText = "";
	document.removeEventListener("mousemove", rp);
	var hs = document.getElementsByTagName('style');
	for (var i=0, max = hs.length; i < max; i++) {
		hs[i].parentNode.removeChild(hs[i]);
	}
}


var buttons = "<button onclick='lowvis();'>Low Vision</button>";
buttons+= "<button onclick='colorblind();'>Color Blind</button>";
buttons+= "<button onclick='rp();'>Retinopathia pigmentosa</button>";


document.body.innerHTML += "<div id='akbar' role='presentation' style='"+mainStyle+"'><strong>👓 Simulate visual impairments:&nbsp;</strong>"+buttons+"&nbsp;<i class='vis-helper-span'><a href='#'>More information</a></i></div><div role='presentation' id='akbar-filter'></div>";
