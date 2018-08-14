// Zed properties
var zed = document.getElementById("zed");
var q = document.getElementById("q");
var qSpeed = 1;

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
            // down arrow
            break;
        case "e":
            // left arrow
            break;
        case "r":
            // right arrow
    }
};

function myMove(spell, speed){
	var position = 0;
	var endPoint = 0;
	var index = 0;
		
	// determine current position of Zed
	var positionX = parseInt(zed.getAttribute("cx"));
	var positionY = parseInt(zed.getAttribute("cy"));
	
	// determine distance between Zed and the mouse
	var xDistance = (mouseX - positionX);
	var yDistance = (mouseY - positionY);
	
	// reset spell to Zed's position
	q.setAttribute("cx", String(positionX));
	q.setAttribute("cy", String(positionY));
		
	console.log("mouse position = ", mouseX, mouseY)
	console.log("ball position = ", positionX, positionY)
	console.log("distances = ", xDistance, yDistance)
	
	if (xDistance == 0) {
		position = positionY;
		endPoint = (positionY + yDistance);
		index = 0;
	}
	else if (yDistance == 0) {
		position = positionX;
		endPoint = (positionX + xDistance);
		index = 1;
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
	};
	
	var interval = setInterval(frame, speed);
	
	function frame() {
		if (position == endPoint) {
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