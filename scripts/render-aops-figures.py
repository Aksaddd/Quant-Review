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

# ─────────────────────────────────────────────
# Chapter 11 figures
# ─────────────────────────────────────────────

def fig_11_1_six_triangles_classification() -> str:
    """Six small triangles: acute, right, obtuse, scalene, isosceles, equilateral."""
    W, H = 620, 130
    body = []
    # Acute
    body += [segment(40, 100, 130, 100), segment(40, 100, 85, 30), segment(85, 30, 130, 100),
             text(85, 122, "acute", italic=True)]
    # Right
    body += [segment(155, 100, 245, 100), segment(155, 100, 155, 30), segment(155, 30, 245, 100),
             right_angle_mark(155, 100, (165, 100), (155, 90), size=8),
             text(200, 122, "right", italic=True)]
    # Obtuse
    body += [segment(265, 100, 410, 100), segment(265, 100, 350, 50), segment(350, 50, 410, 100),
             text(335, 122, "obtuse", italic=True)]
    # Scalene
    body += [segment(440, 100, 530, 100), segment(440, 100, 470, 35), segment(470, 35, 530, 100),
             text(485, 122, "scalene", italic=True)]
    # Isosceles
    body += [segment(545, 100, 600, 100), segment(545, 100, 572, 35), segment(572, 35, 600, 100),
             text(572, 122, "isosceles", italic=True)]
    # Equilateral
    body += [segment(615, 100, 685, 100), segment(615, 100, 650, 40), segment(650, 40, 685, 100),
             text(650, 122, "equilateral", italic=True)]
    # Reposition: above coordinates exceed W. Rebuild with proper spacing.
    body = []
    width_per = W / 6
    items = [("acute", False, False),
             ("right", True, False),
             ("obtuse", False, True),
             ("scalene", False, False),
             ("isosceles", False, False),
             ("equilateral", False, False)]
    for i, (label, is_right, is_obtuse) in enumerate(items):
        cx0 = i * width_per + 18
        if is_right:
            body += [segment(cx0, 90, cx0 + 70, 90),
                     segment(cx0, 90, cx0, 30), segment(cx0, 30, cx0 + 70, 90),
                     right_angle_mark(cx0, 90, (cx0 + 8, 90), (cx0, 82), size=8)]
        elif is_obtuse:
            body += [segment(cx0, 90, cx0 + 90, 90),
                     segment(cx0, 90, cx0 + 65, 50),
                     segment(cx0 + 65, 50, cx0 + 90, 90)]
        elif label == "isosceles":
            body += [segment(cx0, 90, cx0 + 60, 90),
                     segment(cx0, 90, cx0 + 30, 35),
                     segment(cx0 + 30, 35, cx0 + 60, 90)]
        elif label == "equilateral":
            body += [segment(cx0, 90, cx0 + 60, 90),
                     segment(cx0, 90, cx0 + 30, 90 - 60 * 0.866),
                     segment(cx0 + 30, 90 - 60 * 0.866, cx0 + 60, 90)]
        elif label == "scalene":
            body += [segment(cx0, 90, cx0 + 75, 90),
                     segment(cx0, 90, cx0 + 22, 35),
                     segment(cx0 + 22, 35, cx0 + 75, 90)]
        else:  # acute
            body += [segment(cx0, 90, cx0 + 70, 90),
                     segment(cx0, 90, cx0 + 35, 30),
                     segment(cx0 + 35, 30, cx0 + 70, 90)]
        body += [text(cx0 + 35, 115, label, italic=True, size=12)]
    return svg(W, H, "\n".join(body))


def fig_11_8_pythagorean_setup() -> str:
    """Right triangle ABC with right angle at C; sides a (BC), b (AC), c (AB)."""
    W, H = 220, 180
    A = (40, 40); B = (180, 140); C = (40, 140)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        right_angle_mark(C[0], C[1], (C[0]+10, C[1]), (C[0], C[1]-10), size=8),
        text((A[0]+C[0])/2 - 8, (A[1]+C[1])/2 + 4, "b", italic=True, anchor="end"),
        text((B[0]+C[0])/2, C[1] + 16, "a", italic=True),
        text((A[0]+B[0])/2 + 5, (A[1]+B[1])/2 - 6, "c", italic=True, anchor="start"),
        point(*A, "A", "above-left"),
        point(*B, "B", "right"),
        point(*C, "C", "below-left"),
    ])
    return svg(W, H, body)


def fig_11_11_congruent_triangles_intro() -> str:
    """Two congruent triangles ABC and DEF with hash marks on corresponding sides."""
    W, H = 280, 100
    # Left triangle ABC
    A = (50, 20); B = (90, 80); C = (15, 80)
    # Right triangle DEF (congruent, same shape)
    D = (200, 20); E = (240, 80); F = (165, 80)
    # Hash marks helper
    def hash_mark(p1, p2, n=1, size=5):
        # Place n short hash strokes near midpoint of segment, perpendicular to it
        mx, my = (p1[0]+p2[0])/2, (p1[1]+p2[1])/2
        dx, dy = p2[0]-p1[0], p2[1]-p1[1]
        L = (dx*dx + dy*dy)**0.5
        ux, uy = dx/L, dy/L
        # perpendicular
        px, py = -uy, ux
        out = []
        for i in range(n):
            o = (i - (n-1)/2) * 4
            sx, sy = mx + ux*o, my + uy*o
            out.append(segment(sx - px*size, sy - py*size, sx + px*size, sy + py*size))
        return "\n".join(out)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E), segment(*E, *F), segment(*D, *F),
        hash_mark(A, B, 1), hash_mark(D, E, 1),
        hash_mark(B, C, 2), hash_mark(E, F, 2),
        hash_mark(A, C, 3), hash_mark(D, F, 3),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*D, "D", "above-left", italic=True),
        point(*E, "E", "below-right", italic=True),
        point(*F, "F", "below-left", italic=True),
    ])
    return svg(W, H, body)


def _hash_mark(p1, p2, n=1, size=5):
    """Helper: hash marks (tick marks for equal sides) on segment p1-p2."""
    mx, my = (p1[0]+p2[0])/2, (p1[1]+p2[1])/2
    dx, dy = p2[0]-p1[0], p2[1]-p1[1]
    L = (dx*dx + dy*dy)**0.5
    ux, uy = dx/L, dy/L
    px, py = -uy, ux
    out = []
    for i in range(n):
        o = (i - (n-1)/2) * 4
        sx, sy = mx + ux*o, my + uy*o
        out.append(segment(sx - px*size, sy - py*size, sx + px*size, sy + py*size))
    return "\n".join(out)


def _arc_mark(vx, vy, p1, p2, n=1, r=14):
    """Helper: angle arcs at vertex (vx,vy) between rays to p1 and p2.
    n controls number of nested arcs (for marking different equal-angle sets)."""
    out = []
    for i in range(n):
        out.append(angle_mark(vx, vy, p1, p2, r=r + i * 4))
    return "\n".join(out)


def fig_11_12_sss_theorem() -> str:
    """Two triangles with all three sides marked equal — SSS."""
    W, H = 240, 90
    A = (40, 25); B = (75, 75); C = (10, 75)
    D = (175, 25); E = (210, 75); F = (145, 75)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E), segment(*E, *F), segment(*D, *F),
        _hash_mark(A, B, 1), _hash_mark(D, E, 1),
        _hash_mark(B, C, 2), _hash_mark(E, F, 2),
        _hash_mark(A, C, 3), _hash_mark(D, F, 3),
    ])
    return svg(W, H, body)


def fig_11_13_sas_warning() -> str:
    """SAS — two triangles with two equal sides + included angle equal."""
    W, H = 270, 100
    A = (45, 30); B = (90, 80); C = (15, 80)
    D = (190, 30); E = (235, 80); F = (160, 80)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E), segment(*E, *F), segment(*D, *F),
        _hash_mark(A, B, 1), _hash_mark(D, E, 1),
        _hash_mark(A, C, 2), _hash_mark(D, F, 2),
        _arc_mark(A[0], A[1], B, C, n=1, r=12),
        _arc_mark(D[0], D[1], E, F, n=1, r=12),
    ])
    return svg(W, H, body)


def fig_11_14_asa_theorem() -> str:
    """ASA — two triangles with one matching side and adjacent angles equal."""
    W, H = 260, 100
    A = (40, 30); B = (80, 80); C = (15, 80)
    D = (180, 30); E = (220, 80); F = (155, 80)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E), segment(*E, *F), segment(*D, *F),
        # matching side BC ≅ EF
        _hash_mark(B, C, 1), _hash_mark(E, F, 1),
        # angles at B & C / E & F
        _arc_mark(B[0], B[1], A, C, n=1, r=12),
        _arc_mark(E[0], E[1], D, F, n=1, r=12),
        _arc_mark(C[0], C[1], A, B, n=2, r=10),
        _arc_mark(F[0], F[1], D, E, n=2, r=10),
    ])
    return svg(W, H, body)


def fig_11_15_hl_ll_right_triangles() -> str:
    """HL and LL — pair of right-triangle congruency theorems."""
    W, H = 240, 160
    body = []
    # HL pair (top)
    A = (40, 20); B = (95, 70); C = (40, 70)
    D = (155, 20); E = (210, 70); F = (155, 70)
    body += [segment(*A, *B), segment(*B, *C), segment(*A, *C),
             segment(*D, *E), segment(*E, *F), segment(*D, *F),
             right_angle_mark(C[0], C[1], B, A, size=7),
             right_angle_mark(F[0], F[1], E, D, size=7),
             _hash_mark(A, B, 1), _hash_mark(D, E, 1),  # hypotenuse
             _hash_mark(B, C, 2), _hash_mark(E, F, 2)]  # leg
    # LL pair (bottom)
    A2 = (15, 100); B2 = (15, 145); C2 = (75, 145)
    D2 = (165, 100); E2 = (165, 145); F2 = (225, 145)
    body += [segment(*A2, *B2), segment(*B2, *C2), segment(*A2, *C2),
             segment(*D2, *E2), segment(*E2, *F2), segment(*D2, *F2),
             right_angle_mark(B2[0], B2[1], A2, C2, size=7),
             right_angle_mark(E2[0], E2[1], D2, F2, size=7),
             _hash_mark(A2, B2, 1), _hash_mark(D2, E2, 1),
             _hash_mark(B2, C2, 2), _hash_mark(E2, F2, 2)]
    return svg(W, H, "\n".join(body))


def fig_11_16_example_11_9_kite() -> str:
    """Kite ABCD with congruent triangles ABC and BAD; angles 70° and 60°."""
    W, H = 220, 200
    # Kite: A and B at top, C and D at sides
    A = (75, 50); D = (175, 30)
    B = (155, 130); C = (35, 130)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *A),
        segment(*A, *D), segment(*D, *B),
        text(A[0] + 8, A[1] + 14, "70°", italic=False, size=10),
        text(B[0] - 6, B[1] - 6, "60°", italic=False, size=10),
        point(*A, "A", "left", italic=True),
        point(*B, "B", "below", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*D, "D", "right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_17_example_11_10_isosceles_altitude() -> str:
    """Isosceles ABC with altitude AX from apex to base BC."""
    W, H = 220, 180
    A = (110, 25); B = (185, 155); C = (35, 155)
    X = ((B[0]+C[0])/2, B[1])
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *X),
        right_angle_mark(X[0], X[1], (X[0]+10, X[1]), (X[0], X[1]-10), size=8),
        _hash_mark(A, B, 1), _hash_mark(A, C, 1),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*X, "X", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_11_18_similar_triangles_intro() -> str:
    """Two similar triangles ABC and DEF (same shape, different size)."""
    W, H = 280, 160
    # Larger ABC on left
    A = (75, 25); B = (140, 130); C = (10, 130)
    # Smaller DEF on right (similar, scaled ~0.5)
    D = (215, 60); E = (255, 130); F = (175, 130)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E), segment(*E, *F), segment(*D, *F),
        # side labels
        text((B[0]+C[0])/2, C[1] + 16, "a", italic=True),
        text((A[0]+C[0])/2 - 8, (A[1]+C[1])/2 + 4, "b", italic=True, anchor="end"),
        text((A[0]+B[0])/2 + 8, (A[1]+B[1])/2 - 4, "c", italic=True, anchor="start"),
        text((E[0]+F[0])/2, F[1] + 16, "d", italic=True),
        text((D[0]+F[0])/2 - 6, (D[1]+F[1])/2 + 4, "e", italic=True, anchor="end"),
        text((D[0]+E[0])/2 + 6, (D[1]+E[1])/2 - 4, "f", italic=True, anchor="start"),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*D, "D", "above", italic=True),
        point(*E, "E", "below-right", italic=True),
        point(*F, "F", "below-left", italic=True),
    ])
    return svg(W, H, body)


def fig_11_19_sas_similarity() -> str:
    """Triangle ABC with smaller similar ADE inside (D on AB, E on AC)."""
    W, H = 220, 180
    A = (110, 20); B = (185, 155); C = (35, 155)
    # D and E partway down (50%)
    D = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    E = ((A[0]+C[0])/2, (A[1]+C[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*D, "D", "right", italic=True),
        point(*E, "E", "left", italic=True),
    ])
    return svg(W, H, body)


def fig_11_20_example_11_11() -> str:
    """Triangle ABC with DE parallel to BC (D on AB, E on AC)."""
    W, H = 200, 180
    A = (100, 25); B = (170, 155); C = (30, 155)
    # D at 1/3 down AB, E at 1/3 down AC
    D = (A[0] + (B[0]-A[0])/3, A[1] + (B[1]-A[1])/3)
    E = (A[0] + (C[0]-A[0])/3, A[1] + (C[1]-A[1])/3)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*D, "D", "right", italic=True),
        point(*E, "E", "left", italic=True),
    ])
    return svg(W, H, body)


def fig_11_9_altitude_to_hypotenuse() -> str:
    """Right triangle ACB with altitude CD drawn to hypotenuse AB."""
    W, H = 240, 180
    A = (15, 150); B = (220, 150); C = (90, 30)
    # Foot of altitude D on AB (perpendicular from C)
    # Since AB horizontal, D is (C[0], B[1]); but check that it's between A and B
    D = (C[0], B[1])
    body = "\n".join([
        segment(*A, *B), segment(*A, *C), segment(*B, *C),
        segment(*C, *D),
        right_angle_mark(C[0], C[1], A, B, size=8),
        right_angle_mark(D[0], D[1], (D[0]+10, D[1]), (D[0], D[1]-10), size=7),
        point(*A, "A", "below-left", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "above", italic=True),
        point(*D, "D", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_11_10_angle_bisector_theorem() -> str:
    """Triangle ABC with angle bisector AX extended to E where BE parallel to AC."""
    W, H = 220, 240
    A = (110, 25); B = (200, 165); C = (15, 165)
    # X on BC: angle bisector divides BC in ratio AB:AC
    import math as m
    AB = m.dist(A, B); AC = m.dist(A, C)
    t = AC / (AB + AC)  # X = C + t*(B-C)
    X = (C[0] + t*(B[0]-C[0]), C[1] + t*(B[1]-C[1]))
    # E on extension of AX such that BE || AC
    # Parametric: E = A + s*(X-A) with BE parallel to AC
    # AC direction: (C[0]-A[0], C[1]-A[1])
    # BE direction = E - B; require this is parallel to AC vector
    # E = A + s*(X-A) so E - B = (A + s*(X-A)) - B
    # Solve for s: (E-B) cross (C-A) = 0
    Ax, Ay = A; Bx, By = B; Cx, Cy = C; Xx, Xy = X
    # ((Ax + s*(Xx-Ax)) - Bx) * (Cy-Ay) - ((Ay + s*(Xy-Ay)) - By) * (Cx-Ax) = 0
    # Let dx = Xx-Ax, dy = Xy-Ay, vx = Cx-Ax, vy = Cy-Ay
    dx = Xx-Ax; dy = Xy-Ay; vx = Cx-Ax; vy = Cy-Ay
    # ((Ax-Bx) + s*dx)*vy - ((Ay-By) + s*dy)*vx = 0
    # s*(dx*vy - dy*vx) = -(Ax-Bx)*vy + (Ay-By)*vx
    denom = dx*vy - dy*vx
    s = ((Ay-By)*vx - (Ax-Bx)*vy) / denom if denom else 1.5
    E = (Ax + s*dx, Ay + s*dy)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *E),  # angle bisector AX extended to E
        segment(*B, *E),  # BE
        point(*A, "A", "above", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*X, "X", "above-right", italic=True),
        point(*E, "E", "below-right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_21_example_11_14() -> str:
    """Triangle ABC with angle bisectors AX and BY meeting at incenter I."""
    W, H = 220, 180
    A = (110, 25); B = (190, 155); C = (30, 155)
    import math as m
    a = m.dist(B, C); b = m.dist(A, C); c = m.dist(A, B)
    Ix = (a*A[0] + b*B[0] + c*C[0]) / (a+b+c)
    Iy = (a*A[1] + b*B[1] + c*C[1]) / (a+b+c)
    # X on BC, Y on AC
    def line_intersect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if d == 0: return None
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    X = line_intersect(A, (Ix, Iy), B, C)
    Y = line_intersect(B, (Ix, Iy), A, C)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *X), segment(*B, *Y),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*X, "X", "below", italic=True),
        point(*Y, "Y", "left", italic=True),
        point(Ix, Iy, "I", "right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_22_example_11_15() -> str:
    """Configuration with D on AB, E off the line; auxiliary BH parallel to DE."""
    W, H = 220, 180
    A = (30, 30); D = (90, 100); B = (160, 170)
    E = (180, 35); C = (200, 80)
    H_pt = (210, 115)  # auxiliary
    body = "\n".join([
        segment(*A, *D), segment(*D, *B),  # AD-DB collinear
        segment(*A, *E), segment(*D, *E),  # right angle at E
        segment(*E, *C),
        # auxiliary BH parallel to DE
        f'<line x1="{B[0]}" y1="{B[1]}" x2="{H_pt[0]}" y2="{H_pt[1]}" stroke="#1d1d1f" stroke-width="1.4" stroke-dasharray="3,3" fill="none"/>',
        right_angle_mark(E[0], E[1], A, D, size=7),
        point(*A, "A", "left", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*E, "E", "above-right", italic=True),
        point(*C, "C", "right", italic=True),
        point(*H_pt, "H", "right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_23_trig_right_triangle() -> str:
    """Right triangle ABC for sin/cos/tan definitions; sides a, b, c."""
    W, H = 220, 160
    A = (30, 30); B = (190, 130); C = (30, 130)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        right_angle_mark(C[0], C[1], B, A, size=8),
        text(C[0] - 12, (A[1]+C[1])/2 + 4, "b", italic=True, anchor="end"),
        text((B[0]+C[0])/2, C[1] + 16, "a", italic=True),
        text((A[0]+B[0])/2 + 6, (A[1]+B[1])/2 - 4, "c", italic=True, anchor="start"),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below-left", italic=True),
    ])
    return svg(W, H, body)


def fig_11_24_45_45_90() -> str:
    """45-45-90 isosceles right triangle with legs a and hypotenuse a√2."""
    W, H = 200, 160
    A = (30, 30); B = (160, 130); C = (30, 130)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        right_angle_mark(C[0], C[1], B, A, size=8),
        text(C[0] - 8, (A[1]+C[1])/2 + 4, "a", italic=True, anchor="end"),
        text((B[0]+C[0])/2, C[1] + 16, "a", italic=True),
        text((A[0]+B[0])/2 + 8, (A[1]+B[1])/2 - 4, "a√2", italic=True, anchor="start"),
    ])
    return svg(W, H, body)


def fig_11_25_30_60_90() -> str:
    """30-60-90 triangle with sides in ratio 1 : √3 : 2."""
    W, H = 220, 160
    # 30 at top, 60 at bottom-left, 90 at bottom-right
    A = (160, 30); B = (40, 130); C = (160, 130)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        right_angle_mark(C[0], C[1], B, A, size=8),
        text(A[0] - 12, A[1] + 18, "30°", italic=False, anchor="end", size=11),
        text(B[0] + 18, B[1] - 4, "60°", italic=False, anchor="start", size=11),
        text((B[0]+C[0])/2, C[1] + 16, "a√3", italic=True),
        text(C[0] + 6, (A[1]+C[1])/2 + 4, "a", italic=True, anchor="start"),
        text((A[0]+B[0])/2 - 8, (A[1]+B[1])/2 - 4, "2a", italic=True, anchor="end"),
    ])
    return svg(W, H, body)


