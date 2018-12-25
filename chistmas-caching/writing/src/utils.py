from datetime import datetime

def trace(func):
    def wrapper(*args, **kwargs):
        now = datetime.now().time()
        print(f"[{now}]", func.__qualname__)
        return func(*args, **kwargs)
    return wrapper