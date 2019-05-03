import React from 'react';

function FilterForm(props) {
  const { filter, handleFormSubmit, handleInputChange } = props;
  const languages = ['all', 'english', 'kazakh'];
  return (
    <form onSubmit={handleFormSubmit}>
      <label> All: 
        <input type='radio' name='status' value='all'
          onChange={handleInputChange}
          checked={filter.status === 'all'}
        />
      </label>
      <label> Online: 
        <input type='radio' name='status' value='online'
          onChange={handleInputChange}
          checked={filter.status === 'online'}
        />
      </label>
      <label> Offline: 
        <input type='radio' name='status' value='offline'
          onChange={handleInputChange}
          checked={filter.status === 'offline'}
        />
      </label>
      <label> Language: 
        <select name='language' defaultValue={filter.language} onChange={handleInputChange}>
          {languages.map((language, index) =>
            (<option key={index} value={language}>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </option>))
          }
        </select>
      </label>
      <button type='submit'>Filter</button>
    </form>
  )
}

export default FilterForm;