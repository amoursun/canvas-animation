
class Channel {
    #channel = null;
    constructor(name = 'channel') {
        this.name = name;

        if (!this.#channel) {
            this.#channel = new BroadcastChannel(this.name);
        }
    }

    get channel() {
        return this.#channel;
    }

    close() {
        if (this.#channel) {
            this.#channel.close();
            this.#channel = null;
        }
    }
}

export const channelState = new Channel('channel-state');