from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
from typing import List

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

app = FastAPI()

class TextRequest(BaseModel):
    texts: List[str]


@app.get("/")
def root():
    return{
        "message": "embedding service running"
    }

@app.post("/embed")
def embed(request: TextRequest):
    print(request)
    embeddings = model.encode(request.texts)

    return {
        "embeddings": embeddings.tolist()
    }