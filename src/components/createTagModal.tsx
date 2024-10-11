import { useState } from 'react'
import {
	Container,
	Form,
	Button,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalBody,
	FormGroup,
	FormLabel,
	FormControl,
	FormSelect,
} from 'react-bootstrap'

const CreateTagModal = ({ visibleModal, onClose, onSubmit }) => {
	const [name, setName] = useState('')

	const handleSubmit = (e: any) => {
		e.preventDefault()

		onSubmit({
			name,
		})
		onClose()
	}

	return (
		<Modal show={visibleModal}>
			<ModalHeader>
				<ModalTitle>Создание тега</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup value={name} onChange={e => setName(e.target.value)}>
						<FormLabel>Наименование</FormLabel>
						<FormControl type='text' />
					</FormGroup>

					<Container className='mt-3 d-flex justify-content-between'>
						<Button
							onClick={onClose}
							type='button'
							className='btn btn-secondary'
						>
							Закрыть
						</Button>
						<Button type='submit' className='btn btn-success'>
							Создать
						</Button>
					</Container>
				</Form>
			</ModalBody>
		</Modal>
	)
}

export default CreateTagModal
