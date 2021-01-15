import moment from 'moment';

export const updateStatus = (order, statuses, time) => {
  statuses.forEach((status) => {
    status.classList.remove('step-completed');
    status.classList.remove('current');
  });
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
