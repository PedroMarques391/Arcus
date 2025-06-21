import { Modal as PaperModal, Portal, Text } from "react-native-paper";

interface IModalProps {
    showModal: boolean;
    hideModal: () => void
}

export default function Modal({ showModal, hideModal }: IModalProps): React.JSX.Element {
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (
        <Portal>
            <PaperModal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </PaperModal>
        </Portal>
    )
}