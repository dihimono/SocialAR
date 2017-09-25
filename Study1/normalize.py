#!/usr/bin/env python
import os
import sys
import argparse
import math
import random
import pandas as pd

class Normalize(object):
    def __init__(self, input_csv, frame_interval):
        self.input_csv = input_csv
        self.interval = frame_interval
        self.dict = {}
        self.max = 0
        self.output = []

    def handle_rows(self, row):
        self.dict[int(row[0])] = {'r': row[1], 'theta': row[2]}
    
    def read_input(self):
        self.raw_input = pd.read_csv(self.input_csv, header=None)
        self.raw_input.apply(lambda x: self.handle_rows(x), axis=1)
        self.max = int(self.raw_input[0].max())

    def fill_dict(self):
        for index in range(0, self.max+1):
            if index not in self.dict:
                self.dict[index] = {'r': -1, 'theta': -1}

    def cal_miss_rate(self):
        self.miss = 0
        self.total = math.ceil(self.max+1 / self.interval)

        for base in range(0, self.max+1, self.interval):
            isMiss = True
            shuffle_box = []
            for shift in range(self.interval):
                if base+shift > self.max: break

                if self.dict[base+shift]['r'] != -1:
                    isMiss = False
                    shuffle_box.append(base+shift)

            if isMiss:
                self.miss += 1
            else:
                picked = random.choice(shuffle_box)
                #print(picked)
                self.output.append('{},{},{}'.format(picked, self.dict[picked]['r'], self.dict[picked]['theta']))

        self.miss_rate = self.miss / self.total * 100

    def save_file(self, filename):
        with open(filename, "w+") as f:
            f.write('\n'.join(self.output))

    def log(self, filename):
        with open(filename, "a+") as f:
            f.write('{} ; interval = {} ; miss rate: {}%\n'.format(self.input_csv, self.interval, self.miss_rate))

def main():
    o = Normalize(args.input, args.frame_interval)
    o.read_input()
    o.fill_dict()
    o.cal_miss_rate()
    print("It will save into {}".format(SAVED_CSV))
    o.save_file(SAVED_CSV)
    print("It will log into {}".format(LOG))
    o.log(LOG)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="sample the frames, and the output file will be output.csv in the same folder as executing \nthere are extra info saved in the process.log in the format of 'input.csv ; interval=x ; miss rate=y%'", formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument("input", type=str, metavar="input.csv", help="after all calculation. \nThe format is: (frame, r, theta) \ne.g. 33,2.0097303023068487,207.91758399482106")
    parser.add_argument("frame_interval", type=int, metavar="frame_interval", help="The number of a group of frames")
    args = parser.parse_args()

    SAVED_CSV = 'output.csv'
    LOG='process.log'
    main()
