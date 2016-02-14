---
title: "Building a Shanty Town"
summary: We've started using Puppet and Vagrant for building dev environments. Here are the pitfalls I've encountered, workaround for these pain points, and links to resources if you're thinking about doing the same.
layout: post
type: post
---

November and December have been a period of heavy investment in creating or enhancing the [Vagrant](http://vagrantup.com/) infrastructure on Mozilla's [Socorro](https://github.com/mozilla/socorro) and [DXR](https://github.com/mozilla/dxr/) projects. Vagrant is a lightweight VM management tool for Virtual Box VMs. Coupled with Puppet or Chef it provides a reproducible sandbox for locally deploying projects in a production-like environment. You can store the scripts in your project's repository and share the folder from your host machine into the VM. Develop your files locally, and changes are automatically mirrored into the VM without needing `scp` or external synchronization.

The Mozilla Ops group uses [Puppet](http://puppetlabs.com/) to automate large portions of our architecture, so it seemed the natural choice for our Vagrant VMs. Puppet is a declarative, object-oriented DSL with many built-in resource types. There are primitives for installing packages, running services, and copying whole files onto the VM. Declare the resources you need along with their dependencies and Puppet figures out the application order. Take a look at a basic manifest taken from the DXR project, containing a single class:

<script src="https://gist.github.com/4378100.js"></script>

This manifest will install the apache2-dev package, then copy an apache conf file from the DXR repository and set some permissions on it. Then it will start apache running as a service. Iff mod_rewrite and mod_proxy are present they will be enabled, though when those commands execute is not known. It is, however, consistent -- on multiple executions of Puppet the commands will execute in the same order.

Inheritance works classically, which can be used to great effect if you're working with a distributed system. For example: the Socorro project has a number of small web components that talk to each other over HTTP. Socorro's Puppet manifests declare a base class that installs common packages and starts process monitoring, logging. The base class is extended into a web service class, which starts an Apache service with associated configuration and mods. Individual components then extend the generic webservice and override just the resources that differ between them. The resulting code contains minimal boilerplate.

Puppet ensures that necessary environment changes are not passed around in IRC or just on one dev's machine, but written down in a testable, executable fashion and shared throughout the team. It also minimizes the onboarding cost of new community and new fulltime developers.

Switching to a Vagrant+Puppet set up for local development brought the cost of setting up Socorro down from a day to an hour. DXR saw a proportional time savings. A scriptable set up lowers the risks and costs of major changes to the software stack, and bounds the worst case at destroying and recreating the VM. There's plenty of room for improvement, though, especially when bootstrapping the initial Vagrant+Puppet set up. If you're considering a similar set up for your own project, here are some of the pain points:

Changing the Puppet manifests usually involves destroying and recreating your VM to ensure some old state isn't covering your mistakes. Even if you've cached the base VM locally this can mean between 10 and 45 minutes to test any change to Puppet code, which is painful to a web developer used to speedy interpreters and REPLs.

Furthermore, some of the design decisions in Puppet favor its primary use case -- large, daemonizaed deployments on production hardware -- to the detriment of single boxes. Errors tend to pass quietly. Puppet won't abort or even log information beyond that something failed without an explicit directive. To help with this, we include the following in our initialization manifest:

<script src="https://gist.github.com/4378109.js"></script>

The capital `Exec` will set the option for the `exec` statements that follow. You'll still have to carefully read Vagrant's debug output, though.

Lastly, but maybe most noticably, it can be difficult to translate shell scripts into Puppet code. A direct translation would have a series of `exec` statements `requiring` each other in a linear chain of spaghetti code. Puppet can be more expressive, but at times there isn't a clear way to translate a bash script. When faced with this in a Vagrant+Puppet setup, it's ok to just use the bash (or fab, Make, etc) script if that's really the best way to describe what you're after. A clean, consistent, reproducible environment is the goal, and fiddling with little changes can be extremely expensive on your time. You've got code to ship.

Despite these issues, Vagrant+Puppet have vastly improved our development processes wherever we've introduced them. If you're thinking about tackling this for your own projects, there are some great resources to help. [Richard Crowley's excellent PyCon 2011 talk](http://rcrowley.org/talks/pycon-2011/#1) is a more thorough overview of why and how to use Puppet, targeted at beginners. [Several](https://github.com/mozilla/playdoh) [Mozilla](https://github.com/mozilla/dxr/tree/testing) [projects](https://github.com/mozilla/socorro) have Vagrant files and puppet folders to check out for [real examples](https://github.com/mozilla/popcorn_maker/) of how we use it for local development. Lastly, [Puppet's documentation](http://docs.puppetlabs.com/references/latest/) is sometimes overwhelming, but cannonical.
