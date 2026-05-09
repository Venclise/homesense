import Categorires from '@/sections/Categories'
import Hero from '@/sections/Hero'
import NewIn from '@/sections/NewIn'
import Rooms from '@/sections/Rooms'
import React from 'react'

export default function page() {
  return (
    <div>
      <Hero />
      <Categorires />
      <NewIn />
      <Rooms />
    </div>
  )
}
