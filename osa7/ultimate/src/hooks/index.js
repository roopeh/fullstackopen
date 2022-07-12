import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (error) { }
    })()
  }, [baseUrl])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat({ ...resource, id: response.data.id }))
    } catch (error) { }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
