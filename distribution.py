import csv
import sys

file_name = sys.argv[1]

# init four direction count
count = 0
area = [0] * 8

with open(file_name, 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        angle = float(row[2])
        #print angle
        count = count + 1
        for counter in xrange(8):
          l = counter * 45 
          r = (counter + 1) * 45
          if angle >= l and angle < r:
            area[counter] = area[counter] + 1
for i in xrange(8):
  print "Area ", i, " ", area[i], " ", 100.0 * area[i] / count, "%"
print "total: ", count
