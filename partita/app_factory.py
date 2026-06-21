from fastapi import FastAPI

from partita.endpoints.backend import backend_router
from partita.endpoints.frontend import frontend_router


def app_factory() -> FastAPI:
    app = FastAPI()
    app.include_router(frontend_router)
    app.include_router(backend_router)
    return app
