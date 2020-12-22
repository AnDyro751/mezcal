import LazyLoad from "vanilla-lazyload";

export default function updateLazyLoad() {
    if (window.customLazyLoad) {
        window.customLazyLoad.update();
    } else {
        window.customLazyLoad = new LazyLoad({});
    }
}