#!/usr/bin/env python3
import os
import sys
import argparse
import re
import numpy as np

class Person(object):
    def __init__(self, folder, distance, number):
        self.folder = folder
        self.distance = distance
        self.number = number
        self.data = {}
        self.data["process"] = []
        self.data["hit"] = []
        self.data["miss"] = []
        self.data["fp"] = []
        
    def process(self):
        for d in self.distance:
            for i in range(self.number):
                filename = '{}/{}-{}'.format(self.folder, d, i+1)
                p, h, m, f = self.cal(filename)
                self.data["process"].append(p)
                self.data["hit"].append(h)
                self.data["miss"].append(m)
                self.data["fp"].append(f)

    def cal(self, filename):
        with open(filename, "r") as f:
            round = f.read()
    
        sets = round.strip().split("\n\n")
        #assert(len(sets) == SET_NUM)
    
        NOT_PROCESS = 0.0
        HIT = 0.0
        MISS = 0.0
        FP = 0.0
    
        for set in sets:
            sentences = set.strip().split('\n')[1:]
            new_sentences = []
            for sentence in sentences:
                s = re.sub(r".* fade out(.*)", r"#", sentence)
                s = re.sub(r".*Distract(.*)", r"d", s)
                s = re.sub(r".*yes(.*)", r"1", s)
                s = re.sub(r".*no(.*)", r"1", s)
                new_sentences.append(s)
            new_set = '\n'.join(new_sentences)
    
            #assert(len(new_set.split('#')[:-1]) == SENTENCE_NUM)
            for block in new_set.split('#')[:-1]:
                #print("{!r}".format(block.strip()))
                block = block.strip()
                if "1" not in block:
                    NOT_PROCESS += 1
                    if "d" in block:
                        FP += 1
                if "1" in block and "d" in block:
                    HIT += 1
                if "1" in block and "d" not in block:
                    MISS += 1
            if "d" in new_set.split('#')[-1].strip():
                FP += 1
    
        #print(NOT_PROCESS)
        #print(HIT)
        #print(MISS)
        #print(FP)
        return (1 - NOT_PROCESS / TOTAL, HIT / TOTAL, MISS / TOTAL,FP / TOTAL)

def main():
    distance = ['61', '99']
    number = 12
    persons = []
    for folder_i in range(number):
        folder = "ex{}".format(folder_i+1)
        p = Person(folder, distance, number)
        p.process()
        persons.append(p)

    process, hit, miss, fp = [], [], [], []
    for p in persons:
        process.append(p.data["process"])
        hit.append(p.data["hit"])
        miss.append(p.data["miss"])
        fp.append(p.data["fp"])

    np.savetxt("process.csv", np.array(process), delimiter=",", fmt="%.3f")
    np.savetxt("hit.csv", np.array(hit), delimiter=",", fmt="%.3f")
    np.savetxt("miss.csv", np.array(miss), delimiter=",", fmt="%.3f")
    np.savetxt("fp.csv", np.array(fp), delimiter=",", fmt="%.3f")
        


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="calculate 4 kinds of rate on log of receiver and observer and output csv\n 1: process rate\n 2: hit rate\n 3: miss rate\n 4: false positive rate(FP rate)", formatter_class=argparse.RawTextHelpFormatter)
    args = parser.parse_args()

    SET_NUM = 3
    SENTENCE_NUM = 7
    TOTAL = SET_NUM * SENTENCE_NUM

    main()