def fig_11_26_example_11_18() -> str:
    """Isosceles ABC with AB=AC=50, base BC=80, altitude AX."""
    W, H = 220, 130
    A = (110, 20); B = (200, 110); C = (20, 110)
    X = ((B[0]+C[0])/2, B[1])
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *X),
        right_angle_mark(X[0], X[1], (X[0]+10, X[1]), (X[0], X[1]-10), size=7),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*X, "X", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_11_27_rectangle_two_triangles() -> str:
    """Rectangle ABCD split by diagonal into two congruent right triangles."""
    W, H = 220, 130
    A = (30, 30); D = (180, 30); C = (180, 110); B = (30, 110)
    body = "\n".join([
        segment(*A, *D), segment(*D, *C), segment(*C, *B), segment(*B, *A),
        # Diagonal BC (or actually AC for split)
        segment(*A, *C),
        right_angle_mark(A[0], A[1], (A[0]+12, A[1]), (A[0], A[1]+12), size=7),
        right_angle_mark(C[0], C[1], (C[0]-12, C[1]), (C[0], C[1]-12), size=7),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "below-left", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "above-right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_28_acute_altitude() -> str:
    """Acute triangle ABC with altitude AX dividing into right triangles."""
    W, H = 220, 130
    A = (110, 20); B = (200, 110); C = (20, 110)
    X = (105, 110)  # foot inside BC
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *X),
        right_angle_mark(X[0], X[1], (X[0]+10, X[1]), (X[0], X[1]-10), size=7),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "below-right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(*X, "X", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_11_29_incircle_inradii() -> str:
    """Triangle ABC with incircle and inradii to tangent points X, Y, Z; incenter I."""
    W, H = 240, 220
    A = (120, 20); B = (215, 195); C = (25, 195)
    import math as m
    a = m.dist(B, C); b = m.dist(A, C); c = m.dist(A, B); s = (a+b+c)/2
    Ix = (a*A[0] + b*B[0] + c*C[0]) / (a+b+c)
    Iy = (a*A[1] + b*B[1] + c*C[1]) / (a+b+c)
    area = abs((B[0]-A[0])*(C[1]-A[1]) - (C[0]-A[0])*(B[1]-A[1])) / 2
    r = area / s
    # Tangent points: project I perpendicular to each side
    def foot(p, q, P):
        # Foot of perpendicular from P to line p-q
        dx, dy = q[0]-p[0], q[1]-p[1]
        t = ((P[0]-p[0])*dx + (P[1]-p[1])*dy) / (dx*dx + dy*dy)
        return (p[0]+t*dx, p[1]+t*dy)
    X = foot(B, C, (Ix, Iy))   # tangent on BC
    Y = foot(A, C, (Ix, Iy))   # tangent on AC
    Z = foot(A, B, (Ix, Iy))   # tangent on AB
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        circle(Ix, Iy, r),
        # Connect I to vertices
        segment(Ix, Iy, *A), segment(Ix, Iy, *B), segment(Ix, Iy, *C),
        # Inradii from I to tangent points
        segment(Ix, Iy, *X), segment(Ix, Iy, *Y), segment(Ix, Iy, *Z),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below-left", italic=True),
        point(Ix, Iy, "I", "right", italic=True),
        point(*X, "X", "below", italic=True),
        point(*Y, "Y", "left", italic=True),
        point(*Z, "Z", "above-right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_30_pythagorean_square_proof() -> str:
    """Large square of side c with four right triangles around an inner tilted square (Pythagorean proof)."""
    W, H = 200, 200
    L = 160
    ox, oy = 20, 20
    # Outer square corners
    P1 = (ox, oy); P2 = (ox + L, oy); P3 = (ox + L, oy + L); P4 = (ox, oy + L)
    # Inner square — tilted: vertices on each outer side at distance a (or b)
    a = 50  # leg a
    # Going around outer square clockwise: top side from P1 to P2, point at offset a from P1
    Q1 = (ox + a, oy)               # on top edge, a from P1
    Q2 = (ox + L, oy + a)           # on right edge, a from P2
    Q3 = (ox + L - a, oy + L)       # on bottom edge, a from P3
    Q4 = (ox, oy + L - a)           # on left edge, a from P4
    body = "\n".join([
        # Outer square
        segment(*P1, *P2), segment(*P2, *P3), segment(*P3, *P4), segment(*P4, *P1),
        # Inner tilted square (chord c)
        segment(*Q1, *Q2), segment(*Q2, *Q3), segment(*Q3, *Q4), segment(*Q4, *Q1),
        # Inner labels (a, b, c)
        text(ox + a/2, oy - 6, "a", italic=True, size=11, anchor="middle"),
        text(ox + a + (L-a)/2, oy - 6, "b", italic=True, size=11, anchor="middle"),
        text((Q1[0]+Q2[0])/2 + 8, (Q1[1]+Q2[1])/2 - 4, "c", italic=True, size=11, anchor="start"),
    ])
    return svg(W, H, body)


def fig_11_31_parallel_transversal_angles() -> str:
    """Two lines and a transversal with angles α, β, θ, φ marked at intersections."""
    W, H = 200, 200
    body = []
    # two parallel lines
    body.append(segment(20, 60, 180, 60))
    body.append(segment(20, 140, 180, 140))
    # transversal (slope ~75°)
    body.append(segment(60, 20, 160, 180))
    # angle labels at upper intersection (~95, 60)
    body.append(text(85, 50, "α", italic=True, size=11, anchor="end"))
    body.append(text(112, 53, "θ", italic=True, size=11, anchor="start"))
    body.append(text(85, 78, "β", italic=True, size=11, anchor="end"))
    body.append(text(112, 78, "φ", italic=True, size=11, anchor="start"))
    return svg(W, H, "\n".join(body))


def fig_11_32_example_11_25_setup() -> str:
    """Triangle ABC with E on AB, D on BC, F at intersection of AD and CE."""
    W, H = 220, 160
    A = (25, 130); B = (110, 25); C = (200, 130)
    # E on AB, D on BC
    E = (A[0] + (B[0]-A[0])*0.7, A[1] + (B[1]-A[1])*0.7)
    D = (B[0] + (C[0]-B[0])*0.4, B[1] + (C[1]-B[1])*0.4)
    # F = intersection of AD and CE
    def line_intersect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if d == 0: return None
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    F = line_intersect(A, D, C, E)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *D), segment(*C, *E),
        point(*A, "A", "below-left", italic=True),
        point(*B, "B", "above", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*E, "E", "above-left", italic=True),
        point(*D, "D", "above-right", italic=True),
        point(*F, "F", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_11_33_example_11_25_with_aux() -> str:
    """Same configuration with auxiliary DH parallel to EA."""
    W, H = 220, 160
    A = (25, 130); B = (110, 25); C = (200, 130)
    E = (A[0] + (B[0]-A[0])*0.7, A[1] + (B[1]-A[1])*0.7)
    D = (B[0] + (C[0]-B[0])*0.4, B[1] + (C[1]-B[1])*0.4)
    def line_intersect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if d == 0: return None
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    F = line_intersect(A, D, C, E)
    # H on AC such that DH parallel to EA
    # EA direction = A-E
    eax, eay = A[0]-E[0], A[1]-E[1]
    # H = D + t*(eax, eay), and on AC. AC param: A + u*(C-A)
    # D[0] + t*eax = A[0] + u*(C[0]-A[0])
    # D[1] + t*eay = A[1] + u*(C[1]-A[1])
    cax, cay = C[0]-A[0], C[1]-A[1]
    denom = eax * cay - eay * cax
    if denom != 0:
        u = ((D[0]-A[0])*eay - (D[1]-A[1])*eax) / -denom
        H_pt = (A[0] + u*cax, A[1] + u*cay)
    else:
        H_pt = (D[0] + 30, D[1] + 20)
    G = line_intersect(D, H_pt, C, E)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *D), segment(*C, *E),
        f'<line x1="{D[0]}" y1="{D[1]}" x2="{H_pt[0]}" y2="{H_pt[1]}" stroke="#1d1d1f" stroke-width="1.4" stroke-dasharray="3,3" fill="none"/>',
        point(*A, "A", "below-left", italic=True),
        point(*B, "B", "above", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*E, "E", "above-left", italic=True),
        point(*D, "D", "above-right", italic=True),
        point(*F, "F", "below", italic=True),
        point(*H_pt, "H", "below-right", italic=True),
        point(*G, "G", "left", italic=True),
    ])
    return svg(W, H, body)


def fig_11_2_medians_centroid() -> str:
    """Triangle ABC with medians AE, BF, CD meeting at centroid G."""
    W, H = 220, 200
    A = (115, 30); B = (185, 165); C = (35, 165)
    # Midpoints
    D = ((A[0]+C[0])/2, (A[1]+C[1])/2)
    E = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    F = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    # Centroid
    G = ((A[0]+B[0]+C[0])/3, (A[1]+B[1]+C[1])/3)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *A),
        segment(*A, *E), segment(*B, *D), segment(*C, *F),
        # Tick marks at midpoints (visual only)
        point(*A, "A", "above"), point(*B, "B", "below-right"),
        point(*C, "C", "below-left"), point(*D, "D", "left"),
        point(*E, "E", "right"), point(*F, "F", "above-right"),
        point(*G, "G", "right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_3_angle_bisectors_incenter() -> str:
    """Triangle ABC with angle bisectors meeting at incenter I."""
    W, H = 220, 200
    A = (110, 30); B = (190, 170); C = (30, 170)
    # Angle bisectors (approximate intersection points on opposite sides)
    # Use the incenter formula: weighted by side lengths
    import math as m
    a = m.dist(B, C); b = m.dist(A, C); c = m.dist(A, B)
    Ix = (a*A[0] + b*B[0] + c*C[0]) / (a+b+c)
    Iy = (a*A[1] + b*B[1] + c*C[1]) / (a+b+c)
    # Bisector from A to opposite side at D
    # Use parametric: shoot from A through I, find intersection with BC
    def line_intersect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if d == 0: return None
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    D = line_intersect(A, (Ix, Iy), B, C)
    E = line_intersect(B, (Ix, Iy), A, C)
    F = line_intersect(C, (Ix, Iy), A, B)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *A),
        segment(*A, *D), segment(*B, *E), segment(*C, *F),
        point(*A, "A", "above"), point(*B, "B", "below-right"),
        point(*C, "C", "below-left"),
        point(*D, "D", "below", italic=True),
        point(*E, "E", "right", italic=True),
        point(*F, "F", "above-left", italic=True),
        point(Ix, Iy, "I", "right", italic=True),
    ])
    return svg(W, H, body)


def fig_11_4_incircle() -> str:
    """Triangle ABC with inscribed incircle of radius r at incenter I."""
    W, H = 200, 200
    A = (100, 30); B = (175, 170); C = (25, 170)
    import math as m
    a = m.dist(B, C); b = m.dist(A, C); c = m.dist(A, B)
    s = (a+b+c)/2
    Ix = (a*A[0] + b*B[0] + c*C[0]) / (a+b+c)
    Iy = (a*A[1] + b*B[1] + c*C[1]) / (a+b+c)
    # inradius = area / s; area via cross product
    area = abs((B[0]-A[0])*(C[1]-A[1]) - (C[0]-A[0])*(B[1]-A[1])) / 2
    r = area / s
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *A),
        circle(Ix, Iy, r),
        point(Ix, Iy, "I", "left", italic=True),
        text(Ix + 4, Iy - 4, "r", italic=True, anchor="start", size=12),
        point(*A, "A", "above"), point(*B, "B", "below-right"),
        point(*C, "C", "below-left"),
    ])
    return svg(W, H, body)


def fig_11_5_three_circumcircles() -> str:
    """Three circumcircles: acute (center inside), right (center on hypotenuse), obtuse (center outside)."""
    W, H = 640, 200
    body = []
    # Acute triangle inscribed in circle (center inside)
    cx1, cy1, r1 = 105, 100, 75
    body.append(circle(cx1, cy1, r1))
    A1 = (cx1 + r1 * 0, cy1 - r1)            # top
    B1 = (cx1 - r1 * 0.95, cy1 + r1 * 0.31)  # left
    C1 = (cx1 + r1 * 0.78, cy1 + r1 * 0.62)  # bottom-right
    body += [segment(*A1, *B1), segment(*B1, *C1), segment(*C1, *A1)]
    body += [point(cx1, cy1, "O", "below", italic=True),
             point(*A1, "A", "above"),
             point(*B1, "B", "left"),
             point(*C1, "C", "right")]
    body += [text(cx1 - 15, cy1 - 35, "R", italic=True, size=11)]
    # Right triangle (center at midpoint of hypotenuse)
    cx2, cy2, r2 = 320, 100, 75
    body.append(circle(cx2, cy2, r2))
    # Hypotenuse horizontal, A on top
    Ar = (cx2, cy2 - r2); Br = (cx2 - r2, cy2); Cr = (cx2 + r2, cy2)
    body += [segment(*Ar, *Br), segment(*Br, *Cr), segment(*Ar, *Cr),
             right_angle_mark(Ar[0], Ar[1], (Ar[0]+10, Ar[1]), (Ar[0]-10, Ar[1]+10), size=8)]
    body += [point(cx2, cy2, "O", "below", italic=True),
             point(*Ar, "A", "above"), point(*Br, "B", "left"), point(*Cr, "C", "right")]
    # Obtuse triangle (center outside)
    cx3, cy3, r3 = 530, 100, 75
    body.append(circle(cx3, cy3, r3))
    # Obtuse triangle: A near top, B and C close together below — center O ends up outside?
    # For pure obtuse, place A at top, B at bottom-mid, C nearby — but center is determined by circle.
    # Just place 3 points on circle to look obtuse.
    Ao = (cx3 - r3 * 0.15, cy3 - r3 * 0.99)
    Bo = (cx3 - r3 * 0.96, cy3 + r3 * 0.28)
    Co = (cx3 + r3 * 0.31, cy3 + r3 * 0.95)
    body += [segment(*Ao, *Bo), segment(*Bo, *Co), segment(*Co, *Ao)]
    body += [point(cx3, cy3, "O", "below", italic=True),
             point(*Ao, "A", "above"), point(*Bo, "B", "left"), point(*Co, "C", "below")]
    return svg(W, H, "\n".join(body))


