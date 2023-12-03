import React, { useEffect } from 'react';

const MathJaxConfig = `
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      processEscapes: true,
    },
    CommonHTML: { linebreaks: { automatic: true } },
    "HTML-CSS": { linebreaks: { automatic: true } },
    SVG: { linebreaks: { automatic: true } }
  });
`;

const MathJaxWrapper = ({ children }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = MathJaxConfig;
    document.head.appendChild(script);

    // Trigger MathJax typesetting after rendering
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, document.body]);
  }, []);

  return <div className='latex-container'>{children}</div>;
};

export default MathJaxWrapper;
