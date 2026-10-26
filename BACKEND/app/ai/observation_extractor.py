from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings
from app.schemas.ai import ObservationExtraction


llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key=settings.GOOGLE_API_KEY
)


structured_llm = llm.with_structured_output(
    ObservationExtraction
)

## analyzes the observation text and extracts factual information about the violation, including the main observed issue, compliance category, number of affected workers, and location.

def extract_observation(
    observation_text: str
) -> ObservationExtraction:

    prompt = f"""
You are a mining safety compliance extraction system.

Analyze the following mine inspection observation.

Observation:
{observation_text}

Extract factual information from the observation.

Rules:

1. Identify the main observed violation or issue.
2. Categorize it using a concise compliance category such as:
   PPE, Electrical Safety, Machinery Safety, Fire Safety,
   Ventilation, Ground Control, Environmental, or Other.

3. Extract the number of affected workers if explicitly stated.
   If no number is stated, return 0.

4. Extract the location if explicitly stated.
   If it is not stated, return null.

5. Keep the description factual and concise.

6. Do NOT determine severity or risk level.

7. Do NOT invent regulations, causes, injuries, worker counts,
   locations, equipment, or other facts.

8. Return only the structured response.
"""

    result = structured_llm.invoke(prompt)

    return result