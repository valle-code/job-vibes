import type {NextPage} from 'next';
import { Card, Text, Row, Col, Button} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
    title: string;
    label: string;
    imageURL: string;
    candidateCount: string;
    id: number;
}

const PopUp: NextPage<Props> = (props) => {

    
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/jobpost/${id}`);
    }


    return (
                        /* popup dialog */
        
    )
}

export default PopUp;