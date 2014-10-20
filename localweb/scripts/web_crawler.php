<?php

include "Snoopy.class.php";
$snoopy = new Snoopy;
	
$snoopy->fetchtext("http://www.cnn.com");
$temp = $snoopy->results;
$temp = str_replace("\n","<br>",$temp);

print $temp;

print $snoopy->response_code;

?>