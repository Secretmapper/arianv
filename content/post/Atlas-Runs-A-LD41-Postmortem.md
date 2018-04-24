---
title: "Atlas Runs: A LD41 Postmortem (with Phaser 3)"
date: 2018-04-24T13:16:25+08:00
tags: ['JS', 'Gamedev']
---

[Ludum Dare](//ldjam.com) is a recurring accelerated video game development event. It is a hackathon-like competition where participants can join a compo (one person creating a game in 48 hours) or the more casual jam (72 hours with optional team members)

I haven't made games for quite some time now, focusing mainly on ReactJS and Web Development, so I thought it was a perfect time to join. While I have a lot of experience programming and joining accelerated development events (winning quite a few in the process), creating a game where I was responsible for everything (I usually work with a team of artists/musicians/etc) would be quite a challenge.

# The Game

Ludum Dare events are tied to a theme, and the theme for LD41 was ["Combine 2 Incompatible Genres"](https://ldjam.com/events/ludum-dare/41).

I can't lie that the theme caught me off guard - previous Ludum Dare themes tend to be based on ideas/keywords (i.e. 'Growing', 'Alone', 'You are the Villain').

{{% image src="/media/images/ludumdare/mindmaps.jpg" style="width:600px" %}}

After a quite involved brainstorming session, I eventually settled upon platformer and tycoon/real time strategy genres. Towns in RTS games can't move, while platformers are inherently rooted in movement, and this odd combination lead to eureka moment of having the platformer needing to 'move' the town, with each 'genre' affecting the other.

After coming up with this mechanic, I was reminded of Atlas, and by extension, Atlas Shrugged. By this point, the game's pun was cemented in my mind and the idea was born:

{{%
  image src="/media/images/ludumdare/ld41-title.png"
  style="width:600px"
  caption="The game is available [here](//atlas-runs.surge.sh)"
%}}

## Gameplay

Of course, just combining 2 disparate genres for the sake of it is just poor design. What made me pursue the idea however, was coming up with reasonably interesting mechanics with how the genres could interact with each other:

- Constructing buildings makes the town heavier, slowing down Atlas or reducing his jump height
- Constructing tall buildings block off some paths (areas with low ceilings) forcing you to be smart with how you build the town
- Movement affects the town - excessive movement could be akin to an 'earthquake' that triggers adverse effects
- Positioning affects production - being outside 'on the sun' increases food production, while being in windy environments powers windmills
- Buildings/Units can help Atlas out, attacking enemies in platformer segments or building structures that could help manoeuvre obstacles

I knew I wouldn't be able to implement everything in 48 hours (mechanic wise probably, but art was the tricky one), so I opted to pace myself properly and at least complete a subset that would lead to reasonably interesting vertical slice.


# The Process

Programming was easy for me, but art and music was another story. Despite this, I wanted to challenge myself in all areas, and that meant using the time to experiment with my tools and workflows.

## Code, Javascript and Phaser 3

Phaser is a powerful and popular HTML5 Framework that I've used multiple times already, both for my own games and for contract work.

Its newest version Phaser 3, is an entire new beast altogether. It is a complete rewrite that had only been released about one and a half months ago, and I was eager to try it out.

Phaser 3 continues to be an awesome framework, with some of its newest additions proving to be essential in my game. The camera system is a lot more powerful, groups are now logical containers/object pools, the display list is now flat (which results in performance gains), and depth management (z-sorting) is a lot easier to manage.

There's also quite a lot of improvements on overall management, with lifecycle, input, scene and animation registration much easier to work with (and probably faster with the way it's written in now).

There are however some snags I hit along the way. As a rewrite it still had some features from Phaser 2 that was missing, and the documentation was useable, but not as great as it could be yet.

There's quite a lot of abstraction going on with Phaser and how it renders things (which is just fair, Phaser 2's renderer was Pixi), but it seems to be plenty powerful with support for custom rendering pipelines. I wasn't sure how I could capture buffers and postprocess them, but it seems to have primitives that could facilitate if I digged into it more.

Overall, I found the entire development experience positive and I find myself very happy with Phaser.

## Art and Aseprite

For Art, I opted for pixel art with [Aseprite](http://aseprite.org) as my tool of choice.

{{% image src="/media/images/ludumdare/sprite.gif" caption="Atlas was the first sprite I drew for the game" %}}

I really liked the look of Atlas in the game - he has chunk and heft, but it did present a challenge - he had too many pixels! This increased the complexity of the art I needed in the game, since consistency would mean that I needed high resolution for the other sprites as well.

For asset management and preparation, I wrote a quick script hooked into my build process that would export the frames from aseprite, pack them into a texture with TexturePacker, and spit them out to my assets directory.

## Music and Sound

Music was the least worked on part of my game - I 'composed' it near the tail end of the compo in the last few hours using [bosca ceoil](https://boscaceoil.net). At first I wanted to create a more 'epic' and theme appropriate music for 'greek myth', but Chiptune allowed me to at least create something quickly enough to add into the game.

For sound effects, it was just me recording myself and applying some editing on post.

# Deployment

After the sound effects were done, it was off to deployment! I opted to put the game up through [surge](surge.sh) - quick and easy!

## What went wrong

- **Experimentation** - this isn't so much as a 'wrong' - I came into the compo wanting to experiment (hence Phaser 3 for example). However, it did slow me down a bit, with me having to look into the source for documentation and having to rewrite some stuff due to misunderstanding how the framework functions.
- **Texture Packer license** - Texture Packer licenses are a yearly subscription, and since I've mainly focused on web development lately I haven't renewed it. I had to pack my assets using a trial on Windows PC. I think there might be merit on creating an open source texture packing solution that has the features I need :)
- **Complex art design** - my design for Atlas had too much definition. While he looks okay, the rest of the art had to suffer. It probably would have been better to stick to 16 bit sprites - this would have allowed me time to make more and better looking assets.


## What went well

- **Workflow** - despite not developing any games in recent memory, my extensive experience with webpack and build scripts/pipelines made it smooth/easy for me to add create tooling for my workflow.
- **Idea** - while I had quite a bit of trouble thinking of ideas at the start, I believe the mechanic is actually fairly interesting and unique
- **Pacing** - I was able to complete much of my original plan into the game - I knew exactly what I was going for, and properly planned for some roadblocks I might have faced.

## Tools and Apps

- JavaScript, with webpack and node
- Phaser 3
- Git
- Surge for deployment
- Aseprite
- Bosca ceoil for music
- Audacity for audio postprocessing
- My voice and trusty Yeti Mic
