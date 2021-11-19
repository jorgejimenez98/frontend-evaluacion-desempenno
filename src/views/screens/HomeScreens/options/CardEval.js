import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function CardEval({ paytime, title }) {
  return (
    <Card className="mt-4 shadow">
      <CardActionArea>
        <CardContent className="text-center">
          <Typography variant="body2" color="textSecondary" component="p">
            {title} de evaluación
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {paytime !== null ? paytime: "No registrado"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
