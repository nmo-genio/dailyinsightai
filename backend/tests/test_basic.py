"""
test_basic.py

Contains a basic test case to validate AI integration by checking that `generate_insight` returns non-empty output.
"""
from unittest.mock import patch, MagicMock
import os

@patch.dict(os.environ, {"OPENAI_API_KEY": "test_key"})
@patch("dailyinsightai.ai_integration.openai.OpenAI")
def test_generate_insight_returns_text(mock_openai_class):
    from dailyinsightai.ai_integration import generate_insight

    # Create a mock message object
    mock_message = MagicMock()
    mock_message.content = "Mocked insight"

    # Create a mock choice that contains the mock message
    mock_choice = MagicMock()
    mock_choice.message = mock_message

    # Create a mock response with choices list
    mock_response = MagicMock()
    mock_response.choices = [mock_choice]

    # Set up the nested client.chat.completions.create() call
    mock_create = MagicMock(return_value=mock_response)
    mock_completions = MagicMock(create=mock_create)
    mock_chat = MagicMock(completions=mock_completions)
    mock_client = MagicMock(chat=mock_chat)

    mock_openai_class.return_value = mock_client

    result = generate_insight("This is a test.")
    assert "Mocked insight" in result

@patch.dict(os.environ, {"OPENAI_API_KEY": "test_key"})
@patch("dailyinsightai.ai_integration.openai.OpenAI")
def test_generate_insight_handles_openai_error(mock_openai_class):
    from dailyinsightai.ai_integration import generate_insight, openai
    OpenAIError = getattr(openai, "OpenAIError", Exception)

    # Simulate OpenAI client raising an error
    mock_client = MagicMock()
    mock_client.chat.completions.create.side_effect = OpenAIError("Simulated API failure")
    mock_openai_class.return_value = mock_client

    result = generate_insight("This will fail.")
    assert "Sorry, there was an error" in result