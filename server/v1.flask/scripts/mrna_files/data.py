import json

def aminoAcids():
  aminoAcids = None
  with open('../data/aminoAcids.json', 'r') as openfile:
      aminoAcids = json.load(openfile)
  return aminoAcids

def dna():
  dna_dictionary = None
  with open('../data/dna.json', 'r') as openfile:
      dna_dictionary = json.load(openfile)
  return dna_dictionary

def rna():
  rna = None
  with open('../data/rna.json', 'r') as openfile:
      rna = json.load(openfile)
  return rna
