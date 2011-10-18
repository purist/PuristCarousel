function alert_hash(h)
{
	var out="";
	for(key in h)
	{	
		out = out + key + ":==" + h[key] + "\n";
	}
	alert(out);	
}

function rails_checkbox( input_name )
{
  var $rails_checkboxes = $("input[name='"+input_name+"']"); // should return 2 checkboxes

  if( $rails_checkboxes.length != 2 )
  {  
    alert( 'ERROR: E74296 there was a problem. Please contact the site webmaster.' );
    return false;
  }
  
  var $hidden_checkbox = $rails_checkboxes.filter("input[type=hidden]");  // can't use :hidden here because jqTransform has 'hidden' the other checkbox thus it would be included in this search
  var $visible_checkbox = $rails_checkboxes.filter(":checkbox");
  
  $hidden_checkbox.val( $visible_checkbox.val() ); // this line is not neccessary. rails will figure this out.
  
  return $visible_checkbox;
}

function sync_from_jqtransform_checkbox( $checkbox )
{
  var $jq_checkbox = $checkbox.closest('.jqTransformCheckboxWrapper').find('.jqTransformCheckbox');
  
  if( $jq_checkbox.hasClass('jqTransformChecked') )
    $checkbox.val( 1 );
  else
    $checkbox.val( 0 );
}

function randomIndexFromCollection( collection )
{
	return Math.floor( Math.random() * collection.length );
}

function randomItemFromCollection( collection )
{
  var i = randomIndexFromCollection( collection );
  return collection[i];
}

function jdconsole(s)
{
  if( $("#oeconsole").length < 1)
  {
    $("body").append('<div id="oeconsole" style="width:400px;height:400px;position:absolute;top:0px;left:0px;font-size:10px;font-family:monospace"/>');
  }
  
  var h = $("#oeconsole").html() + "<br/>";
  $("#oeconsole").html(h+s);
}

$.fn.hasAttr = function(name) { 
  var attr = this.attr(name);
  return (typeof attr !== 'undefined' && attr !== false && attr !== undefined );
  //return this.attr(name) !== undefined;
};

function isNull( v ) { 
  return (typeof v == 'undefined' || v === undefined || v == null );
};

function randomInt(MAX)
{
  return Math.floor( Math.random()*MAX );
}

function popup( url, _width, _height, name )
{
  var left   = ($(window).width()  - _width)  / 2,
      top    = ($(window).height() - _height) / 2,
      opts   = 'status=1' +
               'resizable=1' +
               ',width='  + _width  +
               ',height=' + _height +
               ',top='    + top    +
               ',left='   + left;

  window.open( url, name + randomInt(1000), opts );
}

function jquery_validator_validate_rails_checkbox(value, element) 
{
  var input_name = $(element).attr('name');
  
  var $rails_checkbox = rails_checkbox( input_name );
  sync_from_jqtransform_checkbox( $rails_checkbox );
  
  return ($rails_checkbox.val()>0);
}

function textbox_reset_to_default_state_when_empty_behavior( $el, empty_state )
{
  $el.focus(function(){
    if( $(this).val() == empty_state )
      $(this).val("");
  });
  $el.blur(function(){
    if( $(this).val() == "" )
      $(this).val(empty_state);
  });
}


function remove_leading_space( string )
{
  string = string.replace(/^\n+/g, '');
  return string.replace(/^\s+/g, '');
}
function remove_trailing_space( string )
{
  string = string.replace(/\n+$/g, '');
  return string.replace(/\s+$/g, '');
}
function chomp( string )
{
  string = remove_leading_space( string );
  return remove_trailing_space( string );
}
function remove_repeated_white_space( string )
{
  string = string.replace(/\n+/g, '\n');
  return string.replace(/ +/g, ' ');
}
function convert_2_unix_newlines( string )
{
  return string.replace(/\r\n/g, '\n');
} 

// Extend the String prototype to include a splice method.
// This will use an Array-based splitting / joining approach
// internally.
String.prototype.splice = function( index,howManyToDelete,stringToInsert ) /* [, ... N-1, N] */
{
 
  // Create a character array out of the current string
  // by splitting it. In the context of this prototype
  // method, THIS refers to the current string value
  // being spliced.
  var characterArray = this.split( "" );
 
  // Now, let's splice the given strings (stringToInsert)
  // into this character array. It won't matter that we
  // are mix-n-matching character data and string data as
  // it will utlimately be joined back into one value.
  //
  // NOTE: Because splice() mutates the actual array (and
  // returns the removed values), we need to apply it to
  // an existing array to which we have an existing
  // reference.
  Array.prototype.splice.apply(
  characterArray,
  arguments
  );
 
  // To return the new string, join the character array
  // back into a single string value.
  return(
  characterArray.join( "" )
  );
 
};

function randomColor() 
{
  return '#'+(function(h){return new Array(7-h.length).join("0")+h})((Math.random()*(0xFFFFFF+1)<<0).toString(16));
  //'#'+(Math.random()*0xFFFFFF<<0).toString(16);;
}

function merge(_default, override)
{
  var merge = {};
  for (var prop in _default) 
    if ( _default.hasOwnProperty(prop) ) 
      merge[prop] = _default[prop];
    
  for (var prop in override) {
    if ( override.hasOwnProperty(prop) ) 
      merge[prop] = override[prop];
      
    console.log(prop)
  }
 
  return merge;
}

function purist_modulus( x, radix )
{
  if( x >= 0 ) // cool beans
    return x % radix;
  
  else // javascript's interpretation of negative modulus sux?
    return radix + ( x % radix );
}