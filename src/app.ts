import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'

import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    console.log('App launched.')
  })
//   useEffect(async () => {

//     // CanvasKitInit({
//     //     locateFile: (file) => 'node_modules/canvaskit-wasm/bin/' + file,
//     // }).then((CanvasKit) => {
//     //     console.log(CanvasKit)
//     // })
// }, [])
  // children 是将要会渲染的页面
  return children
}
  


export default App
