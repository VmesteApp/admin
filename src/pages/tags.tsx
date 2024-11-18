import { SetStateAction, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateTagModal from '../components/createTagModal'
import api from '../network'

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

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [tagsPerPage] = useState<number>(10) // Количество жалоб на странице
	const indexOfLastTag: number = currentPage * tagsPerPage
	const indexOfFirstTag: number = indexOfLastTag - tagsPerPage
	const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag)

	const handleEditTag = (tag: Tag) => {
		setEditingTag(tag)
	}

	const handleSaveEdit = async (updatedData: Tag) => {
		const response = await api.put('/content/admin/tags', updatedData)
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
		const response = await api.delete('/content/admin/tags', {
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
		const response = await api.post('/content/admin/tags', payload)
		try {
			if (response.status === 200) fetchTags()
			else console.error('Ошибка при создании тега')
		} catch (error) {
			console.error(error)
		}
	}

	const fetchTags = async () => {
		const response = await api.get('/content//tags')
		try {
			if (response.status === 200) setTags(response.data.tags)
			else console.error('Ошибка при загрузке тегов')
		} catch (error) {
			console.error(error)
		}
	}

	const paginate = (pageNumber: SetStateAction<number>) =>
		setCurrentPage(pageNumber)

	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(tags.length / tagsPerPage); i++) {
		pageNumbers.push(i)
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

			<table className='table table-striped table-hover table-bordered table-sm '>
				<thead>
					<tr>
						<th style={{ paddingLeft: '15px' }} scope='col'>
							Id
						</th>
						<th style={{ paddingLeft: '15px' }} scope='col'>
							Название
						</th>
						<th style={{ textAlign: 'center' }} scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{currentTags.length > 0 ? (
						currentTags.map((row: Tag) => (
							<tr key={row.id} onDoubleClick={() => handleEditTag(row)}>
								{editingTag?.id === row.id ? (
									<>
										<td style={{ width: '3%', paddingLeft: '15px' }}>
											{row.id}
										</td>
										<td style={{ paddingLeft: '15px' }}>
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
										<td style={{ width: '20%', textAlign: 'center' }}>
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
										<td style={{ width: '3%', paddingLeft: '15px' }}>
											{row.id}
										</td>
										<td style={{ paddingLeft: '15px' }}>{row.name}</td>
										<td style={{ width: '20%', textAlign: 'center' }}>
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
							<td style={{ paddingLeft: '15px' }}>Данные не найдены.</td>
						</tr>
					)}
				</tbody>
			</table>
			<Container className='d-flex justify-content-center'>
				<nav aria-label='Page navigation example'>
					<ul className='pagination'>
						{pageNumbers.map(number => (
							<li key={number} className='page-item'>
								<a
									className={
										currentPage === number ? 'page-link active' : 'page-link'
									}
									style={{ cursor: 'pointer' }}
									onClick={() => paginate(number)}
								>
									{number}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</Container>
		</>
	)
}

export default Tags
