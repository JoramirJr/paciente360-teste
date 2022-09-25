import { Suspense } from 'react'

import { Link, Switch, Route } from 'react-router-dom'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import { makeStyles } from "@mui/styles"

import Table from '../Components/Table'

import NewRowModal from './NewRowModal'
import EditRowModal from './EditRowModal'

import DataProvider from '../Providers/DataProvider'

const useStyles = makeStyles(() => ({
    contentSection: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

    },
    modalButtonSection: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        margin: '2em'
    },
    modalButton: {
        height: '2em',
        width: '10em',
        backgroundColor: 'blue',
        borderRadius: '5px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        textDecoration: 'none',
        fontFamily: "'Roboto','Helvetica','Arial','sans-serif'"
    },
    tableSection: {
        display: 'block',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    }
}))

export default function Index() {
    const classes = useStyles()

    return (
        <DataProvider>
            <div className={classes.contentSection} >
                <div className={classes.modalButtonSection} >
                    <Link to={'/new'} className={classes.modalButton}>
                        <AddCircleIcon />
                        Novo Registro
                    </Link>
                </div>
                <div className={classes.tableSection} >

                    <Table />

                </div>
                <Suspense >
                    <Switch>
                        <Route path="/new" component={NewRowModal} />
                        <Route path="/edit/:id" component={EditRowModal} />
                    </Switch>
                </Suspense>
            </div>
        </DataProvider>
    )

}