import { Task } from '@/app/models/Task';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('http://localhost:3001/tasks')
  console.log(res);
  const tasks: Task[] = await res.json()
  // Pass data to the page via props
  console.log(tasks);
  return { props: { tasks } }
}) satisfies GetServerSideProps<{ tasks: Task[] }>
 
export default function Page({
    tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
    <div>
        {tasks.map(({id, text}) => (
            <div>{id} - {text} </div>
        ))}
    </div>
    </>

  )
}