"""
ai_integration.py

Handles communication with the OpenAI API.
Defines the `generate_insight` function which takes user input and returns a generated insight using the Chat API.
"""

try:
    import openai
except ModuleNotFoundError:  # pragma: no cover - openai may not be installed in CI
    from types import SimpleNamespace

    class DummyClient:
        """Fallback OpenAI client used when openai package is unavailable."""

        def __init__(self, *_, **__):
            pass

        class chat:
            class completions:
                @staticmethod
                def create(*_, **__):
                    raise RuntimeError("OpenAI package not installed")

    class OpenAIError(Exception):
        """Raised when OpenAI operations fail with no library installed."""

    openai = SimpleNamespace(OpenAI=DummyClient, OpenAIError=OpenAIError)
import os
try:
    from dotenv import load_dotenv
except ModuleNotFoundError:  # pragma: no cover - python-dotenv optional in CI
    def load_dotenv(*_, **__):
        return False

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
