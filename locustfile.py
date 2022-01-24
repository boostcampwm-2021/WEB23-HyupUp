import time
from locust import HttpUser, task
from locust.user.wait_time import between

class LogInUser(HttpUser):
    wait_time = between(1, 4)
    def on_start(self):
        response = self.client.post('/api/users/login', json={'email':'test1@gmail.com', 'password': 'token'})
        cookie = response.cookies
        self.client.cookies = cookie
    @task
    def use_task(self):
        self.client.get('/api/users/tasks?userId=1&offset=0')
        self.client.get('/api/users/tasks?userId=1&offset=10')
        self.client.get('/api/users/tasks?userId=1&offset=20')
        self.client.get('/api/users/tasks?userId=1&offset=30')
        self.client.get('/api/users/tasks?userId=1&offset=40')
        self.client.get('/api/users/tasks?userId=1&offset=50')
        self.client.get('/api/users/tasks?userId=1&offset=60')
        self.client.get('/api/users/tasks?userId=1&offset=70')
        self.client.get('/api/users/organization?organizationId=1')
        self.client.get('/api/users/?email=')