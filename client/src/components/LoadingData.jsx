import Spinner from './Spinner'

const LoadingData = ({ data }) => {
  if (!data) {
    return (
      <div className="row-center col-span-2">
        <Spinner className="w-5 h-5" />
      </div>
    )
  }
  return
}

export default LoadingData
