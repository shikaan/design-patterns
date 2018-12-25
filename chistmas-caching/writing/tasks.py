from invoke import task
from os.path import join

virtualenv_folder = './virtualenv'

@task
def start(c):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("python3 src/main.py")

@task
def init(c):
    c.run("mkdir -p " + virtualenv_folder)
    c.run("virtualenv " + virtualenv_folder)

@task
def install(c, module):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("pip3 install " + module)
        c.run("pip3 freeze > requirements.txt")

@task
def test(c):
    with c.prefix("source " + join(virtualenv_folder, "bin/activate")):
        c.run("py.test ./src/**_test.py")