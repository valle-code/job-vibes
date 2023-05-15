import type { NextPage } from 'next';
import { Card, Text, Row, Col, Button } from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
    title: string;
    label: string;
    imageURL: string;
    candidateCount: string;
    id: number;
}

const JobOffer: NextPage<Props> = (props) => {

    const { title, label, imageURL, candidateCount } = props;
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/jobpost/${id}`);
    }

    const deleteJobOffer = (id: number) => {
        axios({
            method: "delete",
            withCredentials: true,
            url: `http://localhost:3001/deleteJobpost/${id}`,
            data: {
                id: id
            }
        })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <Card>
            <Card.Header css={{ position: "absolute", top: 5 }}>
                <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                        {title}

                    </Text>
                    <Text h4 color="white">
                        {label}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Image src={imageURL}></Card.Image>
            <Card.Footer
                isBlurred
                css={{
                    position: "absolute",
                    bgBlur: "#0f111466",
                    bottom: 0
                }}
            >
                <Row>
                    <Col>
                        <Text color="#d1d1d1" size={16} css={{ fontSize: "14px" }}>
                            {candidateCount}
                        </Text>
                    </Col>
                    <Col>
                        <Row justify="flex-end">
                            <Button flat auto rounded color="primary" onClick={() => handleClick(props.id)}>
                                <Text
                                    css={{ color: "inherit" }}
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                >
                                    Ver Post
                                </Text>
                            </Button>
                            <Button flat auto rounded color="error" onClick={() => deleteJobOffer(props.id)} css={{ marginLeft: "15px" }} >
                                <Text
                                    css={{ color: "inherit" }}
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                >
                                    Eliminar
                                </Text>
                            </Button>
                        </Row>
                    </Col>
                </Row>

            </Card.Footer>
        </Card>
    )
}

export default JobOffer;