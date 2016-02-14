/** Google Analytics **/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-10510045-3']);
_gaq.push(['_trackPageview']);

var makeScript = function(src) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    document.body.appendChild(s);
};

var src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
makeScript(src);

// internet defense league
window._idl = {};
_idl.variant = "banner";
(function() {
    var idl = document.createElement('script');
    idl.type = 'text/javascript';
    idl.async = true;
    idl.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'members.internetdefenseleague.org/include/?url=' + (_idl.url || '') + '&campaign=' + (_idl.campaign || '') + '&variant=' + (_idl.variant || 'banner');
    document.getElementsByTagName('body')[0].appendChild(idl);
})();
