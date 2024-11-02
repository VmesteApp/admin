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

interface CreateTagForm {
	name: string
}
interface CreateTagModalProps {
	visibleModal: boolean
	onClose: () => void
	onSubmit: (data: CreateTagForm) => void
}

const CreateTagModal: React.FC<CreateTagModalProps> = ({
	visibleModal,
	onClose,
	onSubmit,
}) => {
	const [name, setName] = useState<string>('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
					<FormGroup>
						<FormLabel>Наименование</FormLabel>
						<FormControl
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
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

export default CreateTagModal
