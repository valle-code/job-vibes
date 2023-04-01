import type {NextPage} from 'next';
import {Text, Button, Grid, Col } from '@nextui-org/react';

interface Props {
    text1: string;
    text2: string;
}

const Jumbotron: NextPage<Props> = (props) => {

    const {text1, text2} = props;

    return (
    <Grid.Container justify="center" css={{"height": "400px", 
      "width": "99%",
      "borderRadius": "10px", 
       "backgrounImage": "url(/jumboton.png)",
      "marginLeft": "10px",
      "marginTop": "20px",
      "marginBottom": "20px"}}
      >
        <Grid xs={12} sm={5} alignItems="center">
          <Col css={{"width": "100%"}}>
            <Text weight={"bold"} size={70} css={{"textAlign": "center", "color": "white"} }>{text1}</Text>
            <Text weight={"bold"} size={65} css={{"textAlign": "center", "color": "white", "width": "100%"}}>{text2}</Text>
            <Button size="md" shadow color="gradient" css={{ width: "100%", marginTop: "10px", boxShadow: "0px 8px 24px rgba(255, 0, 0, 0.2)" }}>Únete GRATIS Ahora</Button>
          </Col>
        </Grid>
        
      </Grid.Container>
    )
}

export default Jumbotron;