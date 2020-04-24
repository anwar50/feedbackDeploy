from selenium import webdriver
from feedbackapp.models import TeacherProfile, User
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse
import time

class TestTeacherPage(StaticLiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.Chrome('functional_tests/chromedriver.exe')
    
    def tearDown(self):
        self.browser.close()
    
    def test_no_teacher_alert(self):
        self.browser.get(self.live_server_url)
        time.sleep(20)