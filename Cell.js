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
      this_cell_obj.cell_adapter.click( this_cell_obj );
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
      this_cell_obj.cell_adapter.mouseover( this_cell_obj );
    });
    $cell.unbind('mouseout');
    $cell.mouseout(function(){
      this_cell_obj.cell_adapter.mouseout( this_cell_obj );
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