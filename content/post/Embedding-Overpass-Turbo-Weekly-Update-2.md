+++
date = "2015-06-11T15:50:28+08:00"
title = "Embedding Overpass Turbo: GSOC Weekly Update 2"
series = ["GSOC 2015"]

+++

This is the second weekly update for the [LearnOverpass](https://github.com/osmlab/learnoverpass) Project.

This week's deliverable is to integrate [Overpass Turbo](http://overpass-turbo.eu) inside the learning platform.

{{% figure src="/media/images/gsoc-2015/overpass-turbo.jpg" %}}

From the get go, we knew we wanted to bring out a REPL-like interface to LearnOverpass - we want to encourage users to actively try and experiment with the Query Language.

<div class="cf">
{{% div class="g6" %}}
  The Overpass API guide in the wiki already knew that seeing the results of the query is useful. Code snippets always contained an overpass turbo link that would automatically insert the code snippet to the overpass turbo page.

  It's a functional setup, but it's clunky - it'll require the user to navigate to another tab/window and lose the context of the snippet (the wiki page). 
{{% /div %}}
<aside class="g6">
  {{% figure src="/media/images/gsoc-2015/turbo-btn.png" %}}
</aside>
</div>

Embedding the Overpass Turbo interface directly to the documentation makes the most sense, so that's what we did.

{{% figure src="/media/images/gsoc-2015/turbo-embed.png" caption="Overpass Turbo embedded inside LearnOverpass" %}}

The embedded interface would be present in most of the language's _statements_ reference, serving to show its usage. In the example capture in the image above, the query above shows the results of a Difference Block Statement. The result is visually striking - the nodes in the middle are removed by the difference statement.

Of course, the results of some statements cannot be adequately seen visually. In that case, the JSON results are shown.

There are a lot of ways we can play with this embedded interface. As an example, the `union` statement may show different colored nodes, emphasizing that it is the union of its substatements. The `poly` statement may take the form of a star, and the user can easily __experiment with the query directly on the page__.

## Technical Details

Embedding an Overpass Turbo from an iframe was the way to go. 

The documentation reference only needed the output map - the coding editor instance would be placed in the site itself. I then dove into writing scripts that would do remove the editor part of Overpass Turbo. This was not particularly tricky, as Overpass Turbo had a toggle wide map feature, which would remove the coding interface. By then, only scrolling the contents of the iframe was necessary to remove the top bar, and we would have hit gold.

However, Martin informed me that Overpass Turbo included a standalone map output - it was obvious then this is what I've been aiming for from the start! Martin pointing this out feature greatly accelerated development, as that meant I only had to embed this page and pass the user's input from CodeMirror through a GET request.

The initial plan for the site was to use React for the coding interface. It makes sense - it's a 'hot' framework (right now at least) and I have experience with it.

Programming the coding interface however, it was evident that this might not have been the best idea. React would require me to write my templates using jsx (or use their API), which did not make sense as I could already use Hugo for templating. It introduced too much overhead for what was essentially changing the src url (sending the GET parameters).

It was obvious - I was overengineering.

So I went ahead and programmed the whole thing in plain javascript, and it could not have been easier.

It wasn't all a waste though - I did not get out of this experience empty handed. A more complete framework will be useful once we start integrating interactive exercises in LearnOverpass, and integrating webpack/dependencies.

This early though, Occam's Razor very much applies. [VanillaJS ftw](http://http://vanilla-js.com).

## Next Week

For the next 1 1/2 weeks or so, the focus of the project will be the creation of the API Documentation/Reference. The important thing here is to make the pages standalone and to utilize good code snippet samples to show a statement's use.

Till next time!
