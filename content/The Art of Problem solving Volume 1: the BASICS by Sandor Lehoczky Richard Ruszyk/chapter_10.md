# Chapter 10: Angles

## 10.1 Lines, Rays, and Segments

A straight path drawn from one point to another is called a **segment**. The two points are called **endpoints**, and the point on the segment which is exactly between the endpoints is the **midpoint**. Segments are sometimes denoted with a bar, as in $\overline{AB}$, but it is easier to just write $AB$. When written in an equation, $AB$ is the length of the segment, which is the distance from one endpoint to the other.

If we continue our straight path past an endpoint and go on forever in that direction, we form a **ray**, which is denoted $\overrightarrow{CD}$. The endpoint from which the path starts, the **origin**, is always written first. If we continue the path in both directions, we form a **line**, which is written $\overleftrightarrow{EF}$.

Any two points can be used to determine a line. If three or more points are on the same line, they are **collinear**. Given three points $A$, $B$, and $X$ on a segment as shown at left, $AX + XB = AB$. (Why?)

```figure-spec
id: fig-10-1-segments-rays-lines
caption: A segment AB, a ray CD, and a line EF, drawn vertically stacked.
elements:
  - point A (left), point B (right), drawn as a horizontal segment with both endpoints marked as filled dots; label "A" above-left of A, "B" above-right of B
  - point C (left), point D (mid-right), drawn as a ray with C as filled dot origin and arrowhead extending past D to the right; label "C" above-left of C, "D" above-right of D
  - point E (left-of-center), point F (right-of-center), drawn as a line with arrowheads on BOTH ends; both points marked as filled dots; label "E" above E, "F" above F
layout: three small horizontal diagrams stacked vertically, right-side margin of section
render_hint: SVG with thin black strokes, ~1.5px arrowheads
```

```figure-spec
id: fig-10-2-collinear-segment
caption: Three collinear points A, X, B on a segment, where X lies between A and B.
elements:
  - horizontal segment from point A (left) to point B (right)
  - point X on the segment, positioned roughly 60% from A to B
  - all three points drawn as filled dots
  - labels "A", "X", "B" below their respective points
render_hint: SVG, single horizontal line
```

## 10.2 Classification and Measurement

Two rays which share an origin form an **angle** and the rays are the **sides** of the angle. The common origin is called the **vertex** of the angle. If we consider a circle centered at the vertex, as shown below, we say that the angle **subtends** the arc it cuts off. An angle is denoted by the $\angle$ symbol, as in $\angle AOB$. (The vertex always goes in the middle.) When there is only one angle with the given vertex, we can use just the vertex to name the angle, as in $\angle O$.

We measure angles as the fraction of a circle, centered at the vertex of the angle, which the angle cuts off. A circle has 360 degrees, so if the angle cuts off one-quarter of the circle, it is $90°$. The number of degrees in a circle is rather arbitrary. We could have just as well chosen 100 or 50, but 360 was chosen because it is evenly divisible by many more numbers than 100. For example, we often encounter angles which are one-third or one-sixth of a circle. If a circle were 100 degrees, we'd have to call these $100/3$ and $50/3$ degree angles rather than $120°$ and $60°$.

```figure-spec
id: fig-10-3-angle-subtending-arc
caption: An angle AOB with vertex O, subtending an arc on a circle centered at O.
elements:
  - circle centered at point O
  - two rays from O: one going to point A (upper-left of circle), one going to point B (upper-right of circle); both rays terminate at the circle
  - point A labeled outside upper-left of circle, point B outside upper-right, point O labeled at center
  - the arc from A to B (the minor arc, on the far side from O's label) drawn slightly thicker or highlighted to indicate the subtended arc
render_hint: SVG, circle with two radii, subtended arc emphasized
```

Portions of a degree are often measured in "minutes" and "seconds". As you may have guessed, there are 60 minutes in a degree and 60 seconds in a minute. Thus, an angle with measure $0.5°$ has a measure of 30 minutes. An angle of 20 degrees, 10 minutes, and 5 seconds is written $20°10'5''$.

Another more natural way of measuring angles is by **radians**. Just like there are $360°$ in a circle, there are $2\pi$ radians in a circle. Thus

$$\frac{360°}{2\pi} = 1.$$

We can use this as a conversion factor (see page 31) to convert degrees to radians and vice versa.

> **EXAMPLE 10-1** &nbsp; How many degrees are in $\frac{\pi}{3}$ radians and how many radians are in $135°$?
>
> *Solution:* We can multiply $\pi/3$ by the conversion factor to get
>
> $$\left(\frac{\pi}{3}\right)\left(\frac{360°}{2\pi}\right) = \frac{360°}{6} = \mathbf{60°}.$$
>
> Similarly,
>
> $$(135°)\left(\frac{2\pi}{360°}\right) = 2\pi\left(\frac{135°}{360°}\right) = \mathbf{\frac{3\pi}{4}}.$$

