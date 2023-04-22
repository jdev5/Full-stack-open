import "../index.css"

const DeleteNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="delete-notificacion">
        {message}
      </div>
    )
  }

  export default DeleteNotification