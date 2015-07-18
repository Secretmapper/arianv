+++
date = "2015-03-15T10:48:18+08:00"
title = "My First Month with Vim"
tags = ["tools"]

+++

Today celebrates my first month with vim.

It also marks the first time I did a custom configuration on my `.vimrc`. When I said 'custom' it means that it was not just some snippet I found from the internet, it was an actual, personal configuration that made 'vim' my own flavor of 'vim'. This, I think, is the point when someone can say they have graduated from vim noob, to vim user.

# Hipster Coding

Vim is _the_ editor. Not just any editor. __THE__ editor. You know for [real programmers](https://xkcd.com/378/)

Just a couple month ago I made the switch from Windows to OSX, biting the bullet and buying myself a 13" rMBP. I've come to enjoy the transition so far, finally having the versatility of UNIX on my machine.

The more than positive experience of switching OS made me want to experiment with my tools more, and seeing [Jonathan Blow programming on Emacs](https://www.youtube.com/watch?v=UTqZNujQOlA) inspired me to switch to these classic editors. I already used Emacs back in the day, and while it is a good editor, I was looking for something a little more lightweight and nimble. Working with Javascriptmost of the time, I would much prefer a speedy editor like Vim against fancy IDE features that Emacs could offer.

# The Learning Curve and Progressive Hacking

I was intimidated at first. Vim is well known to have a pretty brutal learning curve, and I had contracts whose deadlines won't extend to account for me learning a new editor. This was a potential show-stopper right from the get go.

{{% image src="/media/images/editor-learning-curve.png" caption="This image is as classic as the editors themselves" %}}

I figured though - when would I ever just commit to learning vim? I've programmed enough to know that perfect opportunities to learn things never really present themselves, so I decided to learn it like how frameworks or languages are learned, _just effin' use it_

I started using vim just like how I used any other editor. My first day was spend scrolling around and clicking on things, all to no avail (I was running on a terminal, and vim doesn't support mouse events by default). I pretty much never touched normal mode at all, spending most of my time in insert mode and moving along with the arrow keys. Searching for a string in my project involved a (rather pathethic) workflow of having sublime text running in the background, where I could quickly use 'find in files' in the familiar GUI.

After a few days, I switched from using cursor keys to `hjkl` keys, and I learned how to use `:edit` to switch files without closing and reoping vim all the time. Eventually I installed my first ever plugin, `NERDTree` which adds the much needed file navigation system.

You see, I made it a point to progressively learn vim, and that involved grabbing packages and learning things only when I found that I 'needed' them.

This philosophy pretty much defined how I learned vim. Editing properties in `json` files made me learn `ci`, and looking into more efficient insert commands made me learn `o`, `I`, and `A`. Maintaining a javascript codebase with variable indent widths made me learn the very first big trick that made me go wow - `gg=G` (indent the whole file). The idea that the whole thing relies on individual commands made it more awesome - `gg` goes to the start of the file, `=` indents, and `G` goes to the end of the file. After learning that, I found myself using `=` more, such as with `v` and `%`

Vim had an admittedly steep learning curve, but I don't really think it is as hard as a lot of people claim it to be, as long as you take it in incrementally. 

I went on adding more and more features I needed one by one.

As a slave to aesthetics, I added the Solarized theme. This also made me switched to iTerm, which, apart from supporting 256 colors, also had an excellent show/hide feature that can be keybinded. This, with the fullscreen gave me an unparalleled productivity boost.

{{% image src="/media/images/vim.gif" caption="My editor is an `alt space` away" %}}

YouCompleteMe provided some much needed auto complete. I used Fugitive for Git, and I finally learned how to use Ack to search for things. Linters? Syntastic. Code expand? Emmet. Et cetera, et cetera.

I found my slow growth of skill in vim incredibly exciting. Eventually, I found myself more productive than my previous Atom/Sublime using self.

It is certainly one of the best investments I ever made.
