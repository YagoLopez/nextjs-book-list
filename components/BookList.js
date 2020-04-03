import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {BookInfo} from "./BookInfo";
import {BookImage} from "./BookImage";

export const BookList = (props) => {
  let content;
  const defaultImage = 'default-img.jpg';
  const STYLE = {verticalAlign: 'top'};
  const STYLE2 = {paddingLeft: '15px', fontFamily: 'Roboto', textAlign: 'center', padding: '10px'};
  if (props.books.length) {
    content = (
      <List dense={true}>
        <style jsx>{`
          .book_image {
            vertical-align: middle;
          }
          .book_text {
            padding-left: 10px;
          }
        `}</style>

        {props.books.map(book =>
          (
            <ListItem key={book._id}>
              <BookImage book={book} repeatImages={false}/>
              <ListItemText
                primary={
                  <BookInfo title={book.name} authorName={book.author.name} authorGender={book.author.gender}
                    genre={book.genre} date={book.date}
                  />}
              />
            </ListItem>
          )
        )}
      </List>
    )
  } else {
    content = (<div style={STYLE2}>There is no items</div>)
  }
  return content;
};
