#!/usr/bin/env python3
"""Render AoPS Vol. 1 figures as SVG via geometric primitives.

Replaces hand-cropped PNG files with code-drawn SVG diagrams. Each figure is
a function returning an SVG string built from the primitives below. Output
goes to public/aops-figures/<id>.svg.

Run from repo root:
    python3 scripts/render-aops-figures.py
"""
from __future__ import annotations

import math
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "public" / "aops-figures"

# ─────────────────────────────────────────────
# SVG primitives
# ─────────────────────────────────────────────

STROKE = 'stroke="#1d1d1f" stroke-width="1.4" fill="none"'
DOT = 'fill="#1d1d1f"'
LABEL_FONT = 'font-family="Times, Georgia, serif" font-style="italic" font-size="14"'

ARROW_DEF = '''<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="#1d1d1f"/>
  </marker>
</defs>'''


def svg(width: float, height: float, body: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}">\n'
        f'{ARROW_DEF}\n'
        f'{body}\n</svg>'
    )


def point(x: float, y: float, label: str | None = None, pos: str = "above-right",
          dot: bool = True, italic: bool = True) -> str:
    parts = []
    if dot:
        parts.append(f'<circle cx="{x}" cy="{y}" r="2.5" {DOT}/>')
    if label:
        lx, ly = label_offset(x, y, pos)
        anchor = label_anchor(pos)
        font_style = 'italic' if italic else 'normal'
        parts.append(
            f'<text x="{lx}" y="{ly}" font-family="Times, Georgia, serif" '
            f'font-style="{font_style}" font-size="14" text-anchor="{anchor}">{label}</text>'
        )
    return "\n".join(parts)


def label_offset(x: float, y: float, pos: str, gap: float = 12) -> tuple[float, float]:
    g = gap
    return {
        "above":       (x,     y - g + 4),
        "below":       (x,     y + g + 4),
        "left":        (x - g, y + 4),
        "right":       (x + g, y + 4),
        "above-left":  (x - g + 2, y - g + 4),
        "above-right": (x + g - 2, y - g + 4),
        "below-left":  (x - g + 2, y + g + 6),
        "below-right": (x + g - 2, y + g + 6),
    }.get(pos, (x + g, y + 4))


def label_anchor(pos: str) -> str:
    if "left" in pos:
        return "end"
    if "right" in pos:
        return "start"
    return "middle"


def segment(x1: float, y1: float, x2: float, y2: float) -> str:
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" {STROKE}/>'


def ray(x1: float, y1: float, x2: float, y2: float) -> str:
    """Ray from (x1,y1) through (x2,y2), with arrowhead at (x2,y2)."""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" {STROKE} marker-end="url(#arrow)"/>'


def line(x1: float, y1: float, x2: float, y2: float) -> str:
    """Line with arrowheads on both ends."""
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" {STROKE} '
            f'marker-start="url(#arrow)" marker-end="url(#arrow)"/>')


def circle(cx: float, cy: float, r: float) -> str:
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" {STROKE}/>'


def arc(cx: float, cy: float, r: float, start_deg: float, end_deg: float,
        large: int | None = None) -> str:
    """Arc on a circle from start_deg to end_deg (both measured from +x axis,
    counterclockwise positive)."""
    sx = cx + r * math.cos(math.radians(start_deg))
    sy = cy - r * math.sin(math.radians(start_deg))
    ex = cx + r * math.cos(math.radians(end_deg))
    ey = cy - r * math.sin(math.radians(end_deg))
    sweep = (end_deg - start_deg) % 360
    if large is None:
        large = 1 if sweep > 180 else 0
    sweep_flag = 0  # SVG sweep: 0 = counterclockwise in screen coords
    return (f'<path d="M {sx:.2f} {sy:.2f} A {r} {r} 0 {large} {sweep_flag} '
            f'{ex:.2f} {ey:.2f}" {STROKE}/>')


def text(x: float, y: float, content: str, italic: bool = True,
         anchor: str = "middle", size: int = 14) -> str:
    style = "italic" if italic else "normal"
    return (f'<text x="{x}" y="{y}" font-family="Times, Georgia, serif" '
            f'font-style="{style}" font-size="{size}" text-anchor="{anchor}">{content}</text>')


def angle_mark(vx: float, vy: float, p1: tuple[float, float], p2: tuple[float, float],
               r: float = 14) -> str:
    """Small arc at vertex (vx,vy) sweeping between rays toward p1 and p2."""
    a1 = math.degrees(math.atan2(-(p1[1] - vy), p1[0] - vx)) % 360
    a2 = math.degrees(math.atan2(-(p2[1] - vy), p2[0] - vx)) % 360
    sweep = (a2 - a1) % 360
    if sweep > 180:
        a1, a2 = a2, a1
    return arc(vx, vy, r, a1, a2, large=0)


def right_angle_mark(vx: float, vy: float, p1: tuple[float, float],
                     p2: tuple[float, float], size: float = 10) -> str:
    """Small square at vertex marking a right angle. p1, p2 are points along the
    two perpendicular rays from the vertex."""
    def unit(p):
        dx, dy = p[0] - vx, p[1] - vy
        m = math.hypot(dx, dy) or 1
        return dx / m, dy / m
    u1 = unit(p1)
    u2 = unit(p2)
    a = (vx + u1[0] * size, vy + u1[1] * size)
    b = (vx + (u1[0] + u2[0]) * size, vy + (u1[1] + u2[1]) * size)
    c = (vx + u2[0] * size, vy + u2[1] * size)
    return (f'<path d="M {a[0]:.2f} {a[1]:.2f} L {b[0]:.2f} {b[1]:.2f} '
            f'L {c[0]:.2f} {c[1]:.2f}" {STROKE}/>')


# ─────────────────────────────────────────────
# Figures
# ─────────────────────────────────────────────

