<?php
	function addToDB($query, $tags)
	{
		$con=mysqli_connect("127.0.0.1","root","","queries");

		if (mysqli_connect_errno()) {
			return "Store unsuccessful ". mysqli_connect_error();
		}
		else
		{
			$result = mysqli_query($con,"INSERT INTO stored_queries (query, tags, submission_time) VALUES ('$query', '$tags', now())");
			if (mysqli_connect_errno()) {
				return "Store unsuccessful ". mysqli_connect_error();
			}
		}
	
		mysqli_close($con);
	}
	echo addToDB(trim($_REQUEST['query']),trim($_REQUEST['tags']));
?>