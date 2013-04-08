---
title: "Custom Error Responses in Flask"
layout: post
---

Update 2012-04-08: [there's a simpler way](http://xor.lonnen.com/2013/04/08/custom-flask-error-revisited.html)

Python's [Flask framework](http://flask.pocoo.org/) leverages Werkzeug's HTTP exceptions module to make it easy to report error states in requests. The `abort` method works with most common HTTP status codes, but sometimes you may want to return a code that isn't implemented by Werkzeug.

When I'm building services on services I like to use `424 - Failed Dependency` to indicate that an unhandleable error occured in a dependent service. By subclassing Werkzeug's `HTTPException` I can respond with that exception even though Werkzeug itself doesn't implement it.

<script src="https://gist.github.com/4423380.js"></script>

In this example it doesn't matter if Github is down or if the application is running up against the rate limit -- the app will indicate that through no fault of it's own it cannot fulfill the request.

Through a similar subclass you'll be able to implement [custom](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#420), [newly proposed](https://www.rfc-editor.org/rfc/rfc6585.txt), and [otherwise unimplemented](https://github.com/mitsuhiko/werkzeug/blob/master/werkzeug/exceptions.py) status codes.