def fig_3_1_coordinate_plane() -> str:
    """Coordinate plane with two intersecting lines (x+y=3 and x-y=1)."""
    W, H = 280, 240
    cx, cy = 140, 120  # origin
    half = 95
    body = []
    # Tick marks on axes (small ones, 8 each side)
    for i in range(1, 8):
        d = i * 11
        body.append(segment(cx + d, cy - 3, cx + d, cy + 3))
        body.append(segment(cx - d, cy - 3, cx - d, cy + 3))
        body.append(segment(cx - 3, cy + d, cx + 3, cy + d))
        body.append(segment(cx - 3, cy - d, cx + 3, cy - d))
    # Axes (with arrowheads)
    body.append(line(cx - half - 5, cy, cx + half + 5, cy))  # x-axis
    body.append(line(cx, cy - half - 5, cx, cy + half + 5))  # y-axis
    body.append(text(cx + half + 14, cy + 5, "x", italic=True))
    body.append(text(cx, cy - half - 12, "y", italic=True))
    # Line x + y = 3 (passing through (3,0)=(cx+33,cy) and (0,3)=(cx,cy-33))
    # Slope -1 visually
    body.append(segment(cx - 60, cy - 90, cx + 90, cy + 60))
    # Line x - y = 1 (slope +1, through (1,0)=(cx+11,cy) and (0,-1)=(cx,cy+11))
    body.append(segment(cx - 70, cy - 80, cx + 90, cy + 80))
    # Label l for the second line, near its lower-right portion
    body.append(text(cx + 78, cy + 78, "ℓ", italic=True))
    return svg(W, H, "\n".join(body))


def fig_9_1_circle_tangent_secant() -> str:
    """Circle with center O, chord AC, diameter AB, tangent ℓ, secant m."""
    W, H = 240, 200
    cx, cy, r = 120, 105, 60
    # Tangent line ℓ: passes through topmost point of circle (cx, cy-r)
    # angled slightly. Use a near-vertical line tangent at top-left.
    # Easier: tangent at point T = (cx + r cos 110°, cy - r sin 110°), tangent direction perpendicular.
    import math as m
    th_t = m.radians(115)  # tangent point angle
    tx = cx + r * m.cos(th_t)
    ty = cy - r * m.sin(th_t)
    # tangent direction perpendicular to radius
    dx = -m.sin(th_t)
    dy = -m.cos(th_t)
    body = []
    # Tangent line ℓ
    body.append(segment(tx - 60 * dx, ty - 60 * dy, tx + 70 * dx, ty + 70 * dy))
    body.append(text(tx - 60 * dx - 6, ty - 60 * dy + 4, "ℓ", italic=True))
    # Secant m through points on circle at 30° and 210° (cuts through)
    # Pick points: P at 35°, Q at 215°
    th1 = m.radians(35); th2 = m.radians(215)
    px1 = cx + (r + 30) * m.cos(th1); py1 = cy - (r + 30) * m.sin(th1)
    px2 = cx + (r + 25) * m.cos(th2); py2 = cy - (r + 25) * m.sin(th2)
    body.append(segment(px1, py1, px2, py2))
    body.append(text(px1 + 5, py1 - 2, "m", italic=True))
    # Circle
    body.append(circle(cx, cy, r))
    # Diameter AB: A on left, B on right
    ax, ay = cx - r, cy + 4
    bx, by = cx + r * 0.92, cy + 18
    body.append(segment(ax, ay, bx, by))
    # Chord AC: A to C (C in upper-right)
    ccx = cx + r * 0.7; ccy = cy - r * 0.7
    body.append(segment(ax, ay, ccx, ccy))
    # Center O
    body.append(point(cx, cy, "O", "below"))
    # Points
    body.append(point(ax, ay, "A", "left"))
    body.append(point(bx, by, "B", "right"))
    body.append(point(ccx, ccy, "C", "above-right"))
    return svg(W, H, "\n".join(body))


def fig_9_2_arc_sector_segment() -> str:
    """Three small marginal sketches: arc, sector, circular segment."""
    W, H = 160, 280
    body = []
    # Arc (top): just a curved line + label "arc"
    body.append(arc(80, 30, 60, 145, 35))
    body.append(text(80, 75, "arc", italic=True))
    # Sector (middle): pie slice
    sx, sy, sr = 80, 130, 50
    body.append(f'<path d="M {sx} {sy} L {sx - sr * 0.7} {sy - sr * 0.7} '
                f'A {sr} {sr} 0 0 1 {sx + sr * 0.7} {sy - sr * 0.7} Z" {STROKE}/>')
    body.append(text(80, 175, "sector", italic=True))
    # Circular segment (bottom): chord + minor arc
    body.append(arc(80, 230, 50, 155, 25))
    body.append(segment(80 - 50 * 0.91, 230 - 50 * 0.42, 80 + 50 * 0.91, 230 - 50 * 0.42))
    body.append(text(80, 273, "circular segment", italic=True))
    return svg(W, H, "\n".join(body))


def fig_9_3_tangent_circles_internal() -> str:
    """Large circle A with smaller circles B, C tangent inside at X, Y."""
    W, H = 220, 200
    body = []
    # Large circle A
    Ax, Ay, Ar = 110, 110, 80
    body.append(circle(Ax, Ay, Ar))
    body.append(point(Ax - 35, Ay + 25, "A", "below-left"))
    # Circle C internally tangent at upper-left → touches large circle from inside
    Cx, Cy, Cr = 90, 65, 30
    body.append(circle(Cx, Cy, Cr))
    body.append(point(Cx, Cy + 8, "C", "below"))
    # Y on large circle, where C touches: top of circle C, on circle A
    Yx = Ax + (Cx - Ax) * Ar / math.hypot(Cx - Ax, Cy - Ay)
    Yy = Ay + (Cy - Ay) * Ar / math.hypot(Cx - Ax, Cy - Ay)
    body.append(point(Yx, Yy, "Y", "above"))
    # Circle B internally tangent on right
    Bx, By, Br = 145, 130, 28
    body.append(circle(Bx, By, Br))
    body.append(point(Bx, By + 6, "B", "below"))
    # X on large circle, where B touches
    Xx = Ax + (Bx - Ax) * Ar / math.hypot(Bx - Ax, By - Ay)
    Xy = Ay + (By - Ay) * Ar / math.hypot(Bx - Ax, By - Ay)
    body.append(point(Xx, Xy, "X", "right"))
    # Segments AC, AB (radii to internal tangent points)
    body.append(segment(Ax, Ay, Yx, Yy))
    body.append(segment(Ax, Ay, Xx, Xy))
    return svg(W, H, "\n".join(body))


