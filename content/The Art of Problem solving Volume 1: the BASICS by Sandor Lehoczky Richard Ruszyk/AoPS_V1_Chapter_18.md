# Chapter 18: Three Dimensional Geometry

## 18.1 Planes, Surface Area, and Volume

### Lines in Space

Consider two lines in space:

- If they have **exactly the same orientation**, they are **parallel**.
- If they don't have the same orientation but **never intersect**, they are **skew lines**.

> **Intuition:** To understand skew lines, hold two pens so that they are not touching. If they aren't pointing the same direction, chances are they are skew.

### Planes

A **plane** is the 3D analog of a line — a flat, two-dimensional figure that extends forever in every direction. In three dimensions, an area which extends forever in every direction is called a **space**.

Given a plane, any line is either:

1. **In the plane** (lies entirely within it),
2. **Intersects the plane at one point**, or
3. **Never intersects the plane** — in which case it is **parallel** to the plane.

A line $\ell$ is **perpendicular to a plane** if every line in the plane through the intersection point of $\ell$ and the plane is perpendicular to $\ell$. The **distance from a point to a plane** is the length of the perpendicular segment from the point to the plane.

### Determining a Plane

> 💡 **Three noncollinear points determine a unique plane.** Any three noncollinear points form a triangle, and a triangle is a planar figure.

We **cannot** always form a plane through four given points. Four or more points which lie in a single plane are called **coplanar**.

### Surface Area and Volume

For a 3D figure made of cloth enclosing a region:

- **Total surface area** = area of all the cloth (sum of the areas of all faces).
- **Lateral surface area** = surface area *not on the top or bottom*. Used for shapes with a well-defined top and bottom.
- When a problem just asks for "surface area," **total surface area is implied**.

The **volume** of a figure is the amount of space enclosed within it.

---

## 18.2 Spheres

A **sphere** is just a ball — the set of all points in *space* which are a fixed distance from a given point. As with the circle, the fixed point is the **center**, and the distance is the **radius**.

> 💡 **Sphere formulas.** For a sphere with radius $r$:
>
> $$\text{Surface Area} = 4\pi r^2, \qquad \text{Volume} = \frac{4\pi r^3}{3}.$$

### Plane–Sphere Intersection

If a plane intersects a sphere, the intersection is either:

- A **point** (if the plane is tangent to the sphere), or
- A **circle**.

The intersection of a sphere and a plane passing through its center is called a **great circle** of the sphere.

---

### Example 18-1
*A plane intersects a sphere, forming a circle. Find the radius of the circle if the radius of the sphere is 8 and the center of the sphere is 5 units from the plane.*

> *[Figure: A sphere with center O, intersected by a plane forming a circle of diameter AC and center B; segment OB perpendicular to the plane]*

**Solution:** Draw diameter $AC$ of the circle, where $B$ is its center. Drawing segment $OB$ (from sphere center to circle center) and radii $OA$ and $OC$, we form two triangles $OBC$ and $OBA$. Since $AB = BC$ (radii of the circle), $OB = OB$, and $OC = OA$ (radii of the sphere), we have $\triangle OBC \cong \triangle OBA$ by SSS. Thus $\angle OBC = \angle OBA$. Since these two angles together form a straight line, they are right angles. Thus $OB$ is the distance from the center to the plane, so $OB = 5$. From the Pythagorean Theorem:

$$AB = \sqrt{8^2 - 5^2} = \boxed{\sqrt{39}}.$$

> 💡 **Remember this method** of relating the radius of the sphere to the radii of circles of the sphere.

---

### Example 18-2
*Find the diameter of a sphere whose volume is $288\pi$.*

**Solution:** Solve

$$\frac{4\pi r^3}{3} = 288\pi.$$

This gives $r^3 = 216$, so $r = 6$. Thus the diameter is $2r = \boxed{12}$.

---

**Exercise 18-1.** A ball was floating in a lake when the lake froze. The ball was removed (without breaking the ice), leaving a hole 24 cm across at the top and 8 cm deep. What was the radius of the ball in centimeters? *(AHSME 1987)*

**Exercise 18-2.** Find the volume of a sphere which has surface area 100.

---

## 18.3 Cubes and Boxes

