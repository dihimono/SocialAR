from pyheatmap.heatmap import HeatMap
from PIL import Image

import csv
import math

data=[]
minx = 0
miny = 0
basewidth = 500

with open('test.csv', newline = '') as csvfile:
    reader = csv.reader(csvfile, delimiter = ' ', quotechar = '|')
    for row in reader:
        sp = row[0].split(",")
        r = float(sp[0])
        t = float(sp[1])
        x = int(r*math.cos(t))
        y = int(r*math.sin(t))
        minx = min(x, minx)
        miny = min(y, miny)
        print(minx, miny)
        data.append([x - minx, y - miny])
    hm = HeatMap(data)
    hm.clickmap(save_as="hit.png")
    hm.heatmap(save_as="heat.png")
    im = Image.open("heat.png")
    im = im.rotate(270)
    print(im.format, im.size, im.mode)
    im.save("heat_resize.png", "PNG")