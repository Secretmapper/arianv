+++
date = "2016-12-29T21:22:19+08:00"
title = "Module Bundling and Webpack in Simple Terms"
tags = ["JS", "React", "Webdev"]

+++

<style type='text/css'>
#chapter-1, #chapter-2__scroll {
  display: none;
  position: relative;
  height: 100vh;
  width: 100%;
}

.chapter-1__heading {
  font-size: 2rem;
  margin-bottom: 0;
  margin-top: 0;
  max-width: none !important;
  position: absolute;
  text-align: center;
  width: 100%;
}

.chapter-1__heading-1 {
  opacity: 1;
}

.chapter-1__hider-1,
.chapter-1__hider-2,
.chapter-1__hider-3,
.chapter-1__hider-4 {
  background-color: #002B36;
  height: 1rem;
  position: absolute;
  width: 100%;
}

.chapter-2__darkener {
  background-color: gray;
  opacity: 0.5;
  position: absolute;
  height: 30rem;
  width: 100%;
}

.chapter-2__code-file {
  position: absolute;
  width: 100%;
}

.chapter-2__code-file code {
  padding: 0;
}

.chapter-2__req-green {
  color: green;
}
</style>

{{< warning for="noscript" >}}
{{< /warning >}}

{{% warning for="mdscreen" %}}
  This post contains large code blocks and might be unsuitable for small mobile devices.
{{% /warning %}}

Webpack is probably the most contentious tool on the frontend web right now. It's the most popular module bundler, but a lot of new users find it hard to use.

One of the reasons for this, I believe, is that webpack's way of doing things is quite different than the tools it managed to uproot (such as gulp). The problem is made more severe by the fact that webpack config files tend to be rather complicated when looked at first glance, and randomly copy pasting parts of it hoping for the configuration to just work on your own project can be a recipe for disaster.

In this post I'd like to give a _high level overview_ on what webpack does. It is not meant to be a fully comprehensive tutorial, but if any of the following applies to you:

*   New to Webpack
*   Find yourself confused as to how exactly Webpack works
*   Fail to see the advantages (and disadvantages) of Webpack against other tools such as Gulp or Grunt

Then this article might be for you.

<div id='trigger-1'></div>

{{< div class="post-width" >}}
<div id='chapter-1'>
{{< verticallyCenter >}}
<div style='position:relative'>
<div class='chapter-1__hider-1' style='top: 21%'></div>
<div class='chapter-1__hider-1' style='top: 44.2%'></div>
<div class='chapter-1__hider-2' style='top: 49.2%'></div>
<div class='chapter-1__hider-3' style='top: 53.5%'></div>
<div class='chapter-1__hider-4' style='top: 58.2%'></div>
{{% code "html" %}}
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="css/main.css" rel="stylesheet" type="text/css">
      <title>Sample</title>
    </head>
    <body>
      <div>Sample</div>
      <script src="js/main.js"></script>
      <script src="js/menu-widget.js"></script>
      <script src="js/jquery.js"></script>
      <script src="js/menu-widget--fancy-button.js"></script>
    </body>
    </html>
{{% /code %}}
<p class='chapter-1__heading chapter-1__heading-1'>This is a simple webpage </p>
<p class='chapter-1__heading chapter-1__heading-2'>Of course, we rarely write such simple pages. We usually have <b>css</b> and <b>javascript</b></p>
<p class='chapter-1__heading chapter-1__heading-3'>As time goes by, we might add some custom js widgets</p>
<p class='chapter-1__heading chapter-1__heading-4'>Which in turn relies on another library, say jquery, so we insert that on the page too</p>
<p class='chapter-1__heading chapter-1__heading-5'>We want to make our menu widget's button fancy, so we go ahead and add our custom script for that</p>
<div style='height: 7rem'></div>
</div>
{{< /verticallyCenter >}}
</div>
{{% /div %}}

This is how we write webpages, but with multiple dependencies our HTML file quickly becomes unwieldy:

