from events import Observable


class Command:
    def __init__(self, receiver):
        self.receiver = receiver

    def execute(self):
        raise NotImplementedError


class Deposit(Command):  # In CQRS traditionally you don't use the word Command in commands
    "ConcreteCommand"

    def __init__(self, receiver, amount):
        self.amount = amount
        super(Deposit, self).__init__(receiver)

    def execute(self):
        self.receiver.save(self.amount)


class CommandHander(Observable):
    "Invoker"

    def __init__(self):
        self.events = {
            'deposited': 'deposited'
        }
        super(CommandHander, self).__init__()

    def handle_deposit(self, command):
        command.execute()
        self.fire(self.events['deposited'])
