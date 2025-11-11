const PersonForm = ({nameValue , numberValue, onSubmit, onNameChange , onNumberChange}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={nameValue} onChange={onNameChange} placeholder="Jhon" />
            </div>
            <div>
                number: <input value={numberValue} onChange={onNumberChange} placeholder="01-12345678" />
            </div>
            <div>
                <button 
                    type="submit"
                    onMouseEnter={(e) => {e.target.style.backgroundColor='#0000ff'}}
                    onMouseOut={(e) => {e.target.style.backgroundColor=''}}
                >add</button>
            </div>
        </form>
    );
};

export default PersonForm;