{{% code "html" %}}
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="css/main.css" rel="stylesheet" type="text/css">
      <title>Sample</title>
    </head>
    <body>
      <div><!-- One long DOM --></div>
      <script src="js/jquery.js"></script>
      <script src="js/menu-widget.js"></script>
      <script src="js/menu-widget--fancy-button.js"></script>
      <script src="js/ad-widget.js"></script>
      <script src="js/loading-bar.js"></script>
      <script src="js/loading-bar.fancy.theme.js"></script>
      <script src="js/social.sdk.js"></script>
      <script src="js/analytics.js"></script>
      <script src="js/analytics.seo.js"></script>
      <script src="js/main.js"></script>
    </body>
    </html>
{{% /code %}}

There's a bunch of reasons why the above code is bad

1.  A lot of JS files in script tags means a lot of network requests. This results in slower load times (but will be solved by HTTP/2)
2.  There are implicit dependencies. While `menu-widget--fancy-button` is loaded in the same manner every other script is, it actually depends on `menu-widget`, which in turn relies on `jquery`. For all we know, it also depends on `loading-bar` - we don't really know until we look at the code/documentation
3.  Related to above, there's an implicit loading order. `main.js` can't be placed on top, as it needs to execute after all the other scripts it relies on has loaded
4.  Everything is **global** (or at least more likely)

The first problem is solved by concatenation - we get all our javascript files and combine them into one javascript file. This is what most preprocessors/task runners are made to do (uglify, grunt, gulp).

Doing something like that with Webpack is incredibly easy.

Assuming you have installed webpack with `npm install webpack -g`, you can generate a concatenated bundle by writing `webpack [your files] [output name]`. Using our example above, we write:

    webpack js/jquery.js js/menu-widget.js [...] output.js

Where `[...]` is the rest of your files (i.e. `js/menu-widget--fancy-button.js js/ad-widget.js`, etc.)

<div class="cf post-width--lg">
{{% div class="g6" %}}
Entry

    jquery.js
    menu-widget.js
    menu-widget--fancy-button.js
    ad-widget.js
    loading-bar.js
    loading-bar.fancy.theme.js
    social.sdk.js
    analytics.js
    analytics.seo.js
    main.js
{{% /div %}}
{{% div class="g6" %}}
  Output
{{% code html %}}
    output.js
{{% /code %}}
{{% /div %}}
</div>

Of course writing all the filenames we want to concatenate everytime we make a change is going to get tiresome. Thankfully, we can create a <bold>configuration</bold> file for webpack

    module.exports = {
      entry: [
        'js/jquery.js',
        'js/menu-widget.js',
        'js/menu-widget--fancy-button.js',
        'js/ad-widget.js',
        'js/loading-bar.js',
        'js/loading-bar.fancy.theme.js',
        'js/social.sdk.js',
        'js/analytics.js',
        'js/analytics.seo.js',
        'js/main.js'
      ],
      output: {
        path: './dist',
        filename: 'output.js'
      }
    }

Note that the whole config file is just one big object definining a few properties: `entry` being the array of files we want to concatenate, and `output` defining the `path` and `filename` of our output

Running webpack now will result in it automatically reading our config file

    webpack

And generating the output on path `dist`, with filename `output.js` as written in our config file. We can now serve that js file, and see our script tags drastically reduce in number

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="css/main.css" rel="stylesheet" type="text/css">
      <title>Sample</title>
    </head>
    <body>
      <div><!-- One long DOM --></div>
      <script src="dist/output.js"></script>
    </body>
    </html>

As you can hopefully see, webpack is actually really super simple - pass it a bunch of files, it processes it (an array in this case results in concatenation), and it outputs the file you need

Concatenation results in a lot less network requests, and also shortens our HTML file.

Unfortunately, it only solves the first problem I presented above:

1.  A lot of JS files in script tags means a lot of network requests. This results in slower load times (but will be solved by HTTP/2)
2.  There are implicit dependencies. While `menu-widget--fancy-button` is loaded in the same manner every other script is, it actually depends on `menu-widget`, which in turn relies on `jquery`. For all we know, it also depends on `loading-bar`, but that's the point - we don't really know until we look at the code/documentation
3.  Related to above, there's an implicit loading order. `main.js` can't be placed on top, as it will execute before the other scripts it relies on
4.  Everything is **global** (most likely)

This is because concatenation is really just solving the symptom, rather than the root of the web's real problem - the lack of good dependency resolution

<div id='chapter-2__trigger'></div>

