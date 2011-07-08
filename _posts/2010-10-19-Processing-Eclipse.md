---
title: "Processing &amp;&amp; Eclipse"
layout: post
---

For the last several months I've been able to work full time on [Processing](http://processing.org/) thanks to generous support from the good folks at [Fathom](http://fathom.info/). Most of my efforts in that time have been devoted to developing a Processing Plug-in for [Eclipse](http://www.eclipse.org/). Unlike p5exporter or some of the tutorials for using Processing Java libraries in Eclipse Java projects, this plug-in aspires to provide support for the language proper.

Right now the plug-in has many, but not all, of the features offered by the Processing Development Environment (PDE) that ships with the language. Syntax highlighting, creating, importing, and running sketches are all there. Additionally, it provides some error checking as you work. In the file system it stores some extra files, but efforts have been made to ensure that it works well with the PDE. Sketches created in one can be worked on in the other. It still has some rough edges and construction warnings, but it is fairly stable and functional.

As this is part of an open-source project, I am looking for community feedback and involvement. If you're interested in playing with it, installation and getting started instructions are posted in the [Processing Wiki](http://wiki.processing.org/w/Eclipse_Plug_In) and the [Issue Tracker](http://code.google.com/p/processing/issues/list) for Processing has been modified to include the "Component-Eclipse" label. Bugs and feature requests should be directed there.

I have tested and verified it as working on&nbsp;OSX 10.6.4 and Windows XP (SP3) in fresh installations of the Eclipse IDE for Java Developers. I've also verified it works on Ubuntu 10.04 LTS, using apt-get to install Eclipse 3.5 with JDT.
