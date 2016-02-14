---
title: "Pre-Integration Testing"
summary: Setting up litl's Leeroy at Mozilla, and how pre-integration testing has dramatically improved our day-to-day development.
layout: post
type: post
---

Reviewing a pull request to [Socorro](https://github.com/mozilla/socorro) involves a series of filtering steps up front before the reviewer even considers the substance of the proposed change -- does it violate the style guide? Does it pass our test suite? Most of these are checked by our CI server runs _after_ an SCM change. It's always embarrassing when you've thoroughly reviewed and merged a commit to find that it broke the build; and it effectively blocks the rest of the team from working while you sort out the failure.

But the preliminary steps get tedious, and that green merge button is so easy to click, and even when the reviewers do everything by the book differences in our developer environments and the servers we build and deploy from can lead to unexpected breakage.

If we run tests after code is integrated to master, why can't we run them before?

[Travis-CI](https://travis-ci.org/) does this, and it's awesome. I've set up libraries to run there and pre-integration testing has been immediately useful. Especially when new contributors drop by with patches. Unfortunately, Socorro's build process is a little more complicated and Jenkins is our CI of choice. Rather than maintain two separate build systems, I went looking for ways to get Travis-CI style testing from Jenkins. It needed to post the status of the build job back to the pull request, run automatically, and appropriately handle pull requests from other forks of the repo.

## Introducing Leeroy

I found [Leeroy](https://github.com/litl/leeroy), a small Flask app that listens to GitHub pull request events, parses them, and triggers a parameterized Jenkins build to test proposed changes before your merge them. As the job runs, Leeroy keeps the GitHub status API updated so the curious can follow along.

The project readme thoroughly covers installation. Leeroy requires accounts with access to your Jenkins server and your GitHub repo. You have to install a few plug-ins from the Jenkins UI, and then create a parameterized Jenkins job. I was able to clone our existing job and make a few tweaks to save space. Leeroy happily runs on a single Heroku dyno if you specify a port in your procfile (`leeroy -p $PORT`) and specify your own settings file with a `heroku config` variable. Once it's running, newly opened or updated pull requests will have some additional UI to show their status.

<img src="/media/leeroy/leeroy-running.png" alt="a screenshot of a running job" />

No developer is prevented from merging, but the UI does encourage smart behaviors by default. While a job is running or after it fails, the merge button is still present but no longer an inviting green. Instead it comes with a cautionary message.

<img src="/media/leeroy/leeroy-failed.png" alt="a screenshot of a failed job" />

A status dot appears next to each commit that was run as a build. I've configured ours to build only the tip of the branch when multiple commits are pushed. The dot is a permalink to the Jenkins job testing that commit, and on hover it displays the job number and status. As a feature develops in Socorro it will have multiple builds in the history to look back on, which can be helpful for the reviewer.

<img src="/media/leeroy/leeroy-success.png" alt="a screenshot of a running job" />

On build success, there's extra green on the screen confirming this change passed the CI tests. At this point, it's ready for a person to come along and examine the substance of the change, knowing that Leeroy/Jenkins has caught any style guide violations and obviously broken tests.

## How's that new robot working out?

Our LeeroyBot is only set up for Socorro components, but it is nearing 150 build jobs for its first week. About one-third of those were failures. At 25 minutes of time to discover each failure manually, the back-of-the-envelope has LeeroyBot saving our team about 20 hours, or 2.5 work days this week.

Furthermore, it's actually changed the way we review and develop code. Nobody is trying to be a wetware pep8, or checking every line for trailing spaces; the focus is shifted away from nits and onto the implementation. Quick fixes are much quicker, and feature branches have become more discussion like.

It's not a perfect system. Builds break on external dependencies sometimes. Network traffic occasionally times out. Updates to master don't cause existing pull requests to be re-run, so two commits that green light independently may have a poor interaction. All of these could be helped by manually triggering a build, but for the time being you need to modify the pull request commits to trigger a new build. I've filed the [issue 9](https://github.com/litl/leeroy/issues/9) to figure out a means of resolving this.

On balance, LeeroyBot has had an overwhelmingly positive response from the other devs, and, having survived his first week, will see only expanded use in the future. Many thanks are due to Joe Shaw and Charles-Axel Dein for their excellent work on Leeroy. I recommend it to anyone using Jenkins and GitHub in their day-to-day development.
