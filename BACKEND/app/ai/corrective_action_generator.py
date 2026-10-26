from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings
from app.schemas.corrective_action_ai import (
    CorrectiveActionRecommendation
)


llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    google_api_key=settings.GOOGLE_API_KEY
)

structured_llm = llm.with_structured_output(
    CorrectiveActionRecommendation
)


def generate_corrective_action(
    observation_text: str,
    violation_title: str,
    violation_description: str | None,
    regulation_content: str,
    risk_level: str,
    risk_score: int,
    affected_workers: int,
    recurrence_count: int
):

    prompt = f"""
You are a mining compliance corrective-action recommendation system.

Generate a practical corrective action for the following
confirmed mine safety violation.

OBSERVATION:
{observation_text}

VIOLATION:
Title: {violation_title}

Description:
{violation_description}

REGULATION:
{regulation_content}

RISK:
Risk Level: {risk_level}
Risk Score: {risk_score}

AFFECTED WORKERS:
{affected_workers}

RECURRENCE COUNT:
{recurrence_count}

Rules:

1. Recommend a concrete action that addresses the observed
   violation.

2. Base the recommendation on the observation and the
   provided regulation.

3. Do not invent regulatory requirements.

4. Do not invent facts about the mine, workers, equipment,
   or incident.

5. The recommended deadline should be reasonable for the
   severity and risk of the issue.

6. This is ONLY a recommendation.
   Do not state that the action has been approved or assigned.

7. Do not determine or change the risk score or severity.

8. Keep the recommendation concise and operational.

Return only the structured response.
"""

    result = structured_llm.invoke(prompt)

    return result