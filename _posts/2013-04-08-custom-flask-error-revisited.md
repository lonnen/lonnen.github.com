---
title: "Custom Error Responses in Flask: Revisited"
layout: post
---

In [an earlier post](http://xor.lonnen.com/2012/12/30/custom-flask-error.html) I wrote up a method of returning unimplemented status codes in Flask based on subclassing `werkzeug.exceptions.HTTPException`.

As it turns out, the output of Flask view functions are run through a [liberal factory function](http://flask.pocoo.org/docs/api/#flask.Flask.make_response) that converts the return value into a response object. This makes it easy to output an otherwise unimplemented status code by returning a simple tuple from your view function.

<script src="https://gist.github.com/lonnen/5338856.js"></script>

This way there's no need to subclass anything from Werkzeug.
