$(function(){
	var sliderWidth = 0;

	
	/* Array of receipts */
	
	var correct = [1000,100,10,1,2000,1100,1010,1001,200,101,20,11,2,1110,1011,1020,2110,1210,1120,40,4,1220,1121,1122,4220,1014,
		2420,80,2034,2044,2035,2054,4088,5342,3155,4155,4840,160,4265,7441,18771,9852,11072,
		9307,3475,320,12807,6495,7495,10659,23732,16100,26111,8705,8605,26517,5219,26366,
		5375,3235,18513,44879,17210,9652,28661,57322,6310,5199,5387,15039,9287,3144,4090,8440,14506,
		17145,4188,13375,26850];
	var library = {1000:"Fire",100:"Air",10:"Ground",1:"Water",2000:"Energy",1100:"Smoke",1010:"Lava",1001:"Steam",200:"Pressure",
		101:"Mist",20:"Land",11:"Mud",2:"Lake",1110:"Stone",1011:"Geyser",1020:"Vulcan",2110:"Brick",1210:"Sand",1120:"Mountain",
		40:"Planet",4:"Ocean",1220:"Explosion",1121:"Clay",1122:"River",4220:"Wall",1014:"Primordial soup", 2420:"Desert",80:"Solar System",
		2034:"Life",2044:"Plant",2035:"Plankton",2054:"Tree",4088:"Animal",5342:"Dam",3155:"Human",4155:"Firefighter", 4840:"Oasis",160:"Galaxy",
		4265:"Tool",7441:"Cart",18771:"Leather",9852:"Steam engine",11072:"Combustion engine",9307:"Sheep",3475:"Science",320:"Universe",
		12807:"Engineer",6495:"Iron ore",7495:"Metal",10659:"Axe",23732:"Tractor",16100:"Sword",26111:"Motorcycle",8705:"Gold",8605:"Blade",
		26517:"Wool",5219:"Field",26366:"Armor",5375:"Hummer",3235:"Astronaut",18513:"Car",44879:"Tank",17210:"Scissors",9652:"Machine",
		28661:"Cotton",57322:"Thread",6310:"Love",5199:"Farmer",5387:"Cycle",15039:"Bicycle",9287:"Livestock",3144:"Tobacco",4090:"Frog",
		8440:"House",14506:"Cow",17145:"Bank",4188:"Bird",13375:"Chicken",26850:"Egg"};
	
	/* Starting elements */
	
	for (var i = 0; i < 4; i++) {
		var boxes = document.getElementsByClassName("item");
		boxes[i].setAttribute("data", ""+ (Math.pow(10,3-i)));
		boxes[i].setAttribute("name", library[(Math.pow(10,3-i))]);
		boxes[i].style.backgroundColor = "transparent";
		boxes[i].style.backgroundImage = "url('images/" + (Math.pow(10,3-i)) + ".svg')"
	}
	
	$(".item").on("mouseenter", function () {
		var inform = $(this).attr("name");
		$("<div id='tooltip'>"+inform+"</div>").appendTo($(this));
		$("#tooltip").css("top", -10 + "px").css("left", 45 + "px");
	}).on("mouseleave", function () {
		$("#tooltip").remove();
	});
	
	/* Slider */
	var father = document.getElementById("slider");
	var elem = document.getElementById("slider_container");
	
	function addOnWheel(father, handler) {
		if (father.addEventListener) {
			if ('onwheel' in document) {
				// IE9+, FF17+
				father.addEventListener("wheel", handler);
			} else if ('onmousewheel' in document) {
				// устаревший вариант события
				father.addEventListener("mousewheel", handler);
			} else {
				// 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
				father.addEventListener("MozMousePixelScroll", handler);
			}
		} else { // IE8-
			father.attachEvent("onmousewheel", handler);
		}
	}
	
	var delta = 0;
	
	addOnWheel(father, function(e) {
		if (parseInt($(elem).css("width")) >= parseInt($(father).css("width"))) {
			delta += e.deltaY || e.detail || e.wheelDelta / 4;
			var limit = window.innerWidth-sliderWidth;
			if (delta <= 0 && delta > limit)
				$(elem).css("left", delta + "px");
			else if (delta > 0) {
				delta = 0;
				$(elem).css("left", delta + "px");
			}
			else {
				delta = limit;
				$(elem).css("left", delta + "px");
			}
		}
		else {
		
		}
	});
	
	document.getElementById("button_delete").onclick = function () {
		document.getElementById("element-1").innerHTML = "";
		document.getElementById("element-2").innerHTML = "";
	};
	
	/* Drag n Drop: On Mouse Down */
	
	slider.onmousedown = function(){
		if(event.target.className === "item") {
			var coords = getCoords(event.target);
			var shiftX = event.pageX - coords.left;
			var shiftY = event.pageY - coords.top;
			$(event.target).clone().appendTo("body").attr("id", "clone");
			var clone = document.getElementById("clone");
			clone.style.position = 'absolute';
			clone.style.zIndex = 1000;
			$(clone).on("mouseenter", function () {
				$("#tooltip").remove();
			})

			


			
			/* Drag n Drop: On Mouse Move */
			
			document.onmousemove = function (e) {
				clone.style.left = e.pageX - shiftX + 'px';
				clone.style.top = e.pageY - shiftY + 'px';

				var windowOneTop = getCoords(document.getElementById("element-1")).top;
				var windowTwoTop = getCoords(document.getElementById("element-2")).top;
				var windowOneLeft = getCoords(document.getElementById("element-1")).left;
				var windowTwoLeft = getCoords(document.getElementById("element-2")).left;
				var mouseTop = e.clientY;
				var mouseLeft = e.clientX;

				if (mouseTop > windowOneTop && mouseTop < (windowOneTop + 120) && mouseLeft > windowOneLeft && mouseLeft < (windowOneLeft + 120)) {



					$('#color').css({
						width: "1px",
						height: '1px',
						borderRadius: "50%",
						backgroundColor: "red",
						transform: "scale(150)",
						transition:" 0.7s"
					})

				}else {

					$('#color').css({
						width: "0",
						height: "0",
						transform: "scale(1)",
						backgroundColor: "transparent",
						transition: "0.7s"
					})

				}
				
				/* Drag n Drop: On Mouse Up */
				
				clone.onmouseup = function () {
					document.onmousemove = null;
					clone.onmouseup = null;
					var mouseTop = e.clientY;
					var mouseLeft = e.clientX;
					var windowOneTop = getCoords(document.getElementById("element-1")).top;
					var windowTwoTop = getCoords(document.getElementById("element-2")).top;
					var windowOneLeft = getCoords(document.getElementById("element-1")).left;
					var windowTwoLeft = getCoords(document.getElementById("element-2")).left;
					
					if (mouseTop > windowOneTop && mouseTop < (windowOneTop + 120) && mouseLeft > windowOneLeft && mouseLeft < (windowOneLeft + 120)) {
						document.getElementById("element-1").innerHTML = "";
						document.getElementById("element-1").appendChild(clone);
						clone.style.left = 0;
						clone.style.top = 0;
						clone.style.width = "100%";
						clone.style.height = "100%";
						clone.style.backgroundSize = "70% 70%";
						clone.style.backgroundRepeat = "no-repeat";
						clone.style.backgroundPosition = 'center center';
						clone.style.backgroundColor = 'rgba(54, 58, 54, 0.79)';

						$("#clone").removeAttr("id");
					}
					else if (mouseTop > windowTwoTop && mouseTop < (windowTwoTop + 120) && mouseLeft > windowTwoLeft && mouseLeft < (windowTwoLeft + 120)) {
						document.getElementById("element-2").innerHTML = "";
						document.getElementById("element-2").appendChild(clone);
						clone.style.left = 0;
						clone.style.top = 0;
						clone.style.width = "100%";
						clone.style.height = "100%";
						$("#clone").removeAttr("id");
					}
					else {
						clone.remove();
					}
					// $(document.getElementById("element-1")).on("mouseenter", function () {
					// 	console.log($(this).firstChild);
					// 	var inform = document.getElementById("element-1").firstChild.getAttribute("name");
					// 	$("<div id='tooltip'>"+inform+"</div>").appendTo(document.getElementById("element-1").firstChild);
					// 	$("#tooltip").css("top", -10 + "px").css("left", 45 + "px");
					// }).on("mouseleave", function () {
					// 	$("#tooltip").remove();
					// });
					// $(document.getElementById("element-2")).on("mouseenter", function () {
					// 	var inform = document.getElementById("element-2").firstChild.getAttribute("name");
					// 	$("<div id='tooltip'>"+inform+"</div>").appendTo(document.getElementById("element-2").firstChild);
					// 	$("#tooltip").css("top", -10 + "px").css("left", 45 + "px");
					// }).on("mouseleave", function () {
					// 	$("#tooltip").remove();
					// });
				}
			}
		}
	};
	
	document.getElementById("mix").onclick = MixingFunc;
	
	/* Function for mixing of chosen elements */
	
	function MixingFunc () {
		if (document.getElementById("element-1").innerHTML != "" && document.getElementById("element-2").innerHTML != "") {
			var elem_box1 = document.getElementById("element-1");
			var elem_box2 = document.getElementById("element-2");
			var data1 = elem_box1.firstChild.getAttribute("data");
			var data2 = elem_box2.firstChild.getAttribute("data");
			var newData = parseInt(data1)  + parseInt(data2);
			if (MixCheck(newData)) {
				var mixResult = document.createElement('div');
				mixResult.classList.add("item");
				mixResult.style.backgroundImage = "url('images/" + newData + ".svg')";
				
				mixResult.style.width = "100%";
				mixResult.style.height = "100%";
				
				/* ANIMATION OF SUCCESS */
				elem_box1.setAttribute("id","anim_class_elem1");
				elem_box2.setAttribute("id","anim_class_elem2");
				
				document.getElementById("mix").style.display = 'none';
				document.getElementById("button_delete").style.display = 'none';
				document.getElementById("append").style.display = 'block';
				
				setTimeout( function () {
	
					document.getElementById("element_result").appendChild(mixResult);
					
					elem_box1.firstChild.remove();
					elem_box2.firstChild.remove();
					
					mixResult.setAttribute("data", ("" + newData));
					mixResult.setAttribute("name", ("" + library[newData]));
					
					
					// var appending = document.createElement("button");
					// document.getElementById("button_delete").remove();
					// document.getElementsByClassName("mix")[0].remove();
					// $("<button class=\"append btns\"><i class=\"glyphicon glyphicon-download-alt\"></i></button>")
					// 	.appendTo($('#pos-wrap'))
					$(document.getElementById("append")).on("click", function () {
						
						
						// appending.classList.add("mix");
						// document.getElementById('pos-wrap').appendChild(appending);
						// appending.innerHTML = "Append";
						
						// appending.onclick = function () {
						document.getElementById("slider_container").appendChild(mixResult);
						
						mixResult.style.width = null;
						mixResult.style.height = null;
						mixResult.style.position = null;
						
						WidthChange();
						
						$(mixResult).on("mouseenter", function () {
							var inform = $(this).attr("name");
							$("<div id='tooltip'>" + inform + "</div>").appendTo($(this));
							$("#tooltip").css("top", -10 + "px").css("left", 45 + "px");
						}).on("mouseleave", function () {
							console.log("out");
							$("#tooltip").remove();
						});
						// document.getElementsByClassName("append")[0].remove();
						elem_box1.setAttribute("id","element-1");
						elem_box2.setAttribute("id","element-2");
						// $("<button class=\"mix btns\"><i class=\"glyphicon glyphicon-link\"></i></button>" +
						// 	"<button id=\"button_delete\" class=\"btns\"><i class=\"glyphicon glyphicon-trash\"></i></button>").appendTo($('#pos-wrap')).on("click", MixingFunc);
						document.getElementById("mix").style.display = 'block';
						document.getElementById("button_delete").style.display = 'block';
						document.getElementById("append").style.display = 'none';
					});
				}, 2000);
			}
			
			else {
					/* ANIMATION OF FAIL */
				
				document.getElementById("element-1").firstChild.remove();
				document.getElementById("element-2").firstChild.remove();
			}
		}
	}
	
	/* Function for getting of object's coordinates */
	
	function getCoords(elem) {
		var box = elem.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}
	
	/* Function for checking of chosen elements */
	
	function MixCheck(data) {
		var array = document.getElementsByClassName("item");
		var flag = 0;
		for (var j = 0; j < correct.length; j ++) {
			if (data == correct[j]) {
				flag=0;
				break;
			}
			else
				flag++;
		}
		for (var i = 0; i < array.length; i++) {
			if (data == array[i].getAttribute("data")) {
				flag++;
			}
		}
		return flag == 0;
	}
	
	function WidthChange() {
		var items = document.getElementsByClassName("item");
		sliderWidth = ((items.length%2===0) ? (items.length/2)*90+25 : ((items.length+1)/2)*90+25);
		// $(father).css("width", sliderWidth + "px");
		$(elem).css("width", sliderWidth + "px");
	}
});