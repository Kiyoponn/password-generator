import { useEffect, useState } from 'react'
import { FiCopy } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GenerateButton from './components/Button'
import Slider, { useLengthStore } from './components/CharacterSlider'
import Checkbox, { useCheckedStore } from './components/Checkbox'
import PasswordStrength from './components/StrengthChecker'

import {
  checkPasswordStrength,
  copyToClipboard,
  generatePassword,
} from './utils'

function App() {
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)
  const checkedState = useCheckedStore((state) => state.checked)
  const length = useLengthStore((state) => state.length)

  const notify = () => {
    if (password === '' || password === null) {
      return toast.error('Please generate password to copy!', {
        progressClassName: 'bg-red-500',
      })
    }
    toast.success('Password copied to clipboard!', {
      progressClassName: 'bg-accent',
    })
  }

  const getNumberOfCharacters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const input = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement
    const value = input.value

    copyToClipboard(value)
  }

  const getPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPassword(generatePassword(length, checkedState))
  }

  useEffect(() => {
    setStrength(checkPasswordStrength(password))
  }, [password])

  return (
    <div className='flex flex-col justify-center text-gray-50 h-full'>
      <div className='max-w-3xl sm:w-[480px] mx-auto'>
        <h3 className='text-gray-400 mb-4 text-center'>Password Generator</h3>
        <div className='mb-4 flex justify-between items-center px-4 bg-tertiary'>
          <input
            className='bg-tertiary font-bold text-lg p-0 h-16 border-none focus:outline-none focus:ring-0'
            type='text'
            name='password'
            placeholder='P4$5W0rD!'
            disabled={true}
            value={password}
          />
          <button
            className='active:text-gray-100 text-accent focus:outline-none focus:ring-1 focus:ring-accent'
            onClick={(e) => {
              notify()
              getNumberOfCharacters(e)
            }}
          >
            <FiCopy className='h-7 w-7' />
          </button>
        </div>
        <div className='bg-tertiary px-8 py-6 md:pt-6 md:pb-8'>
          <form
            onSubmit={(e) => {
              getPassword(e)
              setStrength(checkPasswordStrength(password))
            }}
          >
            <div className='mb-6'>
              <div className='flex justify-between items-end mb-2'>
                <h5>Character Length</h5>
                <p className='text-2xl text-accent'>{length}</p>
              </div>
              {length < 8 && (
                <em className='text-red-500 block font-light text-sm mb-4'>
                  try with at least 8 characters ;)
                </em>
              )}
              <Slider />
            </div>
            <Checkbox />
            <PasswordStrength strength={strength} />
            <GenerateButton />
          </form>
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        newestOnTop={true}
        theme='dark'
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        bodyClassName='font-jbmono text-sm'
        closeButton={false}
        closeOnClick={true}
        toastStyle={{ background: '#24232b' }}
      />
    </div>
  )
}

export default App
