# Chapter 15: Areas

In earlier chapters we discussed how to find the areas of simple figures like circles and triangles. In this chapter, we learn how to find the area of more complex figures and of simple figures in complex problems.

## 15.1 Similar Figures

On page 109, we showed that if two triangles are similar and their sides have common ratio $k$, the ratio of their areas is $k^2$. **This is true of any two similar figures.** For example, since all circles are similar, if one has a radius which is twice as large as another, its area is 4 times as large as the second. Thus, when working on a problem in which you are able to prove that two figures are similar, you can easily relate the areas of the figures.

---

### Example 15-1
*The area of a triangle is 36. Find the area of the triangle formed by connecting the midpoints of its sides.*

> *[Figure: Triangle ABC with midpoints D, E, F connected to form an inner triangle DEF]*

**Solution:** We first prove that any triangle is similar to the triangle formed by connecting the midpoints of its sides. Let $D$, $E$, $F$ be the midpoints of $BC$, $CA$, $AB$ respectively. Since $E$ and $F$ are midpoints, we have $AE/AC = AF/AB = 1/2$. Since $\angle EAF = \angle CAB$, we have $\triangle CAB \sim \triangle EAF$ from SAS Similarity. Hence $EF/CB = 1/2$. Similarly, $FD/AC = 1/2$ and $ED/AB = 1/2$. Thus, by SSS Similarity, we have $\triangle ABC \sim \triangle DEF$. Thus,

$$\frac{[DEF]}{[ABC]} = \left(\frac{1}{2}\right)^2 = \frac{1}{4}.$$

Hence $[DEF] = [ABC]/4 = \boxed{9}$.

---

### Example 15-2
*The ratio of the areas of two squares is 6. Find the ratio of the lengths of the diagonals of the two squares.*

**Solution:** Like circles, all squares are similar. Thus, the ratio of the areas is the square of the ratio of *any* corresponding lengths of the figures. Hence, the ratio of the lengths of the diagonals is the square root of the ratios of the areas, or $\boxed{\sqrt{6}}$.

---

### Example 15-3
*In trapezoid $ABCD$, $AB \parallel CD$ and the diagonals meet at $E$. If $AB = 4$ and $CD = 12$, show that the area of $\triangle CDE$ is 9 times the area of $\triangle ABE$.*

> *[Figure: Trapezoid ABCD with $AB \parallel CD$ and diagonals AC, BD meeting at E]*

**Proof:** Since $AB \parallel CD$, we have $\angle BAE = \angle DCE$ and $\angle ABE = \angle CDE$. Thus, by AA Similarity we get $\triangle ABE \sim \triangle CDE$. Since $CD/AB = 3$:

$$\frac{[CDE]}{[ABE]} = \left(\frac{CD}{AB}\right)^2 = 9. \quad \blacksquare$$

---

## 15.2 Same Base / Same Altitude

If two triangles with the **same altitude** have different bases, the ratio of their areas is just the ratio of their bases. The proof is straightforward. Given $\triangle ABC$ and $\triangle DEF$ where the altitudes $h_a$ and $h_d$ to $BC$ and $EF$, respectively, are equal:

$$[ABC] = \frac{(BC) h_a}{2}, \qquad [DEF] = \frac{(EF) h_d}{2}.$$

Thus

$$\frac{[ABC]}{[DEF]} = \frac{(BC) h_a / 2}{(EF) h_d / 2} = \frac{BC}{EF} \cdot \frac{h_a}{h_d} = \frac{BC}{EF}.$$

Similarly, if two triangles have the same **base**, the ratio of their areas is the ratio of their altitudes. (Try it.)

> 💡 **Strategy:** These facts are often used when the equal bases are *the same segment*, not just the same length. This approach is also used to show that two triangles have the same area: if they share a base (or altitude), show their altitudes (or bases) have the same length.

---

### Example 15-4
*Show that by drawing the three medians of a triangle, we divide the triangle into six regions of equal area.*

