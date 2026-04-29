# Chapter 16: The Power of Coordinates

## 16.1 Labelling the Plane

Already in this book we have discussed extensively the methods of solving geometrical problems using nothing more than the relationships in the figures themselves. However, there exists a whole different approach to geometry which, though less creative, is incredibly powerful. The idea is that of **coordinates**; it allows many complex geometric relationships to be rephrased as simple formulas. The idea was first rigorously used in the 1600's by **Descartes** (day-CART), though it is so simple that it's hard to believe that it wasn't used earlier by others.

### The Number Line and the Plane

> *[Figure: A Cartesian plane with x-axis and y-axis crossing at the origin, with integer tick marks labeled]*

The easiest way to explain coordinates is to recall the **number line**. Each point on a line is labelled by a number, the distance from a fixed origin. This is an interesting way to look at the real numbers, but is certainly not very useful for geometry, since there isn't much geometry in one dimension.

With a little modification we can extend the same idea to cover the entire plane: we add another axis, perpendicular to the first and crossing it at the point 0. Then we can label each point in the plane by its distance to each axis. (It makes sense to label points with two numbers each because the plane is two dimensional.)

To be precise, each point is labelled by an **ordered pair** like $(3, -2)$ or $(17, 17)$. The first number is the distance *right* (negative for left) and the second is the distance *up* (negative for down).

- The horizontal axis is called the **$x$-axis**, and the corresponding number the **$x$-coordinate** (or **abscissa**).
- The vertical axis is called the **$y$-axis**, and the corresponding number the **$y$-coordinate** (or **ordinate**).

The coordinates $(x, y)$ of a point are called its **Cartesian** (car-TEA-zhun) **coordinates**, after Descartes.

### Polar Coordinates

The Cartesian way of labelling the plane is an entirely arbitrary choice. By far the most important alternative coordinate system is that of **polar coordinates**. In this setup, a point is labelled by the ordered pair $(r, \theta)$, where:

- $r$ is the distance from the origin
- $\theta$ is the angle with respect to a chosen axis, usually taken to be the positive Cartesian $x$-axis

> *[Figure: The polar grid — concentric circles representing increasing $r$, radial lines representing increasing $\theta$, with angle labels $30°, 60°, 90°, \ldots$]*

There exist other ways to put coordinates on the plane, but polar and Cartesian are plenty for most purposes. **Because Cartesian coordinates are the most generally useful, any coordinates in which the coordinate system is not specified may be assumed to be Cartesian.**

---

**Exercise 16-1.** Plot the Cartesian points $(4.5, 3)$, $(1, -7/2)$, and $(-6, -4)$ and the polar points $(2, 3\pi/4)$, $(3/2, 270°)$, and $(1, 0°)$.

### Quadrants

In both polar and Cartesian systems, the plane is sometimes thought of as being composed of four **quadrants**. The upper right (positive $x$, positive $y$) is called the **first quadrant** (labelled with a roman numeral I), and they go counterclockwise from there.

**Exercise 16-2.** In which quadrant is $x$ positive and $y$ negative?

---

## 16.2 What's it Good For?

The beauty of a coordinate approach to geometry is that we can often convert geometrical pictures into easily understood equations.

### Cartesian: Lines

The simplest examples in Cartesian coordinates are equations like $x = 1$ or $y = -5$. Take $x = 1$, for instance. This is understood to mean the set of all points in the plane whose coordinates $(x, y)$ satisfy the equation $x = 1$. Thus $y$ can be anything, but $x$ must stay equal to 1. The result is a **vertical line**. Similarly, $y = -5$ represents a **horizontal line**.

### Polar: Circles and Rays

The simplest equations in polar coordinates produce different results. Consider an equation like $r = 3$. As with the Cartesian case, $\theta$ can be anything, while $r$ is restricted to 3. The result is a **circle of radius 3 centered at the origin**.

**Exercise 16-3.** What curve does the equation $\theta = 47°$ represent?

### When to Use Which System

The dramatic difference between the simplest curves in Cartesian and polar coordinates is a clue as to what the different coordinate systems are good for:

