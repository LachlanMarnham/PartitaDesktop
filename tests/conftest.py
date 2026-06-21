import pytest
from fastapi.testclient import TestClient

from partita.app_factory import app_factory


@pytest.fixture
def client():
    return TestClient(app_factory())
