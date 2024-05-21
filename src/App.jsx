import {useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  //Ref Hook
  const passwordRef = useRef(null)

  const passGenerator =useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow) str+="0123456789";
    if(charAllow) str+="!@#$%^&*()-_=+<>[]{};:`~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword])//dependencies used for memoization and optimization

  const copyPass = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  },[password])

  // here if any change in the dependencies in the dependency array then it runs again
  useEffect(()=>{passGenerator()},[length,numAllow,charAllow, passGenerator]) 
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center mb-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className='outline-none bg-green-500 text-white px-3 py-0.5 shring-0'
            onClick={passGenerator}
          >
            regen
          </button>
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shring-0'
            onClick={copyPass}
          >
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}

            />
            <label>Length: {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numAllow}
            id="numberInput"
            onChange={()=>{
              setNumAllow((prev)=>!prev)}}

            />
            <label htmlFor='numberInput'>Numbers </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllow}
            id="charInput"
            onChange={()=>{
              setCharAllow((prev)=>!prev)}}

            />
            <label htmlFor='charInput'>Characters </label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
