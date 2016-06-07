 <?php
include 'database_credentials.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT cas, predpona, leva_barva, desna_barva, povprecna_barva FROM aktivnost";
$result = $conn->query($sql);
$datoteke = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {

		 $datoteke[] = array("cas"=>date('d.m.Y H:i:s',strtotime($row["cas"])), "predpona"=>$row["predpona"],
		 "levaBarva"=>$row["leva_barva"], "desnaBarva"=>$row["desna_barva"], "povprecnaBarva"=>$row["povprecna_barva"]);

    }
	echo json_encode( $datoteke );
}
$conn->close();
?>