# src/journaling.py
from ai_integration import generate_insight
from db import init_db, insert_entry, get_all_entries

def run_app():
    print("Welcome to DailyInsightAI Journaling App!")
    entry = input("Write your journal entry: ")
    
    # Generate insight using AI integration
    insight = generate_insight(entry)
    print("AI Insight:", insight)
    
    # Insert entry into MongoDB
    db = init_db()
    insert_entry(db, entry, insight)
    
    print("Your entry was saved. Here are all entries:")
    entries = get_all_entries(db)
    for e in entries:
        print(e)
