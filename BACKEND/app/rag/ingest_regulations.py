from datetime import datetime

from app.core.database import SessionLocal
from app.models.regulation import Regulation
from app.models.regulation_chunk import RegulationChunk

from app.rag.pdf_loader import load_english_regulations
from app.rag.pdf_parser import parse_regulations


PDF_PATH = "data/regulations/coal_mines_regulations_2017.pdf"

SOURCE_URL = (
    "https://www.dgms.gov.in/writereaddata/UploadFile/"
    "Coal_Mines_Regulation_2017_Noti.pdf"
)


def ingest_regulations():
    print("Loading English pages from PDF...")

    pages = load_english_regulations(PDF_PATH)

    print(f"English pages loaded: {len(pages)}")

    print("Parsing regulations...")

    regulations = parse_regulations(pages)

    print(f"Regulations parsed: {len(regulations)}")

    db = SessionLocal()

    try:
        # Prevent duplicate ingestion
        existing = (
            db.query(Regulation)
            .filter(
                Regulation.document_name
                == "Coal Mines Regulations, 2017"
            )
            .first()
        )

        if existing:
            print("Coal Mines Regulations, 2017 already exists.")
            print("Aborting to prevent duplicate data.")
            return

        # Create the document-level regulation record
        regulation = Regulation(
            document_name="Coal Mines Regulations, 2017",
            document_type="Government Regulation",
            source=SOURCE_URL,
            version="2017",
            effective_date=datetime(2017, 11, 27),
            category="Mining Safety",
            description=(
                "Coal Mines Regulations, 2017 issued under the "
                "Mines Act framework."
            ),
        )

        db.add(regulation)
        db.flush()

        print(f"Created regulation document with ID: {regulation.id}")

        # Create one RegulationChunk per parsed regulation
        for item in regulations:
            chunk = RegulationChunk(
                regulation_id=regulation.id,
                section=f"Regulation {item['regulation_number']}",
                clause=None,
                content=item["content"],
                page_number=item["page_number"],
            )

            db.add(chunk)

        db.commit()

        print(
            f"Successfully inserted "
            f"{len(regulations)} regulation chunks."
        )

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    ingest_regulations()