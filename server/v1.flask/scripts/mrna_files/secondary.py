import math
import numpy as np
import re
import scripts.mrna_files.codon_dictionary as codon_dictionary

helix_propensity = {
'ala':1.42,
'cys':0.7,
'asp':1.01,
'glu':1.51,
'phe':1.13,
'gly':0.57,
'his':1,
'ile':1.08,
'lys':1.16,
'leu':1.21,
'met':1.45,
'asn':0.67,
'pro':0.57,
'gln':1.11,
'arg':0.98,
'ser':0.77,
'thr':0.83,
'val':1.06,
'trp':1.08,
'tyr':0.69,
'sto':0
}

sheet_propensity = {
'ala':0.83,
'cys':1.19,
'asp':0.54,
'glu':0.37,
'phe':1.38,
'gly':0.75,
'his':0.87,
'ile':1.6,
'lys':0.74,
'leu':1.3,
'met':1.05,
'asn':0.89,
'pro':0.55,
'gln':1.1,
'arg':0.93,
'ser':0.75,
'thr':1.19,
'val':1.7,
'trp':1.37,
'tyr':1.47,
'sto':0
}


def secondary_predict(aa_list='llllllllll', aainput='s', threshold=4, avg=3):
  threshold = int(threshold)
  avg = int(avg)
  helixp = np.array([])
  sheetp = np.array([]) 
  if aainput == 's':
    if isinstance(aa_list, str):
      aa_list = re.findall(r'[a-z|A-Z]{1}', aa_list)
    for aa in aa_list:
      helixp = np.append(helixp, helix_propensity[codon_dictionary.proteins_single_to_partial[aa]])
      sheetp = np.append(sheetp, sheet_propensity[codon_dictionary.proteins_single_to_partial[aa]])
  elif aainput == 't':
    if isinstance(aa_list, str):
      aa_list = re.findall(r'[a-z|A-Z]{3}', aa_list)
    for aa in aa_list:
      helixp = np.append(helixp, helix_propensity[aa])
      sheetp = np.append(sheetp, sheet_propensity[aa])
  helixmeans = np.array([])
  for p, i in enumerate(helixp):
    while p <= avg:
      helixmeans = np.append(helixmeans, (np.mean(helixp[p: p+avg])))
      if p > avg:
        break
      else:
        p += 1  
    helixmeans = np.append(helixmeans, np.mean(helixp[p-avg:p+avg]))
#print(helixmeans)
  # sheetp = np.array([]) 
  # if aainput == 's':
  #   for aa in aa_list:
  #     sheetp = np.append(sheetp, sheet_propensity[proteins_single_to_partial[aa]])
  # elif aainput == 't':
  #   for aa in aa_list:
  #     sheetp = np.append(sheetp, sheet_propensity[aa])
  sheetmeans = np.array([])
  for p, i in enumerate(helixp):
    while p <= avg:
      sheetmeans = np.append(sheetmeans, (np.mean(sheetp[p: p+3])))
      if p > avg:
        break
      else:
        p += 1  
    sheetmeans = np.append(sheetmeans, np.mean(sheetp[p-avg:p+avg]))
  ahl = np.array([])   
  bsl = np.array([])   
  string = ''
  for i in range(len(helixmeans)):
    if np.sum(helixmeans[i:i+threshold]) >= threshold:
      string += 'unu'
      ahl = np.append(ahl, i)
    elif np.sum(sheetmeans[i:i+threshold]) >= threshold:
      string += '/-\\'
      bsl = np.append(bsl, i)
    else:
      string += '---'
  return [helixp.tolist(), helixmeans.tolist(), sheetp.tolist(), sheetmeans.tolist(), string, ahl.tolist(), bsl.tolist()]


if __name__ == '__main__':
  secondary_predict(codon_dictionary.example, 4)
