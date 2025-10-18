# Supervised Learning

Supervised learning is a type of machine learning where models are trained on labeled data.

**Topics Covered:**
- Regression
- Classification

**Example:**
```python
from sklearn.linear_model import LinearRegression

X = [[1], [2], [3]]
y = [2, 4, 6]
model = LinearRegression().fit(X, y)
print(model.predict([[4]]))
```