def fig_9_4_mutually_tangent_circles() -> str:
    """Three mutually externally tangent circles A, B, C."""
    W, H = 220, 180
    body = []
    r = 38
    # A at top, B bottom-left, C bottom-right (equilateral arrangement)
    Ax, Ay = 110, 50
    Bx, By = 110 - r, 50 + r * 1.732
    Cx, Cy = 110 + r, 50 + r * 1.732
    body.append(circle(Ax, Ay, r))
    body.append(circle(Bx, By, r))
    body.append(circle(Cx, Cy, r))
    body.append(point(Ax, Ay, "A", "above", dot=False))
    body.append(point(Bx, By, "B", "below-left", dot=False))
    body.append(point(Cx, Cy, "C", "below-right", dot=False))
    # Triangle of centers (the segments connecting the three centers)
    body.append(segment(Ax, Ay, Bx, By))
    body.append(segment(Bx, By, Cx, Cy))
    body.append(segment(Cx, Cy, Ax, Ay))
    return svg(W, H, "\n".join(body))


def fig_9_5_epicycle_pattern() -> str:
    """Flower-like ring of small circles around a central point (no center circle)."""
    W, H = 220, 220
    cx, cy = 110, 110
    body = []
    n = 8
    R = 55  # ring radius
    r = 22  # small-circle radius
    for i in range(n):
        ang = 2 * math.pi * i / n
        x = cx + R * math.cos(ang)
        y = cy + R * math.sin(ang)
        body.append(circle(x, y, r))
        # small dots showing orbiting object's position
        body.append(f'<circle cx="{x + r * 0.6}" cy="{y - r * 0.5}" r="2" {DOT}/>')
    return svg(W, H, "\n".join(body))


def fig_9_6_ellipse_orbit() -> str:
    """Ellipse with focus marked."""
    W, H = 220, 130
    cx, cy = 110, 65
    body = []
    body.append(f'<ellipse cx="{cx}" cy="{cy}" rx="80" ry="42" {STROKE}/>')
    # focus on the left (sun)
    body.append(f'<circle cx="{cx - 35}" cy="{cy}" r="4" {DOT}/>')
    return svg(W, H, "\n".join(body))


def fig_10_1_segments_rays_lines() -> str:
    """Three stacked diagrams: segment AB, ray CD, line EF."""
    W, H = 280, 200
    body = "\n".join([
        segment(20, 35, 230, 35),
        point(20, 35, "A", "above-right"),
        point(230, 35, "B", "above-right"),
        ray(20, 100, 240, 100),
        point(20, 100, "C", "above-right"),
        point(140, 100, "D", "above-right"),
        line(15, 165, 250, 165),
        point(80, 165, "E", "above"),
        point(170, 165, "F", "above"),
    ])
    return svg(W, H, body)


def fig_10_2_collinear_segment() -> str:
    """Segment with three collinear points A, X, B."""
    W, H = 240, 50
    body = "\n".join([
        segment(20, 25, 220, 25),
        point(20, 25, "A", "below"),
        point(140, 25, "X", "below"),
        point(220, 25, "B", "below"),
    ])
    return svg(W, H, body)


def fig_10_3_angle_subtending_arc() -> str:
    """Angle AOB at center O, subtending arc on a circle."""
    W, H = 220, 220
    cx, cy, r = 110, 110, 70
    th_a = math.radians(135); th_b = math.radians(60)
    Ax = cx + r * math.cos(th_a); Ay = cy - r * math.sin(th_a)
    Bx = cx + r * math.cos(th_b); By = cy - r * math.sin(th_b)
    body = "\n".join([
        circle(cx, cy, r),
        # rays from O to A and B
        segment(cx, cy, Ax, Ay),
        segment(cx, cy, Bx, By),
        # emphasize subtended arc (slightly thicker)
        f'<path d="M {Ax:.2f} {Ay:.2f} A {r} {r} 0 0 1 {Bx:.2f} {By:.2f}" '
        f'stroke="#1d1d1f" stroke-width="2.6" fill="none"/>',
        point(cx, cy, "O", "below"),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "above-right"),
    ])
    return svg(W, H, body)


def fig_10_4_angle_types() -> str:
    """Three angle classifications: acute (48°), right, obtuse."""
    W, H = 420, 130
    body = []
    # Acute angle (48°), opening up-right
    Ax, Ay = 50, 100
    body.append(segment(Ax, Ay, Ax + 90, Ay))
    body.append(segment(Ax, Ay, Ax + 90 * math.cos(math.radians(48)),
                              Ay - 90 * math.sin(math.radians(48))))
    body.append(text(Ax + 28, Ay - 6, "48°", italic=True, anchor="start", size=12))
    body.append(text(Ax + 35, Ay + 24, "acute", italic=True, anchor="middle"))
    # Right angle, opening up
    Bx, By = 195, 100
    body.append(segment(Bx, By, Bx + 80, By))
    body.append(segment(Bx, By, Bx, By - 75))
    body.append(right_angle_mark(Bx, By, (Bx + 1, By), (Bx, By - 1), size=10))
    body.append(text(Bx + 35, By + 24, "right", italic=True, anchor="middle"))
    # Obtuse angle (~135°), opening up-right
    Cx, Cy = 320, 100
    body.append(segment(Cx, Cy, Cx + 90, Cy))
    body.append(segment(Cx, Cy, Cx + 80 * math.cos(math.radians(135)),
                              Cy - 80 * math.sin(math.radians(135))))
    body.append(text(Cx + 35, Cy + 24, "obtuse", italic=True, anchor="middle"))
    return svg(W, H, "\n".join(body))


