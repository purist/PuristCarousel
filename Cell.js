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

var PuristCarouselCell;
var PuristCarouselCellAdapter;
var PuristCarouselCellRenderer;

(function($){  

PuristCarouselCell = Class.extend({
  init: function( cell_renderer ){
    this.is_clone = false;
    this.renderer = cell_renderer;
    this.el = null;
    this.cell_adapter = null;
    this.model_index = -1;
    this.color = 0;
    this.display_index = -1;
    this.model_ref = null;
    
  },
  render: function(){
    $el = $(this.renderer.render());
    this.el = $el;
    $el.css('background-color', this.color );
    this.bindHover();
    this.bindClick();
    return $el;
  },
  clone: function() {
    var clone = new PuristCarouselCell( this.renderer );
    clone.is_clone = true;
    clone.el = this.el
    clone.cell_adapter = this.cell_adapter;
    clone.model_index = this.model_index;
    clone.color = this.color;
    clone.model_ref = this;
    return clone;
  },
  setColor: function( color ) {
    this.color = color;
  },
  isClone: function() {
    return this.is_clone;
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
  setDisplayIndex: function( i ) {
    this.display_index = i;
  },
  getDisplayIndex: function() {
    return this.display_index;
  },
  detachFromDOM: function() {
    this.el.remove();
  },
  bindClick: function() {
    var $cell = this.el;
    var this_cell_obj = this;
    
    $cell.unbind('click');
    $cell.click(function(){ 
      this_cell_obj.cell_adapter.click( this_cell_obj.model_ref );
    });
  },
  unbindClick: function() {
    this.el.unbind('click');
  },
  bindHover: function() {
    var $cell = this.el;
    var this_cell_obj = this;
    
    $cell.unbind('mouseover');
    $cell.mouseover(function(){
      this_cell_obj.cell_adapter.mouseover( this_cell_obj.model_ref );
    });
    $cell.unbind('mouseout');
    $cell.mouseout(function(){
      this_cell_obj.cell_adapter.mouseout( this_cell_obj.model_ref );
    });
  },
  unbindHover: function() {
    this.el.unbind('mouseover');
    this.el.unbind('mouseout');
  }
});

PuristCarouselCellAdapter = Class.extend({
  click:function( cell ) {},
  
  mouseover:function( cell ) {},
  
  mouseout:function( cell ) {}
});

PuristCarouselCellRenderer = Class.extend({
  render: function() {}
});

})(jQuery);