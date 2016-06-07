<?php

    if (isset($_POST['image-blob'])) {
        $img = $_POST['image-blob'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $fileName = $_POST["image-filename"];
        //$uploadDirectory = "uploads/$fileName";

        $uploadDirectory = "../../preslikave_uploads/";

        $success = file_put_contents($uploadDirectory . $fileName, $data);

        print $success ? $file : 'Unable to save the file.';
    }
?>
