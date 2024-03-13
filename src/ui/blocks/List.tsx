import React, { FC } from 'react'
import { ListProps } from '../../types/modalTypes'

export default function List<T>(props: ListProps<T>) {
  return (
    <>
      {props.items.map(props.renderItem)}
    </>
  )
}