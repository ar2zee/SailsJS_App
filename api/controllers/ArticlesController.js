/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req, res) {
		 Articles.find({}).exec(function(err,articles){
		 	if(err) {
		 		res.send(500, {error: 'DB Error'})
		 	} else {
		 		res.view('list', {articles:articles})
		 	}
		 })
	},
	add: function(req, res){
		res.view('add')
	},
	create: function(req, res){
		const title = req.body.title;
		const body = req.body.body;

		Articles.create({title: title, body: body}).exec(function(err) {
			if(err) {
				res.send(500, {error: 'DB Error'})
			} 
			res.redirect('/articles/list');
		})
	},
	delete: function(req, res){
		Articles.destroy({id: req.params.id}).exec(function(err) {
			if (err) {
				res.send(500, {error: 'DB Error'})
			}
			res.redirect('/articles/list');
		})
		return false;
	},
	edit: function(req,res) {
		Articles.findOne({id:req.params.id}).exec(function(err, article) {
			if(err) {
				res.send(500, {error: 'DB Error'})
			}
			res.view('edit', {article:article})
		}) 
	},
	update: function(req,res) {
		const title = req.body.title;
		const body = req.body.body;

		Articles.update({id:req.params.id}, {title:title, body:body}).exec(function(err) {
			if(err) {
				res.send(500, {error: 'DB Error'})
			} 
			res.redirect('/articles/list');
		})
		return false;
	}
};

