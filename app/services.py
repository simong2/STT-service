from elevenlabs import ElevenLabs
from pydub import AudioSegment
import database
import os
from dotenv import load_dotenv

from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import sys


def add_tables():
    return database.Base.metadata.create_all(bind=database.engine)


# concerning 11 api
load_dotenv()
API_KEY = os.getenv('API_KEY_2')

client = ElevenLabs(
    api_key=API_KEY,
)   

# concerning ibm watson
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



def eleven_stt(file_path):
    split_audio_file(file_path)

    files = sorted(os.listdir('./splits'))
    print(f"Iterations: {files}")

    full_audio = []

    time_off_set = 0

    for file in files:
        text = client.speech_to_text.convert(
            file=open(f"./splits/{file}","rb"),
            model_id="scribe_v1",
            diarize=True,
        )

        full_audio.append(pretty_parser(text.words, time_off_set))
        print(f'finished parsing through: ./splits/{file}')
        time_off_set+= 480 # 8 minutes into seconds 

    # delete split audios once done
    delete_files('./splits')
    
    return '\n'.join(full_audio) # full transcription of all splits w/ timestamp


def pretty_parser(words, time_off_set):
    out = []
    curr0 = []
    curr1 = []
    start_time = 0
    changed = True

    for word in words:
        if word.type == 'word':
            # only get this once until speaker changes
            if changed:
                start_time = word.start + time_off_set
                changed = False

            if word.speaker_id == "speaker_0":
                if curr1:
                    out.append(f"{start_time} Speaker 1: {' '.join(curr1)}\n")
                    curr1 = []
                    changed = True
                    
                curr0.append(word.text)
            elif word.speaker_id == "speaker_1":
                if curr0:
                    out.append(f"{start_time} Speaker 0: {' '.join(curr0)}\n")
                    curr0 = []
                    changed = True

                curr1.append(word.text)

    # last speaker dump
    if curr0:
        out.append(f"{start_time} Speaker 0: {' '.join(curr0)}\n")
    elif curr1:
        out.append(f"{start_time} Speaker 1: {' '.join(curr1)}\n")

    
    return ''.join(out)



# delete all files in splits
def delete_files(path):
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        os.remove(file_path)


# split audio file, 8 min iters
def split_audio_file(file_path):
    if not os.path.exists('./splits'):
        os.makedirs('./splits')

    audio = AudioSegment.from_mp3(file_path)

    # 8 mins in mili seconds
    eight_minutes = 8 * 60 * 1000
    
    for i, chunk in enumerate(audio[::eight_minutes]):
        with open(f"./splits/split-%s.mp3" % i, "wb") as f:
            chunk.export(f, format="mp3")

    print('all 8 mins chunks created: ')
