"""
db.py

Provides database utility functions for MongoDB.
Includes functions to insert and retrieve journal entries.
"""

# src/dailyinsightai/db.py
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
DEBUG = os.getenv("DEBUG", "false").lower() == "true"


def init_db(uri: str = None, db_name: str = "dailyinsightai"):
    """
    Initialize and return a MongoDB database connection.

    Args:
        uri (str, optional): The MongoDB connection URI. If not provided, the function uses the MONGODB_URI environment variable.
        db_name (str): The name of the database to connect to.

    Returns:
        Database: A reference to the connected MongoDB database.

    Raises:
        ValueError: If no URI is provided and the MONGODB_URI environment variable is not set.
        ConnectionFailure: If the connection to MongoDB cannot be established.
    """
    # Use the provided URI or fallback to the environment variable
    if uri is None:
        uri = os.getenv("MONGODB_URI")
        if not uri:
            raise ValueError("MONGODB_URI environment variable is not set.")

    try:
        client = MongoClient(uri)
        client.admin.command("ismaster")  # Check connection
    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        raise e

    db = client[db_name]
    return db


def insert_entry(db, entry: str, insight: str):
    """
    Insert a new journal entry into the 'journal' collection.

    Args:
        db (Database): A MongoDB database instance.
        entry (str): The journal entry text.
        insight (str): The AI-generated insight related to the entry.

    Returns:
        InsertOneResult: The result of the insert operation.
    """
    collection = db.journal
    document = {
        "entry": entry,
        "insight": insight,
        "created_at": __import__("datetime").datetime.utcnow(),
    }
    result = collection.insert_one(document)

    if DEBUG:
        print(f"Inserted entry: {entry}")
        print(f"Insight: {insight}")

    return result


def get_all_entries(db):
    """
    Retrieve all journal entries from the 'journal' collection.

    Args:
        db (Database): A MongoDB database instance.

    Returns:
        list: A list of journal entries without the MongoDB document ID.
    """
    collection = db.journal
    entries = list(collection.find({}, {"_id": 0}))

    if DEBUG:
        print("Retrieved entries:")
        for entry in entries:
            print(entry)

    return entries
