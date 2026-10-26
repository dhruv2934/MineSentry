from langchain_chroma import Chroma

from app.rag.embeddings import embeddings


VECTOR_DB_PATH = "./chroma_db"


vector_store = Chroma(
    collection_name="mine_regulations",
    embedding_function=embeddings,
    persist_directory=VECTOR_DB_PATH
)