### The Cube

> *[Figure: A cube drawn in 3D perspective showing all 6 faces, 12 edges, and 8 vertices]*

A simple six-sided die is a **cube**. All the sides, or **faces**, are squares and each face is perpendicular to its adjacent faces. The segments which form the faces are called **edges**, and the edges meet at the **vertices**.

If $s$ is the edge length:

- **Surface area:** $6s^2$
- **Volume:** $s^3$

### Diagonal of a Cube

> *[Figure: A cube ABCDEFGH with face diagonal AC drawn on bottom face and space diagonal AG (or EC) from one vertex to the opposite, illustrating that the space diagonal has length s√3]*

A **diagonal of a cube** is a segment drawn from a vertex to the vertex opposite it. To find its length:

1. Draw a face diagonal $AC$ first; since the face is a square, $AC = s\sqrt{2}$.
2. Since the edge $AE$ is perpendicular to the plane $ABCD$, $AE \perp AC$.
3. By the Pythagorean Theorem on right triangle $CAE$:

$$EC = \sqrt{s^2 + 2s^2} = s\sqrt{3}.$$

> 💡 **The diagonal of a cube is $\sqrt{3}$ times the length of a side.**

---

### Example 18-3
*In cube $ABCDEFGH$, $ABCD$ is a face and $M$ is the midpoint of edge $DE$. Find $BM$ if $AB = 4$.*

**Solution:** The first step is to draw the picture as accurately as possible.

> 💡 **Core technique:** Nearly all three-dimensional problems which do not involve volume are solved by chopping the problem into a series of two-dimensional problems.

Drawing face diagonal $BD$, we form right triangle $BDM$. (There are lots of right triangles in cube problems.) Since $BD$ is a face diagonal: $BD = 4\sqrt{2}$. Since $DM$ is half an edge: $DM = 2$. By the Pythagorean Theorem:

$$BM = \sqrt{(4\sqrt{2})^2 + 2^2} = \sqrt{32 + 4} = \boxed{6}.$$

---

### Example 18-4 (Painted Cube)
*A cube with edge length 6 units is made from unit cubes, and then all faces are painted. How many of the blocks have no faces painted? One face painted? Two faces painted? Three faces painted?*

**Solution:** 

**Three faces painted** — these are the corners: $\boxed{8}$.

**Two faces painted** — the block must be on an edge but not a corner. Each of the 12 edges contains $6 - 2 = 4$ such cubes:

$$12 \cdot 4 = \boxed{48}.$$

**One face painted** — the block must be in the interior of a face. Removing the outside blocks of a $6 \times 6$ square leaves a $4 \times 4$ square, so 16 blocks per face, times 6 faces:

$$6 \cdot 16 = \boxed{96}.$$

**No faces painted** — slick approach: removing the outer layer from the entire $6 \times 6 \times 6$ cube leaves a $4 \times 4 \times 4$ cube:

$$4^3 = \boxed{64}.$$

> **Sanity check:** $8 + 48 + 96 + 64 = 216 = 6^3$. ✓

---

### Example 18-5
*Find the area of $\triangle BDE$, where $ABCDEFGH$ is a cube and $AB = 6$.*

**Solution:** Drawing the sides of the triangle, we see that they are face diagonals and hence each has length $6\sqrt{2}$. Since all three sides are equal, $\triangle BDE$ is equilateral. Hence:

$$[BDE] = \frac{(BD)(BE) \sin 60°}{2} = \frac{(6\sqrt{2})^2 \sqrt{3}}{4} = \boxed{18\sqrt{3}}.$$

---

**Exercise 18-3.** Find the volume of a cube which has diagonal length 6.

**Exercise 18-4.** Given that $AB$, $AD$, and $AE$ are all edges of a cube, find $\angle LMN$ if $L$, $M$, and $N$ are the midpoints of these three edges.

---

### The Box (Right Parallelepiped)

A **parallelepiped** is a six-sided solid in which the opposite faces are congruent parallelograms. A **box** (or **rectangular solid**, or **right parallelepiped**) is a special case where all the faces are rectangles.

Three lengths describe any box:

- **Length** $\ell$
- **Width** $w$
- **Height** $h$

