import { useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import axios from 'axios'
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"

import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [code,setCode]=useState(`function sum(){
    return a+b;}`)
  const [review,setReview]= useState(``)

  useEffect(()=>{
    prism.highlightAll()
  },[])

  async function reviewCode(){
    const response= await axios.post('http://localhost:3000/ai/get-review',{code})
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="head"></div>
        <div className="left">
          <div className="code">
            <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
           
            height: "100%",
            width: "100%"
  }}
/>

          </div>
          <div onClick={reviewCode}   className="review">REVIEW</div>
        </div>
        <div className="right"><Markdown
        rehypePlugins={[rehypeHighlight]}>{review}</Markdown></div>
      </main>
    </>
  )
}

export default App
