import { colorClasses, spinnerClasses } from 'helpers/global'
import React from 'react'
import Spinner from '../Spinner'

const Button = ({
  text,
  loading,
  color = 'green',
  children,
  spinnerColor = 'white',
  iconPos = 'start',
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${colorClasses[color]} button ${props.className}`}
    >
      {children && iconPos === 'start' && (
        <span className={`${loading && 'opacity-0'}`}>{children}</span>
      )}
      <span className={`${loading && 'opacity-0'}`}>{text}</span>
      {children && iconPos === 'end' && (
        <span className={`${loading && 'opacity-0'}`}>{children}</span>
      )}
      {loading && (
        <div className="absolute-center z-10">
          <Spinner className={`w-6 h-6 ${spinnerClasses[spinnerColor]}`} />
        </div>
      )}
    </button>
  )
}

export default React.memo(Button)
