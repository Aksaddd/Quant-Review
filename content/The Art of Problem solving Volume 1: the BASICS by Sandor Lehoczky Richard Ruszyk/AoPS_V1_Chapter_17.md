# Chapter 17: Power of a Point

## 17.1 Introduction

The Power of a Point Theorem is a very simple yet very powerful theorem.

> **Power of a Point Theorem.** Given a point $P$ and a line through $P$ which intersects some circle in two points $A$ and $B$, the product $(PA)(PB)$ is the same for any choice of the line.

We will show several important cases of the basic theorem. As with our discussion of angles and circles, we will present the relationships now and prove them in a later section.

### Power of a Point Formulas

**1. Two tangents from a point.** Two tangents from the same point to a circle are always equal:

$$AB = AC.$$

> *[Figure: Circle with two tangent lines from external point $A$, touching the circle at $B$ and $C$]*

**2. A tangent and a secant from a point.** Given tangent $AC$ and secant $AD$ through $A$ (where the secant meets the circle at $B$ first, then $D$):

$$AC^2 = AB \cdot AD.$$

> *[Figure: External point $A$ with tangent to point $C$ and secant passing through $B$ to $D$]*

**3. Two secants from a point.** Given secants $AC$ and $AE$ (where the secants meet the circle first at $B$ and $D$ respectively):

$$(AB)(AC) = (AD)(AE).$$

> *[Figure: External point $A$ with two secants through points $B, C$ and $D, E$ on the circle]*

**4. Two chords through a point.** Given two chords $BC$ and $DE$ which intersect at $A$ (inside the circle):

$$(BA)(AC) = (DA)(AE).$$

> *[Figure: Two chords $BC$ and $DE$ intersecting inside the circle at point $A$]*

---

> 💡 **When to spot Power of a Point:** When given a circle and intersecting chords, or lines to a circle from a common exterior point, you can use Power of a Point. Whenever you see two tangents to the same circle from the same point, mark the tangents as equal. Like similar triangles, Power of a Point is most useful in proofs when working with **ratios of segments**.

Unlike similar and congruent triangles, which are sometimes difficult to see, Power of a Point is generally very easy to notice. If you have a couple of chords in a circle, or a tangent and a secant, you have Power of a Point — it's pretty hard to hide.

---

### Example 17-1
*Given tangent $AC$ and secant $AB$ with $AC = 6$, $AD = 4$, and $BD = x$, find $x$.*

**Solution:** From the power of point $A$:

$$(AB)(AD) = AC^2.$$

Thus $4(4 + x) = 36$, giving $x = \boxed{5}$.

---

### Example 17-2
*Two diagonals $AX$ and $BY$ of a regular polygon intersect at $W$. Prove that $(AW)(WX) = (BW)(WY)$.*

**Proof:** Seeing the suggestive equation, we think of Power of a Point. Since the polygon is regular, there exists a circle which passes through all of its vertices.

Since $AX$ and $BY$ are chords of the circle which intersect at $W$, the power of point $W$ gives us $(AW)(WX) = (BW)(WY)$. $\blacksquare$

---

### Example 17-3
*In $\triangle ABC$, points $X$, $Y$, $Z$ are where the incircle is tangent to the sides — $X$ opposite $A$, $Y$ opposite $B$, $Z$ opposite $C$. Prove that $AZ = s - a$, $BX = s - b$, and $CY = s - c$, where $s$ is the semiperimeter.*

**Proof:** Since tangents from a point to a circle are equal, let $AZ = AY = x$, $BZ = BX = y$, and $CY = CX = z$. The perimeter of the triangle is

$$p = 2s = (x + y) + (y + z) + (x + z) = 2(x + y + z),$$

so $s = x + y + z$. Since $x + z = b$:

$$y = BX = s - (x + z) = s - b.$$

The other equalities are proven likewise. $\blacksquare$

---

### Example 17-4
*Prove that if $ABCD$ can be circumscribed about a circle, then $AB + CD = BC + AD$.*

**Proof:** Since $ABCD$ can be circumscribed about a circle, we can draw a circle tangent to all four sides. (Such a circle cannot be drawn for every quadrilateral.) Since tangents to a circle from a point are equal, label the tangent lengths from $A$, $B$, $C$, $D$ as $x$, $w$, $z$, $y$ respectively. Then

$$AB + CD = (x + w) + (y + z) = w + x + y + z = (w + z) + (x + y) = BC + AD. \quad \blacksquare$$

---

**Exercise 17-1.** Prove that the inradius of a right triangle with leg lengths $a$ and $b$ and hypotenuse $c$ is $\dfrac{a + b - c}{2}$.

**Exercise 17-2.** Show that if $AB$ is a diameter of a circle and $CD$ a chord perpendicular to $AB$ intersecting $AB$ at $X$, then $CX^2 = (AX)(BX)$.

---

> 💡 **Power of a Point as a tangency test:** Power of a Point can be used to *prove* that a segment is tangent to a circle. For example, if a line through point $A$ outside circle $O$ intersects the circle at $B$ and $C$, and another line through $A$ meets the circle at $X$ such that $AX^2 = (AB)(AC)$, then $AX$ is tangent to the circle. Remember this if other methods of proving tangency fail.

---

