import csv
import sys

file_name = sys.argv[1]

# init four direction count
up = 0
right = 0
down = 0
left = 0
count = 0

with open(file_name, 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        angle = float(row[2])
        #print angle
        count = count + 1
        if angle < 135 and angle > 45:
            up = up + 1
            #print "up"
        elif angle < 225.0 and angle > 135.0:
            left = left + 1
            #print "left"
        elif angle < 315.0 and angle > 225.0:
            down = down + 1
            #print "down"
        elif angle < 45.0 or angle > 315.0:
            right = right + 1
            #print "right"
        else :
            print ("exception")
print "up: ", up, " ", float(up)/count * 100, "%" 
print "right: ", right, " ", float(right)/count * 100, "%"
print "down: ", down, " ", float(down)/count * 100, "%"
print "left ", left, " ", float(left)/count * 100, "%"
     
