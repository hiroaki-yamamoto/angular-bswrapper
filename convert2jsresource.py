#!/usr/bin/python
# -*- coding: utf-8 -*-
from htmlmin import minify
import sys

def main():
    if len(sys.argv)<2:
        raise ValueError("Input File Path")
    
    input_str=str()
    with open(sys.argv[1]) as fin:
        input_str=fin.read()
    
    minified_str=("\"{0}\"").format(minify(input_str,remove_optional_attribute_quotes=False)\
        .replace("\n","\\n\"").replace("\"","\\\""))
    print(minified_str)
    

if __name__=='__main__': main()
