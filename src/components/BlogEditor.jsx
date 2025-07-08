import { useEffect, useState, useCallback } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Transforms, Editor, Range, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { deserialize, serialize } from '../utils/slate-helper';
import { insertImageDialog } from '../utils/insertImage';
import { ImagePlus, Link as LinkIcon, Bold, Italic } from 'lucide-react';

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'image':
      return <img src={element.url} alt="" {...attributes} style={{ maxWidth: '100%', padding: '8px 0' }} />;
    case 'link':
      return (
        <a {...attributes} href={element.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const insertLink = (editor, url, text) => {
  if (!url) return;

  const link = {
    type: 'link',
    url,
    children: [{ text: text || url }],
  };

  // Insert the link node
  Transforms.insertNodes(editor, link);

  // Move cursor after the inserted link node
  const { selection } = editor;
  if (selection) {
    const after = Editor.after(editor, selection.focus.path);
    if (after) {
      Transforms.select(editor, after);
      // Insert a plain space text node
      Transforms.insertNodes(editor, { text: ' ' });
    }
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  return <span {...attributes}>{children}</span>;
};

const BlogEditor = ({ value, setValue }) => {
  const [editor] = useState(() => {
    const slateEditor = withReact(createEditor());
    slateEditor.isInline = element => element.type === 'link';
    return withHistory(slateEditor);
  });

  const [slateValue, setSlateValue] = useState([
    { type: 'paragraph', children: [{ text: '' }] }
  ]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    if (value) {
      try {
        const dom = new DOMParser().parseFromString(value, 'text/html');
        const fragment = deserialize(dom.body);
        if (Array.isArray(fragment) && fragment.length > 0) {
          setSlateValue(fragment);
        } else {
          setSlateValue([{ type: 'paragraph', children: [{ text: '' }] }]);
        }
      } catch (err) {
        console.error("Failed to deserialize content", err);
        setSlateValue([{ type: 'paragraph', children: [{ text: '' }] }]);
      }
    }
  }, [value]);

  const handleChange = (newValue) => {
    setSlateValue(newValue);
    const html = newValue.map(n => serialize(n)).join('');
    setValue(html);
  };

  const insertImage = () => insertImageDialog(editor);

  return (
    <div className="space-y-4">
      <Slate editor={editor} initialValue={slateValue} onChange={handleChange}>
        <Editable
          placeholder="Write your blog..."
          className='min-h-[300px] outline-none focus:outline-none px-2 py-1 bg-white dark:bg-gray-900 rounded'
          renderElement={useCallback((props) => <Element {...props} />, [])}
          renderLeaf={useCallback((props) => <Leaf {...props} />, [])}
        />
      </Slate>

      <div className="flex gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded border">
        <button onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'bold'); }} className="px-2 py-1 bg-white dark:bg-gray-700 border rounded"><Bold /></button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleMark(editor, 'italic'); }} className="px-2 py-1 bg-white dark:bg-gray-700 border rounded"><Italic /></button>
        <button onMouseDown={(e) => { e.preventDefault(); insertImage(editor); }} className="px-2 py-1 bg-white dark:bg-gray-700 border rounded"><ImagePlus /></button>
        <button onMouseDown={(e) => { e.preventDefault(); setShowLinkInput(true); }} className="px-2 py-1 bg-white dark:bg-gray-700 border rounded"><LinkIcon /></button>
      </div>

      {showLinkInput && (
        <div className="flex flex-col gap-2 p-2 border rounded bg-white dark:bg-gray-700">
          <input
            type="text"
            placeholder="Link Text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <input
            type="url"
            placeholder="https://..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                insertLink(editor, linkUrl, linkText);
                setLinkText('');
                setLinkUrl('');
                setShowLinkInput(false);
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Insert
            </button>
            <button
              onClick={() => setShowLinkInput(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
