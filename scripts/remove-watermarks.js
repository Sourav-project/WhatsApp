// Script to remove any v0 watermarks after page load
(function() {
  'use strict';
  
  function removeWatermarks() {
    // Remove elements with v0 related attributes
    const selectors = [
      '[data-v0-watermark]',
      '[class*="v0-watermark"]',
      '[class*="built-with"]',
      '[id*="v0-watermark"]',
      '[id*="built-with"]',
      '[aria-label*="v0"]',
      '[title*="v0"]',
      '[alt*="v0"]',
      '.watermark',
      '.branding',
      '.attribution',
      '.powered-by'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.remove();
      });
    });
    
    // Remove fixed positioned elements that might be watermarks
    const fixedElements = document.querySelectorAll('div[style*="position: fixed"]');
    fixedElements.forEach(el => {
      const style = el.getAttribute('style') || '';
      if (style.includes('bottom') && (style.includes('right') || style.includes('left'))) {
        const text = el.textContent || '';
        if (text.toLowerCase().includes('v0') || text.toLowerCase().includes('built with')) {
          el.remove();
        }
      }
    });
    
    // Remove elements containing v0 text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const text = el.textContent || '';
      if (text.includes('Built with v0') || text.includes('built with v0') || text.includes('v0.dev')) {
        el.remove();
      }
    });
  }
  
  // Run immediately
  removeWatermarks();
  
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeWatermarks);
  }
  
  // Run after page is fully loaded
  window.addEventListener('load', removeWatermarks);
  
  // Run periodically to catch dynamically added watermarks
  setInterval(removeWatermarks, 1000);
  
  // Use MutationObserver to catch dynamically added elements
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            const text = node.textContent || '';
            if (text.includes('Built with v0') || text.includes('v0.dev')) {
              node.remove();
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
