import Link from 'next/link'
import React, { useEffect } from 'react'

const CourseBox = ({className,uid}) => {

  return (
    <Link href={`/courses/${uid}`}>
    <div className={`w-70 min-w-[300px] text-lg h-40 p-10 bg-green-400 `} >
        <p>{className}</p>
        <p>{uid}</p>

        <p>Professor Name</p>
        
        <div>

        </div>
    </div>
    </Link>
  )
}

export default CourseBox