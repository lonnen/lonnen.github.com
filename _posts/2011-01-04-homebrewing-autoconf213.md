---
title: Homebrewing autoconf213
layout: post
---

[Homebrew](http://mxcl.github.com/homebrew/) is an excellent package manager for OS X. When I went to build Firefox earlier today it had most of the required packages available for me, but was missing autoconf213.

A little digging revealed that there used to be an autoconf213 formula, but it was folded into the spidermonkey formula. In the ticket for [Issue 3523](http://github.com/mxcl/homebrew/issues/issue/3523?authenticity_token=f3dfc83f12144ace1bc32509e7dd768822700444) it was decided that this decision should be reversed, but the formula hasn't reappeared yet. 

I dug up the old formula from a prior version of the repo (version control seems magical, sometimes) and dropped it in my `/Library/Formula` folder, after which I ran `brew install autoconf`. The formula is 'keg-only', meaning it doesn't get linked for general use. Running `brew link autoconf` created the appropriate symlinks and the Firefox build ran smoothly.

Until the formula comes back, feel free to use the attached copy of the old one. After it reappears, I would use the more current version in the main repository.   

<script src="http://gist.github.com/765545"></script>
