var ImageManager = {
    imageList: [],

    loadComplete: function() {},

    loadImage: function(arr) {
        var length = arr.length;
        var loadedImages = 0;

        function imageLoaded() {
            loadedImages++;
            if (loadedImages == length) {
                ImageManager.loadComplete();
            }
        }

        for (i = 0; i < length; i++) {
            ImageManager.imageList[arr[i]] = new Image();
            ImageManager.imageList[arr[i]].src = "assets/" + arr[i] + ".png";
            ImageManager.imageList[arr[i]].onload = imageLoaded;
        }
    },

    getImage: function(name) {
        return ImageManager.imageList[name];
    }
}
