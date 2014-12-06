<?php

////echo var_dump($_POST) . "<br>";
include 'httpful.phar';


/*$query = "PREFIX iie: </fake/iie/types/>";

foreach (explode(",",$_POST["prefixName"]) as $prefix)
{
	if(strlen($prefix) != 0)
		$query = $query . "PREFIX " . $prefix;
}

//$query = str_replace("<","&lt",$query);
//$query = str_replace(">","&gt",$query);

$query = $query . "SELECT ?subject WHERE { ";

$size = intval($_POST['size']);

for($i=1; $i<=$size; $i++)
{
	if($i == 1)
		$query = $query . "?subject ";
	$query = $query . $_POST['data-prefix'. strval($i)] . ":" . $_POST['data-pred'. strval($i)] . " ";
	
	
	$query = $query . "\"" . $_POST['data-'.strval($i)] ."\"" ;
	/*$predicate = $_POST['data-'. strval($i)];
	$predicate = str_replace("<","");
	$predicate = str_replace(">","");
	
	$query = $query . "<" . $predicate .">" ;
	
	
	if($i < $size)
		$query = $query . "; " ;
	else
		$query = $query . ". " ;
}

$query = $query . " }";

//echo $query;

$queryURL = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" . urlencode($query) . "&output=xml&stylesheet=";
//echo "<br>Query URL: " . $queryURL;

$response = \Httpful\Request::get($queryURL)
			->send();
			*/
$queryURL = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" . urlencode($POST['query']) . "&output=xml&stylesheet=";		
$response = \Httpful\Request::get($queryURL)
			->send();

echo $response;




?>