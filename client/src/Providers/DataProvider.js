import { useState } from 'react'

import axios from 'axios'

import DataContext from './DataContext'
import { useEffect } from 'react'

function DataProvider({ children }) {
    const [data, setData] = useState(() => ([]))
    const [refetch, setRefetch] = useState(() => true)

    useEffect(() => {

        if (refetch) {

            axios.get(`http://localhost:3001/data`).then(response => {

                setData(response.data)
                setRefetch(false)
            })

        }

    }, [refetch])

    return <DataContext.Provider value={[data, setData, setRefetch, refetch]}>{children}</DataContext.Provider>


}

export default DataProvider