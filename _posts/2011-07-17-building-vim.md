---
title: "Building Vim"
layout: post
---

OSX's included version of Vim has done well by me for a while, but I've hit the point where I desire some features from newer versions. MacVim is popular among my colleagues, but I like staying in my terminal. It helps to keep my development environment consistent when I'm SSH'd into a dev box, or a virtual machine, or working on a non-Mac.

Updating Vim requires compiling from source, which goes beyond sharing dotfiles. I can't just slap the binary in my dotfile repo and pull it down, because my environments are not homogeneous enough. Instead, I've put together a little compile script that will let me build a better Vim without requiring elevated privileges.

<script src="https://gist.github.com/1088069.js"></script> 
