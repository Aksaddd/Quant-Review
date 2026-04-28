# Chapter 9 — An Introduction to Circles

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 95–97. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 95 / book page 81 -->

# Chapter 9

# *An Introduction to Circles*

We'll start our discussion of geometry with one of the simplest geometric figures, the circle. We all know what a circle looks like. Mathematically, a circle is defined as the set of all points which are a fixed distance from a specific point. (Do you see why?) The point in question is called the **center** (point $O$ in the diagram), and the distance is the **radius** ($OA$). A **chord** ($AC$) of a circle is a segment whose endpoints are both on the circle, and a **diameter**, $AB$, is a chord which passes through the center of the circle. A **tangent** (line $\ell$) is a line which touches the circle in only one place, and a **secant**, $m$, is a line which passes through the circle, intersecting it in two places. Circles are often referred to by their centers, so we can call the circle in the figure circle $O$. Circles which have the same center are called **concentric**.

*[Figure: circle with center $O$, point $A$ on the circle, chord $AC$, diameter $AB$, tangent line $\ell$ touching at one point, secant line $m$ passing through.]*

A part of the curve of a circle is called an **arc**, and is denoted $\overset{\frown}{AC}$ if $A$ and $C$ are the endpoints. Since $\overset{\frown}{AC}$ can refer to two different arcs, the long way around the circle or the short way, often three points are used to designate the arc, as in $\overset{\frown}{ABC}$. If only two points are used to designate an arc, it is assumed to mean the shorter, or **minor**, arc. As you may have guessed, the larger arc is called the **major** arc. The area inside a circle cut off by two radii is called a **sector**; a **circular segment** is the area between a chord and the arc it intercepts.

*[Figures: arc, sector, circular segment.]*

In any circle, it should be clear that the diameter $d$ is twice the radius $r$. The **circumference** of a circle is the distance around it.

For all circles, the ratio of the circumference $C$ to the diameter is the same. This constant ratio is designated by the Greek letter **pi**, which is written $\pi$. It is approximately equal to 3.14. (Confirm this approximation with some measuring tape and a compact disc.) Thus, we have

$$C = \pi d = 2\pi r.$$

The area inside a circle of radius $r$ is $\pi r^2$.

---

**EXAMPLE 9-1** The area of a circle is 16. What is the circumference of the circle?

*Solution:* Let the radius of the circle be $r$, so that $\pi r^2 = 16$. Dividing by $\pi$ and taking the


<!-- PDF page 96 / book page 82 -->

square root, we find $r = 4/\sqrt{\pi}$. Thus, we have

$$\text{circumference} = 2\pi r = \frac{8\pi}{\sqrt{\pi}} = \mathbf{8\sqrt{\pi}}.$$

---

**EXAMPLE 9-2** What is the maximum area that can be enclosed by 12 feet of fencing? *(MAΘ 1992)*

*Solution:* The largest area is enclosed when the fence is circular. (While we encourage that you try to prove all assertions, be satisfied with convincing yourself that this is true. A rigorous proof took some hundred years to emerge.) The circle has circumference 12, and hence has diameter $12/\pi$. Thus, its radius is $6/\pi$ and the area is $(6/\pi)^2 \pi = \mathbf{36/\pi}$.

---

**EXERCISE 9-1** What is the circumference of a circle whose area is $8\pi$?

🪡 **EXERCISE 9-2** In the figure to the right, circle $B$ is tangent to circle $A$ at $X$, circle $C$ is tangent to circle $A$ at $Y$, and circles $B$ and $C$ are tangent to each other. If $AB = 6$, $AC = 5$, and $BC = 9$, what is $AX$? *(MAΘ 1987)*

*[Figure: Large circle $A$ contains two smaller circles $B$ and $C$ internally tangent at $X$ and $Y$ respectively, with $B$ and $C$ tangent to each other.]*

---

**EXERCISE 9-3** A piece of wire 72 cm long is cut into two equal pieces and each is formed into a circle. What is the sum, in square centimeters, of the areas of the circles? *(MATHCOUNTS 1991)*

---

**EXERCISE 9-4** Circle $A$, circle $B$, and circle $C$ are externally tangent. Express the radius of circle $A$ in terms of $BC$, $AC$, and $AB$, respectively. *(MAΘ 1992)*

*[Figure: Three mutually externally tangent circles $A$, $B$, $C$.]*

---

Consider a fly sitting on the edge of a spinning record with radius 10 cm. If the record makes 150 revolutions in one minute, what is the speed of the fly? The velocity we are given is the **angular velocity** of the record, meaning how fast the record is spinning. We are asked to find the speed of the fly. The fly's speed is the distance it moves divided by the time it moves. The fly goes around a circle of radius ten centimeters 150 times in a minute. Thus the fly travels around the circumference of the circle 150 times, or $150(20\pi) = 3000\pi$ centimeters. The fly's rate is then $3000\pi$ cm/min. Converting angular velocity to linear velocity is very important and is used by every physicist and engineer in the world.


<!-- PDF page 97 / book page 83 -->

> ## *the BIG PICTURE*
>
> Circles have always been seen as special figures. In particular, they dominated Western astronomical thought for a millenium and a half. Greek astronomy described the motions of all the celestial bodies entirely in terms of circles. Circles were seen as the perfect curves, and it was even imagined that the planets' motion on their crystalline shells made a "music of the spheres."
>
> Many cultures have looked at the positions of the planets in the sky and tried to form geometric models to explain them. Sometimes when a circle was not enough to describe the observed motion, astronomers turned to "epicycles," the curves formed by a circular orbit which is itself moving on a circular orbit, as shown. Imagine a dotted line connecting the various positions of the orbiting object.
>
> *[Figure: An epicycle pattern — a flower-like arrangement of small circles arranged around a central circle, with the orbiting object's positions marked.]*
>
> The Copernican theory of 1543 placed the sun at the center of the solar system. This shook the philosophical foundations of astronomy; since Ptolemy in the second century A.D., the Earth had been the center. However, Copernicus still stuck to the basic circular orbit, though his new system was far simpler (meaning it required fewer epicycles). Only with Johann Kepler in the early 1600's was it realized that *ellipses*, not circles, were the fundamental shapes of the planets' orbits. Ellipses will be discussed in Volume 2; an elliptical orbit is shown below.
>
> *[Figure: An ellipse with a focus marked (the sun), and a planet at one position on the orbit.]*


