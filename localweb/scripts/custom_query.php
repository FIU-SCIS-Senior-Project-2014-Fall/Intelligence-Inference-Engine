
<?php

include 'httpful.phar';

$queryURL = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" . urlencode($_POST['query']);
echo "Query URL: " . $queryURL;

$response = \Httpful\Request::get($queryURL)
			->send();

echo "<br>Response: " . $response;
?>