# Chapter 10 — Angles

*From* The Art of Problem Solving, Volume 1: The Basics *by Sandor Lehoczky & Richard Rusczyk*

*This chapter spans PDF pages 98–106. Transcribed from the PDF via vision; LaTeX math notation throughout. ⭐ marks high-value sections for quant prep; 🪡 marks harder problems; 💣 marks warnings; 👁 marks important conceptual points.*

---

<!-- PDF page 98 / book page 84 -->

# Chapter 10

# *Angles*

## 10.1 Lines, Rays, and Segments

A straight path drawn from one point to another is called a **segment**. The two points are called **endpoints**, and the point on the segment which is exactly between the endpoints is the **midpoint**. Segments are sometimes denoted with a bar, as in $\overline{AB}$, but it is easier to just write $AB$. When written in an equation, $AB$ is the **length** of the segment, which is the distance from one endpoint to the other.

If we continue our straight path past an endpoint and go on forever in that direction, we form a **ray**, which is denoted $\overrightarrow{CD}$. The endpoint from which the path starts, the **origin**, is always written first. If we continue the path in both directions, we form a **line**, which is written $\overleftrightarrow{EF}$.

*[Figure: a segment $AB$, a ray $\overrightarrow{CD}$ (arrow from $C$ through $D$), and a line $\overleftrightarrow{EF}$ (arrows on both ends).]*

Any two points can be used to determine a line. If three or more points are on the same line, they are **collinear**. Given three points $A$, $B$, and $X$ on a segment as shown at left, $AX + XB = AB$. (Why?)

*[Figure: collinear points $A$, $X$, $B$ on a segment.]*

## 10.2 Classification and Measurement

Two rays which share an origin form an **angle** and the rays are the **sides** of the angle. The common origin is called the **vertex** of the angle. If we consider a circle centered at the vertex, as shown below, we say that the angle **subtends** the arc it cuts off. An angle is denoted by the $\angle$ symbol, as in $\angle AOB$. (The vertex *always* goes in the middle.) When there is only one angle with the given vertex, we can use just the vertex to name the angle, as in $\angle O$.

*[Figure: angle $\angle AOB$ with vertex $O$ and a circle centered at $O$ showing the subtended arc from $A$ to $B$.]*

We measure angles as the fraction of a circle, centered at the vertex of the angle, which the angle cuts off. A circle has 360 degrees, so if the angle cuts off one-quarter of the circle, it is $90°$. The number of degrees in a circle is rather arbitrary. We could have just as well chosen 100 or 50, but 360 was chosen because it is evenly divisible by many more numbers than 100. For example, we often encounter angles which are one-third or one-sixth of a circle. If a circle were 100 degrees, we'd have to call these $100/3$ and $50/3$ degree angles rather than $120°$ and $60°$.

Portions of a degree are often measured in "minutes" and "seconds". As you may have guessed, there are 60 minutes in a degree and 60 seconds in a minute. Thus, an angle with measure $0.5°$ has


<!-- PDF page 99 / book page 85 -->

a measure of 30 minutes. An angle of 20 degrees, 10 minutes, and 5 seconds is written $20°10'5''$.

Another more natural way of measuring angles is by **radians**. Just like there are $360°$ in a circle, there are $2\pi$ radians in a circle. Thus

$$\frac{360°}{2\pi} = 1.$$

We can use this as a conversion factor (see page 31) to convert degrees to radians and vice versa.

---

**EXAMPLE 10-1** How many degrees are in $\dfrac{\pi}{3}$ radians and how many radians are in $135°$?

*Solution:* We can multiply $\pi/3$ by the conversion factor to get

$$\left(\frac{\pi}{3}\right)\left(\frac{360°}{2\pi}\right) = \frac{360°}{6} = \mathbf{60°}.$$

Similarly,

$$(135°)\left(\frac{2\pi}{360°}\right) = 2\pi\left(\frac{135°}{360°}\right) = \mathbf{\frac{3\pi}{4}}.$$

