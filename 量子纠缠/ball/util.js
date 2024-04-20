
// 检查元素是否在屏幕外
export function isElementOutViewport(ele) {
    const rect = ele.getBoundingClientRect();
    return (
        rect.top < 0 ||
        rect.left < 0 ||
        rect.bottom >
            (window.innerHeight || document.documentElement.clientHeight) ||
        rect.right > (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function barRect() {
    return {
        height: window.outerHeight - window.innerHeight,
        width: window.outerWidth - window.innerWidth,
    };
};

// 屏幕坐标转换为窗口坐标
export const screenToClient = (screenX, screenY) => {
    const clientX = screenX - window.screenX;
    const clientY = screenY - window.screenY - barRect().height;
    return [clientX, clientY];
};

// 窗口坐标转换为屏幕坐标
export const clientToScreen = (clientX, clientY) => {
    const screenX = clientX + window.screenX;
    const screenY = clientY + window.screenY + barRect().height;
    return [screenX, screenY];
};

export function querySelector(selector) {
    return document.querySelector(selector);
}

