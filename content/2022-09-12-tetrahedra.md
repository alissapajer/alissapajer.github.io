Title: Tetrahedra Parity Cross-Section Animation
Tags: math,programming

![tetrahedra](/images/movie_loopy.gif "tetrahedra")

```
dict = { 0: 'blue', 1: 'red', 2: 'purple', 3: 'yellow', 4: 'orange' }
```

```
ffmpeg -y -i 'figure_ii%4d.png' -c:v libx264 -pix_fmt yuv420p -vf scale=1024:768  -r 90 movie.mp4 && ffmpeg -y -i movie.mp4 -filter_complex "[0]reverse[r];[0][r]concat=n=2:v=1:a=0" -loop 0  movie_loopy.gif
```

the jupyter for this [is here](https://github.com/skyldpod/jupyters/blob/main/tetrahedra/tetra4.ipynb)

blue never shows up! it would show up in the reflection over the x-y plane.

next steps:

- plot the same cross-sections but for each vertex (2 colors only)
- plot the same cross-section in a sphere with the base triangle in the equitorial plane
- create histogram of parities given a fixed base triangle
- create histogram of parities given arbitrary tetrahedra in variously shaped spaces (sphere, cube, etc.)
