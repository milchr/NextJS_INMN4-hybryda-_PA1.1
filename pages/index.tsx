
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
    <div>
      <h1>Todo list</h1>
      <Link href="/task/create">Add Task</Link>
      <ul className="task-list">
          {tasks.map(({id, text}) => (
            <li className="task-item">
              <span className="task-desc">{text}</span>
              <div className="task-buttons">
                  <Link href={{pathname: `/task/${id}/edit`, query: { currentText: text } }} className="edit-button">Edit</Link>
                  <button onClick={() => handleDeleteTask(id as number)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
      </ul>    
    </div>
    </>
  )
}


async function handleDeleteTask(id: number) {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: 'DELETE'
  });
  Router.push('/')
}