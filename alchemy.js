$(function(){
	document.onmousemove = function (e) {
		console.log(e.clientY);
		console.log(e.clientX);}
							/* Starting elements */
	
	for (var i = 0; i < 4; i++) {
		var boxes = document.getElementsByClassName("item");
		boxes[i].setAttribute("data", (i+1));
		boxes[i].style.backgroundColor = "transparent";
		boxes[i].style.backgroundImage = "url('images/" + (i+1) + ".png')"
	}
	
							/* Slider */
	
	var flag = 1;
	$("#slide-left").on("click", function(){
		if (flag <= 2) {
			$("#slider_container").animate({right: '+=1200px'}, 400);
			flag++
		}
	});
	
	$('#slide-right').on('click', function(){
		if (flag >= 2) {
			$('#slider_container').animate({right: '-=1200px'});
			flag--
		}
	});
	
							/* Array of receipts */
	
	var correct = [1, 2, 3, 4, 14, 21, 24, 31, 34, 121, 131, 224, 231, 424,
		1231, 2134, 31121, 32134, 42134, 312134, 424224, 442134, 1212134, 2311231,
		3142134, 13121343, 23142134, 31212134, 231212134, 2311212134, 23131212134,
		32134442134, 42422431212134];
	
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
			
							/* Drag n Drop: On Mouse Move */
			
			document.onmousemove = function (e) {
				clone.style.left = e.pageX - shiftX + 'px';
				clone.style.top = e.pageY - shiftY + 'px';
				console.log(e.clientY);
				console.log(e.clientX);
				
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
				}
			}
		}
	};
	
	document.getElementsByClassName("mix")[0].onclick = MixingFunc;
	
							/* Function for mixing of chosen elements */
	
	function MixingFunc () {
		if (document.getElementById("element-1").innerHTML != "" && document.getElementById("element-2").innerHTML != "") {
			var data1 = document.getElementById("element-1").firstChild.getAttribute("data");
			var data2 = document.getElementById("element-2").firstChild.getAttribute("data");
			
			if(correct.indexOf(+(data1  + data2)) !== -1){
				if (MixCheck(data1, data2)) {
					var mixResult = document.createElement('div');
					mixResult.classList.add("item");
					mixResult.style.backgroundImage = "url('images/" + data1 + "" + data2 + ".png')";
					
					mixResult.style.width = "100%";
					mixResult.style.height = "100%";
					document.getElementById("element_result").appendChild(mixResult);
					
					document.getElementById("element-1").firstChild.remove();
					document.getElementById("element-2").firstChild.remove();
					
					document.getElementById("element_result").firstChild.setAttribute("data", (data1 + "" + data2));
					MixContinue();
				}
				else
					MixStop();
			}
			else if(correct.indexOf(+(data2  + data1) !== -1)){
				if (MixCheck(data2, data1)) {
					var mixResult = document.createElement('div');
					mixResult.classList.add("item");
					mixResult.style.backgroundImage = "url('images/" + data2 + "" + data1 + ".png')";
					mixResult.style.width = "100%";
					mixResult.style.height = "100%";
					document.getElementById("element_result").appendChild(mixResult);
					document.getElementById("element-1").firstChild.remove();
					document.getElementById("element-2").firstChild.remove();
					document.getElementById("element_result").firstChild.setAttribute("data", (data2 + "" + data1));
					
					/* ANIMATION OF SUCCESS */
					
					MixContinue();
				}
				else
					MixStop();
			}
			
								/* Function for stopping of mixing after checking of chosen elements */
			
			function MixStop() {
				document.getElementById("element-1").firstChild.remove();
				document.getElementById("element-2").firstChild.remove();
				
				/* ANIMATION OF FAIL */
				
			}
			
								/* Function for continue of mixing after checking of chosen elements */
			
			function MixContinue() {
			
			var appending = document.createElement("button");
			document.getElementsByClassName("mix")[0].remove();
			appending.classList.add("mix");
			document.getElementById('pos-wrap').appendChild(appending);
			appending.innerHTML = "Append";
			
			appending.onclick = function () {
				document.getElementById("slider_container").appendChild(mixResult);
				mixResult.style.width = null;
				mixResult.style.height = null;
				mixResult.style.position = null;
				var mixing = document.createElement("button");
				document.getElementsByClassName("mix")[0].remove();
				mixing.classList.add("mix");
				document.getElementById('pos-wrap').appendChild(mixing);
				mixing.innerHTML = "Mix";
				mixing.onclick = MixingFunc;
				}
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
	
	function MixCheck(d1, d2) {
		var array = document.getElementsByClassName("item");
		var flag = 0;
		for (var j = 0; j < correct.length; j ++) {
			if (d1 + d2 == correct[j]) {
				flag=0;
				break;
			}
			else
				flag++;
		}
		for (var i = 0; i < array.length; i++) {
			if (d1 + d2 === array[i].getAttribute("data")) {
				flag++;
			}
		}
		return flag == 0;
	}
});