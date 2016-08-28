var H5_loading = function  (images,firstPage) {
        
        var id = this.id;//当前H5的id

        if(this._images === undefined ){ //  第一次进入

            this._images = ( images || [] ).length;//获得images数组的长度
            this._loaded = 0 ;//加载的资源数

            
            window[id] = this;//把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调

            //创建图片对象
            for(var s in images){
                var item = images[s];//获得当前图片路径
                var img = new Image;//创建图片对象
                img.onload = function(){
                    window[id].loader();
                }//图片加载后当前对象执行loader()
                img.src = item;//为图片对象添加源属性、值
            }

            $('#rate').text('0%');//初始化进度
            return this;

        }else{
            //以后进来
            this._loaded ++ ;
            $('#rate').text(  ( ( this._loaded / this._images  *100) >> 0 ) + '%' );//更新进度

            if(this._loaded < this._images){
                return this;//加载的资源数小于加载的资源数(即资源还没有载入好)，结束执行；等于时（资源加载好后）才往下走进行初始化
            }
        }

        window[id] = null;

         /* H5对象初始化呈现 */
        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
}