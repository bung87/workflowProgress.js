/*!
 * .js
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
        style: "green"
    }, workflowProgress = function(c, d, e) {
        this.current = 0, this.$children = [], this.context = c, 
        "static" == this.context.css("position") && this.context.css("position", "relative"), 
        this.inited = !1, this.opts = a.extend(b, d), this.perWidthRatio = 100 / (this.opts.nodes.length - 1), 
        this.inited || (this.init(), e && (this.set(e), this.$span.show()));
    };
    workflowProgress.prototype = {
        init: function() {
            this.$span = a("<span></span>", {
                "class": "workflowprogress-bar"
            }).hide(), this.$span.appendTo(this.context);
            for (var b = this.context.width(), c = b - 40, d = parseInt(this.context.css("borderLeftWidth")), e = c / (this.opts.nodes.length - 1), f = this.opts.nodes.length - 1; f >= 0; f--) {
                var g = (this.context.height() - 40) / 2, h = "", i = tw = 0, j = a("<div><span>" + (f + 1) + "</span></div>").addClass("workflowprogress-dot").css({
                    position: "absolute",
                    left: e * f - d
                }), k = a("<div></div>", {
                    "class": "workflowprogress-text"
                }).css({
                    position: "absolute",
                    top: -40
                }).text(this.opts.nodes[f]);
                j.appendTo(this.context), k.appendTo(this.context), 
                tw = k.width(), i = (tw - 40) / 2, k.css({
                    left: e * f - i
                }), h = j.css("borderWidth"), j.css("top", g - parseInt(h)), 
                this.$children.push(j.eq(0));
            }
            this.inited = !0;
        },
        set: function(a) {
            this.current = a - 1;
            for (var b = this.opts.nodes.length - 1; b >= 0; b--) b < this.current && this.$children[this.opts.nodes.length - 1 - b].addClass("on");
            var c = (this.current - 1) * this.perWidthRatio;
            return c > 100 && (c = 100), this.$span.width(c + "%"), 
            this;
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