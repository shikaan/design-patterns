from threading import Timer
from uuid import uuid1
from asyncio import ensure_future, sleep


class ResourceManager:

    def __init__(self, cache_manager, truly_awesome_bank_API_client):
        self.cache_manager = cache_manager
        self.truly_awesome_bank_API_client = truly_awesome_bank_API_client

    def __create_entry(self, transaction):
        return {
            'id': uuid1(),
            'transaction': transaction
        }

    async def save_with_write_through(self, transaction):
        entry = self.__create_entry(transaction)

        self.cache_manager.set(entry['id'], entry)
        return await self.truly_awesome_bank_API_client.save_transaction(entry)

    async def save_with_write_behind(self, transaction):
        entry = self.__create_entry(transaction)

        async def delay_synchronization(entry):
            await sleep(5)
            await self.truly_awesome_bank_API_client.save_transaction(entry)

        synchronization = ensure_future(delay_synchronization(entry))

        self.cache_manager.set(entry['id'], entry)
        return entry

    async def fetch_transaction_by_id(self, transaction_id):
        entry = self.cache_manager.get(transaction_id)

        if entry:
            return entry

        return await self.truly_awesome_bank_API_client.read_transaction_by_id(transaction_id)