> 💡 **Box formulas.**
>
> $$\text{Surface Area} = 2(\ell w + h\ell + hw)$$
>
> $$\text{Volume} = \ell w h$$

### Diagonal of a Box

A **diagonal of a box** is a segment from a vertex to the opposite vertex. By drawing face diagonal $AC$, we form right triangles $ABC$ and $EAC$, giving:

$$AC = \sqrt{BC^2 + AB^2} = \sqrt{\ell^2 + w^2}$$

$$EC = \sqrt{AC^2 + AE^2} = \boxed{\sqrt{\ell^2 + w^2 + h^2}}$$

---

### Example 18-6
*Find the volume of a box which has diagonal length $\sqrt{35}$ and two dimensions 1 and 5.*

**Solution:** From the diagonal formula: $35 = 1 + 25 + h^2$, so $h^2 = 9$ and $h = 3$. The volume is $\ell w h = 1 \cdot 5 \cdot 3 = \boxed{15}$.

> Two notes: (1) We discard $h = -3$ since negative lengths are impossible. (2) We tacitly assumed the given dimensions were the length and width, but they could be any two of the three dimensions — the names $\ell$, $w$, $h$ have no intrinsic meaning, and only differentiate the three axes.

---

### Example 18-7
*Given that the areas of three faces of a rectangular solid are 24, 32, and 48, find the volume of the solid.*

**Solution:** Let the dimensions be $x$, $y$, $z$. Then

$$xy = 24, \quad xz = 32, \quad yz = 48.$$

We could use trial and error to find $(x, y, z) = (4, 6, 8)$, but there's a slicker method. Multiply the three equations:

$$(xy)(xz)(yz) = (24)(32)(48)$$

$$x^2 y^2 z^2 = 2^{12} \cdot 3^2$$

$$(xyz)^2 = 2^{12} \cdot 3^2.$$

Taking the square root: $xyz = 2^6 \cdot 3 = \boxed{192}$. We never had to find the side lengths.

> 💡 **Why is this method better?** What if the areas had been $9\sqrt{6}$, $36\sqrt{3}$, and $54\sqrt{2}$? Trial and error would take forever — but this method still works in seconds.

---

**Exercise 18-5.** Find the number of 2-inch cubes required to fill a 4 inch by 8 inch by 10 inch box.

**Exercise 18-6.** In rectangular parallelepiped $ABCDEFGH$, $AB = 4$, $BC = 3$, $CG = 9$, $BY = 3$, and $DX = 5$. Find $XY$.

---

## 18.4 Prisms and Cylinders

### Prisms

A **prism** is a figure in which:

- The **bases** are two parallel and congruent faces.
- The **lateral faces** are parallelograms formed by connecting corresponding vertices of the bases.

The bases can be any geometric figure. A **regular prism** is one in which the bases are regular polygons (e.g., a *regular hexagonal prism* has hexagonal bases).

The **height** is the perpendicular distance between the bases.

> 💡 **Prism formulas.**
>
> - **Volume** = (base area) × height
> - **Total surface area** = sum of areas of all faces
> - **Lateral surface area** = sum of areas of lateral faces only

A **right prism** is one in which the lateral edges are perpendicular to the bases. Cubes and boxes are right prisms.

### Cylinders

A **cylinder** is a prism whose bases are *curved* surfaces rather than polygons.

- A **circular cylinder** has circular bases.
- A **right circular cylinder** is a right prism whose bases are circles. (A typical can.)

The line joining the centers of the bases is the **axis**. Generally, "cylinder" without qualification means a right circular cylinder.

> 💡 **Cylinder formulas.** For a cylinder with height $h$ and radius $r$:
>
> $$\text{Volume} = \pi r^2 h$$
>
> $$\text{Lateral Surface Area} = 2\pi h r$$
>
> $$\text{Total Surface Area} = 2\pi h r + 2\pi r^2$$

### Why $2\pi h r$? — The "Unrolling" Argument

Consider cutting the curved surface along a vertical line $AB$ and "unrolling" it. We get a **rectangle** with:

- One side equal to the altitude $h$
- The other side equal to the circumference $2\pi r$ of the bases

