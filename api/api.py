from threading import Thread
from flask import Flask, request
from MessagePackage.producer import Producer
from MessagePackage.sender import Sender

app = Flask(__name__)
producer = Producer()
sender = Sender()
threads = []
process_count = 1

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/configure', methods=["GET", "POST"])
def configure(request):
    message_count = request.json['message_count']
    mean_time = request.json['mean_time']
    failure_rate = request.json['failure_rate']
    process_count = request.json['process_count']
    producer.update(message_count=message_count)
    sender.update(mean_time=mean_time, failure_rate=failure_rate)
    # return app.send_static_file('index.html')


@app.route('/update')
def update():
    if not producer.has_run:
        for _p in process_count:
            threads.append(Thread(target=sender.procedure, args=producer))
        for t in threads:
            t.start()
    return {
        'successes': sender.success_count,
        'failures': sender.fail_count,
        'average_time': (sum(sender.average_time) / len(sender.average_time))
    }

if __name__ =="__main__":
    app.run()