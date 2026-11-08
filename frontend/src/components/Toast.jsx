import Icon from './Icon.jsx'

function Toast({ message }) {
  return (
    <div className="toast" role="status">
      <span className="toast-check"><Icon name="check" size={15} /></span>
      {message}
    </div>
  )
}

export default Toast
