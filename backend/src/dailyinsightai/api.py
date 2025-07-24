from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from datetime import datetime

from .journaling import JournalEntry
from .ai_integration import OpenAIClient
from .db import MongoDB

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JournalEntryRequest(BaseModel):
    content: str
    tags: Optional[list[str]] = []

class InsightRequest(BaseModel):
    entry_id: str

db = MongoDB()
ai_client = OpenAIClient()

@app.post("/api/journal/entry")
async def create_journal_entry(entry: JournalEntryRequest):
    try:
        journal_entry = JournalEntry(
            content=entry.content,
            tags=entry.tags,
            date=datetime.now()
        )
        entry_id = db.save_entry(journal_entry)
        return {"success": True, "entry_id": str(entry_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/journal/insight")
async def get_insight(request: InsightRequest):
    try:
        entry = db.get_entry(request.entry_id)
        if not entry:
            raise HTTPException(status_code=404, detail="Entry not found")
        
        insight = ai_client.generate_insight(entry['content'])
        
        db.update_entry_insight(request.entry_id, insight)
        
        return {"success": True, "insight": insight}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/journal/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        
        return {
            "success": True, 
            "filename": file.filename,
            "size": len(contents)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/journal/entries")
async def get_entries():
    try:
        entries = db.get_all_entries()
        return {"success": True, "entries": entries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))