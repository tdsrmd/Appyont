const ToastAlert = ({ title, text, children }) => {
  return (
    <div className="p-3 flex gap-x-2">
      {children}
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ToastAlert
