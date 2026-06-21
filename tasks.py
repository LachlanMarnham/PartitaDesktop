import shutil

from invoke import task


def echo(msg: str) -> None:
    width = shutil.get_terminal_size().columns
    print(f" {msg.upper()} ".center(width, "#"))


@task
def install(c):
    c.run("poetry install --with dev")


@task
def update(c):
    c.run("poetry update")


@task
def dev_server(c):
    c.run("uvicorn partita.app_factory:app_factory --factory --reload")


@task
def ruff(c):
    echo("ruff")
    c.run("ruff check --fix partita tests tasks.py")
    c.run("ruff format partita tests tasks.py")


@task
def isort(c):
    echo("isort")
    c.run("isort partita tests tasks.py")


@task
def mypy(c):
    echo("mypy")
    c.run("mypy partita tests tasks.py")


@task
def style(c):
    isort(c)
    ruff(c)
    mypy(c)


@task
def test(c):
    c.run("pytest")
