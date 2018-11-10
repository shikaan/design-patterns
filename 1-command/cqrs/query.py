class QueryHandler:
    def __init__(self, read_store):
        self.read_store = read_store

    def handle_get_last_deposit(self):
        return self.read_store.entries[-1]

    def handle_get_all_deposits(self):
        return self.read_store.entries