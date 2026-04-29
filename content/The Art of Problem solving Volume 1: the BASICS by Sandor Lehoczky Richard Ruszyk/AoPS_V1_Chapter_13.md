# Chapter 13: Polygons

## 13.1 Types of Polygons

A **polygon** is a simple closed planar figure formed by line segments. Polygons are classified by the number of sides they have; we have already discussed triangles (three sides) and quadrilaterals (four sides). A polygon with $n$ sides is generically called an **$n$-gon**, but many types of polygons have special names as well.

| # sides | Name |
|---------|------|
| 3 | triangle |
| 4 | quadrilateral |
| 5 | pentagon |
| 6 | hexagon |
| 7 | heptagon |
| 8 | octagon |
| 9 | nonagon |
| 10 | decagon |
| 12 | dodecagon |

A polygon is called a **regular polygon** if all of its sides are equal *and* all of its angles are equal.

> ⚠️ **Important:** As we saw with quadrilaterals, just because all the sides of a polygon are equal doesn't mean the polygon is regular. The same is true of the angles. (Can you draw a polygon whose interior angles are equal but which is still not regular?)

As with quadrilaterals, any segment drawn from one vertex to a non-adjacent vertex is called a **diagonal**.

### Counting Diagonals

To count the number of diagonals in an $n$-gon, we count the number of diagonals from each vertex. Each vertex can be connected to $n - 1$ other vertices. Two of these segments form sides, while the other $n - 3$ form diagonals. Since there are $n$ vertices, we get $n(n - 3)$.

To test this formula, consider a quadrilateral, where $n = 4$. Our formula gives $4(4 - 3) = 4$ diagonals — but a quadrilateral only has 2! In our counting method we have actually counted every diagonal *twice*, once for each endpoint. Thus, dividing by 2:

$$\text{Number of diagonals in an $n$-gon} = \frac{n(n-3)}{2}.$$

---

## 13.2 Angles in a Polygon

To determine the sum of the angles in a polygon, we divide the polygon into triangles just as we did for the quadrilateral. Draw the $n - 3$ diagonals from one vertex. This divides the polygon into $n - 2$ triangles. Adding up all the angles in these triangles gives:

$$\text{Sum of interior angles of an $n$-gon} = 180(n-2)\text{ degrees}.$$

> *[Figure: An octagon with all 5 diagonals drawn from a single vertex, dividing it into 6 triangles]*

### Sum of Exterior Angles

Consider the exterior angles of a polygon. Let the interior angle at vertex $i$ equal $\beta_i$ and the exterior angle be $\alpha_i$. At each vertex, $\alpha_i + \beta_i = 180°$. Adding these equations together for all $n$ vertices:

$$(\alpha_1 + \beta_1) + \cdots + (\alpha_n + \beta_n) = (\alpha_1 + \cdots + \alpha_n) + (\beta_1 + \cdots + \beta_n) = 180n.$$

Using what we know about the sum of the interior angles:

$$(\alpha_1 + \cdots + \alpha_n) + 180(n - 2) = 180n.$$

Thus:

$$(\alpha_1 + \cdots + \alpha_n) = 180n - 180(n - 2) = 360.$$

> 💡 **Key result:** The sum of the exterior angles of *any* polygon is $360°$.

---

## 13.3 Regular Polygons

Most polygons you will encounter in geometry problems which have more than four sides will be regular polygons. Since the angles of a regular polygon are all equal, knowing the sum of the interior angles and the sum of the exterior angles, we can determine the measure of each angle:

$$\text{Interior angle} = \frac{180(n-2)}{n} = 180 - \frac{360}{n}$$

$$\text{Exterior angle} = \frac{360}{n}$$

### Common Regular Polygon Angles

| # Sides | Interior Angle | # Sides | Interior Angle |
|---------|----------------|---------|----------------|
| 3 | $60°$ | 8 | $135°$ |
| 4 | $90°$ | 9 | $140°$ |
| 5 | $108°$ | 10 | $144°$ |
| 6 | $120°$ | 12 | $150°$ |

> It's not necessary to memorize these; just be familiar with them.

---

### Example 13-1
*Prove that by connecting every other vertex of a regular hexagon, we form an equilateral triangle.*

**Proof:** Let the hexagon be $ABCDEF$. We must show that the three sides $AC$, $CE$, and $AE$ are equal.

By SAS:

$$\triangle ABC \cong \triangle CDE \cong \triangle EFA.$$

(Each has two sides equal to the hexagon's side length, with the included angle being the hexagon's interior angle of $120°$.)

The sides in question are corresponding sides of these triangles, so $AC = CE = AE$ and thus $\triangle ACE$ is equilateral. $\blacksquare$

---

### Example 13-2
*Find the number of sides in a polygon whose interior angles have sum $2340°$.*

