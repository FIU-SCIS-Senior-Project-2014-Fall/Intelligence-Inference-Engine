

<?php

//echo $_POST['data-pred'];
//echo $_POST['data-1'];

//echo var_dump($_POST) . "<br>";

//$_POST["reporterName"];
//$_POST["subject"];


$reporter = "";
if (strlen($_POST["reporterName"]) == 0)
	$reporter = "Anonymous";
else
	$reporter = $_POST["reporterName"];
	
echo "Reporter: " . $reporter . '<br>';
	
$query = "PREFIX iie: &lt/fake/iie/types&gt";

foreach (explode(",",$_POST["prefixName"]) as $prefix);
	$query = $query . "PREFIX " . $prefix;

$query = str_replace("<","&lt",$query);
$query = str_replace(">","&gt",$query);

$query = $query . "INSERT DATA { ";

if (strpos($_POST["subject"], "<") === FALSE)
	$query = $query . "&lt" . $_POST["subject"] . "&gt" . " ";
else
	$query = $query . $_POST["subject"] . " ";

$size = intval($_POST['size']);

for($i=1; $i<=$size; $i++)
{
	$query = $query . "iie:" . $_POST['data-pred'. strval($i)] . " ";
	$query = $query . "\"" . $_POST['data-'.strval($i)] ."\"" ;
	if($i < $size)
		$query = $query . "; " ;
	else
		$query = $query . ". " ;
}

$query = $query . " }";

print $query;

?>