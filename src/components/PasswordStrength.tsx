import { create } from 'zustand'
import { colors } from '../utils'

type Store = {
  strength: number
}

type Action = {
  setStrength: (strength: number) => void
}

export const useStrengthStore = create<Store & Action>((set) => ({
  strength: 0,
  setStrength: (strength: number) => set({ strength }),
}))

export default function PasswordStrength() {
  const strength = useStrengthStore((state) => state.strength)

  return (
    <div className='bg-primary h-16 px-4 mb-6 flex items-center'>
      <p className='text-left uppercase text-gray-400'>Strength</p>
      <div className='flex-1 flex items-center justify-end gap-2'>
        <div className='uppercase text-lg md:mr-3'>
          {strength === 4
            ? 'strong'
            : strength === 0 || strength === 1
            ? 'weak'
            : 'medium'}
        </div>
        <div
          className={`border h-8 w-3 ${
            strength === 4
              ? colors.green
              : strength === 0 || strength === 1
              ? colors.red
              : colors.yellow
          }`}
        />
        <div
          className={`border h-8 w-3 ${
            strength === 4
              ? colors.green
              : strength === 0 || strength === 1
              ? colors.none
              : colors.yellow
          }`}
        />
        <div
          className={`border h-8 w-3 ${
            strength === 4
              ? colors.green
              : strength === 3
              ? colors.yellow
              : colors.none
          }`}
        />
        <div
          className={`border h-8 w-3 ${
            strength === 4 ? colors.green : colors.none
          }`}
        />
      </div>
    </div>
  )
}
