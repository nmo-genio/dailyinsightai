# src/db.py
from pymongo import MongoClient

def init_db(uri="mongodb://localhost:27017/", db_name="dailyinsightai"):
    client = MongoClient(uri)
    db = client[db_name]
    return db

def insert_entry(db, entry: str, insight: str):
    # Assuming you have a collection named 'journal'
    db.journal.insert_one({
        "entry": entry,
        "insight": insight
    })

def get_all_entries(db):
    # Retrieve all journal entries
    return list(db.journal.find({}, {"_id": 0}))
