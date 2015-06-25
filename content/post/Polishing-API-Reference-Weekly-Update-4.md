+++
date = "2015-06-24T11:27:49+08:01"
title = "Polishing API Reference: GSOC Weekly Update 4"
series = ["GSOC 2015"]

+++

This is the fourth weekly update for the [LearnOverpass](https://github.com/osmlab/learnoverpass) Project.

This week's deliverable is to polish the learning platform's API reference.

## Modern Sensibilities

The changes required for this week required me to flex my design muscles a bit.

Martin's [pull request](https://github.com/osmlab/learnoverpass/pull/2) showed my lack of eye for the site's typography, with what me using a 2.5em line-height.

As the line-height issue was fixed, I also decided to pick a more modern typeface to go along with the site. I went with Google's [Roboto font](https://www.google.com/fonts/specimen/Roboto).

{{% image src="/media/images/gsoc-2015/overpass-compare.png"
    caption="Old typeface on the left, new on the right"
    style="width:600px" %}}

The redesign also features a more minimal menu, that now supports 'active' links.

{{% image src="/media/images/gsoc-2015/overpass-menu-compare.png"
style="width:600px" %}}

Syntax Highliting is also added to the site, to both the overpass editor instances and all the sample code blocks. This is done by using codemirror to make code blocks read only, using it for ad-hoc syntax highliting. There are a few performance implications of this, but offset by the advantage of not importing another library.

## Future-proofing

The Learning Platform utilizes Martin's excellent Overpass Turbo, but it's interactive map feature has [fallen behind](https://github.com/tyrasd/overpass-turbo/issues/23) a bit.

Since some of these features are going to be essential for the platform, I devoted a bit of my time this week to expand on these.

A pull request have sucessfully been accepted, and [mapCSS](https://github.com/tyrasd/overpass-turbo/pull/173) is now in the interactive map!

A dedicated JS API will soon be pushed to the repo too :)

## Next Week

Now that the API reference is complete, we're moving to a very exciting part of the project.

Two words: 'Interative Exercises'

Thanks, as always, till next time!
