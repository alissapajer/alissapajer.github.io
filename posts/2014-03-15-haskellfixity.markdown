---
title: Haskell Fixity
author: LuneTron
---

Let's consider some Haskell. Here's a function:

```
zipSum :: (Num a) => [a] -> [a] -> [a]
zipSum = zipWith (+)
```
This function will zip the two provided lists and then sum the pairs of elements, returning a single list of `Num`. For example: 

```
*Main> zipSum [1,2,3,4] [3,4]
[4,6]
```

Great, so what happens if we apply `zipSum` as an infix function and also apply a list concatenation.
```
*Main> [4,5,6] ++ [1,2,3,4] `zipSum` [10,11]
[4,5,6,11,13]
```

Interesting, so it looks like `zipSum` takes precedence over `(++)`, when we've applied them both as infix operators. Example noted. Now let's write our own list concat function called `myConcat`:

```
myConcat :: [a] -> [a] -> [a]
myConcat = (++)
```

We can perform "the same" function applications again, using our new `myConcat` function:
```
*Main> [4,5,6] `myConcat` [1,2,3,4] `zipSum` [10,11]
[14,16]
```

Ummm, so what just happened? That is not the same result we computed last time. This time, the list concatenation took precedence. Thus, and this is surprising, `(++)` and `myConcat` are not acting equivalently in this seemingly equivalent situation.

Now, let's take a step back into math and think about what it means for two functions to be equal. Two functions `f` and `g` are defined to be equal if they have the same domain, and for each element `x` in their domain, `f(x) = g(x)`. Now, consider our two functions `(++)` and `myConcat`. These functions have identical type signatures, and hence the same domain. And since `myConcat` is effectively just a wrapping around `(++)`, then for any lists `l1` and `l2` of the same type, 
```
l1 ++ l2 == l1 `myConcat` l2
```
Thus, by this definition of function equality, `myConcat` and `(++)` are equal functions. But we have just seen that, when applied as infix operators in conjunction with `zipSum`, they do not operate equivalently! It seems our definition of a function isn't correct. Or that we're actually not dealing with functions. So what's going on?

Well, the problem we're dealing with here is the inherent ambiguity of infix operators. By using a function as an infix operator, we're using it in a way that lambda calculus doesn't define. Hence we need to provide our own custom infix operator rules in order for infix operators to make sense.

To evaluate an expression like 
```
4 + 5 * 6 * 7
```
we need to first decide on some evaluation rules. For example, we could assume that all infix operators have the same precedence and that they are all left associative. In that case, the above expression would be evaluated as 
```
(((4 + 5) * 6) * 7)
```
That's one solution. But from the high level view of a function, that solution is really just as arbitrary as assigning a random fixity to every operator.

Now it's worth noting that if we choose not to assume any rules when given a series of infix function applications, then the only sane thing left to do would be to assume that we can apply the operations in any order. But a simple example of numeric addition and multiplication shows us that this approach can trivially yield non-equal results from the same initial expresion. This cannot possibly be the correct solution.

So even if we remove this infix ambiguity by defining a set of non-ambiguous infix evaluation rules, these rules are still arbitrary from the point of view of a function that only knows its type signature. Specifying the infix precedence and associativity of a function adds semantic meaning to a type signature that otherwise knew nothing about its implementation. In short, function behavior should not be governed by a secret fixity, not present in its type signature. (A language which can specify fixity in the type signature? Now you have my attention!)

In all fairness, fixity isn't entirely secret. In ghci you can inquire about the fixity of any function using `:info`. For example:
```
*Main> :info (++)
(++) :: [a] -> [a] -> [a] 	-- Defined in `GHC.Base'
infixr 5 ++
```
Here we learn that `(++)` has right associativity with precedence level 5. Why is the associativity right, and not left or neutral? Recall that `(++)` has time complexity that is linear in the length of its *first* argument. A quick picture shows clearly that performing a series of `(++)` infix applications is more efficient if you do so assuming right associativity. Thus, Haskell exposes an implementation detail of a function through that function's fixity. Yikes that seems dangerous. What if the implementation details change? This is the sort of hole that bugs crawl out of.

Though, should it really be up to the programmer to know the time complexity of `(++)` and write their code accordingly? In some situations it seems quite tempting to encode function implementation details with fixity, because then we can write `3 + 4 * 5` and have it parse as `3 + (4 * 5)`, as expected. But I will maintain my point that hardcoding implementation details or implementation semantics into the behavior of functions is impure and dangerous. In the simple cases, functions will do what we expect. In more complex code, we'll introduce bugs.

I want types that are implementation agnostic and possible to reason about without additional information. Haskell functions used as infix operators don't provide that. So what world are we left in if
```
x `op1` y `op2` z
```
always generates a parser error? Well, that would be a world full of parentheses! The user would be required to add parentheses around their infix operators always, and without exception, until all ambiguity is resolved.

Let's again consider the case of numeric addition and multiplication. These operations have a universally accepted precedence, which is entirely sensical when you think of `5 * 3` as `5 + 5 + 5`. So can't we at least maintain this precedence for these numeric operations? I say, nah. The Haskell functions `(+)` and `(*)` really should know nothing of their semantics. There is no reason `(*)` should take precendece over `(+)`, unless you consider the meaning of its implementaion in the larger context of math.

So, lesson learned: equal functions can be defined with non-equal infix operators. (Recall the example of `zipSum` used with both `(++)` and `myConcat`.) There is of course an obvious solution to this problem: never use Haskell infix operators. What do we lose? Readability. What do we gain? Correctness. And in all reality, a series of three or more infix applications really should be broken into shorter expressions anyway.

**Update:** The original version of `zipSum` looked like this:
```
zipSum :: (Num a) => [a] -> [a] -> [a]
zipSum xs ys = map summed (zip xs ys)
  where summed = \(a, b) -> a + b
```
Thanks to [\@puffnfresh](https://twitter.com/puffnfresh) for pointing out that we can use `zipWith` to implement this function.
