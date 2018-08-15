// Zed properties
var zed = document.getElementById("zed");
var q = document.getElementById("q");
var qTwo = document.getElementById("q-two");
var w = document.getElementById("w");

// spell properties
var qSpeed = 1;
var wSpeed = 1;

// instantiate mouse coordinate variables
var mouseX;
var mouseY;

$(document).ready(function(){
    $(document).mousemove(function(event){
        mouseX = event.pageX;		
        mouseY = event.pageY;
	});
});

// log current mouse position within playing field and move zed to that position
function moveZed() {
	// move Zed
	zed.setAttribute("cx", mouseX);
	zed.setAttribute("cy", mouseY);
	q.setAttribute("cx", mouseX);
	q.setAttribute("cy", mouseY);
	
	console.log("zed update = " + mouseX, mouseY)
};

// detect button press and take appropriate action
document.onkeydown = function (e) {
    switch (e.key) {
        // if q is pressed, shoot out shuriken
		case "q":
			myMove(q, qSpeed);
            break;
        case "w":
            myMove(w, wSpeed);
            break;
        case "e":
            // left arrow
            break;
        case "r":
            // right arrow
    }
};

function myMove(spell, speed){
	// instantiate positions of Zed and his W
	var zedPosition = 0;
	var zedEndPoint = 0;
	var zedIndex = 0;
		
	var wPosition = 0;
	var wEndPoint = 0;
	var wIndex = 0;
		
	// determine current position of Zed and his W
	var zedX = parseInt(zed.getAttribute("cx"));
	var zedY = parseInt(zed.getAttribute("cy"));
	var wX = parseInt(w.getAttribute("cx"));
	var wY = parseInt(w.getAttribute("cy"));
	
	// determine distance between Zed and the mouse
	var zedDistanceX = (mouseX - zedX);
	var zedDistanceY = (mouseY - zedY);
	var wDistanceX = (mouseX - wX);
	var wDistanceY = (mouseY - wY);
	
	// instantiate distance ratios
	var zedRatio = 0;
	var wRatio = 0;
	
	// reset q positions
	q.setAttribute("cx", String(zedX));
	q.setAttribute("cy", String(zedY));
	qTwo.setAttribute("cx", String(zedX));
	qTwo.setAttribute("cy", String(zedY));
		
	console.log("mouse position = ", mouseX, mouseY)
	//console.log("ball position = ", positionX, positionY)
	//console.log("distances = ", xDistance, yDistance)
	
	zedIndex = checkRatio(zedPosition, zedX, zedY, zedDistanceX, zedDistanceY, zedEndPoint, zedRatio, zedIndex)[0];
	zedRatio = checkRatio(zedPosition, zedX, zedY, zedDistanceX, zedDistanceY, zedEndPoint, zedRatio, zedIndex)[1];
	wIndex = checkRatio(wPosition, wX, wY, wDistanceX, wDistanceY, wEndPoint, wRatio, wIndex)[0];
	wRatio = checkRatio(wPosition, wX, wY, wDistanceX, wDistanceY, wEndPoint, wRatio, wIndex)[1];
		
	var interval = setInterval(frame, speed);
	
	function frame() {
		
		
		if (position == endPoint || position == 300) {
			clearInterval(interval);
		}		
				
		else {
			if (position > endPoint) {
				position--;					
			}
			else {
				position++;
			}
			
			if (index == 2) {
				if (Math.abs(ratio) > 1) {
					spell.setAttribute("cx", String(position));
					spell.setAttribute("cy", String(positionY + ((position - positionX)/ratio)));				
				}
				else {
					spell.setAttribute("cy", String(position));
					spell.setAttribute("cx", String(positionX + ((position - positionY)*ratio)));
				}
			}
			else if (index == 0) {
				spell.setAttribute("cy", String(position));
			}
			else {
				spell.setAttribute("cx", String(position));
			}
		}
	}
};

function checkRatio(position, positionX, positionY, xDistance, yDistance, endPoint, ratio, index) {
	var returner = [];
	
	if (xDistance == 0) {
		position = positionY;
		endPoint = (positionY + yDistance);
		index = 0;
		returner = [index, 0];
	}
	else if (yDistance == 0) {
		position = positionX;
		endPoint = (positionX + xDistance);
		index = 1;
		returner = [index, 0];
	}
	else {
		var ratio = (xDistance/yDistance);
		
		if (Math.abs(ratio) > 1) {
			position = positionX;
			endPoint = (positionX + xDistance);
		}
		else {
			position = positionY;
			endPoint = (positionY + yDistance);
		}
		
		index = 2;
		returner = [index, ratio];
	};
		
	return returner;
};