> *[Figure: A cylinder being unrolled into a rectangle of dimensions $h \times 2\pi r$]*

> **If you don't follow this:** Get a can and wrap a piece of paper around it. The curved surface really is a rectangle.

---

### Example 18-8
*Show that the lateral surface area of a right prism is given by the product of the perimeter of one of the bases and the altitude of the prism.*

**Proof:** Each face of a right prism is a rectangle. Two sides of each rectangle are lateral edges and equal the altitude $h$ of the prism. The other two sides are corresponding sides of the bases. Letting the lengths of the sides of the base be $x_1, x_2, \ldots, x_i$, the sum of the face areas is

$$x_1 h + x_2 h + \cdots + x_i h = (x_1 + x_2 + \cdots + x_i) h = p h,$$

where $p$ is the perimeter of the base. $\blacksquare$

---

**Exercise 18-7.** Find the total surface area of a cylinder whose height is 5 and volume is $45\pi$.

---

### Example 18-9 (The Ant on the Cylinder)
*An ant is on the edge of the top of a cylinder. The ant wishes to crawl to a point diagonally across at the base of the cylinder. If the cylinder is 8 inches high with diameter 4 inches, what is the shortest distance the ant may crawl?* *(MAΘ 1992)*

**Solution:** The ant must crawl along the *outside surface*, so we are not just looking for the straight line $AB$ inside the cylinder. Instead, we must "unroll" the surface and find $AB$ on the resulting rectangle.

Since $B$ is directly opposite $A$, on the unrolled rectangle $B$ is the midpoint of one side. The horizontal distance from $A$'s starting column $C$ to $B$ is half the circumference:

$$CB = \frac{2\pi r}{2} = \pi r = 2\pi.$$

Since $AC$ equals the height: $AC = 8$. By the Pythagorean Theorem:

$$AB = \sqrt{AC^2 + CB^2} = \sqrt{64 + 4\pi^2} = \boxed{2\sqrt{16 + \pi^2}}.$$

> 💡 **Key technique:** We turned a 3D problem into a 2D one by **unrolling** the cylinder's surface.

---

**Exercise 18-8.** What is the greatest possible distance in space between two points on a right circular cylindrical can with radius 4 and height 6?

---

## 18.5 Pyramids and Cones

### Pyramids

> *[Figure: A square pyramid in 3D perspective with apex at the top and a square base below; lateral faces drawn]*

A solid figure with one polygonal face and all other faces triangles meeting at a common vertex is called a **pyramid**.

- The common vertex is the **vertex** (or apex) of the pyramid.
- The polygonal face is the **base**.
- The triangles with the common vertex are the **lateral faces**.
- The **altitude** $h$ is the perpendicular distance from the vertex to the base.

> 💡 **Pyramid volume formula.** If $A$ is the area of the base and $h$ is the altitude:
>
> $$\text{Volume} = \frac{Ah}{3}.$$

A **regular pyramid** has a regular polygon as its base, with the vertex directly above the center of the base, so all lateral faces are congruent triangles. The common altitude of these faces from the apex is called the **slant height** $\ell$.

> 💡 **Lateral surface area of a regular pyramid:**
>
> $$\text{Lateral Surface Area} = \frac{p \ell}{2},$$
>
> where $p$ is the base perimeter and $\ell$ is the slant height.

---

### Example 18-10
*Show that the lateral surface area of a regular pyramid with base perimeter $p$ and slant height $\ell$ is $p\ell/2$.*

**Proof:** The slant height is the altitude of the lateral faces drawn to the sides of the base. Letting the base side length be $s$ and the number of sides of the base be $n$, each lateral face has area $s\ell/2$. The total lateral surface area is $ns\ell/2$. Since $ns = p$ (the perimeter), the lateral surface area is $p\ell/2$. $\blacksquare$

---

### Cones

> *[Figure: A right circular cone with apex at top, circular base at bottom, showing altitude $h$, radius $r$, and slant height $\ell$]*

A **cone** is a pyramid with a curve as a base.

- A **circular cone** has a circle as a base.
- A **right circular cone** is a regular pyramid with a circular base — the apex is directly above the center of the base.

The **slant height** $\ell$ of a right circular cone is the distance from the apex to the boundary of the base.

