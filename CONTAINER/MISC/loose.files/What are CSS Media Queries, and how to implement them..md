# What are CSS Media Queries, and how to implement them.

> An explanation of what CSS Media Queries are and how to use them.

### Introduction

CSS Media Queries are a feature in CSS3 which allows you to specify when certain CSS rules should be applied. This allows you to apply a special CSS for mobile, or adjust a layout for print.

The basic syntax looks like this:

// normal style
#header-image {
    background-repeat: no-repeat;
    background-image:url('image.gif');
}

// show a larger image when you're on a big _screen_
@media screen and (min-width: 1200px) {
    #header-image {
        background-image:url('large-image.gif');
    }
}

// remove header image when printing.
@media print {
    #header-image {
        display: none;
    }
}

But can also be called like this:

<link rel='stylesheet' media='all' href='normal.css' />
<link rel='stylesheet' media='print' href='print.css' />
<link rel='stylesheet' media='screen and (min-width: 701px)' href='medium.css' />

The advantage of this method is that only the valid CSS is downloaded; so no print.css is only downloaded when printing (or using print preview).

Combining mediaqueries can be done by combining them with an comma. The query below is to target devices with an device-ratio of 1.5. The first element is for webkit, the second if for all other browser (1.5 \* 96).

@media screen and (-webkit-device-pixel-ratio: 1.5), screen and (resolution: 144dpi)

Because it's cascading all non-overwritten rules remain valid; e.g. the background remains no-repeat.  
Using this syntax you can do a couple of things;  

1.  Tweak that font so it really fits on that old iPhone,
2.  Remove menus and fluff from Print pages
3.  Create a full responsive site, by creating 'breakpoints' where the page should get a different design.

For example:

#block1, #block2 {
    float: left;
    width: 100%;
}

@media (min-width: 1000px) {
    #block1, #block2 {
        width: 50%;
    }
}

This example shows the 2 blocks on big screens next to each other, while on small screens they will be displayed below each other.

### Support

All modern browser support Media Queries. Internet Explorer supports it in IE9. All modern mobile browsers are supported, including Blackberry 7.0 and 10.0.

### Features

A media query syntax is made up by a media type and zero or more expressions.

**Available media types:**

**all**

All devices listen to this

**braille**

Used for braille tactile feedback devices.

**embossed**

Used for paged braille printers.

**handheld**

Used for handheld devices (Smartphones and tablets do NOT listen to this!).

**print**

Used for paged material and for documents viewed on screen in print preview mode.

**projection**

Used for projected presentations, for example projectors.

**screen**

Used primarily for color computer screens and smartphones.

**speech**

Used for speech synthesizers.. (Whatever that may be)

**tty**

Used for media using a fixed-pitch character grid (such as teletypes, terminals, or portable devices with limited display capabilities).

**tv**

Used for television-type devices (low resolution, color, limited-scrollability screens, sound available).

**Available expressions:**

**width**

The width of the current window

**height**

The height of the current window

**device-width**

The width of the device

**device-height**

The height of the device

**orientation**

Either landscape or portrait

**aspect-ratio**

The aspect ratio of the current window

**device-aspect-ratio**

The aspect ratio of the device

**color**

The number of color bits per color component

**color-index**

The number of available colors on the device

**monochrome**

The number of bits per pixel in a monochrome frame buffer

**resolution**

The resolution of the device

**scan**

Eiter progressive or interlace

**grid**

Is the device grid-based?

### Media types

Of course browsers don't behave the way we expect to do. Most important; the _handheld_ media type is not used by smartphones and tablets. Smartphones respond to _screen_. So in effect, the handheld media type is quite useless. The _TV_ media type doesn't work with a **Boxee Browser**. **Google TV** also doesn't respond to it. Thanks to [@botteaap](http://twitter.com/#!botteaap) for testing! The only browser I've come across is the **Wii browser**, powered by Opera.


[Source](http://cssmediaqueries.com/what-are-css-media-queries.html)