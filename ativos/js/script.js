(function (t, r) {
    "use strict";
    function a(e, t, r, o) {
        ga("send", "event", e, t, r, o)
    }
    t.onerror = function (e, t, r) {
        if (e) {
            a("Error", e, t && r ? "[" + t + ":" + r + "]" : "", true)
        }
        return false
    }
        ;
    t.AudioContext = t.AudioContext || t.webkitAudioContext;
    var o = function (e) {
        try {
            var t = "_";
            e.setItem(t, t);
            e.removeItem(t);
            return true
        } catch (e) {
            return false
        }
    }(t.localStorage);
    if (t.location !== t.top.location || t.location.href && !t.location.href.match(/index\.html|192\.168/)) {
        top.location.href = "index.html"
    }
    (function (e, t, r, o, s, a, n) {
        e["GoogleAnalyticsObject"] = s;
        e[s] = e[s] || function () {
            (e[s].q = e[s].q || []).push(arguments)
        }
            ,
            e[s].l = 1 * new Date;
        a = t.createElement(r),
            n = t.getElementsByTagName(r)[0];
        a.async = 1;
        a.src = o;
        n.parentNode.insertBefore(a, n)
    }
    )(t, r, "script", "", "ga");
    var e = r.getElementById("consent");
    var s = !!e;
    var n = "UA-56095-18";
    t["ga-disable-" + n] = s;
    ga("set", "anonymizeIp", true);
    ga("create", n, "auto");
    function i() {
        (t.adsbygoogle || []).pauseAdRequests = 0;
        t["ga-disable-" + n] = false;
        ga("send", "pageview");
        if (s) {
            r.body.classList.add("cookies-consent")
        }
    }
    function c() {
        if (!s || o && localStorage.getItem("consent")) {
            i()
        } else {
            e.addEventListener("click", function () {
                i();
                if (o) {
                    localStorage.setItem("consent", true)
                }
            })
        }
    }
    function y(e) {
        if (L || !v[e]) {
            return
        }
        if (g && g.resume) {
            g.resume()
        }
        var t = g.createBufferSource();
        t.buffer = v[e];
        t.connect(g.destination);
        if (t.start) {
            t.start(0)
        } else {
            t.noteOn(0)
        }
    }
    var l = {}, f = {
        player1: 0,
        player2: 0,
        ties: 0
    }, d = {
        player1: 0,
        player2: 0,
        ties: 0
    }, p = "x", m = "o", v = {}, g, h = 9, L, q, w = true, S = true, b = false, T = 300, M = .75, A, k = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    function D() {
        for (var e = l.mute.length; e--;) {
            l.mute[e].style.display = L ? "none" : ""
        }
    }
    function I() {
        L = !L;
        if (o) {
            localStorage.setItem("muted", L.toString())
        }
        D();
        a("Mute", L ? "muted" : "unmuted")
    }
    function B() {
        b = !b;
        var e = l.scores.scores.classList;
        if (b) {
            e.remove("p1");
            e.add("p2");
            S = true
        } else {
            e.remove("p2");
            e.add("p1");
            S = false
        }
        a("Mode", b ? "players" : "computer");
        l.scores.player1.innerHTML = b ? d.player1 : f.player1;
        l.scores.player2.innerHTML = b ? d.player2 : f.player2;
        l.scores.ties.innerHTML = b ? d.ties : f.ties;
        q = false;
        j()
    }
    function E(e, t) {
        l.squares[t].querySelector("div").classList.add(e)
    }
    function H() {
        var e = l.scores.turn1.classList
            , t = l.scores.turn2.classList
            , r = l.scores.turnTies.classList;
        if (b && l.restart.style.display === "none") {
            if (w) {
                t.remove("turn");
                e.add("turn")
            } else {
                e.remove("turn");
                t.add("turn")
            }
            r.add("turn")
        } else {
            e.remove("turn");
            t.remove("turn");
            r.remove("turn")
        }
    }
    function x(e) {
        if (A[e] !== 0 || G() || !b && w) {
            return
        }
        if (b) {
            w = !w;
            A[e] = w ? -1 : 1;
            E(w ? p : m, e);
            y("note-" + (w ? "low" : "high"));
            G()
        } else {
            A[e] = -1;
            E(p, e);
            w = true;
            y("note-low");
            setTimeout(N, T)
        }
        H()
    }
    function C(o, s) {
        l.restart.style.display = "block";
        setTimeout(function () {
            var e = "Game"
                , t = b ? "players " : "computer ";
            setTimeout(function () {
                q = false
            }, T);
            if (s) {
                for (var r = 3; r--;) {
                    l.squares[s[r]].classList.add("win")
                }
            }
            switch (o) {
                case p:
                    l.scores.player1.innerHTML = b ? ++d.player1 : ++f.player1;
                    l.scores.player1.classList.add("appear");
                    l.board.classList.add("win");
                    y("game-over");
                    a(e, t + (b ? p : "lose"));
                    break;
                case m:
                    l.scores.player2.innerHTML = b ? ++d.player2 : ++f.player2;
                    l.scores.player2.classList.add("appear");
                    l.board.classList.add("win");
                    y("game-over");
                    a(e, t + (b ? m : "win"));
                    break;
                default:
                    l.scores.ties.innerHTML = b ? ++d.ties : ++f.ties;
                    l.scores.ties.classList.add("appear");
                    l.board.classList.add("tie");
                    y("game-over-tie");
                    a(e, t + "tie");
                    break
            }
        }, w && !b ? 100 : T + 100)
    }
    function G() {
        for (var e = k.length; e--;) {
            var t = k[e]
                , r = A[t[0]] + A[t[1]] + A[t[2]];
            if (r === 3 || r === -3) {
                C(r === 3 ? m : p, t);
                return true
            }
        }
        var o = 0;
        for (e = h; e--;) {
            if (A[e] !== 0) {
                o++
            }
        }
        if (o === 9) {
            C();
            return true
        }
        return false
    }
    function N() {
        if (G()) {
            return
        }
        var e, t, r, o, s, a, n = 0;
        w = false;
        H();
        y("note-high");
        for (e = h; e--;) {
            if (A[e] !== 0) {
                n++;
                if (n === 1) {
                    a = e
                }
            }
        }
        if (n < 2 && Math.random() > .2) {
            do {
                s = Math.floor(Math.random() * h)
            } while (s === a)
        } else {
            for (e = h; e--;) {
                for (t = h; t--;) {
                    if (A[t] !== 0) {
                        continue
                    }
                    A[t] = 1;
                    if (G()) {
                        E(m, t);
                        return
                    }
                    A[t] = 0
                }
                if (A[e] !== 0) {
                    continue
                }
                A[e] = 1;
                var i = null
                    , c = A.concat();
                for (t = h; t--;) {
                    if (c[t] !== 0) {
                        continue
                    }
                    c[t] = -1;
                    for (r = k.length; r--;) {
                        if (c[k[r][0]] + c[k[r][1]] + c[k[r][2]] === -3 && Math.random() > M) {
                            A[e] = 0;
                            A[t] = 1;
                            E(m, t);
                            G();
                            return
                        }
                    }
                    var u = 0
                        , l = 0
                        , f = c.concat()
                        , d = c.concat();
                    for (r = h; r--;) {
                        if (f[r] === 0) {
                            f[r] = 1
                        }
                        if (d[r] === 0) {
                            d[r] = -1
                        }
                    }
                    for (r = k.length; r--;) {
                        if (f[k[r][0]] + f[k[r][1]] + f[k[r][2]] === 3) {
                            u++
                        }
                        if (d[k[r][0]] + d[k[r][1]] + d[k[r][2]] === -3) {
                            l++
                        }
                    }
                    var p = u - l;
                    i = i == null ? p : i > p ? p : i;
                    c[t] = 0
                }
                if (o == null || o < i) {
                    o = i;
                    s = e
                }
                A[e] = 0
            }
        }
        A[s] = 1;
        E(m, s);
        G()
    }
    function O(t) {
        l.squares[t].ontouchstart = l.squares[t].onmousedown = function (e) {
            e.preventDefault();
            x(t)
        }
    }
    function j() {
        if (q) {
            return
        }
        q = true;
        l.restart.style.display = "none";
        A = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var e = h; e--;) {
            l.squares[e].classList.remove("win");
            l.squares[e].querySelector("div").className = ""
        }
        l.scores.ties.classList.remove("appear");
        l.scores.player1.classList.remove("appear");
        l.scores.player2.classList.remove("appear");
        l.board.classList.remove("win");
        l.board.classList.remove("tie");
        w = S = !S;
        H();
        if (S && !b) {
            setTimeout(N, T)
        }
    }
    r.addEventListener("DOMContentLoaded", function () {
        l = {
            board: r.querySelector(".board"),
            squares: r.querySelectorAll(".square"),
            restart: r.querySelector(".restart"),
            muteButton: r.querySelector(".mute"),
            mute: r.querySelectorAll(".mute path"),
            privacy: r.querySelector(".privacy"),
            scores: {
                scores: r.querySelector(".scores"),
                swap: r.querySelector(".swap"),
                player1: r.querySelector(".player1 .score"),
                player2: r.querySelector(".player2 .score"),
                ties: r.querySelector(".ties .score"),
                turn1: r.querySelector(".player1"),
                turn2: r.querySelector(".player2"),
                turnTies: r.querySelector(".ties")
            }
        };
        for (var e = h; e--;) {
            O(e)
        }
        l.restart.ontouchstart = l.scores.scores.ontouchstart = function (e) {
            e.preventDefault()
        }
            ;
        l.scores.scores.ontouchend = l.scores.scores.onclick = function (e) {
            e.preventDefault();
            B()
        }
            ;
        l.restart.ontouchend = l.restart.onclick = function (e) {
            e.preventDefault();
            j()
        }
            ;
        c();
        j()
    })
}
)(window, document);