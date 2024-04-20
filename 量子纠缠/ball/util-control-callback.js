import {boundState} from './bounding.js';
import {channelState} from './channel.js';


// 元素移动消息的回调
export const controlCallbackByTarget = (target) => {
    // 第一次加载先执行一次
    boundState.updateByTarget(target);
    target.onmousedown = (e) => {
        target.style.cursor = 'pointer';
        const x = e.pageX - target.offsetLeft;
        window.onmousemove = (e) => {
            boundState.updateByTarget(target);
            target.style.left = e.clientX - x + 'px';
        };
        window.onmouseup = () => {
            window.onmousemove = null;
            window.onmouseup = null;
            target.style.cursor = 'unset';
        };
    };
};

// 窗口移动消息的回调
export const controlCallbackByBrowser = () => {
    channelState.channel.onmessage = (event) => {
        if (event.data) {
            const {x, y, w} = event.data;
            const [clientX, clientY] = screenToClient(x, y);
            boundState.update({
                top: clientY,
                left: clientX,
                right: clientX + w,
            });
        }
    };
};

/**
 * 浏览器窗口变化发送
 */
export const resizeChannel = (time = 100) => {
    const screen = {
        x: 0,
        y: 0,
        w: 0,
    }
    // 轮训监听浏览器窗口的变化
    setInterval(() => {
        if (
            screen.x !== window.screenX ||
            screen.w !== window.outerWidth ||
            screen.y !== window.screenY
        ) {
            const _screen = {
                x: window.screenX,
                y: window.screenY,
                w: window.outerWidth,
            };
            // 浏览器窗口移动了
            channelState.channel.postMessage(_screen);
            Object.assign(screen, _screen)
        }
    }, time);
    // 监听浏览器缩放操作
    window.addEventListener('resize', function (event) {
        // 在窗口移动时执行的代码
        console.log('窗口位置已改变');
    });
};