def fig_11_6_altitude_extended() -> str:
    """Obtuse triangle ABC with altitude AD drawn to extension of side BC."""
    W, H = 220, 200
    A = (130, 40); B = (180, 165); C = (90, 165)
    # AD perpendicular to line BC extended; D is to the left of C
    # Since BC is horizontal here, D is at (cx, By) with cx < C[0]
    D = (50, 165)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        # Extension of BC dashed
        f'<line x1="{C[0]}" y1="{C[1]}" x2="{D[0]}" y2="{D[1]}" stroke="#1d1d1f" stroke-width="1.4" stroke-dasharray="3,3" fill="none"/>',
        # Altitude AD
        segment(*A, *D),
        right_angle_mark(D[0], D[1], (D[0]+10, D[1]), (D[0], D[1]-10), size=8),
        point(*A, "A", "above"), point(*B, "B", "below-right"),
        point(*C, "C", "below"), point(*D, "D", "below"),
    ])
    return svg(W, H, body)


def fig_11_7_right_triangle_semicircle() -> str:
    """Right triangle ABC inscribed in circle with center O at midpoint of hypotenuse AB."""
    W, H = 220, 200
    cx, cy, r = 110, 110, 75
    A = (cx - r, cy); B = (cx + r, cy)  # diameter
    # C on the upper semicircle
    import math as m
    th = m.radians(60)
    C = (cx + r * m.cos(th), cy - r * m.sin(th))
    body = "\n".join([
        circle(cx, cy, r),
        segment(*A, *B), segment(*A, *C), segment(*B, *C),
        right_angle_mark(C[0], C[1], A, B, size=8),
        point(cx, cy, "O", "below", italic=True),
        point(*A, "A", "left"), point(*B, "B", "right"),
        point(*C, "C", "above-right"),
    ])
    return svg(W, H, body)


# ─────────────────────────────────────────────
# Chapter 12 figures
# ─────────────────────────────────────────────

def fig_12_1_convex_concave_quadrilaterals() -> str:
    """Two quadrilaterals: convex ABCD and concave EFGH (with reflex at F)."""
    W, Ht = 280, 130
    A = (50, 20); B = (90, 50); C = (75, 105); D = (15, 75)
    E = (170, 25); F = (215, 65); G = (180, 110); Hp = (260, 70)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C),
        segment(*E, *F), segment(*F, *G), segment(*G, *Hp), segment(*Hp, *E),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below", italic=True),
        point(*D, "D", "left", italic=True),
        point(*E, "E", "above-left", italic=True),
        point(*F, "F", "left", italic=True),
        point(*G, "G", "below", italic=True),
        point(*Hp, "H", "right", italic=True),
        text(50, 125, "convex", italic=True, size=10),
        text(200, 125, "concave", italic=True, size=10),
    ])
    return svg(W, Ht, body)


def fig_12_2_trapezoid_with_median() -> str:
    """Trapezoid ABCD with median XY and altitude EF."""
    W, H = 240, 140
    A = (70, 30); B = (170, 30); D = (15, 110); C = (225, 110)
    E = (70, 110); F = (170, 110)
    X = ((A[0]+D[0])/2, (A[1]+D[1])/2)
    Y = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        f'<line x1="{A[0]}" y1="{A[1]}" x2="{E[0]}" y2="{E[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        segment(*X, *Y),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "above", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*X, "X", "left", italic=True),
        point(*Y, "Y", "right", italic=True),
        point(*E, "E", "below", italic=True),
        point(*F, "F", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_12_3_trapezoid_median_proof() -> str:
    """Trapezoid with altitudes AE, BF forming rectangles for the median proof."""
    W, H = 260, 160
    A = (80, 40); B = (175, 40); D = (15, 130); C = (245, 130)
    E = (80, 130); F = (175, 130)
    Wp = (50, 85); Z = (215, 85)
    X = ((A[0]+D[0])/2, (A[1]+D[1])/2)
    Y = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *E), segment(*B, *F),
        right_angle_mark(E[0], E[1], (E[0]+10, E[1]), (E[0], E[1]-10), size=6),
        right_angle_mark(F[0], F[1], (F[0]+10, F[1]), (F[0], F[1]-10), size=6),
        segment(*X, *Y),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "above", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*X, "X", "left", italic=True),
        point(*Y, "Y", "right", italic=True),
        point(*E, "E", "below", italic=True),
        point(*F, "F", "below", italic=True),
        point(*Wp, "W", "below-left", italic=True),
        point(*Z, "Z", "below-right", italic=True),
    ])
    return svg(W, H, body)


def fig_12_4_isosceles_trapezoid_diagonals() -> str:
    """Isosceles trapezoid ABCD with altitudes DX, CY and both diagonals."""
    W, H = 260, 140
    D = (75, 30); C = (185, 30)
    A = (35, 110); B = (225, 110)
    X = (75, 110); Y = (185, 110)
    body = "\n".join([
        segment(*D, *C), segment(*C, *B), segment(*B, *A), segment(*A, *D),
        f'<line x1="{D[0]}" y1="{D[1]}" x2="{X[0]}" y2="{X[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        f'<line x1="{C[0]}" y1="{C[1]}" x2="{Y[0]}" y2="{Y[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        segment(*A, *C), segment(*B, *D),
        point(*A, "A", "below", italic=True),
        point(*B, "B", "below", italic=True),
        point(*C, "C", "above", italic=True),
        point(*D, "D", "above", italic=True),
        point(*X, "X", "below", italic=True),
        point(*Y, "Y", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_12_5_example_12_1() -> str:
    """Isosceles trapezoid for Ex 12-1: smaller base 5, altitude 4, leg 8."""
    W, H = 280, 140
    A = (110, 30); B = (170, 30); D = (35, 110); C = (245, 110)
    X = (110, 110); Y = (170, 110)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        f'<line x1="{A[0]}" y1="{A[1]}" x2="{X[0]}" y2="{X[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        f'<line x1="{B[0]}" y1="{B[1]}" x2="{Y[0]}" y2="{Y[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        text((A[0]+B[0])/2, A[1] - 6, "5", italic=False, size=11),
        text(B[0] + 4, (B[1]+Y[1])/2, "4", italic=False, anchor="start", size=11),
        text((B[0]+C[0])/2 + 6, (B[1]+C[1])/2 - 4, "8", italic=False, anchor="start", size=11),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*X, "X", "below", italic=True),
        point(*Y, "Y", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_12_6_parallelogram_diagonals() -> str:
    """Parallelogram ABCD with diagonals intersecting at E."""
    W, H = 220, 120
    A = (45, 25); B = (200, 25); C = (175, 95); D = (20, 95)
    E = ((A[0]+C[0])/2, (A[1]+C[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C), segment(*B, *D),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*E, "E", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_12_7_parallelogram_d1_d2_theta() -> str:
    """Parallelogram with diagonals d1, d2 meeting at E with angle θ."""
    W, H = 240, 130
    A = (50, 30); B = (215, 30); C = (190, 100); D = (25, 100)
    E = ((A[0]+C[0])/2, (A[1]+C[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C), segment(*B, *D),
        text(E[0] - 4, E[1] - 8, "θ", italic=True, size=11, anchor="end"),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*E, "E", "below", italic=True),
    ])
    return svg(W, H, body)


def fig_12_8_rhombus_diagonals() -> str:
    """Rhombus ABCD with perpendicular diagonals at E."""
    W, H = 220, 160
    A = (110, 20); B = (200, 80); C = (110, 140); D = (20, 80)
    E = (110, 80)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C), segment(*B, *D),
        right_angle_mark(E[0], E[1], (E[0]+10, E[1]), (E[0], E[1]-10), size=6),
        _hash_mark(A, B, 1), _hash_mark(B, C, 1), _hash_mark(C, D, 1), _hash_mark(D, A, 1),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below", italic=True),
        point(*D, "D", "left", italic=True),
        point(*E, "E", "below-right", italic=True),
    ])
    return svg(W, H, body)


def fig_12_9_example_12_3_rhombus() -> str:
    """Rhombus ABCD for Ex 12-3 with diagonals at E."""
    W, H = 240, 180
    A = (120, 25); B = (220, 90); C = (120, 155); D = (20, 90)
    E = (120, 90)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C), segment(*B, *D),
        right_angle_mark(E[0], E[1], (E[0]+10, E[1]), (E[0], E[1]-10), size=6),
        point(*A, "A", "above", italic=True),
        point(*B, "B", "right", italic=True),
        point(*C, "C", "below", italic=True),
        point(*D, "D", "left", italic=True),
        point(*E, "E", "above-right", italic=True),
    ])
    return svg(W, H, body)


def fig_12_10_rectangle() -> str:
    """Rectangle ABCD with right angle marks and equal opposite sides."""
    W, H = 240, 130
    A = (30, 30); B = (210, 30); C = (210, 100); D = (30, 100)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        right_angle_mark(A[0], A[1], (A[0]+12, A[1]), (A[0], A[1]+12), size=7),
        right_angle_mark(B[0], B[1], (B[0]-12, B[1]), (B[0], B[1]+12), size=7),
        right_angle_mark(C[0], C[1], (C[0]-12, C[1]), (C[0], C[1]-12), size=7),
        right_angle_mark(D[0], D[1], (D[0]+12, D[1]), (D[0], D[1]-12), size=7),
        _hash_mark(A, B, 1), _hash_mark(D, C, 1),
        _hash_mark(B, C, 2), _hash_mark(A, D, 2),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
    ])
    return svg(W, H, body)


def fig_12_11_square() -> str:
    """Square ABCD with all four sides marked equal and a diagonal drawn."""
    W, H = 220, 160
    A = (60, 25); B = (160, 25); C = (160, 125); D = (60, 125)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C),
        right_angle_mark(A[0], A[1], (A[0]+12, A[1]), (A[0], A[1]+12), size=7),
        right_angle_mark(B[0], B[1], (B[0]-12, B[1]), (B[0], B[1]+12), size=7),
        right_angle_mark(C[0], C[1], (C[0]-12, C[1]), (C[0], C[1]-12), size=7),
        right_angle_mark(D[0], D[1], (D[0]+12, D[1]), (D[0], D[1]-12), size=7),
        _hash_mark(A, B, 1), _hash_mark(B, C, 1),
        _hash_mark(C, D, 1), _hash_mark(D, A, 1),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
    ])
    return svg(W, H, body)


def fig_12_12_example_12_5_inscribed_square() -> str:
    """Square ABCD with midpoints E, F, G, H connected to form inscribed square."""
    W, H = 220, 180
    A = (50, 30); B = (180, 30); C = (180, 160); D = (50, 160)
    E = ((A[0]+B[0])/2, A[1])
    F = (B[0], (B[1]+C[1])/2)
    G = ((C[0]+D[0])/2, C[1])
    Hp = (A[0], (A[1]+D[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*E, *F), segment(*F, *G), segment(*G, *Hp), segment(*Hp, *E),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*E, "E", "above", italic=True),
        point(*F, "F", "right", italic=True),
        point(*G, "G", "below", italic=True),
        point(*Hp, "H", "left", italic=True),
    ])
    return svg(W, H, body)


def fig_12_13_example_12_8_midpoints() -> str:
    """Parallelogram ABCD with midpoints E, F, G, H connected as inner parallelogram."""
    W, H = 240, 160
    A = (60, 30); B = (215, 30); C = (185, 130); D = (30, 130)
    E = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    F = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    G = ((C[0]+D[0])/2, (C[1]+D[1])/2)
    Hp = ((D[0]+A[0])/2, (D[1]+A[1])/2)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*E, *F), segment(*F, *G), segment(*G, *Hp), segment(*Hp, *E),
        point(*A, "A", "above-left", italic=True),
        point(*B, "B", "above-right", italic=True),
        point(*C, "C", "below-right", italic=True),
        point(*D, "D", "below-left", italic=True),
        point(*E, "E", "above", italic=True),
        point(*F, "F", "right", italic=True),
        point(*G, "G", "below", italic=True),
        point(*Hp, "H", "left", italic=True),
    ])
    return svg(W, H, body)


# ─────────────────────────────────────────────
# Chapter 13 figures
# ─────────────────────────────────────────────

def _regular_polygon(cx, cy, r, n, rotation_deg=-90):
    """Return list of (x,y) vertices of a regular n-gon centered at (cx,cy)
    with circumradius r. rotation_deg controls orientation (default puts
    a vertex on top)."""
    import math as m
    return [
        (cx + r * m.cos(m.radians(rotation_deg + 360 * i / n)),
         cy + r * m.sin(m.radians(rotation_deg + 360 * i / n)))
        for i in range(n)
    ]


def fig_13_1_three_regular_polygons() -> str:
    """Three small regular polygons: pentagon, hexagon, octagon."""
    W, Ht = 240, 160
    body = []
    # Pentagon
    for i, n in enumerate([5, 6, 8]):
        cx = 50 + i * 80
        cy = 70
        verts = _regular_polygon(cx, cy, 32, n)
        for j in range(n):
            p1, p2 = verts[j], verts[(j+1) % n]
            body.append(segment(*p1, *p2))
    return svg(W, Ht, "\n".join(body))


def fig_13_2_polygon_diagonals_from_vertex() -> str:
    """Polygon with all diagonals drawn from a single vertex."""
    W, Ht = 220, 130
    cx, cy, r, n = 105, 65, 55, 8
    verts = _regular_polygon(cx, cy, r, n, rotation_deg=-100)
    body = []
    # Sides
    for i in range(n):
        body.append(segment(*verts[i], *verts[(i+1) % n]))
    # Diagonals from vertex 0 (top-ish)
    v0 = verts[0]
    for i in range(2, n - 1):
        body.append(segment(*v0, *verts[i]))
    return svg(W, Ht, "\n".join(body))


def fig_13_3_polygon_interior_exterior_angles() -> str:
    """Hexagon with interior angles β_i and exterior angles α_i at each vertex."""
    W, Ht = 220, 220
    cx, cy, r, n = 110, 110, 65, 6
    verts = _regular_polygon(cx, cy, r, n, rotation_deg=-90)
    body = []
    # sides
    for i in range(n):
        body.append(segment(*verts[i], *verts[(i+1) % n]))
    # extend each side past its vertex to show exterior angle
    import math as m
    for i in range(n):
        p = verts[i]
        prev = verts[(i - 1) % n]
        # extend from prev through p
        dx = p[0] - prev[0]
        dy = p[1] - prev[1]
        L = m.hypot(dx, dy)
        ex = p[0] + dx * 25 / L
        ey = p[1] + dy * 25 / L
        body.append(segment(*p, ex, ey))
        # label αi outside, βi inside
        # midway extension for α
        body.append(text(ex - dy * 4 / L, ey + dx * 4 / L, f"α{i+1}", italic=True, size=9, anchor="middle"))
        # inside the polygon for β
        ix = p[0] + (cx - p[0]) * 0.18
        iy = p[1] + (cy - p[1]) * 0.18
        body.append(text(ix, iy, f"β{i+1}", italic=True, size=9, anchor="middle"))
    return svg(W, Ht, "\n".join(body))


def fig_13_4_example_13_1_hexagon_equilateral() -> str:
    """Regular hexagon ABCDEF with inscribed equilateral triangle ACE."""
    W, Ht = 240, 200
    cx, cy, r = 120, 100, 75
    verts = _regular_polygon(cx, cy, r, 6, rotation_deg=-60)
    labels = ["B", "A", "F", "E", "D", "C"]
    pos = ["above-left", "above-right", "right", "below-right", "below-left", "left"]
    body = []
    # Hexagon
    for i in range(6):
        body.append(segment(*verts[i], *verts[(i+1) % 6]))
    # Triangle ACE: vertices at indices for A, C, E
    A = verts[1]; C = verts[5]; E = verts[3]
    body.append(segment(*A, *C))
    body.append(segment(*C, *E))
    body.append(segment(*E, *A))
    for v, lab, p in zip(verts, labels, pos):
        body.append(point(*v, lab, p, italic=True))
    return svg(W, Ht, "\n".join(body))


def fig_13_5_example_13_3_dodecagon_trapezoid() -> str:
    """Trapezoid section ABCD of a regular dodecagon with perpendiculars BX, CY."""
    W, Ht = 260, 130
    A = (30, 100); D = (235, 100)
    B = (90, 30); C = (175, 30)
    X = (90, 100); Y = (175, 100)
    body = "\n".join([
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        f'<line x1="{B[0]}" y1="{B[1]}" x2="{X[0]}" y2="{X[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        f'<line x1="{C[0]}" y1="{C[1]}" x2="{Y[0]}" y2="{Y[1]}" stroke="#1d1d1f" stroke-width="1.0" stroke-dasharray="3,3" fill="none"/>',
        right_angle_mark(X[0], X[1], (X[0]+10, X[1]), (X[0], X[1]-10), size=6),
        right_angle_mark(Y[0], Y[1], (Y[0]-10, Y[1]), (Y[0], Y[1]-10), size=6),
        point(*A, "A", "below-left", italic=True),
        point(*B, "B", "above-left", italic=True),
        point(*C, "C", "above-right", italic=True),
        point(*D, "D", "below-right", italic=True),
        point(*X, "X", "below", italic=True),
        point(*Y, "Y", "below", italic=True),
    ])
    return svg(W, Ht, body)


