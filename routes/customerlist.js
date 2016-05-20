/**
 * http://usejsdoc.org/
 */
var monk = require('monk');
var db = monk('localhost:27017/customers');
exports.list = 
	 function(req, res) {
		var collection = db.get('movies');
		collection.find( {}, {}, function(e, docs) {
			res.render('customerlist', {
				customerlist : docs
			});
		});
	};
