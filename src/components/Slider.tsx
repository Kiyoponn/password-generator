import { create } from 'zustand'
import * as RadixSlider from '@radix-ui/react-slider'

type State = {
  length: number
}

type Action = {
  setLength: (length: number) => void
}

export const useLengthStore = create<State & Action>((set) => ({
  length: 8,
  setLength: (length: number) => set({ length }),
}))

export default function Slider() {
  const [length, setLength] = useLengthStore((state) => [
    state.length,
    state.setLength,
  ])

  return (
    <RadixSlider.Root
      className='SliderRoot'
      max={20}
      step={1}
      aria-label='Volume'
      defaultValue={[length]}
      onValueChange={(value) => {
        setLength(value[0])
      }}
    >
      <RadixSlider.Track className='SliderTrack'>
        <RadixSlider.Range className='SliderRange' />
      </RadixSlider.Track>
      <RadixSlider.Thumb className='SliderThumb' />
    </RadixSlider.Root>
  )
}
