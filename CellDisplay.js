/******
*	 = jquery.purist-carousel.js - dynamic slideshow of arbitrary html cells 
*																 and player controls
*	 
*	 Copyright (C) 2011 Johnny Diligente code@openear.net j.diligente@gmail.com 
*											New York City,	United States of America
*	 
*	 This program is free software: you can redistribute it and/or modify
*	 it under the terms of the GNU General Public License as published by
*	 the Free Software Foundation, either version 3 of the License, or
*	 (at your option) any later version.
*	 
*	 This program is distributed in the hope that it will be useful,
*	 but WITHOUT ANY WARRANTY; without even the implied warranty of
*	 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the
*	 GNU General Public License for more details.
*	 
*	 You should have received a copy of the GNU General Public License
*	 along with this program.	 If not, see <http://www.gnu.org/licenses/>.
*	 
*	 ----
*	 
*	 = jquery.purist-carousel.js - dynamic slideshow of arbitrary html cells 
*																 and player controls
*	 
*	 Author Johnny Diligente code@openear.net j.diligente@gmail.com
*	 
*	 Copyright (C) 2011 Johnny Diligente code@openear.net j.diligente@gmail.com
*											New York City,	United States of America
*											For Kirshenbaum Bond Senecal, New York City
*
******/

var PuristCarouselCellDisplay;
var IPuristCarouselCellAdapter;

(function($){	 

PuristCarouselCellDisplay = Class.extend({
	typeName: function() { return "PuristCarouselCellDisplay"; },
	
	init: function( ){
		this.el = null;
		this.display_adapter = null;
		this.color = 0;
		this.display_index = -1;
		this.model = null;
		this.width = 0;
		this.height = 0;
	},
	setWidth: function(w) { 
		this.width = w;
	},
	setHeight: function(h) {
		this.height = h;
	},
	setElement: function( el ) {
		$el = $(el);
		this.el = $el.get(0);
		$el.css('background-color', this.color );
		$el.css('float', 'left' );
		$el.width( this.width );
		$el.height( this.height );
		this.bindHover();
		this.bindClick();
	},
	getElement: function() {
		return this.el;
	},
	// clone: function() {
	//		 var clone = new PuristCarouselCell( this.renderer );
	//		 clone.is_clone = true;
	//		 clone.el = this.el
	//		 clone.cell_adapter = this.cell_adapter;
	//		 clone.model_index = this.model_index;
	//		 clone.color = this.color;
	//		 clone.model_ref = this;
	//		 clone.width = this.width;
	//		 clone.height = this.height;
	//		clone.display_index = this.display_index;
	//		 return clone;
	//	 },
	setColor: function( color ) {
		this.color = color;
	},
	// isClone: function() {
	//		 return this.is_clone;
	//	 },
	setDisplayAdapter: function (display_adapter) {
		this.display_adapter = display_adapter;
	},
	setModel: function( m ) {
		this.model = m;
	},
	getModel: function() {
		return this.model;
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
		var $cell = $(this.el);
		var THIS = this;
		
		this.unbindClick();
		$cell.click(function(){ 
			THIS.display_adapter.click( THIS );
		});
	},
	unbindClick: function() {
		$(this.el).unbind('click');
	},
	bindHover: function() {
		var $cell = $(this.el);
		var THIS = this;
		
		// $cell.unbind('mouseover');
		//		 $cell.mouseover(function(){
		//			 THIS.cell_adapter.mouseover( THIS );
		//		 });
		//		 $cell.unbind('mouseout');
		//		 $cell.mouseout(function(){
		//			 THIS.cell_adapter.mouseout( THIS );
		//		 });

		this.unbindHover();
		
		$cell.hover( 
			function(){ THIS.display_adapter.mouseover( THIS ); } ,
			function(){ THIS.display_adapter.mouseout ( THIS ); }
			);
		
	},
	unbindHover: function() {
		var $cell = $(this.el);
		$cell.unbind('mouseover');
		$cell.unbind('mouseout');
	}
});

IPuristCarouselDisplayAdapter = Class.extend({
	typeName: function() { return "IPuristCarouselCellAdapter"; },
	
	click:function( display_cell ) {},
	
	mouseover:function( display_cell ) {},
	
	mouseout:function( display_cell ) {}
});

})(jQuery);

function purist_modulus( x, radix )
{
	if( Math.abs(x) == radix )
		return 0
		
	if( x >= 0 ) // cool beans
		return x % radix;
	
	else // javascript's interpretation of negative modulus sux?
		return radix + ( x % radix );
}