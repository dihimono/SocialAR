import csv
import sys

file_name = sys.argv[1]

# init for ecc count
area = [0] * 8
for x in range(8):
  area[x] = []

biggest_ecc = 0

gap = float(sys.argv[2])

def map_to_ecc_category( raw ):
  return int ( raw / gap )

with open(file_name, 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
        angle = float(row[2])
        ecc_category = map_to_ecc_category(float(row[1]))
        
        #print angle
        for counter in xrange(8):
          l = counter * 45 
          r = (counter + 1) * 45
          if angle >= l and angle < r:
            area[counter].append(ecc_category)
            if biggest_ecc < ecc_category:
              biggest_ecc = ecc_category

#Debug
#print area

with open('log.csv', 'w') as writefile:
  fieldnames = ['ecc_category', 0, 1, 2, 3, 4, 5, 6, 7]
  writer = csv.DictWriter(writefile, fieldnames=fieldnames)

  writer.writeheader()
  for ecc_step in range(biggest_ecc + 1):
    count = [0] * 8
    for i in range(8):
      for value in area[i]:
        if ecc_step == value:
          count[i] = count[i] + 1
           #print i, ":", value
        
    writer.writerow({'ecc_category': ecc_step, 0: count[0], 1: count[1], 2: count[2], 3: count[3], 4: count[4], 5: count[5], 6: count[6], 7: count[7]})