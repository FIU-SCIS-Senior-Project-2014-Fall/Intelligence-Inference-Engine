

<?php

//echo $_POST['data-pred'];
//echo $_POST['data-1'];

echo var_dump($_POST);

//$_POST["reporterName"];
//$_POST["subject"];



for($i=1; $i<=$_POST['size']; $i++)
{
	echo $_POST['data-pred'+strval($i)] + "  ->  " + $_POST['data'+strval($i)] + "<br>";
}

?>