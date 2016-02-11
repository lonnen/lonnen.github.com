---
title: Introducing Introspecting
layout: post
summary: A Firefox 4 add-on developer tool for Processing.js
---

Coincident with the release of [Processing.js 1.1](http://processingjs.org/), I'd like to announce [Introspecting](https://github.com/Lonnen/Introspecting"&gt;Introspecting 0.1) -- an add-on for Firefox 4+ to assist in Processing.js development. At this time, it provides a command-line-like-interface for interacting with Processing.js sketches embedded in webpages.

To install, visit the project's [github page](https://github.com/Lonnen/Introspecting), hit the 'Downloads' button, select 'introspecting.xpi' and drag the file onto your Firefox window. No restart is required.

When installed and active the add-on checks each page loaded into the browser for the Processing object. When a page has Processing, it will load a pseudo-command line at the top of the page that allows you to interact with various Processing instances on the page. If multiple sketches are listed in Processing.instances, it will also present a selector box that allows you to choose the sketch in which your commands are executed.

Most commands work as they would in Processing. For example, `noLoop()` and `loop()` will disable and re-enable looping. To be clear, though, the code is interpreted as JavaScript. In order to overwrite `void draw()`, then, you would write something like `draw = function(){background(0);ellipse(mouseX,mouseY,pmouseX,pmouseY);}` Undo and Redo will move you through the command history.

This project was conceived of as an intermediary step between `println()` and FireBug for new Processing.js developers during a discussion with [Humph](http://vocamus.net/dave/) in the Processing.js irc channel. It was based on some earlier ideas for Processing REPL environments. Problems can be filed on Github and non-problem comments or suggestions can be e-mailed to me.
