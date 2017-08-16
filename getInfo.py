#!/usr/bin/env python
import os
import sys
import pandas as pd
from methods import denormalize

class getInfo():
    def __init__(self):
        self.ret = []

    def read_file(self, csv_file):
        self.raw_csv = pd.read_csv(csv_file, usecols=["index", "confidence", "norm_pos_x", "norm_pos_y"])

    def save_new_format(self, row, shape, flip):
        pos = [row['norm_pos_x'], row['norm_pos_y']]
        x, y = denormalize(pos, shape, flip_y=flip)
        #y = denormalize(row['norm_pos_y'], shape, flip_y=flip)
        #x = row['norm_pos_x']
        #y = row['norm_pos_y']
        self.ret.append((int(row['index']), row['confidence'], x, y))
        return True

    def processing(self, shape, flip, confidence_threshold=0.95):
        self.csv = self.raw_csv[self.raw_csv['confidence'] > confidence_threshold]
        self.csv.apply(lambda x: self.save_new_format(x, shape, False), axis=1)
