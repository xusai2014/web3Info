//@ts-nocheck
import React, { useRef, useCallback, useState } from 'react'
import { useGesture } from 'react-use-gesture'
import { useSprings, a } from 'react-spring'

// Mask image is really important if we decide our carousel shouldn't span the whole window
const styles = {
    container: {
        position: 'relative',
        height: '100vh',
        width: '100%',
    },
    item: { position: 'absolute', height: '100%', willChange: 'transform' },
    counter: {
        position: 'absolute',
        right: '0',
        padding: '0.7rem 1rem',
        margin: '1rem',
        background: 'hsla(0, 0%, 15%, 1)',
        color: '#fff',
        borderRadius: '35px'
    }
}

/**
 * Calculates a spring-physics driven infinite carousel
 *
 * @param {Array} items - display items
 * @param {Function} children - render child
 * @param {number} width - fixed item with
 * @param {number} visible - number of items that must be visible on screen
 */
export default function Carousel({ items, itemWidth = 'full', visible = 4, style, children, sensitivity = 1 }) {
    if(typeof  window === 'undefined') {
        return null;
    }
    const windowWidth:any = itemWidth === 'full' ? window.innerWidth : itemWidth
    let width = itemWidth === 'full' ? windowWidth : itemWidth
    const idx = useCallback((x, l = items.length) => (x < 0 ? x + l : x) % l, [items])
    const getPos = useCallback((i, firstVis, firstVisIdx) => idx(i - firstVis + firstVisIdx), [idx])
    // Important only if specifyng item width separately, centers the element in the carousel
    const offset = itemWidth === 'full' ? 0 : windowWidth / 2
    const [springs, set] = useSprings(items.length, i => ({ x: (i < items.length - 1 ? i : -1) * width + offset }))
    const prev = useRef([0, 1])
    const index = useRef(0)
    const [active, setActive] = useState(1)

    const runSprings = useCallback(
        (y, vy, down, xDir, cancel, distance, xMove) => {
            // This decides if we move over to the next slide or back to the initial
            if (down && (distance > width / 2 || Math.abs(vy) > sensitivity)) {
                cancel((index.current = index.current + (xDir > 0 ? -1 : 1)))
            }
            if (index.current + 1 > items.length) {
                setActive((index.current % items.length) + 1)
            } else if (index.current < 0) {
                setActive(items.length + ((index.current + 1) % items.length))
            } else {
                setActive(index.current + 1)
            }

            // The actual scrolling value
            const finalY = index.current * width
            // Defines currently visible slides
            const firstVis = idx(Math.floor(finalY / width) % items.length)
            const firstVisIdx = vy < 0 ? items.length - visible - 1 : 1
            set(i => {
                const position = getPos(i, firstVis, firstVisIdx)
                const prevPosition = getPos(i, prev.current[0], prev.current[1])
                let rank = firstVis - (finalY < 0 ? items.length : 0) + position - firstVisIdx + (finalY < 0 && firstVis === 0 ? items.length : 0)
                return {
                    // x is the position of each of our slides
                    x: (-finalY % (width * items.length)) + width * rank + (down ? xMove : 0) + offset,
                    // this defines if the movement is immediate
                    // So when an item is moved from one end to the other we don't
                    // see it moving
                    immediate: vy < 0 ? prevPosition > position : prevPosition < position
                }
            })
            prev.current = [firstVis, firstVisIdx]
        },
        [idx, getPos, width, visible, set, items.length]
    )

    const bind = useGesture({
        onDrag: ({ offset: [x], vxvy: [vx], down, direction: [xDir], cancel, distance, movement: [xMove] }) => {
            vx && runSprings(-x, -vx, down, xDir, cancel, distance, xMove)
        }
    })

    return (
        <div {...bind()} style={{ ...style, ...styles.container, width }}>
            {springs.map(({ x, vel }, i) => (
                <a.div key={i} style={{ ...styles.item, width, x }} children={children(items[i], i)} />
            ))}
            <InstaCounter currentIndex={active} dataLength={items.length} />
        </div>
    )
}

function InstaCounter({ currentIndex, dataLength }) {
    return (
        <div style={{ ...styles.counter }}>
            {currentIndex}/{dataLength}
        </div>
    )
}
