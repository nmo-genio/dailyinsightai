# src/dailyinsightai/journaling.py
"""
journaling.py

Handles the main journaling logic for the DailyInsightAI app.
Manages user interaction, generates insights, saves entries to MongoDB, and prints debug info conditionally.
"""
# from src.dailyinsightai.ai_integration import generate_insight
# from src.dailyinsightai.db import init_db, insert_entry, get_all_entries

import os
from .ai_integration import generate_insight
from .db import init_db, insert_entry, get_all_entries

DEBUG = os.getenv("DEBUG", "false").lower() == "true"


def run_app():
    """
    Launch the journaling CLI application.

    Prompts the user for a journal entry, sends it to the AI for insight,
    stores the result in MongoDB, and optionally displays all entries if DEBUG is enabled.
    """
    print("Welcome to DailyInsightAI Journaling App!")
    entry = input("Write your journal entry: ")

    # Generate insight using AI integration
    insight = generate_insight(entry)
    print("AI Insight:", insight)  # Always show this

    # Insert journal entry and display all entries in MongoDB
    db = init_db()
    insert_result = insert_entry(db, entry, insight)
    if DEBUG:
        print(f"Your entry was saved with id: {insert_result.inserted_id}")
        print("Your entry was saved. Here are all journal entries:")
        entries = get_all_entries(db)
        for entry_doc in entries:
            print(entry_doc)