> 💡 **Cone formulas.** For a right circular cone with radius $r$, altitude $h$, and slant height $\ell$:
>
> $$h^2 + r^2 = \ell^2 \quad \text{(by Pythagorean Theorem)}$$
>
> $$\text{Volume} = \frac{\pi r^2 h}{3}$$
>
> $$\text{Lateral Surface Area} = \pi r \ell$$

### The Cone-Unrolling Argument

> *[Figure: A cone being unrolled into a sector of radius $\ell$ with arc length $2\pi r$]*

Cut along a slant height $AB$ and unroll. Since the distance from $A$ to any point on the boundary is constant (= $\ell$), the unrolled figure is a **sector** of a circle of radius $\ell$. The arc length equals the circumference of the cone's base, $2\pi r$.

> **If you don't follow:** Go to an ice cream store, get a paper cone, and cut it along a slant height instead of ripping the paper off.

---

### Example 18-11
*Find the total surface area of a right circular cone with radius 5 and altitude 12.*

**Solution:** Base area: $5^2 \pi = 25\pi$. The slant height comes from the right triangle:

$$\ell = \sqrt{5^2 + 12^2} = 13.$$

Total surface area:

$$25\pi + \pi(5)(13) = \boxed{90\pi}.$$

---

**Exercise 18-9.** Prove that the lateral surface area of a cone with radius $r$ and slant height $\ell$ is $\pi r \ell$. *(Hint: "Unroll" the curved surface and find the area of the resulting sector.)*

**Exercise 18-10.** Find the volume of a cone whose vertex is the center of a sphere of radius 5 and whose base is the intersection of this sphere with a plane 3 units away from the sphere's center.

---

## 18.6 Polyhedra

A **polyhedron** is a solid figure whose faces are planar polygons. There are no curved surfaces in a polyhedron. Cubes, parallelepipeds, prisms, and pyramids are all examples of polyhedra.

A **regular polyhedron** is one whose faces are all congruent regular polygons. There are exactly five of these — the **Platonic solids** — to be proven in Volume 2.

### The Five Regular Polyhedra

> *[Figure: The five Platonic solids — tetrahedron, cube, octahedron, dodecahedron, and icosahedron — drawn side by side]*

| Name | Shape of Faces | # Faces | # Vertices | # Edges |
|------|----------------|---------|------------|---------|
| Tetrahedron | triangles | 4 | 4 | 6 |
| Hexahedron (Cube) | squares | 6 | 8 | 12 |
| Octahedron | triangles | 8 | 6 | 12 |
| Dodecahedron | pentagons | 12 | 20 | 30 |
| Icosahedron | triangles | 20 | 12 | 30 |

### Euler's Polyhedron Formula

Looking at the table, notice that the number of edges is 2 less than the sum of faces and vertices. This is no accident:

> 💡 **Euler's Formula.** For *any* polyhedron, regular or not:
>
> $$V + F - E = 2.$$

Although the five Platonic solids are the only *regular* polyhedra, they are not the only polyhedra whose faces are regular polygons. (Look at a soccer ball — the hexagons and pentagons are all regular polygons.)

---

### Example 18-12 (Tetrahedron Volume)
*Find the volume of a regular tetrahedron with side length 1.*

> *[Figure: A regular tetrahedron $ABCD$ with apex $B$ above equilateral base $ACD$, with centroid $O$ of the base, midpoint $M$ of $CD$, and altitude $BO$ drawn]*

**Solution:** A tetrahedron is just a regular pyramid with a triangular base. We need the area of the base and the altitude.

**Base area:** Equilateral triangle with side 1: $\dfrac{1^2 \sqrt{3}}{4} = \dfrac{\sqrt{3}}{4}$.

**Altitude:** The foot of the altitude is the centroid $O$ of the equilateral base $\triangle ACD$. Connecting $O$ to vertex $A$ via midpoint $M$ of $CD$:

- $\triangle AMD$ is a $30°$-$60°$-$90°$ triangle, so $AM = \dfrac{\sqrt{3}}{2} \cdot AD = \dfrac{\sqrt{3}}{2}$.
- $O$ is the centroid, so $AO = \dfrac{2}{3} AM = \dfrac{\sqrt{3}}{3}$.