**Solution:** A polygon with $n$ sides has interior angle sum $180(n - 2)$. Solving $180(n - 2) = 2340$:

$$n - 2 = 13 \implies n = \boxed{15}.$$

---

### Example 13-3
*Given that $ABCD\cdots L$ is a regular dodecagon, find the length of $AD$ if $AB = 4$.*

**Solution:** We attack this problem as we do most geometry problems: cut the problem into quadrilaterals and triangles.

> *[Figure: Trapezoid section $ABCD$ of the dodecagon, with perpendiculars $BX$ and $CY$ dropped from $B$ and $C$ to $AD$]*

Since a dodecagon has 12 sides, each interior angle has measure $150°$. $ABCD$ is an isosceles trapezoid (why?), so

$$\angle BAX = \angle CDY = 180° - \angle BCD = 30°.$$

Drawing $BX$ and $CY$ perpendicular to $AD$, we find that $BCYX$ is a rectangle because $\angle YCD = 90° - \angle CDY = 60°$, so $\angle BCY = 150° - 60° = 90°$. Thus $XY = BC = 4$.

Since $\angle BAX = 30°$ in right triangle $ABX$, we have $BX = AB/2 = 2$ and $AX = BX\sqrt{3} = 2\sqrt{3}$. Similarly $YD = 2\sqrt{3}$. Thus

$$AD = AX + XY + YD = 2\sqrt{3} + 4 + 2\sqrt{3} = \boxed{4 + 4\sqrt{3}}.$$

---

**Exercise 13-1.** Find the number of sides in a regular polygon which has interior angle measure $162°$.

**Exercise 13-2.** Prove that we form a square if we connect every other vertex of a regular octagon. *(Remember: just showing the sides are equal does not mean the quadrilateral is a square.)*

---

### Inradius, Circumradius, and Area

Just as with triangles, the perpendicular bisectors of the sides of a regular polygon all pass through a single point. (Can you use triangle congruence to prove this?) Furthermore, the angle bisectors of the interior angles also meet at this point. Thus, we can construct both:

- A circle which passes through the **vertices** of the polygon (the **circumcircle**, with radius $R$)
- A circle which is tangent to all the **sides** of the polygon (the **incircle**, with radius $r$, also called the **apothem**)

These two circles are **concentric**.

> *[Figure: A regular hexagon with both the inscribed circle (radius $r$, the apothem) and circumscribed circle (radius $R$). A right triangle $\triangle AXO$ is highlighted, where $X$ is the midpoint of side $AB$, with legs $r$ and $\ell/2$ and hypotenuse $R$, and the angle $\theta$ at $O$.]*

If the polygon has side length $\ell$ and $n$ sides, we can determine the inradius $r$, the circumradius $R$, and the area by breaking the polygon into right triangles like $\triangle AXO$. The radius of the incircle is perpendicular to the side at the point of tangency, so $\angle OXA = 90°$. In this triangle:

- The hypotenuse is $R$
- The legs have length $r$ and $\ell/2$

If we draw a radius like $OX$ to all the sides of the polygon, we form $2n$ congruent right triangles. All the angles at $O$ together make up $360°$, so

$$\theta = \frac{360°}{2n} = \frac{180°}{n}.$$

Thus, we find $r$ and $R$ from the basic trigonometric relations:

$$\tan\theta = \tan\!\left(\frac{180°}{n}\right) = \frac{\ell/2}{r}$$

$$\sin\theta = \sin\!\left(\frac{180°}{n}\right) = \frac{\ell/2}{R}.$$

The area of the polygon is just $2n$ times the area of $\triangle OXA$:

$$\text{Area} = 2n \cdot \frac{(\ell/2)(r)}{2} = \frac{n \ell r}{2}.$$

> 💡 **Key formula:** Area of a regular $n$-gon $= \dfrac{n \ell r}{2} = \dfrac{(\text{perimeter})(\text{apothem})}{2}$.

---

## 13.4 Regular Hexagons

Regular hexagons appear enough in problems that they merit their own short section. As with many other things which come up often in problems, the main reason hexagons appear so often is that the numbers which pop up in hexagon problems are relatively simple.

> *[Figure: Regular hexagon $ABCDEF$ with center $O$, divided into 6 equilateral triangles by drawing $OA$, $OB$, $OC$, $OD$, $OE$, $OF$]*

Drawing the lines from the center $O$ of the hexagon to the vertices forms **six equilateral triangles**. (Why?) Chopping regular hexagons into 6 equilateral triangles is in general a good way to attack regular hexagons.

### Area of a Regular Hexagon

The area of a regular hexagon with side length $s$ is 6 times the area of an equilateral triangle with side length $s$:

$$[ABCDEF] = 6 \cdot \frac{s^2 \sqrt{3}}{4} = \frac{3 s^2 \sqrt{3}}{2}.$$

