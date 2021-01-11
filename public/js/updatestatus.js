import moment from 'moment';

export const updateStatus = (order, statuses, time) => {
  let stepCompleted = true;
  statuses.forEach((status) => {
    if (stepCompleted) {
      status.classList.add('step-completed');
    }
    if (status.dataset.status === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format('L, LTS');
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add('current');
      }
    }
  });
};
