import { View, Text } from '@tarojs/components'
import { useLoad, createSelectorQuery } from '@tarojs/taro'
import './index.scss'
import CanvasKitInit from 'canvaskit-wasm'
import CanvasKitWasm from "../../../node_modules/canvaskit-wasm/bin/canvaskit.wasm?url";

export default function Index () {
  useLoad(() => {
    const query = createSelectorQuery()
    query.select('#canvas').fields({
      node: true,
      size: true
    }).exec(async function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      const canvas = res[0].node;
      const ctx = canvas.getContext("webgl2");
      const originGetParameter = ctx.getParameter.bind(ctx);
      ctx.getParameter = function (v) {
        console.log(v)
        if (v === 7938) {
          const value = originGetParameter(v);
          if (value.indexOf("OpenGL ES 3.2") > 0) {
            return "WebGL 2.0 (OpenGL ES 3.2 Chromium)";
          } else {
            return value;
          }
        } else if (v === 35724) {
          const value = originGetParameter(v);
          if (value.indexOf("OpenGL ES 3.2") > 0) {
            return "WebGL GLSL ES 3.00 (OpenGL ES GLSL ES 3.2 Chromium)";
          } else {
            return value;
          }
        }
        return originGetParameter(v);
      };

      // CanvasKitInit({ locateFile: () => CanvasKitWasm }).then(
      //   (CanvasKit: CanvasKit) => {
      //     console.log("CanvasKit loaded");
      //     console.log(CanvasKit);
      // });
      const CanvasKit = await CanvasKitInit({ locateFile: () => CanvasKitWasm });
      const surface = CanvasKit.MakeWebGLCanvasSurface(canvas);
      const paint = new CanvasKit.Paint();
      paint.setColor(CanvasKit.Color4f(0.9, 0, 0, 1.0));
      paint.setStyle(CanvasKit.PaintStyle.Fill);
      paint.setAntiAlias(true);
      const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 25, 15);
      surface?.drawOnce((cvs) => {
        cvs.clear(CanvasKit.WHITE);
        cvs.drawRRect(rr, paint);
      });
    })
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <div>
        <canvas id="canvas" type="webgl2"/>
      </div>      
    </View>
  )
}
