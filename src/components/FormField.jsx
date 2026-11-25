const FormField = ({ id, label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-sm text-seal">
        {error}
      </p>
    )}
  </div>
)

export default FormField
