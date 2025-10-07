# Exploring Seaborn

Seaborn is a data visualization library based on Matplotlib that provides a high-level interface for attractive statistical graphics.

**Topics Covered:**
- Basic seaborn plots (scatter, boxplot)
- Styling with seaborn themes

**Example:**
```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.set(style="darkgrid")
tips = sns.load_dataset("tips")
sns.scatterplot(data=tips, x="total_bill", y="tip")
plt.show()
```