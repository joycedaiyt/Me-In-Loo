### Using GCP Bucket

#### Images are uploaded to the [GCP Bucket](https://console.cloud.google.com/storage/browser?referrer=search&project=dynamic-branch-308302&prefix=)

#### Configuration
Make sure that you have `dynamic-branch-308302-f0b255f61755.json` in your local repository in this folder to connect to GCP bucket. \
\
(Optional) If the file does not exist, install `brew install gcloud` and run the following command to log into your GCP account:
``` 
gcloud auth login
```

Run the following:
```
pip install google-cloud-storage
```

#### Image Upload
The images that will be uploaded to the bucket are located in `image_folder`

#### bucket.py File
`upload_files_from_local()`
- uploads all images stored in `image_folder` to the bucket in the `bucket_folder`, as specified in the file 
- returns a list of image urls stored in the image_folder

