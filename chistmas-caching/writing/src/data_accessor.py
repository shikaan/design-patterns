import asyncio

from time import sleep
from uuid import uuid1
from utils import trace

class TrulyAwesomeBankAPIClient:
    def __init__(self):
        self.__database = {}

    @trace
    async def save_transaction(self, transaction):
        if not transaction['id']:
            raise ReferenceError('Unable to identify entity. Please provide an id')

        await asyncio.sleep(2)
        self.__database[transaction['id']] = transaction

        return transaction
    
    @trace
    async def read_transaction_by_id(self, transaction_id):
        await asyncio.sleep(1.5)
        return self.__database[transaction_id]
