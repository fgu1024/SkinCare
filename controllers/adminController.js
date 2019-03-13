var ProductType = require('../model/productTypeModel');

exports.createProductType = function (res, req) {
  var typeObj = req.body;
  var id = typeObj._id;

  var _typeObj;

  if(id !== undefined && id !== ""){
      ProductType.findById(id, function (err, type) {
          if (err) {
              console.log()
          } else {
              _typeObj = _.extend(type, typeObj);
              _typeObj.save(function (err) {
                  if (err) {
                      console.log(err)
                  }

                  res.redirect('/admin')
              })
          }
      })
  } else {
      _typeObj = new ProductType({
          pt_name: typeObj.name
      });

      _typeObj.save(function (err) {
         if (err) {
             console.log(err)
         }

         res.redirect('/admin')
      })
  }
};