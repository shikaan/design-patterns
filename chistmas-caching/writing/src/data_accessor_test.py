from data_accessor import TrulyAwesomeBankAPIClient
from pytest import mark


class TestDataAccessor:

    @mark.asyncio
    async def test_save_transaction(self):
        data = TrulyAwesomeBankAPIClient()
        transaction = {
            'id': 'name',
            'value': 10
        }

        entry = await data.save_transaction(transaction)

        assert data._TrulyAwesomeBankAPIClient__database[entry['id']] == entry

    @mark.asyncio
    async def test_read_transaction(self):
        data = TrulyAwesomeBankAPIClient()
        transaction = {
            'id': 'name',
            'value': 10
        }

        entry = await data.save_transaction(transaction)

        assert await data.read_transaction_by_id(entry['id']) == entry
