from store import WriteStore, ReadStore
from command import CommandHander
from query import QueryHandler
from app import BankApplication

write_store = WriteStore()
command_handler = CommandHander()

read_store = ReadStore(command_handler, write_store)
query_handler = QueryHandler(read_store) 

app = BankApplication(command_handler, query_handler, write_store)

last_deposit = app.deposit(100)
all_deposits = app.get_all_deposits()

print('Last deposit:', last_deposit)
print('All deposits:', all_deposits)
