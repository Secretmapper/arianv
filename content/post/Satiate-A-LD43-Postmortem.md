---
title: "Satiate: A LD43 Postmortem"
date: 2018-12-03T21:56:00+08:00
tags: ['JS', 'Gamedev']
---

[Just as I joined last April](/post/atlas-runs-a-ld41-postmortem/), I joined Ludum Dare this December for Ludum Dare 43.

# The Game

{{%
  image src="/media/images/ludumdare/43.gif"
  style="width:600px"
%}}

The theme for this LD was **Sacrifices must be made**. It's a pretty expansive theme and there was quite a lot of possible game mechanics to build around it, that, for a moment, I was hit by choice-paralysis.

My brainstorm took me through the usual suspects - sacrificing X for Y (i.e. health for bullets), sacrificing to appease a deity, sacrificing your own for survival, etc.

{{%
  image src="/media/images/ludumdare/ld43mindmap.jpg"
  style="width:600px"
%}}

The wording of the theme - "Sacrifices MUST be made" - as if an order, planted the idea of an oppressive, forceful, slave like routine, and a melody quite quickly hit my head.
 
<audio controls>
  <source src="/media/audio/ludumdare/satiate.ogg" type="audio/ogg">
  <source src="/media/audio/ludumdare/satiate.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>

I fell in love and with it, envisioned a sim game where you are forced to manage a 'production line' of people to sacrifice/kill to appease something. While I did spend quite a bit of time considering other possible ideas, the melody quickly became an ear worm and I found myself mouthing it as I brainstormed other ideas.

While I had huge reservations (because it would be really tough to implemennt), I decided to go with the sim game.

At first, an RTS with traditional, mouse based controls was what I thought of. Pondering about it however, I feared the 'removal' of closeness would hurt the impact of the sacrificing, as well as make for a more boring gameplay loop.

It was then that I decided to use a 'Tooth and Tail' like approach, using a commander avatar and having people 'follow' you. Initially, my idea was very similar to Tooth and Tail, where you have different 'unit groups' - young, adult, elders, which you can pick through 1,2,3 - the idea being you have to properly micromanage these age groups to their correct production point.

However, I decided to scrap this and go with a 'stress' based system. The stress system makes the game more realistic (I mean, who goes from young->adult->elder that quickly!?) and also provides more avenue in terms of gameplay (waiting for a pawn to de-stress)

Overall, I'm really happy with the gameplay. It fits the theme very well, the mechanic was reasonably unique, and it was, if I may, actually quite addicting! Once I implemented it, I found myself spending quite a bit of time actually playing (which helped in tweaking the numbers for game progression)

In terms of what I missed out on, the biggest would have to be the end game. Originally, I had planned for there to be a goal to craft towards to - a sort of 'radar beacon' that would 'call in the cavalry' to come save the day. However, I was too tired at the end and decided to drop it (interestingly enough, I still had ample time).

The tutorial is pretty nifty, but it is still quite hard to learn. To be fair, the mechanics are pretty tricky to understand, and making a better on boarding experience would have taken way more time than I had.

One thing I DID wish I didn't spend as much time on was the the 'boids'/steering behaviors. I implemented quite a full flegged steering behavior built for the Followers/Pawns. While it made for some really dynamic looking npcs, it honestly took way too much time; time which I could have spent elsewhere (such as the tutorial).

Phaser 3 Documentation was still spotty, and to be honest I am seriously consider dropping it and using another engine. I really would like IntelliSense support, and I'm honestly thinking of using a typed language, and even not use vim (*gasp*) if necessary.

One big surprise I had was to learn that Phaser 3 scenes can exist in parallel - and could be used for a 'shop scene' that would automatically manage itself and pause/resume the main scene. It was a really great idea, but I learnt it way too late in the development process that it actually hindered me (as I had assumed scenes worked the same way as states in Phaser 2).

## Art

In terms of Art, I disliked how it turned out. While it looks 'ok', and honestly looks quite good considering, I still have adequate trouble keeping the consistency together and making sure everything looks good together. The workflow is honestly terrible too, having to juggle multiple asperite files, exporting to pngs, etc. I feel like keeping it in separate files hurts the process, as it makes it harder to see tonal and/or visual incompatibilities. Looking at deepnight for example, which I am a huge fan of, he uses a single photoshop file sliced to generate the asset sheet, which probably helps in making sure everything looks together.

One thing that honestly surprised me as to how it looked is the monster. It was one of the last assets I made, and I had HUGE trouble even thinking about how I want to portray it. Eventually, I used a ball as a base, and eventually got it to what is now in the game. I'm really pleasantly surprised it worked (and players agree with me that it looks good!)

## Audio

One of the main reasons why I went for the idea was because of the melody that got stuck in to my head, so it should come to no surprise that the music really ties the game together (at least for me).

Unlike my ld41 music, this one is significantly better, and even passes as acceptable. The main 'march' is kept, keeping a really somber, mechanical, march-like trance throughout.

While making it though, another melody came to me as I experimented, and I quite liked it as well.
 
<audio controls>
  <source src="/media/audio/ludumdare/satiate_riff.ogg" type="audio/ogg">
  <source src="/media/audio/ludumdare/satiate_riff.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>

In the end, I incorporated the two together. In a way, this new one is even more 'urgent' and serves quite well as a 'time is running out' music. While there's no music changes, the idea as a feeling exists.

Another thing that came together really well in the game are the sound effects. I previously downloaded a GDC sfx bundle, and it helped in getting some high quality sfx for the game, which players really liked! I also used my own voice for the unit sound effects, and since I didn't have my mic with me, so I just used my AirPods :D

## Feedback

As I expected, people had huge trouble understanding how to play the game.

{{%
  image src="/media/images/ludumdare/43/comm0.jpeg"
  style="width:600px"
%}}

I had put in as much tutorials as I could, and even tips/instructions outside of the game (in the description) but the onboarding of my game was really not up to par.

For those that could play the game though the feedback has been very positive!

{{%
  image src="/media/images/ludumdare/43/comm1.jpeg"
  style="width:600px"
%}}
{{%
  image src="/media/images/ludumdare/43/comm2.jpeg"
  style="width:600px"
%}}
{{%
  image src="/media/images/ludumdare/43/comm3.jpeg"
  style="width:600px"
%}}
{{%
  image src="/media/images/ludumdare/43/commnew.jpg"
  style="width:600px"
%}}

It even got the frontpage at newgrounds which surprised me to be honest!

{{%
  image src="/media/images/ludumdare/43/newfront.jpg"
  style="width:600px"
%}}

"Surprising amount of depth for a Ludum Dare entry" <3

The game was itself quite challenging to implement, having boids, buildable structures, RTS systems, etc, but it was a legitimately fun exercise.

Overall, I'm really happy with how the game turned out. It's a marked improvement from my first Ludum Dare entry, and while I wish for more, the game itself is quite reasonably enjoyable!

Till next time!
