import { useState, useRef, useMemo, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { makeStyles } from "@mui/styles"

import MoreVertIcon from "@mui/icons-material/MoreVert"

import { useRemoveRow } from '../Hooks/useData'

import DataContext from '../Providers/DataContext'

const useStyles = makeStyles((theme) => ({
    TableContainer: {
        maxWidth: '100vw'
    },
    table: {
        border: '1px solid lightgray'
    }

}))

function RowMenu({ anchorEl, isMenuOpen, handleMenuClose, record, historyPush, setRefetch }) {
    const handleRemoveRow = useRemoveRow()

    const onClickDeleteRow = () => {
        handleRemoveRow(record.pes_id, setRefetch)
        handleMenuClose()
    }

    const onClickEditRow = () => {
        historyPush(`/edit/${record.pes_id}`)
        handleMenuClose()
    }
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={onClickEditRow}>
                <Typography variant="inherit">Editar</Typography>
            </MenuItem>
            <MenuItem onClick={onClickDeleteRow}>
                <Typography variant="inherit">Remover</Typography>
            </MenuItem>
        </Menu>
    )
}

const Row = ({ pessoa, handleActionsMenuOpen }) => {

    return (
        <TableRow
            key={pessoa.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell >{pessoa.pes_id}</TableCell>
            <TableCell >{pessoa.pes_nome}</TableCell>
            <TableCell >{pessoa.pes_data_nascimento.split('T')[0]}</TableCell>
            <TableCell >{pessoa.pes_cpf}</TableCell>
            <TableCell >{pessoa.pes_telefone}</TableCell>
            <TableCell >{pessoa.prof.prof_name}</TableCell>
            <TableCell >{pessoa.pes_observacoes ? pessoa.pes_observacoes : '-'}</TableCell>
            <TableCell>
                <IconButton aria-label="Ações" onClick={handleActionsMenuOpen(pessoa)}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </TableCell>

        </TableRow>
    )


}

export default function DataTable() {
    const [record, setRecord] = useState(() => ({}))
    const [anchorElActions, setAnchorElActions] = useState(() => null)
    const classes = useStyles()
    const { push } = useHistory()
    const [data, , setRefetch, refetch] = useContext(DataContext)

    const isMenuOpenActions = useMemo(() => Boolean(anchorElActions), [anchorElActions])

    const handleActionsMenuOpen = useRef((record) => event => {
        event.preventDefault()
        event.stopPropagation()
        setRecord(record)
        setAnchorElActions(event.currentTarget)
    }).current

    const handleActionsMenuClose = useRef(() => {
        setAnchorElActions(null)
        setRecord({})
    }).current

    return (
        <>
            <RowMenu
                anchorEl={anchorElActions}
                isMenuOpen={isMenuOpenActions}
                handleMenuClose={handleActionsMenuClose}
                record={record}
                historyPush={push}
                setRefetch={setRefetch}
            />
            <TableContainer className={classes.TableContainer} component={Paper}>
                <Table className={classes.table} sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >NOME</TableCell>
                            <TableCell >DATA NASCIMENTO</TableCell>
                            <TableCell >CPF</TableCell>
                            <TableCell >TELEFONE</TableCell>
                            <TableCell >PROFISSAO</TableCell>
                            <TableCell >OBSERVAÇÕES</TableCell>
                            <TableCell ></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((pessoa) => (
                            <Row key={pessoa.pes_id} pessoa={pessoa} handleActionsMenuOpen={handleActionsMenuOpen} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={refetch}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}
