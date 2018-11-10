from command import Deposit

class BankApplication:
    def __init__(self, command_handler, query_handler, store):
        self.command_handler = command_handler
        self.query_handler = query_handler
        self.store = store

    def deposit(self, amount):
        deposit = Deposit(self.store, amount)
        self.command_handler.handle_deposit(deposit)
        return self.query_handler.handle_get_last_deposit()
    
    def get_all_deposits(self):
        return self.query_handler.handle_get_all_deposits()
