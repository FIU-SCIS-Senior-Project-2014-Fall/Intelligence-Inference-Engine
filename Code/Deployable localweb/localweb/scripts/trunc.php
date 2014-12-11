<?php
	function addToDB()
	{
		$con=mysqli_connect("127.0.0.1","root","","queries");

		if (mysqli_connect_errno()) {
			return "Error truncating";
		}
		else
		{
			$result = mysqli_query($con,"TRUNCATE stored_queries");
			if (mysqli_connect_errno()) {
				return "Error truncating";
			}
			else
			{
				mysqli_close($con);
				return "Database truncated";
			}
		}
	
	}
	echo addToDB();
?>