"""
test_basic.py

Contains a basic test case to validate AI integration by checking that `generate_insight` returns non-empty output.
"""
from unittest.mock import patch
import os
from dailyinsightai.ai_integration import generate_insight

@patch.dict(os.environ, {"OPENAI_API_KEY": "test_key"})
@patch("dailyinsightai.ai_integration.ChatCompletion.create")
def test_generate_insight_returns_text(mock_openai):
    mock_openai.return_value = {
        "choices": [{"message": {"content": "Mocked insight"}}]
    }

    result = generate_insight("This is a test.")
    assert "Mocked insight" in result