from pathlib import Path

import partita

STATIC_DIR = Path(partita.__file__).parent.parent / "static"


def test_index_returns_index_html(client):
    response = client.get("/")

    assert response.status_code == 200
    assert response.text == (STATIC_DIR / "index.html").read_text()


def test_static_files_returns_existing_file(client):
    response = client.get("/static/App.jsx")

    assert response.status_code == 200
    assert response.text == (STATIC_DIR / "App.jsx").read_text()


def test_static_files_404s_for_missing_file(client):
    response = client.get("/static/does-not-exist.js")

    assert response.status_code == 404


def test_static_files_404s_for_path_traversal(client):
    response = client.get("/static/%2e%2e/pyproject.toml")

    assert response.status_code == 404