> **EXAMPLE 10-2** &nbsp; Write $20\frac{5}{9}°$ in terms of minutes and seconds.
>
> *Solution:* In $5/9$ of a degree, there are $(5/9)(60) = 33\frac{1}{3}$ minutes. In $1/3$ of a minute, there are $(1/3)(60) = 20$ seconds. Thus, $20\frac{5}{9}° = \mathbf{20°33'20''}$.

If we write the measure of an angle in a diagram, we write it by the vertex on the inside of the angle, as in the figure below.

Ninety degree angles are called **right** angles, and any two lines which form a right angle are said to be **perpendicular** or **orthogonal**. If $AB$ and $CD$ are perpendicular, we write $AB \perp CD$. Right angles are usually indicated in diagrams by a little box as shown in the right angle below. Angles which are less than $90°$ are called **acute** angles. An angle which is greater than 90 degrees but less than $180°$ is **obtuse**, and any angle of over 180 degrees is a **reflex** angle. A **straight angle** is just a straight line and has $180°$.

```figure-spec
id: fig-10-4-angle-types
caption: Three angle classifications side-by-side — acute (48°), right, and obtuse.
elements:
  - first diagram: two rays meeting at a vertex forming an acute angle; angle measure "48°" labeled inside; label "acute" below
  - second diagram: two rays meeting at a vertex forming a right angle (one horizontal, one vertical); small square in the corner indicating right angle; label "right" below
  - third diagram: two rays meeting at a vertex forming an obtuse angle (clearly greater than 90° but less than 180°); label "obtuse" below
layout: three diagrams arranged horizontally, equally spaced
render_hint: SVG, consistent stroke weight across all three
```

Two angles whose sum is $90°$ are called **complementary angles**, and angles whose sum is $180°$ are **supplementary angles**. Angles are often named with Greek letters; most often $\theta$, sometimes $\phi$, $\alpha$, $\beta$, or $\gamma$.

Consider the intersection of lines $l$ and $m$ in the figure. Since a line has $180°$, angles $\alpha$ and $\beta$, which together form a line, are supplementary. Thus $\alpha + \beta = 180°$. Similarly, $\alpha + \theta = 180°$, so $\theta = \beta$. These angles are called **vertical angles**, and as we see, vertical angles are always equal to each other. In the diagram, $\phi$ and $\alpha$ are also vertical angles so $\phi = \alpha$.

```figure-spec
id: fig-10-5-vertical-angles
caption: Two intersecting lines l and m forming four angles labeled θ, α, φ, β around the intersection point.
elements:
  - two lines crossing at a single point, neither horizontal nor vertical (slight diagonals so all four angles are visible)
  - four angles labeled at the intersection: θ (top), α (right), β (bottom), φ (left) — going clockwise; θ and β are vertical angles (equal), α and φ are vertical angles (equal)
  - line labels "l" and "m" near the ends of each line
render_hint: SVG, two diagonal lines, Greek letter labels in italic
```

## 10.3 Angles and Parallel Lines

**Parallel lines** are lines that are in the same plane and never intersect. Thus, two parallel lines are always the same distance apart. In the figure, lines $l$ and $m$ are parallel; this is written $l \parallel m$. Line $n$ is a **transversal**. Angles $\alpha$ and $\beta$ are called **alternate interior angles**, and they are equal. Since $\gamma$ and $\alpha$ are vertical angles, they are equal, so $\alpha = \beta = \gamma$. The pair $\gamma$ and $\beta$ are called **corresponding angles**. Also, $\theta$ and $\beta$ together form a straight line and thus are supplementary. Since $\beta = \alpha$, we find that $\theta$ and $\alpha$ are also supplementary. The angles $\theta$ and $\alpha$ are sometimes called **same-side interior angles**.

```figure-spec
id: fig-10-6-parallel-transversal
caption: Two parallel lines l and m cut by a transversal n, with four angles labeled at the intersection points.
elements:
  - two horizontal parallel lines, l on top and m on bottom, both with labels at the left end
  - a transversal line n cutting through both, slanting from upper-right to lower-left, label "n" at the top-right
  - at the intersection of n with l: angles labeled β (lower-left of intersection) and θ (lower-right of intersection)
  - at the intersection of n with m: angles labeled α (upper-right of intersection) and γ (lower-right of intersection)
  - α and β are alternate interior angles (between the parallel lines, on opposite sides of n)
render_hint: SVG, parallel lines with arrow markers indicating parallelism, italic Greek labels
```

Sometimes diagrams get so complex that it would be nice to have a convenient way to mark equal angles. This is done by drawing a small arc inside the angle near the vertex of each of the equal angles. Any angle which has one such arc inside it is equal to all the others which have one such arc inside. Similarly, if we have another set of equal angles which are not equal to the set with one arc, we draw two arcs inside the angles.

Whenever you see a pair of vertical angles, a pair of corresponding angles, or a pair of alternate interior angles, mark them as equal in your diagram. The most important skill in solving geometry problems is making good diagrams. The first step in any problem is to draw the picture as accurately as possible. Then throughout the problem, keep the picture accurate by marking equal angles and equal lengths. Equal lengths are marked somewhat like equal angles; any two segments which have the same length get a tick mark. If another set of segments are all equal, they get two tick marks, and so on.

```figure-spec
id: fig-10-7-marking-equal-angles
caption: A parallelogram-like quadrilateral with opposite angles marked as equal using small arc symbols.
elements:
  - a parallelogram (slanted)
  - the two acute angles (at opposite vertices) each marked with a single small arc inside
  - the two obtuse angles (at the other two opposite vertices) each marked with double small arcs inside
  - opposite sides marked with tick marks: top and bottom sides each with a single tick, left and right sides each with double ticks
render_hint: SVG, demonstrative diagram for marking conventions
```

The following two examples are proofs of *very* important facts which are among the most important tools in solving problems involving angles.

> **EXAMPLE 10-3** &nbsp; Prove that the sum of the angles of a triangle is always $180°$.
>
> *Proof:* Read this proof closely — it is not simple. The usefulness of cleverly adding a parallel line to a diagram cannot be overestimated. When standard techniques fail, look for a good place to draw an extra parallel line. Parallel lines form many pairs of equal angles, which can often be used to complete the problem.
>
> In the figure, line $l$ is drawn through $C$ parallel to side $AB$ of triangle $ABC$. As alternate interior angles, we have $\angle BAC = \angle ACE$ and $\angle ABC = \angle BCD$. Since $\angle ACB$, $\angle ACE$, and $\angle BCD$ together make up a straight line, we get $\angle ACE + \angle ACB + \angle BCD = \alpha + \beta + \gamma = 180°$. Thus, the sum of the angles in a triangle is always $180°$.

```figure-spec
id: fig-10-8-triangle-angle-sum
caption: Triangle ABC with line l drawn through C parallel to side AB, used to prove the angle sum is 180°.
elements:
  - triangle ABC with A at lower-left, B at lower-right, C at top
  - angle at A labeled α, angle at B labeled β, angle at C labeled γ (γ is between sides CA and CB, the interior angle)
  - line l drawn horizontally through C, parallel to side AB
  - point E marked on line l to the left of C, point D marked on line l to the right of C
  - at vertex C on line l: the angle to the left of CA (between CE and CA) labeled α (alternate interior with angle at A), the angle between CA and CB is γ, the angle to the right of CB (between CB and CD) labeled β (alternate interior with angle at B)
render_hint: SVG, triangle with extended construction line
```

> **EXAMPLE 10-4** &nbsp; **Exterior Angle Theorem.** If we continue a side of a triangle past a vertex as in the diagram, we form an **exterior angle** of the triangle, like $\theta$ in the figure below. The interior angles of the triangle which are not adjacent to the exterior angle are called **remote interior angles**. (In the diagram, $\alpha$ and $\beta$ are remote interior angles.) Prove that any exterior angle of a triangle is the sum of the remote interior angles.
>
> *Proof:* From the triangle we find $\alpha + \beta + \gamma = 180°$, and since $\gamma$ and $\theta$ make up a straight line, $\gamma + \theta = 180°$. Combining these gives $\alpha + \beta + \gamma = \gamma + \theta$, so $\alpha + \beta = \theta$. That is, the measure of an exterior angle of a triangle is the sum of the two remote interior angles.

```figure-spec
id: fig-10-9-exterior-angle
caption: A triangle with one side extended past a vertex, forming exterior angle θ supplementary to interior angle γ.
elements:
  - triangle with three vertices; the bottom-left vertex's interior angle labeled α, the top vertex's interior angle labeled β, the bottom-right vertex's interior angle labeled γ
  - the bottom side of the triangle extended to the right past the bottom-right vertex
  - the angle between the extension and the right side of the triangle (exterior to γ) labeled θ
  - α and β are the remote interior angles relative to θ
render_hint: SVG, triangle with one side extended as a dashed or solid ray
```

> **EXERCISE 10-1** &nbsp; Let $\alpha$, $\beta$, and $\gamma$ be the exterior angles of angles $\angle A$, $\angle B$, and $\angle C$ of $\triangle ABC$. Show that $\alpha + \beta + \gamma = 360°$.

## 10.4 Arcs, Segments, Sectors, and Angles

We can use our understanding of angles and the circumference and area of a circle to find the areas of sectors and circular segments.

Arcs can be measured by their length or by the measure of the angle from the center of the circle which cuts off the arc, as $\angle AOB$ cuts off arc $AB$ in the figure. As you can see below, the measure of an arc can be denoted by writing the value beside the arc in the figure.

```figure-spec
id: fig-10-10-arc-sector
caption: Circle with center O and a sector AOB defined by central angle θ; chord AB shown.
elements:
  - circle centered at point O (labeled at center)
  - two radii OA and OB drawn from O to points A (upper-left of circle) and B (lower-left of circle)
  - the central angle ∠AOB at O labeled θ (with angle arc inside)
  - chord AB drawn between A and B (forming the segment region)
  - the arc from A to B (the minor arc, on the left side) is the subtended arc; optionally label it θ as well to indicate arc measure equals central angle
render_hint: SVG, clear distinction between arc, chord, and central angle
```

The ratio of the measure of the arc to the measure of the circle, $2\pi$ radians, equals the ratio of the length of the arc to the circumference of the circle. Letting $r$ be the radius of the circle, we have

$$\frac{\widehat{AB}}{2\pi r} = \frac{\theta}{2\pi},$$

or $\widehat{AB} = r\theta$, where $\theta$ is in radians.

The angle $\theta$ which cuts off a sector cuts off an area equal to $\theta/2\pi$ of the area of the entire circle. The area of sector $AOB$ is thus

$$\left(\frac{\theta}{2\pi}\right)(\pi r^2) = \frac{r^2\theta}{2}.$$

The area of circular segment $AB$ is the area of sector $ABO$ minus the area of triangle $ABO$. (Methods for finding the area of a triangle are presented on page 109.)

## 10.5 Angles Formed By Lines Intersecting a Circle

We've already seen how angles can be measured by the arcs they cut off of circles centered at the vertex of the angle. Such an angle is called a **central angle**. We will now consider angles formed by chords, tangents, and secants. For now we won't prove these relations, but we'll come back to the proofs later.

**1. Angles formed by two chords with a common endpoint.**

Such an angle is called an **inscribed angle**, and its measure is one-half of the arc it intercepts:

$$\angle ABC = \frac{\widehat{AC}}{2}.$$

```figure-spec
id: fig-10-11-inscribed-angle
caption: Inscribed angle ABC in a circle, with vertex B on the circle and chords BA and BC subtending arc AC.
elements:
  - circle
  - point B on the lower-left of the circle (vertex of the inscribed angle)
  - point A on the upper-right of the circle, point C on the lower-right of the circle
  - chords BA and BC drawn (forming the inscribed angle at B)
  - the intercepted arc AC is the arc from A to C not containing B (the right side)
render_hint: SVG, circle with two chords meeting at a point on the circle
```

**2. Angles formed by two secants which intersect outside the circle.**

The measure of such an angle is equal to one-half the difference of the arcs intercepted by the secants:

$$\angle BAC = \frac{\alpha - \beta}{2}.$$

The angle between two tangents from a point to a circle, or between a tangent and a secant, can also be found from the arc measures as shown above.

```figure-spec
id: fig-10-12-two-secants-external
caption: Two secants from external point A intersect a circle, forming angle BAC; the far arc has measure α and the near arc has measure β.
elements:
  - circle on the right
  - external point A on the left, outside the circle
  - two secants from A, each cutting the circle at two points; the upper secant passes through points (entry, B) where B is the far intersection (top-right of circle); the lower secant passes through points (entry, C) where C is the far intersection (bottom-right of circle)
  - the far arc BC (between B and C, on the right side of circle, far from A) labeled α
  - the near arc (between the near intersection points of the two secants, on the left side of circle, near A) labeled β
  - the angle at A between the two secants labeled (implied) ∠BAC
render_hint: SVG, two lines from external point through circle
```

**3. Angles formed by a tangent and a chord.**

This angle is one-half the arc it cuts off:

$$\angle ABC = \frac{\theta}{2}.$$

```figure-spec
id: fig-10-13-tangent-chord-angle
caption: A tangent line at point B with a chord BC, forming an angle whose measure is half the intercepted arc θ.
elements:
  - circle
  - tangent line touching the circle at point B (B is at the bottom of the circle, tangent is horizontal)
  - point A on the tangent line to the left of B (defining ray BA along the tangent)
  - point C on the upper-right of the circle
  - chord BC drawn
  - the angle ∠ABC (between the tangent ray BA and the chord BC) is the "tangent-chord angle"
  - the arc from B to C (going up the right side of the circle, the intercepted arc) labeled θ
render_hint: SVG, circle with tangent line and chord
```

**4. Angles formed by two chords.**

The angle formed by two chords is one-half the sum of the intercepted arcs:

$$\theta = \frac{\alpha + \beta}{2}.$$

```figure-spec
id: fig-10-14-two-chords-internal
caption: Two chords intersecting inside a circle, forming angle θ; the arcs cut off opposite to θ measure α and β.
elements:
  - circle
  - two chords intersecting at a point inside the circle
  - the angle θ at the intersection point (one of the four angles formed; the one opening toward arcs α and β)
  - arc α opposite to θ (cut off by the two endpoints of the chords on one side)
  - arc β on the opposite side, vertical to α relative to θ
render_hint: SVG, circle with X-shaped chord intersection inside
```

The application of these angle properties is in general very straightforward. When you see an angle cutting off arcs in any of the above manners, you can immediately apply the corresponding relation. The following examples and exercises display the use of these principles.

> **EXAMPLE 10-5** &nbsp; Show that any inscribed angle which subtends a semicircular arc is a right angle.
>
> *Proof:* Since the angle cuts off a $180°$ arc, its measure is $180°/2 = 90°$. Thus, the angle is right. An angle which cuts off a $180°$ arc is said to be inscribed in the semicircle formed by the arc.

> **EXAMPLE 10-6** &nbsp; Show that any diameter drawn from the point of tangency of a tangent line $l$ is perpendicular to the line.
>
> *Proof:* In the diagram, $\angle CAB$ is formed by a tangent and a chord and hence its measure is half that of the arc it cuts off. Since the chord is a diameter, the arc is half the circle, so $\angle CAB = 180°/2 = 90°$. Thus, $AO \perp l$.

```figure-spec
id: fig-10-15-diameter-tangent
caption: A circle with center O, diameter AB, point C on the circle, and tangent line l at A perpendicular to AB.
elements:
  - circle with center O (labeled)
  - horizontal diameter from A (left) to B (right) passing through O
  - point C on the upper portion of the circle
  - chord AC drawn (this is a diameter from A actually no, just a chord from A to C — but proof references CAB, where AB is the diameter)
  - tangent line l drawn vertically through A, labeled "l" near the bottom
  - small right-angle marker at A between line l and diameter AB
render_hint: SVG, horizontal diameter with vertical tangent at left endpoint
```

> **EXERCISE 10-2** &nbsp; Points $A$, $B$, $Q$, $D$, and $C$ lie on the circle as shown and the measures of arcs $\widehat{BQ}$ and $\widehat{QD}$ are $42°$ and $38°$ respectively. What is the sum of angles $P$ and $Q$? *(AHSME 1971)*

```figure-spec
id: fig-10-16-exercise-10-2
caption: Five points A, B, Q, D, C on a circle with external point P forming intersecting secants/chords.
elements:
  - circle on the right
  - five points on the circle: A (upper-left), B (top), Q (right), D (lower-right), C (lower-left)
  - external point P on the left
  - lines from P through the circle creating chords/secants connecting these points; specifically, line through A and D, line through B and C, and chord BD or similar — based on standard AHSME 1971 figure: P is outside, secants PAB and PCD intersect circle, with chord BD
  - arcs BQ (42°) and QD (38°) on the right portion of the circle
render_hint: SVG, exact construction matches AHSME 1971 problem; verify against original on rerender
```

> **EXERCISE 10-3** &nbsp; Segments $PA$ and $PT$ are tangent to the circle. Find the measure of $\angle TXA$ if $\angle P = 42°$. *(MAΘ 1990)*

```figure-spec
id: fig-10-17-exercise-10-3
caption: Two tangents PA and PT from external point P touch a circle at A and T; X is a point on the circle.
elements:
  - circle on the right
  - external point P on the left
  - two tangent segments from P: one to point A (lower-right of circle, point of tangency), one to point T (upper-right of circle, point of tangency)
  - point X on the circle (likely on the major arc TA, the far side from P)
  - the angle at P between the two tangents is 42°
  - the inscribed angle ∠TXA is what we want
render_hint: SVG, two tangents from external point with inscribed angle on far arc
```

> **EXAMPLE 10-7** &nbsp; In the figure, if $\widehat{AB} = 60°$ and $\widehat{DE} = 40°$, then what is $\angle ACD$?
>
> *Solution:* Since $\angle ACB$ is one-half the sum of $\widehat{AB}$ and $\widehat{DE}$, we have $\angle ACB = 50°$. Since $\angle ACD + \angle ACB = 180°$, we find $\angle ACD = \mathbf{130°}$.

```figure-spec
id: fig-10-18-example-10-7
caption: Two chords intersecting inside a circle at C, with arcs AB = 60°, DE = 40°, and another arc D = 40° labeled.
elements:
  - circle
  - five points on circle: A, B, D, E (and a point providing the other endpoint of each chord)
  - two chords intersecting at interior point C
  - arc AB labeled 60° on top
  - arc DE labeled 40° on right (with D at upper-right showing "40°")
  - arc with measure 60° at bottom labeled appropriately
  - intersection at C inside circle
render_hint: SVG, classic two-chord intersection diagram with arc labels
```

> **EXAMPLE 10-8** &nbsp; In the figure, given that $\angle ABC = 60°$ and $\angle BCD = 70°$, find $\angle CBD$.
>
> *Solution:* We know that $\angle CBD$ is one-half $\widehat{CD}$, but we don't know what $\widehat{CD}$ is. We can also find $\angle CBD$ by finding the other two angles of $\triangle CBD$ and subtracting their sum from $180°$. We already have $\angle C$, and $\angle D$ is one-half $\widehat{BC}$. Since $\widehat{BC} = 2\angle ABC = 120°$, we have $\angle D = 60°$, and $\angle CBD = 180° - \angle C - \angle D = \mathbf{50°}$.

```figure-spec
id: fig-10-19-example-10-8
caption: Triangle inscribed in a circle with vertices A, B, C, D involved; ∠ABC = 60° at B and ∠BCD = 70° at C.
elements:
  - circle
  - four points on circle: A (left), B (lower-right with angle 60° marked at B between BA and BC), C (upper-right with angle 70° marked at C between CB and CD), D (lower-right of C)
  - chords AB, BC, CD, BD drawn
  - inscribed angles labeled at vertices B (60°) and C (70°)
render_hint: SVG, inscribed quadrilateral arrangement
```

In this example we have an instance of the general result that an angle formed by a tangent and a chord ($\angle ABC$ above) is equal to any inscribed angle which cuts off the same arc as the chord ($\angle D$ above).

As you proceed to more advanced problem solving, the most subtle and important result in this section is that any two inscribed angles which subtend the same arc are equal. For example, in the figure we have

$$\angle A = \angle B \quad \text{and} \quad \angle C = \angle D.$$

```figure-spec
id: fig-10-20-equal-inscribed-angles
caption: Two pairs of inscribed angles in a circle subtending the same arcs, demonstrating equality.
elements:
  - circle
  - four points on circle: A (upper-left), B (left), C (upper-right), D (lower-right)
  - inscribed angle at A subtending arc CD (from A, lines drawn to C and D)
  - inscribed angle at B subtending arc CD (from B, lines drawn to C and D) — these are equal
  - inscribed angle at C subtending arc AB
  - inscribed angle at D subtending arc AB — these are equal
render_hint: SVG, circle with inscribed quadrilateral and crossing chords
```

While the other relations have fairly obvious applications, equal inscribed angles can be cleverly hidden in a problem. This is one of the most common methods of showing that two angles are equal. If you are ever asked to show the equality of two angles whose sides intersect, as angles $A$ and $B$ do at points $C$ and $D$ above, check to see if there is a circle that passes through the vertices of the angles and the two intersection points. If such a circle exists, then the two angles are equal; it's that simple!

If the two angles you are trying to prove equal share a vertex or a side, or if their sides don't intersect, then inscribed angles is not the best immediate method to use, because no such circle will exist. (Why? Draw these cases and see.) We point this out because it is as important to know which methods *not* to try as it is to know which methods to try. Keep in mind, however, that sometimes you will have to get creative; the cut-and-dried methodology won't always work. (And would math be fun if it did?)

> **EXAMPLE 10-9** &nbsp; The two circles in the figure are tangent at $G$. Prove that $\angle E = \angle F$.
>
> *Proof:* The two angles are not related to each other at all, so it seems we cannot use any of the above relations. Thus, we start where we should always start on geometry problems involving angles: finding angles we know are equal. Since $\angle AGB$ and $\angle DGC$ are vertical angles, they are equal. Since $\angle F$ and $\angle DGC$ are inscribed angles which subtend the same arc, they are equal. Finally, $\angle E = \angle AGB$ because they are inscribed angles subtending the same arc. Thus
>
> $$\angle E = \angle AGB = \angle DGC = \angle F.$$

```figure-spec
id: fig-10-21-example-10-9-tangent-circles
caption: Two circles tangent internally or externally at point G, with inscribed angles E and F in respective circles.
elements:
  - two circles tangent to each other at point G (point of tangency); G is a single shared point
  - in the left/smaller circle: points A and B on the circle, plus E inside the circle as the vertex of an inscribed angle
  - in the right/larger circle: points C, D, F on the circle, where F is the vertex of an inscribed angle
  - chord through G in each circle: AGD or similar configuration where lines through G cross both circles
  - inscribed angle ∠E in left circle subtending arc AG
  - inscribed angle ∠F in right circle subtending arc DG
  - vertical angles ∠AGB and ∠DGC at the point of tangency G
render_hint: SVG, two tangent circles with crossing transversals through tangent point
```

This is an example of a problem where it is very useful to mark equal angles as discussed on page 86.

## 10.6 The Burden of Proof

Now that we have demonstrated the many relationships between angles and circles, we will prove these relations. The importance of this section is not so much the proofs themselves, but the many valuable techniques which they demonstrate.

If you do not know anything about isosceles triangles, read about them on page 93 before returning to these proofs.

### Proofs of the formulas relating angles and arcs

**1. Inscribed angles.**

We must relate the arc measure to something we know, and the only thing we know about the arc is that it equals the central angle that subtends it. Thus, to prove our formula, we must show that $\phi = 2\theta$ in the diagram. Looking at our diagram, we see that by connecting $A$ and $B$ we form two triangles, $\triangle ABC$ and $\triangle BOA$. We then label all the angles we form as shown. Since a triangle has $180°$, we have

$$\theta + x + y + z = \phi + z + w + y = 180°.$$

Another important thing to remember in problem solving is to think about what is special about every restriction placed on the problem. In this problem, we are dealing with triangles formed by the center and points on a circle. Any triangle formed by two radii and a chord, such as $\triangle BOA$, is isosceles, and isosceles triangles give us equal angles. For example, from $\triangle AOB$ we have $\angle OAB = \angle OBA$, so $y = z + w$. Just $\triangle BOA$ and $\triangle ABC$ are not enough to finish this problem, because substituting $z + w = y$ in our original equation gives

$$\theta + x + y + z = \phi + 2y = 180.$$

This clearly doesn't quite get us to $\phi = 2\theta$. We must find something else. This brings us to another geometry problem solving technique: cleverly adding lines to the diagram. We've already done this once by drawing $AB$ to complete the two triangles. Looking at the figure, you should see that the line that's begging to be added is $OC$. Adding that to our diagram gives us the diagram below.

```figure-spec
id: fig-10-22-inscribed-angle-proof-setup
caption: Circle with center O, inscribed angle at C subtending arc AB; chord AB drawn, forming triangles ABC and BOA; angles labeled.
elements:
  - circle with center O (lower-center)
  - point C at top of circle (vertex of inscribed angle φ subtending arc AB)
  - point A on lower-left of circle
  - point B on lower-right of circle
  - inscribed angle at C labeled φ (between chords CA and CB)
  - chords CA, CB, AB drawn
  - radii OA, OB drawn (forming isosceles triangle BOA)
  - central angle at O labeled θ (between OA and OB)
  - inside triangle: angles labeled — at C, the angle is split into x (toward A) and y (toward B); at the intersection or B side, angles z and w as in proof
  - specific labeling: x = ∠OCA portion, y = ∠OCB portion (after drawing OC), and z, w on other sides
render_hint: SVG, circle with inscribed angle, chord AB, and central radii — angle labels x, y, z, w, θ, φ in respective positions per AoPS proof
```

In this picture, we see that the addition of $OC$ gives us more isosceles triangles, and therefore more equal angles. First, from $\triangle AOC$ we have $AO = OC$, so $x = \theta + v$. This makes our equation

$$2\theta + v + z + y = \phi + 2y = 180.$$

We see from this that if we can show that $v + z = y$, then we will be able to show that $\phi = 2\theta$. (Make sure you understand why: substitute $v + z = y$ in the above and get $2\theta + 2y = \phi + 2y$, so $\phi = 2\theta$.)

This shows us yet another powerful tool: working backwards. We look at what we know ($2\theta + v + z + y = \phi + 2y = 180$) and what we want ($\phi = 2\theta$) and see what we must prove to get from one to the other ($v + z = y$).

Working backwards again, we know that $z + w = y$, so if we can show that $w = v$, we are done. From isosceles triangle $BOC$ we get $OC = OB$, so $v = w$. Thus, $z + w = z + v = y$, so $2\theta + v + z + y = 2\theta + y + y = 2\theta + 2y$. Hence, our equation is now

$$2\theta + 2y = \phi + 2y = 180.$$

Thus $\phi = 2\theta$, and our proof is complete. Or is it? Whenever you complete a proof, you must make sure that your proof covers all cases and makes no assumptions that are not a part of the problem. If we look at the very first diagram, we see that we made the assumption that the center of the circle lies outside $\angle ACB$. This, of course, is not always true, but our proof is only valid for those cases in which it is. In order for our proof to be **rigorous**, meaning to be complete and make no assumptions, we must prove the formula for the cases where the center of the circle is inside and on a side of the angle. The proofs are almost exactly like the one we've done. Try to do these on your own.

Don't let this proof scare you; it really isn't nearly as long as it looks. It only looks long because we've added a lot of comments. The proof itself is quite short.

**2. Angles formed by two secants.**

In the figure, we add line $DC$ because not only does this form a triangle, $\triangle ADC$, but also it forms two inscribed angles, $\angle ACD$ and $\angle BDC$, each of which subtends an arc in the formula we wish to prove. Since $\angle A$ is in $\triangle ADC$, we can find its measure by finding the measure of the other two angles in the triangle. (Yes, this is another one of those "proof techniques" we've been telling you about. You've seen this one before, and you'll see it again. And again.)

```figure-spec
id: fig-10-23-two-secants-proof
caption: Two secants from external point A, with auxiliary chord DC drawn to create triangle ADC for the proof.
elements:
  - circle on the right
  - external point A on the left
  - upper secant from A entering circle at D (near intersection) and exiting at B (far intersection, top of circle)
  - lower secant from A entering at — second secant cutting circle at two points, with C as the far-side intersection (bottom of circle) and another point as near intersection
  - auxiliary chord DC drawn (connects D on upper secant to C on lower secant)
  - angle at A labeled α (between the two secants)
  - arc β between the near intersection points (cut off near A)
  - inscribed angles ∠ACD and ∠BDC marked or implicitly used in proof
render_hint: SVG, secant configuration matching AoPS proof figure
```

As inscribed angles, $\angle DCA = \alpha/2$ and $\angle BDC = \beta/2$.

Angles $CDB$ and $CDA$ form a line and thus are supplementary, so

$$\angle CDA = 180° - \angle CDB = 180° - \frac{\beta}{2}.$$

Thus, $\angle A = 180° - \angle CDA - \angle DCA = 180° - \left(180° - \frac{\beta}{2}\right) - \frac{\alpha}{2} = \frac{\beta - \alpha}{2}.$

**3. Angle formed by a tangent and a chord.**

Once again we must add a line. This is a little tricky because it's not so obvious where to add the extra line. We could connect the endpoints of the chord to the center of the circle, but this approach won't get us too far without using what we know about radii being perpendicular to tangents. Since we use what we are trying to prove to show that radii are perpendicular to tangents, we cannot use that fact in this proof or we will be guilty of circular reasoning (see page 259). Do you see why?

We can also connect $B$ to some point on the tangent. Connecting it to $D$ doesn't seem helpful (draw it and see for yourself), but connecting it to $C$ gives us a couple of familiar things. First, we have an angle formed by a secant and a tangent, $\angle ACB$, which subtends an arc in the formula we wish to prove. Second, we have an inscribed angle, $\angle ABC$.

```figure-spec
id: fig-10-24-tangent-chord-proof
caption: Tangent line at A with chord AB; auxiliary line from B to point C creates inscribed angle ABC and external angle ACB for the proof.
elements:
  - circle
  - tangent line at point A (A is bottom of circle); points D (on tangent to the left of A) and the rest of tangent extending to the right
  - chord AB from A to B (B on upper-right of circle)
  - point C added on the tangent line (or as external point) — based on AoPS proof, C is such that BC creates a secant
  - angle θ is the arc AB cut off
  - inscribed angle ∠ABC marked
  - angle φ on the diagram (between tangent and another reference)
render_hint: SVG, tangent-chord configuration with auxiliary construction line
```

Since $\angle DAB$ is an exterior angle of $\triangle CAB$, it is the sum of $\angle ACB$ and $\angle ABC$. (If you forgot about exterior angles, go back to page 86 and read about them.) Thus,

$$\angle DAB = \angle ABC + \angle ACB = \frac{\phi}{2} + \frac{\theta - \phi}{2} = \frac{\theta}{2}.$$

**4. Angles formed by two chords.**

We draw chord $DC$ and use inscribed angles $ADC$ and $ECD$. Angle $ABC$ is an exterior angle of $\triangle BCD$, so

$$\angle ABC = \angle ECD + \angle ADC = \frac{\alpha + \beta}{2}.$$

```figure-spec
id: fig-10-25-two-chords-proof
caption: Two chords intersecting at B inside a circle, with auxiliary chord DC drawn to complete triangle BCD for the proof.
elements:
  - circle
  - four points on circle: A (upper-left), C (upper-right), E (lower-left), D (lower-right) — based on AoPS notation
  - two original chords intersecting at B inside circle: chord AD and chord CE (these are the two chords of the original problem)
  - auxiliary chord DC drawn (connecting D and C)
  - angle ∠ABC at B is the angle whose measure we want to prove
  - arc α between A and C (above), arc β between D and E (below) — the two arcs intercepted
  - inscribed angles ∠ADC (at D subtending arc AC) and ∠ECD (at C subtending arc ED) used in proof
render_hint: SVG, two intersecting chords with auxiliary chord, all labels per AoPS figure
```

---

*End of Chapter 10.*
