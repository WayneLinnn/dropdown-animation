export const FRAME_COUNT = 16

export const frames = Array.from({ length: FRAME_COUNT }, (_, index) => {
  const n = String(index + 1).padStart(3, "0")
  return `/frames/ezgif-frame-${n}.png`
})

export const scenes = [
  {
    value: "day",
    label: "Daytime",
    frame: 0,
    time: "09:00",
    copy: "South-facing frontage fills the living room and balcony with morning light.",
  },
  {
    value: "dusk",
    label: "Dusk",
    frame: 7,
    time: "18:30",
    copy: "Sunset pulls back across the water, the widest view from the upper floors.",
  },
  {
    value: "night",
    label: "Night",
    frame: 15,
    time: "21:00",
    copy: "City lights join up, and the full-height glass becomes the view itself.",
  },
] as const

export type SceneValue = (typeof scenes)[number]["value"]

export const sceneItems = scenes.map((scene) => ({
  label: scene.label,
  value: scene.value,
}))

/** Fired by the daylight section so the hero can scroll itself to that frame. */
export const SCENE_EVENT = "scene-select"

export function sceneFrame(value: SceneValue) {
  return scenes.find((scene) => scene.value === value)?.frame ?? 0
}

export function nearestScene(frameIndex: number): SceneValue {
  return scenes.reduce<SceneValue>((best, scene) => {
    const bestDist = Math.abs(sceneFrame(best) - frameIndex)
    const dist = Math.abs(scene.frame - frameIndex)
    return dist < bestDist ? scene.value : best
  }, "day")
}

export function sceneProgress(value: SceneValue) {
  return sceneFrame(value) / (FRAME_COUNT - 1)
}

export function requestScene(value: SceneValue) {
  window.dispatchEvent(new CustomEvent<SceneValue>(SCENE_EVENT, { detail: value }))
}
