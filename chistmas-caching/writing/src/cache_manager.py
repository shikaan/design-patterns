from threading import Timer
from utils import trace

class CacheManager:
    def __init__(self):
        self.cache = {}

    @trace
    def set(self, key, value, expiration=0):
        if not key:
            raise ReferenceError("Cannot set entry without a key. Expected a key, got None" + str(key))

        self.cache[key] = value

        if expiration:
            timeout = Timer(expiration, self.__delete, [key])
            timeout.start()
    
    @trace
    def get(self, key):
        if not key:
            raise ReferenceError("Cannot get entry without a key. Expected a key, got " + str(key))

        if key not in self.cache.keys():
            return None

        return self.cache[key]
    
    def __delete(self, key):
        if not key:
            raise ReferenceError("Cannot delete entry without a key. Expected a key, got " + str(key))
        
        del self.cache[key]