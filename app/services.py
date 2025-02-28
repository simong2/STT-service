import database
import os
from dotenv import load_dotenv

from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


def add_tables():
    return database.Base.metadata.create_all(bind=database.engine)


load_dotenv(dotenv_path="ibm-credentials.env")

apikey = os.getenv("SPEECH_TO_TEXT_APIKEY")
url = os.getenv("SPEECH_TO_TEXT_URL")

auth = IAMAuthenticator(apikey)
stt = SpeechToTextV1(authenticator=auth)
stt.set_service_url(url)


def ibm_stt(file_path):
    with open(file_path, 'rb') as audio:
        res = stt.recognize(audio=audio, content_type='audio/mp3', model='en-US_NarrowbandModel',speaker_labels=True).get_result()

    print(res)
    transcript = ""
    for result in res['results']:
        transcript += result['alternatives'][0]['transcript'] + " "

    return transcript