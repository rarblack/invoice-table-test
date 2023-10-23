'use client';

import CommonContext from "@/contexts/common";
import { DeleteIcon } from "@chakra-ui/icons";
import { 
  Modal, 
  ModalContent, 
  ModalFooter, 
  Button, 
  ModalBody, 
  ModalCloseButton,
   ModalHeader, 
  ModalOverlay, 
  useDisclosure 
} from "@chakra-ui/react";
import { useContext } from "react";


function DeleteModal({ invoiceId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { 
    deleteInvoice 
  } = useContext(CommonContext);

  const remove = () => {
    deleteInvoice(invoiceId);
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" size={"md"} rounded={"full"}>
        <DeleteIcon />
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure? You can't undo this action afterwards!
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} >Close</Button>
            <Button onClick={remove} colorScheme="red">Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModal;
