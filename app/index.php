<?php

/**
 * Cached manifest contents.
 *
 * @var array
 */
$manifest = null;

/**
 * Get the contents of the manifest file as an array.
 *
 * @return array
 */
function get_manifest()
{
    global $manifest;

    if ($manifest === null) {
        if (file_exists($file = __DIR__.'/assets/rev-manifest.json')) {
            $manifest = json_decode(file_get_contents($file), true);
        } else {
            $manifest = [];
        }
    }

    return $manifest;
}

/**
 * Get an asset with the given filename.
 *
 * @param  string  $file
 * @return string
 */
function asset($file)
{
    if (isset(get_manifest()[$file])) {
        $file = get_manifest()[$file];
    }

    return "assets/{$file}";
}

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webcomm</title>

    <!-- Stylesheets -->
    <link href="<?=asset('stylesheets/app.css')?>" rel="stylesheet">

  </head>
  <body>
    <header role="banner">

      <!-- Logo -->
      <a href="#" class="logo">
        <?=file_get_contents(asset('images/logo.svg'))?>
      </a>

      <!-- Main navigation -->
      <nav role="navigation" id="js-main-navigation">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">What We Do</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>

      <!-- Navigation trigger -->
      <a href="#" class="navigation-trigger" id="js-navigation-trigger">
        <span class="top-bun"></span>
        <span class="pattie"></span>
        <span class="bottom-bun"></span>
        Toggle Navigation
      </a>

      <!-- Call to action navigation -->
      <nav class="call-to-action">
        <ul>
          <li><a href="https://goo.gl/maps/H5kNW" target="_blank">Find Us</a></li>
          <li><a href="tel:+612 4970 2244">Call Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>

    </header>

    <img src="<?=asset('images/wooden-desk-with-gadgets.jpg')?>" alt="Wooden Desk With Gadgets">

    <!-- JavaScripts -->
    <script src="<?=asset('javascripts/app.js')?>"></script>

  </body>
</html>
