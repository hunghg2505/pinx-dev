export const requestXMLHttpRequest = (url: string) => {
  return new Promise(function (resolve, reject) {
    const ajax = new XMLHttpRequest();

    ajax.addEventListener('load', function () {
      resolve(this.response);
    });

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    ajax.onerror = function () {
      reject(this.statusText);
    };

    ajax.open('GET', url, true);
    ajax.send();
  });
};