---

**EXAMPLE 10-2** Write $20\tfrac{5}{9}°$ in terms of minutes and seconds.

*Solution:* In $5/9$ of a degree, there are $(5/9)(60) = 33\tfrac{1}{3}$ minutes. In $1/3$ of a minute, there are $(1/3)(60) = 20$ seconds. Thus, $20\tfrac{5}{9}° = \mathbf{20°33'20''}$.

---

If we write the measure of an angle in a diagram, we write it by the vertex on the inside of the angle, as in the figure below.

Ninety degree angles are called **right** angles, and any two lines which form a right angle are said to be **perpendicular** or **orthogonal**. If $AB$ and $CD$ are perpendicular, we write $AB \perp CD$. Right angles are usually indicated in diagrams by a little box as shown in the right angle below. Angles which are less than $90°$ are called **acute** angles. An angle which is greater than $90$ degrees but less than $180°$ is **obtuse**, and any angle of over $180$ degrees is a **reflex** angle. A **straight angle** is just a straight line and has $180°$.

*[Figure: three example angles labelled "acute" (a $48°$ angle marked at the vertex), "right" (with the standard right-angle box), and "obtuse".]*

Two angles whose sum is $90°$ are called **complementary** angles, and angles whose sum is $180°$ are **supplementary** angles. Angles are often named with Greek letters; most often $\theta$, sometimes $\phi$, $\alpha$, $\beta$, or $\gamma$.

Consider the intersection of lines $\ell$ and $m$ in the figure. Since a line has $180°$, angles $\alpha$ and $\beta$, which together form a line, are supplementary. Thus $\alpha + \beta = 180°$. Similarly, $\alpha + \theta = 180°$, so $\theta = \beta$. These angles are called **vertical angles**, and as we see, vertical angles are always equal to each other. In the diagram, $\phi$ and $\alpha$ are also vertical angles so $\phi = \alpha$.

*[Figure: two intersecting lines $\ell$ and $m$ forming four angles labelled $\alpha$, $\beta$, $\theta$, $\phi$ around the point of intersection.]*


<!-- PDF page 100 / book page 86 -->

## 10.3 Angles and Parallel Lines

**Parallel** lines are lines that are in the same plane and never intersect. Thus, two parallel lines are always the same distance apart. In the figure, lines $\ell$ and $m$ are parallel; this is written $\ell \parallel m$. Line $n$ is a **transversal**. Angles $\alpha$ and $\beta$ are called **alternate interior angles**, and they are equal. Since $\gamma$ and $\alpha$ are vertical angles, they are equal, so $\alpha = \beta = \gamma$. The pair $\gamma$ and $\beta$ are called **corresponding angles**. Also, $\theta$ and $\beta$ together form a straight line and thus are supplementary. Since $\beta = \alpha$, we find that $\theta$ and $\alpha$ are also supplementary. The angles $\theta$ and $\alpha$ are sometimes called **same-side interior angles**.

*[Figure: parallel lines $\ell$ and $m$ cut by transversal $n$; eight angles formed, with $\alpha$, $\beta$, $\gamma$, $\theta$ marked at the two intersection points.]*

Sometimes diagrams get so complex that it would be nice to have a convenient way to mark equal angles. This is done by drawing a small arc inside the angle near the vertex of each of the equal angles. Any angle which has one such arc inside it is equal to all the others which have one such arc inside. Similarly, if we have another set of equal angles which are not equal to the set with one arc, we draw two arcs inside the angles.

⭐ Whenever you see a pair of vertical angles, a pair of corresponding angles, or a pair of alternate interior angles, mark them as equal in your diagram. The most important skill in solving geometry problems is making good diagrams. The first step in any problem is to draw the picture as accurately as possible. Then throughout the problem, keep the picture accurate by marking equal angles and equal lengths. Equal lengths are marked somewhat like equal angles; any two segments which have the same length get a tick mark. If another set of segments are all equal, they get two tick marks, and so on.

The following two examples are proofs of very important facts which are among the most important tools in solving problems involving angles.

---

⭐ **EXAMPLE 10-3** Prove that the sum of the angles of a triangle is always $180°$.

*Proof:* Read this proof closely—it is not simple. The usefulness of cleverly adding a parallel line to a diagram cannot be overestimated. When standard techniques fail, look for a good place to draw an extra parallel line. Parallel lines form many pairs of equal angles, which can often be used to complete the problem.

In the figure, line $\ell$ is drawn through $C$ parallel to side $AB$ of triangle $ABC$. As alternate interior angles, we have $\angle BAC = \angle ACE$ and $\angle ABC = \angle BCD$. Since $\angle ACB$, $\angle ACE$, and $\angle BCD$ together make up a straight line, we get $\angle ACE + \angle ACB + \angle BCD = \alpha + \beta + \gamma = 180°$. Thus, the sum of the angles in a triangle is always $180°$.

*[Figure: triangle $ABC$ with line $\ell$ drawn through $C$ parallel to $AB$, with points $E$ and $D$ on $\ell$ on either side of $C$; angles $\alpha$ (at $A$ / corresponding $\angle ACE$), $\beta$ (at $C$, interior), $\gamma$ (at $B$ / corresponding $\angle BCD$) marked along the straight line through $C$.]*

---

⭐ **EXAMPLE 10-4 (Exterior Angle Theorem)** If we continue a side of a triangle past a vertex as in the diagram, we form an **exterior angle** of the triangle, like $\theta$ in the figure below. The interior angles of the triangle which are not adjacent to the exterior angle are called **remote interior angles**. (In the diagram, $\alpha$ and $\beta$ are remote interior angles.) Prove that any exterior angle of a triangle is the sum of the remote interior angles.


<!-- PDF page 101 / book page 87 -->

*Proof:* From the triangle we find $\alpha + \beta + \gamma = 180°$, and since $\gamma$ and $\theta$ make up a straight line, $\gamma + \theta = 180°$. Combining these gives $\alpha + \beta + \gamma = \gamma + \theta$, so $\alpha + \beta = \theta$. That is, the measure of an exterior angle of a triangle is the sum of the two remote interior angles.

*[Figure: triangle with interior angles $\alpha$, $\beta$, $\gamma$; one side is extended past the $\gamma$-vertex, forming the exterior angle $\theta$ on the outside.]*

---

**EXERCISE 10-1** Let $\alpha$, $\beta$, and $\gamma$ be the exterior angles of angles $\angle A$, $\angle B$, and $\angle C$ of $\triangle ABC$. Show that $\alpha + \beta + \gamma = 360°$.

---

## 10.4 Arcs, Segments, Sectors, and Angles

We can use our understanding of angles and the circumference and area of a circle to find the areas of sectors and circular segments.

Arcs can be measured by their length or by the measure of the angle from the center of the circle which cuts off the arc, as $\angle AOB$ cuts off arc $AB$ in the figure. As you can see below, the measure of an arc can be denoted by writing the value beside the arc in the figure.

The ratio of the measure of the arc to the measure of the circle, $2\pi$ radians, equals the ratio of the length of the arc to the circumference of the circle. Letting $r$ be the radius of the circle, we have

$$\frac{\overset{\frown}{AB}}{2\pi r} = \frac{\theta}{2\pi},$$

or $\overset{\frown}{AB} = r\theta$, where $\theta$ is in radians.

*[Figure: circle with center $O$, radius drawn to $A$ and $B$; central angle $\angle AOB = \theta$ subtends arc $AB$.]*

The angle $\theta$ which cuts off a sector cuts off an area equal to $\theta/2\pi$ of the area of the entire circle. The area of sector $AOB$ is thus

$$\left(\frac{\theta}{2\pi}\right)(\pi r^2) = \frac{r^2\theta}{2}.$$

The area of circular segment $AB$ is the area of sector $ABO$ minus the area of triangle $ABO$. (Methods for finding the area of a triangle are presented on page 109.)

## 10.5 Angles Formed By Lines Intersecting a Circle

We've already seen how angles can be measured by the arcs they cut off of circles centered at the vertex of the angle. Such an angle is called a **central angle**. We will now consider angles formed by chords, tangents, and secants. For now we won't prove these relations, but we'll come back to the proofs later.

**1. Angles formed by two chords with a common endpoint.**


<!-- PDF page 102 / book page 88 -->

Such an angle is called an **inscribed angle**, and its measure is one-half of the arc it intercepts:

$$\angle ABC = \frac{\overset{\frown}{AC}}{2}.$$

*[Figure: circle with chord $BA$ and chord $BC$ meeting at $B$ on the circle; $\angle ABC$ inscribed, subtending arc $AC$.]*

**2. Angles formed by two secants which intersect outside the circle.**

The measure of such an angle is equal to one-half the difference of the arcs intercepted by the secants:

$$\angle BAC = \frac{\alpha - \beta}{2}.$$

The angle between two tangents from a point to a circle, or between a tangent and a secant, can also be found from the arc measures as shown above.

*[Figure: external point $A$, two secants from $A$ cutting the circle at four points; far arc (between far intersections) measures $\alpha$, near arc measures $\beta$; the angle at $A$ is $\angle BAC$.]*

**3. Angles formed by a tangent and a chord.**

This angle is one-half the arc it cuts off:

$$\angle ABC = \frac{\theta}{2}.$$

*[Figure: tangent line at $B$ and chord $BC$ from $B$; arc cut off (from $B$ to $C$ on the side of the angle) has measure $\theta$.]*

**4. Angles formed by two chords.**

The angle formed by two chords is one-half the sum of the intercepted arcs:

$$\theta = \frac{\alpha + \beta}{2}.$$

*[Figure: two chords intersecting inside the circle at angle $\theta$; opposite intercepted arcs measure $\alpha$ and $\beta$.]*

The application of these angle properties is in general very straightforward. When you see an angle cutting off arcs in any of the above manners, you can immediately apply the corresponding relation. The following examples and exercises display the use of these principles.

---

⭐ **EXAMPLE 10-5** Show that any inscribed angle which subtends a semicircular arc is a right angle.

*Proof:* Since the angle cuts off a $180°$ arc, its measure is $180°/2 = 90°$. Thus, the angle is right. An angle which cuts off a $180°$ arc is said to be **inscribed in the semicircle** formed by the arc.

---

**EXAMPLE 10-6** Show that any diameter drawn from the point of tangency of a tangent line $\ell$ is perpendicular to the line.


<!-- PDF page 103 / book page 89 -->

*Proof:* In the diagram, $\angle CAB$ is formed by a tangent and a chord and hence its measure is half that of the arc it cuts off. Since the chord is a diameter, the arc is half the circle, so $\angle CAB = 180°/2 = 90°$. Thus, $AO \perp \ell$.

*[Figure: circle with center $O$, diameter $AB$, tangent line $\ell$ at $A$, point $C$ on $\ell$; $\angle CAB$ marked as a right angle.]*

---

**EXERCISE 10-2** Points $A$, $B$, $Q$, $D$, and $C$ lie on the circle as shown and the measures of arcs $\overset{\frown}{BQ}$ and $\overset{\frown}{QD}$ are $42°$ and $38°$ respectively. What is the sum of angles $P$ and $Q$? *(AHSME 1971)*

*[Figure: circle with points $A, B, Q, D, C$ on it; external point $P$; lines through $P$ form the configuration; arcs $BQ = 42°$ and $QD = 38°$ marked.]*

---

**EXERCISE 10-3** Segments $PA$ and $PT$ are tangent to the circle. Find the measure of $\angle TXA$ if $\angle P = 42°$. *(MAΘ 1990)*

*[Figure: external point $P$ with two tangents $PA$ and $PT$ to a circle; $X$ is a point on the circle; $\angle P = 42°$.]*

---

**EXAMPLE 10-7** In the figure, if $\overset{\frown}{AB} = 60°$ and $\overset{\frown}{DE} = 40°$, then what is $\angle ACD$?

*Solution:* Since $\angle ACB$ is one-half the sum of $\overset{\frown}{AB}$ and $\overset{\frown}{DE}$, we have $\angle ACB = 50°$. Since $\angle ACD + \angle ACB = 180°$, we find $\angle ACD = \mathbf{130°}$.

*[Figure: circle with chords $AB$ and $DE$ intersecting inside at $C$; arcs $AB = 60°$ and $DE = 40°$ marked.]*

---

**EXAMPLE 10-8** In the figure, given that $\angle ABC = 60°$ and $\angle BCD = 70°$, find $\angle CBD$.

*Solution:* We know that $\angle CBD$ is one-half $\overset{\frown}{CD}$, but we don't know what $\overset{\frown}{CD}$ is. We can also find $\angle CBD$ by finding the other two angles of $\triangle CBD$ and subtracting their sum from $180°$. We already have $\angle C$, and $\angle D$ is one-half $\overset{\frown}{BC}$. Since $\overset{\frown}{BC} = 2\angle ABC = 120°$, we have $\angle D = 60°$, and $\angle CBD = 180° - \angle C - \angle D = \mathbf{50°}$.

In this example we have an instance of the general result that an angle formed by a tangent and a chord ($\angle ABC$ above) is equal to any inscribed angle which cuts off the same arc as the chord ($\angle D$ above).

*[Figure: circle with point $A$ outside, tangent line $AB$ at $B$; chord $BC$; chord $CD$; $\angle ABC = 60°$, $\angle BCD = 70°$.]*

---

⭐ 👁 As you proceed to more advanced problem solving, the most subtle and important result in this section is that **any two inscribed angles which subtend the same arc are equal**. For example, in the figure we have

$$\angle A = \angle B \quad \text{and} \quad \angle C = \angle D.$$

*[Figure: circle with two inscribed angles $\angle A$ and $\angle B$ both subtending the same arc, and similarly $\angle C = \angle D$.]*

While the other relations have fairly obvious applications, equal inscribed angles can be cleverly hidden in a problem. This is one of the most common methods of showing that two angles are equal. If you are ever asked to show the equality of two angles whose sides intersect, as angles $A$ and $B$ do at points $C$ and $D$ above, check to see if there is a circle that passes through the vertices of the angles and the two intersection points. If such a circle exists, then the two angles are equal; it's that simple!


<!-- PDF page 104 / book page 90 -->

If the two angles you are trying to prove equal share a vertex or a side, or if their sides don't intersect, then inscribed angles is *not* the best immediate method to use, because no such circle will exist. (Why? Draw these cases and see.) We point this out because it is as important to know which methods *not* to try as it is to know which methods to try. Keep in mind, however, that sometimes you will have to get creative; the cut-and-dried methodology won't always work. (And would math be fun if it did?)

---

🪡 **EXAMPLE 10-9** The two circles in the figure are tangent at $G$. Prove that $\angle E = \angle F$.

*Proof:* The two angles are not related to each other at all, so it seems we cannot use any of the above relations. Thus, we start where we should always start on geometry problems involving angles: finding angles we know are equal. Since $\angle AGB$ and $\angle DGC$ are vertical angles, they are equal. Since $\angle F$ and $\angle DGC$ are inscribed angles which subtend the same arc, they are equal. Finally, $\angle E = \angle AGB$ because they are inscribed angles subtending the same arc. Thus

$$\angle E = \angle AGB = \angle DGC = \angle F.$$

This is an example of a problem where it is very useful to mark equal angles as discussed on page 86.

*[Figure: two circles tangent internally/externally at point $G$; on the left circle, points $A$ and $E$; on the right circle, points $B$, $C$, $D$, $F$; lines through $G$ produce the cited inscribed angles.]*

---

## 10.6 The Burden of Proof

Now that we have demonstrated the many relationships between angles and circles, we will prove these relations. The importance of this section is not so much the proofs themselves, but the many valuable techniques which they demonstrate.

If you do not know anything about isosceles triangles, read about them on page 93 before returning to these proofs.

**Proofs of the formulas relating angles and arcs**

**1. Inscribed angles.**

We must relate the arc measure to something we know, and the only thing we know about the arc is that it equals the central angle that subtends it. Thus, to prove our formula, we must show that $\phi = 2\theta$ in the diagram. Looking at our diagram, we see that by connecting $A$ and $B$ we form two triangles, $\triangle ABC$ and $\triangle BOA$. We then label all the angles we form as shown. Since a triangle has $180°$, we have

$$\theta + x + y + z = \phi + z + w + y = 180°.$$

*[Figure: circle with center $O$, points $A$, $B$, $C$ on the circle; $\angle ACB = \theta$ inscribed at $C$; central angle $\phi$ at $O$ subtending the same arc $AB$. Auxiliary segments $CA$, $CB$, $OA$, $OB$, $AB$ create triangles $\triangle ABC$ and $\triangle BOA$ with sub-angles labelled $x, y, z, w$.]*


<!-- PDF page 105 / book page 91 -->

Another important thing to remember in problem solving is to think about what is special about every restriction placed on the problem. In this problem, we are dealing with triangles formed by the center and points on a circle. Any triangle formed by two radii and a chord, such as $\triangle BOA$, is isosceles, and isosceles triangles give us equal angles. For example, from $\triangle AOB$ we have $\angle OAB = \angle OBA$, so $y = z + w$. Just $\triangle BOA$ and $\triangle ABC$ are not enough to finish this problem, because substituting $z + w = y$ in our original equation gives

$$\theta + x + y + z = \phi + 2y = 180.$$

This clearly doesn't quite get us to $\phi = 2\theta$. We must find something else. This brings us to another geometry problem solving technique: cleverly adding lines to the diagram. We've already done this once by drawing $AB$ to complete the two triangles. Looking at the figure, you should see that the line that's begging to be added is $OC$. Adding that to our diagram gives us the diagram below.

In this picture, we see that the addition of $OC$ gives us more isosceles triangles, and therefore more equal angles. First, from $\triangle AOC$ we have $AO = OC$, so $x = \theta + v$. This makes our equation

$$2\theta + v + z + y = \phi + 2y = 180.$$

We see from this that if we can show that $v + z = y$, then we will be able to show that $\phi = 2\theta$. (Make sure you understand why: substitute $v + z = y$ in the above and get $2\theta + 2y = \phi + 2y$, so $\phi = 2\theta$.)

*[Figure: same circle as before, with auxiliary segment $OC$ added, creating isosceles triangles $\triangle AOC$ and $\triangle BOC$; sub-angle $v$ marked at $C$ in $\triangle AOC$.]*

⭐ This shows us yet another powerful tool: **working backwards**. We look at what we know ($2\theta + v + z + y = \phi + 2y = 180$) and what we want ($\phi = 2\theta$) and see what we must prove to get from one to the other ($v + z = y$).

Working backwards again, we know that $z + w = y$, so if we can show that $w = v$, we are done. From isosceles triangle $BOC$ we get $OC = OB$, so $v = w$. Thus, $z + w = z + v = y$, so $2\theta + v + z + y = 2\theta + 2y$. Hence, our equation is now

$$2\theta + 2y = \phi + 2y = 180.$$

Thus $\phi = 2\theta$, and our proof is complete. Or is it? Whenever you complete a proof, you must make sure that your proof covers all cases and makes no assumptions that are not a part of the problem. If we look at the very first diagram, we see that we made the assumption that the center of the circle lies outside $\angle ACB$. This, of course, is not always true, but our proof is only valid for those cases in which it is. In order for our proof to be **rigorous**, meaning to be complete and make no assumptions, we must prove the formula for the cases where the center of the circle is inside and on a side of the angle. The proofs are almost exactly like the one we've done. Try to do these on your own.

Don't let this proof scare you; it really isn't nearly as long as it looks. It only looks long because we've added a lot of comments. The proof itself is quite short.

**2. Angles formed by two secants.**

In the figure, we add line $DC$ because not only does this form a triangle, $\triangle ADC$, but also it forms two inscribed angles, $\angle ACD$ and $\angle BDC$, each of which subtends an arc in the formula we wish to prove. Since $\angle A$ is in $\triangle ADC$, we can find its measure by finding the measure of the other two angles in the triangle. (Yes, this is another one of those "proof techniques" we've been telling you about. You've seen this one before, and you'll see it again. And again.)

*[Figure: external point $A$ with two secants meeting the circle at $D, B$ (one secant) and $C$ (other intersections); auxiliary chord $DC$ drawn; $\angle A = \alpha$ on the outside; intercepted far arc $\beta$ on the inside.]*


<!-- PDF page 106 / book page 92 -->

As inscribed angles, $\angle DCA = \alpha/2$ and $\angle BDC = \beta/2$. Angles $CDB$ and $CDA$ form a line and thus are supplementary, so

$$\angle CDA = 180° - \angle CDB = 180° - \frac{\beta}{2}.$$

Thus, $\angle A = 180° - \angle CDA - \angle DCA = 180° - \left(180° - \dfrac{\beta}{2}\right) - \dfrac{\alpha}{2} = \dfrac{\beta - \alpha}{2}$.

**3. Angle formed by a tangent and a chord.**

Once again we must add a line. This is a little tricky because it's not so obvious where to add the extra line. We could connect the endpoints of the chord to the center of the circle, but this approach won't get us too far without using what we know about radii being perpendicular to tangents. Since we use what we are trying to prove to show that radii are perpendicular to tangents, we cannot use that fact in this proof or we will be guilty of **circular reasoning** (see page 259). Do you see why?

We can also connect $B$ to some point on the tangent. Connecting it to $D$ doesn't seem helpful (draw it and see for yourself), but connecting it to $C$ gives us a couple of familiar things. First, we have an angle formed by a secant and a tangent, $\angle ACB$, which subtends an arc in the formula we wish to prove. Second, we have an inscribed angle, $\angle ABC$.

Since $\angle DAB$ is an exterior angle of $\triangle CAB$, it is the sum of $\angle ACB$ and $\angle ABC$. (If you forgot about exterior angles, go back to page 86 and read about them.) Thus,

$$\angle DAB = \angle ABC + \angle ACB = \frac{\phi}{2} + \frac{\theta - \phi}{2} = \frac{\theta}{2}.$$

*[Figure: circle with tangent line at $A$ extending to $D$ on one side; chord $AB$; auxiliary chord $BC$ where $C$ is on the circle; arc $AB$ on the chord-side has measure $\theta$; inner arc $AC$ has measure $\phi$ (so the remaining piece is $\theta - \phi$).]*

**4. Angles formed by two chords.**

We draw chord $DC$ and use inscribed angles $\angle ADC$ and $\angle ECD$. Angle $ABC$ is an exterior angle of $\triangle BCD$, so

$$\angle ABC = \angle ECD + \angle ADC = \frac{\beta}{2} + \frac{\alpha}{2} = \frac{\alpha + \beta}{2}.$$

*[Figure: two chords $AE$ and $CD$ intersecting inside the circle at $B$; auxiliary chord $DC$ (already drawn as one of the chords); arcs $AC = \alpha$ and $ED = \beta$ marked on opposite sides of $B$.]*
