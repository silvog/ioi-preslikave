 <?php

include 'database_credentials.php';

if (isset($_POST['predpona'])){
        $predpona = $_POST['predpona'];

         $cas = date( "Y-m-d H:i:s", strtotime($_POST['cas']) );
         $leva_barva = $_POST['leva_barva'];
         $desna_barva = $_POST['desna_barva'];
         $povprecna_barva = $_POST['povprecna_barva'];

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "INSERT INTO aktivnost (cas, predpona, leva_barva, desna_barva, povprecna_barva)
        VALUES ( '$cas', '$predpona', '$leva_barva', '$desna_barva', '$povprecna_barva')";

        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();

    }
?>