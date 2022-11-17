### Using MinIO as storage

#### Configuration
Install MinIO
``` 
brew install minio
```

Start MinIO server
```
Minio server start
```
You should see something like 
```zsh
MinIO Object Storage Server
Copyright: 2015-2022 MinIO, Inc.
License: GNU AGPLv3 <https://www.gnu.org/licenses/agpl-3.0.html>
Version: RELEASE.2022-11-11T03-44-20Z (go1.19.3 darwin/amd64)

Status:         1 Online, 0 Offline. 
API: http://10.120.5.151:9000  http://127.0.0.1:9000                       
RootUser: minioadmin 
RootPass: minioadmin 
Console: http://10.120.5.151:65508 http://127.0.0.1:65508            
RootUser: minioadmin 
RootPass: minioadmin 

Command-line: https://min.io/docs/minio/linux/reference/minio-mc.html#quickstart
   $ mc alias set myminio http://10.120.5.151:9000 minioadmin minioadmin

Documentation: https://min.io/docs/minio/linux/index.html

```
You can now access MinIO and its interface via `http://127.0.0.1:9000`

#### Minio Object Attributes
- bucket_name
- content_type
- etag
- fromxml
- is_delete_marker
- is_dir
- is_latest
- last_modified
- metadata
- object_name
- owner_id
- owner_name
- size
- storage_class
- version_id

#### minio_pics.py File
`uploadFile(directory)`
- uploads all images stored in `directory` to the MinIO me-in-loo bucket

`listImages(directory)`
- returns a list of all the urls of the images stored in `directory`




