export default function addImgProcess(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = `${process.env.STATIC_URL}${src}`;
    })
}