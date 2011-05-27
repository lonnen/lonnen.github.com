---
title: Processing.py
layout: post
---
While Processing is a Java-based language, there have been implementations of it (with varying degrees of fidelity) in a few other languages. The best known of these is probably [Processing.js](http://processingjs.org/), a brilliant bit of JavaScript that enables many Processing sketches to run *unmodified* in web browsers. There are other implementations that hybridize Processing with [Ruby](https://github.com/jashkenas/ruby-processing/blob/master/README), [Scala](http://technically.us/spde/About), [CPython](http://code.google.com/p/pyprocessing/), and more. [J. Feinberg](http://mrfeinberg.com/)'s [Processing.py](https://github.com/jdf/processing.py) project is relatively new to this group, and I really like what he's done with it so far.

Processing.py is built on Jython, a Python implementation running on the JVM, and it enables Processing functionality with Python's sugary syntax. It supports both "static" and "active" sketches, sketch-specific global variables and methods, and all included Processing renderers. It is distributed as a .jar and to play with it you do not need Jython. Below is a toy syntax comparison:

#### Processing
<script src="https://gist.github.com/738650.js"> </script>

#### Processing.py
<script src="https://gist.github.com/738651.js"> </script>

These sketches produce the same result when run, but the Processing.py version doesn't have brackets, semicolons, or return types. This is exciting in itself, but it does more. I've rewritten Daniel Shiffman's [Wolfram CA example](http://processing.org/learning/topics/wolfram.html) to show off some of the differences you'll encounter between Processing.py and pure Processing. Some of the examples are contrived, some are more practical.

<script src="https://gist.github.com/738622.js"> </script>

### More information  

Full instructions and a quick start guide are available in the project's [readme](https://github.com/jdf/processing.py/blob/master/README.markdown). You can run my gist, try the included examples, and write your own. Additional information about the details of the implementation itself are available in a Google Docs presentation [here](http://goo.gl/hEWX).
