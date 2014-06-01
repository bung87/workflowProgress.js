
(function($){

    var defaultOptions={
      style:'green'
    };
    var workflowProgress=function(context,options,nextstep){
      this.current=0;
      this.$children=[];
      this.context=context;
      if(this.context.css('position')=='static'){
         this.context.css('position','relative');
      }
     
      this.inited=false;

      this.opts=$.extend(defaultOptions,options);

      this.perWidthRatio=100/(this.opts.nodes.length-1);
      if(!this.inited){
         this.init();
         if(!!nextstep){
          this.set(nextstep);
          this.$span.show();
         }
      }
    };
    workflowProgress.prototype={
      init:function(){
        this.$span=$('<span></span>',{'class':'workflowprogress-bar'}).hide();
        this.$span.appendTo(this.context);

        var mainWidth=this.context.width(),width=mainWidth-40,
          leftOffset=parseInt(this.context.css('borderLeftWidth')),
          perWidth=width/(this.opts.nodes.length-1);
        for (var i = this.opts.nodes.length-1 ; i >= 0; i--) {
        var offset=(this.context.height()-40)/2,
        bw='',
        toffset=tw=0,
        $child=$('<div><span>'+(i+1)+'</span></div>').addClass('workflowprogress-dot').css({position:'absolute',left:perWidth*i-leftOffset}),
        $text=$('<div></div>',{'class':'workflowprogress-text'}).css({'position':'absolute','top':-40}).text(this.opts.nodes[i]);
        $child.appendTo(this.context);

         $text.appendTo(this.context);
         tw=$text.width();
         toffset=(tw-40)/2;
         $text.css({left:perWidth*i-toffset});
        bw=$child.css('borderWidth');
        $child.css('top',offset-parseInt(bw));
         this.$children.push($child.eq(0));
        };
        this.inited=true;
      },
      set:function(nextstep){

        this.current=nextstep-1;
        for (var j = this.opts.nodes.length-1 ; j >= 0; j--) {

        if (j<this.current){

          this.$children[this.opts.nodes.length-1-j].addClass('on');

         }
       }
       var width=(this.current-1)*this.perWidthRatio;
       if (width>100){width=100}        
        this.$span.width(width+'%');
        return this;
      }
    };
    $.fn.extend({
      workflowProgress:function(options,nextstep){
       
        if(this.length==1){
         return new workflowProgress(this,options,nextstep);
        }else{
          var res=[];
           $.each(this,function(){
            res.push(new workflowProgress($(this),options,nextstep));
          });
          return res;
        }
        
      }
    });
  })(jQuery);