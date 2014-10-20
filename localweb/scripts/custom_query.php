
<?php

include 'httpful.phar';

$queryURL = "http://iie-dev.cs.fiu.edu:3030/iie/query";
$queryContents = $_POST['query'];
echo "Query URL: " . $queryURL;
echo "<br>Query Contents: " . $queryContents;

$response = \Httpful\Request::get($queryURL)
			->param("query", $queryContents)
			->send();

echo "<br>Response: " . $response;
?>