## 17.2 Power of a Point Proofs

The proofs of the various Power of a Point configurations are excellent exercises in elementary geometry.

> **Strategy:** Since the Power of a Point formulas involve ratios of sides, we look for **similar triangles**. Since the theorem also involves circles, we use **circular arcs to relate angles**.

### 1. Point Outside the Circle

We can knock off all of these configurations with a single proof. Once we establish the case with one secant and one tangent, the cases of two secants and two tangents will soon follow.

> *[Figure: External point $A$ with tangent $AB$ and secant $ACD$ through points $C$ and $D$ on the circle, with auxiliary chord $BD$ drawn to create similar triangles $ADB \sim ABC$]*

**Setup:** External point $A$ with tangent $AB$ and secant through $C$ and $D$. We wish to show that $(AD)(AC) = AB^2$. Rearranging:

$$\frac{AD}{AB} = \frac{AB}{AC},$$

which will be true if $\triangle ADB \sim \triangle ABC$. Since $\angle DAB = \angle CAB$ (same angle), we need only prove that one other pair of corresponding angles is equal.

As an inscribed angle, $\angle BCD = \widehat{BD}/2$. Similarly, as the angle between a tangent and a chord, $\angle ABD = \widehat{BD}/2$. Thus $\triangle ADB \sim \triangle ABC$, giving

$$\frac{AD}{AB} = \frac{AB}{AC} \implies (AD)(AC) = AB^2.$$

This proves Power of a Point for a secant and a tangent.

**Extending to two secants and two tangents:** Since the relation $(AD)(AC) = AB^2$ must hold for *any* secant, $(AD)(AC)$ is constant for all secants passing through $A$. In the same way we showed $(AD)(AC) = AB^2$, we can show $(AD)(AC) = AE^2$ where $E$ is the point of tangency of another tangent from $A$. Thus

$$AB^2 = (AD)(AC) = AE^2,$$

so $AB = AE$, showing that two tangents to a circle from the same point are equal. $\blacksquare$

### 2. Point Inside the Circle

> *[Figure: Two chords $AB$ and $CD$ intersecting inside the circle at point $E$, with auxiliary segments forming similar triangles $EAC$ and $EDB$]*

**Setup:** Two chords $AB$ and $CD$ intersecting at point $E$ inside the circle.

Just like before, we use similar triangles. First, $\angle AEC = \angle DEB$ as vertical angles. Since $\angle CAB$ and $\angle CDB$ are inscribed angles subtending the same arc $\widehat{BC}$, they are equal. Thus triangles $EAC$ and $EDB$ are similar, so

$$\frac{AE}{DE} = \frac{CE}{BE}.$$

Rearranging yields the desired $(AE)(BE) = (CE)(DE)$. $\blacksquare$

---

> **Reflection on technique:** Think carefully about the tools used in these proofs:
>
> - Seeing ratios of sides → look for similar triangles
> - To show triangles similar → show their angles equal
> - With circles involved → use relationships between arcs and angles, plus angle sums in straight lines and triangles

These same tools will guide you in your own proofs.

---

## Problems to Solve for Chapter 17

**294.** A point $P$ is outside a circle and is 13 inches from the center. A secant from $P$ cuts the circle at $Q$ and $R$ so that the external segment of the secant $PQ$ is 9 inches and $QR$ is 7 inches. Find the radius of the circle. *(AHSME 1954)*

**295.** The points $A$, $B$, and $C$ are on circle $O$. The tangent line at $A$ and the secant $BC$ intersect at $P$, $B$ lying between $C$ and $P$. If $BC = 20$ and $PA = 10\sqrt{3}$, then find $PB$. *(AHSME 1956)*

**296.** $EB$ bisects $CD$ and $C$ is the midpoint of $AD$. Find $GB$ if $AB = 16$, $EF = 4$, and $FB = 6$. *(MAΘ 1990)*

**297.** Two tangents are drawn to a circle from an exterior point $A$; they touch the circle at points $B$ and $C$, respectively. A third tangent intersects segment $AB$ at $P$ and $AC$ at $R$, and touches the circle at $Q$. If $AB = 20$, then find the perimeter of $\triangle APR$. *(AHSME 1961)*

**298.** A circle is inscribed in a triangle with sides of lengths 8, 13, and 17. Let the segments of the side of length 8 made by a point of tangency be $r$ and $s$, with $r < s$. Find the ratio $r : s$. *(AHSME 1964)*

**299.** $O$ is the center of the circle. $AB \perp BC$, $ADOE$ is a straight line, $AP = AD$, and $AB$ has length twice the radius. Show that $AP^2 = (PB)(AB)$. *(AHSME 1960)*

**300.** Find the area of the inscribed circle of a triangle with sides of length 20, 21, and 29. *(MAΘ 1990)*

**301.** $AB$ is tangent at $A$ to the circle with center $O$; point $D$ is interior to the circle; and $DB$ intersects the circle at $C$. If $BC = DC = 3$, $OD = 2$, and $AB = 6$, then find the radius of the circle. *(AHSME 1976)*

**302.** Prove that if quadrilateral $ABCD$ is orthodiagonal and circumscribed around a circle, then $(AB)(CD) = (BC)(AD)$. *(M&IQ 1991)*
