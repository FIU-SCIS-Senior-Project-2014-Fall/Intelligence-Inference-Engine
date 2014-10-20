
<?php

include 'httpful.phar';

$query = "http://iie-dev.cs.fiu.edu:3030/iie/query?query=" .$_POST['query'];

$response = Request::get($query)
			->send();

echo "Response: " . $response;
?>