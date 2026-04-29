# Chapter 19: Shifts, Turns, Flips, Stretches, and Squeezes

When we perform a **geometrical transformation** of a figure, we use some set of rules to move each point to a new point. There are many ways to do this, from simply shifting or turning the figure as if it were a rigid frame to distorting it crazily. The figure you get out is called the **image** of the original figure, and we say that we **map** the original figure to its image via the transformation. Thus, transformations are sometimes called **mappings**.

Transformational geometry is a very beautiful and elegant subject which has many applications in other fields of science such as physics and optics.

---

## 19.1 Translation

Slide a pen a small distance without changing the direction the pen is pointing. The pen has just undergone a **translation**. When a figure is translated, it is just slid from one position to another without any distortion or rotation.

> *[Figure: Triangle $ABC$ translated upward and to the right to form $\triangle A'B'C'$. The two triangles are exactly the same in size and angular position; only their locations differ.]*

> 💡 **Key property:** The image of a translation is always **congruent** to the original figure.

### Coordinate Representation

To translate a figure $a$ units to the right and $b$ units up:

$$x' = x + a, \quad y' = y + b.$$

Equivalent notation:

$$(x', y') = (x + a, y + b) \quad \text{or} \quad (x, y) \to (x + a, y + b).$$

In Cartesian coordinates, all are equivalent to the desired translation.

---

### Example 19-1
*What translation would move a point 3 units left and 5 units down?*

**Solution:** To move 3 units left, subtract 3 from the $x$-coordinate. To move 5 units down, subtract 5 from the $y$-coordinate. The mapping is

$$(x', y') = (x - 3, y - 5).$$

---

**Exercise 19-1.** What translation maps the point $(3, 4)$ to the point $(5, -3)$?

**Exercise 19-2.** A **fixed point** of a transformation is a point whose image is the same as itself. Which translations have fixed points?

---

## 19.2 Rotation

Stand up and turn $180°$. You can look at this as you turning, or as you standing still and the universe turning around you! The strange-seeming second interpretation brings us to **rotations**.

In a rotation, one point — the **center of rotation** — is fixed and everything else rotates about it. Since we can turn in two directions, we generally have to specify a **direction** (clockwise or counterclockwise) as well as an **angle**.

### Defining a Rotation

Since a rotation just spins everything about a point, the **distance of any point from the center is preserved**. The **angle of rotation** is the angle formed by any point, the center of rotation, and the point's image.

> 💡 The image of $B$ upon rotation by angle $\theta$ about point $O$ is the point $B'$ such that:
> - $OB = OB'$ (distance preserved)
> - $\angle BOB' = \theta$ (angle of rotation)

> *[Figure: Triangle $ABC$ rotated by angle $\theta$ about center $O$ to form $\triangle A'B'C'$]*

### Properties

Like translations, rotations map figures to **congruent** figures; however, unlike translations, a rotation **changes the orientation** of the figure in the plane. In particular:

- $AB = A'B'$ (segments preserved)
- $OA = OA'$ (distance to center preserved)

Many rotation problems are solved using these distance-preserving qualities and the definition of the angle of rotation.

---

### Example 19-2
*Which of the following points could possibly be the rotation of $(5, 3)$ about $(2, 7)$: $(2, 5)$, $(5, 8)$, or $(7, 7)$?*

**Solution:** Since a rotation preserves distance from the center, and $(5, 3)$ is 5 units from $(2, 7)$, we look for a point in our list which is also 5 units from $(2, 7)$. Only $\boxed{(7, 7)}$ satisfies this.

---

### Example 19-3
*How many nonnegative clockwise rotations of less than $360°$ about the center of a regular pentagon map the pentagon to itself?* *(MATHCOUNTS 1984)*

**Solution:** A rotation of $0°$ trivially leaves everything unchanged — that's one answer.

For the others: if pentagon $ABCDE$ is rotated onto itself, vertex $A$ must be rotated onto one of the vertices. The five angles formed by connecting the center $O$ to the vertices are all congruent and sum to $360°$, so each is $360°/5 = 72°$.

Hence, rotations of $72°$, $144°$, $216°$, $288°$ map $A$ onto $B$, $C$, $D$, $E$ respectively. Combined with the $0°$ rotation:

$$\boxed{5} \text{ rotations.}$$

---

**Exercise 19-3.** Show that if a line $\ell$ is rotated about any point $O$ through an angle with measure $\alpha$ to a new line $\ell'$, then lines $\ell$ and $\ell'$ intersect in an angle with measure $\alpha$. *(Remember to use the facts that rotations preserve distances and map lines to lines!)* *(Mandelbrot #3)*

**Exercise 19-4.** If $ABCDEF$ is a regular hexagon, what rotation about $D$ maps $B$ to $F$?

### Coordinate Representation

Rotations are easily represented in **polar coordinates** centered at the center of rotation. A point $(r, \theta)$ rotated by $\alpha$ becomes:

$$(r, \theta) \to (r, \theta + \alpha).$$

> 💡 **Coordinate-system pairing:** Cartesian → easy translations. Polar → easy rotations. Each system has the simpler representation for one type of transformation.

---

## 19.3 Reflection

Look in a mirror. You see a **reflection**. Everything you see in the mirror is exactly congruent in size and shape to the real world.

### Reflection in a Line

When working in two dimensions, a **line** is the equivalent of a mirror. A reflection of a planar figure in a line is equivalent to flipping the figure over the line.

> 💡 **Defining reflection in a line.** When we reflect a figure in a line:
> - Every point maps to a point **symmetric** with respect to the line
> - A point and its image are **equidistant** from the line
> - The line is **perpendicular** to the segment connecting any point and its image

> *[Figure: Pentagon $ABCDE$ reflected in line $\ell$ to form pentagon $A'B'C'D'E'$. Drawing $DD'$ shows the segment is perpendicular to $\ell$ and bisected by $\ell$.]*

If you were to fold the page over along line $\ell$, each point would coincide with its image. The two pentagons are said to be **symmetric** with respect to $\ell$.

If the image of reflection of a figure in a line is the figure itself, the line is a **line of symmetry** of that figure. For example, every diameter of a circle is a line of symmetry of the circle.

### Reflection in a Point

To reflect a point $E$ in another point $O$, we draw the line through $E$ and $O$. The image $E'$ is the point on line $EO$ on the opposite side of $O$ such that $EO = E'O$.

If the image of a figure under reflection about a point is the figure itself, then the point is a **point of symmetry** of the figure.

---

**Exercise 19-5.** Show that reflection through a point in the plane is the same as a $180°$ rotation about the same point. Draw some pictures to back up your claim.

**Exercise 19-6.** Draw a figure with a line of symmetry but no point of symmetry. Draw a figure with a point of symmetry. Can a figure have a point of symmetry but no line of symmetry?

---

> 💡 **Key reflection properties:**
> - A point and its image are **equidistant** from the line of reflection
> - The line of reflection is **perpendicular** to the segment connecting any point and its image
> - Any segment is **equal in length** to its image (proof left as exercise)

---

### Example 19-4
*Find the image of reflecting the point $(4, 3)$ in the point $(2, 0)$.*

**Solution:** Draw the line through $A(4, 3)$ and $O(2, 0)$. Using horizontal and vertical lines, form right triangles $AXO$ and $OYA'$. Thus $XO \parallel YA'$ and $\angle YA'O = \angle XOA$. Since $A'O = OA$, we have $\triangle AXO \cong \triangle OYA'$.

Since $O$ is 2 units to the left of and 3 units below point $A$, point $A'$ must be 2 units to the left of and 3 units below point $O$:

$$A' = (2 - 2,\ 0 - 3) = \boxed{(0, -3)}.$$

---

### Example 19-5
*If line $\ell$ intersects line $m$ at an angle $\alpha$, show that line $\ell'$, the reflection of $\ell$ in $m$, also intersects $m$ at an angle $\alpha$.*

**Proof:** First, we show that the intersection point of $\ell$ and $\ell'$ is on $m$. The reflection of point $O$ (the intersection of $\ell$ and $m$) in $m$ is itself, so $O$ is also on $\ell'$.

To show the angles between $\ell$ and $m$, and between $\ell'$ and $m$, are equal: consider point $A$ on $\ell$ and its image $A'$ on $\ell'$. Connecting these and denoting the intersection of $AA'$ with $m$ as $X$, we form right triangles $A'XO$ and $AXO$. Since $A'$ is the image of $A$ in $m$, we have $A'X = AX$. By Leg-Leg the right triangles are congruent. Thus

$$\angle A'OX = \angle AOX = \alpha. \quad \blacksquare$$

---

**Exercise 19-7.** How many lines of symmetry does a regular hexagon have?

---

## 19.4 Distortion

Draw a picture with a marker on a piece of cellophane. Now pull on the cellophane from either side, stretching the picture. The figure gets wider, but does not get shorter or taller. This is a **distortion**.

> 💡 **Distortion:** One dimension of a figure is multiplied by some factor, while the other dimension(s) remain the same. Distortions are equivalent to squishing or stretching figures.

### Example: Triangle Distortion

Consider isosceles triangle $ABC$. By distorting the vertical scale (squishing or stretching), we can transform $\triangle ABC$ into $\triangle ABC'$ or $\triangle ABC''$. **Most notably, there is some distortion that maps the isosceles triangle into an equilateral triangle.**

### The Ellipse

In Volume 2 of this series, we will tangle with a curve called an **ellipse**. An ellipse is really just a circle distorted along some direction.

### Distortions Are Different

> ⚠️ **Distortions are different from all other transformations in this chapter:** they do not "preserve angles."

With translations, rotations, reflections, and dilations, three points forming an angle $\theta$ before the transformation form the same angle $\theta$ after. With distortions this is not the case — as shown by an isosceles triangle (two equal angles) being distorted into an equilateral triangle (three equal angles).

> Angles are not preserved, and a figure is **not similar** to its image. That's why we call them *distortions* — the shape changes.

---

## 19.5 Dilation

When we look at an object in a magnifying glass, we perform a **dilation** (also called a **similitude**) — the figure is made bigger or smaller by some factor.

### Defining a Dilation

A dilation requires a fixed point, the **center** $O$. The image of a point $A$ upon dilation with factor $k$ about $O$ is the point $A'$ on ray $\overrightarrow{OA}$ such that

$$OA' = k \cdot OA.$$

> *[Figure: Quadrilateral $ABCD$ dilated with center $O$ and factor giving image $A'B'C'D'$. Lines from $O$ through corresponding vertices are concurrent at $O$.]*

### Properties

> 💡 **Key dilation properties:**
> - A figure is **similar** to its image (not congruent unless $k = 1$)
> - The image is oriented the **same way** in the plane
> - For corresponding points: $\dfrac{OA}{OA'} = \dfrac{OB}{OB'} = \dfrac{OC}{OC'} = \cdots$ (constant ratio)

Conversely, given any two similar figures oriented the same way in the plane, one is the image of the other under some dilation. Such figures are called **homothetic**.

> 💡 **Special property of homothetic figures:** Lines drawn through corresponding parts of two homothetic figures **all pass through the center of dilation**.

> **Food for thought:** Where do congruent figures oriented in the same direction fit in here? Where is the proposed center of dilation?

### Solving Dilation Problems

Most dilation problems are solved using similarity principles:

- Ratio of corresponding sides = ratio of dilation
- Ratio of areas = (ratio of dilation)$^2$

---

### Example 19-6
*Square $ABCD$ with $AB = 4$ is dilated about its center with ratio 2 to form $A'B'C'D'$. Find $A'C$.*

**Solution:** The diagonal $AC$ of the square passes through the center of dilation $O$. If we extend $AC$ past $A$, it will pass through $A'$ (since $O$, $A$, $A'$ are collinear). Hence $A'C$ passes through $O$:

$$A'C = A'O + OC.$$

Since the dilation has ratio 2, we have $OA' = 2 \cdot OA$. The diagonal of square $ABCD$ has length $4\sqrt{2}$, so $OA = OC = 2\sqrt{2}$. Thus:

$$A'C = 2(2\sqrt{2}) + 2\sqrt{2} = \boxed{6\sqrt{2}}.$$

---

### Example 19-7
*Show that if segment $AB$ is dilated about any center with ratio 2, then the image is twice as long as $AB$.*

**Proof:** Let $A'B'$ be the image and $O$ be the center.

> ⚠️ **Subtle point:** By "ratio of dilation," we refer *by definition* to $OA'/OA$, not $A'B'/AB$. While we usually assume these are equal, here we are asked to prove it.

We have $OA/OA' = OB/OB' = 1/2$ (definition) and $\angle AOB = \angle A'OB'$ (same angle). By SAS Similarity, $\triangle AOB \sim \triangle A'OB'$, so $A'B' = 2 \cdot AB$.

> Note: this also shows $\angle OAB = \angle OA'B'$, hence $A'B' \parallel AB$. $\blacksquare$

---

## 19.6 The More Things Change...

Although transformations are defined by what they change, some of their most important features are the things they **leave the same** — the **invariants**.

### Invariance Table

| Transformation | Lines | Angles | Lengths | Areas | Orientation |
|----------------|:-----:|:------:|:-------:|:-----:|:-----------:|
| Translation | ✓ | ✓ | ✓ | ✓ | ✓ |
| Rotation | ✓ | ✓ | ✓ | ✓ | ✗ |
| Reflection | ✓ | ✓ | ✓ | ✓ | ✗ |
| Dilation | ✓ | ✓ | ✗ (scaled by $k$) | ✗ (scaled by $k^2$) | ✓ |
| Distortion | ✓ | ✗ | ✗ | ✗ (scaled by $k$) | ✓ |

- **Translation, Rotation, Reflection** preserve nearly everything; rotations and reflections only change orientation in the plane.
- **Dilations** preserve angles (and thus shape), but scale lengths by $k$ and areas by $k^2$.
- **Distortions** preserve only lines and collinearity. Circles don't stay circles, equilateral triangles don't stay equilateral (though they stay triangles, since lines map to lines).

### Distortions and Area Ratios

Although distortions don't preserve area, they have simple behavior:

> 💡 Any area is multiplied by the **same factor $k$** under a distortion.

This means distortions preserve **ratios of areas**: if two figures have areas $a$ and $b$ before, they have $ka$ and $kb$ after, and the ratio $a/b$ stays the same.

---

### Example 19-8
*Prove that any area is multiplied by the stretching factor $k$ under a distortion.*

**Solution:** Think of the area of a figure as the sum of areas of tiny parallel rectangles which cover it. Lining these up with the distortion direction, each rectangle is stretched by factor $k$ in one direction and unchanged in the other, so each rectangle's area is multiplied by $k$. Thus the total area is multiplied by $k$. $\blacksquare$

---

**Exercise 19-8.** The prior proof relies on imaginary rectangles and isn't completely rigorous. For triangles and rectangles, give a more sturdy proof which rests only on basic geometry.

---

## 19.7 Transformation Proofs

Throughout this chapter we have asserted countless properties of transformations which, while seemingly obvious, should be rigorously proven. The examples below show how to approach these proofs.

---

### Example 19-9
*Show that if any three points are collinear, then the images of these points when rotated about any point are also collinear.*

**Proof:** To show $A'$, $B'$, $C'$ are collinear, we show $\angle OB'A' + \angle OB'C' = \pi$. (Why?)

Since rotations preserve angles, $\angle A'OB' = \angle AOB$. Since rotations preserve distances, $A'O = AO$ and $B'O = BO$. By SAS:

$$\triangle A'B'O \cong \triangle ABO.$$

Similarly, $\triangle C'B'O \cong \triangle CBO$. Using corresponding angles:

$$\angle OB'A' + \angle OB'C' = \angle OBA + \angle OBC = \pi,$$

so the image points are collinear. $\blacksquare$

---

### Example 19-10
*Assuming that the reflection of a segment is a segment of equal length, show that the reflection of a circle is a circle of the same radius.*

**Proof:** Let the original center be $O$, the radius be $r$, and the reflection of $O$ be $O'$.

**Step 1: Image points are on a circle of radius $r$ centered at $O'$.** If $P$ is on the original circle, $OP = r$. The image of segment $OP$ is segment $O'P'$, so $O'P' = r$ (lengths preserved).

**Step 2: Every point on the desired circle is the image of an original point.** This is needed because, without it, for all we know the image could be a *semicircle*. (Do you see why?)

For any point $P'$ with $O'P' = r$, form the image $P$ of $P'$ under the reflection. Since $P$ is the image of $P'$, $P'$ is the image of $P$ (why?), and $OP = r = O'P'$. Thus every point on the desired circle is the image of a point on the original circle.

Since we have every point that is $r$ from $O'$ and no others, the image is a circle of radius $r$. $\blacksquare$

> 💡 **Lesson:** To make transformation proofs rigorous, we need to be careful — both directions (image is on the target shape, *and* every point on the target shape is an image) must be checked.

---

**Exercise 19-9.** Show that any segment is equal in length to its image upon reflection (that "reflections preserve distances").

---

## Problems to Solve for Chapter 19

**329.** Prove that given any two points $A$ and $A'$, there is a point $O$ such that $A'$ is the image of $A$ under reflection through $O$.

**330.** Let $y = mx + b$ be the image when the line $x + 3y + 11 = 0$ is reflected across the $x$-axis. Find the value of $m + b$. *(AHSME 1992)*

**331.** Given points $P_0(0, 0)$ and $P_1(3, 4)$ in the coordinate plane, reflect $P_1$ into $P_0$ to get $P_2$, reflect $P_2$ into $P_1$ to get $P_3$, etc. If $P_4 = (a, b)$, find $a + b$. *(MAΘ 1991)*

**332.** Two successive clockwise rotations about the origin of angles $x$ and $y$ ($0 \le x, y \le \pi$) result in a reflection through the origin. Find $x + y$. *(MAΘ 1992)*

**333.** Prove that if a rotation maps $A$ to $C$ and $B$ to $D$, then it maps segment $AB$ to segment $CD$. *(Mandelbrot #3)*

**334.** Let $\triangle ABC$ be an isosceles triangle with $AB = AC$, $\angle BAC = \alpha$, and circumcenter $O$. Prove that there exist rotations about both $A$ and $O$ which carry segment $AB$ to segment $AC$. *(Mandelbrot #3)*

**335.** Let $\triangle ABC$ be as in the prior problem, and suppose points $M$ and $N$ on $AB$ and $AC$ respectively are such that $BM = AN$. Compute the angle of rotation (in terms of $\alpha$) needed to map segment $AB$ to $AC$ with center $O$. Show that $\angle MON$ equals this angle. *(Mandelbrot #3)*

**336.** Find the reflection of the point $(2, 2)$ in the line $x + 2y = 4$.

**337.** The center of a circle has coordinates $(6, -5)$. The circle is reflected about the line $y = x$. What are the $x$-$y$ coordinates of the center of the image circle? *(MATHCOUNTS 1992)*

**338.** Which figure does not have point symmetry: equilateral triangle, square, or regular hexagon? *(MATHCOUNTS 1984)*

**339.** If $ABCDE$ is a regular pentagon, find the smallest rotation about $E$ which maps $A$ to $D$. *(MATHCOUNTS 1984)*

**340.** The image of quadrilateral $ABCD$ when reflected over line $\ell$ is $A'B'C'D'$. $E$ is the point of intersection of the lines $\overleftrightarrow{AB}$ and $\overleftrightarrow{A'B'}$. If $AA' = 10$ and $A'E = 13$, find the number of square units in the area of $\triangle AEA'$. *(MATHCOUNTS 1984)*

**341.** If the graph of the equation $y = 3x + 2$ is reflected with respect to the $y$-axis, what is the equation of the resulting graph? *(MATHCOUNTS 1989)*

**342.** The points $Q(9, 14)$ and $R(a, b)$ are symmetric with respect to the point $P(5, 3)$. What are the coordinates of point $R$? *(MATHCOUNTS 1989)*
