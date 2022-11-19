from Bio import pairwise2

def pairwise_align(arg1=['aaa'], arg2=['aaa'], imatch=1, mmatch=0, ogap=-0.5, egap=-0.1):
    if isinstance(arg1, str):
        arg1 = ''.join(list(arg1))
    if isinstance(arg2, str):
        arg2 = ''.join(list(arg2))
    imatch = float(imatch)
    mmatch = float(mmatch)
    ogap = float(ogap)
    egap = float(egap)
    results = pairwise2.align.globalms(arg1, arg2, imatch, mmatch, ogap, egap) 
    return results

def drawseqalign(arg):
    lst = []
    for i in arg:
        lst.append(pairwise2.format_alignment(*i))
    return lst


if __name__ == '__main__':
    a = 'aaaaaaaaa'
    b = 'aatttaaaa'
    print(pairwise_align(a,b,1,0,-.5,-.1))
