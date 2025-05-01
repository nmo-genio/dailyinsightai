"""
test_basic.py

Contains a basic test case to validate AI integration by checking that `generate_insight` returns non-empty output.
"""

from dailyinsightai.ai_integration import generate_insight


def test_generate_insight_returns_text():
    sample_entry = "Today I felt productive and organized."
    insight = generate_insight(sample_entry)
    assert isinstance(insight, str)
    assert len(insight.strip()) > 0