def fig_10_5_vertical_angles() -> str:
    """Two intersecting lines l, m forming θ, α, φ, β."""
    W, H = 130, 110
    cx, cy = 65, 55
    body = []
    # Line 1 (~30° slope)
    L = 50
    body.append(segment(cx - L * math.cos(math.radians(20)),
                       cy + L * math.sin(math.radians(20)),
                       cx + L * math.cos(math.radians(20)),
                       cy - L * math.sin(math.radians(20))))
    # Line 2 (~70° slope)
    body.append(segment(cx - L * math.cos(math.radians(70)),
                       cy + L * math.sin(math.radians(70)),
                       cx + L * math.cos(math.radians(70)),
                       cy - L * math.sin(math.radians(70))))
    # Labels in the four quadrants formed by the lines
    body.append(text(cx + 20, cy - 18, "θ", italic=True))
    body.append(text(cx + 28, cy + 4, "α", italic=True))
    body.append(text(cx - 8, cy + 22, "β", italic=True))
    body.append(text(cx - 22, cy - 4, "φ", italic=True))
    return svg(W, H, "\n".join(body))


def fig_10_6_parallel_transversal() -> str:
    """Two parallel lines l, m cut by transversal n."""
    W, H = 200, 180
    body = []
    # parallel lines
    body.append(segment(20, 50, 180, 50))
    body.append(text(8, 54, "l", italic=True, anchor="end"))
    body.append(segment(20, 130, 180, 130))
    body.append(text(8, 134, "m", italic=True, anchor="end"))
    # transversal n (slope ~70°)
    body.append(segment(60, 10, 160, 170))
    body.append(text(165, 175, "n", italic=True, anchor="start"))
    # angle labels at top intersection
    body.append(text(78, 40, "γ", italic=True, anchor="end", size=12))
    body.append(text(110, 42, "θ", italic=True, anchor="start", size=12))
    body.append(text(78, 65, "α", italic=True, anchor="end", size=12))
    body.append(text(112, 65, "β", italic=True, anchor="start", size=12))
    return svg(W, H, "\n".join(body))


def fig_10_7_marking_equal_angles() -> str:
    """Parallelogram-like quadrilateral with arcs marking equal angles."""
    W, H = 200, 160
    # Quadrilateral vertices: simple parallelogram
    p1 = (40, 30)
    p2 = (170, 50)
    p3 = (160, 130)
    p4 = (30, 110)
    body = []
    body.append(segment(*p1, *p2))
    body.append(segment(*p2, *p3))
    body.append(segment(*p3, *p4))
    body.append(segment(*p4, *p1))
    # Mark opposite angles as equal: at p1 and p3 (single arc), at p2 and p4 (double arc)
    body.append(angle_mark(p1[0], p1[1], p2, p4, r=18))
    body.append(angle_mark(p3[0], p3[1], p2, p4, r=18))
    body.append(angle_mark(p2[0], p2[1], p1, p3, r=15))
    body.append(angle_mark(p2[0], p2[1], p1, p3, r=20))
    body.append(angle_mark(p4[0], p4[1], p1, p3, r=15))
    body.append(angle_mark(p4[0], p4[1], p1, p3, r=20))
    return svg(W, H, "\n".join(body))


def fig_10_8_triangle_angle_sum() -> str:
    """Triangle ABC with line ℓ drawn through C parallel to AB."""
    W, H = 320, 160
    # Triangle vertices
    A = (60, 130)
    B = (250, 130)
    C = (170, 30)
    body = []
    body.append(segment(*A, *B))
    body.append(segment(*A, *C))
    body.append(segment(*B, *C))
    # Line ℓ through C, parallel to AB
    body.append(segment(40, C[1], 300, C[1]))
    body.append(text(34, C[1] + 4, "ℓ", italic=True, anchor="end"))
    # Vertex labels
    body.append(point(*A, "A", "below-left", dot=False))
    body.append(point(*B, "B", "below-right", dot=False))
    body.append(point(*C, "C", "above", dot=False))
    # Angle labels at A and B (interior angles α, β); γ at C; ACE and BCD relabel
    body.append(text(A[0] + 18, A[1] - 6, "α", italic=True, anchor="middle", size=12))
    body.append(text(B[0] - 18, B[1] - 6, "β", italic=True, anchor="middle", size=12))
    body.append(text(C[0], C[1] + 18, "γ", italic=True, anchor="middle", size=12))
    return svg(W, H, "\n".join(body))


def fig_10_9_exterior_angle() -> str:
    """Triangle with one side extended past a vertex; exterior angle θ."""
    W, H = 240, 160
    A = (50, 130)
    B = (170, 130)
    C = (110, 40)
    body = []
    body.append(segment(*A, *B))
    body.append(segment(*A, *C))
    body.append(segment(*B, *C))
    # Extend AB past B
    body.append(segment(B[0], B[1], 220, 130))
    body.append(point(*A, "A", "below-left", dot=False))
    body.append(point(*B, "B", "below", dot=False))
    body.append(point(*C, "C", "above", dot=False))
    # Interior angles
    body.append(text(A[0] + 17, A[1] - 6, "α", italic=True, size=12))
    body.append(text(B[0] - 14, B[1] - 6, "γ", italic=True, size=12))
    body.append(text(C[0], C[1] + 18, "β", italic=True, size=12))
    # Exterior angle θ at B
    body.append(text(B[0] + 16, B[1] - 6, "θ", italic=True, size=12))
    return svg(W, H, "\n".join(body))


