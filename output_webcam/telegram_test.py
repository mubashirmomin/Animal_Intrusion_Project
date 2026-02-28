import requests

BOT_TOKEN = "8221213410:AAE0cH_M21S7TR5X4WEETtkMrvWeGdAUpQY"
CHAT_ID = "93372553"

url = f"http://api.telegram.org/bot{BOT_TOKEN}/sendMessage"


data = {
    "chat_id": CHAT_ID,
    "text": "✅ Telegram is working!"
}

response = requests.post(url, data=data)
print(response.text)
