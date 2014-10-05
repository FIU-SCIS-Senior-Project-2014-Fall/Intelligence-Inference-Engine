<?php

//echo var_dump($_POST) . "<br>";



$query = "PREFIX iie: &lt/fake/iie/types&gt";

foreach (explode(",",$_POST["prefixName"]) as $prefix);
	$query = $query . "PREFIX " . $prefix;

$query = str_replace("<","&lt",$query);
$query = str_replace(">","&gt",$query);

$query = $query . "SELECT ?subject WHERE { ";

$size = intval($_POST['size']);

for($i=1; $i<=$size; $i++)
{
	if($i == 1)
		$query = $query . "?subject ";
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