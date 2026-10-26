import re

REGULATION_PATTERN = re.compile(
    r"^(\d{1,3})\.\s+(.+?)(?:[.–-])(?=\s|\(|$)"
)

def clean_page_text(text: str) -> str:
    """
    Remove PDF page headers, page numbers and Hindi Gazette artifacts.
    """

    cleaned_lines = []

    for line in text.splitlines():

        line = line.strip()

        if not line:
            continue

        # Gazette headers
        if "THE GAZETTE OF INDIA" in line:
            continue

        if "[PART II—SEC. 3(i)]" in line:
            continue

        # Hindi Gazette header artifacts
        if "¹Hkkx II" in line:
            continue

        if "Hkkjr dk jkti=k" in line:
            continue

        # Standalone page numbers
        if re.fullmatch(r"\d{1,3}", line):
            continue

        line = re.sub(
            r"THE\s+GAZETTE\s+OF\s+INDIA\s*:\s*EXTRAORDINARY",
            "",
            line
        )

        line = re.sub(
            r"\[PART II—SEC\. 3\(i\)\]",
            "",
            line
)

        cleaned_lines.append(line)

    return "\n".join(cleaned_lines)


def parse_regulations(pages):
    """
    Parse English CMR 2017 pages into individual regulations.
    """

    regulations = []

    current_regulation = None

    for page in pages:

        page_number = page["page_number"]

        cleaned_text = clean_page_text(page["content"])

        lines = cleaned_text.splitlines()

        for line in lines:

            line = line.strip()

            if not line:
                continue

            match = REGULATION_PATTERN.match(line)

            if match:

                regulation_number = int(match.group(1))

                # Save previous regulation
                if current_regulation:
                    regulations.append(current_regulation)

                # Everything after the regulation number
                heading = match.group(2).strip()

                current_regulation = {
                    "regulation_number": regulation_number,
                    "title": heading,
                    "content": line,
                    "page_number": page_number,
                }

            elif current_regulation:

                current_regulation["content"] += " " + line

    # Save final regulation
    if current_regulation:
        regulations.append(current_regulation)

    return regulations