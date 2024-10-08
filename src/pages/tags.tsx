import { SetStateAction, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Api } from '../constants/api'

const Tags = () => {
	const [tags, setTags] = useState([])
	const [editingTag, setEditingTag] = useState(null)

	const handleEditTag = (tag: SetStateAction<null>) => {
		setEditingTag(tag)
	}

	const handleSaveEdit = async (id: any, updatedData: null) => {
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
				console.error('Ошибка при обновлении импульса')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleCancelEdit = () => {
		setEditingTag(null)
	}

	const handleDeleteTags = async (id: any) => {
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
			console.log(error)
		}
	}

	useEffect(() => {
		fetchTags()
	}, [])

	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button onClick={fetchTags} type='button' className='btn btn-secondary'>
					Обновить таблицу
				</Button>
			</Container>

			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th scope='col'>Название</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{tags.length > 0 ? (
						tags.map(row => (
							<tr key={row.id} onDoubleClick={() => handleEditTag(row)}>
								{editingTag?.id === row.id ? (
									<>
										<td>
											<input
												type='text'
												value={editingTag.category}
												onChange={e =>
													setEditingTag({
														...editingTag,
														category: e.target.value,
													})
												}
											/>
										</td>
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
												Tag
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingTag.tags}
												onChange={e =>
													setEditingTag({
														...editingTag,
														tags: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingTag.description}
												onChange={e =>
													setEditingTag({
														...editingTag,
														description: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<input
												type='text'
												value={editingTag.shortDescription}
												onChange={e =>
													setEditingTag({
														...editingTag,
														shortDescription: e.target.value,
													})
												}
											/>
										</td>
										<td>
											<Button
												type='button'
												className='btn btn-primary mr-2'
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
