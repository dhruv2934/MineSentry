from app.core.database import SessionLocal
from app.graph.workflow import build_mine_sentry_graph


db = SessionLocal()

try:
    graph = build_mine_sentry_graph(db)

    initial_state = {
        "observation_id": 4
    }

    result = graph.invoke(initial_state)

    print("\n")
    print("=" * 80)
    print("FINAL LANGGRAPH RESULT")
    print("=" * 80)

    for key, value in result.items():
        print(f"{key}: {value}")

finally:
    db.close()