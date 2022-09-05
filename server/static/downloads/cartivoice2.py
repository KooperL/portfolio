import random

def convert(lst): 
    return (lst[0].split())

#cartiFiller = [". ","!",":(*","!^","++**","&*","*!",":))","ok ! *+","&^!","**!","<!3","*-^","#love","xo !","*+ _ slatt !","*+ _ slatt !"]
cartiVoice = ""  
lst =  ["Geeks For geeks Geeks For geeks Geeks For geeks"] 

for i in convert(lst):
    if random.randint(1,3) == random.randint(1,3):
        i += ' ' + random.choice(cartiFiller)
    cartiVoice += i + ' '
print (cartiVoice)

