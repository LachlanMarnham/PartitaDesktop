from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

import partita

STATIC_DIR = Path(partita.__file__).parent.parent / "static"

frontend_router = APIRouter()


@frontend_router.get("/")
def index() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@frontend_router.get("/static/{file_path:path}")
def static_files(file_path: str) -> FileResponse:
    full_path = (STATIC_DIR / file_path).resolve()
    if not full_path.is_relative_to(STATIC_DIR.resolve()) or not full_path.is_file():
        raise HTTPException(status_code=404)
    return FileResponse(full_path)
