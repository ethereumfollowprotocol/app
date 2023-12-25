import * as React from 'react'

const TagsContext = React.createContext<boolean>(false)

export function Tags() {
  const [open, setOpen] = React.useState(false)
  return (
    <TagsContext.Provider value={open}>
      <p>lorem ipsum</p>
    </TagsContext.Provider>
  )
}
