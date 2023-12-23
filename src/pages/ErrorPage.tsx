import { FC } from 'react'
import pageNotFoundImg from './../assets/notFound.jpg'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 font-roboto text-white flex flex-col items-center justify-center gap-10">
			<img src={pageNotFoundImg} alt="" />
			<Link
				to={'/'}
				className="rounde-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
			>
				Back
			</Link>
		</div>
	)
}
export default ErrorPage
