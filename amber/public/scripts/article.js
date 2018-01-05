'use strict';
var app = app || {};

(function(module) {
  module.exports = function Article(rawDataObj) {
    // REVIEWED: In Lab 8, we explored a lot of new functionality going on here. Let's re-examine the concept of context. Normally, "this" inside of a constructor function refers to the newly instantiated object. However, in the function we're passing to forEach, "this" would normally refer to "undefined" in strict mode. As a result, we had to pass a second argument to forEach to make sure our "this" was still referring to our instantiated object. One of the primary purposes of lexical arrow functions, besides cleaning up syntax to use fewer lines of code, is to also preserve context. That means that when you declare a function using lexical arrows, "this" inside the function will still be the same "this" as it was outside the function. As a result, we no longer have to pass in the optional "this" argument to forEach!
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  module.exports.Article.all = [];

  module.exports.Article.prototype.toHtml = function () {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  module.exports.Article.loadAll = rawData => {
    rawData.sort((a, b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

    module.exports.Article.all = rawData.map(articleObject => new module.exports.Article(articleObject));

    /* OLD forEach():
    rawData.forEach(articleObject => Article.all.push(new Article(articleObject)));
    */

  };

  module.exports.Article.fetchAll = callback => {
    $.get('/articles')
      .then(results => {
        Article.loadAll(results);
        if (callback) callback();
      })
  };

  module.exports.Article.numWordsAll = () => {
    return module.exports.Article.all.map(x => {
      return x.body.length;
    }).reduce(
      function (total, num) {
        return total + num;
      });
  };

  module.exports.Article.allAuthors = () => {
    return module.exports.Article.all.map(x => {
      return x.author;
    }).filter((elem, index, array) => {
      return array.indexOf(elem) === index;
    });
  };

  module.exports.Article.numWordsByAuthor = () => {
    let allAuthors = module.exports.Article.allAuthors();
    return allAuthors.map(author => {
      return ({
        author: author,
        words: module.exports.Article.all.filter(article => {
          return article.author === author;
        }).map(article => {
          return article.body.length;
        }).reduce((acc, cur) => {
          return acc + cur;
        })
      })
    })
  };

  module.exports.Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
      .then(console.log)
      // REVIEWED: Check out this clean syntax for just passing 'assumed' data into a named function! The reason we can do this has to do with the way Promise.prototype.then() works. It's a little outside the scope of 301 material, but feel free to research!
      .then(callback);
  };

  module.exports.Article.prototype.insertRecord = function (callback) {
    // REVIEWED: Why can't we use an arrow function here for .insertRecord()?
    $.post('/articles', { author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title })
      .then(console.log)
      .then(callback);
  };

  module.exports.Article.prototype.deleteRecord = function (callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  module.exports.Article.prototype.updateRecord = function (callback) {
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

})(app);