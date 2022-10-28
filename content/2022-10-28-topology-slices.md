title: Slices of Topology (Homology!)
tags: math

# Slices of Topology

No matter how you slice it and dice it, you get out the same information. Well, that's not exactly true. But I'll show you a couple different ways you can slice it.

## Set Up

This is basically a hollow donut with legs. Said differently, it's a shell of a sphere with a hole in it (so it's like a torus), with the lower bits pulled down. This three-dimensional shape has six local minima and local maxima, which are called critical values. They are labelled as $a_1$ through $a_6$.

We are going to look at two different strategies we can use to slice this shape into smaller pieces. We'll then look at each piece individually and determine what shape it is. For example, each piece could be a point or a circle or a sphere or something else. We'll also take note of how many consecutive slices contain each particular shape.

## Slicing #1: Levelsets Zigzag Persistent Homology

This slicing strategy considers each critical value ( $a_1$ through $a_6$ ) and each region between adjacent critical values. So, there are the regions we will look at: $[a_1, a_1]$, $(a_1, a_2)$. In this notation, a square brace $[$ or $]$ includes that value and a parenthese $($ or $)$ excludes that value.

We are going to keep track of three different categories of shapes: connected components ( $H_0$ ), loops ( $H_1$ ), and voids ( $H_2$ ). 

- $[a_1, a_1]$ - Something exists. Thus our first connected component is born. 
- $(a_1, a_2)$ - This shape is like a cylinder that's missing its top and bottom. Something still exists, so our connected component is still alive. Also, We have a loop.

## Slicing #2: Extended Persistent Homology

## Pairing up the Slices


