
<?php

include 'httpful.phar';

$queryURL = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" . urlencode($_POST['query']) . "&output=xml&stylesheet=";		

$response = \Httpful\Request::get($queryURL)
			->send();

echo $response;
?>