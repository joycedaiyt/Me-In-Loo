from google.cloud import storage
from os import listdir
from os.path import isfile, join


# Google Cloud Storage Config
# storage_client = storage.Client()
storage_client = storage.Client.from_service_account_json(
    "dynamic-branch-308302-f0b255f61755.json", project="dynamic-branch-308302"
)

bucketName = "me-in-loo-bucket"
bucket = storage_client.get_bucket(bucketName)

# Data
localFolder = "./image_folder"
bucketFolder = 'test_folder'


def upload_files_from_local():
    """Upload files to GCP bucket."""

    # for each file in the localFolder (image_folder), it'll be uploaded to the GCP bucket
    # files that already exist in the bucket will not be uploaded again

    # image urls in the bucket
    urls = []
    files = [f for f in listdir(localFolder) if isfile(join(localFolder, f))]
    for file in files:
        localFile = localFolder + "/" + file
        blob = bucket.blob(bucketFolder + "/" + file)
        blob.upload_from_filename(localFile)
        urls.append(blob.public_url)
    print('Uploaded {files} to "{bucketName}" bucket.')
    print(urls)
    return urls


def main():
    upload_files_from_local()


if __name__ == "__main__":
    main()
