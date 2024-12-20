import { useEffect } from 'react'
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'

export default function GridTest() {
  useEffect(() => {
    const grid = document.querySelector('.grid-stack') as HTMLElement
    if (grid) {
      GridStack.init({
        float: true,
        staticGrid: false
      }, grid)
    }
  }, [])

  return (
    <div className="grid-stack">
      <div className="grid-stack-item" data-gs-x="0" data-gs-y="0" data-gs-width="4" data-gs-height="2">
        <div className="grid-stack-item-content">
          <h2>Widget 1</h2>
          <p>Conteúdo do widget 1</p>
        </div>
      </div>
      <div className="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="2">
        <div className="grid-stack-item-content">
          <h2>Widget 2</h2>
          <p>Conteúdo do widget 2</p>
        </div>
      </div>
    </div>
  )
}
