<?php
$targetDir = "uploads/";
if (!file_exists($targetDir)) mkdir($targetDir);

$targetFile = $targetDir . basename($_FILES["file"]["name"]);
if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
    $fullUrl = "https://pekadi.com/pkgsender/uploads/" . basename($targetFile);
    echo $fullUrl;
} else {
    http_response_code(500);
    echo "Upload failed";
}
