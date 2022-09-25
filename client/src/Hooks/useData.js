import axios from 'axios'
import { useEffect, useState } from 'react'



export function useRemoveRow() {

    const handleRemoveRow = async (id, setRefetch) => {

        if (window.confirm("Tem certeza que deseja remover esse usuário?")) {


            await axios.delete(`http://localhost:3001/data/${id}`)
                .then(() => {

                    setRefetch(true)

                }
                )

        }

    }

    return handleRemoveRow

}


export function useEditRow(id) {
    const [data, setData] = useState(() => ({
        pes_nome: '',
        pes_data_nascimento: '',
        pes_cpf: '',
        pes_telefone: '',
        prof_id: null,
        pes_observacoes: ''
    }))

    const [profs, setProfs] = useState(() => [])
    const [selectedProf, setSelectedProf] = useState(() => null)

    useEffect(() => {

        setSelectedProf(data.prof_id)

    }, [data])

    useEffect(() => {

        axios.get(`http://localhost:3001/profs`).then((response) => { setProfs(response.data) })

    }, [])

    useEffect(() => {

        axios.get(`http://localhost:3001/data/${id}`).then(response => setData({
            pes_nome: response.data[0].pes_nome,
            pes_data_nascimento: response.data[0].pes_data_nascimento,
            pes_cpf: response.data[0].pes_cpf,
            pes_telefone: response.data[0].pes_telefone,
            pes_observacoes: response.data[0].pes_observacoes,
            prof_id: response.data[0].prof_id,
        }))

    }, [id])

    const handleEditRow = async (setRefetch) => {

        await axios.put(`http://localhost:3001/data/${id}`, data)
            .then(() => {

                setRefetch(true)

            }
            )

    }

    return [handleEditRow, data, setData, profs, selectedProf]

}

export function useCreateRow() {
    const [data, setData] = useState(() => ({
        pes_nome: '',
        pes_data_nascimento: '',
        pes_cpf: '',
        pes_telefone: '',
        prof_id: null,
        pes_observacoes: ''
    }))
    const [profs, setProfs] = useState(() => [])

    useEffect(() => {

        axios.get(`http://localhost:3001/profs`).then((response) => { setProfs(response.data) })

    }, [])

    const handleCreateRow = async (setRefetch) => {

        await axios.post(`http://localhost:3001/data`, data).then(() => {

            setRefetch(true)

        })

    }

    return [handleCreateRow, setData, profs]

}