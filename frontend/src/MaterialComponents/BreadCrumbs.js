import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
}));

function BreadCrumbs(m) {
  //console.log(m)
  const classes = useStyles();
  const match = m.match
  console.log(match)
  const [crumbs, setCrumbs] = useState([])
  useEffect(() => {
    generateCrumbs(match)
  }, [])

  function generateCrumbs(match) {
    //console.log("gen crumbs called")
    if (match.match.path == '/stocks') {
      if (match.match.params.symbol != undefined) {
        crumbs.push({
          id: 0,
          name: match.match.params.symbol,
          link: `/stocks/${match.match.params.symbol}/`,
        })
        if (match.match.params.kpi != undefined) {
          crumbs.push({
            id: 1,
            name: match.match.params.kpi,
            link: `/${match.match.params.kpi}/`,
          })
        }
      }
    }
    if (match.match.path == '/sectors') {
        crumbs.push({
          id: 0,
          name: 'Sectors',
          link: `/sectors/`,
        })
    }

    return crumbs
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          {crumbs.length > 0 ?
            crumbs.map((crumb, index) =>
              <Link
                key={index}
                color={index + 1 == crumbs.length ? 'textPrimary' : 'inherit'}
                href={crumb.link}
              > {crumb.name}
              </Link>
            )
            :
            null
          }

        </Breadcrumbs>
      </Paper>
    </div>
  );
}

export default BreadCrumbs;
