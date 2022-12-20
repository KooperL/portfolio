
'There were issues with this library hogging the process and not letting flask run, multithreading did not help this issue'
"""
import discord
from dotenv import dotenv_values

config = dotenv_values('../.env')
DISCORD_BOT_TOKEN = config['DISCORD_BOT_TOKEN']

# intents = discord.Intents.all()
# intents.messages = True
intents = discord.Intents.default()
discord_client = discord.Client(intents=intents)

def start_discord_client():
  discord_client.run(DISCORD_BOT_TOKEN)

@discord_client.event
async def on_ready():
    print('Discord client is ready!')

async def send_discord_message(channel_id: str, message: str):
  print('Preparing to post message')
  # await discord_client.send_message(discord.Object(id=channel_id), message)
  print('Message should have posted')
"""


"""
To set up a Discord webhook, you will need to perform the following steps:

    Log in to your Discord account and navigate to the server that you want to create the webhook in.
    Click on the server name to open the server menu.
    Click on the "Server Settings" option.
    Click on the "integrations" option.
    Click on the "Create Webhook" button.
    Enter a name for the webhook and select the channel that you want the webhook to post to.
    Click on the "Create" button to create the webhook.
"""
import requests

def send_discord_message(target: str, message: str):
  response = requests.post(target, json={
    'content': message
  })
  if response.status_code != 204:
    return 'There was an error sending the message to Discord.', 500
  return 'Message sent to Discord.'