import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import useForceUpdate from '../lib/useForceUpdate'

export default function Portal({ children, type = 'portal' }) {
  const node = useRef(null)
  const forceUpdate = useForceUpdate()

  useLayoutEffect(() => {
    node.current = document.createElement(type)
    document.body.appendChild(node.current)
    forceUpdate()

    return () => {
      document.body.removeChild(node.current)
    }
  }, [])

  return node.current ? createPortal(children, node.current) : null
}
