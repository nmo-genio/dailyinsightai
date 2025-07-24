class OpenAIError(Exception):
    """A minimal OpenAI error used for testing."""


class OpenAI:
    """A stubbed OpenAI client for tests. This class does nothing by default."""

    def __init__(self, api_key: str | None = None):
        self.api_key = api_key
        self.chat = type(
            "Chat",
            (),
            {
                "completions": type(
                    "Completions", (), {"create": lambda *a, **k: None}
                )()
            },
        )
