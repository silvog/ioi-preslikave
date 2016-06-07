<?php

foreach(array('audio') as $type) {

    if (isset($_FILES["${type}-blob"])) {

        $fileName = $_POST["${type}-filename"];

        $uploadDirectory = "../../preslikave_uploads/$fileName";
        if (!move_uploaded_file($_FILES["${type}-blob"]["tmp_name"], $uploadDirectory)) {
            echo("problem moving uploaded file");
        }

        echo($uploadDirectory);
    }
}
?>