Utils = function() {}



Utils.convertToSlug = function(Text) {
  return Text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}