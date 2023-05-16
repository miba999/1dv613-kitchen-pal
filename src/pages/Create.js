import { useState } from 'react';

const Create = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <label>Something:</label>
        <textarea
          required
          // value={body}
          // onChange={(e) => setBody(e.target.value)}
        ></textarea>
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
