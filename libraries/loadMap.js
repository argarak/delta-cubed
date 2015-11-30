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

define(['jsiso/canvas/Control',
        'jsiso/canvas/Input',
        'jsiso/img/load',
        'jsiso/json/load',
        'jsiso/tile/Field',
        'jsiso/pathfind/pathfind',
        'requirejs/domReady!',
	'jquery'
       ],

       function(CanvasControl, CanvasInput, imgLoader, jsonLoader, TileField, pathfind) {    
	   return function(name) {	
	       var tiles = {
		   1: "(255, 255, 255, 1)",
		   0: "(2, 127, 129, 1)",
		   2: "(0, 0, 0, 1)",
		   3: "(255, 0, 0, 1)",
		   4: "(0, 255, 0, 1)"
	       }

	       var height = 30;
	       var width = 30;
	       
               var mapFile = $.ajax({
                   url: '/delta-cubed/maps/' + name + ".csv",
                   type: 'get',
                   async: false,
                   success: function(data) {
                       return data;
                   }
               }).responseText;

	       mapFile = mapFile.split('\n');
	       
	       var mapData = [[]];
	       var dataIndex = 0;
	      
	       for(var i = 0; i < mapFile.length; i++) {
		   mapFile[i] = mapFile[i].split(',');	   
	       }

	       for(var i = 0; i < mapFile.length; i++) {
		   for(var j = 0; j < mapFile[i].length; j++) {
		       if(mapFile[i][j] === "0") {
			   mapFile[i][j] = tiles[0];
		       } else if(mapFile[i][j] === "1") {
			   mapFile[i][j] = tiles[1];
		       } else if(mapFile[i][j] === "2") {
			   mapFile[i][j] = tiles[2];
		       } else if(mapFile[i][j] === "3") {
			   mapFile[i][j] = tiles[3];
		       } else if(mapFile[i][j] === "4") {
			   mapFile[i][j] = tiles[4];
		       }
		   }	   
	       }
	       
	       var map = mapFile;

	       var context = CanvasControl.create("canvas", $(window).width() - ($(window).width() / 20), $(window).height() - ($(window).height() / 20), {});
               var tileLayer = new TileField(context, CanvasControl().height, CanvasControl().width);
	       
	       tileLayer.setup({
		   layout: map,
		   isometric: false, // Flag used to layout grid in non isometric format
		   tileHeight: 20,
		   tileWidth: 20 // Try setting isometric to true and half tileWidth to 40, for an isometric map       
	       });

	       tileLayer.rotate('right');
	       tileLayer.flip("horizontal");
	       tileLayer.setOffset(($(window).width() / 2) - ((width / 2) * 20), ($(window).height() / 2) - ((height / 2) * 20));

	       var objectLayer = new TileField(context, CanvasControl().height, CanvasControl().width);

	       objectLayer.setup({
		   isometric: false,
		   layout: map,
		   tileHeight: 20,
		   tileWidth: 20
	       });
	       
               objectLayer.rotate('right');
	       objectLayer.flip("horizontal");
	       objectLayer.setOffset(($(window).width() / 2) - ((width / 2) * 20), ($(window).height() / 2) - ((height / 2) * 20));

	       this.tileLayer = tileLayer;
	       this.objectLayer = objectLayer;
	       this.width = width;
	       this.height = height;
	       this.context = context;
	       this.name = name;     
	   };
       });
