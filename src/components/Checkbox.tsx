import { create } from 'zustand'
import { PasswordOptions } from '../utils'

type State = {
  checked: boolean[]
}

type Action = {
  setChecked: (checked: boolean[]) => void
}

export const useCheckedStore = create<State & Action>((set) => ({
  checked: new Array(PasswordOptions.length).fill(false),
  setChecked: (checked: boolean[]) => set({ checked }),
}))

export default function Checkbox() {
  const [checked, setChecked] = useCheckedStore((state) => [
    state.checked,
    state.setChecked,
  ])

  const checkPasswordOptions = (position: number) => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item
    )

    setChecked(updatedCheckedState)
  }

  return (
    <div className='flex flex-col gap-4 mb-10'>
      {PasswordOptions.map((option, index) => {
        return (
          <div key={index}>
            <input
              className='border-2 appearance-none bg-tertiary text-accent focus:ring-offset-0 focus:ring-opacity-50 hover:border-accent focus:ring-accent focus:ring w-5 h-5 cursor-pointer'
              type='checkbox'
              name={option}
              value={option}
              id={`option-${index}`}
              onChange={() => checkPasswordOptions(index)}
            />
            <label className='ml-4 capitalize' htmlFor={`option-${index}`}>
              Include {option}
            </label>
          </div>
        )
      })}
      {!checked.includes(true) && (
        <em className='text-red-500 font-light text-sm -mb-2'>
          select at least 1 option :)
        </em>
      )}
    </div>
  )
}
