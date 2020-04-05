import React, { PureComponent } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import {BookList} from '../components/BookList';
import BooksRepository from '../Repositories/booksRepository';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Divider from '@material-ui/core/Divider';
import {CONFIG} from '../app.config';
import {DataInfo} from "../components/DataInfo";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {PaginationButtons} from "../components/PaginationButtons";

export default class Home extends PureComponent {

  state = {
    isLoading: false,
    isDrawerOpen: false
  };

  /**
   * This fn is executed only server-side and returns data to the client-side app
   * It also works as MVC controller to redirect requests to the Books Repository and finally to the endpoints
   * @param query Object containig request query parameters
   * @returns props to this component containing the result of the endpoints queries
   */
  static getInitialProps = async ({query}) => {
    const criteria = query.criteria;
    const skip = query.skip || 0;
    const items_per_page = CONFIG.DB.DEFAULT_ITEMS_PER_PAGE;
    let result, totalCount;
    try {
      switch (criteria) {
        case CONFIG.CRITERIA.SORT_BY_TITLE:
          result = await BooksRepository.getSortedByTitle(skip, items_per_page);
          break;
        case CONFIG.CRITERIA.SORT_BY_AUTHOR_NAME:
          result = await BooksRepository.getSortedByAuthorName(skip, items_per_page);
          break;
        case CONFIG.CRITERIA.FILTER_BY_GENRE:
          result = await BooksRepository.getFilteredByGenre(skip, items_per_page, 'Math');
          break;
        case CONFIG.CRITERIA.FILTER_BY_AUTHOR_GENDER:
          result = await BooksRepository.getFilteredByAuthorGender(skip, items_per_page, 'male');
          break;
        case CONFIG.CRITERIA.FILTER_BY_HORROR_GENRE_AND_PUBLISHED_DATE_HALLOWEEN:
          result = await BooksRepository.getFilteredByHorrorGenrePublishedInHalloween(skip, items_per_page);
          break;
        default:
          result = await BooksRepository.getBooks(skip, items_per_page);
      }
    } catch (e) {
      console.error(e);
    }
    const {data} = result;
    return {data, totalCount: data.count, items_per_page, criteria, skip: parseInt(skip, 10)};
  };

  routeChangeStart = async () => await this.setState({isLoading: true});

  routeChangeEnd = async () => await this.setState({isLoading: false});

  createQueryString = (getSkipValue, criteria) => {
    let skipValue;
    (typeof getSkipValue === 'function') && (skipValue = getSkipValue());
    (typeof getSkipValue === 'number') && (skipValue = getSkipValue);
    return criteria
      ? this.goRoute(`/?skip=${skipValue}&criteria=${criteria}`)
      : this.goRoute(`/?skip=${skipValue}`);
  };

  goRoute = (uri) => {
    (uri && typeof uri === 'string') && Router.push(uri);
    this.setState({isDrawerOpen: false})
  };

  scrollStart = () => window.scrollTo(0, 0);

  componentDidMount = () => {
    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  };

  onNextPage = () => {
    const {skip, items_per_page} = this.props;
    return skip + items_per_page;
  };

  onPreviousPage = () => {
    const {skip, items_per_page} = this.props;
    return skip - items_per_page;
  };

  isFirstPage = () => this.props.skip <= 0;

  isLastPage = () => {
    const {skip, totalCount, items_per_page} = this.props;
    return skip + items_per_page >= totalCount;
  };

  toggleDrawer = () => this.setState({isDrawerOpen: !this.state.isDrawerOpen});

  render = () => {

    const {skip, totalCount, items_per_page, criteria, data: {books}} = this.props;
    const {isLoading, isDrawerOpen} = this.state;
    const {
      goRoute, isFirstPage, isLastPage, onPreviousPage, onNextPage, toggleDrawer,
      scrollStart, createQueryString
    } = this;

    return (
      <div>

        <style jsx global>{`
          body {
            margin: 0;
            margin-bottom: 5px;
          }
          .menuButton: {
            margin-right: '100px';
          }
          .title {
            flex-grow: 1;
          }
          .subtitle {
            font-size: initial;
          }
          .MuiSvgIcon-root {
            vertical-align: top;
          }
          .centered {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          // big screens
          @media only screen and (min-width: 600px) {
            .responsive-card {
              width: 54%;
              margin: auto;
              margin-top: 15px;
              margin-bottom: 15px;
              border-style: solid;
              border-width: 1px;
              border-color: #e3e4e6;
              padding: 5px;
              border-radius: 5px;
              box-shadow:
                0 2.5px 5.4px rgba(0, 0, 0, 0.042),
                0 2.5px 24px rgba(0, 0, 0, 0.07);
            }
          }
          .data-info {
            padding-top: 15px;
            padding-bottom: 15px;
          }
        `}</style>

        <Head>
          <title>Book List</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Research on how to load Big Data" />

          {/*Load assets asynchronously to avoid render blocking*/}
          <link rel="preload" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                as="style" crossorigin/>
          <link rel="preload" href="https://fonts.googleapis.com/icon?family=Material+Icons"
                as="style" crossorigin/>

          <link rel="shortcut icon" type="image/jpg" href="favicon.ico"/>
        </Head>

        <AppBar position="sticky">
          <Toolbar>
            <IconButton edge="start" className="menuButton" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">Book List</Typography>
            { isLoading && <Typography variant='body1'><QueryBuilderIcon/> Loading...</Typography> }
          </Toolbar>
        </AppBar>

        <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Books"
                secondary="Unsorted and unfiltered"
                onClick={() => goRoute('/')} />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Books sorted by"
                secondary="Title"
                onClick={() => goRoute(createQueryString(0, CONFIG.CRITERIA.SORT_BY_TITLE))} />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Books sorted by"
                secondary="Author's Name"
                onClick={() => goRoute(createQueryString(0, CONFIG.CRITERIA.SORT_BY_AUTHOR_NAME))} />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Books filtered by"
                secondary="Genre: Math"
                onClick={() => goRoute(createQueryString(0, CONFIG.CRITERIA.FILTER_BY_GENRE))} />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Books filtered by"
                secondary="Author gender: Male"
                onClick={() => goRoute(createQueryString(0, CONFIG.CRITERIA.FILTER_BY_AUTHOR_GENDER))} />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Books filtered by"
                secondary="Genre: Horror, Published: Halloween"
                onClick={() => goRoute(createQueryString(0, CONFIG.CRITERIA.FILTER_BY_HORROR_GENRE_AND_PUBLISHED_DATE_HALLOWEEN))} />
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemAvatar>
                <Avatar><MenuBookIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Infinite Scroll"
                secondary="Proof of concept"
                onClick={() => goRoute('/infinite-scroll')} />
            </ListItem>
            <Divider/>
          </List>
        </Drawer>

        <PaginationButtons
          goRoute={goRoute} createQueryString={createQueryString} onNextPage={onNextPage} totalCount={totalCount}
          onPreviousPage={onPreviousPage} isFirstPage={isFirstPage} isLastPage={isLastPage} criteria={criteria}
          itemsPerPage={items_per_page}
        />

        <div className='responsive-card data-info'>
          <DataInfo skip={skip} items_per_page={items_per_page} totalCount={totalCount} />
        </div>
        <div className='responsive-card'>
          <BookList books={books} isLastPage={isLastPage()}/>
        </div>
        {
          totalCount > 0 &&
            <div className="centered">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={scrollStart}
                aria-label="Go to start of page"
                endIcon={<ArrowUpwardIcon/>}>Start</Button>
            </div>
        }
      </div>
    );
  }
}
