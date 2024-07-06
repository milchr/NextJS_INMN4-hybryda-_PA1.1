import { FormEvent } from "react"
import Router from 'next/router'



export default function Create() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget)
        let text = formData.get("text") as string; 
        const response = await fetch(`http://localhost:3001/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
     
        Router.push('/')
      }
     
      return (
        <div className="container">
          <form className="edit-form" onSubmit={onSubmit}>
            <label htmlFor="text">Task description</label>
            <input type="text" name="text" />
            <button type="submit">Create</button>
          </form>
        </div>
      )
}