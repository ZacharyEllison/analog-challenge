import random
import time

from MessagePackage.config import MEAN_TIME, MESSAGE_FAILURE_RATE


class Sender():

    def __init__(self):
        pass

    def update(self, mean_time=MEAN_TIME, failure_rate=MESSAGE_FAILURE_RATE):
        self.mean_time = mean_time
        self.failure_rate = failure_rate
        self.fail_count = 0
        self.success_count = 0
        self.average_time = [0]

    def procedure(self, producer):
        wait_time = random.gauss(self.mean_time, 1)
        time.wait(wait_time)
        message = producer.message()
        if message:
            self.send_message()
            self.average_time.append(wait_time)
        else:
            producer.has_run = True

    def send_message(self):
        if random.random() <= self.failure_rate:
            self.fail_count += 1
        else:
            self.success_count += 1

