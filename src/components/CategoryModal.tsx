import { FC, useState } from 'react'
import { Form } from 'react-router-dom'

interface Props {
	type: 'post' | 'patch'
	id?: number
	title?: string
	setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<Props> = ({ type, id, title, setVisibleModal }) => {
	const [newTitle, setNewTitle] = useState<string>('')

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		if (!newTitle.trim()) {
			e.preventDefault()
			alert('Type a new title, please')
			return
		}
		/* const errResponseFromActio = useActionData() as AxiosResponse
		console.log(errResponseFromActio)
		if (errResponseFromActio) {
			e.preventDefault()
			console.log('tyt')
			alert(errResponseFromActio.data.message)
			return
		} */
		setVisibleModal(false)
	}
	return (
		<div className="fixed top-0 left-0 bottom-0 right-0 h-full bg-black/50 flex justify-center items-center w-full">
			<Form
				className="grid gap-2 w-[300px] rounded-md bg-slate-900 p-5"
				action="/categories"
				method={type}
				onSubmit={(e) => onSubmitHandler(e)}
			>
				<label htmlFor="title">
					<small>Category title</small>
					<input
						className="input w-full"
						type="text"
						name="title"
						placeholder={title}
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
					<input type="hidden" name="id" value={id} />
				</label>
				<div className="flex items-center gap-2">
					<button className="btn btn-green" type="submit">
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button
						className="btn btn-red"
						onClick={() => setVisibleModal(false)}
					>
						Close
					</button>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
