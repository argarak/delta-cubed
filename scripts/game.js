/*
  Copyright (c) Jakub Kukiełka

  This file is part of delta-cubed.

  Delta-cubed is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Delta-cubed is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with delta-cubed.  If not, see <http://www.gnu.org/licenses/>.
*/

function begin() {
    require([
	'jquery',
	'loadMap',
	'createCharacter',
	'jsiso/canvas/Control',
	'jsiso/img/load',
	'jsiso/canvas/Input',
	'requirejs/domReady!',
	'howler',
	'jsiso/pathfind/pathfind'
    ], function($, Map, Character, CanvasControl, imgLoad, CanvasInput, ready, howler, pathfind) {

	console.log(pathfind)
	
	// Remove menu so that the game can start
	$('.menu').remove();

	$('body').css('background', '#000');
	
	// -- FPS --------------------------------
	window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame  || 
		window.mozRequestAnimationFrame     || 
		window.oRequestAnimationFrame       ||  
		window.msRequestAnimationFrame      || 
		function(callback, element) {
		    window.setTimeout(callback, 1000 / 60);
		};
	})();
	// ---------------------------------------

	// Load new level
	var aoe = new Map('level_aoe');
	var tri = new Character("Triangle", null, 1, 25);
	
	// objectLayer and tileLayer defined by Map class
	var images = [
	    {
		graphics: [
		    "/delta-cubed/assets/tri.png"
		]	        
	    }          
	];

	var background = new Howl({
	    urls: ['/delta-cubed/music/pod.ogg']
	}).play();
	
	// Main game loop function
	function loop() {
	    if(aoe.name = 'level_aoe' && tri.x === 26 && tri.y === 3) {
		aoe = new Map('level_uid')
		$('#canvas').remove();
		
	    }
	    for(var y = 0; y < aoe.height; y++) {
		for(var x = 0; x < aoe.width; x++) {
		    aoe.tileLayer.draw(x ,y);               
		    if (x === tri.x && y === tri.y) {
			aoe.objectLayer.draw(x, y, tri.image);	            
		    }
		}
	    }
	}

	imgLoad(images).then(function(imgResponse) {
	    tri.image = imgResponse[0].files["tri.png"];
	    loop(); 
	});
	
	// Keyboard events
	var input = new CanvasInput(document, CanvasControl());

	input.mouse_action(function(coords) {

	    var offset = aoe.tileLayer.getOffset();

	    var t = aoe.tileLayer.applyMouseFocus(coords.x - offset.x, coords.y - offset.y);
	    // Apply mouse rollover via mouse location X & Y

	    pathfind(1, [tri.x, tri.y], [t.x, t.y], aoe.objectLayer.getLayout()).then(function(data) {
		console.log(tri.x, tri.y, t.x, t.y, data);
	    });
            
	});
	
	input.keyboard(function(pressed, keydown) {
	    if (!keydown) {
		switch(pressed) {
		// Move character
		case 37:
		    tri.x--;
		    break;
		case 39:
		    tri.x++;
		    break;
		case 40:
		    tri.y++;
		    break;
		case 38:
		    tri.y--;
		    break;
		}
		console.log(tri.x, tri.y)
		// Call draw Tile Map function
		loop();		        
	    }
	          
	});
    });
}
