var IPuristCarousel;
var PuristCarousel;

(function($){  
  
var DEFAULT_OPTIONS = {  
  // parameters
  viewport_width: 1000,
  cell_width: 200, // int
	cell_height: 200, // int
	slide_factor: 1, // int
	auto_cycle: false, // boolean
	auto_cycle_slide_factor: 5, // int
	pause_auto_cycle_on_hover: false, // boolean
	focus_cell_on_click: true, // boolean
	focus_area_x: 100,
	easing: 'easeInOutQuart',
	animation_duration: 750,

	// callbacks
	onCellClick: function( cell ){},
	onAnimationBegin: function( from_cell, to_cell ) {},
	onAnimationComplete: function( prev_cell, current_cell ) {},
	onMouseover: function( cell ) {},
	onMouseout: function( cell ) {}
};
  
IPuristCarousel = Class.extend({
  addCell: function( cell, render ) {},
  removeCell: function( cell ) {},
  removeCellByModelIndex: function( i ) {},
  autoCycleEnabled: function( boolean ) {},
  getCell: function(i){},
  
  next: function() {},
  prev: function() {},
  animateToCell: function( cell, on_animation_complete ) {}
});

PuristCarousel = IPuristCarousel.extend({
 
  init: function( options ){ 
    this.options = $.extend( {}, DEFAULT_OPTIONS, options );  
    this.cells = [];
    this.cells_container = $("<div></div>");
    this.cells_container.addClass("cells_container")
    this.current_cell = null;
    this.current_displaying_cell;
    this.prev_cell = null;
    this.displaying_cells = [];
    this.cells_container_x = 0;
  },
  
  getElement: function() {
    return this.cells_container;
  },
  
  addCell: function( cell, render ) {
    var this_carousel = this;
    
    var MyCellAdapter = PuristCarouselCellAdapter.extend({
      click:function( clicked_cell ) 
      {
        // fire developer's registered callback before the animation
        this_carousel.options.onCellClick( clicked_cell );
        
        if( this_carousel.options.focus_cell_on_click )
          this_carousel.animateToCellFromClick( clicked_cell, function() {
            //
          });
      },
      mouseover:function( clicked_cell ) {
        if( this_carousel.options.pause_auto_cycle_on_hover )
          this_carousel.autoCycleEnabled(false);
        
        // fire developer's registered callback
        this_carousel.options.onMouseover( clicked_cell );
      },
      mouseout:function( clicked_cell ) {
        // fire developer's registered callback
        this_carousel.options.onMouseover( clicked_cell );
        
        if( this_carousel.options.pause_auto_cycle_on_hover )
          if( this_carousel.options.auto_cycle )
            this_carousel.autoCycleEnabled(true);
      }
    });
      
    cell.setAdapter( new MyCellAdapter() );
    cell.setModelIndex( this.cells.length );
    cell.setColor( randomColor() );
    this.cells.push( cell );
    
    if( this.current_cell == null )
    {
      this.current_cell = cell;
      this.prev_cell = cell;
    }
    
    if( render )
      this.render( 0 ); // no shift
  },
  
  removeCell: function( cell ) {
    cell.detachFromDOM();
    this.cells.splice( cell.getModelIndex(), 1);
    this.render(0);
  },
  
  removeCellByModelIndex: function( i ) {
    return this.removeCell( this.cells[i] );
  },
  
  autoCycleEnabled: function( boolean ) { // turn on/off auto animation cycle
    
  },
  
  getCell: function( i ) {
    return this.cells[i];
  },
  
  next: function() {
    var i = this.current_cell.getModelIndex();
    var next_i = (i+this.options.slide_factor)%this.cells.length;
    this.animateToCell( this.cells[next_i], function(){});
  },
  
  prev: function() {
    var i = this.current_cell.getModelIndex();
    var safe_i = i + this.cells.length;
    var prev_i = (safe_i-this.options.slide_factor)%this.cells.length;
    this.animateToCell( this.cells[prev_i], function(){});
  },
  
  // findCellIndex: function( cell ) {
  //     for( var i=0; i<this.cells.length; i++ ) 
  //       if( this.cells[i] == cell )
  //         return i;
  //   
  //     return -1;
  //   },
  
  // shift: # of cells that while eventually shift. render prepares us for the shift.
  render: function( shift ) {
    this.cells_container.html('');
    
    var cell_width = this.options.cell_width;
    var focus_area_x = this.options.focus_area_x;
    var viewport_width = this.options.viewport_width;
    var inverse_focus_area_x = viewport_width - focus_area_x;
    var current_model_index = this.current_cell.getModelIndex();
    var cells_length = this.cells.length;
    var cells_left, cells_right;
    
    if( shift >= 0 ) // left -->
    {
      cells_left = Math.ceil( focus_area_x / cell_width );
      cells_right = Math.ceil( inverse_focus_area_x / cell_width ) + shift;  
    }
    else // right <--
    {
      cells_left = Math.ceil( focus_area_x / cell_width ) + Math.abs( shift );
      cells_right = Math.ceil( inverse_focus_area_x / cell_width ) ;
    }
    
    var total_rendered = cells_left + cells_right;
    
    var cells_container_x = focus_area_x - ( cells_left * cell_width );
    
    var displayIndexToModelIndex = function(x) { return Math.abs( ( current_model_index - cells_left + x ) % cells_length ); }
    
    this.displaying_cells = [];
    for( var i=0; i<total_rendered; i++ )
    {
      var model_index = displayIndexToModelIndex(i);
      console.log(model_index);
      var model = this.cells[ model_index ];
      var clone = model.clone();
      model.setDisplayIndex( i );
      clone.setDisplayIndex( i );
      //model.clone_ref = clone;
      this.displaying_cells.push( clone ); 
      this.cells_container.append( clone.render() );
    }
    
    this.cells_container_x = cells_container_x;
    this.cells_container.css( 'left', cells_container_x + "px" ); 
    this.cells_container.width( total_rendered * this.options.cell_width );
    
  },
  
  // using display indexes
  animateToCellFromClick: function( next_cell_model, on_animation_complete ) {
    
    var shift = next_cell_model.getDisplayIndex() - this.current_cell.getDisplayIndex();
    this.render( shift ); // currently support only left 
    
    for( var i=0; i<this.displaying_cells.length; i++ ) {
      this.displaying_cells[i].unbindHover();
      this.displaying_cells[i].unbindClick(); 
    }
        
    // fire developer's registered callback
    this.options.onAnimationBegin( this.current_cell, next_cell_model );
    
    // THE callback for after animation is complete
    var afterRotate = function() {};
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
  },
  
});

})(jQuery);