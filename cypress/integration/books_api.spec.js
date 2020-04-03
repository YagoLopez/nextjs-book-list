import {CONFIG} from "../../app.config";

const baseUrl = 'https://casumo-nextjs.now.sh/api';

describe('Books API', () => {

  it('should return JSON as content type', () => {
    cy.request(baseUrl + '/books')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  });

  it('should return first page of unordered books by default (without passing params)', () => {
    cy.request(baseUrl + '/books')
      .its('body.books')
      .should('have.length', CONFIG.DB.DEFAULT_ITEMS_PER_PAGE)
  });

  describe('Sort books by title', () => {
    it('should sort books by title, first page', () => {
      cy.request(baseUrl + '/books?skip=0&limit=20&sort=name')
        .its('body.books')
        .its('0')
        .should('contain', {_id: "5e73deb8f784cd6e442bdb13"})
    });

    it('should sort books by title, last page', () => {
      cy.request(baseUrl + '/books?skip=999980&limit=20&sort=name')
        .its('body.books')
        .its('19')
        .should('contain', {_id: "5e73dec5f784cd6e443aca7c"});
    });
  });

  describe('Sort books by author\'s name', () => {
    it('should return first book sorted by author\'s name', () => {
      cy.request(baseUrl + '/books?skip=0&limit=20&sort=author')
        .its('body.books')
        .its('0')
        .should('contain', {_id: '5e73deb9f784cd6e442cb65c'})
    });

    it('should return last book sorted by author\'s name', () => {
      cy.request(baseUrl + '/books?skip=999980&limit=20&sort=author')
        .its('body.books')
        .its('19')
        .should('contain', {_id: '5e73dec2f784cd6e4436faac'});
    });
  });

  describe('Filter books by Math genre', () => {
    it('should return first book filtered by Math genre', () => {
      cy.request(baseUrl + '/books?skip=0&limit=20&filter[genre]=Math')
        .its('body.books')
        .its('0')
        .should('contain', {_id: '5e73deb8f784cd6e442ba6f1'})
    });

    it('should return last book filtered by Math genre', () => {
      cy.request(baseUrl + '/books?skip=62643&limit=20&filter[genre]=Math')
        .its('body.books')
        .its('19')
        .should('contain', {_id: '5e73dec5f784cd6e443ae901'});
    });
  });

  describe('Filter books by author\'s gender male', () => {
    it('should return first book filtered by by author\'s gender', () => {
      cy.request(baseUrl + '/books?skip=0&limit=20&filter[author.gender]=male')
        .its('body.books')
        .its('0')
        .should('contain', {_id: '5e73deb8f784cd6e442ba6e8'})
    });

    it('should return last book filtered by by author\'s gender', () => {
      cy.request(baseUrl + '/books?skip=499761&limit=20&filter[author.gender]=male')
        .its('body.books')
        .its('19')
        .should('contain', {_id: '5e73dec5f784cd6e443ae90d'});
    });
  });

});