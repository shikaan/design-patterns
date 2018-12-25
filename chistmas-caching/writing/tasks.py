from invoke import task
from os.path import join

virtualenv_folder = './virtualenv'

@task(help="Launch the project")
def start(c):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("python3 src/main.py")

@task(help="Initialize virtualenv for the current project")
def init(c):
    c.run("mkdir -p " + virtualenv_folder)
    c.run("virtualenv " + virtualenv_folder)

@task(help={"module": "Module to be added as dependency"})
def add(c, module):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("pip3 install " + module)
        c.run("pip3 freeze > requirements.txt")

@task(help="Install project's dependencies")
def install(c):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("pip3 install -r ./requirements.txt")

@task(help="Launch test suite")
def test(c):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("py.test ./src/**_test.py")