<template>
  <div class="template-container">
    <!-- cesium容器 -->
    <div id="cesium-container" class="cesium-container"></div>
    <!-- 比例尺面板 -->
    <div class="scale-container">
      <div class="scale-label">{{ distanceLabel || "out of range" }}</div>
      <div
        v-if="barWidth"
        class="scale-bar"
        :style="{ width: barWidth + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
var viewer;
export default {
  name: "HelloWorld",
  data() {
    return {
      distanceLabel: undefined,
      barWidth: undefined
    };
  },
  mounted() {
    this.initCesium();
  },
  methods: {
    initCesium() {
      let that = this;
      viewer = new Cesium.Viewer("cesium-container", {
        animation: false, //动画控制，默认true
        baseLayerPicker: false, //地图切换控件(底图以及地形图)是否显示,默认显示true
        fullscreenButton: false, //全屏按钮,默认显示true
        sceneModePicker: false, // 3D/2D切换按钮，默认显示true
        navigationHelpButton: false, //导航帮助按钮，默认显示true
        geocoder: false, //地名查找,默认true
        timeline: false, //时间线,默认true
        vrButton: false, //双屏模式,默认不显示false
        homeButton: false, //主页按钮，默认true
        infoBox: false //点击要素之后显示的信息,默认true
        // terrainProvider: Cesium.createWorldTerrain() //默认地形
      });

      // 去除左下角的logo
      viewer._cesiumWidget._creditContainer.style.display = "none";

      // 场景变化监听事件
      viewer.scene.postRender.addEventListener(function() {
        that.cesiumScale();
      });
    },
    // 比例尺
    cesiumScale() {
      var geodesic = new Cesium.EllipsoidGeodesic();
      var distances = [
        1,
        2,
        3,
        5,
        10,
        20,
        30,
        50,
        100,
        200,
        300,
        500,
        1000,
        2000,
        3000,
        5000,
        10000,
        20000,
        30000,
        50000,
        100000,
        200000,
        300000,
        500000,
        1000000,
        2000000,
        3000000,
        5000000,
        10000000,
        20000000,
        30000000,
        50000000
      ];
      // Find the distance between two pixels at the bottom center of the screen.
      let scene = viewer.scene;
      let width = scene.canvas.clientWidth;
      let height = scene.canvas.clientHeight;

      let left = scene.camera.getPickRay(
        new Cesium.Cartesian2((width / 2) | 0, height - 1)
      );
      let right = scene.camera.getPickRay(
        new Cesium.Cartesian2((1 + width / 2) | 0, height - 1)
      );

      let globe = scene.globe;
      let leftPosition = globe.pick(left, scene);
      let rightPosition = globe.pick(right, scene);

      if (!Cesium.defined(leftPosition) || !Cesium.defined(rightPosition)) {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
        return;
      }

      let leftCartographic = globe.ellipsoid.cartesianToCartographic(
        leftPosition
      );
      let rightCartographic = globe.ellipsoid.cartesianToCartographic(
        rightPosition
      );

      geodesic.setEndPoints(leftCartographic, rightCartographic);
      let pixelDistance = geodesic.surfaceDistance;

      // Find the first distance that makes the scale bar less than 100 pixels.
      let maxBarWidth = 100;
      let distance;
      for (
        let i = distances.length - 1;
        !Cesium.defined(distance) && i >= 0;
        --i
      ) {
        if (distances[i] / pixelDistance < maxBarWidth) {
          distance = distances[i];
        }
      }

      if (Cesium.defined(distance)) {
        var label =
          distance >= 1000
            ? (distance / 1000).toString() + " km"
            : distance.toString() + " m";
        this.barWidth = (distance / pixelDistance) | 0;
        this.distanceLabel = label;
      } else {
        this.barWidth = undefined;
        this.distanceLabel = undefined;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.template-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.cesium-container {
  width: 100%;
  height: 100%;
}
.scale-container {
  position: absolute;
  z-index: 1001;
  left: 0;
  bottom: 0;
  width: 120px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(10, 31, 59, 0.7);
}
.scale-label {
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.scale-bar {
  position: relative;
  padding-top: 10px;
}
.scale-bar::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  border: 1px solid #fff;
  border-top: none;
  left: 0;
  bottom: 0;
}
</style>
