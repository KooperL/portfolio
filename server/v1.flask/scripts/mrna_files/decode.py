import scripts.mrna_files.data


dna_dictionary = scripts.mrna_files.data.dna()
rna_dictionary = scripts.mrna_files.data.rna()
amino_acid_dictionary = scripts.mrna_files.data.aminoAcids()


def simple_count(dna: str) -> dict:
  count = {
    'g': dna.count('g'),
    'c': dna.count('c'),
    'a': dna.count('a'),
    't': dna.count('t')
  }
  return count

def gc_content(dna: str) -> float:
  return (dna.count("g") + dna.count("c")) / len(dna)


def reverse_complement(dna: str) -> str:
  # return "".join(dna_dictionary.complimentary_nucleotide.value for i in dna[::-1] if dna == dna_dictionary)
  print('base')
  chain = []
  for base in dna:
    for potMatch in dna_dictionary:
      if base == potMatch['symbol']:
        chain.append(potMatch['complimentary_nucleotide']['value'])
  return "".join(chain[::-1])

def mrna_complement(dna: str) -> str:
  # return "".join(dna_dictionary.mrna_complement_key[i] for i in dna[::])
  chain = []
  for base in dna:
    for potMatch in rna_dictionary: 
      if base == potMatch['symbol']:
        chain.append(potMatch['complimentary_nucleotide']['value'])
  return "".join(chain)


def amino_acids(dna: str) -> list:
  chain = {
    'single': [],
    'partial': []
  }
  for index, base in enumerate(dna):
    if (index + 1) % 3 == 0:
      # Amino acids are composed of three nucleotides
      key = dna[index-2]+dna[index-1]+dna[index]
      for aminoAcid in amino_acid_dictionary:
        if key in aminoAcid['nucleotides']:
          chain['single'].append(aminoAcid['symbol'])
          chain['partial'].append(aminoAcid['three_letter_symbol'])
  return chain


# def hamming(lhs, rhs):
#   return len([(x,y) for x,y in zip(lhs, rhs) if x != y])


def mol_weight(dna: str) -> float:
  weight = 0
  for base in dna:
    for potMatch in dna_dictionary:
      if base == potMatch['symbol']:
        weight += potMatch['molecular_mass']['value']
  return weight