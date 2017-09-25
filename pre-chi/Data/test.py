import csv
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import gaussian_kde

import numpy as np

x = []
y = []
theta = []
radius = []
ax = plt.subplot(111, polar=True)
with open('test.csv', newline = '') as csvfile:
    reader = csv.reader(csvfile, delimiter = ' ', quotechar = '|')
    for row in reader:
        sp = row[0].split(",")
        r = float(sp[0])
        t = float(sp[1])
        radius.append(r)
        theta.append(t)
        x.append(r * np.cos(t))
        y.append(r * np.sin(t))

radius = np.array(radius)
theta = np.array(theta)

# Histogramming
nr = 50
ntheta = 200
r_edges = np.linspace(0, 1, nr + 1)
theta_edges = np.linspace(0, 2*np.pi, ntheta + 1)
H, _, _ = np.histogram2d(radius, theta, [r_edges, theta_edges])

# Plot
ax = plt.subplot(111, polar=True)
Theta, R = np.meshgrid(theta_edges, r_edges)
ax.pcolormesh(Theta, R, H)
plt.show()
# fig = plt.figure()
# ax.scatter(theta, radius, color='None', edgecolor='red')

# ax.set_rmax(90)   

# plt.show()


# print(max(x))
# print(max(y))

# xx = np.array(x)
# yy = np.array(y)


# # Calculate the point density
# xy = np.vstack([xx,yy])
# z = gaussian_kde(xy)(xy)

# # Sort the points by density, so that the densest points are plotted last
# idx = z.argsort()
# xx, yy, z = xx[idx], yy[idx], z[idx]

# fig, ax = plt.subplots()
# ax.scatter(xx, yy, c=z, s=50, edgecolor='')
# plt.show()

