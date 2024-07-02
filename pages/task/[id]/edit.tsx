import { FormEvent } from "react"
import Router, { useRouter } from 'next/router'

export default function Edit() {
    const router = useRouter();
    console.log(router.query);
    

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()


        const formData = new FormData(event.currentTarget)
        let text = formData.get("text") as string;  
        const response = await fetch(`http://localhost:3001/tasks/${router.query.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
     
        Router.push('/')
      }
     
      return (

        <form className="edit-form" id="edit-form" onSubmit={onSubmit}>
          <label htmlFor="text">Text:</label>
          <input type="text" id="text" name="text" defaultValue={router.query.currentText} />
          <button type="submit">Submit</button>
        </form>
      )
}