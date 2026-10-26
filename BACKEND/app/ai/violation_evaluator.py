from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings
from app.schemas.violation_evaluation import ViolationEvaluation


llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key=settings.GOOGLE_API_KEY
)

structured_llm = llm.with_structured_output(
    ViolationEvaluation
)


def evaluate_violation(
    observation_text: str,
    regulations: list[dict]
) -> ViolationEvaluation:

    regulation_context = ""

    for regulation in regulations:
        regulation_context += f"""
Regulation Number: {regulation["regulation_number"]}
Section: {regulation["section"]}
Content:
{regulation["content"]}

---
"""

    prompt = f"""
You are a mining compliance evaluation system.

Determine whether the following mine inspection observation
is supported as a regulatory violation by the retrieved
regulation text.

OBSERVATION:
{observation_text}

RETRIEVED REGULATIONS:
{regulation_context}

Rules:

1. Mark is_violation=true ONLY if the retrieved regulation
   clearly supports that the observed condition violates
   a stated requirement.

2. Do not assume that a regulation applies merely because
   it contains related keywords.

3. Do not invent regulations or legal requirements.

4. If the retrieved regulations do not provide sufficient
   evidence, return is_violation=false.

5. If there is a violation, return the regulation number
   that provides the strongest direct support.

6. The reason must briefly explain the connection between
   the observation and the regulation.

7. Do not determine severity or risk.

Return only the structured response.
"""

    result = structured_llm.invoke(prompt)

    return result