+++
date = "2015-06-18T13:46:54+08:00"
title = "Porting API Reference: GSOC Weekly Update 3"
series = ["GSOC 2015"]
tags = ["JS", "Hugo", "Webdev"]

+++

This is the third weekly update for the [LearnOverpass](https://github.com/osmlab/learnoverpass) Project.

This week's deliverable is to 'port' the API reference to the learning platform.

## Existing Resources

The 'sales pitch' of LearnOverpass has always been _'a one stop, learning resource for the overpass API'_ - we wanted the site to be the de facto page for learning the Query Language.

To do this properly, we need to make use of, and expand, [existing resources](http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL) of the language.

## Query Goodness

To get my project specification accepted, I had to write a solid plan, a set of goals, etc. One of the things I needed to have was to create a mockup of the application, and one of those was this little gem:

{{% div class="post-width post-all-center" %}}
| Query| Parameter                  | Description |
| ---- | -------------------------- | ----------- |
| poly | space delimited coordinates| an Array of points for the bounding polygon |

      node(poly:"x1 y1 x2 y2 x... y... xn yn");
{{% /div %}}

Expand the queries and methods, decompose how they work, and make them standalone enough. Just like standard documentation pages.

But this model of a query + parameter combo reference wouldn't really work for the project - the Overpass QL is not a framework or a library with a _set of methods_, it is it's own __Query Language__.

Because of this, it was evident that there is a better way to create the reference page. the more sensible way was to document it how Query Languages are documented, like MySQL does.

As an example, you can see how the [`CREATE TABLE`](http://dev.mysql.com/doc/refman/5.6/en/create-table.html) statement is documented in the MySQL reference manual. Much like the Query Language in the reference wiki - the syntax and form was shown as to how to properly use the statement.

## Learning By Example

With the [embedded overpass turbo interface added last week]({{< relref "Embedding-Overpass-Turbo-Weekly-Update-2.md" >}}), we were able to create conclusive visual examples per statement's usage. Properly crafting the right queries that show the different uses of the statement and it's quirks took up the bulk of this week's task.

To make the examples more interesting, statements that would query in famous landmarks were used: in the reference pages we see the stonehenge, the peak to Christ the Redeemer Statue's Mountain, and others more.

## Next Week

The next week will be dedicated to polishing and fleshing out the API reference, as there are still a few statements that could have better examples. Since the reference now support multiple examples per page, we're also looking into creative uses to this - currently it's only being used to differentiate the `out;` and `out meta;` statements, but we could further use it to show the different `By tag` filters for example
.

There is also going to be a couple of improvements coming in the way of Overpass Turbo. Currently the interactive map [doesn't support](https://github.com/tyrasd/overpass-turbo/issues/23) a few features that would be integral to the coming interactive exercises feature, so I'm looking into implementing this and doing a pull request.

This feature would also be useful to make the examples more visual - imagine a `union` statement with different colored nodes powered by MapCSS!

That's it for this week! Again, feel free to let me know if you see anything that could be improved by commenting below!

Till next time!
