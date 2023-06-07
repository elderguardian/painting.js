# painting.js

A reusable image gallery.


## Usage

Create an instance of ImageGallery with configuration.
Pass in an adapter function that returns the url to a random image.
In this example it always returns the same image `example.jpg`.

```js
    async function newImage() {
        //Generate image and return it
        return 'example.jpg'
    }

    const gallery = new ImageGallery('#gallery', {
        adapter: newImage,
        imagesAtOnce: 10,
        scrollingSpeed: 10,
    })
```