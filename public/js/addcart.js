import axios from 'axios';

export const addCart = async (pizza, cartcount) => {
  try {
    await axios({
      method: 'POST',
      url: '/cart/add-cart',
      data: pizza,
    }).then((res) => {
      cartcount.text(res.data.totalQty);
    });
  } catch (err) {
    console.log(err);
  }
};
