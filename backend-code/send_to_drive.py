from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2 import service_account

# Paste folder ID here
DRIVE_FOLDER_ID = '1t99ow_HKyvcBaYNIZ-yK6C2hyz1aeGpK'

def upload_to_drive(filepath, filename):
    SCOPES = ['https://www.googleapis.com/auth/drive']
    SERVICE_ACCOUNT_FILE = 'service_account.json'

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )

    service = build('drive', 'v3', credentials=credentials)

    file_metadata = {
        'name': filename,
        'parents': [DRIVE_FOLDER_ID],
    }
    media = MediaFileUpload(filepath, mimetype='video/webm')

    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    return file.get('id')
