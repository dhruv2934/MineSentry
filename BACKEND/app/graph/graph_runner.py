from app.core.database import SessionLocal
from app.graph.workflow import build_mine_sentry_graph


def run_observation_workflow(observation_id: int):

    db = SessionLocal()

    try:
        graph = build_mine_sentry_graph(db)

        initial_state = {
            "observation_id": observation_id
        }

        result = graph.invoke(initial_state)

        print("\n")
        print("=" * 80)
        print("MINE SENTRY GRAPH COMPLETED")
        print("=" * 80)
        print(f"Observation ID: {observation_id}")
        print(f"Final State: {result}")

        return result

    except Exception as e:

        print("\n")
        print("=" * 80)
        print("MINE SENTRY GRAPH FAILED")
        print("=" * 80)
        print(f"Observation ID: {observation_id}")
        print(f"Error: {e}")

    finally:
        db.close()