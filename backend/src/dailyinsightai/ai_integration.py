"""OpenAI integration helpers used to generate insights for user journal text."""

import os

try:  # pragma: no cover - optional dependency for the tests
    import openai
except Exception:  # fall back to the stub bundled in the repo
    import openai  # type: ignore

try:  # pragma: no cover - dotenv might not be installed in CI
    from dotenv import load_dotenv
except Exception:  # pragma: no cover - create a no-op if missing

    def load_dotenv(*_args, **_kwargs):
        """Fallback load_dotenv when python-dotenv is not available."""
        return None


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
