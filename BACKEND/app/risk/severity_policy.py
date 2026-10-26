def calculate_severity(
    category: str,
    affected_workers: int
) -> str:

    category = category.lower()

    # Multiple workers affected by a safety violation
    if affected_workers > 5:
        return "critical"

    if affected_workers >= 3:
        return "high"

    # PPE violations affecting one or two workers
    if category == "ppe":
        return "medium"

    return "low"