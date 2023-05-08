//solve the issue where a loading sign appears when I refresh the home page
export const SpinnerLoading = () => {
  return (
    <div className="container m-5 d-flex justify-content-center"
      style = {{height: 550}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
              Loading
          </span>
        </div>
    </div>

  )

}