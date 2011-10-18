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

(function($){  


// 
// var load_count = 0;
// 
// $.getScript('Cell.js', function(data, textStatus){
//    //console.log(data); //data returned
//    //console.log(textStatus); //success
//    console.log('Cell.js loaded: ' + textStatus);
//    load_count++;
// });
// 
// $.getScript('PuristCarousel.js', function(data, textStatus){
//    //console.log(data); //data returned
//    //console.log(textStatus); //success
//    console.log('PuristCarousel.js loaded: ' + textStatus);
//    load_count++;
// });
//   
// console.log( 'running extension' );

$.fn.puristCarousel = function(options) {  
  
  var $viewport = this.first(); // only build carousel for first matched dom element (not the set)
  
  var carousel = new PuristCarousel(options);

  // configure css for viewport to ensure proper behavior
  $viewport.html('');
  $viewport.append( carousel.getElement() );
  
  return carousel;
};    
})(jQuery);