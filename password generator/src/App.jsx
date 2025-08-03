import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
 const [length,setlength] = useState(8)
 const [numall, setnumall] = useState(false)
 const [charall, setcharall] = useState(false) 
 const [password,setpassword] = useState("")

  //useRef hook
  const passRef = useRef(null)


 const passwordgenerator = useCallback(()=>{
   let pass = ""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz"

   if(numall) str += "1234567890"
   if(charall) str += "?:{}[]&*^%$#@!~"

   for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random()*str.length + 1)
    pass += str.charAt(char)
   }

   setpassword(pass);
 },[length,numall,charall,setpassword])

 const copypasswordtoclipboard = useCallback(() => {
  passRef.current?.select()
  passRef.current?.setSelectionRange(0,1000)
  window.navigator.clipboard.writeText(password)
 },
 [password])
   
  useEffect(() => {
    passwordgenerator()
  },[length,numall,charall,passwordgenerator])
  return (
   
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
      <h1 className='text-center text-white'>Password generator</h1>
      <div className='className = "flex shadow rounded-lg overflow-hidden mb-4"'>
        <input 
        type="text" 
        value={password} 
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passRef}
        />
        <button
        onClick={copypasswordtoclipboard}
        className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
          className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}
          }
          />
          <label>Length:{length} </label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
            type="checkbox"
            defaultChecked = {numall}
            id='numerinput'
          onChange={() => {setnumall((prev) => !prev)}}
          />
        <label htmlFor='numberinput'>Numbers</label>
        </div> <div className='flex items-center gap-x-1'>
        <input
            type="checkbox"
            defaultChecked = {charall}
            id='characterinput'

          onChange={() => {
            setcharall((prev) => !prev)
          }}

          />
        <label htmlFor='characterinput'>Characters</label>
        </div>

   </div>
</div>
    
  )
}

export default App
