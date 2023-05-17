import { useState } from 'react';

const Create = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>Lägg till recept</h2>
        <label>
          <span>Titel:</span>
          <input
            type="text"
            placeholder="Lägg till ett namn för receptet"
            required
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>Text:</span>
          <textarea
            placeholder="Lägg till beskrivande text"
            required
            // value={body}
            // onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>

        {/* <label>Blog author</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select> */}
        <button>Add Recipe</button>
      </form>
    </div>
  );
};

export default Create;
