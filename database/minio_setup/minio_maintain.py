import os
from minio import Minio
from minio.error import S3Error


client = Minio(
  endpoint="localhost:9000",
  secure=False,
  access_key="minioadmin",
  secret_key='minioadmin'
)


def uploadFile(directory):
  # Create a client with the MinIO server playground, its access key
  # and secret key.
  found = client.bucket_exists("me-in-loo")
  if not found:
    client.make_bucket("me-in-loo")
  else:
    print("Bucket 'me-in-loo' already exists")

  # iterate over files in that directory
  for filename in os.listdir(directory):
    f = os.path.join(directory, filename)

    # upload the files in the me-in-loo bucket
    client.fput_object("me-in-loo", f, f,)
    print( f + " is successfully uploaded to bucket 'me-in-loo'.")


def listImages(directory):
  objects = client.list_objects("me-in-loo", prefix=directory+"/")
  urls = []
  for obj in objects:
    publicUrl = "http://localhost:9000/me-in-loo/"+ obj.object_name
    urls.append(publicUrl)
  
  return urls


if __name__ == "__main__":
  upload_directories = ['posts', 'profile_pics']
  try:
    for directory in upload_directories:
      uploadFile(directory)

    # listImages("posts")
  except S3Error as exc:
    print("error occurred.", exc)