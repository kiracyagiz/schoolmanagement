import Link from 'next/link'
import React from 'react'

const CourseBox = ({className,uid}) => {
  console.log(uid,'asddsadsadsadsa')
  return (
    <Link href={`/courses/${uid}`}>
    <div className={`w-70 min-w-[300px] text-lg h-40 p-10 bg-green-400 `} >
        <p>{className}</p>
        <p>{uid}</p>

        <p>Professor Name</p>
        
    </div>
    </Link>
  )
}

export default CourseBox