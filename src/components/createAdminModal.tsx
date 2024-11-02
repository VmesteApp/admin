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
} from 'react-bootstrap'

interface CreateAdminForm {
	email: string
	password: string
}

interface CreateAdminModalProps {
	visibleModal: boolean
	onClose: () => void
	onSubmit: (data: CreateAdminForm) => void
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({
	visibleModal,
	onClose,
	onSubmit,
}) => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		onSubmit({
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
					<FormGroup>
						<FormLabel>Почта</FormLabel>
						<FormControl
							type='text'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<FormLabel>Пароль</FormLabel>
						<FormControl
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
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
