export const handleScroll = () => {
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  if (document.body.scrollHeight !== window.innerHeight) {
    scrollToBottom();
  } else {
    const resizeListener = () => {
      if (document.body.scrollHeight !== window.innerHeight) {
        scrollToBottom();
        window.removeEventListener('resize', resizeListener);
      }
    };
    window.addEventListener('resize', resizeListener);
  }
};

export const handleMainScroll = () => {
  window.scroll({
    top: window.innerHeight + 250,
    behavior: 'smooth',
  });
};
