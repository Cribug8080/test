var _ec_history = 1;
var _ec_tests = 10;
var _ec_debug = 0;
var _ec_path = site.siteurl + "source/plugin/votes/function/pcmark/";

function _ec_dump(arr, level) {
    var dumped_text = "";
    if (!level) {
        level = 0
    }
    var level_padding = "";
    for (var j = 0; j < level + 1; j++) {
        level_padding += "    "
    }
    if (typeof (arr) == "object") {
        for (var item in arr) {
            var value = arr[item];
            if (typeof (value) == "object") {
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += _ec_dump(value, level + 1)
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + '"\n'
            }
        }
    } else {
        dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")"
    }
    return dumped_text
}

function _ec_replace(str, key, value) {
    if (str.indexOf("&" + key + "=") > -1 || str.indexOf(key + "=") == 0) {
        var idx = str.indexOf("&" + key + "=");
        if (idx == -1) {
            idx = str.indexOf(key + "=")
        }
        var end = str.indexOf("&", idx + 1);
        var newstr;
        if (end != -1) {
            newstr = str.substr(0, idx) + str.substr(end + (idx ? 0 : 1)) + "&" + key + "=" + value
        } else {
            newstr = str.substr(0, idx) + "&" + key + "=" + value
        }
        return newstr
    } else {
        return str + "&" + key + "=" + value
    }
}
var _global_lso;

