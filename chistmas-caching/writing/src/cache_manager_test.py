from pytest import raises, mark
from cache_manager import CacheManager

class TestCacheManager:

    def test_set_missing_key(self):
        "Expected to throw"

        cache = CacheManager()

        with raises(ReferenceError):
            cache.set(key=None, value='value', expiration=1)

    def test_set_missing_value(self):
        "Expected to set an empty key"
        
        cache = CacheManager()

        cache.set(key='key', value=None, expiration=1)

        assert not cache.get('key')

    @mark.skip(reason="No clue how to test this")
    def test_set_missing_expiration(self):
        "Expected to have a non expiring entry"
        assert False

    def test_set_has_value(self):
        "Expected to find the required value"
        
        cache = CacheManager()

        cache.set(key='key', value='value', expiration=1)

        assert cache.get('key') == 'value'

    def test_get_missing_key(self):
        "Expected to throw"
        
        cache = CacheManager()

        with raises(ReferenceError):
            cache.get(key=None)

    def test_get_non_existent_key(self):
        "Expected to return None"
        
        cache = CacheManager()

        assert not cache.get('idonotexist')

    def test_get_existent_key(self):
        "Expected to return None"
        
        cache = CacheManager()
        key = 'key'
        value = 'value'

        cache.set(key,value)

        assert cache.get(key) == value
