---
title: "Six Seasons and a Stable Matching"
layout: post
---

Matching problems concern themselves with pairing things up. There are many variations across graph theory, economics, and operations research where the goal is to seek some set of matches with a particular set of properties.

One of the best known variants is the stable marriage problem, explored in 1962 by D. Gale and L. S. Shapley in [College Admissions and the Stability of Marriage](http://www.econ.ucsb.edu/~tedb/Courses/Ec100C/galeshapley.pdf). They describe an algorithm (now named after them) to solve the stability of marriage problem and the related college admissions problem.


## Of Stable Marriages and College Admissions

In the stable marriage problem there are two groups: suitors and suitees. Each person ranks every member of the other group according to individual preference. Gale and Shapley demonstrate that for any set of preferences there is a *stable* arrangement, and as long as no ties are allowed in personal rankings the Gale-Shapley algorithm yields the *optimal* matching for the suitors.

By stable, we mean no pair would be willing to abandon their current partners for each other. Any individual may prefer someone else to their current betrothed, but the object of their affections will not reciprocate by virtue of already having a partner preferable to the aspiring adulterer. By optimal, we mean that every individual is at least as well off under the current assignment as they would be under any other stable assignment. In this algorithm, whoever is proposing has the upper hand and will receive a stable assignment. If only a single stable matching is possible, the solution is globally stable.

It works like this -- unmatched suitors form a queue. One at a time they propose to the most desirable person who has yet to reject them. If the suitor has been rejected by everyone interesting the suitor simply leaves, unmatched.  When a suitee is asked, the suitor is compared to any current beau. If the suitor is preferable a new engagement is made. Any scorned former partner is now unmatched and heads to the back of the queue. When one pool or the other is empty no more matches can be made, and all engagements are finalized into marriages.

The algorithm is robust to unequal populations. It is even robust to individuals having limited preferences that don't rank all potential partners. Of course, this means that some people may end up unmatched _even in an optimal matching_.

The resulting arrangement must be stable because every suitor asks in order of their personal preference. Rejections only occur when the suitee already has a preferable partner, and engagements only break so that the suitee can trade up to someone strictly preferred to all previous partners. This way, no prior objections could possibly overturn under a new engagement.

The proof of optimality is left as an exercise to the reader [1].


## Open Enrollment, Stability, and Suboptimal Results

Variants of this problem have practical applications. Combining the suitors and suitees into a single group yields the stable roommates problem. Allowing one group to accept multiple partners becomes analogous to the problem of college admissions, where each school has a fixed number of slots and a preference over the applicants. As with the stable marriage problem, there is an asymmetric advantage to the initiator. This particular problem has provided practical insight for the [National Resident Matching Program](http://www.nrmp.org/), which seeks to optimally match medical students with residency programs. The NRMP has a slightly harder task, as since 1998 it has been accommodating joint submissions for couples seeking to be placed in the same geographic region. This particular variant has been [shown to be NP-Complete](https://www.sciencedirect.com/science/article/pii/0196677490900072).

So let's examine a novel variant for a moment, which is set up like the college admissions problem except that the college has equal (no) preferences over the applicants. This resembles community college admissions with open enrollment, and it is isomorphic to dividing up a mixed bag of candy or a list of chores. The variations on the problem necessitate small changes to the algorithm and result in a change in the properties of the outcome. Here I present the Greendale algorithm for finding a stable matching in the community college problem:

People act as the suitors, as in Gale-Shapley, asking for their top choice and receiving it or moving to the end of the line. People who have exhausted their list will exit the process as unmatchable. Since the resources being matched have no preference there will be no trading up -- the first person to ask for the resource will receive it and keep it. The process repeats until the line of people or the supply is empty.

The resulting matching is stable. Every item a person prefers to what he or she received _must_ have been asked for first, and everyone asks in waves. This means anyone who gets an item must rank it at least as highly as anyone who asks later and finds it out-of-stock. Whatever those latecomers end up with will be considered strictly inferior by everyone who managed to get the out of stock item. If it was not, they would have asked for the inferior item earlier and received that instead. Thus, the result is stable and no one will be willing to trade.

Optimality usually cannot be achieved in this variation of the problem because the pool of resources effectively has an equal preference for any matching. Equal preferences are disallowed in Gale-Shapley's construction of the problem, which is crucial to establishing optimality. In this construction, whenever a resource falls short of demand some people will end up with an inferior choice. Who ends up with what is determined by the initial order in which people interrogate the supply, since items have no way of re-entering the supply. Different orderings will all yield stable results, but individuals coveting the under-supplied resource will end up faring differently in different orderings. Thus optimality can not be achieved in any but the trivial scenario where resources outstrip individual preference. In this case the optimal matching is a global optimum because there is only one stable matching.


## Inspiration and Application

I became interested in the community college problem because this year [Mozilla Summit](https://blog.lizardwrangler.com/2013/03/31/mozilla-summit/) is being held simultaneously in three locations. [Mozilla WebDev](https://blog.mozilla.org/webdev/about/) has a fixed number of spots at each location, and we need a means of splitting up the group. Studying these matching problems has lent some insight into how to achieve an equitable matching of Pro Mozillians [2] to locations.

I now know that having to keep small groups together greatly increases the difficulty of the problem. This isn't a major problem, because we interpret one of the goals of Summit to be mixing up our usual groups and meeting Mozillians from other parts of the organization.

I also know that we cannot create a matching where everyone gets their top choice, but we can at least match people in a stable way. Of course, stability assumes that preferences are immutable, and many preferences may change when people find out where their friends will be going. This can be partly mitigated by putting everyone's preferences in the open and being transparent about assignment. This can also be mitigated by reinforcing Summit as an opportunity to mix up our social structures.

The initial order of the queue is incredibly important, acting as an implicit ordering for the resource pool. Often it can be determined by the context of the problem -- some problems may naturally order according to when preferences are submitted. Other situations may offer no useful clues, in which case you could certainly do worse than randomly ordering people in the queue.

Lastly, the algorithm may not acceptably accommodate extreme positions for real world applications. Extreme positions, in this case, means either not having any preferences, or abbreviating a preference list to reduce the possible matchings. The former is remedied by leaving them out of the matching and arbitrarily assigning them to whatever resources remain at the end. In case of the latter the individual risks not get matched at all. This risk is proportional to the number of people taking this extreme position. While stable, the global matching is presumably unacceptable if some people are unmatched. Possible mitigations are manual matchings, which will be easier before the algorithm is run, or preferential placement in the queue. It's notable that all possible mitigations afford the extremophile advantages, and extreme positions should be examined or disallowed to prevent gaming the system.

Despite its imperfections, I believe the Greendale algorithm, above, could be useful for solving real matching problems. It is simple and robust, runs in polynomial time [3], and it has well understood weaknesses that can often be limited or mitigated. It is similar to algorithms that have solved other real matching problems for 45 years. For matching large groups it certainly provides an attractive alternative to hand calculations that will unavoidably be biased, time consuming, and may not reflect the actual market of preferences. The study of these algorithms also helps inform the trade offs made when considering different features, such as group matchings or allowing extreme positions.

I hope this work can be of use finding an agreeable MozSummit matching for my team.




[1] The proof relies on induction and can be found in the original Gale-Shapley paper, linked above.

[2] I interpret all Mozilla employees as community members with pro sponsorships.

[3] In the worst case N people have identical preferences over N individual items, causing `sum(n..0)` iterations, which is bounded as `O(n**2)`
