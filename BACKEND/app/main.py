from fastapi import FastAPI

from app.api.mine import router as mines_router
from app.api.inspection import router as inspections_router
from app.api.observation import router as observations_router
from app.api.violation import router as violations_router
from app.api.regulations import router as regulations_router
from app.api.regulation_chunks import router as regulation_chunks_router
from app.api.corrective_actions import router as corrective_actions_router
from app.api.alerts import router as alerts_router
from app.api.risk import router as risk_router

from app.api.corrective_actions_recommendations import router as corrective_action_recommendations_router


from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="MineSentry API",
    description="AI-Based Smart Governance and Compliance Monitoring System for Coal Mines",
    version="0.1.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {
        "message": "MineSentry API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


app.include_router(
    mines_router,
    prefix="/api"
)

app.include_router(
    inspections_router,
    prefix="/api"
)

app.include_router(
    observations_router,
    prefix="/api"
)

app.include_router(
    violations_router,
    prefix="/api"
)

app.include_router(
    regulations_router,
    prefix="/api"
)

app.include_router(
    regulation_chunks_router,
    prefix="/api"
)

app.include_router(
    corrective_actions_router,
    prefix="/api"
)

app.include_router(
    alerts_router,
    prefix="/api"
)

app.include_router(
    risk_router,
    prefix="/api"
)

app.include_router(
    corrective_action_recommendations_router,
    prefix="/api"
)