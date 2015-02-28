
module.exports					=	function(title){
	var pattern = /[^a-zA-Z0-9]/g;
	var permalink = title.replace(pattern,'-');
	var pattern_2 = /-+/g;
	permalink = permalink.replace(pattern,'-');
	console.log(permalink);
}