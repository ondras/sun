var canvas = false;
var slider1 = false;
var slider2 = false;
var slider3 = false;
var slider4 = false;
var slider5 = false;
var color = "#36c";
var margin = 5;

function svg(name, attrs) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var p in attrs) { node.setAttribute(p, attrs[p]); }
    return node;
}

function $(id) { return document.getElementById(id); }


function draw() {
	var w = Number(slider1.value);
	var ratio = Number(slider2.value);
	var padding = Number(slider3.value);
	var width = Number(slider4.value);
	var rotation = Number(slider5.value);
	
	$("val_1").innerHTML = w + "px";
	$("val_2").innerHTML = ratio + "%";
	$("val_3").innerHTML = padding + "%";
	$("val_4").innerHTML = width + "%";
	$("val_5").innerHTML = rotation + "&deg;";

	if (canvas) { canvas.parentNode.removeChild(canvas); }
	canvas = svg("svg", {width:w+2*margin, height:w+2*margin});
	canvas.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
	$("content").appendChild(canvas);

	var defs = svg("defs");
	canvas.appendChild(defs);
	
	/* gradient */
	var g = svg("radialGradient",{id:"grad",cx:"50%",cy:"50%",r:"50%"});
	var s1 = svg("stop",{"stop-color":"orange",offset:"0%"});
	var s2 = svg("stop",{"stop-color":"yellow",offset:"100%"});

	g.appendChild(s1);
	g.appendChild(s2);
	defs.appendChild(g);
	
	/* count */
	var cx = w/2;
	var cy = w/2;
	var r = (w / 2 * ratio / 100) - (w / 2 * padding / 200); 
	var length = (w / 2 * (1- ratio / 100)) - (w / 2 * padding / 200); 
	var swidth = width/200 * w;
	

	/* shaft #1 */
	var s1 = svg("rect",{x:0,y:0,width:swidth,height:length,id:"s1",fill:"yellow",stroke:"black","stroke-width":"1px"});

	/* shaft #2 */
	var x = swidth/2;
	var s2 = svg("polygon",{points:"0,0 "+x+","+x+" "+swidth+",0 "+swidth+","+length+" 0,"+length,id:"s2",fill:"yellow",stroke:"black","stroke-width":"1px"});
	defs.appendChild(s1);
	defs.appendChild(s2);

	var bg = svg("rect",{x:0,y:0,width:"100%",height:"100%",fill:color});
	var group = svg("g",{transform:"translate(5 5) rotate("+rotation+" "+cx+" "+cy+")"});
	/* center */
	var center = svg("circle",{cx:cx,cy:cy,r:r,fill:"url(#grad)",stroke:"black","stroke-width":"1px"});
	group.appendChild(center);
	

	/* instances */
	var u1 = svg("use",{transform:"translate("+(cx-swidth/2)+",0)"});
	u1.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s2");

	var g2 = svg("g",{transform:"translate("+(cx+swidth/2)+","+(w)+")"});
	var u2 = svg("use",{transform:"rotate(180)"});
	u2.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s2");

	var g3 = svg("g",{transform:"translate("+w+","+(cx-swidth/2)+")"});
	var u3 = svg("use",{transform:"rotate(90)"});
	u3.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s2");

	var g4 = svg("g",{transform:"translate(0,"+(cx+swidth/2)+")"});
	var u4 = svg("use",{transform:"rotate(270)"});
	u4.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s2");

	group.appendChild(u1);
	group.appendChild(g2);
	group.appendChild(g3);
	group.appendChild(g4);

	g2.appendChild(u2);
	g3.appendChild(u3);
	g4.appendChild(u4);

	var x = cx + (1/Math.sqrt(2)) * (w/2 - swidth/2);
	var y = cx - (1/Math.sqrt(2)) * (w/2 + swidth/2);
	var g1 = svg("g",{transform:"translate("+x+","+y+")"});
	var u1 = svg("use",{transform:"rotate(45)"});
	u1.setAttributeNS("http://www.w3.org/1999/xlink","href","#s1");

	var x = cx - (1/Math.sqrt(2)) * (w/2 - length + swidth/2);
	var y = cx + (1/Math.sqrt(2)) * (w/2 - length - swidth/2);
	var g2 = svg("g",{transform:"translate("+x+","+y+")"});
	var u2 = svg("use",{transform:"rotate(45)"});
	u2.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s1");

	var x = cx - (1/Math.sqrt(2)) * (w/2 - length - swidth/2);
	var y = cx - (1/Math.sqrt(2)) * (w/2 - length + swidth/2);
	var g3 = svg("g",{transform:"translate("+x+","+y+")"});
	var u3 = svg("use",{transform:"rotate(135)"});
	u3.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s1");

	var x = cx + (1/Math.sqrt(2)) * (w/2 + swidth/2);
	var y = cx + (1/Math.sqrt(2)) * (w/2 - swidth/2);
	var g4 = svg("g",{transform:"translate("+x+","+y+")"});
	var u4 = svg("use",{transform:"rotate(135)"});
	u4.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#s1");

	group.appendChild(g1);
	group.appendChild(g2);
	group.appendChild(g3);
	group.appendChild(g4);

	g1.appendChild(u1);
	g2.appendChild(u2);
	g3.appendChild(u3);
	g4.appendChild(u4);

	canvas.appendChild(bg);
	canvas.appendChild(group);

	var str = new XMLSerializer().serializeToString(canvas);
	$("result_ta").value = str.replace(/>/g,">\n");
}

function slider(id, conf) {
    var input = document.createElement("input");
    input.type = "range";
    for (var p in conf) { input[p] = conf[p]; }
    $(id).appendChild(input);
    return input;
}

function init() {
	slider1 = slider("slider_1",{min:11,max:1001,value:201});

	slider2 = slider("slider_2",{value:45});

	slider3 = slider("slider_3",{value:10,max:50});

	slider4 = slider("slider_4",{value:25});

	slider5 = slider("slider_5",{min:-180,max:180,value:0});

	slider1.oninput = draw;
	slider2.oninput = draw;
	slider3.oninput = draw;
	slider4.oninput = draw;
	slider5.oninput = draw;

	draw();
}