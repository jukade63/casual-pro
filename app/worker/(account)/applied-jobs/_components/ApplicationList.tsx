import { getApplicationsByWorker } from '@/lib/api-requests/fetchers'
import React from 'react'
import ApplicationItem from './ApplicationItem'

export default async function ApplicationList() {
    const applications: Application[] = await getApplicationsByWorker()
  return (
    <div className='mx-auto space-y-4 mt-4'>
        {applications.length > 0 && applications?.map((application) => (
            <ApplicationItem key={application.id} application={application} isInFavorites={false}/>
        ))}
    </div>
  )
}