- **Cartesian** is much better than polar for describing **straight lines and line segments**.
- **Polar** is often better for **circles** (and, to a lesser extent, lines through the origin).
- Other curves may go either way, or be equally well described by both.

### Transformations

Perhaps more important than the basic curves is how the two coordinate systems handle **transformations**. Consider a point with polar coordinates $(r, \theta)$ and Cartesian coordinates $(x, y)$. Three basic transformations:

| Transformation | Cartesian | Polar |
|----------------|-----------|-------|
| **Translation** by $(a, b)$ | $(x, y) \to (x + a, y + b)$ — simple | considerably more complicated |
| **Rotation** by angle $\alpha$ (about origin) | considerably more complicated | $(r, \theta) \to (r, \theta + \alpha)$ — simple |
| **Reflection** | see Exercise 16-4 | see Exercise 16-4 |

**Exercise 16-4.** What happens to the coordinates $(x, y)$ and $(r, \theta)$ under a reflection across the $x$-axis? The $y$-axis?

---

## 16.3 Straight and Narrow

Now that we have a fairly good handle on coordinates, let's begin to apply them to what they were invented for: **describing curves**. The straight line is the simplest curve, so it is a good starting point. For most lines, Cartesian coordinates provide the simplest description.

What do we need to plot a line? Geometry tells us that two points are enough. However, in a coordinate approach it is usually simpler to specify one point and the "steepness" of the line.

### The y-Intercept and Slope-Intercept Form

Any line which is not vertical must intersect the $y$-axis at some point. The point will have coordinates $(0, b)$ for some $b$, and is called the **$y$-intercept**. Similarly, where a line intersects the $x$-axis is called the **$x$-intercept**.

---

### Example 16-1
*Find the $x$- and $y$-intercepts of the line $2x + 7y = 14$.*

**Solution:** The $x$-intercept is where the line crosses the $x$-axis, i.e., where $y = 0$. Setting $y = 0$ yields $x = 7$, so the $x$-intercept is $(7, 0)$. Similarly, setting $x = 0$ gives $y = 2$, so the $y$-intercept is $(0, 2)$.

---

