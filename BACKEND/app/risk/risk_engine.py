def calculate_severity_score(severity: str) -> int:

    severity_scores = {
        "low": 10,
        "medium": 20,
        "high": 25,
        "critical": 30
    }

    return severity_scores.get(
        severity.lower(),
        0
    )



def calculate_recurrence_score(
    recurrence_count: int
) -> int:

    if recurrence_count == 0:
        return 0

    if recurrence_count == 1:
        return 10

    if recurrence_count == 2:
        return 15

    return 20



def calculate_affected_workers_score(
    affected_workers: int
) -> int:

    if affected_workers <= 0:
        return 0

    if affected_workers <= 2:
        return 10

    if affected_workers <= 5:
        return 15

    return 20



def calculate_overdue_action_score(
    overdue_actions: int
) -> int:

    if overdue_actions <= 0:
        return 0

    if overdue_actions == 1:
        return 10

    return 15


def calculate_history_score(
    historical_violation_count: int
) -> int:

    if historical_violation_count == 0:
        return 0

    if historical_violation_count <= 2:
        return 5

    if historical_violation_count <= 5:
        return 10

    return 15



### risk calculation ####

def calculate_risk(
    severity: str,
    recurrence_count: int,
    affected_workers: int,
    overdue_actions: int,
    historical_violation_count: int
):

    severity_score = calculate_severity_score(
        severity
    )

    recurrence_score = calculate_recurrence_score(
        recurrence_count
    )

    affected_workers_score = (
        calculate_affected_workers_score(
            affected_workers
        )
    )

    overdue_action_score = (
        calculate_overdue_action_score(
            overdue_actions
        )
    )

    history_score = calculate_history_score(
        historical_violation_count
    )

    total_score = (
        severity_score
        + recurrence_score
        + affected_workers_score
        + overdue_action_score
        + history_score
    )

    if total_score >= 80:
        risk_level = "critical"

    elif total_score >= 60:
        risk_level = "high"

    elif total_score >= 30:
        risk_level = "medium"

    else:
        risk_level = "low"

    return {
        "score": total_score,
        "risk_level": risk_level,
        "factors": {
            "severity": severity_score,
            "recurrence": recurrence_score,
            "affected_workers": affected_workers_score,
            "overdue_actions": overdue_action_score,
            "historical_frequency": history_score
        }
    }