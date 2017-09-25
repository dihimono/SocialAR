#!/usr/bin/env python
import os
import sys
import argparse
import re

class Filter(object):
    def __init__(self, eyes_csv, exclude_csv, isInclude):
        self.fps = 30
        self.eyes = eyes_csv
        self.exclude = exclude_csv
        self.isInclude = isInclude

    def transform_exclude(self):
        time_range = []
        with open(self.exclude, "r+") as f:
            for line in f:
                match = re.search(r"([\d]+):([\d]+) *~ *([\d]+):([\d]+)", line)
                if match:
                    #print("{} {} {} {}".format(match.group(1), match.group(2), match.group(3), match.group(4)))
                    m_i = int(match.group(1))
                    s_i = int(match.group(2))
                    m_f = int(match.group(3))
                    s_f = int(match.group(4))
                    start = (m_i * 60 + s_i) * self.fps
                    end = (m_f * 60 + s_f) * self.fps
                    #print("{} {} => {}".format(start, end, end - start))
                    time_range += [i for i in range(start, end)]
                else:
                    print("The format in {} has problems!!!".format(self.exclude))
                    sys.exit(-1)
            #print(time_range) 
            self.time_range = time_range
            
    def filter_rows(self):
        filtered_rows = []
        with open(self.eyes, "r+") as f:
            for line in f:
                frame = line.split(',')[0].strip()
                r = line.split(',')[1].strip()
                theta = line.split(',')[2].strip()
                if self.isInclude:
                    if frame in self.time_range:
                        filtered_rows.append((r, theta))
                else:
                    if frame not in self.time_range:
                        filtered_rows.append("{},{}".format(float(r), float(theta)))
        self.filtered_rows = filtered_rows

    def save_csv(self, filename):
        if self.filtered_rows is not None:
            with open(filename, "w") as f:
                f.write('\n'.join(self.filtered_rows))
        else:
            print("There's no filtered_rows exist!!!")
            sys.exit(-2)

def main():
    o = Filter(args.eyes, args.exclude, args.include)
    o.transform_exclude()
    o.filter_rows()
    print("It will save into {}".format(SAVED_CSV))
    o.save_csv(SAVED_CSV)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="filter the frames, and the output file will be res.csv in the same folder as executing", formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument("eyes", type=str, metavar="eyes.csv", help="contains the eye information. \nThe format is: '[int],[float],[float]' \ne.g. 35,4.591248252094452,101.80049532458902")
    parser.add_argument("exclude", type=str, metavar="exclude.csv", help="The csv files to indicate which time period need to be excluded. \nThe format is 'mm:ss ~ mm:ss'")
    parser.add_argument("--include", action='store_true', help="Switch it on to make the exclude.csv into include.csv")
    args = parser.parse_args()

    SAVED_CSV = 'res.csv'
    main()
