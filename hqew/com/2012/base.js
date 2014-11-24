Array.prototype.indexOf = function (v) {
    var i = -1;
    while (this[++i]) {
        if (this[i] === v) {
            return i
        }
    }
    return -1
};
Array.prototype.remove = function (v) {
    var i = this.indexOf(v);
    if (i > -1) {
        this.splice(i, 1)
    }
    return [i, v]
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length
};
String.prototype.cut = function (l) {
    if (this.len() <= l) {
        return this
    } else {
        for (var i = Math.floor(l / 2); i < this.len(); i++) {
            if (this.substr(0, i).len() >= l) {
                return this.substr(0, i)
            }
        }
    }
};
(function () {
    var Q = window.Q = function (x, pat) {
            return Q.type(x) == 'function' ? Q.ready(x) : new Q.prototype.init(x, pat)
        },
        adr = window.addEventListener;
    Q.prototype = {
        init: function (x, pat) {
            this.elements = [];
            return Q.type(x) === 'string' ? this.selector(x, pat) : this.merge(x)
        },
        merge: function (els) {
            this.pointer = 0;
            this.elements.splice(0, 0, els.length === undefined ? [els] : els);
            return this
        },
        each: function (cak) {
            Q.each(this.elements[this.pointer], cak);
            return this
        },
        bind: function (evt, cak) {
            return adr ? this.each(function () {
                this.addEventListener(evt, cak, false)
            }) : this.each(function () {
                var ths = this;
                this.attachEvent('on' + evt, function () {
                    cak.call(ths)
                })
            })
        },
        selector: function (x, pat, fir) {
            pat = pat || document;
            pat = pat.length === undefined ? [pat] : pat;
            var ret = [],
                els = function (pat, noe) {
                    var ret = [];
                    Q.each(pat, function () {
                        ret = ret.concat(Q.toarray(this.getElementsByTagName(noe || '*')))
                    });
                    return ret
                },
                tet = function (els, ate, rep) {
                    var ret = [];
                    Q.each(els, function () {
                        if (RegExp('(^|\\s)' + rep + '(\\s|$)').test(this[ate])) {
                            ret.push(this)
                        }
                    });
                    return ret
                };
            Q.each(x.split(','), function () {
                ret = ret.concat((function (x, pat, fir) {
                    var ret = [],
                        ary = x.shift().match(/([A-Za-z0-9*]+)?(#|\.)?([\w\-]+)?/);
                    if (ary[2] === '#') {
                        if (fir) {
                            ret = ret.concat(tet(pat, 'id', ary[3]))
                        } else {
                            var elt = document.getElementById(ary[3]);
                            ret = ret.concat(elt ? [elt] : [])
                        }
                    } else if (ary[2] === '.') {
                        if (fir) {
                            ret = ret.concat(tet(ary[1] ? tet(pat, 'nodeName', ary[1].toUpperCase()) : pat, 'className', ary[3]))
                        } else {
                            ret = ret.concat(tet(els(pat, ary[1]), 'className', ary[3]))
                        }
                    } else {
                        if (fir) {
                            ret = ret.concat(tet(pat, 'nodeName', ary[1].toUpperCase()))
                        } else {
                            ret = ret.concat(els(pat, ary[1]))
                        }
                    }
                    return x[0] ? arguments.callee(x, ret) : ret
                })(fir ? [this] : this.match(/([A-Za-z0-9*]+)?((#|\.)([\w\-]+))|([A-Za-z0-9*]+)((#|\.)([\w\-]+))?/g), pat, fir))
            });
            return this.merge(ret)
        },
        find: function (x) {
            return this.selector(x, this.elements[this.pointer])
        },
        filter: function (x) {
            return this.selector(x, this.elements[this.pointer], 1)
        },
        end: function () {
            this.pointer++;
            return this
        },
        eq: function (i) {
            var els = this.elements[this.pointer];
            return this.merge(els[i] ? els[i] : [])
        },
        parent: function () {
            var ret = [];
            this.each(function () {
                if (this.parentNode.nodeType === 1 && ret.indexOf(this.parentNode) === -1) {
                    ret.push(this.parentNode)
                }
            });
            return this.merge(ret)
        },
        children: function () {
            var ret = [];
            this.each(function () {
                var i = -1,
                    ths = this.childNodes;
                while (ths[++i]) {
                    if (ths[i].nodeType === 1 && ret.indexOf(ths[i]) === -1) {
                        ret.push(ths[i])
                    }
                }
            });
            return this.merge(ret)
        },
        sibling: function (sig) {
            var ret = [];
            this.each(function () {
                var ths = this;
                while (ths = ths[sig]) {
                    if (ths.nodeType === 1 && ret.indexOf(ths) === -1) {
                        ret.push(ths)
                    }
                }
            });
            return ret
        },
        pn: function (sig) {
            var ret = [];
            this.each(function () {
                var ths = this;
                do {
                    ths = ths[sig]
                } while (ths.nodeType !== 1)
                if (ret.indexOf(ths) === -1) {
                    ret.push(ths)
                }
            });
            return ret
        },
        siblings: function () {
            return this.merge(this.sibling('previousSibling').concat(this.sibling('nextSibling')))
        },
        prevAll: function () {
            return this.merge(this.sibling('previousSibling'))
        },
        nextAll: function () {
            return this.merge(this.sibling('nextSibling'))
        },
        prev: function () {
            return this.merge(this.pn('previousSibling'))
        },
        next: function () {
            return this.merge(this.pn('nextSibling'))
        },
        index: function () {
            return this.sibling('previousSibling').length
        },
        attr: function (obt) {
            if (Q.type(obt) === 'object') {
                return this.each(function () {
                    for (var n in obt) {
                        this[n] === undefined ? (this.setAttribute ? this.setAttribute(n, obt[n]) : null) : this[n] = obt[n]
                    }
                })
            } else {
                var els = this.elements[this.pointer];
                return els[0][obt] === undefined ? (els[0].getAttribute ? els[0].getAttribute(obt) : null) : els[0][obt]
            }
        },
        css: function (v, n) {
            if (v === undefined) {
                return this.elements[this.pointer][0].className
            } else {
                return this.each(function () {
                    if (n === undefined) {
                        if (!RegExp('(^|\\s)' + v + '(\\s|$)').test(this.className)) {
                            this.className += ' ' + v
                        }
                    } else {
                        this.className = this.className.replace(RegExp('(^|\\s)' + v + '(\\s|$)'), ' ' + n).trim()
                    }
                })
            }
        },
        style: function (j) {
            if (typeof j === 'object') {
                return this.each(function () {
                    for (var n in j) {
                        this.style[n] = j[n]
                    }
                })
            } else {
                var els = this.elements[this.pointer];
                if (j === 'width') {
                    return els[0].clientWidth
                } else if (j === 'height') {
                    return els[0].clientHeight
                } else {
                    return els[0].style[j]
                }
            }
        },
        html: function (v) {
            return this.attr(v === undefined ? 'innerHTML' : {
                innerHTML: v
            })
        },
        val: function (v) {
            return this.attr(v === undefined ? 'value' : {
                value: v
            })
        },
        width: function (v) {
            return this.style(v === undefined ? 'width' : {
                width: v
            })
        },
        height: function (v) {
            return this.style(v === undefined ? 'height' : {
                height: v
            })
        },
        show: function () {
            return this.style({
                display: 'block'
            })
        },
        hide: function () {
            return this.style({
                display: 'none'
            })
        }
    };
    Q.each = function (obt, cak) {
        if (obt.length === undefined) {
            for (var n in obt) {
                if (cak.call(obt[n], n) === false) {
                    break
                }
            }
        } else {
            for (var i = 0; obt[i]; i++) {
                if (cak.call(obt[i], i) === false) {
                    break
                }
            }
        }
        return obt
    };
    Q.extend = function () {
        var ret = {};
        if (arguments.length === 1) {
            ret = Q
        }
        Q.each(arguments, function () {
            Q.each(this, function (n) {
                ret[n] = this
            })
        });
        return ret
    };
    Q.extend({
        type: function (obt) {
            return (obt === null ? String(obt) : Object.prototype.toString.call(obt).slice(8, -1)).toLowerCase()
        },
        toarray: function (obt) {
            try {
                return [].slice.call(obt)
            } catch (e) {
                var ret = [];
                Q.each(obt, function () {
                    ret.push(this)
                });
                return ret
            }
        },
        ready: function (cak) {
            adr ? document.addEventListener('DOMContentLoaded', cak, false) : (function () {
                try {
                    document.documentElement.doScroll('left')
                } catch (e) {
                    setTimeout(arguments.callee, 1);
                    return
                }
                cak()
            })()
        },
        js: function (obt) {
            var sct = document.createElement('script'),
                hed = document.getElementsByTagName('head')[0],
                lod = adr ? 'onload' : 'onreadystatechange';
            sct.type = 'text/javascript';
            sct.src = obt.url;
            sct.charset = obt.charset || 'utf-8';
            sct[lod] = function () {
                if (adr ? true : /loaded|complete/.test(this.readyState)) {
                    obt.success();
                    this[lod] = null;
                    hed.removeChild(this)
                }
            };
            hed.appendChild(sct)
        }
    });
    Q.each(['focus', 'click', 'dblclick', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'blur', 'error', 'resize', 'scroll', 'load', 'unload'], function () {
        var ths = this;
        Q.prototype[ths] = function (cak) {
            return this.bind(ths, cak)
        }
    });
    Q.prototype.init.prototype = Q.prototype
})();