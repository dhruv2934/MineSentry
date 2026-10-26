from app.rag.vector_store import vector_store


def retrieve_regulations(
    query: str,
    k: int = 4
):
    return vector_store.similarity_search(
        query,
        k=k
    )