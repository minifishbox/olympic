/* 柱图组件对象 */

var H5ComponentBar =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  var item_rg=cfg.data[0][1];
  $.each(cfg.data,function(idx,item){

    var line = $('<div class="line">');
    var name = $('<div class="name">');
    var rate = $('<div class="rate">');
    var per = $('<div class="per">');

    var width = item[1]/item_rg*85 + '%';

    var  bgStyle = '';
    if( item[2] ){
      bgStyle = 'style="background-color:'+item[2]+'"';
    }

    rate.html( '<div class="bg" '+bgStyle+'></div>' );

    rate.css('width',width);

    name.text( item[0]);

    per.text(item[1]);

    line.append( name ).append( rate ).append( per );

    component.append(line);
  });

  return component;
}