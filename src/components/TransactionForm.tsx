import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState(false)
	return (
		<div className="rounded-md bg-slate-800 p-4">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						className="input border-slate-700"
						type="text"
						placeholder="Title..."
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						className="input border-slate-700"
						type="number"
						placeholder="Amount..."
						name="amount"
						required
					/>
				</label>

				{/* SELECT */}
				{categories.length ? (
					<label className="grid" htmlFor="category">
						<span>Category</span>
						<select className="input border-slate-700" name="category" required>
							{categories.map((category, index) => (
								<option
									key={index}
									className="bg-slate-500"
									value={category.id}
								>
									{category.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h3 className="mt-1 text-red-300">
						To continue create a category first
					</h3>
				)}

				{/* radio Buttons */}
				<div className="flex gap-4 items-center">
					<label className="flex cursor-pointer items-center gap-2" htmlFor="">
						<input
							className="form-radio text-blue-600"
							type="radio"
							name="type"
							value={'income'}
							required
						/>
						<span>Income</span>
					</label>
					<label className="flex cursor-pointer items-center gap-2" htmlFor="">
						<input
							className="form-radio text-blue-600"
							type="radio"
							name="type"
							value={'expense'}
							required
						/>
						<span>Expense</span>
					</label>
				</div>
				{/* submit button */}
				<button className="btn btn-green max-w-fit mt-2 mb-5">Submit</button>
			</Form>
			{/* Add category */}
			<button
				className="max-w-fit items-center gap-2 text-white/50 hover:text-white flex"
				onClick={() => {
					setVisibleModal(true)
				}}
			>
				<FaPlus />
				<span>Manage Categories:</span>
			</button>

			{visibleModal && (
				<CategoryModal type="post" setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}

export default TransactionForm
