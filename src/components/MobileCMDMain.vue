<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFullScreen: false,
      zypStickTop: "45%",
      zypStickLeft: "45%",
      ZInput: 0,
      YPrimeInput: 0,
      zypStickInitialPosition: { x: 0, y: 0 },
      inputDirection: false,
      zypStickIndiSize: 5,
      XY: {
        input: { roll: 0, pitch: 0 },
        xyStickPosition: { left: "", top: "" },
        stickSize: 6,
        containerBorderSize: 0,
      },
      TouchID: {
        XY: 0,
        ZYP: 0,
      } /*index of the touch for the specific controls*/,
    };
  },
  mounted() {
    document.addEventListener("touchmove", (e) => {
      this.GlobalTouchIdentifier(e);
    });
  },
  methods: {
    emitFlightInput() {
      this.$emit("FlightInputOnChange", {
        rollRate: parseFloat(this.XY.input.roll),
        pitchRate: parseFloat(this.XY.input.pitch),
        yawRate: parseFloat(this.YPrimeInput),
        altRate: parseFloat(this.ZInput),
      });
    },
    normalizePositionDelta(x: number, y: number) {
      let screenWidth = document.documentElement.clientWidth;
      let screenHeight = document.documentElement.clientHeight;
      if (
        rangeScaler(
          Math.abs(x - this.zypStickInitialPosition.x),
          0,
          screenWidth,
          0,
          200
        ) >
        rangeScaler(
          Math.abs(y - this.zypStickInitialPosition.y),
          0,
          screenHeight,
          0,
          180
        )
      ) {
        return "x";
      } else {
        return "y";
      }
    },
    GlobalTouchIdentifier(e: Event) {
      for (let ix = 0; ix < e.touches.length; ix++) {
        let XY_XinPercentage = this.GlobalStickPositionToLocal(
          "x",
          72.5,
          98.125,
          "XY",
          ix,
          e
        );
        let XY_YinPercentage = this.GlobalStickPositionToLocal(
          "y",
          53.333333333,
          98.888333333,
          "XY",
          ix,
          e
        );
        let ZYP_XinPercentage = this.GlobalStickPositionToLocal(
          "x",
          0.625,
          26.625,
          "ZYP",
          ix,
          e
        );
        let ZYP_YinPercentage = this.GlobalStickPositionToLocal(
          "y",
          53.333333333,
          98.888333333,
          "ZYP",
          ix,
          e
        );
        if (
          XY_XinPercentage >= 0 &&
          XY_XinPercentage <= 100 &&
          XY_YinPercentage >= 0 &&
          XY_YinPercentage <= 100
        ) {
          this.TouchID.XY = ix;
        }
        if (
          ZYP_XinPercentage >= 0 &&
          ZYP_XinPercentage <= 100 &&
          ZYP_YinPercentage >= 0 &&
          ZYP_YinPercentage <= 100
        ) {
          this.TouchID.ZYP = ix;
        }
      }
    },
    zypTrackIndiStyleController(axis_id: string) {
      if (axis_id == this.inputDirection) {
        return "#0500FF;";
      } else {
        return "#444;";
      }
    },
    GlobalStickPositionToLocalHelper(
      RelativeTouchIndex: number,
      controlGroupID: string
    ) {
      if (RelativeTouchIndex == -1) {
        return this.TouchID[controlGroupID];
      } else {
        return RelativeTouchIndex;
      }
    },
    GlobalStickPositionToLocal(
      screenAxisId: string,
      minGlobalPercentage: number,
      maxGlobalPercentage: number,
      controlGroupID: string,
      RelativeTouchIndex: number,
      event: Event
    ) {
      if (screenAxisId == "x") {
        return rangeScaler(
          percentage(
            event.touches[
              this.GlobalStickPositionToLocalHelper(
                RelativeTouchIndex,
                controlGroupID
              )
            ].clientX,
            document.documentElement.clientWidth
          ),
          minGlobalPercentage,
          maxGlobalPercentage,
          0,
          100
        );
      } else {
        return rangeScaler(
          percentage(
            event.touches[
              this.GlobalStickPositionToLocalHelper(
                RelativeTouchIndex,
                controlGroupID
              )
            ].clientY,
            document.documentElement.clientHeight
          ),
          minGlobalPercentage,
          maxGlobalPercentage,
          0,
          100
        );
      }
    },
    xyStickOnTouchStart() {
      this.XY.stickSize = 9;
      this.XY.containerBorderSize = 1;
    },
    xyStickOnTouchEnd() {
      this.XY.xyStickPosition.left = "";
      this.XY.xyStickPosition.top = "";
      this.XY.input.roll = 0;
      this.XY.input.pitch = 0;
      this.XY.stickSize = 6;
      this.XY.containerBorderSize = 0;
    },
    xyStickOnMove(e: Event) {
      let XinPercentage = this.GlobalStickPositionToLocal(
        "x",
        72.5,
        98.125,
        "XY",
        -1,
        e
      );
      let YinPercentage = this.GlobalStickPositionToLocal(
        "y",
        53.333333333,
        98.888333333,
        "XY",
        -1,
        e
      );
      let stickOffset = 7;
      if (XinPercentage >= 0 && XinPercentage <= 100) {
        this.XY.xyStickPosition.left = XinPercentage - stickOffset + "%";
        this.XY.input.roll = rangeScaler(
          XinPercentage,
          0,
          100,
          -35,
          35
        ).toFixed(2);
      }
      if (YinPercentage >= 0 && YinPercentage <= 100) {
        this.XY.xyStickPosition.top = YinPercentage - stickOffset + "%";
        this.XY.input.pitch =
          rangeScaler(YinPercentage, 0, 100, -30, 30).toFixed(2) * -1;
      }
      this.emitFlightInput();
    },
    zypStickOnTouchStart(e: Event) {
      this.zypStickIndiSize = 6;
      this.zypStickInitialPosition = {
        x: e.touches[this.TouchID["ZYP"]].clientX,
        y: e.touches[this.TouchID["ZYP"]].clientY,
      };
    },
    zypStickOnTouchEnd(e: Event) {
      this.zypStickIndiSize = 5;
      this.zypStickTop = "45%";
      this.zypStickLeft = "45%";
      this.ZInput = 0;
      this.YPrimeInput = 0;
      this.inputDirection = false;
      this.zypStickInitialPosition = { x: 0, y: 0 };
      this.emitFlightInput();
    },
    zypStickOnMove(e: Event) {
      let offset = 5;
      if (this.ZInput == 0) {
        setTimeout(() => {
          this.inputDirection = this.normalizePositionDelta(
            e.touches[this.TouchID["ZYP"]].clientX,
            e.touches[this.TouchID["ZYP"]].clientY
          );
        }, 75);
      }
      if (this.inputDirection == "y") {
        let inPercentage = this.GlobalStickPositionToLocal(
          "y",
          53.333333333,
          98.888333333,
          "ZYP",
          -1,
          e
        );
        let currentZIn = rangeScaler(inPercentage, 0, 100, -10, 10) * -1;
        if (currentZIn < 10 && currentZIn > -10) {
          this.ZInput = currentZIn.toFixed(2);
          this.zypStickTop = inPercentage - offset + "%";
        }
        this.YPrimeInput = 0;
        this.zypStickLeft = "45%";
      } else {
        let inPercentage = this.GlobalStickPositionToLocal(
          "x",
          0.625,
          26.625,
          "ZYP",
          -1,
          e
        );
        let currentYPrimeIn = rangeScaler(inPercentage, 0, 100, -10, 10);
        if (currentYPrimeIn < 10 && currentYPrimeIn > -10) {
          this.YPrimeInput = currentYPrimeIn.toFixed(2);
          this.zypStickLeft = inPercentage - offset + "%";
        }
        this.zypStickTop = "45%";
        this.ZInput = 0;
      }
      this.emitFlightInput();
    },
    FullScreenButtonTextController() {
      if (this.isFullScreen) {
        return "Exit Full Screen";
      } else {
        return "Go Full Screen";
      }
    },
    onFullScreenButtonClick() {
      if (!this.isFullScreen) {
        document.documentElement.requestFullscreen();
        this.isFullScreen = true;
      } else {
        document.exitFullscreen().then((r) => {});
        this.isFullScreen = false;
      }
    },
  },
};
</script>

