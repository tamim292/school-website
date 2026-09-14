/* Summits International Schools — landing page behaviour */

// Mobile navigation
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close the menu after tapping a link
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when tapping outside the menu
  document.addEventListener('click', function (e) {
    if (!links.classList.contains('open')) return;
    if (!links.contains(e.target) && !toggle.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Gentle reveal-on-scroll
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();

// Enquiry form -> pre-filled email to the admissions office
(function () {
  var form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var subject = 'Admission enquiry — ' + (data.get('stage') || 'General') + ' — ' + (data.get('name') || '');
    var body =
      'Name: ' + (data.get('name') || '') +
      '\nPhone: ' + (data.get('phone') || '') +
      '\nProgramme of interest: ' + (data.get('stage') || '') +
      '\n\nMessage:\n' + (data.get('message') || '');
    window.location.href = 'mailto:info@summitsschools.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();

// Current year in the footer
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
