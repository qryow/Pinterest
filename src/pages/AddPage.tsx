import React, { FC } from 'react'
import Create from '../ui/components/Create'

const AddPage: FC = () => {
  return (
    //! не надо использовать фрагмент где лишь один элемент 
    <>
      <Create />
    </>
  )
}

export default AddPage