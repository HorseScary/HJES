# https://www.cs.princeton.edu/~chazelle/pubs/CirclePlacement.pdf
# i stole this code from somewhere
# importing the required module
import matplotlib.pyplot as plt
import numpy as np


def getDistance(x1, x2, y1, y2):
    return (np.sqrt(np.square(x2-x1)+np.square(y2-y1)))


# make the data
np.random.seed(3)
x = 4 + np.random.normal(0, 2, 24)
y = 4 + np.random.normal(0, 2, len(x))

# plot
fig, ax = plt.subplots()

ax.scatter(x, y, s=10, vmin=0, vmax=100)
ax.grid(which='both', color='grey', linewidth=1, linestyle='-', alpha=0.2)

ax.set(xlim=(0, 8), xticks=np.arange(1, 8),
       ylim=(0, 8), yticks=np.arange(1, 8))

for i in range(len(x)):
    try:
        if getDistance(x[i], x[i+1], y[i], y[i+1]) >= 3:
            plt.plot(x[i], x[i+1], y[i], y[i+1], marker="o",
                     linewidth=5, linestyle="solid")

    except IndexError:
        pass

plt.show()
