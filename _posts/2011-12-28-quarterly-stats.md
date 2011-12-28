---
title: "Quarterly Stats"
layout: post
---

The quarter (and year) are winding down, and on the [Socorro](https://github.com/mozilla/socorro) team we're looking back at what we've accomplished. In addition to stats from our bugtracker and quarterly goals lists, we use the following scripts to derive additional data points from our source control. These give us an idea of what we've done well, where we can improve, and what kind of performance we can expect for the upcoming quarter.

These tools rely on `git log` to do a bit of heavy lifting. You can manipulate the flags to drill deeper into the data set. Try filtering commits by author, date range, or use the built in `--grep=` for really powerful filtering. Read more with `man git-log`.

<script src="https://gist.github.com/1528883.js"></script>
