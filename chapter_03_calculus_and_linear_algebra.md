# Chapter 3: Calculus and Linear Algebra

> **Book:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou  
> **Chapter:** 3  
> **Topic:** Calculus and Linear Algebra

## Chapter Overview

Calculus and linear algebra form the mathematical backbone of quantitative finance. This chapter covers the core concepts most frequently tested in quant interviews: limits and derivatives, integration techniques, partial derivatives, key calculus methods (Taylor series, L'Hôpital's rule), ordinary differential equations, and linear algebra fundamentals. Problems range from basic derivative/integral calculations to eigenvalue problems and vector geometry.

**Sections:**

- **3.1** — Limits and Derivatives
- **3.2** — Integration
- **3.3** — Partial Derivatives and Multiple Integrals
- **3.4** — Important Calculus Methods
- **3.5** — Ordinary Differential Equations
- **3.6** — Linear Algebra


---

## Table of Contents

- [3.1 Limits and Derivatives](#31-limits-and-derivatives)
- [3.2 Integration](#32-integration)
- [3.3 Partial Derivatives and Multiple Integrals](#33-partial-derivatives-and-multiple-integrals)
- [3.4 Important Calculus Methods](#34-important-calculus-methods)
- [3.5 Ordinary Differential Equations](#35-ordinary-differential-equations)
- [3.6 Linear Algebra](#36-linear-algebra)

---

## 3.1 Limits and Derivatives {#31}

### Basics of derivatives

Let's begin with some basic definitions and equations used in limits and derivatives. Although the notations may be different, you can find these materials in any calculus textbook. **Derivative definition:**

```
f'(x) = dy/dx = lim_{Dx->0} [f(x+Dx) - f(x)] / Dx
```

**Product rule:** `d(uv)/dx = u*(dv/dx) + v*(du/dx)`

**Quotient rule:** `d(u/v)/dx = [v*u' - u*v'] / v^2`

**Chain rule:** `dy/dx = (dy/du) * (du/dx)`

**Generalized power rule:** `d(y^n)/dx = n*y^(n-1) * dy/dx`

**Key formulas:**
```
d/dx(e^u) = e^u*du/dx     d/dx(ln u) = (1/u)*du/dx
d/dx(sin x) = cos x       d/dx(cos x) = -sin x
d/dx(tan x) = sec^2(x)
a^x = e^(x*ln a)          lim_{x->0} sin(x)/x = 1
e^x = lim_{n->inf}(1+x/n)^n
``` What is the derivative of y = In xlnx 71

> **Solution:**
> This is a good problem to test your knowledge of basic derivative formulas— specifically, the chain
> rule and the product rule. Let w = ln>> = ln(lnxlnjr) = lnxxln(lnx). Applying the chain rule and the
> product rule, we have du_d(\ny)_ 1 dy _ d(ln x) ^ x) , ln x x 4ln(ln *)) = ln(ln x) | In x dx dx y
> dx dx dx xxlnx ^ j . </(ln(lnx)) . . ? , . To derive — -, we again use the chain rule by setting v =
> ln x : </(ln(lnx)) d(lnv)dv _\

_

<& dv dx v x x\nx I dy ln(lnx) lnx dy y,. n x ^ lnx,n*,. n . ^ .*. —- = — - + ⟹ — = — (ln(lnx) + l) = (ln(lnx) + l). y dx x x\nx dx x x

### Maximum and minimum

Derivative f'(x) is essentially the slope of the tangent line to the curve y = f(x) and the instantaneous rate of change (velocity) of y with respect to x. At point x = c, if

 f(c) > 0, f(x) is an increasing function at c; if / f(c) < 0, f(x) is a decreasing function at c. Local maximum or minimum: suppose that f(x) is differentiable at c and is defined on an open interval containing c. If f(c) is either a local maximum value or a local minimum value of f(x\ then / \c) = 0. Second Derivative test: Suppose the second derivative of f{x\ /"(*)> is continuous near c. If f\c) = 0 and f"{c) > 0, then f(x) has a local minimum at c; if /f(c) = 0 and /"(c) < 0, then./(x) has a local maximum at c. Without calculating the numerical results, can you tell me which number is larger, `e^pi` or `pi^e`?

> **Solution:**
> Let's take natural logs of en and ne. On the left side we have n\ne, on the right side we have eInn.
> If en>ne, eK >xe oπ·x/e>exXnxo > . e n lnx Is it true? That depends on whether f(x) = is an
> increasing or decreasing function x 1 / x x x — In x

— In x from e to n. Taking the derivative of f(x), we have f'(x) = = = —, x x which is less than 0 when x>e (lnx>l). In fact, f(x) has global maximum when r> ii n o ^ne ^(nπ) An e x = e for all x > 0. So > and e > n: . e n Alternative approach: If you are familiar with the Taylor's series, which we will discuss

x x2 x3 in Section 3.4, you can apply Taylor's series toe*: ex =^— = 1 + —+ — + — + ??? So w=o ^ ? A ? ^ ? *. e* >l + x, Vx>0. Let x = π/e−1, then e^(n/e)·e > n/e·e^n ... → e^π > π^e <⟹ eWe >^<⟹ e^π > π^e.

### L'Hospital's rule

Suppose that functions f(x) and g(x) are differentiable at x → a and that limg'(a) * 0. Further suppose that lim/(a) = 0 and limg(a) = 0 or that lim f(a) → ±∞ and

Hint: Again consider taking natural logs on both sides; \na>hib=>a>b since Inx is a monotonically increasing function.

f(x) f \x) limg(a)-?±∞, then lim = lim . L'Hospital's rule converts the limit from an indeterminate form to a determinate form. What is the limit of ex I x2 as x —? ∞, and what is the limit of x2 In x as x → 0+ ? ex

> **Solution:**
> lim— is a typical example of L'Hospital's rule since lime* =∞ and limx2 =∞. Applying L'Hospital's
> rule, we have v fix) v ex y f'(x) v ex lim = lim— = lim = lim—. *~>fl gix) *"*" x x-^co g \x) *■+?>
> 2x The result still has the property that lim/(x) = lime* = ∞ and limg(x) = lim2x = ∞, so we can
> apply the L' Hospital's rule again: r fix) v ex y f'(x) v ex y d(ex)/dx y ex \\m:L^-L = lim — = lim*7
> = lim— = lim—-— = lim— = ∞. jr~>Q0 g(x) *-*" x *->°° g \x) *->°° 2x *->* d{2x) I dx ^°° 2 At first
> look, L'Hospital's rule does not appear to be applicable to lim x2 lnx since it's x-+0+ r / \

> Rewrite: lim_{x->0+} (ln x)/(x^{-2}). By L'Hospital: lim x^2*ln x = lim (1/x)/(-2/x^3) = lim(-x^2/2) = 0

## 3.2 Integration {#32}

### Basics of integration

Again, let's begin with some basic definitions and equations used in integration. If we can find a function F(x) with derivative f(x\ then we call F(x) an antiderivative of f(x). lff(x) = F\x)9 ∫f(x)dx = F(b)−F(a) = [F{x)]ha = F{b)-F{a) and it becomes obvious that lim x 2 = ∞ and lim In x = -∞. So we can now apply x->0+ x-+0+ ..

,. fox t. d(\nx)/dx ,. l/x t. x2 lim x In x = lim —— = lim r^ = lim = lim — = 0

^P = f(x), F{a) = ya^ F(x) = ya+[ f(t)dt k+\ The generalized power rule in reverse: \ukdu = + c (k*l), where c is any J k+1 constant. Integration by substitution: {/(g(*)) ? g \x)dx = \f{u)du with u = g(x\ du = g \x)dx Substitution in definite integrals: \ f(g(x)) ? g \x)dx = \ f(u)du Ja Jg(a) Integration by parts: \udv = uv- \vdu

### Problem A

**What is the integral of ln(x)?**

> **Solution:**
> This is an example of integration by parts. Let u = \nx and v = x, we have d(uv) = vdu + udv = (xx 1
> / x)dx + In xdx, .'. Jin xdx = x In x - \dx = x In x - x + c, where c is any constant.

### Problem B

**What is the integral of sec(x) from x = 0tox= kI61**

> **Solution:**
> Clearly this problem is directly related to differentiation/integration of trigonometric functions.
> Although there are derivative functions for all basic trigonometric functions, we only need to
> remember two of them: —sinx = cosx, dx —cosx = -sin x. The rest can be derived using the product
> rule or the quotient rule. For dx example, dsecx d(l/cosx) sinx = secxtanx, dx dx cos2 x dtanx
> J(sinx/cosx) cos2 x + sin2x

dx dx cos2 x d(secx + tanx) = sec x. dx :secx(secx + tanx).

Since the (secx + tanx) term occurs in the derivative, we also have din | secx + tanx | secx(secx + tanx) = secx dx (secx + tanx) ⟹ fsecx=ln|secx + tanx|+c f/6 j— sec x = ln(sec(;r / 6) + tan(> / 6)) - ln(sec(0) + tan(O)) = ln(v 3 )

### Applications of integration

### Problem A

**Suppose that two cylinders each with radius 1 intersect at right angles and their centers also intersect. What is the volume of the intersection?**

> **Solution:**
> This problem is an application of integration to volume calculation. For these applied problems, the
> most difficult part is to correctly formulate the integration. The general integration function to
> calculate 3D volume is V - P A{z)dz where A(z) is the cross-sectional area of the solid cut by a
> plane perpendicular to the z-axis at coordinate z. The key here is to find the right expression for
> cross-sectional area A as a function of z. Figure 3.1 gives us a clue. If you cut the intersection
> by a horizontal plane, the cut will be a square with side-length \/(2r) -(2z) . Taking advantage of
> symmetry, we can calculate the total volume as 2xf|"(2r)2-(2z)2l/z = 8x[r2z-z3/3j=16/3r3=16/3. An
> alternative approach requires even better 3D imagination. Let's imagine a sphere that is inscribed
> inside both cylinders, so it is inscribed inside the intersection as well. The sphere should have a
> radius of r/2. At each cut perpendicular to the z-axis, the circle from the sphere is inscribed in
> the square from the intersection as well. So Airde = T^quare' Since it's true for all z values, we
> have y =4.w(iL\3 =2Ly ⟹ y =16/3r3=16/3 rsphere 3 JL\2' 4 Vmlersection ~^ 'intersection 1U/jr 1U/J"


### Problem B

**The snow began to fall some time before noon at a constant rate. The city of Cambridge sent out a snow plow at noon to clear Massachusetts Avenue from MIT to Harvard. The plow removed snow at a constant volume per minute. At 1 pm, it had moved 2 miles and at 2 pm, 3 miles. When did the snow begin to fall?**

> **Solution:**
> Let's denote noon as time 0 and assume snow began to fall T hours before noon. The speed at which
> the plow moves is inversely related to the vertical cross- sectional area of the snow: v = c, / A(t\
> where v is the speed of the plow, c, is a constant representing the volume of snow that the plow can
> remove every hour and A(t) is the cross-sectional area of the snow. If / is defined as the time
> after noon, we also have A(t) = c2(t + T), where c2 is the rate of cross-sectional area increase per
> hour (since the c c c snow falls at a constant rate). So v =

= where c = —. Taking the c2(t + T) t + T c2 integration, we have t C -<# = cln(l + r)-clnr = cln[—1 = 2, T + t { T

C ^ = cln(2 + r)-cln7, = cln|^^| = 3 T + t From these two equations, we get T2-r+i=o=>r=(√5-i)/2.

Overall, this question, although fairly straightforward, tests analytical skills, integration knowledge and algebra knowledge. Expected value using integration Integration is used extensively to calculate the unconditional or conditional expected value of continuous random variables. In Chapter 4, we will demonstrate its value in probability and statistics. Here we just use one example to show its application: IfX is a standard normal random variable, X ~ N(0, 1), what is E[X \ X > 0] ?

> **Solution:**
> Since X- N(0,1), the probability density function of x is f(x) = -j=e~U2x and we have E[X \ X > 0] =
> ∫xf(x)dx = j^x-^"172*'dx. Because d(-l/2x2) = -x and \eudy = eu+c, where c is an arbitrary constant,
> it is obvious that we can use integration by substitution by letting u = -l/2x2. Replace e~U2x with
> eu and xdx with -du, we have determined by x = 0⟹ w = 0 and x = ∞ ⟹ u = -∞. Therefore `E[X | X > 0] = 1/sqrt(2*pi) ~= 0.7979`

## 3.3 Partial Derivatives and Multiple Integrals {#33}

Partial derivative: w = f(x,y) ⟹ ^(x0,y0) = lim f(xo+Ax,y0)-f(x0,y0) = dx to-*0 Ax d^∫=±^% d2f _d(df)=d(Qf) dx2 dx dx ' dxdy dx dy dy dxJ Second order partial derivatives: -^ = — (-^-), ^ = — (-^-) = —(t~) The general chain rule: Suppose that w = /(xpx2,--,xm) and that each of variables jtp x2, ???, xm is a function of the variables /,, t2, ???, /?. If all these functions have . , - . dw dw dx, dw dx, dw dx . continuous first-order partial derivatives, then — = L + - + ??? + — for dt. dx, dti dx2 dtt dxm dti each /, 1 < / < n.

Changing Cartesian integrals into polar integrals: The variables in two-dimension plane can be mapped into polar coordinates: x = rcosO, y = rsinO. The integration in a continuous polar region R is converted to jT/(x, y)dxdy = \\f(r cos 0, r sin 0) r dr dO. Calculate Te~xl'2dx.

> **Solution:**
> Hopefully you happen to remember that the probability density function (pdf)

- 2 /? of the standard normal distribution is f(x) = .— e x . By definition, we have 1/√(2π) If you've forgotten the pdf of the standard normal distribution or if you are specifically ∫1 - 2 ii I—e x dx-\, you will need to use polar integrals to solve the problem: = f Ce-r2/2rdrdO=-[e-'-2/2d(-r2/2)^d0 Since [ae-x2/2dx=∫oe-y2/2dy,wehave^jTx2l2dx = Jl^^ ^e~x2/2dx = J-.

## 3.4 Important Calculus Methods {#34}

### Taylor's series

One-dimensional Taylor's series expands function f(x) as the sum of a series using the derivatives at a point x = x0: f(x) = f(x0) + fXx0)(x-xo) +∫^(x-xo)2+...+∫^(x-x0y+--- 2! n\

Ifx0=0, f(x) = f(Q) + fX0)x +∫^x2+---+∫^p-x"+--- 2! n\ Taylor's series are often used to represent functions in power series terms. For example, Taylor's series for three common transcendental functions, ex, sinx and cosx , at x0 = 0 are ```
e^x   = 1 + x + x^2/2! + x^3/3! + ...
sin x = x - x^3/3! + x^5/5! - x^7/7! + ...
cos x = 1 - x^2/2! + x^4/4! - x^6/6! + ...
``` The Taylor's series can also be expressed as the sum of the wth-degree Taylor polynomial T^x) = f(x0) + fXx0)(x-x0) +l^(x-x0)2+--- +l^^(x-xoy and 2! n\ a remainder Rn (x): f{x) = Tn (x) + Rn (x). For some x between x0 andx, R?(x) = —\x-x0 |"+1 . Let Mbe the maximum of (n + l)\ \f{n+])(x)\ for all x between x0 and x, we get constraint |/?w(x)|< Mx \x-x0\n (w + 1)!

### Problem A

**What is /'?**

> **Solution:**
> The solution to this problem uses Euler's formula, e'° =cos# + /sin#, which can be proven using
> Taylor's series. Let's look at the proof. Applying Taylor's series to `e^(i*theta)`:

```
e^(i*theta) = 1 + i*theta + (i*theta)^2/2! + (i*theta)^3/3! + ...
            = 1 + i*theta - theta^2/2! - i*theta^3/3! + theta^4/4! + ...

cos(theta) = 1 - theta^2/2! + theta^4/4! - ...
i*sin(theta) = i*theta - i*theta^3/3! + i*theta^5/5! - ...
```

Combining: `e^(i*theta) = cos(theta) + i*sin(theta)` (Euler's formula).
- When theta=pi: `e^(i*pi) = -1`
- When theta=pi/2: `e^(i*pi/2) = i`, so `ln(i) = i*pi/2`
- Therefore: `i^i = e^(i*ln(i)) = e^(i*(i*pi/2)) = e^(-pi/2)`

### Problem B

**Prove that `(1 + x)ⁿ > 1 + nx` for all `x > −1` and for all integers `n ≥ 2`.**

> **Solution:**
> Let /(x) = (l + x)w. It is clear that l + nx is the first two terms in the Taylor's series of f(x)
> with x0 =0. So we can consider solving this problem using Taylor's series. For x0 = 0 we have (1 +
> x)n = 1 for V? > 2. The first and second derivatives of f(x) are f'(x) = n(\ + x)n_1 and /"(x) =
> ?(?-l)(l + x)w"2. Applying Taylor's series, we have /(*) = /(*o) + /K)(*-*o) +^^ = 1 + ?x + ?(?-1)(1
> + x)w"2jc2 where x<x<0 ifx<0 and x>Jc>0 ifx>0. Since jc>-1 and n> 2, we have ?>0, (n -1) > 0, (1 +
> x)n~2 > 0, x2 > 0. Hence, ?(?-l)(l +Jc)""2*2 >0 and f(x) = (l + x)" >l + nx. If Taylor's series does
> not jump to your mind, the condition that ? is an integer may give you the hint that you can try the
> induction method. We can rephrase the problem as: for every integer n > 2 , prove (1 + x)" > 1 + nx
> for x > -1. The base case: show (l + x)w > 1 + /ix,for all x > −1 when ? = 2, which can be easily proven
> since (1 + x)2 >1 + 2x + x² > 1 + 2x, for all x > −1. The induction step: show that if (l + x)w > 1 +
> hx,for all x > −1 when n = k, the same statement holds for n = k +1: (1 + x)k+x > 1 + (k + l)x, Vx > -1.
> This step is straightforward as well. 3 Clearly they satisfy equation U"2 V = /2 = e" = -1.

(l + x)*+1 =(1 + x)*(1 + x) >(l + fcc)(l + x) = l + (A: + l)x + kx², for all x > −1 >1 + (k+1)x So the statement holds for all integers n > 2 when x > -1.

### Newton's method

Newton's method, also known as the Newton-Raphson method or the Newton-Fourier method, is an iterative process for solving the equation f(x) = 0. It begins with an initial f(x ) value x0 and applies the iterative step xn+l = xn -——— to solve f(x) = 0 if jcpjc2,--- /'(*?) converge.4 Convergence of Newton's method is not guaranteed, especially when the starting point is far away from the correct solution. For Newton's method to converge, it is often necessary that the initial point is sufficiently close to the root; f(x) must be differentiable around the root. When it does converge, the convergence rate is quadratic, which means Xn+\ Xf (Xn~Xf) < ∫< 1, where xf is the solution to f(x) = 0.

### Problem A

**Solve x2 = 37 to the third digit.**

> **Solution:**
> Let f(x) = x2 -37, the original problem is equivalent to solving f(x) = 0. x0=6 is a natural initial
> guess. Applying Newton's method, we have fix.) x02-37 ^ 36-37 x =jcn- J ° =x0— = 6 = 6.083.

f\x0) 2x0 2x6 (6.0832 = 37.00289, which is very close to 37.) If you do not remember Newton's method, you can directly apply Taylor's series for function f(x) = yfx with f'(x) = jx~]/2: /(37) * /(36) + / '(36)(37 - 36) = 6 +1 /12 = 6.083 . 4 The iteration equation comes from the first-order Taylor's series: /(*..,) * /(*) + /'(*?)(*,? -x.) = 0 ⟹ *?., = *. f\xm)

Alternatively, we can use algebra since it is obvious that the solution should be slightly higher than 6. We have (6 + y)2 =37 ⟹ y2 +12>>-1 = 0. If we ignore the y2 term, which is small, then y = 0.083 and x = 6 + y = 6.083.

### Problem B

**Could you explain some root-finding algorithms to solve f(x) = 0 ? Assume f(x) is**

a differentiable function.

> **Solution:**
> Besides Newton's method, the bisection method and the secant method are two alternative methods for
> root-finding.5 Bisection method is an intuitive root-finding algorithm. It starts with two initial
> values a0and b0 such that f(a0)<0 and f(b0)>0. Since f(x) is differentiable, there must be an x
> between a0 and bQ that makes f(x) = 0. At each step, we check the sign of f((an+b?)/2). If f{(an +
> bn)/2)<0, we set bn+,=b? and an+i =(a? +6?)/2; If f((a?+b?)/2)>0, we set an+x=a? and b?+l =(a?
> +bn)/2; If f ((a? + b?) / 2) = 0, or its absolute value is within allowable error, the iteration
> stops and x = (an + bn) / 2. The bisection method converges linearly, — < 5 < 1, which means it is
> slower than xn - xf Newton's method. But once you find an a0/b0 pair, convergence is guaranteed.
> Secant method starts with two initial values x0, x, and applies the iterative step x — x xn+\=xn " ~
> f(xn)- ^ replaces the f\xn) in Newton's method with a /(*? )-/(*?-!) f(x ) _ f(x _ ) linear
> approximation -—-—-—tLj—. Compared with Newton's method, it does not Xn ~ Xn-\ require the
> calculation of derivative f\xn), which makes it valuable if f'(x) is difficult to calculate. Its
> convergence rate is (l + √5)/2, which makes it faster than the bisection method but slower than
> Newton's method. Similar to Newton's method, convergence is not guaranteed if initial values are not
> close to the root. Lagrange multipliers The method of Lagrange multipliers is a common technique
> used to find local maximums/minimums of a multivariate function with one or more constraints.6 5
> Newton's method is also used in optimization—including multi-dimensional optimization problems—to
> find local minimums or maximums.

Let f{xvx2,'",xn) be a function of n variables x = (xp x2, ???, xn) with gradient vector V/(x) = (-|^, J∫-,???, -J-^- V The necessary condition for maximizing or minimizing f(x) subject to a set ofk constraints is that V/(x) + A1Vg,(x) + ^2Vg2(x)+ ? + ^Vg/t(x) = 0, where A,,---,^ are called the Lagrange multipliers. What is the distance from the origin to the plane 2x + 3y + 4z = 12 ?

> **Solution:**
> The distance (D) from the origin to a plane is the minimum distance between the origin and points on
> the plane. Mathematically, the problem can be expressed as min D2 = f(x, y, z) = x2 +y2 + z2 sJ.
> g(x,y,z) = 2x + 3y + 4z-l2 = 0 Applying the Lagrange multipliers, we have Lagrange conditions:
```
2x + 2*lambda = 0, 2y + 3*lambda = 0, 2z + 4*lambda = 0
2x + 3y + 4z = 12 (constraint)
⟹ lambda = -24/29, x = 24/29, y = 36/29, z = 48/2, D = sqrt(x^2+y^2+z^2) = 12/sqrt(29)
``` In general, for a plane with equation ax + by + cz = d, the distance to the origin is \d\ D = 4? + b2+c2

## 3.5 Ordinary Differential Equations {#35}

In this section, we cover four typical differential equation patterns that are commonly seen in interviews. 6 The method of Lagrange multipliers is a special case of Karush-Kuhn-Tucker (K.KT) conditions, which reveals the necessary conditions for the solutions to constrained nonlinear optimization problems.

Separable differential equations dy A separable differential equation has the form — = g(x)h(y). Since it is separable, we dx can express the original equation as —— = g{x)dx. Integrating both sides, we have the h{y) solution J—— = \g{x)dx.

### Problem A

**Solve ordinary differential equation y'+ 6xy = 0, y(0) = 1**

> **Solution:**
> Let g(x) = -6x and h(y) = y, we have — = -6xdx. Integrate both sides of y the equation: \—= \-6xdx
> ⟹ Iny = -3x2 + c ⟹ y = e~3x +c, where c is a constant. J y J Plugging in the initial condition
> y(0) = 1, we have c = 0 and y-e -3xz

### Problem B

**Solve ordinary differential equation y' =**

— .7 x + y

> **Solution:**
> Unlike the last example, this equation is not separable in its current form. But we can use a change
> of variable to turn it into a separable differential equation. Let z = x + y, then the original
> differential equation is converted to d(z-x) x-(z-x) dz 2x 1= 1 ⟹ zdz = 2xdx ⟹ \zdz= \2xdx + i dx
> z dx z ⟹(x + y)2 =z2 =2x2 +c⟹ y2 +2xy-x2 =c First-order linear differential equations dy A first-
> order differential linear equation has the form — + P(x)y = Q(x). The standard dx approach to
> solving a first-order differential equation is to identify a suitable function /(x), called an
> integrating factor, such that I(x)(y'+ P(x)y) = I(x)y'+ I(x)P(x)y 7 Hint: Introduce variable z = x +
> y.

= (I(x)*y)'. Then I(x)*y = integral I(x)*Q(x)dx, where I(x) = e^(integral P(x)dx).

### Problem C

**Solve the ODE: y' + y/x = 1/x^2, y(1) = 1, x > 0.** x x

> **Solution:**
> This is a typical example of first-order linear equations with P(x) = — and x 0(x) = -L So /(x) =
> e^** = el(Ux)dx = e'nx = x and we have I{x)Q{x) = -. x x .: I(x)(y'+P(x)y) = (xyy = I(x)Q(x) = l/x
> Taking integration on both sides, xy = f(l/x)dx = lnx + c^> y = . Plugging in y(l) = 1, we get c = 1
> and y = . Homogeneous linear equations A homogenous linear equation is a second-order differential
> equation with the form a(x)^r +b(x)^ + c(x)y = 0. ax ax It is easy to show that, if yx and y2 are
> linearly independent solutions to the homogeneous linear equation, then any y(x) = c\yl(x) +
> c2y2(x)9 where c, and c2 are arbitrary constants, is a solution to the homogeneous linear equation
> as well. When a, b and c (a * 0) are constants instead of functions of x, the homogenous linear
> equation has closed form solutions: Let rx and r2 be the roots of the characteristic equation ar1 +
> br + c = 0,9 ; The constant c is not needed in this case since it just scales both sides of the
> equation by a factor.

1. If r, and r2 are real and rx * r2, then the general solution is y-cxer]X + c2elX; 2. If rx and r2 are real and rx = r2 - r, then the general solution is y = cxerx + c2xerx; 3. If r, and r2 are complex numbers a±ifi, then the general solution is y = eax (c, cos fix + c2 sin fix). It is easy to verify that the general solutions indeed satisfy the homogeneous linear solutions by taking the first and second derivatives of the general solutions. What is the solution of ordinary differential equation y"+ y f+ y = 0?

> **Solution:**
> In this specific case, we have a = b = c = 1 and b2 - Aac = -3 < 0, so we have complex roots r =
> -1/2±v3/2/ (or = -1/2, /? = v3/2), and the general solution to the differential equation is
> therefore y = eax (c, cos fix + c2 sin fix) = e~U2x [cx cos(√3 / 2x) + c2 sin(√3 / 2x)).
### Nonhomogeneous linear equations

Unlike a homogeneous linear equation `a*y'' + b*y' + c*y = 0`, a nonhomogeneous equation `a*y'' + b*y' + c*y = d(x)` has no closed-form solution in general. But if we can find a particular solution yD(x) for a-^-y- + &— + cy = d{x\
> then y = y (x) + y (x), where p dx dx p x d2y dy y (x) is the general solution of the homogeneous
> equation a—y + b— + cy = 0, is a * dx general solution of the nonhomogeneous equation a -fj + b-y- +
> cy = d(x).
> *Note: Quadratic formula: r = (-b +/- sqrt(b^2-4ac)) / (2a)*

Although it may be difficult to identify a particular solution yp(x) in general, in the special case when d(x) is a simple polynomial, the particular solution is often a polynomial of the same degree. What is the solution of ODEs y"+ y f+ y = 1 and y"+ y f+ y = x ?

> **Solution:**
> In these ODEs, we again have a = b = c = 1 and b2 - Aac = -3 < 0, so we have complex solutions r =
> -1/2±√3/2i (a = -l/2, J3 = y/3/2) and the general solution is jy = e~U2x (c, cos(√3 / 2jc) + c2
> sin(√3 / 2jc)). What is a particular solution for y"+ y'+y = 1? Clearly _y = l is. So the solution
> to y"+y'+y = l is >; = ^(x) + ^(x) = e",/2jr(c1cos(√3/2x) + c2sin(√3/2x)) + l. To find a particular
> solution for y"+ j> f+ y - x, Let .y (jc) = mx + ?, then we have <yB+<yl+iy = 0 + /in-(/wx + ?) =
> x=>/w = l,? = -l. So the particular solution is jc-1 and the solution to y"+ y f+ y - x is ^ = ^(x)
> + ^(x) = e",/2x(c1cos(√3/2x) + c2sin(√3/2x)) + (x-l).

## 3.6 Linear Algebra {#36}

Linear algebra is extensively used in applied quantitative finance because of its role in statistics, optimization, Monte Carlo simulation, signal processing, etc. Not surprisingly, it is also a comprehensive mathematical field that covers many topics. In this section, we discuss several topics that have significant applications in statistics and numerical methods. Vectors An n x 1 (column) vector is a one-dimensional array. It can represent the coordinates of a point in the R" (^-dimensional) Euclidean space.

Inner product/dot product: the inner product (or dot product) of two R" vectors x and n y is defined as ^xjyj = xTy i=\ Euclidean norm: |*| = */][]■** -^^^ \\x~y\\ = yj(x~y)T(x~ y) T X V Then angle 0 between R" vectors x axidy has the property that cosfl= . x and y are orthogonal if xTy = 0. The correlation coefficient of two random variables can be viewed as the cosine of the angle between them in Euclidean space (p = cos 0). There are 3 random variables x, y and z. The correlation between x and y is 0.8 and the correlation between x and z is 0.8. What is the maximum and minimum correlation between;; and z?

> **Solution:**
> We can consider random variables x, y and z as vectors. Let 0 be the angle between x and y, then we
> have cos 0 = pxy =0.8. Similarly the angle between x and z is 0 as well. For y and z to have the
> maximum correlation, the angle between them needs to be the smallest. In this case, the minimum
> angle is 0 (when vector y and z are in the same direction) and the correlation is 1. For the minimum
> correlation, we want the maximum angle between^ and z, which is the case shown in Figure 3.2. If you
> still remember some trigonometry, all you need is that cos(20) = (cos0)2-(sin0)2 = 0.82-0.62=0.28
> Otherwise, you can solve the problem using Pythagoras's Theorem: 0.8x1.2 = lxh^h = 0.96 z cos20 =
> Vl2-0.962 = 0.28 0.6 0.6 Figure 3.2 Minimum correlation and maximum angle between vectors y and z

QR decomposition QR decomposition: For each non-singular nxn matrix A, there is a unique pair of orthogonal matrix Q and upper-triangular matrix R with positive diagonal elements such that A = QR.]0 QR decomposition is often used to solve linear systems Ax = b when A is a non-singular matrix. Since Q is an orthogonal matrix, Q~x = QT and QRx = 6 ⟹ Rx = QTb. Because R is an upper-triangular matrix, we can begin with xn (the equation is simply Rnnxn = (QTb)n), and recursively calculate all x.9 Vi = n, n -1, ? ? ?, 1. If the programming language you are using does not have a function for the linear least squares regression, how would you design an algorithm to do so?

> **Solution:**
> The linear least squares regression is probably the most widely used statistical analysis method.
> Let's go over a standard approach to solving linear least squares regressions using matrices. A
> simple linear regression with n observations can be expressed as y-i = A*/.o + fi\xi,\ +''' +
> Pp-\xuP-\ + *,?? V/ = 1, ? ? ?, n, where xi0 = 1, V/, is the intercept term and xitX9'"9x. x are p-\
> exogenous regressors. The goal of the linear least squares regression is to find a set of y5 =
> [y50,yff1,---,y5/7_,]r n that makes ^∫?the smallest. Let's express the linear regression in matrix
> format: Y = Xj3 + ∫, where Y = [Y^Y2,---,Yn]T and = [e]9∫29'"9n]T are both nxl column vectors; X is
> a n x p matrix with each column representing a regressor (including the intercept) and each row
> representing an observation. Then the problem becomes min/(^) = minX^Nmin(r-X/?)r(r-^) 10 A
> nonsingular matrix Q is called an orthogonal matrix if Q"' = Q'. Q is orthogonal if and only if the
> columns (and rows) of Q form an orthonormal set of vectors in R". The Gram-Schmidt
> orthonormalization process (often improved to increase numerical stability) is often used for QR
> decomposition. Please refer to a linear algebra textbook if you are interested in the Gram-Schmidt
> process.

To minimize the function /(/?), taking the first derivative11 of f(j3) with respect to /?, we have f'(β) = 2XT(Y-XJ3) = 0 ⟹ (XTX)/3 = XTY, where (XTX) is a pxp symmetric matrix and XTY is a p x 1 column vector. Let A = (XTX) and b = XTY, then the problem becomes AJ3 = b, which can be solved using QR decomposition as we described. Alternatively, if the programming language has a function for matrix inverse, we can directly calculate p as J3 = {XTX)~x XTYn Since we are discussing linear regressions, it's worthwhile to point out the assumptions behind the linear least squares regression (a common statistics question at interviews): 1. The relationship between Y and X is linear: Y = Xfi + e. 2. E[∫i] = 09Vi = l, — 9n. 3. var(∫.)= σ², i = 1, ? ? ?, n (constant variance), and E\sisj ] = 0, i * j (uncorrelated errors). 4. No perfect multicollinearity: p(xi9x.)*±l, i*j where p(xi9x.) is the correlation of regressors x. and x.. 5. s and x( are independent. Surely in practice, some of these assumptions are violated and the simple linear least squares regression is no longer the best linear unbiased estimator (BLUE). Many econometrics books dedicate significant chapters to addressing the effects of assumption violations and corresponding remedies. Determinant, eigenvalue and eigenvector Determinant: Let A be an nxn matrix with elements {A. -}9 where i9j = l9~-9n. The determinant of A is defined as a scalar: det(A) = ^i//(p)al%pa1%p2"'an,Pn> where p p = (P\, p29u"9 P?) is any permutation of (1, 2, ???, n)\ the sum is taken over all n\ possible permutations; and 1' To do that, you do need a little knowledge about matrix derivatives. Some of the important derivative equations for vectors/matrices are *°JL = **± = a% **L = A% ^^ = (AT+A)x, aV^%2^ dx dx dx dx dxdxr d(Ax + b)TC(Dx + e) T T T — — = ATC(Dx + e) + DTC {Ax + b\ dx 12 The matrix inverse introduces large numerical error if the matrix is close to singular or badly scaled.

v(p) [l, if p can be coverted to natural order by even number of exchanges [ -1, if p can be coverted to natural order by odd number of exchanges For example, determinants of 2 x 2 and 3x3 matrices can be calculated as det a b c d -ad-be, det a b d e g h c f i aei + bfg + cdh - ceg -qfh- bdi.

Determinant properties: det(^r) = det(^), det(AB) = det(^) det(5), det(^_1) = det(^) Eigenvalue: Let A be an n x n matrix. A real number X is called an eigenvalue of A if there exists a nonzero vector x in R" such that Ax = Ax. Every nonzero vector x satisfying this equation is called an eigenvector ofA associated with the eigenvalue X. Eigenvalues and eigenvectors are crucial concepts in a variety of subjects such as ordinary differential equations, Markov chains, principal component analysis (PCA), etc. The importance of determinant lies in its relationship to eigenvalues/eigenvectors.14 The determinant of matrix A-XI, where /is an nxn identity matrix with ones on the main diagonal and zeros elsewhere, is called the characteristic polynomial of A. The equation det(A-AI) = 0 is called the characteristic equation of A. The eigenvalues of A are the real roots of the characteristic equation of A. Using the characteristic equation, n n we can also show that \Al--Xn = det(A) and ^A. = trace(A) = ^Air A is diagonalizable if and only if it has linearly independent eigenvectors.15 Let A,, >^, ???, An be the eigenvalues of^, x,, x2, ???, xn be the corresponding eigenvectors. andX = [x, |x2 \ ? ■ ? | xw], then X~'AX = \ K = D^A = XDX~X ⟹ Ak = XDkX~

In practice, determinant is usually not solved by the sum of all permutations because it is computationally inefficient. LU decomposition and cofactors are often used to calculate determinants instead. 14 Determinant can also be applied to matrix inverse and linear equations as well. 15 If all n eigenvalues are real and distinct, then the eigenvectors are independent and/* is diagonalizable.

### Problem

**If matrix A = [[2, 1], [1, 2]], what are the eigenvalues and eigenvectors of A?**

> **Solution:**
>
> **Approach A — definition.** Let λ be an eigenvalue and **x** = [x₁, x₂]ᵀ. Then Ax = λx gives:
>
> ```
> 2x₁ + x₂ = λx₁
> x₁ + 2x₂ = λx₂
> ```
>
> Adding: `3(x₁ + x₂) = λ(x₁ + x₂)`, so either λ = 3 (with x₁ = x₂) or x₁ + x₂ = 0 (with λ = 1). Normalized eigenvectors:
>
> ```
> λ = 3 → v₁ = [1/√2,  1/√2]ᵀ
> λ = 1 → v₂ = [1/√2, −1/√2]ᵀ
> ```
>
> **Approach B — characteristic equation.**
>
> ```
> det(A − λI) = (2−λ)² − 1 = 0  →  λ² − 4λ + 3 = 0  →  λ = 1 and λ = 3
> ```
>
> **Approach C — trace and determinant.**
>
> ```
> λ₁·λ₂ = det(A) = 4 − 1 = 3
> λ₁ + λ₂ = trace(A) = 4
> → λ₁ = 1, λ₂ = 3
> ```

### Positive Semidefinite and Positive Definite Matrices

When A is a **symmetric** n×n matrix (as in covariance/correlation matrices), all eigenvalues are real and eigenvectors from distinct eigenvalues are orthogonal.

A symmetric A is **positive semidefinite (PSD)** iff any of:
1. `xᵀAx ≥ 0` for all n×1 vectors x
2. All eigenvalues ≥ 0
3. All upper-left submatrices Aₖ (k = 1,...,n) have non-negative determinants

A symmetric A is **positive definite (PD)** iff any of:
1. `xᵀAx > 0` for all nonzero x
2. All eigenvalues > 0
3. All upper-left submatrices Aₖ have positive determinants

Covariance/correlation matrices must be PSD; without perfect linear dependence they are PD.

### Problem

**There are 3 random variables x, y, and z. The correlation between x and y is 0.8 and the correlation between x and z is 0.8. What is the maximum and minimum correlation between y and z?**

> **Solution:**
> Let ρ be the correlation between y and z. The 3×3 correlation matrix is:
>
> ```
> P = | 1    0.8  0.8 |
>     | 0.8  1    ρ   |
>     | 0.8  ρ    1   |
> ```
>
> Expanding det(P) ≥ 0 for PSD:
>
> ```
> det(P) = 1·(1 − ρ²) − 0.8·(0.8 − 0.8ρ) + 0.8·(0.8ρ − 0.8)
>        = −ρ² + 1.28ρ − 0.28
>        = −(ρ − 1)(ρ − 0.28) ≥ 0
> ```
>
> Therefore **0.28 ≤ ρ ≤ 1**. Maximum correlation = **1**, minimum = **0.28**. LU decomposition and Cholesky decomposition Let A be a nonsingular ?x? matrix. LU decomposition expresses A as the product of a lower and upper triangular matrix: A = LU.17 LU decomposition can be use to solve Ax = b and calculate the determinant of A: LUx = b^Ux = y,Ly = b; det(^) = det(L)det(t/) = f[L^flUhj. When ^4 is a symmetric positive definite matrix, Cholesky decomposition expresses A as A = RTR, where R is a unique upper-triangular matrix with positive diagonal entries. Essentially, it is a LU decomposition with the property L = UT. Cholesky decomposition is useful in Monte Carlo simulation to generate correlated random variables as shown in the following problem: How do you generate two N(0,1) (standard normal distribution) random variables with correlation p if you have a random number generator for standard normal distribution?

> **Solution:**
> Two TV(0,1) random variables jc, , x2 with a correlation p can be generated from independent N(0,l)
> random variables z]9 z2 using the following equations: x\ = z\ X2 = pZx +y]l-p2Z2 It is easy to
> confirm that var(x,) = var(z,) = l, var(x2) = /?2 var(z,) + (l-/?2)var(z2) = l, and cov(x,,x2) =
> cov(z,,pz] +y]l-p2z2) = cov(z,,pz]) = p . This approach is a basic example using Cholesky
> decomposition to generate correlated random numbers. To generate correlated random variables that
> follow a ^-dimensional 17 LU decomposition occurs naturally in Gaussian elimination.

multivariate normal distribution X = [X,, X2, ? ? ?, Xnf ~ N(ju, I) with mean // = [//,,//2,-,/iJr and covariance matrix I (a nxn positive definite matrix)18, we can decompose the covariance matrix I into 7?r/? and generate n independent N(0,1) random variables z,, z2, ? ? ?, zn. Let vector Z = [z,, z2, ? ? ?, zn f, then X can be generated as X = {i + RTZ.]9 Alternatively, X can also be generated using another important matrix decomposition called singular value decomposition (SVD): For any nxp matrix X, there exists a factorization of the form X = UDVT, where U and V are nxp and px/? orthogonal matrices, with columns of U spanning the column space of X, and the columns of V spanning the row space; D is a pxp diagonal matrix called the singular values of X. For a positive definite covariance matrix, we have V = U and X = UDUT. Furthermore, D is the diagonal matrix of eigenvalues A,, A^---,^ and ∫/ is the matrix of n corresponding eigenvectors. Let DV2 be a diagonal matrix with diagonal elements &> >IX>-"> yfc> then * is clear that D = (DU2)2=(D]/2)(DV2)T and T = UD]/2(UD]/2)T. Again, if we generate a vector of n independent N(0, 1) random variables Z = [z]y z2,---,zj7, Xcan be generated as X = ju + (UD]/2)Z. 18 The probability density of multivariate normal distribution is /(r) = ^—: " L (2;r)"2dct(I)'

1, In general, if y = AX +/>, where A and b are constant, then the covariance matricein. = alxxat.
