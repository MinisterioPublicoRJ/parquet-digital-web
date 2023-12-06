const getViewWidth = () =>
  Math.round(Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0) / 100);

export default getViewWidth;
