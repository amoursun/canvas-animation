
/**
 * 1. 创建空元素
 *    - 开始第一页需要创建
 *    - 指定页数需要创建 (点击刚刚看过)
 * 2. 填充元素
 *    - 页面视口范围内可看到的
 *        - 监控空元素, 是否在视口 (new IntersectionObserver)
 */

import {debounce} from './util-debounce.js';


// 初始化
const SIZE = 9;
const currentIndex = 400; // 第 400 个图
const container = document.querySelector('.container');
const indicator = document.querySelector('.indicator');
const visibleIndexSet = new Set(); // 可见元素下标集合
const loadedPagesSet = new Set(); // 已加载的页数集合

// 创建监视器, 监控元素是否在视口
const ob = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
            visibleIndexSet.add(index);
        }
        else {
            visibleIndexSet.delete(index);
        }
    }
    loadPagesDebounce();
    setIndicatorVisible();
});

/**
 * 获取可见元素最小下标 和 最大下标
 */
function getIndexRange() {
    const arr = Array
        .from(visibleIndexSet)
        .sort((a, b) => a - b)
    return [arr[0], arr[arr.length - 1]];
}


function loadPages() {
    // 可见范围索引范围
    const [min, max] = getIndexRange();
    const pages = new Set();
    for (let i = min; i <= max; i++) {
        pages.add(Math.ceil((i + 1) / SIZE));
    }

    for (const page of pages) {
        if (loadedPagesSet.has(page)) {
            continue;
        }
        loadedPagesSet.add(page);
        // 加载页面图片数据
        getVideos(page, SIZE).then(res => {
            const startIndex = (page - 1) * SIZE;
            for (let i = 0; i < res.length; i++) {
                const item = container.children[startIndex + i];
                if (!item) continue;
                item.innerHTML = `<img src="${res[i].img}" />`;
                // item.style.backgroundImage = `url(${res[i].img})`;
            }
        })
    }
}
// 防抖
const loadPagesDebounce = debounce(loadPages, 300);
loadPages();

/**
 * 设置指示器是否可见
 */
function setIndicatorVisible() {
    const [min, max] = getIndexRange();
    indicator.style.display = currentIndex >= min && currentIndex <= max ? 'none' : 'block';
}


/**
 * 创建指定页数包含图片的元素
 * @param {*} pageNum : 页数
 */
function createElements(pageNum) {
    const childrenLength = container.children.length;
    const count = pageNum * SIZE;
    const fragment = document.createDocumentFragment();
    for (let i = childrenLength; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'item';
        item.dataset.index = i;
        if (i === currentIndex) {
            item.classList.add('playing');
        }
        fragment.appendChild(item);
        ob.observe(item);
    }
    container.appendChild(fragment);
}

createElements(1); // 创建第一页



indicator.onclick = () => {
    // currentIndex 需要服务器返回
    const page = Math.floor(currentIndex / SIZE) + 1;
    createElements(page);
    container.children[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
    indicator.style.display = 'none';
};
