"""
main.py

Entry point for the DailyInsightAI application.
Launches the journaling CLI using the `run_app` function.
"""

# src/dailyinsightai/main.py

from .journaling import run_app


def main():
    """
    Print a welcome message and start the journaling application.

    This function serves as the CLI trigger that initializes the DailyInsightAI workflow.
    """
    print("Starting DailyInsightAI Journaling App...")
    run_app()


if __name__ == "__main__":
    main()
