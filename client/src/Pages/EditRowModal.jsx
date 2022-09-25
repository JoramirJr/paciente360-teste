import { useContext, useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"

import { makeStyles } from "@mui/styles"

import InputMask from 'react-input-mask'

import { useEditRow } from "../Hooks/useData"
import DataContext from "../Providers/DataContext"

const useStyles = makeStyles(() => ({
    closeIconButton: {
        cursor: "pointer",
        float: "right",
        marginLeft: "-22px",
        marginTop: "-5px",
    },
    inputGridSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        marginTop: '2em'
    }
}))

export default function NewRowModal() {
    const { goBack } = useHistory()
    const { id } = useParams()
    const dialogContentEl = useRef()
    const classes = useStyles()
    const [, , setRefetch,] = useContext(DataContext)
    const [handleEditRow, data, setData, profs, selectedProf] = useEditRow(id)

    return (
        <Dialog
            open
            fullWidth
            maxWidth="sm"
            disableBackdropClick
            onClose={goBack}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogContent ref={dialogContentEl} >

                <div className={classes.closeIconButton}>
                    <CloseIcon onClick={goBack} />
                </div>

                <div className={classes.inputGridSection} >

                    <TextField label="Nome" value={data.pes_nome} onChange={e => setData(prev => ({ ...prev, pes_nome: e.target.value }))} />

                    <InputMask
                        mask="9999/99/99"
                        value={data.pes_data_nascimento}
                        onChange={e => setData(prev => ({ ...prev, pes_data_nascimento: e.target.value }))}>
                        {(inputProps) => <TextField label="Data Nascimento" {...inputProps} />}
                    </InputMask>

                    <InputMask
                        mask="999.999.999-99"
                        value={data.pes_cpf}
                        onChange={e => setData(prev => ({ ...prev, pes_cpf: e.target.value }))}>
                        {(inputProps) => <TextField label="CPF" {...inputProps} />}
                    </InputMask>

                    <InputMask
                        mask="(99) 9999-9999"
                        value={data.pes_telefone}
                        onChange={e => setData(prev => ({ ...prev, pes_telefone: e.target.value }))}>
                        {(inputProps) => <TextField label="Telefone" {...inputProps} />}
                    </InputMask>
                    {console.log(data.prof_id)}
                    <TextField
                        select
                        SelectProps={{
                            native: true,
                        }}
                        fullWidth
                        value={data.prof_id}
                        variant="outlined"
                        onChange={e => setData(prev => ({ ...prev, prof_id: e.target.value }))}
                    >
                        <option value=""></option>
                        {profs.map(profission => <option value={profission.prof_id} >{profission.prof_name}</option>)}
                    </TextField>

                    <TextField label="Observações" value={data.pes_observacoes} onChange={e => setData(prev => ({ ...prev, pes_observacoes: e.target.value }))} />

                </div>

            </DialogContent>
            <DialogActions >
                <Button onClick={() => {
                    handleEditRow(setRefetch)
                    goBack()
                }}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )

}