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

// start gaug.es
var _gauges = _gauges || [];
(function() {
    var t   = document.createElement('script');
    t.type  = 'text/javascript';
    t.async = true;
    t.id    = 'gauges-tracker';
    t.setAttribute('data-site-id', '5032d20cf5a1f50d4e000061');
    t.src = '//secure.gaug.es/track.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);
})();
// end

/** Github projects **/
var names = ['socorro','processing-js','graphite.js','more-itertools', 'datazine'];
var project_el = document.querySelector('#projects')
if (project_el) {
    var github = 'https://api.github.com/users/Lonnen/repos';
    var projects = {};

    var loadProjects = function(json) {
        var repos = json.data;
        for (var i in repos) {
            repo = repos[i];
            projects[repo.name] = repo;
        }
        dts = []
        for (var i in names) {
            var name = names[i],
                p = projects[name],
                dt = '<dt><a href="' + p.html_url + '">' + name + '</a></dt>';
            dts.push(dt + '<dd>' + p.description + '</dd>');
        }
        project_el.innerHTML += '<dl>' + dts.join('') + '</dl>';
    };
    makeScript(github + '?callback=loadProjects');
}
