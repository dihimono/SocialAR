#!/usr/bin/env python3
import os
import sys
import argparse
import pandas as pd
import numpy as np


def main():
    AVG_WIDTH = (15.2 + 14.4) / 2 / 2
    AVG_LENGTH = (23.2 + 21.8) / 2 / 2
    for i in range(17):
        file1 = "test{}-61.csv".format(i)
        file2 = "test{}-99.csv".format(i)
        x1, y1 = [], []
        x2, y2 = [], []
        
        # read files
        if os.path.exists(file1):
            file1 = pd.read_csv(file1, header=None, usecols=[1, 2])
        if os.path.exists(file2):
            file2 = pd.read_csv(file2, header=None, usecols=[1, 2])
        file1 = np.array(file1)
        file2 = np.array(file2)

        # transform
        for r, theta in file1:
            x = r * np.cos(theta / 360 * 2 * np.pi) / AVG_WIDTH
            y = r * np.sin(theta / 360 * 2 * np.pi) / AVG_LENGTH
            x1.append(x)
            y1.append(y)

        for r, theta in file2:
            x = r * np.cos(theta / 360 * 2 * np.pi) / AVG_WIDTH
            y = r * np.sin(theta / 360 * 2 * np.pi) / AVG_LENGTH
            x2.append(x)
            y2.append(y)

        # save csv 
        a1 = np.vstack((x1, y1)).T
        a2 = np.vstack((x2, y2)).T
        np.savetxt("trans{}-61.csv".format(i), a1, delimiter=",", fmt="%.2f")
        np.savetxt("trans{}-99.csv".format(i), a2, delimiter=",", fmt="%.2f")
        

if "__main__" in __name__:
    parser = argparse.ArgumentParser(description="face transform the 61 and 99 data")
    args = parser.parse_args()
    
    main()
