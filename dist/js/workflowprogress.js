/*!
 * workflowProgress.js
 * Author:bung
 * Summary:workflowProgress.js ===================
 * License:MIT
 * Version: 0.1.0
 *
 * URL:
 * https://github.com/bung87/workflowProgress.js
 * https://github.com/bung87/workflowProgress.js/blob/master/LICENSE
 *
 */
!function(a) {
    var b = {
        nodeWidth: 40,
        nodeTextOffset: 40,
        processTextOffset: 40
    }, workflowProgress = function(c, d, e) {
        this.current = 0, this.$children = [], this.context = c, 
        "static" == this.context.css("position") && this.context.css("position", "relative"), 
        this.inited = !1, this.opts = a.extend(b, d), this.perWidthRatio = 100 / (this.opts.nodes.length - 1), 
        this.inited || (this.current = e - 1, this.init(), 
        e && (this.set(e), this.$span.show()));
    };
    workflowProgress.prototype = {
        init: function() {
            this.$span = a("<span></span>", {
                "class": "workflowprogress-bar"
            }).hide(), this.$span.appendTo(this.context);
            var b = this.context.width(), c = b - this.opts.nodeWidth, d = parseInt(this.context.css("borderLeftWidth"));
            this.perWidth = c / (this.opts.nodes.length - 1);
            for (var e = this.opts.nodes.length - 1; e >= 0; e--) {
                var f = (this.context.height() - this.opts.nodeWidth) / 2, g = "", h = tw = 0, i = this.perWidth * e - d, j = a("<div><span>" + (e + 1) + "</span></div>").addClass("workflowprogress-dot").css({
                    position: "absolute",
                    left: i
                }), k = a("<div></div>", {
                    "class": "workflowprogress-text"
                }).css({
                    position: "absolute",
                    top: -this.opts.nodeTextOffset
                }).text(this.opts.nodes[e]);
                j.appendTo(this.context), k.appendTo(this.context), 
                tw = k.width(), h = (tw - this.opts.nodeWidth) / 2, 
                k.css({
                    left: this.perWidth * e - h
                }), g = j.css("borderWidth"), j.css("top", f - parseInt(g)), 
                this.$children.push(j);
            }
            if (this.opts.inprocess && "string" == typeof this.opts.inprocess) {
                var l = a("<span></span>", {
                    "class": "workflowprogress-process-text"
                }).text(this.opts.inprocess);
                l.appendTo(this.context);
                var i = parseInt(this.$children[this.opts.nodes.length - this.current].css("left")) + (this.perWidth / 2 - l.width() / 2) + this.opts.nodeWidth / 2;
                l.css({
                    position: "absolute",
                    top: this.opts.processTextOffset,
                    left: i
                });
            }
            this.inited = !0;
        },
        set: function(b, c) {
            this.current = b - 1;
            for (var d = this.opts.nodes.length - 1; d >= 0; d--) {
                var e = this.$children[this.opts.nodes.length - 1 - d];
                d < this.current ? e.addClass("on") : e.removeClass("on");
            }
            var f = (this.opts.inprocess ? this.current : this.current - 1) * this.perWidthRatio, g = a(".workflowprogress-process-text");
            return c && "string" == typeof c && 100 >= f && (this.opts.inprocess = c, 
            g.text(c), g.animate({
                left: parseInt(this.$children[this.opts.nodes.length - this.current].css("left")) + (this.perWidth / 2 - g.width() / 2) + this.opts.nodeWidth / 2
            })), f > 100 && (f = 100), this.$span.animate({
                width: f + "%"
            }), this;
        }
    }, a.fn.extend({
        workflowProgress: function(b, c) {
            if (1 == this.length) return new workflowProgress(this, b, c);
            var d = [];
            return a.each(this, function() {
                d.push(new workflowProgress(a(this), b, c));
            }), d;
        }
    });
}(jQuery);