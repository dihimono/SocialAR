import csv
import sys
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

file_name = sys.argv[1]
count = 0
a = [0] * 8
for i in range(8):
	a[i] = []
#print a
with open(file_name, 'rb') as csvfile:
	next(csvfile)
	reader = csv.reader(csvfile, delimiter=',')
	for row in reader:
		q = []
		for i in range(8):
			a[i].append(row[i + 1])
		#for w in row[1:]:
		#	q.append(int(w))				
		#a.append(q)
		count = count + 1

print count
print a
fig = plt.figure()
ax = Axes3D(fig)

rad = np.linspace(0, count + 1, count + 1)
azm = np.linspace(0, 2 * np.pi, 9)

r, th = np.meshgrid(rad, azm)
z = (r ** 2.0) / 4.0

s = np.array(a, np.int32)
#print s

#print r
#print r[0][2]

plt.subplot(projection="polar")

plt.pcolormesh(th, r, s, cmap='binary')
plt.plot(azm, r, color='k', ls='none')
plt.grid()

plt.show()



	
		
