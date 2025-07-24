"""
ai_integration.py

Handles communication with the OpenAI API.
Defines the `generate_insight` function which takes user input and returns a generated insight using the Chat API.
"""

import openai
import os
from dotenv import load_dotenv

load_dotenv()

# src/dailyinsightai/ai_integration.py
def generate_insight(text: str) -> str:
    """
    Generate an insight from user-provided journal text using OpenAI's Chat API.

    Args:
        text (str): The user's journal entry text.

    Returns:
        str: The AI-generated insight based on the user's input.

    Raises:
        openai.OpenAIError: If there's an error communicating with the OpenAI API.
    """
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant generating insights.",
                },
                {"role": "user", "content": text},
            ],
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()
    except openai.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        return "Sorry, there was an error generating the insight."


class OpenAIClient:
    """OpenAI client wrapper for the API"""
    
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def generate_insight(self, text: str) -> str:
        """Generate insight using the existing function"""
        return generate_insight(text)
