const STYLE_TEXT1 = {lineHeight: 1};
const STYLE_TEXT2 = {lineHeight: 1, color: 'lightblue'};
const STYLE_TEXT3 = {lineHeight: 1, color: 'lightsteelblue'};
const STYLE_CONTAINER = {paddingLeft: '12px'};

export const BookInfo = ({title, authorName, authorGender, genre, date}) => {
  return (
    <div style={STYLE_CONTAINER}>
      <div style={STYLE_TEXT1}>Title: {title}</div>
      <div style={STYLE_TEXT1}>Author: {authorName}</div>
      <div style={STYLE_TEXT1}>Gender: {authorGender}</div>
      <div style={STYLE_TEXT2}>Book Genre: {genre}</div>
      <div style={STYLE_TEXT3}>Published: {date.substr(0, 10)}</div>
    </div>
  )
};