def fig_10_11_inscribed_angle() -> str:
    """Inscribed angle ABC in a circle."""
    W, H = 200, 200
    cx, cy, r = 100, 100, 75
    # B on the circle (vertex of inscribed angle), A and C on circle as well
    th_B = math.radians(200); Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    th_A = math.radians(75);  Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_C = math.radians(-15); Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    body = "\n".join([
        circle(cx, cy, r),
        segment(Bx, By, Ax, Ay),
        segment(Bx, By, Cx, Cy),
        point(Ax, Ay, "A", "above-right"),
        point(Bx, By, "B", "left"),
        point(Cx, Cy, "C", "below-right"),
    ])
    return svg(W, H, body)


def fig_10_12_two_secants_external() -> str:
    """Two secants from external A intersecting a circle."""
    W, H = 260, 200
    cx, cy, r = 165, 100, 65
    # A is external, to the left of the circle
    Ax, Ay = 25, 100
    # Secant 1 enters circle, exits — pick angles 145° and 100° on the circle
    th_p1 = math.radians(155); P1x = cx + r * math.cos(th_p1); P1y = cy - r * math.sin(th_p1)
    th_p2 = math.radians(40);  P2x = cx + r * math.cos(th_p2); P2y = cy - r * math.sin(th_p2)
    # Secant 2: 200° and -50°
    th_q1 = math.radians(210); Q1x = cx + r * math.cos(th_q1); Q1y = cy - r * math.sin(th_q1)
    th_q2 = math.radians(-30); Q2x = cx + r * math.cos(th_q2); Q2y = cy - r * math.sin(th_q2)
    body = "\n".join([
        circle(cx, cy, r),
        segment(Ax, Ay, P2x + 8, P2y - 4),
        segment(Ax, Ay, Q2x + 8, Q2y + 6),
        point(Ax, Ay, "A", "left"),
        point(P1x, P1y, "B", "above-left"),
        point(P2x, P2y, "C", "above-right"),
        point(Q1x, Q1y, "D", "below-left"),
        point(Q2x, Q2y, "E", "below-right"),
        # angle at A
        text(Ax + 24, Ay + 4, "α", italic=True, anchor="start", size=12),
    ])
    return svg(W, H, body)


def fig_10_13_tangent_chord_angle() -> str:
    """Tangent line at B with chord BC; angle θ between."""
    W, H = 220, 220
    cx, cy, r = 110, 115, 70
    # Tangent point B at bottom-left
    th_B = math.radians(220)
    Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    # Tangent direction perpendicular to OB
    tdx = -math.sin(th_B); tdy = -math.cos(th_B)
    # Chord BC, with C on circle at upper-right
    th_C = math.radians(50)
    Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    body = "\n".join([
        circle(cx, cy, r),
        # tangent line through B
        segment(Bx - 60 * tdx, By - 60 * tdy, Bx + 80 * tdx, By + 80 * tdy),
        # chord BC
        segment(Bx, By, Cx, Cy),
        point(Bx, By, "B", "below-left"),
        point(Cx, Cy, "C", "above-right"),
        # angle θ at B between tangent and chord
        text(Bx + 20, By - 10, "θ", italic=True, size=13),
    ])
    return svg(W, H, body)


def fig_10_14_two_chords_internal() -> str:
    """Two chords intersecting inside a circle, forming θ."""
    W, H = 240, 220
    cx, cy, r = 115, 110, 80
    # Chord 1 endpoints
    th1 = math.radians(150); A1x = cx + r * math.cos(th1); A1y = cy - r * math.sin(th1)
    th2 = math.radians(-30); B1x = cx + r * math.cos(th2); B1y = cy - r * math.sin(th2)
    # Chord 2 endpoints
    th3 = math.radians(70); A2x = cx + r * math.cos(th3); A2y = cy - r * math.sin(th3)
    th4 = math.radians(220); B2x = cx + r * math.cos(th4); B2y = cy - r * math.sin(th4)
    body = "\n".join([
        circle(cx, cy, r),
        segment(A1x, A1y, B1x, B1y),
        segment(A2x, A2y, B2x, B2y),
        # angle θ at the intersection (estimated near center)
        text(cx + 6, cy - 8, "θ", italic=True, size=13),
        # arc labels α, β (rough position on the two arcs)
        text(cx + r + 14, cy + 4, "α", italic=True, size=12),
        text(cx - r - 14, cy + 4, "β", italic=True, size=12),
    ])
    return svg(W, H, body)


def fig_10_15_diameter_tangent() -> str:
    """Circle with diameter AB and tangent ℓ at A perpendicular to AB."""
    W, H = 220, 240
    cx, cy, r = 110, 130, 70
    # A at top of circle, B at bottom — diameter is vertical
    Ax, Ay = cx, cy - r
    Bx, By = cx, cy + r
    # tangent ℓ horizontal through A
    body = "\n".join([
        circle(cx, cy, r),
        segment(Ax, Ay, Bx, By),  # diameter
        # tangent line through A (horizontal)
        segment(Ax - 80, Ay, Ax + 80, Ay),
        text(Ax - 87, Ay - 4, "ℓ", italic=True, anchor="end"),
        # right angle marker at A
        right_angle_mark(Ax, Ay, (Ax + 12, Ay), (Ax, Ay + 12), size=10),
        # extra point C on circle (upper-right)
        point(cx + r * math.cos(math.radians(35)),
              cy - r * math.sin(math.radians(35)), "C", "above-right"),
        point(cx, cy, "O", "right"),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "below"),
    ])
    return svg(W, H, body)


