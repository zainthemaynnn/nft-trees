import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import treeimg from '../assets/tree.jpg';

const useStyles = makeStyles((theme) => {
  return {
    baseballCard: {
      fontWeight: 'bold',
      position: 'relative',
      margin: theme.spacing(2),
      height: '360px',
    },
    media: {
      height: 0,
      paddingTop: '100%',
    },
    cardWrapper: {},
    cardText: {},
  };
});

const BaseballCard = ({ tree }) => {
  const classes = useStyles();

  return (
    <Card className={classes.baseballCard}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={treeimg}
          title={tree.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.cardText}
          >
            #{tree.serial} {tree.name}: 1 of 1 {tree.genus} trees
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BaseballCard;
