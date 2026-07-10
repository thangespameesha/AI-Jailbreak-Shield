from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

load_dotenv()

client = InferenceClient(
    api_key=os.getenv("HF_TOKEN"),
)

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {"role": "user", "content": "Hello!"}
    ],
    max_tokens=50,
)

print(response)
print("------")
print(response.choices)
print("------")

if response.choices:
    print(repr(response.choices[0].message.content))
else:
    print("No choices returned")