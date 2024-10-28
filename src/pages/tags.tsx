import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Api } from '../constants/api'
import { logout } from '../helpers/checkAuth'
import CreateTagModal from '../components/createTagModal'

interface Tag {
	id: number
	name: string
}

const Tags = () => {
	const [tags, setTags] = useState<Tag[]>([])
	const [editingTag, setEditingTag] = useState<Tag | null>(null)
	const [visibleModal, setVisibleModal] = useState(false)

	const handleEditTag = (tag: Tag) => {
		setEditingTag(tag)
	}

	const handleSaveEdit = async (id: number, updatedData: Tag) => {
		const response = await fetch(`${Api.Content}/tag/${id}`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		})

		try {
			if (response.ok) {
				fetchTags()
				setEditingTag(null)
			} else {
				console.error('Ошибка при обновлении тега')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelEdit = () => {
		setEditingTag(null)
	}

	const handleDeleteTags = async (id: number) => {
		if (!window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			return
		}

		const response = await fetch(`${Api.Content}/admin/tags`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
			body: JSON.stringify(id),
		})
		try {
			if (response.status === 200) {
				fetchTags()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleCreateTag = async (payload: any) => {
		const response = await fetch(`${Api.Content}/admin/tags`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
			body: JSON.stringify(payload),
		})
		try {
			if (response.ok) {
				fetchTags()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchTags = async () => {
		const response = await fetch(`${Api.Content}/tags`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
		})

		try {
			if (response.status === 200) {
				const { tags } = await response.json()

				setTags(tags)
			} else {
				setTags([])
			}
		} catch (error) {
			if (response.status === 422) logout()
			console.log(error)
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
					onSubmit={(payload: any) => handleCreateTag(payload)}
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
												onClick={() => handleSaveEdit(row.id, editingTag)}
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
												onClick={() => handleDeleteTags(row.id)}
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
