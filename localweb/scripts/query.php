
<?php
include('./httpful.phar');

$query = '';

if (isset($_POST['query']))
	$query = $_POST['query'];//should already be urlencoded
else
	$query = null;

	

if($query)
{
	
	$query = urlencode("");
	$graph = "test:data";

	//$uri = "www.webservicex.net/CurrencyConvertor.asmx/ConversionRate?FromCurrency=USD&ToCurrency=ZWD";
	$uri = "iie-dev.cs.fiu.edu:9090/sparql?query="+$query+"&default-graph-uri="+$graph; //change to localhost when deploying

	$response = \Httpful\Request::get($uri)
				->send();


	echo $response;//for testing, send response to  another page

}

/* POST code

	\Httpful\Request::post($uri)
					->body('<xml><query>'+$query+'</query><graph>'+$graph+'</graph></xml>)
					->sendsXml()
					->send();

*/

	
	

?>