{{< div class="post-width" >}}
<div id='chapter-2__scroll'>
{{< verticallyCenter >}}
<div style='position: relative'>
<div class='chapter-2__darkener'></div>
{{% code "html" %}}
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="css/main.css" rel="stylesheet" type="text/css">
      <title>Sample</title>
    </head>
    <body>
      <div><!-- One long DOM --></div>










    </body>
    </html>
{{% /code %}}
<div style="position: absolute; top: 39.5%; left: -0.2%; width: 100%;">
  {{% postMBaWiSTchapter %}}
</div>
<div id='chapter-2__text-1' style='color: white; position: absolute; top: 30%; left: 10%; width: 85%'>
  These are all the javascript required by the page
</div>
<div id='chapter-2__text-2' style='color: white; position: absolute; top: 90%; left: 10%; width: 85%'>
  Yet main.js is our only top level dependency, the others are libraries!
</div>
<div id='chapter-2__text-3' style='color: white; position: absolute; top: 27%; left: 10%; width: 85%'>
  What if we only need to import our main js file, and let it somehow import it's own dependencies?
</div>
</div>
{{< /verticallyCenter >}}
</div>
{{< /div >}}

This is not a new idea. Almost every language - python, ruby, c, c++, java, etc., have some way of doing this, whether it be through `import`, `include`, etc.

Webpack is awesome because it allows you to do the same thing in javascript using `require` or `import` (in ES6) syntax. It's not exactly what provides you that featureset (module loaders do that), but it's the one that reads your files and generates the bundle that you can use.

Basically imagine something like this:

    var string = 'Hello!'
    alert(string)

Now imagine if our string 'Hello!' is really long, and that it would really make sense for them to be in different files. Normally, you'd do something like this:

{{% code "html" %}}
    window.string = 'asuperreallylongstring'
{{% /code %}}

{{% code "html" %}}
    alert(window.string)
{{% /code %}}

And just add both to our html

    <script src="js/string.js"></script>
    <script src="js/main.js"></script>

While, this example is a bit simple, javascript code split into multiple files is not really uncommon

What module loaders allow you to do is, _surprise_, load modules. Using module loaders changes the code above to something similar to this:

{{% code "html" %}}
    module.exports = 'asuperreallylongstring'
{{% /code %}}

{{% code "html" "main.js" %}}
    var string = require('./string.js')
    alert(string)
{{% /code %}}

Pointing Webpack to `main.js` will process it, see that it requires something, and bundles the files together. If we look at our list above, you'll see that module loading solves all of our problems:

1.  A lot of JS files in script tags means a lot of network requests. This results in slower load times (but will be solved by HTTP/2) - <span class="chapter-2__req-green" >using a module bundler like webpack, we can combine our modules into one</span>
2.  There are implicit dependencies. While `menu-widget--fancy-button` is loaded in the same manner every other script is, it actually depends on `menu-widget`, which in turn relies on `jquery`. For all we know, it also depends on `loading-bar`, but that's the point - we don't really know until we look at the code/documentation - <span class="chapter-2__req-green">Every dependency is explicit through `require`</span>
3.  Related to above, there's an implicit loading order. `main.js` can't be placed on top, as it will execute before the other scripts it relies on - <span class="chapter-2__req-green">Since we're loading the dependencies as we need them, the loading order is now explicit</span>
4.  Everything is **global** (most likely) - <span class="chapter-2__req-green">while it's still possible, it's now much harder, and there is less reason for code to be global (unlike our code above that needed the global window to pass it's data</span>

By using modules, our code is now much easier to reason about - we don't have to guess what library depends on what library and dependencies we no longer use are automatically removed (as long as we don't `require` them)

So how do we compile our `main.js` above?

Unlike our first config file above (where we concatenated our files), we can just write `main.js` in our `entry` property - webpack will automatically recognize that it requires `./string.js` and load that into our bundle

    module.exports = {
      entry: 'js/main.js',
      output: {
        path: './dist',
        filename: 'output.js'
      }
    }

Running `webpack` will generate `dist/output.js` which, when run on an html page, will alert 'asuperreallylongstring'. Win!

{{% infobox %}}
Note the entry config syntax:

1.  We can pass a path to a file and webpack will process that single file.
2.  We can pass an array of paths and webpack will process and concatenate them.
{{% /infobox %}}

