from command import Deposit
from query import GetAllDeposits, GetLastDeposit

class BankApplication:
    def __init__(self, command_handler, query_handler, write_store, read_store):
        self.command_handler = command_handler
        self.query_handler = query_handler
        self.write_store = write_store
        self.read_store = read_store

    def deposit(self, amount):
        deposit_command = Deposit(self.write_store, amount)
        get_last_deposit_query = GetLastDeposit(self.read_store)
        self.command_handler.handle_deposit(deposit_command)
        return self.query_handler.handle(get_last_deposit_query)
    
    def get_all_deposits(self):
        get_all_deposits_query = GetAllDeposits(self.read_store)
        return self.query_handler.handle(get_all_deposits_query)
