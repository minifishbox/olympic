/* 柱图组件对象 */

var H5ComponentPolyline =function ( name, cfg ) {
  var component =  new H5ComponentBase( name ,cfg );
  
  //  绘制网格线 - 背景层
  var w = cfg.width;//获得组建宽高
  var h = cfg.height;

  //  加入一个画布（网格线背景）
  var cns = document.createElement('canvas');    //创建画布canvas元素（做网格线的背景）

  var ctx = cns.getContext('2d');//获得画布对象
  cns.width = ctx.width = w;
  cns.height = ctx.height =h;

    //将画布cns元素添加到component
  component.append(cns);

  //  水平网格线  100 份 -> 10份(根据等距分)
  var step = 10;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#AAAAAA";

  window.ctx = ctx;//将ctx这个队形暴露到windows全局对象中

  for( var i=0;i<step;i++){
    var y = (h/step) * i;
    ctx.moveTo(0,y);//画笔定位
    ctx.lineTo(w,y);//划线
  }

  //  垂直网格线（根据项目的个数去分）
  step  = cfg.data.length+1;
  
  var text_w = w/step >> 0;

  for(var i=0;i<step;i++){
      var x = (w/step)*i;
      ctx.moveTo(x,0);//定位
      ctx.lineTo(x,h);//划线
        //绘制项目文本
      if( cfg.data[i]){//判断是否有数据
        var text = $('<div class="text">');//创建文本元素
        text.text( cfg.data[i][0] );//写入文本
        text.css('width',text_w/2).css('left',(x/2 - text_w/4) + text_w/2 );
        component.append(text);//将创建的文本元素添加到component中
      }
  }

  ctx.stroke();//封笔

  // //  加入画布 - 数据层
  // var cns = document.createElement('canvas');
  // var ctx = cns.getContext('2d');
  // cns.width = ctx.width = w;
  // cns.height = ctx.height =h;
  // component.append(cns);
  //
  // /**
  //  * 绘制折现以及对应的数据和阴影
  //  * @param  {floot} per 0到1之间的数据，
  //  * 会根据这个值绘制最终数据对应的中间状态
  //  * @return {DOM}     Component元素
  //  */
  // var draw = function( per ){
  //
  //   //  清空画布   ，防止重叠
  //   ctx.clearRect(0,0,w,h);
  //
  //   //  绘制折线数据
  //   ctx.beginPath();
  //   ctx.lineWidth = 3;
  //   ctx.strokeStyle = "#ff8878";
  //
  //   var x = 0;
  //   var y = 0;
  //   var row_w = ( w / (cfg.data.length+1) );
  //
  //   //  画点
  //   for( i in cfg.data){
  //       var item = cfg.data[i];//拿出当前数据
  //       x = row_w * i +row_w;
  //       y = h-(item[1]/100*h*per);
  //       ctx.moveTo(x,y);
  //       ctx.arc(x,y,5,0,2*Math.PI);
  //   }
  //   //  连线
  //     //  移动画笔到第一个数据的点位置
  //     ctx.moveTo( row_w ,h-(cfg.data[0][1]/100*h*per) );
  //     //遍历连接下面的点
  //     for( i in cfg.data){
  //           var item = cfg.data[i];
  //           x = row_w * i +row_w;
  //           y = h-(item[1]/100*h*per);
  //           ctx.lineTo(x,y);
  //     }
  //     //收笔
  //     ctx.stroke();
  //
  //   ctx.lineWidth = 1;
  //   ctx.strokeStyle = "rgba(255, 255, 255, 0)";//以上三行为了修改阴影边框
  //
  //   //  绘制阴影
  //   ctx.lineTo(x,h);//划线到当前点（最后一点）的下方
  //   ctx.lineTo(row_w,h);//再划线到第一个点底部的位置
  //   ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';//设置填充的颜色
  //   ctx.fill();//填充
  //
  //   //  写数据（点上的百分比）
  //   for( i in cfg.data){
  //         var item = cfg.data[i];
  //         x = row_w * i +row_w;
  //         y = h-(item[1]/100*h*per);
  //
  //         ctx.fillStyle = item[2] ? item[2] : '#595959';//导入文本颜色
  //
  //         ctx.fillText( item[1], x-10 , y-10  );//写文本
  //   }
  //   ctx.stroke();
  // }
  //
  //   //折线动画
  // component.on('onLoad',function(){
  //   //  折现图生长动画
  //     var s = 0;
  //     for( i=0;i<100;i++){
  //       setTimeout(function(){
  //           s+=.01;
  //           draw(s);
  //       },i*10+500);
  //     }
  // });
  //  component.on('onLeave',function(){
  //   //  折现图退场动画
  //     var s = 1;
  //     for( i=0;i<100;i++){
  //       setTimeout(function(){
  //           s-=.01;
  //           draw(s);
  //       },i*10);
  //     }
  // });
  

  return component;
}