def fig_10_21_example_10_9_tangent_circles() -> str:
    """Two circles tangent at G with inscribed angles E and F."""
    W, H = 280, 220
    # Right circle (larger)
    Rx, Ry, Rr = 175, 110, 75
    # Left circle (smaller), tangent externally at G
    Lr = 35
    Lx, Ly = Rx - Rr - Lr, Ry  # tangent point on x-axis through Rcenter
    Gx, Gy = Rx - Rr, Ry  # tangent point
    body = []
    body.append(circle(Rx, Ry, Rr))
    body.append(circle(Lx, Ly, Lr))
    body.append(point(Gx, Gy, "G", "above"))
    # Points on right circle: F (top-right), C (right), B (bottom-left, near G), D (top, near G)
    th_D = math.radians(155); Dx = Rx + Rr * math.cos(th_D); Dy = Ry - Rr * math.sin(th_D)
    th_F = math.radians(60);  Fx = Rx + Rr * math.cos(th_F); Fy = Ry - Rr * math.sin(th_F)
    th_C = math.radians(-50); Cx = Rx + Rr * math.cos(th_C); Cy = Ry - Rr * math.sin(th_C)
    th_B = math.radians(-160);Bx = Rx + Rr * math.cos(th_B); By = Ry - Rr * math.sin(th_B)
    # Lines on right circle: F to C, F to G, B to G, B to D
    body.append(segment(Fx, Fy, Gx, Gy))
    body.append(segment(Fx, Fy, Cx, Cy))
    body.append(segment(Bx, By, Gx, Gy))
    body.append(segment(Dx, Dy, Gx, Gy))
    # Point E on left circle (top)
    th_E = math.radians(120); Ex = Lx + Lr * math.cos(th_E); Ey = Ly - Lr * math.sin(th_E)
    body.append(segment(Ex, Ey, Gx, Gy))
    # Auxiliary line through G into left circle (point A)
    th_A = math.radians(220); Ax = Lx + Lr * math.cos(th_A); Ay = Ly - Lr * math.sin(th_A)
    body.append(segment(Ex, Ey, Ax, Ay))
    body.append(segment(Ax, Ay, Gx, Gy))
    body.append(point(Fx, Fy, "F", "above-right"))
    body.append(point(Dx, Dy, "D", "above"))
    body.append(point(Cx, Cy, "C", "below-right"))
    body.append(point(Bx, By, "B", "below-left"))
    body.append(point(Ex, Ey, "E", "above-left"))
    body.append(point(Ax, Ay, "A", "below-left"))
    return svg(W, H, "\n".join(body))


def fig_10_22_inscribed_angle_proof_setup() -> str:
    """Inscribed angle proof: circle with center O, inscribed angle at C, with
    chord AB drawn; sub-triangles ACB and AOB, with angles labeled."""
    W, H = 220, 230
    cx, cy, r = 110, 130, 80
    # C at top of circle
    Cx, Cy = cx, cy - r
    # A and B on circle, lower
    th_A = math.radians(195); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_B = math.radians(-30); Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    body = []
    body.append(circle(cx, cy, r))
    body.append(segment(Cx, Cy, Ax, Ay))
    body.append(segment(Cx, Cy, Bx, By))
    body.append(segment(Ax, Ay, Bx, By))
    # Center O and segments to A, B (forming inner triangle)
    body.append(segment(cx, cy, Ax, Ay))
    body.append(segment(cx, cy, Bx, By))
    body.append(point(cx, cy, "O", "below"))
    body.append(point(Cx, Cy, "C", "above"))
    body.append(point(Ax, Ay, "A", "left"))
    body.append(point(Bx, By, "B", "right"))
    # Angle labels x, y, z, w near vertex
    body.append(text(Cx - 6, Cy + 18, "x", italic=True, size=11))
    body.append(text(Cx + 6, Cy + 18, "y", italic=True, size=11))
    body.append(text(Bx - 12, By - 4, "z", italic=True, size=11))
    body.append(text(Ax + 14, Ay - 4, "θ", italic=True, size=11))
    body.append(text(cx - 6, cy + 14, "φ", italic=True, size=11))
    return svg(W, H, "\n".join(body))


def fig_10_23_two_secants_proof() -> str:
    """Two secants from external A with auxiliary chord DC drawn."""
    W, H = 240, 200
    cx, cy, r = 155, 100, 60
    Ax, Ay = 25, 100
    th_B = math.radians(155); Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    th_C = math.radians(45);  Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    th_D = math.radians(220); Dx = cx + r * math.cos(th_D); Dy = cy - r * math.sin(th_D)
    th_E = math.radians(-25); Ex = cx + r * math.cos(th_E); Ey = cy - r * math.sin(th_E)
    body = "\n".join([
        circle(cx, cy, r),
        segment(Ax, Ay, Cx, Cy),
        segment(Ax, Ay, Ex, Ey),
        # Auxiliary chord D–C
        segment(Dx, Dy, Cx, Cy),
        point(Ax, Ay, "A", "left"),
        point(Bx, By, "B", "above-left"),
        point(Cx, Cy, "C", "above-right"),
        point(Dx, Dy, "D", "below-left"),
        point(Ex, Ey, "E", "below-right"),
        text(Ax + 22, Ay + 4, "α", italic=True, size=12),
        text(cx + r + 14, cy + 6, "β", italic=True, size=12),
    ])
    return svg(W, H, body)


def fig_10_24_tangent_chord_proof() -> str:
    """Tangent at A with chord AB; auxiliary line from B to C creates inscribed
    angle ABC and external angle ACB."""
    W, H = 220, 220
    cx, cy, r = 115, 115, 70
    # Tangent point A at top-left
    th_A = math.radians(135)
    Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    # tangent direction
    tdx = -math.sin(th_A); tdy = -math.cos(th_A)
    # B on circle (lower-right)
    th_B = math.radians(-30); Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    # C on circle (upper-right)
    th_C = math.radians(40); Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    # D extends tangent beyond A
    Dx = Ax + 60 * tdx * (-1); Dy = Ay + 60 * tdy * (-1)
    body = "\n".join([
        circle(cx, cy, r),
        # tangent line through A
        segment(Ax - 60 * tdx, Ay - 60 * tdy, Ax + 60 * tdx, Ay + 60 * tdy),
        segment(Ax, Ay, Bx, By),
        segment(Ax, Ay, Cx, Cy),
        segment(Bx, By, Cx, Cy),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "below-right"),
        point(Cx, Cy, "C", "above-right"),
        point(Dx, Dy, "D", "above-right"),
        text(Ax + 20, Ay + 10, "θ", italic=True, size=12),
        text(Ax + 18, Ay + 24, "φ", italic=True, size=11),
    ])
    return svg(W, H, body)


