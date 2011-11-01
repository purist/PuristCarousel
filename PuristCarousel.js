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

var IPuristCarousel;
var PuristCarousel;

(function($){	 
	
var DEFAULT_OPTIONS = {	 
	// parameters
	viewport_width: 1000,
	cell_width: 200, // int
	cell_height: 200, // int
	next_slide_factor: 3, // int
	prev_slide_factor: 1, // int
	// auto_cycle: false, // boolean
	//	auto_cycle_slide_factor: 5, // int
	pause_auto_cycle_on_hover: false, // boolean
	focus_cell_on_click: true, // boolean
	focus_area_x: 100,
	easing: 'easeInOutQuart',
	animation_duration: 400,

	// callbacks
	onCellClick: function( display_cell ){},
	onAnimationBegin: function( from_display_cell, to_display_cell ) {},
	onAnimationComplete: function( prev_display_cell, cur_display_cell ) {},
	onMouseover: function( display_cell ) {},
	onMouseout: function( display_cell ) {}
};
	
IPuristCarousel = Class.extend({
	typeName: function() { return "IPuristCarousel"; },

	addCell: function( model, do_render ) {},
	// removeCell: function( model ) {},
	//	 removeCellByModelIndex: function( i ) {},
	autoCycleEnabled: function( boolean ) {},
 
	//getModel: function(i){},
	//getDisplay: function(i){},

	next: function() {},
	prev: function() {},
	animateByShifting: function( shift, on_animation_complete ) {}
});

PuristCarousel = IPuristCarousel.extend({
 
	init: function( element, options ){ 
		this.options = $.extend( {}, DEFAULT_OPTIONS, options );	
		this.models = [];
		this.display_cells = [];
		this.current_model = null;
		this.current_display = null;
		this.prev_model = null;
		this.prev_display = null;

		var $c = $(element);
		$c.addClass("purist_cells_container");
		$c.css({
			position:'relative',
			left:'0px'
		});
		$c.height(this.options.cell_height);
		
		this.cells_container = $c;
		this.cells_container_x = 0;
	},
	
	getElement: function() {
		return this.cells_container;
	},

	randomColor: function () { 
		return '#'+(function(h){return new Array(7-h.length).join("0")+h})((Math.random()*(0xFFFFFF+1)<<0).toString(16)); 
	},
	
	addCell: function( model ) {
		model.setModelIndex( this.models.length );
		model.setColor( this.randomColor() );
		this.models.push( model );

		if( this.current_cell == null )
		{
			this.current_model = this.models[0];
			this.prev_model = this.models[0];
		}
	},
	
	// removeCell: function( model ) {
	//		 model.detachFromDOM();
	//		 this.models.splice( model.getModelIndex(), 1);
	//		 this.render(0);
	//	 },
	//	 
	//	 removeCellByModelIndex: function( i ) {
	//		 return this.removeCell( this.models[i] );
	//	 },
	
	// autoCycleEnabled: function( boolean ) { // turn on/off auto animation cycle
	//		 
	//	 },
	
	// getModel: function( i ) {
	//		 return this.models[i];
	//	 },
	
	next: function() {
		this.animateByShifting( this.options.next_slide_factor, function(){});
	},
	
	prev: function() {
		this.animateByShifting( -1 * this.options.prev_slide_factor, function(){});
	},

	createDisplayAdapter: function() {
		var this_carousel = this;
		
		var Adapter = IPuristCarouselDisplayAdapter.extend({
			click:function( display_cell ) 
			{
				// fire developer's registered callback before the animation
				this_carousel.options.onCellClick( display_cell );
				
				if( this_carousel.options.focus_cell_on_click )
					this_carousel.animateToDisplay( display_cell, function() {
						//
					});
			},
			mouseover:function( display_cell ) 
			{
				if( this_carousel.options.pause_auto_cycle_on_hover )
					this_carousel.autoCycleEnabled(false);
				
				// fire developer's registered callback
				this_carousel.options.onMouseover( display_cell );
			},
			mouseout:function( display_cell ) 
			{
				// fire developer's registered callback
				this_carousel.options.onMouseover( display_cell );
				
				if( this_carousel.options.pause_auto_cycle_on_hover )
					if( this_carousel.options.auto_cycle )
						this_carousel.autoCycleEnabled(true);
			}
		});

		return new Adapter();
	},
	
	// shift: # of cells that while eventually shift. render prepares us for the shift.
	render: function( shift ) {
		this.cells_container.html('');
		
		var cell_width = this.options.cell_width;
		var focus_area_x = this.options.focus_area_x;
		var viewport_width = this.options.viewport_width;
		var inverse_focus_area_x = viewport_width - focus_area_x;
		var current_model_index = this.current_model.getModelIndex();
		var cells_left, cells_right;
		
		if( shift >= 0 ) // left <--
		{
			cells_left = Math.ceil( focus_area_x / cell_width );
			cells_right = Math.ceil( inverse_focus_area_x / cell_width ) + shift;	 
		}
		else // right -->
		{
			cells_left = Math.ceil( focus_area_x / cell_width ) + Math.abs( shift );
			cells_right = Math.ceil( inverse_focus_area_x / cell_width ) ;
		}
		
		var total_rendered = cells_left + cells_right;
		var cells_container_x = focus_area_x - ( cells_left * cell_width );
		var models_length = this.models.length;

		var displayIndexToModelIndex = function(x) { return purist_modulus( ( current_model_index - cells_left + x ), models_length ); };
		
		this.display_cells = [];
		for( var i=0; i<total_rendered; i++ )
		{
			var model_index = displayIndexToModelIndex(i);
			var model = this.models[ model_index ];
			var display = new PuristCarouselCellDisplay();
			display.setModel( model );
			display.setDisplayAdapter( this.createDisplayAdapter() );
			display.setDisplayIndex( i );
			display.setColor( model.color );
			display.setWidth( this.options.cell_width );
			display.setHeight( this.options.cell_height );
			display.setElement( model.renderer.render() );
			this.display_cells.push( display ); 
			this.cells_container.append( display.getElement() );
		}
		
		this.current_display = this.display_cells[ cells_left ];
		this.cells_container_x = cells_container_x;
		this.cells_container.css( 'left', cells_container_x + "px" ); 
		this.cells_container.width( total_rendered * this.options.cell_width );
	},
	
	animateByShifting: function( shift, on_animation_complete ) {
		this.render( shift ); 

		for( var i=0; i<this.display_cells.length; i++ ) {
			this.display_cells[i].unbindHover();
			this.display_cells[i].unbindClick(); 
		}

		var cur_display_index = this.current_display.getDisplayIndex();
		var target_display_index = cur_display_index + shift;
		var target_display = this.display_cells[ target_display_index ];
		var target_model = target_display.model;
		
		// fire developer's registered callback
		//this.options.onAnimationBegin( this.current_cell, target_cell, this.current_displaying_cell.el, target_display_cell.el );
		this.options.onAnimationBegin( this.current_display, target_display );
		
		var this_carousel = this;
		// THE callback for after animation is complete
		var local_animation_complete = function() {
			this_carousel.prev_model = this_carousel.current_model;
			this_carousel.prev_display = this_carousel.current_display;
			this_carousel.current_model = target_model;
			this_carousel.current_display = target_display;
			
			for( var i=0; i<this_carousel.display_cells.length; i++ ) {
				this_carousel.display_cells[i].bindHover();
				this_carousel.display_cells[i].bindClick(); 
			}
						
			// fire callback, the one passed into animateToCell
			on_animation_complete();
			
			// fire developer's registered callback
			//this_carousel.options.onAnimationComplete( this_carousel.prev_cell, this_carousel.current_cell, cur_displaying_cell.el, target_display_cell.el );
			this_carousel.options.onAnimationComplete( this_carousel.prev_display, this_carousel.current_display );
		}
		
		var animation_target_x;
		var cells_container_x = this.cells_container_x;
		var shift_x = shift * this.options.cell_width;
		
		animation_target_x = cells_container_x - shift_x;
		
		this.cells_container.animate( {'left': animation_target_x + 'px'}, 
				{
					duration: this_carousel.options.animation_duration,
					easing: this_carousel.options.easing,
					complete: local_animation_complete,
					queue: true
				}
			);
	},
	
	// animateToModel: function( next_model, on_animation_complete ) {
	//		var next_i = 0;
	//		for( var i=0; i<this.displaying_cells.length; i++ ) 
	//			if( this.displaying_cells[i].model_ref == next_model )
	//			{ 
	//				next_i = i;
	//				break;
	//			}
	//			
	//		var shift = next_i - this.current_displaying_cell.getDisplayIndex();
	//		this.animateByShifting( shift, on_animation_complete );
	//	},
	
	animateToDisplay: function( next_cell, on_animation_complete ) {
		var next_i = next_cell.getDisplayIndex();
		var shift = next_i - this.current_display.getDisplayIndex();
		this.animateByShifting( shift, on_animation_complete );
	},
	
	// using display indexes
	animateToCellFromClick2: function( next_cell_model, on_animation_complete ) {
		
		var shift = next_cell_model.getDisplayIndex() - this.current_cell.getDisplayIndex();
		this.render( shift ); // currently support only left 
		
		for( var i=0; i<this.displaying_cells.length; i++ ) {
			this.displaying_cells[i].unbindHover();
			this.displaying_cells[i].unbindClick(); 
		}
				
		// fire developer's registered callback
		this.options.onAnimationBegin( this.current_cell, next_cell_model, this.current_displaying_cell.el );
		//target_display_cell.el );

		// THE callback for after animation is complete
		var this_carousel = this;
		var local_animation_complete = function() {
			this_carousel.prev_cell = this_carousel.current_cell;
			this_carousel.current_cell = next_cell_model;
			
			for( var i=0; i<this_carousel.displaying_cells.length; i++ ) {
				this_carousel.displaying_cells[i].bindHover();
				this_carousel.displaying_cells[i].bindClick(); 
			}
						
			// fire callback, the one passed into animateToCell
			on_animation_complete();
			
			// fire developer's registered callback
			this_carousel.options.onAnimationComplete( this_carousel.prev_cell, this_carousel.current_cell );
		}
		
		var animation_target_x;
		var cells_container_x = this.cells_container_x;
		var shift_x = shift * this.options.cell_width;
		
		animation_target_x = cells_container_x - shift_x;
		
		this.cells_container.animate( {'left': animation_target_x + 'px'}, 
				{
					duration: this_carousel.options.animation_duration,
					easing: this_carousel.options.easing,
					complete: local_animation_complete,
					queue: true
				}
			);
	}
	
});

})(jQuery);
