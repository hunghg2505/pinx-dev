export const requestXMLHttpRequest = (url: string) => {
  return new Promise(function (resolve, reject) {
    const ajax = new XMLHttpRequest();

    ajax.addEventListener('load', function () {
      if ((this.status >= 200 && this.status < 300) || this.status === 304) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    });

    // eslint-disable-next-line unicorn/prefer-add-event-listener
    ajax.onerror = function () {
      reject(this.statusText);
    };

    ajax.open('GET', url, true);
    ajax.send();
  });
};
