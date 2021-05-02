# Creating a Smart Navbar With Vanilla JavaScript | CSS-Tricks

> Sticky, or fixed, navigation is a popular design choice because it gives users persistent access to navigate the site. On the other hand, it takes up

Take the pain out of building site search with the Algolia hosted API. **[Start free now!](https://srv.buysellads.com/ads/long/x/T6A3N7DTTTTTTT66YJJCTTTTTTTVXPSDKTTTTTTTL4MCVYTTTTTTTR7M5VBNBBPUCMZDVIPYC73H6KZZP3ACOW44VQPE)**

Sticky, or fixed, navigation is a popular design choice because it gives users persistent access to navigate the site. On the other hand, it takes up space on the page and sometimes covers content is a way that’s less than appealing.

A possible solution? Smart navigation.

Let’s define “smart navigation” as:

1.  Visible at the top of the page
2.  Visible when the user moves **up** the page (wherever they may have scrolled to)
3.  Hidden when the user moves **down** the page

Here’s an example of how that might work:

It‘s all the convenience of sticky positioning, with an added fullscreen benefit. This sort of smart navigation is already commonly (think of the URL bar in many mobile browsers), but is sometimes a hassle to implement without a library or plugin. So, in this article, we’ll discuss how to build one using CSS and vanilla JavaScript.

**Side note:** People have different definitions of what _scrolling down_ a page means (imagine how some trackpad preferences scroll the page _up_ when you move your fingers _down_). For the purposes of this article, _scrolling down_ refers to moving towards the bottom of the page.

### Let’s look at the code

Here’s some example HTML. Our smart navigation will be the `<nav>` which sits above the `<main>`:

    <nav>
      <div class="logo">
        Logo
      </div>
      <div class="links">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
      </div>
    </nav>
    <main>
      
    </main>

It’s important to note that elements are only sticky _relative to their parent container_. The parent container of `<nav>` should be the body tag; it shouldn’t be placed within another tag on the page.

The CSS for our smart navigation looks like this:

    nav {
      position: sticky;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      background-color: #eaeaea;
    }

Now we need to detect when our user is scrolling the page and the direction of their scrolling. A user is scrolling down if the value of their last scroll position is _less_ than the value of their current scroll position. Breaking the logic down, we’ll need to:

1.  Define a variable to store the previous scroll position
2.  Assign a variable to detect the current scroll position set to the scroll offset of the page

If the current scroll position is greater than the previous scroll position, then the user is scrolling downwards. Let’s call our function `isScrollingDown`:

    let previousScrollPosition = 0;
    
    const isScrollingDown = () => {
      let currentScrolledPosition = window.scrollY || window.pageYOffset;
      let scrollingDown;
    
      if (currentScrolledPosition > previousScrollPosition) {
        scrollingDown = true;
      } else {
        scrollingDown = false;
      }
      previousScrollPosition = currentScrolledPosition;
      return scrollingDown;
    };

Here’s a visual representation of how this function works:

With this logic, we’re able to detect when the page is scrolling down so we can use this to toggle our nav styling:

    const nav = document.querySelector('nav');
    
    const handleNavScroll = () => {
      if (isScrollingDown()) {
        nav.classList.add('scroll-down');
        nav.classList.remove('scroll-up')
      } else {
        nav.classList.add('scroll-up');
        nav.classList.remove('scroll-down')
      }
    }

If the user is scrolling down, we’ll assign a `.scroll-down` class that contains our styling method for when the page is moving downward. We can update our `<nav>` CSS to this:

    nav {
      
      transition: top 500ms ease-in-out;
    }
    
    nav.scroll-up {
      top: 0;
    }
    
    nav.scroll-down {
      top: -100%;
    }

With this styling, the `top` property value of `<nav>` is set to -100% of the page height so it slides out of view. We could also choose to handle our styling with `translate` or by fading it out — whatever animation works best.

#### Performance

Whenever we’re working with scroll event listeners, performance is something that should immediately come to mind. Right now, we’re calling our function every time the user scrolls the page, but we don’t need to detect each pixel movement.

For this case, we can implement a throttle function instead. A throttle function is a higher order function that acts as a timer for the function passed into it. If we throttle a scroll event with a timer of 250ms, the event will only be called every 250ms while the user scrolls. It’s a great way to limit the number of times we call the function, helping with the performance of the page.

David Corbacho goes deeper into throttle implementations in [this article.](https://css-tricks.com/debouncing-throttling-explained-examples/)

A simple throttle implementation in JavaScript looks like this:

    
    var throttleWait;
    
    const throttle = (callback, time) => {
      
      if (throttleWait) return;
    
      
      throttleWait = true;
    
      
      setTimeout(() => {
        callback();
    
        
        throttleWait = false;
      }, time);
    }

Then we can include our `handleNavScroll` function inside a throttle:

    window.addEventListener("scroll", () => {
      throttle(handleNavScroll, 250)
    });

With this implementation, the `handleNavScroll` function is only called once every 250ms.

#### Accessibility

Whenever implementing a custom feature in JavaScript, we must always take accessibility into concern. One such issue is ensuring that `<nav>` is visible when it’s in focus. Browsers tend to scroll to the part of the page that currently has focus by default, but there can be certain complications when working with scroll events.

A way to ensure that `<nav>` is always visible is to update the CSS to account for focus. Now our CSS looks like this:

    nav.scroll-up,
    nav:focus-within {
      top: 0;
    }

Unfortunately, the `[focus-within](https://css-tricks.com/almanac/selectors/f/focus-within/)` selector [isn’t fully supported across all browsers.](https://caniuse.com/css-focus-within) We can include a JavaScript fallback for it:

    const handleNavScroll = () => {
      if (isScrollingDown() && !nav.contains(document.activeElement))) {
        nav.classList.add('scroll-down');
        nav.classList.remove('scroll-up')
      } else {
        nav.classList.add('scroll-up');
        nav.classList.remove('scroll-down')
      }
    }

In this updated function, we only apply the `scroll-down` class if the user is scrolling down the page and the `<nav>` doesn’t currently have any element with focus in it.

Another aspect of accessibility is the consideration that some users may not want to have any animation on the page. That’s something we can detect and respect with the `[prefers-reduced-motion](https://css-tricks.com/introduction-reduced-motion-media-query/)` CSS media query. We can update this method in JavaScript and prevent our function from running at all if a user prefers reduced motion:

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    window.addEventListener("scroll", () => {
      if (mediaQuery && !mediaQuery.matches) {
        throttle(handleNavScroll, 250)
      }
    });

### Wrapping up

So, there we have it: a smart navigation implementation with plain CSS and vanilla JavaScript. Now users have persistent access to navigate the site without losing real estate in a way that blocks content.

Plus, the benefit of a custom implementation like this is that we get a delightful user experience that isn’t over-engineered or sacrifices open performance or accessibility.


[Source](https://css-tricks.com/creating-a-smart-navbar-with-vanilla-javascript/)