def fig_13_6_hexagon_inscribed_circumscribed() -> str:
    """Regular hexagon with inscribed circle r and circumscribed circle R."""
    W, Ht = 240, 240
    import math as m
    cx, cy, R = 120, 120, 90
    verts = _regular_polygon(cx, cy, R, 6, rotation_deg=-90)
    # Apothem r = R * cos(30°)
    r = R * m.cos(m.radians(30))
    # Triangle AXO: A is one vertex, X is midpoint of side AB, O is center
    A = verts[0]
    B = verts[1]
    X = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    body = []
    body.append(circle(cx, cy, R))
    body.append(circle(cx, cy, r))
    for i in range(6):
        body.append(segment(*verts[i], *verts[(i+1) % 6]))
    body.append(segment(cx, cy, *A))
    body.append(segment(cx, cy, *X))
    body.append(segment(*A, *X))
    right_angle_mark_part = right_angle_mark(X[0], X[1], (cx, cy), A, size=6)
    body.append(right_angle_mark_part)
    body.append(point(cx, cy, "O", "below", italic=True))
    body.append(point(*A, "A", "above", italic=True))
    body.append(point(*X, "X", "above-right", italic=True))
    body.append(text((cx + A[0])/2 + 4, (cy + A[1])/2, "R", italic=True, size=11, anchor="start"))
    body.append(text((cx + X[0])/2, (cy + X[1])/2 + 8, "r", italic=True, size=11))
    body.append(text(cx + 8, cy + 14, "θ", italic=True, size=10))
    return svg(W, Ht, "\n".join(body))


def fig_13_7_hexagon_six_equilateral_triangles() -> str:
    """Regular hexagon ABCDEF with center O divided into 6 equilateral triangles."""
    W, Ht = 240, 200
    cx, cy, r = 120, 100, 80
    verts = _regular_polygon(cx, cy, r, 6, rotation_deg=-60)
    labels = ["B", "A", "F", "E", "D", "C"]
    pos = ["above-left", "above-right", "right", "below-right", "below-left", "left"]
    body = []
    for i in range(6):
        body.append(segment(*verts[i], *verts[(i+1) % 6]))
        body.append(segment(cx, cy, *verts[i]))
    body.append(point(cx, cy, "O", "below-right", italic=True))
    for v, lab, p in zip(verts, labels, pos):
        body.append(point(*v, lab, p, italic=True))
    return svg(W, Ht, "\n".join(body))


def fig_13_8_example_13_4_hexagon_all_segments() -> str:
    """Six points on a circle with all 15 connecting segments drawn."""
    W, Ht = 180, 180
    cx, cy, r = 90, 90, 70
    verts = _regular_polygon(cx, cy, r, 6, rotation_deg=-90)
    body = []
    body.append(circle(cx, cy, r))
    # All C(6,2) = 15 segments
    for i in range(6):
        for j in range(i+1, 6):
            body.append(segment(*verts[i], *verts[j]))
    # Dots at vertices
    for v in verts:
        body.append(f'<circle cx="{v[0]}" cy="{v[1]}" r="2.5" {DOT}/>')
    return svg(W, Ht, "\n".join(body))


def fig_13_9_five_pointed_star() -> str:
    """Five-pointed star with tip angles labeled 1 through 5."""
    W, Ht = 220, 220
    import math as m
    cx, cy = 110, 115
    # Star: 5 outer points (large radius), 5 inner points (small radius).
    # The figure is a "drawn star" — connect every other vertex of regular pentagon.
    R = 90
    pts = _regular_polygon(cx, cy, R, 5, rotation_deg=-90)
    # Connect pts[0]→pts[2]→pts[4]→pts[1]→pts[3]→pts[0]
    order = [0, 2, 4, 1, 3]
    body = []
    for i in range(5):
        a = pts[order[i]]
        b = pts[order[(i+1) % 5]]
        body.append(segment(*a, *b))
    # Label each tip with number 1-5
    for i, idx in enumerate(order):
        x, y = pts[idx]
        # Slightly inset toward center for label visibility
        lx = x + (cx - x) * 0.18
        ly = y + (cy - y) * 0.18
        body.append(text(lx, ly + 4, str(i+1), italic=False, size=11, anchor="middle"))
    return svg(W, Ht, "\n".join(body))


# ─────────────────────────────────────────────
# Chapter 14 — Angle Chasing problem figures
#
# Each figure is reproduced from the printed AoPS Vol 1 page (pp 133-135 / PDF
# 147-149) with clean geometry derived from the problem statement instead of
# pixels traced from the source scan.
# ─────────────────────────────────────────────

import math as _m


