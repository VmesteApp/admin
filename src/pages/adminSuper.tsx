import { useEffect, useState } from 'react'
import { Api } from '../constants/api'
import { logout } from '../routes/routing'
import { Button, Container } from 'react-bootstrap'
import CreateAdminModal from '../components/createAdminModal'

const SuperAdmin = () => {
	const [admins, setAdmins] = useState([])
	const [visibleModal, setVisibleModal] = useState(false)

	const handleCreateAdmin = async (payload: any) => {
		const response = await fetch(`${Api.Auth}/admin`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		try {
			if (response.status === 200) {
				fetchAdmins()
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleDeleteAdmin = async (id: any) => {
		if (!window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			return
		}
		const response = await fetch(`${Api.Auth}/admin`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
			body: JSON.stringify(id),
		})
		try {
			if (response.status === 200) {
				fetchAdmins()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchAdmins = async () => {
		const response = await fetch(`${Api.Auth}/admin`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${sessionStorage.getItem('token')}`,
				'content-type': 'application/json',
			},
		})

		try {
			if (response.status === 200) {
				const { admins } = await response.json()
				setAdmins(admins)
			}
		} catch (error) {
			if (response.status === 422) logout()
			console.log('Ошибка загрузки списка администраторов')
		}
	}

	useEffect(() => {
		fetchAdmins()
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
					Создать профиль администратора
				</Button>
			</Container>

			<CreateAdminModal
				visibleModal={visibleModal}
				onClose={() => setVisibleModal(false)}
				onSubmit={(payload: any) => handleCreateAdmin(payload)}
			/>
			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th scope='col'>id</th>
						<th scope='col'>Почта</th>
						<th scope='col'>Пароль</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{admins.length > 0 ? (
						admins.map(row => (
							<tr key={row.id}>
								<td>{row.id}</td>
								<td>{row.email}</td>
								<td>{row.password}</td>
								<td>
									<Button
										type='button'
										className='btn btn-light'
										onClick={() => handleDeleteAdmin(row.id)}
									>
										<span>
											<i className='fa-solid fa-trash'></i>
										</span>
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td>Данные не найдены</td>
							<td>Данные не найдены</td>
							<td>Данные не найдены</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default SuperAdmin
