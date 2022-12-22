import json

def aminoAcids():
  aminoAcids = None
  with open('scripts/mrna_files/aminoAcids.json', 'r') as openfile:
      # Reading from json file
      aminoAcids = json.load(openfile)
  return aminoAcids

def dna():
  dna_dictionary = None
  with open('scripts/mrna_files/dna.json', 'r') as openfile:
      # Reading from json file
      dna_dictionary = json.load(openfile)
  return dna_dictionary

def rna():
  rna = None
  with open('scripts/mrna_files/rna.json', 'r') as openfile:
      # Reading from json file
      rna = json.load(openfile)
  return rna
