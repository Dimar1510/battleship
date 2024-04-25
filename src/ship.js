export default class Ship {
    constructor(length, name = '') {
        this.length = length
        this.hits = []
        this.vertical = false
        this.row = null
        this.column = null
        this.name = name
    }

    hit(position) {
        // if (this.hits.includes(position) || position < 0 || position >= this.length)
        // return
        this.hits.push(position)
    }

    isSunk() {
        return this.hits.length === this.length
    }
}