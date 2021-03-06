import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLefttIcon from '@material-ui/icons/ArrowLeft';

export const PaginationButtons =
  ({goRoute, createQueryString, onNextPage, onPreviousPage, onLastPage, isFirstPage, isLastPage, criteria, totalCount, itemsPerPage}) => {
    return (
      <div>
        <div className="centered">
          <ButtonGroup variant="contained" color="secondary" aria-label="contained secondary button group">
            <Button
              onClick={() => goRoute(createQueryString(0, criteria))}
              startIcon={<SkipPreviousIcon/>}
              aria-label="Go to first page"
              disabled={isFirstPage()}>FIRST</Button>
            <Button
              onClick={() => goRoute(createQueryString(onPreviousPage, criteria))}
              startIcon={<ArrowLefttIcon/>}
              aria-label="Go to previous page"
              disabled={isFirstPage()}>PREV</Button>
            <Button
              onClick={() => goRoute(createQueryString(onNextPage, criteria))}
              endIcon={<ArrowRightIcon/>}
              aria-label="Go to next page"
              disabled={isLastPage()}>NEXT</Button>
            <Button
              onClick={() => goRoute(createQueryString(totalCount - itemsPerPage, criteria))}
              endIcon={<SkipNextIcon/>}
              aria-label="Go to last page"
              disabled={isLastPage()}>LAST</Button>
          </ButtonGroup>
        </div>
      </div>
    )
};