def fig_10_25_two_chords_proof() -> str:
    """Two chords intersecting at B with auxiliary chord DC drawn."""
    W, H = 240, 220
    cx, cy, r = 115, 110, 80
    th_A = math.radians(150); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_C = math.radians(60);  Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    th_E = math.radians(-30); Ex = cx + r * math.cos(th_E); Ey = cy - r * math.sin(th_E)
    th_D = math.radians(225); Dx = cx + r * math.cos(th_D); Dy = cy - r * math.sin(th_D)
    body = "\n".join([
        circle(cx, cy, r),
        # Chord A–E
        segment(Ax, Ay, Ex, Ey),
        # Chord C–D
        segment(Cx, Cy, Dx, Dy),
        # Auxiliary chord D–C drawn (it's already there but visual emphasis)
        point(Ax, Ay, "A", "above-left"),
        point(Cx, Cy, "C", "above-right"),
        point(Ex, Ey, "E", "below-right"),
        point(Dx, Dy, "D", "below-left"),
        # Mark intersection B near center
        point(cx + 5, cy + 5, "B", "above-right"),
        text(cx + r + 14, cy + 5, "α", italic=True, size=12),
        text(cx - r - 14, cy + 5, "β", italic=True, size=12),
    ])
    return svg(W, H, body)


def fig_10_16_exercise_10_2() -> str:
    """5 points A, B, Q, D, C on circle with external point P; two secants from P."""
    W, H = 240, 200
    cx, cy, r = 150, 100, 60
    # External P on the left
    Px, Py = 30, 100
    # Points on circle (going around)
    th_A = math.radians(155); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_B = math.radians(110); Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    th_Q = math.radians(60);  Qx = cx + r * math.cos(th_Q); Qy = cy - r * math.sin(th_Q)
    th_D = math.radians(-30); Dx = cx + r * math.cos(th_D); Dy = cy - r * math.sin(th_D)
    th_C = math.radians(-155);Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    body = "\n".join([
        circle(cx, cy, r),
        # Two secants from P: P–A–B and P–C–D (entering and exiting)
        segment(Px, Py, Bx + 8, By - 6),
        segment(Px, Py, Dx + 6, Dy + 6),
        point(Px, Py, "P", "left"),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "above"),
        point(Qx, Qy, "Q", "above-right"),
        point(Dx, Dy, "D", "below-right"),
        point(Cx, Cy, "C", "below-left"),
    ])
    return svg(W, H, body)


def fig_10_17_exercise_10_3() -> str:
    """Two tangents PA and PT from external P; X on the circle."""
    W, H = 220, 200
    cx, cy, r = 130, 100, 55
    Px, Py = 30, 100
    # tangent points: A above-left, T below-left
    th_A = math.radians(125); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_T = math.radians(-125);Tx = cx + r * math.cos(th_T); Ty = cy - r * math.sin(th_T)
    # X on circle, far right
    th_X = math.radians(20); Xx = cx + r * math.cos(th_X); Xy = cy - r * math.sin(th_X)
    body = "\n".join([
        circle(cx, cy, r),
        segment(Px, Py, Ax, Ay),
        segment(Px, Py, Tx, Ty),
        point(Px, Py, "P", "left"),
        point(Ax, Ay, "A", "above-right"),
        point(Tx, Ty, "T", "below-right"),
        point(Xx, Xy, "X", "right"),
    ])
    return svg(W, H, body)


def fig_10_18_example_10_7() -> str:
    """Two intersecting chords with arcs labeled AB=60° and DE=40°."""
    W, H = 220, 200
    cx, cy, r = 110, 100, 75
    # Chord 1: A–C
    th_A = math.radians(155); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_C = math.radians(-25); Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    # Chord 2: B–E (intersecting somewhere inside)
    th_B = math.radians(60);  Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    th_E = math.radians(220); Ex = cx + r * math.cos(th_E); Ey = cy - r * math.sin(th_E)
    # Mark D as midpoint between C and E (just for visual labeling at the lower-arc)
    th_D = math.radians(-105);Dx = cx + r * math.cos(th_D); Dy = cy - r * math.sin(th_D)
    body = "\n".join([
        circle(cx, cy, r),
        segment(Ax, Ay, Cx, Cy),
        segment(Bx, By, Ex, Ey),
        # Arc labels (text near the relevant arcs)
        text(cx + 20, cy - r - 4, "60°", italic=False, anchor="middle", size=11),
        text(cx - r - 4, cy + 5, "40°", italic=False, anchor="end", size=11),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "above-right"),
        point(Cx, Cy, "C", "below-right"),
        point(Dx, Dy, "D", "below"),
        point(Ex, Ey, "E", "below-left"),
    ])
    return svg(W, H, body)


def fig_10_19_example_10_8() -> str:
    """Inscribed quadrilateral with ∠ABC=60° at B and ∠BCD=70° at C."""
    W, H = 220, 220
    cx, cy, r = 110, 110, 75
    # 4 points around the circle
    th_A = math.radians(140); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_B = math.radians(75);  Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    th_C = math.radians(-30); Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    th_D = math.radians(-130);Dx = cx + r * math.cos(th_D); Dy = cy - r * math.sin(th_D)
    body = "\n".join([
        circle(cx, cy, r),
        segment(Ax, Ay, Bx, By),
        segment(Bx, By, Cx, Cy),
        segment(Cx, Cy, Dx, Dy),
        # 60° at B, 70° at C
        text(Bx - 6, By + 18, "60°", italic=False, anchor="middle", size=11),
        text(Cx - 12, Cy + 4, "70°", italic=False, anchor="end", size=11),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "above-right"),
        point(Cx, Cy, "C", "below-right"),
        point(Dx, Dy, "D", "below-left"),
    ])
    return svg(W, H, body)


