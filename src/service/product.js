const { where } = require("sequelize");
const { Product } = require("../model");

const findProduct = async (id) => {
  return await Product.findByPk(id);
};

const findallproduct = async () => {
  return await Product.findAll();
};

const findSellerproduct = async (username) => {
  let findthisproduct = await Product.findAll({
    where: {
      seller: username,
    },
  });
  return findthisproduct;
};

const removeproduct = async (id) => {
  let remove = await Product.findOne({
    where: {
      id: id,
    },
  });

  return remove;
};

const checkvalid = async (id, username) => {
  let valid = await Product.findOne({
    where: {
      id: id,
      seller: username,
    },
  });

  return valid;
};

module.exports = {
  findProduct,
  findallproduct,
  findSellerproduct,
  removeproduct,
  checkvalid,
};
