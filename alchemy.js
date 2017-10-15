$(function(){
	var sliderWidth = 0,
		libraryItems = 0,
		text_for_anim = document.getElementById("new-elem-name"),
		mix_button = document.getElementById("mix"),
		del_button = document.getElementById("button_delete"),
		append_button = document.getElementById("append"),
		box_1 = document.getElementById("element-1"),
		box_2 = document.getElementById("element-2"),
		counting = document.getElementById("count"),
		elems_quantity = 4,
		drag_type = true,
		library_off = true,
		setting_off = true,
		library_first = true,
		setting_first = true;
	
				/* Array of receipts */
	
	var library = {1000:"Fire",100:"Air",10:"Ground",1:"Water",2000:"Energy",1100:"Smoke",1010:"Lava",1001:"Steam",200:"Pressure",
		101:"Mist",20:"Land",11:"Mud",2:"Lake",1110:"Stone",1012:"Geyser",1020:"Vulcan",2110:"Brick",1210:"Sand",1120:"Mountain",
		40:"Planet",4:"Ocean",1220:"Explosion",1121:"Clay",1122:"River",4220:"Wall",1014:"Primordial soup", 2420:"Desert",80:"Solar System",
		2034:"Life",2044:"Plant",2035:"Plankton",2054:"Tree",6142:"Animal",5342:"Dam",3155:"Human",4155:"Firefighter", 4840:"Oasis",160:"Galaxy",
		4265:"Tool",7441:"Cart",28991:"Leather",9852:"Steam engine",11072:"Combustion engine",11361:"Sheep",3475:"Science",320:"Universe",
		12807:"Engineer",6495:"Iron ore",7495:"Metal",10659:"Axe",23732:"Tractor",16100:"Sword",26111:"Motorcycle",8705:"Gold",8605:"Blade",
		28571:"Wool",5219:"Field",36486:"Armor",5375:"Hummer",3235:"Astronaut",18513:"Car",54999:"Tank",17210:"Scissors",9652:"Machine",
		30615:"Cotton",61230:"Thread",6310:"Love",5199:"Farmer",5387:"Cycle",15039:"Bicycle",11341:"Livestock",3144:"Tobacco",6144:"Frog",
		8440:"House",24726:"Cow",17145:"Bank",6242:"Bird",17583:"Chicken",35166:"Egg", 4108:"Forest", 13385:"Grass",17293:"Train",1040:"Sun",
		2240:"Mountain range",2100:"Heat",16880:"Village",3040:"Solar cell",4080:"Electricity",7235:"Electrician",33760:"City",122460:"Rope",
		124514:"Bow",19255:"Warrior",2210:"Glass",3251:"Prism",18604:"Wheat",37208:"Flour",37209:"Dough",3054:"Campfire",55741:"Knight",6209:"Story",
		61950:"Fairy tale",68159:"Legend",71314:"Hero",84259:"Excalibur",1044:"Cloud",2088:"Sky",2128:"Atmosphere",3198:"Moon",3044:"Storm",
		1045:"Rain",2165:"Snow",29925:"Milk",32090:"Ice-cream",5386:"Pottery",8541:"Potter",2055:"Swamp",2255:"Peat",2455:"Coal",9950:"Steel"};
	
	for (var key in library) {
		var str = $("<p>"+ library[key] +"</p>").appendTo($("#library_box"));
		$(str).attr("id", "key"+key);
		libraryItems++;
	}
	var libraryHeight = libraryItems*30+10;
	
				/* Starting elements */
	
	for (var i = 0; i < 4; i++) {
		var boxes = document.getElementsByClassName("item");
		boxes[i].setAttribute("data", ""+ (Math.pow(10,3-i)));
		boxes[i].setAttribute("name", library[(Math.pow(10,3-i))]);
		boxes[i].style.backgroundColor = "transparent";
		boxes[i].style.backgroundImage = "url('images/" + (Math.pow(10,3-i)) + ".svg')"
		$("#key"+(Math.pow(10,3-i))).remove();
		libraryHeight -= 25;
	}
	
	$(".item").on("mouseenter", function () {
		var inform = $(this).attr("name");
		$("<div id='tooltip'>"+inform+"</div>").appendTo($(this));
		$("#tooltip").css("top", 62 + "px").css("left", 35 + "px");
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
	
					/* Library slider */
	
	var library_box = document.getElementById("library_external");
	var elem_library = document.getElementById("library_box");
	var delta_library = 0;
	addOnWheel(library_box, function(e) {
		if (parseInt($(elem_library).css("height")) >= parseInt($(library_box).css("height"))) {
			delta_library += e.deltaY|| e.detail || e.wheelDelta / 4;
			var limit = parseInt($(library_box).css("height"))-libraryHeight;
			if (delta_library <= 10 && delta_library > limit)
				$(elem_library).css("top", delta_library + "px");
			else if (delta_library > 10) {
				delta_library = 10;
				$(elem_library).css("top", delta_library + "px");
			}
			else {
				delta_library = limit;
				$(elem_library).css("top", delta_library + "px");
			}
		}
		else {
		
		}
	});
	
							/* Buttons */
	
		del_button.onclick = function () {
			box_1.innerHTML = "";
			box_2.innerHTML = "";
		};
		
		settings.onclick = function () {
			if (setting_first) {
				document.getElementById("setting_external").setAttribute("id", "setting_external_anim");
				setting_first = false;
			}
			else {
				if (!setting_off) {
					document.getElementById("setting_external_anim_back").setAttribute("id", "setting_external_anim");
				}
				else {
					document.getElementById("setting_external_anim").setAttribute("id", "setting_external_anim_back");
				}
				setting_off = !setting_off;
			}
		};
		
		switcher.onclick = function () {
			
			if (drag_type) {
				document.getElementsByClassName("pref")[0].innerHTML = "Drag'n'drop";
				this.setAttribute("id", "switcher-rotate");
			}
			else if (!drag_type) {
				document.getElementsByClassName("pref")[0].innerHTML = "Onclick";
				this.setAttribute("id", "switcher");
			}
			drag_type = !drag_type;
		};
		
		document.getElementById("library").onclick = function () {
			if (library_first) {
				document.getElementById("library_external").setAttribute("id", "library_box_anim");
				library_first = false;
			}
			else {
				if (!library_off) {
					document.getElementById("library_box_anim_back").setAttribute("id", "library_box_anim");
				}
				else {
					document.getElementById("library_box_anim").setAttribute("id", "library_box_anim_back");
				}
				library_off = !library_off;
			}
		};
	document.onmousemove = function(e) {
		Dragging(e);
	};
	
				/* Onclick */
				
	var click_num = 1;
	slider.onclick = function () {
		if (drag_type) {
			if (event.target.className === "item") {
				if (click_num === 1) {
					var clone_data = $(event.target).attr("data");
					$("<div id='clone'></div>").appendTo(box_1).attr("data", clone_data);
					var clone = document.getElementById("clone");
					clone.style.backgroundImage = "url('images/" + clone_data + ".svg')";
					box_1.innerHTML = "";
					box_1.appendChild(clone);
					clone.style.left = 0;
					clone.style.top = 0;
					clone.style.width = "100%";
					clone.style.height = "100%";
					clone.style.backgroundSize = "70% 70%";
					clone.style.backgroundRepeat = "no-repeat";
					clone.style.backgroundPosition = 'center center';
					clone.style.backgroundColor = '#3c2f2f';
					$("#clone").removeAttr("id");
					click_num++;
				}
				else if (click_num === 2) {
					var clone_data = $(event.target).attr("data");
					$("<div id='clone'></div>").appendTo(box_2).attr("data", clone_data);
					var clone = document.getElementById("clone");
					clone.style.backgroundImage = "url('images/" + clone_data + ".svg')";
					box_2.innerHTML = "";
					box_2.appendChild(clone);
					clone.style.left = 0;
					clone.style.top = 0;
					clone.style.width = "100%";
					clone.style.height = "100%";
					clone.style.backgroundSize = "70% 70%";
					clone.style.backgroundRepeat = "no-repeat";
					clone.style.backgroundPosition = 'center center';
					clone.style.backgroundColor = '#3c2f2f';
					$("#clone").removeAttr("id");
					click_num = 1;
				}
			}
		}
	};
	
				/* Drag n Drop: On Mouse Down */
	
	slider.onmousedown = function(){
		if (!drag_type) {
			if (event.target.className === "item") {
				var coords = getCoords(event.target);
				var shiftX = event.pageX - coords.left;
				var shiftY = event.pageY - coords.top;
				var clone_data = $(event.target).attr("data");
				$("<div id='clone'></div>").appendTo("body").attr("data", clone_data);
				var clone = document.getElementById("clone");
				clone.style.backgroundImage = "url('images/" + clone_data + ".svg')";
				
				clone.style.position = 'absolute';
				clone.style.zIndex = 1000;
				
				
				/* Drag n Drop: On Mouse Move */
				
				document.onmousemove = function (e) {
					clone.style.left = e.pageX - shiftX + 'px';
					clone.style.top = e.pageY - shiftY + 'px';
					Dragging(e);
					
					/* Drag n Drop: On Mouse Up */
					
					clone.onmouseup = function () {
						document.onmousemove = null;
						clone.onmouseup = null;
						var mouseTop = e.clientY;
						var mouseLeft = e.clientX;
						var windowOneTop = getCoords(box_1).top;
						var windowTwoTop = getCoords(box_2).top;
						var windowOneLeft = getCoords(box_1).left;
						var windowTwoLeft = getCoords(box_2).left;
						
						if (mouseTop > windowOneTop && mouseTop < (windowOneTop + 120) && mouseLeft > windowOneLeft && mouseLeft < (windowOneLeft + 120)) {
							box_1.innerHTML = "";
							box_1.appendChild(clone);
							clone.style.left = 0;
							clone.style.top = 0;
							clone.style.width = "100%";
							clone.style.height = "100%";
							clone.style.backgroundSize = "70% 70%";
							clone.style.backgroundRepeat = "no-repeat";
							clone.style.backgroundPosition = 'center center';
							clone.style.backgroundColor = '#380128';
							
							$("#clone").removeAttr("id");
						}
						else if (mouseTop > windowTwoTop && mouseTop < (windowTwoTop + 120) && mouseLeft > windowTwoLeft && mouseLeft < (windowTwoLeft + 120)) {
							box_2.innerHTML = "";
							box_2.appendChild(clone);
							clone.style.left = 0;
							clone.style.top = 0;
							clone.style.width = "100%";
							clone.style.height = "100%";
							clone.style.backgroundSize = "70% 70%";
							clone.style.backgroundRepeat = "no-repeat";
							clone.style.backgroundPosition = 'center center';
							clone.style.backgroundColor = '#380128';
							$("#clone").removeAttr("id");
						}
						else {
							clone.remove();
						}
						document.onmousemove = function (e) {
							Dragging(e);
						}
					}
				}
			}
		}
	};
	
	mix_button.onclick = MixingFunc;
	
				/* Function for mixing of chosen elements */
	
	function MixingFunc () {
		click_num = 1;
		if (box_1.innerHTML != "" && box_2.innerHTML != "") {
			var data1 = box_1.firstChild.getAttribute("data");
			var data2 = box_2.firstChild.getAttribute("data");
			var newData = parseInt(data1)  + parseInt(data2);
			if (MixCheck(newData)) {
				var mixResult = document.createElement('div');
				
				mixResult.classList.add("item");
				mixResult.style.backgroundImage = "url('images/" + newData + ".svg')";
				
				mixResult.style.width = "100%";
				mixResult.style.height = "100%";
				
				/* ANIMATION OF SUCCESS */
				
				box_1.setAttribute("id","anim_class_elem1");
				box_2.setAttribute("id","anim_class_elem2");
				
				mix_button.style.display = 'none';
				del_button.style.display = 'none';
				
				
				setTimeout( function () {
					$("#key"+newData).remove();
					libraryHeight -= 30;
					counting.innerHTML = ($(".item").length+1) + "/" + libraryItems;
					append_button.style.display = 'block';
					document.getElementById("element_result").appendChild(mixResult);
					box_1.firstChild.remove();
					box_2.firstChild.remove();
					text_for_anim.innerHTML = ""+ library[newData];
					mixResult.setAttribute("data", ("" + newData));
					mixResult.setAttribute("name", ("" + library[newData]));
					
					$(mixResult).on("mouseenter", function () {
						var inform = mixResult.getAttribute("name");
						var df = document.createElement("div");
						mixResult.appendChild(df);
						df.setAttribute("id", "tooltip");
						df.innerHTML = inform;
						$("#tooltip").css("top", 62 + "px").css("left", 35 + "px");
					}).on("mouseleave", function () {
						$("#tooltip").remove();
					});
					
					$(append_button).on("click", function () {
						document.getElementById("slider_container").appendChild(mixResult);
						
						mixResult.style.width = null;
						mixResult.style.height = null;
						mixResult.style.position = null;
						
						WidthChange();
						
						box_1.setAttribute("id","element-1");
						box_2.setAttribute("id","element-2");
						
						text_for_anim.innerHTML = "";
						
						mix_button.style.display = 'block';
						del_button.style.display = 'block';
						append_button.style.display = 'none';
						elems_quantity++;
					});
				}, 2000);
			}
			
			else {
					/* ANIMATION OF FAIL */
				
				text_for_anim.innerHTML = "Fail!";
				text_for_anim.classList.add("fail_anim_class");
				mix_button.style.display = 'none';
				del_button.style.display = 'none';
				
				setTimeout(function () {
					text_for_anim.innerHTML = "";
					box_1.firstChild.remove();
					box_2.firstChild.remove();
					text_for_anim.classList.remove("fail_anim_class");
					mix_button.style.display = 'block';
					del_button.style.display = 'block';
				}, 1000);
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
		for (var key in library){
			if (data == key) {
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
		$(elem).css("width", sliderWidth + "px");
	}

				/* Function for infinite mousemove work with element's boxes*/
	
	function Dragging (e) {
			var windowOneTop = getCoords(box_1).top;
			var windowTwoTop = getCoords(box_2).top;
			var windowOneLeft = getCoords(box_1).left;
			var windowTwoLeft = getCoords(box_2).left;
			var mouseTop = e.clientY;
			var mouseLeft = e.clientX;
			
			if (mouseTop > windowOneTop && mouseTop < (windowOneTop + 120) && mouseLeft > windowOneLeft && mouseLeft < (windowOneLeft + 120)) {
				
				$('#element-1').css({
					borderRadius: "50%",
					backgroundColor: "#4c4242",
					transform: "scale(1.1)",
					transition: " 0.5s"
				});
			}
			else if (mouseTop > windowTwoTop && mouseTop < (windowTwoTop + 120) && mouseLeft > windowTwoLeft && mouseLeft < (windowTwoLeft + 120)) {
				$('#element-2').css({
					borderRadius: "50%",
					backgroundColor: "#4c4242",
					transform: "scale(1.1)",
					transition: " 0.5s"
				});
			}
			else {
				$('#element-1').css({
					transform: "scale(1)",
					backgroundColor: "#3c2f2f",
					transition: "0.7s"
				});
				$('#element-2').css({
					transform: "scale(1)",
					backgroundColor: "#3c2f2f",
					transition: "0.7s"
				});
			}}
	
});


