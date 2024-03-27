const ConfirmPasswordComp = ({value, onChange}) => {
    return (
        <div className='input-field'>
            <p>Confirm Password</p>
            <input name='password' value={value} onChange={onChange} type="password" autoComplete='on' />
        </div>
    )
}
export default ConfirmPasswordComp;