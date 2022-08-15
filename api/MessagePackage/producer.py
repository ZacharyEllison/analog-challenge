import random
import string

from MessagePackage.config import MESSAGE_COUNT


class Producer():

    def __init__(self):
        self.has_run = False
        pass

    def update(self, message_count=MESSAGE_COUNT):
        self.has_run = False
        self.message_count = message_count
        self.remaining_messages = message_count

    def message(self):
        if self.remaining_messages > 1:
            self.remaining_messages -= 1
            return ''.join([random.choice(string.letters + string.digits) for _ in range(random.randrange(100))])
        else:
            return None