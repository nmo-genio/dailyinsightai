# src/dailyinsightai/journaling.py
# from src.dailyinsightai.ai_integration import generate_insight
# from src.dailyinsightai.db import init_db, insert_entry, get_all_entries

from .ai_integration import generate_insight
from .db import init_db, insert_entry, get_all_entries

def run_app():
    print("Welcome to DailyInsightAI Journaling App!")
    entry = input("Write your journal entry: ")
    
    # Generate insight using AI integration
    insight = generate_insight(entry)
    print("AI Insight:", insight)
    
    # Insert journal entry and display all entries in MongoDB
    db = init_db()
    insert_result = insert_entry(db, entry, insight)
    print(f"Your entry was saved with id: {insert_result.inserted_id}")
    
    print("Your entry was saved. Here are all journal entries:")
    entries = get_all_entries(db)
    for entry_doc in entries:
        print(entry_doc)
