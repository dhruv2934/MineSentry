import pymupdf


def load_english_regulations(path: str):

    document = pymupdf.open(path)

    pages = []

    # PDF pages 160–280, using 1-based page numbers
    start_page = 160
    end_page = len(document)

    for page_number in range(start_page, end_page + 1):

        page = document[page_number - 1]

        text = page.get_text("text").strip()

        if text:
            pages.append({
                "page_number": page_number,
                "content": text
            })

    document.close()

    return pages