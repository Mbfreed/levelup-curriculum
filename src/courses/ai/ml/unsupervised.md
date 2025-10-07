# Unsupervised Learning

Unsupervised learning works with data that has no labels. The goal is to find hidden patterns or groupings.

**Topics Covered:**
- Clustering
- Dimensionality reduction

**Example:**
```python
from sklearn.cluster import KMeans

X = [[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]]
model = KMeans(n_clusters=2, random_state=0).fit(X)
print(model.labels_)
```