import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateTagModal from '../components/createTagModal'
import apiContent from '../axiosConfig/axConfContent'

interface Tag {
	id: number
	name: string
}
interface ID {
	id: number
}

const Tags = () => {
	const [tags, setTags] = useState<Tag[]>([])
	const [editingTag, setEditingTag] = useState<Tag | null>(null)
	const [visibleModal, setVisibleModal] = useState(false)

	const handleEditTag = (tag: Tag) => {
		setEditingTag(tag)
	}

	const handleSaveEdit = async (updatedData: Tag) => {
		const response = await apiContent.put('/admin/tags', updatedData)
		try {
			if (response.status === 200) {
				fetchTags()
				setEditingTag(null)
			} else console.error('Ошибка при обновлении тега')
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelEdit = () => {
		setEditingTag(null)
	}

	const handleDeleteTags = async (payload: ID) => {
		if (!window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			return
		}
		const response = await apiContent.delete('/admin/tags', {
			data: payload,
		})
		try {
			if (response.status === 200) fetchTags()
			else console.error('Ошибка при удалении тега')
		} catch (error) {
			console.error(error)
		}
	}

	const handleCreateTag = async (payload: any) => {
		const response = await apiContent.post('/admin/tags', payload)
		try {
			if (response.status === 200) fetchTags()
			else console.error('Ошибка при создании тега')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchTags = async () => {
		const response = await apiContent.get('/tags')
		try {
			if (response.status === 200) setTags(response.data.tags)
			else console.error('Ошибка при загрузке тегов')
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchTags()
	}, [])

	const toggleModal = () => {
		setVisibleModal(!visibleModal)
	}
	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button
					onClick={toggleModal}
					type='button'
					className='btn btn-secondary'
				>
					Создать тег
				</Button>

				<CreateTagModal
					visibleModal={visibleModal}
					onClose={() => setVisibleModal(false)}
					onSubmit={(payload: object) => handleCreateTag(payload)}
				/>
			</Container>

			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th scope='col'>Id</th>
						<th scope='col'>Название</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{tags.length > 0 ? (
						tags.map((row: Tag) => (
							<tr key={row.id} onDoubleClick={() => handleEditTag(row)}>
								{editingTag?.id === row.id ? (
									<>
										<td>{row.id}</td>
										<td>
											<input
												type='text'
												value={editingTag.name}
												onChange={e =>
													setEditingTag({
														...editingTag,
														name: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<Button
												type='button'
												className='btn btn-primary mr-2 mx-2'
												onClick={() => handleSaveEdit(editingTag)}
											>
												Сохранить
											</Button>
											<Button
												type='button'
												className='btn btn-secondary'
												onClick={handleCancelEdit}
											>
												Отмена
											</Button>
										</td>
									</>
								) : (
									<>
										<td>{row.id}</td>
										<td>{row.name}</td>
										<td>
											<Button
												type='button'
												className='btn btn-light'
												onClick={() => handleDeleteTags({ id: row.id })}
											>
												<span>
													<i className='fa-solid fa-trash'></i>
												</span>
											</Button>
										</td>
									</>
								)}
							</tr>
						))
					) : (
						<tr>
							<td>Данные не найдены.</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default Tags
