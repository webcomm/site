<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webcomm</title>

    <!-- Stylesheets -->
    <link href="stylesheets/app.css" rel="stylesheet">

  </head>
  <body>
    <header role="banner">

      <!-- Logo -->
      <a href="#" class="logo">
        <?=file_get_contents(__DIR__.'/images/logo.svg')?>
      </a>

      <!-- Main navigation -->
      <nav role="navigation">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">What We Do</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>

      <!-- Call to action navigation -->
      <nav class="call-to-action">
        <ul>
          <li><a href="https://goo.gl/maps/H5kNW" target="_blank">Find Us</a></li>
          <li><a href="tel:+612 4970 2244">Call Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>

    </header>

    <!-- JavaScripts -->
    <script src="javascripts/app.js"></script>

  </body>
</html>
