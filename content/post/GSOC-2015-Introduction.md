+++
date = "2015-05-02T18:52:11+08:00"
title = "GSOC 2015 Introduction: LearnOverpass"
series = ["GSOC 2015"]
tags = ["JS", "Go", "Webdev"]

+++

Last year, I worked with the Wordpress organization to integrate socialization and gamification features to the Glotpress translation platform. It's been a fun fulfilling ride, and there are definitely a lot of things that I learned during the project.

This year, I've been accepted to Google's Summer of Code Program again and I'm working with the OpenStreetMap organization to create LearnOverpass!

# What is [LearnOverpass](https://github.com/osmlab/learnoverpass)

[The Overpass API](http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide) is a robust API for querying map data, but it's use is still limited due to its beginner-unfriendly documentation and scarce tutorials. With the Query Language's specialized semantics and a usage audience that can include non-developers, the lack or learning resources is a opt-put problem of the API.

LearnOverpass is a project that aims to solve that problem, by creating a complete, one stop, learning resource for the overpass API. We aim to make it easier for newcomers to learn and use the Overpass API for querying OSM data.

The Overpass API has an existing language guide found in the [Open Street Map wiki](http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide). It's pretty comprehensive, and it's all right. 

But it's not _great_.

If you're familiar with the Google Summer of Code program, you will probably know that documentation cannot be accepted as a project.

Because this is not just a documentation project - we are creating something more. We aim to create a __great__ learning platform for beginners. 

Flat documentation is boring.

How much more fun would it be to __learn by playing with an interactive tutorial__ instead of passively reading a wiki page?

## A bid on interactivity

One of my favorite video on education is Bret Victor's talk on 'Inventing on Principle'

{{% youtube PUv66718DII %}}

Engaging and interactively seeing how the programming language, in this case the Overpass Query Language, directly interacts with the output data will provide a powerful learning model to learners. Due to the possibly visual nature of the Overpass API's output, adding a dash of interactivity allows API users to more easily and understand the execution of their queries.

We aim to create a learning resource more user friendly than the documentation in the OSM Wiki. We want to create a platform where users can easily answer their own questions by searching, and playing, with the documentation. A platform that that can be referred to by anyone in the world, from OSM users with zero programming background, to experienced, developers looking to utilize the API.

LearnOverpass in short, will fulfill it's goal by providing a __fun, interactive platform__. 

Concretely, it will include this three main features:
- A beautiful API Documentation interface. Reference for syntax, detailing description, parameter types, etc. of Overpass queries.
- An embedded interface to test out queries, allowing users to experiment with parameters/methods inside the API Documentation page themselves.
- A set of Interactive Exercises that allows beginners to learn the different facets of the Overpass API in a fun and easy way.

## Current Progress

The project has officially started, and you can visit [LearnOverpass live](http://osmlab.github.io/learnoverpass/en/).

Right now, the project has only been bootstrapped - adding the frameworks/preprocessors needed, as well as including initial layout and styles.

LearnOverpass is powered by the Static Site Generator [Hugo](http://gohugo.io). Since Hugo doesn't include any features for the asset pipeline, I use [Gulp](http://gulpjs.com) as a task manager, responsible for minifying my html files, compiling source such as `stylus` to `css`, etc. Hugo doesn't natively support i18n so I also had to do a few things to work around this.

However, Hugo's lack of an asset pipeline works to the project's advantage: decoupling it with content means that potential content contributors only need to install hugo to test out and run a local copy of the site.

That pretty much ends my update for the week.

Development has been on schedule, and for next week, I'll be working on integrating Martin's [Overpass Turbo](http://overpass-turbo.eu) to the site's API reference page. This brings the concept of interactivity to the site - allowing, and even encouraging users, to experiment with the paramaters as they view the API documentation itself.

Martin Raifer (@tyr_asd) apart from creating Overpass Turbo, also acts as my mentor for this project. This project would not have come to fruitition without him and his initial project writeup, as well as his continued guides and advice for the project's direction.

## Am I crazy? See anything wrong?

If you have any reactions/comments, reach me out through email, the comments below, or on [twitter](https://twitter.com/secretmapper). I can also be found on the Overpass API mailing list. 

If you spot a bug, or think the project could really use a feature, feel free to create an issue in the project's github page.

Ideas and/or contributions/opinion for content are heavily accepted! Shout out to Alex Morega who freely contributed his [resources](https://github.com/mgax/workshop-geocj2015-overpass/blob/master/README.md) from his Overpass API Workshop, Pierre Béland for outlining sections for Overpass, and mmd for pointing out the Overpass by [Example Wiki page](http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example). 

Thank you! I'm really excited about this project, and I hope the community will have as much fun using the project as I had developing. Let's create LearnOverpass, the best learning resource for the Overpass API together!