Again, I want you to take a moment to appreciate the simplicity of the webpack config above. It contains nothing but an `entry` property, detailing the files that webpack will look into and process, and contains an `output` property, which details where the webpack generated file will be output

## Loaders

Remember our `loading-bar.js` above? Let's assume it's something really simple - it replaces every dom object that has the class `loading-bar` with a loading bar image

    var $ = require('./js/jquery')

    $(function () {
      $('.loading-bar').html('<img src="/assets/loading-bar.png" />')
    })

{{% infobox note %}}
You don't need to know jQuery to follow this tutorial - just assume it is an easy to use DOM selector. In this particular instance, it's doing nothing but select all divs with the class 'loading-bar' and replace it with the image tag
{{% /infobox %}}

This is fairly standard javascript (albeit short)

Note however, that it **assumes** something - that we have an image on the path `/assets/loading-bar.png` on our server. Again, this is fairly standard practice in javascript - adding a widget that requires an image/css also requires us to add those image and css to our server.

This is problematic - `assets/loading-bar.png` is an implicit dependency, and worse still, it's not even javascript! We could make sure all our javascript files are added to the server and somehow our code will still fail.

Since we could `require` javascript files, why not do the same thing for image files?

    var $ = require('./js/jquery')
    var image = require('./assets/loading-bar.png')

    $(function () {
      $('.loading-bar').html('<img src="' + image + '" />')
    })

Note how we have the dot (.) on the required image path - this is because we are resolving based on _the path of loading bar image in our file system, not in the server_, as we did in javascript files in our previous examples.

By requiring the image instead of blindly depending on the url, we again turn the implicit dependency between `loading-bar.js` and `loading-bar.png` to an explicit dependency, minimizing the chance of our code failing, and automatically being able to bundle the two files together.

_But wait a minute!_ How would that work? We're requiring an image, not a js file.

Indeed, if you try to use webpack on `loading-bar.js` it fails with an error message similar to the following:

    ERROR in ./assets/loading-bar.png
    Module parse failed: /path/assets/loading-bar.png Unexpected character '' (1:0)
    You may need an appropriate loader to handle this file type.
    SyntaxError: Unexpected character '' (1:0)

This is because webpack doesn't know how to **load** our png file. By default webpack has a javascript module loader, so it will be able to parse and understand something like:

    module.exports = 'areallylongstring'

But it will fail reading a png, which looks more like:

    8950 4e47 0d0a 1a0a 0000 000d 4948 4452
    0000 02a8 0000 012c 0802 0000 0080 13d6
    5800 0000 1974 4558 7453 6f66 7477 6172
    6500 4164 6f62 6520 496d 6167 6552 6561
    6479 71c9 653c 0000 8a44 4944 4154 78da

This is where webpack **loaders** come in - it makes webpack smarter, giving it the ability to load files it might not be able to load by default.

So let's go ahead and give webpack the ability to load `png`s

Let's think about it first. What can we pass as a src to our img tag? [Data URIs](https://en.wikipedia.org/wiki/Data_URI_scheme) are a good option - it's a scheme that allows us to turn our png into a string. Here's a sample of an img tag with a png loaded as a data-uri:

    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />

The img tag above:

![Red dot](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==)

By turning the png to a string and requiring it to `loading-bar.js` we are doing something very similar to what we did earlier, requiring 'asuperreallylongstring' from another file - just this time, we're requiring a really long string that resolves to a png. Note that even though we're requiring an image in javascript, we're still using the same concepts we used earlier.

Anyway, let's go ahead and actually implement it using webpack. First let's add the loader that allows us to turn `png`s into data-uris - the `url-loader`. Install it by running `npm install url-loader --save-dev`

Once installed, let's add it to our configuration file:

    module.exports = {
      entry: 'loading-bar.js',
      output: {
        path: './dist/',
        filename: 'output.js'
      },
      module: {
        loaders: [{
          test: /\.png$/,
          loader: 'url-loader'
        }]
      }
    }

Note the only thing that we added - configuration for our `module loaders`

As you can see, loaders is an array of objects - that's because we can extend webpack with a bunch of loaders that handles different types of files.

The property inside our loader object is rather self-explanatory. The first is loader, which contains the name of our loader ('url-loader'). The next is `test` which contains a Regular Expression. If our regular expression test matches on a file name, we use the loader for that file.