> *[Figure: Triangle ABC with all three medians drawn meeting at centroid G, dividing the triangle into six smaller regions]*

**Proof:** First we show $[ACD] = [ABC]/2$. Triangles $ACD$ and $ABC$ have the same altitude from $A$, so the ratio of their areas is the ratio of the bases $CD$ and $CB$. Since $D$ is the midpoint of $BC$:

$$\frac{[ACD]}{[ABC]} = \frac{CD}{CB} = \frac{1}{2}.$$

Now we show $[GCD] = [ACD]/3$. Since $GD$ and $AD$ are on the same line, triangles $GCD$ and $ACD$ have the same altitude from $C$. Thus the ratio of their areas is $GD/AD$. Since $G$ is the centroid, $GD/AD = 1/3$. Thus

$$[GCD] = \frac{[ACD]}{3} = \frac{[ABC]/2}{3} = \frac{[ABC]}{6}.$$

Similarly, each of the other 5 smaller triangles formed by drawing all the medians has area $[ABC]/6$. Thus, the three medians divide a triangle into 6 sections of equal area. $\blacksquare$

---

### Example 15-5
*In $\triangle ABC$, $D$ is the midpoint of $AB$, $E$ is the midpoint of $DB$, and $F$ is the midpoint of $BC$. If the area of $\triangle ABC$ is 96, then find the area of $\triangle AEF$.* *(AHSME 1976)*

> *[Figure: Triangle ABC with D the midpoint of AB, E the midpoint of DB, and F the midpoint of BC; segment AF and EF drawn]*

**Solution:** Since $\triangle ABF$ has the same altitude as $\triangle ABC$ and half the base, it has half the area: $[ABF] = [ABC]/2 = 48$.

Now, $\triangle AEF$ has the same altitude (from $F$) as $\triangle ABF$. The base of $\triangle AEF$ is $\frac{3}{4}$ that of $\triangle ABF$ (since $D$ is the midpoint of $AB$ and $E$ is the midpoint of $DB$, so $EB = AB/4$, hence $AE = 3AB/4$). Thus:

$$[AEF] = \frac{3}{4} [ABF] = \boxed{36}.$$

---

### Example 15-6
*Line $\ell$ is parallel to segment $AB$. Show that for all points $X$ on $\ell$, $[ABX]$ is the same.*

**Proof:** No matter where $X$ is on $\ell$, the altitude from $X$ to $AB$ is the same. Since $AB$ is constant, the area of $\triangle ABX$ is constant. $\blacksquare$

---

### Example 15-7
*If the diagonal $AC$ of quadrilateral $ABCD$ divides the diagonal $BD$ into two equal segments, prove that $[ACD] = [ACB]$.* *(M&IQ 1992)*

> *[Figure: Quadrilateral ABCD with diagonals meeting at midpoint X of BD; perpendicular altitudes BY and DZ from B, D to AC]*

**Proof:** As described in the problem, $X$, the intersection of the diagonals, is the midpoint of $BD$. Since $\triangle ACD$ and $\triangle ABC$ share base $AC$, we can prove equal areas if we show their altitudes to this segment are equal. Draw altitudes $BY$ and $DZ$.

Since $DX = BX$ and $\angle DXZ = \angle BXY$, we have $\triangle DZX \cong \triangle BYX$ by SA for right triangles, so $DZ = BY$. Hence

$$[ABC] = \frac{(AC)(BY)}{2} = \frac{(AC)(DZ)}{2} = [ACD]. \quad \blacksquare$$

---

## 15.3 Complicated Figures

Sometimes it is easiest to find the area of a figure by breaking it up into smaller pieces — like triangles or sectors — whose areas can be easily found. Problems involving parts of circles together with other geometric shapes can often be solved this way. Areas of complex polygons can often be found by breaking the polygon into rectangles and triangles.

### Strategy Tips

