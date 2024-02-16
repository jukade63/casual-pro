import React from 'react'

export default function JobPostDetail({job}: {job: JobPost}) {
  return (
    <div>
      <h2>About this role</h2>
      <p>{job.description}</p>
    </div>
  )
}
