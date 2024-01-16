export default function useLocalStorage(key:string) {
  
  const getValue = () => {
    const storedValue = window.localStorage.getItem(key)
    if(storedValue) return JSON.parse(storedValue)
    return null
  }

  const setValue = (value:unknown):void => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const removeValue = ():void => {
    window.localStorage.removeItem(key)
  }
  
  return {getValue, setValue, removeValue}
  
}