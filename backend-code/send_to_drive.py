from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2 import service_account
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Paste Google drive folder ID here
drive_id = os.getenv('DRIVE_FOLDER_ID')

def upload_to_drive(filepath, filename):
    SCOPES = ['https://www.googleapis.com/auth/drive']
    SERVICE_ACCOUNT_FILE = 'service_account.json'

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )

    service = build('drive', 'v3', credentials=credentials)

    file_metadata = {
        'name': filename,
        'parents': [drive_id],
    }
    media = MediaFileUpload(filepath, mimetype='video/webm')

    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    return file.get('id')
