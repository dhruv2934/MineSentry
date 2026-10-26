from app.rag.retriever import retrieve_regulations


def search_regulations(query: str, k: int = 4):
    documents = retrieve_regulations(query, k=k)

    results = []

    for document in documents:
        metadata = document.metadata

        results.append({
            "regulation_number": metadata.get("regulation_number"),
            "section": metadata.get("section"),
            "content": document.page_content,
            "page_number": metadata.get("page_number"),
            "document_name": metadata.get("document_name"),
            "source": metadata.get("source"),
            "version": metadata.get("version"),
        })

    return results