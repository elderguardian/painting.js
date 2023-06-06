class ImageGallery {

    constructor(selector, config) {
        this.selector = selector
        this.config = config
    }

    #enableVerticalScrolling(element, speed) {
        element.addEventListener('wheel', (ev) => {
            ev.preventDefault()
            element.scrollBy((ev.deltaY + ev.deltaX) * speed, 0)
        })
    }

    #onEndVisible(galleryEnd, imageContainer, callback) {

        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) {
                    continue
                }

                callback()
            }
        })

        observer.observe(galleryEnd)
    }

    #renderImageElement(parent, imageUrl) {

        const imageContainer = document.createElement('div')
        imageContainer.setAttribute('class', 'image-container')

        const imageElement = document.createElement('img')
        imageElement.src = imageUrl
        imageElement.loading = 'lazy'
        imageElement.alt = 'Random image'
        imageContainer.appendChild(imageElement)

        return imageContainer
    }

    #appendImages(imageContainer, amount, adapter) {

        for (let i = 0; i < amount; i++) {
            adapter().then(async newImageUrl => {
                const imageElement = this.#renderImageElement(imageContainer, newImageUrl)
                await imageContainer.appendChild(imageElement)
            })
        }

    }

    render() {
        const galleryElement = document.querySelector(this.selector)
        const imageContainer = document.createElement('div')
        const galleryEnd = document.createElement('div')

        imageContainer.setAttribute('id', 'images')
        galleryEnd.setAttribute('id', 'end')
        galleryElement.appendChild(imageContainer)
        galleryElement.appendChild(galleryEnd)

        this.#enableVerticalScrolling(window, this.config.scrollingSpeed)

        this.#onEndVisible(galleryEnd, imageContainer, () => {
            this.#appendImages(imageContainer, this.config.imagesAtOnce, this.config.adapter)
        })

        this.#appendImages(imageContainer, this.config.imagesAtOnce, this.config.adapter)
    }

}