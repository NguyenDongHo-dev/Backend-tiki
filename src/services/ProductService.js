const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      price,
      countInStrock,
      rating,
      description,
      discount,
    } = newProduct;

    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERR",
          message: "Tên sản phẩm đã có",
        });
      }

      const createProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStrock: Number(countInStrock),
        rating,
        description,
        discount: Number(discount),
      });
      if (createProduct) {
        resolve({
          status: "OK",
          message: "Tạo thành công",
          data: createProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "Sản phẩm không tồn tại",
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deteleProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });

      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "Khong ton tai",
        });
      }

      await Product.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Xóa Sản phẩm thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProduct = async (limit, page, sort, filter) => {
  try {
    let filterQuery = {};

    if (filter) {
      const label = filter[0];       
      const searchTerm = filter[1];  
      filterQuery[label] = { $regex: new RegExp(searchTerm, "i") };
    }


    const totalProduct = await Product.countDocuments(filterQuery);

  
    let productQuery = Product.find(filterQuery);

    
    if (sort) {
      const sortField = sort[0];      
      const sortOrder = Number(sort[1]); 
      productQuery = productQuery.sort({ [sortField]: sortOrder });
    }


    productQuery = productQuery
      .skip((page - 1) * limit)
      .limit(limit);

    
    const products = await productQuery;

    if (!products || products.length === 0) {
      return {
        status: "ERROR",
        message: "Không còn sản phẩm",
      };
    }

    return {
      status: "OK",
      message: "Lấy thành công",
      data: products,
      total: totalProduct,
      pageCurrent: page,
      totalPages: Math.ceil(totalProduct / limit),
    };
  } catch (error) {
    throw error;
  }
};


const getByProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getProduct = await Product.findById({ _id: id });

      if (!getProduct) {
        resolve({
          status: "ERROR",
          message: "không tìm thấy sản phẩm",
        });
      }

      resolve({
        status: "OK",
        message: "Lấy sản phẩm thành công",
        data: getProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deteleProduct,
  getAllProduct,
  getByProduct,
};
