---
title: Algorithm P(ython)
layout: post
---

A while ago a friend sent me a simple puzzle: write a program that enumerates all sets of nested parenthesis. I started with an intractable, naive solution and after some discussion and a dead end or two I wound up with a decent dynamic programming solution.

In Knuth's *The Art of Computer Programming*: volume 4 section 7.2.1.6 he describes Algorithm P, which is much more clever than the one I came up with. It prints the nested parentheses in lexicographic order. I implemented it in Python and figured I would post it for folks put off by Knuth's notation.

<script src="http://gist.github.com/706687"> </script>
