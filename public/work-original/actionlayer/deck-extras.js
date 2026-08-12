document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-target]');
  if (!button) return;
  const target = document.getElementById(button.dataset.copyTarget);
  if (!target) return;
  const label = button.querySelector('span');
  const original = label ? label.textContent : '';
  try {
    await navigator.clipboard.writeText(target.innerText.trim());
    if (label) label.textContent = 'Copied';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    if (label) label.textContent = 'Copied';
  }
  window.setTimeout(() => { if (label) label.textContent = original; }, 1600);
});
