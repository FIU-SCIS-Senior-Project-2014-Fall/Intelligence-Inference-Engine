<?php
	function searchDB($tags)
	{
		$con=mysqli_connect("127.0.0.1","root","","queries");

		if (mysqli_connect_errno()) {
			return "Read unsuccessful ". mysqli_connect_error();
		}
		else
		{
			$query = "SELECT query, tags, submission_time FROM stored_queries WHERE";
			$splitTags = explode(",",$tags);
			foreach($splitTags as $tag) 
			{
				$query .= " tags LIKE '$tag%' OR";
			}
			$query = substr($query, 0, -3);
			
			$return = "";
			if($result = mysqli_query($con, $query))
			{
				while ($row=mysqli_fetch_row($result))
				{
					$return .= "//Tags: " . $row[1] . "\n";
					$return .= "//Submission Time: " . $row[2] . "\n";
					$return .= "" . $row[0] . "\n\n";
				}
				mysqli_free_result($result);
			}
			
			if (mysqli_connect_errno()) {
				return "Read unsuccessful ". mysqli_connect_error();
			}
			return $return;
		}
	
		mysqli_close($con);
	}
	echo searchDB(trim($_REQUEST['tags']));
?>