- **Draw radii** to separate sectors and circular segments from the rest of the diagram. Find the area of these regions, then the area of the rest.
- **Look out for right and equilateral triangles.** Draw additional sides to separate these triangles from the rest of the problem. This often makes the method clear.
- **Draw diagonals** of quadrilaterals to split them into two triangles whose areas can be easily found.

---

### Example 15-8
*Find the area between the two concentric circles if the circles have radii 2 and 3.*

> *[Figure: Two concentric circles of radii 2 and 3; the annulus (region between them) shaded]*

**Solution:** The larger circle has area $9\pi$ and is the sum of the smaller circle and the shaded area. The smaller circle has area $4\pi$. Thus, the shaded region has area $9\pi - 4\pi = \boxed{5\pi}$.

> The shaded region is called an **annulus**.

---

### Example 15-9
*Find the area of a regular octagon with side length 2.*

> *[Figure: A square with the four corners cut off as right isosceles triangles, leaving a regular octagon inscribed]*

**Solution:** We can form a regular octagon by cutting the corners out of a square. Let $\triangle ABC$ be one of the cut corners, with $BC = 2$ on the octagon side. Since the cut creates a $45°$-$45°$-$90°$ triangle, $AB = 2/\sqrt{2} = \sqrt{2}$. The square's side has length $2 + 2\sqrt{2}$ and area $(2 + 2\sqrt{2})^2 = 12 + 8\sqrt{2}$. Each of the 4 corners has area $(\sqrt{2})^2 / 2 = 1$, so the octagon has area

$$(12 + 8\sqrt{2}) - 4(1) = \boxed{8 + 8\sqrt{2}}.$$

---

### Example 15-10
*Find the shaded area, given that $\triangle ABC$ is an isosceles right triangle. The midpoint of $AB$ is the center of semicircle $\widehat{AB}$, point $C$ is the center of quarter circle $\widehat{AB}$, and $AB = 2\sqrt{2}$.* *(MAΘ 1990)*

> *[Figure: Isosceles right triangle ABC with semicircle on hypotenuse AB and quarter-circle centered at C; shaded region between arcs]*

**Solution:** Since $AB = 2\sqrt{2}$ and $\triangle ABC$ is isosceles right, $AC = CB = 2$ and $[ABC] = 2$. The quarter circle $\widehat{AB}$ centered at $C$ is $1/4$ of the circle of radius 2, area $= 4\pi/4 = \pi$. The semicircle on diameter $AB$ has area $(\sqrt{2})^2 \pi / 2 = \pi$.

> 🧩 **The puzzle:** We have three pieces — triangle, semicircle, quarter circle — to add or subtract to form the shaded region.

Adding the triangle and semicircle, then subtracting the quarter circle leaves the shaded region:

$$\text{shaded} = \pi + 2 - \pi = \boxed{2}.$$

---

### Example 15-11
*Given a square with side length 4 and four semicircles which have the sides of the square as their diameters, find the area of the 'leaves' which are shaded in the diagram.*

> *[Figure: Square with four semicircles drawn on each side as diameter, forming four shaded "leaf" shapes inside the square]*

**Solution:** The simple figures are 4 semicircles and a square. The shaded "leaves" are the regions where semicircles overlap.

> 💡 **Key insight:** By adding together the areas of the four semicircles, we exceed the area of the square by the total area of the desired region — because each leaf is in *two* of the semicircles. This is "overcounting" the leaves.

Hence, the area of the desired region is the total area of the four semicircles minus the area of the square:

$$4 \cdot \frac{(2)^2 \pi}{2} - 4^2 = \boxed{8\pi - 16}.$$

---

### Example 15-12
*Each of the circles shown has a radius of 6 cm. The three outer circles have centers that are equally spaced on the original circle. Find the area, in square cm, of the sum of the three regions which are common to three of the four circles.* *(MATHCOUNTS 1992)*

> *[Figure: Four overlapping circles of equal radius — one central circle and three outer circles whose centers lie on the central circle, equally spaced]*

