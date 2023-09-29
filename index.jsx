import './style.css'
import ReactDOM from 'react-dom/client'
const root = ReactDOM.createRoot(document.querySelector('#root'))
import {Canvas} from '@react-three/fiber'
import Ball from './comp/Ball'
root.render(
    <>
        <Canvas>
            <Ball/>
        </Canvas>
    </>
)