**Exercise 16-5.** Find the area of the region enclosed between the line $3x + 4y = 12$ and the two coordinate axes. *(Hint: you don't need to draw a picture.)*

### Deriving the Slope-Intercept Form

Starting with the $y$-intercept $(0, b)$, the equation must be of the form

$$y = mx + b \quad (16.1)$$

for some $m$. What does $m$ signify? Consider starting at $(0, b)$ and moving over by 4. Equation (16.1) becomes $y = 4m + b$. So as $x$ increases by 4, $y$ increases by $4m$.

> 💡 **In general:** if we move to the right by some amount, we must move up by $m$ times that amount to stay on the line. The larger $m$ is, the steeper the line.

Form (16.1) is called the **slope-intercept form** of a line. Since $m$ corresponds to steepness, we call it the **slope**. Some people remember the slope as **"rise over run"**:

$$m = \frac{\text{rise}}{\text{run}} = \frac{\text{vertical change}}{\text{horizontal change}}.$$

Both rise and run can be negative; if the ratio is negative, the line is sloped downward.

> *[Figure: A line on a coordinate plane showing the y-intercept (0, b) and a "rise over run" right triangle illustrating slope $m$]*

---

**Exercise 16-6.** Think about it.

**Exercise 16-7.** What should the steepness of a horizontal line be? What is $m$ for a horizontal line? What about a vertical line? Does $m$ properly account for negative "steepness"?

---

### Example 16-2
*Find the slope of a line which contains the points $(15, 16)$ and $(-2, -18)$.*

**Solution:** From the first point to the second, the line must go over by $(-2) - 15 = -17$ and up by $(-18) - 16 = -34$. The slope is $(-34)/(-17) = \boxed{2}$.

---

### Example 16-3
*Find the slope of the line which contains $(x_1, y_1)$ and $(x_2, y_2)$.*

**Solution:** The line goes over $(x_2 - x_1)$ and up $(y_2 - y_1)$, so

$$m = \frac{y_2 - y_1}{x_2 - x_1}.$$

---

### Example 16-4
*Find the equation of a line which passes through the points $(-1, -1)$ and $(3, 7)$.*

**Solution:** Between the two points we go over 4 and up 8, so the slope is $8/4 = 2$. Substituting into slope-intercept form: $y = 2x + b$. Plugging in $(-1, -1)$: $-1 = -2 + b$, so $b = 1$. Thus the line is $\boxed{y = 2x + 1}$.

---

**Exercise 16-8.** Find the equation of a line if its $x$-intercept is at $(-4, 0)$ and its $y$-intercept at $(0, 3)$.

**Exercise 16-9.** Find the equation of a line whose $x$- and $y$-intercepts are $(2, 0)$ and $(0, -6)$ respectively.

> The slope-intercept form is a universal method for finding the equation of a line. Just use the given information with the equation $y = mx + b$ to find both $m$ and $b$.

---

### Example 16-5 (Two-Point Form)
*Suppose we are given two points $(p_1, q_1)$ and $(p_2, q_2)$ on the line. Find the equation of the line.*

**Solution:** Plug both points into slope-intercept form:

$$\begin{aligned}
q_1 &= m p_1 + b \\
q_2 &= m p_2 + b.
\end{aligned}$$

Solving for $m$ and $b$:

$$m = \frac{q_1 - q_2}{p_1 - p_2}, \qquad b = \frac{-q_1 p_2 + q_2 p_1}{p_1 - p_2}.$$

The final equation is

$$y = \frac{q_1 - q_2}{p_1 - p_2} x + \frac{-q_1 p_2 + q_2 p_1}{p_1 - p_2},$$

or the more symmetric-looking

$$(q_1 - q_2) x - (p_1 - p_2) y = p_2 q_1 - p_1 q_2.$$

---

**Exercise 16-10.** Verify that the original points $(p_1, q_1)$ and $(p_2, q_2)$ satisfy the equation above.

**Exercise 16-11.** Find the equation for a line with slope $m$ containing the point $(p, q)$.

### Standard Form

For presentation purposes, a more general form is often preferred — the **standard form**:

$$Ax + By = C \quad \text{(or sometimes } Ax + By + C = 0\text{)}$$

Here $A$, $B$, and $C$ are simplified (integers if possible) and $A$ is nonneg­ative.

---

### Example 16-6
*What are the slope, $x$-intercept, and $y$-intercept of $2x + 3y = 6$?*

**Solution:** Setting $y = 0$: $2x = 6 \Rightarrow x = 3$, so $x$-intercept is $(3, 0)$. Setting $x = 0$: $y = 2$, so $y$-intercept is $(0, 2)$.

For the slope, solve for $y$: $y = -2x/3 + 2$. The slope is $-2/3$.

> 💡 **In general:** The slope of a line $Ax + By + C = 0$ is $-A/B$.

---

### Parallel and Perpendicular Lines

It is often important to determine whether two lines are parallel or perpendicular.

> 💡 **Two lines are parallel if and only if they have the same slope.**

So how do we know if they are perpendicular? If one slope is the negative of the other?

**Exercise 16-12.** Find an example showing that two lines whose slopes are negatives of one another are in general not perpendicular.

The actual idea: if one line goes over $a$ while it goes up $b$, a perpendicular one will go up $-a$ while it goes over $b$. The slopes are $a/b$ and $-b/a$, which multiply to $-1$.

> *[Figure: Two perpendicular lines on a coordinate plane with rise/run triangles showing slopes $a/b$ and $-b/a$]*

> 💡 **Two lines are perpendicular if and only if their slopes multiply to $-1$.** (Note: this can't be used for horizontal or vertical lines.)

**Exercise 16-13.** Draw the lines $y = \frac{x}{2} + 1$ and $y = -2x + 3$, whose slopes do multiply to $-1$, to confirm.

---

## 16.4 Plotting a Line

> An old adage says that a picture is worth a thousand words. Surprisingly, this is often true in working with equations.

To plot a curve given an equation: plug in various values for $x$ and solve to get the corresponding $y$'s. Once you've got two or three points, connect them.

This method is useful for all sorts of plotting:

1. Plug in $x$ values
2. Find the $y$ values
3. Draw the points
4. Connect them

If you know certain things about the shape of the graph, you may only need one or two points; otherwise you may need to draw many points.

For lines specifically, if the equation is in slope-intercept form with slope $m$ and $y$-intercept $b$, start at $(0, b)$ and follow the slope using "rise over run". For example, if $m = -5/2$: go right 2, down 5, repeat. Then left 2, up 5 in the other direction.

---

### Example 16-7
*Plot the line $3x + 4y = 5$.*

> *[Figure: The line $3x + 4y = 5$ plotted on a coordinate plane through the four points (-1, 2), (0, 5/4), (1, 1/2), (2, -1/4)]*

**Solution:** Plug in $x = -1, 0, 1, 2$ to get $y = 2, \frac{5}{4}, \frac{1}{2}, -\frac{1}{4}$. Plot these four points and connect them.

> Note: while only two points are required to plot a line, more may help when fractional coordinates are involved.

---

**Exercise 16-14.** Plot the lines $y = -\frac{1}{2}x + 2$ and $(x - 2) = 3(y + 4)$.

---

## 16.5 The Distance Formula and Circles

### Distance Formula

Given the coordinates $(x_1, y_1)$ and $(x_2, y_2)$ of two points in the plane, how far apart are they? The answer is a simple application of the **Pythagorean Theorem**.

> *[Figure: Two points $(x_1, y_1)$ and $(x_2, y_2)$ on a coordinate plane connected by a hypotenuse $d$, with horizontal leg $x_2 - x_1$ and vertical leg $y_2 - y_1$]*

To get from the first to the second, we go right a distance $(x_2 - x_1)$ and up a distance $(y_2 - y_1)$. These two distances form the legs of a right triangle. The hypotenuse $d$ is the distance we want:

$$d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2,$$

so

$$\boxed{d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.}$$

This is the **distance formula**.

---

### Example 16-8
*Find all $x$ such that the point $(x, 3)$ is 5 units away from $(-1, 7)$.*

**Solution:** From the distance formula:

$$5 = \sqrt{(-1 - x)^2 + 16}.$$

Squaring and rearranging: $x^2 + 2x - 8 = 0$, which has solutions $x = 2$ and $x = -4$.

---

### Equation of a Circle

The distance formula provides an easy way to figure out the equation for a circle. If the center is $(p, q)$ and the radius is $R$, the circle is just all points $(x, y)$ whose distance to $(p, q)$ equals $R$:

$$\sqrt{(x - p)^2 + (y - q)^2} = R,$$

or the more preferred

$$\boxed{(x - p)^2 + (y - q)^2 = R^2.} \quad (16.2)$$

---

### Example 16-9
*Plot the circle $(x + 1)^2 + (y - 2)^2 = 9$.*

> *[Figure: Circle of radius 3 centered at $(-1, 2)$ on a coordinate plane]*

**Solution:** By comparison with equation (16.2), the center is $(-1, 2)$ and the radius is 3. The first four points on the circle are 3 units in the four main directions from the center: $(2, 2)$, $(-4, 2)$, $(-1, -1)$, and $(-1, 5)$.

---

### General Form and Completing the Square

A more general form of the circle equation is

$$x^2 + y^2 + Ax + By + C = 0. \quad (16.3)$$

This is not a form we would willingly use because the relevant information (center, radius) is hard to see. To convert back to (16.2), we use **completing the square** — twice, once on $x$ and once on $y$.

---

### Example 16-10
*Find the center and radius of the circle described by $2x^2 + 2y^2 + 8x - 12y + 3 = 0$.*

**Solution:** First divide by 2 to make the coefficients of $x^2$ and $y^2$ equal to 1, then group:

$$(x^2 + 4x) + (y^2 - 6y) + \frac{3}{2} = 0.$$

Complete the square by adding $(4/2)^2 = 4$ to $(x^2 + 4x)$ and $(-6/2)^2 = 9$ to $(y^2 - 6y)$:

$$(x^2 + 4x + 4) - 4 + (y^2 - 6y + 9) - 9 + \frac{3}{2} = 0,$$

or

$$(x + 2)^2 + (y - 3)^2 = \frac{23}{2}.$$

Thus the center is $\boxed{(-2, 3)}$ and the radius is $\sqrt{23/2} = \boxed{\sqrt{46}/2}$.

---

**Exercise 16-15.** What if the number on the right side had been $0$? Negative?

> **Note:** We only get a circle if the coefficients of $x^2$ and $y^2$ in Equation (16.3) are the same. Do you have a guess about what happens if they aren't?

---

## 16.6 Went Down to the Crossroads...

One thing coordinate geometry is very good at is finding the **intersection points** of figures. All that's necessary is to find the equations of the two figures, then solve those equations simultaneously. If solving is too hard, you can find approximate intersections by plotting both figures accurately and locating the intersection points on the graph.

---

**Exercise 16-16.** Find the intersection of the lines

$$\begin{aligned}
x + y &= -3 \\
-2x + 3y &= 2
\end{aligned}$$

by solving the equations simultaneously, then plot the lines and find the intersection graphically.

---

### Example 16-11
*Find the intersections of the line $x + y = -2$ and the circle $(x + 3)^2 + (y - 8)^2 = 25$.*

**Solution:** Use the line equation to write $y = -2 - x$. Plugging into the circle equation:

$$(x + 3)^2 + (-10 - x)^2 = 25.$$

Square out, collect terms, and solve the resulting quadratic in $x$. Then plug back into the linear equation. The solutions are $\boxed{(-6, 4) \text{ and } (-7, 5)}$.

---

**Exercise 16-17.** In what numbers of points can two distinct lines intersect? Two circles? A line and a circle? Justify your answers based on the equations of the figures in question.

---

## 16.7 ...Fell Down on My Knees

Geometry that is done in a coordinate system is called **analytic geometry**. ("Analytic" means using equations rather than pictures.) Most geometry can best be done with basic geometric principles rather than resorting to describing the figures by equations.

> ⚠️ **When in doubt about whether or not to use an analytic approach to a problem, always try a geometric approach first.**

What types of problems can be solved with analytic geometry?

---

### Example 16-12 (Midpoint Formula)
*Prove that the midpoint of the segment whose endpoints are $(x_1, y_1)$ and $(x_2, y_2)$ is given by*

$$\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right).$$

**Solution:** Consider the two right triangles formed by dropping perpendiculars from each endpoint to a horizontal line through $M$ (the midpoint). They have equal hypotenuses (since $M$ is the midpoint) and equal angles (parallel dotted lines), so they are congruent by SA for right triangles. Thus each pair of corresponding legs is equal.

The total horizontal distance covered is $x_2 - x_1$, so each horizontal leg has length $(x_2 - x_1)/2$. The $x$-coordinate of the midpoint is $x_1 + (x_2 - x_1)/2 = (x_1 + x_2)/2$. The $y$-coordinate follows in exactly the same way. $\blacksquare$

---

### Choosing Coordinates Wisely: The Triangle

The most crucial figure in geometry is the triangle. Since we can choose our coordinates any way we please, we should think about how to place the coordinate axes to make analysis simple.

> 💡 **Best choice:** Place two of the vertices, $A$ and $B$, on the $x$-axis, and the other, $C$, on the $y$-axis. Then the coordinates are $(a, 0)$, $(b, 0)$, and $(0, c)$ for some $a$, $b$, and $c$.

We can thus reduce the six variables to only three without making any limiting assumptions. (Convince yourself that every triangle can be represented in this way.)

---

### Example 16-13 (Centroid Existence)
*Prove that the centroid of a triangle exists — i.e., the three medians come together at a single point.*

**Solution:** Place vertices at $A = (a, 0)$, $B = (b, 0)$, $C = (0, c)$. The midpoints opposite these vertices are $(b/2, c/2)$, $(a/2, c/2)$, and $((a+b)/2, 0)$, respectively.

The equations of the three medians are:

$$\begin{aligned}
cx + (2a - b) y &= ac \\
cx + (2b - a) y &= bc \\
2cx + (a + b) y &= c(a + b).
\end{aligned}$$

Solving the first two simultaneously gives the intersection $\left(\dfrac{a + b}{3}, \dfrac{c}{3}\right)$. Plugging into the third equation, it is indeed satisfied. Thus the single point

$$\left(\frac{a + b}{3}, \frac{c}{3}\right) \quad (16.4)$$

lies on all three medians — this is the **centroid**. $\blacksquare$

---

> **A subtle point:** You might argue that we have only proven the centroid exists for *one choice* of the coordinate system. However, we can choose the coordinate system in any way we want! As long as only geometric relationships are involved in the result, we can choose the simplest system and prove the general result there.
>
> However, if we are asked to prove something about *specific coordinates themselves*, as in Exercise 16-19 below, we are not free to choose our coordinates.

---

**Exercise 16-18.** Prove that if $G$ is the centroid of $\triangle ABC$ and $AM$ is a median, then $AG = 2 \cdot GM$.

**Exercise 16-19.** The point (16.4) is the average of the three coordinates of the triangle! Show that this is true regardless of how the triangle is oriented in the coordinate plane.

---

> ⚠️ **Closing warning:** As Example 16-13 shows, even simple problems can get heavily algebraic. Don't get into the habit of trying analytic techniques on every geometry problem you see, for you will get caught in a mass of equations and miss the simple geometric solution. Analytic geometry can never be a complete substitute for the techniques of pure Euclidean geometry. Experience will teach which types of problems work nicely in analytic geometry, and in which problems analytic techniques are an uncreative dead end.

---

## Problems to Solve for Chapter 16

**278.** Find the distance between the points $(2, 12)$ and $(-4, 10)$.

**279.** A right triangle is drawn with legs of lengths 3 on the $x$-axis and 4 on the $y$-axis lying along the positive coordinate axes. Find the coordinates of the midpoint of the hypotenuse.

**280.** How many points with integer coordinates are exactly 5 units away from $(0, 0)$?

**281.** Find the equation of a line which passes through $(5, 7)$ and cuts the area of the circle $(x + 12)^2 + (y + 3)^2 = 4$ in half.

**282.** Find the centroid of a triangle with vertices $(10, 66)$, $(19, 72)$, and $(17, 56)$.

**283.** Find the distance from the point $(5, 7)$ to the center of the circle $4x^2 + 8x + 4y^2 - 16y - 16 = 0$.

**284.** If $a, b > 0$ and the triangle in the first quadrant bounded by the coordinate axes and the graph of $ax + by = 6$ has area 6, then find $ab$. *(AHSME 1989)*

**285.** Parallelogram $ABCD$ has vertices $A(0, 0)$, $B(2, 4)$, and $D(5, 1)$. If the remaining vertex, $C$, is in the first quadrant, what are its coordinates? *(MATHCOUNTS 1992)*

**286.** The graphs of the equations $x + 3y = 6$ and $kx + 2y = 12$ are perpendicular. What is the value of $k$? *(MATHCOUNTS 1989)*

**287.** What are the coordinates of the point that is two-thirds of the way from $(2, 4)$ to $(-1, 1)$? *(MATHCOUNTS 1990)*

**288.** We are given the line $3x + 5y = 15$ and a point on this line equidistant from the coordinate axes. In which quadrants can such a point exist? *(AHSME 1960)*

**289.** Prove analytically that the diagonals of a rectangle bisect each other.

**290.** Find $y$ if $(3, y)$ lies on the line joining $(0, 3/2)$ and $(9/4, 0)$. *(MAΘ 1987)*

**291.** Describe analytically all the lines which bisect the area of the square with vertices $(0, 0)$, $(s, 0)$, $(s, s)$, and $(0, s)$.

**292.** Find the vertices of a square which is centered at $(-17, 23)$, has side length 4, and whose diagonals are parallel to the coordinate axes.

**293.** A circle is drawn with center at the origin and radius 3. Find the coordinates of all intersections of the circle with an origin-centered square of side length 4 whose sides are parallel to the coordinate axes.
