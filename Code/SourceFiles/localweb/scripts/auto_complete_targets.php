
<?php

include 'httpful.phar';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
$query = "SELECT distinct ?predicate WHERE { ?prefix ?predicate ?y. }";
$queryURL = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" . urlencode($query) . "&output=xml&stylesheet=xml-to-html-links.xsl";

$response = \Httpful\Request::get($queryURL)
			->send();

echo $response;
?>