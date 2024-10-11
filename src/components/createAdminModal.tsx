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

const CreateAdminModal = ({ visibleModal, onClose, onSubmit }) => {
	const [id, setId] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	const handleSubmit = e => {
		e.preventDefault()

		onSubmit({
			id,
			email,
			password,
		})
		onClose()
	}

	return (
		<Modal show={visibleModal}>
			<ModalHeader>
				<ModalTitle>Регистрация направления</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup value={email} onChange={e => setEmail(e.target.value)}>
						<FormLabel>Почта</FormLabel>
						<FormControl type='text' />
					</FormGroup>
					<FormGroup
						value={password}
						onChange={e => setPassword(e.target.value)}
					>
						<FormLabel>Пароль</FormLabel>
						<textarea
							className='form-control'
							id='exampleFormControlTextarea1'
							rows='3'
						></textarea>
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

export default CreateAdminModal
