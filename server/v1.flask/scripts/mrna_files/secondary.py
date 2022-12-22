import numpy as np
import scripts.mrna_files.data



amino_acid_dictionary = scripts.mrna_files.data.aminoAcids()


# https://www.slideshare.net/RoshanKarunarathna1/chou-fasman-algorithm-for-protein-structure
# http://biosiva.50webs.org/prot7.gif
# https://en.wikipedia.org/wiki/Chou%E2%80%93Fasman_method

def secondary_predict(aa_list='llllllllll'):
  aa_list = np.array([c for c in aa_list]) 
  memo = {
    'alpha-helix': {},
    'beta-strand': {}
  }
  def findNucleationRegion(arr, threshold, sliding_window, contiguous_window):
    # slices = []
    nucleationRegions = []

    # Initialize the start and end indices of the slice
    start = 0
    end = sliding_window
    
    # Use a while loop to iterate over the array and get the slice from the current position to the current position + sliding_window
    while end <= len(arr):
      slice = arr[start:sliding_window]
      # slices.append(slice)

      # Count the number of elements in the slice that exceed contiguous_window
      # count = len([x for x in slice if x > threshold])
      # nucleationRegions.append(count >= contiguous_window)

      nucleationRegions.append(np.sum(slice))

      start += 1
      end += 1
    
    return nucleationRegions

  def populatePropensitiesFromSymbol(symbol, key):
    if symbol in memo[key]:
      return memo[key][symbol]
    else:
      for i in amino_acid_dictionary:
        if i['symbol'] == symbol:
          memo[key][symbol] = i['propensities'][key]
          return i['propensities'][key]


  alpha_helix_threshold = 1.03
  alpha_helix_sliding_window = 6
  alpha_helix_contiguous_window = 4
  beta_sheet_threshold = 1
  beta_sheet_sliding_window = 5
  beta_sheet_contiguous_window = 3

  hPropensities = findNucleationRegion([populatePropensitiesFromSymbol(x, 'alpha-helix') for x in aa_list], alpha_helix_threshold, alpha_helix_sliding_window, alpha_helix_contiguous_window)
  ePropensities = findNucleationRegion([populatePropensitiesFromSymbol(x, 'beta-strand') for x in aa_list], beta_sheet_threshold, beta_sheet_sliding_window, beta_sheet_contiguous_window)
  result = []
  isStalemated = []
  for ind in range(len(hPropensities)):
    if hPropensities[ind] and not ePropensities[ind]:
      result.append('h')
      if len(isStalemated):
        for i in isStalemated:
          result[i] = 'h'
        isStalemated = []
    elif ePropensities[ind] and not hPropensities[ind]:
      result.append('e')
      if len(isStalemated):
        for i in isStalemated:
          result[i] = 'e'
        isStalemated = []
    elif not ePropensities[ind] and not hPropensities[ind]:
      result.append('c')
    else:
      result.append('_')
      isStalemated.append(ind)


  return "".join(result)


if __name__ == '__main__':
  print(secondary_predict('vkklfhwlekhmrttalynsynamrscqnimrayrkhhiqvgeathakyksdpnfgmarasqcykgeytmwpwvdrhmpehakwrtqvknilyashpywr'))