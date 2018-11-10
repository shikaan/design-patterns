from time import time


class WriteStore:
    "Receiver"

    def __init__(self):
        self.entries = []

    def save(self, amount):
        entry = {
            'timestamp': time(),
            'amount': amount
        }
        self.entries.append(entry)


class ReadStore:

    def __init__(self, command_handler, write_store):
        self.write_store = write_store
        self.command_handler = command_handler
        self.entries = []

        self.command_handler.subscribe(self.update)

    def update(self, event):
        if event.type == self.command_handler.events['deposited']:
            self.entries = self.write_store.entries
