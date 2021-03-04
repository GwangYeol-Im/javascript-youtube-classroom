describe('Youtube classroom test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('유튜브 검색 모달에서, 검색을 하면 동영상 리스트를 불러온다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('#video-search-result .js-video').should('have.length', 10);
  });

  it('검색한 영상의 저장 버튼을 누르면 볼 영상 리스트에 추가된다.', () => {
    cy.get('#to-watch-video-display-button').click();
    cy.get('#video-list').then(([element]) => {
      const videoCount = element.querySelectorAll('.js-video').length ?? 0;

      cy.get('#search-button').click();
      cy.get('#video-search-input').type('로이드');
      cy.get('#video-search-submit').click();
      cy.get('.js-save-button').eq(0).click({ force: true }); // TODO: 현재 저장버튼이 다른 요소에 가려져 에러가 남
      cy.get('#modal-close-button').click();
      cy.get('#search-button').click();
      cy.get('#video-list .js-video').should('have.length', videoCount + 1);
    });
  });

  it('이미 저장된 영상은 검색결과에서 저장 버튼이 나타나지 않는다.', () => {
    cy.get('#search-button').click();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('.js-save-button').eq(0).click({ force: true });
    cy.get('.js-save-button').eq(0).should('not.be.visible');

    cy.get('#video-search-input').clear();
    cy.get('#video-search-input').type('로이드');
    cy.get('#video-search-submit').click();
    cy.get('.js-save-button').eq(0).should('not.be.visible');
  });
});