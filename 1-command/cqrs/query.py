class Query:
    def __init__(self, receiver):
        self.receiver = receiver

    def execute(self):
        raise NotImplementedError


class GetLastDeposit(Query):
    def execute(self):
        self.result = self.receiver.entries[-1]

class GetAllDeposits(Query):
    def execute(self):
        self.result = self.receiver.entries

class QueryHandler:
    def __init__(self, read_store):
        self.read_store = read_store

    def handle(self, query):
        query.execute()
        return query.result