<template>
  <div id="xy_controls_container" :style="`border: solid ${XY.containerBorderSize}px #0500FF;`">
    <div
      :style="`left: ${XY.xyStickPosition.left}; top: ${XY.xyStickPosition.top}; width: ${XY.stickSize}vh; height: ${XY.stickSize}vh;`"
      @touchstart="xyStickOnTouchStart"
      @touchmove="xyStickOnMove"
      @touchend="xyStickOnTouchEnd"
      id="xy_stick"
    ></div>
  </div>
  <div id="zyp_controls_container">
    <div
      @touchstart="zypStickOnTouchStart"
      @touchend="zypStickOnTouchEnd"
      @touchmove="zypStickOnMove"
      id="z_track"
      class="track"
    >
      <VerticalLine
        id="z_track_indi"
        v-if="zypStickInitialPosition.x != 0 || zypStickInitialPosition.y != 0"
        :color="zypTrackIndiStyleController('y')"
      ></VerticalLine>
      <VerticalLine
        id="z_track_mini_indi"
        v-if="zypStickInitialPosition.x == 0 || zypStickInitialPosition.y == 0"
        color="#0500FF"
      ></VerticalLine>
    </div>
    <div id="YPrime_track" class="track">
      <HorizontalLine
        id="yprime_track_indi"
        v-if="zypStickInitialPosition.x != 0 || zypStickInitialPosition.y != 0"
        :color="zypTrackIndiStyleController('x')"
      ></HorizontalLine>
      <HorizontalLine
        id="yprime_track_mini_indi"
        v-if="zypStickInitialPosition.x == 0 || zypStickInitialPosition.y == 0"
        color="#0500FF"
      ></HorizontalLine>
    </div>
    <div
      :style="`top: ${zypStickTop}; left: ${zypStickLeft}; width: ${zypStickIndiSize}vh; height: ${zypStickIndiSize}vh;`"
      id="zyp_stick_indi"
    ></div>
    <div
      @touchstart="zypStickOnTouchStart"
      :style="`top: ${zypStickTop}; left: ${zypStickLeft}`"
      @touchend="zypStickOnTouchEnd"
      @touchmove="zypStickOnMove"
      id="zyp_stick"
    ></div>
  </div>
  <BaseLabel
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
  <BaseLabel id="alt_input_display" v-text="`Alt: ${ZInput}m/s`"></BaseLabel>
  <BaseLabel
    id="yaw_input_display"
    v-text="`Yaw: ${YPrimeInput}°/s`"
  ></BaseLabel>
  <BaseLabel
    id="pitch_input_display"
    v-text="`Pitch: ${XY.input.pitch}°/s`"
  ></BaseLabel>
  <BaseLabel
    id="roll_input_display"
    v-text="`Roll: ${XY.input.roll}°/s`"
  ></BaseLabel>
