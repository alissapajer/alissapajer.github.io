---
title: Blog Setup
author: LuneTron
---

When I started my search for a static site generator, I first came across [Jekyll](https://github.com/jekyll/jekyll). I'm not particularly excited about learning Ruby, but I am excited about learning Haskell.
![HaskellRuby](/images/HaskellRuby.png "HaskellRuby")
This quickly led me to [Hakyll](http://jaspervdj.be/hakyll/). Hakyll is easy to install with `cabal`, though the first time I installed it I had an old version of `cabal`, and thus installed an apparently very old version of Hakyll. I remedied this as follows: 
```
$ ghc-pkg unregister hakyll
$ cabal update
$ cabal install hakyll
```
From there I followed the [Tutorials](http://jaspervdj.be/hakyll/tutorials.html) on the Hakyll site and found them clear and up to date. Once I built the [Example Site](http://jaspervdj.be/hakyll/tutorials/01-installation.html#building-the-example-site) locally, it was time to move the example code to [github pages](http://pages.github.com/). Blogging without version control was out of the question!

The most confusing part of github pages is the [difference](https://help.github.com/articles/user-organization-and-project-pages) between User Pages and Project Pages. The difference is mostly confusing because you can have a `gh-pages` branch in the repo `username/username.github.io`. In that case github needs to make an undocumented choice about which branch to use. I decided to use User Pages, which is why you can find my blog at `http://alissapajer.github.io`. This means that content from my `master` branch will be used to build my website. Here is where things get a bit tricky.

**Problem:**

I need the contents of my site in the directory `alissapajer.github.io/` on the `master` branch. But Hakyll generates the website itself in `alissapajer.github.io/_site/`, and places the Haskell code, markdown, and various other files in the top level directory. And of course I need to version control everything, generated and not!

**Solution:**

I created a `source` branch, which contains both the manually-created and the generated files. When I make a change to my website, I always commit on the `source` branch, and I never manually edit files on `master`. The idea is that `source` will contain all of my code, and `master` will contain just the generated files. Now all we need to do is to copy the contents of the `_site/` directory to the `master` branch. 

To perform this copy, I use [ghp-import](https://github.com/davisp/ghp-import) as follows, run from the `source` branch:

```
$ ghp-import _site/ -b master -m "commit message"
```
There is an optional flag to push to `master`, but I have been pushing manually so I can review the changes first. And that's it! The only thing I still need to do is the redirect to a domain I own. This is done using a `CNAME` file on the `master` branch. Since my `master` branch is auto-generated I'll need to add this `CNAME` in such a way that it's not deleted when I commit to `master`. 

The only weird thing is that `source` and `master` will permanently diverge.

**Tips:**

While editing the webiste, I run
```
$ ./site watch
```
This command registers changes to the `_site/` directory and publishes the up-to-date website to `http://127.0.0.1:8000/`. Very useful for immediate feedback!

Also, Hakyll allows you to write all your blog posts in markdown. I've found this [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) essential.
