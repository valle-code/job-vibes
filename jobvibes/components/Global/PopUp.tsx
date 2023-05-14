import type {NextPage} from 'next';
import { Modal, useModal, Button, Text } from "@nextui-org/react";

interface Props {
    title: string;
    description: string;
    onClose: () => void;
}

const PopUp: NextPage<Props> = (props) => {

    const { bindings } = useModal();
    const { title, description, onClose} = props;
    
    return (
       <div className="hey">
         <Modal.Header>
        <Text id="modal-title" size={18}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description">{description}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
       </div>
     
   
    )
}

export default PopUp;