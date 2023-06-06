class ImageGallery {

    constructor(selector, config) {
        this.selector = selector
        this.config = config
    }

    render() {
        const galleryElement = document.querySelector(this.selector)
        const imageContainer = document.createElement('div')
        const galleryEnd = document.createElement('div')

        imageContainer.setAttribute('id', 'images')
        galleryEnd.setAttribute('id', 'end')
        galleryElement.appendChild(imageContainer)
        galleryElement.appendChild(galleryEnd)
    }

}