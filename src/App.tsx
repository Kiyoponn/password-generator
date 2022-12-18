import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiCopy } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  checkPasswordStrength,
  colors,
  copyToClipboard,
  generatePassword,
  PasswordOptions
} from './utils'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)
  const [checkedState, setCheckedState] = useState(
    new Array(PasswordOptions.length).fill(false)
  )

  const notify = () => {
    if (password === '' || password === null) {
      return toast.error('Please generate password to copy!', {
        progressClassName: 'bg-red-500'
      })
    }
    toast.success('Password copied to clipboard!', {
      progressClassName: 'bg-accent'
    })
  }

  const checkPasswordOptions = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )

    setCheckedState(updatedCheckedState)
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
    <main className='flex flex-col justify-center text-gray-50 h-full'>
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
                  try with at least 8 characters
                </em>
              )}
              <input
                type='range'
                min={1}
                max={20}
                step={1}
                defaultValue={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                name='characters'
                id='characters'
                className='focus:outline focus:outline-accent w-full appearance-none active:outline-none'
              />
            </div>
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
                    <label
                      className='ml-4 capitalize'
                      htmlFor={`option-${index}`}
                    >
                      Include {option}
                    </label>
                  </div>
                )
              })}
              {!checkedState.includes(true) && (
                <em className='text-red-500 font-light text-sm -mb-2'>
                  select at least 1 option
                </em>
              )}
            </div>
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
                ></div>
                <div
                  className={`border h-8 w-3 ${
                    strength === 4
                      ? colors.green
                      : strength === 0 || strength === 1
                      ? colors.none
                      : colors.yellow
                  }`}
                ></div>
                <div
                  className={`border h-8 w-3 ${
                    strength === 4
                      ? colors.green
                      : strength === 3
                      ? colors.yellow
                      : colors.none
                  }`}
                ></div>
                <div
                  className={`border h-8 w-3 ${
                    strength === 4 ? colors.green : colors.none
                  }`}
                ></div>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='bg-accent flex justify-center items-center px-6 py-4 w-full active:text-accent active:bg-tertiary border-2 border-accent focus:ring-offset-0 focus:ring-opacity-40 focus:ring-accent focus:ring outline-none'
              >
                <span className='text-lg uppercase'>Generate</span>
                <FiArrowRight className='w-6 h-6 ml-3' />
              </button>
            </div>
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
    </main>
  )
}

export default App
