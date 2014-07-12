# equalHeight
<p class="tagline">Simple plugin to set equal height to matched elements.</p>

## Usage

``` js
$('.someDivs').equalHeight();
```

## Options

There are few things that you can set

``` js
var options = {
    minWindowWidth = 0,
    maxWindowWidth = 900,
    onWindowResize = true
};
```

### minWindowWidth

Default: `0`

Checked against jQuery's `innerWidth()` returned value.
Use this option when you want to set minimal window width from which the plugin will work.
For instance, if you set it to 1000 then matched elements will have equal height only when window's width is 1000px or bigger.

### maxWindowWidth

Default: `99999`

Checked against jQuery's innerWidth() returned value.
Use this option when you want to set maximal window width to which the plugin will work.
For instance, if you set it to 1000 then matched elements will have equal height only when window's width is 1000px or smaller.

### onWindowResize

Default: `true`

Having this set to `false` will equal heights of matched elements only on page load (if window width matches settings).
Therefore when window will be resized (for instance when you flip your mobile device), height of all matched elements won't change.

On the other hand, setting it to `true`, will equal elements height upon window resize.

## Why?

I needed a script to set same height for carousel items (using Bootstrap) and I didn't know how much text I would have in each caption element.
I had to also take responsiveness into consideration. And I needed to set them (items) at a certain resolution.
So I thought, hey, why not write a jQuery plugin and, better yet, share it. So here you are :)

## Demo

Check out demo.html file.

## License

Script is MIT licensed and free and will always be kept this way.
