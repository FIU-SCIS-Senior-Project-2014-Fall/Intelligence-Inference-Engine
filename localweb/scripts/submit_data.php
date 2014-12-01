

<?php

include 'httpful.phar';

////echo $_POST['data-pred'];
////echo $_POST['data-1'];

////echo var_dump($_POST) . "<br>";

//$_POST["reporterName"];
//$_POST["subject"];


$reporter = "";
if (strlen($_POST["reporterName"]) == 0)
	$reporter = "Anonymous";
else
	$reporter = $_POST["reporterName"];
	
//echo "Reporter: " . $reporter . '<br>';
	
$query = "PREFIX iie: </fake/iie/types/>";

foreach (explode("," , $_POST["prefixName"]) as $prefix)
{
	if(strlen($prefix) != 0)
		$query = $query . "PREFIX " . $prefix;
}

//$query = str_replace("<","&lt",$query);
//$query = str_replace(">","&gt",$query);

$query = $query . "INSERT DATA { ";

if (strpos($_POST["subject"], "<") === FALSE)
	$query = $query . "</" . $_POST["subject"] . ">" . " ";
else
	$query = $query . $_POST["subject"] . " ";

$size = intval($_POST['size']);

for($i=1; $i<=$size; $i++)
{
	$query = $query . "iie:" . $_POST['data-pred'. strval($i)] . " ";
	
	$query = $query . "\"" . $_POST['data-'.strval($i)] ."\"" ;
	/*$predicate = $_POST['data-'. strval($i)];
	$predicate = str_replace("<","", $predicate);
	$predicate = str_replace(">","", $predicate);
	
	$query = $query . "<" . $predicate .">" ;*/
	if($i < $size)
		$query = $query . "; " ;
	else
		$query = $query . ". " ;
}

$query = $query . " }";

//echo $query;
//echo "<br>";
//echo urlencode($query);
//echo "<br>";

$response = \Httpful\Request::post("http://iie-dev.cs.fiu.edu:3030/iie/update")
->body($query)
->send();

if (strcmp($response->body, '') == 0)
	echo "<response><code>S</code><message>Data has been successfully entered</message></response>";
else
	echo "<response><code>F</code><message>There was an error entering your data</message></response>";


/*$uri = "http://iie-dev.cs.fiu.edu:3030/update/"; 
$temp = urlencode($query);
//echo $temp;
$data = array('query' => $temp);

//$response = \Httpful\Request::post($uri)
    ->send();
cho $response;*/

?>