+++
date = "2015-08-27T13:40:39+08:00"
title = "LearnOverpass Final Report"
series = ["GSOC 2015"]
tags = ["JS", "Hugo", "Webdev"]

+++

This year I participated in my 2nd GSOC journey. I worked for the OpenStreetMap Foundation developing an integrated learning platform for their Overpass API which we (me and my mentor) affectionally called [LearnOverpass](http://arianv.com/post/GSOC-2015-Introduction/)

It's been three months since I started the project, and LearnOverpass is now live and functional - and while the consensus is still out, I'm definitely happy with the results!

# Exercises, exercises

One of the definite 'killer features' we aimed for in LearnOverpass is the inclusion of interactive, playable exercises - with the goal of introducing users, to the Overpass API through active engagement. Reading docs is boring, actually playing around and seeing results is FUN.

Keeping the exercises informative whilst crafting an engaging story was a very tough act to balance. Focus too much on the story, and pedagogy might suffer. Focus too much on the topics on the other hand, and you might end up with nothing better than just your usual documentation.

It was the culmination of many efforts, Martin's and everyone in the mailing list gathering around and nitpicking on the exercise lessons, to figure out a way to make them engaging and worthwhile, and we must say that we've achieved that goal.

# Meet Bob

Bob is LearnOverpass' protagonist, whose antics we use as an anchor to sprinkle, little by little, concepts of the Overpass Query Language.

Starting with the "Hello World" Query (a bounding box query to find nodes in a certain lat/lon box), we continue by teaching filters, making sure to keep a close feedback loop with the user and the exercises. As the user gets more and more comfortable with them, we add more topics and queries, eventually showing certain language semantics (i.e. how things work™) through visual examples and metaphors.

As we move from concept to concept, we also remove certain training wheels, removing boilerplate code here and there to ensure retention and keep the queries from getting stale.

LearnOverpass' story never really gets in the way. It was a useful tool to keep the natural progression between queries, and the plot was simple enough not to take too much focus away from the query language, but engaging enough to keep the users interested in more, providing a faculty for familiarity (the very concrete bob and his needs for location info) to an otherwise abstract field (querying).

{{% figure src="/media/images/gsoc-2015/turbo-hello.png" caption="LearnOverpass' Hello World"%}}

# Project Completion Report

The Documentation is comprehensive and a pleasure to view, and all it's required features have been completed through and through. The interactive overpass map presenting usage examples allows the docs to be more comprehensive in showing different uses for every query, and is definitely fun to experiment on as a beginner.

The Exercises on the other hand has a very solid foundation. Not requiring any programming knowledge at all (except Overpass QL of course!) to add exercises in, it is very easy to craft user-created exercise module, allowing the community to participate and create exercises. Crafting a dedicated Javascript API for Overpass turbo through `postMessage` allowed for greater flexibility, making the interface (relatively) error-proof. Push notification 'style' hints show up on wrong answers, while getting the right one triggers a simple 'next lesson' prompt.

{{% figure src="/media/images/gsoc-2015/learn-exercises.gif" %}}

The introduction exercise is a pretty great intro, but I do wish I had more time to complete all of it in the GSOC's timeline. There was a definite lack of Recursion concepts explained in the intro course, which is a shame, as it is one of the most complicated aspects of the Query Language.

All in all though, I would say that the general outcome is pretty good! When comparing with the initial project specification, I think that a good chunk of it has been completed.

# Moving Forward

Now that the GSOC's run has ended and I'm going back to college, my time for development will greatly decrease. However, as a project I had a hand in from start to finish, I really want to see the project grow and realize it's full potential, essentially making sure that LearnOverpass will really be the "definitive, one stop learning resource for the overpass API" as me and Martin have imagined. With that in mind, I will contribute more exercises into the project, especially the heavy recursion parts, the lack of which produces a big hole into the otherwise complete intro course.

The project also includes a pretty comprehensive contribution guide, with our hope to involve the community.

Which is pretty great, since we already are! Jo has written a more advanced exercise [lesson](https://docs.google.com/document/d/1VPGgljCXrwr1ZtjKCp9xG2C0I1C_GRX6Mlk0PTejFEk/edit#heading=h.brctw0f48q4c) which will be integrated into the platform soon :)

All in all, working on LearnOverpass has been an incredibly fun, productive experience. I'm incredibly happy with the platform used, the technical challenges made me grow as a developer, and getting to work on an open source project with a very active community is a real delight.
