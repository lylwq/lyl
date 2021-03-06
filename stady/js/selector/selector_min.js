var selectorEngine = (function() {
    var b = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
    g = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
    f = /^(?:[\w\-_]+)?#([\w\-_]+)/,
    j = /^([\w\*\-_]+)/,
    h = [null, null];
    function d(o, m) {
        m = m || document;
        var k = /^[\w\-_#]+$/.test(o);
        if (!k && m.querySelectorAll) {
            return c(m.querySelectorAll(o))
        }
        if (o.indexOf(",") > -1) {
            var v = o.split(/,/g),
            t = [],
            s = 0,
            r = v.length;
            for (; s < r; ++s) {
                t = t.concat(d(v[s], m))
            }
            return e(t)
        }
        var p = o.match(b),
        n = p.pop(),
        l = (n.match(f) || h)[1],
        u = !l && (n.match(g) || h)[1],
        w = !l && (n.match(j) || h)[1],
        q;
        if (u && !w && m.getElementsByClassName) {
            q = c(m.getElementsByClassName(u))
        } else {
            q = !l && c(m.getElementsByTagName(w || "*"));
            if (u) {
                q = i(q, "className", RegExp("(^|\\s)" + u + "(\\s|$)"))
            }
            if (l) {
                var x = m.getElementById(l);
                return x ? [x] : []
            }
        }
        return p[0] && q[0] ? a(p, q) : q
    }
    function c(o) {
        try {
            return Array.prototype.slice.call(o)
        } catch(n) {
            var l = [],
            m = 0,
            k = o.length;
            for (; m < k; ++m) {
                l[m] = o[m]
            }
            return l
        }
    }
    function a(w, p, n) {
        var q = w.pop();
        if (q === ">") {
            return a(w, p, true)
        }
        var s = [],
        k = -1,
        l = (q.match(f) || h)[1],
        t = !l && (q.match(g) || h)[1],
        v = !l && (q.match(j) || h)[1],
        u = -1,
        m,
        x,
        o;
        v = v && v.toLowerCase();
        while ((m = p[++u])) {
            x = m.parentNode;
            do {
                o = !v || v === "*" || v === x.nodeName.toLowerCase();
                o = o && (!l || x.id === l);
                o = o && (!t || RegExp("(^|\\s)" + t + "(\\s|$)").test(x.className));
                if (n || o) {
                    break
                }
            }
            while ((x = x.parentNode));
            if (o) {
                s[++k] = m
            }
        }
        return w[0] && s[0] ? a(w, s) : s
    }
    var e = (function() {
        var k = +new Date();
        var l = (function() {
            var m = 1;
            return function(p) {
                var o = p[k],
                n = m++;
                if (!o) {
                    p[k] = n;
                    return true
                }
                return false
            }
        })();
        return function(m) {
            var s = m.length,
            n = [],
            q = -1,
            o = 0,
            p;
            for (; o < s; ++o) {
                p = m[o];
                if (l(p)) {
                    n[++q] = p
                }
            }
            k += 1;
            return n
        }
    })();
    function i(q, k, p) {
        var m = -1,
        o,
        n = -1,
        l = [];
        while ((o = q[++m])) {
            if (p.test(o[k])) {
                l[++n] = o
            }
        }
        return l
    }
    return d
})();