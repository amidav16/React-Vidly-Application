function init() {
  /*Sentry.init({
    dsn: "https://87163326b50e41d19afc18e9f7c2cfee@sentry.io/1807389"
  });
  */
}
function log(error) {
  console.error(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log
};
