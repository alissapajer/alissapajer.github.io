Title: Tetrahedra Parity Cross-Section Animation
Tags: math,programming

![tetrahedra](/images/movie_loopy.gif "tetrahedra")

Each point in the moving cross-section creates a tetrahedron when connected to each vertex of the green triangle in the x-y plane. The color of each point in the cross-section corresponds to the tetrahedron's signature, which we define to be one of five computable values. The signature is computed by taking the sign of the scalar triple product at each vertex. Visually, this sign corresponds to whether we move "clockwise" (-) or "counterclockwise" (+) as we move from the shortest to the longest side.

```
# keyed by number of positive-signed vertices
dict = { 0: 'blue', 1: 'red', 2: 'purple', 3: 'yellow', 4: 'orange' }
```

Blue never shows up! It would show up in the reflection over the x-y plane.

The jupyter for this [is here](https://github.com/skyldpod/jupyters/blob/main/tetrahedra/tetra4.ipynb).

### Image with Cross Products

(colors unrelated to cross-section gif above)

![tetradirection](/images/tetradirection.png "tetradirection")

$\hat{r}_1 \cdot (\hat{r}_2 \times \hat{r}_3) > 0$ Thus vertex $s$ is counterclockwise (+).

The purple vector is the cross product of the second-longest and longest edges (in that order, order matters). The sign of the dot product of [the third tetra edge and the cross product] determines vertex color (blue: counterclockwise; red: clockwise).

And a tetratable!

![tetratable](/images/tetratable.png "tetratable")

### Making the gif

```
ffmpeg -y -i 'figure_ii%4d.png' -c:v libx264 -pix_fmt yuv420p -vf scale=1024:768  -r 90 movie.mp4 && ffmpeg -y -i movie.mp4 -filter_complex "[0]reverse[r];[0][r]concat=n=2:v=1:a=0" -loop 0  movie_loopy.gif
```

### Next Steps

- plot the same cross-sections but for each vertex (2 colors only)
- plot the same cross-section in a sphere with the base triangle in the equatorial plane
- create histogram of parities given a fixed base triangle
- create histogram of parities given arbitrary tetrahedra in variously shaped spaces (sphere, cube, etc.)
