
<?php

include 'httpful.phar';

$query = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" . $_POST['query'];
echo "Query URL: " . $query;

$response = \Httpful\Request::get($query)
			->expectsJson()
			->send();

echo "<br>Response: " . $response;
?>