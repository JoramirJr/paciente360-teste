import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { makeStyles } from '@mui/styles'

import List from './Pages'

const useStyles = makeStyles(() => ({
  overallPage: {
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    boxSizing: 'border-box'
  },
}))

export default function App() {
  const classes = useStyles()

  return (
    <div className={classes.overallPage} >
      <Router>
        <Switch>
          <Route path='/' component={List} />
        </Switch>
      </Router>
    </div>
  )
}