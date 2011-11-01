/******
*  = jquery.purist-carousel.js - dynamic slideshow of arbitrary html cells 
*                                and player controls
*  
*  Copyright (C) 2011 Johnny Diligente code@openear.net j.diligente@gmail.com 
*                     New York City,  United States of America
*  
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*  
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*  
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*  
*  ----
*  
*  = jquery.purist-carousel.js - dynamic slideshow of arbitrary html cells 
*                                and player controls
*  
*  Author Johnny Diligente code@openear.net j.diligente@gmail.com
*  
*  Copyright (C) 2011 Johnny Diligente code@openear.net j.diligente@gmail.com
*                     New York City,  United States of America
*                     For Kirshenbaum Bond Senecal, New York City
*
******/

var PuristCarouselCellModel;
var IPuristCarouselCellRenderer;

(function($){  

PuristCarouselCellModel = Class.extend({
	typeName: function() { return "PuristCarouselCellModel"; },
	
  init: function( cell_renderer ){
    this.renderer = cell_renderer;
    this.model_index = -1;
  },
  setAdapter: function (cell_adapter) {
    this.cell_adapter = cell_adapter;
  },
  setModelIndex: function( i ) {
    this.model_index = i;
  },
  getModelIndex: function() {
    return this.model_index;
  },
});

IPuristCarouselCellRenderer = Class.extend({
	typeName: function() { return "IPuristCarouselCellRenderer"; },
	
  render: function() {}
});

})(jQuery);
