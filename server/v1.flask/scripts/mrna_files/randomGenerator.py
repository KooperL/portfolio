import random
from scripts.mrna_files.data import aminoAcids as amino_acid_dictionary
from scripts.mrna_files.data import dna
from scripts.mrna_files.data import rna


def randomDNA(length: int) -> str:
  randomString = ''
  validChars = [x.get('symbol').upper() for x in dna()]
  for _ in range(0, int(length)):
    randomString = randomString + random.choice(validChars)
  return randomString

def randomRNA(length: int) -> str:
  randomString = ''
  validChars = [x.get('symbol').upper() for x in rna()]
  for _ in range(0, int(length)):
    randomString = randomString + random.choice(validChars)
  return randomString

def randomProteins(length: int, single: bool) -> str:
  randomString = ''
  validChars = None
  if single == 1:
    validChars = [x.get('symbol').upper() for x in amino_acid_dictionary()]
    for _ in range(0, int(length)):
      randomString = randomString + random.choice(validChars)
    return randomString
  elif single == 0:
    validChars = [x.three_letter_sybmol for x in amino_acid_dictionary()]
    for _ in range(0, int(length)):
      randomString = randomString + f'{random.choice(validChars)},'
    randomString = randomString[:-1]
    return randomString
  else:
    raise RuntimeError('Invalid value(s) provided')
