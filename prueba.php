<?php
    $contra =  password_hash('123',PASSWORD_DEFAULT,['cost'=>12]);echo $contra;echo "<br>";
?>