import React from 'react';
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


function BreadCrumbs(BreadLinks) {
  console.log(BreadLinks)
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          { BreadLinks.BreadLinks.map((crumb, index) =>
            <Link
              key={index}
              color={index + 1 == BreadLinks.BreadLinks.length ? 'textPrimary' : 'inherit'}
              href={crumb.link}
            > {crumb.name}
            </Link>
          )}
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

export default BreadCrumbs;
