<?php

print "hello";
$db = "bob";
$user =  "root";
$pass = "";
$mysqli = new mysqli("localhost",$user,"",$db);

if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
  }

?>