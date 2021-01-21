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

export const removeCart = async (iditem) => {
  await axios({
    method: 'POST',
    url: '/cart/remove-cart',
    data: { iditem },
  })
    .then((res) => {
      if (res.data.redirect === '/cart') {
        window.location = '/cart';
      } else {
        window.location = '/';
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
