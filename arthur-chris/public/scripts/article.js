'use strict';
var app = app || {};

(function(module){
  function Article(rawDataObj) {
    // REVIEW: In Lab 8, we explored a lot of new functionality going on here. Let's re-examine the concept of context. Normally, "this" inside of a constructor function refers to the newly instantiated object. However, in the function we're passing to forEach, "this" would normally refer to "undefined" in strict mode. As a result, we had to pass a second argument to forEach to make sure our "this" was still referring to our instantiated object. One of the primary purposes of lexical arrow functions, besides cleaning up syntax to use fewer lines of code, is to also preserve context. That means that when you declare a function using lexical arrows, "this" inside the function will still be the same "this" as it was outside the function. As a result, we no longer have to pass in the optional "this" argument to forEach!
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = rawData => {
    rawData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

    Article.all = rawData.map(articleObject => new Article(articleObject));

  };

  Article.fetchAll = callback => {
    $.get('/articles')
      .then(results => {
        Article.loadAll(results);
        callback();
      })
  };

  Article.numWordsAll = () => {
    return app.Article.all.map(obj => {
      return obj.body.split(' ').length;
    }).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  };

  Article.allAuthors = () => {
    return app.Article.all.map(obj => {
      return obj.author;
    }).reduce((acc, curr) => {
      if(!acc.includes(curr)){
        acc.push(curr);
      }
      return acc;
    }, []);
  };

  Article.numWordsByAuthor = () => {
    return app.Article.allAuthors().map(author => {
      let obj = {};
      obj.name = author;
      obj.wordCount = app.Article.all.filter(article => 
        article.author === obj.name)
        .reduce((acc, curr) => {
          return acc + curr.body.split(' ').length;
        }, 0);
      obj.articleCount = app.Article.all.filter(article => article.author === obj.name).length; // additional author stat
      return obj;
    });
  };

  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
      .then(console.log)
    // REVIEWED: Check out this clean syntax for just passing 'assumed' data into a named function! The reason we can do this has to do with the way Promise.prototype.then() works. It's a little outside the scope of 301 material, but feel free to research!
      .then(callback);
  };

  Article.prototype.insertRecord = function(callback) {
    // REVIEWED: Why can't we use an arrow function here for .insertRecord()?
    // because the function has "this"
    $.post('/articles', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
      .then(console.log)
      .then(callback);
  };

  Article.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
      .then(console.log)
      .then(callback);
  };
  module.Article = Article;
}(app));
