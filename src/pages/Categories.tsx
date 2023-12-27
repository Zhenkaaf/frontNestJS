import { FC, useState } from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModal'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

export const categoriesAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const title = {
				title: formData.get('title'),
			}
			await instance.post('/categories', title)
			return null
		}
		case 'PATCH': {
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const categoryId = formData.get('id')
			await instance.delete(`/categories/category/${categoryId}`)
			return null
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
								<button>
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
					onClick={() => setVisibleModal(true)}
				>
					<FaPlus />
					<span>Create a new category</span>
				</button>
			</div>
			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</>
	)
}
export default Categories
