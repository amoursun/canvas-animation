
class Bounding {
    constructor() {
        this.bound = null;
    }

    update(bound) {
        if (!this.bound) {
            this.bound = bound;
        }
        else {
            Object.assign(this.bound, bound);
        }
    }

    updateByTarget(ele) {
        const boundRect = ele.getBoundingClientRect();
        this.update({
            left: boundRect.left,
            top: boundRect.top,
            right: boundRect.width + boundRect.left,
        });
    }
}

export const boundState = new Bounding();