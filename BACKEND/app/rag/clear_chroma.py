from app.rag.vector_store import vector_store


collection = vector_store._collection

print("Documents before clearing:", collection.count())

ids = collection.get()["ids"]

if ids:
    collection.delete(ids=ids)

print("Documents after clearing:", collection.count())