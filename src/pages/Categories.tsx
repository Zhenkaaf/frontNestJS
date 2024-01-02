import { FC, useState } from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModal'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export const categoriesAction = async ({ request }: any) => {
	try {
		switch (request.method) {
			case 'POST': {
				const formData = await request.formData()
				const title = {
					title: formData.get('title'),
				}
				try {
					await instance.post('/categories', title)
					toast.success('Category has been created')
				} catch (err) {
					if (err instanceof AxiosError) {
						if (err.response && typeof err.response === 'object') {
							const errResponse = err.response as AxiosResponse
							alert(errResponse.data.message)
							toast.error(errResponse.data.message)
						}
					}
				}
				return null
			}
			case 'PATCH': {
				const formData = await request.formData()
				const category = {
					id: formData.get('id'),
					title: formData.get('title'),
				}
				try {
					await instance.patch(`/categories/category/${category.id}`, category)
					toast.success('Category has been updated')
				} catch (err) {
					if (err instanceof AxiosError) {
						if (err.response && typeof err.response === 'object') {
							const errResponse = err.response as AxiosResponse
							alert(errResponse.data.message)
							toast.error(errResponse.data.message)
						}
					}
				}
				return null
			}
			case 'DELETE': {
				const formData = await request.formData()
				const categoryId = formData.get('id')
				await instance.delete(`/categories/category/${categoryId}`)
				toast.success('Category has been deleted')
				return null
			}
		}
	} catch (err) {
		if (err instanceof AxiosError) {
			if (err.response && typeof err.response === 'object') {
				const errorResponse = err.response as AxiosResponse
				console.log('Response data:', errorResponse.data)
			}
		}
	}
}

export const categoryLoader = async () => {
	const { data } = await instance.get<ICategory[]>('/categories')
	return data
}

const Categories: FC = () => {
	const categories = useLoaderData() as ICategory[]
	const [visibleModal, setVisibleModal] = useState<boolean>(false)
	const [categoryId, setCategoryId] = useState<number>(0)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [categoryTitle, setCategoryTitle] = useState<string>('')

	return (
		<>
			<div className="p-4 rounded-md bg-slate-800 mt-10">
				<h1>Your category list:</h1>
				<div className="mt-2 flex flex-wrap items-center gap-2">
					{categories.map((category, idx) => (
						<div
							className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2"
							key={idx}
						>
							{category.title}
							<div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
								<button
									onClick={() => {
										setCategoryId(category.id)
										setIsEdit(true)
										setCategoryTitle(category.title)
										setVisibleModal(true)
									}}
								>
									<AiFillEdit />
								</button>

								<Form className="flex" method="delete" action="/categories">
									<input type="hidden" value={category.id} name="id" />
									<button type="submit">
										<AiFillCloseCircle />
									</button>
								</Form>
							</div>
						</div>
					))}
				</div>

				<button
					className="max-w-fit items-center gap-2 text-white/50 hover:text-white mt-5 flex"
					onClick={() => {
						setIsEdit(false)
						setVisibleModal(true)
					}}
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
			{visibleModal && isEdit && (
				<CategoryModal
					type="patch"
					id={categoryId}
					setVisibleModal={setVisibleModal}
					title={categoryTitle}
				/>
			)}
		</>
	)
}
export default Categories
