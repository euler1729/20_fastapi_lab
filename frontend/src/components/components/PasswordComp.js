const PasswordComp = ({value, onChange}) => {
    return (
        <div className='input-field'>
            <p>Password</p>
            <input name='password' value={value} onChange={onChange} type="password" autoComplete='on' />
        </div>
    )
}
export default PasswordComp;