</template>

<style scoped>
@keyframes track_indi_ani {
  0% {
    transform: scale(0, 0);
  }
  100% {
    transform: scale(100%, 100%);
  }
}

#zyp_controls_container {
  position: absolute;
  top: 53.333333333%;
  left: 0.625%;
  height: 45.555555555556vh;
  width: 45.555555555556vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0500ff00;
  overflow: hidden;
}
.track {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color linear 0.1s;
}
#z_track {
  position: absolute;
  height: 100%;
  width: 10vh;
  background-color: #ffffff01;
}
#z_track_indi {
  top: 0%;
  height: 100%;
  animation: track_indi_ani ease-out 0.1s;
}
#z_track_mini_indi {
  height: 5vh;
}
#yprime_track_indi {
  left: 0%;
  width: 100%;
  animation: track_indi_ani ease-out 0.1s;
}
#yprime_track_mini_indi {
  width: 5vh;
}
#YPrime_track {
  width: 100%;
  height: 10vh;
  background-color: #ffffff01;
}
#zyp_stick {
  position: absolute;
  width: 8vh;
  height: 8vh;
  background-color: #ffffff00;
  transform: rotate(-45deg);
  z-index: 50;
}
#zyp_stick_indi {
  position: absolute;
  width: 5vh;
  height: 5vh;
  transform: rotate(-45deg);
  background-color: #0500ff80;
  z-index: 2;
  transition: width linear 0.1s, height linear 0.1s;
}
#alt_input_display,
#yaw_input_display,
#pitch_input_display,
#roll_input_display {
  top: 40.277777778%;
  left: 24.375%;
  font-size: 4vh;
}
#yaw_input_display {
  left: 44.375%;
}
#pitch_input_display {
  left: 44.375%;
  top: 45%;
}
#roll_input_display {
  top: 50%;
  left: 44.375%;
}
#xy_controls_container {
  position: absolute;
  top: 53.333333333%;
  left: 72.5%;
  height: 45.555555555556vh;
  width: 45.555555555556vh;
  background-color: #ffffff00;
  border: solid 1px #0500ff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#xy_stick {
  position: absolute;
  width: 7vh;
  height: 7vh;
  background-color: #0500ff80;
  border: solid 1px #0500ff;
  border-radius: 1500px;
}
#fs_btn {
  top: 5%;
  left: 5%;
  width: 20%;
  height: 13%;
  font-size: 4.1vh;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>