If we run `webpack` the js file will compile, injecting the data-uri of the image to `loading-bar.js`

**This is where most of webpack's power comes in.** It provides a fully featured management system that bundles your code and assets into something that can easily be served to the end user. It does this by being able to 'learn' how to load different files

Babel is the de facto transpiler for Javascript, and one of the most common use cases for webpack is letting it transpile ES6 Javascript to ES5 Javascript (which most browsers can understand).

We can easily use babel by letting webpack know that our js files are written in es6, and that it should load them using a loader for Babel, aptly named `babel-loader`

    module.exports = {
      entry: 'loading-bar.js',
      output: {
        path: './dist/',
        filename: 'output.js'
      },
      module: {
        loaders: [{
          test: /\.png$/,
          loader: 'url'
        },{
          test: /\.js$/,
          loader: 'babel-loader'
        }]
      }
    }

Note that the concept of loaders allows webpack to take care of asset management and dependency resolution completely. In fact this streamlines a lot of existing workflows

Imagine a CSS framework - which might not only include css, but also some fonts, images, and js of it's own! Previously this was solved by downloading all of the assets, making sure everything is on it's proper directory, updating each of the assets when a new version arrives, etc.

    css
    ├─ framework.css
    └─ framework.min.css
    js
    ├─ framework.js
    └─ framework.min.js
    fonts
    ├─ framework-font.ttf
    ├─ framework-font.svg
    └─ framework-font.woff

By using webpack, a framework/library can have just a single entry point that bundles everything, which leads to an easier and more straightforward way to include that dependency.

    require('framework') // automatically takes care of its own assets

This has the added advantage of easy package management - we can now use `npm install framework` and use that on our frontend.

Now if we're using our framework.css above, we have to note that it includes some files that our webpack doesn't know how to load yet. Namely, it has no loader for css and the various font files, so let's update our config file to take care of that:

    module.exports = {
      entry: 'loading-bar.js',
      output: {
        path: './dist/',
        filename: 'output.js'
      },
      module: {
        loaders: [{
          test: /\.png$/,
          loader: 'url'
        },{
          test: /\.js$/,
          loader: 'babel-loader'
        },{
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },{
          test: /\.(ttf|svg|woff)$/,
          loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
        }]
      }
    }

Still the same general idea, but what's that! Why are there question marks and exclamation points?

Turns out webpack loaders are composable and extensible.

    loader: 'style-loader!css-loader'

The exclamation point (!) here allows loaders to apply one after the other (like the pipe operator in linux), right to left. So essentially, this particular line is telling webpack to `load matching files as css` then `load them as a style`.

That seems curious. Why are we loading css files as a 'css' then as a 'style'? This is because these two loaders do different things. `css loader` loads the css file into something javascript can understand, and `style loader` loads it as an actual style by injecting the css into the DOM with a `style` tag. By piping as we see here, we allow CSS to be used in our page.

    loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'

The line for file loader seems to be a bit more involved, and the loader itself is actually pretty interesting. The question mark (?) signifies that we are going to be passing some options to the loader, with them defined using `key=value` syntax and separated by (&). They are essentially similar to the HTTP GET URL syntax.

So looking at it more deeply, it seems that we have a `File Loader` that has `sha512` as `hash`, `digest` as `hex`, and `name` as `[hash].[ext]`. This syntax is made a lot cleaner in webpack 2, which passes loader options as an actual object.

    {
      loader: 'file-loader',
      options: {
        hash: 'sha512',
        digest: 'hex',
        name: '[hash].[ext]'
      }
    }

Anyhow, to understand the options we're using for file loader, it's first important to know what file loader actually does.

As you might imagine, including assets as DATA URIs into our javascript code might not necessarily be the best idea. Sure it works on some small assets (like say, the sample red dot I used above), but for large assets, it'd be better to serve them as different, independent files. These takes care of two things - decreasing the javascript payload, and letting the browser cache assets independently. However, it'd be great to still leverage webpack's advantages.

This is where File Loader comes in - it allows you to serve required files as different assets. When file loader is used to `require` a file, it _returns a url that resolves to that particular file_

So if we used the file loader to load the png in our sample `loading-bar.js` above, instead of the required file emitting a DATA URI, it emits a public url for that img - which we use for the browser to fetch the asset itself.