def fig_14_1_problem_236_iso_triangles() -> str:
    """Two isosceles triangles sharing side BC: ABC (AC=BC) and CBD (CB=DB),
    with BD perpendicular to AC."""
    W, H = 220, 150
    A = (60,  30); B = (35, 130); C = (175, 130); D = (155, 50)
    # Foot of perpendicular from B onto AC (where BD crosses AC)
    AC = (C[0]-A[0], C[1]-A[1])
    AB_ = (B[0]-A[0], B[1]-A[1])
    t = (AB_[0]*AC[0] + AB_[1]*AC[1]) / (AC[0]**2 + AC[1]**2)
    F = (A[0] + t*AC[0], A[1] + t*AC[1])
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*C, *D), segment(*B, *D),
        right_angle_mark(F[0], F[1], B, A, size=8),
        point(*A, "A", "above-left"),
        point(*B, "B", "below-left"),
        point(*C, "C", "below-right"),
        point(*D, "D", "above-right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_2_problem_237_interior_point() -> str:
    """Triangle ABC with interior point D and four labeled angles x, y, z, w."""
    W, H = 220, 160
    B = (110, 25); A = (25, 130); C = (200, 130)
    D = (115, 90)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *D), segment(*C, *D), segment(*B, *D),
        text(B[0]-3,  B[1]+22, "z", italic=True, size=11),
        text(B[0]+10, B[1]+30, "w", italic=True, size=11),
        text(A[0]+18, A[1]-3,  "y", italic=True, size=11),
        text(C[0]-18, C[1]-3,  "x", italic=True, size=11),
        point(*A, "A", "below-left"),
        point(*B, "B", "above"),
        point(*C, "C", "below-right"),
        point(*D, "D", "below"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_3_problem_238_quadrilateral_trisected() -> str:
    """Quadrilateral ABCD with angles BAD and CDA each trisected; the four
    trisectors converge at interior points E (lower) and F (upper)."""
    W, H = 240, 170
    B = (60, 25); C = (180, 25); A = (25, 145); D = (215, 145)
    # Two trisectors per angle (creates three sub-angles)
    F = (120, 60); E = (120, 95)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        # Two trisectors from A → E (closer to AD) and F (closer to AB)
        segment(*A, *E), segment(*A, *F),
        # Two trisectors from D → E (closer to AD) and F (closer to DC)
        segment(*D, *E), segment(*D, *F),
        # Sub-angle labels at A — fan layout
        text(A[0]+18, A[1]-3,  "x", italic=True, size=10),
        text(A[0]+24, A[1]-13, "x", italic=True, size=10),
        text(A[0]+18, A[1]-26, "x", italic=True, size=10),
        # Sub-angle labels at D — mirrored fan
        text(D[0]-18, D[1]-3,  "y", italic=True, size=10),
        text(D[0]-24, D[1]-13, "y", italic=True, size=10),
        text(D[0]-18, D[1]-26, "y", italic=True, size=10),
        point(*B, "B", "above"),
        point(*C, "C", "above"),
        point(*A, "A", "below-left"),
        point(*D, "D", "below-right"),
        point(*E, "E", "below"),
        point(*F, "F", "above"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_4_problem_239_square_equilateral() -> str:
    """Square ABCD with equilateral triangle ABE built outside on side AB."""
    W, H = 220, 130
    # Square laid out with AB on the right edge so E pokes out to the right.
    D = (40, 25); A = (110, 25); C = (40, 95); B = (110, 95)
    # Equilateral on AB (vertical), apex E to the right
    side = B[1] - A[1]
    Ex = A[0] + side * (3 ** 0.5) / 2
    Ey = (A[1] + B[1]) / 2
    E = (Ex, Ey)
    body = [
        segment(*D, *A), segment(*A, *B), segment(*B, *C), segment(*C, *D),
        segment(*A, *E), segment(*B, *E),
        point(*D, "D", "above"),
        point(*A, "A", "above"),
        point(*C, "C", "below"),
        point(*B, "B", "below"),
        point(*E, "E", "right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_5_problem_240_congruent_triangles() -> str:
    """Congruent triangles RTS and UTV inscribed in a circle, meeting at Q.
    Triangles share apex T on the right; Q is intersection of RV and US."""
    W, H = 200, 200
    cx, cy, r = 100, 100, 70
    def pt(deg):
        return (cx + r*_m.cos(_m.radians(deg)), cy - r*_m.sin(_m.radians(deg)))
    # Spread points around the circle so triangles don't overlap heavily
    R = pt(110); V = pt(40); T = pt(0); S = pt(320); U = pt(250)
    def isect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if abs(d) < 1e-9: return ((p1[0]+p2[0])/2,(p1[1]+p2[1])/2)
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    # Q = intersection of RS and UV (the bases of the two triangles)
    Q = isect(R, S, U, V)
    body = [
        circle(cx, cy, r),
        segment(*R, *T), segment(*T, *S), segment(*R, *S),
        segment(*U, *T), segment(*T, *V), segment(*U, *V),
        point(*R, "R", "above"),
        point(*V, "V", "above-right"),
        point(*T, "T", "right"),
        point(*S, "S", "below-right"),
        point(*U, "U", "below"),
        point(*Q, "Q", "left", dot=False),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_6_problem_241_bisector_altitude() -> str:
    """Triangle ACD with bisector CE of ∠ACD and altitude DB to AC, meeting at F.
    Geometry: ∠A = 50°, so the apex A sits well above AC. B is on AC, and E is
    on AD; F is the interior intersection of the altitude DB and bisector CE."""
    W, H = 230, 140
    # Use a wide layout so A and B don't collide
    A = (60, 25); C = (25, 125); D = (210, 125)
    # B = foot of perpendicular from D onto AC. Visually place around 35% from A
    # toward C so that the altitude is clearly inside the triangle.
    B = (A[0] + 0.35*(C[0]-A[0]), A[1] + 0.35*(C[1]-A[1]))
    # E lies on AD around 60% of the way from A to D (keeps F well inside).
    E = (A[0] + 0.60*(D[0]-A[0]), A[1] + 0.60*(D[1]-A[1]))
    def isect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if abs(d) < 1e-9: return ((p1[0]+p2[0])/2,(p1[1]+p2[1])/2)
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    F = isect(C, E, D, B)
    body = [
        segment(*A, *C), segment(*C, *D), segment(*A, *D),
        segment(*D, *B),                  # altitude
        segment(*C, *E),                  # bisector
        right_angle_mark(B[0], B[1], A, D, size=7),
        point(*A, "A", "above"),
        point(*B, "B", "above-right"),
        point(*E, "E", "above-right"),
        point(*F, "F", "below", dot=False),
        point(*C, "C", "below-left"),
        point(*D, "D", "below-right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_7_problem_243_chord_circle() -> str:
    """Circle with center O, diameter AD, chord ABC, and arc CD subtending 60°."""
    W, H = 220, 140
    cx, cy, r = 110, 75, 55
    A = (cx + r, cy); D = (cx - r, cy)
    # Arc CD = 60°, so C is at angle 180-60 = 120° (using A at 0°)
    C = (cx + r*_m.cos(_m.radians(150)), cy - r*_m.sin(_m.radians(150)))
    # B is on chord OC such that BO=5 (visually halfway along OC)
    B = ((cx + C[0])/2, (cy + C[1])/2)
    body = [
        circle(cx, cy, r),
        segment(*D, *A),  # diameter
        segment(*A, *C),  # chord ABC
        point(*A, "A", "right"),
        point(*D, "D", "left"),
        point(*C, "C", "above-left"),
        point(*B, "B", "above"),
        point(cx, cy, "O", "below"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_8_problem_244_square_equilateral() -> str:
    """Square ABCD with equilateral triangle EBC built outside on side BC."""
    W, H = 220, 130
    A = (40, 25); B = (110, 25); C = (110, 95); D = (40, 95)
    side = C[1] - B[1]
    Ex = B[0] + side * (3 ** 0.5) / 2
    Ey = (B[1] + C[1]) / 2
    E = (Ex, Ey)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*B, *E), segment(*C, *E),
        point(*A, "A", "above-left"),
        point(*B, "B", "above-right"),
        point(*D, "D", "below-left"),
        point(*C, "C", "below-right"),
        point(*E, "E", "right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_9_problem_245_general_triangle() -> str:
    """Triangle ADE with cevians EB and EC drawn (B,C on AD)."""
    W, H = 260, 130
    E = (130, 25); A = (20, 110); D = (240, 110)
    B = (95, 110); C = (165, 110)
    body = [
        segment(*A, *D), segment(*A, *E), segment(*D, *E),
        segment(*E, *B), segment(*E, *C),
        text(A[0]+22,  A[1]-3, "y", italic=True, size=11),
        text(A[0]+38, A[1]-9, "x", italic=True, size=11),
        text(B[0]-7,  B[1]-3, "m", italic=True, size=11),
        text(B[0]+8,  B[1]-3, "n", italic=True, size=11),
        text(C[0]+8,  C[1]-3, "b", italic=True, size=11),
        text(D[0]-22, D[1]-3, "a", italic=True, size=11),
        point(*E, "E", "above"),
        point(*A, "A", "below-left"),
        point(*B, "B", "below"),
        point(*C, "C", "below"),
        point(*D, "D", "below-right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_10_problem_247_tangent_pab() -> str:
    """Triangle PAB formed by three lines tangent to circle O at R, S, T."""
    W, H = 290, 180
    cx, cy, rad = 175, 90, 38
    P = (30, 90)
    # Tangent points from P to the circle
    d = ((P[0]-cx)**2 + (P[1]-cy)**2) ** 0.5
    sin_t = rad / d
    cos_t = (1 - sin_t**2) ** 0.5
    # Top tangent: A on this tangent line
    Rx = cx - rad * sin_t * (-(P[1]-cy)/d) - rad * cos_t * (P[0]-cx)/d * 0
    # Simpler: use formula for tangent points
    ang = _m.atan2(cy - P[1], cx - P[0])
    alpha = _m.asin(rad / d)
    # In SVG, +y is downward. The "upper" tangent (R label per the original
    # figure) has y < cy, so we use the -π/2 rotation.
    R = (cx + rad*_m.cos(ang - alpha - _m.pi/2),
         cy + rad*_m.sin(ang - alpha - _m.pi/2))
    T = (cx + rad*_m.cos(ang + alpha + _m.pi/2),
         cy + rad*_m.sin(ang + alpha + _m.pi/2))
    # A on line PR extended past R, B on line PT extended past T.
    # Use a smaller multiplier so labels stay inside the viewport.
    A = (P[0] + (R[0]-P[0])*1.45, P[1] + (R[1]-P[1])*1.45)
    B = (P[0] + (T[0]-P[0])*1.45, P[1] + (T[1]-P[1])*1.45)
    # S = tangent point of AB with circle (point on AB closest to O)
    AB = (B[0]-A[0], B[1]-A[1])
    AO = (cx - A[0], cy - A[1])
    t = (AO[0]*AB[0] + AO[1]*AB[1]) / (AB[0]**2 + AB[1]**2)
    S = (A[0] + t*AB[0], A[1] + t*AB[1])
    body = [
        circle(cx, cy, rad),
        segment(*P, *A), segment(*P, *B), segment(*A, *B),
        point(*P, "P", "left"),
        point(*A, "A", "above"),
        point(*B, "B", "below"),
        point(*R, "R", "above-right", dot=True),
        point(*T, "T", "below-right", dot=True),
        point(*S, "S", "right", dot=True),
        point(cx, cy, "O", "right", dot=False),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_11_problem_248_circle_eadb() -> str:
    """Circle (center O) with inscribed configuration showing A, E, D, C, F, B."""
    W, H = 280, 200
    cx, cy, r = 165, 100, 60
    # A and B on the left side outside the circle, roughly forming a kite
    A = (75, 30); B = (75, 170)
    # E on the upper arc (around 130°), F on the lower arc (around 230°)
    E = (cx + r*_m.cos(_m.radians(130)), cy - r*_m.sin(_m.radians(130)))
    F = (cx + r*_m.cos(_m.radians(-130)), cy - r*_m.sin(_m.radians(-130)))
    # C on the right (0°)
    C = (cx + r, cy)
    # D where AC meets the circle (close to A's side of AC) — approximate visually
    D = (cx - r * 0.95, cy)
    body = [
        circle(cx, cy, r),
        segment(*A, *B), segment(*A, *C), segment(*B, *C),
        segment(*A, *E),  segment(*B, *F),
        point(*A, "A", "above-left"),
        point(*E, "E", "above"),
        point(*D, "D", "left"),
        point(cx, cy, "O", "below"),
        point(*C, "C", "right"),
        point(*F, "F", "below"),
        point(*B, "B", "below-left"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_12_problem_249_pqr_bisector() -> str:
    """Triangle PQR with bisector RS, PQ extended to D, with CD ⊥ RS.
    C is the foot of perpendicular from D onto line RS, so CD ⊥ RS holds
    by construction and C lies on segment RS."""
    W, H = 380, 160
    P = (20, 130); Q = (220, 130); D = (340, 130)
    R = (130, 20)
    # S on segment PQ; RS is the angle bisector from R. Use midpoint as a
    # visual stand-in for the bisector foot.
    S = ((P[0]+Q[0])/2, (P[1]+Q[1])/2)
    # C = foot of perpendicular from D onto line through R and S
    RSv = (S[0]-R[0], S[1]-R[1])
    RDv = (D[0]-R[0], D[1]-R[1])
    t = (RDv[0]*RSv[0] + RDv[1]*RSv[1]) / (RSv[0]**2 + RSv[1]**2)
    C = (R[0] + t*RSv[0], R[1] + t*RSv[1])
    body = [
        segment(*P, *R), segment(*P, *D),       # PR and PQD (full extension P→D)
        segment(*Q, *R),
        segment(*R, *S),                         # bisector
        segment(*C, *D),                         # perpendicular CD to RS
        _arc_mark(R[0], R[1], P, S, n=1, r=14),
        _arc_mark(R[0], R[1], S, Q, n=1, r=14),
        right_angle_mark(C[0], C[1], S, D, size=7),
        text((R[0]+S[0])/2 - 8, (R[1]+S[1])/2,  "m", italic=True, size=11),
        text((P[0]+S[0])/2,     P[1] - 4,       "p", italic=True, size=11),
        text((S[0]+Q[0])/2,     Q[1] - 4,       "q", italic=True, size=11),
        point(*P, "P", "below-left"),
        point(*S, "S", "below"),
        point(*Q, "Q", "below"),
        point(*D, "D", "below-right"),
        point(*R, "R", "above"),
        point(*C, "C", "above-left", dot=True),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_13_problem_250_parallelograms() -> str:
    """Six points A,B,C,D,E,F on a circle forming parallelograms ABCG and FGDE."""
    W, H = 220, 200
    cx, cy, r = 110, 100, 70
    # Place six points on circle
    def pt(deg):
        return (cx + r*_m.cos(_m.radians(deg)), cy - r*_m.sin(_m.radians(deg)))
    A = pt(105); B = pt(75); C = pt(345); D = pt(285); E = pt(255); F = pt(165)
    # G is the interior intersection where the two parallelograms share a vertex
    G = (cx, cy)
    body = [
        circle(cx, cy, r),
        # parallelogram ABCG
        segment(*A, *B), segment(*B, *C), segment(*C, *G), segment(*G, *A),
        # parallelogram FGDE
        segment(*F, *G), segment(*G, *D), segment(*D, *E), segment(*E, *F),
        point(*A, "A", "above-left"),
        point(*B, "B", "above-right"),
        point(*F, "F", "left"),
        point(*C, "C", "right"),
        point(*G, "G", "below", dot=False),
        point(*E, "E", "below-left"),
        point(*D, "D", "below-right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_14_14_problem_251_semicircles() -> str:
    """Two tangent semicircles SAR and RBT on line SRT, with point P joined by
    external tangents PA and PB; arcs labeled a, b, c, d."""
    W, H = 260, 160
    yline = 130
    S = (25, yline); R = (130, yline); T = (235, yline)
    rL = (R[0] - S[0]) / 2
    rR = (T[0] - R[0]) / 2
    cL = ((S[0] + R[0]) / 2, yline)
    cR = ((R[0] + T[0]) / 2, yline)
    # A on top of left semicircle, B on top of right semicircle (rough placement)
    A = (cL[0] - rL * 0.45, yline - rL * 0.9)
    B = (cR[0] + rR * 0.45, yline - rR * 0.9)
    # P somewhere above the figure on the line connecting tangent extensions
    P = (135, 35)
    body = [
        # the straight line SRT
        segment(*S, *T),
        # left semicircle (180° arc above the line)
        f'<path d="M {S[0]} {yline} A {rL} {rL} 0 0 1 {R[0]} {yline}" {STROKE}/>',
        # right semicircle
        f'<path d="M {R[0]} {yline} A {rR} {rR} 0 0 1 {T[0]} {yline}" {STROKE}/>',
        # tangent segments PA and PB
        segment(*P, *A), segment(*P, *B),
        # arc labels
        text((S[0]+A[0])/2 - 4, (yline+A[1])/2 + 2, "c", italic=True, size=11),
        text((A[0]+R[0])/2,     A[1] - 6,           "a", italic=True, size=11),
        text((R[0]+B[0])/2,     B[1] - 6,           "b", italic=True, size=11),
        text((B[0]+T[0])/2 + 4, (yline+B[1])/2 + 2, "d", italic=True, size=11),
        point(*P, "P", "above"),
        point(*A, "A", "left"),
        point(*B, "B", "right"),
        point(*S, "S", "below"),
        point(*R, "R", "below"),
        point(*T, "T", "below"),
    ]
    return svg(W, H, "\n".join(body))


# ─────────────────────────────────────────────
# Chapter 15 — Areas
# ─────────────────────────────────────────────

def fig_15_1_triangle_midpoints() -> str:
    """Triangle ABC with midpoints D (on BC), E (on AC), F (on AB)
    connected to form the medial triangle DEF."""
    W, H = 200, 160
    A = (110, 25); B = (30, 130); C = (190, 130)
    D = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    E = ((A[0]+C[0])/2, (A[1]+C[1])/2)
    F = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*D, *E), segment(*E, *F), segment(*F, *D),
        point(*A, "A", "above"),
        point(*B, "B", "below-left"),
        point(*C, "C", "below-right"),
        point(*D, "D", "below"),
        point(*E, "E", "right"),
        point(*F, "F", "left"),
    ]
    return svg(W, H, "\n".join(body))


def fig_15_2_trapezoid_diagonals() -> str:
    """Trapezoid ABCD (AB || DC) with diagonals AC, BD meeting at E."""
    W, H = 200, 130
    A = (70, 30); B = (130, 30); D = (25, 110); C = (175, 110)
    # E = intersection of AC and BD
    def isect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    E = isect(A, C, B, D)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C), segment(*B, *D),
        point(*A, "A", "above-left"),
        point(*B, "B", "above-right"),
        point(*D, "D", "below-left"),
        point(*C, "C", "below-right"),
        point(*E, "E", "below", dot=False),
    ]
    return svg(W, H, "\n".join(body))


def fig_15_3_medians_six_regions() -> str:
    """Triangle ABC with three medians AD, BE, CF meeting at centroid G,
    dividing the triangle into six smaller regions."""
    W, H = 230, 160
    A = (115, 25); B = (210, 130); C = (20, 130)
    D = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    E = ((A[0]+C[0])/2, (A[1]+C[1])/2)
    F = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    G = ((A[0]+B[0]+C[0])/3, (A[1]+B[1]+C[1])/3)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *D), segment(*B, *E), segment(*C, *F),
        point(*A, "A", "above"),
        point(*B, "B", "below-right"),
        point(*C, "C", "below-left"),
        point(*D, "D", "below"),
        point(*E, "E", "above-right"),
        point(*F, "F", "above-left"),
        point(*G, "G", "right", dot=False),
    ]
    return svg(W, H, "\n".join(body))


def fig_15_4_example_15_5() -> str:
    """Triangle ABC with D midpoint of AB, E midpoint of DB, F midpoint of BC;
    segments AF and EF drawn."""
    W, H = 200, 160
    A = (110, 25); B = (190, 130); C = (20, 130)
    D = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    E = ((D[0]+B[0])/2, (D[1]+B[1])/2)
    F = ((B[0]+C[0])/2, (B[1]+C[1])/2)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*A, *F), segment(*E, *F),
        point(*A, "A", "above"),
        point(*B, "B", "below-right"),
        point(*C, "C", "below-left"),
        point(*D, "D", "right"),
        point(*E, "E", "right"),
        point(*F, "F", "below"),
    ]
    return svg(W, H, "\n".join(body))


def fig_15_5_example_15_7() -> str:
    """Quadrilateral ABCD with diagonals meeting at midpoint X of BD;
    perpendicular altitudes BY and DZ from B, D to diagonal AC."""
    W, H = 230, 160
    A = (75, 35); C = (165, 130); B = (175, 55); D = (35, 110)
    # X = midpoint of BD
    X = ((B[0]+D[0])/2, (B[1]+D[1])/2)
    # Y = foot of perpendicular from B onto AC
    AC = (C[0]-A[0], C[1]-A[1])
    AB = (B[0]-A[0], B[1]-A[1])
    t = (AB[0]*AC[0] + AB[1]*AC[1]) / (AC[0]**2 + AC[1]**2)
    Y = (A[0] + t*AC[0], A[1] + t*AC[1])
    # Z = foot of perpendicular from D onto AC
    AD = (D[0]-A[0], D[1]-A[1])
    s = (AD[0]*AC[0] + AD[1]*AC[1]) / (AC[0]**2 + AC[1]**2)
    Z = (A[0] + s*AC[0], A[1] + s*AC[1])
    body = [
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        segment(*A, *C), segment(*B, *D),
        segment(*B, *Y), segment(*D, *Z),
        right_angle_mark(Y[0], Y[1], A, B, size=6),
        right_angle_mark(Z[0], Z[1], C, D, size=6),
        _hash_mark(B, X, 1), _hash_mark(X, D, 1),
        point(*A, "A", "above"),
        point(*B, "B", "right"),
        point(*D, "D", "left"),
        point(*C, "C", "below-right"),
        point(*X, "X", "below", dot=False),
        point(*Y, "Y", "below", dot=False),
        point(*Z, "Z", "above", dot=False),
    ]
    return svg(W, H, "\n".join(body))


def fig_15_6_annulus() -> str:
    """Two concentric circles (radii 2 and 3) — annulus between them, the
    annulus shaded with horizontal hatching."""
    W, H = 160, 160
    cx, cy = 80, 80
    body = [
        '<defs><pattern id="annhatch" width="6" height="6" patternUnits="userSpaceOnUse">'
        '<line x1="0" y1="3" x2="6" y2="3" stroke="#1d1d1f" stroke-width="0.8"/></pattern></defs>',
        f'<circle cx="{cx}" cy="{cy}" r="60" fill="url(#annhatch)" stroke="#1d1d1f" stroke-width="1.4"/>',
        f'<circle cx="{cx}" cy="{cy}" r="30" fill="#ffffff" stroke="#1d1d1f" stroke-width="1.4"/>',
    ]
    return svg(W, H, "\n".join(body))


def fig_15_7_octagon_from_square() -> str:
    """Square with the four corners cut off as right isosceles triangles,
    leaving a regular octagon inscribed."""
    W, H = 140, 140
    # Square coords
    s = 100
    x0, y0 = 20, 20
    # Cut corner amount (such that the resulting shape is a regular octagon):
    # if side of square is s, cut = s*(sqrt2 - 1)/(sqrt2 + 1) * s_factor
    # For a regular octagon, cut = s * (sqrt(2) - 1) / (sqrt(2) + 1)... simpler:
    # the octagon side length = s / (1 + sqrt(2)). Each cut = (s - octside) / 2
    octside = s / (1 + 2**0.5)
    cut = (s - octside) / 2
    body = [
        # Square outline
        segment(x0, y0, x0+s, y0),
        segment(x0+s, y0, x0+s, y0+s),
        segment(x0+s, y0+s, x0, y0+s),
        segment(x0, y0+s, x0, y0),
        # Diagonals at each corner cutting off the triangles
        segment(x0+cut, y0,        x0,        y0+cut),  # top-left
        segment(x0+s-cut, y0,      x0+s,      y0+cut),  # top-right
        segment(x0+s-cut, y0+s,    x0+s,      y0+s-cut),# bottom-right
        segment(x0+cut, y0+s,      x0,        y0+s-cut),# bottom-left
    ]
    return svg(W, H, "\n".join(body))


def fig_15_8_isosceles_triangle_with_arcs() -> str:
    """Isosceles right triangle ABC with semicircle on hypotenuse AB and
    quarter-circle arc centered at C; the lune between them is shaded."""
    W, H = 160, 150
    A = (40, 35); B = (130, 35); C = (40, 110)
    # Hypotenuse semicircle: AB diameter
    midAB = ((A[0]+B[0])/2, (A[1]+B[1])/2)
    rAB = ((B[0]-A[0])**2 + (B[1]-A[1])**2)**0.5 / 2
    # Quarter-circle centered at C, from A to B (legs CA and CB)
    rCA = ((A[0]-C[0])**2 + (A[1]-C[1])**2)**0.5
    body = [
        # Triangle
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        right_angle_mark(C[0], C[1], A, B, size=8),
        # Semicircle bulging upward from AB
        f'<path d="M {A[0]} {A[1]} A {rAB} {rAB} 0 0 1 {B[0]} {B[1]}" {STROKE}/>',
        # Quarter-circle arc from A to B (with center at C, radius CA = CB)
        f'<path d="M {A[0]} {A[1]} A {rCA} {rCA} 0 0 1 {B[0]} {B[1]}" {STROKE}/>',
        # Shaded "lune" — the crescent between the two arcs, with checker pattern
        f'<defs><pattern id="lunehatch" width="5" height="5" patternUnits="userSpaceOnUse">'
        f'<path d="M0,0 L5,5 M0,5 L5,0" stroke="#1d1d1f" stroke-width="0.6"/></pattern></defs>',
        f'<path d="M {A[0]} {A[1]} A {rAB} {rAB} 0 0 1 {B[0]} {B[1]} '
        f'A {rCA} {rCA} 0 0 0 {A[0]} {A[1]} Z" fill="url(#lunehatch)" stroke="none"/>',
        point(*A, "A", "left"),
        point(*B, "B", "right"),
        point(*C, "C", "below-left"),
    ]
    return svg(W, H, "\n".join(body))


def fig_15_9_square_with_leaves() -> str:
    """Square with four semicircles, each drawn on a side as diameter and
    bulging inward, forming four shaded 'leaf' (lens) shapes inside.

    Each leaf is the intersection of two adjacent semicircles; we draw it
    explicitly as two arcs from the corner to the square's center."""
    W, H = 160, 160
    s = 120
    x0, y0 = 20, 20
    r = s / 2
    cx, cy = x0 + r, y0 + r       # center of square
    TL = (x0, y0); TR = (x0 + s, y0); BR = (x0 + s, y0 + s); BL = (x0, y0 + s)
    M = (cx, cy)

    def leaf(corner):
        return (f'<path d="M {corner[0]} {corner[1]} '
                f'A {r} {r} 0 0 1 {M[0]} {M[1]} '
                f'A {r} {r} 0 0 1 {corner[0]} {corner[1]} Z" '
                f'fill="#1d1d1f"/>')

    body = [
        f'<rect x="{x0}" y="{y0}" width="{s}" height="{s}" {STROKE}/>',
        leaf(TL), leaf(BR),
        # The other two corners need the opposite sweep direction
        f'<path d="M {TR[0]} {TR[1]} A {r} {r} 0 0 0 {M[0]} {M[1]} '
        f'A {r} {r} 0 0 0 {TR[0]} {TR[1]} Z" fill="#1d1d1f"/>',
        f'<path d="M {BL[0]} {BL[1]} A {r} {r} 0 0 0 {M[0]} {M[1]} '
        f'A {r} {r} 0 0 0 {BL[0]} {BL[1]} Z" fill="#1d1d1f"/>',
    ]
    return svg(W, H, "\n".join(body))


def fig_15_10_four_overlapping_circles() -> str:
    """Four overlapping circles of equal radius — one central circle and three
    outer circles whose centers lie on the central circle, equally spaced."""
    W, H = 200, 200
    cx, cy, r = 100, 100, 38
    # Three outer circles centered at points on the central circle, spaced 120°
    # but the original figure shows them clustered (60° spacing, all going up-right)
    # — so use the original layout: centers above and to either side.
    angles = [60, 180, 300]  # 120° apart
    body = [circle(cx, cy, r)]
    for a in angles:
        ox = cx + r * _m.cos(_m.radians(a))
        oy = cy - r * _m.sin(_m.radians(a))
        body.append(circle(ox, oy, r))
    return svg(W, H, "\n".join(body))


# ─────────────────────────────────────────────
# Chapter 16 — The Power of Coordinates
# ─────────────────────────────────────────────

def _axes(cx, cy, half, tick_count=6, tick=3):
    """Helper: x and y axes through (cx,cy) with tick marks."""
    parts = []
    # Tick marks every ~unit
    for i in range(1, tick_count + 1):
        d = i * (half / (tick_count + 0.5))
        parts.append(segment(cx + d, cy - tick, cx + d, cy + tick))
        parts.append(segment(cx - d, cy - tick, cx - d, cy + tick))
        parts.append(segment(cx - tick, cy + d, cx + tick, cy + d))
        parts.append(segment(cx - tick, cy - d, cx + tick, cy - d))
    parts.append(line(cx - half - 5, cy, cx + half + 5, cy))  # x-axis
    parts.append(line(cx, cy - half - 5, cx, cy + half + 5))  # y-axis
    parts.append(text(cx + half + 14, cy + 5, "x", italic=True))
    parts.append(text(cx, cy - half - 12, "y", italic=True))
    return parts


def fig_16_1_cartesian_plane() -> str:
    """Cartesian plane with labeled tick marks 1-6 in each direction."""
    W, H = 280, 220
    cx, cy = 140, 110
    half = 110
    parts = []
    spacing = 14
    # tick lines
    for i in range(1, 7):
        d = i * spacing
        parts.append(segment(cx + d, cy - 4, cx + d, cy + 4))
        parts.append(segment(cx - d, cy - 4, cx - d, cy + 4))
        parts.append(segment(cx - 4, cy + d, cx + 4, cy + d))
        parts.append(segment(cx - 4, cy - d, cx + 4, cy - d))
        parts.append(text(cx + d, cy + 16, str(i),  italic=False, size=10))
        parts.append(text(cx - d, cy + 16, str(-i), italic=False, size=10))
        parts.append(text(cx - 10, cy - d + 4, str(i),  italic=False, size=10, anchor="end"))
        parts.append(text(cx - 10, cy + d + 4, str(-i), italic=False, size=10, anchor="end"))
    # Axes
    parts.append(line(cx - half, cy, cx + half, cy))
    parts.append(line(cx, cy - half, cx, cy + half))
    parts.append(text(cx + half + 12, cy + 5, "x", italic=True))
    parts.append(text(cx, cy - half - 10, "y", italic=True))
    return svg(W, H, "\n".join(parts))


def fig_16_2_polar_grid() -> str:
    """Polar grid: concentric circles for r, radial lines for θ."""
    W, H = 240, 240
    cx, cy = 120, 120
    parts = []
    # Three concentric circles r=1, 2, 3
    for r, label in [(35, "1"), (70, "2"), (105, "3")]:
        parts.append(circle(cx, cy, r))
        parts.append(text(cx + r - 8, cy + 13, label, italic=False, size=10, anchor="middle"))
    # Radial lines every 30°
    for d in range(0, 360, 30):
        x = cx + 105 * _m.cos(_m.radians(d))
        y = cy - 105 * _m.sin(_m.radians(d))
        parts.append(segment(cx, cy, x, y))
        # Labels just outside circle
        lx = cx + 118 * _m.cos(_m.radians(d))
        ly = cy - 118 * _m.sin(_m.radians(d)) + 4
        parts.append(text(lx, ly, f"{d}°", italic=False, size=9, anchor="middle"))
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="2.5" {DOT}/>')
    return svg(W, H, "\n".join(parts))


def fig_16_3_line_with_rise_run() -> str:
    """Line on coordinate plane with y-intercept (0,b) and rise/run triangle."""
    W, H = 240, 200
    cx, cy = 120, 100
    parts = _axes(cx, cy, 90)
    # Line through (0, b) with slope m. Visually pick b at -20 (below origin)
    # and slope ≈ 1/2.
    b = (cx, cy + 25)
    # Line endpoints
    P1 = (cx - 80, cy + 65)
    P2 = (cx + 90, cy - 20)
    parts.append(segment(*P1, *P2))
    # rise-run dotted right triangle to the right of intercept
    runX = (cx + 35, cy + 25); runY = (cx + 35, cy + 7)
    parts.append(segment(b[0], b[1], runX[0], runX[1]))
    parts.append(segment(runX[0], runX[1], runY[0], runY[1]))
    parts.append(text((b[0]+runX[0])/2, b[1] + 14, "4", italic=False, size=10))
    parts.append(text(runX[0] + 12, (b[1]+runY[1])/2, "4m", italic=True, size=10, anchor="start"))
    parts.append(point(*b, "(0, b)", "left", italic=False))
    return svg(W, H, "\n".join(parts))


def fig_16_4_perpendicular_lines() -> str:
    """Two perpendicular lines on coordinate plane with rise/run a, b labels."""
    W, H = 240, 200
    cx, cy = 120, 100
    parts = _axes(cx, cy, 85)
    # Two perpendicular lines through origin with slopes m and -1/m
    # m = 0.5
    parts.append(segment(cx - 80, cy + 40, cx + 80, cy - 40))
    parts.append(segment(cx - 40, cy - 80, cx + 40, cy + 80))
    # Triangle for one line: rise b vertical, run a horizontal
    parts.append(segment(cx, cy, cx + 50, cy))
    parts.append(segment(cx + 50, cy, cx + 50, cy - 25))
    parts.append(text(cx + 25, cy + 14, "a", italic=True, size=11))
    parts.append(text(cx + 60, cy - 12, "b", italic=True, size=11))
    # Label "-a" on the other line for clarity
    parts.append(text(cx - 28, cy + 38, "-a", italic=True, size=10))
    return svg(W, H, "\n".join(parts))


def fig_16_5_line_plot() -> str:
    """The line 3x + 4y = 5 plotted through several points."""
    W, H = 240, 160
    cx, cy = 120, 80
    parts = _axes(cx, cy, 80)
    # 3x + 4y = 5: when x=-1, y=2; when x=3, y=-1; when x=5/3, y=0.
    # Pick visible endpoints. Use scale 16 px / unit.
    s = 14
    P1 = (cx + (-3)*s, cy - 3.5*s)   # x=-3, y=3.5 → (3*-3 + 4*3.5)= -9+14=5 ✓
    P2 = (cx + 4*s,    cy - (-1.75)*s) # x=4,  y=-1.75 → 12-7=5 ✓
    parts.append(segment(*P1, *P2))
    # Mark a couple of integer-ish points along the line
    parts.append(point(cx + (-1)*s, cy - 2*s, dot=True, label=None))
    parts.append(point(cx + 3*s,    cy - (-1)*s, dot=True, label=None))
    return svg(W, H, "\n".join(parts))


def fig_16_6_distance_formula_triangle() -> str:
    """Distance formula: two points (x₁,y₁) and (x₂,y₂) connected by hypotenuse
    d, with legs x₂-x₁ and y₂-y₁."""
    W, H = 240, 200
    cx, cy = 120, 110
    parts = _axes(cx, cy, 90)
    P1 = (cx - 50, cy + 35)
    P2 = (cx + 50, cy - 30)
    R  = (P2[0], P1[1])    # right-angle corner
    parts.append(segment(*P1, *P2))            # hypotenuse d
    parts.append(segment(*P1, *R))              # horizontal leg
    parts.append(segment(*R,  *P2))             # vertical leg
    right_angle_mark_str = right_angle_mark(R[0], R[1], P1, P2, size=7)
    parts.append(right_angle_mark_str)
    parts.append(text((P1[0]+R[0])/2, P1[1]+14, "x₂ - x₁", italic=True, size=10))
    parts.append(text(R[0]+8, (R[1]+P2[1])/2, "y₂ - y₁", italic=True, size=10, anchor="start"))
    parts.append(text((P1[0]+P2[0])/2 - 6, (P1[1]+P2[1])/2 - 4, "d", italic=True, size=12))
    parts.append(point(*P1, "(x₁,y₁)", "below-left", italic=False))
    parts.append(point(*P2, "(x₂,y₂)", "above-right", italic=False))
    return svg(W, H, "\n".join(parts))


# ─────────────────────────────────────────────
# Chapter 17 — Power of a Point
# ─────────────────────────────────────────────

def _tangent_points(P, C, r):
    """Return the two tangent points from external P to circle (C, r)."""
    cx, cy = C
    d = ((P[0]-cx)**2 + (P[1]-cy)**2)**0.5
    ang = _m.atan2(cy - P[1], cx - P[0])
    alpha = _m.asin(r / d)
    p1 = (cx + r*_m.cos(ang - alpha - _m.pi/2),
          cy + r*_m.sin(ang - alpha - _m.pi/2))
    p2 = (cx + r*_m.cos(ang + alpha + _m.pi/2),
          cy + r*_m.sin(ang + alpha + _m.pi/2))
    return p1, p2


def fig_17_1_two_tangents() -> str:
    """Two tangents AB, AC from external point A to a circle."""
    W, H = 220, 140
    cx, cy, r = 80, 70, 45
    A = (200, 70)
    B, C = _tangent_points(A, (cx, cy), r)
    body = [
        circle(cx, cy, r),
        segment(*A, *B), segment(*A, *C),
        point(*A, "A", "right"),
        point(*B, "B", "above"),
        point(*C, "C", "below"),
    ]
    return svg(W, H, "\n".join(body))


def fig_17_2_tangent_and_secant() -> str:
    """Tangent AC and secant AD from external A through B and D on circle."""
    W, H = 240, 150
    cx, cy, r = 145, 75, 45
    A = (30, 75)
    # Tangent from A — pick the upper tangent point as C
    _, C = _tangent_points(A, (cx, cy), r)
    # Secant: from A through interior of circle. Pick a chord that the secant
    # cuts. B is closer to A (entry), D is exit.
    # Choose secant heading toward (cx + 5, cy + 25) (lower-right)
    direction = (cx - A[0], cy + 20 - A[1])
    L = (direction[0]**2 + direction[1]**2)**0.5
    ux, uy = direction[0]/L, direction[1]/L
    # Solve for intersections of line A + t*(ux,uy) with circle
    fx = A[0] - cx; fy = A[1] - cy
    aQ = ux*ux + uy*uy
    bQ = 2*(fx*ux + fy*uy)
    cQ = fx*fx + fy*fy - r*r
    disc = bQ*bQ - 4*aQ*cQ
    t1 = (-bQ - disc**0.5) / (2*aQ)
    t2 = (-bQ + disc**0.5) / (2*aQ)
    B = (A[0] + t1*ux, A[1] + t1*uy)
    D = (A[0] + t2*ux, A[1] + t2*uy)
    body = [
        circle(cx, cy, r),
        segment(*A, *C),    # tangent
        segment(*A, *D),    # secant
        point(*A, "A", "left"),
        point(*C, "C", "above"),
        point(*B, "B", "below-left"),
        point(*D, "D", "right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_17_3_two_secants() -> str:
    """Two secants from external A through B,C and D,E on circle."""
    W, H = 230, 150
    cx, cy, r = 150, 75, 45
    A = (30, 75)
    # Two secants: one upper through B (near) and C (far); one lower through D, E
    def secant(angle_to_target_offset_y):
        target = (cx, cy + angle_to_target_offset_y)
        dx, dy = target[0]-A[0], target[1]-A[1]
        L = (dx*dx + dy*dy)**0.5
        ux, uy = dx/L, dy/L
        fx = A[0] - cx; fy = A[1] - cy
        aQ = ux*ux + uy*uy
        bQ = 2*(fx*ux + fy*uy)
        cQ = fx*fx + fy*fy - r*r
        disc = bQ*bQ - 4*aQ*cQ
        t1 = (-bQ - disc**0.5) / (2*aQ)
        t2 = (-bQ + disc**0.5) / (2*aQ)
        return ((A[0]+t1*ux, A[1]+t1*uy), (A[0]+t2*ux, A[1]+t2*uy))
    B, C = secant(-22)
    D, E = secant( 22)
    body = [
        circle(cx, cy, r),
        segment(*A, *C), segment(*A, *E),
        point(*A, "A", "left"),
        point(*B, "B", "above"),
        point(*C, "C", "above-right"),
        point(*D, "D", "below"),
        point(*E, "E", "below-right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_17_4_two_chords() -> str:
    """Two chords BC and DE intersecting at A inside the circle."""
    W, H = 200, 160
    cx, cy, r = 100, 80, 55
    # Make chords cross — one going upper-left to lower-right, one the other
    B = (cx + r*_m.cos(_m.radians(160)), cy - r*_m.sin(_m.radians(160)))
    C = (cx + r*_m.cos(_m.radians(-20)), cy - r*_m.sin(_m.radians(-20)))
    D = (cx + r*_m.cos(_m.radians(225)), cy - r*_m.sin(_m.radians(225)))
    E = (cx + r*_m.cos(_m.radians( 60)), cy - r*_m.sin(_m.radians( 60)))
    # Intersection A = isect(BC, DE)
    def isect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    A = isect(B, C, D, E)
    body = [
        circle(cx, cy, r),
        segment(*B, *C), segment(*D, *E),
        point(*B, "B", "left"),
        point(*C, "C", "right"),
        point(*D, "D", "below"),
        point(*E, "E", "right"),
        point(*A, "A", "above", dot=False),
    ]
    return svg(W, H, "\n".join(body))


def fig_17_5_power_proof_outside() -> str:
    """Power of a Point proof for external A: tangent AB plus secant ACD."""
    W, H = 220, 160
    cx, cy, r = 80, 80, 50
    A = (200, 80)
    # Tangent point B (upper)
    _, B = _tangent_points(A, (cx, cy), r)
    # Secant through A intersecting circle at C (near) and E (far);
    # also draw segment to D on circle for the proof. Pick line through (cx,cy)
    direction = (cx - A[0], cy - A[1])
    L = (direction[0]**2 + direction[1]**2)**0.5
    ux, uy = direction[0]/L, direction[1]/L
    fx = A[0] - cx; fy = A[1] - cy
    aQ = ux*ux + uy*uy
    bQ = 2*(fx*ux + fy*uy)
    cQ = fx*fx + fy*fy - r*r
    disc = bQ*bQ - 4*aQ*cQ
    tA = (-bQ - disc**0.5) / (2*aQ)
    tB = (-bQ + disc**0.5) / (2*aQ)
    D_ = (A[0] + tA*ux, A[1] + tA*uy)
    E  = (A[0] + tB*ux, A[1] + tB*uy)
    # Mark C as a point on the upper-left of circle
    C  = (cx + r*_m.cos(_m.radians(170)), cy - r*_m.sin(_m.radians(170)))
    body = [
        circle(cx, cy, r),
        segment(*A, *B),       # tangent
        segment(*A, *E),       # secant (full)
        segment(*B, *C),
        segment(*C, *E),
        point(*A, "A", "right"),
        point(*B, "B", "above"),
        point(*C, "C", "left"),
        point(*D_, "D", "below"),
        point(*E,  "E", "below"),
    ]
    return svg(W, H, "\n".join(body))


def fig_17_6_power_proof_inside() -> str:
    """Power of a Point proof: two chords BC and DE intersecting at E inside."""
    W, H = 200, 200
    cx, cy, r = 100, 100, 65
    B = (cx + r*_m.cos(_m.radians(140)), cy - r*_m.sin(_m.radians(140)))
    C = (cx + r*_m.cos(_m.radians( -5)), cy - r*_m.sin(_m.radians( -5)))
    D = (cx + r*_m.cos(_m.radians( 50)), cy - r*_m.sin(_m.radians( 50)))
    A = (cx + r*_m.cos(_m.radians(-90)), cy - r*_m.sin(_m.radians(-90)))
    def isect(p1, p2, p3, p4):
        x1,y1=p1; x2,y2=p2; x3,y3=p3; x4,y4=p4
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    E = isect(B, C, D, A)
    body = [
        circle(cx, cy, r),
        segment(*B, *C), segment(*D, *A),
        # Add the connecting chord BD and CA for similar-triangle proof
        segment(*B, *D), segment(*C, *A),
        point(*B, "B", "above-left"),
        point(*D, "D", "above-right"),
        point(*E, "E", "below", dot=False),
        point(*A, "A", "below"),
        point(*C, "C", "right"),
    ]
    return svg(W, H, "\n".join(body))


# ─────────────────────────────────────────────
# Chapter 29 — Parting Shots (problem-specific figures)
# ─────────────────────────────────────────────

def fig_29_1_problem_578_three_hexagons() -> str:
    """Three congruent regular hexagons in a row, each pair sharing one
    full side; outline has 13 vertices."""
    W, H = 220, 100
    s = 22                                 # side length (= circumradius)
    cy = 50
    # Centers spaced by s*sqrt(3) horizontally so hexagons share a side
    dx = s * (3 ** 0.5)
    centers = [(40 + i*dx, cy) for i in range(3)]
    body = []
    for cx, cy_ in centers:
        # Pointy-top hexagon vertices
        pts = [(cx + s*_m.cos(_m.radians(90 + 60*k)),
                cy_ - s*_m.sin(_m.radians(90 + 60*k))) for k in range(6)]
        for i in range(6):
            p1 = pts[i]; p2 = pts[(i+1) % 6]
            body.append(segment(*p1, *p2))
    return svg(W, H, "\n".join(body))


def fig_29_2_problem_584_rectangle_with_point() -> str:
    """Rectangle ABCD (B top-left, C top-right, D bottom-right, A bottom-left)
    with interior point P near the right side; segments PA, PB, PC drawn."""
    W, H = 240, 160
    B_ = (30, 30); C_ = (210, 30); D_ = (210, 130); A_ = (30, 130)
    # P inside, closer to the right edge
    P = (165, 92)
    body = [
        segment(*B_, *C_), segment(*C_, *D_), segment(*D_, *A_), segment(*A_, *B_),
        segment(*P, *A_), segment(*P, *B_), segment(*P, *C_),
        point(*B_, "B", "above-left"),
        point(*C_, "C", "above-right"),
        point(*D_, "D", "below-right"),
        point(*A_, "A", "below-left"),
        point(*P, "P", "right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_29_3_problem_586_triangle_cevians() -> str:
    """Triangle with apex C at top, A and B on the base; two cevians DE and
    FG parallel to AB partition the triangle into three equal-area regions."""
    W, H = 220, 180
    C_ = (110, 20); A_ = (30, 160); B_ = (200, 160)
    # For three equal areas, the upper line cuts at y where the upper triangle
    # has 1/3 area → similar-triangle scale factor 1/√3 from apex
    # Middle region (trapezoid DEGF): area between scale 1/√3 and √(2/3) from apex
    s1 = 1 / 3 ** 0.5         # apex-to-DE
    s2 = (2 / 3) ** 0.5       # apex-to-FG
    def along(P, t):
        return (C_[0] + t*(P[0]-C_[0]), C_[1] + t*(P[1]-C_[1]))
    D_ = along(A_, s1); E_ = along(B_, s1)
    F_ = along(A_, s2); G_ = along(B_, s2)
    body = [
        segment(*A_, *B_), segment(*A_, *C_), segment(*B_, *C_),
        segment(*D_, *E_), segment(*F_, *G_),
        point(*C_, "C", "above"),
        point(*D_, "D", "left"),
        point(*E_, "E", "right"),
        point(*F_, "F", "left"),
        point(*G_, "G", "right"),
        point(*A_, "A", "below"),
        point(*B_, "B", "below"),
    ]
    return svg(W, H, "\n".join(body))


# ─────────────────────────────────────────────
# Chapter 19 — Shifts, Turns, Flips, Stretches, and Squeezes
# ─────────────────────────────────────────────

def fig_19_1_translation() -> str:
    """Triangle ABC translated up-and-right to form A'B'C'."""
    W, H = 240, 130
    A = (35, 70); B = (25, 110); C = (90, 100)
    dx, dy = 95, -55
    Ap = (A[0]+dx, A[1]+dy); Bp = (B[0]+dx, B[1]+dy); Cp = (C[0]+dx, C[1]+dy)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*Ap, *Bp), segment(*Bp, *Cp), segment(*Ap, *Cp),
        point(*A, "A", "above-left"),
        point(*B, "B", "below-left"),
        point(*C, "C", "right"),
        point(*Ap, "A'", "above"),
        point(*Bp, "B'", "below-left"),
        point(*Cp, "C'", "right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_19_2_rotation() -> str:
    """Triangle ABC rotated by angle θ about center O to form A'B'C'."""
    W, H = 260, 160
    O = (220, 130)
    # ABC near lower-left
    A = (60, 75); B = (40, 115); C = (105, 100)
    th = _m.radians(50)
    def rot(p):
        x, y = p[0]-O[0], p[1]-O[1]
        nx = x*_m.cos(th) - y*_m.sin(th)
        ny = x*_m.sin(th) + y*_m.cos(th)
        return (O[0]+nx, O[1]+ny)
    Ap, Bp, Cp = rot(A), rot(B), rot(C)
    body = [
        segment(*A, *B), segment(*B, *C), segment(*A, *C),
        segment(*Ap, *Bp), segment(*Bp, *Cp), segment(*Ap, *Cp),
        _dashed(*O, *A), _dashed(*O, *Ap),
        text(O[0]-25, O[1]-3, "θ", italic=True, size=11),
        point(*A, "A", "left"),
        point(*B, "B", "below-left"),
        point(*C, "C", "below"),
        point(*Ap, "A'", "above"),
        point(*Bp, "B'", "left"),
        point(*Cp, "C'", "right"),
        point(*O, "O", "right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_19_3_reflection_line() -> str:
    """Pentagon ABCDE reflected across vertical line ℓ to form A'B'C'D'E'."""
    W, H = 320, 150
    # Mirror line at x = cx
    cx = 160
    body = [_dashed(cx, 10, cx, 140)]
    body.append(text(cx + 4, 144, "ℓ", italic=True, size=11, anchor="start"))
    # Pentagon ABCDE on the left
    pts_L = [
        ('A', (40, 35)),
        ('E', (75, 25)),
        ('D', (115, 60)),
        ('C', (90, 100)),
        ('B', (45, 90)),
    ]
    # Reflected pentagon (mirror x across cx)
    pts_R = [(name+"'", (2*cx - p[0], p[1])) for name, p in pts_L]
    for poly in (pts_L, pts_R):
        for i in range(len(poly)):
            p1 = poly[i][1]; p2 = poly[(i+1) % len(poly)][1]
            body.append(segment(*p1, *p2))
    for name, p in pts_L:
        pos = "above" if name in ('A','E') else "below" if name in ('B','C') else "right"
        body.append(point(*p, name, pos))
    for name, p in pts_R:
        pos = "above" if name in ("A'","E'") else "below" if name in ("B'","C'") else "left"
        body.append(point(*p, name, pos))
    return svg(W, H, "\n".join(body))


def fig_19_4_reflection_point() -> str:
    """Pentagon ABCDE reflected through center point O to form A'B'C'D'E'
    (180° rotation)."""
    W, H = 320, 130
    O = (160, 65)
    pts_L = [
        ('A', (40, 30)),
        ('E', (75, 22)),
        ('D', (115, 50)),
        ('C', (90, 95)),
        ('B', (45, 85)),
    ]
    # Reflect through O: (2*Ox - x, 2*Oy - y)
    pts_R = [(name+"'", (2*O[0] - p[0], 2*O[1] - p[1])) for name, p in pts_L]
    body = [point(*O, "O", "above", dot=True, italic=False)]
    for poly in (pts_L, pts_R):
        for i in range(len(poly)):
            p1 = poly[i][1]; p2 = poly[(i+1) % len(poly)][1]
            body.append(segment(*p1, *p2))
    for name, p in pts_L:
        pos = "above" if name in ('A','E') else "below" if name in ('B','C') else "right"
        body.append(point(*p, name, pos))
    for name, p in pts_R:
        pos = "below" if name in ("A'","E'") else "above" if name in ("B'","C'") else "left"
        body.append(point(*p, name, pos))
    return svg(W, H, "\n".join(body))


def fig_19_5_distortion() -> str:
    """Isosceles triangle ABC with apex distorted vertically into C', C''."""
    W, H = 200, 170
    A = (30, 145); B = (170, 145)
    Cs = [
        ("C''", 100, 25),
        ("C",   100, 60),
        ("C'",  100, 95),
    ]
    body = []
    for name, x, y in Cs:
        body.append(segment(*A, x, y))
        body.append(segment(*B, x, y))
        body.append(point(x, y, name, "above" if name == "C''" else "right" if name == "C'" else "above"))
    body.append(segment(*A, *B))
    body.append(point(*A, "A", "below"))
    body.append(point(*B, "B", "below"))
    return svg(W, H, "\n".join(body))


def fig_19_6_dilation() -> str:
    """Quadrilateral ABCD dilated with center O and a positive factor giving
    A'B'C'D' (larger version) on the other side of O."""
    W, H = 280, 200
    O = (40, 110)
    A = (110, 50); B = (150, 70); C = (130, 110); D = (90, 95)
    k = 1.7
    def dil(p):
        return (O[0] + (p[0]-O[0])*k, O[1] + (p[1]-O[1])*k)
    Ap, Bp, Cp, Dp = dil(A), dil(B), dil(C), dil(D)
    body = [
        # Original quadrilateral (small, solid)
        segment(*A, *B), segment(*B, *C), segment(*C, *D), segment(*D, *A),
        # Dilated quadrilateral (larger, solid)
        segment(*Ap, *Bp), segment(*Bp, *Cp), segment(*Cp, *Dp), segment(*Dp, *Ap),
        # Rays from O through each vertex (dashed)
        _dashed(*O, *Ap), _dashed(*O, *Bp), _dashed(*O, *Cp), _dashed(*O, *Dp),
        point(*O, "O", "left"),
        point(*A, "A", "above"),
        point(*B, "B", "above-right"),
        point(*C, "C", "right"),
        point(*D, "D", "below-left"),
        point(*Ap, "A'", "above"),
        point(*Bp, "B'", "above-right"),
        point(*Cp, "C'", "right"),
        point(*Dp, "D'", "left"),
    ]
    return svg(W, H, "\n".join(body))


# ─────────────────────────────────────────────
# Chapter 18 — Three Dimensional Geometry
# Pseudo-3D line drawings via simple oblique projection.
# ─────────────────────────────────────────────

def _dashed(x1, y1, x2, y2):
    """Helper: dashed line segment for hidden edges."""
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
            f'stroke="#1d1d1f" stroke-width="1.2" stroke-dasharray="4,3" fill="none"/>')


def fig_18_1_sphere_plane_intersection() -> str:
    """Sphere (drawn as ellipse) with center O and a plane intersecting it
    in a circle of diameter AB; segment OB inside the sphere."""
    W, H = 220, 160
    cx, cy = 110, 80
    R = 60
    # Outer sphere outline
    body = [circle(cx, cy, R)]
    # Inner ellipse for the equator-style cross-section (the "great circle")
    body.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{R}" ry="20" {STROKE}/>')
    # The plane intersection — small ellipse near the top
    Bx, By = cx - 35, cy - 30
    Ax, Ay = cx + 35, cy - 30
    body.append(f'<ellipse cx="{cx}" cy="{cy-30}" rx="35" ry="9" {STROKE}/>')
    # Segments OB, OA
    O = (cx, cy)
    body.append(segment(*O, Bx, By))
    body.append(segment(*O, Ax, Ay))
    body.append(point(Bx, By, "B", "above-left"))
    body.append(point(Ax, Ay, "A", "above-right"))
    body.append(point(*O, "O", "below-left"))
    return svg(W, H, "\n".join(body))


def _cube_vertices(x, y, s, depth):
    """Helper: front-face top-left at (x,y), side s, oblique depth offset.
    Returns the 8 vertices: front (0..3), back (4..7) in TL,TR,BR,BL order."""
    F = [(x, y), (x+s, y), (x+s, y+s), (x, y+s)]              # front face
    B = [(p[0]+depth, p[1]-depth) for p in F]                 # back, shifted up-right
    return F + B


def fig_18_2_cube() -> str:
    """A cube drawn in oblique 3D perspective."""
    W, H = 180, 160
    V = _cube_vertices(30, 60, 80, 30)
    F0,F1,F2,F3, B0,B1,B2,B3 = V
    # Visible (solid) edges
    solid = [
        segment(*F0, *F1), segment(*F1, *F2), segment(*F2, *F3), segment(*F3, *F0),
        segment(*F1, *B1), segment(*F2, *B2),  # right side
        segment(*B1, *B2),
        segment(*F0, *B0),
        segment(*B0, *B1),
    ]
    # Hidden edges (dashed)
    hidden = [
        _dashed(*F3, *B3),
        _dashed(*B3, *B0),
        _dashed(*B3, *B2),
    ]
    return svg(W, H, "\n".join(solid + hidden))


def fig_18_3_cube_diagonal() -> str:
    """Cube ABCDEFGH with face diagonal AC (on bottom face) and space diagonal EC."""
    W, H = 220, 200
    # Layout: front face = ABCD (top-left, top-right, bottom-right, bottom-left)
    # back face = EFGH same convention but offset
    s = 90; dpx, dpy = 35, -32
    A_, B_ = (40, 40), (40+s, 40)
    D_, C_ = (40, 40+s), (40+s, 40+s)
    E_, F_ = (A_[0]+dpx, A_[1]+dpy), (B_[0]+dpx, B_[1]+dpy)
    H_, G_ = (D_[0]+dpx, D_[1]+dpy), (C_[0]+dpx, C_[1]+dpy)
    body = [
        # Front face ABCD
        segment(*A_, *B_), segment(*B_, *C_), segment(*C_, *D_), segment(*D_, *A_),
        # Right side, top
        segment(*B_, *F_), segment(*F_, *G_), segment(*G_, *C_),
        # Top edge from A to E
        segment(*A_, *E_), segment(*E_, *F_),
        # Hidden edges
        _dashed(*D_, *H_), _dashed(*H_, *E_), _dashed(*H_, *G_),
        # Diagonals: AC (face) and EC (space)
        segment(*A_, *C_),
        segment(*E_, *C_),
        # Right angle marks at C and A
        right_angle_mark(C_[0], C_[1], B_, D_, size=6),
        point(*A_, "A", "above-left"),
        point(*B_, "B", "above"),
        point(*C_, "C", "below"),
        point(*D_, "D", "below-left"),
        point(*E_, "E", "above-left"),
        point(*F_, "F", "above-right"),
        point(*G_, "G", "right"),
        point(*H_, "H", "above-right"),
    ]
    return svg(W, H, "\n".join(body))


def fig_18_4_cylinder_unroll() -> str:
    """Cylinder unrolled into a rectangle of height h and width 2πr."""
    W, H = 320, 150
    # Cylinder on the left
    body = []
    cx, cy_top = 60, 30
    cy_bot = 110
    rx_ell, ry_ell = 30, 8
    # Top ellipse
    body.append(f'<ellipse cx="{cx}" cy="{cy_top}" rx="{rx_ell}" ry="{ry_ell}" {STROKE}/>')
    # Vertical sides
    body.append(segment(cx - rx_ell, cy_top, cx - rx_ell, cy_bot))
    body.append(segment(cx + rx_ell, cy_top, cx + rx_ell, cy_bot))
    # Bottom ellipse — solid front, dashed back
    body.append(f'<path d="M {cx - rx_ell} {cy_bot} A {rx_ell} {ry_ell} 0 0 0 {cx + rx_ell} {cy_bot}" {STROKE}/>')
    body.append(_dashed(cx - rx_ell, cy_bot, cx + rx_ell, cy_bot))
    # Vertical dashed line through center showing height
    body.append(_dashed(cx, cy_top, cx, cy_bot))
    # A and B labels at top and bottom
    body.append(text(cx, cy_top - 8, "A", italic=True, size=11))
    body.append(text(cx, cy_bot + 16, "B", italic=True, size=11))
    # Rectangle on the right
    rx, ry = 160, 30
    rw, rh = 130, 80
    body.append(f'<rect x="{rx}" y="{ry}" width="{rw}" height="{rh}" {STROKE}/>')
    # right-angle marks on corners
    body.append(right_angle_mark(rx, ry+rh, (rx+10, ry+rh), (rx, ry+rh-10), size=6))
    body.append(text(rx-8, ry-4, "A", italic=True, size=11, anchor="end"))
    body.append(text(rx-8, ry+rh+12, "B", italic=True, size=11, anchor="end"))
    body.append(text(rx + rw/2, ry - 6, "2πr", italic=True, size=11))
    body.append(text(rx + rw + 4, ry + rh/2 + 4, "h", italic=True, size=11, anchor="start"))
    return svg(W, H, "\n".join(body))


def fig_18_5_pyramid() -> str:
    """Square pyramid in 3D perspective — apex above a square base."""
    W, H = 180, 170
    # Base in oblique projection
    A = (40, 130); B = (130, 130); C = (155, 100); D = (65, 100)
    apex = (95, 25)
    body = [
        segment(*A, *B), segment(*B, *C),
        segment(*A, *apex), segment(*B, *apex), segment(*C, *apex),
        segment(*D, *apex),
        # Hidden edges
        _dashed(*A, *D), _dashed(*D, *C),
    ]
    return svg(W, H, "\n".join(body))


def fig_18_6_cone() -> str:
    """Right circular cone — apex with circular base, altitude h, slant height ℓ."""
    W, H = 180, 180
    apex = (90, 25)
    cx, cy = 90, 140
    rx, ry = 55, 14
    # Side outlines from apex tangent to ellipse
    LEFT  = (cx - rx, cy)
    RIGHT = (cx + rx, cy)
    body = [
        segment(*apex, *LEFT),
        segment(*apex, *RIGHT),
        # Front half of base ellipse (solid)
        f'<path d="M {LEFT[0]} {LEFT[1]} A {rx} {ry} 0 0 0 {RIGHT[0]} {RIGHT[1]}" {STROKE}/>',
        # Back half (dashed)
        _dashed(LEFT[0], LEFT[1], RIGHT[0], RIGHT[1]),
        f'<path d="M {LEFT[0]} {LEFT[1]} A {rx} {ry} 0 0 1 {RIGHT[0]} {RIGHT[1]}" stroke="#1d1d1f" stroke-width="1.2" stroke-dasharray="4,3" fill="none"/>',
        # Altitude (dashed) and radius
        _dashed(*apex, cx, cy),
        segment(cx, cy, RIGHT[0], RIGHT[1]),
        # Labels
        text(cx + 4, (apex[1]+cy)/2, "h", italic=True, size=11, anchor="start"),
        text((cx + RIGHT[0])/2, cy - 4, "r", italic=True, size=11),
        text((apex[0]+RIGHT[0])/2 + 6, (apex[1]+RIGHT[1])/2, "ℓ", italic=True, size=11, anchor="start"),
    ]
    return svg(W, H, "\n".join(body))


def fig_18_7_cone_unroll() -> str:
    """Cone unrolled into a sector of radius ℓ with arc length 2πr."""
    W, H = 360, 170
    # Cone on the left (re-use simplified rendering)
    apex_L = (70, 30)
    cx_L, cy_L = 70, 130
    rx_L, ry_L = 35, 10
    body = [
        segment(*apex_L, cx_L - rx_L, cy_L),
        segment(*apex_L, cx_L + rx_L, cy_L),
        f'<ellipse cx="{cx_L}" cy="{cy_L}" rx="{rx_L}" ry="{ry_L}" {STROKE}/>',
        _dashed(*apex_L, cx_L, cy_L),
        text(cx_L + 4, (apex_L[1]+cy_L)/2, "ℓ", italic=True, size=11, anchor="start"),
        text(apex_L[0] - 8, apex_L[1] - 2, "A", italic=True, size=11, anchor="end"),
        text(cx_L - rx_L - 6, cy_L + 4, "B", italic=True, size=11, anchor="end"),
    ]
    # Sector on the right — apex at A_R, arc swept from B to B'
    Ax, Ay = 220, 30
    radius = 110
    # Arc from angle 60° (CCW) to 130° measured from +x axis (drawing downward)
    # Use a 100° sweep
    a0 = _m.radians(60); a1 = _m.radians(120)
    Bx,  By  = Ax + radius*_m.cos(a0), Ay + radius*_m.sin(a0)
    Bpx, Bpy = Ax + radius*_m.cos(a1), Ay + radius*_m.sin(a1)
    body += [
        segment(Ax, Ay, Bx, By),
        segment(Ax, Ay, Bpx, Bpy),
        f'<path d="M {Bx} {By} A {radius} {radius} 0 0 1 {Bpx} {Bpy}" {STROKE}/>',
        text(Ax, Ay - 6, "A", italic=True, size=11),
        text(Bx + 6, By + 6, "B", italic=True, size=11, anchor="start"),
        text(Bpx - 8, Bpy + 6, "B'", italic=True, size=11, anchor="end"),
        text((Ax+Bx)/2 + 6, (Ay+By)/2, "ℓ", italic=True, size=11, anchor="start"),
    ]
    return svg(W, H, "\n".join(body))


def fig_18_8_five_platonic_solids() -> str:
    """The five Platonic solids: tetrahedron, cube, octahedron, dodecahedron,
    icosahedron — line-art outlines arranged in a row."""
    W, H = 660, 160
    body = []

    # 1. Tetrahedron
    A = (50, 30); Bp = (20, 120); Cp = (90, 120); D_ = (60, 110)
    body += [segment(*A, *Bp), segment(*A, *Cp), segment(*Bp, *Cp),
             segment(*A, *D_), _dashed(*Bp, *D_), _dashed(*D_, *Cp)]

    # 2. Cube
    s = 70; ox, oy = 130, 50; dpx, dpy = 22, -22
    F = [(ox, oy), (ox+s, oy), (ox+s, oy+s), (ox, oy+s)]
    Bk = [(p[0]+dpx, p[1]+dpy) for p in F]
    body += [segment(*F[0], *F[1]), segment(*F[1], *F[2]), segment(*F[2], *F[3]),
             segment(*F[3], *F[0]),
             segment(*F[0], *Bk[0]), segment(*F[1], *Bk[1]), segment(*F[2], *Bk[2]),
             segment(*Bk[0], *Bk[1]), segment(*Bk[1], *Bk[2]),
             _dashed(*F[3], *Bk[3]), _dashed(*Bk[3], *Bk[0]), _dashed(*Bk[3], *Bk[2])]

    # 3. Octahedron
    cx_o, cy_o = 290, 75
    top = (cx_o, cy_o - 50); bot = (cx_o, cy_o + 50)
    L = (cx_o - 45, cy_o); R = (cx_o + 45, cy_o)
    F_o = (cx_o - 5, cy_o + 8); Bk_o = (cx_o + 5, cy_o - 8)
    body += [segment(*top, *L), segment(*top, *R), segment(*top, *F_o),
             segment(*bot, *L), segment(*bot, *R), segment(*bot, *F_o),
             segment(*L, *F_o), segment(*R, *F_o),
             _dashed(*top, *Bk_o), _dashed(*bot, *Bk_o),
             _dashed(*L, *Bk_o), _dashed(*R, *Bk_o)]

    # 4. Dodecahedron — approximate as two stacked pentagons
    cx_d, cy_d = 420, 75
    def pentagon(c, r, rot=0):
        return [(c[0] + r*_m.cos(_m.radians(rot + 72*i - 90)),
                 c[1] + r*_m.sin(_m.radians(rot + 72*i - 90))) for i in range(5)]
    front = pentagon((cx_d, cy_d + 5), 38, rot=0)
    back  = pentagon((cx_d, cy_d - 5), 38, rot=36)
    for i in range(5):
        body.append(segment(*front[i], *front[(i+1) % 5]))
    for i in range(5):
        body.append(_dashed(*back[i], *back[(i+1) % 5]))
    for f, b in zip(front, back):
        body.append(segment(*f, *b))

    # 5. Icosahedron — approximate as 6 vertices arranged with cross edges
    cx_i, cy_i = 555, 75
    R_i = 50
    angles = [90, 162, 234, 306, 18]
    pts = [(cx_i + R_i*_m.cos(_m.radians(a)),
            cy_i + R_i*_m.sin(_m.radians(a))) for a in angles]
    # Add top and bottom
    top_i = (cx_i, cy_i - R_i*1.1)
    bot_i = (cx_i, cy_i + R_i*1.1)
    for i in range(5):
        body.append(segment(*pts[i], *pts[(i+1) % 5]))
        body.append(segment(*top_i, *pts[i]))
        body.append(segment(*bot_i, *pts[i]))
    return svg(W, H, "\n".join(body))


def fig_18_9_tetrahedron() -> str:
    """Regular tetrahedron ABCD with apex B above the equilateral base ACD,
    altitude from B to centroid O of base."""
    W, H = 200, 180
    # Base triangle ACD with O the centroid
    A = (160, 130); C = (40, 130); D = (110, 90)
    O = ((A[0]+C[0]+D[0])/3, (A[1]+C[1]+D[1])/3)
    B_ = (O[0], 25)   # apex directly above O
    body = [
        segment(*A, *C), segment(*C, *D), segment(*A, *D),
        segment(*B_, *A), segment(*B_, *C), segment(*B_, *D),
        # Altitude (dashed) and base segment from O to one vertex
        _dashed(*B_, *O), segment(*O, *D),
        right_angle_mark(O[0], O[1], B_, D, size=6),
        point(*A, "A", "right"),
        point(*B_, "B", "above"),
        point(*C, "C", "left"),
        point(*D, "D", "below-right"),
        point(*O, "O", "below"),
    ]
    return svg(W, H, "\n".join(body))


def fig_18_10_octahedron() -> str:
    """Regular octahedron split into two square pyramids sharing base ABCD."""
    W, H = 220, 180
    cx, cy = 110, 90
    # Square base ABCD in oblique view
    A = (cx + 55, cy);   C = (cx - 55, cy)
    B_ = (cx, cy + 35); D_ = (cx, cy - 35)
    E  = (cx, cy - 70)
    F  = (cx, cy + 70)
    body = [
        segment(*E, *A), segment(*E, *B_), segment(*E, *C), segment(*E, *D_),
        segment(*F, *A), segment(*F, *B_), segment(*F, *C),
        _dashed(*F, *D_),
        # Base edges
        segment(*A, *B_), segment(*B_, *C),
        _dashed(*C, *D_), _dashed(*D_, *A),
        # OA segment (radius from center to A)
        segment(cx, cy, *A),
        point(*E, "E", "above"),
        point(*A, "A", "right"),
        point(*B_, "B", "below"),
        point(*C, "C", "left"),
        point(*D_, "D", "above"),
        point(*F, "F", "below"),
        point(cx, cy, "O", "below-left"),
    ]
    return svg(W, H, "\n".join(body))


def fig_16_7_circle_plot() -> str:
    """Circle of radius 3 centered at (-1, 2) on coordinate plane."""
    W, H = 240, 180
    cx, cy = 120, 90
    parts = _axes(cx, cy, 80)
    s = 14
    # Center at (-1, 2)
    Cx = cx + (-1)*s
    Cy = cy - 2*s
    r = 3 * s
    parts.append(circle(Cx, Cy, r))
    parts.append(point(Cx, Cy, label=None))
    # Mark the four cardinal points on the circle
    for dx, dy in [(r, 0), (-r, 0), (0, r), (0, -r)]:
        parts.append(point(Cx + dx, Cy + dy, label=None, dot=True))
    return svg(W, H, "\n".join(parts))


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
    "fig-11-1-six-triangles-classification":  fig_11_1_six_triangles_classification,
    "fig-11-2-medians-centroid":              fig_11_2_medians_centroid,
    "fig-11-3-angle-bisectors-incenter":      fig_11_3_angle_bisectors_incenter,
    "fig-11-4-incircle":                      fig_11_4_incircle,
    "fig-11-5-three-circumcircles":           fig_11_5_three_circumcircles,
    "fig-11-6-altitude-extended":             fig_11_6_altitude_extended,
    "fig-11-7-right-triangle-semicircle":     fig_11_7_right_triangle_semicircle,
    "fig-11-8-pythagorean-setup":             fig_11_8_pythagorean_setup,
    "fig-11-11-congruent-triangles-intro":    fig_11_11_congruent_triangles_intro,
    "fig-11-12-sss-theorem":                  fig_11_12_sss_theorem,
    "fig-11-13-sas-warning":                  fig_11_13_sas_warning,
    "fig-11-14-asa-theorem":                  fig_11_14_asa_theorem,
    "fig-11-15-hl-ll-right-triangles":        fig_11_15_hl_ll_right_triangles,
    "fig-11-16-example-11-9-kite":            fig_11_16_example_11_9_kite,
    "fig-11-17-example-11-10-isosceles-altitude": fig_11_17_example_11_10_isosceles_altitude,
    "fig-11-18-similar-triangles-intro":      fig_11_18_similar_triangles_intro,
    "fig-11-19-sas-similarity":               fig_11_19_sas_similarity,
    "fig-11-20-example-11-11":                fig_11_20_example_11_11,
    "fig-11-9-altitude-to-hypotenuse":        fig_11_9_altitude_to_hypotenuse,
    "fig-11-10-angle-bisector-theorem":       fig_11_10_angle_bisector_theorem,
    "fig-11-21-example-11-14":                fig_11_21_example_11_14,
    "fig-11-22-example-11-15":                fig_11_22_example_11_15,
    "fig-11-23-trig-right-triangle":          fig_11_23_trig_right_triangle,
    "fig-11-24-45-45-90":                     fig_11_24_45_45_90,
    "fig-11-25-30-60-90":                     fig_11_25_30_60_90,
    "fig-11-26-example-11-18":                fig_11_26_example_11_18,
    "fig-11-27-rectangle-two-triangles":      fig_11_27_rectangle_two_triangles,
    "fig-11-28-acute-altitude":               fig_11_28_acute_altitude,
    "fig-11-29-incircle-inradii":             fig_11_29_incircle_inradii,
    "fig-11-30-pythagorean-square-proof":     fig_11_30_pythagorean_square_proof,
    "fig-11-31-parallel-transversal-angles":  fig_11_31_parallel_transversal_angles,
    "fig-11-32-example-11-25-setup":          fig_11_32_example_11_25_setup,
    "fig-11-33-example-11-25-with-aux":       fig_11_33_example_11_25_with_aux,
    "fig-12-1-convex-concave-quadrilaterals": fig_12_1_convex_concave_quadrilaterals,
    "fig-12-2-trapezoid-with-median":         fig_12_2_trapezoid_with_median,
    "fig-12-3-trapezoid-median-proof":        fig_12_3_trapezoid_median_proof,
    "fig-12-4-isosceles-trapezoid-diagonals": fig_12_4_isosceles_trapezoid_diagonals,
    "fig-12-5-example-12-1":                  fig_12_5_example_12_1,
    "fig-12-6-parallelogram-diagonals":       fig_12_6_parallelogram_diagonals,
    "fig-12-7-parallelogram-d1-d2-theta":     fig_12_7_parallelogram_d1_d2_theta,
    "fig-12-8-rhombus-diagonals":             fig_12_8_rhombus_diagonals,
    "fig-12-9-example-12-3-rhombus":          fig_12_9_example_12_3_rhombus,
    "fig-12-10-rectangle":                    fig_12_10_rectangle,
    "fig-12-11-square":                       fig_12_11_square,
    "fig-12-12-example-12-5-inscribed-square": fig_12_12_example_12_5_inscribed_square,
    "fig-12-13-example-12-8-midpoints":       fig_12_13_example_12_8_midpoints,
    "fig-13-1-three-regular-polygons":        fig_13_1_three_regular_polygons,
    "fig-13-2-polygon-diagonals-from-vertex": fig_13_2_polygon_diagonals_from_vertex,
    "fig-13-3-polygon-interior-exterior-angles": fig_13_3_polygon_interior_exterior_angles,
    "fig-13-4-example-13-1-hexagon-equilateral": fig_13_4_example_13_1_hexagon_equilateral,
    "fig-13-5-example-13-3-dodecagon-trapezoid": fig_13_5_example_13_3_dodecagon_trapezoid,
    "fig-13-6-hexagon-inscribed-circumscribed": fig_13_6_hexagon_inscribed_circumscribed,
    "fig-13-7-hexagon-six-equilateral-triangles": fig_13_7_hexagon_six_equilateral_triangles,
    "fig-13-8-example-13-4-hexagon-all-segments": fig_13_8_example_13_4_hexagon_all_segments,
    "fig-13-9-five-pointed-star":             fig_13_9_five_pointed_star,
    "fig-14-1-problem-236-iso-triangles":         fig_14_1_problem_236_iso_triangles,
    "fig-14-2-problem-237-interior-point":        fig_14_2_problem_237_interior_point,
    "fig-14-3-problem-238-quadrilateral-trisected": fig_14_3_problem_238_quadrilateral_trisected,
    "fig-14-4-problem-239-square-equilateral":    fig_14_4_problem_239_square_equilateral,
    "fig-14-5-problem-240-congruent-triangles":   fig_14_5_problem_240_congruent_triangles,
    "fig-14-6-problem-241-bisector-altitude":     fig_14_6_problem_241_bisector_altitude,
    "fig-14-7-problem-243-chord-circle":          fig_14_7_problem_243_chord_circle,
    "fig-14-8-problem-244-square-equilateral":    fig_14_8_problem_244_square_equilateral,
    "fig-14-9-problem-245-general-triangle":      fig_14_9_problem_245_general_triangle,
    "fig-14-10-problem-247-tangent-pab":          fig_14_10_problem_247_tangent_pab,
    "fig-14-11-problem-248-circle-eadb":          fig_14_11_problem_248_circle_eadb,
    "fig-14-12-problem-249-pqr-bisector":         fig_14_12_problem_249_pqr_bisector,
    "fig-14-13-problem-250-parallelograms":       fig_14_13_problem_250_parallelograms,
    "fig-14-14-problem-251-semicircles":          fig_14_14_problem_251_semicircles,
    "fig-15-1-triangle-midpoints":               fig_15_1_triangle_midpoints,
    "fig-15-2-trapezoid-diagonals":              fig_15_2_trapezoid_diagonals,
    "fig-15-3-medians-six-regions":              fig_15_3_medians_six_regions,
    "fig-15-4-example-15-5":                     fig_15_4_example_15_5,
    "fig-15-5-example-15-7":                     fig_15_5_example_15_7,
    "fig-15-6-annulus":                          fig_15_6_annulus,
    "fig-15-7-octagon-from-square":              fig_15_7_octagon_from_square,
    "fig-15-8-isosceles-triangle-with-arcs":     fig_15_8_isosceles_triangle_with_arcs,
    "fig-15-9-square-with-leaves":               fig_15_9_square_with_leaves,
    "fig-15-10-four-overlapping-circles":        fig_15_10_four_overlapping_circles,
    "fig-16-1-cartesian-plane":                  fig_16_1_cartesian_plane,
    "fig-16-2-polar-grid":                       fig_16_2_polar_grid,
    "fig-16-3-line-with-rise-run":               fig_16_3_line_with_rise_run,
    "fig-16-4-perpendicular-lines":              fig_16_4_perpendicular_lines,
    "fig-16-5-line-plot":                        fig_16_5_line_plot,
    "fig-16-6-distance-formula-triangle":        fig_16_6_distance_formula_triangle,
    "fig-16-7-circle-plot":                      fig_16_7_circle_plot,
    "fig-17-1-two-tangents":                     fig_17_1_two_tangents,
    "fig-17-2-tangent-and-secant":               fig_17_2_tangent_and_secant,
    "fig-17-3-two-secants":                      fig_17_3_two_secants,
    "fig-17-4-two-chords":                       fig_17_4_two_chords,
    "fig-17-5-power-proof-outside":              fig_17_5_power_proof_outside,
    "fig-17-6-power-proof-inside":               fig_17_6_power_proof_inside,
    "fig-18-1-sphere-plane-intersection":        fig_18_1_sphere_plane_intersection,
    "fig-18-2-cube":                             fig_18_2_cube,
    "fig-18-3-cube-diagonal":                    fig_18_3_cube_diagonal,
    "fig-18-4-cylinder-unroll":                  fig_18_4_cylinder_unroll,
    "fig-18-5-pyramid":                          fig_18_5_pyramid,
    "fig-18-6-cone":                             fig_18_6_cone,
    "fig-18-7-cone-unroll":                      fig_18_7_cone_unroll,
    "fig-18-8-five-platonic-solids":             fig_18_8_five_platonic_solids,
    "fig-18-9-tetrahedron":                      fig_18_9_tetrahedron,
    "fig-18-10-octahedron":                      fig_18_10_octahedron,
    "fig-19-1-translation":                      fig_19_1_translation,
    "fig-19-2-rotation":                         fig_19_2_rotation,
    "fig-19-3-reflection-line":                  fig_19_3_reflection_line,
    "fig-19-4-reflection-point":                 fig_19_4_reflection_point,
    "fig-19-5-distortion":                       fig_19_5_distortion,
    "fig-19-6-dilation":                         fig_19_6_dilation,
    "fig-29-1-problem-578-three-hexagons":       fig_29_1_problem_578_three_hexagons,
    "fig-29-2-problem-584-rectangle-with-point": fig_29_2_problem_584_rectangle_with_point,
    "fig-29-3-problem-586-triangle-cevians":     fig_29_3_problem_586_triangle_cevians,
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
