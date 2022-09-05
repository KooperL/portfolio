import random
import scripts.mrna_files.codon_dictionary as codon_dictionary

def randomDNA(length: int) -> str:
  randomString = ''
  validChars = ['A', 'T', 'G', 'C']
  for _ in range(0, int(length)):
    randomString = randomString + random.choice(validChars)
  return randomString

def randomRNA(length: int) -> str:
  randomString = ''
  validChars = ['A', 'U', 'G', 'C']
  for _ in range(0, int(length)):
    randomString = randomString + random.choice(validChars)
  return randomString

def randomProteins(length: int, single: bool) -> str:
  randomString = ''
  validChars = None
  codonDict = dict(codon_dictionary.proteins_single_to_partial)
  del codonDict['_']
  del codonDict['*']
  if single == 1:
    validChars = list(codonDict.keys())
    for _ in range(0, int(length)):
      randomString = randomString + random.choice(validChars)
    return randomString
  elif single == 0:
    validChars = list(codonDict.values())
    for _ in range(0, int(length)):
      randomString = randomString + f'{random.choice(validChars)},'
    randomString = randomString[:-1]
    return randomString
  else:
    raise RuntimeError('Invalid value(s) provided')