def fig_10_20_equal_inscribed_angles() -> str:
    """Two pairs of inscribed angles in a circle subtending the same arcs."""
    W, H = 280, 220
    cx, cy, r = 140, 110, 80
    # Four points on circle: A (top-left), B (top-right), C (bottom-right), D (bottom-left)
    th_A = math.radians(150); Ax = cx + r * math.cos(th_A); Ay = cy - r * math.sin(th_A)
    th_B = math.radians(40);  Bx = cx + r * math.cos(th_B); By = cy - r * math.sin(th_B)
    th_C = math.radians(-50); Cx = cx + r * math.cos(th_C); Cy = cy - r * math.sin(th_C)
    th_D = math.radians(-140);Dx = cx + r * math.cos(th_D); Dy = cy - r * math.sin(th_D)
    body = "\n".join([
        circle(cx, cy, r),
        # A–C and B–D intersect inside
        segment(Ax, Ay, Cx, Cy),
        segment(Bx, By, Dx, Dy),
        # Also draw A–D and B–C to form the inscribed-angle pairs
        segment(Ax, Ay, Dx, Dy),
        segment(Bx, By, Cx, Cy),
        point(Ax, Ay, "A", "above-left"),
        point(Bx, By, "B", "above-right"),
        point(Cx, Cy, "C", "below-right"),
        point(Dx, Dy, "D", "below-left"),
    ])
    return svg(W, H, body)


def fig_10_10_arc_sector() -> str:
    """Circle with center O, sector AOB defined by central angle θ; chord AB."""
    W, H = 240, 220
    cx, cy, r = 110, 110, 75
    th_a = math.radians(150); th_b = math.radians(45)
    Ax = cx + r * math.cos(th_a); Ay = cy - r * math.sin(th_a)
    Bx = cx + r * math.cos(th_b); By = cy - r * math.sin(th_b)
    body = []
    body.append(circle(cx, cy, r))
    # Sector boundary radii
    body.append(segment(cx, cy, Ax, Ay))
    body.append(segment(cx, cy, Bx, By))
    # Chord AB
    body.append(segment(Ax, Ay, Bx, By))
    # Angle θ at center
    body.append(text(cx + 8, cy - 8, "θ", italic=True, size=13))
    body.append(point(cx, cy, "O", "below"))
    body.append(point(Ax, Ay, "A", "above-left"))
    body.append(point(Bx, By, "B", "above-right"))
    return svg(W, H, "\n".join(body))


# ─────────────────────────────────────────────
# Registry + main
# ─────────────────────────────────────────────

FIGURES = {
    "fig-3-1-coordinate-plane":           fig_3_1_coordinate_plane,
    "fig-9-1-circle-tangent-secant":      fig_9_1_circle_tangent_secant,
    "fig-9-2-arc-sector-segment":         fig_9_2_arc_sector_segment,
    "fig-9-3-tangent-circles-internal":   fig_9_3_tangent_circles_internal,
    "fig-9-4-mutually-tangent-circles":   fig_9_4_mutually_tangent_circles,
    "fig-9-5-epicycle-pattern":           fig_9_5_epicycle_pattern,
    "fig-9-6-ellipse-orbit":              fig_9_6_ellipse_orbit,
    "fig-10-1-segments-rays-lines":       fig_10_1_segments_rays_lines,
    "fig-10-2-collinear-segment":         fig_10_2_collinear_segment,
    "fig-10-3-angle-subtending-arc":      fig_10_3_angle_subtending_arc,
    "fig-10-4-angle-types":               fig_10_4_angle_types,
    "fig-10-5-vertical-angles":           fig_10_5_vertical_angles,
    "fig-10-6-parallel-transversal":      fig_10_6_parallel_transversal,
    "fig-10-7-marking-equal-angles":      fig_10_7_marking_equal_angles,
    "fig-10-8-triangle-angle-sum":        fig_10_8_triangle_angle_sum,
    "fig-10-9-exterior-angle":            fig_10_9_exterior_angle,
    "fig-10-10-arc-sector":               fig_10_10_arc_sector,
    "fig-10-11-inscribed-angle":          fig_10_11_inscribed_angle,
    "fig-10-12-two-secants-external":     fig_10_12_two_secants_external,
    "fig-10-13-tangent-chord-angle":      fig_10_13_tangent_chord_angle,
    "fig-10-14-two-chords-internal":      fig_10_14_two_chords_internal,
    "fig-10-15-diameter-tangent":         fig_10_15_diameter_tangent,
    "fig-10-16-exercise-10-2":            fig_10_16_exercise_10_2,
    "fig-10-17-exercise-10-3":            fig_10_17_exercise_10_3,
    "fig-10-18-example-10-7":             fig_10_18_example_10_7,
    "fig-10-19-example-10-8":             fig_10_19_example_10_8,
    "fig-10-20-equal-inscribed-angles":   fig_10_20_equal_inscribed_angles,
    "fig-10-21-example-10-9-tangent-circles": fig_10_21_example_10_9_tangent_circles,
    "fig-10-22-inscribed-angle-proof-setup":  fig_10_22_inscribed_angle_proof_setup,
    "fig-10-23-two-secants-proof":            fig_10_23_two_secants_proof,
    "fig-10-24-tangent-chord-proof":          fig_10_24_tangent_chord_proof,
    "fig-10-25-two-chords-proof":             fig_10_25_two_chords_proof,
}


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    written = 0
    for fid, fn in FIGURES.items():
        out = OUTPUT_DIR / f"{fid}.svg"
        out.write_text(fn())
        print(f"  ✓ {fid}")
        written += 1
    print(f"\n{written} SVG figures written → {OUTPUT_DIR.relative_to(REPO_ROOT)}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
