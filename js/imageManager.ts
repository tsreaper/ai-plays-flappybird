class ImageManager {

    public static imageList: HTMLImageElement[] = [];

    public static loadComplete() {
    }

    public static loadImage(arr: string[]): void {
        const length = arr.length;
        let loadedImages = 0;

        function imageLoaded() {
            loadedImages++;
            if (loadedImages == length) {
                ImageManager.loadComplete();
            }
        }

        for (let i = 0; i < length; i++) {
            ImageManager.imageList[arr[i]] = new Image();
            ImageManager.imageList[arr[i]].src = `assets/${arr[i]}.png`;
            ImageManager.imageList[arr[i]].onload = imageLoaded;
        }
    }

    public static getImage(name: string | number): HTMLImageElement {
        return ImageManager.imageList[name];
    }

}
