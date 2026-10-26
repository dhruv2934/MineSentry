from langgraph.graph import StateGraph, START, END
from sqlalchemy.orm import Session

from app.graph.state import MineSentryState

from app.graph.nodes import (
    analyze_observation_node,
    search_regulations_node,
    evaluate_violation_node,
    create_violation_node,
    calculate_risk_node,
    generate_corrective_action_node,
)


def route_after_evaluation(
    state: MineSentryState
):
    if state["is_violation"]:
        return "create_violation"

    return END


def build_mine_sentry_graph(
    db: Session
):
    graph = StateGraph(MineSentryState)

    graph.add_node(
        "analyze_observation",
        lambda state: analyze_observation_node(
            state,
            db
        )
    )

    graph.add_node(
        "search_regulations",
        lambda state: search_regulations_node(
            state,
            db
        )
    )

    graph.add_node(
        "evaluate_violation",
        lambda state: evaluate_violation_node(
            state,
            db
        )
    )

    graph.add_node(
        "create_violation",
        lambda state: create_violation_node(
            state,
            db
        )
    )

    graph.add_node(
        "calculate_risk",
        lambda state: calculate_risk_node(
            state,
            db
        )
    )

    graph.add_node(
        "generate_corrective_action",
        lambda state: generate_corrective_action_node(
            state,
            db
        )
    )
##### MAIN--WORKFLOW------------------------------------------------------------------------------------------------------------

    graph.add_edge(
        START,
        "analyze_observation"
    )

    graph.add_edge(
        "analyze_observation",
        "search_regulations"
    )

    graph.add_edge(
        "search_regulations",
        "evaluate_violation"
    )

    graph.add_conditional_edges(
        "evaluate_violation",
        route_after_evaluation,
        {
            "create_violation": "create_violation",
            END: END,
        }
    )

    graph.add_edge(
        "create_violation",
        "calculate_risk"
    )

    graph.add_edge(
        "calculate_risk",
        "generate_corrective_action"
    )

    graph.add_edge(
        "generate_corrective_action",
        END
    )

    return graph.compile()