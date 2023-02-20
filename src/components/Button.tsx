import { FiArrowRight } from 'react-icons/fi'

export default function GenerateButton() {
  return (
    <button
      type='submit'
      className='bg-accent flex justify-center items-center px-6 py-4 w-full active:text-accent active:bg-tertiary border-2 border-accent focus:ring-offset-0 focus:ring-opacity-40 focus:ring-accent focus:ring outline-none'
    >
      <span className='text-lg uppercase'>Generate</span>
      <FiArrowRight className='w-6 h-6 ml-3' />
    </button>
  )
}
