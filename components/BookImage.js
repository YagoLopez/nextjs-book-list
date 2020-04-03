import { LazyLoadImage } from '@tjoskar/react-lazyload-img'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const STYLE = {lineHeight: 1};

/**
 * @param book
 * @param repeatImages Get random different images or not. Repeated images are used for quicker testing
 * @returns {node}
 */
export const BookImage = ({book, repeatImages}) => {
  return (
    repeatImages
      ? <ListItemAvatar>
          <LazyLoadImage
            style={STYLE}
            width="75px"
            height="75px"
            defaultImage='placeholder50x50.png'
            image={book.image + '.webp'}
            alt={book.name} />
        </ListItemAvatar>
      : <ListItemAvatar>
          <LazyLoadImage
            style={STYLE}
            width="75px"
            height="75px"
            defaultImage='placeholder50x50.png'
            image={`${book.image}.webp?${book._id}`}
            alt={book.name} />
        </ListItemAvatar>
  )
};
