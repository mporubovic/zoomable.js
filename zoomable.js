export default class Zoomable {
    constructor (div) {
        this.scaleMax = 10
        this.scaleMin = 0.1
        this.zoomStep = 2 / 100 // the higher the zoom step, the faster it zooms

        this.div = div

        this.x = 0
        this.y = 0
        this.scale = 1

        window.addEventListener("wheel", (e) => this._onWheel(e), {passive: false})
    }

    modifyScale(delta) {
        this.scale += delta
        this._setStyle()
    }

    modifyXY(x, y) {
        this.x += x
        this.y += y
        this._setStyle()
    }

    getRect() {
        return this.div.getBoundingClientRect()
    }

    _setStyle() {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
    }

    _onWheel(e) {
        e.preventDefault()

        let gesture = e.ctrlKey ? 'zoom' : 'pan'

        if (gesture == "zoom") this._onZoom(e)
        else if (gesture == "pan") this._onPan(e)
    }

    _onZoom(e) {
        let delta = -e.deltaY * (this.zoomStep)
        let zoomDirection = delta < 0 ? 'out' : 'in'
        console.log("zoom", zoomDirection)

        if (this.scale + delta > this.scaleMax) delta = this.scaleMax - this.scale
        else if (this.scale + delta < this.scaleMin) delta = this.scaleMin - this.scale

        let rect = this.getRect()
        let dx = ((rect.x + rect.width / 2 - e.clientX) / this.scale) * delta
        let dy = ((rect.y + rect.height / 2 - e.clientY) / this.scale) * delta

        this.modifyScale(delta) 
        this.modifyXY(dx, dy)
    }

    _onPan(e) {
        console.log("pan")

        this.modifyXY(-e.deltaX, -e.deltaY)
    }
}