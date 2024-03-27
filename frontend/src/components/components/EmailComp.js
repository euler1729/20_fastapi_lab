const EmailComp = ({value, onChange}) => {
    return (
        <div className='input-field'>
            <p>Email</p>
            <input name='email' value={value} onChange={onChange} type="text" autoComplete='off' />
        </div>
    );
}
export default EmailComp