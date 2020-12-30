import axios from 'axios';

export const addCart = async (pizza) => {
  try {
    await axios({
      method: 'POST',
      url: '/cart/add-cart',
      data: { pizza },
    }).then((res) => {
      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }
};
