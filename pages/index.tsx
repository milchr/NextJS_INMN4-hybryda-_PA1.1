
import { Task } from '@/models/Task';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from 'next/link';
import Router from 'next/router'
 
 
export const getServerSideProps = (async () => {
  const res = await fetch('http://localhost:3001/tasks')
  const tasks: Task[] = await res.json()
  console.log(tasks);
  return { props: { tasks } }
}) satisfies GetServerSideProps<{ tasks: Task[] }>
 
export default function Page({
    tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
    <div className='container'>
      <h1>Todo list</h1>
      <Link className ="create-task-button" href="/task/create">Add task</Link>
      <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-item">
              <div className="done-column">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleDone(task)}
                />
              </div>
              <div className="text-column">
                <span className="task-desc">{task.text}</span>
              </div>
              <div className="task-buttons">
                  <Link href={{pathname: `/task/${task.id}/edit`, query: { currentText: task.text } }} className="edit-button">Edit</Link>
                  <button onClick={() => handleDeleteTask(task)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
      </ul>    
    </div>
    </>
  )
}


async function handleDeleteTask(task: Task) {
  const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
    method: 'DELETE'
  });
  Router.push('/')
}

async function handleDone(task: Task) {
  task.done = !task.done;
  const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  Router.push('/')
}