**Solution:** Our pieces are four circles, but we can't combine them directly. We must add lines to give us more pieces.

> **Strategy:** In problems involving intersecting circles, the best lines to add are radii and lines which divide the regions of intersection in half, forming segments and sectors.

Draw $AC$ to divide one of the 'leaves' in half, and draw radii $AB$ and $BC$ of the lowest circle. Since $AC$ is also a radius of circle $A$ (which has the same radius as circle $B$), we have $AB = BC = AC$, and $\triangle ABC$ is equilateral.

Now find the area of circular segment $AC$:

- Sector $ABC$: equilateral triangle means $60°/360° = 1/6$ of circle $\Rightarrow$ area $= 36\pi/6 = 6\pi$.
- Triangle $ABC$ area: $36\sqrt{3}/4 = 9\sqrt{3}$.
- Segment area: $6\pi - 9\sqrt{3}$.

Since the three leaves consist of 6 such segments:

$$\text{Total} = 6(6\pi - 9\sqrt{3}) = \boxed{36\pi - 54\sqrt{3}}.$$

---

> Through these examples and the numerous similar problems at the end of this chapter, you should become quite adept at manipulating simple figures to find seemingly difficult areas.

---

## Problems to Solve for Chapter 15

**252.** Sides $AB$, $BC$, $CD$, and $DA$ of convex quadrilateral $ABCD$ have lengths 3, 4, 12, and 13, respectively; and $\angle CBA$ is a right angle. What is the area of the quadrilateral? *(AHSME 1980)*

**253.** Find the total area of the figure with right angles and segment measures as shown (segments of length 17, 15, 25, 25, 25). *(MAΘ 1990)*

**254.** Find the ratio of the area of an equilateral triangle inscribed in a circle to the area of a square circumscribed about the same circle. *(MAΘ 1987)*

**255.** If a square is inscribed in a semicircle of radius $r$ and the square has an area of 8 square units, then find the area of a square inscribed in a circle of radius $r$. *(MAΘ 1987)*

**256.** Points $D$, $E$, and $F$ are midpoints of the sides of equilateral triangle $ABC$. The shaded central triangle is formed by connecting the midpoints of the sides of $\triangle DEF$. What fraction of the total area of $ABC$ is shaded? *(MATHCOUNTS 1992)*

**257.** A cow is tied to the corner of a 20 foot by 15 foot shed with a 30 foot rope. Find her total grazing area. *(MAΘ 1992)*

**258.** Find the ratio of the area of $\triangle ACE$ to the area of rectangle $ABCD$. *(MATHCOUNTS 1986)*

**259.** Find the area of the largest triangle that can be inscribed in a semicircle whose radius is $r$. By inscribed in a semicircle, we mean that the vertices are either on the semicircle or the diameter cutting off the semicircle. *(AHSME 1950)*

**260.** Given hexagon $ABCDEF$ with sides of length 6, six congruent $30°$-$60°$-$90°$ triangles are drawn as in the figure. Find the ratio of the area of the smaller hexagon formed to the area of the original hexagon. *(MATHCOUNTS 1988)*

**261.** $\triangle ABC$ and $\triangle ADE$ are both equilateral with side length 4. Segment $AD$ is perpendicular to $BC$. Find the area of the region common to both triangles. *(MAΘ 1992)*

**262.** A rhombus is formed by two radii and two chords of a circle whose radius is 16 feet. What is the area of the rhombus in square feet? *(AHSME 1956)*

**263.** The square has sides of length 9 cm. The radius of the circle is 2 cm. What is the area of the shaded region? *(MATHCOUNTS 1992)*

**264.** $ABCD$ and $DEFG$ are squares of area 16. If $H$ is the midpoint of $BC$ and $EF$, then find the total area of $ABHFGD$. *(MAΘ 1987)*

