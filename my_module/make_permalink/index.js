var  Permalink = require('./../../models/permalinks');

module.exports					=	function(title){
	var pattern = /[^a-zA-Z0-9]/g;
	var title = title.replace(pattern,'-');
	var pattern2 = /-+/g;
	title = title.replace(pattern2,'-');
	
	permalink = title;

  // while(1){
  //   try{
  //     var 
  //   }
  //   catch(err){

  //   }  
  // }
  

  // var i = 0;
  // console.log(check_permalink);
  // while (true) {
  //   check_permalink(permalink, function(exist) {
  //     if (!exist) {
  //       return permalink;
  //     } else {
  //       i++;
  //       permalink = title + i;
  //     }
  //   });
  // }

  return permalink;
}