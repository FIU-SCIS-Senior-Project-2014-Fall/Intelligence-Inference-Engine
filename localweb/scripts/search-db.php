<?php
	$con=mysqli_connect("127.0.0.1","root","","queries");

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	else
	{
		echo "Everything good";
	}
	
	mysqli_close($con);
?>