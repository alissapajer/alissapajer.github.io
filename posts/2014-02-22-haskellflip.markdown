---
title: Haskell Flip
author: LuneTron
---

How can we change the order of the arguments to a function? After I answered this question, I realized it's actually a very odd question to ask.

I'm working my way though [Learn You a Haskell for Great Good](http://learnyouahaskell.com/), and in the [Curried Functions](http://learnyouahaskell.com/higher-order-functions#curried-functions) section, the author describes the Haskell function `flip` like so: *"Flip simply takes a function and returns a function that is like our original function, only the first two arguments are flipped."* Without scrolling down further, I decided to implement `flip` based on this sentence alone.

I started with the type signature 
```
myFlip :: (a -> b -> c) -> (b -> a -> c)
``` 
and my first attempt at implementation trailed off rather quickly:
```
myFlip f = ...
```
Given only a function `f :: a -> b -> c`, and nothing to apply to it, I had reached a dead end, so I decided to implement `f`, and then `flip` this implementation. I wanted the type variables `a`, `b`, and `c` to be distinct so I could easily keep track of them. Here's my function:
```
myImpl :: Char -> Bool -> String
myImpl char bool = char : (show bool)
```
And now to flip it!
```
flippedMyImpl :: Bool -> Char -> String
flippedMyImpl bool char = myImpl char bool
```
Well, that is simple enough. The types lead way! And suddenly I realized that I just might have access to type variables `a` and `b`. But I needed to implement the full signature of `myFlip` using these specific types to fully understand. I combined `myImpl` and `flippedMyImpl` to produce
```
flipWithTypes :: (Char -> Bool -> String) -> Bool -> Char -> String
flipWithTypes f bool char = f char bool
```
My key realization was that I could remove the parentheses around `(Bool -> Char -> String)` without changing the type signature. Once I did this, I realized that I had access to two more function arguments! Before removing the parentheses, my mind had written off `(b -> a -> c)` as an impenetrable block.

Once I wrote this last implementation, it was immediately clear that I had just written a non-parametric version of `myFlip`. There is nothing special about the types I had chosen; they could just as easily be type variables. And so we arrive at our solution:
```
myFlip :: (a -> b -> c) -> b -> a -> c
myFlip f y x = f x y
```
To implement `myFlip`, we needed to determine how the function would handle itself when fully applied. But our goal in writing `myFlip` is to return another (partially applied) function with type `b -> a -> c`. The key to the implementation of `flip` that wasn't obvious at first is that we need to provide a full implementation in order to later partially apply it.

In doing this exercise, my conception of a function changed. Now when I think of a function, I think of something linear, something in which each parameter must be applied in its prescribed order. And if that order is to be broken, another function must be applied to faciliate this change in order.

Really, `flip` is a formalization of how we handle the permutations of function application orders in Haskell. In math, we've seen that given a function `f(x,y,z)`, we can consider `g(y,z) = f(3,y,z)` or `h(y) = f(5,y,6)` without any concern, because the order in which we provide values for our variables doesn't matter.

But since in Haskell all functions take exactly one parameter, and thus multi-parameter functions are a semantic illusion, one must make explicit how to pass in parameters in a different order. Hence we arrive at the `flip` function.

To tie up this post, it's odd, from a non-functional point of view, to ask how we can flip the order of function arguments because the question assumes that function arguments have an order in the first place! Though, once you recall the definitions of lambda calculus and think about different reduction rules, the fact that functions innately order their parameters seems almost intuitive. And then I realized: [Church-Rosser](http://en.wikipedia.org/wiki/Church%E2%80%93Rosser_theorem). And guess what? I've already written a [blog post](/posts/2013-03-26-churchrosser.html) about that.
