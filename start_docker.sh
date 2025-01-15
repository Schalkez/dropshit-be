# Xây dựng hình ảnh Docker
docker build -t dropshit-be .

# Chạy container
docker run --name dropshit-be -d -p 7070:7070 dropshit-be