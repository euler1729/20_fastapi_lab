const PhoneComp = ({value, onChange}) => {
    return (
        <div className='input-field'>
            <p>Phone Number</p>
            <input name='phone' value={value} onChange={onChange} type="text" autoComplete='off' />
        </div>
    );
}
export default PhoneComp