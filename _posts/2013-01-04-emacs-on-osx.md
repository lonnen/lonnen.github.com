---
title: "Setting up OSX and iTerm2 for Emacs"
summary: Some notes from my experience getting started with Emacs on OSX.
layout: post
type: post
---

I've decided to give Emacs a spin as my primary editor in January. Learning a new editor has been refreshing, but OSX got in my way a few times when I was setting things up. Many thanks are owed to [James Long](http://jlongster.com/) for helping me with that. I wanted to share some of my experience for other curious parties encountering similar problems.

First: a note on my environment. I use [iTerm2](http://www.iterm2.com) instead of the native Terminal.app and I highly recommend you install it right now if you haven't already. There is an older Emacs preinstalled on OSX, but since I've universally had trouble with other preinstalled dev tools I installed Emacs 24 via Homebrew. I used the optional `--cocoa` flag, though I run it exclusively in the terminal.

Emacs has two modifier keys used for issuing commands to the editor, referred to in the documentation as `C-` and `M-`, short for `Command` and `Meta`. By default these are `control` and `option` on an Apple keyboard, respectively. This presents two problems: first, control is awkwardly placed and uncomfortable to use frequently; second, the `option` key already has OSX-level functionality.

To help save my pinky, I opened up `System Preferences -> Keyboard` and hit the `Modifier Keys` button. From this preference pane I remapped `caps lock` to `^ Control`, which changes the functionality throughout the OS. Now `C-` is comfortably within reach of my hands from the home row.

The `M-` char still presented a problem though, as `option + [other key]` is interpreted into special characters. To fix this, I used an iTerm2 feature. In `preferences`, under `profiles` and in the `keys` tab you can specify either the right or left `option` keys to send `+Esc` instead, which Emacs will treat as `M-`. I chose to alter only my right `control` so that I could still use the left if I needed default behavior.

At that point I had both `C-` and `M-` working, but I found `option` uncomfortable to reach for all the time. Another iTerm2 preference, this one under `keys`, allowed me to swap right `command` and right `option` keys. This is a little more comfortable to use frequently.
