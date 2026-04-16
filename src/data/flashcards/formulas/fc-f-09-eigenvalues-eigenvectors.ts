import { Flashcard } from '@/lib/types';

const fc: Flashcard = {
  id: 'fc-f-09-eigenvalues-eigenvectors',
  type: 'formula',
  chapter: 3,
  section: '3.6',
  difficulty: 'medium',
  tags: ['formula', 'linear-algebra', 'eigenvalues'],

  front: `**Eigenvalues and Eigenvectors**

How do you find eigenvalues and eigenvectors of a matrix $A$? What are the key properties?`,

  back: `**Definition:** $Av = \\lambda v$ where $\\lambda$ = eigenvalue, $v$ = eigenvector

**Finding eigenvalues:** Solve $\\det(A - \\lambda I) = 0$

**For a 2×2 matrix** $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$:
$$\\lambda^2 - (a+d)\\lambda + (ad - bc) = 0$$
- $\\text{trace} = a + d = \\lambda_1 + \\lambda_2$
- $\\det = ad - bc = \\lambda_1 \\cdot \\lambda_2$

**Key properties:**
- $\\det(A) = \\prod \\lambda_i$
- $\\text{tr}(A) = \\sum \\lambda_i$
- Symmetric matrix → all eigenvalues are **real**
- PSD matrix → all eigenvalues $\\geq 0$

**Application:** Correlation matrix must be PSD → all eigenvalues $\\geq 0$ → constrains valid correlations.`,
};

export default fc;
