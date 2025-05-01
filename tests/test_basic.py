"""
test_basic.py

Contains a basic test case to validate AI integration by checking that `generate_insight` returns non-empty output.
"""
from unittest.mock import patch
from dailyinsightai.ai_integration import generate_insight

@patch("dailyinsightai.ai_integration.openai.ChatCompletion.create")
def test_generate_insight_returns_text(mock_openai):
    mock_openai.return_value = {
        "choices": [{"message": {"content": "Mocked insight"}}]
    }

    result = generate_insight("This is a test.")
    assert "Mocked insight" in result