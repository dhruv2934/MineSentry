from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.api.dependencies import get_current_user

# Existing API routers
from app.api.mine import router as mines_router
from app.api.inspection import router as inspections_router
from app.api.observation import router as observations_router
from app.api.violation import router as violations_router
from app.api.regulations import router as regulations_router
from app.api.regulation_chunks import router as regulation_chunks_router
from app.api.corrective_actions import router as corrective_actions_router
from app.api.alerts import router as alerts_router
from app.api.risk import router as risk_router

from app.api.corrective_actions_recommendations import (
    router as corrective_action_recommendations_router
)

# Authentication and employee routers
from app.api.auth import router as auth_router
from app.api.employee import router as employee_router


app = FastAPI(
    title="MineSentry API",
    description="AI-Based Smart Governance and Compliance Monitoring System for Coal Mines",
    version="0.1.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Public endpoints
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


# Centralized protected API router
protected_api_router = APIRouter(
    dependencies=[Depends(get_current_user)]
)


# Register all business API routers
protected_api_router.include_router(mines_router)
protected_api_router.include_router(inspections_router)
protected_api_router.include_router(observations_router)
protected_api_router.include_router(violations_router)
protected_api_router.include_router(regulations_router)
protected_api_router.include_router(regulation_chunks_router)
protected_api_router.include_router(corrective_actions_router)
protected_api_router.include_router(alerts_router)
protected_api_router.include_router(risk_router)

protected_api_router.include_router(
    corrective_action_recommendations_router
)

protected_api_router.include_router(employee_router)


# Public authentication endpoint
app.include_router(
    auth_router,
    prefix="/api"
)


# Register all protected endpoints under /api
app.include_router(
    protected_api_router,
    prefix="/api"
)