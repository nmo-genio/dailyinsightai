# src/dailyinsightai/db.py
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

#Load environment variables from .env file
load_dotenv()

def init_db(uri: str = None, db_name: str = "dailyinsightai"):
    """
    Initialize and return a MongoDB database connection.
    """
    # Use the provided URI or fallback to the environment variable
    if uri is None:
        uri = os.getenv("MONGODB_URI")
        if not uri:
            raise ValueError("MONGODB_URI environment variable is not set.")
        
    try:
        client = MongoClient(uri)
        client.admin.command('ismaster') #Check connection
    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        raise e
    
    db = client[db_name]
    return db

def insert_entry(db, entry: str, insight: str):
   """
    Insert a new journal entry into the 'journal' collection.
   """
   collection = db.journal
   document = {
       "entry": entry,
       "insight": insight,
       "created_at":__import__("datetime").datetime.utcnow()
   }
   result = collection.insert_one(document)
   return result

def get_all_entries(db):
    """
    Retrieve all journal entries from the 'journal' collection.
    """
    collection = db.journal
    entries = list(collection.find({}, {"_id": 0}))
    return entries