**265.** Let $M$, $N$, $P$ be the midpoints of the sides $BC$, $CA$, $AB$ of triangle $ABC$ respectively. Prove that the segments $MN$, $NP$, $PM$ divide triangle $ABC$ into four triangles of equal area. *(M&IQ 1992)*

**266.** In rectangle $ABCD$, interior point $E$ is chosen at random. Prove that the sum of the areas of triangles $AEB$ and $EDC$ is the same regardless of where in $ABCD$ point $E$ is chosen. *(MAΘ 1990)*

**267.** Find the number of square units in the area of the inscribed pentagon with right angle and dimensions as shown (10, 10, 12, 16, 10). *(MATHCOUNTS 1988)*

**268.** Let $N$ be an arbitrary point on the median $CM$ of $\triangle ABC$. Prove that $[AMN] = [NMB]$ and $[ANC] = [BNC]$. *(M&IQ 1992)*

**269.** A 3-meter square and a 4-meter square overlap as shown. $D$ is the center of the 3-meter square. Find the area of the shaded region $DGFE$. *(MAΘ 1987)*

**270.** Square $ABCD$ is inscribed in a circle. Point $X$ lies on minor arc $\widehat{AB}$ such that $[XCD] = 993$ and $[XAB] = 1$. Find $[XAD] + [XBC]$. *(Mandelbrot #3)*

**271.** The convex pentagon $ABCDE$ has $\angle A = \angle B = 120°$, $EA = AB = BC = 2$ and $CD = DE = 4$. What is the area of $ABCDE$? *(AHSME 1993)*

**272.** A triangle is inscribed in a circle. The vertices of the triangle divide the circle into three arcs of lengths 3, 4, and 5. What is the area of the triangle? *(AHSME 1989)*

**273.** Point $A$ is the center of a 100 cm by 100 cm square. Find $x$, in cm, such that the shaded region has an area that is one-fifth of the area of the square. *(MATHCOUNTS 1992)*

**274.** Let $M$ be any point on diagonal $AC$ of rectangle $ABCD$. Show that $[ADM] = [AMB]$. *(M&IQ 1992)*

**275.** $ABCD$ is a square and $AE = AF = CG = CH$. Given $AB = 5$ and the shaded region is five-ninths the area of $ABCD$, find $AF$. *(MATHCOUNTS 1992)*

**276.** The medians to the legs of an isosceles triangle are perpendicular to each other. If the base of the triangle is 4, find its area. *(MAΘ 1990)*

**277.** The curved paths are arcs of circles centered at vertices $A$ and $B$ of a square of side 6. Find the area of the shaded section. *(Mandelbrot #3)*

---

## The Big Picture

> We have seen here how to calculate the areas of many kinds of plane figures, but without fail they are made up only of straight lines and circular arcs. One of the great accomplishments of **calculus** (which you will get to in a few years) is enabling us to find the areas of a great many other figures.
>
> For example, consider a river in which the amount of water flowing past a given point at time $t$ is given by, say, $f(t) = t(1 - t)$. How could we find the total amount of water which flowed by between times $t = 0$ and $t = 1$?
>
> If we plot the graph of the function $x(1 - x)$ on a set of coordinate axes, then the total flow will equal the area between the curve and the $x$-axis. Do you see why? Think about the same problem, but with a constant flow $f(t) = 17$ or a linearly increasing flow $f(t) = t$. Then the areas we are concerned with are just areas of a rectangle or triangle. In the real problem, however, the area is more complicated.
>
> So how does calculus endeavor to find this area (which, incidentally, was called by Isaac Newton the "Flowing Quantity" of a "fluxion" and is today called the **integral** of a function)? **By breaking it up into little rectangles!** Unable to find anything better for such a complicated figure, in calculus we just let the rectangles get smaller and smaller, and put together more and more of them, until we approximate the true curve very well. Calculus is extremely interesting in the ways it builds up complex ideas from simple rectangles and straight lines. (And it's not as hard as people make it out to be.)
