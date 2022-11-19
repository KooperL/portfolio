import scripts.mrna_files.codon_dictionary as codon_dictionary

def simple_count(self):
  count = []
  count.append(self.count('g'))
  count.append(self.count('c'))
  count.append(self.count('a'))
  count.append(self.count('t'))
  return count

def gc_content(self):
  return (self.count("g") + self.count("c")) / len(self)


def reverse_complement(self):
  return "".join(codon_dictionary.complement_key[i] for i in self[::-1])


def mrna_complement(self):
  try:
    return "".join(codon_dictionary.mrna_complement_key[i] for i in self[::])
  except KeyError:
    return 'Invalid base'

def amino_acids(self):
  string = []
  for index, base in enumerate(self):
    if (index+1)%3==0:
      string.append(codon_dictionary.mrna_encoding_partial_key[self[index-2]+self[index-1]+self[index]])
  return string


def hamming(lhs, rhs):
  return len([(x,y) for x,y in zip(lhs, rhs) if x != y])


def mol_weight(self):
  weight = 0
  for i in self:
    if i in codon_dictionary.amino_acid_mw:
      weight += codon_dictionary.amino_acid_mw[i]
  return weight
    
def aa_single_from_partial(self):
  return ("".join(codon_dictionary.protein_partial_to_single[i] for i in self)).upper()



if __name__ == "__main__":
  with open('Homo sapiens InhA mRNA.txt', 'r') as file:
    next(file)
    dna = file.read()
    dna = dna.replace('\n', '').lower()

#print(dna, "\n\n")
#proteins(dna)

