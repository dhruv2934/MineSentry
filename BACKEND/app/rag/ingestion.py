from sqlalchemy.orm import Session

from app.models.regulation_chunk import RegulationChunk
from app.models.regulation import Regulation
from app.rag.vector_store import vector_store
from app.core.database import SessionLocal


def ingest_regulation_chunks(db: Session):

    chunks = (
        db.query(RegulationChunk)
        .join(
            Regulation,
            RegulationChunk.regulation_id == Regulation.id
        )
        .all()
    )

    if not chunks:
        return 0

    texts = []
    metadatas = []
    ids = []

    for chunk in chunks:

        regulation_number = int(
            chunk.section.replace("Regulation ", "")
        )   

        texts.append(chunk.content)

        metadatas.append({
            "regulation_id": chunk.regulation_id,
            "document_name": chunk.regulation.document_name,
            "document_type": chunk.regulation.document_type,
            "regulation_number": regulation_number,
            "source": chunk.regulation.source,
            "version": chunk.regulation.version,
            "section": chunk.section,
            "clause": chunk.clause,
            "page_number": chunk.page_number
        })

        ids.append(
            f"regulation_chunk_{chunk.id}"
        )

    vector_store.delete(
        ids=ids
    )

    vector_store.add_texts(
        texts=texts,
        metadatas=metadatas,
        ids=ids
    )

    return len(chunks)






if __name__ == "__main__":
    db = SessionLocal()

    try:
        count = ingest_regulation_chunks(db)
        print(
            f"Successfully ingested {count} "
            f"regulation chunks into ChromaDB."
        )
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()