import { useRef, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"

import { makeStyles } from "@mui/styles"

import InputMask from "react-input-mask"

import { useCreateRow } from '../Hooks/useData'

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
    const dialogContentEl = useRef()
    const classes = useStyles()
    const [, , setRefetch,] = useContext(DataContext)
    const [handleCreateRow, setData, profs] = useCreateRow()

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

                    <TextField label="Nome" onBlur={e => setData(prev => ({ ...prev, pes_nome: e.target.value }))} />

                    <InputMask
                        mask="9999/99/99"
                        onBlur={e => setData(prev => ({ ...prev, pes_data_nascimento: e.target.value }))}>
                        {(inputProps) => <TextField label="Data Nascimento" {...inputProps} />}
                    </InputMask>

                    <InputMask
                        mask="999.999.999-99"
                        onBlur={e => setData(prev => ({ ...prev, pes_cpf: e.target.value }))}>
                        {(inputProps) => <TextField label="CPF" {...inputProps} />}
                    </InputMask>

                    <InputMask
                        mask="(99) 9999-9999"
                        onBlur={e => setData(prev => ({ ...prev, pes_telefone: e.target.value }))}>
                        {(inputProps) => <TextField label="Telefone" {...inputProps} />}
                    </InputMask>

                    <TextField
                        select
                        SelectProps={{
                            native: true,
                        }}
                        fullWidth
                        defaultValue={null}
                        onChange={e => setData(prev => ({ ...prev, prof_id: e.target.value }))}
                    >
                        <option value=""></option>
                        {profs.map(profission => <option value={profission.prof_id} >{profission.prof_name}</option>)}
                    </TextField>

                    <TextField label="Observações" onBlur={e => setData(prev => ({ ...prev, pes_observacoes: e.target.value }))} />

                </div>

            </DialogContent>
            <DialogActions >
                <Button onClick={() => {
                    handleCreateRow(setRefetch)
                    goBack()
                }
                }>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )

}