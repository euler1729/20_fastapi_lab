const NameComp = ({ value, onChange }) => {
    return (
        <div className='input-field'>
            <p>Username</p>
            <input name='name' value={value} onChange={onChange} type="text" autoComplete='off' />
        </div>
    );
}
export default NameComp