If file loader returns a url, it stands to reason that the file it references should be accessable somehow over the web. However, webpack is only our compiler - it's not a server, so we're responsible for serving them. Thankfully, webpack makes this easy by emitting the files we need to serve - it's placed in the output path we defined.

    output: {
      path: './dist/',
      filename: 'output.js'
    }

So in our sample above, if framework requires `framework.ttf`, webpack will copy the file over to our `dist` directory, which we can easily serve!

The options we pass to file loader makes sense when we take this into account - `name` is the name of the file once we copy it over to `dist`, and the string '[hash].[ext]' for the name means that the filename is a hash, followed by a dot, followed by the file extension, with our hash function being sha512\. A sample filename for example could be 1be2c22c29a9235cdccd7df68d5a4e4b.ttf.

The beauty of it is that the name is a hash of the file - meaning we get another advantage of automatically busting caches if our file's contents ever changes.

Since the files are copied over to the output path you defined in the config file, you would need to put those files in your server and serve them. Since they are assets, it probably will live on a subdirectory like `http://yoursite.tld/assets/`. If we use that setup, we would need to tell webpack to prepend 'assets/' to urls it produces. Webpack allows that through the 'publicPath' option on `output`

    output: {
      path: './dist/',
      publicPath: '/assets/'
      filename: 'output.js'
    }

With the above, a required file will now return something similar to `/assets/1be2c22c29a9235cdccd7df68d5a4e4b.ttf`

Note how extensible this system is - if we ever need to serve our assets through a cdn, we can just easily turn our public path to the url of our cdn

    output: {
      path: './dist/',
      publicPath: 'https://mycdn.com/cdnkey/'
      filename: 'output.js'
    }

And the url will now be `https://mycdn.com/cdnkey/1be2c22c29a9235cdccd7df68d5a4e4b.ttf`

By this point, you can hopefully see the power loaders afford us - we can use it to teach 'webpack' how to handle files differently depending on criteria. This makes it easy to support virtually every filetype - as long as there is a loader for it, webpack can load it.

*   Need to use sass? There's a loader for that: `sass-loader`
*   Need to use json, xml, or toml? There's a loader for that: `json-loader`, `xml-loader`, and `toml-loader`
*   Want to use templates? There's `rails-erb-loader, haml-loader, jade-html-loader`, etc.
*   There's a loader for everything you can possibly think of!

The nature of 'loaders' also allow custom wrappers or functionality for existing code - we saw it first using the `style loader` which loads what is passed onto it as DOM style blocks. Another example of a loader 'wrapping' functionality is `bundle-loader` which makes lazy bundle loading - aka deferred loading or code splitting incredibly easy.

Let's say there's a big dependency that we only use on certain pages on our site. We don't want to load that everywhere - ideally we only want to load that on the parts we need them. We can configure webpack to load those files lazily with `bundle-loader`. It will then wrap the required bundle and return a function that can be passed a callback - the callback's first parameter being the module we actually want.

## Wrap Up

Whoo that's quite a long read! Hopefully you now have a fuller understading of how webpack (and module bundling in general) works, and can now see how each part of the webpack configuration fits.

Webpack is a very extensible and powerful tool, and the vast number of things that it can do means that existing config files can be pretty long and complicated. By understanding just how it works, you should now be able to more easily understand them, as well as extend and even create your own custom webpack configurations.

There are still a few topics we can discuss, such as Webpack Plugins, the dev server, best practices (dev and prod configs), which I might revisit on another tutorial.

## Further Reading