By the Pythagorean Theorem on $\triangle ABO$ (with $AB = 1$ as the slant edge):

$$BO = \sqrt{AB^2 - AO^2} = \sqrt{1 - \frac{1}{3}} = \sqrt{\frac{2}{3}} = \frac{\sqrt{6}}{3}.$$

**Volume:**

$$V = \frac{[ACD] \cdot BO}{3} = \frac{1}{3}\left(\frac{\sqrt{3}}{4}\right)\left(\frac{\sqrt{6}}{3}\right) = \boxed{\frac{\sqrt{2}}{12}}.$$

---

### Example 18-13 (Octahedron Volume)
*Find the volume of a regular octahedron with side length 1.*

> *[Figure: A regular octahedron split into two square pyramids sharing base $ABCD$, with apex $E$ above and apex $F$ below; center $O$ of the square shown with diagonal cross-section $EAFC$]*

**Solution:** Split the octahedron into two pyramids with a common square base $ABCD$ (with $E$ above and $F$ below). Find one pyramid's volume and double.

**Base area:** Unit square has area 1.

**Height:** Form right triangle $\triangle EOA$ where $O$ is the center of square $ABCD$. The segment $OA$ is half a diagonal of $ABCD$, so $OA = \dfrac{\sqrt{2}}{2}$. By the Pythagorean Theorem on $\triangle EOA$ with $EA = 1$:

$$EO = \sqrt{1 - \frac{1}{2}} = \frac{\sqrt{2}}{2}.$$

> 💡 **Slicker observation:** $EO$ is half the diagonal of square $EAFC$ (a "vertical" cross-section of the octahedron), and as such, $EO = \dfrac{\sqrt{2}}{2}$ directly. Cleverly choosing the 2D figure (square $EAFC$ rather than triangle $EAO$) saves work.

**Volume of octahedron** = 2 × (pyramid volume):

$$V = 2 \cdot \frac{[ABCD] \cdot EO}{3} = \frac{2}{3}(1)\left(\frac{\sqrt{2}}{2}\right) = \boxed{\frac{\sqrt{2}}{3}}.$$

> **Challenge:** $EAFC$ is clearly a rhombus. How would you prove it is a square?

---

## 18.7 How to Solve 3D Problems

> 💡 **Master strategies for 3D problems:**

**For volume / surface area of complicated figures:**