function _pcmark_flash_var(cookie) {
    _global_lso = cookie;
    var swf = jQuery("#myswf");
    if (swf && swf.parentNode) {
        swf.parentNode.removeChild(swf)
    }
}
var pcmark = (function () {
    this._class = function () {
        var self = this;
        _baseKeyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        this._ec = {};
        var no_color = -1;
        this.get = function (name, cb, dont_reset) {
            jQuery(document).ready(function () {
                self._pcmark(name, cb, undefined, undefined, dont_reset)
            })
        };
        this.set = function (name, value) {
            jQuery(document).ready(function () {
                self._pcmark(name, function () {}, value)
            })
        };
        this._pcmark = function (name, cb, value, i, dont_reset) {
            if (typeof self._pcmark == "undefined") {
                self = this
            }
            if (typeof i == "undefined") {
                i = 0
            }
            if (i == 0) {
                self.pcmark_database_storage(name, value);
                self.pcmark_png(name, value);
                self.pcmark_etag(name, value);
                self.pcmark_cache(name, value);
                self.pcmark_lso(name, value);
                self._ec.userData = self.pcmark_userdata(name, value);
                self._ec.cookieData = self.pcmark_cookie(name, value);
                self._ec.localData = self.pcmark_local_storage(name, value);
                self._ec.globalData = self.pcmark_global_storage(name, value);
                self._ec.sessionData = self.pcmark_session_storage(name, value);
                self._ec.windowData = self.pcmark_window(name, value);
                if (_ec_history) {
                    self._ec.historyData = self.pcmark_history(name, value)
                }
            }
            if (typeof value != "undefined") {
                if (((typeof _global_lso == "undefined") || (typeof _global_isolated == "undefined")) &&
                    i++ < _ec_tests) {
                    setTimeout(function () {
                        self._pcmark(name, cb, value, i, dont_reset)
                    }, 300)
                }
            } else {
                if (((window.openDatabase && typeof self._ec.dbData == "undefined") || (typeof _global_lso ==
                        "undefined") || (typeof self._ec.etagData == "undefined") || (typeof self._ec
                        .cacheData == "undefined") || (document.createElement("canvas").getContext &&
                        (typeof self._ec.pngData == "undefined" || self._ec.pngData == "")) || (
                        typeof _global_isolated == "undefined")) && i++ < _ec_tests) {
                    setTimeout(function () {
                        self._pcmark(name, cb, value, i, dont_reset)
                    }, 300)
                } else {
                    self._ec.lsoData = self.getFromStr(name, _global_lso);
                    _global_lso = undefined;
                    self._ec.slData = self.getFromStr(name, _global_isolated);
                    _global_isolated = undefined;
                    var tmpec = self._ec;
                    self._ec = {};
                    var candidates = new Array();
                    var bestnum = 0;
                    var candidate;
                    for (var item in tmpec) {
                        if (typeof tmpec[item] != "undefined" && typeof tmpec[item] != "null" && tmpec[
                                item] != "" && tmpec[item] != "null" && tmpec[item] != "undefined" &&
                            tmpec[item] != null) {
                            candidates[tmpec[item]] = typeof candidates[tmpec[item]] == "undefined" ? 1 :
                                candidates[tmpec[item]] + 1
                        }
                    }
                    for (var item in candidates) {
                        if (candidates[item] > bestnum) {
                            bestnum = candidates[item];
                            candidate = item
                        }
                    }
                    if (typeof dont_reset == "undefined" || dont_reset != 1) {
                        self.set(name, candidate)
                    }
                    if (typeof cb == "function") {
                        cb(candidate, tmpec)
                    }
                }
            }
        };
        this.pcmark_window = function (name, value) {
            try {
                if (typeof (value) != "undefined") {
                    window.name = _ec_replace(window.name, name, value)
                } else {
                    return this.getFromStr(name, window.name)
                }
            } catch (e) {}
        };
        this.pcmark_userdata = function (name, value) {
            try {
                var elm = this.createElem("div", "userdata_el", 1);
                elm.style.behavior = "url(#default#userData)";
                if (typeof (value) != "undefined") {
                    elm.setAttribute(name, value);
                    elm.save(name)
                } else {
                    elm.load(name);
                    return elm.getAttribute(name)
                }
            } catch (e) {}
        };
        this.pcmark_cache = function (name, value) {
            if (typeof (value) != "undefined") {
                document.cookie = "pcmark_cache=" + value;
                var img = new Image();
                img.style.visibility = "hidden";
                img.style.position = "absolute";
                img.src = _ec_path + "pcmark_cache.php?name=" + name
            } else {
                var origvalue = this.getFromStr("pcmark_cache", document.cookie);
                self._ec.cacheData = undefined;
                document.cookie = "pcmark_cache=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/";
                jQuery.ajax({
                    url: _ec_path + "pcmark_cache.php?name=" + name,
                    success: function (data) {
                        document.cookie = "pcmark_cache=" + origvalue +
                            "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/";
                        self._ec.cacheData = data
                    }
                })
            }
        };
        this.pcmark_etag = function (name, value) {
            if (typeof (value) != "undefined") {
                document.cookie = "pcmark_etag=" + value;
                var img = new Image();
                img.style.visibility = "hidden";
                img.style.position = "absolute";
                img.src = _ec_path + "pcmark_etag.php?name=" + name
            } else {
                var origvalue = this.getFromStr("pcmark_etag", document.cookie);
                self._ec.etagData = undefined;
                document.cookie = "pcmark_etag=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/";
                jQuery.ajax({
                    url: _ec_path + "pcmark_etag.php?name=" + name,
                    success: function (data) {
                        document.cookie = "pcmark_etag=" + origvalue +
                            "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/";
                        self._ec.etagData = data
                    }
                })
            }
        };
        this.pcmark_lso = function (name, value) {
            var div = document.getElementById("swfcontainer");
            if (!div) {
                div = document.createElement("div");
                div.setAttribute("id", "swfcontainer");
                document.body.appendChild(div)
            }
            var flashvars = {};
            if (typeof value != "undefined") {
                flashvars.everdata = name + "=" + value
            }
            var params = {};
            params.swliveconnect = "true";
            var attributes = {};
            attributes.id = "myswf";
            attributes.name = "myswf";
            swfobject.embedSWF(_ec_path + "pcmark.swf", "swfcontainer", "1", "1", "9.0.0", false,
                flashvars, params, attributes)
        };
        this.pcmark_png = function (name, value) {
            if (document.createElement("canvas").getContext) {
                if (typeof (value) != "undefined") {
                    document.cookie = "pcmark_png=" + value;
                    var img = new Image();
                    img.style.visibility = "hidden";
                    img.style.position = "absolute";
                    img.src = _ec_path + "pcmark_png.php?name=" + name
                } else {
                    self._ec.pngData = undefined;
                    var context = document.createElement("canvas");
                    context.style.visibility = "hidden";
                    context.style.position = "absolute";
                    context.width = 200;
                    context.height = 1;
                    var ctx = context.getContext("2d");
                    var origvalue = this.getFromStr("pcmark_png", document.cookie);
                    document.cookie = "pcmark_png=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/";
                    var img = new Image();
                    img.style.visibility = "hidden";
                    img.style.position = "absolute";
                    img.src = _ec_path + "pcmark_png.php?name=" + name;
                    img.onload = function () {
                        document.cookie = "pcmark_png=" + origvalue +
                            "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/";
                        self._ec.pngData = "";
                        ctx.drawImage(img, 0, 0);
                        var imgd = ctx.getImageData(0, 0, 200, 1);
                        var pix = imgd.data;
                        for (var i = 0, n = pix.length; i < n; i += 4) {
                            if (pix[i] == 0) {
                                break
                            }
                            self._ec.pngData += String.fromCharCode(pix[i]);
                            if (pix[i + 1] == 0) {
                                break
                            }
                            self._ec.pngData += String.fromCharCode(pix[i + 1]);
                            if (pix[i + 2] == 0) {
                                break
                            }
                            self._ec.pngData += String.fromCharCode(pix[i + 2])
                        }
                    }
                }
            }
        };
        this.pcmark_local_storage = function (name, value) {
            try {
                if (window.localStorage) {
                    if (typeof (value) != "undefined") {
                        localStorage.setItem(name, value)
                    } else {
                        return localStorage.getItem(name)
                    }
                }
            } catch (e) {}
        };
        this.pcmark_database_storage = function (name, value) {
            try {
                if (window.openDatabase) {
                    var database = window.openDatabase("sqlite_pcmark", "", "pcmark", 1024 * 1024);
                    if (typeof (value) != "undefined") {
                        database.transaction(function (tx) {
                            tx.executeSql(
                                "CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))",
                                [],
                                function (tx, rs) {},
                                function (tx, err) {});
                            tx.executeSql(
                                "INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)", [
                                    name, value],
                                function (tx, rs) {},
                                function (tx, err) {})
                        })
                    } else {
                        database.transaction(function (tx) {
                            tx.executeSql("SELECT value FROM cache WHERE name=?", [name],
                                function (tx, result1) {
                                    if (result1.rows.length >= 1) {
                                        self._ec.dbData = result1.rows.item(0)["value"]
                                    } else {
                                        self._ec.dbData = ""
                                    }
                                },
                                function (tx, err) {})
                        })
                    }
                }
            } catch (e) {}
        };
        this.pcmark_session_storage = function (name, value) {
            try {
                if (window.sessionStorage) {
                    if (typeof (value) != "undefined") {
                        sessionStorage.setItem(name, value)
                    } else {
                        return sessionStorage.getItem(name)
                    }
                }
            } catch (e) {}
        };
        this.pcmark_global_storage = function (name, value) {
            if (window.globalStorage) {
                var host = this.getHost();
                try {
                    if (typeof (value) != "undefined") {
                        eval("globalStorage[host]." + name + " = value")
                    } else {
                        return eval("globalStorage[host]." + name)
                    }
                } catch (e) {}
            }
        };
        this.pcmark_silverlight = function (name, value) {
            var source = _ec_path + "pcmark.xap";
            var minver = "4.0.50401.0";
            var initParam = "";
            if (typeof (value) != "undefined") {
                initParam = '<param name="initParams" value="' + name + "=" + value + '" />'
            }
            var html =
                '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="mysilverlight" width="0" height="0">' +
                initParam + '<param name="source" value="' + source +
                '"/><param name="onLoad" value="onSilverlightLoad"/><param name="onError" value="onSilverlightError"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="minRuntimeVersion" value="' +
                minver +
                '"/><param name="autoUpgrade" value="true"/><a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=' +
                minver +
                '" style="text-decoration:none"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style:none"/></a></object>';
            if (!document.getElementById("mysilverlight")) {
                document.body.innerHTML += html
            }
        };
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else {
                    if (isNaN(chr3)) {
                        enc4 = 64
                    }
                }
                output = output + _baseKeyStr.charAt(enc1) + _baseKeyStr.charAt(enc2) + _baseKeyStr.charAt(
                    enc3) + _baseKeyStr.charAt(enc4)
            }
            return output
        };
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _baseKeyStr.indexOf(input.charAt(i++));
                enc2 = _baseKeyStr.indexOf(input.charAt(i++));
                enc3 = _baseKeyStr.indexOf(input.charAt(i++));
                enc4 = _baseKeyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2)
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3)
                }
            }
            output = this._utf8_decode(output);
            return output
        };
        this._utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else {
                    if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128)
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128)
                    }
                }
            }
            return utftext
        };
        this._utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++
                } else {
                    if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3
                    }
                }
            }
            return string
        };
        this.pcmark_history = function (name, value) {
            var baseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=-";
            var baseElems = baseStr.split("");
            var url = "http://www.google.com/pcmark/cache/" + this.getHost() + "/" + name;
            if (typeof (value) != "undefined") {
                if (this.hasVisited(url)) {
                    return
                }
                this.createIframe(url, "if");
                url = url + "/";
                var base = this.encode(value).split("");
                for (var i = 0; i < base.length; i++) {
                    url = url + base[i];
                    this.createIframe(url, "if" + i)
                }
                url = url + "-";
                this.createIframe(url, "if_")
            } else {
                if (this.hasVisited(url)) {
                    url = url + "/";
                    var letter = "";
                    var val = "";
                    var found = 1;
                    while (letter != "-" && found == 1) {
                        found = 0;
                        for (var i = 0; i < baseElems.length; i++) {
                            if (this.hasVisited(url + baseElems[i])) {
                                letter = baseElems[i];
                                if (letter != "-") {
                                    val = val + letter
                                }
                                url = url + letter;
                                found = 1;
                                break
                            }
                        }
                    }
                    return this.decode(val)
                }
            }
        };
        this.createElem = function (type, name, append) {
            var el;
            if (typeof name != "undefined" && document.getElementById(name)) {
                el = document.getElementById(name)
            } else {
                el = document.createElement(type)
            }
            el.style.visibility = "hidden";
            el.style.position = "absolute";
            if (name) {
                el.setAttribute("id", name)
            }
            if (append) {
                document.body.appendChild(el)
            }
            return el
        };
        this.createIframe = function (url, name) {
            var el = this.createElem("iframe", name, 1);
            el.setAttribute("src", url);
            return el
        };
        this.waitForSwf = function (i) {
            if (typeof i == "undefined") {
                i = 0
            } else {
                i++
            }
            if (i < _ec_tests && typeof swfobject == "undefined") {
                setTimeout(function () {
                    waitForSwf(i)
                }, 300)
            }
        };
        this.pcmark_cookie = function (name, value) {
            if (typeof (value) != "undefined") {
                document.cookie = name + "=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/";
                document.cookie = name + "=" + value +
                    "; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/"
            } else {
                return this.getFromStr(name, document.cookie)
            }
        };
        this.getFromStr = function (name, text) {
            if (typeof text != "string") {
                return
            }
            var nameEQ = name + "=";
            var ca = text.split(/[;&]/);
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1, c.length)
                }
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length)
                }
            }
        };
        this.getHost = function () {
            var domain = document.location.host;
            if (domain.indexOf("www.") == 0) {
                domain = domain.replace("www.", "")
            }
            return domain
        };
        this.toHex = function (str) {
            var r = "";
            var e = str.length;
            var c = 0;
            var h;
            while (c < e) {
                h = str.charCodeAt(c++).toString(16);
                while (h.length < 2) {
                    h = "0" + h
                }
                r += h
            }
            return r
        };
        this.fromHex = function (str) {
            var r = "";
            var e = str.length;
            var s;
            while (e >= 0) {
                s = e - 2;
                r = String.fromCharCode("0x" + str.substring(s, e)) + r;
                e = s
            }
            return r
        };
        this.hasVisited = function (url) {
            if (this.no_color == -1) {
                var no_style = this._getRGB("http://samy-was-here-this-should-never-be-visited.com", -1);
                if (no_style == -1) {
                    this.no_color = this._getRGB("http://samy-was-here-" + Math.floor(Math.random() *
                        9999999) + "rand.com")
                }
            }
            if (url.indexOf("https:") == 0 || url.indexOf("http:") == 0) {
                return this._testURL(url, this.no_color)
            }
            return this._testURL("http://" + url, this.no_color) || this._testURL("https://" + url,
                this.no_color) || this._testURL("http://www." + url, this.no_color) || this._testURL(
                "https://www." + url, this.no_color)
        };
        var _link = this.createElem("a", "_ec_rgb_link");
        var created_style;
        var _cssText = "#_ec_rgb_link:visited{display:none;color:#FF0000}";
        try {
            created_style = 1;
            var style = document.createElement("style");
            if (style.styleSheet) {
                style.styleSheet.innerHTML = _cssText
            } else {
                if (style.innerHTML) {
                    style.innerHTML = _cssText
                } else {
                    var cssT = document.createTextNode(_cssText);
                    style.appendChild(cssT)
                }
            }
        } catch (e) {
            created_style = 0
        }
        this._getRGB = function (u, test_color) {
            if (test_color && created_style == 0) {
                return -1
            }
            _link.href = u;
            _link.innerHTML = u;
            document.body.appendChild(style);
            document.body.appendChild(_link);
            var color;
            if (document.defaultView) {
                color = document.defaultView.getComputedStyle(_link, null).getPropertyValue("color")
            } else {
                color = _link.currentStyle.color
            }
            return color
        };
        this._testURL = function (url, no_color) {
            var color = this._getRGB(url);
            if (color == "rgb(255, 0, 0)" || color == "#ff0000") {
                return 1
            } else {
                if (no_color && color != no_color) {
                    return 1
                }
            }
            return 0
        }
    };
    return _class
})();
var _global_isolated;

function onSilverlightLoad(sender, args) {
    var control = sender.getHost();
    _global_isolated = control.Content.App.getIsolatedStorage()
}

function onSilverlightError(sender, args) {
    _global_isolated = ""
};