[Webpack 2 Config Docs](https://webpack.js.org/configuration/)

[Webpack How To](https://github.com/petehunt/webpack-howto)

[Webpack Examples](https://github.com/webpack/webpack/tree/master/examples)

<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  })

  // make js only blocks visible
  new TimelineMax()
    .set('#chapter-1', { display: 'block' })
    .set('#chapter-2__scroll', { display: 'block' })
    .play()

  var chapterOne = { duration: 10000 }

  // set all headings to alpha: 0 except the first one
  new TimelineMax()
    .set('.chapter-1__heading', { alpha: 0, y: '60px' })
    .set('.chapter-1__heading-1', { alpha: 1, y: 0 })
    .play()

  var scrollAnimation = new TimelineMax();
  scrollAnimation
    // hide 1
    .to('.chapter-1__heading-1', 0.1, { alpha: 0, y: '-60px', delay: 0.3 })

    // show 1h, 2
    .to('.chapter-1__hider-1', 0.3, { width: '0%' })
    .to('.chapter-1__heading-2', 0.1, { alpha: 1, y: 0 }, '0.4')

    // hide 2
    .to('.chapter-1__heading-2', 0.1, { alpha: 0, y: '-60px', delay: 0.2 })

    // show 2h, 3
    .to('.chapter-1__hider-2', 0.2, { width: '0%' })
    .to('.chapter-1__heading-3', 0.1, { alpha: 1, y: 0 }, '0.9')

    // hide 3
    .to('.chapter-1__heading-3', 0.1, { alpha: 0, y: '-60px' })

    // show 3h, 4
    .to('.chapter-1__hider-3', 0.3, { width: '0%' })
    .to('.chapter-1__heading-4', 0.1, { alpha: 1, y: 0 }, '1.3')

    // hide 4
    .to('.chapter-1__heading-4', 0.1, { alpha: 0, y: '-60px' })

    // show 4h, 5
    .to('.chapter-1__hider-4', 0.3, { width: '0%' })
    .to('.chapter-1__heading-5', 0.1, { alpha: 1, y: 0 }, '1.7')

  new ScrollMagic.Scene({triggerElement: '#trigger-1', duration: chapterOne.duration})
          .setPin('#chapter-1')
          .addTo(controller)

  new ScrollMagic.Scene({triggerElement: '#trigger-1', duration: chapterOne.duration})
          .setTween(scrollAnimation)
          .addTo(controller)

  // chapter 2

  var chapterTwo = {
    duration: 10000
  }

  new TimelineMax()
    .set('.chapter-2__darkener', { alpha: 0 })
    .set('#chapter-2__text-1', { alpha: 0 })
    .set('#chapter-2__text-2', { alpha: 0 })
    .set('#chapter-2__text-3', { alpha: 0, top: '+=30px' })
    .play()

  var toPos = function (level, indent) {
    return {
      top: 1.4 * level + 'rem',
      left: indent * 30 + 'px',
      opacity: 1 - 0.4 * indent
    }
  }
  var scrollAnimation = new TimelineMax()
  scrollAnimation
    .to('.chapter-2__darkener', 0.2, { alpha: 0.5 })
    .to('#chapter-2__text-1', 0.2, { alpha: 1 }, '0')
    .to('.chapter-2__code-file', 0.2, { alpha: 0 })
    .to('#chapter-2__text-2', 0.2, { alpha: 1 })

    .to('#chapter-2__text-1', 0.2, { alpha: 0, top: '-=30px', delay: 0.3 })
    .to('#chapter-2__text-2', 0.2, { alpha: 0 }, '+=0')
    .to('#chapter-2__text-3', 0.2, { alpha: 1, top: '-=30px' }, '+=0')

    .to(`.chapter-2__code-file-9`, 0.2, { top: 0, alpha: 1 })
    .to(`.chapter-2__code-file-7`, 0.2, toPos(1, 1))
    .to(`.chapter-2__code-file-8`, 0.2, toPos(2, 2))
    .to(`.chapter-2__code-file-1`, 0.2, toPos(3, 1))
    .to(`.chapter-2__code-file-0`, 0.2, toPos(4, 2))
    .to(`.chapter-2__code-file-2`, 0.2, toPos(5, 2))
    .to(`.chapter-2__code-file-4`, 0.2, toPos(6, 1))
    .to(`.chapter-2__code-file-5`, 0.2, toPos(7, 2))
    .to(`.chapter-2__code-file-3`, 0.2, toPos(8, 1))
    .to(`.chapter-2__code-file-6`, 0.2, toPos(9, 1))
    .addPause()

  new ScrollMagic.Scene({ triggerElement: '#chapter-2__trigger', duration: chapterTwo.duration })
        .setPin('#chapter-2__scroll')
        .addTo(controller)

  new ScrollMagic.Scene({ triggerElement: '#chapter-2__trigger', duration: chapterTwo.duration })
        .setTween(scrollAnimation)
        .addTo(controller)
})
</script>