### Diagonals of a Regular Hexagon

We also see that the longest diagonals (like $AD$) are **twice the length of a side**.

---

### Example 13-4
*Six points are equally spaced around a circle with radius 1. What is the sum of the lengths of all possible segments formed by connecting two of the points?*

**Solution:** The six points form a regular hexagon. The center of the circle is the center of the hexagon, so the hexagon has side length 1 (since for a regular hexagon, side length equals circumradius).

The segments we can form fall into three categories:

1. **Sides:** There are **6** segments of length 1 (the hexagon's sides).
2. **Long diagonals:** There are **3** main diagonals (like $AD$, $BE$, $CF$) of length 2.
3. **Short diagonals:** There are **6** diagonals like $AC$, which we now find.

For diagonal $AC$: $\triangle ABC$ is isosceles with $\angle ABC = 120°$, so $\angle BAC = 30°$. Since $\angle FAB = 120°$, $\angle FAC = 90°$, so $\triangle CAF$ is a $30°$-$60°$-$90°$ triangle. Thus $AC = AF\sqrt{3}/... $ — using the standard ratios with $AF = 2$ (the long diagonal), we get $AC = \sqrt{3}$.

Total length:

$$6(1) + 3(2) + 6(\sqrt{3}) = \boxed{12 + 6\sqrt{3}}.$$

---

**Exercise 13-3.** The shortest diagonal of a regular hexagon has length $8\sqrt{3}$. What is the radius of the circle inscribed in the hexagon? *(MAΘ 1990)*

---

## Problems to Solve for Chapter 13

**218.** Find the number of diagonals that can be drawn in a polygon of 100 sides. *(AHSME 1950)*

**219.** Given that $ABCDEF$ is a regular hexagon with side length 6, find the area of triangle $BCE$. *(MATHCOUNTS 1986)*

**220.** Two angles of a convex octagon are congruent. Each of the other angles has a degree measure triple that of each of the first two angles. Find the degree measure of the larger angles. *(MAΘ 1990)*

**221.** Two congruent regular 20-sided polygons share a side as shown. Find the degree measure of $\angle ACB$. *(MATHCOUNTS 1992)*

**222.** An equilateral triangle and a regular hexagon have equal perimeters. If the area of the triangle is 2, find the area of the hexagon. *(AHSME 1970)*

**223.** The coplanar regular hexagons shown share the side $EF$. Given that the perimeter of quadrilateral $ABCD$ is $44 + 22\sqrt{3}$, find $EF$. *(MATHCOUNTS 1992)*

**224.** Find the area of a regular dodecagon if its circumscribed circle has a circumference of $12\pi$. *(MAΘ 1990)*

**225.** Find the ratio of the area of a circle inscribed in a regular hexagon to the area of the circle circumscribed about the same hexagon.

**226.** Let $S$ be the sum of the interior angles of a polygon $P$ for which each interior angle is 7.5 times the exterior angle at the same vertex. Find $S$. Is $P$ necessarily regular? *(AHSME 1960)*

**227.** A regular polygon with exactly 20 diagonals is inscribed in a circle. The area of the polygon is $144\sqrt{2}$. Find the area of the circle. *(MAΘ 1990)*

**228.** Twelve points are equally spaced on the circumference of a circle. How many chords can be drawn that connect pairs of these points and which are longer than the radius of the circle but shorter than its diameter? *(MATHCOUNTS 1989)*

**229.** In regular polygon $ABCDE\cdots$, we have $\angle ACD = 120°$. How many sides does the polygon have? *(MAΘ 1992)*

**230.** The numbers $1, 2, 3, \ldots, n$ are evenly spaced on the rim of a circle. If 15 is directly opposite 49, then find $n$. *(MAΘ 1987)*

**231.** Suppose a goat is tethered to a corner of a building which is in the shape of a regular $n$-gon. The length of a side of the building and length of the tether are each $r$. Find the area of the region over which the goat can graze as a function of $r$ and $n$. *(MAΘ 1992)*

**232.** Exactly three of the interior angles of a convex polygon are obtuse. What is the maximum number of sides of such a polygon? *(AHSME 1985)*

**233.** A park is in the shape of a regular hexagon 2 km on a side. Starting at a corner, Alice walks along the perimeter of the park for a distance of 5 km. How many kilometers is she from her starting point? *(AHSME 1986)*

**234.** If the sum of all the angles except one of a convex polygon is $2190°$, then how many sides does the polygon have? *(AHSME 1973)*

**235.** Find the sum of angles 1, 2, 3, 4, and 5 in the star-shaped figure shown. *(MAΘ 1987)*

> *[Figure: A 5-pointed star, with the five tip angles labeled 1 through 5]*