- **Dissect** the figure into pieces whose volume or surface area you can find. (This is how we found the octahedron's volume.)
- In extreme cases, find a *larger* object containing the figure and **subtract** the parts not in the desired object.

**For lengths, areas, or angles in 3D:**

> Three-dimensional problems are **disguised two-dimensional problems**.

- Looking for a length? Consider a particular plane (or triangle) containing that length.
- Same goes for angles and areas.
- Perpendicular lines are very useful — right triangles are at the heart of many solutions.

By working on the problems at the end of this chapter, you will master applying 2D principles to 3D problems.

---

## Problems to Solve for Chapter 18

**303.** The sum of the lengths of all the edges of a cube is 144 inches. What is the number of inches in the length of a diagonal of the cube? *(MATHCOUNTS 1989)*

**304.** A 5 inch by 8 inch rectangular sheet of paper can be rolled up to form either of two right circular cylinders, a cylinder with height 8 inches or a cylinder with height 5 inches. What is the ratio of the volume of the 8 inch tall cylinder to the volume of the 5 inch tall cylinder? *(MATHCOUNTS 1989)*

**305.** How many triangular faces does a pyramid with 10 edges have? *(MATHCOUNTS 1992)*

**306.** Regular hexagon $JKLMNO$ intersects the edges of a cube at the midpoints of the cube's edges. What is the ratio of the area of the hexagon to the total surface area of the cube? *(MAΘ 1990)*

**307.** The surface area of a cube is numerically equal to twice its volume. Find the length of a diagonal of the cube. *(MATHCOUNTS 1988)*

**308.** Find the radius of a right circular cone if its volume is 1.5 times its lateral surface area and its radius is half its slant height. *(MAΘ 1990)*

**309.** A cube is inscribed in a sphere. Find the ratio of the surface area of the sphere to the surface area of the cube. *(MAΘ 1992)*

**310.** If $h$ is the height of a rectangular solid room and the areas of two adjacent walls are $a$ and $b$, what is the area of the floor in terms of $a$, $b$, and $h$? *(MATHCOUNTS 1990)*

**311.** Liquid $X$ does not mix with water. Unless obstructed, it spreads out on the surface of water to form a circular film 0.1 cm thick. A rectangular box measuring 6 cm by 3 cm by 12 cm is filled with liquid $X$. Its contents are poured onto a large body of water. What will be the radius, in cm, of the resulting circular film? *(AHSME 1991)*

**312.** The radius of a cylindrical box is 8 inches and the height is 3 inches. Find the number of inches that may be added to either the radius or the height to give the same non-zero increase in volume. *(AHSME 1951)*

**313.** A paper cone, when cut along its slant height and opened out, forms a semicircle of radius 10. What is the altitude of the original cone? *(MAΘ 1987)*

**314.** Four of the eight vertices of a cube are vertices of a regular tetrahedron. Find the ratio of the surface area of the cube to the surface area of the tetrahedron. *(AHSME 1980)*

**315.** Consider the unit cube $ABCDEFGH$. Let $X$ be the center of the face $ABCD$. Find $FX$. *(MAΘ 1992)*

**316.** A wooden cube with edge length $n$ units (where $n$ is an integer $> 2$) is painted black all over. By slices parallel to its faces, the cube is cut into $n^3$ smaller cubes each of unit edge length. If the number of smaller cubes with just one face painted black is equal to the number of smaller cubes completely free of paint, what is $n$? *(AHSME 1985)*

**317.** A wooden cube has edges of length 3 meters. Square holes of side one meter, centered in each face, are cut through to the opposite face. The edges of the holes are parallel to the edges of the cube. Find the entire surface area, including the inside. *(AHSME 1982)*

**318.** A cube of side 3 inches has a cube of side 1 inch cut from each corner. A cube of side 2 inches is then inserted in each corner. What is the number of square inches in the surface area of the resulting solid? *(MATHCOUNTS 1991)*

**319.** In a rectangular solid, $\angle DHG = 45°$ and $\angle FHB = 60°$. Find the cosine of $\angle BHD$. *(AHSME 1982)*

**320.** A truncated octahedron is a geometric solid with 14 faces (6 congruent squares and 8 congruent hexagons). In this particular solid, 2 hexagons and 1 square meet to form each corner. How many corners does the solid have? *(MATHCOUNTS 1984)*

**321.** What is the volume of a regular octahedron whose vertices are the centers of the faces of a cube whose edge has length 6? *(MATHCOUNTS 1985)*

**322.** A ball of radius $R$ is tangent to the floor and one wall of the room. Find, in terms of $R$, the radius of the largest sphere that can be rolled through the space between the ball, the wall, and the floor. *(MAΘ 1992)*

**323.** The water tank in the diagram is in the shape of an inverted right circular cone. The radius of its base is 16 feet, and its height is 96 feet. What is the height, in feet, of the water in the tank if the amount of water is 25% of the tank's capacity? *(MATHCOUNTS 1992)*

**324.** A truncated icosahedron is a polyhedron which has 32 faces, 60 vertices, and 90 edges. Some of the faces are pentagons and the others are hexagons. Exactly two hexagons and a pentagon meet to form each vertex of the polyhedron. How many of the faces of this solid are hexagons? *(MATHCOUNTS 1988)*

**325.** Find the distance from vertex $B$ to face $ACD$ if $ABCD$ is a regular tetrahedron with side length 6.

**326.** Nine congruent spheres are packed inside a unit cube in such a way that one of them has its center at the center of the cube and each of the others is tangent to the center sphere and to three faces of the cube. What is the radius of each sphere? *(AHSME 1990)*

**327.** A right circular cone with radius 6 and height 6 is cut by a plane parallel to base and 2 units away from the base. What is the volume of the cone contained between the plane and the base?

**328.** Three cubes are stacked as shown. If the cubes have edge lengths 1, 2, and 3, what is the length of the portion of segment $AB$ that is contained in the center cube? *(MATHCOUNTS 1991)*
