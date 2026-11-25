import { ClipLoader } from 'react-spinners'

const Spinner = ({ loading = true }) => {
  return (
    <div className="my-10 flex justify-center">
      <ClipLoader loading={loading} color="#b45309" size={60} />
    </div>
  )
}

export default Spinner