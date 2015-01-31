##animated
animated is a lightweight animation framework originally built by 
[Shri Ganeshram](github.com/shri) to progressively animate DOM elements 
on a webpage. It works well with the animate.css framework and depends on 
animate.css and jQuery.

animated is licensed under the MIT License.

## installation
Depends on bower.

<code>bower install animated</code>

Include <code>jquery/dist/jquery.js</code>, <code>animated/animated.js</code>, 
<code>animated/animated.css</code>, and optionally 
<code>animate.css/animate.css</code> in your HTML file from your 
<code>bower_components</code> directory.

## use
```js
var animate = new Animated();
animate.add("customClass", "animated animateCSSClass", {
	timeDelay: 150 //delay in ms, default: 200
}); 											//dictionary param is optional
```

<code>customClass</code> is a class you define to map to 
<code>animated animateCSSClass</code>.

<code>timeDelay</code> is an option in the optional dictionary to specify 
delays between animations of each <code>customClass</code> in milliseconds.

Available animateCSSClasses can be found on the 
[animate.css framework website](http://daneden.github.io/animate.css/).

Alternatively, use your own css animations in place of 
<code>animated animateCSSClass</code>.

```html
<div class="preanimated customClass"></div> <!--before animation-->
<div class="animated animateCSSClass"></div> <!--after animation-->
```