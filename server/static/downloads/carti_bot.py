import os
import random
import discord
import sys
sys.path.insert(1, '/var/www/app')
from app import db, cartivoiceDB
from dotenv import load_dotenv

def convert(lst):
    return (lst.split())

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client()

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if '!carti' in message.content.lower():
        lst = message.content
        cartiText = ''
        for i in convert(lst):
            if random.randint(1,3) == random.randint(1,3):
                i += ' ' + cartivoiceDB.query.all()[random.randint(0,15)].cartifiller
            cartiText += i + ' '
        await message.edit(content=cartiText)
        
#cant edit another user's msg ugh
client.run(TOKEN)
