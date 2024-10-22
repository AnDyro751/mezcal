import LazyLoad from "vanilla-lazyload";

export default function updateLazyLoad() {
    if (window.customLazyLoad) {
        window.customLazyLoad.update();
    } else {
        window.lazyLoad = LazyLoad;
        window.customLazyLoad = new LazyLoad({});
        window.customLazyLoad.update();
    }
}

export function destroyLazyLoad(element) {
    LazyLoad.resetStatus(element);
    updateLazyLoad();
}