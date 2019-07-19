import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({ text, keyword, label, onChange }) => {
    const [isShown, setIsShown] = useState(false);
    const inputType = isShown ? 'text' : 'password';

    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">{label}</label>
            <input
                className="col-sm-7"
                value={text}
                type={inputType}
                onChange={e => onChange(e, keyword)}
            />
            <button className="col-sm-2" onClick={() => setIsShown(!isShown)}><span role='img' aria-label='show'>👀</span></button>
        </div>
    );
}

PasswordInput.propTypes = {
    text: PropTypes.string,
    keyword: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default PasswordInput;